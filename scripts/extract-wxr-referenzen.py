#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
extract-wxr-referenzen.py
=========================

Deterministischer, re-runbarer Extraktor für die Referenz-Story-Prosa + alle
ACF-Strukturfelder der Alt-Website korodur.de aus dem WordPress-Vollexport (WXR).

Was es tut
----------
1. Liest den WXR-Vollexport (korodur.WordPress.2026-06-11.xml) im Streaming-Modus
   (Regex, kein voller DOM für 63 MB) und filtert die 410 `referenzen`-Items.
   Sprache je Item aus dem <link>-Prefix:
     DE  /referenzen/<slug>/   ·  EN  /en/references/<slug>/  ·  FR /fr/references/<slug>/
   Die 17 Draft-Items (wp:status=draft, Link `?post_type=referenzen&p=<id>`) tragen
   WEDER ACF NOCH Pretty-Slug → werden separat protokolliert und übersprungen.
2. Bildet WPML-Übersetzungsgruppen OHNE trid (fehlt im Export) über Union-Find:
     - PRIMÄR  normalisierter `ref_image-gallery`-String (IDs splitten/sortieren/joinen;
       kollisionsfrei innerhalb einer Sprache → 1:1-Join)
     - SEKUNDÄR identischer Slug (innerhalb einer Sprache eindeutig → sicher)
   `ref_location`+`ref_project` wird BEWUSST NICHT als Auto-Join genutzt (über-merged
   Folge-Referenzen am selben Standort, z. B. zwei Esslingen-Treppensanierungen) –
   stattdessen nur als Review-Kandidat im Report ausgegeben.
3. Zieht die Prosa aus `content:encoded` (autoritative, saubere Fließtext-Quelle –
   0 Lightbox/Gallery/Elementor-Müll im Body). Absätze sind als Leerzeilen / vereinzelt
   <p>/<div>/<br> kodiert → Block-Split + Inline-HTML→Markdown (strong/em/a/sub/sup),
   Outbound-<a> bleiben als Markdown-Link erhalten und werden zusätzlich als
   Quell-Links gesammelt.
4. Erfasst ALLE ACF-Whitelist-Felder je Sprache (auch die leeren: ref_verleger,
   ref_renovierungsjahr, ref_dimension – damit der Befüllungsgrad belegbar ist) plus
   die WP-Taxonomien (reference-categories/-country/-type/-year).
5. Markiert eingestellte (stale) Produkte in ref_product + Prosa im Feld `stale`
   (Text bleibt unangetastet). System KORODUR-KOROTAN bleibt gültig.
6. Schreibt:
     - docs/content-quellen/referenzen-wxr/referenzen-wxr.json   (konsolidiert)
     - docs/content-quellen/referenzen-wxr/md/<slug>.md          (human-lesbar je Ref)
     - docs/content-quellen/referenzen-wxr/README.md             (Provenienz)
7. Baut additiv eine Translation-Trainingsbasis (paralleler Korpus DE↔EN / DE↔FR)
   nach korodur-translation/data/processed/. Block-genau gepaart wird NUR, wenn DE und
   Zielsprache dieselbe Block-Anzahl haben (align="exact"); abweichende Referenzen
   wandern ungeraten nach data/raw/referenzen_unaligned_review.jsonl.

Determinismus / Idempotenz
--------------------------
- Keine Laufzeit-Zeitstempel im Output (nur das fixe Archiv-Datum 2026-06-11).
- Stabile Sortierung (Gruppen nach DE-/EN-/FR-Slug, Items nach Dokument-Reihenfolge).
- Re-Run überschreibt ausschließlich die selbst erzeugten Dateien (eigene Namespaces
  `referenzen-wxr/` bzw. `referenzen_*`), fasst KEINE fremden Dateien an.

Aufruf:  python3 scripts/extract-wxr-referenzen.py
"""

import html
import json
import os
import re
import sys
from collections import Counter, defaultdict

# --------------------------------------------------------------------------- #
# CONFIG
# --------------------------------------------------------------------------- #

WXR_PATH = (
    "/Users/sfleischmann/KORODUR/KORODUR-Referenzverzeichnis/_archiv/"
    "harvest-2026-06-11/korodur.WordPress.2026-06-11.xml"
)
WEBSITE_ROOT = "/Users/sfleischmann/KORODUR/KORODUR-Website"
TRANS_ROOT = "/Users/sfleischmann/KORODUR/korodur-translation"

OUT_DIR = os.path.join(WEBSITE_ROOT, "docs", "content-quellen", "referenzen-wxr")
MD_DIR = os.path.join(OUT_DIR, "md")
CORPUS_DIR = os.path.join(TRANS_ROOT, "data", "processed")
REVIEW_DIR = os.path.join(TRANS_ROOT, "data", "raw")

ARCHIV_DATUM = "2026-06-11"
HERKUNFT = "WXR-Vollexport korodur.WordPress.2026-06-11.xml"

LANGS = ("de", "en", "fr")

# ACF-Whitelist (Reihenfolge = Ausgabe-Reihenfolge). Auch leere Felder bewusst dabei,
# damit der Befüllungsgrad belegbar bleibt.
ACF_WHITELIST = [
    "ref_type",             # Projekttyp (Neubau/Sanierung)
    "ref_category",         # Bereich
    "ref_project",          # Bauvorhaben
    "ref_location",         # Ort
    "ref_country",          # Land
    "ref_product",          # Produkt(e) als HTML mit Deeplink
    "ref_area",             # Fläche m²
    "ref_construction-year",# Jahr
    "ref_image-gallery",    # Attachment-IDs CSV (auch WPML-Join-Key)
    "ref_builder",          # Bauherr / Auftraggeber
    "ref_verarbeiter",      # Auftragnehmer / ausführender Betrieb
    "ref_client",           # zweites Kundenfeld (kaum gepflegt)
    "ref_architekt",        # Architekt
    "ref_renovierungsjahr", # leer (0/131) – zur Vollständigkeit
    "ref_dimension",        # faktisch unbenutzt (2/131) – zur Vollständigkeit
    "ref_verleger",         # leer (0/131) – zur Vollständigkeit
    "square_image",         # Kachelbild Attachment-ID
    "small-square-image",   # Kachelbild Attachment-ID
]

# WP-Taxonomie-Domains auf referenzen-Items.
TAX_DOMAINS = ["reference-categories", "reference-country", "reference-type", "reference-year"]

# Eingestellte Produkte (Text NICHT löschen, nur markieren).
# ACHTUNG: System KORODUR-KOROTAN bleibt gültig – daher kein bloßes "KOROTAN".
STALE_PRODUKTE = {
    "KOROPOX": r"koropox",
    "NEODUR AM Super": r"neodur\s+am\s+super|\bam[\s\-]*super\b",
    "NEODUR AM Plus": r"neodur\s+am\s+plus|\bam[\s\-]*plus\b",
    "MICROTOP TW NSD": r"tw[\s\-]*nsd",
    "KOROTAN-Additiv": r"korotan[\s\-]*additiv",
}

# --------------------------------------------------------------------------- #
# WXR-Parsing (regex-streamend)
# --------------------------------------------------------------------------- #

_ITEM_SPLIT = re.compile(r"(?=\t<item>)")
_POSTID = re.compile(r"<wp:post_id>(\d+)</wp:post_id>")
_PTYPE = re.compile(r"<wp:post_type><!\[CDATA\[(.*?)\]\]></wp:post_type>")
_LINK = re.compile(r"<link>(.*?)</link>")
_STATUS = re.compile(r"<wp:status><!\[CDATA\[(.*?)\]\]></wp:status>")
_POSTNAME = re.compile(r"<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>")
_TITLE = re.compile(r"<title>(.*?)</title>", re.DOTALL)
_CE = re.compile(r"<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>", re.DOTALL)
_POSTMETA = re.compile(
    r"<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]></wp:meta_key>\s*"
    r"<wp:meta_value><!\[CDATA\[(.*?)\]\]></wp:meta_value>\s*</wp:postmeta>",
    re.DOTALL,
)
_CATEGORY = re.compile(
    r'<category domain="([^"]+)" nicename="([^"]*)"><!\[CDATA\[(.*?)\]\]></category>'
)


def lang_of(link):
    if "/en/references/" in link:
        return "en"
    if "/fr/references/" in link:
        return "fr"
    if "/referenzen/" in link:
        return "de"
    return "draft"


def _cdata_or_plain(s):
    return re.sub(r"^<!\[CDATA\[|\]\]>$", "", s).strip()


def parse_items(xml_path):
    """Liest das WXR und liefert eine Liste roher referenzen-Item-Dicts."""
    with open(xml_path, encoding="utf-8") as fh:
        data = fh.read()
    items = []
    for chunk in _ITEM_SPLIT.split(data):
        mt = _PTYPE.search(chunk)
        if not mt or mt.group(1) != "referenzen":
            continue
        pid_m = _POSTID.search(chunk)
        if not pid_m:
            continue
        link = _LINK.search(chunk)
        link = link.group(1) if link else ""
        status = _STATUS.search(chunk)
        status = status.group(1) if status else ""
        slug = _POSTNAME.search(chunk)
        slug = slug.group(1) if slug else ""
        title_m = _TITLE.search(chunk)
        title = html.unescape(_cdata_or_plain(title_m.group(1))) if title_m else ""
        ce = _CE.search(chunk)
        ce = ce.group(1) if ce else ""
        acf = {}
        for k, v in _POSTMETA.findall(chunk):
            if k in ACF_WHITELIST and k not in acf:
                acf[k] = v
        tax = defaultdict(list)
        for dom, nice, val in _CATEGORY.findall(chunk):
            if dom in TAX_DOMAINS:
                tax[dom].append(html.unescape(val))
        items.append({
            "post_id": int(pid_m.group(1)),
            "link": link,
            "status": status,
            "slug": slug,
            "title": title,
            "lang": lang_of(link),
            "ce": ce,
            "acf": acf,
            "tax": dict(tax),
        })
    return items


# --------------------------------------------------------------------------- #
# Prosa: content:encoded -> Block-Liste (Markdown + Plain)
# --------------------------------------------------------------------------- #

_COMMENT = re.compile(r"<!--.*?-->", re.DOTALL)
_STYLE = re.compile(r"<style\b.*?</style>", re.DOTALL | re.IGNORECASE)
_SCRIPT = re.compile(r"<script\b.*?</script>", re.DOTALL | re.IGNORECASE)
_XMLBLK = re.compile(r"<xml\b.*?</xml>", re.DOTALL | re.IGNORECASE)
_WS = re.compile(r"\s+")
_HREF = re.compile(r'<a\b[^>]*?href="([^"]*)"[^>]*>(.*?)</a>', re.DOTALL | re.IGNORECASE)
_ALL_HREF = re.compile(r'<a\b[^>]*?href="([^"]*)"', re.IGNORECASE)
_TAG = re.compile(r"<[^>]+>")


def _preclean(htmltext):
    if not htmltext:
        return ""
    s = htmltext.replace("\r\n", "\n").replace("\r", "\n")
    s = _COMMENT.sub("", s)
    s = _STYLE.sub("", s)
    s = _SCRIPT.sub("", s)
    s = _XMLBLK.sub("", s)
    s = s.replace("\xa0", " ")
    return s


def split_blocks(htmltext):
    """Zerlegt content:encoded in Absatz-Blöcke (roh-HTML je Block).
    Absätze sind primär als Leerzeile kodiert; <p>/<div>/Doppel-<br> ebenfalls
    als Blockgrenze behandelt, einzelnes <br> bleibt Soft-Break innerhalb des
    Blocks."""
    s = _preclean(htmltext)
    # Block-Tags -> Leerzeile
    s = re.sub(r"</?p\b[^>]*>", "\n\n", s, flags=re.IGNORECASE)
    s = re.sub(r"</?div\b[^>]*>", "\n\n", s, flags=re.IGNORECASE)
    s = re.sub(r"</?(ul|ol)\b[^>]*>", "\n\n", s, flags=re.IGNORECASE)
    s = re.sub(r"<br\s*/?>\s*<br\s*/?>", "\n\n", s, flags=re.IGNORECASE)
    raw_blocks = re.split(r"\n\s*\n+", s)
    blocks = []
    for b in raw_blocks:
        if _TAG.sub("", b).strip():   # mind. Text nach Tag-Strip
            blocks.append(b.strip())
    return blocks


def block_to_markdown(block_html):
    """Inline-HTML eines Blocks -> Markdown (strong/em -> **/_ , a -> [txt](url),
    li -> '- ', sub/sup/span gestrippt). Outbound-Links bleiben erhalten."""
    s = block_html
    # Listenpunkte sichtbar machen
    s = re.sub(r"<li\b[^>]*>", "\n- ", s, flags=re.IGNORECASE)
    s = re.sub(r"</li>", "", s, flags=re.IGNORECASE)
    # Links -> Markdown
    s = _HREF.sub(lambda m: "[%s](%s)" % (_TAG.sub("", m.group(2)).strip(), m.group(1)), s)
    # Betonung
    s = re.sub(r"</?(strong|b)\b[^>]*>", "**", s, flags=re.IGNORECASE)
    s = re.sub(r"</?(em|i)\b[^>]*>", "_", s, flags=re.IGNORECASE)
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.IGNORECASE)
    # Rest-Tags strippen
    s = _TAG.sub("", s)
    s = html.unescape(s)
    # Whitespace säubern (Soft-Breaks erhalten)
    lines = [_WS.sub(" ", ln).strip() for ln in s.split("\n")]
    text = "\n".join(ln for ln in lines if ln).strip()
    # leere Bold-/Em-Reste
    if text in ("**", "_", ""):
        return ""
    return text


def block_to_plain(block_html):
    """Block -> reiner Text (für Translation-Korpus)."""
    s = block_html
    s = re.sub(r"<li\b[^>]*>", " ", s, flags=re.IGNORECASE)
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.IGNORECASE)
    s = _TAG.sub(" ", s)
    s = html.unescape(s)
    return _WS.sub(" ", s).strip()


def prose_blocks(htmltext):
    """Liefert (markdown_blocks, plain_blocks) – positionsgleich gefiltert."""
    md, pl = [], []
    for b in split_blocks(htmltext):
        m = block_to_markdown(b)
        p = block_to_plain(b)
        if not p:
            continue
        md.append(m if m else p)
        pl.append(p)
    return md, pl


def outbound_links(htmltext):
    """Alle href im Body (Reihenfolge, dedupliziert)."""
    seen = []
    for href in _ALL_HREF.findall(_preclean(htmltext)):
        if href not in seen:
            seen.append(href)
    return seen


# --------------------------------------------------------------------------- #
# Produkt-Slugs aus ref_product / Body
# --------------------------------------------------------------------------- #

_PROD_SLUG = re.compile(r"/(?:produkt|produkte|product|produit|produkty)/([a-z0-9][a-z0-9\-]*?)(?:\.html|/)", re.IGNORECASE)


def product_slugs(*htmls):
    out = []
    for h in htmls:
        for m in _PROD_SLUG.findall(h or ""):
            slug = m.lower().strip("-")
            if slug and slug not in out:
                out.append(slug)
    return out


# --------------------------------------------------------------------------- #
# Stale-Produkt-Scan
# --------------------------------------------------------------------------- #

def scan_stale(*texts):
    blob = " ".join(t or "" for t in texts)
    blob_low = blob.lower()
    hits = []
    seen = set()
    for name, pat in STALE_PRODUKTE.items():
        m = re.search(pat, blob_low)
        if m and name not in seen:
            start = max(0, m.start() - 30)
            end = min(len(blob), m.end() + 30)
            snippet = _WS.sub(" ", _TAG.sub(" ", blob[start:end])).strip()
            hits.append({"produkt": name, "fundstelle": snippet})
            seen.add(name)
    return hits


# --------------------------------------------------------------------------- #
# WPML-Gruppierung (Union-Find über Gallery + Slug)
# --------------------------------------------------------------------------- #

def gallery_key(s):
    ids = [x for x in re.split(r"[,\s]+", (s or "").strip()) if x]
    return ",".join(sorted(ids, key=lambda z: int(z) if z.isdigit() else 0)) if ids else ""


def build_groups(published):
    """Union-Find: PRIMÄR gallery_key, SEKUNDÄR slug. Liefert Liste von
    Item-Listen (je Gruppe). Cross-Validierung: max. 1 Item je Sprache."""
    parent = {}

    def find(x):
        parent.setdefault(x, x)
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    for it in published:
        find(it["post_id"])

    by_gallery = defaultdict(list)
    by_slug = defaultdict(list)
    for it in published:
        g = gallery_key(it["acf"].get("ref_image-gallery", ""))
        if g:
            by_gallery[g].append(it["post_id"])
        if it["slug"]:
            by_slug[it["slug"]].append(it["post_id"])

    # deterministische Kantenreihenfolge
    for g in sorted(by_gallery):
        grp = by_gallery[g]
        for j in range(1, len(grp)):
            union(grp[0], grp[j])
    for s in sorted(by_slug):
        grp = by_slug[s]
        for j in range(1, len(grp)):
            union(grp[0], grp[j])

    item_by_id = {it["post_id"]: it for it in published}
    comps = defaultdict(list)
    for it in published:
        comps[find(it["post_id"])].append(it)

    groups = list(comps.values())
    # Cross-Validierung
    problems = []
    for grp in groups:
        lc = Counter(x["lang"] for x in grp)
        if any(v > 1 for v in lc.values()):
            problems.append([(x["post_id"], x["lang"], x["slug"]) for x in grp])
    return groups, problems


def sort_key_group(grp):
    by = {x["lang"]: x for x in grp}
    for lg in ("de", "en", "fr"):
        if lg in by:
            return (LANGS.index(lg), by[lg]["slug"] or "", by[lg]["post_id"])
    return (9, "", 0)


# --------------------------------------------------------------------------- #
# Aufbereitung je Gruppe
# --------------------------------------------------------------------------- #

def build_record(grp):
    """Baut den konsolidierten Datensatz einer Referenz-Gruppe."""
    by = {x["lang"]: x for x in grp}
    base_lang = "de" if "de" in by else ("en" if "en" in by else "fr")

    slugs = {lg: (by[lg]["slug"] if lg in by else None) for lg in LANGS}
    post_ids = {lg: (by[lg]["post_id"] if lg in by else None) for lg in LANGS}
    titles = {lg: (by[lg]["title"] if lg in by else None) for lg in LANGS}

    # Prosa (Markdown) je Sprache
    prosa = {}
    prosa_blocks_plain = {}
    quellen_links = {}
    for lg in LANGS:
        if lg in by:
            md, pl = prose_blocks(by[lg]["ce"])
            prosa[lg] = "\n\n".join(md).strip()
            prosa_blocks_plain[lg] = pl
            quellen_links[lg] = outbound_links(by[lg]["ce"])
        else:
            prosa[lg] = None
            prosa_blocks_plain[lg] = []
            quellen_links[lg] = []

    # ACF je Sprache (volle Whitelist, leere Werte als "")
    acf = {}
    for lg in LANGS:
        if lg in by:
            acf[lg] = {k: by[lg]["acf"].get(k, "") for k in ACF_WHITELIST}
        else:
            acf[lg] = None

    # Taxonomien je Sprache
    taxonomien = {}
    for lg in LANGS:
        taxonomien[lg] = by[lg]["tax"] if lg in by else None

    # Produkt-Slugs (über alle Sprachen ref_product + Body)
    prod_html = []
    for lg in LANGS:
        if lg in by:
            prod_html.append(by[lg]["acf"].get("ref_product", ""))
            prod_html.append(by[lg]["ce"])
    pslugs = product_slugs(*prod_html)

    # Stale-Scan (ref_product + Prosa, alle Sprachen)
    stale = scan_stale(*prod_html)

    gkey = ""
    for lg in ("de", "en", "fr"):
        if lg in by:
            g = gallery_key(by[lg]["acf"].get("ref_image-gallery", ""))
            if g:
                gkey = g
                break

    sprach_codes = [lg for lg in LANGS if lg in by]
    if sprach_codes == ["de", "en", "fr"]:
        abdeckung = "voll-triple"
    elif "de" in sprach_codes:
        abdeckung = "de+" + "+".join(c for c in sprach_codes if c != "de") if len(sprach_codes) > 1 else "nur-de"
    else:
        abdeckung = "ohne-de:" + "+".join(sprach_codes)

    gruppe_id = (slugs["de"] or slugs["en"] or slugs["fr"])
    join_method = "gallery" if gkey else "slug"

    return {
        "gruppe_id": gruppe_id,
        "gallery_key": gkey,
        "join_method": join_method,
        "sprach_abdeckung": abdeckung,
        "sprachen": sprach_codes,
        "base_lang": base_lang,
        "slug_de": slugs["de"],
        "slug_en": slugs["en"],
        "slug_fr": slugs["fr"],
        "post_ids": post_ids,
        "titel": titles,
        "prosa": prosa,
        "quellen_links": quellen_links,
        "acf": acf,
        "taxonomien": taxonomien,
        "produkt_slugs": pslugs,
        "stale": stale,
        "herkunft": HERKUNFT,
        "archiv_datum": ARCHIV_DATUM,
        # interne Hilfsdaten (nicht serialisiert)
        "_blocks_plain": prosa_blocks_plain,
    }


# --------------------------------------------------------------------------- #
# Markdown-Datei je Referenz
# --------------------------------------------------------------------------- #

def yaml_q(value):
    if value is None:
        return '""'
    s = str(value)
    if s == "" or re.search(r"[:#\[\]{}&*!|>'\"%@`]", s) or s != s.strip():
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return s


def render_md(rec):
    fm = ["---"]
    fm.append("gruppe-id: %s" % yaml_q(rec["gruppe_id"]))
    fm.append("herkunft: %s" % yaml_q(HERKUNFT))
    fm.append("archiv-datum: %s" % ARCHIV_DATUM)
    fm.append("sprach-abdeckung: %s" % yaml_q(rec["sprach_abdeckung"]))
    fm.append("join-methode: %s" % rec["join_method"])
    fm.append("gallery-key: %s" % yaml_q(rec["gallery_key"]))
    fm.append("slug-de: %s" % yaml_q(rec["slug_de"]))
    fm.append("slug-en: %s" % yaml_q(rec["slug_en"]))
    fm.append("slug-fr: %s" % yaml_q(rec["slug_fr"]))
    fm.append("post-ids:")
    for lg in LANGS:
        if rec["post_ids"][lg] is not None:
            fm.append("  %s: %d" % (lg, rec["post_ids"][lg]))
    # ACF (DE-Basis, sonst erste verfügbare Sprache)
    acf = rec["acf"]["de"] or rec["acf"]["en"] or rec["acf"]["fr"] or {}
    fm.append("acf:")
    for k in ACF_WHITELIST:
        fm.append("  %s: %s" % (k, yaml_q(acf.get(k, ""))))
    if rec["produkt_slugs"]:
        fm.append("produkt-slugs:")
        for s in rec["produkt_slugs"]:
            fm.append("  - %s" % yaml_q(s))
    else:
        fm.append("produkt-slugs: []")
    # Taxonomien
    tax = rec["taxonomien"]["de"] or rec["taxonomien"]["en"] or rec["taxonomien"]["fr"] or {}
    if tax:
        fm.append("taxonomien:")
        for dom in TAX_DOMAINS:
            if tax.get(dom):
                fm.append("  %s: [%s]" % (dom, ", ".join(yaml_q(v) for v in tax[dom])))
    if rec["stale"]:
        fm.append("stale-warnung:")
        for h in rec["stale"]:
            fm.append("  - produkt: %s" % yaml_q(h["produkt"]))
            fm.append("    fundstelle: %s" % yaml_q(h["fundstelle"]))
    else:
        fm.append("stale-warnung: []  # kein eingestelltes Produkt gefunden")
    fm.append("---")

    body = []
    title = rec["titel"]["de"] or rec["titel"]["en"] or rec["titel"]["fr"] or rec["gruppe_id"]
    body.append("# " + title)
    for lg in LANGS:
        if rec["prosa"][lg] is None:
            continue
        body.append("")
        body.append("## Prosa (%s)" % lg.upper())
        body.append("")
        body.append(rec["prosa"][lg])
        if rec["quellen_links"][lg]:
            body.append("")
            body.append("_Quell-Links (%s): %s_" % (lg.upper(), ", ".join(rec["quellen_links"][lg])))
    return "\n".join(fm) + "\n\n" + "\n".join(body).strip() + "\n"


# --------------------------------------------------------------------------- #
# Translation-Korpus
# --------------------------------------------------------------------------- #

def build_corpus(records):
    """Block-genaues Pairing DE<->EN / DE<->FR nur bei gleicher Block-Anzahl."""
    corpus = {"en": [], "fr": []}
    review = []
    align_report = {"en": [], "fr": []}

    for rec in records:
        de_blocks = rec["_blocks_plain"]["de"]
        if not de_blocks:
            continue
        for tgt in ("en", "fr"):
            tgt_blocks = rec["_blocks_plain"][tgt]
            if not tgt_blocks:
                align_report[tgt].append((rec["gruppe_id"], "no-partner", "keine %s-Prosa" % tgt))
                continue
            if len(de_blocks) == len(tgt_blocks):
                for idx, (db, tb) in enumerate(zip(de_blocks, tgt_blocks)):
                    corpus[tgt].append({
                        "gruppe_id": rec["gruppe_id"],
                        "slug_de": rec["slug_de"],
                        "slug_%s" % tgt: rec["slug_%s" % tgt],
                        "de_post_id": rec["post_ids"]["de"],
                        "%s_post_id" % tgt: rec["post_ids"][tgt],
                        "block_idx": idx,
                        "de": db,
                        tgt: tb,
                        "align": "exact",
                        "quelle": HERKUNFT,
                    })
                align_report[tgt].append((rec["gruppe_id"], "exact", "%d Blockpaare" % len(de_blocks)))
            else:
                align_report[tgt].append(
                    (rec["gruppe_id"], "review", "de=%d vs %s=%d Blöcke" % (len(de_blocks), tgt, len(tgt_blocks)))
                )
                for lg_role, blocks in (("de", de_blocks), (tgt, tgt_blocks)):
                    for idx, b in enumerate(blocks):
                        review.append({
                            "lang_pair": "de_%s" % tgt,
                            "gruppe_id": rec["gruppe_id"],
                            "lang": lg_role,
                            "post_id": rec["post_ids"][lg_role],
                            "slug": rec["slug_%s" % lg_role],
                            "block_idx": idx,
                            "text": b,
                            "align": "unaligned-review",
                            "quelle": HERKUNFT,
                        })
    return corpus, review, align_report


# --------------------------------------------------------------------------- #
# Provenienz-README
# --------------------------------------------------------------------------- #

def render_readme(records, corpus, review, drafts, problems, locproj_kandidaten):
    L = []
    L.append("# Referenzen – WXR-Extraktion (Provenienz)\n")
    L.append("**Quelle:** `%s`  " % HERKUNFT)
    L.append("**Archiv-Datum:** %s  " % ARCHIV_DATUM)
    L.append("**Erzeugt von:** `KORODUR-Website/scripts/extract-wxr-referenzen.py` "
             "(deterministisch, re-runbar)\n")
    L.append("## Dateien\n")
    L.append("- `referenzen-wxr.json` – konsolidierter Datensatz (%d Referenz-Gruppen)" % len(records))
    L.append("- `md/<slug>.md` – human-lesbare Markdown-Datei je Referenz")
    L.append("- `../../../../korodur-translation/data/processed/referenzen_parallel_de_en.jsonl` "
             "(%d Blockpaare)" % len(corpus["en"]))
    L.append("- `../../../../korodur-translation/data/processed/referenzen_parallel_de_fr.jsonl` "
             "(%d Blockpaare)" % len(corpus["fr"]))
    L.append("- `../../../../korodur-translation/data/raw/referenzen_unaligned_review.jsonl` "
             "(%d Zeilen, manuelles Alignment)\n" % len(review))
    L.append("## Methode\n")
    L.append("Prosa stammt aus `content:encoded` (autoritativ; 0 Lightbox/Gallery/Elementor-Müll). "
             "Absätze sind als Leerzeilen kodiert → Block-Split + Inline-HTML→Markdown, "
             "Outbound-Links erhalten.\n")
    L.append("WPML-Gruppen ohne `trid` (fehlt im Export) via Union-Find: PRIMÄR normalisierter "
             "`ref_image-gallery`-String, SEKUNDÄR identischer Slug. `ref_location`+`ref_project` "
             "ist NICHT Auto-Join (über-merged Folge-Referenzen am selben Standort), nur "
             "Review-Kandidat.\n")
    L.append("Translation-Pairing block-genau, NUR bei identischer Block-Anzahl DE↔Ziel "
             "(`align=\"exact\"`); abweichende Referenzen wandern ungeraten ins Review-File.\n")
    L.append("## Draft-Items (übersprungen, kein ACF/Pretty-Slug)\n")
    L.append("%d Drafts: %s\n" % (len(drafts), ", ".join(str(d["post_id"]) for d in drafts)))
    if problems:
        L.append("## WARNUNG: Gruppen mit >1 Item je Sprache\n")
        for p in problems:
            L.append("- %s" % p)
        L.append("")
    if locproj_kandidaten:
        L.append("## Review-Kandidaten (location+project, NICHT auto-verknüpft)\n")
        L.append("DE-Referenzen ohne Voll-Triple mit eindeutigem (Ort+Bauvorhaben)-Kandidaten "
                 "in der fehlenden Sprache:\n")
        for k in locproj_kandidaten:
            L.append("- %s (fehlt %s) → Kandidat %s post_id %s" %
                     (k["slug_de"], k["fehlt"], k["kandidat_slug"], k["kandidat_pid"]))
        L.append("")
    return "\n".join(L)


# --------------------------------------------------------------------------- #
# locproj-Review-Kandidaten (Vorschlag, kein Auto-Join)
# --------------------------------------------------------------------------- #

def locproj_candidates(records, published):
    by_lang_lp = {"en": defaultdict(list), "fr": defaultdict(list)}
    for it in published:
        if it["lang"] in ("en", "fr"):
            lp = (it["acf"].get("ref_location", "").strip().lower(),
                  it["acf"].get("ref_project", "").strip().lower())
            if lp[0] and lp[1]:
                by_lang_lp[it["lang"]][lp].append(it)
    # bereits gruppierte target-pids ausschließen
    used = set()
    for rec in records:
        for lg in ("en", "fr"):
            if rec["post_ids"][lg] is not None:
                used.add(rec["post_ids"][lg])
    out = []
    for rec in records:
        if rec["post_ids"]["de"] is None:
            continue
        acf_de = rec["acf"]["de"] or {}
        lp = (acf_de.get("ref_location", "").strip().lower(),
              acf_de.get("ref_project", "").strip().lower())
        if not (lp[0] and lp[1]):
            continue
        for lg in ("en", "fr"):
            if rec["post_ids"][lg] is not None:
                continue
            cands = [c for c in by_lang_lp[lg].get(lp, []) if c["post_id"] not in used]
            if len(cands) == 1:
                out.append({
                    "slug_de": rec["slug_de"],
                    "fehlt": lg,
                    "kandidat_slug": cands[0]["slug"],
                    "kandidat_pid": cands[0]["post_id"],
                })
    return out


# --------------------------------------------------------------------------- #
# Hauptlauf
# --------------------------------------------------------------------------- #

def main():
    if not os.path.exists(WXR_PATH):
        sys.stderr.write("FEHLER: WXR nicht gefunden: %s\n" % WXR_PATH)
        sys.exit(1)

    items = parse_items(WXR_PATH)
    drafts = [it for it in items if it["status"] != "publish" or it["lang"] == "draft"]
    published = [it for it in items if it["status"] == "publish" and it["lang"] in LANGS]

    groups, problems = build_groups(published)
    groups.sort(key=sort_key_group)

    records = [build_record(g) for g in groups]

    locproj_kandidaten = locproj_candidates(records, published)

    # ---- Ausgabe: JSON + Markdown ----
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(MD_DIR, exist_ok=True)
    os.makedirs(CORPUS_DIR, exist_ok=True)
    os.makedirs(REVIEW_DIR, exist_ok=True)

    serial = []
    for rec in records:
        r = {k: v for k, v in rec.items() if not k.startswith("_")}
        serial.append(r)

    json_path = os.path.join(OUT_DIR, "referenzen-wxr.json")
    with open(json_path, "w", encoding="utf-8") as fh:
        json.dump({
            "herkunft": HERKUNFT,
            "archiv_datum": ARCHIV_DATUM,
            "anzahl_gruppen": len(records),
            "drafts_uebersprungen": sorted(d["post_id"] for d in drafts),
            "referenzen": serial,
        }, fh, ensure_ascii=False, indent=2, sort_keys=False)
        fh.write("\n")

    md_files = []
    for rec in records:
        slug = rec["gruppe_id"] or ("post-%s" % rec["post_ids"].get("de"))
        fpath = os.path.join(MD_DIR, "%s.md" % slug)
        with open(fpath, "w", encoding="utf-8") as fh:
            fh.write(render_md(rec))
        md_files.append(fpath)

    # ---- Translation-Korpus (additiv) ----
    corpus, review, align_report = build_corpus(records)
    corpus_files = {}
    for tgt in ("en", "fr"):
        path = os.path.join(CORPUS_DIR, "referenzen_parallel_de_%s.jsonl" % tgt)
        with open(path, "w", encoding="utf-8") as fh:
            for row in corpus[tgt]:
                fh.write(json.dumps(row, ensure_ascii=False) + "\n")
        corpus_files[tgt] = path

    review_path = os.path.join(REVIEW_DIR, "referenzen_unaligned_review.jsonl")
    with open(review_path, "w", encoding="utf-8") as fh:
        for row in review:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")

    readme_path = os.path.join(OUT_DIR, "README.md")
    with open(readme_path, "w", encoding="utf-8") as fh:
        fh.write(render_readme(records, corpus, review, drafts, problems, locproj_kandidaten))

    # ---- Report ----
    print_report(records, published, drafts, problems, corpus, corpus_files,
                 review, review_path, json_path, md_files, readme_path,
                 align_report, locproj_kandidaten)


def print_report(records, published, drafts, problems, corpus, corpus_files,
                 review, review_path, json_path, md_files, readme_path,
                 align_report, locproj_kandidaten):
    out = []
    out.append("WXR-Referenz-Extraktion — Report")
    out.append("=================================")
    out.append("")
    # Sprach-Verteilung published
    langc = Counter(it["lang"] for it in published)
    out.append("PUBLISHED REFERENZEN-ITEMS: %d  (de=%d, en=%d, fr=%d)" %
               (len(published), langc["de"], langc["en"], langc["fr"]))
    out.append("DRAFTS (übersprungen, kein ACF/Pretty-Slug): %d  -> %s" %
               (len(drafts), ", ".join(str(d["post_id"]) for d in sorted(drafts, key=lambda d: d["post_id"]))))
    out.append("")
    out.append("EXTRAHIERTE REFERENZ-GRUPPEN: %d" % len(records))
    cov = Counter(r["sprach_abdeckung"] for r in records)
    for k in sorted(cov):
        out.append("  %-16s %d" % (k, cov[k]))
    out.append("")
    # Join-Methode
    jm = Counter(r["join_method"] for r in records)
    out.append("JOIN-METHODE: %s" % dict(jm))
    if problems:
        out.append("WARNUNG – Gruppen mit >1 Item je Sprache: %d" % len(problems))
        for p in problems:
            out.append("  %s" % p)
    else:
        out.append("Cross-Validierung: 0 Gruppen mit Sprach-Kollision (sauber)")
    out.append("")
    # ACF-Vollständigkeit (DE-Basis)
    out.append("ACF-VOLLSTÄNDIGKEIT (nicht-leere Werte, DE-Basis von %d Gruppen mit DE):" %
               sum(1 for r in records if r["acf"]["de"]))
    de_records = [r for r in records if r["acf"]["de"]]
    for k in ACF_WHITELIST:
        n = sum(1 for r in de_records if (r["acf"]["de"].get(k, "") or "").strip())
        out.append("  %-26s %3d / %d" % (k, n, len(de_records)))
    out.append("")
    # Taxonomie-Abdeckung
    out.append("TAXONOMIE-ABDECKUNG (DE-Gruppen mit mind. 1 Wert):")
    for dom in TAX_DOMAINS:
        n = sum(1 for r in de_records if (r["taxonomien"]["de"] or {}).get(dom))
        out.append("  %-22s %3d / %d" % (dom, n, len(de_records)))
    out.append("")
    # Translation
    out.append("TRANSLATION-KORPUS (additiv, korodur-translation):")
    out.append("  DE<->EN: %s  (%d Blockpaare)" % (corpus_files["en"], len(corpus["en"])))
    out.append("  DE<->FR: %s  (%d Blockpaare)" % (corpus_files["fr"], len(corpus["fr"])))
    out.append("  Review (unaligned): %s  (%d Zeilen)" % (review_path, len(review)))
    for tgt in ("en", "fr"):
        st = Counter(s for _, s, _ in align_report[tgt])
        out.append("  Alignment DE<->%s: %s" % (tgt.upper(), dict(st)))
    out.append("")
    # Stale
    stale_hits = [(r["gruppe_id"], h["produkt"], h["fundstelle"])
                  for r in records for h in r["stale"]]
    out.append("STALE-PRODUKT-FUNDE (markiert, NICHT gelöscht): %d" % len(stale_hits))
    for slug, name, snip in stale_hits:
        out.append("  [%s] %s :: %s" % (slug, name, snip))
    out.append("")
    # locproj review
    out.append("LOCPROJ-REVIEW-KANDIDATEN (Vorschlag, NICHT auto-verknüpft): %d" % len(locproj_kandidaten))
    for k in locproj_kandidaten:
        out.append("  %s (fehlt %s) -> %s (pid %s)" %
                   (k["slug_de"], k["fehlt"], k["kandidat_slug"], k["kandidat_pid"]))
    out.append("")
    out.append("AUSGABE-DATEIEN:")
    out.append("  %s" % json_path)
    out.append("  %s  (%d Markdown-Dateien)" % (MD_DIR, len(md_files)))
    out.append("  %s" % readme_path)
    print("\n".join(out))


if __name__ == "__main__":
    main()

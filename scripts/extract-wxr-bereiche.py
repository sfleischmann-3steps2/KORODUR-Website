#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
extract-wxr-bereiche.py
=======================

Deterministischer, re-runbarer Extraktor für die Bereichs-Marketingprosa der
Alt-Website korodur.de aus dem WordPress-Vollexport (WXR).

Was es tut
----------
1. Liest den WXR-Vollexport (korodur.WordPress.2026-06-11.xml) und greift exakt
   die 7 Bereichs-Seiten je DE/EN/FR über ihre `wp:post_id` (deterministischer
   Join – im Export gibt es KEINE trid/WPML-Verknüpfung; Slugs unterscheiden sich
   je Sprache). Disambiguierung der presse-Doubletten zusätzlich über den
   <link>-Pfad (/bereiche/ vs /en/areas/ vs /fr/domaines/ vs /unternehmen/presse/).
2. Zieht die Prosa NICHT aus content:encoded (dort mischen Infobox-/Nav-/Lightbox-
   Anker mit base64-Aktionen), sondern aus dem segmentierten `_elementor_data`-JSON:
   pro Widget heading.title / text-editor.editor / call-to-action.title.
   Buttons (Infobox-Downloads, Nav-Links) und Medien-Widgets werden verworfen.
3. Wandelt das Widget-HTML in sauberes Markdown (Überschriften/Absätze/Listen),
   entfernt MS-Word-Paste-Müll (<!--[if mso]><xml>…), <style>, leere Platzhalter-
   Headings ("Gib hier deine Überschrift ein") und die Sidebar-Label-Heading
   "Infobox".
4. Schreibt je Bereich+Sprache eine Markdown-Datei mit YAML-Frontmatter nach
   docs/content-quellen/bereich-prosa-wxr/<neuer-slug>.<lang>.md.
   (Sichtestrich ist in industrieboden EINGEFALTET → eine Datei, zwei Quell-IDs.)
5. Markiert eingestellte (stale) Produkte im Frontmatter-Feld `stale-warnung`
   (Text bleibt unangetastet) – aktuell kein Fund in der Bereichs-Prosa.
6. Baut additiv eine Translation-Trainingsbasis (paralleler Korpus DE↔EN / DE↔FR)
   im JSONL-Format nach korodur-translation/data/processed/. Nur Seitenpaare mit
   identischer Prosa-Widget-Sequenz werden positionsgenau gepaart (align="exact").
   Abweichende Seiten werden NICHT geraten, sondern als Review-Material nach
   korodur-translation/data/raw/bereiche_unaligned_review.jsonl geschrieben.

Determinismus / Idempotenz
--------------------------
- Keine Laufzeit-Zeitstempel im Output (nur das fixe Archiv-Datum 2026-06-11).
- Stabile Reihenfolge (CONFIG-Reihenfolge + Dokument-Reihenfolge der Widgets).
- Re-Run überschreibt ausschließlich die selbst erzeugten Dateien (eigener
  Namespace `bereiche_*`), fasst KEINE fremden Dateien an.

Aufruf:  python3 scripts/extract-wxr-bereiche.py
"""

import html
import json
import os
import re
import sys
from html.parser import HTMLParser

# --------------------------------------------------------------------------- #
# CONFIG
# --------------------------------------------------------------------------- #

WXR_PATH = (
    "/Users/sfleischmann/KORODUR/KORODUR-Referenzverzeichnis/_archiv/"
    "harvest-2026-06-11/korodur.WordPress.2026-06-11.xml"
)
WEBSITE_ROOT = "/Users/sfleischmann/KORODUR/KORODUR-Website"
TRANS_ROOT = "/Users/sfleischmann/KORODUR/korodur-translation"

MD_OUT_DIR = os.path.join(WEBSITE_ROOT, "docs", "content-quellen", "bereich-prosa-wxr")
CORPUS_DIR = os.path.join(TRANS_ROOT, "data", "processed")
REVIEW_DIR = os.path.join(TRANS_ROOT, "data", "raw")

ARCHIV_DATUM = "2026-06-11"
HERKUNFT = "WXR-Vollexport korodur.WordPress.2026-06-11.xml"

# Eingestellte Produkte (Text NICHT löschen, nur im Frontmatter markieren).
# ACHTUNG: System KORODUR-KOROTAN bleibt gültig – daher kein bloßes "KOROTAN".
STALE_PRODUKTE = {
    "KOROPOX": r"koropox",
    "NEODUR AM Super": r"neodur\s+am\s+super|am[\s\-]*super",
    "NEODUR AM Plus": r"neodur\s+am\s+plus|am[\s\-]*plus",
    "MICROTOP TW NSD": r"tw[\s\-]*nsd",
    "KOROTAN-Additiv": r"korotan[\s\-]*additiv",
}

# Platzhalter-Headings (Elementor-Default) – sprachübergreifend verwerfen.
PLACEHOLDER_HEADINGS = {
    "gib hier deine überschrift ein",
    "enter your heading here",
    "saisissez votre titre ici",
    "add your heading text here",
    "your heading text goes here",
}
# Sidebar-Label-Headings (Boilerplate) – verwerfen.
BOILERPLATE_HEADINGS = {"infobox"}

# Quell-Seitengruppen: je eine "Source Page" (Bereich + Quell-Slug) mit DE/EN/FR.
# post_id = deterministischer Join-Key. erwarteter Link-Pfad zur Disambiguierung.
# Reihenfolge ist bewusst stabil (steuert Markdown- und Report-Reihenfolge).
SOURCE_GROUPS = [
    {
        "bereich": "industrieboden",
        "quell_slug": "industrieboden",
        "pages": {
            "de": {"post_id": 9102, "slug": "industrieboden", "path": "/bereiche/"},
            "en": {"post_id": 15920, "slug": "industrial-floor", "path": "/en/areas/"},
            "fr": {"post_id": 15922, "slug": "sols-industriels", "path": "/fr/domaines/"},
        },
    },
    {
        # In industrieboden EINGEFALTET (eigene Quell-Seite, gleicher Ziel-Bereich)
        "bereich": "industrieboden",
        "quell_slug": "sichtestrich",
        "folded": True,
        "pages": {
            "de": {"post_id": 9379, "slug": "sichtestrich", "path": "/bereiche/"},
            "en": {"post_id": 15956, "slug": "decorative-screed", "path": "/en/areas/"},
            "fr": {"post_id": 15961, "slug": "sols-decoratifs", "path": "/fr/domaines/"},
        },
    },
    {
        "bereich": "rapid-set",
        "quell_slug": "rapid-set",
        "pages": {
            "de": {"post_id": 9383, "slug": "rapid-set", "path": "/bereiche/"},
            "en": {"post_id": 19658, "slug": "rapid-set", "path": "/en/areas/"},
            "fr": {"post_id": 20484, "slug": "rapid-set", "path": "/fr/domaines/"},
        },
    },
    {
        "bereich": "microtop",
        "quell_slug": "microtop",
        "pages": {
            "de": {"post_id": 9381, "slug": "microtop", "path": "/bereiche/"},
            "en": {"post_id": 15964, "slug": "microtop", "path": "/en/areas/"},
            "fr": {"post_id": 15967, "slug": "microtop", "path": "/fr/domaines/"},
        },
    },
    {
        # ersetzt schnellbetonsysteme (kein exakter Zwilling)
        "bereich": "infrastruktur",
        "quell_slug": "schnellbetonsysteme",
        "pages": {
            "de": {"post_id": 9385, "slug": "schnellbetonsysteme", "path": "/bereiche/"},
            "en": {"post_id": 20041, "slug": "rapid-concrete-systems", "path": "/en/areas/"},
            "fr": {"post_id": 21321, "slug": "systemes-de-beton-rapide", "path": "/fr/domaines/"},
        },
    },
    {
        "bereich": "spezialmoertel",
        "quell_slug": "spezialbaustoffe",
        "pages": {
            "de": {"post_id": 9390, "slug": "spezialbaustoffe", "path": "/bereiche/"},
            "en": {"post_id": 15978, "slug": "special-mortars", "path": "/en/areas/"},
            "fr": {"post_id": 16018, "slug": "mortiers-speciaux", "path": "/fr/domaines/"},
        },
    },
    {
        "bereich": "katzenstreu",
        "quell_slug": "katzenstreu",
        "pages": {
            "de": {"post_id": 9393, "slug": "katzenstreu", "path": "/bereiche/"},
            "en": {"post_id": 16065, "slug": "cat-litter", "path": "/en/areas/"},
            "fr": {"post_id": 16099, "slug": "litiere-pour-chats", "path": "/fr/domaines/"},
        },
    },
    {
        "bereich": "3d-concrete-printing",
        "quell_slug": "3d-concrete-printing",
        "pages": {
            "de": {"post_id": 9387, "slug": "3d-concrete-printing", "path": "/bereiche/"},
            "en": {"post_id": 16353, "slug": "3d-concrete-printing", "path": "/en/areas/"},
            "fr": {"post_id": 16357, "slug": "3d-concrete-printing", "path": "/fr/domaines/"},
        },
    },
]

LANGS = ("de", "en", "fr")

# --------------------------------------------------------------------------- #
# WXR-Parsing (regex-streamend, kein XML-DOM für 63 MB nötig)
# --------------------------------------------------------------------------- #

_ITEM_SPLIT = re.compile(r"(?=\t<item>)")
_POSTID = re.compile(r"<wp:post_id>(\d+)</wp:post_id>")
_LINK = re.compile(r"<link>(.*?)</link>")
_TITLE = re.compile(r"<title>(.*?)</title>", re.DOTALL)
_CE = re.compile(r"<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>", re.DOTALL)
_POSTMETA = re.compile(
    r"<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]></wp:meta_key>\s*"
    r"<wp:meta_value><!\[CDATA\[(.*?)\]\]></wp:meta_value>\s*</wp:postmeta>",
    re.DOTALL,
)


def load_items_by_id(xml_path, wanted_ids):
    """Liest das WXR und gibt {post_id: raw_item_string} für die gesuchten IDs."""
    with open(xml_path, encoding="utf-8") as fh:
        data = fh.read()
    by_id = {}
    for chunk in _ITEM_SPLIT.split(data):
        m = _POSTID.search(chunk)
        if not m:
            continue
        pid = int(m.group(1))
        if pid in wanted_ids:
            by_id[pid] = chunk
    return by_id


def item_title(raw):
    m = _TITLE.search(raw)
    if not m:
        return ""
    t = m.group(1)
    t = re.sub(r"^<!\[CDATA\[|\]\]>$", "", t).strip()
    return html.unescape(t)


def item_link(raw):
    m = _LINK.search(raw)
    return m.group(1) if m else ""


def item_content_encoded(raw):
    m = _CE.search(raw)
    return m.group(1) if m else ""


def item_elementor_data(raw):
    for key, val in _POSTMETA.findall(raw):
        if key == "_elementor_data":
            return val
    return None


# --------------------------------------------------------------------------- #
# HTML-Reinigung + HTML -> Markdown
# --------------------------------------------------------------------------- #

_COMMENT = re.compile(r"<!--.*?-->", re.DOTALL)
_STYLE = re.compile(r"<style\b.*?</style>", re.DOTALL | re.IGNORECASE)
_SCRIPT = re.compile(r"<script\b.*?</script>", re.DOTALL | re.IGNORECASE)
_XMLBLK = re.compile(r"<xml\b.*?</xml>", re.DOTALL | re.IGNORECASE)
_WS = re.compile(r"[ \t\f\v]+")
_SHORTCODE_ONLY = re.compile(r"^\[[^\]]+\]$")
_BARE_URL = re.compile(r"^https?://\S+$")


def _preclean(htmltext):
    """Entfernt MS-Word-Paste-Müll, <style>/<script>/<xml>-Blöcke und &nbsp;."""
    if not htmltext:
        return ""
    s = _COMMENT.sub("", htmltext)   # u.a. <!--[if gte mso 9]>…<![endif]-->
    s = _STYLE.sub("", s)
    s = _SCRIPT.sub("", s)
    s = _XMLBLK.sub("", s)
    s = s.replace("\xa0", " ")
    return s


class _Plain(HTMLParser):
    """HTML -> reiner Text (für Filter-/Alignment-Entscheidungen + Korpus).
    An Block-Grenzen (p, h1-h6, li, div, br) wird ein Leerzeichen eingefügt,
    damit benachbarte Absätze im Korpus nicht verkleben ("...Kontinuität.Ob")."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self._parts = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() in _BLOCK_TAGS or tag.lower() == "br":
            self._parts.append(" ")

    def handle_startendtag(self, tag, attrs):
        if tag.lower() == "br":
            self._parts.append(" ")

    def handle_endtag(self, tag):
        if tag.lower() in _BLOCK_TAGS:
            self._parts.append(" ")

    def handle_data(self, data):
        self._parts.append(data)

    def text(self):
        return _WS.sub(" ", "".join(self._parts)).strip()


def to_plain(htmltext):
    p = _Plain()
    p.feed(_preclean(htmltext))
    return p.text()


_BLOCK_TAGS = {"p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li"}


class _Md(HTMLParser):
    """Minimaler HTML->Markdown-Wandler für die hier vorkommenden Tags
    (p, h2-h4, ul/ol/li, strong/b, em/i, br, a, span, sup)."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []          # fertige Markdown-Blöcke
        self.buf = []             # aktuelle Inline-Pieces
        self.heading_level = None
        self.in_li = False

    # -- intern --
    def _flush(self):
        raw = "".join(self.buf)
        self.buf = []
        # Soft-Breaks (<br>) bleiben als \n erhalten, Rest normalisieren
        lines = [_WS.sub(" ", ln).strip() for ln in raw.split("\n")]
        text = "\n".join(ln for ln in lines).strip("\n").strip()
        if not text:
            self.heading_level = None
            self.in_li = False
            return
        if _BARE_URL.match(text):
            self.heading_level = None
            self.in_li = False
            return
        if self.heading_level is not None:
            lvl = min(max(self.heading_level, 2), 6)
            self.blocks.append("#" * lvl + " " + text.replace("\n", " "))
            self.heading_level = None
        elif self.in_li:
            self.blocks.append("- " + text.replace("\n", " "))
            self.in_li = False
        elif _SHORTCODE_ONLY.match(text):
            self.blocks.append(
                "_[Shortcode `%s` – Inhalt nicht im WXR-Export enthalten]_" % text
            )
        else:
            self.blocks.append(text)

    # -- HTMLParser-Hooks --
    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        if tag in ("p", "div"):
            self._flush()
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._flush()
            self.heading_level = int(tag[1])
        elif tag == "br":
            self.buf.append("\n")
        elif tag in ("strong", "b"):
            self.buf.append("**")
        elif tag in ("em", "i"):
            self.buf.append("_")
        elif tag in ("ul", "ol"):
            self._flush()
        elif tag == "li":
            self._flush()
            self.in_li = True
        # a, span, sup, sonstige: Tag ignorieren, Text behalten

    def handle_startendtag(self, tag, attrs):
        if tag.lower() == "br":
            self.buf.append("\n")

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in ("p", "div", "li", "h1", "h2", "h3", "h4", "h5", "h6"):
            self._flush()
        elif tag in ("strong", "b"):
            self.buf.append("**")
        elif tag in ("em", "i"):
            self.buf.append("_")

    def handle_data(self, data):
        self.buf.append(data)

    def markdown(self):
        self._flush()
        # leere/Whitespace-Bold-Reste säubern
        out = [b for b in self.blocks if b.strip() and b.strip() not in ("**", "_")]
        return out


def to_markdown_blocks(htmltext):
    p = _Md()
    p.feed(_preclean(htmltext))
    return p.markdown()


# --------------------------------------------------------------------------- #
# Elementor-Walk: segmentierte Prosa
# --------------------------------------------------------------------------- #

def walk_segments(node, acc):
    """Durchläuft den Elementor-Baum in Dokument-Reihenfolge und sammelt
    Text-tragende Widgets als (typ, roh_html). Medien/Nav/Spacer werden
    übersprungen."""
    if isinstance(node, dict):
        wt = node.get("widgetType")
        s = node.get("settings", {}) or {}
        if wt == "heading":
            acc.append(("heading", s.get("title", "") or ""))
        elif wt == "text-editor":
            acc.append(("text-editor", s.get("editor", "") or ""))
        elif wt == "button":
            acc.append(("button", s.get("text", "") or ""))
        elif wt == "call-to-action":
            acc.append(("cta", s.get("title", "") or ""))
        for ch in node.get("elements", []) or []:
            walk_segments(ch, acc)
    elif isinstance(node, list):
        for ch in node:
            walk_segments(ch, acc)


def prose_stream(segments):
    """Filtert die rohen Segmente auf den Prosa-Strom (H/P/C):
    - Buttons raus (Nav/Infobox-Downloads)
    - Platzhalter-/Infobox-Headings raus
    - leere Segmente raus
    Liefert Liste von dicts: {kind, type_code, plain, html}."""
    out = []
    for typ, raw in segments:
        if typ == "button":
            continue
        plain = to_plain(raw)
        if not plain:
            continue
        if typ == "heading":
            low = plain.lower()
            if low in PLACEHOLDER_HEADINGS or low in BOILERPLATE_HEADINGS:
                continue
            out.append({"kind": "heading", "code": "H", "plain": plain, "html": raw})
        elif typ == "text-editor":
            out.append({"kind": "text-editor", "code": "P", "plain": plain, "html": raw})
        elif typ == "cta":
            out.append({"kind": "cta", "code": "C", "plain": plain, "html": raw})
    return out


# --------------------------------------------------------------------------- #
# Stale-Produkt-Scan
# --------------------------------------------------------------------------- #

def scan_stale(raw_item):
    """Sucht eingestellte Produkte über content:encoded + _elementor_data.
    Liefert Liste von (Produktname, Fundstellen-Snippet)."""
    blob = (item_content_encoded(raw_item) or "") + " " + (item_elementor_data(raw_item) or "")
    blob_low = blob.lower()
    hits = []
    for name, pat in STALE_PRODUKTE.items():
        m = re.search(pat, blob_low)
        if m:
            start = max(0, m.start() - 30)
            end = min(len(blob), m.end() + 30)
            snippet = _WS.sub(" ", blob[start:end]).strip()
            hits.append((name, snippet))
    return hits


# --------------------------------------------------------------------------- #
# Markdown-Datei-Erzeugung
# --------------------------------------------------------------------------- #

def yaml_escape(value):
    if value is None:
        return '""'
    s = str(value)
    if re.search(r"[:#\[\]{}&*!|>'\"%@`]", s) or s != s.strip():
        return '"' + s.replace('"', '\\"') + '"'
    return s


def render_markdown(bereich, lang, pages_meta, body_blocks, stale_hits):
    """Baut eine Markdown-Datei (Frontmatter + Body) als String."""
    quelle_urls = [pm["link"] for pm in pages_meta]
    post_ids = [pm["post_id"] for pm in pages_meta]
    titel = pages_meta[0]["title"]

    fm = []
    fm.append("---")
    fm.append("bereich: %s" % yaml_escape(bereich))
    fm.append("sprache: %s" % lang)
    fm.append("titel: %s" % yaml_escape(titel))
    if len(quelle_urls) == 1:
        fm.append("quelle-url: %s" % yaml_escape(quelle_urls[0]))
        fm.append("post-id: %d" % post_ids[0])
    else:
        fm.append("quelle-url:")
        for u in quelle_urls:
            fm.append("  - %s" % yaml_escape(u))
        fm.append("post-id:")
        for p in post_ids:
            fm.append("  - %d" % p)
    fm.append("archiv-datum: %s" % ARCHIV_DATUM)
    fm.append("herkunft: %s" % yaml_escape(HERKUNFT))
    fm.append("extraktion: _elementor_data (Widget-Walk), HTML->Markdown")
    if stale_hits:
        fm.append("stale-warnung:")
        for name, snippet in stale_hits:
            fm.append("  - produkt: %s" % yaml_escape(name))
            fm.append("    fundstelle: %s" % yaml_escape(snippet))
    else:
        fm.append("stale-warnung: []  # kein eingestelltes Produkt in der Bereichs-Prosa gefunden")
    fm.append("---")

    body = "\n\n".join(body_blocks).strip() + "\n"
    return "\n".join(fm) + "\n\n" + body


# --------------------------------------------------------------------------- #
# Hauptlauf
# --------------------------------------------------------------------------- #

def main():
    # 1) alle benötigten Items laden
    wanted = set()
    for g in SOURCE_GROUPS:
        for lg in LANGS:
            wanted.add(g["pages"][lg]["post_id"])
    by_id = load_items_by_id(WXR_PATH, wanted)

    missing = sorted(wanted - set(by_id))
    if missing:
        sys.stderr.write("FEHLER: post_ids nicht im WXR gefunden: %s\n" % missing)
        sys.exit(1)

    # 2) je Quell-Seite: Segmente + Prosa-Strom + stale + Meta
    page_data = {}   # post_id -> dict
    for g in SOURCE_GROUPS:
        for lg in LANGS:
            p = g["pages"][lg]
            pid = p["post_id"]
            raw = by_id[pid]
            link = item_link(raw)
            # Disambiguierung: Link-Pfad muss zum erwarteten Bereich-Pfad passen
            if p["path"] not in link or "/unternehmen/presse/" in link:
                sys.stderr.write(
                    "FEHLER: Link von %d (%s) passt nicht zu erwartetem Pfad %s\n"
                    % (pid, link, p["path"])
                )
                sys.exit(1)
            ed = item_elementor_data(raw)
            if not ed:
                sys.stderr.write("FEHLER: kein _elementor_data in %d\n" % pid)
                sys.exit(1)
            tree = json.loads(ed)
            segs = []
            walk_segments(tree, segs)
            prose = prose_stream(segs)
            page_data[pid] = {
                "lang": lg,
                "slug": p["slug"],
                "link": link,
                "title": item_title(raw),
                "post_id": pid,
                "raw": raw,
                "prose": prose,
                "stale": scan_stale(raw),
            }

    os.makedirs(MD_OUT_DIR, exist_ok=True)
    os.makedirs(CORPUS_DIR, exist_ok=True)
    os.makedirs(REVIEW_DIR, exist_ok=True)

    # 3) Markdown je Bereich x Sprache (Folds zusammenführen)
    bereich_order = []
    for g in SOURCE_GROUPS:
        if g["bereich"] not in bereich_order:
            bereich_order.append(g["bereich"])

    files_written = []
    coverage = {}       # bereich -> {lang -> wordcount}
    stale_report = []   # (bereich, lang, name, snippet)

    for bereich in bereich_order:
        # Quell-Seiten dieses Bereichs in CONFIG-Reihenfolge (Hauptseite zuerst)
        groups = [g for g in SOURCE_GROUPS if g["bereich"] == bereich]
        coverage[bereich] = {}
        for lg in LANGS:
            body_blocks = []
            pages_meta = []
            all_stale = []
            words = 0
            for gi, g in enumerate(groups):
                pid = g["pages"][lg]["post_id"]
                pd = page_data[pid]
                pages_meta.append(pd)
                if gi == 0:
                    body_blocks.append("# " + pd["title"])
                else:
                    # eingefaltete Quell-Seite klar abgegrenzt dokumentieren
                    body_blocks.append("---")
                    body_blocks.append(
                        "<!-- eingefaltet: Quell-Seite '%s' (post_id %d, %s) -->"
                        % (g["quell_slug"], pid, pd["link"])
                    )
                    body_blocks.append("# " + pd["title"])
                for seg in pd["prose"]:
                    if seg["kind"] == "heading":
                        body_blocks.append("## " + seg["plain"])
                    elif seg["kind"] == "cta":
                        body_blocks.append("> " + seg["plain"])
                    else:  # text-editor
                        body_blocks.extend(to_markdown_blocks(seg["html"]))
                    words += len(seg["plain"].split())
                for name, snippet in pd["stale"]:
                    all_stale.append((name, snippet))
                    stale_report.append((bereich, lg, name, snippet))

            md = render_markdown(bereich, lg, pages_meta, body_blocks, all_stale)
            fname = "%s.%s.md" % (bereich, lg)
            fpath = os.path.join(MD_OUT_DIR, fname)
            with open(fpath, "w", encoding="utf-8") as fh:
                fh.write(md)
            files_written.append(fpath)
            coverage[bereich][lg] = words

    # 4) Translation-Parallel-Korpus (DE<->EN, DE<->FR)
    corpus = {"en": [], "fr": []}
    review = []           # unaligned Seiten je Sprache (kein sicheres Pairing)
    align_report = {"en": [], "fr": []}  # (bereich, quell_slug, status, detail)

    for g in SOURCE_GROUPS:
        de_pid = g["pages"]["de"]["post_id"]
        de_prose = page_data[de_pid]["prose"]
        de_codes = [s["code"] for s in de_prose]
        for tgt in ("en", "fr"):
            tgt_pid = g["pages"][tgt]["post_id"]
            tgt_prose = page_data[tgt_pid]["prose"]
            tgt_codes = [s["code"] for s in tgt_prose]
            if de_codes == tgt_codes and de_codes:
                # positionsgenaues Pairing – sicher
                for idx, (ds, ts) in enumerate(zip(de_prose, tgt_prose)):
                    corpus[tgt].append({
                        "bereich": g["bereich"],
                        "quell_slug": g["quell_slug"],
                        "slug_de": g["pages"]["de"]["slug"],
                        "slug_%s" % tgt: g["pages"][tgt]["slug"],
                        "de_post_id": de_pid,
                        "%s_post_id" % tgt: tgt_pid,
                        "widget": ds["kind"],
                        "seg_idx": idx,
                        "de": ds["plain"],
                        tgt: ts["plain"],
                        "align": "exact",
                        "quelle": HERKUNFT,
                    })
                align_report[tgt].append(
                    (g["bereich"], g["quell_slug"], "exact", "%d Segmentpaare" % len(de_prose))
                )
            else:
                # KEIN sicheres Pairing -> Review-Material, nichts erfinden
                align_report[tgt].append(
                    (g["bereich"], g["quell_slug"], "review",
                     "de=%d %s vs %s=%d %s"
                     % (len(de_codes), "".join(de_codes), tgt,
                        len(tgt_codes), "".join(tgt_codes)))
                )
                for lg_role, prose in (("de", de_prose), (tgt, tgt_prose)):
                    for idx, seg in enumerate(prose):
                        review.append({
                            "lang_pair": "de_%s" % tgt,
                            "bereich": g["bereich"],
                            "quell_slug": g["quell_slug"],
                            "lang": lg_role,
                            "post_id": g["pages"][lg_role]["post_id"],
                            "slug": g["pages"][lg_role]["slug"],
                            "widget": seg["kind"],
                            "seg_idx": idx,
                            "text": seg["plain"],
                            "align": "unaligned-review",
                            "quelle": HERKUNFT,
                        })

    corpus_files = {}
    for tgt in ("en", "fr"):
        path = os.path.join(CORPUS_DIR, "bereiche_parallel_de_%s.jsonl" % tgt)
        with open(path, "w", encoding="utf-8") as fh:
            for row in corpus[tgt]:
                fh.write(json.dumps(row, ensure_ascii=False) + "\n")
        corpus_files[tgt] = path

    review_path = os.path.join(REVIEW_DIR, "bereiche_unaligned_review.jsonl")
    with open(review_path, "w", encoding="utf-8") as fh:
        for row in review:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")

    # 5) Provenienz-Doku im Korpus-Verzeichnis (eigener Namespace)
    prov = os.path.join(CORPUS_DIR, "bereiche_parallel_README.md")
    with open(prov, "w", encoding="utf-8") as fh:
        fh.write(_provenance_md(corpus, review, align_report))

    # ----------------------------------------------------------------- Report
    print_report(coverage, files_written, stale_report, align_report,
                 corpus, corpus_files, review, review_path, prov, bereich_order)


def _provenance_md(corpus, review, align_report):
    lines = []
    lines.append("# Bereiche – paralleler Trainingskorpus (Herkunft)\n")
    lines.append("**Quelle:** `%s`  " % HERKUNFT)
    lines.append("**Archiv-Datum:** %s  " % ARCHIV_DATUM)
    lines.append("**Erzeugt von:** `KORODUR-Website/scripts/extract-wxr-bereiche.py` "
                 "(deterministisch, re-runbar)\n")
    lines.append("## Dateien\n")
    lines.append("- `bereiche_parallel_de_en.jsonl` – DE↔EN Segmentpaare "
                 "(%d Zeilen)" % len(corpus["en"]))
    lines.append("- `bereiche_parallel_de_fr.jsonl` – DE↔FR Segmentpaare "
                 "(%d Zeilen)" % len(corpus["fr"]))
    lines.append("- `../raw/bereiche_unaligned_review.jsonl` – Seiten ohne sichere "
                 "1:1-Widget-Sequenz (%d Zeilen, manuelles Alignment nötig)\n" % len(review))
    lines.append("## Methode\n")
    lines.append("Prosa stammt aus dem Elementor-Widget-Walk (`heading` / `text-editor` "
                 "/ `call-to-action`), Buttons/Medien/Nav verworfen. Gepaart wird NUR, "
                 "wenn die Prosa-Widget-Sequenz DE und Zielsprache identisch ist "
                 "(`align=\"exact\"`). Abweichende Seiten werden nicht geraten, sondern "
                 "ins Review-File geschrieben.\n")
    lines.append("## Alignment-Status je Quell-Seite\n")
    lines.append("| Bereich | Quell-Slug | DE↔EN | DE↔FR |")
    lines.append("|---|---|---|---|")
    keyset = []
    for tgt in ("en", "fr"):
        for b, q, st, det in align_report[tgt]:
            if (b, q) not in keyset:
                keyset.append((b, q))
    en_map = {(b, q): (st, det) for b, q, st, det in align_report["en"]}
    fr_map = {(b, q): (st, det) for b, q, st, det in align_report["fr"]}
    for b, q in keyset:
        en = en_map.get((b, q), ("-", ""))
        fr = fr_map.get((b, q), ("-", ""))
        lines.append("| %s | %s | %s (%s) | %s (%s) |"
                     % (b, q, en[0], en[1], fr[0], fr[1]))
    lines.append("")
    return "\n".join(lines)


def print_report(coverage, files_written, stale_report, align_report,
                 corpus, corpus_files, review, review_path, prov, bereich_order):
    out = []
    out.append("WXR-Bereichs-Extraktion — Report")
    out.append("=================================")
    out.append("")
    out.append("ABDECKUNG (Wortzahl Prosa je Bereich x Sprache):")
    out.append("  %-22s %8s %8s %8s" % ("Bereich", "DE", "EN", "FR"))
    for b in bereich_order:
        c = coverage[b]
        out.append("  %-22s %8s %8s %8s"
                   % (b,
                      c.get("de", "fehlt"),
                      c.get("en", "fehlt"),
                      c.get("fr", "fehlt")))
    out.append("")
    out.append("ERZEUGTE MARKDOWN-DATEIEN (%d):" % len(files_written))
    for f in files_written:
        out.append("  " + f)
    out.append("")
    out.append("STALE-PRODUKT-FUNDE in Bereichs-Prosa:")
    if stale_report:
        for b, lg, name, snip in stale_report:
            out.append("  [%s/%s] %s :: %s" % (b, lg, name, snip))
    else:
        out.append("  keine (KOROPOX / NEODUR AM Super/Plus / MICROTOP TW NSD / "
                   "KOROTAN-Additiv) in der Bereichs-Prosa")
    out.append("")
    out.append("TRANSLATION-KORPUS (additiv, korodur-translation):")
    out.append("  DE<->EN: %s  (%d Segmentpaare)"
               % (corpus_files["en"], len(corpus["en"])))
    out.append("  DE<->FR: %s  (%d Segmentpaare)"
               % (corpus_files["fr"], len(corpus["fr"])))
    out.append("  Review (unaligned): %s  (%d Zeilen)" % (review_path, len(review)))
    out.append("  Provenienz-Doku: %s" % prov)
    out.append("")
    out.append("ALIGNMENT je Quell-Seite:")
    for tgt in ("en", "fr"):
        out.append("  DE<->%s:" % tgt.upper())
        for b, q, st, det in align_report[tgt]:
            out.append("    %-32s %-7s %s" % ("%s/%s" % (b, q), st, det))
    print("\n".join(out))


if __name__ == "__main__":
    main()

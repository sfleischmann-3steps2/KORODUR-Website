#!/usr/bin/env python3
"""
Extrahiert das Dokumenten-Inventar aus dem korodur.de WordPress-Export (WXR).

Output:
  docs/website-migration/dokumenten-inventar.csv   (vollständig, eine Zeile je Dokument)
  docs/website-migration/dokumenten-inventar.md     (Zusammenfassung + Lücken)

Quelle: WordPress-Export (post_type attachment -> wp:attachment_url),
Zuordnung über wp:post_parent (Produkt/Referenz/Seite), Abgleich gegen Repo
(welche Datei ist auf der neuen Site bereits referenziert).
"""
import csv
import os
import re
import sys
from lxml import etree as ET
from collections import Counter, defaultdict

XML = "/Users/sfleischmann/Desktop/Screenshots/korodur.WordPress.2026-06-11.xml"
REPO = "/Users/sfleischmann/KORODUR/KORODUR-Website"
OUT_CSV = os.path.join(REPO, "docs/website-migration/dokumenten-inventar.csv")
OUT_MD = os.path.join(REPO, "docs/website-migration/dokumenten-inventar.md")

WP = "{http://wordpress.org/export/1.2/}"
DOC_EXT = ("pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "zip", "dwg", "csv", "txt")

LANGS = ("de", "en", "fr", "pl", "es", "it", "nl", "ru", "cz", "cs", "sk",
         "hu", "ro", "tr", "pt", "se", "sv", "dk", "da", "fi", "no", "gr")


def lang_of(fname):
    m = re.search(r"[_-]([a-z]{2})\.[a-z0-9]+$", fname.lower())
    if m and m.group(1) in LANGS:
        return m.group(1)
    return ""


def classify(fname, url):
    s = (fname + " " + url).lower()
    if re.search(r"sdb|sds|sicherheitsdaten|msds|safety", s):
        return "SDB/SDS"
    if re.search(r"leistungserkl|declaration|dop|_ce_|ce-?kenn|konformit", s):
        return "DoP/CE/Leistungserklärung"
    if re.search(r"zertifik|certificate|iso[_ -]?9001|prüfzeug|pruefzeug|interseroh|epd|zulassung", s):
        return "Zertifikat/Prüfzeugnis"
    if re.search(r"broschuere|broschüre|brochure|prospekt|flyer|katalog|lieferprogramm|imagebrosch", s):
        return "Broschüre/Katalog"
    if re.search(r"system|service|verarbeitung|anwendung|merkblatt", s):
        return "System-/Service-Info"
    return "TDS (vermutet)"


def text(el, tag):
    c = el.find(tag)
    return (c.text or "").strip() if c is not None and c.text else ""


def build_repo_index():
    """Set aller .pdf/.doc-Basenamen, die irgendwo im Repo referenziert sind."""
    referenced = set()
    scan_dirs = ["data", "app", "components", "public"]
    pat = re.compile(r"[\w%.+-]+\.(?:pdf|docx?|xlsx?|csv)", re.I)
    for d in scan_dirs:
        root = os.path.join(REPO, d)
        for dp, _, files in os.walk(root):
            if "node_modules" in dp:
                continue
            for f in files:
                if f.endswith((".ts", ".tsx", ".json", ".js", ".mdx", ".md")) or d == "public":
                    if d == "public" and f.lower().endswith((".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv")):
                        referenced.add(f.lower())
                        continue
                    try:
                        with open(os.path.join(dp, f), encoding="utf-8", errors="ignore") as fh:
                            for m in pat.findall(fh.read()):
                                referenced.add(os.path.basename(m).lower())
                    except Exception:
                        pass
    return referenced


def main():
    docs = []             # attachment dicts (dedupliziert nach fname)
    seen_docs = set()
    doc_refs = defaultdict(Counter)   # fname_lower -> Counter("Titel [typ]")
    ref_pat = re.compile(r"/wp-content/uploads/[^\"'\)\s<\\]+\.(?:pdf|docx?|xlsx?|csv|zip)", re.I)
    NSWRAP = ('<rss xmlns:wp="http://wordpress.org/export/1.2/" '
              'xmlns:content="http://purl.org/rss/1.0/modules/content/" '
              'xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" '
              'xmlns:dc="http://purl.org/dc/elements/1.1/" '
              'xmlns:wfw="http://wellformedweb.org/CommentAPI/">{}</rss>')
    parser = ET.XMLParser(recover=True, huge_tree=True)

    # Datei robust in <item>-Blöcke splitten (ein kaputtes Item killt nicht den Rest)
    print("Parse XML (robustes Item-Splitting)…", file=sys.stderr)
    n_items = 0
    with open(XML, encoding="utf-8", errors="replace") as fh:
        buf, inside = [], False
        for line in fh:
            if "<item>" in line:
                inside, buf = True, []
            if inside:
                buf.append(line)
            if inside and "</item>" in line:
                inside = False
                chunk = "".join(buf)
                n_items += 1
                try:
                    root = ET.fromstring(NSWRAP.format(chunk).encode("utf-8"), parser)
                    el = root.find("item") if root is not None else None
                except Exception:
                    el = None
                ptype = text(el, f"{WP}post_type") if el is not None else ""
                title = text(el, "title") if el is not None else ""
                # Doc-Referenzen aus dem ROH-Chunk (parse-unabhängig), Slashes entschärft
                if ptype and ptype != "attachment":
                    for ref in ref_pat.findall(chunk.replace("\\/", "/")):
                        doc_refs[ref.rsplit("/", 1)[-1].lower()][f"{title} [{ptype}]"] += 1
                if ptype == "attachment":
                    aurl = text(el, f"{WP}attachment_url")
                    if aurl:
                        fname = aurl.rsplit("/", 1)[-1]
                        ext = fname.rsplit(".", 1)[-1].lower() if "." in fname else ""
                        if ext in DOC_EXT and fname.lower() not in seen_docs:
                            seen_docs.add(fname.lower())
                            docs.append({"title": title, "fname": fname, "url": aurl, "ext": ext})
    print(f"  {n_items} Items gelesen, {len(docs)} eindeutige Dokumente", file=sys.stderr)

    # Zuordnung aus Content-Referenzen + Stamm-Dokument (Sprachvarianten kollabieren)
    repo_idx = build_repo_index()
    rows = []
    for d in docs:
        fl = d["fname"].lower()
        refs = doc_refs.get(fl)
        if refs:
            ztitles = "; ".join(t for t, _ in refs.most_common(3))
        else:
            ztitles = ""
        lang = lang_of(d["fname"])
        stem = re.sub(r"[_-][a-z]{2}\.[a-z0-9]+$", "", fl) if lang else re.sub(r"\.[a-z0-9]+$", "", fl)
        rows.append({
            "Dokument": d["fname"],
            "Stamm": stem,
            "Typ": classify(d["fname"], d["url"]),
            "Sprache": lang or "—",
            "Zuordnung": ztitles or "(nur Mediathek)",
            "Auf_neuer_Site": "ja" if fl in repo_idx else "nein",
            "URL": d["url"],
            "Endung": d["ext"],
        })

    rows.sort(key=lambda r: (r["Typ"], r["Stamm"], r["Sprache"]))
    os.makedirs(os.path.dirname(OUT_CSV), exist_ok=True)
    with open(OUT_CSV, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    # Zusammenfassung
    by_type = Counter(r["Typ"] for r in rows)
    by_lang = Counter(r["Sprache"] for r in rows)
    present = Counter(r["Auf_neuer_Site"] for r in rows)
    linked = Counter("verknüpft (Seite/Produkt)" if r["Zuordnung"] != "(nur Mediathek)"
                     else "nur Mediathek" for r in rows)
    stems = sorted({r["Stamm"] for r in rows})
    unlinked = [r for r in rows if r["Zuordnung"] == "(nur Mediathek)"]

    with open(OUT_MD, "w", encoding="utf-8") as fh:
        fh.write("# Dokumenten-Inventar korodur.de (aus WordPress-Export 2026-06-11)\n\n")
        fh.write(f"Quelle: `{os.path.basename(XML)}`. Generiert von `scripts/extract-wp-dokumente.py`.\n")
        fh.write(f"Vollständige Liste: `dokumenten-inventar.csv` ({len(rows)} Dokumente, "
                 f"{len(stems)} Stamm-Dokumente ohne Sprachvarianten).\n\n")
        fh.write("## Bestand nach Typ\n\n| Typ | Anzahl |\n|---|---|\n")
        for k, v in by_type.most_common():
            fh.write(f"| {k} | {v} |\n")
        fh.write("\n_Typ ist heuristisch aus Dateiname/Pfad abgeleitet. „TDS (vermutet)\" = alles, "
                 "was nicht eindeutig Zertifikat/DoP/SDB/Broschüre ist; vor Übernahme stichprobenartig prüfen._\n")
        fh.write("\n## Bestand nach Sprache\n\n| Sprache | Anzahl |\n|---|---|\n")
        for k, v in by_lang.most_common():
            fh.write(f"| {k} | {v} |\n")
        fh.write("\n## Zuordnung\n\n| Status | Anzahl |\n|---|---|\n")
        for k, v in linked.most_common():
            fh.write(f"| {k} | {v} |\n")
        fh.write("\n_„verknüpft\" = Dokument wird im Inhalt mindestens einer Seite/eines Produkts verlinkt "
                 "(Spalte `Zuordnung` nennt die Seiten). „nur Mediathek\" = im Export hochgeladen, aber auf keiner "
                 "Seite verlinkt → Kandidat für veraltet/ungenutzt, manuell prüfen._\n")
        fh.write("\n## Abgleich neue Website\n\n| Auf neuer Site referenziert | Anzahl |\n|---|---|\n")
        for k, v in present.most_common():
            fh.write(f"| {k} | {v} |\n")
        fh.write(f"\n**Lücke:** {present.get('nein', 0)} von {len(rows)} Dokumenten sind auf der neuen Site "
                 f"noch nicht referenziert.\n")
        fh.write(f"\n**Nur in Mediathek** (auf keiner Seite verlinkt, Zuordnung manuell prüfen): {len(unlinked)}\n")

    print(f"OK: {len(rows)} Dokumente -> {OUT_CSV}", file=sys.stderr)
    print(f"     Zusammenfassung -> {OUT_MD}", file=sys.stderr)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Extrahiert die wesentlichen Inhalte aus dem korodur.de WordPress-Export (WXR)
in strukturierte JSON-Dateien + einen Überblick. Quelle der Wahrheit für die
Issue-Entsperrung (#274/#258/#100/#198 Referenzen, #75 Fachberater, Produkte).

Robust gegen die malformed Stelle im Export (Item-Splitting + lxml recover).

Output nach docs/website-migration/:
  extraktion-referenzen.json   (410: ACF-Felder + Beschreibung + Bilder)
  extraktion-produkte.json     (202: Beschreibung + TDS-Links + Kategorien)
  extraktion-fachberater.json  (13:  Kontakt + Region + Geo)
  extraktion-tabellen.json     (300: TablePress-Datentabellen)
  extraktion-overview.md       (Überblick + Feld-Abdeckung)
"""
import json
import os
import re
import sys
from collections import Counter, defaultdict
from lxml import etree, html as lxhtml

XML = "/Users/sfleischmann/Desktop/Screenshots/korodur.WordPress.2026-06-11.xml"
REPO = "/Users/sfleischmann/KORODUR/KORODUR-Website"
OUT = os.path.join(REPO, "docs/website-migration")
WP = "{http://wordpress.org/export/1.2/}"
CONT = "{http://purl.org/rss/1.0/modules/content/}"
NSWRAP = ('<rss xmlns:wp="http://wordpress.org/export/1.2/" '
          'xmlns:content="http://purl.org/rss/1.0/modules/content/" '
          'xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" '
          'xmlns:dc="http://purl.org/dc/elements/1.1/" '
          'xmlns:wfw="http://wellformedweb.org/CommentAPI/">{}</rss>')
PARSER = etree.XMLParser(recover=True, huge_tree=True)


def t(el, tag):
    c = el.find(tag) if el is not None else None
    return (c.text or "").strip() if c is not None and c.text else ""


def metas(el):
    d = {}
    for m in el.findall(f"{WP}postmeta"):
        k = t(m, f"{WP}meta_key")
        if k and k not in d:
            d[k] = t(m, f"{WP}meta_value")
    return d


def html_text(s):
    if not s or "<" not in s:
        return (s or "").strip()
    try:
        return re.sub(r"\s+", " ", lxhtml.fromstring(s).text_content()).strip()
    except Exception:
        return re.sub(r"<[^>]+>", " ", s).strip()


def html_links(s):
    """[(text, href)] aus HTML."""
    out = []
    if not s or "<a" not in s:
        return out
    try:
        for a in lxhtml.fromstring(s).xpath("//a"):
            href = a.get("href", "").strip()
            txt = re.sub(r"\s+", " ", a.text_content()).strip()
            if href:
                out.append({"text": txt, "href": href})
    except Exception:
        pass
    return out


def product_slugs(links):
    """KORODUR-Produkt-Slugs aus Links (/produkt/<slug>/ oder /produkte/<slug>/)."""
    slugs = []
    for l in links:
        m = re.search(r"/produkte?/([^/?#]+)", l["href"])
        if m:
            slugs.append(m.group(1))
    return slugs


def parse_ids(s):
    if not s:
        return []
    return [int(x) for x in re.findall(r"\d+", s)]


def categories(el):
    d = defaultdict(list)
    for cat in el.findall("category"):
        dom = cat.get("domain") or "?"
        if cat.text:
            d[dom].append(cat.text.strip())
    return dict(d)


def main():
    att = {}            # attachment post_id -> url
    refs, prods, agents, tables = [], [], [], []
    raw = {"referenzen": refs, "product": prods, "agents": agents}

    n = 0
    with open(XML, encoding="utf-8", errors="replace") as fh:
        buf, inside = [], False
        for line in fh:
            if "<item>" in line:
                inside, buf = True, []
            if inside:
                buf.append(line)
            if inside and "</item>" in line:
                inside = False
                n += 1
                try:
                    el = etree.fromstring(NSWRAP.format("".join(buf)).encode("utf-8"), PARSER).find("item")
                except Exception:
                    el = None
                if el is None:
                    continue
                pt = t(el, f"{WP}post_type")
                pid = t(el, f"{WP}post_id")
                if pt == "attachment":
                    url = t(el, f"{WP}attachment_url")
                    if url:
                        att[pid] = url
                    continue
                if pt not in ("referenzen", "product", "agents", "tablepress_table"):
                    continue
                m = metas(el)
                ce = el.find(f"{CONT}encoded")
                body = (ce.text or "") if ce is not None else ""
                base = {
                    "id": pid,
                    "title": t(el, "title"),
                    "slug": t(el, f"{WP}post_name"),
                    "status": t(el, f"{WP}status"),
                    "link": t(el, "link"),
                }
                if pt == "tablepress_table":
                    data = None
                    try:
                        data = json.loads(body) if body.strip().startswith("[") else None
                    except Exception:
                        data = None
                    tables.append({**base, "data": data, "raw": None if data else body[:4000]})
                elif pt == "referenzen":
                    prod_html = m.get("ref_product", "")
                    links = html_links(prod_html)
                    cats = categories(el)
                    gallery = parse_ids(m.get("ref_image-gallery", ""))
                    thumb = parse_ids(m.get("_thumbnail_id", ""))
                    refs.append({
                        **base,
                        "beschreibung": html_text(body),
                        "ref_type": m.get("ref_type", ""),            # Neubau/Sanierung
                        "ref_category": m.get("ref_category", ""),    # Bereich
                        "kategorien": cats.get("reference-categories", []),
                        "land": m.get("ref_country", ""),
                        "ort": m.get("ref_location", ""),
                        "baujahr": m.get("ref_construction-year", ""),
                        "flaeche": m.get("ref_area", ""),
                        "dimension": m.get("ref_dimension", ""),
                        "bauherr": m.get("ref_builder", ""),
                        "kunde": m.get("ref_client", ""),
                        "verarbeiter": m.get("ref_verarbeiter", ""),
                        "produkte_text": html_text(prod_html),
                        "produkte_slugs": product_slugs(links),
                        "produkte_links": links,
                        "thumbnail_url": att.get(str(thumb[0])) if thumb else None,
                        "gallery_ids": gallery,
                    })
                elif pt == "product":
                    cats = categories(el)
                    pdfs = html_links(m.get("pdfs", ""))
                    refs_links = html_links(m.get("reference", ""))
                    table_ids = [int(x) for x in re.findall(r"\[table id=(\d+)", body)]
                    prods.append({
                        **base,
                        "front_description": m.get("front_description", ""),
                        "beschreibung": html_text(body),
                        "product_cat": cats.get("product_cat", []),
                        "brand": cats.get("brand", []),
                        "sku": m.get("_sku", ""),
                        "dokumente": pdfs,
                        "additional_info": html_links(m.get("additional_info", "")),
                        "referenz_links": refs_links,
                        "table_ids": table_ids,
                        "thumbnail_url": att.get(m.get("_thumbnail_id", "")),
                    })
                elif pt == "agents":
                    agents.append({
                        **base,
                        "name": m.get("agent-name", ""),
                        "position": m.get("job-description", ""),
                        "bereich": m.get("agent-position-area", ""),
                        "adresse": m.get("agent-address", ""),
                        "email": m.get("agent-email", ""),
                        "telefon": m.get("agent-phone", ""),
                    })

    # Galerie-URLs nachziehen (att ist nach vollem Durchlauf komplett)
    for r in refs:
        r["gallery_urls"] = [att[str(i)] for i in r["gallery_ids"] if str(i) in att]

    os.makedirs(OUT, exist_ok=True)
    for fn, data in [("extraktion-referenzen.json", refs),
                     ("extraktion-produkte.json", prods),
                     ("extraktion-fachberater.json", agents),
                     ("extraktion-tabellen.json", tables)]:
        with open(os.path.join(OUT, fn), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)

    # Überblick
    def cov(items, field):
        return sum(1 for x in items if x.get(field))
    ref_type = Counter(r["ref_type"] or "(leer)" for r in refs)
    ref_cat = Counter(r["ref_category"] or "(leer)" for r in refs)
    ref_status = Counter(r["status"] for r in refs)
    with open(os.path.join(OUT, "extraktion-overview.md"), "w", encoding="utf-8") as f:
        f.write("# Inhalts-Extraktion korodur.de (WordPress-Export 2026-06-11)\n\n")
        f.write(f"Generiert von `scripts/extract-wp-content.py`. {n} Items verarbeitet.\n\n")
        f.write(f"- **Referenzen:** {len(refs)} (Beschreibung: {cov(refs,'beschreibung')}, "
                f"eingesetzte Produkte: {cov(refs,'produkte_text')}, Fläche: {cov(refs,'flaeche')}, "
                f"Ort: {cov(refs,'ort')}, Galeriebilder: {sum(1 for r in refs if r['gallery_urls'])})\n")
        f.write(f"- **Produkte:** {len(prods)} (Beschreibung: {cov(prods,'beschreibung')}, "
                f"Dokumente verlinkt: {cov(prods,'dokumente')})\n")
        f.write(f"- **Fachberater:** {len(agents)}\n")
        f.write(f"- **TablePress-Tabellen:** {len(tables)} (als JSON geparst: {cov(tables,'data')})\n\n")
        f.write("## Referenzen nach Projektart (ref_type)\n\n| Projektart | Anzahl |\n|---|---|\n")
        for k, v in ref_type.most_common():
            f.write(f"| {k} | {v} |\n")
        f.write("\n## Referenzen nach Bereich (ref_category)\n\n| Bereich | Anzahl |\n|---|---|\n")
        for k, v in ref_cat.most_common():
            f.write(f"| {k} | {v} |\n")
        f.write("\n## Referenz-Status\n\n| Status | Anzahl |\n|---|---|\n")
        for k, v in ref_status.most_common():
            f.write(f"| {k} | {v} |\n")
        f.write(f"\n_Hinweis: Der Export enthält WPML-Übersetzungen als eigene Posts; die "
                f"{len(refs)} Referenzen umfassen Sprachvarianten (DE/EN/FR). Dedupe über Slug/Bildsatz "
                f"beim App-Import. Status `draft` ({ref_status.get('draft',0)}) = nie online gegangen (#198)._\n")

    print(f"OK: {len(refs)} Referenzen, {len(prods)} Produkte, {len(agents)} Fachberater, "
          f"{len(tables)} Tabellen -> {OUT}", file=sys.stderr)


if __name__ == "__main__":
    main()

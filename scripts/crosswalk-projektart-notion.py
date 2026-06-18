#!/usr/bin/env python3
"""
Crosswalk Projektart (Neubau/Sanierung): Notion DB1 ↔ Repo-Referenz-Ableitung (#240)
====================================================================================

Vergleicht die Notion-SoT (`Neubau/Sanierung` am Produkt, Snapshot
notion-neubau-sanierung.csv) mit der datengetriebenen Repo-Ableitung aus den
Referenzen (projektart-ableitung.csv, erzeugt von derive-produkt-projektart.ts).

Join: Notion-Slug == Repo-id (primär), sonst normalisierter Name.

Kategorien je Produkt:
  CONFIRM        Notion befüllt, Ableitung ⊆ Notion → Daten stützen Notion.
  CONFLICT       Ableitung enthält Bucket, den Notion NICHT hat → Klärfall (Frank).
  FILL           Notion LEER, Ableitung vorhanden → datengetriebener Befüll-Vorschlag.
  FRANK          Notion leer, Ableitung leer (keine Referenz) → braucht Frank/Technik.
  NOTION-ONLY    Notion befüllt, keine Referenz-Ableitung → Notion vertrauen, keine Aktion.
  NO-MATCH       Repo-Produkt nicht in Notion DB1 (z.B. Katzenstreu).

Output: stdout-Report + projektart-crosswalk.md
"""
import csv, re, sys
from pathlib import Path

BASE = Path("docs/reference/produktart-klassifizierung")
notion_rows = list(csv.DictReader(open(BASE / "notion-neubau-sanierung.csv")))
repo_rows = list(csv.DictReader(open(BASE / "projektart-ableitung.csv")))

def norm(s: str) -> str:
    s = s.upper().strip()
    s = re.sub(r"\s+", " ", s)
    return s

def strip_base(s: str) -> str:
    """Markenpräfix entfernen, damit Stammprodukt-Name (Repo) und Varianten-Titel
    (Notion) matchen: 'KORODUR DUROP' ~ 'DUROP 0,5 - 1,0' → Basis 'DUROP'."""
    s = norm(s)
    for pre in ("KORODUR ", "NEODUR ", "RAPID SET "):
        if s.startswith(pre):
            s = s[len(pre):]
    return s.strip()

# Notion-Index: slug → row, normName → row
n_by_slug = {r["notion_slug"]: r for r in notion_rows if r["notion_slug"]}
n_by_name = {}
for r in notion_rows:
    n_by_name.setdefault(norm(r["notion_titel"]), r)

def parse_set(s: str) -> set:
    return set(x for x in s.split("|") if x) if s else set()

def variant_match(rname: str):
    """Alle Notion-Zeilen, deren Basis-Titel mit dem Repo-Basisnamen beginnt
    (Stammprodukt → 1..n Varianten). Gibt (rows, vereinigte NS-Menge) zurück."""
    base = strip_base(rname)
    hits = []
    for r in notion_rows:
        nb = strip_base(r["notion_titel"])
        if nb == base or nb.startswith(base + " ") or base.startswith(nb + " "):
            hits.append(r)
    union = set()
    for r in hits:
        union |= parse_set(r["neubau_sanierung"])
    return hits, union

# Repo-Ableitung → {neubau, sanierung}-Set (deutsche Labels für Vergleich mit Notion)
ABL_TO_SET = {
    "neubau": {"Neubau"},
    "sanierung": {"Sanierung"},
    "beide": {"Neubau", "Sanierung"},
    "keine": set(),
}

NOTION_TO_ABL = {"Neubau": "neubau", "Sanierung": "sanierung"}
overrides = {}  # repo-id → [projektart] für referenzlose Produkte (Notion-Wert)

matched_notion_slugs = set()
results = []
for rp in repo_rows:
    rid, rname, bereich, abl = rp["id"], rp["name"], rp["bereich"], rp["ableitung"]
    D = ABL_TO_SET[abl]
    nrow = n_by_slug.get(rid) or n_by_name.get(norm(rname))
    if nrow:
        match_rows, N = [nrow], parse_set(nrow["neubau_sanierung"])
    else:
        match_rows, N = variant_match(rname)
    if not match_rows:
        results.append((bereich, rname, abl, "—", "NO-MATCH", ""))
        continue
    for mr in match_rows:
        matched_notion_slugs.add(mr["notion_slug"] or norm(mr["notion_titel"]))
    n_disp = "|".join(sorted(N)) if N else "(leer)"
    if not N and D:
        cat = "FILL"; note = f"→ Vorschlag: {', '.join(sorted(D))}"
    elif not N and not D:
        cat = "FRANK"; note = "keine Referenz, Notion leer"
    elif N and not D:
        cat = "NOTION-ONLY"; note = "keine Referenz-Deckung"
        overrides[rid] = sorted(NOTION_TO_ABL[x] for x in N if x in NOTION_TO_ABL)
    elif D <= N:
        cat = "CONFIRM"; note = ""
    else:
        cat = "CONFLICT"; note = f"Ableitung {sorted(D)} ⊄ Notion {sorted(N)}"
        # Sicher: Vereinigung, damit das Produkt in keinem relevanten Bereich
        # verschwindet. Technik grenzt später ein.
        overrides[rid] = sorted(NOTION_TO_ABL[x] for x in (D | N) if x in NOTION_TO_ABL)
    results.append((bereich, rname, abl, n_disp, cat, note))

# Notion-Produkte OHNE Repo-Gegenstück (in Notion, nicht in den 71 Repo-Produkten)
notion_only = []
for r in notion_rows:
    key = r["notion_slug"] or norm(r["notion_titel"])
    if key not in matched_notion_slugs:
        notion_only.append(r)

# Report
from collections import Counter
cats = Counter(r[4] for r in results)
lines = []
def out(s=""):
    print(s); lines.append(s)

out(f"# Crosswalk Projektart Notion ↔ Repo-Ableitung (#240)\n")
out(f"Notion DB1: {len(notion_rows)} Produkte · Repo-Ableitung: {len(repo_rows)} Produkte\n")
out("## Zusammenfassung")
for c in ["CONFIRM", "CONFLICT", "FILL", "FRANK", "NOTION-ONLY", "NO-MATCH"]:
    out(f"- **{c}**: {cats.get(c,0)}")
out("")
out("## FILL — datengetriebene Befüll-Vorschläge für leere Notion-Produkte")
out("| Bereich | Produkt | Vorschlag (aus Referenzen) |")
out("|---|---|---|")
for b, n, abl, nd, cat, note in results:
    if cat == "FILL":
        out(f"| {b} | {n} | **{abl}** |")
out("")
out("## CONFLICT — Klärfälle (Ableitung widerspricht Notion → Frank/Technik)")
out("| Bereich | Produkt | Ableitung | Notion | Hinweis |")
out("|---|---|---|---|---|")
ncon = 0
for b, n, abl, nd, cat, note in results:
    if cat == "CONFLICT":
        out(f"| {b} | {n} | {abl} | {nd} | {note} |"); ncon += 1
if not ncon:
    out("| — | (keine) | | | |")
out("")
out("## FRANK — weder Referenz noch Notion-Wert (braucht Technik)")
frank = [r for r in results if r[4] == "FRANK"]
out(", ".join(f"{r[1]}" for r in frank) or "(keine)")
out("")
out(f"## NO-MATCH — Repo-Produkte nicht in Notion DB1 ({cats.get('NO-MATCH',0)})")
out(", ".join(r[1] for r in results if r[4] == "NO-MATCH") or "(keine)")
out("")
out(f"## Notion-Produkte ohne Repo-Gegenstück ({len(notion_only)}) — Varianten/Spezialitäten/eingestellt")
out(", ".join(f"{r['notion_titel']}" for r in notion_only) or "(keine)")

Path(BASE / "projektart-crosswalk.md").write_text("\n".join(lines) + "\n")
print(f"\n→ {BASE / 'projektart-crosswalk.md'} geschrieben.", file=sys.stderr)

import json
Path(BASE / "projektart-overrides.json").write_text(
    json.dumps(overrides, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
)
print(f"→ {len(overrides)} Overrides (referenzlose Produkte mit Notion-Wert) → projektart-overrides.json", file=sys.stderr)

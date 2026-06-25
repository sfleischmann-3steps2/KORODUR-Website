# Dokumenten-Anreicherung — Datenbasis Download-Center (#300 → #301)

Reichert das rohe Inventar (`dokumenten-inventar.csv`, 1162 Dokumente) zur
filterbaren Download-Center-Datenbasis an. Ergebnis: **`dokumente-stamm.json`**
(799 Stamm-Dokumente, je mit Typ, Sprachen, URLs, Produkt-/Bereich-Mapping aufs
**aktuelle** Portfolio und Status).

## Pipeline

1. **Dedup** — 1162 Sprachvarianten → **799 Stamm-Dokumente** (Sprachen-Set + URLs je Sprache).
2. **Deterministisch** (`scripts/enrich-dokumente-inventar.ts`):
   - Typ-Heuristik per Dateinamen-Regeln verfeinert.
   - Produkt-Mapping: exakter `[product]`-Token- **und** Dateinamen-Substring-Match gegen die 67 aktuellen Produkte (Alt-Site verlinkte TDS über Index-Seiten → Produktidentität steckt im Dateinamen).
   - Bereich-Crosswalk: Alt-Taxonomie → aktueller Slug (`Sichtestrich/Designboden/TRUazzo → industrieboden`, `Schnellbetonsysteme → infrastruktur`, `Spezialbaustoffe → spezialmoertel`).
   - Presse/PR deterministisch ausgeschlossen.
   - Ergebnis: **358 auto-gemappt**, **73 Presse excluded**, **368 needsReview**.
3. **AI-Workflow** (`dok-inventar-anreicherung`, 19 Sonnet-Agents über die 368 Zweifelsfälle):
   - keep/exclude-Entscheidung, Typ-Korrektur, Produkt-/Bereich-Mapping aus Dateiname + Zuordnung.
   - Ergebnis: **193 keep** (AI-gemappt), **175 exclude** (zusätzliche Presse-/Altlast, die der Regex verfehlte — Fachmagazine wie `bau_*`, `architektur_*`, `aqua_gas`).
   - Validierung beim Merge: nicht existente Produkt-IDs verworfen (0 aufgetreten).

## Finaler Stand (`dokumente-stamm.json`)

| Status | Anzahl | Bedeutung |
|---|---|---|
| `auto` | 358 | deterministisch gemappt |
| `ai` | 193 | Workflow-gemappt |
| `excluded` | 248 | Presse/Altlast, nicht im Download-Center |
| **Download-relevant (auto+ai)** | **551** | |

**Typ:** 328 TDS · 85 SDB · 83 System-Service · 43 Broschüre · 8 DoP · 2 Zertifikat · 2 Sonstiges.

**Bereich-Abdeckung** (Dokument zählt je Bereich): industrieboden 373 · rapid-set 91 · infrastruktur 76 · spezialmoertel 68 · microtop 29 · 3d-concrete-printing 3 · katzenstreu 3.

**Produkt-Abdeckung: 65/67** Produkte mit ≥1 Dokument. **Lücke (2):**
`neodur-svm-4` (NEODUR SVM 4), `rapid-set-mortar-mix-dur` (Rapid Set MORTAR MIX DUR)
→ Dokumente fehlen im WP-Export 2023, bei Technik nachfordern.

## Felder je Dokument

`stamm` · `titel` · `typ` · `sprachen[]` · `urls{sprache:url}` · `aufNeuerSite` ·
`zuordnung` (Alt-Site-Roh) · `produkte[]` (aktuelle IDs) · `bereiche[]` (aktuelle Slugs) ·
`status` (auto|ai|excluded) · `konfidenz` (nur ai).

## Reproduzieren

`npx tsx scripts/enrich-dokumente-inventar.ts` erzeugt den deterministischen Stand
(auto/excluded/needsReview). Der AI-Schritt für die needsReview-Teilmenge lief als
Dynamic Workflow (19 Sonnet-Agents); die Klassifikationen sind in `dokumente-stamm.json`
eingefroren. Quelle bleibt das CSV-Inventar.

## Offen / zu prüfen (Steffi/Technik)

- **248 excluded** stichprobenartig gegenprüfen (nichts ist gelöscht — Status `excluded` im selben File, jederzeit revidierbar).
- **2 Produkt-Lücken** (s. o.) — Dokumente nachfordern.
- TDS-Typzuordnung bleibt teils heuristisch; vor Live-Schaltung des Download-Centers (#301) stichprobenartig gegen die echten PDFs prüfen.

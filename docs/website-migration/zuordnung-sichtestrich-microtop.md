# Zuordnung Sichtestrich + Microtop (Sign-off Steffi/Frank)

**Stand:** 2026-06-12 | **Status:** Umgesetzt als Vorschlag, Sign-off ausstehend
**Quellen:** `bereiche_sichtestrich_details.md` (direkt gelesen) + `extraktion-microtop.json` + `Normen produkte.xlsx`

## Sichtestrich — Gruppen

| Gruppe | Produkte | Bemerkung |
|---|---|---|
| Geschliffener Sichtestrich (`geschliffen`) | GRANIDUR (Varianten 05/08) · GRANIDUR BIANCO/NERO | Alt-Site-Struktur 1:1 |
| Geglätteter Sichtestrich (`geglaettet`) | KORODUR COPETTI FLOOR KCF (Varianten 05/08/**05 rapid**) | KCF 05 rapid als Variante neu erfasst (stand nicht in der Produktübersicht) |
| TRUazzo (`truazzo`) | TRU Self-Leveling (Bestand, angereichert) · TRU PC (neu) · TRU SP (neu) | Rapid-Set-Technologie, Marken-Schreibweise "TRUAZZO" der Excel als "TRUazzo" übernommen (Alt-Site-Schreibweise) |

## Microtop — Gruppen

| Gruppe | Produkte | Bemerkung |
|---|---|---|
| Trockenspritzverfahren (`trockenspritz`) | TW 3 · TW 5 · TW 8 | DVGW W 270/300/347; TW 3-Klasse C30/37 aus Excel (Scrape nennt keine) |
| Nassspritzverfahren (`nassspritz`) | TW NSM · TW 02 · TW VSM | TW VSM: C12/15 + W 347 aus Excel |
| Beschichtung & Oberflächenschutz (`beschichtung-schutz`) | TW BM · TW Mineral | TW BM auch Haftbrücke/Korrosionsschutz; TW Mineral = Silikat-Imprägnierung des Systems |

## Entscheidungen und Konflikte

1. **TW 2 vs. TW 02:** Die Alt-Produktübersicht nennt "TW 2 (Dünnschicht)", die Quelle kennt in allen Navigationen nur **TW 02** (die TW-2-Seite ist leer), die Excel führt "TW 02 Nassspritzmörtel". Migriert als **MICROTOP TW 02**; TW 2 nicht migriert (vermutlich identisch). ⚠️ Bitte bestätigen.
2. **TW VSM:** Produktübersicht sagt "Vorspritz", die Excel "Vorspritzmörtel" (C12/15, W 347), der Quellen-Teaser beschreibt aber Innenauskleidung/Instandsetzung. Kennwerte aus Excel übernommen, Beschreibung aus Quelle. ⚠️ Produktart klären.
3. **TW NSD** (Produktübersicht) kommt in der Quelle nicht vor — nicht migriert.
4. **TW NSM, TW 02:** nur Teaser-Daten, keine Kennwerte (Detailseiten leer) — TDS-Vervollständigung offen.
5. **TW Mineral ohne DVGW-Angabe** in der Quelle (auffällig für ein Trinkwasserprodukt) — nicht ergänzt, TDS klären.
6. **SKUs** durchgehend nicht übernommen (wie Teil 1).

## Sign-off

- [ ] Gruppen-Schnitt Sichtestrich (3) + Microtop (3) OK
- [ ] TW 02 = TW 2 bestätigt
- [ ] TW VSM Produktart geklärt (Vorspritz vs. Innenauskleidung)

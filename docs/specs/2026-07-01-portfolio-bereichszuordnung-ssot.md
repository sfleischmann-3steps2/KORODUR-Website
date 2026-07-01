# Portfolio-/Bereichszuordnung als Single Source of Truth (Notion-Kern-DB)

**Datum:** 2026-07-01 · **Issue:** #306 · **Branch:** `feature/portfolio-bereichszuordnung-v1`
**SoT:** Notion-Kern-Produktdatenbank, View `388670e1…` (Properties **Produktart** [neu Multi] + **Portfoliobereich Website Neu** + **Neubau/Sanierung**).
**Datenexport:** `docs/reference/notion-ssot-produkt-bereich.md` (88er-Set, Stand 2026-07-01).

## 0. Gelockte Entscheidungen (Steffi, 2026-07-01)

1. **Notion-Kern-DB ist SSoT** für Produkt↔Bereich + Produktart. Bei Konflikt gewinnt Notion (löst die ältere Repo-Mapping-Spec 2026-06-22 ab).
2. **Bereichs-Diffs an Notion angleichen** (auch wenn Produkte damit aus Betonsanierung verschwinden).
3. **Alle 88 Website-Produkte** (Website-Status `online`/`fehlt`) gehören auf die Website; die 4 `nicht vorgesehen` bleiben draußen.
4. **Marke eingerückt** im Portfolio-Vorfilter · **Inbo Neubau/Sanierung jetzt verdrahten** · **Sichtestrich aufgelöst lassen** (in Industrieboden, #331).

## 1. Grundwahrheit (Audit gegen den echten Code)

- **Die Renderer folgen bereits der Datenschicht.** Bereichsseiten (dediziert + generisch) + `/produkte`-Filter leiten ihre Produkte aus dem `bereich`/`zusatzBereiche`-Feld ab (`gehoertZuBereich`). Kein Render-Refactor nötig — die SSoT wirkt über die Daten. Ausnahme by design: die **Rapid-Set-Marken-Seite** (`RAPID_SET_PRODUKT_IDS`, kuratiert).
- **86 der 88 Produkte waren bereits auf der Website.** Die scheinbaren „12 fehlenden" waren ein Matching-Artefakt: 7 sind **Inline-Varianten** ihrer Mutterprodukte (HE 40/8, HE 60 rapid SVS/metallisch, VM 3 + VB 8 auf VM 1, CEMENT ALL Plus), 3 Additive sind über `rapid-set-concrete-pharmacy` abgedeckt. **Genuin fehlend: nur NEODUR USM 3 + USM 5.**
- **Inbo Neubau/Sanierung war bereits verdrahtet** (`PRODUKT_PROJEKTART_OVERRIDES`, Notion-Termin 2026-06-23) — **0 Drift** gegen die heutige View. Nur der `klassifizierung_folgt`-Platzhalter war veraltet.

## 2. Umgesetzt (7 Commits)

| # | Commit | Inhalt |
|---|---|---|
| 1 | Marke in Bereichs-Label | „Betonsanierung (Rapid Set)", „TW-Behältersanierung (MICROTOP)" — Menü + Kacheln, 5 Sprachen |
| 2 | Bereichs-Zuordnung = SSoT | ARM → nur Infrastruktur · DOT Europe + Industrieboden · SVM 03/4 + VM 5 raus aus Betonsanierung |
| 3 | Produktart → Multi | Notion-Multichoice; Produkt erscheint unter allen seinen Produktarten (z. B. MICROTOP TW = Spritzmörtel **+** TW-Beschichtungsmörtel) |
| 4 | USM 3/5 anlegen | 2 genuin fehlende Produkte (Betonsanierung, Unterstopfmörtel), Kennwerte bewusst leer (Standing Rule) |
| 5 | Portfolio-Vorfilter | Marke eingerückt: Rapid Set unter Betonsanierung, MICROTOP unter TW-Behältersanierung |
| 6 | Inbo Neubau/Sanierung | 9 fehlende Overrides ergänzt (7 Varianten-PDPs + USM), Platzhalter entfernt |
| 7 | Cleanup | Betonsanierung-Verguss-Teaser + Menü-Kommentar an SSoT angeglichen |

**Produktart-Kollaps (Annahme):** Notion-Produktarten ohne eigenen Website-Slug (Oberflächenvergütung, Glätthilfe, Zwischennachbehandlung, Synthetisches Füll-/Abstreumaterial, Ankermörtel) fallen auf die bestehende Code-/Gewerk-Zuordnung zurück. **Notiert für Frank:** `MICROTOP TW Mineral` = laut Notion Imprägnierung/Oberflächenvergütung (nicht TW-Beschichtungsmörtel) → im Portfolio unter Imprägnierung, bleibt aber im MICROTOP-**Bereich**.

## 3. Offene Punkte / Koordination

- **PDP-Track (#373):** Die 7 Inline-Varianten zu eigenständigen Varianten-PDPs hochziehen (HE 40/8, HE 60 rapid SVS/metallisch, VM 3, VB 8, CEMENT ALL Plus). Sie sind **bereits auf der Website** (als Varianten); die Promotion ist PDP-Enrichment, nicht Zuordnung. Board-Claim an #306 gesetzt.
- **Additive-Split (optional):** Notion führt FAST/FLOW/SET einzeln; der Code deckt sie über `rapid-set-concrete-pharmacy` (Kombi) ab. Split + Concrete-Pharmacy-Dedup = PDP-Entscheidung.
- **USM 3/5 Kennwerte:** Website-Status „fehlt" — TDS/Kennwerte über die Technik nachliefern.
- **Sichtestrich-Geisterslug:** noch im `Produktbereich`-Typ + Validator + `sichtestrich_name`-Dict, ohne Registry/Produkte. Harmlos (kein Render), aufräumen bei Gelegenheit.
- **USM-Produktgruppe:** provisorisch `verguss` (Betonsanierung hat keine `unterstopf`-Gruppe). Ggf. eigene Gruppe.

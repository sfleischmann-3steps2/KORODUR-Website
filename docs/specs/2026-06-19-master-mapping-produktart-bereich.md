# Master-Mapping: Produkt × Produktart (Lieferprogramm) × Bereich Neubau/Sanierung

**Issue #306 · Entwurf (Claude) → Validierung Frank.** Stand 2026-06-19.

**Quellen:** `KORODUR_Lieferprogramm_de_2025.pdf` (autoritativ für die Produktart-Taxonomie) + `data/produkte.ts` (71 Produkte App-Bestand).

## Logik (Zwei-Achsen-IA, Entscheidung 2026-06-19)
- **Produktart** = Portfolio-Achse, 1:1 nach Lieferprogramm-Sektionen (12 Gruppen).
- **Bereich Neubau:** `Inbo` · `Designestrich`
- **Bereich Sanierung:** `Inbo` · `TW-Behältersanierung` · `Infrastruktur` · `Betonsanierung`
- Mehrfachzuordnung erlaubt (`+`), Produkte können in mehreren Bereichen/Achsen stehen (z. B. RS bei Inbo-Sanierung).
- „Betonsanierung“ statt „Betoninstandsetzung“ (Begriffs-Freigabe 1504/RS offen, siehe #140/#308).
- `—` = derzeit keinem Bereich dieser Achse zugeordnet (oft Hilfsprodukt einer Achse oder Klärfall).

## Vollständiges Mapping (71 Produkte)

| ID | Produkt | Produktart (Lieferprogramm) | Neubau | Sanierung | Hinweis / Flag |
|---|---|---|---|---|---|
| `korodur-0-4` | KORODUR 0/4 | Hartstoffe DIN 1100 | Inbo | — |  |
| `korodur-vs-0-5` | KORODUR VS 0/5 | Hartstoffe DIN 1100 | Inbo | — |  |
| `korodur-wh-spezial` | KORODUR WH-Spezial | Hartstoffe DIN 1100 | Inbo | — |  |
| `korodur-wh-metallisch` | KORODUR WH-metallisch | Hartstoffe DIN 1100 | Inbo | — |  |
| `korodur-diamantbeton` | KORODUR Diamantbeton | Hartstoffe DIN 1100 | Inbo | — |  |
| `neodur-he-3` | NEODUR HE 3 | Industrieboden-Trockenmörtel | Inbo | — | Einstreuung |
| `neodur-he-3-green` | NEODUR HE 3 green | Industrieboden-Trockenmörtel | Inbo | — | Einstreuung, CO₂-reduziert |
| `neodur-he-2` | NEODUR HE 2 | Industrieboden-Trockenmörtel | Inbo | — | Einstreuung |
| `neodur-he-65` | NEODUR HE 65 | Industrieboden-Trockenmörtel | Inbo | Inbo | ? Verbundestrich auch auf erhärtetem Tragbeton (Sanierungs-Overlay) — Frank bestätigen |
| `neodur-he-65-plus` | NEODUR HE 65 Plus | Industrieboden-Trockenmörtel | Inbo | Inbo | Verbundestrich auf erhärtetem Tragbeton ohne Haftbrücke → auch Sanierung |
| `neodur-he-40` | NEODUR HE 40 | Industrieboden-Trockenmörtel | Inbo | — | Trockenestrich C35/C45 |
| `neodur-he-60-rapid` | NEODUR HE 60 rapid | Schnellestrich/-Bindemittel | Inbo | Inbo | LP3: „zur Herstellung UND Sanierung“ |
| `korodur-fscem` | KORODUR FSCem | Schnellestrich/-Bindemittel | Inbo | Inbo |  |
| `korodur-fscem-screed` | KORODUR FSCem Screed | Schnellestrich/-Bindemittel | Inbo | Inbo |  |
| `neodur-level` | NEODUR Level | Selbstverlaufende Industrieböden | Inbo | Inbo |  |
| `neodur-level-au` | NEODUR Level AU | Selbstverlaufende Industrieböden | Inbo | Inbo | außen, Ausgleichsmasse |
| `rapid-set-levelflor` | Rapid Set LevelFlor | Rapid Set | Inbo | Inbo | LP10.13 Ausgleichsmasse |
| `korodur-uniprimer` | KORODUR uniPrimer | Haftbrücke/Grundierung | Inbo | Inbo | Hilfsprodukt |
| `korodur-hb-5` | KORODUR HB 5 | Haftbrücke/Grundierung | Inbo | Inbo | Hilfsprodukt |
| `korodur-hb-5-rapid` | KORODUR HB 5 rapid | Haftbrücke/Grundierung | Inbo | Inbo | Hilfsprodukt |
| `korodur-pc` | KORODUR PC | Haftbrücke/Grundierung | Inbo | Inbo | Hilfsprodukt |
| `korodur-txpk` | KORODUR TXPK | Haftbrücke/Grundierung | Inbo | Inbo | EP-Grundierung |
| `korocure` | KOROCURE | Nachbehandlung/Curing | Inbo | Inbo | Hilfsprodukt |
| `koromineral-cure` | KOROMINERAL CURE | Nachbehandlung/Curing | Inbo | Inbo | Hilfsprodukt |
| `korotex` | KOROTEX | Nachbehandlung/Curing | Inbo | Inbo | Hilfsprodukt |
| `korodur-easyfinish` | KORODUR easyFinish | Nachbehandlung/Curing | Inbo | Inbo | Hilfsprodukt |
| `korodur-nanofinish` | KORODUR nanoFinish | Nachbehandlung/Curing | Inbo | Inbo | Hilfsprodukt |
| `koromineral` | KOROMINERAL | Imprägnierung/Einpflege | Inbo | Inbo | Hilfsprodukt |
| `koromineral-li` | KOROMINERAL Li+ | Imprägnierung/Einpflege | Inbo | Inbo | Hilfsprodukt |
| `koroclean` | KOROCLEAN | Imprägnierung/Einpflege | — | Inbo | Reinigungsschliff/Pflege (System MKS Funke) |
| `koromineral-lasur` | KOROMINERAL Lasur | Imprägnierung/Einpflege | Inbo | — | ⚠ „Lasur“ nicht im Lieferprogramm gelistet — App↔LP klären |
| `korodur-durop` | KORODUR DUROP | DUROP (Kunstharz-Zuschlag) | Inbo | — | LP9 auch „Straßen- und Brückenbau“ → Neubau-Infrastruktur? (Infrastruktur derzeit nur Sanierungs-Bereich) |
| `korodur-robust` | KORODUR Robust | DUROP (Kunstharz-Zuschlag) | Inbo | — | ⚠ „Robust“ nicht im Lieferprogramm gelistet — App↔LP klären |
| `korodur-silosystem` | KORODUR Silosystem | — (Liefersystem) | Inbo | Inbo | Kein einzelnes LP-Produkt — Liefer-/Silosystem |
| `system-korodur-korotan` | System KORODUR-KOROTAN | — (System) | Inbo | Inbo | Kein einzelnes LP-Produkt — System |
| `tru-self-leveling` | TRU Self-Leveling | Mineralische Sichtestriche | Designestrich | — |  |
| `tru-pc` | TRU PC | Mineralische Sichtestriche | Designestrich | — | Betonoptik |
| `tru-sp` | TRU SP | Mineralische Sichtestriche | Designestrich | — | Salz-Pfeffer-Optik |
| `granidur` | GRANIDUR | Mineralische Sichtestriche | Designestrich | — | Granitoptik geschliffen |
| `granidur-bianco-nero` | GRANIDUR BIANCO/NERO | Mineralische Sichtestriche | Designestrich | — |  |
| `kcf` | KORODUR COPETTI FLOOR KCF | Mineralische Sichtestriche | Designestrich | — | Marmoroptik (Copetti) |
| `microtop-tw-3` | MICROTOP TW 3 | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung |  |
| `microtop-tw-5` | MICROTOP TW 5 | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung |  |
| `microtop-tw-8` | MICROTOP TW 8 | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung |  |
| `microtop-tw-nsm` | MICROTOP TW NSM | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung |  |
| `microtop-tw-02` | MICROTOP TW 02 | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung |  |
| `microtop-tw-vsm` | MICROTOP TW VSM | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung | Vorspritzmörtel |
| `microtop-tw-bm` | MICROTOP TW BM | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung | Auskleidung |
| `microtop-tw-mineral` | MICROTOP TW Mineral | MICROTOP / TW-Behältersanierung | — | TW-Behältersanierung | Oberflächenvergütung |
| `rapid-set-cement-all` | Rapid Set CEMENT ALL | Rapid Set | — | Betonsanierung | auch Verguss/Verankerung; Infrastruktur möglich |
| `rapid-set-mortar-mix` | Rapid Set MORTAR MIX | Rapid Set | — | Betonsanierung |  |
| `rapid-set-mortar-mix-dur` | Rapid Set MORTAR MIX DUR | Rapid Set | — | Betonsanierung+Inbo | Bodensanierungen >15mm → auch Inbo-Sanierung |
| `asphalt-repair-mix` | ASPHALT REPAIR MIX | Rapid Set | — | Infrastruktur | Straßen/Verkehrsflächen |
| `dot-europe-concrete-mix` | DOT Europe CONCRETE MIX | Rapid Set | — | Infrastruktur+Betonsanierung | EN 1504-3, Straßen-/Brückenbau |
| `rapid-set-concrete-mix` | Rapid Set CONCRETE MIX | Rapid Set | — | Infrastruktur+Betonsanierung | Gehwege/Fahrbahnen/Fundamente |
| `rapid-set-schnellbeton` | Rapid Set Schnellbeton | Rapid Set | — | Infrastruktur+Betonsanierung | App-Bezeichnung; LP10 CONCRETE MIX? |
| `korocrete` | KOROCRETE Schnellbeton | Rapid Set | — | Infrastruktur+Betonsanierung | heute bereich rapid-set + zusatz infrastruktur |
| `rapid-set-concrete-pharmacy` | Rapid Set CONCRETE PHARMACY | — (App) | — | Betonsanierung | ⚠ „CONCRETE PHARMACY“ nicht im Lieferprogramm — App↔LP klären |
| `neodur-vm-1` | NEODUR VM 1 / VM 3 / VB 8 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Verguss (Untergießen Maschinen/Stahlbau) — kein klarer Use-Case-Bereich, Frank entscheiden |
| `neodur-vm-5` | NEODUR VM 5 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Verguss — Heimat klären |
| `neodur-vm-basic` | NEODUR VM basic | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Verguss — Heimat klären |
| `neodur-svm-03` | NEODUR SVM 03 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Schnellverguss — Heimat klären |
| `neodur-svm-4` | NEODUR SVM 4 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Schnellverguss — Heimat klären |
| `neodur-msm-3` | NEODUR MSM 3 | Spezialmörtel | — | Betonsanierung | Microsilica-Spritzmörtel „Neubau und Instandsetzung“; auch Infrastruktur |
| `neodur-msm-5` | NEODUR MSM 5 | Spezialmörtel | — | Betonsanierung | Spritzmörtel; auch Infrastruktur |
| `neodur-msb-8` | NEODUR MSB 8 | Spezialmörtel | — | Betonsanierung | Spritzbeton; auch Infrastruktur |
| `neodur-pfm-1k-easyfix` | NEODUR PFM 1K Easyfix | Spezialmörtel | — | Infrastruktur | Pflasterfugen Fußgängerbereiche |
| `neodur-pfm-ze` | NEODUR PFM-ZE | Spezialmörtel | — | Infrastruktur | Pflasterfugen mittel/schwer |
| `goodcat-golden-nature` | goodcat golden nature | Katzenstreu (separat) | — | — | optisch abgegrenzt |
| `goodcat-organic-love` | goodcat organic love | Katzenstreu (separat) | — | — | optisch abgegrenzt |
| `goodcat-silver-classic` | goodcat silver classic | Katzenstreu (separat) | — | — | optisch abgegrenzt |

## Frank-Entscheidungen (Flags)

Diese Zeilen brauchen eine fachliche Heimat-Entscheidung, bevor #308 (Spezialbaustoffe auflösen) und #307 (Filter) gebaut werden:

| ID | Produkt | Produktart (Lieferprogramm) | Neubau | Sanierung | Hinweis / Flag |
|---|---|---|---|---|---|
| `koromineral-lasur` | KOROMINERAL Lasur | Imprägnierung/Einpflege | Inbo | — | ⚠ „Lasur“ nicht im Lieferprogramm gelistet — App↔LP klären |
| `korodur-robust` | KORODUR Robust | DUROP (Kunstharz-Zuschlag) | Inbo | — | ⚠ „Robust“ nicht im Lieferprogramm gelistet — App↔LP klären |
| `rapid-set-concrete-pharmacy` | Rapid Set CONCRETE PHARMACY | — (App) | — | Betonsanierung | ⚠ „CONCRETE PHARMACY“ nicht im Lieferprogramm — App↔LP klären |
| `neodur-vm-1` | NEODUR VM 1 / VM 3 / VB 8 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Verguss (Untergießen Maschinen/Stahlbau) — kein klarer Use-Case-Bereich, Frank entscheiden |
| `neodur-vm-5` | NEODUR VM 5 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Verguss — Heimat klären |
| `neodur-vm-basic` | NEODUR VM basic | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Verguss — Heimat klären |
| `neodur-svm-03` | NEODUR SVM 03 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Schnellverguss — Heimat klären |
| `neodur-svm-4` | NEODUR SVM 4 | Spezialmörtel | Inbo? | Infrastruktur? | ⚠ Schnellverguss — Heimat klären |

### Offene Grundsatzfragen
1. **Verguss/Schnellverguss (NEODUR VM/SVM, 5 Produkte):** Untergießen von Maschinen/Stahlbau passt in keinen der 4 Sanierungs-Bereiche sauber. Eigener Bereich? Nur Portfolio-Produktart ohne Use-Case-Bereich? Zu Infrastruktur?
2. **Infrastruktur nur Sanierung?** DUROP und Schnellbeton bedienen auch **Neubau**-Infrastruktur (Straßen-/Brückenbau). Soll „Infrastruktur“ auch ein Neubau-Bereich sein?
3. **Hilfsprodukte (Haftbrücke, Nachbehandlung, Imprägnierung):** als eigene Portfolio-Produktarten korrekt — in den Use-Case-Bereichen jeweils Inbo Neubau+Sanierung. So lassen?
4. **Hartstoffeinstreuung/-estriche bei Sanierung:** HE 65/HE 65 Plus als Verbundestrich auf erhärtetem Tragbeton — als Inbo-Sanierung führen?

## App ↔ Lieferprogramm — Diskrepanzen

**App-Produkte ohne Lieferprogramm-Eintrag** (klären, ob Bezeichnung/Variante): `koromineral-lasur` (Lasur), `korodur-robust` (Robust), `rapid-set-concrete-pharmacy` (Concrete Pharmacy). `korodur-silosystem` + `system-korodur-korotan` = Systeme (kein einzelnes LP-Produkt, ok).

**Lieferprogramm-Produkte, die in der App fehlen** (→ #271):

| Fehlt in App | Lieferprogramm | Hinweis |
|---|---|---|
| CEMENT ALL Plus | Rapid Set 10.2 | höchster Carbonatisierungsschutz, Expositionsklassen XC4/XF4/XA3 |
| Quarzsand 0,4–0,8 (feuergetrocknet) | Haftbrücke 6.6 | Abstreuung EP-Grundierung |
| FAST / FLOW Control / SET Control | Rapid Set 10.7–10.9 | Additive (Abbinde-/Fließverhalten) |
| Farbpigment Dark / Light | Rapid Set 10.10–10.11 | Tönungs-Additive |
| DUROP 0,5/1 · 1/2 · 2/3 · 2/5 | DUROP 9.1–9.4 | App führt nur ein Sammel-Produkt „korodur-durop“ — Körnungs-Varianten fehlen |

## Produktart-Taxonomie (Portfolio-Menü, 12 Lieferprogramm-Sektionen)

1. KORODUR Hartstoffe gem. DIN 1100
2. Industrieboden-Trockenmörtel
3. Industrieboden-Schnellestrich/-Bindemittel
4. Selbstverlaufende Industrieböden
5. Mineralische Sichtestriche
6. Haftbrücke/Grundierung
7. Nachbehandlung/Curing
8. Imprägnierung/Einpflege
9. DUROP (Zuschlag Kunstharzsysteme)
10. Rapid Set
11. Spezialmörtel
12. MICROTOP (Trinkwasserbehälter-Instandsetzung)

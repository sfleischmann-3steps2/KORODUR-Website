# Zuordnung Industrieboden — Produktgruppen (Sign-off Steffi/Frank)

**Stand:** 2026-06-11 | **Status:** Umgesetzt als Vorschlag, Sign-off ausstehend (Steffi: "vorher oder danach")
**Quellen:** `Normen produkte.xlsx` (Steffi, autoritativ für Produktarten + Qualitätsklassen) > Produktseiten-Scrape > Bereichstabellen Alt-Site. Extraktion: `extraktion-industrieboden-teil1.json` (42 Objekte).

## Produktgruppen (Bereichsseite Industrieboden)

| # | Gruppe (Key) | Produkte | Abweichung zur Alt-Site |
|---|---|---|---|
| 1 | Hartstoffe DIN 1100 (`hartstoffe`) | KORODUR 0/4 · VS 0/5 · WH-Spezial · WH-metallisch · Diamantbeton | Alt-Site mischt sie mit Haftbrücken/Grundierungen unter "Hartstoffeinstreuung". Lt. Quelle sind es **Hartstoffe ohne Bindemittel** |
| 2 | Hartstoffeinstreuung (`hartstoffeinstreuung`) | NEODUR HE 2 · HE 3 · HE 3 green | Alt-Site führt die HE-3-Familie unter "Hartstoffschicht" — die Produkttexte sagen eindeutig **Einstreuverfahren** |
| 3 | Hartstoffestriche (`hartstoffestriche`) | NEODUR HE 65 · HE 65 plus · HE 40 | — |
| 4 | Schnellestrich-Systeme (`schnellestrich`) | NEODUR HE 60 rapid · KORODUR FSCem · FSCem Screed | — |
| 5 | Selbstverlaufende Systeme (`selbstverlaufend`) | NEODUR Level · Level AU · Rapid Set LevelFlor | **SVM 03 raus**: lt. Excel ist es ein Schnellvergussmörtel (C50/60) → gehört zu Spezialbaustoffe/Verguss (PR 8) |
| 6 | Untergrund, Haftbrücken & Grundierungen (`untergrund-haftbruecken`) | KORODUR HB 5 · HB 5 rapid · PC · TXPK (+ uniPrimer in PR 6) | **Deine HB-5-Korrektur**, durch Excel bestätigt: HB = Haftbrücke, PC/TXPK = Grundierungen. Alt-Site führte sie fälschlich unter "Hartstoffeinstreuung" |
| 7 | Hartstoffe für Kunstharzsysteme (`kunstharz-hartstoffe`) | DUROP (Körnungen 0,5/1 · 1/2 · 2/3 · 2/5) · KORODUR Robust | Alt-Site-Produktübersicht nennt DUROP "(Ankermörtel)" unter Spezialbaustoffe — die Industrieboden-Quellseite beschreibt DUROP als **synthetischen Hartstoff für Kunstharzbeläge**. ⚠️ Klären: gibt es zusätzlich einen DUROP-Ankermörtel? |
| 8 | Systeme & Verarbeitung (`systeme`) | KORODUR Silosystem | System KORODUR-KOROTAN folgt mit PR 6 (KOROTAN ist Bauchemie) |

## Varianten-Entscheidung (Empfehlung, bitte bestätigen)

SVS-/metallisch-Qualitäten werden **als Varianten am Stammprodukt** geführt (Tabelle "Lieferbare Qualitäten" auf der Produktseite), NICHT als eigene Produktseiten. Eigenständig bleiben nur Produkte mit eigener Story: HE 2, HE 3, **HE 3 green** (eigene EPD/CO2-Story), HE 40, HE 60 rapid, HE 65, HE 65 plus.

| Stammprodukt | Varianten (mit Qualitätsklasse aus Excel/Scrape) |
|---|---|
| NEODUR HE 3 | SVS 3 (CT-C70-F9-A3) · SVS 1,5 (CT-C70-F9-A1,5) · SVS 1,5 extra (CT-C70-F9-A1,5) · metallisch (CT-C80-F11-A3) |
| NEODUR HE 65 | SVS 3 · SVS 1,5 · SVS 1,5 extra · metallisch (CT-C80-F11-A3) |
| NEODUR HE 65 plus | SVS 3 (CT-C70-F9-A3) |
| NEODUR HE 60 rapid | SVS 3 (CT-C60-F8-A3) · SVS 1,5 (CT-C60-F8-A1,5) · metallisch (CT-C60-F8-A3) |
| NEODUR HE 40 | HE 40/8 (CT-C40-F7-A6) |
| DUROP | 0,5/1 · 1/2 · 2/3 · 2/5 (Körnungen) |

Begründung: weniger Fast-Duplikat-Seiten, bessere UX; Redirect-Map (Stufe 5) leitet Alt-Varianten-URLs auf Stammprodukt + Anker. Wenn ihr eigene Seiten je Variante wollt (Alt-Site-Modell), ist das ein mechanischer Umbau.

## Quellkonflikte und Auflösung

| Konflikt | Auflösung |
|---|---|
| "SVS-15" (Scrape-Slug) | = **SVS 1,5** (Verschleißklasse A1,5) — durch Excel und Seitentexte bestätigt |
| NEODUR Level AU: CT-C30-F5 (Produktseite) vs. CT-C35-F5 (Bereichstabelle) | **CT-C30-F5** — Excel bestätigt Produktseite |
| LevelFlor: keine CT-Klasse im Scrape | **CT-C30-F6** aus Excel übernommen |
| HE 60 rapid: "belastbar nach 48 h" (Schnellestrich-Seite) vs. "3 h begehbar / 24 h nutzbar" (Sanierungsseite) | Bestandsdaten der App (TDS-korrigiert, V2.6) bleiben unverändert maßgeblich |
| Silosystem Tagesleistung 1.000–1.500 vs. 1.000–2.000 m² | Beide Angaben übernommen mit Quellenvermerk — TDS-Klärung offen |
| HB 5 rapid: "KORODUR HB 5 rapid" vs. "HB 5/60 rapid" | Bestandsname "KORODUR HB 5 rapid" bleibt |

## Teil 2: Bauchemie (2026-06-12, Extraktion `extraktion-industrieboden-bauchemie.json`)

| Gruppe | Produkte | Bemerkung |
|---|---|---|
| Nachbehandlung (`nachbehandlung`) | KOROTEX · KOROCURE · KOROMINERAL CURE (Bestand) + easyFinish · nanoFinish (neu) | Schnitt gemäß Excel |
| Imprägnierung & Silikatisierung (`impraegnierung`) | KOROMINERAL · KOROMINERAL Li+ · KOROPOX | Excel-Gruppe; KOROPOX (2K-Epoxid-Imprägnierung) dazugestellt |
| Additive (`additive`) | KOROTAN | Estrichfließmittel/Spezial-Additiv, in der Excel nicht erfasst |
| Untergrund/Grundierungen | uniPrimer (neu dazu) | Excel: Grundierung |
| Systeme & Verarbeitung | KOROCLEAN (neu) · System KORODUR-KOROTAN (neu) | **KOROCLEAN ist ein Schleifverfahren, kein Material** — als Verfahren unter Systeme einsortiert |

**Quellfehler, bewusst NICHT übernommen (TDS-Klärung offen):** defekte Dichte-Einheiten der Alt-Site bei easyFinish ("1,0 kg/m³"), nanoFinish ("1,035 cm³") und uniPrimer ("1,05 g/m³") — plausibel wären kg/dm³ bzw. g/cm³, aber wir erfinden keine Werte.

**Dünn migriert:** KOROMINERAL Li+ (nur Tabellenzeile, eigene Seite nicht archiviert). **Nicht migriert:** "KOROMINERAL Lasur" (nur Navigationseintrag bei HE 60 rapid, null Inhalt).

## Nicht migriert (Datenlage)

- **NEODUR AM Super(/Plus):** nur Navigationseintrag, keinerlei Inhalte im Scrape → braucht TDS/Input Frank
- **NEODUR SVM 03(/4):** keine Inhalte im Scrape; lt. Excel Schnellvergussmörtel C50/60 → Kandidat für Spezialbaustoffe (PR 8), Daten nötig
- Bauchemische Produkte (KOROTAN, KOROCLEAN, KOROPOX, easyFinish, nanoFinish, uniPrimer, KOROMINERAL-Familie): **PR 6**

## Sign-off

- [ ] Gruppen-Schnitt 1–8 OK (Steffi/Frank)
- [ ] Varianten-am-Stammprodukt-Modell OK
- [ ] DUROP-Frage geklärt (Hartstoff vs. Ankermörtel)

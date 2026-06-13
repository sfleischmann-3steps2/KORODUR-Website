<!-- Erzeugt vom Workflow produkt-klassifizierung-excel-check (Run wf_40214dc9-bfe), 2026-06-13.
Source of Truth: Normen produkte.xlsx. Bestätigt: 32 | Bereiche: 6 -->

# Produkt-Klassifizierung — Abgleich gegen Normen-Excel (SoT)

## Status

**31 bestätigte Abweichungen** (von 33 verifizierten Funden) · **6 Bereiche geprüft** (77 Produkte) · **62 Produkte ohne TDS** · 1 Excel-Produkt ohne App-Pendant.

## Bestätigte Abweichungen

| Produkt-ID | Bereich | Typ | Schwere | Soll (Excel) → Ist (App) | Korrekturvorschlag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| neodur-he-65-plus | industrieboden | normen | hoch | Frost/Tausalz `DIN CEN/TS 12390-9`, `DIN 18560-7`, Penetration `DAfStB-Richtlinie` → App `DIN EN 13687`, `DIN 18560`, `WHG` | Normen auf `[DIN EN 13813, DIN 18560-7, DIN CEN/TS 12390-9, DAfStB-Richtlinie]`; `DIN EN 13687`/`WHG` raus |
| neodur-he-3 | industrieboden | normen | hoch | `DIN EN 13813`, `DIN 1100` → App führt zusätzlich `DIN 18557` (existiert nicht) | `DIN 18557` → `DIN 18560` (Tippfehler) oder ersatzlos streichen |
| korocure | industrieboden | normen, nicht-in-excel | hoch | Nachbehandlungsmittel ohne Norm → App `DIN EN 13813` (Estrichnorm, fachlich falsch) | normen = `[]`; offen: ob `KOROCURE` = Excel `KOROMINERAL CURE` (Frank/TDS) |
| koromineral-cure | industrieboden | normen | hoch | keine Norm (Nachbehandlung/Silikatisierung) → App `DIN EN 13813` | normen = `[]` |
| korotex | industrieboden | normen | hoch | keine Norm (Curing/Nachbehandlung) → App `DIN EN 13813` | normen = `[]` |
| neodur-he-3-green | industrieboden | normen | mittel | `DIN EN 13813`, `DIN 1100` → App nur `DIN 1100` | `DIN EN 13813` ergänzen |
| neodur-he-65 | industrieboden | normen | mittel | + `DIN 1100` (Hartstoff) → fehlt in App | `DIN 1100` ergänzen |
| neodur-he-60-rapid | industrieboden | normen | mittel | + Schwindklasse `DIN 18560-1`, Emission `DIN EN 16516 + AgBB` → fehlen | beide ergänzen |
| neodur-level | industrieboden | normen | mittel | + Ausgleichsmasse `DIN EN 12706` → fehlt | `DIN EN 12706` ergänzen |
| neodur-level-au | industrieboden | normen, tds-fehlt | mittel | `DIN EN 13813, DIN 18560, DIN EN 12706` → App normen leer | mind. die 3 Excel-Normen befüllen |
| korodur-hb-5-rapid | industrieboden | normen, tds-fehlt | mittel | `DIN 1048-2, DIN EN 13892-8, DIN 18365/18560, DIN EN 18202` → App `DIN EN 1504-4` (nicht zugewiesen) | Excel-Normen setzen, `DIN EN 1504-4` raus |
| korodur-pc | industrieboden | normen, tds-fehlt | mittel | `DIN EN 13892-8, DIN 1048-2, DIN 18365/18560, DIN EN 18202` → App `DIN EN 1504-4` | Excel-Normen setzen, `DIN EN 1504-4` raus |
| korodur-hb-5 | industrieboden | normen, tds-fehlt | mittel | `DIN 1048-2, DIN EN 13892-8, DIN 18202` → App normen leer | Excel-Stamm-Normen befüllen |
| korodur-fscem | industrieboden | klasse, nicht-in-excel | mittel | Excel nur `CT-C40-F6` → App `CT-C50-F7 / CT-C40-F6` | `CT-C50-F7` entfernen oder per TDS belegen |
| korodur-fscem-screed | industrieboden | normen, tds-fehlt | niedrig | + Schwindklasse `DIN 18560-1` → fehlt | `DIN 18560-1` ergänzen |
| rapid-set-levelflor | industrieboden | normen, tds-fehlt | mittel | `DIN EN 1015-11, DIN EN 196-3` → App normen leer | beide ergänzen |
| tru-self-leveling | sichtestrich | normen | mittel | + `DIN 18560, DIN EN 13892-2, DIN EN 13892-3` → App nur `DIN EN 13813` | 3 Normen ergänzen |
| granidur | sichtestrich | normen, tds-fehlt | mittel | + `DIN EN 13892-2` → fehlt | `DIN EN 13892-2` ergänzen |
| granidur-bianco-nero | sichtestrich | normen, tds-fehlt | mittel | + `DIN 18560-2, DIN 18560-4, DIN EN 13892-2` → fehlen | 3 Normen ergänzen |
| kcf | sichtestrich | normen, tds-fehlt | mittel | + `DIN EN 13892-2, DIN EN 13892-3, DIN EN 13501-1` → fehlen | 3 Normen ergänzen (opt. Untergrund/Nachbehandlung) |
| tru-pc | sichtestrich | normen, tds-fehlt | mittel | `DIN 18560, DIN EN 13813, DIN EN 13892-2, DIN EN 13892-3` → App normen leer | Excel-Normen befüllen |
| tru-sp | sichtestrich | normen, tds-fehlt | mittel | `DIN 18560, DIN EN 13813, DIN EN 13892-2/-3, DIN 18365` → App normen leer | Excel-Normen befüllen |
| neodur-vm-1 | spezialbaustoffe | normen, tds-fehlt | mittel | + `DIN EN 13670, DIN 1045-3, DIN EN 13892-2` → fehlen | 3 Normen ergänzen |
| neodur-vm-3 | spezialbaustoffe | normen, tds-fehlt | mittel | VM-Familie `DIN EN 13395-2, DIN EN 445, DIN EN 13670+1045-3, DIN EN 13892-2` → App normen leer | Familien-Normen befüllen; Klasse `C60/75` via TDS klären |
| neodur-svm-03 | spezialbaustoffe | normen, tds-fehlt | mittel | VM-Familien-Normen → App normen leer | Familien-Normen befüllen |
| neodur-msm-3 | spezialbaustoffe | normen, tds-fehlt | mittel | + Nachbehandlung `DIN EN 13670, DIN 1045-3` → fehlen | ergänzen |
| neodur-msm-5 | spezialbaustoffe | normen, tds-fehlt | mittel | MSM-Familie `DIN 18551, DIN EN 14487, DIN EN 13670+1045-3` → App normen leer | Familien-Normen befüllen; Klasse `C30/37` via TDS klären |
| neodur-msb-8 | spezialbaustoffe | normen, tds-fehlt | mittel | MSM/MSB-Familie `DIN 18551, DIN EN 14487` → App normen leer | befüllen (analog msm-3); Klasse `C30/37` via TDS klären |
| microtop-tw-8 | microtop | klasse, normen, tds-fehlt | hoch | Variante `estrichqualitaet=null`; `W300, W347, DIN 18551, DIN EN 14487` → App Klasse `C30/37` (geerbter TW-3-Kopfwert), `W 270` überzählig, `DIN EN 14487` fehlt | `W 270` raus, `DIN EN 14487` rein; Klasse `C30/37` als ungedeckt markieren (Frank) |
| microtop-tw-3 | microtop | normen, tds-fehlt | mittel | `W300, W347, DIN 18551, DIN EN 14487` → App führt `W 270` (überzählig), `DIN EN 14487` fehlt | `W 270` raus, `DIN EN 14487` rein |
| rapid-set-mortar-mix-dur | rapid-set | klasse, normen | mittel | CEMENT-ALL-Zeile `DIN EN 1015-11, DIN EN 196-3` → App `ASTM C928, DIN EN 1504-3, DIN 1100 A` (nicht Excel-gedeckt) | Normen via TDS prüfen, sonst angleichen; geteiltes TDS `Mortar_Mix_de.pdf` klären; Klasse `C45/55` belassen (Excel `C44/55` = Tippfehler) |
| asphalt-repair-mix | rapid-set | klasse | mittel | Excel `C30/37` → App qualitaetsklasse `null` | `qualitaetsklasse = C30/37` setzen |

## Verworfene Funde (bestaetigt=false)

- **neodur-he-2** (industrieboden): `DIN 18557` ist reale Werkmörtelnorm, bewusst geführt; Headline „existiert nicht" ist Fehlalarm. Rest = Kuratierungsfrage.
- **rapid-set-cement-all** (rapid-set): Alle App-Werte Excel-gedeckt; nicht geführte Felder (CDF, DIN EN 1542 etc.) sind bewusste Kuratierungs-Auslassung, kein Wertewiderspruch.
- **rapid-set-mortar-mix** (rapid-set): App `C45/55` normkonform, Excel `C44/55` ist nicht-genormter Tippfehler. App belassen, Excel korrigieren.
- **dot-europe-concrete-mix** (rapid-set): `DIN EN 1504-3` produktspezifische, sachlich plausible Zusatznorm bei korrekter Klasse/Variante. Kein Defekt.
- **microtop-tw-5** (microtop): Compound-Claim ohne eindeutige Einzelfeld-Korrektur; `W 270` systematisch über die TW-Familie vergeben, Claim-Logik intern inkonsistent.
- **microtop-tw-nsm** (microtop): Klasse/Normen Excel-konform; fehlende Estrichmörtel-Normen nur konditional („wenn Block-Normen gelten"), App-Muster mappt sie bewusst nicht auf Nassspritz.
- **microtop-tw-02** (microtop): `C30/37` durch Block-Hauptwert-Vererbung gedeckt (Variante `null` = keine Abweichung). Normen Excel-konform.
- **microtop-tw-bm** (microtop): Excel-Block-Zelle aggregiert (nicht variantenscharf), nicht erschöpfend; `W 270` fachlich plausibel und familienkonsistent. Nicht eindeutig belegbar.

## Fehlende TDS (Zulieferungs-Checkliste, `tdsUrl = null`)

**industrieboden (32)**
neodur-he-3, neodur-he-3-green, neodur-he-2, korodur-0-4, korodur-vs-0-5, korodur-wh-spezial, korodur-wh-metallisch, korodur-diamantbeton, korodur-fscem, korodur-fscem-screed, neodur-level-au, rapid-set-levelflor, korodur-hb-5, korodur-txpk, korodur-durop, korodur-robust, korodur-silosystem, korotan, korodur-easyfinish, korodur-nanofinish, korodur-uniprimer, koropox, koromineral, koromineral-li, koroclean, system-korodur-korotan, koromineral-lasur, korocure, koromineral-cure, korotex, korodur-hb-5-rapid, korodur-pc

**sichtestrich (5)**
granidur, granidur-bianco-nero, kcf, tru-pc, tru-sp

**rapid-set (2)**
rapid-set-concrete-mix, rapid-set-concrete-pharmacy

**spezialbaustoffe (14)**
korocrete, neodur-vm-1, neodur-vm-3, neodur-vm-5, neodur-vb-8, neodur-vm-basic, neodur-svm-03, neodur-am-super, neodur-am-plus, neodur-msm-3, neodur-msm-5, neodur-msb-8, neodur-pfm-1k-easyfix, neodur-pfm-ze

**microtop (9)**
microtop-tw-3, microtop-tw-5, microtop-tw-8, microtop-tw-nsm, microtop-tw-02, microtop-tw-vsm, microtop-tw-bm, microtop-tw-mineral, microtop-tw-nsd

**katzenstreu (3, systembedingt kein bauchemisches TDS erwartbar)**
goodcat-golden-nature, goodcat-organic-love, goodcat-silver-classic

## Excel-Abdeckung

- **Excel-Produkt ohne App-Pendant (1):** `NEODUR SVM 4 Schnellvergussmörtel` (Excel-Variante der VM-Familie, Klasse `C35/45`) — fehlt im Bereich spezialbaustoffe. Prüfen, ob bewusst nicht geführt oder Aufnahme nötig.
- **App-Produkte ohne Excel-Abdeckung (`im_excel=false`):** korocure, koromineral-lasur, korodur-fscem, korodur-0-4, korodur-vs-0-5, korodur-wh-spezial, korodur-wh-metallisch, korodur-diamantbeton, korodur-durop, korodur-robust, korodur-silosystem, korotan, koropox, koroclean, system-korodur-korotan, neodur-am-super, neodur-am-plus, korocrete, neodur-pfm-1k-easyfix, neodur-pfm-ze, rapid-set-schnellbeton, rapid-set-concrete-pharmacy, microtop-tw-mineral, microtop-tw-nsd, goodcat-golden-nature, goodcat-organic-love, goodcat-silver-classic. Für diese Produkte ist die Normen-Excel **keine** autoritative Quelle; Klassen/Normen sind nur über TDS verifizierbar. Lose Hartstoff-Körner (0/4, VS 0/5, WH-Spezial/-metallisch, Diamantbeton) tragen plausibel `DIN 1100`, bleiben aber unverifiziert.
- **Pflasterfugen (`pflasterfugen`)** und **Katzenstreu** sind in der Excel systembedingt nicht geführt (Excel = Estrich-/Reparatur-/Hartstoff-Bauchemie); fehlende Excel-Deckung dort ist erwartbar, keine Lücke.

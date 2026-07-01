# Technik-Sign-off PDP — für Frank (Stand 2026-07-01)

Alle unten stehenden technischen Werte wurden **quellenbelegt aus den TDS extrahiert** oder abgeleitet und sind live auf der PDP. Bis zur Freigabe gelten sie als **provisorisch**. Bitte je Zeile: OK / Korrektur / Frage.

Kontext: PDP-Redesign + Content-Rollout #394 (PRs #413/#414/#415). Marker im Code: `NORMWERTE PROVISORISCH`, `faktencheck`.

## 1. Norm je Kennwert (PR #415) — 43 Werte, 19 Produkte

Zuordnung Kennwert → Prüf-/Klassifizierungsnorm, extrahiert aus dem jeweiligen TDS.

| Produkt | Kennwert | zugeordnete Norm | OK? |
|---|---|---|---|
| dot-europe-concrete-mix | Druckfestigkeit (60 min) | DIN EN 12190 | |
| dot-europe-concrete-mix | Druckfestigkeit (28 d) | DIN EN 12190 | |
| dot-europe-concrete-mix | Biegezugfestigkeit (28 d) | DIN EN 12190 | |
| granidur | Druckfestigkeit (GRANIDUR 05) | DIN EN 13892-2 | |
| granidur | Biegezugfestigkeit (GRANIDUR 05) | DIN EN 13892-2 | |
| granidur | Druckfestigkeit (GRANIDUR 08) | DIN EN 13892-2 | |
| granidur | Biegezugfestigkeit (GRANIDUR 08) | DIN EN 13892-2 | |
| granidur-bianco-nero | Druckfestigkeit | DIN EN 13892-2 | |
| granidur-bianco-nero | Biegezugfestigkeit | DIN EN 13892-2 | |
| kcf | Schleifverschleiß | DIN EN 13892-3 | |
| kcf | Druckfestigkeit (KCF 05) | DIN EN 13892-2 | |
| kcf | Biegezugfestigkeit (KCF 05) | DIN EN 13892-2 | |
| kcf | Druckfestigkeit (KCF 08) | DIN EN 13892-2 | |
| kcf | Biegezugfestigkeit (KCF 08) | DIN EN 13892-2 | |
| korodur-0-4 | Hartstoffgruppe (DIN 1100) | DIN 1100 | |
| korodur-0-4 | Schleifverschleiß | DIN EN 13892-3 | |
| korodur-diamantbeton | Hartstoffgruppe (DIN 1100) | DIN 1100 | |
| korodur-diamantbeton | Schleifverschleiß | DIN 1100 | |
| korodur-fscem-screed | Druckfestigkeit (DIN EN 13892-2) | DIN EN 13892-2 | |
| korodur-fscem-screed | Biegezugfestigkeit (DIN EN 13892-2) | DIN EN 13892-2 | |
| korodur-fscem-screed | Schwindklasse (DIN 18560-1) | DIN 18560-1 | |
| korodur-pc | Haftzugfestigkeit | DIN 18365, DIN 18560 | |
| korodur-vs-0-5 | Hartstoffgruppe (DIN 1100) | DIN 1100 | |
| korodur-vs-0-5 | Schleifverschleiß | DIN EN 13892-3 | |
| korodur-wh-metallisch | Hartstoffgruppe (DIN 1100) | DIN 1100 | |
| korodur-wh-metallisch | Schleifverschleiß | DIN EN 13892-3 | |
| korodur-wh-spezial | Hartstoffgruppe (DIN 1100) | DIN 1100 | |
| korodur-wh-spezial | Schleifverschleiß | DIN EN 13892-3 | |
| korophalt-02 | Druckfestigkeit (28 d) | DIN EN 1015-11 | |
| korophalt-02 | Druckfestigkeit (24 h) | DIN EN 1015-11 | |
| korophalt-02 | Biegezugfestigkeit (28 d) | DIN EN 1015-11 | |
| korophalt-02 | E-Modul (28 d) | DIN EN 12697-26 | |
| microtop-tw-5 | Druckfestigkeit | DIN EN 206 | |
| microtop-tw-bm | Druckfestigkeit | DIN EN 13892-2 | |
| microtop-tw-bm | Biegezugfestigkeit | DIN EN 13892-2 | |
| neodur-he-2 | Druckfestigkeit | DIN EN 13892-2 | |
| neodur-he-2 | Biegezugfestigkeit | DIN EN 13892-2 | |
| neodur-he-2 | Schleifverschleiß | DIN EN 13892-3 | |
| neodur-level-au | Druckfestigkeit | DIN EN 13892-2 | |
| rapid-set-mortar-mix-dur | Druckfestigkeit (1 h) | DIN EN 1015-11 | |
| rapid-set-mortar-mix-dur | Druckfestigkeit (24 h) | DIN EN 1015-11 | |
| tru-pc | Druckfestigkeit (ASTM C-109 mod.) | DIN EN 13892-2 | |
| tru-sp | Druckfestigkeit (ASTM C-109 mod.) | DIN EN 13892-2 | |

### ⚠ Explizite Prüfpunkte (uneindeutig extrahiert)
- **korodur-diamantbeton** Schleifverschleiß → `DIN 1100` zugeordnet; die anderen Hartstoffe (VS 0/5, WH-Spezial, WH-metallisch, 0/4) → `DIN EN 13892-3`. Vereinheitlichen?
- **microtop-tw-5** Druckfestigkeit → `DIN EN 206` (aus Betonklasse C 30/37 abgeleitet). Passt das, oder keine Norm?
- **tru-pc / tru-sp** Druckfestigkeit → `DIN EN 13892-2` zugeordnet, obwohl der Wert per `ASTM C-109 mod.` gemessen ist. Beide nennen oder nur ASTM?
- **korodur-pc** Haftzugfestigkeit → `DIN 18365, DIN 18560` (Regelwerke, keine Prüfnorm i. e. S.). Korrekt so?
- **rapid-set-schnellbeton, microtop-tw-3, microtop-tw-8**: TDS nennt KEINE Prüfnorm zu den Kennwerten → bewusst leer gelassen. OK?

## 2. Verarbeitung (PR #414) — 38 Produkte, TDS-extrahiert

Prozedur-Texte (Untergrund / Mischen / Auftrag / Verarbeitungszeit / Aushärtung / Besonderheiten) direkt aus den TDS. Einbauverfahren-Titel (Einstreuung / frisch auf frisch / auf erhärteten Beton) aus der Experten-Matrix. Bitte stichprobenartig gegen die Datenblätter prüfen — Liste der 38:

dot-europe-concrete-mix, granidur, granidur-bianco-nero, kcf, koroclean, korodur-0-4, korodur-diamantbeton, korodur-durop, korodur-hb-5, korodur-robust, korodur-txpk, korodur-uniprimer, korodur-vs-0-5, korodur-wh-metallisch, korodur-wh-spezial, koromineral-li, korophalt-02, microtop-tw-3, microtop-tw-5, microtop-tw-8, microtop-tw-bm, microtop-tw-mineral, neodur-he-2, neodur-level-au, neodur-msb-8, neodur-msm-3, neodur-msm-5, neodur-svm-03, neodur-svm-4, neodur-vm-1, neodur-vm-5, neodur-vm-basic, rapid-set-concrete-pharmacy, rapid-set-mortar-mix-dur, rapid-set-schnellbeton, system-korodur-korotan, tru-pc, tru-sp

## 3. Basis-Hartstoff HE-65-Familie

Alle 6 Qualitäten tragen jetzt einheitlich `KORODUR Hartstoff` (auf Wunsch vereinheitlicht). **⚠ Entscheidung:** Die Vergleichsspalte wird dadurch uniform — soll zusätzlich eine Spalte **Zuschlag/Typ** (VS 0/5 · WH-Spezial · Diamantbeton · WH-metallisch) zurück, um den Vergleichswert zu erhalten?

## 4. Bestehende Provisorien im Code

- HE-65- und HE-3-Normwerte aus der CT-Klasse abgeleitet (`produkte.ts` Kommentare `NORMWERTE PROVISORISCH`), PDB/Notion-Abgleich offen (#368).
- 1 explizites `DIN EN 13813 (provisorisch)` (produkte.ts:1832).

## 5. Gesperrte Marketing-Claims (separat, als Issues verfolgt)

- **#405** Verkehrsbeton-Claims Infrastruktur/Betonsanierung: KOROCRETE-Verkehrsfreigabe-Stunden, XF-Klassen je Produkt, ZTV-ING/EN 1504-3 Brücken-Mapping DUROP↔DOT, Sperrzeit-Zahlen.
- **#379** Rapid Set: CO₂ −30 %, 4× Lebensdauer.

## 6. Datenlücke SKU / Artikelnummer

Fehlt für 11 Produkte (Quelle: Produktdatenbank / `extraktion-produkte.json`). Bitte Artikelnummern liefern/bestätigen:

- rapid-set-mortar-mix-dur
- korocrete
- rapid-set-schnellbeton
- neodur-he-3-green
- korodur-robust
- koroclean
- system-korodur-korotan
- korophalt-02
- neodur-vm-5
- neodur-svm-03
- neodur-svm-4

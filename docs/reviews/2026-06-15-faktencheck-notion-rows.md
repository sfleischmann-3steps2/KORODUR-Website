# Faktencheck — Befunde je Artikel (Notion-Rows)

Quelle: `docs/reviews/2026-06-15-fachartikel-faktencheck.md`, Abschnitt 5 (maßgeblich), ergänzt aus Abschnitt 3/4.
Adversarial herabgestufte/bestätigte Befunde (Fehlalarm) sind NICHT mitgezählt.

base = https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de

## beratungstrigger
- Typ: Ratgeber
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/beratungstrigger/
- Rot: 1
- Gelb: 0
- Kernbefund: MICROTOP TW-Reihe pauschal "im Trockenspritzverfahren" — TW 02/NSM/NSD/VSM sind Nassspritz.
- Befunde:
  - 🔴 c11: TW-Reihe pauschal "im Trockenspritzverfahren" → Korrektur: Verfahrenszusatz streichen oder "im Nass- oder Trockenspritzverfahren, je nach Produkt" (Quelle: TDS TW 02/NSM/NSD; data/produkte.ts)

## betreiber-faq
- Typ: Ratgeber
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/betreiber-faq/
- Rot: 3
- Gelb: 1
- Kernbefund: "höchste Verschleißklasse A6" — A6 ist Mittelfeld, A1,5 ist die beste Böhme-Klasse.
- Befunde:
  - 🔴 c12: "höchste Verschleißklasse A6 nach DIN 18560-7" → Korrektur: Superlativ streichen, "Verschleißklasse A6 nach DIN EN 13892-3 (Böhme)", höchste Klasse ist A1,5 (Quelle: TDS HE 60 rapid/HE 65; betontechnische-daten.de)
  - 🔴 c13: A6-Klasse fälschlich DIN 18560-7 zugeordnet (korrekt DIN EN 13892-3) plus Superlativ-Fehler → Korrektur: "höchste" streichen, A6 ist Mittelfeld, höchste Böhme-Klasse ist A1,5 (Quelle: betontechnische-daten.de; DIN 18560-7)
  - 🔴 c3: HE 60 rapid "24 Stunden später voll belastbar" — "später" ergibt rechnerisch 27 h → Korrektur: "später" streichen, "nach ca. 24 h (jeweils ab Einbau)" (Quelle: TDS HE 60 rapid 03/2025)
  - 🟡 c25: "Neuaufbau nur bei fehlender Tragfähigkeit" zu absolut (adversarial herabgestuft, kein normativer Fehler) → optional offene Formulierung, redaktioneller Feinschliff

## einstreuung-vs-schicht
- Typ: Fachbeitrag
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/einstreuung-vs-schicht/
- Rot: 4
- Gelb: 4
- Kernbefund: "ab 10 mm DAfStB-Richtlinie als dicht" — Schreibweise DAfStb falsch, 10-mm-Grenze erfunden (TDS HE 65 Plus: 25,7 mm).
- Befunde:
  - 🔴 c14: "ab 10 mm DAfStB-Richtlinie als dicht" → Korrektur: keine 10-mm-Pauschale, Dichtheit über zugelassenes System (HE 65 Plus: 25,7 mm), Schreibweise DAfStb (Quelle: TDS HE 65 Plus 11/2025; DAfStb-BUmwS)
  - 🔴 c20: Hartstoffgruppe A "≤ 6,0 cm³/50 cm²" — DIN 1100 Tab. 1: A = ≤ 5,0 → Korrektur: Zeile 58 auf "≤ 5,0 cm³/50 cm²" ändern (Quelle: MPVA/Bausachverständiger 1/2019; data/produkte.ts)
  - 🔴 c7: "laut Norm ausdrücklich nicht vergleichbar" — Über-Attribuierung an Normtext → Korrektur: "technisch nicht gleichwertig — Einstreuungen sind in DIN 18560-7 nicht geregelt" (Quelle: DIN 18560-7 Volltext; KORODUR-Doppelseite)
  - 🔴 c29: "KORODUR Silopumpsystem" — Produktname existiert nicht → Korrektur: "Silosystem" (Quelle: data/produkte.ts; korodur.de)
  - 🟡 c16: CDF-Verfahren korrekt, aber 10-mm-Kopplung nicht normativ belegt → 10-mm-Kopplung präzisieren/entkoppeln
  - 🟡 c31: 10-mm-WHG/Frost-Tausalz-Nachweis im Fazit, gleiche Problematik wie c14 → analog zu c14 korrigieren
  - 🟡 c17: "kein Frost-Tausalz-Nachweis" Einstreuung — inhaltlich vertretbar → Formulierung präzisieren
  - 🟡 c19: Lebensmittel/Ableitfähigkeit-Gleichwertigkeit — KORODUR-Positionierung, nicht extern korroboriert → belegen oder als Positionierung kennzeichnen

## neubau-sichtboden
- Typ: Neubau
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/neubau-sichtboden/
- Rot: 3
- Gelb: 3
- Kernbefund: GRANIDUR 7-Farben-Liste nicht TDS-gedeckt (TDS: nur zementgrau, weitere auf Anfrage).
- Befunde:
  - 🔴 c8: GRANIDUR 7-Farben-Liste nicht TDS-gedeckt → Korrektur: auf "zementgrau, weitere Farben auf Anfrage" zurücknehmen, data/produkte.ts:1453 mitkorrigieren (Quelle: TDS GRANIDUR 05/08 06/2023)
  - 🔴 c13: KCF 7-Farben-Liste ebenfalls nicht TDS-gedeckt; Schleifverschleiß A6 statt A5 prüfen → Korrektur: Farbliste streichen, "zementgrau, weitere Farben auf Anfrage" (Quelle: TDS KCF 05/08 06/2023)
  - 🔴 c9: KOROMINERAL CURE "erhöht Oberflächenhärte" — Härte-Claim gehört zu KOROMINERAL, nicht CURE → Korrektur: Härte-Aussage streichen, CURE-Eigenschaften = reduziert eindringendes Wasser/Schmutz/Chemikalien (Quelle: TDS KOROMINERAL CURE 10/2023)
  - 🟡 c5: GRANIDUR BIANCO/NERO "Gruppen-EPD verfügbar" nicht belegbar → EPD-Dokument/Registriernummer beschaffen oder Aussage streichen
  - 🟡 c17: TRU PC Festigkeitsverlauf nicht TDS-bestätigt → TRU-PC-TDS (2024) als Volltext beschaffen, gegenchecken
  - 🟡 c22: TRU SP Eignung nur über Schwesterprodukt belegt → TRU-SP-TDS gegen Eignungsaussage prüfen

## neubau-systemwahl
- Typ: Neubau
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/neubau-systemwahl/
- Rot: 2
- Gelb: 0
- Kernbefund: HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" — Kategorienfehler, 1,5 ist Untergrund-Anforderung.
- Befunde:
  - 🔴 c7: HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" — TDS nennt 1,5 als Oberflächenzugfestigkeit des Tragbetons → Korrektur: "Tragbeton mind. C25/30, Oberflächenzugfestigkeit ≥ 1,5 N/mm²", data/produkte.ts Z420 (Quelle: TDS HB 5 rapid 03/2022; data/produkte.ts)
  - 🔴 c25: Bauweise b "höchste Festigkeits- UND Verschleißwerte" — KS/A1,5 auch per Einstreuung erreichbar → Korrektur: nur "höchste Festigkeit" behaupten, Verschleiß nicht exklusiv b zuschreiben (Quelle: TDS HE 65; data/produkte.ts)

## neubau-wirtschaftlichkeit
- Typ: Neubau
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/neubau-wirtschaftlichkeit/
- Rot: 2
- Gelb: 0
- Kernbefund: "NEODUR HE 65 höchster Verschleißwiderstand A6" — Selbstwiderspruch, A6 nicht höchste Klasse.
- Befunde:
  - 🔴 c5: "NEODUR HE 65 höchster Verschleißwiderstand A6" — Selbstwiderspruch (Diamantbeton KS als höchstmöglich genannt) → Korrektur: "höchster" streichen, A6 = hohe nicht höchste Klasse, SVS 1,5 erreicht A1,5 (Quelle: TDS HE 65 03/2025; data/produkte.ts)
  - 🔴 c9: "Verschleißgruppen A6 bis KS" — mischt EN-13813-Klasse A6 mit DIN-1100-Gruppe KS → Korrektur: Klassen-/Gruppen-Systeme trennen (Quelle: data/produkte.ts; DIN 1100/EN 13813)

## sperrzeit-belastbarkeit
- Typ: Ratgeber
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/sperrzeit-belastbarkeit/
- Rot: 2
- Gelb: 2
- Kernbefund: "Alle Werte bei +20 °C" — TDS uneinheitlich (NEODUR Level +18 °C, mehrere ohne Referenztemperatur).
- Befunde:
  - 🔴 c4: "Alle Werte Datenblatt-Richtwerte bei +20 °C" → Korrektur: "+20 °C" entschärfen oder streichen (Quelle: TDS-Reihe, uneinheitliche Referenztemperatur)
  - 🔴 c5: ASPHALT REPAIR MIX "DIN EN 1015-11" als Klassifizierung — ist Prüfverfahren → Korrektur: Spalte als TODO klären, Prüfnorm nicht als Klasse ausgeben (Quelle: DIN EN 1015-11; normenGlossar.ts)
  - 🟡 c31: HE 65 Plus Klasse CT-C70-F9-A6 nicht TDS-verifizierbar (kein Volltext) → gegen TDS 11/2025 (HE-65-Plus-PDF) verifizieren
  - 🟡 c21: TRU Self-Leveling CT-C40-F10 nur app-intern belegt → gegen TDS-Volltext prüfen

## wirtschaftlichkeit-tco
- Typ: Ratgeber
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/ratgeber/wirtschaftlichkeit-tco/
- Rot: 1
- Gelb: 0
- Kernbefund: "NEODUR HE 65 höchsten Verschleißwiderstand A6" — Skalen-Fehler, eigene SVS-1,5-Variante = A1,5 = besser.
- Befunde:
  - 🔴 c1/c5: "NEODUR HE 65 höchsten Verschleißwiderstand A6" → Korrektur: "höchsten" streichen oder auf A1,5-Variante beziehen (Quelle: TDS HE 65; data/produkte.ts)

## flugzeug
- Typ: Branche
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/branchen/flugzeug/
- Rot: 1
- Gelb: 2
- Kernbefund: CEMENT ALL "begehbar 15 min, schwundkompensiert" — 15 min ist Erstarrungsbeginn, schwundkompensiert falsch.
- Befunde:
  - 🔴 c6: CEMENT ALL "begehbar nach ca. 15 min, schwundkompensiert" → Korrektur: "Erstarrungsbeginn 15 min, belastbar 1 h, schwindarm", data/produkte.ts (Quelle: TDS CEMENT ALL 10/2022; CTS-Datenblatt)
  - 🟡 c7: Helipad Płock "Haftzug bis 3,0 N/mm²" per Pull-Off nicht durch Protokoll belegt → Original-Messprotokoll anfordern oder Zahl entschärfen
  - 🟡 c12: "Tausalz" auf Vorfeldern — bei echtem Linienflug-Apron Formiate/Acetate statt Streusalz (für Helipads korrekt) → Kontext präzisieren

## industrie-produktion
- Typ: Branche
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/branchen/industrie-produktion/
- Rot: 1
- Gelb: 3
- Kernbefund: CEMENT ALL "begehbar 15 min" — Erstarrungsbeginn-Fehler.
- Befunde:
  - 🔴 c20: CEMENT ALL "begehbar nach ca. 15 min" → Korrektur: "Erstarrungsbeginn 15 min" statt "begehbar", data/produkte.ts Z485/499 (Quelle: TDS CEMENT ALL 10/2022)
  - 🟡 c5: HE 60 rapid "voll belastbar 24 h, chemikalienbeständig" — TDS sagt "nutzbar" und nur Treibstoff/Öl/Lösemittel → "chemikalienbeständig" auf TDS-Umfang einschränken
  - 🟡 c19: MORTAR MIX DUR 1-h-Wert nicht DUR-spezifisch belegt; Artikel-interner Widerspruch (1 h vs. 2 h) → bei Frank/Richard verifizieren, Widerspruch auflösen
  - 🟡 c29: "chemikalienbeständig" überdehnt im Lebensmittel-Kontext → auf TDS-Umfang einschränken

## lebensmittel
- Typ: Branche
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/branchen/lebensmittel/
- Rot: 3
- Gelb: 2
- Kernbefund: TRU Self-Leveling "voll belastbar 24 h" — 24 h ist nur der Schleif-Zeitpunkt, Vollfestigkeit erst 28 d.
- Befunde:
  - 🔴 c2: TRU Self-Leveling "voll belastbar nach ca. 24 h" — 24 h = Schleif-Zeitpunkt → Korrektur: "begehbar 2-3 h, schleifbar bis Hochglanz nach 24 h", "voll belastbar" entfernen, data/produkte.ts Z380 (Quelle: TDS TRU Self-Leveling 10/2022)
  - 🔴 c8: CEMENT ALL/MORTAR MIX "beständig gegen aggressive Medien" — überdehnt, keine Säurebeständigkeit → Korrektur: Beständigkeit auf TDS-Umfang einschränken
  - 🔴 c9: KOROMINERAL CURE "erhöht Oberflächenhärte" — Produktverwechslung mit KOROMINERAL → Korrektur: Härte-Aussage streichen (Quelle: TDS KOROMINERAL CURE 10/2023)
  - 🟡 c4: HE 60 rapid "chemikalienbeständig" nur Treibstoff/Öl/Lösemittel → auf TDS-Umfang einschränken
  - 🟡 c7: CEMENT ALL/MORTAR MIX "ASTM C928" nicht in deutschen TDS belegt → belegen oder streichen
- Hinweis: c6 ist in Abschnitt 5 widersprüchlich (als 🔴 gelistet, Text "Werte korrekt (bestätigt)") — als bestätigt NICHT mitgezählt.

## logistik
- Typ: Branche
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/branchen/logistik/
- Rot: 1
- Gelb: 1
- Kernbefund: Sinusfuge MORTAR MIX DUR "voll belastbar nach ca. 2 h" — widerspricht TDS (1 h) und eigener Produktliste.
- Befunde:
  - 🔴 c19: Sinusfuge MORTAR MIX DUR "voll belastbar nach ca. 2 h" → Korrektur: auf "ca. 1 h" angleichen, referenzen.ts (sinusfugen-sanierung) + i18n mitkorrigieren (Quelle: TDS MORTAR MIX 04/2024; data/produkte.ts)
  - 🟡 c8: MORTAR MIX DUR 1-h-Wert nicht DUR-spezifisch belegt, Artikel-Widerspruch → verifizieren, Widerspruch auflösen

## parkdeck
- Typ: Branche
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/branchen/parkdeck/
- Rot: 1
- Gelb: 2
- Kernbefund: HE 65 Plus "CT-C70-F9-A6 (DIN 18560-7)" — Klassen-String gehört zu EN 13813.
- Befunde:
  - 🔴 c3: HE 65 Plus "CT-C70-F9-A6 (DIN 18560-7)" → Korrektur: Klassen-String EN 13813 zuordnen, DIN 18560-7 separat als Anwendungsnorm (Quelle: data/produkte.ts; TDS HE 65 Plus)
  - 🟡 c8: HE 65 Plus "belastbar 7 Tage" nicht TDS-belegt; interner Konflikt 48 h vs. 7 d → klären/auflösen
  - 🟡 c18: CEMENT ALL/MORTAR MIX "frost-/tausalzbeständig" nur als Filter-Tag, nicht TDS-zitiert → belegen oder kennzeichnen

## verkaufsraeume
- Typ: Branche
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/branchen/verkaufsraeume/
- Rot: 1
- Gelb: 1
- Kernbefund: TRU Self-Leveling "voll belastbar 24 h" — 24 h ist Schleif-Zeitpunkt.
- Befunde:
  - 🔴 c4: TRU Self-Leveling "voll belastbar nach ca. 24 h" → Korrektur: "schleifbar bis Hochglanz nach 24 h" statt "voll belastbar" (Quelle: TDS TRU Self-Leveling 10/2022)
  - 🟡 c2: TRU Self-Leveling CT-C40-F10 nur app-intern, kein TDS-Volltext → gegen TDS-Volltext prüfen

## verkehr-infrastruktur
- Typ: Branche
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/branchen/verkehr-infrastruktur/
- Rot: 3
- Gelb: 3
- Kernbefund: "höchste Verkehrsklasse Erhaltungsbau" — TL BEB-StB definiert keine Verkehrsklassen.
- Befunde:
  - 🔴 c20: "höchste Verkehrsklasse Erhaltungsbau" für Rapid Set Schnellbeton → Korrektur: "geprüft nach TL BEB-StB" statt "höchste Verkehrsklasse", data/produkte.ts besonderheiten (Quelle: FGSV TL BEB-StB; RStO 12; data/produkte.ts)
  - 🔴 c5: ASPHALT REPAIR MIX "frost-, tausalzbeständig" — TDS nur sulfatbeständig/chloridfrei → Korrektur: frost-/tausalzbeständig streichen oder durch Frank belegen, data/produkte.ts (Quelle: TDS ASPHALT REPAIR MIX 09/2024)
  - 🔴 c27: "Verkehr in unter einer Stunde" gilt nur für ASPHALT REPAIR MIX → Korrektur: "Verkehr nach rund einer Stunde zurück" oder Produkte aufteilen (Quelle: TDS-Reihe; data/produkte.ts)
  - 🟡 c10: MORTAR MIX C45/55 vs. Excel-SoT C44/55 (offener Frank-Punkt) → mit Frank klären
  - 🟡 c13: MORTAR MIX "Fugen und Profile" durch Referenzen belegt (adversarial herabgestuft) → keine Streichung, "schwindarm" vereinheitlichen
  - 🟡 c18: Rapid Set Schnellbeton C40/50 nicht primärquellen-belegt → gegen offizielle TDS verifizieren

## abrieb-verschleiss
- Typ: Schadensbild
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/schadensbilder/abrieb-verschleiss/
- Rot: 3
- Gelb: 4
- Kernbefund: "Gruppe A ≤ 6 bzw. ≤ 5 cm³/50 cm²" — vermischt DIN 1100 Gruppe A mit EN-13813-Klasse A6.
- Befunde:
  - 🔴 c3: "Gruppe A: ≤ 6 bzw. ≤ 5 cm³/50 cm²" → Korrektur: DIN 1100 Gruppe A < 5,5; A6 ist EN-13813-Klasse, nicht Gruppen-Grenzwert; Systeme trennen (Quelle: MPVA/Bausachverständiger 1/2019; data/produkte.ts)
  - 🔴 c12: HE 60 rapid "A6 (≤ 6 cm³/50 cm²)" als Produktwert — TDS-Messwert ≤ 5,0 → Korrektur: "A6 nach EN 13813; Schleifverschleiß ≤ 5,0 cm³/50 cm² (Böhme)", data/produkte.ts (Quelle: TDS HE 60 rapid 03/2025)
  - 🔴 c34: Sinusfugen-Sanierung "voll belastbar nach ca. 2 Stunden" — TDS 60 min → Korrektur: "ca. 1 Stunde", alle 5 i18n + logistik.mdx + referenzen.ts (Quelle: TDS MORTAR MIX 04/2024)
  - 🟡 c8: HE 65 "höchste Verschleißfestigkeit" Superlativ neben A6-Wert inkonsistent → Superlativ entschärfen
  - 🟡 c9: HE 65 Plus A6 nicht TDS-verifizierbar; SVS-3-Variante A3 → gegen TDS prüfen
  - 🟡 c17: MORTAR MIX DUR 1-h/2-h-Widerspruch → auflösen
  - 🟡 c36: "TDS ausschreibungsfähig" — für Diamantbeton/WH-metallisch/HE 3 kein TDS-Volltext → belegen oder einschränken

## absandung-festigkeitsverlust
- Typ: Schadensbild
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/schadensbilder/absandung-festigkeitsverlust/
- Rot: 1
- Gelb: 3
- Kernbefund: Strandkorbhalle Sylt "auf KORODUR HB 5" — Referenz-produkte-Feld nennt "HB 5 rapid".
- Befunde:
  - 🔴 c23: Strandkorbhalle Sylt "auf KORODUR HB 5" → Korrektur: "HB 5 rapid", referenzen.ts loesung-Feld vereinheitlichen (Quelle: data/referenzen.ts; logistik.mdx)
  - 🟡 c6: KOROMINERAL Li+ nicht gegen Li+-eigenes TDS prüfbar → TDS beschaffen/prüfen
  - 🟡 c12: HE 65 "7 d" nicht TDS-belegt; 48-h-vs-7-d-Konflikt → klären/auflösen
  - 🟡 c17: DIN 18560-7 statt -3 für "kraftschlüssigen Verbund" (Verbundestrich = Teil 3) → Norm-Zuordnung korrigieren

## chemischer-angriff
- Typ: Schadensbild
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/schadensbilder/chemischer-angriff/
- Rot: 0
- Gelb: 2
- Kernbefund: "Öle und Treibstoffe greifen chemisch an" — Mineralöle/Treibstoffe wirken physikalisch, nicht lösend; Mechanismen trennen.
- Befunde:
  - 🟡 c6: "Öle und Treibstoffe greifen chemisch an" → Mechanismen trennen (physikalisch vs. lösend)
  - 🟡 c11: CUR-Empfehlung 63 ist Prüfverfahren; Anforderungsnorm ist CUR 65 → im Original-Projekt klären

## feuchte-whg
- Typ: Schadensbild
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/schadensbilder/feuchte-whg/
- Rot: 4
- Gelb: 2
- Kernbefund: "WHG = wassergefährdende Stoffe" — falsch aufgelöst, WHG = Wasserhaushaltsgesetz.
- Befunde:
  - 🔴 c1: "WHG steht für wassergefährdende Stoffe" → Korrektur: "Das WHG (Wasserhaushaltsgesetz) regelt mit der AwSV den Umgang mit wassergefährdenden Stoffen" (Quelle: gesetze-im-internet.de WHG_2009)
  - 🔴 c5: HE 65 Plus Klassen-String "DIN 18560-7 (CT-C70-F9-A6)" — gehört zu EN 13813 → Korrektur: "CT-C70-F9-A6 nach DIN EN 13813; DIN 18560-7 (Verbundestrich)" (Quelle: data/produkte.ts; classification.json)
  - 🔴 c12: "EN 1504-3 (C35/45)" DOT Europe — Norm/Klasse vermischt → Korrektur: "EN 1504-3 (R4); Druckfestigkeitsklasse C35/45 nach EN 206" (Quelle: DoP DOT Concrete Mix; data/produkte.ts)
  - 🔴 c18: "DIN EN 1015-11 (C55/67)" CEMENT ALL — Prüfmethode als Klassifizierung → Korrektur: "Druckfestigkeit geprüft nach DIN EN 1015-11; Klasse C55/67 (Herstellerdeklaration)" (Quelle: DIN EN 1015-11; normenGlossar.ts)
  - 🟡 c7: HE 65 Plus Schichtdicke nur app-intern (Zirkelbezug) → gegen TDS verifizieren
  - 🟡 c8: HE 65 Plus "7 Tage" nicht TDS-belegt; 48-h-vs-7-d-Konflikt → klären/auflösen
- Hinweis: c11 (DOT Europe EN 1504-3 R4) ist adversarial bestätigt (Fehlalarm) — NICHT mitgezählt. c24 (MORTAR MIX EN 1015-11 C45/55) bestätigt, TDS-konform — NICHT mitgezählt.

## schadensbilder-index
- Typ: Schadensbild
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/schadensbilder/
- Rot: 0
- Gelb: 1
- Kernbefund: "Öle und Treibstoffe greifen chemisch an" — Mechanismen trennen (gleicher Punkt wie chemischer-angriff c6).
- Befunde:
  - 🟡 c6: "Öle und Treibstoffe greifen chemisch an" → Mechanismen trennen
- Hinweis: c12 ("Oberfläche hat ihre Tragfähigkeit verloren") ist adversarial herabgestuft auf bestätigt (Fehlalarm) — NICHT mitgezählt; optionale Präzisierung "Oberflächenfestigkeit".

## risse
- Typ: Schadensbild
- URL: https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/schadensbilder/risse/
- Rot: 1
- Gelb: 1
- Kernbefund: HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" — Kategorienfehler, 1,5 ist Untergrund-Anforderung.
- Befunde:
  - 🔴 c26: HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" → Korrektur: Wert nicht als Produkteigenschaft führen, als Tragbeton-Anforderung ausweisen, data/produkte.ts Z420 (Quelle: TDS HB 5 rapid; data/produkte.ts)
  - 🟡 c36: "Risse hundertfach saniert" — Mengenaussage nicht belegbar (ca. 58-62 Referenzen gesamt) → belegen oder auf "vielfach"/"in zahlreichen Projekten" umstellen

SUMME: Rot=38, Gelb=37

# Claims-Inventar site-wide (Issue #277, Checkbox 1)

**Datum:** 2026-07-01 · **Branch:** docs/inventar-crosswalk · **Status:** Inventar (nur Checkbox 1 „inventarisieren"). Kein Entschärfen, kein Belegen, keine Abstimmung. Das ist auf Team/Frank blockiert.

## Zweck

Mechanische Bestandsaufnahme aller Marketing-Claims, Superlative und quantifizierten Aussagen site-wide, als Vorlage für die Team-Abstimmung (Checkbox 2–4). Auslöser: Der Claim „Risse hundertfach saniert" (Technik-Frageseite 2026-06-18) war nicht belegt. Steffi will Marketing-Claims einmal sauber sammeln, belegen und abstimmen, statt einzeln nachzubessern.

**Spalten je Claim:** Wortlaut · Fundort (Datei:Zeile) · Kategorie (Superlativ / Quantifiziert / Normbezogen / Nachhaltigkeit / Leistung) · Beleg im Repo? (ja/nein/teilweise) · Risiko-Flag (UWG/Produkthaftung-sensibel: ja/nein).

**Wichtige Vorab-Befunde:**
1. **Der Auslöser-Claim ist bereits entschärft.** „hundertfach" existiert nirgends mehr im Corpus. In allen Fachartikeln/Schadensbildern/Branchen steht durchgängig **„vielfach gemacht"** (z. B. `content/schadensbilder/risse.mdx:72`, `content/branchen/verkehr-infrastruktur.mdx:77`, `content/schadensbilder/index.mdx:71`). Für die Abstimmung ist das die Referenz-Formulierung.
2. **„Freigegeben" ≠ „im Repo belegt".** Die Header-Kommentare von `rapidSetContent.ts` und `betonsanierungContent.ts` markieren CO₂ ~30 %, Lebensdauer bis 4×, Brandklasse A1 als „von Steffi freigegeben (2026-06-30)". Das ist eine Management-Freigabe, KEIN im Repo abgelegter Nachweis (TDS/EPD/Quelldokument). In der Spalte „Beleg im Repo?" daher trotzdem nein/teilweise.
3. **Heritage-Kennzahlen sind explizit ungedeckt.** „seit 1936, über 750 Mio. m²" trägt in mehreren Artikeln bereits einen offenen `todo_frank`-Beleg-Vorbehalt (siehe unten). Steht nicht in `produkte.ts`/`referenzen.ts`.

---

## A. Risiko-Flag JA (UWG-/Produkthaftung-sensibel) — vorrangig abzustimmen

### A1 — Alleinstellungs-/Spitzenstellungs-Superlative (UWG §5 Irreführung, Spitzenstellungswerbung)

| # | Wortlaut | Fundort | Kategorie | Beleg im Repo? |
|---|----------|---------|-----------|----------------|
| A1.1 | „KORODUR – weltweit der Begriff für Industrieböden" | `docs/content-quellen/bereich-prosa/industrieboden.de.md:14`; dupl. `broschuere-extrakt/broschuere-s4-schicht-vs-einstreuung.md:52` | Superlativ | nein |
| A1.2 | „Über 750 Mio. m² sind die beste Referenz" | `bereich-prosa/industrieboden.de.md:16`; `broschuere-extrakt/broschuere-s2-branchen-normen.md:13`; `broschuere-s4...:53` | Superlativ + Quantifiziert | nein |
| A1.3 | „Der härteste und widerstandsfähigste Industrieboden ist langfristig immer die beste und wirtschaftlichste Lösung" | `bereich-prosa/industrieboden.de.md:18` | Superlativ | nein |
| A1.4 | „Seit über 50 Jahren zählt Rapid Set in den USA zur 1. Wahl bei Bauunternehmern" | `bereich-prosa/rapid-set.de.md:30` | Superlativ + Quantifiziert | nein |
| A1.5 | „die Rapid Set Zement-Technologie, der Durchbruch auf dem Baustoffmarkt" | `bereich-prosa/rapid-set.de.md:16` | Superlativ | nein |
| A1.6 | „Um nachhaltig die höchste Qualität und Reinheit zu gewährleisten" / „dauerhaft die höchste Qualität und Reinheit von Trinkwasser" | `bereich-prosa/microtop.de.md:16,18` | Superlativ | nein |
| A1.7 | „Weltweit vertrauen Versorgungsunternehmen auf die hohe Qualität der MICROTOP Produkte" | `bereich-prosa/microtop.de.md:20` | Superlativ | nein |
| A1.8 | „Qualität steht bei KORODUR an erster Stelle … garantiert asbestfrei" (Katzenstreu) | `bereich-prosa/katzenstreu.de.md:20` | Superlativ | teilweise (externe Testzitate genannt, keine Prüfberichte im Repo) |
| A1.9 | „NEODUR HE 65 Plus ist in unseren Daten das einzige Produkt mit WHG-Zulassung" | `content/schadensbilder/feuchte-whg.mdx:63` | Superlativ (Alleinstellung) | teilweise (bewusst als „in unseren Daten" relativiert; `todo_frank` in `content/artikel/beratungstrigger.mdx:16` offen: ob weitere WHG-Systeme existieren) |

> Hinweis: Die aktiv gerenderten Bereichsseiten (`rapidSetContent.ts`, `betonsanierungContent.ts`, `infrastrukturContent.ts`) verwenden die Trust-Überschrift **„Belegt statt behauptet"** und vermeiden die harten Alleinstellungs-Superlative aus der Alt-Prosa. Die Alt-Prosa (A1.1–A1.7) ist Quell-/Reuse-Material (`docs/content-quellen/bereich-prosa/`, verbatim Live-Scrape) und noch nicht überall in die aktive Datenschicht überführt. Bei EN/FR/PL/ES rendert weiter das generische Template.

### A2 — Nachhaltigkeits-/Umwelt-Claims (UWG §5 + EU-Green-Claims-Directive: strenge Substanziierungspflicht)

| # | Wortlaut | Fundort | Kategorie | Beleg im Repo? |
|---|----------|---------|-----------|----------------|
| A2.1 | „Rapid Set Zement ist ein GRÜNES Produkt – umweltfreundlicher, langlebiger und LEED konform … 30 % weniger CO₂-Ausstoß als Portlandzement!" | `bereich-prosa/rapid-set.de.md:42` | Nachhaltigkeit + Quantifiziert | teilweise |
| A2.2 | „CO₂-reduziert: Rund 30 % weniger CO₂-Ausstoß als Portlandzement. EPD … third-party verifiziert, LEED-konform." | `rapidSetContent.ts:146` | Nachhaltigkeit + Quantifiziert | teilweise (EPD referenziert, kein Absolutwert/Prüfbericht im Repo; via Faktencheck „freigegeben") |
| A2.3 | „Bis 4× langlebiger … Bis zu vierfache Lebensdauer gegenüber Portlandzement." | `rapidSetContent.ts:147` | Nachhaltigkeit + Quantifiziert | nein (kein Datenbeleg; nur „freigegeben"-Vermerk) |
| A2.4 | „Ca./30 % weniger CO₂ als herkömmlicher Portlandzement" (Produkt-besonderheiten ASPHALT REPAIR MIX / DOT Europe) | `data/produkte.ts:1224,1271`; i18n-Pässe EN/FR/ES/PL (z. B. `data/i18n/produkte.en.ts:161,183`) | Nachhaltigkeit + Quantifiziert | teilweise |
| A2.5 | „NEODUR HE 3 green … CO₂-Ausstoß in der Herstellung um bis zu 30 Prozent reduziert … EPD bereit" | `data/produkte.ts:1648`; `content/artikel/neubau-systemwahl.mdx:40`; `neubau-wirtschaftlichkeit.mdx:84`; `wirtschaftlichkeit-tco.mdx:84` | Nachhaltigkeit + Quantifiziert | teilweise (Relativwert belegt; Absolutwert kg CO₂-Äq. fehlt — `todo_frank` in `wirtschaftlichkeit-tco.mdx:21`, `neubau-wirtschaftlichkeit.mdx:23`) |
| A2.6 | „Rapid Set Zementtechnologie mit 30 % weniger CO₂-Ausstoß als herkömmliche Systeme" / „30 % weniger CO₂ als herkömmlicher Portlandzement" (Referenz-Ergebnisse) | `data/referenzen.ts:2906,2038`; i18n z. B. `data/i18n/referenzen.en.ts:1469,2334` (dort „more than 30%") | Nachhaltigkeit + Quantifiziert | teilweise |
| A2.7 | „Die Lebensdauer eines Hartstoffindustriebodens ist um ein vielfaches höher als ein reiner Betonboden oder alternative Industriebodensysteme" | `bereich-prosa/industrieboden.de.md:32` (dupl. in `-wxr` + `scrape-extrakt/00-...`) | Nachhaltigkeit / Leistung | nein |
| A2.8 | Bezugsbasis-Inkonsistenz: „30 % weniger CO₂" tritt als „in der Herstellung" (HE 3 green) UND als absoluter Produktvergleich (DOT/ASPHALT: „more than 30%") auf | `wirtschaftlichkeit-tco.mdx:24` (offener `todo_frank` zur Vergleichbarkeit) | Nachhaltigkeit | teilweise (Inkonsistenz dokumentiert, nicht aufgelöst) |

### A3 — Norm-/Prüf-/Zulassungs-Claims (Produkthaftung: müssen produkt-/bauteilgenau haltbar sein)

| # | Wortlaut | Fundort | Kategorie | Beleg im Repo? |
|---|----------|---------|-----------|----------------|
| A3.1 | „Brandklasse A1, nichtbrennbar statt B1" (mineralische Alternative zu Epoxidharz) | `rapidSetContent.ts:154` | Normbezogen | nein (keine A1-Prüfung im Repo; via Faktencheck „freigegeben") |
| A3.2 | „Betoninstandsetzung im Rahmen der EN 1504" / Hero „nach DIN EN 1504-3" | `betonsanierungContent.ts:64,224`; Trust-Normlisten `:225-231`, `rapidSetContent.ts:189-195`, `infrastrukturContent.ts:171` | Normbezogen | teilweise (Normlisten gesetzt; produktgenaue Zuordnung nicht im Doc) |
| A3.3 | „Nach TL BEB-StB geprüft … geforderte Frühfestigkeit ≥ 20 MPa nach 5 h, erreicht bereits nach 2 h" (Rapid Set Concrete) | `infrastrukturContent.ts:99`; `bereich-prosa/infrastruktur.de.md:27`; `data/produkte.ts:1360` | Normbezogen + Leistung | teilweise |
| A3.4 | „entsprechen den Arbeitsblättern und Richtlinien des DVGW" (MICROTOP) | `bereich-prosa/microtop.de.md:18` | Normbezogen | teilweise (Norm-Sync-Memo: DVGW-TW-Track noch offen) |
| A3.5 | „Sulfatbeständig (Prüfung nach Wittekindt) sowie frost- und tausalzbeständig (CDF-Prüfung). Sehr niedriger Chloridionengehalt." | `rapidSetContent.ts:145` | Normbezogen + Leistung | teilweise |
| A3.6 | „Statisch relevant nach DIN EN 1504-3" / „beständig nach DAfStb" / „nach DIN 18040" (Anwendungs-Sublabels der Kacheln) | `betonsanierungContent.ts:178,180,179`; `rapidSetContent.ts:129,131,130` | Normbezogen | teilweise |
| A3.7 | Faktencheck-Sperren Infrastruktur bereits gezogen: KEINE harte KOROCRETE-Verkehrsfreigabe-Stundenzahl, KEINE XF-Klassen, KEINE ZTV-ING/EN-1504-3-Bauteil-Claims für Brücken | `infrastrukturContent.ts:16-19` (Header-Kommentar) | Normbezogen | n/a (dokumentierte bewusste Auslassung — als Positivbeispiel für die Abstimmung) |

### A4 — Quantifizierte Leistungs-/Heritage-Claims ohne Repo-Beleg

| # | Wortlaut | Fundort | Kategorie | Beleg im Repo? |
|---|----------|---------|-----------|----------------|
| A4.1 | „Seit 1936 haben wir weltweit über 750 Mio. m² KORODUR Industrieböden verlegt" | `content/artikel/neubau-systemwahl.mdx:30,98`; `neubau-wirtschaftlichkeit.mdx:31,56`; Trust-Kennzahl „Seit 1936" `betonsanierungContent.ts:221`, `infrastrukturContent.ts:167` | Quantifiziert + Heritage | nein — mehrfach offener `todo_frank` (`neubau-sichtboden.mdx:22`, `neubau-systemwahl.mdx:22`, `neubau-wirtschaftlichkeit.mdx:21`) |
| A4.2 | „Über 2.500 Handwerksbetriebe verarbeiten Rapid Set" (Trust-Kennzahl) | `rapidSetContent.ts:185-186` | Quantifiziert | nein |
| A4.3 | „Exklusiver Lizenzpartner für Rapid Set seit 2012" / „Seit über 50 Jahren in den USA bewährt, exklusiv durch uns in Europa" | `rapidSetContent.ts:188,66`; `betonsanierungContent.ts:105`; `bereich-prosa/rapid-set.de.md:16` | Quantifiziert + Superlativ | teilweise (nur Prosa-Quelle) |
| A4.4 | „seit über 25 Jahren in den USA zugelassen" (Rapid Set Concrete) | `data/produkte.ts:1360` | Quantifiziert | teilweise (Prosa/TDS) |
| A4.5 | „Über 150.000 m² Hartstoff-Industrieböden … für Straßenbaumaschinen bis 500 Tonnen. Seit Jahrzehnten bewährt." (Wirtgen-Referenz) | `data/referenzen.ts:1142` | Quantifiziert | teilweise (Referenz-Eigenangabe) |
| A4.6 | „wohl weltweit größten Logistikzentrums … 235.000 m² … mehr als 50 Fußballfeldern" | `bereich-prosa/industrieboden.de.md:28` | Quantifiziert + Superlativ | nein |
| A4.7 | „Nach neun Monaten intensiver LKW-Nutzung … Frühfestigkeit von 32 N/mm² nach 2 Stunden" | `content/branchen/verkehr-infrastruktur.mdx:85` | Leistung + Quantifiziert | teilweise (Projektbericht) |

### A5 — Leistungs-/Aushärte-Versprechen (Produkthaftung-sensibel; überwiegend TDS-nah, aber öffentlich als Zusage lesbar)

| # | Wortlaut | Fundort | Kategorie | Beleg im Repo? |
|---|----------|---------|-----------|----------------|
| A5.1 | „belastbar nach 1 Stunde" / „Nach rund einer Stunde belastbar" (Hero-Chips + Vorteile) | `rapidSetContent.ts:63,67,103-105`; `betonsanierungContent.ts:61,107,116-118` | Leistung | ja (TDS/`produkte.ts:980` u. a.) |
| A5.2 | „CEMENT ALL erreicht bereits nach 60 Minuten über 20 N/mm² Druckfestigkeit … Verkehrsflächen oft schon nach zwei Stunden wieder befahrbar" | `rapidSetContent.ts:105`; `betonsanierungContent.ts:118` | Leistung + Quantifiziert | ja/teilweise (Druckfestigkeit TDS-gedeckt; „oft nach zwei Stunden befahrbar" verallgemeinernd) |
| A5.3 | „Über 20 N/mm² nach 60 Minuten, bis Klasse C55/67 nach 28 Tagen" | `rapidSetContent.ts:143` | Leistung + Normbezogen | ja (`produkte.ts`) |
| A5.4 | „Einbaustärken von nahezu 0 bis 600 mm" / „Aufbaustärken von 0 bis 60 cm im ersten Arbeitsgang" | `rapidSetContent.ts:112`; `betonsanierungContent.ts:125`; `bereich-prosa/rapid-set.de.md:23` | Leistung + Quantifiziert | ja (`produkte.ts` verarbeitungModi) |
| A5.5 | Verkehrsfreigabe-/Belastungszahlen Infrastruktur-Systeme: „Verkehrsfreigabe nach rund 2 Stunden" (Rapid Set Concrete); „ca. 18/25/35 N/mm² nach 6/8/16 h, ca. 65 N/mm² nach 28 d … Nutzung/Verkehrsfreigabe wenige Stunden nach Verlegung, rezepturabhängig" (KOROCRETE) | `infrastrukturContent.ts:99-102,111-113` | Leistung + Quantifiziert | ja/teilweise (KOROCRETE bewusst ohne harte Freigabezahl, s. A3.7) |
| A5.6 | „Kein Haftvermittler nötig, denn Wasser ist unsere Grundierung" / „ohne Haftbrücke" | `rapidSetContent.ts:119,117`; `betonsanierungContent.ts:130,132,152` | Leistung | ja/teilweise (produktabhängig; für Spritzmörtel „in der Regel ohne Haftbrücke") |
| A5.7 | Projekt-Wiedernutzungszeiten: „nach nur 4 Stunden wieder voll nutzbar" (DHL), „nach 24 Stunden" (WEAG), „150 m² übers Wochenende … nach 48 Stunden" (Antolin) | `content/artikel/betreiber-faq.mdx:39`; `sperrzeit-belastbarkeit.mdx:72-75`; `content/schadensbilder/absandung-festigkeitsverlust.mdx:96` | Leistung + Quantifiziert | ja (Referenz-gedeckt) |
| A5.8 | Festigkeits-/Verschleiß-Zusagen Neubau: „NEODUR HE 65 … 70 N/mm² und A6 nach DIN EN 13892-3", „HE 60 rapid 60 N/mm²", „HE 3 … ≤ 5 cm³/50 cm² Gruppe A" | `content/artikel/wirtschaftlichkeit-tco.mdx:43`; `betreiber-faq.mdx:67`; `neubau-normen-klassen.mdx:69,82`; `data/produkte.ts` (qualitaetsklasse-Felder) | Leistung + Normbezogen | ja (`produkte.ts`/TDS) |

---

## B. Risiko-Flag NEIN — Puffery / subjektiv / gut gedeckt (nachrangig, meist unkritisch)

| # | Wortlaut | Fundort | Kategorie | Bemerkung |
|---|----------|---------|-----------|-----------|
| B1 | „einzigartige Terrazzooptik" / „einzigartiges Ambiente" / „einzigartiger, geschliffener Designboden" (Design-Referenzen, ~15 Stellen) | `data/referenzen.ts:2025,2113,2281,2283,2903,2905,2986,3011,3020,3029` u. a. | Superlativ (Optik) | Zulässige Werbe-Anpreisung (subjektive Ästhetik), nicht faktisch nachprüfbar → geringes Risiko |
| B2 | „weltweit. bewährt. Made in Germany." (Broschüren-Claim) | `broschuere-extrakt/broschuere-s1-cover-usp-verarbeitung.md:15` | Superlativ | „Made in Germany" separat prüfen (Herkunftsangabe), Rest Puffery |
| B3 | „Schnell wieder belastbar. Dauerhaft instand gesetzt." / „Rapid Set changes the game!" / „schnell. einfach. einzigartig." (Slogans/Abbinder) | `betonsanierungContent.ts:236`; `rapidSetContent.ts:64,106,200`; `infrastrukturContent.ts:176` | Superlativ (Slogan) | Marken-Slogans, Werbesprache → geringes Risiko |
| B4 | „Wie ein Schweizer Taschenmesser … Ein Material ersetzt den ganzen Werkzeugkasten" | `rapidSetContent.ts:76-78` | Superlativ (Metapher) | Bildliche Anpreisung → geringes Risiko |
| B5 | „bewährt / seit Jahrzehnten bewährt / verlässliche Produkte seit vielen Jahrzehnten" (allgemein) | `bereich-prosa/spezialmoertel.de.md:34`; `data/referenzen.ts:785,1102`; div. Branchen-mdx | Superlativ (Erfahrung) | Unspezifische Erfahrungsanpreisung → gering, sofern nicht mit harter Zahl gekoppelt |
| B6 | „Wir haben es vielfach gemacht" / „vielfach saniert" / „vielfach instand gesetzt" | `content/artikel/beratungstrigger.mdx:61`; `sperrzeit-belastbarkeit.mdx:72`; alle Branchen-/Schadensbild-mdx | Quantifiziert (weich) | Bereits die entschärfte Nachfolge-Formel für „hundertfach" → Referenz-Formulierung, gering |

---

## Kernzahlen

- **~45 entscheidungsrelevante Claim-Positionen** inventarisiert (A: ~33 mit Risiko-Flag, B: ~6 Sammelpositionen ohne).
- **Aktive Datenschicht:** `betonsanierungContent.ts`, `rapidSetContent.ts`, `infrastrukturContent.ts`, `produkte.ts`, `referenzen.ts` (+ i18n-Pässe EN/FR/PL/ES für CO₂- und Referenz-Claims).
- **Quell-/Reuse-Schicht:** `docs/content-quellen/bereich-prosa/` (verbatim Alt-Site-Prosa, teils schärfere Superlative als die aktive Schicht) + `broschuere-extrakt/`.
- **Fachartikel:** `content/artikel/`, `content/branchen/`, `content/schadensbilder/`.

## Offene Lücken (ausgewiesen, nicht selbst geschlossen)

1. **CO₂-Absolutwert fehlt.** Nur Relativwert „bis zu 30 %" in den Daten; kg CO₂-Äq./m² bzw. /t (EPD) nicht hinterlegt. Offene `todo_frank` in `wirtschaftlichkeit-tco.mdx:21`, `neubau-wirtschaftlichkeit.mdx:23`. Bezugsbasis-Inkonsistenz (Herstellung vs. Produktvergleich, DE „30 %" vs. EN „more than 30%") ungelöst (A2.6/A2.8).
2. **Heritage „seit 1936 / über 750 Mio. m²" ohne Repo-Beleg** und ohne Quellenangabe; mehrfach als `todo_frank` markiert (A4.1). Gleiche Lage: „über 2.500 Handwerksbetriebe" (A4.2), „exklusiv seit 2012 / seit über 50 Jahren USA" (A4.3), „seit über 25 Jahren zugelassen" (A4.4).
3. **„Freigegeben"-Werte ohne abgelegten Nachweis:** CO₂ ~30 %, Lebensdauer bis 4×, Brandklasse A1 (A2.1–A2.3, A3.1) sind per Header-Kommentar management-freigegeben, aber ohne TDS/EPD/Prüfbericht im Repo. Für UWG/Green-Claims ist die Freigabe kein Substanziierungsnachweis.
4. **Norm-Claim-Granularität:** Trust-Normlisten (EN 1504-3, DVGW, TL BEB-StB, ISO 14025/EN 15804) sind gesetzt, aber die produkt-/bauteilgenaue Zuordnung ist in diesem Inventar nicht aufgelöst (A3.2–A3.6). DVGW-TW-Sync laut Norm-Sync-Memo noch offen.
5. **WHG-Alleinstellung** („HE 65 Plus einziges WHG-Produkt") ist bewusst als „in unseren Daten" relativiert, aber der zugrunde liegende `todo_frank` (existieren weitere WHG-Systeme?) ist offen (A1.9).
6. **Housekeeping-Fund (außerhalb Scope):** verschachteltes Duplikat `docs/content-quellen/content-quellen/` spiegelt `bereich-prosa/` und `scrape-extrakt/` doppelt. Für die Claim-Pflege irrelevant, aber Verwechslungsgefahr beim späteren Einarbeiten.

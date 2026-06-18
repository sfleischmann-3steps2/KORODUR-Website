# Content-Nacharbeit Fachartikel (2026-06-18)

**Kernaussage:** Die 24 Artikel sind sprachlich und faktisch weitgehend sauber. Automatisch bereinigt wurden nur Kleinigkeiten (2 Em-Dashes, 4 Link-/Routen-Fixes, 3 Faktenkorrekturen mit Repo-Beleg). Substanziell offen bleibt eine lange Liste fachlicher Freigaben fuer Frank (Default-Produktempfehlungen, fehlende Kennwerte, Lebensdauer-/Heritage-Zahlen, WHG/Trinkwasser-Routing), bevor Artikel von `entwurf` auf `freigegeben` gehen.

## Summen-Tabelle

| Kategorie | Summe |
| :-- | --: |
| Em-Dashes entfernt | 2 |
| Schreibfehler korrigiert | 0 |
| Link-/Routen-Fixes | 4 |
| Faktenkorrekturen | 3 |
| Referenz-Slug-Probleme | 0 |
| Offene Frank-TODOs (gesamt) | 73 |

## Faktenkorrekturen (mit Beleg)

| Artikel | Stelle | war | jetzt | Beleg |
| :-- | :-- | :-- | :-- | :-- |
| lebensmittel.mdx | Tabelle "Womit wir arbeiten", Zeile NEODUR HE 60 rapid | Hartstoff-Schnellestrich, DIN 18560-7, >= 60 N/mm2 | Hartstoff-Schnellestrich, DIN 18560-1, >= 60 N/mm2 | produkte.ts:134-140 (normen HE 60 rapid): "DIN 18560", "DIN 18560-1" gelistet; "DIN 18560-7" kommt im Repo nicht vor |
| feuchte-whg.mdx | Echte Referenzen, Naturex-Eintrag | Eingesetzt: DOT Europe CONCRETE MIX, nach 16 Stunden beschichtbar. | Eingesetzt: Rapid Set CONCRETE MIX, nach 16 Stunden beschichtbar. | referenzen.ts:888 produkte: ["Rapid Set CONCRETE MIX", "Rapid Set CONCRETE PHARMACY"]; loesung Z.892 nennt explizit "Schnellbeton CONCRETE MIX ... bereits nach 16 Stunden". DOT Europe CONCRETE MIX (produkte.ts:655) ist ein anderes Produkt |
| feuchte-whg.mdx | Verwandte Anwendung: Trinkwasser (nicht WHG) | ... sowie den Quellvergussbeton NEODUR VM basic, geprueft nach den DVGW-Arbeitsblaettern W 270, W 300 und W 347. | ... geprueft nach den DVGW-Arbeitsblaettern W 270, W 300 und W 347, sowie den Quellvergussbeton NEODUR VM basic, geprueft nach DVGW-Arbeitsblatt W 347. | produkte.ts:1837 NEODUR VM basic normen: ["DVGW W 347", ...]; W 270/W 300 gehoeren laut produkte.ts:1614 zu den MICROTOP-TW-Produkten (z.B. TW 5), nicht zu NEODUR VM basic |

## Link-/Routen-Fixes

| Artikel | von | zu | Grund |
| :-- | :-- | :-- | :-- |
| verkehr-infrastruktur.mdx | /de/loesungsfinder/ | /loesungsfinder | Lang-Prefix und Trailing-Slash entfernt; kanonische interne Route (16x /loesungsfinder ohne Prefix in content/) |
| verkehr-infrastruktur.mdx | /de/kontakt/ | /kontakt | Lang-Prefix und Trailing-Slash entfernt; kanonische interne Route (22x /kontakt ohne Prefix in content/) |
| abrieb-verschleiss.mdx | /kontakt/industrieboden | /kontakt?bereich=industrieboden | Route /kontakt/<sub> existiert nicht; FachberaterFinder.tsx:47 liest Deep-Link ?bereich=<slug>; "industrieboden" ist gueltiger Bereich-Slug (fachberater.ts) |
| absandung-festigkeitsverlust.mdx | Loesungsfinder (Klartext-CTA ohne Link) | /loesungsfinder | CTA nannte den Loesungsfinder als Handlungsaufforderung, war aber nicht verlinkt; auf gueltige Route gesetzt |

## Referenz-Slug-Probleme

Keine. In keiner Datei traten ungueltige Referenz-Slugs auf. Alle im Frontmatter (`referenzen:`) und im Fliesstext genannten Projekte wurden gegen `data/referenzen.ts` verifiziert und existieren. Mehrheitlich fuehren die Artikel kein `referenzen:`-Frontmatter-Feld, sodass dort kein Slug-Check anwendbar war.

## Offen fuer Frank (je Artikel)

### beratungstrigger.mdx
- Telefonische Beratungs-Hotline (zentrale Nummer/Zeiten) bestaetigen: Artikel verweist nur auf direkte Fachberater-Durchwahlen aus fachberater.ts, keine zentrale Hotline hinterlegt.
- Zusage/Reaktionszeit fuer Beratungsanfragen freigeben (z. B. "Rueckmeldung innerhalb 24 h Werktag")?
- WHG-/Chemie-Fall: Bestaetigen, ob NEODUR HE 65 Plus (whgZulassung=true) als einziges WHG-Produkt genannt werden soll oder ob weitere WHG-zugelassene Systeme existieren.
- Trinkwasser-Routing: Datensatz fuehrt nur einen Trinkwasser/MICROTOP-Ansprechpartner ohne PLZ-Gebiet; bestaetigen, dass Trinkwasseranfragen bundesweit an ihn gehen.
- Schwellenwert "grosse Flaeche": Artikel nennt keine harte qm-Grenze (nicht belegt); pruefen, ob ein konkreter Schwellenwert kommuniziert werden soll.

### betreiber-faq.mdx
- Generische Lebensdauer-Spanne in Jahren fuer Hartstoffestriche/Schnellbeton (EPD-Referenznutzungsdauer?) - kein Wert in Repo-Daten.
- Vollstaendigkeit/Korrektheit der Vor-Ort-Pruefliste (Tragfaehigkeit, Restfeuchte, Schadstoffe, Ebenheit, Haftzug Pull-Off) - fehlen Rissbild/aufsteigende Feuchte/Altbeschichtungen?
- Darf Mindesttemperatur/Witterung (NEODUR HE 60 rapid +5 bis +30 C laut TDS) als generelle FAQ-Randbedingung stehen?
- Frist-/Sperrzeit-Angaben projektspezifisch - reicht Referenzbeispiel-Formulierung oder expliziter Projektabhaengigkeits-Hinweis noetig?
- Inline TODO Zeile 40: Expliziter Satz, dass alle Zeiten projektabhaengig (Schichtdicke/Produkt/Temperatur) sind und vom Fachberater bestaetigt werden?
- Inline TODO Zeile 68: Konkrete Lebensdauer-Spanne in Jahren nennbar (EPD/Erfahrungswert)? Ohne Beleg bewusst keine Jahreszahl.
- Inline TODO Zeile 81: Pruefliste fuer Betreiber-FAQ vollstaendig oder Restfeuchte/aufsteigende Feuchte/Rissbild/Altbeschichtungen ergaenzen?

### einstreuung-vs-schicht.mdx
- Eindringtiefe-Wert "NEODUR HE 65 Plus: 25,7 mm dokumentiert" (Zeile 70, WHG-Nachweis) ist in der zitierten Quelle data/produkte.ts NICHT belegt (kein Feld eindringtiefe / kein Wert 25,7). Quelle/TDS-Beleg fuer die 25,7 mm bestaetigen, bevor der Wert oeffentlich bleibt.

### neubau-sichtboden.mdx
- COPETTI-Namensgeber (Designer Alessandro Copetti) bewusst entpersonalisiert; falls Designer-Credit erwuenscht, freigeben und Name wieder aufnehmen.
- Es liegen nur drei Neubau-Referenzen im Datensatz vor, alle Sicht-/Designboden (LAEHITAPIOLA Espoo, Kaiserhof Koeln, Schmidtmeier Bochum). Eine Schwerlast-Neubau-Industrieboden-Referenz fehlt komplett. Bitte ein bis zwei Neubau-Projekte mit Hartstoffeinstreuung/Hartstoffestrich (Logistik/Produktion) ergaenzen.
- Heritage-Kennzahl "seit 1936, weltweit ueber 750 Mio. m2 KORODUR Industrieboeden verlegt" ist Marken-Fakt, in den Repo-Daten nicht hinterlegt. Quelle/Freigabe bestaetigen. (Hinweis: 750-Mio.-Zahl steht nicht im Artikeltext; Artikel nennt nur "Seit 1936".)
- GRANIDUR BIANCO/NERO: Verschleissklasse (Schleifverschleiss cm3/50 cm2 nach DIN 1100) in produkte.ts nicht hinterlegt (nur Druck-/Biegezugfestigkeit). Fuer Belastbarkeits-Argumentation ergaenzen, falls verfuegbar.
- TRU PC/TRU SP: Voll-belastbar-Zeit und Verschleiss-/Eignungsklasse fuer Publikumsverkehr stehen nicht in den Daten (nur begehbar nach 2-3 h, Druckfestigkeitsverlauf). Bestaetigen, ab wann die Flaeche unter Publikumsverkehr voll nutzbar ist.
- Baeckerei Schmidtmeier Bochum: keine Flaechenangabe (m2) in referenzen.ts. Falls bekannt, nachpflegen.
- Eignung der Sichtboeden fuer gewerblichen Schwerlast-/Staplerverkehr bewusst nicht behauptet (Designboeden = Publikums-/Gewerbeflaechen). Falls eine geschliffene Hartstoffeinstreuung als optisch-belastbare Neubau-Loesung positioniert werden soll, Produktpaarung (z. B. NEODUR HE 3 farbig + Feinschliff) bestaetigen.

### neubau-systemwahl.mdx
- Zeile 87 (LAEHITAPIOLA): Detailwerte "CT-C45-F6, mittlere Schichtdicke 15 mm im Verbund mit KORODUR HB 5" stehen NICHT in referenzen.ts (Eintrag fuehrt nur Flaeche 1500 m2, Jahr 2009, Produkt GRANIDUR BIANCO/NERO). Quelle/Sign-off noetig.
- Zeile 53: "fuer moderater belastete Bereiche" - Grammatik (sollte "moderat belastete" heissen). Als Stilpunkt nicht editiert; Frank pruefen.
- Zeile 39: Schreibweise "CO2" vs. Repo-Konvention mit tiefgestelltem 2; falls einheitliche Subscript-Schreibweise gewuenscht, hier angleichen.

### neubau-wirtschaftlichkeit.mdx
- Belastbare Aussage zur erwarteten Nutzungsdauer (Jahre) fuer Hartstoffeinstreuung/Hartstoffestrich - kein Jahreswert in den Daten.
- Heritage-Kennzahlen "seit 1936" und "weltweit ueber 750 Mio. m2" stehen nicht in produkte.ts/referenzen.ts - Quelle/Beleg bestaetigen.
- Schwerlast-Neubau-Industrieboden-Referenz fehlt im Datensatz; die drei Neubau-Refs sind Sicht-/Designboeden.
- Absoluter CO2-Wert (kg CO2-Aeq./m2 oder /t laut EPD) fehlt in den Daten; nur "bis zu 30 %" belegt.
- Freigabe, ob Investitions-/Lebenszyklus-Argumente mit Zahlen (EUR, Prozent, Jahre) illustriert werden duerfen.

### sperrzeit-belastbarkeit.mdx
- Datenblatt-Wert vs. Projekt-Realitaet: produkte.ts nennt fuer NEODUR HE 60 rapid "voll belastbar nach 24 h", die Referenzen Antolin und Kleemann nennen 48 h Wiederinbetriebnahme. Welcher Wert soll in der Tabelle als Versprechen stehen, und wie formulieren wir die Abhaengigkeit von Schichtdicke/Temperatur/Auslastung?
- KOROCRETE Schnellbeton: produkte.ts sagt "wenige h (rezepturabhaengig)", anwendungsmatrix.ts sagt "8 h". Welcher Wert ist die belastbare Aussage fuer Bauherren?
- NEODUR HE 65 / HE 65 Plus / HE 40: belastbarNach = "7 d". Gibt es eine "begehbar nach"-Zwischenstufe, die wir nennen duerfen?
- Definition der drei Stufen begehbar / belastbar / voll belastbar als KORODUR-Standard bestaetigen (was bedeutet "belastbar" konkret: leichter Verkehr, Stapler, Schwerlast?).
- Fehlende "begehbar"-Werte: Datensatz liefert nur fuer HE 60 rapid (ca. 3 h), NEODUR Level (24 h leicht), TRU Self-Leveling (2-3 h), Rapid Set CEMENT ALL (15 min) konkrete Zwischenwerte. Restliche begehbar-Zellen sind TODO.
- Tabellen-TODO: Spalten Klassifizierung und Begehbar nach sind Entwurfswerte und gegen die aktuellen TDS zu verifizieren.

### wirtschaftlichkeit-tco.mdx
- Text behauptet fuer KORODUR HB 5 rapid eine "Haftzugfestigkeit mindestens 1,5 N/mm2" (Zeile 54). Im Repo steht 1,5 N/mm2 jedoch als geforderte Oberflaechenzugfestigkeit des UNTERGRUNDS ("Tragbeton mind. C25/30, Oberflaechenzugfestigkeit >= 1,5 N/mm2"), NICHT als Haftzugfestigkeit des Produkts. Eine produktseitige Haftzugfestigkeit ist im Repo nicht hinterlegt. Korrekten Produktwert pruefen bzw. Formulierung freigeben (Untergrund-Anforderung vs. Produktkennwert).

### branchen/flugzeug.mdx
- Begriff "Flugzeug"/"Flugbetriebsflaechen": Zwei der drei Referenzen sind Hubschrauber-Landeplaetze (Plock, Mikkeli), eine ist ein Containerstellplatz am Flughafen (Fraport). Echte Hangar-/Rollfeld-Referenz fehlt. Pruefen, ob weitere Flugbetriebs-Referenzen ergaenzbar sind.
- Flaechenangaben fehlen: Helipad Plock und Mikkeli haben kein flaeche-Feld. Nachpflegen?
- Fraport-Flaeche in den Daten als "100" ohne Einheit hinterlegt. m2? Bestaetigen und Einheit ergaenzen.
- Default-Produktempfehlung Hangar-Innen (NEODUR HE 65 / HE 60 rapid) vs. Aussen-Flugbetriebsflaechen (NEODUR HE 65 Plus) und Verschleissgruppe je Lastfall bestaetigen.
- Hero-Illustration freigeben oder durch echtes Referenzbild (Helipad Mikkeli/Plock) ersetzen.
- NEODUR HE 65 Plus Wiederbelastbarkeit: belastbarNach=7 d (autoritativ) vs. aushaertezeit=48 h in den Daten. Welcher Wert gilt fuer die Kundenkommunikation?

### branchen/industrie-produktion.mdx
- Druckfestigkeit/Schichtdicke der zitierten Referenzprojekte sind in referenzen.ts nicht durchgaengig hinterlegt (z. B. Guben, WEAG) - pruefen, ob ergaenzbar.
- WEAG Entsorgungsbetrieb ohne Ortsangabe in den Daten (nur "Deutschland") - Standort ergaenzbar?
- Default-Produktempfehlung fuer Industrie/Produktion (NEODUR HE 60 rapid vs. HE 65 vs. KOROCRETE Schnellbeton) und Verschleissgruppe je Lastfall bestaetigen.
- Treibstoff-/Oeleintrag als Lastfall: in den zitierten Produktionsreferenzen nicht explizit dokumentiert - Beleg ergaenzen oder Aussage entschaerfen?
- Hero-Illustration freigeben oder durch echtes Referenzbild (Produktionshalle Kleemann) ersetzen.

### branchen/lebensmittel.mdx
- Naturex Burgdorf: Artikel nennt Produkt "DOT Europe CONCRETE MIX", die Referenz (referenzen.ts:888) fuehrt aber "Rapid Set CONCRETE MIX" (+ CONCRETE PHARMACY/SET Control). Produktname uneindeutig (beide Produkte existieren) - nicht editiert; entspricht offenem todo_frank #3.
- todo_frank #1 (Saeurebestaendigkeit org. Lebensmittelsaeuren) weiterhin offen - in produkte.ts nicht belegbar.
- todo_frank #2 (HACCP-/Lebensmittel-Eignungsdokument) weiterhin offen.
- todo_frank #4 (R-Klasse Rutschhemmung DGUV) weiterhin offen.
- todo_frank #5 (Bad Nauheim TW-Referenz vs. echte Produktionsreferenz) weiterhin offen.
- todo_frank #6 (Thermische Belastung/Heissreinigung) weiterhin offen.
- Body-TODO zur pauschalen Freigabe (Abschnitt Tabelle) und zu Bad Nauheim (Abschnitt Projekte) belassen - inhaltliche Fachfragen.

### branchen/logistik.mdx
- Druckfestigkeit/Schichtdicke der zitierten Referenzprojekte sind in referenzen.ts nicht hinterlegt - pruefen, ob ergaenzbar.
- Flaeche Fraport ("100") und John Lewis ("1000 Laufmeter") in den Daten uneinheitlich - m2-Angaben nachpflegen?
- DHL Ueberladebruecken ohne Flaechenangabe in den Daten - Flaeche/Stueckzahl ergaenzbar?
- Default-Produktempfehlung fuer Lager/Logistik (NEODUR HE 60 rapid vs. HE 65 vs. HE 40) und Verschleissgruppe je Lastfall bestaetigen.
- Hero-Illustration freigeben oder durch echtes Referenzbild (Strandkorbhalle Sylt) ersetzen.
- Strandkorbhalle-Block nennt Haftbruecke als "KORODUR HB 5 rapid"; referenzen.ts/Sylt fuehrt sie als "KORODUR HB 5". Produktslug ist korodur-hb-5-rapid. Welche Bezeichnung soll im Artikel stehen?

### branchen/parkdeck.mdx
- Zuerich/Freiburg: Beschichtungssysteme (Epoxidharz + DUROP / Triflex ProPark + DUROP) ohne KORODUR-Produkt-id in referenzen.ts; DUROP als eigenes Produkt fuehren und verlinken?
- Belastbarkeits-/Verkehrsfreigabe-Werte fuer DUROP-Beschichtungssysteme fehlen in Repo-Daten (keine produkte.ts-Eintraege); ergaenzen oder weglassen?
- Chlorid-Eindringwiderstands-Kennwert fuer NEODUR HE 65 Plus auf Parkdecks fachlich freigeben; produkte.ts fuehrt frost-tausalz + WHG, aber keinen expliziten Chlorid-Wert.
- Inline-TODO (Zeile 79): reine Oberflaechenschutz-/Abdichtungssysteme mit DUROP/Triflex ProPark haben keine eigenen Produkt-Eintraege mit Kennwerten; ob als KORODUR-Systeme mitfuehren, von Frank zu klaeren.

### branchen/verkaufsraeume.mdx
- Nike Store Szczecin und Decathlon Dortmund haben in referenzen.ts keine Flaechenangabe (flaeche-Feld fehlt) - m2-Angaben nachpflegen?
- Schichtdicke/Druckfestigkeit der zitierten Referenzprojekte sind in referenzen.ts nicht hinterlegt - pruefen, ob ergaenzbar (Decathlon: NEODUR HE 65 in 10 mm laut Loesungstext).
- Default-Produktempfehlung fuer Verkaufsraeume/Fachmaerkte (TRU Self-Leveling vs. TRU PC vs. GRANIDUR BIANCO/NERO vs. NEODUR HE 65) je nach Optik-Anspruch und Lastbild bestaetigen.
- Rutschhemmungsklasse (R-Wert) fuer Publikumsflaechen bei den Sichtestrichen ist in den Daten nicht hinterlegt - TODO ergaenzen?
- Hero-Illustration freigeben oder durch echtes Referenzbild (Nike Store Szczecin) ersetzen.

### branchen/verkehr-infrastruktur.mdx
- belastbarNach KOROCRETE Schnellbeton: in produkte.ts nur "wenige h (rezepturabhaengig)" (Zeile 716/733) - belastbare Stunden-Zahl fuer die Seite muss Frank freigeben.
- hafen-catania: Wiederinbetriebnahme-Zeit in referenzen.ts nur qualitativ ("Schnelle Wiederverfuegbarkeit", Zeile 660) - konkrete Tage/Stunden ergaenzen falls vorhanden.
- STALE-Verdacht, NICHT selbst korrigiert: todo_frank Nr.3 + Inline-TODO Zeile 82 behaupten produkte[] von fahrbahnsanierung-wien sei leer. Im Repo ist produkte: ["DOT Europe CONCRETE MIX"] (referenzen.ts:1356) bereits gesetzt. Punkt erscheint erledigt; nicht geloescht, da Loesch-Erlaubnis nur fuer Routen-/Slug-Bestaetigung gilt. Frank/Steffi: todo_frank Nr.3 und Body-TODO koennen entfernt werden.
- Eigener Vertrauensbaustein zur TL-Konformitaet (TL BEB-StB / ZTV-ING) pruefen.
- Bild-Briefs Schadensbild-Illustrationen (Hixfield) freigeben oder durch echte Referenzfotos ersetzen.
- Zustaendigen Fachberater je PLZ fuer Beratungs-CTA bestaetigen (Industrieboden & Rapid Set).

### schadensbilder/abrieb-verschleiss.mdx
- Wiederbelastbarkeit NEODUR HE 65 / HE 65 Plus / HE 40 (belastbarNach="7 d") gegen aktuelles TDS bestaetigen.
- Boehme-Pruefung: explizite Nennung "Boehme-Scheibe (DIN 52108)" vs. DIN 1100 Hartstoffgruppe.
- Verschleisswiderstand Rapid Set MORTAR MIX DUR: konkreter cm3-Abriebwert (DIN 1100 A ohne cm3-Wert in produkte.ts) ggf. aus TDS ergaenzen.
- Beanspruchungs-Matrix (leicht/mittel/schwer -> Hartstoffgruppe, Bereifung Vulkollan/Stahl) nicht in Repo-Daten.
- Bild-Brief ist Hixfield-Platzhalter; echtes Schadensfoto aus Archiv?

### schadensbilder/absandung-festigkeitsverlust.mdx
- Diagnose-Schwelle Haftzug-/Abreisswert (impraegnierfaehig vs. neue Verschleissschicht) - nicht in Repo-Daten.
- Bestaetigung Silikatisierung stellt Oberflaechenhaerte bei Absandung wieder her, saniert aber strukturell zu weichen Beton nicht - fachliche Frage.
- KOROMINERAL CURE quantitative Kennwerte (Eindringtiefe, Haerteanstieg, Verbrauch) fehlen in produkte.ts (Zeilen 806-825 nur qualitative besonderheiten) - ergaenzen oder weglassen.
- Echte Referenz mit explizitem Symptom Absandung/Staub pruefen - in referenzen.ts nicht direkt verschlagwortet.
- Untergrundvorbereitung vor Impraegnierung fachlich freigeben.

### schadensbilder/chemischer-angriff.mdx
- besonderheiten/Medienbestaendigkeit (Saeuretyp, Konzentration, pH-Grenze) fuer NEODUR-Hartstoffestriche fehlt in Repo-Daten.
- T1: KOROPOX eingestellt (#217), Ersatz-Impraegnierung fuer Oel-/Treibstoffbestaendigkeit benennen oder ersatzlos (betrifft Abschnitt "Impraegnierung gegen Oel und Treibstoff" + Tabelle).
- CEMENT-ALL chemie-aggressiv-Tag-Frage: todo_frank-Eintrag (Zeile 19) ist sachlich ueberholt - CEMENT ALL traegt den Tag bereits (produkte.ts:519). Eintrag NICHT geaendert, da fachliche Frage. Beim Sign-off als erledigt bestaetigen.
- WHG-Zulassungsnummer (Z-Nummer DIBt) fuer NEODUR HE 65 Plus liegt fuer die Produktdetailseite vor?

### schadensbilder/feuchte-whg.mdx
- DOT Europe CONCRETE MIX (Abschnitt Passende Produkte): Text nennt "EN 1504-3 (R4)" und "Druckfestigkeitsklasse C35/45 nach EN 206". In produkte.ts:660-663 sind die Normen nur DIN EN 1504-3 und DIN EN 1015-11 hinterlegt; weder "R4" noch "EN 206" stehen dort. C35/45 und >= 60 N/mm2 stimmen ueberein - kein direkter Widerspruch, daher nicht editiert. R4-Klasse und EN-206-Bezug bestaetigen oder streichen.

### schadensbilder/index.mdx
- Die 5 Schadensbilder sind aus dem Belastungs-Tag-Standard abgeleitet, finale 5er-Liste mit Frank fixieren.
- Risse und Absandung/Festigkeitsverlust sind KEINE eigenen BelastungsTags im Standard; Mapping Schadensbild -> Tag bestaetigen, bevor Kacheln auf den Loesungsfinder verlinken.
- Abrieb/Verschleiss = Tag verschleiss, chemischer Angriff = Tags chemie-treibstoff + chemie-aggressiv, Feuchte/WHG = Tag whg: Zuordnung pruefen.
- Slug-Schreibweise im todo (abrieb-verschleiss) final mit Frank abstimmen; Links zeigen bereits korrekt auf bestehende Detailartikel.
- Pruefen, ob ein eigenes Schadensbild "Frost-/Tausalzschaeden" (Tag frost-tausalz, aussen) zur 5er-Liste gehoeren soll oder bewusst subsumiert wird.

### schadensbilder/risse.mdx
- Ursachen-Systematik je Riss-Typ verbindlich festlegen.
- Schwellenwert Rissbreite fuer Sanierungspflicht.
- Diagnose-Reihenfolge und Akzeptanzkriterien (Pull-Off/Bohrkern) bestaetigen.
- Lasteintrag-Formulierung fachlich gegenpruefen.
- Auswahlkriterium punktuell vs. grossflaechig bestaetigen.
- Bildfreigabe Illustration vs. echtes Schadensfoto.

## Naechste Schritte

1. **Frank-Freigabe je Artikel:** Die obige Checkliste pro Artikel mit Frank durchgehen. Jeder Artikel bleibt auf `status: entwurf`, bis seine offenen Punkte beantwortet sind.
2. **Quick Wins zuerst abraeumen:** Zwei STALE-Befunde sind objektiv schon erledigt und nur noch zu bestaetigen, dann TODO loeschen:
   - chemischer-angriff.mdx Zeile 19 (CEMENT ALL traegt chemie-aggressiv bereits, produkte.ts:519)
   - verkehr-infrastruktur.mdx todo_frank #3 (fahrbahnsanierung-wien hat produkte gesetzt, referenzen.ts:1356)
3. **Fehlende Stammdaten nachpflegen:** Flaechenangaben (Helipad Plock/Mikkeli, Nike, Decathlon, Schmidtmeier, DHL), Fraport-Einheit ("100" -> m2), KOROMINERAL-CURE-Kennwerte, GRANIDUR-Verschleissklasse.
4. **Marken-/Heritage-Zahlen freigeben:** "seit 1936", "750 Mio. m2", absoluter CO2-Wert, Nutzungsdauer-Spannen.
5. **Nach Freigabe scharfschalten:** `status: entwurf -> freigegeben` setzen, Build/Validate laufen lassen, dann veroeffentlichen.

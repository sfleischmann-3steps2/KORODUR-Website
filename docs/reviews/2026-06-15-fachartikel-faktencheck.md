# Fachartikel-Faktencheck: 21 KORODUR-Artikel

Adressat: Frank Sander (technische Abnahme)
Datum: 2026-06-15
Reviewer-Pipeline: automatisierte Mehrstufen-Prüfung

## 1. Zweck und Methode

Dieser Report ist ein Vor-Check vor Franks fachlicher Abnahme. Wir haben alle prüfbaren Aussagen der 21 Fachartikel extrahiert und gegen die autoritativen Quellen verifiziert: TDS-Volltexte, `data/produkte.ts`, `data/referenzen.ts`, Norm-/Regelwerks-Datenbanken und Web-Recherche. Fokus liegt auf googelbar-widerlegbaren Patzern (falsche Normnummern, vertauschte Klassen-Buchstaben, falsche Verschleiß-Skalen, falsch aufgelöste Abkürzungen) und auf produktnahen Werten, die in Angebote und Bauablaufpläne einfließen. Jeder kritische Befund wurde zusätzlich adversarial gegengeprüft (Widerlegungsversuch); wo ein Endurteil vorliegt, zählt dieses.

Disclaimer: Die fachlich finale Abnahme liegt bei Frank. Produktspezifische B-Werte (Festigkeiten, Schichtdicken, Zeiten) wurden gegen TDS/Repo geprüft, aber bewusst nicht web-validiert. Klassifizierungs- und Wiederbelastbarkeits-Werte, die bereits in den `todo_frank`-Listen der Artikel stehen, sind dort separat adressiert.

## 2. Ampel-Zusammenfassung

| Ampel | Bedeutung | Anzahl |
| :---- | :---- | ----: |
| 🔴 falsch | Muss-Korrektur vor Veröffentlichung | 19 |
| 🟡 unklar | Quelle fehlt oder mehrdeutig, Frank klären | 14 |
| ✅ bestätigt | gegen autoritative Quelle gedeckt | 251 |

Geprüfte Aussagen mit Verdikt gesamt: 284 (über alle Artikel, exklusive reiner `todo_frank`-Wiederholungen).

Wichtigstes Muster: Die Verschleiß-Skala wird mehrfach falsch dargestellt ("höchste Verschleißklasse A6"). A6 ist Mittelfeld; A1,5 ist die beste Böhme-Klasse. Dieser Fehler taucht in vier Artikeln auf und ist gegenüber Planern sofort blamabel. Zweites Muster: "DAfStB" statt korrekt "DAfStb" plus eine erfundene 10-mm-WHG-Dichtheitsgrenze (TDS sagt 25,7 mm). Drittes Muster: "voll belastbar nach 24 h" für selbstverlaufende Sichtestriche (TDS: 24 h ist nur der Schleif-Zeitpunkt). Viertes Muster: Haftzugfestigkeit der Haftbrücke HB 5 rapid verwechselt mit der Untergrund-Anforderung.

## 3. 🔴 Muss-Korrektur

Sortiert nach Schwere (hoch zuerst).

| Artikel | Aussage (kurz) | Problem | Korrektur | Quelle |
| :---- | :---- | :---- | :---- | :---- |
| betreiber-faq | "höchste Verschleißklasse A6 nach DIN 18560-7" (c12) | A6 ist NICHT die höchste Klasse. Böhme-Skala A22..A1,5, kleinere Zahl = besser. A1,5 ist die beste. KORODUR-eigene SVS-Varianten erreichen A3/A1,5. | Superlativ streichen: "Verschleißklasse A6 nach DIN EN 13892-3 (Böhme)". Höchste Klasse ist A1,5. | TDS HE 60 rapid/HE 65; betontechnische-daten.de |
| betreiber-faq | "DIN 18560-7" als Quelle der A6-Klasse (c13) | Norm-Zuordnung: A-Klasse stammt aus DIN EN 13892-3 (Böhme), nicht DIN 18560-7. "höchste" falsch. | "höchste" streichen; A6 ist Mittelfeld; höchste Böhme-Klasse ist A1,5. | betontechnische-daten.de; DIN 18560-7 |
| neubau-systemwahl | Bauweise b "höchste Festigkeits- UND Verschleißwerte" (c25) | Verschleiß-Teil falsch. Gruppe KS/A1,5 wird auch per Einstreuung (Diamantbeton) erreicht. | Nur "höchste Festigkeit" behaupten; Verschleiß nicht exklusiv b zuschreiben. | TDS HE 65; data/produkte.ts |
| neubau-wirtschaftlichkeit | "NEODUR HE 65 ... höchster Verschleißwiderstand A6" (c5) | Selbstwiderspruch im Artikel: Diamantbeton (KS) als "höchstmöglich" genannt, A6 als unteres Ende. | "höchster" streichen; A6 = hohe, nicht höchste Klasse. SVS 1,5 erreicht A1,5. | TDS HE 65 03/2025; data/produkte.ts |
| wirtschaftlichkeit-tco | "NEODUR HE 65 ... höchsten Verschleißwiderstand A6" (c1/c5) | Gleicher Skalen-Fehler. Eigene SVS-1,5-Variante = A1,5 = besser. | "höchsten" streichen oder auf A1,5-Variante beziehen. | TDS HE 65; data/produkte.ts |
| abrieb-verschleiss | "Gruppe A: ≤ 6 bzw. ≤ 5 cm³/50 cm²" (c3) | Vermischt DIN-1100-Gruppe A (Grenzwert < 5,5) mit EN-13813-Klasse A6 (≤ 6). Gruppen-A-Grenzwert ist nicht ≤ 6. | DIN 1100 Gruppe A < 5,5 cm³/50 cm²; A6 ist EN-13813-Klasse (Produktklasse), nicht Gruppen-Grenzwert. Systeme trennen. | MPVA/Bausachverständiger 1/2019; data/produkte.ts |
| verkehr-infrastruktur | "höchste Verkehrsklasse Erhaltungsbau" für Rapid Set Schnellbeton (c20) | TL BEB-StB definiert keine Verkehrsklassen. Verkehrsklasse-Superlativ erfunden; Belastungsklassen regelt RStO 12. | "geprüft nach TL BEB-StB" statt "höchste Verkehrsklasse". Quelle: data/produkte.ts (besonderheiten) korrigieren. | FGSV TL BEB-StB; RStO 12; data/produkte.ts |
| einstreuung-vs-schicht | "ab 10 mm DAfStB-Richtlinie als dicht" (c14) | (a) Schreibweise "DAfStB" falsch (korrekt DAfStb). (b) 10-mm-Dichtheitsgrenze erfunden. KORODUR-TDS HE 65 Plus: 25,7 mm. WHG-Dichtheit über Eindringtiefe (72 h), nicht pauschale Schichtdicke. | WHG-Zeile umformulieren: keine 10-mm-Pauschale; Dichtheit über tragendes Bauteil/zugelassenes System (NEODUR HE 65 Plus: 25,7 mm dokumentiert). Schreibweise DAfStb. | TDS HE 65 Plus 11/2025; DAfStb-BUmwS |
| einstreuung-vs-schicht | Hartstoffgruppe A: "≤ 6,0 cm³/50 cm²" (c20) | DIN-1100-Tabelle 1: Gruppe A = ≤ 5,0, nicht ≤ 6,0. M (3,0) und KS (1,5) im Artikel korrekt, nur A falsch. | Zeile 58: A auf "≤ 5,0 cm³/50 cm²" ändern. | MPVA/Bausachverständiger 1/2019 (DIN 1100 Tab. 1); data/produkte.ts |
| neubau-systemwahl | HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" (c7) | Kategorienfehler. TDS nennt 1,5 N/mm² als Oberflächenzugfestigkeit des Tragbetons (Untergrund-Anforderung), nicht als Produkteigenschaft der Haftbrücke. | Umformulieren als Untergrund-Anforderung: "Tragbeton mind. C25/30, Oberflächenzugfestigkeit ≥ 1,5 N/mm²". Auch data/produkte.ts Z420 korrigieren. | TDS HB 5 rapid 03/2022; data/produkte.ts |
| risse | HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" (c26) | Gleicher Kategorienfehler wie neubau-systemwahl. 1,5 N/mm² = Untergrund-Anforderung. | Wert nicht als Produkteigenschaft führen; als Tragbeton-Anforderung ausweisen. data/produkte.ts Z420 mitkorrigieren. | TDS HB 5 rapid; data/produkte.ts |
| beratungstrigger | MICROTOP TW-Reihe "im Trockenspritzverfahren" (c11) | TW-Reihe ist gemischt: TW 02/NSM/NSD/VSM = Nassspritz. Pauschale Trockenspritz-Bindung falsch. | Verfahrenszusatz streichen oder "im Nass- oder Trockenspritzverfahren, je nach Produkt". | TDS TW 02/NSM/NSD; data/produkte.ts |
| lebensmittel | TRU Self-Leveling "voll belastbar nach ca. 24 h" (c2) | TDS: 24 h = Schleif-Zeitpunkt (Hochglanz), nicht Vollbelastbarkeit. Vollfestigkeit erst 28 d. | "begehbar 2-3 h, schleifbar bis Hochglanz nach 24 h"; "voll belastbar" entfernen. data/produkte.ts Z380 mitkorrigieren. | TDS TRU Self-Leveling 10/2022 |
| verkaufsraeume | TRU Self-Leveling "voll belastbar nach ca. 24 h" (c4) | Gleiche Verwechslung Schleif-Zeitpunkt vs. Vollbelastbarkeit. | "schleifbar bis Hochglanz nach 24 h" statt "voll belastbar". | TDS TRU Self-Leveling 10/2022 |
| neubau-sichtboden | GRANIDUR Farbliste 7 Farben (c8) | TDS: nur "zementgrau, weitere Farben auf Anfrage". 7-Farben-Liste ist KCF-Palette, fälschlich kopiert. | Auf "zementgrau, weitere Farben auf Anfrage" zurücknehmen. data/produkte.ts:1453 mitkorrigieren. | TDS GRANIDUR 05/08 06/2023 |
| neubau-sichtboden | KCF Farbliste + KOROCLEAN (c13) | 7-Farben-Liste auch bei KCF nicht TDS-gedeckt (TDS: nur zementgrau). KOROCLEAN-Teil korrekt. | Farbliste streichen; "zementgrau, weitere Farben auf Anfrage". Schleifverschleiß KCF prüfen (TDS A6, nicht A5). | TDS KCF 05/08 06/2023 |
| logistik | MORTAR MIX DUR Sinusfuge "voll belastbar nach ca. 2 h" (c19) | Widerspricht TDS (60 min) und der eigenen Produktliste im selben Artikel (1 h). | Auf "ca. 1 h" angleichen; referenzen.ts (sinusfugen-sanierung) und i18n mitkorrigieren. | TDS MORTAR MIX 04/2024; data/produkte.ts |
| abrieb-verschleiss | Sinusfugen-Sanierung "voll belastbar nach ca. 2 Stunden" (c34) | Gleicher 2h-vs-1h-Fehler; TDS 60 min. 2 h = Belegreife, nicht Belastbarkeit. | Auf "ca. 1 Stunde" korrigieren; alle 5 i18n + logistik.mdx + referenzen.ts. | TDS MORTAR MIX 04/2024 |
| feuchte-whg | "WHG steht für wassergefährdende Stoffe" (c1) | Abkürzung falsch aufgelöst. WHG = Wasserhaushaltsgesetz (Gesetz), nicht die Stoffe. | "Das WHG (Wasserhaushaltsgesetz) regelt mit der AwSV den Umgang mit wassergefährdenden Stoffen." | gesetze-im-internet.de WHG_2009 |

Zusätzliche 🔴 mit geringerer Schwere (mittel), die ebenfalls vor Veröffentlichung zu fixen sind:

| Artikel | Aussage (kurz) | Problem | Korrektur | Quelle |
| :---- | :---- | :---- | :---- | :---- |
| einstreuung-vs-schicht | "laut Norm ausdrücklich nicht vergleichbar" (c7) | Über-Attribuierung an Normtext. DIN 18560-7 erwähnt Einstreuung nicht. KORODUR-Quelle sagt "technisch", nicht "laut Norm ausdrücklich". | "technisch nicht gleichwertig - Einstreuungen sind in DIN 18560-7 nicht geregelt". | DIN 18560-7 Volltext; KORODUR-Doppelseite |
| einstreuung-vs-schicht | "KORODUR Silopumpsystem" (c29) | Produktname existiert nicht. Korrekt: "KORODUR Silosystem". | "Silosystem". | data/produkte.ts; korodur.de |
| betreiber-faq | HE 60 rapid "begehbar und 24 h später voll belastbar" (c3) | Wort "später" ankert 24 h am Begehbar-Zeitpunkt (= 27 h). TDS: beide Zeiten ab Einbau. | "später" streichen: "nach ca. 24 h (jeweils ab Einbau)". | TDS HE 60 rapid 03/2025 |
| absandung-festigkeitsverlust | Strandkorbhalle Sylt "auf KORODUR HB 5" (c23) | produkte-Feld der Referenz nennt "HB 5 rapid". | "HB 5 rapid"; referenzen.ts loesung-Feld vereinheitlichen. | data/referenzen.ts; logistik.mdx |
| abrieb-verschleiss | HE 60 rapid "A6 (≤ 6 cm³/50 cm²)" als Produktwert (c12) | Klasse A6 korrekt, aber TDS-Messwert ist ≤ 5,0. ≤ 6 ist Klassen-Deckel, untertreibt das Produkt. | "A6 nach EN 13813; Schleifverschleiß ≤ 5,0 cm³/50 cm² (Böhme)". data/produkte.ts mitkorrigieren. | TDS HE 60 rapid 03/2025 |
| feuchte-whg | HE 65 Plus "Norm/Klassifizierung DIN 18560-7 (CT-C70-F9-A6)" (c5) | Klassen-String CT-C70-F9-A6 stammt aus DIN EN 13813, nicht DIN 18560-7. | "CT-C70-F9-A6 nach DIN EN 13813; DIN 18560-7 (Verbundestrich)". | data/produkte.ts; classification.json |
| parkdeck | HE 65 Plus "CT-C70-F9-A6 (DIN 18560-7)" (c3) | Gleiche Norm-Verwechslung wie feuchte-whg. | Klassen-String EN 13813 zuordnen, DIN 18560-7 separat als Anwendungsnorm. | data/produkte.ts; TDS HE 65 Plus |
| feuchte-whg | "DIN EN 1015-11 (C55/67)" CEMENT ALL (c18) | EN 1015-11 ist Prüfmethode, keine Klassifizierungsnorm; C55/67 ist EN-206-Format. Klammer suggeriert falsche Zuordnung. | "Druckfestigkeit geprüft nach DIN EN 1015-11; Klasse C55/67 (Herstellerdeklaration)". Quelle data/produkte.ts. | DIN EN 1015-11; normenGlossar.ts |
| feuchte-whg | "EN 1504-3 (C35/45)" DOT Europe (c12) | Klammer mischt EN 1504-3 (R-Klassen) mit EN-206-Betonklasse. R4 laut DoP vorhanden. | Norm und Klasse trennen: "EN 1504-3 (R4); Druckfestigkeitsklasse C35/45 nach EN 206". | DoP DOT Concrete Mix; data/produkte.ts |
| lebensmittel | CEMENT ALL "begehbar nach ca. 15 min, schwundkompensiert" (c6) | 15 min = Erstarrungsbeginn, nicht Begehbarkeit. "schwundkompensiert" falsch (TDS: schwindarm/schwundneutral). | "Erstarrungsbeginn 15 min, belastbar 1 h, schwindarm". data/produkte.ts mitkorrigieren. | TDS CEMENT ALL 10/2022; CTS-Datenblatt |
| industrie-produktion | CEMENT ALL "begehbar nach ca. 15 min" (c20) | Gleicher Erstarrungsbeginn-vs-Begehbarkeit-Fehler. | "Erstarrungsbeginn 15 min" statt "begehbar". data/produkte.ts Z485/499 mitkorrigieren. | TDS CEMENT ALL 10/2022 |
| neubau-sichtboden | KOROMINERAL CURE "erhöht Oberflächenhärte" (c9) | Härte-Claim gehört zum Produkt KOROMINERAL, nicht CURE. CURE-TDS nennt keine Oberflächenhärte. | Härte-Aussage streichen; CURE-Eigenschaften: reduziert eindringendes Wasser/Schmutz/Chemikalien. | TDS KOROMINERAL CURE 10/2023 |
| verkehr-infrastruktur | ASPHALT REPAIR MIX "frost-, tausalzbeständig" (c5) | TDS nennt nur sulfatbeständig + chloridfrei. Frost/Tausalz nicht als Produkteigenschaft ausgewiesen (anders als Schwesterprodukte). | frost-/tausalzbeständig streichen oder durch Frank belegen lassen. data/produkte.ts besonderheiten mitkorrigieren. | TDS ASPHALT REPAIR MIX 09/2024 |
| verkehr-infrastruktur | MORTAR MIX "für Fugen und Profile" (c13) | Adversarial herabgestuft auf unklar: Anwendung durch Projektreferenzen (Lyreco, Bohnenkamp) belegt, aber nicht TDS-wörtlich; "schwundneutral" Hausbegriff vs. TDS "schwindarm". | Keine Streichung nötig; "schwindarm" vereinheitlichen, ggf. auf Fugen-Referenzen stützen. (Siehe 🟡) | data/referenzen.ts; TDS MORTAR MIX |
| verkehr-infrastruktur | "Verkehr zurück in unter einer Stunde" (CEMENT ALL/MORTAR MIX) (c27) | Gilt nur für ASPHALT REPAIR MIX (30 min). CEMENT ALL/MORTAR MIX = ca. 1 h, eher darüber. | "Verkehr nach rund einer Stunde zurück" oder Produkte aufteilen. | TDS-Reihe; data/produkte.ts |

## 4. 🟡 Zu klären mit Frank

| Artikel | Aussage (kurz) | Warum unklar | Empfehlung |
| :---- | :---- | :---- | :---- |
| betreiber-faq | "Vollständiger Neuaufbau nur bei fehlender Tragfähigkeit" (c25) | Adversarial herabgestuft: "nur ... wenn" zu absolut (Höhenzwang/Kontamination), aber VDZ-B19-Anker des Erstbefunds widerlegt. Kein normativer Fehler. | Optional offene Formulierung ("vor allem dann ... daneben auch ..."). Redaktioneller Feinschliff. |
| neubau-sichtboden | GRANIDUR BIANCO/NERO "Gruppen-EPD verfügbar" (c5) | Keine KORODUR-Quelle belegt EPD für dieses Produkt. TDS erwähnt keine EPD. Nur HE 3 green hat Produkt-EPD. | EPD-Dokument/Registriernummer beschaffen oder Aussage streichen. |
| feuchte-whg | DOT Europe "statisch + nicht statisch relevant, EN 1504-3" (c11) | Adversarial bestätigt via DoP (R4, KIWA 0770) - die Erstprüfung war Fehlalarm. Faktisch korrekt. | Kein Handlungsbedarf; R-Klasse R4 ggf. ergänzen. |
| sperrzeit-belastbarkeit | "Alle Werte Datenblatt-Richtwerte bei +20 °C" (c4) | TDS uneinheitlich: NEODUR Level +18 °C, mehrere ohne Referenztemperatur. Pauschale +20 °C nicht haltbar. | "+20 °C" entschärfen oder streichen. |
| sperrzeit-belastbarkeit | ASPHALT REPAIR MIX "DIN EN 1015-11" als Klassifizierung (c5) | EN 1015-11 ist Prüfverfahren, keine Klasse. Spalte ist als TODO(Frank) markiert. | Spalte als TODO klären; Prüfnorm nicht als Klasse ausgeben. |
| sperrzeit-belastbarkeit | NEODUR HE 65 Plus Klasse CT-C70-F9-A6 (c31) | Kein TDS-Volltext im Repo; Wert nur aus produkte.ts; HE 65 Plus polymermodifiziert mit anderer Rezeptur. | Gegen TDS 11/2025 verifizieren (HE-65-Plus-PDF). |
| neubau-sichtboden | TRU PC Festigkeitsverlauf 19/34/48 N/mm² (c17) | Werte aus produkte.ts; TRU-Self-Leveling-TDS nennt abweichend 20/34/45. TRU PC eigene neuere TDS nicht als Volltext im Repo. | TRU-PC-TDS (2024) als Volltext beschaffen, gegenchecken. |
| neubau-sichtboden | TRU SP innen/außen/Nassbereich (c22) | Nur über Schwesterprodukt TRU Self-Leveling belegt, kein TRU-SP-eigenes TDS. | TRU-SP-TDS gegen Eignungsaussage prüfen. |
| flugzeug | Helipad Płock "Haftzug bis 3,0 N/mm²" per Pull-Off (c7) | Wert aus Referenzdaten, kein Mess-/Pull-Off-Protokoll auffindbar. Notion-Felder leer. | Original-Messprotokoll anfordern oder Zahl entschärfen. |
| flugzeug | Fraport "WHG-Beschichtung" im HE-65-Plus-Kontext (c23/feuchte-whg c31) | Fraport sanierte mit Rapid Set CEMENT ALL; WHG-Deckschicht war PU (Fremdprodukt), nicht HE 65 Plus. Nachbarschaft suggeriert HE 65 Plus. | Fraport-Beispiel vom HE-65-Plus-Absatz entkoppeln; PU-Deckschicht als Fremdsystem kennzeichnen. |
| industrie-produktion | MORTAR MIX DUR "voll belastbar nach ca. 1 h" (c19) | Kein eigenes DUR-TDS; 1-h-Wert vom Basisprodukt; Artikel-interner Widerspruch (1 h vs. 2 h). | Bei Frank/Richard verifizieren; Widerspruch auflösen. |
| industrie-produktion | HE 60 rapid "voll belastbar 24 h, chemikalienbeständig" (c5/c29) | TDS sagt "nutzbar 24 h" (nicht "voll belastbar") und "beständig gegen Benzin/Mineralöl/Lösemittel", nicht pauschal "chemikalienbeständig". | "chemikalienbeständig" auf TDS-Umfang einschränken (Treibstoff/Öl/Lösemittel). |
| verkehr-infrastruktur | Rapid Set Schnellbeton Klasse "C40/50" (c18) | TL BEB-StB belegt; C40/50 in keiner Primärquelle (TDS-Link tot). | C40/50 gegen offizielle TDS verifizieren oder durch belegten Festigkeitsverlauf ersetzen. |
| risse | "Risse hundertfach saniert" (c36) | Mengenaussage nicht aus Repo belegbar (ca. 58-62 Referenzen gesamt). Werbeaussagen-Risiko. | Belegen oder auf "vielfach"/"in zahlreichen Projekten" umstellen. |

## 5. Befunde je Artikel

### beratungstrigger (Ratgeber)
Geprüfte Aussagen: 17. todo_frank: 5 (bereits adressiert).
- 🔴 c11 (falsch, mittel): MICROTOP TW-Reihe pauschal "im Trockenspritzverfahren" - TW 02/NSM/NSD/VSM sind Nassspritz. Verfahrenszusatz streichen.
- Übrige geprüfte Aussagen: bestätigt.

### betreiber-faq (Ratgeber)
Geprüfte Aussagen: 29. todo_frank: 4.
- 🔴 c12 (falsch, hoch): "höchste Verschleißklasse A6" - A6 ist Mittelfeld; A1,5 ist die beste Böhme-Klasse.
- 🔴 c13 (falsch, hoch): A6-Klasse fälschlich DIN 18560-7 zugeordnet (korrekt DIN EN 13892-3) plus Superlativ-Fehler.
- 🔴 c3 (falsch, mittel): "24 Stunden später voll belastbar" - Wort "später" ergibt rechnerisch 27 h; TDS meint 24 h ab Einbau.
- 🟡 c25 (unklar, mittel, adversarial herabgestuft): "Neuaufbau nur bei fehlender Tragfähigkeit" zu absolut, aber kein normativer Fehler.
- Übrige bestätigt.

### einstreuung-vs-schicht (Fachbeitrag)
Geprüfte Aussagen: 34. todo_frank: 4.
- 🔴 c14 (falsch, hoch): "ab 10 mm DAfStB-Richtlinie als dicht" - Schreibweise DAfStb falsch, 10-mm-Grenze erfunden (TDS HE 65 Plus: 25,7 mm).
- 🔴 c20 (falsch, hoch): Hartstoffgruppe A "≤ 6,0" - DIN 1100 Tab. 1: A = ≤ 5,0.
- 🔴 c7 (falsch, mittel): "laut Norm ausdrücklich nicht vergleichbar" - Über-Attribuierung an Normtext.
- 🔴 c29 (falsch, mittel): "KORODUR Silopumpsystem" - existiert nicht, korrekt "Silosystem".
- 🟡 c16 (unklar, mittel): CDF-Verfahren korrekt, aber 10-mm-Kopplung nicht normativ belegt.
- 🟡 c31 (unklar, mittel): 10-mm-WHG/Frost-Tausalz-Nachweis im Fazit, gleiche Problematik wie c14.
- 🟡 c17 (unklar, mittel): "kein Frost-Tausalz-Nachweis" Einstreuung - inhaltlich vertretbar, Formulierung präzisieren.
- 🟡 c19 (unklar): Lebensmittel/Ableitfähigkeit-Gleichwertigkeit - KORODUR-Positionierung, nicht extern korroboriert.
- Übrige bestätigt (Norm-Zuordnungen DIN 1100/18560-3/-4/-7, Böhme-Werte M ≤3,0 und KS ≤1,5, Nenndicken A/M/KS korrekt).

### neubau-sichtboden (Neubau)
Geprüfte Aussagen: 30. todo_frank: 8.
- 🔴 c8 (falsch, mittel): GRANIDUR 7-Farben-Liste nicht TDS-gedeckt (nur zementgrau).
- 🔴 c13 (falsch, mittel): KCF 7-Farben-Liste ebenfalls nicht TDS-gedeckt; Schleifverschleiß A6 statt A5 prüfen.
- 🔴 c9 (falsch, mittel): KOROMINERAL CURE "erhöht Oberflächenhärte" - Härte-Claim gehört zu KOROMINERAL, nicht CURE.
- 🟡 c5 (unklar, mittel): GRANIDUR BIANCO/NERO "Gruppen-EPD verfügbar" nicht belegbar.
- 🟡 c17 (unklar): TRU PC Festigkeitsverlauf nicht TDS-bestätigt.
- 🟡 c22 (unklar): TRU SP Eignung nur über Schwesterprodukt belegt.
- c16 (adversarial: bestätigt): TRU PC Schichtdicke 10-35 mm korrekt (Erstprüfung war Fehlalarm, eigenes TRU-PC-TDS belegt 10-35 mm).
- Übrige bestätigt.

### neubau-systemwahl (Neubau)
Geprüfte Aussagen: 25. todo_frank: 4.
- 🔴 c7 (falsch, mittel): HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" - Kategorienfehler (Untergrund-Anforderung).
- 🔴 c25 (falsch, mittel): Bauweise b "höchste Verschleißwerte" - KS/A1,5 auch per Einstreuung erreichbar.
- Übrige bestätigt (Druckfestigkeiten, Klassen, Schichtdicken, DIN 1100 Gruppen A/M/KS, NEODUR-Level-Werte).

### neubau-wirtschaftlichkeit (Neubau)
Geprüfte Aussagen: 15. todo_frank: 5.
- 🔴 c5 (falsch, hoch): "NEODUR HE 65 höchster Verschleißwiderstand A6" - Selbstwiderspruch, A6 nicht höchste Klasse.
- 🔴 c9 (falsch, mittel): "Verschleißgruppen A6 bis KS" - mischt EN-13813-Klasse A6 mit DIN-1100-Gruppe KS.
- Übrige bestätigt.

### sperrzeit-belastbarkeit (Ratgeber)
Geprüfte Aussagen: 44. todo_frank: 5.
- 🔴 c4 (falsch, mittel): "Alle Werte bei +20 °C" - TDS uneinheitlich (NEODUR Level +18 °C).
- 🔴 c5 (falsch, mittel): ASPHALT REPAIR MIX "DIN EN 1015-11" als Klassifizierung - ist Prüfverfahren.
- 🟡 c31 (unklar): HE 65 Plus Klasse nicht TDS-verifizierbar (kein Volltext).
- 🟡 c21 (unklar): TRU Self-Leveling CT-C40-F10 nur app-intern belegt.
- c23 (bestätigt, mit Hinweis): TRU 24 h = Schleif-Zeitpunkt, nicht Vollbelastbarkeit; Spalten-Semantik klären.
- Übrige bestätigt (alle CT-Klassen HE 60/65/65 Plus/40, NEODUR Level CT-C40-F8-AR0,5, Zeiten, TL BEB-StB, Referenzwerte).

### wirtschaftlichkeit-tco (Ratgeber)
Geprüfte Aussagen: 25. todo_frank: 4.
- 🔴 c1/c5 (falsch, hoch): "NEODUR HE 65 höchsten Verschleißwiderstand A6" - Skalen-Fehler.
- Übrige bestätigt (Referenzen Budapest/Monheim/Loosen/Wien/Catania, Produktwerte, EN-Normen).

### flugzeug (Branche)
Geprüfte Aussagen: 13. todo_frank: 6.
- 🔴 c6 (falsch, mittel): CEMENT ALL "begehbar 15 min, schwundkompensiert" - 15 min ist Erstarrungsbeginn; schwundkompensiert falsch.
- 🟡 c7 (unklar): Helipad Płock 3,0 N/mm² Pull-Off nicht durch Protokoll belegt.
- 🟡 c12 (unklar): "Tausalz" auf Vorfeldern - bei echtem Linienflug-Apron Formiate/Acetate statt Streusalz; für Helipads korrekt.
- Übrige bestätigt.

### industrie-produktion (Branche)
Geprüfte Aussagen: 29. todo_frank: 5.
- 🔴 c20 (falsch, mittel): CEMENT ALL "begehbar 15 min" - Erstarrungsbeginn-Fehler.
- 🟡 c5 (unklar): HE 60 rapid "voll belastbar 24 h, chemikalienbeständig" - TDS "nutzbar" und nur Treibstoff/Öl/Lösemittel.
- 🟡 c19 (unklar): MORTAR MIX DUR 1-h-Wert nicht DUR-spezifisch belegt.
- 🟡 c29 (unklar): "chemikalienbeständig" überdehnt im Lebensmittel-Kontext.
- Übrige bestätigt.

### lebensmittel (Branche)
Geprüfte Aussagen: 16. todo_frank: 6.
- 🔴 c2 (falsch, mittel): TRU Self-Leveling "voll belastbar 24 h" - Schleif-Zeitpunkt.
- 🔴 c6 (falsch, mittel): DOT Europe CONCRETE MIX - Werte korrekt (bestätigt), siehe unten.
- 🔴 c8 (falsch, mittel): CEMENT ALL/MORTAR MIX "beständig gegen aggressive Medien" - überdehnt, keine Säurebeständigkeit.
- 🔴 c9 (falsch, mittel): KOROMINERAL CURE "erhöht Oberflächenhärte" - Produktverwechslung mit KOROMINERAL.
- 🟡 c4 (unklar): HE 60 rapid "chemikalienbeständig" nur Treibstoff/Öl/Lösemittel.
- 🟡 c7 (unklar): CEMENT ALL/MORTAR MIX "ASTM C928" nicht in deutschen TDS belegt.
- Übrige bestätigt (DVGW-Zuordnung, TW NSM, Referenzen).

### logistik (Branche)
Geprüfte Aussagen: 21. todo_frank: 5.
- 🔴 c19 (falsch, mittel): Sinusfuge MORTAR MIX DUR "voll belastbar nach ca. 2 h" - widerspricht TDS (1 h) und eigener Produktliste.
- 🟡 c8 (unklar): MORTAR MIX DUR 1-h-Wert nicht DUR-spezifisch belegt, Artikel-Widerspruch.
- Übrige bestätigt (HE-Reihe, Referenzen John Lewis/Strandkorbhalle/DHL, KORODUR Silosystem).

### parkdeck (Branche)
Geprüfte Aussagen: 27. todo_frank: 3.
- 🔴 c3 (falsch, mittel): HE 65 Plus "CT-C70-F9-A6 (DIN 18560-7)" - Klassen-String gehört zu EN 13813.
- 🟡 c8 (unklar): HE 65 Plus "belastbar 7 Tage" nicht TDS-belegt; interner Konflikt 48 h vs. 7 d.
- 🟡 c18 (unklar): CEMENT ALL/MORTAR MIX "frost-/tausalzbeständig" nur als Filter-Tag, nicht TDS-zitiert.
- Übrige bestätigt (alle Schichtdicken, Druckfestigkeiten, ASPHALT REPAIR MIX 30 min, Referenzen Zürich/Freiburg/Metzingen/Barmenia/Saint-Étienne).

### verkaufsraeume (Branche)
Geprüfte Aussagen: 21. todo_frank: 5.
- 🔴 c4 (falsch, mittel): TRU Self-Leveling "voll belastbar 24 h" - Schleif-Zeitpunkt.
- 🟡 c2 (unklar): TRU Self-Leveling CT-C40-F10 nur app-intern, kein TDS-Volltext.
- Übrige bestätigt (TRU PC, GRANIDUR BIANCO/NERO, NEODUR HE 65, Referenzen Nike/Decathlon/LÄHITAPIOLA/Kaiserhof).

### verkehr-infrastruktur (Branche)
Geprüfte Aussagen: 39. todo_frank: 6.
- 🔴 c20 (falsch, hoch): "höchste Verkehrsklasse Erhaltungsbau" - TL BEB-StB definiert keine Verkehrsklassen.
- 🔴 c5 (falsch, mittel): ASPHALT REPAIR MIX "frost-, tausalzbeständig" - nur sulfatbeständig/chloridfrei in TDS.
- 🔴 c27 (falsch, mittel): "Verkehr in unter einer Stunde" gilt nur für ASPHALT REPAIR MIX.
- 🟡 c10 (unklar): MORTAR MIX C45/55 vs. Excel-SoT C44/55 (offener Frank-Punkt).
- 🟡 c13 (unklar, adversarial herabgestuft): MORTAR MIX "Fugen und Profile" durch Referenzen belegt.
- 🟡 c18 (unklar): Rapid Set Schnellbeton C40/50 nicht primärquellen-belegt.
- Übrige bestätigt (EN-1504-3/EN-1015-11/TL-BEB-StB-Werte, Referenzen Wien/Brummer/Catania/Darmstadt/Nittenau).

### abrieb-verschleiss (Schadensbild)
Geprüfte Aussagen: 38. todo_frank: 5.
- 🔴 c3 (falsch, hoch): "Gruppe A ≤ 6 bzw. ≤ 5" - vermischt DIN 1100 mit EN 13813.
- 🔴 c12 (falsch, mittel): HE 60 rapid "A6 (≤ 6)" - TDS-Messwert ≤ 5,0.
- 🔴 c34 (falsch, mittel): Sinusfugen "voll belastbar 2 h" - TDS 1 h.
- 🟡 c8 (unklar): HE 65 "höchste Verschleißfestigkeit" Superlativ neben A6-Wert inkonsistent.
- 🟡 c9 (unklar): HE 65 Plus A6 nicht TDS-verifizierbar; SVS-3-Variante A3.
- 🟡 c17 (unklar): MORTAR MIX DUR 1-h/2-h-Widerspruch.
- 🟡 c36 (unklar): "TDS ausschreibungsfähig" - für Diamantbeton/WH-metallisch/HE 3 kein TDS-Volltext.
- Übrige bestätigt (DIN-1100-Gruppen, Böhme-Definitionen, Referenzen Kleemann/WEAG/Sylt/Antolin/Neutraubling/Ibbenbüren).

### absandung-festigkeitsverlust (Schadensbild)
Geprüfte Aussagen: 26. todo_frank: 5.
- 🔴 c23 (falsch, mittel): Strandkorbhalle Sylt "auf KORODUR HB 5" - Referenz produkte-Feld nennt "HB 5 rapid".
- 🟡 c6 (unklar): KOROMINERAL Li+ nicht gegen Li+-eigenes TDS prüfbar.
- 🟡 c12 (unklar): HE 65 "7 d" nicht TDS-belegt; 48-h-vs-7-d-Konflikt.
- 🟡 c17 (unklar): DIN 18560-7 statt -3 für "kraftschlüssigen Verbund" (Verbundestrich = Teil 3).
- Übrige bestätigt (KOROPOX, KOROMINERAL, HE-Klassen, Referenzen).

### chemischer-angriff (Schadensbild)
Geprüfte Aussagen: 25. todo_frank: 5.
- 🟡 c6 (unklar): "Öle und Treibstoffe greifen chemisch an" - Mineralöle/Treibstoffe wirken physikalisch, nicht lösend. Mechanismen trennen.
- 🟡 c11 (unklar): CUR-Empfehlung 63 ist Prüfverfahren; Anforderungsnorm ist CUR 65. Im Original-Projekt klären.
- Übrige bestätigt (Säureangriff-Mechanismus, WHG/AwSV, DOT/CEMENT-ALL-Werte, Referenzen Arnheim/Nakło/Burgdorf).

### feuchte-whg (Schadensbild)
Geprüfte Aussagen: 36. todo_frank: 6.
- 🔴 c1 (falsch, hoch): "WHG = wassergefährdende Stoffe" - falsch aufgelöst (= Wasserhaushaltsgesetz).
- 🔴 c5 (falsch, mittel): HE 65 Plus Klassen-String DIN 18560-7 statt EN 13813.
- 🔴 c12 (falsch, mittel): "EN 1504-3 (C35/45)" - Norm/Klasse vermischt.
- 🔴 c18 (falsch, mittel): "DIN EN 1015-11 (C55/67)" - Prüfmethode als Klassifizierung.
- 🟡 c7 (unklar): HE 65 Plus Schichtdicke nur app-intern (Zirkelbezug).
- 🟡 c8 (unklar): HE 65 Plus "7 Tage" nicht TDS-belegt; 48-h-vs-7-d-Konflikt.
- 🟡 c11 (unklar, adversarial bestätigt): DOT Europe EN 1504-3 R4 via DoP belegt - Erstprüfung Fehlalarm.
- c24 (bestätigt): MORTAR MIX "DIN EN 1015-11 (C45/55)" - TDS-konform.
- Übrige bestätigt (DVGW W 270/300/347, Referenzen Fraport/Naturex/Haidberg/Bad Nauheim/Budapest).

### schadensbilder-index (Schadensbild)
Geprüfte Aussagen: 17. todo_frank: 5.
- 🟡 c6 (unklar): "Öle und Treibstoffe greifen chemisch an" - Mechanismen trennen (gleicher Punkt wie chemischer-angriff c6).
- 🔴 c12 (falsch, mittel): "Oberfläche hat ihre Tragfähigkeit verloren" - adversarial herabgestuft auf bestätigt (im Bauchemie-/Beschichtungs-Register ist "nicht tragfähige Oberschicht" etabliert). Optionale Präzisierung "Oberflächenfestigkeit".
- Übrige bestätigt (Risse-Genese, WHG/AwSV, Lösungsfinder-Funktion, Referenzen LKW-Waschstraße/Płock).

Hinweis: Bei schadensbilder-index c12 setzte die Adversarial-Prüfung das Endurteil auf "bestätigt" (Fehlalarm der Erstprüfung). Zählt daher als ✅ mit optionaler Präzisierung.

### risse (Schadensbild)
Geprüfte Aussagen: 37. todo_frank: 7.
- 🔴 c26 (falsch, mittel): HB 5 rapid "Haftzugfestigkeit ≥ 1,5 N/mm²" - Kategorienfehler (Untergrund-Anforderung).
- 🟡 c36 (unklar): "Risse hundertfach saniert" - Mengenaussage nicht belegbar.
- Übrige bestätigt (alle HE-Klassen/Werte, KOROCRETE, Referenzen Kleemann/Płock).

## 6. Notion-Wissenskandidaten

Folgende ✅ bestätigte normative Fakten (Konfidenz hoch/mittel) sollten nach Franks Freigabe als Wissen in Notion festgehalten werden. Sie sind googelbar verifiziert und mehrfach wiederverwendbar:

1. DIN 18560-7 = "Estriche im Bauwesen - Teil 7: Hochbeanspruchbare Estriche (Industrieestriche)", gültig (Ausgabe 2004-04), deckt zementgebundene Hartstoffestriche. (baunormenlexikon.de, dinmedia.de)
2. DIN 1100 definiert Hartstoffgruppen A/M/KS; Böhme-Schleifverschleiß-Grenzwerte: A ≤ 5,0, M ≤ 3,0, KS ≤ 1,5 cm³/50 cm². Achtung: NICHT A ≤ 6,0. (MPVA/Der Bausachverständige 1/2019)
3. Böhme-Verschleißklassen nach DIN EN 13813/13892-3: A22/A15/A12/A9/A6/A3/A1,5. Zahl = Abriebvolumen in cm³/50 cm², kleiner = besser. A1,5 ist die höchste/beste Klasse, A6 ist Mittelfeld. (betontechnische-daten.de, baunetzwissen.de)
4. Norm-Trennung: CT-Cxx-Fxx-Axx-Klassifizierung stammt aus DIN EN 13813 (Prüfung Druck/Biegezug nach EN 13892-2, Böhme nach EN 13892-3). DIN 18560-7 ist die Anwendungs-/Ausführungsnorm, vergibt die Klasse nicht. (DIN-18560-7-Scope; produkte.ts)
5. DIN EN 1015-11 ist ein Prüfverfahren (Biegezug-/Druckfestigkeit von Festmörtel), KEINE Klassifizierungsnorm. (dinmedia.de; normenGlossar.ts)
6. DVGW-Arbeitsblätter im Trinkwasserbereich: W 270 (Mikroorganismen-Vermehrung), W 300 (Trinkwasserbehälter, Blattreihe W 300-1 bis -5), W 347 (zementgebundene Werkstoffe, Fassung 11/2023). (shop.wvgw.de; dvgw.de)
7. WHG = Wasserhaushaltsgesetz (Gesetz zur Ordnung des Wasserhaushalts); regelt mit der AwSV den Umgang mit wassergefährdenden Stoffen. WHG-Flächen erfordern Flüssigkeitsundurchlässigkeit (§ 18 AwSV, § 62 WHG). (gesetze-im-internet.de)
8. WHG-Dichtheit (DAfStb-Richtlinie BUmwS, korrekte Schreibweise DAfStb) wird über Eindringtiefe e72 (72 h Beaufschlagung) und FD-/FDE-Beton nachgewiesen, NICHT über eine pauschale Mindestschichtdicke. NEODUR HE 65 Plus erfüllt die flüssigkeitsdichte Schicht bei 25,7 mm. (TDS HE 65 Plus 11/2025; betontechnische-daten.de)
9. TL BEB-StB (FGSV 895, Ausgabe 2015) = "Technische Lieferbedingungen für Baustoffe und Baustoffgemische für die bauliche Erhaltung von Verkehrsflächenbefestigungen". Material-Lieferbedingung, definiert KEINE Verkehrs-/Belastungsklassen (die regelt RStO 12, höchste Bk100). (fgsv-verlag.de)
10. Hartstoffeinstreuung wird normativ über DIN 18560-3 (Verbundestriche) und -4 (Estriche auf Trennschicht) als Oberflächenvergütung geregelt, mit Hartstoffen nach DIN 1100; sie ist nicht mit der Hartstoffschicht nach DIN 18560-7 vergleichbar (technisch, Folge der Regelungslücke). (DIN 18560-3 Volltext; baukobox.de)
11. NEODUR HE 65 Plus: WHG-tauglich für flüssigkeitsdichte Beschichtungen nach WHG, frost-/tausalzbeständig (DIN CEN/TS 12390-9), ohne separate Haftbrücke (aus gleichem Material angeschlämmt). (TDS HE 65 Plus 11/2025)
12. Pull-Off-Test (Abreißprüfung) nach DIN EN 1542 ist das anerkannte Verfahren zur Haftzug-/Oberflächenzugfestigkeit; für Estrich im Verbund zusätzlich EN 13892-8. (DIN EN 1542)
13. ASPHALT REPAIR MIX: Verkehrsfreigabe nach ca. 30 min, Schichtdicke 30-600 mm, Druckfestigkeit 28 d ca. 38 N/mm², sulfatbeständig/chloridfrei (Frost/Tausalz NICHT als Produkteigenschaft im TDS). (TDS 09/2024)
14. CEMENT ALL: Erstarrungsbeginn ca. 15 min (nicht "begehbar"), belastbar nach ca. 60 min, 28 d > 62 N/mm², schwindarm/schwundneutral (nicht "schwundkompensiert"). (TDS 10/2022; CTS-Datenblatt)

Anzahl Notion-Wissenskandidaten: 14.

---
# Vierklang-Konsolidierung: Industrieboden (Kerngeschäft)
**Quellen:** Vorschlagsliste · Scrape #344 · Broschüre #349 · Wettbewerber #345 · Repo-MDX · produkte.ts · **Issue #346**
**CLEAN:** jede Aussage quellen-belegt · Konflikte ausgewiesen (nicht gemergt) · Empfehlungen, keine Entscheidungen · Mensch-Checkpoint.

**Quellen-Präzedenz (bei Konflikt):** Broschüre 2023 #349 > Alt-Website-Scrape #344. Final autoritativ bleiben TDS / `data/produkte.ts` / Notion / Frank-Sign-off. Dieses Dokument SCHLÄGT VOR.

**Status-Legende:** bauen-bereit · quelle-noetig · frank-noetig · neu · streichen/zusammenlegen

---

## A. Content-Pieces (belegt)

Die Vorschlagsliste §2 Industrieboden führt 17 Pieces (Bereichsabsätze + Ratgeber). Belege je Piece unten. Quell-Kürzel: **BR** = Broschüre #349 (autoritativ), **SC** = Scrape #344, **PT** = `data/produkte.ts`, **VL** = Vorschlagsliste, **MDX** = vorhandener Repo-Entwurf, **WB** = Wettbewerber #345.

| Piece | Status-Vorschlag | Quell-Belege (Datei › Abschnitt: Fakt) | Konflikte | Lücke (Frank/TDS) | Empfehlung |
|---|---|---|---|---|---|
| Bereichseinstieg Industrieboden: Hartstoff-Kompetenz seit 1936 | bauen-bereit | BR S2: „über 750 Mio. m² KORODUR Industrieböden weltweit". BR S4 Rückseite: „MADE IN GERMANY seit 1936", „Über 750 Mio. m² – die beste Referenz". SC 00 › 1-industrieboden: Prosa „weltweit der Begriff für Industrieböden … Über 750 Mio. m² sind die beste Referenz". PT: neodur-he-65 / neodur-he-3 / korodur-fscem existieren als IDs. | „1936" steht in BR (Stempel), „seit 1936" im MDX neubau-systemwahl als Marken-Fakt offen (todo_frank). 750 Mio. m² = BR + SC konsistent. | Heritage-Formulierung „seit 1936, 750 Mio. m²" als Marken-Fakt durch Frank/Marketing sign-offen (vgl. neubau-systemwahl todo_frank). | bauen-bereit (Heritage-Satz Frank-gegenzeichnen) |
| Bauweisen im Überblick: Einstreuung, Schicht, Schnellestrich, selbstverlaufend | bauen-bereit | BR S1 „Verarbeitung auf einen Blick" (7 Verfahren: Hartstoffschicht frisch/Verbund, Einstreuung, Dünnestrich, Schnellreparaturmörtel, Schnellbeton, Schnellestrich). BR S3 = 6 Systeme (Hartstoffestrich, kunststoffmod., Einstreuung, Schnellestrich, FSCem, NEODUR Level). SC 00 › 1-industrieboden Navigation: Hartstoffschicht / Einstreuung / Schnellestrich-Systeme / Selbstverlaufende Systeme. PT Produktgruppen: hartstoffestriche, hartstoffeinstreuung, schnellestrich, selbstverlaufend. | BR nennt 6 Systeme / 7 Verfahren, Vorschlagsliste-Titel nur 4 Bauweisen — Granularität klären (4 vs. 6). | — | bauen-bereit (BR S1/S3 = direkte Belegquelle für die Bauweisen-Matrix) |
| Neubau oder Sanierung? Zwei Wege in den Industrieboden | bauen-bereit | SC ind-1 › industriebodensanierung: „bietet KORODUR verschiedene Lösungen für die Sanierung … System KORODUR-KOROTAN, System NEODUR HE 60 rapid, System NEODUR Level". PT: neodur-he-60-rapid (`inSanierungsMatrix: true`), korodur-hb-5-rapid, korocrete (Ref via VL). | HE-60-rapid-Sperrzeit-Konflikt (siehe Piece „Sperrzeit"). | — | bauen-bereit |
| Industrieboden im Neubau: das passende System wählen | bauen-bereit | MDX neubau-systemwahl (Status entwurf, Quellen produkte.ts/referenzen.ts). BR S3 (Systemmatrix) + BR S4 (Schicht vs. Einstreuung) als Faktenfundament. | — | MDX todo_frank: (1) **es fehlt eine Schwerlast-Neubau-Referenz** (alle 3 Neubau-Tags sind Sicht-/Designböden) → Vertrieb/Archiv; (2) Nutzungsdauer-Jahre nicht in Daten belegt; (3) Heritage-Sign-off. | frank-noetig (Referenz-Lücke + Nutzungsdauer-Beleg blockieren Live) |
| Hartstoffeinstreuung oder Hartstoffschicht? Der technische Vergleich | bauen-bereit | MDX einstreuung-vs-schicht (entwurf). **BR S4 = autoritative 8-Kriterien-Tabelle** (Schlagbeanspruchung, Penetration/DAfStb-WHG, Frost-/Tausalz CDF, farbige Böden, Schleifverschleiß, Druckfestigkeit ≥70 N/mm², Ebenheit, Stahlfaser). BR S4 Fließtext: „Einstreuung bis max. 1-2 mm … Hartstoffschicht 10–15 mm technisch überlegen". SC ind-1 › hartstoffeinstreuung: „nach DIN 18560-3/-4 … mit Hartstoffschicht gem. DIN 18560-7 nicht vergleichbar". | MDX todo_frank: „Dauerhaftigkeit Einstreuung ca. 10 %" stammt aus interner Doppelseite 02/2024 — **BR S4 belegt qualitativ („begrenzt dauerhaft"), aber NICHT die 10-%-Zahl**. Zahl bleibt unbelegt/intern. | Frank: 10-%-Kennzahl für Web freigeben; Mindest-Einstreumenge 3–5 / 6–8 kg/m² bestätigen (BR S3 belegt diese Mengen jetzt! siehe Konflikt-Anmerkung). | bauen-bereit (BR S4 hebt Beleglage massiv — White-Space Nr. 1 #345) |
| Normen und Klassen: EN 13813, Böhme und DIN 18560-7 | bauen-bereit | MDX neubau-normen-klassen (entwurf). **BR S2 = autoritativer Normblock:** DIN 1100 Gruppen A ≤6 / M ≤3 / KS ≤1,5 cm³/50 cm²; DIN 18560-7 Tab. 1 (Beanspruchung I/II/III) + Tab. 6 (Nenndicke A/M/KS × I/II/III = 15/8/6 · 10/6/5 · 8/6/4); DIN EN 13813 Materialnorm. SC ind-1 › hartstoffschicht: DIN 18560-7, DIN 1100, DIN EN 13318 bestätigt. | — | MDX todo_frank: EN-13813-Entschlüsselungstabelle (CT/C/F/A/AR) und KS-Bedeutung für Web bestätigen (Normstandard, aber im Repo nur über Produktklassen belegt). | bauen-bereit (BR S2 ist die fehlende autoritative Quelle — Featured-Snippet-Kandidat) |
| So entsteht ein KORODUR Industrieboden: Verfahren und Ablauf | bauen-bereit | MDX neubau-industrieboden-ablauf (entwurf, lt. VL §4). BR S1 7-Verfahren + BR S3 Fotoleiste (Betoneinbau, Zwischennachbehandlung KOROCURE, Beschichtungszeitpunkt, Konsistenz, Applikation Hartstoffschicht, Einstreuwagen, Verlegung auf HB 5 mit HE 65, Reiben Tellerglätter). BR S4 Fuß-Bildleiste: Silosystem, NEODUR Level Applikation. SC ind-6 (Silosystem — nicht in diesem Shard gelesen). | Silosystem-Tagesleistung: SC-Flag (README B) **1.000–1.500 m² vs. 1.000–2.000 m²** — beide im Scrape, nicht in BR. | Frank/TDS: Silosystem-Tagesleistung final. | bauen-bereit (Ablauf), Tagesleistung-Wert frank-noetig |
| Oberflächenschutz und Nachbehandlung richtig vergüten | bauen-bereit | MDX neubau-oberflaechenschutz-nachbehandlung (entwurf). BR S3 Nachbehandlungs-Spalten: Zwischennachbeh. KOROCURE, Nachbeh. KOROTEX/KOROMINERAL CURE, Silikatisierung KOROMINERAL Li+, EP-Imprägnierung KOROPOXY, KOROCLEAN. SC ind-1 › bauchemische-produkte: KOROTEX ~150 g/m², KOROCURE ~120 g/m², KOROMINERAL 100–200 g/m², KOROMINERAL Li+ 40–100 g/m², KOROMINERAL Cure 60–100 ml/m². | **KOROPOX vs. KOROPOXY:** BR S3 schreibt „KOROPOXY", SC ind-1 „KOROPOX". MEMORY (relaunch-geklaerte-entscheidungen): KOROPOX wurde eingestellt → „LI Plus". Welche Bezeichnung gilt? VL nennt koromineral-li / korocure / korodur-easyfinish. | Frank/TDS: KOROPOX(Y)-Status (eingestellt? → KOROMINERAL Li+); Verbrauchswerte-Flag SC README D (easyFinish kg/m³, nanoFinish cm³, uniPrimer g/m³). | bauen-bereit (Auswahllogik Curing/Verfestigung/Imprägnierung), Produktnamen frank-noetig |
| Warum sich ein hochwertiger Industrieboden im Neubau rechnet | quelle-noetig | MDX neubau-wirtschaftlichkeit + wirtschaftlichkeit-tco (entwurf). SC 00 › 1-industrieboden „Nachhaltiges Bauen": „Lebensdauer eines Hartstoffindustriebodens um ein Vielfaches höher als reiner Betonboden … Lebenszykluskosten". SC 00 › 1-industrieboden Prosa: „härteste/widerstandsfähigste Industrieboden ist langfristig immer die wirtschaftlichste Lösung". HE-3-green CO₂: BR Cover „NEODUR HE 3 green", SC ind-1 „bis zu 30 % CO₂ reduziert" = PT neodur-he-3-green „bis zu 30 %". | — | TCO-Zahlen (Lebensdauer-Jahre, Stillstandskosten €) nirgends belegt → Vertrieb/Marketing. Nur qualitative Aussagen in den Quellen. | quelle-noetig (Lebensdauer-/Kostenzahlen fehlen) |
| Sichtboden und Designboden im Neubau | bauen-bereit | MDX neubau-sichtboden (erweitern). SC 00 › 2-sichtestrich: COPETTI FLOOR (geglättet, wolkig), GRANIDUR (geschliffen, Granit/Terrazzo), TRUazzo (selbstverlaufend, schleifbar, Rapid Set). PT tru-self-leveling: CT-C40-F10, schleifbar bis Hochglanz nach 24 h, `sichtestrich: true`. | Sichtboden ist seit #331 unter Industrieboden (VL-Hinweis) — Bereichszuordnung geklärt. | KCF / granidur Klassen-/Refdeckung gegen Sichtestrich-Shard (nicht in diesem Bereich gelesen). | bauen-bereit (Dekorativer Zweig) |
| Untergrund in der Bodensanierung: Arten, Prüfen, Vorbereiten (Pillar) | frank-noetig | VL §3 (Hoch-Lücke). WB #345 Cluster 1/2/3: Untergrundarten n=7, CM-Messung n=11, mech. Vorbereiten n=8, Bodenausgleich n=8 — Pflicht-Fundament. Briefing liegt vor (`content/Briefing_SEO-Content_Untergrund_Bodensanierung.md`). SC: keine eigene Untergrund-Pillar-Quelle; PT korodur-hb-5 / korodur-pc / korodur-uniprimer als Begleitprodukte. | — | **Komplett neu aus Bestandswebsite + Briefing.** Frank: Prüf-Richtwerte (Haftzug, Restfeuchte-Grenzen, Rautiefe) sind im Repo NICHT belegt. | quelle-noetig + frank-noetig (Pillar fehlt ganz, nur Briefing) |
| Estricharten nach EN 13813 verstehen: CT, CA, MA, AS, SR | quelle-noetig | VL §3 (Lücke). WB #345 Cluster 1: „Estricharten und Bindemittelsysteme CT/CA/MA/AS/SR" n=7, EN 13813 / DIN 18560 — Featured-Snippet-Tabelle. BR S2 DIN EN 13813 = Materialnorm (belegt CT). PT: nur CT-Produkte (KORODUR ist zementär), CA/MA/AS/SR sind **kein** KORODUR-Portfolio. | KORODUR führt nur CT → Artikel erklärt fremde Estrichtypen (CA/MA/AS/SR) ohne eigenes Produkt. Inhaltlich korrekt, aber Produkt-Pflicht (2-3 Produkte) nur für CT erfüllbar. | Frank: didaktische Tiefe CA/MA/AS/SR vs. CT-Fokus festlegen. | quelle-noetig (SEO-Cluster, Produkte nur für CT) |
| Untergrund prüfen: Haftzug, Druckfestigkeit, Restfeuchte messen | quelle-noetig | VL §3 (Lücke). WB #345 Cluster 2: CM-Messung n=11 (DIN 18560/TKB-8), Prüfmethoden-Kanon n=6 (VOB-C/DIN 18365), Haftzug n=6 (DIN EN ISO 4624), Ebenheit n=4 (DIN 18202). PT korodur-hb-5-rapid: „Oberflächenzugfestigkeit ≥ 1,5 N/mm²", korodur-pc „Haftzug ≥ 1,0 N/mm²". | — | Frank/TDS: Mess-Richtwerte je Verfahren (Grenzwerte) sind nicht belegt — Norm-/Briefing-Quelle. | quelle-noetig + frank-noetig |
| Untergrund vorbereiten: Fräsen, Kugelstrahlen, Schleifen im Vergleich | quelle-noetig | VL §3 (Lücke). WB #345 Cluster 3: mech. Vorbereiten n=8 (DIN 18365/18356). PT neodur-he-60-rapid Verarbeitung: „Kugelstrahlen oder Fräsen empfohlen"; neodur-level „Kugelstrahlen empfohlen". SC ind-1 hartstoffschicht: Verbund-Verfahren KOROTAN auf erhärteten Tragbeton. | — | Frank: Rautiefe-Logik / Verfahren×Eignung-Tabelle nicht in Quellen belegt. | quelle-noetig |
| Sperrzeit und Wiederinbetriebnahme: Wie lange steht meine Fläche? | frank-noetig | MDX sperrzeit-belastbarkeit (entwurf). PT neodur-he-60-rapid: „begehbar ca. 3 h / voll belastbar ca. 24 h". PT neodur-level „leicht 24 h / voll 3 d". PT tru-self-leveling „begehbar 2–3 h". | **KONFLIKT HE 60 rapid (3-fach):** SC schnellestrich-systeme „belastbar nach 48 h" vs. SC industriebodensanierung „3 h begehbar / 24 h nutzbar" vs. PT „begehbar 3 h / belastbar 24 h". MDX-todo_frank ergänzt: Referenzen Antolin/Kleemann nennen **48 h** Wiederinbetriebnahme. **KOROCRETE:** PT „wenige h (rezepturabhängig)" vs. anwendungsmatrix.ts „8 h". | Frank (MDX-todo): Welcher HE-60-rapid-Wert ist das Versprechen? Stufen begehbar/belastbar/voll definieren; KOROCRETE-Wert; fehlende „begehbar"-Zellen für HE 65/65 Plus/40. | frank-noetig (zentraler Sperrzeit-Konflikt blockiert die Tabelle) |
| Häufige Fragen zur Industriebodensanierung (Betreiber-FAQ) | bauen-bereit | MDX betreiber-faq (entwurf). Speist sich aus den anderen Pieces (Sperrzeit, Schadensbilder, Wirtschaftlichkeit). FAQ-Schema-Kandidat. | Erbt HE-60-rapid-Sperrzeit-Konflikt. | abhängig von Sperrzeit-Klärung. | bauen-bereit (niedrig, nach Sperrzeit-Klärung) |
| Bereichsseite Industrieboden: Wirtschaftlichkeits-Absatz | quelle-noetig | VL (neu). Wie „Warum sich … rechnet": SC 00 Nachhaltiges Bauen + Lebenszykluskosten. | — | Stillstand-/Lebensdauer-Zahlen fehlen (s. o.). | quelle-noetig |
| Branchenlösungen im Überblick (Absatz + Sektor-Kacheln) | bauen-bereit | VL (luecke). BR S2 Branchen-Liste (16 Branchen: Industriehallen, Distributionszentren, Hochregallager, Werkstätten, Schwerindustrie, Parkhäuser, Kühlhäuser, Hangars, Rampen, Bahnsteige, Museen, Verkaufsflächen …) + BR S2 Bildraster (21 Anwendungen: Stahlindustrie, Caterpillar, Airbus, Amazon, Daimler Logistik …). 7 Branchen-MDX existieren (VL §4). | — | — | bauen-bereit (BR S2 liefert die komplette Branchenliste als Beleg) |

> **Sub-Seiten-Absätze (VL-Hinweis Z. 38):** Bauweisen-Absatz (neodur-he-3, neodur-he-65, tru-self-leveling) + Heritage-Absatz (Refs airbus-a-380, caterpillar-abu-dhabi) — durch BR S1/S2/S3 + S4-Rückseite vollständig belegt. bauen-bereit.

---

## B. Neue Pieces aus den Quellen (Vorschlag)

Themen, die BR/SC/WB liefern und die NICHT (oder nur als Lücke ohne eigenes Piece) in der Vorschlagsliste stehen. Vorschlag, kein Beschluss.

1. **Normen-Pillar „Industrieboden-Normen" als eigene Snippet-Strecke** — BR S2 liefert komplette, autoritative Normtabellen (DIN 1100 Gruppen, DIN 18560-7 Tab. 1 + Tab. 6 Nenndicken, EN 13813). Die Vorschlagsliste hat „Normen und Klassen" (1 Ratgeber); BR-Tiefe rechtfertigt zusätzlich **eine eigene Featured-Snippet-Tabellenseite je Norm** (DIN-18560-7-Beanspruchungsgruppen I/II/III, Nenndicken-Matrix). Höchster Hebel (WB #345 White-Space Nr. 1). Quelle vollständig: BR S2.

2. **Performance-/Verschleiß-Vergleichsgrafik (Beton → A → M → KS)** — BR S2 Performance-Diagramm „Widerstandsfähigkeit gegen Verschleiß" mit Hartstoff-Beispielen (KORODUR 0/4, VS 0/5 → A; WH-metallisch → M; Diamantbeton → KS). Direkt als Web-Grafik/Tabelle übernehmbar. Stützt „Einstreuung vs. Schicht" und „Abrieb/Verschleiß"-Schadensbild. Quelle: BR S2.

3. **System-Auswahltabelle „6 Systeme im Vergleich" (Bauweisen-Matrix)** — BR S3 Produktmatrix liefert je System CT-Klasse, Hartstoffgruppe, Schichtdicke, Verbrauch, Verarbeitung, Nachbehandlung. Die Vorschlagsliste hat „Bauweisen im Überblick" als Bereichsabsatz; BR S3 rechtfertigt zusätzlich eine **datenreiche Auswahltabelle** (Snippet-fähig). Quelle: BR S3 (Spaltenzuordnung-Flag beachten).

4. **Mindest-Einstreumengen je Hartstoffgruppe** — BR S3 System 3 belegt jetzt autoritativ: Einstreuung 3–5 kg/m² (Gruppe A/KS), **6–8 kg/m² (Gruppe M)**. Das deckt exakt die offene MDX-todo_frank-Frage aus einstreuung-vs-schicht. → Als belegter Fakt in den Einstreuung-Artikel übernehmen (löst eine Lücke). Quelle: BR S3.

5. **Glossar / Fachbegriff-Lexikon (CT/C/F/A/AR, Böhme, Schleifverschleiß)** — WB #345 Cluster 9 (n=2) + echte-Lücke-Liste §E. Günstig aus BR S2 + Produktklassen ableitbar; löst zugleich die EN-13813-Entschlüsselungs-todo_frank aus neubau-normen-klassen. Vorschlag, niedrig.

6. **Fugentechnik im Industrieboden (Schein-/Bewegungs-/Sinus-/Trennfugen)** — VL §3 Mittel-Lücke + WB #345 Cluster 4 „Bewegungs-/Dehnfugen planen" n=6 (DIN 18560), in §E als „unterpriorisiert" markiert. Kein eigenes Piece in §2 Industrieboden. Refs in VL §3: sinusfugen-sanierung, trennfugen-bohnenkamp, fugensanierung-lyreco. Quelle: WB + Refs; Fachinhalt frank-noetig.

7. **KORODUR-KOROTAN-Verbundsystem als eigener Sanierungs-Bauweg** — SC ind-1 industriebodensanierung belegt das KOROTAN-System (15 mm Nenndicke, HB 5, weitgehend fugenlos) als eines von 3 Sanierungssystemen. In §2 nicht als eigenes Piece. Relevant für „Neubau oder Sanierung?" und Sub-Seite Sanierung. Quelle: SC ind-1. (Hinweis MEMORY: System KORODUR-KOROTAN bleibt im Portfolio.)

8. **Hartstoff für Kunstharze (DUROP / ROBUST)** — SC ind-1 hartstoff-fuer-kunstharze: DUROP-Körnungen 0,5–5 mm, Mohs 8; „1,5 Mio. m² Autobahn als DUROP-Dünnbeschichtung", Griffigkeit/Lärmschutz. Bereichs-Unterseite im Scrape, kein Piece in §2. Berührt Infrastruktur/Parkdeck (DUROP ist dort Leitprodukt). Quelle: SC ind-1.

---

## C. Konflikte in diesem Bereich (Quellen gegenübergestellt)

**Nicht gemergt — Mensch/Frank entscheidet. Präzedenz: BR > SC; final TDS/produkte.ts/Notion.**

1. **NEODUR HE 60 rapid — Wiederinbetriebnahme (3-fach + Referenzwiderspruch)**
   - SC #344 schnellestrich-systeme: „Belastbar bereits nach **48 Stunden**!"
   - SC #344 industriebodensanierung: „nach **3 Stunden begehbar und nach 24 Stunden nutzbar**"
   - PT produkte.ts: `belastbarNach: "24 h"`, `belastbarNachZusatz: "begehbar ca. 3 h"`
   - BR #349 S3 System 4: keine Zeitangabe (nur „schnellerhärtend · schnell belastbar")
   - MDX sperrzeit-belastbarkeit todo_frank: Referenzen **Antolin/Kleemann nennen 48 h**.
   - → Frank: Datenblatt-Versprechen (24 h?) vs. Projektrealität (48 h) klären; Abhängigkeit Schichtdicke/Temperatur formulieren.

2. **KORODUR-Hartstoffe (ohne Bindemittel) — CT-Klasse: SC/PT vs. BR**
   - **VS 0/5:** SC ind-1 + PT = `CT-C70-F10-A6`. BR S3 nennt für den Hartstoff selbst keine eigene CT, sondern die Estrich-Mischung (0/4 + VS 0/5 → HE 65 = CT-C70-F9-**A6**). F10 (SC/PT) vs. F9 (BR-Estrich) — verschiedene Bezugsgrößen (Hartstoff allein vs. Estrich), KEIN stiller Merge.
   - **WH-metallisch:** SC ind-1 + PT = `CT-C60-F12-A3`. BR S2 nennt WH-metallisch als Gruppe M; BR S3 „WH-metallisch → HE 65 metallisch = `CT-C80-F11-A3`". → Hartstoff-Klasse (C60-F12) vs. Estrich-Klasse (C80-F11) unterschiedlich. Beide stehen, nicht harmonisieren.
   - **Diamantbeton:** SC ind-1 + PT = `CT-C70-F10-A1,5`. BR S3 „Diamantbeton → HE 65 SVS 1,5 = `CT-C70-F9-A1,5`". F10 vs. F9 wie oben.
   - → Frank/TDS: Klären, ob die Web-Tabelle Hartstoff-Klasse (ohne Bindemittel) ODER Estrich-Klasse (mit Bindemittel) zeigt. BR ist autoritativ für die **Estrich**-Werte (mit Bindemittel); SC/PT halten die **Hartstoff**-Werte. Beide Sets sind fachlich verschieden, nicht widersprüchlich — aber die Vorschlagslisten-Produkte (korodur-diamantbeton, korodur-wh-metallisch) tragen die F10-Hartstoffwerte.

3. **NEODUR Level — Klassifizierung vs. Druckfestigkeit**
   - PT + SC (Fließtext) + BR S3: `CT-C40-F8-AR0,5`.
   - SC ind-3 Kennwert-Tabelle: Druckfestigkeit `≥ 35 N/mm²` (= unter C40-Schwelle 40 N/mm²).
   - PT technischeDaten: Druckfestigkeit `≥ 40 N/mm²` (passt zu C40).
   - → SC-Flag (README B). Frank/TDS: 35 vs. 40 N/mm². produkte.ts hält 40 (C40-konform); Scrape-Tabelle 35.

4. **NEODUR HE 40 — CT-Klasse**
   - SC: Detailseite 404 (kein Wert).
   - PT: Hauptprodukt `CT-C40-F6-A6`, Variante HE 40/8 `CT-C40-F7-A6`.
   - BR S3: HE 40 nicht in der 6-System-Matrix (BR führt FSCem/Level statt HE 40).
   - → HE 40 ohne BR-Beleg; nur produkte.ts/TDS autoritativ. (VL listet HE 40 nicht prominent.)

5. **KOROPOX vs. KOROPOXY (Oberflächenschutz)**
   - BR S3: „EP-Imprägnierung (mit **KOROPOXY**)".
   - SC ind-1 bauchemische-produkte: „**KOROPOX** — wasseremulgierbares 2K-Epoxidharz".
   - MEMORY relaunch-geklaerte-entscheidungen: KOROPOX eingestellt → durch „LI Plus" ersetzt.
   - → Frank: Produktname/Status (KOROPOX eingestellt? KOROPOXY = aktuell? Ersatz KOROMINERAL Li+). Betrifft Oberflächenschutz-Piece.

6. **Silosystem-Tagesleistung** (SC README B, kein BR-Wert)
   - SC: „1.000–1.500 m²" vs. „1.000–2.000 m²". → Frank/TDS, betrifft Ablauf-Piece.

7. **DIN-1100-Gruppe HE 2 / HE 65 SVS 1,5 extra / HE 3 SVS 1,5 extra / FSCem**
   - SC ind-1: Zeilen ohne Gruppen-Wert (Lücke roh belassen). HE 2 = `CT-C70-F9-A8` (≤8 cm³ = außerhalb Gruppe A ≤6!).
   - PT: neodur-he-2 = `CT-C70-F9-A8`. BR S2 DIN 1100: Gruppe A ist ≤6 cm³ → HE 2 mit A8/≤8 ist **keiner** DIN-1100-Gruppe zuzuordnen.
   - → Frank: HE 2 (A8) DIN-1100-Einordnung (vermutlich bewusst keine Gruppe, da Einstreu-Basisqualität). FSCem-Gruppe: BR S3 lässt Gruppen-Spalte für FSCem leer (bestätigt SC-Lücke) — also belegt „keine Gruppe", nicht „fehlend".

> **Beruhigend (BR löst SC-Flags auf):** DIN-1100-Gruppen der HE-Familien (A/M/KS), Diamantbeton=KS, WH-metallisch=M, FSCem ohne Gruppe — durch BR S2/S3 jetzt autoritativ belegt (vorher SC-Lücke). Siehe #349-README „Wert für die Konsolidierung".

---

## D. Quellenabdeckung & Frank/TDS-Klärbedarf

**Quellenlage stark (Industrieboden ist der bestbelegte Bereich):**
- **Normen/Klassen** — BR S2 ist autoritativ und vollständig (DIN 1100, DIN 18560-7 Tab. 1 + Tab. 6, EN 13813). Hebt „Normen und Klassen" + „Einstreuung vs. Schicht" von „entwurf" auf nahezu beleg-fertig.
- **Schicht vs. Einstreuung** — BR S4 liefert die komplette 8-Kriterien-Tabelle + Schichtdicken-Logik. White-Space Nr. 1 (#345) ist damit quellenseitig gedeckt.
- **System-/Produktmatrix** — BR S3 (6 Systeme mit Klassen/Schichtdicke/Verbrauch) + SC ind-1/-3 (Klassifizierungstabellen) + PT (validierte IDs/Klassen) decken die Bauweisen-Pieces dreifach.
- **Branchen** — BR S2 (16 Branchen + 21 Anwendungen) belegt den Branchen-Absatz vollständig.

**Quellenlage dünn / Piece ohne tragenden Beleg:**
- **Untergrund-Pillar + Prüfen + Vorbereiten + Estricharten** (4 SEO-Lücken-Pieces) — KEINE BR/SC-Fachquelle; nur Briefing + WB-Nachfragebeleg. Prüf-Richtwerte (Haftzug, Restfeuchte, Rautiefe) und CA/MA/AS/SR-Tiefe sind nicht im Repo belegt → quelle-noetig + Briefing/Frank.
- **Wirtschaftlichkeit/TCO** — nur qualitative Aussagen (SC „Lebenszykluskosten", „Vielfaches höher"); konkrete Lebensdauer-Jahre und Stillstandskosten-€ fehlen → Vertrieb/Marketing.
- **Sperrzeit-Tabelle** — durch HE-60-rapid-Konflikt (24 h vs. 48 h) und KOROCRETE (h vs. 8 h) blockiert; „begehbar"-Zwischenwerte für HE 65/65 Plus/40 fehlen ganz.

**Frank/TDS-Klärbedarf (gesammelt, priorisiert):**
1. HE 60 rapid Wiederinbetriebnahme 24 h vs. 48 h (Datenblatt vs. Referenzen) — blockiert Sperrzeit + FAQ + „Neubau oder Sanierung?".
2. KOROPOX-Status (eingestellt? KOROPOXY vs. KOROMINERAL Li+) — Oberflächenschutz-Piece.
3. NEODUR Level Druckfestigkeit 35 vs. 40 N/mm².
4. Hartstoff-Klasse vs. Estrich-Klasse (F10 vs. F9 bei VS 0/5, Diamantbeton, WH-metallisch) — welche Werte zeigt die Web-Produkttabelle?
5. Einstreuung-„10 %-Dauerhaftigkeit"-Kennzahl für Web freigeben (interne Doppelseite, nicht in BR).
6. Schwerlast-Neubau-Referenz beschaffen (Systemwahl-Artikel blockiert — alle Neubau-Tags sind Designböden).
7. Silosystem-Tagesleistung (1.000–1.500 vs. 1.000–2.000 m²).
8. HE 2 DIN-1100-Einordnung (A8/≤8 außerhalb Gruppe A); EN-13813-Entschlüsselung + KS-Bedeutung Web-Sign-off.
9. KOROCRETE belastbarNach (h vs. 8 h).
10. Lebensdauer-/TCO-Zahlen (Jahre, Stillstandskosten) — Marketing/Vertrieb.

> **Hinweis Bereichszuordnung:** Sichtboden seit #331 unter Industrieboden (VL). KOROCRETE/Rapid-Set-Schnellbeton liegen primär Infrastruktur/Betonsanierung — hier nur als Verzweigung referenziert, nicht konsolidiert (siehe deren Konzeptdateien).

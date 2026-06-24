---
# Vierklang-Konsolidierung: Betonsanierung (rapid-set)
**Quellen:** Vorschlagsliste · Scrape #344 · Broschüre #349 · Wettbewerber #345 · Repo-MDX · produkte.ts · **Issue #346**
**CLEAN:** jede Aussage quellen-belegt · Konflikte ausgewiesen (nicht gemergt) · Empfehlungen, keine Entscheidungen · Mensch-Checkpoint.

Bezug: Vorschlagsliste §2 „Betonsanierung (rapid-set)" (Z. 42–56), §3 Lücken (Z. 154 KOROCRETE-Pillar, Z. 155 XF-Expositionsklassen), §4 Quellen-Hinweis (Z. 170), §5 Top-10 (#6 Wochenend-Sanierung).
Quellen-Präzedenz bei Konflikt: Broschüre 2023 > Alt-Website-Scrape; final autoritativ bleiben TDS / data/produkte.ts / Notion / Frank-Sign-off. Vorschläge, keine Entscheidungen.

---

## A. Content-Pieces (belegt)

| Piece (Vorschlagsliste §2) | Status-Vorschlag | Quell-Belege (Datei › Abschnitt: Fakt) | Konflikte | Lücke (Frank/TDS) | Empfehlung |
|---|---|---|---|---|---|
| **Sanierung übers Wochenende: Boden im laufenden Betrieb instand setzen** (Ratgeber, neu, hoch) | bauen-bereit | Scrape #344 › `bereiche-hauptseiten` 5-schnellbetonsysteme: „Sanierung in laufendem Betrieb" als KOROCRETE-Referenz. · MDX `wirtschaftlichkeit-tco.mdx` Z. 53: Loosen Werkzeug Klausen „im laufenden Betrieb saniert … Betonarbeiten am Vormittag abgeschlossen". · Vorschlags-Refs antolin-wochenend-sanierung / wochenend-sanierung-werkstatt / loosen-werkzeug-klausen. · produkte.ts: rapid-set-cement-all (Z. 469) belastbarNach „1 h"; korodur-hb-5-rapid (Z. 408) existiert. | Vorschlagsliste nennt Produkt `rapid-set-cement-all` — bereich rapid-set; aber `korocrete` (Z. 700) hat in produkte.ts `bereich: "industrieboden"`, nicht rapid-set → Produkt-Bereich-Zuordnung der Wochenend-Story ist gespreizt (Konflikt C5). | — | bauen-bereit. Quellenlage stark (Scrape + MDX + Refs decken die Story). Top-10-Piece (#6). |
| **Verkehrsflächen instand setzen: Fahrbahn, Schacht, Pflaster ohne langen Stillstand** (Ratgeber, neu, hoch) | bauen-bereit | Scrape #344 › `Rapid Set: dot-europe-concrete-mix`: „für Reparatur und Bau von Straßen, Gehwegen, Fahrbahnen, Flug- und Landebahnen, Brücken …"; Refs dort: „Fahrbahnsanierung, Wien". · Scrape › Cross-Selling ASPHALT REPAIR MIX: „für die Einfassung/Angleichung von Straßenkanalschächten bei kurz gehaltenen Sperrzeiten. Bereits nach ca. 30 Minuten kann der Verkehr wieder rollen." · produkte.ts asphalt-repair-mix (Z. 603) belastbarNach „30 min Verkehrsfreigabe". | Vorschlags-Produkt `rapid-set-schnellbeton` hat in produkte.ts `bereich: "industrieboden"` (Z. 744), nicht rapid-set → cluster-übergreifend, Überschneidung mit Vorschlagsliste-Bereich Infrastruktur (§ Infrastruktur Z. 63 „Verkehrsfreigabe in Stunden"). Doppelung Betonsanierung↔Infrastruktur prüfen. | Frank: ZTV-ING / Verkehrsfreigabe-Normbezug; TDS DOT Europe für statische Instandsetzung. | bauen-bereit, aber Abgrenzung zu Infrastruktur-Strecke (§ Infrastruktur) durch Mensch klären (sonst Keyword-Kannibalisierung). |
| **Wie lange steht meine Fläche? Sperrzeit (Rapid-Set-Sicht)** (Ratgeber, vorhanden-entwurf, hoch) | frank-noetig | MDX `sperrzeit-belastbarkeit.mdx` (Entwurf, status „entwurf") Z. 50–60 Tabelle: CEMENT ALL begehbar 15 min / voll 1 h; MORTAR MIX voll 1 h; DOT Europe 60 min; Rapid Set Schnellbeton 2 h; KOROCRETE „wenige h". · produkte.ts deckt Werte (Z. 469/522/655/744). | KOROCRETE-Wert: produkte.ts (Z. 700) „wenige h (rezepturabhängig)" vs. anwendungsmatrix.ts laut MDX-todo_frank „8 h" → Konflikt (C2). NEODUR HE 60 rapid: produkte.ts „24 h" vs. Referenzen Antolin/Kleemann „48 h" → Konflikt (C3, gehört eher Industrieboden, hier nur tangential). | Frank: 5 offene todo_frank im MDX-Frontmatter (KOROCRETE-Wert, begehbar-Stufen, Stufendefinition begehbar/belastbar/voll). | frank-noetig. Entwurf steht, aber Tabelle hat mehrere TODO(Frank) + Wertkonflikte. Nicht live vor Sign-off. |
| **Wirtschaftlichkeit von Bodensanierung: Lebensdauer, Stillstand, CO2** (Ratgeber, vorhanden-entwurf, hoch) | frank-noetig | MDX `wirtschaftlichkeit-tco.mdx` (Entwurf) komplett ausgearbeitet; Z. 43 NEODUR HE 65 „70 N/mm²", Böhme A6; Z. 53 Monheim/Loosen KOROCRETE+HB 5 rapid; Z. 55 HB 5 rapid Haftzug „min. 1,5 N/mm²". · Refs monheim-produktionsflaeche/loosen-werkzeug-klausen/strassensanierung-wien. | 30-%-CO2-Aussage: Quelle uneinheitlich — Scrape #344 `bereiche-hauptseiten` 4-rapid-set: „30 % weniger CO₂-Ausstoß als Portlandzement" (Rapid-Set-Zement, US/CTS-Bezug) vs. Broschüre #349 S1 NEODUR HE 3 green „Klimaneutral bis 2030" + EPD (KORODUR-Produkt-Bezug). Bezugsbasis unterschiedlich → nicht mergen (C4). | Frank (4 todo_frank im MDX): absoluter CO2-Wert HE 3 green, Nutzungsdauer-Jahre Hartstoff, Euro-Tagesrate-Freigabe, CO2-Bezugsbasis DOT/Asphalt. | frank-noetig. Inhaltlich reif, aber CO2-/Lebensdauer-Kennzahlen brauchen EPD/Frank. |
| **Betoninstandsetzung nach EN 1504: Prinzipien, R-Klassen, Methode** (Ratgeber, lücke, mittel) | quelle-noetig | Scrape #344 › `Rapid Set: dot-europe-concrete-mix` Normbezug: „gem. DIN EN 1504-3 einsetzbar sowohl für statisch als auch nicht statisch relevante Instandsetzungen". · produkte.ts dot-europe-concrete-mix norm „EN 1504-3" (Z. 655). · Wettbewerber #345 Cluster 5: R1–R4 (EN 1504-3) n=11, EN-1504-9-Prozessschritte n=6, EN-1504-in-10-Teilen n=5 → „Pflicht-Tischset" bestätigt. · Vorschlags-Produkte neodur-msm-5/neodur-msb-8: existieren (Z. 1999/2022). | Vorschlagsliste-Produktannahme `neodur-msm-5`/`neodur-msb-8` als R-Klassen-Beleg — produkte.ts nennt für msm-/msb-Reihe keine R-Klasse im Scrape/Daten verifiziert (Klassen-Beleg fehlt). | Frank/TDS: R-Klassen-Einstufung der KORODUR-Produkte (DOT = EN 1504-3, aber konkrete R1–R4-Klasse je Produkt). | quelle-noetig. Markt-Pflichtthema (n=11), KORODUR hat nur DOT als belegten EN-1504-3-Anker. R-Klassen-Mapping fehlt → TDS/Frank. |
| **Spritzmörtel und Spritzbeton: Reprofilierung Wand, Decke, Bauwerk** (Ratgeber, neu, niedrig) | quelle-noetig | Wettbewerber #345 Cluster 5: „Betonersatz im Hand- vs. Spritzauftrag (Trocken-/Nassspritzverfahren) und Spritzmörtel" (EN 1504-3) n=2 → dünn bespielt. · Scrape #344 `bereiche-hauptseiten` 7-spezialbaustoffe Anwendung „Berg- und Tunnelbau", „Betoninstandsetzung". · produkte.ts neodur-msm-3/msm-5/msb-8 existieren (Z. 1976/1999/2022). | Vorschlagsliste führt MSM/MSB hier (Betonsanierung); CLAUDE.md/Memory dokumentiert MSM/MSB unter Spezialbaustoffe → Bereichszuordnung uneindeutig. | Frank/TDS: Verarbeitungs-/Schichtdickenwerte MSM/MSB, Spritzverfahren-Eignung; keine Scrape-Kennwerte vorhanden. | quelle-noetig. Thema dünn belegt, niedrige Prio. TDS-Daten MSM/MSB heben. |
| **Pflaster und Fugen barrierefrei und dauerhaft sanieren** (Ratgeber, neu, niedrig) | quelle-noetig | rapidSetContent.ts Z. 124 Anwendung „Pflaster barrierefrei — Fugen und Egalisierung nach DIN 18040". · Scrape #344 `bereiche-hauptseiten` 4-rapid-set Download „Flyer Rapid Set® Barrierefreiheit". · Wettbewerber #345 C-Tabelle: „Pflaster-/Fugen-Instandsetzung gebundene Bauweise (barrierefrei, tragfähig)" DIN 18040 / ZTV/M FG, kaum belegt → White-Space. · produkte.ts neodur-pfm-1k-easyfix (Z. 2144), neodur-pfm-ze (Z. 2173). | Vorschlagsliste führt Pflaster mehrfach (hier + Infrastruktur Z. 65 + Spezialmörtel Z. 93/95) → §3 Lücke (Z. 146) fordert EINE führende Pflaster-Seite. Doppelung-Konflikt. | TDS: PFM-Kennwerte; DIN-18040-Konformitätsbeleg. | quelle-noetig / zusammenlegen. Mit Pflaster-Strecke (Infrastruktur/Spezialmörtel) konsolidieren — Mensch entscheidet führende Heimat. |
| **Die mineralische Alternative zu Epoxidharz-Mörtel** (Bereichsabsatz, erweitern, mittel) | bauen-bereit | rapidSetContent.ts Z. 145–152 epoxid-Block: „Brandklasse A1, nichtbrennbar statt B1 / rein mineralisch / Entsorgung als Bauschutt statt Gefahrgut". · Scrape #344 `Rapid Set: cement-all` Download „Flyer Rapid Set® Die spannende Alternative zu Epoxidharz-Mörtel" (Original-Asset existiert). · Broschüre #349 S1 USP „mineralisch, physiologisch unbedenklich". · Vorschlags-Produkte korodur-durop (Z. 1189), korodur-robust (Z. 1212) existieren. | Brandklasse-A1/B1-Aussage in rapidSetContent.ts ist noch nicht TDS-belegt (Content-Stand, kein Normzitat). | Frank: Brandklasse-A1-Beleg je Produkt (Leistungserklärung); B1-Vergleich gegen Epoxid bestätigen. | bauen-bereit (Bereichsabsatz existiert live). A1-Aussage vor Live von Frank gegenzeichnen lassen. |
| **Rapid Set Technologie: warum BCSA-Zement schneller und schwundneutral ist** (Bereichsabsatz, erweitern, mittel) | frank-noetig | Scrape #344 `rapid-set` rapid-set-technologie: „B-CSA Zement … kein Portlandzement, keine Chloride/Beschleuniger"; W/Z=0,45 bindet „bis zu 100% chemisch"; „nach 1 h > 20,0 N/mm²"; Schwundgrenze „< 0,05% (US Army Corps of Engineers)". · rapidSetContent.ts technologie (Z. 131–153) + FAKTENCHECK-Flags CO2 (Z. 141) und „bis 4× langlebiger" (Z. 142). | „Bis 4× langlebiger" + „30 % CO2" sind in rapidSetContent.ts ausdrücklich `faktencheck: true` → unbelegt bis Frank-Sign-off. CO2-Bezug-Konflikt siehe C4. | Frank: CO2-Wert, Lebensdauer-Faktor (4×), EPD-Verweis — explizit als FAKTENCHECK markiert. | frank-noetig. Inhalt steht, aber die kaufentscheidenden Zahlen sind freigabepflichtig (Vorschlagsliste §4 Z. 170: „FAKTENCHECK-Werte vor Live freigeben"). |
| **Welches Rapid-Set-Produkt für welche Schichtstärke?** (Bereichsabsatz, erweitern, mittel) | bauen-bereit | Scrape #344 `einzigartige-rapid-set-produkte` kennwert-tabelle: CEMENT ALL 0–100 mm / MORTAR MIX 10–150 mm / CONCRETE MIX 50–600 mm. · rapidSetContent.ts gruppenText.reparaturmoertel (Z. 161): identische Staffelung. · produkte.ts schichtdicke: cement-all „Boden 10–100 mm" (Z. 481), mortar-mix „10–150 mm" (Z. 531), dot-europe „50–600 mm" (Z. 651). | MORTAR-MIX-Untergrenze: Scrape `mortar-mix` FAQ „15 mm bis 150 mm" vs. Vergleichstabelle „10–150 mm" vs. CEMENT-ALL-Seite „ab 10 mm empfehlen wir MORTAR MIX" → 10 vs. 15 mm widersprüchlich (C1, vom Scrape selbst geflaggt). produkte.ts hält „10–150 mm". | TDS: MORTAR-MIX-Untergrenze final (10 vs. 15 mm). | bauen-bereit. Tabelle aus produkte.ts ableitbar; MORTAR-MIX-Untergrenze per TDS auflösen (produkte.ts = 10 mm, vorläufig autoritativ). |
| **Bereichsseite Betonsanierung: Absatz Stillstandskosten senken** (Bereichsabsatz, neu, mittel) | bauen-bereit | rapidSetContent.ts problem-Block (Z. 77–90): „Jede Stunde Sperrzeit ist teuer" + downtime-Liste + payoff „nach rund einer Stunde wieder belastbar". · MDX `wirtschaftlichkeit-tco.mdx` Z. 57 ff. Stillstandskosten als teuerster Posten. · Refs dhl-ueberadebruecken / autohaus-versmold (Vorschlag). | — | — | bauen-bereit. Content bereits in rapidSetContent.ts vorhanden, gut belegt. |

---

## B. Neue Pieces aus den Quellen (Vorschlag)

Themen, die Scrape/Broschüre/Wettbewerber liefern und NICHT (sauber) in der Vorschlagsliste §2 stehen. Vorschlag, nicht Beschluss.

1. **CONCRETE PHARMACY: Konsistenz und Verarbeitungszeit steuern (SET Control / FLOW Control / FAST)**
   Beleg: Scrape #344 `concrete-pharmacy` — SET Control (Verzögerer), FLOW Control (Verflüssiger, „20–40 % weniger Anmachwasser"), FAST (Beschleuniger, für kalte Temperaturen). rapidSetContent.ts führt Additive nur als Gruppen-Intro (Z. 164). → eigener kurzer Verfahrens-/FAQ-Baustein möglich, stützt die „Konsistenz frei wählbar"-Aussage. Quellenlage: stark (Scrape).

2. **Nassbereich- und Unterwasser-Verarbeitung (hydraulischer Zement)**
   Beleg: Scrape #344 `cement-all`/`mortar-mix` FAQ „Kann es für Nassverlegungen verwendet werden? Ja … hydraulische Zemente binden unter Wasser ab". Kennwert-Tabelle: „Nassbereiche ja" für alle drei. → Differenzierungsthema (mineralisch + nassraumtauglich), in §2 nicht eigenständig. Quellenlage: stark (Scrape).

3. **Verkehrsbeton-Expositionsklassen XF / Frost-Tausalz als Norm-Tiefe**
   Beleg: Wettbewerber #345 Cluster 5 „Expositionsklassen X/C/D/S/F/A/M" (DIN EN 206-1 / DIN 1045-2) n=2 + Frost-Tausalz n=3 → dünn = White-Space (C-Tabelle Z. 210). Scrape #344 `einzigartige-rapid-set-produkte`: „Frost-Tausalzbeständigkeit ja". rapidSetContent.ts Z. 139 CDF-Prüfung. Steht in Vorschlagsliste nur als §3-Lücke (Z. 155) und unter Infrastruktur (§ Infrastruktur Z. 64), nicht als Betonsanierungs-Piece. Quellenlage: mittel.

4. **TL BEB-StB / 5-Stunden-Frühfestigkeit für Verkehrsflächen-Schnellbeton**
   Beleg: Scrape #344 `bereiche-hauptseiten` 5-schnellbetonsysteme: Rapid Set Concrete geprüft nach TL BEB-StB; „geforderte Frühfestigkeiten (≥ 20 MPa nach 5 Stunden) werden bereits nach 2 Stunden erreicht". produkte.ts rapid-set-schnellbeton norm „TL BEB-StB", druckfestigkeit „≥ 45 MPa", belastbar „2 h". → starker Normbezug-Beleg, in §2 nur implizit. Achtung: Produkt bereich=industrieboden (C5). Quellenlage: stark.

5. **EN-1504-9-Prozessschritte / Schadensursachen-Pillar (Karbonatisierung, Chlorid, Sulfat, AKR)**
   Beleg: Wettbewerber #345 Cluster 5 — Schadensursachen n=7, EN-1504-9-Prozessschritte n=6, EN-1504-in-10-Teilen n=5. Vorschlagsliste hat nur „EN 1504: Prinzipien, R-Klassen, Methode" (ein Piece) → Markt rechtfertigt evtl. Norm-Pillar + Schadensursachen separat. Vorschlag, KORODUR hat aber nur DOT als EN-1504-3-Produktanker (Reichweite begrenzt). Quellenlage: Markt-Beleg stark, Produkt-Beleg dünn.

---

## C. Konflikte in diesem Bereich (Quellen gegenübergestellt)

**C1 — MORTAR MIX Einbaustärke-Untergrenze (10 vs. 15 mm)**
- Scrape #344 `mortar-mix` FAQ: „15 mm bis 150 mm" (vom Scrape selbst geflaggt).
- Scrape #344 `einzigartige-rapid-set-produkte` Vergleichstabelle: „10 – 150 mm".
- Scrape #344 `cement-all`-Seite: „ab 10 mm empfehlen wir MORTAR MIX".
- produkte.ts (Z. 531): „10–150 mm".
→ Präzedenz: produkte.ts/TDS autoritativ (10 mm). Nicht still auflösen — TDS bestätigen.

**C2 — KOROCRETE Wiederinbetriebnahme (wenige h vs. 8 h)**
- produkte.ts (Z. 700): belastbarNach „wenige h (rezepturabhängig)".
- anwendungsmatrix.ts (laut MDX `sperrzeit-belastbarkeit.mdx` todo_frank Z. 22): „8 h".
→ Frank: welcher Wert als Bauherren-Versprechen.

**C3 — NEODUR HE 60 rapid voll belastbar (24 h Datenblatt vs. 48 h Referenz)**
- produkte.ts: „24 h" (Datenblatt). MDX-Tabelle: „ca. 24 h (Datenblatt)".
- Referenzen Antolin/Kleemann (laut MDX todo_frank Z. 21): „48 h".
→ Datenblatt vs. Projekt-Realität; Frank. (Produkt gehört primär Industrieboden, hier nur in Sperrzeit-Tabelle relevant.)

**C4 — CO2-Aussage „30 % weniger als Portlandzement" — Bezugsbasis uneinheitlich**
- Scrape #344 4-rapid-set: „30 % weniger CO₂-Ausstoß als Portlandzement" — bezogen auf Rapid-Set-Zement / CTS Cement (US/LEED).
- Broschüre #349 S1: NEODUR HE 3 green + „Klimaneutral bis 2030" + EPD (KORODUR-Produkt, anderer Bezug).
- rapidSetContent.ts Z. 141: 30 % explizit `faktencheck: true`.
- MDX `wirtschaftlichkeit-tco.mdx` todo_frank Z. 24: Bezugsbasis DOT/Asphalt offen.
→ Nicht mergen. Frank/EPD: welcher absolute Wert, welche Bezugsbasis je Produkt.

**C5 — Produkt-Bereich-Zuordnung gespreizt (rapid-set vs. industrieboden)**
- Vorschlagsliste §2 führt für Betonsanierung u.a. `korocrete`, `rapid-set-schnellbeton`.
- produkte.ts: `korocrete` (Z. 700) und `rapid-set-schnellbeton` (Z. 744) haben `bereich: "industrieboden"`, NICHT rapid-set.
→ Erklärt Doppelung Betonsanierung ↔ Infrastruktur (Vorschlagsliste § Infrastruktur Z. 62–69). Mensch: führende Heimat je Produkt-Story klären; Multi-Bereich-Modell (zusatzBereiche) ggf. nutzen.

**C6 — „bis 4× langlebiger" unbelegt**
- rapidSetContent.ts Z. 142: `faktencheck: true`. Keine Quell-Stütze in Scrape/Broschüre/produkte.ts.
→ Frank-Klärung vor Live (Lebensdauer-Faktor).

**C7 — Pflaster-Thema dreifach gestreut**
- §2 Betonsanierung Z. 50, § Infrastruktur Z. 65, § Spezialmörtel Z. 93/95.
- §3 Lücke (Z. 146) fordert EINE führende Pflaster-Seite.
→ Konsolidierungs-Entscheidung Mensch.

---

## D. Quellenabdeckung & Frank/TDS-Klärbedarf

**Quellenlage stark (gut belegt):**
- Rapid-Set-Reparaturmörtel-Kernfamilie (CEMENT ALL / MORTAR MIX / CONCRETE MIX / DOT Europe): Scrape #344 liefert vollständige Kennwert-Tabellen, FAQ, Schichtstärken; durch produkte.ts gedeckt. → Pieces „Schichtstärke-Tabelle", „Epoxid-Alternative", „Stillstandskosten-Absatz", „Wochenend-Sanierung" sind bauen-bereit.
- CONCRETE PHARMACY (Additive): vollständig im Scrape.
- TL-BEB-StB-Frühfestigkeit Schnellbeton: Scrape + produkte.ts.
- Sperrzeit/TCO inhaltlich: zwei ausgearbeitete MDX-Entwürfe vorhanden.

**Quellenlage dünn (Beleg fehlt / nur Markt-Indikator):**
- EN-1504-R-Klassen je KORODUR-Produkt: nur DOT = EN 1504-3 belegt; MSM/MSB/PFM ohne R-Klasse → TDS/Frank.
- Spritzmörtel/Spritzbeton (MSM/MSB) Verarbeitungs-/Kennwerte: keine Scrape-Daten, Bereichszuordnung unklar.
- ASPHALT REPAIR MIX: eigene Produkt-Detailseite im Scrape leer (#344 geflaggt), nur Cross-Selling-Text; produkte.ts liefert die Kennwerte.
- Pflaster/PFM DIN-18040-Konformität: nur Asset-Verweis (Flyer Barrierefreiheit), kein Normbeleg.

**Frank/TDS-Klärbedarf (Liste):**
1. CO2-Absolutwert + Bezugsbasis je Produkt (HE 3 green EPD; DOT/Asphalt) — C4.
2. „Bis 4× langlebiger" Lebensdauer-Faktor belegen oder streichen — C6.
3. Brandklasse A1 je Rapid-Set-Produkt (Leistungserklärung) für Epoxid-Alternative-Absatz.
4. KOROCRETE Wiederinbetriebnahme-Wert (wenige h vs. 8 h) — C2.
5. MORTAR-MIX-Einbaustärke-Untergrenze (10 vs. 15 mm) — C1.
6. R-Klassen-Einstufung (EN 1504-3) je instandsetzungsrelevantem Produkt (DOT, MSM, MSB).
7. NEODUR HE 60 rapid 24 h vs. 48 h + Stufendefinition begehbar/belastbar/voll (Sperrzeit-MDX, 5 todo_frank) — C3.
8. Produkt-Bereich-Zuordnung korocrete / rapid-set-schnellbeton (rapid-set vs. industrieboden) + Pflaster-Heimat — C5/C7 (eher IA-/Mensch-Entscheidung als Frank).

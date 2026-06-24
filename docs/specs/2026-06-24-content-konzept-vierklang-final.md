# Content-Konzept neue korodur.de — Vierklang-Konsolidierung (Stand #346)

**Zweck:** Ein entscheidungsreifes Master-Dokument, das die 8 bereichsweisen Konsolidierungen (`docs/content-quellen/konzept/<slug>.md`) und die kuratierte Vorschlagsliste (`docs/specs/2026-06-24-content-konzept-vorschlagsliste.md`) zu einem Mensch-Checkpoint bündelt. Es ersetzt die Einzeldateien nicht, sondern aggregiert Reifegrad, Konflikte, Frank/TDS-Bedarf und eine priorisierte Build-Sequenz für die Freigabe-Runde mit Steffi und Frank.

**Vier Quellen (der „Vierklang"):**
1. **Vorschlagsliste** (VL) — kuratierte Content-Liste je Bereich, ~60 Pieces.
2. **Scrape #344** (SC) — Alt-Website-Inhalte, mit Tippfehler-/Widerspruchs-Flags.
3. **Broschüre 2023 #349** (BR) — autoritative Bauchemie-Quelle (deckt NICHT alle Bereiche ab).
4. **Wettbewerber-Analyse #345** (WB) — Markt-Häufigkeiten (n=), White-Space-Befunde.
   Ergänzend, final autoritativ: **TDS / `data/produkte.ts` (PT) / Notion / Frank-Sign-off**.

**CLEAN-Hinweis:** Jede Aussage in den Quelldateien ist quellen-belegt, Konflikte sind ausgewiesen (nicht gemergt), alle Empfehlungen sind Vorschläge (keine Entscheidungen). Dieses Master-Dokument hält diese Disziplin durch: nichts erfunden, nichts geglättet, Präzedenz benannt aber als Vorschlag markiert.

**Quellen-Präzedenz bei Konflikt (Vorschlag):** BR #349 (2023) > SC #344. Final autoritativ bleiben TDS / `data/produkte.ts` / Notion / Frank. Wo BR schweigt (Infrastruktur, Microtop, Spezialmörtel, Katzenstreu), gibt es keinen autoritativen Tiebreaker zwischen den Quellen — diese Konflikte gehen direkt an TDS/Frank.

**Status: Entscheidungsreif für Steffi/Frank — keine stillen Merges.** Vor der Umsetzung müssen die Checkpoint-Fragen (§6) fallen. Bis dahin ist dieses Dokument Vorschlag, keine Roadmap.

**Status-Legende (aus den Bereichsdateien):** `bauen-bereit` · `quelle-noetig` · `frank-noetig` · `neu` · `streichen/zusammenlegen`

---

## 1. Executive Summary

**Kernbefunde:**

1. **Industrieboden ist der einzige durchgehend stark belegte Bereich.** BR #349 (S1–S4) liefert die autoritative Normbasis (DIN 1100 Gruppen, DIN 18560-7 Tab. 1+6, EN 13813) und die 8-Kriterien-Tabelle Einstreuung-vs-Schicht. Das hebt die zwei größten White-Space-Pieces (#345) quellenseitig auf nahezu beleg-fertig.
2. **Die vier Bereiche ohne Broschüren-Inhalt (Infrastruktur, Microtop, Spezialmörtel, Katzenstreu) haben keinen autoritativen Tiebreaker.** Hier entscheidet PT/TDS/Frank jeden Quellen-Konflikt — und genau dort liegen die meisten ungelösten Wertwidersprüche.
3. **Ein durchgehender Wertkonflikt zieht sich über vier Bereiche:** NEODUR HE 60 rapid Wiederinbetriebnahme (24 h Datenblatt vs. 48 h Referenz/Alt-Site) blockiert Sperrzeit-, FAQ-, Schadensbild- und Branchen-Pieces gleichzeitig.
4. **Die referenzärmsten Pieces sind oft die strategisch wertvollsten:** Verguss (content-armer Markt, KORODUR-Stärke) und Pflaster (dreifach gestreut) haben keine verifizierten Referenzen — der Vertrieb muss echte Projekte nachziehen.
5. **Mehrere Pieces sind in der Vorschlagsliste selbst doppelt geführt** (Pflaster 3×, Verkehr/Infrastruktur 2×, Verguss zuvor 4×). Die Konsolidierung schlägt je eine führende Heimat vor — die Entscheidung steht beim Menschen.

**Reifegrad je Bereich:**

| Bereich | Pieces (VL) | Quellenlage | Offene Konflikte | Frank/TDS-Punkte | Detaildatei |
|---|---|---|---|---|---|
| Industrieboden | 17 + Sub-Absätze | **stark** (BR S1–S4 autoritativ) | 7 | 10 | [industrieboden.md](../content-quellen/konzept/industrieboden.md) |
| Betonsanierung (rapid-set) | 11 | stark Kernfamilie, **dünn** EN-1504-R-Klassen | 7 (C1–C7) | 8 | [betonsanierung.md](../content-quellen/konzept/betonsanierung.md) |
| Infrastruktur | 8 | mittel (kein BR; SC + PT), **dünn** XF-Normtiefe | 5 (K1–K5) | 9 | [infrastruktur.md](../content-quellen/konzept/infrastruktur.md) |
| Microtop (TW) | 6 | **dünn** (kein BR; SC asymmetrisch, Nass leer) | 5 | 7 | [microtop.md](../content-quellen/konzept/microtop.md) |
| Spezialmörtel | 7 | **dünn** (kein BR; Klassen-Konflikt SC↔PT) | 4 (K1–K4) | 6 | [spezialmoertel.md](../content-quellen/konzept/spezialmoertel.md) |
| Katzenstreu | 4 | mittel B2B-Story, **leer** Private-Label-Detail | 3 (K1–K3) | 0 Frank / 4 Vertrieb | [katzenstreu.md](../content-quellen/konzept/katzenstreu.md) |
| Schadensbilder | 9 | stark Abrieb/Frost (BR S2/S4), **dünn** WHG/Risse/Chemie-Grenzen | 6 (K1–K6) | 10 | [schadensbilder.md](../content-quellen/konzept/schadensbilder.md) |
| Branchen | 9 | stark Industrieboden-nah (BR S2), **dünn** Tankstelle/Brauerei | 4 | 6 | [branchen.md](../content-quellen/konzept/branchen.md) |

> Bereinigung gegenüber VL: Verkehr/Infrastruktur-Branchen-LP = Verteiler (Tiefe aus Infrastruktur), Verguss einmal führend in Spezialmörtel, Trinkwasser nur in Microtop, Tankstelle nur in Branchen, Pflaster eine führende Heimat (offen). Diese Schnitte sind Vorschläge; §6 fragt sie ab.

---

## 2. Globales Konflikt-Register

Alle Quellen-Konflikte über alle Bereiche, gegenübergestellt. **Nicht gemergt — Mensch/Frank entscheidet.** Präzedenz als Vorschlag benannt. Besonders markiert: die #344-Wertwidersprüche und Broschüre-vs-Scrape-Fälle.

### 2.1 Bereichsübergreifende Konflikte (mehrere Pieces betroffen)

| # | Konflikt | Quelle A | Quelle B | Weitere | Empfehlung (Vorschlag) | Betroffene Bereiche |
|---|---|---|---|---|---|---|
| G1 | **NEODUR HE 60 rapid Wiederinbetriebnahme** | SC #344 schnellestrich: „belastbar nach **48 h**" | SC #344 industriebodensanierung: „**3 h begehbar / 24 h nutzbar**" | PT: `belastbarNach 24 h`, begehbar 3 h. BR S3: keine Zeitangabe. MDX/Refs Antolin+Kleemann: **48 h** | Datenblatt (24 h) vs. Projektrealität (48 h) trennen; Abhängigkeit Schichtdicke/Temperatur formulieren. PT autoritativ. **Frank entscheidet das Kunden-Versprechen.** | Industrieboden, Betonsanierung (C3), Schadensbilder (K1), Branchen |
| G2 | **HE 65 Plus Wiederbelastbarkeit** | PT: „voll belastbar nach ca. **48 h**" | MDX flugzeug + Memo: **7 d** (Steffi-Setzung 2026-06-09, autoritativ) | — | Live-Blocker. Frank/Steffi bestätigen, dann PT angleichen. **Nicht still auflösen.** | Branchen (Hangar/Parkdeck), Schadensbilder |
| G3 | **KOROCRETE Wiederinbetriebnahme / Verkehrsfreigabe** | PT: „wenige h (rezepturabhängig)" | `anwendungsmatrix.ts`: „**8 h**" | PT Festigkeitsstufen belegt: 6 h ≈18, 8 h ≈25, 16 h ≈35 N/mm² | Keine harte Freigabe-Zahl belegt. Frank: ob aus 6/8-h-Festigkeit eine nennbare Stundenzahl ableitbar. | Betonsanierung (C2), Infrastruktur (K1) |
| G4 | **CO2-Aussage „30 % weniger als Portlandzement"** | SC #344 4-rapid-set: 30 % (Rapid-Set-Zement / CTS, US/LEED) | BR #349 S1: NEODUR HE 3 green „klimaneutral bis 2030" + EPD (KORODUR-Produkt) | `rapidSetContent.ts`: 30 % explizit `faktencheck: true` | **Bezugsbasis uneinheitlich — nicht mergen.** Frank/EPD: welcher absolute Wert je Produkt, welche Basis. | Betonsanierung (C4), Industrieboden |
| G5 | **MORTAR MIX Einbaustärke-Untergrenze** | SC #344 FAQ: „**15** mm" | SC #344 Vergleichstabelle: „**10** mm" + CEMENT-ALL-Seite „ab 10 mm" | PT: „10–150 mm" | PT/TDS autoritativ (10 mm), per TDS bestätigen. **Scrape-internes Flag.** | Betonsanierung (C1), Infrastruktur (K5) |
| G6 | **Pflaster-Heimat — dreifach geführt** | VL §2 Betonsanierung Z.50 | VL §2 Infrastruktur Z.65 | VL §2 Spezialmörtel Z.93/95 + Branchen | §3-VL fordert selbst **EINE** führende Pflaster-Seite. IA-/Mensch-Entscheidung. | Betonsanierung (C7), Infrastruktur (K2), Spezialmörtel |
| G7 | **Produkt-Bereich-Zuordnung gespreizt** | VL führt korocrete / rapid-set-schnellbeton unter Betonsanierung | PT: beide `bereich: "industrieboden"` (+ `zusatzBereiche:["infrastruktur"]`) | — | Erklärt Doppelung Betonsanierung↔Infrastruktur. Multi-Bereich-Modell (zusatzBereiche) nutzen; führende Story-Heimat klären. | Betonsanierung (C5), Infrastruktur |
| G8 | **WHG vs. DVGW-Abgrenzung** | Schadensbilder/Branchen: WHG = AwSV/TRwS (wassergefährdende Stoffe) | Microtop: DVGW W 270/300/347 (Trinkwasser) | WB #345: Abgrenzung als echte Markt-Lücke | Sauber trennen, je eigener Erklärblock; kein abdeckendes WHG-Produkt in PT → Quelle nötig. | Schadensbilder (feuchte-whg), Branchen (Tankstelle), Microtop |

### 2.2 Bereichsinterne Wertkonflikte (#344-Widersprüche und Broschüre-vs-Scrape)

| # | Konflikt | Quelle A | Quelle B | Empfehlung (Vorschlag) | Bereich |
|---|---|---|---|---|---|
| L1 | **DIN-1100-Gruppe-A-Schleifverschleißgrenze** | BR #349 S2 (autoritativ): Gruppe A = **≤ 6** cm³/50 cm² | MDX abrieb + SC #344 (HE 60 rapid Istwert): **≤ 5** | **Broschüre > Scrape.** Klassengrenze (≤6) vom Produkt-Istwert (≤5) trennen — kein Widerspruch, wenn sauber getrennt. | Schadensbilder (K2), Industrieboden |
| L2 | **Hartstoff-Klasse vs. Estrich-Klasse (F10 vs. F9)** | SC #344 + PT: VS 0/5 = C70-**F10**-A6; Diamantbeton = C70-**F10**-A1,5 | BR #349 S3: Estrich-Mischung HE 65 = C70-**F9**; Diamantbeton-Estrich = C70-**F9** | Verschiedene Bezugsgrößen (Hartstoff allein vs. Estrich mit Bindemittel). **Beide stehen, nicht harmonisieren.** Frank: welche Werte zeigt die Web-Produkttabelle? | Industrieboden |
| L3 | **WH-metallisch CT-Klasse** | SC + PT: Hartstoff C60-F12-A3 | BR S3: Estrich HE 65 metallisch C80-F11-A3 | Hartstoff- vs. Estrich-Klasse — wie L2, beide korrekt. | Industrieboden |
| L4 | **NEODUR Level Druckfestigkeit** | SC #344 Kennwert-Tabelle: **≥ 35** N/mm² (unter C40-Schwelle) | PT: **≥ 40** N/mm² (C40-konform) | PT hält 40 (C40). SC-Flag. TDS bestätigen. | Industrieboden |
| L5 | **MICROTOP DVGW-Norm-Set je Produkt** | SC #344: alle TW „W 270, W 300, W 347" | PT: nur TW 5 + TW BM tragen alle drei; TW 3/8/NSM/02 = W 300/347; TW VSM/Mineral = nur W 347 | **Pauschalaussage produktscharf falsch.** PT/TDS > SC. Frank bestätigt Set je Produkt. | Microtop |
| L6 | **MICROTOP TW NSD — existiert in Scrape, fehlt in PT** | SC #344 Anwendungstabelle: Zeile „TW NSD" | PT: kein `microtop-tw-nsd`; CLAUDE.md V3.6: eingestellt | PT autoritativ → in neuem Content **nicht führen**, außer Frank reaktiviert. | Microtop |
| L7 | **MICROTOP TW 5 Schichtdicke-Untergrenze** | SC #344: 10–30 mm | PT: 14–30 mm | TDS klärt (10 vs. 14 mm). | Microtop |
| L8 | **Festigkeitsklassen Vergussmörtel** | SC #344: VM 1/3 = C60/75; VB 8 = C60/75; SVM 03 = C45/55 | PT: VM 1/3 = C55/67; VB 8 = C55/67; SVM 03 = C50/60 (VM 5 deckungsgleich C80/95) | BR schweigt → kein Tiebreaker. PT/TDS final, aber **stille Auflösung verboten** → Frank/TDS. Trägt den Artikelkern „Verguss richtig planen". | Spezialmörtel (K1) |
| L9 | **DOT Europe 28-d-Druckfestigkeit** | MDX feuchte-whg: ≥ 60 N/mm² (28 d) | SC + PT: C35/45 (≈≥45), „belastbar nach 60 min", keine 60-N/mm²-28d-Angabe | Wert in PT/TDS gegenprüfen, MDX ggf. korrigieren. | Schadensbilder (K4) |
| L10 | **CEMENT ALL Tag `chemie-aggressiv`** | MDX-TODO: CEMENT ALL trage den Tag **nicht** | PT Z.519: `belastungenAbgedeckt: [..., "chemie-aggressiv"]` | **TODO veraltet** — PT (final) trägt den Tag. Frank: Grenzwerte/Quelle bestätigen. | Schadensbilder (K3) |
| L11 | **KOROMINERAL CURE Verbrauch** | MDX-TODO: „fehlt in Daten" | SC #344 industrieboden-6: **ca. 60–100 ml/m²**, pH 11 | Datenlücke in PT, kein Widerspruch. TDS abgleichen, in PT ergänzen. | Schadensbilder (K5), Industrieboden |
| L12 | **KOROPOX vs. KOROPOXY (Oberflächenschutz)** | BR #349 S3: „EP-Imprägnierung mit **KOROPOXY**" | SC #344: „**KOROPOX** — 2K-Epoxidharz"; MEMORY: KOROPOX eingestellt → „LI Plus" | Frank: Produktname/Status (eingestellt? Ersatz KOROMINERAL Li+). | Industrieboden |
| L13 | **HE 2 DIN-1100-Einordnung** | PT: HE 2 = CT-C70-F9-**A8** | BR S2: DIN 1100 Gruppe A = ≤6 → A8 außerhalb jeder Gruppe | Frank: vermutlich bewusst keine Gruppe (Einstreu-Basisqualität). | Industrieboden |
| L14 | **Katzenstreu Maßeinheiten Verpackung** | SC: Premium „5 l / 6 l / 8 l" | SC: Standard „5 kg / 10 kg / 20 kg" | Scrape-internes Flag. Vertrieb klären, **nicht still vereinheitlichen.** | Katzenstreu (K1) |
| L15 | **Katzenstreu Sortiments-Achse** | SC: Premium/Standard (mit Körnungen) | PT: drei goodcat-Marken (ohne Premium/Standard, ohne Körnung) | Achsen nicht deckungsgleich. PT autoritativ für App. **Mensch: welche Achse zeigt die Bereichsseite?** | Katzenstreu (K2) |

### 2.3 Redundanz-/IA-Konflikte (Doppelungen innerhalb der Vorschlagsliste)

| # | Doppelung | Vorschlag (nicht entschieden) |
|---|---|---|
| R1 | Verkehr/Infrastruktur 2× (Branchen-LP + Infrastruktur-Hub) | Branchen-LP als Verteiler, Tiefe aus Infrastruktur ziehen. |
| R2 | Pflaster mehrfach (Beton/Infrastruktur/Spezialmörtel/Branchen) | Eine führende Tiefen-Seite (Heimat offen, siehe G6), Rest verlinken. |
| R3 | „Gebundene Pflasterbauweise" (Ratgeber) + „Gebundene Pflasterdecke" (Absatz) | Zusammenlegen in die führende Pflaster-Seite. |
| R4 | Spritzmörtel-Heimat (VL: Betonsanierung; Quell-Prosa: Spezialbaustoffe-Scrape) | Eine Heimat, nicht doppelt bauen (K3 Spezialmörtel). |
| R5 | Hub-Struktur Schadensbilder 5 (MDX) vs. 6 (VL inkl. eigenständigem Frost/Tausalz) | Frank: Frost/Tausalz eigenes Schadensbild oder subsumiert. |

---

## 3. Frank/TDS-Klärliste (gebündelt, priorisiert)

**P0 — Live-Blocker (blockieren mehrere Pieces gleichzeitig):**

1. **HE 60 rapid Wiederinbetriebnahme 24 h vs. 48 h** (G1) — blockiert Sperrzeit, Betreiber-FAQ, „Neubau oder Sanierung?", Schadensbild-Abrieb-Refkacheln, Branchen-Industrie. **TDS + Frank.**
2. **HE 65 Plus Wiederbelastbarkeit 48 h vs. 7 d** (G2) — blockiert Hangar, Parkdeck, mehrere Schadensbild-Pieces. **Frank/Steffi, dann PT angleichen.**
3. **CO2-Werte + Bezugsbasis je Produkt** (G4) + „bis 4× langlebiger" (`faktencheck: true`, C6 Betonsanierung) — blockiert Rapid-Set-Technologie-Block, Wirtschaftlichkeit, Nachhaltigkeits-Track. **Frank/EPD.**

**P1 — blockiert je einen Kern-Artikel:**

4. **KOROCRETE belastbare Verkehrsfreigabe-Stundenzahl** (G3) — Infrastruktur-Conversion-Kern + KOROCRETE-Leitprodukt-Absatz.
5. **Festigkeitsklassen Vergussmörtel SC vs. PT** (L8) — Artikelkern „Verguss richtig planen"; ohne Auflösung kein belastbarer Bau.
6. **Frühbelastbarkeits-Kennwerte VM-/SVM-Reihe** (nur SVM 4 belegt) — „Verguss richtig planen" + „Schnellverguss vs. Standard".
7. **MICROTOP W-270/300/347-Zuordnung je TW-Produkt** (L5) — DVGW-Konformitäts-Absatz (zentrales Kaufargument).
8. **R-Klassen-Einstufung (EN 1504-3) je Produkt** (DOT/MSM/MSB) — EN-1504-Pflicht-Tischset; nur DOT belegt.
9. **DUROP-Kennwerte** (Belastbarkeit/Verkehrsfreigabe/Chlorid) ergänzen oder Aussage streichen — Parkdeck-Leitprodukt, Brücken-Mapping.
10. **Hartstoff-Klasse vs. Estrich-Klasse** (L2/L3) — welche Werte zeigt die Web-Produkttabelle?

**P2 — Einzelwerte / Sign-off:**

11. NEODUR Level 35 vs. 40 N/mm² (L4) — TDS.
12. DOT Europe 28-d-Druckfestigkeit (L9) — TDS.
13. KOROMINERAL CURE Verbrauch in PT spiegeln (L11) — TDS.
14. KOROPOX(Y)-Status / Ersatz (L12) — Frank.
15. MORTAR MIX 10 vs. 15 mm (G5) — TDS.
16. MICROTOP TW 5 Schichtdicke 10 vs. 14 mm (L7); TW NSD Status (L6) — TDS/Frank.
17. Silosystem-Tagesleistung 1.000–1.500 vs. 1.000–2.000 m² — Frank.
18. HE 2 DIN-1100-Einordnung (L13); EN-13813-Entschlüsselung + KS-Bedeutung — Frank-Web-Sign-off.
19. Einstreuung-„10-%-Dauerhaftigkeit" für Web freigeben (intern, nicht in BR) — Frank.
20. Brandklasse A1 je Rapid-Set-Produkt (Epoxid-Alternative-Absatz) — Leistungserklärung.

**P3 — fachliche Kernfragen Schadensbilder (fehlen ganz in den Quellen):**

21. Riss-Typologie + Rissbreiten-Sanierungsschwelle + Akzeptanzkriterien — Frank.
22. Chemie: pH-/Medien-/Konzentrations-/Einwirkdauer-Grenzen (ab wann Reaktionsharz Pflicht) — Frank.
23. WHG: abdeckendes Produkt + Normbezug (AwSV/TRwS/abP) + Z-Nummer HE 65 Plus — Quelle nötig.
24. Diagnose-Schwelle Absandung (imprägnierfähig vs. neue Verschleißschicht) — Frank.
25. Hub-Struktur 5 vs. 6 + Schadensbild→BelastungsTag-Mapping (Risse/Absandung ohne Tag) — Frank.

**P4 — Vertrieb/Marketing (nicht Frank/TDS):**

26. Echte Verguss-Referenzen beschaffen (K4 Spezialmörtel).
27. Schwerlast-Neubau-Referenz Industrieboden (alle Neubau-Tags sind Designböden).
28. TCO-/Lebensdauer-Zahlen (Jahre, Stillstandskosten €) — Marketing/Vertrieb.
29. Katzenstreu: Sortiments-Achse, Maßeinheiten, Private-Label-Konditionen, Aktualität Werks-/Mengenangabe + Testsiegel — Vertrieb.
30. Fehlende Flächen-/Kennwert-Felder in `referenzen.ts` (Fraport, DHL, Nike, Decathlon, Helipads, Hafen Catania, fahrbahnsanierung-wien) — Vertrieb/Notion.

---

## 4. Vierklang-Quellenabdeckung

Wo trägt welche Quelle — und wo sind Pieces unbelegt (Risiko):

| Bereich | Vorschlagsliste | Scrape #344 | Broschüre #349 | Wettbewerber #345 | Tragende Lücke (Risiko) |
|---|---|---|---|---|---|
| Industrieboden | 17 Pieces strukturiert | Klassifizierungstabellen, Prosa, Verbrauchswerte | **autoritativ** (S1–S4: Normen, Systemmatrix, 8-Kriterien) | White-Space Nr. 1 (Schicht-vs-Einstreuung), Cluster 4 Normen n=9 | Untergrund-Pillar/Prüfen/Vorbereiten/Estricharten: **nur Briefing**, keine Fachquelle |
| Betonsanierung | 11 Pieces | vollständige Kennwert-Tabellen Kernfamilie, FAQ, Additive | nur S1 (HE 3 green, USP) | EN 1504 Pflicht-Tischset (n=11) | R-Klassen je Produkt (nur DOT belegt); MSM/MSB Verarbeitung |
| Infrastruktur | 8 Pieces | **tragend** (5-schnellbetonsysteme, rapid-set, cross-sell) | **— (nichts)** | XF/EN 206 White-Space, ZTV-ING-Framing | XF-Klassen je Produkt; KOROCRETE-Freigabezeit; Brücken-Bauteile/ZTV-ING |
| Microtop | 6 Pieces | **asymmetrisch** (Trockenspritz voll, Nass leer/Cruft) | **— (nichts)** | DVGW White-Space (nur n=1 WB) | Nassspritz-Beschreibung; DVGW-Erklärinhalt; Sanierungs-Ablauf; Vergleich mineralisch/Epoxid/Edelstahl |
| Spezialmörtel | 7 Pieces | Verguss-Prosa, Use-Cases (Klassen-Konflikt) | **— (nichts)** | Format-Argument (Verguss = White-Space im Format) | Frühbelastbarkeit VM/SVM; gebundene-Bauweise-Prosa; **echte Verguss-Refs** |
| Katzenstreu | 4 Pieces | **einzige** Inhaltsquelle (mit Leer-Flags) | **— (nichts)** | außerhalb Bauchemie (nur falls Endkunden-SEO) | Private-Label-Detail (leer); Bentonit-Materialwissen (leer); **keine Refs in REF** |
| Schadensbilder | 9 Pieces, 6 MDX-Entwürfe | Produktwerte (Absandung industrieboden-6) | **autoritativ** (S2 Abrieb-Normen, S4 Frost CDF) | Riss-Typologie, Schadensursachen n=7, WHG-Abgrenzung | WHG (kein Produkt, kein Normbezug, keine Ref); Riss-Systematik; Chemie-Grenzwerte |
| Branchen | 9 Pieces, 7 MDX | Anwendungslisten je Produkt | **autoritativ** (S2: 16 Branchen + 21 Anwendungen) | Format-Bestätigung (Branchen-LP n=9/n=6/n=4) | Sektor-Default-Produktwahl (durchgängiger TODO); Tankstelle/Brauerei kein Draft |

**Pieces ohne tragenden Beleg (höchstes Risiko, NICHT vor Quelle/Frank bauen):**
- Untergrund-Pillar + Prüfen + Vorbereiten + Estricharten (Industrieboden) — nur Briefing.
- Mineralisch vs. Epoxid vs. Edelstahl (Microtop) — keine Faktenbasis, WB bewusst nicht gehoben.
- „Ihre Marke, unsere Produktion" + Material-Ratgeber (Katzenstreu) — Quell-Unterseiten leer.
- WHG-Flächen (Schadensbilder) — kein Produkt, kein Normbezug, keine Ref.
- Gebundene Pflasterbauweise (Spezialmörtel) — Produktkennwerte da, Verfahrensprosa fehlt komplett.

---

## 5. Priorisierte Build-Sequenz

Top-Liste aus VL §5 (Top-10), **geschnitten** mit (a) Quellen-Reife nach Vierklang (jetzt belegbar?) und (b) #345-White-Space. Höchster Hebel laut #345: **Hartstoffeinstreuung-vs-Schicht** (White-Space Nr. 1, durch BR S4 jetzt quellen-gedeckt) und **Verguss/halbstarre Deckschichten** (im Markt faktisch unbespielt). Reihenfolge ist Vorschlag.

**Welle 1 — sofort baubar (Quelle stark, kein P0-Blocker):**

1. **Hartstoffeinstreuung oder Hartstoffschicht? Der technische Vergleich** (Industrieboden, Ratgeber) — #345 White-Space Nr. 1; durch **BR S4** (8-Kriterien-Tabelle) von „entwurf" auf beleg-fertig gehoben. Mindest-Einstreumengen (3–5 / 6–8 kg/m²) durch BR S3 jetzt belegt. Restpunkt: 10-%-Dauerhaftigkeit-Kennzahl Frank-freigeben (P2-19), kein Blocker für den Rest.
2. **Normen und Klassen: EN 13813, Böhme, DIN 18560-7** (Industrieboden, Ratgeber) — größte Themenführer-Chance (#345 Cluster 4 n=9), Featured-Snippet. **BR S2** ist die fehlende autoritative Quelle (DIN 1100, DIN 18560-7 Tab. 1+6). Beste Quellen-Reife im ganzen Konzept.
3. **Abrieb und Verschleiß** (Schadensbilder, Ratgeber) — bestes Produkt-Referenz-Match im Cluster, am nächsten an Freigabe. Durch **BR S2** norm- und produktbelegt. Restpunkt: A-Wert-Konflikt ≤6 vs. ≤5 sauber trennen (L1, redaktionell lösbar).
4. **Trockenspritz oder Nassspritz?** (Microtop, Ratgeber) — Kern-Entscheidungsfrage, saubere Referenzdeckung (Haidberg/Bad Nauheim/Krottenbach). **Caveat:** Nassspritz-Beschreibung muss aus TDS/Frank gehoben werden (Scrape-Seite leer). Baubar mit Frank-Input zur Nass-Seite.

**Welle 2 — höchster strategischer Hebel, Quelle/Vertrieb parallel ziehen:**

5. **Verguss richtig planen** (Spezialmörtel, Ratgeber) — content-armer Markt, klare KORODUR-Stärke, #345 „Lücke ist das Format, nicht das Thema". **Aber:** Klassen-Konflikt L8 (SC vs. PT) ist der Artikelkern → erst Frank/TDS, dann bauen. Echte Verguss-Refs parallel vom Vertrieb (P4-26).
6. **Halbstarre Deckschichten: KOROPHALT** (Spezialmörtel, Ratgeber) — #345 „im Markt faktisch unbespielt → Themenführerschaft-Chance", **PT-Kennwerte vollständig** (beste Deckung im Bereich). Prio von „niedrig" auf höher hinterfragen. Sofort baubar.
7. **Verkehrsfreigabe in Stunden** (Infrastruktur, Ratgeber) — stärkster Conversion-Angle, echte Verkehrs-Refs. **Blocker:** KOROCRETE-Freigabezeit G3 (P1-4). Mit Frank-Zahl sofort baubar.
8. **Sanierung übers Wochenende** (Betonsanierung, Ratgeber) — stärkstes KORODUR-Differenzierungsmerkmal, Quellenlage stark (SC + MDX + Refs). Restpunkt: Produkt-Bereich-Spreizung G7 (IA, kein Inhaltsblocker).

**Welle 3 — Bereichs-Leads (Bereiche wirken sonst leer):**

9. **Bereichseinstieg Industrieboden + Bauweisen-Absatz** (Industrieboden, Absätze) — Kerngeschäft hat bisher nur Dictionary-Teaser; durch **BR S1/S2/S3** vollständig belegt. Heritage-Satz (750 Mio. m², seit 1936) Frank-gegenzeichnen.
10. **Trinkwasserbehälter sanieren mit MICROTOP TW System** (Microtop, Absatz) — Pflicht-Lead, DVGW-Positionierung. Restpunkt: Lead-Produkttrio schärfen (Verfahrens-Konsistenz), DVGW-Set je Produkt (L5, P1-7).
11. **Private-Label Katzenstreu + Sortiment** (Katzenstreu, Absätze) — Bereich wirkt sonst leer, aus Produktdaten ableitbar. **Vorab:** Sortiments-Achse (L15) und Maßeinheiten (L14) per Vertrieb entscheiden (P4-29).

**Zurückgestellt (erst nach Quelle/Frank):**
- Untergrund-Pillar-Cluster + Estricharten (nur Briefing, keine Fachquelle).
- WHG-Flächen + Risse + Chemie-Grenzen (fachliche Kernfragen ungedeckt, P3).
- Mineralisch vs. Epoxid vs. Edelstahl (Microtop) — Faktenbasis fehlt.
- „Ihre Marke, unsere Produktion" + Katzenstreu-Material-Ratgeber — Quellen leer, keine Refs.
- Verkehr-/Infrastruktur-Branchen-LP als Voll-Ratgeber (R1: nur Verteiler).

**Begründungs-Logik:** Welle 1 nutzt die durch BR #349 neu gedeckte Quellenstärke (Industrieboden/Schadensbilder) plus die referenzstarke Microtop-Verfahrensfrage. Welle 2 adressiert die zwei #345-White-Spaces mit höchstem Hebel (Verguss, KOROPHALT) und die stärksten Conversion-Angles — bewusst inklusive der Pieces, deren Blocker parallel auflösbar ist. Welle 3 füllt leere Bereiche mit niedrigem Aufwand. Alles, was an ungedeckten Fachfragen (P3) oder fehlenden Quellen hängt, ist zurückgestellt.

---

## 6. Checkpoint-Fragen an Steffi/Frank

Konkrete Entscheidungen, die VOR der Umsetzung fallen müssen:

1. **Wiederinbetriebnahme-Werte (P0):** Welcher HE-60-rapid-Wert ist das Kunden-Versprechen (24 h Datenblatt vs. 48 h Referenz)? Welcher HE-65-Plus-Wert gilt (48 h PT vs. 7 d Steffi-Setzung)? Wird PT danach angeglichen?
2. **CO2 / Lebensdauer (P0):** Welcher absolute CO2-Wert je Produkt und welche Bezugsbasis (HE 3 green EPD vs. Rapid-Set-Zement)? Bleibt „bis 4× langlebiger" oder wird es gestrichen? Gibt es belastbare TCO-/Lebensdauer-Zahlen vom Vertrieb?
3. **Pflaster-Heimat (IA, G6/R2/R3):** Wo lebt Pflaster führend — Infrastruktur oder Spezialmörtel? Werden die zwei Pflaster-Pieces zu einer Seite zusammengelegt?
4. **Verguss freigeben (Welle 2):** Welche Festigkeitsklassen gelten (SC vs. PT, L8)? Liefert der Vertrieb echte Verguss-Referenzen, oder bauen wir den Ratgeber referenzlos?
5. **Microtop DVGW (P1):** Welches W-270/300/347-Set trägt jedes TW-Produkt (Pauschal-Scrape vs. produktscharfes PT)? Bestätigung Lead-Produkttrio für den System-Absatz.
6. **Katzenstreu-Strategie:** Rein B2B-Private-Label (drei Bereichsabsätze + Trust/Nachhaltigkeit) oder Endkunden-SEO erschließen? Welche Sortiments-Achse zeigt die Bereichsseite (Premium/Standard vs. goodcat-Marken)?
7. **Schadensbilder-Struktur (R5/P3):** 5 oder 6 Schadensbilder (Frost/Tausalz eigenständig oder subsumiert)? Verbindliches Schadensbild→BelastungsTag-Mapping (Risse/Absandung haben keinen Tag)?
8. **Zurückgestellte Pieces:** Sollen die nur per Briefing belegten Untergrund-/Estricharten-Pieces gebaut werden, bevor eine Fachquelle vorliegt — oder warten wir auf Frank/Bestandswebsite?

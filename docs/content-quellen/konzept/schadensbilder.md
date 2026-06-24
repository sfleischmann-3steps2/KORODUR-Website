---
# Vierklang-Konsolidierung: Schadensbilder (Problem-First, quer)
**Quellen:** Vorschlagsliste · Scrape #344 · Broschüre #349 · Wettbewerber #345 · Repo-MDX · produkte.ts · **Issue #346**
**CLEAN:** jede Aussage quellen-belegt · Konflikte ausgewiesen (nicht gemergt) · Empfehlungen, keine Entscheidungen · Mensch-Checkpoint.

Bereich Schadensbilder = Problem-First-Strang quer zu Industrieboden/Betonsanierung/Infrastruktur. Vorschlagsliste §2 (Z. 111-123) führt 9 Pieces: 1 Hub-Ratgeber, 6 Schadensbild-Detail-Ratgeber, 2 Bereichsabsätze. Bestand: 6 MDX-Entwürfe (index/risse/abrieb-verschleiss/chemischer-angriff/feuchte-whg/absandung-festigkeitsverlust) — alle Status `entwurf`, Reviewer Frank Sander, gespickt mit `todo_frank`. Das Schadensbild "Frost-/Tausalz" ist Vorschlagsliste-Piece mit Status `luecke` (kein eigenes MDX).

---

## A. Content-Pieces (belegt)

| Piece | Status-Vorschlag | Quell-Belege (Datei › Abschnitt: Fakt) | Konflikte | Lücke (Frank/TDS) | Empfehlung |
|---|---|---|---|---|---|
| **Hub: Boden defekt? Erkennen Sie Ihr Schadensbild** | erweitern | • Repo-MDX `schadensbilder/index.mdx`: vorhanden, Status `entwurf`, listet 5 Schadensbilder + Verlinkung Lösungsfinder. • `data/types.ts` (via MDX-Frontmatter zitiert): BelastungsTags = schwerlast, verschleiß, staplerverkehr, chemie-treibstoff, chemie-aggressiv, hygiene, fleckschutz, optik, publikumsverkehr, frost-tausalz, whg. | **Konflikt Struktur:** MDX-Hub führt **5** Schadensbilder; Vorschlagsliste §2 führt **6** Detail-Ratgeber (inkl. eigenständigem Frost/Tausalz). Hub müsste auf 6 erweitert oder Frost/Tausalz bewusst subsumiert werden. | Frank-Klärung (im MDX `todo_frank`): finale 5er/6er-Liste fixieren; Risse + Absandung sind **keine** eigenen BelastungsTags im Standard → Mapping Schadensbild→Tag bestätigen; Slugs/Pfade der Detailartikel scharfschalten. | **frank-noetig** — Struktur (5 vs. 6) + Tag-Mapping vor Verlinkung klären; sonst bau-bereit. |
| **Risse: erkennen, einordnen, sanieren** | erweitern | • Repo-MDX `schadensbilder/risse.mdx`: Erscheinungsformen (Haarrisse, durchgehende Risse, Kantenausbrüche, Höhenversatz, Hohllagen). • Ref `helipad-sanierung-polen` (im MDX): Pull-Off bis 3,0 N/mm² vor Ort. • produkte.ts: neodur-he-65-plus, neodur-he-60-rapid, korocrete als Verbund-/Reparaturoptionen. • Wettbewerber #345 Cluster 5: "Rissinstandsetzung/Rissinjektion (EN 1504-5)" n=4; "Schadensbild Schüsseln/Rissbildung im Estrich" n=1. | **Konflikt Quelle:** MDX nennt 3,0 N/mm² explizit als referenz-spezifisch (Płock), **nicht** als allgemeinen Zielwert — darf nicht als generischer Akzeptanzwert dargestellt werden. | Frank (im MDX): verbindliche **Riss-Systematik** (Schwind-/Setzungs-/Last-/Biege-/Fugenriss) fehlt — nur teilbelegbar aus Refs; **Rissbreiten-Schwelle** für Sanierungspflicht (statisch vs. kosmetisch) "kein Wert in Repo-Daten"; Diagnose-Reihenfolge/Akzeptanzkriterien (Pull-Off/Bohrkern). | **frank-noetig** — Kerninhalt (Riss-Typologie + Schwellen) ist fachlich offen, nicht quellen-gedeckt. |
| **Abrieb und Verschleiß: Spurrillen, abgetragene Oberflächen** | erweitern | • Repo-MDX `schadensbilder/abrieb-verschleiss.mdx` (am nächsten an Freigabe, lt. Vorschlagsliste Top-10 §5.7). • **Broschüre #349 s2 › DIN 1100**: Hartstoffgruppen A ≤ 6 / M ≤ 3 / KS ≤ 1,5 cm³/50 cm². • **Broschüre #349 s2 › DIN 18560-7 Tab. 6 (Nenndicke)**: I schwer A≥15/M≥8/KS≥6; II mittel A≥10/M≥6/KS≥5; III leicht A≥8/M≥6/KS≥4 mm. • Broschüre #349 s2 › Tab. 1 (Beanspruchungsgruppen I/II/III, Bereifung Stahl/Vulkollan/Luft). • Broschüre #349 s4: Schichtdicke Einstreuung max. 1–2 mm vs. Schicht 10–15 mm. • produkte.ts neodur-he-65: Verschleiß A6 (≤6), Druck ≥70. • Scrape #344 industrieboden-1 Z.120-123: HE 60 rapid A6 / SVS3 A3 / SVS1,5 KS ≤1,5 cm³/50cm². | **Konflikt Wert (Gruppe-A-Grenze):** MDX schreibt "Gruppe A ... ≤ 5,0 cm³/50 cm²" und separat "EN-13813-Klasse A6 (≤ 6)". **Broschüre #349 s2 (autoritativ)** nennt DIN-1100-Gruppe A = **≤ 6** cm³/50 cm² (nicht ≤ 5). Quellen-Präzedenz: Broschüre > Scrape; der Scrape #344 führt produktbezogen ≤ 5 (HE 60 rapid). → Gruppe-A-**Klassengrenze** vs. **Produkt-Istwert** sauber trennen. | Frank (im MDX): Böhme-Prüfung explizit nennen (DIN 52108) oder reicht DIN 1100? cm³-Wert MORTAR MIX DUR fehlt in produkte.ts (nur "DIN 1100 A"); Wiederbelastbarkeit HE 65/Plus/40 (7 d, Steffi-Setzung) gegen TDS bestätigen; Beanspruchungs-Matrix nicht in Repo (jetzt aus Broschüre #349 s2 belegbar). | **bauen-bereit** (mit Frank-Sign-off) — Quellenlage durch Broschüre #349 stark; A-Wert-Konflikt vor Live auflösen. |
| **Chemischer Angriff: Öle, Treibstoffe, Säuren** | erweitern | • Repo-MDX `schadensbilder/chemischer-angriff.mdx`: trennt chemie-treibstoff (penetrierend) vs. chemie-aggressiv (säurelösend). • produkte.ts neodur-he-60-rapid: chemie-treibstoff abgedeckt, "Chemikalienbeständig". • produkte.ts rapid-set-cement-all/mortar-mix: belastungenAbgedeckt chemie-aggressiv. • Ref `texaco-tankflache-arnheim`: DOT Europe CONCRETE MIX, LAU/CUR-Empf. 63, Flüssigkeitsdichte. • Ref `klaranlage-nako`: CEMENT ALL gegen Säuren/Fäkalwasser (Projektbeleg). • produkte.ts koromineral-li: Imprägnierung Hybrid-Lithiumsilikat, Fleckschutz, ~40–100 g/m². • Wettbewerber #345 Cluster 5: "Hauptursachen Betonschäden (Karbonatisierung/Chlorid/Sulfat/AKR)" n=7; Cluster 7 "Chemikalien-/Medien-/Frost-Tausalz-Beständigkeit" n=3. | **Konflikt produkte.ts vs. Referenz:** CEMENT ALL trägt den Tag chemie-aggressiv in produkte.ts (Z.519) — MDX-`todo_frank` behauptet, CEMENT ALL trage diesen Tag **nicht** und werde nur über die Ref belegt. produkte.ts widerlegt das TODO. → TODO veraltet / Datenstand prüfen. | Frank (im MDX): konkrete Medienbeständigkeit (Säuretyp, Konzentration, Einwirkdauer, **pH-Grenze** ab der Reaktionsharz Pflicht ist) "fehlt in Repo-Daten"; WHG-Zulassungs-/Z-Nummer HE 65 Plus. | **frank-noetig** — Lastfall-Logik bau-bereit, aber pH-/Medien-Grenzen sind das fachliche Kernstück und ungedeckt. |
| **Feuchte und WHG-Flächen: Nassbereich, Auffang, Gefahrgut** | erweitern | • Repo-MDX `schadensbilder/feuchte-whg.mdx`: WHG = Wasserhaushaltsgesetz + AwSV; Belastungsbild whg/hygiene/chemie-aggressiv/chemie-treibstoff. • produkte.ts neodur-he-65-plus: whgZulassung:true, CT-C70-F9-A6, 15–30 mm, frost-/tausalzbeständig. • produkte.ts dot-europe-concrete-mix: EN 1504-3 (R4), C35/45, frost-/tausalz-/sulfatbeständig, chloridfrei. • Ref `fraport-frankfurt`: WHG-Beschichtung Containerstellplatz. • produkte.ts neodur-vm-basic + MICROTOP TW: DVGW W 270/300/347 (Trinkwasser, **nicht** WHG). • Wettbewerber #345 Cluster 8: "Boden-/Gewässerschutz WHG-/JGS-Flächen, Beständigkeit wassergefährdende Stoffe" n=3 (Normbezug WHG/AwSV); **#345-These: AwSV/TRwS vs. DVGW-Abgrenzung** ist echte Lücke. | **Konflikt Wert (DOT Europe Druckfestigkeit):** MDX feuchte-whg führt DOT Europe "Druckfestigkeit (28 d) ≥ 60 N/mm²" — produkte.ts/Scrape belegen C35/45 (≈ ≥45) und "belastbar nach 60 min". 60-N/mm²-Wert ist in produkte.ts **nicht** als 28-d-Wert hinterlegt → Wert prüfen. **Konflikt Norm:** MDX nennt für WHG **keinen** Normbezug (AwSV/TRwS/abP), produkte.ts ebenfalls leer. | Frank (im MDX, 6 TODOs): **kein dediziertes WHG-Beschichtungsprodukt** in den Daten — welches System bildet die WHG-dichte Oberfläche final ab? WHG-Normbezug (AwSV/TRwS/abP) fehlt komplett; Medien-/Lagerklassen + Prüfzeugnis HE 65 Plus; echte reine WHG-Referenz fehlt. | **frank-noetig** + **quelle-noetig** (WHG-Normbezug + abdeckendes Produkt). Positionierung bis dahin nur als tragender Untergrund. |
| **Absandung und Festigkeitsverlust** | erweitern | • Repo-MDX `schadensbilder/absandung-festigkeitsverlust.mdx`: Silikatisierung vs. neue Verschleißschicht. • **Scrape #344 industrieboden-6 › koromineral**: Imprägnierung Silikatbasis, Oberflächenverkieselung, Dichte 1,12, pH 11. • **Scrape #344 industrieboden-6 › koromineral-cure**: membranbildend + Silikatisierung, "Silikat dringt tief in Poren, reagiert mit freiem Kalzium", staubfest; Verbrauch **ca. 60–100 ml/m²**, pH 11. • **Scrape #344 industrieboden-6 › korotex**: Nachbehandlungsmittel gegen Austrocknung, DIN 18353/18560. • **Broschüre #349 s4 Fußleiste**: Nachbehandlung KOROTEX / Silikatisierung KOROCLEAN. • produkte.ts koromineral-li (~40–100 g/m²), koroclean (Reinigungsschliff). | **Konflikt Wert (KOROMINERAL CURE Verbrauch):** MDX-`todo_frank` sagt "keine quantitativen Kennwerte (Verbrauch) in Daten". Scrape #344 industrieboden-6 liefert **ca. 60–100 ml/m²** — Wert ist also in der Alt-Quelle vorhanden, fehlt nur in produkte.ts. → produkte.ts/TDS abgleichen, dann ergänzen. | Frank (im MDX): **Diagnose-Schwelle** (ab welchem Haftzug-/Abreißwert noch imprägnierfähig, ab wann neue Verschleißschicht) "nicht in Daten"; Bestätigung Silikatisierung saniert oberflächliche Absandung, nicht strukturell weichen Beton; echte Absandungs-Referenz fehlt (nur Verschleiß-/Oberflächenschutz-Refs). | **bauen-bereit** (mit Frank-Sign-off zur Diagnose-Schwelle) — Produkt-Quellenlage durch Scrape #344 gut; CURE-Verbrauch ergänzbar. |
| **Frost- und Tausalzschäden: Abplatzungen, Kantenausbrüche** | neu (Vorschlagsliste `luecke`) | • Vorschlagsliste §2 Z.121: Prods dot-europe-concrete-mix, rapid-set-mortar-mix, neodur-he-65-plus; Refs fahrbahnsanierung-wien, strassensanierung-wien, treppenstufen-sanierung. • **Broschüre #349 s4 (autoritativ)**: "Hartstoffschicht ist gemäß **CDF-Prüfverfahren** als frost-/tausalzbeständig einzustufen"; Einstreuung: "Frost-/Tausalznachweis aufgrund geringer Schichtdicke nicht erbringbar". • produkte.ts neodur-he-65-plus + dot-europe + cement-all + mortar-mix: alle frost-tausalz im belastungenAbgedeckt. • Wettbewerber #345 Cluster 5/8: "Expositionsklassen-System X/C/D/S/F/A/M (EN 206-1)" n=2; "Frost-Tausalz-Beständigkeit" n=3 → als Norm-Tiefe dünn = White-Space (Brief). | **Kein interner Konflikt** (kein MDX existiert). Inhaltlicher Bezug: Broschüre s4 liefert das **Schicht-vs-Einstreuung-Frost-Argument** als belegten Differenzierer. | Frank/Repo: XF-Expositionsklassen (XF1–XF4), CDF-Prüfverfahren-Bezug für die Produkte (nur Broschüre, nicht produktseitig in produkte.ts), Luftporen/Abwitterung. Vorschlagsliste §3 markiert "Verkehrsbeton-Expositionsklassen" separat als Lücke. | **neu** — bauen, Quellenlage solide (Broschüre #349 s4 + produkte.ts-Tags). Frost/Tausalz-Schwerpunkt liegt lt. Vorschlagsliste auf Infrastruktur; hier nur Schadensbild-Sicht, dorthin verlinken. |
| **Bereichsabsatz: Schadensbild-Einstieg auf Bereichsseite** | neu | • Vorschlagsliste §2 Z.122: Prods neodur-he-60-rapid, rapid-set-mortar-mix, korocrete; Refs kleemann-produktionshalle, monheim-produktionsflaeche, weag-entsorgungsbetrieb. • Speist sich aus dem Hub-MDX (Problem-First-Brücke). | — | — (Hub-Content nachgelagert; hängt an Hub-Struktur-Klärung). | **bauen-bereit** — kurzer Einstiegsabsatz, sobald Hub-Struktur (A.1) steht. |
| **Bereichsabsatz: Schaden-zu-Belastung-Logik** | neu | • Vorschlagsliste §2 Z.123 (von niedrig auf mittel angehoben): Prods neodur-he-65, koromineral-li, rapid-set-mortar-mix-dur; Refs lkw-waschstrasse, hafen-catania, strandkorbhalle-sylt. • Brücke Schadensbild → Lösungsfinder (BelastungsTag-Logik aus data/types.ts). | **Konflikt Methodik:** MDX-Hub-`todo_frank` warnt: Risse + Absandung sind **keine** BelastungsTags — die "Schaden-zu-Belastung"-Brücke greift für diese zwei Schadensbilder nicht sauber. | Frank: Mapping Schadensbild→BelastungsTag verbindlich (betrifft v.a. Risse/Absandung ohne eigenen Tag). | **frank-noetig** — Kern (Tag-Mapping) ist die offene Methodikfrage; ohne sie kein sauberer Lösungsfinder-Deeplink. |

---

## B. Neue Pieces aus den Quellen (Vorschlag)

Themen, die Broschüre/Scrape/Wettbewerber liefern und in der Vorschlagsliste §2 (Schadensbilder) **nicht** als eigenes Piece stehen. Vorschlag, kein Beschluss.

1. **Schicht-vs-Einstreuung als Schadens-Präventionslogik (Broschüre #349 s4).** Die autoritative Broschüre s4 ordnet 8 Kriterien (Schlag, Penetration flüssiger Medien, Frost/Tausalz, Schleifverschleiß, Druckfestigkeit u.a.) explizit als Schadensbezug Schicht vs. Einstreuung. Das ist die belegte Brücke "warum Einstreuung bei Schlag/Penetration/Frost an Grenzen kommt" → eigener erklärender Block, der mehrere Schadensbilder (Abrieb, Chemie-Penetration, Frost) speist. Heute nur im Industrieboden-Cluster (einstreuung-vs-schicht), nicht aus Schadens-Sicht.
2. **Schadensbild "Schüsseln/Verwölbung im Estrich" (Wettbewerber #345 Cluster 5, n=1).** Eigenständiges Schadensbild bei Wettbewerb, im KORODUR-Strang nicht geführt (geht in Risse-MDX nur am Rand als "aufschüsselnde Kanten" auf). Prüfen, ob eigenes Mini-Schadensbild oder Unterabschnitt Risse.
3. **Karbonatisierung / Bewehrungskorrosion als Ursachen-Block (Wettbewerber #345 Cluster 5, n=7).** Stärkstes Markt-Schadensursachen-Thema (Karbonatisierung, Chlorideintrag, Sulfatangriff, AKR + Bewehrungskorrosion, EN 1504). Im Schadensbilder-Strang gar nicht adressiert; gehört fachlich zwischen Risse und Chemie. Hinweis: EN 1504-7 Bewehrungs-Korrosionsschutz ist kein eigenes KORODUR-Produkt (Vorschlagsliste/#345 E weist das als Grenze aus) → als Ursachen-/Diagnose-Wissen, nicht als Produkt-Piece.
4. **Schadensbild-Diagnostik / Riss-Typologie als Featured-Snippet-Tabelle (Wettbewerber #345 C 5/9 + Brief).** #345 nennt Riss-Typologie + Schadensbild-Diagnostik (zerstörungsfrei vs. zerstörend) als Vergleichsthema. Eine "Riss-Typ → Ursache → Maßnahme"-Tabelle ist Snippet-Kandidat — deckt zugleich Franks offene Riss-Systematik ab.
5. **AwSV/TRwS vs. DVGW-Abgrenzung als eigener Erklärblock (#345 C8 + feuchte-whg-MDX-TODO).** Beide Quellen markieren die saubere Trennung WHG (AwSV/TRwS, wassergefährdende Stoffe) ↔ Trinkwasser (DVGW W 270/300/347) als unterversorgt. Schon als TODO im feuchte-whg-MDX; als eigener Normbezug-Block heben.
6. **Normen-Mini-Pillar Verschleiß (Broschüre #349 s2 → DIN 1100 / DIN 18560-7 Tab. 1+6 / EN 13813).** Die Broschüre liefert vollständige Normtabellen (Hartstoffgruppen, Beanspruchungsgruppen, Nenndicken). Das ist ein eigenständiger Normen-Pillar-Kandidat (auch in Industrieboden-Cluster relevant — Doppelnutzung), nicht nur Abrieb-Unterabschnitt.

---

## C. Konflikte in diesem Bereich (Quellen gegenübergestellt)

**K1 — NEODUR HE 60 rapid Wiederbelastbarkeit (mehrfach widersprüchlich).**
- Scrape #344 industrieboden-1 Z.111: "Belastbar bereits nach **48 Stunden!**"
- Scrape #344 industrieboden-1 Z.183: "nach **3 Stunden begehbar und nach 24 Stunden nutzbar**" — und Z.190 trägt selbst den ⚠️-Flag (Widerspruch roh belassen).
- produkte.ts (Z.171-172): `belastbarNach: "24 h"`, begehbar "ca. 3 h".
- Repo-MDX abrieb-verschleiss: Fließtext "voll belastbar nach ca. 24 h"; **aber** Ref-Kachel Kleemann "Voll belastbar nach **48 h**" — interner MDX-Widerspruch.
- Präzedenz: produkte.ts/TDS sind final autoritativ → 24 h (begehbar 3 h). Die 48-h-Angaben (Alt-Site + Kleemann-Kachel) widersprechen. **Nicht still auflösen** — Frank/TDS bestätigen; Kleemann-Kachel ggf. referenz-spezifisch (Schichtdicke 15 mm) erklären.

**K2 — DIN-1100-Gruppe-A-Schleifverschleißgrenze: ≤ 6 vs. ≤ 5 cm³/50 cm².**
- Broschüre #349 s2 (autoritativ): Gruppe A = **≤ 6** cm³/50 cm² (Klassengrenze).
- Repo-MDX abrieb-verschleiss: "Gruppe A ... Schleifverschleiß **≤ 5,0** cm³/50 cm²".
- Scrape #344 industrieboden-1 Z.120: HE 60 rapid (Gruppe A) **≤ 5** cm³/50 cm² (Produkt-Istwert).
- Auflösung-Vorschlag (Frank): Klassengrenze (≤ 6, EN 13813 A6 / DIN 1100 Gruppe A) sauber vom Produkt-Istwert (HE 60 rapid ≤ 5) trennen. Präzedenz Broschüre > Scrape für die Norm-Aussage.

**K3 — CEMENT ALL Tag chemie-aggressiv: TODO vs. produkte.ts.**
- Repo-MDX chemischer-angriff `todo_frank`: CEMENT ALL trage **keinen** eigenen chemie-aggressiv-Tag, nur über Referenz belegt.
- produkte.ts Z.519: `belastungenAbgedeckt: [..., "chemie-aggressiv"]` für rapid-set-cement-all.
- → TODO ist veraltet; produkte.ts (final autoritativ) trägt den Tag. Frank: Grenzwerte/Quelle für chemie-aggressiv-Eignung bestätigen.

**K4 — DOT Europe CONCRETE MIX 28-d-Druckfestigkeit.**
- Repo-MDX feuchte-whg: "Druckfestigkeit (28 d): **≥ 60 N/mm²**".
- Scrape #344 rapid-set + produkte.ts: Klasse **C35/45** (EN 1504-3 R4), "belastbar nach 60 min" — keine 60-N/mm²-28d-Angabe.
- → Wert in produkte.ts/TDS gegenprüfen, MDX ggf. korrigieren.

**K5 — KOROMINERAL CURE Verbrauch: "fehlt" vs. vorhanden.**
- Repo-MDX absandung `todo_frank`: "Eindringtiefe, Härteanstieg und **Verbrauch** fehlen".
- Scrape #344 industrieboden-6: KOROMINERAL CURE Verbrauch **ca. 60–100 ml/m²**, pH 11.
- → Wert existiert in Alt-Quelle, fehlt in produkte.ts. TDS abgleichen, dann ergänzen (kein echter Widerspruch, nur Datenlücke in produkte.ts).

**K6 — Hub-Struktur 5 vs. 6 Schadensbilder.**
- Repo-MDX index.mdx: **5** Schadensbilder (Frost/Tausalz fehlt als eigene Kachel).
- Vorschlagsliste §2: **6** Detail-Ratgeber inkl. eigenständigem Frost-/Tausalz-Piece.
- → Frank entscheidet: Frost/Tausalz eigenes Schadensbild oder unter Chemie/Risse subsumiert (so im Hub-TODO formuliert).

---

## D. Quellenabdeckung & Frank/TDS-Klärbedarf

**Quellenlage stark:**
- **Abrieb/Verschleiß** — durch Broschüre #349 s2 (DIN 1100 Hartstoffgruppen, DIN 18560-7 Tab. 1+6 Beanspruchung×Nenndicke) + produkte.ts-Kennwerte vollständig norm- und produktbelegt. Bestes Match im Cluster (Vorschlagsliste §5.7).
- **Frost/Tausalz** — Broschüre #349 s4 liefert mit CDF-Prüfverfahren + Schicht-vs-Einstreuung-Argument einen autoritativen Differenzierer; produkte.ts-Tags decken die Produktauswahl.
- **Absandung (Produktseite)** — Scrape #344 industrieboden-6 (KOROMINERAL/CURE/KOROTEX/KOROCLEAN inkl. Verbrauchswerten) gut belegt.

**Quellenlage dünn / Lücke:**
- **WHG-Flächen** — kein dediziertes WHG-Beschichtungsprodukt in produkte.ts, **kein** WHG-Normbezug (AwSV/TRwS/abP) in den Daten, keine reine WHG-Referenz. Größte Lücke des Clusters (feuchte-whg = 6 offene Frank-TODOs). #345 bestätigt AwSV/TRwS/DVGW-Abgrenzung als echte Markt-Lücke (Chance).
- **Risse-Systematik** — Riss-Typologie + Rissbreiten-Schwelle nicht in Repo-Daten; rein fachlich (Frank). Kerninhalt des Pieces hängt komplett an Frank.
- **Chemie-Grenzwerte** — pH-/Medien-/Konzentrations-Grenzen (ab wann Reaktionsharz Pflicht) fehlen; fachlicher Kern ungedeckt.

**Frank/TDS-Sammelklärbedarf (konsolidiert):**
1. HE 60 rapid Wiederbelastbarkeit final: 24 h vs. 48 h (K1) — TDS.
2. DIN-1100-Gruppe-A-Grenze ≤ 6 (Broschüre) vs. ≤ 5 (MDX/Scrape) — Klasse vs. Istwert trennen (K2).
3. CEMENT-ALL-chemie-aggressiv-Beleg/Grenzwerte; TODO veraltet (K3).
4. DOT Europe 28-d-Druckfestigkeit verifizieren (K4) — TDS.
5. KOROMINERAL-CURE-Kennwerte (Verbrauch 60–100 ml/m² aus Scrape; Eindringtiefe/Härte) in produkte.ts/TDS spiegeln (K5).
6. Hub-Struktur 5 vs. 6 Schadensbilder + Schadensbild→BelastungsTag-Mapping (Risse/Absandung ohne eigenen Tag) (K6).
7. WHG: abdeckendes Produkt + Normbezug (AwSV/TRwS/abP) + Z-Nummer HE 65 Plus + reine WHG-Referenz — Quelle nötig (TDS/Notion/Vertrieb).
8. Risse: verbindliche Typologie + Rissbreiten-Sanierungsschwelle + Akzeptanzkriterien — Frank.
9. Chemie: pH-/Medien-/Konzentrations-/Einwirkdauer-Grenzen — Frank.
10. Diagnose-Schwelle Absandung (Haftzug-/Abreißwert imprägnierfähig vs. neue Verschleißschicht) — Frank.
---

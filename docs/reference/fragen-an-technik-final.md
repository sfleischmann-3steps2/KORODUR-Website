# Fragen an die Technik — Stand 2026-06-18 (konsolidiert, alle Projekte)

Dies ist der **eine aktuelle Snapshot** der offenen fachlichen Fragen an die KORODUR-Technik, konsolidiert und dublettenfrei aus allen Projekten: Website, Produktdatenbank (PDB-Ontologie / Werteklassen), Lösungsfinder und Normen & Richtlinien.

**Nur was wir nicht selbst beantworten können steht hier.** Allgemeine Norm- und Standardfakten (Böhme-Verschleißklassen, DIN 1100, EN 206, DIN EN 13813, WHG-Dichtheit, DVGW, RStO 12, TL BEB-StB, EN 1504-3, EN 1015-11, EN 934-2, A1fl/CWFT) haben wir selbst recherchiert und verifiziert, siehe **„Selbst geklärt"** am Ende und `data/normenGlossar.ts` / `docs/reference/technik-blocker-konsolidiert.md`.

Spiegel im Repo: diese Datei. Notion: zentrale Seite „Fragen (zentral) an Technik" → diese datierte Sub-Seite. Ältere Projektseiten werden archiviert.

---

> **Gegencheck Erkenntnisseite (2026-06-18):** Mehrere Punkte unten sind auf der zentralen Erkenntnisseite „🧭 Erkenntnisse aus Technik-Terminen & Recherchen" bereits (teil-)beantwortet — beim Final-Abgleich streichen oder dorthin verweisen:
> - **Varianten-Modell (Abschnitt 3):** Mutter/Tochter-Regel geklärt (Erkenntnis A1, Option 2: Mutter = Standard-Variante; HE 3/HE 65/HE 40 als Mütter, „green" eigene Linie).
> - **Werteklassen (Abschnitt 2):** A/B/C/D/E mit Produktart-Zuordnung definiert (Erkenntnis B3).
> - **Projektart / Anwendungsphase (Abschnitt 2):** Regel „ergibt sich aus der Produktart" — Einstreuung = Neubau, Schicht = beides, Rapid Set + Microtop = Sanierung-only (Erkenntnis C4). Reduziert die referenzlosen Projektart-Fälle erheblich.
> - **Pflichtfelder / Belastbarkeit (Abschnitt 4):** zeitpunktbezogenes Modell + Stützpunkt-Raster + Sterne-Idee (Erkenntnis K1–K5).
> - **Dichte-Feld (Abschnitt 4):** vermutlich streichen (Erkenntnis L). **Sulfat/Chlorid:** Default-Hinweis, keine Property (Erkenntnis M).
> - **Haftbrücken-Logik (Abschnitt 2):** wann erforderlich + n:m-Relation geklärt (Erkenntnis I); offen bleibt nur die konkrete Produkt-Haftbrücke-Zuordnung.

## 1. Sortiment, Aufräumen & Strategie

- **KOROPOX-Ersatz:** Welches Produkt/System empfehlen wir künftig für Öl-/Treibstoffbeständigkeit auf intakten Zementböden, oder ersatzlos streichen?
- **CONCRETE MIX behalten oder ersetzen** durch DOT Europe CONCRETE MIX (Vertrieb)? Standard-vs-Premium-Trennung der Reparaturmörtel (CEMENT ALL Standard/Plus, MORTAR MIX) klären.
- **Asphalt-Sanierung im Scope** der App (ASPHALT REPAIR MIX, eigene Einstiegsoption) oder out of scope?
- **Karteileichen-Review (18 Einträge „Kein Produkt"):** je Eintrag löschen / auslagern (Rohstoffe wie 0/4, WH-Spezial, Diamantbeton, VS 0/5, DUROP; Fremdprodukte CyBe/inoCOMB/OBTEGO/GRAMMADUR; Equipment Silosysteme; Sammeleinträge SYSTEM KOROCRETE/RAPID SET) / behalten + klassifizieren.
- **Bestätigen:** KORODUR führt keine Reaktionsharz-Beläge (Stamm-Empfehlung für solche Anfragen?).
- **Strategie (eher Steffi/Vertrieb):** AT/CH-Vertriebspartner + länderspezifische Konformitäten; nächste Exportprioritäten nach DACH; Mitgliedschaften (BEB/DBV/IBU/GEV/DGNB/ACI) für Logo-/Richtliniennutzung.

## 2. Produktart & Werteklassen (PDB-Ontologie-Klassifizierung)

- **Werteklassen-Branding-Dokument:** Gibt es eine vollständige interne Definition der KORODUR-Werteklassen A/B/C/D/E/F mit Produktgruppen-Zuordnung? F-Klasse als erweiterte Optionsliste oder zwei getrennte Properties (EN 13813 / DIN 18560-7)?
- **11 unklare Produktart-Fälle** (jeweils unser Vorschlag in Klammern): SM SVS 5 1,5/3 (Sichtestrich?), DM DRAINMÖRTEL (Vergussmörtel?), AM Super/Plus (Reparaturmörtel?), MSM 3 (Spritzmörtel?), PFM-ZE / PFM 1K Easyfix (Vergussmörtel?), FSCem / FSCem Basic (Industrieestrich?), LevelFlor (Sichtestrich?), KOROTAN (Oberflächenvergütung?).
- **Neue Produktart-Namen freigeben:** Pflasterfugenmörtel, Bodenausgleichsmasse, Konstruktiver Schnellbeton, TW-Beschichtungsmörtel, Estrich-Bindemittel, Sonstiges. Danach ~17 alte `Archiv - …`-Optionen löschbar.
- **Werteklasse-Randfälle:** Spritzmörtel MSM/MSB als C bestätigen? TRU als Hartstoffbasis (A)? Grenzfälle B vs. C (Reparatur- parallel als Vergussmörtel)? Trinkwasser-Familie als Anwendungs-Override der materialbasierten Produktart?
- **Projektart Neubau/Sanierung je Produkt (#83):** Wir haben das App-seitig datengetrieben gelöst (Ableitung aus Referenzen + Notion-Override). Offen bleibt nur die fachliche Bestätigung der **Klärfälle** (siehe Sub-Seite „Projektart-Klärfälle"): 3 Konflikte (MORTAR MIX, GRANIDUR, PFM 1K), DUROP-Vorschlag, 20 referenzlose Produkte klassifizieren.

## 3. Varianten-Modell (Mutter/Tochter)

- **Allgemeine Regel:** Wann ist etwas eine Variante vs. ein eigenständiges Produkt (bisher undefiniert, teils strategisch)?
- **Konkrete Bestätigungen:** HE 3 (Mutter SVS 5, Töchter SVS 1,5/3/metallisch, „green" eigenständig?); Verguss (VB 8 eigene Mutter? Ankermörtel von SVM/USM trennen?); Familie-vs-getrennt je Cluster (MICROTOP TW 3/5/8, FSCem/FSCem-Screed, KOROMINERAL-Familie, HB 5/HB 5 rapid, AM Super/Plus, MSM/MSB).
- **Farbvarianten** (eigene Seiten oder On-Page-Auswahl), **SKU-/Artikelnummer-Quelle** je Variante, **Alt-Slugs** ohne App-Produkt (neodur-level-au, koromineral-li): Variante, umbenannt oder eingestellt? CONCRETE PHARMACY eigener Datensatz oder Gruppierungselement?

## 4. Pflichtfelder & Datenmodell-Konventionen (fachliche Sinnhaftigkeit)

- **Festigkeits-Stützpunkt-Raster** (1h/3h/24h/7d/28d) portfolioweit verbindlich, 24 h Pflicht? 28d-Wert doppelt oder aus Zeitreihe abgeleitet?
- **Abbindelogik:** Erstarrungsbeginn vs. -ende als getrennte Pflichtfelder; sind Archiv-Werte noch gültig?
- **„Belastbar nach"** nach Lastart aufschlüsseln (begehbar/befahrbar/voll)?
- **Materialverbrauch-Leiteinheit verbindlich** (kg vs. kg/mm vs. kg/m²) — verhindert Faktor-1000-Fehler im Rechner.
- **Verarbeitungstemperatur:** nur Untergrenze (≥5 °C) oder auch Obergrenze (BCSA-Hitzefenster)? **W/Z vs. l/Sack**-Konvention. **Verguss-Min-Schichtdicke** automatisch 3× Größtkorn oder pro Produkt?
- **DVGW-Property** nur bei TW-Produkten oder portfolioweit als Multi-Select? **Dichte/Rohdichte-Feld** behalten (16 Produkte tragen Archiv-Werte) oder droppen?
- **Additive:** Wirkungstyp-Liste abschließend? Dosierung als Menge + Bezug? Kompatibilitätsmatrix Additiv × Mörtel? **Einsatzbereiche-Vokabular** klassenübergreifend harmonisieren?
- **Normen-Felder:** Leitnorm- vs. Vollnormen-Trennung; Relation „gültige Normen" kanonisch?

## 5. Firmenspezifische TDS-/DoP-Werte & Diskrepanzen

- **HE 65 — A6 (TDS) vs. A5 (DoP):** was gilt für Ausschreibungen, Absicht oder Fehler? **HE 65 Plus** eigene DoP? Hartstoff-Zuschlag (Gruppe A/M/KS) in den SVS-Varianten (HE 3 SVS 1,5, HE 60 rapid SVS 1,5, HE 65 Plus SVS 3)?
- **Belastbarkeits-Zeiten gegen finale TDS:** HE 40 (3 d?), DOT Europe (1 h?), Rapid-Set-Schnellbeton (2 h?), HE 65 Plus (48 h vs. 7 d), HE 65/HE 40 belastbarNach (7 d vs. 24 h).
- **TRU PC** Festigkeitsverlauf (App 19/34/48 vs. TDS 20/34/45); **TRU SP / TRU PC** eigene TDS-Volltexte.
- **easyFinish/nanoFinish:** Dichte-Einheiten im offiziellen TDS fehlerhaft (1,0 kg/m³) — TDS-Korrektur.
- **EPD:** welche Produkte haben veröffentlichte EPDs (Programmhalter), GRANIDUR BIANCO/NERO „Gruppen-EPD" belegen oder streichen; FSCem-Festigkeit mischungsabhängig (1:4/1:5/1:6) erfassen.
- **NEODUR Level:** Emissions-/Rutsch-Kennwerte (AgBB, EMICODE, DIN 51130 R-Klasse, GISCODE). Welche Produkte >1 M.-% organisch und wie ist dort die Brandklasse deklariert?
- **DVGW W 347** für MICROTOP TW: gültiges Prüfzeugnis (Nummer/Stelle)? **ETA** für das Rapid-Set-CSA-Bindemittel oder nur Vermarktung über die fertigen Mischungen?
- **HE 3 green:** Stand 06/2024 aktuell? Innen-Beschränkung fachlich (CO₂-Rezeptur) oder unvollständig? „-50–60 % CO₂"-Aussage belegbar?

## 6. Lösungsfinder-Produkt-Tags (V2.6 Sign-off)

- `verschleiss` bei Rapid Set CEMENT ALL haltbar? `hygiene` bei HE-Estrichen + KOROCRETE setzen? KOROCRETE nur frost- oder auch tausalzbeständig? `whg`/`hygiene` bei MORTAR MIX / MORTAR MIX DUR berechtigt?
- NEODUR Level auch für punktuelle Reparaturen wählbar? DOT Europe CONCRETE MIX für punktuelle Instandsetzung ergänzen?

## 7. Referenz-Fakten (was wirklich verbaut/passiert ist)

- **#258** belastbare Liste „Referenz → eingesetzte Produkte".
- **#198** welche der 51 nicht-online-Referenzen dürfen veröffentlicht/anonymisiert werden, plus Kurz-Writeups.
- **#205** Produktionshalle Guben vs. „Sanierung einer Sanierung" dasselbe Projekt?
- **WHG-Cluster:** LKW Waschstraße / TEXACO Arnheim / Hafen Catania als Umwelt-&-WHG; Helipad als Infrastruktur korrekt?
- **Helipad Płock** Pull-Off „bis 3,0 N/mm²" — Messprotokoll oder Zahl entschärfen? **Strandkorbhalle Sylt** Haftbrücke „KORODUR HB 5" (non-rapid) vs. „HB 5 rapid"?

## 8. Zertifizierung & Normen-Positionen

- **Externer Sachverständiger**, der KORODUR-Norm-Aussagen gegenliest (Vertrag oder ad hoc)?
- **EN-1504-Revision (CEN/TC 104):** verfolgt KORODUR den Stand, mit welchem Zeithorizont? Position zum Ausgang der Normenkontrollverfahren BY/NRW gegen die TR Instandhaltung?
- **Entscheidungen auf geklärter Norm-Basis** (Norm-Fakt steht, Entscheidung bei euch): R-Klassen (EN 1504-3 R1–R4) zusätzlich zur C-Klasse auf den Rapid-Set-/Reparaturmörteln deklarieren? **A1fl-Brandklasse** portfolioweit via CWFT (96/603/EG) für mineralische Produkte deklarieren (nur 3 von 74 TDS tragen aktuell eine Brandklasse)? E-Modul an die EN-1504-Methodenklasse koppeln (R3/R4)? Additive (SET/FLOW Control, FAST) als eigenständig verkauft → EN 934-2 + CE/DoP?

## 9. Fachartikel-Freigabe

- **Finale fachliche Freigabe** der 14 Fachartikel-Entwürfe (Schadensbilder, Branchen, Ratgeber). Die googelbaren Norm-/TDS-Faktenfehler haben wir bereits korrigiert (Faktencheck-🔴).
- **Marketing-Claim** „Risse hundertfach saniert" durch belegte Projektzahl stützen oder auf „vielfach" umstellen?

---

## Selbst geklärt (kein Technik-Bedarf, zur Info)

Diese standen teils als Fragen im Raum, sind aber öffentliche Norm-/Standardfakten, die wir selbst recherchiert und adversarial verifiziert haben:

- **Böhme-Verschleißklassen:** A1,5 = höchste/beste (cm³/50 cm², kleiner = besser), A6 = Mittelfeld. Klasse aus DIN EN 13892-3/13813, nicht DIN 18560-7.
- **DIN 1100:** Gruppen A/KS/M; Grenzwert Gruppe A ≤ 5,0 cm³/50 cm². Hartstoffestrich (DIN 18560-7) vs. Trockeneinstreuung (DIN 18560-3/-4).
- **EN 206:** „C44/55" existiert nicht (→ C45/55). **EN 1015-11** = Prüfverfahren, keine Klasse.
- **EN 1504-3:** Klassen R1–R4, R4 = höchste (≥ 45 N/mm², strukturell). Für unter die hEN fallende Produkte sind CE-Kennzeichnung + DoP nach BauPVO Pflicht.
- **A1fl ohne Prüfung (CWFT):** Mineralische/anorganische Produkte mit **homogen verteiltem organischem Anteil ≤ 1,0 M.-%** sind nach Kommissions-Entscheidung 96/603/EG (heute im CPR-Rahmen via VO 2016/364) ohne weitere Prüfung als A1/A1fl klassifizierbar. Polymermodifizierte Mörtel über 1,0 M.-% brauchen eine Prüfung nach EN 13501-1. *(Verifiziert 2026-06-18; die Deklaration bleibt eure Entscheidung.)*
- **EN 934-2:** Betonzusatzmittel sind harmonisiert; eigenständig in Verkehr gebracht gelten CE + DoP. *(Ob KORODUR sie standalone vertreibt, ist intern.)*
- **WHG-Dichtheit** über Eindringtiefe e72 (DAfStb BUmwS), keine 10-mm-Pauschale. **DVGW** W 270 / W 347 / W 300-Reihe. **RStO 12** Bk100–Bk0.3; **TL BEB-StB** ohne Verkehrsklassen. **ASTM C928** = US-Norm (R1/R2/R3).

*Quellen + Details: `data/normenGlossar.ts`, `docs/reference/technik-blocker-konsolidiert.md` (Teil B), `docs/reviews/2026-06-15-fachartikel-faktencheck.md`. Stand 2026-06-18.*

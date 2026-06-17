---
Erstellt: 2026-06-17
Typ: Wettbewerbsanalyse / Review
Issue: #110 (Varianten-PDP)
Methode: Dynamic Workflow (14 Agenten, 4 Wettbewerber je discover->analyse->verify, KORODUR-Baseline parallel, Synthese). Alle Wettbewerber adversariell verifiziert (Verdict confirmed, hohe Konfidenz).
Quellen: Live-Wettbewerberseiten (Sika deu/che.sika.com, ARDEX/PANDOMO ardex.de, Mapei mapei.de, Chemotechnik Abstatt chemotechnik.de), Repo-Datenmodell, korodur.de-Scrape-Archiv.
---

> Hinweis: Wettbewerber-Identitaeten aus der Voice-Eingabe abgeleitet und im Workflow bestaetigt: ADEX = ARDEX, MAPAI = Mapei. Kosmetische Verify-Korrekturen (Farbzaehlungen, eine tote environdec-URL bei Mapei) aendern die Kernaussagen nicht.

# Analyse-Report: Variantentiefe PDP — Wettbewerb vs. KORODUR

## 1. Kernaussage

Best Practice im Markt ist die **Produktfamilien-Architektur mit eigener Seite je benannter Ausführung** (ARDEX/PANDOMO, Mapei) — Farbvarianten bleiben dabei meist Listung, technische Ausführungen (N/S/SP, HE 3 metallisch/green/SVS) bekommen eigene URLs. Keiner der vier Wettbewerber liefert echte variantenspezifische TDS oder echte variantenspezifische Bilder; das ist überall die Schwachstelle. Genau hier liegt unsere Chance: Die **alte korodur.de hatte bereits pro Variante eigene Seiten mit use-case-passenden Bildern und eigener Qualitätsklasse/SKU** — ein Asset, das die heutige App durch das Kollabieren aller Varianten in eine Tabelle am Stammprodukt aufgegeben hat (Issue #110). Wir empfehlen, das Familien+Varianten-Modell wieder einzuführen, aber sauberer als der Wettbewerb: eigene Route + eigenes use-case-Bild + perspektivisch eigenes TDS je Variante, gebündelt unter einer Familienseite. Konstruktiv ist das ein mechanischer, gut abgrenzbarer Daten-/Routing-Umbau, kein Architektur-Risiko.

## 2. Vergleichsmatrix

| Anbieter | Varianten-Strategie | Bilder pro Variante | TDS pro Variante | On-Page-Infotiefe | Dokumenten-Set | Auffällige UX-Patterns |
|---|---|---|---|---|---|---|
| **Sika** (verifiziert) | Eine PDP, Farben/Gebinde nur als Fließtext, kein Selektor | Nein (1 Packshot) | Nein (1 Familien-TDS) | Hoch: vollständige Technik-Tabelle, Verbrauch, Untergrund (w/b, Mindestdruckfestigkeit), eigener Applikations-Tab | TDS, SDS, DoP (EN 13813); bei Beschichtung zusätzlich DIBt, Verwendbarkeitsnachweise, EPD | 4-Tab-Struktur (Übersicht/Produktdetails/Applikation/Dokumente); starker Dokumente-Tab mit Typ/Größe/Sprache; kein Selektor, kein Rechner |
| **ARDEX / PANDOMO** (verifiziert) | Familienseite + eigene Varianten-URLs (18 Farben, filterbares Raster); bei A 38 nur Tabellenzeilen | Nein (generische Familienbilder `FLOOR18_Flat`) | Nein (Familien-Doks „White" auf jeder Variante gespiegelt) | Hoch: Technik-Tabelle mit 1/7/28-d-Werten, Bedarfsrechner + Aufbauberater auf ardex.de | TDS, SDS, DoP, EPD (~3 MB), EMICODE-Lizenz, Nachhaltigkeitsdatenblatt; DoP-Inkonsistenz zwischen Domains | Filterbares Farbraster (7 Filterkategorien), „mehr laden", Bedarfsrechner, Aufbauberater, Referenz-/Projektgalerie mit Designer-Credit |
| **Mapei** (verifiziert) | Eine PDP je benanntem Produkt (N/S/SP, ULTRATOP-Subprodukte); Farben nur als Listung | Nein (geteilter Bildsatz) | Nein (1 TDS/Produkt, alle Farben gemeinsam) | Hoch: normbasierte Technik-Tabelle (jeder Wert mit EN-Norm) | TDS, SDS (zentrale Library), DoP (CPR), EPD (ISO 14025), Linien-Broschüre — als CDN-PDFs | Eigene Seite je Ausführung; ausgelagerte Dok-Register (SDS-Library, DoP-DB); starker Bot-/JS-Schutz (403) = AEO-Risiko |
| **Chemotechnik** (verifiziert) | Keine Varianten; Abstufung über getrennte Einzelprodukte (HZ 1 Spezial vs. Quarz plus) | Nein (1 Packshot) | n/a (keine Varianten) | Mittel: Technik-Tabelle on-page, aber Untergrund/Verarbeitung/Gebinde NICHT on-page | PI (=TDS), SDS (Sammel-Trockenmörtel, nicht produktspezifisch), DoP, „Umweltbezogene Anbietererklärung" (keine normierte EPD) | 3-Tab-Struktur; 9 Referenz-Bildkacheln + Case-Study-Video auf der PDP; Cross-Sell als Karten; Architekten-Hotline + LV-Verweise |
| **KORODUR (App, heute)** | Varianten als `varianten[]`-Tabelle am Stammprodukt; KEINE eigene Route/Bild/Doks je Variante | Nein (1 Bild/Stammprodukt) | Nein (Doks am Stammprodukt) | Hoch: Technik-Tabelle, Normen-Chips, 6 Verarbeitungsfelder, Einsatzbereiche, Belastbarkeits-Stufe | TDS, SDS, DoP, Anwendung, Reinigung, Service (mehrsprachig de/en/fr/pl, gruppiert) + ausschreiben.de-LV-Deeplink | „Auf einen Blick"-Kopf, Varianten-Vergleichstabelle, verwandte Referenzen, Fachberater nach Bereich, CTA-Band; kein Selektor, kein Rechner |
| **KORODUR (alte Site)** | Eigene Seite je Variante (HE 3 metallisch/green/SVS 1,5/SVS 3) mit eigenem Breadcrumb, SKU, Klasse, use-case-Text | **Ja** (eigene WooCommerce-Produktbilder) | Nein (TDS je Seite, aber Familien-Logik) | Mittel-hoch: Tabs Beschreibung/Zusätzliche Infos/Downloads, Anwendungsgebiete, Qualitätsklasse je Variante | TDS, Broschüre, Einpflegesystem, Farbskala, LV, Reinigungsempfehlung | Eigene URL je Variante, Systemkomponenten-Querverweise, ähnliche Produkte |

Alle vier Wettbewerber sind **adversariell verifiziert** (Verdict „confirmed", hohe Konfidenz). Korrekturen waren kosmetisch (Farbzählungen, eine tote Quell-URL bei Mapei/environdec, eine Begründungs-Überzeichnung bei Chemotechnik).

## 3. Pro Wettbewerber

**Sika**
- Stark: Konsistente 4-Tab-IA über das gesamte Sortiment, vollständige ausschreibungsrelevante Technik on-page, eigener Applikations-Tab mit konkreten Warnhinweisen (kein Wasseraufsprühen, Nachbehandlung ≥7 d).
- Schwach: Keinerlei Varianten-Führung (Farben nur „auf Anfrage"), schwache Bildsprache (nur Packshot, keine Hallen-/Verarbeitungsbilder), Cross-Sell nur als Text, fragmentierte Domain-/Pfadlogik.
- **Steal this:** Der **Applikations-Tab als eigenständige Sektion** mit Untergrundanforderungen (w/b-Wert, Mindestdruckfestigkeit Beton) und expliziten Warnhinweisen — genau das, was Verarbeiter brauchen und Chemotechnik fehlt.

**ARDEX / PANDOMO**
- Stark: Vorbildliches **filterbares Farbraster mit eigener Detail-URL je Variante** (18 Farbwelten), vollständige Nachhaltigkeits-Doku (EPD, EMICODE-Lizenz, DGNB/LEED/BNB), interaktiver Bedarfsrechner + Aufbauberater, Referenzgalerie mit Designer-Credit.
- Schwach: Variantenseiten ohne echten Mehrwert (gespiegelte „White"-Familien-Doks, generische Bilder `FLOOR18_Flat`) — suggeriert Variantendaten, liefert keine; DoP-Inkonsistenz zwischen Domains; Marken-/Domain-Bruch pandomo.de vs. ardex.de.
- **Steal this:** Das **filterbare Varianten-/Farbraster auf der Familienseite** als Einstieg, kombiniert mit eigenen Detail-URLs — aber besser als ARDEX, indem wir die Variantenseiten tatsächlich mit eigenem Bild/Text füllen statt zu spiegeln.

**Mapei**
- Stark: **Normbasierte Technik-Tabelle** (jeder Prüfwert mit zugehöriger EN-Norm — höchste Glaubwürdigkeit für Ausschreiber), saubere Familienlogik (eigene URL je Ausführung), Systemdenken (Grundierung + Hartstoff + Versiegelung).
- Schwach: Farben ohne eigene Seite/Selektor/Bild, kein Rechner, kein Händlermodul auf der PDP, **starker Bot-/JS-Schutz (403)** macht Seiten für KI-Assistenten/AEO praktisch unsichtbar.
- **Steal this:** **Jeder Technik-Wert mit explizit zugeordneter Norm** (EN 13892-2/-3, EN 1766, EN 13501). Unser Static-Export-Modell ist hier strukturell überlegen, weil wir genau NICHT 403-blocken — AEO-Vorteil ohne Zusatzaufwand.

**Chemotechnik**
- Stark: Niedrige Komplexität (ein Produkt, ein Farbton, eine Aussage), **starker Social Proof direkt auf der PDP** (9 namhafte Referenzkacheln + Case-Study-Video), Architekten-Hotline + LV-Verweise.
- Schwach: Untergrund/Verarbeitung/Gebinde NICHT on-page (Bruch für Verarbeitungssicherheit), Sammel-SDB statt produktspezifisch, nur „Umweltbezogene Anbietererklärung" statt normierter EPD.
- **Steal this:** **Referenz-Bildkacheln direkt auf der PDP** als Social Proof — wir haben mit unserer Referenzdatenbank (55 Refs) den besseren Datenbestand dafür und rendern „verwandte Referenzen" schon, nur prominenter und bildstärker.

## 4. Best Practices (synthetisiert)

**Varianten-Architektur** (Beleg: ARDEX, Mapei)
- Familienseite als Hub + **eigene URL je Variante** ist der Marktstandard für variantenreiche Produkte. ARDEX zeigt das Raster-Pattern, Mapei das saubere URL-Schema je benannter Ausführung.
- Differenzierung gegen den Wettbewerb: Alle vier scheitern an **echten** Varianten-Bildern/-TDS. Wer das liefert, hat ein Alleinstellungsmerkmal — und genau das hatte die alte korodur.de schon (eigenes Bild + eigener use-case-Text je Variante).

**On-Page-Informationsarchitektur / Sektionsreihenfolge** (Beleg: Sika, Mapei, ARDEX)
- Tab- oder Sektionsstruktur in der Reihenfolge **Übersicht → Produktdetails/Technik → Applikation/Verarbeitung → Dokumente** (Sika, durchgängig über das Sortiment). ARDEX ergänzt einen eigenen Nachhaltigkeits-/Stammdaten-Block.
- Technik-Tabelle gehört on-page, nicht nur ins PDF (Sika, Mapei, ARDEX machen das; Chemotechnik teilweise — und scheitert genau dort, wo Untergrund/Verarbeitung ins PDF ausgelagert ist).

**Dokumenten-Block** (Beleg: ARDEX, Sika, Mapei)
- Inline-Linkliste mit **Dateiname + Dokumenttyp + Dateigröße + Sprache** je PDF, direkter Download (Sika das sauberste Muster). ARDEX ergänzt Thumbnail-Vorschau.
- Vollständiges Set: TDS, SDS, DoP, EPD als Pflicht; Broschüre/Farbkarte/Verarbeitungsanleitung als Kür. EPD ist zunehmend ausschreibungsentscheidend (ARDEX/Mapei haben es prominent, Chemotechnik nur als schwache Eigenerklärung).

**Bildstrategie (use-case-getrieben pro Variante)** (Beleg: alte korodur.de positiv; ARDEX/Sika/Mapei als Negativbeispiel)
- **Niemand im Wettbewerb liefert echte variantenspezifische, use-case-getriebene Bilder** — alle teilen Packshots oder generische Familienbilder. Das ist die offenste Flanke des gesamten Marktes.
- Use-case-Bezug entsteht bei den Besten über **Referenz-/Projektgalerien** (ARDEX mit Designer-Credit, Chemotechnik mit 9 Objektkacheln). Wir kombinieren beides: eigenes Variantenbild + verlinkte reale Referenzen.

**UX-Patterns** (Beleg: ARDEX, Sika, Chemotechnik)
- Interaktive Planungshilfen (Bedarfsrechner, Aufbauberater) senken die Hürde (ARDEX) — keiner der anderen hat sie.
- Cross-Sell als **klickbare Produktkarten**, nicht als Fließtext (ARDEX A 38 mit 6 Karten, Chemotechnik mit 2; Sika/Mapei nur Text = Schwäche).
- Social Proof direkt auf der PDP (Chemotechnik-Referenzkacheln, ARDEX-Projektgalerie).

## 5. KORODUR Gap-Analyse

**Was wir haben (stark):**
- Strukturierte Technik-Tabelle, Normen-Chips, 6 Verarbeitungsfelder, Einsatzbereiche-Bullets, Belastbarkeits-Stufe (1–5), Druckfestigkeit-Anker — On-Page-Infotiefe auf Augenhöhe mit Sika/Mapei.
- **Mehrsprachiger, gruppierter Dokumenten-Block** (TDS/SDS/DoP/Anwendung/Reinigung/Service, de/en/fr/pl, Sprach-Fallback) + ausschreiben.de-LV-Deeplink — das übertrifft den Dokumenten-Block aller vier Wettbewerber in der i18n-Tiefe.
- Verwandte Referenzen, Cross-Sell (`systemBegleitprodukte`), Fachberater nach Bereich, CTA-Band — strukturell stärker vernetzt als Sika/Mapei.
- Static-Export = kein 403/Bot-Schutz = **AEO-Vorteil** gegenüber Mapei.

**Was fehlt (konkret, aus `dataPointsMissing`):**
- Eigene Route/slug je Variante (heute alle in einer Tabelle am Stammprodukt).
- Eigenes Bild je Variante + use-case-/Anwendungsbild je Variante (heute genau 1 Bild/Stammprodukt, ~10 webp gesamt; kein Galerie-System für Produkte).
- SKU/Artikelnummer je Variante (alte Site hatte sie, Datenmodell nicht).
- Eigene technische Daten/Verbrauch/Normen je Variante (heute nur `qualitaetsklasse` im Variantenfeld, sonst nichts).
- EPD als **verlinktes Dokument** (`DokumentTyp` kennt kein `epd`; heute nur als Fließtext in `besonderheiten`).
- Prüfzeugnisse als eigener Dokumenttyp; strukturiertes Verbrauchsfeld; interaktive Farbauswahl/-vorschau; Verarbeitungsvideo/bebilderte Anleitung; BIM/CAD (Marktlücke — kein Wettbewerber hat BIM, daher niedrige Priorität).

**Code-/Modell-Implikationen für „eigene Seite je Variante":**

*Datenmodell (`data/produkte.ts`, Zeile 50):* Heute `varianten?: { name; qualitaetsklasse?; hinweis? }[]`. Umbau zu eigenständiger Entität, z. B.:
```
ProduktVariante {
  slug: string;            // eigene Route, kebab-case
  name: string;
  sku?: string;
  qualitaetsklasse?: string;
  beschreibung?: string;   // use-case-spezifisch (z.B. metallisch = Eisenräderverkehr)
  einsatzbereiche?: string[];
  technischeDaten?: {label,wert}[];  // override/ergänzend zur Familie
  bild?: string;           // eigenes Variantenbild
  bilder?: string[];       // optionale Galerie
}
```
Entscheidung nötig: Felder auf Variante sind **Overrides** über die Familien-Defaults (Vererbung) — sonst Pflege-Explosion. i18n: `data/i18n/produkte.{en,fr,pl,es}.ts` müssen die neue Variantenstruktur spiegeln (heute spiegeln sie `varianten[]` flach).

*Routing/slug-Schema:* Heute `app/[lang]/produkte/[id]/page.tsx`. Vorschlag: Familienseite bleibt `/produkte/[id]/`, Variante wird `/produkte/[id]/[variante]/` (eigenes Segment, klar als Kind erkennbar, sauberer Breadcrumb). Alternative `/produkte/[varianten-slug]/` (flach wie alte Site) bricht die Familien-Hub-Logik — nicht empfohlen. `generateStaticParams` muss Familien × Varianten × 5 Locales erzeugen.

*Dokumente (`data/produktDokumente.ts`):* Heute `Record<produktId, ProduktDokument[]>`. Erweitern auf Varianten-Key (z. B. `produktId#variantenSlug`) mit **Fallback auf Familien-Doks**, wenn Variante keine eigenen hat — so vermeiden wir das ARDEX-Problem (gespiegelte Familien-Doks, die Varianten-Doks vortäuschen): klar kennzeichnen „gilt für die Familie" vs. „variantenspezifisch". `DokumentTyp` um `epd` (und optional `pruefzeugnis`, `broschuere`, `farbkarte`) erweitern.

*Auswirkung auf andere Systeme:*
- **Lösungsfinder:** Bewertet Produkte über Tags am Stammprodukt (`belastungenAbgedeckt`, `zeitKategorie`, `EinsatzbereichV25`). Varianten dürfen den Finder NICHT aufblähen — Empfehlung bleibt auf Familienebene, Ergebnis verlinkt auf die Familienseite, dort wählt der Nutzer die Variante. Kein Tag-Schema je Variante (sonst Doppel-Treffer).
- **Anwendungsmatrix:** Poster-1:1, 6 kuratierte Produkte — bleibt auf Familienebene, kein Eingriff.
- **Sitemap/SEO:** Mehr URLs (Familien + Varianten × 5 Sprachen). `alternatesFor`/`generateMetadata` je Variante. **Redirect-Map (Stufe 5)** kann jetzt Alt-Varianten-URLs direkt auf die neue Varianten-URL leiten statt auf Stammprodukt+Anker — sauberer als geplant.
- **i18n:** Neue UI-Strings (Varianten-Umschalter, „gilt für die Produktfamilie") in alle 5 Dictionaries.

## 6. Empfohlene PDP-Informationsarchitektur (variantentief, mockup-reif)

**Zwei Ebenen: Familienseite (Hub) + Variantenseite (Detail).**

### A) Familienseite `/produkte/[id]/`
1. **Breadcrumb** (Produkte > Bereich > Familienname).
2. **Header:** Kategorie-Badge, H1 Familienname, Kurzbeschreibung, gemeinsame Eckwerte (Schichtdicke-Range, Normen-Set der Familie), 1 repräsentatives Bild.
3. **Varianten-Raster (Kernsektion, Beleg ARDEX):** Karten/Kacheln je Variante mit **eigenem Variantenbild**, Name, Qualitätsklasse, 1-Zeiler-Use-Case, Link auf die Variantenseite. Bei vielen Varianten filterbar (Klasse/Use-Case); bei ≤4 simples Kartenraster.
4. **Was unterscheidet die Varianten?** — kompakte Vergleichstabelle (Name/Klasse/Use-Case/SKU), die heutige `varianten[]`-Tabelle, aber jede Zeile verlinkt.
5. **Gemeinsame Technik & Normen** (familienweit, mit Norm je Wert — Beleg Mapei).
6. **Dokumente (Familienebene):** TDS-Übersicht/Broschüre/Farbkarte/EPD, klar als „gilt für die Familie" gekennzeichnet.
7. **Verwandte Referenzen** (bildstark, Beleg Chemotechnik) + **Cross-Sell als Karten** (Beleg ARDEX) + **Fachberater** + CTA-Band.

### B) Variantenseite `/produkte/[id]/[variante]/`
1. **Breadcrumb** (Produkte > Bereich > Familie > Variante) + **Varianten-Umschalter** (Chips/Dropdown „andere Ausführungen dieser Familie", immer sichtbar — bessere Führung als Mapei/Sika, die keinen Umschalter haben).
2. **Header:** H1 Variantenname, **eigene Qualitätsklasse + SKU** als Badge, use-case-spezifische Kurzbeschreibung (z. B. metallisch = „Eisenräderverkehr, Koller, Flurförderfahrzeuge mit Stahlbereifung"), **eigenes Variantenbild** prominent.
3. **Bildbereich:** Variantenbild als Hauptbild + optionale use-case-Galerie (Anwendungsszene). Fallback auf Familienbild, wenn (noch) kein Variantenbild — sauber, nicht generisch-spiegelnd wie ARDEX.
4. **„Auf einen Blick":** Vorteile, Einsatzbereiche (variantenspezifisch), Belastbarkeits-Stufe.
5. **Technische Daten & Normen:** variantenspezifische Werte als Override über Familie, **jeder Wert mit Norm** (Beleg Mapei); fehlende Werte erben sichtbar von der Familie.
6. **Verarbeitung/Applikation** (eigene Sektion, Beleg Sika): Untergrund, Mischverhältnis, Schichtaufbau, Verarbeitungs-/Aushärtezeit, Warnhinweise.
7. **Dokumente:** variantenspezifische Doks zuerst (falls vorhanden, inkl. eigenes TDS perspektivisch), darunter Familien-Doks klar getrennt gelabelt; je Eintrag Typ/Größe/Sprache + LV-Deeplink (Beleg Sika).
8. **Verwandte Referenzen** (gefiltert auf Variante, sonst Familie) + Cross-Sell + Fachberater + CTA.

**Schalt-/Verlink-Logik:** Familienseite → Variantenkarten (Klick); Variantenseite → Umschalter-Chips zwischen Geschwister-Varianten + „zur Familie"-Link im Breadcrumb. Static-Export-tauglich (alles zur Build-Zeit auflösbar).

## 7. Offene Fragen an die Technik (Sign-off nötig) & Annahmen

**An die Technik (Sign-off):**
1. Welche der 15 Produkte mit `varianten[]` brauchen wirklich eigene Variantenseiten (= eigener Use-Case/eigenes Bild rechtfertigt eigene URL), und welche bleiben Farb-/Körnungs-Listung am Stammprodukt? (Marktmuster: technische Ausführungen ja, reine Farben nein.)
2. Liegen SKU/Artikelnummern je Variante vor (alte WooCommerce-Site hatte sie)? Quelle/Pflegeort?
3. Sollen variantenspezifische **TDS** perspektivisch erstellt werden (Team-Entscheidung „eigenes TDS je Variante"), oder bleibt es zunächst bei einem Familien-TDS mit klarer Kennzeichnung? Bis dahin Fallback auf Familien-TDS — ist das vertretbar?
4. EPD als verlinktes Dokument: für welche Produkte liegt eine normierte EPD (EN 15804/Typ III) vor (heute nur Fließtext-Erwähnung bei HE 3 green)?
5. Variantenspezifische technische Werte (Verbrauch, abweichende Klasse): existieren diese je Variante, oder ist nur die Qualitätsklasse variantenabhängig?

**Annahmen (markiert, korrigierbar):**
- *Annahme:* Use-case-spezifische Variantentexte der alten Site (z. B. metallisch = Eisenräderverkehr) sind übernehmbar/aktuell — Quelle ist das Scrape-Archiv (Stand 2025-10-17), nicht live geprüft.
- *Annahme:* Vererbungsmodell (Variante erbt Familien-Defaults, überschreibt nur Abweichendes) ist gewünscht, um Pflegeaufwand zu begrenzen.
- *Annahme:* Lösungsfinder/Anwendungsmatrix bleiben auf Familienebene — Varianten erzeugen keine eigenen Finder-Treffer.
- *Annahme:* BIM/CAD ist niedrige Priorität (kein Wettbewerber bietet es; keine Marktnachteil-Evidenz).

## 8. Nächster Schritt: Mockup-Brief

Das Mockup (HTML, wie Projektstandard „Mockup vor Umsetzung") muss zeigen:
- **Beide Ebenen** an einem realen Beispiel mit Varianten: NEODUR HE 3 (Familienseite mit Variantenraster metallisch/green/SVS 1,5/SVS 3 + je eigenem Platzhalter-Bild) und EINE Variantenseite (HE 3 metallisch) voll ausgearbeitet.
- **Familienseite:** Variantenraster als Kartengrid (Bild + Klasse + Use-Case-Zeile + Link), darunter verlinkte Vergleichstabelle, gemeinsame Technik/Normen, Familien-Dokumentenblock.
- **Variantenseite:** Header mit eigener Klasse/SKU + use-case-Text + eigenem Bild, Varianten-Umschalter (Chips), Technik-Tabelle mit Norm je Wert, eigene Verarbeitungssektion, Dokumentenblock mit klarer Trennung „variantenspezifisch vs. Familie" (Typ/Größe/Sprache), verwandte Referenzen als Bildkacheln.
- **Visuell markieren**, was Familien- vs. Varianten-Ebene ist und woher ein Bild/Dokument fällt (eigen vs. geerbt) — damit der Daten-/Routing-Umbau direkt aus dem Mockup ableitbar ist.
- KORODUR-CD (shadcn/ui-Tokens, Gabarito), DE-Sprachstand, mobil-first (44px-Targets).

Datei-Ablage gemäß Konvention: `docs/mockups/`. Relevante Code-Anker für die Umsetzung: `data/produkte.ts` (Z. 50, `varianten[]`), `app/[lang]/produkte/[id]/page.tsx`, `data/produktDokumente.ts`, `components/DokumentListe.tsx`, `data/i18n/produkte.{en,fr,pl,es}.ts`.
---
Erstellt: 2026-06-29
Typ: Entscheidungsvorlage / Meeting-Prep
Anlass: Kollegen-Meeting 2026-07-01 — PDP optimieren
Scope-Entscheidung (Steffi, 2026-06-29): Varianten-PDP REVERSAL — jede Variante bekommt eine eigene PDP, wie auf der bestehenden korodur.de
Grundlage: Dynamic Workflow (7 Agenten: Ist-Daten-Audit + Alt-XML + TDS + Issue-Cluster + Wettbewerber-Soll → Synthese → adversarielle Kritik). Alt-XML-Variantendaten für HE 65 am Quell-JSON verifiziert.
Vorläufer: docs/reviews/2026-06-17-pdp-wettbewerber-analyse.md (Varianten-PDP-Teardown), docs/reviews/2026-07-01-gf-strategie-website.md (Abschnitt 4)
---

# PDP-Fertigstellung — Entscheidungsvorlage Kollegen-Meeting

## 0. Kernaussage (eine Zeile)

Wir sind bei den Varianten hinter unsere **eigene alte korodur.de** zurückgefallen (die hatte je Variante eigene Seite, SKU, Bild, Use-Case-Text). Der ehrlichste 2-Tage-Stand fürs Meeting ist **ein tiefer HE-65-Pilot** statt breiter, halbfertiger On-Page-Tweaks, plus zwei wirklich sichere Live-Quick-Wins.

## 1. Haben wir Wettbewerber-Benchmarks? Ja, zwei.

- **Varianten-PDP-Teardown** (`2026-06-17`, adversariell verifiziert): Sika, ARDEX/PANDOMO, Mapei, Chemotechnik. Befund: Marktstandard ist Familienseite + eigene URL je Variante, aber **kein** Wettbewerber liefert echte variantenspezifische Bilder/TDS. Genau das hatte unsere alte Site schon.
- **GF-Soll-Block-Vergleich** (`2026-07-01`, Abschnitt 4): Sika, MC-Bauchemie, Pagel, Master Builders. Befund: keiner hat alles. Unsere zwei einfachen Vorsprünge: Kennwerte on-page + filterbare Referenz-DB mit verlinkten Produkten.

## 2. Ist-Stand-Challenge (ehrlich)

**Was stark ist:** `einsatzbereiche` 100 %, `technischeDaten` 99 % (Median 4 Zeilen), TDS-Links 100 %, mehrsprachiger Dokumenten-Block (5 Sprachen, tiefer als alle vier Wettbewerber inkl. Sika), Static-Export = kein Bot-Schutz = AEO-Vorteil gegenüber Mapei.

**Die vier schmerzhaftesten Lücken:**
1. **Varianten kollabieren zur flachen, unverlinkten Tabelle.** Heute steht in `varianten[]` nur `name` + teils `qualitaetsklasse`. Verloren: eigene SKU, eigenes Bild, Use-Case-Text je Variante. Wir sind hinter unsere alte Seite zurückgefallen.
2. **SKU/Artikelnummern fehlen komplett im Datenmodell**, obwohl im Alt-XML vollständig gepflegt (64 distinkte Artikel über 79 Produktseiten).
3. **EPD/Nachhaltigkeit** ist der einzige Standard-Block, den alle vier Wettbewerber haben und wir nicht. Datenseitig gibt es nichts zu ziehen (0 TDS-Treffer, 0 normierte EPDs). Das ist eine Beschaffungs-/GF-Entscheidung, keine Code-Lücke.
4. **Norm je Kennwert fehlt**, obwohl die TDS es wörtlich hergeben (Mapei-Goldstandard). Aber nur ~2 Beispiele sind hart belegt, die Abdeckung über 27 Produkte ist unverifiziert.

## 3. Verifizierte Datenlage (Quelle: extraktion-produkte.json)

Die alte korodur.de hatte **je Variante eine eigene Seite**. Für die Keystone-Familie am Quell-JSON geprüft:

| Familie | Eigene Variantenseiten | SKU je Variante | Eigenes Bild | Use-Case-Text |
|---|---|---|---|---|
| **NEODUR HE 65** | 6 (Basis, SVS 3, SVS 1,5, metallisch, plus, plus SVS 3) | **Ja, alle distinkt** | Ja, alle | Ja, differenziert | → **demoreif** |
| NEODUR HE 3 | 6 | teils geteilt (green = Basis-SKU; „met F" = FR-Duplikat) | Ja | Ja | → Datenbereinigung nötig |
| NEODUR HE 60 rapid | 4 | Ja, distinkt | Ja | Boilerplate (kaum differenziert) | → Text dünn |

**Konsequenz:** HE 65 ist der saubere Pilot. SKU-Kardinalität ist nicht überall 1:1 (Kritik bestätigt) — vor jeder Extraktion Sprach-Duplikate (WPML) filtern und geteilte SKUs prüfen.

## 4. Gap-Matrix (Soll-PDP)

Marker: 🟢 Standard · 🔵 Differenzierer · 🟠 Entscheidung nötig

| Soll-Block | Status | Datenquelle | Aufwand | |
|---|---|---|---|---|
| Produktkopf, Einsatzgebiete, Downloads (typisiert, 5 Sprachen), verwandte Produkte, CTA | Haben | Ist-Modell | — | 🟢 |
| Normen/Klassifizierung vorne | Haben (16 Produkte leer) | Ist-Modell | S | 🟢 |
| **Varianten-Raster** (Karten, eigenes Bild, Link) | Fehlt | Alt-XML + Bilder | L | 🔵 |
| **Varianten-Tabelle + SKU + Use-Case, verlinkt** | Teilweise | Alt-XML | M | 🔵 |
| **Kennwert-Tabelle: Norm je Wert** | Teilweise | TDS (Abdeckung unklar) | M | 🔵 |
| **System-/Aufbau-Tabelle + Verbrauch** | Teilweise | TDS + `systemBegleitprodukte` | M | 🔵 |
| **Referenzen bildstark on-page** | Teilweise | Ist-Modell | S | 🔵 |
| **Fachberater oben (nicht nur Footer)** | Teilweise | Ist-Modell | S | 🔵 |
| **EPD/Nachhaltigkeit** | Fehlt | fehlt ganz (Beschaffung) | S Code / L Daten | 🟠 |
| Farbkarte-Link | Fehlt | TDS (nur HE 65 belegt) + Alt-XML | S | 🔵 |
| **Variantenseite** (eigene Route, Header Q-Klasse+SKU+Bild, Umschalter, variantenspez. Technik/Verarbeitung/Doks) | Fehlt | nach #239 | L | 🔵 |

## 5. Schritt-Plan in drei Körben (korrigiert um die Kritik)

### Korb 1 — bis zum Meeting (2 Tage)

**Empfehlung: ein tiefer HE-65-Pilot statt breiter flacher Tweaks.** Begründung: Broad-Tweaks über alle 71 Produkte laufen in die i18n-Wand (`varianten[]` und `technischeDaten[]` sind in 4 Sprachfiles Voll-Array-Overrides mit eigener Shape; jede Prosa-Änderung ist übersetzungspflichtig in FR/PL/ES). Ein vertikaler HE-65-Slice ist überzeugender, ehrlicher und macht die Architekturentscheidung am konkreten Beispiel sichtbar.

Konkret:
1. **HE-65-Pilot** (Familienseite + 1 Variantenseite voll ausgearbeitet, z.B. HE 65 metallisch) mit echten Alt-XML-Daten (SKU, Bild, Use-Case-Text). Form = Live-Pilot oder HTML-Mockup, je nach Entscheid unten. DE-only fürs Demo.
2. **SKU-Anzeige** als nicht-übersetztes Feld am Stamm + in der Vergleichstabelle (sicher, kein i18n-Risiko).
3. **Fachberater-CTA auch oben** mit Name (Mapping existiert, kein neuer i18n-String).

**Bewusst NICHT in Korb 1** (Kritik): Norm-je-Kennwert über 27 Produkte (i18n-Re-Sync, > 1 Tag → Korb 3), EPD-Render-Slot (invertiert die Sequenz, leerer Slot signalisiert „haben wir nicht"), breite Use-Case-Texte 5-sprachig, eigene Variantenrouten produktiv über alle Familien.

### Korb 2 — im Meeting entscheiden (🟠)

1. **Scope: Pilot oder alle?** Bauen wir EINE tiefe Varianten-PDP (HE 65) als Beweis und rollen dann aus, oder breit-flach über alle? (Empfehlung: Pilot zuerst.) **Das ist die Aufmacher-Frage, an der der Zuschnitt hängt.**
2. **Varianten-Schnittlinie freigeben** (nicht „Route oder Selektor", sondern hybrid): eigene Route für **technische Ausführungen** (metallisch, SVS, plus, rapid), Selektor/Listung für reine **Farbe/Körnung** (granidur, durop, bianco/nero). Frank bestätigt den Schnitt. Kandidaten für eigene Seiten: HE 65, HE 3, HE 60 rapid, ggf. VM-Familie (#178), Concrete Pharmacy, PFM-ZE, KCF rapid.
3. **SKU-Pflegeort:** Alt-XML hat sie, aber wo lebt die Quelle künftig (Notion DB1)? Sonst veralten sie wieder.
4. **Variantenbilder:** Alt-Site-PNGs aus dem Scrape übernehmen oder neu fotografieren? Ohne Bilder werden Variantenseiten hohl.
5. **EPD:** raus aus diesem Meeting oder mit Kosten/Timeline framen. EN-15804-Typ-III = Geld + Monate, das ist GF/Budget, nicht Kollegen-/Technik-Runde.
6. **Referenz-Vertraulichkeit:** welche Referenzen dürfen on-page/in den Filter.

### Korb 3 — nach dem Meeting (Varianten-Refactor, sequenziert)

1. **#239 Datenmodell (Fundament):** `ProduktVariante`-Entität (`slug, name, sku?, qualitaetsklasse?, beschreibung?, einsatzbereiche?, technischeDaten[], normen[], bild?`), `familieId`/`istVariante`, **Override-über-Familien-Vererbung** (nur Abweichendes pflegen), und **Referenz-Matching von Name-String auf stabile ID** (der eigentliche Knoten). i18n-Override-Shape in 4 Sprachfiles mitziehen + `validate-produkte.ts` erweitern.
2. **#274 Referenz-Rohdaten-Extrakt** parallel (unblockt Szenariobilder + variantengefilterte Referenzen).
3. **Eigene Routen** `/produkte/[id]/[variante]/` + `generateStaticParams` (Familien × Varianten × 5 Locales) + Umschalter.
4. **Variantendaten befüllen** (#178, nach Frank-Sign-off) aus Alt-XML.
5. **Variantenbilder** (abhängig Korb-2-Entscheid) + `heroReferenz`-Fallback (#356).
6. **i18n-Spiegelung** je Variante.

**Von der Kritik ergänzt, gehört JETZT in die Korb-3-Planung (nicht später):**
- **SEO/Sitemap-Explosion:** HE 65 = 5 Varianten × 5 Sprachen = 25 near-duplicate URLs für ein Produkt. Canonical-Strategie (Variante → Familie?) + hreflang je Variante + Duplicate-Content-Risiko vor dem Bau klären.
- **Redirect-Map Alt-URLs:** Die 14+ variantensuffigierten alt-korodur.de-Seiten tragen SEO-Equity. Umzug ohne 301-Map = Ranking-Verlust beim Cutover.
- **Lösungsfinder-Spannung:** „Finder bleibt auf Familienebene" heißt, der Hauptfunnel kann nicht auf die passende Variante (HE 65 metallisch = Panzerestrich) routen, obwohl wir sie differenzieren. Bewusst entscheiden.
- **Mobile:** breitere Vergleichstabelle (+SKU, +Use-Case) und Varianten-Umschalter brauchen das Accordion-Muster (V3.0 Anwendungsmatrix als Reuse).

## 6. Issue-Cluster (18 offen)

- **A Varianten-Architektur:** #239 (Fundament), #178 (variantenspez. Werte, wartet auf Frank), #110 (closed, Flach-Tabelle).
- **B Produktbilder:** #304, #356, #292 (Szenariobilder).
- **C Klassifizierung/Daten:** #76 (Epic, Excel = SoT), #236, #306 (Master-Mapping), #271 (6 fehlende Produkte).
- **D Downloads/Dokumente:** #301 (Download-Center), #300 (Inventar), #276 (Farbkarte).
- **E Content:** #132 (Sperrzeit/Belastbarkeit), #350 (Hartstoffsystem-Matrix), #341, #160.
- **F Sonstiges:** #103 (Neubau-Funnel, blocked), #205 (Referenz-Dublette), #274 (Referenz-Extrakt).

Fundament-Kette: **#239 vor allem anderen**, #274 läuft parallel, #178 wartet zusätzlich auf Frank.

## 7. Empfehlung (3 Sätze)

Wir bauen bis zum Meeting **einen tiefen HE-65-Pilot** (Familienseite + eine Variantenseite, echte Alt-XML-Daten) plus die zwei sicheren Live-Wins SKU-Anzeige und Fachberater-oben. Das holt den Verkaufswert der alten Seite sichtbar zurück und macht die Architekturentscheidung am konkreten Beispiel entscheidbar. Die zentrale Meeting-Entscheidung ist **Scope (Pilot vs. alle) plus Varianten-Schnittlinie**, nicht die EPD-Frage, die als GF-/Budget-Thema mit Kosten zu framen oder rauszunehmen ist.

# Bild-System (Bereich × Projektart) — Naming-Konvention + Bedarfsliste

**Issue:** #105 (Bild-System (Bereich × Projektart) + Bedarfsliste) · Labels `relaunch`, `design-system`, `daten`
**Datum:** 2026-07-01 · **Status:** Spec (Bildgenerierung/Beschaffung nachgelagert, blockiert bis Higgsfield-MCP + Steffi-Review)
**Quellen (autoritativ):** `data/bereiche.ts`, `components/PortfolioGrid.tsx`, `app/[lang]/bereiche/[slug]/page.tsx`, `app/[lang]/bereiche/[slug]/[projektart]/page.tsx`, Dateibestand `public/images/`

Dieses Dokument schreibt die Namenskonvention fest und leitet die kuratierte Bild-Bedarfsliste **mechanisch aus dem Code-Stand** ab. Es erzeugt keine Bilder.

---

## 1. Ausgangslage: zwei Bild-Ebenen

Ein Bereich trägt im Code zwei getrennte Bild-Slots. Das ist wichtig, weil die Namenskonvention aus #105 nur die erste Ebene betrifft, die tatsächlich sichtbaren Grid-Kacheln aber aus der zweiten kommen.

**Ebene A — Bereichs-Header-Hero.** Feld `bild` in `data/bereiche.ts`. Wird in `app/[lang]/bereiche/[slug]/page.tsx` (Z. 189–193) als Hintergrund des Bereichs-Kopfes mit dunklem Overlay gerendert. Ohne `bild` zeigt der Header das Icon-Band. Alle Dateien liegen unter `public/images/bereiche/`. **Diese Ebene regelt die Konvention.**

**Ebene B — Portfolio-Grid-Kachel.** Konstante `BEREICH_KACHELBILD` in `components/PortfolioGrid.tsx` (Z. 13–20) plus optionales `bild` je `PortfolioKachel` in `HOME_PORTFOLIO_KACHELN` (`data/bereiche.ts` Z. 169–188). Bewusst in der Component gehalten (Track B, nicht in `data/bereiche.ts`), zieht **echte Referenzfotos** aus `public/images/referenzen/`. Fällt ein Bild aus, greift das Bereichs-Icon.

Konsequenz: `bereich.bild` (Ebene A) und die Grid-Optik (Ebene B) sind heute **entkoppelt** — die Kacheln auf Home und `/bereiche` zeigen Referenzfotos, nicht die `bereiche/`-Assets. Siehe Lücke L3.

---

## 2. Naming-Konvention (verbindlich)

**Schema:** `public/images/bereiche/<bereich>[-<projektart>].<ext>`

Regeln:

1. **`<bereich>`** = exakter `slug` aus `data/bereiche.ts` (kebab-case). Keine Alt-/Marketing-Namen. Konkret: `industrieboden`, `betonsanierung`, `infrastruktur`, `microtop`, `spezialmoertel`, `katzenstreu`, `3d-concrete-printing`.
2. **`<projektart>`** = `neubau` oder `sanierung`. **Nur** anhängen, wenn der Bereich echte projektart-getrennte Sub-Seiten `/bereiche/<slug>/{neubau,sanierung}` hat. Maßgeblich ist `SUB_BEREICHE` in `app/[lang]/bereiche/[slug]/[projektart]/page.tsx`. Aktuell ist das **ausschließlich `industrieboden`**.
3. **Ein-Projektart-Bereiche** tragen keinen Suffix: `<bereich>.<ext>` (z. B. `microtop.webp`). Kein `-neubau`/`-sanierung` erfinden, solange keine Sub-Seite existiert.
4. **`<ext>`** — das Issue schreibt `.jpg`. Der Bestand nutzt durchgängig `.webp` (Web-Optimierung). **Empfehlung:** Auslieferung als `.webp`, `.jpg` nur als Quell-/Fallback-Format. Die Namenslogik ist extensionsunabhängig. Endgültige Festlegung siehe Lücke L1.
5. **Legacy-Namen auflösen.** Bestehende Dateien mit Alt-Bereichsnamen (`schnellbetonsysteme.webp` → `infrastruktur`, `spezialbaustoffe.webp` → `spezialmoertel`, `sichtestrich.webp` → in Industrieboden aufgegangen) werden bei Neubelegung auf das Slug-Schema umgezogen. `sichtestrich.webp` ist verwaist (Bereich seit #331 aufgelöst).
6. **Keine Mehrfachnutzung eines Motivs über Bereiche hinweg.** `betonsanierung` und `rapid-set` zeigen heute beide `rapid-set.webp` — das ist Ebene-A-Reuse und irreführend. Jeder Bereich bekommt ein eigenständiges Motiv.
7. **Neue Sub-Seiten in Zukunft:** Sobald ein weiterer Bereich einen Neubau/Sanierung-Split bekommt (Erweiterung von `SUB_BEREICHE`), erzwingt Regel 2 automatisch zwei Assets `<bereich>-neubau` / `<bereich>-sanierung`.

> Anmerkung Rapid Set: `rapid-set` ist eine eigenständige Marken-Seite (nicht in `PORTFOLIO_SLUGS`, dedizierte Component), fällt aber unter dieselbe Konvention. Grafik-Bedarf dort ist separat spezifiziert: `docs/specs/2026-06-19-rapid-set-grafik-brief-hixfield.md`. Hier nur der Vollständigkeit halber gelistet, nicht Teil der 7-Bereiche-Achse aus #105.

---

## 3. Bedarfsliste (Bereich × Projektart)

Achse: 7 Bereiche aus `data/bereiche.ts` × Projektart. Projektart-Split nur bei `industrieboden` (siehe Regel 2). Zellen mechanisch aus Code + Dateibestand abgeleitet.

Spalten: **Soll-Dateiname** (Ebene A) · **Ebene A Ist** (`bereich.bild`) · **Ebene B Ist** (Grid-Kachel) · **Bedarf** · **Motiv-Brief-Hinweis**

| # | Bereich / Projektart | Soll-Dateiname (Ebene A) | Ebene A Ist (`bereich.bild`) | Ebene B Ist (Grid-Kachel) | Bedarf | Motiv-Brief-Hinweis |
|---|---|---|---|---|---|---|
| 1 | Industrieboden — Neubau | `bereiche/industrieboden-neubau.webp` | fehlt (nur generisch `industrieboden.webp`, kein Split) | `referenzen/kleemann-produktionshalle/hero.jpg` (Home-Kachel `industrieboden_neubau`) | **ja** | Neubau-Industriehalle, frisch eingebrachter Hartstoffboden, Weite/Sauberkeit, Maschinen/Logistik. Neubau-Signal (Rohbau/Ersteinbau), nicht Reparatur. |
| 2 | Industrieboden — Sanierung | `bereiche/industrieboden-sanierung.webp` | fehlt (nur generisch `industrieboden.webp`, kein Split) | `referenzen/antolin-wochenend-sanierung/hero.jpg` (Home-Kachel `industrieboden_sanierung`) | **ja** | Sanierung im Bestand, Wochenend-/Schnellsanierung, alter vs. neuer Bodenabschnitt, Downtime-Kontext (Produktion läuft weiter). |
| 3 | Betonsanierung (nur eine) | `bereiche/betonsanierung.webp` | belegt, aber **Reuse** von `rapid-set.webp` (irreführend) | `referenzen/dhl-ueberadebruecken/hero.jpg` | **ja** | Betoninstandsetzung Infrastruktur/Verkehr (Brücke/Rampe), Reparaturmörtel/Spritzmörtel im Einsatz, robustes Baustellen-Motiv. Eigenständig, NICHT das Rapid-Set-Taschenmesser. |
| 4 | Infrastruktur (nur eine) | `bereiche/infrastruktur.webp` | belegt via **Legacy-Name** `schnellbetonsysteme.webp` | `referenzen/catania.jpg` | **ja** (Umzug auf Slug-Name + eigenständiges Motiv) | Verkehrsinfrastruktur/Schnellbeton unter Zeitdruck: Straße/Kreuzung/Gleis, Nachtbaustelle, schnelle Wiederfreigabe. |
| 5 | Microtop (nur eine) | `bereiche/microtop.webp` | belegt `microtop.webp` | `referenzen/trinkwasserturm-budapest/hero.jpg` | **nein (optional)** | Vorhanden; zusätzlich eigene Rich-Component `MicrotopBereich` mit eigenem `bereiche/microtop/hero-bg.jpg`. Trinkwasserbehälter/-turm innen, mineralische Beschichtung, Hygiene/Wasser. Nur bei Qualitäts-Upgrade neu. |
| 6 | Spezialmörtel (nur eine) | `bereiche/spezialmoertel.webp` | belegt via **Legacy-Name** `spezialbaustoffe.webp` | `referenzen/hauptbahnhofsvorplatz-landau/hero.jpg` | **ja** (Umzug auf Slug-Name + eigenständiges Motiv) | Verguss/Pflasterfugen/Spritzmörtel, präziser Spezialeinsatz (Maschinenfundament, Platz/Pflaster), technische Anmutung. |
| 7 | Katzenstreu (nur eine) | `bereiche/katzenstreu.webp` | belegt `katzenstreu.webp` | `portfolio/katzenstreu.webp` | **nein** | Vorhanden. Abgegrenzter Geschäftsbereich, neutral-reduziert (Variante B). Kein Neubedarf, außer späterem Grün-Highlight-Reskin (offen). |
| 8 | 3D-Concrete-Printing (nur eine) | `bereiche/3d-concrete-printing.webp` | belegt `3d-concrete-printing.webp` | `bereiche/3d-concrete-printing.webp` (Home-Kachel, explizit) | **nein (Platzhalter)** | Vorhanden als Platzhalter. Voll-Ausarbeitung/Content folgt #347 — erst dann ggf. hochwertiges Motiv (3D-Betondruck-Extrusion, Schichtstruktur). |

**Zusatz (außerhalb der #105-Achse, gelistet zur Vollständigkeit):**

| Bereich | Soll-Dateiname | Ist | Bedarf | Hinweis |
|---|---|---|---|---|
| Rapid Set (Marken-Seite) | `bereiche/rapid-set.webp` (Hero) + Grafik-Familie | `rapid-set.webp` + Interim `rapid-set-alles-besser-koenner.png` | separat | Eigener Grafik-Brief: `docs/specs/2026-06-19-rapid-set-grafik-brief-hixfield.md` (Taschenmesser-Anker + G2/G3/G4). |

### Zusammenfassung Bedarf

- **Neu zu erzeugen/beschaffen (Ebene A): 5** — `industrieboden-neubau`, `industrieboden-sanierung`, `betonsanierung`, `infrastruktur`, `spezialmoertel`.
- **Kein Neubedarf: 3** — `microtop` (optional), `katzenstreu`, `3d-concrete-printing` (Platzhalter bis #347).
- Davon **2 reine Umzüge/Reskins** (`infrastruktur`, `spezialmoertel`: Legacy-Datei existiert, aber Alt-Name + generisches Motiv) und **1 Reuse-Auflösung** (`betonsanierung` teilt sich heute das Rapid-Set-Motiv).

---

## 4. Ausgewiesene Lücken (Entscheidung/Zulieferung offen)

- **L1 — Dateiformat.** Issue schreibt `.jpg`, Bestand ist `.webp`. Konvention oben empfiehlt `.webp`; finale Festlegung durch Steffi/Design ausstehend.
- **L2 — Ebene-A vs. Ebene-B-Governance.** Sichtbar sind auf Home/`/bereiche` die Grid-Kacheln (Ebene B, Referenzfotos), nicht `bereich.bild` (Ebene A). Offen: Sollen die neuen Bereich×Projektart-Assets **beide** Ebenen bedienen (Header + Kachel) oder bleibt die Kachel bewusst auf Referenzfotos (Bild-Policy „echte Referenzen")? Ohne Entscheidung bleibt die Konvention rein auf Ebene A wirksam.
- **L3 — Projektart-Kacheln nur auf Home.** Der Neubau/Sanierung-Split existiert als Grid-Kachel nur in `HOME_PORTFOLIO_KACHELN` (2 Industrieboden-Kacheln) und als Sub-Seiten `/bereiche/industrieboden/{neubau,sanierung}`. Die `/bereiche`-Übersicht (`PORTFOLIO_SLUGS`) zeigt Industrieboden als **eine** Kachel. Falls weitere Bereiche einen Projektart-Split bekommen sollen, ist das eine IA-Entscheidung (Erweiterung `SUB_BEREICHE`), keine reine Bild-Frage.
- **L4 — Motiv-Briefs sind Hinweise, keine Freigabe.** Die Motiv-Spalte ist aus Referenz-/Bereichskontext abgeleitet, nicht mit Steffi/Fachberatung abgestimmt. Vor Generierung: Brief je Bereich schärfen (analog Rapid-Set-Grafik-Brief).
- **L5 — Generierung blockiert.** Higgsfield-MCP aktuell nicht verbunden; Erstellung + Steffi-Review nachgelagert. Bewährter Workflow: 1 Bild → Review → 3 Varianten → beste wählen.
- **L6 — `sichtestrich.webp` verwaist.** Bereich seit #331 in Industrieboden aufgegangen; Datei kann nach Freigabe entfernt werden (kein Code-Referrer im Bereichs-Rendering gefunden).

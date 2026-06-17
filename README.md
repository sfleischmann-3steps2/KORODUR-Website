# KORODUR Sanierung – Web App

Interaktive Web-Applikation als neue korodur.de: **Produktportfolio** mit 7 Bereichen (inkl. neuem Bereich Infrastruktur), einheitlichen Bereichsseiten mit Neubau-/Sanierungs-Tiefe sowie Unternehmens- und Kontaktseiten. Kern bleibt das Sanierungs-Sales-Tool mit Lösungsfinder. Zielgruppe: Vertriebler, Bauherren, Architekten und Interessenten.

## Live ansehen

**[https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/](https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/)**

Verfügbar in: [Deutsch](https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/de/) · [English](https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/en/) · [Français](https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/fr/) · [Polski](https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/pl/) · [Español](https://sfleischmann-3steps2.github.io/KORODUR-Sanierung_app/es/)

## Features

- **5 Sprachen** – DE / EN / FR / PL / ES, komplett übersetzt (UI + Inhalte), gegen KORODUR-Glossar geprüft
- **Lösungsfinder** – adaptiver Wizard: Fläche → Innen/Außen → Einsatzbereich (6 referenzgedeckte Cluster) → Zeitfenster → Top-Produkt + passende Referenzen
- **Produktportfolio** – Menüpunkt „Portfolio" mit 7 Bereichen (Industrieboden, Betonsanierung, Infrastruktur, Sichtestrich, Spezialbaustoffe, TW-Behältersanierung, Katzenstreu); symbolische Referenzfotos in den Kacheln
- **Einheitliche Bereichsseiten** – Header mit CTA „Technische Fachberatung", bereichsspezifische Fachberater, Produktgruppen + Referenzen; Bereiche mit Neubau **und** Sanierung haben verschachtelte Sub-Seiten (`/bereiche/<slug>/{neubau,sanierung}`)
- **133 Referenzprojekte** (Neubau + Sanierung) mit Herausforderungen, Lösung, Vorteilen, Produktdaten und **Bildergalerie** (3–8 Fotos pro Referenz, Lightbox mit Pfeiltasten); Praxis-Teaser auch in den Fachartikeln
- **71 Produkte** mit technischen Daten, Normen, Qualitätsklassen, Varianten und Produkt-Detailseiten; Produkte können in mehreren Bereichen geführt werden (z. B. KOROCRETE in Betonsanierung + Infrastruktur)
- **Einsatzbereich-Filter** über alle Referenzen (6 referenzgedeckte Cluster, 3 innen + 3 außen)
- **Anwendungsmatrix** – Web-Projektion des Messeposters: 6 kuratierte Produkte als Spalten, technische Kernwerte (Klassifizierung, Schichtdicke, belastbar nach) + Vorteil-Zeile + 6 Anwendungs-Zeilen (✓✓ Kernanwendung / ✓ geeignet), „Mehr Infos"-Link je Produkt (TDS bzw. Produktseite)
- **Volltextsuche** (Cmd/Ctrl+K) über Referenzen, Kategorien und Produkte
- **Responsive** – Desktop, Tablet, Mobile
- **PWA-fähig** – Service Worker, Manifest

## Tech Stack

- **Next.js 16** (App Router, Static Export)
- **Tailwind CSS 4**
- **TypeScript**
- **GitHub Pages** (automatisches Deployment via GitHub Actions)

## Lokal starten

```bash
npm install
npm run dev
```

## Informationsarchitektur

```
/[lang]/
├── Startseite (dualer Hero Neubau + Sanierung, Bereichs-Grid, Referenz-Highlights, Lösungsfinder-Teaser)
├── bereiche/[slug]/ (Portfolio-Bereiche: Header + CTA, Produktgruppen, Referenzen, Fachberater)
│   └── [neubau|sanierung]/ (verschachtelte Sub-Seiten bei Bereichen mit beidem)
├── loesungsfinder/ (adaptiver Wizard → Matching-Referenzen + aggregierte Produkte)
├── referenzen/ (Filter: Projektart · Sanierungsart · Einsatzbereich · Dringlichkeit · Produkt)
├── produkte/ (Portfolio nach Bereichen + Anwendungsmatrix + Detail-Seiten)
├── sanierung/ · neubau/ (Bereichseinstiege)
├── unternehmen/ · kontakt/ (Fachberater-Finder nach Bereich + PLZ)
└── agb · impressum · datenschutz · hinweisgebersystem (Rechtsseiten)
```

## Projektstruktur

```
├── app/[lang]/              # Locale-prefixed Routes (de/en/fr/pl/es)
│   ├── page.tsx             # Startseite
│   ├── loesungsfinder/      # 4-Schritt-Wizard
│   ├── referenzen/          # Referenz-Übersicht + Detail
│   ├── produkte/            # Produktübersicht + Detail
│   └── dictionaries/        # UI-Strings (de/en/fr/pl/es.json)
├── components/
│   ├── AppShell.tsx         # Layout-Wrapper
│   ├── TopNav.tsx           # Horizontale Navigation + Mobile Drawer
│   ├── Loesungsfinder.tsx   # 4-Step-Wizard mit Scoring-UI
│   ├── ReferenceCard.tsx    # Referenz-Karte mit Einsatzbereich-Badge
│   ├── ImageGallery.tsx     # Bildergalerie mit Grid + Lightbox (Referenz-Detail)
│   ├── SearchOverlay.tsx    # Volltextsuche (Cmd+K)
│   └── ...                  # LanguageSwitcher, TileGrid, etc.
├── data/
│   ├── referenzen.ts        # 133 Referenzen (DE-Basis, Neubau + Sanierung)
│   ├── produkte.ts          # 71 Produkte mit technischen Daten + Bereich/zusatzBereiche
│   ├── loesungsfinder.ts    # 4-Step-Definitionen + Scoring-Logik
│   ├── types.ts             # Referenz-Interface: sanierungsart/einsatzbereiche/
│   │                        #   zeitDringlichkeit/zusatzfunktionen
│   └── i18n/                # Inhalts-Übersetzungen (EN/FR/PL/ES)
├── scripts/
│   ├── validate-referenzen.ts       # CI-Check: Enum-Werte, Pflichtfelder, Slugs
│   ├── test-loesungsfinder.ts       # Scoring-Smoke-Test
│   ├── match-app-notion.py          # Matching-Report App ↔ Notion-DB
│   ├── build-delta-payloads.py      # Baut Notion-Writeback-Payloads
│   ├── import-notion-referenzen.py  # Importiert Notion-Einträge in referenzen.ts
│   └── cleanup-referenzen.py        # Einmalige Datenmodell-Migration
├── lib/
│   ├── i18n.ts              # Locale-Typen, LOCALES Konstante
│   ├── LocaleContext.tsx    # Client-Context für Locale + Dictionary
│   └── basePath.ts          # GitHub Pages basePath Helper
└── .github/workflows/
    └── deploy.yml           # GitHub Pages Auto-Deploy
```

## Deployment

GitHub Pages via GitHub Actions – bei jedem Push auf `main` wird automatisch gebaut und deployt.

## Status: V3 – Relaunch zu korodur.de

> Detaillierte Stand-Historie V3.1–V3.5 (Website-Integration in Stufen) siehe `CLAUDE.md` → „Aktueller Stand & nächste Iteration".

### V3.5 – Website-Relaunch-Walkthrough umgesetzt (Juni 2026)
- [x] **Bereichs-zentrierte IA** (#72): Bereiche in der Top-Nav, Hover-Mega-Menüs + Mobile-Accordion, Produkt-Gesamtkatalog im Footer
- [x] **Bereichsseiten Neubau + Sanierung** (#73): Einstiege, Referenz-Sektionen, wiederkehrende Kontakt-CTAs, Neubau/Sanierung-Framing nur bei Doppelnutzung
- [x] **Fachberater-Finder** (#90/#91): Berater nach Bereich + PLZ-Region filterbar, Deep-Link `?bereich=`
- [x] **Produkt-Dokumente** (#92/#96/#120): 59 TDS verlinkt, Norm-Korrekturen gegen Excel-SoT, Dokument-Inventar je Produkt
- [x] **Spezialbaustoffe** (#94): NEODUR MSM/MSB als eigene Produktgruppe `spritzmoertel` (vorher fälschlich Betoninstandsetzung)
- [ ] **Offen**: Normen-Glossar (#97), Lösungsfinder-i18n (#103), Bild-System (#105), Varianten-PDP (#110), Kontakt-i18n (#118), Bereichsseiten-Feinschliff (#119) + Epics #72–#80. Spec Produkt-Klassifizierung: `docs/specs/2026-06-14-produkt-klassifizierung-sot.md`

### Backlog Themen
Commit: 0deae98c191a84ed9aded5fbff50f664f9336561 -> Sanierungssysteme (Systemdarstellung als Konzeptbasis)

### V3.0 – UI-Refactoring shadcn/ui + Mobile-First (Juni 2026)
- [x] **shadcn/ui + lucide-react** (PRs #28-#35): UI-Kit in `components/ui/` (CD-kalibriert), Design-Tokens statt Hex, Gabarito self-hosted
- [x] **Overlays auf Radix**: Drawer→Sheet, Suche→CommandDialog, Sprachwahl→DropdownMenu, Lightbox→Dialog+Carousel (Swipe!)
- [x] **Mobile-First**: 44px-Touch-Targets, sticky Wizard-Footer, keine Fonts <12px, Anwendungsmatrix mobil als Anwendungs-Accordion
- [x] **Service-Worker-Fix**: Precache mit basePath (SW installierte in Production nie), Cache `korodur-v3`
- [x] **Aufräumen**: ~700 LOC tote V1-Komponenten + 3 Stub-Routen entfernt, Dev-Server-Skripte `_server.sh`/`_stop_server.sh`
- [ ] Team-Review der neuen Optik; a11y-Folgeentscheidung Link-Kontrast (Brand-Cyan ~2,9:1)

### V2.9 – A2-Gerüst + Referenz-Pilot Norderstedt (Juni 2026)
- [x] **Lösungsfinder A2-Gerüst** (PR #20): kuratierte Zwei-Produkt-Empfehlung hinter Flag `EMPFEHLUNGS_MODUS` (steht auf `"tags"`, A1 bleibt live; Go-Live nach Frank-Sign-off)
- [x] **Referenz #52 `neodur-level-norderstedt`** (PR #25): erste 2026er-Sanierungsreferenz, viersprachig, eigener Bildsatz (6 Bilder, JPEG-optimiert), Schadenstyp `frueher-sanierung`
- [x] **Branch-Hygiene**: obsolete Branches gelöscht, PR #12 geschlossen, remote nur noch `main`
- [ ] `zeitDringlichkeit` Norderstedt: Einreicher-Bestätigung ausstehend
- [ ] `belastbarNach` für NEODUR HE 65 / HE 40: TDS-Daten fehlen, Input Frank

### V2.8 – Anwendungsmatrix (Poster 1:1) (Juni 2026)
- [x] **Anwendungsmatrix als alleinige Matrix**: Web-Projektion des Messeposters (Poster 3:1) – 6 kuratierte Produkte als Spalten, Tech-Werte + Vorteil-Zeile + 6 Anwendungs-Zeilen (✓✓/✓), viersprachig
- [x] **HE 65 Plus durchgängig Kernanwendung** (✓✓ in allen Zeilen)
- [x] **„Mehr Infos"-Link je Produkt**: 5× TDS-PDF, Rapid Set → `korodur.de/bereiche/rapid-set/`
- [x] **Technische Matrix (Produktmatrix V5) entfernt**: Route `/produktmatrix` + `Produktmatrix.tsx` gelöscht, Navigation + Suche zeigen auf die Anwendungsmatrix, toter i18n-Block bereinigt
- [ ] **Schleifverschleiß-Zeile** ausgeklammert (nur 2/6 Produkte mit Böhme-Wert) – intern zu klären, ggf. später nachziehen

### V2.6 – Lösungsfinder Schritt 3 final (Juni 2026)
- [x] **Referenzgedeckter 3+3-Schnitt** in Schritt 3: 6 Cluster statt 8 (zwei leere Außen-Cluster entfernt), jeder Cluster hat Referenzen
  - Innen: Industrie- & Hallenboden, Nass-/Hygiene-/Chemiefläche, Sicht- & Designboden
  - Außen: Verkehrs- & Infrastrukturfläche, Parkdeck & Parkfläche, Umwelt- & WHG-Fläche
- [x] **Belastungs-Tags aufgeräumt**: `chemie` gesplittet in `chemie-treibstoff` (Öl/Lösemittel) und `chemie-aggressiv` (Säuren), `thermik` entfernt, `whg` ergänzt – nicht aus Sulfat/Chlorid abgeleitet
- [x] **Produkt-Tags TDS-korrigiert**: DOT ohne chemie, HE-Welt → treibstoff, Reparaturmörtel → aggressiv, HE 65 Plus + whg
- [x] **51 Referenzen neu auf 6 Cluster gemappt** (WHG-Split Waschstraße/Tankfläche/Hafen), reproduzierbar via `scripts/migrate-refs-v25.ts`
- [x] **Referenz-Fallback** (stufenweises Lockern): zu jeder Empfehlung mindestens eine Referenz, gelockerte Treffer als „Verwandte Projekte"
- [ ] **Team-Hardcore-Test**: Filter-Feinjustierung + Tag-Sign-off (Frank) als Feedback-Schleife. Spec: `docs/specs/2026-06-02-loesungsfinder-step3-spec.md`

### V2.5 – Produktmatrix V5 (Juni 2026)
- [x] **Sanierungs-fokussierte Produktmatrix** statt generischer Eignungstabelle: 13 Matrix-Produkte in 2 Kategorien (6 Industrieestriche + 7 Schnellreparaturmörtel)
- [x] **Sortiments-Konsolidierung**:
  - 3 neue Produkte: NEODUR HE 40, DOT Europe CONCRETE MIX, Rapid Set Schnellbeton
  - 2 entfernt: Rapid Set CONCRETE MIX (→ DOT Europe), KORODUR FSCem Screed
  - KOROCRETE-Refresh aus TDS 09/2021 (FSCem-Basis, C35/45–C50/60)
  - Q-Klassen ergänzt, Schichtdicken korrigiert (HE 65 12–15 mm, Level 5–10 mm, ASPHALT 30–600 mm)
- [x] **Persona-Review-Iteration** (Planer/Architekt + Verleger/GU + Benchmarks MC, Sika, PCI):
  - Spalte "Klassifizierung": Q-Klasse-Pill + Norm (z. B. CT-C60-F8-A6 / DIN 18560-7)
  - Spalte "Druckfestigkeit" (N/mm² 28 d) als Specifying-Anker für Planer
  - Spalte "TDS" mit Download-Icon → Original-PDFs auf korodur.de
  - 5-Dot-Belastbarkeits-Skala für schnelle Last-Einordnung
- [x] **Hero "Produktportfolio Sanierung"** mit 2-Button-CTA (Lösungsfinder + Kontakt korodur.de)
- [x] **i18n-Erweiterung**: Top-Level-Key `produktmatrix` in DE/EN/FR/PL
- [x] **Datenmodell-Erweiterung**: 9 neue Felder am `Produkt`-Interface (`inSanierungsMatrix`, `belastbarkeitsStufe`, `belastbarNach`, `belastbarNachZusatz`, `aussenbereich`, `whgZulassung`, `systemProdukt`, `sichtestrich`, `norm`, `druckfestigkeit`)
- [x] **Validate-Skript erweitert**: Pflichtfelder pro Matrix-Produkt, Min-1-pro-Kategorie
- [x] **TDS-URLs aus Notion-Produktdatenbank** statt Phantom-URLs

### V2.4 (April 2026)
- [x] **Notion-Reconciliation** – App ↔ Notion-Referenzverzeichnis konsolidiert
  - 18 App-Refs fehlten in Notion → dort als Pages mit Strukturfeldern nachgelegt
  - 25 Notion-Refs fehlten in App → in `data/referenzen.ts` importiert (Bilder als Platzhalter)
  - Neue Gesamtzahl: **51 Referenzen**
- [x] **Taxonomie-Refactor** – alte 3er-Kategorisierung (Industrieboden/Industriebau/Infrastruktur + Unterkategorien) durch Lösungsfinder-Taxonomie ersetzt; einziges Modell für alle Referenz-Dimensionen
- [x] **Filter `/referenzen`** – Sanierungsart · Einsatzbereich · Dringlichkeit · Produkt (homogen mit Lösungsfinder)
- [x] `validate-referenzen.ts` als CI-tauglicher Enum-/Pflichtfeld-Validator

### V2.3 (April 2026)
- [x] **Produkt-Mockups** auf Produktkarten und Detailseiten (10 von 16 Produkten)
- [x] **Sprachumschalter** als Flaggen-Dropdown (skalierbar für weitere Sprachen)
- [x] **Hero-Gradient** optimiert — mehr Bild sichtbar, Schrift weiterhin lesbar
- [x] **Hero-Headline** aktualisiert: "Die sichere Sanierungslösung" (alle 4 Sprachen)
- [x] DUROP entfernt (Abstreumaterial, kein eigenständiges Sanierungsprodukt)
- [x] MICROTOP TW + 3 Trinkwasser-Referenzen entfernt (kein Sanierungsthema)
- [x] Hydration-Mismatch (⌘K/Ctrl+K) behoben
- [x] Notion-Produktdatenbank abgeglichen — 4 neue Produkte identifiziert (Referenzen ausstehend)

### V2.2 (April 2026)
- [x] **Bildergalerie** auf Referenz-Detailseiten: 151 Fotos aus Präsentationen extrahiert (3–8 pro Referenz)
- [x] ImageGallery-Komponente: 3-Spalten-Grid, Lightbox mit Pfeiltasten, responsive
- [x] Taxonomie-Vorschlag für Lösungsfinder-Qualifizierung (5 Dimensionen, K.O.-Kriterien)
- [x] Excel-Vorlage für neue Referenzen + Produkt-Qualifizierung
- [x] Extraktions-Scripts für Galerie-Bilder und Excel-Vorlage

### V2.1 (April 2026)
- [x] Filterleiste für alle Portfolio-Kategorieseiten (gleiche UI wie Referenzen-Seite)
- [x] Referenz-Karten in Listenansicht jetzt lokalisiert (waren vorher nur DE)
- [x] Übersetzungen gegen KORODUR Notion-Glossar geprüft und korrigiert (EN/FR/PL)
- [x] Microtop entfernt (eigene externe Landingpage)
- [x] Produktfilter entfernt, Sprachschalter PL-Bug gefixt
- [x] Produktfinder (ehem. "Sanierung finden") umbenannt
- [x] 270 statische Seiten (4 Sprachen × alle Routes)

### V2.0 (April 2026)
- [x] Wizard + Konfigurator zu `/sanierung-finden/` zusammengeführt
- [x] Sidebar-Navigation durch horizontale TopNav ersetzt
- [x] Startseite redesigned: Hero-CTA, Referenz-Highlights
- [x] Polnisch (PL) als 4. Sprache komplett eingebaut

### V1 Basis
- [x] Next.js Projekt mit Static Export
- [x] KORODUR Corporate Design (Gabarito, Navy/Cyan)
- [x] Referenzen mit Daten & Fotos
- [x] Produkte mit technischen Daten & Normen
- [x] Mehrsprachigkeit DE/EN/FR mit i18n-Infrastruktur
- [x] App-Shell, Volltextsuche, Accessibility
- [x] GitHub Pages Deployment

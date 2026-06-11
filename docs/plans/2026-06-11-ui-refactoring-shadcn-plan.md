# UI-Refactoring auf shadcn/ui + lucide-react: Umsetzungsplan

**Datum:** 2026-06-11
**Basis:** `docs/reviews/2026-06-11-ui-stack-deep-dive.md` (Ist-Stand-Analyse, 5 parallele Reader + Synthese)
**Ziel:** Konsistentes, mobil-freundliches UI auf shadcn/ui + lucide-react. Kein Stack-Wechsel: React 19 + Tailwind 4 bleiben, shadcn-Komponenten werden als Quellcode ins Repo generiert.
**Außerhalb des Scopes:** FastAPI-Backend (separate Hosting-Entscheidung, kollidiert mit Static Export auf GitHub Pages). Inhaltliche/Daten-Änderungen.

## Arbeitsmodus

- **Inkrementell gegen `main`:** 7 Feature-Branch-PRs in fester Reihenfolge, kein langlebiger Umbau-Branch (Begründung: aktiver `main`, keine PR-Previews auf GitHub Pages, Commit-Regel "Feature fertig = Commit + Push").
- **Eigener Worktree** für die UI-Arbeit, Haupt-Arbeitsbaum bleibt frei für Tagesgeschäft.
- **Definition of Done je PR:** `npm run build` grün, `npx tsx scripts/test-loesungsfinder.ts` 8/8, `npx tsx scripts/validate-referenzen.ts` ohne neue Fehler, Stichprobe auf Live-Site nach Deploy (Desktop + Mobile-Viewport), neue UI-Strings in allen 4 Dictionaries.

## Harte Constraints (aus dem Deep Dive)

1. Static Export: keine Server-Features; Suspense-Boundary um `useSearchParams` in `referenzen/page.tsx` erhalten; `withBasePath()` für alle rohen Asset-Referenzen (basePath-Falle auf GitHub Pages).
2. i18n-Typvertrag: DE-JSON ist der Typ; jede neue String-Quelle synchron in alle 4 Dictionaries; keine hardcodierten Default-Strings in shadcn-Komponenten.
3. Logik unangetastet oder sauber extrahieren: `berechneErgebnisV25`-Aufruf + Staleness-Guard + PL-Plural (`Ergebnisseite.tsx`), Suchindex (`SearchOverlay.tsx`), `LoesungsfinderState`-Vertrag.
4. Bundle-Disziplin: statische shadcn-Primitives als RSC, Radix nur an Interaktionspunkten.
5. Next-16-Spezifika vor Codeänderung gegen `node_modules/next/dist/docs/` prüfen (AGENTS.md).

## PR-Schnitt

### PR 1: Aufräumen (klein, sofort, unabhängig)
- 6 tote Komponenten löschen (~700 LOC): `Loesungsfinder.tsx`, `ChipSelect.tsx`, `ProgressBar.tsx`, `StepIndicator.tsx`, `CategoryTile.tsx`, `SubcategoryTile.tsx`
- Redirect-Stub-Routen `konfigurator/`, `sanierung-finden/`, `wizard/` konsolidieren (eine Implementierung) oder entfernen, falls keine Alt-Links mehr darauf zeigen; `sanierung`-Dictionary-Segment entsprechend
- Kontakt-URLs zusammenführen: `KONTAKT_URLS` (`Ergebnisseite.tsx:25-30`) + `CONTACT_URLS` (`Footer.tsx:5-9`, `pl` fehlt dort) → ein `lib/`-Modul
- Quickfix Sticky-Filter-Bug: `top-16` statt `top-0` (`referenzen/page.tsx:162`)
- **Akzeptanz:** Build grün, identisches UI (außer Filter-Fix)

### PR 2: Fundament (unsichtbar für Nutzer)
- shadcn-Init mit **manuellem Token-Merge** in `app/globals.css` (Kollision `--background`/`--foreground` auflösen; Navy/Cyan auf `--primary`/`--accent`/`--ring`; `--radius` festlegen, ein Wert statt heutiger 5)
- Deps: `clsx`, `tailwind-merge`, `class-variance-authority`, `tw-animate-css`, `lucide-react`; `components.json` (`cssVariables: true`, Aliase `@/components`/`@/lib`)
- Eigene Animations-/Utility-Klassen (`globals.css:77-153`) und globales `*:focus-visible` gegen shadcn-Pendants konsolidieren
- Gabarito auf `next/font` umstellen (self-hosted, ersetzt render-blockendes `@import`)
- Icon-Wrapper mit `strokeWidth={1.75}` (optische Parität zu `icons.tsx`)
- **Akzeptanz:** Build grün, Live-Site optisch unverändert

### PR 3: Primitives flächig
- `Button` einführen: 4 Sekundär- + 3 Primär-Implementierungen ablösen (`Wizard`, `Ergebnisseite` 2x, `ReferenzPdf`, `Footer`-CTA)
- `Badge`: 5+ Chip-Varianten vereinheitlichen; `Card`: Hover-JS eliminieren (`ReferenceCard` wird RSC-fähig); `Breadcrumb` (1:1)
- Alle Hex-Literale (`text-[#002d59]` etc.) und `NAVY`-Konstanten (9 Dateien) gegen Tokens tauschen
- Verstreute Inline-SVGs gegen lucide tauschen (Mapping-Tabelle §4 des Deep Dive)
- **Akzeptanz:** keine Hex-Literale mehr in Komponenten, einheitlicher Radius, identische Funktionalität

### PR 4: Overlays (löst Mobile-Top 4-7)
- TopNav-Drawer → `Sheet` (Scroll-Lock, Focus-Trap, Touch-Targets)
- SearchOverlay → `CommandDialog`; **vorher** Suchindex nach `lib/` extrahieren
- LanguageSwitcher → `DropdownMenu`; ImageGallery → `Dialog` + `Carousel` (Swipe)
- AppShell-Client-Grenze nach unten ziehen (nur TopNav Client), Footer aus `<main>` heraus
- **Akzeptanz:** Touch-Targets ≥ 44px in Navigation, Drawer/Suche/Lightbox mit Scroll-Lock + Escape, Lightbox swipebar

### PR 5: Lösungsfinder V25
- `OptionCard` + `Ergebnisseite` von Inline-Styles auf `Card`/`Badge`/`Button` + cva
- `ProduktBanner` deduplizieren (Top-Empfehlung/Alternative, ~70 Zeilen doppelt)
- Wizard: sticky Footer-Navigation mobil (Step 3 Weiter-Button unter dem Fold)
- Logik-Extraktion vorab in Hooks, UI danach (Constraint 3)
- **Akzeptanz:** Lösungsfinder-Smoke-Test 8/8, Ergebnisseite mobil ohne nowrap-Abschnitte/Mini-Fonts

### PR 6: Anwendungsmatrix (größter Einzelposten, separat detailplanen)
- Mobile-Alternativ-Layout: pro Produkt `Card` + `Accordion`, Tabelle erst ab `lg:`
- Desktop: `Table` + `Badge` + `Tooltip`, Sticky-Column custom
- Eigenes i18n-Fallback-Pattern (`t(dict, key, fallbackDE)`) an App-Standard angleichen
- **Akzeptanz:** Matrix auf 375px-Viewport ohne Horizontal-Scroll nutzbar

### PR 7: Deploy-Hygiene
- Service-Worker-Precache-Bug fixen (`public/sw.js:7-13`: basePath fehlt → `addAll` rejected in Production; `/pl/` ergänzen), `CACHE_NAME` → `korodur-v3`
- Hero-Padding responsive (`page.tsx:74`), H1-clamp Anwendungsmatrix, restliche Mobile-Befunde aus §6
- **Akzeptanz:** SW installiert auf GitHub Pages (DevTools-Check), Lighthouse-Mobile-Stichprobe

## Aufwand und Reihenfolge-Logik

| PR | Aufwand | Risiko | Abhängigkeit |
|---|---|---|---|
| 1 Aufräumen | S | minimal | keine |
| 2 Fundament | M | mittel (Token-Merge) | keine |
| 3 Primitives | M | gering | PR 2 |
| 4 Overlays | M | mittel (Radix-Verhalten) | PR 2 |
| 5 Lösungsfinder | M-L | mittel (Logik-Nähe) | PR 3 |
| 6 Anwendungsmatrix | L | hoch (Neukonzept Mobile) | PR 3 |
| 7 Deploy-Hygiene | S | gering | keine (SW-Fix auch früher möglich) |

PR 1 und der SW-Fix aus PR 7 sind unabhängig vom shadcn-Einbau und können jederzeit vorgezogen werden.

## Offene Entscheidungen (Steffi)

1. **Redirect-Stubs** (`konfigurator/`, `sanierung-finden/`, `wizard/`): löschen oder konsolidieren? (Frage: Existieren noch externe Links/QR-Codes auf diese Pfade?)
2. **Go für Umsetzung** nach Plan-Review: PRs 1+2 als Start.

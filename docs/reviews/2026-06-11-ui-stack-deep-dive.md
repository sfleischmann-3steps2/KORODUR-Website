# UI-Stack Deep Dive (Ist-Stand 2026-06-11)

## 1. Executive Summary

Der Stack (Next.js 16.2.2, React 19.2.4, Tailwind 4.2.2, Static Export) ist mit aktuellem shadcn/ui und lucide-react voll kompatibel, harte Blocker existieren nicht. Der eigentliche Kostentreiber ist nicht die Installation, sondern der Zustand des UI-Codes: Design-Tokens sind in `app/globals.css` angelegt, werden aber von null Komponenten genutzt; stattdessen konkurrieren Hex-Literale in Arbitrary-Klassen, JS-Konstanten in 9 Dateien und massives Inline-Styling. Größtes Risiko: die Inline-Style-Architektur (Ergebnisseite, OptionCard, Anwendungsmatrix, Seiten-Container) blockiert responsive Overrides komplett und macht die App auf Mobile teils unbenutzbar (Anwendungsmatrix mit 980px-Mindestbreite, Sticky-Filter-Bug, Touch-Targets unter 44px). Zweites Risiko: ein Bug im Service-Worker-Precache (`public/sw.js:7-13`, basePath fehlt), der die SW-Installation in Production vermutlich scheitern lässt. Größte Chancen: 6 tote Komponenten-Dateien (~700 LOC, per Grep verifiziert) können vor dem Refactoring gelöscht werden; drei handgerollte Overlays (Drawer, Suche, Lightbox) haben exakte shadcn-Pendants (`Sheet`, `CommandDialog`, `Dialog`+`Carousel`); fast alle ~25 Eigenbau-SVGs plus verstreute Inline-SVGs sind 1:1 durch lucide ersetzbar. Daten-, i18n- und PDF-Schicht sind sauber entkoppelt und bleiben weitgehend unberührt.

## 2. Komponenten-Inventar & shadcn-Mapping

**Status-Legende:** RSC = Server Component, C = Client. Tot = von keiner Route importiert (per Grep verifiziert).

### components/ (Top-Level)

| Komponente | Datei (LOC) | Status | Client/Server | shadcn-Mapping |
|---|---|---|---|---|
| AppShell | `components/AppShell.tsx` (26) | aktiv | C (unnötig, keine Hooks) | bleibt custom, kann RSC werden |
| TopNav | `components/TopNav.tsx` (232) | aktiv | C | `NavigationMenu` (Desktop), `Sheet` (Mobile-Drawer Z. 162-222), `Button size="icon"` |
| SearchOverlay | `components/SearchOverlay.tsx` (237) | aktiv | C | `Command` + `CommandDialog` (1:1, ersetzt Eigenbau-Keyboard-Logik Z. 97-119) |
| LanguageSwitcher | `components/LanguageSwitcher.tsx` (115) | aktiv | C | `DropdownMenu` (ersetzt Close-Logik Z. 34-56) |
| Footer | `components/Footer.tsx` (95) | aktiv | RSC (wird via AppShell-Import Client) | custom; CTA als `Button` |
| ReferenceCard | `components/ReferenceCard.tsx` (92) | aktiv | C (nur wegen Hover-JS Z. 28-33) | `Card` + `Badge`, Hover per CSS, dann RSC-fähig |
| TileGrid | `components/TileGrid.tsx` (13) | aktiv (`produkte/[id]/page.tsx:6`) | RSC | bleibt custom oder inline |
| Breadcrumb | `components/Breadcrumb.tsx` (38) | aktiv | RSC | `Breadcrumb` (1:1) |
| ImageGallery | `components/ImageGallery.tsx` (120) | aktiv | C | `Dialog` + `Carousel` (embla, touch-fähig) |
| ReferenzPdf | `components/ReferenzPdf.tsx` (67) | aktiv | C | `Button variant="outline"` + lucide `Download` |
| Anwendungsmatrix | `components/Anwendungsmatrix.tsx` (325) | aktiv | RSC | `Table` + `Badge` + `Tooltip`; mobil `Card`+`Accordion`-Alternative; Sticky-Col custom |
| RedirectToLocale | `components/RedirectToLocale.tsx` (14) | aktiv | C | kein Pendant |
| ServiceWorkerRegistrar | `components/ServiceWorkerRegistrar.tsx` (27) | aktiv | C | kein Pendant |
| Loesungsfinder | `components/Loesungsfinder.tsx` (294) | **tot** (V1-Wizard) | C | löschen statt migrieren |
| ChipSelect | `components/ChipSelect.tsx` (116) | **tot** (nur von totem Loesungsfinder importiert) | C | löschen |
| ProgressBar | `components/ProgressBar.tsx` (65) | **tot** (dito) | C | löschen |
| StepIndicator | `components/StepIndicator.tsx` (58) | **tot** | C | löschen |
| CategoryTile | `components/CategoryTile.tsx` (96) | **tot** | C | löschen |
| SubcategoryTile | `components/SubcategoryTile.tsx` (41) | **tot** | RSC | löschen |

Hinweis Widerspruch: Der Mobile-Bericht nannte nur 4 tote Dateien, der Routen-Bericht 6. Grep bestätigt 6 (CategoryTile und SubcategoryTile sind ebenfalls nirgends importiert). TileGrid ist dagegen aktiv.

### components/loesungsfinderV25/

Alle laufen im Client-Bundle, da nur über `Wizard.tsx:8` (`"use client"`) importiert.

| Komponente | Datei (LOC) | shadcn-Mapping |
|---|---|---|
| Wizard | `Wizard.tsx` (169) | Orchestrierung custom; Buttons → `Button` |
| ProgressHeader | `ProgressHeader.tsx` (54) | custom oder `Progress`; Abbrechen → `Button variant="ghost"` |
| Step1-4 | (55/53/81/57) | dünne Wrapper um OptionCard, bleiben custom |
| OptionCard | `OptionCard.tsx` (146) | `Card` + Toggle-Semantik (aria-pressed vorhanden); Hauptkandidat, komplett Inline-Styles |
| Ergebnisseite | `Ergebnisseite.tsx` (519) | `Badge` (Chips Z. 138-152), `Card` (Banner Z. 160-315, Grid Z. 368-402), `Button` (Z. 476-493), `Alert` (Empty-States) |
| icons | `icons.tsx` (268) | komplett durch lucide-react ersetzbar (§4) |

### Wiederverwendungs-Lücken (Konsolidierungsziele)

1. Karte mit Hover-Schatten per JS-Mouse-Handler 2x kopiert (`ReferenceCard.tsx:23-33`, dazu in toten Tiles) → eine `Card`-Basis mit CSS-Hover.
2. Produkt-Banner doppelt: Top-Empfehlung und Alternative in `Ergebnisseite.tsx:160-233` / `240-315` sind ~70 Zeilen fast identische Inline-Style-JSX → eine `ProduktBanner`-Komponente mit `variant`-Prop.
3. Sekundär-Button (Outline, Navy) 4x implementiert (`Wizard.tsx:138-149`, `Ergebnisseite.tsx:476-493` 2x, `ReferenzPdf.tsx:38-49`), jeweils mit abweichendem Radius/Border → `Button variant="outline"`.
4. Primär-CTA (Cyan) 3x (`Footer.tsx:49-62`, `Ergebnisseite.tsx:442-462`) → `Button` Default-Variante.
5. Badge/Chip mindestens 5x mit eigenen Inline-Styles (ReferenceCard 2x, Ergebnisseite, SearchOverlay-Typ-Label, Count-Pill) → `Badge` mit Varianten.
6. Drei Eigenbau-Modals (TopNav-Drawer, SearchOverlay, ImageGallery-Lightbox) → `Sheet`, `CommandDialog`, `Dialog`.
7. Kontakt-URL-Map doppelt: `KONTAKT_URLS` (`Ergebnisseite.tsx:25-30`) vs. `CONTACT_URLS` (`Footer.tsx:5-9`, dort fehlt `pl`) → shared `lib/`-Modul.
8. Logo-Block 2x in `TopNav.tsx:79-92` und `184-192`; Lupe- und External-Link-SVG je 3x wortgleich dupliziert.

## 3. Styling-Konsistenz & Design-Tokens

**Kernbefund:** Tokens existieren (`app/globals.css:4-39`: `--navy: #002d59`, `--cyan: #009ee3`, `--cyan-hover`, `--light-gray` etc., via `@theme inline` als `text-navy`/`bg-cyan` verfügbar), aber keine einzige Komponente nutzt sie. Drei konkurrierende Muster:

1. Hex-Literale in Arbitrary-Klassen: `text-[#002d59]`, `bg-[#009ee3]`, `border-[#e8edf5]` (TopNav.tsx:67, ReferenceCard.tsx:53, Breadcrumb.tsx:19, durchgängig)
2. JS-Konstanten + Inline-Styles: `const NAVY = "#002d59"` redundant in 9 Dateien (alle V25-Dateien, `Anwendungsmatrix.tsx:13`, `anwendungsmatrix/page.tsx:17-20`)
3. Generische Tailwind-Grautöne statt Brand-Palette: `text-gray-600`, hartkodierte `#6B7280`/`#4B5563`/`#9ca3af`

**Konkrete Inkonsistenzen:**

- **Karten-Radius:** mindestens 5 Werte (14 in ReferenceCard.tsx:25, 12 in OptionCard.tsx:44, 12/8 in Ergebnisseite.tsx:166/375, 16 via `rounded-2xl` in SearchOverlay.tsx:148 und Wizard.tsx:116)
- **Button-Radius:** 6 (`ReferenzPdf.tsx:41`) vs. 8 (`Wizard.tsx:141`, `Footer.tsx:53`)
- **Hellgrau-Chaos:** `#ececed` (als `HELLGRAU`-Konstante, als Hardcode in Wizard.tsx:116, als `--light-gray` in globals.css:12), daneben `#f5f5f6` (`--icon-bg`), `#e8edf5` (`--bullet-bg`), Disabled-Fremdfarben `#E5E4DE`/`#8A8983` (Wizard.tsx:157-158)
- **Grau-Borders für dieselbe Rolle:** `#e8edf5` (TopNav) vs. `#d9dada` (`MITTELGRAU`, Wizard.tsx:29) vs. `#dfe7f1` (`LINE`, Anwendungsmatrix.tsx:16)
- **Typografie:** Alt-Bestand `fontWeight: 900` (ReferenceCard.tsx:53, Footer.tsx:68) vs. V25 `fontWeight: 500` (OptionCard.tsx:66); Font-Größen als Mix aus `text-[10px]` bis `text-[22px]`, Tailwind-Stufen und Inline `fontSize: 11/12/12.5/13/15`
- **Schatten:** `0 8px 40px rgba(0,45,89,0.10)` + Hover per JS-Handler mehrfach kopiert, daneben `shadow-2xl`/`shadow-lg`
- **Spacing:** Inline-Pixelwerte (`padding: "14px 18px"`, `gap: 16`) vs. Tailwind-Klassen ohne erkennbares Raster

**Sonderfall:** OptionCard/Ergebnisseite sind bewusst komplett inline gestylt wegen eines dokumentierten Tailwind-4-JIT-Problems (`OptionCard.tsx:5-8`). Mit shadcn (statische Komponenten-Klassen statt dynamisch generierter) entfällt diese Begründung.

**Token-Strategie fürs Refactoring:** Bestehende Brand-Variablen auf shadcn-Semantik mappen (`--primary` = Navy oder Cyan, `--accent`, `--muted`, `--border`, `--ring`, `--radius`) und alle Hex-Literale, JS-Konstanten und Inline-Styles dagegen ablösen. Achtung Namenskollision: `--background`/`--foreground` und `--color-background`/`--color-foreground` sind in `globals.css:17-18, 36-37` bereits mit KORODUR-Semantik belegt, exakt diese Namen will shadcn-Init schreiben. Manueller Merge nötig, das ist die eigentliche Arbeit der Installation.

## 4. Icon-Inventar & Lucide-Mapping

### components/loesungsfinderV25/icons.tsx (~25 Eigenbau-SVGs, Tabler-Stil)

| Eigenbau | lucide-react | Eigenbau | lucide-react |
|---|---|---|---|
| IconTarget | `Target` | IconFactory | `Factory` |
| IconGridPattern | `LayoutGrid` | IconChefHat | `ChefHat` |
| IconSquare | `Square` | IconShoppingCart | `ShoppingCart` |
| IconWarehouse | `Warehouse` | IconParking | `SquareParking` |
| IconSun | `Sun` | IconTruckLoading | `Truck` |
| IconCheck | `Check` | IconBuildings | `Building2` |
| IconRefresh | `RotateCw` | IconRoad | **kein Pendant**, `TrafficCone` oder custom behalten |
| IconArrowLeft | `ArrowLeft` | IconClockBolt | `Timer` (näherungsweise) |
| IconArrowRight | `ArrowRight` | IconCalendar | `Calendar` |
| IconX | `X` | IconCalendarMonth | `CalendarDays` |
| IconForklift | `Forklift` | IconFlame | `Flame` |
| IconPhone | `Phone` | IconEdit / IconExternalLink | ungenutzt, entfallen |

Optik-Hinweis: `icons.tsx` nutzt `strokeWidth: 1.75` (Z. 14), lucide-Default ist 2. Für identische Anmutung `strokeWidth={1.75}` setzen, idealerweise zentral über einen Icon-Wrapper.

### Verstreute Inline-SVGs und Text-Glyphen

| Stelle | Ist | lucide |
|---|---|---|
| TopNav.tsx:122-125, 139-142; SearchOverlay.tsx:153-156 | Lupe (3x dupliziert) | `Search` |
| TopNav.tsx:153-155 | Hamburger (3 spans) | `Menu` |
| TopNav.tsx:199-201; ImageGallery.tsx:62 ("✕") | Close | `X` |
| SearchOverlay.tsx:204-208; Footer.tsx:57-61; produkte/[id]/page.tsx:254-258 | External Link (3x dupliziert) | `ExternalLink` |
| Footer.tsx:36-38 | Telefon | `Phone` |
| ReferenceCard.tsx:60-63 | Map-Pin | `MapPin` |
| app/[lang]/page.tsx:133-135 | Chevron rechts | `ChevronRight` |
| LanguageSwitcher.tsx:72-85 | Chevron down | `ChevronDown` |
| ReferenzPdf.tsx:50-63 | Download | `Download` |
| produkte/[id]/page.tsx:187-190 | Check-Circle | `CircleCheck` |
| ImageGallery.tsx:76,106 ("‹"/"›") | Prev/Next | `ChevronLeft`/`ChevronRight` |
| Anwendungsmatrix.tsx:76, 291-295 ("✓✓"/"✓") | Text-Checkmarks | `Check` oder behalten |

lucide-react ist ESM mit per-Icon-Modulen, sauber tree-shakebar (1-2 KB pro Icon), SSG-tauglich (reine SVG-Render-Funktionen, auch in RSC nutzbar) und steht in Next 16 bereits in der Default-Liste von `optimizePackageImports` (verifiziert in `node_modules/next/dist/server/config.js:988`). Kein Konfigurationsaufwand.

## 5. Routen, Altlasten & Client/Server-Grenzen

### Routenbaum (Kurzform)

- `app/[lang]/`: Startseite, `loesungsfinder/`, `anwendungsmatrix/`, `produkte/` (+ `[id]`), `referenzen/` (+ `[slug]`, 539 Z., größte Seite). 4 Locales (de/en/fr/pl), aktueller Build: 368 index.html. (CLAUDE.md nennt 380, der Build-Stand ist autoritativ.)
- **Altlasten:** `konfigurator/`, `sanierung-finden/`, `wizard/` sind drei funktional identische Client-Redirect-Stubs auf `loesungsfinder/`, je mit eigenem Metadata-Layout, untereinander inkonsistent implementiert (`useLocale` vs. `useParams`). Das Dictionary-Segment `sanierung` wird nur noch von diesen drei Layouts genutzt. Dazu `app/referenzen/` (sprachlos): 1 + 53 statische Redirect-Seiten für alte Deep-Links.

### Client/Server-Split

- **RSC:** beide Layouts, Startseite, loesungsfinder-, anwendungsmatrix-, produkte-Seiten, `referenzen/[slug]`. Muster: Dictionary serverseitig laden (`dictionaries.ts` ist `server-only`), Strings als Props an Client-Inseln.
- **Problem 1, Client-Grenze zu hoch:** `AppShell.tsx:1` ist Client und umschließt in `app/[lang]/layout.tsx:58` die gesamte Seite, obwohl AppShell keine Hooks hat. Children bleiben RSC, aber TopNav/Footer/AppShell-Code landet komplett im Client-Bundle (Footer hat kein `"use client"`, wird durch den Import trotzdem Client-Modul).
- **Problem 2, ganze Seite Client:** `app/[lang]/referenzen/page.tsx:1` (Filter-State, `useSearchParams` mit Suspense). Beim Umbau die Suspense-Boundary um `useSearchParams` erhalten, sonst Build-Fehler im Static Export.
- **Problem 3, doppelte i18n-Verteilung:** `LocaleProvider` (`layout.tsx:57`) serialisiert das komplette Dictionary (229 Strings) in den RSC-Payload jeder Seite; TopNav bekommt `dict` zusätzlich als Prop (`AppShell.tsx:19`).
- **Semantik:** Footer sitzt innerhalb von `<main>` (`AppShell.tsx:20-23`), beim Refactoring korrigieren.
- **Navigation:** kanonische `navLinks` in `TopNav.tsx:56-62`, 2x gerendert (Desktop/Drawer, gleiche Quelle, ok). Footer pflegt eigene Links und Kontakt-URLs separat. Breadcrumb wird nur auf Produkt- und Referenz-Seiten genutzt, nicht auf Startseite/Lösungsfinder/Anwendungsmatrix; "Home"-Label hardcodiert (`Breadcrumb.tsx:20`).

shadcn passt zur Insel-Struktur: statische Primitives (Card, Badge, Table, Breadcrumb) bleiben RSC-fähig und JS-frei, nur Radix-Komponenten (Dialog, Sheet, Command, DropdownMenu) brauchen die Client-Grenze.

## 6. Mobile-Audit (priorisierte Top-10)

Befundlage: Breakpoints nur punktuell (`sm:` 16x, `md:` 28x, `lg:` 11x, `xl:`/`2xl:` nie), keine Mobile-First-Systematik. Strukturelles Grundproblem: Layout-Werte in `style={{...}}` (`maxWidth: 1320`, `padding: "0 32px"`, komplette V25- und Matrix-Styles) sind per Breakpoint nicht überschreibbar. shadcn/cva löst das strukturell.

1. **Anwendungsmatrix mobil nicht nutzbar** (`Anwendungsmatrix.tsx:107-123`): `minWidth: 980`, fixe Spaltenbreiten, 11-13px Schrift, Zwangs-Horizontal-Scroll ohne Indikator. shadcn `Table` löst das nicht allein; nötig ist ein Mobile-Alternativ-Layout (pro Produkt eine `Card` mit `Accordion`, Tabelle erst ab `lg:`). Größter Einzelaufwand, größter Hebel.
2. **Sticky-Filter-Bug** (`referenzen/page.tsx:162` `z-30 top-0` vs. `TopNav.tsx:67` `z-40 top-0`): Filterleiste verschwindet beim Scrollen hinter der 64px-Nav. Quickfix `top-16`; im Refactoring Filter mobil in ein `Sheet`, Selects als `Select`.
3. **Inline-Style-Architektur** (Ergebnisseite, OptionCard, Anwendungsmatrix, alle Container mit `maxWidth: 1320`): Voraussetzung für alle weiteren Fixes; JIT-Workaround-Grund (`OptionCard.tsx:5-8`) entfällt mit shadcn.
4. **Touch-Targets unter 44px in Kern-Navigation** (`TopNav.tsx:134-156` Hamburger ~36x30, Such-Button ~34x34; `LanguageSwitcher.tsx:60-63` ~30px; `ProgressHeader.tsx:44-51` Abbrechen ~20px): `Button size="icon"` und `DropdownMenu` lösen das per Default.
5. **Mobile-Drawer ohne Scroll-Lock/Focus-Trap** (`TopNav.tsx:162-221`): `Sheet` liefert Scroll-Lock, Focus-Trap, Escape, ARIA komplett.
6. **SearchOverlay ohne Scroll-Lock, Tastatur-Kollision** (`SearchOverlay.tsx:136-174`, `paddingTop: min(20vh, 160px)` kollidiert mit geöffneter Tastatur): `CommandDialog` ist das exakte Pendant inkl. Keyboard-Navigation.
7. **Lightbox ohne Swipe, Mini-Glyphen-Navigation** (`ImageGallery.tsx:41-117`, `role="dialog"` ohne `aria-modal`): `Dialog` + `Carousel` (embla, touch-fähig).
8. **Hero mit fixem Desktop-Padding** (`app/[lang]/page.tsx:74`: `120px/140px`, `minHeight: 560`): reine Tailwind-Korrektur (`py-16 md:py-32`).
9. **Ergebnisseite-Banner und Mini-Fonts** (`Ergebnisseite.tsx:161-233`: starre Flex-Row mit nowrap-Ellipsis Z. 207-218; 9 Stellen mit 10-12.5px): `Card` mobil gestapelt, `line-clamp-2` statt nowrap, Chips als `Badge` mit Token-Größen.
10. **Wizard Step 3: Weiter-Button unter dem Fold** (`Wizard.tsx:136-166` + `Step3Einsatzbereich.tsx:61`, 6 gestapelte Karten): mobil sticky Footer (`sticky bottom-0`) für die Navigation, `Button`-Größen, optional `RadioGroup`-Semantik.

Weitere Befunde: `anwendungsmatrix/page.tsx:54` H1 mit `fontSize: 42` ohne clamp (alle anderen H1s nutzen `clamp()`); `referenzen/[slug]/page.tsx:321` `grid-cols-2` ohne `sm:`-Stufe; `ImageGallery.tsx:82` Lightbox-Bild fix `90vw/80vh`; TDS-Links in der Matrix 11px ohne Padding (`Anwendungsmatrix.tsx:164-178`).

## 7. Daten-/i18n-Kopplung & PDF

**Datenfluss:** Pages importieren Daten direkt und reichen sie als Props weiter (sauber, refactoring-stabil). Fünf aktive Komponenten sind daten-gekoppelt:

| Komponente | Kopplung |
|---|---|
| `SearchOverlay.tsx:5-6, ab 41` | importiert `referenzen` + `produkte` komplett, baut Suchindex selbst → vor dem Umbau auf `CommandDialog` Index-Logik nach `lib/` extrahieren |
| `Anwendungsmatrix.tsx:3-11, 31` | engste Kopplung im Repo: `Cell`/`Mark`/`SpeedTier` aus `data/anwendungsmatrix.ts`, eigenes i18n-Fallback `t(dict, key, fallbackDE)` (Z. 23-28), `{key, de}`-Zellschema |
| `Ergebnisseite.tsx:21, 79, 96` | ruft `berechneErgebnisV25` im Client auf, async Client-Lokalisierung mit Staleness-Guard (Z. 86-110), PL-Pluralisierung (Z. 61-74) → Logik 1:1 erhalten oder vorher in Hooks extrahieren |
| `Step3Einsatzbereich.tsx:14` | Labels aus `data/einsatzbereichMapping.ts` |
| `ReferenceCard.tsx:6` | `bereichLabel` aus `data/einsatzbereichMapping.ts` |

**i18n-Mechanik:** drei Schichten (Dictionary-JSONs via `getDictionary()`, `LocaleProvider`/`useLocale()` als Client-Bridge, Content-Overrides via `data/i18n/getLocalized.ts` mit Spread-Merge). Der `Dictionary`-Typ wird aus dem DE-JSON inferiert (`dictionaries.ts:17`), JSON-Struktur = Typvertrag. Zwei Konsum-Stile parallel (dict als Prop in Shell-Komponenten vs. Hook in V25); beim Refactoring auf einen Stil festlegen. Hardcoding-Sünden mit bereinigen: aria-Labels als `lang ===`-Ternaries (`TopNav.tsx:120, 137, 151`, `SearchOverlay.tsx:163, 218-231`), Übersetzungen in der Datenschicht (`data/einsatzbereichMapping.ts:41-120`). Neue Strings immer in alle 4 JSONs (Pflicht). shadcn-Komponenten dürfen keine Default-Strings hardcoden.

**PDF:** sauber entkoppelt. `lib/pdf.ts` (249 Z.) ist reines jspdf ohne React/DOM-Rendering, Labels kommen als `PdfLabels`-Parameter rein. Einziger Touchpoint: der Trigger-Button `ReferenzPdf.tsx:38-65` (Inline-Styles + Hand-SVG) wird trivial zu `<Button variant="outline">` + `<Download />`. PDF-Erzeugung selbst: null Aufwand.

## 8. Build/Deploy & Kompatibilität (shadcn + Tailwind 4 + Static Export)

**Kompatibilität: voll gegeben, keine harten Blocker.**

- **shadcn/ui:** Tailwind 4 + React 19 sind der Default-Pfad (kein `forwardRef` mehr, `data-slot`-Attribute, `tw-animate-css` statt `tailwindcss-animate`, `sonner` statt `toast`). shadcn ist reiner Code-Generator, kein Runtime-Server; Radix-Primitives funktionieren als Client Components im Static Export normal nach Hydration. Kein `components.json` vorhanden (Greenfield-Init); zu setzen: `tailwind.css: "app/globals.css"`, `cssVariables: true`, Aliase `@/components`/`@/lib`. Der `@/*`-Alias (`tsconfig.json:22`) passt. Neue Deps: `clsx`, `tailwind-merge`, `class-variance-authority`, `tw-animate-css`, Radix-Pakete pro Komponente; CLI legt `lib/utils.ts` (cn) an, kein Konflikt mit `lib/basePath.ts`.
- **Static-Export-Constraints** (`next.config.ts:3-10`): `output: "export"`, `basePath: "/KORODUR-Sanierung_app"` nur in Production, `trailingSlash: true`, `images.unoptimized: true`. Keine API-Routes, keine Server Actions, kein dynamisches `searchParams` serverseitig. Alle dynamischen Routen haben `generateStaticParams`.
- **Refactoring-Falle basePath:** Wert ist in `lib/basePath.ts:1-6` hart dupliziert. Neue Komponenten, die Assets roh per `/images/...` referenzieren, funktionieren lokal und brechen auf GitHub Pages; `next/link`/`next/image` prefixen automatisch, rohe `<img>`/`href`/`url()` nicht → `withBasePath()` nutzen.
- **Service Worker** (`public/sw.js`, `korodur-v2`): network-first für HTML, cache-first für `/_next/static/`. Fürs Refactoring grundsätzlich unkritisch (neue Chunks = neue Hashes), aber: **Bug im Precache** (Z. 7-13): `cache.addAll(["/", "/de/", ...])` ignoriert den basePath, liefert auf GitHub Pages 404, `addAll` rejected, SW-Installation schlägt in Production vermutlich fehl; `/pl/` fehlt zudem. Im Refactoring fixen und `CACHE_NAME` auf `korodur-v3` bumpen (activate-Handler purged dann Altbestand). Bei stale wirkendem Verhalten nach Deploy zuerst SW verdächtigen.
- **Token-Kollision:** `--background`/`--foreground` bereits belegt (siehe §3), manueller Merge statt blindem shadcn-Init.
- **Weitere Gotchas:** eigene Animations-/Utility-Klassen (`globals.css:77-153`) überlappen mit `tw-animate-css` und Sheet/Drawer-Animationen → konsolidieren. Globales `*:focus-visible` (`globals.css:156-160`) kollidiert mit shadcn-Ring-Utilities, eines muss weichen. Font Gabarito via render-blockendem Google-Fonts-`@import` (`globals.css:1`) plus Inline-fontFamily in `layout.tsx:52` → auf `next/font` umstellen (Static-Export-kompatibel, self-hosted). Bundle-Wachstum: jede Radix-Komponente addiert Client-JS, Radix gezielt nur wo Interaktion nötig. Next-16-Eigenheiten: generierte Komponenten gegen `node_modules/next/dist/docs/` prüfen (AGENTS.md-Pflicht). Kein Test-Runner; Absicherung nur über `npx tsx scripts/validate-referenzen.ts`, `scripts/test-loesungsfinder.ts` und den Build selbst.

## 9. Konsequenzen für den Refactoring-Plan

**Harte Constraints:**
- Static Export: keine Server-Features, Suspense-Boundary um `useSearchParams` in `referenzen/page.tsx` erhalten, `withBasePath()` für alle rohen Asset-Referenzen.
- i18n-Typvertrag: jede neue UI-String-Quelle synchron in alle 4 Dictionary-JSONs.
- Logik-Blöcke unangetastet lassen oder sauber extrahieren: `berechneErgebnisV25`-Aufruf, Staleness-Guard und PL-Plural in `Ergebnisseite.tsx`, Suchindex in `SearchOverlay.tsx`, `LoesungsfinderState`-Vertrag aus `data/types.ts`.
- Statische shadcn-Primitives als RSC halten, Radix nur an Interaktionspunkten (Bundle-Disziplin).

**Empfohlene Reihenfolge:**

1. **Aufräumen (billig, sofort):** 6 tote Komponenten löschen (~700 LOC), 3 Redirect-Stub-Routen (`konfigurator/`, `sanierung-finden/`, `wizard/`) und das `sanierung`-Dictionary-Segment prüfen/entfernen, Kontakt-URLs in `lib/` zusammenführen, Sticky-Filter-Quickfix (`top-16`).
2. **Fundament:** shadcn-Init mit manuellem Token-Merge in `globals.css` (Navy/Cyan auf `--primary`/`--accent`/`--ring`/`--radius`, Kollision `--background`/`--foreground` auflösen), `next/font` für Gabarito, lucide-react installieren, Icon-Wrapper mit `strokeWidth={1.75}`.
3. **Primitives flächig:** `Button` (4 Sekundär- + 3 Primär-Implementierungen ablösen), `Badge` (5+ Chip-Varianten), `Card` (Hover-JS eliminieren, ReferenceCard wird RSC-fähig), `Breadcrumb`. Dabei alle Hex-Literale und NAVY-Konstanten gegen Tokens tauschen.
4. **Overlays:** TopNav-Drawer → `Sheet`, SearchOverlay → `CommandDialog` (vorher Index nach `lib/`), LanguageSwitcher → `DropdownMenu`, ImageGallery → `Dialog` + `Carousel`. Löst gleichzeitig Scroll-Lock, Focus-Trap und Touch-Target-Probleme (Mobile-Top 4-7).
5. **Lösungsfinder V25:** OptionCard und Ergebnisseite von Inline-Styles auf Card/Badge/Button + cva, ProduktBanner deduplizieren, sticky Wizard-Footer mobil. Reine Optik, solange State- und Datenverträge stehen.
6. **Anwendungsmatrix zuletzt:** größter Einzelposten (Datenkopplung + eigenes i18n-Pattern + Mobile-Alternativ-Layout als `Card`/`Accordion` unter `lg:`). Separat planen.
7. **Deploy-Hygiene als fester Schritt:** SW-Precache-basePath-Fix, `/pl/` ergänzen, `CACHE_NAME` → `korodur-v3`, AppShell-Client-Grenze nach unten ziehen (nur TopNav Client), Footer aus `<main>` heraus.

**Aufwandstreiber (absteigend):** Anwendungsmatrix (Mobile-Neukonzept + Datenschema), Ergebnisseite (519 Z. Inline-Styles + Logik-Extraktion), Token-Merge in `globals.css`, SearchOverlay-Index-Extraktion, TopNav-Umbau. Billig sind dagegen alle Props-getriebenen Präsentationskomponenten (ReferenceCard, Breadcrumb, ReferenzPdf, Wizard-Steps, Footer): Drop-in-Ersatz.

**Offene Punkte:** Seitenzahl 368/369 (Build) vs. 380 (CLAUDE.md V2.4-Eintrag): historischer Doku-Stand, der Build ist autoritativ. Zur Anwendungsmatrix: Die Route `app/[lang]/anwendungsmatrix/` ist seit V2.8 (PR #17) die alleinige Matrix und hat die Produktmatrix V5 ersetzt; der "bewusst draußen"-Hinweis in älteren CLAUDE.md-Ständen war veraltet und ist seit 2026-06-11 korrigiert.

# Design-System: Ikonografie (#79)

Referenz für die Icon-Nutzung der KORODUR-Website. Ziel: konsistente Icons,
eine Konvention „welches Icon steht wofür", und ein klarer Ort, an dem neue
Icons eingetragen werden — statt verstreuter Ad-hoc-Importe.

Stand: 2026-07-01. Quelle: Code-Inventar über `components/`, `app/`, `data/`.

---

## 1. Grundprinzipien

- **Basis-Bibliothek: [lucide-react](https://lucide.dev).** Kein Eigenbau-SVG, außer
  lucide hat kein passendes Pendant (aktuell genau ein Fall, `IconRoad`).
- **Alle Icons laufen durch den Wrapper `AppIcon`** (`components/ui/icon.tsx`).
  Er setzt den KORODUR-Default `strokeWidth = 1.75` und normalisiert Größe/Farbe.
  Neue Icons nicht roh aus `lucide-react` in JSX rendern, sondern über `AppIcon`
  bzw. über eine der zentralen Maps (unten).
- **Farbe** kommt aus den CD-Tokens (`globals.css`), nicht hartkodiert
  (`text-navy`, `text-cyan-text`, …).
- **Strichstärke** bleibt einheitlich (1.75 Default; 2–2.5 nur für kleine
  UI-Glyphen wie Schließen-`X`).

## 2. Zentrale Mapping-Stellen (SoT je Kontext)

Es gibt bewusst **keine** einzelne globale Registry, sondern vier
kontextspezifische Maps. Wer ein Icon ändern/ergänzen will, editiert die
passende Stelle — nicht den Einzelimport in einer Seite.

| Kontext | Datei | Inhalt |
| :-- | :-- | :-- |
| **Bereiche** (Achse „Wofür") | `components/bereichIcons.ts` | `BEREICH_ICONS`: 1 festes Icon je Bereich + Fallback `bereichIcon()` |
| **Lösungsfinder** | `components/loesungsfinderV25/icons.tsx` | ~40 benannte `Icon*`-Exports (Beanspruchung, Branchen, Dringlichkeit, Navigation) |
| **Kennwert-Vorteile Rapid Set** | `components/RapidSetMarke.tsx` + `data/rapidSetContent.ts` | `RapidSetIcon`-Keys → lucide |
| **Kennwert-Vorteile Betonsanierung** | `components/BetonsanierungBereich.tsx` + `data/betonsanierungContent.ts` | `BetonIcon`-Keys → lucide |

Alles andere (TopNav, Footer, PDP, Kontakt, CTAs) importiert lucide-Icons
direkt — das ist für rein funktionale UI-Glyphen (Pfeile, Menü, Suche, Telefon)
in Ordnung und muss **nicht** in eine Map wandern.

## 3. Icon-Inventar nach Zweck

### 3.1 Bereiche (`BEREICH_ICONS`)

| Bereich | Icon (lucide) |
| :-- | :-- |
| Industrieboden | `Layers` |
| Sichtestrich | `Sparkles` |
| Microtop | `Droplets` |
| Rapid-Set | `Timer` |
| Betonsanierung | `Timer` |
| Spezialmörtel | `Package` |
| Infrastruktur | `Route` |
| Katzenstreu | `PawPrint` |
| 3D-Concrete-Printing | `Package` (bis eigenes Icon) |
| Default/Fallback | `Layers` |

### 3.2 Beanspruchung & technische Kennwerte — **Amboss-Konvention**

Dies ist die inhaltlich wichtigste Konvention. Für Beständigkeit, Härte,
Verschleiß und Druckfestigkeit steht der **Amboss (`Anvil`)**. Kommt gut an und
ist bereits im Neubau-Funnel als höchste Beanspruchungsstufe im Einsatz
(`components/loesungsfinderV25/NeubauFunnel.tsx`).

**Beanspruchungs-Skala (fallend), verbindlich:**

| Stufe | Icon | Bedeutung |
| :-- | :-- | :-- |
| Höchste | `Anvil` (Amboss) | Extreme Schlag-/Punktlast, höchster Verschleiß |
| Hoch | `Weight` | Schwerlast, Stapler, hohe Flächenlast |
| Mittel | `Package` | Normale gewerbliche Nutzung |
| Leicht | `Footprints` | Geh-/Leichtverkehr |

**Konvention „Amboss = Beständigkeit" (site-weit anzuwenden):**
Immer wenn es um **mechanische Beständigkeit** geht — Schleif-/Abriebverschleiß,
Druckfestigkeit, Härte, Schlagfestigkeit —, ist `Anvil` das Leit-Icon. Nicht für
chemische Beständigkeit (dort `ShieldCheck`/`Shield`) und nicht für Frost/Wetter
(dort separat, s. u.).

**Weitere Anforderungs-Icons (Lösungsfinder/Neubau-Funnel):**

| Anforderung | Icon |
| :-- | :-- |
| Chemische Beanspruchung | `FlaskConical` |
| Optik & Design | `Palette` |
| Hygiene & Reinigung | `SprayCan` |
| Ebenheit | `Ruler` |
| Sicherheit / Rutschhemmung | `ShieldCheck` |
| Nachhaltigkeit / CO₂ | `Leaf` |
| Ableitfähigkeit (ESD) | `Zap` |
| Schnelligkeit / Frühfestigkeit | `Timer` |
| Dauerhaftigkeit / Beständigkeit (allg.) | `Shield` |

### 3.3 Kennwert-Vorteile auf Bereichsseiten (Content-Keys)

Rapid Set und Betonsanierung mappen semantische Keys auf lucide. Für Konsistenz
sollten neue Bereichsseiten dieselben Keys/Icons verwenden:

`timer` → `Timer` (Frühfestigkeit) · `layers` → `Layers` (schwundneutral) ·
`shield` → `Shield` (dauerhaft beständig) · `leaf` → `Leaf` (CO₂-reduziert) ·
`recycle` → `Recycle` (Langlebigkeit) · `droplets` → `Droplets` (Konsistenz) ·
`flame` → `Flame` · `wrench` → `Wrench` · `spray` → `SprayCan` ·
`anchor` → `Anchor` (Verguss) · `grid` → `Grid3x3` (Pflasterfugen)

### 3.4 Branchen (Lösungsfinder)

`Factory` Industrie · `Warehouse`/`Forklift` Lager & Logistik ·
`ChefHat` Lebensmittel/Nass-Hygiene · `ShoppingCart`/`Store` Verkauf/Fachmärkte ·
`SquareParking` Parkdeck · `IconRoad` (Custom-SVG) Verkehr & Infrastruktur ·
`Building2` allgemein Gebäude.

### 3.5 Dringlichkeit (Lösungsfinder Step 4)

`Timer` sehr kurz · `Calendar` kurz · `CalendarDays` planbar.

### 3.6 Funktionale UI-Glyphen (Ad-hoc erlaubt)

Navigation/Interaktion, kein Mapping nötig:
`ArrowLeft`/`ArrowRight`/`ChevronRight`/`ChevronDown` (Navigation) ·
`Menu`/`X` (Mobile-Menü/Schließen) · `Search` (Suche) · `Check`/`CircleCheck`
(Auswahl/Häkchen) · `Phone`/`Mail`/`Printer` (Kontakt) · `MapPin` (Ort) ·
`FileText`/`Download` (Dokumente) · `ExternalLink` (externe Links) ·
`Info` (Hinweise) · `RotateCw` (Neustart).

## 4. Custom-SVG

- **`IconRoad`** (`components/loesungsfinderV25/icons.tsx`) — einziges
  handgezeichnetes Icon (Tabler-Stil), weil lucide kein „Straße"-Pendant hat.
- `public/icons/icon-192.svg` / `icon-512.svg` — **PWA-App-Icons**, gehören
  nicht zum UI-Icon-System.

## 5. Regeln für neue Icons

1. **Erst prüfen**, ob eine der vier Maps (§2) schon greift — dort eintragen.
2. Neues Bereich-Icon → `BEREICH_ICONS`. Neues Kennwert-Icon →
   die Content-Icon-Map der Bereichsseite (§3.3).
3. Kennwert **mechanische Beständigkeit** → immer `Anvil` (Amboss-Konvention §3.2).
4. Kein Roh-Import in JSX — über `AppIcon` rendern.
5. Kein neues Custom-SVG, wenn lucide ein passendes Icon hat.
6. Farbe/Strichstärke aus Tokens/Default, nicht hartkodieren.

## 6. Offene Punkte (V2)

- **Kennwert-Ikonografie auf der Produktdetailseite (PDP):** aktuell laufen alle
  technischen Kennwerte (Druckfestigkeit, Abrieb, Schichtdicke, Norm) über ein
  generisches `CircleCheck`. Eine zentrale `Kennwert → Icon`-Registry (mit
  `Anvil` für Druckfestigkeit/Verschleiß) würde die PDP deutlich scanbarer
  machen — bewusst außerhalb V1, hier als Konvention vorbereitet.
- **Doppelte Pflegestelle:** Rapid Set und Betonsanierung halten je eine eigene
  Kennwert-Icon-Map. Bei einer dritten Bereichsseite auf eine gemeinsame Map
  konsolidieren.
- **3D-Concrete-Printing** braucht ein eigenes Bereich-Icon (derzeit `Package`).

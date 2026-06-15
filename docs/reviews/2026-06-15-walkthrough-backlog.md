# Website-Walkthrough 2026-06-15 — Backlog-Sammlung (Steffi + Claude)

Status: **Issues angelegt** (#184–#191, 2026-06-15). Live-Walkthrough, Punkt für Punkt.

| Punkt | Issue |
|---|---|
| NEU-1 Produkte-Übersicht: Suche + Produktart-Subnav | **#184** |
| NEU-2 Mobile: Chips → ausklappbares Menü | **#185** |
| NEU-3 Bug: Inline-Fachberater-CTAs immer DE | **#186** |
| NEU-4 Mitarbeiterfotos austauschen | **#187** |
| NEU-5 Bereiche-Konsistenz + Infrastruktur überall raus | **#188** |
| NEU-6 Infrastruktur als eigener Bereich (Zukunft) | **#189** |
| NEU-7 Homepage CTA-Konzept (Mockup-first) | **#190** |
| NEU-8 CTA-Wording situativ variieren | **#191** |

NEU-5: Infrastruktur **überall** raus (inkl. Sanierung-Hub) — Steffi 2026-06-15.

---

## Fachartikel-Faktencheck (separater Strang, 2026-06-15)
- Workflow (580 Agents) → Report `docs/reviews/2026-06-15-fachartikel-faktencheck.md` (38 🔴 / 37 🟡 je Artikel; Headline 19/14 = nur hoch-schwer).
- Notion-Review-Tracker (21 Zeilen, Link + Status) unter dem Sanierungsprojekt: https://app.notion.com/p/4fd7f3654c7c45718e46cd6950335eba
- Quelldatei der Zeilen: `docs/reviews/2026-06-15-faktencheck-notion-rows.md`
- **Offen:** A/B/C-Entscheidung — unstrittige Nicht-Produkt-Patzer vor Handoff fixen (empfohlen) vs. alles über Frank. Produktwert-/Datenfehler (data/produkte.ts etc.) → Epic #76.

## Gesammelte Punkte

### NEU-1 — Produkte-Übersicht: On-Page-Suche + Produktart-Subnavigation
- **Seite:** `/produkte` (`app/[lang]/produkte/page.tsx`)
- **Ist:** Gruppierung nur nach Bereich (Anker-Chips), innerhalb Bereich flache Liste. Keine On-Page-Suche (nur Header-Suche, wird nicht wahrgenommen).
- **Soll:** (a) On-Page-Suche/Filter; (b) Produktart-Subnavigation, v. a. Industrieboden nach Produktart — analog Bereichsseite (`produktgruppe`-Gruppierung existiert dort schon).
- **Refs:** #93 (Produktart-Modell), #76 (Epic Produkte/Klassifizierung)

### NEU-2 — Mobile: Auswahl-Chips → ausklappbares Menü
- **Seiten:** `/produkte` + Bereichsseiten
- **Ist:** Chip-Reihen platzraubend auf Mobile (Desktop ok).
- **Soll:** Mobiles ausklappbares Menü (Dropdown/Accordion) statt Chip-Reihe.
- **Refs:** #79 (Epic Design-System), #82 (Mobile-Accordion Nav, Muster)

### NEU-3 — Bug: Inline-Fachberater-CTAs zeigen immer DE-Berater (international ignoriert)
- **Root Cause:** `data/fachberater.ts` → `fachberaterFuerBereich()` filtert hart auf `FACHBERATER_DE`, sprach-/kontextunabhängig. Speist Produktseiten, Bereichsseiten, Lösungsfinder-Ergebnisseite.
- **Zweites Problem:** `FACHBERATER_INTERNATIONAL` haben `bereiche: []` → Bereichs-Filter liefert international nichts → Fallback-Logik nötig (Export-Kontakt je Sprache/Land).
- **Soll:** Inline-CTA wählt Quelle nach Locale/Kontext; internationaler Fallback definiert.
- **Prio:** hoch (extern sichtbar, falsche Zuständigkeit). **Refs:** #75 (Epic Kontakt/Fachberater)

### NEU-4 — Mitarbeiterfotos austauschen (neu, benannt)
- **Quelle:** `/Users/sfleischmann/Documents/Claude/Projects/Bilder_mit_namen` (17 benannte JPGs)
- **Ist:** Repo hat 10 alte `.webp` (Alt-Site) unter `public/images/fachberater/`.
- **Soll:** Mapping Berater vs. Team; Berater-Porträts ersetzen (webp-Konvertierung, `bild`-Pfade), Benjamin Lorenz erstmals mit Foto; Nicht-Berater (Frank, Steffi, Donhauser, Wisniewski, Broehenhorst, Cesur, Forster) → Unternehmens-/Team-Seite.
- **Refs:** kein bestehendes Issue (≠ #105 Bereich-Bilder). Urgent (Steffi: „dringend austauschen").

### NEU-5 — Bereiche-Konsistenz: Nav + /bereiche an Home-Grid angleichen
- **Ist:** Home-Grid zieht aus `data/bereiche.ts` (kanonisch, 8 Bereiche). `/bereiche` (`TILE_SLUGS`) und Nav-Mega-Menü (`TopNav.tsx`) haben eigene hartcodierte Listen → es fehlen **schnellbetonsysteme + 3d-concrete-printing**, und **infrastruktur** ist als Platzhalter zu viel.
- **Soll:** Beide Stellen aus `data/bereiche.ts` ableiten (kein Hardcoding → keine künftige Divergenz). Infrastruktur entfernen.
- **Offene Scope-Frage:** Infrastruktur überall raus, oder nur aus Bereiche-Kontext (im Sanierung-Hub `sp_infrastruktur` als Schwerpunkt belassen)?
- **Quick-Win, batchbar.** **Refs:** #72 (Epic Nav & IA)

### NEU-6 — Backlog/Zukunft: Infrastruktur als eigener Bereich
- Infrastruktur künftig als vollwertiger Bereich aufbauen. Niedrige Prio, nach NEU-5 (dort wird der Platzhalter entfernt).
- **Refs:** #72

### NEU-7 — Homepage: CTA-Konzept überarbeiten (Mockup-first)
- **Seite:** `app/[lang]/page.tsx`
- **Ist-Reihenfolge:** Hero (Lösungsfinder + Produkte) → Bereiche → Referenzen → Lösungsfinder-Teaser (4-Schritte, #89) → Navy-CTA Kontakt.
- **Soll:**
  - **Hero-Doppel-CTA:** „Produkte entdecken" (links) + „Kontakt aufnehmen" (rechts). Lösungsfinder raus aus Hero (behebt Over-Promise: Lösungsfinder ist Industrieboden-only).
  - **Lösungsfinder-Störer** schlank, *vor* den Bereichen, mit Satz + Industrieboden-Scope. Vorschlag: „Sie sanieren einen Industrieboden? In vier Schritten zur passenden Lösung." → CTA „Lösung finden". (Bestehenden 4-Schritte-Teaser hochziehen.)
  - **Beratungs-CTA** NEU zwischen Bereiche und Referenzen. Vorschlag: „Nicht sicher, welches System passt? Sprechen Sie mit unseren Fachberatern." → CTA „Beraten lassen".
  - Produkt-Einstieg bleibt (jetzt Hero-Primary).
- **Mockup vor Umsetzung** (Layout-Redesign, stehende Regel).
- **Refs:** #74 (Epic Homepage), #89 (closed, Finder-CTA)

### NEU-8 — CTA-Wording situativ variieren (site-wide)
- Kontakt-CTAs nicht durchgängig identisch „Kontakt aufnehmen"; situativ/harmonisch variieren („Beraten lassen", „Persönliche Beratung" …). Gilt über die Home hinaus.
- **Refs:** #74

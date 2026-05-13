# Lösungsfinder 3-Step-Rewrite + Datenmodell-Konsolidierung — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Den bestehenden 4-Step-Lösungsfinder auf 3 Steps reduzieren (Sanierungsart → Einsatzbereich → Zeitfenster), die Spezial-Eigenschaften (Chemie, Frost, Rutsch, Fleck) aus dem User-Flow herausnehmen und stattdessen als abgeleitete Tags auf der Ergebnis-Seite anzeigen. Parallel: Datenmodell auf V2-Migrationsfähigkeit ausrichten (Notion = Source of Truth) und Produkt-/Referenz-Daten gemäß Experten-Feedback nachschärfen.

**Design-Quellen:**
- Konzept-Session 2026-05-13 (Mockups via AskUserQuestion-Previews — siehe Conversation-Log)
- [Notion Ziel-Seite Sanierungs-App](https://www.notion.so/336670e19e1a80f887dad468b1676e57)
- [Notion Klärungen für Lösungsfinder-Rewrite (Mai 2026)](https://www.notion.so/35f670e19e1a815e806cf49e759d0b2b) — offene Fragen vor Implementierung
- `Feedback Loesungsfinder.pdf` (Person A, Produktmatrix-Notiz)
- `Feedback 2_Lösungsfinder.pdf` (Person B, Lösungsfinder-Struktur + Produktliste)
- `Feedback_Referenzen Sanierungs App.pdf` (Person B, 23 Referenz-Korrekturen)

**Architecture:**
- Lösungsfinder-Logik: harter Filter auf 3 Dimensionen, keine Scoring-Gewichtung mehr. Wenn Einsatzbereich = `null` (Skip), wird die Bereich-Bedingung weggelassen.
- Property-Tags auf der Ergebnis-Seite werden **automatisch aus den verbauten Produkten abgeleitet** (Mapping in `data/eigenschaftenMapping.ts`). Keine manuelle Pflege auf Referenz-Ebene mehr.
- Datenmodell mirrort Notion-DB-Schema 1:1, sodass V2 (live aus Notion) ohne Refactoring übergehen kann.

**Tech Stack:** Next.js 16.2, React 19.2, TypeScript 5, Tailwind 4. Smoke-Tests via `npx tsx` (kein Test-Runner).

**Scope-Abgrenzung:**
- Dieser Plan baut die App + neue Datenstruktur.
- **Klärungen mit Experten laufen parallel** (siehe Notion-Seite). Bei offenen Punkten setzen wir dokumentierte Annahmen und korrigieren rollend.
- **Bilder-Migration für 25 Refs** läuft parallel zur Daten-Migration (Phase 2), wird hier als Sub-Task in Phase 2 koordiniert.
- **Person A Feedback (Produktmatrix-Refactor)** ist NICHT Teil dieses Plans — wird als eigener Workstream nach Lösungsfinder-Rewrite umgesetzt.

---

## Dokumentierte Annahmen (bei nicht-beantworteten Klärungen)

Diese Annahmen werden im Code als Kommentar markiert (`// ASSUMPTION: <ref>`). Bei Klarheit aus dem Klärungs-Loop wird korrigiert.

1. **CONCRETE MIX:** behalten bis Vertriebs-Entscheidung. Bei „raus": einfacher Eintrag-Löschung-Diff später.
2. **TRU Self-Leveling:** behalten (in Feedback 2 vollständig dokumentiert; Person A wollte nur aus Produktmatrix, das ist separater Workstream).
3. **Bereich-Mapping 8→4:** automatisches Mapping wie in Klärungen-Seite tabelliert. Pro Ref durch Experte abgenickt — bis dahin: auto-migrieren.
4. **Property-Tag-Mapping:** wie in Klärungen-Seite tabelliert. Rutschhemmung = Verschleißklasse A6+, Außenflächen = NEODUR HE 65 Plus + KOROMINERAL CURE.
5. **Sortierung Ergebnisse:** Aktualität (jüngste Ref zuerst), tie-break Anzahl Bilder.
6. **Refs mit beiden Sanierungsarten:** Single-Select (jede Ref hat genau einen Wert). Bei Grenzfällen wird der dominante Aspekt gewählt.

---

## File Structure (Änderungen)

| Pfad | Rolle | Änderung |
|---|---|---|
| `data/types.ts` | Typ-Definitionen | Neue Typen für 3-Step (`Sanierungsart`, `Einsatzbereich`, `Zeitfenster`, `Produktkategorie`, `Eigenschaft`); alte 4-Step-Typen als `@deprecated` |
| `data/produkte.ts` | Produkt-Stammdaten | +5 neue Produkte, -2 raus, alle umstrukturiert mit `produktkategorie`, `eigenschaften[]`, `verarbeitungszeit`, `belastbarkeit`-Objekt |
| `data/referenzen.ts` | Referenz-Stammdaten | Alle 51 Refs: `sanierungsart` (single), `einsatzbereich` (4-Wert-Single), `zeitfenster` (3-Wert); `zusatzfunktionen[]` entfernt (wird abgeleitet) |
| `data/eigenschaftenMapping.ts` | NEU | Mapping Produkt-Slug → abgeleitete Eigenschaften-Tags |
| `data/loesungsfinder.ts` | Step-Definitionen + Filter | Komplett-Rewrite: 3 Steps, harter Filter ohne Scoring, `leiteEigenschaftenAb()`-Funktion |
| `components/Loesungsfinder.tsx` | Wizard-UI | 3-Step-Wizard mit neuen Mockup-Layouts (Karten je Step), Ergebnis-Seite mit Top-Produkt-Block |
| `app/[lang]/loesungsfinder/page.tsx` | Route-Metadaten | „4 Schritten" → „3 Schritten" |
| `app/[lang]/dictionaries/*.json` (4×) | i18n-Labels | Neue Labels für Steps, 4 Bereiche, 3 Zeit-Stufen, Property-Tags |
| `scripts/test-loesungsfinder.ts` | Smoke-Test | Neue Test-Cases für 3-Step + Property-Ableitung |
| `scripts/migrate-refs-8to4.py` | NEU | Skript zur Notion-DB-Migration + App-Daten-Konsolidierung |
| `scripts/import-product-properties.py` | NEU | Skript zum Schreiben der Produkt-Eigenschaften nach Notion |
| `scripts/migrate-images-from-sharepoint.py` | NEU | Bilder-Migration (parallel) — SharePoint → Notion `TOP 3 Bilder` |

---

## Phase 1: Foundation (Notion-Schema + App-Typen)

### Task 1.1: Notion-DB „Produktdatenbank" Schema erweitern

**Beschreibung:** In Notion-UI (manuell, oder via MCP) folgende Felder ergänzen:

- [ ] Select `Produktkategorie` mit 4 Werten: Industrieestrich · Schnellreparaturmörtel · Grundierung · Nachbehandlung
- [ ] Multi-Select `Eigenschaften` mit Werten: Chemikalienbeständigkeit · Frost & Tausalz · Imprägnierung · Rutschhemmung · Austrocknungsschutz · Hohe Dichtigkeit · Außenflächen-tauglich · Fleckschutz
- [ ] Select `Verarbeitungszeit` mit 3 Werten: Kurzfristig · Mittelfristig · Planbar
- [ ] Text-Block `Belastbarkeit-Klassifikation` (oder mehrere Properties: CT-Klasse, C-Klasse, Verschleißklasse, Druckfestigkeit-nach-Xh, Nutzbar-nach-Xh)

**Verifikation:** Notion-DB-Schema via `notion-fetch` abrufen, neue Felder vorhanden.

### Task 1.2: Notion-DB „Referenzverzeichnis" Schema anpassen

- [ ] Bestehendes Select `Sanierungsart` auf 2 Werte normalisieren: Punktuelle Sanierung · Großflächige Sanierung
- [ ] Bestehendes Multi-Select `Einsatzbereich` auf 4 Werte konsolidieren (bestehende 8 löschen nach Migration)
- [ ] Select `Zeitfenster` ergänzen (oder bestehendes Feld umbenennen)
- [ ] **Optional entfernen:** altes Multi-Select `Zusatzfunktionen` — bleibt vorerst stehen, wird in Phase 3 referenziell nicht mehr genutzt

### Task 1.3: App-Typen in `data/types.ts`

- [ ] Neue Types definieren:

```ts
export type Sanierungsart = "punktuelle" | "grossflaechige";

export type Einsatzbereich =
  | "lager-logistik"
  | "industrie-produktion"
  | "lebensmittel-verkauf"
  | "infrastruktur-verkehr";

export type Zeitfenster = "kurzfristig" | "mittelfristig" | "planbar";

export type Produktkategorie =
  | "industrieestrich"
  | "schnellreparaturmoertel"
  | "grundierung"
  | "nachbehandlung";

export type Eigenschaft =
  | "chemikalienbestaendigkeit"
  | "frost-tausalz"
  | "impraegnierung"
  | "rutschhemmung"
  | "austrocknungsschutz"
  | "hohe-dichtigkeit"
  | "aussenflaechen-tauglich"
  | "fleckschutz";

export interface Belastbarkeit {
  ctKlasse?: string;        // z.B. "CT-C70-F9-A6"
  cKlasse?: string;         // z.B. "C55/67"
  verschleissklasse?: string; // z.B. "A6"
  druckfestigkeitNach?: string; // "20 MPa nach 8h"
  nutzbarNach?: string;     // "24 Stunden"
}

export interface Referenz {
  // ...bestehende Felder
  sanierungsart: Sanierungsart;
  einsatzbereich: Einsatzbereich;
  zeitfenster: Zeitfenster;
  eingesetzteProdukte: string[]; // Produkt-Slugs
  // entfernt: zusatzfunktionen[] — wird abgeleitet
}

export interface Produkt {
  // ...bestehende Felder
  produktkategorie: Produktkategorie;
  eigenschaften: Eigenschaft[];
  verarbeitungszeit: Zeitfenster;
  belastbarkeit: Belastbarkeit;
}
```

- [ ] Alte Types (`AnwendungsbereichKategorie`, `ZeitKategorie`, `Zusatzfunktion`) als `@deprecated` markieren; nach Phase 3 entfernen.

**Verifikation:** `npx tsc --noEmit` ohne Fehler.

### Task 1.4: Property-Tag-Mapping `data/eigenschaftenMapping.ts` (neu)

- [ ] Datei anlegen mit Mapping:

```ts
import type { Eigenschaft } from "./types";

export const PRODUKT_EIGENSCHAFTEN: Record<string, Eigenschaft[]> = {
  "koromineral-cure": ["chemikalienbestaendigkeit", "frost-tausalz", "impraegnierung"],
  "korotex": ["austrocknungsschutz"],
  "korodur-txpk": ["hohe-dichtigkeit"],
  "neodur-he-65-plus": ["aussenflaechen-tauglich", "frost-tausalz"],
  // ASSUMPTION: A6 → Rutschhemmung; wartet auf Klärung
};

export function leiteEigenschaftenAb(produktSlugs: string[]): Eigenschaft[] {
  const set = new Set<Eigenschaft>();
  for (const slug of produktSlugs) {
    PRODUKT_EIGENSCHAFTEN[slug]?.forEach(e => set.add(e));
  }
  return Array.from(set);
}
```

---

## Phase 2: Daten-Migration (51 Refs + Produkte) [parallel: Bilder-Migration]

### Task 2.1: Produkt-Migration (`data/produkte.ts`)

**Liste der Änderungen:**

- [ ] **Hinzufügen** (5 Produkte): NEODUR HE 40, DOT Europe CONCRETE MIX, KORODUR HB 5, KORODUR TXPK, KORODUR uniPrimer
  - Datenbasis: Feedback 2 + Notion-Produktdatenbank (TDS-Daten von Frank/Richard)
  - Bei fehlenden Werten: `// TODO: Datenblatt von Experte`-Marker setzen, App-Build trotzdem grün
- [ ] **Entfernen** (2 Produkte): KORODUR FSCem Screed (Ergänzungsprodukt), KOROCURE (kein Nachbehandlungsmittel)
- [ ] **Klärung pendent**: CONCRETE MIX — bleibt drin bis Vertriebs-Entscheidung
- [ ] **Bestehende Produkte** umstrukturieren: `produktkategorie`, `eigenschaften[]`, `verarbeitungszeit`, `belastbarkeit`-Objekt ergänzen

**Verifikation:** `npx tsx scripts/validate-referenzen.ts` (passt automatisch auch Produkt-Validierung an) — alle Produkt-Slugs konsistent.

### Task 2.2: Referenz-Migration (`data/referenzen.ts`)

- [ ] Für alle 51 Refs:
  - `sanierungsart` setzen (1 von 2 Werten)
  - `einsatzbereich` auf 4-Wert-Schema konsolidieren (auto-Mapping per Skript, dann manuelle Review)
  - `zeitfenster` setzen (3 Werte)
  - Alte `zusatzfunktionen[]`-Felder entfernen
  - `eingesetzteProdukte`-Liste prüfen (vor allem die durch Phase 2.1 entfernten/hinzugefügten Produkte einarbeiten)

- [ ] **Migration-Skript** `scripts/migrate-refs-8to4.py` schreibt:
  - Liest aktuelle 8-Bereich-Werte aus Notion-DB
  - Wendet Mapping an (siehe Klärungen-Seite Tabelle)
  - Schreibt 4-Bereich-Werte in neues `Einsatzbereich`-Multi-Select
  - Generiert App-Datei-Update als `git diff` zum Review

### Task 2.3: Bilder-Migration (parallel)

- [ ] **Manual-Step (Steffi/Anna):** SharePoint-Bilder für 25 Refs lokal sichten, jeweils 3 Top-Bilder auswählen
- [ ] `scripts/migrate-images-from-sharepoint.py` (neu):
  - Liest `docs/app-notion-match.md` für Slug↔Notion-ID-Mapping
  - Lädt für jeden der 25 Refs die ausgewählten Bilder hoch zur Notion-File-Property `TOP 3 Bilder`
  - Idempotent: skipped, wenn schon befüllt
- [ ] Nach Upload: bestehender `scripts/import-notion-referenzen.py`-Lauf zieht die Bilder ins App-`public/images/`-Verzeichnis nach

### Task 2.4: Feedback 3 — 23 Referenz-Korrekturen

Pro Referenz im Plan (siehe PDF für vollständige Liste):

- [ ] Querschnitt für ALLE Refs: Überschrift „NORMEN & ZULASSUNGEN" → „NORMEN & ZULASSUNGEN (orientiert an relevanten Standards)"
- [ ] Querschnitt NEODUR HE 60 rapid: Verschleißwiderstand A12 → A6 (≤ 5 cm³/50 cm²) — betrifft 5 Refs
- [ ] Querschnitt KORODUR HB 5 rapid: Zeile „Überarbeitbar nach frisch-in-frisch" entfernen + Norm DIN EN 1504-4 → DIN EN 13813 — betrifft viele Refs
- [ ] Bildprobleme: Titelbild-Swaps (Strandkorbhalle Sylt, DHL, Lyreco, Versmold), Bildrotationen (LKW-Waschstraße, Versmold)
- [ ] Spezielle Korrekturen (Obstplantage Hauptprodukt, Nike Store TXPK, Hubschrauber-Landeplatz FDE-Beton, etc.)

**Strategie:** Korrekturen als eigene Sub-Commits, ein Commit pro Referenz oder gebündelt nach Korrektur-Typ.

---

## Phase 3: Lösungsfinder 3-Step-Rewrite

### Task 3.1: `data/loesungsfinder.ts` Rewrite

- [ ] 3-Step-Definitionen (vorher 4) mit den finalen Werten aus Konzept-Session
- [ ] Filter-Logik:

```ts
export function findePassendeReferenzen(
  state: { sanierungsart: Sanierungsart; einsatzbereich: Einsatzbereich | null; zeitfenster: Zeitfenster },
  refs: Referenz[]
): Referenz[] {
  return refs
    .filter(r => r.sanierungsart === state.sanierungsart)
    .filter(r => state.einsatzbereich === null || r.einsatzbereich === state.einsatzbereich)
    .filter(r => r.zeitfenster === state.zeitfenster)
    .sort((a, b) => b.jahr - a.jahr); // Aktualität, tie-break später
}
```

- [ ] Top-Produkt-Ableitung: gemäß `produktkategorie === "industrieestrich"` oder `"schnellreparaturmoertel"` (je nach Sanierungsart) das häufigste in den Top-Refs verwendete Produkt als Empfehlung

### Task 3.2: `components/Loesungsfinder.tsx` Komponenten-Rewrite

- [ ] Schritt 1 (Sanierungsart): 2-Karten-Layout (siehe Mockup aus Konzept-Session)
- [ ] Schritt 2 (Einsatzbereich): 2x2-Grid mit 4 Kategorien + „Alle Bereiche anzeigen"-Skip-Link
- [ ] Schritt 3 (Zeitfenster): 3 horizontale Karten
- [ ] Ergebnis-Seite: Top-Produkt-Banner + Referenz-Grid mit abgeleiteten Tags + CTAs

### Task 3.3: i18n-Labels in `app/[lang]/dictionaries/*.json`

- [ ] DE: Alle Labels gemäß Konzept-Session
- [ ] EN/FR/PL: Übersetzungen gegen KORODUR-Glossar geprüft

### Task 3.4: Tests `scripts/test-loesungsfinder.ts`

- [ ] Test-Case: punktuelle + lager-logistik + kurzfristig → ≥ 1 Ref + Top-Produkt CEMENT ALL oder MORTAR MIX
- [ ] Test-Case: großflächige + industrie-produktion + kurzfristig → ≥ 1 Ref + Top-Produkt NEODUR HE 60 rapid
- [ ] Test-Case: einsatzbereich = null (Skip) → Filter ignoriert Bereich
- [ ] Test-Case: keine Treffer → leere Liste, CTA „Beratung anfragen" sichtbar
- [ ] Eigenschaften-Ableitung: Ref mit KOROMINERAL CURE → Tags `[chemie, frost, impraegnierung]`

---

## Phase 4: Cleanup + Deprecation

### Task 4.1: Alte Felder aus Code entfernen

- [ ] `zusatzfunktionen` aus Referenz-Interface entfernen
- [ ] Alte 4-Step-Logik (Scoring) aus `data/loesungsfinder.ts` entfernen
- [ ] Alte Step-4-UI aus `Loesungsfinder.tsx` entfernen
- [ ] `@deprecated`-Types aus `types.ts` entfernen

### Task 4.2: Notion-DB-Cleanup

- [ ] Altes Multi-Select `Zusatzfunktionen` aus Notion-DB entfernen
- [ ] Alte 8-Bereich-Optionen aus Notion-DB entfernen

### Task 4.3: README + Notion-Ziel-Seite aktualisieren

- [ ] README: „4-Schritt-Lösungsfinder" → „3-Schritt-Lösungsfinder"
- [ ] Notion-Ziel-Seite: Erfolgskriterien anpassen, V2.5-Eintrag im Entwicklungs-Log

---

## Acceptance Criteria

- [ ] `npx next build` grün, 380+ statische Seiten
- [ ] `npx tsx scripts/test-loesungsfinder.ts` 100% passed
- [ ] `npx tsx scripts/validate-referenzen.ts` 0 Fehler
- [ ] Manueller Click-Through: alle 3 Steps funktional, Ergebnis-Seite mit Tags + Top-Produkt rendert für 5 unterschiedliche Eingaben
- [ ] Mobile-Layout responsive (320px width okay)
- [ ] 4 Sprachen (DE/EN/FR/PL) komplett übersetzt
- [ ] 25 Refs haben Bilder (nicht mehr Platzhalter)
- [ ] 23 Feedback-3-Korrekturen umgesetzt und durch Frank verifiziert

---

## Open Questions (in [Klärungen-Notion-Seite](https://www.notion.so/35f670e19e1a815e806cf49e759d0b2b))

1. CONCRETE MIX behalten?
2. TRU Self-Leveling drin oder raus?
3. Bereich-Mapping Schwerindustrie/Flugzeug-Auflösung bestätigen
4. Rutschhemmung-Ableitung: kommt sie aus A6 oder anderswo?
5. Property-Tags: nur automatisch oder auch manuell überschreibbar?
6. Ergebnis-Sortierung: Aktualität, Bilder-Anzahl, oder Featured-Flag?
7. Refs mit beiden Sanierungsarten: Single- oder Multi-Select?

Bei Klärung dieser Punkte werden die `// ASSUMPTION:`-Marker im Code entfernt.

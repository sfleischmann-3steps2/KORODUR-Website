# Lösungsfinder 4-Step Adaptive — Implementation Plan (V2.5)

**Datum:** 2026-06-01
**Branch:** `feature/loesungsfinder-v2-5`
**Status:** Konzept abgestimmt, Code-Implementierung folgt
**Vorgänger:** `2026-05-13-loesungsfinder-3step-rewrite.md` (überholt durch fachliches Feedback und finale Konzept-Session 2026-06-01)

---

## Goal

Den V2.4-Lösungsfinder (4 Steps mit teils unscharfen Optionen) durch einen fachlich getragenen **4-Step-Funnel mit adaptiver Verzweigung** ersetzen. Bei punktueller Reparatur verkürzt sich der Funnel automatisch auf 3 Steps, weil Rapid-Set-Reparaturmörtel alle nach ~1h belastbar sind und das Zeitfenster damit irrelevant wird.

**Designtreiber:**

1. **Filter-Logik vor UX-Logik:** Fläche (klein vs. groß) entscheidet über die ganze Produktwelt – darum als Step 1, nicht Innen/Außen.
2. **Branche ersetzt Belastungsbild:** Der Einsatzbereich liefert die Belastungs-Tags implizit. Kein separater Belastungs-Step.
3. **Adaptive Funnel-Länge:** Bei Punktuell entfällt Step 4 (Zeit) – Progress-Anzeige passt sich stillschweigend an.
4. **Schadensbild als Tag-Filter, nicht als Wizard-Step:** Verschleiß / Ausbrüche / Risse / frühere Sanierung grenzen Referenzen ein, nicht Produkte – darum als Pill-Filter auf der Ergebnisseite.
5. **Sondernormen aus dem Funnel raus:** Trinkwasser / WHG / Denkmal / Barrierefreiheit landen in einem Beratungs-CTA-Banner unten auf der Ergebnisseite.

**Design-Quellen:**

- Konzept-Session 2026-06-01 (Mockup-Iterationen Step 1–4 + Ergebnisseite)
- Feedback-Synthese `docs/feedback/2026-05-22-feedback-synthese.md` (DM/HS/AP/RV)
- Steffis Hand-Skizze Funnel-Reihenfolge (Bild im Chat 2026-06-01)
- [Notion Klärungen Lösungsfinder-Rewrite](https://www.notion.so/35f670e19e1a815e806cf49e759d0b2b)
- [KORODUR Brand-Farben Memory](Navy `#002d59`, Cyan `#009ee3`)

**Tech-Stack:** Next.js 16, React 19.2, TypeScript 5, Tailwind 4, eigene i18n. Smoke-Tests via `npx tsx`.

---

## Funnel-Struktur (final)

```
Step 1 · Fläche             → Step 2 · Innen/Außen → Step 3 · Branche → Step 4 · Zeit → Ergebnis
  Punktuell <100 m²   ────────────────────────────────────────────────────skipped→ Ergebnis
  Mittel 100–1.000 m²
  Großflächig >1.000 m²
```

### Step 1 — Fläche

Headline: *"Wie groß ist die zu sanierende Fläche?"*
Subline: *"Die Größe entscheidet über die Produktwelt – kleine Reparaturen verlangen schnell­abbindende Mörtel, große Flächen einen Industrieestrich."*

| Wert | Label | Range | Beschreibung |
|---|---|---|---|
| `punktuell` | Punktuelle Reparatur | < 100 m² | Einzelne Schadstellen, Treppen, Wände, Fugenprofile |
| `mittel` | Mittlere Fläche | 100 – 1.000 m² | Zusammenhängende Hallenabschnitte, einzelne Räume, kleinere Verladezonen |
| `gross` | Großflächige Sanierung | > 1.000 m² | Komplette Hallen, große Außenflächen, Parkdecks, Produktionsanlagen |

**Filter-Effekt:**
- `punktuell` → Schnellreparaturmörtel (Rapid Set CEMENT ALL, MORTAR MIX, NEODUR Level)
- `mittel` / `gross` → Industrieestriche (NEODUR HE 65 / HE 65 Plus / HE 60 rapid / HE 40 / HE 40-8 / FSCem Screed) plus Großflächen-Mörtel (Rapid Set CONCRETE MIX, DOT Europe CONCRETE MIX)

**Adaptive Verzweigung:** Bei `punktuell` wird Step 4 (Zeit) übersprungen, intern auf `kurzfristig` defaulted. Progress-Dots gehen 4→3.

### Step 2 — Innen oder Außen

Headline: *"Wo soll saniert werden?"*
Subline: *"Bei Außenflächen sind Frost- und Tausalzbeständigkeit essenziell – das filtern wir direkt mit ein."*

| Wert | Label | Beschreibung |
|---|---|---|
| `innen` | Innenfläche | Hallen, Werkstätten, Produktion, Lager, Verkaufsräume |
| `aussen` | Außenfläche | Parkdecks, Verladezonen, Rampen, Außenlager – mit Frost und Tausalz |

**Filter-Effekt:** Aktiviert / deaktiviert Produkte mit `aussenFreigegeben` (z.B. NEODUR HE 65 Plus + KOROMINERAL Li+ für Außen-Frostbeständigkeit).

### Step 3 — Einsatzbereich (Branche)

Headline: *"In welcher Branche wird der Boden eingesetzt?"*
Subline (Innen): *"Aus der Branche leiten wir die typische Belastung ab – Staplerverkehr, Chemie, Hygiene oder Optik wirken sich direkt auf die Produktwahl aus."*
Subline (Außen): *"Außenflächen unterscheiden sich stark zwischen PKW-Verkehr, Schwerlast und reiner Witterungsfläche – die Branche entscheidet über das Anforderungsprofil."*

**Innen-Cluster:**

| Wert | Label | Belastungs-Stichworte | Abgeleitete Tags |
|---|---|---|---|
| `innen-lager-logistik` | Lager & Logistik | Staplerverkehr, Schwerlast, Schüttgut, Hochregallager | `schwerlast`, `verschleiss`, `staplerverkehr` |
| `innen-industrie-produktion` | Industrie & Produktion | Maschinenbelastung, Chemie, Hitze, Schüttgüter | `chemie`, `thermik`, `schwerlast`, `verschleiss` |
| `innen-lebensmittel-pharma` | Lebensmittel & Pharma | Hygiene, Reinigungsfrequenz, Fleckschutz, Säuren | `chemie`, `hygiene`, `fleckschutz` |
| `innen-verkauf-showroom` | Verkauf & Showroom | Optik, Repräsentation, Publikumsverkehr, Design | `optik`, `fleckschutz`, `publikumsverkehr` |

**Außen-Cluster:**

| Wert | Label | Belastungs-Stichworte | Abgeleitete Tags |
|---|---|---|---|
| `aussen-parkdeck-tiefgarage` | Parkdeck & Tiefgarage | PKW-Verkehr, Tausalz, Reifenabrieb, Öltropfen | `frost-tausalz`, `chemie`, `verschleiss` |
| `aussen-verladezone-rampe` | Verladezone & Rampe | Stapleraußenfahrt, LKW-Verkehr, Witterung | `frost-tausalz`, `schwerlast`, `staplerverkehr` |
| `aussen-werkhof-aussenlager` | Werkhof & Außenlager | Wechselbelastung, Frost, Maschineneinsatz | `frost-tausalz`, `verschleiss` |
| `aussen-infrastruktur-verkehr` | Infrastruktur & Verkehr | Brücken, Straßen, Tankstellen, Sondereinsatz | `frost-tausalz`, `chemie`, `schwerlast` |

**Filter-Effekt:** Auswahl genau einer Branche. Die mit der Branche verknüpften Belastungs-Tags werden gegen die `belastungenAbgedeckt[]` der Produkte gematcht (Schnittmenge ≥ 1).

### Step 4 — Zeitfenster (nur Mittel/Groß)

Headline: *"Wann muss die Fläche wieder nutzbar sein?"*
Subline: *"Bei sehr kurzen Zeitfenstern empfehlen wir Rapid-Set-Produkte – das verändert die Empfehlung deutlich."*

| Wert | Label | Range | Beschreibung |
|---|---|---|---|
| `sehr-kurz` | Sehr kurzfristig | Über Nacht, Wochenende | Sanierung im laufenden Betrieb, Wiederbelastung in 24 h |
| `kurz` | Schnelle Sanierung | 1 – 2 Wochen | Geplante Produktionspause, kurzer Stillstand mit klarem Fenster |
| `planbar` | Planbar | Keine Zeitbegrenzung | Voller Industrieestrich-Aufbau mit Standard-Aushärtung möglich |

**Filter-Effekt:** Vergleicht gegen `wiederbelastungInH` des Produkts.

### Ergebnisseite

- **Auswahl-Chips oben** (alle 4 Eingaben sichtbar) + „Auswahl ändern"-Link → Wizard reopened
- **Top-Empfehlung-Block:** Ein Produkt prominent mit Icon, Beschreibung, CTAs (Produktdetails / Datenblatt PDF). Algorithmus: Produkt mit höchster Match-Score zwischen Filter-State und Produkt-Eigenschaften.
- **Referenz-Grid** (3-spaltig): passende Referenzen mit Bild, Name, m²-Angabe + verwendetes Hauptprodukt. „Alle anzeigen"-Link zur Listenseite.
- **Schaden-Tag-Chips** (Pill-Filter): Verschleißschäden / Ausbrüche / Risse / Frühere Sanierung – grenzt nur das Referenz-Grid weiter ein, nicht die Top-Empfehlung.
- **Beratungs-Banner unten:** „Sondernormen oder Sonderfall? – wir beraten persönlich" mit Cyan-CTA → Kontaktformular. Fängt Sondernormen-Fälle ab, die bewusst aus dem Wizard rausgenommen wurden.

---

## Datenmodell-Implikationen

### `data/types.ts` — neue Typen

```ts
export type Flaechenkategorie = "punktuell" | "mittel" | "gross";

export type InnenAussen = "innen" | "aussen";

export type Einsatzbereich =
  // Innen
  | "innen-lager-logistik"
  | "innen-industrie-produktion"
  | "innen-lebensmittel-pharma"
  | "innen-verkauf-showroom"
  // Außen
  | "aussen-parkdeck-tiefgarage"
  | "aussen-verladezone-rampe"
  | "aussen-werkhof-aussenlager"
  | "aussen-infrastruktur-verkehr";

export type Zeitfenster = "sehr-kurz" | "kurz" | "planbar";

export type BelastungsTag =
  | "schwerlast"
  | "verschleiss"
  | "staplerverkehr"
  | "chemie"
  | "thermik"
  | "hygiene"
  | "fleckschutz"
  | "optik"
  | "publikumsverkehr"
  | "frost-tausalz";

export type Schadenstyp =
  | "verschleissschaeden"
  | "ausbrueche"
  | "risse"
  | "frueher-sanierung";

export interface LoesungsfinderState {
  flaeche: Flaechenkategorie | null;
  innenAussen: InnenAussen | null;
  einsatzbereich: Einsatzbereich | null;
  zeitfenster: Zeitfenster | null; // bleibt null bei flaeche === "punktuell"
}

export interface Produkt {
  // ...bestehende Felder
  flaechenkategorienGeeignet: Flaechenkategorie[]; // ["punktuell"] oder ["mittel", "gross"]
  innenGeeignet: boolean;
  aussenGeeignet: boolean;
  belastungenAbgedeckt: BelastungsTag[];
  wiederbelastungInH: number;        // 1 (Rapid Set), 24 (HE 60 rapid), 168 (HE 65) …
  systemBegleitprodukte: string[];   // Produkt-Slugs (Haftbrücke, Grundierung, Nachbehandlung)
  sonderbedingungen?: string[];      // Tags wie "heizestrich-geeignet"
}

export interface Referenz {
  // ...bestehende Felder
  flaecheKategorie: Flaechenkategorie;
  flaecheM2?: number;                // optional, präzise m²-Angabe
  innenAussen: InnenAussen;
  einsatzbereich: Einsatzbereich;
  zeitfenster: Zeitfenster;
  schadenstypen: Schadenstyp[];
  eingesetzteProdukte: string[];
}
```

### Branche → Belastungs-Tag-Mapping

In `data/einsatzbereichMapping.ts` (neu) hinterlegen — wird in Step 3 zur Auflösung der impliziten Belastungstags genutzt:

```ts
export const EINSATZBEREICH_TAGS: Record<Einsatzbereich, BelastungsTag[]> = {
  "innen-lager-logistik": ["schwerlast", "verschleiss", "staplerverkehr"],
  "innen-industrie-produktion": ["chemie", "thermik", "schwerlast", "verschleiss"],
  "innen-lebensmittel-pharma": ["chemie", "hygiene", "fleckschutz"],
  "innen-verkauf-showroom": ["optik", "fleckschutz", "publikumsverkehr"],
  "aussen-parkdeck-tiefgarage": ["frost-tausalz", "chemie", "verschleiss"],
  "aussen-verladezone-rampe": ["frost-tausalz", "schwerlast", "staplerverkehr"],
  "aussen-werkhof-aussenlager": ["frost-tausalz", "verschleiss"],
  "aussen-infrastruktur-verkehr": ["frost-tausalz", "chemie", "schwerlast"],
};
```

### Produkt-Liste — Änderungen

**Hinzufügen:**
- `dot-europe-concrete-mix` (faserverstärkter Schnellbeton 50–600 mm)
- `rapid-set-concrete-mix` (50–600 mm)

**Entfernen aus Hauptauswahl:**
- `pflasterfugenmoertel` (falsche Produktkategorie)
- `korocure` (Nachbehandlung, nicht Sanierungs-Hauptprodukt)
- `korotex` (Oberflächenfinish, nicht Sanierungs-Hauptprodukt)

**Als Begleitprodukte nur in `systemBegleitprodukte`-Listen referenzieren:**
- `koromineral-cure`, `koromineral-li-plus`, `korotex`, `korocure`, `korodur-hb-5`, `korodur-uniprimer`, `korodur-txpk`

### Match-Algorithmus (Ergebnisseite)

```ts
function ermittleTopEmpfehlung(
  state: LoesungsfinderState,
  produkte: Produkt[],
): Produkt | null {
  const branchenTags = state.einsatzbereich ? EINSATZBEREICH_TAGS[state.einsatzbereich] : [];
  const maxWiederbelastung =
    state.zeitfenster === "sehr-kurz" ? 24
    : state.zeitfenster === "kurz" ? 168
    : Infinity;

  const kandidaten = produkte
    .filter(p => state.flaeche && p.flaechenkategorienGeeignet.includes(state.flaeche))
    .filter(p => state.innenAussen === "innen" ? p.innenGeeignet : p.aussenGeeignet)
    .filter(p => branchenTags.length === 0 || p.belastungenAbgedeckt.some(t => branchenTags.includes(t)))
    .filter(p => p.wiederbelastungInH <= maxWiederbelastung);

  // Sortieren nach Schnittmengen-Größe mit Branchen-Tags (höchster Match zuerst)
  kandidaten.sort((a, b) => {
    const aMatch = a.belastungenAbgedeckt.filter(t => branchenTags.includes(t)).length;
    const bMatch = b.belastungenAbgedeckt.filter(t => branchenTags.includes(t)).length;
    return bMatch - aMatch;
  });

  return kandidaten[0] ?? null;
}
```

---

## UI-Komponenten

### File-Struktur-Änderungen

| Pfad | Rolle | Änderung |
|---|---|---|
| `data/types.ts` | Typ-Definitionen | Neue Typen (s.o.); alte Typen als `@deprecated` |
| `data/einsatzbereichMapping.ts` | NEU | Branche → Belastungs-Tag |
| `data/produkte.ts` | Produkt-Stammdaten | +2 Adds, 3 Removes aus Hauptliste, alle Produkte umstrukturiert |
| `data/referenzen.ts` | Referenz-Stammdaten | Alle Refs auf neues Schema (flaecheKategorie, innenAussen, einsatzbereich, zeitfenster, schadenstypen) |
| `data/loesungsfinder.ts` | Filter-Logik | Match-Algorithmus + Helper-Funktionen |
| `components/Loesungsfinder.tsx` | Wizard-UI | 4-Step-Wizard mit adaptiver Progress-Logik (Punktuell → 3 Dots) |
| `components/Loesungsfinder/Step1Flaeche.tsx` | NEU | 3 Karten Punktuell/Mittel/Groß |
| `components/Loesungsfinder/Step2InnenAussen.tsx` | NEU | 2 Karten |
| `components/Loesungsfinder/Step3Einsatzbereich.tsx` | NEU | 4 Karten je nach Innen/Außen |
| `components/Loesungsfinder/Step4Zeitfenster.tsx` | NEU | 3 Karten, conditional render |
| `components/Loesungsfinder/Ergebnisseite.tsx` | NEU | Top-Empfehlung + Referenz-Grid + Schaden-Chips + Beratungs-Banner |
| `app/[lang]/dictionaries/*.json` (4×) | i18n | Alle neuen Labels in DE/EN/FR/PL |
| `scripts/test-loesungsfinder.ts` | Smoke-Test | Neue Test-Cases für 4-Step + Punktuell-Skip + Match-Algorithmus |

### Brand-Tokens

- Primary: `#002d59` (Navy)
- Accent: `#009ee3` (Cyan)
- Selected-Border: `2px solid #002d59`
- Check-Badge: `#009ee3`-Background, weißer Haken
- Primary-Button: Navy-Background, weiß
- Secondary-Banner-CTA: Cyan-Background, weiß

---

## Phasen / Tasks

### Phase 1: Datenmodell

- [ ] `data/types.ts` mit neuen Typen erweitern, alte `@deprecated` markieren
- [ ] `data/einsatzbereichMapping.ts` anlegen
- [ ] `data/produkte.ts` umstrukturieren: 17 → 16 Hauptprodukte (3 raus, 2 rein), alle mit neuen Feldern
- [ ] `data/referenzen.ts` migrieren: alle 51 Refs auf neues Schema, Hilfsskript `scripts/migrate-refs-v25.ts`
- [ ] Validierungsskript `scripts/validate-referenzen.ts` an neues Schema anpassen
- [ ] Smoke-Test: `npx tsc --noEmit` ohne Fehler

### Phase 2: Wizard-UI

- [ ] `Loesungsfinder.tsx` zentrale State-Komponente mit adaptiver Step-Logik
- [ ] Vier Step-Komponenten mit Mockup-Layouts
- [ ] Progress-Indicator mit `useMemo`-basierter Step-Anzahl-Berechnung
- [ ] Navigation: Weiter/Zurück/Abbrechen mit State-Persistierung in URL (`?step=...&flaeche=...`)
- [ ] Mobile-Layouts (380 px stack, Cards icon-left)
- [ ] i18n-Labels DE/EN/FR/PL in `dictionaries/*.json`

### Phase 3: Ergebnisseite

- [ ] Match-Algorithmus in `data/loesungsfinder.ts`
- [ ] `Ergebnisseite.tsx` mit Auswahl-Chips, Top-Empfehlung-Block, Referenz-Grid, Schaden-Pills, Beratungs-Banner
- [ ] Schaden-Pill-Filter clientseitig (kein neuer Wizard-Step)
- [ ] „Auswahl ändern"-Link springt zurück zum Wizard mit prefilled State

### Phase 4: Smoke-Tests + Beispiel-Cases

- [ ] `scripts/test-loesungsfinder.ts` mit Test-Cases:
  - Punktuell + Innen + Lager/Logistik → Reparaturmörtel (CEMENT ALL/MORTAR MIX)
  - Mittel + Außen + Verladezone + Sehr-kurz → NEODUR HE 60 rapid
  - Groß + Innen + Industrie/Produktion + Planbar → NEODUR HE 65 / HE 65 Plus
  - Punktuell: Funnel hat 3 Steps, Zeitfenster ist intern auf `kurzfristig`
- [ ] Drei Beispiel-Kunden-Cases manuell durchklicken: Lagerhalle mit Staplern, Außen-Parkdeck, kleine Schwellen-Reparatur

### Phase 5: Cleanup

- [ ] Alte 4-Step-Logik (Scoring) aus `data/loesungsfinder.ts` entfernen
- [ ] `@deprecated`-Typen aus `types.ts` entfernen
- [ ] README aktualisieren: „4-Schritt adaptiv"
- [ ] Notion-Ziel-Seite aktualisieren

---

## Acceptance Criteria

- [ ] `npx next build` grün, alle statischen Seiten gerendert
- [ ] `npx tsx scripts/test-loesungsfinder.ts` 100 % passed
- [ ] `npx tsx scripts/validate-referenzen.ts` 0 Fehler
- [ ] Manueller Click-Through: alle 4 Steps + Punktuell-Skip + Ergebnisseite + Schaden-Pill-Filter funktional
- [ ] Mobile-Layout responsive (320 px width okay)
- [ ] 4 Sprachen (DE/EN/FR/PL) komplett übersetzt, gegen KORODUR-Glossar geprüft
- [ ] Brand-Farben Navy `#002d59` + Cyan `#009ee3` konsequent angewendet
- [ ] Drei Beispiel-Cases liefern sinnvolle Treffer

---

## Out of Scope für V2.5

- DM-Profilfrage „Wer ist Suchender?" (Architekt/Bauherr/Verleger) – auf V3 verschoben
- Sub-Step „Lage" (Boden/Wand/über Kopf) bei punktueller Reparatur – als Produkt-Tag auf Detailseite, kein Wizard-Step
- Asphalt Repair Mix – eigene Welt, V3
- Produkt-Varianten (HE 65 SVS 1,5 / SVS 3 / metallisch) – auf Produktdetailseite als Varianten-Sektion
- Sondernormen-Wizard-Pfad – ersetzt durch Beratungs-Banner auf Ergebnisseite
- Sichtestriche (GRANIDUR, KCF, TRUAZZO, MICROTOP) – separater Workstream V3

---

## Verknüpfungen

- Branch: `feature/loesungsfinder-v2-5`
- Feedback-Synthese: `docs/feedback/2026-05-22-feedback-synthese.md`
- Original-PDFs: `Feedback 2_Lösungsfinder.pdf`, `Feedback_Referenzen Sanierungs App.pdf`
- Notion Ziel-Seite: [Sanieren mit KORODUR ist als überzeugende Sales-App live](https://www.notion.so/336670e19e1a80f887dad468b1676e57)
- Notion Klärungen: [Klärungen für Lösungsfinder-Rewrite](https://www.notion.so/35f670e19e1a815e806cf49e759d0b2b)
- Vorgänger-Plan: `docs/superpowers/plans/2026-05-13-loesungsfinder-3step-rewrite.md` (überholt)

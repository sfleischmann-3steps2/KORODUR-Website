# Plan: Produktmatrix V5 — Umsetzung in der Sanierungs-Web-App

**Datum:** 2026-06-01
**Autor:** Steffi + Claude (Cowork-Session)
**Mockup-Vorlage:** `mockups_zur Abstimmung im Team_Mai_15/Matrix/produktmatrix-v5-mockup.html`
**Quellen für Werte:** TDS-Datenblätter (korodur.de, Stand 04/2026 – 11/2021), Verarbeitungs-Excel "Matrix Verarbeitung Sanierungsapp", Feedback-PDF von Richard Vadder

---

## Ziel

Die bestehende `/produktmatrix`-Seite auf den abgestimmten V5-Stand umbauen:

- **2 Kategorien** statt 5: *Industrieestriche* + *Schnellreparaturmörtel*
- **13 Produkte** statt 16
- **4 Spalten** statt 11: Außen · Belastbarkeit · Schichtdicke · Belastbar nach
- Belastbarkeits-Skala in 5 Stufen statt binärer Eignung
- Header "Produktportfolio Sanierung" (Hero ohne Subtitle)
- CTA-Box mit zwei Buttons (Lösungsfinder + Kontakt korodur.de)

---

## Scope

### Was rein muss

| # | Produkt | Aktion |
|---|---|---|
| 1 | NEODUR HE 60 rapid | bleibt, Schichtdicke 10–60 mm bestätigen |
| 2 | NEODUR HE 65 | bleibt, Schichtdicke 12–15 mm + Q-Klasse ergänzen |
| 3 | NEODUR HE 65 Plus | bleibt, Q-Klasse + WHG-Hinweis ergänzen |
| 4 | NEODUR HE 40 | **NEU anlegen** |
| 5 | NEODUR Level | bleibt, Schichtdicke auf 5–10 mm korrigieren |
| 6 | TRU Self-Leveling | bleibt, Werte aus TDS ergänzen, Badge "Sichtestrich" |
| 7 | Rapid Set CEMENT ALL | bleibt, TDS-Werte ergänzen |
| 8 | Rapid Set MORTAR MIX | bleibt, TDS-Werte ergänzen |
| 9 | Rapid Set MORTAR MIX DUR | bleibt, DIN-1100-A-Hinweis ergänzen |
| 10 | ASPHALT REPAIR MIX | bleibt, TDS-Werte ergänzen |
| 11 | DOT Europe CONCRETE MIX | **NEU anlegen** (ersetzt CONCRETE MIX laut RV) |
| 12 | KOROCRETE Schnellbeton | von Phantom-Daten auf TDS-Realität korrigieren (FSCem-Basis, 6 h, C35/45–C50/60) |
| 13 | Rapid Set Schnellbeton | **NEU anlegen** (= System Rapid Set Concrete, TL BEB-StB, 2 h) |

### Was komplett raus muss (auch aus Lösungsfinder und Produktdetailseiten)

- **Rapid Set CONCRETE MIX** (`rapid-set-concrete-mix`) — wird durch DOT Europe ersetzt
- **KORODUR FSCem Screed** (`korodur-fscem-screed`) — laut RV: Ergänzungsprodukt, nicht für Sanierungs-Hauptportfolio

**Risiko-Check:** Beide werden aktuell von **0 Referenzen** in `data/referenzen.ts` verlinkt. Löschung gefahrlos.

### Was bleibt in `produkte.ts`, aber nicht in der Matrix

- `korodur-hb-5-rapid` (Haftbrücke — Hilfsstoff)
- `korodur-pc` (Polymer Coating — Hilfsstoff)
- `korocure` / `koromineral-cure` / `korotex` (Nachbehandlung)

Diese erscheinen weiter im Lösungsfinder + Produktdetailseite, aber nicht in der Matrix. Steuerung über neues Feld `inSanierungsMatrix: false`.

---

## Datenmodell-Änderungen

### `data/types.ts` — neue Felder am `Produkt`-Interface

```typescript
export interface Produkt {
  // ... bestehende Felder ...

  /** Belastbarkeits-Stufe für die Matrix-Anzeige. 5 = höchste Last (Hartstoff DIN 1100 A / TL BEB-StB), 1 = leichte Last. */
  belastbarkeitsStufe?: 1 | 2 | 3 | 4 | 5;

  /** Voll-belastbar-Zeit als String (z. B. "24 h", "1 h", "30 min", "3 d"). Für die Matrix-Spalte. */
  belastbarNach?: string;

  /** Wenn true, erscheint das Produkt in der Sanierungs-Matrix-Ansicht. Default false. */
  inSanierungsMatrix?: boolean;
}
```

### `data/produkte.ts` — Werte aus TDS (Belastbarkeits-Stufen)

| Produkt | Stufe | Begründung |
|---|---|---|
| NEODUR HE 60 rapid | 5 | DIN 1100 A, Hartstoff |
| NEODUR HE 65 | 5 | DIN 1100 A, Hartstoff |
| NEODUR HE 65 Plus | 5 | DIN 1100 A, Hartstoff, WHG |
| NEODUR HE 40 | 5 | DIN 1100 A, Hartstoff |
| NEODUR Level | 4 | BCA-Verschleiß, Hartstoff-Niveau, keine DIN 1100 |
| TRU Self-Leveling | 4 | C40-F10, hochwertig aber Sichtestrich-Klasse |
| Rapid Set CEMENT ALL | 3 | Reparaturmörtel C55/67 |
| Rapid Set MORTAR MIX | 3 | Reparaturmörtel C45/55 |
| Rapid Set MORTAR MIX DUR | 5 | DIN 1100 A Verschleißträger |
| ASPHALT REPAIR MIX | 3 | ~22 N/mm², Asphalt-Reparatur |
| DOT Europe CONCRETE MIX | 5 | DIN EN 1504-3, Brücken/Start-Landebahnen |
| KOROCRETE Schnellbeton | 4 | FSCem-Basis, C35/45–C50/60 |
| Rapid Set Schnellbeton | 5 | TL BEB-StB (höchste Verkehrsklasse) |

---

## TDS-Diskrepanzen, die in `produkte.ts` korrigiert werden

| Produkt | Feld | Bisher | TDS-Wahrheit |
|---|---|---|---|
| NEODUR HE 60 rapid | Schichtdicke | "10–60 mm" | 10–60 mm (Excel bestätigt) — keine Änderung nötig |
| NEODUR HE 65 | Schichtdicke | fehlt | 12–15 mm (RV-Vorgabe) |
| NEODUR HE 65 | Qualitätsklasse | fehlt | CT-C70-F9-A6 |
| NEODUR Level | Schichtdicke | "4–10 mm" | 5–10 mm (RV-Vorgabe) |
| NEODUR Level | Qualitätsklasse | "CT-C40-F8-AR0,5" (TDS) | CT-C40-F10 (RV-Vorgabe, neuere Klasse) |
| KORODUR FSCem Screed | komplett | dünn | **wird gelöscht** |
| Rapid Set CEMENT ALL | Qualitätsklasse | fehlt | C55/67 |
| Rapid Set MORTAR MIX | Qualitätsklasse | fehlt | C45/55 |
| Rapid Set MORTAR MIX DUR | Qualitätsklasse | fehlt | C45/55 + DIN 1100 A |
| Rapid Set CONCRETE MIX | komplett | dünn | **wird gelöscht (ersetzt durch DOT Europe)** |
| ASPHALT REPAIR MIX | Druckfestigkeit | fehlt | ca. 22 N/mm², 30 min Verkehrsfreigabe |
| KOROCRETE Schnellbeton | komplett | Phantom-Werte | FSCem-Basis, C35/45–C50/60, 6 h |

---

## Frontend-Änderungen

### `components/Produktmatrix.tsx`

**Neue Struktur:**
- Konstante `SPALTEN` von 11 auf 4 reduzieren
- Konstante `KATEGORIEN` auf `["estrich", "schnellzement"]` reduzieren, Labels umbenennen ("Industrieestriche", "Schnellreparaturmörtel")
- Filter: `produkte.filter(p => p.inSanierungsMatrix === true)`
- Renderer für Belastbarkeits-Skala (5 Dots, gefüllt/leer je nach Stufe)
- Renderer für Außen-Dot (single, navy/cyan)
- Werte-Spalten für Schichtdicke + Belastbar nach (Text)
- Subtitel mit Qualitätsklasse als grauer Inline-Tag
- Badges (Rapid / System / WHG / Sichtestrich) — abgeleitet aus Feldern wie `zeitKategorie === "schnell"`, neuem Flag `systemProdukt`, `whgZulassung`, Kategorie

### `app/[lang]/produktmatrix/page.tsx`

- Titel "Produktmatrix" → "Produktportfolio Sanierung" (i18n-String)
- Subtitle-Paragraph entfernen
- CTA-Box: zwei Buttons (Lösungsfinder + Kontakt) statt eines
- Kontakt-Link: `https://www.korodur.de/kontakt.html` (extern, `target="_blank"`)

### Mobile / Responsive

V5-Mockup ist Desktop-zentriert. Für mobile bleibt der horizontale Scroll (wie heute). Touch-Optimierung: keine sticky-left auf mobile (verhindert Scroll-Probleme).

---

## i18n

### Neue UI-Strings (alle 4 Sprachen)

| Key | DE | EN | FR | PL |
|---|---|---|---|---|
| `produktmatrix.title` | Produktportfolio Sanierung | Renovation Product Portfolio | Portefeuille Produits Rénovation | Portfolio Produktów Renowacji |
| `produktmatrix.spalte.aussen` | Außen | Outdoor | Extérieur | Na zewnątrz |
| `produktmatrix.spalte.belastbarkeit` | Belastbarkeit | Load capacity | Charge admissible | Obciążalność |
| `produktmatrix.spalte.schichtdicke` | Schichtdicke | Layer thickness | Épaisseur | Grubość warstwy |
| `produktmatrix.spalte.belastbar_nach` | Belastbar nach | Ready for use after | Praticable après | Gotowe do użytku po |
| `produktmatrix.cta.kontakt` | Kontakt zu unseren Beratern | Contact our advisors | Contacter nos conseillers | Kontakt z naszymi doradcami |

### Produkt-Übersetzungen

- HE 40 + DOT Europe + Rapid Set Schnellbeton neu übersetzen (en/fr/pl)
- KOROCRETE-Beschreibung überschreiben
- CONCRETE MIX + FSCem Screed Einträge löschen aus `data/i18n/produkte.{en,fr,pl}.ts`

---

## Validierung & QA

### Validierungs-Skript erweitern (`scripts/validate-referenzen.ts`)

Neue Prüfungen für Matrix-Produkte:
- Wenn `inSanierungsMatrix === true`, müssen folgende Felder gesetzt sein:
  - `belastbarkeitsStufe` (1–5)
  - `belastbarNach` (String)
  - `schichtdicke` (String)
  - `qualitaetsklasse` (String)
- Beim Build sicher gehen, dass mind. 1 Produkt je Kategorie in der Matrix ist

### Build-Test

```bash
npm install
npm run build
npx tsx scripts/validate-referenzen.ts
npx tsx scripts/test-loesungsfinder.ts
```

### Smoke-Test (manuell)

- Matrix-Seite in allen 4 Sprachen aufrufen
- Mobile-View prüfen
- Lösungsfinder durchklicken — sollte ohne CONCRETE MIX / FSCem laufen
- Produktdetailseite für HE 40, DOT Europe, KOROCRETE, Rapid Set Schnellbeton anlegen/prüfen

---

## Umsetzungs-Reihenfolge (sequenziell)

1. **Paket 1 — Datenmodell**
   - `data/types.ts` erweitern
   - `data/produkte.ts` patchen (3 Neue, 1 Refresh, 2 Löschungen, Schichtdicken-Korrekturen, Belastbarkeits-Stufen, `inSanierungsMatrix`-Flags)
   - `data/i18n/produkte.{en,fr,pl}.ts` synchronisieren
   - Validate-Skript laufen lassen

2. **Paket 2 — Frontend**
   - `components/Produktmatrix.tsx` komplett neu (4 Spalten, 2 Kategorien, Skala-Renderer, Badges)
   - `app/[lang]/produktmatrix/page.tsx` (Header, CTA)
   - Local `npm run dev` und visuell mit V5-Mockup vergleichen

3. **Paket 3 — i18n + QA**
   - UI-Strings in `dictionaries/{de,en,fr,pl}.json`
   - Validate-Skript erweitern
   - `npm run build` (Static Export)
   - Smoke-Tests in allen 4 Sprachen

---

## Offene Punkte

- **HE 60 rapid Qualitätsklasse-Konflikt:** TDS sagt CT-C60-F8-A6, RV-Feedback "CT-C70-F9-A6". Wir nehmen TDS-Wert, dokumentieren Diskrepanz für späteres Klären.
- **Level Q-Klasse-Konflikt:** TDS sagt CT-C40-F8-AR0,5, RV sagt CT-C40-F10. Wir nehmen RV-Wert (aktueller).
- **ASPHALT REPAIR MIX:** keine offizielle C-Klasse → Subtitel ohne Klasse, nur Beschreibung.
- **Mobile-Matrix:** aktuell horizontal scroll. Falls Card-View gewünscht: separater Task.

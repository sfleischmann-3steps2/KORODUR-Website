# Referenz-Datenvertrag: Website ↔ Referenzverzeichnis (Crosswalk)

**Stand:** 2026-07-01 · Track 2 zu #327 · Scope V1: Harvest-Referenzen, Sprachen DE/EN/FR

Dieses Dokument bildet das Website-Datenmodell (`data/types.ts` → `Referenz`) auf das
Referenzverzeichnis (RV) ab. Quellen im RV-Repo `KORODUR-International/korodur-referenzverzeichnis`:
`docs/schema-v1.md` (Notion-Schema), `docs/datenmodell-spec.md` (Ziel-Feldmodell),
`docs/web-detailseite/detailseite-spec.md` (Datenvertrag der Detailseite, kopiert nach
`docs/reference/web-detailseite/`).

## 1. Kernbefund

Die Ziel-Datenstruktur existiert bereits und ist beidseitig implementiert. Der Website-Typ
`Referenz` ist ein **Superset** des Datenvertrags (`ausgangssituation`, `kennwerte`, `umsetzung`,
`ergebnis`, `langzeit`, `nachhaltigkeit`, `menge`, `bilder.*`, `beteiligte`, `releaseStatus`),
plus die Legacy-Triade `herausforderungen`/`loesung`/`vorteile`, auf die die Detailseite
(`app/[lang]/referenzen/[slug]/page.tsx`) sauber zurückfällt. **Kein Typ-/Schema-Umbau nötig.**

## 2. Architektur & SoT

- RV-Daten leben in **Notion**: Master-DB `Referenzverzeichnis` (`2e7670e1-9e1a-8062-b050-c9f4406c0877`,
  sprachneutral, DE-Master) + separate **Übersetzungs-DB** (1 Zeile = Ref × Sprache).
- **V1:** `data/referenzen.ts` bleibt SoT für den Cutover (Static Export). Live-Sync Notion→Website
  erst post-V1.
- **Divergenz-Richtung:** DE-Veredeltext (#327, quelltreu aus alt-korodur.de-Deutsch) gewinnt und
  fließt in die RV zurück. **EN/FR:** der Website-Harvest (RV-Übersetzungs-DB, alt-korodur.de) ist die
  Wahrheit; die App-i18n-EN/FR sind qualitativ schlecht und dürfen NICHT als Quelle in die RV.

## 3. Feld-Crosswalk (nach RV-Block)

Legende: **W** = fließt in die Web-Detailseite · **T** = hat eine Zeile in der Übersetzungs-DB.

### Block A — Identifikation

| Website `Referenz` | RV-Property (schema-v1) | Datenvertrag | Übersetzungs-DB | Hinweis |
|---|---|---|---|---|
| `id`, `slug` | abgeleitet aus Objekttitel | `slug` | — | technisch |
| `titel` | Objekttitel (Title) | `title` (W) | Objekttitel übersetzt (T) | Konvention `Einsatzbereich, Betreiber, Ort (Jahr)` |
| `untertitel` | Kurzbeschreibung (Teaser) | `claim` + `lead` (W) | Kurzbeschreibung (T) | Website nutzt untertitel als Claim/Teaser |
| `ort` | Ort (Text) | `location` (W) | — (sprachneutral) | |
| `land` | Land (Select) | `location` (W) | Landname wird pro Sprache angezeigt | |
| `jahr` | Baujahr (Text→Number) | `year` (W) | — | |
| `projekttyp` | Projekttyp (Select) | `projectType` (W) | — | Neubau/Sanierung/Instandsetzung/Modernisierung |

### Block B — Beteiligte & Kontext

| Website `Referenz` | RV-Property | Datenvertrag | Übers.-DB | Hinweis |
|---|---|---|---|---|
| `beteiligte[{role,name,anonymized}]` | Betreiber/Verarbeiter/Generalunternehmen/Architekt + Namensfreigabe ×4 | `parties` (W) | — | Anonymisierung über `releaseStatus` |
| `flaeche` | Fläche (Text→Number+Einheit) | `area` (W) | — | Einheit m²/m³ (MICROTOP = m³) |
| `menge` | Eingebaute Menge | `quantity` (W) | — | z. B. „9 m³ / 6,8 t" |
| `zusatzfunktionen[]` | Zusatzfunktion (Multi-Select) | Eckdaten (W) | — | Chemikalien-/Tausalzbest., Rutschhemmung |
| — | Nutzungskontext | (W) | — | RV-only (Belastungsbild, LKW/Tag) |
| — | Einbaudatum (Date) | `installation` | — | RV-only |

### Block C — Story & Substanz

| Website `Referenz` | RV-Property | Datenvertrag | Übers.-DB | Hinweis |
|---|---|---|---|---|
| `produkte[]` (Namen) | `🚧 Kern Produktdaten` (Relation) | `products` (W) | — | Website = Namen-Array, RV = Relation → Produkt-DB. **Matching nötig** (siehe §7) |
| `ausgangssituation` | Ausgangssituation (Akt 1) | `situation` (W) | Ausgangslage (T) | |
| `herausforderungen[]` | Herausforderung (Akt 2) | `challenges` (W) | Aufgabe (T) | Website = Bullets |
| `loesung` | Warum KORODUR / Lösung | `solution` (W) | Lösung/Ergebnis (T) | |
| `kennwerte[{value,label}]` | Erreichte Kennwerte | `metrics` (W) | — | z. B. „32 N/mm² nach 2 h" |
| `umsetzung[{label,value}]` | Verarbeiter/Einbaudatum/Menge/Werte | `installation` (W) | — | abgeleitet |
| `ergebnis` | Ergebnis/Wirkung (Akt 3) | `result` (W) | Lösung/Ergebnis (T) | |
| `vorteile[]` | **kein RV-Gegenstück** | Teil `result` (W) | (in Lösung/Ergebnis) | **Website-nah**: beim Rückspielen in „Ergebnis/Wirkung" mappen |
| `langzeit` | Langzeit-Beobachtung | `longterm` (W) | — | RV verworfen bis V3 |
| `nachhaltigkeit{text,facts}` | (nur wenn echt: EPD/CO₂/LEED) | `sustainability` (W) | — | |

### Block D — Medien

| Website `Referenz` | RV-Property | Datenvertrag | Hinweis |
|---|---|---|---|
| `bild`, `bildAlt` | Hero-/Cover-Bild + Bildunterschrift | Titelblock (W) | Bild-Konzept RV offen (Cover + Galerie empfohlen) |
| `bilder.vorher/nachher/einbau/ergebnis` | TOP 3 Bilder / Weitere Bilder | `images.vorher/nachher` (W) | |
| `galerieBilder[]` | Weitere Bilder & Dokumente | `images.gallery` (W) | Original-Auflösung in SharePoint |

### Block E — Freigabe & Steuerung

| Website `Referenz` | RV-Property | Datenvertrag | Hinweis |
|---|---|---|---|
| `releaseStatus` | Freigabestatus | `releaseStatus` (W) | **1:1**: oeffentlich / oeffentlich-anonymisiert / intern / freigabe-offen |
| — | Qualitätsstufe (Rohdaten/Teaser/Veröffentlichungsreif) | — | RV-only; Website rendert nur „Veröffentlichungsreif + Öffentlich" |
| — | Status (Prozess) | — | RV-only |
| — | Reklamations-/Garantiekontext (Checkbox) | — | RV-only, triggert „anonymisiert" |

## 4. Website-only Felder (nicht in der RV)

- `zeitDringlichkeit` — Lösungsfinder-Tag. RV-„Dringlichkeit" wird gelöscht (kollidiert mit Status).
- `heroQualitaet` — Hero-Auflösungs-Gate (#256), reine Render-Steuerung.
- `einsatzbereiche[]` (Kategorie-Enum) und `sanierungsart` treiben zusätzlich den Lösungsfinder;
  Abbildung auf RV siehe §7 (Taxonomie-Bruch).

## 5. RV-only / deferred

`Farbe` (Filter, behalten) · `Lieferland` (falls abweichend) · `Nutzungskontext` · `Einbaudatum` ·
`Namensfreigabe ×4` (Website faltet das in `beteiligte.anonymized`) · `Qualitätsstufe` · `Status` ·
`Langzeit-Beobachtung` (bis V3) · `Redaktionsplan`/`neue Informationen` (Relationen).

## 6. „Fällt weg" (RV-Löschliste, betrifft die Website nicht)

`Archiv: *` · `LinkedIn-Post` · Multi-Select `eingesetzte KORODUR Produkte` (→ Relation
`🚧 Kern Produktdaten`) · `Informationen zu sonstigen Bildern`.

## 7. Offene Abgleich-Punkte (für Reconciliation)

1. **Taxonomie-Bruch Einsatzbereich.** Website `einsatzbereiche` (deprecated 8-Cluster
   `EinsatzbereichKategorie` + abgeleitetes V25-6-Cluster) ≠ RV `Einsatzbereich` (Multi-Select,
   9 + Sonstiges). Braucht eine explizite Mapping-Tabelle, kein stilles Gleichsetzen.
2. **Produkt-Relation.** Website `produkte[]` sind Namen-Strings, RV ist Relation auf die Produkt-DB.
   Beim Abgleich über Produktnamen matchen (wie #327); `NEODUR PFM-EP` fehlt im Website-Katalog.
3. **EN/FR-Harvest-Ersatz.** Wo der Harvest-EN/FR (RV) die schlechte App-i18n-Übersetzung schlägt,
   als Website-Content-Fix ausweisen (Harvest → `data/i18n/referenzen.{en,fr}.ts`), separat nach Review.

## 8. Übersetzungs-Mapping (DE/EN/FR)

Die Übersetzungs-DB führt je Sprache 5 Textfelder. Website-Overrides (`data/i18n/referenzen.{lang}.ts`)
bilden darauf ab:

| Übersetzungs-DB | Website-i18n-Override |
|---|---|
| Objekttitel übersetzt | `titel` |
| Kurzbeschreibung | `untertitel` |
| Ausgangslage | `ausgangssituation` (falls gepflegt) |
| Aufgabe | `herausforderungen[]` |
| Lösung/Ergebnis | `loesung` (+ `vorteile[]`/`ergebnis`) |

Regel (RV): Ändert sich der DE-Master, springt der Übersetzungsstatus auf „Entwurf".
Harvest-EN/FR starten „Muttersprachler-geprüft". **PL/ES + weitere Sprachen: nicht in V1**
(separater Translation-Workflow mit KORODUR-Glossar, eigenes Repo).

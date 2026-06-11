# Website-Migration: korodur.de → App

**Stand:** 2026-06-11 | **Plan:** `docs/plans/2026-06-11-website-integration-plan.md`

## Quelle (autoritativ)

- **Repo:** `sfleischmann-3steps2/KORODUR-website` (lokaler Clone: `../KORODUR-website`)
- **Content-Scrape:** `01_analyse/scraped_content/` — Wayback-Stand 2026-04-13, nur DE, ~95 % Abdeckung, 75 Produkte. `produktuebersicht.md` ist die verbindliche Bereichs-Zuordnung.
- **Konzept:** `03_konzept/ia_new.md` (IA), `03_konzept/page_templates.md` (Seitentypen), `03_konzept/zielgruppen.md` (Personas)
- **Nicht im Scrape:** Referenzen (~130), Service-Seiten (LV/DoP/SDS), EN/FR-Versionen, Bilder. TDS-Links im Scrape sind tot — TDS-URLs kommen aus der Notion-Produktdatenbank.

**Regel:** Quelldaten vollständig lesen, fehlende Werte leer lassen und hier als offenen Punkt eintragen. Niemals Werte erfinden.

## Bereichs-Mapping (alte URL → App-Route)

| Bereich (`Produktbereich`) | Alte URL | Neue Route | Produkte (Quelle) |
|---|---|---|---|
| `industrieboden` | `/bereiche/industrieboden/` | `/[lang]/bereiche/industrieboden/` | 44 |
| `sichtestrich` | `/bereiche/sichtestrich/` | `/[lang]/bereiche/sichtestrich/` | 6 |
| `microtop` | `/bereiche/microtop/` | `/[lang]/bereiche/microtop/` | 8 |
| `rapid-set` | `/bereiche/rapid-set/` | `/[lang]/bereiche/rapid-set/` | 7 |
| `schnellbetonsysteme` | `/bereiche/schnellbetonsysteme/` | `/[lang]/bereiche/schnellbetonsysteme/` | 0 (Bereichsseite, Produkte unter rapid-set/spezialbaustoffe) |
| `spezialbaustoffe` | `/bereiche/spezialbaustoffe/` | `/[lang]/bereiche/spezialbaustoffe/` | 7 |
| `3d-concrete-printing` | `/bereiche/3d-concrete-printing/` | `/[lang]/bereiche/3d-concrete-printing/` | 0 (Bereichsseite, externe Domain) |
| `katzenstreu` | `/bereiche/katzenstreu/` | `/[lang]/bereiche/katzenstreu/` | 3 (B2B, andere Zielgruppe, optisch abgegrenzt, bewusst schlank) |

Die alte `/produkt-kategorie/`-Doppelstruktur (WooCommerce) wird NICHT übernommen. Produktdetails laufen weiter unter `/[lang]/produkte/[id]/`.

## Migrationsstatus je Bereich

| Bereich | DE-Daten | Bereichsseite | EN | FR | PL | Bilder | PR |
|---|---|---|---|---|---|---|---|
| industrieboden (Teil 1: NEODUR + Hartstoffe) | teilweise (10/25 aus Bestand) | — | teilweise | teilweise | teilweise | teilweise | PR 5 geplant |
| industrieboden (Teil 2: Bauchemie) | teilweise (3/19 aus Bestand) | — | teilweise | teilweise | teilweise | — | PR 6 geplant |
| sichtestrich | teilweise (1/6) | — | — | — | — | — | PR 7 geplant |
| microtop | — (0/8) | — | — | — | — | — | PR 7 geplant |
| spezialbaustoffe | teilweise (1/7) | — | — | — | — | — | PR 8 geplant |
| rapid-set | teilweise (6/7) | — | teilweise | teilweise | teilweise | teilweise | PR 8 geplant |
| schnellbetonsysteme | n/a | — | — | — | — | — | PR 8 geplant |
| 3d-concrete-printing | n/a | — | — | — | — | — | PR 8 geplant |
| katzenstreu | — (0/3) | — | — | — | — | — | PR 9 geplant (Mockup zuerst) |
| Unternehmensseiten | — | — | — | — | — | — | PR 10 geplant |

## Offene Punkte (laufend pflegen)

1. Bild-Beschaffung: Produktbilder + Bereichs-Heros (Live-Site-Download vs. SharePoint-Originale) — Klärung Steffi
2. `belastbarNach` für neodur-he-65 / neodur-he-40 (TDS-Daten fehlen, Input Frank) — Bestand, nicht migrationsbedingt
3. Rapid Set: Unterseiten Flow Control / Fast Control / Set Control fehlen im Scrape (Wayback-Lücke) — bei Bedarf von Live-Site nachsichern

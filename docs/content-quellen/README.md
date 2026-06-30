# Content-Quellen – Bereichs-Marketingprosa (Alt-Website korodur.de)

**Erstellt:** 2026-06-29 · **Auftrag:** XML-Export der Alt-Website kartieren + Bereichs-Prosa extrahieren

## Wichtigster Befund: Die Bereichs-Prosa steht NICHT im XML

Der gefundene WordPress-Export ist **auf Referenzen beschränkt** – er enthält keine
`page`-Inhalte, also keine Bereichs-Hauptseiten.

| | |
|---|---|
| **WXR-Datei** | `/Users/sfleischmann/KORODUR/KORODUR-Referenzverzeichnis/_archiv/harvest-2026-06-10/korodur.WordPress.2026-06-10.xml` |
| **Format** | WordPress eXtended RSS (WXR 1.2), WordPress 7.0, erstellt 2026-06-10 10:56 |
| **Größe** | 22 MB |
| **post_types** | `referenzen` (410), `attachment` (4108) – **sonst nichts** |
| **Mehrsprachigkeit** | WPML; Referenzen in DE (`/referenzen/`), EN (`/en/references/`), FR (`/fr/references/`) |
| **Enthält NICHT** | `page`, `post`, Produkt-CPT → also keine Bereichs-/Unternehmens-/Produkt-Seiten |

## Genutzte Ersatzquelle für die Bereichs-Prosa

Da das XML die Bereichsseiten nicht führt, stammt die Prosa in `bereich-prosa/` aus dem
**bereits vorhandenen Wayback-Scrape**:

`/Users/sfleischmann/KORODUR/archive/KORODUR-website, archiviert/01_analyse/scraped_content/bereiche_content.md`
(Scrape-Stand 2026-04-13, Methode: web.archive.org, da korodur.de via Cloudflare geschützt).

**Diese Quelle ist DE-only.** EN/FR der Bereichsseiten existieren live (`/en/areas/…`,
`/fr/domaines/…`, vgl. `page-sitemap.xml` im Archiv), sind aber **nirgends lokal gescraped**.

## Sprach-Abdeckung Bereich × Sprache

| Neuer Bereich | Alt-Quelle (Hauptseite) | DE | EN | FR |
|---|---|---|---|---|
| industrieboden (+ sichtestrich eingefaltet) | `/bereiche/industrieboden/` (+ `/sichtestrich/`) | ✅ Datei | ⚠️ nur live | ⚠️ nur live |
| rapid-set („Betonsanierung") | `/bereiche/rapid-set/` | ✅ Datei | ⚠️ nur live | ⚠️ nur live |
| microtop | `/bereiche/microtop/` | ✅ Datei | ⚠️ nur live | ⚠️ nur live |
| infrastruktur (ersetzt schnellbetonsysteme) | `/bereiche/schnellbetonsysteme/` | ✅ Datei (≈) | ⚠️ nur live | ⚠️ nur live |
| spezialmoertel | `/bereiche/spezialbaustoffe/` | ✅ Datei | ⚠️ nur live | ⚠️ nur live |
| katzenstreu | `/bereiche/katzenstreu/` | ✅ Datei | ⚠️ nur live | ⚠️ nur live |
| 3d-concrete-printing | `/bereiche/3d-concrete-printing/` | ✅ Datei (dünn) | ⚠️ nur live | ⚠️ nur live |

Legende: ✅ Datei = lokal extrahiert · ⚠️ nur live = existiert auf korodur.de, lokal nicht gescraped.
„(≈)" = kein 1:1-Zwilling, nächstliegende Alt-Seite. „(dünn)" = nur Claim + Mission, kaum Prosa.

## Was das XML SONST enthält (für spätere Extraktion)

- **410 `referenzen`** mit DE/EN/FR-Varianten (eigene `<item>` je Sprache, WPML) –
  vollständiger Referenz-Content inkl. Texte, Galerie-Zuordnungen, Metadaten.
- **4108 `attachment`** (Medienbibliothek: Bilder/PDFs) mit Original-URLs unter
  `wp-content/uploads/…`.
- **KEINE** Unternehmens-, Produkt- oder Service-Seiten → diese nur aus dem
  Wayback-Scrape (`scraped_content/`, DE) bzw. live.

## Stale-Produkte (eingestellt) in der Bereichs-Prosa

Markiert, nicht entfernt. System KORODUR-KOROTAN bleibt gültig.

- **MICROTOP TW NSD** → in `microtop.de.md` (Produkttabelle der Hauptseite). Eingestellt.
- KOROPOX, NEODUR AM Super/Plus → **nicht** in der Hauptseiten-Prosa, aber massiv in den
  Detail-/Produktlisten der Scrape-Dateien (`bereiche_industrieboden_details.md`,
  `bereiche_rapid_set_details.md`, `bereiche_spezialbaustoffe_details.md`). Relevant erst bei
  späterer Produkt-Extraktion.
- KOROTAN-Additiv → kein Treffer in den Scrape-Dateien.

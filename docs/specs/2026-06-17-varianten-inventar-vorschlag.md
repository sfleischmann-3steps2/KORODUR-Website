---
Erstellt: 2026-06-17
Typ: Spec / Vorschlag (Steffi nickt ab → Technik)
Issue: #110 (Varianten-PDP)
Status: Vorschlag, wartet auf Steffi-Freigabe vor Technik-Übergabe
Quellen: data/produkte.ts (varianten[]) · ../KORODUR-website/.../product-sitemap.xml (70 DE-Slugs) · data/produktDokumente.ts (TDS-Titel)
---

# Varianten-Inventar & PDP-Architektur — Vorschlag (#110)

## Kernaussage

Von 76 Produkten tragen **15 heute schon `varianten[]`** (Tabelle A, bestätigt). Weitere **~10 Produkt-Cluster** sind Verdachtsfälle, die wir mit der Technik klären (Tabelle B). Der Rest ist kein Variantenfall (Tabelle C, meist FR-Sprachduplikate oder Einzelstoffe). Vorschlag: Tabelle A bauen wir, Tabelle B geht als Frageliste an die Technik, Tabelle C bleibt unverändert.

## Festlegungen (Steffi, 2026-06-17) — gelten für den Umbau

1. **Routing:** flache Slugs wie Alt-Site (`/produkte/neodur-he-3-metallisch/`), Slug = Alt-Slug → SEO-Kontinuität. Variante = vollwertiges Produkt mit `familieId` + `istVariante`. 301-Redirect-Map (pro Locale) ist Cutover-Aufgabe.
2. **TDS:** Heute teilen sich Varianten ein TDS (bis zu 3 TDS/PDP, z. B. HE 3). Ziel in ~3–6 Monaten: eigenes TDS je Variante. Datenmodell **jetzt schon** so auslegen (Dokumente je Variante mit Fallback auf Familie).
3. **Dokument-Sprache:** aktive Sprache → Fallback **EN → DE**. **Bereits gebaut** (`components/DokumentListe.tsx:41`, #120). Der Variantenumbau muss diese Kette pro Variante erhalten. Ziel künftig: alle Unterlagen in allen Landessprachen je Variante.
4. **Bilder:** **Anwendungsszenarien**, keine Packshot-Mockups. Die Alt-Site-Variantenbilder (Szenarien, z. B. `NEODUR®-HE-3-metallisch.png` = Industriehalle) liegen im Archiv-Mirror `../KORODUR-website/05_wp-content-archiv/mirror/wp-content/uploads/` und werden **1:1 übernommen**. Zusatzbilder aus der Referenzdatenbank.
5. **Edge-Case:** Einzelne Variante darf bei Bedarf auf eine extra Seite gezogen werden.

## A — Bestätigte Varianten-Familien (15, haben `varianten[]` heute)

| Familie | Varianten (App) | Alt-Site-Slugs | TDS heute | Hinweis / Flag |
|---|---|---|---|---|
| **NEODUR HE 3** | SVS 3 · SVS 1,5 · SVS 1,5 extra · metallisch | svs-3, svs-15, metallisch (+ green separat) | 3 (HE 3 / metallisch / **spezial**) | Mapping-Konflikt, s. u. |
| **NEODUR HE 65** | SVS 3 · SVS 1,5 · SVS 1,5 extra · metallisch | metallisch, svs-3, svs-15 (+ plus separat) | 2 (HE 65 / metallisch) | „plus" ist eigenes Produkt |
| **NEODUR HE 65 Plus** | HE 65 plus SVS 3 | he-65-plus-svs-3 | 2 (Dublette HE 65 Plus/plus) | nur 1 Variante |
| **NEODUR HE 60 rapid** | SVS 3 · SVS 1,5 · metallisch | — (neuer als Scrape) | 1 | TDS deckt alle |
| **NEODUR HE 40** | HE 40/8 | — | 1 | 1 Variante |
| **KORODUR DUROP** | 0,5/1 · 1/2 · 2/3 · 2/5 | — | 1 (+ fr) | Körnungen |
| **GRANIDUR** | 05 · 08 | granidur-bianco-nero | 4 (inkl. Farbkarte) | Bianco/Nero ist eigenes Produkt |
| **GRANIDUR BIANCO/NERO** | BIANCO · NERO | — | 2 (inkl. Farbkarte) | Farbvarianten |
| **KORODUR COPETTI FLOOR KCF** | 05 · 08 · 05 rapid | — | 3 (inkl. Farbkarte) | Körnung + rapid |
| **MICROTOP TW NSM** | blau | — | 1 | Farbe |
| **MICROTOP TW BM** | weiß · blau | — | 1 | Farben |
| **NEODUR VM 1 / VM 3 / VB 8** | VM 1 · VM 3 · VB 8 | — | 1 (kombiniert) | 3 Produkte als 1 PDP gebündelt |
| **Rapid Set CONCRETE PHARMACY** | SET · FLOW · FAST Control | — | 2 | 3 Additive gebündelt |
| **Rapid Set CEMENT ALL** | + Plus | — | 2 (Cement All / Plus) | |
| **NEODUR PFM-ZE** | PFM-ZE · PFM-ZE Flex | — | 2 | |

## B — Zur Klärung mit der Technik (strukturelle Signale, kein `varianten[]`)

**B1 — Produkt-Cluster mit gemeinsamem TDS oder Alt-Site-Familie** (heute getrennte Produkte; werden sie eine Familie mit Varianten?):

| Cluster | Heute (App) | Signal | Frage |
|---|---|---|---|
| **MICROTOP TW 3 / TW 5 / TW 8** | 3 Produkte | gemeinsames TDS „MICROTOP TW 3 5 8" | Familie mit 3 Varianten? |
| **KORODUR FSCem / FSCem Screed** | 2 Produkte | Alt-Familie + 3. TDS „FSCem Basic" | Familie? Was ist „Basic"? |
| **KOROMINERAL / Cure / Li / Lasur** | mehrere | Alt-Familie koromineral→cure,li | Produktlinie oder Varianten? |
| **KORODUR HB 5 / HB 5 rapid** | 2 Produkte | Alt-Familie hb-5→hb-5-rapid | Variante oder eigenes Produkt? |
| **NEODUR AM Super / AM Plus** | 2 Produkte | gemeinsames TDS „AM Super AM Plus" | Familie? |
| **NEODUR MSM 3 / MSM 5 / MSB 8** | 3 Produkte | gleiche Gruppe spritzmoertel | Familie? |

**B2 — Farbvarianten** (Farbkarte vorhanden → vermutlich On-Page-Farbauswahl statt eigener Seite, wie Sika/Mapei): GRANIDUR, KCF, TRU Self-Leveling, TRU PC, TRU SP, MICROTOP TW NSM/BM. Frage: eigene Seite je Farbe oder Farbauswahl auf einer Seite?

**B3 — Alt-Site-Slug ohne App-Produkt** (Variante, umbenannt oder eingestellt?): `neodur-level-au` (au = Außen?), `koromineral-li`.

## C — Kein Variantenfall (dismissed)

- **FR-/Sprachduplikate** (kein Variant): KORODUR PC, TXPK, easyFinish, nanoFinish, KOROTAN, KOROMINERAL Cure/Lasur, FSCem Screed, KORODUR HB 5 rapid, Rapid Set LevelFlor — „… fr 1/2" ist nur die französische Fassung desselben TDS.
- **Einzelstoffe / Basismaterialien** (keine Familie): KORODUR WH-metallisch, WH-Spezial, Diamantbeton, NEODUR HE 2, KORODUR Robust, NEODUR SVM 4, Rapid Set CONCRETE MIX.
- **Sortiment ohne Variantenlogik:** goodcat (Katzenstreu).

## Mapping-Konflikt am Beispiel NEODUR HE 3 (illustriert die TDS-Frage)

Drei Quellen, drei verschiedene Variantenlisten:

- **`varianten[]` (App):** SVS 3 · SVS 1,5 · SVS 1,5 extra · metallisch (4)
- **Alt-Site-Slugs:** svs-3 · svs-15 · metallisch (3, + `green` als eigenes Produkt)
- **TDS:** HE 3 · HE 3 metallisch · HE 3 **spezial** (3)

Konflikte: „SVS 1,5 extra" hat weder Alt-Slug noch eigenes TDS · das TDS „spezial" hat keine Variante · Alt „svs-15" vs. App „SVS 1,5". → Die Technik muss je Familie die **kanonische Variantenliste** und die **TDS-Zuordnung je Variante** festlegen. Bis eigene TDS existieren: Variante teilt das Familien-/nächstliegende TDS (Fallback), klar gelabelt.

## Offene Technik-Fragen (nach Steffi-Nick auf Notion-Frageseite)

1. Tabelle A: kanonische Variantenliste je Familie bestätigen (Konflikte wie HE 3 auflösen).
2. Tabelle B1: je Cluster — Familie mit Varianten oder getrennte Produkte?
3. Tabelle B2: Farbvarianten — eigene Seite oder On-Page-Farbauswahl?
4. TDS-Zuordnung je Variante (welche Variante teilt welches TDS, bis eigene da sind).
5. SKU/Artikelnummer je Variante — Quelle/Pflegeort (Alt-WooCommerce hatte sie)?
6. B3: Alt-Slugs ohne App-Produkt (`neodur-level-au`, `koromineral-li`) — Variante, umbenannt oder eingestellt?

## Nächste Schritte

Steffi nickt diesen Vorschlag ab → Tabelle-B-Fragen auf die Notion-Frageseite an die Technik → parallel Datenmodell-/Routing-Umbau (#110) auf Tabelle-A-Basis vorbereiten (familieId, flache Slugs, Doc-Fallback je Variante, Redirect-Map, Bild-Harvest aus dem Archiv-Mirror).

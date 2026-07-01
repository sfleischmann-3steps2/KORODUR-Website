# Taxonomie-Crosswalk Repo ↔ Notion

**Issue:** #241 · **Status:** gepflegte Referenz · **Stand:** 2026-07-01

Diese Datei ist der verbindliche Naming-Klebstoff zwischen der Repo-Taxonomie (`data/*.ts`) und den Notion-Properties (Produktdatenbank „Kern Produktdaten", Referenzverzeichnis). Sie ist **Prerequisite für die Sync-Pipeline (#242)**: jeder Property-Abgleich Repo↔Notion läuft über die Mappings hier, damit beide Welten in der Übergangsphase nicht auseinanderdriften.

## Lese-Anleitung

- **Achse** = eine Taxonomie-Dimension (Bereich, Produktart, Projektart …).
- **Status** je Zeile:
  - `1:1` — direkter Wert-für-Wert-Match, nur Schreibweise/kebab-case unterscheidet sich.
  - `abgeleitet` — Match existiert, aber mit Transformation (Merge, Split, Umbenennung, Sonderfallregel).
  - `kein Pendant / t.b.d.` — auf einer Seite kein Gegenstück, oder das Notion-Feld ist uns aktuell nicht bekannt.
- **Naming-Lead (Steffi):** Website-Namen → Repo → Notion. Bei Konflikt gewinnt die Website-Sicht für die Anzeige; für die Datenwahrheit gilt die pro-Achse genannte SoT.
- **SoT-Konflikte** sind je Achse notiert. Grundregel seit 2026-06-23: für Produkt-Zuordnung „Notion gewinnt eindeutig" (Steffi), außer wo unten anders vermerkt.

Quellen dieser Datei: `data/bereiche.ts`, `data/produktart.ts`, `data/produktProjektart.ts`, `data/types.ts`, `data/einsatzbereichMapping.ts`, `data/fachberater.ts`, `notion-cms-konzept.md`, Memory `notion-produkt-view-sot` (Notion-View-Properties, produktweise committet 2026-06-23). Notion-Werte, die nicht direkt aus Repo-Code stammen, sind aus diesen Quellen belegt; unbelegte Felder sind als Lücke markiert, nicht erfunden.

---

## Achse 1 — Bereich / Portfoliobereich

**Repo-Feld:** `Produktbereich` (`data/types.ts`), Bereichs-Slugs in `data/bereiche.ts`, pro Produkt `bereich` + `zusatzBereiche[]` (`data/produkte.ts`).
**Notion-Property:** „Portfoliobereich Website Neu" (Kern Produktdaten, Multi).
**SoT:** Notion-View (produktweise committet), Anzeige folgt Website-Namen.

| Repo-Slug (`Produktbereich`) | Notion-Option (Portfoliobereich Website Neu) | Status |
| :-- | :-- | :-- |
| `industrieboden` | Inbo Neubau **+** Inbo Sanierung | abgeleitet (Notion trennt N/S, Repo führt einen Slug + Projektart-Achse) |
| `sichtestrich` | Sichtestrich Neubau **+** Sichtestrich Sanierung | abgeleitet (als Bereich in #331 aufgelöst → Sub-Bereich unter `industrieboden`; Union-Typ + Referenz-Label bleiben) |
| `infrastruktur` | Infrastruktur | 1:1 |
| `betonsanierung` | Betonsanierung | 1:1 (Sammelbereich; Slug seit #320 `betonsanierung`) |
| `rapid-set` | — (Rapid Set ist in Notion Produktart/Marke, kein eigener Portfoliobereich) | kein Pendant (Marken-Seite, SEO-URL-Erhalt; nicht in `PORTFOLIO_SLUGS`) |
| `spezialmoertel` | Spezialmörtel | 1:1 |
| `microtop` | TW-Trinkwasserbehälter | abgeleitet (Umbenennung; Menü-Kurzname „TW-Behältersanierung") |
| `3d-concrete-printing` | — | kein Pendant / t.b.d. (Bereich noch nicht befüllt, #257/#347) |
| `katzenstreu` | — | kein Pendant (bewusst: eigener Geschäftsbereich, `abgegrenzt`) |

**Hinweise:**
- Notion modelliert Neubau/Sanierung **in** den Bereichswert hinein (Inbo Neubau/Sanierung, Sichtestrich Neubau/Sanierung). Repo trennt das sauber in zwei Achsen: `bereich` (WOFÜR) + `produktProjektart` (Neubau/Sanierung). Sync muss den Notion-Wert **splitten** → Bereich-Slug + Projektart-Flag.
- Mehrfach-Bereich: Repo `zusatzBereiche[]` = Notion Multi-Select (z. B. KOROCRETE = industrieboden + infrastruktur; VM basic = spezialmoertel + microtop).
- Anzeige-Kuratierung (`PORTFOLIO_SLUGS`, `HOME_PORTFOLIO_KACHELN`) ist Repo-only und hat kein Notion-Pendant.

---

## Achse 2 — Produktart

**Repo-Feld:** `Produktart` (`data/produktart.ts`, 21 Werte, Multi je Produkt via `ID_ZU_PRODUKTART`).
**Notion-Property:** „Produktart" (Kern Produktdaten, seit 2026-07-01 Multi-Choice, ~20 Werte).
**SoT:** Notion-View (Steffi: „Notion gewinnt eindeutig").

| Repo-Wert (`Produktart`) | Notion-Option (Produktart) | Status |
| :-- | :-- | :-- |
| `hartstoff-din1100` | Hartstoff (DIN 1100) | 1:1 |
| `hartstoffeinstreuung` | Hartstoffeinstreuung | 1:1 |
| `hartstoffschicht` | Hartstoffschicht | 1:1 |
| `estrich-bindemittel` | Estrich-Bindemittel | 1:1 |
| `schnellestrich` | Schnellestrich | 1:1 |
| `bodenausgleichsmasse` | Bodenausgleichsmasse | 1:1 |
| `schnellbetonsysteme` | Konstruktiver Schnellbeton | abgeleitet (Naming-Diff: Repo-/Website-Label „Schnellbetonsysteme" per Steffi-Klärung, Notion „Konstruktiver Schnellbeton") |
| `sichtestrich` | Sichtestrich | 1:1 |
| `reparaturmoertel` | Reparaturmörtel | 1:1 |
| `spritzmoertel` | Spritzmörtel | 1:1 |
| `spritzbeton` | Spritzbeton | 1:1 |
| `vergussmoertel` | Vergussmörtel | 1:1 |
| `vergussbeton` | Vergussbeton | 1:1 |
| `pflasterfugenmoertel` | Pflasterfugenmörtel | 1:1 |
| `unterstopfmoertel` | Unterstopfmörtel | 1:1 |
| `haftbruecken-grundierungen` | Haftbrücken & Grundierungen | 1:1 |
| `nachbehandlung` | Oberflächenvergütung | abgeleitet (Notion fasst Nachbehandlung + Imprägnierung als „Oberflächenvergütung"; Repo splittet) |
| `impraegnierung-einpflege` | Oberflächenvergütung | abgeleitet (Teil der Notion-Sammel-Option, s. o.) |
| `additive` | Additive | 1:1 |
| `tw-beschichtungsmoertel` | TW-Beschichtungsmörtel | 1:1 |
| `sonstiges` | Sonstiges | 1:1 |

**Notion-Optionen ohne Repo-Slug** (aus `data/produktart.ts` §66–69 + Memory belegt): `Glätthilfe`, `Zwischennachbehandlung`, `Synthetisches Füll-/Abstreumaterial` → Status **kein Pendant / t.b.d.**; Repo fängt sie über bewusst gesetzte Code-/Gewerk-Zuordnung ab. `Ankermörtel` ist in Notion **entfernt** (nicht für die Website vorgesehen).

**Hinweis:** Beide Seiten sind Multi (ein Produkt kann mehreren Produktarten angehören, z. B. MICROTOP TW 3 = Spritzmörtel + TW-Beschichtungsmörtel). Reihenfolge im Repo = `PRODUKTART_REIHENFOLGE`.

---

## Achse 3 — Projektart (Neubau / Sanierung)

**Repo-Feld:** `Projektart` (`data/einsatzbereichMapping.ts` = `"neubau" | "sanierung"`); pro Produkt `PRODUKT_PROJEKTART_OVERRIDES` (`data/produktProjektart.ts`); pro Referenz `Referenz.projekttyp`.
**Notion-Property:** „Neubau/Sanierung" (Kern Produktdaten).
**SoT:** Notion-View bzw. Leistungskatalog-Dokument (Steffi 2026-06-23: streng dem Dokument/Notion folgen; „technisch beides, real nur einer" → realer Einsatz zählt).

| Repo-Wert | Notion-Option (Neubau/Sanierung) | Status |
| :-- | :-- | :-- |
| `neubau` | Neubau | 1:1 |
| `sanierung` | Sanierung | 1:1 |
| beide (`["neubau","sanierung"]`) | Neubau + Sanierung (Multi) | 1:1 |

**Referenz-Feld `projekttyp`** (`data/types.ts`) hat vier Werte: `sanierung | neubau | instandsetzung | modernisierung`. Für die Achse werden sie über `projektartBucket()` auf zwei Buckets reduziert (`neubau` → neubau; alles andere → sanierung).

| Repo-Wert (`Referenz.projekttyp`) | Bucket (`Projektart`) | Notion-Pendant | Status |
| :-- | :-- | :-- | :-- |
| `neubau` | `neubau` | Neubau | 1:1 |
| `sanierung` | `sanierung` | Sanierung | 1:1 |
| `instandsetzung` | `sanierung` | — | abgeleitet (kollabiert auf Sanierung; kein eigener Notion-Wert bekannt) |
| `modernisierung` | `sanierung` | — | abgeleitet (kollabiert auf Sanierung; kein eigener Notion-Wert bekannt) |

---

## Achse 4 — Gewerk ↔ Rolle

**Notion-Property:** „Gewerk" (14 Werte, laut Issue #241).
**Repo-Feld:** kein aktives strukturiertes Rollen-Feld.

| Notion | Repo | Status |
| :-- | :-- | :-- |
| Gewerk (14 Optionen) | — | **kein Pendant / t.b.d.** |

**Begründung / Lücke:**
- Das frühere Repo-„Rolle"-Konzept (3 Werte: bodenprodukt / haftbruecke / finish, #93) wurde mit dem Zwei-Achsen-Umbau (#307) **entfernt** und durch `Produktart` abgelöst. Es gibt aktuell **kein** produktseitiges Rollen-/Gewerk-Feld im Repo.
- Eine Rest-Spur der Rollen-Logik lebt noch als **Sortier-Reihenfolge** der `produktgruppen` in `data/bereiche.ts` (Kommentar „Rollen-sortiert (#93)": zuerst Bodenprodukte, dann Haftbrücken/Untergrund, dann Finish) — das ist keine gepflegte Wert-Achse, sondern Anzeige-Ordnung.
- Die **14 konkreten Gewerk-Optionen** aus Notion sind in den mir vorliegenden Repo-/Doc-Quellen **nicht enumeriert**. → Vor dem Sync einmalig aus der Notion-DB auslesen und hier nachtragen; Mapping-Entscheidung (auf Produktart abbilden oder eigenes Feld einführen) mit Technik klären.

---

## Achse 5 — Marke

**Notion-Property:** „Marke".
**Repo-Feld:** kein dediziertes Marken-Feld; Marke steckt implizit im Produktnamen (KORODUR / NEODUR / MICROTOP / Rapid Set / KOROCRETE / goodcat …) und teils im Slug.

| Notion | Repo | Status |
| :-- | :-- | :-- |
| Marke (Optionsliste) | — (implizit im `name`/`id`) | **kein Pendant / t.b.d.** |

**Lücke:** Repo führt keine normalisierte Marke. `rapid-set` existiert als Bereichs-/Marken-Seite (SEO), ist aber kein Produkt-Property. Die konkrete Notion-Options­liste „Marke" liegt uns nicht vor. → Falls die Website Marke filtern/anzeigen soll, neues optionales Produkt-Feld `marke` einführen (regional-ready, additiv) und hier mappen; sonst als Notion-only-Metadatum belassen.

---

## Achse 6 — KORODUR-Werteklasse

**Notion-Property:** „KORODUR-Werteklasse".
**Repo-Feld:** kein 1:1-Pendant.

| Notion | Repo | Status |
| :-- | :-- | :-- |
| KORODUR-Werteklasse | — | **kein Pendant / t.b.d.** |

**Lücke:** Kein Repo-Feld trägt diese interne Werteklasse. Optionsliste und Bedeutung sind uns nicht belegt. → Vor Sync klären, ob website-relevant (dann Feld anlegen) oder rein internes Notion-Metadatum (dann aus der Sync-Whitelist ausschließen).

---

## Achse 7 — Innen / Außen

**Repo-Feld:** `InnenAussen` (`data/types.ts` = `"innen" | "aussen"`); pro Produkt `aussenbereich?: boolean` (`data/produkte.ts`); im Lösungsfinder `ProduktFilterV25.innenGeeignet/aussenGeeignet`.
**Notion-Property:** „Innen/Außen" (Kern Produktdaten, Multi-Select).

| Repo | Notion-Option | Status |
| :-- | :-- | :-- |
| `aussenbereich: true` | Außen | abgeleitet (Repo = Boolean, Notion = Multi-Select-Wert) |
| `aussenbereich: false`/fehlt | Innen | abgeleitet |
| `InnenAussen = "innen"` | Innen | 1:1 |
| `InnenAussen = "aussen"` | Außen | 1:1 |

**Sonderfall (Memory):** Notion-Wert „Außen nur in Kombination mit Li+" ist **nicht** unconditional außen. Der Sync darf diesen Fall nicht platt auf `aussenbereich: true` mappen. → Regel/Override beim Sync explizit behandeln.

---

## Achse 8 — Website-Status ↔ releaseStatus

Zwei getrennte Konzepte, die beide „Status" heißen. Nicht verwechseln.

**8a — Website-Sichtbarkeit (Produkt)**
Notion-Property „Website-Status" (Kern Produktdaten). Repo hat kein Feld; Sichtbarkeit = Produkt ist in `data/produkte.ts` vorhanden oder nicht.

| Notion (Website-Status) | Repo | Status |
| :-- | :-- | :-- |
| `online` | Produkt in `data/produkte.ts` vorhanden | abgeleitet (Präsenz = Status) |
| `fehlt` | (soll rauf, noch nicht in `produkte.ts`) | abgeleitet |
| `nicht vorgesehen` | Produkt nicht in `produkte.ts` | abgeleitet |
| `Kein Produkt = YES` | System/Sammelprodukt (kein Einzel-PDP) | abgeleitet |

**8b — Kunden-/Referenzfreigabe (Referenz)**
Repo-Feld `Referenz.releaseStatus` (`data/types.ts`). Notion-Pendant „Kundenfreigabe" laut CMS-Konzept DB 2 (aus `releaseStatus` gespeist).

| Repo-Wert (`releaseStatus`) | Notion (Kundenfreigabe, DB 2) | Status |
| :-- | :-- | :-- |
| `oeffentlich` | öffentlich | 1:1 |
| `oeffentlich-anonymisiert` | anonymisiert | 1:1 |
| `freigabe-offen` | freigabe-offen | 1:1 |
| `intern` | intern | 1:1 |

**Hinweis:** DB 2 ist im CMS-Konzept beschrieben, aber die Referenz-Text-DB ist noch nicht angelegt (Phase 0). Bis dahin `freigabe-offen`-Zuordnung als geplant, nicht als bestehend, behandeln.

---

## Achse 9 — Lösungsfinder-/Matrix-Taxonomie (Repo-only)

Diese Achsen steuern Wizard und Anwendungsmatrix. Sie sind bewusst **Code-Taxonomie** und haben laut CMS-Konzept (§4) **kein** Notion-Pendant — sie werden nicht übersetzt und nicht ins CMS gehoben (Master-Daten, nicht Text-Layer). Vollständig hier gelistet, damit der Sync sie in die **Ausschluss-Whitelist** nimmt.

| Repo-Typ (`data/types.ts`) | Werte | Notion-Pendant | Status |
| :-- | :-- | :-- | :-- |
| `Flaechenkategorie` | `punktuell` · `mittel` · `gross` | — | kein Pendant (Code-only) |
| `InnenAussen` | `innen` · `aussen` | (siehe Achse 7 für Produkt-Ebene) | kein Pendant auf Wizard-Ebene |
| `EinsatzbereichV25` | `innen-industrie-halle` · `innen-nass-hygiene-chemie` · `innen-sicht-design` · `aussen-verkehr-infrastruktur` · `aussen-parkdeck` · `aussen-umwelt-whg` | — | kein Pendant (Code-only) |
| `Zeitfenster` | `sehr-kurz` · `kurz` · `planbar` | — | kein Pendant (Code-only) |
| `BelastungsTag` | `schwerlast` · `verschleiss` · `staplerverkehr` · `chemie-treibstoff` · `chemie-aggressiv` · `hygiene` · `fleckschutz` · `optik` · `publikumsverkehr` · `frost-tausalz` · `whg` | — | kein Pendant (Code-only, aus Einsatzbereich abgeleitet) |
| `Schadenstyp` | `verschleissschaeden` · `ausbrueche` · `risse` · `frueher-sanierung` | — | kein Pendant (Code-only, Referenz-Filter) |

**Deprecated (nicht mehr für Neu-Mapping verwenden, aber noch im Datenbestand):** `Sanierungsart` (`punktuell`/`grossflaechig`), `EinsatzbereichKategorie` (8er-Schema), `ZeitKategorie`, `Zusatzfunktion`. Leben noch in `data/referenzen.ts` (`einsatzbereiche`) + Galerie; V2.5-Adapter mappt on-the-fly. Kein Notion-Pendant.

---

## Achse 10 — Fachberater-Zuordnung

**Repo-Feld:** `Fachberater.bereiche: Produktbereich[]` + `Fachberater.rolle` (Freitext-Jobtitel), `data/fachberater.ts`.
**Notion-Pendant:** keins bekannt (Fachberater werden aus Alt-Site gepflegt, nicht aus Notion).

| Repo | Notion | Status |
| :-- | :-- | :-- |
| `Fachberater.bereiche[]` (nutzt `Produktbereich`-Slugs) | — | kein Pendant / t.b.d. |
| `Fachberater.rolle` (Freitext, z. B. „Technische Vertriebsberatung Rapid Set") | — (nicht die Gewerk-Optionsliste, s. Achse 4) | kein Pendant |

**Hinweis:** Für die Berater-Zuordnung greift zusätzlich die Alias-Regel `BEREICH_BERATER_ALIAS` (sichtestrich→industrieboden, spezialmoertel/infrastruktur/betonsanierung→rapid-set, katzenstreu bewusst ohne Alias). Reine Repo-Logik.

---

## Zusammenfassung Status je Achse

| # | Achse | Repo-Feld | Notion-Property | Ergebnis |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Bereich | `Produktbereich` | Portfoliobereich Website Neu | 5× teilweise (Split N/S), 3× kein Pendant |
| 2 | Produktart | `Produktart` | Produktart | 18× 1:1, 3× abgeleitet, 3 Notion-Extras ohne Slug |
| 3 | Projektart | `Projektart`/`projekttyp` | Neubau/Sanierung | 1:1 (Referenz-4er kollabiert auf 2 Buckets) |
| 4 | Gewerk ↔ Rolle | (entfernt) | Gewerk (14) | **kein Pendant — 14 Werte nachzutragen** |
| 5 | Marke | (implizit) | Marke | **kein Pendant — Feldentscheidung offen** |
| 6 | Werteklasse | — | KORODUR-Werteklasse | **kein Pendant — Relevanz offen** |
| 7 | Innen/Außen | `aussenbereich` bool | Innen/Außen | abgeleitet (Bool↔Multi; Li+-Sonderfall) |
| 8 | Website-/Release-Status | `releaseStatus` (Ref) | Website-Status / Kundenfreigabe | 8a abgeleitet, 8b 1:1 |
| 9 | Lösungsfinder-Taxonomie | diverse (`types.ts`) | — | Code-only, Sync-Ausschluss |
| 10 | Fachberater | `Fachberater.bereiche` | — | kein Pendant |

## Offene Lücken (vor #242 zu schließen)

1. **Gewerk (14 Notion-Werte):** in den Repo-/Doc-Quellen nicht enumeriert. Aus Notion auslesen, Mapping-Ziel mit Technik entscheiden (auf `Produktart` abbilden oder eigenes Feld).
2. **Marke:** Notion-Optionsliste unbekannt; Repo hat kein normalisiertes Feld. Feldentscheidung (Sync-relevant ja/nein) offen.
3. **KORODUR-Werteklasse:** Optionsliste + Website-Relevanz unklar; ggf. aus Sync-Whitelist ausschließen.
4. **Referenz-`projekttyp` `instandsetzung`/`modernisierung`:** kollabieren auf `sanierung` — prüfen, ob Notion diese Feinheit hält oder ebenfalls nur 2-wertig ist.
5. **Innen/Außen-Sonderfall „nur mit Li+":** braucht eine explizite Sync-Regel, kein Platt-Mapping.
6. **DB 2 (Referenz-Kundenfreigabe):** in Notion noch nicht angelegt (CMS-Konzept Phase 0); Mapping 8b ist geplant, nicht bestehend.

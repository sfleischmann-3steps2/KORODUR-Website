# Plan: korodur.de-Ablösung durch Integration in die App

**Stand:** 2026-06-11 | **Status:** Freigegeben (Steffi, Chat 2026-06-11) | **Autorin:** Steffi + Claude Code
**Bezug:** `KORODUR-website`-Repo (Audits, IA, Rollout-Konzept), Spec `docs/superpowers/specs/2026-04-17-korodur-website-stack-strategie-design.md`

---

## 1. Ziel

Die KORODUR-Sanierung_app wird zur neuen korodur.de. Alle Inhalte der alten WordPress-Site werden bereichsweise in die App integriert, dabei überarbeitet (CTAs, Zielgruppen, technische Daten als HTML, SEO), und am Ende löst die App die alte Website komplett ab. Das entspricht der Keimzellen-Entscheidung vom 2026-04-17, jetzt mit konkretem Umsetzungspfad.

## 2. Leitentscheidungen (Steffi, 2026-06-11)

| # | Entscheidung | Konsequenz |
|---|---|---|
| 1 | **Voller Scope:** Alle 8 Bereiche werden integriert, auch Rapid Set, Schnellbetonsysteme, 3D Concrete Printing und Katzenstreu | Keine Bereichs-Ausnahmen. Katzenstreu (B2C) wird **optisch klar abgegrenzt**, Konzept dazu via Mockup |
| 2 | **Analytics läuft** seit 2026-06-11 auf der alten Site | Baseline wächst parallel zur Migration. Priorisierung des Cutovers (Stufe 5) wird gegen echte Traffic-Daten geprüft |
| 3 | **Hosting am Ende**, Cloudflare favorisiert (bereits im Unternehmen im Einsatz), aber offen | Bis Stufe 5 bleibt GitHub Pages + basePath. Keine Hosting-Arbeit vorziehen |
| 4 | **Notion als CMS** (statt Payload-Prototyp) | Zwei DBs nach Ownership (Technik / Marketing), bestehende Sync-Pipeline ausbauen. Pflicht: dokumentierter Trigger-Prozess, damit klar ist, was eine Inhaltsänderung auslöst (Stufe 4) |

## 3. Rahmenbedingungen und Schutzgüter

- **Static Export bleibt.** Keine API-Routes, alles zu Build-Zeit, `withBasePath()` bis zum Hosting-Wechsel.
- **Lösungsfinder und Anwendungsmatrix sind unantastbar.** Neue Produkte bekommen ein `bereich`-Feld und tauchen NICHT in Lösungsfinder-Logik oder Anwendungsmatrix auf. Guard: `npx tsx scripts/test-loesungsfinder.ts` muss vor jedem Merge 8/8 bleiben.
- **Quelldaten zuerst lesen, nie erfinden.** Autoritative Quelle ist der Scrape im `KORODUR-website`-Repo (`01_analyse/scraped_content/`, Wayback-Stand 2026-04-13, nur DE, ~95 % Abdeckung, 75 Produkte). Fehlende Werte (TDS-Daten, Bilder) bleiben leer und werden als offene Punkte geführt, analog `belastbarNach` bei HE 65/HE 40.
- **i18n-Vertrag:** Neue UI-Strings immer in allen 4 Dictionaries. Content-Übersetzungen laufen als eigene Sprachpässe (DE-Basis zuerst, EN/FR/PL in Batches, wie bei PR #23).
- **TDS-Links aus der Notion-Produktdatenbank**, nicht aus den toten Wayback-Links des Scrapes.
- **Bilder:** Im Scrape nicht enthalten. Beschaffung von der noch laufenden Live-Site bzw. intern (SharePoint). Bis dahin `_placeholder.jpg`.
- **Mockup vor Umsetzung** bei allen UI-Konzepten (Homepage, Navigation, Bereichsseiten, Katzenstreu-Abgrenzung): HTML-Mockup in `docs/mockups/`, Besprechung, dann Bau.

## 4. Stufenplan Übersicht

| Stufe | Inhalt | Ergebnis live |
|---|---|---|
| 0 | Fundament: Datenmodell, Taxonomie, Validierung | Unsichtbar, aber Basis für alles |
| 1 | IA-Umbau: Navigation, Homepage, Bereichsseiten-Template | App trägt korodur.de-Struktur |
| 2 | Content-Migration je Bereich (DE), dann Sprachpässe | Alle Bereiche und 75 Produkte in der App |
| 3 | Referenzen-Abgleich (130 Alt-Refs vs. Notion vs. App) | Referenzbestand konsolidiert |
| 4 | Notion-CMS-Prozess: 2 DBs, Sync, Trigger-Doku | Redaktionsprozess steht |
| 5 | Cutover: Hosting, Domain, Redirects, SEO-Technik | korodur.de zeigt auf die neue Site |

Die Stufen 0 bis 2 sind sequenziell sinnvoll, Stufe 3 und 4 können parallel zu späten Stufe-2-PRs laufen. Stufe 5 ist strikt zuletzt.

---

## 5. Stufe 0: Fundament (PR 1)

- `data/types.ts`: Typ `Produktbereich` (8 Werte: `industrieboden`, `sichtestrich`, `microtop`, `rapid-set`, `schnellbetonsysteme`, `spezialbaustoffe`, `3d-concrete-printing`, `katzenstreu`) und Erweiterung `Produkt` um `bereich: Produktbereich` plus optionale Felder für Nicht-Sanierungs-Produkte. Bestehende 18 Produkte bekommen ihr `bereich`-Mapping.
- Regional-ready gemäß Spec 2026-04-17: optionale Felder so anlegen, dass `sichtbarInLaendern` später ohne Breaking Change ergänzbar ist (nur Typ-Design, keine Logik).
- `scripts/validate-produkte.ts` analog `validate-referenzen.ts`: Enum-Werte, Pflichtfelder, Slug-Eindeutigkeit, bereich-Konsistenz.
- `docs/website-migration/README.md`: Quellenverweis (Repo `sfleischmann-3steps2/KORODUR-website`, lokaler Clone `../KORODUR-website`), Bereichs-Mapping-Tabelle (alte URL-Struktur zu neuer Route), Migrationsstatus-Tracker je Bereich.

**Verifikation:** Build grün, beide Smoke-Tests grün, kein sichtbarer UI-Unterschied.

## 6. Stufe 1: IA-Umbau (PR 2 bis 4)

**PR 2 (Mockup, kein App-Code):** `docs/mockups/Website-IA-Mockup.html` mit drei Teilen: (a) Homepage mit Zielgruppen-Einstiegen (Planer / Verarbeiter / Handel) und Bereichs-Kacheln nach Template-Konzept aus `03_konzept/page_templates.md`, (b) Hauptnavigation (Top-Level: Produkte, Anwendungen, Referenzen, Unternehmen, Kontakt; Sanierung samt Lösungsfinder prominent als Einstieg), (c) Bereichsseiten-Template. Diskussionspunkte nummeriert im Footer. **Besprechung mit Steffi vor PR 3.**

**PR 3:** Navigation und Homepage gemäß freigegebenem Mockup. Sanierungs-Flows (Lösungsfinder, Anwendungsmatrix) bleiben unter ihren bestehenden Routen erreichbar.

**PR 4:** Bereichsseiten-Template und Routen `app/[lang]/bereiche/[slug]/` (statisch generiert aus `data/bereiche.ts`), zunächst mit dem Sanierungs-Bestand und Platzhaltern für die noch nicht migrierten Bereiche.

**Verifikation je PR:** Build, Smoke-Tests, Deploy-Stichprobe in allen 4 Sprachen, Mobile-Check.

## 7. Stufe 2: Content-Migration je Bereich (PR 5 bis 12)

Reihenfolge nach Größe und Überlapp, je Bereich derselbe Workflow:

1. Quelle vollständig lesen (`bereiche_<x>_details.md` + `produktuebersicht.md`)
2. Produktdaten strukturieren nach `data/produkte.ts`-Schema (DE), Texte überarbeiten: Wir-Form, CTAs, technische Daten als HTML-Tabelle (größter SEO-Hebel laut Audit), keine erfundenen Werte
3. Bereichsseite mit überarbeitetem Content füllen
4. `validate-produkte.ts` + `test-loesungsfinder.ts` grün, Build, PR, Merge, Live-Stichprobe

| PR | Bereich | Umfang (Quelle) |
|---|---|---|
| 5 | Industrieboden, Teil 1: NEODUR-Familie + Hartstoffe | ~25 von 44 Produkten, höchster Überlapp mit Bestand |
| 6 | Industrieboden, Teil 2: Bauchemie (KOROTAN, KOROTEX, KOROCLEAN, KOROPOX, ...) | ~19 Produkte |
| 7 | Sichtestrich (GRANIDUR, KCF, TRU) + Microtop (TW-Serie) | 6 + 8 Produkte |
| 8 | Spezialbaustoffe + Rapid Set + Schnellbetonsysteme + 3D Printing | 7 + 7 Produkte + 2 Bereichsseiten |
| 9 | Katzenstreu (goodcat) inkl. **eigenem Mockup zur optischen B2C-Abgrenzung** (eigene Farbwelt/Sub-Brand-Rahmen innerhalb der Site) | 3 Produkte, Mockup-Freigabe vor Umsetzung |
| 10 | Unternehmensseiten: Über uns, Geschichte, Nachhaltigkeit, Standorte, Kontakt | 5 Seiten aus `unternehmen_content.md` |
| 11 | Sprachpass EN (alle neuen Inhalte) | Alte EN-Site als Referenz, wo vorhanden |
| 12 | Sprachpässe FR + PL | FR-Altbestand als Referenz, PL komplett neu |

Anmerkung zu Rapid Set und 3D Printing: Inhalte werden voll integriert; was mit den externen Domains (korodur-rapidset.com, 3d-concrete-printing.com, goodcat.de) passiert, ist eine Cutover-Entscheidung in Stufe 5, nicht hier.

## 8. Stufe 3: Referenzen-Abgleich (PR 13)

Die ~130 Alt-Referenzen der Website sind NICHT im Scrape. Vorgehen:

1. Bestandsabgleich: Notion-Referenzverzeichnis (Reconciliation-Pipeline `match-app-notion.py` existiert) vs. App (52) vs. Alt-Site-Sitemap (`referenzen-sitemap.xml`, 396 URLs)
2. Delta-Liste: Was fehlt wo, was davon ist migrationswürdig (Qualität vor Vollständigkeit)
3. Gezielter Nachscrape der Lücken von der Live-Site, Import über bestehende Pipeline (`import-notion-referenzen.py`)

## 9. Stufe 4: Notion-CMS-Prozess (PR 14 + Notion-Arbeit)

Umsetzung des Handoff-Konzepts aus dem `KORODUR-website`-Branch (`notion_cms_konzept_session_handoff.md`):

- **Zwei DBs nach Ownership:** Produkt-Technik (Owner: Technik; Kennwerte, Normen, Verarbeitung) und Produkt-Marketing (Owner: Marketing/Vertrieb; Positionierung, Nutzen, Medien). Page-zentrisch, nicht property-zentrisch. Bestehende Notion-Produktdatenbank als Ausgangspunkt prüfen, nicht blind neu anlegen.
- **Sync-Richtung:** Notion ist Source of Truth, das Repo ist Build-Quelle. Skript `import-notion-produkte.py` analog zum Referenzen-Import: idempotent, erzeugt Diff in `data/produkte.ts`, niemals stiller Overwrite.
- **Trigger-Prozess (explizite Anforderung Steffi):** dokumentiert in `docs/reference/notion-sync-prozess.md`:
  1. Inhalt in Notion ändern (Technik- oder Marketing-DB)
  2. Sync auslösen: lokal per Skript oder GitHub Action mit `workflow_dispatch` (manueller Knopf, kein automatischer Webhook in Phase 1)
  3. Sync erzeugt Branch + PR mit dem Daten-Diff
  4. Mensch reviewt den Diff, merged
  5. Merge auf `main` deployt automatisch (bestehende Pipeline)
  
  Damit ist jederzeit nachvollziehbar: Eine Notion-Änderung wird erst live, wenn ein Mensch den PR merged. Kein Schreibzugriff zurück nach Notion ohne expliziten Auftrag (additive-only-Regel gilt).

## 10. Stufe 5: Cutover (separater Detailplan, wenn Stufe 2 weit genug ist)

- Hosting-Entscheidung (Favorit Cloudflare Pages, da Cloudflare im Unternehmen vorhanden; Vercel als Alternative), Custom Domain, basePath-Entfernung, SW-Cache-Strategie prüfen
- Redirect-Map für die 858 Alt-URLs als CSV, automatisiert getestet (Sitemaps der Alt-Site als Quelle)
- SEO-Technik: Hreflang im HTML-Head + Sitemap, `sitemap.xml`/`robots.txt`, H1 auf jeder Seite, Meta-Descriptions, OG-Images, Schema.org (Product, BreadcrumbList, Organization)
- Analytics auf der neuen Site ab Tag 1; Alt-Site-Baseline (läuft seit 2026-06-11) für die bereichsweise Umzugs-Reihenfolge nutzen
- Bereichsweiser 301-Umzug, WP erst abschalten, wenn leergeräumt

## 11. Risiken

| Risiko | Gegenmaßnahme |
|---|---|
| Scrape-Lücken führen zu erfundenen Werten | Harte Regel: leer lassen + offener Punkt. Validierungsskript prüft Pflichtfelder, der Rest ist explizit optional |
| Übersetzungsvolumen (75 Produkte × 3 Sprachen) unterschätzt | Sprachpässe als eigene PRs, DE-Go-Live nicht blockiert. Alt-Site EN/FR als Rohstoff |
| Bilder fehlen flächig | Platzhalter-Disziplin wie bei den 25 importierten Refs; Beschaffungsliste im Migrations-Tracker |
| Lösungsfinder-Regression durch Produktdaten-Wachstum | `bereich`-Feld trennt strikt; Smoke-Test 8/8 als Merge-Gate |
| App-Identität verwässert (Sales-Tool vs. Website) | Sanierung bleibt prominenter Einstieg mit eigenen Flows; Klärung im IA-Mockup (PR 2) |
| SW-Precache wächst/veraltet | Precache-Liste bei neuen Top-Routen pflegen, Cache-Name-Bump je Release-Welle |

## 12. Offene Punkte

1. Bild-Beschaffung: Wer liefert Produktbilder und Bereichs-Hero-Bilder (Live-Site-Download vs. SharePoint-Originale)?
2. Frank-Sign-offs aus dem Bestand (A2-Flag, `belastbarNach` HE 65/HE 40) laufen unabhängig weiter
3. Repo-Name und App-Titel ("Sanierungs-App" vs. "korodur.de"): Entscheidung spätestens in Stufe 5
4. Externe Domains (rapidset, 3d-printing, goodcat): Redirect oder Parallelbetrieb, Entscheidung Stufe 5

## 13. Arbeitsweise

Wie beim UI-Refactoring: Feature-Branch je PR, Workflow-Orchestrierung bei parallelisierbarer Content-Arbeit (disjunkte Dateigruppen je Bereich), jeder PR einzeln gemerged, deployt und live verifiziert. Commit-Regel gilt: Feature fertig heißt Commit + Push im selben Arbeitsschritt.

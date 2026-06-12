# Launch-Plan: korodur.de-Ablösung (Must-have / Nice-to-have)

**Stand:** 2026-06-12 | **Status:** Entwurf zur Besprechung | **Basis:** Multi-Agent-Audit (11 Agenten: Journeys, Content, Conversion, Technik, Live-Begehung, offene Punkte + Nachzüge DNS/Assets/Performance/Analytics)

---

## 1. Statusbild

**Kernaussage:** Die App ist inhaltlich launch-nah und dem Alt-Auftritt in Journey, Produktdarstellung und Mehrsprachigkeit klar überlegen. Was fehlt, ist fast vollständig die Cutover-Schicht (Stufe 5 des Integrationsplans): Rechtsseiten, Redirects, SEO-Technik, Formular-Backend, PDF-Hosting. Alle Blocker zusammen sind in ca. 5 bis 6 Arbeitstagen schaffbar.

**Stärken (das "Statement" trägt schon):**

- 77/77 Produkte in allen 4 Sprachen übersetzt, 76/77 mit technischen Daten als HTML. Der Migrations-Tracker ist hier veraltet (zeigt "teilweise/—"), der echte Stand ist besser.
- Lösungsfinder, Anwendungsmatrix, 52 filterbare Referenzen mit Produkt-Verknüpfung und PDF-Download: Alleinstellung, die die Alt-Site nie hatte (dort: CTA-Score 1/5, Daten nur als PDF).
- Mobile UX nachweislich funktionsfähig: Playwright-Tests auf 375/768/1440 px, Wizard end-to-end, 44-px-Touch-Targets, 0 Console-Errors, CLS 0,00 auf 5 von 6 Templates. Desktop-Performance 99–100, JS-Bundle unkritisch (238 KB gzip).
- Kontaktseite mit Formular (4 Zielgruppen-Funktionen), Zentrale und 6 Fachberatern mit Durchwahl und PLZ-Gebiet.

**Neue Fakten aus dem Audit (ändern die Planung):**

1. **Cutover ist einfacher als geplant:** Die Zone korodur.de liegt BEREITS bei Cloudflare (NS ziggy/hal.ns.cloudflare.com), Mail läuft entkoppelt über M365 (MX/SPF/DMARC sauber). Der Cutover ist ein Origin-Flip in der bestehenden Zone, kein Domain-Umzug. GitHub-Pages-Custom-Domain ist in der Zone schon erprobt (lp-live.korodur.de).
2. **Alt-Site-Assets sind jetzt gesichert:** Kompletter wp-content-Spiegel unter `../KORODUR-website/05_wp-content-archiv/` (2.155 Dateien, 920 PDFs: alle TDS/DoP/SDS/LV/Lieferprogramme, 1,0 GB) plus `inventar.csv` (Dokumenttyp, Sprache, Produkt, Quelle live/wayback). Damit sind TDS-Selfhosting und Download-Seite umsetzbar. ACHTUNG: liegt nur lokal und untracked, muss sofort redundant gesichert werden (Drive/SharePoint).
3. **Die "Analytics-Baseline" der Alt-Site ist nur eine Installation (GA4 seit 2026-06-11), keine Daten.** Dazu liefert der nicht geleerte WP-Page-Cache weiterhin HTML ohne GA4-Tag aus. Konsequenz: Launch-Schnitte werden plausibilitätsbasiert entschieden, kompensiert durch eine vollständige Redirect-Map; Review nach 4–6 Wochen echter Daten.
4. **Frank-Sign-offs sind laut Notion-To-do erteilt** (Belastungs-Tags, A2-Flip, DUROP), aber der A2-Flip ist im Code nicht ausgeführt (`loesungsfinderV25.ts` steht auf `"tags"`).
5. **Performance-Messung:** Referenz-Detailseiten bis 5,3 MB, mobile LCP 20,8 s (Bilder in Originalauflösung auf jedem Viewport). Bildoptimierung ist damit Launch-Pflicht, nicht Nice-to-have.

---

## 2. Must-have-Liste (Launch)

### 2a. Blocker (ohne das kein seriöser Cutover)

| # | Punkt | Aufwand | Beleg/Detail |
|---|---|---|---|
| B1 | **Alle Conversion-CTAs zeigen auf die Alt-Site.** Berater-CTAs in Lösungsfinder-Ergebnis, Produkt-, Referenz- und Matrix-Seiten (Matrix sogar auf nie existentes `/kontakt.html`), dazu "Auf korodur.de ansehen"-Band und WP-Such-Fallback. Fix: alles auf interne `/{lang}/kontakt/`, `lib/kontakt.ts` auflösen, CI-Gate "kein www.korodur.de in app/ und data/" | S | `lib/kontakt.ts`, `produkte/[id]/page.tsx:332`, `referenzen/[slug]/page.tsx:530`, `anwendungsmatrix/page.tsx:109` |
| B2 | **Interne Redaktionsnotiz live sichtbar** ("OFFEN – Alexander zu fragen" auf einer Referenzseite). Sofort fixen + Validator-Check auf Marker (OFFEN/TODO/zu klären) | S | `data/referenzen.ts`, `validate-referenzen.ts` erweitern |
| B3 | **Rechtsseiten fehlen:** Impressum/Datenschutz nur als Links auf die Alt-Domain; AGB und Hinweisgebersystem fehlen ganz. Eigene Routen anlegen, Datenschutz an neue Realität anpassen (Hosting, Formular, Analytics) | M | `lib/kontaktDaten.ts:40-41`, Footer |
| B4 | **TDS-/PDF-Hosting:** 13 tdsUrl + websiteUrl zeigen auf wp-content des sterbenden WP-Servers. Selfhosting aus dem Archiv (identische Dateinamen), dabei TDS-Abdeckung anheben: 48 weitere aktuelle DE-TDS liegen im Spiegel | M | `data/produkte.ts:150,198,…`, `inventar.csv` |
| B5 | **Formular-Backend:** mailto scheitert still (Webmail/Mobile ohne Mail-Client). Echter Versand (PHP-Endpoint beim Hoster Hetzner/Hostinger oder externer Formdienst; Turnstile bleibt möglich, Zone liegt bei Cloudflare), DSGVO-Hinweis am Formular, echtes `<form>`, Danke-Zustand | M | `KontaktFormular.tsx` (Tausch-Architektur vorbereitet) |
| B6 | **basePath an NODE_ENV gekoppelt:** Production-Build auf eigener Domain wäre kaputt. Auf Env-Var umstellen (`next.config.ts` + `lib/basePath.ts` aus derselben Quelle), Test-Build ohne basePath | S | `lib/basePath.ts`, `next.config.ts` |
| B7 | **Redirect-Map fehlt:** 855 Alt-URLs (204 Pages, 203 Produkte, 396 Referenzen) + wp-content-Pfade. Map als hosting-neutrale CSV pflegen, daraus `.htaccess` (Hetzner/Hostinger, Apache/LiteSpeed) generieren; `/ → /de/` serverseitig, automatisiert getestet. Grundlage liegt vor: `provenienz/alle-seiten-urls.txt` | M | Sitemaps 2026-01-03 gesichert |

### 2b. Must (vor Launch, sonst schädlich/peinlich)

**SEO-Paket** (zusammen ~1 Tag):
- `app/sitemap.ts` + `app/robots.ts` (funktionieren mit Static Export), Sitemap mit hreflang-Alternates
- canonical + hreflang über `metadataBase` + zentralen Helper in alle ~12 generateMetadata
- OG-Image (1200×630 aus Key Visual), Homepage-Title mit Markenname (fehlt aktuell in allen Sprachen)
- Eigene 404-Seite im CD (aktuell unbrandete Next.js-Default, nur Englisch)
- Referenzübersicht crawlbar machen (Karten ins statische HTML, Filter clientseitig obendrauf)

**Performance-Paket** (zusammen ~1 Tag, messbasiert):
- Referenzbilder: Batch auf max. 1600 px, WebP q≈75, Ziel <200 KB/Bild (heute bis 1,1 MB/Bild, LCP mobil 20,8 s); Galerie-Thumbnails mit srcset; erstes Bild nicht lazy
- Produkt-Packshots: 900×900-PNGs (370–426 KB) auf ~360×480 WebP; above-fold mit priority
- `manifest.json`: basePath fehlt → Icon-404 auf jeder Seite (basePath-abhängig fixen, nicht hart kodieren)

**i18n-Paket** (~1 Tag):
- Referenz-Detailseite: hartkodierte deutsche Überschriften/CTAs in die 4 Dictionaries (bricht heute die internationale Journey, Z3)
- EN-Homepage: Featured-Referenzen durch `localizeReferenzen()` schicken (Einzeiler)
- FR/PL-Sprachpässe für die 25 importierten Referenzen (SNCF Bordeaux priorisiert: FR-Markt)

**Inhalte:**
- Service-/Download-Seite mit mindestens DoP + SDS (BauPVO: DoP-Bereitstellung ist Compliance, nicht nur UX). Quelldokumente liegen klassifiziert im Archiv (92 DoP, 50 SDS)
- Internationale Ansprechpartner: mindestens Export-Kontakt-Block auf /kontakt (Claim "40 Länder" vs. nur deutsche PLZ-Gebiete)
- Referenz-Bilder: mindestens die Leuchtturm-Referenzen (Olympiastadion, Fraport, SNCF) ohne Platzhalter (heute 25/52 Platzhalter)
- Nav-Label "Anwendungen" schärfen (führt auf reine Sanierungs-Matrix, Erwartungsbruch)

**Betrieb/Cutover:**
- A2-Flag-Flip (Sign-off liegt vor, Einzeiler + Smoke-Test)
- Analytics neue Site: Cloudflare Web Analytics (cookieless, kein Consent-Banner nötig) ab Tag 1; Google Search Console einrichten (Frage: existiert ggf. eine Property bei der Agentur mit 16 Monaten Historie?)
- Alt-Site sofort: WP-Optimize- und Cloudflare-Cache purgen (GA4 zählt sonst fast nichts, 5-Minuten-Aktion)
- DNS-Zonen-Inventar aus dem Cloudflare-Dashboard (staging./vpn. ungeklärt) + Bot-Challenge-Regeln prüfen (blockt heute sogar die Sitemap; träfe nach Origin-Flip die neue Site)
- LP-Entscheidung lp-live.korodur.de (Weiterbetrieb mit Link-Fix / Redirect / Abschaltung) + Klärung, ob Kampagnen darauf laufen
- Archiv-Sicherung: `05_wp-content-archiv/` auf Drive/SharePoint kopieren, `inventar.csv` + `provenienz/` ins KORODUR-website-Repo
- Rollback-Pfad: WP-Origin übergangsweise als wp-old.korodur.de behalten; GitHub Pages nach Cutover auf korodur.de redirecten (SW-Scope); Service-Worker CACHE_NAME bumpen

---

## 3. Nice-to-have-Liste (Launch, wenn Zeit; sonst direkt danach)

| Punkt | Aufwand | Anmerkung |
|---|---|---|
| 3 Microtop-Trinkwasser-Referenzen (Bad Nauheim, Haidberg, Budapest): Bilder liegen schon im Repo, Texte aus LP/Alt-Site | M | Schließt die 0-Referenzen-Lücke des Bereichs mit eigenem Fachberater |
| Kontrast-Fix Cyan (3,0:1 auf allen Templates): dunklere Token-Variante ~#0077ab für Textlinks/kleine Labels | S | Seit V3.0 offene Entscheidung, als offizielle Firmenwebsite jetzt fällig |
| Lösungsfinder-Tiebreak D1 ("planbar" empfiehlt DOT Europe statt NEODUR HE 65) | S | Aushängeschild-Feature, fachlich schiefe Top-Empfehlung im Standardfall |
| Breadcrumb um Bereich erweitern + Referenz-Teaser auf Bereichsseiten | M | Schließt Schleife Bereich→Produkt→Referenz→Kontakt |
| Rapid-Set-Händlerhinweis auch auf Produktdetailseiten | S | Google-Direkteinstieg ist der Normalfall |
| Fachberater-Karten an Funnel-Enden (Produkt/Bereich/Lösungsfinder-Ergebnis je Zuständigkeit) | M | Stärkstes Conversion-Element im konservativen B2B; Porträt-Zuordnung offen |
| Telefonnummer in den Header | S | Klassisches B2B-Pattern |
| Karriere-Abschnitt auf /unternehmen + definierte Redirect-Ziele für News/Presse | S | Bewerber googeln "korodur karriere" |
| Mobile-Hero-Variante (828 px WebP) + CLS-Fix Anwendungsmatrix (Accordion defaultValue) | S | Bringt Home-LCP unter ~3 s |
| Schema.org (Organization, Product, BreadcrumbList) | M | Kann knapp nach Cutover |
| Homepage-Schluss-CTA verallgemeinern ("Sanierungslösung" → "Lösung für Ihr Projekt") | S | 4 Sprachen |

**Bewusst nach dem Launch (V2-Backlog):**
Zielgruppen-Leiste/-Einstiege (entschieden 2026-06-12: bleibt V2), Referenz-Import der ~78 restlichen Alt-Referenzen nach Team-Priorisierung (Redirects fangen die 396 Alt-URLs ab), Notion-CMS-Prozess (Stufe 4), Download-Center-Vollausbau (LV/Anwendungsempfehlungen/Lieferprogramm), Verbrauchsrechner, Verarbeitungsvideos, Neubau im Lösungsfinder, GAEB-Exporte, EPDs, Geschäftsführungs-/Team-Block, Referenz-Detail v3.

---

## 4. Meilensteine

| MS | Inhalt | Aufwand | Ergebnis |
|---|---|---|---|
| **M1: Sofort-Fixes** | B1 (CTAs intern + CI-Gate), B2 (Redaktionsnotiz), B6 (basePath), A2-Flip, Homepage-Title, Nav-Label, manifest.json, Packshots, Featured-Lokalisierung, Archiv-Sicherung, GA4-Cache-Purge (Steffi), GSC anlegen (Steffi) | ~1 Tag | Kein Lead-Leck mehr zur Alt-Site, A2 live |
| **M2: Technisches Fundament** | B3 (Rechtsseiten), SEO-Paket komplett, Performance-Paket (Bilder), Analytics neue Site | ~1,5–2 Tage | Site ist als offizielle Domain technisch vertretbar |
| **M3: Inhalte & Conversion** | B4 (TDS-Selfhosting + Abdeckung), B5 (Formular-Backend), Download-Seite DoP/SDS, i18n-Paket Referenzen, internationale Kontakte, Leuchtturm-Bilder; optional: Zielgruppen-Leiste, Microtop-Referenzen, Fachberater-Karten | ~2 Tage | Journeys enden intern, Dokumente vollständig |
| **M4: Cutover** | B7 (Redirect-Map + _redirects), DNS-Inventar + Origin-Flip, WAF-/Bot-Regeln, Sitemap in GSC einreichen, LP-Umstellung, Rollback-Pfad, SW-Bump, GitHub-Pages-Redirect | ~1 Tag + Beobachtung | korodur.de zeigt auf die neue Site |
| **M5: Nach Launch** | Team-Review über Live-Site (Klassen-Gegenprüfung, Frank als Schiedsrichter), Traffic-Review nach 4–6 Wochen (TDS-/Referenz-Priorisierung nachjustieren), V2-Backlog | laufend | Redaktionsprozess + datenbasierte Iteration |

M1–M3 sind parallelisierbar (disjunkte Dateigruppen), M4 strikt zuletzt. Summe bis Cutover: ca. 5–6 Arbeitstage.

---

## 5. Entscheidungen (Steffi/Team)

1. **Hosting (Steffi, 2026-06-12): noch offen, Kandidaten Hetzner oder Hostinger** (Cloudflare Pages raus). Beide tragen den Static Export; Zone/DNS bleibt bei Cloudflare. Konsequenz: Redirects via `.htaccess`, Formular via PHP-Endpoint oder Formdienst. Entscheidung spätestens zu M4.
2. **LPs lp-live.korodur.de (ENTSCHIEDEN Steffi, 2026-06-12):** Keine Kampagnen, LPs werden per 301 auf die neuen Bereichs-/Produktseiten redirected.
3. **Zielgruppen-Leiste V1 (ENTSCHIEDEN Steffi, 2026-06-12):** bleibt V2.
4. Externe Domains (korodur-rapidset.com, 3d-concrete-printing.com, goodcat.de): Redirect oder Parallelbetrieb.
5. Naming: Site-Titel, Repo-Name ("Sanierungs-App" vs. korodur.de).
6. AGB + Hinweisgebersystem: übernehmen oder bewusst entfallen lassen.
7. Kontrast-Variante (a: dunkleres Cyan für Text, b: akzeptieren und dokumentieren).

---

## 6. Audit-Artefakte

- Volles Audit-Ergebnis (11 Agenten, alle Findings mit Belegen): Workflow-Output `wpcxvmz4q`
- 42 Abnahme-Screenshots (6 Templates × 3 Viewports): `/tmp/korodur-audit/screens/`, Lighthouse-Rohdaten: `/tmp/korodur-audit/lighthouse/`
- wp-content-Archiv + Inventar: `../KORODUR-website/05_wp-content-archiv/` (UNGESICHERT, nur lokal)
- Tracker-Korrektur nötig: `docs/website-migration/README.md` (Sprachspalten veraltet)

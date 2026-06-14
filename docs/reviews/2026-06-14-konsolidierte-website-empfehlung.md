# Konsolidierte Website-Empfehlung: die Content-Schicht für den Relaunch

**Stand:** 2026-06-14
**Basis:** Drei Website-Analysen, abgeglichen mit dem echten Entwicklungsstand (Launch-Plan, Relaunch-Epics #72 bis #80, offene Issues, Code).

Quellen der Analysen:
1. Rollenbasierter Zielgruppen-Audit (Bauherren / Architekten-Planer / Verarbeiter-GU).
2. System-Audit der Alt-Site korodur.de (Informationsarchitektur, Conversion, Content-Tiefe).
3. System-Audit der neuen Site + claim-by-claim-Challenge des rollenbasierten Audits, live gegengeprüft.

Anschluss an: `docs/plans/2026-06-12-launch-plan-korodur-de.md`, `docs/plans/2026-06-11-website-integration-plan.md`, `docs/reviews/2026-06-13-website-walkthrough-feedback.md`.

---

## 1. Kernaussage (Status zuerst)

Die neue Site ist **strukturell und technisch launch-nah**. Drei Schichten sind in guter Hand:

- **System- und Cutover-Schicht** (Formular-Backend, Analytics, SEO/hreflang, 301-Redirect-Map, Rechtsseiten, TDS-Hosting, Performance): vollständig im Launch-Plan erfasst.
- **Struktur- und IA-Schicht** (Navigation, Bereichsseiten, Produkt-Klassifizierung, Referenzfilter, Design-System): durch die Relaunch-Epics #72 bis #80 abgedeckt.
- **Fachebene** (Produktdetailseiten mit Kennwerten, Normen, Verarbeitungsdaten, bidirektionalem Cross-Linking): bereits stark.

Der verbleibende Hebel, auf den **alle drei Analysen unabhängig konvergieren**, ist die **problemorientierte Content-Schicht**: der Einstieg über das Problem statt über das Produkt. Diese Schicht ist in den Analysen als Konzept präsent, aber noch nicht als Backlog operationalisiert (teils bewusst nach V2 verschoben). Sie ist die eigentliche Empfehlung dieses Dokuments.

Wichtig zur Einordnung: Die System-Audits beruhten teils auf einem externen Live-Crawl und haben dabei Lücken vermutet (Analytics, hreflang, Migration), die der Launch-Plan längst abdeckt. Diese Punkte sind hier korrigiert und stehen **nicht** auf der Maßnahmenliste (siehe Abschnitt 5).

---

## 2. Was bereits abgedeckt ist (bewusst nicht doppeln)

| Analyse-Befund | Abgedeckt durch |
|---|---|
| Conversion-Backend (mailto scheitert still) | Launch-Plan **B5** (M3) |
| Analytics / Messbarkeit | Cloudflare Web Analytics, cookieless (M2, `components/Analytics.tsx`) |
| SEO, hreflang, canonical, crawlbare Referenzübersicht | Launch-Plan **SEO-Paket** (M2, `app/sitemap.ts`, `lib/seo.ts`) |
| Domain-/301-Migration von korodur.de | Launch-Plan **B7** + **M4 Cutover** (855 Alt-URLs, Zone bei Cloudflare) |
| Rechtsseiten, TDS-/PDF-Hosting, Performance/Bilder | Launch-Plan **B3 / B4 / Performance-Paket** |
| Produkt-Dokumente sprachabhängig (TDS/SDS/DoP) + Inventar | #120, #121 |
| Referenz-Datenanreicherung (u. a. Baujahr) | #100, Epic #77 |
| Bereichsseiten: CTAs oben + Produktgruppen-Filter | #119, #83, #93 |
| Normen-Glossar / Normen verständlich machen | #97 |
| Kontakt sprachabhängig + Fachberater-Finder | #118, #90 (geschlossen), Epic #75 |
| Nav-Umbau (Bereiche-Linse, Produkte in Footer) | Epic #72, #81/#82 (geschlossen) |
| Neubau-Bereichsseite ausbauen | Epic #73, #85/#87 (geschlossen) |
| Anwendungsmatrix ehrlich labeln ("Anwendungen" schärfen) | Launch-Plan (Nav-Label, Must) |
| Rollen-/Zielgruppen-Einstiege (Planer/Verarbeiter) | **Bewusst V2** (Launch-Entscheidung 2026-06-12) |
| Katzenstreu (goodcat) in der Nav | **Bewusste Entscheidung**: bleibt drin, optisch abgegrenzt (Integrationsplan #1) |
| Verbrauchsrechner, Verarbeitungsvideos, Download-Center-Vollausbau, Neubau im Lösungsfinder | **V2-Backlog** (Launch-Plan) |

Fazit: Der Backlog ist gut. Wir bauen darauf auf, statt ihn zu wiederholen.

---

## 3. Der eigentliche Hebel: problemorientierte Content-Schicht

Heute führt die Site sehr gut von der Produktwelt zur Fachinfo. Was fehlt, ist der Einstieg für jemanden, der **ein Problem oder Projekt hat, aber noch keine Produktentscheidung** treffen kann. Dieser Pfad (Symptom zu Ursache zu Strategie zu Produkt zu Referenz) ist der intuitive Einstieg der Zielgruppe Bauherr/Betreiber und gleichzeitig der stärkste Vorqualifikations-Helfer für den Vertrieb.

Die gute Nachricht: Fast alle dafür nötigen Bausteine **existieren bereits** (Produktdaten, 58 Referenzen mit Ausgangslage/Lösung/Wirkung und Sperrzeit, Anwendungsmatrix, Tag-Standard). Wir kombinieren vorhandenen Fachstoff neu, wir erfinden kaum neuen.

---

## 4. Empfehlung nach Stufen (Content)

Effort-Definition: **niedrig** = vorhandenen Content wiederverwenden / Datenpflege / einfache statische Seite, kein Backend, kein Konzept. **mittel** = neue kuratierte Seite(n) oder Datenfeld, kein Backend. **hoch** = Konzept, Erhebung oder Backend nötig.

### V1 — Low Hanging Fruits (jetzt, hoher Impact, geringer Effort)

| Content-Piece | Impact | Effort | Status im Repo | Reviewer |
|---|---|---|---|---|
| Sperrzeit/Wiederinbetriebnahme als Versprechen auf dem Sanierung-Hub | hoch | niedrig | **neu** | Lasse Manns |
| Produktspezifische LV-Deeplinks statt generischem ausschreiben.de-Katalog-Link | hoch | niedrig | **neu** | Frank Sander |
| Schadensbild-Hub `/schadensbilder/` (5 Kacheln, schließt 404) | hoch | niedrig | **neu** | Frank Sander |
| Handlungsempfehlung + Beratungs-CTA am Lösungsfinder-Ende | hoch | niedrig | teils #103 | Frank Sander / Hubert Scheinost |
| Sperrzeit-/Belastbarkeits-Übersicht je Kernprodukt | hoch | niedrig | **neu** | Frank Sander |
| Wirtschaftlichkeit/TCO-Seite `/wirtschaftlichkeit/` (ohne Rechner) | mittel | niedrig | **neu** | Frank Sander |
| Betreiber-FAQ `/faq/` (Sanierungssegment) | mittel | niedrig | **neu** | Frank Sander |
| Beratungstrigger-Modul "Wann ist Beratung sinnvoll" | mittel | niedrig | **neu** | Hubert Scheinost |
| Standorte auf `/unternehmen/` vervollständigen (2 zu 4) | mittel | niedrig | **neu** | Stefanie Fleischmann |
| Baujahr je Referenz aus dem Harvest übernehmen | mittel | niedrig | #100 | Lasse Manns |

### V1.5 — Content-Kuratierung (jetzt machbar, mittlerer Effort, kein Backend)

| Content-Piece | Impact | Effort | Status im Repo | Reviewer |
|---|---|---|---|---|
| 5 Schadensbild-Detailseiten (Ursache, Strategie, Produkt, Referenz) | hoch | mittel | **neu** | Frank Sander |
| Neubau-Hub um Entscheidungs-Content (TCO, Belastung, Systemwahl) ergänzen | hoch | mittel | teils Epic #73 | Lasse Manns / Frank Sander |
| "Lösungen nach Branche" (Logistik, Lebensmittel, Parkdeck, Verkehr) | mittel | mittel | **neu** | Frank Sander |
| Normen in Planungslogik übersetzen (über das Glossar #97 hinaus) | mittel | mittel | erweitert #97 | Frank Sander |
| Systemaufbau-Blöcke/-Grafiken je Kernsystem | mittel | mittel | teils Epic #79 | Lasse Manns |
| Verbrauch kg/m² + Gebindegröße je Produkt (statisches Feld, kein Rechner) | hoch | mittel | **neu** (Daten erst aus PDB-Bereinigung) | Frank Sander |

### V2 — Weiterentwicklung (Konzept/Erhebung nötig oder bewusst geparkt)

- Rollen-Hubs "Planen mit KORODUR" / "Verarbeiten mit KORODUR" (bewusste V2-Entscheidung, brauchen rollen-spezifischen Content)
- Ablaufpläne je Kernsystem (Schritt für Schritt) — redaktionelle Konsolidierung
- Risiken/Fehlerbilder je Produkt — net-new Erfahrungswissen (Frank/Lasse), nicht im Bestand
- Ausführende Fachfirma je Referenz — braucht Freigabe je Case
- Sperrzeit-Filter auf der Referenzübersicht — Sperrzeit ist erst bei 45 von 148 Referenzen als Freitext erfasst, muss normalisiert werden
- Verbrauchsrechner, Verarbeitungsvideos, Download-Center-Vollausbau, Neubau im Lösungsfinder (bereits Launch-Plan-V2-Backlog)

---

## 5. Korrektur an den Live-Crawl-Analysen (Transparenz)

Folgende in den System-Audits vermuteten Lücken sind im Code/Launch-Plan **bereits gelöst** und gehören **nicht** auf die Maßnahmenliste:

- "Kein Analytics" — falsch, Cloudflare Web Analytics ist scaffolded (M2).
- "Kein hreflang / nicht crawlbar" — falsch, SEO-Paket inkl. hreflang ist umgesetzt (M2).
- "Kein Migrationsplan" — falsch, Launch-Plan B7/M4 mit 855-URL-Redirect-Map.
- "DE-only" — falsch, EN/FR (und in Arbeit ES) sind vollständige Sprachbäume.

Bestätigt geblieben sind: mailto-Formular ohne Lead-Capture (Launch-Plan B5, `KontaktFormular.tsx:56`), und der fehlende **Produktfilter auf der Referenzübersicht** (der `?produkt=`-Deeplink ist im Code angelegt, eine sichtbare Filter-Steuerung fehlt aber, Browser-Check Steffi 2026-06-14).

---

## 6. Genuin neue Punkte, die als Issue aufgenommen werden sollten

Diese Content-Stücke sind weder als Issue noch im Launch-Plan (Must/Nice/V2) erfasst:

1. Schadensbild-Hub + 5 Schadensbild-Detailseiten
2. Sperrzeit als sichtbares Versprechen (Sanierung-Hub) + Sperrzeit-/Belastbarkeits-Übersicht je Produkt
3. Wirtschaftlichkeit/TCO-Content-Seite
4. Betreiber-FAQ
5. "Lösungen nach Branche"
6. Produktspezifische LV-Deeplinks
7. Beratungstrigger-Modul "Wann ist Beratung sinnvoll"
8. Standorte 2 zu 4 auf `/unternehmen/`

---

## 7. Top-20-Content-Pieces (zur fachlichen Prüfung)

Diese Liste ist die operative Content-Backlog-Grundlage. Sie wird zusätzlich auf der Notion-Projektseite Sanierungsapplikation gepflegt, damit die Kollegen sie fachlich prüfen oder piece by piece abarbeiten können. Spalte *Status*: `exists` (nur sichtbar machen), `reuse` (Bestand neu kombinieren), `net-new` (neu schreiben).

| # | Content-Piece | Zielgruppe | Ebene | Impact | Effort | Status | Quelle (Rohstoff) | Reviewer | Stufe |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Sperrzeit-Block auf Sanierung-Hub | Bauherr | Entscheidung | hoch | niedrig | exists | Anwendungsmatrix + Verarbeitungsdaten | Lasse Manns | V1 |
| 2 | Produktspezifische LV-Deeplinks (78 Produkte) | Planer | Fach | hoch | niedrig | reuse | LV DE+EN (ausschreiben.de) + Notion-PDB | Frank Sander | V1 |
| 3 | DoP + LV im Dokumentblock je Produkt bündeln | Planer/Verarbeiter | Fach | hoch | niedrig | reuse | Dok-Inventar #120/#121 | Frank Sander | V1 |
| 4 | Schadensbild-Hub `/schadensbilder/` (5 Kacheln) | Bauherr | Orientierung | hoch | niedrig | net-new | Tag-Standard + Referenzen | Frank Sander | V1 |
| 5 | Handlungsempfehlung + Beratungs-CTA am Lösungsfinder-Ende | Bauherr | Conversion | hoch | niedrig | reuse | Finder (läuft) + Produkt-/Referenzdaten | Frank Sander / Hubert Scheinost | V1 |
| 6 | Sperrzeit-/Belastbarkeits-Übersicht je Produkt | Verarbeiter | Conversion | hoch | niedrig | reuse | Anwendungsmatrix + Verarbeitungsdaten | Frank Sander | V1 |
| 7 | Standorte vervollständigen (2 zu 4) | Alle | Orientierung | mittel | niedrig | exists | KORODUR-Stammdaten | Stefanie Fleischmann | V1 |
| 8 | Wirtschaftlichkeit/TCO-Seite `/wirtschaftlichkeit/` | Bauherr | Entscheidung | mittel | niedrig | reuse | TCO-Absatz `/unternehmen/` + green-CO2 | Frank Sander | V1 |
| 9 | Betreiber-FAQ `/faq/` | Bauherr | Fach | mittel | niedrig | reuse | Sperrzeitdaten + Referenzen + Tag-Standard | Frank Sander | V1 |
| 10 | Beratungstrigger-Modul "Wann ist Beratung sinnvoll" | Bauherr | Conversion | mittel | niedrig | net-new | Kontaktrouting + Beratungslogik | Hubert Scheinost | V1 |
| 11 | Anwendungsmatrix ehrlich labeln + erweitern | Planer | Fach | mittel | niedrig | reuse | Matrix-Daten + Verarbeitungsdaten | Frank Sander | V1 |
| 12 | Baujahr je Referenz übernehmen (Harvest zu Live) | Bauherr/Verarbeiter | Conversion | mittel | niedrig | reuse | Referenz-Harvest (#100) | Lasse Manns | V1 |
| 13 | Verbrauch kg/m² + Gebindegröße je Produkt | Verarbeiter | Conversion | hoch | mittel | reuse | Notion-PDB + TDS (erst PDB bereinigen) | Frank Sander | V1.5 |
| 14 | 5 Schadensbild-Detailseiten | Bauherr | Fach | hoch | mittel | reuse | Produktseiten + 58 Referenzen + Tag-Standard | Frank Sander | V1.5 |
| 15 | Neubau-Hub um TCO/Belastung/Systemwahl ergänzen | Bauherr/Planer | Entscheidung | hoch | mittel | reuse | `/unternehmen/`-TCO + Matrix | Lasse Manns / Frank Sander | V1.5 |
| 16 | "Lösungen nach Branche" | Bauherr/Planer | Orientierung | mittel | mittel | reuse | Referenz-Anwendungsbereich-Tags + Produkte | Frank Sander | V1.5 |
| 17 | Normen in Planungslogik übersetzen (über #97 hinaus) | Planer | Fach | mittel | mittel | reuse | Normangaben + LV + FR-Normen-Mapping | Frank Sander | V1.5 |
| 18 | Systemaufbau-Blöcke/-Grafiken je Kernsystem | Planer/Verarbeiter | Fach | mittel | mittel | reuse + Grafik | Systemaufbau-Abschnitt Produktseiten | Lasse Manns | V1.5 |
| 19 | Ablaufpläne je Kernsystem (Schritt für Schritt) | Verarbeiter | Fach | mittel | hoch | net-new | Verarbeitungshinweise (fragmentiert) | Frank Sander | V2 |
| 20 | Risiken/Fehlerbilder je Kernprodukt | Verarbeiter | Fach | mittel | hoch | net-new | Erfahrungswissen (nicht im Bestand) | Frank Sander | V2 |

---

## 8. Empfohlene nächste Schritte

1. Die V1-Liste (Abschnitt 4) mit dem Team gegen den laufenden Relaunch-Sprint priorisieren.
2. Die acht genuin neuen Punkte (Abschnitt 6) als Issues anlegen und den Epics zuordnen (Schadensbild und FAQ ggf. als neuer Epic "Problemorientierter Content").
3. Top-20 auf der Notion-Projektseite mit Reviewer-Spalte zur fachlichen Prüfung pflegen.

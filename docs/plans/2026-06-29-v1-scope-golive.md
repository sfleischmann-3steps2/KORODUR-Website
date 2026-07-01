# V1-Scope Golive — Must / Nice / Cut

**Datum:** 2026-06-29 · **Ziel:** Golive in ~4 Wochen, höhere Qualität als heutige korodur.de, Notion als Review-/Abnahme-Tool nutzbar.
**Grundlage:** Code-Audit + adversarische Konzeptprüfung (Workflow `v1-scope-grounding`, 6 Agenten gegen den echten Code). Architektur: [[notion-cms-a-vor-b-strategie]] (A vor Golive, B danach).

---

## 0. Gelockte Entscheidungen (Steffi, 2026-06-29)

1. **Sprachen Golive: DE + EN.** FR additiv kurz danach (sobald Native-Kapazität). PL/ES Post-Launch.
2. **Strukturierte Kennwert-Tabelle: Post-Launch.** V1 zeigt die bestehende label/wert-Liste on-page (Claim „Kennwerte on-page" hält); typisierter Vergleich (Sika/MC-Niveau) = erste Post-Launch-Welle.
3. **AI-Gegenprüf-Vorfilter: Post-Launch.** V1-Abnahme rein manuell mit eng geschnittenem Scope (Wahrheitsquelle heute zu dünn für ein verlässliches AI-Gate).

Leitlinie: schlanke V1, Kraft in Content + Abnahme statt in Plumbing.

---

## 1. Grundwahrheit (was die Audits gegen den Code ergeben haben)

**Drei Korrekturen am bisherigen Bild:**
1. **67 Produkte, nicht 71.** `data/produkte.ts` hat 67 Objekte; CLAUDE.md sagt 71, Freigabe-Doc 78, Kern-Produktdaten 84. Vier widersprüchliche Zahlen — vor V1-Kommunikation auf eine kanonische Liste ziehen.
2. **Bereiche sind NICHT nur dünne UI-Strings (Konzept §2 stimmt so nicht).** Rapid Set ist echter Langform-Content **im Code** (`data/rapidSetContent.ts` 206 Z. + `components/RapidSetBereich.tsx` 477 Z.), nur DE. Im 3-DB-Modell hat dieser Content kein Zuhause. Microtop (590-Z.-Intro + autoritative LP) und Katzenstreu (Private-Label-Blöcke) sind ebenfalls mehr als Intros.
3. **§4 „saubere Prosa-vs-Kennwerte-Trennung" ist Fiktion.** Das Datenmodell ist flach (Prosa + Lösungsfinder-Taxonomie gemischt). Die REALE Übersetzungs-Whitelist übersetzt heute `technischeDaten` **inkl. Kennwerte** („≥ 60 N/mm²", Q-Klassen) — und übersetzt `ausgangssituation/ergebnis/langzeit/nachhaltigkeit` **gar nicht**. Die CMS-Whitelist muss gegen die echten Override-Typsignaturen definiert werden, nicht gegen die §4-Liste — sonst Datenverlust oder editierbare Taxonomie.

**Harte Ist-Zahlen:**
| | Stand |
|---|---|
| Produkte | 67 · beschreibung 55/67 (12 ohne) · besonderheiten 64/67 · einsatzbereiche 66/67 · **verarbeitung nur 4/67** |
| Referenzen | 132 · releaseStatus gesetzt nur 78/132 (77 öffentlich, 1 anonym, **54 ohne Feld**) · Enum „intern/freigabe-offen" existiert real **nicht** |
| Übersetzung Refs | EN 131/132 · FR 123/132 · **PL 55/132 · ES 55/132 (~42 %)** |
| Übersetzung Produkte | EN/FR/PL/ES je 65/67 · Prosa je 53/67 |
| Fachartikel (MDX) | 24 (11 Artikel, 7 Branchen, 6 Schadensbilder) · **alle „entwurf", alle nur DE, alle durch Content-Gate `NUR_FREIGEGEBENE_ARTIKEL=true` im Build unsichtbar** |
| Rechtstexte | 4 (Impressum/Datenschutz/AGB/Hinweisgeber) · vorhanden + aktuell · **alle DE-only** |
| Bereiche | 1/7 verkaufsfertig (Rapid Set, DE-only) · 6/7 generisch montiert |
| Abnahme-Status | **0 % abgenommen** (Freigabe-Tracker veraltet, listet abgelösten Bereich) |
| Phase-4-Sync-Engine | **0 % gebaut** (kein feldweiser Prosa-Merge, kein i18n-Writer, kein Live-Notion-Reader, kein MDX-Serializer) |

---

## 2. Architektur-Entscheidung (bestätigt)

**Notion = Review-/Abnahme-Oberfläche für V1. Website shippt weiter aus Code. Volle Automatik (B) nach Golive.**

Der Kollegen-Review-in-Notion braucht nur drei machbare Dinge:
- (a) Einweg-Import Code→Notion (Phase 1),
- (b) Review-/Status-Workflow in Notion (reine Notion-Config + menschlicher Prozess, kein Code),
- (c) **ein** kontrollierter Rück-Port Notion→Code für den eingefrorenen V1-Textstand (Delta-Apply, nur Prosa-Whitelist, als PR-Diff, `validate-*.ts` als Guard).

Der volle SoT-Sync (Live-Reader, stehender feldweiser Merge, i18n-Writer, MDX-Serializer, getriggerte Action) ist genau der Teil, der die 4 Wochen sprengt und das höchste Still-Korruptions-Risiko trägt (Merge kann Lösungsfinder-Taxonomie zerstören). Bewusst nach Golive, in Ruhe gebaut, dann gegen den A-Freigabestand validiert (Reconciliation-as-Oracle).

---

## 3. V1-Scope: MUST

> Golive-kritisch. Ohne diese Punkte ist V1 nicht „besser als korodur.de" oder nicht rechtssicher.

**Bereiche (auf „gute V1" heben):**
- Rapid Set: Technik-Sign-off der `faktencheck:true`-Werte (CO2 −30 %, 4× Lebensdauer) — UWG/Produkthaftung. *(S, Technik)*
- Microtop: dedizierte Rich-Komponente aus vorhandener LP-Quelle (Arbeitsschritte, DVGW-Zulassungen, Referenz-Story) — größter Quick-Win, RapidSetBereich.tsx als Muster. *(M)*
- Infrastruktur: Hero-Bild + 2-3 editorische Sektionen *(M, Bildmaterial)*
- Industrieboden: editoriale Neubau-/Sanierungs-Abschnitte + Platzhalter „klassifizierung_folgt" raus *(M)*
- Spezialmörtel: Intro ausbauen + Verarbeitungstexte je Gruppe *(S)*
- Katzenstreu: Produktentscheidung (Karten füllen ODER produktlose Positionierung begründen) *(S, Entscheidung Steffi)*
- 3D-Betondruck: ehrliche „In Vorbereitung", aus prominenter V1-Verlinkung nehmen *(S)*

**PDP:**
- Fachberater-CTA in den Header (Ziel „oben + unten", Daten vorhanden, reine UI) *(S)*

**Content-Lücken:**
- 12 fehlende Produkt-Beschreibungen schreiben (betrifft Kernprodukte: neodur-he-Serie, korocrete) *(M, Redaktion + Technik)*
- besonderheiten (3) + einsatzbereiche (1) Restlücken schließen *(S)*
- Produktzahl-Drift bereinigen (67 als Wahrheit festlegen) *(S)*

**Notion-CMS (A):**
- Phase 0: 3 DBs (Produkt/Referenz/Redaktionell) + Templates + Status/Prüf-Modus-Properties *(M)*
- Phase 1: Import-Skript Code→Notion, NUR Produkte + Referenzen-Prosa (MDX ausgeklammert) *(L, net-new)*
- Einmaliger Notion→Code Korrektur-Apply (Delta, nur Prosa) *(M)*

**Abnahme (DER Engpass):**
- DE-Abnahme-Loop für golive-Scope (Produkte, Hero-Referenzen, Bereiche) *(L — menschliche Kapazität)*
- EN-Übersetzungs-Review Kern durch Muttersprachler *(M)*
- Rechtstexte DE: juristische Abnahme — **Woche 1 anstoßen** (externes Terminrisiko) *(M, Recht/GF)*
- releaseStatus-Triage: 54 Refs klassifizieren + Enum „intern/freigabe-offen" ergänzen — Vertraulichkeits-Gate vor öffentlichem Cutover *(M, Vertrieb)*
- Content-Gate geschlossen halten, Hub-Index als „Inhalte folgen" *(S)*

---

## 4. V1-Scope: NICE

> Wertvoll, nicht golive-blockierend. Erste Post-Launch-Welle oder „falls Kapazität".

- PDP: **strukturierte Kennwert-Tabelle** (druckfestigkeit/norm rendern + flächig befüllen) — der echte Differenzierer ggü. Sika/MC, aber Datenarbeit über 67 Produkte. Die bestehende label/wert-Liste trägt V1. *(L)*
- PDP: Cross-Sell-/Verwandte-Produkte-Block (aus produktgruppe/zusatzBereiche ableitbar) *(M)*
- PDP: Normen prominenter platzieren *(S)* · id-basierte Referenz-Verknüpfung statt Namens-Match *(S)*
- Content: Verarbeitungshinweise fürs Kernsortiment (heute 4/67) *(M)*
- Industrieboden: echte Produkt-Projektart-Klassifizierung (#83/#240/#103) *(L, Frank/RV)*
- AI-Gegenprüf-Vorfilter: V1 nur 1 Strecke (Produkt-Text ↔ Master) als Review-Beschleuniger *(L)*
- FR-Übersetzungs-Review Kern *(M)*

---

## 5. V1-Scope: CUT (bewusst nach Golive, mit Plan)

- Phase-4-Vollautomation (GH-Action, feldweiser Merge, i18n-Writer, MDX-Serializer) *(XL, 0 % gebaut, höchstes Risiko)*
- Volle 3-Strecken-AI-Pipeline
- PDP: System-/Aufbau-Tabelle (stärkster Differenzierer, aber neue Datenstruktur + Kuratierung) *(L)*
- PDP: EPD-Dokumenttyp + EPD-Beschaffung (0 EPDs existieren) *(M)*
- PDP: Gebinde-/Körnungs-Selektor (keine Gebindedaten im Modell) *(M)*
- 24 MDX-Fachartikel (Entwurf + DE-only + Gate) — fachliche Freigabe + i18n + MDX-Round-Trip sprengen 4 Wochen
- **PL/ES** (nur 55/132 Refs — halbe Mehrsprachigkeit ist schlechter als sauberer DE-Fallback)
- Lokalisierte Rechtstexte EN/FR (Landespartner-Prüfung; DACH-Sitz erlaubt i.d.R. DE-Rechtstexte auch auf /en//fr/)

---

## 6. Sprachen

**Empfehlung: DE + EN zum Golive. FR additiv kurz danach (falls Native-Kapazität frei). PL/ES klar Post-Launch.**

Begründung: EN ist datenseitig fast komplett (131/132 Refs, 65/67 Produkte) → mit Native-Review ein sauberes Qualitätsgate. FR-Daten gut (123/132), aber zusätzliche Review-Kapazität. PL/ES nur ~42 % — der DE-Fallback ist sauberer als halbe Übersetzung. Die DE-Fallback-Architektur (`getLocalized.ts`) macht „Sprache fehlt" zu einem gültigen, schmerzfreien Zustand.

---

## 7. Phasenbild (4 Wochen)

- **Woche 1:** Notion Phase 0 (Schema) + Import-Skript Phase 1 parallel zum Content-Sprint (12 Beschreibungen, Restlücken, Drift, releaseStatus-Triage). PDP-Fachberater-CTA. **Rechtstext-Abnahme + Rapid-Set-Faktencheck SOFORT anstoßen** (längster Vorlauf).
- **Woche 2:** Bereichs-Politur (Microtop-Rich, Infrastruktur, Spezialmörtel/Industrieboden-Prosa, Katzenstreu/3D). Import fertig → DE-Abnahme-Loop startet in Notion.
- **Woche 3:** DE-Abnahme auf voller Fahrt (Engpass-Woche), parallel EN-Native-Review, releaseStatus-Gate abschließen.
- **Woche 4:** Korrekturen einmalig Notion→Code zurückspielen, EN + Rechtstexte final, Regression/Build, Cutover.

---

## 8. Offene Entscheidungen (nur Steffi/Team)

*(Sprachen / Kennwert-Tabelle / AI-Vorfilter → in §0 entschieden.)*

1. **Review-Kapazität verbindlich blocken** — Frank/Richard (Technik), Recht/GF, EN-Native. **Der eine Golive-Faktor.** Ohne reservierte Slots rutscht der Termin unabhängig vom Code-Tempo. Sofort anstoßen.
2. **Juristische Freigabe-Instanz** Rechtstexte: intern GF oder extern? Längster Vorlauf → Woche 1.
3. **Katzenstreu:** Produkte füllen oder produktlose Private-Label-Positionierung. *(Empfehlung: produktlose Positionierung — Bausteine existieren, schneller, ehrlicher.)*
4. **Rich-Bereiche im Review:** Rapid Set/Microtop für V1 als Code lassen und separat (leichter Track) reviewen, statt in die 3 DBs zu zwingen. *(Empfehlung: ja — 4. Content-Typ erst mit B.)*

---

## 9. Konzept-Korrekturen (→ `notion-cms-konzept.md`)

- §2/§3: Vierter Content-Typ „Rich-Bereich" nötig (Rapid Set/Microtop sind Langform), ODER bewusste Entscheidung, Rich-Bereiche für V1 als Code zu lassen und außerhalb der 3 DBs separat zu reviewen.
- §4: Prosa-Whitelist gegen die REALEN Override-Typsignaturen definieren, nicht gegen die §4-Liste. Klären: gehört `technischeDaten` ins CMS oder ins Master? Sollen `ausgangssituation/ergebnis/langzeit` künftig übersetzt werden (Scope-Delta)?
- §9: MDX-Round-Trip ist schon heute kaputt (1 Schadensbild mit echtem JSX, kein MDX-Compiler) — Ziel-Body-Syntax vor dem Serializer klären.
- §10: MVP-Sprachen auf DE+EN ziehen (FR additiv), nicht DE/EN/FR fix.
- §12: „84 Produkte" als DB1-Relations-Anker gegen reale 67 prüfen.

---

## 10. Reuse-Strategie Alt-Content (kalibriert, Audit 2026-06-29)

**Grundsatz Steffi:** Was 1:1 von der alten korodur.de kommt, ist live → faktisch abgenommen → kein neuer Abnahme-Aufwand. Richtig — aber kalibriert:

**Verfügbarkeit:** Kompletter DE-Prosa-Bestand der Alt-Seite liegt lokal vor (`docs/content-quellen/scrape-extrakt/` 13 CLEAN-MDs + `archive/.../scraped_content/` Roh-Dump + Broschüre 2023 + `docs/website-migration/`). 8/8 Bereichs-Hauptseiten vorhanden. Kein externer Zugriff nötig.

**Wo 1:1-Reuse-ohne-Abnahme gilt (der Hebel):**
- **Bereichs-Hauptseiten-Marketingprosa, verbatim, DE** — landet exakt auf der größten Lücke (6/7 Bereiche dünn) und auf dem A-Track (Prosa), wo „live = abgenommen" belastbar ist.

**Wo es NICHT gilt (Grenzen):**
- **Produktclaims/Kennwerte → B-Daten-Track**, nicht Reuse. Alt-Seite hat **81 dokumentierte Widersprüche** + Original-Fehler; autoritativ bleiben TDS/Notion/`produkte.ts`.
- **Stale-Risiko bestätigt:** eingestellte Produkte (KOROPOX, AM Super/Plus, MICROTOP TW NSD, KOROTAN-**Additiv**) stehen noch im Alt-Scrape — nicht mit-liften. *(System KORODUR-KOROTAN bleibt.)*
- **Produktdaten:** autoritative Quelle bleibt **TDS** (nicht Alt-Seite) — bestätigt Steffi 2026-06-29. Reuse berührt Produktclaims/Kennwerte nicht.

**Sprachen-Korrektur (Steffi 2026-06-29):** Alt-Seite existiert in **DE, EN, FR** (teils mit Fallback), **nicht** DE-only — der lokale Scrape hat nur DE erfasst. Konsequenz: Die **EN/FR-Bereichs-Marketingprosa ist ebenfalls live = abgenommen = reusable** — aber **nicht im lokalen Archiv**. → Task: EN/FR-Bereichsseiten aus der Live-Alt-Seite/Wayback extrahieren + Abdeckung prüfen (wegen „teils Fallback"). Stärkt EN, macht FR für die Bereichs-Ebene machbarer (Produkt-/Referenz-Übersetzungen bleiben eigener Review-Gate). PL/ES weiter ohne Alt-Hebel.
- Neue Bereiche **ohne Alt-Zwilling:** Infrastruktur (ersetzt Schnellbetonsysteme, nur Fragmente), 3D-Druck (kein verwertbarer Alt-Content), Spezialmörtel (Hauptseite ja, Produktdetails nur Boilerplate). Diese brauchen neuen Content + Abnahme.
- **Reifegrad (aus `docs/content-quellen/konzept/`, 135 Pieces):** ~40 % „bauen-bereit" — aber das heißt *Substanz da*, **nicht** *1:1 kopierbar*. Echte Verbatim-Quote kleiner, konzentriert auf Marketingprosa.

**Governance-Regel (FREIGEGEBEN Steffi 2026-06-29):** Verbatim-geliftete Bereichs-Marketingprosa (DE, sowie EN/FR sobald extrahiert) shippt **ohne neue Abnahme** — sie reitet auf der Live-Freigabe der Alt-Seite. Sobald Produktclaims/Kennwerte berührt sind → Technik-/TDS-Track mit Abnahme. Damit fällt die Bereichs-Abnahme als Engpass praktisch weg. (Relaxt #346 gezielt für unveränderte Marketingprosa.)

---

## 11. Entwicklungs-fertig (BUILD-Achse) — was noch gebaut werden muss

> Getrennt vom Content. „Dev-fertig" = Seiten-Typen gebaut/optimiert, unabhängig vom Text.

**PDP (größtes Bau-Item, heute rudimentär):**
- Fachberater-CTA in den Header *(S)*
- **Varianten als eigene Seite je Variante** (BESTÄTIGT 29.06., wie alte korodur.de) — strukturell: Routing + Template je Variante statt Vergleichstabelle *(M–L)*
- Alle Lösungs-/Referenz-Produkte id-basiert verlinken statt Namens-Match *(S)*
- Cross-Sell-Block *(M, optional V1)*
- *Kein V1-Bau:* strukturierte Kennwert-Tabelle (Post-Launch, label/wert-Liste trägt)

**Bereiche (zentrales Bau-Item für Reuse):**
- **Generalisiertes Rich-Bereich-Modell + Komponente (datengetrieben)** *(M–L)* — der Vessel, um die 8 vorhandenen Alt-Bereichsproses in *jeden* Bereich zu gießen (heute nur Rapid Set hartverdrahtet). Ohne das kein skalierbarer Reuse.
- Infrastruktur: Hero-Bild *(Asset)* + neuer Content *(kein Alt-Zwilling)*
- 3D: ehrlicher „in Vorbereitung"-Zustand *(S)*

**Referenz-Seiten (fast dev-fertig — Audit-Ergebnis):**
- Bauherr/Auftragnehmer + Bereich in den scanbaren Eckdaten-Block heben *(S–M)*
- Alle Lösungs-Produkte inline verlinken statt nur das erste *(S)*
- Optional: echtes Projektbericht-PDF-Feld statt Auto-Generat *(M)*
- *Bereits live:* Neubau/Sanierung-Filter, Galerie/Lightbox, Produkt→PDP-Verlinkung, 5-Sprachen, Freigabe-Gate. Optional offen: Freitext-Suche auf der Übersicht *(S–M)*

**Notion-CMS (A-Track, parallel):**
- 3 DBs + Templates + Status/Prüf-Modus *(M)* · Import Code→Notion *(L)* · einmaliger Rück-Port *(M)*

**Dev-fertig-Fazit:** Referenz-Seiten ~fertig (nur Feinschliff). Schwerpunkte sind **PDP** (Varianten-Restrukturierung + CTA) und das **generalisierte Rich-Bereich-Modell**. Beides zusammen mit dem Notion-A-Track ist der reale Bau-Scope — der Rest ist Content (großteils Reuse) + Abnahme.

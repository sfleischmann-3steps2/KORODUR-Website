# Persona-UX-Review Live-Site (2026-07-01)

**Methode:** 4 unabhängige Persona-Walkthroughs auf der Live-Site (https://sfleischmann-3steps2.github.io/KORODUR-Website/de/), je 6–10 Seiten, Fokus Struktur/Usability/Gesamtklarheit (kein visuelles Design — Markdown-Fetch). Anlass: V1-Scope-Abstimmung GF 02.07.

**Personas:** (1) Architekt/Planer Neubau · (2) Fachplaner/Sachverständiger Sanierung (Lebensmittelbetrieb + TW-Behälter) · (3) Baustoff-Fachhändler DACH · (4) internationaler Private-Label-Einkäufer Katzenstreu.

---

## Gesamturteil

Substanz gut bis sehr gut — das Problem sitzt in den ersten 30 Sekunden und an drei strukturellen Lücken. Alle vier Personas kamen ans Ziel, wenn sie tief genug gruben; drei von vier wurden von der Startseite nicht oder falsch adressiert.

## Konsens-Stärken (alle Personas)

1. **Referenzdatenbank** — 142 Projekte, Filter, starke Marken, PDF je Referenz. Stärkstes Asset.
2. **PDPs ausschreibungsreif** — HE 65/GRANIDUR mit Normklassen-Kette, TDS+SDB+DoP+LV-Text; ~208 Dokumente im Download-Center. „Besser als viele Wettbewerber" (2× unabhängig).
3. **Fachberater-Finder** — PLZ → Name+Mobil in Sekunden, aus jeder Bereichsseite erreichbar.
4. **Microtop/DVGW** — produktgenaue Zulassungstabelle, ehrliche Kennzeichnung, Systemvergleich.

## Kernbefund: Startseite positioniert enger, als das Portfolio ist

| Persona | Befund |
|---|---|
| Architekt | Hero sagt nur „Industrieböden"; drei konkurrierende Einstiegslogiken (Kacheln→Bereiche, Menü→Neubau/Sanierung, CTA→Lösungsfinder); bester Persona-Pfad `/neubau/` nur zufällig auffindbar |
| Fachplaner | `/de/sanierung/` (zentrale Einstiegsseite) nennt keine einzige Norm; Normkompetenz existiert eine Ebene tiefer |
| Händler | Kein Händler-/Vertriebspartner-Signal auf der gesamten Site; Vertriebsmodell unklar |
| Katzenstreu | Bereichsseite ohne Sortiment/Kapazitätsangaben; CTA geht an info@ statt export@; EN-Übersetzung dagegen durchweg professionell |

## Befunde → Issues

| Befund | Issue |
|---|---|
| Hero-Reframing Portfolio-Breite | #427 |
| Startseite → 3 Kompetenzfelder + kuratierte Referenz-Mischung | #428 |
| Sichtestrich-Alt-URL 404 (Bereich bewusst aufgelöst #331) → Redirect | #429 |
| Menü: Sparten-Logik statt Mischlogik, Sparte-2-Hub | #430 |
| Prüf-Infobox-Mechanik (Live-Review-Modell, Ratgeber-Gesamtabnahme → V2) | #431 |
| Katzenstreu-CTA info@ → export@ | #432 |
| Kennwert-Range „45–45 N/mm²" bei Varianten (Porsche-Referenz) | #433 |
| DE-Textreste auf /en/produkte/ | #434 |
| Microtop W-270-Aussage + KOROCRETE SDB/DoP | #435 |
| Katalog-Bucket „Weitere Produkte (14)" auflösen | #436 |
| Verbrauch kg/m² auf PDPs | → Kommentar in #394 |
| Katzenstreu: 3 Qualitätsstufen + B2B-Factbox + Zertifikate | → Kommentar in #386 |
| Chemische Beständigkeit / Lebensmittel-Pfad | kein neues Issue — fertige Entwürfe hinter Content-Gate (#147, #151, #144); Blocker = Technik-Sign-off |
| Referenz-Eckdaten (Sperrzeit/Schichtdicke/Zeitraum) | zurückgestellt (Referenzen-Lane, nach GF) |
| Händler-Block „Für den Fachhandel" | zurückgestellt (nach GF-Abstimmung Vertriebsmodell-Aussage) |

## Weitere Einzelbefunde (nicht issue-würdig oder bekannt)

- Kontaktformular mailto-basiert — bekannter V1-Zwischenstand (Submit-Tausch beim Cutover).
- Porsche-Showroom (1998) als Design-Vorzeigereferenz wirft Aktualitätsfrage auf — Referenz-Kuratierung.
- Zertifikats-Inkonsistenz ISO 14001/BRC (Bereichsseite vs. /unternehmen/) — in #386-Kommentar enthalten.
- Kein Gesamt-Lieferprogramm-PDF im Download-Center (Händler-Wunsch) — Nice-to-have.
- Referenz Norderstedt: 20 m², anonym, ohne Sperrzeit-Angabe — geringe Beweiskraft; Teil der Referenz-Eckdaten-Frage.

## Mockup

`docs/mockups/Startseite-Kompetenzfelder-Mockup.html` — Startseite mit 3 Kompetenzfeldern (Industrieboden · Betonsanierung & Infrastruktur · Katzenstreu) + Sparten-Navigation, annotiert für die GF-Abstimmung 02.07.

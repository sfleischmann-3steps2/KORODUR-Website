# Rapid Set Bereichsseite — Content-Konzept & Umsetzung

**Datum:** 2026-06-19 · **Owner:** Steffi (Marketing) · **Bereich:** `rapid-set` (Anzeige „Betonsanierung")

## Ausgangslage

Die Rapid-Set-Bereichsseite lief auf dem generischen Bereichs-Template (Header → Produkt-Grid → Referenzen → Fachberater → CTA). Kein individueller Content. Auftrag Steffi: die Flagship-Bereichsseite „schnelle Betonsanierung mit Rapid Set" inhaltlich mit eigenständigem Content ausarbeiten.

## Quellen

Tiefenanalyse aller Unterlagen unter `korodur-rapidset/` (separates Git-Repo, nicht im Website-Repo getrackt): Broschüre, System-Datenblatt, 3 Präsentationen, 8 TDS. ~290 Seiten, parallel analysiert (11 Quellen-Chunks + Synthese, Workflow `rapidset-quellenanalyse`).

## Kernpositionierung

> Rapid Set ist das multifunktionale Werkzeug der Betonsanierung: EIN Material für viele Aufgaben, nach rund einer Stunde belastbar. Teams liefern zeitoptimiert ab, es geht sofort weiter.

Preis ist bewusst **kein** Argument (Rapid Set ist teurer als Alternativen). Die Differenzierung läuft über Downtime-Minimierung, Multifunktionalität und Verarbeitung ohne schwere Maschinerie.

## Entscheidungen (Steffi, 2026-06-19)

1. **H1/Leitslogan:** Hybrid aus Nutzen + Marken-Claim. H1 „Ein Material. Viele Aufgaben. Nach einer Stunde belastbar.", Subline „Rapid Set. schnell. einfach. einzigartig."
2. **Trust:** nur anonym. Keine namentlichen Testimonials, keine Kundenlogos (konform mit Content-Standing-Rules). „Über 2.500 Handwerksbetriebe" + Normen/Zertifikate + Referenzobjekte.
3. **CO₂/Lebensdauer:** Broschüren-Werte verwenden (30 % weniger CO₂, bis 4× Lebensdauer), als Faktencheck für Technik markiert.

## Seitenstruktur (9 Sektionen)

1. **Hero** — Kicker, zweizeilige H1, Subline, Lead, 3 Vertrauens-Chips, CTA „Technische Fachberatung" + Anker „Zum Portfolio"; Bereichsbild mit navy/80-Overlay.
2. **Problem / Nutzenversprechen** — „Jede Stunde Sperrzeit ist teuer." + Downtime-Liste + Payoff.
3. **Drei Kernvorteile** — schnell belastbar · multifunktional · ohne schwere Maschinerie.
4. **Wofür — Anwendungsfälle** — 9 Branchen-Kacheln mit echten Referenzfotos (Verkehr, Flughafen, Industrieboden, Logistik, Brücke, Pflaster, Tankstelle, Treppen/Hochbau, Design), je verlinkt zur Referenz.
5. **Technologie** — BCSA-Zement, 6 Differenzierungs-Karten, Epoxid-Abgrenzung (Brandklasse A1, mineralisch, Bauschutt statt Gefahrgut).
6. **Produkt-Portfolio** — gruppiert nach `produktgruppen` (Schnellreparaturmörtel / Schnellbeton-Systeme / Additive) mit Gruppen-Intros und „belastbar nach"-Badge.
7. **Beweis / Trust** — Kennzahl „Über 2.500" + Normen-Chips + Lizenzpartner seit 2012 / KORODUR seit 1936.
8. **Referenzen** — projektart-gefilterte Karten (Sanierung) aus der Datenbank.
9. **Fachberatung & Bezug** — Fachberater-Finder (Rapid-Set-Mapping), Händler-Hinweis, Abbinder „Rapid Set changes the game!".

## Verwendete Slogans (verbatim aus den Unterlagen)

„Ein Material. Viele Aufgaben." · „schnell. einfach. einzigartig." · „Wenige Produkte für viele Anwendungen" · „Maximale Wirtschaftlichkeit durch maximale Effizienz" (Payoff) · „Rapid Set changes the game!" (Abbinder) · „Wasser ist unsere Grundierung".

## Umsetzung (Code)

- `data/rapidSetContent.ts` — DE-Editorial-Content (wie Ratgeber: zunächst DE-only).
- `components/RapidSetBereich.tsx` — dedizierte Seitenkomponente, zieht echte Produkte/Referenzen/Fachberater.
- `app/[lang]/bereiche/[slug]/page.tsx` — Branch `slug === "rapid-set" && lang === "de"` → `RapidSetBereich`. EN/FR/PL/ES rendern weiter das generische Template.

## Offen / Follow-up

- **Faktencheck (Technik):** CO₂-Wert (30 % vs. abweichende Deck-2025-Zahlen) und Lebensdauer-Faktor (4× vs. 3×) final bestätigen → Werte in `data/rapidSetContent.ts` (`faktencheck: true`) aktualisieren.
- **i18n (#181):** EN/FR/PL/ES-Ausarbeitung der Rich-Sektionen (aktuell generisches Template als Fallback).
- **Key-Visual:** optional dediziertes Hero-Bild (Taschenmesser-Grafik / 4 Produktsäcke) statt Bereichsbild.
- **Scope geklärt:** Schnellestrich (FSCem) und NEODUR Level bleiben im Industrieboden, nicht hier.

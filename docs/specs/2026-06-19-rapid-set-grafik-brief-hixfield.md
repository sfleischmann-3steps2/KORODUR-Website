# Grafik-Brief Rapid Set Bereichsseite (für Hixfield)

**Datum:** 2026-06-19 · **Owner:** Steffi · **Status:** Konzept zur Abstimmung mit Kollegen
**Kontext:** Bereichsseite „Betonsanierung mit Rapid Set" (PR #291). Seite ist redaktionell ausgearbeitet, Bildsprache fehlt noch.

## Die Idee in einem Satz

Eine **Grafik-Familie aus einem Leitmotiv plus zwei bis drei Begleitgrafiken** im gleichen handillustrierten Stil. Das Schweizer Taschenmesser („Der ALLES-BESSER-KÖNNER") ist der Anker für die Multifunktionalität. Jede Begleitgrafik übernimmt **genau eine Kernbotschaft** und einen festen Platz auf der Seite. So entsteht ein wiedererkennbares System statt loser Einzelbilder.

## Bildsprache (aus der Rapid-Set-Broschüre abgeleitet)

- **Handillustriert, nicht flat-vektorig.** Halbrealistische Objekt-Illustration (wie das Taschenmesser) plus reduzierte Outline-Icons.
- **Roter Marker-Akzent** für das Pointenwort (wie „ALL IN ONE!" handschriftlich). Genau ein Marker-Wort pro Grafik, nicht mehr.
- **KORODUR-Farben:** Navy + Cyan als Basis, die vier Rad-Farben (Blau/Grün/Orange/Rot) sparsam als Akzent. Rapid-Set-Rot bleibt dem Material/Marker vorbehalten.
- **Ton:** technisch-glaubwürdig, aber mit Augenzwinkern. B2B-Industrie, kein Comic.

## Technische Specs (wichtig für Web)

- **Transparenter Hintergrund** (PNG mit Alpha oder SVG) — die Grafiken müssen auf hellem UND auf navyfarbenem Grund funktionieren.
- **SVG bevorzugt** (gestochen scharf, skalierbar, klein). Sonst PNG @2x, web-optimiert (< 150 KB je Grafik).
- **Format/Ausschnitt:** je Grafik möglichst quadratisch bis 4:3, definierte Safe-Area, lesbar bis ca. 360 px Breite (Mobile).
- **Textarm:** Beschriftung so knapp, dass sie auch klein lesbar bleibt. Lange Labels gehören in den HTML-Text daneben, nicht in die Grafik. (Das aktuelle Broschüren-Rad ist dafür zu textlastig, siehe G1.)
- **Sprachneutral wo möglich:** Begriffe in der Grafik minimal halten, damit eine EN/FR/PL/ES-Variante (i18n #181) günstig nachziehbar ist.

## Die Grafik-Familie

### G1 — Leitmotiv „Der ALLES-BESSER-KÖNNER" (Taschenmesser) · BESTEHT
- **Botschaft:** Multifunktionalität. Ein Material für viele Aufgaben.
- **Status:** Aus der Broschüre extrahiert, aktuell als Interim auf der Seite (`/images/bereiche/rapid-set-alles-besser-koenner.png`).
- **Auftrag an Hixfield:** web-optimierte Endfassung. Transparenter Hintergrund, entzerrter Aufbau, weniger Fließtext im Rad (CO₂-/Lebensdauer-Werte raus aus der Grafik, stehen im HTML daneben), mobiltauglich. Optional sprachneutrale Variante.
- **Seiten-Slot:** Leitmotiv-Sektion direkt nach dem Problem-Block.

### G2 — „In einer Stunde befahrbar" (Tempo) · NEU
- **Botschaft:** Geschwindigkeit. Belastbar nach rund einer Stunde.
- **Bildidee:** Eine kräftige **Stoppuhr**, deren Zeiger eben über die 1-Stunde-Marke wischt, darunter eine kurze 3-Schritt-Sequenz als Mini-Sketch: Sack auf → Wasser zu → frische Fläche → LKW rollt drüber. Marker-Wort rot: **„1 Stunde"**.
- **Seiten-Slot:** Kernvorteil-Karte „Schnell belastbar" oder als Spot über der Anwendungsfall-Sektion.

### G3 — „Eimer, Wasser, Kelle" (einfache Verarbeitung) · NEU
- **Botschaft:** Ohne schwere Maschinerie, ohne Haftbrücke.
- **Bildidee:** Das **Werkzeug-Trio Eimer + Kelle + Wasserhahn** handillustriert, daneben eine durchgestrichene schwere Mischmaschine. Ein Wassertropfen mit kleiner Sprechblase **„unsere Grundierung"** (roter Marker). Aussage: mehr braucht es nicht.
- **Seiten-Slot:** Kernvorteil-Karte „Einfache Verarbeitung".

### G4 — „Die Baustelle, die nicht stillsteht" (Wirtschaftlichkeit) · OPTIONAL
- **Botschaft:** Downtime-Minimierung, Termintreue. Maximale Wirtschaftlichkeit durch maximale Effizienz.
- **Bildidee:** **Split-Szene.** Links „konventionell": Absperrgitter, leere gesperrte Fläche, Uhr läuft, rotes Kreuz. Rechts „mit Rapid Set": Verkehr fließt, Team arbeitet weiter, grüner Haken. Marker-Wort rot: **„weiter geht's"**.
- **Seiten-Slot:** Problem-/Nutzen-Sektion.

**Empfehlung:** G2 und G3 sind das Pflicht-Paar (sie bespielen die zwei noch bildlosen Kernvorteile neben dem Taschenmesser). G4 ist die Kür, wenn Budget/Zeit da sind.

## Konsistenz-Regeln (damit es eine Familie wird)

1. Gleicher Illustrationsstil und gleiche Strichstärke wie das Taschenmesser über alle Grafiken.
2. Genau **ein rotes Marker-Wort** pro Grafik.
3. Gleiche Icon-Sprache wie die sechs Eigenschafts-Icons der Broschüre (schnell, belastbar, schwundneutral …).
4. Transparenter Hintergrund, gleiche Safe-Area, gleiche optische Größe der Kern-Objekte.

## Lieferpaket

- G1 web-optimiert + G2 + G3 (+ optional G4), je als SVG (oder PNG @2x transparent), web-optimiert.
- Quelldateien (AI/SVG) für spätere Sprachvarianten.
- Optional: die sechs Eigenschafts-Icons einzeln als Set für die Kernvorteil-Karten.

## Offene Punkte für die Kollegen-Runde

- Soll das Taschenmesser ins **Hero** (Split-Layout Text + Grafik) oder als eigene Sektion bleiben (aktueller Stand)?
- Reicht G2 + G3, oder G4 mitnehmen?
- Sprachvarianten gleich mitbeauftragen (Export-Märkte) oder erst DE?

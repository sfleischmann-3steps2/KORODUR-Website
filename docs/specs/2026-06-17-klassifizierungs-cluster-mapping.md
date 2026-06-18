---
Erstellt: 2026-06-17
Typ: Spec / Mapping-Vorschlag (Steffi-Freigabe → Rand-Klärfälle an Technik)
Epic: #76 (Produkte & Klassifizierung, Excel = SoT)
Quelle: Notion-Produktdatenbank „🚧 Kern Produktdaten" (DB1), View „Alle Produkte", Stand 2026-06-16 (92 echte Produkte)
Status: Vorschlag, wartet auf Steffi-Nick; danach Rand-Klärfälle auf Notion-Frageseite an Technik
---

# Klassifizierungs-Cluster — Produktart-getriebenes Befüllen (Werteklasse abgeleitet)

## Kernaussage

Die vier Klassifizierungs-Properties der PDB — **Produktart · KORODUR-Werteklasse · Gewerk · Portfoliobereich Website** — sind keine vier unabhängigen Felder, sondern eine **Kette mit einem Anker**. Eine Information (`Produktart`) wird einmal aus dem TDS gezogen, die anderen drei kaskadieren daraus. **Werteklasse wird abgeleitet, nicht von Hand gepflegt** (Festlegung Steffi 2026-06-17).

## Ist-Stand der Befüllung (Notion DB1, 92 echte Produkte, Stand 2026-06-16)

| Property | befüllt | leer | Konsequenz |
|---|---|---|---|
| **Produktart** | 89/92 (97 %) | 3 | der maintainte **Anker** — bleibt führend |
| **KORODUR-Werteklasse** | 12/92 (13 %) | **80** | **ableiten** statt 80× nachpflegen |
| **Gewerk** | 58/92 (63 %) | 34 | Default aus Produktart seeden |
| **Portfoliobereich Website** | **0/92 (0 %)** | **92** | komplett aus Website-Arbeit **backfillen** |
| Neubau/Sanierung | 71/92 (77 %) | 21 | separat, nicht Teil dieses Clusters |

Die 3 Produkte ohne Produktart (echte Produkte, kein „Kein Produkt"): **NEODUR DM DRAINMÖRTEL · NEODUR SM SVS 5 1,5 · NEODUR SM SVS 5 3**.

## Ableitungskette

```
Produktart (fein, TDS-belegt, 1 Wert)
   ├─→ KORODUR-Werteklasse   = deterministischer Roll-up (1:1)        → ABGELEITET
   ├─→ Gewerk (multi)        = Default aus Produktart + manuelle Mehrfachnutzung
   └─→ Portfoliobereich (multi) = Default aus Gewerk + Marketing-Override
```

## Mapping-Tabelle (Vorschlag, geerdet an Ist-Daten)

WK-Codes: A=Hartstoff · B=Reparaturmörtel · C=Vergussmörtel · D=Industrieboden · E=offen · F=Haftbrücke/Sonder.
Status: 🟢 sicher · 🟡 plausibel, bestätigen · 🔴 Konflikt/Technik.

| Produktart | n | → Werteklasse (abgel.) | → Default-Gewerk | → Default-Portfoliobereich | Status |
|---|---|---|---|---|---|
| Hartstoffschicht | 16 | A | Industrieboden | Industrieboden | 🟢 (Ist: A) |
| Hartstoffeinstreuung | 9 | A | Industrieboden | Industrieboden | 🟢 |
| Industrieestrich | 1 | D | Industrieboden | Industrieboden | 🟢 |
| Estrich-Bindemittel | 3 | D | Estrich | Industrieboden | 🟡 |
| Bodenausgleichsmasse | 2 | D | Estrich | Industrieboden | 🟡 |
| Sichtestrich | 8 | A | Sichtestrich | Sichtestrich | 🟡 (Ist: A — TRU hartstoffbasiert, bestätigen) |
| Reparaturmörtel | 8 | B | Reparaturmörtel | RS Betonsanierung / Spezialbaustoffe | 🟡 (WK sicher, Portfolio prüfen) |
| Spritzmörtel | 8 | **C?** | TW-Sanierung | TW-Trinkwasserbehälter | 🔴 (Ist: C — fachlich B/eigene? MSM/MSB) |
| Vergussmörtel | 12 | C | Vergussmörtel | Spezialbaustoffe / Infrastruktur | 🟢 (Ist: C) |
| Vergussbeton | 1 | C | Vergussbeton | Infrastruktur / Spezialbaustoffe | 🟡 |
| Konstruktiver Schnellbeton | 2 | C | Schnellvergussmörtel | Infrastruktur | 🟡 |
| Spritzbeton | 1 | C? | TW-Sanierung | TW-Trinkwasserbehälter | 🔴 (WK festlegen) |
| TW-Beschichtungsmörtel | 1 | F? | TW-Sanierung | TW-Trinkwasserbehälter | 🔴 (WK festlegen) |
| Pflasterfugenmörtel | 2 | B/F? | — | Spezialbaustoffe | 🔴 (WK + Gewerk fehlen) |
| Haftbrücken & Grundierungen | 5 | F | Haftbrücke / Grundierung | begleitend (folgt System-Bereich) | 🟢 |
| Oberflächenvergütung | 9 | F | Nachbehandlung / Oberflächenfinish | begleitend (Industrieboden/Sichtestrich) | 🟢 |
| Additive | 3 | F/E? | Additive | begleitend | 🟡 (WK prüfen) |
| Sonstiges | 1 | E (offen) | — | — | 🟢 (per Definition offen) |

**Geerdete Signale aus den Ist-Daten:** Spritzmörtel hängt durchgehend an Gewerk `TW-Sanierung` (5/8) → bestätigt die Verbindung MSM/MSB → Bereich „TW-Trinkwasserbehälter" (= Repo `microtop`). Vergussmörtel/-beton an `Unterstopf-/Schnellverguss-/Vergussmörtel`. Sichtestrich sauber an `Sichtestrich`.

## „Abgeleitet" technisch abbilden (Festlegung Steffi)

Werteklasse darf **nicht doppelt gepflegt** werden. Umsetzung in beiden Welten:
- **Repo:** Lookup-Funktion `werteklasseFromProduktart(produktart)` aus dieser Tabelle; Werteklasse **kein** gespeichertes Feld am Produkt, sondern berechnet (analog `produktart.ts`-Ableitung heute).
- **Notion DB1:** Werteklasse als **Formel-Property** aus `Produktart` (oder beim Migrationslauf gesetzt + als abgeleitet dokumentiert, nicht händisch). Heute ist `KORODUR-Werteklasse` ein Select — Umstellung auf Formel ist Teil des Issues.

## Rand-Klärfälle für die Technik (nach Steffi-Nick → Notion-Frageseite)

1. **Spritzmörtel (MSM/MSB):** Werteklasse C (Ist-Daten) bestätigen oder korrigieren (fachlich Reparatur/eigene Klasse?).
2. **Sichtestrich → A:** bestätigen (TRU als hartstoffbasierter Sichtestrich) oder eigene Klasse.
3. **Werteklasse festlegen für:** Spritzbeton, TW-Beschichtungsmörtel, Pflasterfugenmörtel, Konstruktiver Schnellbeton, Bodenausgleichsmasse, Additive.
4. **3 Produkte ohne Produktart** klassifizieren: NEODUR DM DRAINMÖRTEL, NEODUR SM SVS 5 1,5, NEODUR SM SVS 5 3 (SM SVS 5 = vermutlich Spritzmörtel).
5. **Default-Portfoliobereich bestätigen**, v. a.: Reparaturmörtel → „RS Betonsanierung" vs. „Spezialbaustoffe"; begleitende Produkte (Haftbrücke/Grundierung/Oberflächenvergütung/Additive) — eigener Bereich oder folgen sie dem System-Bereich?

## Nächste Schritte

1. Steffi nickt Mapping-Tabelle + Ableitungsprinzip ab.
2. Rand-Klärfälle (1–5) auf die Notion-Frageseite an die Technik.
3. Umsetzung im konsolidierten Aufwasch (Issue, gesammelt): Werteklasse-Ableitung implementieren, Gewerk-Defaults seeden, Portfoliobereich für alle 92 backfillen (Quelle = Website-Arbeit/Repo-`bereich`), 3 fehlende Produktarten ergänzen. Mapping-Tabelle wird Baustein des Produktdaten-Guide (Notion-Jahresziel-Erfolgskriterium 3).

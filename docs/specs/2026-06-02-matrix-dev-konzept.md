# Anwendungsfall-Matrix — Dev-Konzept

**Datum:** 2026-06-02 · **Status:** Konzept zur Umsetzung
**Zusammenhang:** Teilt Datenquelle & Taxonomie mit [Schritt-3-Spec](2026-06-02-loesungsfinder-step3-spec.md). Matrix und Lösungsfinder werden aus **derselben** Logik abgeleitet — die Matrix ist die menschenlesbare Projektion der Match-Engine.

---

## 0 Zweck

Eine eigenständige Seite, auf der der Kunde auf einen Blick sieht, **welches Produkt für welchen Anwendungsfall** taugt. Zwei Schichten:

- **Schicht 1 (öffentlich):** Produkt × Anwendungsfall — die 6 Cluster aus dem Lösungsfinder, mit Legende, was in jedem Anwendungsfall steckt.
- **Schicht 2 (Engine/Entwicklung):** Produkt × Belastungs-Tag — der eigentliche Match-Schlüssel. Aus ihm wird Schicht 1 abgeleitet.

So bleiben Matrix und Finder garantiert konsistent: Beide lesen `Produkt.belastungenAbgedeckt` und `EINSATZBEREICH_TAGS`.

---

## 1 Schicht 1 — Produkt × Anwendungsfall (öffentlich)

● Kernanwendung · ○ geeignet/sekundär · – nicht vorgesehen

| Produkt | Familie | Industrie- & Hallenboden | Nass-/Hygiene-/Chemie | Sicht- & Design | Verkehr- & Infrastruktur | Parkdeck | Umwelt- & WHG |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|
| NEODUR HE 40 | Hartstoff | ● | ○ | – | – | – | – |
| NEODUR HE 60 rapid | Hartstoff (schnell) | ● | ○ | – | ○ | ○ | ○ |
| NEODUR HE 65 | Hartstoff | ● | ○ | – | – | – | – |
| NEODUR HE 65 Plus | Hartstoff (WHG) | ● | ● | – | ○ | ● | ● |
| NEODUR Level | Dünnschicht | ● | – | ○ | – | – | – |
| TRU Self-Leveling | Sichtestrich | – | ○ | ● | – | – | – |
| Rapid Set CEMENT ALL | Reparaturmörtel | – | ○ | – | ○ | ○ | ○ |
| Rapid Set MORTAR MIX | Reparaturmörtel | – | ○ | – | ○ | – | ○ |
| Rapid Set MORTAR MIX DUR | Reparaturmörtel | ○ | – | – | ○ | – | – |
| ASPHALT REPAIR MIX | Asphalt | – | – | – | ● | ○ | – |
| DOT Europe CONCRETE MIX | Reparaturbeton | ○ | ○ | – | ● | ● | ○ |
| KOROCRETE Schnellbeton | Beton-System | ● | ○ | – | ○ | – | – |
| Rapid Set Schnellbeton | Beton-System | – | – | – | ● | ○ | – |

### Legende — was in jedem Anwendungsfall steckt

| Anwendungsfall | innen/außen | Was drinsteckt (Belastungsbild) |
|---|---|---|
| Industrie- & Hallenboden | innen | Staplerverkehr, Schwerlast, Abrieb, Maschinen, Hochregallager |
| Nass-, Hygiene- & Chemiefläche | innen | Nassbereich, Lebensmittel, Pharma, Reinigung, Säuren, Dichtigkeit |
| Sicht- & Designboden | innen | Optik, Repräsentation, Verkauf, Publikumsverkehr |
| Verkehrs- & Infrastrukturfläche | außen | Straße, Brücke, Flugbetrieb, Witterung, schnelle Freigabe |
| Parkdeck & Parkfläche | außen | PKW-Verkehr, Tausalz, Reifenabrieb, Öltropfen |
| Umwelt- & WHG-Fläche | außen | Tankstelle, Waschplatz, Auffangbehälter, Hafen, Gefahrgut |

Die „Familie"-Spalte macht die Produktart sichtbar (Hartstoff / Dünnschicht / Reparaturmörtel / Beton), damit Reparatur-/Vergussprodukte erkennbar sind, auch wenn sie quer über mehrere Anwendungsfälle als ○ stehen.

---

## 2 Schicht 2 — Produkt × Belastungs-Tag (Engine)

Das ist die Tabelle, aus der Schicht 1 berechnet wird. ✔ = Tag in `Produkt.belastungenAbgedeckt` (Stand TDS-korrigiert, s. Step-3-Spec §3).

| Produkt | schwerlast | verschleiss | staplerverkehr | chemie | hygiene | fleckschutz | optik | publikumsverkehr | frost-tausalz | whg |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| NEODUR HE 40 | ✔ | ✔ | ✔ | ✔ | | | | | | |
| NEODUR HE 60 rapid | ✔ | ✔ | ✔ | ✔ | | | | | ✔ | |
| NEODUR HE 65 | ✔ | ✔ | ✔ | ✔ | | | | | | |
| NEODUR HE 65 Plus | ✔ | ✔ | ✔ | ✔ | | | | | ✔ | ✔ |
| NEODUR Level | | ✔ | ✔ | | | | ✔ | | | |
| TRU Self-Leveling | | | | | ✔ | ✔ | ✔ | ✔ | | |
| Rapid Set CEMENT ALL | | (✔?) | | ✔ | | | | | ✔ | |
| Rapid Set MORTAR MIX | | | | ✔ | | | | | ✔ | |
| Rapid Set MORTAR MIX DUR | ✔ | ✔ | ✔ | | | | | | ✔ | |
| ASPHALT REPAIR MIX | ✔ | | | ✔ | | | | | ✔ | |
| DOT Europe CONCRETE MIX | ✔ | ✔ | | ✔ | | | | | ✔ | |
| KOROCRETE Schnellbeton | ✔ | | | | (✔?) | | | | ✔ | |
| Rapid Set Schnellbeton | ✔ | | ✔ | ✔ | | | | | ✔ | |

`(✔?)` = Sign-off Frank offen. Tag `whg` ist neu, `thermik` gestrichen (s. Step-3-Spec §2).

### Ableitung Schicht 1 aus Schicht 2

Anwendungsfall → Tag-Set (`EINSATZBEREICH_TAGS`); ● wenn das Produkt **alle Kern-Tags** des Anwendungsfalls trägt, ○ bei Teilschnittmenge, – bei leerer Schnittmenge. Damit ist die öffentliche Matrix kein separat gepflegter Datensatz, sondern ein berechneter View — keine Doppelpflege, kein Drift gegenüber dem Finder.

---

## 3 Datenquelle & Build

- **Quelle:** `data/produkte.ts` (`belastungenAbgedeckt`, `aussenGeeignet`, `flaechenkategorienGeeignet`) + `data/einsatzbereichMapping.ts` (`EINSATZBEREICH_TAGS`, `EINSATZBEREICH_LABELS`).
- **Seite:** statisch zur Build-Zeit gerendert (Next.js Static Export, kein SSR) unter `app/[lang]/produkte/matrix/` — analog zur bestehenden Produktmatrix V5.
- **i18n:** Anwendungsfall-Labels/Stichworte aus `EINSATZBEREICH_LABELS` + `dictionaries/{de,en,fr,pl}.json`.
- **TDS-Download** je Produktzeile beibehalten (wie Matrix V5).

## 4 Konsistenz-Garantie

Da Matrix und Lösungsfinder dieselben Felder lesen, gilt: Empfiehlt der Finder ein Produkt für einen Anwendungsfall, zeigt die Matrix dort mindestens ○. Ein Smoke-Test (`scripts/test-loesungsfinder.ts` erweitern) sollte das pro Anwendungsfall prüfen — und zusammen mit dem Referenz-Fallback (Step-3-Spec §6) sicherstellen, dass zu jeder Produktempfehlung Referenzen existieren.

---

## 5 Offene Punkte

Tag-Sign-offs aus Step-3-Spec §3/§9 wirken direkt auf beide Schichten. Bis dahin sind `(✔?)`-Zellen Platzhalter. Optik der öffentlichen Matrix (Dot-Stil, Familie als Badge, Sortierung nach Familie) im UI-Review festlegen.

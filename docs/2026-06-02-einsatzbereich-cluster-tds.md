# Einsatzbereich-Cluster aus den TDS — Konzept

**Datum:** 2026-06-02 · **Autorin/Quelle:** Steffi + TDS-Auswertung
**Status:** Entwurf zur Beurteilung im Team
**Scope:** 12 TDS aus `TDS_Sanierungsprodukte/` (= die 13 Produkte der Sanierungs-Matrix, ohne reine Additive)
**Anschluss:** ergänzt [`taxonomie-vorschlag-loesungsfinder.md`](taxonomie-vorschlag-loesungsfinder.md) (Dimension „Art der Maßnahme" + „Mechanische Belastung") und die TDS-Extraktion `TDS_Sanierungsprodukte/TDS_Extraktion_Review_2026-06-01.md`.

---

## 1 Ausgangsproblem

Der Lösungsfinder fragt aktuell die **Branche** ab („Lager & Logistik", „Industrie & Produktion", „Lebensmittel & Pharma", „Verkauf & Showroom" bzw. die Außen-Variante mit „Parkdeck", „Verladezone", „Werkhof", „Infrastruktur"). Diese Achse passt nicht: Die TDS unserer Sanierungsprodukte gliedern sich **nicht nach Branche**, sondern nach **Anwendungsart × Belastungsbild**. Dieselbe Halle kann — je nach Aufgabe — einen Hartstoffestrich, einen dünnen Sichtboden *oder* einen punktuellen Reparaturmörtel brauchen. Eine Branchen-Kachel kann diese Entscheidung nie auflösen.

---

## 2 Befund: zwei Achsen statt Branche

Aus den Anwendungsabschnitten aller 12 TDS fallen zwei klare, voneinander unabhängige Achsen.

### Achse 1 — Anwendungsart (Produktlogik)

Was wird gebaut? Diese Achse teilt den Katalog fundamental und entspricht der internen Produktlogik.

| Familie | Produkte | Charakter |
|---|---|---|
| Hartstoff-Nutzschicht | HE 40, HE 60 rapid, HE 65, HE 65 Plus | ganzflächiger, hochverschleißfester Industrieboden |
| Dünn-/Sichtschicht | NEODUR Level, TRU Self-Leveling | dünne Nutz- bzw. Designschicht im Verbund |
| Reparatur-/Vergussmörtel | CEMENT ALL, MORTAR MIX | punktuell, schnell, auch vertikal/über Kopf |
| Schnell-/Reparaturbeton | DOT Europe Concrete Mix, KOROCRETE, System Rapid Set Concrete, Asphalt Repair Mix | großvolumig, Verkehr/Infrastruktur |

### Achse 2 — Belastungsbild (Kundenlogik)

Wo und unter welcher Last steht die Fläche? Das ist die Achse, in der sich der Kunde wiedererkennt — und die in den Lösungsfinder gehört (siehe Cluster in §3).

**Empfehlung:** Im Lösungsfinder die **Achse 2 abfragen** (Kunde erkennt seine Fläche), die **Achse 1 ableiten** (wir wählen die Produktfamilie). Branche fällt als Abfrage-Kriterium weg.

---

## 3 Die sechs Cluster (rein aus den TDS abgeleitet)

Jeder Cluster nennt das Belastungsbild, die abdeckenden Produkte und die **wörtlichen Einsatzorte aus den TDS** als Beleg. „innen/außen" ist bewusst als Querschnitts-Eigenschaft notiert, nicht als eigener Cluster (8 von 12 Produkten können beides).

### Cluster 1 — Industrie- & Hallenboden
- **innen** (mehrere auch außen)
- **Belastung:** Staplerverkehr, Schwerlast, Abrieb/Verschleiß, Öl/Benzin/Lösemittel
- **Produkte:** HE 40 · HE 60 rapid · HE 65 · HE 65 Plus · NEODUR Level · KOROCRETE
- **TDS-Belege:** Industriehallen, Montagehallen, Werkstätten, Hochregallager, Produktionshallen, Flugzeughallen, Technik-/Lagerräume
- **Status:** breit, aber klar — Kern-Cluster der HE-Familie

### Cluster 2 — Parken & befahrenes Deck
- **innen + außen**
- **Belastung:** Reifenabrieb, Tausalz (außen), Frost, PKW/Stapler
- **Produkte:** HE 40 · HE 65 · HE 65 Plus · NEODUR Level · DOT
- **TDS-Belege:** Parkhäuser, Tiefgaragen, Parkdecks, Rampen
- **Status:** überlappt stark mit Cluster 1 (fast identisches HE-Set). Offene Frage: eigener Pfad wegen Tausalz/Frost, oder unter Industrie zusammenfassen? → §5

### Cluster 3 — Verkehrs- & Infrastrukturfläche
- **außen**
- **Belastung:** dynamischer Verkehr, Witterung, Frost-Tausalz, kurze Sperrzeiten / schnelle Freigabe
- **Produkte:** DOT · System Rapid Set Concrete · Asphalt Repair Mix · MORTAR MIX · KOROCRETE
- **TDS-Belege:** Straßen, Fahrbahnen, Brücken, Start-/Landebahnen, Flugbetriebsflächen, Gehwege, Parkplätze, Einfahrten, Schlaglöcher, Schächte
- **Status:** scharfer Differenzierer — zieht klar das Beton-/Asphalt-Set

### Cluster 4 — Umwelt-, WHG- & Chemiefläche
- **innen + außen**
- **Belastung:** wassergefährdende Stoffe, Chemie, Nässe, Anforderung flüssigkeitsdicht
- **Produkte:** HE 65 Plus (einziger echter WHG-/FDE-Nachweis, 25,7 mm flüssigkeitsdicht) · CEMENT ALL · MORTAR MIX · DOT · KOROCRETE (nassraumtauglich)
- **TDS-Belege:** Tankstellen, Waschplätze, Abfüllanlagen, Auffangbehälter, Gefahrgutumschlag, Kläranlagen, Hafen, Feuerwehrgerätehaus, Nassbereiche
- **Status:** scharfer Differenzierer — HE 65 Plus ist hier das einzige Produkt mit normativem WHG-Nachweis, der Rest ist „chemiebeständig" als Eigenschaft

### Cluster 5 — Sicht- & Designboden
- **innen** (auch außen)
- **Belastung:** gering mechanisch, hoch optisch, Publikumsverkehr
- **Produkte:** TRU Self-Leveling (Kern) · NEODUR Level
- **TDS-Belege:** Verkaufsräume, Restaurants, Foyers, Museen, Bürogebäude, Schulen, Flughäfen, repräsentative Räume
- **Status:** scharfer Differenzierer — kleinstes, aber eindeutiges Produktset

### Cluster 6 — Punktuelle Instandsetzung & Verguss
- **innen + außen · vertikal/über Kopf**
- **Belastung:** punktuell, schnelle Belastbarkeit, *nicht flächig*
- **Produkte:** CEMENT ALL · MORTAR MIX · DOT
- **TDS-Belege:** Betoninstandsetzung, Vergussarbeiten, Verankerung, Injektion, Spachteln, Schalungsarbeiten, Maschinenfundamente, Stuck/Putz, Ausgleichsschichten
- **Status:** **kein Belastungsbild, sondern eine Anwendungsart.** Dieser Cluster gehört eigentlich auf Achse 1. → zentrale offene Entscheidung, §5

---

## 4 Coverage-Matrix (Produkt × Cluster)

● = Kernanwendung (im TDS explizit) · ○ = geeignet/sekundär · – = nicht vorgesehen

| Produkt | 1 Industrie/Halle | 2 Parken/Deck | 3 Verkehr/Infra | 4 Umwelt/WHG | 5 Sicht/Design | 6 Reparatur/Verguss |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| NEODUR HE 40 | ● | ● | – | – | – | – |
| NEODUR HE 60 rapid | ● | ● | – | – | – | – |
| NEODUR HE 65 | ● | ● | – | – | – | – |
| NEODUR HE 65 Plus | ● | ● | ○ | ● | – | – |
| NEODUR Level | ● | ○ | – | – | ○ | – |
| TRU Self-Leveling | – | – | – | – | ● | ○ |
| KOROCRETE Schnellbeton | ● | ○ | ○ | – | – | ○ |
| CEMENT ALL | – | – | ○ | ○ | – | ● |
| MORTAR MIX | ○ | – | ○ | ○ | – | ● |
| DOT Europe Concrete Mix | ○ | ● | ● | ○ | – | ● |
| ASPHALT REPAIR MIX | – | ○ | ● | – | – | ○ |
| System Rapid Set Concrete | ○ | ○ | ● | – | – | ○ |

**Lesart:**
- Cluster 1 + 2 ziehen fast dasselbe Set (HE-Familie) → Kandidaten für Zusammenlegung.
- Cluster 3, 4, 5 sind trennscharf — jeder zieht ein anderes Produktset.
- Cluster 6 zieht das Mörtel-Set + DOT, überschneidet sich mit keinem Flächen-Cluster sauber → Sonderbehandlung nötig.

---

## 5 Offene Entscheidungen fürs Team-Review

1. **Reparatur/Verguss (Cluster 6):** Eigener Einstieg ganz oben (ganze Fläche neu vs. punktuell reparieren) — *oder* 6. Kachel neben den Flächen — *oder* Ableitung über die Schichtdicken-/Detailfrage? Dies entscheidet die gesamte Funnel-Architektur. (Anschluss an Dimension 1 „Art der Maßnahme" der April-Taxonomie, die `punktuelle-reparatur` bereits als eigenen Wert führt.)
2. **Parken (Cluster 2):** Eigener Pfad wegen Tausalz/Frost, oder unter Industrie-Halle führen und Tausalz als Zusatzkriterium abfragen?
3. **innen/außen:** Als leichter Toggle/Chip (empfohlen) statt eigener Branchen-Ebene — bestätigen?
4. **Anwendungsart ableiten statt abfragen:** Bestätigung, dass der Kunde nur die Fläche/Belastung wählt und die Produktfamilie automatisch resultiert.

---

## 6 Methodik / Belegbasis

Quelle sind die `ANWENDUNG`- und `EIGENSCHAFTEN`-Abschnitte aller 12 TDS, ergänzt um die technische Extraktion in `TDS_Extraktion_Review_2026-06-01.md`. Die Cluster sind bottom-up aus den genannten Einsatzorten gebildet, nicht top-down aus Branchen. Jeder Cluster ist über die wörtlichen TDS-Nennungen in §3 belegbar.

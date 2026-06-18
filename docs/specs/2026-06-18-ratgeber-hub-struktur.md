# Ratgeber-Hub — Strukturvorschlag (2026-06-18)

Zu Issue #284. Begleit-Mockup: `docs/mockups/Ratgeber-Hub-Mockup.html`.

## Ausgangslage

Ratgeber ist aus dem Hauptmenü in den Footer gewandert (PR #283) und damit der zentrale Einstieg in alle Fachartikel. Aktuell existieren drei getrennte, flache Hubs (generische `ArtikelHub`-Komponente), ohne Gruppierung, ohne Filter, ohne Grafik auf den Karten:

| Hub | Route | Artikel | Charakter |
| :-- | :-- | :-- | :-- |
| Ratgeber | `/ratgeber` (`content/artikel`) | 8 | gemischt: Neubau, Entscheidung, FAQ |
| Lösungen nach Branche | `/branchen` (`content/branchen`) | 7 | Anwendung nach Sektor |
| Schadensbilder | `/schadensbilder` (`content/schadensbilder`) | 5 | Sanierungs-Einstieg über Symptom |

**20 Fachartikel gesamt.** Zwei Befunde:
1. **Neubau ist dünn abgedeckt** — nur 3 echte Neubau-Artikel (`neubau-systemwahl`, `neubau-sichtboden`, `neubau-wirtschaftlichkeit`) plus `einstreuung-vs-schicht`. Sanierung ist deutlich breiter (5 Schadensbilder + FAQ + TCO + Sperrzeit).
2. **Grafiken fehlen** auf allen 15 Nicht-Schadensbild-Artikeln (#282).

## Leitidee

Der Ratgeber wird **ein Dach über alle Fachartikel**, organisiert nach **Einstiegsachsen** (was will der Besucher tun?), nicht nach Verzeichnisstruktur. Der Bestand trägt natürlich drei Achsen plus eine Querschnittskategorie:

1. **Projektphase / Aufgabe** — Neubau vs. Sanierung
2. **Schadensbild** — Sanierungs-Einstieg über das Symptom (eigener Sub-Hub)
3. **Branche / Anwendung** — Neubau + Sanierung nach Sektor (eigener Sub-Hub)
4. **Wirtschaftlichkeit & Entscheidung** — quer (TCO, Sperrzeit, Beratung)

## Empfehlung zur offenen #284-Frage

**Hybrid statt Auflösung.** Schadensbilder und Branchen behalten ihre eigenen Sub-Hubs (eigene URLs, eigener SEO- und Funnel-Wert, situativ in Bereichsseiten einbindbar), werden im Ratgeber-Dach aber als Themen-Cluster mit-angeteasert. Der Ratgeber ist die **filterbare Gesamtsicht**, die Sub-Hubs sind die fokussierten Tiefen-Einstiege. Kein Content wird dupliziert, nur Teaser/Verweise.

**Warum nicht auflösen:** Einstiege wie „Industrieboden Lebensmittelindustrie" oder „Risse im Industrieboden sanieren" haben eigenständigen Such- und Vertriebswert und werden in die Bereichsseiten eingebaut. Sie brauchen stabile eigene URLs. Sie im Ratgeber aufzulösen würde diese Einstiege schwächen.

## IA-Modell (eine Ratgeber-Seite)

```
Kopf:        Titel · Intro · Suchfeld
Filterleiste: [ Alle ] [ Neubau ] [ Sanierung ] [ Wirtschaftlichkeit ] [ Branche ] [ Schadensbild ]
Inhalt:      bei „Alle"  → thematisch gruppierte Sektionen (siehe unten)
             bei Filter  → flache Trefferliste über alle Themen
```

**Sektionen bei „Alle":**

1. **Neubau planen** (4): `neubau-systemwahl`, `neubau-sichtboden`, `neubau-wirtschaftlichkeit`, `einstreuung-vs-schicht` — plus sichtbarer „Neubau ausbauen"-Platzhalter (Lücke bewusst zeigen).
2. **Sanieren: Schaden erkennen** (6): die 5 Schadensbilder + `betreiber-faq` — mit Verweis-Karte auf `/schadensbilder`.
3. **Wirtschaftlichkeit & Entscheidung** (3): `wirtschaftlichkeit-tco`, `sperrzeit-belastbarkeit`, `beratungstrigger`.
4. **Lösungen nach Branche** (7): die Branchen-Artikel — mit Verweis-Karte auf `/branchen`.

**Karte:** Grafik (16:9) · Titel · Teaser (erster Absatz, automatisch) · „Weiterlesen". Grafik aus `bild`-Frontmatter (#282); fehlt sie, dezenter Platzhalter mit Hinweis statt Lücke.

## Themen-Zuordnung (Filter-Tags)

Vorschlag je Artikel (mehrfach möglich). Wird als `themen:`-Frontmatter gepflegt — Werte aus fester Liste `neubau · sanierung · wirtschaftlichkeit · branche · schadensbild`:

| Artikel | themen |
| :-- | :-- |
| neubau-systemwahl | neubau |
| neubau-sichtboden | neubau |
| neubau-wirtschaftlichkeit | neubau, wirtschaftlichkeit |
| einstreuung-vs-schicht | neubau |
| risse / abrieb-verschleiss / chemischer-angriff / feuchte-whg / absandung-festigkeitsverlust | sanierung, schadensbild |
| betreiber-faq | sanierung |
| wirtschaftlichkeit-tco | sanierung, wirtschaftlichkeit |
| sperrzeit-belastbarkeit | sanierung, wirtschaftlichkeit |
| beratungstrigger | sanierung, wirtschaftlichkeit |
| (alle 7 Branchen) | branche |

## Neubau-Lücke — Content-Backlog

Kandidaten zum Ausbau (mit Technik abstimmen, je eigenes Issue):

- Hartstoffeinstreuung: Verfahren und Ablauf im Neubau
- Sichtestrich / Designboden im Neubau (Anschluss an `/bereiche/sichtestrich`)
- Oberflächenschutz und Nachbehandlung im Neubau
- Anforderungen und Normen im Neubau (EN 13813, Beanspruchungsklassen)
- Fugen und Detailausbildung

Der Mockup zeigt in der Neubau-Sektion einen Platzhalter-Slot, damit die Lücke im Layout sichtbar bleibt, bis die Artikel da sind.

## Technische Umsetzung (Static Export)

- **Filter + Suche client-seitig** (`useState`): alle Artikel werden zur Build-Zeit eingelesen, Filtern/Suchen passiert rein im Browser. Bei ~20 Artikeln kein Suchindex nötig (Titel/Teaser-Substring genügt).
- Neue/erweiterte Komponente `RatgeberHub` (oder `ArtikelHub` erweitern um Gruppierung + Filter + Grafik).
- Neues Frontmatter-Feld `themen` (Filter) und `bild`/`bildAlt` (über #282). Optional `lesezeit` (automatisch aus Wortzahl).
- Branchen + Schadensbilder bleiben eigene Routen; der Ratgeber zieht ihre Teaser über `getSlugs`/`getArtikel` quer.

## Offene Entscheidungen für Steffi

1. Hybrid bestätigen (Sub-Hubs bleiben) — oder doch alles unter Ratgeber auflösen?
2. Sektions-Reihenfolge: Neubau zuerst (Wachstumsfokus) oder Sanierung zuerst (mehr Content / Kerngeschäft)?
3. Neubau-Backlog: welche der Kandidaten-Themen priorisieren?

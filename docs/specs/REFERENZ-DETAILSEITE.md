# Referenz-Detailseite — Implementierungs-Spec

> Ablageort im Repo: `docs/REFERENZ-DETAILSEITE.md`
> Repo: https://github.com/sfleischmann-3steps2/KORODUR-Sanierung_app
> Visuelle Referenz: `Referenz-Seite_Mockup.html` (v2) im Projektordner
> Stand: 2026-06-02

## 1. Zweck & Datenquelle

Die Detailseite (`/de/referenzen/[slug]/`) rendert eine einzelne Referenz. Datenquelle ist aktuell `data/referenzen.ts`; Zielbild: Sync aus dem Notion-Referenzverzeichnis (Qualitätsstufe = „Veröffentlichungsreif", Freigabe öffentlich). Die Felder unten sind der **Datenvertrag** und entsprechen den Notion-Properties.

## 2. Datenvertrag (Felder)

| Feld | Typ | Pflicht | Quelle (Notion) |
|---|---|---|---|
| `slug` | string | ✓ | abgeleitet aus Objekttitel |
| `title` | string | ✓ | Objekttitel |
| `claim` | string | ✓ | Subline/Claim |
| `category` | enum | ✓ | Einsatzbereich (1. Wert für Badge) |
| `projectType` | enum | ✓ | Projekttyp (Neubau/Sanierung/…) |
| `location` | string | ✓ | Ort (+ Land) |
| `year` | number | – | Baujahr |
| `area` | string | – | Fläche |
| `quantity` | string | – | Eingebaute Menge |
| `products` | Produkt[] | ✓ | Produkt-Relation → Produkt-DB (Name, Norm, Specs, Bild, URL) |
| `metrics` | {value,label}[] | – | aus Erreichte Kennwerte / Ausführungszeit |
| `images.vorher/nachher` | img | – | Medien |
| `images.gallery` | img[] | – | Medien |
| `situation` | richtext | – | Ausgangssituation |
| `challenges` | string[] | – | Herausforderung (Bullets) |
| `solution` | richtext | ✓ | Warum KORODUR / Lösung |
| `installation` | {label,value}[] | – | Verarbeiter, Einbaudatum, Menge, erreichte Werte |
| `result` | richtext | – | Ergebnis / Wirkung |
| `longterm` | richtext | – | Langzeit-Beobachtung |
| `sustainability` | richtext + facts | – | nur wenn echt (EPD/CO₂/LEED) |
| `parties` | {role,name}[] | – | Betreiber/Verarbeiter/GU/Architekt |
| `releaseStatus` | enum | ✓ | Freigabestatus (steuert Namensanzeige) |

## 3. Seitenaufbau (Block-Reihenfolge)

Reihenfolge aus Interessenten-Sicht. **`render if`** = Block nur anzeigen, wenn Bedingung erfüllt.

1. **Breadcrumb** — Home / Referenzen / {title}.
2. **Titelblock** — Badge(category) + optional Badge(projectType) + optional Freigabe-Hinweis; H1=title; claim; lead (kurzbeschreibung). *immer*
3. **Vorher/Nachher** — zwei Bilder nebeneinander (je ~50 %). `render if` Projekttyp = Sanierung UND beide Bilder vorhanden. Bei Neubau stattdessen „Einbau / Ergebnis" labeln; fehlt alles → Block weg.
4. **Eckdaten + Kennwerte** — links Eckdaten-Karte (Ort, Baujahr, Fläche, Projekttyp, Produkt-Chips, PDF-Button), rechts Kennwert-Kacheln. Eckdaten-Zeilen mit leerem Wert ausblenden. Kennwert-Block `render if` metrics.length > 0.
5. **Bildergalerie** — Thumbnails. `render if` gallery.length > 0.
6. **Ausgangssituation & Herausforderung** — `render if` situation ODER challenges vorhanden.
7. **Unsere Lösung** — solution + Produktlink, optional halbbreites Bild. *immer* (Pflichtfeld).
8. **Umsetzung & Kennwerte** — installation-Tabelle; leere Zeilen ausblenden. `render if` mind. 1 Wert.
9. **Ergebnis & Wirkung** — result + optional longterm. `render if` result vorhanden.
10. **Nachhaltigkeit** — `render if` sustainability vorhanden (nur wenn echt).
11. **Eingesetzte Produkte** — pro Produkt: Bild (links, ≤ Hälfte) + Name/Norm/Specs/Normen/Link. Daten aus Produkt-DB. *immer* (Pflichtfeld).
12. **Beteiligte** — Rolle/Name. `render if` mind. 1 nennbarer Beteiligter (siehe §4 Anonymisierung).
13. **Verwandte Referenzen** — 3 Karten (§6). *immer wenn vorhanden*.
14. **CTA** — Berater kontaktieren / Alle Referenzen. *immer*.

## 4. Globale Regeln

- **Konditionales Rendern (Kernregel):** Jeder optionale Block und jede Eckdaten-Zeile wird nur gerendert, wenn das Feld befüllt ist. Niemals „fehlt"/leere Platzhalter nach außen.
- **Bilder:** kein vollflächiges Hero. Einzelbild max. ~50 % Breite auf Desktop; Bildpaare als 2-Spalten-Grid. Auf Mobil (≤ 820 px) brechen alle Bildspalten auf volle Breite um.
- **Anonymisierung über `releaseStatus`:**
  - `Öffentlich` → Namen anzeigen.
  - `Öffentlich (anonymisiert)` → Beteiligte nur als generische Rolle („internationale Spedition", „Generalunternehmer", „ausführende Fachfirma"); `location` ggf. vergröbert; Titel ohne Klarnamen.
  - `Intern` / `Freigabe offen` → Seite nicht öffentlich rendern (aus dem Build ausschließen).
- **Texte:** keine em-dashes (— / –); Doppelpunkt/Komma/Punkt verwenden.

## 5. Responsive & Design-Tokens

- Farben: Navy `#002d59`, Cyan `#00a9e0` (dunkel `#0079a3`), Fläche-BG `#f4f6f8`, Linien `#e2e8ef`. Schrift: Arial/Helvetica.
- Breakpoint: `820px` → einspaltig (Hero-Paar, Infobar, Text+Bild, Metrics, Produkt-Layout stapeln; Galerie 2-spaltig).
- Container max. ~1080 px.
- Badges/Tags: Text in dunkler Variante derselben Farbfamilie, nie reines Schwarz.

## 6. Verwandte Referenzen (Filterlogik)

Priorität: (1) gleicher Einsatzbereich UND gleiches Produkt, (2) gleicher Einsatzbereich, (3) gleiches Produkt. Max. 3 Karten. Setzt sauberes Einsatzbereich-Tagging + Produkt-Relation voraus.

## 7. Akzeptanzkriterien

- Eine dünn gepflegte Referenz (nur Pflichtfelder) rendert ohne leere Blöcke sauber.
- Eine vollständige Referenz (z. B. Brummer) zeigt alle Blöcke inkl. Vorher/Nachher, Kennwerte, Ergebnis, Beteiligte.
- Ein Neubau (z. B. Fiorini) zeigt kein „Vorher", aber Nachhaltigkeitsblock.
- Eine anonymisierte Referenz zeigt keine Klarnamen.
- Kein Bild größer als halbe Breite auf Desktop; mobil volle Breite.
- Lighthouse: Bilder lazy-loaded, Alt-Texte aus Bildunterschriften.

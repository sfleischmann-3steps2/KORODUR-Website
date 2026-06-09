---
name: korodur-referenz
description: Erstellt KORODUR One-Page-Referenzen (Word/PDF) im reduzierten Sidebar-Layout mit verbindlicher Drei-Akt-Story (Ausgangslage / Aufgabe / Lösung bzw. Situation / Challenge / Solution für EN). Mini-Logo oben rechts, Headline links (optionale Subline), Vorher/Nachher-Hero mit Sidebar-Karte, drei beschriftete Fließtext-Absätze, Bildstreifen und schmaler Footer mit QR-Code. Nutze diesen Skill, wenn Steffi (oder jemand bei KORODUR) eine Referenz, Case Study, ein Anwendungsbeispiel oder einen Projektbericht als One-Pager erstellen will. Trigger-Phrasen: „Referenz", „Case Study", „Anwendungsbeispiel", „Projektbericht", „One-Pager", „Teaser". Nicht für Memos, Berichte oder Konformitätserklärungen, dafür `korodur-docx` verwenden.
---

# KORODUR One-Page-Referenz erstellen

Dieser Skill erzeugt eine Referenz im reduzierten Sidebar-Layout mit verbindlicher Drei-Akt-Story. Im Unterschied zum allgemeinen `korodur-docx` ist hier alles auf eine Seite getrimmt: Mini-Logo statt Briefkopf, schmaler einzeiliger Footer, weiche Sidebar-Karte statt Gittertabelle, QR-Code rechts unten.

## Wann diesen Skill verwenden

- Anfragen wie „Mach mir eine Referenz/Case Study/Anwendungsbeispiel zu…"
- One-Page-Teaser für Vertrieb, Außendienst, Messe-Handout
- Lange Mehrseiten-Version: später, v1 fokussiert auf den 1-Seiter

## Layout (gesetzt, nicht verhandeln)

1. **Header-Strip:** Eyebrow (Versalien, klein), Headline darunter (15 pt Navy bold), Mini-KORODUR-Logo rechts auf gleicher Höhe. **Subline ist optional**: nur einsetzen, wenn die Headline ohne Pointe zu nackt wirkt. Bei Brummer weggelassen, weil „15 m²" schon in der Sidebar steht.
2. **Divider:** schmale Linie in `#D0D5E0`.
3. **Hero + Sidebar:** Heldbild links (~60 % Breite). Zwei Varianten:
   - `hero_path=...` für **ein einzelnes Bild** (z. B. ein Combo-Bild Vorher+Nachher in einer Datei, so wie bei Brummer v8).
   - `hero_pair=(vorher, nachher)` für **zwei Bilder nebeneinander** (je 50 %).
   Daneben die Sidebar-Karte mit Navy-Stripe. Sidebar enthält **immer** zuerst einen Produkt-Block (Pflicht: KORODUR-Produktname + 1-Zeilen-Claim aus Datenblatt), dann einen Trenner, dann die übrigen Schlaglichter unter „Auf einen Blick" (Auftrag, Fläche, Frequenz/Auftragsstärke/Bauzeit, Beobachtung). Bildunterschriften „Vorher · MM/YYYY" und „Nachher · MM/YYYY" datiert. **Sidebar-Werte einzeilig halten**, sonst wird die Karte zu hoch und drückt den Rest auf Seite 2.
4. **Drei-Akt-Story (Fließtext):** drei beschriftete Mini-Absätze. **Keine Lead-Box, keine fett gesetzten Vorspann-Blöcke.** Aufbau:
   - **Ausgangslage** (DE) / **Situation** (EN): Wo, was, warum kritisch? (2 bis 4 Sätze)
   - **Aufgabe** (DE) / **Challenge** (EN): Welcher Konflikt, welche Constraint macht's schwer? (2 bis 4 Sätze)
   - **Lösung** (DE) / **Solution** (EN): Was wurde gemacht und mit welchem Ergebnis? (3 bis 5 Sätze, endet mit Kicker)
5. **Bildstreifen:** 3 bis 5 Bilder mit datierten Bildunterschriften, Schema Vorher → Verarbeitung → Nachher. Bei 4 oder 5 Bildern: zweireihig (3 + 2 oder 3 + 1). **Wichtig**: alle Bilder im **Querformat** liefern (Hochformat sprengt die Seite). Falls Originale EXIF=6 haben (Smartphone-Aufnahmen), vorab manuell auf Querformat zuschneiden, der Skill macht das nicht automatisch.
6. **Word-Footer:** einzeilig, klein (8 pt Dunkelblau). Firma · Adresse · Tel · Web links. Rechts: optionaler CTA-Text mit Abstand zum QR-Code. **Firmenzeile in der Default-Form** (kompakt: „Wernher-von-Braun-Str. 4", Telefon ohne Spaces), sonst bricht der Footer in zwei Zeilen.

## Drei-Akt-Story (Schreibanleitung)

Die Sektionen folgen der Minto-Pyramid-Logik **Situation / Complication / Recommendation (SCR)**. Jede Sektion hat innen eine eigene Mini-Dramaturgie, nicht nur eine Aufzählung.

| Label DE / EN | SCR-Rolle | Was reingehört | Was nicht reingehört |
|---|---|---|---|
| **Ausgangslage** / **Situation** | Situation | Ort, baulicher Zustand, Beanspruchung, was alles davon abhängt. Konkrete Zahl früh setzen (Fläche, Frequenz). | Lösungsversprechen, Produktnamen, „Glücklicherweise…". |
| **Aufgabe** / **Challenge** | Complication | Warum es schwierig ist: Constraint, Stakes, Kostenfolge bei Nichtstun. Spannungsaufbau. | Erste Lösungsschritte, Produkt, Methode. |
| **Lösung** / **Solution** | Recommendation | Was wurde gemacht (Methode, Produkt, Ablauf), und was kam dabei raus (Resultat, Beobachtung nach X Monaten). Letzter Satz ist Kicker, knapp und konkret. | Allgemeine Marketingaussagen, Produkt-Datenblatt-Sätze. |

**Stilregeln:**
- Produktname mindestens einmal in der „Lösung" wörtlich nennen.
- Keine em-dashes (— / –). Stattdessen Doppelpunkt, Punkt oder Komma.
- Anonymisierung ist Default (siehe Anti-Patterns), Klarnamen nur auf explizite Freigabe.
- Labels werden inline fett gesetzt („**Ausgangslage:** …"), keine eigenständigen Überschriften.
- Textfarbe ist durchgängig DARKBLUE (`#1E3A5F`), kein Schwarz. Grau nur für Eyebrow, Sidebar-Labels und Bildunterschriften.

## Pflicht: Produkt benennen

Eine KORODUR-Referenz ohne Produktname ist keine Referenz. Vor dem Bauen den Produktnamen aus dem Datenblatt klären, technische Kennwerte (Druckfestigkeit, Verkehrsfreigabe etc.) für die Sidebar mitnehmen. Wenn die Story-Quelle (Notion) den Produktnamen nicht eindeutig nennt oder mit den Bildern nicht zusammenpasst, bei Steffi nachfragen, nicht raten.

## So gehst du vor

1. **Inhalte aus Notion holen** und Pflichtfelder aus der „Was macht eine perfekte KORODUR-Referenz aus"-Checkliste prüfen.
2. **Bilder kuratieren** und anonymisierungs-konform machen: ein Hero-Bild (Combo Vorher+Nachher) oder Hero-Paar, 3 bis 5 weitere für den Streifen, alle datiert, alle **Querformat**. Bei Smartphone-Aufnahmen mit EXIF-Drehung vorab korrekt orientieren oder zuschneiden.
3. **Drei-Akt-Story schreiben**: Ausgangslage/Situation, Aufgabe/Challenge, Lösung/Solution. Vor dem Rendern gegen die obige Tabelle checken.
4. **Slug definieren** in kebab-case (z. B. `brummer-lkw-zufahrt`).
5. **DOCX rendern** mit `KorodurRef` (siehe Beispiel unten).
6. **PDF-Preview erzeugen** mit LibreOffice und Layout verifizieren: 1 Seite, Logo komplett auf der Seite, Footer einzeilig, QR scharf, Body-Text in DARKBLUE.

## Beispiel: Brummer v8 (DE)

```python
import sys
sys.path.insert(0, "<ABSOLUTER_PFAD_ZUM_SKILL>/scripts")
from korodur_referenz import KorodurRef

ref = KorodurRef()

ref.header(
    eyebrow="Referenz · Logistikzentrum",
    headline="Schnellbeton extrem: Schwerlastbereit in 2 Stunden",
    # subline ist optional: bei Brummer weglassen.
)
ref.divider()

ref.hero_with_sidebar(
    # Combo-Bild Vorher+Nachher in einer Datei (querformat):
    hero_path="bilder/hero_vorher_nachher.jpg",
    hero_captions=("Vorher · 10/2024", "Nachher · 03/2026"),
    product="Rapid Set Concrete",
    product_claim="Schnellbeton: Verkehrsfreigabe ca. 2 h nach Einbau",
    facts=[
        ("Auftrag",      "Stahlbetonplatten in voller Stärke"),
        ("Fläche",       "ca. 15 m² (Engstelle Einfahrt)"),
        ("LKW-Frequenz", "> 100 / Tag"),
        ("Beobachtung",  "9 Monate Volllast: perfekte Funktion"),
    ],
)

# Drei-Akt-Story: KEIN ref.lead() mehr.
ref.labeled_paragraph(
    "Ausgangslage:",
    "Im eingeengten Einfahrtsbereich eines Logistikzentrums liegen genau "
    "15 Quadratmeter, an denen alles hängt. Hier passiert jeder LKW, bei "
    "mehr als 100 Fahrzeugen täglich. Schwerlastverkehr und Witterung hatten "
    "diese eigentlich neu gebaute Fläche deutlich geschädigt."
)
ref.labeled_paragraph(
    "Aufgabe:",
    "Es gibt Sanierungsfälle, bei denen die zu erneuernde Fläche groß ist. "
    "Und es gibt diesen: klein, aber strategisch. Sperren keine Option, denn "
    "eine konventionelle Komplettsanierung hätte das Logistikzentrum "
    "lahmgelegt, und jeder Tag Stillstand kostet viel Geld."
)
ref.labeled_paragraph(
    "Lösung:",
    "Stahlbetonplatten in voller Stärke. KORODUR Rapid Set Concrete wurde "
    "direkt vor Ort gemischt und verbaut. Beton einbringen, verdichten, "
    "abziehen, glätten: nach rund zwei Stunden war die Engstelle wieder "
    "verkehrsfrei. Nach 9 Monaten Volllast: perfekte Funktion an genau "
    "der Stelle, an der sie zählt."
)

ref.image_strip_grid([
    [("bilder/streifen_1.jpg", "Vorher · 10/2024"),
     ("bilder/streifen_2.jpg", "Neueinbau · 06/2025"),
     ("bilder/streifen_3.jpg", "Neueinbau · 06/2025")],
    [("bilder/streifen_4.jpg", "Neueinbau · 06/2025"),
     ("bilder/streifen_5.jpg", "Nachher · 03/2026")],
])
ref.footer(
    url="https://korodur.de/referenzen",
    cta_text="Mehr Referenzen",
)
ref.save("/Users/.../KORODUR_Referenz_Brummer_v8_DE.docx")
```

## Beispiel: Brummer v8 (EN)

Für eine englische Variante: Eyebrow „Case Study · …", Drei-Akt-Labels werden zu **Situation / Challenge / Solution**, Bildunterschriften zu „Before / New placement / After", Footer-CTA zu „More case studies". Achtung: englische Body-Texte sind oft länger als deutsche, daher Sidebar-Werte besonders kompakt halten (z. B. „Full-thickness reinforced slabs" statt „Reinforced concrete slabs, full thickness"), sonst rutscht die zweite Bildreihe auf Seite 2.

```python
ref.header(
    eyebrow="Case Study · Logistics Hub",
    headline="Rapid concrete, heavy-duty in 2 hours",
)
ref.divider()
ref.hero_with_sidebar(
    hero_path="bilder/hero_before_after.jpg",
    hero_captions=("Before · 10/2024", "After · 03/2026"),
    product="Rapid Set Concrete",
    product_claim="Rapid-set concrete: traffic-ready approx. 2 h after placement",
    facts=[
        ("Scope",           "Full-thickness reinforced slabs"),
        ("Area",            "approx. 15 m² (entrance bottleneck)"),
        ("Truck frequency", "> 100 / day"),
        ("Observed",        "9 months full load: flawless performance"),
    ],
)
ref.labeled_paragraph("Situation:", "...")
ref.labeled_paragraph("Challenge:", "...")
ref.labeled_paragraph("Solution:",  "...")
# ... image_strip_grid mit "Before / New placement / After"
ref.footer(url="https://korodur.de/references", cta_text="More case studies")
```

## Bildvorbereitung (wichtig!)

- **Format**: Bildstreifen-Bilder müssen Querformat sein. Auch wenn die Originale EXIF=6 (gedreht) haben: vorab korrekt orientieren und ggf. als Querformat zuschneiden.
- **Auflösung**: max. ca. 1600 px Längsseite reicht, sonst wird die DOCX unnötig groß. Der Skill normalisiert selbst auf 1600 px und wendet EXIF-Transpose an (über `_orient()`).
- **Combo-Hero**: für den Hero hat sich in v7/v8 ein **zusammengesetztes Vorher+Nachher-Bild in einer Datei** als optisch ruhig erwiesen. Alternative: `hero_pair=(vorher, nachher)` mit zwei separaten Bildern.
- **Master-Archive pro Case**: kuratierte Bildauswahl pro Referenz behalten (z. B. `Brummer_v7_master/`), damit künftige Updates die schon perfekten Versionen weiterverwenden können.

## Abhängigkeiten

- Python 3.9+
- `python-docx`, `qrcode`, `Pillow` (alle via `pip install … --break-system-packages`)
- LibreOffice (`soffice`) für die PDF-Vorschau

## Anti-Patterns

- **Kein Lead-Block** mehr (4-zeiliger fetter Vorspann vor den drei Labels): wirkt wie eine zweite, lange Headline und ist redundant zur Drei-Akt-Story. `ref.lead(...)` nicht verwenden.
- **Kein Subline-Zwang**: nur einsetzen, wenn sie wirklich neue Information bringt. Bei starken Headlines weglassen.
- **Keine em-dashes** (— / –) im Fließtext oder in Captions.
- **Kein Schwarz im Body-Text**: durchgängig DARKBLUE. Grau bleibt für Eyebrow, Labels, Captions reserviert.
- **Keine Hochformat-Bilder im Bildstreifen**: sprengt die Seite und macht das Layout uneinheitlich.
- **Kein langer Sidebar-Wert** (über eine Zeile): macht die Sidebar-Karte unnötig hoch und drückt den Bildstreifen auf Seite 2.
- **Keine erweiterte Default-Firmenzeile** (mit „International GmbH · Wernher-von-Braun Str. 4" mit Leerzeichen oder Telefon mit Spaces): bricht den Footer in zwei Zeilen. Default-Form behalten oder explizit kürzere `company_line=...` übergeben.
- Kein Briefkopf-Layout aus `korodur-docx` recyceln, die Adresszeile gehört nicht in den Header.
- Keine Gitter-Tabellen für „Auf einen Blick", immer die Sidebar-Karte.
- Keine Bilder mit Gesichtern, Klarnamen oder fremden Logos (Anonymisierungs-Default).
- Headline nicht länger als 2 Zeilen, sonst kollidiert sie mit dem Logo.
- Drei-Akt-Story nicht zu einer einzigen Spalte „Aufgabe + Lösung" zusammenziehen: die Trennung Ausgangslage/Situation, Aufgabe/Challenge, Lösung/Solution ist verbindlich, weil sie sowohl Layout-Anker als auch Schreibanleitung ist.

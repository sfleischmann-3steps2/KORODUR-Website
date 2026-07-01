# Reconciliation Website ↔ RV-Notion (Befunde)

**Stand:** 2026-07-01 · Track 2 zu #327 · Quelle: Notion-MCP (read-only) gegen die RV-Master-DS
`collection://2e7670e1-9e1a-80d1-b73d-000b26167428`.

## Methode

SQL-Aggregate + Stichproben gegen die RV-Master-Data-Source. Match-Schlüssel App ↔ RV ist die
Spalte `Website` (trägt den alt-korodur.de-Slug, z. B.
`https://www.korodur.de/referenzen/instandsetzung-flughafen-zagreb/`).

## Coverage RV-Master (163 Einträge)

| Feld | belegt | Anteil |
|---|---|---|
| `Website` (Harvest-Link) | 130 | 80 % |
| `Herausforderung` (DE) | 140 | 86 % |
| `Kurzbeschreibung` (DE) | 155 | 95 % |
| `Ausgangssituation` (DE) | 126 | 77 % |
| `Ergebnis / Wirkung` (DE) | 36 | 22 % |
| `Freigabestatus` gesetzt | 40 | 25 % |
| `Qualitätsstufe` | überwiegend „Rohdaten" | |

## Kernbefunde

1. **Die RV hat bereits strukturierte DE-Drei-Akt-Texte** (Ausgangssituation + Herausforderung +
   Kurzbeschreibung) für den Großteil der 130 Harvest-Refs. Das ist ein anderes, oft **reicheres**
   Format als die Website-Legacy-Triade (herausforderungen/loesung/vorteile). Beispiel
   `olympiastadion-berlin`: RV-`Ausgangssituation` = 1124 Zeichen.
2. **Die RV ist ein Roh-Harvest, nicht publikationsreif.** Qualitätsstufe überwiegend „Rohdaten",
   `Freigabestatus` nur bei 40/163 gesetzt, `Ergebnis/Wirkung` nur bei 36. Die RV wird noch vom
   RV-Team kuratiert (Status → Veröffentlichungsreif → Freigabe).
3. **EN/FR liegen in der separaten Übersetzungs-DB** „Referenz-Übersetzungen"
   (`collection://172a9b0f-3b17-4d9a-8d4b-294d37d48238`, DB `281f7a9d-173a-4792-914d-b73711307406`).
   Coverage: **EN 131 + FR 128 Zeilen, alle „Muttersprachler-geprüft", Quelle Website-Harvest.**
   Felder je Sprache: Objekttitel übersetzt, Kurzbeschreibung, Ausgangslage, Aufgabe, Lösung/Ergebnis.
4. Die dritte Master-Data-Source `collection://2ec670e1…` ist die **Produktdatenbank** (Ziel der
   Relation `🚧 Kern Produktdaten`), nicht die Übersetzungen.

## Finale Richtung (Steffi, 2026-07-01): RV → Website

Die RV-Texte sind **gecrawlt, erweitert und von Technik inhaltlich geprüft** (nur für die Refs, die
schon auf der alten Website waren). Steffi hat diese **130 Referenzen auf Freigabestatus „Öffentlich"**
gesetzt (bestätigt per Query: Öffentlich = 130, Freigabe offen = 9, ohne = 22). Diese 130 sind das
**V1-Set**; alle anderen kommen erst zum Launch Mitte September (vorher inhaltliche Prüfung).

Damit ist die RV die **autoritative Content-Quelle** für die V1-Referenzen, und die Richtung ist
**RV → Website** (nicht umgekehrt):

- **DE:** Master-Story-Felder (Technik-geprüft) → Website. Das **ersetzt** die frühere
  Website-Triade inkl. #327-Veredeln für diese Refs (RV-Inhalt ist geprüft und reicher).
- **EN/FR:** Übersetzungs-DB (Muttersprachler-geprüft, Harvest) → Website-i18n. Das **ersetzt** die
  qualitativ schlechten App-i18n-EN/FR.
- Das #327-Veredeln bleibt Zwischenstand, bis die geprüften RV-Texte gezogen sind.

## Offen (Entscheidung Steffi)

1. **Story-Shape:** Website auf das RV-Drei-Akt-Modell heben (ausgangssituation/herausforderung/
   loesung/kennwerte/ergebnis, die die Detailseite bereits rendert) oder auf die Legacy-Triade mappen?
2. **Scope:** V1-Website zeigt nur die 130 Öffentlichen (die übrigen der aktuellen 142 bis September
   ausblenden)? Reconcile 142 ↔ 130 nötig.
3. **Vorgehen:** Sample-Import (3-5 Refs RV→Website) zur Ansicht, dann skalieren.

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
3. **EN/FR liegen NICHT im Master.** `Sprachen veröffentlicht` ist durchgehend leer. Die
   Übersetzungen leben in einer **separaten Übersetzungs-DB** (laut `schema-v1.md` §6: 259 EN/FR-Zeilen),
   die kein Data-Source des Masters ist (DB-ID noch zu ermitteln, via Notion-Suche „Referenz-Übersetzungen").
4. Die dritte Master-Data-Source `collection://2ec670e1…` ist die **Produktdatenbank** (Ziel der
   Relation `🚧 Kern Produktdaten`), nicht die Übersetzungen.

## Konsequenz für das Rückspielen (Reframe der D3-Entscheidung)

Die ursprüngliche Annahme „Website ist frischer, also Website→RV" gilt nur eingeschränkt:

- **Pauschales Website→RV wäre schädlich.** Für die 104 nicht-veredelten Refs (und teils sogar für
  veredelte wie olympiastadion) ist die strukturierte RV-DE reicher als die Website-Triade. Ein
  automatischer Push würde RV-Inhalt degradieren.
- **Empfehlung:** Kein automatischer Push. Das DE-Rückspielen auf die **26 veredelten Refs
  beschränken** und dort **per-Ref vergleichen** (RV-Feld vs. Website-Feld, längeres/strukturierteres
  gewinnt), als RV-Team-kuratierter Schritt, nicht als Bulk-Write.
- **Umgekehrte Richtung ist der eigentliche Wert:** Die strukturierte RV-DE
  (Ausgangssituation/Herausforderung/Ergebnis) ist die natürliche **Quelle für die post-V1
  Drei-Akt-Anreicherung der Website** (RV→Website), sobald die RV kuratiert ist.

## Offen (Entscheidung Steffi)

1. DE-Rückspielen jetzt (nur 26 veredelte, per-Ref-kuratiert) oder erst nach RV-Kuratierung?
2. EN/FR: Übersetzungs-DB-ID bestätigen, dann Harvest-EN/FR als Website-Qualitätsfix prüfen
   (RV→Website), separat.
3. Post-V1: Drei-Akt-Anreicherung der Website aus der kuratierten RV-DE (RV→Website).

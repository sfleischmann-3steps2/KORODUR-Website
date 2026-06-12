# Zuordnung Spezialbaustoffe + Rapid Set (Sign-off Steffi/Frank)

**Stand:** 2026-06-12 | **Status:** Umgesetzt als Vorschlag, Sign-off ausstehend
**Quellen:** `extraktion-spezialbaustoffe.json`, `extraktion-rapidset-schnellbeton.json`, `Normen produkte.xlsx`

## Spezialbaustoffe — Gruppen

| Gruppe | Produkte | Bemerkung |
|---|---|---|
| Montage- & Vergusssystem (`verguss`) | NEODUR VM 1 · VM 3 · VM 5 · VB 8 · VM basic · **SVM 03** | SVM 03 hierher (Excel: Schnellvergussmörtel) statt "Selbstverlaufende Systeme" der Alt-Site — Teil-1-Entscheidung umgesetzt |
| Anker- & Injektionssystem (`anker-injektion`) | **NEODUR AM Super · AM Plus** | Offener Punkt aus Teil 1 GELÖST: Daten auf der Spezialbaustoffe-Bereichsseite gefunden (AM Super C30/37, AM Plus C40/50, je 0–1 mm). Die Industrieboden-Navigation der Alt-Site war irreführend |
| Betoninstandsetzung (`betoninstandsetzung`) | NEODUR MSM 3 · MSM 5 · MSB 8 | |
| Schnellbeton-Systeme (`schnellbeton`) | KOROCRETE (Bestand) | |

## Rapid Set — Gruppen

| Gruppe | Produkte | Bemerkung |
|---|---|---|
| Schnellreparaturmörtel (`reparaturmoertel`) | CEMENT ALL · MORTAR MIX · MORTAR MIX DUR · ASPHALT REPAIR MIX · DOT Europe CONCRETE MIX (alle Bestand) + **CONCRETE MIX (neu)** | CEMENT ALL Plus als Variante an CEMENT ALL (C55/67 aus Excel; im Scrape nicht vorhanden) |
| Schnellbeton-Systeme (`schnellbeton`) | Rapid Set Schnellbeton (Bestand) | |
| Additive (`additive`) | **CONCRETE PHARMACY (neu)** | Varianten SET Control / FLOW Control / FAST Control |

## Klassen-Konflikte Alt-Site vs. Excel (Excel als autoritativ übernommen)

| Produkt | Alt-Site-Tabelle | Excel (übernommen) |
|---|---|---|
| NEODUR VM 1 | C60/75 | **C55/67** |
| NEODUR VB 8 | C60/75 | **C55/67** |
| NEODUR SVM 03 | C45/55 | **C50/60** |
| NEODUR MSM 3 | C30/37 | **C35/45** |

✅ ENTSCHIEDEN (Steffi, 2026-06-12): Wir arbeiten mit den Excel-Werten. Die Kollegen prüfen nach Go-Live alles über die funktionierende Seite durch.

## DUROP-Befund (Frage aus Teil 1 geklärt, soweit Quelle reicht)

Kein Beleg für einen DUROP-Ankermörtel: Die DUROP-Einzelseite im Spezialbaustoffe-Scrape ist leer, die Anker-Bereichsseite nennt nur AM Super/AM Plus. Die "(Ankermörtel)"-Annotation der Produktübersicht war vermutlich eine Fehlklassifikation. DUROP bleibt wie migriert (Kunstharz-Hartstoff, Industrieboden). Restunsicherheit: Rückfrage Frank optional.

## Nicht migriert (Datenlage)

- **NEODUR PFM 1K EasyFix, PFM ZE** (Reparaturharze): Seiten leer, nur Namensnennungen — TDS/Frank nötig
- **"NEODUR Vergussmörtel Beton"**: vermutlich Sammelseite der VM/VB-Familie, kein eigenes Produkt
- **MORTAR-MIX-Schichtdicke**: Quelle widersprüchlich (10–150 vs. 15–150 mm) — Bestand unangetastet, TDS prüfen

## Sign-off

- [ ] Gruppen-Schnitt Spezialbaustoffe (4) + Rapid Set (3) OK
- [x] Klassen: Excel gilt (Steffi, 2026-06-12); Detail-Review der Kollegen über die Live-Site
- [ ] DUROP-Restfrage (Ankermörtel ja/nein) bestätigt

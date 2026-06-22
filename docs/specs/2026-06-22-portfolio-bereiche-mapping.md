# Portfolio × Bereiche — Master-Mapping (Zwei-Achsen-IA)

**Stand:** 2026-06-22 · **SoT für #306** (Master-Mapping) · speist #307/#308/#309/#140
**Quelle:** Leistungskatalog „Übersicht Portfolio Neubau u. Sanierung" (Kollegen-Dokument, 11 S., 2026-06-22) — die **autoritative** Produktart- und Neubau/Sanierung-Zuordnung.
**Rationale (Steffi + Kollege, Mail 2026-06-19/-22):** zwei orthogonale Einstiegsachsen, damit Experten und Use-Case-Nutzer je einen sauberen Weg haben.

---

## 1. Zwei Achsen

| Achse | Frage | Für wen | Quelle / Taxonomie |
|---|---|---|---|
| **A — Portfolio** | WAS stellen wir her? | Experten | Lieferprogramm-**Produktart** (12 Sektionen), korrekte Katalog-Bezeichnungen |
| **B — Bereiche** | WOFÜR / WANN? | Use-Case-/Einsteiger | **Neubau / Sanierung** × Bereich |

**Rapid Set** ist auf Achse A eine **Produktart** (Portfolio). Auf Achse B verteilen sich die Rapid-Set-Produkte in den Sammelbereich **Betonsanierung**.

### Konfliktregel (entschieden Steffi 2026-06-22)
Bei Widerspruch zwischen **Leistungskatalog-Dokument** und der Technik-Mail-Antwortrunde (2026-06-22, „kann … sein") **gewinnt das Dokument** = offizielle Positionierung. Die Mail-Aussage „technisch auch möglich" ist eine technische Fußnote (deckt sich mit Erkenntnis C4: „technisch quertauschbar, wird aber nicht angeboten") und steuert **nicht** das Bereich-Menü. Betroffene Produkte: GRANIDUR, KCF 08, NEODUR Level AU (s. Tabelle).

---

## 2. Achse A — Portfolio: 12 Produktarten (Leistungskatalog)

1. KORODUR Hartstoffe (gem. DIN 1100)
2. Industrieboden-Trockenmörtel
3. Industrieboden-Schnellestrich / -Bindemittel
4. Selbstverlaufende Industrieböden
5. Mineralische Sichtestriche
6. Haftbrücke / Grundierung
7. Nachbehandlung / Curing
8. Imprägnierung / Einpflege
9. DUROP (Zuschlag für Kunstharzsysteme)
10. Rapid Set
11. Spezialmörtel
12. MICROTOP (Trinkwasserbehälter-Instandsetzung)

→ Achse A = `/produkte` mit Produktart-Filter (#307). Bezeichnungen exakt wie Katalog.

---

## 3. Achse B — Bereichskarte (final, Steffi 2026-06-22)

- **Neubau:** Industrieboden · Sichtestrich · Spezialmörtel
- **Sanierung:** Industrieboden · Sichtestrich · Infrastruktur · Trinkwasserbehälter-Sanierung · Betonsanierung

> Ersetzt die ältere Karte in #140 („Neubau = Inbo & Designestrich; Sanierung = Inbo, TW, Infrastruktur, Betonsanierung"). Neu: **Sichtestrich auch in Sanierung** (TRU-Serie), **Spezialmörtel in Neubau**.

**Betonsanierung = Sammelbereich** für *alle* Beton-Instandhaltungsprodukte (Entscheidung Steffi 2026-06-22), nicht nur die Rapid-Set-Marke: Rapid Set + NEODUR Reparatur-/Microsilica-Spritz-/Schnellvergussmörtel (MSM/MSB, SVM 03) + KOROCRETE.

⚠️ **Begriff:** „Betoninstandsetzung" ist normativ geladen (EN 1504 / TR Instandhaltung). Bis Technik 1504-Konformität bestätigt, bleibt **„Betonsanierung"** (siehe #140).

---

## 4. Master-Tabelle Produkt × Produktart × Neubau × Sanierung × Bereich

✓ = laut Leistungskatalog. Bereich = Zielbereich auf Achse B.

### A. KORODUR Hartstoffe (DIN 1100)
| Produkt | Type | Neubau | Sanierung | Bereich |
|---|---|:--:|:--:|---|
| KORODUR Hartstoff 0/4 | CT-C70-F10-A6 | ✓ | ✓ | Industrieboden |
| KORODUR Hartstoff VS 0/5 | CT-C70-F10-A6 | ✓ | ✓ | Industrieboden |
| WH-Spezial | CT-C70-F10-A3 | ✓ | – | Industrieboden (Neubau) |
| WH-metallisch | CT-C80-F11-A3 | ✓ | – | Industrieboden (Neubau) |
| Diamantbeton | CT-C70-F10-A1,5 | ✓ | – | Industrieboden (Neubau) |

### B. Industrieboden-Trockenmörtel
| Produkt | Type | N | S | Bereich |
|---|---|:--:|:--:|---|
| HE 65 | CT-C70-F9-A6 | ✓ | ✓ | Industrieboden |
| HE 65 SVS 3 | CT-C70-F9-A3 | ✓ | ✓ | Industrieboden |
| HE 65 SVS 1,5 | CT-C70-F9-A1,5 | ✓ | ✓ | Industrieboden |
| HE 65 metallisch | CT-C80-F11-A3 | ✓ | ✓ | Industrieboden |
| HE 65 Plus | CT-C70-F9-A6 | – | ✓ | Industrieboden (Sanierung) |
| HE 65 Plus SVS 3 | CT-C70-F9-A3 | – | ✓ | Industrieboden (Sanierung) |
| HE 3 | CT-C70-F9-A6 | ✓ | – | Industrieboden (Neubau) |
| HE 3 green | CT-C70-F9-A6 | ✓ | – | Industrieboden (Neubau) |
| HE 3 SVS 3 | CT-C70-F9-A3 | ✓ | – | Industrieboden (Neubau) |
| HE 3 SVS 1,5 | CT-C70-F9-A1,5 | ✓ | – | Industrieboden (Neubau) |
| HE 3 metallisch | CT-C80-F11-A3 | ✓ | – | Industrieboden (Neubau) |
| HE 2 | CT-C70-F9-A8 | ✓ | – | Industrieboden (Neubau) |
| HE 40 | CT-C40-F6-A6 | ✓ | ✓ | Industrieboden |
| HE 40/8 | CT-C40-F6-A6 | – | ✓ | Industrieboden (Sanierung) |

### C. Schnellestrich / -Bindemittel
| Produkt | Type | N | S | Bereich |
|---|---|:--:|:--:|---|
| HE 60 rapid | CT-C60-F8-A6 | – | ✓ | Industrieboden (Sanierung) |
| HE 60 rapid SVS 3 | CT-C60-F8-A3 | – | ✓ | Industrieboden (Sanierung) |
| HE 60 rapid SVS 1,5 | CT-C60-F8-A1,5 | – | ✓ | Industrieboden (Sanierung) |
| HE 60 rapid metallisch | CT-C60-F8-A3 | – | ✓ | Industrieboden (Sanierung) |
| FSCem | CT-C40-F6 / C50-F7 | ✓ | – | Industrieboden (Neubau) |
| FSCem Screed | CT-C40-F6 | ✓ | – | Industrieboden (Neubau) |
| FSCem Basic *(noch aufnehmen, #271)* | – | ✓ | – | Industrieboden (Neubau) |

### D. Selbstverlaufende Industrieböden
| Produkt | Type | N | S | Bereich |
|---|---|:--:|:--:|---|
| NEODUR Level | CT-C40-F8-AR0,5 | – | ✓ | Industrieboden (Sanierung) |
| NEODUR Level AU | CT-C30-F5 | – | ✓ | Industrieboden (Sanierung) `[Doc-wins: Mail sagte beides]` |

### E. Mineralische Sichtestriche
| Produkt | Type | N | S | Bereich |
|---|---|:--:|:--:|---|
| KCF 05 | CT-C45-F6-A6 | ✓ | – | Sichtestrich (Neubau) |
| KCF 08 | CT-C35-F5-A6 | ✓ | – | Sichtestrich (Neubau) `[Doc-wins]` |
| GRANIDUR 05 | CT-C45-F6 | ✓ | – | Sichtestrich (Neubau) `[Doc-wins]` |
| GRANIDUR 08 | CT-C35-F5 | ✓ | – | Sichtestrich (Neubau) |
| GRANIDUR BIANCO | CT-C45-F6 | ✓ | – | Sichtestrich (Neubau) |
| GRANIDUR NERO | CT-C45-F6 | ✓ | – | Sichtestrich (Neubau) |
| TRU Self-Leveling | CT-C40-F10 | ✓ | ✓ | Sichtestrich |
| TRU PC | CT-C40-F10 | ✓ | ✓ | Sichtestrich |
| TRU SP | CT-C40-F10 | ✓ | ✓ | Sichtestrich |

> Sichtestrich-Sanierung = nur TRU-Serie (deckt die „Sichtestrich"-Kachel im Sanierungs-Pfad).

### F. Haftbrücke / Grundierung (Begleitprodukte)
| Produkt | N | S | Bereich |
|---|:--:|:--:|---|
| uniPrimer | – | ✓ | Industrieboden (Sanierung) — Begleit |
| HB 5 | – | ✓ | Industrieboden (Sanierung) — Begleit |
| HB 5 rapid | – | ✓ | Industrieboden (San.) + Betonsanierung — Begleit |
| PC | – | ✓ | Industrieboden (Sanierung) — Begleit |
| TXPK | – | ✓ | Industrieboden (Sanierung) — Begleit |

### G. Nachbehandlung / Curing (Begleitprodukte)
| Produkt | N | S | Bereich |
|---|:--:|:--:|---|
| KOROTEX | ✓ | ✓ | Industrieboden |
| KOROCURE | ✓ | – | Industrieboden (Neubau) |
| KOROMINERAL CURE | ✓ | ✓ | Industrieboden |
| easyFinish | ✓ | ✓ | Industrieboden |
| nanoFinish | ✓ | ✓ | Industrieboden |

### H. Imprägnierung / Einpflege (Begleitprodukte)
| Produkt | N | S | Bereich |
|---|:--:|:--:|---|
| KOROMINERAL | ✓ | ✓ | Industrieboden |
| KOROMINERAL Li+ | ✓ | ✓ | Industrieboden (KOROPOX-Ersatz Öl/Treibstoff, #316) |
| KOROCLEAN | ✓ | ✓ | Industrieboden |

### I. DUROP (Zuschlag Kunstharzsysteme)
| Produkt | N | S | Bereich |
|---|:--:|:--:|---|
| DUROP 0,5/1 · 1/2 · 2/3 · 2/5 | – | ✓ | Industrieboden (Sanierung) / Portfolio |

### J. Rapid Set → Betonsanierung
| Produkt | N | S | Bereich |
|---|:--:|:--:|---|
| CEMENT ALL · CEMENT ALL Plus | – | ✓ | Betonsanierung |
| MORTAR MIX · MORTAR MIX SVS 5 | – | ✓ | Betonsanierung |
| CONCRETE MIX · DOT Europe CONCRETE MIX | – | ✓ | Betonsanierung |
| ASPHALT REPAIR MIX | – | ✓ | Betonsanierung (Außen) |
| FAST · FLOW Control · SET Control | – | ✓ | Betonsanierung (Additive) |
| Farbpigment Dark · Light | – | ✓ | Betonsanierung (Additive) |
| LevelFlor | – | ✓ | **Industrieboden (Sanierung)** per O1 — Randfall, s. §5 |

### K. Spezialmörtel
| Produkt | Type | N | S | Bereich |
|---|---|:--:|:--:|---|
| VM 1/3, VB 8 | – | ✓ | – | Spezialmörtel (Neubau) |
| VM 5 | – | ✓ | ✓ | Spezialmörtel (Neubau) — Sanierungs-Bereich offen, s. §5 |
| VM basic | – | ✓ | ✓ | Spezialmörtel (Neubau) + Trinkwasserbehälter-Sanierung (#317) |
| SVM 03 | – | – | ✓ | Betonsanierung (Schnellverguss) |
| MSM 3/5, MSB 8 | – | – | ✓ | Betonsanierung (Microsilica-Spritz) |
| PFM 1-K Easyfix | – | ✓ | ✓ | Spezialmörtel (Neubau) — Sanierungs-Bereich offen, s. §5 |
| PFM ZE | – | ✓ | ✓ | Spezialmörtel (Neubau) — Sanierungs-Bereich offen, s. §5 |

### L. MICROTOP → Trinkwasserbehälter-Sanierung
| Produkt | N | S | Bereich |
|---|:--:|:--:|---|
| TW 02 · TW BM · TW VSM · TW 3 · TW 5 · TW 8 · TW NSM · TW Mineral | – | ✓ | Trinkwasserbehälter-Sanierung |

---

## 5. Offene Mapping-Randfälle (vor Code klären)

1. **Sanierungs-Bereich für N+S-Spezialmörtel:** VM 5, PFM 1-K, PFM ZE sind Neubau **und** Sanierung. Neubau → Bereich „Spezialmörtel". Aber die **Sanierungs-Karte hat kein „Spezialmörtel"**. Wohin im Sanierungspfad? (VM basic ist über TW gelöst.) → Kandidaten: eigener Sanierungs-Slot, oder Betonsanierung, oder nur im Portfolio. **Input nötig.**
2. **LevelFlor:** Produktart laut Katalog im Rapid-Set-Block, Bereich laut O1 = Industrieboden. Produktart „Bodenausgleichsmasse"? Bestätigen.
3. **KOROCRETE:** nicht im Katalog, aber auf der Website. Produktart „Konstruktiver Schnellbeton"; Bereich Betonsanierung + Infrastruktur. Im Katalog ergänzen lassen.
4. **Infrastruktur-Bereich:** im Katalog keine Sektion; Produktbestand offen (bisher nur KOROCRETE). Befüllung „erst nach Infra-Bildern".
5. **FSCem Basic:** aufnehmen (#271), nicht im Katalog gelistet.
6. **Begleitprodukt-Gruppen (Haftbrücke/Grundierung, Nachbehandlung, Imprägnierung, DUROP):** im Portfolio eigene Produktarten; im Bereich Industrieboden als Begleitgruppe. Brauchen sie eigene Bereich-Kacheln im Menü, oder nur Portfolio + Begleit-Sektion? Bestätigen.

---

## 6. Nicht auf der Website (Katalog bewusst ohne — bestätigt)
KOROPOX (gestrichen, Ersatz KOROMINERAL Li+, #316) · NEODUR AM Super / AM Plus (White-Label) · NEODUR DM Drainmörtel · USM 3/5 · M-BED. (Quelle: Frageliste-Auswertung O1, Technik-Mail Q1/Q3.)

---

## 7. Verhältnis zu bestehenden Konzepten
- **Erkenntnis-Seite Abschnitt P (2026-06-22):** hält die Technik-Mail-Rohantworten („kann beides") fest. Für die **Website-Positionierung** gilt dieses Doc (Konfliktregel §1).
- **Produktart-Taxonomie C3/#236:** feinere Liste (Hartstoffeinstreuung, Spritzmörtel …). Für das **Portfolio-Menü** führt der Katalog (§2); Feinabgleich mit #236/#307 separat.
- **Datenmodell:** Mehrfach-Bereich via `zusatzBereiche[]` ist vorhanden (#215). Ein **Produktart-Feld** fehlt noch (#307).

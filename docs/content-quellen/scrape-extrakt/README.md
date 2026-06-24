# Scrape-Extrakt der Bestandswebsite (je Bereich) — #344

**Was das ist:** Faktentreuer, bereinigter Extrakt des Bestandswebsite-Scrapes (Wayback 2026-04-13, ~95 % Abdeckung) je Bereich. Roh-Quelle: `KORODUR/archive/KORODUR-website, archiviert/01_analyse/scraped_content/bereiche_*_details.md` (+ `bereiche_content.md`, `produktuebersicht.md`).

**Wie erzeugt:** Dynamic Workflow, 1 Agent je Bereich-Shard (13 Shards), schema-erzwungen. Die Großdatei `industrieboden` (170 KB, 52 Abschnitte) wurde an Produktgrenzen in 6 Shards geslict; die 5 kleineren Bereichsdateien je 1 Agent; dazu die Bereichs-Hauptseitentexte aller 8 Bereiche und die globale Produktübersicht.

**CLEAN-Regeln (Steffi) — eingehalten:**
- Faktentreu: Werte, Klassen, Normbezüge, Körnungen, Zeiten wortgetreu. Nichts paraphrasiert oder geglättet. Original-Tippfehler bewusst bewahrt (siehe Flag-Liste).
- Navigations-Cruft entfernt; Archiv-Datum je Abschnitt als Quellenangabe behalten.
- Unsicheres/Widersprüchliches geflaggt (`> ⚠️ Flag:`) statt korrigiert.
- **Keine Auto-Konsolidierung.** Nur extrahiert + strukturiert. Das Matchen/Mergen passiert separat (#346) mit Mensch-Checkpoint.
- Keine Personen/Kontaktdaten im Output (Standing Rule) — eine Telefonnummer auf der Rapid-Set-Hauptseite wurde ausgelassen und geflaggt.

> **Nicht als Fakt verwenden ohne Prüfung.** Dieser Extrakt spiegelt den Stand der **alten** Website, inkl. ihrer Fehler/Widersprüche. Autoritativ bleiben Notion → TDS → `data/produkte.ts`. Dieser Extrakt ist Roh-Input für die Dreiklang-Konsolidierung #346.

---

## Dateien

| Datei | Bereich | Abschnitte | Content-Pieces | Flags |
|---|---|---:|---:|---:|
| `00-bereiche-hauptseiten.md` | alle 8 Bereiche (Hauptseiten-Texte, inkl. Schnellbeton + 3D-Druck ohne eigene Detaildatei) | 8 | 35 | 1 |
| `industrieboden-1.md` | Industrieboden | 8 Unterseiten | 23 | 10 |
| `industrieboden-2.md` | Industrieboden | 10 Produktseiten (HE 3 / HE 65 Varianten) | 71 | 4 |
| `industrieboden-3.md` | Industrieboden | 7 (HE 65 SVS-Extra/3, HE 2, HE 40, HE 60 rapid, Level) | 33 | 4 |
| `industrieboden-4.md` | Industrieboden | 6 (Level AU, AM Super, SVM 03, 0/4, HB 5, HB 5 Rapid) | 13 | 6 |
| `industrieboden-5.md` | Industrieboden | 7 (TXPK, PC, VS 0/5, WH-metallic/special, Diamond, easyFinish) | 14 | 8 |
| `industrieboden-6.md` | Industrieboden | 13 (nanoFinish … KOROMINERAL, Silosystem, LevelFlor) | 52 | 6 |
| `rapid-set.md` | Rapid Set | 14 | 38 | 14 |
| `sichtestrich.md` | Sichtestrich | 11 | 43 | 8 |
| `microtop.md` | MICROTOP | 11 | 28 | 9 |
| `spezialbaustoffe.md` | Spezialbaustoffe | 5 | 10 | 3 |
| `katzenstreu.md` | Katzenstreu (B2B Private Label) | 9 | 19 | 4 |
| `produktuebersicht.md` | global | 8 | 17 | 4 |
| **Summe** | | **117 Abschnitte** | **396 Pieces** | **81 Flags** |

`industrieboden` ist auf 6 Teildateien verteilt (Großdatei). Reihenfolge: `industrieboden-1` (Bereichs-Unterseiten) → `-2 … -6` (Produktseiten Teil 2).

---

## Checkpoint-Material für #346 (Konsolidierung)

Die 81 Flags fallen in fünf Klassen. Diese Listen sind die offenen Punkte, die der Mensch-Checkpoint vor der Konsolidierung kennen muss.

### A. Scrape-Lücken — Seite war im Archiv nicht erfasst (nur Wayback-404/Boilerplate)
Für diese Produkte/Seiten liefert der Scrape **keinen** Fachinhalt. Content muss aus TDS / `data/produkte.ts` / Notion kommen, nicht aus dem Scrape.

- **Industrieboden:** INOTEC-Pumptechnik · NEODUR HE 3 green · NEODUR HE 40 / HE 40-8 · NEODUR AM Super · NEODUR SVM 03 · KORODUR 0/4 · KORODUR HB 5 Rapid · KORODUR TXPK · KORODUR VS 0/5 · KORODUR WH-metallisch · KORODUR WH-Spezial · KORODUR Diamantbeton · KOROMINERAL LI
  - *Hinweis:* VS 0/5, WH-metallisch, WH-Spezial, Diamantbeton erscheinen mit Klassifizierung trotzdem in der Hartstoffschicht-Tabelle (`industrieboden-1.md`) — Detailseite fehlt, Klassen-Wert vorhanden.
- **Rapid Set:** Detailseiten MORTAR MIX, CONCRETE MIX, ASPHALT REPAIR MIX, CONCRETE PHARMACY (nur Seitengerüst) · Rapid Set Concrete · Häufige Fragen
- **MICROTOP:** TW 02/TW 2, TW 3, TW NSM, TW VSM (nur Linkliste, keine Kennwerte) · Nassspritzverfahren (keine Verfahrensbeschreibung)
- **Spezialbaustoffe:** alle Teil-2-Produktseiten (nur Boilerplate)
- **Katzenstreu:** Unsere Marken · Private Label · Was ist Bentonit?

### B. Inhaltliche Widersprüche (Faktencheck / Frank)
- NEODUR HE 60 rapid Belastbarkeit: **48 Stunden** (Schnellestrich) vs. **3 h begehbar / 24 h nutzbar** (Sanierung)
- NEODUR Level: Klassifizierung **CT-C40-F8-AR0,5** (Fließtext) vs. Druckfestigkeit **≥ 35 N/mm²** (Tabelle)
- NEODUR Level AU: **CT-C30** vs. Druckfestigkeit **≥ 33 N/mm²**
- MORTAR MIX Einbaustärke: **15 mm** vs. **10 mm** Untergrenze
- DOT Europe CONCRETE MIX vs. CONCRETE MIX: gleiche Körnung/Einbaustärke, **abweichende 28-Tage-Festigkeiten** (nicht mergen)
- TRUazzo Verarbeitungszeit: **30 Min** (Unterseite) vs. **20 Min** (Produktseiten)
- KORODUR Silosystem Tagesleistung: **1.000–1.500 m²** vs. **1.000–2.000 m²**
- Produktübersicht: widersprüchliche Zählwerte (6/~5, 8/~8, 44/~45, Gesamt 75/~74)

### C. Fehlende/fragwürdige Kennwerte
- DIN-1100-Gruppe fehlt im Scrape: HE 65 SVS 1,5 extra · HE 3 SVS 1,5 extra · HE 2 · FSCem · FSCem Screed
- Dichte-Einheiten fragwürdig (wortgetreu belassen): easyFinish `kg/m³` bei Wert 1,0 · nanoFinish `1,035 cm³` (ohne Masse) · uniPrimer `1,05 g/m³` (vermutlich g/cm³)
- HE 60 rapid Schwindklasse `SW 1 -schwindarm (>0,2 mm/m)` fachlich ungeprüft
- easyFinish Normbezug `RSTO 2001` gehört laut Kontext zu DUROP-Cross-Selling, nicht zu easyFinish

### D. Tabellen-Rekonstruktion unsicher (roh belassen + geflaggt)
- Hartstoffschicht „ohne Bindemittel": 3 Spaltenköpfe vs. 4 Werte/Zeile (1. Spalte = impliziter Produktname)
- Bauchemie Imprägnierung/Einpflege: Verbrauchsangaben mehrzeilig zerrissen (KOROPOX, KOROMINERAL Cure, OBTEGO)
- Rapid Set Vergleichstabelle: aus flacher Zeilenfolge rekonstruiert, Reihenfolge plausibel, nicht 100 % gesichert

### E. Original-Tippfehler/Artefakte bewahrt (nicht ohne Sign-off „korrigieren")
„87-jaehriger Erharung" · „gelaettete Boeden" (OBTEGO P-20) · „Für inne und außen" (HE 3 metallisch) · „mircosilika vergütet" / „microsilicarvergüteter" (MICROTOP) · MORTAR-MIX-FAQ verweist auf „Cement All" (Copy-Paste) · TRU SP-Kurzbeschreibung referenziert TRU Self-Leveling (Copy-Paste) · MSK/MKS Funke uneindeutig · Slug `svs-15` vs. Inhalt `SVS 1,5`.

### F. Zuordnungs-Hinweise (Bereich uneindeutig / bereichsfremd mitgescraped)
- CEMENT ALL taucht im MICROTOP-Shard auf (gehört zu Rapid Set)
- „Was ist Bentonit?" im Spezialbaustoffe-Shard (gehört zu Katzenstreu)
- KORODUR Silosystem: Breadcrumb „Alle" vs. „Spezialbaustoffe"
- LevelFlor: Breadcrumb „Rapid Set" statt Industrieboden

---

## Schnellbetonsysteme & 3D Concrete Printing
Beide Bereiche haben **keine** eigene Detaildatei im Scrape. Ihre Hauptseiten-Texte stehen in `00-bereiche-hauptseiten.md` (Abschnitte 5 + 6). Schnellbeton-Produkte (Rapid Set Concrete, KOROCRETE) sind unter Rapid Set bzw. Spezialbaustoffe verortet; 3D-Druck verweist auf die separate Domain. 3D-Druck wird als 7. Bereich separat aufgebaut (#347).

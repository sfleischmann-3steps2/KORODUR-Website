# Dokumenten-Inventar Website — Bestand + Lücken

**Issue #300** (Epic #80) · Stand 2026-07-01 · mechanisch abgeleitet aus Repo-Stand `feature/betonsanierung-bereich-320`.

**Zweck.** Beschaffungs-Grundlage: welche Dokumente liegen für die Website vor (Broschüren, technische Datenblätter, System-/Service-Infos, SDB, DoP), wo sind Lücken. Voraussetzung für das Download-Center (#301).

**Zwei Blickwinkel in diesem Dokument:**
- **A) Repo-Bestand (§1–§6):** was aktuell im Repo unter `public/downloads/` liegt und über `data/produkte.ts` / `data/produktDokumente.ts` verlinkt ist. Das ist der auslieferbare Ist-Stand.
- **B) korodur.de-Export-Gegenprobe (§7):** was der WordPress-Export der Alt-Site kennt (1162 Dokumente). Zeigt, was noch nicht in den Repo-Bestand überführt ist.

**Methodik.** Bestand rein aus dem Repo abgeleitet, kein Fakt erfunden. Quellen: `tdsUrl`-Einträge in `data/produkte.ts`, Datei-Bestand `public/downloads/`, Wiring `data/produktDokumente.ts`, Broschüren-Extrakte `docs/content-quellen/broschuere-extrakt/`, Evidenz-PDFs `docs/tds-quellen/`, Alt-Site-Export `dokumenten-inventar.csv` (`scripts/extract-wp-dokumente.py`). Lücken beruhen auf Nicht-Vorhandensein im Repo, nicht auf Bestätigung durch Technik/Marketing.

---

## 1. Repo-Bestand auf einen Blick (nach Dokumenttyp)

| Typ | Dateien im Repo | Sprachen (Dateizahl) | Quelle/Pfad | Status |
|---|---:|---|---|---|
| TDS (technische Datenblätter) | 245 | DE 73 · EN 69 · FR 63 · PL 32 · **ES 0** | `public/downloads/tds/` | Bestand hoch, ES fehlt komplett |
| DoP (Leistungserklärungen) | 56 | DE 31 · EN 12 · FR 11 · **PL 0 · ES 0** | `public/downloads/dop/` | nur EU-Kernsprachen, PL/ES **Lücke** |
| SDB / SDS (Sicherheitsdatenblätter) | 81 | DE 46 · EN 19 · FR 16 · **PL 0 · ES 0** | `public/downloads/sds/` | DE gut, EN/FR partiell, PL/ES **Lücke** |
| Anwendung / Verarbeitung | 11 | DE (nur) | `public/downloads/anwendung/` | DE-only |
| Reinigung / Pflege | 6 | DE (nur) | `public/downloads/reinigung/` | DE-only |
| System-/Service-Info | 1 | DE | `public/downloads/service/` | nur Lieferprogramm 2025 |
| Broschüren (Bereichs-/Produkt) | 0 als PDF im Repo | — | Google Drive `KORODUR/KORODUR Assets/` (t.b.d. Steffi) | **Lücke** — nur Extrakte, s. §4 |
| EPD (Umweltproduktdeklaration) | **0** | — | — | **Lücke** — Typ-Slot reserviert, s. §6/L2 |
| Referenz-PDF | 0 statisch | DE/EN/FR/PL/ES zur Laufzeit | `components/ReferenzPdf.tsx`, `lib/pdf.ts` | wird pro Referenz generiert, s. §5 |

**Wiring-Stand (`data/produktDokumente.ts`, generiert):** 80 Produkte verlinkt; Dokument-Verlinkungen gezählt: TDS 288, SDS 137, DoP 54, Anwendung 27, Reinigung 18, Service 1. (Zahlen inkl. Sprach- und Mehrfach-Zuordnungen; treiben das Download-Center #301.)

---

## 2. TDS je Produkt (aus `data/produkte.ts`)

65 eindeutige DE-TDS werden von Produkten referenziert; **alle 65 vorhanden** (Soll-Ist-Abgleich `tdsUrl` gegen `public/downloads/tds/` = 0 fehlende Dateien). EN/FR/PL-Fassungen existieren zu vielen, aber nicht lückenlos (Aggregat s. §1); ES durchgängig **Lücke**.

| Dokument | Typ | Produkt/Bereich | vorhanden | Quelle/Pfad |
|---|---|---|:--:|---|
| Asphalt Repair Mix | TDS | Infrastruktur | ja | `public/downloads/tds/Asphalt_Repair_Mix_de.pdf` |
| Cement All | TDS | Betonsanierung | ja | `public/downloads/tds/Cement_All_de.pdf` |
| Concrete Mix | TDS | Betonsanierung | ja | `public/downloads/tds/Concrete_Mix_de.pdf` |
| Concrete Pharmacy | TDS | Betonsanierung | ja | `public/downloads/tds/Concrete_Pharmacy_de.pdf` |
| DOT Europe Concrete Mix | TDS | Betonsanierung | ja | `public/downloads/tds/DOT_Europe_Concrete_Mix_de.pdf` |
| DUROP | TDS | Industrieboden | ja | `public/downloads/tds/DUROP_de.pdf` |
| Farbkarte de en fr | TDS (Farbkarte) | Industrieboden | ja | `public/downloads/tds/Farbkarte_de_en_fr.pdf` |
| GRANIDUR 05 08 | TDS | Industrieboden | ja | `public/downloads/tds/GRANIDUR_05_08_de.pdf` |
| Granidur Bianco Nero | TDS | Industrieboden | ja | `public/downloads/tds/Granidur_Bianco_Nero_de.pdf` |
| KCF 05 08 | TDS | Industrieboden | ja | `public/downloads/tds/KCF_05_08_de.pdf` |
| KOROCLEAN | TDS | Industrieboden | ja | `public/downloads/tds/KOROCLEAN_de.pdf` |
| KOROCRETE Schnellbeton | TDS | Industrieboden | ja | `public/downloads/tds/KOROCRETE_Schnellbeton_de.pdf` |
| KOROCURE | TDS | Industrieboden | ja | `public/downloads/tds/KOROCURE_de.pdf` |
| KORODUR 04 | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_04_de.pdf` |
| KORODUR Diamantbeton | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_Diamantbeton_de.pdf` |
| KORODUR easyFinish | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_easyFinish_de.pdf` |
| KORODUR FSCem | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_FSCem_de.pdf` |
| KORODUR FSCem Screed | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_FSCem_Screed_de.pdf` |
| KORODUR HB 5 | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_HB_5_de.pdf` |
| KORODUR HB 5 rapid | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_HB_5_rapid_de.pdf` |
| KORODUR KOROTAN | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_KOROTAN_de.pdf` |
| KORODUR nanoFinish | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_nanoFinish_de.pdf` |
| KORODUR PC | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_PC_de.pdf` |
| KORODUR Robust 03 | TDS | Infrastruktur | ja | `public/downloads/tds/KORODUR_Robust_03.pdf` |
| KORODUR TXPK | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_TXPK_de.pdf` |
| KORODUR uniPrimer | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_uniPrimer_de.pdf` |
| KORODUR VS 05 | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_VS_05_de.pdf` |
| KORODUR WH metallisch | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_WH_metallisch_de.pdf` |
| KORODUR WH Spezial | TDS | Industrieboden | ja | `public/downloads/tds/KORODUR_WH_Spezial_de.pdf` |
| KOROMINERAL CURE | TDS | Industrieboden | ja | `public/downloads/tds/KOROMINERAL_CURE_de.pdf` |
| KOROMINERAL | TDS | Industrieboden | ja | `public/downloads/tds/KOROMINERAL_de.pdf` |
| KOROMINERAL Li | TDS | Industrieboden | ja | `public/downloads/tds/KOROMINERAL_Li_de.pdf` |
| KOROPHALT 02 | TDS | Microtop | ja | `public/downloads/tds/KOROPHALT_02_de.pdf` |
| KOROTEX | TDS | Industrieboden | ja | `public/downloads/tds/KOROTEX_de.pdf` |
| Levelflor | TDS | Industrieboden | ja | `public/downloads/tds/Levelflor_de.pdf` |
| MICROTOP TW 02 | TDS | Microtop | ja | `public/downloads/tds/MICROTOP_TW_02_de.pdf` |
| MICROTOP TW 3 5 8 | TDS | Industrieboden / Microtop | ja | `public/downloads/tds/MICROTOP_TW_3_5_8_de.pdf` |
| MICROTOP TW BM | TDS | Microtop | ja | `public/downloads/tds/MICROTOP_TW_BM_de.pdf` |
| MICROTOP TW Mineral | TDS | Microtop | ja | `public/downloads/tds/MICROTOP_TW_Mineral_de.pdf` |
| MICROTOP TW NSM | TDS | Microtop | ja | `public/downloads/tds/MICROTOP_TW_NSM_de.pdf` |
| MICROTOP TW VSM | TDS | Microtop | ja | `public/downloads/tds/MICROTOP_TW_VSM_de.pdf` |
| Mortar Mix | TDS | Betonsanierung | ja | `public/downloads/tds/Mortar_Mix_de.pdf` |
| NEODUR HE 2 | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_2_de.pdf` |
| NEODUR HE 3 | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_3_de.pdf` |
| NEODUR HE 3 green | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_3_green_de.pdf` |
| NEODUR HE 3 metallisch | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_3_metallisch_de.pdf` |
| NEODUR HE 40 | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_40_de.pdf` |
| NEODUR HE 60 rapid | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_60_rapid_de.pdf` |
| NEODUR HE 65 | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_65_de.pdf` |
| NEODUR HE 65 metallisch | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_65_metallisch_de.pdf` |
| NEODUR HE 65 Plus | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_HE_65_Plus_de.pdf` |
| NEODUR Level AU | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_Level_AU_de.pdf` |
| NEODUR Level | TDS | Industrieboden | ja | `public/downloads/tds/NEODUR_Level_de.pdf` |
| NEODUR MSM 3 5 MSB 8 | TDS | Betonsanierung / Spezialmörtel | ja | `public/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf` |
| NEODUR PFM 1K Easyfix | TDS | Betonsanierung | ja | `public/downloads/tds/NEODUR_PFM_1K_Easyfix_de.pdf` |
| NEODUR PFM ZE / PFM ZE Flex | TDS | Spezialmörtel | ja | `public/downloads/tds/NEODUR_PFM_ZE_PFM_ZE_Flex_de.pdf` |
| NEODUR SVM 03 / SVM 4 | TDS | Spezialmörtel | ja | `public/downloads/tds/NEODUR_SVM_03_SVM_4_de.pdf` |
| NEODUR VM 1 3 8 | TDS | Spezialmörtel | ja | `public/downloads/tds/NEODUR_VM_1_3_8_de.pdf` |
| NEODUR VM 5 | TDS | Spezialmörtel | ja | `public/downloads/tds/NEODUR_VM_5_de.pdf` |
| NEODUR VM basic | TDS | Spezialmörtel | ja | `public/downloads/tds/NEODUR_VM_basic_de.pdf` |
| System Rapid Set Concrete | TDS (System) | Industrieboden | ja | `public/downloads/tds/System_Rapid_Set_Concrete_de.pdf` |
| TRU PC | TDS | Industrieboden | ja | `public/downloads/tds/TRU_PC_de.pdf` |
| TRU SP | TDS | Industrieboden | ja | `public/downloads/tds/TRU_SP_de.pdf` |

> Hinweis: `public/downloads/tds/` enthält 245 Dateien und damit **mehr** als die 65 referenzierten Produkte (Sprachfassungen + nicht produktverlinkte Titel wie `Bestellformular_*`, `KORODUR_Silosystem_de`, `Glossprofi_de`, `OBTEGO_*`, `Thilos_*`, `Inotec_Mietservice_de`). Diese Zusatzdateien sind Reserve/Service-Content, kein TDS-Gap.

**Produkte ohne TDS (Lücke):**

| Dokument | Typ | Produkt/Bereich | vorhanden | Quelle/Pfad |
|---|---|---|:--:|---|
| NEODUR USM 3 (TDS) | TDS | Spezialmörtel/Industrieboden | **nein** | keine Datei in `public/downloads/tds/`; Produkt `neodur-usm-3` in `data/produkte.ts` ohne `tdsUrl` |
| NEODUR USM 5 (TDS) | TDS | Spezialmörtel/Industrieboden | **nein** | keine Datei; Produkt `neodur-usm-5` ohne `tdsUrl` |

---

## 3. System-/Service-Informationen

| Dokument | Typ | Produkt/Bereich | vorhanden | Quelle/Pfad |
|---|---|---|:--:|---|
| KORODUR Lieferprogramm 2025 | Service | übergreifend | ja | `public/downloads/service/KORODUR_Lieferprogramm_de_2025.pdf` |
| System Rapid Set Concrete | System-TDS | Industrieboden/Betonsanierung | ja | `public/downloads/tds/System_Rapid_Set_Concrete_de.pdf` (+ en/fr) |
| System KOROCRETE Schnellbeton | System-TDS | Industrieboden | nur FR | `public/downloads/tds/System_KOROCRETE_Schnellbeton_fr.pdf` — **DE-Fassung Lücke** |
| Bestellformulare (Sackware / Siloware / MICROTOP) | Service | übergreifend | ja | `public/downloads/tds/Bestellformular_*.pdf` (DE) |
| KORODUR Silosystem | Service | Industrieboden | ja (DE) | `public/downloads/tds/KORODUR_Silosystem_de.pdf` |
| Inotec Mietservice | Service | übergreifend | ja (DE) | `public/downloads/tds/Inotec_Mietservice_de.pdf` |
| Anwendungs-/Verarbeitungsblätter | Anwendung | diverse (Schicht, Einstreuung, Rapid Set, TRU, Pflasterverfugung) | ja | `public/downloads/anwendung/` (11 Dateien, DE) |
| Reinigungs-/Pflegehinweise | Reinigung | diverse (KOROCLEAN, GRANIDUR, Copetti, Hartstoff) | ja | `public/downloads/reinigung/` (6 Dateien, DE) |

---

## 4. Broschüren

| Dokument | Typ | Produkt/Bereich | vorhanden | Quelle/Pfad |
|---|---|---|:--:|---|
| Industrieboden-Broschüre 2023 (4 Seiten A3) | Broschüre — Extrakt | Industrieboden | nur MD-Extrakt | `docs/content-quellen/broschuere-extrakt/broschuere-s1..s4.md`; **Original-PDF Lücke** (Google Drive `KORODUR/KORODUR Assets/`) |
| MICROTOP 4-seitig | Produkt-Broschüre (Evidenz) | Microtop | ja (DE) | `docs/tds-quellen/KORODUR_MICROTOP_4_seitig_de.pdf` |
| easyFinish / nanoFinish / KOROMINERAL / KOROMINERAL Lasur | Produkt-Info (Evidenz) | Industrieboden | ja (DE) | `docs/tds-quellen/KORODUR_easyFinish_de.pdf` u. a. |

**Lücke — vollständiger Broschüren-Ordner:** Der zentrale Ablageort aller Broschüren (Bereichs- und Produktbroschüren, Imagebroschüre, mehrsprachig) ist noch nicht bereitgestellt. **Pfad t.b.d. Steffi.** Im Repo liegt nur die Industrieboden-Broschüre 2023 als faktentreuer Text-Extrakt (kein rendernder PDF-Download) plus einzelne Produkt-Evidenz-PDFs unter `docs/tds-quellen/`. Für das Download-Center fehlen Broschüren als downloadbare Assets nahezu vollständig. Der Alt-Site-Export (§7) kennt 45 Dokumente vom Typ Broschüre/Katalog als Import-Kandidaten.

---

## 5. Referenz-Dokumente

| Dokument | Typ | Produkt/Bereich | vorhanden | Quelle/Pfad |
|---|---|---|:--:|---|
| Referenz-PDF je Projekt | Referenz | alle Referenzen | generiert zur Laufzeit | `components/ReferenzPdf.tsx`, `lib/pdf.ts` (jsPDF, DE/EN/FR/PL/ES) |

Keine statischen Referenz-PDFs im Repo. Der Download je Referenz wird clientseitig erzeugt. Kein Beschaffungs-Gap, aber bewusst ausgewiesen (nicht als Datei ablegbar).

---

## 6. Lücken auf einen Blick (Beschaffungsliste)

| # | Lücke | Umfang | Nächster Schritt |
|---|---|---|---|
| L1 | **Broschüren-Ordner** komplett | fast alle Bereichs-/Produktbroschüren fehlen als downloadbares PDF | Ablageort/Pfad von Steffi, dann Import nach `public/downloads/broschueren/` |
| L2 | **EPD** | **0 vorhanden** | Typ-Slot in `produktDokumente.ts` reserviert; Broschüre S1 nennt „EPD / klimaneutral 2030" als Anspruch. EPD beschaffen sobald ausgestellt |
| L3 | **ES-Sprachpass** | 0 Dokumente in ES über alle Typen | trotz 5. Site-Sprache; TDS/SDB/DoP-Übersetzungen offen |
| L4 | **DoP PL/ES** | PL 0, ES 0 (DE 31 / EN 12 / FR 11) | PL/ES-Leistungserklärungen fehlen |
| L5 | **SDB PL/ES + EN/FR-Lücken** | PL 0, ES 0; EN 19 / FR 16 gegenüber DE 46 | SDB-Coverage je Produkt und Sprache auditieren |
| L6 | **Fehlende TDS** | NEODUR USM 3, NEODUR USM 5 | 2 TDS beschaffen (aktuell ohne `tdsUrl`) |
| L7 | **System KOROCRETE Schnellbeton DE** | nur FR-Fassung vorhanden | DE-System-TDS ergänzen |
| L8 | **SDB/DoP-Aktualität** | Bestand liegt vor + ist verlinkt, aber Vollständigkeit/Aktualität je Produkt nicht gegen Technik bestätigt | Freigabe/Versions-Check vor Cutover |
| L9 | **Alt-Site-Überführung** | 774 von 1162 Export-Dokumenten (§7) noch nicht auf der neuen Site referenziert | priorisiert sichten (Broschüren/Service zuerst), Rest als „nur Mediathek" prüfen |

**Nicht Teil dieses Tickets:** Beschaffung der Dokumente selbst. Dieses Inventar liefert nur Bestand + Lücken.

---

## 7. Gegenprobe korodur.de-Export (WordPress-Export 2026-06-11)

Zweiter Blickwinkel: was die Alt-Site kennt. Quelle `korodur.WordPress.2026-06-11.xml`, generiert von `scripts/extract-wp-dokumente.py`. Vollständige Liste: `dokumenten-inventar.csv` (1162 Dokumente, 799 Stamm-Dokumente ohne Sprachvarianten).

**Bestand nach Typ (heuristisch aus Dateiname/Pfad):**

| Typ | Anzahl |
|---|---|
| TDS (vermutet) | 957 |
| SDB/SDS | 114 |
| Broschüre/Katalog | 45 |
| System-/Service-Info | 39 |
| DoP/CE/Leistungserklärung | 6 |
| Zertifikat/Prüfzeugnis | 1 |

_„TDS (vermutet)" = alles, was nicht eindeutig Zertifikat/DoP/SDB/Broschüre ist; vor Übernahme stichprobenartig prüfen._

**Bestand nach Sprache:** — 352 · en 263 · de 262 · fr 185 · pl 48 · ru 19 · it 17 · nl 6 · tr 4 · cz 1 · es 1 · fi 1 · hu 1 · ro 1 · se 1

**Zuordnung:** verknüpft (Seite/Produkt) 621 · nur Mediathek 541 (Kandidaten für veraltet/ungenutzt, manuell prüfen).

**Abgleich neue Website:** referenziert 388 · nicht referenziert 774.

**Lücke:** 774 von 1162 Export-Dokumenten sind auf der neuen Site noch nicht referenziert (s. L9). Die Alt-Site führt Sprachen (ru/it/nl/tr u. a.), die die neue Site nicht abbildet — kein Gap für den V1-Scope (DE/EN/FR/PL/ES), aber als Bestand dokumentiert.

# Zuordnung Sichtestrich + Microtop (Sign-off Steffi/Frank)

**Stand:** 2026-06-12 | **Status:** Umgesetzt als Vorschlag, Sign-off ausstehend
**Quellen:** `bereiche_sichtestrich_details.md` (direkt gelesen) + `extraktion-microtop.json` + `Normen produkte.xlsx`

## Sichtestrich — Gruppen

| Gruppe | Produkte | Bemerkung |
|---|---|---|
| Geschliffener Sichtestrich (`geschliffen`) | GRANIDUR (Varianten 05/08) · GRANIDUR BIANCO/NERO | Alt-Site-Struktur 1:1 |
| Geglätteter Sichtestrich (`geglaettet`) | KORODUR COPETTI FLOOR KCF (Varianten 05/08/**05 rapid**) | KCF 05 rapid als Variante neu erfasst (stand nicht in der Produktübersicht) |
| TRUazzo (`truazzo`) | TRU Self-Leveling (Bestand, angereichert) · TRU PC (neu) · TRU SP (neu) | Rapid-Set-Technologie, Marken-Schreibweise "TRUAZZO" der Excel als "TRUazzo" übernommen (Alt-Site-Schreibweise) |

## Microtop — Gruppen

| Gruppe | Produkte | Bemerkung |
|---|---|---|
| Trockenspritzverfahren (`trockenspritz`) | TW 3 · TW 5 · TW 8 | DVGW W 270/300/347; TW 3-Klasse C30/37 aus Excel (Scrape nennt keine) |
| Nassspritzverfahren (`nassspritz`) | TW NSM · TW 02 · TW VSM | TW VSM: C12/15 + W 347 aus Excel |
| Beschichtung & Oberflächenschutz (`beschichtung-schutz`) | TW BM · TW Mineral | TW BM auch Haftbrücke/Korrosionsschutz; TW Mineral = Silikat-Imprägnierung des Systems |

## Entscheidungen und Konflikte

1. **TW 2 vs. TW 02:** ✅ BESTÄTIGT (Steffi, 2026-06-12): TW 02 = TW 2. Migriert als **MICROTOP TW 02**.
2. **TW VSM:** ✅ GEKLÄRT (2026-06-12, Quelle: LP lp-live.korodur.de/microtop-tw): **Vorspritzmörtel (Haftgrund)**, 15–20 mm, Spritzen/Hand, **OHNE DVGW-Zulassung** (Excel-Zeile W 347 war falsch zugeordnet, entfernt). C12/15 aus Excel bleibt.
3. **TW NSD** (Produktübersicht) kommt in der Quelle nicht vor — nicht migriert.
4. **TW NSM, TW 02:** nur Teaser-Daten, keine Kennwerte (Detailseiten leer) — TDS-Vervollständigung offen.
5. **TW Mineral ohne DVGW-Angabe** in der Quelle (auffällig für ein Trinkwasserprodukt) — nicht ergänzt, TDS klären.
6. **SKUs** durchgehend nicht übernommen (wie Teil 1).

## Sign-off

- [ ] Gruppen-Schnitt Sichtestrich (3) + Microtop (3) OK
- [x] TW 02 = TW 2 bestätigt (Steffi, 2026-06-12)
- [x] TW VSM Produktart geklärt: Vorspritzmörtel/Haftgrund, ohne DVGW (LP-Quelle, 2026-06-12)

## Nachtrag 2026-06-12: Landing-Page-Anreicherung (Quelle: lp-live.korodur.de/microtop-tw + /arm)

Die von Steffi kuratierten LPs gelten bei Konflikten vor dem Alt-Site-Scrape (Sicherung: `quellen-lp/`).

- **DVGW-Zulassungen präzisiert:** TW 3/5/8/NSM/BM/02 = Typ Klasse 1, W 300 + W 347 · **TW Mineral = W 347** (Lücke geschlossen) · **TW VSM = ohne Zulassung** · NEODUR VM basic = W 347
- **Kennwerte ergänzt:** TW NSM (ca. 20 mm, Nassspritzen, Variante **NSM blau**), TW 02 (5–8 mm Auskleidung / 2–5 mm Korrosionsschutz), TW BM (Varianten **weiß/blau**, Schichtdicken), TW 3 (Körnung 0–3 mm), **TW 5: Schichtdicke 14–30 mm** (LP) statt 10–30 (Alt-Bereichsseite)
- **NEODUR VM basic** voll angereichert (Quellvergussbeton, Körnung 0–5, 25-kg-Gebinde, Rohrverguss Trinkwasser)
- **ASPHALT REPAIR MIX** voll angereichert (Biegezug, E-Modul, Verbrauch, Wasserzugabe, Verarbeitungstemperatur, CO₂-Bilanz, Baustoffhandel-Vertrieb); kuratierte Matrix-Felder unangetastet
- **Referenz-Kandidaten für Stufe 3** (auf den LPs dokumentiert): Microtop: Haidberg 75.000 m³ (EWAG, 2005) · Krottenbach 60.000 m³ (2009) · Räcknitz Dresden (2019) · Bad Nauheim (2011) · Puchheim (2010) · Budapest (2012) + 12 weitere · ARM: Dieckmann Versmold (2021) · Linnenbecker Bad Oeynhausen (2022) · Wüseke Sassenberg (2022) · Lackiererei Schmidt Versmold (2022)
- **Nicht übernommen (für später):** Systemvergleichs-Tabellen (mineralisch vs. Epoxid vs. Edelstahl; ARM vs. Kaltmischgut vs. Heißasphalt), FAQ-Blöcke, Zielgruppen-Nutzenargumente, regionale Fachberater-Kontakte → Rohstoff für Anwendungsseiten/Planerbereich (Nice-to-have-Liste) bzw. Kontakt-Konzept

## Nachtrag 2026-06-12 (2): Offizielle TDS eingearbeitet (`docs/tds-quellen/`)

Steffi hat 8 TDS geliefert (Microtop-Serie + easyFinish/nanoFinish/KOROMINERAL). **Quellen-Hierarchie ab jetzt: TDS > Excel/LP > Alt-Site.**

- **TW VSM: DVGW Typ Klasse 1, W 347 lt. TDS** — die LP-Angabe "ohne Zulassung" war falsch, die Excel hatte recht. Wieder eingepflegt. Plus Kennwerte (Körnung 0–2, ca. 15–20 mm, Wasserzugabe, Ergiebigkeit)
- **TW 02: C30/37, Körnung 0–0,2 mm, ca. 2–5 mm** (TDS ersetzt die LP-Schichtdicken 5–8 mm)
- **TW NSM: Körnung 0–3 mm, ca. 20 mm einlagig, Farben natur/weiß/blau**
- **TW NSD: existiert (eigenes TDS!) und ist jetzt migriert** (C30/37, Nassspritz-Dünn-/Dichtstrom, W 300 + W 347)
- easyFinish/nanoFinish: Materialverbrauch ergänzt (150/100 g/m²); **die defekten Dichte-Einheiten stehen AUCH im offiziellen TDS** ("1,0 kg/m³", "1,035 cm³") → TDS-Korrektur an Frank melden, Dichte bleibt im Web ausgelassen
- KOROMINERAL: pH ca. 11,3 (statt ca. 11), Verarbeitungstemperatur ergänzt

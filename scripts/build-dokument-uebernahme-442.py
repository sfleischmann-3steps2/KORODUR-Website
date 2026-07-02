#!/usr/bin/env python3
"""Kuratierte Übernahme der Alt-Site-Downloads (#442).

Liest docs/website-migration/dokumente-stamm.json (verknüpfte, noch nicht
übernommene Alt-Site-Dokumente) und eine explizite Entscheidungstabelle,
schreibt:

  - data/dokument-funde-2026-07.json          Overlay für generate-produkt-dokumente.mjs
  - docs/website-migration/dokumente-uebernahme-442.md   Review-Doku (übernommen/ausgelassen + Gründe)

Scope-Regel (Steffi 02.07.): Was die Alt-Site verknüpft als Download anbietet,
kommt auf die neue Site — außer es gibt dort keinen korrekten Ort (Presse,
Kundenmagazin, eingestellte Produkte/Bereiche, Nicht-Site-Sprachen, alte
Revisionen). Jede Auslassung steht mit Grund in der Review-Doku.

    python3 scripts/build-dokument-uebernahme-442.py

ACHTUNG: Einmalige Kuration (Juli 2026). Nach der Übernahme steht in
dokumente-stamm.json aufNeuerSite=true für die übernommenen Dokumente — ein
erneuter Lauf fände sie nicht mehr und würde das committete Overlay
data/dokument-funde-2026-07.json leeren. Nicht erneut ausführen; für spätere
Nachzügler ein neues Overlay (2026-08 …) anlegen.
"""

import json
import csv
import re
import sys
from pathlib import Path

STAMM = json.load(open("docs/website-migration/dokumente-stamm.json"))
SITE_LANGS = {"de", "en", "fr", "pl", "es"}

# Produkt-IDs aus data/produkte.ts (Validierung der Zuordnungen)
PRODUKT_IDS = set(re.findall(r'\bid: "([a-z0-9-]+)"', open("data/produkte.ts").read()))

# Archiv-Inventar: URL -> lokaler Pfad (Volumen-Statistik)
ARCHIV = Path("/Users/sfleischmann/KORODUR/archive/KORODUR-website, archiviert/05_wp-content-archiv")
INVENTAR = {}
with open(ARCHIV / "inventar.csv") as f:
    for r in csv.DictReader(f):
        INVENTAR[r["url"]] = r

# ---------------------------------------------------------------------------
# Produktfamilien (Spiegel der DE-Zuordnungen in generate-produkt-dokumente.mjs)
HARTSTOFFE = ["korodur-vs-0-5", "korodur-wh-spezial", "korodur-wh-metallisch", "korodur-diamantbeton", "korodur-robust"]
TROCKENMOERTEL = ["neodur-he-2", "neodur-he-40", "korodur-fscem", "korodur-fscem-screed"]
DESIGN = ["granidur", "granidur-bianco-nero", "kcf"]
TRU = ["tru-self-leveling", "tru-pc", "tru-sp"]
PFM = ["neodur-pfm-ze", "neodur-pfm-ze-flex", "neodur-pfm-1k-easyfix"]
RAPID_REP = ["rapid-set-cement-all", "rapid-set-mortar-mix", "rapid-set-mortar-mix-dur", "rapid-set-concrete-mix"]
VERGUSS = ["neodur-vm-1", "neodur-vm-3", "neodur-vb-8"]
MICROTOP_TW = ["microtop-tw-3", "microtop-tw-5", "microtop-tw-8"]
HE_EINSTREU = ["neodur-he-3", "neodur-he-3-green", "neodur-he-2"]
HE_ESTRICH = ["neodur-he-65", "neodur-he-65-plus", "neodur-he-40"]

# ---------------------------------------------------------------------------
# Entscheidungstabelle. Ein Eintrag je Stamm.
#   T(typ, ziel, titel=None, langs=None, sprachMap=None, bereiche=None, urlPick=None)
#     ziel: "zentral" oder Liste Produkt-IDs
#     langs: nur diese Sprachen übernehmen (Default: alle Site-Sprachen; "—" -> de)
#     sprachMap: {"—": "en"} wenn das suffixlose File nicht Deutsch ist
#     bereiche: Bereichs-Slugs für die Bereichsseiten-Positionierung
#   S(grund) — auslassen mit Grund
def T(typ, ziel, titel=None, langs=None, sprachMap=None, bereiche=None):
    return {"take": True, "typ": typ, "ziel": ziel, "titel": titel, "langs": langs, "sprachMap": sprachMap or {}, "bereiche": bereiche or []}

def S(grund):
    return {"take": False, "grund": grund}

G_PRESSE = "Presseartikel/Fachartikel-Scan — kein Presse-Bereich auf der neuen Site (separater Track)"
G_REPORT = "KORODUR Report (Kundenmagazin) — keine Entsprechung auf der neuen Site (separater Track)"
G_SICHT = "Sichtestrich-/Design-Marketingmaterial — Bereich wird auf der neuen Site nicht geführt (#331)"
G_REVISION = "ältere Revision — neuere Fassung wird übernommen bzw. ist bereits live"
G_STALE = "Produkt nicht (mehr) im Sortiment der neuen Site — Stale-Produkte werden nicht mitgeliftet"
G_LANG = "keine Site-Sprache (DE/EN/FR/PL/ES)"
G_LV = "Ausschreibungstexte laufen auf der neuen Site über ausschreiben.de-Deeplinks (#136)"
G_REFERENZ = "Referenz-Dokumentation — gehört zur Referenzen-Lane, nicht ins Download-Center"
G_UNKLAR = "Produktzuordnung unklar (Alt-Variante ohne Pendant) — Technik-Frage, vor Übernahme klären"
G_KATZE = "alte Katzenstreu-Markenwelt — widerspricht der neuen markenlosen Private-Label-Positionierung (#386)"
G_INTERN = "Baustellen-/Sicherheitsunterweisung ohne Seiten-Pendant auf der neuen Site — bei Bedarf später"

DECISIONS = {
    # ========================== BROSCHÜREN ==========================
    "asphalt_repair_mix_flyer": T("broschuere", ["asphalt-repair-mix"], "Asphalt Repair Mix Flyer", bereiche=["infrastruktur"]),
    "cement_all_bastelbeton_flyer": S("B2C-Bastelbeton-Kampagne — passt nicht zur B2B-Ausrichtung der neuen Site"),
    "designboden_prospekt": S(G_SICHT),
    "industrieboden_broschuere": S(G_REVISION),  # 2023/03 -> ersetzt durch 2025/08 (DE) / neueste EN
    "industrieboden-broschuere": T("broschuere", "zentral", "Industrieboden-Broschüre", bereiche=["industrieboden"]),  # DE 2025/08 + EN
    "industrieboden-broschuere_de_2023": S(G_REVISION),
    "inotec_flyer_din_a4_6seiter_de_final": T("broschuere", "zentral", "Inotec Pumptechnik Flyer"),
    "inotec_flyer_din_a4_6seiter_en_final": T("broschuere", "zentral", "Inotec Pumptechnik Flyer", sprachMap={"—": "en"}),
    "inotec_flyer_din_a4_6seiter_fr_final": T("broschuere", "zentral", "Inotec Pumptechnik Flyer", sprachMap={"—": "fr"}),
    "korodur_flyer_bodensanierung_de_2020_08": T("broschuere", "zentral", "KORODUR Flyer Bodensanierung", bereiche=["industrieboden"]),
    "korodur_lieferprogramm_en_2025": T("service", "zentral", "KORODUR Lieferprogramm 2025", sprachMap={"—": "en"}),
    "korodur_report_10_englisch-1": S(G_REPORT), "korodur_report_11_englisch-1": S(G_REPORT),
    "korodur_report_12_englisch-1": S(G_REPORT), "korodur_report_13_englisch-1": S(G_REPORT),
    "korodur_report_14_englisch-1": S(G_REPORT), "korodur_report_15_englisch-1": S(G_REPORT),
    "korodur_report_16_englisch-1": S(G_REPORT), "korodur_report_17_englisch-1": S(G_REPORT),
    "korodur_report_18_englisch-1": S(G_REPORT), "korodur_report_4_englisch-1": S(G_REPORT),
    "korodur_report_5_englisch-1": S(G_REPORT), "korodur_report_6_englisch-1": S(G_REPORT),
    "korodur_report_7_englisch-1": S(G_REPORT), "korodur_report_8_englisch-1": S(G_REPORT),
    "korodur_report_9_englisch-1": S(G_REPORT), "korodur-report-10_2023": S(G_REPORT),
    "microtop_flyer": T("broschuere", "zentral", "MICROTOP Flyer", bereiche=["microtop"]),
    "prospekt_katzenstreu": S(G_KATZE),
    "rapid_set_broschuere": T("broschuere", "zentral", "Rapid Set Broschüre", langs=["fr"], bereiche=["rapid-set", "betonsanierung"]),  # FR; DE/EN via neuere Revisionen
    "rapid_set_broschuere_de-1": S(G_REVISION),
    "rapid_set_broschuere_en-1": T("broschuere", "zentral", "Rapid Set Broschüre", sprachMap={"—": "en"}, bereiche=["rapid-set", "betonsanierung"]),  # 2024/11
    "rapid-set-broschuere-neu": T("broschuere", "zentral", "Rapid Set Broschüre", bereiche=["rapid-set", "betonsanierung"]),  # DE 2024/02
    "rapid_set_flyer": T("broschuere", "zentral", "Rapid Set Flyer", bereiche=["rapid-set", "betonsanierung"]),
    "rapid_set_flyer_landwirtschaft_de_2017_17": T("broschuere", "zentral", "Rapid Set Flyer Landwirtschaft"),
    "rapidsetflyer_epoxy": T("broschuere", "zentral", "Rapid Set vs. Epoxidharz Flyer", bereiche=["rapid-set"]),
    "sanierung-korodur-flyer-fuer-web": T("broschuere", "zentral", "KORODUR Flyer Industriebodensanierung", bereiche=["industrieboden"]),
    "sichtestrich_faltprospekt_de_2023_web": S(G_SICHT),
    "sichtestrichkatalog": S(G_SICHT),
    "unternehmensbroschuere_2019": T("broschuere", "zentral", "KORODUR Unternehmensbroschüre"),

    # ========================== SYSTEM-SERVICE ==========================
    "1.-layer-fresh-on-fresh-application": T("anwendung", HE_ESTRICH, sprachMap={"en": "en"}),
    "10-rapid-set-repair-mortar_dot-for-concrete-roads": T("anwendung", ["dot-europe-concrete-mix"]),
    "2._schicht_auf_erhaerteten_tragbeton": S(G_REVISION + " (DE-Fassung bereits live unter anwendung/)"),
    "3._hartstoffeinstreuung": S(G_REVISION + " (DE-Fassung bereits live unter anwendung/)"),
    "3.-hard-aggregate-dry-shake-applicatio": T("anwendung", HE_EINSTREU),
    "6.-he-65-metallic-application-on-set-base-concrete": T("anwendung", ["neodur-he-65-metallisch"]),
    "7.-tru-decorative-screeds": T("anwendung", TRU),
    "8.-rapid-set-repair-mortar": T("anwendung", RAPID_REP),
    "9._mortar_mix_pflasterverfugung": S(G_REVISION + " (DE-Fassung bereits live unter anwendung/)"),
    "9.-mortar-mix-restoration-paved-surfaces": T("anwendung", ["rapid-set-mortar-mix"]),
    "anwendung_obtego_r-400": T("anwendung", "zentral", "Anwendung OBTEGO R-400"),  # OBTEGO: kein App-Produkt, wie TDS/SDB zentral
    "anwendungsempfehlung_he60_rapid": T("anwendung", ["neodur-he-60-rapid"], sprachMap={"en": "en"}),
    "application_obtego_r-400_grinded_polished_tru_floors": T("anwendung", "zentral", "Application OBTEGO R-400 (TRU floors)", sprachMap={"—": "en"}),
    "conseils-de-mise-en-oeuvre-kor-neo": T("anwendung", HE_ESTRICH + HE_EINSTREU, sprachMap={"fr": "fr"}),
    "einpflegesysteme-fuer-korodur-boeden": T("reinigung", "zentral", "Einpflegesysteme für KORODUR-Böden"),
    "einpflegesysteme-fuer-korodur-boeden_en_korr-003": T("reinigung", "zentral", "Einpflegesysteme für KORODUR-Böden", sprachMap={"—": "en"}),
    "inocom_cabrio_silotechnik": T("service", "zentral", "InoCOMB Cabrio Silotechnik"),
    "inocomb_cabrio_checkliste_baustelleneinsatz": T("service", "zentral", "InoCOMB Cabrio Checkliste Baustelleneinsatz"),
    "inocomb_cabrio_fragebogen": T("service", "zentral", "InoCOMB Cabrio Fragebogen"),
    "inotec-mietservice-09-2023": S(G_REVISION + " (Inotec-Mietservice bereits live unter service/)"),
    "korodur_korotan_industrieboden_system": T("service", ["system-korodur-korotan"], "System KORODUR-KOROTAN"),
    "korodur_schnellbetonsysteme": T("service", ["korocrete", "rapid-set-schnellbeton"], "KORODUR Schnellbetonsysteme"),
    "korodur-schnellbetonsysteme": T("service", ["korocrete", "rapid-set-schnellbeton"], "KORODUR Schnellbetonsysteme"),
    "microtop_4-seitig": T("broschuere", MICROTOP_TW, "MICROTOP Broschüre", bereiche=["microtop"]),
    "mischtechnik_rapid_set": T("anwendung", RAPID_REP, "Mischtechnik Rapid Set"),
    "mixing_technique_rapid_set": T("anwendung", RAPID_REP, "Mischtechnik Rapid Set", sprachMap={"en": "en"}),
    "pflegehinweis_tru_self-leveling_tru_gray_tru_pc_obtego": T("reinigung", TRU, sprachMap={"en": "en"}),
    "siloaufstellbedingungen": T("service", "zentral", "Siloaufstellbedingungen"),
    "system-rapid-set-concrete_de_2023": S(G_REVISION + " (System Rapid Set Concrete bereits live unter tds/)"),
    "uebersicht_pflegesysteme_fuer_korodur-boeden_de_2018_28": T("reinigung", "zentral", "Übersicht Pflegesysteme für KORODUR-Böden"),
    "uebersicht_pflegesysteme_fuer_korodur-boeden_en_2018_28": T("reinigung", "zentral", "Übersicht Pflegesysteme für KORODUR-Böden", sprachMap={"—": "en"}),
    "uebersicht_pflegesysteme_fuer_korodur-boeden_fr_2018_28": T("reinigung", "zentral", "Übersicht Pflegesysteme für KORODUR-Böden", sprachMap={"—": "fr"}),
    "verarbeitungshinweise_allgemeine_hinweise_aufheizen": T("anwendung", DESIGN + TRU, "Allgemeine Hinweise Aufheizen Sichtestriche"),
    "verarbeitungshinweise_allgemeine_hinweise_sichtestrich": T("anwendung", DESIGN + TRU, "Allgemeine Hinweise Sichtestriche"),

    # ========================== SDB (EN/FR-Pendants der DE-Zuordnungen) ==========================
    "designfloor_sdb": T("sds", DESIGN, sprachMap={"en": "en"}),
    "industrial_floor_dry_mortars_sdb": T("sds", TROCKENMOERTEL, sprachMap={"en": "en"}),
    "korodur_durcisseur_sdb": T("sds", HARTSTOFFE, sprachMap={"fr": "fr"}),
    "korodur_hard_aggregates_sdb": T("sds", HARTSTOFFE, sprachMap={"en": "en"}),
    "korodur_txpk_comp_a_sdb": T("sds", ["korodur-txpk"], sprachMap={"fr": "fr"}),
    "korodur_txpk_component_a_sdb": T("sds", ["korodur-txpk"], sprachMap={"en": "en"}),
    "koromineral_glaze_a_sdb": S(G_STALE + " (KOROMINERAL Lasur entfernt 2026-06-23)"),
    "koromineral_glaze_b_sdb": S(G_STALE + " (KOROMINERAL Lasur entfernt 2026-06-23)"),
    "koromineral_glaze_comp_a_sdb": S(G_STALE + " (KOROMINERAL Lasur entfernt 2026-06-23)"),
    "koromineral_glaze_comp_b_sdb": S(G_STALE + " (KOROMINERAL Lasur entfernt 2026-06-23)"),
    "koropox_comp_a_sdb": T("sds", "zentral", "KOROPOX Komponente A SDB", sprachMap={"fr": "fr"}),  # eingestellt, SDB für Bestandsware zentral
    "koropox_component_a_sdb": T("sds", "zentral", "KOROPOX Komponente A SDB", sprachMap={"en": "en"}),
    "koroseal_sdb": T("sds", "zentral", "KOROSEAL SDB"),
    "korosol_sdb": T("sds", "zentral", "KOROSOL SDB", sprachMap={"fr": "fr"}),
    "microtop_tw_mineral_sdb": T("sds", ["microtop-tw-mineral"], sprachMap={"en": "en"}),
    "neodur_mortier_de_joint_sdb": T("sds", PFM, sprachMap={"fr": "fr"}),
    "neodur_sols_industriels_sdb": T("sds", TROCKENMOERTEL, sprachMap={"fr": "fr"}),
    "pavement_fixing_hardener_component_sdb": T("sds", "zentral", "Pavement Fixing Hardener Component SDB", sprachMap={"en": "en"}),
    "pavement_fixing_resin_component_sdb": T("sds", "zentral", "Pavement Fixing Resin Component SDB", sprachMap={"en": "en"}),
    "pavement_joint_mortar_sdb": T("sds", PFM, sprachMap={"en": "en"}),
    "rapid_set_fast_sdb": T("sds", ["rapid-set-concrete-pharmacy"], sprachMap={"en": "en"}),
    "rapid_set_flow_control_sdb": T("sds", ["rapid-set-concrete-pharmacy"]),
    "rapid_set_set_control_sdb": T("sds", ["rapid-set-concrete-pharmacy"]),
    "sdb_korodur_asphalt_repair_mix": T("sds", ["asphalt-repair-mix"], sprachMap={"en": "en"}),
    "sdb_korodur_neodur_he-65_plus.en_": T("sds", ["neodur-he-65-plus"], sprachMap={"—": "en"}),
    "sols_decoratifs_mineraux_sdb": T("sds", DESIGN, sprachMap={"fr": "fr"}),

    # ========================== DoP ==========================
    "2.3-dop-neodur-he-3-green-en-1": T("dop", ["neodur-he-3-green"], sprachMap={"—": "en"}),
    "dop-cement-all-plus": T("dop", ["rapid-set-cement-all"], "DoP Cement All Plus", sprachMap={"—": "en"}),

    # ========================== TDS-Bucket: echte Produkt-Dokumente ==========================
    # FR/EN-DoPs (im Export als TDS fehlklassifiziert)
    "13813_2.10_neodur_he_3_met_f": S(G_UNKLAR + ": NEODUR HE 3 met F (FR-Altvariante)"),
    "13813_2.10_neodur_he_3_metallic": T("dop", ["neodur-he-3-metallisch"], sprachMap={"en": "en"}),
    "13813_2.12_neodur_he_2_metal_f": S(G_UNKLAR + ": NEODUR HE 2 metallisch (kein Pendant)"),
    "13813_2.12_neodur_he_2_metallic": S(G_UNKLAR + ": NEODUR HE 2 metallisch (kein Pendant)"),
    "13813_2.21_neodur_he_2_f": T("dop", ["neodur-he-2"], sprachMap={"fr": "fr"}),
    "13813_2.5_neodur_he_65_m4": S(G_UNKLAR + ": NEODUR HE 65 M4 (FR-Altvariante)"),
    "13813_2.5_neodur_he_65_metallic": T("dop", ["neodur-he-65-metallisch"], sprachMap={"en": "en"}),
    "13813_3.4_neodur_he_60_rapid_metallic": T("dop", ["neodur-he-60-rapid-metallisch"], sprachMap={"en": "en"}),
    "5.-decorative-screeds-kcf-and-granidur": T("anwendung", DESIGN, sprachMap={"en": "en"}),
    "asphalt-repair-mix": T("tds", ["asphalt-repair-mix"]),
    "cement-_all": T("tds", ["rapid-set-cement-all"], sprachMap={"fr": "fr"}),
    "designboden_alte-neue-bezeichnung": T("service", DESIGN, "Designboden: alte und neue Bezeichnungen"),
    "koroactive": T("tds", "zentral", "KOROACTIVE"),  # kein App-Produkt, Alt-Angebot -> zentral
    "korodur_txpk_de-1": S(G_REVISION + " (TXPK-Dublette, Basisdatei vorhanden)"),
    "korodur-fscem_en_2023-08": T("tds", ["korodur-fscem"], sprachMap={"—": "en"}),
    "korodur-nanofinish_fr_2023": T("tds", ["korodur-nanofinish"], sprachMap={"—": "fr"}),
    "korodur-pc_en_2023": T("tds", ["korodur-pc"], sprachMap={"—": "en"}),
    "korofluid": T("tds", "zentral", "KOROFLUID", sprachMap={"fr": "fr"}),
    "koromineral_glaze": S(G_STALE + " (KOROMINERAL Lasur entfernt 2026-06-23)"),
    "koromineral_li_en_2023": T("tds", ["koromineral-li"], sprachMap={"—": "en"}),
    "koromineral-cure_fr__2022": S(G_REVISION),
    "koromineral-cure_fr__2023": T("tds", ["koromineral-cure"], sprachMap={"—": "fr"}),
    "koroplan_pc": T("tds", "zentral", "KOROPLAN PC", sprachMap={"fr": "fr"}),
    "korosol": T("tds", "zentral", "KOROSOL", sprachMap={"fr": "fr"}),
    "korotex_de-1": S(G_REVISION + " (KOROTEX-Dublette, Basisdatei vorhanden)"),
    "leistungsbeschreibung_granidur": S(G_LV),
    "lv_tru_gray_self_leveling": S(G_LV),
    "lv_tru_self_leveling": S(G_LV),
    "microtop_tw_nsm_de-1": S(G_REVISION + " (TW-NSM-Dublette, Basisdatei vorhanden)"),
    "mixol_farbkarte": T("farbkarte", TRU, "MIXOL Farbkarte"),
    "mks_hippo_mixer_tru_mischtechnik": T("anwendung", TRU, "MKS Hippo Mixer TRU Mischtechnik"),
    "neodur_grouting_mortar_concrete": T("tds", VERGUSS, sprachMap={"en": "en"}),
    "neodur_he_2_metallique_f": S(G_UNKLAR + ": NEODUR HE 2 metallisch (kein Pendant)"),
    "neodur_he_2f": T("tds", ["neodur-he-2"], sprachMap={"fr": "fr"}),
    "neodur_he_3_metallisch_de-1": S(G_REVISION + " (HE-3-metallisch-Dublette, Basisdatei vorhanden)"),
    "neodur_he_3_metallisch_f": S(G_UNKLAR + ": NEODUR HE 3 met F (FR-Altvariante)"),
    "neodur_he_3_svs_3": T("tds", ["neodur-he-3-svs-3"], langs=["fr", "pl"]),
    "neodur_he_50_sf": S(G_STALE + " (NEODUR HE 50 SF nicht im Sortiment der neuen Site)"),
    "neodur_he_65_m4": S(G_UNKLAR + ": NEODUR HE 65 M4 (FR-Altvariante)"),
    "neodur_he_65_r": S(G_UNKLAR + ": NEODUR HE 65 R (FR-Altvariante)"),
    "neodur_he_65_svs_3": T("tds", ["neodur-he-65-svs-3"], langs=["fr", "pl"]),
    "neodur_level_en_2023-10": T("tds", ["neodur-level"], sprachMap={"—": "en"}),
    "neodur_level_fr_2023-10": T("tds", ["neodur-level"], sprachMap={"—": "fr"}),
    "neodur_mortier_de_scellement_vm_vb": T("tds", VERGUSS, sprachMap={"fr": "fr"}),
    "neodur_pfm-ze_rapid": S(G_UNKLAR + ": PFM-ZE rapid (Variante ohne Pendant in der App)"),
    "neodur_vergussmoertel": S(G_REVISION + " (Sammel-TDS, aktuelle DE-Fassung NEODUR_VM_1_3_8 live)"),
    "neodur-he-2_fr_2023-06": T("tds", ["neodur-he-2"], sprachMap={"—": "fr"}),
    "rapid_set_6-seitig": T("broschuere", "zentral", "Rapid Set Broschüre (6-seitig)", langs=["es", "pl"], bereiche=["rapid-set"]),
    "rapid_set_6-seitig_ee": S(G_LANG), "rapid_set_6-seitig_lt": S(G_LANG),
    "rapid_set_6-seitig_lv": S(G_LANG), "rapid_set_6-seitig_slo": S(G_LANG),
    "rapid_set_vs._epoxidharz": T("broschuere", "zentral", "Rapid Set vs. Epoxidharz", langs=["fr"], bereiche=["rapid-set"]),
    "schleifanleitung_tru": T("anwendung", TRU, "Schleifanleitung TRU"),
    "sichtestrich_8-seitig": S(G_SICHT),
    "standsilo_aufnahmebeschlaege": T("service", "zentral", "Standsilo Aufnahmebeschläge"),
    "tru-pc": T("tds", ["tru-pc"], sprachMap={"fr": "fr"}),
    "werkzeugliste_granidur_kcf": T("anwendung", DESIGN, "Werkzeugliste GRANIDUR/KCF"),
    "werkzeugliste_tru_self-leveling": T("anwendung", TRU, "Werkzeugliste TRU Self-Leveling"),
    "referenz_fiorini": S(G_REFERENZ),

    "12.-allgemeine-hinweise-aufheizen-sichtestriche": S(G_REVISION + " (Dublette der Verarbeitungshinweise Aufheizen)"),
    "allgemeine_hinweise_designestriche": T("anwendung", DESIGN, "Allgemeine Hinweise Designestriche", sprachMap={"fr": "fr"}),
    "allgemeine_hinweise_sichtestriche": T("anwendung", DESIGN + TRU, "Allgemeine Hinweise Sichtestriche", sprachMap={"en": "en"}),
    "barrierefrei_pflasterfugensanierung": S(G_PRESSE),
    "konstruktionsbeispiel_kcf_05-08": T("anwendung", ["kcf"], "Konstruktionsbeispiel KCF 05/08", sprachMap={"fr": "fr"}),
    "korodur_microtop_4_seitig": S(G_REVISION + " (Dublette der MICROTOP-Broschüre)"),

    # Sicherheitsunterweisungen (Alt-Service-Seite ohne Pendant)
    "deutsch": S(G_INTERN), "englisch": S(G_INTERN), "franzoesisch": S(G_INTERN),
    "polnisch": S(G_INTERN), "russisch": S(G_LANG), "tuerkisch": S(G_LANG),

    # ========================== Zertifikat ==========================
    "guetesiegel_innovativ_durch_forschung": T("service", "zentral", "Gütesiegel Innovativ durch Forschung"),
}

# Alles Übrige im TDS-Bucket ist Presse/Fachartikel (bau_*, az_*, ihk_*, …)
PRESSE_PREFIXE = (
    "bau_", "bau-", "baukultur_", "baustoff_partner", "beton_", "bp_", "abz_", "az_",
    "cpt-", "digitalmesse_", "dreifaltigkeitsschule", "fachzeitschrift", "fussbodentechnik",
    "gp_korodur", "ihk_", "industriebau_", "innovativ_durch_forschung", "katzenstreuartikel",
    "korodur_b_i_ausschreibungsblatt", "korodur_ft_", "korodur_fussboden_technik",
    "metallkette", "pet_04", "pressemitteilung", "sn_fachpresse", "teamwork_",
    "volumetrische_mischtechnik",
)

# ---------------------------------------------------------------------------
kandidaten = [x for x in STAMM if not x["aufNeuerSite"] and x["zuordnung"] != "(nur Mediathek)"]

funde = []
uebernommen, ausgelassen, fehler = [], [], []

for x in sorted(kandidaten, key=lambda k: k["stamm"]):
    stamm = x["stamm"]
    dec = DECISIONS.get(stamm)
    if dec is None:
        if stamm.startswith(PRESSE_PREFIXE):
            dec = S(G_PRESSE)
        else:
            fehler.append(f"OHNE ENTSCHEIDUNG: {stamm} ({x['typ']}, {sorted(x['urls'])})")
            continue
    if not dec["take"]:
        ausgelassen.append((stamm, x["typ"], dec["grund"]))
        continue

    ziel = dec["ziel"]
    if ziel != "zentral":
        unbekannt = [p for p in ziel if p not in PRODUKT_IDS]
        if unbekannt:
            fehler.append(f"UNBEKANNTE PRODUKT-ID {unbekannt} bei {stamm}")
            continue

    dateien = []
    for lang, url in sorted(x["urls"].items()):
        sprache = dec["sprachMap"].get(lang, "de" if lang == "—" else lang)
        if dec["langs"] and lang not in dec["langs"] and sprache not in (dec["langs"] or []):
            continue
        if sprache not in SITE_LANGS:
            continue
        r = INVENTAR.get(url)
        dateien.append({
            "sprache": sprache,
            "url": url,
            "lokal": r["lokaler_pfad"] if r else None,
            "kb": int(r["groesse_bytes"]) // 1024 if r and r["groesse_bytes"] else None,
        })
    if not dateien:
        fehler.append(f"KEINE SITE-SPRACHE ÜBRIG bei {stamm} ({sorted(x['urls'])})")
        continue

    titel = dec["titel"] or re.sub(r"[-_]+", " ", re.sub(r"_(de|en|fr|pl|es)([_.]\d{4}.*)?$", "", stamm)).strip().title()
    funde.append({
        "stamm": stamm,
        "typ": dec["typ"],
        "titel": titel,
        "ziel": "zentral" if ziel == "zentral" else ziel,
        "bereiche": dec["bereiche"],
        "dateien": dateien,
    })
    uebernommen.append((stamm, dec["typ"], titel, [d["sprache"] for d in dateien],
                        "zentral" if ziel == "zentral" else ", ".join(ziel), sum(d["kb"] or 0 for d in dateien)))

if fehler:
    print("FEHLER:")
    for f in fehler:
        print("  -", f)
    sys.exit(1)

Path("data/dokument-funde-2026-07.json").write_text(
    json.dumps({"quelle": "dokumente-stamm.json / #442, kuratiert 2026-07-02", "dokumente": funde},
               ensure_ascii=False, indent=2) + "\n"
)

# ---- Review-Doku ----
n_files = sum(len(f["dateien"]) for f in funde)
kb = sum(d["kb"] or 0 for f in funde for d in f["dateien"])
zeilen = [
    "# Übernahme Alt-Site-Downloads (#442) — Entscheidungsliste",
    "",
    "Generiert von `scripts/build-dokument-uebernahme-442.py` aus `dokumente-stamm.json`.",
    "Scope-Regel (Steffi 02.07.2026): verknüpfte Alt-Site-Downloads kommen auf die neue Site",
    "(Download-Center + Positionierung); Auslassungen stehen hier mit Grund.",
    "",
    f"**Übernommen: {len(funde)} Dokumente ({n_files} Dateien, ~{kb//1024} MB) · Ausgelassen: {len(ausgelassen)} Stämme.**",
    "",
    "## Übernommen",
    "",
    "| Stamm | Typ | Titel | Sprachen | Zuordnung | ~KB |",
    "|---|---|---|---|---|---:|",
]
for s, typ, titel, langs, ziel, size in uebernommen:
    zeilen.append(f"| {s} | {typ} | {titel} | {', '.join(langs)} | {ziel} | {size} |")
zeilen += ["", "## Ausgelassen (mit Grund)", "", "| Stamm | Typ | Grund |", "|---|---|---|"]
for s, typ, grund in sorted(ausgelassen, key=lambda a: (a[2], a[0])):
    zeilen.append(f"| {s} | {typ} | {grund} |")
zeilen.append("")
Path("docs/website-migration/dokumente-uebernahme-442.md").write_text("\n".join(zeilen))

print(f"Übernommen: {len(funde)} Stämme / {n_files} Dateien / ~{kb//1024} MB · Ausgelassen: {len(ausgelassen)}")
print("→ data/dokument-funde-2026-07.json · docs/website-migration/dokumente-uebernahme-442.md")

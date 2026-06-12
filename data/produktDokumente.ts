// GENERIERT von scripts/generate-produkt-dokumente.mjs — NICHT von Hand editieren.
// Quelle: KORODUR-website/05_wp-content-archiv (Service-Seiten-Stand Okt/Nov 2025).
// Regenerieren: node scripts/generate-produkt-dokumente.mjs

export type DokumentTyp = "tds" | "sds" | "dop" | "anwendung" | "reinigung" | "service";

export interface ProduktDokument {
  typ: DokumentTyp;
  titel: string;
  url: string; // relativ unter public/, ohne basePath
  sprache: "de" | "en" | "fr";
}

export const PRODUKT_DOKUMENTE: Record<string, ProduktDokument[]> = {
  "granidur": [
    {
      "typ": "tds",
      "titel": "Farbkarte de en",
      "url": "/downloads/tds/Farbkarte_de_en_fr.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "GRANIDUR 05 08",
      "url": "/downloads/tds/GRANIDUR_05_08_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "GRANIDUR 05 08",
      "url": "/downloads/tds/GRANIDUR_05_08_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "dop",
      "titel": "GRANIDUR 03",
      "url": "/downloads/dop/13813_5.3_GRANIDUR_03_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "GRANIDUR 05",
      "url": "/downloads/dop/13813_5.4_GRANIDUR_05_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "GRANIDUR 08",
      "url": "/downloads/dop/13813_5.5_GRANIDUR_08_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Sichtestriche KCF und Granidur",
      "url": "/downloads/anwendung/5.-Sichtestriche-KCF-und-Granidur.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis GRANIDUR MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_GRANIDUR_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "granidur-bianco-nero": [
    {
      "typ": "tds",
      "titel": "Farbkarte de en",
      "url": "/downloads/tds/Farbkarte_de_en_fr.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Granidur Bianco Nero",
      "url": "/downloads/tds/Granidur_Bianco_Nero_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Granidur Bianco Nero",
      "url": "/downloads/tds/Granidur_Bianco_Nero_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Granidur Bianco Nero",
      "url": "/downloads/tds/Granidur_Bianco_Nero_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "dop",
      "titel": "GRANIDUR BIANCO",
      "url": "/downloads/dop/13813_5.6_GRANIDUR_BIANCO_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "GRANIDUR NERO",
      "url": "/downloads/dop/13813_5.7_GRANIDUR_NERO_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Sichtestriche KCF und Granidur",
      "url": "/downloads/anwendung/5.-Sichtestriche-KCF-und-Granidur.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis GRANIDUR MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_GRANIDUR_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "kcf": [
    {
      "typ": "tds",
      "titel": "Farbkarte de en",
      "url": "/downloads/tds/Farbkarte_de_en_fr.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KCF 05 08",
      "url": "/downloads/tds/KCF_05_08_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "Copetti Floor KCF 05",
      "url": "/downloads/dop/13813_5.1_Copetti_Floor_KCF_05_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "Copetti Floor KCF 08",
      "url": "/downloads/dop/13813_5.2_Copetti_Floor_KCF_08_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Sichtestriche KCF und Granidur",
      "url": "/downloads/anwendung/5.-Sichtestriche-KCF-und-Granidur.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR COPETTI FLOOR OBTEGO",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_COPETTI_FLOOR_OBTEGO_de.pdf",
      "sprache": "de"
    }
  ],
  "tru-self-leveling": [
    {
      "typ": "tds",
      "titel": "Farbkarte de en",
      "url": "/downloads/tds/Farbkarte_de_en_fr.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "TRU Self Leveling",
      "url": "/downloads/tds/TRU_Self_Leveling_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "TRU Self Leveling",
      "url": "/downloads/tds/TRU_Self_Leveling_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "TRU Self Leveling",
      "url": "/downloads/tds/TRU_Self_Leveling_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR LevelFlor TRU",
      "url": "/downloads/sds/KORODUR_LevelFlor_TRU_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "TRU Sichtestriche",
      "url": "/downloads/anwendung/7.-TRU-Sichtestriche.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "TRU Sichtestriche",
      "url": "/downloads/reinigung/7._TRU_Sichtestriche.pdf",
      "sprache": "de"
    }
  ],
  "tru-pc": [
    {
      "typ": "tds",
      "titel": "Farbkarte de en",
      "url": "/downloads/tds/Farbkarte_de_en_fr.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "TRU PC",
      "url": "/downloads/tds/TRU_PC_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "TRU PC",
      "url": "/downloads/tds/TRU_PC_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "TRU PC",
      "url": "/downloads/tds/TRU_PC_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR LevelFlor TRU",
      "url": "/downloads/sds/KORODUR_LevelFlor_TRU_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "KORODUR TRU PC",
      "url": "/downloads/sds/KORODUR_TRU_PC_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "TRU Sichtestriche",
      "url": "/downloads/anwendung/7.-TRU-Sichtestriche.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "TRU Sichtestriche",
      "url": "/downloads/reinigung/7._TRU_Sichtestriche.pdf",
      "sprache": "de"
    }
  ],
  "tru-sp": [
    {
      "typ": "tds",
      "titel": "Farbkarte de en",
      "url": "/downloads/tds/Farbkarte_de_en_fr.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "TRU SP",
      "url": "/downloads/tds/TRU_SP_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "TRU SP",
      "url": "/downloads/tds/TRU_SP_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "TRU SP",
      "url": "/downloads/tds/TRU_SP_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR LevelFlor TRU",
      "url": "/downloads/sds/KORODUR_LevelFlor_TRU_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "TRU Sichtestriche",
      "url": "/downloads/anwendung/7.-TRU-Sichtestriche.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "TRU Sichtestriche",
      "url": "/downloads/reinigung/7._TRU_Sichtestriche.pdf",
      "sprache": "de"
    }
  ],
  "asphalt-repair-mix": [
    {
      "typ": "tds",
      "titel": "Asphalt Repair Mix",
      "url": "/downloads/tds/Asphalt_Repair_Mix_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Asphalt Repair Mix",
      "url": "/downloads/tds/Asphalt_Repair_Mix_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Asphalt Repair Mix",
      "url": "/downloads/tds/Asphalt_Repair_Mix_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Asphalt Repair Mix",
      "url": "/downloads/sds/KORODUR_Asphalt_Repair_Mix_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "rapid-set-cement-all": [
    {
      "typ": "tds",
      "titel": "Cement All",
      "url": "/downloads/tds/Cement_All_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Cement All Plus",
      "url": "/downloads/tds/Cement_All_Plus_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Cement All",
      "url": "/downloads/tds/Cement_All_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Cement All Plus",
      "url": "/downloads/tds/Cement_All_Plus_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Cement All",
      "url": "/downloads/tds/Cement_All_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Cement All plus",
      "url": "/downloads/sds/KORODUR_Cement_All_plus_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "Rapid Set CEMENT ALL",
      "url": "/downloads/dop/1001_1_998-1_Rapid_Set_CEMENT_ALL_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "Rapid Set CEMENT ALL",
      "url": "/downloads/dop/1001_1_13813_Rapid_Set_CEMENT_ALL_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel",
      "url": "/downloads/anwendung/8.-Rapid-Set-Reparaturmoertel.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel Sannierungsarbeiten",
      "url": "/downloads/anwendung/13-Rapid-Set-Reparaturmoertel_Sannierungsarbeiten.pdf",
      "sprache": "de"
    }
  ],
  "rapid-set-concrete-mix": [
    {
      "typ": "tds",
      "titel": "Concrete Mix",
      "url": "/downloads/tds/Concrete_Mix_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Concrete Mix",
      "url": "/downloads/tds/Concrete_Mix_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Concrete Mix",
      "url": "/downloads/tds/Concrete_Mix_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "dop",
      "titel": "Rapid Set CONCRETE MIX",
      "url": "/downloads/dop/1001_3_13813_Rapid_Set_CONCRETE_MIX_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel",
      "url": "/downloads/anwendung/8.-Rapid-Set-Reparaturmoertel.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel Sannierungsarbeiten",
      "url": "/downloads/anwendung/13-Rapid-Set-Reparaturmoertel_Sannierungsarbeiten.pdf",
      "sprache": "de"
    }
  ],
  "rapid-set-concrete-pharmacy": [
    {
      "typ": "tds",
      "titel": "Concrete Pharmacy",
      "url": "/downloads/tds/Concrete_Pharmacy_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Concrete Pharmacy",
      "url": "/downloads/tds/Concrete_Pharmacy_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Concrete Pharmacy fr 1",
      "url": "/downloads/tds/Concrete_Pharmacy_fr-1.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Rapid Set FAST",
      "url": "/downloads/sds/KORODUR_Rapid_Set_FAST_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Rapid Set FLOW Control",
      "url": "/downloads/sds/KORODUR_Rapid_Set_FLOW_Control_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Rapid Set SET Control",
      "url": "/downloads/sds/KORODUR_Rapid_Set_SET_Control_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "dot-europe-concrete-mix": [
    {
      "typ": "tds",
      "titel": "DOT Europe Concrete Mix",
      "url": "/downloads/tds/DOT_Europe_Concrete_Mix_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "DOT Europe Concrete Mix",
      "url": "/downloads/tds/DOT_Europe_Concrete_Mix_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "DOT Europe Concrete Mix",
      "url": "/downloads/tds/DOT_Europe_Concrete_Mix_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR DOT Europe CONCRETE MIX",
      "url": "/downloads/sds/KORODUR_DOT_Europe_CONCRETE_MIX_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel DOT fuer Verkehrsflaechen",
      "url": "/downloads/anwendung/10.-Rapid-Set-Reparaturmoertel_DOT-fuer-Verkehrsflaechen.pdf",
      "sprache": "de"
    }
  ],
  "korodur-durop": [
    {
      "typ": "tds",
      "titel": "DUROP",
      "url": "/downloads/tds/DUROP_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "DUROP",
      "url": "/downloads/tds/DUROP_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "DUROP fr 1",
      "url": "/downloads/tds/DUROP_fr-1.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Durop",
      "url": "/downloads/sds/KORODUR_Durop_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "koroclean": [
    {
      "typ": "tds",
      "titel": "KOROCLEAN",
      "url": "/downloads/tds/KOROCLEAN_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROCLEAN",
      "url": "/downloads/tds/KOROCLEAN_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "reinigung",
      "titel": "KOROCLEAN",
      "url": "/downloads/reinigung/KOROCLEAN_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Leitfaden KOROCLEAN",
      "url": "/downloads/reinigung/Leitfaden_KOROCLEAN_de.pdf",
      "sprache": "de"
    }
  ],
  "korocrete": [
    {
      "typ": "tds",
      "titel": "KOROCRETE Schnellbeton",
      "url": "/downloads/tds/KOROCRETE_Schnellbeton_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROCRETE Schnellbeton",
      "url": "/downloads/tds/KOROCRETE_Schnellbeton_en.pdf",
      "sprache": "en"
    }
  ],
  "korocure": [
    {
      "typ": "tds",
      "titel": "KOROCURE",
      "url": "/downloads/tds/KOROCURE_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROCURE",
      "url": "/downloads/tds/KOROCURE_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KOROCURE",
      "url": "/downloads/tds/KOROCURE_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Korocure",
      "url": "/downloads/sds/KORODUR_Korocure_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "korodur-0-4": [
    {
      "typ": "tds",
      "titel": "KORODUR 04",
      "url": "/downloads/tds/KORODUR_04_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR 04",
      "url": "/downloads/tds/KORODUR_04_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR 04",
      "url": "/downloads/tds/KORODUR_04_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR 0 4",
      "url": "/downloads/sds/KORODUR_0_4_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "korodur-diamantbeton": [
    {
      "typ": "tds",
      "titel": "KORODUR Diamantbeton",
      "url": "/downloads/tds/KORODUR_Diamantbeton_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR Diamantbeton",
      "url": "/downloads/tds/KORODUR_Diamantbeton_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR Diamantbeton",
      "url": "/downloads/tds/KORODUR_Diamantbeton_fr.pdf",
      "sprache": "fr"
    }
  ],
  "korodur-easyfinish": [
    {
      "typ": "tds",
      "titel": "KORODUR easyFinish",
      "url": "/downloads/tds/KORODUR_easyFinish_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR easyFinish",
      "url": "/downloads/tds/KORODUR_easyFinish_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR easyFinish fr 1",
      "url": "/downloads/tds/KORODUR_easyFinish_fr-1.pdf",
      "sprache": "fr"
    }
  ],
  "korodur-fscem": [
    {
      "typ": "tds",
      "titel": "KORODUR FSCem",
      "url": "/downloads/tds/KORODUR_FSCem_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR FSCem Basic",
      "url": "/downloads/tds/KORODUR_FSCem_Basic_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR FSCem",
      "url": "/downloads/tds/KORODUR_FSCem_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR FSCem fr 1",
      "url": "/downloads/tds/KORODUR_FSCem_fr-1.pdf",
      "sprache": "fr"
    }
  ],
  "korodur-fscem-screed": [
    {
      "typ": "tds",
      "titel": "KORODUR FSCem Screed",
      "url": "/downloads/tds/KORODUR_FSCem_Screed_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR FSCem Screed",
      "url": "/downloads/tds/KORODUR_FSCem_Screed_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR FSCem Screed fr 1",
      "url": "/downloads/tds/KORODUR_FSCem_Screed_fr-1.pdf",
      "sprache": "fr"
    }
  ],
  "korodur-hb-5": [
    {
      "typ": "tds",
      "titel": "KORODUR HB 5",
      "url": "/downloads/tds/KORODUR_HB_5_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR HB 5",
      "url": "/downloads/tds/KORODUR_HB_5_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR HB 5",
      "url": "/downloads/tds/KORODUR_HB_5_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR HB 5",
      "url": "/downloads/sds/KORODUR_HB_5_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "korodur-hb-5-rapid": [
    {
      "typ": "tds",
      "titel": "KORODUR HB 5 rapid",
      "url": "/downloads/tds/KORODUR_HB_5_rapid_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR HB 5 rapid",
      "url": "/downloads/tds/KORODUR_HB_5_rapid_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR HB 5 rapid fr 2",
      "url": "/downloads/tds/KORODUR_HB_5_rapid_fr-2.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR HB 5 60 rapid",
      "url": "/downloads/sds/KORODUR_HB_5_60_rapid_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "korodur-nanofinish": [
    {
      "typ": "tds",
      "titel": "KORODUR nanoFinish",
      "url": "/downloads/tds/KORODUR_nanoFinish_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR nanoFinish",
      "url": "/downloads/tds/KORODUR_nanoFinish_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR nanoFinish fr 1",
      "url": "/downloads/tds/KORODUR_nanoFinish_fr-1.pdf",
      "sprache": "fr"
    }
  ],
  "korodur-pc": [
    {
      "typ": "tds",
      "titel": "KORODUR PC",
      "url": "/downloads/tds/KORODUR_PC_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR PC",
      "url": "/downloads/tds/KORODUR_PC_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR PC fr 1",
      "url": "/downloads/tds/KORODUR_PC_fr-1.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR PC",
      "url": "/downloads/sds/KORODUR_PC_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "korodur-robust": [
    {
      "typ": "tds",
      "titel": "KORODUR Robust 03",
      "url": "/downloads/tds/KORODUR_Robust_03.pdf",
      "sprache": "de"
    }
  ],
  "korodur-silosystem": [
    {
      "typ": "tds",
      "titel": "KORODUR Silosystem",
      "url": "/downloads/tds/KORODUR_Silosystem_de.pdf",
      "sprache": "de"
    }
  ],
  "korodur-txpk": [
    {
      "typ": "tds",
      "titel": "KORODUR TXPK",
      "url": "/downloads/tds/KORODUR_TXPK_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR TXPK",
      "url": "/downloads/tds/KORODUR_TXPK_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR TXPK fr 1",
      "url": "/downloads/tds/KORODUR_TXPK_fr-1.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR TXPK Komponente A",
      "url": "/downloads/sds/KORODUR_TXPK_Komponente_A_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "KORODUR TXPK Komponente B",
      "url": "/downloads/sds/KORODUR_TXPK_Komponente_B_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "korodur-uniprimer": [
    {
      "typ": "tds",
      "titel": "KORODUR uniPrimer",
      "url": "/downloads/tds/KORODUR_uniPrimer_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR uniPrimer",
      "url": "/downloads/tds/KORODUR_uniPrimer_en.pdf",
      "sprache": "en"
    }
  ],
  "korodur-vs-0-5": [
    {
      "typ": "tds",
      "titel": "KORODUR VS 05",
      "url": "/downloads/tds/KORODUR_VS_05_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR VS 05",
      "url": "/downloads/tds/KORODUR_VS_05_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR VS 05",
      "url": "/downloads/tds/KORODUR_VS_05_fr.pdf",
      "sprache": "fr"
    }
  ],
  "korodur-wh-metallisch": [
    {
      "typ": "tds",
      "titel": "KORODUR WH metallisch",
      "url": "/downloads/tds/KORODUR_WH_metallisch_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR WH metallisch",
      "url": "/downloads/tds/KORODUR_WH_metallisch_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR WH metallisch",
      "url": "/downloads/tds/KORODUR_WH_metallisch_fr.pdf",
      "sprache": "fr"
    }
  ],
  "korodur-wh-spezial": [
    {
      "typ": "tds",
      "titel": "KORODUR WH Spezial",
      "url": "/downloads/tds/KORODUR_WH_Spezial_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR WH Spezial",
      "url": "/downloads/tds/KORODUR_WH_Spezial_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KORODUR WH Spezial",
      "url": "/downloads/tds/KORODUR_WH_Spezial_fr.pdf",
      "sprache": "fr"
    }
  ],
  "koromineral-cure": [
    {
      "typ": "tds",
      "titel": "KOROMINERAL CURE",
      "url": "/downloads/tds/KOROMINERAL_CURE_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROMINERAL CURE",
      "url": "/downloads/tds/KOROMINERAL_CURE_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KOROMINERAL CURE fr 1",
      "url": "/downloads/tds/KOROMINERAL_CURE_fr-1.pdf",
      "sprache": "fr"
    }
  ],
  "koromineral": [
    {
      "typ": "tds",
      "titel": "KOROMINERAL",
      "url": "/downloads/tds/KOROMINERAL_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROMINERAL",
      "url": "/downloads/tds/KOROMINERAL_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KOROMINERAL",
      "url": "/downloads/tds/KOROMINERAL_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR KOROMINERAL",
      "url": "/downloads/sds/KORODUR_KOROMINERAL_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "koromineral-li": [
    {
      "typ": "tds",
      "titel": "KOROMINERAL Li",
      "url": "/downloads/tds/KOROMINERAL_Li_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROMINERAL Li",
      "url": "/downloads/tds/KOROMINERAL_Li_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KOROMINERAL Li",
      "url": "/downloads/tds/KOROMINERAL_Li_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR KOROMINERAL Li",
      "url": "/downloads/sds/KORODUR_KOROMINERAL_Li_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "koropox": [
    {
      "typ": "tds",
      "titel": "KOROPOX",
      "url": "/downloads/tds/KOROPOX_de_2023.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROPOX",
      "url": "/downloads/tds/KOROPOX_en_2023.pdf",
      "sprache": "en"
    },
    {
      "typ": "sds",
      "titel": "KORODUR KOROPOX Komponente A",
      "url": "/downloads/sds/KORODUR_KOROPOX_Komponente_A_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "KORODUR KOROPOX Komponente B",
      "url": "/downloads/sds/KORODUR_KOROPOX_Komponente_B_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "korotan": [
    {
      "typ": "tds",
      "titel": "KORODUR KOROTAN",
      "url": "/downloads/tds/KORODUR_KOROTAN_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR KOROTAN",
      "url": "/downloads/tds/KORODUR_KOROTAN_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR Korotan",
      "url": "/downloads/sds/KORODUR_Korotan_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "system-korodur-korotan": [
    {
      "typ": "tds",
      "titel": "KORODUR KOROTAN",
      "url": "/downloads/tds/KORODUR_KOROTAN_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KORODUR KOROTAN",
      "url": "/downloads/tds/KORODUR_KOROTAN_fr.pdf",
      "sprache": "fr"
    }
  ],
  "korotex": [
    {
      "typ": "tds",
      "titel": "KOROTEX",
      "url": "/downloads/tds/KOROTEX_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "KOROTEX",
      "url": "/downloads/tds/KOROTEX_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "KOROTEX",
      "url": "/downloads/tds/KOROTEX_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR KOROTEX",
      "url": "/downloads/sds/KORODUR_KOROTEX_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "rapid-set-levelflor": [
    {
      "typ": "tds",
      "titel": "Levelflor",
      "url": "/downloads/tds/Levelflor_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Levelflor",
      "url": "/downloads/tds/Levelflor_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "sds",
      "titel": "KORODUR LevelFlor TRU",
      "url": "/downloads/sds/KORODUR_LevelFlor_TRU_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "microtop-tw-02": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW 02",
      "url": "/downloads/tds/MICROTOP_TW_02_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW 02",
      "url": "/downloads/tds/MICROTOP_TW_02_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW 02",
      "url": "/downloads/tds/MICROTOP_TW_02_fr.pdf",
      "sprache": "fr"
    }
  ],
  "microtop-tw-3": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW 3 5 8",
      "url": "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW 3 5 8",
      "url": "/downloads/tds/MICROTOP_TW_3_5_8_en.pdf",
      "sprache": "en"
    }
  ],
  "microtop-tw-5": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW 3 5 8",
      "url": "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW 3 5 8",
      "url": "/downloads/tds/MICROTOP_TW_3_5_8_en.pdf",
      "sprache": "en"
    }
  ],
  "microtop-tw-8": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW 3 5 8",
      "url": "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW 3 5 8",
      "url": "/downloads/tds/MICROTOP_TW_3_5_8_en.pdf",
      "sprache": "en"
    }
  ],
  "microtop-tw-bm": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW BM",
      "url": "/downloads/tds/MICROTOP_TW_BM_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW BM",
      "url": "/downloads/tds/MICROTOP_TW_BM_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW BM",
      "url": "/downloads/tds/MICROTOP_TW_BM_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR MICROTOP TW BM",
      "url": "/downloads/sds/KORODUR_MICROTOP_TW_BM_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "microtop-tw-mineral": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW Mineral",
      "url": "/downloads/tds/MICROTOP_TW_Mineral_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW Mineral",
      "url": "/downloads/tds/MICROTOP_TW_Mineral_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW Mineral",
      "url": "/downloads/tds/MICROTOP_TW_Mineral_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR MICROTOP TW Mineral",
      "url": "/downloads/sds/KORODUR_MICROTOP_TW_Mineral_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "microtop-tw-nsd": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW NSD",
      "url": "/downloads/tds/MICROTOP_TW_NSD_de.pdf",
      "sprache": "de"
    }
  ],
  "microtop-tw-nsm": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW NSM",
      "url": "/downloads/tds/MICROTOP_TW_NSM_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW NSM",
      "url": "/downloads/tds/MICROTOP_TW_NSM_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW NSM",
      "url": "/downloads/tds/MICROTOP_TW_NSM_fr.pdf",
      "sprache": "fr"
    }
  ],
  "microtop-tw-vsm": [
    {
      "typ": "tds",
      "titel": "MICROTOP TW VSM",
      "url": "/downloads/tds/MICROTOP_TW_VSM_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "MICROTOP TW VSM",
      "url": "/downloads/tds/MICROTOP_TW_VSM_en.pdf",
      "sprache": "en"
    }
  ],
  "rapid-set-mortar-mix": [
    {
      "typ": "tds",
      "titel": "Mortar Mix",
      "url": "/downloads/tds/Mortar_Mix_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Mortar Mix",
      "url": "/downloads/tds/Mortar_Mix_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Mortar Mix",
      "url": "/downloads/tds/Mortar_Mix_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "dop",
      "titel": "Rapid Set MORTAR MIX",
      "url": "/downloads/dop/1001_2_998-1_Rapid_Set_MORTAR_MIX_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "Rapid Set MORTAR MIX",
      "url": "/downloads/dop/1001_2_13813_Rapid_Set_MORTAR_MIX_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Mortar Mix Pflasterverfugung",
      "url": "/downloads/anwendung/9.-Mortar-Mix-Pflasterverfugung.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel",
      "url": "/downloads/anwendung/8.-Rapid-Set-Reparaturmoertel.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel Sannierungsarbeiten",
      "url": "/downloads/anwendung/13-Rapid-Set-Reparaturmoertel_Sannierungsarbeiten.pdf",
      "sprache": "de"
    }
  ],
  "rapid-set-mortar-mix-dur": [
    {
      "typ": "tds",
      "titel": "Mortar Mix",
      "url": "/downloads/tds/Mortar_Mix_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "Mortar Mix",
      "url": "/downloads/tds/Mortar_Mix_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "Mortar Mix",
      "url": "/downloads/tds/Mortar_Mix_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel",
      "url": "/downloads/anwendung/8.-Rapid-Set-Reparaturmoertel.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Rapid Set Reparaturmoertel Sannierungsarbeiten",
      "url": "/downloads/anwendung/13-Rapid-Set-Reparaturmoertel_Sannierungsarbeiten.pdf",
      "sprache": "de"
    }
  ],
  "neodur-am-super": [
    {
      "typ": "tds",
      "titel": "NEODUR AM Super AM Plus",
      "url": "/downloads/tds/NEODUR_AM_Super_AM_Plus_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-am-plus": [
    {
      "typ": "tds",
      "titel": "NEODUR AM Super AM Plus",
      "url": "/downloads/tds/NEODUR_AM_Super_AM_Plus_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-he-2": [
    {
      "typ": "tds",
      "titel": "NEODUR HE 2",
      "url": "/downloads/tds/NEODUR_HE_2_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 2",
      "url": "/downloads/tds/NEODUR_HE_2_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 2",
      "url": "/downloads/tds/NEODUR_HE_2_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 2",
      "url": "/downloads/dop/13813_2.11_NEODUR_HE_2_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 2 metallisch",
      "url": "/downloads/dop/13813_2.12_NEODUR_HE_2_metallisch_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Hartstoffeinstreuung 1",
      "url": "/downloads/anwendung/3.-Hartstoffeinstreuung-1.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR Hartstoff Industrieboeden MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-he-3": [
    {
      "typ": "tds",
      "titel": "NEODUR HE 3",
      "url": "/downloads/tds/NEODUR_HE_3_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3 metallisch",
      "url": "/downloads/tds/NEODUR_HE_3_metallisch_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3 spezial",
      "url": "/downloads/tds/NEODUR_HE_3_spezial_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3",
      "url": "/downloads/tds/NEODUR_HE_3_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3 metallisch",
      "url": "/downloads/tds/NEODUR_HE_3_metallisch_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3",
      "url": "/downloads/tds/NEODUR_HE_3_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3 metallisch",
      "url": "/downloads/tds/NEODUR_HE_3_metallisch_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "NEODUR HE 3",
      "url": "/downloads/sds/NEODUR_HE_3_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 3",
      "url": "/downloads/dop/13813_2.6_NEODUR_HE_3_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 3 metallisch",
      "url": "/downloads/dop/13813_2.10_NEODUR_HE_3_metallisch_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 3 SVS 15",
      "url": "/downloads/dop/13813_2.8_NEODUR_HE_3_SVS_15_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 3 SVS 15 extra",
      "url": "/downloads/dop/13813_2.9_NEODUR_HE_3_SVS_15_extra_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 3 SVS 3",
      "url": "/downloads/dop/13813_2.7_NEODUR_HE_3_SVS_3_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Hartstoffeinstreuung 1",
      "url": "/downloads/anwendung/3.-Hartstoffeinstreuung-1.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR Hartstoff Industrieboeden MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-he-3-green": [
    {
      "typ": "tds",
      "titel": "NEODUR HE 3 green",
      "url": "/downloads/tds/NEODUR_HE_3_green_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3 green",
      "url": "/downloads/tds/NEODUR_HE_3_green_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 3 green",
      "url": "/downloads/tds/NEODUR_HE_3_green_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "NEODUR HE 3 green",
      "url": "/downloads/sds/NEODUR_HE_3_green_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Hartstoffeinstreuung 1",
      "url": "/downloads/anwendung/3.-Hartstoffeinstreuung-1.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR Hartstoff Industrieboeden MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-he-40": [
    {
      "typ": "tds",
      "titel": "NEODUR HE 40",
      "url": "/downloads/tds/NEODUR_HE_40_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 40",
      "url": "/downloads/tds/NEODUR_HE_40_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 40",
      "url": "/downloads/tds/NEODUR_HE_40_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 40 8 SVS 5",
      "url": "/downloads/dop/13813_2.16_NEODUR_HE_40_8_SVS_5_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 40 SVS 5",
      "url": "/downloads/dop/13813_2.15_NEODUR_HE_40_SVS_5_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Schicht auf erhaerteten Tragbeton",
      "url": "/downloads/anwendung/2.-Schicht-auf-erhaerteten-Tragbeton.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Schicht Frisch auf Frisch",
      "url": "/downloads/anwendung/1.-Schicht-Frisch-auf-Frisch.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR Hartstoff Industrieboeden MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-he-60-rapid": [
    {
      "typ": "tds",
      "titel": "NEODUR HE 60 rapid",
      "url": "/downloads/tds/NEODUR_HE_60_rapid_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 60 rapid",
      "url": "/downloads/tds/NEODUR_HE_60_rapid_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 60 rapid",
      "url": "/downloads/tds/NEODUR_HE_60_rapid_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR HB 5 60 rapid",
      "url": "/downloads/sds/KORODUR_HB_5_60_rapid_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "NEODUR HE 60 rapid",
      "url": "/downloads/sds/NEODUR_HE_60_rapid_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 60 rapid metallisch",
      "url": "/downloads/dop/13813_3.4_NEODUR_HE_60_rapid_metallisch_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 60 rapid SVS 1.5",
      "url": "/downloads/dop/13813_3.3_NEODUR_HE_60_rapid_SVS_1.5_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 60 rapid SVS 3",
      "url": "/downloads/dop/13813_3.2_NEODUR_HE_60_rapid_SVS_3_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 60 rapid SVS 5",
      "url": "/downloads/dop/13813_3.1_NEODUR_HE_60_rapid_SVS_5_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR Hartstoff Industrieboeden MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-he-65": [
    {
      "typ": "tds",
      "titel": "NEODUR HE 65",
      "url": "/downloads/tds/NEODUR_HE_65_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 65 metallisch",
      "url": "/downloads/tds/NEODUR_HE_65_metallisch_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 65",
      "url": "/downloads/tds/NEODUR_HE_65_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 65 metallisch",
      "url": "/downloads/tds/NEODUR_HE_65_metallisch_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 65",
      "url": "/downloads/tds/NEODUR_HE_65_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "tds",
      "titel": "NEODUR HE 65 metallisch",
      "url": "/downloads/tds/NEODUR_HE_65_metallisch_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "NEODUR HE 65",
      "url": "/downloads/sds/NEODUR_HE_65_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 65",
      "url": "/downloads/dop/13813_2.1_NEODUR_HE_65_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 65 metallisch",
      "url": "/downloads/dop/13813_2.5_NEODUR_HE_65_metallisch_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 65 SVS 15",
      "url": "/downloads/dop/13813_2.3_NEODUR_HE_65_SVS_15_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 65 SVS 15 Extra",
      "url": "/downloads/dop/13813_2.4_NEODUR_HE_65_SVS_15_Extra_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR HE 65 SVS 3",
      "url": "/downloads/dop/13813_2.2_NEODUR_HE_65_SVS_3_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "HE 65 metallisch auf erhaerteten Tragbeton 1",
      "url": "/downloads/anwendung/6.-HE-65-metallisch-auf-erhaerteten-Tragbeton-1.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Schicht auf erhaerteten Tragbeton",
      "url": "/downloads/anwendung/2.-Schicht-auf-erhaerteten-Tragbeton.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Schicht Frisch auf Frisch",
      "url": "/downloads/anwendung/1.-Schicht-Frisch-auf-Frisch.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR Hartstoff Industrieboeden MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-he-65-plus": [
    {
      "typ": "tds",
      "titel": "NEODUR HE 65 Plus",
      "url": "/downloads/tds/NEODUR_HE_65_Plus_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "NEODUR HE 65 plus",
      "url": "/downloads/sds/NEODUR_HE_65_plus_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Schicht auf erhaerteten Tragbeton",
      "url": "/downloads/anwendung/2.-Schicht-auf-erhaerteten-Tragbeton.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "Schicht Frisch auf Frisch",
      "url": "/downloads/anwendung/1.-Schicht-Frisch-auf-Frisch.pdf",
      "sprache": "de"
    },
    {
      "typ": "reinigung",
      "titel": "Pflegehinweis KORODUR Hartstoff Industrieboeden MKS Funke",
      "url": "/downloads/reinigung/Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-level-au": [
    {
      "typ": "tds",
      "titel": "NEODUR Level AU",
      "url": "/downloads/tds/NEODUR_Level_AU_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR Level AU",
      "url": "/downloads/tds/NEODUR_Level_AU_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR Level AU",
      "url": "/downloads/tds/NEODUR_Level_AU_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "KORODUR NEODUR Level AU",
      "url": "/downloads/sds/KORODUR_NEODUR_Level_AU_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-level": [
    {
      "typ": "tds",
      "titel": "NEODUR Level",
      "url": "/downloads/tds/NEODUR_Level_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR Level",
      "url": "/downloads/tds/NEODUR_Level_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR Level",
      "url": "/downloads/tds/NEODUR_Level_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "NEODUR level",
      "url": "/downloads/sds/NEODUR_level_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "dop",
      "titel": "NEODUR Level",
      "url": "/downloads/dop/13813_4.1_NEODUR_Level_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "anwendung",
      "titel": "NEODUR Level",
      "url": "/downloads/anwendung/4.-NEODUR-Level.pdf",
      "sprache": "de"
    }
  ],
  "neodur-msm-3": [
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_fr.pdf",
      "sprache": "fr"
    }
  ],
  "neodur-msm-5": [
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_fr.pdf",
      "sprache": "fr"
    }
  ],
  "neodur-msb-8": [
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR MSM 3 5 MSB 8",
      "url": "/downloads/tds/NEODUR_MSM_3_5_MSB_8_fr.pdf",
      "sprache": "fr"
    }
  ],
  "neodur-pfm-1k-easyfix": [
    {
      "typ": "tds",
      "titel": "NEODUR PFM 1K Easyfix",
      "url": "/downloads/tds/NEODUR_PFM_1K_Easyfix_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR PFM 1K Easyfix",
      "url": "/downloads/tds/NEODUR_PFM_1K_Easyfix_en.pdf",
      "sprache": "en"
    }
  ],
  "neodur-pfm-ze": [
    {
      "typ": "tds",
      "titel": "NEODUR PFM ZE PFM ZE Flex",
      "url": "/downloads/tds/NEODUR_PFM_ZE_PFM_ZE_Flex_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR PFM ZE PFM ZE Flex",
      "url": "/downloads/tds/NEODUR_PFM_ZE_PFM_ZE_Flex_en.pdf",
      "sprache": "en"
    }
  ],
  "neodur-vm-1": [
    {
      "typ": "tds",
      "titel": "NEODUR VM 1 3 8",
      "url": "/downloads/tds/NEODUR_VM_1_3_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR VM 1 3 8",
      "url": "/downloads/tds/NEODUR_VM_1_3_8_fr.pdf",
      "sprache": "fr"
    }
  ],
  "neodur-vm-3": [
    {
      "typ": "tds",
      "titel": "NEODUR VM 1 3 8",
      "url": "/downloads/tds/NEODUR_VM_1_3_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR VM 1 3 8",
      "url": "/downloads/tds/NEODUR_VM_1_3_8_fr.pdf",
      "sprache": "fr"
    }
  ],
  "neodur-vb-8": [
    {
      "typ": "tds",
      "titel": "NEODUR VM 1 3 8",
      "url": "/downloads/tds/NEODUR_VM_1_3_8_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR VM 1 3 8",
      "url": "/downloads/tds/NEODUR_VM_1_3_8_fr.pdf",
      "sprache": "fr"
    }
  ],
  "neodur-vm-5": [
    {
      "typ": "tds",
      "titel": "NEODUR VM 5",
      "url": "/downloads/tds/NEODUR_VM_5_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR VM 5",
      "url": "/downloads/tds/NEODUR_VM_5_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR VM 5",
      "url": "/downloads/tds/NEODUR_VM_5_fr.pdf",
      "sprache": "fr"
    },
    {
      "typ": "sds",
      "titel": "NEODUR VM 5",
      "url": "/downloads/sds/NEODUR_VM_5_SDB_de.pdf",
      "sprache": "de"
    }
  ],
  "neodur-vm-basic": [
    {
      "typ": "tds",
      "titel": "NEODUR VM basic",
      "url": "/downloads/tds/NEODUR_VM_basic_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "NEODUR VM basic",
      "url": "/downloads/tds/NEODUR_VM_basic_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "NEODUR VM basic",
      "url": "/downloads/tds/NEODUR_VM_basic_fr.pdf",
      "sprache": "fr"
    }
  ],
  "rapid-set-schnellbeton": [
    {
      "typ": "tds",
      "titel": "System Rapid Set Concrete",
      "url": "/downloads/tds/System_Rapid_Set_Concrete_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "tds",
      "titel": "System Rapid Set Concrete",
      "url": "/downloads/tds/System_Rapid_Set_Concrete_en.pdf",
      "sprache": "en"
    },
    {
      "typ": "tds",
      "titel": "System Rapid Set Concrete",
      "url": "/downloads/tds/System_Rapid_Set_Concrete_fr.pdf",
      "sprache": "fr"
    }
  ],
  "koromineral-lasur": [
    {
      "typ": "sds",
      "titel": "KORODUR KOROMINERAL Lasur Komponente A",
      "url": "/downloads/sds/KORODUR_KOROMINERAL_Lasur_Komponente_A_SDB_de.pdf",
      "sprache": "de"
    },
    {
      "typ": "sds",
      "titel": "KORODUR KOROMINERAL Lasur Komponente B",
      "url": "/downloads/sds/KORODUR_KOROMINERAL_Lasur_Komponente_B_SDB_de.pdf",
      "sprache": "de"
    }
  ]
};

/** Dokumente ohne (freigegebene) Produkt-Zuordnung — nur im Download-Center. */
export const ZENTRALE_DOKUMENTE: ProduktDokument[] = [
  {
    "typ": "tds",
    "titel": "Bestellformular Sackware 2024",
    "url": "/downloads/tds/Bestellformular_Sackware_2024.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "Bestellformular Siloware",
    "url": "/downloads/tds/Bestellformular_Siloware.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "Bestellformular MICROTOP 2024",
    "url": "/downloads/tds/Bestellformular_MICROTOP_2024.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "Glossprofi",
    "url": "/downloads/tds/Glossprofi_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "Inotec Mietservice",
    "url": "/downloads/tds/Inotec_Mietservice_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "KOROPHALT 02",
    "url": "/downloads/tds/KOROPHALT_02_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "KOROPHALT 02",
    "url": "/downloads/tds/KOROPHALT_02_en.pdf",
    "sprache": "en"
  },
  {
    "typ": "tds",
    "titel": "KOROPHALT 02",
    "url": "/downloads/tds/KOROPHALT_02_fr.pdf",
    "sprache": "fr"
  },
  {
    "typ": "tds",
    "titel": "OBTEGO P 20",
    "url": "/downloads/tds/OBTEGO_P_20_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "OBTEGO P 20",
    "url": "/downloads/tds/OBTEGO_P_20_en.pdf",
    "sprache": "en"
  },
  {
    "typ": "tds",
    "titel": "OBTEGO R 400",
    "url": "/downloads/tds/OBTEGO_R_400_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "tds",
    "titel": "OBTEGO R 400",
    "url": "/downloads/tds/OBTEGO_R_400_en.pdf",
    "sprache": "en"
  },
  {
    "typ": "tds",
    "titel": "Thilos dunnflussig",
    "url": "/downloads/tds/Thilos_dunnflussig_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR Designboeden",
    "url": "/downloads/sds/KORODUR_Designboeden_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR Industrieboden Trockenmoertel",
    "url": "/downloads/sds/KORODUR_Industrieboden_Trockenmoertel_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR Hartstoffe",
    "url": "/downloads/sds/KORODUR_Hartstoffe_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR KOROSEAL",
    "url": "/downloads/sds/KORODUR_KOROSEAL_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR MICROTOP",
    "url": "/downloads/sds/KORODUR_MICROTOP_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR NEODUR Pflasterfugenmoertel",
    "url": "/downloads/sds/KORODUR_NEODUR_Pflasterfugenmoertel_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR NEODUR Vergussmoertel",
    "url": "/downloads/sds/KORODUR_NEODUR_Vergussmoertel_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "OBTEGO P 20",
    "url": "/downloads/sds/OBTEGO_P-20_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "OBTEGO R 400",
    "url": "/downloads/sds/OBTEGO_R-400_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR Pflasterfugenmoertel Haerterkomponente",
    "url": "/downloads/sds/KORODUR_Pflasterfugenmoertel_Haerterkomponente_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR Pflasterfugenmoertel Harzkomponente",
    "url": "/downloads/sds/KORODUR_Pflasterfugenmoertel_Harzkomponente_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "sds",
    "titel": "KORODUR Rapid Set",
    "url": "/downloads/sds/KORODUR_Rapid_Set_SDB_de.pdf",
    "sprache": "de"
  },
  {
    "typ": "service",
    "titel": "KORODUR Lieferprogramm",
    "url": "/downloads/service/KORODUR_Lieferprogramm_de_2025.pdf",
    "sprache": "de"
  }
];

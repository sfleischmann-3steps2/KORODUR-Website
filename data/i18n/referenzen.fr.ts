/** French translations for reference project data */
export const referenzenFR: Record<string, {
  titel?: string;
  untertitel?: string;
  land?: string;
  flaeche?: string;
  ausgangssituation?: string;
  herausforderungen?: string[];
  loesung?: string;
  ergebnis?: string | string[];
  kennwerte?: { value: string; label: string }[];
  vorteile?: string[];
  bildAlt?: string;
}> = {
  "antolin-wochenend-sanierung": {
    titel: "Rénovation pendant le week-end, Antolin, Autriche",
    untertitel: "Dans un hall de production du fournisseur automobile Antolin, une surface au sol endommagée d'environ 150 m² devait être réparée dans les plus brefs délais, sans interrompre la production.",
    land: "Autriche",
    herausforderungen: [
      "Ne pas bloquer la production du hall",
      "Travaux réalisables uniquement le week-end",
      "Réutilisation rapide du hall exigée par le client",
      "Haute résistance à l'usure du sol pour les sollicitations les plus fortes",
    ],
    loesung: "En automne 2018, deux sections de sol endommagées de 75 m² chacune ont été réparées. Le produit utilisé était NEODUR HE 60 Rapid, une chape à prise rapide à faible retrait, qui répondait entièrement aux exigences requises : une réutilisation en seulement 48 heures et une résistance à l'usure élevée pour les sollicitations les plus fortes.",
    kennwerte: [
      { value: "env. 150 m²", label: "Surface au sol endommagée" },
      { value: "2 x 75 m²", label: "Sections réparées" },
      { value: "48 heures", label: "Réutilisation" },
      { value: "NEODUR HE 60 Rapid", label: "Produit utilisé" },
    ],
    ergebnis: "NEODUR HE 60 Rapid a permis une réutilisation en seulement 48 heures et une résistance à l'usure élevée pour les sollicitations les plus fortes. Les attentes du client ont été parfaitement satisfaites.",
    ausgangssituation: "Une surface au sol endommagée d'environ 150 m² devait être réparée dans les brefs délais dans un hall de production pour le fournisseur automobile Antolin. La principale contrainte était de ne pas bloquer la production, si bien que les travaux n'étaient possibles que le week-end. Le client exigeait en outre une réutilisation rapide de son hall et une haute résistance à l'usure du sol.",
    vorteile: [],
    bildAlt: "Rénovation d'un hall de production chez Antolin à Ebergassing",
  },
  "kleemann-produktionshalle": {
    titel: "Hall de production Kleemann",
    untertitel: "Charges lourdes – réalisation rapide",
    land: "Allemagne",
    herausforderungen: [
      "Sollicitations mécaniques élevées : machines lourdes et véhicules à chenilles",
      "Temps d'arrêt limités – planification précise requise",
      "Stabilité volumétrique et faible retrait exigés",
      "Adhérence solide sur le support en béton existant nécessaire",
    ],
    loesung:
      "NEODUR HE 60 rapid (15 mm) appliqué sur pont d'adhérence EP spécial. Le sol était pleinement praticable après seulement 48 heures.",
    vorteile: [
      "Temps d'arrêt considérablement réduits, remise en service en seulement 48 h",
      "Haute résistance à l'abrasion (≤ 5,0 cm³/50 cm²)",
      "Stable en volume, faible retrait – fissuration minimisée",
    ],
    bildAlt: "Rénovation du hall de production chez Kleemann à Göppingen",
  },
  "monheim-produktionsflaeche": {
    titel: "Surface de production Monheim",
    untertitel: "Rénovation entre les jours fériés",
    land: "Allemagne",
    herausforderungen: [
      "Sollicitations extrêmes permanentes et ponctuelles par trafic lourd et chariots élévateurs",
      "Créneau d'exécution très limité",
      "Logistique et mise en oeuvre de 42 m³ de béton rapide directement sur site",
    ],
    loesung:
      "Rénovation avec KOROCRETE béton rapide – fraîchement malaxé par centrale de dosage volumétrique mobile, mis en place sur KORODUR HB 5 rapid et lissé mécaniquement.",
    vorteile: [
      "Temps d'arrêt extrêmement court – de nouveau carrossable en quelques heures",
      "Haute résistance aux charges – idéal pour les zones à charges lourdes",
      "Mélange de béton flexible sur site – pertes réduites, haute efficacité",
      "Alternative durable et économique à la reconstruction",
    ],
    bildAlt: "Rénovation de la surface de production chez apt Extrusions à Monheim",
  },
  "weag-entsorgungsbetrieb": {
    titel: "Centre de recyclage WEAG",
    untertitel: "Rapide, robuste, durable – en 24 h",
    land: "Allemagne",
    herausforderungen: [
      "Sollicitations mécaniques extrêmement élevées en exploitation continue",
      "Délai court entre la mise en oeuvre et l'utilisation sous charge",
      "Garantie de stabilité volumétrique et de retrait minimisé",
      "Préparation du béton existant (fraisage, grenaillage, nettoyage)",
      "Adhérence solide au nouveau revêtement à haute résistance à l'abrasion",
    ],
    loesung:
      "Le sol en béton de plus de 20 ans du hall de production/recyclage a été rénové sur environ 200 m² avec la chape rapide à haute résistance NEODUR HE 60 rapid sur pont d'adhérence KORODUR HB 5 rapid – avec une remise en service la plus rapide possible.",
    vorteile: [
      "Remise en service rapide après seulement 24 heures",
      "Haute résistance à l'abrasion pour exploitation continue",
      "Stable en volume avec retrait minimisé",
      "Adhérence robuste sur ancien béton",
    ],
    bildAlt: "Rénovation du sol au centre de recyclage WEAG",
  },
  "wochenend-sanierung-werkstatt": {
    titel: "Rénovation d'atelier en un week-end",
    untertitel: "Qualité industrielle en temps record",
    land: "Allemagne",
    herausforderungen: [
      "Délai extrêmement court : rénovation en un week-end",
      "Basses températures ambiantes en février, compliquant la prise",
      "Garantie de l'adhérence sur l'ancien béton (préparation + pont d'adhérence)",
      "Exigences élevées en résistance à l'abrasion et durabilité en usage industriel",
    ],
    loesung:
      "Le pont d'adhérence à durcissement rapide KORODUR HB 5 rapid et la chape à haute résistance NEODUR HE 60 rapid ont été appliqués et lissés. Malgré les conditions froides, la surface était praticable et opérationnelle après un court délai.",
    vorteile: [
      "Temps d'arrêt d'exploitation extrêmement court (rénovation en un week-end)",
      "Haute résistance à l'abrasion grâce à la technologie de granulats durs",
      "Fonctionnalité assurée malgré les basses températures",
      "Stabilité volumétrique avec faible retrait – fissuration minimisée",
    ],
    bildAlt: "Atelier rénové à Neutraubling en un week-end",
  },
  "strandkorbhalle-sylt": {
    titel: "Hall de chaises de plage Sylt",
    untertitel: "2 200 m² – rapidement et économiquement",
    land: "Allemagne",
    herausforderungen: [
      "Remise en état dans un délai d'environ 4 mois après un incendie",
      "Exigences élevées en résistance à l'abrasion mécanique et aux intempéries",
      "Adhérence solide au support par un pont d'adhérence adapté",
      "Méthode de mise en oeuvre économique (matériau en silo / technique de pompage)",
    ],
    loesung:
      "Rénovation avec la chape à haute résistance NEODUR HE 65. La mise en place de la couche d'usure sur pont d'adhérence KORODUR HB 5 a été réalisée avec le système de silo KORODUR avec technique de pompage et de malaxage, permettant un déroulement des travaux très économique et durable.",
    vorteile: [
      "Résistant à l'utilisation et aux intempéries – surface durable",
      "Mise en oeuvre rapide et efficace grâce à la technique de silo",
      "Adhérence sûre et solide sur le support en béton durci",
      "Sécurité d'exploitation durable et protection des chaises de plage",
    ],
    bildAlt: "Hall de chaises de plage à Sylt avec nouveau sol industriel",
  },
  "loosen-werkzeug-klausen": {
    titel: "Rénovation en exploitation – Loosen",
    untertitel: "Rapide. Stable. Fiable.",
    land: "Allemagne",
    herausforderungen: [
      "Travaux en cours d'exploitation, sans arrêt de la production",
      "Délai court : rénovation en quelques heures seulement",
      "Garantie d'une adhérence solide au support (prétraitement, pont d'adhérence)",
    ],
    loesung:
      "Après la préparation du support, KORODUR HB 5 rapid a été appliqué comme pont d'adhérence. Ensuite, KOROCRETE béton rapide (environ 80 mm d'épaisseur de couche) a été malaxé directement sur site avec une technique de dosage volumétrique, appliqué, tiré à la règle et lissé mécaniquement. L'ensemble des travaux de bétonnage était terminé dès la matinée.",
    vorteile: [
      "Rénovation en heures au lieu de jours – temps d'arrêt minimal",
      "La production peut se poursuivre pratiquement sans interruption",
      "Surface robuste et hautement résistante grâce à la technique du béton rapide",
      "Haute stabilité volumétrique et faible retrait – risque de fissuration réduit",
    ],
    bildAlt: "Rénovation du sol chez Loosen Werkzeug GmbH à Klausen",
  },
  "guben-produktionshalle": {
    titel: "Hall de production Guben",
    untertitel: "Rénovation en cours d'exploitation",
    land: "Allemagne",
    herausforderungen: [
      "Exécution des travaux en pleine exploitation",
      "Préparation précise du support sur une grande surface",
      "Adaptation de la technique pour la mise en oeuvre de chape mince",
      "Créneaux logistiques et temporels restreints",
    ],
    loesung:
      "NEODUR Level, une chape mince autoplaçante avec granulats d'usure intégrés et primaire KORODUR PC – mise en oeuvre mécanisée avec technique de malaxage et de pompage spécialement adaptée.",
    vorteile: [
      "Rénovation sans arrêt de production",
      "Sol industriel rapidement opérationnel",
      "Solution technique sur mesure pour une mise en oeuvre efficace",
      "Durable et économique (certifié EPD)",
    ],
    bildAlt: "Hall de production de Megaflex à Guben pendant la rénovation",
  },
  "nike-store-polen": {
    titel: "Magasin Nike Pologne",
    untertitel: "Design et fonctionnalité",
    land: "Pologne",
    herausforderungen: [
      "Design industriel dans un environnement de vente au détail à forte fréquentation",
      "Alliance d'un aspect béton, de normes d'hygiène et d'une utilisation flexible",
      "Matériau durable, facile d'entretien, avec un haut niveau d'exigence esthétique",
    ],
    loesung:
      "Mise en oeuvre de la chape décorative autoplaçante TRU Self-Leveling comme solution de sol design sans joints, à l'aspect industriel.",
    vorteile: [
      "Esthétique similaire au béton pour un design de magasin moderne",
      "Surface lisse et hygiénique – facile à nettoyer",
      "Haute résistance aux charges pour l'exploitation commerciale",
      "Faibles coûts d'entretien et remise en service rapide",
    ],
    bildAlt: "Magasin Nike avec chape décorative TRU Self-Leveling à Szczecin",
  },
  "obstplantage-ibbenbueren": {
    titel: "Verger d'Ibbenbüren",
    untertitel: "Un sol de caractère – sans interruption",
    land: "Allemagne",
    herausforderungen: [
      "Épaisseurs de couche variables de 45 à 115 mm",
      "Accueil simultané de la clientèle et utilisation quotidienne de chariots élévateurs",
      "Remise en service rapide souhaitée",
      "Exigences d'un aspect haut de gamme et d'une résistance durable",
    ],
    loesung:
      "Rénovation du sol avec KORODUR FSCem Screed comme couche d'égalisation et NEODUR HE 60 rapid comme chape d'usure robuste – complété par un traitement de surface de haute qualité.",
    vorteile: [
      "Sol rapidement opérationnel – temps d'arrêt nettement réduits",
      "Extrêmement résistant aux charges, à l'abrasion et aux liquides",
      "Durable et pérenne avec un entretien minimal",
      "Surface mate et uniforme par ponçage fin – idéale pour l'ambiance d'un magasin de ferme",
    ],
    bildAlt: "Sol rénové dans le hall de vente du verger d'Ibbenbüren",
  },
  "sanierung-einer-sanierung": {
    titel: "Rénovation d'une rénovation",
    untertitel: "Plan. Rapide. Sûr.",
    land: "Allemagne",
    herausforderungen: [
      "Planéité insuffisante – exigences des architectes et du maître d'ouvrage non satisfaites",
      "Différences de niveau par rapport à la surface existante (jusqu'à 15 mm)",
      "Risque de dommages supplémentaires et de restrictions d'utilisation",
    ],
    loesung:
      "Les surfaces ont été revêtues avec NEODUR Level. Après humidification préalable, le matériau autoplaçant a été appliqué et était praticable après seulement 2 heures.",
    vorteile: [
      "Planéité rétablie – sûr et visuellement impeccable",
      "Remise en service rapide : temps d'arrêt court",
      "Application simple par malaxeur forcé ou technique de malaxage et de pompage adaptée",
    ],
    bildAlt: "Correction d'une rénovation de sol défectueuse avec NEODUR Level",
  },
  "dhl-ueberadebruecken": {
    titel: "Quais de chargement DHL",
    untertitel: "Rapide. Sûr. Résistant.",
    land: "Allemagne",
    herausforderungen: [
      "Sollicitations mécaniques permanentes dues au trafic poids lourds",
      "Mise en danger de la capacité portante dans un centre logistique à haute fréquentation",
      "Temps de fermeture très court nécessaire pour assurer les opérations",
    ],
    loesung:
      "Les zones de béton endommagées ont été démolies, nettoyées et comblées avec Rapid Set CEMENT ALL et MORTAR MIX. Après seulement 4 heures, tous les quais de chargement étaient de nouveau pleinement opérationnels.",
    vorteile: [
      "Temps d'arrêt extrêmement court – remise en service en 4 heures",
      "Capacité portante sûre rétablie malgré des sollicitations permanentes élevées",
      "Solution économique : réparation ciblée au lieu d'une démolition à grande échelle",
    ],
    bildAlt: "Quais de chargement rénovés au centre logistique DHL",
  },
  "lkw-waschstrasse": {
    titel: "Station de lavage poids lourds",
    untertitel: "Produits chimiques. Eau. Exploitation continue.",
    land: "Allemagne",
    herausforderungen: [
      "Support existant partiellement contaminé",
      "Conditions de construction restreintes – pas de lissage mécanique possible",
      "Mise en oeuvre en conditions fraîches de printemps (env. 5–10 °C)",
      "Fortes sollicitations par véhicules, humidité et détergents",
    ],
    loesung:
      "Couche d'usure de 40 mm avec NEODUR HE 60 rapid en adhérence avec pont d'adhérence KORODUR HB 5 rapid. Protection de surface avec KOROMINERAL CURE. Après 5 jours, la station de lavage était de nouveau en service.",
    vorteile: [
      "Remise en service rapide grâce aux mortiers rapides à haute résistance",
      "Surface durable, résistante à l'abrasion et aux produits chimiques",
      "Adhérence sûre même sur support existant",
      "Entretien réduit, fiabilité fonctionnelle à long terme",
    ],
    bildAlt: "Station de lavage poids lourds rénovée avec NEODUR HE 60 rapid",
  },
  "helipad-sanierung-polen": {
    titel: "Rénovation d'héliport en Pologne",
    untertitel: "Résistant au gel et aux charges",
    land: "Pologne",
    herausforderungen: [
      "Sollicitations mécaniques permanentes par véhicules et hélicoptères",
      "Sollicitations chimiques par intempéries et sels de déverglaçage",
      "Surfaces irrégulières, fissures et épaufrures",
      "Assurance qualité par essais d'arrachement (preuve de résistance à l'arrachement)",
    ],
    loesung:
      "Les surfaces ont été préparées, nettoyées et rénovées avec NEODUR HE 65 Plus. Grâce à sa haute résistance à l'abrasion et au gel/sels de déverglaçage, le système convient aux surfaces extérieures fortement sollicitées. Les valeurs de résistance à l'arrachement ont été vérifiées et confirmées sur site.",
    vorteile: [
      "Réparation durable des fissures et épaufrures – portant",
      "Haute résistance à l'abrasion et au gel",
      "Qualité attestée par essais d'arrachement (résistance à l'arrachement jusqu'à 3,0 N/mm²)",
      "Sécurité d'utilisation fiable pour exploitants et utilisateurs",
    ],
    bildAlt: "Héliport rénové à Płock, Pologne",
  },
  "fugensanierung-lyreco": {
    titel: "Rénovation de joints Lyreco",
    untertitel: "Moins d'étapes – plus de performance",
    land: "Suisse",
    herausforderungen: [
      "Joints endommagés et insuffisamment résistants",
      "Nouveaux profilés de joint à poser avec précision",
      "Temps d'arrêt court – pas de longs délais d'attente possibles",
      "Rentabilité et facilité de mise en oeuvre au premier plan",
    ],
    loesung:
      "Les profilés de joint ont été posés et fixés sur environ 60 m de longueur avec MORTAR MIX. Grâce à la formulation sans retrait et au durcissement rapide, aucun agent d'adhérence supplémentaire n'était nécessaire.",
    vorteile: [
      "Exécution rapide – joints de nouveau praticables après un court délai",
      "Application simple (pas d'agent d'adhérence, uniquement de l'eau)",
      "Solution durable : robuste et résistant à l'abrasion",
      "Étapes de mise en oeuvre réduites, courts délais d'attente",
    ],
    bildAlt: "Rénovation de joints chez Lyreco avec MORTAR MIX",
  },
  "treppenstufen-sanierung": {
    titel: "Rénovation de marches d'escalier",
    untertitel: "Rapide. Propre. Antidérapant.",
    land: "Allemagne",
    herausforderungen: [
      "Dégâts liés aux intempéries (gel/sels de déverglaçage) sur les marches et contremarches",
      "Risque d'accident dans l'espace public – temps de fermeture court requis",
      "Mise en oeuvre simple et rapide exigée",
    ],
    loesung:
      "Les zones détachées ont été retirées, le support humidifié. Les arêtes des marches ont été reprofilées en une seule passe avec CONCRETE MIX et CEMENT ALL en consistance pâteuse, la surface lissée pendant la prise. Remise en service après environ 2 heures.",
    vorteile: [
      "Temps de fermeture très court – escalier de nouveau utilisable après environ 2 h",
      "Réparation durable des arêtes contre l'abrasion due au gel et à l'humidité",
      "Mise en oeuvre simple (uniquement de l'eau, consistance pâteuse)",
    ],
    bildAlt: "Marches d'escalier rénovées avec les produits Rapid Set",
  },
  "sinusfugen-sanierung": {
    titel: "Rénovation de joints sinusoïdaux",
    untertitel: "Rapide. Précis. Durable.",
    land: "Allemagne",
    herausforderungen: [
      "Charges permanentes élevées par chariots de manutention ; franchissement sans vibrations exigé",
      "Créneau restreint : rénovation sans interruption du flux de marchandises",
      "Réglage précis du niveau et résistance à l'abrasion dans la zone de joint",
    ],
    loesung:
      "Les zones endommagées ont été découpées, démolies sur environ 20 mm, nettoyées et humidifiées ; les flancs ont été traités avec le primaire KORODUR PC. Le joint a été appliqué avec Rapid Set MORTAR MIX DUR en consistance pâteuse, ajusté en hauteur avec précision, lissé et traité à l'eau. Après environ 1 heure, le joint était de nouveau pleinement praticable.",
    vorteile: [
      "Arrêt minimal : mise en charge complète du joint après environ 1 h, la logistique reste en cadence",
      "Réparation de joint durable et résistante à l'abrasion grâce à MORTAR MIX DUR (avec granulats d'usure)",
      "Exécution propre et reproductible : procédure définie avec primaire KORODUR PC",
    ],
    bildAlt: "Rénovation de joints sinusoïdaux dans un hall logistique",
  },
  "trennfugen-bohnenkamp": {
    titel: "Rénovation de joints de fractionnement Bohnenkamp",
    untertitel: "Pose de profilés avec précision",
    land: "Allemagne",
    herausforderungen: [
      "Niveau précis à établir sur toute la longueur du joint",
      "Utilisation d'un profilé de joint spécial (sinusoïdal, 230 mm de large) – ajustement exact",
      "Temps de fermeture court : 60 m de joint devaient être rénovés en quelques jours et rapidement recarrossables",
    ],
    loesung:
      "Le joint a été découpé des deux côtés, nettoyé et humidifié. Le profilé spécial a été posé avec précision avec MORTAR MIX en consistance ferme, puis comblé à niveau avec MORTAR MIX en consistance plastique. Performance : 60 m de joint en seulement 3 jours, pleinement carrossable après environ 1,5 h.",
    vorteile: [
      "Arrêt minimal : exploitation reprise sans perturbation après environ 1,5 h",
      "Franchissement sans vibrations – protège les véhicules et les marchandises",
      "Réparation durable : MORTAR MIX en deux consistances assure un ajustement parfait et une haute résistance",
      "Processus planifiable et sûr : étapes définies garantissant la qualité",
    ],
    bildAlt: "Rénovation de joints de fractionnement chez Bohnenkamp AG",
  },
  "absenksteine-tankstelle": {
    titel: "Pose rapide de caniveaux",
    untertitel: "Poids lourds contre pierres descellées",
    land: "Allemagne",
    herausforderungen: [
      "Caniveaux descellés/déplacés dans la zone de ravitaillement poids lourds",
      "Niveau exact par rapport au béton étanche requis (étanchéité/drainage)",
      "Temps de fermeture court, remise en circulation rapide et sûre",
    ],
    loesung:
      "Les pierres ont été déposées, nettoyées et reposées sur un lit de mortier MORTAR MIX. Elles ont ainsi pu être ajustées au millimètre près au béton étanche et rapidement remises en service.",
    vorteile: [
      "Remise en service rapide grâce au durcissement rapide de MORTAR MIX",
      "Régulation de niveau exacte – raccord propre aux surfaces étanches",
      "Franchissement sûr (caniveaux de nouveau à niveau et antidérapants)",
      "Mise en oeuvre simple (mélanger uniquement avec de l'eau, pose conventionnelle)",
    ],
    bildAlt: "Pose de caniveaux à une station poids lourds dans le Spreewald",
  },
  "lkw-einstellplatz-berlin": {
    titel: "Place de stationnement poids lourds Berlin",
    untertitel: "Planéité pour un calibrage précis",
    land: "Allemagne",
    herausforderungen: [
      "Dégâts au sol – mesure normalisée des phares impossible",
      "Temps de fermeture très court – l'atelier devait reprendre rapidement",
      "Planéité exacte requise pour la précision des mesures",
    ],
    loesung:
      "Les zones endommagées ont été localement démolies et reprofilées avec MORTAR MIX. Grâce au durcissement rapide, la surface a pu être de nouveau pleinement utilisée après environ 2 heures.",
    vorteile: [
      "Immédiatement réutilisable – exploitation de l'atelier pratiquement sans interruption",
      "Planéité précise rétablie – contrôle fiable des phares",
      "Réparation durable avec un mortier résistant aux sollicitations mécaniques",
      "Les carreaux ont pu être posés après seulement 2 heures",
    ],
    bildAlt: "Place de stationnement poids lourds rénovée dans un atelier berlinois",
  },
  "hafen-catania": {
    titel: "Port de Catane",
    untertitel: "Charges lourdes en zone côtière",
    land: "Italie",
    herausforderungen: [
      "Sollicitations mécaniques très élevées par trafic poids lourds et conteneurs",
      "Irrégularités de surface jusqu'à 6 cm à niveler",
      "Influences extérieures en pose extérieure (météo, évaporation, vent)",
      "Influences corrosives : air salin et proximité de la mer",
    ],
    loesung:
      "Rénovation avec NEODUR HE 65 Plus – renforcé de fibres et modifié aux polymères, sans pont d'adhérence supplémentaire. Complété par KOROCURE et KOROTEX pour un durcissement contrôlé.",
    vorteile: [
      "Surface durable et résistante",
      "Haute résistance au sel et aux sollicitations mécaniques",
      "Remise en service rapide de la surface",
      "Durable et économique – avec certification EPD",
    ],
    bildAlt: "Surface portuaire rénovée à Catane, Sicile",
  },
  "parkhaus-flughafen-zuerich": {
    titel: "Parking de l'aéroport de Zurich",
    untertitel: "20 000 m² de rénovation avec protection longue durée",
    land: "Suisse",
    herausforderungen: [
      "L'exploitation du parking doit être maintenue pendant les travaux",
      "Temps de fermeture courts, guidage sûr des usagers pendant les phases de travaux",
      "Grandes surfaces d'environ 20 000 m²",
      "Rénovation par étapes avec contrôle qualité strict",
    ],
    loesung:
      "Application d'un système de protection de surface en résine synthétique, composé de résine époxy bicomposant et de saupoudrage de granulats durs DUROP.",
    vorteile: [
      "Surface antidérapante et résistante au polissage – plus de sécurité",
      "Temps d'arrêt minimisés grâce à une exécution par étapes",
      "Utilisation sur plusieurs décennies – rentabilité améliorée",
      "Protection acoustique améliorée par réduction du bruit de roulement",
    ],
    bildAlt: "Parking rénové à l'aéroport de Zurich",
  },
  "theodor-heuss-bruecke": {
    titel: "Pont Theodor-Heuss",
    untertitel: "La technique rencontre le patrimoine",
    land: "Allemagne",
    herausforderungen: [
      "Sollicitations permanentes par le trafic et les charges lourdes",
      "Protection de la substance historique classée monument",
      "Exposition aux intempéries et aux sels tout au long de l'année",
      "Résistance au glissement pour les voies piétonnes et cyclables",
    ],
    loesung:
      "Revêtement mince réactif sur acier (RHD) avec résine époxy et DUROP 1-2 – matériau de remplissage et de saupoudrage pour revêtements en résine résistants à l'abrasion et au glissement.",
    vorteile: [
      "Haute résistance à l'abrasion et sécurité",
      "Protection durable contre l'eau et le sel",
      "Prolongation de la durée de vie du pont",
      "Maintien de la fonction de circulation sans longues fermetures",
    ],
    bildAlt: "Pont Theodor-Heuss entre Mayence et Wiesbaden",
  },
  "autohaus-versmold": {
    titel: "Concession automobile Versmold",
    untertitel: "Petite surface – grands dégâts",
    land: "Allemagne",
    herausforderungen: [
      "Fortes sollicitations par trafic de voitures et poids lourds",
      "Nombreux points de dégradation dans l'asphalte – réparation économique nécessaire",
      "Exécution en cours d'exploitation",
      "Solution durable malgré les influences météorologiques",
    ],
    loesung:
      "Rénovation avec ASPHALT REPAIR MIX en épaisseurs de couche de 30 à 80 mm. Grâce au temps de durcissement rapide et à la simplicité d'application, les travaux ont pu être réalisés rapidement et efficacement.",
    vorteile: [
      "Haute résistance à l'abrasion et sécurité",
      "Durée de chantier réduite, utilisation possible dès 2 heures",
      "Maintien de la fonction de circulation sans longues fermetures",
      "Mise en oeuvre simple, pas de pont d'adhérence supplémentaire nécessaire",
    ],
    bildAlt: "Rénovation de l'asphalte à la concession automobile de Versmold",
  },
  "hubschrauber-landeplatz-finnland": {
    titel: "Héliport en Finlande",
    untertitel: "Atterrir en toute sécurité dans des conditions extrêmes",
    land: "Finlande",
    herausforderungen: [
      "Gel permanent, forts écarts de température, humidité/neige en toiture",
      "Sels de déverglaçage réguliers – attaque chimique de la dalle",
      "Sollicitations mécaniques par hélicoptères et engins de déneigement",
    ],
    loesung:
      "Mise en oeuvre du matériau sec à granulats durs modifié aux polymères NEODUR HE 65 Plus comme couche d'usure. Le système a été choisi pour sa haute résistance au gel/sels de déverglaçage et à l'abrasion. Exécution sur l'héliport en toiture avec protection contre les intempéries pendant la mise en place et le durcissement. Pas de pont d'adhérence supplémentaire.",
    vorteile: [
      "Protection durable contre le gel/sels de déverglaçage – haute résistance de la surface",
      "Haute résistance à l'abrasion et antidérapant – exploitation sûre au décollage/atterrissage et au déneigement",
      "Solution durable, éprouvée et économique en conditions extrêmes",
    ],
    bildAlt: "Héliport au Mikkeli Central Hospital, Finlande",
  },
  "lkw-umfahrt-darmstadt": {
    titel: "Voie de contournement poids lourds Darmstadt",
    untertitel: "Fortement circulé – 24 heures sur 24",
    land: "Allemagne",
    herausforderungen: [
      "Fortes sollicitations par trafic poids lourds",
      "Sécurité routière plus assurée",
      "Rénovation en cours d'exploitation",
      "Délais de chantier courts impératifs",
    ],
    loesung:
      "Mise en oeuvre de KOROCRETE béton rapide et KOROMINERAL CURE pour une rénovation rapide et durable de la voie de contournement poids lourds.",
    vorteile: [
      "Remise en circulation rapide, temps d'arrêt minimaux",
      "Durable et résistant aux charges lourdes et aux intempéries",
      "Surface sûre et plane pour les véhicules",
      "Logistique assurée sans restrictions",
    ],
    bildAlt: "Voie de contournement poids lourds rénovée à Darmstadt",
  },

  "neodur-level-norderstedt": {
    titel: "Quand la première rénovation échoue",
    untertitel: "Rénovation partielle avec NEODUR Level après une chape à granulats durs défectueuse",
    land: "Allemagne",
    herausforderungen: [
      "Corriger une rénovation précédente ratée",
      "Compenser les inégalités et différences de niveau du sol existant",
      "Remettre en service les zones endommagées pendant l'exploitation du hall",
    ],
    loesung:
      "Nous avons rénové les surfaces partielles concernées avec NEODUR Level, un revêtement autonivelant pour supports minéraux en intérieur. KORODUR PC a servi de primaire pour la préparation du support. Les inégalités et différences de niveau ont ainsi pu être compensées et les zones endommagées recouvertes.",
    vorteile: [
      "Autonivelant : surface plane sans tirage à la règle laborieux",
      "Compense de manière fiable les inégalités et différences de niveau",
      "Système coordonné de primaire (KORODUR PC) et de couche d'usure (NEODUR Level)",
      "Surfaces partielles à nouveau pleinement utilisables, exploitation du hall maintenue",
    ],
    bildAlt: "Surface NEODUR Level fraîchement coulée sur un sol existant rénové à Norderstedt",
  },

  // === Notion-Import-Referenzen (Sprachpass M3, 2026-06-12) ===

  "sanierung-lkw-zufahrt-logistikzentrum-sankt": {
    titel: "Rénovation de la voie d'accès poids lourds du centre logistique Spedition Brummer, Sankt Marienkirchen (Autriche)",
    untertitel: "Rénovation ponctuelle de la voie d'accès poids lourds très fréquentée d'un centre logistique international sur l'A8. Plus de 100 poids lourds par jour n'autorisaient qu'une fenêtre de quelques heures pour la démolition et la mise en œuvre – impossible avec un béton conventionnel. 9 m³ de béton à base de ciment Rapid Set ont été mis en œuvre, offrant une résistance initiale de 32 N/mm² après 2 heures. Après neuf mois d'utilisation intensive par les poids lourds : résultat techniquement très bon, confirmé également par l'entreprise générale.",
    land: "Autriche",
    flaeche: "env. 500 m²",
    herausforderungen: [
      "Rénovation d'une voie d'accès poids lourds très fréquentée avec une interruption d'utilisation minimale ; mise en oeuvre par températures estivales très élevées le 25/06/2025 (défi pour la fenêtre de mise en oeuvre et la cure) ; des problèmes techniques avec la technique de pulvérisation du produit de cure ont nécessité une application manuelle du produit de cure à base de paraffine ainsi que des mesures supplémentaires (pulvérisation d'eau, couverture par film) en raison des températures élevées de la dalle. Deuxième bétonnage la semaine suivante en soirée.",
    ],
    loesung:
      "Rénovation ponctuelle de la voie d'accès poids lourds avec le ciment Rapid Set en cours d'exploitation. Mise en oeuvre par températures caniculaires avec cure adaptée (application manuelle du produit de cure, pulvérisation d'eau, couverture par film) ; le deuxième bétonnage a eu lieu en soirée la semaine suivante.",
    bildAlt: "Rénovation de la voie d'accès poids lourds du centre logistique Spedition Brummer, Sankt Marienkirchen (Autriche) (photo à venir)",
  },

  "texaco-tankflache-arnheim": {
    titel: "Piste de ravitaillement TEXACO, Arnhem (2018)",
    untertitel: "Rénovation en béton étanche aux liquides d'une station-service selon la recommandation CUR 63 pour les installations LAU. Remise en état sur l'autoroute A50.",
    land: "Pays-Bas",
    herausforderungen: [
      "Station-service en tant qu'installation LAU (stockage, remplissage, transbordement) : le béton des aires doit prouver son étanchéité aux liquides",
      "Remise en état des aires de ravitaillement à la station-service TEXACO sur l'A50 près d'Arnhem",
      "Preuve de la durabilité selon la recommandation CUR 63 par l'essai d'absorption capillaire (144 heures au n-heptane)",
      "Les nouvelles aires devaient être remises en service rapidement",
    ],
    loesung: "Les aires de ravitaillement ont été entièrement remplacées par du Rapid Set Schnellbeton, chaque aire mesurant env. 5 x 15 x 0,2 m. Les 15 m³ de béton nécessaires par aire ont été malaxés sur place à l'aide de deux camions malaxeurs volumétriques entièrement chargés et mis en œuvre à la pompe à béton. La surface a ensuite été traitée avec des truelles mécaniques à pales et à disque, la cure étant réalisée uniquement à l'eau et sous film. Lors de l'essai d'absorption capillaire selon la recommandation CUR 63 (144 heures d'exposition au n-heptane), le Rapid Set Schnellbeton a obtenu d'excellents résultats et a été agréé sans restriction pour une utilisation dans les stations-service.",
    vorteile: [
      "Étanchéité aux liquides prouvée selon la recommandation CUR 63, agrément sans restriction pour les stations-service",
      "Résistance initiale élevée : 24,8 MPa après 1 heure, 32,5 MPa après 2 heures",
      "Remise en service rapide des aires grâce au développement rapide de la résistance",
      "5 aires remises en état de façon étanche aux liquides en 5 semaines",
    ],
    bildAlt: "Piste de ravitaillement TEXACO, Arnhem (2018) (photo à venir)",
  },

  "naturex-burgdorf": {
    titel: "Naturex, Burgdorf (2013)",
    untertitel: "Rénovation complète d'une tour de refroidissement par pulvérisation en seulement trois semaines. Revêtement résistant aux denrées alimentaires pour l'industrie des boissons.",
    land: "Suisse",
    herausforderungen: [
      "Tour de refroidissement par pulvérisation de 80 mètres de haut sur le site de Burgdorf, Suisse, à rénover entièrement",
      "Seulement trois semaines au total pour la rénovation complète",
      "Environ 200 m² de sol de la tour à démolir et reposer en une semaine, un seul jour pour la chape intermédiaire",
      "Revêtement PU final résistant aux denrées alimentaires et apte au contact alimentaire exigé, à des températures supérieures à 30 °C dans la tour",
    ],
    loesung: "Comme chape intermédiaire, nous avons mis en œuvre le béton rapide à haute résistance Rapid Set CONCRETE MIX, qui peut recevoir le revêtement PU exigé après seulement 16 heures. À des températures supérieures à 30 °C, nous avons ajouté le retardateur CONCRETE PHARMACY SET Control et prolongé le temps de mise en œuvre d'environ une demi-heure. Comme il ne restait qu'une journée pour la pose, le matériau a été livré en big bags, préparé dans une installation de malaxage et transporté vers la surface à rénover à l'aide de petits dumpers.",
    vorteile: [
      "Tour de refroidissement centrale remise en service après seulement trois semaines",
      "Prête à recevoir le revêtement PU après seulement 16 heures",
      "Temps de mise en œuvre prolongé malgré des températures supérieures à 30 °C grâce à SET Control",
      "L'applicateur SIB et le maître d'ouvrage Naturex convaincus par la performance et la rapidité",
    ],
    bildAlt: "Naturex, Burgdorf (2013) (photo à venir)",
  },

  "torschwelle-lagerhalle": {
    titel: "Seuil de porte d'un entrepôt (lieu non précisé) (2017)",
    untertitel: "Rénovation d'une zone de seuil fortement usée avec armature apparente. Réparation rapide sans perturber le trafic de l'entrepôt.",
    land: "Allemagne",
    herausforderungen: [
      "Zone du seuil de l'entrepot fortement usee par le trafic permanent de camions et de chariots elevateurs",
      "Armature deja apparente",
      "Couche de beton endommagee a reparer rapidement et durablement",
      "Le trafic vers l'entrepot ne devait pas etre perturbe",
    ],
    loesung: "Nous avons utilise le mortier a prise rapide Rapid Set MORTAR MIX. Nous avons fraise le support endommage afin d'obtenir une surface porteuse, a pores ouverts et rugueuse, puis applique MORTAR MIX en une epaisseur de 20 a 50 mm. Apres quatre heures au total, tous les travaux etaient termines et l'entrepot a pu reprendre son activite.",
    vorteile: [
      "Ensemble des travaux acheve en quatre heures",
      "Entrepot remis en service immediatement apres",
      "Trafic vers l'entrepot jamais perturbe",
      "Support fraise et porteur pour une reparation durable",
    ],
    bildAlt: "Seuil de porte d'un entrepôt (lieu non précisé) (2017) (photo à venir)",
  },

  "wellpappenfabrik-gross-versmold": {
    titel: "Wellpappenfabrik Gross, Versmold (2013)",
    untertitel: "Réparation de surfaces en asphalte et en béton affaissées à la transition vers le hall de production. Les ondulations compromettaient la sécurité de transport des emballages.",
    land: "Allemagne",
    herausforderungen: [
      "La transition entre la surface extérieure en asphalte et le hall de production s'était affaissée et fissurée",
      "Fortes charges dues aux chariots élévateurs",
      "Épaisseurs de couche jusqu'à 200 mm à réparer",
      "Le trafic des chariots élévateurs devait reprendre le plus vite possible",
    ],
    loesung: "Pour la remise en état, seul Rapid Set CONCRETE MIX pouvait convenir, car il fallait réparer des épaisseurs de couche jusqu'à 200 mm et le trafic des chariots élévateurs devait reprendre le plus vite possible. Nous avons d'abord dégagé les surfaces d'asphalte et de béton endommagées jusqu'à la couche de gravier, puis mélangé CONCRETE MIX à l'aide d'un malaxeur à double arbre. En raison des températures atteignant +30 °C, nous avons ajouté le retardateur SET Control et le fluidifiant FLOW Control. Les travaux ont été achevés au bout de deux heures.",
    vorteile: [
      "Travaux achevés au bout de deux heures",
      "Trafic à nouveau possible une heure plus tard",
      "Mise en œuvre possible même à des températures allant jusqu'à +30 °C",
      "Surface de transition sans ondulations et porteuse rétablie",
    ],
    bildAlt: "Wellpappenfabrik Gross, Versmold (2013) (photo à venir)",
  },

  "korodur-demo-bochum": {
    titel: "KORODUR Demo, Bochum-Wattenscheid (2012)",
    untertitel: "Réparation rapide de dalles Stelcon endommagées sous trafic quotidien de poids lourds et de chariots élévateurs. Sollicitations extrêmes sur le propre site de l'usine.",
    land: "Allemagne",
    herausforderungen: [
      "Dalles Stelcon sur le site de l'usine soumises quotidiennement au trafic de camions et de chariots elevateurs, sollicitation permanente extreme",
      "Une dalle s'etait rompue sous la charge constante et devait etre remplacee le plus rapidement possible",
      "L'approvisionnement et le remplacement d'une nouvelle dalle en beton auraient pris plusieurs jours",
      "Le trafic de livraison et d'enlevement de l'usine devait se poursuivre sans interruption",
    ],
    loesung: "Nous avons repare la dalle rompue avec le beton de reparation rapide multifonctionnel Rapid Set CONCRETE MIX. Apres avoir retire la dalle endommagee, nous avons pose un film puis applique le CONCRETE MIX en une couche de 250 mm, dresse la surface et realise une finition balayee. Nous avons ensuite maintenu la surface humide avec de l'eau pendant environ une heure. Les travaux ont commence a 09h30 et, des 12h30, le trafic a pleine charge circulait de nouveau normalement.",
    vorteile: [
      "Reparation realisee en quelques heures au lieu de plusieurs jours",
      "Durcissement rapide et haute resistance",
      "Sans retrait et durable",
      "Resistant aux sulfates, epaisseurs de couche jusqu'a 600 mm",
    ],
    bildAlt: "KORODUR Demo, Bochum-Wattenscheid (2012) (photo à venir)",
  },

  "kreisverkehr-goppingen": {
    titel: "Carrefour giratoire, Göppingen (2021)",
    untertitel: "Réaménagement d'un carrefour giratoire à deux voies pour améliorer la sécurité routière. Les gros pavés n'étaient pas perçus comme une voie de circulation.",
    land: "Allemagne",
    herausforderungen: [
      "Rond-point à deux voies de la Hohenstaufenstraße : voie extérieure en asphalte, voie intérieure en gros pavés",
      "L'aspect surélevé du pavage faisait que de nombreux usagers ne le percevaient pas comme une voie de circulation",
      "Notamment aux entrées et sorties, cela provoquait des situations de circulation étroites et dangereuses",
      "Objectif : améliorer la sécurité routière en ajustant le pavage au niveau de l'asphalte",
    ],
    loesung: "Le Tiefbauamt Stadt Göppingen a chargé Blessing GmbH d'ajuster la zone pavée au niveau de l'asphalte à l'aide du procédé de réparation spécialement développé par Blessing et KORODUR. Le pavage existant est rejointoyé avec le mortier de réparation rapide Rapid Set MORTAR MIX. Le mortier multifonctionnel à haute résistance peut être fraisé à la machine après environ 2 heures seulement.",
    vorteile: [
      "Rétablissement de la sécurité de la circulation routière",
      "Exécution rapide : fraisage mécanique possible après environ 2 heures",
      "Élimination des inégalités et blocage des déplacements",
      "Émissions sonores nettement réduites et longue durée d'utilisation",
    ],
    bildAlt: "Carrefour giratoire, Göppingen (2021) (photo à venir)",
  },

  "barmenia-parkhaus-wuppertal": {
    titel: "Parking Barmenia, Wuppertal (2015)",
    untertitel: "Rénovation rapide d'éléments en béton coulé en place et préfabriqués endommagés, avec armature partiellement apparente. Rétablissement de la stabilité structurelle du parking de la compagnie d'assurance.",
    land: "Allemagne",
    herausforderungen: [
      "Zones endommagees dans le beton coule en place et les elements prefabriques du parking des assurances Barmenia",
      "Armature partiellement a nu",
      "Reparation realisee presque exclusivement en application verticale",
      "Delai serre, le nouveau revetement devait suivre quelques jours plus tard",
    ],
    loesung: "L'entreprise Zarges a utilise Rapid Set Cement All et Rapid Set Mortar Mix pour reparer les zones endommagees, en travaillant presque exclusivement en application verticale. De nombreuses zones ont ete rouvertes, nettoyees et abondamment pre-humidifiees, puis refermees avec Cement All ou Mortar Mix selon l'epaisseur d'application et re-humidifiees. Quelques jours plus tard, le parking a recu un nouveau revetement.",
    vorteile: [
      "Resultat de reparation rapide et efficace",
      "Nouveau revetement possible quelques jours seulement apres la reparation",
      "Choix flexible du produit selon l'epaisseur d'application (Cement All ou Mortar Mix)",
      "Maitre d'ouvrage et entreprise tres satisfaits du resultat",
    ],
    bildAlt: "Parking Barmenia, Wuppertal (2015) (photo à venir)",
  },

  "john-lewis-lager-stevenage": {
    titel: "Entrepôt John Lewis, Stevenage (2013)",
    untertitel: "Rénovation d'ornières profondes après plus de 20 ans de circulation de chariots élévateurs dans un entrepôt à rayonnages de grande hauteur. Rétablissement de la sécurité de circulation dans l'entrepôt du grand magasin.",
    land: "Royaume-Uni",
    flaeche: "1 000 mètres linéaires",
    herausforderungen: [
      "Entrepôt à rayonnages hauts utilisé depuis plus de 20 ans, avec des chariots élévateurs circulant sur la même voie",
      "L'utilisation continue a creusé une ornière profonde dans le sol",
      "L'ornière gênait la circulation sans restriction des chariots élévateurs",
      "Une solution de rénovation rapide était requise",
    ],
    loesung: "Pour la rénovation, tous les rayonnages ont été retirés et le mortier de réparation Rapid Set CEMENT ALL a été choisi pour combler l'ornière, dont la longueur dépassait 1 000 mètres linéaires. CEMENT ALL a été mélangé avec 4 l d'eau et appliqué dans l'ornière à la truelle, avec une finition de surface lisse. Une équipe de 3 personnes a réparé entre 50 et 100 mètres linéaires par jour.",
    vorteile: [
      "Avancement rapide des travaux : 50 à 100 mètres linéaires par jour avec une équipe de 3 personnes",
      "Finition de surface lisse après application à la truelle",
      "Circulation des chariots élévateurs rétablie et sans restriction",
      "Rénovation réalisée à l'entière satisfaction du client",
    ],
    bildAlt: "Entrepôt John Lewis, Stevenage (2013) (photo à venir)",
  },

  "fraport-frankfurt": {
    titel: "Fraport, Frankfurt/Main (2012)",
    untertitel: "Rénovation éclair d'une aire de stationnement de conteneurs endommagée à l'aéroport, avec revêtement conforme WHG. Remise en service la plus rapide possible pour l'exploitation aéroportuaire.",
    land: "Allemagne",
    herausforderungen: [
      "Une aire de stationnement de conteneurs endommagée à l'aéroport de Francfort Main devait être réparée.",
      "La remise en état, y compris le revêtement WHG requis, devait être réalisée dans les plus brefs délais.",
      "Surface d'environ 100 m².",
      "Une pente définie était exigée pour l'utilisation ultérieure.",
    ],
    loesung: "Le mortier de réparation à prise rapide Rapid Set CEMENT ALL a été utilisé. Wiedemann und Sohn GmbH a d'abord posé des guides de mortier pour obtenir la pente requise, puis a mis en place le CEMENT ALL sur toute la surface en le tirant le long des guides. Aucune couche d'accrochage ni primaire distinct n'était nécessaire. Le CEMENT ALL a développé des résistances extrêmement élevées après seulement une heure et, au bout de 16 heures, il était prêt à recevoir le revêtement, si bien que le revêtement WHG étanche à la vapeur a pu être appliqué immédiatement.",
    vorteile: [
      "Résistances extrêmement élevées après seulement une heure.",
      "Prêt à recevoir le revêtement après 16 heures, revêtement WHG applicable directement.",
      "Aucune couche d'accrochage ni primaire distinct nécessaire.",
      "Utilisation prévue des places de stationnement rétablie dans les plus brefs délais.",
    ],
    bildAlt: "Fraport, Frankfurt/Main (2012) (photo à venir)",
  },

  "sncf-bordeaux": {
    titel: "SNCF, Bordeaux (2016)",
    untertitel: "Élimination d'inégalités dangereuses dans les accès au métro lors de travaux de nuit. Préparation à la nouvelle ligne à grande vitesse Tours-Bordeaux.",
    land: "France",
    herausforderungen: [
      "Affaissement des passages vers les stations de métro pendant les travaux, nombreux trous dans le béton",
      "Risque de blessure pour les voyageurs dû aux inégalités, réparation rapide nécessaire",
      "Travaux possibles uniquement de nuit pendant les heures de fermeture de la gare (0h00 à 05h00)",
      "Préparation de la gare Saint-Jean à la ligne à grande vitesse Tours-Bordeaux",
    ],
    loesung: "La SNCF a choisi le mortier de réparation Rapid Set CEMENT ALL, qui durcit rapidement, présente un faible retrait, est durable et facile à mettre en œuvre. Les nombreux travaux de réparation ont été réalisés en deux semaines.",
    vorteile: [
      "Durcissement rapide, utilisable pendant de courtes périodes de fermeture",
      "Faible retrait et durable",
      "Facile à mettre en œuvre",
      "Réparations achevées en seulement deux semaines, maître d'ouvrage très satisfait",
    ],
    bildAlt: "SNCF, Bordeaux (2016) (photo à venir)",
  },

  "parkhaus-freiburger-munster-freiburg": {
    titel: "Parking de la cathédrale de Freiburg, Freiburg",
    untertitel: "Rénovation du parking souterrain Karlsbau à Freiburg (670 places, 3 niveaux) avec Triflex ProPark et revêtement DUROP (granulométrie 1–2 mm). Exécution rapide, résistance durable à l'usure, aspect clair.",
    land: "Allemagne",
    flaeche: "env. 5 000 m²",
    herausforderungen: [
      "Parking apprécié près de la cathédrale de Fribourg, 670 places sur 3 niveaux, en service 24 heures sur 24",
      "Forte fréquentation et sollicitation mécanique du parking souterrain",
      "Des agents agressifs comme l'huile et les chlorures ont endommagé la chape en asphalte coulé et la structure en béton armé",
      "La surface de roulement d'environ 5 000 m² devait être rénovée d'urgence",
    ],
    loesung: "Pour la rénovation, le système d'étanchéité circulable Triflex ProPark a été mis en œuvre en combinaison avec le matériau de remplissage et de saupoudrage DUROP. Après le prétraitement du support, les travaux de primaire, de réparation, de ragréage et d'étanchéité ont été réalisés avec les composants du système Triflex. Le revêtement DUROP, composé de Triflex DeckFloor et de DUROP granulométrie 1-2 mm, a été appliqué sur la couche d'étanchéité. L'exécution a été confiée à l'entreprise R.S.I.",
    vorteile: [
      "Exécution rapide de la rénovation",
      "Protection durable de l'ouvrage grâce à la résistance à l'usure améliorée de la surface de roulement",
      "Surface antidérapante et résistante au polissage grâce à DUROP",
      "Environnement clair et accueillant pour les visiteurs",
    ],
    bildAlt: "Parking de la cathédrale de Freiburg, Freiburg (photo à venir)",
  },

  "olympiastadion-berlin": {
    titel: "Stade Olympique, Berlin",
    untertitel: "Le stade olympique de Berlin, lieu multifonctionnel sportif en Allemagne, a été construit en tenant compte de l'environnement des monuments historiques.",
    land: "Allemagne",
    herausforderungen: [
      "Trouver un accord entre les demandes du sport moderne et des shows pesant des millions d'euros",
      "Respecter les exigences liées aux monuments historiques",
      "Tenir compte du respect par rapport à la construction existante",
      "Adapter l'aspect optique des différentes surfaces réalisées au 20è siècle",
    ],
    loesung: "Pour les travaux d'intérieur, sur environ 3.000 m², les responsables ont choisi d'utiliser l'indémodable sol décoratif GRANIDUR couleur anthracite. GRANIDUR est un sol décoratif poncé KORODUR, développé spécialement pour des surfaces exigeantes et indémodables.",
    kennwerte: [
      { value: "env. 3.000 m²", label: "Surface intérieure traitée" },
      { value: "GRANIDUR couleur anthracite", label: "Sol décoratif poncé KORODUR" },
    ],
    ergebnis: "",
    ausgangssituation: "L'exigence était telle qu'un accord devait être trouvé entre les demandes du sport moderne et des shows pesant des millions d'euros d'une part, les exigences liées aux monuments historiques et le respect par rapport à la construction. Il fallait par ailleurs adapter l'aspect optique des différentes surfaces du stade réalisées au 20è siècle.",
    vorteile: [],
    bildAlt: "Olympiastadion Berlin (2023) (photo à venir)",
  },

  "wirtgen-produktionshallen-weltweit": {
    titel: "Halls de production WIRTGEN, monde entier",
    untertitel: "Plus de 150 000 m² de sols industriels à granulats durs dans des sites de production du monde entier pour des machines de construction routière jusqu'à 500 tonnes. Une solution éprouvée depuis des décennies.",
    land: "Andorre",
    herausforderungen: [
      "Machines de construction routière, en partie sur chenilles, pesant jusqu'à 500 tonnes",
      "Sollicitation mécanique considérable des sols des halls due aux charges lourdes",
      "Exigence de résistance maximale à l'usure combinée à une résistance élevée à la flexion",
      "Sites de production dans le monde entier avec plus de 150 000 m² de surface",
    ],
    loesung: "Depuis des décennies, le groupe Wirtgen fait confiance aux sols industriels minéraux à granulats durs KORODUR. Selon la norme allemande, nous mettons généralement en œuvre une couche à granulats durs KORODUR de 10 à 15 mm conformément à la DIN 18560-7. Pour les machines sur chenilles, nous choisissons délibérément la chape à granulats métalliques conformément à la DIN 1100-M (KORODUR WH-metallisch, NEODUR HE 65), qui offre la plus haute résistance à la flexion avec une résistance maximale à l'usure.",
    vorteile: [
      "Résistance maximale à l'usure sous sollicitation mécanique extrême",
      "Résistance élevée à la flexion pour des charges jusqu'à 500 tonnes",
      "Éprouvé depuis des décennies dans les usines du groupe Wirtgen dans le monde entier",
      "Sol industriel minéral et robuste pour une exploitation continue",
    ],
    bildAlt: "Halls de production WIRTGEN, monde entier (photo à venir)",
  },

  "fh-lichtschacht-nurnberg": {
    titel: "Puits de lumière FH, Nürnberg (2012)",
    untertitel: "Rénovation d'un encadrement en béton fortement sollicité le dernier jour de cours avant les vacances d'été. Réparation rapide sous contraintes climatiques et de trafic lourd.",
    land: "Allemagne",
    herausforderungen: [
      "Encadrement en béton d'un puits de lumière grillagé à l'entrée du restaurant universitaire, forte sollicitation par les poids lourds",
      "Déjà réparé à plusieurs reprises sans solution durable",
      "Charges mécaniques, intempéries et polluants marquant le béton",
      "Fenêtre de temps réduite : réparation le dernier jour de cours avant les vacances d'été",
    ],
    loesung: "Nous avons utilisé le mortier de réparation multifonction Rapid Set CEMENT ALL, à durcissement rapide, sans retrait, durable et à haute résistance. Aucun primaire ni couche d'accrochage particulier n'était nécessaire, l'humidification préalable et la cure se font uniquement à l'eau. Les travaux ont commencé à 14h00 et, trois heures plus tard seulement, les véhicules de livraison du restaurant universitaire pouvaient de nouveau circuler sur l'encadrement du puits de lumière réparé.",
    vorteile: [
      "Durcissement rapide, de nouveau circulable après environ trois heures",
      "Sans retrait, durable et à haute résistance",
      "Ni primaire ni couche d'accrochage, humidification et cure à l'eau uniquement",
      "Solution durable après plusieurs réparations antérieures infructueuses",
    ],
    bildAlt: "Puits de lumière FH, Nürnberg (2012) (photo à venir)",
  },

  "klaranlage-nako": {
    titel: "Station d'épuration, Nakło (2014)",
    untertitel: "Rénovation d'une crête de bassin détruite par les acides (env. 180 m²) avec un ciment rapide. Réparation en quelques heures, remise en service immédiate.",
    land: "Pologne",
    flaeche: "env. 180 m²",
    herausforderungen: [
      "Exposition permanente à des eaux usées agressives qui attaquent les surfaces non protégées en béton et en ciment",
      "Les acides dissolvent la laitance de ciment et provoquent un sablage pouvant aller jusqu'à la perte complète de l'élément",
      "Couronne du bassin de la station d'épuration si endommagée que le système d'aération ne fonctionnait plus correctement",
      "Réparation rapide nécessaire pour éviter les arrêts inutiles de l'installation",
    ],
    loesung: "Nous avons réhabilité la couronne du bassin endommagée, d'environ 180 m², avec Rapid Set CEMENT ALL, un ciment à prise rapide. La réparation a été réalisée avec succès en quelques heures, évitant ainsi des arrêts inutiles. Des mesures simples ont permis d'obtenir une solution rapide et durable.",
    vorteile: [
      "Réparation achevée en quelques heures",
      "Arrêts inutiles de la station d'épuration évités",
      "Solution rapide et durable avec des mesures simples",
      "Système d'aération de nouveau opérationnel",
    ],
    bildAlt: "Station d'épuration, Nakło (2014) (photo à venir)",
  },

  "bruckensanierung-amberg": {
    titel: "Rénovation de pont, Amberg (2012)",
    untertitel: "Rénovation de pont avec compensation de différences de pente jusqu'à 100 mm sur les cheminements piétons. Achèvement en neuf mois, avant les fêtes de Noël.",
    land: "Allemagne",
    herausforderungen: [
      "Rénovation complète du pont Nabburger Tor en environ 9 mois",
      "Délai serré : réouverture à temps avant les fêtes de Noël",
      "Compensation de dénivelés de 0 à 100 mm sur les trottoirs",
      "Modelage des plinthes du garde-corps du pont",
    ],
    loesung: "Pour la rénovation, nous avons utilisé le mortier de réparation multifonctionnel Rapid Set CEMENT ALL, qui a résolu deux problèmes de chantier à la fois : comme couche de compensation de dénivelés de 0 à 100 mm pour les trottoirs et pour le modelage des plinthes du garde-corps du pont. Grâce à la prise rapide du mortier Rapid Set, le pont a pu être rouvert en environ 9 mois, à temps avant les fêtes de Noël.",
    vorteile: [
      "Réouverture dans les délais, à temps avant les fêtes de Noël, grâce à la prise rapide",
      "Un seul mortier multifonctionnel pour deux tâches : compensation des dénivelés et modelage des plinthes",
      "Des propriétés techniques exceptionnelles ont convaincu le maître d'ouvrage, l'entreprise de construction et les planificateurs",
      "« Un nouveau pont dans son habit ancien » : rénovation réussie préservant l'aspect historique",
    ],
    bildAlt: "Rénovation de pont, Amberg (2012) (photo à venir)",
  },

  "parkplatzsanierung-metzingen": {
    titel: "Rénovation de parking, Metzingen (2017)",
    untertitel: "Rénovation d'un parking fortement usé présentant des fissures de surface et des épaufrures. Remise en état rapide pour une répartition uniforme des charges.",
    land: "Allemagne",
    herausforderungen: [
      "Parking d'entreprise fortement endommagé avec éclats de béton",
      "Risque de blessure accru en raison des éclats",
      "Réparation rapide et durable de la couche de béton endommagée requise",
      "Reprofilage avec des épaisseurs de couche de 7 à 10 cm",
    ],
    loesung: "Le Rapid Set MORTAR MIX a été utilisé. Les surfaces endommagées ont été piquées jusqu'au support porteur, soigneusement nettoyées, humidifiées au préalable, puis reconstituées durablement avec MORTAR MIX en une épaisseur de couche de 7 à 10 cm. Le mortier de réparation couvre des épaisseurs de 1,5 à 15 cm et répond à toutes les exigences du reprofilage avec un seul produit, sans couche d'accrochage supplémentaire ni ragréage fin. Les travaux ont été achevés au bout de 4 heures au total et le parking a pu être de nouveau utilisé sans restrictions.",
    vorteile: [
      "Réparation achevée en seulement 4 heures",
      "Parking de nouveau utilisable sans restrictions",
      "Un seul produit pour l'ensemble du reprofilage, sans couche d'accrochage ni ragréage fin",
      "Large domaine d'application avec des épaisseurs de couche de 1,5 à 15 cm",
    ],
    bildAlt: "Rénovation de parking, Metzingen (2017) (photo à venir)",
  },

  "schachtregulierung-fahrbahn-nittenau": {
    titel: "Mise à niveau de regards de chaussée, Nittenau (2019)",
    untertitel: "Mise à niveau de 28 regards d'assainissement au nouveau niveau de la chaussée lors d'une rénovation routière. Mortier de réparation à durcissement rapide pour une pose d'asphalte sans délai.",
    land: "Allemagne",
    herausforderungen: [
      "Rénovation routière à Nittenau/Opf. : adaptation de 28 regards existants au nouveau niveau de l'enrobé",
      "Pose des cadres de regard à la hauteur correcte requise",
      "Nécessité d'un mortier de réparation à prise rapide et stable en volume pour une mise en œuvre rapide de l'enrobé",
      "Première utilisation de MORTAR MIX pour l'ajustement de regards par l'entreprise Rädlinger",
    ],
    loesung: "Les 28 cônes de regard ont été entièrement recouverts avec le mortier de réparation à prise rapide et stable en volume Rapid Set MORTAR MIX, puis les cadres de regard ont été posés à la hauteur correcte. Le mortier a été gâché sur place dans un malaxeur conventionnel et appliqué à la main à la truelle. Une heure seulement après la pose, un camion lourdement chargé pouvait franchir le tampon de regard sans problème. Le lendemain, l'entreprise Rädlinger a appliqué la couche de roulement finale en enrobé d'environ 10 mm d'épaisseur.",
    vorteile: [
      "À prise rapide et stable en volume, pose des cadres de regard à la hauteur exacte",
      "Circulable après une heure seulement, même pour les camions lourdement chargés",
      "Gâchage sur place dans un malaxeur conventionnel, application à la main à la truelle",
      "Mise en œuvre rapide de l'enrobé directement dans la foulée",
    ],
    bildAlt: "Mise à niveau de regards de chaussée, Nittenau (2019) (photo à venir)",
  },

  "treppensanierung-gehweg-esslingen": {
    titel: "Rénovation d'escalier sur trottoir, Esslingen (2015)",
    untertitel: "Rénovation de marches d'escalier isolées présentant des dégâts dus au gel et aux sels de déverglaçage sur un trottoir public. Rétablissement rapide de l'usage du trottoir.",
    land: "Allemagne",
    herausforderungen: [
      "Gel et sel de déneigement, principal facteur de contrainte pour les surfaces cimentaires en hiver",
      "Dommages marqués sur les surfaces de certaines marches d'escalier d'un trottoir public",
      "Acier d'armature mis à nu",
      "Contrainte de temps : rétablir rapidement l'usage du trottoir",
    ],
    loesung: "Pour enrober l'acier d'armature mis à nu, les agents du service technique municipal ont appliqué Rapid Set CEMENT ALL, immédiatement suivi de Rapid Set MORTAR MIX afin d'harmoniser la surface avec son environnement. La rénovation des différentes marches a été réalisée avec des moyens des plus simples et en un temps très court. Après seulement deux heures, l'escalier était de nouveau prêt à l'usage du public.",
    vorteile: [
      "De nouveau prêt à l'usage du public après seulement deux heures",
      "Réparation durable et pérenne",
      "Mise en œuvre avec des moyens des plus simples",
      "Protection de l'acier d'armature mis à nu par enrobage",
    ],
    bildAlt: "Rénovation d'escalier sur trottoir, Esslingen (2015) (photo à venir)",
  },

  "burger-king-munster": {
    titel: "Burger King, Münster-Hiltrup (2021)",
    untertitel: "Rénovation de la zone très sollicitée du guichet de retrait en cours d'exploitation du restaurant. Réparation des dégâts d'asphalte sous les plaques d'acier.",
    land: "Allemagne",
    herausforderungen: [
      "Zone du guichet de retrait tres sollicitee dans le drive, les pneus des vehicules tournent en permanence sur place au moment de repartir",
      "Les plaques d'acier encastrees dans le sol ne resistaient pas aux charges",
      "Reparation en exploitation continue du restaurant, creneau de temps tres court",
      "Support en asphalte, le materiau doit etre rapidement porteur et durable",
    ],
    loesung: "Des 07h00, nous avons retire les plaques metalliques endommagees, pique l'asphalte situe en dessous et nettoye le support. Le support etant en asphalte, nous l'avons traite par precaution avec KORODUR PC. Nous avons ensuite mis en place Rapid Set DOT Europe CONCRETE MIX en une seule couche d'environ 70 a 80 mm d'epaisseur, lisse la surface et l'avons humidifiee plusieurs fois jusqu'a saturation. Des 09h30, les surfaces etaient de nouveau entierement circulables.",
    vorteile: [
      "Surfaces de nouveau entierement circulables des 09h30, renovation sans interruption de l'exploitation",
      "DOT Europe CONCRETE MIX est un beton rapide sans retrait, porteur apres 1 heure seulement",
      "Utilisable conformement a la norme DIN EN 1504-3, applicable en epaisseurs de 50 a 600 mm",
      "KORODUR PC assure l'adherence sur le support en asphalte",
    ],
    bildAlt: "Burger King, Münster-Hiltrup (2021) (photo à venir)",
  },

  "kraftwerk-bergamo": {
    titel: "Centrale électrique, Bergamo (2011)",
    untertitel: "Rénovation dans le respect du patrimoine avec restitution de l'aspect historique des dalles de petit format des années 60 à 80. Modernisation tout en préservant le caractère d'origine.",
    land: "Italie",
    herausforderungen: [
      "Renovation du sol de la centrale electrique historique de Bergame (printemps 2011)",
      "Le caractere historique de la centrale devait etre preserve",
      "Restauration selon les standards de l'epoque avec des dalles de petit format au format 30 cm x 30 cm",
      "Haute resistance a l'usure exigee en exploitation continue de la centrale",
    ],
    loesung: "Pour la renovation, des dalles de petit format KORODUR au format 30 cm x 30 cm ont ete posees sur environ 500 m2. Les dalles ont une epaisseur de 38 mm avec une couche de granulats durs KORODUR de 12 mm dans le coloris anthrazit (NEODUR HE 65 anthrazit) et ont ete poncees en aspect GRANIDUR. Une entreprise specialisee de Nuremberg a fabrique les dalles, une entreprise specialisee italienne les a posees.",
    vorteile: [
      "Preservation de l'aspect historique de la centrale",
      "Aspect des dalles de petit format restaure au format 30 cm x 30 cm, ponce en aspect GRANIDUR",
      "Haute resistance a l'usure en exploitation de la centrale",
      "Maitre d'ouvrage tres satisfait, autres surfaces de renovation prevues",
    ],
    bildAlt: "Centrale électrique, Bergamo (2011) (photo à venir)",
  },

  "fahrbahnsanierung-wien": {
    titel: "Rénovation de chaussée, Vienne (2020)",
    untertitel: "Rénovation partielle de la chaussée de la Donaukanalstraße à Vienne avec DOT Europe CONCRETE MIX. 15 réparations ponctuelles remplies en une nuit, en épaisseurs de 5–10 cm, et chaussée rouverte à la circulation en quelques heures. Surface témoin concluante, sans dommage depuis 2019.",
    land: "Autriche",
    flaeche: "15 réparations ponctuelles sur env. 500–700 m de chaussée",
    herausforderungen: [
      "Donaukanalstraße à quatre voies, très fréquentée, sous une sollicitation intense du trafic",
      "Fenêtre de temps réduite : réparation de nuit, remise à la circulation quelques heures plus tard",
      "15 réparations ponctuelles sur env. 500 à 700 m de chaussée en une seule nuit",
      "Épaisseurs de couche entre 5 et 10 cm",
    ],
    loesung: "Après une surface d'essai réalisée en mai 2019 qui, un an plus tard, ne présentait aucune fissure, éclat ni décollement malgré une circulation intense, DOT Europe CONCRETE MIX a été mis en œuvre pour la réparation partielle de la chaussée, un béton rapide polymère, à prise rapide et renforcé de fibres, basé sur une technologie cimentaire spéciale. Une équipe de 7 personnes a comblé 15 réparations en une nuit, sur des épaisseurs de 5 à 10 cm : quatre ont fraisé, dégagé et nettoyé les zones, trois ont mélangé et mis en place le matériau. Un fin brouillard d'eau a servi au lissage, la cure a été réalisée uniquement à l'eau. Quelques heures plus tard, la chaussée était de nouveau ouverte à la circulation.",
    vorteile: [
      "À prise rapide, remise à la circulation quelques heures après la mise en œuvre",
      "Rapide et simple à mettre en œuvre",
      "Durablement sans fissures : surface d'essai sans fissures, éclats ni décollements après un an",
      "À teneur réduite en CO2",
    ],
    bildAlt: "Rénovation de chaussée, Vienne (2020) (photo à venir)",
  },

  "oelie-saur-saint": {
    titel: "Oélie/Saur, Saint-Étienne (2024)",
    untertitel: "Rénovation de trottoirs urbains avec un mortier de réparation rapide. Surface antidérapante et visuellement intégrée – de nouveau praticable après 30 minutes.",
    land: "France",
    herausforderungen: [
      "Rénovation de trottoirs urbains à Saint-Étienne",
      "La solution de réparation devait répondre aux exigences de l'infrastructure urbaine",
      "Oélie/Saur a testé au préalable plusieurs systèmes de réparation",
    ],
    loesung: "Après avoir testé différents systèmes de réparation, Oélie/Saur a choisi le Rapid Set Asphalt Repair Mix® (ARM) avec Set Control pour ses propriétés supérieures. Le matériau a été mélangé à l'aide d'un malaxeur à double fouet et mis en œuvre dans les règles de l'art par l'applicateur Trema.",
    vorteile: [
      "Facile à mettre en œuvre, mélange au malaxeur à double fouet",
      "Mise en service rapide",
      "Surface antidérapante",
      "Adaptation visuelle au revêtement existant",
    ],
    bildAlt: "Oélie/Saur, Saint-Étienne (2024) (photo à venir)",
  },

  "decathlon-dortmund": {
    titel: "Rénovation du magasin DECATHLON, Dortmund",
    untertitel: "Depuis octobre 23, le site de Dortmund-Aplerbeck est en cours de réaménagement, avec une réouverture prévue pour l'été 24. Un sol industriel NEODUR HE 65 a été mis en œuvre à la technique du silo.",
    land: "Allemagne",
    herausforderungen: [
      "Réaménagement du site avec réouverture prévue pour l'été 24",
      "Sol industriel devant résister à une usure importante et aux contraintes les plus élevées",
      "Mise en œuvre de 25 tonnes à la technique du silo",
      "Pose en coulis frais sur frais en une épaisseur de couche de 10 mm",
    ],
    loesung: "Le sol industriel NEODUR HE 65 en teinte gris ciment a été mis en œuvre par l'applicateur spécialisé Nieladur, 25 tonnes posées avec la technique du silo. NEODUR HE 65 est un matériau sec, prêt à l'emploi, lié au ciment, résistant à l'usure importante et aux contraintes les plus élevées. La mise en œuvre s'est faite en coulis frais sur frais en une épaisseur de couche de 10 mm. Le système de silo KORODUR, technique de mélange et de pompage, est extrêmement économique, rationnel et durable.",
    kennwerte: [
      { value: "NEODUR HE 65", label: "Sol industriel" },
      { value: "25 t", label: "Quantité mise en œuvre (technique silo)" },
      { value: "10 mm", label: "Épaisseur de couche" },
      { value: "Gris ciment", label: "Teinte" },
    ],
    ergebnis: "",
    ausgangssituation: "Depuis octobre 23, le site DECATHLON de Dortmund-Aplerbeck est en cours de réaménagement, la réouverture étant prévue pour l'été 24. En attendant, toute l'équipe du personnel continue à accueillir les clients dans un autre espace non loin de là. Après la réouverture, l'espace sera utilisé comme magasin de vélos.",
    vorteile: [],
    bildAlt: "Decathlon, Dortmund-Aplerbeck (2023) (photo à venir)",
  },

  "trinkwasserbehaelter-haidberg": {
    titel: "Réservoir d'eau potable surélevé Haidberg",
    untertitel: "Sécurité par le revêtement",
    land: "Allemagne",
    herausforderungen: [
      "Support hétérogène avec dégâts de corrosion et défauts liés à l'hydrolyse",
      "Préservation de la qualité de l'eau potable et respect des normes",
      "Géométries complexes des éléments (murs, poteaux, plafonds) avec des exigences différentes",
      "Le réservoir devait être remis en service après seulement un an",
    ],
    loesung:
      "Remise en état avec le système complet MICROTOP TW : six produits coordonnés pour les zones fonctionnelles – égalisation, reprofilage, pont d'adhérence et consolidation de surface.",
    vorteile: [
      "Approche systémique globale pour tous les éléments",
      "Protection contre la corrosion renouvelée et la destruction par hydrolyse",
      "Remise en service dans le délai prévu (1 an)",
      "Conformité aux exigences relatives à l'eau potable",
    ],
    bildAlt: "Réservoir d'eau potable surélevé Haidberg pendant la rénovation",
  },

  "trinkwasserbehaelter-bad-nauheim": {
    titel: "Réservoir d'eau potable Bad Nauheim",
    untertitel: "Normes sûres pour sol, mur et plafond",
    land: "Allemagne",
    herausforderungen: [
      "Retrait des anciens carrelages, matériaux de jointement et revêtements existants",
      "Garantie de matériaux hygiéniques et certifiés",
      "Éléments de construction différents avec des sollicitations spécifiques",
      "Mise en oeuvre et post-traitement dans des délais serrés",
    ],
    loesung:
      "Système MICROTOP TW NSM – utilisé pour la première fois à Bad Nauheim en projection par voie humide, en tant que mortier projeté purement minéral enrichi en microsilice, sans additifs plastiques. Concept coloré : murs bleus, plafond blanc, sol gris.",
    vorteile: [
      "Matériau contrôlé sur le plan hygiénique conformément aux exigences DVGW",
      "Surface sans joints",
      "Revêtement minéral durable sans additifs plastiques",
      "Valorisation esthétique par concept de couleur et revêtement moderne",
    ],
    bildAlt: "Réservoir d'eau potable rénové à Bad Nauheim",
  },

  "trinkwasserturm-budapest": {
    titel: "Château d'eau de Budapest",
    untertitel: "30 ans de charge rénovés avec protection minérale",
    land: "Hongrie",
    herausforderungen: [
      "Support ancien sollicité depuis trois décennies",
      "Solution économique exigée avec une haute durabilité simultanée",
      "Géométrie complexe (murs, plafonds) nécessitant un revêtement uniforme",
      "Créneau d'environ six mois pour la rénovation",
    ],
    loesung:
      "Le système minéral MICROTOP a été utilisé, plus précisément les produits MICROTOP TW BM et MICROTOP TW 02, sur une phase de rénovation d'environ six mois.",
    vorteile: [
      "Protection à long terme sans composants plastiques – durablement minéral",
      "Rénovation rentable grâce à l'approche système",
      "Revêtement uniforme et homogène sur des éléments complexes",
      "Réalisation dans le calendrier prévu",
    ],
    bildAlt: "Château d'eau en périphérie de Budapest pendant la rénovation",
  },
  "hochbehaelter-puchheim": {
    titel: "Réservoir d'eau potable Puchheim",
    untertitel: "Rénovation minérale pour une eau potable pure",
    land: "Allemagne",
    herausforderungen: [
      "Dommages d'hydrolyse sur le revêtement des deux compartiments d'eau après environ 35 ans de fonctionnement",
      "Enlèvement complet de l'ancien revêtement sur les murs et le sol et préparation du support",
      "Garantie d'une eau potable hygiéniquement pure pendant toute la rénovation",
      "Revêtement d'environ 18 000 m² de surfaces murales et de sol",
    ],
    loesung:
      "Les murs ont été enduits du mortier spécial à base de micro-silice MICROTOP TW 3, par projection par voie sèche d'une épaisseur de 20 mm, lissés avec une règle puis poncés machinalement et lissés. Le sol a été revêtu avec des produits MICROTOP en procédé chape. Au total, plus de 18 000 m² de nouvelles surfaces minérales ont été réalisées.",
    vorteile: [
      "Système MICROTOP à base de micro-silice pour une eau potable hygiéniquement pure",
      "Protection contre de nouveaux dommages d'hydrolyse",
      "Système uniforme pour les murs et le sol",
      "Qualité confirmée par les contrôles réguliers de la LGA Nürnberg",
    ],
    bildAlt: "Réservoir d'eau potable Puchheim pendant la rénovation",
  },
  "artofchocolate-schwarzach-u-wertheim": {
    titel: "ARTofCHOCOLATE Schwarzach et Wertheim",
    untertitel: "Sol décoratif KORODUR pour une manufacture de chocolat tout en verre",
    land: "Allemagne",
    herausforderungen: [
      "Sol décoratif et représentatif pour une manufacture en verre avec shop et café",
      "Intégration visuelle dans la salle de vente aux couleurs vivantes",
      "Sol sur lequel de fins délices sont créés et dégustés quotidiennement",
    ],
    loesung:
      "Un sol décoratif KORODUR a été réalisé avec KCF gris naturel (KORODUR COPETTI FLOOR KCF) en combinaison avec KOROCLEAN. Après la première manufacture à Schwarzach am Main en 2008, une nouvelle et encore plus grande manufacture a vu le jour en 2010 dans le village de magasin Outlet à Wertheim avec le même système de sol.",
    vorteile: [
      "Aspect décoratif du sol en harmonie avec la salle de vente colorée",
      "Système éprouvé réutilisé pour l’extension de 2010",
      "Sol représentatif pour la manufacture de chocolat tout en verre",
    ],
    bildAlt: "Sol décoratif KORODUR dans la manufacture de chocolat tout en verre ARTofCHOCOLATE",
  },
  "aunn-cafe-shanghai-china": {
    titel: "AUNN Café Shanghai",
    untertitel: "Sol décoratif pour un café au design industriel en plein centre de Shanghai",
    land: "Chine",
    herausforderungen: [
      "Sol décoratif continu sur tous les niveaux du bâtiment",
      "Finition soignée pour un design industriel minimaliste",
      "Sol résistant pour un café et des espaces d'exposition très fréquentés",
    ],
    loesung:
      "Le sol décoratif innovant KORODUR TRU Self-Leveling, à base de ciment, a été posé sur un total d'environ 1 000 m² à tous les niveaux du bâtiment, y compris des boutiques design, un centre d'art ainsi que des espaces d'exposition. Le sol a été réalisé par Shanghai Hong Qiao Century Enterprise.",
    vorteile: [
      "Aspect urbain et très design, telle une œuvre d'art réalisée à la main",
      "Sol continu sur tous les niveaux du bâtiment",
      "Sol décoratif innovant à base de ciment",
    ],
    bildAlt: "AUNN Café à Shanghai avec sol décoratif KORODUR TRU Self-Leveling",
  },
  "balenciaga-flagship-store-miami-usa": {
    titel: "Balenciaga Magasin Phare à Miami",
    untertitel: "Chape décorative ponçable TRU Self-Leveling dans le showroom de luxe de style industriel",
    land: "USA",
    herausforderungen: [
      "Sol en accord avec le showroom de style industriel",
      "Finition décorative de haute qualité pour un magasin phare de luxe",
      "Surface ponçable et attrayante sur deux étages",
    ],
    loesung:
      "Les sols ont été finis avec la chape décorative TRU Self-Leveling, une chape décorative minérale à prise rapide qui convient parfaitement au ponçage et polissage.",
    vorteile: [
      "Application autonivelante",
      "Surface ponçable et polissable",
      "Prise rapide",
      "Finition décorative attrayante",
    ],
    bildAlt: "Sol décoratif TRU Self-Leveling dans le showroom du magasin phare Balenciaga à Miami",
  },
  "brauerei-bernard-humpolec-tschechien": {
    titel: "Brasserie Bernard, Humpolec",
    untertitel: "Chape decorative TRUazzo a l'aspect terrazzo pour le nouveau centre de visiteurs",
    land: "Republique tcheque",
    herausforderungen: [
      "Aspect terrazzo attrayant et unique pour un centre de visiteurs representatif",
      "Resistance elevee et durable pour des dizaines de milliers de visiteurs par an",
      "Mise en service rapide pour un avancement zele du chantier",
      "Construction econome en ressources et reduite en CO2",
    ],
    loesung:
      "L'entreprise specialisee tcheque Provas a mis en oeuvre la chape decorative TRU PC auto nivelante et a prise rapide (TRUazzo) en teinte gris sur une surface d'environ 500 m² en une epaisseur de 12 mm. Le revetement a l'aspect terrazzo a ete finalise par polissage et un traitement de base.",
    vorteile: [
      "Aspect terrazzo attrayant par polissage et traitement de base",
      "Auto nivelante et a prise rapide",
      "Prete pour le trafic pieton apres 2 a 3 heures, chargeable apres 24 heures",
      "Econome en ressources : 30 % d'emissions de CO2 en moins que le ciment Portland traditionnel",
    ],
    bildAlt: "Chape decorative TRUazzo a l'aspect terrazzo au centre de visiteurs de la brasserie Bernard a Humpolec",
  },
  "escada-muenchen": {
    titel: "Siège ESCADA, Munich",
    untertitel: "Sol décoratif autonivelant avec granulats décoratifs pour le hall d'un magasin de luxe",
    land: "Allemagne",
    herausforderungen: [
      "Créer une ambiance glamoureuse et en même temps délicate pour un magasin de luxe",
      "Offrir un cadre de qualité pour les shootings photo de mode réguliers de photographes renommés",
      "Réunir pièce unique, élégance et naturel dans un seul sol",
    ],
    loesung:
      "Le comité directeur du groupe ESCADA a choisi le sol décoratif KORODUR en anthracite, un revêtement autonivelant additionné de granulats décoratifs et poncé. L'intégration, à intervalle régulière, de profilés en acier inoxydable complète le caractère de ce sol décoratif.",
    vorteile: [
      "Caractère de pièce unique grâce aux granulats décoratifs individuels",
      "Surface élégante poncée en finition fine",
      "Aspect naturel et de haute qualité",
      "Profilés en acier inoxydable comme élément de design",
    ],
    bildAlt: "Sol décoratif autonivelant anthracite dans le hall du siège ESCADA à Munich",
  },
  "fazer-besucherzentrum-vantaa-finnland": {
    titel: "Fazer centre d'accueil",
    untertitel: "Sol décoratif clair et poli en optique granite comme cadre luxueux",
    land: "Finlande",
    herausforderungen: [
      "Sol décoratif représentatif pour un exemple exceptionnel de design et d'artisanat finlandais",
      "Optique claire et luxueuse comme cadre pour la présentation des produits",
      "Matériau naturel, minéral et durable en accord avec l'architecture",
    ],
    loesung:
      "Le sol décoratif clair et poli GRANIDUR BIANCO en optique granite, brillant, a été posé et offre un cadre magnifique pour la présentation des délices en chocolat noir.",
    vorteile: [
      "Optique granite claire à l'allure luxueuse",
      "Naturel, minéral et durable",
      "Intégration harmonieuse dans l'architecture",
    ],
    bildAlt: "Sol décoratif GRANIDUR BIANCO clair et poli en optique granite au centre d'accueil Fazer à Vantaa, Finlande",
  },
  "gut-lippesee-paderborn": {
    titel: "Gut Lippesee",
    untertitel: "Sol design robuste à l'aspect KCF lissé pour un ensemble gastronomique à colombage",
    land: "Allemagne",
    herausforderungen: [
      "Sol robuste et résistant pour une exploitation gastronomique exigeante",
      "Hautes exigences optiques avec un aspect KCF vivant et nuagé en anthracite",
      "Intégration naturelle dans l'ambiance historique à colombage",
    ],
    loesung:
      "La société Gorlo Industrieboden GmbH & Co. KG de Bielefeld a réalisé avec précision un sol NEODUR HE 65 anthracite en coulis frais sur frais, lissé en aspect KCF.",
    vorteile: [
      "Résistant à l'usure et robuste pour une exploitation gastronomique continue",
      "Aspect KCF vivant et nuagé en couleur anthracite",
      "Réalisé de manière économique en coulis frais sur frais",
      "S'intègre naturellement dans l'ambiance historique à colombage",
    ],
    bildAlt: "Sol NEODUR HE 65 anthracite à l'aspect KCF dans la bâtisse à colombage du restaurant Gut Lippesee, Paderborn",
  },
  "heidelberger-cement-ag-heidelberg": {
    titel: "Siège de HeidelbergCement AG",
    untertitel: "Chape décorative en terrazzo blanc GRANIDUR BIANCO dans le hall d'entrée représentatif",
    land: "Allemagne",
    herausforderungen: [
      "Revêtement de sol en accord avec le concept de béton apparent du bâtiment",
      "Aspect terrazzo blanc comme point fort esthétique dans le hall",
      "Chape chauffante à prise rapide et haute résistance comme support",
      "Pose adhérente de la chape décorative en seulement 15 mm d'épaisseur",
    ],
    loesung:
      "Premièrement, une chape à prise rapide a été mise en œuvre comme chape chauffante en utilisant le liant KORODUR FSCem, un liant pour chape à prise rapide sur base ternaire et de dimension stable. Elle a été appliquée à l'aide d'un camion malaxeur-pompe BREMAT. Ensuite, le mortier sec blanc GRANIDUR BIANCO a été appliqué comme chape rapportée avec le primaire KORODUR HB 5 blanc, en une épaisseur de couche moyenne de 15 mm. Pour finir, la surface a été polie en plusieurs passes jusqu'à l'obtention de l'aspect terrazzo individuel souhaité.",
    vorteile: [
      "Chape décorative blanche pour un aspect terrazzo individuel et haut de gamme",
      "Chape chauffante à prise rapide et haute résistance grâce au liant ternaire",
      "Pose adhérente en faible épaisseur de couche de 15 mm",
      "Image d'ensemble cohérente dans le concept continu de béton apparent",
    ],
    bildAlt: "Sol en terrazzo blanc GRANIDUR BIANCO dans le hall d'entrée du siège de HeidelbergCement AG",
  },
  "hora-zentrale-schloss-holte-stuckenbrock": {
    titel: "Siège de la société HORA",
    untertitel: "Chape de granulats durs KORODUR poncée, coloris anthracite, comme sol de foyer représentatif",
    land: "Allemagne",
    herausforderungen: [
      "Surface de haute qualité et de beauté durable pour le foyer représentatif",
      "Surface de granulats durs poncée avec effet terrazzo en coloris anthracite",
      "Mise en œuvre en chape incorporée (coulis frais sur frais) en épaisseur de 10 mm",
      "Finition de surface manuelle exigeante par ponçage",
    ],
    loesung:
      "Courant de l'été 2007, le produit NEODUR HE 65 anthracite a été réalisé en chape incorporée (coulis frais sur frais) en épaisseur de 10 mm. Environ 4 semaines après la mise en œuvre, les travaux de ponçage ont été effectués pour obtenir l'effet désiré de terrazzo en optique de GRANIDUR.",
    vorteile: [
      "Surface de granulats durs poncée, de beauté durable",
      "Effet terrazzo représentatif en coloris anthracite",
      "Haute qualité de mise en œuvre grâce au procédé frais sur frais",
      "Aménagement architectural de haute qualité du foyer",
    ],
    bildAlt: "Sol KORODUR en granulats durs poncé, coloris anthracite, dans le foyer représentatif du siège de HORA à Schloss Holte-Stukenbrock",
  },
  "hotel-puro-krakow-polen": {
    titel: "Hôtel PURO Kraków Vieille-Ville",
    untertitel: "Sol décoratif poli et sans joint dans le hall d'un hôtel-boutique",
    land: "Pologne",
    herausforderungen: [
      "Aspect représentatif pour la pièce centrale de l'hôtel, le bar du hall",
      "Intégration avec les carreaux élaborés de la partie centrale du hall",
      "Surface durable et de haute qualité pour un espace hôtelier très fréquenté",
    ],
    loesung:
      "Le sol décoratif KORODUR de haute qualité, TRU SL naturel, a été mis en œuvre par des professionnels de la société Concrete System. TRU SL est un mélange spécifique à base de ciment spécial Rapid Set provenant des États-Unis et de granulats décoratifs spécialement sélectionnés. Le sol a ensuite été soigneusement poli.",
    vorteile: [
      "Aspect décoratif unique grâce à la surface polie",
      "Mise en œuvre rapide grâce à la base Rapid Set",
      "Granulats décoratifs spécialement sélectionnés pour un caractère individuel",
    ],
    bildAlt: "Sol décoratif poli KORODUR TRU SL dans le hall de l'hôtel PURO Kraków Vieille-Ville",
  },
  "kaiserhof-koeln": {
    titel: "Kaiserhof, Cologne",
    untertitel: "Chape décorative en terrazzo blanc GRANIDUR BIANCO sur chape de base à prise rapide FSCem",
    land: "Allemagne",
    herausforderungen: [
      "Nouveau bâtiment de bureaux exclusif à Cologne, un point fort architectural",
      "Chape apparente représentative et de haute qualité requise pour l'ensemble du bâtiment",
      "Calendrier de construction ambitieux à respecter",
      "Pose sur neuf niveaux, 700 m² au total",
    ],
    loesung: "Pour respecter le calendrier ambitieux, la chape rapide KORODUR FSCem a été utilisée comme chape support, principalement pour sa mise en service précoce et sa stabilité volumique. L'entreprise spécialisée Günter Schlag GmbH de Föhren a ensuite posé la chape apparente en terrazzo blanc de haute qualité GRANIDUR BIANCO sur neuf niveaux totalisant 700 m².",
    vorteile: [
      "Mise en service précoce du KORODUR FSCem accélère le déroulement du chantier",
      "Chape support à stabilité volumique comme base de la chape apparente",
      "Chape apparente claire et poncée qui s'intègre parfaitement dans l'architecture intemporelle",
      "Caractère unique grâce à la composition cimentaire-minérale",
    ],
    bildAlt: "Chape décorative en terrazzo blanc poli GRANIDUR BIANCO dans l'immeuble de bureau Kaiserhof à Cologne",
  },
  "kongresszentrum-dipoli-espoo-finnland": {
    titel: "Centre de congrès Dipoli",
    untertitel: "Chape décorative à finition aspect terrazzo poli pour le bâtiment principal de l'Université d'Aalto",
    land: "Finlande",
    herausforderungen: [
      "Hommage au design original expressionniste-moderne des architectes Reima et Raili Pietilä",
      "Plan géomorphologique aux formes courbées et naturelles inspirées de la nature",
      "Les couleurs et agrégats devaient s'inspirer d'un sol en terrazzo à base de ciment existant depuis les années 1960",
      "Usage multifonctionnel avec salles de réunion, espaces d'événements et restauration",
    ],
    loesung:
      "La chape décorative GRANIDUR BIANCO, un système à base de ciment, gris pigmenté, finition aspect terrazzo poli, était parfaitement adaptée et a été mise en œuvre par le partenaire finlandais de longue date de KORODUR.",
    vorteile: [
      "Système à base de ciment adapté au terrazzo existant des années 1960",
      "Finition aspect terrazzo poli avec pigmentation grise",
      "Sol apparent décoratif pour des espaces représentatifs et multifonctionnels",
      "Réalisé par un partenaire KORODUR local expérimenté",
    ],
    bildAlt: "Sol GRANIDUR BIANCO à finition terrazzo poli au centre de congrès Dipoli, Espoo, Finlande",
  },
  "leica-firmenzentrale-wetzlar": {
    titel: "Siège Leica Wetzlar",
    untertitel: "Sol décoratif poli à l'élégance intemporelle pour un complexe ultramoderne",
    land: "Allemagne",
    herausforderungen: [
      "Un sol reflétant tradition et modernité, qualité et perfection",
      "Une ambiance représentative et attrayante à l'intérieur du siège",
      "Une surface de haute qualité réalisée avec précision artisanale sur 3 000 m²",
    ],
    loesung:
      "Au rez-de-chaussée, sur une surface d'environ 3 000 m², le sol décoratif GRANIDUR BIANCO a été mis en œuvre avec une épaisseur moyenne de 15 mm et une surface polie.",
    vorteile: [
      "Surface décorative polie à l'élégance intemporelle",
      "Réalisé avec précision artisanale",
      "Ambiance intérieure moderne et attrayante",
    ],
    bildAlt: "Sol décoratif poli GRANIDUR BIANCO au siège Leica à Wetzlar",
  },
  "libeskind-villa-datteln": {
    titel: "Villa Libeskind Datteln",
    untertitel: "Sol décoratif minéral pour le bâtiment de réception d'une icône architecturale",
    land: "Allemagne",
    herausforderungen: [
      "Un revêtement de sol répondant aux standards les plus exigeants en matière de design et d'originalité",
      "Réaliser des solutions de conception personnalisées avec des matériaux du futur",
      "Combiner une délicate élégance et une grande résistance",
    ],
    loesung:
      "Au rez-de-chaussée, un sol décoratif minéral KORODUR COPETTI FLOOR KCF 05 (anciennement SECUNDUR) d'une surface de 170 m² a été réalisé dans le coloris gris clair, en 15 mm d'épaisseur, en finition lissée. Un partenariat a ainsi été conclu avec un fabricant allemand innovant au savoir-faire reconnu – le groupe KORODUR de Amberg.",
    vorteile: [
      "Délicate élégance grâce à une finition lissée gris clair",
      "Grande résistance du sol décoratif minéral",
      "Solution de conception personnalisée pour un concept architectural exigeant",
    ],
    bildAlt: "Sol décoratif minéral lissé gris clair KORODUR COPETTI FLOOR dans le bâtiment de réception de la villa Libeskind à Datteln",
  },
  "martensbro-schule-espoo-finnland": {
    titel: "Mårtensbro Skola, Espoo",
    untertitel: "Un sol industriel gris clair pour une école lumineuse et facile à entretenir durant l'hiver finlandais",
    land: "Finlande",
    herausforderungen: [
      "Abrasion quotidienne due à des milliers de passages dans une école",
      "Sol à la fois esthétique et facile à nettoyer exigé",
      "Réflexion optimale de la lumière durant les longs mois sombres de l'hiver",
      "Deux supports différents : frais sur frais et chape rapportée sur béton existant",
    ],
    loesung:
      "Une chape d'usure KORODUR a été réalisée selon les normes DIN 18560-7 et DIN 1100 (durcisseur de groupe A), avec le produit NEODUR HE 65 gris clair, aspect marbré KCF. Une chape d'environ 600 m² a été réalisée « frais sur frais » en épaisseur de 10 mm. Une chape rapportée de 600 m² a été mise en place sur support béton existant : d'abord le primaire d'accrochage minéral KORODUR HB 5, puis une couche d'usure de 15 mm. Au total, environ 30 tonnes de durcisseur prémixé NEODUR HE 65 ont été utilisées.",
    vorteile: [
      "Grande capacité de charge pour l'exploitation quotidienne d'une école",
      "Gris clair pour une réflexion optimisée de la lumière et des coûts énergétiques réduits",
      "Facile à entretenir et esthétiquement attrayant",
      "Solution durable, écologique et économiquement attractive",
    ],
    bildAlt: "Sol industriel KORODUR gris clair dans l'école primaire Mårtensbro à Espoo, Finlande",
  },
  "mensa-hochschule-weiden": {
    titel: "Restaurant universitaire, Université Weiden",
    untertitel: "Sol décoratif lissé KCF 05 anthracite pour le nouveau restaurant universitaire du campus",
    land: "Allemagne",
    herausforderungen: [
      "Sol décoratif représentatif en harmonie avec l'architecture moderne en béton et bois",
      "Sol résistant pour un espace de restauration de 180 places",
      "Surface poncée et décorative à l'aspect homogène",
      "Marches d'escalier coordonnées visuellement",
    ],
    loesung:
      "Sur environ 500 m², le sol décoratif KORODUR KCF 05 dans le coloris anthracite, d'une épaisseur de 15 mm, a été réalisé sur chape ciment durcie. Afin de lui donner la touche finale, ce sol décoratif a été poncé en utilisant le système de nettoyage KOROCLEAN. Les marches ont été poncées afin d'obtenir un aspect GRANIDUR.",
    vorteile: [
      "Sol décoratif lissé dans le coloris anthracite",
      "Alliance architecturale harmonieuse de béton et de bois",
      "Surface affinée grâce au ponçage de nettoyage KOROCLEAN",
      "Résistant pour le trafic intense d'un restaurant universitaire",
    ],
    bildAlt: "Sol décoratif lissé KCF 05 anthracite dans le nouveau restaurant universitaire de l'Université Amberg-Weiden",
  },
  "nationalarchiv-tartu-estland": {
    titel: "Archives nationales Noora, Tartu",
    untertitel: "Chape décorative lissée en optique de marbre pour les archives nationales d'Estonie",
    land: "Estonie",
    herausforderungen: [
      "Revêtement de sol adapté au design intérieur moderne et à la façade très moderne des archives",
      "Finition décorative et représentative pour un bâtiment culturellement et socialement important",
      "Aspect homogène sur environ 1.000 m²",
    ],
    loesung:
      "Le choix s'est porté sur la chape décorative KORODUR KCF (KORODUR COPETTI FLOOR), une chape lissée en optique de marbre, dans une teinte gris foncé/anthracite. Elle s'intègre parfaitement au design intérieur et à la façade très moderne du bâtiment.",
    vorteile: [
      "Chape décorative lissée en optique de marbre",
      "Teinte gris foncé/anthracite pour un aspect moderne",
      "Chaque sol unique par sa couleur et sa structure",
      "Intégration parfaite au design intérieur et à l'architecture du bâtiment",
    ],
    bildAlt: "Chape décorative KCF lissée en optique de marbre anthracite aux archives nationales Noora à Tartu, Estonie",
  },
  "nike-shop-kaunas-litauen": {
    titel: "NIKE Store Kaunas",
    untertitel: "Sol cimentaire decoratif a l'aspect beton industriel pour le magasin NIKE tres frequente du centre commercial Akropolis",
    land: "Lituanie",
    herausforderungen: [
      "Forte frequentation quotidienne du magasin exigeant un sol particulierement resistant",
      "Choix du bon systeme de sol en comparant les bases epoxy et ciment",
      "Evaluation des concepts de sol par des architectes internationaux",
      "Exigence d'un aspect beton industriel allie a un nettoyage facile",
    ],
    loesung:
      "Afin de choisir le bon produit, diverses zones d'essais a base d'epoxy et de ciment ont ete realisees. KORODUR a presente son produit cimentaire TRU Self-Leveling. Les differents essais ont ete evalues par des architectes internationaux.",
    vorteile: [
      "Aspect beton industriel pour une ambiance de magasin haut de gamme",
      "Facilite de mise en oeuvre et durabilite",
      "Nettoyage facile du sol",
      "Eprouve par l'experience anterieure dans les NIKE stores du monde entier",
    ],
    bildAlt: "Sol cimentaire decoratif a l'aspect beton industriel dans le NIKE Store du centre commercial Akropolis a Kaunas, Lituanie",
  },
  "phoenix-media-mall-suzhou-china": {
    titel: "Phoenix Media Mall",
    untertitel: "Sol décoratif TRU sans joints en aspect terrazzo poli pour un centre commercial de cinq étages",
    land: "Chine",
    herausforderungen: [
      "Centre commercial de cinq étages avec 15 000 m² de surface de sol",
      "Sol décoratif haut de gamme dans le cadre du concept d'aménagement intérieur",
      "Aspect quasiment sans joints sur des bandes courbes s'entrecroisant",
      "Calendrier de chantier rapide jusqu'à l'ouverture",
    ],
    loesung:
      "Le concept de design intégrait le sol décoratif autonivelant TRU Self-Leveling, aspect terrazzo poli. Il a été mis en œuvre en bandes courbes se croisant les unes aux autres, mélangeant les couleurs champagne, cappuccino et moka, et affiné par l'ajout de grain de marbre blanc.",
    vorteile: [
      "Sol décoratif quasiment sans joints en aspect terrazzo poli",
      "Coloris personnalisés champagne, cappuccino et moka avec grain de marbre blanc",
      "Polissage possible dès 24 heures après la mise en œuvre",
      "Ouverture possible une semaine seulement après la pose",
    ],
    bildAlt: "Sol décoratif terrazzo poli TRU Self-Leveling dans le Phoenix Media Mall à Suzhou, Chine",
  },
  "porsche-showroom-loerrach": {
    titel: "Showroom Porsche",
    untertitel: "Sol décoratif poncé GRANIDUR pour une présentation haut de gamme de voitures de sport",
    land: "Allemagne",
    herausforderungen: [
      "Créer une surface de présentation haut de gamme à la hauteur de voitures de sport exclusives",
      "Réaliser un sol décoratif et design en gris de sécurité et anthracite",
      "Allier une esthétique soignée à la résistance d'un sol industriel",
    ],
    loesung:
      "Pour son nouveau showroom, le concessionnaire Porsche à Lörrach a choisi un sol décoratif poncé GRANIDUR en gris de sécurité et anthracite de la gamme sol décoratif KORODUR, sur environ 600 m². GRANIDUR est un sol décoratif poncé pour des réalisations architecturales de haute qualité et d'une très grande résistance mécanique.",
    vorteile: [
      "Aspect décoratif et haut de gamme en gris de sécurité et anthracite",
      "Surface poncée idéale pour la présentation de produits exclusifs",
      "Sol design robuste adapté à un usage quotidien en showroom",
    ],
    bildAlt: "Sol décoratif poncé GRANIDUR gris de sécurité et anthracite au showroom Porsche de Lörrach",
  },
  "restaurant-mueli-muelligen-schweiz": {
    titel: "Restaurant Müli, Mülligen",
    untertitel: "Sol décoratif GRANIDUR NERO pour un lieu gastronomique historique",
    land: "Suisse",
    herausforderungen: [
      "Bâtiment historique aux exigences esthétiques élevées",
      "Revêtement de sol à la hauteur de la réputation d'un rendez-vous gastronomique",
      "Aspect décoratif sous sollicitation gastronomique",
    ],
    loesung:
      "Au printemps 2011, les dernières optimisations ont été réalisées et un sol décoratif GRANIDUR NERO a été posé.",
    vorteile: [
      "Aspect de sol décoratif",
      "En harmonie avec l'ambiance gastronomique",
      "Sol résistant pour l'exploitation continue du restaurant",
    ],
    bildAlt: "Sol décoratif GRANIDUR NERO au Restaurant Müli à Mülligen, Suisse",
  },
  "showroom-bonsai-group-guernsey-uk": {
    titel: "Showroom Bonsai Group, Guernesey",
    untertitel: "Sol decoratif poli TRU Self-Leveling pour une salle d'exposition haut de gamme",
    land: "UK",
    herausforderungen: [
      "Un sol mettant en valeur les meubles haut de gamme presentes",
      "Sol decoratif au rendu couleur et effet individualise",
      "Surface durable et pratique pour l'usage de la salle d'exposition",
      "Entretien minimal pour l'avenir",
    ],
    loesung:
      "Le sol autonivelant TRU Self-Leveling a ete pose en couleur naturelle, a laquelle on a ajoute deux nuances de gris pour un effet marbre, puis poli et scelle. Une surface continue de 180 m² d'une epaisseur de 12 mm a ainsi ete realisee.",
    vorteile: [
      "Surface decorative continue de 180 m² en 12 mm d'epaisseur",
      "Rendu marbre individuel grace a l'effet moucheté",
      "Surface brillante par polissage et scellement",
      "Entretien minimal",
    ],
    bildAlt: "Sol decoratif poli TRU Self-Leveling dans la salle d'exposition du Bonsai Group a Guernesey, UK",
  },
  "showroom-oldtimer-kalifornien-usa": {
    titel: "Showroom Oldtimer",
    untertitel: "Sol décoratif à l'esthétique de galerie pour la présentation d'automobiles anciennes",
    land: "USA",
    herausforderungen: [
      "Sol répondant aux exigences élevées d'utilisation et de présentation des véhicules",
      "Esthétique décorative et soignée pour mettre en valeur les voitures anciennes",
      "Préparation et primage professionnels du support",
      "Délai de construction court avant l'utilisation du showroom",
    ],
    loesung:
      "Le choix s'est porté sur le sol décoratif innovant TRU Self-Leveling. Les travaux ont débuté par la préparation et le primage du support. Environ 18 heures plus tard, le mortier TRU Self-Leveling a pu être appliqué et, 16 heures après, le sol TRU Self-Leveling a pu être poli.",
    vorteile: [
      "Sol décoratif pour une surface de présentation haut de gamme",
      "Système autonivelant pour une surface plane",
      "Ponçable seulement 16 heures après l'application",
      "Délai de construction court avant l'utilisation",
    ],
    bildAlt: "Sol décoratif TRU Self-Leveling dans le showroom de voitures anciennes de Doctor Detail en Californie, USA",
  },
  "stefan-andreas-schulzentrum-schweich": {
    titel: "Centre scolaire Stefan-Andres, Schweich",
    untertitel: "Chape décorative poncée GRANIDUR 05 comme sol design pour un lycée neuf de prestige",
    land: "Allemagne",
    herausforderungen: [
      "Revêtement de sol représentatif et durable pour un lycée neuf de prestige",
      "Mise en œuvre sur grande surface au rez-de-chaussée et au premier étage des couloirs",
      "Intégration d'un chauffage au sol dans la structure de la chape",
      "Combinaison architecturale des surfaces avec des lames de parquet",
    ],
    loesung:
      "Dans les couloirs du centre socioculturel intégré et du lycée, un sol décoratif GRANIDUR 05 en coloris gris basalte, poncé, a été mis en œuvre sur une surface totale de 1.500 m² au rez-de-chaussée et au premier étage. Une chape de ciment de qualité CT-C30-F5 avec chauffage au sol, d'épaisseur moyenne de 8,5 cm, a d'abord été réalisée. La chape GRANIDUR 05, d'épaisseur moyenne de 1,5 cm, a ensuite été mise en œuvre « frais sur frais » par le spécialiste local Günter Schlag GmbH.",
    vorteile: [
      "Chape décorative poncée comme sol design représentatif",
      "Chape composite robuste pour des couloirs très fréquentés",
      "Compatible avec un chauffage au sol dans la structure",
      "Combinable visuellement avec du parquet et du béton apparent",
    ],
    bildAlt: "Sol décoratif poncé GRANIDUR 05 gris basalte dans les couloirs du Centre Scolaire Stefan-Andres à Schweich",
  },
  "suntago-village-swinice-polen": {
    titel: "Village de Suntago – Parc de Pologne",
    untertitel: "Sol décoratif TRUazzo en aspect terrazzo dans le foyer du complexe hôtelier",
    land: "Pologne",
    herausforderungen: [
      "Sol décoratif représentatif dans le foyer central du complexe hôtelier",
      "Aspect terrazzo haut de gamme pour une ambiance élégante",
      "Raccord soigné aux carreaux de céramique artistique au centre du foyer",
    ],
    loesung:
      "L'entreprise spécialisée polonaise Concrete System a posé un sol décoratif KORODUR TRUazzo tout autour des carreaux de céramique. Le produit TRU PC, en aspect gris, un produit autonivelant de haute qualité, a été posé puis poncé légèrement en aspect terrazzo. TRU est basé sur la technologie de ciment Rapid Set des États-Unis.",
    vorteile: [
      "Ambiance décorative unique en aspect terrazzo",
      "Technologie de ciment Rapid Set avec 30 % d'émissions de CO₂ en moins que les systèmes conventionnels",
      "Ponçage léger en aspect terrazzo pour une surface visible de haute qualité",
      "Aspect représentatif pour l'espace restaurant de l'hôtel",
    ],
    bildAlt: "Sol décoratif TRUazzo gris en aspect terrazzo dans le foyer du Village de Suntago à Świnice, Pologne",
  },
  "truazzo-isabel-marant-store-wien-oesterreich": {
    titel: "Chape décorative TRUazzo magasin Isabel Marant Vienne",
    untertitel: "Sol décoratif personnalisable pour le magasin mono-marque",
    land: "Autriche",
    herausforderungen: [
      "Respecter le concept de couleur défini pour les murs et les sols",
      "Conception de sol individuelle et créative adaptée au magasin phare",
      "Délai court disponible pour la mise en œuvre avant la réouverture",
    ],
    loesung:
      "L'installateur professionnel a opté pour TRU Self-Leveling, une chape décorative autonivelante et polie pour des épaisseurs de couche de 5 à 35 mm. Le matériau peut être conçu de manière individuelle dans différentes variations de couleurs et de grains décoratifs (verre, marbre ou copeaux). Pour le magasin phare, une variante de couleur grise avec diffusion supplémentaire de copeaux a été choisie.",
    vorteile: [
      "Personnalisable grâce aux variations de couleurs et aux grains décoratifs",
      "Traitement rapide : polissage seulement 24 heures après la pose",
      "Chape décorative attrayante et unique pour locaux représentatifs",
      "Idéale pour espaces de vente, restaurants, foyers et musées",
    ],
    bildAlt: "Chape décorative TRUazzo grise polie avec diffusion de copeaux au magasin Isabel Marant à Vienne",
  },
  "u-bahnhof-koeln": {
    titel: "Gare de métro Breslauer Platz",
    untertitel: "Sol décoratif GRANIDUR résistant à l'usure pour une station de métro à fort trafic",
    land: "Allemagne",
    herausforderungen: [
      "Fort trafic avec jusqu'à 15 000 passagers par jour",
      "Le sol doit être résistant à l'usure et durable",
      "Exigence en matière de design et d'aménagement clair et lumineux",
      "Rentabilité sur toute la durée de vie",
    ],
    loesung:
      "Le sol décoratif GRANIDUR à base de durcisseur KORODUR VS 0/5 a été utilisé, poncé et résistant à l'usure. Le sol donne à cette station d'environ 4 800 m² un aspect lumineux et spacieux.",
    vorteile: [
      "Résistant à l'usure et durable sous forte sollicitation",
      "Surface décorative poncée",
      "Aspect lumineux et spacieux de la station",
      "Rentable sur toute la durée de vie",
    ],
    bildAlt: "Sol décoratif GRANIDUR poncé dans la station de métro lumineuse et spacieuse Breslauer Platz à Cologne",
  },
  "under-armoure-store-wisconsin-usa": {
    titel: "Magasin Under Armour",
    untertitel: "Sol decoratif autonivelant en aspect beton poli pour une ambiance de magasin unique",
    land: "USA",
    herausforderungen: [
      "Salle de vente representative aux exigences esthetiques elevees",
      "Aspect beton unique et personnalisable souhaite",
      "Mise en circulation rapide pour limiter la duree des travaux",
      "Support porteur et exempt de poussiere comme condition prealable",
    ],
    loesung:
      "Sur le support prealablement prepare, exempt de poussiere et porteur, le primaire d'accrochage KORODUR TXPK (resine epoxy) a d'abord ete applique et saupoudre de quartz. Le sol decoratif autonivelant TRU PC en aspect beton poli (agregats decoratifs de 0 a 2,5 mm, epaisseur 10 a 35 mm) a ensuite ete applique. Le polissage a ete realise avec un grain de 800, et un premier entretien reduit la penetration des liquides et des salissures.",
    vorteile: [
      "Aspect beton poli unique pour des espaces representatifs",
      "Prise rapide, circulation possible apres 2 a 3 heures",
      "Faible retrait et resistant au temps",
      "Realisation individuelle et creative",
    ],
    bildAlt: "Sol decoratif TRU PC poli dans le magasin Under Armour au Wisconsin, USA",
  },
  "verwaltungsgebaeude-laehitapiola-espoo": {
    titel: "Bâtiment administratif LÄHITAPIOLA",
    untertitel: "Sol décoratif blanc poncé GRANIDUR BIANCO, aspect granit",
    land: "Finlande",
    herausforderungen: [
      "Sol design représentatif pour le nouveau bâtiment administratif de l'un des plus grands groupes d'assurance de Finlande",
      "1 500 m² sur 6 niveaux, dans les couloirs de chaque niveau",
      "Architecture postmoderne en éléments d'acier et de béton, dans laquelle le sol devait s'intégrer",
      "Exigence de durabilité écologique grâce à une mise en œuvre purement minérale",
    ],
    loesung: "Fin 2009, nous avons posé le sol design KORODUR GRANIDUR BIANCO, un sol blanc poli à base de ciment présentant un aspect granit. Il a été appliqué en une épaisseur moyenne de 15 mm sur le pont d'adhérence KORODUR HB 5, teinté en blanc pour s'accorder au sol design blanc. Les travaux ont été réalisés par l'applicateur Neliskulma Oy. Après plusieurs passes de ponçage, l'aspect granit caractéristique est apparu.",
    vorteile: [
      "Aspect granit blanc obtenu après plusieurs passes de ponçage, haut de gamme et représentatif",
      "Sol design purement minéral à base de ciment, écologiquement durable",
      "Surface de chape décorative s'intégrant au bâtiment postmoderne en acier et béton",
      "Réalisé sur une grande surface de 1 500 m² répartie sur 6 niveaux",
    ],
    bildAlt: "Sol décoratif blanc GRANIDUR BIANCO aspect granit dans les couloirs du bâtiment administratif LÄHITAPIOLA à Espoo",
  },
  "verwaltungsgebaeude-moedel-amberg": {
    titel: "Bureaux administratifs Moedel, Amberg",
    untertitel: "Sol décoratif anthracite pour un foyer représentatif",
    land: "Allemagne",
    herausforderungen: [
      "Sol décoratif représentatif pour le foyer de nouveaux bureaux administratifs",
      "Conception de sol contemporaine et de qualité dans la couleur anthracite",
      "Finition de la surface par ponçage et traitement professionnels",
    ],
    loesung:
      "Le sol du foyer des bâtiments administratifs, soit environ 400 m², a été réalisé avec du KCF 05 (ancien SECUNDUR) dans la couleur anthracite. Le sol décoratif KCF a par la suite été poncé et traité selon le procédé KOROCLEAN. Les travaux de ponçage ont été réalisés par la société RSB Steinbodensanierung & Bodenschleiftechnik de Regensburg avec une technique de ponçage ultramoderne.",
    vorteile: [
      "Conception de sol contemporaine et de qualité dans la couleur anthracite",
      "Surface finie selon le procédé KOROCLEAN",
      "Sol représentatif pour la zone d'accueil et le foyer",
    ],
    bildAlt: "Sol décoratif KORODUR KCF 05 anthracite dans le foyer des bureaux administratifs Moedel à Amberg",
  },
  "weingut-am-nil-kallstadt": {
    titel: "Weingut am Nil",
    untertitel: "Sol décoratif anthracite en optique KCF lissée pour un restaurant au style élégant et épuré",
    land: "Allemagne",
    herausforderungen: [
      "Accès difficile aux caves uniquement par un escalier étroit et une échelle raide",
      "La mise en œuvre devait être effectuée sans poussière",
      "L'accès étroit exigeait un pompage du matériau sur 80 m de tuyaux",
    ],
    loesung:
      "En mai 2015, un sol décoratif KORODUR de couleur anthracite, en optique KCF lissée, a été installé dans la cave. Avec une technologie de pompe adaptée, le matériel KCF a été pompé à travers 80 m de tuyaux jusqu'à l'accès étroit et le sol posé avec une épaisseur de couche de 10 mm. Après lissage final et durcissement, le sol décoratif a été traité avec OBTEGO R-400, fournissant une protection contre les taches et plus de brillance.",
    vorteile: [
      "Optique décorative anthracite lissée et sans joints",
      "Mise en œuvre possible même avec un accès difficile sur de longues distances de tuyaux",
      "Protection accrue contre les taches et brillance grâce au traitement",
      "Faible épaisseur de pose de 10 mm en moyenne",
    ],
    bildAlt: "Sol décoratif KORODUR KCF anthracite dans la cave à vin du Weingut am Nil à Kallstadt",
  },
  "airbus-a-380-hamburg-finkenwerder": {
    titel: "Hangar Airbus A 380 Hamburg-Finkenwerder",
    untertitel: "20 000 m² de durcisseur KORODUR pour le hall de maintenance du plus grand avion civil du monde",
    land: "Allemagne",
    herausforderungen: [
      "Une surface gigantesque de 20 000 m² à réaliser en seulement 2 ½ mois",
      "Site sur une presqu'île : tous les matériaux ne pouvaient être livrés que par voie navale en remorqueur",
      "Mesures contre le bruit avec des horaires de livraison très limités et réglementés",
      "Exigence élevée de réalisation de plus de 2 000 m² par jour",
    ],
    loesung:
      "Le très performant système de silo KORODUR a été mis en place en combinaison avec le durcisseur NEODUR HE 65. Pour réaliser plus de 2 000 m² par jour, deux silos avec pompe intégrée fonctionnaient en parallèle. Au total, environ 500 tonnes de NEODUR HE 65 ont été utilisées pour cet ouvrage.",
    vorteile: [
      "Plus de 2 000 m² par jour grâce à deux silos fonctionnant en parallèle",
      "Approvisionnement fluide malgré le site sur presqu'île et les mesures anti-bruit",
      "Durcisseur hautement résistant pour cette application exigeante en hangar",
      "Système de silo éprouvé avec pompe intégrée pour les grandes surfaces",
    ],
    bildAlt: "Sol industriel KORODUR dans le hangar Airbus A 380 à Hamburg-Finkenwerder",
  },
  "amazon-logistikzentrum-bad-hersfeld": {
    titel: "Centre logistique Amazon Bad Hersfeld",
    untertitel: "Sol industriel à durcisseur avec peu de joints sur 100 000 m² pour une exploitation en continu",
    land: "Allemagne",
    herausforderungen: [
      "Charges élevées en exploitation logistique continue",
      "Sol avec le moins de joints possible, panneaux jusqu'à 36 x 36 m",
      "Garantir une utilisation en continu sans accros",
      "Cadence élevée d'environ 3 000 m² de sol industriel par jour",
    ],
    loesung:
      "Un béton en fibres métalliques a été choisi comme base et traité avec un durcisseur NEODUR afin d'augmenter la résistance à l'abrasion du sol industriel. Environ 3 000 m² ont été posés par jour, soit 500 m³ de béton et environ 17,5 tonnes de fibres métalliques. La plus grande partie de la surface a été réalisée en NEODUR HE 3 gris naturel, certains secteurs comme la réception et l'envoi des marchandises en NEODUR HE 3 rouge.",
    vorteile: [
      "Haute résistance à l'abrasion et à l'usure de la surface",
      "Exécution avec peu de joints, grands panneaux jusqu'à 36 x 36 m",
      "Pose rapide d'environ 3 000 m² par jour",
      "Repérage des zones par les teintes gris et rouge",
    ],
    bildAlt: "Sol industriel du centre logistique Amazon à Bad Hersfeld",
  },
  "amazon-logistikzentrum-wroclaw-polen": {
    titel: "Centres Logistiques Amazon Wrocław",
    untertitel: "Environ 260 000 m² de sol industriel KORODUR hautement résistant à l'usure pour deux centres de distribution Amazon",
    land: "Pologne",
    herausforderungen: [
      "Résistance à l'usure maximale pour un trafic logistique et de chariots élévateurs intensif",
      "Calendrier très serré du maître d'ouvrage jusqu'à la mise en service à l'été 2014",
      "Mise en œuvre quasiment sans joints avec des champs de 1 200 m²",
      "Surface totale gigantesque d'environ 260 000 m² répartie sur deux halles",
    ],
    loesung:
      "Le sol industriel KORODUR NEODUR HE 3 gris ciment a été mis en œuvre par le spécialiste de pose et partenaire de longue date de KORODUR, PPP Posadzki Przemysłowe Polska de Węgrzce Wielkie. Pour respecter le calendrier serré, PPP a installé jusqu'à 6 000 m² de sol industriel par jour, quasiment sans joints, en champs de 1 200 m².",
    vorteile: [
      "Résistance à l'usure et à l'abrasion maximale pour le trafic lourd et de chariots élévateurs",
      "Cadence d'installation élevée allant jusqu'à 6 000 m² par jour pour le calendrier serré",
      "Mise en œuvre sans joints avec de grands champs de 1 200 m²",
      "Solution la plus économique à long terme grâce à une durabilité durable",
    ],
    bildAlt: "Centre logistique Amazon à Wrocław avec sol industriel KORODUR NEODUR HE 3",
  },
  "bmw-logistikzentrum-wallersdorf": {
    titel: "BMW Centre Logistique Wallersdorf",
    untertitel: "Sol industriel à durcisseur minéral extrêmement résistant à l'usure pour l'un des plus grands centres logistiques du monde",
    land: "Allemagne",
    herausforderungen: [
      "Sol industriel exposé à un stress extrême 24h/24 par l'exploitation logistique",
      "Manutention sûre de la logistique et de la distribution des pièces de rechange à assurer",
      "Énorme superficie de plus de 50 terrains de football à réaliser de manière économique et rapide",
      "Exigences élevées sur le durcissement de surface et la qualité de la performance d'installation",
    ],
    loesung:
      "Le maître d'ouvrage et le concepteur ont décidé pour un sol industriel minéral KORODUR, extrêmement résistant à l'usure, selon la norme DIN 1100. L'installateur CBL Chemobau Industrieboden a réalisé le sol dans une performance d'installation impressionnante de jusqu'à 4.000 m² par jour. L'équipement de béton le plus moderne, le Laser Screed S22E, a été utilisé. Le durcisseur KORODUR a été fourni en emballage big bag et appliqué uniformément par l'épandeur, permettant une application économique et rapide de gros volumes.",
    vorteile: [
      "Sol à durcisseur minéral extrêmement résistant à l'usure selon DIN 1100",
      "Performance d'installation impressionnante de jusqu'à 4.000 m² par jour",
      "Application économique en big bag par épandeur avec Laser Screed S22E",
      "Capacité de charge durable pour l'exploitation logistique 24h/24",
    ],
    bildAlt: "Sol industriel à durcisseur KORODUR au centre logistique BMW à Wallersdorf",
  },
  "bmw-austellungshalle-krefeld": {
    titel: "Nouveau salon d'exposition BMW Krefeld",
    untertitel: "Sol industriel KORODUR en agrégats durs résistant à l'usure pour les nombreux mouvements de véhicules du hall d'exposition",
    land: "Allemagne",
    herausforderungen: [
      "Les nombreux mouvements de véhicules dans le hall d'exposition exigent un sol particulièrement résistant à l'usure",
      "Atmosphère de bien-être claire et conviviale mettant en scène le client et les véhicules",
      "Sol industriel fonctionnel alliant une grande qualité esthétique",
    ],
    loesung:
      "Pour résister aux nombreux mouvements de véhicules, le maître d'ouvrage a opté pour un sol industriel KORODUR en agrégats durs en technique monolithique, mis en œuvre par Aslan Industrieboden GmbH de Bocholt. Le béton support a été mis en place et le durcisseur abrasif NEODUR HE 3 par-dessus, taloché et lissé à l'aide d'une lisseuse à disque et d'un hélicoptère.",
    vorteile: [
      "Haute résistance à l'usure pour les nombreux mouvements de véhicules",
      "Mise en œuvre monolithique en une seule étape avec le béton support",
      "Aspect représentatif de grande qualité pour le hall d'exposition",
    ],
    bildAlt: "Sol industriel KORODUR en agrégats durs dans le nouveau salon d'exposition BMW à Krefeld",
  },
  "betonwerk-lintel-rheda-wiedenbrueck": {
    titel: "Betonwerk Lintel – Pavés DUROCON",
    untertitel: "Pavés en béton hautement résistants à l'usure avec durcisseur KORODUR pour les sollicitations les plus sévères",
    land: "Allemagne",
    herausforderungen: [
      "Sollicitation à l'usure la plus élevée due aux lourds véhicules à chenilles",
      "Les pavés conventionnels à forte résilience ne résistaient pas durablement aux charges",
      "Exigence d'un aspect de haute qualité en forme, couleur et surface",
    ],
    loesung:
      "Le système de revêtement intelligent et économique du profilé en H de Lintel a été combiné aux granulats durs KORODUR. Il en résulte le pavé en béton DUROCON® à surface hautement résistante à l'usure, fabriqué dans la centrale Betonwerk Lintel en tenant compte des dernières découvertes technologiques du béton.",
    vorteile: [
      "Surface hautement résistante à l'usure pour les sollicitations les plus sévères",
      "Plus robuste que les pavés d'usage courant et à forte résilience conventionnels",
      "Éprouvé sous de lourds véhicules à chenilles",
      "Aspect de haute qualité en forme, couleur et surface",
    ],
    bildAlt: "Pavés en béton DUROCON avec durcisseur KORODUR au Betonwerk Lintel, Rheda-Wiedenbrück",
  },
  "bomag-shanghai-china": {
    titel: "Site de production BOMAG, Chine",
    untertitel: "10 000 m² de sol industriel KORODUR à fortes sollicitations pour le leader mondial de la technique de compactage",
    land: "Chine",
    herausforderungen: [
      "Sol industriel résistant à de fortes sollicitations et à l'usure pour une production de machines exigeante",
      "Logistique sur un trajet de transport de plus de 20 000 km par container maritime",
      "Mise en œuvre dans les délais de grandes surfaces, très professionnellement, par une société spécialisée locale",
    ],
    loesung:
      "En 2007, 10 000 m² de sols industriels KORODUR ont été mis en place avec précision dans le nouveau site de production, très professionnellement. Une société spécialisée locale a mis en œuvre le KORODUR VS 0/5 comme un durcisseur classique, sur une épaisseur de 10 mm. Grâce à une expérience de longue date dans l'exportation, les containers maritimes sont arrivés sans encombre sur le chantier.",
    vorteile: [
      "Sol en durcisseur résistant à de fortes sollicitations et extrêmement résistant à l'usure",
      "Qualité et continuité KORODUR mondialement reconnues",
      "Logistique parfaite malgré un trajet de plus de 20 000 km",
      "Solution la plus économique à long terme",
    ],
    bildAlt: "Sol industriel KORODUR dans le site de production BOMAG à Fengxian, Shanghai, Chine",
  },
  "borbet-leichtmetallradproduktion-kodersdorf": {
    titel: "Production de jantes en alliage BORBET, Kodersdorf",
    untertitel: "25 000 m² de sol industriel à granulats durs pour la zone la plus sollicitée de la nouvelle usine",
    land: "Allemagne",
    herausforderungen: [
      "Sol industriel, partie la plus sollicitée de l'ouvrage",
      "Mettre en œuvre une très grande surface de plus de 25 000 m² de manière économique",
      "Assurer un démarrage ponctuel de la production au printemps 2016",
    ],
    loesung:
      "D'octobre à décembre 2015, le produit NEODUR HE 3 a été mis en œuvre sur plus de 20 000 m². 5 000 m² supplémentaires ont été réalisés frais sur frais avec NEODUR HE 65, en épaisseur de 10 mm et livraison en silo. Le système de silo KORODUR permet une mise en œuvre économique grâce à une technologie de malaxage et de pompage adaptée, avec un transport sur des distances jusqu'à 80 m.",
    vorteile: [
      "Production journalière jusqu'à 2 000 m² avec le système de silo KORODUR",
      "Mise en œuvre économique grâce à une technique de malaxage et de pompage rationnelle",
      "Déroulement logistique simple et économies de temps de travail",
      "Qualité KORODUR reconnue pour la zone la plus sollicitée",
    ],
    bildAlt: "Sol industriel à granulats durs KORODUR dans la nouvelle usine de jantes en alliage BORBET à Kodersdorf",
  },
  "caterpillar-abu-dhabi-dubai": {
    titel: "Atelier Caterpillar Abu Dhabi",
    untertitel: "Sol industriel haute résistance pour les engins Caterpillar les plus lourds",
    land: "Émirats Arabes Unis",
    herausforderungen: [
      "Sollicitation permanente des sols par les engins Caterpillar lourds",
      "Résistance à l'usure maximale pour l'exploitation de l'atelier",
      "Qualité éprouvée dans la continuité des sols KORODUR posés depuis 1984",
    ],
    loesung:
      "Sur environ 1 500 m², le produit prémélangé KORODUR NEODUR HE 65 métallique a été mis en œuvre. Ce sol à durcisseur métallique offre une résistance à l'usure maximale et résiste aux sollicitations les plus sévères.",
    vorteile: [
      "Résistance à l'usure maximale grâce à la couche d'usure métallique",
      "Conçu pour les sollicitations les plus lourdes des engins Caterpillar",
      "Qualité KORODUR éprouvée, en service dans la région du golfe depuis 1984",
    ],
    bildAlt: "Atelier Caterpillar à Abu Dhabi avec sol industriel KORODUR NEODUR HE 65 métallique",
  },
  "fertigstellen-eines-zementfussbodens-in-einem-bewohnten-appartment-gdynia-polen": {
    titel: "Réalisation d'un sol cimentaire dans un appartement habité",
    untertitel: "Sol industriel autonivelant à l'aspect béton, praticable après seulement 10 heures",
    land: "Pologne",
    herausforderungen: [
      "Conserver le parquet en bois existant et l'associer harmonieusement aux nouvelles surfaces de chape",
      "Teinte claire en accord avec le parquet en frêne et le cadre en acier du radiateur de chauffage au sol",
      "Surface plane à l'aspect béton naturel",
      "Travaux de sol sans interruption d'usage de l'appartement habité",
    ],
    loesung:
      "Sous la direction de l'architecte, l'applicateur a réalisé différents échantillons de mortier pour l'adaptation de la teinte. Comme les travaux devaient être réalisés sans interruption d'usage, le choix s'est porté sur NEODUR Level – un sol industriel à liant cimentaire, autonivelant et à durcissement rapide, à l'aspect béton. Des zones supplémentaires ont même été créées pour NEODUR Level afin d'obtenir un aspect de sol harmonieux dans son ensemble.",
    vorteile: [
      "Autonivelant pour une surface plane à l'aspect béton naturel",
      "Durcissement rapide, praticable après seulement 10 heures",
      "Teinte adaptable au parquet et aux éléments intégrés",
      "Pose possible sans interruption d'usage",
    ],
    bildAlt: "Sol cimentaire autonivelant NEODUR Level à l'aspect béton associé à un parquet en frêne dans un appartement habité à Gdynia, Pologne",
  },
  "hornbach-baumarkt-bruenn-cz": {
    titel: "Magasin de bricolage Hornbach Brno",
    untertitel: "Couche de durcisseur KORODUR pour un fort passage du public et des palettes dans un magasin de bricolage",
    land: "République tchèque",
    herausforderungen: [
      "Passage incessant du public en exploitation continue",
      "Sollicitations régulières dues aux palettes sur la surface",
      "Exigence de la norme DIN 18560, partie 7, tableau 1, groupe de sollicitations moyens",
      "Utilisation durable sur des décennies sans dégâts au sol",
    ],
    loesung:
      "Sur le support béton encore frais, la chape à base de durcisseur KORODUR 0/4 a été mise en œuvre sur une épaisseur de 10 mm pour satisfaire aux exigences de la norme DIN 18560, partie 7, tableau 1, groupe de sollicitations moyens. Les travaux de pose sur une surface de 5 600 m² ont été réalisés par le spécialiste tchèque Largo Spol.",
    vorteile: [
      "Haute résistance à l'usure pour le passage du public et des palettes",
      "Satisfait au groupe de sollicitations moyens DIN 18560 pour seulement 10 mm d'épaisseur",
      "Mise en œuvre frais sur frais sur le béton encore frais",
      "Utilisation parfaite et durable depuis près de 20 ans",
    ],
    bildAlt: "Sol industriel à base de durcisseur KORODUR au magasin de bricolage Hornbach à Brno, République tchèque",
  },
  "jura-werkstaetten-amberg": {
    titel: "Nouveaux ateliers Jura-Werkstätten Amberg",
    untertitel: "Sol en agrégats durs à haute résistance pour les ateliers et zones de stockage d'un atelier pour personnes handicapées",
    land: "Allemagne",
    herausforderungen: [
      "Forte sollicitation à l'usure des ateliers et zones de stockage par l'exploitation quotidienne",
      "Assurer une adhésion optimale entre le support béton et la couche en agrégats durs de 15 mm",
      "Sol facile à entretenir et esthétique pour un usage quotidien",
      "Créer des conditions de travail idéales pour 355 personnes handicapées",
    ],
    loesung:
      "Sur environ 4 500 m² d'ateliers et de zones de stockage a été appliqué le sol industriel KORODUR en agrégats durs, hautement résistant à l'usure, NEODUR HE 65, d'une épaisseur de 15 mm. Le primaire d'accrochage minéral KORODUR HB 5 a assuré l'adhésion sur le support béton. Après application et cure, la surface a reçu un polissage mécanique léger, le procédé KOROCLEAN, suivi de l'application de KOROMINERAL, produit bouche-pores à base de silicates.",
    vorteile: [
      "Sol en agrégats durs à haute résistance pour une durabilité durable",
      "Adhésion optimale grâce au primaire minéral KORODUR HB 5",
      "Surface silicatée pour un entretien et une protection facilités",
      "Surface de travail valorisée et durable",
    ],
    bildAlt: "Sol industriel NEODUR HE 65 haute résistance dans les ateliers et zones de stockage des nouveaux ateliers Jura-Werkstätten à Amberg",
  },
  "kunstdepot-muenchen": {
    titel: "Dépôt d'art Munich",
    untertitel: "Chape industrielle très résistante à l'usure pour un dépôt d'art sur trois niveaux",
    land: "Allemagne",
    herausforderungen: [
      "Sol durablement résistant à l'usure pour le composant de construction le plus fortement sollicité",
      "Préparation minutieuse du support pour assurer une liaison permanente entre le support béton et la chape à agrégats durs",
      "Conditions de stockage exigeantes pour des biens artistiques et culturels sensibles sur trois niveaux",
      "Amélioration des propriétés de nettoyage et de la densité de la surface",
    ],
    loesung:
      "En octobre 2017, le spécialiste en revêtements de sol CBL Chemobau a réalisé une chape industrielle KORODUR très résistante à l'usure avec le système KOROTAN : sur le primaire d'accrochage KORODUR HB 5 avec une couche d'usure NEODUR HE 65. Le mortier à agrégats durs a été mélangé et transporté avec la pompe de mélange inoComb Cabrio d'INOTEC et livré en big bag. Enfin, une imprégnation siliceuse KOROMINERAL a été appliquée comme finition de surface.",
    vorteile: [
      "Haute résistance à l'usure pour le composant de construction le plus fortement sollicité",
      "Liaison permanente entre le support béton et la chape à agrégats durs dans le système KOROTAN",
      "Amélioration des propriétés de nettoyage et de la densité grâce à la silicification de surface",
      "Mise en œuvre efficace de la chape à agrégats durs par pompe de mélange et livraison en big bag",
    ],
    bildAlt: "Sol industriel KORODUR très résistant à l'usure dans le dépôt d'art IMMO à Munich",
  },
  "lidl-zentrallager-graben": {
    titel: "Centre de stockage LIDL Graben",
    untertitel: "Sol industriel a base de granulats durs pour le plus grand centre logistique LIDL d'Allemagne",
    land: "Allemagne",
    herausforderungen: [
      "Realiser une surface d'environ 38 000 m² avec une haute qualite",
      "Haute resistance a l'usure pour le trafic continu de chariots et les fortes charges",
      "Capacite portante pour plus de 18 000 palettes europe",
      "Calendrier de construction serre jusqu'a l'achevement fin juin 2011",
    ],
    loesung:
      "Environ 38 000 m² de la surface de stockage ont ete realises en sol industriel KORODUR avec le mortier sec a granulats durs NEODUR HE 3. La chape a granulats durs appliquee de maniere monolithique offre la resistance a l'usure et la capacite portante requises pour l'exploitation logistique.",
    vorteile: [
      "Haute resistance a l'usure pour une exploitation continue",
      "Portant pour plus de 18 000 palettes europe",
      "Realisation economique de grandes surfaces",
      "Achevement dans les delais malgre un calendrier serre",
    ],
    bildAlt: "Sol industriel KORODUR dans le centre de stockage LIDL a Graben pres d'Augsburg",
  },
  "logistikzentrum-daimler-guangzhou-china": {
    titel: "Centre logistique Daimler Guangzhou",
    untertitel: "Sol durci clair et hautement resistant pour l'entrepot de pieces detachees Mercedes-Benz en Chine",
    land: "Chine",
    herausforderungen: [
      "Surface de 36 000 m² soumise a des charges lourdes et au trafic de chariots elevateurs en exploitation logistique permanente",
      "Une ambiance interieure claire et conviviale etait souhaitee pour reduire les couts d'energie grace aux economies de lumiere",
      "La qualite NEODUR constante du premier centre logistique Daimler a Kunshan devait etre reproduite",
    ],
    loesung:
      "Comme pour le centre logistique de Kunshan pres de Shanghai realise en 2013, le sol de l'entrepot a ete execute avec le sol industriel durci NEODUR HE 65 dans la couleur gris clair. Le materiau clair cree une ambiance plus conviviale et plus lumineuse a l'interieur.",
    vorteile: [
      "Sol durci hautement resistant pour une exploitation logistique et de charges lourdes permanente",
      "Couleur gris clair pour une ambiance de halle conviviale et bien eclairee",
      "Couts d'energie reduits grace aux economies de consommation de lumiere",
      "Qualite NEODUR eprouvee et reproductible comme dans le projet precedent a Kunshan",
    ],
    bildAlt: "Sol durci NEODUR HE 65 gris clair dans le centre logistique Daimler a Guangzhou, Chine",
  },
  "martensbro-schule-espoo-finnland-2": {
    titel: "Mårtensbro Skola, Espoo",
    untertitel: "Sol industriel à durcisseur minéral gris clair pour une réflexion maximale de la lumière durant l'hiver finlandais",
    land: "Finlande",
    herausforderungen: [
      "Sollicitation quotidienne intense par des milliers de passages dans une école",
      "Deux supports différents : pose frais sur frais et chape rapportée sur béton existant",
      "Optimisation de la réflexion de la lumière durant les longs mois sombres de l'hiver",
      "Surface durable et facile à nettoyer avec une esthétique attrayante",
    ],
    loesung:
      "Une chape d'usure KORODUR a été réalisée selon les normes DIN 18560-7 et DIN 1100, durcisseur de groupe A, avec le produit NEODUR HE 65 gris clair en aspect marbré KCF. Une chape d'environ 600 m² a été réalisée frais sur frais en épaisseur de 10 mm. Une chape rapportée de 600 m² a été mise en place sur support béton existant : d'abord le primaire d'accrochage minéral KORODUR HB 5, puis une chape d'usure d'environ 15 mm. Une quantité d'environ 30 tonnes de durcisseur prémixé NEODUR HE 65 a été utilisée.",
    vorteile: [
      "Haute résistance à l'usure pour un usage scolaire durable",
      "Le gris clair optimise la réflexion de la lumière durant les mois d'hiver sombres et réduit les coûts d'énergie",
      "Surface facile à nettoyer et esthétiquement attrayante en aspect KCF",
      "Solution durable, écologique et économiquement attractive",
    ],
    bildAlt: "Sol industriel à durcisseur minéral KORODUR gris clair à la Mårtensbro Skola à Espoo, Finlande",
  },
  "metro-grossmarkt-wien-oesterreich": {
    titel: "Rénovation du marché de gros METRO",
    untertitel: "Chape rapide claire et résistante à l'usure pour les magasins d'un marché de gros entièrement rénové",
    land: "Autriche",
    herausforderungen: [
      "Sol à haute résistance à l'usure pour le marché de gros très fréquenté",
      "Teinte claire pour un rendu esthétique dans les magasins",
      "Prise rapide pour respecter le calendrier serré des travaux",
      "Mise en œuvre en plusieurs étapes pendant les travaux de rénovation",
    ],
    loesung:
      "Préalablement, de nombreux systèmes de sols ont été testés sur une période d'un an. En raison de ses excellentes propriétés, résistance élevée à l'usure, prise rapide et couleur claire, le client a choisi le système de chape rapide KORODUR. La mise en œuvre a été réalisée en plusieurs étapes. Pour protéger les sols contre les taches optiques pendant l'utilisation, les surfaces finies et nettoyées ont été traitées avec un produit de protection.",
    vorteile: [
      "Résistance élevée à l'usure pour l'exploitation intensive du marché de gros",
      "Prise rapide assurant le respect du calendrier serré des travaux",
      "Teinte claire pour un aspect esthétique",
      "Mise en œuvre par étapes possible pendant les travaux en cours",
    ],
    bildAlt: "Sol de chape rapide KORODUR de teinte claire dans les magasins du marché de gros METRO près de Vienne",
  },
  "moxy-hotel": {
    titel: "Hôtels Moxy",
    untertitel: "Béton support à caractère de sol industriel pour le design industriel chic des halls d'hôtel",
    land: "Allemagne",
    herausforderungen: [
      "Revêtement de sol au look industriel chic pour un design d'hôtel de charme cohérent",
      "Surface résistante pour les halls très fréquentés",
      "Aspect homogène sur quatre sites",
      "Mise en œuvre en saupoudrage sur un béton support frais",
    ],
    loesung:
      "Dans les halls d'Eschborn, Ludwigshafen, Francfort et Berlin, le produit NEODUR HE 3 a été mis en œuvre en saupoudrage sur un béton support frais. Les surfaces ont ensuite été traitées par une procédure spéciale de nettoyage et de polissage, puis finies avec un produit d'imprégnation spécial.",
    vorteile: [
      "Look industriel chic en accord avec le design de l'hôtel de charme",
      "Caractère de sol industriel résistant pour des halls très fréquentés",
      "Aspect homogène sur les quatre sites",
      "Surface imprégnée et facile d'entretien",
    ],
    bildAlt: "Sol industriel NEODUR HE 3 dans le hall d'un hôtel Moxy",
  },
  "moebelhaus-hoeffner-hamburg": {
    titel: "Magasin de meubles Höffner Hambourg",
    untertitel: "40 000 m² de sol industriel dans la teinte personnalisée « gris Krieger » – maîtrisé logistiquement avec le système de silo KORODUR",
    land: "Allemagne",
    herausforderungen: [
      "Coloration individuelle du durcisseur selon le souhait du client (« gris Krieger »)",
      "Gestion logistique de la livraison de matériaux pour un grand chantier de 40 000 m²",
      "Respect du temps d'installation limité",
      "Garantir une qualité de matériau homogène sur toute la surface",
    ],
    loesung:
      "Environ 350 tonnes du durcisseur KORODUR NEODUR HE 65 en « gris Krieger » ont été livrées en sacs big bag. La quantité bien plus importante d'environ 1 800 tonnes a été fournie avec le système de silo KORODUR, réputé pour les grands chantiers. Pour faire face au temps limité, parfois quatre unités de silo ont été utilisées simultanément.",
    vorteile: [
      "Performance quotidienne de 1 500 à 2 500 m² de sol industriel grâce au système de silo KORODUR",
      "Suppression des stations de mélange et de l'élimination des emballages",
      "Qualité homogène du mortier frais par rapport aux mélanges individuels",
      "Teinte personnalisée « gris Krieger » réalisée",
    ],
    bildAlt: "Sol industriel dans la teinte personnalisée « gris Krieger » dans le magasin de meubles Höffner à Hambourg",
  },
  "obi-baumaerkte": {
    titel: "OBI Magasins de bricolage",
    untertitel: "Chape en agrégats durs dans la teinte spéciale OBI pour plus de 500 000 m² de surface de vente",
    land: "Allemagne",
    herausforderungen: [
      "Résistance maximale à l'usure pour des surfaces de vente très fréquentées",
      "Aspect uniforme dans une teinte OBI spécialement développée",
      "Mise en œuvre à grande échelle et économique, en Allemagne et à l'international",
      "Qualité constante sur des centaines de magasins",
    ],
    loesung:
      "Les sols industriels KORODUR sont installés dans de nombreux magasins OBI. KORODUR a créé une teinte spéciale, c'est pourquoi dans de nombreux magasins OBI la chape en agrégats durs NEODUR HE 65, couleur spéciale OBI 2079, a été mise en œuvre. Souvent ce matériau spécialement teinté a été traité en utilisant le système KORODUR silo/pompage et malaxage, efficace et puissant.",
    vorteile: [
      "Dureté et résistance élevées pour des charges permanentes",
      "Teinte spéciale OBI 2079 uniforme pour un aspect conforme à la marque",
      "Mise en œuvre économique grâce au système silo KORODUR",
      "Qualité éprouvée, déployable en Allemagne et à l'international",
    ],
    bildAlt: "Sol industriel KORODUR dans un magasin OBI dans la teinte spéciale OBI",
  },
  "ropa-montagezentrum-herrngiersdorf": {
    titel: "Centre d'assemblage ROPA Herrngiersdorf",
    untertitel: "Sol industriel en agrégats durs très résistant à l'usure pour la fabrication de précision de machines de récolte haut de gamme",
    land: "Allemagne",
    herausforderungen: [
      "Revêtement de sol pour la production de précision techniquement avancée de machines lourdes haut de gamme",
      "Assurer une production constante et efficace sur une surface très résistante à l'usure",
      "Mettre en œuvre une grande surface d'environ 20 000 m² de manière économique et dans un délai court",
    ],
    loesung:
      "ROPA a de nouveau opté pour un sol industriel KORODUR, minéral et très résistant à l'usure, d'une épaisseur moyenne de 10 mm, selon les normes DIN 1100 et DIN 18560-7. La chape en agrégats durs NEODUR HE 65 a été mise en œuvre à l'aide du système KORODUR silo/pompage et malaxage, efficace et reconnu.",
    vorteile: [
      "Surface minérale très résistante à l'usure pour charges lourdes",
      "Conforme aux normes DIN 1100 et DIN 18560-7",
      "Mise en œuvre économique avec le système KORODUR silo/pompage et malaxage",
      "Rendement quotidien jusqu'à 2 000 m²",
    ],
    bildAlt: "Sol industriel en agrégats durs NEODUR HE 65 dans le centre d'assemblage ROPA à Herrngiersdorf",
  },
  "restaurant-haerg-tallinn-estland": {
    titel: "Restaurant HÄRG, Tallinn",
    untertitel: "Un sol industriel comme parti pris design : fissures voulues, surface rugueuse, couleurs mélangées",
    land: "Estonie",
    herausforderungen: [
      "Obtenir un aspect de sol industriel caractéristique avec des fissures voulues et une surface rugueuse",
      "Ne pas consolider délibérément les fissures du support pour qu'elles se prolongent dans la couche de finition",
      "Créer une coloration unique en mélangeant deux teintes NEODUR directement sur le chantier",
      "Offrir un sol résistant pour l'exploitation quotidienne du restaurant",
    ],
    loesung:
      "Un sol industriel KORODUR de 15 mm d'épaisseur a été posé avec le système KOROTAN et son primaire d'accrochage KORODUR HB 5. La chape en agrégats durs NEODUR HE 65 a été fournie dans les tons vert et gris basalte, mélangés sur le chantier. Les fissures du support n'ont délibérément pas été consolidées afin qu'elles se prolongent dans la couche de finition.",
    vorteile: [
      "Aspect de sol industriel caractéristique avec fissures voulues et surface rugueuse",
      "Coloration unique obtenue en mélangeant le vert et le gris basalte",
      "Chape en agrégats durs résistante pour l'exploitation du restaurant",
      "Système KOROTAN éprouvé avec primaire d'accrochage HB 5",
    ],
    bildAlt: "Sol industriel avec chape en agrégats durs NEODUR HE 65 en vert et gris basalte mélangés au Restaurant HÄRG à Tallinn",
  },
  "sic-processing-zhenjiang-china": {
    titel: "SiC Processing Zhenjiang",
    untertitel: "Sol industriel KORODUR pour des charges mécaniques très élevées dans le recyclage de slurry",
    land: "Chine",
    herausforderungen: [
      "Charges mécaniques partiellement très élevées dans les différentes zones de production",
      "Exigences de charge variables selon la zone de production",
      "Fonctionnement durablement fluide pour le recyclage du slurry",
      "Coordination et mise en œuvre via des partenaires locaux en Chine",
    ],
    loesung:
      "Selon les charges mécaniques attendues, NEODUR HE 3 ou NEODUR HE 3 SVS 3 a été mis en œuvre, chacun en saupoudrage. La coordination a été assurée par Shanghai Golden Bridge, la mise en œuvre par l'entreprise locale Shanghai Xiao Jie.",
    vorteile: [
      "Sol industriel KORODUR éprouvé, sur lequel SiC Processing compte aussi pour ses investissements à l'étranger",
      "Capacité de charge adaptée précisément à chaque zone de production",
      "Saupoudrage pour une haute résistance à l'usure",
      "Fonctionnement durablement fluide du recyclage assuré",
    ],
    bildAlt: "Sol industriel KORODUR dans les halls de production SiC Processing à Zhenjiang, Chine",
  },
  "wago-stanzerei-minden": {
    titel: "Nouvel atelier d'estampage WAGO",
    untertitel: "24 000 m² de sol industriel en agrégats durs très résistant à l'usure pour un flux de production durable",
    land: "Allemagne",
    herausforderungen: [
      "Processus de production durable et efficace sur une grande surface de 24 000 m²",
      "Atteindre des performances quotidiennes élevées de 800 à 1 400 m² en qualité optimale",
      "Logistique efficace et besoin en matériau d'environ 500 tonnes de NEODUR HE 65",
      "Sol conforme à la norme et très résistant à l'usure pour un atelier d'estampage industriel",
    ],
    loesung:
      "Considérant ses sites déjà existants, WAGO s'est de nouveau décidé pour un sol industriel KORODUR minéral, très résistant à l'usure et conforme à la norme, confié au spécialiste Condulith. À l'aide de machines à la pointe de la technologie, le béton a été coulé avec double renforcement et des profils de joints HSD, puis le revêtement dur KORODUR a été appliqué « frais sur frais » sur 10 mm d'épaisseur. La chape en agrégats durs a été mise en œuvre avec le système silo/pompage KORODUR, avec une distance de transport jusqu'à 80 m.",
    vorteile: [
      "Sol industriel minéral en agrégats durs, très résistant à l'usure et conforme à la norme",
      "Mise en œuvre rapide grâce au système silo KORODUR (distance de transport jusqu'à 80 m)",
      "Économies de temps de travail et déroulement logistique amélioré",
      "Pas besoin de station de mélange ni d'emplacement pour les emballages",
    ],
    bildAlt: "Sol industriel en agrégats durs KORODUR dans le nouvel atelier d'estampage WAGO à Minden",
  },
  "zalando-bygodszcz-polen": {
    titel: "Centre logistique Zalando",
    untertitel: "Sol industriel résistant à l'usure pour 130 000 m² de surface logistique",
    land: "Pologne",
    herausforderungen: [
      "Sol industriel résistant à l'usure pour la manutention de millions d'articles",
      "Immense surface continue d'environ 130 000 m²",
      "Capacité portante durable dans une exploitation logistique intensive",
    ],
    loesung:
      "NEODUR HE 3 de couleur gris ciment a été mis en œuvre sur environ 130 000 m². Le sol durci à forte sollicitation convient aux zones industrielles très sollicitées comme les entrepôts à rayonnages hauts et les halls de montage ; il a été posé par l'entreprise spécialisée PPP.",
    vorteile: [
      "Haute résistance à l'usure pour une exploitation continue",
      "Adapté aux zones industrielles et de stockage à forte sollicitation",
      "Efficacité énergétique et des ressources accrue, préservant les ressources naturelles",
    ],
    bildAlt: "Sol industriel NEODUR HE 3 au centre logistique Zalando à Bydgoszcz, Pologne",
  },
  "pflastersteinsanierung-amberg": {
    titel: "Rénovation de pavés à Amberg",
    untertitel: "Rénovation de pavés en circulation fluide grâce au mortier à prise rapide",
    land: "Allemagne",
    herausforderungen: [
      "Rénovation des pavés en période de circulation fluide",
      "Préservation du charme de l'ancien pavage",
      "Passage piéton sans obstacle pour traverser la route",
      "Réduction du bruit pour les riverains",
    ],
    loesung:
      "Les pavés ont été rénovés avec le mortier polyvalent à prise rapide Rapid Set MORTAR MIX. Grâce à sa prise rapide, les travaux ont pu être réalisés en période de circulation fluide. Un passage pour piétons a en outre été créé.",
    vorteile: [
      "Travaux possibles en période de circulation fluide",
      "Prise rapide du mortier Rapid Set",
      "Préservation du charme historique du pavage",
      "Plus de sécurité et de qualité de vie au centre-ville",
    ],
    bildAlt: "Pavage rénové dans la Franziskanergasse, Amberg",
  },
  "pflastersanierung-crailsheim": {
    titel: "Égalisation de pavés sans barrières à Crailsheim",
    untertitel: "Surfaces pavées fraisées et rendues accessibles en quelques heures – sans longue fermeture",
    land: "Allemagne",
    herausforderungen: [
      "Égaliser un pavage irrégulier dans un espace de circulation public pour le rendre accessible",
      "Jointoyer le pavage de sorte qu'il puisse être fraisé sans que les pavés ne se détachent ou ne se desserrent",
      "Ne fermer que brièvement les zones concernées",
      "Une mesure rapide, simple et réduisant le CO₂ pendant l'exploitation du centre-ville",
    ],
    loesung:
      "Le système de joints de pavage KORODUR a été utilisé avec le mortier de réparation polyvalent Rapid Set MORTAR MIX. Après un nouveau jointoiement avec ce mortier spécial à prise rapide, à très faible retrait et très résistant, l'ensemble de la surface pavée a pu être fraisé et rendu accessible en quelques heures à l'aide d'un outillage adapté. L'adhérence entre MORTAR MIX et les flancs des pavés est si forte que les pavés ne se détachent pas lors du fraisage.",
    vorteile: [
      "À prise rapide – fraisage et remise en service après quelques heures",
      "À très faible retrait et très résistant, avec une forte adhérence aux flancs des pavés",
      "Les pavés ne se détachent pas et ne se desserrent pas lors du fraisage",
      "Système innovant, durable et réduisant le CO₂, avec de courtes durées de fermeture",
    ],
    bildAlt: "Égalisation de pavés sans barrières à Crailsheim",
  },
  "flughafen-zagreb": {
    titel: "Travaux à l'aéroport de Zagreb",
    untertitel: "À l'aéroport de Zagreb, une surface de dalles de béton d'env. 1.000 m² a été réparée sur les pistes d'atterrissage en à peine 1 mois grâce à l'utilisation de Rapid Set avec camions malaxeurs à système volumétrique.",
    land: "Croatie",
    herausforderungen: [
      "Assurer des temps d'arrêt les plus courts possibles sur une infrastructure très fréquentée",
      "Maintenir les pistes ouvertes au trafic la journée, ce qui imposait des travaux uniquement la nuit, entre 23 heures et 6 heures du matin",
      "Réparer une surface de dalles de béton d'env. 1.000 m²",
      "Atteindre rapidement une résistance suffisante pour rouvrir les pistes au trafic dès 6 heures du matin",
    ],
    loesung: "Le béton rapide Rapid Set a été mis en œuvre avec le système de malaxeur volumétrique. Le ciment Rapid Set est mélangé sur place avec des agrégats, de l'eau et des additifs au béton frais, immédiatement posé, ce qui permet une production de béton sur site sans retard et adaptée aux propriétés exigées et aux conditions météorologiques. Les travaux ont été effectués la nuit, entre 23 heures et 6 heures. Une fois les dalles de béton endommagées coupées et enlevées, le béton rapide Rapid Set a pu être coulé avec le système de malaxeur volumétrique. Le bétonnage, le lissage et la finition au balai ont pris env. 20 minutes, suivis d'un traitement de finition. Par nuit, 3 dalles de béton (env. 25 m³) ont pu être réparées.",
    kennwerte: [
      { value: "env. 1.000 m²", label: "Surface de dalles de béton réparée" },
      { value: "4 semaines", label: "Délai de réparation" },
      { value: "23 h à 6 h", label: "Plage horaire des travaux nocturnes" },
      { value: "env. 20 minutes", label: "Bétonnage, lissage et finition au balai" },
      { value: "3 dalles (env. 25 m³)", label: "Réparation par nuit" },
      { value: "> 20.0 MPa en 2 heures", label: "Résistance structurelle atteinte" },
    ],
    ergebnis: "En 2 heures, les dalles de béton finies avaient gagné une résistance structurelle > 20.0 MPa et pouvaient être rouvertes au trafic à 6 heures du matin. Grâce au béton rapide Rapid Set, les dalles de béton endommagées ont pu être réparées dans un délai de 4 semaines, sans de longues interruptions de trafic.",
    ausgangssituation: "Dans les endroits très fréquentés tels que les aéroports, il est nécessaire d'utiliser des matériaux permettant des temps d'arrêt les plus courts possibles. À Zagreb, des dalles de béton endommagées devaient être réparées sur les pistes d'atterrissage, alors que les pistes devaient rester ouvertes au trafic pendant la journée.",
    vorteile: [],
    bildAlt: "Réparation des dalles de béton sur les pistes de l'aéroport de Zagreb",
  },
  "kopfsteinpflaster-lenningen": {
    titel: "Pavés Lenningen",
    untertitel: "Nivellement sans obstacle de pavés avec mortier de réparation à prise rapide",
    land: "Allemagne",
    herausforderungen: [
      "Niveler les surfaces de pavés irrégulières sans obstacle",
      "Enlever l'ancien mortier de joint sur plus de 30 mm de profondeur",
      "Temps d'arrêt le plus court possible des surfaces publiques",
      "Réaliser une technique de travail économiquement praticable",
    ],
    loesung:
      "Le mortier de joint existant a été enlevé jusqu'à une profondeur de plus de 30 mm à l'aide d'un nettoyeur haute pression (>300 bar) et remplacé par le mortier de réparation polyvalent KORODUR Rapid Set MORTAR MIX. Après nettoyage, les surfaces ont été parfaitement nivelées sans obstacle dès le lendemain à l'aide d'une fraiseuse spéciale. Seuls les mortiers de réparation Rapid Set à prise rapide et résistance élevée permettent cette technique de travail pratique avec des temps d'arrêt très courts.",
    vorteile: [
      "Prise rapide : nivellement possible dès le lendemain",
      "Résistance élevée et application polyvalente",
      "Temps d'arrêt les plus courts – avantage économique",
      "Surface plane et sans obstacle",
    ],
    bildAlt: "Pavés Lenningen",
  },
  "hauptbahnhofsvorplatz-landau": {
    titel: "Place de la gare Landau",
    untertitel: "Surface en dalles de beton durable et proprement jointoyee pour la place de la gare reamenagee",
    land: "Allemagne",
    herausforderungen: [
      "Jointement des dalles de beton avec une largeur de joints de 8-10 mm et une profondeur de joints de 30 mm",
      "Un mortier de pavage qualifie et facile a mettre en oeuvre etait requis",
      "Joints durablement propres, sans fissures, eclatements ni contamination",
      "Orientation esthetique de la place vers l'Ostbahnstrasse",
    ],
    loesung:
      "L'entrepreneur Groetz a choisi le mortier de jointement KORODUR NEODUR PFM 1K Easyfix en couleur grise. NEODUR PFM 1K Easyfix est un mortier de pavage pret a l'emploi, emballe sous vide, utilise pour le jointement et la renovation de pavages. La surface de la pierre jointee reste pratiquement sans film de resine.",
    vorteile: [
      "Pret a l'emploi et emballe sous vide, facile a mettre en oeuvre",
      "Surface de la pierre pratiquement sans film de resine",
      "Aspect durablement propre, sans fissures ni eclatements",
      "Adapte au jointement et a la renovation de pavages",
    ],
    bildAlt: "Place de la gare Landau avec dalles de beton anthracite",
  },
  "gefaellesanierung-tankstelle-schneeberg": {
    titel: "Réfection du dénivelé devant une pompe à essence",
    untertitel: "Un nouveau dénivelé pour un écoulement libre de l'eau — pompe à essence rouverte après 4 heures",
    land: "Allemagne",
    herausforderungen: [
      "Refaire un dénivelé plus important pour que l'eau s'écoule librement sans obstruction",
      "Assurer la résistance aux substances polluantes de l'eau selon les directives DAfStb",
      "Maîtriser la prise rapide du mortier à 22 °C de sol et 24 °C d'air",
      "Remettre la pompe à essence en service le plus rapidement possible",
    ],
    loesung:
      "Une zone semi-circulaire a été enlevée et partiellement rendue rugueuse. Rapid Set MORTAR MIX a ensuite été utilisé pour créer le nouveau dénivelé plus important. Le produit ayant une prise rapide par forte chaleur, 20 sachets de CONCRETE PHARMACY SET CONTROL ont été ajoutés afin de retarder la prise et d'obtenir le temps de mise en œuvre nécessaire.",
    vorteile: [
      "Résistance aux substances polluantes de l'eau selon les directives DAfStb",
      "Faible profondeur de pénétration de l'eau de seulement 6 mm",
      "Pompe à essence de nouveau ouverte après seulement 4 heures",
      "Temps de prise ajusté à la forte chaleur grâce à SET CONTROL",
    ],
    bildAlt: "Réfection du dénivelé avec Rapid Set MORTAR MIX au pied d'une pompe à essence",
  },
  "kanalsanierung-im-schlosspark-muenchen": {
    titel: "Réparation d'égout dans le parc du château de Munich",
    untertitel: "Tête de regard réparée et remise à la circulation en 1 à 2 heures",
    land: "Allemagne",
    herausforderungen: [
      "Réglage exact de la hauteur lors de l'assemblage des nouveaux anneaux de puits",
      "Mortier stable, à faible retrait et à haute résistance exigé",
      "Remise à la circulation de la tête de regard dans les plus brefs délais",
    ],
    loesung:
      "Avec le mortier de réparation rapide, polyvalent et à haute performance Rapid Set MORTAR MIX, les anneaux de puits ont été levés, assemblés et posés avec un réglage exact de la hauteur. MORTAR MIX est résistant au trafic après seulement 1 à 2 heures, grâce à la puissante technologie du ciment Rapid Set.",
    vorteile: [
      "Pleinement sollicitable après seulement 1 à 2 heures",
      "Stable et à faible retrait pour un réglage exact de la hauteur",
      "Haute résistance grâce à la technologie du ciment Rapid Set",
      "Utilisation polyvalente pour le réglage d'anneaux de puits et les réparations",
    ],
    bildAlt: "Réparation d'égout avec Rapid Set MORTAR MIX dans le parc du château de Nymphenburg, Munich",
  },
  "kuechenarbeitsplatte-berlin": {
    titel: "Plan de travail de cuisine en MORTAR MIX",
    untertitel: "Mortier de réparation à prise rapide comme plan de travail en béton modelable au caractère béton brut",
    land: "Allemagne",
    herausforderungen: [
      "Réaliser un coffrage de 6 à 8 cm de hauteur ajusté précisément au plan de travail",
      "Mettre en place le matériau par sections d'environ 2 m de longueur sans reprises visibles",
      "Créer la structure de surface souhaitée par un traitement ciblé",
      "Conserver le caractère béton brut sans poncer la surface",
    ],
    loesung:
      "Le MORTAR MIX a été coulé dans un coffrage de 6 à 8 cm de hauteur par sections d'environ 2 m de longueur, en veillant à éviter les reprises visibles. Le matériau a été tiré sur les bords extérieurs du coffrage puis travaillé à la taloche en feutre et en bois ainsi qu'à la lisseuse, selon la structure de surface souhaitée. Après une cure à l'eau suffisante et le séchage, la surface a été imprégnée d'une protection hydrofuge, oléofuge et anti-graisse.",
    vorteile: [
      "MORTAR MIX coulable et librement modelable en coffrage ou en moule",
      "Structures de surface variées grâce à différents outils de finition",
      "Protection de surface hydrofuge, oléofuge et anti-graisse après imprégnation",
      "Caractère béton pur et non poncé sans aucun ponçage",
    ],
    bildAlt: "Plan de travail de cuisine coulé en Rapid Set MORTAR MIX dans un loft berlinois au caractère béton brut",
  },
  "kuechenbodensanierung-leinfelden": {
    titel: "Rénovation d'un sol de cuisine de restaurant",
    untertitel: "Carrelage endommagé renouvelé en cinq jours – recouvrable au bout de deux heures",
    land: "Allemagne",
    herausforderungen: [
      "Rénovation en exploitation continue du restaurant avec un minimum d'arrêts",
      "Carrelage et chape endommagés à démonter entièrement",
      "Résistance durable à l'humidité, aux graisses et aux détergents",
      "Délai de chantier court, remise en service rapide de la cuisine",
    ],
    loesung:
      "En cinq jours, le carrelage et la chape ont été entièrement démontés et renouvelés. Rapid Set MORTAR MIX s'est révélé un excellent choix grâce à sa mise en recouvrement rapide au bout de deux heures, réduisant considérablement le temps de travaux habituel. Enfin, la surface a été traitée avec le produit d'imprégnation transparent KOROMINERAL Li+ afin d'augmenter la résistance de la sous-couche aux graisses et aux détergents.",
    vorteile: [
      "Recouvrable au bout de deux heures seulement",
      "Temps de travaux nettement réduit par rapport aux systèmes classiques",
      "Résistance accrue aux graisses et aux détergents grâce à l'imprégnation",
      "Remise en service rapide en exploitation continue",
    ],
    bildAlt: "Sol de cuisine rénové dans un restaurant à Leinfelden-Echterdingen avec Rapid Set MORTAR MIX",
  },
  "pflastersanierung-esslingen": {
    titel: "Rénovation des pavés sans barrière Esslingen",
    untertitel: "Pavage historique préservé, irrégularités éliminées, égalisable après 2 heures",
    land: "Allemagne",
    herausforderungen: [
      "Préserver le pavage historique tout en garantissant l'accessibilité",
      "Éliminer les irrégularités des traversées de rue pavées",
      "Réduire les émissions sonores et améliorer la sécurité routière",
      "Réaliser la rénovation en centre-ville en économisant temps et argent",
    ],
    loesung:
      "L'ancien matériau des joints a été enlevé et les zones pavées nettoyées. Les zones ont ensuite été jointoyées à nouveau avec le mortier de réparation polyvalent à prise rapide Rapid Set MORTAR MIX, selon le procédé spécialement développé par KORODUR et Blessing. Après seulement deux heures, les zones nouvellement jointoyées ont pu être égalisées sans barrière à l'aide d'une fraise à béton.",
    vorteile: [
      "Préservation du pavage historique avec une accessibilité totale",
      "Égalisation possible après seulement 2 heures",
      "Émissions sonores réduites et sécurité routière améliorée",
      "Durée de vie plus longue et émissions de CO2 réduites grâce à des matières premières respectueuses du climat",
    ],
    bildAlt: "Rénovation des pavés sans barrière dans la vieille ville historique d'Esslingen avec Rapid Set MORTAR MIX",
  },
  "fussgaengerbruecke-albbruck": {
    titel: "Réparation d'un pont piétonnier",
    untertitel: "Surfaces réouvertes après seulement 1 heure environ",
    land: "Allemagne",
    herausforderungen: [
      "Contraintes énormes sur le pont dues aux conditions météorologiques telles que la chaleur et les précipitations",
      "Sel de déneigement endommageant les surfaces en ciment et altérant la pâte de ciment",
      "Risques de chutes sur les trottoirs et de graves dommages de la structure",
      "Surface à réouvrir à la circulation le plus rapidement possible",
    ],
    loesung:
      "La surface a été préparée et rendue rugueuse à l'aide d'un marteau de démolition, les débris ont été enlevés et la surface suffisamment humidifiée avec de l'eau. Une couche de 2 cm d'épaisseur du produit MORTAR MIX a ensuite été appliquée. La finition de surface peut varier, par exemple finition balai ou lissage. Pendant la prise, un brouillard d'eau est appliqué et après seulement 1 heure environ, les surfaces sont prêtes à être réouvertes.",
    vorteile: [
      "Surfaces réouvertes après seulement 1 heure environ",
      "Résistant aux intempéries et au sel de déneigement",
      "Finition de surface flexible, de la finition balai au lissage",
      "Restauration fiable de la surface en ciment du pont",
    ],
    bildAlt: "Réparation d'un pont piétonnier à Albbruck avec Rapid Set MORTAR MIX",
  },
  "schwellensanierung-goeppingen": {
    titel: "Réparation d'un seuil Göppingen",
    untertitel: "Garage de nouveau accessible en quelques heures",
    land: "Allemagne",
    herausforderungen: [
      "Épaisseurs d'application différentes sur le seuil",
      "Éviter les tensions dans le matériau",
      "Rétablir l'usage du garage le plus vite possible",
    ],
    loesung:
      "Pour contrebalancer les tensions éventuelles, le seuil a été divisé en deux parties et réparé en deux couches d'épaisseurs différentes, l'une avec CEMENT ALL et l'autre avec MORTAR MIX.",
    vorteile: [
      "De nouveau accessible en quelques heures",
      "Deux épaisseurs avec des produits Rapid Set adaptés",
      "Mise en œuvre simple et rapide",
    ],
    bildAlt: "Seuil de garage réparé à Göppingen-Jebenhausen avec Rapid Set CEMENT ALL et MORTAR MIX",
  },
  "3d-gedrucktes-haus-in-paremoremo": {
    titel: "Maison imprimée en 3D à Paremoremo",
    untertitel: "La première maison entièrement imprimée en 3D de Nouvelle-Zélande, avec panneaux muraux en béton",
    land: "Nouvelle-Zélande",
    herausforderungen: [
      "Première maison entièrement imprimée en 3D de Nouvelle-Zélande",
      "Intégration du bâtiment aux contours naturels du terrain",
      "Maison familiale de 252 m² pour une famille de quatre personnes",
    ],
    loesung:
      "Dans la banlieue d'Auckland, à Paremoremo, la première maison entièrement imprimée en 3D de Nouvelle-Zélande a été achevée. Cette maison familiale de 252 m² comporte des panneaux muraux en béton imprimé en 3D et s'intègre aux contours naturels de son environnement paisible.",
    vorteile: [
      "Première maison entièrement imprimée en 3D de Nouvelle-Zélande",
      "Panneaux muraux en béton directement issus de l'impression 3D",
      "Intégration harmonieuse à l'environnement naturel",
    ],
    bildAlt: "Maison résidentielle imprimée en 3D à Paremoremo, Nouvelle-Zélande",
  },
  "baufachhaendler-linnenbecker-aussenlager-bad-oeynhausen": {
    titel: "Négociant en matériaux Linnenbecker, entrepôt extérieur Bad Oeynhausen",
    untertitel: "Surface d'essai avec ASPHALT REPAIR MIX sous trafic permanent de camions et de chariots élévateurs",
    land: "Allemagne",
    herausforderungen: [
      "Surface d'asphalte endommagée avec nids-de-poule et fissures",
      "Trafic permanent de camions et de chariots élévateurs dans l'entrepôt extérieur",
      "Fortes contraintes permanentes sur le revêtement",
    ],
    loesung:
      "En mai 2022, nous avons réalisé une surface d'essai avec ASPHALT REPAIR MIX dans l'entrepôt extérieur ARM du négociant Linnenbecker, un matériau de réparation à prise rapide à base de ciment pour surfaces d'asphalte endommagées. Même sous un trafic permanent de camions et de chariots, le revêtement a prouvé sa résistance et sa durabilité.",
    vorteile: [
      "Prise rapide et grande capacité de charge",
      "Réparation robuste et durable des dommages de l'asphalte",
      "Application facile, même dans les zones à fort trafic",
    ],
    bildAlt: "Surface d'essai avec ASPHALT REPAIR MIX dans l'entrepôt extérieur Linnenbecker, Bad Oeynhausen",
  },
  "betriebszufahrt-lackiererei-schmidt-versmold": {
    titel: "Route d'accès de l'atelier de peinture Schmidt, Versmold",
    untertitel: "Réparation d'asphalte d'une route d'accès très fréquentée avec ASPHALT REPAIR MIX",
    land: "Allemagne",
    herausforderungen: [
      "Fortes charges dues à la circulation des camions et des voitures",
      "Garantir la capacité de résistance et la durabilité de la route d'accès",
      "Réparation de la route d'accès utilisée quotidiennement",
    ],
    loesung:
      "En mai 2022, nous avons recouvert la route d'accès à l'atelier de peinture Schmidt avec ASPHALT REPAIR MIX. Au total, deux palettes ont été mises en œuvre par l'entreprise expérimentée de travaux paysagers Grothues & Solfrian de Versmold.",
    vorteile: [
      "Grande capacité de charge pour la circulation quotidienne des camions et des voitures",
      "Application simple et efficace",
      "Solution durable et économique",
    ],
    bildAlt: "Route d'accès réparée de l'atelier de peinture Schmidt à Versmold",
  },
  "farbiger-beton-fuer-feinbrennerei": {
    titel: "Béton coloré pour la distillerie Sasse",
    untertitel: "Sol industriel rouge NEODUR HE 3 dans le hall de maturation de la distillerie",
    land: "Allemagne",
    herausforderungen: [
      "Sol en béton du hall de maturation, également dalle imperméable de la cuve blanche",
      "Manipulation régulière de liquides dans le hall de maturation",
      "Coloration rouge assortie au concept architectural",
      "Surface résistante à l'usure, antidérapante et imperméable exigée",
    ],
    loesung:
      "BD Bau GmbH a recouvert le sol en béton d'un système de sol industriel KORODUR. Le mortier sec minéral NEODUR HE 3 en couleur rouge a été saupoudré uniformément sur le béton taloché à l'aide d'un épandeur, puis taloché et lissé à la lisseuse à disque.",
    vorteile: [
      "Sol de hall résistant à l'usure, antidérapant et imperméable",
      "Couleur rouge assortie au concept esthétique",
      "Atmosphère chaleureuse en interaction avec les murs en béton ocre jaune",
    ],
    bildAlt: "Sol industriel rouge dans le hall de maturation de la distillerie Sasse à Schöppingen",
  },
  "lagerflaeche-strassenbau-dieckmann-versmold": {
    titel: "Surface de stockage, Straßenbau Dieckmann, Versmold",
    untertitel: "Rénovation de référence d'une surface de cour sous charges de camions et d'excavateurs",
    land: "Allemagne",
    herausforderungen: [
      "Charge maximale due aux camions et aux excavateurs",
      "Solution durable pour la surface de cour très fréquentée",
      "Mise en œuvre professionnelle en interne avec l'assistance de KORODUR",
    ],
    loesung:
      "Le 19 juillet 2021, en collaboration avec l'équipe de Dieckmann, nous avons réalisé une rénovation de référence de la surface de stockage avec ASPHALT REPAIR MIX. Le matériau est spécialement conçu pour les surfaces soumises à fort trafic et résiste au trafic lourd.",
    vorteile: [
      "Résistance exceptionnelle au trafic lourd",
      "Mise en œuvre efficace en coopération avec KORODUR",
      "Solution de haute qualité et durable",
    ],
    bildAlt: "Surface de stockage rénovée chez Straßenbau Dieckmann à Versmold",
  },
  "lkw-ausfahrt-wueseke-baustoffwerke-gmbh": {
    titel: "Sortie des camions, Wüseke Baustoffwerke GmbH",
    untertitel: "Réparation rapide d'une sortie de camions fortement sollicitée avec un temps d'arrêt minimal",
    land: "Allemagne",
    herausforderungen: [
      "Sortie des camions fortement sollicitée à l'usine KS",
      "Grande résistance à la circulation des véhicules lourds",
      "Temps d'arrêt minimal requis",
    ],
    loesung:
      "En mai 2022, nous avons réparé la sortie des camions de l'usine KS Wüseke avec ASPHALT REPAIR MIX. Deux palettes ont été mises en œuvre par l'entreprise de génie civil Knappheide de Glandorf. Grâce à la prise rapide, la sortie a pu être rapidement remise en service.",
    vorteile: [
      "Prise rapide, temps d'arrêt minimal",
      "Grande capacité de charge sous le trafic lourd",
      "Application facile, entretien durable",
    ],
    bildAlt: "Sortie des camions réparée à l'usine Wüseke à Sassenberg",
  },
  "sanierung-der-fugen-wurstttaegerbrunnen-versmold": {
    titel: "Rénovation des joints de la fontaine Wurstträgerbrunnen, Versmold",
    untertitel: "Jointoiement respectueux du patrimoine de l'emblème de Versmold avec Rapid Set MORTAR MIX",
    land: "Allemagne",
    herausforderungen: [
      "Rénovation respectueuse du patrimoine de l'emblème de Versmold",
      "Jointoiement des surfaces pavées autour de la fontaine",
      "Préservation de l'esthétique et de l'intégrité structurelle",
    ],
    loesung:
      "Bau-Team GmbH a rénové les joints de la Wurstträgerbrunnen avec Rapid Set MORTAR MIX. Le matériau convient parfaitement au jointoiement de surfaces pavées, avec une excellente adhérence et une grande durabilité.",
    vorteile: [
      "Excellente adhérence et grande durabilité",
      "Prise rapide, réparation respectueuse du patrimoine",
      "Esthétique restaurée et longévité",
    ],
    bildAlt: "Joints rénovés de la fontaine Wurstträgerbrunnen à Versmold",
  },
  "treppensanierung-check-up-6-jahre-spater": {
    titel: "Rénovation d'escalier Esslingen, contrôle après 6 ans",
    untertitel: "Contrôle à long terme : six ans après la réparation Rapid Set, comme au premier jour",
    land: "Allemagne",
    herausforderungen: [
      "Escaliers, voies de circulation soumises à de fortes contraintes dynamiques",
      "Contraintes abrasives dues à la saleté et aux gravillons à l'extérieur",
      "Plus grandes charges mécaniques sur le nez de marche",
      "Effets du gel et du sel de déneigement en hiver",
    ],
    loesung:
      "En 2015, nous avons réparé un escalier en béton endommagé à Esslingen avec les mortiers de réparation polyvalents à prise rapide Rapid Set CEMENT ALL et MORTAR MIX. Le contrôle six ans plus tard le montre : l'escalier a toujours le même aspect qu'au premier jour de sa réparation.",
    vorteile: [
      "Toujours comme neuf même après six ans",
      "Résistant aux charges dynamiques, au gel et au sel de déneigement",
      "Durable : le ciment Rapid Set génère environ 30 pour cent d'émissions de CO₂ en moins que le ciment Portland",
    ],
    bildAlt: "Escalier en béton à Esslingen, contrôle six ans après la réparation avec Rapid Set",
  },
  "verfugung-von-natursteinplatten": {
    titel: "Jointoiement de dalles en pierre naturelle à l'hôtel Das Weitblick Allgäu",
    untertitel: "Dalles de terrasse en pierre naturelle jointoyées avec NEODUR PFM-EP",
    land: "Allemagne",
    herausforderungen: [
      "Jointoiement professionnel des dalles en béton et en pierre naturelle de la terrasse",
      "Joints durables et résistants aux intempéries à l'extérieur",
      "Aspect de haute qualité assorti à l'hôtel 4 étoiles",
    ],
    loesung:
      "La terrasse de l'hôtel de bien-être et de conférence Das Weitblick a été revêtue de dalles en béton et en pierre naturelle (Lucerna Gneis Piemont, Travertin) et jointoyée avec le mortier de pavage KORODUR NEODUR PFM-EP. La pose et le jointoiement ont été réalisés par une entreprise régionale spécialisée, livrés d'une seule source via la société Rössle.",
    vorteile: [
      "Jointoiement durable et résistant aux intempéries",
      "Aspect de haute qualité pour la surface de la terrasse",
      "Livraison d'une seule source via le partenaire Rössle",
    ],
    bildAlt: "Terrasse en pierre naturelle jointoyée avec NEODUR PFM-EP à l'hôtel Das Weitblick à Marktoberdorf",
  },
};

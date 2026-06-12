/** French translations for product data */
export const produkteFR: Record<string, {
  kurzbeschreibung?: string;
  beschreibung?: string;
  besonderheiten?: string[];
  technischeDaten?: { label: string; wert: string }[];
  varianten?: { name: string; qualitaetsklasse?: string; hinweis?: string }[];
}> = {
  "neodur-he-60-rapid": {
    kurzbeschreibung: "Chape rapide haute performance à granulats durs",
    besonderheiten: ["Haute résistance à l'abrasion", "Résistant aux produits chimiques", "Prise rapide", "Faible retrait"],
    technischeDaten: [
      { label: "Résistance à la compression", wert: "≥ 60 N/mm²" },
      { label: "Résistance à la flexion", wert: "≥ 8 N/mm²" },
      { label: "Résistance à l'abrasion", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Praticable après", wert: "env. 4–6 h" },
      { label: "Charge complète après", wert: "env. 24 h" },
    ],
    varianten: [
      { name: "NEODUR HE 60 rapid SVS 3", qualitaetsklasse: "CT-C60-F8-A3" },
      { name: "NEODUR HE 60 rapid SVS 1,5", qualitaetsklasse: "CT-C60-F8-A1,5" },
      { name: "NEODUR HE 60 rapid metallisch", qualitaetsklasse: "CT-C60-F8-A3", hinweis: "Groupe d'agrégats durs M" },
    ],
  },
  "neodur-he-65": {
    kurzbeschreibung: "Chape haute performance à granulats durs",
    besonderheiten: ["Résistance à l'usure maximale", "Application par système silo", "Économique sur grandes surfaces", "Liaison solide"],
    technischeDaten: [
      { label: "Résistance à la compression", wert: "≥ 70 N/mm²" },
      { label: "Résistance à la flexion", wert: "≥ 9 N/mm²" },
      { label: "Résistance à l'abrasion", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Application", wert: "Système silo / pompage" },
      { label: "Charge complète après", wert: "env. 3 jours" },
    ],
    varianten: [
      { name: "NEODUR HE 65 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 65 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Groupe d'agrégats durs KS" },
      { name: "NEODUR HE 65 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 65 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Groupe d'agrégats durs M" },
    ],
  },
  "neodur-he-65-plus": {
    kurzbeschreibung: "Chape haute performance à granulats durs",
    besonderheiten: ["Sans pont d'adhérence", "Résistant au gel et aux sels de déverglaçage", "Conforme WHG", "Modifié polymère & renforcé de fibres"],
    technischeDaten: [
      { label: "Résistance à la compression", wert: "≥ 70 N/mm²" },
      { label: "Résistance à la flexion", wert: "≥ 9 N/mm²" },
      { label: "Résistance à l'abrasion", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Résistant gel/sel", wert: "Oui" },
      { label: "Pont d'adhérence requis", wert: "Non" },
    ],
    varianten: [
      { name: "NEODUR HE 65 plus SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
    ],
  },
  "neodur-he-40": {
    kurzbeschreibung: "Chape haute performance à granulats durs",
    besonderheiten: ["Haute résistance à l'usure", "Liaison solide (DIN 18560-7)", "Solution économique à granulats durs", "Usage intérieur"],
    technischeDaten: [
      { label: "Résistance à la compression", wert: "≥ 40 N/mm²" },
      { label: "Résistance à la flexion", wert: "≥ 6 N/mm²" },
      { label: "Résistance à l'abrasion", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Charge complète après", wert: "env. 3 jours" },
    ],
    varianten: [
      { name: "NEODUR HE 40/8", qualitaetsklasse: "CT-C40-F7-A6" },
    ],
  },
  "neodur-level": {
    kurzbeschreibung: "Chape mince autoplaçante à prise rapide",
    besonderheiten: ["Autoplaçant – excellente planéité", "Utilisation rapide", "Couche d'usure intégrée", "Application mécanisée"],
    technischeDaten: [
      { label: "Résistance à la compression", wert: "≥ 40 N/mm²" },
      { label: "Résistance à la flexion", wert: "≥ 10 N/mm²" },
      { label: "Autoplaçant", wert: "Oui" },
      { label: "Planéité", wert: "DIN 18202, Ligne 3" },
      { label: "Charge légère après", wert: "env. 24 h" },
      { label: "Charge complète après", wert: "env. 3 jours" },
    ],
  },
  "tru-self-leveling": {
    kurzbeschreibung: "Chape apparente décorative autoplaçante et polie",
    beschreibung: "Rapid Set TRU Self-Leveling est une chape décorative minérale, autoplaçante et polie, basée sur une technologie de ciment spéciale. Idéale lorsque résistance initiale, durabilité et durcissement à faible retrait sont exigés : travaillable jusqu'à 20 minutes, praticable après 2 à 3 heures et ponçable jusqu'au haut brillant dès 24 heures après la mise en œuvre. Personnalisable en différentes variantes de couleurs et avec granulats décoratifs saupoudrés (p. ex. verre, marbre).",
    besonderheiten: ["Aspect béton design", "Surface sans joints", "Sans pont d'adhérence", "Polissable jusqu'au haut brillant", "Hygiénique & facile d'entretien"],
    technischeDaten: [
      { label: "Résistance à la compression", wert: "≥ 40 N/mm²" },
      { label: "Résistance à la flexion", wert: "≥ 10 N/mm²" },
      { label: "Aspect", wert: "Surface de chape apparente type béton" },
      { label: "Application", wert: "Autoplaçant" },
      { label: "Pont d'adhérence", wert: "Non requis" },
      { label: "Praticable après", wert: "env. 2–3 h" },
      { label: "Charge complète après", wert: "env. 24 h" },
    ],
  },
  "korodur-hb-5-rapid": {
    kurzbeschreibung: "Pont d'adhérence à prise rapide pour liaison solide au support",
    besonderheiten: ["Prise rapide", "Haute résistance à l'arrachement", "Application frais sur frais"],
    technischeDaten: [
      { label: "Résistance à l'arrachement", wert: "≥ 1,5 N/mm²" },
      { label: "Temps de travail", wert: "env. 15 min" },
      { label: "Recouvrable après", wert: "frais sur frais" },
    ],
  },
  "korodur-pc": {
    kurzbeschreibung: "Primaire de dispersion à base de résine synthétique pour systèmes de chape mince",
    besonderheiten: ["Spécifique pour systèmes de chape mince", "Modifié polymère"],
    technischeDaten: [
      { label: "Résistance à l'arrachement", wert: "≥ 1,0 N/mm²" },
      { label: "Application", wert: "Pour NEODUR Level" },
      { label: "Consommation", wert: "50–200 g/m²" },
    ],
  },
  "rapid-set-cement-all": {
    kurzbeschreibung: "Mortier de réparation rapide universel",
    beschreibung: "Rapid Set CEMENT ALL est un mortier de réparation rapide minéral et multifonctionnel, basé sur une technologie de ciment spéciale, composé de ciment Rapid Set haute performance et de sable fin. Il durcit rapidement, est durable et neutre en retrait ; début de prise après env. 15 minutes, mise en charge possible en env. 1 heure. À mélanger uniquement avec de l'eau, résistance structurelle en une heure. Visuellement comparable aux matériaux à base de ciment Portland et applicable de manière similaire.",
    besonderheiten: ["Temps de prise ultra-court", "Haute résistance initiale", "Usage intérieur et extérieur", "Compensé en retrait"],
    technischeDaten: [
      { label: "Qualité", wert: "C55/67" },
      { label: "Résistance à la compression (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Résistance à la compression (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Praticable après", wert: "env. 15 min" },
      { label: "Charge complète après", wert: "env. 1 h" },
    ],
    varianten: [
      { name: "Rapid Set CEMENT ALL Plus", qualitaetsklasse: "C55/67" },
    ],
  },
  "rapid-set-mortar-mix": {
    kurzbeschreibung: "Mortier de réparation rapide universel",
    beschreibung: "Rapid Set MORTAR MIX est un mélange de ciment Rapid Set haute performance et de sable de quartz à granulométrie étagée. À durcissement rapide, durable et neutre en retrait ; applicable à l'horizontale, à la verticale et au plafond. À mélanger uniquement avec de l'eau, résistance structurelle en une heure. Utilisable à l'intérieur et à l'extérieur, également en zones humides.",
    besonderheiten: ["Neutre en retrait", "Sans pont d'adhérence", "Consistance pâteuse à rigide ajustable", "Mélanger avec de l'eau uniquement"],
    technischeDaten: [
      { label: "Qualité", wert: "C45/55" },
      { label: "Résistance à la compression (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Résistance à la compression (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Consistance", wert: "pâteuse à plastique" },
      { label: "Charge complète après", wert: "env. 1 h" },
    ],
  },
  "rapid-set-mortar-mix-dur": {
    kurzbeschreibung: "Mortier de réparation rapide avec granulat dur DIN 1100 A",
    besonderheiten: ["Granulat d'usure intégré DIN 1100 A", "Adapté aux joints à charges lourdes", "Neutre en retrait", "Consistance pâteuse ajustable"],
    technischeDaten: [
      { label: "Qualité", wert: "C45/55 + DIN 1100 A" },
      { label: "Résistance à la compression (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Résistance à la compression (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Consistance", wert: "pâteuse à plastique" },
      { label: "Charge complète après", wert: "env. 1 h" },
    ],
  },
  "asphalt-repair-mix": {
    kurzbeschreibung: "Matériau de réparation rapide pour surfaces en asphalte",
    beschreibung: "Rapid Set ASPHALT REPAIR MIX est un matériau de réparation à base de ciment, modifié polymère : haute résistance, faibles contraintes et durcissement rapide. Il allie la rapidité de l'enrobé à froid à la durabilité de l'asphalte à chaud : ouvrir le sac, ajouter de l'eau, mélanger, mettre en œuvre. Sans fraiseuse, sans rouleau, sans pont d'adhérence ; chargeable après env. 30 minutes, en pleine charge après env. 1 heure, même sous trafic lourd.",
    besonderheiten: ["Adapté aux surfaces en asphalte", "Sans pont d'adhérence", "Application facile", "Ouverture au trafic après 30 minutes", "Résistant au gel, aux sels de déverglaçage et aux sulfates", "Pompable, utilisable à l'horizontale et à la verticale", "Env. 30 % de CO₂ en moins que le ciment Portland traditionnel", "Disponible auprès du négoce de matériaux"],
    technischeDaten: [
      { label: "Résistance à la compression (30 min)", wert: "env. 15 N/mm²" },
      { label: "Résistance à la compression (1 h)", wert: "env. 22 N/mm²" },
      { label: "Résistance à la compression (28 j)", wert: "env. 38 N/mm²" },
      { label: "Épaisseur de couche", wert: "30–600 mm" },
      { label: "Ouverture au trafic après", wert: "env. 30 min" },
      { label: "Pont d'adhérence", wert: "Non requis" },
      { label: "Résistance à la flexion (28 j)", wert: "env. 6,4 N/mm²" },
      { label: "Module d'élasticité", wert: "env. 22.000 N/mm²" },
      { label: "Granulométrie", wert: "0–8 mm" },
      { label: "Couleur", wert: "noir" },
      { label: "Ajout d'eau", wert: "env. 3,80 l par sac de 25 kg" },
      { label: "Consommation de matériau", wert: "env. 20 kg/m² par cm d'épaisseur" },
      { label: "Température de mise en œuvre", wert: "+5 °C à +30 °C" },
    ],
  },
  "dot-europe-concrete-mix": {
    kurzbeschreibung: "Béton de réparation rapide universel, DIN EN 1504-3",
    beschreibung: "DOT Europe CONCRETE MIX est un béton rapide performant, modifié polymère, à prise rapide et renforcé de fibres, pour l'intérieur et l'extérieur. Conformément à la DIN EN 1504-3, il convient aux réparations à caractère structurel comme non structurel, idéal lorsque résistances rapides, durabilité et durcissement à faible retrait sont exigés. Applicable en épaisseurs de 50–600 mm, chargeable dès 1 heure ; utilisable également en zones humides.",
    besonderheiten: ["Utilisation multifonctionnelle", "Résistant au gel et aux sels", "Résistant aux sulfates, sans chlorures", "Excellente adhérence sans pont", "Pour ponts, pistes, sols industriels", "30 % CO₂ en moins que le ciment Portland"],
    technischeDaten: [
      { label: "Qualité", wert: "C35/45" },
      { label: "Granulométrie", wert: "0–8 mm" },
      { label: "Résistance à la compression (60 min)", wert: "> 19 N/mm²" },
      { label: "Résistance à la compression (28 j)", wert: "> 41 N/mm²" },
      { label: "Résistance à la flexion (28 j)", wert: "> 7 N/mm²" },
      { label: "Charge complète après", wert: "env. 1 h" },
      { label: "Résistant gel/sel", wert: "Oui" },
      { label: "Résistant aux sulfates", wert: "Oui" },
    ],
  },
  "korocrete": {
    kurzbeschreibung: "Béton rapide à mélange volumétrique (base FSCem)",
    besonderheiten: ["Mélange volumétrique sur site (Cemen Tech M-Series)", "Volume stable, sans retrait/contrainte, durcit sans fissures", "Étanche, adapté aux zones humides", "Pompable", "Application grande surface", "Pas de béton résiduel"],
    technischeDaten: [
      { label: "Liant", wert: "KORODUR FSCem (ternaire)" },
      { label: "Qualité", wert: "C35/45 – C50/60" },
      { label: "Résistance à la compression (6 h)", wert: "env. 18 N/mm²" },
      { label: "Résistance à la compression (8 h)", wert: "env. 25 N/mm²" },
      { label: "Résistance à la compression (16 h)", wert: "env. 35 N/mm²" },
      { label: "Résistance à la compression (28 j)", wert: "env. 65 N/mm²" },
      { label: "Ouverture au trafic après", wert: "env. 6 h (≥ 20 MPa)" },
      { label: "Mélange", wert: "volumétrique sur site" },
    ],
  },
  "rapid-set-schnellbeton": {
    kurzbeschreibung: "Béton rapide à mélange volumétrique (Rapid Set), TL BEB-StB",
    besonderheiten: ["Mélange volumétrique sur site", "TL BEB-StB (classe de trafic maximale pour travaux de maintenance)", "Ouverture au trafic après 2 heures", "Résistant gel/sel", "Application grande surface", "Pas de béton résiduel"],
    technischeDaten: [
      { label: "Liant", wert: "Rapid Set (ciment sulfo-aluminate de calcium)" },
      { label: "Qualité", wert: "C40/50" },
      { label: "Résistance à la compression (60 min)", wert: "> 19 N/mm²" },
      { label: "Résistance à la compression (28 j)", wert: "> 41 N/mm²" },
      { label: "Ouverture au trafic après", wert: "env. 2 h" },
      { label: "Mélange", wert: "volumétrique sur site" },
    ],
  },
  "korocure": {
    kurzbeschreibung: "Produit de cure pour le traitement contrôlé des surfaces de chape",
    beschreibung: "Pour protéger le béton jeune, des mesures de cure intermédiaire sont requises selon la DIN EN 13670 en liaison avec la DIN 1045-3 : la cure intermédiaire protège l'eau contenue dans le béton contre l'évaporation afin que le ciment puisse s'hydrater complètement. En cas d'utilisation comme primaire pour des revêtements à agrégats durs ultérieurs, KOROCURE est appliqué dès que le béton est praticable.",
    besonderheiten: ["Cure contrôlée", "Adapté aux surfaces extérieures", "Réduit les fissures de retrait"],
    technischeDaten: [
      { label: "Effet", wert: "Rétention d'humidité / cure" },
      { label: "Application", wert: "Pulvérisation ou rouleau" },
    ],
  },
  "koromineral-cure": {
    kurzbeschreibung: "Protection de surface par traitement au silicate",
    besonderheiten: ["Augmente la dureté de surface", "Réduit la formation de poussière", "Améliore la résistance chimique"],
    technischeDaten: [
      { label: "Effet", wert: "Traitement au silicate / imprégnation" },
      { label: "Application", wert: "Sur chape fraîche" },
    ],
  },
  "korotex": {
    kurzbeschreibung: "Agent de cure pour durcissement contrôlé",
    beschreibung: "Conformément aux normes DIN 18353 (travaux de chape) et DIN 18560 (chapes dans la construction), les chapes doivent être protégées contre un séchage irrégulier et trop rapide. La cure KOROTEX est particulièrement importante en cas de températures élevées, de faible humidité de l'air et de forts courants d'air ; la pulvérisation est la méthode la plus rationnelle sur les surfaces de chape fraîchement posées.",
    besonderheiten: ["Cure contrôlée", "Réduit les fissures de retrait", "Application par pulvérisation"],
    technischeDaten: [
      { label: "Effet", wert: "Rétention d'humidité / cure" },
      { label: "Application", wert: "Pulvérisation" },
    ],
  },
  "neodur-he-3": {
    kurzbeschreibung: "Matériau sec à liant ciment pour sols industriels par procédé de saupoudrage",
    beschreibung: "NEODUR HE 3 selon DIN 18557 (mortier d'usine) et DIN EN 13813, à base d'agrégats durs selon DIN 1100 : matériau sec à liant ciment prêt à l'emploi pour la réalisation de sols industriels par procédé de saupoudrage. Également disponible en version colorée.",
    besonderheiten: ["Procédé de saupoudrage (à sec sur surfaces de chape/béton fraîches)", "Également disponible en version colorée", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Groupe d'agrégats durs (DIN 1100)", wert: "A" },
      { label: "Usure par abrasion", wert: "≤ 5 cm³/50 cm²" },
    ],
    varianten: [
      { name: "NEODUR HE 3 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 3 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Groupe d'agrégats durs KS" },
      { name: "NEODUR HE 3 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 3 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Groupe d'agrégats durs M" },
    ],
  },
  "neodur-he-3-green": {
    kurzbeschreibung: "Variante de NEODUR HE 3 préservant les ressources, avec jusqu'à 30 % d'émissions de CO₂ en moins",
    beschreibung: "Avec la variante NEODUR HE 3 green, préservant les ressources, les émissions de CO₂ liées à la fabrication peuvent être réduites de jusqu'à 30 pour cent. Des déclarations environnementales produit (EPD) correspondantes sont disponibles pour les maîtres d'ouvrage, architectes, bureaux d'études et entreprises de construction.",
    besonderheiten: ["Jusqu'à 30 % de réduction de CO₂ à la fabrication", "EPD produit disponible", "Procédé de saupoudrage"],
    technischeDaten: [
      { label: "Groupe d'agrégats durs (DIN 1100)", wert: "A" },
      { label: "Usure par abrasion", wert: "≤ 5 cm³/50 cm²" },
      { label: "Réduction de CO₂", wert: "jusqu'à 30 %" },
    ],
  },
  "neodur-he-2": {
    kurzbeschreibung: "Matériau sec à liant ciment pour sols industriels par procédé de saupoudrage",
    beschreibung: "NEODUR HE 2 selon DIN 18557 (mortier d'usine) et DIN EN 13813 : matériau sec à liant ciment prêt à l'emploi pour la réalisation de sols industriels par procédé de saupoudrage. Également disponible en version colorée.",
    besonderheiten: ["Procédé de saupoudrage", "Également disponible en version colorée"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–3 mm" },
      { label: "Résistance à la compression", wert: "70 N/mm²" },
      { label: "Résistance à la flexion", wert: "9 N/mm²" },
      { label: "Usure par abrasion", wert: "≤ 8 cm³/50 cm²" },
    ],
  },
  "korodur-0-4": {
    kurzbeschreibung: "Agrégat dur KORODUR (sans liant) du groupe A selon DIN 1100",
    beschreibung: "Agrégat dur pour la réalisation de sols industriels fortement sollicités, p. ex. parkings, halls industriels, halls de montage, hangars d'avions, ateliers et entrepôts à rayonnages en hauteur. Pour l'intérieur et l'extérieur.",
    besonderheiten: ["Agrégat dur sans liant"],
    technischeDaten: [
      { label: "Groupe d'agrégats durs (DIN 1100)", wert: "A" },
      { label: "Usure par abrasion", wert: "≤ 5 cm³/50 cm²" },
    ],
  },
  "korodur-vs-0-5": {
    kurzbeschreibung: "Agrégat dur KORODUR (sans liant) du groupe A selon DIN 1100, base entre autres de NEODUR HE 65",
    beschreibung: "Agrégat dur KORODUR sans liant selon DIN 1100. Sert de base d'agrégats durs pour NEODUR HE 65 et d'ajout d'agrégats durs pour chapes d'usure résistantes, p. ex. avec KORODUR FSCem.",
    besonderheiten: ["Agrégat dur sans liant", "Base d'agrégats durs pour NEODUR HE 65"],
    technischeDaten: [
      { label: "Groupe d'agrégats durs (DIN 1100)", wert: "A" },
      { label: "Usure par abrasion", wert: "≤ 5 cm³/50 cm²" },
    ],
  },
  "korodur-wh-spezial": {
    kurzbeschreibung: "Agrégat dur KORODUR (sans liant) du groupe A selon DIN 1100 pour sols industriels fortement sollicités",
    beschreibung: "Agrégat dur pour la réalisation de sols industriels fortement sollicités. Base d'agrégats durs pour NEODUR HE 65 SVS 3 et NEODUR HE 65 plus SVS 3. Pour l'intérieur et l'extérieur.",
    besonderheiten: ["Agrégat dur sans liant"],
    technischeDaten: [
      { label: "Groupe d'agrégats durs (DIN 1100)", wert: "A" },
      { label: "Usure par abrasion", wert: "≤ 3 cm³/50 cm²" },
    ],
  },
  "korodur-wh-metallisch": {
    kurzbeschreibung: "Agrégat dur métallique KORODUR (groupe M selon DIN 1100) pour chapes blindées et trafic intense de roues en acier",
    beschreibung: "Agrégat dur métallique pour sols industriels fortement sollicités, particulièrement adapté au trafic intense de roues en acier, aux meules et à la dépose brutale de pièces à arêtes vives, pour la réalisation de chapes dites blindées. Base de NEODUR HE 3 metallisch et NEODUR HE 65 metallisch. Pour l'intérieur et l'extérieur.",
    besonderheiten: ["Agrégat dur métallique", "Pour chapes dites blindées"],
    technischeDaten: [
      { label: "Groupe d'agrégats durs (DIN 1100)", wert: "M" },
      { label: "Usure par abrasion", wert: "≤ 3 cm³/50 cm²" },
    ],
  },
  "korodur-diamantbeton": {
    kurzbeschreibung: "Agrégat dur KORODUR du groupe KS selon DIN 1100 pour la résistance à l'usure la plus élevée possible",
    beschreibung: "Agrégat dur pour la réalisation de sols industriels fortement sollicités avec la résistance à l'usure la plus élevée possible. Base d'agrégats durs pour NEODUR HE 65 SVS 1,5. Pour l'intérieur et l'extérieur.",
    besonderheiten: ["Résistance à l'usure la plus élevée possible (groupe KS)"],
    technischeDaten: [
      { label: "Groupe d'agrégats durs (DIN 1100)", wert: "KS" },
      { label: "Usure par abrasion", wert: "≤ 1,5 cm³/50 cm²" },
    ],
  },
  "korodur-fscem": {
    kurzbeschreibung: "Liant de chape rapide cimentaire, à volume stable et faible retrait, à base ternaire",
    beschreibung: "KORODUR FSCem est un liant de chape rapide cimentaire, à volume stable et faible retrait, à base ternaire, pour la réalisation de chapes hautement résistantes, rapidement utilisables et prêtes à recevoir un revêtement selon DIN 18560 et EN 13813. Pour chapes ciment rapidement recouvrables, adhérentes, sur couche de désolidarisation, sur couche isolante et comme chape chauffante, à l'intérieur et à l'extérieur. Convient également à la réparation et à la rénovation d'anciens sols en béton.",
    besonderheiten: ["Liant ternaire (sable pour chape fourni par le chantier)", "Rapidement recouvrable", "Chapes d'usure résistantes réalisables avec l'ajout d'agrégats durs KORODUR VS 0/5"],
    technischeDaten: [
      { label: "Rapport de mélange (CT-C50-F7)", wert: "1:4 parties en poids (75 kg FSCem : 300 kg de sable pour chape A8–B8), E/C env. 0,42" },
      { label: "Rapport de mélange (CT-C40-F6)", wert: "1:5 parties en poids (60 kg FSCem : 300 kg de sable pour chape A8–B8), E/C env. 0,40" },
      { label: "Humidité résiduelle (mesure CM)", wert: "env. 5,9 % après 24 h, env. 1,9 % après 3 jours, env. 1,3 % après 28 jours" },
      { label: "Classe de retrait (DIN 18560-1)", wert: "SW 1, faible retrait (< 0,2 mm/m)" },
    ],
  },
  "korodur-fscem-screed": {
    kurzbeschreibung: "Mortier sec de chape rapide à volume stable et faible retrait, recouvrable après 3 jours",
    beschreibung: "KORODUR FSCem Screed est un mortier sec de chape rapide à volume stable et faible retrait, à base ternaire, pour la réalisation de chapes rapidement prêtes à recevoir un revêtement, pour des épaisseurs jusqu'à 120 mm selon DIN 18560 et DIN EN 13813. Recouvrable dès 3 jours, doit impérativement être recouvert. Convient également à la réparation et à la rénovation d'anciens sols en béton.",
    besonderheiten: ["Mortier sec prêt à l'emploi", "Doit impérativement être recouvert", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–6 mm" },
      { label: "Résistance à la compression (DIN EN 13892-2)", wert: "env. 20 N/mm² après 1 jour, env. 40 N/mm² après 28 jours" },
      { label: "Résistance à la flexion (DIN EN 13892-2)", wert: "env. 4 N/mm² après 1 jour, env. 6 N/mm² après 28 jours" },
      { label: "Classe de retrait (DIN 18560-1)", wert: "SW 1, faible retrait (< 0,2 mm/m)" },
      { label: "Recouvrable", wert: "après 3 jours" },
    ],
  },
  "neodur-level-au": {
    kurzbeschreibung: "Ragréage de sol à durcissement rapide, modifié polymère, pour 5 à 50 mm",
    beschreibung: "NEODUR Level AU est un ragréage de sol à liant ciment, minéral, à durcissement rapide, modifié polymère, en couche mince pour des épaisseurs de 5 à 50 mm. Adhérent sur support cimentaire, support idéal pour linoléum, revêtements textiles et PVC, stratifié, céramique et pierre naturelle.",
    besonderheiten: ["Couche d'égalisation sous NEODUR Level", "Primaire avec KORODUR PC"],
    technischeDaten: [
      { label: "Temps de travail", wert: "env. 30 minutes à +20 °C" },
      { label: "Praticable", wert: "après env. 3–4 heures" },
      { label: "Résistance à la compression", wert: "≥ 33 N/mm² après 28 jours" },
      { label: "Consommation", wert: "env. 1,7 kg/mm/m²" },
    ],
  },
  "rapid-set-levelflor": {
    kurzbeschreibung: "Ragréage autoplaçant à durcissement rapide sur technologie de ciment Rapid Set, pour l'intérieur et l'extérieur",
    beschreibung: "Rapid Set LevelFlor est un ragréage autoplaçant basé sur une technologie de ciment spéciale, pour l'intérieur et l'extérieur dans le résidentiel et l'industrie. Une couche de finition peut être appliquée après 6 à 16 heures (à +20 °C). Convient au neuf comme à la rénovation, doit impérativement être recouvert.",
    besonderheiten: ["Technologie de ciment Rapid Set", "Autoplaçant", "Doit impérativement être recouvert"],
    technischeDaten: [
      { label: "Temps de travail", wert: "30 min" },
      { label: "Temps d'écoulement", wert: "15 min" },
      { label: "Résistance à la compression (ASTM C-109 mod.)", wert: "env. 20 N/mm² après 25 h, env. 24 N/mm² après 7 jours, env. 34 N/mm² après 28 jours" },
      { label: "Résistance à la flexion (ASTM C-348)", wert: "env. 7,9 N/mm² après 7 jours" },
      { label: "Couche de finition applicable", wert: "après 6–16 heures (à +20 °C)" },
    ],
  },
  "korodur-hb-5": {
    kurzbeschreibung: "Pont d'adhérence à liant ciment pour la liaison solide de chapes à agrégats durs sur béton durci",
    beschreibung: "KORODUR HB 5 est un pont d'adhérence à liant ciment prêt à l'emploi pour la liaison solide de chapes à agrégats durs KORODUR et de chapes à liant ciment de toutes classes de qualité sur béton durci. Particulièrement éprouvé dans le système de sol industriel KORODUR-KOROTAN, insensible à l'humidité du support.",
    besonderheiten: ["Insensible à l'humidité du support", "Pour pose fraîche ou différée"],
    technischeDaten: [
      { label: "Consommation", wert: "env. 2 kg/m²" },
    ],
  },
  "korodur-txpk": {
    kurzbeschreibung: "Primaire spécial époxy bicomposant pour revêtements autoplaçants",
    beschreibung: "Primaire spécial à base de résine époxy, bicomposant, pour revêtements autoplaçants tels que TRU Self-Leveling, LevelFlor et NEODUR Level, ainsi que pour le primaire de surfaces en béton et en chape exposées à une humidité ultérieure par la face arrière.",
    besonderheiten: ["Bicomposant", "Convient en cas d'humidité par la face arrière"],
    technischeDaten: [
      { label: "Consommation", wert: "env. 400–500 g/m² selon la rugosité du support" },
    ],
  },
  "korodur-durop": {
    kurzbeschreibung: "Agrégat dur synthétique comme matériau de remplissage et de saupoudrage pour revêtements et chapes en résine synthétique",
    beschreibung: "Les agrégats durs synthétiques du système de produits KORODUR DUROP sont principalement utilisés comme matériau de remplissage et de saupoudrage pour revêtements et chapes en résine synthétique. DUROP améliore l'adhérence et réduit les bruits de roulement ; dans la construction routière, plus de 1,5 million de m² de tronçons d'autoroute ont déjà été réalisés en revêtement mince à liant résine avec DUROP.",
    besonderheiten: ["Résistant à l'usure, antidérapant, résistant au polissage"],
    technischeDaten: [
      { label: "Dureté Mohs", wert: "8" },
    ],
    varianten: [
      { name: "DUROP 0,5/1", hinweis: "Granulométrie 0,5–1 mm" },
      { name: "DUROP 1/2", hinweis: "Granulométrie 1–2 mm" },
      { name: "DUROP 2/3", hinweis: "Granulométrie 2–3 mm" },
      { name: "DUROP 2/5", hinweis: "Granulométrie 2–5 mm" },
    ],
  },
  "korodur-robust": {
    kurzbeschreibung: "Agrégat dur synthétique (granulométrie 0–3 mm) comme matériau de remplissage et de saupoudrage pour systèmes en résine synthétique",
    beschreibung: "Avec les systèmes de produits KORODUR DUROP et KORODUR Robust, des matériaux de remplissage et de saupoudrage adaptés sont disponibles pour les revêtements et chapes en résine synthétique de haute qualité.",
    technischeDaten: [
      { label: "Granulométrie", wert: "0–3 mm" },
      { label: "Dureté Mohs", wert: "7" },
    ],
  },
  "korodur-silosystem": {
    kurzbeschreibung: "Silo de chantier avec technique de malaxage et de pompage pour la pose économique de couches d'agrégats durs",
    beschreibung: "Le KORODUR Silosystem permet la pose économique de couches d'agrégats durs KORODUR grâce à une technique de travail rationnelle : produit en silo (p. ex. NEODUR HE 65), technique de malaxage et de pompage fixée au silo et assistance technique machines. Pas d'installation d'aires de malaxage, pas d'élimination d'emballages, qualité de mortier constante.",
    besonderheiten: ["Qualités applicables : NEODUR HE 65, HE 65 SVS 3, HE 65 SVS 1,5, HE 40", "Qualité de mortier constante, importante pour les exécutions colorées"],
    technischeDaten: [
      { label: "Unité silo", wert: "22,5 m³" },
      { label: "Débit de pompage", wert: "env. 100 l/min (env. 600 m² en env. 1 heure)" },
      { label: "Rendement journalier", wert: "env. 1.000–2.000 m² (la source indique aussi 1.000–1.500 m²)" },
      { label: "Distance de refoulement", wert: "jusqu'à 80 m" },
    ],
  },
  "korotan": {
    kurzbeschreibung: "Additif spécial liquide à effet fluidifiant et stabilisant pour sols industriels KORODUR-KOROTAN",
    beschreibung: "KOROTAN est utilisé comme aide à la mise en œuvre : pour chapes à agrégats durs KORODUR monocouches sur béton porteur frais ou durci, pour tous les systèmes bicouches ainsi que comme adjuvant pour chapes de tous types.",
    besonderheiten: ["Effet fluidifiant et stabilisant", "Spécialement pour sols industriels KORODUR-KOROTAN", "Comme adjuvant pour chapes de tous types"],
    technischeDaten: [
      { label: "Forme", wert: "liquide vert" },
      { label: "Densité (20 °C)", wert: "1,13 g/cm³" },
      { label: "Valeur pH", wert: "env. 9" },
      { label: "Dosage", wert: "jusqu'à env. 1–2 % du poids de ciment" },
    ],
  },
  "korodur-easyfinish": {
    kurzbeschreibung: "Aide au lissage liquide, sans solvant, prête à l'emploi pour NEODUR HE 60 rapid et KOROCRETE",
    beschreibung: "KORODUR easyFinish est pulvérisé et incorporé sur la surface NEODUR HE 60 rapid ou KOROCRETE talochée, avant le premier lissage à la truelle mécanique. Le lissage est facilité, la surface est en outre améliorée, l'étanchéité augmentée et la protection contre les attaques chimiques renforcée.",
    besonderheiten: ["Sans solvant et prêt à l'emploi", "Facilite le lissage", "Augmente l'étanchéité et la protection contre les attaques chimiques"],
    technischeDaten: [
      { label: "Forme", wert: "liquide" },
      { label: "Couleur", wert: "bleuté" },
    ],
  },
  "korodur-nanofinish": {
    kurzbeschreibung: "Nano-silice liquide prête à l'emploi pour l'amélioration des sols industriels KORODUR",
    beschreibung: "KORODUR nanoFinish ralentit la perte d'humidité et prolonge le temps de travail : le traitement de surface lors du lissage est facilité, même par conditions chaudes, sèches et venteuses. La technologie nano-silice retient l'humidité pendant le traitement de surface et permet ainsi une hydratation complète avec un développement de résistance maximal ; les efflorescences et la fissuration par retrait précoce sont réduites.",
    besonderheiten: ["Technologie nano-silice", "Prolonge le temps de travail lors du lissage", "Réduit les efflorescences et les fissures de retrait précoce"],
    technischeDaten: [
      { label: "Forme", wert: "liquide" },
      { label: "Couleur", wert: "laiteux trouble" },
      { label: "Valeur pH", wert: "5" },
    ],
  },
  "korodur-uniprimer": {
    kurzbeschreibung: "Primaire universel monocomposant sans solvant à base d'acrylate copolymère et de silicate",
    beschreibung: "KORODUR uniPrimer prépare les supports en béton absorbants avant le revêtement par chapes à agrégats durs à liant ciment et réduit l'absorption des supports secs : le pré-mouillage chronophage lors des rénovations de sols industriels devient inutile. L'évaporation du pont d'adhérence KORODUR HB 5 ou HB 5 rapid est minimisée et une hydratation plus homogène du système adhérent est obtenue.",
    besonderheiten: ["Sans solvant, monocomposant, prêt à l'emploi", "Remplace le pré-mouillage chronophage lors des rénovations", "Minimise l'évaporation du pont d'adhérence"],
    technischeDaten: [
      { label: "Forme", wert: "liquide" },
      { label: "Couleur", wert: "blanc laiteux" },
      { label: "Valeur pH", wert: "11,6" },
    ],
  },
  "koropox": {
    kurzbeschreibung: "Concentré de résine époxy 2K transparent, émulsifiable dans l'eau, pour l'imprégnation de sols à liant ciment",
    beschreibung: "KOROPOX augmente l'étanchéité et la résistance à l'eau, aux graisses, aux huiles, aux huiles minérales, aux carburants et aux liquides de frein. L'application s'effectue en deux passes sur les sols industriels KOROPLAN, KORODUR et NEODUR ou les revêtements à liant ciment.",
    besonderheiten: ["Émulsifiable dans l'eau et transparent", "Résistant à l'eau, aux graisses, aux huiles, aux carburants et aux liquides de frein"],
    technischeDaten: [
      { label: "Forme", wert: "liquide" },
      { label: "Couleur", wert: "incolore" },
      { label: "Densité", wert: "1,0 g/cm³" },
      { label: "Consommation", wert: "2 passes, env. 75–175 g/m² de concentré (comp. A + B)" },
    ],
  },
  "koromineral": {
    kurzbeschreibung: "Imprégnation liquide transparente à base de silicate pour la silicification de surface des matériaux minéraux",
    beschreibung: "KOROMINERAL imprègne les surfaces en béton et en chape dans les locaux de stockage et de production ou les chambres froides. Il convient spécialement aux supports minéraux tels que chapes, sols industriels à liant ciment, béton, mortier de maçonnerie et enduit à liant ciment, augmente l'étanchéité et a un effet hydrofuge.",
    besonderheiten: ["Silicification de surface des matériaux minéraux", "Augmente l'étanchéité, hydrofuge"],
    technischeDaten: [
      { label: "Couleur", wert: "transparent" },
      { label: "Densité", wert: "env. 1,12 g/cm³" },
      { label: "Valeur pH", wert: "env. 11" },
      { label: "Consommation", wert: "env. 100–200 g/m² (selon l'absorption)" },
    ],
  },
  "koromineral-li": {
    kurzbeschreibung: "Imprégnation liquide transparente à base de silicate de lithium hybride avec protection anti-taches de base intégrée",
    besonderheiten: ["Silicate de lithium hybride", "Protection anti-taches de base intégrée"],
    technischeDaten: [
      { label: "Consommation", wert: "env. 40–100 g/m² (selon l'absorption)" },
    ],
  },
  "koroclean": {
    kurzbeschreibung: "Procédé de ponçage pour la valorisation optique des sols industriels cimentaires (ponçage de nettoyage)",
    beschreibung: "KOROCLEAN est un procédé de ponçage spécialement développé pour la valorisation optique des sols industriels KORODUR et autres sols industriels cimentaires. Après le traitement, le sol est plus facile à nettoyer et à entretenir, les irrégularités de teinte sont réduites : une alternative techniquement et économiquement judicieuse au nettoyage final de chantier traditionnel avant la mise en service.",
    besonderheiten: ["Améliore l'aspect, la sécurité et la résistance à la glissance", "Surface sans poussière et facile à nettoyer", "Également recommandé pour les sols design KORODUR"],
    technischeDaten: [
      { label: "Procédé", wert: "Ponçage de nettoyage mécanique (système MKS Funke Schleiftechnik)" },
    ],
  },
  "system-korodur-korotan": {
    kurzbeschreibung: "Système de sol industriel : chape à agrégats durs monocouche adhérente avec pont d'adhérence, épaisseur nominale moyenne 15 mm",
    beschreibung: "Le sol industriel KORODUR-KOROTAN est une chape à agrégats durs KORODUR à liant ciment, posée en monocouche, adhérente avec pont d'adhérence sur béton porteur durci, en épaisseur nominale moyenne de 15 mm. La pose s'effectue largement sans joints ; en combinaison avec le pont d'adhérence KORODUR HB 5, une liaison solide est obtenue. L'un des trois systèmes de rénovation KORODUR pour sols industriels.",
    besonderheiten: ["Purement minéral", "Largement sans joints", "Système de rénovation pour sols industriels"],
    technischeDaten: [
      { label: "Structure", wert: "monocouche, adhérente avec pont d'adhérence (KORODUR HB 5) sur béton porteur durci" },
    ],
  },
  "granidur": {
    kurzbeschreibung: "Chape décorative polie, aspect granit ou terrazzo",
    beschreibung: "GRANIDUR 05 et GRANIDUR 08 sont des matériaux secs colorés, fabriqués en usine et prêts à l'emploi, pour la réalisation de chapes décoratives polies en épaisseur de 15 à max. 70 mm selon la construction. L'aspect final granit ou terrazzo peut aller de mat à brillant. Pose mono- ou bicouche selon DIN 18560-2, -3 (adhérente avec pont d'adhérence KORODUR HB 5) et -4.",
    besonderheiten: ["Couleurs disponibles : gris ciment, gris clair, gris basalte, anthracite, beige, rouge, olive", "Aspect ponçable de mat à brillant", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Résistance à la compression (GRANIDUR 05)", wert: "45 N/mm²" },
      { label: "Résistance à la flexion (GRANIDUR 05)", wert: "6 N/mm²" },
      { label: "Résistance à la compression (GRANIDUR 08)", wert: "35 N/mm²" },
      { label: "Résistance à la flexion (GRANIDUR 08)", wert: "5 N/mm²" },
    ],
    varianten: [
      { name: "GRANIDUR 05", qualitaetsklasse: "CT-C45-F6", hinweis: "Granulométrie 0–5 mm, épaisseur de couche 15–25 mm" },
      { name: "GRANIDUR 08", qualitaetsklasse: "CT-C35-F5", hinweis: "Granulométrie 0–8 mm, épaisseur de couche 25–50 mm" },
    ],
  },
  "granidur-bianco-nero": {
    kurzbeschreibung: "Chape décorative polie en blanc (BIANCO) ou noir (NERO), épaisseur moyenne 15 mm",
    beschreibung: "GRANIDUR BIANCO et GRANIDUR NERO sont des matériaux secs fabriqués en usine et prêts à l'emploi pour la réalisation de chapes décoratives polies en épaisseur moyenne de 15 mm. Pose monocouche selon DIN 18560-3 comme chape adhérente avec pont d'adhérence KORODUR HB 5.",
    besonderheiten: ["Aspect poli blanc pur ou noir profond", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–5 mm" },
      { label: "Résistance à la compression", wert: "45 N/mm²" },
      { label: "Résistance à la flexion", wert: "6 N/mm²" },
    ],
    varianten: [
      { name: "GRANIDUR BIANCO" },
      { name: "GRANIDUR NERO" },
    ],
  },
  "kcf": {
    kurzbeschreibung: "Chape décorative lissée, aspect nuagé et marbré",
    beschreibung: "KCF 05 et KCF 08 sont des matériaux secs colorés, fabriqués en usine et prêts à l'emploi, pour la réalisation de chapes décoratives lissées en épaisseur de 15 à max. 70 mm selon la construction. Cette chape décorative lissée à liant ciment a été développée à la fin des années 1990 avec l'architecte et designer italien Alessandro Copetti. Pose mono- ou bicouche selon DIN 18560-2, -3 (adhérente avec pont d'adhérence KORODUR HB 5) et -4.",
    besonderheiten: ["Couleurs disponibles : gris ciment, gris clair, gris basalte, anthracite, beige, rouge, olive", "Traitement de surface avec KOROCLEAN", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Usure par abrasion", wert: "≤ 5 cm³/50 cm²" },
      { label: "Résistance à la compression (KCF 05)", wert: "45 N/mm²" },
      { label: "Résistance à la flexion (KCF 05)", wert: "6 N/mm²" },
      { label: "Résistance à la compression (KCF 08)", wert: "35 N/mm²" },
      { label: "Résistance à la flexion (KCF 08)", wert: "5 N/mm²" },
    ],
    varianten: [
      { name: "KCF 05", qualitaetsklasse: "CT-C45-F6-A5", hinweis: "Granulométrie 0–5 mm, épaisseur de couche 15–25 mm" },
      { name: "KCF 08", qualitaetsklasse: "CT-C35-F5-A5", hinweis: "Granulométrie 0–8 mm, épaisseur de couche 25–50 mm" },
      { name: "KCF 05 rapid", hinweis: "à durcissement rapide, liant à volume stable à base ternaire" },
    ],
  },
  "tru-pc": {
    kurzbeschreibung: "Chape décorative minérale autoplaçante, aspect béton poli (technologie Rapid Set)",
    beschreibung: "Rapid Set TRU PC est une chape décorative minérale autoplaçante, basée sur une technologie de ciment spéciale, développée pour simuler l'aspect du béton poli. Idéale lorsque résistance initiale, durabilité et durcissement à faible retrait sont exigés : travaillable jusqu'à 20 minutes, praticable après 2 à 3 heures. Les granulats décoratifs (jusqu'à 2,5 mm) sont déjà inclus.",
    besonderheiten: ["Aspect béton poli, granulats décoratifs jusqu'à 2,5 mm inclus", "Réalisable en différentes variantes de couleurs", "Pour l'intérieur et l'extérieur, également en zones humides"],
    technischeDaten: [
      { label: "Résistance à la compression (ASTM C-109 mod.)", wert: "env. 19 N/mm² après 4 h, env. 34 N/mm² après 1 jour, env. 48 N/mm² après 28 jours" },
      { label: "Temps de travail", wert: "env. 20 minutes" },
      { label: "Temps d'écoulement", wert: "env. 15 minutes" },
      { label: "Consommation de matériau", wert: "env. 1,8 kg par m² et mm d'épaisseur" },
      { label: "Couleur", wert: "gris naturel" },
    ],
  },
  "tru-sp": {
    kurzbeschreibung: "Chape décorative minérale autoplaçante, aspect sel et poivre (technologie Rapid Set)",
    beschreibung: "Rapid Set TRU SP est une chape décorative minérale autoplaçante, basée sur une technologie de ciment spéciale, développée pour simuler l'aspect du béton poli en finition sel et poivre. Idéale lorsque résistance initiale, durabilité et durcissement à faible retrait sont exigés : travaillable jusqu'à 20 minutes, praticable après 2 à 3 heures.",
    besonderheiten: ["Aspect sel et poivre", "Réalisable en différentes variantes de couleurs", "Pour l'intérieur et l'extérieur, également en zones humides"],
    technischeDaten: [
      { label: "Résistance à la compression (ASTM C-109 mod.)", wert: "env. 13 N/mm² après 4 h, env. 27 N/mm² après 1 jour, env. 44 N/mm² après 28 jours" },
      { label: "Temps de travail", wert: "env. 20 minutes" },
      { label: "Temps d'écoulement", wert: "env. 15 minutes" },
      { label: "Consommation de matériau", wert: "env. 1,8 kg par m² et mm d'épaisseur" },
      { label: "Couleur", wert: "gris naturel" },
    ],
  },
  "microtop-tw-3": {
    kurzbeschreibung: "Mortier projeté à base de ciment, par voie sèche, pour le reprofilage et le revêtement dans le domaine de l'eau potable",
    beschreibung: "MICROTOP TW 3 s'applique par projection par voie sèche et sert au reprofilage et au revêtement de surfaces, à l'augmentation de l'enrobage du béton et à la finition dans le domaine de l'eau potable. Les matériaux s'appliquent en une seule couche et peuvent être talochés et lissés sans difficulté ; les petits travaux sont possibles à la main.",
    besonderheiten: ["Purement minéral, amélioré aux microsilices", "Faible porosité, imperméable à l'eau", "Talochable et lissable", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–3 mm" },
      { label: "Résistance à la compression (28 j)", wert: "≥ 45 N/mm²" },
      { label: "Porosité totale (90 j)", wert: "≤ 10 % vol." },
    ],
  },
  "microtop-tw-5": {
    kurzbeschreibung: "Mortier projeté à base de ciment amélioré aux microsilices, par voie sèche, pour réservoirs d'eau potable",
    beschreibung: "MICROTOP TW 5 est un mortier projeté à base de ciment, purement minéral, à prise hydraulique, amélioré aux microsilices, pour le reprofilage, l'égalisation et le revêtement de surfaces dans le réservoir d'eau potable. Application par projection par voie sèche (flux dilué), également pour l'augmentation de l'enrobage du béton et la finition. Conforme aux fiches de travail DVGW W 270, W 300 et W 347.",
    besonderheiten: ["Purement minéral, à prise hydraulique, amélioré aux microsilices", "Application monocouche, talochable et lissable", "Petits travaux possibles à la main"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–5 mm" },
      { label: "Résistance à la compression", wert: "≥ 45 N/mm²" },
      { label: "Densité", wert: "2,25 kg/dm³" },
      { label: "Porosité totale (90 j)", wert: "≤ 10 % vol." },
    ],
  },
  "microtop-tw-8": {
    kurzbeschreibung: "Béton projeté à base de ciment amélioré aux microsilices (C30/37), par voie sèche, pour le domaine de l'eau potable",
    beschreibung: "MICROTOP TW 8 est un béton projeté à base de ciment, à prise hydraulique, amélioré aux microsilices, pour le domaine de l'eau potable, application selon DIN 18551. Le béton de classe de résistance C30/37 est utilisé pour la réalisation de béton projeté par voie sèche, le reprofilage d'éclats et l'augmentation de l'enrobage du béton. Conforme aux fiches de travail DVGW W 270, W 300 et W 347.",
    besonderheiten: ["Classe de résistance C30/37", "Amélioré aux microsilices, à prise hydraulique", "Talochable et lissable, petits travaux possibles à la main"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–8 mm" },
      { label: "Résistance à la compression", wert: "≥ 45 N/mm²" },
      { label: "Densité", wert: "2,27 kg/dm³" },
      { label: "Porosité totale (90 j)", wert: "≤ 10 % vol." },
    ],
  },
  "microtop-tw-nsm": {
    kurzbeschreibung: "Mortier projeté par voie humide pour le reprofilage et le revêtement dans le domaine de l'eau potable",
    beschreibung: "MICROTOP TW NSM s'applique par projection par voie humide et sert au reprofilage et au revêtement de surfaces, à l'augmentation de l'enrobage du béton et à la finition dans le domaine de l'eau potable. Les matériaux peuvent être talochés et lissés sans difficulté ; les petits travaux sont possibles à la main en liaison avec un pont d'adhérence.",
    besonderheiten: ["Talochable et lissable", "Petits travaux possibles à la main avec pont d'adhérence"],
    technischeDaten: [
      { label: "Épaisseur de couche", wert: "env. 20 mm en une seule opération" },
      { label: "Procédé", wert: "Projection par voie humide (transport à flux dense, faible dégagement de poussière)" },
    ],
    varianten: [
      { name: "MICROTOP TW NSM blau" },
    ],
  },
  "microtop-tw-02": {
    kurzbeschreibung: "Mortier projeté par voie humide à flux dense avec un volume de pores extrêmement faible",
    beschreibung: "MICROTOP TW 02 s'applique par projection par voie humide à flux dense et sert au revêtement de surfaces, à l'augmentation de l'enrobage du béton et à la finition dans le domaine de l'eau potable. Le produit présente un volume de pores extrêmement faible et peut également être utilisé comme protection anticorrosion et pont d'adhérence.",
    besonderheiten: ["Volume de pores extrêmement faible", "Utilisable aussi comme protection anticorrosion et pont d'adhérence"],
    technischeDaten: [
      { label: "Épaisseur de couche (revêtement conduites/réservoirs)", wert: "5–8 mm" },
      { label: "Épaisseur de couche (protection anticorrosion/pont d'adhérence)", wert: "2–5 mm" },
      { label: "Procédé", wert: "Centrifugation, projection, spatulage, application à la main" },
    ],
  },
  "microtop-tw-vsm": {
    kurzbeschreibung: "Mortier de projection préalable (couche d'accrochage) pour le revêtement intérieur et la remise en état de réservoirs d'eau potable et de maçonnerie",
    beschreibung: "MICROTOP TW VSM sert au revêtement intérieur et à la remise en état de réservoirs d'eau potable neufs comme anciens ainsi que de maçonnerie. Grâce à sa composition spéciale, il présente d'excellentes propriétés de mise en œuvre et d'usage et peut être taloché et lissé sans difficulté.",
    besonderheiten: ["Convient également à la maçonnerie", "Talochable et lissable"],
    technischeDaten: [
      { label: "Épaisseur de couche", wert: "15–20 mm" },
      { label: "Procédé", wert: "Projection, application à la main" },
    ],
  },
  "microtop-tw-bm": {
    kurzbeschreibung: "Mortier spécial pour le revêtement intérieur de conduites et réservoirs d'eau potable, aussi comme pont d'adhérence",
    beschreibung: "MICROTOP TW BM est un mortier spécial fabriqué en usine et prêt à l'emploi pour le revêtement intérieur de conduites et réservoirs d'eau potable ainsi que d'autres ouvrages. Il s'applique sans difficulté par centrifugation, projection ou à la main, est également utilisable comme pont d'adhérence pour revêtements de sol et comme protection anticorrosion, et est livré en nature et en blanc. Conforme aux fiches de travail DVGW W 270, W 300 et W 347.",
    besonderheiten: ["Application par centrifugation, projection ou à la main", "Utilisable aussi comme pont d'adhérence et protection anticorrosion", "Livrable en nature et blanc"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–1 mm" },
      { label: "Résistance à la compression", wert: "35 N/mm²" },
      { label: "Résistance à la flexion", wert: "6,3 N/mm²" },
      { label: "Couleurs", wert: "nature, blanc" },
      { label: "Épaisseur de couche (revêtement conduites/réservoirs)", wert: "5–8 mm" },
      { label: "Épaisseur de couche (protection anticorrosion/pont d'adhérence)", wert: "2–5 mm" },
    ],
    varianten: [
      { name: "MICROTOP TW BM weiß" },
      { name: "MICROTOP TW BM blau" },
    ],
  },
  "microtop-tw-mineral": {
    kurzbeschreibung: "Produit de protection liquide à base de silicate pour la consolidation et l'étanchéification de surface",
    beschreibung: "MICROTOP TW Mineral consolide les matériaux minéraux et les supports poreux par réaction chimique avec les liants et granulats du substrat (réaction de silicification) et améliore la structure tout en étanchéifiant la surface. Sert d'imprégnation dans le système MICROTOP.",
    besonderheiten: ["Réaction de silicification avec le substrat", "Consolidation et étanchéification en une seule opération", "Imprégnation pour tous les mortiers MICROTOP TW"],
    technischeDaten: [
      { label: "Forme", wert: "liquide" },
      { label: "Couleur", wert: "transparent" },
      { label: "Densité", wert: "env. 1,14 g/cm³" },
      { label: "Valeur pH", wert: "env. 11,3" },
    ],
  },
  "neodur-vm-1": {
    kurzbeschreibung: "Mortier de scellement pour sections de scellement de 5 à 20 mm",
    beschreibung: "Les mortiers de montage et de scellement assurent une liaison solide entre le béton et les pièces d'insertion en acier. NEODUR VM 1 est conçu pour des sections de scellement de 5 à 20 mm.",
    besonderheiten: ["Liaison solide entre béton et pièces d'insertion en acier", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Section de scellement", wert: "5–20 mm" },
    ],
  },
  "neodur-vm-3": {
    kurzbeschreibung: "Mortier de scellement pour sections de scellement de 10 à 50 mm",
    beschreibung: "Les mortiers de montage et de scellement assurent une liaison solide entre le béton et les pièces d'insertion en acier. NEODUR VM 3 est conçu pour des sections de scellement de 10 à 50 mm.",
    besonderheiten: ["Liaison solide entre béton et pièces d'insertion en acier"],
    technischeDaten: [
      { label: "Section de scellement", wert: "10–50 mm" },
    ],
  },
  "neodur-vm-5": {
    kurzbeschreibung: "Béton de scellement (C80/95) pour sections de scellement jusqu'à 200 mm, contrôlé selon DIN EN 1504-3 (R4)",
    beschreibung: "Béton de montage et de scellement pour grandes sections de scellement jusqu'à 200 mm. Contrôlé selon DIN EN 1504-3 (classe R4) et la directive DAfStb pour bétons et mortiers de scellement à liant ciment.",
    besonderheiten: ["Pour applications à caractère structurel (R4)", "Directive DAfStb (SKVB I)"],
    technischeDaten: [
      { label: "Section de scellement", wert: "jusqu'à 200 mm" },
    ],
  },
  "neodur-vb-8": {
    kurzbeschreibung: "Béton de scellement pour sections de scellement de plus de 50 mm",
    beschreibung: "Béton de montage et de scellement pour sections de scellement de plus de 50 mm. Assure une liaison solide entre le béton et les pièces d'insertion en acier.",
    besonderheiten: ["Liaison solide entre béton et pièces d'insertion en acier"],
    technischeDaten: [
      { label: "Section de scellement", wert: "plus de 50 mm" },
    ],
  },
  "neodur-vm-basic": {
    kurzbeschreibung: "Béton de scellement expansif minéral à haute fluidité, contrôlé DVGW pour les domaines de l'eau potable",
    beschreibung: "NEODUR VM basic est un béton de scellement expansif minéral à haute fluidité pour les travaux de scellement à liaison solide et les montages de tous types, p. ex. le scellement de conduites dans les installations d'eau potable. Contrôlé selon la fiche de travail DVGW W 347 pour les exigences hygiéniques dans les domaines de l'eau potable.",
    besonderheiten: ["Faible retrait, à prise normale", "Résistant au gel et aux sels de déverglaçage", "Imperméable à l'eau, sans chlorures", "Directive DAfStb (SKVB II)"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–5 mm" },
      { label: "Mise en œuvre", wert: "Malaxage + pompage / coulage" },
      { label: "Conditionnement", wert: "sacs de 25 kg" },
    ],
  },
  "neodur-svm-03": {
    kurzbeschreibung: "Mortier de scellement rapide pour sections de scellement de 5 à 20 mm",
    beschreibung: "Mortier de scellement à durcissement rapide pour sections de scellement de 5 à 20 mm. Assure une liaison solide entre le béton et les pièces d'insertion en acier lorsqu'une remise en service rapide est exigée.",
    besonderheiten: ["À durcissement rapide", "Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Section de scellement", wert: "5–20 mm" },
    ],
  },
  "neodur-am-super": {
    kurzbeschreibung: "Mortier d'ancrage pour ancrages rocheux de tous types dans les travaux miniers et souterrains",
    beschreibung: "Les mortiers d'ancrage s'utilisent avec les ancrages rocheux de tous types dans les travaux miniers et souterrains. NEODUR AM Super est un mortier sec minéral fabriqué en usine, granulométrie 0 à 1 mm.",
    besonderheiten: ["Pour ancrages rocheux de tous types"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–1 mm" },
    ],
  },
  "neodur-am-plus": {
    kurzbeschreibung: "Mortier d'ancrage pour ancrages rocheux de tous types dans les travaux miniers et souterrains",
    beschreibung: "Les mortiers d'ancrage s'utilisent avec les ancrages rocheux de tous types dans les travaux miniers et souterrains. NEODUR AM Plus est un mortier sec minéral fabriqué en usine, granulométrie 0 à 1 mm.",
    besonderheiten: ["Pour ancrages rocheux de tous types"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–1 mm" },
    ],
  },
  "neodur-msm-3": {
    kurzbeschreibung: "Mortier projeté pour la remise en état du béton, granulométrie 0 à 3 mm",
    beschreibung: "La remise en état du béton regroupe les technologies de restauration d'éléments de construction en béton. NEODUR MSM 3 est un mortier projeté minéral de granulométrie 0 à 3 mm, application selon DIN 18551 en liaison avec DIN EN 14487.",
    besonderheiten: ["Déclaration environnementale produit (EPD de groupe) disponible"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–3 mm" },
    ],
  },
  "neodur-msm-5": {
    kurzbeschreibung: "Mortier projeté pour la remise en état du béton, granulométrie 0 à 5 mm",
    beschreibung: "La remise en état du béton regroupe les technologies de restauration d'éléments de construction en béton. NEODUR MSM 5 est un mortier projeté minéral de granulométrie 0 à 5 mm.",
    technischeDaten: [
      { label: "Granulométrie", wert: "0–5 mm" },
    ],
  },
  "neodur-msb-8": {
    kurzbeschreibung: "Béton projeté pour la remise en état du béton, granulométrie 0 à 8 mm",
    beschreibung: "La remise en état du béton regroupe les technologies de restauration d'éléments de construction en béton. NEODUR MSB 8 est un béton projeté minéral de granulométrie 0 à 8 mm.",
    technischeDaten: [
      { label: "Granulométrie", wert: "0–8 mm" },
    ],
  },
  "rapid-set-concrete-mix": {
    kurzbeschreibung: "Béton rapide à durcissement rapide pour épaisseurs de 50 à 600 mm, chargeable après 1 heure",
    beschreibung: "CONCRETE MIX est un mortier de réparation à durcissement rapide et facile à mettre en œuvre, à base de ciment Rapid Set et de granulats minéraux spécialement sélectionnés. Idéal lorsque résistances rapides, durabilité et durcissement à faible retrait sont exigés. Applicable en épaisseurs de 50 à 600 mm, également en locaux humides ; non métallique et sans ajouts de chlorures.",
    besonderheiten: ["Épaisseurs jusqu'à 600 mm en une seule opération", "Non métallique, sans ajouts de chlorures", "Convient en locaux humides"],
    technischeDaten: [
      { label: "Granulométrie", wert: "0–8 mm" },
      { label: "Début de prise", wert: "après 15 min" },
      { label: "Mise en charge", wert: "après 60 min" },
      { label: "Résistance à la compression", wert: "19 N/mm² après 60 min, 41 N/mm² après 28 jours" },
      { label: "Résistance à la flexion", wert: "4,5 N/mm² après 60 min, 7 N/mm² après 28 jours" },
      { label: "Résistant gel/sel", wert: "Oui" },
      { label: "Résistant aux sulfates", wert: "Oui" },
    ],
  },
  "rapid-set-concrete-pharmacy": {
    kurzbeschreibung: "Système d'additifs pour le contrôle des propriétés de mise en œuvre des produits Rapid Set",
    beschreibung: "La CONCRETE PHARMACY comprend trois additifs pour contrôler les propriétés de mise en œuvre des produits Rapid Set : SET Control retarde la prise et prolonge le temps de travail, FLOW Control améliore la fluidité et réduit le besoin en eau de gâchage de 20 à 40 pour cent, FAST accélère la prise de CEMENT ALL, MORTAR MIX et CONCRETE MIX, idéal par températures froides.",
    besonderheiten: ["Agit sur CEMENT ALL, MORTAR MIX et CONCRETE MIX", "FLOW Control : 20–40 % d'eau de gâchage en moins pour un même étalement"],
    varianten: [
      { name: "SET Control", hinweis: "Retardateur pour un temps de travail prolongé" },
      { name: "FLOW Control", hinweis: "Fluidifiant, augmente les résistances" },
      { name: "FAST Control", hinweis: "Accélérateur pour températures froides" },
    ],
  },
  "goodcat-golden-nature": {
    kurzbeschreibung: "Litière agglomérante à la bentonite, granulés bruns, haute absorption des odeurs et agglomération extra-forte",
    beschreibung: "La litière agglomérante goodcat est non traitée et constitue un produit 100 % naturel. golden nature : granulés bruns, haute absorption des odeurs, agglomération extra-forte, pauvre en poussière et non traitée.",
    besonderheiten: ["Produit 100 % naturel", "Pauvre en poussière et non traitée", "Agglomération extra-forte"],
    technischeDaten: [
      { label: "Conditionnement", wert: "7 litres" },
    ],
  },
  "goodcat-organic-love": {
    kurzbeschreibung: "Litière agglomérante en 100 % fibres végétales avec haute absorption des odeurs",
    beschreibung: "La litière agglomérante goodcat est non traitée et constitue un produit 100 % naturel. organic love : 100 % fibres végétales, haute absorption des odeurs, bonne agglomération, pauvre en poussière et non traitée.",
    besonderheiten: ["100 % fibres végétales", "Pauvre en poussière et non traitée", "Bonne agglomération"],
    technischeDaten: [
      { label: "Conditionnement", wert: "8 litres" },
    ],
  },
  "goodcat-silver-classic": {
    kurzbeschreibung: "Litière agglomérante à la bentonite, granulés blancs classiques et haute absorption des odeurs",
    beschreibung: "La litière agglomérante goodcat est non traitée et constitue un produit 100 % naturel. silver classic : granulés blancs classiques, haute absorption des odeurs, agglomération extra-forte, pauvre en poussière et non traitée.",
    besonderheiten: ["Produit 100 % naturel", "Pauvre en poussière et non traitée", "Agglomération extra-forte"],
    technischeDaten: [
      { label: "Conditionnement", wert: "7 litres" },
    ],
  },
};

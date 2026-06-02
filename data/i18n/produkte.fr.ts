/** French translations for product data */
export const produkteFR: Record<string, {
  kurzbeschreibung?: string;
  besonderheiten?: string[];
  technischeDaten?: { label: string; wert: string }[];
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
    besonderheiten: ["Temps de prise ultra-court", "Haute résistance initiale", "Usage intérieur et extérieur", "Compensé en retrait"],
    technischeDaten: [
      { label: "Qualité", wert: "C55/67" },
      { label: "Résistance à la compression (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Résistance à la compression (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Praticable après", wert: "env. 15 min" },
      { label: "Charge complète après", wert: "env. 1 h" },
    ],
  },
  "rapid-set-mortar-mix": {
    kurzbeschreibung: "Mortier de réparation rapide universel",
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
    besonderheiten: ["Adapté aux surfaces en asphalte", "Sans pont d'adhérence", "Application facile", "Ouverture au trafic après 30 minutes"],
    technischeDaten: [
      { label: "Résistance à la compression", wert: "env. 22 N/mm²" },
      { label: "Épaisseur de couche", wert: "30–600 mm" },
      { label: "Ouverture au trafic après", wert: "env. 30 min" },
      { label: "Pont d'adhérence", wert: "Non requis" },
    ],
  },
  "dot-europe-concrete-mix": {
    kurzbeschreibung: "Béton de réparation rapide universel, DIN EN 1504-3",
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
    besonderheiten: ["Cure contrôlée", "Réduit les fissures de retrait", "Application par pulvérisation"],
    technischeDaten: [
      { label: "Effet", wert: "Rétention d'humidité / cure" },
      { label: "Application", wert: "Pulvérisation" },
    ],
  },
};

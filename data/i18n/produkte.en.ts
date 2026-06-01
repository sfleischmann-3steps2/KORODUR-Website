/** English translations for product data */
export const produkteEN: Record<string, {
  kurzbeschreibung?: string;
  besonderheiten?: string[];
  technischeDaten?: { label: string; wert: string }[];
}> = {
  "neodur-he-60-rapid": {
    kurzbeschreibung: "High-performance rapid-setting hard aggregate screed – fully load-bearing after 24 h",
    besonderheiten: ["High abrasion resistance", "Chemical resistant", "Rapid setting", "Low shrinkage"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 60 N/mm²" },
      { label: "Flexural strength", wert: "≥ 8 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Walkable after", wert: "approx. 4–6 h" },
      { label: "Fully load-bearing after", wert: "approx. 24 h" },
    ],
  },
  "neodur-he-65": {
    kurzbeschreibung: "High-performance hard aggregate screed for highest industrial floor demands with silo technology",
    besonderheiten: ["Highest wear resistance", "Silo system applicable", "Economical on large areas", "Strong bond"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 70 N/mm²" },
      { label: "Flexural strength", wert: "≥ 9 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Application", wert: "Silo system / pump technology" },
      { label: "Fully load-bearing after", wert: "approx. 3 days" },
    ],
  },
  "neodur-he-65-plus": {
    kurzbeschreibung: "High-performance hard aggregate screed for indoor and outdoor use – no bonding agent, WHG-approved",
    besonderheiten: ["No bonding agent required", "Freeze-thaw salt resistant", "WHG-compliant", "Polymer-modified & fibre-reinforced"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 70 N/mm²" },
      { label: "Flexural strength", wert: "≥ 9 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Freeze-thaw salt resistant", wert: "Yes" },
      { label: "Bonding agent required", wert: "No" },
    ],
  },
  "neodur-he-40": {
    kurzbeschreibung: "High-performance hard aggregate screed for heavily stressed industrial floors",
    besonderheiten: ["High wear resistance", "Strong bond (DIN 18560-7)", "Economical hard aggregate solution", "Indoor use"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 40 N/mm²" },
      { label: "Flexural strength", wert: "≥ 6 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Fully load-bearing after", wert: "approx. 3 days" },
    ],
  },
  "neodur-level": {
    kurzbeschreibung: "Self-levelling, rapid-setting hard aggregate thin-layer screed for precision floor renovation",
    besonderheiten: ["Self-levelling – excellent flatness", "Rapid usability", "Integrated wear layer", "Machine-applicable"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 40 N/mm²" },
      { label: "Flexural strength", wert: "≥ 10 N/mm²" },
      { label: "Self-levelling", wert: "Yes" },
      { label: "Flatness", wert: "DIN 18202, Row 3" },
      { label: "Lightly load-bearing after", wert: "approx. 24 h" },
      { label: "Fully load-bearing after", wert: "approx. 3 days" },
    ],
  },
  "tru-self-leveling": {
    kurzbeschreibung: "Self-levelling, polished decorative exposed screed for design-oriented floor solutions",
    besonderheiten: ["Design-oriented concrete look", "Seamless surface", "No bonding agent required", "Polishable to high gloss", "Hygienic & easy to clean"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 40 N/mm²" },
      { label: "Flexural strength", wert: "≥ 10 N/mm²" },
      { label: "Appearance", wert: "Concrete-like exposed screed surface" },
      { label: "Application", wert: "Self-levelling" },
      { label: "Bonding agent", wert: "Not required" },
      { label: "Walkable after", wert: "approx. 2–3 h" },
      { label: "Fully load-bearing after", wert: "approx. 24 h" },
    ],
  },
  "korodur-hb-5-rapid": {
    kurzbeschreibung: "Rapid-setting bonding agent for strong bond to substrate",
    besonderheiten: ["Rapid setting", "High pull-off resistance", "Wet-on-wet application"],
    technischeDaten: [
      { label: "Pull-off resistance", wert: "≥ 1.5 N/mm²" },
      { label: "Working time", wert: "approx. 15 min" },
      { label: "Overcoatable after", wert: "wet-on-wet" },
    ],
  },
  "korodur-pc": {
    kurzbeschreibung: "Synthetic resin dispersion primer for thin-layer screed systems",
    besonderheiten: ["Specifically for thin-layer screed systems", "Polymer-modified"],
    technischeDaten: [
      { label: "Pull-off resistance", wert: "≥ 1.0 N/mm²" },
      { label: "Application", wert: "For NEODUR Level" },
      { label: "Consumption", wert: "50–200 g/m²" },
    ],
  },
  "rapid-set-cement-all": {
    kurzbeschreibung: "Universal rapid repair mortar – load-bearing after 1 h, indoor and outdoor",
    besonderheiten: ["Ultra-short setting time", "High early strength", "Indoor and outdoor use", "Shrinkage-compensated"],
    technischeDaten: [
      { label: "Quality", wert: "C55/67" },
      { label: "Compressive strength (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Compressive strength (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Walkable after", wert: "approx. 15 min" },
      { label: "Fully load-bearing after", wert: "approx. 1 h" },
    ],
  },
  "rapid-set-mortar-mix": {
    kurzbeschreibung: "Universal rapid repair mortar for joints, reprofiling and profile installation",
    besonderheiten: ["Shrinkage-neutral", "No bonding agent required", "Adjustable paste to stiff consistency", "Mix with water only"],
    technischeDaten: [
      { label: "Quality", wert: "C45/55" },
      { label: "Compressive strength (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Compressive strength (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Consistency", wert: "paste to plastic" },
      { label: "Fully load-bearing after", wert: "approx. 1 h" },
    ],
  },
  "rapid-set-mortar-mix-dur": {
    kurzbeschreibung: "Rapid repair mortar with DIN 1100 A hard aggregate for heavy-load joints",
    besonderheiten: ["Integrated wear aggregate DIN 1100 A", "Suitable for heavy-load joints", "Shrinkage-neutral", "Adjustable paste consistency"],
    technischeDaten: [
      { label: "Quality", wert: "C45/55 + DIN 1100 A" },
      { label: "Compressive strength (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Compressive strength (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Consistency", wert: "paste to plastic" },
      { label: "Fully load-bearing after", wert: "approx. 1 h" },
    ],
  },
  "asphalt-repair-mix": {
    kurzbeschreibung: "Rapid repair material for asphalt surfaces – traffic release after 30 minutes",
    besonderheiten: ["Suitable for asphalt surfaces", "No bonding agent required", "Easy application", "30-minute traffic release"],
    technischeDaten: [
      { label: "Compressive strength", wert: "approx. 22 N/mm²" },
      { label: "Layer thickness", wert: "30–600 mm" },
      { label: "Traffic release after", wert: "approx. 30 min" },
      { label: "Bonding agent", wert: "Not required" },
    ],
  },
  "dot-europe-concrete-mix": {
    kurzbeschreibung: "Universal rapid repair concrete according to DIN EN 1504-3 – for bridges, runways and industrial floors",
    besonderheiten: ["Multifunctional use", "Freeze-thaw salt resistant", "Sulfate resistant, chloride-free", "Excellent adhesion without bonding agent", "For bridges, runways, industrial floors", "30 % less CO₂ than Portland cement"],
    technischeDaten: [
      { label: "Quality", wert: "C35/45" },
      { label: "Aggregate size", wert: "0–8 mm" },
      { label: "Compressive strength (60 min)", wert: "> 19 N/mm²" },
      { label: "Compressive strength (28 d)", wert: "> 41 N/mm²" },
      { label: "Flexural strength (28 d)", wert: "> 7 N/mm²" },
      { label: "Fully load-bearing after", wert: "approx. 1 h" },
      { label: "Freeze-thaw salt resistant", wert: "Yes" },
      { label: "Sulfate resistant", wert: "Yes" },
    ],
  },
  "korocrete": {
    kurzbeschreibung: "Volumetrically mixed rapid concrete on FSCem base (ternary special binder) – traffic release after 6 h",
    besonderheiten: ["Volumetric mixing on site (Cemen Tech M-Series)", "Volume-stable, shrinkage-/stress-free, crack-free curing", "Waterproof, suitable for wet areas", "Pumpable", "Large-area application", "No residual concrete"],
    technischeDaten: [
      { label: "Binder", wert: "KORODUR FSCem (ternary)" },
      { label: "Quality", wert: "C35/45 – C50/60" },
      { label: "Compressive strength (6 h)", wert: "approx. 18 N/mm²" },
      { label: "Compressive strength (8 h)", wert: "approx. 25 N/mm²" },
      { label: "Compressive strength (16 h)", wert: "approx. 35 N/mm²" },
      { label: "Compressive strength (28 d)", wert: "approx. 65 N/mm²" },
      { label: "Traffic release after", wert: "approx. 6 h (≥ 20 MPa)" },
      { label: "Mixing", wert: "volumetric on site" },
    ],
  },
  "rapid-set-schnellbeton": {
    kurzbeschreibung: "Volumetrically mixed rapid concrete on Rapid-Set base per TL BEB-StB – traffic release after 2 h",
    besonderheiten: ["Volumetric mixing on site", "TL BEB-StB (highest traffic class for maintenance work)", "2-hour traffic release", "Freeze-thaw salt resistant", "Large-area application", "No residual concrete"],
    technischeDaten: [
      { label: "Binder", wert: "Rapid Set (calcium sulfo-aluminate cement)" },
      { label: "Quality", wert: "C40/50" },
      { label: "Compressive strength (60 min)", wert: "> 19 N/mm²" },
      { label: "Compressive strength (28 d)", wert: "> 41 N/mm²" },
      { label: "Traffic release after", wert: "approx. 2 h" },
      { label: "Mixing", wert: "volumetric on site" },
    ],
  },
  "korocure": {
    kurzbeschreibung: "Curing compound for controlled aftercare of screed surfaces",
    besonderheiten: ["Controlled curing", "Suitable for outdoor surfaces", "Reduces shrinkage cracks"],
    technischeDaten: [
      { label: "Effect", wert: "Moisture retention / curing" },
      { label: "Application", wert: "Spray or roller application" },
    ],
  },
  "koromineral-cure": {
    kurzbeschreibung: "Surface protection through silicate treatment",
    besonderheiten: ["Increases surface hardness", "Reduces dust formation", "Improves chemical resistance"],
    technischeDaten: [
      { label: "Effect", wert: "Silicate treatment / impregnation" },
      { label: "Application", wert: "On fresh screed" },
    ],
  },
  "korotex": {
    kurzbeschreibung: "Curing agent for controlled hardening",
    besonderheiten: ["Controlled curing", "Reduces shrinkage cracks", "Sprayable application"],
    technischeDaten: [
      { label: "Effect", wert: "Moisture retention / curing" },
      { label: "Application", wert: "Spray application" },
    ],
  },
};

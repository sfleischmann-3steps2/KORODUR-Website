/** English translations for product data */
export const produkteEN: Record<string, {
  kurzbeschreibung?: string;
  beschreibung?: string;
  besonderheiten?: string[];
  technischeDaten?: { label: string; wert: string }[];
  varianten?: { name: string; qualitaetsklasse?: string; hinweis?: string }[];
}> = {
  "neodur-he-60-rapid": {
    kurzbeschreibung: "High-performance rapid-setting hard aggregate screed",
    besonderheiten: ["High abrasion resistance", "Chemical resistant", "Rapid setting", "Low shrinkage"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 60 N/mm²" },
      { label: "Flexural strength", wert: "≥ 8 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Walkable after", wert: "approx. 4–6 h" },
      { label: "Fully load-bearing after", wert: "approx. 24 h" },
    ],
    varianten: [
      { name: "NEODUR HE 60 rapid SVS 3", qualitaetsklasse: "CT-C60-F8-A3" },
      { name: "NEODUR HE 60 rapid SVS 1,5", qualitaetsklasse: "CT-C60-F8-A1,5" },
      { name: "NEODUR HE 60 rapid metallisch", qualitaetsklasse: "CT-C60-F8-A3", hinweis: "Hard aggregate group M" },
    ],
  },
  "neodur-he-65": {
    kurzbeschreibung: "High-performance hard aggregate screed",
    besonderheiten: ["Highest wear resistance", "Silo system applicable", "Economical on large areas", "Strong bond"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 70 N/mm²" },
      { label: "Flexural strength", wert: "≥ 9 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Application", wert: "Silo system / pump technology" },
      { label: "Fully load-bearing after", wert: "approx. 3 days" },
    ],
    varianten: [
      { name: "NEODUR HE 65 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 65 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Hard aggregate group KS" },
      { name: "NEODUR HE 65 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 65 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Hard aggregate group M" },
    ],
  },
  "neodur-he-65-plus": {
    kurzbeschreibung: "High-performance hard aggregate screed",
    besonderheiten: ["No bonding agent required", "Freeze-thaw salt resistant", "WHG-compliant", "Polymer-modified & fibre-reinforced"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 70 N/mm²" },
      { label: "Flexural strength", wert: "≥ 9 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Freeze-thaw salt resistant", wert: "Yes" },
      { label: "Bonding agent required", wert: "No" },
    ],
    varianten: [
      { name: "NEODUR HE 65 plus SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
    ],
  },
  "neodur-he-40": {
    kurzbeschreibung: "High-performance hard aggregate screed",
    besonderheiten: ["High wear resistance", "Strong bond (DIN 18560-7)", "Economical hard aggregate solution", "Indoor use"],
    technischeDaten: [
      { label: "Compressive strength", wert: "≥ 40 N/mm²" },
      { label: "Flexural strength", wert: "≥ 6 N/mm²" },
      { label: "Abrasion resistance", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Fully load-bearing after", wert: "approx. 3 days" },
    ],
    varianten: [
      { name: "NEODUR HE 40/8", qualitaetsklasse: "CT-C40-F7-A6" },
    ],
  },
  "neodur-level": {
    kurzbeschreibung: "Self-levelling, rapid-setting thin-layer screed",
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
    kurzbeschreibung: "Self-levelling, polished decorative exposed screed",
    beschreibung: "Rapid Set TRU Self-Leveling is a self-levelling, mineral, polished decorative exposed screed based on special cement technology. Ideal where early strength, durability and low-shrinkage curing are required: workable for up to 20 minutes, walkable after 2 to 3 hours and ready for grinding to a high-gloss finish just 24 hours after installation. Individually customisable in various colour variants and with broadcast decorative aggregate (e.g. glass, marble).",
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
    kurzbeschreibung: "Universal rapid repair mortar",
    beschreibung: "Rapid Set CEMENT ALL is a mineral, multifunctional rapid repair mortar based on special cement technology, made from high-performance Rapid Set cement and fine-grained sand. It is fast-setting, durable and shrinkage-neutral; setting begins after approx. 15 minutes, load-bearing in approx. 1 hour. Mix with water only, structural strength within one hour. Visually comparable to Portland cement building materials and workable in a similar way.",
    besonderheiten: ["Ultra-short setting time", "High early strength", "Indoor and outdoor use", "Shrinkage-compensated"],
    technischeDaten: [
      { label: "Quality", wert: "C55/67" },
      { label: "Compressive strength (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Compressive strength (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Walkable after", wert: "approx. 15 min" },
      { label: "Fully load-bearing after", wert: "approx. 1 h" },
    ],
    varianten: [
      { name: "Rapid Set CEMENT ALL Plus", qualitaetsklasse: "C55/67" },
    ],
  },
  "rapid-set-mortar-mix": {
    kurzbeschreibung: "Universal rapid repair mortar",
    beschreibung: "Rapid Set MORTAR MIX is a blend of high-performance Rapid Set cement and graded quartz sand. Fast-setting, durable and shrinkage-neutral; it can be applied horizontally, vertically and overhead. Mix with water only, structural strength within one hour. Suitable for indoor and outdoor use, including wet areas.",
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
    kurzbeschreibung: "Rapid repair mortar with DIN 1100 A hard aggregate",
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
    kurzbeschreibung: "Rapid repair material for asphalt surfaces",
    beschreibung: "Rapid Set ASPHALT REPAIR MIX is a cement-based, polymer-modified repair material: high-strength, low-stress and rapid-hardening. It combines the speed of cold mix with the durability of hot asphalt: open the bag, add water, mix, install. No milling machine, no roller, no bonding agent; load-bearing after approx. 30 minutes, fully load-bearing after approx. 1 hour, even under heavy traffic.",
    besonderheiten: [
      "Suitable for asphalt surfaces",
      "No bonding agent required",
      "Easy application",
      "30-minute traffic release",
      "Freeze-thaw salt and sulfate resistant",
      "Pumpable, can be used horizontally and vertically",
      "Approx. 30 % less CO₂ than conventional Portland cement",
      "Available through builders' merchants",
    ],
    technischeDaten: [
      { label: "Compressive strength (30 min)", wert: "approx. 15 N/mm²" },
      { label: "Compressive strength (1 h)", wert: "approx. 22 N/mm²" },
      { label: "Compressive strength (28 d)", wert: "approx. 38 N/mm²" },
      { label: "Layer thickness", wert: "30–600 mm" },
      { label: "Traffic release after", wert: "approx. 30 min" },
      { label: "Bonding agent", wert: "Not required" },
      { label: "Flexural strength (28 d)", wert: "approx. 6.4 N/mm²" },
      { label: "Modulus of elasticity", wert: "approx. 22,000 N/mm²" },
      { label: "Grain size", wert: "0–8 mm" },
      { label: "Colour", wert: "black" },
      { label: "Water addition", wert: "approx. 3.80 l per 25 kg bag" },
      { label: "Material consumption", wert: "approx. 20 kg/m² per cm of layer thickness" },
      { label: "Application temperature", wert: "+5 °C to +30 °C" },
    ],
  },
  "dot-europe-concrete-mix": {
    kurzbeschreibung: "Universal rapid repair concrete, DIN EN 1504-3",
    beschreibung: "DOT Europe CONCRETE MIX is a high-performance, polymer-modified, rapid-setting, fibre-reinforced rapid concrete for indoor and outdoor use. In accordance with DIN EN 1504-3 it is suitable for both structural and non-structural repairs, ideal where rapid strength development, durability and low-shrinkage curing are required. Workable in thicknesses of 50–600 mm, load-bearing after just 1 hour; also suitable for wet areas.",
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
    kurzbeschreibung: "Volumetrically mixed rapid concrete (FSCem base)",
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
    kurzbeschreibung: "Volumetrically mixed rapid concrete (Rapid Set), TL BEB-StB",
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
    beschreibung: "To protect young concrete, intermediate curing measures are required in accordance with DIN EN 13670 in conjunction with DIN 1045-3: intermediate curing protects the water contained in the concrete from evaporation so the cement can hydrate completely. When used as a primer for subsequent hard aggregate toppings, KOROCURE is applied as soon as the concrete is walkable.",
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
    beschreibung: "In accordance with DIN 18353 (screed works) and DIN 18560 (screeds in building construction), screeds must be protected against uneven and overly rapid drying. KOROTEX curing is particularly important at elevated temperatures, low humidity and strong draughts; spray application is the most efficient method for freshly laid screed surfaces.",
    besonderheiten: ["Controlled curing", "Reduces shrinkage cracks", "Sprayable application"],
    technischeDaten: [
      { label: "Effect", wert: "Moisture retention / curing" },
      { label: "Application", wert: "Spray application" },
    ],
  },
  "neodur-he-3": {
    kurzbeschreibung: "Cement-bound dry material for industrial floors using the dry-shake process",
    beschreibung: "NEODUR HE 3 in accordance with DIN 18557 (factory-made mortar) and DIN EN 13813, based on hard aggregates in accordance with DIN 1100: ready-to-use, cement-bound dry material for the production of industrial floors using the dry-shake process. Also available in colours.",
    besonderheiten: ["Dry-shake process (applied dry to fresh screed/concrete surfaces)", "Also available in colours", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Hard aggregate group (DIN 1100)", wert: "A" },
      { label: "Grinding wear", wert: "≤ 5 cm³/50 cm²" },
    ],
    varianten: [
      { name: "NEODUR HE 3 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 3 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Hard aggregate group KS" },
      { name: "NEODUR HE 3 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 3 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Hard aggregate group M" },
    ],
  },
  "neodur-he-3-green": {
    kurzbeschreibung: "Resource-saving variant of NEODUR HE 3 with up to 30 % lower CO₂ emissions",
    beschreibung: "With the resource-saving variant NEODUR HE 3 green, CO₂ emissions in production can be reduced by up to 30 percent. Corresponding Environmental Product Declarations (EPD) are available for building owners, architects, planners and construction companies.",
    besonderheiten: ["Up to 30 % CO₂ reduction in production", "Product EPD available", "Dry-shake process"],
    technischeDaten: [
      { label: "Hard aggregate group (DIN 1100)", wert: "A" },
      { label: "Grinding wear", wert: "≤ 5 cm³/50 cm²" },
      { label: "CO₂ reduction", wert: "up to 30 %" },
    ],
  },
  "neodur-he-2": {
    kurzbeschreibung: "Cement-bound dry material for industrial floors using the dry-shake process",
    beschreibung: "NEODUR HE 2 in accordance with DIN 18557 (factory-made mortar) and DIN EN 13813: ready-to-use, cement-bound dry material for the production of industrial floors using the dry-shake process. Also available in colours.",
    besonderheiten: ["Dry-shake process", "Also available in colours"],
    technischeDaten: [
      { label: "Grain size", wert: "0–3 mm" },
      { label: "Compressive strength", wert: "70 N/mm²" },
      { label: "Flexural strength", wert: "9 N/mm²" },
      { label: "Grinding wear", wert: "≤ 8 cm³/50 cm²" },
    ],
  },
  "korodur-0-4": {
    kurzbeschreibung: "KORODUR hard aggregate (without binder), group A in accordance with DIN 1100",
    beschreibung: "Hard aggregate for the production of heavy-duty industrial floors, e.g. multi-storey car parks, industrial halls, assembly halls, aircraft hangars, workshops and high-bay warehouses. For indoor and outdoor use.",
    besonderheiten: ["Hard aggregate without binder"],
    technischeDaten: [
      { label: "Hard aggregate group (DIN 1100)", wert: "A" },
      { label: "Grinding wear", wert: "≤ 5 cm³/50 cm²" },
    ],
  },
  "korodur-vs-0-5": {
    kurzbeschreibung: "KORODUR hard aggregate (without binder), group A in accordance with DIN 1100, base for NEODUR HE 65 among others",
    beschreibung: "KORODUR hard aggregate without binder in accordance with DIN 1100. Serves as the hard aggregate base for NEODUR HE 65 and as hard aggregate addition for wear-resistant wearing screeds, e.g. with KORODUR FSCem.",
    besonderheiten: ["Hard aggregate without binder", "Hard aggregate base for NEODUR HE 65"],
    technischeDaten: [
      { label: "Hard aggregate group (DIN 1100)", wert: "A" },
      { label: "Grinding wear", wert: "≤ 5 cm³/50 cm²" },
    ],
  },
  "korodur-wh-spezial": {
    kurzbeschreibung: "KORODUR hard aggregate (without binder), group A in accordance with DIN 1100, for heavy-duty industrial floors",
    beschreibung: "Hard aggregate for the production of heavy-duty industrial floors. Hard aggregate base for NEODUR HE 65 SVS 3 and NEODUR HE 65 plus SVS 3. For indoor and outdoor use.",
    besonderheiten: ["Hard aggregate without binder"],
    technischeDaten: [
      { label: "Hard aggregate group (DIN 1100)", wert: "A" },
      { label: "Grinding wear", wert: "≤ 3 cm³/50 cm²" },
    ],
  },
  "korodur-wh-metallisch": {
    kurzbeschreibung: "Metallic KORODUR hard aggregate (group M in accordance with DIN 1100) for armoured screeds and heavy steel-wheel traffic",
    beschreibung: "Metallic hard aggregate for heavy-duty industrial floors, particularly suitable for heavy steel-wheel traffic, pan grinders and hard setting-down of sharp-edged workpieces, for the production of so-called armoured screeds. Base for NEODUR HE 3 metallisch and NEODUR HE 65 metallisch. For indoor and outdoor use.",
    besonderheiten: ["Metallic hard aggregate", "For so-called armoured screeds"],
    technischeDaten: [
      { label: "Hard aggregate group (DIN 1100)", wert: "M" },
      { label: "Grinding wear", wert: "≤ 3 cm³/50 cm²" },
    ],
  },
  "korodur-diamantbeton": {
    kurzbeschreibung: "KORODUR hard aggregate, group KS in accordance with DIN 1100, for the highest possible wear resistance",
    beschreibung: "Hard aggregate for the production of heavy-duty industrial floors with the highest possible wear resistance. Hard aggregate base for NEODUR HE 65 SVS 1,5. For indoor and outdoor use.",
    besonderheiten: ["Highest possible wear resistance (group KS)"],
    technischeDaten: [
      { label: "Hard aggregate group (DIN 1100)", wert: "KS" },
      { label: "Grinding wear", wert: "≤ 1.5 cm³/50 cm²" },
    ],
  },
  "korodur-fscem": {
    kurzbeschreibung: "Cementitious, volume-stable, low-shrinkage rapid screed binder on a ternary basis",
    beschreibung: "KORODUR FSCem is a cementitious, volume-stable, low-shrinkage rapid screed binder on a ternary basis for the production of heavy-duty, quickly usable and ready-to-cover screeds in accordance with DIN 18560 and EN 13813. For quickly coverable cement screeds bonded, on separating layer, on insulation layer and as heated screed, indoors and outdoors. Also suitable for repairing and refurbishing old concrete floors.",
    besonderheiten: ["Ternary binder (screed sand provided on site)", "Quickly coverable", "Wear-resistant wearing screeds can be produced with KORODUR VS 0/5 hard aggregate addition"],
    technischeDaten: [
      { label: "Mixing ratio (CT-C50-F7)", wert: "1:4 parts by weight (75 kg FSCem : 300 kg screed sand A8–B8), w/c approx. 0.42" },
      { label: "Mixing ratio (CT-C40-F6)", wert: "1:5 parts by weight (60 kg FSCem : 300 kg screed sand A8–B8), w/c approx. 0.40" },
      { label: "Residual moisture (CM measurement)", wert: "approx. 5.9 % after 24 h, approx. 1.9 % after 3 days, approx. 1.3 % after 28 days" },
      { label: "Shrinkage class (DIN 18560-1)", wert: "SW 1, low shrinkage (< 0.2 mm/m)" },
    ],
  },
  "korodur-fscem-screed": {
    kurzbeschreibung: "Volume-stable, low-shrinkage rapid screed dry mortar, coverable after 3 days",
    beschreibung: "KORODUR FSCem Screed is a volume-stable, low-shrinkage rapid screed dry mortar on a ternary basis for the production of quickly ready-to-cover screeds for layer thicknesses up to 120 mm in accordance with DIN 18560 and DIN EN 13813. Coverable after just 3 days, must always be covered. Also suitable for repairing and refurbishing old concrete floors.",
    besonderheiten: ["Ready-to-use dry mortar", "Must always be covered", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Grain size", wert: "0–6 mm" },
      { label: "Compressive strength (DIN EN 13892-2)", wert: "approx. 20 N/mm² after 1 day, approx. 40 N/mm² after 28 days" },
      { label: "Flexural strength (DIN EN 13892-2)", wert: "approx. 4 N/mm² after 1 day, approx. 6 N/mm² after 28 days" },
      { label: "Shrinkage class (DIN 18560-1)", wert: "SW 1, low shrinkage (< 0.2 mm/m)" },
      { label: "Coverable", wert: "after 3 days" },
    ],
  },
  "neodur-level-au": {
    kurzbeschreibung: "Rapid-setting, polymer-modified floor levelling compound for 5 to 50 mm",
    beschreibung: "NEODUR Level AU is a cement-bound, mineral, rapid-setting, polymer-modified, thin-layer floor levelling compound for layer thicknesses of 5 to 50 mm. Bonded to cementitious substrates, an ideal substrate for linoleum, textile and PVC floor coverings, laminate, ceramics and natural stone.",
    besonderheiten: ["Levelling layer beneath NEODUR Level", "Priming with KORODUR PC"],
    technischeDaten: [
      { label: "Working time", wert: "approx. 30 minutes at +20 °C" },
      { label: "Walkable", wert: "after approx. 3–4 hours" },
      { label: "Compressive strength", wert: "≥ 33 N/mm² after 28 days" },
      { label: "Consumption", wert: "approx. 1.7 kg/mm/m²" },
    ],
  },
  "rapid-set-levelflor": {
    kurzbeschreibung: "Rapid-setting, self-levelling compound based on Rapid Set cement technology for indoor and outdoor use",
    beschreibung: "Rapid Set LevelFlor is a self-levelling compound based on special cement technology for indoor and outdoor use in residential and industrial construction. A final top layer can be applied after 6 to 16 hours (at +20 °C). Suitable for new construction and refurbishment, must always be covered.",
    besonderheiten: ["Rapid Set cement technology", "Self-levelling", "Must always be covered"],
    technischeDaten: [
      { label: "Working time", wert: "30 min" },
      { label: "Flow time", wert: "15 min" },
      { label: "Compressive strength (ASTM C-109 mod.)", wert: "approx. 20 N/mm² after 25 h, approx. 24 N/mm² after 7 days, approx. 34 N/mm² after 28 days" },
      { label: "Flexural strength (ASTM C-348)", wert: "approx. 7.9 N/mm² after 7 days" },
      { label: "Top layer applicable", wert: "after 6–16 hours (at +20 °C)" },
    ],
  },
  "korodur-hb-5": {
    kurzbeschreibung: "Cement-bound bonding agent for the strong bond of hard aggregate screeds on hardened concrete",
    beschreibung: "KORODUR HB 5 is a ready-to-use, cement-bound bonding agent for the strong bond of KORODUR hard aggregate screeds and cement-bound screeds of all quality classes on hardened concrete. Particularly proven in the KORODUR-KOROTAN industrial floor system, insensitive to substrate moisture.",
    besonderheiten: ["Insensitive to substrate moisture", "For fresh and time-delayed laying techniques"],
    technischeDaten: [
      { label: "Consumption", wert: "approx. 2 kg/m²" },
    ],
  },
  "korodur-txpk": {
    kurzbeschreibung: "Two-component epoxy resin special primer for self-levelling coatings",
    beschreibung: "Two-component epoxy resin special primer for self-levelling coatings such as TRU Self-Leveling, LevelFlor and NEODUR Level, and for priming concrete and screed surfaces where subsequent moisture exposure from the rear must be expected.",
    besonderheiten: ["Two-component", "Suitable where moisture acts from the rear"],
    technischeDaten: [
      { label: "Consumption", wert: "approx. 400–500 g/m² depending on substrate roughness" },
    ],
  },
  "korodur-durop": {
    kurzbeschreibung: "Synthetic hard aggregate as filler and broadcast material for synthetic resin coatings and screeds",
    beschreibung: "Synthetic hard aggregates of the KORODUR DUROP product system are mainly used as filler and broadcast material for synthetic resin coatings and synthetic resin screeds. DUROP improves grip and reduces rolling noise; in road construction, more than 1.5 million m² of motorway sections have already been executed as resin-bound thin coatings with DUROP.",
    besonderheiten: ["Wear-resistant, slip-resistant, polish-resistant"],
    technischeDaten: [
      { label: "Mohs hardness", wert: "8" },
    ],
    varianten: [
      { name: "DUROP 0,5/1", hinweis: "Grain size 0.5–1 mm" },
      { name: "DUROP 1/2", hinweis: "Grain size 1–2 mm" },
      { name: "DUROP 2/3", hinweis: "Grain size 2–3 mm" },
      { name: "DUROP 2/5", hinweis: "Grain size 2–5 mm" },
    ],
  },
  "korodur-robust": {
    kurzbeschreibung: "Synthetic hard aggregate (grain size 0–3 mm) as filler and broadcast material for synthetic resin systems",
    beschreibung: "With the KORODUR DUROP and KORODUR Robust product systems, suitable filler and broadcast materials are available for high-quality synthetic resin coatings and screeds.",
    technischeDaten: [
      { label: "Grain size", wert: "0–3 mm" },
      { label: "Mohs hardness", wert: "7" },
    ],
  },
  "korodur-silosystem": {
    kurzbeschreibung: "Site silo with mixing and pumping technology for the economical placement of hard aggregate layers",
    beschreibung: "The KORODUR silo system enables the economical placement of KORODUR hard aggregate layers through efficient working methods: silo-delivered material (e.g. NEODUR HE 65), mixing and pumping technology mounted on the silo, and machine-technical support. No setting up of mixing stations, no packaging disposal, consistent mortar quality.",
    besonderheiten: ["Workable qualities: NEODUR HE 65, HE 65 SVS 3, HE 65 SVS 1,5, HE 40", "Consistent mortar quality, important for coloured finishes"],
    technischeDaten: [
      { label: "Silo unit", wert: "22.5 m³" },
      { label: "Pumping capacity", wert: "approx. 100 l/min (approx. 600 m² in around 1 hour)" },
      { label: "Daily output", wert: "approx. 1,000–2,000 m² (source also cites 1,000–1,500 m²)" },
      { label: "Conveying distance", wert: "up to 80 m" },
    ],
  },
  "korotan": {
    kurzbeschreibung: "Liquid special additive with plasticising and stabilising effect for KORODUR-KOROTAN industrial floors",
    beschreibung: "KOROTAN is used as a processing aid: for single-layer KORODUR hard aggregate screeds on fresh or hardened base concrete, for all two-layer systems, and as an additive for screeds of all kinds.",
    besonderheiten: ["Plasticising and stabilising effect", "Specifically for KORODUR-KOROTAN industrial floors", "As an additive for screeds of all kinds"],
    technischeDaten: [
      { label: "Form", wert: "green liquid" },
      { label: "Density (20 °C)", wert: "1.13 g/cm³" },
      { label: "pH value", wert: "approx. 9" },
      { label: "Dosage", wert: "up to approx. 1–2 % of cement weight" },
    ],
  },
  "korodur-easyfinish": {
    kurzbeschreibung: "Liquid, solvent-free, ready-to-use finishing aid for NEODUR HE 60 rapid and KOROCRETE",
    beschreibung: "KORODUR easyFinish is sprayed onto the pan-floated NEODUR HE 60 rapid or KOROCRETE surface before the first blade finishing and worked in. The finishing process is made easier, the surface is additionally enhanced, density is increased and protection against chemical attack is improved.",
    besonderheiten: ["Solvent-free and ready to use", "Makes the finishing process easier", "Increases density and protection against chemical attack"],
    technischeDaten: [
      { label: "Form", wert: "liquid" },
      { label: "Colour", wert: "bluish" },
    ],
  },
  "korodur-nanofinish": {
    kurzbeschreibung: "Liquid, ready-to-use nano-silica for finishing KORODUR industrial floors",
    beschreibung: "KORODUR nanoFinish slows moisture loss and extends working time: surface finishing during power trowelling is made easier even under hot, dry and windy conditions. The nano-silica technology locks in moisture during surface finishing, enabling complete hydration with maximum strength development; efflorescence and cracking due to early shrinkage are reduced.",
    besonderheiten: ["Nano-silica technology", "Extends working time during finishing", "Reduces efflorescence and early-shrinkage cracking"],
    technischeDaten: [
      { label: "Form", wert: "liquid" },
      { label: "Colour", wert: "milky cloudy" },
      { label: "pH value", wert: "5" },
    ],
  },
  "korodur-uniprimer": {
    kurzbeschreibung: "Solvent-free, one-component universal primer based on acrylate co-polymer and silicate",
    beschreibung: "KORODUR uniPrimer primes absorbent concrete substrates before coating with cement-bound hard aggregate screeds and reduces the absorbency of dry substrates: time-consuming pre-wetting during industrial floor refurbishment is no longer required. Evaporation of the KORODUR HB 5 or HB 5 rapid bonding agent is minimised and a more uniform hydration of the bonded system is achieved.",
    besonderheiten: ["Solvent-free, one-component, ready to use", "Replaces time-consuming pre-wetting during refurbishment", "Minimises evaporation of the bonding agent"],
    technischeDaten: [
      { label: "Form", wert: "liquid" },
      { label: "Colour", wert: "milky white" },
      { label: "pH value", wert: "11.6" },
    ],
  },
  "koropox": {
    kurzbeschreibung: "Water-emulsifiable, transparent two-component epoxy resin concentrate for impregnating cement-bound floors",
    beschreibung: "KOROPOX increases density and resistance to water, grease, oil, mineral oil, fuel and brake fluids. It is applied in two passes on KOROPLAN, KORODUR and NEODUR industrial floors and cement-bound toppings.",
    besonderheiten: ["Water-emulsifiable and transparent", "Resistant to water, grease, oil, fuel, brake fluids"],
    technischeDaten: [
      { label: "Form", wert: "liquid" },
      { label: "Colour", wert: "colourless" },
      { label: "Density", wert: "1.0 g/cm³" },
      { label: "Consumption", wert: "2 passes, approx. 75–175 g/m² concentrate (comp. A + B)" },
    ],
  },
  "koromineral": {
    kurzbeschreibung: "Liquid, transparent silicate-based impregnation for the surface silicification of mineral building materials",
    beschreibung: "KOROMINERAL impregnates concrete and screed surfaces in storage and production rooms or cold rooms. It is particularly suitable for mineral substrates such as screeds, cement-bound industrial floors, concrete, masonry mortar and cement-bound render, increases density and has a water-repellent effect.",
    besonderheiten: ["Surface silicification of mineral building materials", "Increases density, water-repellent"],
    technischeDaten: [
      { label: "Colour", wert: "transparent" },
      { label: "Density", wert: "approx. 1.12 g/cm³" },
      { label: "pH value", wert: "approx. 11" },
      { label: "Consumption", wert: "approx. 100–200 g/m² (depending on absorbency)" },
    ],
  },
  "koromineral-li": {
    kurzbeschreibung: "Liquid, transparent impregnation based on hybrid lithium silicate with integrated basic stain protection",
    besonderheiten: ["Hybrid lithium silicate", "Integrated basic stain protection"],
    technischeDaten: [
      { label: "Consumption", wert: "approx. 40–100 g/m² (depending on absorbency)" },
    ],
  },
  "koroclean": {
    kurzbeschreibung: "Grinding process for the visual enhancement of cementitious industrial floors (cleaning grind)",
    beschreibung: "KOROCLEAN is a specially developed grinding process for the visual enhancement of KORODUR industrial floors and other cementitious industrial floors. After treatment the floor is easier to clean and maintain, and colour irritations are reduced: a technically and economically sensible alternative to conventional final construction cleaning before commissioning.",
    besonderheiten: ["Improves appearance, safety and slip resistance", "Dust-free, easy-to-clean surface", "Also recommended for KORODUR design floors"],
    technischeDaten: [
      { label: "Process", wert: "Mechanical cleaning grind (MKS Funke Schleiftechnik system)" },
    ],
  },
  "system-korodur-korotan": {
    kurzbeschreibung: "Industrial floor system: single-layer bonded hard aggregate screed with bonding agent, nominal thickness 15 mm on average",
    beschreibung: "KORODUR-KOROTAN industrial flooring is a cement-bound KORODUR hard aggregate screed laid as a single bonded layer with bonding agent on hardened base concrete at a nominal thickness of 15 mm on average. It is laid largely without joints; in combination with the KORODUR HB 5 bonding agent, a strong bond is created. One of three KORODUR refurbishment systems for industrial floors.",
    besonderheiten: ["Purely mineral", "Largely jointless", "Refurbishment system for industrial floors"],
    technischeDaten: [
      { label: "Structure", wert: "single-layer bonded with bonding agent (KORODUR HB 5) on hardened base concrete" },
    ],
  },
  "granidur": {
    kurzbeschreibung: "Ground, decorative exposed screed with granite or terrazzo appearance",
    beschreibung: "GRANIDUR 05 and GRANIDUR 08 are factory-made, ready-to-use, coloured dry materials for the production of ground, decorative screeds in a layer thickness of 15 to max. 70 mm, depending on the construction. The final granite or terrazzo appearance can range from matt to glossy. Laid in one or two layers in accordance with DIN 18560-2, -3 (bonded with KORODUR HB 5 bonding agent) and -4.",
    besonderheiten: ["Available colours: cement grey, light grey, basalt grey, anthracite, beige, red, olive", "Appearance can be ground from matt to glossy", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Compressive strength (GRANIDUR 05)", wert: "45 N/mm²" },
      { label: "Flexural strength (GRANIDUR 05)", wert: "6 N/mm²" },
      { label: "Compressive strength (GRANIDUR 08)", wert: "35 N/mm²" },
      { label: "Flexural strength (GRANIDUR 08)", wert: "5 N/mm²" },
    ],
    varianten: [
      { name: "GRANIDUR 05", qualitaetsklasse: "CT-C45-F6", hinweis: "Grain size 0–5 mm, layer thickness 15–25 mm" },
      { name: "GRANIDUR 08", qualitaetsklasse: "CT-C35-F5", hinweis: "Grain size 0–8 mm, layer thickness 25–50 mm" },
    ],
  },
  "granidur-bianco-nero": {
    kurzbeschreibung: "Ground, decorative exposed screed in white (BIANCO) or black (NERO), average layer thickness 15 mm",
    beschreibung: "GRANIDUR BIANCO and GRANIDUR NERO are factory-made, ready-to-use dry materials for the production of ground, decorative screeds at an average layer thickness of 15 mm. Laid in a single layer in accordance with DIN 18560-3 as a bonded screed with KORODUR HB 5 bonding agent.",
    besonderheiten: ["Pure white or deep black ground finish", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Grain size", wert: "0–5 mm" },
      { label: "Compressive strength", wert: "45 N/mm²" },
      { label: "Flexural strength", wert: "6 N/mm²" },
    ],
    varianten: [
      { name: "GRANIDUR BIANCO" },
      { name: "GRANIDUR NERO" },
    ],
  },
  "kcf": {
    kurzbeschreibung: "Power-trowelled, decorative exposed screed with cloudy, marbled appearance",
    beschreibung: "KCF 05 and KCF 08 are factory-made, ready-to-use, coloured dry materials for the production of power-trowelled, decorative screeds in a layer thickness of 15 to max. 70 mm, depending on the construction. The cement-bound, trowelled exposed screed was developed in the late 1990s together with the Italian architect and designer Alessandro Copetti. Laid in one or two layers in accordance with DIN 18560-2, -3 (bonded with KORODUR HB 5 bonding agent) and -4.",
    besonderheiten: ["Available colours: cement grey, light grey, basalt grey, anthracite, beige, red, olive", "Surface treatment with KOROCLEAN", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Grinding wear", wert: "≤ 5 cm³/50 cm²" },
      { label: "Compressive strength (KCF 05)", wert: "45 N/mm²" },
      { label: "Flexural strength (KCF 05)", wert: "6 N/mm²" },
      { label: "Compressive strength (KCF 08)", wert: "35 N/mm²" },
      { label: "Flexural strength (KCF 08)", wert: "5 N/mm²" },
    ],
    varianten: [
      { name: "KCF 05", qualitaetsklasse: "CT-C45-F6-A5", hinweis: "Grain size 0–5 mm, layer thickness 15–25 mm" },
      { name: "KCF 08", qualitaetsklasse: "CT-C35-F5-A5", hinweis: "Grain size 0–8 mm, layer thickness 25–50 mm" },
      { name: "KCF 05 rapid", hinweis: "rapid-setting, volume-stable binder on a ternary basis" },
    ],
  },
  "tru-pc": {
    kurzbeschreibung: "Self-levelling, mineral exposed screed with ground concrete appearance (Rapid Set technology)",
    beschreibung: "Rapid Set TRU PC is a self-levelling, mineral exposed screed based on special cement technology, developed to simulate the appearance of ground concrete. Ideal where early strength, durability and low-shrinkage curing are required: workable for up to 20 minutes, walkable after 2 to 3 hours. The decorative aggregate (up to 2.5 mm) is already included.",
    besonderheiten: ["Ground concrete appearance, decorative aggregate up to 2.5 mm included", "Customisable in various colour variants", "For indoor and outdoor use, including wet areas"],
    technischeDaten: [
      { label: "Compressive strength (ASTM C-109 mod.)", wert: "approx. 19 N/mm² after 4 h, approx. 34 N/mm² after 1 day, approx. 48 N/mm² after 28 days" },
      { label: "Working time", wert: "approx. 20 minutes" },
      { label: "Flow time", wert: "approx. 15 minutes" },
      { label: "Material consumption", wert: "approx. 1.8 kg per m² and mm of layer thickness" },
      { label: "Colour", wert: "natural grey" },
    ],
  },
  "tru-sp": {
    kurzbeschreibung: "Self-levelling, mineral exposed screed with salt-and-pepper appearance (Rapid Set technology)",
    beschreibung: "Rapid Set TRU SP is a self-levelling, mineral exposed screed based on special cement technology, developed to simulate the appearance of ground concrete with a salt-and-pepper look. Ideal where early strength, durability and low-shrinkage curing are required: workable for up to 20 minutes, walkable after 2 to 3 hours.",
    besonderheiten: ["Salt-and-pepper appearance", "Customisable in various colour variants", "For indoor and outdoor use, including wet areas"],
    technischeDaten: [
      { label: "Compressive strength (ASTM C-109 mod.)", wert: "approx. 13 N/mm² after 4 h, approx. 27 N/mm² after 1 day, approx. 44 N/mm² after 28 days" },
      { label: "Working time", wert: "approx. 20 minutes" },
      { label: "Flow time", wert: "approx. 15 minutes" },
      { label: "Material consumption", wert: "approx. 1.8 kg per m² and mm of layer thickness" },
      { label: "Colour", wert: "natural grey" },
    ],
  },
  "microtop-tw-3": {
    kurzbeschreibung: "Cement spray mortar applied by the dry spray process for reprofiling and coating in the drinking water sector",
    beschreibung: "MICROTOP TW 3 is applied by the dry spray process and is used for reprofiling and coating surfaces as well as for increasing concrete cover and finishing in the drinking water sector. The materials are applied in a single layer and can easily be floated and trowelled; small jobs can be carried out by hand.",
    besonderheiten: ["Purely mineral, microsilica-enhanced", "Low porosity, impermeable to water", "Can be floated and trowelled", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Grain size", wert: "0–3 mm" },
      { label: "Compressive strength (28 d)", wert: "≥ 45 N/mm²" },
      { label: "Total porosity (90 d)", wert: "≤ 10 vol.%" },
    ],
  },
  "microtop-tw-5": {
    kurzbeschreibung: "Microsilica-enhanced cement spray mortar applied by the dry spray process for drinking water reservoirs",
    beschreibung: "MICROTOP TW 5 is a purely mineral, hydraulically setting, microsilica-enhanced cement spray mortar for reprofiling, levelling and coating surfaces in drinking water reservoirs. Applied by the dry spray process (thin-stream process), also for increasing concrete cover and finishing. Complies with DVGW worksheets W 270, W 300 and W 347.",
    besonderheiten: ["Purely mineral, hydraulically setting, microsilica-enhanced", "Single-layer application, can be floated and trowelled", "Small jobs possible by hand"],
    technischeDaten: [
      { label: "Grain size", wert: "0–5 mm" },
      { label: "Compressive strength", wert: "≥ 45 N/mm²" },
      { label: "Density", wert: "2.25 kg/dm³" },
      { label: "Total porosity (90 d)", wert: "≤ 10 vol.%" },
    ],
  },
  "microtop-tw-8": {
    kurzbeschreibung: "Microsilica-enhanced cement spray concrete (C30/37) applied by the dry spray process for the drinking water sector",
    beschreibung: "MICROTOP TW 8 is a hydraulically setting, microsilica-enhanced cement spray concrete for the drinking water sector, applied in accordance with DIN 18551. The strength class C30/37 concrete is used for producing sprayed concrete by the dry spray process, for reprofiling break-outs and for increasing concrete cover. Complies with DVGW worksheets W 270, W 300 and W 347.",
    besonderheiten: ["Strength class C30/37", "Microsilica-enhanced, hydraulically setting", "Can be floated and trowelled, small jobs possible by hand"],
    technischeDaten: [
      { label: "Grain size", wert: "0–8 mm" },
      { label: "Compressive strength", wert: "≥ 45 N/mm²" },
      { label: "Density", wert: "2.27 kg/dm³" },
      { label: "Total porosity (90 d)", wert: "≤ 10 vol.%" },
    ],
  },
  "microtop-tw-nsm": {
    kurzbeschreibung: "Spray mortar applied by the wet spray process for reprofiling and coating in the drinking water sector",
    beschreibung: "MICROTOP TW NSM is applied by the wet spray process and is used for reprofiling and coating surfaces as well as for increasing concrete cover and finishing in the drinking water sector. The materials can easily be floated and trowelled; small jobs can be carried out by hand in conjunction with a bonding agent.",
    besonderheiten: ["Can be floated and trowelled", "Hand application of small jobs possible with bonding agent"],
    technischeDaten: [
      { label: "Layer thickness", wert: "approx. 20 mm in one pass" },
      { label: "Process", wert: "Wet spraying (dense-stream conveying, low dust generation)" },
    ],
    varianten: [
      { name: "MICROTOP TW NSM blau" },
    ],
  },
  "microtop-tw-02": {
    kurzbeschreibung: "Spray mortar applied by the wet spray dense-stream process with extremely low pore volume",
    beschreibung: "MICROTOP TW 02 is applied by the wet spray dense-stream process and is used for coating surfaces as well as for increasing concrete cover and finishing in the drinking water sector. The product has an extremely low pore volume and can also be used as corrosion protection and bonding agent.",
    besonderheiten: ["Extremely low pore volume", "Can also be used as corrosion protection and bonding agent"],
    technischeDaten: [
      { label: "Layer thickness (lining of pipes/reservoirs)", wert: "5–8 mm" },
      { label: "Layer thickness (corrosion protection/bonding agent)", wert: "2–5 mm" },
      { label: "Process", wert: "Spinning, spraying, trowel application, hand application" },
    ],
  },
  "microtop-tw-vsm": {
    kurzbeschreibung: "Pre-spray mortar (bonding layer) for the interior lining and repair of drinking water reservoirs and masonry",
    beschreibung: "MICROTOP TW VSM is used for the interior lining and repair of new as well as old drinking water reservoirs and masonry. Thanks to its special composition it has excellent working and performance properties and can easily be floated and trowelled.",
    besonderheiten: ["Also suitable for masonry", "Can be floated and trowelled"],
    technischeDaten: [
      { label: "Layer thickness", wert: "15–20 mm" },
      { label: "Process", wert: "Spraying, hand application" },
    ],
  },
  "microtop-tw-bm": {
    kurzbeschreibung: "Special mortar for the interior coating of drinking water pipes and reservoirs, also as bonding agent",
    beschreibung: "MICROTOP TW BM is a factory-made, ready-to-use special mortar for the interior coating of drinking water pipes and reservoirs as well as other trades. It can easily be applied by spinning, spraying or by hand, can also be used as a bonding agent for floor coatings and as corrosion protection, and is supplied in natural and white. Complies with DVGW worksheets W 270, W 300 and W 347.",
    besonderheiten: ["Spinning, spray and hand application", "Can also be used as bonding agent and corrosion protection", "Available in natural and white"],
    technischeDaten: [
      { label: "Grain size", wert: "0–1 mm" },
      { label: "Compressive strength", wert: "35 N/mm²" },
      { label: "Flexural strength", wert: "6.3 N/mm²" },
      { label: "Colours", wert: "natural, white" },
      { label: "Layer thickness (lining of pipes/reservoirs)", wert: "5–8 mm" },
      { label: "Layer thickness (corrosion protection/bonding agent)", wert: "2–5 mm" },
    ],
    varianten: [
      { name: "MICROTOP TW BM weiß" },
      { name: "MICROTOP TW BM blau" },
    ],
  },
  "microtop-tw-mineral": {
    kurzbeschreibung: "Liquid silicate-based building protection agent for consolidation and surface sealing",
    beschreibung: "MICROTOP TW Mineral consolidates mineral building materials and porous substrates through a chemical reaction with the binders and aggregates of the substrate (silicification reaction) and improves the structure while sealing the surface at the same time. Serves as impregnation in the MICROTOP system.",
    besonderheiten: ["Silicification reaction with the substrate", "Consolidation and sealing in one pass", "Impregnation for all MICROTOP TW mortars"],
    technischeDaten: [
      { label: "Form", wert: "liquid" },
      { label: "Colour", wert: "transparent" },
      { label: "Density", wert: "approx. 1.14 g/cm³" },
      { label: "pH value", wert: "approx. 11.3" },
    ],
  },
  "neodur-vm-1": {
    kurzbeschreibung: "Grouting mortar for grouting cross-sections of 5 to 20 mm",
    beschreibung: "Assembly and grouting mortars create a strong bond between concrete and steel components. NEODUR VM 1 is designed for grouting cross-sections of 5 to 20 mm.",
    besonderheiten: ["Strong bond between concrete and steel components", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Grouting cross-section", wert: "5–20 mm" },
    ],
  },
  "neodur-vm-3": {
    kurzbeschreibung: "Grouting mortar for grouting cross-sections of 10 to 50 mm",
    beschreibung: "Assembly and grouting mortars create a strong bond between concrete and steel components. NEODUR VM 3 is designed for grouting cross-sections of 10 to 50 mm.",
    besonderheiten: ["Strong bond between concrete and steel components"],
    technischeDaten: [
      { label: "Grouting cross-section", wert: "10–50 mm" },
    ],
  },
  "neodur-vm-5": {
    kurzbeschreibung: "Grouting concrete (C80/95) for grouting cross-sections up to 200 mm, tested in accordance with DIN EN 1504-3 (R4)",
    beschreibung: "Assembly and grouting concrete for large grouting cross-sections up to 200 mm. Tested in accordance with DIN EN 1504-3 (class R4) and the DAfStb-Richtlinie for cement-bound grouting concrete and grouting mortar.",
    besonderheiten: ["For structurally relevant applications (R4)", "DAfStb-Richtlinie (SKVB I)"],
    technischeDaten: [
      { label: "Grouting cross-section", wert: "up to 200 mm" },
    ],
  },
  "neodur-vb-8": {
    kurzbeschreibung: "Grouting concrete for grouting cross-sections over 50 mm",
    beschreibung: "Assembly and grouting concrete for grouting cross-sections over 50 mm. Creates a strong bond between concrete and steel components.",
    besonderheiten: ["Strong bond between concrete and steel components"],
    technischeDaten: [
      { label: "Grouting cross-section", wert: "over 50 mm" },
    ],
  },
  "neodur-vm-basic": {
    kurzbeschreibung: "Mineral, highly flowable expansive grouting concrete, DVGW-tested for the drinking water sector",
    beschreibung: "NEODUR VM basic is a mineral, highly flowable expansive grouting concrete for force-fitting grouting work and assemblies of all kinds, e.g. pipe grouting in drinking water installations. Tested in accordance with DVGW worksheet W 347 for hygienic requirements in the drinking water sector.",
    besonderheiten: [
      "Low shrinkage, normal setting",
      "Freeze-thaw salt resistant",
      "Impermeable to water, chloride-free",
      "DAfStb-Richtlinie (SKVB II)",
    ],
    technischeDaten: [
      { label: "Grain size", wert: "0–5 mm" },
      { label: "Application", wert: "Mixing + pumping / pouring" },
      { label: "Delivery form", wert: "25 kg packs" },
    ],
  },
  "neodur-svm-03": {
    kurzbeschreibung: "Rapid grouting mortar for grouting cross-sections of 5 to 20 mm",
    beschreibung: "Rapid-setting grouting mortar for grouting cross-sections of 5 to 20 mm. Creates a strong bond between concrete and steel components where rapid return to service is required.",
    besonderheiten: ["Rapid setting", "Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Grouting cross-section", wert: "5–20 mm" },
    ],
  },
  "neodur-am-super": {
    kurzbeschreibung: "Anchor mortar for rock anchors of all kinds in mining and tunnelling",
    beschreibung: "Anchor mortars are used in conjunction with rock anchors of all kinds in mining and tunnelling. NEODUR AM Super is a mineral factory-made dry mortar with a grain size of 0 to 1 mm.",
    besonderheiten: ["For rock anchors of all kinds"],
    technischeDaten: [
      { label: "Grain size", wert: "0–1 mm" },
    ],
  },
  "neodur-am-plus": {
    kurzbeschreibung: "Anchor mortar for rock anchors of all kinds in mining and tunnelling",
    beschreibung: "Anchor mortars are used in conjunction with rock anchors of all kinds in mining and tunnelling. NEODUR AM Plus is a mineral factory-made dry mortar with a grain size of 0 to 1 mm.",
    besonderheiten: ["For rock anchors of all kinds"],
    technischeDaten: [
      { label: "Grain size", wert: "0–1 mm" },
    ],
  },
  "neodur-msm-3": {
    kurzbeschreibung: "Spray mortar for concrete repair, grain size 0 to 3 mm",
    beschreibung: "Concrete repair comprises technologies for restoring concrete components. NEODUR MSM 3 is a mineral spray mortar with a grain size of 0 to 3 mm, applied in accordance with DIN 18551 in conjunction with DIN EN 14487.",
    besonderheiten: ["Environmental Product Declaration (group EPD) available"],
    technischeDaten: [
      { label: "Grain size", wert: "0–3 mm" },
    ],
  },
  "neodur-msm-5": {
    kurzbeschreibung: "Spray mortar for concrete repair, grain size 0 to 5 mm",
    beschreibung: "Concrete repair comprises technologies for restoring concrete components. NEODUR MSM 5 is a mineral spray mortar with a grain size of 0 to 5 mm.",
    technischeDaten: [
      { label: "Grain size", wert: "0–5 mm" },
    ],
  },
  "neodur-msb-8": {
    kurzbeschreibung: "Sprayed concrete for concrete repair, grain size 0 to 8 mm",
    beschreibung: "Concrete repair comprises technologies for restoring concrete components. NEODUR MSB 8 is a mineral sprayed concrete with a grain size of 0 to 8 mm.",
    technischeDaten: [
      { label: "Grain size", wert: "0–8 mm" },
    ],
  },
  "rapid-set-concrete-mix": {
    kurzbeschreibung: "Rapid-setting rapid concrete for installation thicknesses of 50 to 600 mm, load-bearing after 1 hour",
    beschreibung: "CONCRETE MIX is a rapid-setting, easy-to-work repair mortar based on Rapid Set cement with specially selected mineral aggregates. Ideal where rapid strength development, durability and low-shrinkage curing are required. Workable in thicknesses of 50 to 600 mm, also in wet rooms; non-metallic and without chloride additives.",
    besonderheiten: ["Installation thicknesses up to 600 mm in one pass", "Non-metallic, without chloride additives", "Suitable for wet rooms"],
    technischeDaten: [
      { label: "Grain size", wert: "0–8 mm" },
      { label: "Setting begins", wert: "after 15 min" },
      { label: "Load-bearing", wert: "after 60 min" },
      { label: "Compressive strength", wert: "19 N/mm² after 60 min, 41 N/mm² after 28 days" },
      { label: "Flexural strength", wert: "4.5 N/mm² after 60 min, 7 N/mm² after 28 days" },
      { label: "Freeze-thaw salt resistance", wert: "yes" },
      { label: "Sulfate resistance", wert: "yes" },
    ],
  },
  "rapid-set-concrete-pharmacy": {
    kurzbeschreibung: "Additive system for controlling the working properties of Rapid Set products",
    beschreibung: "The CONCRETE PHARMACY comprises three additives for controlling the working properties of Rapid Set products: SET Control delays setting and extends working time, FLOW Control improves flowability and reduces mixing water demand by 20 to 40 percent, FAST accelerates the setting time of CEMENT ALL, MORTAR MIX and CONCRETE MIX, ideal in cold temperatures.",
    besonderheiten: ["Works with CEMENT ALL, MORTAR MIX and CONCRETE MIX", "FLOW Control: 20–40 % less mixing water at the same flow spread"],
    varianten: [
      { name: "SET Control", hinweis: "Retarder for longer working time" },
      { name: "FLOW Control", hinweis: "Plasticiser, increases strengths" },
      { name: "FAST Control", hinweis: "Accelerator for cold temperatures" },
    ],
  },
  "goodcat-golden-nature": {
    kurzbeschreibung: "Bentonite clumping litter with brown granules, high odour binding and extra-strong clump formation",
    beschreibung: "goodcat clumping litter is untreated and a 100 % pure natural product. golden nature: brown granules, high odour binding, extra-strong clump formation, low-dust and untreated.",
    besonderheiten: ["100 % pure natural product", "Low-dust and untreated", "Extra-strong clump formation"],
    technischeDaten: [
      { label: "Pack size", wert: "7 litres" },
    ],
  },
  "goodcat-organic-love": {
    kurzbeschreibung: "Clumping litter made from 100 % plant fibres with high odour binding",
    beschreibung: "goodcat clumping litter is untreated and a 100 % pure natural product. organic love: 100 % plant fibres, high odour binding, good clump formation, low-dust and untreated.",
    besonderheiten: ["100 % plant fibres", "Low-dust and untreated", "Good clump formation"],
    technischeDaten: [
      { label: "Pack size", wert: "8 litres" },
    ],
  },
  "goodcat-silver-classic": {
    kurzbeschreibung: "Bentonite clumping litter with classic white granules and high odour binding",
    beschreibung: "goodcat clumping litter is untreated and a 100 % pure natural product. silver classic: classic white granules, high odour binding, extra-strong clump formation, low-dust and untreated.",
    besonderheiten: ["100 % pure natural product", "Low-dust and untreated", "Extra-strong clump formation"],
    technischeDaten: [
      { label: "Pack size", wert: "7 litres" },
    ],
  },
};

/** Spanish translations for product data */
export const produkteES: Record<string, {
  kurzbeschreibung?: string;
  beschreibung?: string;
  besonderheiten?: string[];
  technischeDaten?: { label: string; wert: string }[];
  varianten?: { name: string; qualitaetsklasse?: string; hinweis?: string }[];
}> = {
  "neodur-he-60-rapid": {
    kurzbeschreibung: "Solera rápida de áridos duros de altas prestaciones",
    besonderheiten: ["Alta resistencia a la abrasión", "Resistente a productos químicos", "Endurecimiento rápido", "Baja retracción"],
    technischeDaten: [
      { label: "Resistencia a compresión", wert: "≥ 60 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "≥ 8 N/mm²" },
      { label: "Resistencia al desgaste", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Transitable tras", wert: "aprox. 3 h" },
      { label: "Plenamente cargable tras", wert: "aprox. 24 h" },
    ],
    varianten: [
      { name: "NEODUR HE 60 rapid SVS 3", qualitaetsklasse: "CT-C60-F8-A3" },
      { name: "NEODUR HE 60 rapid SVS 1,5", qualitaetsklasse: "CT-C60-F8-A1,5" },
      { name: "NEODUR HE 60 rapid metallisch", qualitaetsklasse: "CT-C60-F8-A3", hinweis: "Grupo de áridos duros M" },
    ],
  },
  "neodur-he-65": {
    kurzbeschreibung: "Solera de áridos duros de altas prestaciones",
    besonderheiten: ["Máxima resistencia al desgaste", "Aplicable con sistema de silo", "Económica en grandes superficies", "Unión adherente al soporte"],
    technischeDaten: [
      { label: "Resistencia a compresión", wert: "≥ 70 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "≥ 9 N/mm²" },
      { label: "Resistencia al desgaste", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Aplicación", wert: "Sistema de silo / técnica de bombeo" },
      { label: "Espesor de capa", wert: "DIN 18560-7: A 15/10/8 mm · KS 6/5/4 mm" },
    ],
    varianten: [
      { name: "NEODUR HE 65 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 65 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Grupo de áridos duros KS" },
      { name: "NEODUR HE 65 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 65 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Grupo de áridos duros M" },
    ],
  },
  "neodur-he-65-plus": {
    kurzbeschreibung: "Solera de áridos duros de altas prestaciones",
    besonderheiten: ["Aplicable sin puente de adherencia", "Resistente a heladas y sales de deshielo", "Conforme a la WHG", "Modificada con polímeros y reforzada con fibras"],
    technischeDaten: [
      { label: "Resistencia a compresión", wert: "≥ 70 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "≥ 9 N/mm²" },
      { label: "Resistencia al desgaste", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Resistente a heladas y sales de deshielo", wert: "Sí" },
      { label: "Puente de adherencia necesario", wert: "No" },
    ],
    varianten: [
      { name: "NEODUR HE 65 plus SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
    ],
  },
  "neodur-he-40": {
    kurzbeschreibung: "Solera de áridos duros de altas prestaciones",
    besonderheiten: ["Alta resistencia al desgaste", "Unión adherente (DIN 18560-7)", "Solución económica de áridos duros", "Para interiores y exteriores"],
    technischeDaten: [
      { label: "Resistencia a compresión", wert: "≥ 40 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "≥ 6 N/mm²" },
      { label: "Resistencia al desgaste", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Espesor de capa", wert: "8–15 mm fresco sobre fresco; 15–35 mm adherido; HE 40/8 25–50 mm" },
    ],
    varianten: [
      { name: "NEODUR HE 40/8", qualitaetsklasse: "CT-C40-F7-A6" },
    ],
  },
  "neodur-level": {
    kurzbeschreibung: "Solera de capa fina autonivelante y de endurecimiento rápido",
    besonderheiten: ["Autonivelante: muy buena planeidad", "Rápida puesta en servicio", "Árido de desgaste integrado", "Aplicable a máquina"],
    technischeDaten: [
      { label: "Resistencia a compresión", wert: "≥ 40 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "F8" },
      { label: "Resistencia al desgaste", wert: "AR 0,5" },
      { label: "Autonivelante", wert: "Sí" },
      { label: "Planeidad", wert: "DIN 18202, línea 3" },
      { label: "Apto para cargas ligeras tras", wert: "aprox. 24 h" },
      { label: "Plenamente cargable tras", wert: "aprox. 3 días" },
    ],
  },
  "tru-self-leveling": {
    kurzbeschreibung: "Solera vista decorativa, autonivelante y pulida",
    beschreibung: "Rapid Set TRU Self-Leveling es una solera vista mineral, autonivelante y pulida, basada en una tecnología especial de cemento. Ideal cuando se exigen resistencia temprana, durabilidad y un endurecimiento de baja retracción: trabajable hasta 20 minutos, transitable tras 2 a 3 horas y pulible hasta un acabado de alto brillo ya 24 horas después de su colocación. Personalizable con distintas variantes de color y con árido decorativo espolvoreado (p. ej. vidrio, mármol).",
    besonderheiten: ["Aspecto de hormigón orientado al diseño", "Superficie sin juntas", "Sin puente de adherencia", "Pulible hasta alto brillo", "Higiénica y fácil de mantener"],
    technischeDaten: [
      { label: "Resistencia a compresión", wert: "≥ 40 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "≥ 10 N/mm²" },
      { label: "Aspecto", wert: "Superficie de solera vista similar al hormigón" },
      { label: "Aplicación", wert: "Autonivelante" },
      { label: "Puente de adherencia", wert: "No necesario" },
      { label: "Transitable tras", wert: "aprox. 2–3 h" },
      { label: "Plenamente cargable tras", wert: "aprox. 24 h" },
    ],
  },
  "korodur-hb-5-rapid": {
    kurzbeschreibung: "Puente de adherencia de endurecimiento rápido para una unión adherente con el soporte",
    besonderheiten: ["Endurecimiento rápido", "Altos valores de adherencia a tracción", "Aplicación fresco sobre fresco"],
    technischeDaten: [
      { label: "Adherencia a tracción", wert: "≥ 1,5 N/mm²" },
      { label: "Tiempo de trabajabilidad", wert: "aprox. 15 min" },
      { label: "Recubrible tras", wert: "fresco sobre fresco" },
    ],
  },
  "korodur-pc": {
    kurzbeschreibung: "Imprimación de dispersión de resina sintética para sistemas de solera de capa fina",
    besonderheiten: ["Específica para sistemas de solera de capa fina", "Modificada con polímeros"],
    technischeDaten: [
      { label: "Adherencia a tracción", wert: "≥ 1,0 N/mm²" },
      { label: "Aplicación", wert: "Para NEODUR Level" },
      { label: "Consumo", wert: "50–200 g/m²" },
    ],
  },
  "rapid-set-cement-all": {
    kurzbeschreibung: "Mortero de reparación rápida universal",
    beschreibung: "Rapid Set CEMENT ALL es un mortero de reparación rápida mineral y multifuncional, basado en una tecnología especial de cemento, compuesto por cemento Rapid Set de altas prestaciones y arena de grano fino. Endurece rápidamente, es duradero y de retracción neutra; inicio de fraguado tras aprox. 15 minutos, cargable en aprox. 1 hora. Se amasa solo con agua y alcanza resistencia estructural en una hora. Visualmente comparable a los materiales de cemento Portland y de aplicación similar.",
    besonderheiten: ["Tiempo de endurecimiento ultracorto", "Alta resistencia inicial", "Utilizable en interiores y exteriores", "Retracción compensada"],
    technischeDaten: [
      { label: "Calidad", wert: "C55/67" },
      { label: "Resistencia a compresión (60 min)", wert: "> 20 N/mm²" },
      { label: "Resistencia a compresión (28 d)", wert: "> 62 N/mm²" },
      { label: "Espesores de aplicación habituales", wert: "suelo 10–100 mm; techo 5–10 mm; pared 5–15 mm" },
      { label: "Transitable tras", wert: "aprox. 15 min" },
      { label: "Plenamente cargable tras", wert: "aprox. 1 h" },
    ],
    varianten: [
      { name: "Rapid Set CEMENT ALL Plus", qualitaetsklasse: "C55/67" },
    ],
  },
  "rapid-set-mortar-mix": {
    kurzbeschreibung: "Mortero de reparación rápida universal",
    beschreibung: "Rapid Set MORTAR MIX es una mezcla de cemento Rapid Set de altas prestaciones con arena de cuarzo de granulometría escalonada. Endurece rápidamente, es duradero y de retracción neutra; puede aplicarse en horizontal, en vertical y en techo. Se amasa solo con agua y alcanza resistencia estructural en una hora. Utilizable en interiores y exteriores, también en zonas húmedas.",
    besonderheiten: ["Retracción neutra", "No requiere puente de adherencia", "Consistencia ajustable de pastosa a firme", "Se amasa solo con agua"],
    technischeDaten: [
      { label: "Calidad", wert: "C45/55" },
      { label: "Resistencia a compresión (60 min)", wert: "> 17 N/mm²" },
      { label: "Resistencia a compresión (28 d)", wert: "> 50 N/mm²" },
      { label: "Espesores de aplicación habituales", wert: "suelo 10–150 mm; techo 15 mm de media; pared 20 mm de media" },
      { label: "Trabajabilidad", wert: "de pastoso a plástico" },
      { label: "Plenamente cargable tras", wert: "aprox. 1 h" },
    ],
  },
  "rapid-set-mortar-mix-dur": {
    kurzbeschreibung: "Mortero de reparación rápida con árido duro DIN 1100 A",
    besonderheiten: ["Árido de desgaste integrado DIN 1100 A", "Apto para juntas sometidas a cargas pesadas", "Retracción neutra", "Consistencia pastosa ajustable"],
    technischeDaten: [
      { label: "Calidad", wert: "C45/55 + DIN 1100 A" },
      { label: "Resistencia a compresión (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Resistencia a compresión (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Trabajabilidad", wert: "de pastoso a plástico" },
      { label: "Plenamente cargable tras", wert: "aprox. 1 h" },
    ],
  },
  "asphalt-repair-mix": {
    kurzbeschreibung: "Material de reparación rápida para superficies asfálticas",
    beschreibung: "Rapid Set ASPHALT REPAIR MIX es un material de reparación de base cemento, modificado con polímeros: de alta resistencia, con bajas tensiones y de endurecimiento rápido. Combina la rapidez de la mezcla en frío con la durabilidad del asfalto en caliente: abrir el saco, añadir agua, mezclar e instalar. Sin fresadora, sin rodillo, sin puente de adherencia; cargable tras aprox. 30 minutos, plenamente cargable tras aprox. 1 hora, incluso bajo tráfico pesado.",
    besonderheiten: [
      "Apto para superficies asfálticas",
      "Sin puente de adherencia",
      "Aplicación sencilla",
      "Apertura al tráfico en 30 minutos",
      "Resistente a heladas, sales de deshielo y sulfatos",
      "Bombeable, utilizable en horizontal y en vertical",
      "Aprox. un 30 % menos de CO₂ que el cemento Portland convencional",
      "Disponible a través del comercio de materiales de construcción",
    ],
    technischeDaten: [
      { label: "Resistencia a compresión (30 min)", wert: "aprox. 15 N/mm²" },
      { label: "Resistencia a compresión (1 h)", wert: "aprox. 22 N/mm²" },
      { label: "Resistencia a compresión (28 d)", wert: "aprox. 38 N/mm²" },
      { label: "Espesor de capa", wert: "30–600 mm" },
      { label: "Apertura al tráfico tras", wert: "aprox. 30 min" },
      { label: "Puente de adherencia", wert: "No necesario" },
      { label: "Resistencia a flexotracción (28 d)", wert: "aprox. 6,4 N/mm²" },
      { label: "Módulo de elasticidad", wert: "aprox. 22.000 N/mm²" },
      { label: "Granulometría", wert: "0–8 mm" },
      { label: "Color", wert: "negro" },
      { label: "Adición de agua", wert: "aprox. 3,80 l por saco de 25 kg" },
      { label: "Consumo de material", wert: "aprox. 20 kg/m² por cm de espesor de capa" },
      { label: "Temperatura de aplicación", wert: "+5 °C a +30 °C" },
    ],
  },
  "dot-europe-concrete-mix": {
    kurzbeschreibung: "Hormigón de reparación rápida universal, DIN EN 1504-3",
    beschreibung: "DOT Europe CONCRETE MIX es un hormigón rápido de altas prestaciones, modificado con polímeros, de fraguado rápido y reforzado con fibras, para interiores y exteriores. Conforme a DIN EN 1504-3 es utilizable tanto en reparaciones estructurales como no estructurales, ideal donde se exigen resistencias rápidas, durabilidad y un endurecimiento de baja retracción. Aplicable en espesores de 50–600 mm, cargable tras solo 1 hora; también utilizable en zonas húmedas.",
    besonderheiten: ["Uso multifuncional", "Resistente a heladas y sales de deshielo", "Resistente a sulfatos, exento de cloruros", "Excelente adherencia sin puente de adherencia", "Para puentes, pistas de despegue y aterrizaje, pavimentos industriales", "Un 30 % menos de emisiones de CO₂ que el cemento Portland"],
    technischeDaten: [
      { label: "Calidad", wert: "C35/45" },
      { label: "Granulometría", wert: "0–8 mm" },
      { label: "Resistencia a compresión (60 min)", wert: "> 19 N/mm²" },
      { label: "Resistencia a compresión (28 d)", wert: "aprox. ≥ 60 N/mm²" },
      { label: "Resistencia a flexotracción (28 d)", wert: "aprox. ≥ 6,5 N/mm²" },
      { label: "Cargable", wert: "aprox. 60 min tras el final de fraguado" },
      { label: "Resistente a heladas y sales de deshielo", wert: "Sí" },
      { label: "Resistente a sulfatos", wert: "Sí" },
    ],
  },
  "korocrete": {
    kurzbeschreibung: "Hormigón rápido mezclado volumétricamente (base FSCem)",
    besonderheiten: ["Mezclado volumétrico in situ (Cemen Tech M-Series)", "Estable en volumen, endurece sin retracción, sin tensiones y sin fisuras", "Resistente al agua, apto para zonas húmedas", "Bombeable", "Aplicable en grandes superficies", "Sin hormigón sobrante"],
    technischeDaten: [
      { label: "Ligante", wert: "KORODUR FSCem (ternario)" },
      { label: "Calidad", wert: "C35/45 – C50/60" },
      { label: "Resistencia a compresión (6 h)", wert: "aprox. 18 N/mm²" },
      { label: "Resistencia a compresión (8 h)", wert: "aprox. 25 N/mm²" },
      { label: "Resistencia a compresión (16 h)", wert: "aprox. 35 N/mm²" },
      { label: "Resistencia a compresión (28 d)", wert: "aprox. 65 N/mm²" },
      { label: "Puesta en servicio / apertura al tráfico", wert: "pocas horas, según dosificación" },
      { label: "Mezclado", wert: "volumétrico in situ" },
    ],
  },
  "rapid-set-schnellbeton": {
    kurzbeschreibung: "Hormigón rápido mezclado volumétricamente (Rapid Set), TL BEB-StB",
    besonderheiten: ["Mezclado volumétrico in situ", "TL BEB-StB (máxima categoría de tráfico para obras de conservación)", "Apertura al tráfico en 2 horas", "Resistente a heladas y sales de deshielo", "Aplicable en grandes superficies", "Sin hormigón sobrante"],
    technischeDaten: [
      { label: "Ligante", wert: "Rapid Set (cemento de sulfoaluminato de calcio)" },
      { label: "Calidad", wert: "C40/50" },
      { label: "Resistencia a compresión (2 h)", wert: "≥ 20 MPa" },
      { label: "Resistencia a compresión (12 h)", wert: "≥ 30 MPa" },
      { label: "Resistencia a compresión (28 d)", wert: "≥ 45 MPa" },
      { label: "Apertura al tráfico tras", wert: "aprox. 2 h" },
      { label: "Mezclado", wert: "volumétrico in situ" },
    ],
  },
  "korocure": {
    kurzbeschreibung: "Compuesto de curado para el curado controlado de superficies de solera",
    beschreibung: "Para proteger el hormigón joven se requieren, conforme a DIN EN 13670 en combinación con DIN 1045-3, medidas de curado intermedio: el curado intermedio protege de la evaporación el agua contenida en el hormigón, para que el cemento pueda hidratarse por completo. Cuando se emplea como imprimación para posteriores capas de espolvoreo de áridos duros, KOROCURE se aplica en cuanto el hormigón es transitable.",
    besonderheiten: ["Endurecimiento controlado", "Apto para superficies exteriores", "Reduce las fisuras de retracción"],
    technischeDaten: [
      { label: "Efecto", wert: "Retención de humedad / curado" },
      { label: "Aplicación", wert: "Por pulverización o con rodillo" },
    ],
  },
  "koromineral-cure": {
    kurzbeschreibung: "Protección superficial mediante silicatización",
    besonderheiten: ["Aumenta la dureza superficial", "Reduce la formación de polvo", "Mejora la resistencia química"],
    technischeDaten: [
      { label: "Efecto", wert: "Silicatización / impregnación" },
      { label: "Aplicación", wert: "Sobre solera fresca" },
    ],
  },
  "korotex": {
    kurzbeschreibung: "Agente de curado para un endurecimiento controlado",
    beschreibung: "Conforme a DIN 18353 (trabajos de soleras) y DIN 18560 (soleras en la edificación), las soleras deben protegerse frente a un secado irregular y demasiado rápido. El curado con KOROTEX es especialmente importante con temperaturas elevadas, baja humedad del aire y fuertes corrientes de aire; la pulverización es el método más racional en superficies de solera recién colocadas.",
    besonderheiten: ["Endurecimiento controlado", "Reduce las fisuras de retracción", "Aplicación por pulverización"],
    technischeDaten: [
      { label: "Efecto", wert: "Retención de humedad / curado" },
      { label: "Aplicación", wert: "Por pulverización" },
    ],
  },
  "neodur-he-3": {
    kurzbeschreibung: "Material seco aglomerado con cemento para pavimentos industriales por el procedimiento de espolvoreo",
    beschreibung: "NEODUR HE 3 según DIN 18557 (mortero de fábrica) y DIN EN 13813, basado en áridos duros según DIN 1100: material seco aglomerado con cemento, listo para su uso, para la ejecución de pavimentos industriales por el procedimiento de espolvoreo. Disponible también en colores.",
    besonderheiten: ["Procedimiento de espolvoreo (aplicación en seco sobre superficies frescas de solera/hormigón)", "Disponible también en colores", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Grupo de áridos duros (DIN 1100)", wert: "A" },
      { label: "Desgaste por abrasión", wert: "≤ 5 cm³/50 cm²" },
    ],
    varianten: [
      { name: "NEODUR HE 3 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 3 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Grupo de áridos duros KS" },
      { name: "NEODUR HE 3 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 3 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Grupo de áridos duros M" },
    ],
  },
  "neodur-he-3-green": {
    kurzbeschreibung: "Variante de NEODUR HE 3 respetuosa con los recursos, con hasta un 30 % menos de emisiones de CO₂",
    beschreibung: "Con la variante NEODUR HE 3 green, respetuosa con los recursos, las emisiones de CO₂ en la fabricación pueden reducirse hasta en un 30 por ciento. Para promotores, arquitectos, proyectistas y empresas constructoras están disponibles las correspondientes Declaraciones ambientales de producto (EPD).",
    besonderheiten: ["Hasta un 30 % menos de CO₂ en la fabricación", "EPD de producto disponible", "Procedimiento de espolvoreo"],
    technischeDaten: [
      { label: "Grupo de áridos duros (DIN 1100)", wert: "A" },
      { label: "Desgaste por abrasión", wert: "≤ 5 cm³/50 cm²" },
      { label: "Reducción de CO₂", wert: "hasta un 30 %" },
    ],
  },
  "neodur-he-2": {
    kurzbeschreibung: "Material seco aglomerado con cemento para pavimentos industriales por el procedimiento de espolvoreo",
    beschreibung: "NEODUR HE 2 según DIN 18557 (mortero de fábrica) y DIN EN 13813: material seco aglomerado con cemento, listo para su uso, para la ejecución de pavimentos industriales por el procedimiento de espolvoreo. Disponible también en colores.",
    besonderheiten: ["Procedimiento de espolvoreo", "Disponible también en colores"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–3 mm" },
      { label: "Resistencia a compresión", wert: "70 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "9 N/mm²" },
      { label: "Desgaste por abrasión", wert: "≤ 8 cm³/50 cm²" },
    ],
  },
  "korodur-0-4": {
    kurzbeschreibung: "Árido duro KORODUR (sin ligante) del grupo A según DIN 1100",
    beschreibung: "Árido duro para la ejecución de pavimentos industriales sometidos a altas solicitaciones, p. ej. aparcamientos, naves industriales, naves de montaje, hangares, talleres y almacenes de gran altura. Para interiores y exteriores.",
    besonderheiten: ["Árido duro sin ligante"],
    technischeDaten: [
      { label: "Grupo de áridos duros (DIN 1100)", wert: "A" },
      { label: "Desgaste por abrasión", wert: "≤ 5 cm³/50 cm²" },
    ],
  },
  "korodur-vs-0-5": {
    kurzbeschreibung: "Árido duro KORODUR (sin ligante) del grupo A según DIN 1100, base entre otros de NEODUR HE 65",
    beschreibung: "Árido duro KORODUR sin ligante según DIN 1100. Sirve como base de áridos duros para NEODUR HE 65 y como adición de áridos duros para soleras de uso resistentes al desgaste, p. ej. con KORODUR FSCem.",
    besonderheiten: ["Árido duro sin ligante", "Base de áridos duros para NEODUR HE 65"],
    technischeDaten: [
      { label: "Grupo de áridos duros (DIN 1100)", wert: "A" },
      { label: "Desgaste por abrasión", wert: "≤ 5 cm³/50 cm²" },
    ],
  },
  "korodur-wh-spezial": {
    kurzbeschreibung: "Árido duro KORODUR (sin ligante) del grupo A según DIN 1100 para pavimentos industriales sometidos a altas solicitaciones",
    beschreibung: "Árido duro para la ejecución de pavimentos industriales sometidos a altas solicitaciones. Base de áridos duros para NEODUR HE 65 SVS 3 y NEODUR HE 65 plus SVS 3. Para interiores y exteriores.",
    besonderheiten: ["Árido duro sin ligante"],
    technischeDaten: [
      { label: "Grupo de áridos duros (DIN 1100)", wert: "A" },
      { label: "Desgaste por abrasión", wert: "≤ 3 cm³/50 cm²" },
    ],
  },
  "korodur-wh-metallisch": {
    kurzbeschreibung: "Árido duro metálico KORODUR (grupo M según DIN 1100) para soleras blindadas y tráfico pesado de ruedas de acero",
    beschreibung: "Árido duro metálico para pavimentos industriales sometidos a altas solicitaciones, especialmente adecuado para tráfico pesado de ruedas de acero, molinos de muelas y el apoyo brusco de piezas de cantos vivos, para la ejecución de las llamadas soleras blindadas. Base de NEODUR HE 3 metallisch y NEODUR HE 65 metallisch. Para interiores y exteriores.",
    besonderheiten: ["Árido duro metálico", "Para las llamadas soleras blindadas"],
    technischeDaten: [
      { label: "Grupo de áridos duros (DIN 1100)", wert: "M" },
      { label: "Desgaste por abrasión", wert: "≤ 3 cm³/50 cm²" },
    ],
  },
  "korodur-diamantbeton": {
    kurzbeschreibung: "Árido duro KORODUR del grupo KS según DIN 1100 para la máxima resistencia al desgaste posible",
    beschreibung: "Árido duro para la ejecución de pavimentos industriales sometidos a altas solicitaciones con la máxima resistencia al desgaste posible. Base de áridos duros para NEODUR HE 65 SVS 1,5. Para interiores y exteriores.",
    besonderheiten: ["Máxima resistencia al desgaste posible (grupo KS)"],
    technischeDaten: [
      { label: "Grupo de áridos duros (DIN 1100)", wert: "KS" },
      { label: "Desgaste por abrasión", wert: "≤ 1,5 cm³/50 cm²" },
    ],
  },
  "korodur-fscem": {
    kurzbeschreibung: "Ligante cementoso para soleras rápidas, estable en volumen y de baja retracción, de base ternaria",
    beschreibung: "KORODUR FSCem es un ligante cementoso para soleras rápidas, estable en volumen y de baja retracción, de base ternaria, para la ejecución de soleras de altas prestaciones, rápidamente utilizables y listas para revestir según DIN 18560 y EN 13813. Para soleras de cemento rápidamente revestibles adheridas, sobre capa de separación, sobre capa aislante y como solera calefactada, en interiores y exteriores. También adecuado para reparar y sanear pavimentos antiguos de hormigón.",
    besonderheiten: ["Ligante ternario (arena para solera por cuenta de la obra)", "Rápidamente revestible", "Con la adición de árido duro KORODUR VS 0/5 pueden ejecutarse soleras de uso resistentes al desgaste"],
    technischeDaten: [
      { label: "Proporción de mezcla (CT-C50-F7)", wert: "1:4 partes en peso (75 kg FSCem : 300 kg de arena para solera A8–B8), a/c aprox. 0,42" },
      { label: "Proporción de mezcla (CT-C40-F6)", wert: "1:5 partes en peso (60 kg FSCem : 300 kg de arena para solera A8–B8), a/c aprox. 0,40" },
      { label: "Humedad residual (medición CM)", wert: "tras 24 h aprox. 5,9 %, tras 3 días aprox. 1,9 %, tras 28 días aprox. 1,3 %" },
      { label: "Clase de retracción (DIN 18560-1)", wert: "SW 1, baja retracción (< 0,2 mm/m)" },
    ],
  },
  "korodur-fscem-screed": {
    kurzbeschreibung: "Mortero seco para soleras rápidas, estable en volumen y de baja retracción, revestible tras 3 días",
    beschreibung: "KORODUR FSCem Screed es un mortero seco para soleras rápidas, estable en volumen y de baja retracción, de base ternaria, para la ejecución de soleras rápidamente listas para revestir, con espesores de capa de hasta 120 mm según DIN 18560 y DIN EN 13813. Revestible tras solo 3 días, debe revestirse siempre. También adecuado para reparar y sanear pavimentos antiguos de hormigón.",
    besonderheiten: ["Mortero seco listo para su uso", "Debe revestirse siempre", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–6 mm" },
      { label: "Resistencia a compresión (DIN EN 13892-2)", wert: "tras 1 día aprox. 20 N/mm², tras 28 días aprox. 40 N/mm²" },
      { label: "Resistencia a flexotracción (DIN EN 13892-2)", wert: "tras 1 día aprox. 4 N/mm², tras 28 días aprox. 6 N/mm²" },
      { label: "Clase de retracción (DIN 18560-1)", wert: "SW 1, baja retracción (< 0,2 mm/m)" },
      { label: "Revestible", wert: "tras 3 días" },
    ],
  },
  "neodur-level-au": {
    kurzbeschreibung: "Masa de nivelación de suelos de endurecimiento rápido, modificada con polímeros, para 5 a 50 mm",
    beschreibung: "NEODUR Level AU es una masa de nivelación de suelos de capa fina, aglomerada con cemento, mineral, de endurecimiento rápido y modificada con polímeros, para espesores de capa de 5 a 50 mm. Adherida sobre soporte cementoso, soporte ideal para revestimientos de linóleo, textiles y de PVC, laminado, cerámica y piedra natural.",
    besonderheiten: ["Capa de nivelación bajo NEODUR Level", "Imprimación con KORODUR PC"],
    technischeDaten: [
      { label: "Tiempo de trabajabilidad", wert: "a +20 °C aprox. 30 minutos" },
      { label: "Transitable", wert: "tras aprox. 3–4 horas" },
      { label: "Resistencia a compresión", wert: "tras 28 días ≥ 33 N/mm²" },
      { label: "Consumo", wert: "aprox. 1,7 kg/mm/m²" },
    ],
  },
  "rapid-set-levelflor": {
    kurzbeschreibung: "Masa de nivelación autonivelante de endurecimiento rápido, con tecnología de cemento Rapid Set, para interiores y exteriores",
    beschreibung: "Rapid Set LevelFlor es una masa de nivelación autonivelante basada en una tecnología especial de cemento, para interiores y exteriores en edificación residencial e industrial. La capa de acabado final puede aplicarse tras 6 a 16 horas (a +20 °C). Adecuada para obra nueva y rehabilitación, debe revestirse siempre.",
    besonderheiten: ["Tecnología de cemento Rapid Set", "Autonivelante", "Debe revestirse siempre"],
    technischeDaten: [
      { label: "Tiempo de trabajabilidad", wert: "30 min" },
      { label: "Tiempo de fluidez", wert: "15 min" },
      { label: "Resistencia a compresión (ASTM C-109 mod.)", wert: "tras 25 h aprox. 20 N/mm², tras 7 días aprox. 24 N/mm², tras 28 días aprox. 34 N/mm²" },
      { label: "Resistencia a flexotracción (ASTM C-348)", wert: "tras 7 días aprox. 7,9 N/mm²" },
      { label: "Capa de acabado aplicable", wert: "tras 6–16 horas (a +20 °C)" },
    ],
  },
  "korodur-hb-5": {
    kurzbeschreibung: "Puente de adherencia aglomerado con cemento para la unión adherente de soleras de áridos duros sobre hormigón endurecido",
    beschreibung: "KORODUR HB 5 es un puente de adherencia aglomerado con cemento, listo para su uso, para la unión adherente de soleras de áridos duros KORODUR y soleras aglomeradas con cemento de todas las clases de calidad sobre hormigón endurecido. Especialmente acreditado en el sistema de pavimento industrial KORODUR-KOROTAN, insensible a la humedad del soporte.",
    besonderheiten: ["Insensible a la humedad del soporte", "Para técnica de colocación en fresco y diferida"],
    technischeDaten: [
      { label: "Consumo", wert: "aprox. 2 kg/m²" },
    ],
  },
  "korodur-txpk": {
    kurzbeschreibung: "Imprimación especial bicomponente de resina epoxi para revestimientos autonivelantes",
    beschreibung: "Imprimación especial de resina epoxi, bicomponente, para revestimientos autonivelantes como TRU Self-Leveling, LevelFlor y NEODUR Level, así como para la imprimación de superficies de hormigón y solera en las que deba contarse con una acción posterior de humedad por la cara inferior.",
    besonderheiten: ["Bicomponente", "Adecuada en caso de acción de humedad por la cara inferior"],
    technischeDaten: [
      { label: "Consumo", wert: "aprox. 400–500 g/m² según la rugosidad del soporte" },
    ],
  },
  "korodur-durop": {
    kurzbeschreibung: "Árido duro sintético como material de relleno y espolvoreo para revestimientos y soleras de resina sintética",
    beschreibung: "Los áridos duros sintéticos del sistema de productos KORODUR DUROP se emplean principalmente como material de relleno y espolvoreo para revestimientos y soleras de resina sintética. DUROP mejora el agarre y reduce el ruido de rodadura; en la construcción de carreteras ya se han ejecutado más de 1,5 millones de m² de tramos de autopista como revestimiento fino ligado con resina con DUROP.",
    besonderheiten: ["Resistente al desgaste, antideslizante, resistente al pulido"],
    technischeDaten: [
      { label: "Dureza Mohs", wert: "8" },
    ],
    varianten: [
      { name: "DUROP 0,5/1", hinweis: "Granulometría 0,5–1 mm" },
      { name: "DUROP 1/2", hinweis: "Granulometría 1–2 mm" },
      { name: "DUROP 2/3", hinweis: "Granulometría 2–3 mm" },
      { name: "DUROP 2/5", hinweis: "Granulometría 2–5 mm" },
    ],
  },
  "korodur-robust": {
    kurzbeschreibung: "Árido duro sintético (granulometría 0–3 mm) como material de relleno y espolvoreo para sistemas de resina sintética",
    beschreibung: "Con los sistemas de productos KORODUR DUROP y KORODUR Robust se dispone de materiales de relleno y espolvoreo adecuados para revestimientos y soleras de resina sintética de alta calidad.",
    technischeDaten: [
      { label: "Granulometría", wert: "0–3 mm" },
      { label: "Dureza Mohs", wert: "7" },
    ],
  },
  "korodur-silosystem": {
    kurzbeschreibung: "Silo de obra con técnica de mezclado y bombeo para la colocación económica de capas de áridos duros",
    beschreibung: "El sistema de silo KORODUR permite la colocación económica de capas de áridos duros KORODUR mediante una técnica de trabajo racional: material suministrado en silo (p. ej. NEODUR HE 65), técnica de mezclado y bombeo montada en el silo y asistencia técnica de maquinaria. Sin montaje de estaciones de mezclado, sin eliminación de envases, calidad de mortero constante.",
    besonderheiten: ["Calidades aplicables: NEODUR HE 65, HE 65 SVS 3, HE 65 SVS 1,5, HE 40", "Calidad de mortero constante, importante en ejecuciones coloreadas"],
    technischeDaten: [
      { label: "Unidad de silo", wert: "22,5 m³" },
      { label: "Caudal de bombeo", wert: "aprox. 100 l/min (aprox. 600 m² en alrededor de 1 hora)" },
      { label: "Rendimiento diario", wert: "aprox. 1.000–2.000 m² (la fuente también indica 1.000–1.500 m²)" },
      { label: "Distancia de bombeo", wert: "hasta 80 m" },
    ],
  },
  "korodur-easyfinish": {
    kurzbeschreibung: "Ayuda de alisado líquida, exenta de disolventes y lista para su uso, para NEODUR HE 60 rapid y KOROCRETE",
    beschreibung: "KORODUR easyFinish se pulveriza sobre la superficie de NEODUR HE 60 rapid o KOROCRETE fratasada con disco antes del primer alisado con aspas y se incorpora a la superficie. Se facilita el proceso de alisado, la superficie se mejora adicionalmente, se incrementa la densidad y se mejora la protección frente a ataques químicos.",
    besonderheiten: ["Exenta de disolventes y lista para su uso", "Facilita el proceso de alisado", "Incrementa la densidad y la protección frente a ataques químicos"],
    technischeDaten: [
      { label: "Forma", wert: "líquido" },
      { label: "Color", wert: "azulado" },
      { label: "Consumo de material", wert: "aprox. 150 g/m²" },
    ],
  },
  "korodur-nanofinish": {
    kurzbeschreibung: "Nanosílice líquida, lista para su uso, para el acabado de pavimentos industriales KORODUR",
    beschreibung: "KORODUR nanoFinish ralentiza la pérdida de humedad y prolonga el tiempo de trabajabilidad: el acabado superficial durante el alisado se facilita incluso en condiciones calurosas, secas y ventosas. La tecnología de nanosílice retiene la humedad durante el acabado superficial y permite así una hidratación completa con el máximo desarrollo de resistencias; se reducen las eflorescencias y la fisuración por retracción temprana.",
    besonderheiten: ["Tecnología de nanosílice", "Prolonga el tiempo de trabajabilidad durante el alisado", "Reduce las eflorescencias y las fisuras por retracción temprana"],
    technischeDaten: [
      { label: "Forma", wert: "líquido" },
      { label: "Color", wert: "turbio lechoso" },
      { label: "Valor pH", wert: "5" },
      { label: "Consumo de material", wert: "aprox. 100 g/m²" },
    ],
  },
  "korodur-uniprimer": {
    kurzbeschreibung: "Imprimación universal monocomponente, exenta de disolventes, a base de copolímero de acrilato y silicato",
    beschreibung: "KORODUR uniPrimer imprima los soportes de hormigón absorbentes antes del revestimiento con soleras de áridos duros aglomeradas con cemento y reduce la absorción de los soportes secos: se suprime el prehumedecido, que requiere mucho tiempo, en los saneamientos de pavimentos industriales. Se minimiza la evaporación del puente de adherencia KORODUR HB 5 o HB 5 rapid y se logra una hidratación más uniforme del sistema adherido.",
    besonderheiten: ["Exenta de disolventes, monocomponente, lista para su uso", "Sustituye el prehumedecido, que requiere mucho tiempo, en los saneamientos", "Minimiza la evaporación del puente de adherencia"],
    technischeDaten: [
      { label: "Forma", wert: "líquido" },
      { label: "Color", wert: "blanco lechoso" },
      { label: "Valor pH", wert: "11,6" },
    ],
  },
  "koromineral": {
    kurzbeschreibung: "Impregnación líquida y transparente a base de silicato para la silicificación superficial de materiales de construcción minerales",
    beschreibung: "KOROMINERAL impregna superficies de hormigón y de solera en naves de almacenamiento y producción o cámaras frigoríficas. Es especialmente adecuado para soportes minerales como soleras, pavimentos industriales aglomerados con cemento, hormigón, mortero de albañilería y revoco aglomerado con cemento; aumenta la estanqueidad y tiene efecto hidrófugo.",
    besonderheiten: ["Silicificación superficial de materiales de construcción minerales", "Aumenta la estanqueidad, hidrófugo"],
    technischeDaten: [
      { label: "Color", wert: "transparente" },
      { label: "Densidad", wert: "aprox. 1,12 g/cm³" },
      { label: "Valor pH", wert: "aprox. 11,3" },
      { label: "Temperatura de aplicación", wert: "+5 °C a +35 °C" },
      { label: "Consumo", wert: "aprox. 100–200 g/m² (según la absorción)" },
    ],
  },
  "koromineral-li": {
    kurzbeschreibung: "Impregnación líquida y transparente a base de silicato de litio híbrido con protección básica antimanchas integrada",
    besonderheiten: ["Silicato de litio híbrido", "Protección básica antimanchas integrada"],
    technischeDaten: [
      { label: "Consumo", wert: "aprox. 40–100 g/m² (según la absorción)" },
    ],
  },
  "koroclean": {
    kurzbeschreibung: "Proceso de pulido para la mejora estética de pavimentos industriales cementosos (pulido de limpieza)",
    beschreibung: "KOROCLEAN es un proceso de pulido especialmente desarrollado para la mejora estética de los pavimentos industriales KORODUR y otros pavimentos industriales cementosos. Tras el tratamiento, el suelo es más fácil de limpiar y mantener y se reducen las irritaciones cromáticas: una alternativa técnica y económicamente razonable a la limpieza final de obra convencional antes de la puesta en servicio.",
    besonderheiten: ["Mejora la estética, la seguridad y la resistencia al deslizamiento", "Superficie sin polvo y fácil de limpiar", "Recomendado también para los suelos de diseño KORODUR"],
    technischeDaten: [
      { label: "Proceso", wert: "Pulido mecánico de limpieza (sistema MKS Funke Schleiftechnik)" },
    ],
  },
  "system-korodur-korotan": {
    kurzbeschreibung: "Sistema de pavimento industrial: solera de áridos duros monocapa adherida con puente de adherencia, espesor nominal medio de 15 mm",
    beschreibung: "El pavimento industrial KORODUR-KOROTAN es una solera de áridos duros KORODUR aglomerada con cemento que se coloca en una sola capa, adherida con puente de adherencia, sobre hormigón portante endurecido, con un espesor nominal medio de 15 mm. La colocación se realiza en gran medida sin juntas; en combinación con el puente de adherencia KORODUR HB 5 se crea una unión solidaria. Uno de los tres sistemas de saneamiento KORODUR para pavimentos industriales.",
    besonderheiten: ["Puramente mineral", "En gran medida sin juntas", "Sistema de saneamiento para pavimentos industriales"],
    technischeDaten: [
      { label: "Estructura", wert: "monocapa adherida con puente de adherencia (KORODUR HB 5) sobre hormigón portante endurecido" },
    ],
  },
  "granidur": {
    kurzbeschreibung: "Solera vista decorativa pulida con aspecto de granito o terrazo",
    beschreibung: "GRANIDUR 05 y GRANIDUR 08 son materiales secos coloreados, fabricados en planta y listos para su uso, para la ejecución de soleras decorativas pulidas con un espesor de capa de 15 hasta máx. 70 mm, según la construcción. El aspecto final de granito o terrazo puede ir de mate a brillante. Colocación en una o dos capas según DIN 18560-2, -3 (adherida con puente de adherencia KORODUR HB 5) y -4.",
    besonderheiten: ["Colores disponibles: gris cemento, gris claro, gris basalto, antracita, beige, rojo, oliva", "Aspecto pulible de mate a brillante", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Resistencia a compresión (GRANIDUR 05)", wert: "45 N/mm²" },
      { label: "Resistencia a flexotracción (GRANIDUR 05)", wert: "6 N/mm²" },
      { label: "Resistencia a compresión (GRANIDUR 08)", wert: "35 N/mm²" },
      { label: "Resistencia a flexotracción (GRANIDUR 08)", wert: "5 N/mm²" },
    ],
    varianten: [
      { name: "GRANIDUR 05", qualitaetsklasse: "CT-C45-F6", hinweis: "Granulometría 0–5 mm, espesor de capa 15–25 mm" },
      { name: "GRANIDUR 08", qualitaetsklasse: "CT-C35-F5", hinweis: "Granulometría 0–8 mm, espesor de capa 25–50 mm" },
    ],
  },
  "granidur-bianco-nero": {
    kurzbeschreibung: "Solera vista decorativa pulida en blanco (BIANCO) o negro (NERO), espesor de capa medio de 15 mm",
    beschreibung: "GRANIDUR BIANCO y GRANIDUR NERO son materiales secos fabricados en planta y listos para su uso, para la ejecución de soleras decorativas pulidas con un espesor de capa medio de 15 mm. Colocación en una sola capa según DIN 18560-3 como solera adherida con puente de adherencia KORODUR HB 5.",
    besonderheiten: ["Acabado pulido blanco puro o negro profundo", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–5 mm" },
      { label: "Resistencia a compresión", wert: "45 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "6 N/mm²" },
    ],
    varianten: [
      { name: "GRANIDUR BIANCO" },
      { name: "GRANIDUR NERO" },
    ],
  },
  "kcf": {
    kurzbeschreibung: "Solera vista decorativa alisada con aspecto nuboso y marmolado",
    beschreibung: "KCF 05 y KCF 08 son materiales secos coloreados, fabricados en planta y listos para su uso, para la ejecución de soleras decorativas alisadas con un espesor de capa de 15 hasta máx. 70 mm, según la construcción. La solera vista alisada, aglomerada con cemento, se desarrolló a finales de los años 1990 junto con el arquitecto y diseñador italiano Alessandro Copetti. Colocación en una o dos capas según DIN 18560-2, -3 (adherida con puente de adherencia KORODUR HB 5) y -4.",
    besonderheiten: ["Colores disponibles: gris cemento, gris claro, gris basalto, antracita, beige, rojo, oliva", "Tratamiento superficial con KOROCLEAN", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Desgaste por abrasión", wert: "≤ 5 cm³/50 cm²" },
      { label: "Resistencia a compresión (KCF 05)", wert: "45 N/mm²" },
      { label: "Resistencia a flexotracción (KCF 05)", wert: "6 N/mm²" },
      { label: "Resistencia a compresión (KCF 08)", wert: "35 N/mm²" },
      { label: "Resistencia a flexotracción (KCF 08)", wert: "5 N/mm²" },
    ],
    varianten: [
      { name: "KCF 05", qualitaetsklasse: "CT-C45-F6-A5", hinweis: "Granulometría 0–5 mm, espesor de capa 15–25 mm" },
      { name: "KCF 08", qualitaetsklasse: "CT-C35-F5-A5", hinweis: "Granulometría 0–8 mm, espesor de capa 25–50 mm" },
      { name: "KCF 05 rapid", hinweis: "de endurecimiento rápido, ligante estable en volumen de base ternaria" },
    ],
  },
  "tru-pc": {
    kurzbeschreibung: "Solera vista mineral autonivelante con aspecto de hormigón pulido (tecnología Rapid Set)",
    beschreibung: "Rapid Set TRU PC es una solera vista mineral autonivelante, basada en una tecnología especial de cemento, desarrollada para simular el aspecto del hormigón pulido. Ideal cuando se exigen resistencia temprana, durabilidad y un endurecimiento de baja retracción: trabajable hasta 20 minutos, transitable tras 2 a 3 horas. El árido decorativo (hasta 2,5 mm) ya está incluido.",
    besonderheiten: ["Aspecto de hormigón pulido, árido decorativo hasta 2,5 mm incluido", "Personalizable en distintas variantes de color", "Para interiores y exteriores, también en zonas húmedas"],
    technischeDaten: [
      { label: "Resistencia a compresión (ASTM C-109 mod.)", wert: "tras 4 h aprox. 19 N/mm², tras 1 día aprox. 34 N/mm², tras 28 días aprox. 48 N/mm²" },
      { label: "Tiempo de trabajabilidad", wert: "aprox. 20 minutos" },
      { label: "Tiempo de fluidez", wert: "aprox. 15 minutos" },
      { label: "Consumo de material", wert: "aprox. 1,8 kg por m² y mm de espesor de capa" },
      { label: "Color", wert: "gris natural" },
    ],
  },
  "tru-sp": {
    kurzbeschreibung: "Solera vista mineral autonivelante con aspecto sal y pimienta (tecnología Rapid Set)",
    beschreibung: "Rapid Set TRU SP es una solera vista mineral autonivelante, basada en una tecnología especial de cemento, desarrollada para simular el aspecto del hormigón pulido con efecto sal y pimienta. Ideal cuando se exigen resistencia temprana, durabilidad y un endurecimiento de baja retracción: trabajable hasta 20 minutos, transitable tras 2 a 3 horas.",
    besonderheiten: ["Aspecto sal y pimienta", "Personalizable en distintas variantes de color", "Para interiores y exteriores, también en zonas húmedas"],
    technischeDaten: [
      { label: "Resistencia a compresión (ASTM C-109 mod.)", wert: "tras 4 h aprox. 13 N/mm², tras 1 día aprox. 27 N/mm², tras 28 días aprox. 44 N/mm²" },
      { label: "Tiempo de trabajabilidad", wert: "aprox. 20 minutos" },
      { label: "Tiempo de fluidez", wert: "aprox. 15 minutos" },
      { label: "Consumo de material", wert: "aprox. 1,8 kg por m² y mm de espesor de capa" },
      { label: "Color", wert: "gris natural" },
    ],
  },
  "microtop-tw-3": {
    kurzbeschreibung: "Mortero de cemento proyectado por vía seca para la reperfilación y el revestimiento en el ámbito del agua potable",
    beschreibung: "MICROTOP TW 3 se aplica por el procedimiento de proyección en seco y sirve para la reperfilación y el revestimiento de superficies, así como para el aumento del recubrimiento de hormigón y el acabado en el ámbito del agua potable. Los materiales se aplican en una sola capa y pueden fratasarse y alisarse sin problemas; los trabajos pequeños pueden realizarse a mano.",
    besonderheiten: ["Puramente mineral, mejorado con microsílice", "Baja porosidad, impermeable al agua", "Fratasable y alisable", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–3 mm" },
      { label: "Resistencia a compresión (28 d)", wert: "≥ 45 N/mm²" },
      { label: "Porosidad total (90 d)", wert: "≤ 10 % en vol." },
    ],
  },
  "microtop-tw-5": {
    kurzbeschreibung: "Mortero de cemento proyectado mejorado con microsílice, por vía seca, para depósitos de agua potable",
    beschreibung: "MICROTOP TW 5 es un mortero de cemento proyectado puramente mineral, de fraguado hidráulico y mejorado con microsílice, para la reperfilación, igualación y revestimiento de superficies en depósitos de agua potable. Aplicación por el procedimiento de proyección en seco (flujo diluido), también para el aumento del recubrimiento de hormigón y para el acabado. Cumple las hojas de trabajo DVGW W 270, W 300 y W 347.",
    besonderheiten: ["Puramente mineral, de fraguado hidráulico, mejorado con microsílice", "Aplicación en una sola capa, fratasable y alisable", "Trabajos pequeños posibles a mano"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–5 mm" },
      { label: "Resistencia a compresión", wert: "≥ 45 N/mm²" },
      { label: "Densidad", wert: "2,25 kg/dm³" },
      { label: "Porosidad total (90 d)", wert: "≤ 10 % en vol." },
    ],
  },
  "microtop-tw-8": {
    kurzbeschreibung: "Hormigón de cemento proyectado (C30/37) mejorado con microsílice, por vía seca, para el ámbito del agua potable",
    beschreibung: "MICROTOP TW 8 es un hormigón de cemento proyectado, de fraguado hidráulico y mejorado con microsílice, para el ámbito del agua potable; aplicación según DIN 18551. El hormigón de la clase de resistencia C30/37 se utiliza para la ejecución de hormigón proyectado por el procedimiento de proyección en seco, para la reperfilación de oquedades y para el aumento del recubrimiento de hormigón. Cumple las hojas de trabajo DVGW W 270, W 300 y W 347.",
    besonderheiten: ["Clase de resistencia C30/37", "Mejorado con microsílice, de fraguado hidráulico", "Fratasable y alisable, trabajos pequeños posibles a mano"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–8 mm" },
      { label: "Resistencia a compresión", wert: "≥ 45 N/mm²" },
      { label: "Densidad", wert: "2,27 kg/dm³" },
      { label: "Porosidad total (90 d)", wert: "≤ 10 % en vol." },
    ],
  },
  "microtop-tw-nsm": {
    kurzbeschreibung: "Mortero proyectado por vía húmeda para la reperfilación y el revestimiento en el ámbito del agua potable",
    beschreibung: "MICROTOP TW NSM se aplica por el procedimiento de proyección por vía húmeda y sirve para la reperfilación y el revestimiento de superficies, así como para el aumento del recubrimiento de hormigón y el acabado en el ámbito del agua potable. Los materiales pueden fratasarse y alisarse sin problemas; los trabajos pequeños pueden realizarse a mano en combinación con un puente de adherencia.",
    besonderheiten: ["Fratasable y alisable", "Aplicación a mano de trabajos pequeños posible con puente de adherencia"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–3 mm" },
      { label: "Espesor de capa", wert: "aprox. 20 mm, en una sola capa" },
      { label: "Adición de agua", wert: "aprox. 3,6 l por envase de 25 kg" },
      { label: "Colores", wert: "natural, blanco, azul" },
      { label: "Procedimiento", wert: "Proyección por vía húmeda (transporte por flujo denso, baja generación de polvo)" },
    ],
    varianten: [
      { name: "MICROTOP TW NSM blau" },
    ],
  },
  "microtop-tw-02": {
    kurzbeschreibung: "Mortero proyectado por vía húmeda de flujo denso con un volumen de poros extremadamente bajo",
    beschreibung: "MICROTOP TW 02 se aplica por el procedimiento de proyección por vía húmeda de flujo denso y sirve para el revestimiento de superficies, así como para el aumento del recubrimiento de hormigón y el acabado en el ámbito del agua potable. El producto tiene un volumen de poros extremadamente bajo y puede emplearse también como protección anticorrosión y puente de adherencia.",
    besonderheiten: ["Volumen de poros extremadamente bajo", "Utilizable también como protección anticorrosión y puente de adherencia"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–0,2 mm" },
      { label: "Espesor de capa", wert: "aprox. 2–5 mm" },
      { label: "Adición de agua", wert: "aprox. 5–6,25 l por envase de 25 kg" },
      { label: "Procedimiento", wert: "Centrifugado, proyección, espatulado, aplicación a mano" },
    ],
  },
  "microtop-tw-vsm": {
    kurzbeschreibung: "Mortero de preproyección (capa de agarre) para el revestimiento interior y la reparación de depósitos de agua potable y mampostería",
    beschreibung: "MICROTOP TW VSM sirve para el revestimiento interior y la reparación de depósitos de agua potable nuevos y antiguos, así como de mampostería. Gracias a su composición especial posee excelentes propiedades de aplicación y de uso y puede fratasarse y alisarse sin problemas.",
    besonderheiten: ["Adecuado también para mampostería", "Fratasable y alisable"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–2 mm" },
      { label: "Espesor de capa", wert: "aprox. 15–20 mm" },
      { label: "Adición de agua", wert: "aprox. 3,75 l por envase de 25 kg" },
      { label: "Rendimiento", wert: "aprox. 14 l por envase de 25 kg" },
      { label: "Procedimiento", wert: "Proyección, aplicación a mano" },
    ],
  },
  "microtop-tw-bm": {
    kurzbeschreibung: "Mortero especial para el revestimiento interior de tuberías y depósitos de agua potable, también como puente de adherencia",
    beschreibung: "MICROTOP TW BM es un mortero especial fabricado en planta y listo para su uso, para el revestimiento interior de tuberías y depósitos de agua potable, así como de otros elementos. Puede aplicarse sin problemas por centrifugado, proyección o a mano, es utilizable también como puente de adherencia para revestimientos de suelos y como protección anticorrosión, y se suministra en natural y blanco. Cumple las hojas de trabajo DVGW W 270, W 300 y W 347.",
    besonderheiten: ["Aplicación por centrifugado, proyección y a mano", "Utilizable también como puente de adherencia y protección anticorrosión", "Disponible en natural y blanco"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–1 mm" },
      { label: "Resistencia a compresión", wert: "35 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "6,3 N/mm²" },
      { label: "Colores", wert: "natural, blanco" },
      { label: "Espesor de capa (revestimiento de tuberías/depósitos)", wert: "5–8 mm" },
      { label: "Espesor de capa (protección anticorrosión/puente de adherencia)", wert: "2–5 mm" },
    ],
    varianten: [
      { name: "MICROTOP TW BM weiß" },
      { name: "MICROTOP TW BM blau" },
    ],
  },
  "microtop-tw-mineral": {
    kurzbeschreibung: "Agente líquido de protección de la construcción a base de silicato para la consolidación y el sellado superficial",
    beschreibung: "MICROTOP TW Mineral produce una consolidación de los materiales de construcción minerales y de los soportes porosos mediante una reacción química con los ligantes y áridos del sustrato (reacción de silicificación) y mejora la estructura del material con un sellado superficial simultáneo. Sirve como impregnación en el sistema MICROTOP.",
    besonderheiten: ["Reacción de silicificación con el sustrato", "Consolidación y sellado en una sola operación", "Impregnación para todos los morteros MICROTOP TW"],
    technischeDaten: [
      { label: "Forma", wert: "líquido" },
      { label: "Color", wert: "transparente" },
      { label: "Densidad", wert: "aprox. 1,14 g/cm³" },
      { label: "Valor pH", wert: "aprox. 11,3" },
    ],
  },
  "neodur-vm-1": {
    kurzbeschreibung: "Mortero de relleno para secciones de relleno de 5 a 20 mm",
    beschreibung: "Los morteros de montaje y de relleno unen el hormigón de forma solidaria con los elementos de acero embebidos. NEODUR VM 1 está concebido para secciones de relleno de 5 a 20 mm.",
    besonderheiten: ["Unión solidaria de hormigón y elementos de acero embebidos", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Sección de relleno", wert: "5–20 mm" },
    ],
  },
  "neodur-vm-3": {
    kurzbeschreibung: "Mortero de relleno para secciones de relleno de 10 a 50 mm",
    beschreibung: "Los morteros de montaje y de relleno unen el hormigón de forma solidaria con los elementos de acero embebidos. NEODUR VM 3 está concebido para secciones de relleno de 10 a 50 mm.",
    besonderheiten: ["Unión solidaria de hormigón y elementos de acero embebidos"],
    technischeDaten: [
      { label: "Sección de relleno", wert: "10–50 mm" },
    ],
  },
  "neodur-vm-5": {
    kurzbeschreibung: "Hormigón de relleno (C80/95) para secciones de relleno de hasta 200 mm, ensayado según DIN EN 1504-3 (R4)",
    beschreibung: "Hormigón de montaje y de relleno para grandes secciones de relleno de hasta 200 mm. Ensayado según DIN EN 1504-3 (clase R4) y la directriz DAfStb para hormigón y mortero de relleno aglomerados con cemento.",
    besonderheiten: ["Para aplicaciones estructuralmente relevantes (R4)", "Directriz DAfStb (SKVB I)"],
    technischeDaten: [
      { label: "Sección de relleno", wert: "hasta 200 mm" },
    ],
  },
  "neodur-vb-8": {
    kurzbeschreibung: "Hormigón de relleno para secciones de relleno superiores a 50 mm",
    beschreibung: "Hormigón de montaje y de relleno para secciones de relleno superiores a 50 mm. Une el hormigón de forma solidaria con los elementos de acero embebidos.",
    besonderheiten: ["Unión solidaria de hormigón y elementos de acero embebidos"],
    technischeDaten: [
      { label: "Sección de relleno", wert: "superior a 50 mm" },
    ],
  },
  "neodur-vm-basic": {
    kurzbeschreibung: "Hormigón de relleno expansivo mineral de alta fluidez, ensayado según DVGW para ámbitos de agua potable",
    beschreibung: "NEODUR VM basic es un hormigón de relleno expansivo, mineral y de alta fluidez, para trabajos de relleno solidario y montajes de todo tipo, p. ej. el relleno de tuberías en instalaciones de agua potable. Ensayado según la hoja de trabajo DVGW W 347 para los requisitos higiénicos en ámbitos de agua potable.",
    besonderheiten: [
      "De baja retracción, de fraguado normal",
      "Resistente a heladas y sales de deshielo",
      "Impermeable al agua, exento de cloruros",
      "Directriz DAfStb (SKVB II)",
    ],
    technischeDaten: [
      { label: "Granulometría", wert: "0–5 mm" },
      { label: "Aplicación", wert: "Mezclado + bombeo / vertido" },
      { label: "Forma de suministro", wert: "envases de 25 kg" },
    ],
  },
  "neodur-svm-03": {
    kurzbeschreibung: "Mortero de relleno rápido para secciones de relleno de 5 a 20 mm",
    beschreibung: "Mortero de relleno de endurecimiento rápido para secciones de relleno de 5 a 20 mm. Une el hormigón de forma solidaria con los elementos de acero embebidos cuando se exige una rápida puesta en servicio.",
    besonderheiten: ["De endurecimiento rápido", "Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Sección de relleno", wert: "5–20 mm" },
    ],
  },
  "neodur-msm-3": {
    kurzbeschreibung: "Mortero proyectado para la reparación de hormigón, granulometría de 0 a 3 mm",
    beschreibung: "La reparación de hormigón comprende tecnologías para la restauración de elementos constructivos de hormigón. NEODUR MSM 3 es un mortero proyectado mineral con granulometría de 0 a 3 mm; aplicación según DIN 18551 en combinación con DIN EN 14487.",
    besonderheiten: ["Declaración ambiental de producto (EPD de grupo) disponible"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–3 mm" },
    ],
  },
  "neodur-msm-5": {
    kurzbeschreibung: "Mortero proyectado para la reparación de hormigón, granulometría de 0 a 5 mm",
    beschreibung: "La reparación de hormigón comprende tecnologías para la restauración de elementos constructivos de hormigón. NEODUR MSM 5 es un mortero proyectado mineral con granulometría de 0 a 5 mm.",
    technischeDaten: [
      { label: "Granulometría", wert: "0–5 mm" },
    ],
  },
  "neodur-msb-8": {
    kurzbeschreibung: "Hormigón proyectado para la reparación de hormigón, granulometría de 0 a 8 mm",
    beschreibung: "La reparación de hormigón comprende tecnologías para la restauración de elementos constructivos de hormigón. NEODUR MSB 8 es un hormigón proyectado mineral con granulometría de 0 a 8 mm.",
    technischeDaten: [
      { label: "Granulometría", wert: "0–8 mm" },
    ],
  },
  "rapid-set-concrete-mix": {
    kurzbeschreibung: "Hormigón rápido de endurecimiento rápido para espesores de colocación de 50 a 600 mm, cargable tras 1 hora",
    beschreibung: "CONCRETE MIX es un mortero de reparación de endurecimiento rápido y fácil aplicación, a base de cemento Rapid Set con áridos minerales especialmente seleccionados. Ideal donde se exigen resistencias rápidas, durabilidad y un endurecimiento de baja retracción. Aplicable en espesores de 50 a 600 mm, también en zonas húmedas; no metálico y sin aditivos de cloruros.",
    besonderheiten: ["Espesores de colocación de hasta 600 mm en una sola operación", "No metálico, sin aditivos de cloruros", "Adecuado en zonas húmedas"],
    technischeDaten: [
      { label: "Granulometría", wert: "0–8 mm" },
      { label: "Inicio de fraguado", wert: "tras 15 min" },
      { label: "Cargable", wert: "tras 60 min" },
      { label: "Resistencia a compresión", wert: "tras 60 min 19 N/mm², tras 28 días 41 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "tras 60 min 4,5 N/mm², tras 28 días 7 N/mm²" },
      { label: "Resistencia a heladas y sales de deshielo", wert: "sí" },
      { label: "Resistencia a sulfatos", wert: "sí" },
    ],
  },
  "rapid-set-concrete-pharmacy": {
    kurzbeschreibung: "Sistema de aditivos para controlar las propiedades de aplicación de los productos Rapid Set",
    beschreibung: "La CONCRETE PHARMACY comprende tres aditivos para controlar las propiedades de aplicación de los productos Rapid Set: SET Control retarda el fraguado y prolonga el tiempo de trabajabilidad, FLOW Control mejora la fluidez y reduce la demanda de agua de amasado entre un 20 y un 40 por ciento, FAST acelera el fraguado de CEMENT ALL, MORTAR MIX y CONCRETE MIX, ideal con temperaturas frías.",
    besonderheiten: ["Actúa sobre CEMENT ALL, MORTAR MIX y CONCRETE MIX", "FLOW Control: 20–40 % menos de agua de amasado con el mismo diámetro de extensión"],
    varianten: [
      { name: "SET Control", hinweis: "Retardador para un mayor tiempo de trabajabilidad" },
      { name: "FLOW Control", hinweis: "Fluidificante, incrementa las resistencias" },
      { name: "FAST Control", hinweis: "Acelerante para temperaturas frías" },
    ],
  },
  "koromineral-lasur": {
    kurzbeschreibung: "Impregnación especial con acabado superficial coloreado a base de silicato de litio",
    beschreibung: "KOROMINERAL Lasur se utiliza para la impregnación de superficies de solera y hormigón aglomeradas con cemento y especialmente de soleras KORODUR. La pigmentación crea un acabado superficial coloreado. Aplicación con rodillo de nailon de pelo corto en dos pasadas en cruz.",
    besonderheiten: ["Acabado superficial coloreado a base de silicato de litio", "Dos pasadas en cruz"],
    technischeDaten: [
      { label: "Forma", wert: "líquido" },
      { label: "Colores", wert: "gris piedra, gris ratón (no son colores RAL)" },
      { label: "Temperatura de la superficie", wert: "+10 °C a +25 °C" },
      { label: "Tiempo de secado entre pasadas", wert: "1–3 horas (según la temperatura)" },
    ],
  },
  "neodur-pfm-1k-easyfix": {
    kurzbeschreibung: "Mortero para juntas de adoquinado monocomponente, listo para su uso, para zonas peatonales",
    beschreibung: "NEODUR PFM 1K Easyfix sirve para el rejuntado y el saneamiento de superficies adoquinadas con cargas ligeras, p. ej. terrazas y aceras. Para anchos de junta a partir de 5 mm y profundidades de junta a partir de 30 mm.",
    besonderheiten: ["Listo para su uso, monocomponente", "Ancho de junta a partir de 5 mm, profundidad de junta a partir de 30 mm", "Solo para zonas peatonales (cargas ligeras)"],
    technischeDaten: [
      { label: "Colores", wert: "natural, gris piedra, basalto" },
      { label: "Densidad aparente del mortero endurecido", wert: "aprox. 1,37 kg/dm³" },
      { label: "Resistencia a compresión", wert: "≥ 4,0 N/mm²" },
      { label: "Resistencia a flexotracción", wert: "≥ 2,2 N/mm²" },
      { label: "Tiempo de trabajabilidad", wert: "aprox. 20–30 minutos" },
      { label: "Temperatura", wert: "soporte > 8 °C, aplicación > 10 °C" },
      { label: "Transitable", wert: "tras 24 horas" },
    ],
  },
  "neodur-pfm-ze": {
    kurzbeschreibung: "Mortero para juntas de adoquinado a base de cemento para superficies de adoquines y losas en construcción rígida",
    beschreibung: "NEODUR PFM-ZE y PFM-ZE Flex son morteros secos fabricados en planta, a base de cemento y arena natural (0–2 mm), para el rejuntado de adoquines de piedra natural y de hormigón o losas de hormigón en construcción rígida, clases de construcción IV a VI. El ancho de junta debe ser de al menos 8 mm.",
    besonderheiten: ["Construcción rígida, clases de construcción IV a VI", "Curado: 7 días de cubrición con lámina"],
    technischeDaten: [
      { label: "Base", wert: "base de cemento y arena natural, granulometría 0–2 mm" },
      { label: "Tiempo de trabajabilidad", wert: "aprox. 40 minutos" },
      { label: "Temperatura de aplicación", wert: "+5 °C a +25 °C" },
      { label: "Cargable", wert: "con turismos tras 7 días" },
      { label: "Forma de suministro", wert: "envase especial de papel de 25 kg" },
    ],
    varianten: [
      { name: "NEODUR PFM-ZE", hinweis: "Superficies adoquinadas · gris/gris claro · resistencia a compresión ≥ 50 N/mm²" },
      { name: "NEODUR PFM-ZE Flex", hinweis: "Superficies de losas · gris · resistencia a compresión ≥ 40 N/mm²" },
    ],
  },
};

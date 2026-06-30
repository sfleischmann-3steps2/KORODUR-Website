import { produkte } from "./produkte";
import type { Referenz } from "./types";

// Leitet den primären Produktbereich einer Referenz aus ihren Produkten ab
// (Steffi, 2026-06-13, #99 — "Projektart · Bereich"-Tag auf der Referenzkarte).
// Referenz.produkte führt Produkt- ODER Variantennamen, daher beide gemappt.
const NAME_TO_BEREICH = new Map<string, string>();
for (const p of produkte) {
  NAME_TO_BEREICH.set(p.name.toLowerCase(), p.bereich);
  for (const v of (p as { varianten?: { name: string }[] }).varianten ?? []) {
    NAME_TO_BEREICH.set(v.name.toLowerCase(), p.bereich);
  }
}

const PRODUKTBEREICH_LABELS: Record<string, Record<string, string>> = {
  industrieboden: { de: "Industrieboden", en: "Industrial floor", fr: "Sol industriel", pl: "Posadzka przemysłowa", es: "Suelo industrial" },
  sichtestrich: { de: "Sichtestrich", en: "Designer screed", fr: "Chape décorative", pl: "Jastrych dekoracyjny", es: "Solado decorativo" },
  microtop: { de: "Trinkwasser", en: "Potable water", fr: "Eau potable", pl: "Woda pitna", es: "Agua potable" },
  "rapid-set": { de: "Rapid Set", en: "Rapid Set", fr: "Rapid Set", pl: "Rapid Set", es: "Rapid Set" },
  betonsanierung: { de: "Betonsanierung", en: "Concrete Repair", fr: "Réparation du béton", pl: "Naprawa betonu", es: "Reparación del hormigón" },
  spezialmoertel: { de: "Spezialmörtel", en: "Special mortars", fr: "Mortiers spéciaux", pl: "Zaprawy specjalne", es: "Morteros especiales" },
  katzenstreu: { de: "Katzenstreu", en: "Cat litter", fr: "Litière", pl: "Żwirek", es: "Arena para gatos" },
};

/** Häufigster Produktbereich über die eingesetzten Produkte (oder null). */
export function referenzProduktbereich(ref: Referenz): string | null {
  const counts = new Map<string, number>();
  for (const name of ref.produkte) {
    const b = NAME_TO_BEREICH.get(name.toLowerCase());
    if (b) counts.set(b, (counts.get(b) ?? 0) + 1);
  }
  if (counts.size === 0) return null;
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

export function produktbereichLabel(slug: string, lang: string): string {
  const m = PRODUKTBEREICH_LABELS[slug];
  return m ? (m[lang] ?? m.de) : "";
}

/** Akzentfarbe je Produktbereich für das Karten-Flag (Steffi 2026-06-25, #352):
 *  unterschiedliche Themen → unterschiedliche Farben statt nur Neubau/Sanierung.
 *  CD erlaubt knallige Töne; Textfarbe je Hintergrund kontrastsicher (Gelb →
 *  Navy-Text). Fallback (kein/unbekannter Bereich): Navy. */
const PRODUKTBEREICH_FARBE: Record<string, { bg: string; text: string }> = {
  industrieboden: { bg: "#002d59", text: "#ffffff" },
  sichtestrich: { bg: "#6d5bba", text: "#ffffff" },
  microtop: { bg: "#0e9b96", text: "#ffffff" },
  "rapid-set": { bg: "#ffc400", text: "#002d59" },
  betonsanierung: { bg: "#ffc400", text: "#002d59" },
  spezialmoertel: { bg: "#e8651e", text: "#ffffff" },
  infrastruktur: { bg: "#5a7184", text: "#ffffff" },
  katzenstreu: { bg: "#4caf50", text: "#ffffff" },
};

export function produktbereichFarbe(slug: string | null): { bg: string; text: string } {
  return (slug ? PRODUKTBEREICH_FARBE[slug] : undefined) ?? { bg: "#002d59", text: "#ffffff" };
}

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
  spezialbaustoffe: { de: "Spezialbaustoffe", en: "Special mortars", fr: "Mortiers spéciaux", pl: "Materiały specjalne", es: "Morteros especiales" },
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

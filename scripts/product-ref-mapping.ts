import { produkte } from "../data/produkte";
import { referenzen } from "../data/referenzen";

const productToRefs = new Map<string, { slug: string; titel: string; ort: string; jahr?: string }[]>();
for (const p of produkte) productToRefs.set(p.name, []);

const unknown = new Map<string, { slug: string; titel: string; ort: string }[]>();
const emptyRefs: { slug: string; titel: string; ort: string; loesung: string }[] = [];

for (const r of referenzen) {
  const ort = r.ort ?? "";
  if (!r.produkte || r.produkte.length === 0) {
    emptyRefs.push({ slug: r.slug, titel: r.titel, ort, loesung: r.loesung ?? "" });
    continue;
  }
  for (const pn of r.produkte) {
    if (productToRefs.has(pn)) {
      productToRefs.get(pn)!.push({ slug: r.slug, titel: r.titel, ort });
    } else {
      if (!unknown.has(pn)) unknown.set(pn, []);
      unknown.get(pn)!.push({ slug: r.slug, titel: r.titel, ort });
    }
  }
}

console.log(`Refs mit leerem produkte:[] -> ${emptyRefs.length}`);
for (const r of emptyRefs.slice(0, 50)) {
  const mentioned: string[] = [];
  for (const p of produkte) if (r.loesung.includes(p.name.replace(" rapid", "")) || r.loesung.includes(p.name)) mentioned.push(p.name);
  // Also search for new products
  const newProducts = ["NEODUR HE 40", "DOT Europe CONCRETE MIX", "KORODUR TXPK", "KORODUR uniPrimer", "Rapid Set CONCRETE MIX"];
  for (const np of newProducts) if (r.loesung.includes(np)) mentioned.push(`[NEU?] ${np}`);
  console.log(`  - ${r.titel} (${r.ort}) [${r.slug}] -> erwähnt: ${mentioned.join(", ") || "(nichts)"}`);
}

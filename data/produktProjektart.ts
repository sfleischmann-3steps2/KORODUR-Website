// Projektart (Neubau/Sanierung) auf Produktebene — derive-at-build (#240, löst #83).
//
// Das Repo trägt Projektart nicht als statisches Feld am Produkt, sondern leitet
// es zur Build-Zeit aus den Referenzen ab: welche Referenzen setzen das Produkt
// (oder eine seiner Varianten) ein → `projektartBucket(projekttyp)`. Für die
// referenzlosen Produkte und die 3 Referenz↔Notion-Konflikte greift eine
// Override-Tabelle (Quelle: Notion DB1 `Neubau/Sanierung`, Stand Crosswalk
// 2026-06-18). Unbekannt → beide (Produkt wird in keinem Bereich versteckt).
//
// Reihenfolge: Override > Referenz-Ableitung > beide.
//
// Overrides regenerieren (nach Referenz- oder Notion-Änderungen):
//   npx tsx scripts/derive-produkt-projektart.ts
//   python3 scripts/crosswalk-projektart-notion.py   # → projektart-overrides.json
// Werte aus docs/reference/produktart-klassifizierung/projektart-overrides.json.
import { referenzen } from "./referenzen";
import { produkte } from "./produkte";
import { projektartBucket, type Projektart } from "./einsatzbereichMapping";

/** Referenzlose Produkte + Konflikte (Referenz ∪ Notion). Quelle: Notion DB1. */
export const PRODUKT_PROJEKTART_OVERRIDES: Record<string, Projektart[]> = {
  "granidur": ["neubau", "sanierung"],
  "korodur-diamantbeton": ["neubau", "sanierung"],
  "korodur-easyfinish": ["neubau"],
  "korodur-fscem": ["neubau", "sanierung"],
  "korodur-fscem-screed": ["neubau", "sanierung"],
  "korodur-nanofinish": ["neubau"],
  "korodur-robust": ["neubau", "sanierung"],
  "korodur-uniprimer": ["neubau", "sanierung"],
  "korodur-wh-metallisch": ["neubau", "sanierung"],
  "korodur-wh-spezial": ["neubau", "sanierung"],
  "koromineral-lasur": ["neubau", "sanierung"],
  "microtop-tw-vsm": ["sanierung"],
  "neodur-he-2": ["neubau"],
  "neodur-he-3-green": ["neubau"],
  "neodur-he-40": ["neubau", "sanierung"],
  "neodur-level-au": ["neubau"],
  "neodur-msm-3": ["neubau", "sanierung"],
  "neodur-pfm-1k-easyfix": ["neubau", "sanierung"],
  "rapid-set-mortar-mix": ["neubau", "sanierung"],
  "tru-sp": ["neubau"],
};

// Build-Zeit-Ableitung: Name→id-Index (inkl. Varianten), dann Buckets je Produkt.
const derived: Map<string, Set<Projektart>> = (() => {
  const nameToId = new Map<string, string>();
  for (const p of produkte) {
    nameToId.set(p.name.toLowerCase(), p.id);
    for (const v of p.varianten ?? []) {
      if (v.name) nameToId.set(v.name.toLowerCase(), p.id);
    }
  }
  const acc = new Map<string, Set<Projektart>>();
  for (const ref of referenzen) {
    const bucket = projektartBucket(ref.projekttyp);
    for (const raw of ref.produkte) {
      const id = nameToId.get(raw.toLowerCase());
      if (!id) continue;
      let set = acc.get(id);
      if (!set) acc.set(id, (set = new Set<Projektart>()));
      set.add(bucket);
    }
  }
  return acc;
})();

const BEIDE: Projektart[] = ["neubau", "sanierung"];

/** Projektart-Set eines Produkts (Override > Referenz-Ableitung > beide). */
export function produktProjektart(id: string): Projektart[] {
  const ov = PRODUKT_PROJEKTART_OVERRIDES[id];
  if (ov) return ov;
  const d = derived.get(id);
  if (d && d.size) return [...d].sort();
  return BEIDE;
}

/** Ist das Produkt für die gegebene Projektart relevant? (#83-Bereichsfilter) */
export function produktHatProjektart(id: string, art: Projektart): boolean {
  return produktProjektart(id).includes(art);
}

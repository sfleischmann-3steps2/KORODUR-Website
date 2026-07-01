// Projektart (Neubau/Sanierung) auf Produktebene (#240, löst #83).
//
// SoT seit 2026-06-23: die **Notion-Produktdatenbank-View** „Kern Produktdaten"
// (Property „Neubau/Sanierung"), die Technik im Termin produktweise durchgegangen
// und committet hat. Sie ist der offizielle aktuelle Stand und löst das frühere
// Leistungskatalog-Dokument ab (Steffi 2026-06-23: „Notion gewinnt eindeutig").
// Marginale Abweichungen zum Dokument sind gewollt — z. B. die Rapid-Set-
// Reparaturmörtel-Familie + LevelFlor + MSM/MSB = jetzt Neubau UND Sanierung,
// SVM 03/04 + VM 5 = nur Neubau, KOROCURE/WH-Spezial/Diamantbeton = beides.
//
// Für Produkte, die NICHT in der View stehen (Lasur, Katzenstreu, Silosystem,
// Concrete Pharmacy …) gilt: Override > Referenz-Ableitung > beide (nichts
// wird versteckt).
//
// Reihenfolge: Override > Referenz-Ableitung > beide.
import { referenzen } from "./referenzen";
import { produkte } from "./produkte";
import { projektartBucket, type Projektart } from "./einsatzbereichMapping";

const N: Projektart[] = ["neubau"];
const S: Projektart[] = ["sanierung"];
const NS: Projektart[] = ["neubau", "sanierung"];

/** Autoritative Projektart-Zuordnung aus der Notion-View (1:1). */
export const PRODUKT_PROJEKTART_OVERRIDES: Record<string, Projektart[]> = {
  // --- Notion: Neubau UND Sanierung ---
  "korodur-0-4": NS,
  "korodur-vs-0-5": NS,
  "korodur-wh-spezial": NS,
  "korodur-wh-metallisch": NS,
  "korodur-diamantbeton": NS,
  "korodur-robust": NS,
  "neodur-he-65": NS,
  "neodur-he-65-svs-3": NS,
  "neodur-he-65-svs-15": NS,
  "neodur-he-65-metallisch": NS,
  "neodur-he-40": NS,
  "korodur-fscem": NS,
  "korodur-fscem-screed": NS,
  "tru-self-leveling": NS,
  "tru-pc": NS,
  "tru-sp": NS,
  "korocure": NS,
  "koromineral-cure": NS,
  "korotex": NS,
  "korodur-easyfinish": NS,
  "korodur-nanofinish": NS,
  "koromineral": NS,
  "koromineral-li": NS,
  "koroclean": NS,
  "korodur-hb-5-rapid": NS,
  "korodur-pc": NS,
  "korodur-txpk": NS,
  "korocrete": NS,
  "rapid-set-schnellbeton": NS,
  "rapid-set-cement-all": NS,
  "rapid-set-mortar-mix": NS,
  "rapid-set-mortar-mix-dur": NS,
  "rapid-set-concrete-mix": NS,
  "dot-europe-concrete-mix": NS,
  "rapid-set-levelflor": NS,
  "neodur-vm-basic": NS,
  "neodur-msm-3": NS,
  "neodur-msm-5": NS,
  "neodur-msb-8": NS,
  "neodur-pfm-1k-easyfix": NS,
  "neodur-pfm-ze": NS,

  // --- Notion: nur Neubau ---
  "neodur-he-3": N,
  "neodur-he-3-green": N,
  "neodur-he-3-svs-3": N,
  "neodur-he-3-svs-15": N,
  "neodur-he-3-metallisch": N,
  "neodur-he-2": N,
  "granidur": N,
  "granidur-bianco-nero": N,
  "kcf": N, // KCF 05/08
  "korophalt-02": N,
  "neodur-vm-1": N, // VM 1 / VM 3 / VB 8
  "neodur-vm-5": N,
  "neodur-svm-03": N,
  "neodur-svm-4": N, // SVM 04

  // --- Notion: nur Sanierung ---
  "neodur-he-60-rapid": S,
  "neodur-he-65-plus": S,
  "neodur-he-65-plus-svs-3": S,
  "neodur-level": S,
  "neodur-level-au": S,
  "korodur-hb-5": S,
  "korodur-uniprimer": S,
  "korodur-durop": S,
  "asphalt-repair-mix": S,
  "microtop-tw-02": S,
  "microtop-tw-bm": S,
  "microtop-tw-vsm": S,
  "microtop-tw-3": S,
  "microtop-tw-5": S,
  "microtop-tw-8": S,
  "microtop-tw-nsm": S,
  "microtop-tw-mineral": S,
  // NEODUR USM (Unterstopfmörtel) — Notion-88er-Set (#306)
  "neodur-usm-3": S,
  "neodur-usm-5": S,

  // --- Nicht in der Notion-View: bestehende Einordnung ---
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

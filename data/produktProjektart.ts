// Projektart (Neubau/Sanierung) auf Produktebene (#240, löst #83).
//
// SoT seit 2026-06-22: das Kollegen-/Leistungskatalog-Dokument „Übersicht
// Portfolio Neubau u. Sanierung" (extrahiert nach docs/specs/2026-06-22-
// portfolio-bereiche-mapping.md §4) ist die **autoritative** Neubau/Sanierung-
// Klassifizierung. Konfliktregel (Steffi): bei Widerspruch zur Technik-Mail
// („kann … sein") oder zur Referenz-Ableitung gewinnt das Dokument. Die
// Override-Tabelle unten ist 1:1 aus §4 gepflegt und deckt jedes im Dokument
// gelistete Produkt explizit ab.
//
// Für Produkte, die NICHT im Dokument stehen (KOROCRETE, Robust, Lasur,
// Katzenstreu, SVM 4, …), gilt weiter: Override (falls vorhanden) > Referenz-
// Ableitung aus den Projekten > beide (Produkt wird nirgends versteckt).
//
// Reihenfolge: Override > Referenz-Ableitung > beide.
import { referenzen } from "./referenzen";
import { produkte } from "./produkte";
import { projektartBucket, type Projektart } from "./einsatzbereichMapping";

const N: Projektart[] = ["neubau"];
const S: Projektart[] = ["sanierung"];
const NS: Projektart[] = ["neubau", "sanierung"];

/** Autoritative Projektart-Zuordnung. Dokument-§4 (SoT) für alle dort gelisteten
 *  Produkte; danach wenige Nicht-Dokument-Produkte (Notion/Ableitung). */
export const PRODUKT_PROJEKTART_OVERRIDES: Record<string, Projektart[]> = {
  // --- Dokument §4: Neubau UND Sanierung ---
  "korodur-0-4": NS,
  "korodur-vs-0-5": NS,
  "neodur-he-65": NS,
  "neodur-he-40": NS,
  "tru-self-leveling": NS,
  "tru-pc": NS,
  "tru-sp": NS,
  "korotex": NS,
  "koromineral-cure": NS,
  "korodur-easyfinish": NS,
  "korodur-nanofinish": NS,
  "koromineral": NS,
  "koromineral-li": NS,
  "koroclean": NS,
  "neodur-vm-5": NS,
  "neodur-vm-basic": NS,
  "neodur-pfm-1k-easyfix": NS,
  "neodur-pfm-ze": NS,

  // --- Dokument §4: nur Neubau ---
  "korodur-wh-spezial": N,
  "korodur-wh-metallisch": N,
  "korodur-diamantbeton": N,
  "neodur-he-3": N,
  "neodur-he-3-green": N,
  "neodur-he-2": N,
  "korodur-fscem": N,
  "korodur-fscem-screed": N,
  "granidur": N, // Doc-wins ggü. Technik-Mail „kann beides"
  "granidur-bianco-nero": N,
  "kcf": N, // KCF 05/08 — Doc-wins
  "korocure": N,
  "neodur-vm-1": N, // VM 1 / VM 3 / VB 8

  // --- Dokument §4: nur Sanierung ---
  "neodur-he-65-plus": S,
  "neodur-he-60-rapid": S,
  "neodur-level": S,
  "neodur-level-au": S, // Doc-wins ggü. Technik-Mail „kann beides"
  "korodur-hb-5": S,
  "korodur-hb-5-rapid": S,
  "korodur-pc": S,
  "korodur-uniprimer": S,
  "korodur-txpk": S,
  "korodur-durop": S, // Doc-wins ggü. Technik 2026-06-18 „beides"
  "rapid-set-cement-all": S,
  "rapid-set-mortar-mix": S, // Doc-wins ggü. Technik 2026-06-18 „beides"
  "rapid-set-concrete-mix": S,
  "dot-europe-concrete-mix": S,
  "asphalt-repair-mix": S,
  "rapid-set-levelflor": S, // Doc/O1 (Industrieboden-Sanierung)
  "neodur-svm-03": S,
  "neodur-msm-3": S,
  "neodur-msm-5": S,
  "neodur-msb-8": S,
  "microtop-tw-02": S,
  "microtop-tw-bm": S,
  "microtop-tw-vsm": S,
  "microtop-tw-3": S,
  "microtop-tw-5": S,
  "microtop-tw-8": S,
  "microtop-tw-nsm": S,
  "microtop-tw-mineral": S,

  // --- Nicht im Dokument: bestehende Einordnung (Notion / Ableitung) ---
  "korodur-robust": NS, // DUROP-Schwester, kein Doc-Eintrag
  "koromineral-lasur": NS,
  "neodur-svm-4": S, // analog SVM 03 (Schnellverguss, Betonsanierung)
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

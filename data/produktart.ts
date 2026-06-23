// Produktart = Achse A „Portfolio" (Zwei-Achsen-IA, #306/#307).
//
// WAS stellen wir her — die offizielle Produkttyp-Taxonomie aus der Notion-
// Produktdatenbank-View „Kern Produktdaten" (Property „Produktart"), von der
// Technik produktweise committet. SoT seit 2026-06-23 (Steffi: „Notion gewinnt
// eindeutig"). Gegenstück zu Achse B (Bereiche = WOFÜR).
//
// Zuordnung pro Produkt (Notion ist per-Produkt, nicht aus produktgruppe
// ableitbar — z. B. Hartstoffeinstreuung vs. Hartstoffschicht). „Ankermörtel"
// entfällt (nicht für die Website vorgesehen). Produkte ohne Notion-Produktart
// (Katzenstreu, Systeme, Lasur, Concrete Pharmacy) → undefined → „Weitere".

export type Produktart =
  | "hartstoff-din1100"
  | "hartstoffeinstreuung"
  | "hartstoffschicht"
  | "estrich-bindemittel"
  | "schnellestrich"
  | "bodenausgleichsmasse"
  | "schnellbetonsysteme"
  | "sichtestrich"
  | "reparaturmoertel"
  | "spritzmoertel"
  | "spritzbeton"
  | "vergussmoertel"
  | "vergussbeton"
  | "pflasterfugenmoertel"
  | "unterstopfmoertel"
  | "haftbruecken-grundierungen"
  | "nachbehandlung"
  | "impraegnierung-einpflege"
  | "additive"
  | "tw-beschichtungsmoertel"
  | "sonstiges";

/** Anzeige-Reihenfolge (Industrieböden → Sichtestrich → Beton-Instandsetzung &
 *  Spezialmörtel → Begleitprodukte → TW → Sonstiges). */
export const PRODUKTART_REIHENFOLGE: Produktart[] = [
  "hartstoff-din1100",
  "hartstoffeinstreuung",
  "hartstoffschicht",
  "estrich-bindemittel",
  "schnellestrich",
  "bodenausgleichsmasse",
  "schnellbetonsysteme",
  "sichtestrich",
  "reparaturmoertel",
  "spritzmoertel",
  "spritzbeton",
  "vergussmoertel",
  "vergussbeton",
  "pflasterfugenmoertel",
  "unterstopfmoertel",
  "haftbruecken-grundierungen",
  "nachbehandlung",
  "impraegnierung-einpflege",
  "additive",
  "tw-beschichtungsmoertel",
  "sonstiges",
];

/** Pro-Produkt-Produktart, 1:1 aus der Notion-View. */
const ID_ZU_PRODUKTART: Record<string, Produktart> = {
  // Hartstoff (DIN 1100)
  "korodur-0-4": "hartstoff-din1100",
  "korodur-vs-0-5": "hartstoff-din1100",
  "korodur-wh-spezial": "hartstoff-din1100",
  "korodur-wh-metallisch": "hartstoff-din1100",
  "korodur-diamantbeton": "hartstoff-din1100",
  "korodur-robust": "hartstoff-din1100",
  // Hartstoffeinstreuung
  "neodur-he-3": "hartstoffeinstreuung",
  "neodur-he-3-green": "hartstoffeinstreuung",
  "neodur-he-2": "hartstoffeinstreuung",
  // Hartstoffschicht
  "neodur-he-65": "hartstoffschicht",
  "neodur-he-65-plus": "hartstoffschicht",
  "neodur-he-40": "hartstoffschicht",
  "neodur-he-60-rapid": "hartstoffschicht",
  // Estrich-Bindemittel
  "korodur-fscem": "estrich-bindemittel",
  // Schnellestrich
  "korodur-fscem-screed": "schnellestrich",
  "neodur-level": "schnellestrich",
  // Bodenausgleichsmasse
  "neodur-level-au": "bodenausgleichsmasse",
  "rapid-set-levelflor": "bodenausgleichsmasse",
  // Schnellbetonsysteme (KOROCRETE + Rapid Set Schnellbeton)
  "korocrete": "schnellbetonsysteme",
  "rapid-set-schnellbeton": "schnellbetonsysteme",
  // Sichtestrich
  "tru-self-leveling": "sichtestrich",
  "tru-pc": "sichtestrich",
  "tru-sp": "sichtestrich",
  "kcf": "sichtestrich",
  "granidur": "sichtestrich",
  "granidur-bianco-nero": "sichtestrich",
  // Reparaturmörtel
  "rapid-set-cement-all": "reparaturmoertel",
  "rapid-set-mortar-mix": "reparaturmoertel",
  "rapid-set-mortar-mix-dur": "reparaturmoertel",
  "rapid-set-concrete-mix": "reparaturmoertel",
  "dot-europe-concrete-mix": "reparaturmoertel",
  "asphalt-repair-mix": "reparaturmoertel",
  // Spritzmörtel
  "neodur-msm-3": "spritzmoertel",
  // Spritzbeton
  "neodur-msm-5": "spritzbeton",
  "neodur-msb-8": "spritzbeton",
  // Vergussmörtel
  "neodur-vm-1": "vergussmoertel",
  "neodur-svm-03": "vergussmoertel",
  "neodur-svm-4": "vergussmoertel",
  // Vergussbeton
  "neodur-vm-5": "vergussbeton",
  "neodur-vm-basic": "vergussbeton",
  // Pflasterfugenmörtel
  "neodur-pfm-1k-easyfix": "pflasterfugenmoertel",
  "neodur-pfm-ze": "pflasterfugenmoertel",
  // Haftbrücken & Grundierungen
  "korodur-hb-5": "haftbruecken-grundierungen",
  "korodur-hb-5-rapid": "haftbruecken-grundierungen",
  "korodur-pc": "haftbruecken-grundierungen",
  "korodur-txpk": "haftbruecken-grundierungen",
  "korodur-uniprimer": "haftbruecken-grundierungen",
  // Oberflächenvergütung (Notion-Produktart) → für die Website nach Property
  // „Gewerk" feiner aufgeteilt: Nachbehandlung vs. Imprägnierung/Einpflege
  // (Steffi 2026-06-23; Notion-interner Produktart↔Gewerk-Swap noch in Klärung).
  "korocure": "nachbehandlung",
  "koromineral-cure": "nachbehandlung",
  "korotex": "nachbehandlung",
  "korodur-easyfinish": "nachbehandlung",
  "korodur-nanofinish": "nachbehandlung",
  "koromineral": "impraegnierung-einpflege",
  "koromineral-li": "impraegnierung-einpflege",
  "koroclean": "impraegnierung-einpflege",
  // MICROTOP TW Mineral: Gewerk TW-Sanierung → zu den TW-Produkten.
  "microtop-tw-mineral": "tw-beschichtungsmoertel",
  // TW-Beschichtungsmörtel
  "microtop-tw-02": "tw-beschichtungsmoertel",
  "microtop-tw-bm": "tw-beschichtungsmoertel",
  "microtop-tw-vsm": "tw-beschichtungsmoertel",
  "microtop-tw-3": "tw-beschichtungsmoertel",
  "microtop-tw-5": "tw-beschichtungsmoertel",
  "microtop-tw-8": "tw-beschichtungsmoertel",
  "microtop-tw-nsm": "tw-beschichtungsmoertel",
  // Additive (Concrete Pharmacy = Überbegriff der Rapid-Set-Additive
  // SET, FAST, SET CONTROL, FLOW CONTROL)
  "rapid-set-concrete-pharmacy": "additive",
  // Sonstiges
  "korodur-durop": "sonstiges",
};

/** Produktart eines Produkts (Notion-View). Produkte ohne Eintrag (Katzenstreu,
 *  KOROTAN-System — in Notion noch leer) → undefined → „Weitere". */
export function produktartVonProdukt(p: { id: string }): Produktart | undefined {
  return ID_ZU_PRODUKTART[p.id];
}

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

/** Pro-Produkt-Produktart(en), Multi aus der Notion-Kern-DB-View (SoT, 2026-07-01,
 *  Property „Produktart" auf Multi-Choice umgestellt). Ein Produkt kann mehreren
 *  Produktarten angehören (z. B. MICROTOP TW 3 = Spritzmörtel + TW-Beschichtungsmörtel,
 *  NEODUR HE 60 rapid = Hartstoffschicht + Schnellestrich) und erscheint dann im
 *  Portfolio unter jeder. Mehrdeutige Notion-Produktarten ohne eigenen Website-Slug
 *  (Oberflächenvergütung, Glätthilfe, Zwischennachbehandlung, Synthetisches Füll-/
 *  Abstreumaterial, Ankermörtel) fallen auf die bewusst gesetzte Code-/Gewerk-
 *  Zuordnung zurück. Reihenfolge je Produkt = PRODUKTART_REIHENFOLGE. */
const ID_ZU_PRODUKTART: Record<string, Produktart[]> = {
  "korodur-0-4": ["hartstoff-din1100"],
  "korodur-vs-0-5": ["hartstoff-din1100"],
  "korodur-wh-spezial": ["hartstoff-din1100"],
  "korodur-wh-metallisch": ["hartstoff-din1100"],
  "korodur-diamantbeton": ["hartstoff-din1100"],
  "korodur-robust": ["hartstoff-din1100"],
  "neodur-he-3": ["hartstoffeinstreuung"],
  "neodur-he-3-green": ["hartstoffeinstreuung"],
  "neodur-he-2": ["hartstoffeinstreuung"],
  "neodur-he-65": ["hartstoffschicht"],
  "neodur-he-65-plus": ["hartstoffschicht"],
  "neodur-he-40": ["hartstoffschicht"],
  "neodur-he-60-rapid": ["hartstoffschicht", "schnellestrich"],
  "korodur-fscem": ["estrich-bindemittel"],
  "korodur-fscem-screed": ["schnellestrich"],
  "neodur-level": ["schnellestrich", "bodenausgleichsmasse"],
  "neodur-level-au": ["schnellestrich", "bodenausgleichsmasse"],
  "rapid-set-levelflor": ["schnellestrich", "bodenausgleichsmasse"],
  "korocrete": ["schnellbetonsysteme"],
  "rapid-set-schnellbeton": ["schnellbetonsysteme"],
  "tru-self-leveling": ["sichtestrich"],
  "tru-pc": ["sichtestrich"],
  "tru-sp": ["sichtestrich"],
  "kcf": ["sichtestrich"],
  "granidur": ["sichtestrich"],
  "granidur-bianco-nero": ["sichtestrich"],
  "rapid-set-cement-all": ["reparaturmoertel"],
  "rapid-set-mortar-mix": ["reparaturmoertel"],
  "rapid-set-mortar-mix-dur": ["reparaturmoertel"],
  "rapid-set-concrete-mix": ["reparaturmoertel"],
  "dot-europe-concrete-mix": ["reparaturmoertel"],
  "asphalt-repair-mix": ["reparaturmoertel"],
  "neodur-msm-3": ["spritzmoertel"],
  "neodur-msm-5": ["spritzbeton"],
  "neodur-msb-8": ["spritzbeton"],
  "korophalt-02": ["vergussmoertel"],
  "neodur-vm-1": ["vergussmoertel"],
  "neodur-svm-03": ["vergussmoertel"],
  "neodur-svm-4": ["vergussmoertel"],
  "neodur-vm-5": ["vergussbeton"],
  "neodur-vm-basic": ["vergussbeton"],
  "neodur-pfm-1k-easyfix": ["pflasterfugenmoertel"],
  "neodur-pfm-ze": ["pflasterfugenmoertel"],
  "korodur-hb-5": ["haftbruecken-grundierungen"],
  "korodur-hb-5-rapid": ["haftbruecken-grundierungen"],
  "korodur-pc": ["haftbruecken-grundierungen"],
  "korodur-txpk": ["haftbruecken-grundierungen"],
  "korodur-uniprimer": ["haftbruecken-grundierungen"],
  "korocure": ["nachbehandlung"],
  "koromineral-cure": ["nachbehandlung"],
  "korotex": ["nachbehandlung"],
  "korodur-easyfinish": ["nachbehandlung"],
  "korodur-nanofinish": ["nachbehandlung"],
  "koromineral": ["impraegnierung-einpflege"],
  "koromineral-li": ["impraegnierung-einpflege"],
  "koroclean": ["impraegnierung-einpflege"],
  "microtop-tw-mineral": ["impraegnierung-einpflege"],
  "microtop-tw-02": ["tw-beschichtungsmoertel"],
  "microtop-tw-bm": ["spritzmoertel", "tw-beschichtungsmoertel"],
  "microtop-tw-vsm": ["spritzmoertel", "tw-beschichtungsmoertel"],
  "microtop-tw-3": ["spritzmoertel", "tw-beschichtungsmoertel"],
  "microtop-tw-5": ["spritzbeton", "tw-beschichtungsmoertel"],
  "microtop-tw-8": ["spritzbeton", "tw-beschichtungsmoertel"],
  "microtop-tw-nsm": ["spritzmoertel", "tw-beschichtungsmoertel"],
  "rapid-set-concrete-pharmacy": ["additive"],
  "korodur-durop": ["sonstiges"],
  "neodur-he-40-8": ["hartstoffschicht"],
  "neodur-he-60-rapid-svs-1-5": ["hartstoffschicht", "schnellestrich"],
  "neodur-he-60-rapid-svs-3": ["hartstoffschicht", "schnellestrich"],
  "neodur-he-60-rapid-metallisch": ["hartstoffschicht", "schnellestrich"],
  "neodur-usm-3": ["unterstopfmoertel"],
  "neodur-usm-5": ["unterstopfmoertel"],
  "neodur-vb-8": ["vergussbeton"],
  "neodur-vm-3": ["vergussmoertel"],
  "rapid-set-cement-all-plus": ["reparaturmoertel"],
  "rapid-set-fast": ["additive"],
  "rapid-set-flow-control": ["additive"],
  "rapid-set-set-control": ["additive"],
};

/** Alle Produktarten eines Produkts (Notion-View, Multi). Produkte ohne Eintrag
 *  (Katzenstreu, KOROTAN-System) → leeres Array → „Weitere". */
export function produktartenVonProdukt(p: { id: string }): Produktart[] {
  return ID_ZU_PRODUKTART[p.id] ?? [];
}

/** Erste/primäre Produktart (Abwärtskompatibilität). */
export function produktartVonProdukt(p: { id: string }): Produktart | undefined {
  return ID_ZU_PRODUKTART[p.id]?.[0];
}

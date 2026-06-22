// Produktart = Achse A „Portfolio" (Zwei-Achsen-IA, #306/#307).
//
// WAS stellen wir her — die Produkttypen des Lieferprogramms/Leistungskatalogs.
// Gegenstück zu Achse B (Bereiche = WOFÜR, Neubau/Sanierung). Ein Produkt hat
// genau EINE Produktart (anders als Bereiche, wo es mehrfach erscheinen kann).
//
// SoT: docs/specs/2026-06-22-portfolio-bereiche-mapping.md §2 (12 Katalog-
// Sektionen). `schnellbetonsysteme` ist die 13. Produktart (Steffi 2026-06-22):
// fasst KOROCRETE + Rapid Set Schnellbeton als Schnellbetonsysteme zusammen,
// wird in den Leistungskatalog aufgenommen (TDS folgt).
//
// Ableitung primär aus der `produktgruppe` (bereichsbezogen), mit ID-Overrides
// für die wenigen Fälle, in denen eine Gruppe heterogen ist (z. B. `schnellbeton`
// = KOROCRETE vs. Rapid-Set-Schnellbeton; `systeme` = KOROCLEAN vs. Silosystem).

export type Produktart =
  | "hartstoffe-din1100"
  | "industrieboden-trockenmoertel"
  | "schnellestrich-bindemittel"
  | "selbstverlaufende-industrieboeden"
  | "mineralische-sichtestriche"
  | "haftbruecke-grundierung"
  | "nachbehandlung-curing"
  | "impraegnierung-einpflege"
  | "durop"
  | "rapid-set"
  | "spezialmoertel"
  | "microtop"
  | "schnellbetonsysteme";

/** Anzeige-Reihenfolge = Lieferkatalog-Sektionen 1–12, plus „Schnellbeton-
 *  systeme" (KOROCRETE + Rapid Set Schnellbeton), Katalog-Aufnahme angestoßen. */
export const PRODUKTART_REIHENFOLGE: Produktart[] = [
  "hartstoffe-din1100",
  "industrieboden-trockenmoertel",
  "schnellestrich-bindemittel",
  "selbstverlaufende-industrieboeden",
  "schnellbetonsysteme",
  "mineralische-sichtestriche",
  "haftbruecke-grundierung",
  "nachbehandlung-curing",
  "impraegnierung-einpflege",
  "durop",
  "rapid-set",
  "spezialmoertel",
  "microtop",
];

/** produktgruppe → Produktart (Standardfall). Heterogene Gruppen
 *  (schnellbeton, systeme) sowie Katzenstreu (premium/standard) sind bewusst
 *  NICHT gelistet — die werden über ID-Overrides bzw. gar nicht abgebildet. */
const GRUPPE_ZU_PRODUKTART: Record<string, Produktart> = {
  hartstoffeinstreuung: "hartstoffe-din1100",
  hartstoffestriche: "industrieboden-trockenmoertel",
  schnellestrich: "schnellestrich-bindemittel",
  selbstverlaufend: "selbstverlaufende-industrieboeden",
  geschliffen: "mineralische-sichtestriche",
  geglaettet: "mineralische-sichtestriche",
  truazzo: "mineralische-sichtestriche",
  "untergrund-haftbruecken": "haftbruecke-grundierung",
  nachbehandlung: "nachbehandlung-curing",
  impraegnierung: "impraegnierung-einpflege",
  "kunstharz-hartstoffe": "durop",
  reparaturmoertel: "rapid-set",
  additive: "rapid-set",
  verguss: "spezialmoertel",
  spritzmoertel: "spezialmoertel",
  pflasterfugen: "spezialmoertel",
  trockenspritz: "microtop",
  nassspritz: "microtop",
  "beschichtung-schutz": "microtop",
};

/** Pro-Produkt-Overrides für heterogene Gruppen. KOROCRETE + Rapid Set
 *  Schnellbeton bilden zusammen die Produktart „Schnellbetonsysteme". */
const ID_ZU_PRODUKTART: Record<string, Produktart> = {
  korocrete: "schnellbetonsysteme",
  "rapid-set-schnellbeton": "schnellbetonsysteme",
  koroclean: "impraegnierung-einpflege",
};

/** Produktart eines Produkts. ID-Override schlägt Gruppen-Ableitung. Produkte
 *  ohne Katalog-Produktart (Silosystem, KORODUR-KOROTAN-System, Katzenstreu)
 *  liefern undefined. */
export function produktartVonProdukt(p: {
  id: string;
  produktgruppe?: string;
}): Produktart | undefined {
  if (ID_ZU_PRODUKTART[p.id]) return ID_ZU_PRODUKTART[p.id];
  if (!p.produktgruppe) return undefined;
  return GRUPPE_ZU_PRODUKTART[p.produktgruppe];
}

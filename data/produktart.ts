// Produktart = Achse A „Portfolio" (Zwei-Achsen-IA, #306/#307).
//
// WAS stellen wir her — die Produkttypen des Lieferprogramms/Leistungskatalogs.
// Gegenstück zu Achse B (Bereiche = WOFÜR, Neubau/Sanierung). Ein Produkt hat
// genau EINE Produktart (anders als Bereiche, wo es mehrfach erscheinen kann).
//
// SoT: docs/specs/2026-06-22-portfolio-bereiche-mapping.md §2 (12 Katalog-
// Sektionen). `konstruktiver-schnellbeton` (KOROCRETE) ist eine 13. Produktart,
// die noch in den offiziellen Katalog aufgenommen wird (Spec §5.3/§8.1.2).
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
  | "konstruktiver-schnellbeton";

/** Anzeige-Reihenfolge = Lieferkatalog-Sektionen 1–12, danach die noch nicht
 *  katalogisierte Produktart „Konstruktiver Schnellbeton". */
export const PRODUKTART_REIHENFOLGE: Produktart[] = [
  "hartstoffe-din1100",
  "industrieboden-trockenmoertel",
  "schnellestrich-bindemittel",
  "selbstverlaufende-industrieboeden",
  "konstruktiver-schnellbeton",
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

/** Pro-Produkt-Overrides für heterogene Gruppen. */
const ID_ZU_PRODUKTART: Record<string, Produktart> = {
  korocrete: "konstruktiver-schnellbeton",
  "rapid-set-schnellbeton": "rapid-set",
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

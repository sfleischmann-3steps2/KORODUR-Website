// Produktart / Rolle im Bodenaufbau (#93).
//
// Industrieboden mischte im Listing Bodenprodukte, Haftbrücken, Nachbehandlung
// und Imprägnierung in einem Grid. Diese Rolle gliedert das Listing: zuerst die
// Bodenprodukte, dann Haftbrücken/Untergrund, dann Oberflächenfinish.
//
// Ableitung aus der Produktgruppe (selbst aus der Excel-/Kollegen-Matrix
// abgeleitet): HB 5 = Haftbrücke, easyFinish = Nachbehandlung,
// KOROMINERAL = Imprägnierung (→ Oberflächenfinish).

export type Produktart = "bodenprodukt" | "haftbruecke" | "oberflaechenfinish";

/** Anzeige-Reihenfolge der Rollen-Sektionen — Bodenprodukte führen. */
export const PRODUKTART_REIHENFOLGE: Produktart[] = [
  "bodenprodukt",
  "haftbruecke",
  "oberflaechenfinish",
];

/** Industrieboden-Produktgruppen → Rolle. Additive/Systeme zählen zum
 *  Bodenprodukt-Kontext (Teil des Bodensystems), bis Technik (Frank) eine
 *  feinere Trennung wünscht. Nicht gelistete Gruppen → undefined. */
const GRUPPE_ZU_PRODUKTART: Record<string, Produktart> = {
  hartstoffestriche: "bodenprodukt",
  hartstoffeinstreuung: "bodenprodukt",
  hartstoffe: "bodenprodukt",
  schnellestrich: "bodenprodukt",
  selbstverlaufend: "bodenprodukt",
  "kunstharz-hartstoffe": "bodenprodukt",
  systeme: "bodenprodukt",
  additive: "bodenprodukt",
  "untergrund-haftbruecken": "haftbruecke",
  nachbehandlung: "oberflaechenfinish",
  impraegnierung: "oberflaechenfinish",
};

/** Rolle eines Produkts im Bodenaufbau. Aktuell nur für Industrieboden
 *  definiert (Listing-Gliederung); andere Bereiche liefern undefined. */
export function produktartVonGruppe(
  produktgruppe: string | undefined,
): Produktart | undefined {
  if (!produktgruppe) return undefined;
  return GRUPPE_ZU_PRODUKTART[produktgruppe];
}

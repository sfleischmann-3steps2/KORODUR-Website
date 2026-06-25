import { referenzen } from "../data/referenzen";
import { thumbSrc } from "./images";

// Kachel-Szenario je Produkt (#356/#304): das Hero-Foto der repräsentativsten
// Referenz, die das Produkt einsetzt. Befund (Scoping 2026-06-25): die echten
// Einsatz-/Szenarienbilder SIND die Referenzfotos (bereits im Repo); ein
// separates kuratiertes Szenario-Set existiert nicht (korodur.de-Harvest:
// produkt-betitelte Bilder = Packshots → Mockup-Schicht #303).
//
// Server-only: importiert referenzen.ts. NUR aus Server-Components nutzen, sonst
// landet der Referenz-Datensatz im Client-Bundle.

function istEchtesFoto(bild?: string): boolean {
  return !!bild && !bild.includes("_placeholder");
}

// Produktname (lowercase) → beste Referenz: wenigste Mitprodukte = produkt-
// spezifischer; bei Gleichstand die frühere in referenzen.ts. Einmal gebaut.
const NAME_TO_REF = new Map<string, { bild: string; n: number }>();
for (const r of referenzen) {
  if (!istEchtesFoto(r.bild)) continue;
  const n = r.produkte?.length ?? 0;
  for (const name of r.produkte ?? []) {
    const key = name.toLowerCase();
    const cur = NAME_TO_REF.get(key);
    if (!cur || n < cur.n) NAME_TO_REF.set(key, { bild: r.bild, n });
  }
}

/** Thumbnail-Pfad des Kachel-Szenarios oder null (→ Mockup-Fallback). Matching
 *  über die DEUTSCHEN Basis-Produkt-/Variantennamen (Referenzen führen diese). */
export function produktSzenarioBild(p: {
  name: string;
  heroReferenz?: string;
  varianten?: { name: string }[];
}): string | null {
  // 1. Kuratierter Override (Referenz-Slug)
  if (p.heroReferenz) {
    const r = referenzen.find((x) => x.slug === p.heroReferenz);
    if (r && istEchtesFoto(r.bild)) return thumbSrc(r.bild);
  }
  // 2. Auto: beste Referenz, die das Produkt (oder eine Variante) einsetzt
  const namen = [p.name, ...(p.varianten ?? []).map((v) => v.name)];
  for (const nm of namen) {
    const hit = NAME_TO_REF.get(nm.toLowerCase());
    if (hit) return thumbSrc(hit.bild);
  }
  // 3. kein Szenario → Caller fällt auf das Produkt-Mockup zurück
  return null;
}

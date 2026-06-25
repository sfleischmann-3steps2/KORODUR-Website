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

// Kuratierte Szenario-Zuordnung (#356, Steffi 2026-06-25): Produkte ohne eigenes
// Referenzprojekt bekommen eine passende, variierte Szene aus ihrer Familie/ihrem
// Bereich. Zentral + reviewbar an einer Stelle; das Feld `produkt.heroReferenz`
// überschreibt einen Eintrag hier bei Bedarf. Map: Produkt-ID → Referenz-Slug.
const KURATIERTE_SZENARIO_REFERENZ: Record<string, string> = {
  // Industrieboden (Hartstoffe / Estriche / Einstreuung / Finish / Grundierung)
  "neodur-he-40": "antolin-wochenend-sanierung",
  "neodur-he-3-green": "kleemann-produktionshalle",
  "neodur-he-2": "monheim-produktionsflaeche",
  "korodur-wh-spezial": "weag-entsorgungsbetrieb",
  "korodur-wh-metallisch": "wochenend-sanierung-werkstatt",
  "korodur-diamantbeton": "strandkorbhalle-sylt",
  "korodur-fscem-screed": "loosen-werkzeug-klausen",
  "neodur-level-au": "guben-produktionshalle",
  "korodur-robust": "nike-store-polen",
  "korodur-easyfinish": "obstplantage-ibbenbueren",
  "korodur-nanofinish": "sanierung-einer-sanierung",
  "korodur-uniprimer": "lkw-waschstrasse",
  "tru-sp": "kaiserhof-koeln", // Designboden → Retail-Szene
  // Trinkwasser
  "microtop-tw-vsm": "trinkwasserbehaelter-haidberg",
  // Betonsanierung / Spritzmörtel
  "neodur-msm-3": "dhl-ueberadebruecken",
  "neodur-msm-5": "fugensanierung-lyreco",
  "neodur-msb-8": "treppenstufen-sanierung",
  // Verguss / Vergussbeton / Pflasterfugen → Infrastruktur/Brücken/Parkhäuser
  "korophalt-02": "strassensanierung-wien",
  "neodur-vm-1": "theodor-heuss-bruecke",
  "neodur-vm-5": "bruckensanierung-amberg",
  "neodur-vm-basic": "parkhaus-flughafen-zuerich",
  "neodur-svm-03": "fussgaengerbruecke-albbruck",
  "neodur-svm-4": "parkhaus-freiburger-munster-freiburg",
  "neodur-pfm-ze": "hauptbahnhofsvorplatz-landau",
  // goodcat (Katzenstreu): kein Referenzprojekt → bleibt ohne Szene (leerer Cover).
};

/** Thumbnail-Pfad des Kachel-Szenarios oder null (→ Mockup-Fallback). Reihenfolge:
 *  explizites Feld `heroReferenz` → kuratierte Map → Auto-Match über die DEUTSCHEN
 *  Basis-Produkt-/Variantennamen (Referenzen führen diese). */
export function produktSzenarioBild(p: {
  id?: string;
  name: string;
  heroReferenz?: string;
  varianten?: { name: string }[];
}): string | null {
  // 1. Kuratierter Override: Feld vor zentraler Map
  const slug = p.heroReferenz ?? (p.id ? KURATIERTE_SZENARIO_REFERENZ[p.id] : undefined);
  if (slug) {
    const r = referenzen.find((x) => x.slug === slug);
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

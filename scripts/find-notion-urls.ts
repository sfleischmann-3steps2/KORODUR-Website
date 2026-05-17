import { referenzen } from "../data/referenzen";
import * as fs from "fs";

const targetSlugs = new Set([
  "theodor-heuss-bruecke", "texaco-tankflache-arnheim", "torschwelle-lagerhalle",
  "kreisverkehr-goppingen", "barmenia-parkhaus-wuppertal", "fraport-frankfurt",
  "sncf-bordeaux", "parkhaus-freiburger-munster-freiburg", "olympiastadion-berlin",
  "wirtgen-produktionshallen-weltweit", "fh-lichtschacht-nurnberg", "klaranlage-nako",
  "bruckensanierung-amberg", "schachtregulierung-fahrbahn-nittenau",
  "treppensanierung-gehweg-esslingen", "oelie-saur-saint",
]);

const src = fs.readFileSync("data/referenzen.ts", "utf8");

for (const r of referenzen) {
  if (!targetSlugs.has(r.slug)) continue;
  const idx = src.indexOf(`slug: "${r.slug}"`);
  const before = src.slice(Math.max(0, idx - 300), idx);
  const m = before.match(/notion:\s*(https?:\/\/[^\s\n]+)/);
  console.log(`${r.slug}\t${m ? m[1] : "(kein notion-marker)"}\t${r.titel}`);
}

/**
 * #381 — releaseStatus-Backfill der 54 Refs ohne Feld.
 *
 * Deterministische Ableitung aus docs/content-quellen/referenzen-wxr/reconcile-app-vs-export.md:
 *   - App ∩ Export (120 gematchte Refs) = auf der Live-Alt-Site korodur.de publiziert
 *     -> Live-Freigabe-Präzedenz -> "oeffentlich".
 *   - Nur-App (12 Refs ohne Export-Pendant, Kategorie 3 des Reconcile-Docs)
 *     -> kein öffentlicher Nachweis -> "freigabe-offen" (Vertraulichkeits-Default, Steffi 2026-07-01).
 *
 * BACKFILL-ONLY: setzt releaseStatus NUR, wo das Feld fehlt. Bestehende Werte bleiben unangetastet.
 * Aufruf:  npx tsx scripts/backfill-releasestatus.ts [--apply]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { referenzen } from "../data/referenzen";

// Kategorie (3) aus reconcile-app-vs-export.md — Nur-App, kein Export-Pendant.
const APP_ONLY = new Set<string>([
  "fertigstellen-eines-zementfussbodens-in-einem-bewohnten-appartment-gdynia-polen",
  "helipad-sanierung-polen",
  "korodur-demo-bochum",
  "lkw-umfahrt-darmstadt",
  "lkw-waschstrasse",
  "neodur-level-norderstedt",
  "obstplantage-ibbenbueren",
  "parkhaus-flughafen-zuerich",
  "sanierung-einer-sanierung",
  "sanierung-lkw-zufahrt-logistikzentrum-sankt",
  "strassensanierung-wien",
  "theodor-heuss-bruecke",
]);

const FILE = new URL("../data/referenzen.ts", import.meta.url).pathname;
const apply = process.argv.includes("--apply");

let text = readFileSync(FILE, "utf8");
const missing = referenzen.filter((r) => !("releaseStatus" in r) || !r.releaseStatus);

let oeffentlich = 0;
let freigabeOffen = 0;
const notFound: string[] = [];

for (const ref of missing) {
  const status = APP_ONLY.has(ref.slug) ? "freigabe-offen" : "oeffentlich";
  // Anker: die eindeutige id-Zeile des Ref-Blocks. releaseStatus direkt danach einfügen.
  const idLine = `    id: "${ref.id}",\n`;
  if (!text.includes(idLine)) {
    notFound.push(ref.slug);
    continue;
  }
  text = text.replace(idLine, `${idLine}    releaseStatus: "${status}",\n`);
  if (status === "oeffentlich") oeffentlich++;
  else freigabeOffen++;
}

console.log(`Refs gesamt: ${referenzen.length}`);
console.log(`Ohne releaseStatus (Backfill-Kandidaten): ${missing.length}`);
console.log(`  -> oeffentlich (matched/live): ${oeffentlich}`);
console.log(`  -> freigabe-offen (app-only): ${freigabeOffen}`);
if (notFound.length) console.log(`  ! id-Zeile nicht gefunden: ${notFound.join(", ")}`);
console.log(
  "app-only im Backfill:",
  missing.filter((r) => APP_ONLY.has(r.slug)).map((r) => r.slug).join(", ") || "(keine)"
);

if (apply && !notFound.length) {
  writeFileSync(FILE, text, "utf8");
  console.log("\n✔ data/referenzen.ts geschrieben.");
} else if (!apply) {
  console.log("\n(DRY RUN — mit --apply schreiben)");
}

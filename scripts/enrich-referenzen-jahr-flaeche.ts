/**
 * #100 — Referenz-Datenanreicherung: jahr + flaeche additiv nachfüllen.
 *
 * Quelle: docs/content-quellen/referenzen-wxr/reconcile-app-vs-export.md, Abschnitt (4)
 * "Export REICHER" — je gematchter App-Referenz die im WXR-Export belegten, in der App
 * aber leeren Felder (jahr<=YYYY, flaeche<=X). Additiv: füllt NUR leere Felder, überschreibt nie.
 *
 * bauherr/verarbeiter werden hier BEWUSST NICHT übernommen — laut Reconcile-Validierung
 * enthalten die Quell-ACF-Felder Copy-Paste-Fehler; sie gehören mit manueller Prüfung zu #380.
 *
 * Aufruf:  npx tsx scripts/enrich-referenzen-jahr-flaeche.ts [--apply]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { referenzen } from "../data/referenzen";

const RECONCILE = new URL(
  "../docs/content-quellen/referenzen-wxr/reconcile-app-vs-export.md",
  import.meta.url
).pathname;
const FILE = new URL("../data/referenzen.ts", import.meta.url).pathname;
const apply = process.argv.includes("--apply");

// Reconcile-Tabelle (4) parsen: Zeilen `| \`app-slug\` | ... | weitere |`
const md = readFileSync(RECONCILE, "utf8");
const delta = new Map<string, { jahr?: number; flaeche?: string }>();
for (const line of md.split("\n")) {
  const m = line.match(/^\|\s*`([a-z0-9-]+)`\s*\|/);
  if (!m) continue;
  const slug = m[1];
  const jahrM = line.match(/jahr<=(\d{4})/);
  const flaecheM = line.match(/flaeche<=([^;|]+?)\s*(?:;|\|)/);
  const entry: { jahr?: number; flaeche?: string } = {};
  if (jahrM) entry.jahr = Number(jahrM[1]);
  if (flaecheM) {
    const raw = flaecheM[1].trim();
    entry.flaeche = /m²|m2/.test(raw) ? raw : `${raw} m²`;
  }
  if (entry.jahr || entry.flaeche) delta.set(slug, entry);
}

let text = readFileSync(FILE, "utf8");
let jahrFilled = 0;
let flaecheFilled = 0;
const notFound: string[] = [];

// Block-aware: pro Ref das Objekt-Fenster (id-Zeile bis "\n  },") isolieren,
// darin bestehendes `feld: undefined,` ersetzen ODER nach der id-Zeile einfügen.
function setField(block: string, field: "jahr" | "flaeche", literal: string): string {
  const undef = `    ${field}: undefined,\n`;
  if (block.includes(undef)) return block.replace(undef, `    ${field}: ${literal},\n`);
  if (new RegExp(`\\n\\s*${field}:`).test(block)) return block; // schon gesetzt -> nicht anfassen
  const idLine = block.match(/^ {4}id: "[^"]+",\n/);
  return idLine ? block.replace(idLine[0], `${idLine[0]}    ${field}: ${literal},\n`) : block;
}

for (const ref of referenzen) {
  const d = delta.get(ref.slug);
  if (!d) continue;
  const idLine = `    id: "${ref.id}",\n`;
  const idIdx = text.indexOf(idLine);
  if (idIdx === -1) {
    notFound.push(ref.slug);
    continue;
  }
  const endIdx = text.indexOf("\n  },", idIdx);
  let block = text.slice(idIdx, endIdx);
  if (d.jahr && ref.jahr == null) {
    block = setField(block, "jahr", String(d.jahr));
    jahrFilled++;
  }
  if (d.flaeche && !ref.flaeche) {
    block = setField(block, "flaeche", `"${d.flaeche}"`);
    flaecheFilled++;
  }
  text = text.slice(0, idIdx) + block + text.slice(endIdx);
}

console.log(`Reconcile-Deltas geparst: ${delta.size} (mit jahr und/oder flaeche)`);
console.log(`jahr nachgefüllt (leer -> Wert): ${jahrFilled}`);
console.log(`flaeche nachgefüllt (leer -> Wert): ${flaecheFilled}`);
if (notFound.length) console.log(`  ! id-Zeile nicht gefunden: ${notFound.join(", ")}`);

if (apply && !notFound.length) {
  writeFileSync(FILE, text, "utf8");
  console.log("\n✔ data/referenzen.ts geschrieben.");
} else if (!apply) {
  console.log("\n(DRY RUN — mit --apply schreiben)");
}

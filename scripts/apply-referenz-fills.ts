/**
 * Wendet die sicheren Befüll-Vorschläge (referenz-fills.json) auf data/referenzen.ts an:
 * füllt NUR leere Felder `jahr` (und `flaeche`, wo eindeutig) aus belegter WP-Quelle.
 * Überschreibt nie bestehende Werte. Insert direkt nach der `slug:`-Zeile.
 *
 * Lauf: npx tsx scripts/apply-referenz-fills.ts   (danach validate-referenzen.ts)
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = join(__dirname, "..");
const FILE = join(ROOT, "data/referenzen.ts");
const fills: any[] = JSON.parse(
  readFileSync(join(ROOT, "docs/website-migration/referenz-fills.json"), "utf-8")
);

let src = readFileSync(FILE, "utf-8");
let nJahr = 0, nFlaeche = 0;

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Setzt ein Feld im Objektblock ab der slug-Zeile: ersetzt eine vorhandene
 *  `feld: ...,`-Zeile (auch `undefined`), sonst Insert direkt nach slug. */
function setField(slug: string, feld: string, valueLiteral: string): boolean {
  const slugRe = new RegExp(`^(\\s*)slug: "${esc(slug)}",\\s*$`, "m");
  const m = src.match(slugRe);
  if (!m) { console.warn("slug nicht gefunden:", slug); return false; }
  const indent = m[1];
  const start = src.indexOf(m[0]);
  const next = src.indexOf("\n    slug: \"", start + 1);
  const end = next === -1 ? src.length : next;
  let block = src.slice(start, end);
  const fieldRe = new RegExp(`^${indent}${feld}: .*$`, "m");
  if (fieldRe.test(block)) {
    block = block.replace(fieldRe, `${indent}${feld}: ${valueLiteral},`);
  } else {
    block = block.replace(slugRe, `${m[0]}\n${indent}${feld}: ${valueLiteral},`);
  }
  src = src.slice(0, start) + block + src.slice(end);
  return true;
}

for (const f of fills) {
  if (f.jahr && f.jahr >= 1900 && f.jahr <= 2026) {
    if (setField(f.slug, "jahr", String(f.jahr))) nJahr++;
  }
  if (f.flaeche) {
    const val = /^[\d.,\s]+$/.test(f.flaeche) ? `${f.flaeche.trim()} m²` : f.flaeche.trim();
    if (setField(f.slug, "flaeche", `"${val.replace(/"/g, '\\"')}"`)) nFlaeche++;
  }
}

writeFileSync(FILE, src);
console.log(`Angewendet: jahr=${nJahr}, flaeche=${nFlaeche}`);

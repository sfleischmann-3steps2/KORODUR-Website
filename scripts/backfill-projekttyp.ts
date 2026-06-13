/**
 * One-off-Migration (2026-06-13): setzt `projekttyp: "sanierung"` auf allen
 * 55 Referenzen in data/referenzen.ts. Autoritativ aus dem Notion-Verzeichnis
 * bestätigt (Feld „Projekttyp (Neubau, Sanierung)") — alle App-Referenzen sind
 * Sanierung; die 54 Neubau-Referenzen liegen nur im Verzeichnis und kommen erst
 * über den Referenz-Import in die App. Macht die Projektart-Facette
 * (Neubau/Sanierung-Filter, app/[lang]/referenzen) datenseitig explizit statt
 * sie über den projektartBucket-Default abzuleiten — fixt zugleich die
 * Detailseiten-Logik (Vorher/Nachher-Hero, Projekttyp-Fakt).
 *
 * Idempotent: entfernt vorhandene projekttyp-Zeilen und setzt sie neu.
 * Aufruf aus dem Repo-Root: npx tsx scripts/backfill-projekttyp.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "data/referenzen.ts";
let src = readFileSync(FILE, "utf8");

// 1. Vorhandene projekttyp-Zeilen entfernen (idempotent).
src = src.replace(/^ {4}projekttyp: "[^"]*",\n/gm, "");
// 2. Nach jeder slug-Zeile projekttyp: "sanierung" einfügen.
src = src.replace(
  /^( {4}slug: "[^"]*",)\n/gm,
  '$1\n    projekttyp: "sanierung",\n'
);

writeFileSync(FILE, src);
const count = (src.match(/^ {4}projekttyp: "sanierung",$/gm) || []).length;
console.log(`projekttyp: "sanierung" gesetzt auf ${count} Referenzen.`);

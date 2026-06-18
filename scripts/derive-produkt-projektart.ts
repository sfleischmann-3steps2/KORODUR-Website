#!/usr/bin/env tsx
/**
 * Projektart-Ableitung auf Produktebene (#240 / löst #83/#103)
 * ============================================================
 *
 * Das Repo trägt KEIN Projektart-Feld am Produkt — die Neubau/Sanierung-Relevanz
 * eines Produkts wird hier aus den REFERENZEN abgeleitet: jede Referenz trägt
 * `projekttyp` (→ projektartBucket → neubau|sanierung) und `produkte[]` (Namen,
 * inkl. Varianten-Namen). Pro Produkt = Vereinigung der Buckets aller Referenzen,
 * die es (oder eine seiner Varianten) einsetzen.
 *
 * Ergebnis ist die datengetriebene Vorlage für den Abgleich mit Notion DB1
 * (`Neubau/Sanierung` am Produkt, 71/92 befüllt, 21 leer) — Akzeptanzkriterien
 * #240: Feld am Produkt, 21 Leere befüllen, Konflikte ausweisen.
 *
 * Output: stdout-Tabelle + docs/reference/produktart-klassifizierung/
 *         projektart-ableitung.csv
 */
import { writeFileSync } from "node:fs";
import { produkte } from "../data/produkte";
import { referenzen } from "../data/referenzen";
import { projektartBucket, type Projektart } from "../data/einsatzbereichMapping";

type Agg = {
  id: string;
  name: string;
  bereich: string;
  neubau: number; // Anzahl Neubau-Referenzen
  sanierung: number; // Anzahl Sanierungs-Referenzen (inkl. instandsetzung)
  refSlugs: string[];
};

// Index: Produktname UND jeder Varianten-Name → Produkt-id (case-insensitive)
const nameToId = new Map<string, string>();
for (const p of produkte) {
  nameToId.set(p.name.toLowerCase(), p.id);
  for (const v of p.varianten ?? []) {
    if (v.name) nameToId.set(v.name.toLowerCase(), p.id);
  }
}

const agg = new Map<string, Agg>();
for (const p of produkte) {
  agg.set(p.id, { id: p.id, name: p.name, bereich: p.bereich, neubau: 0, sanierung: 0, refSlugs: [] });
}

const unmatched = new Map<string, number>(); // Referenz-Produktname → Häufigkeit (nicht im Portfolio)

for (const ref of referenzen) {
  const bucket: Projektart = projektartBucket(ref.projekttyp);
  // Ein Produkt darf pro Referenz nur einmal zählen (Referenz kann Variante +
  // Stammprodukt nennen → beide mappen auf dieselbe id).
  const seenThisRef = new Set<string>();
  for (const rawName of ref.produkte) {
    const id = nameToId.get(rawName.toLowerCase());
    if (!id) {
      unmatched.set(rawName, (unmatched.get(rawName) ?? 0) + 1);
      continue;
    }
    if (seenThisRef.has(id)) continue;
    seenThisRef.add(id);
    const a = agg.get(id)!;
    if (bucket === "neubau") a.neubau++;
    else a.sanierung++;
    a.refSlugs.push(ref.slug);
  }
}

function klass(a: Agg): "neubau" | "sanierung" | "beide" | "keine" {
  if (a.neubau > 0 && a.sanierung > 0) return "beide";
  if (a.neubau > 0) return "neubau";
  if (a.sanierung > 0) return "sanierung";
  return "keine";
}

const rows = [...agg.values()].sort((x, y) => x.bereich.localeCompare(y.bereich) || x.name.localeCompare(y.name));

// stdout-Tabelle
const counts = { neubau: 0, sanierung: 0, beide: 0, keine: 0 };
console.log(`\nProjektart-Ableitung — ${rows.length} Produkte, ${referenzen.length} Referenzen\n`);
console.log("BEREICH".padEnd(22) + "PRODUKT".padEnd(34) + "ABLEITUNG".padEnd(11) + "N/S-Refs");
console.log("-".repeat(85));
for (const a of rows) {
  const k = klass(a);
  counts[k]++;
  console.log(
    a.bereich.padEnd(22) + a.name.slice(0, 33).padEnd(34) + k.padEnd(11) + `${a.neubau}/${a.sanierung}`
  );
}
console.log("-".repeat(85));
console.log(`Summe: neubau=${counts.neubau}  sanierung=${counts.sanierung}  beide=${counts.beide}  keine(=ohne Referenz)=${counts.keine}`);

if (unmatched.size) {
  console.log(`\n⚠ ${unmatched.size} Referenz-Produktnamen ohne Portfolio-Treffer (eingestellt/Fremd/Tippfehler):`);
  for (const [n, c] of [...unmatched.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`   ${c}×  ${n}`);
  }
}

// CSV-Artefakt
const csv = [
  "id,name,bereich,ableitung,neubau_refs,sanierung_refs,referenz_slugs",
  ...rows.map((a) => {
    const k = klass(a);
    return [a.id, `"${a.name}"`, a.bereich, k, a.neubau, a.sanierung, `"${a.refSlugs.join(" ")}"`].join(",");
  }),
].join("\n");
const out = "docs/reference/produktart-klassifizierung/projektart-ableitung.csv";
writeFileSync(out, csv + "\n");
console.log(`\n→ ${out} geschrieben (${rows.length} Zeilen).`);

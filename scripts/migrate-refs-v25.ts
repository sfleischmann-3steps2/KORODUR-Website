// === Migrationsskript: Referenzen V2.4 → V2.5-Filter-Schema ===
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Erzeugt data/referenzenV25.ts — eine typisierte Map slug → ReferenzFilterV25.
// Ersetzt den heuristischen Laufzeit-Adapter (loesungsfinderV25Adapter.ts).
//
// Ableitungs-Klassen:
//   MECHANISCH (deterministisch, kein Urteil):
//     - flaecheKategorie  ← sanierungsart + flaeche-String (m²)
//     - zeitfenster       ← zeitDringlichkeit (1:1)
//   ABGELEITET (best-effort aus Altdaten, Review empfohlen):
//     - einsatzbereich    ← einsatzbereiche[0] via Migrationsmap
//     - innenAussen       ← Präfix des Einsatzbereichs
//   DRAFT (Fachurteil, Sign-off Frank offen):
//     - schadenstypen     ← Keyword-Extraktion aus herausforderungen/loesung/vorteile
//
// Aufruf:  npx tsx scripts/migrate-refs-v25.ts        (schreibt Datei + Report)
//          npx tsx scripts/migrate-refs-v25.ts --dry  (nur Report)

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { referenzen } from "../data/referenzen";
import type {
  EinsatzbereichKategorie,
  EinsatzbereichV25,
  Flaechenkategorie,
  InnenAussen,
  Referenz,
  ReferenzFilterV25,
  Schadenstyp,
  Zeitfenster,
  ZeitKategorie,
} from "../data/types";

// --- Mechanisch: Flächenkategorie ---
function parseFlaecheM2(flaecheStr?: string): number | null {
  if (!flaecheStr) return null;
  const match = flaecheStr.replace(/\./g, "").match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function ableitenFlaechenkategorie(r: Referenz): Flaechenkategorie {
  if (r.sanierungsart === "punktuell") return "punktuell";
  const m2 = parseFlaecheM2(r.flaeche);
  if (m2 === null) return "mittel"; // konservativ ohne m²-Angabe
  if (m2 < 100) return "punktuell";
  if (m2 <= 1000) return "mittel";
  return "gross";
}

// --- Mechanisch: Zeitfenster ---
const ZEIT_MIGRATION: Record<ZeitKategorie, Zeitfenster> = {
  schnell: "sehr-kurz",
  mittel: "kurz",
  normal: "planbar",
};

// --- Abgeleitet: Einsatzbereich (V2.4-Kategorie → 6-Cluster-Schnitt V2.5) ---
// Spec docs/specs/2026-06-02-loesungsfinder-step3-spec.md §5. Die alten 8 Cluster
// (mit zwei leeren Außen-Clustern) sind ersetzt durch den referenzgedeckten
// 3+3-Schnitt.
const EINSATZBEREICH_MIGRATION: Record<EinsatzbereichKategorie, EinsatzbereichV25> = {
  "lager-logistik": "innen-industrie-halle",
  "industrie-produktion": "innen-industrie-halle",
  "schwerindustrie": "innen-industrie-halle",
  "lebensmittel": "innen-nass-hygiene-chemie",
  "verkaufsraeume": "innen-sicht-design",
  "parkdeck": "aussen-parkdeck",
  "infrastruktur-zufahrten": "aussen-verkehr-infrastruktur",
  "flugzeug": "aussen-verkehr-infrastruktur",
};

// WHG-Split (§5): drei der überladenen Infra-Referenzen sind fachlich
// Umwelt-/WHG-Flächen (Waschplatz, Tankfläche, Hafen). Slug-genaues Override,
// damit das Re-Mapping reproduzierbar ist statt heuristisch. Helipads bleiben
// bewusst Infrastruktur.
const SLUG_OVERRIDE: Record<string, EinsatzbereichV25> = {
  "lkw-waschstrasse": "aussen-umwelt-whg",
  "texaco-tankflache-arnheim": "aussen-umwelt-whg",
  "hafen-catania": "aussen-umwelt-whg",
};

function ableitenEinsatzbereich(r: Referenz): EinsatzbereichV25 {
  if (SLUG_OVERRIDE[r.slug]) return SLUG_OVERRIDE[r.slug];
  const erster = r.einsatzbereiche[0] ?? "industrie-produktion";
  return EINSATZBEREICH_MIGRATION[erster];
}

// --- DRAFT: Schadenstypen aus Freitext ---
// Bewusst konservative Patterns. Lieber leer als falsch-positiv — Review füllt nach.
const SCHADEN_PATTERNS: { typ: Schadenstyp; re: RegExp }[] = [
  { typ: "verschleissschaeden", re: /verschle|abrieb|abgenutzt|abgefahren|abnutzung|abgeschliffen/i },
  { typ: "ausbrueche", re: /ausbruch|ausbrüche|ausbruche|abplatz|abgeplatzt|krater|lochfra|auswaschung|absplitter|abgesplittert|abgebrochen/i },
  { typ: "risse", re: /\briss|risse|gerissen|rissbildung|rissig/i },
  { typ: "frueher-sanierung", re: /altbeschichtung|alte beschichtung|altbelag|altboden|bestandsboden|frühere sanierung|vorherige sanierung|alte sanierung|altestrich|alter estrich/i },
];

function ableitenSchadenstypen(r: Referenz): Schadenstyp[] {
  const text = [
    r.titel,
    r.untertitel,
    ...r.herausforderungen,
    r.loesung,
    ...r.vorteile,
  ].join(" \n ");
  return SCHADEN_PATTERNS.filter((p) => p.re.test(text)).map((p) => p.typ);
}

// --- Hauptlauf ---
function migriere(r: Referenz): ReferenzFilterV25 {
  const einsatzbereich = ableitenEinsatzbereich(r);
  const innenAussen: InnenAussen = einsatzbereich.startsWith("innen-") ? "innen" : "aussen";
  return {
    flaecheKategorie: ableitenFlaechenkategorie(r),
    innenAussen,
    einsatzbereich,
    zeitfenster: ZEIT_MIGRATION[r.zeitDringlichkeit],
    schadenstypen: ableitenSchadenstypen(r),
  };
}

const result: Record<string, ReferenzFilterV25> = {};
for (const r of referenzen) result[r.slug] = migriere(r);

// --- Report ---
const ALLE_BEREICHE: EinsatzbereichV25[] = [
  "innen-industrie-halle", "innen-nass-hygiene-chemie", "innen-sicht-design",
  "aussen-verkehr-infrastruktur", "aussen-parkdeck", "aussen-umwelt-whg",
];
const bereichCount = Object.fromEntries(ALLE_BEREICHE.map((b) => [b, 0])) as Record<EinsatzbereichV25, number>;
const flaecheCount: Record<string, number> = {};
let ohneSchaden = 0;
const schadenCount: Record<string, number> = {};
for (const f of Object.values(result)) {
  bereichCount[f.einsatzbereich]++;
  flaecheCount[f.flaecheKategorie] = (flaecheCount[f.flaecheKategorie] ?? 0) + 1;
  if (f.schadenstypen.length === 0) ohneSchaden++;
  for (const s of f.schadenstypen) schadenCount[s] = (schadenCount[s] ?? 0) + 1;
}

console.log(`\n=== Referenz-Migration V2.5 — ${referenzen.length} Refs ===`);
console.log("\nFlächenkategorie:", flaecheCount);
console.log("\nEinsatzbereich-Verteilung:");
for (const b of ALLE_BEREICHE) {
  const n = bereichCount[b];
  console.log(`  ${n === 0 ? "⚠ " : "  "}${b}: ${n}${n === 0 ? "  ← LEER, kein Ref matcht diese Funnel-Auswahl" : ""}`);
}
console.log("\nSchadenstypen (DRAFT):", schadenCount);
console.log(`Refs ohne erkannten Schadenstyp: ${ohneSchaden} / ${referenzen.length}`);

// --- Datei schreiben ---
if (!process.argv.includes("--dry")) {
  const lines: string[] = [];
  lines.push("// === GENERIERT von scripts/migrate-refs-v25.ts — nicht von Hand editieren ===");
  lines.push("// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md");
  lines.push("//");
  lines.push("// flaecheKategorie + zeitfenster: deterministisch aus V2.4-Daten.");
  lines.push("// einsatzbereich + innenAussen: aus einsatzbereiche[0] abgeleitet (Review empfohlen).");
  lines.push("// schadenstypen: DRAFT (Keyword-Extraktion) — Sign-off Frank offen.");
  lines.push("// Neu generieren: npx tsx scripts/migrate-refs-v25.ts");
  lines.push("");
  lines.push('import type { ReferenzFilterV25 } from "./types";');
  lines.push("");
  lines.push("export const REFERENZ_FILTER_V25: Record<string, ReferenzFilterV25> = {");
  for (const r of referenzen) {
    const f = result[r.slug];
    const schaden = f.schadenstypen.length
      ? `[${f.schadenstypen.map((s) => `"${s}"`).join(", ")}]`
      : "[]";
    lines.push(`  ${JSON.stringify(r.slug)}: {`);
    lines.push(`    flaecheKategorie: "${f.flaecheKategorie}",`);
    lines.push(`    innenAussen: "${f.innenAussen}",`);
    lines.push(`    einsatzbereich: "${f.einsatzbereich}",`);
    lines.push(`    zeitfenster: "${f.zeitfenster}",`);
    lines.push(`    schadenstypen: ${schaden},`);
    lines.push(`  },`);
  }
  lines.push("};");
  lines.push("");
  const outPath = join(import.meta.dirname, "..", "data", "referenzenV25.ts");
  writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`\n✓ Geschrieben: data/referenzenV25.ts (${referenzen.length} Einträge)`);
}

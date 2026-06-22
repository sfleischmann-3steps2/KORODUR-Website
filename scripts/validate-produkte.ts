/**
 * Validierungs-Skript für data/produkte.ts — Stufe 0 der Website-Integration.
 * Plan: docs/plans/2026-06-11-website-integration-plan.md
 *
 * Prüft pro Produkt:
 *   1. id ist eindeutig und kebab-case
 *   2. bereich liegt im Produktbereich-Enum
 *   3. kategorie liegt im Enum
 *   4. Pflichtfelder name + kurzbeschreibung sind nicht leer
 *   5. belastungenAbgedeckt[] enthält nur gültige BelastungsTags
 *   6. systemBegleitprodukte[] referenziert nur existierende Produkt-IDs
 *
 * Bewusst KEINE Pflicht auf TDS-/Matrix-Felder: fehlende Quellwerte bleiben
 * leer (nie erfinden) und werden als offene Punkte geführt. Matrix-Pflicht-
 * felder prüft validate-referenzen.ts.
 *
 * Exit-Code 1 bei jeglicher Verletzung.
 */
import { produkte } from "../data/produkte";
import { bereiche } from "../data/bereiche";
import type { BelastungsTag, Produktbereich } from "../data/types";

const ALLOWED_BEREICH: ReadonlySet<Produktbereich> = new Set<Produktbereich>([
  "industrieboden",
  "sichtestrich",
  "microtop",
  "rapid-set",
  "infrastruktur",
  "spezialmoertel",
  "3d-concrete-printing",
  "katzenstreu",
]);

const ALLOWED_KATEGORIE = new Set([
  "estrich",
  "grundierung",
  "schnellzement",
  "beschichtung",
  "nachbehandlung",
  "sonstige",
]);

const ALLOWED_BELASTUNG: ReadonlySet<BelastungsTag> = new Set<BelastungsTag>([
  "schwerlast",
  "verschleiss",
  "staplerverkehr",
  "chemie-treibstoff",
  "chemie-aggressiv",
  "hygiene",
  "fleckschutz",
  "optik",
  "publikumsverkehr",
  "frost-tausalz",
  "whg",
]);

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

type Issue = { id: string; level: "error" | "warn"; msg: string };
const issues: Issue[] = [];

const alleIds = new Set(produkte.map((p) => p.id));
const seenIds = new Set<string>();

for (const p of produkte) {
  if (seenIds.has(p.id)) {
    issues.push({ id: p.id, level: "error", msg: "id ist nicht eindeutig" });
  }
  seenIds.add(p.id);

  if (!KEBAB_CASE.test(p.id)) {
    issues.push({ id: p.id, level: "error", msg: "id ist nicht kebab-case" });
  }

  if (!ALLOWED_BEREICH.has(p.bereich)) {
    issues.push({ id: p.id, level: "error", msg: `bereich '${p.bereich}' nicht im Enum` });
  }

  // zusatzBereiche (#215): jeder Eintrag im Enum, ungleich Primär-Bereich, keine Dubletten
  if (p.zusatzBereiche) {
    const gesehen = new Set<Produktbereich>();
    for (const zb of p.zusatzBereiche) {
      if (!ALLOWED_BEREICH.has(zb)) {
        issues.push({ id: p.id, level: "error", msg: `zusatzBereich '${zb}' nicht im Enum` });
      }
      if (zb === p.bereich) {
        issues.push({ id: p.id, level: "error", msg: `zusatzBereich '${zb}' wiederholt den Primär-Bereich` });
      }
      if (gesehen.has(zb)) {
        issues.push({ id: p.id, level: "error", msg: `zusatzBereich '${zb}' ist doppelt` });
      }
      gesehen.add(zb);
    }
  }

  if (!ALLOWED_KATEGORIE.has(p.kategorie)) {
    issues.push({ id: p.id, level: "error", msg: `kategorie '${p.kategorie}' nicht im Enum` });
  }

  if (!p.name?.trim()) {
    issues.push({ id: p.id, level: "error", msg: "name ist leer" });
  }
  if (!p.kurzbeschreibung?.trim()) {
    issues.push({ id: p.id, level: "error", msg: "kurzbeschreibung ist leer" });
  }

  for (const b of p.belastungenAbgedeckt ?? []) {
    if (!ALLOWED_BELASTUNG.has(b)) {
      issues.push({ id: p.id, level: "error", msg: `belastungenAbgedeckt '${b}' nicht im Enum` });
    }
  }

  for (const s of p.systemBegleitprodukte ?? []) {
    if (!alleIds.has(s)) {
      issues.push({ id: p.id, level: "error", msg: `systemBegleitprodukt '${s}' existiert nicht` });
    }
  }

  // produktgruppe muss in der Gruppen-Liste des Bereichs definiert sein
  // (Zuordnung mit Sign-off, docs/website-migration/zuordnung-<bereich>.md)
  if (p.produktgruppe !== undefined) {
    const bereich = bereiche.find((b) => b.slug === p.bereich);
    if (!bereich?.produktgruppen?.includes(p.produktgruppe)) {
      issues.push({
        id: p.id,
        level: "error",
        msg: `produktgruppe '${p.produktgruppe}' nicht in bereiche.ts für '${p.bereich}' definiert`,
      });
    }
  }
}

const proBereich = new Map<string, number>();
for (const p of produkte) {
  proBereich.set(p.bereich, (proBereich.get(p.bereich) ?? 0) + 1);
}

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");

console.log(`Geprüft: ${produkte.length} Produkte`);
console.log(
  "Bereiche: " +
    [...proBereich.entries()].map(([b, n]) => `${b}=${n}`).join(" · ")
);
console.log(`Fehler: ${errors.length} · Warnungen: ${warnings.length}`);

if (errors.length > 0) {
  console.log("\n❌ Fehler:");
  for (const e of errors) console.log(`  [${e.id}] ${e.msg}`);
}
if (warnings.length > 0) {
  console.log("\n⚠ Warnungen:");
  for (const w of warnings) console.log(`  [${w.id}] ${w.msg}`);
}
if (errors.length === 0 && warnings.length === 0) {
  console.log("✅ Alle Produkte valide.");
}

process.exit(errors.length > 0 ? 1 : 0);

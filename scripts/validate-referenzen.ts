/**
 * Schritt 3 — Validierungs-Skript für data/referenzen.ts.
 *
 * Prüft pro Referenz:
 *   1. einsatzbereiche[] ist nicht leer (mind. 1 Wert)
 *   2. sanierungsart, zeitDringlichkeit liegen im Enum
 *   3. einsatzbereiche[] und zusatzfunktionen[] sind alle Enum-Werte
 *   4. produkte[] referenziert nur Namen, die in data/produkte.ts existieren
 *   5. slug ist eindeutig
 *
 * Exit-Code 1 bei jeglicher Verletzung.
 */
import { referenzen } from "../data/referenzen";
import { produkte } from "../data/produkte";
import { REFERENZ_FILTER_V25 } from "../data/referenzenV25";
import { referenzenEN } from "../data/i18n/referenzen.en";
import { referenzenFR } from "../data/i18n/referenzen.fr";
import { referenzenPL } from "../data/i18n/referenzen.pl";
import type {
  Sanierungsart,
  EinsatzbereichKategorie,
  EinsatzbereichV25,
  Flaechenkategorie,
  InnenAussen,
  Schadenstyp,
  ZeitKategorie,
  Zeitfenster,
  Zusatzfunktion,
} from "../data/types";

const ALLOWED_SANIERUNGSART: ReadonlySet<Sanierungsart> = new Set<Sanierungsart>([
  "punktuell",
  "grossflaechig",
]);

const ALLOWED_EINSATZBEREICH: ReadonlySet<EinsatzbereichKategorie> = new Set<EinsatzbereichKategorie>([
  "lager-logistik",
  "industrie-produktion",
  "lebensmittel",
  "flugzeug",
  "parkdeck",
  "infrastruktur-zufahrten",
  "verkaufsraeume",
  "schwerindustrie",
]);

const ALLOWED_DRINGLICHKEIT: ReadonlySet<ZeitKategorie> = new Set<ZeitKategorie>([
  "schnell",
  "mittel",
  "normal",
]);

const ALLOWED_ZUSATZ: ReadonlySet<Zusatzfunktion> = new Set<Zusatzfunktion>([
  "chemikalienbestaendigkeit",
  "tausalzbestaendigkeit",
  "rutschhemmung",
  "fleckenabwehr",
]);

const PRODUKT_NAMES = new Set(produkte.map((p) => p.name));

type Issue = { slug: string; level: "error" | "warn"; msg: string };
const issues: Issue[] = [];

const seenSlugs = new Set<string>();
for (const r of referenzen) {
  if (seenSlugs.has(r.slug)) {
    issues.push({ slug: r.slug, level: "error", msg: "Slug ist nicht eindeutig" });
  }
  seenSlugs.add(r.slug);

  if (!r.einsatzbereiche || r.einsatzbereiche.length === 0) {
    issues.push({ slug: r.slug, level: "error", msg: "einsatzbereiche[] ist leer" });
  } else {
    for (const a of r.einsatzbereiche) {
      if (!ALLOWED_EINSATZBEREICH.has(a)) {
        issues.push({ slug: r.slug, level: "error", msg: `einsatzbereich '${a}' nicht im Enum` });
      }
    }
  }

  if (!ALLOWED_SANIERUNGSART.has(r.sanierungsart)) {
    issues.push({ slug: r.slug, level: "error", msg: `sanierungsart '${r.sanierungsart}' nicht im Enum` });
  }

  if (!ALLOWED_DRINGLICHKEIT.has(r.zeitDringlichkeit)) {
    issues.push({ slug: r.slug, level: "error", msg: `zeitDringlichkeit '${r.zeitDringlichkeit}' nicht im Enum` });
  }

  for (const z of r.zusatzfunktionen ?? []) {
    if (!ALLOWED_ZUSATZ.has(z)) {
      issues.push({ slug: r.slug, level: "error", msg: `zusatzfunktion '${z}' nicht im Enum` });
    }
  }

  for (const p of r.produkte ?? []) {
    if (!PRODUKT_NAMES.has(p)) {
      issues.push({ slug: r.slug, level: "warn", msg: `Produkt '${p}' nicht in data/produkte.ts` });
    }
  }

  // Redaktionsmarker dürfen nie live gehen (Launch-Plan M1, 2026-06-12:
  // "OFFEN — Alexander zu fragen" stand öffentlich auf einer Referenzseite).
  // Prüft auch die i18n-Overrides — die EN-Fassung desselben Markers ("OPEN:
  // to be clarified") stand bis M3b live (Fund Sprachpass-Workflow).
  const MARKER = /\bOFFEN\b|\bOPEN:\s|\bTODO\b|\bFIXME\b|zu klären|zu fragen|to be clarified|\bTBD\b/i;
  const sprachVarianten: Array<[string, Partial<typeof r> | undefined]> = [
    ["de", r],
    ["en", (referenzenEN as Record<string, Partial<typeof r>>)[r.id]],
    ["fr", (referenzenFR as Record<string, Partial<typeof r>>)[r.id]],
    ["pl", (referenzenPL as Record<string, Partial<typeof r>>)[r.id]],
  ];
  for (const [sprache, variante] of sprachVarianten) {
    if (!variante) continue;
    const contentFelder: Array<[string, string | string[] | undefined]> = [
      ["titel", variante.titel],
      ["untertitel", variante.untertitel],
      ["flaeche", variante.flaeche],
      ["loesung", variante.loesung],
      ["herausforderungen", variante.herausforderungen],
      ["vorteile", variante.vorteile],
      ["bildAlt", variante.bildAlt],
    ];
    for (const [feld, wert] of contentFelder) {
      const texte = Array.isArray(wert) ? wert : wert ? [wert] : [];
      for (const text of texte) {
        if (MARKER.test(text)) {
          issues.push({ slug: r.slug, level: "error", msg: `Redaktionsmarker in '${feld}' (${sprache}): "${text.slice(0, 60)}…"` });
        }
      }
    }
  }
}

// === Sanierungs-Produktmatrix V5: Pflichtfeld-Check ===
const matrixProdukte = produkte.filter((p) => p.inSanierungsMatrix === true);
const kategorienInMatrix = new Set(matrixProdukte.map((p) => p.kategorie));

for (const p of matrixProdukte) {
  if (p.belastbarkeitsStufe === undefined) {
    issues.push({ slug: p.id, level: "error", msg: "Matrix-Produkt ohne belastbarkeitsStufe" });
  } else if (p.belastbarkeitsStufe < 1 || p.belastbarkeitsStufe > 5) {
    issues.push({ slug: p.id, level: "error", msg: `belastbarkeitsStufe ${p.belastbarkeitsStufe} außerhalb 1-5` });
  }
  if (!p.belastbarNach) {
    issues.push({ slug: p.id, level: "error", msg: "Matrix-Produkt ohne belastbarNach" });
  }
  if (!p.schichtdicke) {
    issues.push({ slug: p.id, level: "error", msg: "Matrix-Produkt ohne schichtdicke" });
  }
  // qualitaetsklasse ist soft-required (ASPHALT REPAIR MIX hat keine offizielle C-Klasse)
  if (!p.qualitaetsklasse) {
    issues.push({ slug: p.id, level: "warn", msg: "Matrix-Produkt ohne qualitaetsklasse (OK bei ASPHALT)" });
  }
}

// Mind. 1 Produkt pro Matrix-Kategorie
for (const kat of ["estrich", "schnellzement"] as const) {
  if (!kategorienInMatrix.has(kat)) {
    issues.push({ slug: `kategorie:${kat}`, level: "error", msg: `Keine Matrix-Produkte in Kategorie '${kat}'` });
  }
}

// === Lösungsfinder V2.5: Vollständigkeit + Enums der generierten Filter-Map ===
const ALLOWED_FLAECHE: ReadonlySet<Flaechenkategorie> = new Set<Flaechenkategorie>(["punktuell", "mittel", "gross"]);
const ALLOWED_INNENAUSSEN: ReadonlySet<InnenAussen> = new Set<InnenAussen>(["innen", "aussen"]);
const ALLOWED_ZEITFENSTER: ReadonlySet<Zeitfenster> = new Set<Zeitfenster>(["sehr-kurz", "kurz", "planbar"]);
const ALLOWED_EINSATZ_V25: ReadonlySet<EinsatzbereichV25> = new Set<EinsatzbereichV25>([
  "innen-industrie-halle", "innen-nass-hygiene-chemie", "innen-sicht-design",
  "aussen-verkehr-infrastruktur", "aussen-parkdeck", "aussen-umwelt-whg",
]);
const ALLOWED_SCHADEN: ReadonlySet<Schadenstyp> = new Set<Schadenstyp>([
  "verschleissschaeden", "ausbrueche", "risse", "frueher-sanierung",
]);

for (const r of referenzen) {
  const f = REFERENZ_FILTER_V25[r.slug];
  if (!f) {
    issues.push({ slug: r.slug, level: "error", msg: "kein V2.5-Filter-Eintrag (data/referenzenV25.ts neu generieren)" });
    continue;
  }
  if (!ALLOWED_FLAECHE.has(f.flaecheKategorie)) issues.push({ slug: r.slug, level: "error", msg: `V25 flaecheKategorie '${f.flaecheKategorie}' ungültig` });
  if (!ALLOWED_INNENAUSSEN.has(f.innenAussen)) issues.push({ slug: r.slug, level: "error", msg: `V25 innenAussen '${f.innenAussen}' ungültig` });
  if (!ALLOWED_EINSATZ_V25.has(f.einsatzbereich)) issues.push({ slug: r.slug, level: "error", msg: `V25 einsatzbereich '${f.einsatzbereich}' ungültig` });
  if (!ALLOWED_ZEITFENSTER.has(f.zeitfenster)) issues.push({ slug: r.slug, level: "error", msg: `V25 zeitfenster '${f.zeitfenster}' ungültig` });
  if (f.innenAussen !== (f.einsatzbereich.startsWith("innen-") ? "innen" : "aussen")) {
    issues.push({ slug: r.slug, level: "error", msg: "V25 innenAussen passt nicht zum einsatzbereich-Präfix" });
  }
  for (const s of f.schadenstypen) {
    if (!ALLOWED_SCHADEN.has(s)) issues.push({ slug: r.slug, level: "error", msg: `V25 schadenstyp '${s}' ungültig` });
  }
}

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");

console.log(`Geprüft: ${referenzen.length} Referenzen, ${matrixProdukte.length} Matrix-Produkte`);
console.log(`Fehler: ${errors.length} · Warnungen: ${warnings.length}`);

if (errors.length > 0) {
  console.log("\n❌ Fehler:");
  for (const e of errors) console.log(`  [${e.slug}] ${e.msg}`);
}
if (warnings.length > 0) {
  console.log("\n⚠ Warnungen:");
  for (const w of warnings) console.log(`  [${w.slug}] ${w.msg}`);
}
if (errors.length === 0 && warnings.length === 0) {
  console.log("✅ Alle Referenzen valide.");
}

process.exit(errors.length > 0 ? 1 : 0);

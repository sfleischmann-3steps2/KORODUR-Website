/**
 * extract-varianten.ts — #371 (Teil von #367, V1-Varianten-PDPs)
 *
 * Zieht je AUSFÜHRUNG einer Produktfamilie einen `Produkt`-ENTWURF aus den
 * vorhandenen Quellen (Alt-Site-XML + TDS-Texte) — zur HAND-Verifikation für
 * #372, NICHT zum Blind-Commit. Es wird nichts erfunden:
 *   - Felder, die nur Experten/PDB liefern (Verbrauch, eigenes TDS, Foto, EPD),
 *     bleiben leer.
 *   - Normwerte sind PROVISORISCH (aus TDS/CT-Klasse abgeleitet) bis der
 *     Technik-Termin sie über die PDB final liefert.
 *
 * Jede DE-Ausführung wird ein eigenständiges, gleichrangiges Produkt mit
 * gemeinsamem `variantenGruppe` (= id der Standard-/Mutter-Ausführung).
 *
 * Quellen:
 *   - docs/website-migration/extraktion-produkte.json  (Alt-Site-WXR, 202)
 *   - docs/tds-quellen/texts/*.txt                      (TDS-Volltexte)
 *
 * Aufruf:  npx tsx scripts/extract-varianten.ts "HE 65"
 * Ausgabe: docs/website-migration/varianten-entwurf-<slug>.draft.ts
 *          docs/website-migration/varianten-entwurf-<slug>.report.md
 */
import fs from "node:fs";
import path from "node:path";
import { produkte } from "../data/produkte";

const REPO = path.resolve(__dirname, "..");
const XML_JSON = path.join(REPO, "docs/website-migration/extraktion-produkte.json");
const TDS_DIR = path.join(REPO, "docs/tds-quellen/texts");
const OUT_DIR = path.join(REPO, "docs/website-migration");

// Eingestellte Produkte (raus aus verwandteProdukte) — #214/#215.
const EINGESTELLT = new Set(["koropox"]);

// ---------------------------------------------------------------------------
// XML-Eintrag (Alt-Site) — nur die hier genutzten Felder.
// ---------------------------------------------------------------------------
type XmlEntry = {
  title: string;
  slug: string;
  link: string;
  status: string;
  sku: string;
  beschreibung: string;
  thumbnail_url?: string;
  dokumente?: { text: string; href: string }[];
  additional_info?: { text: string; href: string }[];
  product_cat?: string[];
  brand?: string[];
};

function ws(s: string): string {
  return (s || "").replace(/\s+/g, " ").trim();
}

// DE-Ausführungen einer Familie: Titel enthält das Präfix, Link ist die
// DE-Route (`korodur.de/produkt/`; EN=/en/product/, FR=/fr/produit/).
function ladeMitglieder(prefix: string): { de: XmlEntry[]; gefiltert: XmlEntry[] } {
  const alle: XmlEntry[] = JSON.parse(fs.readFileSync(XML_JSON, "utf8"));
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
  const p = norm("neodur " + prefix).replace(/^neodur /, "");
  const treffer = alle.filter((x) => norm(x.title).includes(norm(prefix)) && x.status === "publish");
  const istDE = (x: XmlEntry) => /korodur\.de\/produkt\//.test(x.link || "");
  const de = treffer.filter(istDE);
  const gefiltert = treffer.filter((x) => !istDE(x)); // WPML EN/FR — nur für Report
  void p;
  return { de, gefiltert };
}

// CT-C70-F9-A6  →  {klasse, c, f, a}
function parseKlasse(text: string): { klasse: string; c: string; f: string; a: string } | null {
  const m = text.match(/CT-C(\d+)-F(\d+)-A([\d,]+)/);
  if (!m) return null;
  return { klasse: m[0], c: m[1], f: m[2], a: m[3] };
}

// Benannter KORODUR-Hartstoff-Zuschlag (VS 0/5, WH-Spezial, WH-metallisch,
// Diamantbeton). Fehlt der benannte Zuschlag (z. B. „plus"), wird der
// Material-Typ als Hinweis zurückgegeben.
function parseBasisHartstoff(text: string): { wert: string; quelle: "benannt" | "typ" | "" } {
  const m = text.match(/KORODUR (VS\s*[\d/]+|WH-Spezial|WH-metallisch|Diamantbeton)/);
  if (m) return { wert: "KORODUR " + ws(m[1]), quelle: "benannt" };
  if (/kunststoffmodifiziert/i.test(text)) return { wert: "kunststoffmodifiziert (kein benannter Zuschlag im Text)", quelle: "typ" };
  return { wert: "", quelle: "" };
}

// Marketing-Beschreibung ohne die strukturierten Tails (Qualität/Systemkomp.).
function cleanBeschreibung(text: string): string {
  let t = ws(text);
  t = t.split(/\bQualität\b/)[0];
  t = t.split(/Ergänzende Systemkomponenten/)[0];
  return t.trim();
}

// Tail nach „Ergänzende Systemkomponenten" (Rohblob, unstrukturiert).
function systemkomponentenBlob(text: string): string {
  const i = text.indexOf("Ergänzende Systemkomponenten");
  return i >= 0 ? ws(text.slice(i + "Ergänzende Systemkomponenten".length)) : "";
}

// DIN-Normen, die im Text genannt werden.
function findeNormen(text: string): string[] {
  const set = new Set<string>();
  const re = /DIN(?:\s+EN)?(?:\s+ISO)?\s+\d+[\d-]*(?:-\d+)?/g;
  for (const m of text.matchAll(re)) set.add(ws(m[0]));
  return [...set];
}

// Produkt-Index für verwandteProdukte: Name-Substring → id (längster Name
// zuerst, damit „KOROMINERAL CURE" vor „KOROMINERAL" greift).
const NAME_INDEX = produkte
  .map((p) => ({ id: p.id, needle: p.name.toLowerCase() }))
  .sort((a, b) => b.needle.length - a.needle.length);

function mapVerwandte(...blobs: string[]): { ids: string[]; eingestellt: string[]; roh: string } {
  const roh = ws(blobs.join(" "));
  const lower = roh.toLowerCase();
  const ids: string[] = [];
  for (const { id, needle } of NAME_INDEX) {
    if (needle.length < 5) continue; // zu kurze Namen meiden Falschtreffer
    if (lower.includes(needle) && !ids.includes(id)) ids.push(id);
  }
  // KOROPOX o. ä. explizit als „eingestellt" melden (hat kein Produkt mehr).
  const eingestellt: string[] = [];
  for (const e of ["KOROPOX"]) if (lower.includes(e.toLowerCase())) eingestellt.push(e);
  return { ids: ids.filter((id) => !EINGESTELLT.has(id)), eingestellt, roh };
}

// ---------------------------------------------------------------------------
// TDS-Parsing — UPPERCASE-Sektionen.
// ---------------------------------------------------------------------------
type Tds = {
  datei: string;
  eigenschaften: string[];
  technischeDatenRoh: string;
  verarbeitungModi: { titel: string; schritte: string[] }[];
  nachbehandlung: string;
  fugen: string;
  lieferform: string;
  lagerung: string;
};

const TDS_HEADERS = [
  "BESCHREIBUNG", "ANWENDUNG", "EIGENSCHAFTEN", "TECHNISCHE DATEN",
  "VERARBEITUNG", "NACHBEHANDLUNG", "FUGEN", "LIEFERFORM", "LAGERUNG", "HINWEIS",
];

function sektionen(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  const positions: { h: string; i: number }[] = [];
  for (const h of TDS_HEADERS) {
    const i = text.indexOf(h);
    if (i >= 0) positions.push({ h, i });
  }
  positions.sort((a, b) => a.i - b.i);
  for (let k = 0; k < positions.length; k++) {
    const start = positions[k].i + positions[k].h.length;
    const end = k + 1 < positions.length ? positions[k + 1].i : text.length;
    out[positions[k].h] = text.slice(start, end);
  }
  return out;
}

function parseTds(datei: string): Tds | null {
  const full = path.join(TDS_DIR, datei);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8").replace(/--- PAGE \d+ ---/g, " ");
  const sek = sektionen(raw);

  const eigenschaften = (sek["EIGENSCHAFTEN"] || "")
    .split("•").map(ws).filter((s) => s.length > 2);

  // VERARBEITUNG: zwei Modi „frisch auf frisch" / „auf erhärtetem Tragbeton".
  const vText = ws(sek["VERARBEITUNG"] || "");
  const modi: { titel: string; schritte: string[] }[] = [];
  if (vText) {
    const mMark = /auf erhärtetem Tragbeton/i.exec(vText);
    const aText = mMark ? vText.slice(0, mMark.index) : vText;
    const bText = mMark ? vText.slice(mMark.index + mMark[0].length) : "";
    // Jeder Modus = genau ein „Untergrund …"-Absatz + ein „Verarbeitung …"-
    // Absatz. Am ERSTEN „Verarbeitung" trennen (das Wort kommt im Fließtext
    // erneut vor — nicht daran zerteilen).
    const inSchritte = (t: string) => {
      const s = ws(t);
      const vi = s.search(/\bVerarbeitung\b/);
      if (/^Untergrund\b/.test(s) && vi > 0) {
        return [s.slice(0, vi).trim(), s.slice(vi).trim()].filter((x) => x.length > 4);
      }
      return s.length > 4 ? [s] : [];
    };
    modi.push({ titel: "Frisch auf frisch", schritte: inSchritte(aText.replace(/^frisch auf frisch/i, "")) });
    if (bText) modi.push({ titel: "Auf erhärtetem Tragbeton", schritte: inSchritte(bText) });
  }

  return {
    datei,
    eigenschaften,
    technischeDatenRoh: ws(sek["TECHNISCHE DATEN"] || ""),
    verarbeitungModi: modi,
    nachbehandlung: ws(sek["NACHBEHANDLUNG"] || ""),
    fugen: ws(sek["FUGEN"] || ""),
    lieferform: ws(sek["LIEFERFORM"] || ""),
    lagerung: ws(sek["LAGERUNG"] || ""),
  };
}

// Member-TDS aus dem TDS-Doku-Link ableiten und auf lokale Textdatei mappen.
function tdsDateiFuer(e: XmlEntry): { datei: string | null; quellPdf: string | null } {
  const tds = (e.dokumente || []).find((d) => /Datenblatt/i.test(d.text));
  const quellPdf = tds ? path.basename(tds.href) : null;
  if (!quellPdf) return { datei: null, quellPdf: null };
  // Basisname ohne Datum/Versionspfade angleichen.
  const base = quellPdf.replace(/_de\.pdf$/i, "").toLowerCase();
  const dateien = fs.readdirSync(TDS_DIR);
  const treffer = dateien.find((f) => f.toLowerCase().replace(/\.txt$/, "").endsWith(base.replace(/^neodur_/, "neodur_")));
  // Fallback: enthält Kern-Token (z. B. „he_65_plus" / „he_65").
  const kern = base.replace(/^neodur_/, "");
  const treffer2 = treffer || dateien.find((f) => f.toLowerCase().includes(kern) && f.toLowerCase().includes("he_65") && /metall/i.test(kern) === /metall/i.test(f.toLowerCase()));
  return { datei: treffer2 || null, quellPdf };
}

// ---------------------------------------------------------------------------
// Hauptlauf
// ---------------------------------------------------------------------------
const prefix = process.argv[2];
if (!prefix) {
  console.error('Aufruf: npx tsx scripts/extract-varianten.ts "HE 65"');
  process.exit(2);
}

const { de, gefiltert } = ladeMitglieder(prefix);
if (de.length === 0) {
  console.error(`Keine DE-Ausführungen für Präfix "${prefix}" gefunden.`);
  process.exit(1);
}

// Mutter = kürzester Slug, mit dem alle anderen beginnen.
const slugs = de.map((x) => x.slug);
const mutter = [...slugs].sort((a, b) => a.length - b.length).find((s) => slugs.every((o) => o.startsWith(s)))!;
const familieSlug = mutter.replace(/^neodur-/, "").replace(/[^a-z0-9]+/g, "-");

// Geteilte SKUs unter den DE-Mitgliedern melden.
const skuMap = new Map<string, string[]>();
for (const x of de) {
  const arr = skuMap.get(x.sku) || [];
  arr.push(x.slug);
  skuMap.set(x.sku, arr);
}
const geteilteSkus = [...skuMap.entries()].filter(([, v]) => v.length > 1);

// Geschwister-Set (= alle DE-Ausführungen) — die laufen über `variantenGruppe`,
// NICHT über `verwandteProdukte`. Mutter-TDS als Fallback für Ausführungen,
// deren eigener TDS-Text (noch) nicht im Korpus liegt (z. B. metallisch).
const familySet = new Set(de.map((x) => x.slug));
const mutterEntry = de.find((x) => x.slug === mutter)!;
const mutterTds = (() => {
  const { datei } = tdsDateiFuer(mutterEntry);
  return datei ? parseTds(datei) : null;
})();

type Draft = {
  member: XmlEntry;
  klasse: ReturnType<typeof parseKlasse>;
  basis: ReturnType<typeof parseBasisHartstoff>;
  beschreibung: string;
  normen: string[];
  verwandte: ReturnType<typeof mapVerwandte>;
  tds: Tds | null;
  tdsQuellPdf: string | null;
  tdsLokalFehlt: boolean;
  tdsFallback: boolean;
};

const drafts: Draft[] = de.map((m) => {
  const klasse = parseKlasse(m.beschreibung);
  const { datei, quellPdf } = tdsDateiFuer(m);
  const eigenerTds = datei ? parseTds(datei) : null;
  const tds = eigenerTds ?? mutterTds;
  const tdsFallback = !eigenerTds && !!mutterTds;
  const verwandte = mapVerwandte(systemkomponentenBlob(m.beschreibung), tds?.nachbehandlung || "", tds?.verarbeitungModi.flatMap((x) => x.schritte).join(" ") || "");
  // Geschwister + Selbst raus (laufen über variantenGruppe).
  verwandte.ids = verwandte.ids.filter((id) => !familySet.has(id));
  return {
    member: m,
    klasse,
    basis: parseBasisHartstoff(m.beschreibung),
    beschreibung: cleanBeschreibung(m.beschreibung),
    normen: findeNormen(m.beschreibung + " " + (tds?.technischeDatenRoh || "") + " " + (tds?.verarbeitungModi.map((x) => x.schritte.join(" ")).join(" ") || "")),
    verwandte,
    tds,
    tdsQuellPdf: quellPdf,
    tdsLokalFehlt: !eigenerTds,
    tdsFallback,
  };
});

// CT-Klasse → provisorische technischeDaten-Zeilen (member-korrekt).
function technischeDatenDraft(d: Draft): { label: string; wert: string; norm?: string }[] {
  const rows: { label: string; wert: string; norm?: string }[] = [];
  if (d.klasse) {
    rows.push({ label: "Klassifizierung", wert: d.klasse.klasse, norm: "DIN EN 13813" });
    rows.push({ label: "Druckfestigkeit", wert: `C ${d.klasse.c} N/mm²`, norm: "DIN EN 13892-2" });
    rows.push({ label: "Biegezugfestigkeit", wert: `F ${d.klasse.f} N/mm²`, norm: "DIN EN 13892-2" });
    rows.push({ label: "Verschleißwiderstand (Böhme)", wert: `A ${d.klasse.a}`, norm: "DIN EN 13892-3" });
  }
  // Familien-Konstanten aus TDS (sauber: „alle Qualitäten").
  if (/0-5 mm/.test(d.tds?.technischeDatenRoh || "")) rows.push({ label: "Körnung", wert: "0–5 mm" });
  if (/zementgrau/.test(d.tds?.technischeDatenRoh || "")) rows.push({ label: "Farbe", wert: "zementgrau" });
  return rows;
}

// ---------------------------------------------------------------------------
// Ausgabe 1: TS-Entwurf (NICHT importiert)
// ---------------------------------------------------------------------------
function tsLit(s: string): string {
  return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
}
function arrLit(a: string[], indent = "    "): string {
  if (!a.length) return "[]";
  return "[\n" + a.map((s) => indent + "  " + tsLit(s)).join(",\n") + "\n" + indent + "]";
}

const tsParts: string[] = [];
tsParts.push(`// ENTWURF — generiert von scripts/extract-varianten.ts (#371). NICHT importiert.`);
tsParts.push(`// Familie: ${prefix} · variantenGruppe: "${mutter}" · ${drafts.length} Ausführungen.`);
tsParts.push(`// HAND-VERIFIKATION für #372. Normwerte PROVISORISCH bis PDB/Technik-Termin.`);
tsParts.push(`// Leer gelassen (Experten/PDB): verbrauch, eigenes TDS, bild/Foto, EPD.`);
tsParts.push(``);
tsParts.push(`export const ${familieSlug.replace(/-/g, "_")}_entwurf = [`);
for (const d of drafts) {
  const m = d.member;
  const td = technischeDatenDraft(d);
  tsParts.push(`  {`);
  tsParts.push(`    id: ${tsLit(m.slug)},`);
  tsParts.push(`    name: ${tsLit(ws(m.title))},`);
  tsParts.push(`    sku: ${tsLit(m.sku)},`);
  tsParts.push(`    variantenGruppe: ${tsLit(mutter)},`);
  tsParts.push(`    qualitaetsklasse: ${d.klasse ? tsLit(d.klasse.klasse) : '""  /* TODO: keine CT-Klasse im Text */'},`);
  tsParts.push(`    // Basis-Hartstoff (${d.basis.quelle || "fehlt"}): ${d.basis.wert || "—"}`);
  tsParts.push(`    beschreibung: ${tsLit(d.beschreibung)},`);
  tsParts.push(`    normen: ${arrLit(d.normen)},`);
  tsParts.push(`    technischeDaten: [`);
  for (const r of td) tsParts.push(`      { label: ${tsLit(r.label)}, wert: ${tsLit(r.wert)}${r.norm ? `, norm: ${tsLit(r.norm)} /* provisorisch */` : ""} },`);
  tsParts.push(`    ],`);
  tsParts.push(`    besonderheiten: ${d.tds ? arrLit(d.tds.eigenschaften, "    ") : "[]  /* TDS-Text fehlt */"},`);
  if (d.tds && d.tds.verarbeitungModi.length) {
    tsParts.push(`    verarbeitungModi: [`);
    for (const mo of d.tds.verarbeitungModi) {
      tsParts.push(`      { titel: ${tsLit(mo.titel)}, schritte: ${arrLit(mo.schritte, "        ")} },`);
    }
    tsParts.push(`    ],`);
  }
  tsParts.push(`    verwandteProdukte: ${arrLit(d.verwandte.ids)},`);
  if (d.tdsLokalFehlt) tsParts.push(`    // ⚠ Eigener TDS-Text (${d.tdsQuellPdf}) nicht im Korpus — Felder aus Familien-TDS, gegen Original prüfen.`);
  tsParts.push(`  },`);
}
tsParts.push(`];`);
tsParts.push(``);

const tsOut = path.join(OUT_DIR, `varianten-entwurf-${familieSlug}.draft.ts`);
fs.writeFileSync(tsOut, tsParts.join("\n"));

// ---------------------------------------------------------------------------
// Ausgabe 2: Quellen-Report (Markdown)
// ---------------------------------------------------------------------------
const md: string[] = [];
md.push(`# Varianten-Entwurf — ${prefix} (#371)`);
md.push(``);
md.push(`Generiert von \`scripts/extract-varianten.ts\`. **Entwurf zur Hand-Verifikation (#372), kein Blind-Commit.**`);
md.push(``);
md.push(`- **variantenGruppe / Mutter:** \`${mutter}\``);
md.push(`- **DE-Ausführungen:** ${de.length} (${slugs.join(", ")})`);
md.push(`- **WPML-Duplikate gefiltert (EN/FR):** ${gefiltert.length}`);
md.push(`- **Normwerte:** PROVISORISCH (aus CT-Klasse/TDS abgeleitet) — final via PDB/Technik-Termin.`);
md.push(`- **Bewusst leer (Experten/PDB):** Verbrauch, eigenes TDS, Foto/\`bild\`, EPD.`);
md.push(``);
if (geteilteSkus.length) {
  md.push(`## ⚠ Geteilte SKUs`);
  for (const [sku, sl] of geteilteSkus) md.push(`- \`${sku}\` → ${sl.join(", ")}`);
  md.push(``);
} else {
  md.push(`## SKUs`);
  md.push(`Alle DE-Ausführungen haben distinkte SKUs.`);
  md.push(``);
}
md.push(`## Feld-Provenienz je Ausführung`);
for (const d of drafts) {
  const m = d.member;
  md.push(``);
  md.push(`### ${ws(m.title)} — \`${m.slug}\``);
  md.push(`| Feld | Wert | Quelle |`);
  md.push(`| --- | --- | --- |`);
  md.push(`| sku | \`${m.sku}\` | XML |`);
  md.push(`| qualitaetsklasse | ${d.klasse ? d.klasse.klasse : "— (keine CT-Klasse im Text)"} | XML (Regex) |`);
  md.push(`| Basis-Hartstoff | ${d.basis.wert || "—"} | XML (${d.basis.quelle || "fehlt"}) |`);
  md.push(`| beschreibung | ${d.beschreibung.slice(0, 80)}… | XML (bereinigt) |`);
  md.push(`| normen | ${d.normen.join(", ") || "—"} | XML+TDS |`);
  md.push(`| besonderheiten | ${d.tds ? d.tds.eigenschaften.length + " Bullets" : "— (TDS-Text fehlt)"} | TDS ${d.tds?.datei || d.tdsQuellPdf || "?"}${d.tdsFallback ? " ⚠ Familien-TDS-Fallback (gegen eigenes TDS prüfen)" : ""} |`);
  md.push(`| verarbeitungModi | ${d.tds ? d.tds.verarbeitungModi.length + " Modi" : "—"} | TDS |`);
  md.push(`| verwandteProdukte | ${d.verwandte.ids.join(", ") || "—"} | XML-Systemkomp. + TDS (Namens-Substring) |`);
  md.push(`| Packshot-Kandidat | ${m.thumbnail_url || "—"} | XML (extern, später migrieren) |`);
  md.push(`| eigenes TDS (PDF) | ${d.tdsQuellPdf || "—"}${d.tdsLokalFehlt ? " ⚠ kein lokaler Text" : ""} | XML dokumente |`);
  if (d.verwandte.eingestellt.length) md.push(`| eingestellt gefiltert | ${d.verwandte.eingestellt.join(", ")} | regelbasiert |`);
  md.push(``);
  md.push(`<details><summary>TECHNISCHE-DATEN-Rohblock (TDS, manuell strukturieren)</summary>`);
  md.push(``);
  md.push("```");
  md.push(d.tds?.technischeDatenRoh || "(kein TDS-Text)");
  md.push("```");
  md.push(`</details>`);
}
md.push(``);
md.push(`## Verworfene WPML-Duplikate`);
for (const g of gefiltert) md.push(`- ${ws(g.title)} — ${g.link}`);
md.push(``);

const mdOut = path.join(OUT_DIR, `varianten-entwurf-${familieSlug}.report.md`);
fs.writeFileSync(mdOut, md.join("\n"));

// ---------------------------------------------------------------------------
// Konsolen-Zusammenfassung
// ---------------------------------------------------------------------------
console.log(`Familie "${prefix}" → variantenGruppe "${mutter}"`);
console.log(`DE-Ausführungen: ${de.length} · WPML-Duplikate gefiltert: ${gefiltert.length}`);
console.log(`Geteilte SKUs: ${geteilteSkus.length ? geteilteSkus.map(([s]) => s).join(", ") : "keine"}`);
for (const d of drafts) {
  const flags: string[] = [];
  if (!d.klasse) flags.push("KEINE CT-Klasse");
  if (!d.tds) flags.push("TDS-Text fehlt");
  if (d.tdsLokalFehlt) flags.push("eigenes TDS nicht im Korpus");
  if (d.verwandte.eingestellt.length) flags.push("eingestellt gefiltert: " + d.verwandte.eingestellt.join("/"));
  console.log(`  · ${d.member.slug.padEnd(28)} ${d.klasse?.klasse || "—"}  [${flags.join("; ") || "ok"}]`);
}
console.log(`\nEntwurf:  ${path.relative(REPO, tsOut)}`);
console.log(`Report:   ${path.relative(REPO, mdOut)}`);

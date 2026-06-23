/**
 * Abgleich App-Referenzen (data/referenzen.ts) <-> extrahierte WP-Quelldaten
 * (docs/website-migration/extraktion-referenzen.json).
 *
 * Erzeugt:
 *   docs/website-migration/referenz-abgleich.md   (Delta-Report)
 *   docs/website-migration/referenz-fills.json     (Befüll-Vorschläge flaeche/jahr)
 *
 * Ändert NICHTS an referenzen.ts — nur Analyse. Lauf: npx tsx scripts/reconcile-referenzen.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { referenzen } from "../data/referenzen";
import { produkte } from "../data/produkte";

type XmlRef = {
  title: string; slug: string; status: string;
  ref_type: string; ref_category: string;
  ort: string; land: string; baujahr: string; flaeche: string;
  produkte_text: string; produkte_slugs: string[];
  beschreibung: string; gallery_urls: string[];
};

const ROOT = join(__dirname, "..");
const xml: XmlRef[] = JSON.parse(
  readFileSync(join(ROOT, "docs/website-migration/extraktion-referenzen.json"), "utf-8")
);

const norm = (s: string) =>
  (s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "");

// generische Bau-/Boden-Wörter, die nicht als Eigenname zählen
const STOP = new Set([
  "halle","hallen","produktion","produktions","produktionshalle","sanierung","neubau","boden",
  "industrie","industrieboden","logistik","logistikzentrum","lager","werk","werks","werkstatt",
  "zentrum","centre","center","center","gmbh","und","der","die","das","fuer","von","mit","ein",
  "eine","wochenend","wochenende","flaeche","produktionsflaeche","betrieb","standort","neue","neuer",
  "deutschland","sichtestrich","designboden","parkdeck","beschichtung","estrich",
]);
const tokens = (s: string) =>
  (s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/).filter((w) => w.length >= 4 && !STOP.has(w));

// DE-Teilmenge: deutsche ref_type-Werte
const DE_TYPES = new Set(["neubau", "sanierung", "instandsetzung", "modernisierung"]);
const xmlDe = xml.filter((x) => DE_TYPES.has(norm(x.ref_type)));

// Document-Frequency über Titel+Ort-Tokens -> distinktive Tokens (Eigennamen)
const df = new Map<string, number>();
for (const x of xmlDe) {
  for (const w of new Set([...tokens(x.title), ...tokens(x.ort)])) df.set(w, (df.get(w) || 0) + 1);
}
const distinctive = (s: string) => tokens(s).filter((w) => (df.get(w) || 0) <= 4);

const bySlug = new Map<string, XmlRef>();
const byTitle = new Map<string, XmlRef>();
for (const x of xmlDe) {
  if (x.slug) bySlug.set(x.slug, x);
  if (x.title) byTitle.set(norm(x.title), x);
}
// Index distinktiver Tokens -> XML-Refs
const byToken = new Map<string, XmlRef[]>();
for (const x of xmlDe) {
  for (const w of new Set([...distinctive(x.title), ...distinctive(x.ort)])) {
    (byToken.get(w) || byToken.set(w, []).get(w)!).push(x);
  }
}

const matchedXml = new Set<XmlRef>();
const fills: any[] = [];
const rows: string[] = [];
const unmatched: string[] = [];
const prodDiffs: any[] = [];
let nSlug = 0, nTitle = 0, nOrt = 0, nNone = 0;

// Produkt-Katalog (App): normalisierte Namen + IDs zum Existenz-Check
const catalogNorm = produkte.flatMap((p) => [norm(p.name), norm(p.id)]).filter(Boolean);
const inCatalog = (s: string) => {
  const n = norm(s);
  return n.length >= 3 && catalogNorm.some((c) => c.includes(n) || n.includes(c));
};

for (const r of referenzen) {
  let x = bySlug.get(r.slug);
  let how = "slug";
  if (!x) { x = byTitle.get(norm(r.titel)); if (x) how = "titel"; }
  if (!x) {
    // distinktive-Token-Scoring
    const appTok = new Set([...distinctive(r.titel), ...distinctive(r.ort)]);
    const cand = new Map<XmlRef, number>();
    for (const w of appTok) for (const c of byToken.get(w) || []) cand.set(c, (cand.get(c) || 0) + 1);
    let best: XmlRef | undefined; let bestScore = 0;
    for (const [c, sc] of cand) {
      const score = sc + (norm(c.ort) && norm(c.ort) === norm(r.ort) ? 1 : 0);
      if (score > bestScore) { bestScore = score; best = c; }
    }
    if (best && bestScore >= 1) { x = best; how = "token"; }
  }
  if (!x) { nNone++; unmatched.push(`${r.slug} (${r.titel}, ${r.ort})`); continue; }
  matchedXml.add(x);
  if (how === "slug") nSlug++; else if (how === "titel") nTitle++; else nOrt++; // nOrt = token

  const fill: any = { slug: r.slug, titel: r.titel, matchedBy: how, xmlSlug: x.slug };
  let needs = false;
  if (!r.flaeche && x.flaeche) { fill.flaeche = x.flaeche; needs = true; }
  const xJahr = parseInt(x.baujahr, 10);
  if (!r.jahr && xJahr) { fill.jahr = xJahr; needs = true; }
  if (needs) fills.push(fill);

  // Produkt-Mapping (informativ, fuzzy)
  const appProds = r.produkte.join(" | ");
  const xmlProds = x.produkte_text || x.produkte_slugs.join(", ");
  const overlap = x.produkte_slugs.some((s) => r.produkte.some((p) => norm(p).includes(norm(s)) || norm(s).includes(norm(p))));
  const isDiff = norm(appProds).length > 0 && norm(xmlProds).length > 0 && !overlap;
  const prodFlag = isDiff ? " ⚠️" : "";
  rows.push(`| ${r.slug} | ${how} | ${r.flaeche || "—"} → ${x.flaeche || "—"} | ${r.jahr || "—"} → ${x.baujahr || "—"} | ${appProds} _/_ ${xmlProds}${prodFlag} |`);
  if (isDiff) {
    // Quell-Produkte gegen Katalog prüfen: existiert das Quell-Produkt bei uns?
    const srcItems = (x.produkte_slugs.length ? x.produkte_slugs : xmlProds.split(/[,;/]| und |–|-/))
      .map((s) => s.trim()).filter((s) => s.length >= 3);
    const srcUnknown = srcItems.filter((s) => !inCatalog(s));
    prodDiffs.push({
      slug: r.slug, titel: r.titel, ort: r.ort,
      app: r.produkte, quelle_text: x.produkte_text, quelle_slugs: x.produkte_slugs,
      quelle_nicht_im_katalog: srcUnknown,
      empfehlung: srcUnknown.length === srcItems.length
        ? "App behalten (Quell-Produkt existiert nicht im Katalog)"
        : "Im Chat prüfen (Quell-Produkt existiert, Abweichung könnte echt sein)",
    });
  }
}

const xmlUnused = xmlDe.filter((x) => !matchedXml.has(x) && x.status === "publish");

const md: string[] = [];
md.push("# Referenz-Abgleich App ↔ WP-Quelle\n");
md.push(`App-Referenzen: ${referenzen.length} · DE-Quell-Referenzen: ${xmlDe.length} (publish: ${xmlDe.filter(x=>x.status==="publish").length}, draft: ${xmlDe.filter(x=>x.status==="draft").length})\n`);
md.push(`## Matching\n`);
md.push(`- per Slug: ${nSlug} · per Titel: ${nTitle} · per Ort+Jahr: ${nOrt} · **kein Match: ${nNone}**\n`);
md.push(`## Befüll-Vorschläge (App-Feld leer, Quelle hat Wert)\n`);
md.push(`- Fläche füllbar: ${fills.filter(f=>f.flaeche).length} · Jahr füllbar: ${fills.filter(f=>f.jahr).length}\n`);
md.push(`Vorschläge in \`referenz-fills.json\`.\n`);
md.push(`## App-Refs ohne Quell-Match (${nNone})\n`);
md.push(unmatched.map((u) => `- ${u}`).join("\n") + "\n");
md.push(`## DE-Quell-Refs nicht in der App (${xmlUnused.length}, Kandidaten für Import)\n`);
md.push(xmlUnused.map((x) => `- ${x.slug || norm(x.title)} — ${x.title} (${x.ort}, ${x.ref_category}, ${x.ref_type})`).join("\n") + "\n");
md.push(`## Detailtabelle (⚠️ = Produkt-Mapping prüfen)\n`);
md.push(`| Slug | Match | Fläche app→quelle | Jahr app→quelle | Produkte app _/_ quelle |`);
md.push(`|---|---|---|---|---|`);
md.push(...rows);

writeFileSync(join(ROOT, "docs/website-migration/referenz-abgleich.md"), md.join("\n"));
writeFileSync(join(ROOT, "docs/website-migration/referenz-fills.json"), JSON.stringify(fills, null, 1));
writeFileSync(join(ROOT, "docs/website-migration/referenz-produkt-diff.json"), JSON.stringify(prodDiffs, null, 1));

const chatPruefen = prodDiffs.filter((d) => d.empfehlung.startsWith("Im Chat"));
console.log(`Match: slug=${nSlug} titel=${nTitle} ort=${nOrt} keinMatch=${nNone}`);
console.log(`Fills: flaeche=${fills.filter(f=>f.flaeche).length} jahr=${fills.filter(f=>f.jahr).length}`);
console.log(`Produkt-Diffs: ${prodDiffs.length} (App behalten: ${prodDiffs.length - chatPruefen.length}, im Chat prüfen: ${chatPruefen.length})`);
console.log(`Quell-Refs nicht in App: ${xmlUnused.length}`);

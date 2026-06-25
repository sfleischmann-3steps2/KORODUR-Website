/**
 * Reichert das rohe Dokumenten-Inventar (#300, docs/website-migration/
 * dokumenten-inventar.csv) zur Download-Center-Datenbasis (#301) an:
 *   1. Sprachvarianten -> Stamm-Dokumente dedupliziert (Sprachen-Set + URLs je Sprache)
 *   2. Typ-Heuristik per Dateinamen-Regeln verfeinert
 *   3. Deterministisches Mapping aufs AKTUELLE Portfolio:
 *        - exakter [product]-Token-/Dateinamen-Match -> Produkt-IDs
 *        - [page]-Token-Crosswalk (Alt-Taxonomie) -> Bereich-Slugs
 *   4. Rest (Orphans / Alt-Namen / Uebersetzungen) -> status "needsReview"
 *        = Input fuer den AI-Anreicherungs-Workflow.
 *
 * Output: docs/website-migration/dokumente-stamm.json (+ Konsolenstatistik).
 * Quelle bleibt das CSV; reproduzierbar.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { produkte } from "../data/produkte";

const ROOT = join(__dirname, "..");
const csvPath = join(ROOT, "docs/website-migration/dokumenten-inventar.csv");
const outPath = join(ROOT, "docs/website-migration/dokumente-stamm.json");

// --- CSV robust parsen (Zuordnung kann Kommas enthalten -> feste Randspalten) ---
const lines = readFileSync(csvPath, "utf8").trim().split("\n");
const header = lines[0].split(",");
type Row = {
  Dokument: string; Stamm: string; Typ: string; Sprache: string;
  Zuordnung: string; AufNeuerSite: string; URL: string; Endung: string;
};
const rows: Row[] = lines.slice(1).map((line) => {
  const p = strSplit(line);
  // 8 Spalten fix; Zuordnung = Mitte (Index 4 .. len-4)
  const n = p.length;
  return {
    Dokument: p[0], Stamm: p[1], Typ: p[2], Sprache: p[3],
    Zuordnung: p.slice(4, n - 3).join(","),
    AufNeuerSite: p[n - 3], URL: p[n - 2], Endung: p[n - 1],
  };
});
function strSplit(line: string): string[] { return line.split(","); }

// --- Aktuelles Portfolio ---
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "");
const nameToId = new Map<string, string>();
const idToBereiche = new Map<string, string[]>();
for (const p of produkte) {
  const bs = [p.bereich, ...((p as { zusatzBereiche?: string[] }).zusatzBereiche ?? [])].filter(Boolean) as string[];
  idToBereiche.set(p.id, bs);
  nameToId.set(norm(p.name), p.id);
  for (const v of (p as { varianten?: { name: string }[] }).varianten ?? []) nameToId.set(norm(v.name), p.id);
}

// --- Bereich-Crosswalk: Alt-Taxonomie [page]-Token -> aktueller Bereich-Slug ---
// Reihenfolge = Prioritaet (spezifisch vor generisch). Generische Doku-Index-/
// Unternehmensseiten bewusst NICHT gemappt (kein Bereich).
const BEREICH_KEYWORDS: [string, string][] = [
  ["3d concrete", "3d-concrete-printing"],
  ["geglatteter sichtestrich", "industrieboden"],
  ["geschliffener sichtestrich", "industrieboden"],
  ["polished decorative", "industrieboden"],
  ["decorative screed", "industrieboden"],
  ["sol decoratif", "industrieboden"],
  ["sols decoratifs", "industrieboden"],
  ["sichtestrich", "industrieboden"],
  ["truazzo", "industrieboden"],
  ["industrieboden", "industrieboden"],
  ["industrial floor", "industrieboden"],
  ["sols industriels", "industrieboden"],
  ["microtop", "microtop"],
  ["rapid concrete", "infrastruktur"],
  ["schnellbetonsysteme", "infrastruktur"],
  ["rapid set", "rapid-set"],
  ["spezialbaustoffe", "spezialmoertel"],
  ["special mortars", "spezialmoertel"],
  ["mortiers speciaux", "spezialmoertel"],
  ["katzenstreu", "katzenstreu"],
];
function pageToBereich(token: string): string | null {
  const t = norm(token);
  for (const [kw, slug] of BEREICH_KEYWORDS) if (t.includes(norm(kw))) return slug;
  return null;
}

// --- Typ per Dateinamen verfeinern (ueberschreibt Heuristik wo eindeutig) ---
function typVerfeinert(stamm: string, csvTyp: string): string {
  const s = stamm.toLowerCase();
  if (/(sdb|sds|sicherheitsdatenblatt|safety_data|fds_)/.test(s)) return "SDB/SDS";
  if (/(dop|leistungserklarung|declaration_of_performance|_le_|ce_)/.test(s)) return "DoP/CE";
  if (/(flyer|prospekt|broschuere|broschure|brochure|katalog|catalog|report)/.test(s)) return "Broschüre/Katalog";
  if (/(reinigung|pflege|wartung|maintenance|anwendung|application|sicherheitsunterweisung|verarbeitung)/.test(s)) return "System-/Service-Info";
  if (/(zertifikat|certificate|pruefzeugnis|prufzeugnis)/.test(s)) return "Zertifikat/Prüfzeugnis";
  if (/(tds|technisches_datenblatt|technical_data|datenblatt|data_sheet|fiche_technique)/.test(s)) return "TDS";
  return csvTyp.replace(" (vermutet)", "");
}

function humanize(stamm: string): string {
  return stamm.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\s+/g, " ").trim();
}

// --- Dedup nach Stamm ---
const groups = new Map<string, Row[]>();
for (const r of rows) {
  if (!groups.has(r.Stamm)) groups.set(r.Stamm, []);
  groups.get(r.Stamm)!.push(r);
}

type StammDoc = {
  stamm: string; titel: string; typ: string;
  sprachen: string[]; aufNeuerSite: boolean;
  urls: Record<string, string>; zuordnung: string;
  produkte: string[]; bereiche: string[];
  status: "auto" | "needsReview" | "excluded"; reviewGrund?: string;
};

const out: StammDoc[] = [];
for (const [stamm, group] of groups) {
  const zuordnung = [...new Set(group.map((r) => r.Zuordnung))].join("; ");
  const sprachen = [...new Set(group.map((r) => r.Sprache).filter((s) => s && s !== "—"))];
  const urls: Record<string, string> = {};
  for (const r of group) urls[r.Sprache || "—"] = r.URL;
  const aufNeuerSite = group.some((r) => r.AufNeuerSite === "ja");
  const typ = typVerfeinert(stamm, group[0].Typ);

  // Produkt-Mapping (1): exakte [product]-Token aus der Zuordnung
  const produkteSet = new Set<string>();
  for (const m of zuordnung.matchAll(/([^;]+?)\s*\[product\]/g)) {
    const id = nameToId.get(norm(m[1].trim()));
    if (id) produkteSet.add(id);
  }
  // Produkt-Mapping (2): Dateiname enthaelt Produktnamen als Substring
  // (Alt-Site verlinkte TDS/SDB/DoP ueber Index-Seiten -> Produkt steckt im
  // Dateinamen). Hochpraezise: voller normalisierter Name als Teilstring,
  // Name >= 4 Zeichen (gegen Kurz-Kollisionen).
  const stammNorm = norm(stamm);
  for (const [nName, id] of nameToId) {
    if (nName.length >= 4 && stammNorm.includes(nName)) produkteSet.add(id);
  }
  // Bereich-Mapping: [page]-Crosswalk + Bereiche der gematchten Produkte
  const bereicheSet = new Set<string>();
  for (const m of zuordnung.matchAll(/([^;]+?)\s*\[page\]/g)) {
    const b = pageToBereich(m[1].trim());
    if (b) bereicheSet.add(b);
  }
  for (const id of produkteSet) for (const b of idToBereiche.get(id) ?? []) bereicheSet.add(b);

  const produkteArr = [...produkteSet];
  const bereicheArr = [...bereicheSet];

  // Deterministischer Ausschluss: Presse/PR/Unternehmens-Indizes gehoeren nicht
  // ins Download-Center (Produkt-/System-Dokumente). Faelschlich oft als "TDS"
  // heuristisiert. -> status "excluded", nicht in den Workflow.
  const istPresse = /(zeitung|bauzeitung|presse|newsletter|magazin|^korodur_report|_report_|report_\d|news_|pressemitteilung)/.test(stamm.toLowerCase());

  let status: "auto" | "needsReview" | "excluded" = "auto";
  let reviewGrund: string | undefined;
  if (istPresse) {
    status = "excluded";
    reviewGrund = "presse/pr";
  } else if (produkteArr.length === 0 && bereicheArr.length === 0) {
    status = "needsReview";
    reviewGrund = zuordnung.includes("(nur Mediathek)") ? "orphan-mediathek" : "alt-taxonomie/unmatched";
  }

  out.push({
    stamm, titel: humanize(stamm), typ, sprachen, aufNeuerSite,
    urls, zuordnung, produkte: produkteArr, bereiche: bereicheArr, status, reviewGrund,
  });
}

out.sort((a, b) => a.stamm.localeCompare(b.stamm));
writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

// --- Statistik ---
const auto = out.filter((d) => d.status === "auto");
const review = out.filter((d) => d.status === "needsReview");
const excluded = out.filter((d) => d.status === "excluded");
const byGrund = new Map<string, number>();
for (const d of review) byGrund.set(d.reviewGrund!, (byGrund.get(d.reviewGrund!) ?? 0) + 1);
const mitProdukt = out.filter((d) => d.produkte.length > 0).length;
const mitBereich = out.filter((d) => d.bereiche.length > 0).length;

console.log(`Stamm-Dokumente: ${out.length}`);
console.log(`  auto-gemappt (>=1 Produkt oder Bereich): ${auto.length}`);
console.log(`    mit Produkt: ${mitProdukt} | mit Bereich: ${mitBereich}`);
console.log(`  needsReview (Workflow-Input): ${review.length}`);
for (const [g, n] of byGrund) console.log(`    ${g}: ${n}`);
console.log(`  excluded (Presse/PR): ${excluded.length}`);
console.log(`\nGeschrieben: ${outPath.replace(ROOT + "/", "")}`);

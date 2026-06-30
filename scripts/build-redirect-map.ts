/**
 * #374 — 301-Redirect-Map Alt-korodur.de → neue Varianten-/Produkt-Slugs (Cutover).
 *
 * Quelle: docs/website-migration/extraktion-produkte.json (Alt-Site-Scrape, je
 *   Locale eigener Eintrag: de `/produkt/<slug>/`, en `/en/product/<slug>/`,
 *   fr `/fr/produit/<slug>/`). Ziel: neues Routing `/<lang>/produkte/<id>/`.
 *
 * Mapping: Alt-Slug == neue Produkt-ID (flacher Slug, meist 1:1). Abweichungen
 *   (FR-Sonderslugs, eingestellte Produkte → Nachfolger/Bereich) in OVERRIDES.
 *
 * Output (greift erst beim Cutover, daher in docs/, NICHT in public/):
 *   - docs/website-migration/redirect-map.csv   (host-agnostisch, volle Quell-URLs)
 *   - docs/website-migration/_redirects          (Cloudflare Pages / Netlify Drop-in)
 *   - docs/website-migration/redirect-map.report.md (Abdeckung + 10 Stichproben)
 *
 * Lauf: npx tsx scripts/build-redirect-map.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { produkte } from "../data/produkte";

type Loc = "de" | "en" | "fr";
const OLD_PREFIX: Record<Loc, string> = {
  de: "/produkt/",
  en: "/en/product/",
  fr: "/fr/produit/",
};

// Abweichungen Alt-Slug → neue Produkt-ID. Nur wo Slug != ID (gegen echte IDs
// in data/produkte.ts geprüft, nichts erfunden). Inkl. zusammengeführter Alt-
// Seiten (Kombi → repräsentatives Produkt) und FR-/EN-Sonderslugs.
const OVERRIDES: Record<string, string> = {
  // FR-/EN-Sonderslugs der Varianten
  "neodur-he-3-met-f": "neodur-he-3-metallisch", // FR
  "neodur-he-60-rapid-svs-3": "neodur-he-60-rapid", // FR-Variante → Mutter (noch nicht gesplittet)
  "neodur-he-60-rapid-svs-15-2": "neodur-he-60-rapid",
  "neodur-he-60-rapid-metallisch-2": "neodur-he-60-rapid",
  // Rechtschreib-/Sprach-Slugs
  "korodur-wh-special": "korodur-wh-spezial",
  "korodur-wh-metallic": "korodur-wh-metallisch",
  "korodur-diamond-concrete": "korodur-diamantbeton",
  "microtop-tw-2": "microtop-tw-02",
  "durop": "korodur-durop",
  "korodur-copetti-floor-kcf": "kcf",
  // Rapid-Set: Alt-Slug ohne Marken-Präfix
  "cement-all": "rapid-set-cement-all",
  "mortar-mix": "rapid-set-mortar-mix",
  "concrete-mix": "rapid-set-concrete-mix",
  "concrete-pharmacy": "rapid-set-concrete-pharmacy",
  "rapid-set-concrete": "rapid-set-schnellbeton",
  "levelflor": "rapid-set-levelflor",
  // Zusammengeführte Alt-Seiten → repräsentatives Produkt
  "neodur-he-40-und-he-40-8": "neodur-he-40",
  "neodur-msm-3-msm-5-msb-8": "neodur-msm-3",
  "neodur-vergussmoertel-beton": "neodur-vm-1",
  "neodur-grouting-mortar-concrete": "neodur-vm-1", // EN
  "mortiers-de-calage": "neodur-vm-1", // FR
  // VM basic (eigener Alt-Slug je Locale, teils „-kopie")
  "neodur-vergussmoertel-vm-basic": "neodur-vm-basic",
  "neodur-grouting-mortar-concrete-kopie": "neodur-vm-basic", // EN
  "neodur-mortiers-de-calage-kopie": "neodur-vm-basic", // FR
};
// Produktlose Alt-Seiten (kein Nachfolgerprodukt) → Bereichsseite als 301-Ziel.
const BEREICH_FALLBACK: Record<string, string> = {
  "korodur-silosystem": "industrieboden", // Liefersystem, kein eigenes Produkt
  "goodcat-silver-classic": "katzenstreu",
  "goodcat-golden-nature": "katzenstreu",
  "goodcat-organic-love": "katzenstreu",
};

interface AltEntry {
  title: string;
  slug: string;
  link: string;
}

function locOf(link: string): Loc | null {
  if (link.includes("/en/product/")) return "en";
  if (link.includes("/fr/produit/")) return "fr";
  if (link.includes("/produkt/")) return "de";
  return null;
}

const raw = JSON.parse(
  readFileSync("docs/website-migration/extraktion-produkte.json", "utf8"),
) as AltEntry[];

const ids = new Set(produkte.map((p) => p.id));

type Row = {
  loc: Loc;
  source: string;
  target: string;
  status: number;
  art: "variante" | "produkt" | "eingestellt";
  note: string;
};
const rows: Row[] = [];
const unmatched: AltEntry[] = [];

for (const e of raw) {
  const loc = locOf(e.link);
  if (!loc) continue;
  const source = `${OLD_PREFIX[loc]}${e.slug}/`;
  let target: string | null = null;
  let art: Row["art"] = "produkt";
  let note = "";

  const mappedId = OVERRIDES[e.slug] ?? e.slug;
  if (ids.has(mappedId)) {
    target = `/${loc}/produkte/${mappedId}/`;
    const p = produkte.find((x) => x.id === mappedId);
    if (p?.variantenGruppe) art = "variante";
    if (OVERRIDES[e.slug]) note = `Alt-Slug abweichend (${e.slug})`;
  } else if (BEREICH_FALLBACK[e.slug]) {
    target = `/${loc}/bereiche/${BEREICH_FALLBACK[e.slug]}/`;
    art = "eingestellt";
    note = "kein Produkt mehr → Bereichsseite";
  }

  if (!target) {
    unmatched.push(e);
    continue;
  }
  rows.push({ loc, source, target, status: 301, art, note });
}

rows.sort((a, b) => a.source.localeCompare(b.source));

// --- CSV (host-agnostisch) ---
const csv = [
  "source,target,status,art,note",
  ...rows.map((r) => `${r.source},${r.target},${r.status},${r.art},${r.note}`),
].join("\n");
writeFileSync("docs/website-migration/redirect-map.csv", csv + "\n");

// --- _redirects (Cloudflare Pages / Netlify) ---
const redir = [
  "# KORODUR Cutover-Redirects (Alt-korodur.de → neue Produkt-Slugs), #374",
  "# Format: <source> <target> <status>. Beim Cutover ins Webroot des Ziel-Hostings.",
  ...rows.map((r) => `${r.source} ${r.target} ${r.status}`),
].join("\n");
writeFileSync("docs/website-migration/_redirects", redir + "\n");

// --- Report ---
const proLoc = (l: Loc) => rows.filter((r) => r.loc === l).length;
const varianten = rows.filter((r) => r.art === "variante");
const eingestellt = rows.filter((r) => r.art === "eingestellt");
const stichprobe = [
  "/produkt/neodur-he-65-metallisch/",
  "/fr/produit/neodur-he-3-met-f/",
  "/en/product/neodur-he-65-plus-svs-3/",
  "/produkt/neodur-he-3-green/",
  "/fr/produit/neodur-he-65-metallisch/",
  "/en/product/neodur-he-3-svs-15/",
  "/produkt/neodur-he-65/",
  "/produkt/durop/",
  "/en/product/korocrete/",
  "/produkt/korodur-silosystem/",
]
  .map((s) => {
    const r = rows.find((x) => x.source === s);
    return `| \`${s}\` | ${r ? "`" + r.target + "` (" + r.status + ", " + r.art + ")" : "**FEHLT**"} |`;
  })
  .join("\n");

const report = `# Redirect-Map Alt-korodur.de → neue Slugs (#374)

Generiert von \`scripts/build-redirect-map.ts\` aus \`extraktion-produkte.json\`. **Greift erst beim Cutover.**

## Abdeckung

- Redirects gesamt: **${rows.length}** (de ${proLoc("de")} · en ${proLoc("en")} · fr ${proLoc("fr")})
- davon Varianten-PDPs: **${varianten.length}**
- eingestellte Produkte (→ Nachfolger/Bereich): **${eingestellt.length}**
- ohne Match (manuell prüfen): **${unmatched.length}**${unmatched.length ? "\n" + unmatched.map((u) => `  - [${locOf(u.link)}] \`${u.slug}\` — ${u.title}`).join("\n") : ""}

## Stichprobe (10 reale Alt-URLs → Ziel)

| Alt-URL | Ziel |
| :-- | :-- |
${stichprobe}

## Cutover-Hinweis

- **Cloudflare Pages / Netlify:** \`_redirects\` ins Webroot.
- **Cloudflare Bulk Redirects:** \`redirect-map.csv\` (Spalten source/target/status) importieren.
- Pfade sind domain-relativ (ohne basePath) — passend für den Ziel-Host, nicht für GitHub Pages.
- pl/es: Alt-Site hatte nur de/en/fr — keine Redirects nötig.
`;
writeFileSync("docs/website-migration/redirect-map.report.md", report);

console.log(`Redirects: ${rows.length} (de ${proLoc("de")} · en ${proLoc("en")} · fr ${proLoc("fr")})`);
console.log(`Varianten: ${varianten.length} · eingestellt: ${eingestellt.length} · ohne Match: ${unmatched.length}`);
if (unmatched.length) {
  console.log("\nOhne Match:");
  for (const u of unmatched) console.log(`  [${locOf(u.link)}] ${u.slug} — ${u.title}`);
}

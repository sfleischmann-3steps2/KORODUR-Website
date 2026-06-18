import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Liest die Fachartikel-Entwürfe unter content/<kategorie>/<slug>.mdx (Build-Zeit,
// Static Export). Slug = Dateiname ohne .mdx (kanonisch, ASCII). Interne
// Reviewer-Marker (TODO(Frank)) werden für die Kundenansicht entfernt.

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ArtikelFrontmatter {
  title: string;
  slug?: string;
  typ?: string;
  zielgruppe?: string;
  ebene?: string;
  stufe?: string;
  reviewer?: string;
  /** #170: Slugs echter Referenzen, die als Praxis-Teaser unter dem Artikel
   *  eingebunden werden (ReferenceCard). Quelle: die im Text genannten Projekte. */
  referenzen?: string[];
  [key: string]: unknown;
}

export interface Artikel {
  slug: string;
  frontmatter: ArtikelFrontmatter;
  /** Markdown-Body, bereinigt (TODO(Frank) entfernt, führende H1 entfernt). */
  body: string;
}

/** Entfernt interne Reviewer-Marker und die führende H1 (Titel wird separat gerendert). */
function bereinige(body: string): string {
  const zeilen = body.split("\n");
  const out: string[] = [];
  let h1Weg = false;
  for (const zeile of zeilen) {
    const t = zeile.trim();
    // Blockquote-Zeilen mit TODO(Frank) (interne Notiz) komplett raus
    if (t.startsWith(">") && t.includes("TODO(Frank)")) continue;
    // führende H1 einmalig überspringen (== Frontmatter-Titel)
    if (!h1Weg && t.startsWith("# ")) {
      h1Weg = true;
      continue;
    }
    out.push(zeile);
  }
  // Inline-TODO(Frank)-Marker aus der Kundenansicht entfernen (auch als Tabellenzelle)
  return out.join("\n").replace(/ ?TODO\(Frank\)/g, "").trim();
}

export function getArtikel(kategorie: string, slug: string): Artikel | null {
  const datei = path.join(CONTENT_DIR, kategorie, `${slug}.mdx`);
  if (!fs.existsSync(datei)) return null;
  const { data, content } = matter(fs.readFileSync(datei, "utf8"));
  return { slug, frontmatter: data as ArtikelFrontmatter, body: bereinige(content) };
}

/** Ersten aussagekraeftigen Absatz aus dem (bereinigten) Markdown-Body ziehen,
 *  Markdown-Reste strippen, auf ~160 Zeichen kuerzen. Reiner Navigations-Teaser
 *  aus dem Artikel selbst, keine erfundene Copy. */
export function teaser(body: string): string {
  for (const block of body.split(/\n\s*\n/)) {
    const t = block.trim();
    if (!t) continue;
    // Ueberschriften, Tabellen, Zitate, Listen, Links/HTML ueberspringen
    if (/^[#|>\-[<]/.test(t)) continue;
    const clean = t
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/\[(.+?)\]\([^)]*\)/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    if (clean.length < 30) continue;
    return clean.length > 160 ? `${clean.slice(0, 159).trimEnd()}…` : clean;
  }
  return "";
}

export function getSlugs(kategorie: string, exclude: string[] = []): string[] {
  const dir = path.join(CONTENT_DIR, kategorie);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .filter((s) => !exclude.includes(s))
    .sort();
}

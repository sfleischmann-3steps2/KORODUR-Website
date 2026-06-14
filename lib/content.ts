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

import type { Produktbereich } from "./types";

// === Website-Integration: Bereichs-Definitionen (Stufe 1, 2026-06-11) ===
// Plan: docs/plans/2026-06-11-website-integration-plan.md
// Reihenfolge freigegeben (Steffi, Mockup-Review 2026-06-11).
// Lokalisierte Texte (name/teaser/intro) liegen in den Dictionaries unter
// `bereiche.<slug>_name|_teaser|_intro` — hier nur Struktur und Flags.

export interface Bereich {
  slug: Produktbereich;
  /** Externe Bereichs-Website (Parallelbetrieb bis Cutover-Entscheidung Stufe 5). */
  externeWebsite?: string;
  /** Rapid Set: Vertrieb ausschließlich über Fachhandel (Review-Entscheidung #5). */
  haendlerHinweis?: boolean;
  /** Katzenstreu: eigener Geschäftsbereich, optisch abgegrenzt (Review-Entscheidung). */
  abgegrenzt?: boolean;
  /** Geordnete Produktgruppen-Keys für die Bereichsseiten-Gliederung.
   *  Labels in den Dictionaries unter `bereiche.gruppe_<key>`.
   *  Kuratiert mit Sign-off: docs/website-migration/zuordnung-<bereich>.md */
  produktgruppen?: string[];
}

export const bereiche: Bereich[] = [
  {
    slug: "industrieboden",
    produktgruppen: [
      "hartstoffestriche",
      "hartstoffeinstreuung",
      "hartstoffe",
      "schnellestrich",
      "selbstverlaufend",
      "untergrund-haftbruecken",
      "nachbehandlung",
      "kunstharz-hartstoffe",
      "systeme",
    ],
  },
  { slug: "sichtestrich" },
  { slug: "schnellbetonsysteme" },
  { slug: "rapid-set", haendlerHinweis: true, externeWebsite: "https://www.korodur-rapidset.com" },
  { slug: "spezialbaustoffe" },
  { slug: "3d-concrete-printing", externeWebsite: "https://www.3d-concrete-printing.com" },
  { slug: "microtop" },
  { slug: "katzenstreu", abgegrenzt: true, externeWebsite: "https://www.goodcat.de" },
];

export function getBereichBySlug(slug: string): Bereich | undefined {
  return bereiche.find((b) => b.slug === slug);
}

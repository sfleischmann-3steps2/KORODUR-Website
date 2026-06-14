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
      "impraegnierung",
      "additive",
      "kunstharz-hartstoffe",
      "systeme",
    ],
  },
  {
    slug: "sichtestrich",
    produktgruppen: ["geschliffen", "geglaettet", "truazzo"],
  },
  { slug: "schnellbetonsysteme" },
  {
    slug: "rapid-set",
    haendlerHinweis: true,
    externeWebsite: "https://www.korodur-rapidset.com",
    produktgruppen: ["reparaturmoertel", "schnellbeton", "additive"],
  },
  {
    slug: "spezialbaustoffe",
    produktgruppen: ["verguss", "anker-injektion", "spritzmoertel", "pflasterfugen", "schnellbeton"],
  },
  { slug: "3d-concrete-printing", externeWebsite: "https://www.3d-concrete-printing.com" },
  {
    slug: "microtop",
    produktgruppen: ["trockenspritz", "nassspritz", "beschichtung-schutz"],
  },
  {
    slug: "katzenstreu",
    abgegrenzt: true,
    externeWebsite: "https://www.goodcat.de",
    // Variante B "neutral-reduziert" (Steffi, 2026-06-12). Highlights in
    // sattem Grün (Richtung Heidelberg-Materials-Grün) später nach Abklärung.
    produktgruppen: ["premium", "standard"],
  },
];

export function getBereichBySlug(slug: string): Bereich | undefined {
  return bereiche.find((b) => b.slug === slug);
}

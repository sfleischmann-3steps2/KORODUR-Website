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
  /** Bereichsbild (public/images/bereiche/<slug>.*, ohne basePath). Optional;
   *  wird per #141 (Hixfield) befüllt. Ohne Bild zeigt der Header das Icon-Band. */
  bild?: string;
  /** Geordnete Produktgruppen-Keys für die Bereichsseiten-Gliederung.
   *  Labels in den Dictionaries unter `bereiche.gruppe_<key>`.
   *  Kuratiert mit Sign-off: docs/website-migration/zuordnung-<bereich>.md */
  produktgruppen?: string[];
}

export const bereiche: Bereich[] = [
  {
    slug: "industrieboden",
    bild: "/images/bereiche/industrieboden.webp",
    // Rollen-sortiert (#93): zuerst alle Bodenprodukte, dann Haftbrücken/
    // Untergrund, dann Oberflächenfinish — kein Vermischen mehr.
    produktgruppen: [
      "hartstoffestriche",
      "hartstoffeinstreuung",
      "hartstoffe",
      "schnellestrich",
      "selbstverlaufend",
      "kunstharz-hartstoffe",
      "systeme",
      "additive",
      "untergrund-haftbruecken",
      "nachbehandlung",
      "impraegnierung",
    ],
  },
  {
    slug: "sichtestrich",
    bild: "/images/bereiche/sichtestrich.webp",
    produktgruppen: ["geschliffen", "geglaettet", "truazzo"],
  },
  { slug: "schnellbetonsysteme", bild: "/images/bereiche/schnellbetonsysteme.webp" },
  {
    slug: "rapid-set",
    bild: "/images/bereiche/rapid-set.webp",
    haendlerHinweis: true,
    produktgruppen: ["reparaturmoertel", "schnellbeton", "additive"],
  },
  {
    slug: "spezialbaustoffe",
    bild: "/images/bereiche/spezialbaustoffe.webp",
    produktgruppen: ["verguss", "anker-injektion", "spritzmoertel", "pflasterfugen", "schnellbeton"],
  },
  { slug: "3d-concrete-printing", bild: "/images/bereiche/3d-concrete-printing.webp" },
  {
    slug: "microtop",
    bild: "/images/bereiche/microtop.webp",
    produktgruppen: ["trockenspritz", "nassspritz", "beschichtung-schutz"],
  },
  {
    slug: "katzenstreu",
    bild: "/images/bereiche/katzenstreu.webp",
    abgegrenzt: true,
    // Variante B "neutral-reduziert" (Steffi, 2026-06-12). Highlights in
    // sattem Grün (Richtung Heidelberg-Materials-Grün) später nach Abklärung.
    produktgruppen: ["premium", "standard"],
  },
];

export function getBereichBySlug(slug: string): Bereich | undefined {
  return bereiche.find((b) => b.slug === slug);
}

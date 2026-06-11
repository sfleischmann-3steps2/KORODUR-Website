import { referenzen } from "@/data/referenzen";
import { produkte } from "@/data/produkte";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export interface SuchEintrag {
  type: "referenz" | "kategorie" | "produkt";
  title: string;
  subtitle: string;
  href: string;
}

/**
 * Baut den vollständigen Suchindex (Seiten, Referenzen, Produkte)
 * für eine Sprache auf. Reine Funktion, keine React-Abhängigkeit.
 */
export function baueSuchindex(lang: string, dict: Dictionary): SuchEintrag[] {
  const items: SuchEintrag[] = [];

  // Seiten
  items.push({
    type: "kategorie",
    title: dict.nav.loesungsfinder,
    subtitle: dict.home.finder_teaser_title,
    href: `/${lang}/loesungsfinder/`,
  });
  items.push({
    type: "kategorie",
    title: dict.nav.anwendungsmatrix,
    subtitle: dict.anwendungsmatrix.h1,
    href: `/${lang}/anwendungsmatrix/`,
  });

  // Referenzen
  referenzen.forEach((ref) => {
    items.push({
      type: "referenz",
      title: ref.titel,
      subtitle: `${ref.ort}, ${ref.land}`,
      href: `/${lang}/referenzen/${ref.slug}`,
    });
  });

  // Produkte
  produkte.forEach((prod) => {
    items.push({
      type: "produkt",
      title: prod.name,
      subtitle: prod.kurzbeschreibung.slice(0, 80),
      href: `/${lang}/produkte/${prod.id}`,
    });
  });

  return items;
}

/**
 * Filtert den Suchindex per Substring-Match auf Titel/Untertitel
 * (case-insensitive) und begrenzt auf `limit` Treffer.
 * Ranking-Verhalten identisch zur bisherigen Inline-Logik im SearchOverlay.
 */
export function filtereSuchindex(
  items: SuchEintrag[],
  query: string,
  limit = 8
): SuchEintrag[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return items
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    )
    .slice(0, limit);
}

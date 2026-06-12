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
 * Trennzeichen-insensitive Normalisierung: "HE3", "he-3" und "HE 3" sollen
 * dasselbe finden (Kunden-Feedback Steffi, 2026-06-12 — viele suchen
 * Produktnamen ohne Leerzeichen). Entfernt Leerraum, Binde-/Schrägstriche
 * und Punkte/Kommas.
 */
function normalisiere(s: string): string {
  return s.toLowerCase().replace(/[\s\-/.,]+/g, "");
}

/**
 * Filtert den Suchindex per Substring-Match auf Titel/Untertitel
 * (case-insensitive), zusätzlich trennzeichen-insensitiv ("HE3" → "HE 3"),
 * und begrenzt auf `limit` Treffer. Exakte Substring-Treffer ranken vor
 * rein normalisierten Treffern.
 */
export function filtereSuchindex(
  items: SuchEintrag[],
  query: string,
  limit = 8
): SuchEintrag[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const qNorm = normalisiere(query);

  const exakt: SuchEintrag[] = [];
  const normalisiert: SuchEintrag[] = [];
  for (const item of items) {
    if (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q)
    ) {
      exakt.push(item);
    } else if (
      qNorm.length > 0 &&
      (normalisiere(item.title).includes(qNorm) ||
        normalisiere(item.subtitle).includes(qNorm))
    ) {
      normalisiert.push(item);
    }
  }
  return [...exakt, ...normalisiert].slice(0, limit);
}

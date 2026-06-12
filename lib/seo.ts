import { basePath } from "./basePath";
import { LOCALES } from "./i18n";

// Kanonische Site-URL zur Build-Zeit (Launch-Plan M2):
// GitHub Pages setzt die Pages-Origin im Workflow, der Cutover-Build setzt
// https://www.korodur.de. Default = Zieldomain, damit ein Build ohne Env
// bereits die finale Konfiguration ergibt.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.korodur.de";

/** Absolute URL für canonical/hreflang/Sitemap: Origin + basePath + Pfad. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${basePath}${path}`;
}

/**
 * canonical + hreflang für eine sprachneutrale Route.
 * `path` ohne Sprachpräfix, mit trailing slash — z. B. "/" oder "/produkte/neodur-he-65/".
 * x-default zeigt auf DE (Basissprache).
 */
export function alternatesFor(lang: string, path: string) {
  return {
    canonical: absoluteUrl(`/${lang}${path}`),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(`/${l}${path}`)])),
      "x-default": absoluteUrl(`/de${path}`),
    },
  };
}

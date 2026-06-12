import type { MetadataRoute } from "next";
import { LOCALES } from "../lib/i18n";
import { absoluteUrl } from "../lib/seo";
import { produkte } from "../data/produkte";
import { referenzen } from "../data/referenzen";
import { bereiche } from "../data/bereiche";
import { isPublicReference } from "../data/referenceDetail";

// Pflicht bei output:"export" — Sitemap wird zur Build-Zeit erzeugt.
export const dynamic = "force-static";

// Sprachneutrale Routen; je Route entstehen 4 Einträge (de/en/fr/pl) mit
// hreflang-Alternates (Launch-Plan M2, SEO-Paket).
function statischeRouten(): string[] {
  return [
    "/",
    "/produkte/",
    "/referenzen/",
    "/loesungsfinder/",
    "/anwendungsmatrix/",
    "/sanierung/",
    "/unternehmen/",
    "/kontakt/",
    "/impressum/",
    "/datenschutz/",
    "/agb/",
    "/hinweisgebersystem/",
    "/downloads/",
    ...bereiche.map((b) => `/bereiche/${b.slug}/`),
    ...produkte.map((p) => `/produkte/${p.id}/`),
    ...referenzen.filter((r) => isPublicReference(r)).map((r) => `/referenzen/${r.slug}/`),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const eintraege: MetadataRoute.Sitemap = [];
  for (const path of statischeRouten()) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, absoluteUrl(`/${l}${path}`)])
    );
    for (const lang of LOCALES) {
      eintraege.push({
        url: absoluteUrl(`/${lang}${path}`),
        alternates: { languages: { ...languages, "x-default": absoluteUrl(`/de${path}`) } },
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : path.startsWith("/referenzen/") && path !== "/referenzen/" ? 0.6 : 0.8,
      });
    }
  }
  return eintraege;
}

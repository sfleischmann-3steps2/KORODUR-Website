import type { MetadataRoute } from "next";
import { withBasePath } from "../lib/basePath";

// Pflicht bei output:"export" — Manifest wird zur Build-Zeit erzeugt.
export const dynamic = "force-static";

// Ersetzt public/manifest.json: Die statische Datei hatte Pfade ohne basePath
// (Icon-404 auf jeder Seite unter GitHub Pages). Hier laufen start_url und
// Icons durch withBasePath und stimmen in beiden Deployments — GitHub Pages
// (mit basePath) und eigene Domain im Root (Cutover). Launch-Plan M1.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KORODUR | Industrieböden und Spezialbaustoffe",
    short_name: "KORODUR",
    description:
      "Mineralische Hartstoffe, Industrieböden, Sichtestriche und Spezialbaustoffe. Seit 1936, weltweit bewährt.",
    start_url: withBasePath("/de/"),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#002d59",
    orientation: "any",
    icons: [
      {
        src: withBasePath("/icons/icon-192.svg"),
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: withBasePath("/icons/icon-512.svg"),
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}

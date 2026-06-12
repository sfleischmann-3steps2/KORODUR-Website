import RedirectToLocale from "../components/RedirectToLocale";
import { withBasePath } from "../lib/basePath";

// Domain-Root: leitet auf /de/ weiter. Dreifach abgesichert (Launch-Plan M2):
// JS-Redirect (RedirectToLocale), Meta-Refresh für Clients ohne JS und ein
// sichtbarer Link für Crawler/Edge-Cases. Beim Cutover kommt zusätzlich ein
// serverseitiger Redirect (.htaccess) davor — dieser Fallback bleibt.
export default function RootPage() {
  const target = withBasePath("/de/");
  return (
    <html lang="de">
      <head>
        <title>KORODUR | Industrieböden und Spezialbaustoffe</title>
        <meta httpEquiv="refresh" content={`1;url=${target}`} />
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            "Gabarito, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#002d59",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RedirectToLocale />
        <p style={{ fontSize: 15 }}>
          <a href={target} style={{ color: "#009ee3", fontWeight: 700 }}>
            Weiter zu KORODUR (deutsch) →
          </a>
        </p>
      </body>
    </html>
  );
}

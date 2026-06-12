import Image from "next/image";
import { withBasePath } from "../lib/basePath";

// Statische 404 für den gesamten Export (out/404.html, von GitHub Pages bzw.
// dem Hoster für jede unbekannte URL ausgeliefert). Liegt außerhalb des
// [lang]-Segments und rendert deshalb ein eigenes <html> — DE als Basis,
// EN-Zweitzeile, Links auf die wichtigsten Einstiege (Launch-Plan M2).
export default function NotFound() {
  const links = [
    { href: withBasePath("/de/"), label: "Startseite" },
    { href: withBasePath("/de/produkte/"), label: "Produkte" },
    { href: withBasePath("/de/loesungsfinder/"), label: "Lösungsfinder" },
    { href: withBasePath("/de/referenzen/"), label: "Referenzen" },
    { href: withBasePath("/de/kontakt/"), label: "Kontakt" },
  ];
  return (
    <html lang="de">
      <head>
        <title>Seite nicht gefunden | KORODUR</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            "Gabarito, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#ffffff",
          color: "#002d59",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <main style={{ maxWidth: 560, textAlign: "center" }}>
          <Image
            src={withBasePath("/images/korodur-logo-full-colour.png")}
            alt="KORODUR"
            width={180}
            height={48}
            style={{ objectFit: "contain", marginBottom: 32 }}
          />
          <p
            style={{
              color: "#009ee3",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.15, margin: "0 0 12px" }}>
            Diese Seite gibt es nicht (mehr).
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, margin: "0 0 8px" }}>
            Die Adresse ist veraltet oder wurde verschoben. Hier geht es weiter:
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.55, margin: "0 0 28px" }}>
            This page does not exist. The address may be outdated — please use one of the links
            below.
          </p>
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  display: "inline-block",
                  padding: "12px 22px",
                  borderRadius: 6,
                  background: l.label === "Startseite" ? "#009ee3" : "transparent",
                  border: l.label === "Startseite" ? "none" : "1.5px solid #002d59",
                  color: l.label === "Startseite" ? "#ffffff" : "#002d59",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}

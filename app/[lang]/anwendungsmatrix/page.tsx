import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "../dictionaries";
import Anwendungsmatrix from "../../../components/Anwendungsmatrix";
import type { Locale } from "../../../lib/i18n";

export const metadata: Metadata = {
  title: "Anwendungsmatrix Sanierung",
  description:
    "Alternative Bedarfsmatrix für KORODUR-Sanierungsprodukte nach Einsatzfällen wie Industrieboden, Parken, Verkehr, WHG, Sichtboden und Reparatur.",
};

const NAVY = "#002d59";
const NAVY_72 = "rgba(0, 45, 89, 0.72)";
const CYAN = "#009ee3";
const BG_SOFT = "#eef1f5";
const LINE = "#e8edf5";

export default async function AnwendungsmatrixPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <section style={{ padding: "32px 24px 64px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <header style={{ marginBottom: 26 }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 9px",
              borderRadius: 5,
              background: BG_SOFT,
              color: NAVY_72,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Anwendungsmatrix
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: "1 1 620px", minWidth: 0 }}>
              <h1
                style={{
                  fontSize: 42,
                  lineHeight: 1.05,
                  fontWeight: 900,
                  color: NAVY,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  maxWidth: 820,
                }}
              >
                Welche Produkte passen zu Ihrem Sanierungsbedarf?
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: 10,
                flex: "0 1 360px",
              }}
            >
              <Link
                href={`/${lang}/produktmatrix/`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 42,
                  padding: "0 16px",
                  borderRadius: 8,
                  border: `1px solid ${LINE}`,
                  color: NAVY,
                  background: "#fff",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                Technische Matrix
              </Link>
              <Link
                href={`/${lang}/anwendungsmatrix/`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 42,
                  padding: "0 16px",
                  borderRadius: 8,
                  color: "#fff",
                  background: CYAN,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                Anwendungsmatrix
              </Link>
            </div>
          </div>
        </header>

        <Anwendungsmatrix lang={lang as Locale} />

        <div
          style={{
            background: BG_SOFT,
            borderRadius: 14,
            marginTop: 56,
            padding: 32,
            textAlign: "center",
          }}
        >
          <p style={{ color: NAVY, fontSize: 18, marginBottom: 20 }}>
            Unsicher? Der Lösungsfinder führt Sie in wenigen Schritten zur passenden Lösung – oder
            sprechen Sie direkt mit unseren Beratern.
          </p>
          <div
            style={{
              display: "inline-flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href={`/${lang}/loesungsfinder/`}
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: CYAN,
                color: "#fff",
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              Lösungsfinder starten
            </Link>
            <a
              href="https://www.korodur.de/kontakt.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "#fff",
                color: NAVY,
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 15,
                border: `1.5px solid ${NAVY}`,
              }}
            >
              Kontakt zu unseren Beratern
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

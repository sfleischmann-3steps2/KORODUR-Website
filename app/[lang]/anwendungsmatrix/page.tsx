import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import Anwendungsmatrix from "../../../components/Anwendungsmatrix";
import type { Locale } from "../../../lib/i18n";
import { alternatesFor } from "../../../lib/seo";

type Dict = Record<string, string>;
const t = (dict: Dict | undefined, key: string, fallback: string) => dict?.[key] ?? fallback;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const m = (dict as unknown as { anwendungsmatrix?: Dict }).anwendungsmatrix;
  return {
    title: dict.nav.anwendungsmatrix,
    description: t(
      m,
      "meta_description",
      "Anwendungsmatrix für KORODUR-Sanierungsprodukte: Einsatzfälle wie Industrieboden, Parkdeck, Verkehr, WHG, Sichtboden und Reparatur, mit technischen Daten und Datenblättern."
    ),
    alternates: alternatesFor(lang, "/anwendungsmatrix/"),
  };
}

const NAVY = "var(--navy)";
const NAVY_72 = "rgba(0, 45, 89, 0.72)";
const CYAN = "var(--cyan)";
const BG_SOFT = "#eef1f5";

export default async function AnwendungsmatrixPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const rawDict = await getDictionary(lang);
  const dict: Dict | undefined = (rawDict as unknown as { anwendungsmatrix?: Dict }).anwendungsmatrix;

  // Text-Header-Standard (#297): horizontal 32px (vorher 24px → Versatz), Top 48px (ohne Breadcrumb).
  return (
    <section style={{ padding: "48px 32px 64px" }}>
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
            {t(dict, "badge", "Anwendungsmatrix")}
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              lineHeight: 1.05,
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 820,
            }}
          >
            {t(dict, "h1", "Welche Produkte passen zu Ihrem Sanierungsbedarf?")}
          </h1>
        </header>

        <Anwendungsmatrix lang={lang as Locale} dict={dict} />

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
            {t(
              dict,
              "cta_text",
              "Unsicher? Der Lösungsfinder führt Sie in wenigen Schritten zur passenden Lösung – oder sprechen Sie direkt mit unseren Beratern.",
            )}
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
                color: "var(--white)",
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              {t(dict, "cta_loesungsfinder", "Lösungsfinder starten")}
            </Link>
            <Link
              href={`/${lang}/kontakt/`}
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "var(--white)",
                color: NAVY,
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 15,
                border: `1.5px solid ${NAVY}`,
              }}
            >
              {t(dict, "cta_kontakt", "Kontakt zu unseren Beratern")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Produktmatrix from "../../../components/Produktmatrix";
import { produkte } from "../../../data/produkte";
import { localizeProdukte } from "../../../data/i18n/getLocalized";
import type { Locale } from "../../../lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technische Matrix Sanierung",
  description:
    "Technische Matrix für KORODUR-Sanierungsprodukte mit Klassifizierung, Belastbarkeit, Schichtdicke, Belastbar-nach-Zeit und TDS.",
};

const NAVY = "#002d59";
const NAVY_72 = "rgba(0, 45, 89, 0.72)";
const NAVY_40 = "rgba(0, 45, 89, 0.40)";
const CYAN = "#009ee3";
const LINE = "#e8edf5";
const BG_SOFT = "#eef1f5";

type Dict = Record<string, string>;

function tx(dict: Dict | undefined, key: string, fallback: string): string {
  return dict?.[key] ?? fallback;
}

function ScaleDots({ filled }: { filled: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: n <= filled ? CYAN : LINE,
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

function Dot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: CYAN,
      }}
    />
  );
}

export default async function ProduktmatrixPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const rawDict = await getDictionary(lang);
  const dict: Dict | undefined = (rawDict as unknown as { produktmatrix?: Dict }).produktmatrix;

  const matrixProdukte = produkte.filter((p) => p.inSanierungsMatrix === true);
  const localizedProdukte = await localizeProdukte(matrixProdukte, lang as "de" | "en" | "fr" | "pl");

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
            Technische Matrix
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
                  color: "#fff",
                  background: CYAN,
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
                  border: `1px solid ${LINE}`,
                  color: NAVY,
                  background: "#fff",
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

        <Produktmatrix produkte={localizedProdukte} lang={lang as Locale} dict={dict} />

        <section
          style={{
            marginTop: 24,
            background: BG_SOFT,
            borderRadius: 14,
            padding: "22px 28px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr 1fr 1fr",
              gap: 32,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 12 }}>
                {tx(dict, "spalte_aussen", "Außen")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: NAVY_72,
                  marginBottom: 8,
                }}
              >
                <Dot /> {tx(dict, "legende_aussen", "außenbereich-tauglich")}
              </div>
              <div style={{ marginLeft: 24, color: NAVY_40, fontSize: 12 }}>
                {tx(dict, "legende_aussen_leer", "leer = nur Innenanwendung")}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 12 }}>
                {tx(dict, "spalte_belastbarkeit", "Belastbarkeit")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: NAVY_72,
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}
              >
                <ScaleDots filled={5} />
                {tx(dict, "legende_stufe5", "Höchste Last (Hartstoff DIN 1100 A · Verkehrsflächen-Norm)")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: NAVY_72,
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}
              >
                <ScaleDots filled={4} />
                {tx(dict, "legende_stufe4", "Sehr hohe Last (Hartstoff-Niveau, Beton C45+)")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: NAVY_72,
                  lineHeight: 1.4,
                }}
              >
                <ScaleDots filled={3} />
                {tx(dict, "legende_stufe3", "Hohe Last (Reparaturmörtel C35+, Industrie)")}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 12 }}>
                {tx(dict, "spalte_schichtdicke", "Schichtdicke")}
              </div>
              <div style={{ fontSize: 13, color: NAVY_72, lineHeight: 1.5 }}>
                {tx(
                  dict,
                  "legende_schichtdicke",
                  "Empfohlener Sanierungs-Anwendungsbereich pro Lage. Werte aus den aktuellen Technischen Datenblättern."
                )}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 12 }}>
                {tx(dict, "spalte_belastbar_nach", "Belastbar nach")}
              </div>
              <div style={{ fontSize: 13, color: NAVY_72, lineHeight: 1.5 }}>
                {tx(
                  dict,
                  "legende_belastbar_nach",
                  "Voll belastbar bzw. Verkehrsfreigabe ab Einbau-Ende. Bei Hartstoffestrichen klassisch 3 Tage nach DIN 18560-7."
                )}
              </div>
            </div>
          </div>
        </section>

        <div
          style={{
            marginTop: 56,
            background: BG_SOFT,
            borderRadius: 14,
            padding: 32,
            textAlign: "center",
          }}
        >
          <p style={{ color: NAVY, fontSize: 18, marginBottom: 20 }}>
            {tx(
              dict,
              "cta_text",
              "Unsicher? Der Lösungsfinder führt Sie in wenigen Schritten zur passenden Lösung – oder sprechen Sie direkt mit unseren Beratern."
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
                color: "#fff",
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              {tx(dict, "cta_loesungsfinder", "Lösungsfinder starten")}
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
              {tx(dict, "cta_kontakt", "Kontakt zu unseren Beratern")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

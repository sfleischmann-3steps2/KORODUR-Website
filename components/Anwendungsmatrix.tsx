import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import {
  anwendungMatrixProducts,
  anwendungUsecases,
  type Cell,
  type Mark,
  type ProductLink,
  type SpeedTier,
} from "@/data/anwendungsmatrix";
import { produkte } from "@/data/produkte";

const NAVY = "#002d59";
const CYAN = "#009ee3";
const GREEN = "#009a44";
const LINE = "#dfe7f1";
const HEAD_BG = "#eaf8fe";
const TECH_BG = "#fbfcfe";
const VORTEIL_BG = "#eef9ff";

type Dict = Record<string, string>;

function t(dict: Dict | undefined, key: string, fallback: string): string {
  return dict?.[key] ?? fallback;
}

function cell(dict: Dict | undefined, value: Cell): string {
  return typeof value === "string" ? value : t(dict, value.key, value.de);
}

const produktTdsUrls = new Map(produkte.map((p) => [p.id, p.tdsUrl]));

const speedStyles: Record<SpeedTier, CSSProperties> = {
  ultra: { background: "#ffd84d", color: NAVY, boxShadow: "0 0 0 3px rgba(255,216,77,.26)" },
  veryFast: { background: "#ffe47a", color: NAVY },
  fast: { background: "rgba(255,216,77,.48)", color: NAVY },
  day: { background: "#fff", color: NAVY, border: "2px solid rgba(255,216,77,.82)" },
  normal: { background: "rgba(0,45,89,.07)", color: "rgba(0,45,89,.68)" },
};

function SpeedPill({ tier, label }: { tier: SpeedTier; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 62,
        height: 25,
        padding: "0 8px",
        borderRadius: 999,
        fontWeight: 900,
        fontSize: 12,
        ...speedStyles[tier],
      }}
    >
      {label}
    </span>
  );
}

function MarkCell({ mark, dict }: { mark: Mark; dict: Dict | undefined }) {
  if (mark === "none") return null;
  const isBest = mark === "best";
  return (
    <span
      aria-label={isBest ? t(dict, "legend_best", "Kernanwendung") : t(dict, "legend_yes", "geeignet")}
      style={{
        color: GREEN,
        fontWeight: 900,
        fontSize: 21,
        lineHeight: 1,
        letterSpacing: isBest ? "-1px" : undefined,
      }}
    >
      {isBest ? "✓✓" : "✓"}
    </span>
  );
}

function resolveLink(link: ProductLink): string | undefined {
  return link.kind === "tds" ? produktTdsUrls.get(link.productId) : link.url;
}

const td: CSSProperties = {
  border: `1px solid ${LINE}`,
  textAlign: "center",
  verticalAlign: "middle",
};

const labelCol: CSSProperties = {
  position: "sticky",
  left: 0,
  zIndex: 1,
};

export default function Anwendungsmatrix({
  lang,
  dict,
}: {
  lang: Locale;
  dict?: Dict;
}) {
  void lang;
  return (
    <div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: 12 }}>
        <table
          style={{
            borderCollapse: "collapse",
            tableLayout: "fixed",
            width: "100%",
            minWidth: 980,
            color: NAVY,
            fontSize: 13,
          }}
        >
          <colgroup>
            <col style={{ width: 220 }} />
            {anwendungMatrixProducts.map((p) => (
              <col key={p.id} style={{ width: 132 }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th
                style={{
                  ...td,
                  ...labelCol,
                  background: NAVY,
                  color: "#fff",
                  textAlign: "left",
                  padding: "9px 14px",
                  fontSize: 13,
                }}
              >
                {t(dict, "corner_produkt", "Produkt")}
              </th>
              {anwendungMatrixProducts.map((p) => {
                const href = resolveLink(p.link);
                return (
                  <th
                    key={p.id}
                    style={{
                      ...td,
                      background: HEAD_BG,
                      borderBottom: `2px solid ${CYAN}`,
                      padding: "8px 7px 9px",
                      verticalAlign: "top",
                      height: 0, // erlaubt height:100% des Inhalts → Link bündig unten
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        gap: 5,
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.15 }}>
                        {p.name}
                      </span>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            marginTop: "auto",
                            color: CYAN,
                            fontSize: 11,
                            fontWeight: 800,
                            textDecoration: "none",
                          }}
                        >
                          {t(dict, "link_more", "Mehr Infos")} ↗
                        </a>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* Tech-Zeilen */}
            <TechRow
              label={t(dict, "row_klassifizierung", "Klassifizierung")}
              values={anwendungMatrixProducts.map((p) => cell(dict, p.klassifizierung))}
            />
            <TechRow
              label={t(dict, "row_schichtdicke", "Schichtdicke")}
              values={anwendungMatrixProducts.map((p) => cell(dict, p.schichtdicke))}
            />
            <tr>
              <td style={{ ...td, ...labelCol, ...techLabelStyle }}>
                {t(dict, "row_belastbar", "belastbar nach")}
              </td>
              {anwendungMatrixProducts.map((p) => (
                <td key={p.id} style={{ ...td, background: TECH_BG, padding: "5px 7px" }}>
                  <SpeedPill tier={p.speed} label={cell(dict, p.belastbarNach)} />
                </td>
              ))}
            </tr>
            {/* Vorteil-Zeile */}
            <tr>
              <td
                style={{
                  ...td,
                  ...labelCol,
                  background: CYAN,
                  color: "#fff",
                  textAlign: "left",
                  padding: "7px 14px",
                  fontWeight: 900,
                }}
              >
                {t(dict, "row_vorteil", "Vorteil")}
              </td>
              {anwendungMatrixProducts.map((p) => (
                <td
                  key={p.id}
                  style={{
                    ...td,
                    background: VORTEIL_BG,
                    color: NAVY,
                    fontWeight: 800,
                    padding: "7px",
                  }}
                >
                  {t(dict, p.vorteil.key, p.vorteil.de)}
                </td>
              ))}
            </tr>
            {/* Trenner */}
            <tr>
              <td
                colSpan={anwendungMatrixProducts.length + 1}
                style={{
                  ...td,
                  background: NAVY,
                  color: "#fff",
                  textAlign: "left",
                  padding: "7px 14px",
                  fontWeight: 900,
                }}
              >
                {t(dict, "divider_anwendungen", "Anwendungen")}
              </td>
            </tr>
            {/* Anwendungs-Zeilen */}
            {anwendungUsecases.map((row, idx) => (
              <tr key={row.key} style={{ background: idx % 2 === 1 ? TECH_BG : undefined }}>
                <td
                  style={{
                    ...td,
                    ...labelCol,
                    background: idx % 2 === 1 ? TECH_BG : "#fff",
                    textAlign: "left",
                    padding: "8px 14px",
                    fontWeight: 900,
                    lineHeight: 1.2,
                  }}
                >
                  {t(dict, row.key, row.de)}
                </td>
                {row.marks.map((mark, i) => (
                  <td key={anwendungMatrixProducts[i].id} style={{ ...td, height: 34, padding: "6px 7px" }}>
                    <MarkCell mark={mark} dict={dict} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* dezente Legende unter der Tabelle */}
      <p
        style={{
          margin: "10px 2px 0",
          color: "rgba(0,45,89,.5)",
          fontSize: 12,
          display: "flex",
          flexWrap: "wrap",
          gap: "2px 16px",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: GREEN, fontWeight: 900, letterSpacing: "-1px" }}>✓✓</span>
          {t(dict, "legend_best", "Kernanwendung")}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: GREEN, fontWeight: 900 }}>✓</span>
          {t(dict, "legend_yes", "geeignet")}
        </span>
      </p>
    </div>
  );
}

const techLabelStyle: CSSProperties = {
  background: "#fff",
  textAlign: "left",
  fontWeight: 900,
  color: "rgba(0,45,89,.78)",
  padding: "5px 14px",
};

function TechRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <td style={{ ...td, ...labelCol, ...techLabelStyle }}>{label}</td>
      {values.map((value, i) => (
        <td
          key={anwendungMatrixProducts[i].id}
          style={{ ...td, background: TECH_BG, fontWeight: 800, padding: "5px 7px" }}
        >
          {value}
        </td>
      ))}
    </tr>
  );
}

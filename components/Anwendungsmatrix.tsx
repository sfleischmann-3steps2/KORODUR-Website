import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import {
  anwendungColumns,
  anwendungMatrixProducts,
  type AnwendungStatus,
} from "@/data/anwendungsmatrix";
import { produkte } from "@/data/produkte";

const NAVY = "#002d59";
const NAVY_72 = "rgba(0, 45, 89, 0.72)";
const NAVY_56 = "rgba(0, 45, 89, 0.56)";
const NAVY_20 = "rgba(0, 45, 89, 0.20)";
const CYAN = "#009ee3";
const LINE = "#e8edf5";
const BG_SOFT = "#f4f6f9";
const BG_COOL = "#eef1f5";

const produktTdsUrls = new Map(produkte.map((produkt) => [produkt.id, produkt.tdsUrl]));

function Marker({ status }: { status: AnwendungStatus }) {
  if (status === "none") {
    return (
      <span
        aria-label="nicht vorgesehen"
        style={{
          color: NAVY_20,
          fontSize: 22,
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        –
      </span>
    );
  }

  const isCore = status === "core";

  return (
    <span
      aria-label={isCore ? "Kernanwendung" : "geeignet oder sekundär"}
      title={isCore ? "Kernanwendung" : "geeignet oder sekundär"}
      style={{
        display: "inline-block",
        width: isCore ? 12 : 11,
        height: isCore ? 12 : 11,
        borderRadius: "50%",
        background: isCore ? CYAN : "transparent",
        border: isCore ? `2px solid ${CYAN}` : `1.8px solid ${NAVY_56}`,
        boxSizing: "border-box",
      }}
    />
  );
}

function LegendItem({
  marker,
  label,
}: {
  marker: ReactNode;
  label: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: NAVY_72,
        fontSize: 13,
        lineHeight: 1.4,
      }}
    >
      {marker}
      {label}
    </span>
  );
}

export default function Anwendungsmatrix({ lang }: { lang: Locale }) {
  return (
    <div>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 18,
          marginBottom: 18,
          padding: "16px 18px",
          borderRadius: 10,
          background: BG_SOFT,
          border: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 22px",
          }}
        >
          <LegendItem marker={<Marker status="core" />} label="Kernanwendung im TDS explizit" />
          <LegendItem marker={<Marker status="secondary" />} label="geeignet oder sekundär" />
          <LegendItem marker={<Marker status="none" />} label="nicht vorgesehen" />
        </div>
      </section>

      <div
        style={{
          border: `1px solid ${LINE}`,
          borderRadius: 14,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table
            style={{
              width: "100%",
              minWidth: 980,
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "18px 22px 14px",
                    color: NAVY,
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    borderBottom: `2px solid ${NAVY}`,
                    width: 260,
                  }}
                >
                  Produkt
                </th>
                {anwendungColumns.map((column) => (
                  <th
                    key={column.id}
                    style={{
                      textAlign: "center",
                      padding: "18px 12px 14px",
                      color: NAVY,
                      fontSize: 13,
                      lineHeight: 1.25,
                      letterSpacing: "0.01em",
                      borderBottom: `2px solid ${NAVY}`,
                      width: 128,
                    }}
                  >
                    {column.label}
                  </th>
                ))}
                <th
                  style={{
                    textAlign: "center",
                    padding: "18px 12px 14px",
                    color: NAVY,
                    fontSize: 13,
                    lineHeight: 1.25,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    borderBottom: `2px solid ${NAVY}`,
                    width: 76,
                  }}
                >
                  TDS
                </th>
              </tr>
            </thead>
            <tbody>
              {anwendungMatrixProducts.map((product) => {
                const tdsUrl = produktTdsUrls.get(product.id);
                return (
                  <tr key={product.id}>
                    <td
                      style={{
                        padding: "18px 22px",
                        borderBottom: `1px solid ${LINE}`,
                        verticalAlign: "middle",
                      }}
                    >
                      <Link
                        href={`/${lang}/produkte/${product.id}/`}
                        style={{
                          display: "inline-block",
                          color: NAVY,
                          fontSize: 15,
                          lineHeight: 1.25,
                          fontWeight: 800,
                          textDecoration: "none",
                          marginBottom: 5,
                        }}
                      >
                        {product.name}
                      </Link>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 7px",
                            borderRadius: 4,
                            background: BG_COOL,
                            color: NAVY_72,
                            fontSize: 11,
                            fontWeight: 700,
                            lineHeight: 1.4,
                          }}
                        >
                          {product.family}
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: 7,
                          color: NAVY_56,
                          fontSize: 12,
                          lineHeight: 1.35,
                          fontWeight: 600,
                        }}
                      >
                        {product.role}
                      </div>
                    </td>
                    {anwendungColumns.map((column) => (
                      <td
                        key={column.id}
                        style={{
                          textAlign: "center",
                          padding: "18px 12px",
                          borderBottom: `1px solid ${LINE}`,
                          verticalAlign: "middle",
                        }}
                      >
                        <Marker status={product.applications[column.id]} />
                      </td>
                    ))}
                    <td
                      style={{
                        textAlign: "center",
                        padding: "18px 12px",
                        borderBottom: `1px solid ${LINE}`,
                        verticalAlign: "middle",
                      }}
                    >
                      {tdsUrl ? (
                        <a
                          href={tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${product.name} TDS herunterladen`}
                          title="TDS-Datenblatt herunterladen"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            color: CYAN,
                            textDecoration: "none",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </a>
                      ) : (
                        <Marker status="none" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <section
        style={{
          marginTop: 22,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 12,
        }}
      >
        {anwendungColumns.map((column) => (
          <article
            key={column.id}
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: 10,
              padding: "14px 16px",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "baseline",
                color: NAVY,
                marginBottom: 6,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 15, lineHeight: 1.25 }}>{column.label}</h2>
            </div>
            <p style={{ margin: 0, color: NAVY_72, fontSize: 13, lineHeight: 1.45 }}>
              {column.description}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Produkt } from "@/data/produkte";
import type { Locale } from "@/lib/i18n";

const NAVY = "#002d59";
const NAVY_72 = "rgba(0, 45, 89, 0.72)";
const NAVY_40 = "rgba(0, 45, 89, 0.40)";
const CYAN = "#009ee3";
const LINE = "#e8edf5";
const LINE_SOFT = "#f0f3f7";
const BG_SOFT = "#eef1f5";
const BG_COOL = "#f4f6f9";
const MUTED = "#94a3b8";

type KategorieId = "estrich" | "schnellzement";

type Dict = Record<string, string>;

function t(dict: Dict | undefined, key: string, fallback: string): string {
  return dict?.[key] ?? fallback;
}

function ScaleDots({ stufe }: { stufe: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span style={{ display: "inline-flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: n <= stufe ? CYAN : LINE,
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

function Dash() {
  return <span style={{ color: MUTED, fontSize: 16 }}>–</span>;
}

function Badge({ kind, dict }: { kind: "rapid" | "whg" | "sichtestrich" | "system"; dict?: Dict }) {
  const labels: Record<typeof kind, string> = {
    rapid: t(dict, "badge_rapid", "Rapid"),
    whg: t(dict, "badge_whg", "WHG"),
    sichtestrich: t(dict, "badge_sichtestrich", "Sichtestrich"),
    system: t(dict, "badge_system", "System"),
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 4,
        background: NAVY,
        color: "#fff",
        marginLeft: 6,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        verticalAlign: "middle",
      }}
    >
      {labels[kind]}
    </span>
  );
}

function getBadge(p: Produkt): "rapid" | "whg" | "sichtestrich" | "system" | null {
  if (p.systemProdukt) return "system";
  if (p.whgZulassung) return "whg";
  if (p.sichtestrich) return "sichtestrich";
  if (p.zeitKategorie === "schnell") return "rapid";
  return null;
}

function ProduktRow({ p, lang, dict }: { p: Produkt; lang: Locale; dict?: Dict }) {
  const badge = getBadge(p);

  return (
    <tr>
      <td
        style={{
          padding: "18px 20px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
          verticalAlign: "middle",
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <Link
            href={`/${lang}/produkte/${p.id}/`}
            style={{
              fontWeight: 800,
              color: NAVY,
              fontSize: 15,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              textDecoration: "none",
            }}
          >
            {p.name}
          </Link>
          {badge && <Badge kind={badge} dict={dict} />}
        </div>
        <div style={{ fontSize: 12, color: NAVY_72, lineHeight: 1.45 }}>
          {p.kurzbeschreibung}
        </div>
      </td>
      <td
        style={{
          padding: "18px 16px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
          verticalAlign: "middle",
        }}
      >
        {p.qualitaetsklasse ? (
          <span
            style={{
              display: "inline-block",
              padding: "2px 8px",
              background: BG_COOL,
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 600,
              color: NAVY,
              letterSpacing: "0.02em",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            {p.qualitaetsklasse}
          </span>
        ) : (
          <Dash />
        )}
        {p.norm && (
          <div
            style={{
              fontSize: 11,
              color: NAVY_72,
              marginTop: 4,
              lineHeight: 1.3,
            }}
          >
            {p.norm}
          </div>
        )}
      </td>
      <td
        style={{
          padding: "18px 16px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
          verticalAlign: "middle",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: NAVY,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {p.druckfestigkeit ?? "–"}
        </span>
      </td>
      <td
        style={{
          textAlign: "center",
          padding: "18px 12px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
        }}
      >
        {p.aussenbereich ? <Dot /> : <Dash />}
      </td>
      <td
        style={{
          textAlign: "center",
          padding: "18px 12px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
        }}
      >
        {p.belastbarkeitsStufe ? <ScaleDots stufe={p.belastbarkeitsStufe} /> : <Dash />}
      </td>
      <td
        style={{
          padding: "18px 20px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
          verticalAlign: "middle",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: NAVY, whiteSpace: "nowrap" }}>
          {p.schichtdicke ?? "–"}
        </span>
      </td>
      <td
        style={{
          padding: "18px 20px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
          verticalAlign: "middle",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: NAVY, whiteSpace: "nowrap" }}>
          {p.belastbarNach ?? "–"}
          {p.belastbarNachZusatz && (
            <small
              style={{
                display: "block",
                fontSize: 11,
                color: NAVY_40,
                fontWeight: 400,
                marginTop: 2,
                whiteSpace: "normal",
              }}
            >
              {p.belastbarNachZusatz}
            </small>
          )}
        </span>
      </td>
      <td
        style={{
          textAlign: "center",
          padding: "18px 12px 16px",
          borderBottom: `1px solid ${LINE_SOFT}`,
        }}
      >
        {p.tdsUrl ? (
          <a
            href={p.tdsUrl}
            target="_blank"
            rel="noopener noreferrer"
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
              transition: "background 120ms",
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
          <Dash />
        )}
      </td>
    </tr>
  );
}

function KategorieHeader({
  label,
  anzahl,
  produktLabel,
}: {
  label: string;
  anzahl: number;
  produktLabel: string;
}) {
  return (
    <tr>
      <td
        colSpan={8}
        style={{
          background: BG_SOFT,
          padding: "14px 20px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: NAVY,
          borderTop: `1px solid ${LINE}`,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        {label}
        <span
          style={{
            float: "right",
            fontWeight: 500,
            color: NAVY_40,
            fontSize: 11,
            letterSpacing: "0.04em",
            textTransform: "none",
          }}
        >
          {anzahl} {produktLabel}
        </span>
      </td>
    </tr>
  );
}

const KATEGORIEN: { id: KategorieId; labelKey: string; fallback: string }[] = [
  { id: "estrich", labelKey: "kategorie_industrieestriche", fallback: "Industrieestriche" },
  { id: "schnellzement", labelKey: "kategorie_schnellreparaturmoertel", fallback: "Schnellreparaturmörtel" },
];

export default function Produktmatrix({
  produkte: matrixProdukte,
  lang,
  dict,
}: {
  produkte: Produkt[];
  lang: Locale;
  dict?: Dict;
}) {
  const produktLabel = t(dict, "produkte_label", "Produkte");

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "left",
                  padding: "18px 20px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  minWidth: 240,
                }}
              >
                {t(dict, "spalte_produkt", "Produkt")}
              </th>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "left",
                  padding: "18px 16px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  width: 150,
                }}
              >
                {t(dict, "spalte_klassifizierung", "Klassifizierung")}
              </th>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "left",
                  padding: "18px 16px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  width: 110,
                }}
              >
                {t(dict, "spalte_druckfestigkeit", "Druckfestigkeit")}
              </th>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "center",
                  padding: "18px 12px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  width: 80,
                }}
              >
                {t(dict, "spalte_aussen", "Außen")}
              </th>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "center",
                  padding: "18px 12px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  width: 160,
                }}
              >
                {t(dict, "spalte_belastbarkeit", "Belastbarkeit")}
              </th>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "left",
                  padding: "18px 20px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  width: 170,
                }}
              >
                {t(dict, "spalte_schichtdicke", "Schichtdicke")}
              </th>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "left",
                  padding: "18px 20px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  width: 160,
                }}
              >
                {t(dict, "spalte_belastbar_nach", "Belastbar nach")}
              </th>
              <th
                style={{
                  background: "#fff",
                  color: NAVY,
                  textAlign: "center",
                  padding: "18px 12px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: `2px solid ${NAVY}`,
                  width: 70,
                }}
              >
                {t(dict, "spalte_tds", "TDS")}
              </th>
            </tr>
          </thead>
          <tbody>
            {KATEGORIEN.map((kat) => {
              const inKategorie = matrixProdukte.filter((p) => p.kategorie === kat.id);
              if (inKategorie.length === 0) return null;
              return (
                <Section
                  key={kat.id}
                  label={t(dict, kat.labelKey, kat.fallback)}
                  produkte={inKategorie}
                  lang={lang}
                  dict={dict}
                  produktLabel={produktLabel}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Section({
  label,
  produkte,
  lang,
  dict,
  produktLabel,
}: {
  label: string;
  produkte: Produkt[];
  lang: Locale;
  dict?: Dict;
  produktLabel: string;
}) {
  return (
    <>
      <KategorieHeader label={label} anzahl={produkte.length} produktLabel={produktLabel} />
      {produkte.map((p) => (
        <ProduktRow key={p.id} p={p} lang={lang} dict={dict} />
      ))}
    </>
  );
}

import type { CSSProperties } from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NAVY = "var(--navy)";
const CYAN = "var(--cyan)";
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
  day: { background: "var(--white)", color: NAVY, border: "2px solid rgba(255,216,77,.82)" },
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

/** TDS-Links sind PDFs (seit M3 self-hosted unter /downloads/, mit basePath);
 *  "website"-Links sind interne App-Routen (lang-neutral gespeichert). */
function resolveLink(
  link: ProductLink,
  lang: Locale
): { href: string; external: boolean } | undefined {
  if (link.kind === "tds") {
    const url = produktTdsUrls.get(link.productId);
    if (!url) return undefined;
    return { href: url.startsWith("/") ? withBasePath(url) : url, external: true };
  }
  return { href: `/${lang}${link.url}`, external: false };
}

function MehrInfosLink({
  link,
  lang,
  dict,
  className,
  style,
}: {
  link: ProductLink;
  lang: Locale;
  dict: Dict | undefined;
  className?: string;
  style?: CSSProperties;
}) {
  const resolved = resolveLink(link, lang);
  if (!resolved) return null;
  const label = t(dict, "link_more", "Mehr Infos");
  return resolved.external ? (
    <a href={resolved.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {label} ↗
    </a>
  ) : (
    <Link href={resolved.href} className={className} style={style}>
      {label} →
    </Link>
  );
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
  return (
    <div>
      {/* Mobil (<lg): Anwendungs-Accordion (Variante C, Mockup 2026-06-11).
          Die Anwendungen sind die Liste, Produkte klappen direkt darunter auf —
          ersetzt den 980px-Zwangs-Scroll der Tabelle. */}
      <MobileAnwendungen dict={dict} lang={lang} />

      <div className="hidden lg:block">
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
                  color: "var(--white)",
                  textAlign: "left",
                  padding: "9px 14px",
                  fontSize: 13,
                }}
              >
                {t(dict, "corner_produkt", "Produkt")}
              </th>
              {anwendungMatrixProducts.map((p) => (
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
                    <MehrInfosLink
                      link={p.link}
                      lang={lang}
                      dict={dict}
                      style={{
                        marginTop: "auto",
                        color: "var(--cyan-text)",
                        fontSize: 11,
                        fontWeight: 800,
                        textDecoration: "none",
                      }}
                    />
                  </span>
                </th>
              ))}
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
                  color: "var(--white)",
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
                  color: "var(--white)",
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
                    background: idx % 2 === 1 ? TECH_BG : "var(--white)",
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
    </div>
  );
}

function MobileAnwendungen({ dict, lang }: { dict: Dict | undefined; lang: Locale }) {
  // Kein defaultValue: ein initial offenes Item verursachte nach der Hydration
  // CLS 0,236 (Radix misst die Content-Höhe neu) — Lighthouse-Befund
  // Launch-Audit. Alle Items starten zu. Die sr-only-h2 repariert die
  // Heading-Hierarchie (Radix-Trigger rendern als h3 ohne vorangehende h2).
  return (
    <div className="lg:hidden">
      <h2 className="sr-only">{t(dict, "divider_anwendungen", "Anwendungen")}</h2>
      <Accordion type="single" collapsible>
      {anwendungUsecases.map((row) => {
        const n = row.marks.filter((m) => m !== "none").length;
        // PL braucht ab 5 die zweite Pluralform (produkty/produktów);
        // de/en/fr haben in beiden Keys denselben Wert.
        const countTpl = t(
          dict,
          n >= 5 ? "count_produkte_5plus" : "count_produkte",
          "{n} Produkte"
        );
        return (
          <AccordionItem
            key={row.key}
            value={row.key}
            className="mb-3 rounded-xl border border-bullet-bg bg-card px-4 last:border-b"
          >
            <AccordionTrigger className="py-3 text-left hover:no-underline">
              <span>
                <span className="block text-[15px] font-black text-navy">
                  {t(dict, row.key, row.de)}
                </span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  {countTpl.replace("{n}", String(n))}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <MarkGruppe
                row={row}
                mark="best"
                label={`✓✓ ${t(dict, "legend_best", "Kernanwendung")}`}
                best
                dict={dict}
                lang={lang}
              />
              <MarkGruppe
                row={row}
                mark="yes"
                label={`✓ ${t(dict, "legend_yes", "geeignet")}`}
                dict={dict}
                lang={lang}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
      </Accordion>
    </div>
  );
}

function MarkGruppe({
  row,
  mark,
  label,
  best,
  dict,
  lang,
}: {
  row: (typeof anwendungUsecases)[number];
  mark: Mark;
  label: string;
  best?: boolean;
  dict: Dict | undefined;
  lang: Locale;
}) {
  const items = anwendungMatrixProducts.filter((_, i) => row.marks[i] === mark);
  if (!items.length) return null;
  return (
    <div className="mt-3 first:mt-0">
      <p
        className="mb-2 text-xs font-extrabold tracking-wide uppercase"
        style={{ color: best ? GREEN : "var(--muted-foreground)" }}
      >
        {label}
      </p>
      {items.map((p) => (
        <div
          key={p.id}
          className="mb-2 flex items-center justify-between gap-3 rounded-lg bg-icon-bg p-3 last:mb-0"
        >
          <div className="min-w-0">
            <p className="text-sm font-black text-navy">{p.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t(dict, p.vorteil.key, p.vorteil.de)} ·{" "}
              {t(dict, "row_belastbar", "belastbar nach")}{" "}
              {cell(dict, p.belastbarNach)} · {cell(dict, p.schichtdicke)}
            </p>
          </div>
          <MehrInfosLink
            link={p.link}
            lang={lang}
            dict={dict}
            className="flex min-h-11 shrink-0 items-center gap-1 text-xs font-extrabold text-cyan-text no-underline"
          />
        </div>
      ))}
    </div>
  );
}

const techLabelStyle: CSSProperties = {
  background: "var(--white)",
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

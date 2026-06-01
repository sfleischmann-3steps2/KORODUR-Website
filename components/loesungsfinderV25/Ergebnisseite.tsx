// Ergebnisseite des V2.5-Lösungsfinders.
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Layout (nach Steffi-Review 2026-06-01):
//   1. Auswahl-Chips oben + "Auswahl ändern"
//   2. Top-Empfehlung als kompakter Banner (nicht zentraler Card-Block)
//   3. Referenz-Grid mit Treffer-Zähler
//   4. Beratungs-Banner unten (für Sondernormen-Fälle)
// Schaden-Pill-Filter wurde entfernt — Steffi: "brauchen wir nicht im letzten Schritt".

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { LoesungsfinderState } from "@/data/types";
import { EINSATZBEREICH_LABELS } from "@/data/einsatzbereichMapping";
import { berechneErgebnisV25 } from "@/data/loesungsfinderV25";
import { IconFlame, IconEdit, IconPhone, IconArrowRight } from "./icons";

const KONTAKT_URLS: Record<string, string> = {
  de: "https://www.korodur.de/kontakt/deutschland/",
  en: "https://www.korodur.de/kontakt/international/",
  fr: "https://www.korodur.de/kontakt/international/",
  pl: "https://www.korodur.de/kontakt/international/",
};

interface ErgebnisseiteProps {
  lang: Locale;
  state: LoesungsfinderState;
  onAuswahlAendern: () => void;
}

const NAVY = "#002d59";
const CYAN = "#009ee3";
const HELLGRAU = "#ececed";
const MITTELGRAU = "#d9dada";

const FLAECHE_LABEL: Record<string, string> = {
  punktuell: "Punktuelle Reparatur",
  mittel: "Mittlere Fläche",
  gross: "Großflächige Sanierung",
};

const ZEIT_LABEL: Record<string, string> = {
  "sehr-kurz": "Sehr kurzfristig",
  kurz: "1 – 2 Wochen",
  planbar: "Planbar",
};

export default function Ergebnisseite({ lang, state, onAuswahlAendern }: ErgebnisseiteProps) {
  const ergebnis = berechneErgebnisV25(state);

  // Chip-Labels in der oberen Leiste
  const chips: string[] = [];
  if (state.flaeche) chips.push(FLAECHE_LABEL[state.flaeche]);
  if (state.innenAussen === "innen") chips.push("Innen");
  if (state.innenAussen === "aussen") chips.push("Außen");
  if (state.einsatzbereich) chips.push(EINSATZBEREICH_LABELS[state.einsatzbereich].titel);
  if (state.flaeche !== "punktuell" && state.zeitfenster)
    chips.push(ZEIT_LABEL[state.zeitfenster]);

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: HELLGRAU }}>
      {/* Auswahl-Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {chips.map((c) => (
          <span
            key={c}
            style={{
              fontSize: 11,
              background: "rgba(0, 158, 227, 0.12)",
              color: NAVY,
              padding: "4px 10px",
              borderRadius: 8,
              fontWeight: 500,
            }}
          >
            {c}
          </span>
        ))}
        <button
          type="button"
          onClick={onAuswahlAendern}
          style={{
            fontSize: 12,
            color: CYAN,
            padding: "4px 6px",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <IconEdit width={13} height={13} aria-hidden="true" />
          Auswahl ändern
        </button>
      </div>

      <h2 className="text-[20px] font-medium mb-4" style={{ color: NAVY }}>
        Unsere Empfehlung für Ihre Sanierung
      </h2>

      {/* Top-Empfehlung als kompakter Banner */}
      {ergebnis.topProdukt ? (
        <Link
          href={`/${lang}/produkte/${ergebnis.topProdukt.id}/`}
          style={{
            background: "#fff",
            border: `1px solid ${MITTELGRAU}`,
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            textDecoration: "none",
            color: NAVY,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: 8,
              background: NAVY,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconFlame width={22} height={22} aria-hidden="true" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                color: CYAN,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontWeight: 500,
                marginBottom: 2,
              }}
            >
              Top-Empfehlung
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: NAVY }}>
              {ergebnis.topProdukt.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#6B7280",
                marginTop: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {ergebnis.topProdukt.kurzbeschreibung}
            </div>
          </div>
          <div
            style={{
              flexShrink: 0,
              fontSize: 13,
              color: CYAN,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Details
            <IconArrowRight width={13} height={13} aria-hidden="true" />
          </div>
        </Link>
      ) : (
        <EmptyEmpfehlung />
      )}

      {/* Referenzen-Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 500, color: NAVY }}>
          Passende Referenzen{" "}
          <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 400 }}>
            · {ergebnis.refsGesamt} {ergebnis.refsGesamt === 1 ? "Treffer" : "Treffer"}
          </span>
        </div>
        {ergebnis.refsGesamt > 6 && (
          <Link
            href={`/${lang}/referenzen/`}
            style={{
              fontSize: 12,
              color: CYAN,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Alle anzeigen
            <IconArrowRight width={12} height={12} aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Referenz-Grid */}
      {ergebnis.refs.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {ergebnis.refs.slice(0, 6).map((r) => (
            <Link
              key={r.id}
              href={`/${lang}/referenzen/${r.slug}/`}
              style={{
                background: "#fff",
                border: `1px solid ${MITTELGRAU}`,
                borderRadius: 8,
                overflow: "hidden",
                textDecoration: "none",
                color: NAVY,
                display: "block",
              }}
            >
              <div
                style={{
                  height: 80,
                  background: `linear-gradient(135deg, ${MITTELGRAU}, #b0b0b0)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 11,
                }}
              >
                Referenz-Bild
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.titel}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
                  {r.flaeche ?? "—"}
                  {r.produkte[0] && ` · ${r.produkte[0]}`}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            border: `1px dashed ${MITTELGRAU}`,
            borderRadius: 8,
            padding: 24,
            textAlign: "center",
            fontSize: 13,
            color: "#6B7280",
            marginBottom: 16,
          }}
        >
          Für die aktuelle Auswahl haben wir noch keine veröffentlichten Referenzen.
          Wir erweitern unsere Datenbank laufend.
        </div>
      )}

      {/* Beratungs-Banner */}
      <div
        style={{
          background: "#fff",
          border: `1px solid ${MITTELGRAU}`,
          borderRadius: 8,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: NAVY, marginBottom: 2 }}>
            Sondernormen oder Sonderfall?
          </div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            Trinkwasser, WHG, Denkmal, Barrierefreiheit – wir beraten persönlich.
          </div>
        </div>
        <a
          href={KONTAKT_URLS[lang] ?? KONTAKT_URLS.de}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: CYAN,
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <IconPhone width={14} height={14} aria-hidden="true" />
          Beratung anfragen
        </a>
      </div>
    </div>
  );
}

function EmptyEmpfehlung() {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px dashed ${MITTELGRAU}`,
        borderRadius: 12,
        padding: 24,
        textAlign: "center",
        marginBottom: 20,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 500, color: NAVY, marginBottom: 6 }}>
        Keine direkte Produktempfehlung
      </div>
      <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.55 }}>
        Für diese Kombination haben wir aktuell keinen perfekten Produkt-Match.
        Sprechen Sie uns direkt an – wir finden eine passende Lösung.
      </div>
    </div>
  );
}

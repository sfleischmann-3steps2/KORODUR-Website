// Ergebnisseite des V2.5-Lösungsfinders.
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Layout:
//   1. Auswahl-Chips oben (alle Wizard-Antworten sichtbar) + "Auswahl ändern"
//   2. Top-Empfehlung — ein Produkt prominent, mit CTAs
//   3. Schaden-Pill-Filter (grenzt nur Referenzen ein, kein Wizard-Step)
//   4. Referenz-Grid (3-spaltig, max 6 Treffer + "Alle anzeigen")
//   5. Beratungs-Banner unten (für Sondernormen-Fälle)

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { LoesungsfinderState, Schadenstyp } from "@/data/types";
import { EINSATZBEREICH_LABELS } from "@/data/einsatzbereichMapping";
import { berechneErgebnisV25 } from "@/data/loesungsfinderV25";
import { IconFlame, IconEdit, IconExternalLink, IconPhone, IconArrowRight } from "./icons";

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

const SCHADEN_OPTIONEN: Array<{ id: Schadenstyp; label: string }> = [
  { id: "verschleissschaeden", label: "Verschleißschäden" },
  { id: "ausbrueche", label: "Ausbrüche" },
  { id: "risse", label: "Risse" },
  { id: "frueher-sanierung", label: "Frühere Sanierung" },
];

export default function Ergebnisseite({ lang, state, onAuswahlAendern }: ErgebnisseiteProps) {
  const [schadenFilter, setSchadenFilter] = useState<Schadenstyp[]>([]);

  const toggleSchaden = (s: Schadenstyp) => {
    setSchadenFilter((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const ergebnis = berechneErgebnisV25(state, schadenFilter);

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
      <h2 className="text-[22px] font-medium mb-5" style={{ color: NAVY }}>
        Unsere Empfehlung für Ihre Sanierung
      </h2>

      {/* Top-Empfehlung */}
      {ergebnis.topProdukt ? (
        <div
          style={{
            background: "#fff",
            border: `1px solid ${MITTELGRAU}`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                background: NAVY,
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <IconFlame width={28} height={28} aria-hidden="true" />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: CYAN,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                Top-Empfehlung
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, color: NAVY, marginBottom: 6 }}>
                {ergebnis.topProdukt.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#4B5563",
                  lineHeight: 1.6,
                  marginBottom: 12,
                }}
              >
                {ergebnis.topProdukt.kurzbeschreibung}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link
                  href={`/${lang}/produkte/${ergebnis.topProdukt.id}/`}
                  style={{
                    background: NAVY,
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Produktdetails
                  <IconArrowRight width={13} height={13} aria-hidden="true" />
                </Link>
                {ergebnis.topProdukt.tdsUrl && (
                  <a
                    href={ergebnis.topProdukt.tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "transparent",
                      color: NAVY,
                      padding: "8px 16px",
                      borderRadius: 8,
                      fontSize: 13,
                      textDecoration: "none",
                      border: `1px solid ${MITTELGRAU}`,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Datenblatt PDF
                    <IconExternalLink width={13} height={13} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyEmpfehlung />
      )}

      {/* Referenzen */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 500, color: NAVY }}>
          Passende Referenzen{" "}
          <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 400 }}>
            · {ergebnis.refsGesamt}{" "}
            {ergebnis.refsGesamt === 1 ? "Treffer" : "Treffer"}
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

      {/* Schaden-Pill-Filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: "#6B7280", marginRight: 4, alignSelf: "center" }}>
          Eingrenzen nach Schaden:
        </span>
        {SCHADEN_OPTIONEN.map((s) => {
          const active = schadenFilter.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSchaden(s.id)}
              style={{
                fontSize: 11,
                background: active ? NAVY : "#fff",
                color: active ? "#fff" : NAVY,
                border: `1px solid ${active ? NAVY : MITTELGRAU}`,
                padding: "4px 10px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          );
        })}
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
        marginBottom: 16,
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

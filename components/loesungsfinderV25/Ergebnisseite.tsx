// Ergebnisseite des V2.5-Lösungsfinders.
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Layout (Steffi-Review 2026-06-09):
//   1. Auswahl-Chips oben (reine Zusammenfassung)
//   2. Top-Empfehlung als kompakter Banner (genau EIN Produkt)
//   3. Referenz-Grid: Bild + Titel + Untertitel, min. 3 Projekte, mit
//      Hinweis wenn kein exakter Treffer dabei ist
//   4. Allgemeiner Berater-CTA (ergebnis-unabhängig)
//   5. Navigation: Zurück (zur letzten Frage) + Neu starten — kein Dead End mehr

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import type { LoesungsfinderState } from "@/data/types";
import { EINSATZBEREICH_LABELS } from "@/data/einsatzbereichMapping";
import { berechneErgebnisV25 } from "@/data/loesungsfinderV25";
import { withBasePath } from "@/lib/basePath";
import { IconFlame, IconPhone, IconArrowRight, IconArrowLeft, IconRefresh } from "./icons";

const KONTAKT_URLS: Record<string, string> = {
  de: "https://www.korodur.de/kontakt/deutschland/",
  en: "https://www.korodur.de/kontakt/international/",
  fr: "https://www.korodur.de/kontakt/international/",
  pl: "https://www.korodur.de/kontakt/international/",
};

interface ErgebnisseiteProps {
  lang: Locale;
  state: LoesungsfinderState;
  /** Zurück zur letzten Frage (Auswahl bleibt erhalten). */
  onZurueck: () => void;
  /** Lösungsfinder komplett neu starten. */
  onNeustart: () => void;
}

const NAVY = "#002d59";
const CYAN = "#009ee3";
const HELLGRAU = "#ececed";
const MITTELGRAU = "#d9dada";

// Mehrzeiliges Abschneiden mit Ellipsis (verhindert mitten-im-Wort-Schnitte).
const clamp = (zeilen: number): CSSProperties => ({
  display: "-webkit-box",
  WebkitLineClamp: zeilen,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

// Endständige Jahreszahl in Klammern aus dem Titel entfernen, z. B.
// "Naturex, Burgdorf (2013)" → "Naturex, Burgdorf". Manche Referenzen sind alt;
// das Jahr soll nicht auf der Ergebnisseite stehen (Steffi 2026-06-09).
const ohneJahr = (titel: string): string => titel.replace(/\s*\(\d{4}\)\s*$/, "");

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

export default function Ergebnisseite({ lang, state, onZurueck, onNeustart }: ErgebnisseiteProps) {
  const ergebnis = berechneErgebnisV25(state);

  // Chip-Labels in der oberen Leiste (reine Zusammenfassung der Auswahl)
  const chips: string[] = [];
  if (state.flaeche) chips.push(FLAECHE_LABEL[state.flaeche]);
  if (state.innenAussen === "innen") chips.push("Innen");
  if (state.innenAussen === "aussen") chips.push("Außen");
  if (state.einsatzbereich) chips.push(EINSATZBEREICH_LABELS[state.einsatzbereich].titel);
  if (state.flaeche !== "punktuell" && state.zeitfenster)
    chips.push(ZEIT_LABEL[state.zeitfenster]);

  // Referenz-Sektion: Überschrift + Hinweis abhängig von der Trefferlage.
  const hatExakte = ergebnis.exaktTreffer > 0;
  const refTitel = hatExakte ? "Passende Referenzen" : "Verwandte Projekte";

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: HELLGRAU }}>
      {/* Auswahl-Chips (Zusammenfassung) */}
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
          marginBottom: 4,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 500, color: NAVY }}>
          {refTitel}{" "}
          <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 400 }}>
            · {ergebnis.refsGesamt} {ergebnis.refsGesamt === 1 ? "Projekt" : "Projekte"}
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

      {/* Hinweis, wenn kein exakter Treffer dabei ist (aufgefüllt auf min. 3) */}
      {ergebnis.refsGelockert && (
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 12, lineHeight: 1.5 }}>
          Kein exakt passendes Projekt gefunden? Wir zeigen hier verwandte Ausschnitte und beraten
          Sie gern individuell.
        </div>
      )}
      {!ergebnis.refsGelockert && <div style={{ marginBottom: 12 }} />}

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
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", background: HELLGRAU }}>
                <Image
                  src={withBasePath(r.bild)}
                  alt={r.bildAlt ?? r.titel}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, lineHeight: 1.3, ...clamp(2) }}>
                  {ohneJahr(r.titel)}
                </div>
                {r.untertitel && (
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3, lineHeight: 1.35, ...clamp(2) }}>
                    {ohneJahr(r.untertitel)}
                  </div>
                )}
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

      {/* Allgemeiner Berater-CTA (ergebnis-unabhängig) */}
      <div
        style={{
          background: NAVY,
          borderRadius: 10,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>
            Sprechen Sie mit unseren Sanierungs-Experten
          </div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)" }}>
            Wir besprechen Ihr Vorhaben und stimmen das passende Produkt auf Ihre Baustelle ab.
          </div>
        </div>
        <a
          href={KONTAKT_URLS[lang] ?? KONTAKT_URLS.de}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: CYAN,
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <IconPhone width={15} height={15} aria-hidden="true" />
          Beratung anfragen
        </a>
      </div>

      {/* Navigation — kein Dead End */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
          paddingTop: 16,
          borderTop: `1px solid ${MITTELGRAU}`,
        }}
      >
        <button
          type="button"
          onClick={onZurueck}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm transition hover:bg-white"
          style={{ border: `1px solid ${MITTELGRAU}`, color: NAVY, background: "transparent" }}
        >
          <IconArrowLeft width={14} height={14} aria-hidden="true" />
          Zurück
        </button>
        <button
          type="button"
          onClick={onNeustart}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm transition hover:bg-white"
          style={{ border: `1px solid ${MITTELGRAU}`, color: NAVY, background: "transparent" }}
        >
          <IconRefresh width={14} height={14} aria-hidden="true" />
          Neu starten
        </button>
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

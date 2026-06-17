"use client";

import { useState, useMemo, useEffect } from "react";
import ReferenceCard from "../../../components/ReferenceCard";
import Breadcrumb from "../../../components/Breadcrumb";
import { referenzen as alleReferenzen } from "../../../data/referenzen";
import {
  bereichLabel,
  produktFamilie,
  produktFamilieLabel,
  projektartBucket,
  projektartLabel,
} from "../../../data/einsatzbereichMapping";
import { useLocale } from "../../../lib/LocaleContext";
import { referenzenEN } from "../../../data/i18n/referenzen.en";
import { referenzenFR } from "../../../data/i18n/referenzen.fr";
import { referenzenPL } from "../../../data/i18n/referenzen.pl";
import { referenzenES } from "../../../data/i18n/referenzen.es";
import type { Referenz, EinsatzbereichKategorie } from "../../../data/types";

const translationMap: Record<string, Record<string, Partial<Referenz>>> = {
  en: referenzenEN as Record<string, Partial<Referenz>>,
  fr: referenzenFR as Record<string, Partial<Referenz>>,
  pl: referenzenPL as Record<string, Partial<Referenz>>,
  es: referenzenES as Record<string, Partial<Referenz>>,
};

function localizeRef(ref: Referenz, lang: string): Referenz {
  if (lang === "de") return ref;
  const overrides = translationMap[lang]?.[ref.id];
  if (!overrides) return ref;
  return { ...ref, ...overrides };
}

// Galerie-Logik: Die Referenzgalerie filtert nach der wiedererkennbaren
// Branchen-Facette (feine Ebene), nicht nach den Lösungsfinder-Clustern. Bei
// ~50 Referenzen reicht meist ein Filter; der Produktfilter wird erst
// eingeblendet, wenn die Branchen-Auswahl noch viele Treffer hat (progressive
// disclosure). Reihenfolge der Produkt-Familien im gruppierten Dropdown:
const FAMILIE_ORDER = ["estrich", "schnellzement", "grundierung", "nachbehandlung", "beschichtung", "sonstige"];
// Ab wie vielen Treffern (nach Bereichswahl) lohnt der zweite Filter:
const PRODUKT_FILTER_SCHWELLE = 6;

type FilterState = {
  projektart: "" | "sanierung" | "neubau";
  bereich: string;
  produkt: string;
};

export default function ReferenzenPage() {
  const { lang, dict } = useLocale();

  const [filters, setFilters] = useState<FilterState>({
    projektart: "",
    bereich: "",
    produkt: "",
  });

  // Deep-Link ?produkt=… erst nach Mount anwenden (statt useSearchParams):
  // useSearchParams würde beim Static Export die ganze Seite aus dem Prerender
  // kippen — dann stünden 0 Referenz-Cards im crawlbaren HTML (Launch-Plan M2).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const produkt = params.get("produkt");
    // Kontext-Vorbelegung: aus Neubau/Sanierung kommend ist der Projektart-Filter
    // schon gesetzt (Deep-Link aus der jeweiligen Strecke).
    const projektart = params.get("projektart");
    setFilters((prev) => ({
      ...prev,
      ...(produkt ? { produkt } : {}),
      ...(projektart === "neubau" || projektart === "sanierung" ? { projektart } : {}),
    }));
  }, []);

  const referenzen = useMemo(
    () => alleReferenzen.map((r) => localizeRef(r, lang)),
    [lang]
  );

  // Absolute Projektart-Verteilung (Zähler an der Umschaltung, unabhängig von
  // Bereich/Produkt). Bucket rollt projekttyp auf Neubau vs. Sanierung hoch.
  const projektartCounts = useMemo(() => {
    let neubau = 0;
    for (const r of referenzen) if (projektartBucket(r.projekttyp) === "neubau") neubau++;
    return { all: referenzen.length, neubau, sanierung: referenzen.length - neubau };
  }, [referenzen]);

  // Führende Facette: erst nach Projektart (Neubau/Sanierung) filtern …
  const ergebnisNachProjektart = useMemo(() => {
    return referenzen.filter(
      (r) => !filters.projektart || projektartBucket(r.projekttyp) === filters.projektart
    );
  }, [referenzen, filters.projektart]);

  // Bereiche mit Trefferzahl (aus dem projektart-gefilterten Set), absteigend
  // sortiert, leere Bereiche entfallen.
  const bereicheSortiert = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of ergebnisNachProjektart) {
      // Defensiv: künftige/importierte Referenzen könnten das Feld (noch) nicht haben.
      for (const b of r.einsatzbereiche ?? []) counts[b] = (counts[b] ?? 0) + 1;
    }
    return (Object.keys(counts) as EinsatzbereichKategorie[]).sort(
      (a, b) => counts[b] - counts[a]
    ).map((b) => ({ id: b, count: counts[b] }));
  }, [ergebnisNachProjektart]);

  // … dann nach Bereich (Basis für Produkt-Optionen + Einblend-Logik) …
  const ergebnisNachBereich = useMemo(() => {
    return ergebnisNachProjektart.filter(
      (r) =>
        !filters.bereich ||
        r.einsatzbereiche?.includes(filters.bereich as EinsatzbereichKategorie)
    );
  }, [ergebnisNachProjektart, filters.bereich]);

  // … dann zusätzlich nach Produkt.
  const gefilterteReferenzen = useMemo(() => {
    return ergebnisNachBereich.filter(
      (r) => !filters.produkt || r.produkte.includes(filters.produkt)
    );
  }, [ergebnisNachBereich, filters.produkt]);

  // Produktfilter nur zeigen, wenn die Bereichswahl noch viele Treffer hat
  // (oder bereits ein Produkt gewählt ist, z. B. über die URL).
  const zeigeProduktFilter =
    (filters.bereich !== "" && ergebnisNachBereich.length > PRODUKT_FILTER_SCHWELLE) ||
    filters.produkt !== "";

  // Produkt-Optionen aus dem aktuellen Bereich, gruppiert nach Familie.
  const produktGruppen = useMemo(() => {
    const namen = [...new Set(ergebnisNachBereich.flatMap((r) => r.produkte))];
    const nachFamilie: Record<string, string[]> = {};
    for (const name of namen) {
      const fam = produktFamilie(name);
      (nachFamilie[fam] ??= []).push(name);
    }
    return FAMILIE_ORDER.filter((f) => nachFamilie[f]?.length).map((fam) => ({
      familie: fam,
      produkte: nachFamilie[fam].sort(),
    }));
  }, [ergebnisNachBereich]);

  const setProjektart = (value: FilterState["projektart"]) => {
    // Projektart führt: Wechsel setzt Bereich + Produkt zurück (beide hängen daran).
    setFilters({ projektart: value, bereich: "", produkt: "" });
  };

  const setBereich = (value: string) => {
    // Bereichswechsel setzt das Produkt zurück (Produkte sind bereichsabhängig).
    setFilters((prev) => ({ ...prev, bereich: value, produkt: "" }));
  };

  const setProdukt = (value: string) => {
    setFilters((prev) => ({ ...prev, produkt: value }));
  };

  const resetFilters = () => {
    setFilters({ projektart: "", bereich: "", produkt: "" });
  };

  const hasActiveFilters = filters.projektart || filters.bereich || filters.produkt;

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb items={[{ label: dict.referenzen.breadcrumb }]} lang={lang} />
        </div>
      </section>

      <section style={{ padding: "0 32px 48px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h1
            className="mb-3"
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            {dict.referenzen.title}
          </h1>
          <p
            className="text-navy opacity-60 mb-0"
            style={{ fontSize: 18, maxWidth: 600 }}
          >
            {referenzen.length} {dict.referenzen.description_prefix}
          </p>
        </div>
      </section>

      <section
        className="bg-icon-bg sticky top-[74px] z-30"
        style={{ padding: "16px 16px", borderBottom: "1px solid var(--bullet-bg)" }}
      >
        <div className="mx-auto sm:px-4" style={{ maxWidth: 1320 }}>
          <div className="flex flex-col gap-3">
            {/* Projektart-Umschaltung — führende Facette (Mockup Variante A) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[12px] font-extrabold uppercase tracking-wider text-navy opacity-40">
                {dict.referenzen.filter_projektart}
              </span>
              <div className="inline-flex flex-wrap gap-0.5 rounded-[10px] border border-mid-gray bg-white p-1">
                {[
                  { key: "" as const, label: dict.referenzen.filter_all, count: projektartCounts.all },
                  { key: "sanierung" as const, label: projektartLabel("sanierung", lang), count: projektartCounts.sanierung },
                  { key: "neubau" as const, label: projektartLabel("neubau", lang), count: projektartCounts.neubau },
                ].map((opt) => {
                  const active = filters.projektart === opt.key;
                  return (
                    <button
                      key={opt.key || "all"}
                      onClick={() => setProjektart(opt.key)}
                      className="inline-flex items-center gap-1.5 rounded-[7px] border-none px-4 py-2 text-[14px] cursor-pointer transition-colors"
                      style={{
                        fontFamily: "inherit",
                        fontWeight: 800,
                        background: active ? (opt.key === "sanierung" ? "#009ee3" : "#002d59") : "transparent",
                        color: active ? "#fff" : "#002d59",
                      }}
                    >
                      {opt.label}
                      <span className="text-[12px]" style={{ fontWeight: 700, opacity: 0.55 }}>
                        {opt.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bereich + Produkt + Reset + Trefferzahl */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
            <select
              value={filters.bereich}
              onChange={(e) => setBereich(e.target.value)}
              className="text-[14px] text-navy bg-white border border-mid-gray rounded-[8px] px-4 py-2.5 cursor-pointer outline-none focus:border-cyan"
              style={{ fontWeight: 700, fontFamily: "inherit" }}
            >
              <option value="">{dict.referenzen.filter_all_areas}</option>
              {bereicheSortiert.map(({ id, count }) => (
                <option key={id} value={id}>
                  {bereichLabel(id, lang)} ({count})
                </option>
              ))}
            </select>

            {zeigeProduktFilter && (
              <select
                value={filters.produkt}
                onChange={(e) => setProdukt(e.target.value)}
                className="text-[14px] text-navy bg-white border border-mid-gray rounded-[8px] px-4 py-2.5 cursor-pointer outline-none focus:border-cyan"
                style={{ fontWeight: 700, fontFamily: "inherit" }}
              >
                <option value="">{dict.referenzen.filter_all_products}</option>
                {produktGruppen.map(({ familie, produkte }) => (
                  <optgroup key={familie} label={produktFamilieLabel(familie, lang)}>
                    {produkte.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[14px] text-cyan-text bg-transparent border-none cursor-pointer underline"
                style={{ fontWeight: 700, fontFamily: "inherit" }}
              >
                {dict.referenzen.filter_reset}
              </button>
            )}

            <span className="text-[13px] text-navy opacity-40 ml-auto" style={{ fontWeight: 700 }}>
              {gefilterteReferenzen.length} {dict.referenzen.of} {referenzen.length} {dict.referenzen.references}
            </span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 32px 88px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          {gefilterteReferenzen.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gefilterteReferenzen.map((r) => (
                <ReferenceCard key={r.id} referenz={r} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-navy opacity-40 text-[18px] mb-4">
                {dict.referenzen.no_results}
              </p>
              <button
                onClick={resetFilters}
                className="text-white text-[15px] bg-cyan hover:bg-cyan-hover border-none rounded-[6px] cursor-pointer transition-colors duration-200"
                style={{ padding: "14px 28px", fontWeight: 800, fontFamily: "inherit" }}
              >
                {dict.referenzen.show_all}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

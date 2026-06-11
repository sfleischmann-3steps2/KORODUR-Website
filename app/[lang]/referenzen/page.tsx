"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReferenceCard from "../../../components/ReferenceCard";
import Breadcrumb from "../../../components/Breadcrumb";
import { referenzen as alleReferenzen } from "../../../data/referenzen";
import {
  bereichLabel,
  produktFamilie,
  produktFamilieLabel,
} from "../../../data/einsatzbereichMapping";
import { useLocale } from "../../../lib/LocaleContext";
import { referenzenEN } from "../../../data/i18n/referenzen.en";
import { referenzenFR } from "../../../data/i18n/referenzen.fr";
import { referenzenPL } from "../../../data/i18n/referenzen.pl";
import type { Referenz, EinsatzbereichKategorie } from "../../../data/types";

const translationMap: Record<string, Record<string, Partial<Referenz>>> = {
  en: referenzenEN as Record<string, Partial<Referenz>>,
  fr: referenzenFR as Record<string, Partial<Referenz>>,
  pl: referenzenPL as Record<string, Partial<Referenz>>,
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
  bereich: string;
  produkt: string;
};

export default function ReferenzenPage() {
  return (
    <Suspense>
      <ReferenzenContent />
    </Suspense>
  );
}

function ReferenzenContent() {
  const { lang, dict } = useLocale();
  const searchParams = useSearchParams();
  const initialProdukt = searchParams.get("produkt") ?? "";

  const [filters, setFilters] = useState<FilterState>({
    bereich: "",
    produkt: initialProdukt,
  });

  const referenzen = useMemo(
    () => alleReferenzen.map((r) => localizeRef(r, lang)),
    [lang]
  );

  // Bereiche mit Trefferzahl, absteigend sortiert (leere Bereiche entfallen).
  const bereicheSortiert = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of referenzen) {
      // Defensiv: künftige/importierte Referenzen könnten das Feld (noch) nicht haben.
      for (const b of r.einsatzbereiche ?? []) counts[b] = (counts[b] ?? 0) + 1;
    }
    return (Object.keys(counts) as EinsatzbereichKategorie[]).sort(
      (a, b) => counts[b] - counts[a]
    ).map((b) => ({ id: b, count: counts[b] }));
  }, [referenzen]);

  // Erst nach Bereich filtern (Basis für Produkt-Optionen + Einblend-Logik) …
  const ergebnisNachBereich = useMemo(() => {
    return referenzen.filter(
      (r) =>
        !filters.bereich ||
        r.einsatzbereiche?.includes(filters.bereich as EinsatzbereichKategorie)
    );
  }, [referenzen, filters.bereich]);

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

  const setBereich = (value: string) => {
    // Bereichswechsel setzt das Produkt zurück (Produkte sind bereichsabhängig).
    setFilters({ bereich: value, produkt: "" });
  };

  const setProdukt = (value: string) => {
    setFilters((prev) => ({ ...prev, produkt: value }));
  };

  const resetFilters = () => {
    setFilters({ bereich: "", produkt: "" });
  };

  const hasActiveFilters = filters.bereich || filters.produkt;

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
            className="text-[#002d59] opacity-60 mb-0"
            style={{ fontSize: 18, maxWidth: 600 }}
          >
            {referenzen.length} {dict.referenzen.description_prefix}
          </p>
        </div>
      </section>

      <section
        className="bg-[#f5f5f6] sticky top-16 z-30"
        style={{ padding: "16px 16px", borderBottom: "1px solid #e8edf5" }}
      >
        <div className="mx-auto sm:px-4" style={{ maxWidth: 1320 }}>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
            <select
              value={filters.bereich}
              onChange={(e) => setBereich(e.target.value)}
              className="text-[14px] text-[#002d59] bg-white border border-[#d9dada] rounded-[8px] px-4 py-2.5 cursor-pointer outline-none focus:border-[#009ee3]"
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
                className="text-[14px] text-[#002d59] bg-white border border-[#d9dada] rounded-[8px] px-4 py-2.5 cursor-pointer outline-none focus:border-[#009ee3]"
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
                className="text-[14px] text-[#009ee3] bg-transparent border-none cursor-pointer underline"
                style={{ fontWeight: 700, fontFamily: "inherit" }}
              >
                {dict.referenzen.filter_reset}
              </button>
            )}

            <span className="text-[13px] text-[#002d59] opacity-40 ml-auto" style={{ fontWeight: 700 }}>
              {gefilterteReferenzen.length} {dict.referenzen.of} {referenzen.length} {dict.referenzen.references}
            </span>
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
              <p className="text-[#002d59] opacity-40 text-[18px] mb-4">
                {dict.referenzen.no_results}
              </p>
              <button
                onClick={resetFilters}
                className="text-white text-[15px] bg-[#009ee3] hover:bg-[#0090d0] border-none rounded-[6px] cursor-pointer transition-colors duration-200"
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

"use client";

// Filterbares Download-Center (#301): Katalog der lokal vorliegenden Produkt-
// dokumente, gefiltert nach Typ + Bereich + Freitext. Deep-Link ueber
// ?typ=/?bereich=/?produkt= (Produkt-/Bereichsseiten verlinken vorgefiltert).

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppIcon } from "@/components/ui/icon";
import { FileText, X } from "lucide-react";
import { withBasePath } from "../lib/basePath";
import type { DokumentTyp } from "../data/produktDokumente";
import type { KatalogDokument } from "../lib/downloadKatalog";

const TYP_ORDER: DokumentTyp[] = ["tds", "sds", "dop", "epd", "anwendung", "reinigung", "farbkarte", "service"];
const TYP_KEY: Record<DokumentTyp, string> = {
  tds: "dok_tds",
  sds: "dok_sds",
  dop: "dok_dop",
  epd: "dok_epd",
  anwendung: "dok_anwendung",
  reinigung: "dok_reinigung",
  farbkarte: "dok_farbkarte",
  service: "dok_service",
};

function normalisiere(s: string): string {
  return s.toLowerCase().replace(/[\s\-/.,]+/g, "");
}

/** Liest Deep-Link-Filter reaktiv aus der Query und meldet sie nach oben.
 *  Isoliert + via <Suspense>, damit useSearchParams nicht den Static-Export-
 *  Prerender kippt (vgl. ProdukteListe / referenzen). */
function DownloadDeepLink({
  onApply,
}: {
  onApply: (f: { typ: string; bereich: string; produkt: string }) => void;
}) {
  const params = useSearchParams();
  const typ = params.get("typ") ?? "";
  const bereich = params.get("bereich") ?? "";
  const produkt = params.get("produkt") ?? "";
  const last = useRef<string | null>(null);
  useEffect(() => {
    const k = `${typ}|${bereich}|${produkt}`;
    if (k !== last.current) {
      last.current = k;
      onApply({ typ, bereich, produkt });
    }
  }, [typ, bereich, produkt, onApply]);
  return null;
}

export interface DownloadCenterStrings {
  alle: string;
  suchePlaceholder: string;
  treffer: string; // "{n} Dokumente"
  keineTreffer: string;
  filterTyp: string;
  filterBereich: string;
  reset: string;
  produktLabel: string; // "Produkt: {name}"
  uebergreifend: string;
}

export default function DownloadCenter({
  katalog,
  bereichOptionen,
  lang,
  bereichLabels,
  typLabels,
  strings,
}: {
  katalog: KatalogDokument[];
  bereichOptionen: string[];
  lang: string;
  bereichLabels: Record<string, string>;
  typLabels: Record<string, string>;
  strings: DownloadCenterStrings;
}) {
  const [suche, setSuche] = useState("");
  const [typFilter, setTypFilter] = useState("");
  const [bereichFilter, setBereichFilter] = useState("");
  const [produktFilter, setProduktFilter] = useState("");

  const applyDeepLink = useCallback((f: { typ: string; bereich: string; produkt: string }) => {
    setTypFilter(f.typ);
    setBereichFilter(f.bereich);
    setProduktFilter(f.produkt);
  }, []);

  const produktName = useMemo(() => {
    if (!produktFilter) return "";
    for (const d of katalog) {
      const p = d.produkte.find((x) => x.id === produktFilter);
      if (p) return p.name;
    }
    return produktFilter;
  }, [produktFilter, katalog]);

  const terme = useMemo(
    () => normalisiere(suche).split(" ").map((t) => t.trim()).filter(Boolean),
    [suche],
  );

  const gefiltert = useMemo(() => {
    return katalog.filter((d) => {
      if (typFilter && d.typ !== typFilter) return false;
      if (bereichFilter && !d.bereiche.includes(bereichFilter)) return false;
      if (produktFilter && !d.produkte.some((p) => p.id === produktFilter)) return false;
      if (terme.length) {
        const hay = normalisiere(`${d.titel} ${d.produkte.map((p) => p.name).join(" ")}`);
        if (!terme.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [katalog, typFilter, bereichFilter, produktFilter, terme]);

  const gruppen = useMemo(
    () =>
      TYP_ORDER.map((typ) => ({ typ, docs: gefiltert.filter((d) => d.typ === typ) })).filter(
        (g) => g.docs.length > 0,
      ),
    [gefiltert],
  );

  const hatFilter = Boolean(typFilter || bereichFilter || produktFilter || suche);
  const chip = (aktiv: boolean) =>
    `inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] no-underline transition-colors duration-150 border ${
      aktiv
        ? "bg-navy text-white border-navy"
        : "bg-white text-navy border-bullet-bg hover:border-cyan"
    }`;

  return (
    <div>
      <Suspense fallback={null}>
        <DownloadDeepLink onApply={applyDeepLink} />
      </Suspense>

      {/* Suche */}
      <input
        type="search"
        value={suche}
        onChange={(e) => setSuche(e.target.value)}
        placeholder={strings.suchePlaceholder}
        className="w-full rounded-[8px] border border-bullet-bg bg-white px-4 text-[15px] text-navy outline-none focus:border-cyan"
        style={{ height: 48, marginBottom: 18 }}
      />

      {/* Typ-Filter */}
      <div className="mb-3">
        <span className="block text-navy/55 text-[12px] uppercase tracking-wider mb-2" style={{ fontWeight: 700 }}>
          {strings.filterTyp}
        </span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setTypFilter("")} className={chip(!typFilter)} style={{ fontWeight: 700 }}>
            {strings.alle}
          </button>
          {TYP_ORDER.map((typ) => (
            <button key={typ} type="button" onClick={() => setTypFilter(typ)} className={chip(typFilter === typ)} style={{ fontWeight: 700 }}>
              {typLabels[TYP_KEY[typ]] ?? typ}
            </button>
          ))}
        </div>
      </div>

      {/* Bereich-Filter */}
      <div className="mb-4">
        <span className="block text-navy/55 text-[12px] uppercase tracking-wider mb-2" style={{ fontWeight: 700 }}>
          {strings.filterBereich}
        </span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setBereichFilter("")} className={chip(!bereichFilter)} style={{ fontWeight: 700 }}>
            {strings.alle}
          </button>
          {bereichOptionen.map((slug) => (
            <button key={slug} type="button" onClick={() => setBereichFilter(slug)} className={chip(bereichFilter === slug)} style={{ fontWeight: 700 }}>
              {bereichLabels[`${slug}_name`] ?? bereichLabels[slug] ?? slug}
            </button>
          ))}
        </div>
      </div>

      {/* Aktiver Produkt-Deep-Link + Reset */}
      <div className="flex flex-wrap items-center gap-3 mb-6" style={{ minHeight: 28 }}>
        {produktFilter && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/10 text-cyan-text px-3 py-1 text-[13px]" style={{ fontWeight: 700 }}>
            {strings.produktLabel.replace("{name}", produktName)}
            <button type="button" onClick={() => setProduktFilter("")} aria-label="reset" className="inline-flex">
              <AppIcon icon={X} width={13} height={13} strokeWidth={2.5} />
            </button>
          </span>
        )}
        <span className="text-navy/55 text-[13px]">{strings.treffer.replace("{n}", String(gefiltert.length))}</span>
        {hatFilter && (
          <button
            type="button"
            onClick={() => { setSuche(""); setTypFilter(""); setBereichFilter(""); setProduktFilter(""); }}
            className="text-cyan-text text-[13px] hover:underline"
            style={{ fontWeight: 700 }}
          >
            {strings.reset}
          </button>
        )}
      </div>

      {/* Ergebnisse, gruppiert nach Typ */}
      {gruppen.length === 0 ? (
        <p className="text-navy/60 text-[15px] py-8">{strings.keineTreffer}</p>
      ) : (
        <div className="flex flex-col gap-8">
          {gruppen.map(({ typ, docs }) => (
            <div key={typ}>
              <h2 className="text-navy text-[15px] mb-3" style={{ fontWeight: 900 }}>
                {typLabels[TYP_KEY[typ]] ?? typ} <span className="text-navy/40">({docs.length})</span>
              </h2>
              <div className="bg-white overflow-hidden" style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.06)" }}>
                {docs.map((d, i) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-4 px-5 py-3.5"
                    style={i < docs.length - 1 ? { borderBottom: "1px solid var(--icon-bg)" } : {}}
                  >
                    <AppIcon icon={FileText} width={18} height={18} strokeWidth={2} className="text-cyan-text shrink-0" aria-hidden="true" />
                    <span className="flex-1 min-w-0">
                      <span className="block text-navy text-[14px] truncate" style={{ fontWeight: 700 }}>{d.titel}</span>
                      <span className="block text-navy/50 text-[12px] truncate">
                        {d.produkte.length > 0
                          ? d.produkte.map((p) => p.name).join(", ")
                          : strings.uebergreifend}
                      </span>
                    </span>
                    <span className="shrink-0 flex flex-wrap gap-1.5 justify-end">
                      {d.dateien.map((f) => (
                        <a
                          key={f.url}
                          href={withBasePath(f.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-[5px] border border-bullet-bg text-navy hover:border-cyan hover:text-cyan-text no-underline px-2 py-1 text-[11px] uppercase tracking-wide transition-colors"
                          style={{ fontWeight: 700, minHeight: 28 }}
                        >
                          <span lang={f.sprache}>{f.sprache}</span>
                          <span className="text-navy/40">PDF</span>
                        </a>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

// Interaktives /produkte-Listing (#184/#307): zweistufiger Filter (Bereich →
// Produktart) + On-Page-Suche. Stufe 1 „Bereich" grenzt das Portfolio ein,
// Stufe 2 „Produktart" zoomt auf eine Lieferprogramm-Gruppe. Suche filtert
// zusätzlich live (trennzeichen-insensitiv). Leere Gruppen werden ausgeblendet.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "../lib/basePath";

export type ProduktKarte = {
  id: string;
  name: string;
  kurzbeschreibung: string;
  qualitaetsklasse?: string;
  schichtdicke?: string;
  normen: string[];
  bild?: string;
  /** Bereiche (primär + zusatz), in denen das Produkt geführt wird (#307-Filter). */
  bereiche: string[];
};
export type RollenGruppe = { key: string; label: string; items: ProduktKarte[] };
export type BereichsGruppe = {
  slug: string;
  label: string;
  items: ProduktKarte[];
  /** Produktart-Buckets (nur Industrieboden); sonst flaches Grid. */
  rollen?: RollenGruppe[];
};

/** Trennzeichen-insensitiv: "HE3", "he-3" und "HE 3" finden dasselbe
 *  (analog lib/suchindex.ts / Homepage-Suche). Entfernt Leerraum, Binde-/
 *  Schrägstriche und Punkte/Kommas. */
function normalisiere(s: string): string {
  return s.toLowerCase().replace(/[\s\-/.,]+/g, "");
}

/** Alle Suchterme müssen in Name/Beschreibung/Norm vorkommen (UND-Suche),
 *  trennzeichen-insensitiv normalisiert. */
function matcht(p: ProduktKarte, terme: string[]): boolean {
  if (terme.length === 0) return true;
  const hay = normalisiere(`${p.name} ${p.kurzbeschreibung} ${p.normen.join(" ")}`);
  return terme.every((t) => hay.includes(t));
}

export default function ProdukteListe({
  gruppen,
  bereichOptionen,
  lang,
  layerThicknessLabel,
  suchePlaceholder,
  sucheKeine,
  sucheReset,
  bereichAlleLabel,
  produktartAlleLabel,
  bereichLabel,
  produktartLabel,
}: {
  gruppen: BereichsGruppe[];
  bereichOptionen: { slug: string; label: string }[];
  lang: string;
  layerThicknessLabel: string;
  suchePlaceholder: string;
  sucheKeine: string;
  sucheReset: string;
  bereichAlleLabel: string;
  produktartAlleLabel: string;
  bereichLabel: string;
  produktartLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [bereich, setBereich] = useState(""); // "" = alle Bereiche
  const [produktart, setProduktart] = useState(""); // "" = alle Produktarten
  const terme = query.trim().toLowerCase().split(/\s+/).map(normalisiere).filter(Boolean);

  // Deep-Link aus dem Portfolio-Mega-Menü (#309): /produkte/#<produktart> wählt
  // die passende Produktart in Stufe 2 vor.
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && gruppen.some((g) => g.slug === hash)) setProduktart(hash);
    // nur beim Mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter-Pipeline: Suche → Bereich → Produktart. Die Produktart-Optionen
  // ergeben sich aus dem Ergebnis nach Suche+Bereich (Stufe 2 folgt Stufe 1).
  const { sichtbar, produktartOptionen, treffer } = useMemo(() => {
    const nachSuche = gruppen
      .map((g) => ({ ...g, items: g.items.filter((p) => matcht(p, terme)) }))
      .filter((g) => g.items.length > 0);

    const nachBereich = bereich
      ? nachSuche
          .map((g) => ({ ...g, items: g.items.filter((p) => p.bereiche.includes(bereich)) }))
          .filter((g) => g.items.length > 0)
      : nachSuche;

    const optionen = nachBereich.map((g) => ({ slug: g.slug, label: g.label }));

    const final = produktart
      ? nachBereich.filter((g) => g.slug === produktart)
      : nachBereich;

    return {
      sichtbar: final,
      produktartOptionen: optionen,
      treffer: final.reduce((n, g) => n + g.items.length, 0),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gruppen, query, bereich, produktart]);

  // Bereichswechsel setzt die Produktart zurück, wenn sie im neuen Bereich fehlt.
  const onBereich = (slug: string) => {
    setBereich(slug);
    setProduktart("");
  };

  const selectClass =
    "appearance-none rounded-full border border-bullet-bg bg-white text-navy text-[15px] outline-none focus:border-cyan cursor-pointer";
  const selectStyle = { padding: "12px 40px 12px 18px", minHeight: 48 } as const;

  const Karte = (produkt: ProduktKarte) => (
    <Link
      key={produkt.id}
      href={`/${lang}/produkte/${produkt.id}`}
      className="no-underline group block"
    >
      <div
        className="bg-white p-6 flex flex-row gap-5 h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"
        style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.08)" }}
      >
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-navy text-[17px] m-0" style={{ fontWeight: 900 }}>
              {produkt.name}
            </h3>
            {produkt.qualitaetsklasse && (
              <span
                className="text-[10px] text-white uppercase tracking-wider px-2 py-0.5 rounded shrink-0"
                style={{ backgroundColor: "var(--cyan)", fontWeight: 700 }}
              >
                {produkt.qualitaetsklasse}
              </span>
            )}
          </div>
          <p className="text-navy opacity-60 text-[14px] m-0 leading-[1.5]">
            {produkt.kurzbeschreibung}
          </p>
          {produkt.schichtdicke && (
            <p className="text-cyan-text text-[12px] m-0" style={{ fontWeight: 700 }}>
              {layerThicknessLabel}: {produkt.schichtdicke}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {produkt.normen.slice(0, 2).map((norm) => (
              <span
                key={norm}
                className="text-[10px] text-navy opacity-50 px-2 py-0.5 rounded"
                style={{ backgroundColor: "var(--icon-bg)", fontWeight: 600 }}
              >
                {norm}
              </span>
            ))}
            {produkt.normen.length > 2 && (
              <span className="text-[10px] text-navy opacity-30 px-1 py-0.5">
                +{produkt.normen.length - 2}
              </span>
            )}
          </div>
        </div>
        {produkt.bild && (
          <div className="shrink-0 flex items-center">
            <Image
              src={withBasePath(produkt.bild)}
              alt={produkt.name}
              width={90}
              height={120}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </Link>
  );

  const Grid = ({ items }: { items: ProduktKarte[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map(Karte)}
    </div>
  );

  const filterAktiv = bereich !== "" || produktart !== "" || query !== "";

  return (
    <>
      {/* Zweistufiger Filter + Suche */}
      <section style={{ padding: "0 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="flex flex-wrap items-center gap-3">
            {/* Stufe 1: Bereich */}
            <div className="relative">
              <select
                value={bereich}
                onChange={(e) => onBereich(e.target.value)}
                aria-label={bereichLabel}
                className={selectClass}
                style={selectStyle}
              >
                <option value="">{bereichAlleLabel}</option>
                {bereichOptionen.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-4 text-navy/40 text-[12px]">
                ▾
              </span>
            </div>

            {/* Stufe 2: Produktart (folgt Stufe 1) */}
            <div className="relative">
              <select
                value={produktart}
                onChange={(e) => setProduktart(e.target.value)}
                aria-label={produktartLabel}
                className={selectClass}
                style={selectStyle}
              >
                <option value="">{produktartAlleLabel}</option>
                {produktartOptionen.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-4 text-navy/40 text-[12px]">
                ▾
              </span>
            </div>

            {/* Suche */}
            <div className="relative flex-1" style={{ minWidth: 220, maxWidth: 420 }}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={suchePlaceholder}
                aria-label={suchePlaceholder}
                className="w-full rounded-full border border-bullet-bg bg-white text-navy text-[15px] outline-none focus:border-cyan"
                style={{ padding: "12px 44px 12px 20px", minHeight: 48 }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={sucheReset}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-navy/40 hover:text-navy text-[20px] leading-none"
                  style={{ width: 32, height: 32 }}
                >
                  ×
                </button>
              )}
            </div>

            {filterAktiv && (
              <button
                type="button"
                onClick={() => {
                  setBereich("");
                  setProduktart("");
                  setQuery("");
                }}
                className="text-cyan-text text-[14px] hover:underline"
                style={{ fontWeight: 700 }}
              >
                {sucheReset}
              </button>
            )}
          </div>
        </div>
      </section>

      {treffer === 0 ? (
        <section style={{ padding: "40px 32px 64px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <p className="text-navy/60 text-[16px]">{sucheKeine}</p>
          </div>
        </section>
      ) : (
        sichtbar.map((group) => (
          <section
            key={group.slug}
            className="bg-icon-bg scroll-mt-20"
            style={{ padding: "56px 32px 64px" }}
            id={group.slug}
          >
            <div className="mx-auto" style={{ maxWidth: 1320 }}>
              <h2
                className="mb-6"
                style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}
              >
                {group.label}
                <span className="ml-3 text-navy/30 text-[16px]" style={{ fontWeight: 600 }}>
                  {group.items.length}
                </span>
              </h2>

              {group.rollen && group.rollen.length > 0 ? (
                <div className="flex flex-col gap-10">
                  {group.rollen.map((r) => (
                    <div key={r.key} id={`${group.slug}-${r.key}`} className="scroll-mt-20">
                      <h3
                        className="mb-4 text-navy/70 uppercase"
                        style={{ fontSize: "clamp(14px, 1.6vw, 17px)", fontWeight: 800, letterSpacing: "0.04em" }}
                      >
                        {r.label}
                        <span className="ml-2 text-navy/30 text-[13px]" style={{ fontWeight: 600 }}>
                          {r.items.length}
                        </span>
                      </h3>
                      <Grid items={r.items} />
                    </div>
                  ))}
                </div>
              ) : (
                <Grid items={group.items} />
              )}
            </div>
          </section>
        ))
      )}
    </>
  );
}

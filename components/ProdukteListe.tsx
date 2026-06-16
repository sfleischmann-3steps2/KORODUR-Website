"use client";

// Interaktives /produkte-Listing (#184): On-Page-Suche + Produktart-Subnav.
// Browse-Modus (leere Suche): Bereichs-Anker-Chips + Sektionen, Industrieboden
// mit Produktart-Subnav (#93-Buckets). Such-Modus: live gefilterte Sektionen,
// leere Gruppen/Buckets ausgeblendet, "keine Treffer"-Hinweis.

import { useMemo, useState } from "react";
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
};
export type RollenGruppe = { key: string; label: string; items: ProduktKarte[] };
export type BereichsGruppe = {
  slug: string;
  label: string;
  items: ProduktKarte[];
  /** Produktart-Buckets (nur Industrieboden); sonst flaches Grid. */
  rollen?: RollenGruppe[];
};

/** Alle Suchterme müssen in Name/Beschreibung/Norm vorkommen (UND-Suche). */
function matcht(p: ProduktKarte, terme: string[]): boolean {
  if (terme.length === 0) return true;
  const hay = `${p.name} ${p.kurzbeschreibung} ${p.normen.join(" ")}`.toLowerCase();
  return terme.every((t) => hay.includes(t));
}

export default function ProdukteListe({
  gruppen,
  lang,
  layerThicknessLabel,
  suchePlaceholder,
  sucheKeine,
  sucheReset,
}: {
  gruppen: BereichsGruppe[];
  lang: string;
  layerThicknessLabel: string;
  suchePlaceholder: string;
  sucheKeine: string;
  sucheReset: string;
}) {
  const [query, setQuery] = useState("");
  const terme = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const sucht = terme.length > 0;

  const gefiltert = useMemo(
    () =>
      gruppen
        .map((g) => ({
          ...g,
          items: g.items.filter((p) => matcht(p, terme)),
          rollen: g.rollen
            ?.map((r) => ({ ...r, items: r.items.filter((p) => matcht(p, terme)) }))
            .filter((r) => r.items.length > 0),
        }))
        .filter((g) => g.items.length > 0),
    // terme wird aus query abgeleitet; query als Dep genügt
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gruppen, query],
  );

  const treffer = gefiltert.reduce((n, g) => n + g.items.length, 0);

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

  return (
    <>
      {/* Suche + Anker-Navigation */}
      <section style={{ padding: "0 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="relative" style={{ maxWidth: 520 }}>
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

          {/* Bereichs-Anker-Chips (nur im Browse-Modus) */}
          {!sucht && (
            <div className="flex flex-wrap gap-2 mt-6">
              {gefiltert.map((group) => (
                <a
                  key={group.slug}
                  href={`#${group.slug}`}
                  className="inline-flex items-center rounded-full border border-bullet-bg bg-white text-navy text-[14px] no-underline transition-colors duration-150 hover:border-cyan hover:text-cyan-text"
                  style={{ padding: "10px 18px", fontWeight: 700, minHeight: 44 }}
                >
                  {group.label}
                  <span className="ml-2 text-navy/40 text-[12px]" style={{ fontWeight: 600 }}>
                    {group.items.length}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {treffer === 0 ? (
        <section style={{ padding: "40px 32px 64px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <p className="text-navy/60 text-[16px]">{sucheKeine}</p>
          </div>
        </section>
      ) : (
        gefiltert.map((group) => (
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
              </h2>

              {group.rollen && group.rollen.length > 0 ? (
                <>
                  {/* Produktart-Subnav-Chips (Browse-Modus, ab 2 Buckets) */}
                  {!sucht && group.rollen.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {group.rollen.map((r) => (
                        <a
                          key={r.key}
                          href={`#${group.slug}-${r.key}`}
                          className="inline-flex items-center rounded-full border border-bullet-bg bg-white/70 text-navy/80 text-[13px] no-underline transition-colors duration-150 hover:border-cyan hover:text-cyan-text"
                          style={{ padding: "8px 14px", fontWeight: 700, minHeight: 40 }}
                        >
                          {r.label}
                          <span className="ml-1.5 text-navy/35 text-[12px]" style={{ fontWeight: 600 }}>
                            {r.items.length}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

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
                </>
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

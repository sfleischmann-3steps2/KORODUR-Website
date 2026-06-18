"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import { AppIcon } from "@/components/ui/icon";
import { withBasePath } from "../lib/basePath";

export type RatgeberCard = {
  slug: string;
  /** Route-Prefix der Quelle: /ratgeber, /branchen oder /schadensbilder. */
  route: string;
  title: string;
  teaser: string;
  themen: string[];
  /** Sektion in der „Alle"-Ansicht: neubau | sanierung | wirtschaftlichkeit | branche. */
  cluster: string;
  bild?: string;
  bildAlt?: string;
};

// Reihenfolge bewusst: Neubau zuerst (Wachstumsfokus, Steffi 2026-06-18).
const CLUSTERS: { key: string; titel: string; sub: string; link?: { href: string; label: string } }[] = [
  { key: "neubau", titel: "Neubau planen", sub: "Das richtige System von Anfang an: Auswahl, Sichtboden, Wirtschaftlichkeit." },
  { key: "sanierung", titel: "Sanieren: Schaden erkennen", sub: "Bodenschaden einordnen und passend instand setzen.", link: { href: "/schadensbilder", label: "Alle Schadensbilder" } },
  { key: "wirtschaftlichkeit", titel: "Wirtschaftlichkeit & Entscheidung", sub: "Kosten, Stillstand und Beratung als Grundlage der Investitionsentscheidung." },
  { key: "branche", titel: "Lösungen nach Branche", sub: "Anforderungen und passende Systeme je Sektor.", link: { href: "/branchen", label: "Branchen-Übersicht" } },
];

const FILTERS: { f: string; label: string }[] = [
  { f: "alle", label: "Alle" },
  { f: "neubau", label: "Neubau" },
  { f: "sanierung", label: "Sanierung" },
  { f: "wirtschaftlichkeit", label: "Wirtschaftlichkeit" },
  { f: "branche", label: "Branche" },
  { f: "schadensbild", label: "Schadensbild" },
];

function Karte({ lang, c }: { lang: string; c: RatgeberCard }) {
  const istSchaden = c.themen.includes("schadensbild");
  return (
    <Link
      href={`/${lang}${c.route}/${c.slug}`}
      className="group flex flex-col rounded-xl border border-bullet-bg bg-white overflow-hidden no-underline text-navy transition-shadow hover:shadow-[0_14px_30px_rgba(0,45,89,0.13)]"
    >
      <div className="relative bg-icon-bg" style={{ aspectRatio: "16 / 9" }}>
        {c.bild ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBasePath(c.bild)} alt={c.bildAlt ?? c.title} className="w-full h-full" style={{ objectFit: "cover" }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "repeating-linear-gradient(45deg,#eef2f8,#eef2f8 12px,#e8edf5 12px,#e8edf5 24px)" }}>
            <span className="text-[11px] font-bold text-navy/40 bg-white border border-bullet-bg rounded-full px-2.5 py-1">
              Grafik folgt
            </span>
          </div>
        )}
        {istSchaden && (
          <span className="absolute top-2.5 left-2.5 text-[11px] font-extrabold uppercase tracking-wide bg-navy/85 text-white px-2 py-1 rounded">
            Schadensbild
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4 pt-4">
        <h3 className="mb-2" style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.25 }}>
          {c.title}
        </h3>
        {c.teaser && (
          <p className="text-navy/65 mb-3.5" style={{ fontSize: 14, lineHeight: 1.55 }}>
            {c.teaser}
          </p>
        )}
        <span className="mt-auto inline-block text-cyan-text font-semibold group-hover:underline" style={{ fontSize: 13 }}>
          Weiterlesen →
        </span>
      </div>
    </Link>
  );
}

export default function RatgeberHub({ lang, cards }: { lang: string; cards: RatgeberCard[] }) {
  const [filter, setFilter] = useState("alle");
  const [query, setQuery] = useState("");

  const treffer = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((c) => {
      const okF = filter === "alle" || c.themen.includes(filter);
      const okQ = !q || `${c.title} ${c.teaser}`.toLowerCase().includes(q);
      return okF && okQ;
    });
  }, [cards, filter, query]);

  const gruppiert = filter === "alle" && !query.trim();

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <Breadcrumb items={[{ label: "Ratgeber" }]} lang={lang} />
        </div>
      </section>

      <section style={{ padding: "16px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <h1 className="mb-4" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}>
            Ratgeber
          </h1>
          <p className="mb-6 text-navy/70" style={{ maxWidth: 720, fontSize: 18, lineHeight: 1.6 }}>
            Fachwissen rund um Industrieböden: vom Neubau über die Systemwahl bis zur Sanierung im laufenden Betrieb. Finden Sie den passenden Einstieg nach Aufgabe, Schadensbild oder Branche.
          </p>

          {/* Suche */}
          <div className="flex items-center gap-2.5 rounded-xl border border-bullet-bg bg-icon-bg px-4 py-3 mb-5" style={{ maxWidth: 520 }}>
            <AppIcon icon={Search} width={18} height={18} strokeWidth={2} className="text-navy opacity-45 shrink-0" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ratgeber durchsuchen …"
              aria-label="Ratgeber durchsuchen"
              className="w-full bg-transparent border-0 outline-none text-navy text-[16px]"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2.5 mb-2" role="tablist" aria-label="Themenfilter">
            {FILTERS.map((f) => (
              <button
                key={f.f}
                onClick={() => setFilter(f.f)}
                role="tab"
                aria-selected={filter === f.f}
                className={`rounded-full border px-4 py-2 text-[14px] cursor-pointer transition-colors duration-150 ${
                  filter === f.f
                    ? "bg-navy border-navy text-white"
                    : "bg-white border-bullet-bg text-navy hover:border-cyan"
                }`}
                style={{ fontWeight: 700 }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Gruppierte „Alle"-Ansicht */}
          {gruppiert ? (
            CLUSTERS.map((cl) => {
              const inCl = cards.filter((c) => c.cluster === cl.key);
              if (inCl.length === 0) return null;
              return (
                <div key={cl.key} className="pt-9">
                  <h2 className="mb-1 flex items-center gap-2.5" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}>
                    {cl.titel}
                    <span className="text-[14px] font-bold text-white bg-cyan rounded-full px-2.5 py-0.5">{inCl.length}</span>
                  </h2>
                  <p className="text-navy/60 mb-5" style={{ fontSize: 15 }}>
                    {cl.sub}
                    {cl.link && (
                      <>
                        {" "}
                        <Link href={`/${lang}${cl.link.href}`} className="text-cyan-text font-bold no-underline hover:underline">
                          {cl.link.label} →
                        </Link>
                      </>
                    )}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inCl.map((c) => (
                      <Karte key={`${c.route}/${c.slug}`} lang={lang} c={c} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="pt-7">
              {treffer.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treffer.map((c) => (
                    <Karte key={`${c.route}/${c.slug}`} lang={lang} c={c} />
                  ))}
                </div>
              ) : (
                <p className="text-navy/55 italic py-6">Keine Artikel zu dieser Auswahl.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

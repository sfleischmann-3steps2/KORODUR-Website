import Link from "next/link";
import Image from "next/image";
import { AppIcon } from "@/components/ui/icon";
import { ChevronRight } from "lucide-react";
import { withBasePath } from "../lib/basePath";
import type { Dictionary } from "../app/[lang]/dictionaries";

// Startseiten-Sektion „Drei Kompetenzfelder" (#428): ersetzt das 8-Kacheln-Grid
// durch die gewichtete Sparten-Struktur aus dem Mockup
// docs/mockups/Startseite-Kompetenzfelder-Mockup.html (GF-Abstimmung 02.07.).
// Feld 1 Industrieboden dominant (Neubau/Sanierung = die bewährten Funnels),
// Feld 2 Betonsanierung mit 4 Unterbereichen, Katzenstreu + 3D-Betondruck als
// abgesetzte Geschäftsbereichs-Streifen. Die /bereiche-Übersicht behält das
// Kachel-Grid (HOME_PORTFOLIO_KACHELN).

// Symbolische Referenzfotos für die beiden Industrieboden-Einstiege (Bild-Policy:
// echte Referenzbilder). Jura-Werkstätten ist Referenz der Alt-Site-Bereichsprosa.
const FUNNEL_BILD: Record<string, string> = {
  neubau: "/images/referenzen/jura-werkstaetten-amberg/hero.jpg",
  sanierung: "/images/referenzen/antolin-wochenend-sanierung/hero.jpg",
};

export default function KompetenzfelderSektion({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  const h = dict.home as Record<string, string>;
  const bt = dict.bereiche as Record<string, string>;

  const funnels = [
    {
      key: "neubau",
      href: `/${lang}/bereiche/industrieboden/neubau/`,
      title: h.kompetenz_inbo_neubau_title,
      text: h.kompetenz_inbo_neubau_text,
      cta: h.kompetenz_inbo_neubau_cta,
    },
    {
      key: "sanierung",
      href: `/${lang}/bereiche/industrieboden/sanierung/`,
      title: h.kompetenz_inbo_sanierung_title,
      text: h.kompetenz_inbo_sanierung_text,
      cta: h.kompetenz_inbo_sanierung_cta,
    },
  ];

  // Reihenfolge nach Relevanz (Mockup-Note 3): Instandsetzung · TW-Behälter ·
  // Infrastruktur · Spezialmörtel. Die Hub-Seite der Sparte folgt mit #430;
  // bis dahin führen nur die vier Kacheln in die Bereiche.
  const betonTiles = [
    { href: `/${lang}/bereiche/betonsanierung/`, title: h.kompetenz_beton_instandsetzung_title, text: h.kompetenz_beton_instandsetzung_text },
    { href: `/${lang}/bereiche/microtop/`, title: h.kompetenz_beton_tw_title, text: h.kompetenz_beton_tw_text },
    { href: `/${lang}/bereiche/infrastruktur/`, title: h.kompetenz_beton_infra_title, text: h.kompetenz_beton_infra_text },
    { href: `/${lang}/bereiche/spezialmoertel/`, title: h.kompetenz_beton_spezial_title, text: h.kompetenz_beton_spezial_text },
  ];

  const quicklinks = [
    { href: `/${lang}/bereiche/industrieboden/#produkte`, label: h.kompetenz_quicklink_gruppen },
    { href: `/${lang}/anwendungsmatrix/`, label: h.kompetenz_quicklink_matrix },
    { href: `/${lang}/loesungsfinder/`, label: h.kompetenz_quicklink_finder },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Feld 1: Industrieboden (dominant, 2 Funnel-Einstiege) */}
      <div className="rounded-xl border border-mid-gray overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-6 sm:px-7">
          <h3 className="text-navy" style={{ fontSize: 24, fontWeight: 800 }}>
            {bt.industrieboden_name}
          </h3>
          <Link
            href={`/${lang}/bereiche/industrieboden/`}
            className="inline-flex items-center gap-1 text-cyan-text text-[14px] no-underline hover:underline"
            style={{ fontWeight: 700 }}
          >
            {h.kompetenz_zum_bereich}
            <AppIcon icon={ChevronRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
        <p className="px-6 sm:px-7 pt-1 text-navy opacity-60 text-[15px]" style={{ maxWidth: 720 }}>
          {h.kompetenz_inbo_sub}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 sm:px-7 pt-5 pb-6">
          {funnels.map((f) => (
            <Link
              key={f.key}
              href={f.href}
              className="group flex flex-col rounded-lg border border-bullet-bg bg-icon-bg overflow-hidden no-underline transition-all duration-200 hover:border-cyan hover:shadow-lg"
            >
              <div className="relative aspect-[16/7] overflow-hidden bg-navy">
                <Image
                  src={withBasePath(FUNNEL_BILD[f.key])}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1.5 p-5">
                <span className="text-navy text-[17px]" style={{ fontWeight: 800 }}>
                  {f.title}
                </span>
                <span className="text-sm text-navy opacity-60 leading-[1.6]">{f.text}</span>
                <span
                  className="inline-flex items-center gap-1 text-cyan-text text-[14px] mt-1"
                  style={{ fontWeight: 700 }}
                >
                  {f.cta}
                  <AppIcon icon={ChevronRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 px-6 sm:px-7 pb-6 text-[14px]">
          {quicklinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="text-cyan-text no-underline hover:underline"
              style={{ fontWeight: 700 }}
            >
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Feld 2: Betonsanierung (4 Unterbereiche); Kopfzeilen-Link auf den
          Sparten-Hub /betonsanierung/ (#430) */}
      <div className="rounded-xl border border-mid-gray overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-6 sm:px-7">
          <h3 className="text-navy" style={{ fontSize: 24, fontWeight: 800 }}>
            {h.kompetenz_beton_title}
          </h3>
          <Link
            href={`/${lang}/betonsanierung/`}
            className="inline-flex items-center gap-1 text-cyan-text text-[14px] no-underline hover:underline"
            style={{ fontWeight: 700 }}
          >
            {h.kompetenz_zum_bereich}
            <AppIcon icon={ChevronRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
        <p className="px-6 sm:px-7 pt-1 text-navy opacity-60 text-[15px]" style={{ maxWidth: 720 }}>
          {h.kompetenz_beton_sub}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 sm:px-7 pt-5 pb-6">
          {betonTiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col gap-1.5 rounded-lg border border-bullet-bg bg-icon-bg p-5 no-underline transition-all duration-200 hover:border-cyan hover:shadow-lg"
            >
              <span className="text-navy text-[16px]" style={{ fontWeight: 700 }}>
                {t.title}
              </span>
              <span className="text-[13px] text-navy opacity-60 leading-[1.6]">{t.text}</span>
              <span
                className="inline-flex items-center gap-1 text-cyan-text text-[13px] mt-1"
                style={{ fontWeight: 700 }}
              >
                {h.kompetenz_mehr}
                <AppIcon icon={ChevronRight} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Feld 3: Katzenstreu als abgesetzter Geschäftsbereichs-Streifen */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-xl border border-mid-gray bg-bullet-bg p-6 sm:p-7">
        <div>
          <span
            className="inline-block bg-navy text-white text-[11px] uppercase rounded px-2.5 py-1 mb-3"
            style={{ fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {bt.katzenstreu_badge}
          </span>
          <h3 className="text-navy mb-1" style={{ fontSize: 20, fontWeight: 800 }}>
            {bt.katzenstreu_name}
          </h3>
          <p className="text-navy opacity-60 text-[14px] leading-[1.6]" style={{ maxWidth: 560 }}>
            {h.kompetenz_katzenstreu_text}
          </p>
        </div>
        <Link
          href={`/${lang}/bereiche/katzenstreu/`}
          className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap text-white no-underline rounded-[6px] bg-navy hover:bg-navy/85 transition-colors duration-200"
          style={{ padding: "12px 24px", fontWeight: 800, fontSize: 14 }}
        >
          {h.kompetenz_katzenstreu_cta}
          <AppIcon icon={ChevronRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>

      {/* 3D-Betondruck: schmale Zeile mit ehrlichem „In Vorbereitung"-Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-mid-gray bg-bullet-bg px-6 py-5 sm:px-7">
        <div>
          <span
            className="inline-block bg-navy/60 text-white text-[11px] uppercase rounded px-2.5 py-1 mb-2"
            style={{ fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {bt.in_vorbereitung}
          </span>
          <h3 className="text-navy mb-0.5" style={{ fontSize: 17, fontWeight: 800 }}>
            {bt["3d-concrete-printing_name"]}
          </h3>
          <p className="text-navy opacity-60 text-[14px] leading-[1.6]" style={{ maxWidth: 560 }}>
            {h.kompetenz_3d_text}
          </p>
        </div>
        <Link
          href={`/${lang}/bereiche/3d-concrete-printing/`}
          className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap text-navy no-underline rounded-[6px] border-2 border-navy hover:bg-navy hover:text-white transition-colors duration-200"
          style={{ padding: "9px 20px", fontWeight: 800, fontSize: 14 }}
        >
          {h.kompetenz_zum_bereich}
          <AppIcon icon={ChevronRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

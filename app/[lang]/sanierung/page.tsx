import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight, Building2, Compass, Grid3x3, Layers, Route, Droplets } from "lucide-react";
import { alternatesFor } from "../../../lib/seo";
import { referenzen } from "../../../data/referenzen";
import { localizeReferenzen } from "../../../data/i18n/getLocalized";
import ReferenceCard from "../../../components/ReferenceCard";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.sanierungHub.title,
    description: dict.sanierungHub.intro,
    alternates: alternatesFor(lang, "/sanierung/"),
  };
}

export default async function SanierungHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  // Sanierungs-Referenzen (analog Neubau-Seite, #86).
  const sanierungRefs = await localizeReferenzen(
    referenzen.filter((r) => r.projekttyp !== "neubau").slice(0, 6),
    lang
  );

  const cards = [
    {
      href: `/${lang}/loesungsfinder/`,
      icon: Compass,
      title: dict.sanierungHub.card_loesungsfinder_title,
      text: dict.sanierungHub.card_loesungsfinder_text,
    },
    {
      href: `/${lang}/anwendungsmatrix/`,
      icon: Grid3x3,
      title: dict.sanierungHub.card_matrix_title,
      text: dict.sanierungHub.card_matrix_text,
    },
    {
      href: `/${lang}/referenzen/`,
      icon: Building2,
      title: dict.sanierungHub.card_referenzen_title,
      text: dict.sanierungHub.card_referenzen_text,
    },
  ];

  // Sanierungs-Schwerpunkte (Steffi 2026-06-13): Sanierung ist breiter als
  // Industrieboden — Infrastruktur (Bereich kommt noch → Platzhalter) und
  // Trinkwasser & Spezial (MICROTOP für Trinkwasser, Rapid Set für Schnellreparatur).
  const schwerpunkte: Array<{
    href: string | null;
    icon: typeof Layers;
    title: string;
    text: string;
    badge: string | null;
  }> = [
    { href: `/${lang}/bereiche/industrieboden/`, icon: Layers, title: dict.sanierungHub.sp_industrieboden_title, text: dict.sanierungHub.sp_industrieboden_text, badge: null },
    { href: null, icon: Route, title: dict.sanierungHub.sp_infrastruktur_title, text: dict.sanierungHub.sp_infrastruktur_text, badge: dict.sanierungHub.sp_infrastruktur_badge },
    { href: `/${lang}/bereiche/microtop/`, icon: Droplets, title: dict.sanierungHub.sp_trinkwasser_title, text: dict.sanierungHub.sp_trinkwasser_text, badge: null },
  ];

  return (
    <>
      <section style={{ padding: "48px 32px 40px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 800 }}>
          {/* Slogan hier statt im Footer (Steffi, 2026-06-11) */}
          <p
            className="text-cyan-text text-[13px] uppercase tracking-[0.2em] mb-4"
            style={{ fontWeight: 700 }}
          >
            {dict.sanierungHub.slogan}
          </p>
          <h1
            className="mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {dict.sanierungHub.title}
          </h1>
          <p className="text-navy/70 m-0" style={{ fontSize: 18, lineHeight: 1.7 }}>
            {dict.sanierungHub.intro}
          </p>
        </div>
      </section>

      {/* Sanierungs-Schwerpunkte: macht sichtbar, dass Sanierung breiter ist als
          Industrieboden (Infrastruktur, Trinkwasser/Spezial mit MICROTOP + Rapidset). */}
      <section style={{ padding: "8px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <h2 className="text-navy text-center mb-8" style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 900 }}>
            {dict.sanierungHub.schwerpunkte_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {schwerpunkte.map((sp) => {
              const inner = (
                <div
                  className={`bg-white border p-7 flex flex-col gap-4 h-full transition-all duration-200 ${
                    sp.href
                      ? "border-bullet-bg group-hover:border-cyan group-hover:-translate-y-1 group-hover:shadow-lg"
                      : "border-dashed border-mid-gray opacity-80"
                  }`}
                  style={{ borderRadius: 14 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-icon-bg">
                    <AppIcon icon={sp.icon} width={24} height={24} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-navy text-[19px] m-0" style={{ fontWeight: 900 }}>{sp.title}</h3>
                    {sp.badge && (
                      <span className="text-[11px] uppercase tracking-wide rounded px-2 py-0.5 bg-icon-bg text-navy/50" style={{ fontWeight: 800 }}>
                        {sp.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-navy/60 text-[14px] m-0 leading-[1.6]">{sp.text}</p>
                  {sp.href && (
                    <span className="inline-flex items-center gap-1.5 text-cyan-text text-[14px] mt-auto" style={{ fontWeight: 700 }}>
                      {dict.sanierungHub.cta}
                      <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  )}
                </div>
              );
              return sp.href ? (
                <Link key={sp.title} href={sp.href} className="no-underline group block">
                  {inner}
                </Link>
              ) : (
                <div key={sp.title} className="block">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "16px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card) => (
              <Link key={card.href} href={card.href} className="no-underline group block">
                <div
                  className="bg-white border border-bullet-bg p-7 flex flex-col gap-4 h-full transition-all duration-200 group-hover:border-cyan group-hover:-translate-y-1 group-hover:shadow-lg"
                  style={{ borderRadius: 14 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-icon-bg">
                    <AppIcon icon={card.icon} width={24} height={24} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
                  </div>
                  <h2 className="text-navy text-[19px] m-0" style={{ fontWeight: 900 }}>
                    {card.title}
                  </h2>
                  <p className="text-navy/60 text-[14px] m-0 leading-[1.6]">{card.text}</p>
                  <span className="inline-flex items-center gap-1.5 text-cyan-text text-[14px] mt-auto" style={{ fontWeight: 700 }}>
                    {dict.sanierungHub.cta}
                    <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${lang}/loesungsfinder/`}
              className="inline-flex items-center justify-center text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
              style={{ padding: "16px 32px", fontWeight: 800, fontSize: 16, minHeight: 44 }}
            >
              {dict.sanierungHub.cta}
            </Link>
          </div>
        </div>
      </section>

      {sanierungRefs.length > 0 && (
        <section className="bg-icon-bg" style={{ padding: "64px 32px 72px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="text-center mb-10" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900 }}>
              {dict.sanierungHub.referenzen_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sanierungRefs.map((ref) => (
                <ReferenceCard key={ref.id} referenz={ref} lang={lang} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={`/${lang}/referenzen/?projektart=sanierung`}
                className="inline-flex items-center gap-2 text-cyan-text text-[15px] no-underline hover:underline"
                style={{ fontWeight: 700 }}
              >
                {dict.home.featured_link}
                <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Kontakt-CTA — Sanierungs-Beratung (#86) */}
      <section className="bg-navy text-white text-center" style={{ padding: "64px 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900 }}>
            {dict.home.cta_title}
          </h2>
          <p className="text-white/70 mb-8" style={{ fontSize: 18, lineHeight: 1.65 }}>
            {dict.home.cta_description}
          </p>
          <Link
            href={`/${lang}/kontakt/`}
            className="inline-block text-white no-underline rounded-[6px] border-2 border-white/40 hover:bg-white/10 transition-colors duration-200"
            style={{ padding: "16px 34px", fontWeight: 800, fontSize: 16, minHeight: 44 }}
          >
            {dict.nav.kontakt}
          </Link>
        </div>
      </section>
    </>
  );
}

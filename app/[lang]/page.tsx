import type { Metadata } from "next";
import Link from "next/link";
import ReferenceCard from "../../components/ReferenceCard";
import { getReferenzBySlug } from "../../data/referenzen";
import { localizeReferenzen } from "../../data/i18n/getLocalized";
import { FEATURED_SLUGS } from "../../data/featured";
import PortfolioGrid from "../../components/PortfolioGrid";
import { HOME_PORTFOLIO_KACHELN } from "../../data/bereiche";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { withBasePath } from "../../lib/basePath";
import { alternatesFor } from "../../lib/seo";
import { AppIcon } from "@/components/ui/icon";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    // Absolut statt Template: Die Startseite braucht den Markennamen vorne
    // in der SERP, nicht als "%s | KORODUR"-Anhang am Hero-Satz.
    title: { absolute: dict.home.meta_title },
    description: `${dict.home.hero_subtitle} ${dict.home.hero_subtitle_2}`,
    alternates: alternatesFor(lang, "/"),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  // Featured references (lokalisiert — sonst zeigen EN/FR/PL deutsche Titel)
  const featuredRefs = await localizeReferenzen(
    FEATURED_SLUGS
      .map((slug) => getReferenzBySlug(slug))
      .filter((r): r is NonNullable<typeof r> => r !== undefined),
    lang
  );

  // Finder steps
  // 4 Schritte (Steffi 2026-06-13, #89): "Ergebnisse" ist kein Schritt.
  const finderSteps = [
    dict.home.finder_step1,
    dict.home.finder_step2,
    dict.home.finder_step3,
    dict.home.finder_step4,
  ];

  return (
    <>
      {/* Section 1: Full-Bleed-Hero mit Key Visual 1920x1080 (Steffi, 2026-06-12;
          Original: docs/reference/brand/KeyVisual_1920x1080_original.jpg).
          Navy-Gradient links für Text-Lesbarkeit, Amboss-Motiv bleibt rechts sichtbar. */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: 440 }}>
        {/* Manuelles <picture> statt next/image: Bei images.unoptimized gibt es
            kein automatisches Resizing — Mobilgeräte bekamen das volle
            1920px-JPEG (Lighthouse: mobile LCP 4,2s). Die 828px-WebP-Ableitung
            (39 KB) wird über die Media Query ausgeliefert. */}
        <picture>
          <source
            media="(max-width: 828px)"
            srcSet={withBasePath("/images/brand/hero-keyvisual-mobile.webp")}
          />
          <img
            src={withBasePath("/images/brand/hero-keyvisual.jpg")}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            // #295: Amboss-Oberkante nicht anschneiden — Fokus etwas höher als center.
            style={{ objectPosition: "50% 25%" }}
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,45,89,0.93) 0%, rgba(0,45,89,0.88) 30%, rgba(0,45,89,0.55) 45%, rgba(0,45,89,0.15) 60%, rgba(0,45,89,0) 70%)",
          }}
        />
        {/* #227: Text links, 2 CTAs rechts auf Höhe des Sub-Textes (lg);
            Hero kompakter → Produktportfolio above-the-fold. Mobil gestapelt. */}
        <div className="relative mx-auto max-w-[1320px] flex flex-col justify-center px-4 pt-12 pb-14 sm:px-8 md:pt-[68px] md:pb-[80px] md:min-h-[440px] lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-12">
          {/* Text links */}
          <div>
            <p
              className="text-cyan text-[13px] uppercase tracking-[0.2em] mb-5"
              style={{ fontWeight: 700 }}
            >
              {dict.home.hero_kicker}
            </p>
            <h1
              className="leading-[1.08] mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 900,
                maxWidth: 640,
                color: "var(--white)",
              }}
            >
              {dict.home.hero_title}
            </h1>
            <p
              className="text-white/85 mb-0 leading-[1.7]"
              style={{ fontSize: 18, maxWidth: 520 }}
            >
              {dict.home.hero_subtitle}
              <br />
              {dict.home.hero_subtitle_2}
            </p>
          </div>
          {/* CTAs rechts (lg gestapelt, bündig zur Subtext-Unterkante) */}
          <div className="flex flex-wrap gap-4 mt-8 lg:mt-0 lg:flex-col lg:flex-nowrap lg:pb-1">
            <Link
              href={`/${lang}/loesungsfinder/`}
              className="inline-block text-center text-navy no-underline rounded-[8px] bg-white shadow-[0_8px_28px_rgba(0,45,89,0.35)] hover:shadow-[0_10px_34px_rgba(0,45,89,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              style={{ padding: "20px 40px", fontWeight: 900, fontSize: 17 }}
            >
              {dict.home.hero_cta}
            </Link>
            <Link
              href={`/${lang}/produkte/`}
              className="inline-block text-center text-white no-underline rounded-[8px] bg-navy/40 border-2 border-white/70 hover:bg-navy/60 hover:border-white transition-colors duration-200"
              style={{ padding: "18px 38px", fontWeight: 800, fontSize: 16 }}
            >
              {dict.home.hero_cta_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1b: Bereichs-Grid */}
      <section id="bereiche" className="bg-white scroll-mt-24" style={{ padding: "56px 32px 80px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h2
            className="text-center mb-4"
            style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, lineHeight: 1.12 }}
          >
            {dict.home.bereiche_title}
          </h2>
          <p
            className="text-center text-navy opacity-60 mb-12 mx-auto"
            // #295: Breite erhöht (600→880), damit die Subline auf Desktop einzeilig bleibt.
            style={{ maxWidth: 880, fontSize: 18 }}
          >
            {dict.home.bereiche_subtitle}
          </p>
          <PortfolioGrid lang={lang} dict={dict} tiles={HOME_PORTFOLIO_KACHELN} />
        </div>
      </section>

      {/* #227: schmaler Beratungs-CTA zwischen Portfolio-Grid und Referenzen */}
      <section className="bg-icon-bg border-y border-bullet-bg" style={{ padding: "24px 32px" }}>
        <div
          className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-center"
          style={{ maxWidth: 1320 }}
        >
          <span className="text-navy text-[17px]" style={{ fontWeight: 700 }}>
            {dict.home.beratung_lead}
          </span>
          <Link
            href={`/${lang}/kontakt/`}
            className="inline-flex items-center gap-2 text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
            style={{ padding: "12px 24px", fontWeight: 800, fontSize: 15 }}
          >
            {dict.home.beratung_cta}
            <AppIcon icon={ChevronRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Section 2: Featured Referenzen */}
      {featuredRefs.length > 0 && (
        <section className="bg-white" style={{ padding: "88px 32px 100px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2
              className="text-center mb-12"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, lineHeight: 1.12 }}
            >
              {dict.home.featured_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredRefs.map((ref) => (
                <ReferenceCard key={ref.id} referenz={ref} lang={lang} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={`/${lang}/referenzen/`}
                className="inline-flex items-center gap-2 text-cyan-text text-[15px] no-underline hover:underline"
                style={{ fontWeight: 700 }}
              >
                {dict.home.featured_link}
                <AppIcon icon={ChevronRight} width={16} height={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Lösungsfinder-Teaser */}
      <section className="bg-icon-bg" style={{ padding: "88px 32px 100px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 900 }}>
          <h2
            className="mb-4"
            style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, lineHeight: 1.12 }}
          >
            {dict.home.finder_teaser_title}
          </h2>
          {/* Step indicators: 1·2·3·4 mit Verbindungslinie */}
          <div className="flex items-start justify-center mb-10 mt-2">
            {finderSteps.map((label, i) => (
              <div key={i} className="flex items-start">
                <div className="flex flex-col items-center gap-3" style={{ width: 96 }}>
                  <div
                    className="w-[52px] h-[52px] flex items-center justify-center text-white text-[19px] rounded-full"
                    style={{ backgroundColor: "var(--cyan)", fontWeight: 900, boxShadow: "0 6px 16px rgba(0,158,227,0.35)" }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-navy text-[13px] text-center leading-tight" style={{ fontWeight: 700 }}>
                    {label}
                  </span>
                </div>
                {i < finderSteps.length - 1 && (
                  <div
                    className="hidden sm:block"
                    style={{ width: 32, height: 2, marginTop: 25, backgroundColor: "var(--cyan)", opacity: 0.3 }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <Link
            href={`/${lang}/loesungsfinder/`}
            className="inline-flex items-center gap-2 text-white no-underline rounded-lg bg-cyan hover:bg-cyan-hover transition-colors duration-200"
            style={{ padding: "18px 36px", fontWeight: 800, fontSize: 17, boxShadow: "0 10px 24px rgba(0,158,227,0.30)" }}
          >
            {dict.home.finder_teaser_cta}
            <AppIcon icon={ChevronRight} width={18} height={18} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Section 5: CTA + Footer area — #227: Navy-Block schlanker (72→48) */}
      <section className="bg-navy text-white text-center" style={{ padding: "48px 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900 }}>
            {dict.home.cta_title}
          </h2>
          <p className="text-white opacity-70 mb-8" style={{ fontSize: 18, lineHeight: 1.65 }}>
            {dict.home.cta_description}
          </p>
          <Link
            href={`/${lang}/kontakt/`}
            className="inline-block text-white no-underline rounded-[6px] border-2 border-white/40 hover:bg-white/10 transition-colors duration-200"
            style={{ padding: "14px 28px", fontWeight: 800, fontSize: 15 }}
          >
            {dict.home.cta_button}
          </Link>
        </div>
      </section>
    </>
  );
}

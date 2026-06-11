import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReferenceCard from "../../components/ReferenceCard";
import { getReferenzBySlug, referenzen } from "../../data/referenzen";
import { FEATURED_SLUGS } from "../../data/featured";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { withBasePath } from "../../lib/basePath";
import { AppIcon } from "@/components/ui/icon";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.home.hero_title,
    description: dict.home.hero_subtitle,
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

  // Featured references
  const featuredRefs = FEATURED_SLUGS
    .map((slug) => getReferenzBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => r !== undefined);

  // Outdoor references: Einsatzbereiche enthalten Infrastruktur/Zufahrten oder Parkdeck
  const outdoorRefs = referenzen
    .filter(
      (r) =>
        r.einsatzbereiche.includes("infrastruktur-zufahrten") ||
        r.einsatzbereiche.includes("parkdeck")
    )
    .slice(0, 2);

  // Finder steps
  const finderSteps = [
    dict.home.finder_step1,
    dict.home.finder_step2,
    dict.home.finder_step3,
    dict.home.finder_step4,
    dict.home.finder_step5,
  ];

  return (
    <>
      {/* Section 1: Hero (Full-width Image with Gradient) */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: 560 }}>
        <Image
          src={withBasePath("/images/hero.jpg")}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient: links stark Navy → rechts transparent, Bild rechts sichtbar */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(0,45,89,0.93) 0%, rgba(0,45,89,0.88) 30%, rgba(0,45,89,0.55) 45%, rgba(0,45,89,0.15) 60%, rgba(0,45,89,0) 70%)",
          }}
        />
        <div
          className="relative mx-auto flex max-w-[1320px] flex-col justify-center px-4 pt-16 pb-20 sm:px-8 md:pt-[120px] md:pb-[140px] md:min-h-[560px]"
        >
          <p
            className="text-cyan text-[13px] uppercase tracking-[0.2em] mb-5"
            style={{ fontWeight: 700 }}
          >
            KORODUR Sanierung
          </p>
          <h1
            className="leading-[1.08] mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 900,
              maxWidth: 650,
              color: "var(--white)",
            }}
          >
            {dict.home.hero_title}
          </h1>
          <p
            className="text-white/80 mb-10 leading-[1.7]"
            style={{ fontSize: 18, maxWidth: 520 }}
          >
            {dict.home.hero_subtitle}
          </p>
          <div>
            <Link
              href={`/${lang}/loesungsfinder/`}
              className="inline-block text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
              style={{ padding: "18px 36px", fontWeight: 800, fontSize: 16 }}
            >
              {dict.home.hero_cta}
            </Link>
          </div>
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
                className="inline-flex items-center gap-2 text-cyan text-[15px] no-underline hover:underline"
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
          <p
            className="text-navy opacity-60 mb-12 mx-auto"
            style={{ maxWidth: 600, fontSize: 18 }}
          >
            {dict.home.finder_teaser_description}
          </p>

          {/* Step indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {finderSteps.map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div
                  className="w-[52px] h-[52px] flex items-center justify-center text-white text-[18px] rounded-full"
                  style={{ backgroundColor: "var(--cyan)", fontWeight: 900 }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-navy text-[14px]"
                  style={{ fontWeight: 700 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href={`/${lang}/loesungsfinder/`}
            className="inline-block text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
            style={{ padding: "16px 30px", fontWeight: 800, fontSize: 15 }}
          >
            {dict.home.finder_teaser_cta}
          </Link>
        </div>
      </section>

      {/* Section 4: Außenflächen Cross-Selling */}
      {outdoorRefs.length > 0 && (
        <section className="bg-white" style={{ padding: "88px 32px 100px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2
              className="text-center mb-4"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, lineHeight: 1.12 }}
            >
              {dict.home.outdoor_title}
            </h2>
            <p
              className="text-center text-navy opacity-60 mb-12 mx-auto"
              style={{ maxWidth: 600, fontSize: 18 }}
            >
              {dict.home.outdoor_description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 880, margin: "0 auto" }}>
              {outdoorRefs.map((ref) => (
                <ReferenceCard key={ref.id} referenz={ref} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 5: CTA + Footer area */}
      <section className="bg-navy text-white text-center" style={{ padding: "72px 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900 }}>
            {dict.home.cta_title}
          </h2>
          <p className="text-white opacity-70 mb-8" style={{ fontSize: 18, lineHeight: 1.65 }}>
            {dict.home.cta_description}
          </p>
          <a
            href="https://www.korodur.de/kontakt/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white no-underline rounded-[6px] border-2 border-white/40 hover:bg-white/10 transition-colors duration-200"
            style={{ padding: "14px 28px", fontWeight: 800, fontSize: 15 }}
          >
            {dict.home.cta_button}
          </a>
        </div>
      </section>
    </>
  );
}

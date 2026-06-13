import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight, Building2, Sparkles, Package } from "lucide-react";
import { alternatesFor } from "../../../lib/seo";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.neubauHub.title,
    description: dict.neubauHub.intro,
    alternates: alternatesFor(lang, "/neubau/"),
  };
}

// Neubau-Strecke (Steffi, 2026-06-13): drei Produktwelten — Industrieboden,
// Sichtestrich (inkl. Verkaufsraum/Showroom), Spezialbaustoffe (Sammelbereich
// inkl. 3D-Druck, Rest in Abstimmung mit den Kollegen). Card-Titel/Teaser aus
// dict.bereiche.*; Farbwelt Navy (Kerngeschäft). Infrastruktur liegt bewusst
// im Sanierungs-Strang, nicht hier.
export default async function NeubauHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const cards = [
    { slug: "industrieboden", icon: Building2 },
    { slug: "sichtestrich", icon: Sparkles },
    { slug: "spezialbaustoffe", icon: Package },
  ] as const;

  return (
    <>
      <section style={{ padding: "48px 32px 40px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 800 }}>
          <p
            className="text-cyan-text text-[13px] uppercase tracking-[0.2em] mb-4"
            style={{ fontWeight: 700 }}
          >
            {dict.neubauHub.slogan}
          </p>
          <h1
            className="mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {dict.neubauHub.title}
          </h1>
          <p className="text-navy/70 m-0" style={{ fontSize: 18, lineHeight: 1.7 }}>
            {dict.neubauHub.intro}
          </p>
        </div>
      </section>

      <section style={{ padding: "16px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card) => (
              <Link key={card.slug} href={`/${lang}/bereiche/${card.slug}/`} className="no-underline group block">
                <div
                  className="bg-white border border-bullet-bg p-7 flex flex-col gap-4 h-full transition-all duration-200 group-hover:border-navy group-hover:-translate-y-1 group-hover:shadow-lg"
                  style={{ borderRadius: 14 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-navy">
                    <AppIcon icon={card.icon} width={24} height={24} strokeWidth={2} className="text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-navy text-[19px] m-0" style={{ fontWeight: 900 }}>
                    {dict.bereiche[`${card.slug}_name`]}
                  </h2>
                  <p className="text-navy/60 text-[14px] m-0 leading-[1.6]">
                    {dict.bereiche[`${card.slug}_teaser`]}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-cyan-text text-[14px] mt-auto" style={{ fontWeight: 700 }}>
                    {dict.neubauHub.cta}
                    <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${lang}/loesungsfinder/`}
              className="inline-flex items-center justify-center text-white no-underline rounded-[6px] bg-navy hover:bg-navy/90 transition-colors duration-200"
              style={{ padding: "16px 32px", fontWeight: 800, fontSize: 16, minHeight: 44 }}
            >
              {dict.neubauHub.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

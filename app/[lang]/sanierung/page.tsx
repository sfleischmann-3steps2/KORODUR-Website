import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight, Building2, Compass, Grid3x3 } from "lucide-react";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.sanierungHub.title, description: dict.sanierungHub.intro };
}

export default async function SanierungHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

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

  return (
    <>
      <section style={{ padding: "48px 32px 40px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 800 }}>
          {/* Slogan hier statt im Footer (Steffi, 2026-06-11) */}
          <p
            className="text-cyan text-[13px] uppercase tracking-[0.2em] mb-4"
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
                    <AppIcon icon={card.icon} width={24} height={24} strokeWidth={2} className="text-cyan" aria-hidden="true" />
                  </div>
                  <h2 className="text-navy text-[19px] m-0" style={{ fontWeight: 900 }}>
                    {card.title}
                  </h2>
                  <p className="text-navy/60 text-[14px] m-0 leading-[1.6]">{card.text}</p>
                  <span className="inline-flex items-center gap-1.5 text-cyan text-[14px] mt-auto" style={{ fontWeight: 700 }}>
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
    </>
  );
}

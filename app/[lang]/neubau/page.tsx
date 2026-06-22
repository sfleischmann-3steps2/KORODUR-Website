import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight } from "lucide-react";
import { alternatesFor } from "../../../lib/seo";
import { referenzen } from "../../../data/referenzen";
import { localizeReferenzen } from "../../../data/i18n/getLocalized";
import ReferenceCard from "../../../components/ReferenceCard";
import { bereichIcon } from "../../../components/bereichIcons";

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

  // Neubau-Referenzen (Korb 2026-06-13, #85). Aktuell alle Sichtestrich/Design;
  // sobald Industrieboden-/Spezial-Neubau-Refs importiert sind, kann nach
  // Bereich gegliedert werden.
  const neubauRefs = await localizeReferenzen(
    referenzen.filter((r) => r.projekttyp === "neubau").slice(0, 6),
    lang
  );

  const cards = [
    { slug: "industrieboden", preview: false },
    { slug: "sichtestrich", preview: false },
    { slug: "spezialmoertel", preview: false },
    // #257: 3D-Betondruck unter Neubau sichtbar einsortiert. Bereich hat
    // (noch) keine Produkte — Content/Produkte folgen von der Technik (W2),
    // daher als "In Vorbereitung" markiert (gestrichelt + Badge).
    { slug: "3d-concrete-printing", preview: true },
  ] as const;
  const bt = dict.bereiche as Record<string, string>;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card) => (
              <Link key={card.slug} href={`/${lang}/bereiche/${card.slug}/`} className="no-underline group block">
                <div
                  className={`bg-white border p-7 flex flex-col gap-4 h-full transition-all duration-200 group-hover:border-navy group-hover:-translate-y-1 group-hover:shadow-lg ${
                    card.preview ? "border-dashed border-mid-gray" : "border-bullet-bg"
                  }`}
                  style={{ borderRadius: 14 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-navy">
                    <AppIcon icon={bereichIcon(card.slug)} width={24} height={24} strokeWidth={2} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-navy text-[19px] m-0" style={{ fontWeight: 900 }}>
                      {bt[`${card.slug}_name`]}
                    </h2>
                    {card.preview && (
                      <span className="text-[11px] uppercase tracking-wide rounded px-2 py-0.5 bg-icon-bg text-navy/50" style={{ fontWeight: 800 }}>
                        {bt.in_vorbereitung}
                      </span>
                    )}
                  </div>
                  <p className="text-navy/60 text-[14px] m-0 leading-[1.6]">
                    {bt[`${card.slug}_teaser`]}
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

      {neubauRefs.length > 0 && (
        <section className="bg-icon-bg" style={{ padding: "64px 32px 72px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="text-center mb-10" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900 }}>
              {dict.neubauHub.referenzen_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {neubauRefs.map((ref) => (
                <ReferenceCard key={ref.id} referenz={ref} lang={lang} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={`/${lang}/referenzen/?projektart=neubau`}
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

      {/* Kontakt-CTA — Kerngeschäft Neubau führt zur Beratung (#85) */}
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

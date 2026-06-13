import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import { alternatesFor } from "../../../lib/seo";
import { AppIcon } from "@/components/ui/icon";
import { ChevronRight, LayoutGrid } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.home.bereiche_title,
    description: dict.home.bereiche_subtitle,
    alternates: alternatesFor(lang, "/bereiche/"),
  };
}

// Kuratierte Reihenfolge der Bereiche-Übersicht (Steffi, 2026-06-13).
// Neubau/Sanierung bleiben eigene Nav-Punkte; hier nur die Produktdomänen.
// Infrastruktur ist (noch) ein Platzhalter-Bereich ("bald verfügbar").
const TILE_SLUGS = [
  "industrieboden",
  "rapid-set",
  "infrastruktur",
  "sichtestrich",
  "microtop",
  "spezialbaustoffe",
  "katzenstreu",
] as const;

export default async function BereicheOverview({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const bt = dict.bereiche as Record<string, string>;

  return (
    <section className="bg-white" style={{ padding: "64px 32px 100px" }}>
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <h1
          className="text-center mb-4"
          style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, lineHeight: 1.12 }}
        >
          {dict.home.bereiche_title}
        </h1>
        <p
          className="text-center text-navy opacity-60 mb-12 mx-auto"
          style={{ maxWidth: 620, fontSize: 18 }}
        >
          {dict.home.bereiche_subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TILE_SLUGS.map((slug) => {
            const isInfra = slug === "infrastruktur";
            const isKatze = slug === "katzenstreu";
            const name = isInfra ? dict.sanierungHub.sp_infrastruktur_title : bt[`${slug}_name`];
            const teaser = isInfra ? dict.sanierungHub.sp_infrastruktur_text : bt[`${slug}_teaser`];

            const cardClass = `flex flex-col gap-2 rounded-xl bg-white p-6 no-underline transition-all duration-200 ${
              isInfra
                ? "border border-dashed border-mid-gray opacity-90 cursor-default"
                : isKatze
                  ? "border border-dashed border-mid-gray hover:border-cyan hover:shadow-lg"
                  : "border border-bullet-bg hover:border-cyan hover:shadow-lg"
            }`;

            const inner = (
              <>
                {isInfra && (
                  <span
                    className="self-start bg-icon-bg text-navy text-xs rounded-full px-2 py-1"
                    style={{ fontWeight: 700 }}
                  >
                    {dict.sanierungHub.sp_infrastruktur_badge}
                  </span>
                )}
                {isKatze && (
                  <span
                    className="self-start bg-icon-bg text-navy text-xs rounded-full px-2 py-1"
                    style={{ fontWeight: 700 }}
                  >
                    {dict.bereiche.katzenstreu_badge}
                  </span>
                )}
                <span
                  className="flex items-center justify-between gap-2 text-navy text-[17px]"
                  style={{ fontWeight: 800 }}
                >
                  {name}
                  {!isInfra && (
                    <AppIcon
                      icon={ChevronRight}
                      width={18}
                      height={18}
                      strokeWidth={2}
                      className="text-cyan shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className="text-sm text-navy opacity-60 leading-[1.6]">{teaser}</span>
              </>
            );

            return isInfra ? (
              <div key={slug} className={cardClass}>
                {inner}
              </div>
            ) : (
              <Link key={slug} href={`/${lang}/bereiche/${slug}/`} className={cardClass}>
                {inner}
              </Link>
            );
          })}

          {/* Gesamtkatalog-Kachel (Navy, hebt sich ab) */}
          <Link
            href={`/${lang}/produkte/`}
            className="flex flex-col gap-2 rounded-xl bg-navy text-white p-6 no-underline transition-all duration-200 hover:shadow-lg"
          >
            <span className="self-start" aria-hidden="true">
              <AppIcon icon={LayoutGrid} width={22} height={22} strokeWidth={2} className="text-cyan" />
            </span>
            <span
              className="flex items-center justify-between gap-2 text-white text-[17px]"
              style={{ fontWeight: 800 }}
            >
              {dict.bereiche.alle_produkte_name}
              <AppIcon icon={ChevronRight} width={18} height={18} strokeWidth={2} className="text-cyan shrink-0" aria-hidden="true" />
            </span>
            <span className="text-sm text-white/70 leading-[1.6]">
              {dict.bereiche.alle_produkte_teaser}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

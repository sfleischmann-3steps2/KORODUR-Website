import Link from "next/link";
import { AppIcon } from "@/components/ui/icon";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { bereichIcon } from "./bereichIcons";
import { PORTFOLIO_SLUGS } from "../data/bereiche";
import type { Dictionary } from "../app/[lang]/dictionaries";

// Gemeinsames Produktportfolio-Grid (#188): identisch auf Homepage und
// /bereiche-Übersicht. Zeigt die 7 kuratierten Bereiche; `infrastruktur` als
// nicht-klickbaren „Bald verfügbar"-Platzhalter, `katzenstreu` als eigenen
// Geschäftsbereich (gestrichelt + Badge). Optional die Navy-Katalog-Kachel.
export default function PortfolioGrid({
  lang,
  dict,
  withCatalogTile = false,
}: {
  lang: string;
  dict: Dictionary;
  withCatalogTile?: boolean;
}) {
  const bt = dict.bereiche as Record<string, string>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {PORTFOLIO_SLUGS.map((slug) => {
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
            <span
              className={`flex items-center justify-center w-11 h-11 rounded-xl mb-1 ${isInfra ? "bg-icon-bg" : "bg-navy"}`}
              aria-hidden="true"
            >
              <AppIcon
                icon={bereichIcon(slug)}
                width={22}
                height={22}
                strokeWidth={2}
                className={isInfra ? "text-mid-gray" : "text-white"}
              />
            </span>
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

      {withCatalogTile && (
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
      )}
    </div>
  );
}

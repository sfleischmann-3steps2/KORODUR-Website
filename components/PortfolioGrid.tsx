import Link from "next/link";
import Image from "next/image";
import { AppIcon } from "@/components/ui/icon";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { bereichIcon } from "./bereichIcons";
import { PORTFOLIO_SLUGS, type PortfolioKachel } from "../data/bereiche";
import { withBasePath } from "../lib/basePath";
import type { Dictionary } from "../app/[lang]/dictionaries";

// Symbolische Referenzfotos je Bereich (#228). Bewusst in der Component (Track B),
// NICHT in data/bereiche.ts. Echte Referenzbilder (Bild-Policy); Katzenstreu hebt
// sich farblich ab (Benticat). Fehlt ein Bild, fällt die Kachel auf das Icon zurück.
const BEREICH_KACHELBILD: Record<string, string> = {
  industrieboden: "/images/referenzen/kleemann-produktionshalle/hero.jpg",
  "rapid-set": "/images/referenzen/dhl-ueberadebruecken/hero.jpg",
  infrastruktur: "/images/referenzen/catania.jpg",
  microtop: "/images/referenzen/trinkwasserturm-budapest/hero.jpg",
  spezialmoertel: "/images/referenzen/hauptbahnhofsvorplatz-landau/hero.jpg",
  katzenstreu: "/images/portfolio/katzenstreu.webp",
};

// Gemeinsames Produktportfolio-Grid (#188/#228): identisch auf Homepage und
// /bereiche-Übersicht. Zeigt die 7 kuratierten Bereiche mit symbolischem
// Referenzbild; `infrastruktur` ist seit #216 ein echter Bereich, `katzenstreu`
// bleibt eigener Geschäftsbereich (gestrichelt + Badge). Optional Navy-Katalog-Kachel.
export default function PortfolioGrid({
  lang,
  dict,
  withCatalogTile = false,
  tiles,
}: {
  lang: string;
  dict: Dictionary;
  withCatalogTile?: boolean;
  /** Optionale eigene Kachelliste (Home: 8 Kacheln, #352). Default = die 6
   *  Portfolio-Bereiche aus PORTFOLIO_SLUGS (z. B. /bereiche-Übersicht). */
  tiles?: PortfolioKachel[];
}) {
  const bt = dict.bereiche as Record<string, string>;
  const kacheln: PortfolioKachel[] =
    tiles ??
    PORTFOLIO_SLUGS.map((slug) => ({
      dictKey: slug,
      iconSlug: slug,
      href: `bereiche/${slug}/`,
      bild: BEREICH_KACHELBILD[slug],
      abgegrenzt: slug === "katzenstreu",
    }));
  // #253: Solange Beispiele vorläufig sind, sichtbar als Platzhalter taggen.
  const zeigeBeispielHinweis = kacheln.some((k) => bt[`${k.dictKey}_beispiele`]);

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kacheln.map((kachel) => {
        const isKatze = kachel.dictKey === "katzenstreu";
        const name = bt[`${kachel.dictKey}_name`];
        const teaser = bt[`${kachel.dictKey}_teaser`];
        const beispiele = bt[`${kachel.dictKey}_beispiele`];
        const bild = kachel.bild ?? BEREICH_KACHELBILD[kachel.iconSlug];

        const cardClass = `group flex flex-col rounded-xl bg-white overflow-hidden no-underline transition-all duration-200 ${
          kachel.abgegrenzt
            ? "border border-dashed border-mid-gray hover:border-cyan hover:shadow-lg"
            : "border border-bullet-bg hover:border-cyan hover:shadow-lg"
        }`;

        return (
          <Link key={kachel.dictKey} href={`/${lang}/${kachel.href}`} className={cardClass}>
            {/* Bild-Banner (symbolisches Referenzfoto); Fallback: Icon auf Navy */}
            <div className="relative aspect-[16/10] overflow-hidden bg-navy">
              {bild ? (
                <Image
                  src={withBasePath(bild)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <AppIcon icon={bereichIcon(kachel.iconSlug)} width={36} height={36} strokeWidth={1.75} className="text-white" />
                </span>
              )}
              {isKatze && (
                <span
                  className="absolute top-3 left-3 bg-white text-navy text-xs rounded-full px-2.5 py-1 shadow-sm"
                  style={{ fontWeight: 700 }}
                >
                  {dict.bereiche.katzenstreu_badge}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 p-5">
              <span
                className="flex items-center justify-between gap-2 text-navy text-[17px]"
                style={{ fontWeight: 800 }}
              >
                {name}
                <AppIcon
                  icon={ChevronRight}
                  width={18}
                  height={18}
                  strokeWidth={2}
                  className="text-cyan shrink-0"
                  aria-hidden="true"
                />
              </span>
              <span className="text-sm text-navy opacity-60 leading-[1.6]">{teaser}</span>
              {/* #253: einheitliche Beispiel-Zeile je Kachel. Werte vorläufig
                  (Technik-Sign-off offen) → Hinweis-Fußnote unter dem Grid. */}
              {beispiele && (
                <span className="text-xs text-navy/45 leading-[1.5]">
                  <span style={{ fontWeight: 700 }}>{bt.beispiele_prefix} </span>
                  {beispiele}
                </span>
              )}
            </div>
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
    {zeigeBeispielHinweis && (
      <p className="mt-5 text-xs italic text-navy/40">{bt.beispiele_hinweis}</p>
    )}
    </>
  );
}

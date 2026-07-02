import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight } from "lucide-react";
import { alternatesFor } from "../../../lib/seo";
import { SHELL_MAXWIDTH } from "@/lib/layout";
import { bereichIcon } from "../../../components/bereichIcons";
import { produkte } from "../../../data/produkte";
import { referenzen } from "../../../data/referenzen";
import { localizeReferenzen } from "../../../data/i18n/getLocalized";
import ReferenceCard from "../../../components/ReferenceCard";

type Params = Promise<{ lang: string }>;

// #430: Hub-Seite der Sparte Betonsanierung (GF-Abstimmung 02.07.). Bündelt die
// vier Unterbereiche der Sparte (Instandsetzung/Rapid Set · TW-Behälter ·
// Infrastruktur · Spezialmörtel) — Ziel der Top-Nav "Betonsanierung ▾" und des
// Feld-2-Kopfzeilen-Links auf der Startseite. Aufbau analog /sanierung-Hub.
// Nicht verwechseln: /bereiche/betonsanierung/ ist der Unterbereich Instandsetzung.
const SPARTE_BEREICHE = ["betonsanierung", "microtop", "infrastruktur", "spezialmoertel"] as const;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const h = dict.home as Record<string, string>;
  return {
    title: h.kompetenz_beton_title,
    description: h.kompetenz_beton_sub,
    alternates: alternatesFor(lang, "/betonsanierung/"),
  };
}

export default async function BetonsanierungHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const h = dict.home as Record<string, string>;
  const bt = dict.bereiche as Record<string, string>;

  const unterbereiche = [
    { slug: "betonsanierung", title: h.kompetenz_beton_instandsetzung_title, text: bt.betonsanierung_teaser },
    { slug: "microtop", title: bt.microtop_menu, text: bt.microtop_teaser },
    { slug: "infrastruktur", title: bt.infrastruktur_name, text: bt.infrastruktur_teaser },
    { slug: "spezialmoertel", title: bt.spezialmoertel_name, text: bt.spezialmoertel_teaser },
  ];

  // Referenzen der Sparte: Projekte, deren Produkte in einem der vier
  // Unterbereiche liegen (Primär-Bereich oder zusatzBereiche, #215).
  const sparteProduktNamen = new Set(
    produkte
      .filter(
        (p) =>
          (SPARTE_BEREICHE as readonly string[]).includes(p.bereich) ||
          p.zusatzBereiche?.some((b) => (SPARTE_BEREICHE as readonly string[]).includes(b))
      )
      .map((p) => p.name.toLowerCase())
  );
  const sparteRefs = await localizeReferenzen(
    referenzen
      .filter((r) => r.produkte.some((name) => sparteProduktNamen.has(name.toLowerCase())))
      .slice(0, 6),
    lang
  );

  return (
    <>
      <section style={{ padding: "48px 32px 40px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 800 }}>
          <h1
            className="mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {h.kompetenz_beton_title}
          </h1>
          <p className="text-navy/70 m-0" style={{ fontSize: 18, lineHeight: 1.7 }}>
            {h.kompetenz_beton_sub}
          </p>
        </div>
      </section>

      {/* Die vier Unterbereiche der Sparte */}
      <section style={{ padding: "8px 32px 56px" }}>
        <div className="mx-auto" style={{ maxWidth: SHELL_MAXWIDTH }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {unterbereiche.map((u) => (
              <Link key={u.slug} href={`/${lang}/bereiche/${u.slug}/`} className="no-underline group block">
                <div
                  className="bg-white border border-bullet-bg p-7 flex flex-col gap-4 h-full transition-all duration-200 group-hover:border-cyan group-hover:-translate-y-1 group-hover:shadow-lg"
                  style={{ borderRadius: 14 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-icon-bg">
                    <AppIcon icon={bereichIcon(u.slug)} width={24} height={24} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
                  </div>
                  <h2 className="text-navy text-[18px] m-0" style={{ fontWeight: 900 }}>{u.title}</h2>
                  <p className="text-navy/60 text-[14px] m-0 leading-[1.6]">{u.text}</p>
                  <span className="inline-flex items-center gap-1.5 text-cyan-text text-[14px] mt-auto" style={{ fontWeight: 700 }}>
                    {dict.sanierungHub.cta}
                    <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {sparteRefs.length > 0 && (
        <section className="bg-icon-bg" style={{ padding: "64px 32px 72px" }}>
          <div className="mx-auto" style={{ maxWidth: SHELL_MAXWIDTH }}>
            <h2 className="text-center mb-10" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900 }}>
              {dict.home.featured_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sparteRefs.map((ref) => (
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
                <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Kontakt-CTA (analog /sanierung-Hub) */}
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

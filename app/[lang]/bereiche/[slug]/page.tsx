import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "../../../../components/Breadcrumb";
import { bereiche, getBereichBySlug } from "../../../../data/bereiche";
import { produkte } from "../../../../data/produkte";
import { getDictionary, hasLocale } from "../../dictionaries";
import { LOCALES } from "../../../../lib/i18n";
import { notFound } from "next/navigation";
import { localizeProdukte } from "../../../../data/i18n/getLocalized";
import { alternatesFor } from "../../../../lib/seo";
import { AppIcon } from "@/components/ui/icon";
import { ExternalLink, Info } from "lucide-react";

type Params = Promise<{ lang: string; slug: string }>;

function ProduktGrid({
  produkte: items,
  lang,
  neutral = false,
}: {
  produkte: { id: string; name: string; kurzbeschreibung: string; qualitaetsklasse?: string }[];
  lang: string;
  /** Variante B "neutral-reduziert" (Katzenstreu): Rahmen statt Schatten. */
  neutral?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((produkt) => (
        <Link
          key={produkt.id}
          href={`/${lang}/produkte/${produkt.id}`}
          className="no-underline group block"
        >
          <div
            className={`bg-white p-6 flex flex-col gap-3 h-full transition-all duration-200 group-hover:-translate-y-1 ${
              neutral
                ? "border border-mid-gray group-hover:border-navy"
                : "group-hover:shadow-lg"
            }`}
            style={
              neutral
                ? { borderRadius: 14 }
                : { borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.08)" }
            }
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-navy text-[17px] m-0" style={{ fontWeight: 900 }}>
                {produkt.name}
              </h4>
              {produkt.qualitaetsklasse && (
                <span
                  className="text-[10px] text-white uppercase tracking-wider px-2 py-0.5 rounded shrink-0"
                  style={{ backgroundColor: "var(--cyan)", fontWeight: 700 }}
                >
                  {produkt.qualitaetsklasse}
                </span>
              )}
            </div>
            <p className="text-navy opacity-60 text-[14px] m-0 leading-[1.5]">
              {produkt.kurzbeschreibung}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return bereiche.flatMap((b) => LOCALES.map((lang) => ({ lang, slug: b.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !getBereichBySlug(slug)) return {};
  const dict = await getDictionary(lang);
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  return {
    title: tb(`${slug}_name`),
    description: tb(`${slug}_teaser`),
    alternates: alternatesFor(lang, `/bereiche/${slug}/`),
  };
}

export default async function BereichPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const bereich = getBereichBySlug(slug);
  if (!bereich) notFound();

  const dict = await getDictionary(lang);
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  const localizedProdukte = await localizeProdukte(
    produkte.filter((p) => p.bereich === bereich.slug),
    lang
  );

  // Gliederung nach kuratierten Produktgruppen (Anker-Chips, kein Filter-State).
  // Bereiche ohne Gruppen-Definition zeigen das flache Grid.
  const gruppen = (bereich.produktgruppen ?? [])
    .map((key) => ({
      key,
      label: tb(`gruppe_${key}`),
      items: localizedProdukte.filter((p) => p.produktgruppe === key),
    }))
    .filter((g) => g.items.length > 0);
  const ohneGruppe = bereich.produktgruppen
    ? localizedProdukte.filter(
        (p) => !p.produktgruppe || !bereich.produktgruppen?.includes(p.produktgruppe)
      )
    : localizedProdukte;

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb items={[{ label: tb(`${slug}_name`) }]} lang={lang} />
        </div>
      </section>

      {/* Kopf: H1 + Intro */}
      <section style={{ padding: "0 32px 48px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          {bereich.abgegrenzt && (
            <span
              className="inline-block bg-icon-bg text-navy text-[12px] rounded-full mb-4"
              style={{ padding: "6px 14px", fontWeight: 700 }}
            >
              {tb("katzenstreu_badge")}
            </span>
          )}
          <h1
            className="mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {tb(`${slug}_name`)}
          </h1>
          <p
            className="text-navy/80 mb-0"
            style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}
          >
            {tb(`${slug}_intro`)}
          </p>

          {bereich.haendlerHinweis && (
            <div
              className="flex items-start gap-3 bg-icon-bg rounded-xl mt-8"
              style={{ padding: "18px 20px", maxWidth: 760 }}
            >
              <AppIcon
                icon={Info}
                width={20}
                height={20}
                strokeWidth={2}
                className="text-cyan-text shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-navy text-[14px] m-0 leading-[1.6]">
                {tb("haendler_hinweis")}
              </p>
            </div>
          )}

          {bereich.externeWebsite && (
            <p className="mt-6 mb-0">
              <a
                href={bereich.externeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-text text-[15px] no-underline hover:underline"
                style={{ fontWeight: 700, minHeight: 44 }}
              >
                {tb("externe_website")}
                <AppIcon icon={ExternalLink} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Produkte des Bereichs */}
      <section className={bereich.abgegrenzt ? "bg-white" : "bg-icon-bg"} style={{ padding: "56px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h2
            className="mb-6"
            style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}
          >
            {tb("produkte_title")}
          </h2>

          {localizedProdukte.length > 0 ? (
            <>
              {/* Gruppen-Anker-Chips (springen zu den Gruppen, kein Filter-State) */}
              {gruppen.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {gruppen.map((g) => (
                    <a
                      key={g.key}
                      href={`#${g.key}`}
                      className="inline-flex items-center rounded-full border border-mid-gray bg-white text-navy text-[14px] no-underline transition-colors duration-150 hover:border-cyan hover:text-cyan-text"
                      style={{ padding: "10px 18px", fontWeight: 700, minHeight: 44 }}
                    >
                      {g.label}
                      <span className="ml-2 text-navy/40 text-[12px]" style={{ fontWeight: 600 }}>
                        {g.items.length}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {gruppen.map((g) => (
                <div key={g.key} id={g.key} className="scroll-mt-20 mb-10 last:mb-0">
                  <h3
                    className="mb-5"
                    style={{ fontSize: "clamp(17px, 2.4vw, 22px)", fontWeight: 900, lineHeight: 1.2 }}
                  >
                    {g.label}
                  </h3>
                  <ProduktGrid produkte={g.items} lang={lang} neutral={bereich.abgegrenzt} />
                </div>
              ))}

              {ohneGruppe.length > 0 && (
                <div className={gruppen.length > 0 ? "mt-10" : undefined}>
                  <ProduktGrid produkte={ohneGruppe} lang={lang} neutral={bereich.abgegrenzt} />
                </div>
              )}
            </>
          ) : (
            <div
              className="bg-white rounded-2xl text-center"
              style={{ padding: "48px 32px", maxWidth: 760 }}
            >
              <p className="text-navy/70 text-[16px] leading-[1.7] mt-0 mb-6">
                {tb("keine_produkte")}
              </p>
              <Link
                href={`/${lang}/kontakt/`}
                className="inline-flex items-center justify-center border-2 border-navy text-navy no-underline rounded-[6px] hover:bg-navy hover:text-white transition-colors duration-200"
                style={{ padding: "12px 26px", fontWeight: 800, fontSize: 15, minHeight: 44 }}
              >
                {tb("cta_button")}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Variante B (abgegrenzte Bereiche): Vertrauenszeile + Private Label */}
      {bereich.abgegrenzt && (
        <section style={{ padding: "0 32px 56px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <p
              className="border-y border-bullet-bg text-navy/60 text-[14px] text-center leading-[1.7]"
              style={{ padding: "18px 8px", margin: 0 }}
            >
              {tb("katzenstreu_trust")}
            </p>
            <div
              className="border border-mid-gray mt-8"
              style={{ borderRadius: 14, padding: "32px 32px" }}
            >
              <h2 className="text-navy mt-0 mb-3" style={{ fontSize: 22, fontWeight: 900 }}>
                {tb("katzenstreu_privatelabel_title")}
              </h2>
              <p className="text-navy/70 text-[15px] mt-0 mb-6 leading-[1.7]" style={{ maxWidth: 760 }}>
                {tb("katzenstreu_privatelabel_text")}
              </p>
              <a
                href="mailto:info@korodur.de"
                className="inline-flex items-center justify-center text-white no-underline rounded-[6px] bg-navy hover:bg-navy/90 transition-colors duration-200"
                style={{ padding: "13px 28px", fontWeight: 800, fontSize: 15, minHeight: 44 }}
              >
                {tb("katzenstreu_privatelabel_cta")}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA-Band */}
      <section className="bg-navy text-white text-center" style={{ padding: "64px 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <h2 className="text-white mb-3" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900 }}>
            {tb("cta_title")}
          </h2>
          <p className="text-white opacity-70 mb-8" style={{ fontSize: 17, lineHeight: 1.65 }}>
            {tb("cta_text")}
          </p>
          <Link
            href={`/${lang}/kontakt/`}
            className="inline-flex items-center justify-center text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
            style={{ padding: "14px 30px", fontWeight: 800, fontSize: 15, minHeight: 44 }}
          >
            {tb("cta_button")}
          </Link>
        </div>
      </section>
    </>
  );
}

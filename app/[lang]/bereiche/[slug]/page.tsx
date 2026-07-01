import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "../../../../components/Breadcrumb";
import { bereiche, getBereichBySlug } from "../../../../data/bereiche";
import { produkte } from "../../../../data/produkte";
import { getDictionary, hasLocale } from "../../dictionaries";
import { LOCALES } from "../../../../lib/i18n";
import { notFound } from "next/navigation";
import { localizeProdukte, localizeReferenzen } from "../../../../data/i18n/getLocalized";
import { referenzen } from "../../../../data/referenzen";
import ReferenceCard from "../../../../components/ReferenceCard";
import { fachberaterFuerBereich } from "../../../../data/fachberater";
import { KORODUR_ZENTRALE } from "../../../../lib/kontaktDaten";
import BeraterCard from "../../../../components/BeraterCard";
import BereichProduktFilter from "../../../../components/BereichProduktFilter";
import { alternatesFor } from "../../../../lib/seo";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight, Info } from "lucide-react";
import { bereichIcon } from "../../../../components/bereichIcons";
import Image from "next/image";
import { withBasePath } from "../../../../lib/basePath";
import BetonsanierungBereich from "../../../../components/BetonsanierungBereich";
import RapidSetMarke from "../../../../components/RapidSetMarke";
import InfrastrukturBereich from "../../../../components/InfrastrukturBereich";
import { RAPID_SET_PRODUKT_IDS } from "../../../../data/rapidSetContent";
import BereichEditorialSektion from "../../../../components/BereichEditorialSektion";
import { bereichEditorial } from "../../../../data/bereichEditorial";

// #320: Rapid-Set-Marke (Slug `rapid-set`) wählt Produkte kuratiert über diese
// Liste, da sie am Bereich `betonsanierung` hängen. Greift im generischen
// Non-DE-Template (DE rendert die dedizierte RapidSetMarke-Komponente).
const RAPID_SET_IDS = new Set<string>(RAPID_SET_PRODUKT_IDS);

type Params = Promise<{ lang: string; slug: string }>;

/** Bereiche mit dedizierter, redaktionell ausgearbeiteter DE-Komponente (#320).
 *  Registry statt hardcodiertem slug-Branch: jeder Eintrag dockt einen Bereich
 *  an; EN/FR/PL/ES fallen auf das generische Template (i18n-Follow-up → #181). */
const DEDIZIERTE_BEREICHE: Record<string, typeof BetonsanierungBereich> = {
  betonsanierung: BetonsanierungBereich,
  // #320: eigene Rapid-Set-Marken-Seite an der bestehenden URL /bereiche/rapid-set/.
  "rapid-set": RapidSetMarke,
  // #376: Infrastruktur (Single-Narrativ, zwei Schnellbeton-Systeme).
  infrastruktur: InfrastrukturBereich,
};

// Cross-Selling (Steffi 2026-06-13, #84): kontextuell verwandter Bereich.
// Industrieboden -> Rapid Set (schnelle Instandsetzung) ist ihr Leitbeispiel.
const CROSSSELL: Record<string, string> = {
  industrieboden: "betonsanierung",
  spezialmoertel: "betonsanierung",
  betonsanierung: "industrieboden",
  infrastruktur: "betonsanierung",
};

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

  // Dedizierte, redaktionell ausgearbeitete DE-Bereichsseiten (#320, Registry
  // statt hardcodiertem Branch; Spec docs/specs/2026-06-30-bereichsseiten-
  // konzept-rework.md). EN/FR/PL/ES → generisches Template (i18n-Follow-up #181).
  const DedizierterBereich = lang === "de" ? DEDIZIERTE_BEREICHE[slug] : undefined;
  if (DedizierterBereich) {
    const dict = await getDictionary(lang);
    return <DedizierterBereich lang={lang} dict={dict} />;
  }

  // Multi-Bereich (#215): Produkt gehört zum Bereich über Primär-`bereich`
  // ODER `zusatzBereiche` (z. B. KOROCRETE in Betonsanierung + Infrastruktur).
  const gehoertZuBereich = (p: (typeof produkte)[number]) =>
    bereich.slug === "rapid-set"
      ? RAPID_SET_IDS.has(p.id)
      : p.bereich === bereich.slug || (p.zusatzBereiche?.includes(bereich.slug) ?? false);

  const dict = await getDictionary(lang);
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  const localizedProdukte = await localizeProdukte(
    produkte.filter(gehoertZuBereich),
    lang
  );

  // Referenz-Teaser (Korb 2): Referenzen, die Produkte dieses Bereichs
  // einsetzen — schließt die Schleife Bereich→Produkt→Referenz→Kontakt.
  const bereichsProduktNamen = new Set(
    produkte.filter(gehoertZuBereich).map((p) => p.name.toLowerCase())
  );
  const bereichsReferenzen = await localizeReferenzen(
    referenzen
      .filter((r) => r.produkte.some((name) => bereichsProduktNamen.has(name.toLowerCase())))
      .slice(0, 3),
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
  const alleFachberater = fachberaterFuerBereich(bereich.slug, lang);
  const ed = bereichEditorial(slug);

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb items={[{ label: dict.nav.bereiche, href: `/${lang}/bereiche` }, { label: tb(`${slug}_name`) }]} lang={lang} />
        </div>
      </section>

      {/* Kopf: Bereichs-Header. Mit Bereichsbild (#141) als Hintergrund + dunklem Overlay, sonst Icon-Band. */}
      {bereich.bild ? (
        <section className="relative overflow-hidden" style={{ minHeight: 440 }}>
          <Image
            src={withBasePath(bereich.bild)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/75" aria-hidden="true" />
          {/* #231: Text links, ein CTA „Technische Fachberatung" rechts (analog Home-Hero).
              Hero-Höhe site-weit vereinheitlicht (Steffi 2026-06-19): minHeight 440. */}
          <div className="relative mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6" style={{ maxWidth: 1320, padding: "64px 32px 68px" }}>
            <div className="lg:flex-1">
              {bereich.abgegrenzt && (
                <span
                  className="inline-block bg-white text-navy text-[12px] rounded-full mb-3"
                  style={{ padding: "5px 14px", fontWeight: 700 }}
                >
                  {tb("katzenstreu_badge")}
                </span>
              )}
              <h1 className="text-white mb-3" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}>
                {tb(`${slug}_name`)}
              </h1>
              <p className="text-white/90 mb-0" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}>
                {tb(`${slug}_intro`)}
              </p>
            </div>
            <Link
              href={`/${lang}/kontakt/?bereich=${slug}`}
              className="inline-flex items-center justify-center gap-2 shrink-0 rounded-[6px] bg-cyan text-white no-underline hover:bg-cyan-hover transition-colors duration-200"
              style={{ padding: "14px 26px", fontWeight: 800, fontSize: 15, minHeight: 48 }}
            >
              {tb("header_cta")}
              <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : (
        <section className="bg-icon-bg" style={{ padding: "40px 32px 44px" }}>
          <div className="mx-auto flex flex-col sm:flex-row sm:items-center gap-5" style={{ maxWidth: 1320 }}>
            <span
              className="flex items-center justify-center shrink-0 rounded-2xl bg-navy"
              style={{ width: 72, height: 72 }}
              aria-hidden="true"
            >
              <AppIcon icon={bereichIcon(slug)} width={36} height={36} strokeWidth={1.75} className="text-white" />
            </span>
            <div className="flex-1 min-w-0">
              {bereich.abgegrenzt && (
                <span
                  className="inline-block bg-white text-navy text-[12px] rounded-full mb-3"
                  style={{ padding: "5px 14px", fontWeight: 700 }}
                >
                  {tb("katzenstreu_badge")}
                </span>
              )}
              <h1 className="mb-3" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}>
                {tb(`${slug}_name`)}
              </h1>
              <p className="text-navy/80 mb-0" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}>
                {tb(`${slug}_intro`)}
              </p>
            </div>
            {/* #231: ein CTA „Technische Fachberatung" rechts */}
            <Link
              href={`/${lang}/kontakt/?bereich=${slug}`}
              className="inline-flex items-center justify-center gap-2 shrink-0 rounded-[6px] bg-cyan text-white no-underline hover:bg-cyan-hover transition-colors duration-200"
              style={{ padding: "14px 26px", fontWeight: 800, fontSize: 15, minHeight: 48 }}
            >
              {tb("header_cta")}
              <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      {bereich.haendlerHinweis && (
        <section style={{ padding: "16px 32px 0" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <div
              className="flex items-start gap-3 bg-white rounded-xl border border-navy/10"
              style={{ padding: "16px 18px", maxWidth: 760 }}
            >
              <AppIcon icon={Info} width={20} height={20} strokeWidth={2} className="text-cyan-text shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-navy text-[14px] m-0 leading-[1.6]">{tb("haendler_hinweis")}</p>
            </div>
          </div>
        </section>
      )}

      {/* #231: Sprung-Anker-Band entfernt — der eine Header-CTA „Technische
          Fachberatung" ersetzt es; Seite fließt Header → Produkte → Referenzen
          → Fachberatung → Fallback-CTA. */}

      {/* Editorial-Content (datengetrieben, #377/#378/#347). Ersetzt das frühere
          Neubau/Sanierung-Split-Framing auf der Dachseite (Steffi 2026-07-01:
          „kein Split mehr, nur die zwei Unterseiten"). Die Projektart-Unterseiten
          tragen ihre eigenen, projektart-spezifischen Editorial-Absätze. */}
      {lang === "de" && ed && <BereichEditorialSektion editorial={ed} />}

      {/* Produkte des Bereichs. Abgegrenzte Bereiche (Katzenstreu) ohne einzeln
          gelistete Produkte überspringen die Sektion — der Private-Label-Block
          trägt den Inhalt; der „keine_produkte"-Leerzustand (Coming-Soon-Wording)
          bleibt nur Platzhalter-Bereichen (z. B. 3D-Betondruck) vorbehalten. */}
      {!(bereich.abgegrenzt && localizedProdukte.length === 0) && (
      <section id="produkte" className={`${bereich.abgegrenzt ? "bg-white" : "bg-icon-bg"} scroll-mt-24`} style={{ padding: "56px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h2
            className="mb-6"
            style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}
          >
            {/* #220: Per-Bereich-Heading „{Bereich} Produkte"; Fallback generisch. */}
            {(dict.bereiche as Record<string, string>)[`${slug}_produkte_heading`] ?? tb("produkte_title")}
          </h2>

          {localizedProdukte.length > 0 ? (
            gruppen.length > 1 ? (
              <BereichProduktFilter
                gruppen={gruppen}
                lang={lang}
                neutral={bereich.abgegrenzt}
                defaultOpen={localizedProdukte.length <= 6}
                hinweis={tb("produkte_filter_hinweis")}
                alleLabel={tb("produkte_filter_alle")}
                waehleLabel={tb("produkte_filter_waehle")}
              />
            ) : (
              <ProduktGrid produkte={localizedProdukte} lang={lang} neutral={bereich.abgegrenzt} />
            )
          ) : (
            <div
              className="bg-white rounded-2xl text-center"
              style={{ padding: "48px 32px", maxWidth: 760 }}
            >
              <p className="text-navy/70 text-[16px] leading-[1.7] mt-0 mb-6">
                {tb("keine_produkte")}
              </p>
              <Link
                href={`/${lang}/kontakt/?bereich=${slug}`}
                className="inline-flex items-center justify-center border-2 border-navy text-navy no-underline rounded-[6px] hover:bg-navy hover:text-white transition-colors duration-200"
                style={{ padding: "12px 26px", fontWeight: 800, fontSize: 15, minHeight: 44 }}
              >
                {tb("cta_button")}
              </Link>
            </div>
          )}
          {localizedProdukte.length > 0 && (
            <div className="mt-8">
              <Link
                href={`/${lang}/downloads/?bereich=${slug}`}
                className="inline-flex items-center gap-1.5 text-cyan-text text-[15px] no-underline hover:underline"
                style={{ fontWeight: 700 }}
              >
                {dict.downloads.alle_bereich} →
              </Link>
            </div>
          )}
        </div>
      </section>
      )}

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

      {/* Referenz-Teaser des Bereichs (Korb 2) */}
      {bereichsReferenzen.length > 0 && (
        <section className="bg-white" style={{ padding: "56px 32px 64px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="mb-6" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
              {dict.nav.referenzen}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bereichsReferenzen.map((r) => (
                <ReferenceCard key={r.id} referenz={r} lang={lang} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={`/${lang}/referenzen/`}
                className="inline-flex items-center gap-2 text-cyan-text text-[15px] no-underline hover:underline"
                style={{ fontWeight: 700 }}
              >
                {dict.home.featured_link} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Fachberater des Bereichs (Funnel-Karten, Launch-Audit/Korb 2) */}
      {alleFachberater.length > 0 && (
        <section id="fachberater" className="scroll-mt-24" style={{ padding: "56px 32px 64px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="mb-2" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
              {dict.kontakt.fachberater_title}
            </h2>
            <p className="text-navy/70 text-[15px] mt-0 mb-6 leading-[1.6]" style={{ maxWidth: 640 }}>
              {dict.kontakt.fachberater_intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alleFachberater.map((b) => (
                <BeraterCard key={`${b.name}-${b.email}`} berater={b} plzLabel={dict.kontakt.fachberater_plz} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Katzenstreu: generischer Kontaktblock ohne Foto + zentrale Festnetznummer
          (#232) — eigener Geschäftsbereich ohne Fachberater-Mapping. */}
      {slug === "katzenstreu" && (
        <section id="fachberater" className="scroll-mt-24" style={{ padding: "56px 32px 64px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <div className="rounded-xl border border-bullet-bg bg-white p-6" style={{ maxWidth: 560 }}>
              <h2 className="mb-2" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
                {tb("cta_title")}
              </h2>
              <p className="text-navy/70 text-[15px] mt-0 mb-4 leading-[1.6]">{tb("cta_text")}</p>
              <div className="flex flex-col gap-1 mb-5 text-[15px]">
                <a href={KORODUR_ZENTRALE.telefonHref} className="text-navy no-underline hover:text-cyan-text" style={{ fontWeight: 700 }}>
                  {KORODUR_ZENTRALE.telefon}
                </a>
                <a href={`mailto:${KORODUR_ZENTRALE.email}`} className="text-navy/70 no-underline hover:text-cyan-text">
                  {KORODUR_ZENTRALE.email}
                </a>
              </div>
              <Link
                href={`/${lang}/kontakt/?bereich=${slug}`}
                className="inline-flex items-center gap-2 text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
                style={{ padding: "12px 24px", fontWeight: 800, fontSize: 15 }}
              >
                {tb("cta_button")}
                <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Cross-Selling: kontextuell verwandter Bereich (#84) */}
      {CROSSSELL[slug] && (
        <section style={{ padding: "0 32px 64px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="mb-5" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 800 }}>
              {tb("crosssell_title")}
            </h2>
            <Link
              href={`/${lang}/bereiche/${CROSSSELL[slug]}/`}
              className="flex items-center gap-4 rounded-xl border border-bullet-bg bg-white p-5 no-underline transition-all duration-200 hover:border-cyan hover:shadow-lg"
              style={{ maxWidth: 560 }}
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy shrink-0" aria-hidden="true">
                <AppIcon icon={bereichIcon(CROSSSELL[slug])} width={24} height={24} strokeWidth={2} className="text-white" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-navy text-[16px]" style={{ fontWeight: 800 }}>
                  {tb(`${CROSSSELL[slug]}_name`)}
                </span>
                <span className="block text-navy/60 text-[13px] leading-snug mt-0.5">
                  {tb(`${CROSSSELL[slug]}_teaser`)}
                </span>
              </span>
              <AppIcon icon={ArrowRight} width={18} height={18} strokeWidth={2.5} className="text-cyan shrink-0" aria-hidden="true" />
            </Link>
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
            href={`/${lang}/kontakt/?bereich=${slug}`}
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

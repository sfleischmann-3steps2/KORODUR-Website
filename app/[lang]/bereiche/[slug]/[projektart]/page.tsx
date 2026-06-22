import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { getBereichBySlug } from "../../../../../data/bereiche";
import { produkte } from "../../../../../data/produkte";
import { referenzen } from "../../../../../data/referenzen";
import { getDictionary, hasLocale } from "../../../dictionaries";
import { LOCALES } from "../../../../../lib/i18n";
import { notFound } from "next/navigation";
import { localizeProdukte, localizeReferenzen } from "../../../../../data/i18n/getLocalized";
import ReferenceCard from "../../../../../components/ReferenceCard";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight, ChevronRight, Compass, Grid3x3 } from "lucide-react";
import { withBasePath } from "../../../../../lib/basePath";
import { alternatesFor } from "../../../../../lib/seo";
import { projektartBucket, projektartLabel, type Projektart } from "../../../../../data/einsatzbereichMapping";
import { produktHatProjektart } from "../../../../../data/produktProjektart";

type Params = Promise<{ lang: string; slug: string; projektart: string }>;

// #233: Verschachtelte Sub-Bereichsseiten nur für Bereiche mit BEIDEN Projektarten.
// #306/#308: Industrieboden + Sichtestrich (beide Neubau & Sanierung).
// Spezialmörtel (nur Neubau) braucht keinen Projektart-Split.
const SUB_BEREICHE = ["industrieboden", "sichtestrich"] as const;
const PROJEKTARTEN: Projektart[] = ["neubau", "sanierung"];

export function generateStaticParams() {
  return SUB_BEREICHE.flatMap((slug) =>
    PROJEKTARTEN.flatMap((projektart) => LOCALES.map((lang) => ({ lang, slug, projektart })))
  );
}

function gueltig(slug: string, projektart: string): projektart is Projektart {
  return (SUB_BEREICHE as readonly string[]).includes(slug) && (projektart === "neubau" || projektart === "sanierung");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug, projektart } = await params;
  if (!hasLocale(lang) || !gueltig(slug, projektart) || !getBereichBySlug(slug)) return {};
  const dict = await getDictionary(lang);
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  return {
    title: `${tb(`${slug}_name`)} – ${projektartLabel(projektart, lang)}`,
    description: tb(`${slug}_teaser`),
    alternates: alternatesFor(lang, `/bereiche/${slug}/${projektart}/`),
  };
}

export default async function SubBereichPage({ params }: { params: Params }) {
  const { lang, slug, projektart } = await params;
  if (!hasLocale(lang) || !gueltig(slug, projektart)) notFound();
  const bereich = getBereichBySlug(slug);
  if (!bereich) notFound();
  const art: Projektart = projektart;

  const dict = await getDictionary(lang);
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  const sh = dict.sanierungHub as Record<string, string>;
  const artLabel = projektartLabel(art, lang);

  // Multi-Bereich (#215): Primär-`bereich` ODER zusatzBereiche.
  const gehoertZuBereich = (p: (typeof produkte)[number]) =>
    p.bereich === bereich.slug || (p.zusatzBereiche?.includes(bereich.slug) ?? false);
  const bereichProdukte = produkte.filter(gehoertZuBereich);
  const bereichProduktNamen = new Set(bereichProdukte.map((p) => p.name.toLowerCase()));

  // #233: REFERENZEN projektart-filtern (saubere Daten: projekttyp je Ref).
  const artRefs = referenzen.filter(
    (r) =>
      projektartBucket(r.projekttyp) === art &&
      r.produkte.some((name) => bereichProduktNamen.has(name.toLowerCase()))
  );
  // #83: PRODUKTE projektart-filtern. Projektart liegt jetzt am Produkt
  // (data/produktProjektart.ts — Referenz-Ableitung + Notion-Override, #240).
  // "beide"-Produkte erscheinen in Neubau UND Sanierung; ohne Daten → beide
  // (kein Produkt wird fälschlich aus einem Bereich versteckt).
  const artProdukte = bereichProdukte.filter((p) => produktHatProjektart(p.id, art));
  const localizedProdukte = await localizeProdukte(artProdukte, lang);
  const localizedRefs = await localizeReferenzen(artRefs.slice(0, 6), lang);
  const refLink = `/${lang}/referenzen/?projektart=${art}`;

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb
            items={[
              { label: dict.nav.bereiche, href: `/${lang}/bereiche` },
              { label: tb(`${slug}_name`), href: `/${lang}/bereiche/${slug}` },
              { label: artLabel },
            ]}
            lang={lang}
          />
        </div>
      </section>

      {/* Header: Bereichsbild + Projektart-Kontext, ein CTA rechts (analog Dach-Seite).
          Hero-Höhe site-weit vereinheitlicht (Steffi 2026-06-19): minHeight 440. */}
      <section className="relative overflow-hidden" style={{ minHeight: 440 }}>
        {bereich.bild && (
          <Image src={withBasePath(bereich.bild)} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-navy/75" aria-hidden="true" />
        <div className="relative mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6" style={{ maxWidth: 1320, padding: "64px 32px 68px" }}>
          <div className="lg:flex-1">
            <span className="inline-block bg-cyan text-white text-[12px] rounded-full mb-3" style={{ padding: "5px 14px", fontWeight: 700 }}>
              {artLabel}
            </span>
            <h1 className="text-white mb-3" style={{ fontSize: "clamp(26px, 4.5vw, 40px)", fontWeight: 900, lineHeight: 1.1 }}>
              {tb(`${slug}_name`)} – {artLabel}
            </h1>
            <p className="text-white/90 mb-0" style={{ fontSize: 16, lineHeight: 1.65, maxWidth: 720 }}>
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

      {/* Wechsel zur jeweils anderen Projektart + zurück zur Dach-Seite */}
      <section style={{ padding: "16px 32px 0" }}>
        <div className="mx-auto flex flex-wrap gap-3" style={{ maxWidth: 1320 }}>
          <Link
            href={`/${lang}/bereiche/${slug}/${art === "neubau" ? "sanierung" : "neubau"}/`}
            className="inline-flex items-center gap-2 rounded-[6px] border-2 border-navy text-navy no-underline hover:bg-navy hover:text-white transition-colors duration-200"
            style={{ padding: "10px 20px", fontWeight: 700, fontSize: 14 }}
          >
            {projektartLabel(art === "neubau" ? "sanierung" : "neubau", lang)}
            <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
          <Link
            href={`/${lang}/bereiche/${slug}/`}
            className="inline-flex items-center gap-2 rounded-[6px] text-navy/70 no-underline hover:text-cyan-text transition-colors duration-200"
            style={{ padding: "10px 12px", fontWeight: 700, fontSize: 14 }}
          >
            {tb(`${slug}_name`)} ({dict.nav.bereiche})
          </Link>
        </div>
      </section>

      {/* #250: Lösungsfinder + Anwendungsmatrix hier verorten (F1, aus /sanierung
          herausgelöst). Der Projektart-Einstieg wird als Kontext mitgegeben. */}
      <section style={{ padding: "32px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { href: `/${lang}/loesungsfinder/?projektart=${art}`, icon: Compass, title: sh.card_loesungsfinder_title, text: sh.card_loesungsfinder_text },
              { href: `/${lang}/anwendungsmatrix/`, icon: Grid3x3, title: sh.card_matrix_title, text: sh.card_matrix_text },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="no-underline group block">
                <div
                  className="bg-white border border-bullet-bg p-7 flex flex-col gap-3 h-full transition-all duration-200 group-hover:border-cyan group-hover:-translate-y-1 group-hover:shadow-lg"
                  style={{ borderRadius: 14 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-icon-bg">
                    <AppIcon icon={card.icon} width={24} height={24} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
                  </div>
                  <h2 className="text-navy text-[19px] m-0" style={{ fontWeight: 900 }}>{card.title}</h2>
                  <p className="text-navy/60 text-[14px] m-0 leading-[1.6]">{card.text}</p>
                  <span className="inline-flex items-center gap-1.5 text-cyan-text text-[14px] mt-auto" style={{ fontWeight: 700 }}>
                    {sh.cta}
                    <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produkte (ref-getrieben auf die Projektart) */}
      <section className="bg-icon-bg" style={{ padding: "48px 32px 56px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h2 className="mb-3" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}>
            {tb(`${slug}_produkte_heading`)}
          </h2>
          {/* #250: Produkte tragen noch keine Projektart-Klassifizierung
              (#240/#83/#103). Bis dahin alle Bereichsprodukte + sichtbarer
              Platzhalter-Hinweis. */}
          <p className="mb-6 inline-block rounded-md bg-white/70 px-3 py-2 text-[13px] italic text-navy/55">
            {tb("klassifizierung_folgt")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {localizedProdukte.map((produkt) => (
              <Link key={produkt.id} href={`/${lang}/produkte/${produkt.id}`} className="no-underline group block">
                <div className="bg-white p-6 flex flex-col gap-3 h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg" style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.08)" }}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-navy text-[17px] m-0" style={{ fontWeight: 900 }}>{produkt.name}</h3>
                    {produkt.qualitaetsklasse && (
                      <span className="text-[10px] text-white uppercase tracking-wider px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: "var(--cyan)", fontWeight: 700 }}>
                        {produkt.qualitaetsklasse}
                      </span>
                    )}
                  </div>
                  <p className="text-navy opacity-60 text-[14px] m-0 leading-[1.5]">{produkt.kurzbeschreibung}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Referenzen dieser Projektart */}
      {localizedRefs.length > 0 && (
        <section className="bg-white" style={{ padding: "48px 32px 56px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="mb-6" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}>
              {tb(`${slug}_name`)} – {artLabel}: {dict.nav.referenzen}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localizedRefs.map((r) => (
                <ReferenceCard key={r.id} referenz={r} lang={lang} />
              ))}
            </div>
            <div className="mt-8">
              <Link href={refLink} className="inline-flex items-center gap-2 text-cyan-text text-[15px] no-underline hover:underline" style={{ fontWeight: 700 }}>
                {dict.nav.referenzen} · {artLabel}
                <AppIcon icon={ChevronRight} width={16} height={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Fallback-CTA */}
      <section className="bg-navy text-white text-center" style={{ padding: "48px 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900 }}>
            {tb("cta_title")}
          </h2>
          <p className="text-white/70 mb-8" style={{ fontSize: 17, lineHeight: 1.65 }}>{tb("cta_text")}</p>
          <Link
            href={`/${lang}/kontakt/?bereich=${slug}`}
            className="inline-block text-white no-underline rounded-[6px] border-2 border-white/40 hover:bg-white/10 transition-colors duration-200"
            style={{ padding: "14px 28px", fontWeight: 800, fontSize: 15 }}
          >
            {tb("cta_button")}
          </Link>
        </div>
      </section>
    </>
  );
}

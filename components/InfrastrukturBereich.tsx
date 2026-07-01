import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import ReferenceCard from "./ReferenceCard";
import BeraterCard from "./BeraterCard";
import BereichProduktFilter from "./BereichProduktFilter";
import { AppIcon } from "@/components/ui/icon";
import {
  ArrowRight,
  ChevronRight,
  Timer,
  Gauge,
  Truck,
  Layers,
  Shield,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import type { Dictionary, Locale } from "../app/[lang]/dictionaries";
import { INFRASTRUKTUR_CONTENT, type InfraIcon } from "../data/infrastrukturContent";
import { getBereichBySlug } from "../data/bereiche";
import { produkte } from "../data/produkte";
import { referenzen, getReferenzBySlug } from "../data/referenzen";
import { localizeProdukte, localizeReferenzen } from "../data/i18n/getLocalized";
import { fachberaterFuerBereich } from "../data/fachberater";
import { withBasePath } from "../lib/basePath";

const SLUG = "infrastruktur";
const C = INFRASTRUKTUR_CONTENT;

const ICONS: Record<InfraIcon, typeof Timer> = {
  timer: Timer,
  gauge: Gauge,
  truck: Truck,
  layers: Layers,
  shield: Shield,
  droplets: Droplets,
};

/** Dedizierte, redaktionell ausgearbeitete Bereichsseite „Infrastruktur" (DE).
 *  Single-Narrativ (kein Hybrid): Hero · Problem/Anlässe · Technologie (zwei
 *  Schnellbeton-Systeme) · Wofür · Portfolio · Trust · Fachberatung ·
 *  Referenzen · Abbinder. Ersetzt für slug=infrastruktur & lang=de das
 *  generische Template. Quelle: data/infrastrukturContent.ts + Spec 2026-06-30. */
export default async function InfrastrukturBereich({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  const bereich = getBereichBySlug(SLUG);
  const heldBild = bereich?.bild;

  const gehoertZuBereich = (p: (typeof produkte)[number]) =>
    p.bereich === SLUG || (p.zusatzBereiche?.includes(SLUG) ?? false);

  const localizedProdukte = await localizeProdukte(produkte.filter(gehoertZuBereich), lang);
  const gruppen = (bereich?.produktgruppen ?? [])
    .map((key) => ({
      key,
      label: tb(`gruppe_${key}`),
      text: C.gruppenText[key],
      items: localizedProdukte.filter((p) => p.produktgruppe === key),
    }))
    .filter((g) => g.items.length > 0);

  // Szenario-Vorschaubild je Produkt aus einer passenden Referenz; ohne
  // belegtes Paar bleibt das Bild leer (Kachel rendert ohne Foto).
  const szenarioBild = (id: string): string | undefined => {
    const refSlug = C.produktSzenarioReferenz[id];
    return refSlug ? getReferenzBySlug(refSlug)?.bild : undefined;
  };
  const filterGruppen = gruppen.map((g) => ({
    key: g.key,
    label: g.label,
    text: g.text,
    items: g.items.map((p) => ({
      id: p.id,
      name: p.name,
      kurzbeschreibung: p.kurzbeschreibung,
      qualitaetsklasse: p.qualitaetsklasse,
      bild: szenarioBild(p.id),
    })),
  }));

  // Referenz-Teaser unten: Projekte, die Bereichs-Produkte einsetzen.
  const bereichsProduktNamen = new Set(
    produkte.filter(gehoertZuBereich).map((p) => p.name.toLowerCase())
  );
  const bereichsReferenzen = await localizeReferenzen(
    referenzen
      .filter((r) => r.produkte.some((name) => bereichsProduktNamen.has(name.toLowerCase())))
      .slice(0, 3),
    lang
  );

  const fachberater = fachberaterFuerBereich(SLUG, lang);

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb
            items={[{ label: dict.nav.bereiche, href: `/${lang}/bereiche` }, { label: tb(`${SLUG}_name`) }]}
            lang={lang}
          />
        </div>
      </section>

      {/* 1 — Hero ----------------------------------------------------- */}
      <section className="relative overflow-hidden" style={{ minHeight: 440 }}>
        {heldBild && (
          <Image src={withBasePath(heldBild)} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
        <div
          className="relative mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          style={{ maxWidth: 1320, padding: "64px 32px 68px" }}
        >
          <div className="lg:max-w-[760px]">
            <span className="inline-block text-cyan uppercase tracking-[0.14em] text-[13px] mb-3" style={{ fontWeight: 800 }}>
              {C.hero.kicker}
            </span>
            <h1 className="text-white mb-4" style={{ fontSize: "clamp(30px, 5.2vw, 52px)", fontWeight: 900, lineHeight: 1.08 }}>
              {C.hero.h1[0]}
              <br />
              {C.hero.h1[1]}
            </h1>
            <p className="text-cyan mb-5" style={{ fontSize: "clamp(16px, 2.2vw, 20px)", fontWeight: 800, letterSpacing: "0.01em" }}>
              {C.hero.sub}
            </p>
            <p className="text-white/85 mb-6" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 680 }}>
              {C.hero.lead}
            </p>
            <div className="flex flex-wrap gap-2">
              {C.hero.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 bg-white/10 text-white text-[13px] rounded-full border border-white/20"
                  style={{ padding: "6px 13px", fontWeight: 600 }}
                >
                  <AppIcon icon={CheckCircle2} width={14} height={14} strokeWidth={2.25} className="text-cyan" aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href={`/${lang}/kontakt/?bereich=${SLUG}`}
              className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-cyan text-white no-underline hover:bg-cyan-hover transition-colors duration-200"
              style={{ padding: "14px 26px", fontWeight: 800, fontSize: 15, minHeight: 48 }}
            >
              {tb("header_cta")}
              <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border-2 border-white/40 text-white no-underline hover:bg-white/10 transition-colors duration-200"
              style={{ padding: "12px 24px", fontWeight: 800, fontSize: 15, minHeight: 48 }}
            >
              Zum Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* 2 — Problem / Nutzenversprechen + Einsätze ------------------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
                {C.problem.kicker}
              </span>
              <h2 className="text-navy mb-4" style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
                {C.problem.headline}
              </h2>
              <p className="text-navy/75 mb-0" style={{ fontSize: 17, lineHeight: 1.7 }}>
                {C.problem.lead}
              </p>
            </div>
            <div className="bg-icon-bg rounded-2xl" style={{ padding: "28px 28px" }}>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {C.problem.downtime.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-navy/80 text-[15px] leading-[1.55]">
                    <span className="mt-[7px] w-2 h-2 rounded-full bg-cyan shrink-0" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-navy mt-6 mb-0 pt-5 border-t border-bullet-bg text-[16px] leading-[1.6]" style={{ fontWeight: 700 }}>
                {C.problem.payoff}
              </p>
            </div>
          </div>

          {/* Typische Einsätze (Orientierung) */}
          <div className="mt-10 pt-8 border-t border-bullet-bg">
            <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-1" style={{ fontWeight: 800 }}>
              {C.anlaesse.kicker}
            </span>
            <h3 className="text-navy mb-4" style={{ fontSize: "clamp(18px, 2.6vw, 24px)", fontWeight: 900 }}>
              {C.anlaesse.headline}
            </h3>
            <div className="flex flex-wrap gap-2">
              {C.anlaesse.items.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-2 bg-white border border-navy/12 text-navy text-[14px] rounded-full"
                  style={{ padding: "8px 15px", fontWeight: 600 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" aria-hidden="true" />
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Technologie: zwei Schnellbeton-Systeme ------------------- */}
      <section className="bg-icon-bg" style={{ padding: "56px 32px 60px", marginTop: 48 }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="flex flex-col gap-3 mb-8">
            <span className="self-start inline-flex items-center gap-2 bg-navy text-white uppercase tracking-[0.12em] text-[12px] rounded-full" style={{ padding: "6px 14px", fontWeight: 800 }}>
              {C.systeme.kicker}
            </span>
            <h2 className="text-navy m-0" style={{ fontSize: "clamp(24px, 3.6vw, 34px)", fontWeight: 900, lineHeight: 1.12 }}>
              {C.systeme.headline}
            </h2>
            <p className="text-navy/75 mt-1 mb-0" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 820 }}>
              {C.systeme.lead}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {C.systeme.items.map((s) => (
              <div key={s.name} className="flex flex-col bg-white rounded-2xl border border-navy/10 h-full" style={{ padding: "28px 26px" }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center rounded-xl bg-navy shrink-0" style={{ width: 52, height: 52 }} aria-hidden="true">
                    <AppIcon icon={ICONS[s.icon]} width={26} height={26} strokeWidth={1.9} className="text-white" />
                  </span>
                  <h3 className="text-navy m-0" style={{ fontSize: 21, fontWeight: 900, lineHeight: 1.15 }}>
                    {s.name}
                  </h3>
                </div>
                <p className="text-navy/70 text-[14.5px] leading-[1.6] mt-0 mb-5">{s.beschreibung}</p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5 pt-5 border-t border-bullet-bg mt-auto">
                  {s.kennwerte.map((k) => (
                    <li key={k} className="flex items-start gap-2.5 text-navy/85 text-[14px] leading-[1.5]">
                      <AppIcon icon={CheckCircle2} width={16} height={16} strokeWidth={2.25} className="text-cyan-text shrink-0 mt-[2px]" aria-hidden="true" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Wofür: Anwendungsfälle ---------------------------------- */}
      <section style={{ padding: "60px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {C.wofuer.kicker}
          </span>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {C.wofuer.headline}
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-7 leading-[1.6]" style={{ maxWidth: 720 }}>
            {C.wofuer.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {C.anwendungen.map((a) => {
              const ref = getReferenzBySlug(a.referenzSlug);
              const bild = ref?.bild ?? "/images/_placeholder.jpg";
              return (
                <Link
                  key={a.referenzSlug}
                  href={`/${lang}/referenzen/${a.referenzSlug}`}
                  className="group relative overflow-hidden rounded-2xl no-underline block"
                  style={{ minHeight: 220 }}
                >
                  <Image
                    src={withBasePath(bild)}
                    alt={a.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="block text-white text-[17px]" style={{ fontWeight: 900 }}>
                      {a.label}
                    </span>
                    <span className="block text-white/80 text-[13px] leading-snug mt-0.5">{a.sublabel}</span>
                    <span className="inline-flex items-center gap-1 text-cyan text-[13px] mt-2" style={{ fontWeight: 700 }}>
                      Projekt ansehen
                      <AppIcon icon={ChevronRight} width={13} height={13} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — Produkt-Portfolio (gruppiert) --------------------------- */}
      <section id="portfolio" className="scroll-mt-24" style={{ padding: "60px 32px 16px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {tb(`${SLUG}_produkte_heading`)}
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-8 leading-[1.6]" style={{ maxWidth: 720 }}>
            {C.portfolioIntro}
          </p>
          <BereichProduktFilter
            gruppen={filterGruppen}
            lang={lang}
            defaultOpen={localizedProdukte.length <= 6}
            hinweis={tb("produkte_filter_hinweis")}
            alleLabel={tb("produkte_filter_alle")}
            waehleLabel={tb("produkte_filter_waehle")}
          />
        </div>
      </section>

      {/* 6 — Beweis / Trust ------------------------------------------ */}
      <section className="bg-navy text-white" style={{ padding: "56px 32px 60px", marginTop: 48 }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left lg:border-r lg:border-white/15 lg:pr-12">
              <div className="text-cyan" style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 900, lineHeight: 1 }}>
                {C.trust.kennzahl}
              </div>
              <p className="text-white/80 text-[15px] mt-2 mb-0" style={{ maxWidth: 260 }}>
                {C.trust.kennzahlText}
              </p>
            </div>
            <div>
              <h2 className="text-white mt-0 mb-3" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
                {C.trust.headline}
              </h2>
              <p className="text-white/75 text-[16px] mt-0 mb-5 leading-[1.65]" style={{ maxWidth: 720 }}>
                {C.trust.lead}
              </p>
              <div className="flex flex-wrap gap-2">
                {C.trust.normen.map((n) => (
                  <span key={n} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/90 text-[13px] rounded-full" style={{ padding: "6px 13px", fontWeight: 600 }}>
                    <AppIcon icon={Shield} width={13} height={13} strokeWidth={2.25} className="text-cyan" aria-hidden="true" />
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Fachberatung & Bezug (vor den Referenzen) --------------- */}
      {fachberater.length > 0 && (
        <section id="fachberater" className="scroll-mt-24" style={{ padding: "56px 32px 16px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
              {dict.kontakt.fachberater_title}
            </h2>
            <p className="text-navy/70 text-[15px] mt-0 mb-6 leading-[1.6]" style={{ maxWidth: 640 }}>
              {dict.kontakt.fachberater_intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fachberater.map((b) => (
                <BeraterCard key={`${b.name}-${b.email}`} berater={b} plzLabel={dict.kontakt.fachberater_plz} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 — Referenzen ---------------------------------------------- */}
      {bereichsReferenzen.length > 0 && (
        <section style={{ padding: "60px 32px 16px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
              <h2 className="text-navy m-0" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
                {dict.nav.referenzen}
              </h2>
              <Link
                href={`/${lang}/referenzen/?projektart=sanierung`}
                className="inline-flex items-center gap-2 text-cyan-text text-[15px] no-underline hover:underline"
                style={{ fontWeight: 700 }}
              >
                Alle Sanierungs-Referenzen
                <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bereichsReferenzen.map((r) => (
                <ReferenceCard key={r.id} referenz={r} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Abbinder ---------------------------------------------------- */}
      <section className="text-center" style={{ padding: "64px 32px 72px" }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <p className="text-cyan-text mb-3" style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 900 }}>
            {C.abbinder.claim}
          </p>
          <p className="text-navy/70 mb-8" style={{ fontSize: 17, lineHeight: 1.65 }}>
            {C.abbinder.text}
          </p>
          <Link
            href={`/${lang}/kontakt/?bereich=${SLUG}`}
            className="inline-flex items-center justify-center gap-2 text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
            style={{ padding: "14px 30px", fontWeight: 800, fontSize: 15, minHeight: 48 }}
          >
            {tb("header_cta")}
            <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

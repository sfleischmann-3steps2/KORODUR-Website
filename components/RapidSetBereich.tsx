import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import ReferenceCard from "./ReferenceCard";
import BeraterCard from "./BeraterCard";
import { AppIcon } from "@/components/ui/icon";
import {
  ArrowRight,
  ChevronRight,
  Timer,
  Layers,
  Droplets,
  Shield,
  Leaf,
  Recycle,
  Flame,
  Wrench,
  CheckCircle2,
  Info,
} from "lucide-react";
import type { Dictionary, Locale } from "../app/[lang]/dictionaries";
import { RAPID_SET_CONTENT, type RapidSetIcon } from "../data/rapidSetContent";
import { getBereichBySlug } from "../data/bereiche";
import { produkte } from "../data/produkte";
import { referenzen, getReferenzBySlug } from "../data/referenzen";
import { localizeProdukte, localizeReferenzen } from "../data/i18n/getLocalized";
import { fachberaterFuerBereich } from "../data/fachberater";
import { withBasePath } from "../lib/basePath";

const SLUG = "rapid-set";
const C = RAPID_SET_CONTENT;

const ICONS: Record<RapidSetIcon, typeof Timer> = {
  timer: Timer,
  layers: Layers,
  droplets: Droplets,
  shield: Shield,
  leaf: Leaf,
  recycle: Recycle,
  flame: Flame,
  wrench: Wrench,
};

/** Dedizierte, redaktionell ausgearbeitete Bereichsseite „Betonsanierung mit
 *  Rapid Set" (DE). Ersetzt für slug=rapid-set & lang=de das generische
 *  Template. Quelle: data/rapidSetContent.ts + Konzept-Spec 2026-06-19. */
export default async function RapidSetBereich({
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

  // Referenz-Teaser unten: Projekte, die Rapid-Set-Produkte einsetzen.
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

      {/* 1 — Hero ------------------------------------------------------ */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
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
            <div className="flex flex-wrap gap-2 mb-7">
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
            <div className="flex flex-wrap gap-3">
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
        </div>
      </section>

      {/* Händler-Hinweis ---------------------------------------------- */}
      <section style={{ padding: "16px 32px 0" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="flex items-start gap-3 bg-white rounded-xl border border-navy/10" style={{ padding: "16px 18px", maxWidth: 820 }}>
            <AppIcon icon={Info} width={20} height={20} strokeWidth={2} className="text-cyan-text shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-navy text-[14px] m-0 leading-[1.6]">{tb("haendler_hinweis")}</p>
          </div>
        </div>
      </section>

      {/* 2 — Problem / Nutzenversprechen ------------------------------ */}
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
        </div>
      </section>

      {/* Leitmotiv — Der ALLES-BESSER-KÖNNER (Taschenmesser) ---------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src={withBasePath(C.allesBesserKoenner.bild)}
                alt="Der ALLES-BESSER-KÖNNER: das Rapid Set Taschenmesser-Prinzip, ein Material für viele Anwendungen"
                width={C.allesBesserKoenner.bildBreite}
                height={C.allesBesserKoenner.bildHoehe}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
                {C.allesBesserKoenner.kicker}
              </span>
              <h2 className="text-navy mb-4" style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
                {C.allesBesserKoenner.headline}
              </h2>
              <p className="text-navy/75 mb-6" style={{ fontSize: 17, lineHeight: 1.7 }}>
                {C.allesBesserKoenner.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {C.allesBesserKoenner.segmente.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 bg-icon-bg text-navy text-[13px] rounded-full border border-bullet-bg"
                    style={{ padding: "7px 14px", fontWeight: 700 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan" aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Drei Kernvorteile ---------------------------------------- */}
      <section style={{ padding: "48px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {C.vorteile.map((v) => (
              <div key={v.titel} className="bg-white rounded-2xl border border-bullet-bg p-7 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(0,45,89,0.06)" }}>
                <span className="flex items-center justify-center rounded-xl bg-navy mb-4" style={{ width: 52, height: 52 }} aria-hidden="true">
                  <AppIcon icon={ICONS[v.icon]} width={26} height={26} strokeWidth={1.9} className="text-white" />
                </span>
                <span className="text-cyan-text uppercase tracking-[0.1em] text-[11px] mb-1" style={{ fontWeight: 800 }}>
                  {v.kicker}
                </span>
                <h3 className="text-navy mb-2" style={{ fontSize: 19, fontWeight: 900, lineHeight: 1.2 }}>
                  {v.titel}
                </h3>
                <p className="text-navy/70 text-[14.5px] leading-[1.6] m-0">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Wofür: Anwendungsfälle ----------------------------------- */}
      <section className="bg-icon-bg" style={{ padding: "60px 32px 64px", marginTop: 48 }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            Wofür
          </span>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            Wenige Produkte für viele Anwendungen
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-7 leading-[1.6]" style={{ maxWidth: 720 }}>
            Von der Verkehrsfläche bis zur Sichtbeton-Arbeitsplatte. Jede Kachel führt zu einem echten Projekt aus unserer Referenzdatenbank.
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

      {/* 5 — Technologie ---------------------------------------------- */}
      <section style={{ padding: "60px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {C.technologie.kicker}
          </span>
          <h2 className="text-navy mb-3" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {C.technologie.headline}
          </h2>
          <p className="text-navy/75 mt-0 mb-8" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 820 }}>
            {C.technologie.lead}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {C.technologie.punkte.map((p) => (
              <div key={p.titel} className="flex items-start gap-4 bg-white rounded-xl border border-bullet-bg p-5">
                <span className="flex items-center justify-center rounded-lg bg-icon-bg shrink-0" style={{ width: 44, height: 44 }} aria-hidden="true">
                  <AppIcon icon={ICONS[p.icon]} width={22} height={22} strokeWidth={1.9} className="text-cyan-text" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-navy text-[16px] mb-1 mt-0" style={{ fontWeight: 800 }}>
                    {p.titel}
                  </h3>
                  <p className="text-navy/65 text-[13.5px] leading-[1.55] m-0">{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Epoxid-Abgrenzung */}
          <div className="mt-5 rounded-2xl bg-navy text-white" style={{ padding: "28px 28px" }}>
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center rounded-xl bg-white/10 shrink-0" style={{ width: 48, height: 48 }} aria-hidden="true">
                <AppIcon icon={Flame} width={24} height={24} strokeWidth={1.9} className="text-cyan" />
              </span>
              <div>
                <h3 className="text-white text-[18px] mt-0 mb-3" style={{ fontWeight: 900 }}>
                  {C.technologie.epoxid.headline}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {C.technologie.epoxid.punkte.map((p) => (
                    <span key={p} className="inline-flex items-center gap-2 text-white/85 text-[14px]">
                      <AppIcon icon={CheckCircle2} width={16} height={16} strokeWidth={2.25} className="text-cyan shrink-0" aria-hidden="true" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Produkt-Portfolio (gruppiert) ---------------------------- */}
      <section id="portfolio" className="scroll-mt-24" style={{ padding: "60px 32px 16px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {tb(`${SLUG}_produkte_heading`)}
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-8 leading-[1.6]" style={{ maxWidth: 720 }}>
            {C.portfolioIntro}
          </p>
          <div className="flex flex-col gap-10">
            {gruppen.map((g) => (
              <div key={g.key}>
                <div className="mb-4">
                  <h3 className="text-navy mb-1" style={{ fontSize: 20, fontWeight: 900 }}>
                    {g.label}
                  </h3>
                  {g.text && <p className="text-navy/65 text-[14.5px] leading-[1.6] m-0" style={{ maxWidth: 820 }}>{g.text}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {g.items.map((produkt) => (
                    <Link key={produkt.id} href={`/${lang}/produkte/${produkt.id}`} className="no-underline group block">
                      <div
                        className="bg-white p-6 flex flex-col gap-3 h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"
                        style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.08)" }}
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
                        <p className="text-navy opacity-60 text-[14px] m-0 leading-[1.5]">{produkt.kurzbeschreibung}</p>
                        {produkt.belastbarNach && (
                          <span className="inline-flex items-center gap-1.5 text-cyan-text text-[13px] mt-auto pt-2" style={{ fontWeight: 700 }}>
                            <AppIcon icon={Timer} width={14} height={14} strokeWidth={2.25} aria-hidden="true" />
                            belastbar nach {produkt.belastbarNach}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Beweis / Trust ------------------------------------------- */}
      <section className="bg-navy text-white" style={{ padding: "56px 32px 60px", marginTop: 48 }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left lg:border-r lg:border-white/15 lg:pr-12">
              <div className="text-cyan" style={{ fontSize: "clamp(40px, 7vw, 64px)", fontWeight: 900, lineHeight: 1 }}>
                {C.trust.kennzahl}
              </div>
              <p className="text-white/80 text-[15px] mt-2 mb-0" style={{ maxWidth: 240 }}>
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

      {/* 8 — Referenzen ----------------------------------------------- */}
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

      {/* 9 — Fachberatung & Bezug ------------------------------------- */}
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

      {/* Abbinder ----------------------------------------------------- */}
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

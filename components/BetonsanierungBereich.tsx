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
  Layers,
  Droplets,
  Shield,
  Leaf,
  Recycle,
  Flame,
  Wrench,
  SprayCan,
  Anchor,
  Grid3x3,
  CheckCircle2,
  Info,
} from "lucide-react";
import type { Dictionary, Locale } from "../app/[lang]/dictionaries";
import { BETONSANIERUNG_CONTENT, type BetonIcon } from "../data/betonsanierungContent";
import { getBereichBySlug } from "../data/bereiche";
import { produkte } from "../data/produkte";
import { referenzen, getReferenzBySlug } from "../data/referenzen";
import { localizeProdukte, localizeReferenzen } from "../data/i18n/getLocalized";
import { fachberaterFuerBereich } from "../data/fachberater";
import { withBasePath } from "../lib/basePath";

const SLUG = "rapid-set";
const C = BETONSANIERUNG_CONTENT;

const ICONS: Record<BetonIcon, typeof Timer> = {
  timer: Timer,
  layers: Layers,
  droplets: Droplets,
  shield: Shield,
  leaf: Leaf,
  recycle: Recycle,
  flame: Flame,
  wrench: Wrench,
  spray: SprayCan,
  anchor: Anchor,
  grid: Grid3x3,
};

/** Icon je Track-2-Produktgruppe (rein dekorativ). */
const TRACK2_ICON: Record<string, typeof Timer> = {
  spritzmoertel: SprayCan,
  verguss: Anchor,
  pflasterfugen: Grid3x3,
};

/** Dedizierte, redaktionell ausgearbeitete Bereichsseite „Betonsanierung" (DE).
 *  Hybrid: markenneutrales Dach + Track 1 (Rapid Set) + Track 2 (NEODUR-
 *  Instandsetzung). Ersetzt für slug=rapid-set & lang=de das generische
 *  Template. Quelle: data/betonsanierungContent.ts + Spec 2026-06-30 (#320). */
export default async function BetonsanierungBereich({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  const bereich = getBereichBySlug(SLUG);
  const heldBild = bereich?.bild;
  const T1 = C.track1;
  const T2 = C.track2;

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
  // belegtes Paar bleibt das Bild leer (Kachel rendert ohne Foto statt Platzhalter).
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

      {/* 1 — Hero (Dach, markenneutral) ------------------------------- */}
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

      {/* 2 — Problem / Nutzenversprechen (Dach) ----------------------- */}
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

          {/* Typische Sanierungsanlässe (Orientierung) */}
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

      {/* ============ TRACK 1 — Rapid Set ============================= */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          {/* Track-Header */}
          <div className="flex flex-col gap-3 mb-2">
            <span className="self-start inline-flex items-center gap-2 bg-navy text-white uppercase tracking-[0.12em] text-[12px] rounded-full" style={{ padding: "6px 14px", fontWeight: 800 }}>
              {T1.badge}
            </span>
            <h2 className="text-navy m-0" style={{ fontSize: "clamp(24px, 3.6vw, 34px)", fontWeight: 900, lineHeight: 1.12 }}>
              {T1.headline}
            </h2>
            <p className="text-cyan-text m-0" style={{ fontSize: 17, fontWeight: 800 }}>{T1.sub}</p>
            <p className="text-navy/75 mt-1 mb-0" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 820 }}>
              {T1.lead}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {T1.chips.map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5 bg-icon-bg text-navy text-[13px] rounded-full" style={{ padding: "6px 13px", fontWeight: 600 }}>
                  <AppIcon icon={CheckCircle2} width={14} height={14} strokeWidth={2.25} className="text-cyan-text" aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track 1 — Leitmotiv (Taschenmesser) + drei Kernvorteile + Fazit */}
      <section style={{ padding: "32px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src={withBasePath(T1.leitmotiv.bild)}
                alt="Der ALLES-BESSER-KÖNNER: das Rapid Set Taschenmesser-Prinzip, ein Material für viele Anwendungen"
                width={T1.leitmotiv.bildBreite}
                height={T1.leitmotiv.bildHoehe}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              {T1.vorteile.map((v) => (
                <div key={v.titel} className="flex items-start gap-4">
                  <span className="flex items-center justify-center rounded-xl bg-navy shrink-0" style={{ width: 52, height: 52 }} aria-hidden="true">
                    <AppIcon icon={ICONS[v.icon]} width={26} height={26} strokeWidth={1.9} className="text-white" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-cyan-text uppercase tracking-[0.1em] text-[11px]" style={{ fontWeight: 800 }}>
                      {v.kicker}
                    </span>
                    <h3 className="text-navy mt-0.5 mb-1" style={{ fontSize: 19, fontWeight: 900, lineHeight: 1.2 }}>
                      {v.titel}
                    </h3>
                    <p className="text-navy/70 text-[14.5px] leading-[1.6] m-0">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mx-auto" style={{ maxWidth: 860, marginTop: 44 }}>
            <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
              {T1.leitmotiv.kicker}
            </span>
            <h3 className="text-navy mb-3" style={{ fontSize: "clamp(22px, 3.2vw, 30px)", fontWeight: 900, lineHeight: 1.2 }}>
              {T1.leitmotiv.headline}
            </h3>
            <p className="text-navy/70 mb-0" style={{ fontSize: 17, lineHeight: 1.7 }}>
              {T1.leitmotiv.text}
            </p>
          </div>
        </div>
      </section>

      {/* Track 1 — Technologie + Epoxid-Abgrenzung */}
      <section style={{ padding: "48px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {T1.technologie.kicker}
          </span>
          <h3 className="text-navy mb-3" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {T1.technologie.headline}
          </h3>
          <p className="text-navy/75 mt-0 mb-8" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 820 }}>
            {T1.technologie.lead}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {T1.technologie.punkte.map((p) => (
              <div key={p.titel} className="flex items-start gap-4 bg-white rounded-xl border border-bullet-bg p-5">
                <span className="flex items-center justify-center rounded-lg bg-icon-bg shrink-0" style={{ width: 44, height: 44 }} aria-hidden="true">
                  <AppIcon icon={ICONS[p.icon]} width={22} height={22} strokeWidth={1.9} className="text-cyan-text" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-navy text-[16px] mb-1 mt-0" style={{ fontWeight: 800 }}>
                    {p.titel}
                  </h4>
                  <p className="text-navy/65 text-[13.5px] leading-[1.55] m-0">{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-navy text-white text-center" style={{ padding: "40px 28px" }}>
            <h3 className="text-white mt-0 mb-6" style={{ fontSize: "clamp(20px, 2.8vw, 25px)", fontWeight: 900 }}>
              {T1.technologie.epoxid.headline}
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {T1.technologie.epoxid.punkte.map((p) => (
                <span key={p} className="inline-flex items-center gap-2 text-white/90" style={{ fontSize: 17 }}>
                  <AppIcon icon={CheckCircle2} width={18} height={18} strokeWidth={2.25} className="text-cyan shrink-0" aria-hidden="true" />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Track-1-Beleg + Händler-Hinweis */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-5 items-center mt-5">
            <div className="flex items-center gap-4 bg-icon-bg rounded-2xl" style={{ padding: "20px 26px" }}>
              <span className="text-cyan-text shrink-0" style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 900, lineHeight: 1 }}>
                {T1.beleg.kennzahl}
              </span>
              <div className="min-w-0">
                <p className="text-navy text-[14px] m-0 leading-[1.5]" style={{ fontWeight: 700 }}>{T1.beleg.kennzahlText}</p>
                <p className="text-navy/65 text-[13px] m-0 leading-[1.5]">{T1.beleg.lead}</p>
              </div>
            </div>
            {T1.haendlerHinweis && (
              <div className="flex items-start gap-3 bg-white rounded-2xl border border-navy/10" style={{ padding: "18px 20px" }}>
                <AppIcon icon={Info} width={20} height={20} strokeWidth={2} className="text-cyan-text shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-navy text-[14px] m-0 leading-[1.6]">{tb("haendler_hinweis")}</p>
              </div>
            )}
          </div>

          {/* Track-1-Claim (verbatim) */}
          <p className="text-cyan-text text-center mt-8 mb-0" style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 900 }}>
            {T1.claim}
          </p>
        </div>
      </section>

      {/* ============ TRACK 2 — NEODUR-Instandsetzung ================= */}
      <section className="bg-icon-bg" style={{ padding: "56px 32px 60px", marginTop: 48 }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="flex flex-col gap-3 mb-8">
            <span className="self-start inline-flex items-center gap-2 bg-navy text-white uppercase tracking-[0.12em] text-[12px] rounded-full" style={{ padding: "6px 14px", fontWeight: 800 }}>
              {T2.badge}
            </span>
            <h2 className="text-navy m-0" style={{ fontSize: "clamp(24px, 3.6vw, 34px)", fontWeight: 900, lineHeight: 1.12 }}>
              {T2.headline}
            </h2>
            <p className="text-navy/75 mt-1 mb-0" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 820 }}>
              {T2.lead}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {T2.gruppen.map((g) => (
              <div key={g.gruppe} className="flex flex-col bg-white rounded-2xl border border-navy/10 h-full" style={{ padding: "26px 24px" }}>
                <span className="flex items-center justify-center rounded-xl bg-navy shrink-0 mb-4" style={{ width: 52, height: 52 }} aria-hidden="true">
                  <AppIcon icon={TRACK2_ICON[g.gruppe] ?? Wrench} width={26} height={26} strokeWidth={1.9} className="text-white" />
                </span>
                <h3 className="text-navy mt-0 mb-2" style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.2 }}>
                  {g.label}
                </h3>
                <p className="text-navy/70 text-[14.5px] leading-[1.6] mt-0 mb-4 flex-1">{g.intro}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-bullet-bg">
                  {g.produkte.map((name) => (
                    <a
                      key={name}
                      href="#portfolio"
                      className="inline-flex items-center bg-icon-bg text-navy text-[12.5px] rounded-full no-underline hover:bg-cyan hover:text-white transition-colors"
                      style={{ padding: "5px 11px", fontWeight: 700 }}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Wofür: Anwendungsfälle (beide Linien) -------------------- */}
      <section style={{ padding: "60px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            Wofür
          </span>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            Von der Verkehrsfläche bis zur Pflasterfuge
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-7 leading-[1.6]" style={{ maxWidth: 720 }}>
            Reparatur, Reprofilierung, Verguss und Fugensanierung. Jede Kachel führt zu einem echten Projekt aus unserer Referenzdatenbank.
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

      {/* 4 — Produkt-Portfolio (beide Linien, gruppiert) -------------- */}
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

      {/* 5 — Beweis / Trust (Dach) ------------------------------------ */}
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

      {/* 6 — Fachberatung & Bezug (vor den Referenzen) ---------------- */}
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

      {/* 7 — Referenzen ----------------------------------------------- */}
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

      {/* Abbinder (Dach) ---------------------------------------------- */}
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

import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import BeraterCard from "./BeraterCard";
import { AppIcon } from "@/components/ui/icon";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Leaf,
  Droplets,
  Sparkles,
  Layers,
  Timer,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import type { Dictionary, Locale } from "../app/[lang]/dictionaries";
import { MICROTOP_CONTENT } from "../data/microtopContent";
import { getBereichBySlug } from "../data/bereiche";
import { getProduktById } from "../data/produkte";
import { fachberaterFuerBereich } from "../data/fachberater";
import { withBasePath } from "../lib/basePath";

const SLUG = "microtop";
const C = MICROTOP_CONTENT;

/** Icons für die sechs USP-Karten (Reihenfolge = C.usps). */
const USP_ICONS = [ShieldCheck, Leaf, Droplets, Sparkles, Layers, Timer] as const;

/** Dedizierte Rich-Bereichsseite „MICROTOP TW-Behältersanierung" (DE, #375).
 *  Quelle: technisch abgenommene LP lp-live.korodur.de/microtop-tw. Kontakt läuft
 *  über den Fachberater-Finder (keine Personen). EN/FR/PL/ES → generisches Template. */
export default async function MicrotopBereich({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const tb = (k: string) => (dict.bereiche as Record<string, string>)[k] ?? k;
  const heldBild = getBereichBySlug(SLUG)?.bild;
  const fachberater = fachberaterFuerBereich(SLUG, lang);

  const produktLink = (id: string) => {
    const p = getProduktById(id);
    return p ? { href: `/${lang}/produkte/${p.id}`, name: p.name } : null;
  };

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

      {/* 1 — Hero -------------------------------------------------------- */}
      <section className="relative overflow-hidden" style={{ minHeight: 440 }}>
        {heldBild && (
          <Image src={withBasePath(heldBild)} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
        <div
          className="relative mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          style={{ maxWidth: 1320, padding: "64px 32px 68px" }}
        >
          <div className="lg:max-w-[780px]">
            <span className="inline-block text-cyan uppercase tracking-[0.14em] text-[13px] mb-3" style={{ fontWeight: 800 }}>
              {C.hero.kicker}
            </span>
            <h1 className="text-white mb-4" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.1 }}>
              {C.hero.h1[0]}
              <br />
              {C.hero.h1[1]}
            </h1>
            <p className="text-cyan mb-5" style={{ fontSize: "clamp(15px, 2.1vw, 19px)", fontWeight: 800 }}>
              {C.hero.sub}
            </p>
            <p className="text-white/85 mb-6" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 700 }}>
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
          <Link
            href={`/${lang}/kontakt/?bereich=${SLUG}`}
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-[6px] bg-cyan text-white no-underline hover:bg-cyan-hover transition-colors duration-200"
            style={{ padding: "14px 26px", fontWeight: 800, fontSize: 15, minHeight: 48 }}
          >
            {tb("header_cta")}
            <AppIcon icon={ArrowRight} width={16} height={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2 — Problem („Das kennen Sie") --------------------------------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {C.problem.kicker}
          </span>
          <h2 className="text-navy mb-3" style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
            {C.problem.headline}
          </h2>
          <p className="text-navy/75 mb-8" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 820 }}>
            {C.problem.lead}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {C.problem.punkte.map((p) => (
              <div key={p.titel} className="bg-icon-bg rounded-2xl" style={{ padding: "24px 22px" }}>
                <span className="flex items-center justify-center rounded-xl bg-navy mb-4" style={{ width: 46, height: 46 }} aria-hidden="true">
                  <AppIcon icon={AlertTriangle} width={22} height={22} strokeWidth={2} className="text-cyan" />
                </span>
                <h3 className="text-navy mt-0 mb-1.5" style={{ fontSize: 18, fontWeight: 900 }}>{p.titel}</h3>
                <p className="text-navy/70 text-[14.5px] leading-[1.6] m-0">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — System / Lösung -------------------------------------------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
                {C.system.kicker}
              </span>
              <h2 className="text-navy mb-4" style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
                {C.system.headline}
              </h2>
              <p className="text-navy/75 mb-0" style={{ fontSize: 17, lineHeight: 1.7 }}>
                {C.system.text}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16 / 11" }}>
              <Image src={withBasePath(C.system.bild)} alt="Trinkwasserbehälter innen" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — USPs ------------------------------------------------------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {C.usps.map((u, i) => {
              const Icon = USP_ICONS[i] ?? ShieldCheck;
              return (
                <div key={u.titel} className="bg-white rounded-2xl border border-bullet-bg" style={{ padding: "24px 22px" }}>
                  <span className="flex items-center justify-center rounded-xl bg-navy mb-4" style={{ width: 46, height: 46 }} aria-hidden="true">
                    <AppIcon icon={Icon} width={22} height={22} strokeWidth={1.9} className="text-white" />
                  </span>
                  <h3 className="text-navy mt-0 mb-1.5" style={{ fontSize: 17, fontWeight: 900 }}>{u.titel}</h3>
                  <p className="text-navy/70 text-[14px] leading-[1.55] m-0">{u.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — Ein System, drei Verfahren --------------------------------- */}
      <section className="bg-icon-bg" style={{ padding: "56px 32px 60px", marginTop: 48 }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {C.verfahren.kicker}
          </span>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {C.verfahren.headline}
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-7 leading-[1.6]" style={{ maxWidth: 760 }}>
            {C.verfahren.lead}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {C.verfahren.items.map((v) => (
              <div key={v.titel} className="bg-white rounded-2xl border border-navy/10 overflow-hidden flex flex-col">
                <div className="relative" style={{ aspectRatio: "16 / 9" }}>
                  <Image src={withBasePath(v.bild)} alt={v.titel} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="flex flex-col" style={{ padding: "20px 22px" }}>
                  <h3 className="text-navy mt-0 mb-2" style={{ fontSize: 19, fontWeight: 900 }}>{v.titel}</h3>
                  <p className="text-navy/70 text-[14.5px] leading-[1.6] m-0">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Produktwahl (Bedarfs-Matrix) ------------------------------- */}
      <section id="produkte" className="scroll-mt-24" style={{ padding: "60px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {C.produktwahl.kicker}
          </span>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {C.produktwahl.headline}
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-6 leading-[1.6]" style={{ maxWidth: 760 }}>
            {C.produktwahl.lead}
          </p>
          <div className="overflow-x-auto rounded-2xl border border-bullet-bg">
            <table className="w-full border-collapse text-left" style={{ minWidth: 720 }}>
              <thead>
                <tr className="bg-navy text-white">
                  {C.produktwahl.spalten.map((s) => (
                    <th key={s} className="text-[13px] uppercase tracking-wide" style={{ padding: "12px 16px", fontWeight: 800 }}>
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {C.produktwahl.zeilen.map((z, i) => (
                  <tr key={z.bedarf} className={i % 2 ? "bg-icon-bg" : "bg-white"}>
                    <td className="text-navy text-[14px]" style={{ padding: "12px 16px", fontWeight: 600 }}>{z.bedarf}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span className="flex flex-wrap gap-x-2 gap-y-1">
                        {z.ids.map((id, j) => {
                          const l = produktLink(id);
                          return l ? (
                            <Link key={id} href={l.href} className="text-cyan-text text-[14px] no-underline hover:underline" style={{ fontWeight: 700 }}>
                              {z.produkt.split(",")[j]?.trim() ?? l.name}
                            </Link>
                          ) : (
                            <span key={id} className="text-navy text-[14px]" style={{ fontWeight: 700 }}>{z.produkt}</span>
                          );
                        })}
                      </span>
                    </td>
                    <td className="text-navy/75 text-[14px]" style={{ padding: "12px 16px" }}>{z.schichtdicke}</td>
                    <td className="text-navy/75 text-[14px]" style={{ padding: "12px 16px" }}>{z.verfahren}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7 — Ergänzend: Verguss ----------------------------------------- */}
      {(() => {
        const l = produktLink(C.verguss.produktId);
        return (
          <section style={{ padding: "40px 32px 8px" }}>
            <div className="mx-auto" style={{ maxWidth: 1320 }}>
              <div className="rounded-2xl border border-navy/10 bg-white" style={{ padding: "28px 28px" }}>
                <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
                  {C.verguss.kicker}
                </span>
                <h3 className="text-navy mt-0 mb-2" style={{ fontSize: 20, fontWeight: 900 }}>{C.verguss.produktName}</h3>
                <p className="text-navy/70 text-[15px] leading-[1.65] mt-0 mb-4" style={{ maxWidth: 820 }}>{C.verguss.text}</p>
                {l && (
                  <Link href={l.href} className="inline-flex items-center gap-1.5 text-cyan-text text-[15px] no-underline hover:underline" style={{ fontWeight: 700 }}>
                    Zum Produkt
                    <AppIcon icon={ChevronRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 8 — Systemvergleich -------------------------------------------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {C.systemvergleich.kicker}
          </span>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {C.systemvergleich.headline}
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-6 leading-[1.6]" style={{ maxWidth: 760 }}>
            {C.systemvergleich.lead}
          </p>
          <div className="overflow-x-auto rounded-2xl border border-bullet-bg">
            <table className="w-full border-collapse text-left" style={{ minWidth: 720 }}>
              <thead>
                <tr className="bg-navy text-white">
                  {C.systemvergleich.spalten.map((s, i) => (
                    <th key={s} className={`text-[13px] ${i === 1 ? "text-cyan" : ""}`} style={{ padding: "12px 16px", fontWeight: 800 }}>
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {C.systemvergleich.zeilen.map((z, i) => (
                  <tr key={z.kriterium} className={i % 2 ? "bg-icon-bg" : "bg-white"}>
                    <td className="text-navy text-[14px]" style={{ padding: "12px 16px", fontWeight: 700 }}>{z.kriterium}</td>
                    <td className="text-navy text-[14px] bg-cyan/5" style={{ padding: "12px 16px", fontWeight: 700 }}>{z.microtop}</td>
                    <td className="text-navy/70 text-[14px]" style={{ padding: "12px 16px" }}>{z.epoxid}</td>
                    <td className="text-navy/70 text-[14px]" style={{ padding: "12px 16px" }}>{z.edelstahl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9 — DVGW-Übersicht --------------------------------------------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="rounded-2xl bg-navy text-white" style={{ padding: "36px 32px" }}>
            <span className="inline-block text-cyan uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
              {C.dvgw.kicker}
            </span>
            <h2 className="text-white mt-0 mb-2" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
              {C.dvgw.headline}
            </h2>
            <p className="text-white/75 text-[16px] mt-0 mb-6 leading-[1.6]" style={{ maxWidth: 760 }}>
              {C.dvgw.lead}
            </p>
            <div className="flex flex-col gap-2">
              {C.dvgw.uebersicht.map((u) => (
                <div key={u.produkte} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-white/5 border border-white/10 rounded-xl" style={{ padding: "14px 18px" }}>
                  <span className="text-white text-[14.5px]" style={{ fontWeight: 600 }}>{u.produkte}</span>
                  <span className="text-cyan text-[13px] shrink-0" style={{ fontWeight: 800 }}>{u.zulassung}</span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-[13px] mt-5 mb-0 leading-[1.6]">{C.dvgw.footer}</p>
          </div>
        </div>
      </section>

      {/* 10 — Referenzen ------------------------------------------------ */}
      <section style={{ padding: "60px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <span className="inline-block text-cyan-text uppercase tracking-[0.12em] text-[12px] mb-2" style={{ fontWeight: 800 }}>
            {C.referenzen.kicker}
          </span>
          <h2 className="text-navy mb-2" style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900 }}>
            {C.referenzen.headline}
          </h2>
          <p className="text-navy/70 text-[16px] mt-0 mb-7 leading-[1.6]" style={{ maxWidth: 760 }}>
            {C.referenzen.lead}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {C.referenzen.projekte.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-bullet-bg overflow-hidden flex flex-col">
                <div className="relative" style={{ aspectRatio: "16 / 10" }}>
                  <Image src={withBasePath(r.bild)} alt={r.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                </div>
                <div className="flex flex-col flex-1" style={{ padding: "20px 22px" }}>
                  <span className="text-cyan-text text-[12px] uppercase tracking-wide" style={{ fontWeight: 800 }}>{r.ort}</span>
                  <h3 className="text-navy mt-0.5 mb-1" style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.2 }}>{r.name}</h3>
                  <p className="text-navy/50 text-[12.5px] m-0 mb-2">{r.bauherr} · {r.kennzahl}</p>
                  <p className="text-navy/70 text-[14px] leading-[1.55] m-0">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — FAQ ------------------------------------------------------- */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          <h2 className="text-navy mb-6" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900 }}>
            {C.faq.kicker}
          </h2>
          <div className="flex flex-col gap-3">
            {C.faq.items.map((f) => (
              <details key={f.frage} className="group bg-white rounded-xl border border-bullet-bg" style={{ padding: "4px 4px" }}>
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-navy" style={{ padding: "16px 18px", fontWeight: 800, fontSize: 16 }}>
                  {f.frage}
                  <AppIcon icon={ChevronRight} width={18} height={18} strokeWidth={2.5} className="text-cyan-text shrink-0 transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="text-navy/70 text-[15px] leading-[1.65]" style={{ padding: "0 18px 16px" }}>{f.antwort}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Fachberatung ---------------------------------------------- */}
      {fachberater.length > 0 && (
        <section id="fachberater" className="scroll-mt-24" style={{ padding: "56px 32px 8px" }}>
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

      {/* Abbinder ------------------------------------------------------- */}
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

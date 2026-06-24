import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import ArtikelInhalt from "./ArtikelInhalt";
import ReferenceCard from "./ReferenceCard";
import { getReferenzBySlug } from "../data/referenzen";
import { getProduktById } from "../data/produkte";
import { localizeReferenzen, localizeProdukte } from "../data/i18n/getLocalized";
import { withBasePath } from "../lib/basePath";

// #170/#296: Überschriften der eingewebten Karten-Elemente je Sprache (Artikel
// sind v. a. DE; Fallback DE). Bewusst inline — generische Hülle.
const REFERENZEN_LABEL: Record<string, string> = {
  de: "Referenzen aus der Praxis",
  en: "Project references",
  fr: "Références de projets",
  pl: "Referencje z praktyki",
  es: "Referencias de proyectos",
};
const PRODUKTE_LABEL: Record<string, string> = {
  de: "Passende KORODUR-Systeme",
  en: "Matching KORODUR systems",
  fr: "Systèmes KORODUR adaptés",
  pl: "Pasujące systemy KORODUR",
  es: "Sistemas KORODUR adecuados",
};
const PLATZHALTER_REF: Record<string, string> = {
  de: "Referenz zuordnen",
  en: "Assign reference",
  fr: "Attribuer une référence",
  pl: "Przypisz referencję",
  es: "Asignar referencia",
};
const PLATZHALTER_SUB: Record<string, string> = {
  de: "Von Technik / Vertrieb",
  en: "By engineering / sales",
  fr: "Par technique / commercial",
  pl: "Przez dział techniczny / sprzedaż",
  es: "Por ingeniería / ventas",
};
const LESEZEIT_LABEL: Record<string, string> = {
  de: "Lesezeit ca.",
  en: "Reading time approx.",
  fr: "Temps de lecture env.",
  pl: "Czas czytania ok.",
  es: "Tiempo de lectura aprox.",
};
const MIN_LABEL: Record<string, string> = { de: "Min.", en: "min", fr: "min", pl: "min", es: "min" };

// Auf so viele Karten-Slots wird jedes Element aufgefüllt (echte zuerst, Rest
// Platzhalter — Kollegen ordnen zu). Steffi 2026-06-23.
const SLOTS = 3;

/** Body an Top-Level-H2 (`## `) zerschneiden. segs[0] = Intro vor der ersten H2,
 *  segs[1..] = je ein H2-Abschnitt. H3 bleibt im Abschnitt. */
function splitAtH2(body: string): string[] {
  const segmente: string[] = [];
  let aktuell: string[] = [];
  for (const zeile of body.split("\n")) {
    if (/^## /.test(zeile)) {
      segmente.push(aktuell.join("\n"));
      aktuell = [zeile];
    } else {
      aktuell.push(zeile);
    }
  }
  segmente.push(aktuell.join("\n"));
  return segmente;
}

function lesezeitMinuten(body: string): number {
  const woerter = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(woerter / 200));
}

function PlatzhalterKarte({ titel, sub }: { titel: string; sub: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[14px] border-2 border-dashed border-mid-gray bg-icon-bg/50 text-center"
      style={{ minHeight: 280, padding: "28px 22px" }}
    >
      <div
        className="flex items-center justify-center rounded-full border-2 border-dashed border-mid-gray text-navy/40"
        style={{ width: 44, height: 44, fontSize: 24, fontWeight: 700, lineHeight: 1 }}
        aria-hidden="true"
      >
        +
      </div>
      <p className="text-navy/60 m-0 mt-3" style={{ fontSize: 14, fontWeight: 800 }}>{titel}</p>
      <p className="text-navy/40 m-0 mt-1" style={{ fontSize: 12 }}>{sub}</p>
    </div>
  );
}

function ProduktTeaserKarte({
  produkt,
  lang,
}: {
  produkt: Awaited<ReturnType<typeof localizeProdukte>>[number];
  lang: string;
}) {
  return (
    <Link href={`/${lang}/produkte/${produkt.id}`} className="no-underline group block">
      <div
        className="bg-white flex flex-col h-full overflow-hidden border border-bullet-bg transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"
        style={{ borderRadius: 14 }}
      >
        {produkt.bild && (
          <div className="relative w-full overflow-hidden bg-icon-bg" style={{ aspectRatio: "16 / 10" }}>
            <Image
              src={withBasePath(produkt.bild)}
              alt={produkt.name}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5 flex flex-col gap-2 flex-1">
          {produkt.qualitaetsklasse && (
            <span
              className="self-start text-[10px] text-white uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ backgroundColor: "var(--cyan)", fontWeight: 700 }}
            >
              {produkt.qualitaetsklasse}
            </span>
          )}
          <h4 className="text-navy text-[17px] m-0" style={{ fontWeight: 900 }}>{produkt.name}</h4>
          <p className="text-navy opacity-60 text-[14px] m-0 leading-[1.5]">{produkt.kurzbeschreibung}</p>
          <span className="text-cyan-text text-[14px] mt-auto pt-2" style={{ fontWeight: 700 }}>
            {lang === "de" ? "Zum Produkt" : "View product"} →
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Gemeinsame Seiten-Hülle für Fachartikel (#296, Blog-Layout): Hero + Titel +
 *  Fließtext in Blog-Typografie. Vorhandene `referenzen` werden als Element in der
 *  oberen Texthälfte eingewebt, `produkte` als Produktkacheln kurz vor dem CTA;
 *  die letzte Sektion (CTA) steht isoliert. Karten-Elemente werden mit
 *  Platzhaltern auf 3 aufgefüllt. */
export default async function ArtikelSeite({
  lang,
  titel,
  breadcrumb,
  body,
  referenzenSlugs,
  produkteIds,
  bild,
  bildAlt,
}: {
  lang: string;
  titel: string;
  breadcrumb: { label: string; href?: string }[];
  body: string;
  referenzenSlugs?: string[];
  produkteIds?: string[];
  bild?: string;
  bildAlt?: string;
}) {
  // Referenzen (echte zuerst, dann Platzhalter auf SLOTS) — nur wenn ≥1 echte.
  const refsBasis = (referenzenSlugs ?? [])
    .map((slug) => getReferenzBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => r !== undefined);
  const refs =
    refsBasis.length > 0
      ? await localizeReferenzen(refsBasis, lang as Parameters<typeof localizeReferenzen>[1])
      : [];

  // Produkte (echte zuerst, dann Platzhalter auf SLOTS) — nur wenn ≥1 echtes.
  const prodBasis = (produkteIds ?? [])
    .map((id) => getProduktById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);
  const produkte =
    prodBasis.length > 0
      ? await localizeProdukte(prodBasis, lang as Parameters<typeof localizeProdukte>[1])
      : [];

  const segmente = splitAtH2(body);
  const intro = segmente[0] ?? "";
  const sektionen = segmente.slice(1);
  const n = sektionen.length;

  // Referenzen in die obere Texthälfte, Produkte kurz vor die letzte (CTA-)Sektion.
  const refsNachIdx = n >= 3 ? Math.min(Math.max(Math.round(n * 0.33), 1), n - 2) : 0;
  const produkteVorIdx = Math.max(n - 1, 0);

  const minuten = lesezeitMinuten(body);

  const ARTIKEL = "mx-auto" as const;
  const ARTIKEL_STYLE = { maxWidth: 760 } as const;
  const FRAME = "mx-auto" as const;
  const FRAME_STYLE = { maxWidth: 1100 } as const;

  const RefElement = refs.length > 0 && (
    <section className="bg-icon-bg" style={{ padding: "48px 32px" }}>
      <div className={FRAME} style={FRAME_STYLE}>
        <div className={ARTIKEL} style={ARTIKEL_STYLE}>
          <h2 className="text-navy mt-0 mb-5" style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.2 }}>
            {REFERENZEN_LABEL[lang] ?? REFERENZEN_LABEL.de}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: SLOTS }).map((_, i) =>
            refs[i] ? (
              <ReferenceCard key={refs[i].id} referenz={refs[i]} lang={lang} />
            ) : (
              <PlatzhalterKarte
                key={`ref-platz-${i}`}
                titel={PLATZHALTER_REF[lang] ?? PLATZHALTER_REF.de}
                sub={PLATZHALTER_SUB[lang] ?? PLATZHALTER_SUB.de}
              />
            )
          )}
        </div>
      </div>
    </section>
  );

  const ProduktElement = produkte.length > 0 && (
    <section style={{ padding: "48px 32px 8px" }}>
      <div className={FRAME} style={FRAME_STYLE}>
        <div className={ARTIKEL} style={ARTIKEL_STYLE}>
          <h2 className="text-navy mt-0 mb-5" style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.2 }}>
            {PRODUKTE_LABEL[lang] ?? PRODUKTE_LABEL.de}
          </h2>
        </div>
        {/* Produkte: genau die 2–3 echten Empfehlungen, keine Platzhalter-Auffüllung. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produkte.slice(0, SLOTS).map((p) => (
            <ProduktTeaserKarte key={p.id} produkt={p} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );

  const Prosa = ({ md, lead }: { md: string; lead?: boolean }) =>
    md.trim() ? (
      <section style={{ padding: "0 32px" }}>
        <div className={FRAME} style={FRAME_STYLE}>
          <div className={ARTIKEL} style={ARTIKEL_STYLE}>
            <ArtikelInhalt lang={lang} body={md} lead={lead} />
          </div>
        </div>
      </section>
    ) : null;

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className={FRAME} style={FRAME_STYLE}>
          <div className={ARTIKEL} style={ARTIKEL_STYLE}>
            <Breadcrumb items={breadcrumb} lang={lang} />
          </div>
        </div>
      </section>

      {/* Hero über volle Rahmenbreite, Titel + Meta in der Lesespalte. */}
      <section style={{ padding: "12px 32px 8px" }}>
        <div className={FRAME} style={FRAME_STYLE}>
          {bild && (
            <figure className="mb-6 overflow-hidden rounded-2xl border border-bullet-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(bild)}
                alt={bildAlt ?? titel}
                className="w-full h-auto"
                style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            </figure>
          )}
          <div className={ARTIKEL} style={ARTIKEL_STYLE}>
            <h1
              className="text-navy mb-3"
              style={{ fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.01em" }}
            >
              {titel}
            </h1>
            <p
              className="m-0 mb-6 border-b border-bullet-bg pb-4 text-navy/60"
              style={{ fontSize: 13.5, fontWeight: 600 }}
            >
              {LESEZEIT_LABEL[lang] ?? LESEZEIT_LABEL.de} {minuten} {MIN_LABEL[lang] ?? MIN_LABEL.de}
            </p>
          </div>
        </div>
      </section>

      {/* Intro mit Lead-Absatz. */}
      <Prosa md={intro} lead />

      {/* H2-Sektionen: Referenzen oben einweben, Produkte vor die letzte Sektion. */}
      {sektionen.map((md, i) => (
        <div key={i}>
          {ProduktElement && i === produkteVorIdx ? ProduktElement : null}
          <Prosa md={md} />
          {RefElement && i === refsNachIdx ? RefElement : null}
        </div>
      ))}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import {
  KORODUR_FIRMA,
  KORODUR_ZENTRALE,
  KORODUR_WERK_BOCHUM,
} from "../../../lib/kontaktDaten";
import { alternatesFor } from "../../../lib/seo";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.unternehmen.title,
    description: dict.unternehmen.intro1,
    alternates: alternatesFor(lang, "/unternehmen/"),
  };
}

export default async function UnternehmenPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <section style={{ padding: "48px 32px 40px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <h1
            className="mb-6"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {dict.unternehmen.title}
          </h1>
          <p className="text-navy/80 mb-5" style={{ fontSize: 17, lineHeight: 1.75 }}>
            {dict.unternehmen.intro1}
          </p>
          <p className="text-navy/80 m-0" style={{ fontSize: 17, lineHeight: 1.75 }}>
            {dict.unternehmen.intro2}
          </p>
        </div>
      </section>

      {/* Standorte */}
      <section className="bg-icon-bg" style={{ padding: "56px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <h2
            className="mb-6"
            style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}
          >
            {dict.unternehmen.standorte_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Zentrale */}
            <div className="bg-white p-7" style={{ borderRadius: 14 }}>
              <span
                className="inline-block bg-cyan text-white text-[11px] uppercase tracking-wider rounded mb-4"
                style={{ padding: "4px 10px", fontWeight: 700 }}
              >
                {dict.unternehmen.standort_zentrale}
              </span>
              <h3 className="text-navy text-[18px] mt-0 mb-3" style={{ fontWeight: 900 }}>
                Amberg
              </h3>
              <p className="text-navy/70 text-[14px] m-0 leading-[1.8]">
                <span className="block" style={{ fontWeight: 700 }}>
                  {KORODUR_FIRMA}
                </span>
                {KORODUR_ZENTRALE.strasse}
                <br />
                {KORODUR_ZENTRALE.plzOrt}
                <br />
                <a href={KORODUR_ZENTRALE.telefonHref} className="text-cyan no-underline hover:underline">
                  {KORODUR_ZENTRALE.telefon}
                </a>
                <br />
                <a href={`mailto:${KORODUR_ZENTRALE.email}`} className="text-cyan no-underline hover:underline">
                  {KORODUR_ZENTRALE.email}
                </a>
              </p>
            </div>

            {/* Werk Bochum */}
            <div className="bg-white p-7" style={{ borderRadius: 14 }}>
              <span
                className="inline-block bg-navy text-white text-[11px] uppercase tracking-wider rounded mb-4"
                style={{ padding: "4px 10px", fontWeight: 700 }}
              >
                {dict.unternehmen.standort_werk}
              </span>
              <h3 className="text-navy text-[18px] mt-0 mb-3" style={{ fontWeight: 900 }}>
                {KORODUR_WERK_BOCHUM.name}
              </h3>
              <p className="text-navy/70 text-[14px] m-0 leading-[1.8]">
                <span className="block" style={{ fontWeight: 700 }}>
                  {KORODUR_FIRMA}
                </span>
                {KORODUR_WERK_BOCHUM.strasse}
                <br />
                {KORODUR_WERK_BOCHUM.plzOrt}
                <br />
                <a href={KORODUR_WERK_BOCHUM.telefonHref} className="text-cyan no-underline hover:underline">
                  {KORODUR_WERK_BOCHUM.telefon}
                </a>
                <br />
                <a href={`mailto:${KORODUR_WERK_BOCHUM.email}`} className="text-cyan no-underline hover:underline">
                  {KORODUR_WERK_BOCHUM.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Geschichte: Meilensteine (Quelle: Alt-Site /unternehmen/geschichte/) */}
      <section style={{ padding: "56px 32px 8px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <h2
            className="mb-3"
            style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}
          >
            {dict.unternehmen.geschichte_title}
          </h2>
          <p className="text-navy/70 mt-0 mb-7" style={{ fontSize: 16, lineHeight: 1.7 }}>
            {dict.unternehmen.geschichte_intro}
          </p>
          <ol className="list-none m-0 p-0 border-l-2 border-bullet-bg">
            {dict.unternehmen.meilensteine.map((m) => (
              <li key={m.jahr} className="relative pl-7 pb-6 last:pb-0">
                <span
                  className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-cyan"
                  aria-hidden="true"
                />
                <span className="block text-cyan text-[14px]" style={{ fontWeight: 800 }}>
                  {m.jahr}
                </span>
                <span className="text-navy/80 text-[15px] leading-[1.6]">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Nachhaltigkeit */}
      <section style={{ padding: "56px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <h2
            className="mb-4"
            style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}
          >
            {dict.unternehmen.nachhaltigkeit_title}
          </h2>
          <p className="text-navy/80 m-0" style={{ fontSize: 17, lineHeight: 1.75 }}>
            {dict.unternehmen.nachhaltigkeit_text}
          </p>
        </div>
      </section>

      {/* CTA-Band */}
      <section className="bg-navy text-white text-center" style={{ padding: "64px 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <h2 className="text-white mb-6" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900 }}>
            {dict.unternehmen.cta_title}
          </h2>
          <Link
            href={`/${lang}/kontakt/`}
            className="inline-flex items-center justify-center text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
            style={{ padding: "14px 30px", fontWeight: 800, fontSize: 15, minHeight: 44 }}
          >
            {dict.unternehmen.cta_button}
          </Link>
        </div>
      </section>
    </>
  );
}

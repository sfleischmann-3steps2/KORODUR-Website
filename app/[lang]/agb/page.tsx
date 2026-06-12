import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { LOCALES } from "../../../lib/i18n";
import { notFound } from "next/navigation";
import { alternatesFor } from "../../../lib/seo";
import { AGB } from "../../../data/agbText";

// AGB 1:1 von korodur.de/agb (Wayback 2025-01-22, Stand Juli 2016).
// Entscheidung Steffi 2026-06-12: übernehmen. Launch-Plan M3.

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "AGB",
    alternates: alternatesFor(lang, "/agb/"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function AgbPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section style={{ padding: "48px 32px 88px" }}>
      <div className="mx-auto text-navy text-[15px] leading-[1.7]" style={{ maxWidth: 760 }}>
        <h1 className="mb-2" style={{ fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900 }}>
          {AGB.titel}
        </h1>
        <p className="text-navy/70 mb-2" style={{ fontWeight: 700 }}>
          {AGB.firmen.join(" · ")}
        </p>
        {lang !== "de" && (
          <p className="text-navy/60 text-[14px] mb-6 italic">{dict.rechtliches.sprachhinweis}</p>
        )}
        {AGB.abschnitte.map((a) => (
          <div key={a.ueberschrift}>
            <h2 className="m-0 mt-8 mb-3 text-[19px]" style={{ fontWeight: 900 }}>
              {a.ueberschrift}
            </h2>
            {a.absaetze.map((p, i) => (
              <p key={i} className="m-0 mb-3">
                {p}
              </p>
            ))}
          </div>
        ))}
        <p className="mt-10 mb-0 text-[13px] text-navy/50">{AGB.stand}</p>
      </div>
    </section>
  );
}

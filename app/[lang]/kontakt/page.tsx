import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { KORODUR_FIRMA, KORODUR_ZENTRALE } from "../../../lib/kontaktDaten";
import { alternatesFor } from "../../../lib/seo";
import { FACHBERATER_DE, FACHBERATER_INTERNATIONAL } from "../../../data/fachberater";
import BeraterCard from "../../../components/BeraterCard";
import FachberaterFinder from "../../../components/FachberaterFinder";
import KontaktFormular from "../../../components/KontaktFormular";
import { AppIcon } from "@/components/ui/icon";
import { Mail, Phone, Printer } from "lucide-react";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.kontakt.title,
    description: dict.kontakt.intro,
    alternates: alternatesFor(lang, "/kontakt/"),
  };
}

export default async function KontaktPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <section style={{ padding: "48px 32px 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <h1 className="mb-4" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}>
            {dict.kontakt.title}
          </h1>
          <p className="text-navy/70 m-0" style={{ fontSize: 18, lineHeight: 1.7 }}>
            {dict.kontakt.intro}
          </p>
        </div>
      </section>

      {/* Fachberater zuerst (Steffi #90): Bereich- + PLZ-Finder über dem Formular. */}
      <section style={{ padding: "8px 32px 16px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <h2 className="text-navy mt-0 mb-2" style={{ fontSize: 22, fontWeight: 900 }}>
            {dict.kontakt.fachberater_title}
          </h2>
          <p className="text-navy/70 text-[15px] mt-0 mb-5 leading-[1.6]">
            {dict.kontakt.fachberater_intro}
          </p>
          <FachberaterFinder
            berater={FACHBERATER_DE}
            lang={lang}
            plzLabel={dict.kontakt.fachberater_plz}
            bereichAll={dict.kontakt.finder_bereich_all}
            plzPlaceholder={dict.kontakt.finder_plz_placeholder}
            noResults={dict.kontakt.finder_no_results}
          />

          {/* Internationale Fachberater (Z3: Export-Kontakte für EN/FR/PL/ES). */}
          <h2 className="text-navy mt-12 mb-2" style={{ fontSize: 20, fontWeight: 900 }}>
            {dict.kontakt.international_title}
          </h2>
          <p className="text-navy/70 text-[15px] mt-0 mb-5 leading-[1.6]">
            {dict.kontakt.international_text}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FACHBERATER_INTERNATIONAL.map((b) => (
              <BeraterCard key={`${b.name}-${b.rolle}`} berater={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Zentrale */}
      <section style={{ padding: "8px 32px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <div className="bg-light-gray rounded-2xl" style={{ padding: "40px 36px" }}>
            <h2 className="text-navy mt-0 mb-4" style={{ fontSize: 22, fontWeight: 900 }}>
              {dict.kontakt.zentrale_title}
            </h2>
            <p className="text-navy/80 text-[15px] mt-0 mb-6 leading-[1.8]">
              <span className="block" style={{ fontWeight: 700 }}>{KORODUR_FIRMA}</span>
              {KORODUR_ZENTRALE.strasse}
              <br />
              {KORODUR_ZENTRALE.plzOrt}
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <a
                href={KORODUR_ZENTRALE.telefonHref}
                className="inline-flex items-center gap-3 text-navy no-underline hover:text-cyan-text transition-colors"
                style={{ fontWeight: 700, fontSize: 16, minHeight: 44 }}
              >
                <AppIcon icon={Phone} width={18} height={18} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
                <span>
                  <span className="text-navy/50 text-[13px] block" style={{ fontWeight: 600 }}>
                    {dict.kontakt.tel_label}
                  </span>
                  {KORODUR_ZENTRALE.telefon}
                </span>
              </a>
              <a
                href={`mailto:${KORODUR_ZENTRALE.email}`}
                className="inline-flex items-center gap-3 text-navy no-underline hover:text-cyan-text transition-colors"
                style={{ fontWeight: 700, fontSize: 16, minHeight: 44 }}
              >
                <AppIcon icon={Mail} width={18} height={18} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
                <span>
                  <span className="text-navy/50 text-[13px] block" style={{ fontWeight: 600 }}>
                    {dict.kontakt.email_label}
                  </span>
                  {KORODUR_ZENTRALE.email}
                </span>
              </a>
              <p className="m-0 flex items-center gap-3 text-navy" style={{ fontWeight: 700, fontSize: 16, minHeight: 44 }}>
                <AppIcon icon={Printer} width={18} height={18} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
                <span>
                  <span className="text-navy/50 text-[13px] block" style={{ fontWeight: 600 }}>
                    {dict.kontakt.fax_label}
                  </span>
                  {KORODUR_ZENTRALE.fax}
                </span>
              </p>
            </div>

            <a
              href={`mailto:${KORODUR_ZENTRALE.email}`}
              className="inline-flex items-center justify-center text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
              style={{ padding: "14px 30px", fontWeight: 800, fontSize: 15, minHeight: 44 }}
            >
              {dict.kontakt.cta_mail}
            </a>
          </div>
        </div>
      </section>

      {/* Kontaktformular nach unten (Steffi #90) */}
      <section style={{ padding: "8px 32px 56px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <KontaktFormular dict={dict} />
        </div>
      </section>
    </>
  );
}

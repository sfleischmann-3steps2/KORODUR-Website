import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { KORODUR_FIRMA, KORODUR_ZENTRALE } from "../../../lib/kontaktDaten";
import { alternatesFor } from "../../../lib/seo";
import { FACHBERATER, FACHBERATER_INTERNATIONAL } from "../../../data/fachberater";
import KontaktFormular from "../../../components/KontaktFormular";
import { AppIcon } from "@/components/ui/icon";
import { ExternalLink, Mail, Phone, Printer } from "lucide-react";

type Params = Promise<{ lang: string }>;

const VERBUNDENE_WEBSITES = [
  { label: "goodcat.de", href: "https://www.goodcat.de" },
  { label: "korodur-rapidset.com", href: "https://www.korodur-rapidset.com" },
  { label: "3d-concrete-printing.com", href: "https://www.3d-concrete-printing.com" },
];

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
      <section style={{ padding: "48px 32px 40px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <h1
            className="mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {dict.kontakt.title}
          </h1>
          <p className="text-navy/70 m-0" style={{ fontSize: 18, lineHeight: 1.7 }}>
            {dict.kontakt.intro}
          </p>
        </div>
      </section>

      {/* Zentrales Kontaktformular (Feldstruktur der Alt-Site; V1 via mailto, Stufe 5 echter Versand) */}
      <section style={{ padding: "8px 32px 40px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <KontaktFormular dict={dict} />
        </div>
      </section>

      <section style={{ padding: "0 32px 56px" }}>
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
                className="inline-flex items-center gap-3 text-navy no-underline hover:text-cyan transition-colors"
                style={{ fontWeight: 700, fontSize: 16, minHeight: 44 }}
              >
                <AppIcon icon={Phone} width={18} height={18} strokeWidth={2} className="text-cyan" aria-hidden="true" />
                <span>
                  <span className="text-navy/50 text-[13px] block" style={{ fontWeight: 600 }}>
                    {dict.kontakt.tel_label}
                  </span>
                  {KORODUR_ZENTRALE.telefon}
                </span>
              </a>
              <a
                href={`mailto:${KORODUR_ZENTRALE.email}`}
                className="inline-flex items-center gap-3 text-navy no-underline hover:text-cyan transition-colors"
                style={{ fontWeight: 700, fontSize: 16, minHeight: 44 }}
              >
                <AppIcon icon={Mail} width={18} height={18} strokeWidth={2} className="text-cyan" aria-hidden="true" />
                <span>
                  <span className="text-navy/50 text-[13px] block" style={{ fontWeight: 600 }}>
                    {dict.kontakt.email_label}
                  </span>
                  {KORODUR_ZENTRALE.email}
                </span>
              </a>
              <p className="m-0 flex items-center gap-3 text-navy" style={{ fontWeight: 700, fontSize: 16, minHeight: 44 }}>
                <AppIcon icon={Printer} width={18} height={18} strokeWidth={2} className="text-cyan" aria-hidden="true" />
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

          {/* Technische Fachberatung (Quelle: LPs; vollständige Ansprechpartner-Seiten folgen) */}
          <h2 className="text-navy mt-12 mb-2" style={{ fontSize: 20, fontWeight: 900 }}>
            {dict.kontakt.fachberater_title}
          </h2>
          <p className="text-navy/70 text-[15px] mt-0 mb-5 leading-[1.6]">
            {dict.kontakt.fachberater_intro}
          </p>
          {FACHBERATER.map((g) => (
            <div key={g.gruppe} className="mb-6 last:mb-0">
              <h3 className="text-navy/60 text-[13px] uppercase tracking-wider mt-0 mb-3" style={{ fontWeight: 800 }}>
                {(dict.bereiche as Record<string, string>)[`${g.gruppe}_name`]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {g.berater.map((b) => (
                  <div key={b.email} className="border border-bullet-bg rounded-xl" style={{ padding: "18px 20px" }}>
                    <p className="text-navy text-[16px] m-0" style={{ fontWeight: 900 }}>{b.name}</p>
                    <p className="text-navy/60 text-[13px] mt-1 mb-1 leading-[1.5]">{b.rolle}</p>
                    {b.gebiet && (
                      <p className="text-navy/60 text-[13px] mt-0 mb-2">
                        {dict.kontakt.fachberater_plz}: {b.gebiet}
                      </p>
                    )}
                    <p className="m-0 text-[14px] leading-[1.8]">
                      <a href={b.telefonHref} className="text-cyan no-underline hover:underline" style={{ fontWeight: 700 }}>{b.telefon}</a>
                      <br />
                      <a href={`mailto:${b.email}`} className="text-cyan no-underline hover:underline" style={{ fontWeight: 700 }}>{b.email}</a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Internationale Fachberater (Alt-Site kontakt/international, M3b).
              Zahlt auf Z3 ein: EN/FR/PL-Besucher bekommen Export-Kontakte
              statt nur deutscher PLZ-Gebiete. */}
          <h2 className="text-navy mt-12 mb-2" style={{ fontSize: 20, fontWeight: 900 }}>
            {dict.kontakt.international_title}
          </h2>
          <p className="text-navy/70 text-[15px] mt-0 mb-5 leading-[1.6]">
            {dict.kontakt.international_text}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FACHBERATER_INTERNATIONAL.map((b) => (
              <div key={`${b.name}-${b.email}`} className="border border-bullet-bg rounded-xl" style={{ padding: "18px 20px" }}>
                <p className="text-navy text-[16px] m-0" style={{ fontWeight: 900 }}>{b.name}</p>
                <p className="text-navy/60 text-[13px] mt-1 mb-2 leading-[1.5]">{b.rolle}</p>
                <p className="m-0 text-[14px] leading-[1.8]">
                  <a href={b.telefonHref} className="text-cyan no-underline hover:underline" style={{ fontWeight: 700 }}>{b.telefon}</a>
                  <br />
                  <a href={`mailto:${b.email}`} className="text-cyan no-underline hover:underline" style={{ fontWeight: 700 }}>{b.email}</a>
                </p>
              </div>
            ))}
          </div>

          {/* Verbundene Websites */}
          <h2 className="text-navy mt-12 mb-4" style={{ fontSize: 20, fontWeight: 900 }}>
            {dict.kontakt.websites_title}
          </h2>
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            {VERBUNDENE_WEBSITES.map((site) => (
              <li key={site.href}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan text-[15px] no-underline hover:underline"
                  style={{ fontWeight: 700, minHeight: 44 }}
                >
                  {site.label}
                  <AppIcon icon={ExternalLink} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

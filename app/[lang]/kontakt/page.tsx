import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { KORODUR_ZENTRALE } from "../../../lib/kontaktDaten";
import { AppIcon } from "@/components/ui/icon";
import { ExternalLink, Mail, Phone } from "lucide-react";

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
  return { title: dict.kontakt.title, description: dict.kontakt.intro };
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

      <section style={{ padding: "8px 32px 56px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <div className="bg-light-gray rounded-2xl" style={{ padding: "40px 36px" }}>
            <h2 className="text-navy mt-0 mb-4" style={{ fontSize: 22, fontWeight: 900 }}>
              {dict.kontakt.zentrale_title}
            </h2>
            <p className="text-navy/80 text-[15px] mt-0 mb-6 leading-[1.8]">
              <span className="block" style={{ fontWeight: 700 }}>{dict.kontakt.firma1}</span>
              <span className="block" style={{ fontWeight: 700 }}>{dict.kontakt.firma2}</span>
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
            </div>

            <a
              href={`mailto:${KORODUR_ZENTRALE.email}`}
              className="inline-flex items-center justify-center text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
              style={{ padding: "14px 30px", fontWeight: 800, fontSize: 15, minHeight: 44 }}
            >
              {dict.kontakt.cta_mail}
            </a>
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

import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { LOCALES } from "../../../lib/i18n";
import { notFound } from "next/navigation";
import { alternatesFor } from "../../../lib/seo";
import {
  KORODUR_FIRMA,
  KORODUR_ZENTRALE,
  KORODUR_REGISTER,
} from "../../../lib/kontaktDaten";

// Inhalt 1:1 von korodur.de/impressum (Wayback-Snapshot 2026-01-31),
// E-Mail aus data-cfemail dekodiert. Launch-Plan M2/B3.

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.footer.impressum,
    alternates: alternatesFor(lang, "/impressum/"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function ImpressumPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section style={{ padding: "48px 32px 88px" }}>
      <div className="mx-auto" style={{ maxWidth: 760 }}>
        <h1 className="mb-6" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900 }}>
          Impressum
        </h1>
        {lang !== "de" && (
          <p className="text-navy/60 text-[14px] mb-8 italic">
            {dict.rechtliches.sprachhinweis}
          </p>
        )}

        <div className="text-navy text-[15px] leading-[1.7] flex flex-col gap-6">
          <div>
            <p className="m-0" style={{ fontWeight: 700 }}>{KORODUR_FIRMA}</p>
            <p className="m-0">
              {KORODUR_ZENTRALE.strasse}
              <br />
              {KORODUR_ZENTRALE.plzOrt}
            </p>
          </div>

          <div>
            <p className="m-0">
              Handelsregister: {KORODUR_REGISTER.handelsregister}
              <br />
              Registergericht: {KORODUR_REGISTER.registergericht}
            </p>
            <p className="m-0 mt-3">
              Vertreten durch:
              <br />
              {KORODUR_REGISTER.vertretenDurch}
            </p>
          </div>

          <div>
            <h2 className="m-0 mb-2 text-[18px]" style={{ fontWeight: 900 }}>Kontakt</h2>
            <p className="m-0">
              Telefon: <a href={KORODUR_ZENTRALE.telefonHref} className="text-cyan-text">{KORODUR_ZENTRALE.telefon}</a>
              <br />
              Telefax: {KORODUR_ZENTRALE.fax}
              <br />
              E-Mail: <a href={`mailto:${KORODUR_ZENTRALE.email}`} className="text-cyan-text">{KORODUR_ZENTRALE.email}</a>
            </p>
          </div>

          <div>
            <h2 className="m-0 mb-2 text-[18px]" style={{ fontWeight: 900 }}>Umsatzsteuer-ID</h2>
            <p className="m-0">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              {KORODUR_REGISTER.umsatzsteuerId}
            </p>
          </div>

          <div>
            <h2 className="m-0 mb-2 text-[18px]" style={{ fontWeight: 900 }}>
              Redaktionell verantwortlich
            </h2>
            <p className="m-0">
              {KORODUR_REGISTER.vertretenDurch}
              <br />
              {KORODUR_ZENTRALE.strasse}
              <br />
              {KORODUR_ZENTRALE.plzOrt}
            </p>
          </div>

          <div>
            <h2 className="m-0 mb-2 text-[18px]" style={{ fontWeight: 900 }}>
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p className="m-0">
              Wir nehmen an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teil. Zuständig ist die
              Universalschlichtungsstelle des Zentrums für Schlichtung e.V.,
              Straßburger Straße 8, 77694 Kehl am Rhein (
              <a
                href="https://www.verbraucher-schlichter.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-text"
              >
                https://www.verbraucher-schlichter.de
              </a>
              ).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import { LOCALES } from "../../../lib/i18n";
import { notFound } from "next/navigation";
import { alternatesFor } from "../../../lib/seo";
import { ZENTRALE_DOKUMENTE } from "../../../data/produktDokumente";
import DokumentListe from "../../../components/DokumentListe";

// Schlankes Download-Center (Launch-Plan M3, Steffi 2026-06-12: sekundär,
// Footer-Einstieg). Primärer Ort für Produktdokumente ist die Produktseite;
// hier liegen nur übergreifende Dokumente (Lieferprogramm, Bestellformulare,
// Gruppen-SDS bis zur Produkt-Freigabe durch die Technik).

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.downloads.title,
    description: dict.downloads.intro,
    alternates: alternatesFor(lang, "/downloads/"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function DownloadsPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section style={{ padding: "48px 32px 88px" }}>
      <div className="mx-auto" style={{ maxWidth: 760 }}>
        <h1 className="mb-4" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900 }}>
          {dict.downloads.title}
        </h1>
        <p className="text-navy/70 mb-10" style={{ fontSize: 16, lineHeight: 1.7 }}>
          {dict.downloads.intro}{" "}
          <Link href={`/${lang}/produkte/`} className="text-cyan" style={{ fontWeight: 700 }}>
            → {dict.nav.produkte}
          </Link>
        </p>
        <h2 className="mb-5 text-[20px]" style={{ fontWeight: 900 }}>
          {dict.downloads.zentrale}
        </h2>
        <DokumentListe
          dokumente={ZENTRALE_DOKUMENTE}
          lang={lang}
          labels={dict.produkte as Record<string, string>}
        />
      </div>
    </section>
  );
}

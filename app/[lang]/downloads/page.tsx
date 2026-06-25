import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { LOCALES } from "../../../lib/i18n";
import { notFound } from "next/navigation";
import { alternatesFor } from "../../../lib/seo";
import {
  buildDownloadKatalog,
  katalogBereiche,
  UEBERGREIFEND,
} from "../../../lib/downloadKatalog";
import DownloadCenter from "../../../components/DownloadCenter";

// Download-Center (#301): filterbarer Katalog aller lokal vorliegenden
// Produktdokumente (TDS/SDB/DoP/Anwendung/Reinigung/Service). Quelle ist die
// verifizierte data/produktDokumente.ts; das Gap-Inventar (#300) ist separat.

type Params = Promise<{ lang: string }>;

const BEREICH_ORDER = [
  "industrieboden",
  "rapid-set",
  "infrastruktur",
  "microtop",
  "spezialmoertel",
  "katzenstreu",
  "3d-concrete-printing",
  UEBERGREIFEND,
];

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

  const katalog = buildDownloadKatalog();
  const vorhanden = new Set(katalogBereiche(katalog));
  const bereichOptionen = BEREICH_ORDER.filter((b) => vorhanden.has(b));
  const bereichLabels = {
    ...(dict.bereiche as Record<string, string>),
    uebergreifend_name: dict.downloads.uebergreifend,
  };
  const strings = {
    alle: dict.downloads.alle,
    suchePlaceholder: dict.downloads.suche_placeholder,
    treffer: dict.downloads.treffer,
    keineTreffer: dict.downloads.keine_treffer,
    filterTyp: dict.downloads.filter_typ,
    filterBereich: dict.downloads.filter_bereich,
    reset: dict.downloads.reset,
    produktLabel: dict.downloads.produkt_label,
    uebergreifend: dict.downloads.uebergreifend,
  };

  return (
    <section style={{ padding: "48px 32px 88px" }}>
      <div className="mx-auto" style={{ maxWidth: 960 }}>
        <h1 className="mb-4" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900 }}>
          {dict.downloads.title}
        </h1>
        <p className="text-navy/70 mb-8" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 720 }}>
          {dict.downloads.intro}
        </p>
        <DownloadCenter
          katalog={katalog}
          bereichOptionen={bereichOptionen}
          lang={lang}
          bereichLabels={bereichLabels}
          typLabels={dict.produkte as Record<string, string>}
          strings={strings}
        />
      </div>
    </section>
  );
}

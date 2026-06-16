import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import { alternatesFor } from "../../../lib/seo";
import PortfolioGrid from "../../../components/PortfolioGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.home.bereiche_title,
    description: dict.home.bereiche_subtitle,
    alternates: alternatesFor(lang, "/bereiche/"),
  };
}

export default async function BereicheOverview({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="bg-white" style={{ padding: "64px 32px 100px" }}>
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <h1
          className="text-center mb-4"
          style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, lineHeight: 1.12 }}
        >
          {dict.home.bereiche_title}
        </h1>
        <p
          className="text-center text-navy opacity-60 mb-12 mx-auto"
          style={{ maxWidth: 620, fontSize: 18 }}
        >
          {dict.home.bereiche_subtitle}
        </p>

        {/* Gemeinsames Produktportfolio-Grid (7 Bereiche + Katalog-Kachel), #188 */}
        <PortfolioGrid lang={lang} dict={dict} withCatalogTile />
      </div>
    </section>
  );
}

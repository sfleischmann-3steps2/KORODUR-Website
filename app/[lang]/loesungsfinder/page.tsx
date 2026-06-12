import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import Wizard from "../../../components/loesungsfinderV25/Wizard";
import type { Locale } from "../../../lib/i18n";
import type { Metadata } from "next";
import { alternatesFor } from "../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.loesungsfinder.page_title,
    description: dict.loesungsfinder.meta_description,
    alternates: alternatesFor(lang, "/loesungsfinder/"),
  };
}

export default async function LoesungsfinderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="py-24 px-8">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-4xl text-navy text-center mb-4"
          style={{ fontWeight: 900 }}
        >
          {dict.loesungsfinder.page_title}
        </h1>
        <p className="text-lg text-navy/72 text-center mb-12 max-w-2xl mx-auto">
          {dict.loesungsfinder.page_subtitle}
        </p>
        <Wizard lang={lang as Locale} />
      </div>
    </section>
  );
}

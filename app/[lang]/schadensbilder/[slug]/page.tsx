import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../../dictionaries";
import { alternatesFor } from "../../../../lib/seo";
import { getArtikel, getSlugs } from "../../../../lib/content";
import ArtikelSeite from "../../../../components/ArtikelSeite";

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return getSlugs("schadensbilder", ["index"]).map((slug) => ({ lang: "de", slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const art = getArtikel("schadensbilder", slug);
  if (!hasLocale(lang) || !art) return {};
  return {
    title: art.frontmatter.title,
    alternates: alternatesFor(lang, `/schadensbilder/${slug}/`),
  };
}

export default async function SchadensbildPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const art = getArtikel("schadensbilder", slug);
  if (!art) notFound();
  return (
    <ArtikelSeite
      lang={lang}
      titel={art.frontmatter.title}
      breadcrumb={[{ label: "Schadensbilder", href: `/${lang}/schadensbilder` }, { label: art.frontmatter.title }]}
      body={art.body}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import { alternatesFor } from "../../../lib/seo";
import { getArtikel } from "../../../lib/content";
import ArtikelSeite from "../../../components/ArtikelSeite";

type Params = Promise<{ lang: string }>;

// Fachartikel sind aktuell nur auf Deutsch verfügbar (V1).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const art = getArtikel("schadensbilder", "index");
  if (!hasLocale(lang) || !art) return {};
  return {
    title: art.frontmatter.title,
    description: "Ordnen Sie Ihren Bodenschaden einem der fünf typischen Schadensbilder zu und finden Sie die passende Sanierung.",
    alternates: alternatesFor(lang, "/schadensbilder/"),
  };
}

export default async function SchadensbilderHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const art = getArtikel("schadensbilder", "index");
  if (!art) notFound();
  return (
    <ArtikelSeite lang={lang} titel={art.frontmatter.title} breadcrumb={[{ label: "Schadensbilder" }]} body={art.body} referenzenSlugs={art.frontmatter.referenzen} bild={art.frontmatter.bild as string | undefined} bildAlt={art.frontmatter.bildAlt as string | undefined} />
  );
}

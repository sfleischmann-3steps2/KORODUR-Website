import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import { alternatesFor } from "../../../lib/seo";
import ArtikelHub from "../../../components/ArtikelHub";

type Params = Promise<{ lang: string }>;

// Fachartikel sind aktuell nur auf Deutsch verfügbar (V1).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Ratgeber",
    description:
      "Praxiswissen rund um Industrieboden und Sanierung: Sperrzeit, Wirtschaftlichkeit, Systemwahl und die häufigsten Fragen aus dem Betrieb.",
    alternates: alternatesFor(lang, "/ratgeber/"),
  };
}

export default async function RatgeberHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <ArtikelHub
      lang={lang}
      kategorie="artikel"
      routePrefix="/ratgeber"
      titel="Ratgeber"
      intro="Praxiswissen rund um Industrieboden und Sanierung. Von der Sperrzeit über die Wirtschaftlichkeit bis zu den häufigsten Fragen aus dem Betrieb."
      breadcrumb={[{ label: "Ratgeber" }]}
    />
  );
}

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
    title: "Lösungen nach Branche",
    description:
      "Industrieböden und Sanierungssysteme für Ihre Branche, von der Lebensmittelproduktion über Lager und Logistik bis zu Verkehrsflächen.",
    alternates: alternatesFor(lang, "/branchen/"),
  };
}

export default async function BranchenHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <ArtikelHub
      lang={lang}
      kategorie="branchen"
      routePrefix="/branchen"
      titel="Lösungen nach Branche"
      intro="Jede Branche stellt eigene Anforderungen an den Boden. Wir zeigen, welche Systeme sich in Ihrem Umfeld bewährt haben, von der Lebensmittelproduktion über Lager und Logistik bis zu Verkehrs- und Sonderflächen."
      breadcrumb={[{ label: "Lösungen nach Branche" }]}
    />
  );
}

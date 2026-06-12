import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { alternatesFor } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.referenzen.title,
    description: dict.referenzen.description_prefix,
    // Gilt für die Übersicht; die [slug]-Seiten überschreiben mit eigenen Alternates.
    alternates: alternatesFor(lang, "/referenzen/"),
  };
}

export default function ReferenzenLayout({ children }: { children: React.ReactNode }) {
  return children;
}

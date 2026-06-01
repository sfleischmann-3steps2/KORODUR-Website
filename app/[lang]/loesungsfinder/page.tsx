import { hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import Wizard from "../../../components/loesungsfinderV25/Wizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lösungsfinder",
  description:
    "Finden Sie in 4 Schritten die passende Sanierungslösung für Ihren Industrieboden.",
};

export default async function LoesungsfinderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <section className="py-24 px-8">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-4xl text-[#002d59] text-center mb-4"
          style={{ fontWeight: 900 }}
        >
          Lösungsfinder
        </h1>
        <p className="text-lg text-[#002d59]/72 text-center mb-12 max-w-2xl mx-auto">
          Beschreiben Sie Ihre Situation, und wir zeigen Ihnen passende Produkte
          und Referenzprojekte.
        </p>
        <Wizard />
      </div>
    </section>
  );
}

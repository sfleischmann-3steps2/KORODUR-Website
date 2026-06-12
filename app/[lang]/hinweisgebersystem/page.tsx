import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import { LOCALES } from "../../../lib/i18n";
import { notFound } from "next/navigation";
import { alternatesFor } from "../../../lib/seo";
import { AppIcon } from "@/components/ui/icon";
import { ExternalLink } from "lucide-react";

// Text 1:1 von korodur.de/hinweisgebersystem (Wayback 2025-11-10).
// Entscheidung Steffi 2026-06-12: übernehmen. Das Meldesystem selbst ist
// extern (RC-Whistle der Ratisbona Compliance GmbH). Launch-Plan M3.

type Params = Promise<{ lang: string }>;

const ABSAETZE = [
  "Nachhaltiges Wirtschaften begründet die Zukunftsperspektive für Umwelt, Gesellschaft und Wirtschaft und auch für jeden einzelnen Mitarbeiter oder Geschäftspartner von KORODUR.",
  "Grundpfeiler der KORODUR-Kultur sind die Aufteilung zentraler Anforderungen und deren eigenverantwortliche Umsetzung und Steuerung sowie ein gemeinsames Verständnis für Werte und Risikominimierung für eine nachhaltige Unternehmensentwicklung.",
  "Das Hinweisgebersystem mit anwaltlicher Expertise der Ratisbona Compliance GmbH („RC-Whistle“) schafft durch eine für jeden zugängliche, klar definierte Struktur und eine juristisch fundierte Erstbewertung zusätzliches Vertrauen und Sicherheit, um auf Missstände hinzuweisen und damit den nachhaltigen Erfolg von KORODUR zu sichern und Schaden abzuwenden.",
];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Hinweisgebersystem",
    alternates: alternatesFor(lang, "/hinweisgebersystem/"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function HinweisgeberPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section style={{ padding: "48px 32px 88px" }}>
      <div className="mx-auto text-navy text-[15px] leading-[1.7]" style={{ maxWidth: 760 }}>
        <h1 className="mb-6" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900 }}>
          Hinweisgebersystem
        </h1>
        {lang !== "de" && (
          <p className="text-navy/60 text-[14px] mb-6 italic">{dict.rechtliches.sprachhinweis}</p>
        )}
        {ABSAETZE.map((p, i) => (
          <p key={i} className="m-0 mb-4">
            {p}
          </p>
        ))}
        <a
          href="https://ratisbona-compliance.de/start/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-white no-underline rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200"
          style={{ padding: "14px 28px", fontWeight: 800, fontSize: 15 }}
        >
          Jetzt einen Hinweis geben
          <AppIcon icon={ExternalLink} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

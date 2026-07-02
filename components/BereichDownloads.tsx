import Link from "next/link";
import { AppIcon } from "@/components/ui/icon";
import { ArrowRight } from "lucide-react";
import { BEREICH_DOKUMENTE } from "../data/produktDokumente";
import DokumentListe from "./DokumentListe";

/** Bereichs-Downloads (#442): Broschüren/Flyer des Bereichs als eigene Sektion
 *  (Positionierung der Alt-Site-Downloads), plus Deep-Link ins Download-Center
 *  mit vorgefiltertem Bereich. Rendert nichts, wenn der Bereich keine
 *  Dokumente führt. */
export default function BereichDownloads({
  slug,
  lang,
  dict,
}: {
  slug: string;
  lang: string;
  dict: {
    bereiche: Record<string, string>;
    produkte: Record<string, string>;
    downloads: Record<string, string>;
  };
}) {
  const dokumente = BEREICH_DOKUMENTE[slug] ?? [];
  if (dokumente.length === 0) return null;

  return (
    <section className="bg-icon-bg" style={{ padding: "56px 32px 64px" }}>
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <h2 className="mb-6" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}>
          {dict.bereiche.downloads_title ?? "Downloads"}
        </h2>
        <div style={{ maxWidth: 760 }}>
          <DokumentListe dokumente={dokumente} lang={lang} labels={dict.produkte} />
        </div>
        <div className="mt-6">
          <Link
            href={`/${lang}/downloads/?bereich=${slug}`}
            className="inline-flex items-center gap-1.5 text-cyan-text text-[15px] no-underline hover:underline"
            style={{ fontWeight: 700 }}
          >
            {dict.downloads.alle_bereich}
            <AppIcon icon={ArrowRight} width={15} height={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

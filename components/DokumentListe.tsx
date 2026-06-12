import { AppIcon } from "@/components/ui/icon";
import { FileText } from "lucide-react";
import { withBasePath } from "../lib/basePath";
import type { ProduktDokument } from "../data/produktDokumente";

type Dict = Record<string, string>;

const TYP_KEY: Record<ProduktDokument["typ"], string> = {
  tds: "dok_tds",
  sds: "dok_sds",
  dop: "dok_dop",
  anwendung: "dok_anwendung",
  reinigung: "dok_reinigung",
  service: "dok_service",
};

/** Dokument-Linkliste (Produktseite + Download-Center, Launch-Plan M3).
 *  Sortierung: aktuelle Sprache zuerst, dann Dokumenttyp. */
export default function DokumentListe({
  dokumente,
  lang,
  labels,
}: {
  dokumente: ProduktDokument[];
  lang: string;
  labels: Dict;
}) {
  const sortiert = [...dokumente].sort(
    (a, b) => Number(b.sprache === lang) - Number(a.sprache === lang)
  );
  return (
    <div
      className="bg-white overflow-hidden"
      style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.06)" }}
    >
      {sortiert.map((d, i) => (
        <a
          key={d.url + d.sprache}
          href={withBasePath(d.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-6 py-3.5 no-underline hover:bg-icon-bg transition-colors"
          style={i < sortiert.length - 1 ? { borderBottom: "1px solid var(--icon-bg)" } : {}}
        >
          <AppIcon icon={FileText} width={18} height={18} strokeWidth={2} className="text-cyan-text shrink-0" aria-hidden="true" />
          <span className="flex-1 min-w-0">
            <span className="block text-navy text-[14px]" style={{ fontWeight: 700 }}>
              {labels[TYP_KEY[d.typ]] ?? d.typ}
            </span>
            <span className="block text-navy/55 text-[13px] truncate">{d.titel}</span>
          </span>
          <span
            className="shrink-0 text-[11px] uppercase tracking-wider text-navy px-2 py-0.5 rounded-[4px]"
            style={{ backgroundColor: "var(--bullet-bg)", fontWeight: 700 }}
          >
            {d.sprache} · PDF
          </span>
        </a>
      ))}
    </div>
  );
}

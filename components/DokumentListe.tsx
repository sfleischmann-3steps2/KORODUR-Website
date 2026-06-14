import { AppIcon } from "@/components/ui/icon";
import { FileText } from "lucide-react";
import { withBasePath } from "../lib/basePath";
import type { DokumentTyp, ProduktDokument } from "../data/produktDokumente";

type Dict = Record<string, string>;

const TYP_KEY: Record<DokumentTyp, string> = {
  tds: "dok_tds",
  sds: "dok_sds",
  dop: "dok_dop",
  anwendung: "dok_anwendung",
  reinigung: "dok_reinigung",
  service: "dok_service",
};

/** Reihenfolge der Dokumenttypen innerhalb einer Gruppe. */
const TYP_ORDER: DokumentTyp[] = ["tds", "sds", "dop", "anwendung", "reinigung", "service"];

/** Zwei kundentaugliche Gruppen (Steffi 2026-06-14, #120):
 *  Technische/Konformitäts-Dokumente vs. Anwendung & Pflege. */
type Gruppe = "technik" | "anwendung";
const TYP_GRUPPE: Record<DokumentTyp, Gruppe> = {
  tds: "technik",
  sds: "technik",
  dop: "technik",
  anwendung: "anwendung",
  reinigung: "anwendung",
  service: "anwendung",
};
const GRUPPEN_ORDER: Gruppe[] = ["technik", "anwendung"];
const GRUPPE_KEY: Record<Gruppe, string> = {
  technik: "dok_gruppe_technik",
  anwendung: "dok_gruppe_anwendung",
};

/** Sprach-Fallback-Kette (Steffi 2026-06-14): aktuelle Sprache → EN → DE.
 *  Real liegen Dokumente immer in DE und EN vor, weitere Sprachen flickenhaft.
 *  EN ist der reguläre Fallback; DE als letzte Reserve, damit DE-only-Dokumente
 *  (z. B. Anwendungsempfehlungen) für int. Nutzer nicht ganz verschwinden. */
function sprachPrio(lang: string): string[] {
  return [lang, "en", "de"];
}

/** Sichtbare Dokumente je Typ nach Sprach-Fallback-Kette, flach in TYP_ORDER.
 *  Pro Typ wird genau EINE Sprache gezeigt (kein Mehrsprachen-Wirrwarr).
 *
 *  ACHTUNG: Setzt voraus, dass alle Dokumente eines Typs Sprachvarianten
 *  DESSELBEN Dokuments sind (gilt auf der PDP — ein Produkt, ein TDS in N
 *  Sprachen). NICHT für heterogene Listen wie das Download-Center verwenden,
 *  wo mehrere verschiedene Dokumente denselben Typ teilen — dort gingen Inhalte
 *  verloren. Deshalb greift die Filterung nur im PDP-Modus (sprachDedup).
 *
 *  Exportiert, damit die PDP die Section-Sichtbarkeit ohne Doppel-Logik prüfen kann. */
export function dokumenteNachSprache(
  dokumente: ProduktDokument[],
  lang: string,
): ProduktDokument[] {
  const result: ProduktDokument[] = [];
  for (const typ of TYP_ORDER) {
    const docs = dokumente.filter((d) => d.typ === typ);
    if (!docs.length) continue;
    let chosen: ProduktDokument[] = [];
    for (const sprache of sprachPrio(lang)) {
      chosen = docs.filter((d) => d.sprache === sprache);
      if (chosen.length) break;
    }
    if (!chosen.length) chosen = docs; // letzte Reserve: nie alles verstecken
    result.push(...chosen);
  }
  return result;
}

function DokRows({ docs, lang, labels }: { docs: ProduktDokument[]; lang: string; labels: Dict }) {
  return (
    <div
      className="bg-white overflow-hidden"
      style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.06)" }}
    >
      {docs.map((d, i) => (
        <a
          key={d.url + d.sprache}
          href={withBasePath(d.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-6 py-3.5 no-underline hover:bg-icon-bg transition-colors"
          style={i < docs.length - 1 ? { borderBottom: "1px solid var(--icon-bg)" } : {}}
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
            {d.sprache !== lang ? (
              <>
                <span lang={d.sprache}>{d.sprache}</span> · PDF
              </>
            ) : (
              "PDF"
            )}
          </span>
        </a>
      ))}
    </div>
  );
}

/** Dokument-Linkliste (#120).
 *  - sprachDedup: pro Typ genau eine Sprache (aktuelle → EN → DE). Nur PDP, wo
 *    alle Dokumente eines Typs Sprachvarianten desselben Dokuments sind.
 *  - gruppieren: in "Technische Dokumente & Konformität" / "Anwendung & Pflege"
 *    splitten (Überschriften nur, wenn beide Gruppen befüllt sind).
 *  Beide default false → bisheriges Flachlisten-Verhalten (z. B. Download-Center,
 *  bleibt unverändert, verliert keine Dokumente). */
export default function DokumentListe({
  dokumente,
  lang,
  labels,
  sprachDedup = false,
  gruppieren = false,
}: {
  dokumente: ProduktDokument[];
  lang: string;
  labels: Dict;
  sprachDedup?: boolean;
  gruppieren?: boolean;
}) {
  const liste = sprachDedup
    ? dokumenteNachSprache(dokumente, lang)
    : [...dokumente].sort((a, b) => Number(b.sprache === lang) - Number(a.sprache === lang));
  if (!liste.length) return null;

  // Ohne Gruppierung: eine flache Karte (eine Gruppe, kein Heading).
  const gruppen = gruppieren
    ? GRUPPEN_ORDER.map((gruppe) => ({
        gruppe: gruppe as Gruppe | null,
        docs: liste.filter((d) => TYP_GRUPPE[d.typ] === gruppe),
      })).filter((g) => g.docs.length > 0)
    : [{ gruppe: null as Gruppe | null, docs: liste }];

  const zeigeHeadings = gruppieren && gruppen.length > 1;

  return (
    <div className="flex flex-col gap-8">
      {gruppen.map(({ gruppe, docs }) => (
        <div key={gruppe ?? "flat"}>
          {zeigeHeadings && gruppe && (
            <h3 className="text-navy text-[15px] mb-3" style={{ fontWeight: 900 }}>
              {labels[GRUPPE_KEY[gruppe]] ?? gruppe}
            </h3>
          )}
          <DokRows docs={docs} lang={lang} labels={labels} />
        </div>
      ))}
    </div>
  );
}

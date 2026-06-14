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

/** Dokument-Linkliste (Produktseite + Download-Center, #120).
 *  Sprachgefiltert (aktuelle Sprache, sonst EN, sonst DE) und in zwei Gruppen
 *  gegliedert. Gruppen-Überschriften nur, wenn beide Gruppen befüllt sind. */
export default function DokumentListe({
  dokumente,
  lang,
  labels,
}: {
  dokumente: ProduktDokument[];
  lang: string;
  labels: Dict;
}) {
  const sichtbar = dokumenteNachSprache(dokumente, lang);
  if (!sichtbar.length) return null;

  const gruppen = GRUPPEN_ORDER.map((gruppe) => ({
    gruppe,
    docs: sichtbar.filter((d) => TYP_GRUPPE[d.typ] === gruppe),
  })).filter((g) => g.docs.length > 0);

  const zeigeHeadings = gruppen.length > 1;

  return (
    <div className="flex flex-col gap-8">
      {gruppen.map(({ gruppe, docs }) => (
        <div key={gruppe}>
          {zeigeHeadings && (
            <h3 className="text-navy text-[15px] mb-3" style={{ fontWeight: 900 }}>
              {labels[GRUPPE_KEY[gruppe]] ?? gruppe}
            </h3>
          )}
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
                  {d.sprache !== lang ? `${d.sprache} · PDF` : "PDF"}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

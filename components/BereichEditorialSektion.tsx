import { AppIcon } from "@/components/ui/icon";
import { CheckCircle2, Clock } from "lucide-react";
import type { BereichEditorial } from "../data/bereichEditorial";

/** Datengetriebene Editorial-Sektion für Bereichsseiten (#377/#378/#347).
 *  Rendert Absätze, Einsatzbereiche, Produktkategorien und einen optionalen
 *  „In Vorbereitung"-Block aus data/bereichEditorial.ts. Auf Projektart-
 *  Unterseiten (Neubau/Sanierung) werden die projektart-spezifischen Absätze
 *  vorangestellt. Rendert null, wenn nichts vorhanden ist. */
export default function BereichEditorialSektion({
  editorial,
  projektart,
}: {
  editorial: BereichEditorial;
  projektart?: "neubau" | "sanierung";
}) {
  const projektAbschnitte = projektart ? editorial[projektart]?.abschnitte ?? [] : [];
  const abschnitte = [...projektAbschnitte, ...(editorial.abschnitte ?? [])];
  const { einsatzbereiche, kategorien, inVorbereitung } = editorial;

  if (
    abschnitte.length === 0 &&
    !einsatzbereiche &&
    !kategorien &&
    !inVorbereitung
  ) {
    return null;
  }

  return (
    <section style={{ padding: "48px 32px 8px" }}>
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        {/* Editorial-Absätze */}
        {abschnitte.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {abschnitte.map((a) => (
              <div key={a.titel}>
                <h2
                  className="text-navy mb-3"
                  style={{ fontSize: "clamp(20px, 3vw, 27px)", fontWeight: 900, lineHeight: 1.18 }}
                >
                  {a.titel}
                </h2>
                <p className="text-navy/75 mb-0" style={{ fontSize: 16.5, lineHeight: 1.7 }}>
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Einsatzbereiche als Chips */}
        {einsatzbereiche && (
          <div className="mt-10 pt-8 border-t border-bullet-bg">
            <h3 className="text-navy mb-4" style={{ fontSize: "clamp(17px, 2.4vw, 22px)", fontWeight: 900 }}>
              {einsatzbereiche.titel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {einsatzbereiche.items.map((it) => (
                <span
                  key={it}
                  className="inline-flex items-center gap-2 bg-white border border-navy/12 text-navy text-[14px] rounded-full"
                  style={{ padding: "8px 15px", fontWeight: 600 }}
                >
                  <AppIcon icon={CheckCircle2} width={14} height={14} strokeWidth={2.25} className="text-cyan-text" aria-hidden="true" />
                  {it}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Produktkategorien als Karten */}
        {kategorien && kategorien.length > 0 && (
          <div className="mt-10 pt-8 border-t border-bullet-bg grid grid-cols-1 md:grid-cols-2 gap-5">
            {kategorien.map((k) => (
              <div key={k.titel} className="bg-icon-bg rounded-2xl" style={{ padding: "24px 24px" }}>
                <h3 className="text-navy mt-0 mb-2" style={{ fontSize: 19, fontWeight: 900, lineHeight: 1.2 }}>
                  {k.titel}
                </h3>
                <p className="text-navy/70 text-[15px] leading-[1.6] m-0">{k.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* „In Vorbereitung"-Block (z. B. 3D-Betondruck) */}
        {inVorbereitung && (
          <div
            className="mt-10 flex items-start gap-3 bg-icon-bg rounded-2xl border border-bullet-bg"
            style={{ padding: "20px 22px", maxWidth: 760 }}
          >
            <AppIcon icon={Clock} width={22} height={22} strokeWidth={2} className="text-cyan-text shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="block text-cyan-text uppercase tracking-[0.1em] text-[12px] mb-1" style={{ fontWeight: 800 }}>
                {inVorbereitung.kicker}
              </span>
              <p className="text-navy/75 text-[15px] leading-[1.6] m-0">{inVorbereitung.text}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

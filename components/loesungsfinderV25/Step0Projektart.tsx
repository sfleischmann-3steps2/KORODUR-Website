// Step 0 — Eingangsweiche Neubau / Sanierung (Option C, Steffi 2026-06-13).
// Erscheint vor dem Funnel, wenn NEUBAU_STRECKE_AKTIV. Farbcode:
// Neubau = Navy (Kerngeschäft, dominant, links), Sanierung = Cyan/hell (rechts).

import { useLocale } from "@/lib/LocaleContext";
import { IconGridPattern, IconRefresh } from "./icons";

interface Step0Props {
  onSelect: (v: "neubau" | "sanierung") => void;
}

export default function Step0Projektart({ onSelect }: Step0Props) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;

  return (
    <div className="rounded-2xl bg-light-gray p-4 sm:p-6 md:p-8">
      <header className="mb-6 text-center">
        <h2 className="text-xl font-medium text-navy sm:text-[22px]">{t.weiche_question}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.weiche_subline}</p>
      </header>

      {/* Konstante Mindesthöhe wie die Funnels -> kein Höhensprung beim
          Weiche->Funnel-Wechsel (Steffi, #102); Auswahl vertikal zentriert. */}
      <div className="md:flex md:min-h-[500px] md:flex-col md:justify-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Neubau — Navy, Kerngeschäft (links) */}
        <button
          type="button"
          onClick={() => onSelect("neubau")}
          className="flex flex-col items-start gap-3 rounded-2xl bg-navy p-6 text-left text-white transition-transform duration-150 hover:-translate-y-0.5 sm:p-8"
        >
          <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-xl bg-white/15">
            <IconGridPattern width={26} height={26} />
          </span>
          <span className="text-xl font-bold">{t.weiche_neubau_titel}</span>
          <span className="text-sm text-white/80">{t.weiche_neubau_text}</span>
        </button>

        {/* Sanierung — Cyan/hell, dezent (rechts) */}
        <button
          type="button"
          onClick={() => onSelect("sanierung")}
          className="flex flex-col items-start gap-3 rounded-2xl border-2 border-cyan bg-card p-6 text-left text-navy transition-transform duration-150 hover:-translate-y-0.5 sm:p-8"
        >
          <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-xl bg-cyan/12 text-cyan-text">
            <IconRefresh width={26} height={26} />
          </span>
          <span className="text-xl font-bold">{t.weiche_sanierung_titel}</span>
          <span className="text-sm text-muted-foreground">{t.weiche_sanierung_text}</span>
        </button>
        </div>
      </div>
    </div>
  );
}

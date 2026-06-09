// Step 1 — Flächenkategorie (3 Karten: Punktuell / Mittel / Groß)
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md

import type { Flaechenkategorie } from "@/data/types";
import { useLocale } from "@/lib/LocaleContext";
import OptionCard from "./OptionCard";
import { IconTarget, IconGridPattern, IconSquare } from "./icons";

interface Step1Props {
  value: Flaechenkategorie | null;
  onSelect: (v: Flaechenkategorie) => void;
}

const NAVY = "#002d59";

const OPTIONEN: Array<{
  id: Flaechenkategorie;
  Icon: typeof IconTarget;
  key: "punktuell" | "mittel" | "gross";
}> = [
  { id: "punktuell", Icon: IconTarget, key: "punktuell" },
  { id: "mittel", Icon: IconGridPattern, key: "mittel" },
  { id: "gross", Icon: IconSquare, key: "gross" },
];

export default function Step1Flaeche({ value, onSelect }: Step1Props) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          {t.step1_question}
        </h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{t.step1_subline}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {OPTIONEN.map((opt) => (
          <OptionCard
            key={opt.id}
            Icon={opt.Icon}
            titel={t[`step1_${opt.key}_titel`]}
            hint={t[`step1_${opt.key}_hint`]}
            beschreibung={t[`step1_${opt.key}_beschreibung`]}
            selected={value === opt.id}
            dimmed={value !== null && value !== opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Step 2 — Innen oder Außen (2 Karten)
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md

import type { InnenAussen } from "@/data/types";
import { useLocale } from "@/lib/LocaleContext";
import OptionCard from "./OptionCard";
import { IconWarehouse, IconSun } from "./icons";

interface Step2Props {
  value: InnenAussen | null;
  onSelect: (v: InnenAussen) => void;
}

const NAVY = "#002d59";

const OPTIONEN: Array<{
  id: InnenAussen;
  Icon: typeof IconWarehouse;
  key: "innen" | "aussen";
}> = [
  { id: "innen", Icon: IconWarehouse, key: "innen" },
  { id: "aussen", Icon: IconSun, key: "aussen" },
];

export default function Step2InnenAussen({ value, onSelect }: Step2Props) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          {t.step2_question}
        </h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{t.step2_subline}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONEN.map((opt) => (
          <OptionCard
            key={opt.id}
            Icon={opt.Icon}
            titel={t[`step2_${opt.key}_titel`]}
            beschreibung={t[`step2_${opt.key}_beschreibung`]}
            selected={value === opt.id}
            dimmed={value !== null && value !== opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

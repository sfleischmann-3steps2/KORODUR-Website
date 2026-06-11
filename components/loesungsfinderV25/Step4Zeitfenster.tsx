// Step 4 — Zeitfenster.
// Wird nur bei flaeche !== "punktuell" angezeigt. Bei Punktuell überspringt
// der Wizard diesen Step und setzt zeitfenster intern auf "sehr-kurz".
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md

import type { Zeitfenster } from "@/data/types";
import { useLocale } from "@/lib/LocaleContext";
import OptionCard from "./OptionCard";
import { IconClockBolt, IconCalendar, IconCalendarMonth } from "./icons";

interface Step4Props {
  value: Zeitfenster | null;
  onSelect: (v: Zeitfenster) => void;
}

const NAVY = "var(--navy)";

const OPTIONEN: Array<{
  id: Zeitfenster;
  Icon: typeof IconClockBolt;
  key: "sehrkurz" | "kurz" | "planbar";
}> = [
  { id: "sehr-kurz", Icon: IconClockBolt, key: "sehrkurz" },
  { id: "kurz", Icon: IconCalendar, key: "kurz" },
  { id: "planbar", Icon: IconCalendarMonth, key: "planbar" },
];

export default function Step4Zeitfenster({ value, onSelect }: Step4Props) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          {t.step4_question}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.step4_subline}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {OPTIONEN.map((opt) => (
          <OptionCard
            key={opt.id}
            Icon={opt.Icon}
            titel={t[`step4_${opt.key}_titel`]}
            hint={t[`step4_${opt.key}_hint`]}
            beschreibung={t[`step4_${opt.key}_beschreibung`]}
            selected={value === opt.id}
            dimmed={value !== null && value !== opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

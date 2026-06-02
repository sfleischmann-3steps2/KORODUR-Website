// Step 2 — Innen oder Außen (2 Karten)
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md

import type { InnenAussen } from "@/data/types";
import OptionCard from "./OptionCard";
import { IconWarehouse, IconSun } from "./icons";

interface Step2Props {
  value: InnenAussen | null;
  onSelect: (v: InnenAussen) => void;
}

const NAVY = "#002d59";

// TODO i18n
const OPTIONEN: Array<{
  id: InnenAussen;
  Icon: typeof IconWarehouse;
  titel: string;
  beschreibung: string;
}> = [
  {
    id: "innen",
    Icon: IconWarehouse,
    titel: "Innenfläche",
    beschreibung: "Hallen, Werkstätten, Produktion, Lager, Verkaufsräume",
  },
  {
    id: "aussen",
    Icon: IconSun,
    titel: "Außenfläche",
    beschreibung: "Parkdecks, Verladezonen, Rampen, Außenlager – mit Frost und Tausalz",
  },
];

export default function Step2InnenAussen({ value, onSelect }: Step2Props) {
  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          Wo soll saniert werden?
        </h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Bei Außenflächen sind Frost- und Tausalzbeständigkeit essenziell – das filtern
          wir direkt mit ein.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONEN.map((opt) => (
          <OptionCard
            key={opt.id}
            Icon={opt.Icon}
            titel={opt.titel}
            beschreibung={opt.beschreibung}
            selected={value === opt.id}
            dimmed={value !== null && value !== opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

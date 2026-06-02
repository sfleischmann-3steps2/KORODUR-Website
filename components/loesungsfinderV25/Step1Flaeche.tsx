// Step 1 — Flächenkategorie (3 Karten: Punktuell / Mittel / Groß)
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md

import type { Flaechenkategorie } from "@/data/types";
import OptionCard from "./OptionCard";
import { IconTarget, IconGridPattern, IconSquare } from "./icons";

interface Step1Props {
  value: Flaechenkategorie | null;
  onSelect: (v: Flaechenkategorie) => void;
}

const NAVY = "#002d59";

// TODO i18n: Texte in dictionaries/{de,en,fr,pl}.json überführen, sobald Wizard-Architektur abgenommen ist.
const OPTIONEN: Array<{
  id: Flaechenkategorie;
  Icon: typeof IconTarget;
  titel: string;
  hint: string;
  beschreibung: string;
}> = [
  {
    id: "punktuell",
    Icon: IconTarget,
    titel: "Schnelle punktuelle Sanierung",
    hint: "unter 100 m²",
    beschreibung: "Einzelne Schadstellen, Treppen, Wände, Fugenprofile",
  },
  {
    id: "mittel",
    Icon: IconGridPattern,
    titel: "Mittlere Fläche",
    hint: "100 – 1.000 m²",
    beschreibung: "Zusammenhängende Hallenabschnitte, einzelne Räume, kleinere Verladezonen",
  },
  {
    id: "gross",
    Icon: IconSquare,
    titel: "Großflächige Sanierung",
    hint: "über 1.000 m²",
    beschreibung: "Komplette Hallen, große Außenflächen, Parkdecks, Produktionsanlagen",
  },
];

export default function Step1Flaeche({ value, onSelect }: Step1Props) {
  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          Wie groß ist die zu sanierende Fläche?
        </h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Die Größe entscheidet über die Produktwelt – kleine Reparaturen verlangen
          schnellabbindende Mörtel, große Flächen einen Industrieestrich.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {OPTIONEN.map((opt) => (
          <OptionCard
            key={opt.id}
            Icon={opt.Icon}
            titel={opt.titel}
            hint={opt.hint}
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

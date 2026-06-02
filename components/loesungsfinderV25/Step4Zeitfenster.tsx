// Step 4 — Zeitfenster.
// Wird nur bei flaeche !== "punktuell" angezeigt. Bei Punktuell überspringt
// der Wizard diesen Step und setzt zeitfenster intern auf "sehr-kurz".
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md

import type { Zeitfenster } from "@/data/types";
import OptionCard from "./OptionCard";
import { IconClockBolt, IconCalendar, IconCalendarMonth } from "./icons";

interface Step4Props {
  value: Zeitfenster | null;
  onSelect: (v: Zeitfenster) => void;
}

const NAVY = "#002d59";

// TODO i18n
const OPTIONEN: Array<{
  id: Zeitfenster;
  Icon: typeof IconClockBolt;
  titel: string;
  hint: string;
  beschreibung: string;
}> = [
  {
    id: "sehr-kurz",
    Icon: IconClockBolt,
    titel: "Sehr kurzfristig",
    hint: "Über Nacht, Wochenende",
    beschreibung: "Sanierung im laufenden Betrieb, Wiederbelastung in 24 h",
  },
  {
    id: "kurz",
    Icon: IconCalendar,
    titel: "Schnelle Sanierung",
    hint: "1 – 2 Wochen",
    beschreibung: "Geplante Produktionspause, kurzer Stillstand mit klarem Fenster",
  },
  {
    id: "planbar",
    Icon: IconCalendarMonth,
    titel: "Planbar",
    hint: "Keine Zeitbegrenzung",
    beschreibung: "Voller Industrieestrich-Aufbau mit Standard-Aushärtung möglich",
  },
];

export default function Step4Zeitfenster({ value, onSelect }: Step4Props) {
  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          Wann muss die Fläche wieder nutzbar sein?
        </h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Bei sehr kurzen Zeitfenstern empfehlen wir Rapid-Set-Produkte – das verändert
          die Empfehlung deutlich.
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

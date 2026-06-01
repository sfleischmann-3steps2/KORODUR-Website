// Gemeinsame Option-Karte für Step 1–4 des V2.5-Lösungsfinders.
// Hält Default-, Selected- und Disabled-State an einer Stelle, damit
// Brand-Tokens und Hover-Verhalten konsistent bleiben.

import type { ComponentType, SVGProps } from "react";
import { IconCheck } from "./icons";

type IconComp = ComponentType<Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">>;

interface OptionCardProps {
  Icon: IconComp;
  titel: string;
  /** Kleiner Hint unter dem Titel (z.B. "unter 100 m²", "Hallen, Werkstätten"). */
  hint?: string;
  beschreibung: string;
  selected: boolean;
  onSelect: () => void;
  /** Optional: Karte deaktivieren (z.B. nicht-ausgewählte nach Selection). */
  dimmed?: boolean;
  /** Lange Karten (Mobile-Layout, Icon links + Text rechts) vs. quadratische Karten. */
  layout?: "stacked" | "horizontal";
}

const NAVY = "#002d59";
const CYAN = "#009ee3";
const LIGHT_NAVY_BG = "#E6F1FB";

export default function OptionCard({
  Icon,
  titel,
  hint,
  beschreibung,
  selected,
  onSelect,
  dimmed = false,
  layout = "stacked",
}: OptionCardProps) {
  const borderStyle = selected
    ? { border: `2px solid ${NAVY}` }
    : { border: "0.5px solid rgba(0,0,0,0.12)" };

  const iconBox = selected
    ? { background: NAVY, color: "#fff" }
    : { background: LIGHT_NAVY_BG, color: NAVY };

  if (layout === "horizontal") {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`relative w-full text-left bg-white rounded-xl p-4 transition ${
          dimmed ? "opacity-60" : "hover:border-[#009ee3]"
        }`}
        style={borderStyle}
      >
        {selected && (
          <span
            aria-hidden="true"
            className="absolute top-2 right-2 w-[22px] h-[22px] rounded-full flex items-center justify-center"
            style={{ background: CYAN, color: "#fff" }}
          >
            <IconCheck width={14} height={14} />
          </span>
        )}
        <div className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={iconBox}
          >
            <Icon width={22} height={22} />
          </span>
          <div>
            <div className="text-[15px] font-medium" style={{ color: NAVY }}>
              {titel}
            </div>
            {hint && (
              <div className="text-[11px] uppercase tracking-wide text-gray-500 mt-0.5">{hint}</div>
            )}
            <div className="text-xs text-gray-600 mt-1 leading-relaxed">{beschreibung}</div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative w-full text-left bg-white rounded-xl p-5 transition ${
        dimmed ? "opacity-60" : "hover:border-[#009ee3]"
      }`}
      style={borderStyle}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: CYAN, color: "#fff" }}
        >
          <IconCheck width={16} height={16} />
        </span>
      )}
      <span
        aria-hidden="true"
        className="flex w-11 h-11 rounded-lg items-center justify-center mb-3.5"
        style={iconBox}
      >
        <Icon width={26} height={26} />
      </span>
      <div className="text-[15px] font-medium" style={{ color: NAVY }}>
        {titel}
      </div>
      {hint && (
        <div className="text-[11px] uppercase tracking-wide text-gray-500 mt-1">{hint}</div>
      )}
      <div className="text-xs text-gray-600 mt-2 leading-relaxed">{beschreibung}</div>
    </button>
  );
}

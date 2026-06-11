// Gemeinsame Option-Karte für Step 1–4 des V2.5-Lösungsfinders.
// Hält Default-, Selected- und Disabled-State an einer Stelle, damit
// Brand-Tokens und Hover-Verhalten konsistent bleiben.
//
// Alle Größen/Layouts sind bewusst als Inline-Styles gesetzt, weil
// Tailwind 4 Klassen wie `inline-flex` bei generierten Komponenten teilweise
// nicht zuverlässig im JIT-Index landen (PoC 2026-06-01 zeigte volle
// Card-Breite statt 44×44-Icon-Box).

import type { ComponentType, CSSProperties, SVGProps } from "react";
import { IconCheck } from "./icons";

type IconComp = ComponentType<Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">>;

interface OptionCardProps {
  Icon: IconComp;
  titel: string;
  hint?: string;
  beschreibung: string;
  selected: boolean;
  onSelect: () => void;
  dimmed?: boolean;
  layout?: "stacked" | "horizontal";
}

const NAVY = "var(--navy)";
const CYAN = "var(--cyan)";
// Sehr leichter Cyan-Tint (12% der Sekundärfarbe) für die Icon-Box im
// Default-State. Bleibt in der Brand-Welt, statt ein fremdes Hellblau zu erfinden.
const LIGHT_CYAN_BG = "color-mix(in srgb, var(--cyan) 12%, transparent)";

const buttonReset: CSSProperties = {
  appearance: "none",
  WebkitAppearance: "none",
  background: "var(--white)",
  textAlign: "left",
  width: "100%",
  cursor: "pointer",
  font: "inherit",
};

const cardBase: CSSProperties = {
  position: "relative",
  borderRadius: 12,
  transition: "border-color 0.15s, opacity 0.15s",
};

const iconBoxBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  flexShrink: 0,
};

const checkBadgeBase: CSSProperties = {
  position: "absolute",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: CYAN,
  color: "var(--white)",
};

const titleStyle: CSSProperties = { fontSize: 15, fontWeight: 500, color: NAVY };
const hintStyle: CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
  color: "var(--muted-foreground)",
  marginTop: 4,
};
const beschreibungStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--muted-foreground)",
  marginTop: 6,
  lineHeight: 1.55,
};

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
  const borderStyle: CSSProperties = selected
    ? { border: `2px solid ${NAVY}` }
    : { border: "1px solid color-mix(in srgb, var(--navy) 15%, transparent)" };

  const iconBoxColor: CSSProperties = selected
    ? { background: NAVY, color: "var(--white)" }
    : { background: LIGHT_CYAN_BG, color: NAVY };

  const sharedCardStyle: CSSProperties = {
    ...buttonReset,
    ...cardBase,
    ...borderStyle,
    opacity: dimmed ? 0.6 : 1,
  };

  if (layout === "horizontal") {
    return (
      <button type="button" onClick={onSelect} aria-pressed={selected} style={{ ...sharedCardStyle, padding: 16 }}>
        {selected && (
          <span aria-hidden="true" style={{ ...checkBadgeBase, top: 8, right: 8, width: 22, height: 22 }}>
            <IconCheck width={14} height={14} />
          </span>
        )}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <span aria-hidden="true" style={{ ...iconBoxBase, ...iconBoxColor, width: 40, height: 40 }}>
            <Icon width={22} height={22} />
          </span>
          <div>
            <div style={titleStyle}>{titel}</div>
            {hint && <div style={{ ...hintStyle, marginTop: 2 }}>{hint}</div>}
            <div style={{ ...beschreibungStyle, marginTop: 4 }}>{beschreibung}</div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button type="button" onClick={onSelect} aria-pressed={selected} style={{ ...sharedCardStyle, padding: 20 }}>
      {selected && (
        <span aria-hidden="true" style={{ ...checkBadgeBase, top: 12, right: 12, width: 24, height: 24 }}>
          <IconCheck width={16} height={16} />
        </span>
      )}
      <span
        aria-hidden="true"
        style={{ ...iconBoxBase, ...iconBoxColor, width: 44, height: 44, marginBottom: 14 }}
      >
        <Icon width={26} height={26} />
      </span>
      <div style={titleStyle}>{titel}</div>
      {hint && <div style={hintStyle}>{hint}</div>}
      <div style={beschreibungStyle}>{beschreibung}</div>
    </button>
  );
}

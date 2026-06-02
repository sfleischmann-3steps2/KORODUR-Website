// Inline-SVG-Icons (Tabler-style, MIT) für den V2.5-Lösungsfinder.
// Bewusst self-contained ohne Library-Dependency – wir laden kein
// @tabler/icons-react und kein lucide-react, weil der Bestand bisher
// auch ohne Icon-Library auskommt.

import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  // display:block verhindert subtilen Inline-Baseline-Offset einzelner Icons,
  // der bei align-items:center in Flex-Containern zu pixelversetzter Optik führt.
  style: { display: "block" as const },
};

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function IconGridPattern(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5h4v4H5z" />
      <path d="M5 15h4v4H5z" />
      <path d="M15 5h4v4h-4z" />
      <path d="M15 15h4v4h-4z" />
    </svg>
  );
}

export function IconSquare(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

export function IconWarehouse(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21V8l9-4 9 4v13" />
      <path d="M3 21h18" />
      <path d="M7 21v-6h10v6" />
      <path d="M7 15v-2h10v2" />
    </svg>
  );
}

export function IconSun(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="M5 12l6-6" />
      <path d="M5 12l6 6" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6" />
      <path d="M13 18l6-6" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

// === Step 3 — Branchen (Innen) ===

export function IconForklift(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="18" r="2" />
      <circle cx="15" cy="18" r="2" />
      <path d="M5 18H4V8h6v10" />
      <path d="M10 13h5l3-3V6h-3" />
      <path d="M18 18h-1" />
    </svg>
  );
}

export function IconFactory(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21V11l5 3V11l5 3V7l8 4v10z" />
      <path d="M3 21h18" />
      <path d="M16 8V4l3-1v5" />
    </svg>
  );
}

export function IconChefHat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 14a4 4 0 0 1-1-7.9 5 5 0 0 1 12 0A4 4 0 0 1 17 14v6H7z" />
      <path d="M9 14v6M15 14v6" />
    </svg>
  );
}

export function IconShoppingCart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
      <path d="M3 4h2l2 12h12l2-8H7" />
    </svg>
  );
}

// === Step 3 — Branchen (Außen) ===

export function IconParking(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
    </svg>
  );
}

export function IconTruckLoading(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M5 18H3V6h11v12" />
      <path d="M14 9h4l3 4v5h-2" />
      <path d="M15 18h-2" />
    </svg>
  );
}

export function IconBuildings(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V8h7v13" />
      <path d="M11 21V4h9v17" />
      <path d="M7 12v.01M7 16v.01M15 8v.01M15 12v.01M15 16v.01" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function IconRoad(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21l4-18M20 21l-4-18" />
      <path d="M12 5v2M12 11v2M12 17v2" />
    </svg>
  );
}

// === Step 4 — Zeitfenster ===

export function IconClockBolt(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="12" r="8" />
      <path d="M11 8v4l2 2" />
      <path d="M19 14l-2 4h3l-2 4" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M16 3v4M8 3v4M4 11h16" />
    </svg>
  );
}

export function IconCalendarMonth(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M16 3v4M8 3v4M4 11h16" />
      <path d="M8 15h1M12 15h1M16 15h1" />
    </svg>
  );
}

// === Ergebnisseite ===

export function IconFlame(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21a6 6 0 0 1-6-6c0-3 1.5-4.5 3-6 1.5-1.5 2-3 1.5-5 3 1 6 4 7 8a6 6 0 0 1-5.5 9z" />
    </svg>
  );
}

export function IconEdit(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20h4l10-10-4-4L4 16z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

export function IconExternalLink(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 14L20 4" />
      <path d="M14 4h6v6" />
      <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

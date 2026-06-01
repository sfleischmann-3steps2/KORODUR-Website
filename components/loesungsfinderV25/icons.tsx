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
};

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="9" />
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

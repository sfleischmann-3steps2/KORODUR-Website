import type { LucideIcon, LucideProps } from "lucide-react";

/**
 * Einheitlicher Icon-Wrapper für lucide-react.
 * Strichstärke 1.75 entspricht der Optik der bisherigen Eigenbau-Icons
 * (components/loesungsfinderV25/icons.tsx); lucide-Default wäre 2.
 */
export function AppIcon({
  icon: Icon,
  strokeWidth = 1.75,
  ...props
}: { icon: LucideIcon } & LucideProps) {
  return <Icon strokeWidth={strokeWidth} {...props} />;
}

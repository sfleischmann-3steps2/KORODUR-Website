// Zentrale Bereich-Ikonografie (Steffi, 2026-06-13, #104): ein festes Icon je
// Bereich, durchgängig über Homepage-Grid, /bereiche-Übersicht, /neubau und
// Mega-Menüs genutzt. lucide-react rendert serverseitig.
import {
  Layers,
  Sparkles,
  Droplets,
  Timer,
  Package,
  PawPrint,
  Route,
  type LucideIcon,
} from "lucide-react";

export const BEREICH_ICONS: Record<string, LucideIcon> = {
  industrieboden: Layers,
  sichtestrich: Sparkles,
  microtop: Droplets,
  "rapid-set": Timer,
  betonsanierung: Timer,
  spezialmoertel: Package,
  katzenstreu: PawPrint,
  infrastruktur: Route,
  // Taxonomie-Bereich ohne eigene Seite — Fallback:
  "3d-concrete-printing": Package,
};

export function bereichIcon(slug: string): LucideIcon {
  return BEREICH_ICONS[slug] ?? Layers;
}

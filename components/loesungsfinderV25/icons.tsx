// Lucide-Icons für den V2.5-Lösungsfinder.
// Gleiche Export-Namen und Prop-Signaturen wie die früheren Inline-SVGs
// (Tabler-style), intern lucide-react via AppIcon-Wrapper mit strokeWidth 1.75.
// Mapping: docs/reviews/2026-06-11-ui-stack-deep-dive.md §4.

import type { SVGProps } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Anvil,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  ChefHat,
  Factory,
  Flame,
  FlaskConical,
  Footprints,
  Forklift,
  LayoutGrid,
  Leaf,
  Package,
  Palette,
  Phone,
  RotateCw,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  SprayCan,
  Square,
  SquareParking,
  Store,
  Sun,
  Target,
  Timer,
  Truck,
  Warehouse,
  Weight,
  X,
  Zap,
} from "lucide-react";
import { AppIcon } from "@/components/ui/icon";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">;

// display:block verhindert subtilen Inline-Baseline-Offset einzelner Icons,
// der bei align-items:center in Flex-Containern zu pixelversetzter Optik führt.
const blockStyle = { display: "block" as const };

function lucide(Icon: LucideIcon) {
  function Wrapped(props: IconProps) {
    return <AppIcon icon={Icon} style={blockStyle} {...props} />;
  }
  return Wrapped;
}

export const IconTarget = lucide(Target);
export const IconGridPattern = lucide(LayoutGrid);
export const IconSquare = lucide(Square);
export const IconWarehouse = lucide(Warehouse);
export const IconSun = lucide(Sun);
export const IconCheck = lucide(Check);
export const IconRefresh = lucide(RotateCw);
export const IconArrowLeft = lucide(ArrowLeft);
export const IconArrowRight = lucide(ArrowRight);
export const IconX = lucide(X);

// === Step 3 — Branchen (Innen) ===

export const IconForklift = lucide(Forklift);
export const IconFactory = lucide(Factory);
export const IconChefHat = lucide(ChefHat);
export const IconShoppingCart = lucide(ShoppingCart);

// === Step 3 — Branchen (Außen) ===

export const IconParking = lucide(SquareParking);
export const IconTruckLoading = lucide(Truck);
export const IconBuildings = lucide(Building2);

// IconRoad hat kein lucide-Pendant — Original-SVG (Tabler-style) bleibt.
export function IconRoad(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={blockStyle}
      {...props}
    >
      <path d="M4 21l4-18M20 21l-4-18" />
      <path d="M12 5v2M12 11v2M12 17v2" />
    </svg>
  );
}

// === Step 4 — Zeitfenster ===

export const IconClockBolt = lucide(Timer);
export const IconCalendar = lucide(Calendar);
export const IconCalendarMonth = lucide(CalendarDays);

// === Neubau-Funnel (RV-Struktur 2026-06-24) ===

export const IconStore = lucide(Store);
export const IconAnvil = lucide(Anvil);
export const IconWeight = lucide(Weight);
export const IconPackage = lucide(Package);
export const IconFootprints = lucide(Footprints);
export const IconFlask = lucide(FlaskConical);
export const IconPalette = lucide(Palette);
export const IconSpray = lucide(SprayCan);
export const IconRuler = lucide(Ruler);
export const IconShield = lucide(ShieldCheck);
export const IconLeaf = lucide(Leaf);
export const IconZap = lucide(Zap);

// === Ergebnisseite ===

export const IconFlame = lucide(Flame);
export const IconPhone = lucide(Phone);

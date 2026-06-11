// Gemeinsame Option-Karte für Step 1–4 des V2.5-Lösungsfinders.
// Default-, Selected- und Dimmed-State als cva-Varianten an einer Stelle,
// damit Brand-Tokens und Hover-Verhalten konsistent bleiben.
//
// Bewusst ein <button> mit Card-Optik (bg-card, rounded-xl, border) statt der
// shadcn-<Card> (ein <div>): aria-pressed-Toggle-Semantik braucht ein echtes
// Button-Element, und die ganze Karte bleibt so ein einziges Touch-Target.

import type { ComponentType, SVGProps } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
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

const optionCardVariants = cva(
  "relative block w-full min-h-11 cursor-pointer rounded-xl bg-card text-left transition-[border-color,opacity] duration-150",
  {
    variants: {
      selected: {
        true: "border-2 border-navy",
        false: "border border-navy/15 hover:border-navy/40",
      },
      dimmed: {
        true: "opacity-60",
        false: "opacity-100",
      },
      layout: {
        stacked: "p-4 sm:p-5",
        horizontal: "p-4",
      },
    },
    defaultVariants: { selected: false, dimmed: false, layout: "stacked" },
  }
);

// Icon-Box: Default-State im leichten Cyan-Tint (12 % der Sekundärfarbe),
// Selected-State invertiert auf Navy — bleibt in der Brand-Welt.
const iconBoxVariants = cva("inline-flex shrink-0 items-center justify-center rounded-lg", {
  variants: {
    selected: {
      true: "bg-navy text-white",
      false: "bg-cyan/12 text-navy",
    },
    layout: {
      stacked: "mb-3.5 size-11",
      horizontal: "size-10",
    },
  },
  defaultVariants: { selected: false, layout: "stacked" },
});

const checkBadgeVariants = cva(
  "absolute inline-flex items-center justify-center rounded-full bg-cyan text-white",
  {
    variants: {
      layout: {
        stacked: "top-3 right-3 size-6",
        horizontal: "top-2 right-2 size-5.5",
      },
    },
    defaultVariants: { layout: "stacked" },
  }
);

const titleClass = "text-[15px] font-medium text-navy";
const hintClass = "text-xs tracking-wide uppercase text-muted-foreground";
const beschreibungClass = "text-xs leading-relaxed text-muted-foreground";

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
  const horizontal = layout === "horizontal";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(optionCardVariants({ selected, dimmed, layout }))}
    >
      {selected && (
        <span aria-hidden="true" className={checkBadgeVariants({ layout })}>
          <IconCheck width={horizontal ? 14 : 16} height={horizontal ? 14 : 16} />
        </span>
      )}

      {horizontal ? (
        <div className="flex items-start gap-3.5">
          <span aria-hidden="true" className={iconBoxVariants({ selected, layout })}>
            <Icon width={22} height={22} />
          </span>
          <div className="min-w-0">
            <div className={titleClass}>{titel}</div>
            {hint && <div className={cn(hintClass, "mt-0.5")}>{hint}</div>}
            <div className={cn(beschreibungClass, "mt-1")}>{beschreibung}</div>
          </div>
        </div>
      ) : (
        <>
          <span aria-hidden="true" className={iconBoxVariants({ selected, layout })}>
            <Icon width={26} height={26} />
          </span>
          <div className={titleClass}>{titel}</div>
          {hint && <div className={cn(hintClass, "mt-1")}>{hint}</div>}
          <div className={cn(beschreibungClass, "mt-1.5")}>{beschreibung}</div>
        </>
      )}
    </button>
  );
}

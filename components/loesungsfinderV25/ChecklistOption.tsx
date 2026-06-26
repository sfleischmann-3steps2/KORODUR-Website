// Längliche Listen-Zeile für die Mehrfachauswahl (Neubau-Funnel, Schritt 3).
// Bewusst NICHT die OptionCard-Kachel: dort signalisiert erst der Check-Badge
// NACH dem Klick eine Auswahl — bei einer Mehrfachauswahl ist dann nicht klar,
// dass man mehrere Punkte abhaken kann (Feedback Steffi 2026-06-26). Diese
// Variante zeigt die leere Checkbox schon vor dem Klick -> liest sich als
// Abhak-Liste. Eigene Komponente, damit die geteilte OptionCard (Sanierungs-
// Wizard) unangetastet bleibt.

import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { IconCheck } from "./icons";

type IconComp = ComponentType<Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">>;

interface ChecklistOptionProps {
  Icon: IconComp;
  titel: string;
  beschreibung: string;
  selected: boolean;
  onSelect: () => void;
}

export default function ChecklistOption({ Icon, titel, beschreibung, selected, onSelect }: ChecklistOptionProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full min-h-11 items-center gap-3.5 rounded-xl bg-card p-4 text-left transition-[border-color] duration-150 sm:gap-4",
        selected ? "border-2 border-navy" : "border border-navy/15 hover:border-navy/40"
      )}
    >
      {/* Checkbox-Affordanz: leere Box vor dem Klick signalisiert die Mehrfachauswahl. */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
          selected ? "border-cyan bg-cyan text-white" : "border-navy/30 bg-transparent"
        )}
      >
        {selected && <IconCheck width={16} height={16} />}
      </span>

      {/* Icon-Box in Brand-Optik — selektiert auf Navy invertiert (wie OptionCard). */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-lg",
          selected ? "bg-navy text-white" : "bg-cyan/12 text-navy"
        )}
      >
        <Icon width={22} height={22} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium text-navy">{titel}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{beschreibung}</span>
      </span>
    </button>
  );
}

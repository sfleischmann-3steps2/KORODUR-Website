"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";
import { getNormBeschreibung } from "@/data/normenGlossar";

// Badge-Stil analog der Kopf-Badges (#408, F4): gefüllt statt weiße Karte.
const CHIP_CLASS = "text-[12.5px] text-navy px-3 py-1.5 rounded-[6px] bg-[var(--bullet-bg)]";
const CHIP_STYLE = { fontWeight: 600 } as const;

/**
 * Normen-Chips mit Glossar-Tooltip (#97). Normen mit SoT-Glossar-Eintrag
 * bekommen einen Tooltip (gepunktete Unterstreichung als Hinweis); Normen
 * ohne Eintrag werden als schlichter Chip gerendert.
 */
export default function NormenChips({ normen }: { normen: string[] }) {
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      <div className="flex flex-wrap gap-2">
        {normen.map((norm) => {
          const beschreibung = getNormBeschreibung(norm);

          if (!beschreibung) {
            return (
              <span key={norm} className={CHIP_CLASS} style={CHIP_STYLE}>
                {norm}
              </span>
            );
          }

          return (
            <TooltipPrimitive.Root key={norm}>
              <TooltipPrimitive.Trigger asChild>
                <span
                  tabIndex={0}
                  className={`${CHIP_CLASS} cursor-help underline decoration-dotted underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-cyan`}
                  style={CHIP_STYLE}
                >
                  {norm}
                </span>
              </TooltipPrimitive.Trigger>
              <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content
                  side="top"
                  sideOffset={6}
                  className="z-50 max-w-[280px] rounded-lg px-3 py-2 text-[13px] leading-snug text-white shadow-lg"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  {beschreibung}
                  <TooltipPrimitive.Arrow style={{ fill: "var(--navy)" }} />
                </TooltipPrimitive.Content>
              </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
          );
        })}
      </div>
    </TooltipPrimitive.Provider>
  );
}

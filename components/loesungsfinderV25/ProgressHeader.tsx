// Adaptive Progress-Anzeige: 4 Dots regulär, 3 Dots wenn flaeche === "punktuell".
// Der Wechsel passiert stillschweigend (kein Badge, kein Hinweis-Text).

import { useLocale } from "@/lib/LocaleContext";
import { X } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface ProgressHeaderProps {
  /** 1-basierter Step-Index. */
  currentStep: number;
  /** 3 (bei Punktuell) oder 4 (sonst). */
  totalSteps: number;
  /** Cancel-Handler springt zurück zur Lösungsfinder-Startseite. */
  onCancel: () => void;
}

export default function ProgressHeader({ currentStep, totalSteps, onCancel }: ProgressHeaderProps) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;
  return (
    <div className="flex items-center justify-between gap-2 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`block h-1 w-6 rounded-sm transition sm:w-8 ${
                i < currentStep ? "bg-navy" : "bg-mid-gray"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {t.progress_step
            .replace("{current}", String(currentStep))
            .replace("{total}", String(totalSteps))}
        </span>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        className="h-11 gap-1.5 px-2 -mr-2 text-xs text-muted-foreground hover:text-foreground md:h-9"
      >
        <AppIcon icon={X} className="size-3.5" aria-hidden="true" />
        {t.cancel}
      </Button>
    </div>
  );
}

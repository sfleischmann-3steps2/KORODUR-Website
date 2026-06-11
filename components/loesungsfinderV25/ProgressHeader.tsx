// Adaptive Progress-Anzeige: 4 Dots regulär, 3 Dots wenn flaeche === "punktuell".
// Der Wechsel passiert stillschweigend (kein Badge, kein Hinweis-Text).

import { useLocale } from "@/lib/LocaleContext";
import { IconX } from "./icons";

interface ProgressHeaderProps {
  /** 1-basierter Step-Index. */
  currentStep: number;
  /** 3 (bei Punktuell) oder 4 (sonst). */
  totalSteps: number;
  /** Cancel-Handler springt zurück zur Lösungsfinder-Startseite. */
  onCancel: () => void;
}

const NAVY = "var(--navy)";

export default function ProgressHeader({ currentStep, totalSteps, onCancel }: ProgressHeaderProps) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="flex gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className="block rounded-sm transition"
              style={{
                width: 32,
                height: 4,
                background: i < currentStep ? NAVY : "var(--mid-gray)",
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {t.progress_step
            .replace("{current}", String(currentStep))
            .replace("{total}", String(totalSteps))}
        </span>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
      >
        <IconX width={14} height={14} aria-hidden="true" />
        {t.cancel}
      </button>
    </div>
  );
}

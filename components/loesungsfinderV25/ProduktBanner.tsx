// Produkt-Banner der Ergebnisseite: Top-Empfehlung und Alternative teilen
// sich Layout und Inhaltstruktur; die Variante steuert nur die Akzente
// (Icon-Box gefüllt vs. outlined, Eyebrow-Label Cyan vs. grau). Dedupliziert
// die zwei fast identischen Inline-Style-Banner (UI-Refactoring PR 5).

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { Locale } from "@/lib/i18n";
import type { Produkt } from "@/data/produkte";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconFlame, IconArrowRight } from "./icons";

const iconBoxVariants = cva(
  "flex size-10 shrink-0 items-center justify-center rounded-lg",
  {
    variants: {
      variant: {
        top: "bg-navy text-white",
        alternative: "border-[1.5px] border-navy bg-white text-navy",
      },
    },
    defaultVariants: { variant: "top" },
  },
);

const labelVariants = cva(
  "mb-0.5 text-xs font-medium uppercase tracking-[0.5px]",
  {
    variants: {
      variant: {
        top: "text-cyan-text",
        alternative: "text-muted-foreground",
      },
    },
    defaultVariants: { variant: "top" },
  },
);

interface ProduktBannerProps extends VariantProps<typeof iconBoxVariants> {
  lang: Locale;
  produkt: Produkt;
  /** Eyebrow-Label, z. B. "Unsere Empfehlung" / "Alternative". */
  label: string;
  /** Beschreibungszeile (Top: Kurzbeschreibung, Alternative: Hinweis ?? Kurzbeschreibung). */
  beschreibung: string;
  /** Label des Details-Links rechts. */
  detailsLabel: string;
  className?: string;
}

export default function ProduktBanner({
  lang,
  produkt,
  label,
  beschreibung,
  detailsLabel,
  variant,
  className,
}: ProduktBannerProps) {
  return (
    <Link
      href={`/${lang}/produkte/${produkt.id}/`}
      className={cn("block no-underline", className)}
    >
      <Card className="flex min-h-11 flex-row items-center gap-3 rounded-xl border-mid-gray px-4 py-3.5 text-navy shadow-none transition-colors hover:border-cyan sm:gap-4 sm:px-[18px]">
        <div className={iconBoxVariants({ variant })}>
          <IconFlame width={22} height={22} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={labelVariants({ variant })}>{label}</div>
          <div className="text-[15px] font-medium text-navy">{produkt.name}</div>
          <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
            {beschreibung}
          </div>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1 text-[13px] text-cyan-text">
          <span className="hidden sm:inline">{detailsLabel}</span>
          <IconArrowRight width={13} height={13} aria-hidden="true" />
        </div>
      </Card>
    </Link>
  );
}

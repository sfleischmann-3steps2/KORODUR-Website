"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Locale } from "../lib/i18n";
import { LOCALES } from "../lib/i18n";

const FLAG: Record<Locale, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  fr: "🇫🇷",
  pl: "🇵🇱",
  es: "🇪🇸",
};

const LABEL: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  pl: "Polski",
  es: "Español",
};

const ARIA_LABEL: Record<Locale, string> = {
  de: "Sprache",
  en: "Language",
  fr: "Langue",
  pl: "Język",
  es: "Idioma",
};

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const getLocalePath = (targetLocale: string) => {
    const rest = pathname.replace(/^\/(de|en|fr|pl|es)/, "");
    return `/${targetLocale}${rest}`;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 bg-icon-bg hover:bg-bullet-bg border-none rounded-lg cursor-pointer transition-colors duration-150"
        style={{ padding: "6px 10px", fontFamily: "inherit" }}
        aria-label={`${ARIA_LABEL[lang]}: ${LABEL[lang]}`}
      >
        <span className="text-[18px] leading-none">{FLAG[lang]}</span>
        <span className="text-[12px] text-navy uppercase" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
          {lang}
        </span>
        <AppIcon
          icon={ChevronDown}
          width={12}
          height={12}
          strokeWidth={2.5}
          className="text-navy opacity-40 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="min-w-[150px] rounded-lg border-bullet-bg bg-white p-0 shadow-lg overflow-hidden"
      >
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            asChild
            className={`rounded-none cursor-pointer ${
              l === lang
                ? "bg-cyan/10 text-cyan focus:bg-cyan/10 focus:text-cyan"
                : "text-navy focus:bg-icon-bg focus:text-navy"
            }`}
          >
            <Link
              href={getLocalePath(l)}
              className="flex items-center gap-2.5 no-underline transition-colors duration-150"
              style={{ padding: "10px 14px", fontWeight: 600, fontSize: 14 }}
            >
              <span className="text-[20px] leading-none">{FLAG[l]}</span>
              <span>{LABEL[l]}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

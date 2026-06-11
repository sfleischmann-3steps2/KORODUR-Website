"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import type { Locale } from "../lib/i18n";
import { LOCALES } from "../lib/i18n";

const FLAG: Record<Locale, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  fr: "🇫🇷",
  pl: "🇵🇱",
};

const LABEL: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  pl: "Polski",
};

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getLocalePath = (targetLocale: string) => {
    const rest = pathname.replace(/^\/(de|en|fr|pl)/, "");
    return `/${targetLocale}${rest}`;
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 bg-icon-bg hover:bg-bullet-bg border-none rounded-lg cursor-pointer transition-colors duration-150"
        style={{ padding: "6px 10px", fontFamily: "inherit" }}
        aria-label={`Sprache: ${LABEL[lang]}`}
        aria-expanded={open}
        aria-haspopup="true"
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
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 bg-white rounded-lg shadow-lg border border-bullet-bg overflow-hidden z-50"
          style={{ minWidth: 150 }}
          role="menu"
        >
          {LOCALES.map((l) => (
            <Link
              key={l}
              href={getLocalePath(l)}
              className={`flex items-center gap-2.5 no-underline transition-colors duration-150 ${
                l === lang
                  ? "bg-[#f0f8ff] text-cyan"
                  : "text-navy hover:bg-icon-bg"
              }`}
              style={{ padding: "10px 14px", fontWeight: 600, fontSize: 14 }}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="text-[20px] leading-none">{FLAG[l]}</span>
              <span>{LABEL[l]}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

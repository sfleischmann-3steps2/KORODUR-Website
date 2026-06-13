"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/basePath";
import { Menu, Phone, Search, X } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchOverlay from "./SearchOverlay";
import { KORODUR_ZENTRALE } from "../lib/kontaktDaten";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../app/[lang]/dictionaries";

interface TopNavProps {
  lang: Locale;
  dict: Dictionary;
}

export default function TopNav({ lang, dict }: TopNavProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Initial-Wert "⌘K" wird auf Server UND beim ersten Client-Render gerendert.
  // useEffect korrigiert nach Hydration auf "Ctrl+K", falls kein Mac.
  // So gibt es keinen Hydration-Mismatch durch Browser-API-Aufrufe im
  // Initial-State (siehe https://nextjs.org/docs/messages/react-hydration-error).
  const [shortcutLabel, setShortcutLabel] = useState<string>("⌘K");

  useEffect(() => {
    if (!/Mac/.test(navigator.userAgent ?? "")) {
      setShortcutLabel("Ctrl+K");
    }
  }, []);

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    // Home: exact match only
    if (href === `/${lang}/`) return pathname === href || pathname === `/${lang}`;
    // Others: prefix match
    return pathname === href || pathname.startsWith(href);
  };

  const navLinks = [
    { href: `/${lang}/produkte/`, label: dict.nav.produkte },
    // Neubau + Sanierung als gleichwertige Einstiege (Steffi 2026-06-13).
    // Die Anwendungsmatrix ist sanierungsspezifisch → liegt als Karte im
    // Sanierungs-Hub (/sanierung), nicht mehr in der Hauptnavigation.
    { href: `/${lang}/neubau/`, label: dict.nav.neubau },
    { href: `/${lang}/sanierung/`, label: dict.nav.sanierung },
    { href: `/${lang}/referenzen/`, label: dict.nav.referenzen },
    { href: `/${lang}/unternehmen/`, label: dict.nav.unternehmen },
    { href: `/${lang}/kontakt/`, label: dict.nav.kontakt },
  ];

  return (
    <>
      <header
        className="bg-white border-b border-bullet-bg shrink-0 z-40 sticky top-0"
        role="banner"
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1320, height: 64, padding: "0 24px" }}
        >
          {/* Logo (Original, Quelle docs/reference/brand/) */}
          <Link
            href={`/${lang}`}
            className="flex items-center no-underline shrink-0"
            aria-label="KORODUR"
          >
            <Image
              src={withBasePath("/images/brand/logo-korodur.png")}
              alt="KORODUR"
              width={71}
              height={48}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-[14px] no-underline transition-colors duration-150 ${
                  isActive(link.href)
                    ? "text-cyan-text"
                    : "text-navy hover:bg-icon-bg"
                }`}
                style={{ fontWeight: 700 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-icon-bg hover:bg-bullet-bg border-none rounded-lg cursor-pointer transition-colors duration-150"
              style={{ padding: "8px 12px", fontFamily: "inherit" }}
              aria-label={lang === "de" ? "Suchen" : lang === "fr" ? "Rechercher" : lang === "pl" ? "Szukaj" : "Search"}
            >
              <AppIcon icon={Search} width={16} height={16} strokeWidth={2} className="text-navy opacity-40" aria-hidden="true" />
              {shortcutLabel && (
                <kbd className="text-[11px] text-navy opacity-25 px-1.5 py-0.5 rounded border border-bullet-bg" style={{ fontWeight: 600 }}>
                  {shortcutLabel}
                </kbd>
              )}
            </button>

            {/* Mobile search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden p-2 bg-transparent border-none cursor-pointer"
              aria-label={lang === "de" ? "Suchen" : lang === "fr" ? "Rechercher" : lang === "pl" ? "Szukaj" : "Search"}
            >
              <AppIcon icon={Search} width={18} height={18} strokeWidth={2} className="text-navy opacity-50" aria-hidden="true" />
            </button>

            <LanguageSwitcher lang={lang} />

            {/* Telefon-Direktwahl (B2B: Anrufe zählen — Launch-Audit) */}
            <a
              href={KORODUR_ZENTRALE.telefonHref}
              className="hidden xl:flex items-center gap-2 text-navy text-[14px] no-underline hover:text-cyan-text transition-colors duration-150"
              style={{ fontWeight: 700 }}
            >
              <AppIcon icon={Phone} width={16} height={16} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
              {KORODUR_ZENTRALE.telefon}
            </a>

            {/* Desktop Lösungsfinder-CTA */}
            <Button asChild size="lg" className="hidden lg:inline-flex">
              <Link href={`/${lang}/loesungsfinder/`}>
                {dict.nav.loesungsfinder}
              </Link>
            </Button>

            {/* Mobile drawer (Sheet) */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden size-11 flex items-center justify-center bg-transparent border-none cursor-pointer"
                  aria-label={lang === "de" ? "Menü öffnen" : lang === "fr" ? "Ouvrir le menu" : lang === "pl" ? "Otwórz menu" : "Open menu"}
                >
                  <AppIcon icon={Menu} width={20} height={20} strokeWidth={2} className="text-navy" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                showCloseButton={false}
                closeLabel={lang === "de" ? "Schließen" : lang === "fr" ? "Fermer" : lang === "pl" ? "Zamknij" : "Close"}
                aria-describedby={undefined}
                className="lg:hidden bg-white p-0 gap-0 overflow-y-auto"
              >
                <SheetTitle className="sr-only">
                  {lang === "de" ? "Navigationsmenü" : lang === "fr" ? "Menu de navigation" : lang === "pl" ? "Menu nawigacji" : "Navigation menu"}
                </SheetTitle>

                {/* Logo + close */}
                <div className="flex items-center justify-between p-4 border-b border-bullet-bg">
                  <Link
                    href={`/${lang}`}
                    className="flex items-center no-underline"
                    onClick={() => setMobileOpen(false)}
                    aria-label="KORODUR"
                  >
                    <Image
                      src={withBasePath("/images/brand/logo-korodur.png")}
                      alt="KORODUR"
                      width={62}
                      height={42}
                    />
                  </Link>
                  <SheetClose asChild>
                    <button
                      className="size-11 flex items-center justify-center bg-transparent border-none cursor-pointer"
                      aria-label={lang === "de" ? "Schließen" : lang === "fr" ? "Fermer" : lang === "pl" ? "Zamknij" : "Close"}
                    >
                      <AppIcon icon={X} width={20} height={20} strokeWidth={2} className="text-navy" aria-hidden="true" />
                    </button>
                  </SheetClose>
                </div>

                <nav className="p-4 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-lg no-underline text-[15px] ${
                        isActive(link.href) ? "text-cyan-text" : "text-navy"
                      }`}
                      style={{ padding: "12px 16px", fontWeight: 700 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Lösungsfinder-CTA */}
                <div className="px-4 pb-4">
                  <Button asChild size="lg" className="w-full h-11 text-[15px]">
                    <Link
                      href={`/${lang}/loesungsfinder/`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.loesungsfinder}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <SearchOverlay
        lang={lang}
        dict={dict}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

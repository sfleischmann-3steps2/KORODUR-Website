"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/basePath";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import { bereichIcon } from "./bereichIcons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchOverlay from "./SearchOverlay";
import { KORODUR_ZENTRALE } from "../lib/kontaktDaten";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../app/[lang]/dictionaries";

interface TopNavProps {
  lang: Locale;
  dict: Dictionary;
}

type MegaItem = { label: string; href?: string; sub?: string; badge?: string; highlight?: boolean };
type MegaCluster = { title: string; items: MegaItem[] };
type MegaMenu = { items?: MegaItem[]; clusters?: MegaCluster[]; footer?: { label: string; href: string }[] };

export default function TopNav({ lang, dict }: TopNavProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === `/${lang}/`) return pathname === href || pathname === `/${lang}`;
    return pathname === href || pathname.startsWith(href);
  };

  const openNow = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const bt = dict.bereiche as Record<string, string>;
  const pa = dict.produkte as unknown as Record<string, string>;
  // Deep-Link in das Produktportfolio (Achse A), Anker = Produktart-Slug (#307).
  const paHref = (art: string) => `/${lang}/produkte/#${art}`;

  // Zwei-Achsen-IA (#306/#309). Portfolio = Achse A „WAS" (Produktart, gruppiert);
  // Neubau/Sanierung = Achse B „WOFÜR" (Use-Case-Bereiche). Spezialmörtel ist nur
  // Neubau ein eigener Bereich; im Sanierungspfad geht der Anteil (VM 5, PFM) in
  // Betonsanierung auf (Steffi 2026-06-22) → kein Spezialmörtel im Sanierung-Menü.
  const menus: Record<string, MegaMenu> = {
    portfolio: {
      clusters: [
        {
          title: dict.nav.mm_cluster_industrieboeden,
          items: [
            { label: pa["produktart_hartstoffe-din1100"], href: paHref("hartstoffe-din1100") },
            { label: pa["produktart_industrieboden-trockenmoertel"], href: paHref("industrieboden-trockenmoertel") },
            { label: pa["produktart_schnellestrich-bindemittel"], href: paHref("schnellestrich-bindemittel") },
            { label: pa["produktart_selbstverlaufende-industrieboeden"], href: paHref("selbstverlaufende-industrieboeden") },
            { label: pa["produktart_schnellbetonsysteme"], href: paHref("schnellbetonsysteme") },
          ],
        },
        {
          title: dict.nav.mm_cluster_sichtestriche,
          items: [
            { label: pa["produktart_mineralische-sichtestriche"], href: paHref("mineralische-sichtestriche") },
          ],
        },
        {
          title: dict.nav.mm_cluster_beton_spezial,
          items: [
            { label: pa["produktart_rapid-set"], href: paHref("rapid-set") },
            { label: pa["produktart_spezialmoertel"], href: paHref("spezialmoertel") },
            { label: pa["produktart_microtop"], href: paHref("microtop") },
            { label: pa["produktart_durop"], href: paHref("durop") },
          ],
        },
        {
          title: dict.nav.mm_cluster_begleit,
          items: [
            { label: pa["produktart_haftbruecke-grundierung"], href: paHref("haftbruecke-grundierung") },
            { label: pa["produktart_nachbehandlung-curing"], href: paHref("nachbehandlung-curing") },
            { label: pa["produktart_impraegnierung-einpflege"], href: paHref("impraegnierung-einpflege") },
          ],
        },
      ],
      footer: [{ label: dict.bereiche.alle_produkte_name, href: `/${lang}/produkte/` }],
    },
    // Neubau + Sanierung zeigen NUR die Bereiche (Achse B). Bereiche mit beiden
    // Projektarten (Industrieboden, Sichtestrich) verlinken in die projektart-
    // gefilterte Sub-Seite; reine Neubau-/Sanierungs-Bereiche auf die Dachseite.
    neubau: {
      items: [
        { label: bt.industrieboden_name, href: `/${lang}/bereiche/industrieboden/neubau/`, sub: bt.industrieboden_teaser },
        { label: bt.sichtestrich_name, href: `/${lang}/bereiche/sichtestrich/neubau/`, sub: bt.sichtestrich_teaser },
        { label: bt.spezialmoertel_name, href: `/${lang}/bereiche/spezialmoertel/`, sub: bt.spezialmoertel_teaser },
      ],
    },
    sanierung: {
      // Final (Steffi 2026-06-22): Industrieboden · Sichtestrich · Infrastruktur ·
      // TW-Behältersanierung · Betonsanierung. KEIN Spezialmörtel (→ Betonsanierung).
      items: [
        { label: bt.industrieboden_name, href: `/${lang}/bereiche/industrieboden/sanierung/`, sub: bt.industrieboden_teaser },
        { label: bt.sichtestrich_name, href: `/${lang}/bereiche/sichtestrich/sanierung/`, sub: bt.sichtestrich_teaser },
        { label: bt.infrastruktur_name, href: `/${lang}/bereiche/infrastruktur/`, sub: bt.infrastruktur_teaser },
        { label: bt.microtop_menu, href: `/${lang}/bereiche/microtop/`, sub: bt.microtop_teaser },
        { label: bt["rapid-set_name"], href: `/${lang}/bereiche/rapid-set/`, sub: bt["rapid-set_teaser"] },
      ],
    },
    kontakt: {
      items: [
        { label: dict.nav.mm_fachberater, href: `/${lang}/kontakt/`, sub: KORODUR_ZENTRALE.telefon },
        { label: dict.nav.mm_formular, href: `/${lang}/kontakt/` },
      ],
    },
  };

  const navItems: { key: string; href: string; label: string; menu: boolean }[] = [
    { key: "portfolio", href: `/${lang}/produkte/`, label: dict.nav.bereiche, menu: true },
    { key: "neubau", href: `/${lang}/neubau/`, label: dict.nav.neubau, menu: true },
    { key: "sanierung", href: `/${lang}/sanierung/`, label: dict.nav.sanierung, menu: true },
    { key: "referenzen", href: `/${lang}/referenzen/`, label: dict.nav.referenzen, menu: false },
    { key: "unternehmen", href: `/${lang}/unternehmen/`, label: dict.nav.unternehmen, menu: false },
    { key: "kontakt", href: `/${lang}/kontakt/`, label: dict.nav.kontakt, menu: true },
  ];

  // Panel-Layout: unter dem Trigger verankert, Kontakt (rechts außen)
  // rechtsbündig → kurze Mauswege (Steffi, 2026-06-13).
  const layout: Record<string, { w: string; cols: string; align: "left" | "right" }> = {
    portfolio: { w: "w-[min(880px,calc(100vw-32px))]", cols: "grid-cols-2 lg:grid-cols-4", align: "left" },
    neubau: { w: "w-[340px]", cols: "grid-cols-1", align: "left" },
    sanierung: { w: "w-[360px]", cols: "grid-cols-1", align: "left" },
    kontakt: { w: "w-[300px]", cols: "grid-cols-1", align: "right" },
  };

  const renderPanel = (key: string) => {
    const m = menus[key];
    const lo = layout[key];
    return (
      <div
        className={`absolute top-full ${lo.align === "right" ? "right-0" : "left-0"} z-50 ${lo.w} bg-white border border-bullet-bg rounded-b-xl shadow-[0_16px_34px_rgba(0,45,89,0.16)] p-3`}
        onMouseEnter={() => openNow(key)}
        onMouseLeave={scheduleClose}
        role="menu"
      >
        {m.clusters ? (
          <div className={`grid ${lo.cols} gap-x-4 gap-y-4`}>
            {m.clusters.map((c) => (
              <div key={c.title}>
                <div className="text-[11px] uppercase tracking-wider text-navy/45 px-2 mb-1.5" style={{ fontWeight: 800 }}>
                  {c.title}
                </div>
                <div className="flex flex-col">
                  {c.items.map((it) => (
                    <Link
                      key={it.label}
                      href={it.href!}
                      className="block rounded-md px-2 py-1.5 text-[13.5px] text-navy no-underline hover:bg-icon-bg hover:text-cyan-text transition-colors duration-150"
                      role="menuitem"
                      style={{ fontWeight: 600 }}
                      onClick={() => setOpenMenu(null)}
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className={`grid ${lo.cols} gap-2`}>
          {(m.items ?? []).map((it) => {
            // Icon aus der /bereiche/<slug>/-href ableiten (zentrale Ikonografie #104)
            const slugMatch = it.href?.match(/\/bereiche\/([^/]+)\//);
            const ItemIcon = slugMatch ? bereichIcon(slugMatch[1]) : null;
            const inner = (
              <>
                <span className="flex items-center gap-2 text-navy text-[14px]" style={{ fontWeight: 700 }}>
                  {ItemIcon && (
                    <AppIcon icon={ItemIcon} width={16} height={16} strokeWidth={2} className="text-cyan-text shrink-0" aria-hidden="true" />
                  )}
                  {it.label}
                  {it.badge && (
                    <span className="text-[10px] rounded-full px-2 py-0.5 bg-white text-navy border border-bullet-bg" style={{ fontWeight: 700 }}>
                      {it.badge}
                    </span>
                  )}
                </span>
                {it.sub && <span className="block text-[12px] text-navy opacity-55 mt-0.5 leading-snug">{it.sub}</span>}
              </>
            );
            const cls = `block rounded-lg p-3 no-underline border transition-colors duration-150 ${
              it.highlight
                ? "bg-navy border-navy [&_*]:!text-white hover:bg-[#013a72]"
                : "bg-icon-bg border-bullet-bg hover:bg-white hover:border-cyan"
            }`;
            return it.href ? (
              <Link key={it.label} href={it.href} className={cls} role="menuitem" onClick={() => setOpenMenu(null)}>
                {inner}
              </Link>
            ) : (
              <div key={it.label} className={`${cls} border-dashed cursor-default`}>
                {inner}
              </div>
            );
          })}
        </div>
        )}
        {m.footer && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 pt-3 border-t border-bullet-bg px-1">
            {m.footer.map((f) => (
              <Link
                key={f.href + f.label}
                href={f.href}
                className="inline-flex items-center gap-1.5 text-cyan-text text-[13px] no-underline hover:underline"
                style={{ fontWeight: 700 }}
                role="menuitem"
                onClick={() => setOpenMenu(null)}
              >
                {f.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header
        className="bg-white border-b border-bullet-bg shrink-0 z-40 sticky top-0"
        role="banner"
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1320, height: 74, padding: "0 24px" }}
        >
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center no-underline shrink-0" aria-label="KORODUR">
            <Image src={withBasePath("/images/brand/logo-korodur.png")} alt="KORODUR" width={82} height={55} priority />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
            onMouseLeave={scheduleClose}
          >
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative h-[74px] flex items-center"
                onMouseEnter={() => (item.menu ? openNow(item.key) : scheduleClose())}
              >
                <Link
                  href={item.href}
                  aria-expanded={item.menu ? openMenu === item.key : undefined}
                  className={`flex items-center gap-1 px-4 py-2.5 rounded-lg text-[16px] no-underline transition-colors duration-150 ${
                    isActive(item.href) || openMenu === item.key ? "text-cyan-text" : "text-navy hover:bg-icon-bg"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  {item.label}
                  {item.menu && (
                    <AppIcon
                      icon={ChevronDown}
                      width={16}
                      height={16}
                      strokeWidth={2.5}
                      className={`transition-transform duration-150 ${openMenu === item.key ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  )}
                </Link>
                {item.menu && openMenu === item.key && renderPanel(item.key)}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
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

            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden p-2 bg-transparent border-none cursor-pointer"
              aria-label={lang === "de" ? "Suchen" : lang === "fr" ? "Rechercher" : lang === "pl" ? "Szukaj" : "Search"}
            >
              <AppIcon icon={Search} width={18} height={18} strokeWidth={2} className="text-navy opacity-50" aria-hidden="true" />
            </button>

            <LanguageSwitcher lang={lang} />

            <a
              href={KORODUR_ZENTRALE.telefonHref}
              className="hidden xl:flex items-center gap-2 text-navy text-[16px] no-underline hover:text-cyan-text transition-colors duration-150"
              style={{ fontWeight: 700 }}
            >
              <AppIcon icon={Phone} width={18} height={18} strokeWidth={2} className="text-cyan-text" aria-hidden="true" />
              {KORODUR_ZENTRALE.telefon}
            </a>

            {/* Lösungsfinder-Button bewusst entfernt (#225): nach Menü/Logo +15 %
                zu eng neben Telefon. Lösungsfinder bleibt über Neubau-/Sanierung-
                Mega-Menü-Footer + Home-Hero erreichbar. */}

            {/* Mobile drawer */}
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

                <div className="flex items-center justify-between p-4 border-b border-bullet-bg">
                  <Link href={`/${lang}`} className="flex items-center no-underline" onClick={() => setMobileOpen(false)} aria-label="KORODUR">
                    <Image src={withBasePath("/images/brand/logo-korodur.png")} alt="KORODUR" width={62} height={42} />
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

                {/* Mobile: Punkte mit Untermenü als Accordion, sonst direkter Link */}
                <nav className="p-2">
                  <Accordion type="multiple" className="w-full">
                    {navItems.map((item) => {
                      const m = item.menu ? menus[item.key] : null;
                      if (!m) {
                        return (
                          <Link
                            key={item.key}
                            href={item.href}
                            className={`block rounded-lg no-underline text-[15px] ${isActive(item.href) ? "text-cyan-text" : "text-navy"}`}
                            style={{ padding: "14px 14px", fontWeight: 700 }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      }
                      return (
                        <AccordionItem key={item.key} value={item.key} className="border-b-0">
                          <AccordionTrigger className="px-3.5 py-3.5 text-[15px] text-navy hover:no-underline" style={{ fontWeight: 700 }}>
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2">
                            <div className="flex flex-col">
                              <Link
                                href={item.href}
                                className="block rounded-lg no-underline text-[14px] text-cyan-text px-6 py-2.5"
                                style={{ fontWeight: 700 }}
                                onClick={() => setMobileOpen(false)}
                              >
                                {lang === "de" ? "Übersicht" : lang === "fr" ? "Aperçu" : lang === "pl" ? "Przegląd" : lang === "es" ? "Resumen" : "Overview"} →
                              </Link>
                              {m.clusters?.map((c) => (
                                <div key={c.title}>
                                  <div className="text-[11px] uppercase tracking-wider text-navy/40 px-6 pt-2.5 pb-1" style={{ fontWeight: 800 }}>
                                    {c.title}
                                  </div>
                                  {c.items.map((it) => (
                                    <Link
                                      key={it.label}
                                      href={it.href!}
                                      className="block rounded-lg no-underline text-[14px] text-navy px-6 py-2"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {it.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              {m.items?.map((it) =>
                                it.href ? (
                                  <Link
                                    key={it.label}
                                    href={it.href}
                                    className="block rounded-lg no-underline text-[14px] text-navy px-6 py-2.5"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {it.label}
                                    {it.badge && <span className="ml-2 text-[11px] text-mid-gray">({it.badge})</span>}
                                  </Link>
                                ) : (
                                  <span key={it.label} className="block text-[14px] text-mid-gray px-6 py-2.5">
                                    {it.label}
                                    {it.badge && <span className="ml-2 text-[11px]">({it.badge})</span>}
                                  </span>
                                )
                              )}
                              {m.footer?.map((f) => (
                                <Link
                                  key={f.href + f.label}
                                  href={f.href}
                                  className="block rounded-lg no-underline text-[14px] text-cyan-text px-6 py-2.5"
                                  style={{ fontWeight: 700 }}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {f.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </nav>

                <div className="px-4 pb-4 pt-2">
                  <Button asChild size="lg" className="w-full h-11 text-[15px]">
                    <Link href={`/${lang}/loesungsfinder/`} onClick={() => setMobileOpen(false)}>
                      {dict.nav.loesungsfinder}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <SearchOverlay lang={lang} dict={dict} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

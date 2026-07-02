import Link from "next/link";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../app/[lang]/dictionaries";
import {
  KORODUR_ZENTRALE,
  SOCIAL_LINKS,
  AUSSCHREIBEN_URL,
} from "../lib/kontaktDaten";
import { AppIcon } from "@/components/ui/icon";
import { ChevronRight, ExternalLink } from "lucide-react";

// Brand-Icons als Inline-SVG (lucide führt keine Marken-Icons mehr).
const SOCIAL_ICON_PATHS: Record<string, string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  YouTube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
};

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  // Footer-Redesign (Steffi 2026-06-25) — schlanke 4-Spalten-Logik:
  // (1) Produktportfolio: nur „Alle Produkte" + „Alle Bereiche" (beide cyan/fett),
  //     keine Einzel-Bereiche mehr → bleibt automatisch mit dem Portfolio synchron.
  // (2) Unternehmen: nur Adresse + Telefon + E-Mail (Unternehmens-Link steht oben in der Nav).
  // (3) Service: Ratgeber (DE) + Referenzen (beide cyan) + Ausschreibungstexte.
  // (4) Social Media ganz rechts. Sub-Zeile unverändert.

  const linkClass =
    "text-white/75 hover:text-white no-underline text-[14px] font-medium transition-colors duration-150 inline-block py-1.5";
  const headingClass = "text-white text-[13px] uppercase tracking-wider mb-3";
  // Scan-Hervorhebung (Steffi #299): zentrale Einstiege cyan + fett.
  const highlightClass =
    "inline-flex items-center gap-1.5 text-cyan hover:text-cyan-hover no-underline text-[14px] py-1.5";

  return (
    <footer className="bg-navy text-white mt-auto">
      {/* Cyan-Akzentlinie */}
      <div className="h-[3px] bg-cyan" aria-hidden="true" />

      <div
        className="mx-auto py-10"
        style={{ maxWidth: 1320, paddingLeft: 32, paddingRight: 32 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-9">
          {/* (1) Produktportfolio — zwei prominente Einstiege (cyan/fett):
              „Alle Produkte" und „Alle Bereiche" (Home-Bereichsgrid). Keine
              Einzel-Bereiche mehr → bleibt mit dem wachsenden Portfolio synchron. */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_bereiche}
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col">
              <li>
                <Link href={`/${lang}/produkte/`} className={highlightClass} style={{ fontWeight: 800 }}>
                  {dict.bereiche.alle_produkte_name}
                  <AppIcon icon={ChevronRight} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/#bereiche`} className={highlightClass} style={{ fontWeight: 800 }}>
                  {dict.footer.alle_bereiche}
                  <AppIcon icon={ChevronRight} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* (2) Unternehmen — Link + Adresse + Kontakt. #430: „Unternehmen" ist
              aus der Top-Nav in den Footer gewandert → hier der Einstieg. */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_unternehmen}
            </h3>
            <div>
              <Link href={`/${lang}/unternehmen/`} className={highlightClass} style={{ fontWeight: 800 }}>
                {dict.nav.unternehmen}
                <AppIcon icon={ChevronRight} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
            <address className="not-italic text-[14px] text-white/70 leading-[1.6]">
              <div>{KORODUR_ZENTRALE.strasse}</div>
              <div>{KORODUR_ZENTRALE.plzOrt}</div>
              <div className="mt-1.5 flex flex-col">
                <a href={KORODUR_ZENTRALE.telefonHref} className={linkClass}>
                  {KORODUR_ZENTRALE.telefon}
                </a>
                <a href={`mailto:${KORODUR_ZENTRALE.email}`} className={linkClass}>
                  {KORODUR_ZENTRALE.email}
                </a>
              </div>
            </address>
          </div>

          {/* (3) Service — Ratgeber (DE) + Referenzen (beide cyan) + Ausschreibungstexte. */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_service}
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col">
              {lang === "de" && (
                <li>
                  <Link href={`/${lang}/ratgeber/`} className={highlightClass} style={{ fontWeight: 800 }}>
                    Ratgeber
                    <AppIcon icon={ChevronRight} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/${lang}/referenzen/`} className={highlightClass} style={{ fontWeight: 800 }}>
                  {dict.nav.referenzen}
                  <AppIcon icon={ChevronRight} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <a
                  href={AUSSCHREIBEN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-1.5`}
                >
                  {dict.footer.ausschreibungen}
                  <AppIcon icon={ExternalLink} width={12} height={12} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* (4) Social Media — ganz rechts. */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_social}
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-2`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={SOCIAL_ICON_PATHS[s.label]} />
                    </svg>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Zeile (Steffi #299: passt, bleibt) */}
      <div className="bg-white/5">
        <div
          className="mx-auto py-4 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ maxWidth: 1320, paddingLeft: 32, paddingRight: 32 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-[17px] tracking-tight" style={{ fontWeight: 900 }}>
              KORODUR
            </span>
            <span
              className="inline-flex items-center rounded-full border border-cyan text-cyan text-[11px] px-2.5 py-0.5"
              style={{ fontWeight: 700 }}
            >
              {dict.footer.jahre_badge}
            </span>
            <span className="text-[13px] text-white/50">
              {dict.footer.tagline}
            </span>
          </div>
          <div className="flex items-center gap-6 text-[14px]">
            <Link
              href={`/${lang}/downloads/`}
              className="text-white/70 hover:text-white no-underline transition-colors duration-150 py-2"
            >
              {dict.footer.downloads}
            </Link>
            <Link
              href={`/${lang}/impressum/`}
              className="text-white/70 hover:text-white no-underline transition-colors duration-150 py-2"
            >
              {dict.footer.impressum}
            </Link>
            <Link
              href={`/${lang}/datenschutz/`}
              className="text-white/70 hover:text-white no-underline transition-colors duration-150 py-2"
            >
              {dict.footer.datenschutz}
            </Link>
            <Link
              href={`/${lang}/agb/`}
              className="text-white/70 hover:text-white no-underline transition-colors duration-150 py-2"
            >
              {dict.footer.agb}
            </Link>
            <Link
              href={`/${lang}/hinweisgebersystem/`}
              className="text-white/70 hover:text-white no-underline transition-colors duration-150 py-2"
            >
              {dict.footer.hinweisgeber}
            </Link>
          </div>
          <div className="text-[13px] text-white/40 text-center md:text-right">
            &copy; {new Date().getFullYear()} KORODUR. {dict.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { LOCALES } from "../lib/i18n";
import type { Dictionary } from "../app/[lang]/dictionaries";
import { bereiche } from "../data/bereiche";
import {
  KORODUR_ZENTRALE,
  IMPRESSUM_URL,
  DATENSCHUTZ_URL,
} from "../lib/kontaktDaten";

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const bereichLabels = dict.bereiche as Record<string, string>;

  const unternehmenLinks = [
    { href: `/${lang}/unternehmen/`, label: dict.nav.unternehmen },
    { href: `/${lang}/referenzen/`, label: dict.nav.referenzen },
    { href: `/${lang}/sanierung/`, label: dict.nav.sanierung },
    { href: `/${lang}/kontakt/`, label: dict.nav.kontakt },
  ];

  const linkClass =
    "text-white/70 hover:text-white no-underline text-[14px] transition-colors duration-150 inline-block py-1.5";
  const headingClass = "text-white text-[14px] uppercase tracking-wider mb-4";

  return (
    <footer className="bg-navy text-white mt-auto">
      {/* Cyan-Akzentlinie */}
      <div className="h-[3px] bg-cyan" aria-hidden="true" />

      <div
        className="mx-auto py-14"
        style={{ maxWidth: 1320, paddingLeft: 32, paddingRight: 32 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* (a) Bereiche */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_bereiche}
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col">
              {bereiche.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/${lang}/bereiche/${b.slug}/`}
                    className={linkClass}
                  >
                    {bereichLabels[`${b.slug}_name`]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* (b) Unternehmen */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_unternehmen}
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col">
              {unternehmenLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* (c) Kontakt */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_kontakt}
            </h3>
            <address className="not-italic text-[14px] text-white/70 leading-[1.7]">
              <div>{KORODUR_ZENTRALE.strasse}</div>
              <div>{KORODUR_ZENTRALE.plzOrt}</div>
              <div className="mt-3 flex flex-col">
                <a href={KORODUR_ZENTRALE.telefonHref} className={linkClass}>
                  {KORODUR_ZENTRALE.telefon}
                </a>
                <a href={`mailto:${KORODUR_ZENTRALE.email}`} className={linkClass}>
                  {KORODUR_ZENTRALE.email}
                </a>
              </div>
            </address>
          </div>

          {/* (d) Sprachen */}
          <div>
            <h3 className={headingClass} style={{ fontWeight: 800 }}>
              {dict.footer.col_sprachen}
            </h3>
            <div className="flex flex-wrap gap-2">
              {LOCALES.map((locale) => (
                <Link
                  key={locale}
                  href={`/${locale}/`}
                  className={`flex items-center justify-center min-w-11 h-11 px-3 rounded-full text-[14px] no-underline transition-colors duration-150 ${
                    locale === lang
                      ? "bg-cyan text-white"
                      : "border border-white/30 text-white/70 hover:border-white hover:text-white"
                  }`}
                  style={{ fontWeight: 700 }}
                  aria-current={locale === lang ? "true" : undefined}
                >
                  {locale.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Zeile */}
      <div className="bg-white/5">
        <div
          className="mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ maxWidth: 1320, paddingLeft: 32, paddingRight: 32 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-[18px] tracking-tight" style={{ fontWeight: 900 }}>
              KORODUR
            </span>
            <span className="text-[13px] text-white/50">
              {dict.footer.tagline}
            </span>
          </div>
          <div className="flex items-center gap-6 text-[14px]">
            <a
              href={IMPRESSUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white no-underline transition-colors duration-150 py-2"
            >
              {dict.footer.impressum}
            </a>
            <a
              href={DATENSCHUTZ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white no-underline transition-colors duration-150 py-2"
            >
              {dict.footer.datenschutz}
            </a>
          </div>
          <div className="text-[13px] text-white/40 text-center md:text-right">
            &copy; {new Date().getFullYear()} KORODUR. {dict.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

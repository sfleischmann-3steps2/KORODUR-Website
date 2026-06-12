// ES seit M3-ES (Steffi 2026-06-12: Spanisch von Beginn an dabei)
export const LOCALES = ["de", "en", "fr", "pl", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

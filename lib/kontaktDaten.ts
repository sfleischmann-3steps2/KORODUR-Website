// Sprachinvariante Kontakt-/Standortdaten (bestätigt Steffi, 2026-06-11:
// zwei Standorte, Firmierung KORODUR International GmbH).
// Lokalisierte Labels kommen aus den Dictionaries (kontakt.*, unternehmen.*).

export const KORODUR_FIRMA = "KORODUR International GmbH";

export const KORODUR_ZENTRALE = {
  ort: "Amberg",
  strasse: "Wernher-von-Braun-Str. 4",
  plzOrt: "92224 Amberg",
  telefon: "+49 (0) 9621 47 59-0",
  telefonHref: "tel:+49962147590",
  fax: "+49 (0) 9621 32 341",
  email: "info@korodur.de",
} as const;

export const KORODUR_WERK_BOCHUM = {
  name: "Bochum-Wattenscheid",
  strasse: "Hohensteinstr. 19",
  plzOrt: "44866 Bochum",
  telefon: "+49 (0) 23 27 94 57-0",
  telefonHref: "tel:+49232794570",
  fax: "+49 (0) 23 27 32 10 84",
  email: "info@korodur.de",
} as const;

/** Social-Media-Profile (Quelle: korodur.de-Footer, live geprüft 2026-06-11).
 *  Weitere Kanäle sind im Aufbau und werden hier ergänzt. */
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/korodur-international-gmbh" },
  { label: "YouTube", href: "https://www.youtube.com/user/KORODUR" },
] as const;

/** Ausschreibungskatalog. PLATZHALTER: korrekter Katalog-Deeplink folgt (Steffi). */
export const AUSSCHREIBEN_URL = "https://www.ausschreiben.de";

/** Rechtliches: bis zum Cutover auf die bestehenden Seiten der Alt-Site. */
export const IMPRESSUM_URL = "https://www.korodur.de/impressum/";
export const DATENSCHUTZ_URL = "https://www.korodur.de/datenschutz/";

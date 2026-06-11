// Sprachinvariante Kontakt-/Standortdaten (Quelle: korodur.de-Scrape,
// 01_analyse/scraped_content/unternehmen_content.md, Stand 2026-04-13).
// Lokalisierte Labels kommen aus den Dictionaries (kontakt.*, unternehmen.*).

export const KORODUR_ZENTRALE = {
  firmen: [
    "KORODUR Westphal Hartbeton GmbH & Co. KG",
    "KORODUR International GmbH",
  ],
  strasse: "Wernher-von-Braun-Str. 4",
  plzOrt: "92224 Amberg",
  telefon: "+49 9621 4759-0",
  telefonHref: "tel:+49962147590",
  email: "info@korodur.de",
} as const;

export const KORODUR_WERK_BOCHUM = {
  name: "Bochum-Wattenscheid",
  strasse: "Hohensteinstr. 19",
  plzOrt: "44866 Bochum",
  telefon: "+49 2327 9457-0",
  telefonHref: "tel:+49232794570",
} as const;

/** Weitere Produktionsstandorte (Quelle nennt nur Ortsnamen, keine Adressen). */
export const KORODUR_WEITERE_WERKE = ["Schwarzenfeld/Bayern", "Hannover-Misburg"] as const;

/** Rechtliches: bis zum Cutover auf die bestehenden Seiten der Alt-Site. */
export const IMPRESSUM_URL = "https://www.korodur.de/impressum/";
export const DATENSCHUTZ_URL = "https://www.korodur.de/datenschutz/";

// Fachberater Deutschland + International.
// Quelle: korodur.de/kontakt/deutschland + /international (Wayback 2026-01-03,
// E-Mails aus data-cfemail dekodiert) — Übernahme des kompletten Alt-Site-
// Personenkreises freigegeben von Steffi, 2026-06-12. Porträts: benannte
// Alt-Site-Dateien aus dem Archiv-Spiegel (public/images/fachberater/).
// E-Mail-Format: [Initiale][Nachname]@korodur.de OHNE Punkt (bestätigt Steffi
// 2026-06-14, gilt für ALLE Berater; die Alt-Site zeigt teils gepunktete
// Anzeigeformen, die echten Aliase sind ohne Punkt).
// Porträts neu aus benannten Master-Fotos konvertiert (#187, 2026-06-16,
// Quelle Documents/Claude/Projects/Bilder_mit_namen/, sharp → 320×320 webp).
// 2026-06-17: alle Porträts aus dem AD-Master-Satz (Master-Fotos liegen unter
// ../_quellen/Bilder_AD_mit_namen/, einfarbiger Hintergrund) neu generiert — einheitlicher Square-Downscale
// (fixt Jens-Döring-Zuschnitt). Jens Lang jetzt mit Master (Jens Lang.png),
// kein Alt-Site-Bild mehr. SW-Cache korodur-v6 erzwingt das Nachladen
// (Bild-Dateinamen sind nicht content-gehasht → cache-first hielt Altbilder).

import type { Produktbereich } from "./types";

export interface Fachberater {
  name: string;
  /** Rollenbezeichnung wie publiziert (sprachinvariant). */
  rolle: string;
  /** Zuständigkeit (PLZ-Gebiete o. Ä.), sprachinvariant. */
  gebiet?: string;
  telefon: string;
  telefonHref: string;
  email: string;
  /** Porträt unter public/images/fachberater/, ohne basePath. */
  bild?: string;
  /** Bereichs-Zuordnung für Funnel-Karten (Produkt-/Bereichsseiten, Lösungsfinder). */
  bereiche: Produktbereich[];
}

export const FACHBERATER_DE: Fachberater[] = [
  {
    name: "Jens Döring",
    rolle: "Technische Vertriebsberatung Industrieboden & Rapid Set",
    gebiet: "PLZ 01–19, 38–39, 98–99",
    telefon: "+49 (0) 9621 4759-0",
    telefonHref: "tel:+49962147590",
    email: "jdoering@korodur.de",
    bild: "/images/fachberater/j-doering.webp",
    // Nachfolger von Thomas Gerhard (Steffi 2026-06-14, Quelle korodur.de/fachberater).
    bereiche: ["industrieboden", "rapid-set"],
  },
  {
    name: "Benjamin Lorenz",
    rolle: "Technische Vertriebsberatung Trinkwasser / MICROTOP",
    telefon: "+49 (0) 170 3733988",
    telefonHref: "tel:+491703733988",
    email: "blorenz@korodur.de",
    bild: "/images/fachberater/benjamin-lorenz.webp",
    bereiche: ["microtop"],
  },
  {
    name: "Andreas Mohr",
    rolle: "Technische Vertriebsberatung Industrieboden",
    gebiet: "PLZ 20–29, 30–33, 37, 48–49",
    telefon: "+49 (0) 172 1480115",
    telefonHref: "tel:+491721480115",
    email: "amohr@korodur.de",
    bild: "/images/fachberater/andreas-mohr.webp",
    bereiche: ["industrieboden"],
  },
  {
    name: "Jens Sackmann",
    rolle: "Technische Vertriebsberatung Rapid Set",
    gebiet: "PLZ 20–29",
    telefon: "+49 (0) 170 3733983",
    telefonHref: "tel:+491703733983",
    email: "jsackmann@korodur.de",
    bild: "/images/fachberater/jens-sackmann.webp",
    bereiche: ["rapid-set"],
  },
  {
    name: "André Grahn",
    rolle: "Technische Vertriebsberatung Rapid Set",
    gebiet: "PLZ 30–33, 37, 40–49, 50–53, 57–59",
    telefon: "+49 (0) 170 3733979",
    telefonHref: "tel:+491703733979",
    email: "agrahn@korodur.de",
    bild: "/images/fachberater/andre-grahn.webp",
    bereiche: ["rapid-set"],
  },
  {
    name: "Erik Schumacher",
    rolle: "Technische Vertriebsberatung Industrieboden",
    gebiet: "PLZ 34–36, 54–56, 60–69, 70–79",
    telefon: "+49 (0) 172 1480132",
    telefonHref: "tel:+491721480132",
    email: "eschumacher@korodur.de",
    bild: "/images/fachberater/erik-schumacher.webp",
    bereiche: ["industrieboden"],
  },
  {
    name: "Jens Lang",
    rolle: "Technische Vertriebsberatung Rapid Set",
    gebiet: "PLZ 34–36, 54–56, 60–79, 86–89",
    telefon: "+49 (0) 170 3733985",
    telefonHref: "tel:+491703733985",
    email: "jlang@korodur.de",
    bild: "/images/fachberater/jens-lang.webp",
    bereiche: ["rapid-set"],
  },
  {
    name: "Daniel May",
    rolle: "Technische Vertriebsberatung Industrieboden & Rapid Set",
    gebiet: "PLZ 80–89, 94",
    telefon: "+49 (0) 172 1480125",
    telefonHref: "tel:+491721480125",
    email: "dmay@korodur.de",
    bild: "/images/fachberater/daniel-may.webp",
    bereiche: ["industrieboden", "rapid-set"],
  },
  {
    name: "Francesco Palese",
    rolle: "Technische Vertriebsberatung Industrieboden & Rapid Set",
    gebiet: "PLZ 90–93, 95–97",
    telefon: "+49 (0) 172 1480128",
    telefonHref: "tel:+491721480128",
    email: "fpalese@korodur.de",
    bild: "/images/fachberater/francesco-palese.webp",
    bereiche: ["industrieboden", "rapid-set"],
  },
];

/** Internationale Fachberater (korodur.de/kontakt/international, Wayback 2026-01-03).
 *  Rollenbezeichnungen sind dort englisch publiziert und bleiben sprachinvariant. */
export const FACHBERATER_INTERNATIONAL: Fachberater[] = [
  {
    name: "Alexander Pröls",
    rolle: "Director of Export",
    telefon: "+49 (0) 172 1480124",
    telefonHref: "tel:+491721480124",
    email: "export@korodur.de",
    bild: "/images/fachberater/alexander-proels.webp",
    bereiche: [],
  },
  {
    name: "Mirko Schlicht",
    rolle: "Key Account Manager International",
    telefon: "+49 (0) 170 3733981",
    telefonHref: "tel:+491703733981",
    email: "export@korodur.de",
    bild: "/images/fachberater/mirko-schlicht.webp",
    bereiche: [],
  },
  {
    name: "Daniel May",
    rolle: "Regional Sales Manager Poland",
    telefon: "+49 (0) 172 1480125",
    telefonHref: "tel:+491721480125",
    email: "dmay@korodur.de",
    bild: "/images/fachberater/daniel-may.webp",
    bereiche: [],
  },
  {
    name: "Francesco Palese",
    rolle: "Regional Sales Manager Italy",
    telefon: "+49 (0) 172 1480128",
    telefonHref: "tel:+491721480128",
    email: "fpalese@korodur.de",
    bild: "/images/fachberater/francesco-palese.webp",
    bereiche: [],
  },
];

/** Allgemeine Export-Ansprechpartner (länderunabhängig) — Fallback für alle
 *  Nicht-DE-Sprachen ohne eigenen Länder-Manager. */
const EXPORT_ALLGEMEIN = ["Alexander Pröls", "Mirko Schlicht"];

/** Länder-Manager je App-Sprache, vor die allgemeinen Export-Kontakte gereiht.
 *  Aktuell nur PL (Daniel May); IT-Manager ohne aktive App-Sprache. */
const EXPORT_NACH_SPRACHE: Record<string, string[]> = {
  pl: ["Daniel May"], // Regional Sales Manager Poland
};

/** Fachberater für einen Produktbereich (Funnel-Karten auf Produkt-/Bereichs-
 *  seiten und Lösungsfinder-Ergebnis).
 *
 *  - `de`: bereichsspezifische DE-Berater (PLZ-Zuständigkeit).
 *  - sonst: internationale Export-Kontakte. Diese tragen kein Bereichs-Mapping
 *    (`bereiche: []`), daher greift hier KEIN Bereichsfilter — international
 *    sind Export/KAM die Ansprechpartner, optional ein Länder-Manager zuerst.
 *    Behebt #186 (Inline-CTAs zeigten international fälschlich DE-Berater). */
// #232: Bereiche ohne eigene Berater erben das Mapping eines fachlich
// verwandten Bereichs (keine Daten-Duplizierung, Intention explizit).
// Katzenstreu hat bewusst KEIN Alias — dort rendert die Bereichsseite einen
// generischen Kontaktblock ohne Foto.
const BEREICH_BERATER_ALIAS: Partial<Record<Produktbereich, Produktbereich>> = {
  sichtestrich: "industrieboden",
  spezialmoertel: "rapid-set",
  // #306/#308: Infrastruktur (Sanierung Verkehrsflächen) erbt Rapid-Set-Beratung.
  infrastruktur: "rapid-set",
  // #320: Sammelbereich Betonsanierung erbt die Rapid-Set-/Betonsanierungs-
  // Berater (Berater-Daten bleiben unter dem Schlüssel "rapid-set").
  betonsanierung: "rapid-set",
};

export function fachberaterFuerBereich(
  bereich: Produktbereich,
  lang: string = "de",
): Fachberater[] {
  const effektiverBereich = BEREICH_BERATER_ALIAS[bereich] ?? bereich;
  if (lang === "de") {
    // DE: bereichsspezifische Berater + immer die internationalen Export-Kontakte
    // (Alexander + Mirko) für AT/CH & Export — in allen Bereichen (#412).
    const out: Fachberater[] = FACHBERATER_DE.filter((b) => b.bereiche.includes(effektiverBereich));
    for (const name of EXPORT_ALLGEMEIN) {
      const b = FACHBERATER_INTERNATIONAL.find((x) => x.name === name);
      if (b && !out.some((x) => x.name === b.name)) out.push(b);
    }
    return out;
  }
  const namen = [...(EXPORT_NACH_SPRACHE[lang] ?? []), ...EXPORT_ALLGEMEIN];
  const out: Fachberater[] = [];
  for (const name of namen) {
    const b = FACHBERATER_INTERNATIONAL.find((x) => x.name === name);
    if (b && !out.some((x) => x.name === b.name)) out.push(b);
  }
  return out;
}

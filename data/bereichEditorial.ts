// === Datengetriebenes Rich-Bereich-Editorial (V1-Scope §11, #377/#378/#347) ===
//
// Ein generalisiertes Editorial-Modell statt hartverdrahteter Bespoke-Komponenten
// je Bereich (Muster: RapidSetMarke/BetonsanierungBereich, aber datengetrieben).
// Wird von der Editorial-Sektion (components/BereichEditorialSektion.tsx) auf der
// Bereichs-Dachseite bzw. den Neubau/Sanierung-Unterseiten gerendert.
//
// Quelle: Alt-korodur.de-Marketingprosa (docs/content-quellen/bereich-prosa/*),
// live = faktisch abgenommen, verbatim-lift-fähig (Reuse-Governance V1-Scope §10).
// In Wir-Form, ohne Personen/Kundenlogos im Fließtext (Referenzen laufen über die
// Referenzdatenbank), ohne Em-Dash. Produktclaims/Kennwerte bleiben bewusst außen
// vor (TDS-/Notion-Track). DE-Basis; EN/FR/PL/ES-Übersetzung Follow-up (#181).

export interface EditorialAbschnitt {
  titel: string;
  text: string;
}

export interface EditorialListe {
  titel: string;
  items: string[];
}

export interface BereichEditorial {
  /** Übergreifende Editorial-Absätze (Dachseite + beide Projektart-Unterseiten). */
  abschnitte?: EditorialAbschnitt[];
  /** Einsatzbereiche/Anwendungen als Chip-Liste. */
  einsatzbereiche?: EditorialListe;
  /** Produktkategorien-Kurzprofile (Titel + Satz). */
  kategorien?: EditorialAbschnitt[];
  /** Projektart-spezifische Absätze (nur Bereiche mit Neubau/Sanierung-Unterseiten). */
  neubau?: EditorialAbschnitt[];
  sanierung?: EditorialAbschnitt[];
  /** „In Vorbereitung": zeigt einen ehrlichen Emerging-Status statt Produktkatalog. */
  inVorbereitung?: { kicker: string; text: string };
}

export const BEREICH_EDITORIAL: Record<string, BereichEditorial> = {
  // --- Industrieboden (#377): Editorial auf den zwei Unterseiten; kein Dach-Split. ---
  industrieboden: {
    abschnitte: [
      {
        titel: "Härte, die sich rechnet",
        text: "Der härteste und widerstandsfähigste Industrieboden ist langfristig immer die beste und wirtschaftlichste Lösung. Unsere KORODUR Industrieböden werden diesen hohen Anforderungen gerecht, als Resultat kontrollierter Qualität und Kontinuität. Über 750 Mio. m² verlegte Fläche sind die beste Referenz.",
      },
      {
        titel: "Nachhaltig über den gesamten Lebenszyklus",
        text: "Ein Hartstoffindustrieboden besitzt eine enorme Langlebigkeit. Seine Lebensdauer liegt um ein Vielfaches höher als bei einem reinen Betonboden oder alternativen Systemen. Über die gesamten Lebenszykluskosten eines Industriegebäudes betrachtet steigern hochwertige Produkte die Energie- und Ressourceneffizienz und schonen natürliche Ressourcen.",
      },
    ],
    neubau: [
      {
        titel: "Industrieboden im Neubau",
        text: "Im Neubau planen wir den Bodenaufbau von Anfang an auf die spätere Beanspruchung. Ob als eingestreuter KORODUR Hartstoff oder als NEODUR Hartstoff-Verbundestrich, unsere Systeme sind in allen industriellen Bereichen und Branchen einsetzbar: Fabrikations- und Lagerhallen, Hochregallager, Distributionszentren, Werkstätten, Kühlhäuser, Parkhäuser und Rampen, innen und außen.",
      },
    ],
    sanierung: [
      {
        titel: "Industrieboden in der Sanierung",
        text: "Bestehende Industrieböden setzen wir dauerhaft instand, oft im laufenden Betrieb. Schnell belastbare Hartstoff-Verbundestriche und selbstverlaufende Systeme stellen die geforderte Verschleißfestigkeit wieder her, ohne dass die Fläche lange gesperrt bleibt.",
      },
    ],
  },

  // --- Spezialmörtel (#378): Intro ausbauen + Produktkategorien. ---
  spezialmoertel: {
    abschnitte: [
      {
        titel: "Mörtel mit Geschichte, Qualität aus dem Werk",
        text: "Vor rund 2000 Jahren entwickelten die Römer ein Gemisch aus Bruchstein, Bindemittel und Wasser. Seitdem gehören Mörtel zu den wichtigsten Baustoffen. Mit unseren mineralischen Werk-Trockenmörteln bieten wir eine Fülle von Lösungen für die perfekte Optik und langfristige Haltbarkeit von Bauteilen und Bauwerken.",
      },
      {
        titel: "Kontrollierte Qualität, einfache Verarbeitung",
        text: "Unsere Spezialmörtel vereinen ausgewählte, natürliche und umweltfreundliche Rohstoffe mit den Vorzügen einer kontrollierten Produktion im Werk. Als Werktrockenmörtel im Silo oder als Sackware brauchen sie auf der Baustelle nur noch mit Wasser vermischt zu werden.",
      },
    ],
    einsatzbereiche: {
      titel: "Einsatzbereiche",
      items: [
        "Montage- und Fertigteilbau",
        "Berg- und Tunnelbau",
        "Brücken- und Straßenbau",
        "Betoninstandsetzung und Betonkosmetik",
        "Kanal- und Abwasserbau",
        "Pflasterbau",
        "Natursteinrestaurierung",
      ],
    },
    kategorien: [
      {
        titel: "Montage- und Vergusssystem",
        text: "Montage- und Vergussmörtel verbinden Beton kraftschlüssig und hohlraumfrei mit Stahleinbauteilen und Fertigteilen, vom Schnellverguss bis zum hochfesten Vergussbeton für große Querschnitte.",
      },
      {
        titel: "Pflasterfugenmörtel",
        text: "Mineralische Fugenmörtel für die Verfugung von Pflaster- und Plattenflächen, vom fix und fertigen 1-K-Mörtel für Fußgängerbereiche bis zum zementgebundenen Mörtel für die befahrbare, starre Bauweise.",
      },
    ],
  },

  // --- 3D-Betondruck (#347): ehrlicher „In Vorbereitung"-Zustand, kein Katalog. ---
  "3d-concrete-printing": {
    abschnitte: [
      {
        titel: "save time. save cost. be sustainable.",
        text: "Als Hersteller zementärer Produkte seit 1936 haben wir früh erkannt, dass der 3D-Betondruck eine faszinierende Technologie für uns alle darstellt.",
      },
      {
        titel: "Unsere Mission",
        text: "Wir treiben die 3D-Betondrucktechnologie voran, um eine nachhaltige und bezahlbare Entwicklung in der Bauindustrie weltweit zu ermöglichen. Gemeinsam mit unserem Partner CyBe teilen wir unser Know-how und unsere Materialtechnologie und unterstützen unsere Kunden in allen Phasen des Prozesses.",
      },
    ],
    inVorbereitung: {
      kicker: "In Vorbereitung",
      text: "Wir bereiten den Auftritt dieses Bereichs gerade auf. Für Projekte und Materialtechnologie rund um den 3D-Betondruck sprechen Sie uns direkt an.",
    },
  },
};

export function bereichEditorial(slug: string): BereichEditorial | undefined {
  return BEREICH_EDITORIAL[slug];
}

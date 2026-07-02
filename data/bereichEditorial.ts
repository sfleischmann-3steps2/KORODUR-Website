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

/** Use-Case-Vorsortierung (#438): kuratierte Einstiege VOR den Produktgruppen.
 *  `system` = der Systemweg (Alt-Site-Terminologie), `href` = Pfad nach /<lang>/. */
export interface EditorialUseCase {
  titel: string;
  system: string;
  text: string;
  href: string;
}

/** Normen-Kompetenzblock (#438): kurze, produktclaim-freie Norm-Profile. */
export interface EditorialNormen {
  titel: string;
  intro?: string;
  items: { norm: string; text: string }[];
}

/** Ratgeber-Teaser (DE-only wie die Fachartikel selbst, #181). */
export interface EditorialRatgeberLink {
  href: string;
  titel: string;
  text: string;
}

/** Projektart-Editorial (#438/#439): Rich-Bausteine je Neubau/Sanierung-Unterseite. */
export interface ProjektartEditorial {
  abschnitte?: EditorialAbschnitt[];
  useCases?: { titel: string; items: EditorialUseCase[] };
  normen?: EditorialNormen;
  ratgeber?: { titel: string; items: EditorialRatgeberLink[] };
  /** Anwendungsmatrix auf dieser Unterseite einbetten (Steffi 01.07.:
   *  Zuhause der Matrix = Industrieboden-Sanierung; Neubau-Variante folgt). */
  anwendungsmatrix?: boolean;
}

export interface BereichEditorial {
  /** Übergreifende Editorial-Absätze (Dachseite + beide Projektart-Unterseiten). */
  abschnitte?: EditorialAbschnitt[];
  /** Einsatzbereiche/Anwendungen als Chip-Liste. */
  einsatzbereiche?: EditorialListe;
  /** Produktkategorien-Kurzprofile (Titel + Satz). */
  kategorien?: EditorialAbschnitt[];
  /** Projektart-spezifische Rich-Bausteine (nur Bereiche mit Neubau/Sanierung-Unterseiten). */
  neubau?: ProjektartEditorial;
  sanierung?: ProjektartEditorial;
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
    neubau: {
      abschnitte: [
        {
          titel: "Industrieboden im Neubau",
          text: "Im Neubau planen wir den Bodenaufbau von Anfang an auf die spätere Beanspruchung. Ob als eingestreuter KORODUR Hartstoff oder als NEODUR Hartstoff-Verbundestrich, unsere Systeme sind in allen industriellen Bereichen und Branchen einsetzbar: Fabrikations- und Lagerhallen, Hochregallager, Distributionszentren, Werkstätten, Kühlhäuser, Parkhäuser und Rampen, innen und außen.",
        },
      ],
    },
    // --- Sanierung (#438): Rich-Ausbau. Prosa verbatim-nah aus der Alt-Site-
    // Unterseite Industriebodensanierung (docs/content-quellen/scrape-extrakt/
    // industrieboden-1.md, Reuse-Governance V1-Scope §10). Zeitangaben HE 60
    // rapid = Alt-Site + produkte.ts konsistent („3 h begehbar / 24 h nutzbar");
    // der offene 48-h-Referenzkonflikt liegt bei Frank (Konzept-Doc §C1). ---
    sanierung: {
      abschnitte: [
        {
          titel: "Industrieboden in der Sanierung",
          text: "Bestehende Industrieböden setzen wir dauerhaft instand, oft im laufenden Betrieb. Schnell belastbare Hartstoff-Verbundestriche und selbstverlaufende Systeme stellen die geforderte Verschleißfestigkeit wieder her, ohne dass die Fläche lange gesperrt bleibt.",
        },
        {
          titel: "Erneuerung nach Jahren härtester Beanspruchung",
          text: "Industrieböden sind tagtäglich enormen Belastungen ausgesetzt und zählen zu den am stärksten beanspruchten Bauteilen eines Industriebaus. Nach jahrelanger intensiver mechanischer Beanspruchung braucht auch der beste Industrieboden eine Erneuerung. Unternehmer und Bauherren fordern nicht nur beim Neubau, sondern auch bei Umbau und Sanierung langfristiges und wirtschaftliches Planen.",
        },
        {
          titel: "Planbare Sperrzeit statt Stillstand",
          text: "Zeitlicher Rahmen, wirtschaftliche Bedingungen, Belastungsprofil und bauseitige Rahmenbedingungen variieren von Projekt zu Projekt. Deshalb reichen unsere Sanierungswege vom klassischen Hartstoffestrich im Verbund bis zum Schnellestrich, der nach 3 Stunden begehbar und nach 24 Stunden nutzbar ist. So bleibt die Sperrzeit planbar, oft über ein Wochenende.",
        },
      ],
      useCases: {
        titel: "Welcher Sanierungsweg passt?",
        items: [
          {
            titel: "Höchste Beanspruchung, dauerhaft",
            system: "System KORODUR-KOROTAN",
            text: "Zementgebundener KORODUR Hartstoffestrich, einschichtig im Verbund mit Haftbrücke auf erhärtetem Tragbeton, Nenndicke 15 mm, weitgehend fugenlos. Die wirtschaftliche Lösung für dauerhafte, nachhaltige Nutzung.",
            href: "produkte/system-korodur-korotan",
          },
          {
            titel: "Schnelle Wiederinbetriebnahme",
            system: "System NEODUR HE 60 rapid",
            text: "Volumenstabiler Schnellestrich mit KORODUR Hartstoffen gemäß DIN 1100, Einbaudicke ab 10 mm, für höchste Beanspruchung innen und außen. Nach 3 Stunden begehbar, nach 24 Stunden nutzbar.",
            href: "produkte/neodur-he-60-rapid",
          },
          {
            titel: "Dünnschichtig ausgleichen und beschichten",
            system: "System NEODUR Level",
            text: "Selbstverlaufender, polymermodifizierter, schnellerhärtender Industriebodenbelag für Schichtdicken von 4 bis 30 mm. Höchst fließfähig, pumpbar, früh begehbar und hoch belastbar.",
            href: "produkte/neodur-level",
          },
        ],
      },
      normen: {
        titel: "Normkompetenz: die Grundlagen unserer Systeme",
        intro: "Jeder KORODUR Sanierungsweg ist in den einschlägigen Normen zu Hause. Die wichtigsten im Überblick:",
        items: [
          {
            norm: "DIN 18560-7",
            text: "Hochbelastbare Industrieböden bestehen nach DIN 18560-7 aus einer definierten Verschleißschicht mit mineralischen Hartstoffen. Beanspruchungsgruppen und Nenndicken legt die Norm fest.",
          },
          {
            norm: "DIN 1100",
            text: "Regelt die mineralischen Hartstoffe der Gruppen A, M und KS, die Basis für Verschleißwiderstand und Oberflächenhärte unserer Böden.",
          },
          {
            norm: "DIN EN 13813",
            text: "Die Materialnorm für Estrichmörtel: Druckfestigkeit (C), Biegezugfestigkeit (F) und Verschleißwiderstand (A) klassifizieren jedes unserer Estrichsysteme.",
          },
          {
            norm: "DIN EN 1504-3",
            text: "Instandsetzung von Betontragwerken mit Reparaturmörteln der Klassen R2 bis R4, relevant, wenn der Untergrund vor der Bodensanierung reprofiliert werden muss.",
          },
        ],
      },
      ratgeber: {
        titel: "Sanierung planen: Ratgeber",
        items: [
          {
            href: "ratgeber/sperrzeit-belastbarkeit",
            titel: "Sperrzeit und Wiederinbetriebnahme",
            text: "Wie lange Ihre Fläche steht, planbar gemacht.",
          },
          {
            href: "schadensbilder",
            titel: "Schadensbild erkennen",
            text: "Fünf typische Schadensbilder und die passende Sanierung.",
          },
          {
            href: "ratgeber/betreiber-faq",
            titel: "Häufige Fragen",
            text: "Antworten rund um die Industriebodensanierung.",
          },
        ],
      },
      anwendungsmatrix: true,
    },
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

// === Betonsanierungs-Bereichsseite: redaktioneller Content (DE-Basis) ===
// Umbau Rapid-Set-Seite → Betonsanierungs-Sammelbereich (#320, 2026-06-30).
// Hybrid-Struktur (Entscheidung Steffi 2026-06-30): markenneutrales Dach +
// zwei Lösungs-Tracks (Track 1 = Rapid Set, Track 2 = NEODUR-Instandsetzung).
// Löst die bisherige reine Rapid-Set-Markenseite (data/rapidSetContent.ts) ab.
//
// Quellen: docs/content-quellen/{konzept/betonsanierung.md, bereich-prosa/
// rapid-set.de.md, scrape-extrakt/spezialbaustoffe.md} + data/produkte.ts +
// TDS. Konzept-Spec docs/specs/2026-06-30-bereichsseiten-konzept-rework.md.
//
// Wie die Ratgeber-Artikel zunächst DE-only; EN/FR/PL/ES rendern weiter das
// generische Bereichs-Template (i18n-Follow-up → #181).
//
// Content-Standing-Rules: keine Personen/Testimonials, keine Kundenlogos.
// Verbatim-Slogans aus den Live-/Quell-Unterlagen. Die zuvor faktencheck-
// pflichtigen Werte (CO₂ ~30 %, Lebensdauer bis 4×, Brandklasse A1) sind
// freigegeben (Steffi 2026-06-30); das optionale faktencheck-Flag bleibt als
// Mechanismus für künftige, noch ungesicherte Werte erhalten.

/** Icon-Schlüssel → in components/BetonsanierungBereich.tsx auf lucide gemappt. */
export type BetonIcon =
  | "timer"
  | "layers"
  | "droplets"
  | "shield"
  | "leaf"
  | "recycle"
  | "flame"
  | "wrench"
  | "spray"
  | "anchor"
  | "grid";

export interface BetonVorteil {
  icon: BetonIcon;
  kicker: string;
  titel: string;
  text: string;
}

export interface BetonAnwendung {
  label: string;
  sublabel: string;
  /** Referenz-Slug: liefert Bild + Verlinkung (Single Source = data/referenzen.ts). */
  referenzSlug: string;
}

export interface BetonTrack2Gruppe {
  /** produktgruppe-Key (matcht data/produkte.ts + dict gruppe_<key>). */
  gruppe: string;
  label: string;
  intro: string;
  /** Produktnamen (nur Anzeige; Quelle der Wahrheit bleibt das Portfolio-Modul). */
  produkte: string[];
}

export const BETONSANIERUNG_CONTENT = {
  // --- Hero (Dach, markenneutral) --------------------------------------
  hero: {
    kicker: "Betonsanierung",
    h1: ["Beton instand setzen.", "Schnell wieder belastbar."],
    sub: "Mineralische Reparatur- und Instandsetzungssysteme für Boden, Wand und Decke, innen und außen.",
    lead:
      "Geschädigte Betonflächen schnell, dauerhaft und rein mineralisch instand setzen, oft im laufenden Betrieb. Zwei Lösungslinien decken die ganze Aufgabe ab: die schnellabbindende Rapid Set Technologie für minimale Sperrzeiten und das NEODUR-Instandsetzungssystem aus Spritzmörtel, Verguss und Pflasterfugenmörtel. Betoninstandsetzung im Rahmen der EN 1504.",
    chips: ["rein mineralisch", "innen & außen", "im laufenden Betrieb"],
  },

  // --- Problem / Nutzenversprechen (Dach) ------------------------------
  problem: {
    kicker: "Warum schnell sanieren",
    headline: "Jede Stunde Sperrzeit ist teuer.",
    lead:
      "Gesperrte Verkehrsflächen, stillstehende Produktion, fehlende Mieteinnahmen, verpasste Übergabetermine. Im Bestand entscheidet nicht das billigste Material, sondern wie schnell die Fläche wieder trägt und wie dauerhaft die Instandsetzung hält.",
    downtime: [
      "Verkehrsflächen, die unter laufendem Betrieb instand gesetzt werden müssen",
      "Produktions- und Hallenböden, bei denen jede Schicht Stillstand zählt",
      "Parkdecks und Tiefgaragen mit Mietausfall pro Sperrtag",
      "Termindruck, wenn das Folgegewerk schon wartet",
    ],
    payoff:
      "Mit schnell erhärtenden, mineralischen Systemen wird im laufenden Betrieb saniert. Teams liefern zeitoptimiert ab, und es geht sofort weiter.",
  },

  // --- Typische Sanierungsanlässe (Dach, Orientierung ohne Norm-Claims) -
  anlaesse: {
    kicker: "Typische Sanierungsanlässe",
    headline: "Welches Schadensbild haben Sie?",
    items: [
      "Risse & Kantenausbrüche",
      "Abplatzungen & Fehlstellen",
      "Reprofilierung von Wand & Decke",
      "Verguss & Verankerung",
      "Pflaster- & Fugensanierung",
      "Verkehrsflächen unter Betrieb",
    ],
  },

  // =====================================================================
  // TRACK 1 — Rapid Set (schnellste Wiederherstellung)
  // =====================================================================
  track1: {
    badge: "Lösungslinie 1",
    headline: "Rapid Set — schnellste Wiederherstellung",
    lead:
      "Die schnellabbindende Rapid Set Zement-Technologie: ein multifunktionaler Werkstoff, nach rund einer Stunde belastbar. Seit über 50 Jahren in den USA bewährt, exklusiv durch uns in Europa erhältlich.",
    sub: "Rapid Set. schnell. einfach. einzigartig.",
    chips: ["belastbar nach 1 Stunde", "ein Material, viele Anwendungen", "ohne schwere Maschinerie"],

    // Teaser-Tiefe: nur die 3 Kernvorteile. Die volle Markengeschichte
    // (Leitmotiv, BCSA-Technologie, Epoxid-Abgrenzung, Trust) lebt auf der
    // eigenen Rapid-Set-Marken-Seite /bereiche/rapid-set/ (#320).
    vorteile: [
      {
        icon: "timer",
        kicker: "Schnell belastbar",
        titel: "Nach rund einer Stunde wieder im Einsatz",
        text:
          "Erstarrungsbeginn nach ca. 15 Minuten, belastbar nach ca. 60 Minuten. CEMENT ALL erreicht bereits nach 60 Minuten über 20 N/mm² Druckfestigkeit. Verkehrsflächen sind oft schon nach zwei Stunden wieder befahrbar.",
      },
      {
        icon: "layers",
        kicker: "Multifunktional",
        titel: "Ein Material für viele Aufgaben",
        text:
          "Boden, Wand und Decke, innen und außen, auch in Nassbereichen. Konsistenz frei wählbar von steif bis fließfähig, Einbaustärken von nahezu 0 bis 600 mm über die Produktfamilie. Wenige Produkte für viele Anwendungen.",
      },
      {
        icon: "droplets",
        kicker: "Einfache Verarbeitung",
        titel: "Ohne schwere Maschinerie, ohne Haftbrücke",
        text:
          "Einfach mit Wasser anmischen, direkt verarbeiten, Werkzeug nur mit Wasser reinigen. Kein Haftvermittler nötig, denn Wasser ist unsere Grundierung. Verarbeitung mit Kelle und Eimer, ganz ohne Spezialgerät.",
      },
    ] satisfies BetonVorteil[],

    mehrErfahren: "Mehr erfahren über Rapid Set",
  },

  // =====================================================================
  // TRACK 2 — NEODUR-Instandsetzung (mineralisches System, eigene Herstellung)
  // =====================================================================
  track2: {
    badge: "Lösungslinie 2",
    headline: "NEODUR-Instandsetzung — das mineralische System",
    lead:
      "Für die dauerhafte Betoninstandsetzung aus eigener Herstellung: Spritzmörtel und Spritzbeton für die Reprofilierung, Montage- und Vergussmörtel für den kraftschlüssigen Verbund, Fugenmörtel für den Pflasterbau. Rein mineralisch, normgeprüft.",
    gruppen: [
      {
        gruppe: "spritzmoertel",
        label: "Spritzmörtel & Spritzbeton",
        intro:
          "Mit dem Spritzverfahren stellen wir Bauteile aus Beton und Stahlbeton wieder her. Fehlstellen und Ausbrüche werden nach Untergrundvorbereitung mit rein mineralischem Spritzmörtel oder Spritzbeton reprofiliert, in der Regel ohne Haftbrücke. Die maschinelle Verarbeitung im Nass- oder Trockenspritzverfahren sorgt für eine bessere Verdichtung.",
        produkte: ["NEODUR MSM 3", "NEODUR MSM 5", "NEODUR MSB 8"],
      },
      {
        gruppe: "verguss",
        label: "Montage- & Vergusssystem",
        intro:
          "Montage- und Vergussmörtel verbinden Beton kraftschlüssig mit Stahleinbauteilen und Fertigteilen. Hochfließfähige Vergussmörtel vergießen Anker, Bolzen, Pfeiler, Schienen und Maschinenfundamente hohlraumfrei, sodass die Kräfte direkt ins Fundament abgeleitet werden. Vom Schnellverguss bis zum hochfesten Vergussbeton für große Querschnitte, schrumpfarm, frost- und tausalzbeständig.",
        produkte: ["NEODUR SVM 03", "NEODUR SVM 4", "NEODUR VM basic", "NEODUR VM 5"],
      },
      {
        gruppe: "pflasterfugen",
        label: "Pflasterfugenmörtel",
        intro:
          "Für den Pflasterbau verfugen und sanieren wir Pflaster- und Plattenflächen mit mineralischen Fugenmörteln. Das Spektrum reicht vom fix- und fertigen 1-K-Mörtel für leicht belastete Fußgängerbereiche bis zum zementgebundenen Mörtel für die starre, befahrbare Bauweise.",
        produkte: ["NEODUR PFM 1K Easyfix", "NEODUR PFM-ZE"],
      },
    ] satisfies BetonTrack2Gruppe[],
  },

  // --- Wofür: Anwendungsfälle (echte Referenzfotos via Slug) -----------
  anwendungen: [
    { label: "Verkehrsflächen & Straße", sublabel: "Betonfahrbahnen unter laufendem Verkehr", referenzSlug: "strassensanierung-wien" },
    { label: "Flughafen & Rollfeld", sublabel: "Nacht-Instandsetzung, Freigabe nach zwei Stunden", referenzSlug: "flughafen-zagreb" },
    { label: "Industrie- & Hallenboden", sublabel: "Sanierung im laufenden Betrieb", referenzSlug: "loosen-werkzeug-klausen" },
    { label: "Logistik & LKW-Flächen", sublabel: "Zufahrten und Umfahrten ohne langen Stillstand", referenzSlug: "lkw-umfahrt-darmstadt" },
    { label: "Brücke & Bauwerk", sublabel: "Statisch relevant nach DIN EN 1504-3", referenzSlug: "fussgaengerbruecke-albbruck" },
    { label: "Pflaster barrierefrei", sublabel: "Fugen und Egalisierung nach DIN 18040", referenzSlug: "pflastersanierung-crailsheim" },
    { label: "Tankstelle & WHG-Flächen", sublabel: "Flüssigkeitsdicht, beständig nach DAfStb", referenzSlug: "absenksteine-tankstelle" },
    { label: "Treppen & Hochbau", sublabel: "Vertikal und über Kopf verarbeitbar", referenzSlug: "treppenstufen-sanierung" },
    { label: "Design & Sichtbeton", sublabel: "Reib-, glätt- und strukturierbar", referenzSlug: "kuechenarbeitsplatte-berlin" },
  ] satisfies BetonAnwendung[],

  // --- Portfolio: Gruppen-Intros (Labels kommen aus dict.bereiche) -----
  // Reihenfolge der Gruppen folgt data/bereiche.ts (rapid-set).
  portfolioIntro:
    "Beide Lösungslinien im Überblick, gegliedert nach Aufgabe und Schichtstärke.",
  gruppenText: {
    reparaturmoertel:
      "Die Rapid-Set-Kernfamilie, gestaffelt nach Schichtstärke: CEMENT ALL für 0 bis 100 mm, MORTAR MIX für 10 bis 150 mm und über Kopf, CONCRETE MIX und DOT Europe für 50 bis 600 mm. Dazu ASPHALT REPAIR MIX für Asphaltflächen.",
    schnellbeton:
      "Baustellengemischter Schnellbeton für große Flächen und Verkehrswege. Volumetrisch vor Ort gemischt, pumpfähig, ohne Restbeton.",
    verguss:
      "Montage- und Vergussmörtel für den kraftschlüssigen, hohlraumfreien Verbund von Beton mit Stahleinbauteilen — vom Schnellverguss bis zum hochfesten Vergussbeton für große Querschnitte.",
    spritzmoertel:
      "Mineralischer Spritzmörtel und Spritzbeton für die Reprofilierung von Fehlstellen und die flächige Betoninstandsetzung im Nass- oder Trockenspritzverfahren, gestaffelt nach Körnung.",
    pflasterfugen:
      "Mineralische Fugenmörtel für Pflaster- und Plattenflächen — vom fertigen 1-K-Mörtel für Fußgängerbereiche bis zum zementgebundenen Mörtel für die befahrbare, starre Bauweise.",
    additive:
      "Concrete Pharmacy: Additive zur gezielten Steuerung von Konsistenz und Verarbeitungszeit, abgestimmt auf Witterung und Anwendung.",
  } as Record<string, string>,

  // --- Produkt-Vorschaubilder: Szenariofoto aus passender Referenz -----
  // Slug → Referenzbild im Component aufgelöst; fehlt der Eintrag, rendert die
  // Kachel ohne Foto (statt Platzhalter). Nur belegte Produkt↔Referenz-Paare.
  produktSzenarioReferenz: {
    "rapid-set-cement-all": "treppenstufen-sanierung",
    "rapid-set-mortar-mix": "sinusfugen-sanierung",
    "rapid-set-mortar-mix-dur": "trennfugen-bohnenkamp",
    "asphalt-repair-mix": "autohaus-versmold",
    "dot-europe-concrete-mix": "strassensanierung-wien",
    "neodur-pfm-1k-easyfix": "hauptbahnhofsvorplatz-landau",
  } as Record<string, string | null>,

  // --- Beweis / Trust (Dach, anonym, ohne Personen/Logos) --------------
  trust: {
    headline: "Belegt statt behauptet",
    kennzahl: "Seit 1936",
    kennzahlText: "Hartstoff- und Mörtelkompetenz für den schwer beanspruchten Beton",
    lead:
      "KORODUR entwickelt und produziert mineralische Systeme für Industrieboden und Betoninstandsetzung. Instandsetzung im Rahmen der EN 1504, geprüft und dokumentiert.",
    normen: [
      "DIN EN 1504-3",
      "EPD (ISO 14025 / EN 15804)",
      "DIN EN ISO 9001:2015 (TÜV)",
      "Mitglied DGNB",
      "Sulfat- & CDF-Prüfung",
    ],
  },

  // --- Abbinder (Dach) -------------------------------------------------
  abbinder: {
    claim: "Schnell wieder belastbar. Dauerhaft instand gesetzt.",
    text:
      "Sprechen Sie mit unserer technischen Fachberatung über Ihre Sanierungsaufgabe. Wir empfehlen die passende Lösungslinie und das richtige Produkt.",
  },
} as const;

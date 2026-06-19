// === Rapid-Set-Bereichsseite: redaktioneller Content (DE-Basis) ===
// Ausgearbeitet 2026-06-19 (Steffi). Quelle: Tiefenanalyse der Rapid-Set-
// Unterlagen (Broschüre, System-Datenblatt, 3 Präsentationen, 8 TDS) unter
// korodur-rapidset/ + docs/specs/2026-06-19-rapid-set-bereichsseite-konzept.md.
//
// Wie die Ratgeber-Artikel ist dieser Content zunächst DE-only; EN/FR/PL/ES
// rendern weiter das generische Bereichs-Template (i18n-Follow-up → #181).
//
// WICHTIG (Content-Standing-Rules): keine Personen/Testimonials, keine
// Kundenlogos (Entscheidung Steffi 2026-06-19). Slogans verbatim aus den
// Unterlagen. FAKTENCHECK-Flags markieren Werte, die Technik vor dem
// Live-Gang bestätigen muss.

/** Icon-Schlüssel → in components/RapidSetBereich.tsx auf lucide-Icons gemappt. */
export type RapidSetIcon =
  | "timer"
  | "layers"
  | "droplets"
  | "shield"
  | "leaf"
  | "recycle"
  | "flame"
  | "wrench";

export interface RapidSetVorteil {
  icon: RapidSetIcon;
  kicker: string;
  titel: string;
  text: string;
}

export interface RapidSetAnwendung {
  /** Branchen-/Anwendungs-Label der Kachel. */
  label: string;
  sublabel: string;
  /** Referenz-Slug: liefert Bild + Verlinkung (Single Source = data/referenzen.ts). */
  referenzSlug: string;
}

export interface RapidSetTechPunkt {
  icon: RapidSetIcon;
  titel: string;
  text: string;
  /** true = Wert noch nicht final von Technik freigegeben (Broschüren-Wert). */
  faktencheck?: boolean;
}

export const RAPID_SET_CONTENT = {
  // --- Hero -------------------------------------------------------------
  hero: {
    kicker: "Betonsanierung mit Rapid Set",
    // H1 zweizeilig (Entscheidung Steffi: Hybrid Nutzen + Marken-Claim).
    h1: ["Ein Material. Viele Aufgaben.", "Nach einer Stunde belastbar."],
    sub: "Rapid Set. schnell. einfach. einzigartig.",
    lead:
      "Seit über 50 Jahren in den USA bewährt, exklusiv durch uns in Europa: die schnellabbindende Rapid Set Zement-Technologie. Ein multifunktionaler Werkstoff für Boden, Wand und Decke, innen und außen, in frei wählbarer Konsistenz und nach rund einer Stunde belastbar.",
    // Verbatim-Claims für Hero-Chips.
    chips: ["belastbar nach 1 Stunde", "ein Material, viele Anwendungen", "ohne schwere Maschinerie"],
  },

  // --- Problem / Nutzenversprechen -------------------------------------
  problem: {
    kicker: "Stillstand kostet Geld",
    headline: "Jede Stunde Sperrzeit ist teuer.",
    lead:
      "Gesperrte Verkehrsflächen, stillstehende Produktion, fehlende Mieteinnahmen, verpasste Übergabetermine. Im Bestand entscheidet nicht das billigste Material, sondern wie schnell die Fläche wieder trägt.",
    downtime: [
      "Verkehrsflächen, die unter laufendem Betrieb instand gesetzt werden müssen",
      "Produktions- und Hallenböden, bei denen jede Schicht Stillstand zählt",
      "Parkdecks und Tiefgaragen mit Mietausfall pro Sperrtag",
      "Termindruck, wenn das Folgegewerk schon wartet",
    ],
    payoff:
      "Rapid Set ist nach rund einer Stunde wieder belastbar. Teams liefern zeitoptimiert ab, und es geht sofort weiter. Maximale Wirtschaftlichkeit durch maximale Effizienz.",
  },

  // --- Drei Kernvorteile -----------------------------------------------
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
  ] satisfies RapidSetVorteil[],

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
  ] satisfies RapidSetAnwendung[],

  // --- Technologie: warum Rapid Set anders ist -------------------------
  technologie: {
    kicker: "Hochentwickelte Rapid Set Technologie",
    headline: "Warum Rapid Set anders ist",
    lead:
      "Rapid Set basiert auf schnellabbindendem Calcium-Sulfo-Aluminat-Zement (BCSA), nicht auf beschleunigtem Portlandzement. Das Anmachwasser wird nahezu vollständig chemisch gebunden. Daraus folgt die einzigartige Performance.",
    punkte: [
      { icon: "timer", titel: "Hohe Frühfestigkeit", text: "Über 20 N/mm² nach 60 Minuten, bis Klasse C55/67 nach 28 Tagen. Hochfest und schnellerhärtend ohne nachträgliche Beschleuniger." },
      { icon: "layers", titel: "Schwundneutral", text: "Volumenstabiles, schwund- und spannungsarmes Erhärten. Das reduziert Risse und Ablösungen und macht Haftbrücken überflüssig." },
      { icon: "shield", titel: "Dauerhaft beständig", text: "Sulfatbeständig (Prüfung nach Wittekindt) sowie frost- und tausalzbeständig (CDF-Prüfung). Sehr niedriger Chloridionengehalt." },
      // FAKTENCHECK: CO2- und Lebensdauer-Werte aus Broschüre, Technik-Sign-off offen.
      { icon: "leaf", titel: "CO₂-reduziert", text: "Rund 30 % weniger CO₂-Ausstoß als Portlandzement. EPD nach ISO 14025 und EN 15804, third-party verifiziert, LEED-konform.", faktencheck: true },
      { icon: "recycle", titel: "Bis 4× langlebiger", text: "Bis zu vierfache Lebensdauer gegenüber Portlandzement. Weniger Instandhaltung, längere Nutzungsdauer, bessere Lebenszykluskosten.", faktencheck: true },
      { icon: "droplets", titel: "Konsistenz steuerbar", text: "Über die Concrete-Pharmacy-Additive lassen sich Konsistenz und Verarbeitungszeit gezielt an Witterung und Aufgabe anpassen." },
    ] satisfies RapidSetTechPunkt[],
    epoxid: {
      headline: "Die mineralische Alternative zu Epoxidharz-Mörtel",
      punkte: [
        "Brandklasse A1, nichtbrennbar statt B1",
        "Rein mineralisch und gesundheitlich unbedenklich",
        "Entsorgung als Bauschutt statt als Gefahrgut",
      ],
    },
  },

  // --- Portfolio: Gruppen-Intros (Labels kommen aus dict.bereiche) -----
  // Reihenfolge der Gruppen folgt data/bereiche.ts (rapid-set).
  portfolioIntro:
    "Wenige Produkte für viele Anwendungen, sinnvoll nach Aufgabe und Schichtstärke gegliedert.",
  gruppenText: {
    reparaturmoertel:
      "Die Kernfamilie, gestaffelt nach Schichtstärke: CEMENT ALL für 0 bis 100 mm, MORTAR MIX für 10 bis 150 mm und über Kopf, CONCRETE MIX und DOT Europe für 50 bis 600 mm. Dazu ASPHALT REPAIR MIX für Asphaltflächen.",
    schnellbeton:
      "Baustellengemischter Schnellbeton für große Flächen und Verkehrswege. Volumetrisch vor Ort gemischt, pumpfähig, ohne Restbeton.",
    additive:
      "Concrete Pharmacy: Additive zur gezielten Steuerung von Konsistenz und Verarbeitungszeit, abgestimmt auf Witterung und Anwendung.",
  } as Record<string, string>,

  // --- Beweis / Trust (anonym, ohne Personen/Logos) --------------------
  trust: {
    headline: "Belegt statt behauptet",
    kennzahl: "Über 2.500",
    kennzahlText: "Handwerksbetriebe verarbeiten Rapid Set",
    lead:
      "Exklusiver Lizenzpartner für Rapid Set seit 2012. KORODUR steht seit 1936 für Hartstoffe und Mörtel im schwer beanspruchten Industrieboden.",
    normen: [
      "EPD (ISO 14025 / EN 15804)",
      "DIN EN ISO 9001:2015 (TÜV)",
      "Mitglied DGNB",
      "DIN EN 1504-3",
      "Sulfat- & CDF-Prüfung",
    ],
  },

  // --- Abbinder ---------------------------------------------------------
  abbinder: {
    claim: "Rapid Set changes the game!",
    text:
      "Sprechen Sie mit unserer technischen Fachberatung über Ihre Sanierungsaufgabe. Rapid Set Produkte beziehen Sie exklusiv über den Baustoff-Fachhandel.",
  },
} as const;

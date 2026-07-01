// === Infrastruktur-Bereichsseite: redaktioneller Content (DE-Basis) ===
// Bereichsseiten-Konzept-Rollout Welle 2 (#376, Folge von #320). Single-
// Narrativ (kein Hybrid): ein zusammenhängendes Schnellbeton-Narrativ mit
// optionalem Technologie-Baustein (zwei Systeme), der hier echten Stoff trägt.
//
// 7+2-Baustein-Modell (Spec docs/specs/2026-06-30-bereichsseiten-konzept-
// rework.md): Hero · Problem/Anlässe · [Technologie = Systeme] · Wofür ·
// Portfolio · Trust · Fachberatung · Referenzen · Abbinder.
//
// Quellen: docs/content-quellen/{bereich-prosa/infrastruktur.de.md (LIVE-
// SCRAPE der Alt-Seite Schnellbetonsysteme, verbatim verwendbar), konzept/
// infrastruktur.md (Draft, nur belegte Teile), broschuere-extrakt/
// infrastruktur.md} + data/produkte.ts (Kennwerte) + scrape-extrakt.
//
// Content-Standing-Rules: keine Personen/Testimonials, keine Kundenlogos,
// Wir-Form, keine Em-Dashes. Faktencheck-Sperren (Brief-Distillat 2026-06-30):
// KEINE harte KOROCRETE-Verkehrsfreigabe-Stundenzahl (nur „wenige Stunden,
// rezepturabhängig"), KEINE XF-Expositionsklassen, KEINE ZTV-ING/EN-1504-3-
// Bauteil-Claims für Brücken, KEIN Wettbewerber-Framing (DUROP vs. DOT).
//
// Wie die übrigen dedizierten Bereiche zunächst DE-only; EN/FR/PL/ES rendern
// das generische Bereichs-Template (i18n-Follow-up → #181).

/** Icon-Schlüssel → in components/InfrastrukturBereich.tsx auf lucide gemappt. */
export type InfraIcon = "timer" | "gauge" | "truck" | "layers" | "shield" | "droplets";

export interface InfraSystem {
  icon: InfraIcon;
  name: string;
  beschreibung: string;
  kennwerte: string[];
}

export interface InfraAnwendung {
  label: string;
  sublabel: string;
  /** Referenz-Slug: liefert Bild + Verlinkung (Single Source = data/referenzen.ts). */
  referenzSlug: string;
}

export const INFRASTRUKTUR_CONTENT = {
  // --- Hero -------------------------------------------------------------
  hero: {
    kicker: "Infrastruktur",
    h1: ["Infrastruktur instand setzen.", "Wieder befahrbar in Stunden."],
    sub: "Zeitoptimierte Schnellbeton-Instandsetzung von Verkehrsflächen und Industrieanlagen, oft im laufenden Betrieb.",
    lead:
      "Stark beanspruchte Betonflächen tragfähig instand setzen, von der Nachtsanierung der Start- und Landebahn bis zum Hallenboden im laufenden Betrieb. Wir liefern maßgeschneiderte Schnellbetonsysteme und begleiten von der Festlegung der Betonrezeptur bis zur Herstellung direkt auf der Baustelle.",
    chips: ["Verkehrsfreigabe in Stunden", "im laufenden Betrieb", "vor Ort gemischt"],
  },

  // --- Problem / Nutzenversprechen -------------------------------------
  problem: {
    kicker: "Warum Schnellbeton",
    headline: "Jede Stunde Sperrzeit kostet.",
    lead:
      "Gesperrte Fahrbahnen, stillstehende Produktion, nur kurze Wartungsfenster. Betonböden tragen höchste Beanspruchung aus Last, Witterung und Chemie, und klassische Instandsetzung braucht lange Aushärtezeiten. Über die Wirtschaftlichkeit entscheidet der Zeitfaktor, wie schnell die Fläche wieder trägt.",
    downtime: [
      "Gesperrte Verkehrsflächen verursachen mit jeder Stunde Stillstand Ausfallkosten",
      "Start- und Landebahnen lassen sich oft nur nachts, in kurzen Zeitfenstern, sanieren",
      "Stillstand in Produktion und Lager zieht teils sehr hohe Kosten nach sich",
      "Klassische Instandsetzung braucht lange Aushärtezeiten, bevor die Fläche wieder trägt",
    ],
    payoff:
      "Mit schnell erhärtenden Betonsystemen sanieren wir im laufenden Betrieb und geben Flächen in Stunden statt Tagen wieder frei.",
  },

  // --- Typische Einsätze (Orientierung) --------------------------------
  anlaesse: {
    kicker: "Typische Einsätze",
    headline: "Wo Schnellbeton zählt",
    items: [
      "Start- & Landebahnen",
      "Fahrbahnen & Verkehrsflächen",
      "Produktions- & Lagerhallen",
      "Logistik- & LKW-Flächen",
      "Brücken & Bauwerke",
      "Tankstellen & Zufahrten",
    ],
  },

  // --- Technologie: zwei Schnellbeton-Systeme (optionaler Baustein) -----
  // Trägt echten Stoff (Brief-Distillat: technologie.hasSubstance = true).
  // Alle Kennwerte quellenbelegt (Prosa-Scrape + produkte.ts), keine harte
  // KOROCRETE-Freigabezahl.
  systeme: {
    kicker: "Technologie",
    headline: "Zwei bewährte Schnellbeton-Systeme",
    lead:
      "Beide werden direkt auf der Baustelle gemischt und sind schnell wieder belastbar. Welches System passt, hängt von Anforderung, Fläche und Zeitfenster ab.",
    items: [
      {
        icon: "timer",
        name: "Rapid Set Concrete",
        beschreibung:
          "In den USA seit Jahrzehnten bewährter Schnellbeton, weltweit für Infrastrukturprojekte im Einsatz. Die sehr schnelle Erhärtung erlaubt Instandsetzungen zu verkehrsberuhigten Zeiten, etwa nachts auf dem Rollfeld.",
        kennwerte: [
          "Nach TL BEB-StB geprüft (Festbetonprüfung für Verkehrsflächenbefestigungen)",
          "Geforderte Frühfestigkeit ≥ 20 MPa nach 5 h, erreicht bereits nach 2 h",
          "Festigkeitsklasse C40/50",
          "Verkehrsfreigabe nach rund 2 Stunden",
        ],
      },
      {
        icon: "gauge",
        name: "KOROCRETE Schnellbeton",
        beschreibung:
          "Schnellbeton auf Basis des KORODUR FSCem, eines zementären, volumenstabilen Bindemittels auf ternärer Basis, für hochbelastbare, schnell nutzbare und verlegereife Betonböden. Senkt die teils sehr hohen Ausfallkosten von Produktions- und Lagerstätten.",
        kennwerte: [
          "Festigkeitsklassen C35/45 bis C50/60 in Anlehnung an DIN EN 206",
          "Druckfestigkeit ca. 18 / 25 / 35 N/mm² nach 6 / 8 / 16 h, ca. 65 N/mm² nach 28 Tagen",
          "Volumetrisch direkt auf der Baustelle gemischt, ohne Restbeton",
          "Nutzung und Verkehrsfreigabe wenige Stunden nach Verlegung, rezepturabhängig",
        ],
      },
    ] satisfies InfraSystem[],
  },

  // --- Wofür: Anwendungsfälle (echte Referenzfotos via Slug) -----------
  wofuer: {
    kicker: "Wofür",
    headline: "Von der Start- und Landebahn bis zur Werkshalle",
    intro:
      "Schnellbeton, Reparatur und Instandsetzung im Bestand. Jede Kachel führt zu einem echten Projekt aus unserer Referenzdatenbank.",
  },
  anwendungen: [
    { label: "Flughafen & Rollfeld", sublabel: "Schadhafte Betonplatten der Start- und Landebahn instand gesetzt", referenzSlug: "flughafen-zagreb" },
    { label: "Straße & Verkehrsfläche", sublabel: "Betondecke einer Kreuzung saniert, Verkehr nach einer Stunde wieder frei", referenzSlug: "strassensanierung-wien" },
    { label: "Logistik & LKW-Flächen", sublabel: "Stark befahrene Umfahrt im laufenden Betrieb saniert", referenzSlug: "lkw-umfahrt-darmstadt" },
    { label: "Halle im laufenden Betrieb", sublabel: "Produktionsboden übers Wochenende instand gesetzt", referenzSlug: "antolin-wochenend-sanierung" },
    { label: "Tiefbau", sublabel: "Betoninstandsetzung im dauerfeuchten Milieu, Wiederbelastung am Folgetag", referenzSlug: "tiefbaumassnahme" },
    { label: "Brücke & Bauwerk", sublabel: "Brückensanierung mit Gefälleausgleich auf den Fußwegen", referenzSlug: "bruckensanierung-amberg" },
    { label: "Tankstelle & Zufahrt", sublabel: "Neues Gefälle an der Zapfsäule, nach vier Stunden wieder freigegeben", referenzSlug: "gefaellesanierung-tankstelle-schneeberg" },
  ] satisfies InfraAnwendung[],

  // --- Portfolio: Gruppen-Intros (Labels kommen aus dict.bereiche) -----
  // Reihenfolge der Gruppen folgt data/bereiche.ts (infrastruktur).
  portfolioIntro:
    "Die beiden Schnellbeton-Systeme, Schnellreparaturmörtel und die passenden Begleitprodukte für Untergrund, Nachbehandlung und Oberflächenschutz.",
  gruppenText: {
    schnellbeton:
      "Die beiden Schnellbeton-Systeme, volumetrisch vor Ort gemischt: Rapid Set Concrete, nach TL BEB-StB geprüft, und KOROCRETE auf FSCem-Basis. Pumpfähig, ohne Restbeton, für große Verkehrs- und Hallenflächen.",
    reparaturmoertel:
      "Punktuelle Schnellreparatur für Beton und Asphalt: DOT Europe CONCRETE MIX nach DIN EN 1504-3 und ASPHALT REPAIR MIX, früh belastbar für die rasche Wiederfreigabe.",
    "kunstharz-hartstoffe":
      "KORODUR DUROP, synthetischer Hartstoff als Füll- und Abstreumaterial für hochbeanspruchte Kunstharzbeschichtungen und -estriche.",
    "untergrund-haftbruecken":
      "KORODUR HB 5 rapid stellt den schnellen, kraftschlüssigen Verbund zum Untergrund her, damit die Instandsetzung dauerhaft hält.",
    nachbehandlung:
      "Curing-Compounds und Nachbehandlungsmittel schützen die frische Fläche vor zu schnellem Wasserentzug und sichern die Festigkeitsentwicklung.",
    impraegnierung:
      "Silikatische Imprägnierungen verkieseln die Oberfläche mineralischer Beläge, mit integriertem Fleckschutz und verbesserter Reinigungsfähigkeit.",
  } as Record<string, string>,

  // --- Produkt-Vorschaubilder: Szenariofoto aus passender Referenz -----
  // Slug → Referenzbild im Component aufgelöst; fehlt der Eintrag, rendert
  // die Kachel ohne Foto. Nur belegte Produkt↔Referenz-Paare.
  produktSzenarioReferenz: {
    "rapid-set-schnellbeton": "flughafen-zagreb",
    korocrete: "lkw-umfahrt-darmstadt",
    "dot-europe-concrete-mix": "strassensanierung-wien",
  } as Record<string, string | null>,

  // --- Beweis / Trust (anonym, ohne Personen/Logos) --------------------
  trust: {
    headline: "Belegt statt behauptet",
    kennzahl: "Seit 1936",
    kennzahlText: "Hartstoff- und Betonkompetenz für höchstbeanspruchte Flächen",
    lead:
      "KORODUR entwickelt und produziert mineralische Systeme für Industrieboden und Betoninstandsetzung. Schnellbeton nach geprüften Lieferbedingungen, dokumentiert und reproduzierbar.",
    normen: ["TL BEB-StB", "DIN EN 206", "DIN EN 1504-3", "DIN EN ISO 9001:2015 (TÜV)"],
  },

  // --- Abbinder --------------------------------------------------------
  abbinder: {
    claim: "Schnell wieder befahrbar. Dauerhaft instand gesetzt.",
    text:
      "Sprechen Sie mit unserer technischen Fachberatung über Ihre Instandsetzung. Wir legen mit Ihnen die Betonrezeptur fest, von der Planung bis zur Verkehrsfreigabe.",
  },
} as const;

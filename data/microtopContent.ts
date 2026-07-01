// === MICROTOP TW-Behältersanierung: redaktioneller Rich-Content (DE-Basis) ===
// #375. Quelle: technisch abgenommene Landingpage lp-live.korodur.de/microtop-tw
// (Repo KORODUR-International/lp-live.korodur.de), von Steffi als inhaltlich +
// technisch abgenommen bestätigt (2026-07-01) und als Impuls freigegeben.
//
// Faithful übernommen, in Wir-Form, ohne Personen (Kontakt läuft über den
// Fachberater-Finder /kontakt), ohne Em-Dash. Produktnamen sind auf die realen
// PDP-IDs verlinkt. Bilder unter public/images/bereiche/microtop/ (echte Fotos
// aus der LP, keine AI-Bilder).
//
// HINWEIS (Frank): Die LP nennt uneinheitlich 8/10/11 Produkte. Maßgeblich ist
// hier die präzise DVGW-Zulassungsübersicht (8 mit Typ Klasse 1 nach W 300+W 347,
// TW Mineral + NEODUR VM basic nach W 347, TW VSM ohne Zulassung). Gesamt-Zahl im
// Hero bewusst vermieden, bis die Zählweise final bestätigt ist.

export interface MicrotopKarte {
  titel: string;
  text: string;
}

export interface MicrotopReferenz {
  name: string;
  ort: string;
  bauherr: string;
  kennzahl: string;
  text: string;
  bild: string;
}

export interface MicrotopVerfahren {
  titel: string;
  text: string;
  bild: string;
}

export interface MicrotopProduktzeile {
  bedarf: string;
  produkt: string;
  /** Reale PDP-IDs (Verlinkung). */
  ids: string[];
  schichtdicke: string;
  verfahren: string;
}

export interface MicrotopVergleichZeile {
  kriterium: string;
  microtop: string;
  epoxid: string;
  edelstahl: string;
}

export interface MicrotopDvgwZeile {
  produkte: string;
  zulassung: string;
}

export interface MicrotopFaq {
  frage: string;
  antwort: string;
}

export const MICROTOP_CONTENT = {
  hero: {
    kicker: "MICROTOP TW-Behältersanierung",
    h1: ["Trinkwasserbehälter sanieren,", "mit dem mineralischen Komplettsystem"],
    sub: "Ein aufeinander abgestimmtes, DVGW-zugelassenes System, von der Vorspritzung bis zur Oberflächenvergütung.",
    lead:
      "MICROTOP TW ist unser rein mineralisches Beschichtungssystem für die Instandsetzung von Trinkwasserbehältern. Für jeden Arbeitsschritt das passende Produkt, Microsilica-vergütet für höchste Dichtigkeit, ohne Kunststoffe im Trinkwasser.",
    chips: ["DVGW W 300 + W 347", "rein mineralisch", "einlagig verarbeitbar"],
  },

  problem: {
    kicker: "Das kennen Sie",
    headline: "Trinkwasserbehälter altern. Die Frage ist nicht ob, sondern wann.",
    lead:
      "Abblätternde Beschichtungen, Keimbelastung, steigende Sanierungskosten. Es gibt ein System, das alle Arbeitsschritte abdeckt.",
    punkte: [
      {
        titel: "Substanzverlust",
        text: "Abblätternde Beschichtungen, korrodierter Beton, sichtbare Bewehrung. Der Behälter hat die besten Jahre hinter sich, und jede Verzögerung verschlimmert den Zustand.",
      },
      {
        titel: "Hygienerisiko",
        text: "Beanstandungen bei der Trinkwasserprüfung, Keimbelastung an rauen Oberflächen. Die Hygieneanforderungen nach DVGW W 300 werden nicht mehr erfüllt.",
      },
      {
        titel: "Kostendruck",
        text: "Notfallsanierungen, lange Ausfallzeiten, provisorische Lösungen. Jede Woche ohne funktionstüchtigen Behälter kostet, und die Verantwortung liegt beim Betreiber.",
      },
    ] satisfies MicrotopKarte[],
  },

  system: {
    kicker: "Die Lösung: ein System für jeden Arbeitsschritt",
    headline: "MICROTOP TW, das mineralische Beschichtungssystem",
    text: "Aufeinander abgestimmte Produkte, DVGW-zugelassen nach W 300 und W 347. Für jeden Arbeitsschritt das richtige Produkt, vom Vorspritzen über den Hauptauftrag bis zur Oberflächenvergütung. Rein mineralisch, keine Kunststoffe im Trinkwasser, Microsilica-vergütet für höchste Dichtigkeit.",
    bild: "/images/bereiche/microtop/behaelter-innen.jpg",
  },

  usps: [
    { titel: "DVGW-zugelassen", text: "Produkte nach DVGW W 300 und W 347 zugelassen, geprüft vom Hygiene-Institut Gelsenkirchen." },
    { titel: "Rein mineralisch", text: "Kein Kunststoff, kein Epoxidharz, keine bioverfügbaren Inhaltsstoffe." },
    { titel: "Höchste Dauerhaftigkeit", text: "Microsilica-vergütet für maximale Dichtigkeit. Wasserundurchlässig, chloridfrei, korrosionshemmend." },
    { titel: "Wartungsfreundlich", text: "Glatte, abriebfeste Oberfläche. Geringes Porenvolumen, minimale Angriffsfläche für Keime." },
    { titel: "Einlagig verarbeitbar", text: "Ein Arbeitsgang statt mehrerer Schichten. Maschinell spritzbar mit geringem Rückprall." },
    { titel: "Kürzere Bauzeiten", text: "Kürzere Ausfallzeiten, geringere Sanierungskosten, schneller zurück zur sicheren Trinkwasserversorgung." },
  ] satisfies MicrotopKarte[],

  referenzen: {
    kicker: "Bewährt in der Praxis",
    headline: "Großprojekte im In- und Ausland",
    lead: "Wasserversorger, Ingenieurbüros und Fachfirmen in ganz Deutschland und international vertrauen auf MICROTOP TW.",
    projekte: [
      {
        name: "Hochbehälter Haidberg",
        ort: "Nordbayern",
        bauherr: "EWAG Nürnberg",
        kennzahl: "6 von 8 Produkten",
        text: "Größter Trinkwasserbehälter Nordbayerns. Komplettsanierung mit sechs MICROTOP TW Produkten, von der Reprofilierung bis zur Oberflächenvergütung. Fertigstellung in nur einem Jahr.",
        bild: "/images/bereiche/microtop/ref-haidberg.jpg",
      },
      {
        name: "Hochbehälter Krottenbach",
        ort: "Nürnberg",
        bauherr: "WFW",
        kennzahl: "33.500 m² saniert",
        text: "Zwei Kammern mit je 72 Stützen. 33.500 m² saniert mit MICROTOP TW 02, TW 3, TW 5 und TW BM.",
        bild: "/images/bereiche/microtop/ref-krottenbach.jpg",
      },
      {
        name: "Hochbehälter Räcknitz",
        ort: "Dresden",
        bauherr: "DREWAG Netz GmbH",
        kennzahl: "8 Kammern",
        text: "Dresdens größter Trinkwasserbehälter, fast 100 Jahre alt. Schrittweise Sanierung mit MICROTOP TW 3 HOZ und TW 5 HOZ im Trockenspritzverfahren.",
        bild: "/images/bereiche/microtop/ref-raecknitz.jpg",
      },
      {
        name: "Trinkwasserbehälter Bad Nauheim",
        ort: "Bad Nauheim",
        bauherr: "Stadtwerke Bad Nauheim",
        kennzahl: "TW NSM Premiere",
        text: "Premiere für MICROTOP TW NSM im Nassspritzverfahren. Blaue Wände, weiße Decke, die Farbgestaltung begeisterte den Bauherrn. Zweite Kammer sofort beauftragt.",
        bild: "/images/bereiche/microtop/ref-bad-nauheim.jpg",
      },
      {
        name: "Hochbehälter Puchheim",
        ort: "30.000 m³",
        bauherr: "WVA Ampergruppe",
        kennzahl: "73.000 Einwohner versorgt",
        text: "18.000 m² Wand- und Bodenflächen mit MICROTOP TW 3 beschichtet. Die Qualitätskontrolle durch die LGA Nürnberg bestätigte gleichbleibend hohe Qualität.",
        bild: "/images/bereiche/microtop/ref-puchheim.jpg",
      },
      {
        name: "Trinkwasserturm Budapest",
        ort: "3.000 m³",
        bauherr: "Stadtwerke Budapest",
        kennzahl: "Bauzeit ca. 6 Monate",
        text: "Internationales Projekt in Ungarn. Nach 30 Jahren Betrieb wählten die Stadtwerke Budapest MICROTOP TW BM und TW 02 für die Komplettsanierung.",
        bild: "/images/bereiche/microtop/ref-budapest.jpg",
      },
    ] satisfies MicrotopReferenz[],
  },

  verfahren: {
    kicker: "Ein System, drei Verfahren",
    headline: "Für jede Anforderung das passende Verfahren",
    lead: "Ob Nassspritzen, Trockenspritzen oder manuelle Verarbeitung, wir wählen das Verfahren passend zu Behälter und Aufgabe.",
    items: [
      {
        titel: "Nassspritzen",
        text: "Dichtstromförderung mit geringer Staubentwicklung und gleichbleibendem Wasserzementwert. Schichtdicke ca. 20 mm in einem Arbeitsgang.",
        bild: "/images/bereiche/microtop/nassspritzen.jpg",
      },
      {
        titel: "Trockenspritzen",
        text: "Größere Förderweiten und höhere Verdichtung. Geringer Rückprall dank optimierter Sieblinie. Drei Körnungen (0/3, 0/5, 0/8 mm) für Schichtstärken von 9 bis 30 mm.",
        bild: "/images/bereiche/microtop/trockenspritzen.jpg",
      },
      {
        titel: "Schleudern und Sprühen",
        text: "Für Rohre, Kanäle und Feinarbeiten. Verarbeitung per Schleuder, Spachtel, Pinsel oder Sprühen.",
        bild: "/images/bereiche/microtop/glaetten.jpg",
      },
    ] satisfies MicrotopVerfahren[],
  },

  produktwahl: {
    kicker: "Das richtige Produkt für Ihren Bedarf",
    headline: "Ein System, für jeden Arbeitsschritt das passende Produkt",
    lead: "Nicht sicher, welches Produkt? Unsere technische Fachberatung hilft weiter.",
    spalten: ["Ihr Bedarf", "Produkt", "Schichtdicke", "Verfahren"],
    zeilen: [
      { bedarf: "Hauptbeschichtung, fein-trocken", produkt: "TW 3", ids: ["microtop-tw-3"], schichtdicke: "9 bis 20 mm", verfahren: "Trockenspritzen" },
      { bedarf: "Hauptbeschichtung, mittel-trocken", produkt: "TW 5", ids: ["microtop-tw-5"], schichtdicke: "14 bis 30 mm", verfahren: "Trockenspritzen" },
      { bedarf: "Hauptbeschichtung, grob-trocken", produkt: "TW 8", ids: ["microtop-tw-8"], schichtdicke: "ab 25 mm", verfahren: "Trockenspritzen" },
      { bedarf: "Hauptbeschichtung (nass)", produkt: "TW NSM", ids: ["microtop-tw-nsm"], schichtdicke: "ca. 20 mm", verfahren: "Nassspritzen" },
      { bedarf: "Rohre und Behälter auskleiden", produkt: "TW 02, TW BM", ids: ["microtop-tw-02", "microtop-tw-bm"], schichtdicke: "5 bis 8 mm", verfahren: "Schleudern / Hand" },
      { bedarf: "Vorspritzen (Haftgrund)", produkt: "TW VSM", ids: ["microtop-tw-vsm"], schichtdicke: "15 bis 20 mm", verfahren: "Spritzen / Hand" },
      { bedarf: "Korrosionsschutz / Haftbrücke", produkt: "TW 02, TW BM", ids: ["microtop-tw-02", "microtop-tw-bm"], schichtdicke: "2 bis 5 mm", verfahren: "Spritzen / Spachteln" },
      { bedarf: "Oberflächenvergütung", produkt: "TW Mineral", ids: ["microtop-tw-mineral"], schichtdicke: "Dünnschicht", verfahren: "Pinsel / Sprühen" },
      { bedarf: "Rohrverguss", produkt: "NEODUR VM basic", ids: ["neodur-vm-basic"], schichtdicke: "nach Bedarf", verfahren: "Mischen und Gießen" },
    ] satisfies MicrotopProduktzeile[],
  },

  verguss: {
    kicker: "Ergänzend: Vergussarbeiten im Trinkwasserbereich",
    produktName: "NEODUR VM basic",
    produktId: "neodur-vm-basic",
    text: "Für Verguss- und Montagearbeiten in Trinkwasseranlagen bieten wir ein eigenes, ebenfalls DVGW-geprüftes Produkt: mineralischer, hochfließfähiger Quellvergussbeton für kraftschlüssige Vergussarbeiten und Montagen aller Art, geprüft gemäß DVGW-Arbeitsblatt W 347 für hygienische Anforderungen im Trinkwasserbereich.",
  },

  systemvergleich: {
    kicker: "Warum mineralisch?",
    headline: "Der Systemvergleich",
    lead: "Bei der Sanierung von Trinkwasserbehältern stehen drei Beschichtungssysteme zur Wahl.",
    spalten: ["Kriterium", "MICROTOP TW", "Epoxidharz", "Edelstahl"],
    zeilen: [
      { kriterium: "DVGW", microtop: "Nach W 300 + W 347 zugelassen", epoxid: "Produktabhängig", edelstahl: "Grundsätzlich geeignet" },
      { kriterium: "Material", microtop: "Rein mineralisch", epoxid: "Kunststoffbasiert (VOC)", edelstahl: "Edelstahl" },
      { kriterium: "Lebensdauer", microtop: "30+ Jahre", epoxid: "15 bis 20 Jahre", edelstahl: "40+ Jahre" },
      { kriterium: "Verarbeitung", microtop: "Einlagig, maschinell", epoxid: "Mehrschichtig", edelstahl: "Maßanfertigung" },
      { kriterium: "Sanierungsdauer", microtop: "Kurz", epoxid: "Mittel", edelstahl: "Lang" },
      { kriterium: "Kosten", microtop: "Mittel", epoxid: "Niedrig bis mittel", edelstahl: "Sehr hoch" },
      { kriterium: "Nachhaltigkeit", microtop: "Kein Kunststoff", epoxid: "Kunststoffbasiert", edelstahl: "Hoher CO₂-Fußabdruck" },
    ] satisfies MicrotopVergleichZeile[],
  },

  dvgw: {
    kicker: "DVGW-zugelassen, ohne Kompromisse",
    headline: "Vollständige Zulassungsübersicht",
    lead: "Die MICROTOP TW Produkte erfüllen die strengen Anforderungen der DVGW-Arbeitsblätter W 300 und W 347.",
    uebersicht: [
      { produkte: "TW 3, TW 5, TW 8, TW NSM, TW NSM blau, TW BM, TW BM weiß, TW 02", zulassung: "Typ Klasse 1 · W 300 · W 347" },
      { produkte: "TW Mineral", zulassung: "W 347" },
      { produkte: "NEODUR VM basic (Vergussbeton)", zulassung: "W 347" },
      { produkte: "TW VSM (Vorspritzmörtel)", zulassung: "Ohne DVGW-Zulassung" },
    ] satisfies MicrotopDvgwZeile[],
    footer:
      "Geprüft vom Hygiene-Institut Gelsenkirchen, keine bioverfügbaren Inhaltsstoffe. Entspricht DIN EN 13892-2, DIN 18551, DIN EN 13670 / DIN 1045-3. Zertifiziert nach DIN EN ISO 9001:2015.",
  },

  faq: {
    kicker: "Häufige Fragen",
    items: [
      {
        frage: "Was kostet die Trinkwasserbehälter-Sanierung mit MICROTOP TW?",
        antwort: "Die Kosten hängen von Behältergröße, Zustand und gewähltem Verfahren ab. MICROTOP TW liegt im mittleren Preissegment, günstiger als Edelstahl, vergleichbar mit Epoxidsystemen, aber mit deutlich längerer Lebensdauer. Ein individuelles Angebot erstellen wir auf Anfrage.",
      },
      {
        frage: "Welche DVGW-Zulassungen hat MICROTOP TW?",
        antwort: "TW 3, TW 5, TW 8, TW NSM, TW NSM blau, TW BM, TW BM weiß und TW 02 sind nach Typ Klasse 1, W 300 und W 347 zugelassen. TW Mineral ist nach W 347 zugelassen, TW VSM trägt keine DVGW-Zulassung. NEODUR VM basic (Vergussbeton) ist nach W 347 geprüft.",
      },
      {
        frage: "Wie unterscheiden sich mineralische Beschichtungen von Epoxidharz?",
        antwort: "MICROTOP TW ist rein mineralisch, ohne Kunststoffe und ohne bioverfügbare Inhaltsstoffe. Epoxidsysteme sind kunststoffbasiert mit begrenzter Lebensdauer von 15 bis 20 Jahren. Die mineralische Lösung ist nachhaltiger und langlebiger.",
      },
      {
        frage: "Wie lange dauert die Sanierung?",
        antwort: "MICROTOP TW ist einlagig und maschinell spritzbar, das verkürzt die Sanierungsdauer deutlich. Der Hochbehälter Haidberg wurde in nur einem Jahr komplett saniert.",
      },
      {
        frage: "Gibt es Ausschreibungstexte für Planer?",
        antwort: "Ja, DVGW-konforme Ausschreibungstexte stellen wir Planern auf Anfrage über unsere technische Fachberatung bereit.",
      },
    ] satisfies MicrotopFaq[],
  },

  abbinder: {
    claim: "Sichere Trinkwasserversorgung, dauerhaft instand gesetzt.",
    text: "Ob allgemeine Produktinformationen oder konkrete Fragen zu Ihrem Projekt: Sprechen Sie mit unserer technischen Fachberatung. Kostenlos und unverbindlich.",
  },
} as const;

import type {
  BelastungsTag,
  Flaechenkategorie,
  ProduktFilterV25,
  Verarbeitung,
  ZeitKategorie,
  Zusatzfunktion,
} from "./types";

// Produktmatrix-interne Filter-Taxonomie (aus Produktsicht). Bewusst separat
// von der Referenz-Taxonomie: Referenzen nutzen Einsatzbereich/Sanierungsart/
// Dringlichkeit/Zusatzfunktion, Produkte behalten ihr eigenes `eignungen`-
// Matrix-Schema. Spätere Harmonisierung möglich.
export type Belastung = "schwerlast" | "leichte-nutzung" | "rollende-lasten" | "punktlasten";
export type Sonderbedingung = "chemikalien" | "tausalz" | "rutschhemmung" | "kurze-sperrzeit" | "aussenbereich";
export type Massnahme = "kleine-reparatur" | "grossflaechige-sanierung";

// ---------------------------------------------------------------------------
// HINWEIS — 4-Step-Lösungsfinder-Migration (2026-04-22)
// Das Feld `zeitKategorie` ist aktuell heuristisch gesetzt (Name-Matching auf
// "rapid"/"schnell"/"ESC" + Grundierungen → "schnell", Rest → "normal").
// Das finale Mapping muss mit Produktmanagement im Workshop bestätigt werden.
// Ebenso `zusatzfunktionen`: aktuell leer bis auf explizit bekannte Fälle.
// Spec: docs/superpowers/specs/2026-04-22-loesungsfinder-4step-design.md
// ---------------------------------------------------------------------------

export interface Produkt {
  id: string;
  name: string;
  kategorie: "estrich" | "grundierung" | "schnellzement" | "beschichtung" | "nachbehandlung" | "sonstige";
  kurzbeschreibung: string;
  schichtdicke?: string;
  qualitaetsklasse?: string;
  normen: string[];
  technischeDaten: { label: string; wert: string }[];
  besonderheiten: string[];
  websiteUrl?: string;
  verarbeitung?: Verarbeitung;
  tdsUrl?: string;

  // === Lösungsfinder (2026-04-22) ===
  zeitKategorie: ZeitKategorie;
  zusatzfunktionen?: Zusatzfunktion[];

  // === Sanierungs-Produktmatrix V5 (2026-06-01) ===
  /** Wenn true, erscheint das Produkt in der Sanierungs-Matrix-Ansicht. Default false. */
  inSanierungsMatrix?: boolean;
  /** Belastbarkeits-Stufe für die Matrix-Anzeige. 5 = höchste Last (Hartstoff DIN 1100 A / TL BEB-StB), 1 = leichte Last. */
  belastbarkeitsStufe?: 1 | 2 | 3 | 4 | 5;
  /** Voll-belastbar-Zeit als Kurz-String (z. B. "24 h", "1 h", "30 min", "3 d"). */
  belastbarNach?: string;
  /** Optionaler Zusatz unter belastbarNach (z. B. "Verkehrsfreigabe", "leicht belastbar 24 h"). */
  belastbarNachZusatz?: string;
  /** Außenbereich-tauglich (Frost-/Tausalzbeständigkeit, UV-resistent etc.). */
  aussenbereich?: boolean;
  /** WHG-Zulassung (Wasserhaushaltsgesetz). */
  whgZulassung?: boolean;
  /** System-Produkt (volumetrische Mischtechnik vor Ort, z. B. KOROCRETE / Rapid Set Schnellbeton). */
  systemProdukt?: boolean;
  /** Designorientierter Sichtestrich (z. B. TRU Self-Leveling). */
  sichtestrich?: boolean;

  // === Lösungsfinder V2.5 — Match-Algorithmus (2026-06-01) ===
  // Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
  //
  // NUR `belastungenAbgedeckt` + `systemBegleitprodukte` werden hier explizit
  // gepflegt. Die übrigen Filter-Felder (wiederbelastungInH, aussenGeeignet,
  // flaechenkategorienGeeignet) leitet `produktFilterV25()` deterministisch aus
  // den kuratierten Matrix-Feldern ab — keine Redundanz, keine Heuristik.
  /**
   * Welche Branchen-Belastungen das Produkt fachlich abdeckt. Match-Schlüssel
   * der Top-Empfehlung (Schnittmenge mit den Branchen-Tags aus Step 3).
   * DRAFT — faktenbasiert aus besonderheiten/technischeDaten/Stufe abgeleitet,
   * Sign-off Produktmanagement (Frank) offen. Siehe docs/loesungsfinder-v25-review.md.
   */
  belastungenAbgedeckt?: BelastungsTag[];
  /** Slugs der System-Begleitprodukte (Haftbrücke, Grundierung, Nachbehandlung). */
  systemBegleitprodukte?: string[];

  /** @deprecated Alter Eignungs-Array, entfällt nach Migrationsabschluss. */
  eignungen?: (Belastung | Sonderbedingung | Massnahme)[];
  bild?: string;
}

export const produkte: Produkt[] = [
  // === ESTRICHE / INDUSTRIEESTRICHE ===
  {
    id: "neodur-he-60-rapid",
    name: "NEODUR HE 60 rapid",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoff-Schnellestrich – volle Belastbarkeit nach 24 h",
    schichtdicke: "10–60 mm",
    qualitaetsklasse: "CT-C60-F8-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN 18202 (Ebenheit)",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 60 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 8 N/mm²" },
      { label: "Verschleißwiderstand", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Begehbar nach", wert: "ca. 4–6 h" },
      { label: "Voll belastbar nach", wert: "ca. 24 h" },
    ],
    besonderheiten: [
      "Hohe Abriebfestigkeit",
      "Chemikalienbeständig",
      "Schnelle Erhärtung",
      "Schwindarm",
    ],
    verarbeitung: {
      untergrundvorbereitung: "Tragfähiger, sauberer, rauer Betonuntergrund. Kugelstrahlen oder Fräsen empfohlen. Grundierung mit KORODUR HB 5 rapid.",
      mischverhaeltnis: "25 kg Pulver auf ca. 3,0–3,25 l Wasser. Mischzeit: 3 Minuten mit Zwangsmischer.",
      schichtaufbau: "Einschichtig 10–60 mm auf Haftbrücke KORODUR HB 5 rapid.",
      verarbeitungszeit: "Ca. 20–30 Minuten bei 20 °C.",
      aushaertezeit: "Begehbar nach ca. 4–6 h. Voll belastbar nach ca. 24 h.",
      besonderheiten: "Verarbeitungstemperatur: +5 °C bis +30 °C. Nicht auf gefrorenem Untergrund verarbeiten.",
    },
    tdsUrl: "https://www.korodur.de/downloads/tds-neodur-he-60-rapid.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten", "chemikalien", "kurze-sperrzeit"],
    bild: "/images/produkte/neodur-he-60-rapid.png",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["chemikalienbestaendigkeit"],
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 5,
    belastbarNach: "24 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "chemie", "frost-tausalz", "staplerverkehr"],
    systemBegleitprodukte: ["korodur-hb-5-rapid"],
  },
  {
    id: "neodur-he-65",
    name: "NEODUR HE 65",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich für höchste Industrieböden-Beanspruchung mit Silotechnik",
    schichtdicke: "12–15 mm",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560-7",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 70 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 9 N/mm²" },
      { label: "Verschleißwiderstand", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Verarbeitung", wert: "Silosystem / Pumptechnik" },
      { label: "Voll belastbar nach", wert: "ca. 3 Tage" },
    ],
    besonderheiten: [
      "Höchste Verschleißfestigkeit",
      "Mit Silosystem verarbeitbar",
      "Wirtschaftlich auf Großflächen",
      "Kraftschlüssiger Verbund",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-neodur-he-65.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten"],
    bild: "/images/produkte/neodur-he-65.png",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 5,
    belastbarNach: "3 d",
    aussenbereich: false,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr"],
  },
  {
    id: "neodur-he-65-plus",
    name: "NEODUR HE 65 Plus",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich für Innen und Außen – ohne Haftbrücke, WHG-zugelassen",
    schichtdicke: "15–30 mm",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN EN 13687 (Frost-/Tausalzbeständigkeit)",
      "WHG (Wasserhaushaltsgesetz)",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 70 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 9 N/mm²" },
      { label: "Verschleißwiderstand", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Frost-/Tausalzbeständig", wert: "Ja" },
      { label: "Haftbrücke erforderlich", wert: "Nein" },
    ],
    besonderheiten: [
      "Ohne Haftbrücke verarbeitbar",
      "Frost- & tausalzbeständig",
      "WHG-tauglich",
      "Polymermodifiziert & faserverstärkt",
    ],
    verarbeitung: {
      untergrundvorbereitung: "Tragfähiger Betonuntergrund, fräsen oder kugelstrahlen. Keine Haftbrücke erforderlich.",
      mischverhaeltnis: "25 kg Pulver auf ca. 3,0–3,5 l Wasser. Zwangsmischer erforderlich.",
      schichtaufbau: "Einschichtig 15–30 mm direkt auf vorbereiteten Untergrund.",
      verarbeitungszeit: "Ca. 30–40 Minuten bei 20 °C.",
      aushaertezeit: "Begehbar nach ca. 6–8 h. Voll belastbar nach ca. 48 h.",
      besonderheiten: "Frost- und tausalzbeständig. Auch für Außenbereiche geeignet. WHG-konform.",
    },
    tdsUrl: "https://www.korodur.de/downloads/tds-neodur-he-65-plus.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten", "chemikalien", "tausalz", "aussenbereich"],
    zeitKategorie: "normal",
    zusatzfunktionen: ["chemikalienbestaendigkeit", "tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 5,
    belastbarNach: "3 d",
    aussenbereich: true,
    whgZulassung: true,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "chemie", "frost-tausalz", "staplerverkehr"],
  },
  {
    id: "neodur-he-40",
    name: "NEODUR HE 40",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich für stark beanspruchte Industrieböden",
    schichtdicke: "15–35 mm",
    qualitaetsklasse: "CT-C40-F6-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560-7",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 6 N/mm²" },
      { label: "Verschleißwiderstand", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Voll belastbar nach", wert: "ca. 3 Tage" },
    ],
    besonderheiten: [
      "Hohe Verschleißfestigkeit",
      "Kraftschlüssiger Verbund (DIN 18560-7)",
      "Wirtschaftliche Hartstoff-Lösung",
      "Innenbereich",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-neodur-he-40.pdf",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 5,
    belastbarNach: "3 d",
    aussenbereich: false,
    belastungenAbgedeckt: ["schwerlast", "verschleiss"],
  },
  {
    id: "neodur-level",
    name: "NEODUR Level",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, schnellerhärtender Hartstoff-Dünnestrich für präzise Bodensanierung",
    schichtdicke: "5–10 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN 18202 Zeile 3 (erhöhte Ebenheit)",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 10 N/mm²" },
      { label: "Selbstverlaufend", wert: "Ja" },
      { label: "Ebenheit", wert: "DIN 18202, Zeile 3" },
      { label: "Leicht belastbar nach", wert: "ca. 24 h" },
      { label: "Voll belastbar nach", wert: "ca. 3 Tage" },
    ],
    besonderheiten: [
      "Selbstverlaufend – sehr gute Ebenheit",
      "Schnelle Nutzbarkeit",
      "Integrierter Verschleißträger",
      "Maschinell verarbeitbar",
    ],
    verarbeitung: {
      untergrundvorbereitung: "Tragfähiger, sauberer Betonuntergrund. Kugelstrahlen empfohlen. Grundierung mit KORODUR PC erforderlich.",
      mischverhaeltnis: "25 kg Pulver auf ca. 5,0–5,5 l Wasser. Zwangsmischer, 3 Minuten Mischzeit.",
      schichtaufbau: "Einschichtig 5–10 mm auf Grundierung KORODUR PC. Selbstverlaufend.",
      verarbeitungszeit: "Ca. 20–30 Minuten bei 20 °C.",
      aushaertezeit: "Leicht belastbar nach ca. 24 h. Voll belastbar nach ca. 3 Tagen.",
      besonderheiten: "Maschinelle Verarbeitung möglich. Für große Flächen mit Pumptechnik geeignet.",
    },
    tdsUrl: "https://www.korodur.de/downloads/tds-neodur-level.pdf",
    eignungen: ["grossflaechige-sanierung", "leichte-nutzung", "rollende-lasten"],
    bild: "/images/produkte/neodur-level.png",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 4,
    belastbarNach: "3 d",
    belastbarNachZusatz: "leicht belastbar 24 h",
    aussenbereich: false,
    belastungenAbgedeckt: ["verschleiss", "staplerverkehr", "optik"],
    systemBegleitprodukte: ["korodur-pc"],
  },
  {
    id: "tru-self-leveling",
    name: "TRU Self-Leveling",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, geschliffener dekorativer Sichtestrich für designorientierte Bodenlösungen",
    schichtdicke: "5–35 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: [
      "DIN EN 13813",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 10 N/mm²" },
      { label: "Optik", wert: "Betonähnliche Sichtestrich-Oberfläche" },
      { label: "Verarbeitung", wert: "Selbstverlaufend" },
      { label: "Haftbrücke", wert: "Nicht erforderlich" },
      { label: "Begehbar nach", wert: "ca. 2–3 h" },
      { label: "Voll belastbar nach", wert: "ca. 24 h" },
    ],
    besonderheiten: [
      "Designorientierte Betonoptik",
      "Fugenlose Oberfläche",
      "Ohne Haftbrücke",
      "Schleifbar bis Hochglanz",
      "Hygienisch & pflegeleicht",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-tru-self-leveling.pdf",
    eignungen: ["grossflaechige-sanierung", "leichte-nutzung"],
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 4,
    belastbarNach: "24 h",
    belastbarNachZusatz: "schleifbar bis Hochglanz",
    aussenbereich: true,
    sichtestrich: true,
    belastungenAbgedeckt: ["optik", "fleckschutz", "hygiene", "publikumsverkehr"],
  },

  // === GRUNDIERUNGEN / HAFTBRÜCKEN (nicht in Sanierungs-Matrix) ===
  {
    id: "korodur-hb-5-rapid",
    name: "KORODUR HB 5 rapid",
    kategorie: "grundierung",
    kurzbeschreibung: "Schnellerhärtende Haftbrücke für kraftschlüssigen Verbund zum Untergrund",
    normen: [
      "DIN EN 1504-4",
    ],
    technischeDaten: [
      { label: "Haftzugfestigkeit", wert: "≥ 1,5 N/mm²" },
      { label: "Verarbeitungszeit", wert: "ca. 15 min" },
      { label: "Überarbeitbar nach", wert: "frisch-in-frisch" },
    ],
    besonderheiten: [
      "Schnelle Erhärtung",
      "Hohe Haftzugwerte",
      "Frisch-in-frisch Verarbeitung",
    ],
    eignungen: ["kleine-reparatur", "kurze-sperrzeit"],
    bild: "/images/produkte/korodur-hb5-rapid.png",
    zeitKategorie: "schnell",
  },
  {
    id: "korodur-pc",
    name: "KORODUR PC",
    kategorie: "grundierung",
    kurzbeschreibung: "Kunstharzdispersion-Grundierung für Dünnestrich-Systeme",
    normen: [
      "DIN EN 1504-4",
    ],
    technischeDaten: [
      { label: "Haftzugfestigkeit", wert: "≥ 1,0 N/mm²" },
      { label: "Anwendung", wert: "Für NEODUR Level" },
      { label: "Verbrauch", wert: "50–200 g/m²" },
    ],
    besonderheiten: [
      "Speziell für Dünnestrich-Systeme",
      "Polymermodifiziert",
    ],
    eignungen: ["grossflaechige-sanierung"],
    zeitKategorie: "schnell",
  },

  // === SCHNELLREPARATURMÖRTEL ===
  {
    id: "rapid-set-cement-all",
    name: "Rapid Set CEMENT ALL",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturmörtel – belastbar nach 1 h, innen und außen",
    schichtdicke: "0–100 mm",
    qualitaetsklasse: "C55/67",
    normen: [
      "ASTM C928",
      "DIN EN 1504-3",
    ],
    technischeDaten: [
      { label: "Qualität", wert: "C55/67" },
      { label: "Druckfestigkeit (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Druckfestigkeit (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Begehbar nach", wert: "ca. 15 min" },
      { label: "Voll belastbar nach", wert: "ca. 1 h" },
    ],
    besonderheiten: [
      "Ultrakurze Aushärtezeit",
      "Hohe Frühfestigkeit",
      "Innen und Außen einsetzbar",
      "Schwundkompensiert",
    ],
    verarbeitung: {
      untergrundvorbereitung: "Sauberer, tragfähiger Untergrund. Lose Teile entfernen, anfeuchten.",
      mischverhaeltnis: "Ca. 2,8 l Wasser pro 25 kg Sack. Nur mit sauberem Wasser mischen.",
      schichtaufbau: "Einschichtig 6–100 mm. Für größere Schichtdicken mehrlagig möglich.",
      verarbeitungszeit: "Ca. 15 Minuten bei 20 °C.",
      aushaertezeit: "Begehbar nach ca. 15 min. Voll belastbar nach ca. 1 h.",
      besonderheiten: "Kein Haftvermittler erforderlich. Verarbeitung bei +5 °C bis +35 °C.",
    },
    tdsUrl: "https://www.korodur.de/downloads/tds-rapid-set-cement-all.pdf",
    eignungen: ["kleine-reparatur", "kurze-sperrzeit", "aussenbereich"],
    bild: "/images/produkte/rapid-set-cement-all.png",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 3,
    belastbarNach: "1 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz", "verschleiss"],
  },
  {
    id: "rapid-set-mortar-mix",
    name: "Rapid Set MORTAR MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturmörtel für Fugen, Reprofilierung und Profileinbau",
    schichtdicke: "10–150 mm",
    qualitaetsklasse: "C45/55",
    normen: [
      "ASTM C928",
      "DIN EN 1504-3",
    ],
    technischeDaten: [
      { label: "Qualität", wert: "C45/55" },
      { label: "Druckfestigkeit (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Druckfestigkeit (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Verarbeitbar", wert: "pastös bis plastisch" },
      { label: "Voll belastbar nach", wert: "ca. 1 h" },
    ],
    besonderheiten: [
      "Schwundneutral",
      "Kein Haftvermittler nötig",
      "Pastöse bis steife Konsistenz einstellbar",
      "Nur mit Wasser mischen",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-rapid-set-mortar-mix.pdf",
    eignungen: ["kleine-reparatur", "kurze-sperrzeit"],
    bild: "/images/produkte/rapid-set-mortar-mix.png",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 3,
    belastbarNach: "1 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz"],
  },
  {
    id: "rapid-set-mortar-mix-dur",
    name: "Rapid Set MORTAR MIX DUR",
    kategorie: "schnellzement",
    kurzbeschreibung: "Schnellreparaturmörtel mit Hartstoff DIN 1100 A für Schwerlastfugen",
    schichtdicke: "10–150 mm",
    qualitaetsklasse: "C45/55",
    normen: [
      "ASTM C928",
      "DIN EN 1504-3",
      "DIN 1100 A (Hartstoff)",
    ],
    technischeDaten: [
      { label: "Qualität", wert: "C45/55 + DIN 1100 A" },
      { label: "Druckfestigkeit (1 h)", wert: "≥ 21 N/mm²" },
      { label: "Druckfestigkeit (24 h)", wert: "≥ 42 N/mm²" },
      { label: "Verarbeitbar", wert: "pastös bis plastisch" },
      { label: "Voll belastbar nach", wert: "ca. 1 h" },
    ],
    besonderheiten: [
      "Integrierter Verschleißträger DIN 1100 A",
      "Für Schwerlastfugen geeignet",
      "Schwundneutral",
      "Pastöse Konsistenz einstellbar",
    ],
    eignungen: ["kleine-reparatur", "schwerlast", "punktlasten", "kurze-sperrzeit"],
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 5,
    belastbarNach: "1 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr", "frost-tausalz"],
  },
  {
    id: "asphalt-repair-mix",
    name: "ASPHALT REPAIR MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Schnellreparaturmaterial für Asphaltflächen – Verkehrsfreigabe nach 30 Minuten",
    schichtdicke: "30–600 mm",
    normen: [
      "DIN EN 1504-3",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "ca. 22 N/mm²" },
      { label: "Schichtdicke", wert: "30–600 mm" },
      { label: "Verkehrsfreigabe nach", wert: "ca. 30 min" },
      { label: "Haftbrücke", wert: "Nicht erforderlich" },
    ],
    besonderheiten: [
      "Für Asphaltflächen geeignet",
      "Ohne Haftbrücke",
      "Einfache Verarbeitung",
      "30-Minuten-Verkehrsfreigabe",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-asphalt-repair-mix.pdf",
    eignungen: ["kleine-reparatur", "grossflaechige-sanierung", "schwerlast", "rollende-lasten", "kurze-sperrzeit", "aussenbereich"],
    bild: "/images/produkte/asphalt-repair-mix.png",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 3,
    belastbarNach: "30 min",
    belastbarNachZusatz: "Verkehrsfreigabe",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast"],
  },
  {
    id: "dot-europe-concrete-mix",
    name: "DOT Europe CONCRETE MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturbeton nach DIN EN 1504-3 – für Brücken, Start-/Landebahnen und Industrieböden",
    schichtdicke: "50–600 mm",
    qualitaetsklasse: "C35/45",
    normen: [
      "DIN EN 1504-3",
      "DIN EN 1015-11",
    ],
    technischeDaten: [
      { label: "Qualität", wert: "C35/45" },
      { label: "Körnung", wert: "0–8 mm" },
      { label: "Druckfestigkeit (60 min)", wert: "> 19 N/mm²" },
      { label: "Druckfestigkeit (28 d)", wert: "> 41 N/mm²" },
      { label: "Biegezugfestigkeit (28 d)", wert: "> 7 N/mm²" },
      { label: "Voll belastbar nach", wert: "ca. 1 h" },
      { label: "Frost-/Tausalzbeständig", wert: "Ja" },
      { label: "Sulfatbeständig", wert: "Ja" },
    ],
    besonderheiten: [
      "Multifunktional einsetzbar",
      "Frost-/tausalzbeständig",
      "Sulfatbeständig, chloridfrei",
      "Exzellente Haftung ohne Haftbrücke",
      "Für Brücken, Start-/Landebahnen, Industrieböden",
      "30 % weniger CO₂-Ausstoß als Portlandzement",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-dot-europe-concrete-mix.pdf",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 5,
    belastbarNach: "1 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast", "chemie", "verschleiss"],
  },
  {
    id: "korocrete",
    name: "KOROCRETE Schnellbeton",
    kategorie: "schnellzement",
    kurzbeschreibung: "Volumetrisch gemischter Schnellbeton auf FSCem-Basis (ternäres Spezialbindemittel) – Verkehrsfreigabe nach 6 h",
    schichtdicke: "projektabhängig",
    qualitaetsklasse: "C35/45 – C50/60",
    normen: [
      "DIN EN 206 (Anlehnung)",
    ],
    technischeDaten: [
      { label: "Bindemittel", wert: "KORODUR FSCem (ternär)" },
      { label: "Qualität", wert: "C35/45 – C50/60" },
      { label: "Druckfestigkeit (6 h)", wert: "ca. 18 N/mm²" },
      { label: "Druckfestigkeit (8 h)", wert: "ca. 25 N/mm²" },
      { label: "Druckfestigkeit (16 h)", wert: "ca. 35 N/mm²" },
      { label: "Druckfestigkeit (28 d)", wert: "ca. 65 N/mm²" },
      { label: "Verkehrsfreigabe nach", wert: "ca. 6 h (≥ 20 MPa)" },
      { label: "Mischung", wert: "volumetrisch vor Ort" },
    ],
    besonderheiten: [
      "Volumetrische Mischtechnik vor Ort (Cemen Tech M-Series)",
      "Volumenstabil, schwind-/spannungsfrei, rissefrei erhärtend",
      "Wasserfest, nassraumtauglich",
      "Pumpfähig",
      "Großflächig einsetzbar",
      "Kein Restbeton",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-korocrete.pdf",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 4,
    belastbarNach: "6 h",
    belastbarNachZusatz: "≥ 20 MPa",
    aussenbereich: true,
    systemProdukt: true,
    belastungenAbgedeckt: ["schwerlast", "frost-tausalz"],
  },
  {
    id: "rapid-set-schnellbeton",
    name: "Rapid Set Schnellbeton",
    kategorie: "schnellzement",
    kurzbeschreibung: "Volumetrisch gemischter Schnellbeton auf Rapid-Set-Basis nach TL BEB-StB – Verkehrsfreigabe nach 2 h",
    schichtdicke: "projektabhängig",
    qualitaetsklasse: "C40/50",
    normen: [
      "TL BEB-StB",
      "DIN EN 1504-3",
    ],
    technischeDaten: [
      { label: "Bindemittel", wert: "Rapid Set (Calcium-Sulfo-Aluminat-Zement)" },
      { label: "Qualität", wert: "C40/50" },
      { label: "Druckfestigkeit (60 min)", wert: "> 19 N/mm²" },
      { label: "Druckfestigkeit (28 d)", wert: "> 41 N/mm²" },
      { label: "Verkehrsfreigabe nach", wert: "ca. 2 h" },
      { label: "Mischung", wert: "volumetrisch vor Ort" },
    ],
    besonderheiten: [
      "Volumetrische Mischtechnik vor Ort",
      "TL BEB-StB (höchste Verkehrsklasse für Erhaltungsbau)",
      "2-Stunden-Verkehrsfreigabe",
      "Frost-/tausalzbeständig",
      "Großflächig einsetzbar",
      "Kein Restbeton",
    ],
    tdsUrl: "https://www.korodur.de/downloads/tds-rapid-set-schnellbeton.pdf",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    belastbarkeitsStufe: 5,
    belastbarNach: "2 h",
    belastbarNachZusatz: "Verkehrsfreigabe",
    aussenbereich: true,
    systemProdukt: true,
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast", "staplerverkehr"],
  },

  // === NACHBEHANDLUNG (nicht in Sanierungs-Matrix) ===
  {
    id: "korocure",
    name: "KOROCURE",
    kategorie: "nachbehandlung",
    kurzbeschreibung: "Curing-Compound zur kontrollierten Nachbehandlung von Estrichflächen",
    normen: [
      "DIN EN 13813",
    ],
    technischeDaten: [
      { label: "Wirkung", wert: "Feuchtigkeitsretention / Curing" },
      { label: "Anwendung", wert: "Sprüh- oder Rollauftrag" },
    ],
    besonderheiten: [
      "Kontrollierte Aushärtung",
      "Für Außenflächen geeignet",
      "Reduziert Schwindrisse",
    ],
    eignungen: ["grossflaechige-sanierung", "aussenbereich"],
    zeitKategorie: "normal",
  },
  {
    id: "koromineral-cure",
    name: "KOROMINERAL CURE",
    kategorie: "nachbehandlung",
    kurzbeschreibung: "Oberflächenschutz mittels Silikatisierung",
    normen: [
      "DIN EN 13813",
    ],
    technischeDaten: [
      { label: "Wirkung", wert: "Silikatisierung / Imprägnierung" },
      { label: "Anwendung", wert: "Auf frischen Estrich" },
    ],
    besonderheiten: [
      "Erhöht Oberflächenhärte",
      "Reduziert Staubbildung",
      "Verbessert chemische Beständigkeit",
    ],
    eignungen: ["grossflaechige-sanierung", "chemikalien"],
    zeitKategorie: "normal",
  },
  {
    id: "korotex",
    name: "KOROTEX",
    kategorie: "nachbehandlung",
    kurzbeschreibung: "Curing-Mittel zur kontrollierten Aushärtung",
    normen: [
      "DIN EN 13813",
    ],
    technischeDaten: [
      { label: "Wirkung", wert: "Feuchtigkeitsretention / Curing" },
      { label: "Anwendung", wert: "Sprühauftrag" },
    ],
    besonderheiten: [
      "Kontrollierte Aushärtung",
      "Reduziert Schwindrisse",
      "Sprühbare Anwendung",
    ],
    eignungen: ["grossflaechige-sanierung"],
    zeitKategorie: "normal",
  },
];

// ===========================================================================
// Lösungsfinder V2.5 — Filter-Ableitung
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Ersetzt den früheren heuristischen Adapter (loesungsfinderV25Adapter.ts).
// `wiederbelastungInH` + `aussenGeeignet` werden DETERMINISTISCH aus den
// kuratierten Matrix-Feldern (belastbarNach, aussenbereich) abgeleitet;
// `belastungenAbgedeckt` + `systemBegleitprodukte` stehen explizit am Produkt
// (DRAFT, Sign-off Frank offen). `flaechenkategorienGeeignet` folgt einer
// dokumentierten Produkt-Logik (s. u.).
// ===========================================================================

/** Parst die kuratierte `belastbarNach`-Angabe ("24 h", "1 h", "3 d", "30 min", "6 h") in Stunden. */
export function wiederbelastungInHVon(belastbarNach?: string): number {
  if (!belastbarNach) return Infinity;
  const m = belastbarNach.trim().match(/^([\d.,]+)\s*(min|h|d)$/i);
  if (!m) return Infinity;
  const wert = parseFloat(m[1].replace(",", "."));
  const einheit = m[2].toLowerCase();
  if (einheit === "min") return wert / 60;
  if (einheit === "d") return wert * 24;
  return wert; // "h"
}

// Schnellreparaturmörtel: punktuelle Schadstellen + mittlere Flächen, keine
// Großflächen-Eignung. Asphalt-Reparatur deckt zusätzlich Großflächen ab
// (Verkehrsflächen, Schichtdicke bis 600 mm). Alle übrigen (Estriche, System-
// Schnellbetone, DOT Europe CONCRETE MIX) sind Flächen-Produkte (mittel/gross).
// DRAFT-Logik — Sign-off Produktmanagement offen.
const FLAECHEN_PUNKTUELL_MITTEL = new Set<string>([
  "rapid-set-cement-all",
  "rapid-set-mortar-mix",
  "rapid-set-mortar-mix-dur",
]);
const FLAECHEN_PUNKTUELL_MITTEL_GROSS = new Set<string>(["asphalt-repair-mix"]);

/** Flächengrößen, die das Produkt bedient (Step-1-Filter des Lösungsfinders). */
export function flaechenkategorienVon(p: Produkt): Flaechenkategorie[] {
  if (FLAECHEN_PUNKTUELL_MITTEL_GROSS.has(p.id)) return ["punktuell", "mittel", "gross"];
  if (FLAECHEN_PUNKTUELL_MITTEL.has(p.id)) return ["punktuell", "mittel"];
  return ["mittel", "gross"];
}

// Reine Außenprodukte — nicht innen relevant. ASPHALT REPAIR MIX ist ein
// Verkehrsflächen-Reparaturmaterial (Straßen, Zufahrten, Außenlager), das
// innen fachlich keinen Sinn ergibt. Steffi-Entscheidung 2026-06-01:
// "nur außen, realistische Tags" statt Vollausschluss aus dem Funnel.
const NUR_AUSSEN = new Set<string>(["asphalt-repair-mix"]);

/** Innen-Eignung. Default true; reine Außenprodukte ausgenommen. */
export function innenGeeignetVon(p: Produkt): boolean {
  return !NUR_AUSSEN.has(p.id);
}

/** Vollständige V2.5-Filter-Eigenschaften eines Produkts (ersetzt den Adapter). */
export function produktFilterV25(p: Produkt): ProduktFilterV25 {
  return {
    flaechenkategorienGeeignet: flaechenkategorienVon(p),
    innenGeeignet: innenGeeignetVon(p),
    aussenGeeignet: p.aussenbereich ?? false,
    belastungenAbgedeckt: p.belastungenAbgedeckt ?? [],
    wiederbelastungInH: wiederbelastungInHVon(p.belastbarNach),
    systemBegleitprodukte: p.systemBegleitprodukte ?? [],
  };
}

export function getProduktByName(name: string): Produkt | undefined {
  return produkte.find(
    (p) => p.name === name || p.name.toLowerCase() === name.toLowerCase()
  );
}

export function getProduktById(id: string): Produkt | undefined {
  return produkte.find((p) => p.id === id);
}

export function getProdukteByNames(names: string[]): Produkt[] {
  return names
    .map((name) => getProduktByName(name))
    .filter((p): p is Produkt => p !== undefined);
}

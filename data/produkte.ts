import type {
  BelastungsTag,
  Flaechenkategorie,
  Produktbereich,
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
  /** korodur.de-Bereich (Website-Integration 2026-06-11). Reine Website-
   *  Navigation/Gruppierung — wird NICHT vom Lösungsfinder oder der
   *  Anwendungsmatrix ausgewertet. Quelle: KORODUR-website-Scrape
   *  (01_analyse/scraped_content/produktuebersicht.md). */
  bereich: Produktbereich;
  /** Produktgruppe innerhalb des Bereichs (Bereichsseiten-Gliederung).
   *  Kuratierte Zuordnung mit Sign-off, NICHT aus der Alt-Site übernommen —
   *  siehe docs/website-migration/zuordnung-<bereich>.md. Muss in
   *  `bereiche.ts` unter `produktgruppen` des Bereichs gelistet sein. */
  produktgruppe?: string;
  kurzbeschreibung: string;
  /** Längerer Beschreibungstext (2-4 Sätze) für die Produktdetailseite.
   *  SEO-relevant: technischer Inhalt als HTML statt nur im TDS-PDF. */
  beschreibung?: string;
  /** Lieferbare Qualitäten/Varianten (z. B. SVS 3, SVS 1,5, metallisch).
   *  Entscheidung 2026-06-11: Varianten am Stammprodukt statt eigener
   *  Produktseiten — siehe zuordnung-industrieboden.md. */
  varianten?: { name: string; qualitaetsklasse?: string; hinweis?: string }[];
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
  /** Norm-/Klassifizierungs-String für die Matrix-Anzeige (z. B. "DIN 18560-7", "EN 1504-3", "TL BEB-StB"). Komplementär zur qualitaetsklasse. */
  norm?: string;
  /** Druckfestigkeit-Anker-Wert für die Matrix-Anzeige (z. B. "60 N/mm²"). Soll Planer-Persona ohne TDS-Klick einen Specifying-Wert geben. */
  druckfestigkeit?: string;
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
    bereich: "industrieboden",
    produktgruppe: "schnellestrich",
    varianten: [
      { name: "NEODUR HE 60 rapid SVS 3", qualitaetsklasse: "CT-C60-F8-A3" },
      { name: "NEODUR HE 60 rapid SVS 1,5", qualitaetsklasse: "CT-C60-F8-A1,5" },
      { name: "NEODUR HE 60 rapid metallisch", qualitaetsklasse: "CT-C60-F8-A3", hinweis: "Hartstoffgruppe M" },
    ],
    websiteUrl: "https://www.korodur.de/produkt/neodur-he-60-rapid/",
    name: "NEODUR HE 60 rapid",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoff-Schnellestrich",
    schichtdicke: "ab 10 mm",
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
      { label: "Begehbar nach", wert: "ca. 3 h" },
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
      schichtaufbau: "Einschichtig ab 10 mm auf Haftbrücke KORODUR HB 5 rapid.",
      verarbeitungszeit: "Ca. 20–30 Minuten bei 20 °C.",
      aushaertezeit: "Begehbar nach ca. 3 h. Nutzbar nach ca. 24 h.",
      besonderheiten: "Verarbeitungstemperatur: +5 °C bis +30 °C. Nicht auf gefrorenem Untergrund verarbeiten.",
    },
    tdsUrl: "https://www.korodur.de/wp-content/uploads/NEODUR_HE_60_rapid_de.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten", "chemikalien", "kurze-sperrzeit"],
    bild: "/images/produkte/neodur-he-60-rapid.png",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["chemikalienbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "60 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "24 h",
    belastbarNachZusatz: "begehbar ca. 3 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "chemie-treibstoff", "frost-tausalz", "staplerverkehr"],
    systemBegleitprodukte: ["korodur-hb-5-rapid"],
  },
  {
    id: "neodur-he-65",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    varianten: [
      { name: "NEODUR HE 65 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 65 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Hartstoffgruppe KS" },
      { name: "NEODUR HE 65 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 65 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Hartstoffgruppe M" },
    ],
    websiteUrl: "https://www.korodur.de/produkt/neodur-he-65/",
    name: "NEODUR HE 65",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich",
    schichtdicke: "A: 15/10/8 mm · KS: 6/5/4 mm",
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
      { label: "Schichtdicke", wert: "DIN 18560-7: A 15/10/8 mm · KS 6/5/4 mm" },
    ],
    besonderheiten: [
      "Höchste Verschleißfestigkeit",
      "Mit Silosystem verarbeitbar",
      "Wirtschaftlich auf Großflächen",
      "Kraftschlüssiger Verbund",
    ],
    tdsUrl: "https://www.korodur.de/wp-content/uploads/NEODUR_HE_65_de.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten"],
    bild: "/images/produkte/neodur-he-65.png",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "70 N/mm²",
    belastbarkeitsStufe: 5,
    aussenbereich: false,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr", "chemie-treibstoff"],
  },
  {
    id: "neodur-he-65-plus",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    varianten: [
      { name: "NEODUR HE 65 plus SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
    ],
    websiteUrl: "https://www.korodur.de/produkt/neodur-he-65-plus/",
    name: "NEODUR HE 65 Plus",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich",
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
    tdsUrl: "https://www.korodur.de/wp-content/uploads/NEODUR_HE_65_Plus_de.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten", "chemikalien", "tausalz", "aussenbereich"],
    zeitKategorie: "normal",
    zusatzfunktionen: ["chemikalienbestaendigkeit", "tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "70 N/mm²",
    belastbarkeitsStufe: 5,
    aussenbereich: true,
    whgZulassung: true,
    belastbarNach: "7 d", // 7 Tage Wiederbelastbarkeit (Steffi 2026-06-09); kein Schnellprodukt
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "chemie-treibstoff", "frost-tausalz", "staplerverkehr", "whg"],
  },
  {
    id: "neodur-he-40",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    varianten: [
      { name: "NEODUR HE 40/8", qualitaetsklasse: "CT-C40-F7-A6" },
    ],
    websiteUrl: "https://www.korodur.de/produkt/neodur-he-40-und-he-40-8/",
    name: "NEODUR HE 40",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich",
    schichtdicke: "8–15 / 15–35 / 25–50 mm",
    qualitaetsklasse: "CT-C40-F6-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560-7",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 6 N/mm²" },
      { label: "Verschleißwiderstand", wert: "A6 (≤ 6 cm³/50 cm²)" },
      { label: "Schichtdicke", wert: "8–15 mm frisch auf frisch; 15–35 mm im Verbund; HE 40/8 25–50 mm" },
    ],
    besonderheiten: [
      "Hohe Verschleißfestigkeit",
      "Kraftschlüssiger Verbund (DIN 18560-7)",
      "Wirtschaftliche Hartstoff-Lösung",
      "Innen und Außen",
    ],
    tdsUrl: "https://www.korodur.de/wp-content/uploads/NEODUR_HE_40_de.pdf",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "40 N/mm²",
    belastbarkeitsStufe: 5,
    aussenbereich: true,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr", "chemie-treibstoff"],
  },
  {
    id: "neodur-level",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    websiteUrl: "https://www.korodur.de/produkt/neodur-level/",
    name: "NEODUR Level",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, schnellerhärtender Dünnestrich",
    schichtdicke: "4–30 mm",
    qualitaetsklasse: "CT-C40-F8-AR0,5",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN 18202 Zeile 3 (erhöhte Ebenheit)",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "F8" },
      { label: "Verschleißwiderstand", wert: "AR 0,5" },
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
      schichtaufbau: "Einschichtig 4–30 mm auf Grundierung KORODUR PC. Empfohlen 6–10 mm.",
      verarbeitungszeit: "Ca. 20–30 Minuten bei 20 °C.",
      aushaertezeit: "Leicht belastbar nach ca. 24 h. Voll belastbar nach ca. 3 Tagen.",
      besonderheiten: "Maschinelle Verarbeitung möglich. Für große Flächen mit Pumptechnik geeignet.",
    },
    tdsUrl: "https://www.korodur.de/wp-content/uploads/NEODUR_Level_de.pdf",
    eignungen: ["grossflaechige-sanierung", "leichte-nutzung", "rollende-lasten"],
    bild: "/images/produkte/neodur-level.png",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    norm: "DIN EN 13813",
    druckfestigkeit: "40 N/mm²",
    belastbarkeitsStufe: 4,
    belastbarNach: "3 d",
    belastbarNachZusatz: "leicht belastbar 24 h",
    aussenbereich: false,
    belastungenAbgedeckt: ["verschleiss", "staplerverkehr", "optik"],
    systemBegleitprodukte: ["korodur-pc"],
  },
  {
    id: "tru-self-leveling",
    bereich: "sichtestrich",
    name: "TRU Self-Leveling",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, geschliffener dekorativer Sichtestrich",
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
    tdsUrl: "https://www.korodur.de/wp-content/uploads/TRU_Self_Leveling_de.pdf",
    eignungen: ["grossflaechige-sanierung", "leichte-nutzung"],
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 13813",
    druckfestigkeit: "40 N/mm²",
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
    bereich: "industrieboden",
    produktgruppe: "untergrund-haftbruecken",
    websiteUrl: "https://www.korodur.de/produkt/korodur-hb-5-rapid/",
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
    bereich: "industrieboden",
    produktgruppe: "untergrund-haftbruecken",
    websiteUrl: "https://www.korodur.de/produkt/korodur-pc/",
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
    bereich: "rapid-set",
    websiteUrl: "https://www.korodur.de/bereiche/rapid-set/",
    name: "Rapid Set CEMENT ALL",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturmörtel",
    schichtdicke: "Boden 10–100 mm",
    qualitaetsklasse: "C55/67",
    normen: [
      "ASTM C928",
      "DIN EN 1015-11",
      "DIN EN 196-3",
    ],
    technischeDaten: [
      { label: "Qualität", wert: "C55/67" },
      { label: "Druckfestigkeit (60 min)", wert: "> 20 N/mm²" },
      { label: "Druckfestigkeit (28 d)", wert: "> 62 N/mm²" },
      { label: "Gängige Einbaudicken", wert: "Boden 10–100 mm; Decke 5–10 mm; Wand 5–15 mm" },
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
      schichtaufbau: "Boden 10–100 mm, Decke/über Kopf 5–10 mm, Wand 5–15 mm.",
      verarbeitungszeit: "Ca. 15 Minuten bei 20 °C.",
      aushaertezeit: "Begehbar nach ca. 15 min. Voll belastbar nach ca. 1 h.",
      besonderheiten: "Kein Haftvermittler erforderlich. Verarbeitung bei +5 °C bis +35 °C.",
    },
    tdsUrl: "https://www.korodur.de/wp-content/uploads/2025/03/Cement_All_de.pdf",
    eignungen: ["kleine-reparatur", "kurze-sperrzeit", "aussenbereich"],
    bild: "/images/produkte/rapid-set-cement-all.png",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 1015-11",
    druckfestigkeit: "> 62 N/mm²",
    belastbarkeitsStufe: 3,
    belastbarNach: "1 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz", "verschleiss", "chemie-aggressiv"],
  },
  {
    id: "rapid-set-mortar-mix",
    bereich: "rapid-set",
    websiteUrl: "https://www.korodur.de/bereiche/rapid-set/",
    name: "Rapid Set MORTAR MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturmörtel",
    schichtdicke: "10–150 mm",
    qualitaetsklasse: "C45/55",
    normen: [
      "ASTM C928",
      "DIN EN 1015-11",
      "DIN EN 196-3",
    ],
    technischeDaten: [
      { label: "Qualität", wert: "C45/55" },
      { label: "Druckfestigkeit (60 min)", wert: "> 17 N/mm²" },
      { label: "Druckfestigkeit (28 d)", wert: "> 50 N/mm²" },
      { label: "Gängige Einbaudicken", wert: "Boden 10–150 mm; Decke i. M. 15 mm; Wand i. M. 20 mm" },
      { label: "Verarbeitbar", wert: "pastös bis plastisch" },
      { label: "Voll belastbar nach", wert: "ca. 1 h" },
    ],
    besonderheiten: [
      "Schwundneutral",
      "Kein Haftvermittler nötig",
      "Pastöse bis steife Konsistenz einstellbar",
      "Nur mit Wasser mischen",
    ],
    tdsUrl: "https://www.korodur.de/wp-content/uploads/2025/03/Mortar_Mix_de.pdf",
    eignungen: ["kleine-reparatur", "kurze-sperrzeit"],
    bild: "/images/produkte/rapid-set-mortar-mix.png",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 1015-11",
    druckfestigkeit: "> 50 N/mm²",
    belastbarkeitsStufe: 3,
    belastbarNach: "1 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz", "chemie-aggressiv"],
  },
  {
    id: "rapid-set-mortar-mix-dur",
    bereich: "rapid-set",
    websiteUrl: "https://www.korodur.de/bereiche/rapid-set/",
    name: "Rapid Set MORTAR MIX DUR",
    kategorie: "schnellzement",
    kurzbeschreibung: "Schnellreparaturmörtel mit Hartstoff DIN 1100 A",
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
    tdsUrl: "https://www.korodur.de/wp-content/uploads/2025/03/Mortar_Mix_de.pdf",
    eignungen: ["kleine-reparatur", "schwerlast", "punktlasten", "kurze-sperrzeit"],
    zeitKategorie: "schnell",
    inSanierungsMatrix: false,
    norm: "DIN 1100 A",
    druckfestigkeit: "45 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "1 h",
    aussenbereich: true,
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr", "frost-tausalz"],
  },
  {
    id: "asphalt-repair-mix",
    bereich: "rapid-set",
    name: "ASPHALT REPAIR MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Schnellreparaturmaterial für Asphaltflächen",
    schichtdicke: "30–600 mm",
    normen: [
      "DIN EN 1015-11",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit (30 min)", wert: "ca. 15 N/mm²" },
      { label: "Druckfestigkeit (1 h)", wert: "ca. 22 N/mm²" },
      { label: "Druckfestigkeit (28 d)", wert: "ca. 38 N/mm²" },
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
    tdsUrl: "https://www.korodur.de/wp-content/uploads/Asphalt-Repair-Mix_de.pdf",
    eignungen: ["kleine-reparatur", "grossflaechige-sanierung", "schwerlast", "rollende-lasten", "kurze-sperrzeit", "aussenbereich"],
    bild: "/images/produkte/asphalt-repair-mix.png",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 1015-11",
    druckfestigkeit: "38 N/mm²",
    belastbarkeitsStufe: 3,
    belastbarNach: "30 min",
    belastbarNachZusatz: "Verkehrsfreigabe",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast", "chemie-aggressiv"],
  },
  {
    id: "dot-europe-concrete-mix",
    bereich: "rapid-set",
    name: "DOT Europe CONCRETE MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturbeton, DIN EN 1504-3",
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
      { label: "Druckfestigkeit (28 d)", wert: "ca. ≥ 60 N/mm²" },
      { label: "Biegezugfestigkeit (28 d)", wert: "ca. ≥ 6,5 N/mm²" },
      { label: "Belastbar", wert: "ca. 60 min nach Erstarrungsende" },
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
    tdsUrl: "https://www.korodur.de/wp-content/uploads/2025/03/DOT_Europe_Concrete_Mix_de.pdf",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "EN 1504-3",
    druckfestigkeit: "≥ 60 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "60 min",
    belastbarNachZusatz: "nach Erstarrungsende",
    aussenbereich: true,
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast", "verschleiss"],
  },
  {
    id: "korocrete",
    bereich: "spezialbaustoffe",
    name: "KOROCRETE Schnellbeton",
    kategorie: "schnellzement",
    kurzbeschreibung: "Volumetrisch gemischter Schnellbeton (FSCem-Basis)",
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
      { label: "Nutzung / Verkehrsfreigabe", wert: "wenige Stunden, rezepturabhängig" },
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
    tdsUrl: "https://www.korodur.de/wp-content/uploads/2023/02/KOROCRETE_Schnellbeton_de.pdf",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 206",
    druckfestigkeit: "65 N/mm²",
    belastbarkeitsStufe: 4,
    belastbarNach: "wenige h",
    belastbarNachZusatz: "rezepturabhängig",
    aussenbereich: true,
    systemProdukt: true,
    belastungenAbgedeckt: ["schwerlast", "frost-tausalz"],
  },
  {
    id: "rapid-set-schnellbeton",
    bereich: "rapid-set",
    websiteUrl: "https://www.korodur.de/bereiche/rapid-set/",
    name: "Rapid Set Schnellbeton",
    kategorie: "schnellzement",
    kurzbeschreibung: "Volumetrisch gemischter Schnellbeton (Rapid Set), TL BEB-StB",
    schichtdicke: "projektabhängig",
    qualitaetsklasse: "C40/50",
    normen: [
      "TL BEB-StB",
    ],
    technischeDaten: [
      { label: "Bindemittel", wert: "Rapid Set (Calcium-Sulfo-Aluminat-Zement)" },
      { label: "Qualität", wert: "C40/50" },
      { label: "Druckfestigkeit (2 h)", wert: "≥ 20 MPa" },
      { label: "Druckfestigkeit (12 h)", wert: "≥ 30 MPa" },
      { label: "Druckfestigkeit (28 d)", wert: "≥ 45 MPa" },
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
    tdsUrl: "https://www.korodur.de/wp-content/uploads/System_Rapid_Set_Concrete_de.pdf",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "TL BEB-StB",
    druckfestigkeit: "≥ 45 MPa",
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
    bereich: "industrieboden",
    produktgruppe: "nachbehandlung",
    beschreibung: "Zum Schutz des jungen Betons sind gem. DIN EN 13670 in Verbindung mit DIN 1045-3 Zwischen-Nachbehandlungsmaßnahmen erforderlich: Die Zwischen-Nachbehandlung schützt das im Beton enthaltene Wasser vor Verdunstung, damit der Zement vollständig hydratisieren kann. Beim Einsatz als Grundierung für nachfolgende Hartstoffbeschichtungen wird KOROCURE unmittelbar nach Begehbarkeit des Betons aufgetragen.",
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
    bereich: "industrieboden",
    produktgruppe: "nachbehandlung",
    websiteUrl: "https://www.korodur.de/produkt/koromineral-cure/",
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
    bereich: "industrieboden",
    produktgruppe: "nachbehandlung",
    beschreibung: "Gemäß DIN 18353 (Estricharbeiten) und DIN 18560 (Estriche im Bauwesen) müssen Estriche vor ungleichmäßigem und zu raschem Austrocknen geschützt werden. KOROTEX Nachbehandlung ist besonders wichtig bei erhöhten Temperaturen, niedriger Luftfeuchtigkeit und starker Zugluft; das Aufsprühen ist die rationellste Methode bei frisch verlegten Estrichflächen.",
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

  // === WEBSITE-MIGRATION STUFE 2, INDUSTRIEBODEN TEIL 1 (2026-06-11) ===
  // Quellen: KORODUR-website-Scrape (extraktion-industrieboden-teil1.json)
  // + Normen produkte.xlsx (Qualitaetsklassen). Zuordnung mit Sign-off:
  // docs/website-migration/zuordnung-industrieboden.md
  // Fehlende Werte bewusst leer (nie erfinden); TDS-Vervollstaendigung folgt.
  {
    id: "neodur-he-3",
    name: "NEODUR HE 3",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    kurzbeschreibung: "Zementgebundener Trockenbaustoff für Industrieböden im Einstreuverfahren",
    beschreibung: "NEODUR HE 3 gem. DIN 18557 (Werkmörtel) und DIN EN 13813, basierend auf Hartstoffen gem. DIN 1100: gebrauchsfertiger, zementgebundener Trockenbaustoff zur Herstellung von Industrieböden im Einstreuverfahren. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: ["DIN EN 13813", "DIN 1100", "DIN 18557"],
    technischeDaten: [
      { label: "Hartstoffgruppe (DIN 1100)", wert: "A" },
      { label: "Schleifverschleiß", wert: "≤ 5 cm³/50 cm²" },
    ],
    besonderheiten: [
      "Einstreuverfahren (trocken auf frische Estrich-/Betonoberflächen)",
      "Auch farbig lieferbar",
      "Umweltproduktdeklaration (Gruppen-EPD) verfügbar",
    ],
    varianten: [
      { name: "NEODUR HE 3 SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
      { name: "NEODUR HE 3 SVS 1,5", qualitaetsklasse: "CT-C70-F9-A1,5", hinweis: "Hartstoffgruppe KS" },
      { name: "NEODUR HE 3 SVS 1,5 extra", qualitaetsklasse: "CT-C70-F9-A1,5" },
      { name: "NEODUR HE 3 metallisch", qualitaetsklasse: "CT-C80-F11-A3", hinweis: "Hartstoffgruppe M" },
    ],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-3-green",
    name: "NEODUR HE 3 green",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    kurzbeschreibung: "Ressourcenschonende Variante von NEODUR HE 3 mit bis zu 30 % reduziertem CO₂-Ausstoß",
    beschreibung: "Mit der ressourcenschonenden Variante NEODUR HE 3 green kann der CO₂-Ausstoß in der Herstellung um bis zu 30 Prozent reduziert werden. Für Bauherren, Architekten, Planer und Bauunternehmen stehen entsprechende Umweltproduktdeklarationen (EPD) bereit.",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: ["DIN 1100"],
    technischeDaten: [
      { label: "Hartstoffgruppe (DIN 1100)", wert: "A" },
      { label: "Schleifverschleiß", wert: "≤ 5 cm³/50 cm²" },
      { label: "CO₂-Reduktion", wert: "bis zu 30 %" },
    ],
    besonderheiten: [
      "Bis zu 30 % CO₂-Reduktion in der Herstellung",
      "Produkt-EPD verfügbar",
      "Einstreuverfahren",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-2",
    name: "NEODUR HE 2",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    kurzbeschreibung: "Zementgebundener Trockenbaustoff für Industrieböden im Einstreuverfahren",
    beschreibung: "NEODUR HE 2 gem. DIN 18557 (Werkmörtel) und DIN EN 13813: gebrauchsfertiger, zementgebundener Trockenbaustoff zur Herstellung von Industrieböden im Einstreuverfahren. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A8",
    normen: ["DIN EN 13813", "DIN 18557"],
    technischeDaten: [
      { label: "Korngröße", wert: "0–3 mm" },
      { label: "Druckfestigkeit", wert: "70 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "9 N/mm²" },
      { label: "Schleifverschleiß", wert: "≤ 8 cm³/50 cm²" },
    ],
    besonderheiten: ["Einstreuverfahren", "Auch farbig lieferbar"],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-0-4",
    name: "KORODUR 0/4",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffe",
    kurzbeschreibung: "KORODUR Hartstoff (ohne Bindemittel) der Gruppe A nach DIN 1100",
    beschreibung: "Hartstoff für die Herstellung hochbeanspruchter Industrieböden, z. B. Parkhäuser, Industriehallen, Montagehallen, Flugzeughallen, Werkstätten und Hochregallager. Für innen und außen.",
    qualitaetsklasse: "CT-C70-F10-A6",
    normen: ["DIN 1100"],
    technischeDaten: [
      { label: "Hartstoffgruppe (DIN 1100)", wert: "A" },
      { label: "Schleifverschleiß", wert: "≤ 5 cm³/50 cm²" },
    ],
    besonderheiten: ["Hartstoff ohne Bindemittel"],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-vs-0-5",
    name: "KORODUR VS 0/5",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffe",
    kurzbeschreibung: "KORODUR Hartstoff (ohne Bindemittel) der Gruppe A nach DIN 1100, Basis u. a. für NEODUR HE 65",
    beschreibung: "KORODUR Hartstoff ohne Bindemittel gem. DIN 1100. Dient als Hartstoffbasis für NEODUR HE 65 und als Hartstoffzuschlag für verschleißfeste Nutzestriche, z. B. mit KORODUR FSCem.",
    qualitaetsklasse: "CT-C70-F10-A6",
    normen: ["DIN 1100"],
    technischeDaten: [
      { label: "Hartstoffgruppe (DIN 1100)", wert: "A" },
      { label: "Schleifverschleiß", wert: "≤ 5 cm³/50 cm²" },
    ],
    besonderheiten: ["Hartstoff ohne Bindemittel", "Hartstoffbasis für NEODUR HE 65"],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-wh-spezial",
    name: "KORODUR WH-Spezial",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffe",
    kurzbeschreibung: "KORODUR Hartstoff (ohne Bindemittel) der Gruppe A nach DIN 1100 für hochbeanspruchte Industrieböden",
    beschreibung: "Hartstoff für die Herstellung hochbeanspruchter Industrieböden. Hartstoffbasis für NEODUR HE 65 SVS 3 und NEODUR HE 65 plus SVS 3. Für innen und außen.",
    qualitaetsklasse: "CT-C70-F10-A3",
    normen: ["DIN 1100"],
    technischeDaten: [
      { label: "Hartstoffgruppe (DIN 1100)", wert: "A" },
      { label: "Schleifverschleiß", wert: "≤ 3 cm³/50 cm²" },
    ],
    besonderheiten: ["Hartstoff ohne Bindemittel"],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-wh-metallisch",
    name: "KORODUR WH-metallisch",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffe",
    kurzbeschreibung: "Metallischer KORODUR Hartstoff (Gruppe M nach DIN 1100) für Panzerestriche und schweren Eisenräderverkehr",
    beschreibung: "Metallischer Hartstoff für hochbeanspruchte Industrieböden, besonders geeignet für schweren Eisenräderverkehr, Koller und hartes Absetzen scharfkantiger Werkstücke, zur Herstellung sogenannter Panzerestriche. Basis für NEODUR HE 3 metallisch und NEODUR HE 65 metallisch. Für innen und außen.",
    qualitaetsklasse: "CT-C60-F12-A3",
    normen: ["DIN 1100"],
    technischeDaten: [
      { label: "Hartstoffgruppe (DIN 1100)", wert: "M" },
      { label: "Schleifverschleiß", wert: "≤ 3 cm³/50 cm²" },
    ],
    besonderheiten: ["Metallischer Hartstoff", "Für sogenannte Panzerestriche"],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-diamantbeton",
    name: "KORODUR Diamantbeton",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffe",
    kurzbeschreibung: "KORODUR Hartstoff der Gruppe KS nach DIN 1100 für höchstmöglichen Abnutzungswiderstand",
    beschreibung: "Hartstoff für die Herstellung hochbeanspruchter Industrieböden bei höchstmöglichem Abnutzungswiderstand. Hartstoffbasis für NEODUR HE 65 SVS 1,5. Für innen und außen.",
    qualitaetsklasse: "CT-C70-F10-A1,5",
    normen: ["DIN 1100"],
    technischeDaten: [
      { label: "Hartstoffgruppe (DIN 1100)", wert: "KS" },
      { label: "Schleifverschleiß", wert: "≤ 1,5 cm³/50 cm²" },
    ],
    besonderheiten: ["Höchstmöglicher Abnutzungswiderstand (Gruppe KS)"],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-fscem",
    name: "KORODUR FSCem",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "schnellestrich",
    kurzbeschreibung: "Zementäres, volumenstabiles, schwindarmes Schnellestrich-Bindemittel auf ternärer Basis",
    beschreibung: "KORODUR FSCem ist ein zementäres, volumenstabiles, schwindarmes Schnellestrich-Bindemittel auf ternärer Basis zur Herstellung hochbelastbarer, schnell nutzbarer und verlegereifer Estriche gem. DIN 18560 und EN 13813. Für schnell belegbare Zementestriche im Verbund, auf Trennschicht, auf Dämmschicht und als Heizestrich, innen und außen. Auch zum Ausbessern und Sanieren alter Betonböden geeignet.",
    qualitaetsklasse: "CT-C50-F7 / CT-C40-F6",
    normen: ["DIN 18560", "DIN EN 13813", "DIN 18560-1"],
    technischeDaten: [
      { label: "Mischungsverhältnis (CT-C50-F7)", wert: "1:4 Gewichtsteile (75 kg FSCem : 300 kg Estrichsand A8–B8), W/Z ca. 0,42" },
      { label: "Mischungsverhältnis (CT-C40-F6)", wert: "1:5 Gewichtsteile (60 kg FSCem : 300 kg Estrichsand A8–B8), W/Z ca. 0,40" },
      { label: "Restfeuchte (CM-Messung)", wert: "nach 24 h ca. 5,9 %, nach 3 Tagen ca. 1,9 %, nach 28 Tagen ca. 1,3 %" },
      { label: "Schwindklasse (DIN 18560-1)", wert: "SW 1, schwindarm (< 0,2 mm/m)" },
    ],
    besonderheiten: [
      "Ternäres Bindemittel (Estrichsand bauseits)",
      "Schnell belegbar",
      "Verschleißfeste Nutzestriche mit Hartstoffzuschlag KORODUR VS 0/5 herstellbar",
    ],
    zeitKategorie: "schnell",
  },
  {
    id: "korodur-fscem-screed",
    name: "KORODUR FSCem Screed",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "schnellestrich",
    kurzbeschreibung: "Volumenstabiler, schwindarmer Schnellestrich-Trockenmörtel, nach 3 Tagen belegbar",
    beschreibung: "KORODUR FSCem Screed ist ein volumenstabiler, schwindarmer Schnellestrich-Trockenmörtel auf ternärer Basis zur Herstellung schnell verlegereifer Estriche für Schichtdicken bis 120 mm gem. DIN 18560 und DIN EN 13813. Bereits nach 3 Tagen belegbar, muss grundsätzlich belegt werden. Auch zum Ausbessern und Sanieren alter Betonböden geeignet.",
    schichtdicke: "bis 120 mm",
    qualitaetsklasse: "CT-C40-F6",
    normen: ["DIN 18560", "DIN EN 13813", "DIN EN 13892-2"],
    technischeDaten: [
      { label: "Körnung", wert: "0–6 mm" },
      { label: "Druckfestigkeit (DIN EN 13892-2)", wert: "nach 1 Tag ca. 20 N/mm², nach 28 Tagen ca. 40 N/mm²" },
      { label: "Biegezugfestigkeit (DIN EN 13892-2)", wert: "nach 1 Tag ca. 4 N/mm², nach 28 Tagen ca. 6 N/mm²" },
      { label: "Schwindklasse (DIN 18560-1)", wert: "SW 1, schwindarm (< 0,2 mm/m)" },
      { label: "Belegbar", wert: "nach 3 Tagen" },
    ],
    besonderheiten: [
      "Gebrauchsfertiger Trockenmörtel",
      "Muss grundsätzlich belegt werden",
      "Umweltproduktdeklaration (Gruppen-EPD) verfügbar",
    ],
    zeitKategorie: "schnell",
  },
  {
    id: "neodur-level-au",
    name: "NEODUR Level AU",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    kurzbeschreibung: "Schnellerhärtende, polymermodifizierte Bodenausgleichsmasse für 5 bis 50 mm",
    beschreibung: "NEODUR Level AU ist eine zementgebundene, mineralische, schnellerhärtende, polymermodifizierte, dünnschichtige Bodenausgleichsmasse für Schichtdicken von 5 bis 50 mm. Im Verbund auf zementärem Untergrund, idealer Untergrund für Linoleum, Textil- und PVC-Beläge, Laminat, Keramik und Naturstein.",
    schichtdicke: "5–50 mm",
    qualitaetsklasse: "CT-C30-F5",
    normen: [],
    technischeDaten: [
      { label: "Verarbeitungszeit", wert: "bei +20 °C ca. 30 Minuten" },
      { label: "Begehbar", wert: "nach ca. 3–4 Stunden" },
      { label: "Druckfestigkeit", wert: "nach 28 Tagen ≥ 33 N/mm²" },
      { label: "Verbrauch", wert: "ca. 1,7 kg/mm/m²" },
    ],
    besonderheiten: ["Ausgleichsschicht unter NEODUR Level", "Grundierung mit KORODUR PC"],
    systemBegleitprodukte: ["korodur-pc"],
    zeitKategorie: "schnell",
  },
  {
    id: "rapid-set-levelflor",
    name: "Rapid Set LevelFlor",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    kurzbeschreibung: "Schnellerhärtende, selbstverlaufende Ausgleichsmasse auf Rapid-Set-Zementtechnologie für innen und außen",
    beschreibung: "Rapid Set LevelFlor ist eine auf spezieller Zementtechnologie basierende, selbstverlaufende Ausgleichsmasse für innen und außen im Wohnungs- und Industriebau. Eine finale Deckschicht kann nach 6 bis 16 Stunden (bei +20 °C) aufgebracht werden. Für Neubau und Sanierung geeignet, muss grundsätzlich belegt werden.",
    schichtdicke: "bis 70 mm",
    qualitaetsklasse: "CT-C30-F6",
    normen: [],
    technischeDaten: [
      { label: "Verarbeitungszeit", wert: "30 Min." },
      { label: "Fließzeit", wert: "15 Min." },
      { label: "Druckfestigkeit (ASTM C-109 mod.)", wert: "nach 25 h ca. 20 N/mm², nach 7 Tagen ca. 24 N/mm², nach 28 Tagen ca. 34 N/mm²" },
      { label: "Biegezugfestigkeit (ASTM C-348)", wert: "nach 7 Tagen ca. 7,9 N/mm²" },
      { label: "Deckschicht aufbringbar", wert: "nach 6–16 Stunden (bei +20 °C)" },
    ],
    besonderheiten: [
      "Rapid-Set-Zementtechnologie",
      "Selbstverlaufend",
      "Muss grundsätzlich belegt werden",
    ],
    systemBegleitprodukte: ["korodur-txpk", "korodur-pc"],
    zeitKategorie: "schnell",
  },
  {
    id: "korodur-hb-5",
    name: "KORODUR HB 5",
    kategorie: "grundierung",
    bereich: "industrieboden",
    produktgruppe: "untergrund-haftbruecken",
    kurzbeschreibung: "Zementgebundene Haftbrücke für den kraftschlüssigen Verbund von Hartstoffestrichen auf erhärtetem Beton",
    beschreibung: "KORODUR HB 5 ist eine gebrauchsfertige, zementgebundene Haftbrücke für den kraftschlüssigen Verbund von KORODUR Hartstoffestrichen und zementgebundenen Estrichen aller Güteklassen auf erhärtetem Beton. Besonders bewährt im KORODUR-KOROTAN Industriebodensystem, unempfindlich gegen Untergrundfeuchte.",
    normen: [],
    technischeDaten: [{ label: "Verbrauch", wert: "ca. 2 kg/m²" }],
    besonderheiten: [
      "Unempfindlich gegen Untergrundfeuchte",
      "Für frische und zeitversetzte Verlegetechnik",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-txpk",
    name: "KORODUR TXPK",
    kategorie: "grundierung",
    bereich: "industrieboden",
    produktgruppe: "untergrund-haftbruecken",
    kurzbeschreibung: "Zweikomponentige Epoxidharz-Spezialgrundierung für selbstverlaufende Beschichtungen",
    beschreibung: "Epoxidharz-Spezialgrundierung, zweikomponentig, für selbstverlaufende Beschichtungen wie TRU Self-Leveling, LevelFlor und NEODUR Level sowie zur Grundierung von Beton- und Estrichflächen, bei denen mit nachträglicher, rückseitiger Feuchteeinwirkung gerechnet werden muss.",
    normen: [],
    technischeDaten: [
      { label: "Verbrauch", wert: "ca. 400–500 g/m² je nach Rauigkeit des Untergrundes" },
    ],
    besonderheiten: ["Zweikomponentig", "Geeignet bei rückseitiger Feuchteeinwirkung"],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-durop",
    name: "KORODUR DUROP",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "kunstharz-hartstoffe",
    kurzbeschreibung: "Synthetischer Hartstoff als Füll- und Abstreumaterial für Kunstharzbeschichtungen und -estriche",
    beschreibung: "Synthetische Hartstoffe des Produktsystems KORODUR DUROP werden überwiegend als Füll- und Abstreumaterial für Kunstharzbeschichtungen und Kunstharzestriche verwendet. DUROP verbessert die Griffigkeit und reduziert Rollgeräusche; im Straßenbau wurden bereits mehr als 1,5 Mio. m² Autobahnteilstrecken als kunstharzgebundene Dünnbeschichtung mit DUROP ausgeführt.",
    normen: [],
    technischeDaten: [{ label: "Härte nach Mohs", wert: "8" }],
    besonderheiten: ["Verschleißfest, rutschhemmend, polierresistent"],
    varianten: [
      { name: "DUROP 0,5/1", hinweis: "Körnung 0,5–1 mm" },
      { name: "DUROP 1/2", hinweis: "Körnung 1–2 mm" },
      { name: "DUROP 2/3", hinweis: "Körnung 2–3 mm" },
      { name: "DUROP 2/5", hinweis: "Körnung 2–5 mm" },
    ],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-robust",
    name: "KORODUR Robust",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "kunstharz-hartstoffe",
    kurzbeschreibung: "Synthetischer Hartstoff (Körnung 0–3 mm) als Füll- und Abstreumaterial für Kunstharzsysteme",
    beschreibung: "Mit den Produktsystemen KORODUR DUROP und KORODUR Robust stehen für hochwertige Kunstharzbeschichtungen und -estriche passende Füll- und Abstreumaterialien bereit.",
    normen: [],
    technischeDaten: [
      { label: "Körnung", wert: "0–3 mm" },
      { label: "Härte nach Mohs", wert: "7" },
    ],
    besonderheiten: [],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-silosystem",
    name: "KORODUR Silosystem",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "systeme",
    kurzbeschreibung: "Baustellensilo mit Misch- und Pumptechnik für die wirtschaftliche Verlegung von Hartstoffschichten",
    beschreibung: "Das KORODUR Silosystem ermöglicht die wirtschaftliche Verlegung von KORODUR Hartstoffschichten durch rationelle Arbeitstechnik: Siloware (z. B. NEODUR HE 65), am Silo befestigte Misch- und Pumptechnik und maschinentechnische Betreuung. Kein Einrichten von Mischplätzen, keine Verpackungsentsorgung, gleichbleibende Mörtelqualität.",
    normen: [],
    technischeDaten: [
      { label: "Siloeinheit", wert: "22,5 m³" },
      { label: "Pumpleistung", wert: "ca. 100 l/min (ca. 600 m² in rd. 1 Stunde)" },
      { label: "Tagesleistung", wert: "ca. 1.000–2.000 m² (Quelle nennt auch 1.000–1.500 m²)" },
      { label: "Förderstrecke", wert: "bis zu 80 m" },
    ],
    besonderheiten: [
      "Verarbeitbare Qualitäten: NEODUR HE 65, HE 65 SVS 3, HE 65 SVS 1,5, HE 40",
      "Gleichbleibende Mörtelqualität, wichtig bei farbigen Ausführungen",
    ],
    zeitKategorie: "normal",
  },

  // === WEBSITE-MIGRATION STUFE 2, INDUSTRIEBODEN TEIL 2: BAUCHEMIE (2026-06-12) ===
  // Quelle: extraktion-industrieboden-bauchemie.json + Normen produkte.xlsx.
  // Defekte Dichte-Einheiten der Alt-Site (easyFinish/nanoFinish/uniPrimer)
  // bewusst NICHT uebernommen — TDS-Klaerung offen (zuordnung-industrieboden.md).
  {
    id: "korotan",
    name: "KOROTAN",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "additive",
    kurzbeschreibung: "Flüssiges Spezial-Additiv mit verflüssigender und stabilisierender Wirkung für KORODUR-KOROTAN Industrieböden",
    beschreibung: "KOROTAN wird als Verarbeitungshilfe verwendet: für einschichtige KORODUR Hartstoffestriche auf frischem oder erhärtetem Tragbeton, für alle zweischichtigen Systeme sowie als Zusatzmittel bei Estrichen aller Art.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "grüne Flüssigkeit" },
      { label: "Dichte (20 °C)", wert: "1,13 g/cm³" },
      { label: "pH-Wert", wert: "ca. 9" },
      { label: "Dosierung", wert: "bis ca. 1–2 % vom Zementgewicht" },
    ],
    besonderheiten: [
      "Verflüssigende und stabilisierende Wirkung",
      "Speziell für KORODUR-KOROTAN Industrieböden",
      "Als Zusatzmittel bei Estrichen aller Art",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-easyfinish",
    name: "KORODUR easyFinish",
    kategorie: "nachbehandlung",
    bereich: "industrieboden",
    produktgruppe: "nachbehandlung",
    kurzbeschreibung: "Flüssige, lösemittelfreie, gebrauchsfertige Glätthilfe für NEODUR HE 60 rapid und KOROCRETE",
    beschreibung: "KORODUR easyFinish wird auf die getellerte NEODUR HE 60 rapid oder KOROCRETE Oberfläche vor dem ersten Flügelglätten aufgesprüht und eingearbeitet. Der Glättvorgang wird erleichtert, die Oberfläche zusätzlich vergütet, die Dichtigkeit erhöht und der Schutz gegen chemische Angriffe verbessert.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farbe", wert: "bläulich" },
    ],
    besonderheiten: [
      "Lösemittelfrei und gebrauchsfertig",
      "Erleichtert den Glättvorgang",
      "Erhöht Dichtigkeit und Schutz gegen chemische Angriffe",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-nanofinish",
    name: "KORODUR nanoFinish",
    kategorie: "nachbehandlung",
    bereich: "industrieboden",
    produktgruppe: "nachbehandlung",
    kurzbeschreibung: "Flüssiges, gebrauchsfertiges Nano-Silica für die Veredelung von KORODUR Industrieböden",
    beschreibung: "KORODUR nanoFinish verlangsamt den Feuchtigkeitsverlust und verlängert die Verarbeitungszeit: Die Oberflächenbearbeitung beim Glätten wird auch unter heißen, trockenen und windigen Bedingungen erleichtert. Die Nano-Silica-Technologie schließt Feuchtigkeit während der Oberflächenbearbeitung ein und ermöglicht so eine vollständige Hydratation mit maximaler Festigkeitsentwicklung; Ausblühungen und Rissbildung durch Frühschwinden werden reduziert.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farbe", wert: "milchig trüb" },
      { label: "pH-Wert", wert: "5" },
    ],
    besonderheiten: [
      "Nano-Silica-Technologie",
      "Verlängert die Verarbeitungszeit beim Glätten",
      "Reduziert Ausblühungen und Frühschwind-Risse",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-uniprimer",
    name: "KORODUR uniPrimer",
    kategorie: "grundierung",
    bereich: "industrieboden",
    produktgruppe: "untergrund-haftbruecken",
    kurzbeschreibung: "Lösemittelfreie, einkomponentige Universalgrundierung auf Acrylat-Co-Polymer- und Silikatbasis",
    beschreibung: "KORODUR uniPrimer grundiert saugende Betonuntergründe vor der Beschichtung mit zementgebundenen Hartstoffestrichen und reduziert das Saugverhalten trockener Untergründe: Das zeitaufwändige Vornässen bei Industriebodensanierungen entfällt. Ein Verdunsten der Haftbrücke KORODUR HB 5 oder HB 5 rapid wird minimiert und eine gleichmäßigere Hydratation des Verbundsystems erreicht.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farbe", wert: "milchig weiß" },
      { label: "pH-Wert", wert: "11,6" },
    ],
    besonderheiten: [
      "Lösemittelfrei, einkomponentig, gebrauchsfertig",
      "Ersetzt zeitaufwändiges Vornässen bei Sanierungen",
      "Minimiert Verdunsten der Haftbrücke",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "koropox",
    name: "KOROPOX",
    kategorie: "beschichtung",
    bereich: "industrieboden",
    produktgruppe: "impraegnierung",
    kurzbeschreibung: "Wasseremulgierbares, transparentes 2K-Epoxidharz-Konzentrat zur Imprägnierung zementgebundener Böden",
    beschreibung: "KOROPOX erhöht die Dichtigkeit und Beständigkeit gegen Wasser, Fett, Öl, Mineralöl, Treibstoff und Bremsflüssigkeiten. Die Anwendung erfolgt in zwei Arbeitsgängen auf KOROPLAN-, KORODUR- und NEODUR Industrieböden bzw. zementgebundenen Belägen.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farbe", wert: "farblos" },
      { label: "Dichte", wert: "1,0 g/cm³" },
      { label: "Verbrauch", wert: "2 Arbeitsgänge, ca. 75–175 g/m² Konzentrat (Komp. A + B)" },
    ],
    besonderheiten: [
      "Wasseremulgierbar und transparent",
      "Beständig gegen Wasser, Fett, Öl, Treibstoff, Bremsflüssigkeiten",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "koromineral",
    name: "KOROMINERAL",
    kategorie: "beschichtung",
    bereich: "industrieboden",
    produktgruppe: "impraegnierung",
    kurzbeschreibung: "Flüssige, transparente Imprägnierung auf Silikatbasis zur Oberflächenverkieselung mineralischer Baustoffe",
    beschreibung: "KOROMINERAL imprägniert Beton- und Estrichflächen in Lager- und Produktionsräumen oder Kühlräumen. Es eignet sich speziell für mineralische Untergründe wie Estriche, zementgebundene Industrieböden, Beton, Mauermörtel und zementgebundenen Putz, erhöht die Dichtigkeit und wirkt wasserabweisend.",
    normen: [],
    technischeDaten: [
      { label: "Farbe", wert: "transparent" },
      { label: "Dichte", wert: "ca. 1,12 g/cm³" },
      { label: "pH-Wert", wert: "ca. 11" },
      { label: "Verbrauch", wert: "ca. 100–200 g/m² (je nach Saugfähigkeit)" },
    ],
    besonderheiten: [
      "Oberflächenverkieselung mineralischer Baustoffe",
      "Erhöht die Dichtigkeit, wasserabweisend",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "koromineral-li",
    name: "KOROMINERAL Li+",
    kategorie: "beschichtung",
    bereich: "industrieboden",
    produktgruppe: "impraegnierung",
    kurzbeschreibung: "Flüssige, transparente Imprägnierung auf Basis Hybrid-Lithiumsilikat mit integriertem Basis-Fleckschutz",
    normen: [],
    technischeDaten: [
      { label: "Verbrauch", wert: "ca. 40–100 g/m² (je nach Saugfähigkeit)" },
    ],
    besonderheiten: [
      "Hybrid-Lithiumsilikat",
      "Integrierter Basis-Fleckschutz",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "koroclean",
    name: "KOROCLEAN",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "systeme",
    kurzbeschreibung: "Schleifverfahren zur optischen Aufwertung zementärer Industrieböden (Reinigungsschliff)",
    beschreibung: "KOROCLEAN ist ein speziell entwickeltes Schleifverfahren zur optischen Aufwertung von KORODUR Industrieböden und sonstigen zementären Industrieböden. Der Boden ist nach der Bearbeitung leichter zu reinigen und zu pflegen, farbliche Irritationen werden reduziert: eine technisch wie ökonomisch sinnvolle Alternative zur herkömmlichen Bau-Schlussreinigung vor Inbetriebnahme.",
    normen: [],
    technischeDaten: [
      { label: "Verfahren", wert: "Mechanischer Reinigungsschliff (System MKS Funke Schleiftechnik)" },
    ],
    besonderheiten: [
      "Verbessert Optik, Sicherheit und Rutschhemmung",
      "Staubfreie, leicht zu reinigende Oberfläche",
      "Auch für KORODUR Designböden empfohlen",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "system-korodur-korotan",
    name: "System KORODUR-KOROTAN",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "systeme",
    kurzbeschreibung: "Industriebodensystem: Hartstoffestrich einschichtig im Verbund mit Haftbrücke, Nenndicke i. M. 15 mm",
    beschreibung: "KORODUR-KOROTAN Industrieboden ist ein zementgebundener KORODUR Hartstoffestrich, der einschichtig im Verbund mit Haftbrücke auf erhärtetem Tragbeton in einer Nenndicke von i. M. 15 mm verlegt wird. Die Verlegung erfolgt weitgehend ohne Fugen; in Kombination mit der KORODUR Haftbrücke HB 5 entsteht ein kraftschlüssiger Verbund. Eines von drei KORODUR-Sanierungssystemen für Industrieböden.",
    schichtdicke: "i. M. 15 mm",
    normen: ["DIN 18560", "DIN EN 13813", "DIN 1100"],
    technischeDaten: [
      { label: "Aufbau", wert: "einschichtig im Verbund mit Haftbrücke (KORODUR HB 5) auf erhärtetem Tragbeton" },
    ],
    besonderheiten: [
      "Rein mineralisch",
      "Weitgehend fugenlos",
      "Sanierungssystem für Industrieböden",
    ],
    systemBegleitprodukte: ["korodur-hb-5", "korotan"],
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

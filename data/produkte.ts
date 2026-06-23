import type {
  BelastungsTag,
  Flaechenkategorie,
  Produktbereich,
  ProduktFilterV25,
  Verarbeitung,
  ZeitKategorie,
  Zusatzfunktion,
} from "./types";
import { PRODUKT_EINSATZBEREICHE } from "./produktEinsatzbereiche";

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
  /** Weitere Bereiche, in denen das Produkt zusätzlich erscheint (Portfolio-
   *  Umbau #215). Ein Produkt kann in mehreren Bereichen geführt werden, z. B.
   *  KOROCRETE in Betonsanierung (primär) UND Infrastruktur. Reine Website-
   *  Navigation; Lösungsfinder/Anwendungsmatrix werten das NICHT aus.
   *  Darf den Primär-`bereich` nicht wiederholen (validate-produkte.ts). */
  zusatzBereiche?: Produktbereich[];
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
  /** Einsatzbereiche/Anwendungen als Bullet-Liste für die PDP ("wo wird das
   *  eingesetzt"). Kundentauglicher Klartext, NICHT die Lösungsfinder-Taxonomie.
   *  Optional; rendert leer sauber. Content-Befüllung via Issue (KORODUR-Claude),
   *  Frank-prüfbar auf der Live-Seite. */
  einsatzbereiche?: string[];
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
    name: "NEODUR HE 60 rapid",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoff-Schnellestrich",
    schichtdicke: "ab 10 mm",
    qualitaetsklasse: "CT-C60-F8-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN 18202 (Ebenheit)",
      "DIN 18560-1",
      "DIN EN 16516 + AgBB",
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
    tdsUrl: "/downloads/tds/NEODUR_HE_60_rapid_de.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten", "chemikalien", "kurze-sperrzeit"],
    bild: "/images/produkte/neodur-he-60-rapid.webp",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["chemikalienbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "60 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "24 h",
    belastbarNachZusatz: "begehbar ca. 3 h",
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
    name: "NEODUR HE 65",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich",
    schichtdicke: "A: 15/10/8 mm · KS: 6/5/4 mm",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560-7",
      "DIN 1100",
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
    tdsUrl: "/downloads/tds/NEODUR_HE_65_de.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten"],
    bild: "/images/produkte/neodur-he-65.webp",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "70 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "7 d",
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr", "chemie-treibstoff"],
  },
  {
    id: "neodur-he-65-plus",
    bereich: "industrieboden",
    aussenbereich: true,
    // #306/#308: zusätzlich im Infrastruktur-Bereich (Sanierung).
    produktgruppe: "hartstoffestriche",
    varianten: [
      { name: "NEODUR HE 65 plus SVS 3", qualitaetsklasse: "CT-C70-F9-A3" },
    ],
    name: "NEODUR HE 65 Plus",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich",
    schichtdicke: "15–30 mm",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: [
      "DIN EN 13813",
      "DIN 18560-7",
      "DIN CEN/TS 12390-9",
      "DAfStB-Richtlinie",
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
    tdsUrl: "/downloads/tds/NEODUR_HE_65_Plus_de.pdf",
    eignungen: ["grossflaechige-sanierung", "schwerlast", "rollende-lasten", "chemikalien", "tausalz", "aussenbereich"],
    zeitKategorie: "normal",
    zusatzfunktionen: ["chemikalienbestaendigkeit", "tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "70 N/mm²",
    belastbarkeitsStufe: 5,
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
    tdsUrl: "/downloads/tds/NEODUR_HE_40_de.pdf",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    norm: "DIN 18560-7",
    druckfestigkeit: "40 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "7 d",
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr", "chemie-treibstoff"],
  },
  {
    id: "neodur-level",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    name: "NEODUR Level",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, schnellerhärtender Dünnestrich",
    schichtdicke: "4–30 mm",
    qualitaetsklasse: "CT-C40-F8-AR0,5",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN 18202 Zeile 3 (erhöhte Ebenheit)",
      "DIN EN 12706",
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
    tdsUrl: "/downloads/tds/NEODUR_Level_de.pdf",
    eignungen: ["grossflaechige-sanierung", "leichte-nutzung", "rollende-lasten"],
    bild: "/images/produkte/neodur-level.webp",
    zeitKategorie: "normal",
    inSanierungsMatrix: true,
    norm: "DIN EN 13813",
    druckfestigkeit: "40 N/mm²",
    belastbarkeitsStufe: 4,
    belastbarNach: "3 d",
    belastbarNachZusatz: "leicht belastbar 24 h",
    belastungenAbgedeckt: ["verschleiss", "staplerverkehr", "optik"],
    systemBegleitprodukte: ["korodur-pc"],
  },
  {
    id: "tru-self-leveling",
    bereich: "sichtestrich",
    produktgruppe: "truazzo",
    beschreibung: "Rapid Set TRU Self-Leveling ist ein auf spezieller Zementtechnologie basierender, selbstverlaufender, mineralischer, geschliffener Sichtestrich. Ideal, wenn Frühfestigkeit, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind: bis zu 20 Minuten verarbeitbar, nach 2 bis 3 Stunden begehbar und bereits 24 Stunden nach Einbau bis zur Hochglanzoptik schleifbar. In verschiedenen Farbvarianten und mit eingestreuter Dekorkörnung (z. B. Glas, Marmor) individuell gestaltbar.",
    name: "TRU Self-Leveling",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, geschliffener dekorativer Sichtestrich",
    schichtdicke: "5–35 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN EN 13892-2",
      "DIN EN 13892-3",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 10 N/mm²" },
      { label: "Optik", wert: "Betonähnliche Sichtestrich-Oberfläche" },
      { label: "Verarbeitung", wert: "Selbstverlaufend" },
      { label: "Haftbrücke", wert: "Nicht erforderlich" },
      { label: "Begehbar nach", wert: "ca. 2–3 h" },
      { label: "Schleifbar bis Hochglanz nach", wert: "ca. 24 h" },
    ],
    besonderheiten: [
      "Designorientierte Betonoptik",
      "Fugenlose Oberfläche",
      "Ohne Haftbrücke",
      "Schleifbar bis Hochglanz",
      "Hygienisch & pflegeleicht",
    ],
    tdsUrl: "/downloads/tds/Farbkarte_de_en_fr.pdf",
    eignungen: ["grossflaechige-sanierung", "leichte-nutzung"],
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 13813",
    druckfestigkeit: "40 N/mm²",
    belastbarkeitsStufe: 4,
    belastbarNach: "24 h",
    belastbarNachZusatz: "schleifbar bis Hochglanz",
    sichtestrich: true,
    belastungenAbgedeckt: ["optik", "fleckschutz", "hygiene", "publikumsverkehr"],
  },

  // === GRUNDIERUNGEN / HAFTBRÜCKEN (nicht in Sanierungs-Matrix) ===
  {
    id: "korodur-hb-5-rapid",
    tdsUrl: "/downloads/tds/KORODUR_HB_5_rapid_de.pdf",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "untergrund-haftbruecken",
    name: "KORODUR HB 5 rapid",
    kategorie: "grundierung",
    kurzbeschreibung: "Schnellerhärtende Haftbrücke für kraftschlüssigen Verbund zum Untergrund",
    normen: [
      "DIN 1048-2",
      "DIN EN 13892-8",
      "DIN 18365",
      "DIN 18560",
      "DIN 18202",
    ],
    technischeDaten: [
      { label: "Untergrund-Anforderung", wert: "Tragbeton mind. C25/30, Oberflächenzugfestigkeit ≥ 1,5 N/mm²" },
      { label: "Verarbeitungszeit", wert: "ca. 15 min" },
      { label: "Überarbeitbar nach", wert: "frisch-in-frisch" },
    ],
    besonderheiten: [
      "Schnelle Erhärtung",
      "Hohe Haftzugwerte",
      "Frisch-in-frisch Verarbeitung",
    ],
    eignungen: ["kleine-reparatur", "kurze-sperrzeit"],
    bild: "/images/produkte/korodur-hb5-rapid.webp",
    zeitKategorie: "schnell",
  },
  {
    id: "korodur-pc",
    tdsUrl: "/downloads/tds/KORODUR_PC_de.pdf",
    bereich: "industrieboden",
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "untergrund-haftbruecken",
    name: "KORODUR PC",
    kategorie: "grundierung",
    kurzbeschreibung: "Kunstharzdispersion-Grundierung für Dünnestrich-Systeme",
    normen: [
      "DIN EN 13892-8",
      "DIN 1048-2",
      "DIN 18365",
      "DIN 18560",
      "DIN 18202",
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
    zusatzBereiche: ["industrieboden"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    beschreibung: "Rapid Set CEMENT ALL ist ein auf spezieller Zementtechnologie basierender, mineralischer, multifunktionaler Schnellreparaturmörtel aus Hochleistungs-Rapid-Set-Zement und feinkörnigem Sand. Er ist schnell härtend, dauerhaft und schwundneutral; Erstarrungsbeginn nach ca. 15 Minuten, belastbar in ca. 1 Stunde. Nur mit Wasser anmischen, Konstruktionsfestigkeit innerhalb einer Stunde. Optisch vergleichbar mit Portlandzement-Baustoffen und in ähnlicher Weise verarbeitbar.",
    varianten: [
      { name: "Rapid Set CEMENT ALL Plus", qualitaetsklasse: "C55/67" },
    ],
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
    tdsUrl: "/downloads/tds/Cement_All_de.pdf",
    eignungen: ["kleine-reparatur", "kurze-sperrzeit", "aussenbereich"],
    bild: "/images/produkte/rapid-set-cement-all.webp",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 1015-11",
    druckfestigkeit: "> 62 N/mm²",
    belastbarkeitsStufe: 3,
    belastbarNach: "1 h",
    belastungenAbgedeckt: ["frost-tausalz", "verschleiss", "chemie-aggressiv"],
  },
  {
    id: "rapid-set-mortar-mix",
    bereich: "rapid-set",
    zusatzBereiche: ["industrieboden"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    beschreibung: "Rapid Set MORTAR MIX ist eine Mischung aus Hochleistungs-Rapid-Set-Zement mit abgestuftem Quarzsand. Schnell härtend, dauerhaft und schwundneutral; kann horizontal, vertikal und über Kopf verarbeitet werden. Nur mit Wasser mischen, Konstruktionsfestigkeit innerhalb einer Stunde. Einsetzbar innen und außen, auch in Nassbereichen.",
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
    tdsUrl: "/downloads/tds/Mortar_Mix_de.pdf",
    eignungen: ["kleine-reparatur", "kurze-sperrzeit"],
    bild: "/images/produkte/rapid-set-mortar-mix.webp",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 1015-11",
    druckfestigkeit: "> 50 N/mm²",
    belastbarkeitsStufe: 3,
    belastbarNach: "1 h",
    belastungenAbgedeckt: ["frost-tausalz", "chemie-aggressiv"],
  },
  {
    id: "rapid-set-mortar-mix-dur",
    bereich: "rapid-set",
    zusatzBereiche: ["industrieboden"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
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
    tdsUrl: "/downloads/tds/Mortar_Mix_de.pdf",
    eignungen: ["kleine-reparatur", "schwerlast", "punktlasten", "kurze-sperrzeit"],
    zeitKategorie: "schnell",
    inSanierungsMatrix: false,
    norm: "DIN 1100 A",
    druckfestigkeit: "45 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "1 h",
    belastungenAbgedeckt: ["schwerlast", "verschleiss", "staplerverkehr", "frost-tausalz"],
  },
  {
    id: "asphalt-repair-mix",
    // #306/#308: Betonsanierung (primär) + zusätzlich Infrastruktur.
    bereich: "rapid-set",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    name: "ASPHALT REPAIR MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Schnellreparaturmaterial für Asphaltflächen",
    beschreibung: "Rapid Set ASPHALT REPAIR MIX ist ein zementbasiertes, polymervergütetes Reparaturmaterial: hochfest, spannungsarm und schnellerhärtend. Es vereint die Geschwindigkeit von Kaltmischgut mit der Dauerhaftigkeit von Heißasphalt: Sack öffnen, Wasser zugeben, mischen, einbauen. Ohne Fräse, ohne Walze, ohne Haftbrücke; nach ca. 30 Minuten belastbar, nach ca. 1 Stunde voll belastbar, auch unter Schwerlastverkehr.",
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
      { label: "Biegezugfestigkeit (28 d)", wert: "ca. 6,4 N/mm²" },
      { label: "E-Modul", wert: "ca. 22.000 N/mm²" },
      { label: "Körnung", wert: "0–8 mm" },
      { label: "Farbe", wert: "schwarz" },
      { label: "Wasserzugabe", wert: "ca. 3,80 l je 25-kg-Sack" },
      { label: "Materialverbrauch", wert: "ca. 20 kg/m² je cm Schichtstärke" },
      { label: "Verarbeitungstemperatur", wert: "+5 °C bis +30 °C" },
    ],
    besonderheiten: [
      "Für Asphaltflächen geeignet",
      "Ohne Haftbrücke",
      "Einfache Verarbeitung",
      "30-Minuten-Verkehrsfreigabe",
      "Sulfatbeständig und chloridfrei",
      "Pumpfähig, horizontal und vertikal einsetzbar",
      "Ca. 30 % weniger CO₂ als herkömmlicher Portlandzement",
      "Erhältlich über den Baustoffhandel",
    ],
    tdsUrl: "/downloads/tds/Asphalt_Repair_Mix_de.pdf",
    eignungen: ["kleine-reparatur", "grossflaechige-sanierung", "schwerlast", "rollende-lasten", "kurze-sperrzeit", "aussenbereich"],
    bild: "/images/produkte/asphalt-repair-mix.webp",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 1015-11",
    druckfestigkeit: "38 N/mm²",
    belastbarkeitsStufe: 3,
    belastbarNach: "30 min",
    belastbarNachZusatz: "Verkehrsfreigabe",
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast", "chemie-aggressiv"],
  },
  {
    id: "dot-europe-concrete-mix",
    bereich: "rapid-set",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    beschreibung: "DOT Europe CONCRETE MIX ist ein leistungsstarker, polymermodifizierter, schnellabbindender, faserverstärkter Schnellbeton für innen und außen. Er ist gemäß DIN EN 1504-3 sowohl für statisch als auch nicht statisch relevante Instandsetzungen einsetzbar, ideal wo schnelle Festigkeiten, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind. Verarbeitbar in Stärken von 50–600 mm, bereits nach 1 Stunde belastbar; auch in Nassbereichen einsetzbar.",
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
    tdsUrl: "/downloads/tds/DOT_Europe_Concrete_Mix_de.pdf",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "EN 1504-3",
    druckfestigkeit: "≥ 60 N/mm²",
    belastbarkeitsStufe: 5,
    belastbarNach: "60 min",
    belastbarNachZusatz: "nach Erstarrungsende",
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast", "verschleiss"],
  },
  {
    id: "korocrete",
    // #306/#308: KOROCRETE primär Industrieboden, zusätzlich Infrastruktur
    // (NICHT mehr Betonsanierung — Steffi 2026-06-22, Änderung ggü. #219).
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    produktgruppe: "schnellbeton",
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
    tdsUrl: "/downloads/tds/KOROCRETE_Schnellbeton_de.pdf",
    zeitKategorie: "schnell",
    inSanierungsMatrix: true,
    norm: "DIN EN 206",
    druckfestigkeit: "65 N/mm²",
    belastbarkeitsStufe: 4,
    belastbarNach: "wenige h",
    belastbarNachZusatz: "rezepturabhängig",
    systemProdukt: true,
    belastungenAbgedeckt: ["schwerlast", "frost-tausalz"],
  },
  {
    id: "rapid-set-schnellbeton",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    produktgruppe: "schnellbeton",
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
      "Geprüft nach TL BEB-StB für den Erhaltungsbau",
      "2-Stunden-Verkehrsfreigabe",
      "Frost-/tausalzbeständig",
      "Großflächig einsetzbar",
      "Kein Restbeton",
    ],
    tdsUrl: "/downloads/tds/System_Rapid_Set_Concrete_de.pdf",
    zeitKategorie: "schnell",
    zusatzfunktionen: ["tausalzbestaendigkeit"],
    inSanierungsMatrix: true,
    norm: "TL BEB-StB",
    druckfestigkeit: "≥ 45 MPa",
    belastbarkeitsStufe: 5,
    belastbarNach: "2 h",
    belastbarNachZusatz: "Verkehrsfreigabe",
    systemProdukt: true,
    belastungenAbgedeckt: ["frost-tausalz", "schwerlast", "staplerverkehr"],
  },

  // === NACHBEHANDLUNG (nicht in Sanierungs-Matrix) ===
  {
    id: "korocure",
    tdsUrl: "/downloads/tds/KOROCURE_de.pdf",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "nachbehandlung",
    beschreibung: "Zum Schutz des jungen Betons sind gem. DIN EN 13670 in Verbindung mit DIN 1045-3 Zwischen-Nachbehandlungsmaßnahmen erforderlich: Die Zwischen-Nachbehandlung schützt das im Beton enthaltene Wasser vor Verdunstung, damit der Zement vollständig hydratisieren kann. Beim Einsatz als Grundierung für nachfolgende Hartstoffbeschichtungen wird KOROCURE unmittelbar nach Begehbarkeit des Betons aufgetragen.",
    name: "KOROCURE",
    kategorie: "nachbehandlung",
    kurzbeschreibung: "Curing-Compound zur kontrollierten Nachbehandlung von Estrichflächen",
    normen: [],
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
    tdsUrl: "/downloads/tds/KOROMINERAL_CURE_de.pdf",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "nachbehandlung",
    name: "KOROMINERAL CURE",
    kategorie: "nachbehandlung",
    kurzbeschreibung: "Oberflächenschutz mittels Silikatisierung",
    normen: [],
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
    tdsUrl: "/downloads/tds/KOROTEX_de.pdf",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "nachbehandlung",
    beschreibung: "Gemäß DIN 18353 (Estricharbeiten) und DIN 18560 (Estriche im Bauwesen) müssen Estriche vor ungleichmäßigem und zu raschem Austrocknen geschützt werden. KOROTEX Nachbehandlung ist besonders wichtig bei erhöhten Temperaturen, niedriger Luftfeuchtigkeit und starker Zugluft; das Aufsprühen ist die rationellste Methode bei frisch verlegten Estrichflächen.",
    name: "KOROTEX",
    kategorie: "nachbehandlung",
    kurzbeschreibung: "Curing-Mittel zur kontrollierten Aushärtung",
    normen: [],
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
    tdsUrl: "/downloads/tds/NEODUR_HE_3_de.pdf",
    name: "NEODUR HE 3",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    kurzbeschreibung: "Zementgebundener Trockenbaustoff für Industrieböden im Einstreuverfahren",
    beschreibung: "NEODUR HE 3 gem. DIN 18557 (Werkmörtel) und DIN EN 13813, basierend auf Hartstoffen gem. DIN 1100: gebrauchsfertiger, zementgebundener Trockenbaustoff zur Herstellung von Industrieböden im Einstreuverfahren. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: [
      "DIN EN 13813",
      "DIN 1100",
      "DIN 18560",
    ],
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
    tdsUrl: "/downloads/tds/NEODUR_HE_3_green_de.pdf",
    name: "NEODUR HE 3 green",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    kurzbeschreibung: "Ressourcenschonende Variante von NEODUR HE 3 mit bis zu 30 % reduziertem CO₂-Ausstoß",
    beschreibung: "Mit der ressourcenschonenden Variante NEODUR HE 3 green kann der CO₂-Ausstoß in der Herstellung um bis zu 30 Prozent reduziert werden. Für Bauherren, Architekten, Planer und Bauunternehmen stehen entsprechende Umweltproduktdeklarationen (EPD) bereit.",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: [
      "DIN 1100",
      "DIN EN 13813",
    ],
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
    tdsUrl: "/downloads/tds/NEODUR_HE_2_de.pdf",
    name: "NEODUR HE 2",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    kurzbeschreibung: "Zementgebundener Trockenbaustoff für Industrieböden im Einstreuverfahren",
    beschreibung: "NEODUR HE 2 gem. DIN 18557 (Werkmörtel) und DIN EN 13813: gebrauchsfertiger, zementgebundener Trockenbaustoff zur Herstellung von Industrieböden im Einstreuverfahren. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A8",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
    ],
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
    tdsUrl: "/downloads/tds/KORODUR_04_de.pdf",
    name: "KORODUR 0/4",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
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
    tdsUrl: "/downloads/tds/KORODUR_VS_05_de.pdf",
    name: "KORODUR VS 0/5",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
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
    tdsUrl: "/downloads/tds/KORODUR_WH_Spezial_de.pdf",
    name: "KORODUR WH-Spezial",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
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
    tdsUrl: "/downloads/tds/KORODUR_WH_metallisch_de.pdf",
    name: "KORODUR WH-metallisch",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
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
    tdsUrl: "/downloads/tds/KORODUR_Diamantbeton_de.pdf",
    name: "KORODUR Diamantbeton",
    kategorie: "sonstige",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
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
    tdsUrl: "/downloads/tds/KORODUR_FSCem_de.pdf",
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
    tdsUrl: "/downloads/tds/KORODUR_FSCem_Screed_de.pdf",
    name: "KORODUR FSCem Screed",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "schnellestrich",
    bild: "/images/produkte/korodur-fscem-screed.webp",
    kurzbeschreibung: "Volumenstabiler, schwindarmer Schnellestrich-Trockenmörtel, nach 3 Tagen belegbar",
    beschreibung: "KORODUR FSCem Screed ist ein volumenstabiler, schwindarmer Schnellestrich-Trockenmörtel auf ternärer Basis zur Herstellung schnell verlegereifer Estriche für Schichtdicken bis 120 mm gem. DIN 18560 und DIN EN 13813. Bereits nach 3 Tagen belegbar, muss grundsätzlich belegt werden. Auch zum Ausbessern und Sanieren alter Betonböden geeignet.",
    schichtdicke: "bis 120 mm",
    qualitaetsklasse: "CT-C40-F6",
    normen: [
      "DIN 18560",
      "DIN EN 13813",
      "DIN EN 13892-2",
      "DIN 18560-1",
    ],
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
    tdsUrl: "/downloads/tds/NEODUR_Level_AU_de.pdf",
    name: "NEODUR Level AU",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    kurzbeschreibung: "Schnellerhärtende, polymermodifizierte Bodenausgleichsmasse für 5 bis 50 mm",
    beschreibung: "NEODUR Level AU ist eine zementgebundene, mineralische, schnellerhärtende, polymermodifizierte, dünnschichtige Bodenausgleichsmasse für Schichtdicken von 5 bis 50 mm. Im Verbund auf zementärem Untergrund, idealer Untergrund für Linoleum, Textil- und PVC-Beläge, Laminat, Keramik und Naturstein.",
    schichtdicke: "5–50 mm",
    qualitaetsklasse: "CT-C30-F5",
    normen: [
      "DIN EN 13813",
      "DIN 18560",
      "DIN EN 12706",
    ],
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
    tdsUrl: "/downloads/tds/Levelflor_de.pdf",
    name: "Rapid Set LevelFlor",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    kurzbeschreibung: "Schnellerhärtende, selbstverlaufende Ausgleichsmasse auf Rapid-Set-Zementtechnologie für innen und außen",
    beschreibung: "Rapid Set LevelFlor ist eine auf spezieller Zementtechnologie basierende, selbstverlaufende Ausgleichsmasse für innen und außen im Wohnungs- und Industriebau. Eine finale Deckschicht kann nach 6 bis 16 Stunden (bei +20 °C) aufgebracht werden. Für Neubau und Sanierung geeignet, muss grundsätzlich belegt werden.",
    schichtdicke: "bis 70 mm",
    qualitaetsklasse: "CT-C30-F6",
    normen: [
      "DIN EN 1015-11",
      "DIN EN 196-3",
    ],
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
    tdsUrl: "/downloads/tds/KORODUR_HB_5_de.pdf",
    name: "KORODUR HB 5",
    kategorie: "grundierung",
    bereich: "industrieboden",
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "untergrund-haftbruecken",
    kurzbeschreibung: "Zementgebundene Haftbrücke für den kraftschlüssigen Verbund von Hartstoffestrichen auf erhärtetem Beton",
    beschreibung: "KORODUR HB 5 ist eine gebrauchsfertige, zementgebundene Haftbrücke für den kraftschlüssigen Verbund von KORODUR Hartstoffestrichen und zementgebundenen Estrichen aller Güteklassen auf erhärtetem Beton. Besonders bewährt im KORODUR-KOROTAN Industriebodensystem, unempfindlich gegen Untergrundfeuchte.",
    normen: [
      "DIN 1048-2",
      "DIN EN 13892-8",
      "DIN 18202",
    ],
    technischeDaten: [{ label: "Verbrauch", wert: "ca. 2 kg/m²" }],
    besonderheiten: [
      "Unempfindlich gegen Untergrundfeuchte",
      "Für frische und zeitversetzte Verlegetechnik",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "korodur-txpk",
    tdsUrl: "/downloads/tds/KORODUR_TXPK_de.pdf",
    name: "KORODUR TXPK",
    kategorie: "grundierung",
    bereich: "industrieboden",
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
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
    tdsUrl: "/downloads/tds/DUROP_de.pdf",
    name: "KORODUR DUROP",
    kategorie: "sonstige",
    bereich: "infrastruktur",
    // #306/#308: zusätzlich im Infrastruktur-Bereich (Straßen-/Brückenbau,
    // kunstharzgebundene Dünnbeschichtung). Varianten 0,5/1 · 1/2 · 2/3 · 2/5
    // bleiben vorerst als varianten[]; Aufsplittung in Einzel-PDPs = PDP-Runde.
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
    tdsUrl: "/downloads/tds/KORODUR_Robust_03.pdf",
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
    tdsUrl: "/downloads/tds/KORODUR_Silosystem_de.pdf",
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
    id: "korodur-easyfinish",
    tdsUrl: "/downloads/tds/KORODUR_easyFinish_de.pdf",
    name: "KORODUR easyFinish",
    kategorie: "nachbehandlung",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "nachbehandlung",
    kurzbeschreibung: "Flüssige, lösemittelfreie, gebrauchsfertige Glätthilfe für NEODUR HE 60 rapid und KOROCRETE",
    beschreibung: "KORODUR easyFinish wird auf die getellerte NEODUR HE 60 rapid oder KOROCRETE Oberfläche vor dem ersten Flügelglätten aufgesprüht und eingearbeitet. Der Glättvorgang wird erleichtert, die Oberfläche zusätzlich vergütet, die Dichtigkeit erhöht und der Schutz gegen chemische Angriffe verbessert.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farbe", wert: "bläulich" },
      { label: "Materialverbrauch", wert: "ca. 150 g/m²" },
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
    tdsUrl: "/downloads/tds/KORODUR_nanoFinish_de.pdf",
    name: "KORODUR nanoFinish",
    kategorie: "nachbehandlung",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "nachbehandlung",
    kurzbeschreibung: "Flüssiges, gebrauchsfertiges Nano-Silica für die Veredelung von KORODUR Industrieböden",
    beschreibung: "KORODUR nanoFinish verlangsamt den Feuchtigkeitsverlust und verlängert die Verarbeitungszeit: Die Oberflächenbearbeitung beim Glätten wird auch unter heißen, trockenen und windigen Bedingungen erleichtert. Die Nano-Silica-Technologie schließt Feuchtigkeit während der Oberflächenbearbeitung ein und ermöglicht so eine vollständige Hydratation mit maximaler Festigkeitsentwicklung; Ausblühungen und Rissbildung durch Frühschwinden werden reduziert.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farbe", wert: "milchig trüb" },
      { label: "pH-Wert", wert: "5" },
      { label: "Materialverbrauch", wert: "ca. 100 g/m²" },
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
    tdsUrl: "/downloads/tds/KORODUR_uniPrimer_de.pdf",
    name: "KORODUR uniPrimer",
    kategorie: "grundierung",
    bereich: "industrieboden",
    aussenbereich: true,
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
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
    id: "koromineral",
    tdsUrl: "/downloads/tds/KOROMINERAL_de.pdf",
    name: "KOROMINERAL",
    kategorie: "beschichtung",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "impraegnierung",
    kurzbeschreibung: "Flüssige, transparente Imprägnierung auf Silikatbasis zur Oberflächenverkieselung mineralischer Baustoffe",
    beschreibung: "KOROMINERAL imprägniert Beton- und Estrichflächen in Lager- und Produktionsräumen oder Kühlräumen. Es eignet sich speziell für mineralische Untergründe wie Estriche, zementgebundene Industrieböden, Beton, Mauermörtel und zementgebundenen Putz, erhöht die Dichtigkeit und wirkt wasserabweisend.",
    normen: [],
    technischeDaten: [
      { label: "Farbe", wert: "transparent" },
      { label: "Dichte", wert: "ca. 1,12 g/cm³" },
      { label: "pH-Wert", wert: "ca. 11,3" },
      { label: "Verarbeitungstemperatur", wert: "+5 °C bis +35 °C" },
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
    tdsUrl: "/downloads/tds/KOROMINERAL_Li_de.pdf",
    name: "KOROMINERAL Li+",
    kategorie: "beschichtung",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
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
    tdsUrl: "/downloads/tds/KOROCLEAN_de.pdf",
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
    tdsUrl: "/downloads/tds/KORODUR_KOROTAN_de.pdf",
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
    systemBegleitprodukte: ["korodur-hb-5"],
    zeitKategorie: "normal",
  },

  // === WEBSITE-MIGRATION STUFE 2, SICHTESTRICH + MICROTOP (2026-06-12) ===
  // Quellen: bereiche_sichtestrich_details.md (direkt gelesen),
  // extraktion-microtop.json + Normen produkte.xlsx.
  // Zuordnung: docs/website-migration/zuordnung-sichtestrich-microtop.md
  {
    id: "granidur",
    tdsUrl: "/downloads/tds/GRANIDUR_05_08_de.pdf",
    name: "GRANIDUR",
    kategorie: "estrich",
    bereich: "sichtestrich",
    produktgruppe: "geschliffen",
    kurzbeschreibung: "Geschliffener, dekorativer Sichtestrich in Granit- bzw. Terrazzooptik",
    beschreibung: "GRANIDUR 05 und GRANIDUR 08 sind werksmäßig hergestellte, gebrauchsfertige, farbige Trockenbaustoffe zur Herstellung geschliffener, dekorativer Estriche in einer Schichtdicke von 15 bis max. 70 mm, je nach Konstruktion. Die finale Granit- bzw. Terrazzooptik kann von matt bis glänzend reichen. Verlegung ein- oder zweischichtig gem. DIN 18560-2, -3 (Verbund mit Haftbrücke KORODUR HB 5) und -4.",
    schichtdicke: "15 bis max. 70 mm",
    qualitaetsklasse: "CT-C45-F6 / CT-C35-F5",
    normen: [
      "DIN EN 13813",
      "DIN 18560-2",
      "DIN 18560-3",
      "DIN 18560-4",
      "DIN EN 13892-2",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit (GRANIDUR 05)", wert: "45 N/mm²" },
      { label: "Biegezugfestigkeit (GRANIDUR 05)", wert: "6 N/mm²" },
      { label: "Druckfestigkeit (GRANIDUR 08)", wert: "35 N/mm²" },
      { label: "Biegezugfestigkeit (GRANIDUR 08)", wert: "5 N/mm²" },
    ],
    besonderheiten: [
      "Lieferbar in zementgrau, weitere Farben auf Anfrage",
      "Optik von matt bis glänzend schleifbar",
      "Umweltproduktdeklaration (Gruppen-EPD) verfügbar",
    ],
    varianten: [
      { name: "GRANIDUR 05", qualitaetsklasse: "CT-C45-F6", hinweis: "Körnung 0–5 mm, Schichtstärke 15–25 mm" },
      { name: "GRANIDUR 08", qualitaetsklasse: "CT-C35-F5", hinweis: "Körnung 0–8 mm, Schichtstärke 25–50 mm" },
    ],
    systemBegleitprodukte: ["korodur-hb-5"],
    sichtestrich: true,
    zeitKategorie: "normal",
  },
  {
    id: "granidur-bianco-nero",
    tdsUrl: "/downloads/tds/Granidur_Bianco_Nero_de.pdf",
    name: "GRANIDUR BIANCO/NERO",
    kategorie: "estrich",
    bereich: "sichtestrich",
    produktgruppe: "geschliffen",
    kurzbeschreibung: "Geschliffener, dekorativer Sichtestrich in Weiß (BIANCO) oder Schwarz (NERO), mittlere Schichtdicke 15 mm",
    beschreibung: "GRANIDUR BIANCO und GRANIDUR NERO sind werksmäßig hergestellte, gebrauchsfertige Trockenbaustoffe zur Herstellung geschliffener, dekorativer Estriche in einer mittleren Schichtdicke von 15 mm. Verlegung einschichtig gem. DIN 18560-3 als Verbundestrich mit KORODUR HB 5 Haftbrücke.",
    schichtdicke: "i. M. 15 mm",
    qualitaetsklasse: "CT-C45-F6",
    normen: [
      "DIN EN 13813",
      "DIN 18560-2",
      "DIN 18560-3",
      "DIN 18560-4",
      "DIN EN 13892-2",
    ],
    technischeDaten: [
      { label: "Korngröße", wert: "0–5 mm" },
      { label: "Druckfestigkeit", wert: "45 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "6 N/mm²" },
    ],
    besonderheiten: [
      "Reinweiße bzw. tiefschwarze geschliffene Optik",
      "Umweltproduktdeklaration (Gruppen-EPD) verfügbar",
    ],
    varianten: [
      { name: "GRANIDUR BIANCO" },
      { name: "GRANIDUR NERO" },
    ],
    systemBegleitprodukte: ["korodur-hb-5"],
    sichtestrich: true,
    zeitKategorie: "normal",
  },
  {
    id: "kcf",
    tdsUrl: "/downloads/tds/KCF_05_08_de.pdf",
    name: "KORODUR COPETTI FLOOR KCF",
    kategorie: "estrich",
    bereich: "sichtestrich",
    produktgruppe: "geglaettet",
    kurzbeschreibung: "Geglätteter, dekorativer Sichtestrich in wolkiger, marmorierter Optik",
    beschreibung: "KCF 05 und KCF 08 sind werksmäßig hergestellte, gebrauchsfertige, farbige Trockenbaustoffe zur Herstellung geglätteter, dekorativer Estriche in einer Schichtdicke von 15 bis max. 70 mm, je nach Konstruktion. Der zementgebundene, geglättete Sichtestrich wurde Ende der 1990er Jahre gemeinsam mit dem italienischen Architekten und Designer Alessandro Copetti entwickelt. Verlegung ein- oder zweischichtig gem. DIN 18560-2, -3 (Verbund mit Haftbrücke KORODUR HB 5) und -4.",
    schichtdicke: "15 bis max. 70 mm",
    qualitaetsklasse: "CT-C45-F6-A5 / CT-C35-F5-A5",
    normen: [
      "DIN EN 13813",
      "DIN 1100",
      "DIN 18560-2",
      "DIN 18560-3",
      "DIN 18560-4",
      "DIN EN 13892-2",
      "DIN EN 13892-3",
      "DIN EN 13501-1",
    ],
    technischeDaten: [
      { label: "Schleifverschleiß", wert: "≤ 5 cm³/50 cm²" },
      { label: "Druckfestigkeit (KCF 05)", wert: "45 N/mm²" },
      { label: "Biegezugfestigkeit (KCF 05)", wert: "6 N/mm²" },
      { label: "Druckfestigkeit (KCF 08)", wert: "35 N/mm²" },
      { label: "Biegezugfestigkeit (KCF 08)", wert: "5 N/mm²" },
    ],
    besonderheiten: [
      "Lieferbar in zementgrau, weitere Farben auf Anfrage",
      "Oberflächenbearbeitung mit KOROCLEAN",
      "Umweltproduktdeklaration (Gruppen-EPD) verfügbar",
    ],
    varianten: [
      { name: "KCF 05", qualitaetsklasse: "CT-C45-F6-A5", hinweis: "Körnung 0–5 mm, Schichtstärke 15–25 mm" },
      { name: "KCF 08", qualitaetsklasse: "CT-C35-F5-A5", hinweis: "Körnung 0–8 mm, Schichtstärke 25–50 mm" },
      { name: "KCF 05 rapid", hinweis: "schnellerhärtend, volumenstabiles Bindemittel auf ternärer Basis" },
    ],
    systemBegleitprodukte: ["korodur-hb-5", "koroclean"],
    sichtestrich: true,
    zeitKategorie: "normal",
  },
  {
    id: "tru-pc",
    tdsUrl: "/downloads/tds/TRU_PC_de.pdf",
    name: "TRU PC",
    kategorie: "estrich",
    bereich: "sichtestrich",
    produktgruppe: "truazzo",
    kurzbeschreibung: "Selbstverlaufender, mineralischer Sichtestrich in geschliffener Betonoptik (Rapid Set Technologie)",
    beschreibung: "Rapid Set TRU PC ist ein auf spezieller Zementtechnologie basierender, selbstverlaufender, mineralischer Sichtestrich, entwickelt um die Optik von geschliffenem Beton zu simulieren. Ideal, wenn Frühfestigkeit, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind: bis zu 20 Minuten verarbeitbar, nach 2 bis 3 Stunden begehbar. Die Dekorkörnung (bis 2,5 mm) ist bereits enthalten.",
    schichtdicke: "10–35 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: [
      "DIN 18560",
      "DIN EN 13813",
      "DIN EN 13892-2",
      "DIN EN 13892-3",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit (ASTM C-109 mod.)", wert: "nach 4 h ca. 19 N/mm², nach 1 Tag ca. 34 N/mm², nach 28 Tagen ca. 48 N/mm²" },
      { label: "Verarbeitungszeit", wert: "ca. 20 Minuten" },
      { label: "Fließzeit", wert: "ca. 15 Minuten" },
      { label: "Materialverbrauch", wert: "ca. 1,8 kg pro m² und mm Schichtstärke" },
      { label: "Farbe", wert: "naturgrau" },
    ],
    besonderheiten: [
      "Geschliffene Betonoptik, Dekorkörnung bis 2,5 mm enthalten",
      "In verschiedenen Farbvarianten gestaltbar",
      "Für innen und außen, auch in Nassbereichen",
    ],
    systemBegleitprodukte: ["korodur-txpk", "rapid-set-levelflor"],
    sichtestrich: true,
    zeitKategorie: "schnell",
  },
  {
    id: "tru-sp",
    tdsUrl: "/downloads/tds/TRU_SP_de.pdf",
    name: "TRU SP",
    kategorie: "estrich",
    bereich: "sichtestrich",
    produktgruppe: "truazzo",
    kurzbeschreibung: "Selbstverlaufender, mineralischer Sichtestrich in Salz-Pfeffer-Optik (Rapid Set Technologie)",
    beschreibung: "Rapid Set TRU SP ist ein auf spezieller Zementtechnologie basierender, selbstverlaufender, mineralischer Sichtestrich, entwickelt um die Optik von geschliffenem Beton in Salz-Pfeffer-Optik zu simulieren. Ideal, wenn Frühfestigkeit, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind: bis zu 20 Minuten verarbeitbar, nach 2 bis 3 Stunden begehbar.",
    schichtdicke: "10–35 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: [
      "DIN 18560",
      "DIN EN 13813",
      "DIN EN 13892-2",
      "DIN EN 13892-3",
      "DIN 18365",
    ],
    technischeDaten: [
      { label: "Druckfestigkeit (ASTM C-109 mod.)", wert: "nach 4 h ca. 13 N/mm², nach 1 Tag ca. 27 N/mm², nach 28 Tagen ca. 44 N/mm²" },
      { label: "Verarbeitungszeit", wert: "ca. 20 Minuten" },
      { label: "Fließzeit", wert: "ca. 15 Minuten" },
      { label: "Materialverbrauch", wert: "ca. 1,8 kg pro m² und mm Schichtstärke" },
      { label: "Farbe", wert: "naturgrau" },
    ],
    besonderheiten: [
      "Salz-Pfeffer-Optik",
      "In verschiedenen Farbvarianten gestaltbar",
      "Für innen und außen, auch in Nassbereichen",
    ],
    systemBegleitprodukte: ["korodur-txpk", "rapid-set-levelflor"],
    sichtestrich: true,
    zeitKategorie: "schnell",
  },
  {
    id: "microtop-tw-3",
    tdsUrl: "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
    name: "MICROTOP TW 3",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "trockenspritz",
    kurzbeschreibung: "Zementspritzmörtel im Trockenspritzverfahren für Reprofilierung und Beschichtung im Trinkwasserbereich",
    beschreibung: "MICROTOP TW 3 wird im Trockenspritzverfahren verarbeitet und dient der Reprofilierung und Beschichtung von Flächen sowie der Erhöhung der Betondeckung und dem Finish im Trinkwasserbereich. Die Materialien werden einlagig verarbeitet und können problemlos gerieben und geglättet werden; kleine Arbeiten sind per Hand möglich.",
    schichtdicke: "9–20 mm",
    qualitaetsklasse: "C30/37",
    normen: [
      "DVGW W 300",
      "DVGW W 347",
      "DIN 18551",
      "DIN EN 14487",
    ],
    technischeDaten: [
      { label: "Körnung", wert: "0–3 mm" },
      { label: "Druckfestigkeit (28 d)", wert: "≥ 45 N/mm²" },
      { label: "Gesamtporosität (90 d)", wert: "≤ 10 Vol.-%" },
    ],
    besonderheiten: [
      "Rein mineralisch, microsilika-vergütet",
      "Geringe Porosität, wasserundurchlässig",
      "Abreibfähig und glättbar",
      "Umweltproduktdeklaration (Gruppen-EPD) verfügbar",
    ],
    systemBegleitprodukte: ["microtop-tw-mineral"],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-5",
    tdsUrl: "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
    name: "MICROTOP TW 5",
    qualitaetsklasse: "C30/37",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "trockenspritz",
    kurzbeschreibung: "Microsilica-vergüteter Zementspritzmörtel im Trockenspritzverfahren für Trinkwasserbehälter",
    beschreibung: "MICROTOP TW 5 ist ein rein mineralischer, hydraulisch abbindender, microsilicavergüteter Zementspritzmörtel zur Reprofilierung, Egalisierung und Beschichtung von Flächen im Trinkwasserbehälter. Verarbeitung im Trockenspritzverfahren (Dünnstromverfahren), auch zur Erhöhung der Betondeckung und für das Finish. Entspricht den DVGW Arbeitsblättern W 270, W 300 und W 347.",
    schichtdicke: "14–30 mm",
    normen: ["DVGW W 270", "DVGW W 300", "DVGW W 347"],
    technischeDaten: [
      { label: "Korngröße", wert: "0–5 mm" },
      { label: "Druckfestigkeit", wert: "≥ 45 N/mm²" },
      { label: "Dichte", wert: "2,25 kg/dm³" },
      { label: "Gesamtporosität (90 d)", wert: "≤ 10 Vol.-%" },
    ],
    besonderheiten: [
      "Rein mineralisch, hydraulisch abbindend, microsilica-vergütet",
      "Einlagige Verarbeitung, reib- und glättbar",
      "Kleine Arbeiten per Hand möglich",
    ],
    systemBegleitprodukte: ["microtop-tw-mineral"],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-8",
    tdsUrl: "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
    name: "MICROTOP TW 8",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "trockenspritz",
    kurzbeschreibung: "Microsilica-vergüteter Zementspritzbeton (C30/37) im Trockenspritzverfahren für den Trinkwasserbereich",
    beschreibung: "MICROTOP TW 8 ist ein hydraulisch abbindender, microsilicavergüteter Zementspritzbeton für den Trinkwasserbereich, Verarbeitung gemäß DIN 18551. Der Beton der Festigkeitsklasse C30/37 wird zur Herstellung von Spritzbeton im Trockenspritzverfahren, zur Reprofilierung von Ausbrüchen und zur Erhöhung der Betondeckung verwendet. Entspricht den DVGW Arbeitsblättern W 270, W 300 und W 347.",
    schichtdicke: "ab 25 mm",
    qualitaetsklasse: "C30/37",
    normen: [
      "DVGW W 300",
      "DVGW W 347",
      "DIN 18551",
      "DIN EN 14487",
    ],
    technischeDaten: [
      { label: "Korngröße", wert: "0–8 mm" },
      { label: "Druckfestigkeit", wert: "≥ 45 N/mm²" },
      { label: "Dichte", wert: "2,27 kg/dm³" },
      { label: "Gesamtporosität (90 d)", wert: "≤ 10 Vol.-%" },
    ],
    besonderheiten: [
      "Festigkeitsklasse C30/37",
      "Microsilica-vergütet, hydraulisch abbindend",
      "Reib- und glättbar, kleine Arbeiten per Hand möglich",
    ],
    systemBegleitprodukte: ["microtop-tw-mineral"],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-nsm",
    tdsUrl: "/downloads/tds/MICROTOP_TW_NSM_de.pdf",
    name: "MICROTOP TW NSM",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "nassspritz",
    kurzbeschreibung: "Spritzmörtel im Nassspritzverfahren für Reprofilierung und Beschichtung im Trinkwasserbereich",
    beschreibung: "MICROTOP TW NSM wird im Nassspritzverfahren verarbeitet und dient der Reprofilierung und Beschichtung von Flächen sowie der Erhöhung der Betondeckung und dem Finish im Trinkwasserbereich. Die Materialien können problemlos gerieben und geglättet werden; kleine Arbeiten sind per Hand in Verbindung mit einer Haftbrücke möglich.",
    schichtdicke: "ca. 20 mm",
    normen: ["DVGW W 300", "DVGW W 347"],
    technischeDaten: [
      { label: "Körnung", wert: "0–3 mm" },
      { label: "Schichtstärke", wert: "ca. 20 mm, einlagig" },
      { label: "Wasserzugabe", wert: "ca. 3,6 l je 25-kg-Gebinde" },
      { label: "Farben", wert: "natur, weiß, blau" },
      { label: "Verfahren", wert: "Nassspritzen (Dichtstromförderung, geringe Staubentwicklung)" },
    ],
    varianten: [{ name: "MICROTOP TW NSM blau" }],
    besonderheiten: ["Reib- und glättbar", "Handverarbeitung kleiner Arbeiten mit Haftbrücke möglich"],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-02",
    tdsUrl: "/downloads/tds/MICROTOP_TW_02_de.pdf",
    name: "MICROTOP TW 02",
    kategorie: "sonstige",
    bereich: "microtop",
    aussenbereich: true,
    produktgruppe: "nassspritz",
    kurzbeschreibung: "Spritzmörtel im Nassspritzdichtstromverfahren mit äußerst geringem Porenvolumen",
    beschreibung: "MICROTOP TW 02 wird im Nassspritzdichtstromverfahren verarbeitet und dient der Beschichtung von Flächen sowie der Erhöhung der Betondeckung und dem Finish im Trinkwasserbereich. Das Produkt hat ein äußerst geringes Porenvolumen und kann auch als Korrosionsschutz und Haftbrücke eingesetzt werden.",
    schichtdicke: "ca. 2–5 mm",
    qualitaetsklasse: "C30/37",
    normen: ["DVGW W 300", "DVGW W 347"],
    technischeDaten: [
      { label: "Körnung", wert: "0–0,2 mm" },
      { label: "Schichtstärke", wert: "ca. 2–5 mm" },
      { label: "Wasserzugabe", wert: "ca. 5–6,25 l je 25-kg-Gebinde" },
      { label: "Verfahren", wert: "Schleudern, Spritzen, Spachteln, Handauftrag" },
    ],
    besonderheiten: [
      "Äußerst geringes Porenvolumen",
      "Auch als Korrosionsschutz und Haftbrücke einsetzbar",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-vsm",
    tdsUrl: "/downloads/tds/MICROTOP_TW_VSM_de.pdf",
    name: "MICROTOP TW VSM",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "nassspritz",
    kurzbeschreibung: "Vorspritzmörtel (Haftgrund) für die Innenauskleidung und Instandsetzung von Trinkwasserbehältern und Mauerwerk",
    beschreibung: "MICROTOP TW VSM dient der Innenauskleidung und Instandsetzung von neuen wie auch alten Trinkwasserbehältern sowie Mauerwerk. Durch seine spezielle Zusammensetzung hat er hervorragende Verarbeitungs- und Gebrauchseigenschaften und kann problemlos gerieben und geglättet werden.",
    schichtdicke: "15–20 mm",
    qualitaetsklasse: "C12/15",
    normen: ["DVGW W 347"],
    technischeDaten: [
      { label: "Körnung", wert: "0–2 mm" },
      { label: "Schichtstärke", wert: "ca. 15–20 mm" },
      { label: "Wasserzugabe", wert: "ca. 3,75 l je 25-kg-Gebinde" },
      { label: "Ergiebigkeit", wert: "ca. 14 l je 25-kg-Gebinde" },
      { label: "Verfahren", wert: "Spritzen, Handauftrag" },
    ],
    besonderheiten: ["Auch für Mauerwerk geeignet", "Reib- und glättbar"],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-bm",
    tdsUrl: "/downloads/tds/MICROTOP_TW_BM_de.pdf",
    name: "MICROTOP TW BM",
    kategorie: "beschichtung",
    bereich: "microtop",
    produktgruppe: "beschichtung-schutz",
    kurzbeschreibung: "Spezialmörtel für die Innenbeschichtung von Trinkwasserrohren und -behältern, auch als Haftbrücke",
    beschreibung: "MICROTOP TW BM ist ein werksmäßig hergestellter, gebrauchsfertiger Spezialmörtel zur Innenbeschichtung von Trinkwasserrohren und -behältern sowie anderen Gewerken. Er kann problemlos im Schleuder-, Spritz- und Handauftrag verarbeitet werden, ist auch als Haftbrücke für Bodenbeschichtungen und als Korrosionsschutz verwendbar und wird in natur und weiß geliefert. Entspricht den DVGW Arbeitsblättern W 270, W 300 und W 347.",
    normen: ["DVGW W 270", "DVGW W 300", "DVGW W 347"],
    technischeDaten: [
      { label: "Korngröße", wert: "0–1 mm" },
      { label: "Druckfestigkeit", wert: "35 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "6,3 N/mm²" },
      { label: "Farben", wert: "natur, weiß" },
      { label: "Schichtdicke (Auskleidung Rohre/Behälter)", wert: "5–8 mm" },
      { label: "Schichtdicke (Korrosionsschutz/Haftbrücke)", wert: "2–5 mm" },
    ],
    varianten: [{ name: "MICROTOP TW BM weiß" }, { name: "MICROTOP TW BM blau" }],
    besonderheiten: [
      "Schleuder-, Spritz- und Handauftrag",
      "Auch als Haftbrücke und Korrosionsschutz verwendbar",
      "Lieferbar in natur und weiß",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-mineral",
    tdsUrl: "/downloads/tds/MICROTOP_TW_Mineral_de.pdf",
    name: "MICROTOP TW Mineral",
    kategorie: "beschichtung",
    bereich: "microtop",
    produktgruppe: "beschichtung-schutz",
    kurzbeschreibung: "Flüssiges Bautenschutzmittel auf Silikatbasis zur Verfestigung und Oberflächenabdichtung",
    beschreibung: "MICROTOP TW Mineral bewirkt eine Verfestigung an mineralischen Baustoffen und porösen Untergründen durch chemische Reaktion mit den Bindemitteln und Zuschlagsstoffen des Substrats (Verkieselungsreaktion) und verbessert die Gefügestruktur bei gleichzeitiger Oberflächenabdichtung. Dient als Imprägnierung im MICROTOP-System.",
    normen: ["DVGW W 347"],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farbe", wert: "transparent" },
      { label: "Dichte", wert: "ca. 1,14 g/cm³" },
      { label: "pH-Wert", wert: "ca. 11,3" },
    ],
    besonderheiten: [
      "Verkieselungsreaktion mit dem Substrat",
      "Verfestigung und Abdichtung in einem Arbeitsgang",
      "Imprägnierung für alle MICROTOP-TW-Mörtel",
    ],
    zeitKategorie: "normal",
  },

  // === WEBSITE-MIGRATION STUFE 2, SPEZIALBAUSTOFFE + RAPID SET (2026-06-12) ===
  // Quellen: extraktion-spezialbaustoffe.json, extraktion-rapidset-schnellbeton.json
  // + Normen produkte.xlsx (bei Klassen-Konflikten autoritativ, dokumentiert in
  // zuordnung-spezialbaustoffe-rapidset.md).
  {
    // #178: VM 1 / VM 3 / VB 8 auf einer PDP (gemeinsame TDS NEODUR_VM_1_3_8).
    // Unterscheidung nur über den Vergussquerschnitt -> als Varianten geführt.
    // VM 5 (C80/95, R4) und VM basic (Trinkwasser) bleiben eigene PDPs (eigene TDS).
    id: "neodur-vm-1",
    tdsUrl: "/downloads/tds/NEODUR_VM_1_3_8_de.pdf",
    name: "NEODUR VM 1 / VM 3 / VB 8",
    kategorie: "sonstige",
    // #308: Spezialmörtel (Neubau) — Bereich „Spezialbaustoffe" aufgelöst.
    bereich: "spezialmoertel",
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Verguss- und Montagemörtel für Vergussquerschnitte von 5 bis über 50 mm (Varianten VM 1 / VM 3 / VB 8)",
    beschreibung: "Montage- und Vergussmörtel verbinden Beton kraftschlüssig mit Stahleinbauteilen. Die Reihe deckt je nach Vergussquerschnitt drei Varianten ab: NEODUR VM 1 (5 bis 20 mm), NEODUR VM 3 (10 bis 50 mm) und NEODUR VB 8 (über 50 mm). Alle drei teilen ein gemeinsames technisches Datenblatt.",
    qualitaetsklasse: "C55/67",
    normen: [
      "DIN EN 13395-2",
      "DIN EN 445",
      "DIN EN 13670",
      "DIN 1045-3",
      "DIN EN 13892-2",
    ],
    technischeDaten: [{ label: "Vergussquerschnitt", wert: "5 mm bis über 50 mm (je Variante)" }],
    varianten: [
      { name: "NEODUR VM 1", qualitaetsklasse: "C55/67", hinweis: "Vergussquerschnitt 5–20 mm" },
      { name: "NEODUR VM 3", qualitaetsklasse: "C55/67", hinweis: "Vergussquerschnitt 10–50 mm" },
      { name: "NEODUR VB 8", qualitaetsklasse: "C55/67", hinweis: "Vergussquerschnitt über 50 mm" },
    ],
    besonderheiten: ["Kraftschlüssiger Verbund von Beton und Stahleinbauteilen", "Umweltproduktdeklaration (Gruppen-EPD) verfügbar"],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-vm-5",
    tdsUrl: "/downloads/tds/NEODUR_VM_5_de.pdf",
    name: "NEODUR VM 5",
    kategorie: "sonstige",
    // #308: Spezialmörtel (Neubau) + Betonsanierung (Sanierungsanteil).
    bereich: "spezialmoertel",
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Vergussbeton (C80/95) für Vergussquerschnitte bis 200 mm, geprüft nach DIN EN 1504-3 (R4)",
    beschreibung: "Montage- und Vergussbeton für große Vergussquerschnitte bis 200 mm. Geprüft nach DIN EN 1504-3 (Klasse R4) und der DAfStb-Richtlinie für zementgebundenen Vergussbeton und Vergussmörtel.",
    qualitaetsklasse: "C80/95",
    normen: ["DIN EN 1504-3 (R4)", "DAfStb-Richtlinie", "DIN EN 206-1", "DIN 1045-2"],
    technischeDaten: [{ label: "Vergussquerschnitt", wert: "bis 200 mm" }],
    besonderheiten: ["Für statisch relevante Anwendungen (R4)", "DAfStb-Richtlinie (SKVB I)"],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-vm-basic",
    tdsUrl: "/downloads/tds/NEODUR_VM_basic_de.pdf",
    name: "NEODUR VM basic",
    kategorie: "sonstige",
    // #308/#317: Spezialmörtel (Neubau) + Trinkwasserbehälter-Sanierung
    // (DVGW W 347, Rohrverguss in Trinkwasseranlagen).
    bereich: "spezialmoertel",
    zusatzBereiche: ["microtop", "rapid-set"],
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Mineralischer, hochfließfähiger Quellvergussbeton, DVGW-geprüft für Trinkwasserbereiche",
    beschreibung: "NEODUR VM basic ist ein mineralischer, hochfließfähiger Quellvergussbeton für kraftschlüssige Vergussarbeiten und Montagen aller Art, z. B. Rohrverguss in Trinkwasseranlagen. Geprüft gem. DVGW-Arbeitsblatt W 347 für hygienische Anforderungen in Trinkwasserbereichen.",
    normen: ["DVGW W 347", "DIN EN 1504-3 (R4)", "DAfStb-Richtlinie", "DIN EN 12620"],
    technischeDaten: [
      { label: "Körnung", wert: "0–5 mm" },
      { label: "Verarbeitung", wert: "Mischen + Pumpen / Gießen" },
      { label: "Lieferform", wert: "25-kg-Gebinde" },
    ],
    besonderheiten: [
      "Schrumpfarm, normal abbindend",
      "Frost- und tausalzbeständig",
      "Wasserundurchlässig, chloridfrei",
      "DAfStb-Richtlinie (SKVB II)",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-svm-03",
    tdsUrl: "/downloads/tds/NEODUR_SVM_03_SVM_4_de.pdf",
    name: "NEODUR SVM 03",
    kategorie: "sonstige",
    // #308: Schnellvergussmörtel → Sammelbereich Betonsanierung.
    bereich: "spezialmoertel",
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Schnellvergussmörtel für Vergussquerschnitte von 5 bis 20 mm",
    beschreibung: "Schnellerhärtender Vergussmörtel für Vergussquerschnitte von 5 bis 20 mm. Verbindet Beton kraftschlüssig mit Stahleinbauteilen, wenn eine schnelle Wiederinbetriebnahme gefordert ist.",
    qualitaetsklasse: "C50/60",
    normen: [
      "DIN EN 13395-2",
      "DIN EN 445",
      "DIN EN 13670",
      "DIN 1045-3",
      "DIN EN 13892-2",
    ],
    technischeDaten: [{ label: "Vergussquerschnitt", wert: "5–20 mm" }],
    besonderheiten: ["Schnellerhärtend", "Umweltproduktdeklaration (Gruppen-EPD) verfügbar"],
    zeitKategorie: "schnell",
  },
  {
    id: "neodur-svm-4",
    name: "NEODUR SVM 4",
    kategorie: "sonstige",
    // #308: Schnellvergussmörtel → Sammelbereich Betonsanierung.
    bereich: "spezialmoertel",
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Schnellvergussmörtel (Körnung 0–3 mm) für Vergussquerschnitte von 10 bis 50 mm",
    beschreibung: "Gebrauchsfertiger, frühhochfester Schnellvergussmörtel mit Körnung 0–3 mm für Vergussquerschnitte von 10 bis 50 mm. Besonders zum Verguss von Fahrleitungsmasten, wenn kurzfristige Belastbarkeit gefordert ist.",
    qualitaetsklasse: "C35/45",
    normen: [
      "DIN EN 13395-2",
      "DIN EN 445",
      "DIN EN 13670",
      "DIN 1045-3",
      "DIN EN 13892-2",
    ],
    tdsUrl: "/downloads/tds/NEODUR_SVM_03_SVM_4_de.pdf",
    technischeDaten: [
      { label: "Vergussquerschnitt", wert: "10–50 mm" },
      { label: "Druckfestigkeit nach 1 h", wert: "≥ 7 N/mm²" },
      { label: "Druckfestigkeit nach 24 h", wert: "≥ 15 N/mm²" },
      { label: "Druckfestigkeit nach 28 d", wert: "≥ 40 N/mm²" },
    ],
    besonderheiten: ["Schnellerhärtend", "Kurzfristig belastbar", "Körnung 0–3 mm"],
    zeitKategorie: "schnell",
  },
  {
    id: "neodur-msm-3",
    tdsUrl: "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
    name: "NEODUR MSM 3",
    kategorie: "sonstige",
    // #308: Microsilica-Spritzmörtel → Sammelbereich Betonsanierung.
    bereich: "rapid-set",
    zusatzBereiche: ["spezialmoertel"],
    aussenbereich: true,
    produktgruppe: "spritzmoertel",
    kurzbeschreibung: "Spritzmörtel für die Betoninstandsetzung, Körnung 0 bis 3 mm",
    beschreibung: "Die Betoninstandsetzung umfasst Technologien zur Wiederherstellung von Bauteilen aus Beton. NEODUR MSM 3 ist ein mineralischer Spritzmörtel mit Körnung 0 bis 3 mm, Verarbeitung gem. DIN 18551 in Verbindung mit DIN EN 14487.",
    qualitaetsklasse: "C35/45",
    normen: [
      "DIN 18551",
      "DIN EN 14487",
      "DIN EN 13670",
      "DIN 1045-3",
    ],
    technischeDaten: [{ label: "Körnung", wert: "0–3 mm" }],
    besonderheiten: ["Umweltproduktdeklaration (Gruppen-EPD) verfügbar"],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-msm-5",
    tdsUrl: "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
    name: "NEODUR MSM 5",
    kategorie: "sonstige",
    // #308: Microsilica-Spritzmörtel → Sammelbereich Betonsanierung.
    bereich: "rapid-set",
    zusatzBereiche: ["spezialmoertel"],
    aussenbereich: true,
    produktgruppe: "spritzmoertel",
    kurzbeschreibung: "Spritzmörtel für die Betoninstandsetzung, Körnung 0 bis 5 mm",
    beschreibung: "Die Betoninstandsetzung umfasst Technologien zur Wiederherstellung von Bauteilen aus Beton. NEODUR MSM 5 ist ein mineralischer Spritzmörtel mit Körnung 0 bis 5 mm.",
    qualitaetsklasse: "C35/45",
    normen: [
      "DIN 18551",
      "DIN EN 14487",
      "DIN EN 13670",
      "DIN 1045-3",
    ],
    technischeDaten: [{ label: "Körnung", wert: "0–5 mm" }],
    besonderheiten: [],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-msb-8",
    tdsUrl: "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
    name: "NEODUR MSB 8",
    kategorie: "sonstige",
    // #308: Microsilica-Spritzbeton → Sammelbereich Betonsanierung.
    bereich: "rapid-set",
    zusatzBereiche: ["spezialmoertel"],
    aussenbereich: true,
    produktgruppe: "spritzmoertel",
    kurzbeschreibung: "Spritzbeton für die Betoninstandsetzung, Körnung 0 bis 8 mm",
    beschreibung: "Die Betoninstandsetzung umfasst Technologien zur Wiederherstellung von Bauteilen aus Beton. NEODUR MSB 8 ist ein mineralischer Spritzbeton mit Körnung 0 bis 8 mm.",
    qualitaetsklasse: "C35/45",
    normen: [
      "DIN 18551",
      "DIN EN 14487",
    ],
    technischeDaten: [{ label: "Körnung", wert: "0–8 mm" }],
    besonderheiten: [],
    zeitKategorie: "normal",
  },
  {
    id: "rapid-set-concrete-mix",
    tdsUrl: "/downloads/tds/Concrete_Mix_de.pdf",
    name: "Rapid Set CONCRETE MIX",
    kategorie: "schnellzement",
    bereich: "rapid-set",
    zusatzBereiche: ["industrieboden"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    bild: "/images/produkte/rapid-set-concrete-mix.webp",
    kurzbeschreibung: "Schnellerhärtender Schnellbeton für Einbaustärken von 50 bis 600 mm, belastbar nach 1 Stunde",
    beschreibung: "CONCRETE MIX ist ein schnellerhärtender, gut zu verarbeitender Reparaturmörtel auf Basis Rapid-Set-Zement mit speziell ausgewählten mineralischen Zuschlagstoffen. Ideal, wo schnelle Festigkeiten, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind. Verarbeitbar in Stärken von 50 bis 600 mm, auch in Nassräumen; nicht-metallisch und ohne Chlorid-Zusätze.",
    schichtdicke: "50–600 mm",
    qualitaetsklasse: "C35/45",
    normen: [],
    technischeDaten: [
      { label: "Körnung", wert: "0–8 mm" },
      { label: "Erstarrungsbeginn", wert: "nach 15 Min." },
      { label: "Belastbar", wert: "nach 60 Min." },
      { label: "Druckfestigkeit", wert: "nach 60 Min. 19 N/mm², nach 28 Tagen 41 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "nach 60 Min. 4,5 N/mm², nach 28 Tagen 7 N/mm²" },
      { label: "Frost-Tausalzbeständigkeit", wert: "ja" },
      { label: "Sulfatbeständigkeit", wert: "ja" },
    ],
    besonderheiten: [
      "Einbaustärken bis 600 mm in einem Arbeitsgang",
      "Nicht-metallisch, ohne Chlorid-Zusätze",
      "Geeignet in Nassräumen",
    ],
    systemBegleitprodukte: ["rapid-set-concrete-pharmacy"],
    zeitKategorie: "schnell",
  },
  {
    id: "rapid-set-concrete-pharmacy",
    tdsUrl: "/downloads/tds/Concrete_Pharmacy_de.pdf",
    name: "Rapid Set CONCRETE PHARMACY",
    kategorie: "sonstige",
    bereich: "rapid-set",
    produktgruppe: "additive",
    kurzbeschreibung: "Additiv-System zur Steuerung der Verarbeitungseigenschaften von Rapid-Set-Produkten",
    beschreibung: "Die CONCRETE PHARMACY umfasst drei Additive zur Steuerung der Verarbeitungseigenschaften von Rapid-Set-Produkten: SET Control verzögert die Abbindezeit und verlängert die Verarbeitungszeit, FLOW Control verbessert die Fließfähigkeit und reduziert den Anmachwasserbedarf um 20 bis 40 Prozent, FAST beschleunigt die Abbindezeit von CEMENT ALL, MORTAR MIX und CONCRETE MIX, ideal bei kalten Temperaturen.",
    normen: [],
    technischeDaten: [],
    besonderheiten: [
      "Wirkt auf CEMENT ALL, MORTAR MIX und CONCRETE MIX",
      "FLOW Control: 20–40 % weniger Anmachwasser bei gleichem Ausbreitmaß",
    ],
    varianten: [
      { name: "SET Control", hinweis: "Verzögerer für längere Verarbeitungszeit" },
      { name: "FLOW Control", hinweis: "Verflüssiger, erhöht Festigkeiten" },
      { name: "FAST Control", hinweis: "Beschleuniger für kalte Temperaturen" },
    ],
    zeitKategorie: "normal",
  },

  // === WEBSITE-MIGRATION STUFE 2, KATZENSTREU (2026-06-12, Variante B) ===
  // Quelle: bereiche_katzenstreu_details.md. B2B-Bereich (Handel/Private
  // Label), bewusst schlank — Review-Entscheidung Steffi 2026-06-12.
  {
    id: "goodcat-golden-nature",
    name: "goodcat golden nature",
    kategorie: "sonstige",
    bereich: "katzenstreu",
    produktgruppe: "premium",
    kurzbeschreibung: "Bentonit-Klumpstreu mit brauner Körnung, hoher Geruchsbindung und extrastarker Klumpenbildung",
    beschreibung: "goodcat Klumpstreu ist unbehandelt und ein 100 % reines Naturprodukt. golden nature: braune Körnung, hohe Geruchsbindung, extrastarke Klumpenbildung, staubarm und unbehandelt.",
    normen: [],
    technischeDaten: [{ label: "Gebinde", wert: "7 Liter" }],
    besonderheiten: ["100 % reines Naturprodukt", "Staubarm und unbehandelt", "Extrastarke Klumpenbildung"],
    zeitKategorie: "normal",
  },
  {
    id: "goodcat-organic-love",
    name: "goodcat organic love",
    kategorie: "sonstige",
    bereich: "katzenstreu",
    produktgruppe: "premium",
    kurzbeschreibung: "Klumpstreu aus 100 % Pflanzenfasern mit hoher Geruchsbindung",
    beschreibung: "goodcat Klumpstreu ist unbehandelt und ein 100 % reines Naturprodukt. organic love: 100 % Pflanzenfasern, hohe Geruchsbindung, gute Klumpenbildung, staubarm und unbehandelt.",
    normen: [],
    technischeDaten: [{ label: "Gebinde", wert: "8 Liter" }],
    besonderheiten: ["100 % Pflanzenfasern", "Staubarm und unbehandelt", "Gute Klumpenbildung"],
    zeitKategorie: "normal",
  },
  {
    id: "goodcat-silver-classic",
    name: "goodcat silver classic",
    kategorie: "sonstige",
    bereich: "katzenstreu",
    produktgruppe: "standard",
    kurzbeschreibung: "Bentonit-Klumpstreu mit klassisch weißer Körnung und hoher Geruchsbindung",
    beschreibung: "goodcat Klumpstreu ist unbehandelt und ein 100 % reines Naturprodukt. silver classic: klassisch weiße Körnung, hohe Geruchsbindung, extrastarke Klumpenbildung, staubarm und unbehandelt.",
    normen: [],
    technischeDaten: [{ label: "Gebinde", wert: "7 Liter" }],
    besonderheiten: ["100 % reines Naturprodukt", "Staubarm und unbehandelt", "Extrastarke Klumpenbildung"],
    zeitKategorie: "normal",
  },


  // === TDS-NACHLIEFERUNG STEFFI 2026-06-12 (docs/tds-quellen/) ===
  {
    id: "koromineral-lasur",
    tdsUrl: "/downloads/tds/KOROMINERAL_Lasur_de_.pdf",
    name: "KOROMINERAL Lasur",
    kategorie: "beschichtung",
    bereich: "industrieboden",
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    zusatzBereiche: ["infrastruktur"],
    produktgruppe: "impraegnierung",
    kurzbeschreibung: "Spezialimprägnierung mit farbiger Oberflächenvergütung auf Basis Lithiumsilikat",
    beschreibung: "KOROMINERAL Lasur wird zur Imprägnierung von zementgebundenen Estrich- und Betonflächen und speziell von KORODUR Estrichen verwendet. Durch die Pigmentierung entsteht eine farbige Oberflächenvergütung. Verarbeitung mit kurzfloriger Nylonwalze in zwei Arbeitsgängen im Kreuzgang.",
    normen: [],
    technischeDaten: [
      { label: "Form", wert: "flüssig" },
      { label: "Farben", wert: "steingrau, mausgrau (keine RAL-Farben)" },
      { label: "Oberflächentemperatur", wert: "+10 °C bis +25 °C" },
      { label: "Trocknungszeit zwischen den Arbeitsgängen", wert: "1–3 Stunden (temperaturabhängig)" },
    ],
    besonderheiten: [
      "Farbige Oberflächenvergütung auf Lithiumsilikat-Basis",
      "Zwei Arbeitsgänge im Kreuzgang",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-pfm-1k-easyfix",
    tdsUrl: "/downloads/tds/NEODUR_PFM_1K_Easyfix_de.pdf",
    name: "NEODUR PFM 1K Easyfix",
    kategorie: "sonstige",
    // #308: Spezialmörtel (Neubau) + Betonsanierung (Sanierungsanteil).
    bereich: "spezialmoertel",
    zusatzBereiche: ["rapid-set"],
    aussenbereich: true,
    produktgruppe: "pflasterfugen",
    kurzbeschreibung: "Fix- und fertiger, 1-komponentiger Pflasterfugenmörtel für Fußgängerbereiche",
    beschreibung: "NEODUR PFM 1K Easyfix dient der Verfugung und Sanierung von Pflasterflächen bei leichter Belastung, z. B. Terrassen und Gehwege. Für Fugenbreiten ab 5 mm und Fugentiefen ab 30 mm.",
    normen: [],
    technischeDaten: [
      { label: "Farben", wert: "natur, steingrau, basalt" },
      { label: "Festmörtelrohdichte", wert: "ca. 1,37 kg/dm³" },
      { label: "Druckfestigkeit", wert: "≥ 4,0 N/mm²" },
      { label: "Biegezugfestigkeit", wert: "≥ 2,2 N/mm²" },
      { label: "Verarbeitungszeit", wert: "ca. 20–30 Minuten" },
      { label: "Temperatur", wert: "Untergrund > 8 °C, Verarbeitung > 10 °C" },
      { label: "Begehbar", wert: "nach 24 Stunden" },
    ],
    besonderheiten: [
      "Gebrauchsfertig, 1-komponentig",
      "Fugenbreite ab 5 mm, Fugentiefe ab 30 mm",
      "Nur für Fußgängerbereiche (leichte Belastung)",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-pfm-ze",
    tdsUrl: "/downloads/tds/NEODUR_PFM_ZE_PFM_ZE_Flex_de.pdf",
    name: "NEODUR PFM-ZE",
    kategorie: "sonstige",
    // #308: Spezialmörtel (Neubau) + Betonsanierung (Sanierungsanteil).
    bereich: "spezialmoertel",
    zusatzBereiche: ["rapid-set"],
    aussenbereich: true,
    produktgruppe: "pflasterfugen",
    kurzbeschreibung: "Pflasterfugenmörtel auf Zementbasis für Pflaster- und Plattenflächen in starrer Bauweise",
    beschreibung: "NEODUR PFM-ZE und PFM-ZE Flex sind werksmäßig hergestellte Trockenmörtel auf Zement- und Natursandbasis (0–2 mm) für die Neuverfugung von Natur- und Betonpflaster bzw. Betonplatten in starrer Bauweise, Bauklasse IV bis VI. Die Fugenbreite sollte mindestens 8 mm betragen.",
    normen: [],
    technischeDaten: [
      { label: "Basis", wert: "Zement- und Natursandbasis, Körnung 0–2 mm" },
      { label: "Verarbeitungszeit", wert: "ca. 40 Minuten" },
      { label: "Verarbeitungstemperatur", wert: "+5 °C bis +25 °C" },
      { label: "Belastbar", wert: "mit Pkw nach 7 Tagen" },
      { label: "Lieferform", wert: "25-kg-Papierspezialverpackung" },
    ],
    besonderheiten: [
      "Starre Bauweise, Bauklasse IV bis VI",
      "Nachbehandlung: 7 Tage Folienabdeckung",
    ],
    varianten: [
      { name: "NEODUR PFM-ZE", hinweis: "Pflasterflächen · grau/hellgrau · Druckfestigkeit ≥ 50 N/mm²" },
      { name: "NEODUR PFM-ZE Flex", hinweis: "Plattenflächen · grau · Druckfestigkeit ≥ 40 N/mm²" },
    ],
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

// #177: Einsatzbereiche (PDP "Wo wird das eingesetzt?") aus separater, generierter
// Map mergen. Quelle: TDS + Produktkontext (data/produktEinsatzbereiche.ts).
// Bestehende einsatzbereiche am Produkt haben Vorrang.
for (const p of produkte) {
  if (!p.einsatzbereiche?.length && PRODUKT_EINSATZBEREICHE[p.id]) {
    p.einsatzbereiche = PRODUKT_EINSATZBEREICHE[p.id];
  }
}

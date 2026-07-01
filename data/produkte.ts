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
  /** Leichtes Inline-Varianten-Array am Stammprodukt (z. B. SVS 3, SVS 1,5,
   *  metallisch). Für Einfach-Produkte, die KEINE eigenen Varianten-PDPs
   *  bekommen. ACHTUNG Reversal 2026-06-30 (#367): Familien wie NEODUR HE 65
   *  werden in V1 NICHT mehr hier gepflegt, sondern als je eigenständige,
   *  gleichrangige Produkte mit gemeinsamem `variantenGruppe` (eigene PDP je
   *  Ausführung, keine Basis-PDP). Dieses Feld bleibt für unmigrierte/einfache
   *  Fälle erhalten. */
  varianten?: { name: string; qualitaetsklasse?: string; hinweis?: string; sku?: string }[];
  /** Artikelnummer/SKU der konkreten Ausführung (Alt-Site-XML). Nicht
   *  übersetzt. V1-Varianten-PDP (#368). */
  sku?: string;
  /** Gruppenschlüssel für eigenständige Varianten-PDPs einer Familie (#367/#368).
   *  Konvention: = `id` der Standard-/Mutter-Ausführung (z. B. "neodur-he-65").
   *  Geschwister = alle Produkte mit gleicher `variantenGruppe`. KEIN Hub, KEINE
   *  Vererbung — speist nur Vergleichstabelle + dezente Geschwister-Links (#369)
   *  und die Lösungsfinder-/Matrix-Entdoppelung (#370). Nicht übersetzt. */
  variantenGruppe?: string;
  /** Basis-Hartstoff/Zuschlag der Ausführung (z. B. "KORODUR VS 0/5",
   *  "WH-metallisch"). Spalte der Ausführungs-Vergleichstabelle (#369). */
  basisHartstoff?: string;
  /** Kurzer Schwerpunkt der Ausführung für die Vergleichstabelle (#369),
   *  z. B. "Standard, höchste Belastung" / "Panzerestrich, Eisenräderverkehr". */
  variantenSchwerpunkt?: string;
  /** Cross-Sell/System-Begleitprodukte (Produkt-IDs, z. B. "korodur-hb-5",
   *  "koromineral-cure"). NICHT die Geschwister derselben Familie — die laufen
   *  über `variantenGruppe`. Wird als Cross-Sell-Karten gerendert (#369). */
  verwandteProdukte?: string[];
  schichtdicke?: string;
  qualitaetsklasse?: string;
  normen: string[];
  /** `norm` optional je Kennwert-Zeile (Norm rechts neben dem Wert, #368/#369).
   *  Abwärtskompatibel/leer-safe. Werte erarbeitet die Technik und liefert sie
   *  über die PDB (Produktdatenbank/Notion-SoT) — bis dahin provisorisch. */
  technischeDaten: { label: string; wert: string; norm?: string }[];
  besonderheiten: string[];
  /** Einsatzbereiche/Anwendungen als Bullet-Liste für die PDP ("wo wird das
   *  eingesetzt"). Kundentauglicher Klartext, NICHT die Lösungsfinder-Taxonomie.
   *  Optional; rendert leer sauber. Content-Befüllung via Issue (KORODUR-Claude),
   *  Frank-prüfbar auf der Live-Seite. */
  einsatzbereiche?: string[];
  verarbeitung?: Verarbeitung;
  /** Mehrere Verarbeitungs-Modi (z. B. A „frisch auf frisch" / B „auf erhärteten
   *  Tragbeton") für die Varianten-PDP (#368/#369). Ergänzt das einfache
   *  `verarbeitung`-Objekt; für Einfach-Produkte leer lassen. Quelle: TDS. */
  verarbeitungModi?: { titel: string; schritte: string[] }[];
  /** Meta-Karten neben den Verarbeitungs-Modi (Nachbehandlung, Fugen,
   *  Lieferform/Lagerung) für die Varianten-PDP (#369). Quelle: TDS. Leer-safe. */
  verarbeitungMeta?: { titel: string; text: string }[];
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
  /** Kuratiertes Kachel-Szenario (#356/#304): Slug der Referenz, deren Hero-Foto
   *  als Einsatz-Szene auf der Produkt-Kachel gezeigt wird. Ohne Angabe wird die
   *  repräsentativste Referenz automatisch gewählt; fehlt auch die, fällt die
   *  Kachel auf das Produkt-Mockup (`bild`) zurück. */
  heroReferenz?: string;
}

// ===========================================================================
// NEODUR HE 65 — Familie (#372, Pilot V1-Varianten-PDPs).
// Jede Ausführung ist ein eigenständiges, gleichrangiges Produkt mit eigener
// PDP, verknüpft über `variantenGruppe: "neodur-he-65"` (Mutter = Standard).
// Geteilte Inhalte aus der Familien-TDS (docs/tds-quellen/texts/13_NEODUR_HE_65
// .txt) + Alt-Site-XML, quellenbelegt. NORMWERTE PROVISORISCH (aus TDS/CT-Klasse
// abgeleitet) bis der Technik-Termin sie über die PDB final liefert (#368).
// ===========================================================================
const HE65_BESONDERHEITEN = [
  "Hochverschleißfest auch bei schwerster Beanspruchung",
  "Hohe Oberflächendichtigkeit",
  "Beständig gegen Benzin, Mineralöl, Lösemittel",
  "Hubladerfest",
  "Wasserfest, nassraumtauglich",
  "Rutschfest, gleitsicher",
  "Frostbeständig",
  "Chloridfrei",
];
const HE65_EINSATZ = [
  "Fabrikhallen",
  "Werkstätten",
  "Hochregallager",
  "Industrieflächen mit stärkster Beanspruchung",
];
const HE65_VERWANDTE = ["korodur-hb-5", "korocure", "koromineral-cure", "korotex", "koromineral-li", "korodur-nanofinish"];
// 2 Verarbeitungs-Modi (frisch auf frisch / auf erhärtetem Tragbeton), aus TDS.
const HE65_VERARBEITUNG_MODI = [
  {
    titel: "Frisch auf frisch",
    schritte: [
      "Untergrund: Tragbeton mind. C 25/30 (DIN EN 206, kein Luftporenbeton), höhengerecht nach DIN 18202. Zwischen-Nachbehandlung des Tragbetons mit KOROCURE. Frischen, begehbaren Tragbeton mit Tellerglättmaschine abreiben.",
      "Verarbeitung: HE 65 mit vorgegebener Wassermenge ca. 3 Min. (Zwangsmischer) mischen, auf die abgetellerte Fläche aufbringen, über Lehren abziehen, porenschließend abreiben und je nach Oberfläche glätten (Flügelglättmaschine).",
    ],
  },
  {
    titel: "Auf erhärtetem Tragbeton",
    schritte: [
      "Untergrund: Erhärteter Tragbeton (C 25/30, Oberflächenzugfestigkeit ≥ 1,5 N/mm²) fräsen/kugelstrahlen — rissefrei, rau, offenporig (DIN 18365/18560). Einen Tag vorher vornässen. Haftbrücke KORODUR HB 5 auftragen.",
      "Verarbeitung: Verlegung analog „frisch auf frisch“ in i. M. 15 mm Schichtdicke (siehe Datenblatt KORODUR-KOROTAN).",
    ],
  },
];
const HE65_META = (lieferform: string) => [
  { titel: "Nachbehandlung", text: "Vor zu rascher Austrocknung schützen (DIN EN 13670 / DIN 1045-3). Empfehlung: KOROMINERAL CURE oder KOROTEX." },
  { titel: "Fugen", text: "Fugenraster vom Planer. Alle Fugen des Tragbetons in der Hartstoffschicht übernehmen; von aufgehenden Bauteilen trennen." },
  { titel: "Lieferform / Lagerung", text: lieferform },
];
// Schichtdicke-Kennwerte aus CT-Klasse ableiten (member-korrekt, norm provisorisch).
const he65Technik = (klasse: string, c: string, f: string, aWert: string) => [
  { label: "Klassifizierung", wert: klasse, norm: "DIN EN 13813" },
  { label: "Druckfestigkeit", wert: `≥ ${c} N/mm²`, norm: "DIN EN 13892-2" },
  { label: "Biegezugfestigkeit", wert: `≥ ${f} N/mm²`, norm: "DIN EN 13892-2" },
  { label: "Verschleißwiderstand (Böhme)", wert: aWert, norm: "DIN EN 13892-3" },
  { label: "Körnung", wert: "0–5 mm" },
  { label: "Farbe", wert: "zementgrau" },
];
const HE65_LIEFER_25 = "25-kg-Papierspezialverpackung, lose als Silo- und Big-Bag-Ware. Trocken lagern, Haltbarkeit ca. 12 Monate.";
// HE 65 Plus: kunststoffmodifiziert, ohne Haftbrücke, frost-/tausalzbeständig, WHG.
const HE65_PLUS_BESONDERHEITEN = [
  "Ohne zusätzliche Haftbrücke verarbeitbar",
  "Polymermodifiziert & faserverstärkt",
  "Frost- und tausalzbeständig",
  "WHG-tauglich",
  "Hochverschleißfest auch bei schwerster Beanspruchung",
  "Hohe Oberflächendichtigkeit",
  "Beständig gegen Benzin, Mineralöl, Lösemittel",
  "Chloridfrei",
];
const HE65_PLUS_EINSATZ = ["Parkhäuser", "Industriehallen", "Montagehallen", "Flugzeughallen", "Werkstätten"];
const HE65_PLUS_VERWANDTE = ["korocure", "koromineral-cure", "korotex", "koromineral-li", "korodur-nanofinish"];
const HE65_PLUS_MODI = [
  {
    titel: "Auf erhärtetem Tragbeton (ohne Haftbrücke)",
    schritte: [
      "Untergrund: Erhärteter Tragbeton (C 25/30, Oberflächenzugfestigkeit ≥ 1,5 N/mm²) fräsen/kugelstrahlen — rissefrei, rau, offenporig (DIN 18365/18560). Einen Tag vorher vornässen. HE 65 Plus wasserverdünnt in schlämmfähiger Konsistenz als Haftgrund einbürsten.",
      "Verarbeitung: HE 65 Plus ca. 3 Min. mischen, „frisch auf frisch“ auf den vorgeschlämmten Untergrund über Lehren abziehen, porenschließend abreiben und je nach Oberfläche glätten.",
    ],
  },
];

// ===========================================================================
// NEODUR HE 3 — Familie (#395, Welle 1). Hartstoff-EINSTREUUNG (Trockeneinstreu-
// verfahren), je Ausführung eigenständiges Produkt, variantenGruppe "neodur-he-3"
// (Mutter = Standard). Inhalte aus Alt-XML + HE-3-TDS via Workflow, quellenbelegt.
// technischeDaten bewusst als KLASSEN (C/F/A aus der CT-Klasse, quelltreu) statt
// abgeleiteter ≥-Werte. NORMWERTE PROVISORISCH bis PDB/Technik-Termin (#368).
// ===========================================================================
const HE3_BESONDERHEITEN = [
  "Erhöhte Oberflächenhärte",
  "Hoher Verschleißwiderstand bei unmittelbarer industrieller Bodenbeanspruchung",
  "Für innen und außen geeignet",
  "Auch farbig lieferbar",
];
const HE3_EINSATZ = ["Industrieböden mit stärkster Bodenbeanspruchung", "Innen- und Außenflächen"];
const HE3_VERWANDTE = ["korocure", "korotex", "koromineral-cure", "koromineral-li", "koroclean", "korodur-nanofinish"];
const HE3_MODI = [
  {
    titel: "Einstreuverfahren (Hartstoffeinstreuung)",
    schritte: [
      "Trockeneinstreuung: NEODUR HE 3 gleichmäßig auf den frischen KORODUR Industrieboden/Beton einstreuen und einarbeiten — verbessert Oberflächenhärte und Verschleißwiderstand.",
      "Zwischen-Nachbehandlung mit KOROCURE, anschließend Nachbehandlung mit KOROTEX bzw. KOROMINERAL Cure.",
    ],
  },
];
const HE3_META = (gebinde: string) => [
  { titel: "Nachbehandlung", text: "Zwischen-Nachbehandlung mit KOROCURE; Nachbehandlung mit KOROTEX bzw. KOROMINERAL Cure; Imprägnierung mit KOROMINERAL bzw. KOROMINERAL Li+." },
  { titel: "Oberflächenbearbeitung", text: "Oberflächenbearbeitung mit KOROCLEAN; optionales Finish mit KORODUR nanoFinish." },
  { titel: "Lieferform / Lagerung", text: `${gebinde}, lose als Siloware. Trocken lagern, Haltbarkeit ca. 12 Monate.` },
];
// Kennwerte als Klassen aus der CT-Klasse (quelltreu, keine abgeleiteten ≥-Werte).
const he3Technik = (klasse: string, c: string, f: string, aWert: string, gruppe: string) => [
  { label: "Klassifizierung", wert: klasse, norm: "DIN EN 13813" },
  { label: "Druckfestigkeitsklasse", wert: `C ${c}`, norm: "DIN EN 13892-2" },
  { label: "Biegezugfestigkeitsklasse", wert: `F ${f}`, norm: "DIN EN 13892-2" },
  { label: "Verschleißwiderstand (Böhme)", wert: aWert, norm: "DIN EN 13892-3" },
  { label: "Hartstoffgruppe (DIN 1100)", wert: gruppe },
];

export const produkte: Produkt[] = [
  // === ESTRICHE / INDUSTRIEESTRICHE ===
  {
    id: "neodur-he-60-rapid",
    sku: "1220049S25KG",
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
    beschreibung:
      "NEODUR HE 60 rapid ist ein gebrauchsfertiger, schnellerhärtender Hartstoff-Verbundestrich auf Basis hochwertiger KORODUR-Hartstoffzuschläge nach DIN 1100 (Gruppe A, M oder KS), mineralisch-hydraulisch gebunden und schwindarm. Für den raschen Einbau und die Sanierung von Verbundestrichen, schnell belast- und belegbar, mit erhöhtem Verschleißwiderstand. Schichtdicke ab 10 mm, z. B. für Fabrikhallen, Werkstätten, Hochregallager und andere stark beanspruchte Industrieböden. Für innen und außen.",
    schichtdicke: "ab 10 mm",
    qualitaetsklasse: "CT-C60-F8-A6",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 60 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Biegezugfestigkeit", wert: "≥ 8 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Verschleißwiderstand", wert: "A6 (≤ 6 cm³/50 cm²)", norm: "DIN EN 13892-3" },
      { label: "Begehbar nach", wert: "ca. 3 h" },
      { label: "Voll belastbar nach", wert: "ca. 24 h" },
    ],
    verarbeitungModi: [
      {
        titel: "Verbundestrich (einschichtig auf Tragbeton)",
        schritte: [
          "Untergrund: Tragbeton mind. C 25/30, Oberflächenzugfestigkeit >= 1,5 N/mm2, vorbereiten z. B. durch Fräsen und Kugelstrahlen.",
          "Oberfläche muss rissfrei, eben, frei von losen und mürben Bestandteilen und Feinstmörtelanreicherungen sowie rau und offenporig sein; Anforderungen der DIN 18365 und DIN 18560, Ebenheit nach DIN 18202, Tab. 3, Zeile 3.",
          "Tragbeton einen Tag vor der Verlegung gründlich vornässen, Pfützenbildung vermeiden.",
          "Auf die mattfeuchte Oberfläche die Haftbrücke KORODUR HB 5 rapid auftragen.",
          "NEODUR HE 60 rapid mit der vorgegebenen Wassermenge (ca. 2,75 l/25-kg-Gebinde) je nach Verarbeitungsart ca. 2-3 Minuten bis zur aufziehfähigen Konsistenz mischen.",
          "Frisch auf die noch feuchte Haftbrücke aufbringen und fluchtgerecht abziehen.",
          "Zeitgerecht mittels Tellerglättmaschine porenschließend abreiben und je nach verlangter Oberflächenstruktur glätten (Flügelglättmaschine).",
          "Verarbeitungstemperatur (Verarbeitungs-, Umgebungs- und Untergrundtemperatur) >= 5 °C; Verarbeitungszeit ca. 45-60 Minuten.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "NEODUR HE 60 rapid ist vor zu rascher Austrocknung gem. DIN EN 13670 / DIN 1045-3 zu schützen. Zur Nachbehandlung der NEODUR Hartstoffschicht werden KOROMINERAL CURE / Li+ oder KOROTEX empfohlen. Sind eine anschließende Oberflächenvergütung, Beschichtung oder Markierungen vorgesehen, sollte die Nachbehandlung nur mit Folie erfolgen." },
      { titel: "Fugen", text: "Das Fugenraster ist vom Planer vorzugeben. Alle Fugen im erhärteten Tragbeton sind in der Hartstoffschicht zu übernehmen. Der Hartstoffestrich ist von aufgehenden Bauteilen (Wände, Stützen etc.) zu trennen." },
      { titel: "Lieferform & Lagerung", text: "25 kg Papierspezialverpackung (alle Qualitäten) sowie Big-Bag. Trocken lagern wie Zement. Haltbarkeitsdauer ca. 12 Monate." },
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
    // HE 65 Standard = Mutter/Repräsentant der variantenGruppe (#372).
    id: "neodur-he-65",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    variantenGruppe: "neodur-he-65",
    sku: "1220024S25KG",
    basisHartstoff: "KORODUR VS 0/5",
    variantenSchwerpunkt: "Standard, höchste Belastung",
    name: "NEODUR HE 65",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich",
    beschreibung:
      "NEODUR HE 65 ist ein gebrauchsfertiger, zementgebundener Hartstoffestrich auf Basis von KORODUR VS 0/5. Einschichtig als Verbundestrich für höchste Belastungen gem. DIN 18560-7, auch farbig lieferbar. Für hochbeanspruchbare Industrieböden mit stärkster Beanspruchung.",
    schichtdicke: "A: 15/10/8 mm · KS: 6/5/4 mm",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he65Technik("CT-C70-F9-A6", "70", "9", "A6 (≤ 6 cm³/50 cm²)"),
    besonderheiten: HE65_BESONDERHEITEN,
    einsatzbereiche: HE65_EINSATZ,
    verarbeitungModi: HE65_VERARBEITUNG_MODI,
    verarbeitungMeta: HE65_META(HE65_LIEFER_25),
    verwandteProdukte: HE65_VERWANDTE,
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
    variantenGruppe: "neodur-he-65",
    sku: "1220051S25KG",
    basisHartstoff: "kunststoffmodifiziert",
    variantenSchwerpunkt: "Ohne Haftbrücke, frost-/tausalzbeständig, WHG",
    name: "NEODUR HE 65 Plus",
    kategorie: "estrich",
    kurzbeschreibung: "Hartstoffestrich Plus, ohne Haftbrücke",
    beschreibung:
      "NEODUR HE 65 Plus ist ein gebrauchsfertiger, zementgebundener, kunststoffmodifizierter Hartstoffestrich. Einschichtig als Verbundestrich auf erhärtetem Tragbeton (15–30 mm) ohne zusätzliche Haftbrücke. Frost- und tausalzbeständig, WHG-tauglich — auch für Außenbereiche.",
    schichtdicke: "15–30 mm",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: [
      ...he65Technik("CT-C70-F9-A6", "70", "9", "A6 (≤ 6 cm³/50 cm²)"),
      { label: "Frost-/Tausalzbeständig", wert: "Ja" },
      { label: "Haftbrücke erforderlich", wert: "Nein" },
    ],
    besonderheiten: HE65_PLUS_BESONDERHEITEN,
    einsatzbereiche: HE65_PLUS_EINSATZ,
    verarbeitungModi: HE65_PLUS_MODI,
    verarbeitungMeta: HE65_META(HE65_LIEFER_25),
    verwandteProdukte: HE65_PLUS_VERWANDTE,
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
    // Variante (#372) — kein Finder-/Matrix-Feld: die Mutter repräsentiert die
    // Gruppe (Entdoppelung folgt #370); im Katalog erscheint sie als eigene Kachel.
    id: "neodur-he-65-svs-3",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    variantenGruppe: "neodur-he-65",
    sku: "1220053S25KG",
    basisHartstoff: "KORODUR WH-Spezial",
    variantenSchwerpunkt: "Höhere Verschleißklasse (A3)",
    name: "NEODUR HE 65 SVS 3",
    kategorie: "estrich",
    kurzbeschreibung: "Hartstoffestrich, Verschleißklasse A3",
    beschreibung:
      "NEODUR HE 65 SVS 3 ist ein gebrauchsfertiger, zementgebundener Hartstoffestrich auf Basis von KORODUR WH-Spezial. Einschichtig als Verbundestrich für höchste Belastungen gem. DIN 18560-7, höhere Verschleißklasse A3. Auch farbig lieferbar.",
    schichtdicke: "A: 15/10/8 mm · KS: 6/5/4 mm",
    qualitaetsklasse: "CT-C70-F9-A3",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he65Technik("CT-C70-F9-A3", "70", "9", "A3 (≤ 3 cm³/50 cm²)"),
    besonderheiten: HE65_BESONDERHEITEN,
    einsatzbereiche: HE65_EINSATZ,
    verarbeitungModi: HE65_VERARBEITUNG_MODI,
    verarbeitungMeta: HE65_META(HE65_LIEFER_25),
    verwandteProdukte: HE65_VERWANDTE,
    tdsUrl: "/downloads/tds/NEODUR_HE_65_de.pdf",
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-65-svs-15",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    variantenGruppe: "neodur-he-65",
    sku: "1220060S30KG",
    basisHartstoff: "KORODUR Diamantbeton",
    variantenSchwerpunkt: "Höchster Abrieb (A1,5)",
    name: "NEODUR HE 65 SVS 1,5",
    kategorie: "estrich",
    kurzbeschreibung: "Hartstoffestrich, Verschleißklasse A1,5",
    beschreibung:
      "NEODUR HE 65 SVS 1,5 ist ein gebrauchsfertiger, zementgebundener Hartstoffestrich auf Basis von KORODUR Diamantbeton. Einschichtig als Verbundestrich für höchste Belastungen gem. DIN 18560-7, höchster Abriebwiderstand (Hartstoffgruppe KS). Auch farbig lieferbar.",
    schichtdicke: "KS: 6/5/4 mm",
    qualitaetsklasse: "CT-C70-F9-A1,5",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he65Technik("CT-C70-F9-A1,5", "70", "9", "A1,5 (≤ 1,5 cm³/50 cm²)"),
    besonderheiten: HE65_BESONDERHEITEN,
    einsatzbereiche: HE65_EINSATZ,
    verarbeitungModi: HE65_VERARBEITUNG_MODI,
    verarbeitungMeta: HE65_META(HE65_LIEFER_25),
    verwandteProdukte: HE65_VERWANDTE,
    tdsUrl: "/downloads/tds/NEODUR_HE_65_de.pdf",
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-65-metallisch",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    variantenGruppe: "neodur-he-65",
    sku: "1220032S40KG",
    basisHartstoff: "KORODUR WH-metallisch",
    variantenSchwerpunkt: "Panzerestrich, Eisenräderverkehr",
    name: "NEODUR HE 65 metallisch",
    kategorie: "estrich",
    kurzbeschreibung: "Metallischer Hartstoffestrich (Panzerestrich)",
    beschreibung:
      "NEODUR HE 65 metallisch ist ein zementgebundener Hartstoffestrich mit metallischem Hartstoffzuschlag (KORODUR WH-metallisch) gem. DIN 1100 (Gruppe M). Einschichtig als Verbundestrich für höchste Belastungen gem. DIN 18560-7. Extrem widerstandsfähig gegen schlagende und stoßende Beanspruchung — zur Herstellung von Panzerestrichen.",
    schichtdicke: "A: 15/10/8 mm",
    qualitaetsklasse: "CT-C80-F11-A3",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he65Technik("CT-C80-F11-A3", "80", "11", "A3 (≤ 3 cm³/50 cm²)"),
    besonderheiten: [
      "Metallischer Hartstoffzuschlag (DIN 1100 Gruppe M)",
      "Extrem schlag- und stoßfest",
      "Für Panzerestriche",
      "Hochverschleißfest auch bei schwerster Beanspruchung",
      "Hohe Oberflächendichtigkeit",
      "Hubladerfest",
      "Frostbeständig",
      "Chloridfrei",
    ],
    einsatzbereiche: [
      "Schwerer Eisenräderverkehr",
      "Kettenfahrzeuge",
      "Kollern",
      "Hartes Absetzen scharfkantiger Werkstücke",
      "Panzerestriche",
    ],
    verarbeitungModi: HE65_VERARBEITUNG_MODI,
    verarbeitungMeta: HE65_META("40-kg-Gebinde, lose als Silo- und Big-Bag-Ware. Trocken lagern, Haltbarkeit ca. 12 Monate."),
    verwandteProdukte: HE65_VERWANDTE,
    tdsUrl: "/downloads/tds/NEODUR_HE_65_metallisch_de.pdf",
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-65-plus-svs-3",
    bereich: "industrieboden",
    aussenbereich: true,
    produktgruppe: "hartstoffestriche",
    variantenGruppe: "neodur-he-65",
    sku: "1220056S25KG",
    basisHartstoff: "KORODUR WH-Spezial",
    variantenSchwerpunkt: "Plus + Verschleißklasse A3",
    name: "NEODUR HE 65 Plus SVS 3",
    kategorie: "estrich",
    kurzbeschreibung: "Hartstoffestrich Plus, Verschleißklasse A3",
    beschreibung:
      "NEODUR HE 65 Plus SVS 3 ist ein gebrauchsfertiger, zementgebundener, kunststoffmodifizierter Hartstoffestrich auf Basis von KORODUR WH-Spezial. Einschichtig als Verbundestrich auf erhärtetem Tragbeton ohne zusätzliche Haftbrücke, höhere Verschleißklasse A3. Frost- und tausalzbeständig.",
    schichtdicke: "15–30 mm",
    qualitaetsklasse: "CT-C70-F9-A3",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: [
      ...he65Technik("CT-C70-F9-A3", "70", "9", "A3 (≤ 3 cm³/50 cm²)"),
      { label: "Frost-/Tausalzbeständig", wert: "Ja" },
      { label: "Haftbrücke erforderlich", wert: "Nein" },
    ],
    besonderheiten: HE65_PLUS_BESONDERHEITEN,
    einsatzbereiche: HE65_PLUS_EINSATZ,
    verarbeitungModi: HE65_PLUS_MODI,
    verarbeitungMeta: HE65_META(HE65_LIEFER_25),
    verwandteProdukte: HE65_PLUS_VERWANDTE,
    tdsUrl: "/downloads/tds/NEODUR_HE_65_Plus_de.pdf",
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-40",
    sku: "1220040S25KG",
    bereich: "industrieboden",
    produktgruppe: "hartstoffestriche",
    varianten: [
      { name: "NEODUR HE 40/8", qualitaetsklasse: "CT-C40-F7-A6" },
    ],
    name: "NEODUR HE 40",
    kategorie: "estrich",
    kurzbeschreibung: "Hochbelastbarer Hartstoffestrich",
    beschreibung:
      "NEODUR HE 40 ist ein gebrauchsfertiges Trockenmaterial aus harten mineralischen KORODUR-Zuschlägen nach DIN 1100 (Gruppe A), in den Qualitäten NEODUR HE 40 (Estrichdicke bis 35 mm) und NEODUR HE 40/8 (bis 50 mm). Einschichtiger Einbau als Verbundestrich für sehr hohe Beanspruchung. Anwendungsbereiche: hochverschleißbeanspruchte Industrieböden wie Parkhäuser, Industrie- und Montagehallen, Flugzeughallen, Werkstätten und Hochregallager. Für innen und außen.",
    schichtdicke: "8–15 / 15–35 / 25–50 mm",
    qualitaetsklasse: "CT-C40-F6-A6",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: [
      { label: "Klassifizierung", wert: "CT-C40-F6-A6 (HE 40) / CT-C40-F7-A6 (HE 40/8)", norm: "DIN EN 13813" },
      { label: "Druckfestigkeit", wert: "C40 (≥ 40 N/mm²) nach 28 Tagen", norm: "DIN EN 13892-2" },
      { label: "Biegezugfestigkeit", wert: "F6 (≥ 6 N/mm²); HE 40/8: F7 (≥ 7 N/mm²) nach 28 Tagen", norm: "DIN EN 13892-2" },
      { label: "Verschleißwiderstand (Böhme)", wert: "A6 (≤ 6,0 cm³/50 cm²)", norm: "DIN EN 13892-3" },
      { label: "Hartstoffgruppe", wert: "Gruppe A", norm: "DIN 1100" },
      { label: "Körnung", wert: "0–5 mm (HE 40) / 0–8 mm (HE 40/8)" },
      { label: "Farbe", wert: "zementgrau" },
      { label: "Schichtdicke", wert: "frisch auf frisch 8–15 mm; im Verbund 15–35 mm; HE 40/8 im Verbund 25–50 mm", norm: "DIN 18560-7" },
      { label: "Materialverbrauch", wert: "ca. 2,1 kg/m² je mm Schichtdicke" },
      { label: "Wasserzugabe", wert: "ca. 3,25 l / 25-kg-Gebinde" },
      { label: "Verarbeitungszeit", wert: "ca. 2–3 Stunden (je nach Umgebungstemperatur)" },
      { label: "Verarbeitungstemperatur", wert: "≥ 5 °C (Material, Umgebung, Untergrund)" },
    ],
    verarbeitungModi: [
      { titel: "Verbundestrich frisch auf frisch", schritte: [
        "Tragbeton mind. C 25/30 gem. DIN EN 206 herstellen, kein Luftporenbeton, höhengerecht innerhalb der Toleranz nach DIN 18202.",
        "Zur Zwischen-Nachbehandlung des Tragbetons KOROCURE einsetzen; den frischen, soeben begehbaren Tragbeton mit Tellerglättmaschine abreiben.",
        "NEODUR HE 40 mit vorgegebener Wassermenge ca. 3 Minuten mischen.",
        "Auf die frische, zuvor abgetellerte Fläche aufbringen, über Lehren (Rundeisen) per Alu-Richtscheit oder Rüttelbohle abziehen.",
        "Zeitgerecht mit Tellerglättmaschine porenschließend abreiben und je nach verlangter Oberflächenstruktur mit Flügelglättmaschine glätten.",
      ] },
      { titel: "Verbundestrich auf erhärtetem Tragbeton", schritte: [
        "Tragbeton (mind. C 25/30, Oberflächenzugfestigkeit ≥ 1,5 N/mm²) vorbereiten, z. B. Fräsen und Kugelstrahlen; rissefrei, eben, frei von losen/mürben Bestandteilen, rau und offenporig (Anforderungen DIN 18365 / DIN 18560, Ebenheit DIN 18202 Tab. 3 Zeile 3).",
        "Tragbeton einen Tag vor der Verlegung gründlich vornässen, Pfützenbildung vermeiden.",
        "Haftbrücke KORODUR HB 5 auf die mattfeuchte Oberfläche auftragen; bei KORODUR uniPrimer ist unter normalen Bedingungen kein Vornässen erforderlich.",
        "NEODUR HE 40 analog der Verarbeitung 'frisch auf frisch' mischen, abziehen, porenschließend abreiben und glätten.",
      ] },
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
    sku: "1220285S25KG",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    name: "NEODUR Level",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, schnellerhärtender Dünnestrich",
    beschreibung:
      "NEODUR Level ist ein gebrauchsfertiger, zementär gebundener, schnellerhärtender und polymermodifizierter Mineralmörtel für Industrieböden in Dünnschicht von 4 bis 30 mm (CT-C40-F8-AR0,5). Einsatz in Neubau und Sanierung von Produktions- und Lagerhallen im Verbund auf mineralischen Untergründen, auch im Parkhausbereich.",
    schichtdicke: "4–30 mm",
    qualitaetsklasse: "CT-C40-F8-AR0,5",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Biegezugfestigkeit", wert: "F8", norm: "DIN EN 13892-2" },
      { label: "Verschleißwiderstand", wert: "AR 0,5", norm: "DIN EN 13892-4" },
      { label: "Selbstverlaufend", wert: "Ja" },
      { label: "Ebenheit", wert: "DIN 18202, Zeile 3" },
      { label: "Leicht belastbar nach", wert: "ca. 24 h" },
      { label: "Voll belastbar nach", wert: "ca. 3 Tage" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Zementären Untergrund vor der Verlegung durch Fräsen und/oder Kugelstrahlen vorbereiten.",
          "Vorhandene Risse, Ausbrüche und schadhafte Fugen fachgerecht instand setzen.",
          "Untergrund muss tragfähig, fest, sauber, trocken, rissfrei und frei von losen Teilen, Ölen, Fetten oder sonstigen haftungsmindernden Verunreinigungen sein.",
          "Oberflächenzugfestigkeit: ohne Fahrbeanspruchung >= 1,0 N/mm², mit Fahrbeanspruchung >= 1,5 N/mm². Es gelten die Anforderungen der DIN 18365 sowie der DIN 18560.",
          "Auf dem vorbereiteten Untergrund KORODUR PC Grundierung aufbringen (Verarbeitung siehe Datenblatt KORODUR PC).",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "NEODUR Level in ein sauberes, geeignetes Gefäß geben und mit ca. 4,5 l bis 5,0 l Wasser mit Mischquirl (mind. 650 UpM) oder Zwangsmischer ca. 3 - 5 Minuten knollenfrei und homogen anmischen.",
          "Maschinelle Verarbeitung mit handelsüblichen Schneckenpumpen bzw. durchlaufenden Mischpumpen möglich (Ausbreitmaß ca. 130 - 140 mm). Keine Mischtechnik verwenden, die große Mengen Luft einträgt.",
          "Material gleichmäßig mit geeignetem Rakel applizieren.",
          "Lufteinschlüsse durch Bearbeiten der noch fließfähigen Oberfläche mit einer geeigneten Stachelwalze entfernen.",
          "Materialtemperatur >= 10 °C halten; gemischtes NEODUR Level innerhalb 30 Minuten applizieren.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Unterschiedliche Temperaturen beeinflussen den Erstarrungs- bzw. Erhärtungsverlauf. NEODUR Level ist vor zu rascher Austrocknung, Zugluft, direkter Sonnen- und Wärmeeinwirkung gem. DIN EN 13670/DIN 1045-3 zu schützen. Die Luft- und Bodentemperatur muss während der Verarbeitung und eine Woche danach >= 8 °C betragen. Nach Trocknung/Begehbarkeit wird eine geeignete Imprägnierung bzw. Einpflege empfohlen (erhöht die chemische Beständigkeit, wirkt feuchtigkeits- und schmutzabweisend, optimiert die Optik, staubfreie Oberfläche)." },
      { titel: "Fugen", text: "Alle Fugen im Untergrund sind in der NEODUR Level Nutzschicht zu übernehmen. Der NEODUR Level Estrich ist von aufgehenden Bauteilen (Wände, Stützen, etc.) zu trennen." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 25 kg Papierspezialverpackung, 750 kg Big-Bag. Trocken lagern, wie Zement. Haltbarkeitsdauer ca. 6 Monate." },
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
    sku: "1220295",
    bereich: "industrieboden",
    produktgruppe: "truazzo",
    beschreibung: "Rapid Set TRU Self-Leveling ist ein auf spezieller Zementtechnologie basierender, selbstverlaufender, mineralischer, geschliffener Sichtestrich. Ideal, wenn Frühfestigkeit, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind: bis zu 20 Minuten verarbeitbar, nach 2 bis 3 Stunden begehbar und bereits 24 Stunden nach Einbau bis zur Hochglanzoptik schleifbar. In verschiedenen Farbvarianten und mit eingestreuter Dekorkörnung (z. B. Glas, Marmor) individuell gestaltbar.",
    name: "TRU Self-Leveling",
    kategorie: "estrich",
    kurzbeschreibung: "Selbstverlaufender, geschliffener dekorativer Sichtestrich",
    schichtdicke: "5–35 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: ["DIN EN 13813"],
    technischeDaten: [
      { label: "Druckfestigkeit", wert: "≥ 40 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Biegezugfestigkeit", wert: "≥ 10 N/mm²", norm: "ASTM C 307 Mod." },
      { label: "Optik", wert: "Betonähnliche Sichtestrich-Oberfläche" },
      { label: "Verarbeitung", wert: "Selbstverlaufend" },
      { label: "Haftbrücke", wert: "Nicht erforderlich" },
      { label: "Begehbar nach", wert: "ca. 2–3 h" },
      { label: "Schleifbar bis Hochglanz nach", wert: "ca. 24 h" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung & Grundierung",
        schritte: [
          "Zementären Untergrund als Tragbeton C25/30 oder Tragestrich mindestens CT-C35-F5 vorbereiten, z. B. durch Fräsen und Kugelstrahlen.",
          "Vorhandene Risse, Ausbrüche und schadhafte Fugen fachgerecht instand setzen; Fugen im Untergrund übernehmen.",
          "Untergrund muss tragfähig, fest, sauber, trocken und frei von losen Teilen, Ölen, Fetten oder haftungsmindernden Verunreinigungen sein.",
          "Oberflächenzugfestigkeit ≥ 1,5 N/mm² für befahrene bzw. ≥ 1,0 N/mm² für nicht befahrene Flächen; es gelten DIN 18365 und DIN 18560-3.",
          "Als Tragestrich nur zementäre, schwundarme, maschinengeglättete Estriche, Schichtstärke mind. 65 mm, Mindest-Festigkeitsklasse CT-C35-F5 in gefügedichter Konsistenz.",
          "2-komponentige Epoxidharz-Grundierung KORODUR TXPK aufbringen und mit feuergetrocknetem Quarzsand Körnung 0,4 - 0,8 mm satt absanden.",
        ],
      },
      {
        titel: "Mischen & Verarbeitung",
        schritte: [
          "Geeignete Mischtechnik verwenden (z. B. Hippo Mixer, Collomix-LevMix oder Mischquirl mit mind. 650 UpM); keine Technik, die große Mengen Luft einträgt.",
          "TRU Self-Leveling mit ca. 3,8 - 4,3 l Wasser je 22,7-kg-Gebinde 3 - 5 Minuten klumpenfrei anmischen; Konsistenz über das Ausbreitmaß (FLOW Kit) bestimmen.",
          "Auf den vorbereiteten und grundierten Untergrund in Schichtdicke 5 - 35 mm applizieren und mit geeignetem Rakel gleichmäßig verteilen.",
          "Noch flüssige Oberfläche mit einer Kunststoff-Stachelwalze entlüften.",
          "Innerhalb ca. 20 Minuten verarbeiten; Umgebungs- und Untergrundtemperatur 10 - 30 °C, Materialtemperatur über 10 °C halten.",
          "Fläche bis zum Zeitpunkt der Begehbarkeit vor zu schneller Austrocknung, Wind, Zugluft und Sonneneinstrahlung schützen.",
          "Bei Einbaustärken > 35 mm Material durch Zugabe von Quarzsand modifizieren (Rücksprache mit der Anwendungstechnik).",
        ],
      },
      {
        titel: "Schleifen & Polieren",
        schritte: [
          "TRU Self-Leveling ist bereits 24 Stunden nach Einbau schleifbar und verhält sich beim Schleifen und Polieren ähnlich wie Beton.",
          "Flächen können bis zur Hochglanzoptik geschliffen werden; eine Schleifanleitung ist auf Anfrage erhältlich.",
          "Beim Schleifen werden je nach gewünschter Optik bis zu 3 mm der ursprünglichen Einbaustärke heruntergeschliffen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung & Einpflege", text: "Bei 20 °C ist normalerweise keine Nachbehandlung mit Wasser erforderlich. Bei extrem trockenen, windigen, heißen oder sonnigen Bedingungen mit einem feinen Wassernebel auf die ausreichend abgebundene Fläche nachbehandeln. Nach Trocknung/Begehbarkeit wird eine geeignete Imprägnierung bzw. Einpflege empfohlen; sie erhöht die chemische Beständigkeit, wirkt feuchtigkeits- und schmutzabweisend und optimiert die Optik." },
      { titel: "Fugen", text: "Alle Fugen im erhärteten Tragbeton sind in der Sichtestrichschicht zu übernehmen. Der Sichtestrich ist von aufgehenden Bauteilen (Wände, Stützen etc.) zu trennen." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 22,7 kg Papierspezialverpackung. Trocken lagern wie Zement; Haltbarkeitsdauer ca. 12 Monate." },
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
    sku: "1220280S25KG",
    tdsUrl: "/downloads/tds/KORODUR_HB_5_rapid_de.pdf",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "untergrund-haftbruecken",
    name: "KORODUR HB 5 rapid",
    kategorie: "grundierung",
    kurzbeschreibung: "Schnellerhärtende Haftbrücke für kraftschlüssigen Verbund zum Untergrund",
    beschreibung:
      "KORODUR HB 5 rapid ist eine hydraulische Haftbrücke für die optimale Haftung von NEODUR HE 60 rapid auf erhärtetem Beton.",
    normen: [
      "DIN 1048-2",
      "DIN EN 13892-8",
      "DIN 18365",
      "DIN 18560",
      "DIN 18202",
    ],
    technischeDaten: [
      { label: "Untergrund-Anforderung", wert: "Tragbeton mind. C25/30, Oberflächenzugfestigkeit ≥ 1,5 N/mm²", norm: "DIN 18365, DIN 18560, DIN 18202" },
      { label: "Verarbeitungszeit", wert: "ca. 15 min" },
      { label: "Überarbeitbar nach", wert: "frisch-in-frisch" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Tragbeton mind. C25/30 mit Oberflächenzugfestigkeit ≥ 1,5 N/mm² vorbereiten, z. B. durch Fräsen und Kugelstrahlen.",
          "Oberfläche muss rissefrei, eben, frei von losen und mürben Bestandteilen sowie Feinstmörtelanreicherungen, rau und offenporig sein.",
          "Anforderungen der DIN 18365 und DIN 18560 einhalten; Ebenheit gemäß DIN 18202, Tab. 3, Zeile 3.",
          "Tragbeton einen Tag vor der Verlegung gründlich vornässen, Pfützenbildung vermeiden.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "KORODUR HB 5 rapid mit ca. 5,5 l Wasser je 25-kg-Gebinde mit langsam laufendem Quirl mind. 2 - 3 Minuten zu einer weichbreiigen Schlämme mischen; überwässertes Material nicht verwenden.",
          "Vor dem Auftrag muss der vorgenässte Tragbeton an der Oberfläche mattfeucht angetrocknet sein.",
          "Haftbrücke ca. 1 - 2 mm dick mit einem harten Straßenbesen aufbürsten.",
          "Bereits angetrocknete Haftbrücke (durch Hautbildung erkennbar) nicht überarbeiten, sondern entfernen.",
          "Schnellestrich NEODUR HE 60 rapid sofort auf die noch frische Haftbrücke verlegen, um vorzeitige Austrocknung zu vermeiden.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Fugen", text: "Alle Fugen im Untergrund sind zu übernehmen. Der Verbundestrich ist von aufgehenden Bauteilen (Wände, Stützen, etc.) zu trennen." },
      { titel: "Lieferform & Lagerung", text: "25 kg Papierspezialverpackung. Trocken lagern wie Zement. Haltbarkeitsdauer ca. 12 Monate." },
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
    sku: "1320579",
    tdsUrl: "/downloads/tds/KORODUR_PC_de.pdf",
    bereich: "industrieboden",
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "untergrund-haftbruecken",
    name: "KORODUR PC",
    kategorie: "grundierung",
    kurzbeschreibung: "Kunstharzdispersion-Grundierung für Dünnestrich-Systeme",
    beschreibung:
      "KORODUR PC ist eine wässrige, einkomponentige und lösemittelfreie Kunstharzdispersion. Sie dient als Grundierung für NEODUR Level und LevelFlor und wird als Haftgrund auf Untergründen wie Beton sowie Zement- oder Anhydritestrichen eingesetzt, glatt und geschlossen oder porös und saugend. Bei äußeren thermischen Beanspruchungen kann KORODUR PC als Mörtelzusatz verwendet werden.",
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
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Untergrund vor der Verlegung durch Fräsen und/oder Kugelstrahlen vorbereiten.",
          "Vorhandene Risse, Ausbrüche und schadhafte Fugen fachgerecht instand setzen.",
          "Untergrund muss tragfähig, fest, sauber, trocken, rissfrei und frei von losen Teilen, Ölen, Fetten oder sonstigen haftungsmindernden Verunreinigungen sein.",
          "Oberflächenzugfestigkeit ohne Fahrbeanspruchung ≥ 1,0 N/mm², mit Fahrbeanspruchung und/oder im Außenbereich ≥ 1,5 N/mm².",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "KORODUR PC vor Gebrauch durchrühren.",
          "Vorstrich entsprechend Einsatzbereich verdünnen: dichte Untergründe 1:1, saugfähige Untergründe 1:3 (KORODUR PC : Wasser).",
          "Mit Rolle, Pinsel, Besen oder Gummiwischer auf den vorbereiteten Untergrund auftragen, Pfützenbildung vermeiden.",
          "Bei saugfähigen Untergründen die Grundierung im Verhältnis 1:3 am Tag vor der Beschichtung aufbringen (gegen Blasenbildung).",
          "Am Tag der Verlegung im Verhältnis 1:1 mit Wasser verdünnt auftragen.",
          "Verlegung beginnen, sobald die Oberfläche nur noch leicht klebrig erscheint; zum Zeitpunkt der Verlegung von LevelFlor, NEODUR Level oder NEODUR Level AU muss KORODUR PC klebrig angetrocknet sein.",
          "Verarbeitungs-, Umgebungs- und Untergrundtemperatur ≥ 5 °C.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Lieferform & Lagerung", text: "Lieferform: 5 kg Kunststoffgebinde. Kühl, trocken und frostfrei im Originalgebinde lagern. Haltbarkeitsdauer ca. 12 Monate. Angebrochene Gebinde sofort verschließen." },
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
    sku: "1220505S25KG",
    bereich: "betonsanierung",
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
    normen: ["DIN EN 13813", "DIN EN 998-1"],
    technischeDaten: [
      { label: "Qualität", wert: "C55/67" },
      { label: "Druckfestigkeit (60 min)", wert: "> 20 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Druckfestigkeit (28 d)", wert: "> 62 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Gängige Einbaudicken", wert: "Boden 10–100 mm; Decke 5–10 mm; Wand 5–15 mm" },
      { label: "Begehbar nach", wert: "ca. 15 min" },
      { label: "Voll belastbar nach", wert: "ca. 1 h" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Untergrund säubern; lose Bestandteile, Zementschlämme, Staub, Säuren, Öl und Fett entfernen.",
          "Oberfläche muss rissefrei, eben sowie rau und offenporig sein; in den Regelwerken geforderte Oberflächenzugfestigkeiten beachten (1 N/mm² nicht unterschreiten).",
          "Untergrund vor der Verarbeitung gründlich vornässen; bei stark saugenden Untergründen ggf. mehrmals wiederholen. Wasserfilm bzw. Pfützenbildung vermeiden.",
          "Bei Bedarf eine Grundierung auf Acrylatbasis integrieren.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "Ausreichend Personal und geeignete Ausrüstung bzw. Werkzeug bereithalten.",
          "CEMENT ALL mit der vorgegebenen Wassermenge (ca. 3,0 - 4,75 l je 25 kg-Gebinde) je nach Art der Verarbeitung ca. 1 - 3 Minuten im Zwangsmischer oder Rührquirl mischen.",
          "Zuerst Wasser in den Mischbehälter vorgeben, dann bei laufendem Mischer/Rührquirl CEMENT ALL hinzugeben. Maximale Wasserzugabe nicht überschreiten (geringere Wasserzugabe erhöht die Festigkeiten).",
          "Einbau in einer kompletten Lage, nicht schichtweise und möglichst gleichmäßig; Luftporen bei der Verdichtung weitgehend verhindern.",
          "Endbearbeitung so schnell wie möglich; CEMENT ALL kann geglättet, gerieben oder mit Struktur versehen werden.",
          "Verarbeitungs-, Umgebungs- und Untergrundtemperatur ≥ 5 °C; keine Verlegung auf gefrorenen Untergründen. Bei > 20 °C verkürzt sich die Verarbeitungszeit, bei < 20 °C kann sich die Festigkeitsentwicklung verzögern.",
          "Zur Verlängerung der Verarbeitungszeit Rapid Set SET CONTROL (Verzögerer), für erhöhte Fließfähigkeit Rapid Set FLOW CONTROL (Plastifizierer) oder zur Beschleunigung der Abbindezeit das Additiv FAST zugeben.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Die Nachbehandlung mit Wasser hat unmittelbar zu erfolgen, sobald die Oberfläche ihren feuchten Glanz verloren hat, und sollte innerhalb einer Stunde wiederholt durchgeführt werden, bis das Produkt ausreichende Festigkeiten erreicht hat. Bei längeren Abbindezeiten, niedrigen Temperaturen oder Verwendung eines Verzögerers können längere Nachbehandlungszeiten erforderlich sein." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 25 kg Papierspezialverpackung, 5 kg Kunststoffgebinde. Lagerung: trocken lagern wie Zement, Haltbarkeitsdauer ca. 12 Monate." },
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
    sku: "1220506S25KG",
    bereich: "betonsanierung",
    zusatzBereiche: ["industrieboden"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    beschreibung: "Rapid Set MORTAR MIX ist eine Mischung aus Hochleistungs-Rapid-Set-Zement mit abgestuftem Quarzsand. Schnell härtend, dauerhaft und schwundneutral; kann horizontal, vertikal und über Kopf verarbeitet werden. Nur mit Wasser mischen, Konstruktionsfestigkeit innerhalb einer Stunde. Einsetzbar innen und außen, auch in Nassbereichen.",
    name: "Rapid Set MORTAR MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturmörtel",
    schichtdicke: "10–150 mm",
    qualitaetsklasse: "C45/55",
    normen: ["DIN EN 13813", "DIN EN 998-1"],
    technischeDaten: [
      { label: "Qualität", wert: "C45/55" },
      { label: "Druckfestigkeit (60 min)", wert: "> 17 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Druckfestigkeit (28 d)", wert: "> 50 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Gängige Einbaudicken", wert: "Boden 10–150 mm; Decke i. M. 15 mm; Wand i. M. 20 mm" },
      { label: "Verarbeitbar", wert: "pastös bis plastisch" },
      { label: "Voll belastbar nach", wert: "ca. 1 h" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Untergrund säubern; lose Bestandteile, Zementschlämme, Staub, Säuren, Öl und Fett entfernen.",
          "Oberfläche muss für einen kraftschlüssigen Verbund rissefrei, eben sowie rau und offenporig sein.",
          "Geforderte Oberflächenzugfestigkeiten beachten (1 N/mm² nicht unterschreiten).",
          "Untergrund vor der Verarbeitung gründlich vornässen; bei stark saugenden Untergründen ggf. mehrmals wiederholen. Wasserfilm bzw. Pfützenbildung vermeiden.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "Wasserzugabe je 25-kg-Gebinde ca. 3,0 - 4,5 l; Verarbeitungs-, Umgebungs- und Untergrundtemperatur ≥ 5 °C.",
          "Zuerst Wasser in den Mischbehälter vorgeben, dann bei laufendem Mischer das Material zugeben; ca. 1 - 3 Minuten im Zwangsmischer oder mit Rührquirl mischen.",
          "Maximale Wasserzugabe nicht überschreiten; geringere Wasserzugabe erhöht die Festigkeiten.",
          "Einbau in einer kompletten Lage, nicht schichtweise und möglichst gleichmäßig. Keine Verlegung auf gefrorenen Untergründen.",
          "Bei der Verdichtung Luftporen weitgehend verhindern. Endbearbeitung schnellstmöglich; glätten, reiben oder strukturieren möglich.",
          "Bei Temperaturen > 20 °C verkürzt sich die Verarbeitungszeit, bei < 20 °C kann sich die Festigkeitsentwicklung verzögern.",
          "Zur Verlängerung der Verarbeitungszeit Rapid Set SET CONTROL (Verzögerer), für erhöhte Fließfähigkeit Rapid Set FLOW CONTROL (Plastifizierer) sowie das Additiv FAST zur Beschleunigung zugeben.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Die Nachbehandlung mit Wasser hat unmittelbar zu erfolgen, sobald die Oberfläche ihren feuchten Glanz verloren hat, und sollte innerhalb einer Stunde wiederholt durchgeführt werden, bis das Produkt ausreichende Festigkeiten erreicht hat. Bei längeren Abbindezeiten, zu niedrigen Temperaturen oder Verwendung eines Verzögerungsmittels können längere Nachbehandlungszeiten erforderlich werden." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 25 kg Papierspezialverpackung. Lagerung: trocken lagern wie Zement, Haltbarkeitsdauer ca. 12 Monate." },
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
    bereich: "betonsanierung",
    zusatzBereiche: ["industrieboden"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    name: "Rapid Set MORTAR MIX DUR",
    kategorie: "schnellzement",
    kurzbeschreibung: "Schnellreparaturmörtel mit Hartstoff DIN 1100 A",
    beschreibung:
      "Rapid Set MORTAR MIX DUR ist ein schnellerhärtender Reparaturmörtel mit integriertem Verschleißträger nach DIN 1100 (Gruppe A). Pastöse bis plastische, einstellbare Konsistenz, schwundneutral und für Schwerlastfugen geeignet, für hochverschleißbeanspruchte Reparaturstellen. Bereits nach ca. 1 Stunde voll belastbar.",
    schichtdicke: "10–150 mm",
    qualitaetsklasse: "C45/55",
    normen: ["DIN EN 13813", "DIN 1100"],
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
    sku: "1220542S25KG",
    // #306/#308: Betonsanierung (primär) + zusätzlich Infrastruktur.
    bereich: "betonsanierung",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    name: "ASPHALT REPAIR MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Schnellreparaturmaterial für Asphaltflächen",
    beschreibung: "Rapid Set ASPHALT REPAIR MIX ist ein zementbasiertes, polymervergütetes Reparaturmaterial: hochfest, spannungsarm und schnellerhärtend. Es vereint die Geschwindigkeit von Kaltmischgut mit der Dauerhaftigkeit von Heißasphalt: Sack öffnen, Wasser zugeben, mischen, einbauen. Ohne Fräse, ohne Walze, ohne Haftbrücke; nach ca. 30 Minuten belastbar, nach ca. 1 Stunde voll belastbar, auch unter Schwerlastverkehr.",
    schichtdicke: "30–600 mm",
    normen: ["DIN EN 13813"],
    technischeDaten: [
      { label: "Druckfestigkeit (30 min)", wert: "ca. 15 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Druckfestigkeit (1 h)", wert: "ca. 22 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Druckfestigkeit (28 d)", wert: "ca. 38 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Schichtdicke", wert: "30–600 mm" },
      { label: "Verkehrsfreigabe nach", wert: "ca. 30 min" },
      { label: "Haftbrücke", wert: "Nicht erforderlich" },
      { label: "Biegezugfestigkeit (28 d)", wert: "ca. 6,4 N/mm²", norm: "DIN EN 1015-11" },
      { label: "E-Modul", wert: "ca. 22.000 N/mm²" },
      { label: "Körnung", wert: "0–8 mm" },
      { label: "Farbe", wert: "schwarz" },
      { label: "Wasserzugabe", wert: "ca. 3,80 l je 25-kg-Sack" },
      { label: "Materialverbrauch", wert: "ca. 20 kg/m² je cm Schichtstärke" },
      { label: "Verarbeitungstemperatur", wert: "+5 °C bis +30 °C" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Untergrund mit Drahtbürste säubern, lose Bestandteile und Staub mit geeignetem Besen entfernen.",
          "Applikationsfläche muss sauber, fest und frei von haftungsmindernden Materialien sein.",
          "Für maximalen Verbund die Oberfläche gründlich mit einem Hochdruckreiniger reinigen, anschließend stehendes Wasser bzw. Pfützen entfernen.",
          "Bei Reparaturen in der gesamten Tiefe beschädigten Asphalt und losen Schutt entfernen, vertikale Seiten rechtwinklig abschneiden.",
          "Oberfläche mit Wasser sättigen, bevor ASPHALT REPAIR MIX aufgetragen wird.",
        ],
      },
      {
        titel: "Mischen",
        schritte: [
          "Zunächst Wasser in den Mischbehälter vorgeben, dann bei laufendem Mischer oder Rührquirl ASPHALT REPAIR MIX hinzugeben.",
          "ca. 1 - 3 Minuten im geeigneten Zwangsmischer oder Rührquirl klumpenfrei und gleichmäßig mischen.",
          "Bei geringerer Wasserzugabe erhöhen sich die Festigkeiten, die maximale Wasserzugabe darf nicht überschritten werden.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "Einbau nebst Verdichtung zügig durchführen, um maximale Nachbearbeitungszeit zu ermöglichen.",
          "Kann geglättet, gerieben oder mit Struktur versehen werden (z. B. mit einer Strukturwalze).",
          "Einbau in einer kompletten Lage, nicht schichtweise und möglichst gleichmäßig.",
          "Keine Verlegung auf gefrorenen Untergründen.",
          "Bei der Verdichtung Luftporen weitgehend verhindern.",
          "Verarbeitbar im Temperaturbereich von 5 °C bis 30 °C; > 20 °C verkürzt sich die Verarbeitungszeit, < 20 °C kann sich die Festigkeitsentwicklung verzögern.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Eine Nachbehandlung ist generell nicht notwendig. Bei hohen Temperaturen und dauerhafter Sonneneinstrahlung wird eine Nachbehandlung mit einem parafinhaltigen Nachbehandlungsmittel empfohlen." },
      { titel: "Lieferform & Lagerung", text: "25 kg Papierspezialverpackung. Trocken lagern, wie Zement. Haltbarkeitsdauer ca. 12 Monate." },
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
    sku: "1220516S25KG",
    bereich: "betonsanierung",
    zusatzBereiche: ["infrastruktur"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    beschreibung: "DOT Europe CONCRETE MIX ist ein leistungsstarker, polymermodifizierter, schnellabbindender, faserverstärkter Schnellbeton für innen und außen. Er ist gemäß DIN EN 1504-3 sowohl für statisch als auch nicht statisch relevante Instandsetzungen einsetzbar, ideal wo schnelle Festigkeiten, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind. Verarbeitbar in Stärken von 50–600 mm, bereits nach 1 Stunde belastbar; auch in Nassbereichen einsetzbar.",
    name: "DOT Europe CONCRETE MIX",
    kategorie: "schnellzement",
    kurzbeschreibung: "Universeller Schnellreparaturbeton, DIN EN 1504-3",
    schichtdicke: "50–600 mm",
    qualitaetsklasse: "C35/45",
    normen: ["DIN EN 1504-3"],
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
    beschreibung:
      "KOROCRETE ist ein schnellerhärtender Beton auf Basis von KORODUR FSCem, einem zementären, maßbeständigen und schnellerhärtenden Estrichbindemittel auf ternärer Basis, für hochbelastbare Betonböden, die schnell nutzbar und früh belegbar sind (Festigkeitsklassen C35/45 bis C50/60 nach DIN EN 206). Durch die hohe Frühfestigkeit sind die Flächen bereits wenige Stunden nach dem Einbau nutzbar und für den Verkehr freigegeben, was Stillstandskosten von Produktion und Lager minimiert.",
    schichtdicke: "projektabhängig",
    qualitaetsklasse: "C35/45 – C50/60",
    normen: [
      "DIN EN 206 (Anlehnung)",
    ],
    technischeDaten: [
      { label: "Bindemittel", wert: "KORODUR FSCem (ternär)" },
      { label: "Qualität", wert: "C35/45 – C50/60", norm: "DIN EN 206" },
      { label: "Druckfestigkeit (6 h)", wert: "ca. 18 N/mm²" },
      { label: "Druckfestigkeit (8 h)", wert: "ca. 25 N/mm²" },
      { label: "Druckfestigkeit (16 h)", wert: "ca. 35 N/mm²" },
      { label: "Druckfestigkeit (28 d)", wert: "ca. 65 N/mm²" },
      { label: "Nutzung / Verkehrsfreigabe", wert: "wenige Stunden, rezepturabhängig" },
      { label: "Mischung", wert: "volumetrisch vor Ort" },
    ],
    verarbeitungModi: [
      {
        titel: "Verarbeitung",
        schritte: [
          "Verarbeitungs-, Umgebungs- und Untergrundtemperatur ≥ 5 °C einhalten.",
          "Mischtechnik: volumetrische Misch-LKWs (z. B. Cemen Tech M-Series) favorisieren, die alle Komponenten getrennt bevorraten und auf der Baustelle zu Frischbeton mischen; voll beladen ca. 8 m³ Beton.",
          "Rezeptur-Konsistenz vor Ort an die Witterung anpassen; für höhere Konsistenzklassen Betonverflüssiger KOROTAN einsetzen.",
          "Zur Verlängerung der Verarbeitungszeit bzw. gegen hohe Außentemperaturen Betonverzögerer KORODUR B-VZ verwenden.",
          "KOROCRETE in gleichmäßiger Schichtdicke zügig einbringen, verdichten, abziehen und glätten.",
          "Für die maschinelle Glättung nur handgeführte Einscheibenglättmaschinen verwenden.",
          "Nur so viel Fläche vorziehen, wie innerhalb der Verarbeitungszeit (ca. 45 - 60 Minuten) bearbeitet werden kann; höhere Temperaturen verkürzen, niedrigere verlängern die Verarbeitungszeit.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Bei Außenflächen, im Zugluftbereich oder bei geringer Luftfeuchte ist der Schnellbeton vor zu schneller Austrocknung mit Folie zu schützen." },
      { titel: "Fugen", text: "Generell sind alle Fugen im Tragbeton zu übernehmen. Der Beton ist von aufgehenden Bauteilen (Wände, Stützen, etc.) zu trennen." },
      { titel: "Lieferform & Lagerung", text: "Bindemittel FSCem: 1.000 kg Big-Bag. Trocken lagern wie Zement. Haltbarkeitsdauer ca. 6 Monate." },
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
    beschreibung:
      "Rapid Set Concrete ist seit über 25 Jahren in den USA zugelassen und wird weltweit für unterschiedlichste Infrastrukturprojekte eingesetzt. Durch die schnellerhärtenden Eigenschaften lassen sich Reparaturen in verkehrsarmen Zeiten ausführen, etwa nachts. Rapid Set Concrete ist nach den Technischen Lieferbedingungen für Baustoffe und Baustoffgemische zur baulichen Erhaltung von Verkehrsflächenbefestigungen (TL BEB-StB) am Festbeton geprüft; die geforderten Frühfestigkeiten von mindestens 20 MPa nach 5 Stunden werden zuverlässig schon 2 Stunden nach dem Einbau erreicht.",
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
    sku: "1320576G30KG",
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
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung & Verarbeitung",
        schritte: [
          "Untergrund: Pfützen und Wasserlachen vor Beginn der Nachbehandlung entfernen.",
          "Beginn unmittelbar und abschnittsweise nach dem Einbau des Betons; ist die Verdunstung größer als das zu erwartende Bluten oder bei W/Z-Wert < 0,5 so früh wie möglich.",
          "Bei Einsatz als Grundierung für nachfolgende Hartstoffbeschichtungen unmittelbar nach Begehbarkeit auftragen; kein stehendes Wasser, Oberfläche mattfeucht.",
          "KOROCURE vor Applikation stets gut durchrühren.",
          "Gebrauchsfertig und unverdünnt als feiner, dichter Sprühnebel mit geeignetem Sprühgerät flächig auftragen; Pfützenbildung vermeiden.",
          "Auf einen gleichmäßigen, geschlossenen Film achten (die Wirkung hängt davon ab).",
          "Vor Applikation der anschließenden KORODUR- bzw. NEODUR-Hartstoffprodukte die behandelte Fläche einmalig aufzutellern.",
          "Arbeitsgeräte nach Gebrauch mit klarem Wasser gut reinigen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Ergänzender Hinweis", text: "KOROCURE ersetzt nicht die notwendige Nachbehandlung des geglätteten KORODUR Industriebodens." },
      { titel: "Lieferform & Lagerung", text: "30 kg Kunststoffkanister. Kühl, trocken und frostfrei im Originalgebinde lagern. Haltbarkeitsdauer ca. 12 Monate. Angebrochene Gebinde sofort verschließen." },
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
    sku: "1320591",
    tdsUrl: "/downloads/tds/KOROMINERAL_CURE_de.pdf",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "nachbehandlung",
    name: "KOROMINERAL CURE",
    kategorie: "nachbehandlung",
    kurzbeschreibung: "Oberflächenschutz mittels Silikatisierung",
    beschreibung:
      "KOROMINERAL CURE ist ein flüssiges, einkomponentiges und filmbildendes Nachbehandlungsmittel, das ein zu schnelles Austrocknen verhindert und die Oberfläche zugleich verdichtet. Es bietet dauerhaften Schutz gegen Feuchtigkeit, Schmutz und Verschleiß. Das Silikat dringt tief in die Betonporen ein, reagiert mit dem freien Calcium und geht eine dauerhafte Verbindung mit dem Beton ein, innen wie außen. Nach dem Auftrag ist die Oberfläche staubfrei und wasserabweisend, KOROMINERAL CURE trocknet transparent auf.",
    normen: [],
    technischeDaten: [
      { label: "Wirkung", wert: "Silikatisierung / Imprägnierung" },
      { label: "Anwendung", wert: "Auf frischen Estrich" },
    ],
    verarbeitungModi: [
      {
        titel: "Verarbeitung",
        schritte: [
          "KOROMINERAL CURE vor der Applikation aufmischen, danach unverzüglich mit der Applikation beginnen.",
          "Unverdünnt und gleichmäßig deckend als feiner Nebel aufsprühen; die Applikation erfolgt unmittelbar nach dem letzten Glättvorgang beim Eintritt der Mattfeuchte des Industriebodens, Betons oder Zementestrichs.",
          "Aufsetzbaren Niederdrucksprüher mit permanenter Materialdurchmischung verwenden, um ein Absetzen des Wirkstoffs zu verhindern; nicht verdünnen.",
          "Gleichmäßig in Bahnen aufbringen, nicht zu viel Material auftragen; Fugen und/oder Fugenprofile als natürliche Begrenzung nutzen.",
          "KOROMINERAL CURE nur einmalig aufbringen. Blutwasser sowie zu früher oder zu später Einsatz können Nachbehandlungswirkung und Oberflächenoptik beeinträchtigen.",
          "Überschüssiges Material kann mittels einer Reinigungsmaschine mit schwarzen Pads entfernt werden; Werkzeuge mit handelsüblicher Lauge reinigen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Lieferform & Lagerung", text: "Lieferform: 25 l Kunststoffgebinde (Ergiebigkeit je 25-l-Gebinde ca. 250 - 400 m²). Lagerung: trocken, frostfrei und nicht ≥ 30 °C im verschlossenen Originalgebinde. Angebrochene Gebinde sofort verschließen. Haltbarkeitsdauer ca. 6 Monate." },
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
    sku: "1320574",
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
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Pfützen und Wasserlachen vor Beginn der Nachbehandlung entfernen.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "KOROTEX vor der Applikation stets gut durchrühren.",
          "Verarbeitungstemperatur 5 °C bis 35 °C.",
          "Unmittelbar nach dem letzten Glättvorgang beim Eintritt der Mattfeuchte des Industriebodens, Betons oder Zementestrichs unverdünnt und gleichmäßig deckend als feiner Nebel aufsprühen.",
          "Je früher der Auftrag auf die mattfeuchte oder entschalte Oberfläche erfolgt, umso wirkungsvoller der Schutz.",
          "Nicht zu viel KOROTEX auf ein und dieselbe Stelle sprühen, um Fleckenbildung zu vermeiden.",
          "Zum Aufsprühen handelsübliche Spritzgeräte mit entsprechenden Düsen verwenden; nach Gebrauch mit klarem Wasser gut reinigen.",
          "Keine Spritzgeräte verwenden, die zuvor für Silikon- oder Schalungstrennmittel im Einsatz waren.",
          "Alternativ ist die Applikation mit einer Lammfellrolle möglich, jedoch mit höherem Verbrauch.",
          "Materialverbrauch ca. 100 bis 150 g/m² je nach Saugfähigkeit des Untergrundes.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Folgebeschichtung", text: "Bei nachträglichem Anstrich, Markierungen oder einer Beschichtung auf organischer Basis (z. B. Acrylharz, Kunstharzdispersion) sind Vorversuche unumgänglich. Reaktionsharzprodukte (z. B. EP- oder PU-Systeme) sind nicht zu empfehlen." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 1.000 kg Einwegcontainer und 30 kg Kunststoffkanister. Kühl, trocken und frostfrei im Originalgebinde lagern. Haltbarkeitsdauer ca. 12 Monate. Angebrochene Gebinde sofort verschließen." },
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
    // HE 3 Standard = Mutter/Repräsentant der variantenGruppe (#395).
    id: "neodur-he-3",
    tdsUrl: "/downloads/tds/NEODUR_HE_3_de.pdf",
    name: "NEODUR HE 3",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    variantenGruppe: "neodur-he-3",
    sku: "1220116S25KG",
    variantenSchwerpunkt: "Standard (A6)",
    kurzbeschreibung: "Zementgebundener Trockenbaustoff für Industrieböden im Einstreuverfahren",
    beschreibung: "NEODUR HE 3 gem. DIN 18557 (Werkmörtel) und DIN EN 13813, basierend auf Hartstoffen gem. DIN 1100: gebrauchsfertiger, zementgebundener Trockenbaustoff zur Herstellung von Industrieböden im Einstreuverfahren. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he3Technik("CT-C70-F9-A6", "70", "9", "A6 (≤ 6 cm³/50 cm²)", "A"),
    besonderheiten: [...HE3_BESONDERHEITEN, "Umweltproduktdeklaration (Gruppen-EPD) verfügbar"],
    einsatzbereiche: HE3_EINSATZ,
    verarbeitungModi: HE3_MODI,
    verarbeitungMeta: HE3_META("25-kg-Gebinde"),
    verwandteProdukte: HE3_VERWANDTE,
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-3-svs-3",
    name: "NEODUR HE 3 SVS 3",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    variantenGruppe: "neodur-he-3",
    sku: "1220134S30KG",
    variantenSchwerpunkt: "Höhere Verschleißklasse (A3)",
    kurzbeschreibung: "Hartstoffeinstreuung, Verschleißklasse A3",
    beschreibung: "NEODUR HE 3 SVS 3 — Hartstoffeinstreuung im Trockeneinstreuverfahren gem. DIN 18557 / DIN EN 13813, Hartstoffe gem. DIN 1100, mit höherer Verschleißklasse A3. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A3",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he3Technik("CT-C70-F9-A3", "70", "9", "A3 (≤ 3 cm³/50 cm²)", "A"),
    besonderheiten: ["Höhere Verschleißklasse A3 (≤ 3 cm³/50 cm²)", ...HE3_BESONDERHEITEN],
    einsatzbereiche: HE3_EINSATZ,
    verarbeitungModi: HE3_MODI,
    verarbeitungMeta: HE3_META("30-kg-Gebinde"),
    verwandteProdukte: HE3_VERWANDTE,
    tdsUrl: "/downloads/tds/NEODUR_HE_3_de.pdf",
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-3-svs-15",
    name: "NEODUR HE 3 SVS 1,5",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    variantenGruppe: "neodur-he-3",
    sku: "1220117S30KG",
    variantenSchwerpunkt: "Höchster Abrieb (A1,5)",
    kurzbeschreibung: "Hartstoffeinstreuung, Verschleißklasse A1,5",
    beschreibung: "NEODUR HE 3 SVS 1,5 — Hartstoffeinstreuung im Trockeneinstreuverfahren gem. DIN 18557 / DIN EN 13813, Hartstoffe gem. DIN 1100 (Hartstoffgruppe KS), höchste Verschleißklasse A1,5. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A1,5",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he3Technik("CT-C70-F9-A1,5", "70", "9", "A1,5 (≤ 1,5 cm³/50 cm²)", "KS"),
    besonderheiten: ["Höchste Verschleißklasse A1,5 (≤ 1,5 cm³/50 cm², Hartstoffgruppe KS)", ...HE3_BESONDERHEITEN],
    einsatzbereiche: HE3_EINSATZ,
    verarbeitungModi: HE3_MODI,
    verarbeitungMeta: HE3_META("30-kg-Gebinde"),
    verwandteProdukte: HE3_VERWANDTE,
    tdsUrl: "/downloads/tds/NEODUR_HE_3_de.pdf",
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-3-metallisch",
    name: "NEODUR HE 3 metallisch",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    variantenGruppe: "neodur-he-3",
    sku: "1220109S40KG",
    variantenSchwerpunkt: "Metallisch (Gruppe M), C80/F11",
    kurzbeschreibung: "Metallische Hartstoffeinstreuung (DIN 1100 Gruppe M)",
    beschreibung: "NEODUR HE 3 metallisch — Hartstoffeinstreuung mit metallischem Zuschlag (KORODUR WH metallisch) gem. DIN 1100 Gruppe M, DIN EN 13813. Extrem schlag- und stoßfest, höhere Festigkeit (C80/F11) für stärkste Beanspruchung.",
    qualitaetsklasse: "CT-C80-F11-A3",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: he3Technik("CT-C80-F11-A3", "80", "11", "A3 (≤ 3 cm³/50 cm²)", "M"),
    besonderheiten: [
      "Metallischer Hartstoffzuschlag (DIN 1100 Gruppe M)",
      "Extrem schlag- und stoßfest",
      "Höhere Festigkeit (C80/F11)",
      "Erhöhte Oberflächenhärte",
      "Für innen und außen geeignet",
    ],
    einsatzbereiche: HE3_EINSATZ,
    verarbeitungModi: HE3_MODI,
    verarbeitungMeta: HE3_META("40-kg-Gebinde"),
    verwandteProdukte: HE3_VERWANDTE,
    tdsUrl: "/downloads/tds/NEODUR_HE_3_metallisch_de.pdf",
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-3-green",
    tdsUrl: "/downloads/tds/NEODUR_HE_3_green_de.pdf",
    name: "NEODUR HE 3 green",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    variantenGruppe: "neodur-he-3",
    // green teilt im Alt-XML die Standard-SKU (1220116) — bewusst leer gelassen,
    // bis Technik die eigene Art.-Nr. bestätigt (keine irreführende Doppel-SKU).
    variantenSchwerpunkt: "CO₂-reduziert (bis 30 %)",
    kurzbeschreibung: "Ressourcenschonende Variante von NEODUR HE 3 mit bis zu 30 % reduziertem CO₂-Ausstoß",
    beschreibung: "Mit der ressourcenschonenden Variante NEODUR HE 3 green kann der CO₂-Ausstoß in der Herstellung um bis zu 30 Prozent reduziert werden. Für Bauherren, Architekten, Planer und Bauunternehmen stehen entsprechende Umweltproduktdeklarationen (EPD) bereit.",
    qualitaetsklasse: "CT-C70-F9-A6",
    normen: ["DIN EN 13813", "DIN 18560-7"],
    technischeDaten: [
      ...he3Technik("CT-C70-F9-A6", "70", "9", "A6 (≤ 6 cm³/50 cm²)", "A"),
      { label: "CO₂-Reduktion", wert: "bis zu 30 %" },
    ],
    besonderheiten: ["Bis zu 30 % CO₂-Reduktion in der Herstellung", "Produkt-EPD verfügbar", ...HE3_BESONDERHEITEN],
    einsatzbereiche: HE3_EINSATZ,
    verarbeitungModi: HE3_MODI,
    verarbeitungMeta: HE3_META("25-kg-Gebinde"),
    verwandteProdukte: HE3_VERWANDTE,
    zeitKategorie: "normal",
  },
  {
    id: "neodur-he-2",
    sku: "1220118S25KG",
    tdsUrl: "/downloads/tds/NEODUR_HE_2_de.pdf",
    name: "NEODUR HE 2",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "hartstoffeinstreuung",
    kurzbeschreibung: "Zementgebundener Trockenbaustoff für Industrieböden im Einstreuverfahren",
    beschreibung: "NEODUR HE 2 gem. DIN 18557 (Werkmörtel) und DIN EN 13813: gebrauchsfertiger, zementgebundener Trockenbaustoff zur Herstellung von Industrieböden im Einstreuverfahren. Auch farbig lieferbar.",
    qualitaetsklasse: "CT-C70-F9-A8",
    normen: ["DIN EN 13813", "DIN 18560-7"],
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
    sku: "1120002S25KG",
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
    sku: "1120005S25KG",
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
    sku: "1120009S25KG",
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
    sku: "1516520",
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
    sku: "1120012S30KG",
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
    sku: "1220527S25KG",
    tdsUrl: "/downloads/tds/KORODUR_FSCem_de.pdf",
    name: "KORODUR FSCem",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "schnellestrich",
    kurzbeschreibung: "Zementäres, volumenstabiles, schwindarmes Schnellestrich-Bindemittel auf ternärer Basis",
    beschreibung: "KORODUR FSCem ist ein zementäres, volumenstabiles, schwindarmes Schnellestrich-Bindemittel auf ternärer Basis zur Herstellung hochbelastbarer, schnell nutzbarer und verlegereifer Estriche gem. DIN 18560 und EN 13813. Für schnell belegbare Zementestriche im Verbund, auf Trennschicht, auf Dämmschicht und als Heizestrich, innen und außen. Auch zum Ausbessern und Sanieren alter Betonböden geeignet.",
    qualitaetsklasse: "CT-C50-F7 / CT-C40-F6",
    normen: ["DIN EN 13813", "DIN 18560"],
    technischeDaten: [
      { label: "Klassifizierung", wert: "CT-C50-F7 (MV 1:4) bis CT-C40-F6 (MV 1:5)", norm: "DIN EN 13813 / DIN 18560" },
      { label: "Druckfestigkeit (CT-C50-F7, MV 1:4)", wert: "nach 3 Tagen ≥ 35 N/mm², nach 28 Tagen ≥ 50 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Druckfestigkeit (CT-C40-F6, MV 1:5)", wert: "nach 3 Tagen ≥ 25 N/mm², nach 28 Tagen ≥ 40 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Biegezugfestigkeit (CT-C50-F7, MV 1:4)", wert: "nach 3 Tagen ≥ 5,0 N/mm², nach 28 Tagen ≥ 7,0 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Biegezugfestigkeit (CT-C40-F6, MV 1:5)", wert: "nach 3 Tagen ≥ 4,0 N/mm², nach 28 Tagen ≥ 6,0 N/mm²", norm: "DIN EN 13892-2" },
      { label: "Schwindklasse", wert: "SW 1, schwindarm (< 0,2 mm/m)", norm: "DIN 18560-1" },
      { label: "Mischungsverhältnis (CT-C50-F7)", wert: "1:4 in Gewichtsteilen (75 kg FSCem : 300 kg Estrichsand A/B 8), W/Z ca. 0,42" },
      { label: "Mischungsverhältnis (CT-C40-F6)", wert: "1:5 in Gewichtsteilen (60 kg FSCem : 300 kg Estrichsand A/B 8), W/Z ca. 0,40" },
      { label: "Verarbeitungszeit", wert: "ca. 45-60 Minuten (je nach Verlegeart und W/Z-Wert)" },
      { label: "Begehbar", wert: "nach ca. 1 Tag (je nach Verlegeart und W/Z-Wert)" },
      { label: "Restfeuchte (CM-Messung, MV 1:5)", wert: "nach 24 h ca. 5,9 %, nach 7 Tagen ca. 1,9 %, nach 28 Tagen ca. 1,3 %", norm: "DIN 18560-1 (CM-Messung)" },
      { label: "Schichtstärken (Nenndicken)", wert: "auf Trennschicht ≥ 35 mm, im Verbund (mit Haftschlämme) ≥ 15 mm, auf Dämmschicht ≥ 40 mm, als Heizestrich (ab OK Heizrohr) ≥ 40 mm", norm: "DIN 18560" },
      { label: "Verarbeitungs-, Umgebungs- und Untergrundtemperatur", wert: "≥ 5 °C" },
      { label: "Materialbedarf Bindemittel (Estrichsand bauseits)", wert: "MV 1:4 ca. 4,0 kg FSCem, MV 1:5 ca. 3,3 kg FSCem je m² und cm" },
      { label: "Farbe", wert: "Bindemittel grau" },
    ],
    verarbeitungModi: [
      { titel: "Mischen", schritte: [
        "KORODUR FSCem mit Estrichsand A/B 8 (gem. EN 13139) und kaltem, sauberem Wasser im Zwangsmischer homogen anmischen; steifplastische Konsistenz einstellen und dabei die Feuchtigkeit des Zuschlags berücksichtigen.",
        "Bei Verwendung eines Estrich-Druckluftförderers die empfohlenen Füllmengen des jeweiligen Maschinenherstellers beachten.",
        "Für höheren Verschleißwiderstand im Verbund alternativ KORODUR VS 0/5 Hartstoff als Zuschlag verwenden.",
      ] },
      { titel: "Verlegung im Verbund", schritte: [
        "Untergrund (Tragbeton/Tragestrich) vorbereiten, z. B. durch Fräsen und/oder Kugelstrahlen; Risse, Ausbrüche und schadhafte Fugen fachgerecht instand setzen. Oberflächenzugfestigkeit ≥ 1,5 N/mm² (befahrene) bzw. ≥ 1,0 N/mm² (nicht befahrene Flächen); Untergrund tragfähig, fest, sauber, trocken und frei von losen Teilen, Ölen und Fetten (DIN 18365, DIN 18560-3).",
        "Tragbeton/Tragestrich mit Universalgrundierung KORODUR uniPrimer vorbehandeln oder alternativ einen Tag vor der Verlegung gründlich vornässen (Pfützenbildung vermeiden).",
        "Haftbrücke KORODUR HB 5 rapid mit vorgeschriebener Wassermenge anmischen und mit hartem Straßenbesen auf die mattfeuchte Oberfläche als Haftgrund auftragen.",
        "FSCem-Schnellestrich in gleichmäßiger Schichtdicke zügig einbringen, verdichten, abziehen und glätten; für die maschinelle Bearbeitung nur handgeführte Einscheibenmaschinen verwenden.",
        "Belegreife ausschließlich per CM-Messung gem. DIN 18560-1 prüfen.",
      ] },
      { titel: "Heizestrich / Fußbodenheizung", schritte: [
        "Als Heizestrich ab Oberkante Heizrohr mindestens 40 mm einbauen.",
        "Aufheizen ab dem dritten Tag nach Einbau mit einer Vorlauftemperatur von + 25 °C; weiteres Vorgehen gem. einschlägigen Normen und Merkblättern (z. B. BEB-Merkblatt zur Schnittstellenkoordination bei Flächenheizungs- und Flächenkühlungssystemen in Neubauten).",
      ] },
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
    sku: "1220529S25KG",
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
    normen: ["DIN EN 13813"],
    technischeDaten: [
      { label: "Körnung", wert: "0–6 mm" },
      { label: "Druckfestigkeit (DIN EN 13892-2)", wert: "nach 1 Tag ca. 20 N/mm², nach 28 Tagen ca. 40 N/mm²" },
      { label: "Biegezugfestigkeit (DIN EN 13892-2)", wert: "nach 1 Tag ca. 4 N/mm², nach 28 Tagen ca. 6 N/mm²" },
      { label: "Schwindklasse (DIN 18560-1)", wert: "SW 1, schwindarm (< 0,2 mm/m)" },
      { label: "Belegbar", wert: "nach 3 Tagen" },
    ],
    verarbeitungModi: [
      {
        titel: "Verarbeitung",
        schritte: [
          "Mischen: In einer geeigneten Estrichmaschine oder einem Zwangsmischer mit der vorgegebenen Wassermenge (ca. 2,5-2,75 l/25 kg) homogen anmischen und steifplastische Konsistenz einstellen.",
          "Bei Verwendung eines Estrich-Druckluftförderers die empfohlenen Füllmengen des jeweiligen Maschinenherstellers beachten.",
          "Verarbeitungs-, Umgebungs- und Untergrundtemperatur mindestens 5 °C; Verarbeitungszeit ca. 60-80 Minuten.",
          "Schnellestrich in gleichmäßiger Schichtdicke zügig einbringen, verdichten, abziehen und glätten.",
          "Für die maschinelle Glättung nur handgeführte Einscheibenglättmaschinen verwenden.",
          "Nur so viel Fläche vorziehen, wie innerhalb der Verarbeitungszeit bearbeitet werden kann; Rand- und Bewegungsfugen übernehmen.",
          "Bei Verlegung im Verbund ausschließlich die Systemhaftbrücke KORODUR HB 5 rapid verwenden.",
          "Bei Außenflächen, im Zugluftbereich oder bei geringer Luftfeuchte vor zu schneller Austrocknung mit Folie schützen; Verlegereife durch CM-Messung der Restfeuchte sicherstellen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Bei Außenflächen, im Zugluftbereich oder bei geringer Luftfeuchte ist der Schnellestrich vor zu schneller Austrocknung mit Folie zu schützen. Bei Fußbodenheizung kann das Aufheizen ab dem dritten Tag nach Einbau mit einer Vorlauftemperatur von +25 °C erfolgen (weiteres Vorgehen siehe Normen und Merkblätter, z. B. BEB-Merkblatt)." },
      { titel: "Fugen", text: "Bei Verwendung als Verbundestrich sind alle Fugen im Tragbeton zu übernehmen. Der Estrich ist von aufgehenden Bauteilen (Wände, Stützen etc.) zu trennen." },
      { titel: "Lieferform & Lagerung", text: "25 kg Papierspezialverpackung sowie Big-Bag. Trocken lagern wie Zement. Haltbarkeitsdauer ca. 12 Monate." },
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
    sku: "1220290S25KG",
    tdsUrl: "/downloads/tds/NEODUR_Level_AU_de.pdf",
    name: "NEODUR Level AU",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    kurzbeschreibung: "Schnellerhärtende, polymermodifizierte Bodenausgleichsmasse für 5 bis 50 mm",
    beschreibung: "NEODUR Level AU ist eine zementgebundene, mineralische, schnellerhärtende, polymermodifizierte, dünnschichtige Bodenausgleichsmasse für Schichtdicken von 5 bis 50 mm. Im Verbund auf zementärem Untergrund, idealer Untergrund für Linoleum, Textil- und PVC-Beläge, Laminat, Keramik und Naturstein.",
    schichtdicke: "5–50 mm",
    qualitaetsklasse: "CT-C30-F5",
    normen: ["DIN EN 13813"],
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
    sku: "1220288S25KG",
    tdsUrl: "/downloads/tds/Levelflor_de.pdf",
    name: "Rapid Set LevelFlor",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "selbstverlaufend",
    kurzbeschreibung: "Schnellerhärtende, selbstverlaufende Ausgleichsmasse auf Rapid-Set-Zementtechnologie für innen und außen",
    beschreibung: "Rapid Set LevelFlor ist eine auf spezieller Zementtechnologie basierende, selbstverlaufende Ausgleichsmasse für innen und außen im Wohnungs- und Industriebau. Eine finale Deckschicht kann nach 6 bis 16 Stunden (bei +20 °C) aufgebracht werden. Für Neubau und Sanierung geeignet, muss grundsätzlich belegt werden.",
    schichtdicke: "bis 70 mm",
    qualitaetsklasse: "CT-C30-F6",
    normen: ["DIN EN 13813"],
    technischeDaten: [
      { label: "Klassifizierung", wert: "CT-C30-F6", norm: "DIN EN 13813 (provisorisch)" },
      { label: "Körnung", wert: "0–2 mm" },
      { label: "Farbe", wert: "grau" },
      { label: "Verarbeitungszeit", wert: "ca. 30 Min. (bei +20 °C und 65 % rel. Luftfeuchtigkeit)" },
      { label: "Fließzeit", wert: "ca. 15 Min." },
      { label: "Abbindezeit", wert: "Erstarrungsbeginn ca. 140 Min., Erstarrungsende ca. 200 Min.", norm: "DIN EN 196-3 (Anlehnung)" },
      { label: "Begehbar nach", wert: "ca. 3–4 Std. (bei +20 °C)" },
      { label: "Belegreife diffusionsoffene Beläge", wert: "nach ca. 6 Std." },
      { label: "Belegreife diffusionsdichte Beläge", wert: "nach ca. 16 Std." },
      { label: "Druckfestigkeit", wert: "nach 24 Std. > 20,0 N/mm², nach 7 Tagen > 24,0 N/mm², nach 28 Tagen > 34,0 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Biegezugfestigkeit", wert: "nach 7 Tagen > 7,9 N/mm²", norm: "DIN EN 1015-11" },
      { label: "VOC-Gehalt", wert: "0 g/L" },
      { label: "Verarbeitungs-, Umgebungs- und Untergrundtemperatur", wert: "≥ 5 °C" },
      { label: "Wasserzugabe", wert: "ca. 4,75 l je 25 kg Gebinde" },
      { label: "Materialverbrauch", wert: "ca. 1,7 kg/m² je mm Schichtdicke" },
      { label: "Schichtdicke", wert: "typisch 2–70 mm, > 70 mm nach Absprache mit der Anwendungstechnik (Einbaudicke bis 120 mm)" },
    ],
    verarbeitungModi: [
      { titel: "Untergrundvorbereitung & Grundierung", schritte: [
        "Untergrund durch Fräsen und/oder Kugelstrahlen vorbereiten; Risse, Ausbrüche und schadhafte Fugen fachgerecht instand setzen.",
        "Untergrund muss tragfähig, fest, sauber, trocken, rissfrei und frei von losen Teilen, Ölen, Fetten und haftungsmindernden Verunreinigungen sein.",
        "Oberflächenzugfestigkeit: ohne Fahrbeanspruchung ≥ 1,0 N/mm², mit Fahrbeanspruchung oder im Außenbereich ≥ 1,5 N/mm² (Anforderungen DIN 18365 und DIN 18560).",
        "KORODUR PC aufbringen; bei schwierigem Untergrund die zweikomponentige Epoxidharz-Grundierung KORODUR TXPK mit feuergetrocknetem Quarzsand (Körnung 0,4–0,8 mm) satt aufbringen.",
      ] },
      { titel: "Anmischen", schritte: [
        "LevelFlor in ein sauberes, geeignetes Gefäß (z. B. KORODUR 30-Liter-Mischeimer) geben.",
        "Mit ca. 4,75 l Wasser je 25 kg ca. 3–5 Minuten klumpenfrei und homogen anmischen (Mischquirl ≥ 650 UpM oder Zwangsmischer, z. B. Collmix LevMix oder Hippo-Mixer).",
        "Richtige Konsistenz über das Ausbreitmaß bestimmen; Verwendung des „FLOW Kits“ empfohlen.",
      ] },
      { titel: "Applikation", schritte: [
        "LevelFlor auf den vorbereiteten und grundierten Untergrund in typischer Schichtdicke 2–70 mm verlegen.",
        "Material nivelliert sich innerhalb der 15-minütigen Fließzeit; gleichmäßig mit geeignetem Rakel applizieren.",
        "Lufteinschlüsse aus der noch fließfähigen Oberfläche mit einer Stachelwalze entfernen; für die Sollstärke Höhenmarken setzen.",
        "Fläche bis zur Begehbarkeit vor zu schneller Austrocknung durch Wind, Zugluft und Sonneneinstrahlung schützen; bei hohen Temperaturen möglichst kaltes Anmachwasser einsetzen, bei niedrigen Temperaturen Material und/oder Anmachwasser aufwärmen.",
      ] },
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
    sku: "1220277S25KG",
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
    sku: "1320608",
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
    sku: "8120900S25KG",
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
    normen: ["DIN 1100"],
    technischeDaten: [
      { label: "Körnung", wert: "0–3 mm" },
      { label: "Härte nach Mohs", wert: "7" },
    ],
    besonderheiten: [],
    zeitKategorie: "normal",
  },
  // KORODUR Silosystem entfernt (2026-06-23): aus der Produktdatenbank genommen,
  // ist eher ein Service als ein Website-Produkt (Steffi). Silotechnik bleibt als
  // Verarbeitungs-Hinweis bei den Hartstoffschicht-Produkten erwähnt.

  // === WEBSITE-MIGRATION STUFE 2, INDUSTRIEBODEN TEIL 2: BAUCHEMIE (2026-06-12) ===
  // Quelle: extraktion-industrieboden-bauchemie.json + Normen produkte.xlsx.
  // Defekte Dichte-Einheiten der Alt-Site (easyFinish/nanoFinish/uniPrimer)
  // bewusst NICHT uebernommen — TDS-Klaerung offen (zuordnung-industrieboden.md).
  {
    id: "korodur-easyfinish",
    sku: "1320570G30KG",
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
    verarbeitungModi: [
      {
        titel: "Verarbeitung im Sprühverfahren",
        schritte: [
          "KORODUR easyFinish vor Gebrauch durchrühren.",
          "Die Oberfläche muss mattfeucht sein und darf keinen Wasserfilm aufweisen.",
          "Verarbeitungs- und Oberflächentemperatur >= 5 Grad C einhalten.",
          "KORODUR easyFinish im Sprühverfahren mit einem geeigneten Sprühgerät flächig auftragen.",
          "Erstmals nach dem letzten Tellern (vor dem ersten Flügelglätten) aufsprühen und einarbeiten.",
          "Zweiter und dritter Auftrag erfolgen beim Glätten; Pfützen vermeiden.",
          "Auf gleichmäßigen, geschlossenen Film achten, da hiervon die Wirkung abhängt.",
          "Arbeitsgeräte mit klarem Wasser reinigen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "KORODUR easyFinish ist kein Nachbehandlungsmittel und ersetzt nicht die notwendige Nachbehandlung des geglätteten Bodens. Abgestimmt auf die spätere Nutzung und Eignung der Flächen, z. B. mit einer weiteren Beschichtung oder Einpflege, sind objektbezogene Vorversuche durchzuführen." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 1.000 kg Einwegcontainer, 30 kg Kunststoffkanister. Kühl, trocken und frostfrei im Originalgebinde lagern. Haltbarkeitsdauer ca. 12 Monate. Angebrochene Gebinde sofort verschließen." },
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
    sku: "1320567G30KG",
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
    verarbeitungModi: [
      {
        titel: "Verarbeitung",
        schritte: [
          "KORODUR nanoFinish vor Gebrauch durchrühren.",
          "Drei- bis viermal als Verarbeitungshilfe im Sprühverfahren mit einem geeigneten Sprühgerät gleichmäßig auftragen.",
          "Die Oberfläche darf keinen Wasserfilm aufweisen, sie muss mattfeucht sein.",
          "Den ersten Auftrag nach dem letzten Tellern applizieren; den zweiten bis vierten Auftrag beim Glätten.",
          "Pfützen vermeiden. Die Wirkung hängt von der Gleichmäßigkeit und Geschlossenheit des aufgebrachten Films ab.",
          "Arbeitsgeräte mit klarem Wasser und Seife reinigen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "KORODUR nanoFinish ersetzt nicht die übliche Nachbehandlung des jeweiligen KORODUR Industriebodens, z. B. mit KOROTEX (siehe Datenblatt)." },
      { titel: "Lieferform & Lagerung", text: "30 kg Kunststoffkanister. Kühl, trocken und frostfrei im Originalgebinde lagern. Haltbarkeitsdauer ca. 12 Monate. Angebrochene Gebinde sofort verschließen." },
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
    sku: "1320606G30KG",
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
    sku: "1320893G30KG",
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
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Untergrund muss trocken, fest, sauber, saugfähig und frei von Öl, Fett und sonstigen als trennmittelwirkenden Verunreinigungen sein.",
          "Nassreinigung der Oberfläche, z. B. mittels Reinigungsautomaten, unmittelbar vor der Applikation durchführen.",
          "Imprägnierung von frisch eingebauten Beton- oder Estrichflächen frühestens nach Abtrocknung der Oberfläche.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "KOROMINERAL wird gebrauchsfertig geliefert und unverdünnt in einem Arbeitsgang bis zur Sättigung aufgebracht.",
          "Verarbeitung z. B. mit einem Gummischieber und nachfolgend Abrollen im Kreuzgang mit einer kurzflorigen Lammfellrolle.",
          "Überschüssiges Material sorgfältig entfernen, Pfützenbildung vermeiden.",
          "Zur rückstandslosen Entfernung ca. 30 Minuten nach dem Auftrag eine Nassreinigung des Bodens mit klarem Wasser (Reinigungsautomaten) durchführen.",
          "Anlegen einer Musterfläche wird empfohlen, um die örtlichen Gegebenheiten zu erfassen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Lieferform & Lagerung", text: "Lieferform: 30 kg Kunststoffgebinde. Trocken und frostfrei im verschlossenen Originalgebinde lagern. Angebrochene Gebinde sofort verschließen. Haltbarkeitsdauer ca. 12 Monate." },
    ],
    besonderheiten: [
      "Oberflächenverkieselung mineralischer Baustoffe",
      "Erhöht die Dichtigkeit, wasserabweisend",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "koromineral-li",
    sku: "1320589",
    tdsUrl: "/downloads/tds/KOROMINERAL_Li_de.pdf",
    name: "KOROMINERAL Li+",
    kategorie: "beschichtung",
    bereich: "industrieboden",
    zusatzBereiche: ["infrastruktur"],
    // #306/#308: Begleitprodukt auch im Infrastruktur-Bereich.
    produktgruppe: "impraegnierung",
    kurzbeschreibung: "Flüssige, transparente Imprägnierung auf Basis Hybrid-Lithiumsilikat mit integriertem Basis-Fleckschutz",
    beschreibung:
      "KOROMINERAL Li+ ist eine flüssige, transparente Imprägnierung auf Basis Hybrid-Lithiumsilikat mit integriertem Basis-Fleckschutz. Sie eignet sich für die Imprägnierung mineralischer, zementgebundener Untergründe wie geschliffene oder ungeschliffene Betonböden und Estriche sowie Betonwerkstein und Terrazzo. Eingesetzt wird KOROMINERAL Li+ in gewerblichen Betrieben, Markthallen, Logistikzentren, Lager- und Produktionsräumen, Supermärkten und im privaten Wohnbau, innen und außen.",
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
    sku: "1220218S25KG",
    tdsUrl: "/downloads/tds/GRANIDUR_05_08_de.pdf",
    name: "GRANIDUR",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "geschliffen",
    kurzbeschreibung: "Geschliffener, dekorativer Sichtestrich in Granit- bzw. Terrazzooptik",
    beschreibung: "GRANIDUR 05 und GRANIDUR 08 sind werksmäßig hergestellte, gebrauchsfertige, farbige Trockenbaustoffe zur Herstellung geschliffener, dekorativer Estriche in einer Schichtdicke von 15 bis max. 70 mm, je nach Konstruktion. Die finale Granit- bzw. Terrazzooptik kann von matt bis glänzend reichen. Verlegung ein- oder zweischichtig gem. DIN 18560-2, -3 (Verbund mit Haftbrücke KORODUR HB 5) und -4.",
    schichtdicke: "15 bis max. 70 mm",
    qualitaetsklasse: "CT-C45-F6 / CT-C35-F5",
    normen: ["DIN EN 13813"],
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
    bereich: "industrieboden",
    produktgruppe: "geschliffen",
    kurzbeschreibung: "Geschliffener, dekorativer Sichtestrich in Weiß (BIANCO) oder Schwarz (NERO), mittlere Schichtdicke 15 mm",
    beschreibung: "GRANIDUR BIANCO und GRANIDUR NERO sind werksmäßig hergestellte, gebrauchsfertige Trockenbaustoffe zur Herstellung geschliffener, dekorativer Estriche in einer mittleren Schichtdicke von 15 mm. Verlegung einschichtig gem. DIN 18560-3 als Verbundestrich mit KORODUR HB 5 Haftbrücke.",
    schichtdicke: "i. M. 15 mm",
    qualitaetsklasse: "CT-C45-F6",
    normen: ["DIN EN 13813"],
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
      { name: "GRANIDUR BIANCO", sku: "1220261S25KG" },
      { name: "GRANIDUR NERO", sku: "1220237S25KG" },
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
    bereich: "industrieboden",
    produktgruppe: "geglaettet",
    kurzbeschreibung: "Geglätteter, dekorativer Sichtestrich in wolkiger, marmorierter Optik",
    beschreibung: "KCF 05 und KCF 08 sind werksmäßig hergestellte, gebrauchsfertige, farbige Trockenbaustoffe zur Herstellung geglätteter, dekorativer Estriche in einer Schichtdicke von 15 bis max. 70 mm, je nach Konstruktion. Der zementgebundene, geglättete Sichtestrich wurde Ende der 1990er Jahre gemeinsam mit dem italienischen Architekten und Designer Alessandro Copetti entwickelt. Verlegung ein- oder zweischichtig gem. DIN 18560-2, -3 (Verbund mit Haftbrücke KORODUR HB 5) und -4.",
    schichtdicke: "15 bis max. 70 mm",
    qualitaetsklasse: "CT-C45-F6-A5 / CT-C35-F5-A5",
    normen: ["DIN EN 13813", "DIN 18560-7"],
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
      { name: "KCF 05", qualitaetsklasse: "CT-C45-F6-A5", hinweis: "Körnung 0–5 mm, Schichtstärke 15–25 mm", sku: "1220217S25KG" },
      { name: "KCF 08", qualitaetsklasse: "CT-C35-F5-A5", hinweis: "Körnung 0–8 mm, Schichtstärke 25–50 mm", sku: "1220215S25KG" },
      { name: "KCF 05 rapid", hinweis: "schnellerhärtend, volumenstabiles Bindemittel auf ternärer Basis" },
    ],
    systemBegleitprodukte: ["korodur-hb-5", "koroclean"],
    sichtestrich: true,
    zeitKategorie: "normal",
  },
  {
    id: "tru-pc",
    sku: "1220297",
    tdsUrl: "/downloads/tds/TRU_PC_de.pdf",
    name: "TRU PC",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "truazzo",
    kurzbeschreibung: "Selbstverlaufender, mineralischer Sichtestrich in geschliffener Betonoptik (Rapid Set Technologie)",
    beschreibung: "Rapid Set TRU PC ist ein auf spezieller Zementtechnologie basierender, selbstverlaufender, mineralischer Sichtestrich, entwickelt um die Optik von geschliffenem Beton zu simulieren. Ideal, wenn Frühfestigkeit, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind: bis zu 20 Minuten verarbeitbar, nach 2 bis 3 Stunden begehbar. Die Dekorkörnung (bis 2,5 mm) ist bereits enthalten.",
    schichtdicke: "10–35 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: ["DIN EN 13813"],
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
    sku: "1220291",
    tdsUrl: "/downloads/tds/TRU_SP_de.pdf",
    name: "TRU SP",
    kategorie: "estrich",
    bereich: "industrieboden",
    produktgruppe: "truazzo",
    kurzbeschreibung: "Selbstverlaufender, mineralischer Sichtestrich in Salz-Pfeffer-Optik (Rapid Set Technologie)",
    beschreibung: "Rapid Set TRU SP ist ein auf spezieller Zementtechnologie basierender, selbstverlaufender, mineralischer Sichtestrich, entwickelt um die Optik von geschliffenem Beton in Salz-Pfeffer-Optik zu simulieren. Ideal, wenn Frühfestigkeit, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind: bis zu 20 Minuten verarbeitbar, nach 2 bis 3 Stunden begehbar.",
    schichtdicke: "10–35 mm",
    qualitaetsklasse: "CT-C40-F10",
    normen: ["DIN EN 13813"],
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
    sku: "1220410S25KG",
    tdsUrl: "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
    name: "MICROTOP TW 3",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "trockenspritz",
    kurzbeschreibung: "Zementspritzmörtel im Trockenspritzverfahren für Reprofilierung und Beschichtung im Trinkwasserbereich",
    beschreibung: "MICROTOP TW 3 wird im Trockenspritzverfahren verarbeitet und dient der Reprofilierung und Beschichtung von Flächen sowie der Erhöhung der Betondeckung und dem Finish im Trinkwasserbereich. Die Materialien werden einlagig verarbeitet und können problemlos gerieben und geglättet werden; kleine Arbeiten sind per Hand möglich.",
    schichtdicke: "9–20 mm",
    qualitaetsklasse: "C30/37",
    normen: ["DIN EN 206", "DIN 1045-3", "DIN 18551", "DIN EN 14487", "DIN EN 1504-3", "DAfStb Trockenbetonrichtlinie"],
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
    sku: "1220398S25KG",
    tdsUrl: "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
    name: "MICROTOP TW 5",
    qualitaetsklasse: "C30/37",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "trockenspritz",
    kurzbeschreibung: "Microsilica-vergüteter Zementspritzmörtel im Trockenspritzverfahren für Trinkwasserbehälter",
    beschreibung: "MICROTOP TW 5 ist ein rein mineralischer, hydraulisch abbindender, microsilicavergüteter Zementspritzmörtel zur Reprofilierung, Egalisierung und Beschichtung von Flächen im Trinkwasserbehälter. Verarbeitung im Trockenspritzverfahren (Dünnstromverfahren), auch zur Erhöhung der Betondeckung und für das Finish. Entspricht den DVGW Arbeitsblättern W 270, W 300 und W 347.",
    schichtdicke: "14–30 mm",
    normen: ["DIN EN 206", "DIN 1045-3", "DIN 18551", "DIN EN 14487", "DIN EN 1504-3", "DAfStb Trockenbetonrichtlinie"],
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
    sku: "1220405S25KG",
    tdsUrl: "/downloads/tds/MICROTOP_TW_3_5_8_de.pdf",
    name: "MICROTOP TW 8",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "trockenspritz",
    kurzbeschreibung: "Microsilica-vergüteter Zementspritzbeton (C30/37) im Trockenspritzverfahren für den Trinkwasserbereich",
    beschreibung: "MICROTOP TW 8 ist ein hydraulisch abbindender, microsilicavergüteter Zementspritzbeton für den Trinkwasserbereich, Verarbeitung gemäß DIN 18551. Der Beton der Festigkeitsklasse C30/37 wird zur Herstellung von Spritzbeton im Trockenspritzverfahren, zur Reprofilierung von Ausbrüchen und zur Erhöhung der Betondeckung verwendet. Entspricht den DVGW Arbeitsblättern W 270, W 300 und W 347.",
    schichtdicke: "ab 25 mm",
    qualitaetsklasse: "C30/37",
    normen: ["DIN EN 206", "DIN 1045-3", "DIN 18551", "DIN EN 14487", "DAfStb Trockenbetonrichtlinie"],
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
    sku: "1220426S25KG",
    tdsUrl: "/downloads/tds/MICROTOP_TW_NSM_de.pdf",
    name: "MICROTOP TW NSM",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "nassspritz",
    kurzbeschreibung: "Spritzmörtel im Nassspritzverfahren für Reprofilierung und Beschichtung im Trinkwasserbereich",
    beschreibung: "MICROTOP TW NSM wird im Nassspritzverfahren verarbeitet und dient der Reprofilierung und Beschichtung von Flächen sowie der Erhöhung der Betondeckung und dem Finish im Trinkwasserbereich. Die Materialien können problemlos gerieben und geglättet werden; kleine Arbeiten sind per Hand in Verbindung mit einer Haftbrücke möglich.",
    schichtdicke: "ca. 20 mm",
    normen: ["DIN EN 206", "DIN 1045-3", "DIN 18551", "DIN EN 14487", "DAfStb Trockenbetonrichtlinie"],
    technischeDaten: [
      { label: "Körnung", wert: "0–3 mm" },
      { label: "Schichtstärke", wert: "ca. 20 mm, einlagig" },
      { label: "Wasserzugabe", wert: "ca. 3,6 l je 25-kg-Gebinde" },
      { label: "Farben", wert: "natur, weiß, blau" },
      { label: "Verfahren", wert: "Nassspritzen (Dichtstromförderung, geringe Staubentwicklung)" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Tragbeton bzw. Altputz muss eine Haftzugfestigkeit von mind. >= 1,5 N/mm2 aufweisen.",
          "Untergrund grundsaetzlich strahlen, vorzugsweise mit HD-Wasser >= 1.000 bar.",
          "Oberflaeche muss fuer kraftschluessigen Verbund rissefrei, eben, frei von losen und muerben Bestandteilen und Feinstmoertelanreicherungen sowie rau und offenporig sein.",
          "Untergrund einen Tag vor der Verarbeitung gruendlich vornaessen.",
        ],
      },
      {
        titel: "Verarbeitung (Nassspritzverfahren)",
        schritte: [
          "MICROTOP TW NSM als komplettes Gebinde mit der vorgeschriebenen Wassermenge ca. 3 Minuten anmischen.",
          "Wasserzugabe ca. 3,6 l je 25-kg-Gebinde (Wasser/Feststoffwert ca. 0,14 - 0,15).",
          "Applikation auf die mattfeuchte Oberflaeche per Dichtstromfoerderung mit geeigneter Schneckenpumpe (z. B. m-tec P 20 mit Rotor/Stator D8/2), einschliesslich Treibluft zum Spritzen.",
          "Schichtstaerke ca. 20 mm, einlagig.",
          "Verarbeitungs-, Umgebungs- und Untergrundtemperatur >= 5 Grad C.",
          "Material kann gerieben und geglaettet werden; kleine Arbeiten per Hand in Verbindung mit einer Haftbruecke moeglich.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Klimatisierung der Wasserkammern zur Verhinderung von Kondenswasserbildung muss gewaehrleistet sein, bis das aufgebrachte Material eine ausreichende mechanische Festigkeit erreicht hat. Durch Einsatz von Luftbefeuchtern die relative Luftfeuchte nach der Applikation mind. 10 Tage auf 95 % halten. Der Waermeeintrag darf dabei 20 Grad C nicht uebersteigen. Zugluft und groessere Luftbewegungen sind zu vermeiden." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 25 kg Papierspezialverpackung. Lagerung: Trocken lagern, wie Zement. Haltbarkeitsdauer ca. 12 Monate." },
    ],
    varianten: [{ name: "MICROTOP TW NSM blau" }],
    besonderheiten: ["Reib- und glättbar", "Handverarbeitung kleiner Arbeiten mit Haftbrücke möglich"],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-02",
    sku: "1220404S25KG",
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
    normen: ["DIN EN 206", "DIN 1045-3", "DIN 18551", "DAfStb Trockenbetonrichtlinie"],
    technischeDaten: [
      { label: "Körnung", wert: "0–0,2 mm" },
      { label: "Schichtstärke", wert: "ca. 2–5 mm" },
      { label: "Wasserzugabe", wert: "ca. 5–6,25 l je 25-kg-Gebinde" },
      { label: "Verfahren", wert: "Schleudern, Spritzen, Spachteln, Handauftrag" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Tragbeton bzw. Altputz (Haftzugfestigkeit mind. ≥ 1,5 N/mm²) grundsätzlich strahlen, vorzugsweise mit HD-Wasser ≥ 1.000 bar.",
          "Oberfläche für einen kraftschlüssigen Verbund rissefrei, eben, frei von losen und mürben Bestandteilen sowie Feinstmörtelanreicherungen, rau und offenporig herstellen.",
          "Untergrund einen Tag vor der Verarbeitung gründlich vornässen.",
          "Kiesnester, Lunker usw. mit einer MICROTOP TW 02 Kratzspachtelung egalisieren.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "MICROTOP TW 02 als komplettes Gebinde mit der vorgeschriebenen Wassermenge ca. 3 Minuten mit einem langsam laufenden Quirl anmischen.",
          "Applikation gem. DIN 18551 per Dichtstromförderung oder Spachteltechnik.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Klimatisierung der Wasserkammern zur Verhinderung von Kondenswasserbildung sicherstellen, bis das Material eine ausreichende mechanische Festigkeit erreicht hat. Durch Luftbefeuchter die relative Luftfeuchte nach der Applikation mind. 10 Tage auf 95 % halten. Wärmeeintrag dabei max. 20 °C; Zugluft und größere Luftbewegungen vermeiden." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 25 kg Papierspezialverpackung. Lagerung: trocken lagern wie Zement, Haltbarkeitsdauer ca. 12 Monate." },
    ],
    besonderheiten: [
      "Äußerst geringes Porenvolumen",
      "Auch als Korrosionsschutz und Haftbrücke einsetzbar",
    ],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-vsm",
    sku: "1220406S25KG",
    tdsUrl: "/downloads/tds/MICROTOP_TW_VSM_de.pdf",
    name: "MICROTOP TW VSM",
    kategorie: "sonstige",
    bereich: "microtop",
    produktgruppe: "nassspritz",
    kurzbeschreibung: "Vorspritzmörtel (Haftgrund) für die Innenauskleidung und Instandsetzung von Trinkwasserbehältern und Mauerwerk",
    beschreibung: "MICROTOP TW VSM dient der Innenauskleidung und Instandsetzung von neuen wie auch alten Trinkwasserbehältern sowie Mauerwerk. Durch seine spezielle Zusammensetzung hat er hervorragende Verarbeitungs- und Gebrauchseigenschaften und kann problemlos gerieben und geglättet werden.",
    schichtdicke: "15–20 mm",
    qualitaetsklasse: "C12/15",
    normen: ["DIN EN 998-1"],
    technischeDaten: [
      { label: "Körnung", wert: "0–2 mm" },
      { label: "Schichtstärke", wert: "ca. 15–20 mm" },
      { label: "Wasserzugabe", wert: "ca. 3,75 l je 25-kg-Gebinde" },
      { label: "Ergiebigkeit", wert: "ca. 14 l je 25-kg-Gebinde" },
      { label: "Verfahren", wert: "Spritzen, Handauftrag" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Tragfähigen Untergrund vorbereiten.",
          "Oberfläche muss für einen kraftschlüssigen Verbund rissefrei, eben, frei von losen und mürben Bestandteilen und Feinstmörtelanreicherungen sowie rau und offenporig sein.",
          "Anschließend vornässen.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "MICROTOP TW VSM als komplettes Gebinde mit der vorgeschriebenen Wassermenge (ca. 3,75 l/25 kg) ca. 3 Minuten mit einem langsam laufenden Quirl anmischen.",
          "Verarbeitungs-, Umgebungs- und Untergrundtemperatur ≥ 5 °C einhalten.",
          "Applikation mit allen gängigen Spritzgeräten oder von Hand; gerieben, geglättet, kleine Arbeiten per Hand möglich.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Unterschiedliche Temperaturen beeinflussen den Erstarrungs- bzw. Erhärtungsverlauf. MICROTOP TW VSM ist vor zu rascher Austrocknung gem. DIN EN 13670 / DIN 1045-3 zu schützen." },
      { titel: "Lieferform & Lagerung", text: "25 kg Papierspezialverpackung. Trocken lagern, wie Zement. Haltbarkeitsdauer ca. 12 Monate." },
    ],
    besonderheiten: ["Auch für Mauerwerk geeignet", "Reib- und glättbar"],
    zeitKategorie: "normal",
  },
  {
    id: "microtop-tw-bm",
    sku: "1220407S25KG",
    tdsUrl: "/downloads/tds/MICROTOP_TW_BM_de.pdf",
    name: "MICROTOP TW BM",
    kategorie: "beschichtung",
    bereich: "microtop",
    produktgruppe: "beschichtung-schutz",
    kurzbeschreibung: "Spezialmörtel für die Innenbeschichtung von Trinkwasserrohren und -behältern, auch als Haftbrücke",
    beschreibung: "MICROTOP TW BM ist ein werksmäßig hergestellter, gebrauchsfertiger Spezialmörtel zur Innenbeschichtung von Trinkwasserrohren und -behältern sowie anderen Gewerken. Er kann problemlos im Schleuder-, Spritz- und Handauftrag verarbeitet werden, ist auch als Haftbrücke für Bodenbeschichtungen und als Korrosionsschutz verwendbar und wird in natur und weiß geliefert. Entspricht den DVGW Arbeitsblättern W 270, W 300 und W 347.",
    normen: ["DIN EN 206", "DIN 1045-3", "DIN EN 1504-3", "DAfStb Trockenbetonrichtlinie"],
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
    sku: "1320892G30KG",
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
    // #240: KOROPHALT 02 — Notion-Status „fehlt" → angelegt (TDS 02/2023).
    // Spezialverfüllmörtel für halbstarre Deckschichten (Asphalt-Traggerüst +
    // Mörtelverfüllung). Produktart Vergussmörtel, nur Neubau, innen + außen.
    id: "korophalt-02",
    tdsUrl: "/downloads/tds/KOROPHALT_02_de.pdf",
    name: "KOROPHALT 02",
    kategorie: "sonstige",
    bereich: "spezialmoertel",
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Frühhochfester Spezialverfüllmörtel für halbstarre Deckschichten auf hoch belasteten Industrie- und Verkehrsflächen",
    beschreibung: "KOROPHALT 02 ist ein zementgebundener, nicht schrumpfender, frühhochfester Spezialverfüllmörtel zur Herstellung halbstarrer Beläge für Industrie- und Verkehrsflächen, auch farbig lieferbar. Er vereint die Eigenschaften eines hochfesten Vergussmörtels mit der Flexibilität eines bitumengebundenen Systems: Ein speziell entwickeltes Einkorn-Asphalt-Traggerüst mit 25 bis 30 % Hohlraumgehalt wird im zweiten Arbeitsgang mit dem höchst fließwilligen KOROPHALT 02 verfüllt, fugenlos und mit niedriger Bauhöhe.",
    schichtdicke: "4–6 cm",
    druckfestigkeit: "70 N/mm²",
    belastbarNach: "12–24 h",
    belastbarNachZusatz: "Verkehrsfreigabe",
    normen: ["FGSV M HD"],
    technischeDaten: [
      { label: "Druckfestigkeit (28 d)", wert: "ca. 70 N/mm²" },
      { label: "Druckfestigkeit (24 h)", wert: "ca. 40 N/mm²" },
      { label: "Biegezugfestigkeit (28 d)", wert: "ca. 8 N/mm²" },
      { label: "E-Modul (28 d)", wert: "ca. 10.000–12.000 N/mm²" },
      { label: "Körnung", wert: "0–0,25 mm" },
      { label: "Schichtdicke", wert: "4–6 cm" },
      { label: "Belastbar mit Verkehr", wert: "nach ca. 12–24 h" },
      { label: "Verarbeitungstemperatur", wert: "≥ 5 °C" },
      { label: "Lieferform", wert: "25-kg-Sack / Siloware" },
    ],
    besonderheiten: [
      "Höchst fließwillig, selbstverlaufend",
      "Schwindarm und rissfrei",
      "Kurze Abbindezeit, schnell belastbar",
      "Hohe Tragfähigkeit (Druckfestigkeit ca. 70 N/mm²)",
      "Fugenlose Bauweise, niedrige Bauhöhe",
      "Auch farbig lieferbar (zementgrau / anthrazit)",
    ],
    einsatzbereiche: [
      "Container-Terminals",
      "Flughäfen / Luftverkehr",
      "Stellflächen & Fahrstraßen",
      "Parkhäuser & Tiefgaragen",
      "Speditions-Ladestationen",
      "Industrie- & Produktionshallen",
      "Lager & Logistik",
    ],
    zeitKategorie: "schnell",
  },
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
    normen: ["DAfStb-RL Vergussbeton"],
    technischeDaten: [{ label: "Vergussquerschnitt", wert: "5 mm bis über 50 mm (je Variante)" }],
    varianten: [
      { name: "NEODUR VM 1", qualitaetsklasse: "C55/67", hinweis: "Vergussquerschnitt 5–20 mm", sku: "1220364S25KG" },
      { name: "NEODUR VM 3", qualitaetsklasse: "C55/67", hinweis: "Vergussquerschnitt 10–50 mm", sku: "1220358S25KG" },
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
    zusatzBereiche: ["betonsanierung"],
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Vergussbeton (C80/95) für Vergussquerschnitte bis 200 mm, geprüft nach DIN EN 1504-3 (R4)",
    beschreibung: "Montage- und Vergussbeton für große Vergussquerschnitte bis 200 mm. Geprüft nach DIN EN 1504-3 (Klasse R4) und der DAfStb-Richtlinie für zementgebundenen Vergussbeton und Vergussmörtel.",
    qualitaetsklasse: "C80/95",
    normen: ["DAfStb-RL Vergussbeton"],
    technischeDaten: [{ label: "Vergussquerschnitt", wert: "bis 200 mm" }],
    besonderheiten: ["Für statisch relevante Anwendungen (R4)", "DAfStb-Richtlinie (SKVB I)"],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-vm-basic",
    sku: "1220370S25KG",
    tdsUrl: "/downloads/tds/NEODUR_VM_basic_de.pdf",
    name: "NEODUR VM basic",
    kategorie: "sonstige",
    // #308/#317: Spezialmörtel (Neubau) + Trinkwasserbehälter-Sanierung
    // (DVGW W 347, Rohrverguss in Trinkwasseranlagen).
    bereich: "spezialmoertel",
    zusatzBereiche: ["microtop", "betonsanierung"],
    aussenbereich: true,
    produktgruppe: "verguss",
    kurzbeschreibung: "Mineralischer, hochfließfähiger Quellvergussbeton, DVGW-geprüft für Trinkwasserbereiche",
    beschreibung: "NEODUR VM basic ist ein mineralischer, hochfließfähiger Quellvergussbeton für kraftschlüssige Vergussarbeiten und Montagen aller Art, z. B. Rohrverguss in Trinkwasseranlagen. Geprüft gem. DVGW-Arbeitsblatt W 347 für hygienische Anforderungen in Trinkwasserbereichen.",
    normen: ["DAfStb-RL Vergussbeton", "DVGW W 347"],
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
    zusatzBereiche: ["betonsanierung"],
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
    zusatzBereiche: ["betonsanierung"],
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
    sku: "1220427S25KG",
    tdsUrl: "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
    name: "NEODUR MSM 3",
    kategorie: "sonstige",
    // #308: Microsilica-Spritzmörtel → Sammelbereich Betonsanierung.
    bereich: "betonsanierung",
    zusatzBereiche: ["spezialmoertel"],
    aussenbereich: true,
    produktgruppe: "spritzmoertel",
    kurzbeschreibung: "Spritzmörtel für die Betoninstandsetzung, Körnung 0 bis 3 mm",
    beschreibung: "Die Betoninstandsetzung umfasst Technologien zur Wiederherstellung von Bauteilen aus Beton. NEODUR MSM 3 ist ein mineralischer Spritzmörtel mit Körnung 0 bis 3 mm, Verarbeitung gem. DIN 18551 in Verbindung mit DIN EN 14487.",
    qualitaetsklasse: "C35/45",
    normen: ["DIN 1045-3", "DIN EN 13670", "DIN 18551"],
    technischeDaten: [{ label: "Körnung", wert: "0–3 mm" }],
    besonderheiten: ["Umweltproduktdeklaration (Gruppen-EPD) verfügbar"],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-msm-5",
    sku: "1220428S25KG",
    tdsUrl: "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
    name: "NEODUR MSM 5",
    kategorie: "sonstige",
    // #308: Microsilica-Spritzmörtel → Sammelbereich Betonsanierung.
    bereich: "betonsanierung",
    zusatzBereiche: ["spezialmoertel"],
    aussenbereich: true,
    produktgruppe: "spritzmoertel",
    kurzbeschreibung: "Spritzmörtel für die Betoninstandsetzung, Körnung 0 bis 5 mm",
    beschreibung: "Die Betoninstandsetzung umfasst Technologien zur Wiederherstellung von Bauteilen aus Beton. NEODUR MSM 5 ist ein mineralischer Spritzmörtel mit Körnung 0 bis 5 mm.",
    qualitaetsklasse: "C35/45",
    normen: ["DIN EN 206", "DIN 1045-3", "DIN 18551", "DIN EN 14487", "DIN EN 1504-3", "DAfStb Trockenbetonrichtlinie"],
    technischeDaten: [{ label: "Körnung", wert: "0–5 mm" }],
    besonderheiten: [],
    zeitKategorie: "normal",
  },
  {
    id: "neodur-msb-8",
    sku: "1220429S25KG",
    tdsUrl: "/downloads/tds/NEODUR_MSM_3_5_MSB_8_de.pdf",
    name: "NEODUR MSB 8",
    kategorie: "sonstige",
    // #308: Microsilica-Spritzbeton → Sammelbereich Betonsanierung.
    bereich: "betonsanierung",
    zusatzBereiche: ["spezialmoertel"],
    aussenbereich: true,
    produktgruppe: "spritzmoertel",
    kurzbeschreibung: "Spritzbeton für die Betoninstandsetzung, Körnung 0 bis 8 mm",
    beschreibung: "Die Betoninstandsetzung umfasst Technologien zur Wiederherstellung von Bauteilen aus Beton. NEODUR MSB 8 ist ein mineralischer Spritzbeton mit Körnung 0 bis 8 mm.",
    qualitaetsklasse: "C35/45",
    normen: ["DIN EN 206", "DIN 1045-3", "DIN 18551", "DIN EN 14487", "DIN EN 1504-3", "DAfStb Trockenbetonrichtlinie"],
    technischeDaten: [{ label: "Körnung", wert: "0–8 mm" }],
    besonderheiten: [],
    zeitKategorie: "normal",
  },
  {
    id: "rapid-set-concrete-mix",
    sku: "1220507S25KG",
    tdsUrl: "/downloads/tds/Concrete_Mix_de.pdf",
    name: "Rapid Set CONCRETE MIX",
    kategorie: "schnellzement",
    bereich: "betonsanierung",
    zusatzBereiche: ["industrieboden"],
    aussenbereich: true,
    produktgruppe: "reparaturmoertel",
    bild: "/images/produkte/rapid-set-concrete-mix.webp",
    kurzbeschreibung: "Schnellerhärtender Schnellbeton für Einbaustärken von 50 bis 600 mm, belastbar nach 1 Stunde",
    beschreibung: "CONCRETE MIX ist ein schnellerhärtender, gut zu verarbeitender Reparaturmörtel auf Basis Rapid-Set-Zement mit speziell ausgewählten mineralischen Zuschlagstoffen. Ideal, wo schnelle Festigkeiten, Dauerhaftigkeit und schwindarmes Aushärten gefordert sind. Verarbeitbar in Stärken von 50 bis 600 mm, auch in Nassräumen; nicht-metallisch und ohne Chlorid-Zusätze.",
    schichtdicke: "50–600 mm",
    qualitaetsklasse: "C35/45",
    normen: ["DIN EN 13813"],
    technischeDaten: [
      { label: "Körnung", wert: "0–8 mm" },
      { label: "Erstarrungsbeginn", wert: "nach 15 Min.", norm: "DIN EN 196-3" },
      { label: "Belastbar", wert: "nach 60 Min." },
      { label: "Druckfestigkeit", wert: "nach 60 Min. 19 N/mm², nach 28 Tagen 41 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Biegezugfestigkeit", wert: "nach 60 Min. 4,5 N/mm², nach 28 Tagen 7 N/mm²", norm: "DIN EN 1015-11" },
      { label: "Frost-Tausalzbeständigkeit", wert: "ja" },
      { label: "Sulfatbeständigkeit", wert: "ja", norm: "Prüfung nach Wittekindt" },
    ],
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Untergrund säubern; lose Bestandteile, Zementschlämme, Staub, Säuren, Öl und Fett entfernen.",
          "Oberfläche für einen kraftschlüssigen Verbund rissefrei, eben sowie rau und offenporig herstellen.",
          "Geforderte Oberflächenzugfestigkeiten beachten (1,0 N/mm² sind nicht zu unterschreiten).",
          "Untergrund vor der Verarbeitung gründlich vornässen; bei stark saugenden Untergründen das Vornässen mehrmals wiederholen.",
          "Wasserfilm bzw. Pfützenbildung dabei vermeiden.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "Ausreichend Personal und geeignete Ausrüstung bzw. Werkzeug bereitstellen.",
          "Wasserzugabe je 25 kg-Gebinde ca. 3,0 - 4,5 l; Verarbeitungs-, Umgebungs- und Untergrundtemperatur ≥ 5 °C.",
          "Zuerst Wasser in den Mischbehälter vorgeben, dann bei laufendem Mischer CONCRETE MIX hinzugeben.",
          "Ca. 1 - 3 Minuten im geeigneten Zwangsmischer oder Rührquirl mischen; maximale Wasserzugabe nicht überschreiten (geringere Wasserzugabe erhöht die Festigkeiten).",
          "Einbau in einer kompletten Lage, nicht schichtweise und möglichst gleichmäßig; keine Verlegung auf gefrorenen Untergründen.",
          "Bei der Verdichtung Luftporen weitgehend verhindern; Endbearbeitung so schnell wie möglich (glätten, reiben oder mit Struktur versehen).",
          "Verarbeitungszeit bei Bedarf mit Rapid Set SET CONTROL (Verzögerer) verlängern, mit FLOW CONTROL (Plastifizierer) Fließfähigkeit erhöhen oder mit Additiv FAST die Abbindezeit beschleunigen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Die Nachbehandlung mit Wasser hat unmittelbar zu erfolgen, sobald die Oberfläche ihren feuchten Glanz verloren hat, und sollte innerhalb einer Stunde wiederholt durchgeführt werden, bis das Produkt ausreichende Festigkeiten erreicht hat. Bei längeren Abbindezeiten, zu niedrigen Temperaturen oder der Verwendung eines Verzögerungsmittels können längere Nachbehandlungszeiten erforderlich werden." },
      { titel: "Lieferform & Lagerung", text: "25 kg Papierspezialverpackung. Trocken lagern wie Zement. Haltbarkeitsdauer ca. 12 Monate." },
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
    bereich: "betonsanierung",
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
      { name: "SET Control", hinweis: "Verzögerer für längere Verarbeitungszeit", sku: "1320611" },
      { name: "FLOW Control", hinweis: "Verflüssiger, erhöht Festigkeiten", sku: "1320610" },
      { name: "FAST Control", hinweis: "Beschleuniger für kalte Temperaturen", sku: "1320612" },
    ],
    zeitKategorie: "normal",
  },

  // === TDS-NACHLIEFERUNG STEFFI 2026-06-12 (docs/tds-quellen/) ===
  // KOROMINERAL Lasur entfernt (2026-06-23): Produkt gibt es nicht mehr (Steffi).
  {
    id: "neodur-pfm-1k-easyfix",
    sku: "1220392",
    tdsUrl: "/downloads/tds/NEODUR_PFM_1K_Easyfix_de.pdf",
    name: "NEODUR PFM 1K Easyfix",
    kategorie: "sonstige",
    // #308: Spezialmörtel (Neubau) + Betonsanierung (Sanierungsanteil).
    bereich: "spezialmoertel",
    zusatzBereiche: ["betonsanierung"],
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
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Pflasterflächen so anlegen, dass keine Gefügelockerung und kein Absinken des Belages durch spätere Belastungen entsteht; einschlägige Merkblätter und Vorschriften für Pflasterflächen beachten.",
          "Der gesamte Aufbau muss wasserdurchlässig sein.",
          "Fugen mindestens 30 mm tief reinigen, Mindestfugenbreite 5 mm.",
          "Fläche grundsätzlich von Verschmutzungen jeglicher Art reinigen.",
          "Angrenzende, nicht zu verfugende Flächen abkleben.",
          "Fläche vornässen; saugfähige Flächen sowie höhere Untergrundtemperaturen erfordern ein intensiveres Vornässen.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "Eimerdeckel öffnen, Vakuumbeutel entnehmen, aufschneiden und den Pflasterfugenmörtel gleichmäßig und vollständig auf die Fläche schütten.",
          "Mit grobem Straßenbesen oder Gummischieber tief, fest und verdichtend in die Fugen einarbeiten.",
          "Zur besseren Verdichtung den frisch eingebrachten Mörtel mit einem Wassersprühstrahl gründlich nachschlämmen.",
          "Nachgesackte Fugen erneut mit Pflasterfugenmörtel auffüllen.",
          "Stehendes Wasser in der frischen Verfugung vermeiden, für ausreichendes Gefälle sorgen.",
          "Fläche vorsichtig mit feinem Haarbesen diagonal zur Fuge abkehren, bis sie von allen Mörtelresten befreit ist; abgekehrtes Material nicht mehr verwenden.",
          "Restanhaftungen auf der Steinoberfläche lassen sich noch nach 24 Stunden mit einem groben Straßenbesen entfernen.",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung / Regenschutz", text: "Ein Regenschutz bei Nieselregen ist nicht notwendig. Bei Dauer- oder Starkregen ist die frisch verfugte Fläche ca. 24 Stunden vor Regen zu schützen; der Regenschutz (Baufolie/Abdeckplane) darf direkt auf die Fläche aufgelegt werden. Begehbar nach 24 Stunden, Freigabe der Fläche nach 6 Tagen." },
      { titel: "Lieferform & Lagerung", text: "Lieferform: 25 kg Kunststoffgebinde. Lagerung: frostfrei und trocken im Originalgebinde. Haltbarkeitsdauer im verschlossenen Originalgebinde ca. 12 Monate." },
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
    sku: "2220885S25KG",
    tdsUrl: "/downloads/tds/NEODUR_PFM_ZE_PFM_ZE_Flex_de.pdf",
    name: "NEODUR PFM-ZE",
    kategorie: "sonstige",
    // #308: Spezialmörtel (Neubau) + Betonsanierung (Sanierungsanteil).
    bereich: "spezialmoertel",
    zusatzBereiche: ["betonsanierung"],
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
    verarbeitungModi: [
      {
        titel: "Untergrundvorbereitung",
        schritte: [
          "Der Unterbau muss ausreichend tragfähig und für die vorgesehenen Verkehrslasten hergestellt und überprüft sein.",
          "Die Pflasterfläche muss frei von Verschmutzungen jeder Art sein, die Steine müssen fest eingebettet werden.",
          "Die Fuge soll mindestens 2/3 der Steinhöhe und mindestens 8 mm Breite betragen.",
          "Wasserdurchlässiger Unterbau, Bettung und Steine müssen die Anforderungen der RStO bzw. DNV erfüllen.",
          "Die zum Verfugen bereitgestellte Fläche gründlich vornässen.",
        ],
      },
      {
        titel: "Verarbeitung",
        schritte: [
          "NEODUR PFM-ZE mit Zwangsmischer oder Doppelquirl mit der jeweiligen Wassermenge (3,5 l je 25 kg) mindestens 3 Minuten mischen.",
          "Den frisch gemischten Mörtel auf die zu verfugende Fläche aufgießen.",
          "Mit dem Gummiwischer diagonal hohlraumfrei in die Fuge einarbeiten und nach Bedarf mit dem Fugenrüttler vollständig entlüften.",
          "Die Steinoberfläche nach leichtem Ansteifen des Mörtels reinigen (z. B. mit einem Schwammreinigungsgerät).",
        ],
      },
    ],
    verarbeitungMeta: [
      { titel: "Nachbehandlung", text: "Die gereinigte Pflasterfläche ist sofort mit Folie für mindestens 7 Tage abzudecken. Unterschiedliche Temperaturen beeinflussen den Erstarrungs- bzw. Erhärtungsverlauf." },
      { titel: "Fugen & Hinweise", text: "Dehnfugen sind einzuplanen und auszuführen. Haarrisse infolge von Temperaturschwankungen beeinträchtigen die Funktionalität der Fuge nicht und stellen keinen Mangel dar. Wir empfehlen, eine Musterfläche zu erstellen." },
      { titel: "Lieferform & Lagerung", text: "25 kg Papierspezialverpackung. Trocken lagern, wie Zement. Haltbarkeitsdauer ca. 3 Monate." },
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

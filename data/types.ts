// === Lösungsfinder-Taxonomie V2.4 (4-Step) ===
// @deprecated Wird durch die V2.5-Taxonomie (s.u.) ersetzt.
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
// Während der Übergangsphase laufen beide Schemas parallel — V2.4-Referenzen
// werden über data/loesungsfinderV25Adapter.ts on-the-fly gemappt.

/** @deprecated Ab V2.5 ersetzt durch `Flaechenkategorie` (punktuell|mittel|gross). */
export type Sanierungsart = "punktuell" | "grossflaechig";

/** @deprecated Ab V2.5 ersetzt durch `EinsatzbereichV25` mit 4 Innen- + 4 Außen-Clustern. */
export type EinsatzbereichKategorie =
  | "lager-logistik"
  | "industrie-produktion"
  | "lebensmittel"
  | "flugzeug"
  | "parkdeck"
  | "infrastruktur-zufahrten"
  | "verkaufsraeume"
  | "schwerindustrie";

/** @deprecated Ab V2.5 ersetzt durch `Zeitfenster` (sehr-kurz|kurz|planbar). */
export type ZeitKategorie = "schnell" | "mittel" | "normal";

/** @deprecated Ab V2.5 abgelöst durch Branchen-abgeleitete `BelastungsTag`s. */
export type Zusatzfunktion =
  | "chemikalienbestaendigkeit"
  | "tausalzbestaendigkeit"
  | "rutschhemmung"
  | "fleckenabwehr";
// Hinweis: weitere Zusatzfunktionen werden nach Experten-Abstimmung ergänzt.

export interface Referenz {
  id: string;
  slug: string;
  titel: string;
  untertitel: string;
  ort: string;
  land: string;
  flaeche?: string;
  produkte: string[];
  herausforderungen: string[];
  loesung: string;
  vorteile: string[];
  bild: string;
  bildAlt: string;
  galerieBilder?: string[];

  // Lösungsfinder-Tags
  sanierungsart: Sanierungsart;
  einsatzbereiche: EinsatzbereichKategorie[];
  /** Wie schnell die Wiederbelastbarkeit im Projekt historisch erforderlich war. Nicht verwechseln mit `Produkt.zeitKategorie` (Produkt-Eigenschaft). */
  zeitDringlichkeit: ZeitKategorie;
  zusatzfunktionen: Zusatzfunktion[];
}

export interface Verarbeitung {
  untergrundvorbereitung: string;
  mischverhaeltnis: string;
  schichtaufbau: string;
  verarbeitungszeit: string;
  aushaertezeit: string;
  besonderheiten: string;
}

// === V2.5-Lösungsfinder-Taxonomie (2026-06-01) ===
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
// Brand-Tokens: Navy #002d59 + Cyan #009ee3
//
// Funnel-Reihenfolge:
//   Step 1 Flaeche → Step 2 InnenAussen → Step 3 Einsatzbereich → Step 4 Zeitfenster
// Bei flaeche === "punktuell" wird Step 4 übersprungen und Zeitfenster
// intern auf "sehr-kurz" defaulted (alle Reparaturmörtel sind ~1h belastbar).

/** Step 1 — Flächenkategorie. Entscheidet über die Produktwelt. */
export type Flaechenkategorie =
  | "punktuell"   // < 100 m² · einzelne Schadstellen, Schnellreparaturmörtel
  | "mittel"      // 100–1.000 m² · zusammenhängende Hallenabschnitte
  | "gross";      // > 1.000 m² · komplette Hallen, große Außenflächen

/** Step 2 — Innen oder Außen. Aktiviert Frost-/Tausalz-Anforderungen. */
export type InnenAussen = "innen" | "aussen";

/** Step 3 — Einsatzbereich (Branchen-Cluster), 3 Innen + 3 Außen.
 *  Referenzgedeckter Schnitt (Spec docs/2026-06-02-loesungsfinder-step3-spec.md §4):
 *  keine Cluster ohne Referenzen. Ersetzt das alte 4+4-Schema. */
export type EinsatzbereichV25 =
  // Innen
  | "innen-industrie-halle"
  | "innen-nass-hygiene-chemie"
  | "innen-sicht-design"
  // Außen
  | "aussen-verkehr-infrastruktur"
  | "aussen-parkdeck"
  | "aussen-umwelt-whg";

/** Step 4 — Zeitfenster. Bleibt `null` bei flaeche === "punktuell". */
export type Zeitfenster =
  | "sehr-kurz"   // über Nacht, Wochenende — Wiederbelastung ≤ 24h
  | "kurz"        // 1–2 Wochen — Wiederbelastung ≤ 168h
  | "planbar";    // keine Zeitbegrenzung

/** Implizit aus dem Einsatzbereich abgeleitete Belastungs-Tags
 *  (Mapping siehe data/einsatzbereichMapping.ts). */
// chemie-Tag in Treibstoff (Öl/Benzin/Lösemittel) und aggressiv (viele chem.
// Angriffe/Säuren) gesplittet (Steffi 2026-06-02). NICHT aus Sulfat/Chlorid
// abgeleitet — die sind Boilerplate bzw. Boolean-Eigenschaft, keine Match-Tags.
// `thermik` gestrichen (kein TDS-Beleg), `whg` neu (flüssigkeitsdicht/WHG).
export type BelastungsTag =
  | "schwerlast"
  | "verschleiss"
  | "staplerverkehr"
  | "chemie-treibstoff"
  | "chemie-aggressiv"
  | "hygiene"
  | "fleckschutz"
  | "optik"
  | "publikumsverkehr"
  | "frost-tausalz"
  | "whg";

/** Schadenstypen — als Pill-Filter auf der Ergebnisseite, NICHT als Wizard-Step.
 *  Grenzt Referenzen ein, nicht Produkte. */
export type Schadenstyp =
  | "verschleissschaeden"
  | "ausbrueche"
  | "risse"
  | "frueher-sanierung";

/** Wizard-State: was hat der Nutzer ausgewählt. */
export interface LoesungsfinderState {
  flaeche: Flaechenkategorie | null;
  innenAussen: InnenAussen | null;
  einsatzbereich: EinsatzbereichV25 | null;
  zeitfenster: Zeitfenster | null;
}

/** V2.5-Filter-Eigenschaften pro Referenz.
 *  Wird durch `mapReferenzV24toV25()` aus dem alten Schema abgeleitet,
 *  Overrides können in `data/v25ReferenzOverrides.ts` gepflegt werden. */
export interface ReferenzFilterV25 {
  flaecheKategorie: Flaechenkategorie;
  innenAussen: InnenAussen;
  einsatzbereich: EinsatzbereichV25;
  zeitfenster: Zeitfenster;
  schadenstypen: Schadenstyp[];
}

/** V2.5-Filter-Eigenschaften pro Produkt.
 *  Wird durch `mapProduktV24toV25()` aus dem alten Schema abgeleitet,
 *  Overrides in `data/v25ProduktOverrides.ts`. */
export interface ProduktFilterV25 {
  flaechenkategorienGeeignet: Flaechenkategorie[];
  innenGeeignet: boolean;
  aussenGeeignet: boolean;
  belastungenAbgedeckt: BelastungsTag[];
  /** Wiederbelastbar nach X Stunden. Rapid-Set ≈ 1, HE 60 rapid ≈ 24, HE 65 ≈ 168. */
  wiederbelastungInH: number;
  /** Slugs der System-Begleitprodukte (Grundierung, Haftbrücke, Nachbehandlung). */
  systemBegleitprodukte: string[];
}

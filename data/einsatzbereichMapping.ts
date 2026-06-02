// === Branchen → Belastungs-Tag Mapping (V2.5) ===
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Jede Branche (Step 3 des Lösungsfinders) liefert implizit ein Set an
// Belastungs-Tags. Das ersetzt die separate "Belastungsbild"-Frage aus V2.4:
// Statt den Nutzer abstrakt nach "Chemie, Thermik, Schwerlast" zu fragen,
// erkennt er sich an seiner Branche wieder und wir leiten die Lastarten ab.
//
// Match-Algorithmus auf der Ergebnisseite vergleicht diese Tags gegen
// `Produkt.belastungenAbgedeckt`. Schnittmenge ≥ 1 = relevant; größere
// Schnittmenge = höherer Match-Score.

import type { BelastungsTag, EinsatzbereichV25, InnenAussen } from "./types";

export const EINSATZBEREICH_TAGS: Record<EinsatzbereichV25, BelastungsTag[]> = {
  // Innen
  "innen-industrie-halle": ["schwerlast", "verschleiss", "staplerverkehr", "chemie-treibstoff"],
  "innen-nass-hygiene-chemie": ["hygiene", "chemie-aggressiv", "whg"],
  "innen-sicht-design": ["optik", "fleckschutz", "publikumsverkehr"],
  // Außen — die zwei Außen-Cluster tragen bewusst beide chemie-Varianten,
  // weil ihre Anwendungsfälle real Öl (Treibstoff) und Säuren (aggressiv) abdecken.
  "aussen-verkehr-infrastruktur": ["frost-tausalz", "schwerlast", "chemie-treibstoff", "chemie-aggressiv"],
  "aussen-parkdeck": ["frost-tausalz", "chemie-treibstoff", "verschleiss"],
  "aussen-umwelt-whg": ["whg", "chemie-treibstoff", "chemie-aggressiv", "frost-tausalz"],
};

/** Liefert die Innen/Außen-Zugehörigkeit eines Einsatzbereichs ohne Parsen. */
export function innenAussenVonEinsatzbereich(b: EinsatzbereichV25): InnenAussen {
  return b.startsWith("innen-") ? "innen" : "aussen";
}

/** Alle Einsatzbereiche eines Innen/Außen-Bereichs. Step-3-Karten leiten sich hieraus ab. */
export function einsatzbereicheFuer(ia: InnenAussen): EinsatzbereichV25[] {
  return (Object.keys(EINSATZBEREICH_TAGS) as EinsatzbereichV25[]).filter(
    (b) => innenAussenVonEinsatzbereich(b) === ia,
  );
}

/** Auflösbare Labels für die UI (DE-Basis; EN/FR/PL über `dictionaries/*.json`). */
export const EINSATZBEREICH_LABELS: Record<EinsatzbereichV25, { titel: string; stichworte: string }> = {
  "innen-industrie-halle": {
    titel: "Industrie- & Hallenboden",
    stichworte: "Staplerverkehr, Schwerlast, Abrieb, Maschinen, Hochregallager",
  },
  "innen-nass-hygiene-chemie": {
    titel: "Nass-, Hygiene- & Chemiefläche",
    stichworte: "Nassbereich, Lebensmittel, Pharma, Reinigung, Säuren",
  },
  "innen-sicht-design": {
    titel: "Sicht- & Designboden",
    stichworte: "Optik, Repräsentation, Verkauf, Publikumsverkehr",
  },
  "aussen-verkehr-infrastruktur": {
    titel: "Verkehrs- & Infrastrukturfläche",
    stichworte: "Straße, Brücke, Flugbetrieb, schnelle Freigabe",
  },
  "aussen-parkdeck": {
    titel: "Parkdeck & Parkfläche",
    stichworte: "PKW-Verkehr, Tausalz, Reifenabrieb, Öltropfen",
  },
  "aussen-umwelt-whg": {
    titel: "Umwelt- & WHG-Fläche",
    stichworte: "Tankstelle, Waschplatz, Auffangbehälter, Hafen, Gefahrgut",
  },
};

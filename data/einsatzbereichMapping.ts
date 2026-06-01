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
  "innen-lager-logistik": ["schwerlast", "verschleiss", "staplerverkehr"],
  "innen-industrie-produktion": ["chemie", "thermik", "schwerlast", "verschleiss"],
  "innen-lebensmittel-pharma": ["chemie", "hygiene", "fleckschutz"],
  "innen-verkauf-showroom": ["optik", "fleckschutz", "publikumsverkehr"],
  // Außen
  "aussen-parkdeck-tiefgarage": ["frost-tausalz", "chemie", "verschleiss"],
  "aussen-verladezone-rampe": ["frost-tausalz", "schwerlast", "staplerverkehr"],
  "aussen-werkhof-aussenlager": ["frost-tausalz", "verschleiss"],
  "aussen-infrastruktur-verkehr": ["frost-tausalz", "chemie", "schwerlast"],
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
  "innen-lager-logistik": {
    titel: "Lager & Logistik",
    stichworte: "Staplerverkehr, Schwerlast, Schüttgut, Hochregallager",
  },
  "innen-industrie-produktion": {
    titel: "Industrie & Produktion",
    stichworte: "Maschinenbelastung, Chemie, Hitze, Schüttgüter",
  },
  "innen-lebensmittel-pharma": {
    titel: "Lebensmittel & Pharma",
    stichworte: "Hygiene, Reinigungsfrequenz, Fleckschutz, Säuren",
  },
  "innen-verkauf-showroom": {
    titel: "Verkauf & Showroom",
    stichworte: "Optik, Repräsentation, Publikumsverkehr, Design",
  },
  "aussen-parkdeck-tiefgarage": {
    titel: "Parkdeck & Tiefgarage",
    stichworte: "PKW-Verkehr, Tausalz, Reifenabrieb, Öltropfen",
  },
  "aussen-verladezone-rampe": {
    titel: "Verladezone & Rampe",
    stichworte: "Stapleraußenfahrt, LKW-Verkehr, Witterung",
  },
  "aussen-werkhof-aussenlager": {
    titel: "Werkhof & Außenlager",
    stichworte: "Wechselbelastung, Frost, Maschineneinsatz",
  },
  "aussen-infrastruktur-verkehr": {
    titel: "Infrastruktur & Verkehr",
    stichworte: "Brücken, Straßen, Tankstellen, Sondereinsatz",
  },
};

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

import type { BelastungsTag, EinsatzbereichKategorie, EinsatzbereichV25, InnenAussen } from "./types";
import { getProduktByName } from "./produkte";

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

// === Lokalisierte Bereichs-Labels (Branchen-Facette, 4 Sprachen) =============
// Feine Branchen-Ebene für die Referenzgalerie ("zeig mir ein Projekt wie
// meins"). Bewusst granularer als die 6 Lösungsfinder-Cluster: hier soll der
// Nutzer seine eigene Branche wiedererkennen. Aus dieser Ebene rollen die
// Finder-Cluster hoch — eine Hierarchie, zwei Zoomstufen.
export const BEREICH_LABELS_I18N: Record<string, Record<EinsatzbereichKategorie, string>> = {
  de: {
    "lager-logistik": "Lager & Logistik",
    "industrie-produktion": "Industrie & Produktion",
    "lebensmittel": "Lebensmittel",
    "flugzeug": "Flugzeug",
    "parkdeck": "Parkdeck",
    "infrastruktur-zufahrten": "Infrastruktur & Zufahrten",
    "verkaufsraeume": "Verkaufsräume",
    "schwerindustrie": "Schwerindustrie",
  },
  en: {
    "lager-logistik": "Warehouse & Logistics",
    "industrie-produktion": "Industrial & Production",
    "lebensmittel": "Food Processing",
    "flugzeug": "Aviation",
    "parkdeck": "Parking Deck",
    "infrastruktur-zufahrten": "Infrastructure & Access",
    "verkaufsraeume": "Retail",
    "schwerindustrie": "Heavy Industry",
  },
  fr: {
    "lager-logistik": "Entrepôts & Logistique",
    "industrie-produktion": "Industrie & Production",
    "lebensmittel": "Agroalimentaire",
    "flugzeug": "Aviation",
    "parkdeck": "Parking",
    "infrastruktur-zufahrten": "Infrastructure & Accès",
    "verkaufsraeume": "Commerce",
    "schwerindustrie": "Industrie lourde",
  },
  pl: {
    "lager-logistik": "Magazyn i logistyka",
    "industrie-produktion": "Przemysł i produkcja",
    "lebensmittel": "Przemysł spożywczy",
    "flugzeug": "Lotnictwo",
    "parkdeck": "Parking",
    "infrastruktur-zufahrten": "Infrastruktura i dojazdy",
    "verkaufsraeume": "Handel",
    "schwerindustrie": "Przemysł ciężki",
  },
};

/** Bereichs-Label in der gewünschten Sprache, mit DE-Fallback. */
export function bereichLabel(b: EinsatzbereichKategorie, lang: string): string {
  return BEREICH_LABELS_I18N[lang]?.[b] ?? BEREICH_LABELS_I18N.de[b];
}

// === Produkt-Familien (gruppierter Produktfilter, 4 Sprachen) ================
// Gruppiert die Produktnamen einer Referenz nach Produktkategorie, damit der
// (progressiv eingeblendete) Produktfilter nicht als lange Flachliste erscheint.
export const PRODUKT_FAMILIE_LABELS_I18N: Record<string, Record<string, string>> = {
  de: { estrich: "Estriche", schnellzement: "Schnellreparatur & Schnellbeton", grundierung: "Grundierung & Haftbrücke", nachbehandlung: "Nachbehandlung", beschichtung: "Beschichtung", sonstige: "Sonstige" },
  en: { estrich: "Screeds", schnellzement: "Rapid repair & concrete", grundierung: "Primer & bonding", nachbehandlung: "Curing", beschichtung: "Coating", sonstige: "Other" },
  fr: { estrich: "Chapes", schnellzement: "Réparation rapide & béton", grundierung: "Primaire & accrochage", nachbehandlung: "Cure", beschichtung: "Revêtement", sonstige: "Autres" },
  pl: { estrich: "Jastrychy", schnellzement: "Szybka naprawa i beton", grundierung: "Grunt i warstwa szczepna", nachbehandlung: "Pielęgnacja", beschichtung: "Powłoka", sonstige: "Inne" },
};

/** Produktkategorie eines Produktnamens (für die Gruppierung); unbekannt = "sonstige". */
export function produktFamilie(produktName: string): string {
  return getProduktByName(produktName)?.kategorie ?? "sonstige";
}

/** Familien-Label in der gewünschten Sprache, mit DE-Fallback. */
export function produktFamilieLabel(kategorie: string, lang: string): string {
  return (
    PRODUKT_FAMILIE_LABELS_I18N[lang]?.[kategorie] ??
    PRODUKT_FAMILIE_LABELS_I18N.de[kategorie] ??
    kategorie
  );
}

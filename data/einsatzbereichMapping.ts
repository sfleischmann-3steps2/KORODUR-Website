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

import type { BelastungsTag, EinsatzbereichKategorie, EinsatzbereichV25, InnenAussen, Referenz } from "./types";
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
    stichworte: "Schwerlast, Staplerverkehr, Entsorgung, Maschinenbau, Hochregallager",
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

// === Lokalisierte Finder-Cluster-Labels (Step 3 + Ergebnisseite, 4 Sprachen) ==
// EN/FR/PL-Overrides für EINSATZBEREICH_LABELS. DE bleibt die Basis oben,
// damit bestehende Aufrufer (Skripte, Tests) unverändert weiterlaufen.
const EINSATZBEREICH_LABELS_I18N: Record<string, Record<EinsatzbereichV25, { titel: string; stichworte: string }>> = {
  en: {
    "innen-industrie-halle": {
      titel: "Industrial & warehouse floors",
      stichworte: "Heavy loads, forklift traffic, waste management, mechanical engineering, high-bay warehouses",
    },
    "innen-nass-hygiene-chemie": {
      titel: "Wet, hygiene & chemical areas",
      stichworte: "Wet areas, food processing, pharma, cleaning, acids",
    },
    "innen-sicht-design": {
      titel: "Decorative & exposed floors",
      stichworte: "Appearance, representative spaces, retail, public traffic",
    },
    "aussen-verkehr-infrastruktur": {
      titel: "Traffic & infrastructure areas",
      stichworte: "Roads, bridges, aviation, fast reopening",
    },
    "aussen-parkdeck": {
      titel: "Parking decks & parking areas",
      stichworte: "Car traffic, de-icing salt, tyre abrasion, oil drips",
    },
    "aussen-umwelt-whg": {
      titel: "Environmental & containment areas",
      stichworte: "Filling stations, wash bays, containment basins, ports, hazardous goods",
    },
  },
  fr: {
    "innen-industrie-halle": {
      titel: "Sols industriels & halls",
      stichworte: "Charges lourdes, trafic de chariots, gestion des déchets, construction mécanique, entrepôts grande hauteur",
    },
    "innen-nass-hygiene-chemie": {
      titel: "Zones humides, hygiène & chimie",
      stichworte: "Zones humides, agroalimentaire, pharma, nettoyage, acides",
    },
    "innen-sicht-design": {
      titel: "Sols décoratifs & apparents",
      stichworte: "Esthétique, espaces représentatifs, vente, fort passage",
    },
    "aussen-verkehr-infrastruktur": {
      titel: "Voiries & infrastructures",
      stichworte: "Routes, ponts, aviation, remise en service rapide",
    },
    "aussen-parkdeck": {
      titel: "Parkings & dalles de stationnement",
      stichworte: "Trafic VL, sels de déverglaçage, abrasion des pneus, gouttes d'huile",
    },
    "aussen-umwelt-whg": {
      titel: "Zones environnementales & rétention",
      stichworte: "Stations-service, aires de lavage, bacs de rétention, ports, marchandises dangereuses",
    },
  },
  pl: {
    "innen-industrie-halle": {
      titel: "Posadzki przemysłowe i hale",
      stichworte: "Duże obciążenia, ruch wózków widłowych, gospodarka odpadami, budowa maszyn, magazyny wysokiego składowania",
    },
    "innen-nass-hygiene-chemie": {
      titel: "Strefy mokre, higieniczne i chemiczne",
      stichworte: "Strefy mokre, przemysł spożywczy, farmacja, czyszczenie, kwasy",
    },
    "innen-sicht-design": {
      titel: "Posadzki dekoracyjne i reprezentacyjne",
      stichworte: "Estetyka, powierzchnie reprezentacyjne, sprzedaż, ruch publiczny",
    },
    "aussen-verkehr-infrastruktur": {
      titel: "Powierzchnie komunikacyjne i infrastruktura",
      stichworte: "Drogi, mosty, lotniska, szybkie oddanie do użytku",
    },
    "aussen-parkdeck": {
      titel: "Parkingi i tarasy parkingowe",
      stichworte: "Ruch samochodowy, sól drogowa, ścieranie opon, plamy oleju",
    },
    "aussen-umwelt-whg": {
      titel: "Powierzchnie środowiskowe i wanny wychwytowe",
      stichworte: "Stacje paliw, myjnie, wanny wychwytowe, porty, towary niebezpieczne",
    },
  },
};

/** Finder-Cluster-Label (titel + stichworte) in der gewünschten Sprache, DE-Fallback. */
export function einsatzbereichLabel(
  b: EinsatzbereichV25,
  lang: string,
): { titel: string; stichworte: string } {
  return EINSATZBEREICH_LABELS_I18N[lang]?.[b] ?? EINSATZBEREICH_LABELS[b];
}

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

// === Kuratierte Anwendungsbereiche (Referenz-Filter, #251) ==================
// Grobe, bewusst sparsame Facette für die Referenz-Übersicht — an die
// Lösungsfinder-V25-Cluster angelehnt, dazu Trinkwasser (Microtop-TW-Portfolio,
// in V25 kein eigener Cluster). Mehrere feine Branchen (einsatzbereiche) rollen
// auf einen groben Bereich hoch ("weniger ist mehr"). aussen-umwelt-whg ist
// bewusst (noch) nicht enthalten — keine Referenz-Branche mappt darauf.
export type Anwendungsbereich =
  | "industrie-halle"
  | "hygiene-lebensmittel"
  | "sicht-design"
  | "infrastruktur-verkehr"
  | "parkdeck"
  | "trinkwasser-behaelter";

export const ANWENDUNGSBEREICH_ORDER: Anwendungsbereich[] = [
  "industrie-halle",
  "hygiene-lebensmittel",
  "sicht-design",
  "infrastruktur-verkehr",
  "parkdeck",
  "trinkwasser-behaelter",
];

// Branche (feine 8er-Ebene) -> grober Anwendungsbereich.
const BRANCHE_ZU_ANWENDUNG: Record<EinsatzbereichKategorie, Anwendungsbereich> = {
  "lager-logistik": "industrie-halle",
  "industrie-produktion": "industrie-halle",
  "schwerindustrie": "industrie-halle",
  "lebensmittel": "hygiene-lebensmittel",
  "verkaufsraeume": "sicht-design",
  "infrastruktur-zufahrten": "infrastruktur-verkehr",
  "flugzeug": "infrastruktur-verkehr",
  "parkdeck": "parkdeck",
};

export const ANWENDUNGSBEREICH_LABELS_I18N: Record<string, Record<Anwendungsbereich, string>> = {
  de: {
    "industrie-halle": "Industrie & Halle",
    "hygiene-lebensmittel": "Hygiene & Lebensmittel",
    "sicht-design": "Sicht & Design",
    "infrastruktur-verkehr": "Infrastruktur & Verkehr",
    "parkdeck": "Parkdeck",
    "trinkwasser-behaelter": "Trinkwasser & Behälter",
  },
  en: {
    "industrie-halle": "Industrial & warehouse",
    "hygiene-lebensmittel": "Hygiene & food",
    "sicht-design": "Visual & design",
    "infrastruktur-verkehr": "Infrastructure & traffic",
    "parkdeck": "Parking deck",
    "trinkwasser-behaelter": "Potable water & tanks",
  },
  fr: {
    "industrie-halle": "Industrie & halls",
    "hygiene-lebensmittel": "Hygiène & agroalimentaire",
    "sicht-design": "Esthétique & design",
    "infrastruktur-verkehr": "Infrastructure & trafic",
    "parkdeck": "Parking",
    "trinkwasser-behaelter": "Eau potable & réservoirs",
  },
  pl: {
    "industrie-halle": "Przemysł i hale",
    "hygiene-lebensmittel": "Higiena i żywność",
    "sicht-design": "Estetyka i design",
    "infrastruktur-verkehr": "Infrastruktura i ruch",
    "parkdeck": "Parking",
    "trinkwasser-behaelter": "Woda pitna i zbiorniki",
  },
  es: {
    "industrie-halle": "Industria y naves",
    "hygiene-lebensmittel": "Higiene y alimentación",
    "sicht-design": "Estética y diseño",
    "infrastruktur-verkehr": "Infraestructura y tráfico",
    "parkdeck": "Aparcamiento",
    "trinkwasser-behaelter": "Agua potable y depósitos",
  },
};

/** Anwendungsbereich-Label in der gewünschten Sprache, mit DE-Fallback. */
export function anwendungsbereichLabel(b: Anwendungsbereich, lang: string): string {
  return ANWENDUNGSBEREICH_LABELS_I18N[lang]?.[b] ?? ANWENDUNGSBEREICH_LABELS_I18N.de[b];
}

// Trinkwasser/Behälter aus den eingesetzten Produkten ableiten (Microtop TW).
function istTrinkwasserReferenz(ref: Referenz): boolean {
  return ref.produkte.some((p) => /microtop\s*tw/i.test(p));
}

/** Grobe Anwendungsbereiche einer Referenz (kuratiert, dedupliziert,
 *  in fester ANWENDUNGSBEREICH_ORDER). */
export function anwendungsbereicheVonReferenz(ref: Referenz): Anwendungsbereich[] {
  const set = new Set<Anwendungsbereich>();
  for (const b of ref.einsatzbereiche ?? []) {
    const a = BRANCHE_ZU_ANWENDUNG[b];
    if (a) set.add(a);
  }
  if (istTrinkwasserReferenz(ref)) set.add("trinkwasser-behaelter");
  return ANWENDUNGSBEREICH_ORDER.filter((a) => set.has(a));
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

// === Projektart-Facette (Neubau / Sanierung) ================================
// Referenzen tragen `projekttyp` (sanierung|neubau|instandsetzung|modernisierung).
// Für Filter und Karten-Chip rollen wir auf zwei Buckets hoch: Neubau vs.
// Sanierung (inkl. Instandsetzung/Modernisierung). Die Detailseite zeigt
// weiterhin den genauen projekttyp.
export type Projektart = "sanierung" | "neubau";

/** Rollt den genauen projekttyp auf die zwei Filter-Buckets hoch.
 *  Fehlender Wert → "sanierung" (Sanierungs-App ist der Default-Kontext). */
export function projektartBucket(
  projekttyp?: "sanierung" | "neubau" | "instandsetzung" | "modernisierung"
): Projektart {
  return projekttyp === "neubau" ? "neubau" : "sanierung";
}

// Bucket-Labels, deckungsgleich mit den projekttyp_*-Strings der Dictionaries
// (DE/EN/FR/PL/ES). Bewusst hier als Funktion, damit ReferenceCard ohne
// dict-Zugriff lokalisieren kann (wie bereichLabel).
export const PROJEKTART_LABELS_I18N: Record<string, Record<Projektart, string>> = {
  de: { sanierung: "Sanierung", neubau: "Neubau" },
  en: { sanierung: "Renovation", neubau: "New construction" },
  fr: { sanierung: "Rénovation", neubau: "Construction neuve" },
  pl: { sanierung: "Renowacja", neubau: "Nowe budownictwo" },
  es: { sanierung: "Rehabilitación", neubau: "Obra nueva" },
};

/** Projektart-Label (Bucket) in der gewünschten Sprache, mit DE-Fallback. */
export function projektartLabel(art: Projektart, lang: string): string {
  return PROJEKTART_LABELS_I18N[lang]?.[art] ?? PROJEKTART_LABELS_I18N.de[art];
}

// === V2.5-Adapter — V2.4-Daten on-the-fly auf V2.5-Schema mappen ===
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// So lange `data/referenzen.ts` und `data/produkte.ts` noch im V2.4-Schema
// gepflegt sind, mappt dieser Adapter beim Lesen auf das V2.5-Filter-Schema.
// Sobald die Stammdaten manuell migriert / Overrides gepflegt sind, kann der
// Adapter rückwärts-kompatibel um Override-Maps erweitert werden — und am
// Ende ganz weg.
//
// HEURISTIKEN sind bewusst grob. Sie machen den Funnel zur Build-Zeit lauffähig,
// produzieren aber nicht zwingend fachlich perfekte Ergebnisse. Manuelle Refinement
// erfolgt über Overrides (TODO: v25ReferenzOverrides.ts / v25ProduktOverrides.ts).

import type {
  BelastungsTag,
  EinsatzbereichKategorie,
  EinsatzbereichV25,
  Flaechenkategorie,
  InnenAussen,
  ProduktFilterV25,
  Referenz,
  ReferenzFilterV25,
  Sanierungsart,
  Schadenstyp,
  ZeitKategorie,
  Zeitfenster,
  Zusatzfunktion,
} from "./types";
import type { Produkt } from "./produkte";

// --- Einsatzbereich (alt 8-Cluster → neu 8-Cluster mit Innen/Außen-Prefix) ---
const EINSATZBEREICH_MIGRATION: Record<EinsatzbereichKategorie, EinsatzbereichV25> = {
  "lager-logistik": "innen-lager-logistik",
  "industrie-produktion": "innen-industrie-produktion",
  "lebensmittel": "innen-lebensmittel-pharma",
  "verkaufsraeume": "innen-verkauf-showroom",
  "schwerindustrie": "innen-industrie-produktion",
  "parkdeck": "aussen-parkdeck-tiefgarage",
  "infrastruktur-zufahrten": "aussen-infrastruktur-verkehr",
  "flugzeug": "aussen-infrastruktur-verkehr",
};

// --- Sanierungsart + Flächen-Text → Flächenkategorie ---
function parseFlaecheNumerisch(flaecheStr?: string): number | null {
  if (!flaecheStr) return null;
  // Beispiele: "2.400 m²", "ca. 800 m²", "1.200–1.500 m²"
  const match = flaecheStr.replace(/\./g, "").match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function ableitenFlaechenkategorie(
  sanierungsart: Sanierungsart,
  flaecheStr?: string,
): Flaechenkategorie {
  if (sanierungsart === "punktuell") return "punktuell";
  const m2 = parseFlaecheNumerisch(flaecheStr);
  if (m2 === null) return "mittel"; // konservativer Default für grossflaechig ohne Angabe
  if (m2 < 100) return "punktuell";
  if (m2 <= 1000) return "mittel";
  return "gross";
}

// --- Zeitdringlichkeit alt → Zeitfenster neu ---
const ZEIT_MIGRATION: Record<ZeitKategorie, Zeitfenster> = {
  "schnell": "sehr-kurz",
  "mittel": "kurz",
  "normal": "planbar",
};

// --- Zusatzfunktion alt → Belastungs-Tag neu (für Produkte) ---
const ZUSATZFUNKTION_MIGRATION: Record<Zusatzfunktion, BelastungsTag> = {
  "chemikalienbestaendigkeit": "chemie",
  "tausalzbestaendigkeit": "frost-tausalz",
  "rutschhemmung": "verschleiss", // Heuristik — A6-Verschleiß impliziert auch Rutschhemmung
  "fleckenabwehr": "fleckschutz",
};

// --- Produktkategorie → Flächenkategorien-Eignung ---
function ableitenFlaechenkategorienGeeignet(produktKategorie: Produkt["kategorie"]): Flaechenkategorie[] {
  switch (produktKategorie) {
    case "schnellzement":
      return ["punktuell", "mittel"]; // Rapid Set deckt klein bis mittel ab
    case "estrich":
      return ["mittel", "gross"];
    case "beschichtung":
      return ["mittel", "gross"];
    case "grundierung":
    case "nachbehandlung":
      return ["punktuell", "mittel", "gross"]; // Begleitprodukte, in allen Welten relevant
    case "sonstige":
      return ["punktuell", "mittel", "gross"];
  }
}

// --- Zeitkategorie → Wiederbelastungszeit in Stunden ---
function ableitenWiederbelastungInH(zk: ZeitKategorie, produktKategorie: Produkt["kategorie"]): number {
  if (produktKategorie === "schnellzement") return 1; // Rapid-Set ist immer ~1h
  switch (zk) {
    case "schnell": return 24;
    case "mittel": return 168; // 1 Woche
    case "normal": return 720; // ~30 Tage
  }
}

// === Public API ===

/** Mappt eine V2.4-Referenz auf die V2.5-Filter-Eigenschaften. */
export function mapReferenzV24toV25(r: Referenz): ReferenzFilterV25 {
  // Mehrere alte Einsatzbereiche → nimm den ersten, der eindeutig mappt.
  const ersterBereich = r.einsatzbereiche[0] ?? "industrie-produktion";
  const einsatzbereich = EINSATZBEREICH_MIGRATION[ersterBereich];
  const innenAussen: InnenAussen = einsatzbereich.startsWith("innen-") ? "innen" : "aussen";

  return {
    flaecheKategorie: ableitenFlaechenkategorie(r.sanierungsart, r.flaeche),
    innenAussen,
    einsatzbereich,
    zeitfenster: ZEIT_MIGRATION[r.zeitDringlichkeit],
    schadenstypen: [], // V2.4 hatte kein Schadensbild — manuell über Overrides ergänzen
  };
}

/** Mappt ein V2.4-Produkt auf die V2.5-Filter-Eigenschaften. */
export function mapProduktV24toV25(p: Produkt): ProduktFilterV25 {
  const belastungen: BelastungsTag[] = (p.zusatzfunktionen ?? []).map(
    (zf) => ZUSATZFUNKTION_MIGRATION[zf],
  );

  // Außenbereich heuristisch: Produkte mit Tausalz-Tag oder explizit als Außen-fähig
  const hatTausalz = p.zusatzfunktionen?.includes("tausalzbestaendigkeit") ?? false;
  const istEstrichOderSchnellzement = p.kategorie === "estrich" || p.kategorie === "schnellzement";

  return {
    flaechenkategorienGeeignet: ableitenFlaechenkategorienGeeignet(p.kategorie),
    innenGeeignet: true, // Default true; spezifische Innen-Nur-Produkte als Override
    aussenGeeignet: hatTausalz || !istEstrichOderSchnellzement, // konservativ
    belastungenAbgedeckt: belastungen,
    wiederbelastungInH: ableitenWiederbelastungInH(p.zeitKategorie, p.kategorie),
    systemBegleitprodukte: [], // V2.4 hatte das nicht — über Overrides ergänzen
  };
}

/** Hilfs-Re-Export für UI/Filter-Code, die ohne Adapter direkt einen einheitlichen Zugriff wollen. */
export type V25Referenz = Referenz & ReferenzFilterV25;
export type V25Produkt = Produkt & ProduktFilterV25;

export function alsV25Referenz(r: Referenz): V25Referenz {
  return { ...r, ...mapReferenzV24toV25(r) };
}
export function alsV25Produkt(p: Produkt): V25Produkt {
  return { ...p, ...mapProduktV24toV25(p) };
}

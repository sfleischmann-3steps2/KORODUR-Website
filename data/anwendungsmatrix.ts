// Anwendungsmatrix — Web-Projektion des Messeposters "Poster 3:1".
// Quelle der Wahrheit: docs/mockups/anwendungsmatrix-poster-mockups.html (Poster 3:1).
// 6 kuratierte Produkte als Spalten, Tech-Werte + Vorteil-Zeile + Anwendungs-Zeilen (✓✓ / ✓ / leer).
// Einziges Web-Plus gegenüber dem Poster: "Mehr Infos"-Link je Produkt.

export type Mark = "best" | "yes" | "none"; // ✓✓ Kernanwendung · ✓ geeignet · – leer
export type SpeedTier = "ultra" | "veryFast" | "fast" | "day" | "normal";

// Übersetzbarer Wert: { key, de }; sprachneutraler Wert (Zahlen/Normbezeichnung): string.
export type Cell = string | { key: string; de: string };

export type ProductLink =
  | { kind: "tds"; productId: string } // echtes Produkt → TDS-PDF aus produkte.ts
  | { kind: "website"; url: string }; // konsolidierte Spalte → Website-Seite ("Mehr Infos")

export interface MatrixProduct {
  id: string;
  name: string; // Spaltenkopf (Markenname, sprachneutral)
  klassifizierung: Cell;
  schichtdicke: Cell;
  belastbarNach: Cell;
  speed: SpeedTier;
  vorteil: { key: string; de: string };
  link: ProductLink;
}

export interface UsecaseRow {
  key: string;
  de: string;
  marks: Mark[]; // Reihenfolge = anwendungMatrixProducts
}

// Interne App-Route (lang-neutral, wird beim Rendern um /{lang} ergänzt).
export const RAPID_SET_URL = "/bereiche/rapid-set/";

export const anwendungMatrixProducts: MatrixProduct[] = [
  {
    id: "neodur-he-60-rapid",
    name: "HE 60 rapid",
    klassifizierung: "CT-C60-F8-A6",
    schichtdicke: { key: "cell_ab10mm", de: "ab 10 mm" },
    belastbarNach: "24 h",
    speed: "day",
    vorteil: { key: "vorteil_schnelligkeit", de: "Schnelligkeit" },
    link: { kind: "tds", productId: "neodur-he-60-rapid" },
  },
  {
    id: "neodur-he-65-plus",
    name: "HE 65 Plus",
    klassifizierung: "CT-C70-F9-A6",
    schichtdicke: "15-30 mm",
    belastbarNach: { key: "cell_7tage", de: "7 Tage" },
    speed: "normal",
    vorteil: { key: "vorteil_aussen", de: "Außenbereich" },
    link: { kind: "tds", productId: "neodur-he-65-plus" },
  },
  {
    id: "neodur-level",
    name: "NEODUR Level",
    klassifizierung: "CT-C40-F10",
    schichtdicke: "5-10 mm",
    belastbarNach: "24 h",
    speed: "day",
    vorteil: { key: "vorteil_ebenheit", de: "Ebenheit" },
    link: { kind: "tds", productId: "neodur-level" },
  },
  {
    id: "rapid-set",
    name: "Rapid Set",
    klassifizierung: "C35/45 – C55/67",
    schichtdicke: "„0“-600 mm",
    belastbarNach: "1 h",
    speed: "veryFast",
    vorteil: { key: "vorteil_multifunktional", de: "Multifunktionalität" },
    link: { kind: "website", url: RAPID_SET_URL },
  },
  {
    id: "korocrete",
    name: "KOROCRETE Schnellbeton",
    klassifizierung: "C35/45-C50/60",
    schichtdicke: { key: "cell_projektabh", de: "projektabh." },
    belastbarNach: "8 h",
    speed: "fast",
    vorteil: { key: "vorteil_mischtechnik", de: "Mischtechnik" },
    link: { kind: "tds", productId: "korocrete" },
  },
  {
    id: "asphalt-repair-mix",
    name: "ARM",
    klassifizierung: "n. a.",
    schichtdicke: "30-600 mm",
    belastbarNach: "30 min",
    speed: "ultra",
    vorteil: { key: "vorteil_asphalt", de: "Asphalt-Alternative" },
    link: { kind: "tds", productId: "asphalt-repair-mix" },
  },
];

export const anwendungUsecases: UsecaseRow[] = [
  {
    key: "usecase_hoechstbelastbar",
    de: "Höchstbelastbare Flächen",
    marks: ["best", "best", "none", "best", "yes", "none"],
  },
  {
    key: "usecase_logistik",
    de: "Logistikflächen u. Lagerhallen",
    marks: ["best", "best", "best", "best", "yes", "none"],
  },
  {
    key: "usecase_werkstatt",
    de: "Montage- und Werkstattflächen",
    marks: ["best", "best", "yes", "best", "yes", "none"],
  },
  {
    key: "usecase_fachmarkt",
    de: "Fachmärkte u. Fachzentren",
    marks: ["best", "best", "best", "none", "none", "none"],
  },
  {
    key: "usecase_verkehr",
    de: "Verkehrsflächen u. Infrastruktur",
    marks: ["none", "best", "none", "best", "best", "best"],
  },
  {
    key: "usecase_parken",
    de: "Parkflächen u. Parkhäuser",
    marks: ["best", "best", "yes", "best", "yes", "best"],
  },
];

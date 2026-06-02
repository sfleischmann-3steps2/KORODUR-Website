export type AnwendungId =
  | "industrie"
  | "parken"
  | "verkehr"
  | "whg"
  | "sicht"
  | "reparatur";

export type AnwendungStatus = "core" | "secondary" | "none";

export interface AnwendungColumn {
  id: AnwendungId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface AnwendungMatrixProduct {
  id: string;
  name: string;
  family: string;
  role: string;
  applications: Record<AnwendungId, AnwendungStatus>;
}

export const anwendungColumns: AnwendungColumn[] = [
  {
    id: "industrie",
    label: "Industrie/Halle",
    shortLabel: "Industrie",
    description: "Hallen, Produktionsflächen, Lager, Werkstätten, Hochregallager, Staplerverkehr.",
  },
  {
    id: "parken",
    label: "Parken/Deck",
    shortLabel: "Parken",
    description: "Parkhäuser, Tiefgaragen, Parkflächen, PKW-Verkehr, Tausalz- und Reifenabrieb.",
  },
  {
    id: "verkehr",
    label: "Verkehr/Infra",
    shortLabel: "Verkehr",
    description: "Straßen, Brücken, Fahrbahnen, Flugbetriebsflächen und schnelle Verkehrsfreigabe.",
  },
  {
    id: "whg",
    label: "WHG/Chemie/Nass",
    shortLabel: "WHG/Chemie",
    description: "Waschplätze, Auffangbehälter, Nassbereiche, chemische Angriffe oder wassergefährdende Stoffe.",
  },
  {
    id: "sicht",
    label: "Sicht/Design",
    shortLabel: "Design",
    description: "Dekorative, repräsentative oder geschliffene Nutzschichten.",
  },
  {
    id: "reparatur",
    label: "Reparatur/Betonersatz",
    shortLabel: "Reparatur",
    description: "Punktuelle Reparaturen, Betonersatz, Asphaltreparatur, Verguss- oder Ausgleichsanwendungen.",
  },
];

export const anwendungMatrixProducts: AnwendungMatrixProduct[] = [
  {
    id: "neodur-he-40",
    name: "NEODUR HE 40",
    family: "Hartstoffestrich",
    role: "Klassischer Industrieboden",
    applications: {
      industrie: "core",
      parken: "secondary",
      verkehr: "none",
      whg: "none",
      sicht: "none",
      reparatur: "none",
    },
  },
  {
    id: "neodur-he-60-rapid",
    name: "NEODUR HE 60 rapid",
    family: "Hartstoffestrich schnell",
    role: "Schnell nutzbarer Industrieboden",
    applications: {
      industrie: "core",
      parken: "secondary",
      verkehr: "none",
      whg: "none",
      sicht: "none",
      reparatur: "none",
    },
  },
  {
    id: "neodur-he-65",
    name: "NEODUR HE 65",
    family: "Hartstoffestrich",
    role: "Hochbelastbarer Industrieboden",
    applications: {
      industrie: "core",
      parken: "secondary",
      verkehr: "none",
      whg: "none",
      sicht: "none",
      reparatur: "none",
    },
  },
  {
    id: "neodur-he-65-plus",
    name: "NEODUR HE 65 Plus",
    family: "Hartstoffestrich WHG",
    role: "WHG- und Parkdeck-Flächen",
    applications: {
      industrie: "core",
      parken: "core",
      verkehr: "secondary",
      whg: "core",
      sicht: "none",
      reparatur: "none",
    },
  },
  {
    id: "neodur-level",
    name: "NEODUR Level",
    family: "Dünnestrich",
    role: "Selbstverlaufende Nutzschicht",
    applications: {
      industrie: "core",
      parken: "secondary",
      verkehr: "none",
      whg: "none",
      sicht: "secondary",
      reparatur: "none",
    },
  },
  {
    id: "tru-self-leveling",
    name: "TRU Self-Leveling",
    family: "Sichtestrich",
    role: "Dekorativer Designboden",
    applications: {
      industrie: "none",
      parken: "none",
      verkehr: "none",
      whg: "none",
      sicht: "core",
      reparatur: "none",
    },
  },
  {
    id: "korocrete",
    name: "KOROCRETE Schnellbeton",
    family: "Beton-System",
    role: "Schnell nutzbarer Betonboden",
    applications: {
      industrie: "core",
      parken: "secondary",
      verkehr: "secondary",
      whg: "none",
      sicht: "none",
      reparatur: "secondary",
    },
  },
  {
    id: "rapid-set-cement-all",
    name: "CEMENT ALL",
    family: "Schnellreparaturmörtel",
    role: "Universelle Schnellreparatur",
    applications: {
      industrie: "none",
      parken: "none",
      verkehr: "secondary",
      whg: "secondary",
      sicht: "none",
      reparatur: "core",
    },
  },
  {
    id: "rapid-set-mortar-mix",
    name: "MORTAR MIX",
    family: "Schnellreparaturmörtel",
    role: "Reparatur in größerer Schichtdicke",
    applications: {
      industrie: "secondary",
      parken: "none",
      verkehr: "secondary",
      whg: "secondary",
      sicht: "none",
      reparatur: "core",
    },
  },
  {
    id: "dot-europe-concrete-mix",
    name: "DOT Europe CONCRETE MIX",
    family: "Reparaturbeton",
    role: "Verkehrswege und Betoninstandsetzung",
    applications: {
      industrie: "secondary",
      parken: "secondary",
      verkehr: "core",
      whg: "secondary",
      sicht: "none",
      reparatur: "core",
    },
  },
  {
    id: "asphalt-repair-mix",
    name: "ASPHALT REPAIR MIX",
    family: "Asphalt-Reparatur",
    role: "Schlaglöcher und Asphaltflächen",
    applications: {
      industrie: "none",
      parken: "secondary",
      verkehr: "core",
      whg: "none",
      sicht: "none",
      reparatur: "secondary",
    },
  },
  {
    id: "rapid-set-schnellbeton",
    name: "System Rapid Set Concrete",
    family: "Beton-System",
    role: "Schnelle Verkehrsfreigabe",
    applications: {
      industrie: "secondary",
      parken: "secondary",
      verkehr: "core",
      whg: "none",
      sicht: "none",
      reparatur: "secondary",
    },
  },
];

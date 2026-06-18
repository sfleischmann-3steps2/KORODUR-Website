// Normen-Glossar (#97). Quelle: Excel "Normen produkte.xlsx" (Source of Truth),
// Glossar-Block, extrahiert + verifiziert im Spec docs/specs/2026-06-14-produkt-
// klassifizierung-sot.md. Kurzbeschreibungen wörtlich aus dem SoT (Tippfehler
// korrigiert, ohne Em-Dashes für KORODUR-Texte). Erfindet KEINE Inhalte.
// 2026-06-18: DIN 18560 (Reihe), DVGW W 270, ASTM C928, TL BEB-StB, RStO 12
// ergänzt aus extern verifizierter Norm-Recherche (Dynamic Workflow + Fachartikel-
// Faktencheck docs/reviews/2026-06-15, mit offiziellen Quellen). Siehe
// docs/reference/technik-blocker-konsolidiert.md (Teil B).

export const NORMEN_GLOSSAR: Record<string, string> = {
  "DIN 18560-1": "Grenzwerte für Belegreife und Regelung zur Überprüfung (Schwindklasse).",
  "DIN 18560-2": "Estriche und Heizestriche auf Dämmschichten.",
  "DIN 18560-3": "Verbundestriche.",
  "DIN 18560-4": "Estriche auf Trennschicht.",
  "DIN 18560-7": "Technische Anforderungen, Ausführung und Prüfung für hochbeanspruchbare Estriche (Industrieestriche).",
  "DIN 1100": "Anforderungen und Prüfverfahren für Hartstoffe in zementgebundenen Hartstoffestrichen und Einstreuungen.",
  "DIN 1100 A": "Anforderungen und Prüfverfahren für Hartstoffe in zementgebundenen Hartstoffestrichen und Einstreuungen.",
  "DIN CEN/TS 12390-9": "Prüfung des Frost- und Frost-Tausalz-Widerstands von Festbeton.",
  "DIN EN 13813": "Estrichmörtel, Estrichmassen und Estriche: Eigenschaften und Anforderungen (Materialeigenschaften und Klassifizierung).",
  "DIN EN 13670": "Nachbehandlung in Verbindung mit DIN 1045-3.",
  "DIN 1045-3": "Nachbehandlung in Verbindung mit DIN EN 13670: schützt frischen Beton vor zu schneller Austrocknung, Frost und extremen Temperaturen.",
  "DIN EN 13892-2": "Bestimmung der Biegezug- und Druckfestigkeit von Estrichmörtel und Estrichmassen.",
  "DIN EN 13892-3": "Bestimmung des Verschleißwiderstands nach Böhme für Estrichmörtel und Estrichmassen.",
  "DIN EN 13892-4": "Bestimmung des Verschleißwiderstands nach BCA für Estrichmörtel und Estrichmassen.",
  "DIN EN 13892-8": "Prüfverfahren für Estrichmörtel und Estrichmassen, Teil 8: Bestimmung der Haftzugfestigkeit.",
  "DIN EN 206-1 + DIN 1045-2": "Gemeinsames Regelwerk für Festlegung, Eigenschaften, Herstellung und Konformität von Beton.",
  "DIN EN 206-1": "Gemeinsames Regelwerk für Festlegung, Eigenschaften, Herstellung und Konformität von Beton.",
  "DIN EN 206": "Gemeinsames Regelwerk für Festlegung, Eigenschaften, Herstellung und Konformität von Beton.",
  "DIN 1045-2": "Gemeinsames Regelwerk für Festlegung, Eigenschaften, Herstellung und Konformität von Beton (mit DIN EN 206-1).",
  "DIN 18202": "Maßtoleranzen für Bauwerke und Bauteile.",
  "DAfStb-Richtlinie": "Betonbau beim Umgang mit wassergefährdenden Stoffen. Herstellung und Verwendung von zementgebundenem Vergussbeton und Vergussmörtel.",
  "DAfStB-Richtlinie": "Betonbau beim Umgang mit wassergefährdenden Stoffen. Herstellung und Verwendung von zementgebundenem Vergussbeton und Vergussmörtel.",
  "DIN EN 16516 + AgBB": "Referenzprüfnorm zur Bestimmung der Emission gefährlicher Stoffe. Der Ausschuss zur gesundheitlichen Bewertung von Bauprodukten (AgBB) nutzt sie für die Bewertung der Innenraumluft.",
  "DIN EN 12706": "Prüfverfahren für hydraulisch erhärtende Bodenspachtelmassen, Bestimmung des Fließverhaltens (Ausbreitmaß).",
  "DIN 18365": "Untergrundprüfung und -vorbereitung.",
  "DIN EN 196-3": "Prüfverfahren für Zement zur Bestimmung der Erstarrungszeiten und der Raumbeständigkeit.",
  "DIN EN 1015-11": "Prüfverfahren für Mörtel für Mauerwerk, Teil 11: Bestimmung der Biegezug- und Druckfestigkeit von Festmörtel.",
  "DIN EN 13501": "Brandschutznorm für das Brandverhalten von Baustoffen.",
  "DIN EN 13501-1": "Brandschutznorm für das Brandverhalten von Baustoffen.",
  "DIN EN 1542": "Prüfverfahren zur Messung der Haftfestigkeit im Abreißversuch.",
  "DIN EN 13412": "Prüfverfahren zur Bestimmung des Elastizitätsmoduls im Druckversuch (statischer E-Modul).",
  "DIN EN 1015-17": "Prüfverfahren zur Bestimmung des Gehalts an wasserlöslichem Chlorid in Frischmörtel.",
  "DIN EN 1504-3": "Produkte und Systeme für Schutz und Instandsetzung von Betontragwerken (Druckfestigkeit, Haftfestigkeit, Schwindverhalten, Chloridgehalt).",
  "EN 1504-3": "Produkte und Systeme für Schutz und Instandsetzung von Betontragwerken (Druckfestigkeit, Haftfestigkeit, Schwindverhalten, Chloridgehalt).",
  "DIN 18551 + DIN EN 14487": "Norm für Spritzbeton und Spritzmörtel. Nationale Anwendungsregeln zur europäischen Normenreihe DIN EN 14487 (Anforderungen, Herstellung, Konformität, Bemessung).",
  "DIN 18551": "Norm für Spritzbeton und Spritzmörtel. Nationale Anwendungsregeln zur europäischen Normenreihe DIN EN 14487 (Anforderungen, Herstellung, Konformität, Bemessung).",
  "DIN EN 14487": "Europäische Normenreihe für Spritzbeton (Anforderungen, Herstellung, Konformität, Bemessung), national geregelt über DIN 18551.",
  "DVGW Arbeitsblatt W 300": "Regelwerk für Trinkwasserbehälter: Planung, Bau, Betrieb, Instandsetzung sowie Werkstoffe und Beschichtungssysteme.",
  "DVGW W 300": "Regelwerk für Trinkwasserbehälter: Planung, Bau, Betrieb, Instandsetzung sowie Werkstoffe und Beschichtungssysteme.",
  "DVGW Arbeitsblatt W 347": "Hygienische Anforderungen und Prüfverfahren für zementgebundene Werkstoffe im direkten Kontakt mit Trinkwasser.",
  "DVGW W 347": "Hygienische Anforderungen und Prüfverfahren für zementgebundene Werkstoffe im direkten Kontakt mit Trinkwasser.",
  "DIN EN 13395-2": "Prüfverfahren zur Bestimmung des Fließverhaltens von Vergussmörtel, Feinmörtel oder Mörtel.",
  "DIN EN 12350-5": "Bestimmung des Ausbreitmaßes von Frischbeton im Bauwesen.",
  "DIN EN 12620": "Eigenschaften von Gesteinskörnungen und Füllern für die Herstellung von Beton (Alkaliempfindlichkeitsklasse E1 aus unbedenklichen Vorkommen).",
  "DIN 18560": "Estriche im Bauwesen (Normenreihe): Teil 3 Verbundestriche, Teil 4 Estriche auf Trennschicht, Teil 7 hochbeanspruchbare Industrieestriche (Hartstoffestriche).",
  "DVGW W 270": "Prüfverfahren zur Bewertung der Vermehrung von Mikroorganismen auf Werkstoffen im Trinkwasserbereich.",
  "DVGW Arbeitsblatt W 270": "Prüfverfahren zur Bewertung der Vermehrung von Mikroorganismen auf Werkstoffen im Trinkwasserbereich.",
  "ASTM C928": "US-amerikanische ASTM-Norm für werkseitig vorgemischte, schnell erhärtende zementgebundene Reparaturmaterialien. Klassen R1/R2/R3 nach Frühfestigkeit. Keine deutsche oder europäische Norm.",
  "TL BEB-StB": "Technische Lieferbedingungen für Baustoffe und Baustoffgemische zur baulichen Erhaltung von Betonverkehrsflächen (FGSV 895). Reine Material-Lieferbedingung, definiert keine Verkehrs- oder Belastungsklassen.",
  "RStO 12": "Richtlinien für die Standardisierung des Oberbaus von Verkehrsflächen (FGSV 499). Definiert die Belastungsklassen Bk100 bis Bk0.3.",
  "RStO": "Richtlinien für die Standardisierung des Oberbaus von Verkehrsflächen (FGSV 499). Definiert die Belastungsklassen Bk100 bis Bk0.3.",
};

/**
 * Liefert die Kurzbeschreibung einer Norm, falls im SoT-Glossar vorhanden.
 * Normalisiert gängige Schreibvarianten: trailing "(...)"-Zusätze und
 * " Zeile N"-Suffixe werden für das Matching entfernt.
 */
export function getNormBeschreibung(norm: string): string | undefined {
  const key = norm.trim();
  if (NORMEN_GLOSSAR[key]) return NORMEN_GLOSSAR[key];

  const ohneKlammer = key.replace(/\s*\([^)]*\)\s*$/, "").trim();
  if (NORMEN_GLOSSAR[ohneKlammer]) return NORMEN_GLOSSAR[ohneKlammer];

  const ohneZeile = ohneKlammer.replace(/\s+Zeile\s+\d+.*$/i, "").trim();
  if (NORMEN_GLOSSAR[ohneZeile]) return NORMEN_GLOSSAR[ohneZeile];

  return undefined;
}

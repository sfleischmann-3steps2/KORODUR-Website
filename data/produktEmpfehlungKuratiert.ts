// === Kuratierte Produkt-Empfehlung (A2) ===
// Entscheidung Steffi 2026-06-09: Die Produktempfehlung wird perspektivisch NICHT
// mehr automatisch über Belastungs-Tags berechnet (A1), sondern strategisch
// kuratiert. Pro Branche × Zeit-Szenario legt die Technik/Marketing fest, welches
// Highlight-Produkt empfohlen wird.
//
// STATUS: DRAFT-Gerüst. Die Werte unten sind mit der aktuellen A1-Logik
// vorbefüllt (verhalten-neutral als Ausgangspunkt). Frank trägt die finalen
// Highlight-Produkte ein (Doc: Loesungsfinder_Logik_Datenmodell_V2_Frank_2026-06-09).
//
// AKTIVIERUNG: Erst wenn die Tabelle freigegeben ist, in data/loesungsfinderV25.ts
// `EMPFEHLUNGS_MODUS = "kuratiert"` setzen. Bis dahin bleibt A1 live.
//
// Modell (Steffi): Das Produkt hängt an Branche, Innen/Außen (steckt in der
// Branche), Fläche (punktuell vs. flächig) und Zeit (Wiederbelastbarkeit als
// harter Filter). mittel und groß teilen dieselbe „flächig"-Empfehlung; nur
// punktuell ist eigenständig (Reparaturmörtel).

import type { EinsatzbereichV25, Flaechenkategorie, Zeitfenster } from "./types";

/** Szenario-Achse der kuratierten Tabelle. */
export type EmpfehlungsSzenario = "punktuell" | "sehr-kurz" | "kurz" | "planbar";

/** Leitet das Szenario aus Fläche + Zeitfenster ab (punktuell ignoriert Zeit). */
export function szenarioVon(
  flaeche: Flaechenkategorie,
  zeitfenster: Zeitfenster | null,
): EmpfehlungsSzenario {
  if (flaeche === "punktuell") return "punktuell";
  return (zeitfenster ?? "planbar") as EmpfehlungsSzenario;
}

/**
 * Produkt-ID je Branche × Szenario.
 * DRAFT — vorbefüllt aus der aktuellen A1-Logik. Frank überschreibt strategisch.
 */
export const KURATIERTE_EMPFEHLUNG: Record<
  EinsatzbereichV25,
  Record<EmpfehlungsSzenario, string>
> = {
  "innen-industrie-halle": {
    punktuell: "rapid-set-mortar-mix-dur",
    "sehr-kurz": "neodur-he-60-rapid",
    kurz: "neodur-he-60-rapid",
    planbar: "neodur-he-60-rapid",
  },
  "innen-nass-hygiene-chemie": {
    punktuell: "rapid-set-cement-all",
    "sehr-kurz": "rapid-set-cement-all",
    kurz: "rapid-set-cement-all",
    planbar: "neodur-he-65-plus",
  },
  "innen-sicht-design": {
    punktuell: "rapid-set-mortar-mix-dur",
    "sehr-kurz": "tru-self-leveling",
    kurz: "tru-self-leveling",
    planbar: "tru-self-leveling",
  },
  "aussen-verkehr-infrastruktur": {
    punktuell: "asphalt-repair-mix",
    "sehr-kurz": "asphalt-repair-mix",
    kurz: "asphalt-repair-mix",
    planbar: "neodur-he-60-rapid",
  },
  "aussen-parkdeck": {
    punktuell: "rapid-set-mortar-mix-dur",
    "sehr-kurz": "neodur-he-60-rapid",
    kurz: "neodur-he-60-rapid",
    planbar: "neodur-he-60-rapid",
  },
  "aussen-umwelt-whg": {
    punktuell: "asphalt-repair-mix",
    "sehr-kurz": "asphalt-repair-mix",
    kurz: "asphalt-repair-mix",
    planbar: "neodur-he-65-plus",
  },
};

/** Kuratierte Produkt-ID für einen State, oder null wenn nicht hinterlegt. */
export function kuratierteEmpfehlungId(
  einsatzbereich: EinsatzbereichV25,
  flaeche: Flaechenkategorie,
  zeitfenster: Zeitfenster | null,
): string | null {
  return KURATIERTE_EMPFEHLUNG[einsatzbereich]?.[szenarioVon(flaeche, zeitfenster)] ?? null;
}

// === Kuratierte Produkt-Empfehlung (A2) ===
// Entscheidung Steffi 2026-06-09: Die Produktempfehlung wird perspektivisch NICHT
// mehr automatisch über Belastungs-Tags berechnet (A1), sondern strategisch
// kuratiert. Pro Branche × Zeit-Szenario legt die Technik/Marketing fest, welche
// Produkte empfohlen werden.
//
// STATUS: Fachlich befüllt nach Franks Empfehlung (E-Mail 2026-06-10). Pro Pfad
// zwei Produkte: produkt1 = Highlight, produkt2 = Alternative (visuell über Tags
// unterschieden, Tag-Set wird noch definiert). Offene Punkte sind unten als
// OFFEN-Kommentare markiert.
//
// AKTIVIERUNG: Erst nach finalem Sign-off in data/loesungsfinderV25.ts
// `EMPFEHLUNGS_MODUS = "kuratiert"` setzen. Bis dahin bleibt A1 live.
//
// Modell (Steffi): Das Produkt hängt an Branche, Innen/Außen (steckt in der
// Branche), Fläche (punktuell vs. flächig) und Zeit (Wiederbelastbarkeit als
// harter Filter). mittel und groß teilen dieselbe „flächig"-Empfehlung; nur
// punktuell ist eigenständig.

import type { EinsatzbereichV25, Flaechenkategorie, Zeitfenster } from "./types";

/** Szenario-Achse der kuratierten Tabelle. */
export type EmpfehlungsSzenario = "punktuell" | "sehr-kurz" | "kurz" | "planbar";

/** Ein kuratierter Empfehlungs-Eintrag: Highlight + optionale Alternative. */
export interface KuratierterEintrag {
  /** Produkt-ID des Highlight-Produkts (immer gesetzt). */
  produkt1: string;
  /** Produkt-ID der Alternative. Fehlt bewusst, wo Frank "keine Alternative"
   *  angegeben hat (1B, 4A, 4D, 5B) oder das Produkt noch nicht in der App
   *  existiert (TRU PC, s. OFFEN unten). */
  produkt2?: string;
  /** Anzeigehinweis zur Alternative, z. B. Systemaufbau mit Oberflächenfinish.
   *  DE-Basis; Übersetzung läuft später über die i18n-Overrides. */
  produkt2Hinweis?: string;
}

/** Leitet das Szenario aus Fläche + Zeitfenster ab (punktuell ignoriert Zeit). */
export function szenarioVon(
  flaeche: Flaechenkategorie,
  zeitfenster: Zeitfenster | null,
): EmpfehlungsSzenario {
  if (flaeche === "punktuell") return "punktuell";
  return (zeitfenster ?? "planbar") as EmpfehlungsSzenario;
}

/**
 * Empfehlung je Branche × Szenario. Quelle: Frank, 2026-06-10.
 *
 * Franks Unterscheidungs-Stichworte (Basis für die spätere Tag-Definition):
 *  - Körnung/Schichtdicke (MORTAR MIX DUR vs. DOT, CEMENT ALL vs. MORTAR MIX)
 *  - Abbindegeschwindigkeit (HE 60 rapid schneller als HE 65 Plus,
 *    DOT/KOROMINERAL-System „schnellerhärtend")
 *
 * OFFEN (werden per Rückfrage geklärt, blockieren die Aktivierung):
 *  1. TRU PC (eigenständige Marke TRU, nicht Rapid Set) ist noch nicht im
 *     App-Sortiment — Aufnahme klärt Steffi. Bis dahin haben 3B–3D keine
 *     Alternative hinterlegt.
 *  2. aussen-parkdeck/punktuell mit NEODUR HE 65 Plus (einziger Estrich bei
 *     punktuell) wird mit Frank noch gechallengt.
 *  3. Annahme: „MORTAR MIX" in Nass/Hygiene = Rapid Set MORTAR MIX (ohne DUR),
 *     weil Frank in 1A/3A explizit „MORTAR MIX DUR" schreibt — bestätigen lassen.
 */
export const KURATIERTE_EMPFEHLUNG: Record<
  EinsatzbereichV25,
  Record<EmpfehlungsSzenario, KuratierterEintrag>
> = {
  "innen-industrie-halle": {
    punktuell: {
      produkt1: "rapid-set-mortar-mix-dur",
      produkt2: "dot-europe-concrete-mix", // Unterschied: Körnung/Schichtdicke
    },
    "sehr-kurz": { produkt1: "neodur-he-60-rapid" }, // keine Alternative (Frank)
    kurz: {
      produkt1: "neodur-he-60-rapid",
      produkt2: "neodur-he-65-plus", // bindet langsamer ab
    },
    planbar: {
      produkt1: "neodur-he-65-plus",
      produkt2: "neodur-he-60-rapid", // bindet schneller ab
    },
  },
  "innen-nass-hygiene-chemie": {
    punktuell: {
      produkt1: "rapid-set-cement-all",
      produkt2: "rapid-set-mortar-mix", // Körnung/Schichtdicke; s. OFFEN 3
    },
    "sehr-kurz": {
      produkt1: "rapid-set-cement-all",
      produkt2: "rapid-set-mortar-mix", // Körnung/Schichtdicke; s. OFFEN 3
    },
    kurz: {
      // Bewusste fachliche Neuentscheidung Frank 2026-06-10: DOT hier trotz
      // fehlendem chemie-Tag — hängt von der Oberflächenbehandlung ab.
      produkt1: "neodur-he-65-plus",
      produkt2: "dot-europe-concrete-mix", // schnellerhärtend
    },
    planbar: {
      produkt1: "neodur-he-65-plus",
      produkt2: "neodur-he-60-rapid", // schnellerhärtend
      produkt2Hinweis: "Im System mit KOROMINERAL LI+ (Oberflächenfinish)",
    },
  },
  "innen-sicht-design": {
    punktuell: {
      produkt1: "rapid-set-mortar-mix-dur",
      produkt2: "rapid-set-cement-all",
    },
    // 3B–3D: Alternative laut Frank = TRU PC, noch nicht im Sortiment (OFFEN 1).
    "sehr-kurz": { produkt1: "tru-self-leveling" },
    kurz: { produkt1: "tru-self-leveling" },
    planbar: { produkt1: "tru-self-leveling" },
  },
  "aussen-verkehr-infrastruktur": {
    punktuell: { produkt1: "asphalt-repair-mix" }, // keine Alternative (Frank)
    "sehr-kurz": {
      produkt1: "asphalt-repair-mix",
      produkt2: "dot-europe-concrete-mix",
    },
    kurz: {
      produkt1: "dot-europe-concrete-mix",
      produkt2: "neodur-he-65-plus",
    },
    planbar: { produkt1: "neodur-he-65-plus" }, // keine Alternative (Frank)
  },
  "aussen-parkdeck": {
    punktuell: {
      // OFFEN 2: einziger Estrich bei punktuell — wird mit Frank gechallengt.
      produkt1: "neodur-he-65-plus",
      produkt2: "dot-europe-concrete-mix",
    },
    "sehr-kurz": { produkt1: "dot-europe-concrete-mix" }, // keine Alternative
    kurz: {
      produkt1: "neodur-he-65-plus",
      produkt2: "dot-europe-concrete-mix",
    },
    planbar: {
      produkt1: "neodur-he-65-plus",
      produkt2: "dot-europe-concrete-mix",
    },
  },
  "aussen-umwelt-whg": {
    punktuell: {
      produkt1: "asphalt-repair-mix",
      produkt2: "dot-europe-concrete-mix",
    },
    "sehr-kurz": {
      produkt1: "dot-europe-concrete-mix",
      produkt2: "asphalt-repair-mix",
    },
    kurz: {
      produkt1: "neodur-he-65-plus",
      produkt2: "dot-europe-concrete-mix",
    },
    planbar: {
      produkt1: "neodur-he-65-plus",
      produkt2: "dot-europe-concrete-mix",
    },
  },
};

/** Kuratierter Eintrag für einen State, oder null wenn nicht hinterlegt. */
export function kuratierteEmpfehlung(
  einsatzbereich: EinsatzbereichV25,
  flaeche: Flaechenkategorie,
  zeitfenster: Zeitfenster | null,
): KuratierterEintrag | null {
  return KURATIERTE_EMPFEHLUNG[einsatzbereich]?.[szenarioVon(flaeche, zeitfenster)] ?? null;
}

/** Kuratierte Highlight-Produkt-ID (Kompatibilitäts-Helper). */
export function kuratierteEmpfehlungId(
  einsatzbereich: EinsatzbereichV25,
  flaeche: Flaechenkategorie,
  zeitfenster: Zeitfenster | null,
): string | null {
  return kuratierteEmpfehlung(einsatzbereich, flaeche, zeitfenster)?.produkt1 ?? null;
}

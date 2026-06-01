// === Match-Algorithmus V2.5 ===
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Pure-Functions, kein Side-Effect, kein State. Bekommt einen
// LoesungsfinderState rein und liefert ein Ergebnis (Top-Produkt + passende
// Referenzen).
//
// Datenbasis (seit V2.5-Migration, kein Adapter mehr):
//  - Produkte: `produktFilterV25(p)` leitet die Filter-Felder aus den
//    kuratierten Stammdaten ab (produkte.ts).
//  - Referenzen: `REFERENZ_FILTER_V25[slug]` (generiert von
//    scripts/migrate-refs-v25.ts → data/referenzenV25.ts).

import type {
  LoesungsfinderState,
  ProduktFilterV25,
  Referenz,
  ReferenzFilterV25,
} from "./types";
import { EINSATZBEREICH_TAGS } from "./einsatzbereichMapping";
import { produkte, produktFilterV25, type Produkt } from "./produkte";
import { referenzen } from "./referenzen";
import { REFERENZ_FILTER_V25 } from "./referenzenV25";

export type V25Produkt = Produkt & ProduktFilterV25;
export type V25Referenz = Referenz & ReferenzFilterV25;

// Fallback, falls eine Referenz (noch) keinen V25-Eintrag hat. Die
// Vollständigkeit wird von scripts/validate-referenzen.ts erzwungen.
const FALLBACK_REF_FILTER: ReferenzFilterV25 = {
  flaecheKategorie: "mittel",
  innenAussen: "innen",
  einsatzbereich: "innen-industrie-produktion",
  zeitfenster: "planbar",
  schadenstypen: [],
};

export interface ErgebnisV25 {
  /** Beste Produkt-Empfehlung oder null wenn keine passt. */
  topProdukt: V25Produkt | null;
  /** Passende Referenzen, nach Aktualität sortiert. */
  refs: V25Referenz[];
  /** Gesamttreffer-Zähler (gleich refs.length, da Schaden-Pill-Filter entfernt). */
  refsGesamt: number;
}

/**
 * Hauptberechnung.
 *
 * Bei flaeche === "punktuell":
 *  - Zeitfenster wird komplett ignoriert (alle Reparaturmörtel ~1h belastbar)
 *  - Steffis Vorgabe 2026-06-01: "Bei kleinflächigen Sanierungen Zeitfenster
 *    ganz rauslassen" — kein interner Default mehr, kein Filter
 *
 * Bei mittel/gross:
 *  - state.zeitfenster muss gesetzt sein, sonst kein Ergebnis
 *  - Filter auf wiederbelastungInH und auf Ref-Zeitfenster
 */
export function berechneErgebnisV25(state: LoesungsfinderState): ErgebnisV25 {
  if (!state.flaeche || !state.innenAussen || !state.einsatzbereich) {
    return { topProdukt: null, refs: [], refsGesamt: 0 };
  }

  // Mittel/Gross brauchen ein Zeitfenster; Punktuell ist davon befreit.
  if (state.flaeche !== "punktuell" && !state.zeitfenster) {
    return { topProdukt: null, refs: [], refsGesamt: 0 };
  }

  const branchenTags = EINSATZBEREICH_TAGS[state.einsatzbereich];

  const maxWiederbelastungH =
    state.flaeche === "punktuell"
      ? Infinity
      : state.zeitfenster === "sehr-kurz"
      ? 24
      : state.zeitfenster === "kurz"
      ? 168
      : Infinity;

  // --- Produkte filtern + ranken ---
  const v25Produkte: V25Produkt[] = produkte.map((p) => ({ ...p, ...produktFilterV25(p) }));
  const kandidaten = v25Produkte
    .filter((p) => p.flaechenkategorienGeeignet.includes(state.flaeche!))
    .filter((p) => (state.innenAussen === "innen" ? p.innenGeeignet : p.aussenGeeignet))
    .filter((p) => p.wiederbelastungInH <= maxWiederbelastungH)
    .filter((p) =>
      // Begleitprodukte (Grundierung, Nachbehandlung) sind keine Top-Empfehlung im Hauptpfad.
      p.kategorie === "estrich" ||
      p.kategorie === "schnellzement" ||
      p.kategorie === "beschichtung",
    );

  // Ranking (Steffi-Entscheidung D1, 2026-06-01):
  //  1. Primär: Anzahl passender Branchen-Belastungs-Tags (höher = besser).
  //  2. Tiebreak abhängig vom Zeitdruck:
  //     - Zeitdruck (sehr-kurz/kurz): schnellere Wiederbelastung gewinnt.
  //     - planbar/punktuell (kein Zeitdruck): passendstes Produkt gewinnt — bei
  //       Flächen-Jobs Estrich vor Reparaturbeton, dann höhere Belastbarkeitsstufe.
  //       (Verhindert, dass ein schneller Reparaturbeton einen Industrieestrich
  //       schlägt, obwohl gar kein Zeitfenster gefordert ist.)
  const zeitDruck =
    state.flaeche !== "punktuell" &&
    (state.zeitfenster === "sehr-kurz" || state.zeitfenster === "kurz");
  const katRang = (k: V25Produkt["kategorie"]) =>
    k === "estrich" ? 0 : k === "beschichtung" ? 1 : 2;

  kandidaten.sort((a, b) => {
    const aMatch = a.belastungenAbgedeckt.filter((t) => branchenTags.includes(t)).length;
    const bMatch = b.belastungenAbgedeckt.filter((t) => branchenTags.includes(t)).length;
    if (aMatch !== bMatch) return bMatch - aMatch;

    if (zeitDruck) {
      if (a.wiederbelastungInH !== b.wiederbelastungInH) return a.wiederbelastungInH - b.wiederbelastungInH;
      return (b.belastbarkeitsStufe ?? 0) - (a.belastbarkeitsStufe ?? 0);
    }

    // Kein Zeitdruck: Bei Flächen-Jobs Estrich-Kategorie bevorzugen.
    if (state.flaeche !== "punktuell") {
      const katDelta = katRang(a.kategorie) - katRang(b.kategorie);
      if (katDelta !== 0) return katDelta;
    }
    const stufeDelta = (b.belastbarkeitsStufe ?? 0) - (a.belastbarkeitsStufe ?? 0);
    if (stufeDelta !== 0) return stufeDelta;
    return a.wiederbelastungInH - b.wiederbelastungInH;
  });

  const topProdukt = kandidaten[0] ?? null;

  // --- Referenzen filtern ---
  const v25Refs: V25Referenz[] = referenzen.map((r) => ({
    ...r,
    ...(REFERENZ_FILTER_V25[r.slug] ?? FALLBACK_REF_FILTER),
  }));
  let refsAlle = v25Refs
    .filter((r) => r.flaecheKategorie === state.flaeche)
    .filter((r) => r.innenAussen === state.innenAussen)
    .filter((r) => r.einsatzbereich === state.einsatzbereich);

  // Zeitfenster-Filter nur für mittel/gross: bei "sehr-kurz" nur passende Refs,
  // bei "kurz" auch sehr-kurz dabei, bei "planbar" alle. Punktuell: kein Filter.
  if (state.flaeche !== "punktuell") {
    if (state.zeitfenster === "sehr-kurz") {
      refsAlle = refsAlle.filter((r) => r.zeitfenster === "sehr-kurz");
    } else if (state.zeitfenster === "kurz") {
      refsAlle = refsAlle.filter(
        (r) => r.zeitfenster === "sehr-kurz" || r.zeitfenster === "kurz",
      );
    }
  }

  return { topProdukt, refs: refsAlle, refsGesamt: refsAlle.length };
}

/** Labels für die Auswahl-Chips oben auf der Ergebnisseite. */
export function labelFuerState(state: LoesungsfinderState): string[] {
  const out: string[] = [];
  if (state.flaeche === "punktuell") out.push("Punktuell");
  else if (state.flaeche === "mittel") out.push("Mittel");
  else if (state.flaeche === "gross") out.push("Großflächig");

  if (state.innenAussen === "innen") out.push("Innen");
  else if (state.innenAussen === "aussen") out.push("Außen");

  return out;
}

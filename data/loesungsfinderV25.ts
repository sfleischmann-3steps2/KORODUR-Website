// === Match-Algorithmus V2.5 ===
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Pure-Functions, kein Side-Effect, kein State. Bekommt einen
// LoesungsfinderState rein und liefert ein Ergebnis (Top-Produkt + passende
// Referenzen + Tags zum Eingrenzen).
//
// Die Bestandsdaten (produkte.ts, referenzen.ts) sind noch im V2.4-Schema.
// Über `alsV25Produkt` / `alsV25Referenz` werden sie on-the-fly auf V2.5
// gemappt — Heuristiken in loesungsfinderV25Adapter.ts. Sobald Stammdaten
// migriert sind, fällt der Adapter weg.

import type { LoesungsfinderState } from "./types";
import { EINSATZBEREICH_TAGS } from "./einsatzbereichMapping";
import { produkte } from "./produkte";
import { referenzen } from "./referenzen";
import {
  alsV25Produkt,
  alsV25Referenz,
  type V25Produkt,
  type V25Referenz,
} from "./loesungsfinderV25Adapter";

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
  const v25Produkte = produkte.map(alsV25Produkt);
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

  // Score = Anzahl matching Belastungs-Tags, plus kleiner Bonus für kürzere Wiederbelastung.
  kandidaten.sort((a, b) => {
    const aMatch = a.belastungenAbgedeckt.filter((t) => branchenTags.includes(t)).length;
    const bMatch = b.belastungenAbgedeckt.filter((t) => branchenTags.includes(t)).length;
    if (aMatch !== bMatch) return bMatch - aMatch;
    return a.wiederbelastungInH - b.wiederbelastungInH;
  });

  const topProdukt = kandidaten[0] ?? null;

  // --- Referenzen filtern ---
  const v25Refs = referenzen.map(alsV25Referenz);
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

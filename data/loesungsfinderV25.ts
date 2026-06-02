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
  einsatzbereich: "innen-industrie-halle",
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
  /** true, wenn die Referenzen über einen gelockerten Fallback gefunden wurden
   *  (nicht der strikte Fläche×Innen/Außen×Cluster-Treffer). UI zeigt dann
   *  dezent "Verwandte Projekte" statt "Passende Referenzen". */
  refsGelockert: boolean;
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
    return { topProdukt: null, refs: [], refsGesamt: 0, refsGelockert: false };
  }

  // Mittel/Gross brauchen ein Zeitfenster; Punktuell ist davon befreit.
  if (state.flaeche !== "punktuell" && !state.zeitfenster) {
    return { topProdukt: null, refs: [], refsGesamt: 0, refsGelockert: false };
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

  // --- Referenzen filtern: stufenweises Lockern (§6 Step-3-Spec) ---
  // Ziel: zu jeder Produktempfehlung steht mindestens eine Referenz. Bei schiefem
  // Referenz-Set (z. B. großflächiger Außen-Job, aber nur mittelflächige Refs im
  // Cluster) liefert der strikte UND-Filter sonst null. Wir lockern stufenweise.
  const v25Refs: V25Referenz[] = referenzen.map((r) => ({
    ...r,
    ...(REFERENZ_FILTER_V25[r.slug] ?? FALLBACK_REF_FILTER),
  }));

  // Zeitfenster-Filter nur für mittel/gross: "sehr-kurz" nur passende, "kurz"
  // auch sehr-kurz, "planbar" alle. Punktuell ist befreit.
  const passtZeitfenster = (r: V25Referenz): boolean => {
    if (state.flaeche === "punktuell") return true;
    if (state.zeitfenster === "sehr-kurz") return r.zeitfenster === "sehr-kurz";
    if (state.zeitfenster === "kurz") return r.zeitfenster === "sehr-kurz" || r.zeitfenster === "kurz";
    return true;
  };

  const imBereich = v25Refs.filter((r) => r.innenAussen === state.innenAussen);

  // Stufe 0 — strikt: Fläche × Innen/Außen × Cluster (+ Zeitfenster).
  let refs = imBereich
    .filter((r) => r.flaecheKategorie === state.flaeche)
    .filter((r) => r.einsatzbereich === state.einsatzbereich)
    .filter(passtZeitfenster);
  let gelockert = false;

  // Stufe 1 — Fläche fallen lassen (Cluster + Zeitfenster bleiben).
  if (refs.length === 0) {
    refs = imBereich
      .filter((r) => r.einsatzbereich === state.einsatzbereich)
      .filter(passtZeitfenster);
    gelockert = refs.length > 0;
  }

  // Stufe 2 — Cluster fallen lassen: Referenzen, die das empfohlene Produkt
  // verwenden (clusterunabhängig, innerhalb Innen/Außen).
  if (refs.length === 0 && topProdukt) {
    refs = imBereich.filter((r) => r.produkte.includes(topProdukt.name));
    gelockert = refs.length > 0;
  }

  return { topProdukt, refs, refsGesamt: refs.length, refsGelockert: gelockert };
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

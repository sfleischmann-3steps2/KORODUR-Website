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
import { kuratierteEmpfehlung } from "./produktEmpfehlungKuratiert";

// Produkt-Empfehlungsmodus (Steffi 2026-06-09):
//  - "tags"      = A1, automatische Tag-Schnittmenge (aktuell live).
//  - "kuratiert" = A2, strategische Tabelle (data/produktEmpfehlungKuratiert.ts).
// Umschalten auf "kuratiert" erst nach Frank-Sign-off der Tabelle. Die
// Referenz-Logik ist davon unabhängig und bleibt in beiden Modi gleich.
export const EMPFEHLUNGS_MODUS: "tags" | "kuratiert" = "tags";

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

/** Mindestanzahl Referenzen, die die Ergebnisseite immer zeigen soll. */
export const MIN_REFS = 3;

export interface ErgebnisV25 {
  /** Beste Produkt-Empfehlung oder null wenn keine passt. */
  topProdukt: V25Produkt | null;
  /** Kuratierte Alternative zum Top-Produkt (nur im Modus "kuratiert",
   *  null wo Frank bewusst keine Alternative vorgesehen hat). */
  alternativProdukt: V25Produkt | null;
  /** Anzeigehinweis zur Alternative (z. B. Systemaufbau), DE-Basis. */
  alternativHinweis: string | null;
  /** Anzuzeigende Referenzen: mindestens MIN_REFS, falls die Datenbasis es
   *  hergibt. Exakte Treffer stehen vorne, danach (bei Bedarf) gelockerte. */
  refs: V25Referenz[];
  /** refs.length (für den Header-Zähler). */
  refsGesamt: number;
  /** Anzahl strikt passender Referenzen (Fläche × Innen/Außen × Cluster ×
   *  Zeitfenster). < MIN_REFS heißt: wir haben aufgefüllt. */
  exaktTreffer: number;
  /** true, wenn über die strikten Treffer hinaus aufgefüllt wurde
   *  (exaktTreffer < refs.length). UI zeigt dann den Hinweis "kein exaktes
   *  Projekt wie Ihres dabei" und beschriftet die Sektion entsprechend. */
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
    return { topProdukt: null, alternativProdukt: null, alternativHinweis: null, refs: [], refsGesamt: 0, exaktTreffer: 0, refsGelockert: false };
  }

  // Mittel/Gross brauchen ein Zeitfenster; Punktuell ist davon befreit.
  if (state.flaeche !== "punktuell" && !state.zeitfenster) {
    return { topProdukt: null, alternativProdukt: null, alternativHinweis: null, refs: [], refsGesamt: 0, exaktTreffer: 0, refsGelockert: false };
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

  // A1: bestes tag-gerankte Produkt. A2: kuratierte Tabelle gewinnt, sofern ein
  // Eintrag existiert und das Produkt auffindbar ist (sonst Fallback auf A1).
  // Die Alternative (produkt2) gibt es nur im kuratierten Modus; A1 bleibt
  // unverändert ein Ein-Produkt-Ergebnis.
  let topProdukt = kandidaten[0] ?? null;
  let alternativProdukt: V25Produkt | null = null;
  let alternativHinweis: string | null = null;
  if (EMPFEHLUNGS_MODUS === "kuratiert") {
    const eintrag = kuratierteEmpfehlung(state.einsatzbereich, state.flaeche, state.zeitfenster);
    const kuratiert = eintrag ? v25Produkte.find((p) => p.id === eintrag.produkt1) : undefined;
    if (kuratiert && eintrag) {
      topProdukt = kuratiert;
      alternativProdukt = eintrag.produkt2
        ? v25Produkte.find((p) => p.id === eintrag.produkt2) ?? null
        : null;
      alternativHinweis = alternativProdukt ? eintrag.produkt2Hinweis ?? null : null;
    }
  }

  // --- Referenzen filtern: produktunabhängig, mit Auffüllen auf MIN_REFS ---
  // Steffi 2026-06-09: Die Referenzanzeige läuft bewusst UNABHÄNGIG von der
  // Produktempfehlung (kein Filter auf das empfohlene Produkt mehr). Wir wollen
  // immer mindestens MIN_REFS Projekte zeigen. Dazu sammeln wir strikte Treffer
  // und lockern danach stufenweise auf, bis MIN_REFS erreicht ist. Exakte
  // Treffer stehen vorne; `exaktTreffer` sagt der UI, ob aufgefüllt wurde.
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

  // Lockerungs-Leiter (von strikt nach weit), produktunabhängig:
  const strikt = imBereich
    .filter((r) => r.flaecheKategorie === state.flaeche)
    .filter((r) => r.einsatzbereich === state.einsatzbereich)
    .filter(passtZeitfenster);
  const stufen: V25Referenz[][] = [
    strikt,
    // Fläche fallen lassen (Cluster + Zeitfenster bleiben).
    imBereich.filter((r) => r.einsatzbereich === state.einsatzbereich).filter(passtZeitfenster),
    // Zeitfenster fallen lassen (Cluster bleibt).
    imBereich.filter((r) => r.einsatzbereich === state.einsatzbereich),
    // Cluster fallen lassen (nur noch Innen/Außen).
    imBereich,
  ];

  // Strikte Treffer vollständig übernehmen (auch wenn > MIN_REFS), danach nur
  // so weit auffüllen, bis MIN_REFS erreicht ist (Zähler bleibt aussagekräftig).
  const seen = new Set<string>(strikt.map((r) => r.slug));
  const refs: V25Referenz[] = [...strikt];
  for (const stufe of stufen.slice(1)) {
    if (refs.length >= MIN_REFS) break;
    for (const r of stufe) {
      if (refs.length >= MIN_REFS) break;
      if (seen.has(r.slug)) continue;
      seen.add(r.slug);
      refs.push(r);
    }
  }

  const exaktTreffer = strikt.length;
  const gelockert = exaktTreffer < refs.length;

  return {
    topProdukt,
    alternativProdukt,
    alternativHinweis,
    refs,
    refsGesamt: refs.length,
    exaktTreffer,
    refsGelockert: gelockert,
  };
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

// Logik-Hook der V2.5-Ergebnisseite: kapselt Ergebnis-Berechnung,
// asynchrone Inhalts-Lokalisierung (mit Staleness-Guard) und die
// polnische Pluralisierung. 1:1 aus Ergebnisseite.tsx extrahiert
// (UI-Refactoring PR 5) — keine funktionalen Änderungen.

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { LoesungsfinderState, Referenz } from "@/data/types";
import type { Produkt } from "@/data/produkte";
import { berechneErgebnisV25, type ErgebnisV25 } from "@/data/loesungsfinderV25";

// Polnisch braucht drei Pluralformen (1 projekt, 2–4 projekty, 5+ projektów);
// die übrigen Sprachen kommen mit Singular/Plural aus.
export function projektWort(
  n: number,
  t: { refs_projekt_singular: string; refs_projekt_plural: string; refs_projekt_plural5: string },
  lang: string,
): string {
  if (n === 1) return t.refs_projekt_singular;
  if (lang === "pl") {
    const r10 = n % 10;
    const r100 = n % 100;
    const fewForm = r10 >= 2 && r10 <= 4 && !(r100 >= 12 && r100 <= 14);
    return fewForm ? t.refs_projekt_plural : t.refs_projekt_plural5;
  }
  return t.refs_projekt_plural;
}

export interface ErgebnisAnzeige {
  ergebnis: ErgebnisV25;
  refsAnzeige: Referenz[];
  topProduktAnzeige: Produkt | null;
  alternativAnzeige: Produkt | null;
}

export function useErgebnis(state: LoesungsfinderState, lang: Locale): ErgebnisAnzeige {
  const ergebnis = useMemo<ErgebnisV25>(() => berechneErgebnisV25(state), [state]);

  // Inhalts-Lokalisierung (Referenz-Titel, Produkt-Kurzbeschreibung): der
  // Match-Algorithmus läuft auf der DE-Basis; die Overrides werden hier
  // nachgeladen. `fuer` koppelt das Ergebnis an die aktuelle Berechnung,
  // damit nach einer Auswahl-Änderung keine veralteten Texte stehen bleiben.
  const [lokalisiert, setLokalisiert] = useState<{
    fuer: ErgebnisV25;
    refs: Referenz[];
    topProdukt: Produkt | null;
    alternativProdukt: Produkt | null;
  } | null>(null);

  useEffect(() => {
    if (lang === "de") return;
    let aktiv = true;
    (async () => {
      const { localizeReferenzen, localizeProdukt } = await import("@/data/i18n/getLocalized");
      const [refs, topProdukt, alternativProdukt] = await Promise.all([
        localizeReferenzen(ergebnis.refs.slice(0, 6), lang),
        ergebnis.topProdukt ? localizeProdukt(ergebnis.topProdukt, lang) : Promise.resolve(null),
        ergebnis.alternativProdukt
          ? localizeProdukt(ergebnis.alternativProdukt, lang)
          : Promise.resolve(null),
      ]);
      if (aktiv) setLokalisiert({ fuer: ergebnis, refs, topProdukt, alternativProdukt });
    })();
    return () => {
      aktiv = false;
    };
  }, [ergebnis, lang]);

  const refsAnzeige: Referenz[] =
    lokalisiert?.fuer === ergebnis ? lokalisiert.refs : ergebnis.refs.slice(0, 6);
  const topProduktAnzeige: Produkt | null =
    lokalisiert?.fuer === ergebnis ? lokalisiert.topProdukt : ergebnis.topProdukt;
  const alternativAnzeige: Produkt | null =
    lokalisiert?.fuer === ergebnis ? lokalisiert.alternativProdukt : ergebnis.alternativProdukt;

  return { ergebnis, refsAnzeige, topProduktAnzeige, alternativAnzeige };
}

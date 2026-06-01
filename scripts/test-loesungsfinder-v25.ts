// Smoke-Test für den V2.5-Match-Algorithmus (berechneErgebnisV25).
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
// Aufruf: npx tsx scripts/test-loesungsfinder-v25.ts
//
// Bewusst robust gegenüber offenen DRAFT-/Ranking-Entscheidungen (Review-Doc):
// geprüft werden invariante Eigenschaften, nicht konkrete Produktnamen, die
// sich beim Fachurteils-Sign-off noch ändern können.

import { berechneErgebnisV25 } from "../data/loesungsfinderV25";
import { REFERENZ_FILTER_V25 } from "../data/referenzenV25";
import { referenzen } from "../data/referenzen";
import type { LoesungsfinderState } from "../data/types";

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}`); }
}

console.log("=== berechneErgebnisV25 ===");

// 1. Punktuell überspringt das Zeitfenster (adaptiv) und liefert trotzdem ein Ergebnis.
const punktuell: LoesungsfinderState = { flaeche: "punktuell", innenAussen: "innen", einsatzbereich: "innen-lager-logistik", zeitfenster: null };
const ePunkt = berechneErgebnisV25(punktuell);
check("Punktuell liefert Top-Produkt trotz zeitfenster=null", ePunkt.topProdukt !== null);
check("Punktuell-Top ist für punktuelle Fläche geeignet", !!ePunkt.topProdukt?.flaechenkategorienGeeignet.includes("punktuell"));

// 2. Unvollständiger State → kein Ergebnis.
check("Ohne einsatzbereich kein Ergebnis", berechneErgebnisV25({ flaeche: "mittel", innenAussen: "innen", einsatzbereich: null, zeitfenster: "planbar" }).topProdukt === null);
check("Mittel ohne zeitfenster kein Ergebnis", berechneErgebnisV25({ flaeche: "mittel", innenAussen: "innen", einsatzbereich: "innen-industrie-produktion", zeitfenster: null }).topProdukt === null);

// 3. Außen-Filter: Top-Produkt muss außentauglich sein.
const aussen = berechneErgebnisV25({ flaeche: "gross", innenAussen: "aussen", einsatzbereich: "aussen-parkdeck-tiefgarage", zeitfenster: "planbar" });
check("Außen-Top ist aussenGeeignet", aussen.topProdukt === null || aussen.topProdukt.aussenGeeignet === true);

// 4. Sehr-kurz filtert langsame Produkte raus (Wiederbelastung ≤ 24 h).
const sehrKurz = berechneErgebnisV25({ flaeche: "gross", innenAussen: "innen", einsatzbereich: "innen-industrie-produktion", zeitfenster: "sehr-kurz" });
check("Sehr-kurz-Top ist ≤ 24 h belastbar", sehrKurz.topProdukt === null || sehrKurz.topProdukt.wiederbelastungInH <= 24);

// 5. ASPHALT REPAIR MIX ist nur außen relevant (Steffi 2026-06-01): nie bei Innen-Fällen.
const innenCases: LoesungsfinderState[] = [
  { flaeche: "punktuell", innenAussen: "innen", einsatzbereich: "innen-lager-logistik", zeitfenster: null },
  { flaeche: "mittel", innenAussen: "innen", einsatzbereich: "innen-industrie-produktion", zeitfenster: "kurz" },
  { flaeche: "gross", innenAussen: "innen", einsatzbereich: "innen-industrie-produktion", zeitfenster: "sehr-kurz" },
];
check("ASPHALT REPAIR MIX nie Top bei Innen-Fällen", innenCases.every((s) => berechneErgebnisV25(s).topProdukt?.id !== "asphalt-repair-mix"));

// 6. Harter Flächen-Filter: Refs der falschen Flächenkategorie tauchen nicht auf.
check("Punktuell-Refs sind alle punktuell", ePunkt.refs.every((r) => r.flaecheKategorie === "punktuell"));

// 7. Datenintegrität: jede Referenz hat einen V2.5-Filter-Eintrag.
check("Alle Referenzen haben V25-Eintrag", referenzen.every((r) => !!REFERENZ_FILTER_V25[r.slug]));

console.log(`\n→ ${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);

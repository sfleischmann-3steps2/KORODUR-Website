// Step 3 — Einsatzbereich / Branche.
// Zeigt vier Karten je nach Innen/Außen-Auswahl aus Step 2.
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// TODO (Steffi 2026-06-01): Bei flaeche === "punktuell" passen die Branchen-
// Cluster fachlich nicht — eine punktuelle Reparatur wird nicht nach Branche,
// sondern nach Reparatur-Typ oder Belastung an der Stelle differenziert
// (Fugenprofile, Treppenstufen, Schwerlast-Spuren, dauernder LKW-Verkehr).
// Steffi klärt die Kategorien anhand der Rapid-Set-TDS und liefert nach;
// dann eigene Punktuell-Karten-Liste hier ergänzen.

import type { ComponentType, SVGProps } from "react";
import type { EinsatzbereichV25, InnenAussen } from "@/data/types";
import { EINSATZBEREICH_LABELS, einsatzbereicheFuer } from "@/data/einsatzbereichMapping";
import OptionCard from "./OptionCard";
import {
  IconFactory,
  IconChefHat,
  IconShoppingCart,
  IconParking,
  IconTruckLoading,
  IconRoad,
} from "./icons";

interface Step3Props {
  /** Aus Step 2, bestimmt welche 4 Karten gezeigt werden. */
  innenAussen: InnenAussen;
  value: EinsatzbereichV25 | null;
  onSelect: (v: EinsatzbereichV25) => void;
}

const NAVY = "#002d59";

type IconComp = ComponentType<Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">>;

const ICON_FUER_BEREICH: Record<EinsatzbereichV25, IconComp> = {
  "innen-industrie-halle": IconFactory,
  "innen-nass-hygiene-chemie": IconChefHat,
  "innen-sicht-design": IconShoppingCart,
  "aussen-verkehr-infrastruktur": IconRoad,
  "aussen-parkdeck": IconParking,
  "aussen-umwelt-whg": IconTruckLoading,
};

// TODO i18n: Texte in dictionaries/{de,en,fr,pl}.json überführen.
const SUBLINE_FUER: Record<InnenAussen, string> = {
  innen:
    "Aus der Branche leiten wir die typische Belastung ab – Staplerverkehr, Chemie, Hygiene oder Optik wirken sich direkt auf die Produktwahl aus.",
  aussen:
    "Außenflächen unterscheiden sich stark zwischen PKW-Verkehr, Schwerlast und reiner Witterungsfläche – die Branche entscheidet über das Anforderungsprofil.",
};

export default function Step3Einsatzbereich({ innenAussen, value, onSelect }: Step3Props) {
  const bereiche = einsatzbereicheFuer(innenAussen);

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          In welcher Branche wird der Boden eingesetzt?
        </h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{SUBLINE_FUER[innenAussen]}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {bereiche.map((b) => {
          const labels = EINSATZBEREICH_LABELS[b];
          const Icon = ICON_FUER_BEREICH[b];
          return (
            <OptionCard
              key={b}
              Icon={Icon}
              titel={labels.titel}
              beschreibung={labels.stichworte}
              selected={value === b}
              dimmed={value !== null && value !== b}
              onSelect={() => onSelect(b)}
              layout="horizontal"
            />
          );
        })}
      </div>
    </div>
  );
}

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
import { einsatzbereichLabel, einsatzbereicheFuer } from "@/data/einsatzbereichMapping";
import { useLocale } from "@/lib/LocaleContext";
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

const NAVY = "var(--navy)";

type IconComp = ComponentType<Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">>;

const ICON_FUER_BEREICH: Record<EinsatzbereichV25, IconComp> = {
  "innen-industrie-halle": IconFactory,
  "innen-nass-hygiene-chemie": IconChefHat,
  "innen-sicht-design": IconShoppingCart,
  "aussen-verkehr-infrastruktur": IconRoad,
  "aussen-parkdeck": IconParking,
  "aussen-umwelt-whg": IconTruckLoading,
};

export default function Step3Einsatzbereich({ innenAussen, value, onSelect }: Step3Props) {
  const { lang, dict } = useLocale();
  const t = dict.loesungsfinder;
  const bereiche = einsatzbereicheFuer(innenAussen);
  const subline = innenAussen === "innen" ? t.step3_subline_innen : t.step3_subline_aussen;

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-[22px] font-medium" style={{ color: NAVY }}>
          {t.step3_question}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{subline}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {bereiche.map((b) => {
          const labels = einsatzbereichLabel(b, lang);
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

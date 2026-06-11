// V2.5-Wizard — zentrale Klammer für Step 1–4 + Ergebnisseite.
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Adaptive Logik: Bei flaeche === "punktuell" wird Step 4 (Zeitfenster)
// übersprungen und intern auf "sehr-kurz" defaulted (alle Reparaturmörtel
// sind ~1h belastbar). Progress-Dots gehen 4→3 stillschweigend.

"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/LocaleContext";
import type {
  EinsatzbereichV25,
  Flaechenkategorie,
  InnenAussen,
  LoesungsfinderState,
  Zeitfenster,
} from "@/data/types";
import ProgressHeader from "./ProgressHeader";
import Step1Flaeche from "./Step1Flaeche";
import Step2InnenAussen from "./Step2InnenAussen";
import Step3Einsatzbereich from "./Step3Einsatzbereich";
import Step4Zeitfenster from "./Step4Zeitfenster";
import Ergebnisseite from "./Ergebnisseite";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const INITIAL_STATE: LoesungsfinderState = {
  flaeche: null,
  innenAussen: null,
  einsatzbereich: null,
  zeitfenster: null,
};

interface WizardProps {
  lang: Locale;
}

export default function Wizard({ lang }: WizardProps) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;
  const [state, setState] = useState<LoesungsfinderState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [showResults, setShowResults] = useState(false);

  // Adaptive Funnel-Länge: Punktuell überspringt Step 4.
  const totalSteps = state.flaeche === "punktuell" ? 3 : 4;
  const isFinalStep = currentStep === totalSteps;

  const stepIsReady = useMemo(() => {
    if (currentStep === 1) return state.flaeche !== null;
    if (currentStep === 2) return state.innenAussen !== null;
    if (currentStep === 3) return state.einsatzbereich !== null;
    if (currentStep === 4) return state.zeitfenster !== null;
    return false;
  }, [currentStep, state]);

  const selectFlaeche = useCallback((v: Flaechenkategorie) => {
    setState((s) => ({ ...s, flaeche: v }));
  }, []);
  const selectInnenAussen = useCallback((v: InnenAussen) => {
    // Bei Änderung von Innen/Außen muss die Branche zurückgesetzt werden,
    // weil sich die zur Verfügung stehenden Branchen-Karten unterscheiden.
    setState((s) => ({ ...s, innenAussen: v, einsatzbereich: null }));
  }, []);
  const selectEinsatzbereich = useCallback((v: EinsatzbereichV25) => {
    setState((s) => ({ ...s, einsatzbereich: v }));
  }, []);
  const selectZeitfenster = useCallback((v: Zeitfenster) => {
    setState((s) => ({ ...s, zeitfenster: v }));
  }, []);

  const goNext = useCallback(() => {
    if (isFinalStep) {
      // Bei Punktuell bleibt state.zeitfenster null — der Match-Algorithmus
      // ignoriert Zeit in dem Pfad bewusst (Steffi 2026-06-01).
      setShowResults(true);
    } else if (currentStep < totalSteps) {
      setCurrentStep((s) => (Math.min(s + 1, totalSteps) as 1 | 2 | 3 | 4));
    }
  }, [currentStep, totalSteps, isFinalStep]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((s) => (Math.max(s - 1, 1) as 1 | 2 | 3 | 4));
    }
  }, [currentStep]);

  const cancel = useCallback(() => {
    setState(INITIAL_STATE);
    setCurrentStep(1);
    setShowResults(false);
  }, []);

  // Zurück aus dem Ergebnis: zur letzten Frage, Auswahl bleibt erhalten.
  const zurueckZurAuswahl = useCallback(() => {
    setShowResults(false);
    setCurrentStep(totalSteps);
  }, [totalSteps]);

  if (showResults) {
    return (
      <Ergebnisseite
        lang={lang}
        state={state}
        onZurueck={zurueckZurAuswahl}
        onNeustart={cancel}
      />
    );
  }

  return (
    <div className="rounded-2xl bg-light-gray p-4 sm:p-6 md:p-8">
      <ProgressHeader currentStep={currentStep} totalSteps={totalSteps} onCancel={cancel} />

      {/* Mindesthöhe = höchster Step (Schritt 3, 6 Karten im 2er-Grid), damit
          Container und Footer beim Weiterklicken nicht springen. Mobil bleibt
          die Höhe natürlich (Sticky-Footer hält die Navigation ohnehin fest). */}
      <div className="md:min-h-[500px]">
        {currentStep === 1 && (
          <Step1Flaeche value={state.flaeche} onSelect={selectFlaeche} />
        )}
        {currentStep === 2 && (
          <Step2InnenAussen value={state.innenAussen} onSelect={selectInnenAussen} />
        )}
        {currentStep === 3 && state.innenAussen && (
          <Step3Einsatzbereich
            innenAussen={state.innenAussen}
            value={state.einsatzbereich}
            onSelect={selectEinsatzbereich}
          />
        )}
        {currentStep === 4 && state.flaeche !== "punktuell" && (
          <Step4Zeitfenster value={state.zeitfenster} onSelect={selectZeitfenster} />
        )}
      </div>

      {/* Footer-Navigation: mobil sticky am Viewport-Boden (Step-3-Weiter-Button
          sonst unter dem Fold), ab md regulär im Fluss. Negative Margins gleichen
          das Container-Padding aus, damit die Leiste mobil volle Breite hat. */}
      <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-3 border-t border-mid-gray bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 md:static md:z-auto md:mx-0 md:border-t-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        {currentStep > 1 ? (
          <Button type="button" variant="outline" onClick={goBack} className="h-11 md:h-9">
            <AppIcon icon={ArrowLeft} className="size-3.5" aria-hidden="true" />
            {t.back}
          </Button>
        ) : (
          <span />
        )}

        <Button
          type="button"
          variant="navy"
          onClick={goNext}
          disabled={!stepIsReady}
          className="h-11 md:h-9"
        >
          {isFinalStep ? t.show_solution : t.next}
          <AppIcon icon={ArrowRight} className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

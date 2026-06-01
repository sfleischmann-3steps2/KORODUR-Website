// V2.5-Wizard — zentrale Klammer für Step 1–4 + Ergebnisseite.
// PoC-Stand 2026-06-01: Step 1 + Step 2 funktional, Step 3 + 4 + Ergebnisseite
// folgen nach Architektur-Abnahme.
//
// Adaptive Logik: Bei flaeche === "punktuell" wird Step 4 (Zeitfenster)
// übersprungen und intern auf "sehr-kurz" defaulted (alle Reparaturmörtel
// sind ~1h belastbar).

"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  Flaechenkategorie,
  InnenAussen,
  LoesungsfinderState,
} from "@/data/types";
import ProgressHeader from "./ProgressHeader";
import Step1Flaeche from "./Step1Flaeche";
import Step2InnenAussen from "./Step2InnenAussen";
import { IconArrowLeft, IconArrowRight } from "./icons";

const NAVY = "#002d59";

const INITIAL_STATE: LoesungsfinderState = {
  flaeche: null,
  innenAussen: null,
  einsatzbereich: null,
  zeitfenster: null,
};

export default function Wizard() {
  const [state, setState] = useState<LoesungsfinderState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Adaptive Funnel-Länge: Punktuell überspringt Step 4.
  const totalSteps = state.flaeche === "punktuell" ? 3 : 4;

  // Pro Step: ist der "Weiter"-Button aktivierbar?
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
    setState((s) => ({ ...s, innenAussen: v, einsatzbereich: null /* reset abhängiger Step 3 */ }));
  }, []);

  const goNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => (Math.min(s + 1, totalSteps) as 1 | 2 | 3 | 4));
    }
  }, [currentStep, totalSteps]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((s) => (Math.max(s - 1, 1) as 1 | 2 | 3 | 4));
    }
  }, [currentStep]);

  const cancel = useCallback(() => {
    setState(INITIAL_STATE);
    setCurrentStep(1);
  }, []);

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{ background: "#F7F6F1" }}
    >
      <ProgressHeader currentStep={currentStep} totalSteps={totalSteps} onCancel={cancel} />

      {currentStep === 1 && (
        <Step1Flaeche value={state.flaeche} onSelect={selectFlaeche} />
      )}
      {currentStep === 2 && (
        <Step2InnenAussen value={state.innenAussen} onSelect={selectInnenAussen} />
      )}
      {currentStep === 3 && (
        <PlaceholderStep title="Step 3 — Einsatzbereich" hinweis="In Vorbereitung: vier Branchen-Karten je nach Innen/Außen-Auswahl." />
      )}
      {currentStep === 4 && (
        <PlaceholderStep title="Step 4 — Zeitfenster" hinweis="In Vorbereitung: drei Karten (sehr kurz / 1–2 Wo / planbar)." />
      )}

      <div className="flex items-center justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border text-sm transition hover:bg-white"
            style={{ borderColor: "rgba(0,0,0,0.2)", color: NAVY }}
          >
            <IconArrowLeft width={14} height={14} aria-hidden="true" />
            Zurück
          </button>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={goNext}
          disabled={!stepIsReady}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-medium transition"
          style={{
            background: stepIsReady ? NAVY : "#E5E4DE",
            color: stepIsReady ? "#fff" : "#8A8983",
            border: `0.5px solid ${stepIsReady ? NAVY : "rgba(0,0,0,0.12)"}`,
            cursor: stepIsReady ? "pointer" : "not-allowed",
          }}
        >
          Weiter
          <IconArrowRight width={14} height={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function PlaceholderStep({ title, hinweis }: { title: string; hinweis: string }) {
  return (
    <div className="rounded-xl p-8 text-center" style={{ border: "0.5px dashed rgba(0,0,0,0.2)", background: "#fff" }}>
      <div className="text-lg font-medium mb-2" style={{ color: NAVY }}>{title}</div>
      <div className="text-sm text-gray-600">{hinweis}</div>
    </div>
  );
}

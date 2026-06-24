// Neubau-Funnel (Industrieboden) — finalisierte Schritt-Struktur nach
// Kollegen-Abstimmung (RV, 2026-06-24). 3 Schritte:
//   1. Wo entsteht der Boden       (Einfachauswahl)
//   2. Wie wird der Boden beansprucht  (Einfachauswahl)
//   3. Weitere Anforderungen        (Mehrfachauswahl)
// Der Schritt "Wann nutzbar" (Zeitfenster) entfällt im Neubau (RV: dort nicht
// projektrelevant). Die Schritt-Labels sind final (DE); die i18n
// (DE/EN/FR/PL/ES) folgt am Ende des Relaunchs mit dem KORODUR-Glossar.
//
// PROVISORISCH bleibt nur die Produktempfehlung am Ende: ein kuratierter
// Default, den die technische Fachberatung final schärft. Das exakte
// Antwort->System-Mapping liefert das Produktmanagement (Frank/RV) nach.
// Self-contained Komponente: der Sanierungs-Funnel bleibt unangetastet, die
// Strecke ist per NEUBAU_STRECKE_AKTIV ein-/ausschaltbar. Siehe Issue #103.

"use client";

import { useCallback, useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { useLocale } from "@/lib/LocaleContext";
import OptionCard from "./OptionCard";
import ProgressHeader from "./ProgressHeader";
import {
  IconFactory,
  IconWarehouse,
  IconStore,
  IconShoppingCart,
  IconWeight,
  IconPackage,
  IconFootprints,
  IconFlask,
  IconPalette,
  IconSpray,
  IconRuler,
  IconShield,
  IconLeaf,
  IconZap,
} from "./icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

type IconComp = ComponentType<Omit<SVGProps<SVGSVGElement>, "children" | "viewBox" | "fill" | "stroke">>;

interface StepOption {
  id: string;
  Icon: IconComp;
  titel: string;
  beschreibung: string;
}
interface StepDef {
  key: string;
  question: string;
  subline: string;
  /** Mehrfachauswahl (Schritt 3 "Weitere Anforderungen"). Default Einfachauswahl. */
  multi?: boolean;
  options: StepOption[];
}

// Schritt-Definitionen (DE, RV-final 2026-06-24) — siehe Datei-Kommentar.
const STEPS: StepDef[] = [
  {
    key: "nutzung",
    question: "Wo entsteht der Boden?",
    subline: "Die Nutzung bestimmt die Bodenklasse.",
    options: [
      { id: "industriehalle", Icon: IconFactory, titel: "Industrie & Produktionshalle", beschreibung: "Fertigung, Maschinen, Schwerindustrie, Schüttgüter." },
      { id: "lager-logistik", Icon: IconWarehouse, titel: "Lager & Logistik", beschreibung: "Distributions- und Verteilzentren, Hochregal, Staplerverkehr." },
      { id: "verkauf-veranstaltung", Icon: IconStore, titel: "Verkaufsraum & Veranstaltungsraum", beschreibung: "Publikumsverkehr, Präsentationsfläche, Museen, Boutique." },
      { id: "fachmarkt", Icon: IconShoppingCart, titel: "Fachmärkte & Fachzentren", beschreibung: "Lebensmittel, Einzelhandel, Baumärkte, Hygiene." },
    ],
  },
  {
    key: "beanspruchung",
    question: "Wie wird der Boden beansprucht?",
    subline: "Die maßgebliche Beanspruchung bestimmt das System.",
    options: [
      { id: "hoch", Icon: IconWeight, titel: "Hohe Beanspruchung", beschreibung: "Abrieb durch Metallteile, Absetzen mit Metallgabeln, Verkehr über 1.000 Personen pro Tag." },
      { id: "mittel", Icon: IconPackage, titel: "Mittlere Beanspruchung", beschreibung: "Holz, Papierrollen, Kunststoff, Verkehr 100 bis 1.000 Personen pro Tag." },
      { id: "leicht", Icon: IconFootprints, titel: "Leichte Beanspruchung", beschreibung: "Elastik- und Luftreifenverkehr, Montage, bis 100 Personen pro Tag." },
      { id: "chemisch", Icon: IconFlask, titel: "Chemische Beanspruchung", beschreibung: "Öle, Betriebsstoffe, Säuren, Reinigungsmittel, Frost- und Streusalz." },
    ],
  },
  {
    key: "anforderung",
    question: "Welche weiteren Anforderungen gelten?",
    subline: "Mehrfachauswahl möglich.",
    multi: true,
    options: [
      { id: "optik", Icon: IconPalette, titel: "Optik & Design", beschreibung: "Oberflächenoptik (geschliffen oder geglättet), Farbgebung, Betonoptik." },
      { id: "hygiene", Icon: IconSpray, titel: "Hygiene & Reinigung", beschreibung: "Häufig und leicht zu reinigen, hohe Dichtigkeit." },
      { id: "ebenheit", Icon: IconRuler, titel: "Ebenheit", beschreibung: "Hochregallager nach DIN 18202, für leitliniengeführte Stapler." },
      { id: "rutschhemmung", Icon: IconShield, titel: "Sicherheit & Rutschhemmung", beschreibung: "Rutschhemmung R9 bis R13 nach DIN 51130 je Einsatzbereich." },
      { id: "nachhaltigkeit", Icon: IconLeaf, titel: "Nachhaltigkeit & Klimaschutz", beschreibung: "EPD-Nachweis, CO₂-Reduzierung, Langlebigkeit." },
      { id: "esd", Icon: IconZap, titel: "Ableitfähigkeit (ESD)", beschreibung: "E-Mobilität, Elektronikfertigung." },
    ],
  },
];

interface NeubauFunnelProps {
  /** Zurück zur Eingangsweiche. */
  onZurueck: () => void;
}

export default function NeubauFunnel({ onZurueck }: NeubauFunnelProps) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;
  const [stepIndex, setStepIndex] = useState(0);
  // Antworten je Schritt als String-Liste: Einfachauswahl = 0/1 Eintrag,
  // Mehrfachauswahl (Schritt 3) = beliebig viele.
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);

  const totalSteps = STEPS.length;
  const step = STEPS[stepIndex];
  const isFinalStep = stepIndex === totalSteps - 1;
  const selected = answers[step.key] ?? [];
  const stepIsReady = selected.length > 0;

  const toggle = useCallback(
    (key: string, id: string, multi: boolean) =>
      setAnswers((a) => {
        const cur = a[key] ?? [];
        if (multi) {
          return { ...a, [key]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
        }
        return { ...a, [key]: [id] };
      }),
    []
  );

  const goNext = useCallback(() => {
    if (isFinalStep) setShowResult(true);
    else setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }, [isFinalStep, totalSteps]);

  const goBack = useCallback(() => {
    if (stepIndex > 0) setStepIndex((i) => Math.max(i - 1, 0));
    else onZurueck(); // von Schritt 1 zurück zur Eingangsweiche
  }, [stepIndex, onZurueck]);

  const neustart = useCallback(() => {
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
  }, []);

  const zusammenfassung = useMemo(
    () =>
      STEPS.filter((s) => (answers[s.key]?.length ?? 0) > 0).map((s) => ({
        frage: s.question,
        antwort: s.options
          .filter((o) => answers[s.key]!.includes(o.id))
          .map((o) => o.titel)
          .join(", "),
      })),
    [answers]
  );

  if (showResult) {
    return (
      <div className="rounded-2xl bg-light-gray p-4 sm:p-6 md:p-8">
        <span className="mb-3 inline-flex rounded-md bg-cyan/12 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-cyan-text">
          Systemempfehlung
        </span>
        <h2 className="text-xl font-medium text-navy sm:text-[22px]">Ihr Neubau-Bodensystem</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Auf Basis Ihrer Angaben empfehlen wir ein Hartstoff-Estrich-System.
        </p>

        <div className="mt-5 rounded-xl border border-navy/15 bg-card p-5">
          <div className="text-[15px] font-semibold text-navy">
            NEODUR HE 3 green + Hartstoffeinstreuung
          </div>
          <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
            CO₂-reduzierter Hochleistungsestrich mit mineralischer Hartstoffeinstreuung und Nachbehandlung, weltweit bewährt.
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-cyan/10 p-3 text-xs leading-relaxed text-cyan-text">
          Die finale Systemauswahl stimmen wir in der technischen Fachberatung auf Ihr Projekt ab.
        </p>

        {zusammenfassung.length > 0 && (
          <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
            {zusammenfassung.map((z) => (
              <li key={z.frage}>
                <span className="text-navy/70">{z.frage}</span> {z.antwort}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setShowResult(false)} className="h-11 md:h-9">
            <AppIcon icon={ArrowLeft} className="size-3.5" aria-hidden="true" />
            {t.back}
          </Button>
          <Button type="button" variant="navy" onClick={onZurueck} className="h-11 md:h-9">
            {t.weiche_question}
          </Button>
          <Button type="button" variant="ghost" onClick={neustart} className="h-11 md:h-9">
            {t.cancel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-mt-20 rounded-2xl bg-light-gray p-4 sm:p-6 md:p-8">
      <ProgressHeader currentStep={stepIndex + 1} totalSteps={totalSteps} onCancel={onZurueck} />

      <div className="md:min-h-[500px]">
        <header className="mb-6">
          <h2 className="text-xl font-medium text-navy sm:text-[22px]">{step.question}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.subline}</p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {step.options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <OptionCard
                key={opt.id}
                Icon={opt.Icon}
                titel={opt.titel}
                beschreibung={opt.beschreibung}
                selected={isSelected}
                // Nur bei Einfachauswahl die übrigen Karten abdimmen; bei
                // Mehrfachauswahl bleiben alle gleich präsent.
                dimmed={!step.multi && selected.length > 0 && !isSelected}
                onSelect={() => toggle(step.key, opt.id, step.multi ?? false)}
              />
            );
          })}
        </div>
      </div>

      {/* Footer auf allen Viewports sticky -> Weiter-Button nie unter dem Fold (#101). */}
      <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-3 border-t border-mid-gray bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
        <Button type="button" variant="outline" onClick={goBack} className="h-11 md:h-9">
          <AppIcon icon={ArrowLeft} className="size-3.5" aria-hidden="true" />
          {t.back}
        </Button>
        <Button type="button" variant="navy" onClick={goNext} disabled={!stepIsReady} className="h-11 md:h-9">
          {isFinalStep ? t.show_solution : t.next}
          <AppIcon icon={ArrowRight} className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

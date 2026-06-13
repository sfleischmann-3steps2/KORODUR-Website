// Neubau-Funnel (Option C, Steffi 2026-06-13) — 4 Schritte:
// Nutzung → Beanspruchung → Anforderung → Zeitfenster.
//
// PROVISORISCH: Schritt-Optionen (Labels) und die Produktempfehlung sind ein
// erster Vorschlag für die Kollegen-Abstimmung. Die echte Auswahl-Logik
// (Produkt-Mapping) wird mit dem Produktmanagement (Frank) geschärft, danach
// folgt die i18n (DE/EN/FR/PL/ES). Bewusst eine self-contained Komponente,
// damit der Sanierungs-Funnel unangetastet bleibt und die Strecke per
// NEUBAU_STRECKE_AKTIV ein-/ausschaltbar ist.

"use client";

import { useCallback, useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { useLocale } from "@/lib/LocaleContext";
import OptionCard from "./OptionCard";
import ProgressHeader from "./ProgressHeader";
import {
  IconFactory,
  IconWarehouse,
  IconShoppingCart,
  IconChefHat,
  IconParking,
  IconForklift,
  IconRefresh,
  IconFlame,
  IconSun,
  IconSquare,
  IconClockBolt,
  IconCalendar,
  IconCalendarMonth,
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
  options: StepOption[];
}

// Provisorische Schritt-Definitionen (DE) — siehe Datei-Kommentar.
const STEPS: StepDef[] = [
  {
    key: "nutzung",
    question: "Wo entsteht der neue Boden?",
    subline: "Die Nutzung bestimmt die Bodenklasse.",
    options: [
      { id: "industriehalle", Icon: IconFactory, titel: "Industrie- & Produktionshalle", beschreibung: "Fertigung, Maschinen, Mischverkehr." },
      { id: "lager-logistik", Icon: IconWarehouse, titel: "Lager & Logistik", beschreibung: "Hochregal, Staplerverkehr, große Flächen." },
      { id: "verkaufsraum", Icon: IconShoppingCart, titel: "Verkaufsraum / Showroom", beschreibung: "Sichtbarer Boden, Publikumsverkehr." },
      { id: "lebensmittel-nass", Icon: IconChefHat, titel: "Lebensmittel / Nassbereich", beschreibung: "Hygiene, Feuchtigkeit, Reinigung." },
      { id: "parkdeck-aussen", Icon: IconParking, titel: "Parkdeck / Außen", beschreibung: "Witterung, Frost, Tausalz." },
    ],
  },
  {
    key: "beanspruchung",
    question: "Wie wird der Boden beansprucht?",
    subline: "Wählen Sie die Hauptbelastung.",
    options: [
      { id: "stapler-schwerlast", Icon: IconForklift, titel: "Stapler- & Schwerlast", beschreibung: "Hohe mechanische Punktlasten." },
      { id: "verschleiss", Icon: IconRefresh, titel: "Verschleiß & Abrieb", beschreibung: "Dauerhafte Abriebbeanspruchung." },
      { id: "chemisch", Icon: IconFlame, titel: "Chemische Beanspruchung", beschreibung: "Öle, Säuren, Betriebsstoffe." },
      { id: "frost-tausalz", Icon: IconSun, titel: "Frost & Tausalz", beschreibung: "Außen, Witterung, Streusalz." },
    ],
  },
  {
    key: "anforderung",
    question: "Welche Anforderung steht im Vordergrund?",
    subline: "Bestimmt Oberfläche und Finish.",
    options: [
      { id: "sicht-design", Icon: IconSquare, titel: "Sicht- & Designoptik", beschreibung: "Repräsentativer, gestalteter Boden." },
      { id: "hygiene", Icon: IconChefHat, titel: "Hygiene & Reinigung", beschreibung: "Fugenlos, leicht zu reinigen." },
      { id: "leitfaehig", Icon: IconClockBolt, titel: "Leitfähig (ESD)", beschreibung: "Ableitfähig für Elektronik / Ex-Schutz." },
      { id: "hell-reflektierend", Icon: IconSun, titel: "Hell & reflektierend", beschreibung: "Mehr Helligkeit, weniger Beleuchtung." },
    ],
  },
  {
    key: "zeitfenster",
    question: "Wann muss der Boden nutzbar sein?",
    subline: "Bestimmt das Aushärtesystem.",
    options: [
      { id: "sehr-kurz", Icon: IconClockBolt, titel: "Sehr schnell", beschreibung: "Über Nacht / Wochenende." },
      { id: "kurz", Icon: IconCalendar, titel: "Kurzfristig", beschreibung: "1–2 Wochen." },
      { id: "planbar", Icon: IconCalendarMonth, titel: "Planbar", beschreibung: "Keine Zeitbegrenzung." },
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
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const totalSteps = STEPS.length;
  const step = STEPS[stepIndex];
  const isFinalStep = stepIndex === totalSteps - 1;
  const selected = answers[step.key] ?? null;
  const stepIsReady = selected !== null;

  const select = useCallback(
    (key: string, id: string) => setAnswers((a) => ({ ...a, [key]: id })),
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
      STEPS.filter((s) => answers[s.key]).map((s) => ({
        frage: s.question,
        antwort: s.options.find((o) => o.id === answers[s.key])?.titel ?? "",
      })),
    [answers]
  );

  if (showResult) {
    return (
      <div className="rounded-2xl bg-light-gray p-4 sm:p-6 md:p-8">
        <span className="mb-3 inline-flex rounded-md bg-cyan/12 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-cyan-text">
          Vorschau
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
            CO₂-reduzierter Hochleistungsestrich mit mineralischer Hartstoffeinstreuung und Nachbehandlung — weltweit bewährt.
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-cyan/10 p-3 text-xs leading-relaxed text-cyan-text">
          Hinweis: Die exakte Produktempfehlung des Neubau-Pfads wird derzeit mit dem Produktmanagement abgestimmt (Platzhalter-Logik).
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
          {step.options.map((opt) => (
            <OptionCard
              key={opt.id}
              Icon={opt.Icon}
              titel={opt.titel}
              beschreibung={opt.beschreibung}
              selected={selected === opt.id}
              dimmed={selected !== null && selected !== opt.id}
              onSelect={() => select(step.key, opt.id)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-3 border-t border-mid-gray bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 md:static md:z-auto md:mx-0 md:border-t-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
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

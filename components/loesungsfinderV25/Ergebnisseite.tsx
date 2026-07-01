// Ergebnisseite des V2.5-Lösungsfinders.
// Plan: docs/superpowers/plans/2026-06-01-loesungsfinder-4step-adaptive.md
//
// Layout (Steffi-Review 2026-06-09):
//   1. Auswahl-Chips oben (reine Zusammenfassung)
//   2. Top-Empfehlung als kompakter Banner (genau EIN Produkt)
//   3. Referenz-Grid: Bild + Titel + Untertitel, min. 3 Projekte, mit
//      Hinweis wenn kein exakter Treffer dabei ist
//   4. Allgemeiner Berater-CTA (ergebnis-unabhängig)
//   5. Navigation: Zurück (zur letzten Frage) + Neu starten — kein Dead End mehr
//
// Logik (Berechnung, Lokalisierung, PL-Plural) liegt in useErgebnis.ts;
// hier nur noch Darstellung (UI-Refactoring PR 5).

import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/LocaleContext";
import type { LoesungsfinderState } from "@/data/types";
import { einsatzbereichLabel } from "@/data/einsatzbereichMapping";
import { withBasePath } from "@/lib/basePath";
import { kontaktPath } from "@/lib/kontakt";
import { fachberaterFuerBereich } from "@/data/fachberater";
import BeraterCard from "@/components/BeraterCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconPhone, IconArrowRight, IconArrowLeft, IconRefresh } from "./icons";
import ProduktBanner from "./ProduktBanner";
import { projektWort, useErgebnis } from "./useErgebnis";

interface ErgebnisseiteProps {
  lang: Locale;
  state: LoesungsfinderState;
  /** Zurück zur letzten Frage (Auswahl bleibt erhalten). */
  onZurueck: () => void;
  /** Lösungsfinder komplett neu starten. */
  onNeustart: () => void;
}

// Endständige Jahreszahl in Klammern aus dem Titel entfernen, z. B.
// "Naturex, Burgdorf (2013)" → "Naturex, Burgdorf". Manche Referenzen sind alt;
// das Jahr soll nicht auf der Ergebnisseite stehen (Steffi 2026-06-09).
const ohneJahr = (titel: string): string => titel.replace(/\s*\(\d{4}\)\s*$/, "");

export default function Ergebnisseite({ lang, state, onZurueck, onNeustart }: ErgebnisseiteProps) {
  const { dict } = useLocale();
  const t = dict.loesungsfinder;
  const { ergebnis, refsAnzeige, topProduktAnzeige, alternativAnzeige } = useErgebnis(state, lang);

  // Chip-Labels in der oberen Leiste (reine Zusammenfassung der Auswahl)
  const chips: string[] = [];
  if (state.flaeche === "punktuell") chips.push(t.chip_punktuell);
  if (state.flaeche === "mittel") chips.push(t.chip_mittel);
  if (state.flaeche === "gross") chips.push(t.chip_gross);
  if (state.innenAussen === "innen") chips.push(t.chip_innen);
  if (state.innenAussen === "aussen") chips.push(t.chip_aussen);
  if (state.einsatzbereich) chips.push(einsatzbereichLabel(state.einsatzbereich, lang).titel);
  if (state.flaeche !== "punktuell" && state.zeitfenster === "sehr-kurz") chips.push(t.chip_sehrkurz);
  if (state.flaeche !== "punktuell" && state.zeitfenster === "kurz") chips.push(t.chip_kurz);
  if (state.flaeche !== "punktuell" && state.zeitfenster === "planbar") chips.push(t.chip_planbar);

  // Referenz-Sektion: Überschrift + Hinweis abhängig von der Trefferlage.
  const hatExakte = ergebnis.exaktTreffer > 0;
  const refTitel = hatExakte ? t.refs_exakt : t.refs_verwandt;

  return (
    <div className="rounded-2xl bg-light-gray p-6 md:p-8">
      {/* Auswahl-Chips (Zusammenfassung) */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {chips.map((c) => (
          <Badge
            key={c}
            variant="secondary"
            className="rounded-lg bg-[color-mix(in_srgb,var(--cyan)_12%,transparent)] px-2.5 py-1 text-xs font-medium whitespace-normal text-navy"
          >
            {c}
          </Badge>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-medium text-navy">{t.ergebnis_title}</h2>

      {/* Top-Empfehlung als kompakter Banner */}
      {topProduktAnzeige ? (
        <ProduktBanner
          lang={lang}
          variant="top"
          produkt={topProduktAnzeige}
          label={t.ergebnis_top}
          beschreibung={topProduktAnzeige.kurzbeschreibung}
          detailsLabel={t.ergebnis_details}
          className={alternativAnzeige ? "mb-2.5" : "mb-5"}
        />
      ) : (
        <EmptyEmpfehlung titel={t.ergebnis_empty_title} text={t.ergebnis_empty_text} />
      )}

      {/* Alternative (nur im kuratierten Modus belegt): bewusst dem Top-Banner
          untergeordnet — Icon-Box outlined statt gefüllt, Label grau. */}
      {alternativAnzeige && (
        <ProduktBanner
          lang={lang}
          variant="alternative"
          produkt={alternativAnzeige}
          label={t.ergebnis_alternative}
          beschreibung={ergebnis.alternativHinweis ?? alternativAnzeige.kurzbeschreibung}
          detailsLabel={t.ergebnis_details}
          className="mb-5"
        />
      )}

      {/* Referenzen-Header */}
      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="text-[15px] font-medium text-navy">
          {refTitel}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            · {ergebnis.refsGesamt} {projektWort(ergebnis.refsGesamt, t, lang)}
          </span>
        </div>
        {ergebnis.refsGesamt > 6 && (
          <Link
            href={`/${lang}/referenzen/`}
            className="inline-flex min-h-11 items-center gap-1 text-xs text-cyan-text no-underline"
          >
            {t.refs_alle}
            <IconArrowRight width={12} height={12} aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Hinweis, wenn kein exakter Treffer dabei ist (aufgefüllt auf min. 3) */}
      {ergebnis.refsGelockert ? (
        <div className="mb-3 text-xs leading-normal text-muted-foreground">{t.refs_gelockert}</div>
      ) : (
        <div className="mb-3" />
      )}

      {/* Referenz-Grid */}
      {refsAnzeige.length > 0 ? (
        <div className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {refsAnzeige.map((r) => (
            <Link
              key={r.id}
              href={`/${lang}/referenzen/${r.slug}/`}
              className="group block no-underline"
            >
              <Card className="gap-0 overflow-hidden rounded-lg border-mid-gray py-0 text-navy shadow-none transition-colors group-hover:border-cyan">
                <div className="relative aspect-[16/10] w-full bg-light-gray">
                  <Image
                    src={withBasePath(r.bild)}
                    alt={r.bildAlt ?? r.titel}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover"
                  />
                </div>
                <div className="px-3 py-2.5">
                  <div className="line-clamp-2 text-[13px] leading-snug font-semibold text-navy">
                    {ohneJahr(r.titel)}
                  </div>
                  {r.untertitel && (
                    <div className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                      {ohneJahr(r.untertitel)}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="mb-4 rounded-lg border-dashed border-mid-gray p-6 text-center text-[13px] text-muted-foreground shadow-none">
          {t.refs_keine}
        </Card>
      )}

      {/* Fachberater zur Empfehlung (Funnel-Karten, Korb 2): persönlicher
          Ansprechpartner mit Durchwahl direkt am Ergebnis */}
      {topProduktAnzeige && (() => {
        const alle = fachberaterFuerBereich(topProduktAnzeige.bereich, lang);
        if (alle.length === 0) return null;
        // DE: bis zu 2 regionale Berater + garantiert die Export-Kontakte
        // (Alexander + Mirko, ohne PLZ-gebiet); sonst wie gehabt (#412).
        const anzeige =
          lang === "de"
            ? [...alle.filter((b) => b.gebiet).slice(0, 2), ...alle.filter((b) => !b.gebiet)]
            : alle.slice(0, 2);
        return (
          <div className="mb-4">
            <div className="mb-2 text-[15px] font-semibold text-navy">
              {dict.kontakt.fachberater_title}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {anzeige.map((b) => (
                <BeraterCard key={`${b.name}-${b.email}`} berater={b} plzLabel={dict.kontakt.fachberater_plz} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Allgemeiner Berater-CTA (ergebnis-unabhängig) */}
      <div className="flex flex-col gap-4 rounded-[10px] bg-navy px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-[18px]">
        <div>
          <div className="mb-0.5 text-[15px] font-semibold text-white">{t.cta_title}</div>
          <div className="text-[12.5px] text-white/80">{t.cta_text}</div>
        </div>
        <Button asChild className="min-h-11 w-full shrink-0 sm:w-auto">
          <Link href={kontaktPath(lang)}>
            <IconPhone width={15} height={15} aria-hidden="true" />
            {t.cta_button}
          </Link>
        </Button>
      </div>

      {/* Navigation — kein Dead End */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-mid-gray pt-4">
        <Button type="button" variant="outline" onClick={onZurueck} className="min-h-11">
          <IconArrowLeft width={14} height={14} aria-hidden="true" />
          {t.back}
        </Button>
        <Button type="button" variant="ghost" onClick={onNeustart} className="min-h-11 text-navy">
          <IconRefresh width={14} height={14} aria-hidden="true" />
          {t.neu_starten}
        </Button>
      </div>
    </div>
  );
}

function EmptyEmpfehlung({ titel, text }: { titel: string; text: string }) {
  return (
    <Card className="mb-5 gap-1.5 rounded-xl border-dashed border-mid-gray p-6 text-center shadow-none">
      <div className="text-base font-medium text-navy">{titel}</div>
      <div className="text-[13px] leading-relaxed text-muted-foreground">{text}</div>
    </Card>
  );
}

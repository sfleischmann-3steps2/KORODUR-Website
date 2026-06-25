import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "../../../../components/Breadcrumb";
import ReferenceCard from "../../../../components/ReferenceCard";
import TileGrid from "../../../../components/TileGrid";
import { produkte, getProduktById } from "../../../../data/produkte";
import { PRODUKT_DOKUMENTE } from "../../../../data/produktDokumente";
import { PRODUKT_LV_LINKS } from "../../../../data/produktLvLinks";
import { AUSSCHREIBEN_URL } from "../../../../lib/kontaktDaten";
import { fachberaterFuerBereich } from "../../../../data/fachberater";
import BeraterCard from "../../../../components/BeraterCard";
import DokumentListe, { dokumenteNachSprache } from "../../../../components/DokumentListe";
import NormenChips from "../../../../components/NormenChips";
import { referenzen } from "../../../../data/referenzen";
import { getDictionary, hasLocale } from "../../dictionaries";
import { LOCALES } from "../../../../lib/i18n";
import { notFound } from "next/navigation";
import { localizeProdukt, localizeReferenzen } from "../../../../data/i18n/getLocalized";
import { withBasePath } from "../../../../lib/basePath";
import { alternatesFor } from "../../../../lib/seo";
import { kontaktPath } from "../../../../lib/kontakt";
import { AppIcon } from "@/components/ui/icon";
import { CircleCheck, Info, MapPin, FileText } from "lucide-react";
import { getBereichBySlug } from "../../../../data/bereiche";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }): Promise<Metadata> {
  const { lang, id } = await params;
  if (!hasLocale(lang)) return {};
  const produkt = getProduktById(id);
  if (!produkt) return {};
  // Meta-Description lokalisieren (sonst stünde auf EN/FR/PL-Seiten die DE-Kurzbeschreibung)
  const localized = await localizeProdukt(produkt, lang);
  return {
    title: produkt.name,
    description: localized.kurzbeschreibung,
    alternates: alternatesFor(lang, `/produkte/${id}/`),
  };
}

export function generateStaticParams() {
  return produkte.flatMap((p) =>
    LOCALES.map((lang) => ({ lang, id: p.id }))
  );
}

export default async function ProduktDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const baseProdukt = getProduktById(id);

  if (!baseProdukt) notFound();

  const produkt = await localizeProdukt(baseProdukt, lang);

  const categoryLabel =
    (dict.produkte as Record<string, string>)[`category_${produkt.kategorie}`] ||
    produkt.kategorie;

  // Find references that use this product
  const baseRelatedRefs = referenzen.filter((r) =>
    r.produkte.some(
      (p) => p.toLowerCase() === produkt.name.toLowerCase()
    )
  );
  const relatedRefs = await localizeReferenzen(baseRelatedRefs, lang);
  const dokumente = PRODUKT_DOKUMENTE[produkt.id] ?? [];
  // Sprachgefiltert (aktuelle Sprache → EN → DE) — steuert auch die Section-Sichtbarkeit (#120).
  const sichtbareDokumente = dokumenteNachSprache(dokumente, lang);
  // LV-Deeplink (#136): produktspezifischer Ausschreibungstext oder generischer Katalog-Fallback.
  const lvUrlSpezifisch = PRODUKT_LV_LINKS[produkt.id];
  const lvUrl = lvUrlSpezifisch ?? AUSSCHREIBEN_URL;

  // Varianten-Vergleichstabelle (#110): Spalten nur zeigen, wenn befüllt.
  const varianten = produkt.varianten ?? [];
  const varHatKlasse = varianten.some((v) => v.qualitaetsklasse);
  const varHatHinweis = varianten.some((v) => v.hinweis);
  // Scannbarer Kopf nur rendern, wenn er Inhalt hat (#176).
  const hatKopfInhalt =
    produkt.besonderheiten.length > 0 ||
    (produkt.einsatzbereiche?.length ?? 0) > 0 ||
    varianten.length > 0;

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb
            items={[
              { label: dict.produkte.breadcrumb, href: `/${lang}/produkte` },
              // Bereichs-Ebene im Pfad: Rücksprung in den Kontext (Korb 2)
              {
                label: (dict.bereiche as Record<string, string>)[`${produkt.bereich}_name`] ?? produkt.bereich,
                href: `/${lang}/bereiche/${produkt.bereich}`,
              },
              { label: produkt.name },
            ]}
            lang={lang}
          />
        </div>
      </section>

      {/* Header — Text-Header-Standard (#297): Top 16px bei Seiten mit Breadcrumb. */}
      <section style={{ padding: "16px 32px 56px" }}>
        <div className="mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8" style={{ maxWidth: 1320 }}>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="text-white text-[11px] uppercase tracking-wider px-3 py-1 rounded-[4px]"
                style={{ backgroundColor: "var(--cyan)", fontWeight: 700 }}
              >
                {categoryLabel}
              </span>
              {produkt.qualitaetsklasse && (
                <span
                  className="text-navy text-[11px] uppercase tracking-wider px-3 py-1 rounded-[4px]"
                  style={{ backgroundColor: "var(--bullet-bg)", fontWeight: 700 }}
                >
                  {produkt.qualitaetsklasse}
                </span>
              )}
            </div>
            <h1
              className="mb-3"
              style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
            >
              {produkt.name}
            </h1>
            <p className="text-navy opacity-70 mb-0" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 700 }}>
              {produkt.kurzbeschreibung}
            </p>
            {produkt.beschreibung && (
              <p className="text-navy/70 mt-4 mb-0" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 700 }}>
                {produkt.beschreibung}
              </p>
            )}
            {produkt.schichtdicke && (
              <p className="text-cyan-text mt-3 mb-0" style={{ fontSize: 16, fontWeight: 700 }}>
                {dict.produkte.layer_thickness}: {produkt.schichtdicke}
              </p>
            )}
            {/* Belastbar nach (Sperrzeit-Versprechen, #132) — prominent im Kopf, wo Daten vorliegen */}
            {produkt.belastbarNach && (
              <p className="text-cyan-text mt-2 mb-0" style={{ fontSize: 16, fontWeight: 700 }}>
                {dict.produkte.belastbar_nach}: {produkt.belastbarNach}
                {produkt.belastbarNachZusatz && (
                  <span className="text-navy/60" style={{ fontWeight: 600 }}> ({produkt.belastbarNachZusatz})</span>
                )}
              </p>
            )}
            {/* Bezugsquellen-Hinweis (Rapid Set: exklusiv über den Fachhandel) —
                Google-Direkteinstieg auf die PDP ist der Normalfall (Korb 2) */}
            {getBereichBySlug(produkt.bereich)?.haendlerHinweis && (
              <div
                className="flex items-start gap-3 bg-icon-bg rounded-xl mt-5"
                style={{ padding: "16px 18px", maxWidth: 700 }}
              >
                <AppIcon icon={Info} width={20} height={20} strokeWidth={2} className="text-cyan-text shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-navy text-[14px] m-0 leading-[1.6]">
                  {(dict.bereiche as Record<string, string>).haendler_hinweis}
                </p>
              </div>
            )}
          </div>
          {produkt.bild && (
            <div className="shrink-0 flex justify-center">
              <Image
                src={withBasePath(produkt.bild)}
                alt={produkt.name}
                width={180}
                height={240}
                priority
                className="object-contain drop-shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Auf einen Blick: Vorteile + Einsatzbereiche + Varianten (scannbarer Kopf) */}
      {hatKopfInhalt && (
      <section style={{ padding: "0 32px 8px" }}>
        <div className="mx-auto flex flex-col gap-12" style={{ maxWidth: 1320 }}>
          {/* Vorteile / Auf einen Blick */}
          {produkt.besonderheiten.length > 0 && (
          <div>
            <h2 className="mb-5" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
              {dict.produkte.highlights_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              {produkt.besonderheiten.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-cyan-text mt-0.5">
                    <AppIcon icon={CircleCheck} width={18} height={18} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="text-navy text-[15px] leading-[1.55]">{b}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Einsatzbereiche (optional, Content via KORODUR-Claude) */}
          {produkt.einsatzbereiche && produkt.einsatzbereiche.length > 0 && (
            <div>
              <h2 className="mb-5" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
                {dict.produkte.einsatzbereiche_title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {produkt.einsatzbereiche.map((e, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-cyan-text mt-0.5">
                      <AppIcon icon={MapPin} width={18} height={18} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-navy text-[15px] leading-[1.55]">{e}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Varianten-Vergleichstabelle (#110) */}
          {varianten.length > 0 && (
            <div>
              <h2 className="mb-5" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
                {dict.produkte.varianten_title}
              </h2>
              <div
                className="overflow-x-auto bg-white"
                style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.06)" }}
                tabIndex={0}
                role="region"
                aria-label={dict.produkte.varianten_title}
              >
                <table className="w-full border-collapse" style={{ minWidth: 480 }}>
                  <caption className="sr-only">{dict.produkte.varianten_title}</caption>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--icon-bg)" }}>
                      <th scope="col" className="text-left text-navy/60 text-[12px] uppercase tracking-wider px-6 py-3" style={{ fontWeight: 700 }}>
                        {dict.produkte.variante_col_name}
                      </th>
                      {varHatKlasse && (
                        <th scope="col" className="text-left text-navy/60 text-[12px] uppercase tracking-wider px-6 py-3" style={{ fontWeight: 700 }}>
                          {dict.produkte.variante_col_klasse}
                        </th>
                      )}
                      {varHatHinweis && (
                        <th scope="col" className="text-left text-navy/60 text-[12px] uppercase tracking-wider px-6 py-3" style={{ fontWeight: 700 }}>
                          {dict.produkte.variante_col_hinweis}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {varianten.map((v, i) => (
                      <tr key={v.name} style={i < varianten.length - 1 ? { borderBottom: "1px solid var(--icon-bg)" } : {}}>
                        <th scope="row" className="text-left text-navy text-[14px] px-6 py-3.5" style={{ fontWeight: 700 }}>{v.name}</th>
                        {varHatKlasse && (
                          <td className="text-navy/80 text-[14px] px-6 py-3.5">{v.qualitaetsklasse ?? "–"}</td>
                        )}
                        {varHatHinweis && (
                          <td className="text-navy/80 text-[14px] px-6 py-3.5">{v.hinweis ?? "–"}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {/* Technical Data + Norms */}
      <section className="bg-icon-bg" style={{ padding: "64px 32px 72px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className={produkt.normen.length > 0 ? "grid grid-cols-1 lg:grid-cols-2 gap-12" : "grid grid-cols-1"}>
            {/* Technical Data */}
            <div>
              <h2
                className="mb-6"
                style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}
              >
                {dict.detail.technical_data}
              </h2>
              <div
                className="bg-white overflow-hidden"
                style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.06)" }}
              >
                {produkt.technischeDaten.map((td, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-baseline gap-4 px-6 py-4"
                    style={i < produkt.technischeDaten.length - 1 ? { borderBottom: "1px solid var(--icon-bg)" } : {}}
                  >
                    <span className="text-navy opacity-60 text-[14px]">{td.label}</span>
                    <span className="text-navy text-[14px] text-right" style={{ fontWeight: 700 }}>
                      {td.wert}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Norms (Besonderheiten/Vorteile stehen jetzt im scannbaren Kopf "Auf einen Blick") */}
            {produkt.normen.length > 0 && (
              <div>
                <h2
                  className="mb-6"
                  style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}
                >
                  {dict.detail.norms}
                </h2>
                <NormenChips normen={produkt.normen} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Verarbeitungshinweise */}
      {produkt.verarbeitung && (
        <section style={{ padding: "64px 32px 72px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="mb-6" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
              {dict.produkte.verarbeitung_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: dict.produkte.untergrundvorbereitung, value: produkt.verarbeitung.untergrundvorbereitung },
                { label: dict.produkte.mischverhaeltnis, value: produkt.verarbeitung.mischverhaeltnis },
                { label: dict.produkte.schichtaufbau, value: produkt.verarbeitung.schichtaufbau },
                { label: dict.produkte.verarbeitungszeit, value: produkt.verarbeitung.verarbeitungszeit },
                { label: dict.produkte.aushaertezeit, value: produkt.verarbeitung.aushaertezeit },
                { label: dict.produkte.besonderheiten_verarbeitung, value: produkt.verarbeitung.besonderheiten },
              ]
                .filter(({ value }) => value)
                .map(({ label, value }) => (
                  <div key={label} className="p-5 bg-icon-bg" style={{ borderRadius: 14 }}>
                    <div className="text-sm text-navy/72 mb-1" style={{ fontWeight: 700 }}>{label}</div>
                    <div className="text-navy">{value}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Downloads & Dokumente: TDS/SDS/DoP/Anwendung/Pflege je Produkt + Ausschreibungstext
          (Launch-Plan M3 — "alle wichtigen Dokumente auf der Produktseite"; LV-Deeplink #136) */}
      <section style={{ padding: "56px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h2
            className="mb-6"
            style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}
          >
            {dict.produkte.downloads_title}
          </h2>
          <div style={{ maxWidth: 760 }}>
            {sichtbareDokumente.length > 0 && (
              <DokumentListe
                dokumente={dokumente}
                lang={lang}
                labels={dict.produkte as Record<string, string>}
                sprachDedup
                gruppieren
              />
            )}
            {dokumente.length > 0 && (
              <Link
                href={`/${lang}/downloads/?produkt=${produkt.id}`}
                className="inline-flex items-center gap-1.5 text-cyan-text text-[14px] no-underline hover:underline mt-4"
                style={{ fontWeight: 700 }}
              >
                {dict.downloads.alle_produkt} →
              </Link>
            )}
            <a
              href={lvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white no-underline mt-4 group hover:shadow-md transition-shadow"
              style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.06)", padding: "16px 20px" }}
            >
              <AppIcon icon={FileText} width={20} height={20} strokeWidth={2} className="text-cyan-text shrink-0" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-navy text-[15px] group-hover:text-cyan-text transition-colors" style={{ fontWeight: 700 }}>
                  {dict.produkte.lv_titel}
                </span>
                <span className="text-navy/60 text-[13px]">
                  {lvUrlSpezifisch ? dict.produkte.lv_produkt : dict.produkte.lv_katalog}
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Related References */}
      {relatedRefs.length > 0 && (
        <section style={{ padding: "72px 32px 88px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2
              className="mb-8"
              style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}
            >
              {dict.produkte.referenzen_title}
            </h2>
            <TileGrid columns={relatedRefs.length >= 3 ? 3 : 2}>
              {relatedRefs.slice(0, 3).map((r) => (
                <ReferenceCard key={r.id} referenz={r} lang={lang} />
              ))}
            </TileGrid>
            {relatedRefs.length > 3 && (
              <div className="mt-8 text-center">
                <Link
                  href={`/${lang}/referenzen/?produkt=${encodeURIComponent(produkt.name)}`}
                  className="text-cyan-text no-underline hover:underline"
                  style={{ fontWeight: 700 }}
                >
                  {dict.produkte.referenzen_alle} →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Fachberater zum Bereich (Funnel-Karten, Korb 2) — locale-abhängig (#186) */}
      {fachberaterFuerBereich(produkt.bereich, lang).length > 0 && (
        <section className="bg-icon-bg" style={{ padding: "56px 32px 64px" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2 className="mb-6" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, lineHeight: 1.15 }}>
              {dict.kontakt.fachberater_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fachberaterFuerBereich(produkt.bereich, lang).map((b) => (
                <BeraterCard key={`${b.name}-${b.email}`} berater={b} plzLabel={dict.kontakt.fachberater_plz} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy" style={{ padding: "48px 32px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 700 }}>
          <p className="text-lg text-white mb-4" style={{ fontWeight: 700 }}>
            {dict.produkte.cta_verarbeitung}
          </p>
          <Link
            href={kontaktPath(lang)}
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-navy no-underline rounded-[6px] transition-colors"
            style={{ padding: "14px 28px", fontWeight: 800, fontSize: 15 }}
          >
            {dict.produkte.cta_kontakt_button}
          </Link>
        </div>
      </section>
    </>
  );
}

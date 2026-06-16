import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "../../../components/Breadcrumb";
import { produkte } from "../../../data/produkte";
import { bereiche } from "../../../data/bereiche";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { localizeProdukte } from "../../../data/i18n/getLocalized";
import { withBasePath } from "../../../lib/basePath";
import { alternatesFor } from "../../../lib/seo";
import {
  PRODUKTART_REIHENFOLGE,
  produktartVonGruppe,
  type Produktart,
} from "../../../data/produktart";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.produkte.title,
    description: dict.produkte.subtitle,
    alternates: alternatesFor(lang, "/produkte/"),
  };
}

export default async function ProduktePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const localizedProdukte = await localizeProdukte(produkte, lang);
  const bereichTexte = dict.bereiche as Record<string, string>;

  // Gruppierung nach korodur.de-Bereich (Website-Integration Stufe 1).
  // Anker-Chips statt Filter-State: Inhalte bleiben in situ erreichbar,
  // mit jedem migrierten Bereich (Stufe 2) wächst die Liste automatisch.
  const grouped = bereiche
    .map((b) => ({
      slug: b.slug,
      label: bereichTexte[`${b.slug}_name`] ?? b.slug,
      items: localizedProdukte.filter((p) => p.bereich === b.slug),
    }))
    .filter((g) => g.items.length > 0);

  type LP = (typeof localizedProdukte)[number];

  // Industrieboden nach Rolle gliedern (#93): Bodenprodukte zuerst, dann
  // Haftbrücken/Untergrund, dann Oberflächenfinish. Andere Bereiche: flaches Grid.
  const rollenLabel: Record<Produktart, string> = {
    bodenprodukt: dict.produkte.produktart_bodenprodukt,
    haftbruecke: dict.produkte.produktart_haftbruecke,
    oberflaechenfinish: dict.produkte.produktart_oberflaechenfinish,
  };
  const rollenBuckets = (items: LP[]) =>
    PRODUKTART_REIHENFOLGE.map((art) => ({
      art,
      label: rollenLabel[art],
      // unmappte Gruppen defensiv den Bodenprodukten zuschlagen (kein Produkt verlieren)
      items: items.filter(
        (p) => (produktartVonGruppe(p.produktgruppe) ?? "bodenprodukt") === art,
      ),
    })).filter((bucket) => bucket.items.length > 0);

  const KartenGrid = ({ items }: { items: LP[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((produkt) => (
        <Link
          key={produkt.id}
          href={`/${lang}/produkte/${produkt.id}`}
          className="no-underline group block"
        >
          <div
            className="bg-white p-6 flex flex-row gap-5 h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"
            style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.08)" }}
          >
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-navy text-[17px] m-0" style={{ fontWeight: 900 }}>
                  {produkt.name}
                </h3>
                {produkt.qualitaetsklasse && (
                  <span
                    className="text-[10px] text-white uppercase tracking-wider px-2 py-0.5 rounded shrink-0"
                    style={{ backgroundColor: "var(--cyan)", fontWeight: 700 }}
                  >
                    {produkt.qualitaetsklasse}
                  </span>
                )}
              </div>
              <p className="text-navy opacity-60 text-[14px] m-0 leading-[1.5]">
                {produkt.kurzbeschreibung}
              </p>
              {produkt.schichtdicke && (
                <p className="text-cyan-text text-[12px] m-0" style={{ fontWeight: 700 }}>
                  {dict.produkte.layer_thickness}: {produkt.schichtdicke}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {produkt.normen.slice(0, 2).map((norm) => (
                  <span
                    key={norm}
                    className="text-[10px] text-navy opacity-50 px-2 py-0.5 rounded"
                    style={{ backgroundColor: "var(--icon-bg)", fontWeight: 600 }}
                  >
                    {norm}
                  </span>
                ))}
                {produkt.normen.length > 2 && (
                  <span className="text-[10px] text-navy opacity-30 px-1 py-0.5">
                    +{produkt.normen.length - 2}
                  </span>
                )}
              </div>
            </div>
            {produkt.bild && (
              <div className="shrink-0 flex items-center">
                <Image
                  src={withBasePath(produkt.bild)}
                  alt={produkt.name}
                  width={90}
                  height={120}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb items={[{ label: dict.produkte.breadcrumb }]} lang={lang} />
        </div>
      </section>

      <section style={{ padding: "0 32px 48px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h1
            className="mb-3"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {dict.produkte.title}
          </h1>

          {/* Subline bewusst entfernt (Steffi 2026-06-13, #95): nicht mehr nur
              Sanierungsprodukte. Der Text lebt weiter als Meta-Description. */}

          {/* Bereichs-Anker-Chips (springen zu den Gruppen, kein Filter-State) */}
          <div className="flex flex-wrap gap-2 mt-6">
            {grouped.map((group) => (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="inline-flex items-center rounded-full border border-bullet-bg bg-white text-navy text-[14px] no-underline transition-colors duration-150 hover:border-cyan hover:text-cyan-text"
                style={{ padding: "10px 18px", fontWeight: 700, minHeight: 44 }}
              >
                {group.label}
                <span className="ml-2 text-navy/40 text-[12px]" style={{ fontWeight: 600 }}>
                  {group.items.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {grouped.map((group) => (
        <section
          key={group.slug}
          className="bg-icon-bg scroll-mt-20"
          style={{ padding: "56px 32px 64px" }}
          id={group.slug}
        >
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <h2
              className="mb-6"
              style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}
            >
              {group.label}
            </h2>
            {group.slug === "industrieboden" ? (
              <div className="flex flex-col gap-10">
                {rollenBuckets(group.items).map((bucket) => (
                  <div key={bucket.art}>
                    <h3
                      className="mb-4 text-navy/70 uppercase"
                      style={{ fontSize: "clamp(14px, 1.6vw, 17px)", fontWeight: 800, letterSpacing: "0.04em" }}
                    >
                      {bucket.label}
                      <span className="ml-2 text-navy/30 text-[13px]" style={{ fontWeight: 600 }}>
                        {bucket.items.length}
                      </span>
                    </h3>
                    <KartenGrid items={bucket.items} />
                  </div>
                ))}
              </div>
            ) : (
              <KartenGrid items={group.items} />
            )}
          </div>
        </section>
      ))}
    </>
  );
}

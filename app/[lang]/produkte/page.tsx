import type { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import ProdukteListe, {
  type BereichsGruppe,
  type ProduktKarte,
} from "../../../components/ProdukteListe";
import { produkte } from "../../../data/produkte";
import { bereiche } from "../../../data/bereiche";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { localizeProdukte } from "../../../data/i18n/getLocalized";
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

  type LP = (typeof localizedProdukte)[number];
  const toKarte = (p: LP): ProduktKarte => ({
    id: p.id,
    name: p.name,
    kurzbeschreibung: p.kurzbeschreibung,
    qualitaetsklasse: p.qualitaetsklasse,
    schichtdicke: p.schichtdicke,
    normen: p.normen,
    bild: p.bild,
  });

  const rollenLabel: Record<Produktart, string> = {
    bodenprodukt: dict.produkte.produktart_bodenprodukt,
    haftbruecke: dict.produkte.produktart_haftbruecke,
    oberflaechenfinish: dict.produkte.produktart_oberflaechenfinish,
  };

  // Gruppierung nach korodur.de-Bereich. Industrieboden zusätzlich nach
  // Produktart-Rolle (#93): Bodenprodukte zuerst, dann Haftbrücken, dann Finish.
  const gruppen: BereichsGruppe[] = bereiche
    .map((b): BereichsGruppe | null => {
      const items = localizedProdukte.filter((p) => p.bereich === b.slug);
      if (items.length === 0) return null;
      const base: BereichsGruppe = {
        slug: b.slug,
        label: bereichTexte[`${b.slug}_name`] ?? b.slug,
        items: items.map(toKarte),
      };
      if (b.slug !== "industrieboden") return base;
      const rollen = PRODUKTART_REIHENFOLGE.map((art) => ({
        key: art,
        label: rollenLabel[art],
        // unmappte Gruppen defensiv den Bodenprodukten zuschlagen
        items: items
          .filter((p) => (produktartVonGruppe(p.produktgruppe) ?? "bodenprodukt") === art)
          .map(toKarte),
      })).filter((r) => r.items.length > 0);
      return { ...base, rollen };
    })
    .filter((g): g is BereichsGruppe => g !== null);

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb items={[{ label: dict.produkte.breadcrumb }]} lang={lang} />
        </div>
      </section>

      <section style={{ padding: "0 32px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h1
            className="mb-3"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}
          >
            {dict.produkte.title}
          </h1>
          {/* Subline bewusst entfernt (Steffi 2026-06-13, #95): nicht mehr nur
              Sanierungsprodukte. Der Text lebt weiter als Meta-Description. */}
        </div>
      </section>

      <ProdukteListe
        gruppen={gruppen}
        lang={lang}
        layerThicknessLabel={dict.produkte.layer_thickness}
        suchePlaceholder={dict.produkte.suche_placeholder}
        sucheKeine={dict.produkte.suche_keine}
        sucheReset={dict.produkte.suche_reset}
      />
    </>
  );
}

import type { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import ProdukteListe, {
  type BereichsGruppe,
  type ProduktKarte,
} from "../../../components/ProdukteListe";
import { produkte } from "../../../data/produkte";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { localizeProdukte } from "../../../data/i18n/getLocalized";
import { alternatesFor } from "../../../lib/seo";
import {
  PRODUKTART_REIHENFOLGE,
  produktartVonProdukt,
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
  const paTexte = dict.produkte as unknown as Record<string, string>;
  const bt = dict.bereiche as unknown as Record<string, string>;

  type LP = (typeof localizedProdukte)[number];
  // Bereiche je Produkt (primär + zusatz) für den Bereich-Filter (#307, Stufe 1).
  const bereicheVon = (p: LP): string[] => [p.bereich, ...(p.zusatzBereiche ?? [])];
  const toKarte = (p: LP): ProduktKarte => ({
    id: p.id,
    name: p.name,
    kurzbeschreibung: p.kurzbeschreibung,
    qualitaetsklasse: p.qualitaetsklasse,
    schichtdicke: p.schichtdicke,
    normen: p.normen,
    bild: p.bild,
    bereiche: bereicheVon(p),
  });

  // Zweistufiger Filter (#307): Stufe 1 Bereich → Stufe 2 Produktart. Bereich-
  // Optionen in kuratierter Reihenfolge, nur Bereiche mit mind. einem Produkt,
  // das eine Katalog-Produktart trägt (sonst liefe der Produktart-Filter leer).
  const BEREICH_FILTER_ORDER = [
    "industrieboden",
    "rapid-set",
    "infrastruktur",
    "microtop",
    "spezialmoertel",
  ];
  const bereicheMitProduktart = new Set(
    localizedProdukte.flatMap((p) => (produktartVonProdukt(p) ? bereicheVon(p) : []))
  );
  const bereichOptionen = BEREICH_FILTER_ORDER.filter((s) =>
    bereicheMitProduktart.has(s)
  ).map((slug) => ({
    slug,
    // Bereich „microtop" als Use-Case „TW-Behältersanierung" labeln (Steffi):
    // der Bereich umfasst auch Nicht-MICROTOP-Produkte für Trinkwasser-Sanierung.
    label: slug === "microtop" ? bt.microtop_menu : bt[`${slug}_name`] ?? slug,
  }));

  // Achse A „Portfolio" (#306/#307): Gruppierung nach Katalog-Produktart in
  // Lieferkatalog-Reihenfolge. Anker-Slug = Produktart-Wert (Deep-Links aus dem
  // Portfolio-Mega-Menü, #309). Produkte ohne Katalog-Produktart (Systeme,
  // Katzenstreu) landen in einer „Weitere"-Sammelgruppe, damit nichts verschwindet.
  const gruppen: BereichsGruppe[] = PRODUKTART_REIHENFOLGE.map(
    (art): BereichsGruppe | null => {
      const items = localizedProdukte.filter((p) => produktartVonProdukt(p) === art);
      if (items.length === 0) return null;
      return {
        slug: art,
        label: paTexte[`produktart_${art}`] ?? art,
        items: items.map(toKarte),
      };
    }
  ).filter((g): g is BereichsGruppe => g !== null);

  const ohneProduktart = localizedProdukte.filter((p) => !produktartVonProdukt(p));
  if (ohneProduktart.length > 0) {
    gruppen.push({
      slug: "weitere",
      label: paTexte.produktart_weitere ?? "Weitere Produkte",
      items: ohneProduktart.map(toKarte),
    });
  }

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <Breadcrumb items={[{ label: dict.produkte.breadcrumb }]} lang={lang} />
        </div>
      </section>

      {/* Text-Header-Standard (#297): Top 16px bei Seiten mit Breadcrumb. */}
      <section style={{ padding: "16px 32px 24px" }}>
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
        bereichOptionen={bereichOptionen}
        lang={lang}
        layerThicknessLabel={dict.produkte.layer_thickness}
        suchePlaceholder={dict.produkte.suche_placeholder}
        sucheKeine={dict.produkte.suche_keine}
        sucheReset={dict.produkte.suche_reset}
        bereichAlleLabel={paTexte.filter_bereich_all ?? "Alle Bereiche"}
        produktartAlleLabel={paTexte.filter_produktart_all ?? "Alle Produktarten"}
        bereichLabel={paTexte.filter_bereich_label ?? "Bereich"}
        produktartLabel={paTexte.filter_produktart_label ?? "Produktart"}
        filterReset={paTexte.filter_reset ?? "Filter zurücksetzen"}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "../../../../components/Breadcrumb";
import ReferenceCard from "../../../../components/ReferenceCard";
import ReferenzPdf from "../../../../components/ReferenzPdf";
import ImageGallery from "../../../../components/ImageGallery";
import { referenzen, getReferenzBySlug } from "../../../../data/referenzen";
import { getProdukteByNames } from "../../../../data/produkte";
import { bereichLabel } from "../../../../data/einsatzbereichMapping";
import { isPublicReference, selectRelatedReferences } from "../../../../data/referenceDetail";
import type { Referenz } from "../../../../data/types";
import { withBasePath } from "../../../../lib/basePath";
import { getDictionary, hasLocale } from "../../dictionaries";
import { LOCALES } from "../../../../lib/i18n";
import { notFound } from "next/navigation";
import { localizeReferenz, localizeReferenzen, localizeProdukte } from "../../../../data/i18n/getLocalized";

type Lang = "de" | "en" | "fr" | "pl";

const container = { maxWidth: 1080 };
const sectionPad = { padding: "0 24px 16px" };
const cardStyle = {
  backgroundColor: "#fff",
  border: "1px solid #e2e8ef",
  borderRadius: 8,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const base = getReferenzBySlug(slug);
  if (!base || !isPublicReference(base)) return {};
  const ref = await localizeReferenz(base, lang as Lang);
  return {
    title: `${ref.titel} - ${ref.ort}`,
    description: ref.untertitel,
    openGraph: {
      title: ref.titel,
      description: ref.untertitel,
      images: [withBasePath(ref.bild)],
    },
  };
}

export function generateStaticParams() {
  return referenzen
    .filter(isPublicReference)
    .flatMap((r) => LOCALES.map((lang) => ({ lang, slug: r.slug })));
}

function projectTypeLabel(type: Referenz["projekttyp"]): string | null {
  if (!type) return null;
  const labels: Record<NonNullable<Referenz["projekttyp"]>, string> = {
    sanierung: "Sanierung",
    neubau: "Neubau",
    instandsetzung: "Instandsetzung",
    modernisierung: "Modernisierung",
  };
  return labels[type];
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={sectionPad}>
      <div className="mx-auto" style={container}>
        <div className="p-6 md:p-7" style={cardStyle}>
          <h2 className="text-[#002d59] text-[20px] m-0 mb-4 leading-tight" style={{ fontWeight: 900 }}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

function DetailImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={withBasePath(src)}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

function CheckList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="list-none m-0 p-0 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[#002d59] text-[15px] leading-[1.55]">
          <span className="text-[#00a9e0] mt-1" aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LabeledImage({
  image,
  label,
  priority,
}: {
  image: NonNullable<Referenz["bilder"]>["vorher"];
  label: string;
  priority?: boolean;
}) {
  if (!image) return null;
  return (
    <div className="overflow-hidden" style={cardStyle}>
      <div className="relative" style={{ aspectRatio: "4/3", backgroundColor: "#f4f6f8" }}>
        <DetailImage
          src={image.src}
          alt={image.alt ?? image.caption ?? label}
          sizes="(max-width: 820px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <span
          className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-[4px] text-[#002d59]"
          style={{ backgroundColor: "#e7f0fa", fontWeight: 800 }}
        >
          {label}
        </span>
        {image.caption && <span className="text-[13px] text-[#5d6b7a]">{image.caption}</span>}
      </div>
    </div>
  );
}

function renderResult(referenz: Referenz) {
  if (Array.isArray(referenz.ergebnis)) return <CheckList items={referenz.ergebnis} />;
  if (referenz.ergebnis) {
    return <p className="text-[#002d59] text-[15px] leading-[1.7] m-0">{referenz.ergebnis}</p>;
  }
  return <CheckList items={referenz.vorteile} />;
}

export default async function ReferenzDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const baseReferenz = getReferenzBySlug(slug);

  if (!baseReferenz || !isPublicReference(baseReferenz)) {
    notFound();
  }

  const referenz = await localizeReferenz(baseReferenz, lang as Lang);
  const primaryEinsatzbereich = referenz.einsatzbereiche?.[0];
  const kategorieLabel = primaryEinsatzbereich ? bereichLabel(primaryEinsatzbereich, lang) : "";
  const projectLabel = projectTypeLabel(referenz.projekttyp);
  const baseProduktDetails = getProdukteByNames(referenz.produkte);
  const produktDetails = await localizeProdukte(baseProduktDetails, lang as Lang);
  const baseRelated = selectRelatedReferences(referenz, referenzen);
  const related = await localizeReferenzen(baseRelated, lang as Lang);
  const isAnonymized = referenz.releaseStatus === "oeffentlich-anonymisiert";

  const imagePair =
    referenz.projekttyp === "sanierung" && referenz.bilder?.vorher && referenz.bilder?.nachher
      ? { left: referenz.bilder.vorher, leftLabel: "Vorher", right: referenz.bilder.nachher, rightLabel: "Nachher" }
      : referenz.bilder?.einbau && referenz.bilder?.ergebnis
        ? { left: referenz.bilder.einbau, leftLabel: "Einbau", right: referenz.bilder.ergebnis, rightLabel: "Ergebnis" }
        : null;

  const facts = [
    { label: "Ort", value: `${referenz.ort}${referenz.land ? `, ${referenz.land}` : ""}` },
    { label: "Baujahr", value: referenz.jahr?.toString() },
    { label: "Fläche", value: referenz.flaeche },
    { label: "Menge", value: referenz.menge },
    { label: "Projekttyp", value: projectLabel },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  const installationRows = [
    ...(referenz.umsetzung ?? []),
    ...(referenz.menge && !referenz.umsetzung?.some((row) => row.label === "Eingebaute Menge")
      ? [{ label: "Eingebaute Menge", value: referenz.menge }]
      : []),
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  const solutionImage = referenz.bilder?.loesung ?? referenz.bilder?.einbau;
  const parties = (referenz.beteiligte ?? []).filter((party) => party.name || party.role);
  const showSituation = Boolean(referenz.ausgangssituation || referenz.herausforderungen.length > 0);
  const showResult = Boolean(referenz.ergebnis || referenz.vorteile.length > 0 || referenz.langzeit);

  return (
    <>
      <section style={{ padding: "0 24px" }}>
        <div className="mx-auto" style={container}>
          <Breadcrumb
            items={[
              { label: dict.referenzen.breadcrumb, href: `/${lang}/referenzen/` },
              { label: referenz.titel },
            ]}
            lang={lang}
          />
        </div>
      </section>

      <section style={sectionPad}>
        <div className="mx-auto" style={container}>
          <div className="p-6 md:p-7" style={cardStyle}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {kategorieLabel && (
                <span
                  className="text-[11px] uppercase tracking-wide px-3 py-1 rounded-[4px] text-[#002d59]"
                  style={{ backgroundColor: "#e7f0fa", fontWeight: 800 }}
                >
                  {kategorieLabel}
                </span>
              )}
              {projectLabel && (
                <span
                  className="text-[11px] uppercase tracking-wide px-3 py-1 rounded-[4px] text-[#0079a3]"
                  style={{ backgroundColor: "#e9f7fc", fontWeight: 800 }}
                >
                  {projectLabel}
                </span>
              )}
              {isAnonymized && (
                <span
                  className="text-[11px] uppercase tracking-wide px-3 py-1 rounded-[4px] text-[#5d6b7a]"
                  style={{ backgroundColor: "#f4f6f8", fontWeight: 800 }}
                >
                  Anonymisierte Referenz
                </span>
              )}
            </div>
            <h1 className="text-[#002d59] m-0 mb-2 leading-tight" style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 900 }}>
              {referenz.titel}
            </h1>
            <p className="text-[#0079a3] text-[18px] m-0 mb-3" style={{ fontWeight: 800 }}>
              {referenz.untertitel}
            </p>
            {referenz.ausgangssituation && (
              <p className="text-[#1c2a3a] text-[15px] leading-[1.7] m-0" style={{ maxWidth: "68ch" }}>
                {referenz.ausgangssituation}
              </p>
            )}
          </div>
        </div>
      </section>

      {imagePair && (
        <section style={sectionPad}>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4" style={container}>
            <LabeledImage image={imagePair.left} label={imagePair.leftLabel} priority />
            <LabeledImage image={imagePair.right} label={imagePair.rightLabel} priority />
          </div>
        </section>
      )}

      <section style={sectionPad}>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-4" style={container}>
          <div className="p-5" style={cardStyle}>
            <div className="flex flex-col">
              {facts.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 py-2 border-b border-[#e2e8ef] last:border-b-0">
                  <span className="text-[11px] uppercase tracking-wide text-[#5d6b7a]" style={{ fontWeight: 800 }}>
                    {row.label}
                  </span>
                  <span className="text-[#002d59] text-[14px] text-right" style={{ fontWeight: 800 }}>
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 py-2 border-b border-[#e2e8ef]">
                <span className="text-[11px] uppercase tracking-wide text-[#5d6b7a]" style={{ fontWeight: 800 }}>
                  Produkte
                </span>
                <div className="flex flex-wrap justify-end gap-2">
                  {produktDetails.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${lang}/produkte/${product.id}/`}
                      className="text-[12px] text-white no-underline rounded-[4px] px-2.5 py-1"
                      style={{ backgroundColor: "#002d59", fontWeight: 800 }}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <ReferenzPdf referenz={referenz} produkt={produktDetails[0]} />
              </div>
            </div>
          </div>

          {referenz.kennwerte && referenz.kennwerte.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {referenz.kennwerte.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="text-center p-4 rounded-[8px] bg-[#002d59]">
                  <div className="text-white text-[22px] leading-tight" style={{ fontWeight: 900 }}>
                    {metric.value}
                  </div>
                  <div className="text-[#bfd0e3] text-[11px] mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {referenz.galerieBilder && referenz.galerieBilder.length > 0 && (
        <DetailSection title="Bildergalerie">
          <ImageGallery images={referenz.galerieBilder} alt={referenz.titel} />
        </DetailSection>
      )}

      {showSituation && (
        <DetailSection title="Ausgangssituation und Herausforderung">
          {referenz.ausgangssituation && (
            <p className="text-[#002d59] text-[15px] leading-[1.7] mt-0 mb-5">{referenz.ausgangssituation}</p>
          )}
          <CheckList items={referenz.herausforderungen} />
        </DetailSection>
      )}

      <DetailSection title="Unsere Lösung">
        <div className={solutionImage ? "grid grid-cols-1 md:grid-cols-2 gap-5 items-start" : ""}>
          <div>
            <p className="text-[#002d59] text-[15px] leading-[1.7] mt-0 mb-4">{referenz.loesung}</p>
            {produktDetails[0] && (
              <Link
                href={`/${lang}/produkte/${produktDetails[0].id}/`}
                className="inline-flex text-[#0079a3] text-[14px] no-underline hover:underline"
                style={{ fontWeight: 800 }}
              >
                Produktdetails {produktDetails[0].name} ansehen
              </Link>
            )}
          </div>
          {solutionImage && (
            <div className="relative overflow-hidden rounded-[8px] bg-[#f4f6f8]" style={{ aspectRatio: "4/3" }}>
              <DetailImage
                src={solutionImage.src}
                alt={solutionImage.alt ?? solutionImage.caption ?? "Einbau der KORODUR-Lösung"}
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </DetailSection>

      {installationRows.length > 0 && (
        <DetailSection title="Umsetzung und Kennwerte">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {installationRows.map((row) => (
              <div key={`${row.label}-${row.value}`} className="rounded-[8px] bg-[#f4f6f8] px-4 py-3">
                <div className="text-[11px] text-[#5d6b7a] uppercase tracking-wide" style={{ fontWeight: 800 }}>
                  {row.label}
                </div>
                <div className="text-[#002d59] text-[14px]" style={{ fontWeight: 800 }}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {showResult && (
        <DetailSection title="Ergebnis und Wirkung">
          {renderResult(referenz)}
          {referenz.langzeit && (
            <p className="text-[#002d59] text-[15px] leading-[1.7] mb-0 mt-5">
              <strong>Langzeit-Beobachtung:</strong> {referenz.langzeit}
            </p>
          )}
        </DetailSection>
      )}

      {referenz.nachhaltigkeit && (
        <DetailSection title="Nachhaltigkeit">
          <p className="text-[#002d59] text-[15px] leading-[1.7] mt-0">{referenz.nachhaltigkeit.text}</p>
          {referenz.nachhaltigkeit.facts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {referenz.nachhaltigkeit.facts.map((fact) => (
                <div key={`${fact.label}-${fact.value}`} className="rounded-[8px] bg-[#f4f6f8] px-4 py-3">
                  <div className="text-[11px] text-[#5d6b7a] uppercase tracking-wide" style={{ fontWeight: 800 }}>
                    {fact.label}
                  </div>
                  <div className="text-[#002d59] text-[14px]" style={{ fontWeight: 800 }}>
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DetailSection>
      )}

      <DetailSection title="Eingesetzte Produkte">
        <div className="flex flex-col gap-4">
          {produktDetails.map((produkt) => (
            <div key={produkt.id} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5 rounded-[8px] border border-[#e2e8ef] p-4">
              {produkt.bild && (
                <div className="relative overflow-hidden rounded-[8px] bg-[#f4f6f8]" style={{ aspectRatio: "4/3" }}>
                  <DetailImage
                    src={produkt.bild}
                    alt={produkt.name}
                    sizes="(max-width: 820px) 100vw, 220px"
                  />
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-[#002d59] text-[18px] m-0" style={{ fontWeight: 900 }}>
                    {produkt.name}
                  </h3>
                  {produkt.qualitaetsklasse && (
                    <span className="text-[11px] text-[#5d6b7a] px-2 py-1 rounded-[4px] bg-[#eef2f6]" style={{ fontWeight: 800 }}>
                      {produkt.qualitaetsklasse}
                    </span>
                  )}
                </div>
                <p className="text-[#5d6b7a] text-[14px] leading-[1.6] mt-0 mb-4">{produkt.kurzbeschreibung}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {produkt.technischeDaten.slice(0, 6).map((td) => (
                    <div key={`${produkt.id}-${td.label}`} className="rounded-[8px] bg-[#f4f6f8] px-3 py-2">
                      <div className="text-[11px] text-[#5d6b7a]">{td.label}</div>
                      <div className="text-[#002d59] text-[13px]" style={{ fontWeight: 800 }}>
                        {td.wert}
                      </div>
                    </div>
                  ))}
                </div>
                {produkt.normen.length > 0 && (
                  <p className="text-[#5d6b7a] text-[13px] mt-4 mb-0">
                    <strong className="text-[#002d59]">Normen und Zulassungen:</strong> {produkt.normen.join(" · ")}
                  </p>
                )}
                <Link
                  href={`/${lang}/produkte/${produkt.id}/`}
                  className="inline-flex mt-4 text-[#0079a3] text-[14px] no-underline hover:underline"
                  style={{ fontWeight: 800 }}
                >
                  {dict.sanierung.view_product}
                </Link>
              </div>
            </div>
          ))}
          {referenz.produkte
            .filter((name) => !produktDetails.find((p) => p.name === name))
            .map((name) => (
              <div key={name} className="rounded-[8px] border border-[#e2e8ef] p-4 text-[#002d59]" style={{ fontWeight: 800 }}>
                {name}
              </div>
            ))}
        </div>
      </DetailSection>

      {parties.length > 0 && (
        <DetailSection title="Beteiligte">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {parties.map((party) => (
              <div key={`${party.role}-${party.name}`} className="flex items-baseline justify-between gap-4 rounded-[8px] bg-[#f4f6f8] px-4 py-3">
                <span className="text-[#5d6b7a] text-[13px]">{party.role}</span>
                <span className="text-[#002d59] text-[14px] text-right" style={{ fontWeight: 800 }}>
                  {isAnonymized || party.anonymized ? party.role : party.name}
                </span>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {related.length > 0 && (
        <DetailSection title={dict.detail.related}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <ReferenceCard key={r.id} referenz={r} lang={lang} />
            ))}
          </div>
        </DetailSection>
      )}

      <section style={{ padding: "16px 24px 40px" }}>
        <div className="mx-auto text-center p-7 rounded-[8px] bg-[#002d59]" style={container}>
          <h2 className="text-white text-[22px] m-0 mb-2" style={{ fontWeight: 900 }}>
            Ähnliches Projekt?
          </h2>
          <p className="text-[#bfd0e3] text-[15px] mt-0 mb-5">
            Unsere technischen Berater helfen Ihnen, die optimale Sanierungslösung zu finden.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.korodur.de/kontakt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-[#00374a] bg-[#00a9e0] no-underline rounded-[6px] px-5 py-3"
              style={{ fontWeight: 900 }}
            >
              Berater kontaktieren
            </a>
            <Link
              href={`/${lang}/referenzen/`}
              className="inline-flex text-white no-underline rounded-[6px] px-5 py-3 border border-white"
              style={{ fontWeight: 900 }}
            >
              Alle Referenzen ansehen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

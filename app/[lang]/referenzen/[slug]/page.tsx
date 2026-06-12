import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import Breadcrumb from "../../../../components/Breadcrumb";
import ReferenceCard from "../../../../components/ReferenceCard";
import ReferenzPdf from "../../../../components/ReferenzPdf";
import ImageGallery from "../../../../components/ImageGallery";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";
import { referenzen, getReferenzBySlug } from "../../../../data/referenzen";
import { getProdukteByNames } from "../../../../data/produkte";
import { bereichLabel } from "../../../../data/einsatzbereichMapping";
import { isPublicReference, selectRelatedReferences } from "../../../../data/referenceDetail";
import type { Referenz } from "../../../../data/types";
import { withBasePath } from "../../../../lib/basePath";
import { alternatesFor } from "../../../../lib/seo";
import { kontaktPath } from "../../../../lib/kontakt";
import { getDictionary, hasLocale } from "../../dictionaries";
import { LOCALES } from "../../../../lib/i18n";
import { notFound } from "next/navigation";
import { localizeReferenz, localizeReferenzen, localizeProdukte } from "../../../../data/i18n/getLocalized";

type Lang = "de" | "en" | "fr" | "pl" | "es";

const CONTAINER = "mx-auto max-w-[1080px]";
const SECTION = "px-4 pb-4 sm:px-6";

// Uppercase-Label-Chips (Hero, Vorher/Nachher, Q-Klasse) als cva-Varianten
// statt vier per Hand kopierter Hex-Hintergründe.
const chipVariants = cva(
  "whitespace-normal rounded-[4px] px-3 py-1 text-center text-xs font-extrabold uppercase tracking-wide",
  {
    variants: {
      tone: {
        navy: "bg-bullet-bg text-navy",
        cyan: "bg-cyan/10 text-cyan-text",
        neutral: "bg-icon-bg text-muted-foreground",
      },
    },
    defaultVariants: { tone: "navy" },
  }
);

function Chip({
  tone,
  children,
}: { children: React.ReactNode } & VariantProps<typeof chipVariants>) {
  return (
    <Badge variant="secondary" className={chipVariants({ tone })}>
      {children}
    </Badge>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const base = getReferenzBySlug(slug);
  if (!base || !isPublicReference(base)) return {};
  const ref = await localizeReferenz(base, lang as Lang);
  return {
    title: `${ref.titel} - ${ref.ort}`,
    description: ref.untertitel,
    alternates: alternatesFor(lang, `/referenzen/${slug}/`),
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

function projectTypeLabel(
  type: Referenz["projekttyp"],
  detail: Record<string, string>
): string | null {
  if (!type) return null;
  return detail[`projekttyp_${type}`] ?? type;
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <Card className="gap-0 rounded-lg py-0 shadow-none">
          <CardContent className="p-5 sm:p-6 md:p-7">
            <h2 className="m-0 mb-4 text-lg font-black leading-tight text-navy sm:text-xl">
              {title}
            </h2>
            {children}
          </CardContent>
        </Card>
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
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.55] text-navy">
          <AppIcon
            icon={Check}
            width={18}
            height={18}
            strokeWidth={2.5}
            className="mt-0.5 shrink-0 text-cyan-text"
            aria-hidden="true"
          />
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
    <Card className="gap-0 overflow-hidden rounded-lg py-0 shadow-none">
      <div className="relative aspect-[4/3] bg-icon-bg">
        <DetailImage
          src={image.src}
          alt={image.alt ?? image.caption ?? label}
          sizes="(max-width: 820px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <Chip>{label}</Chip>
        {image.caption && (
          <span className="text-[13px] text-muted-foreground">{image.caption}</span>
        )}
      </div>
    </Card>
  );
}

function renderResult(referenz: Referenz) {
  if (Array.isArray(referenz.ergebnis)) return <CheckList items={referenz.ergebnis} />;
  if (referenz.ergebnis) {
    return <p className="m-0 text-[15px] leading-[1.7] text-navy">{referenz.ergebnis}</p>;
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
  const detail = dict.detail as Record<string, string>;
  const primaryEinsatzbereich = referenz.einsatzbereiche?.[0];
  const kategorieLabel = primaryEinsatzbereich ? bereichLabel(primaryEinsatzbereich, lang) : "";
  const projectLabel = projectTypeLabel(referenz.projekttyp, detail);
  const baseProduktDetails = getProdukteByNames(referenz.produkte);
  const produktDetails = await localizeProdukte(baseProduktDetails, lang as Lang);
  const baseRelated = selectRelatedReferences(referenz, referenzen);
  const related = await localizeReferenzen(baseRelated, lang as Lang);
  const isAnonymized = referenz.releaseStatus === "oeffentlich-anonymisiert";

  const imagePair =
    referenz.projekttyp === "sanierung" && referenz.bilder?.vorher && referenz.bilder?.nachher
      ? { left: referenz.bilder.vorher, leftLabel: detail.vorher, right: referenz.bilder.nachher, rightLabel: detail.nachher }
      : referenz.bilder?.einbau && referenz.bilder?.ergebnis
        ? { left: referenz.bilder.einbau, leftLabel: detail.einbau, right: referenz.bilder.ergebnis, rightLabel: detail.ergebnis }
        : null;

  const facts = [
    { label: detail.fakt_ort, value: `${referenz.ort}${referenz.land ? `, ${referenz.land}` : ""}` },
    { label: detail.fakt_baujahr, value: referenz.jahr?.toString() },
    { label: detail.fakt_flaeche, value: referenz.flaeche },
    { label: detail.fakt_menge, value: referenz.menge },
    { label: detail.fakt_projekttyp, value: projectLabel },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  const installationRows = [
    ...(referenz.umsetzung ?? []),
    // Der Vergleich läuft gegen das deutsche Daten-Label aus referenz.umsetzung,
    // das Anzeige-Label kommt lokalisiert aus dem Dictionary.
    ...(referenz.menge && !referenz.umsetzung?.some((row) => row.label === "Eingebaute Menge")
      ? [{ label: detail.eingebaute_menge, value: referenz.menge }]
      : []),
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  const solutionImage = referenz.bilder?.loesung ?? referenz.bilder?.einbau;
  const parties = (referenz.beteiligte ?? []).filter((party) => party.name || party.role);
  const showSituation = Boolean(referenz.ausgangssituation || referenz.herausforderungen.length > 0);
  const showResult = Boolean(referenz.ergebnis || referenz.vorteile.length > 0 || referenz.langzeit);

  return (
    <>
      <section className="px-4 sm:px-6">
        <div className={CONTAINER}>
          <Breadcrumb
            items={[
              { label: dict.referenzen.breadcrumb, href: `/${lang}/referenzen/` },
              { label: referenz.titel },
            ]}
            lang={lang}
          />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <Card className="gap-0 rounded-lg py-0 shadow-none">
            <CardContent className="p-5 sm:p-6 md:p-7">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {kategorieLabel && <Chip>{kategorieLabel}</Chip>}
                {projectLabel && <Chip tone="cyan">{projectLabel}</Chip>}
                {isAnonymized && <Chip tone="neutral">{detail.anonymisiert}</Chip>}
              </div>
              <h1 className="m-0 mb-2 text-[clamp(30px,5vw,44px)] font-black leading-tight text-navy">
                {referenz.titel}
              </h1>
              <p className="m-0 mb-3 text-base font-extrabold text-cyan-text sm:text-lg">
                {referenz.untertitel}
              </p>
              {referenz.ausgangssituation && (
                <p className="m-0 max-w-[68ch] text-[15px] leading-[1.7] text-navy">
                  {referenz.ausgangssituation}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {imagePair && (
        <section className={SECTION}>
          <div className={`${CONTAINER} grid grid-cols-1 gap-4 md:grid-cols-2`}>
            <LabeledImage image={imagePair.left} label={imagePair.leftLabel} priority />
            <LabeledImage image={imagePair.right} label={imagePair.rightLabel} priority />
          </div>
        </section>
      )}

      <section className={SECTION}>
        <div className={`${CONTAINER} grid grid-cols-1 gap-4 md:grid-cols-[1.25fr_1fr]`}>
          <Card className="gap-0 rounded-lg py-0 shadow-none">
            <CardContent className="flex flex-col p-5">
              {facts.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-2 last:border-b-0"
                >
                  <span className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="text-right text-sm font-extrabold text-navy">
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 border-b border-border py-2">
                <span className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                  {detail.fakt_produkte}
                </span>
                <div className="flex flex-wrap justify-end gap-2">
                  {produktDetails.map((product) => (
                    <Badge
                      key={product.id}
                      asChild
                      className="rounded-[4px] bg-navy px-2.5 py-1.5 text-xs font-extrabold text-white [a&]:hover:bg-navy/90"
                    >
                      <Link href={`/${lang}/produkte/${product.id}/`} className="no-underline">
                        {product.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <ReferenzPdf referenz={referenz} produkt={produktDetails[0]} />
              </div>
            </CardContent>
          </Card>

          {referenz.kennwerte && referenz.kennwerte.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {referenz.kennwerte.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="rounded-lg bg-navy p-4 text-center">
                  <div className="text-[22px] font-black leading-tight text-white">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs text-white/80">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {referenz.galerieBilder && referenz.galerieBilder.length > 0 && (
        <DetailSection title={detail.gallery}>
          <ImageGallery images={referenz.galerieBilder} alt={referenz.titel} />
        </DetailSection>
      )}

      {showSituation && (
        <DetailSection title={detail.situation_title}>
          {referenz.ausgangssituation && (
            <p className="mb-5 mt-0 text-[15px] leading-[1.7] text-navy">{referenz.ausgangssituation}</p>
          )}
          <CheckList items={referenz.herausforderungen} />
        </DetailSection>
      )}

      <DetailSection title={detail.solution}>
        <div className={solutionImage ? "grid grid-cols-1 items-start gap-5 md:grid-cols-2" : ""}>
          <div>
            <p className="mb-4 mt-0 text-[15px] leading-[1.7] text-navy">{referenz.loesung}</p>
            {produktDetails[0] && (
              <Link
                href={`/${lang}/produkte/${produktDetails[0].id}/`}
                className="inline-flex min-h-11 items-center text-sm font-extrabold text-cyan-text no-underline hover:underline"
              >
                {detail.produktdetails_ansehen.replace("{produkt}", produktDetails[0].name)}
              </Link>
            )}
          </div>
          {solutionImage && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-icon-bg">
              <DetailImage
                src={solutionImage.src}
                alt={solutionImage.alt ?? solutionImage.caption ?? detail.einbau_alt}
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </DetailSection>

      {installationRows.length > 0 && (
        <DetailSection title={detail.umsetzung_title}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {installationRows.map((row) => (
              <div key={`${row.label}-${row.value}`} className="rounded-lg bg-icon-bg px-4 py-3">
                <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </div>
                <div className="text-sm font-extrabold text-navy">{row.value}</div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {showResult && (
        <DetailSection title={detail.ergebnis_title}>
          {renderResult(referenz)}
          {referenz.langzeit && (
            <p className="mb-0 mt-5 text-[15px] leading-[1.7] text-navy">
              <strong>{detail.langzeit_label}</strong> {referenz.langzeit}
            </p>
          )}
        </DetailSection>
      )}

      {referenz.nachhaltigkeit && (
        <DetailSection title={detail.nachhaltigkeit_title}>
          <p className="mt-0 text-[15px] leading-[1.7] text-navy">{referenz.nachhaltigkeit.text}</p>
          {referenz.nachhaltigkeit.facts && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {referenz.nachhaltigkeit.facts.map((fact) => (
                <div key={`${fact.label}-${fact.value}`} className="rounded-lg bg-icon-bg px-4 py-3">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                    {fact.label}
                  </div>
                  <div className="text-sm font-extrabold text-navy">{fact.value}</div>
                </div>
              ))}
            </div>
          )}
        </DetailSection>
      )}

      <DetailSection title={detail.products_used}>
        <div className="flex flex-col gap-4">
          {produktDetails.map((produkt) => (
            <div
              key={produkt.id}
              className="grid grid-cols-1 gap-5 rounded-lg border border-border p-4 md:grid-cols-[220px_1fr]"
            >
              {produkt.bild && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-icon-bg">
                  <DetailImage
                    src={produkt.bild}
                    alt={produkt.name}
                    sizes="(max-width: 820px) 100vw, 220px"
                  />
                </div>
              )}
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="m-0 text-lg font-black text-navy">{produkt.name}</h3>
                  {produkt.qualitaetsklasse && (
                    <Badge variant="secondary" className="rounded-[4px] bg-icon-bg px-2 py-1 text-xs font-extrabold text-muted-foreground">
                      {produkt.qualitaetsklasse}
                    </Badge>
                  )}
                </div>
                <p className="mb-4 mt-0 text-sm leading-[1.6] text-muted-foreground">{produkt.kurzbeschreibung}</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {produkt.technischeDaten.slice(0, 6).map((td) => (
                    <div key={`${produkt.id}-${td.label}`} className="rounded-lg bg-icon-bg px-3 py-2">
                      <div className="text-xs text-muted-foreground">{td.label}</div>
                      <div className="text-[13px] font-extrabold text-navy">{td.wert}</div>
                    </div>
                  ))}
                </div>
                {produkt.normen.length > 0 && (
                  <p className="mb-0 mt-4 text-[13px] text-muted-foreground">
                    <strong className="text-navy">{detail.norms}:</strong> {produkt.normen.join(" · ")}
                  </p>
                )}
                <Link
                  href={`/${lang}/produkte/${produkt.id}/`}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-extrabold text-cyan-text no-underline hover:underline"
                >
                  {dict.sanierung.view_product}
                </Link>
              </div>
            </div>
          ))}
          {referenz.produkte
            .filter((name) => !produktDetails.find((p) => p.name === name))
            .map((name) => (
              <div key={name} className="rounded-lg border border-border p-4 font-extrabold text-navy">
                {name}
              </div>
            ))}
        </div>
      </DetailSection>

      {parties.length > 0 && (
        <DetailSection title={detail.beteiligte_title}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {parties.map((party) => (
              <div
                key={`${party.role}-${party.name}`}
                className="flex items-baseline justify-between gap-4 rounded-lg bg-icon-bg px-4 py-3"
              >
                <span className="text-[13px] text-muted-foreground">{party.role}</span>
                <span className="text-right text-sm font-extrabold text-navy">
                  {isAnonymized || party.anonymized ? party.role : party.name}
                </span>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {related.length > 0 && (
        <DetailSection title={dict.detail.related}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((r) => (
              <ReferenceCard key={r.id} referenz={r} lang={lang} />
            ))}
          </div>
        </DetailSection>
      )}

      <section className="px-4 pb-10 pt-4 sm:px-6">
        <div className={`${CONTAINER} rounded-lg bg-navy p-6 text-center sm:p-7`}>
          <h2 className="m-0 mb-2 text-[22px] font-black text-white">{dict.detail.cta_title}</h2>
          <p className="mb-5 mt-0 text-[15px] text-white/80">{dict.detail.cta_text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6 font-black">
              <Link href={kontaktPath(lang)}>{dict.detail.cta_button}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 border-white px-6 font-black text-white hover:bg-white hover:text-navy"
            >
              <Link href={`/${lang}/referenzen/`}>{dict.detail.cta_alle_referenzen}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

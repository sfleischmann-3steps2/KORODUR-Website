import Breadcrumb from "./Breadcrumb";
import ArtikelInhalt from "./ArtikelInhalt";
import ReferenceCard from "./ReferenceCard";
import { getReferenzBySlug } from "../data/referenzen";
import { localizeReferenzen } from "../data/i18n/getLocalized";

// #170: Überschrift des Praxis-Referenz-Blocks je Sprache (Artikel sind aktuell
// v. a. DE; Fallback DE). Bewusst inline statt Dictionary — generische Hülle.
const PRAXIS_LABEL: Record<string, string> = {
  de: "Referenzen aus der Praxis",
  en: "Project references",
  fr: "Références de projets",
  pl: "Referencje z praktyki",
  es: "Referencias de proyectos",
};

/** Gemeinsame Seiten-Hülle für Fachartikel (Breadcrumb + Titel + Markdown-Body
 *  + optionaler Praxis-Referenz-Teaser aus `frontmatter.referenzen`, #170). */
export default async function ArtikelSeite({
  lang,
  titel,
  breadcrumb,
  body,
  referenzenSlugs,
}: {
  lang: string;
  titel: string;
  breadcrumb: { label: string; href?: string }[];
  body: string;
  referenzenSlugs?: string[];
}) {
  const refs = (referenzenSlugs ?? [])
    .map((slug) => getReferenzBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => r !== undefined);
  const teaserRefs =
    refs.length > 0
      ? await localizeReferenzen(refs, lang as Parameters<typeof localizeReferenzen>[1])
      : [];

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <Breadcrumb items={breadcrumb} lang={lang} />
        </div>
      </section>

      <section style={{ padding: "16px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          <h1 className="mb-6" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}>
            {titel}
          </h1>
          <ArtikelInhalt lang={lang} body={body} />
        </div>
      </section>

      {/* #170: echte Referenzen als Teaser-Karten (Praxisnachweis), verlinkt auf
          die Referenz-Detailseite. */}
      {teaserRefs.length > 0 && (
        <section className="bg-icon-bg" style={{ padding: "48px 32px 56px" }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <h2 className="mb-6" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.15 }}>
              {PRAXIS_LABEL[lang] ?? PRAXIS_LABEL.de}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserRefs.map((r) => (
                <ReferenceCard key={r.id} referenz={r} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

import Breadcrumb from "./Breadcrumb";
import ArtikelInhalt from "./ArtikelInhalt";

/** Gemeinsame Seiten-Hülle für Fachartikel (Breadcrumb + Titel + Markdown-Body). */
export default function ArtikelSeite({
  lang,
  titel,
  breadcrumb,
  body,
}: {
  lang: string;
  titel: string;
  breadcrumb: { label: string; href?: string }[];
  body: string;
}) {
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
    </>
  );
}

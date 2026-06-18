import Link from "next/link";
import Breadcrumb from "./Breadcrumb";
import { getArtikel, getSlugs } from "../lib/content";

/** Ersten aussagekraeftigen Absatz aus dem (bereinigten) Markdown-Body ziehen,
 *  Markdown-Reste strippen, auf ~160 Zeichen kuerzen. Reiner Navigations-Teaser
 *  aus dem Artikel selbst, keine erfundene Copy. */
function teaser(body: string): string {
  for (const block of body.split(/\n\s*\n/)) {
    const t = block.trim();
    if (!t) continue;
    // Ueberschriften, Tabellen, Zitate, Listen, Links/HTML ueberspringen
    if (/^[#|>\-[<]/.test(t)) continue;
    const clean = t
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/\[(.+?)\]\([^)]*\)/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    if (clean.length < 30) continue;
    return clean.length > 160 ? `${clean.slice(0, 159).trimEnd()}…` : clean;
  }
  return "";
}

/** Uebersichts-Hub fuer eine Fachartikel-Kategorie: Breadcrumb + Titel + Intro
 *  + automatisch gelistete Artikel als verlinkte Karten (Teaser je Artikel). */
export default function ArtikelHub({
  lang,
  kategorie,
  routePrefix,
  titel,
  intro,
  breadcrumb,
}: {
  lang: string;
  kategorie: string;
  routePrefix: string;
  titel: string;
  intro: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  const artikel = getSlugs(kategorie, ["index"])
    .map((slug) => {
      const a = getArtikel(kategorie, slug);
      return a ? { slug, title: a.frontmatter.title, teaser: teaser(a.body) } : null;
    })
    .filter((a): a is { slug: string; title: string; teaser: string } => a !== null);

  return (
    <>
      <section style={{ padding: "0 32px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <Breadcrumb items={breadcrumb} lang={lang} />
        </div>
      </section>

      <section style={{ padding: "16px 32px 64px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <h1 className="mb-4" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, lineHeight: 1.1 }}>
            {titel}
          </h1>
          <p className="mb-8 text-navy/70" style={{ maxWidth: 720, fontSize: 18, lineHeight: 1.6 }}>
            {intro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artikel.map((a) => (
              <Link
                key={a.slug}
                href={`/${lang}${routePrefix}/${a.slug}`}
                className="group block rounded-xl border border-bullet-bg bg-white p-6 transition-shadow hover:shadow-[0_12px_28px_rgba(0,45,89,0.12)]"
              >
                <h2 className="mb-2" style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.25 }}>
                  {a.title}
                </h2>
                {a.teaser && (
                  <p className="text-navy/65" style={{ fontSize: 15, lineHeight: 1.55 }}>
                    {a.teaser}
                  </p>
                )}
                <span className="mt-4 inline-block text-cyan-text font-semibold group-hover:underline" style={{ fontSize: 14 }}>
                  Weiterlesen →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

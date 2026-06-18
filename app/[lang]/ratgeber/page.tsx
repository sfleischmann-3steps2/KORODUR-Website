import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import { alternatesFor } from "../../../lib/seo";
import { getArtikel, getSlugs, teaser } from "../../../lib/content";
import RatgeberHub, { type RatgeberCard } from "../../../components/RatgeberHub";

type Params = Promise<{ lang: string }>;

// Fachartikel sind aktuell nur auf Deutsch verfügbar (V1).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Ratgeber",
    description:
      "Fachwissen rund um Industrieböden: Neubau, Systemwahl und Sanierung. Einstieg nach Aufgabe, Schadensbild oder Branche.",
    alternates: alternatesFor(lang, "/ratgeber/"),
  };
}

// Sektion in der „Alle"-Ansicht ableiten. Branchen/Schadensbilder kommen aus
// ihren eigenen Sub-Hubs (bleiben eigene Seiten), werden hier mit-angeteasert.
function clusterFor(dir: string, themen: string[]): string {
  if (dir === "branchen") return "branche";
  if (dir === "schadensbilder") return "sanierung";
  if (themen.includes("neubau")) return "neubau";
  if (themen.includes("wirtschaftlichkeit")) return "wirtschaftlichkeit";
  return "sanierung";
}

const QUELLEN: { dir: string; route: string; themen?: string[] }[] = [
  { dir: "artikel", route: "/ratgeber" },
  // Sub-Hubs: feste Themen, da je Quelle einheitlich (kein Frontmatter nötig).
  { dir: "branchen", route: "/branchen", themen: ["branche"] },
  { dir: "schadensbilder", route: "/schadensbilder", themen: ["sanierung", "schadensbild"] },
];

function ladeKarten(): RatgeberCard[] {
  const karten: RatgeberCard[] = [];
  for (const q of QUELLEN) {
    for (const slug of getSlugs(q.dir, ["index"])) {
      const a = getArtikel(q.dir, slug);
      if (!a) continue;
      const themen = q.themen ?? ((a.frontmatter.themen as string[] | undefined) ?? []);
      karten.push({
        slug,
        route: q.route,
        title: a.frontmatter.title,
        teaser: teaser(a.body),
        themen,
        cluster: clusterFor(q.dir, themen),
        bild: a.frontmatter.bild as string | undefined,
        bildAlt: a.frontmatter.bildAlt as string | undefined,
      });
    }
  }
  return karten;
}

export default async function RatgeberHubPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <RatgeberHub lang={lang} cards={ladeKarten()} />;
}

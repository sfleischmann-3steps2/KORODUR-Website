"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import { EXPERTE_PREFIX } from "@/lib/artikelMarker";

/** Markierter Experten-/Fachprüfungs-Hinweis (#296), erzeugt aus einer
 *  `TODO(Frank)`-Notiz. Amber statt im Fließtext untergehen. */
function ExpertenHinweis({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="my-6 rounded-lg border border-amber-300 border-l-4 border-l-amber-600 bg-amber-50 text-amber-900"
      style={{ padding: "13px 17px" }}
    >
      <span
        className="mr-2 inline-block rounded bg-amber-600 px-2 py-0.5 align-middle text-[11px] font-extrabold uppercase tracking-wide text-white"
      >
        Für Fachprüfung
      </span>
      <span className="text-[15px] leading-[1.6]">{children}</span>
    </aside>
  );
}

/** Rendert den Markdown-Body eines Fachartikels im KORODUR-Blog-Stil (#296):
 *  Lesetype 18px/1.8, großzügige Headings. Interne Links bekommen den lang-Präfix,
 *  externe öffnen im neuen Tab. `lead` hebt den ersten Absatz als Einleitung hervor.
 *  `TODO(Frank)`-Notizen (Sentinel-Präfix) werden als Experten-Hinweis markiert. */
export default function ArtikelInhalt({
  lang,
  body,
  lead = false,
}: {
  lang: string;
  body: string;
  lead?: boolean;
}) {
  const leadKlassen = lead
    ? " [&>p:first-of-type]:text-[21px] [&>p:first-of-type]:leading-[1.6] [&>p:first-of-type]:font-medium [&>p:first-of-type]:text-[#43576b]"
    : "";
  return (
    <div className={`text-[#1b2b3d] text-[18px] leading-[1.8]${leadKlassen}`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (!href) return <>{children}</>;
            if (href.startsWith("/")) {
              const to =
                href === `/${lang}` || href.startsWith(`/${lang}/`) ? href : `/${lang}${href}`;
              return (
                <Link href={to} className="text-cyan-text underline hover:no-underline" style={{ fontWeight: 600 }}>
                  {children}
                </Link>
              );
            }
            const extern = href.startsWith("http");
            return (
              <a
                href={href}
                {...(extern ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-cyan-text underline hover:no-underline"
                style={{ fontWeight: 600 }}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => {
            if (typeof src !== "string") return null;
            const resolved = src.startsWith("/") ? withBasePath(src) : src;
            return (
              <figure className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolved}
                  alt={alt ?? ""}
                  loading="lazy"
                  className="w-full h-auto"
                  style={{ borderRadius: 8, border: "1px solid var(--bullet-bg)" }}
                />
                {alt ? (
                  <figcaption className="text-navy/60 mt-2" style={{ fontSize: 13, lineHeight: 1.5 }}>
                    {alt}
                  </figcaption>
                ) : null}
              </figure>
            );
          },
          h2: ({ children }) => (
            <h2
              className="text-navy mt-11 mb-3.5"
              style={{ fontSize: "clamp(23px, 3vw, 27px)", fontWeight: 900, lineHeight: 1.25, letterSpacing: "-0.01em" }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-navy mt-8 mb-2" style={{ fontSize: "clamp(18px, 2.4vw, 21px)", fontWeight: 800, lineHeight: 1.3 }}>
              {children}
            </h3>
          ),
          p: ({ children }) => {
            // Experten-Hinweis: Absatz beginnt mit dem Sentinel-Präfix.
            const first = Array.isArray(children) ? children[0] : children;
            if (typeof first === "string" && first.startsWith(EXPERTE_PREFIX)) {
              const rest = first.slice(EXPERTE_PREFIX.length);
              const inhalt = Array.isArray(children) ? [rest, ...children.slice(1)] : rest;
              return <ExpertenHinweis>{inhalt}</ExpertenHinweis>;
            }
            return <p className="my-5">{children}</p>;
          },
          ul: ({ children }) => <ul className="my-5 pl-6 list-disc space-y-2.5">{children}</ul>,
          ol: ({ children }) => <ol className="my-5 pl-6 list-decimal space-y-2.5">{children}</ol>,
          li: ({ children }) => <li className="leading-[1.7]">{children}</li>,
          strong: ({ children }) => <strong className="text-navy" style={{ fontWeight: 800 }}>{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan bg-icon-bg my-6" style={{ padding: "12px 20px", borderRadius: 8 }}>
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6" style={{ overflowX: "auto" }}>
              <table className="w-full text-[15px]" style={{ borderCollapse: "collapse" }}>
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="text-navy text-left" style={{ padding: "10px 12px", borderBottom: "2px solid var(--bullet-bg)", fontWeight: 800 }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="text-navy/80 align-top" style={{ padding: "10px 12px", borderBottom: "1px solid var(--bullet-bg)" }}>
              {children}
            </td>
          ),
        }}
      >
        {body}
      </Markdown>
    </div>
  );
}

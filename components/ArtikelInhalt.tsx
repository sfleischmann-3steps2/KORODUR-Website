"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";

/** Rendert den Markdown-Body eines Fachartikels im KORODUR-Stil.
 *  Interne Links bekommen den lang-Präfix (z. B. /loesungsfinder -> /de/loesungsfinder),
 *  externe Links öffnen in neuem Tab. */
export default function ArtikelInhalt({ lang, body }: { lang: string; body: string }) {
  return (
    <div className="text-navy" style={{ fontSize: 16, lineHeight: 1.7 }}>
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
            <h2 className="mt-10 mb-4" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, lineHeight: 1.2 }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3" style={{ fontSize: "clamp(17px, 2.4vw, 22px)", fontWeight: 800, lineHeight: 1.25 }}>
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="my-4">{children}</p>,
          ul: ({ children }) => <ul className="my-4 pl-5 list-disc space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="my-4 pl-5 list-decimal space-y-2">{children}</ol>,
          li: ({ children }) => <li className="leading-[1.6]">{children}</li>,
          strong: ({ children }) => <strong style={{ fontWeight: 800 }}>{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan bg-icon-bg my-6" style={{ padding: "12px 20px", borderRadius: 8 }}>
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6" style={{ overflowX: "auto" }}>
              <table className="w-full text-[14px]" style={{ borderCollapse: "collapse" }}>
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

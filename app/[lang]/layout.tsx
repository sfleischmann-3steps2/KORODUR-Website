import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "../globals.css";
import AppShell from "../../components/AppShell";
import { getDictionary, hasLocale } from "./dictionaries";
import { LOCALES } from "../../lib/i18n";
import { LocaleProvider } from "../../lib/LocaleContext";
import type { Locale } from "../../lib/i18n";
import { notFound } from "next/navigation";

// Variable Font (wght 400-900), self-hosted via next/font statt
// render-blockendem Google-Fonts-@import. latin-ext für PL-Diakritika.
const gabarito = Gabarito({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-gabarito",
});
import { withBasePath } from "../../lib/basePath";
import ServiceWorkerRegistrar from "../../components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  // Website-Integration: App ist die neue korodur.de, nicht mehr nur Sanierung
  title: {
    template: "%s | KORODUR",
    default: "KORODUR | Industrieböden und Spezialbaustoffe",
  },
  description:
    "KORODUR entwickelt und produziert mineralische Hartstoffe, Industrieböden, Sichtestriche und Spezialbaustoffe. Seit 1936, weltweit bewährt.",
  openGraph: {
    type: "website",
    siteName: "KORODUR",
  },
};

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${gabarito.variable} antialiased`}>
      <head>
        {/* Manifest-Link kommt aus app/manifest.ts (basePath-fähig, Launch-Plan M1) */}
        <meta name="theme-color" content="#002d59" />
        <link rel="icon" href={withBasePath("/icons/icon-192.svg")} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={withBasePath("/icons/icon-192.svg")} />
      </head>
      <body className="min-h-screen font-sans">
        <a href="#main-content" className="skip-to-content">
          {lang === "de" ? "Zum Inhalt springen" : lang === "fr" ? "Aller au contenu" : lang === "pl" ? "Przejdź do treści" : "Skip to content"}
        </a>
        <LocaleProvider lang={lang as Locale} dict={dict}>
          <AppShell lang={lang as Locale} dict={dict}>
            <div id="main-content">{children}</div>
          </AppShell>
        </LocaleProvider>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}

import Link from "next/link";
import { ExternalLink, Phone } from "lucide-react";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../app/[lang]/dictionaries";
import { KONTAKT_URLS } from "../lib/kontakt";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const contactUrl = KONTAKT_URLS[lang] ?? KONTAKT_URLS.en;

  return (
    <footer className="bg-footer-dark text-white mt-auto">
      <div
        className="mx-auto py-10"
        style={{ maxWidth: 1320, padding: "40px 32px" }}
      >
        {/* Contact CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-cyan/15">
              <AppIcon icon={Phone} width={22} height={22} strokeWidth={2} className="text-cyan" aria-hidden="true" />
            </div>
            <div>
              <div className="text-white text-[16px]" style={{ fontWeight: 800 }}>
                {dict.footer.contact_cta}
              </div>
              <div className="text-white opacity-50 text-[14px]">
                {dict.footer.contact_desc}
              </div>
            </div>
          </div>
          <Button asChild size="lg">
            <a href={contactUrl} target="_blank" rel="noopener noreferrer">
              {dict.footer.contact_cta}
              <AppIcon icon={ExternalLink} width={14} height={14} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </Button>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[20px] tracking-tight" style={{ fontWeight: 900 }}>
              KORODUR
            </span>
            <span className="text-[13px] opacity-50">
              {dict.footer.tagline}
            </span>
          </div>
          <div className="flex items-center gap-6 text-[14px]">
            <Link href={`/${lang}/referenzen`} className="text-white opacity-70 hover:opacity-100 no-underline transition-opacity">
              {dict.nav.referenzen}
            </Link>
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white opacity-70 hover:opacity-100 no-underline transition-opacity"
            >
              {dict.footer.contact_cta}
            </a>
          </div>
          <div className="text-[13px] opacity-40 text-center md:text-right">
            &copy; {new Date().getFullYear()} KORODUR. {dict.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

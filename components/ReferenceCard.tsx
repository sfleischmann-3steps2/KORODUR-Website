import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Referenz } from "../data/types";
import { bereichLabel } from "../data/einsatzbereichMapping";
import { withBasePath } from "../lib/basePath";
import { thumbSrc } from "../lib/images";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppIcon } from "@/components/ui/icon";

export default function ReferenceCard({
  referenz,
  lang = "de",
}: {
  referenz: Referenz;
  lang?: string;
}) {
  // Badge = primäre Branche der Referenz (gleiche Facette wie der Galerie-Filter).
  const primary = referenz.einsatzbereiche?.[0];
  const label = primary ? bereichLabel(primary, lang) : "";

  return (
    <Link href={`/${lang}/referenzen/${referenz.slug}`} className="no-underline group block">
      <Card className="gap-0 overflow-hidden rounded-[14px] border-0 py-0 shadow-[0_8px_40px_rgba(0,45,89,0.10)] transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_48px_rgba(0,45,89,0.16)]">
        <div className="aspect-video overflow-hidden relative">
          {/* Card-Bild als 640px-Thumb: Die Übersicht rendert bis zu 52 Cards —
              mit Originalen wären das zweistellige MB (images.unoptimized). */}
          <Image
            src={withBasePath(thumbSrc(referenz.bild))}
            alt={referenz.bildAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6 flex flex-col gap-3">
          {label && (
            <Badge className="self-start rounded-[4px] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {label}
            </Badge>
          )}
          <h3 className="text-navy text-[18px] m-0 leading-tight font-black">
            {referenz.titel}
          </h3>
          <p className="text-navy text-[14px] m-0 opacity-60">
            {referenz.untertitel}
          </p>
          <div className="flex items-center gap-2 text-[13px] text-navy opacity-50">
            <AppIcon icon={MapPin} width={14} height={14} strokeWidth={2} aria-hidden="true" />
            {referenz.ort}, {referenz.land}
            {referenz.flaeche && (
              <>
                <span className="mx-1">|</span>
                {referenz.flaeche}
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {referenz.produkte.slice(0, 2).map((p) => (
              <Badge
                key={p}
                variant="secondary"
                className="rounded-[4px] bg-icon-bg px-2 py-1 text-[11px] font-bold text-navy"
              >
                {p}
              </Badge>
            ))}
            {referenz.produkte.length > 2 && (
              <span className="text-[11px] text-navy opacity-50 px-2 py-1">
                +{referenz.produkte.length - 2}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

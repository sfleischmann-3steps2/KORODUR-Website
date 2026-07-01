"use client";

import { useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

export type GalerieBild = {
  src: string;
  thumb: string;
  alt: string;
  /** Packshot (freigestellt) → object-contain; Szenariofoto → object-cover. */
  contain?: boolean;
};

/**
 * Produktgalerie im PDP-Kopf (#408, F1/F2): großes Hauptbild + Thumbnail-Leiste.
 * Erstes Bild = Packshot, weitere = Szenariofotos aus verknüpften Referenzen.
 * Client-Komponente wegen Thumbnail-Wechsel.
 */
export default function ProduktGalerie({ bilder }: { bilder: GalerieBild[] }) {
  const [aktiv, setAktiv] = useState(0);
  if (bilder.length === 0) return null;
  const i = Math.min(aktiv, bilder.length - 1);
  const b = bilder[i];

  return (
    <div className="w-full" style={{ maxWidth: 460 }}>
      <div
        className="relative w-full overflow-hidden rounded-2xl border"
        style={{
          height: 360,
          borderColor: "var(--bullet-bg)",
          background: "linear-gradient(160deg,#f7f9fc,#eef2f7)",
        }}
      >
        <Image
          key={b.src}
          src={withBasePath(b.src)}
          alt={b.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 460px"
          className={b.contain ? "object-contain p-6 drop-shadow-lg" : "object-cover"}
        />
      </div>

      {bilder.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {bilder.map((img, idx) => (
            <button
              key={`${img.src}-${idx}`}
              type="button"
              onClick={() => setAktiv(idx)}
              aria-label={img.alt}
              aria-current={idx === i}
              className="overflow-hidden rounded-lg border-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cyan"
              style={{
                width: 74,
                height: 58,
                borderColor: idx === i ? "var(--cyan)" : "var(--bullet-bg)",
              }}
            >
              <Image
                src={withBasePath(img.thumb)}
                alt=""
                width={74}
                height={58}
                className={
                  img.contain
                    ? "h-full w-full bg-white object-contain p-1"
                    : "h-full w-full object-cover"
                }
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

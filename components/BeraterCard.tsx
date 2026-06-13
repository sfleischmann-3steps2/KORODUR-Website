import Image from "next/image";
import { withBasePath } from "../lib/basePath";
import type { Fachberater } from "../data/fachberater";

/** Initialen-Fallback, wenn (noch) kein Porträt vorliegt. */
function Initialen({ name }: { name: string }) {
  const initialen = name
    .split(" ")
    .map((t) => t[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="flex items-center justify-center rounded-full bg-bullet-bg text-navy"
      style={{ width: 56, height: 56, fontWeight: 900, fontSize: 18 }}
      aria-hidden="true"
    >
      {initialen}
    </div>
  );
}

/** Fachberater-Karte mit Porträt — Kontaktseite und Funnel-Enden
 *  (Bereichs-/Produktseiten, Lösungsfinder-Ergebnis). Launch-Audit:
 *  ein Gesicht mit Durchwahl ist im konservativen B2B das stärkste
 *  Conversion-Element. */
export default function BeraterCard({
  berater,
  plzLabel,
}: {
  berater: Fachberater;
  /** Lokalisiertes Label für die PLZ-Zeile (dict.kontakt.fachberater_plz). */
  plzLabel?: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-bullet-bg bg-white" style={{ padding: "16px 18px" }}>
      {berater.bild ? (
        <Image
          src={withBasePath(berater.bild)}
          alt={berater.name}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
      ) : (
        <Initialen name={berater.name} />
      )}
      <div className="min-w-0">
        <p className="m-0 text-[15px] text-navy" style={{ fontWeight: 900 }}>
          {berater.name}
        </p>
        <p className="m-0 mt-0.5 text-[12.5px] leading-[1.45] text-navy/60">{berater.rolle}</p>
        {berater.gebiet && plzLabel && (
          <p className="m-0 mt-0.5 text-[12.5px] text-navy/60">
            {plzLabel}: {berater.gebiet}
          </p>
        )}
        <p className="m-0 mt-1.5 text-[13.5px] leading-[1.7]">
          <a href={berater.telefonHref} className="text-cyan-text no-underline hover:underline" style={{ fontWeight: 700 }}>
            {berater.telefon}
          </a>
          <br />
          <a href={`mailto:${berater.email}`} className="text-cyan-text no-underline hover:underline" style={{ fontWeight: 700 }}>
            {berater.email}
          </a>
        </p>
      </div>
    </div>
  );
}

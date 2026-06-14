"use client";

import { useEffect, useMemo, useState } from "react";
import type { Fachberater } from "../data/fachberater";
import type { Produktbereich } from "../data/types";
import BeraterCard from "./BeraterCard";
import { produktbereichLabel } from "../data/referenzProduktbereich";

// PLZ-Gebiete stehen als Freitext im Feld `gebiet` (z. B. "PLZ 01–19, 38–39,
// 98–99"). Wir matchen über die führenden zwei Ziffern der eingegebenen PLZ.
function plzMatch(gebiet: string | undefined, plz: string): boolean {
  const q = plz.trim();
  if (!q) return true;
  if (!gebiet) return true; // ohne Gebiet = bundesweit zuständig
  const prefix = parseInt(q.slice(0, 2), 10);
  if (Number.isNaN(prefix)) return true;
  for (const m of gebiet.matchAll(/(\d{2})\s*[–-]\s*(\d{2})|(\d{2})/g)) {
    if (m[1] && m[2]) {
      if (prefix >= Number(m[1]) && prefix <= Number(m[2])) return true;
    } else if (m[3] && prefix === Number(m[3])) {
      return true;
    }
  }
  return false;
}

export default function FachberaterFinder({
  berater,
  lang,
  plzLabel,
  bereichAll,
  plzPlaceholder,
  noResults,
}: {
  berater: Fachberater[];
  lang: string;
  plzLabel: string;
  bereichAll: string;
  plzPlaceholder: string;
  noResults: string;
}) {
  const [bereich, setBereich] = useState<string>("");
  const [plz, setPlz] = useState<string>("");

  // Deep-Link ?bereich=<slug> von Produkt-/Bereichsseiten vorbelegen (#91).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("bereich");
    if (p) setBereich(p);
  }, []);

  const bereiche = useMemo(() => {
    const set = new Set<Produktbereich>();
    berater.forEach((b) => b.bereiche.forEach((x) => set.add(x)));
    return [...set];
  }, [berater]);

  const filtered = berater.filter(
    (b) =>
      (!bereich || b.bereiche.includes(bereich as Produktbereich)) &&
      plzMatch(b.gebiet, plz)
  );

  const controlClass =
    "h-11 rounded-lg border border-bullet-bg bg-white px-3 text-[15px] text-navy focus:border-cyan focus:outline-none";

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={bereich}
          onChange={(e) => setBereich(e.target.value)}
          className={`${controlClass} sm:min-w-[220px]`}
          style={{ fontWeight: 600 }}
          aria-label={bereichAll}
        >
          <option value="">{bereichAll}</option>
          {bereiche.map((slug) => (
            <option key={slug} value={slug}>
              {produktbereichLabel(slug, lang)}
            </option>
          ))}
        </select>
        <input
          type="text"
          inputMode="numeric"
          value={plz}
          onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))}
          placeholder={plzPlaceholder}
          className={`${controlClass} sm:w-44`}
          aria-label={plzPlaceholder}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((b) => (
            <BeraterCard key={`${b.name}-${b.email}`} berater={b} plzLabel={plzLabel} />
          ))}
        </div>
      ) : (
        <p className="text-navy/60 text-[15px] py-4">{noResults}</p>
      )}
    </div>
  );
}

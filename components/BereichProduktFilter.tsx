"use client";

import { useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  name: string;
  kurzbeschreibung: string;
  qualitaetsklasse?: string;
};
type Gruppe = { key: string; label: string; items: Item[] };

const ALLE = "__alle";

/**
 * Produktgruppen-Filter für Bereichsseiten (#119). Zeigt Gruppen-Chips;
 * bei großen Bereichen sind die Produkte standardmäßig ausgeblendet
 * (defaultOpen=false) und werden erst per Klick auf eine Gruppe oder
 * "Alle Produkte" eingeblendet. Die Produktkarten bleiben für SEO im DOM
 * (per hidden ausgeblendet, nicht ausgehängt).
 */
export default function BereichProduktFilter({
  gruppen,
  lang,
  neutral = false,
  defaultOpen = false,
  hinweis,
  alleLabel,
}: {
  gruppen: Gruppe[];
  lang: string;
  neutral?: boolean;
  defaultOpen?: boolean;
  hinweis: string;
  alleLabel: string;
}) {
  const [aktiv, setAktiv] = useState<string | null>(defaultOpen ? ALLE : null);
  const sichtbar = (key: string) => aktiv === ALLE || aktiv === key;
  const toggle = (key: string) => setAktiv((cur) => (cur === key ? null : key));

  const chipBase =
    "inline-flex items-center rounded-full border text-[14px] transition-colors duration-150";
  const chipOn = "border-cyan bg-cyan text-white";
  const chipOff = "border-mid-gray bg-white text-navy hover:border-cyan hover:text-cyan-text";

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {gruppen.map((g) => {
          const on = aktiv === g.key;
          return (
            <button
              key={g.key}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(g.key)}
              className={`${chipBase} ${on ? chipOn : chipOff}`}
              style={{ padding: "10px 18px", fontWeight: 700, minHeight: 44 }}
            >
              {g.label}
              <span
                className={`ml-2 text-[12px] ${on ? "text-white/70" : "text-navy/40"}`}
                style={{ fontWeight: 600 }}
              >
                {g.items.length}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={aktiv === ALLE}
          onClick={() => setAktiv((cur) => (cur === ALLE ? null : ALLE))}
          className={`${chipBase} ${aktiv === ALLE ? chipOn : chipOff}`}
          style={{ padding: "10px 18px", fontWeight: 700, minHeight: 44 }}
        >
          {alleLabel}
        </button>
      </div>

      {aktiv === null && (
        <p className="text-navy/60 text-[15px] mt-0 mb-0 leading-[1.6]">{hinweis}</p>
      )}

      {gruppen.map((g) => (
        <div key={g.key} id={g.key} hidden={!sichtbar(g.key)} className="scroll-mt-24 mb-10 last:mb-0">
          <h3
            className="mb-5"
            style={{ fontSize: "clamp(17px, 2.4vw, 22px)", fontWeight: 900, lineHeight: 1.2 }}
          >
            {g.label}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.items.map((produkt) => (
              <Link
                key={produkt.id}
                href={`/${lang}/produkte/${produkt.id}`}
                className="no-underline group block"
              >
                <div
                  className={`bg-white p-6 flex flex-col gap-3 h-full transition-all duration-200 group-hover:-translate-y-1 ${
                    neutral
                      ? "border border-mid-gray group-hover:border-navy"
                      : "group-hover:shadow-lg"
                  }`}
                  style={
                    neutral
                      ? { borderRadius: 14 }
                      : { borderRadius: 14, boxShadow: "0 4px 20px rgba(0,45,89,0.08)" }
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-navy text-[17px] m-0" style={{ fontWeight: 900 }}>
                      {produkt.name}
                    </h4>
                    {produkt.qualitaetsklasse && (
                      <span
                        className="text-[10px] text-white uppercase tracking-wider px-2 py-0.5 rounded shrink-0"
                        style={{ backgroundColor: "var(--cyan)", fontWeight: 700 }}
                      >
                        {produkt.qualitaetsklasse}
                      </span>
                    )}
                  </div>
                  <p className="text-navy opacity-60 text-[14px] m-0 leading-[1.5]">
                    {produkt.kurzbeschreibung}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

"use client";

import { useState } from "react";
import type { Dictionary } from "../app/[lang]/dictionaries";
import { bereiche } from "../data/bereiche";
import { KORODUR_ZENTRALE } from "../lib/kontaktDaten";

// Zentrales Kontaktformular (Feldstruktur 1:1 von der Alt-Site übernommen:
// Produktpalette + "Ihre Funktion"). Static Export hat kein Backend — V1
// versendet per mailto mit strukturiertem Body; beim Hosting-Cutover (Stufe 5)
// wird der Submit auf einen Worker/Formular-Dienst umgestellt (nur diese
// Komponente anfassen, Felder bleiben).
export default function KontaktFormular({
  dict,
}: {
  dict: Dictionary;
}) {
  const k = dict.kontakt as Record<string, string>;
  const tb = dict.bereiche as Record<string, string>;
  const [form, setForm] = useState({
    name: "",
    firma: "",
    email: "",
    telefon: "",
    land: "",
    bereich: "",
    funktion: "",
    nachricht: "",
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const funktionen = [
    ["verarbeiter", k.funktion_verarbeiter],
    ["planer", k.funktion_planer],
    ["bauherr", k.funktion_bauherr],
    ["haendler", k.funktion_haendler],
    ["sonstiges", k.funktion_sonstiges],
  ] as const;

  const senden = () => {
    const zeilen = [
      `${k.feld_name}: ${form.name}`,
      form.firma ? `${k.feld_firma}: ${form.firma}` : null,
      `${k.feld_email}: ${form.email}`,
      form.telefon ? `${k.feld_telefon}: ${form.telefon}` : null,
      form.land ? `${k.feld_land}: ${form.land}` : null,
      form.bereich ? `${k.feld_bereich}: ${form.bereich}` : null,
      form.funktion ? `${k.feld_funktion}: ${form.funktion}` : null,
      "",
      form.nachricht,
    ].filter((z): z is string => z !== null);
    const subject = `Anfrage über korodur.de${form.bereich ? ` – ${form.bereich}` : ""}`;
    window.location.href = `mailto:${KORODUR_ZENTRALE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(zeilen.join("\n"))}`;
  };

  const inputClass =
    "w-full rounded-lg border border-mid-gray bg-white text-navy text-[15px] px-4 transition-colors focus:border-cyan outline-none";
  const labelClass = "block text-navy text-[13px] mb-1.5";

  return (
    <div className="bg-light-gray rounded-2xl" style={{ padding: "36px 32px" }}>
      <h2 className="text-navy mt-0 mb-2" style={{ fontSize: 22, fontWeight: 900 }}>
        {k.form_title}
      </h2>
      <p className="text-navy/70 text-[15px] mt-0 mb-7 leading-[1.6]">{k.form_intro}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
        <div>
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-name">
            {k.feld_name} *
          </label>
          <input id="kf-name" required value={form.name} onChange={set("name")} className={inputClass} style={{ height: 46 }} />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-firma">
            {k.feld_firma}
          </label>
          <input id="kf-firma" value={form.firma} onChange={set("firma")} className={inputClass} style={{ height: 46 }} />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-email">
            {k.feld_email} *
          </label>
          <input id="kf-email" type="email" required value={form.email} onChange={set("email")} className={inputClass} style={{ height: 46 }} />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-telefon">
            {k.feld_telefon}
          </label>
          <input id="kf-telefon" value={form.telefon} onChange={set("telefon")} className={inputClass} style={{ height: 46 }} />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-land">
            {k.feld_land}
          </label>
          <input id="kf-land" value={form.land} onChange={set("land")} className={inputClass} style={{ height: 46 }} />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-bereich">
            {k.feld_bereich}
          </label>
          <select id="kf-bereich" value={form.bereich} onChange={set("bereich")} className={inputClass} style={{ height: 46 }}>
            <option value=""></option>
            {bereiche.map((b) => (
              <option key={b.slug} value={tb[`${b.slug}_name`]}>
                {tb[`${b.slug}_name`]}
              </option>
            ))}
            <option value={k.bereich_sonstiges}>{k.bereich_sonstiges}</option>
          </select>
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-funktion">
            {k.feld_funktion}
          </label>
          <select id="kf-funktion" value={form.funktion} onChange={set("funktion")} className={inputClass} style={{ height: 46 }}>
            <option value=""></option>
            {funktionen.map(([key, label]) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} style={{ fontWeight: 700 }} htmlFor="kf-nachricht">
            {k.feld_nachricht} *
          </label>
          <textarea id="kf-nachricht" required rows={5} value={form.nachricht} onChange={set("nachricht")} className={`${inputClass} py-3`} />
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="button"
          onClick={senden}
          disabled={!form.name || !form.email || !form.nachricht}
          className="inline-flex items-center justify-center text-white border-none cursor-pointer rounded-[6px] bg-cyan hover:bg-cyan-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ padding: "14px 30px", fontWeight: 800, fontSize: 15, minHeight: 44, fontFamily: "inherit" }}
        >
          {k.form_submit}
        </button>
        <p className="text-navy/50 text-[13px] m-0 leading-[1.5]">{k.form_hinweis}</p>
      </div>
    </div>
  );
}

// Technische Fachberater (Quelle: Landing Pages lp-live.korodur.de/arm + /microtop-tw,
// dort öffentlich publiziert; Übernahme freigegeben von Steffi, 2026-06-12).
// Die vollständigen Ansprechpartner-Seiten der Alt-Site (kontakt/deutschland +
// kontakt/international, inkl. Fotos) sind weder live abrufbar (Bot-Schutz)
// noch archiviert — Zulieferung Steffi, siehe Notion-To-do-Liste.

export interface Fachberater {
  name: string;
  /** Dictionary-Key für die Rollenbezeichnung: kontakt.rolle_<key> ist NICHT
   *  nötig — Rolle ist markennah und bleibt sprachinvariant. */
  rolle: string;
  /** Zuständigkeit (PLZ-Gebiete o. Ä.), sprachinvariant. */
  gebiet?: string;
  telefon: string;
  telefonHref: string;
  email: string;
}

export const FACHBERATER: { gruppe: "microtop" | "rapid-set"; berater: Fachberater[] }[] = [
  {
    gruppe: "microtop",
    berater: [
      {
        name: "Benjamin Lorenz",
        rolle: "Technische Vertriebsberatung Trinkwasser / MICROTOP",
        telefon: "+49 (0) 170 3733988",
        telefonHref: "tel:+491703733988",
        email: "blorenz@korodur.de",
      },
    ],
  },
  {
    gruppe: "rapid-set",
    berater: [
      { name: "Jens Sackmann", rolle: "Technische Vertriebsberatung Rapid Set", gebiet: "PLZ 20–29", telefon: "+49 (0) 170 3733983", telefonHref: "tel:+491703733983", email: "j.sackmann@korodur.de" },
      { name: "André Grahn", rolle: "Technische Vertriebsberatung Rapid Set", gebiet: "PLZ 30–33, 37, 40–49, 50–53, 57–59", telefon: "+49 (0) 170 3733979", telefonHref: "tel:+491703733979", email: "a.grahn@korodur.de" },
      { name: "Jens Lang", rolle: "Technische Vertriebsberatung Rapid Set", gebiet: "PLZ 34–36, 54–56, 60–79, 86–89", telefon: "+49 (0) 170 3733985", telefonHref: "tel:+491703733985", email: "j.lang@korodur.de" },
      { name: "Daniel May", rolle: "Technische Vertriebsberatung Rapid Set", gebiet: "PLZ 80–89, 94", telefon: "+49 (0) 172 1480125", telefonHref: "tel:+491721480125", email: "d.may@korodur.de" },
      { name: "Francesco Palese", rolle: "Technische Vertriebsberatung Rapid Set", gebiet: "PLZ 90–93, 95–97", telefon: "+49 (0) 172 1480128", telefonHref: "tel:+491721480128", email: "f.palese@korodur.de" },
    ],
  },
];

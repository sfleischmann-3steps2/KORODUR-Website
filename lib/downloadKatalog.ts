// Download-Center-Katalog (#301): baut aus den verifizierten, lokal vorliegenden
// Produktdokumenten (data/produktDokumente.ts, PDFs unter public/downloads/) einen
// Katalog. Sprachvarianten derselben Datei werden zu EINEM Eintrag gruppiert
// (mehrere Sprach-Downloads), zugehoerige Produkte + Bereiche aggregiert.
//
// Das Gap-Inventar (#300, docs/website-migration/dokumente-stamm.json) ist
// bewusst NICHT die Quelle hier: es zeigt remote korodur.de-URLs + nicht
// migrierte Altlasten und dient der Lueckenanalyse, nicht dem Live-Download.

import {
  PRODUKT_DOKUMENTE,
  ZENTRALE_DOKUMENTE,
  type DokumentTyp,
  type ProduktDokument,
} from "../data/produktDokumente";
import { produkte } from "../data/produkte";
import { produktartVonProdukt, type Produktart } from "../data/produktart";

export const UEBERGREIFEND = "uebergreifend";

export interface KatalogDokument {
  /** Stabiler Schluessel (typ|titel, kleingeschrieben). */
  id: string;
  typ: DokumentTyp;
  titel: string;
  /** Eine Datei je Sprache (verschiedene URLs). */
  dateien: { sprache: string; url: string }[];
  /** Produkte, die dieses Dokument fuehren (leer = uebergreifend). */
  produkte: { id: string; name: string }[];
  /** Bereich-Slugs (aus den Produkten) bzw. [UEBERGREIFEND]. */
  bereiche: string[];
  /** Produktarten (Achse A, aus den Produkten). Leer = keine (uebergreifend). */
  produktarten: Produktart[];
}

const prodById = new Map(produkte.map((p) => [p.id, p]));

/** Gruppierter Katalog (eine logische Datei = ein Eintrag). */
export function buildDownloadKatalog(): KatalogDokument[] {
  const map = new Map<string, KatalogDokument>();

  const add = (
    d: ProduktDokument,
    prod?: { id: string; name: string; bereich: string; zusatzBereiche?: string[] },
  ) => {
    const key = `${d.typ}|${d.titel.toLowerCase()}`;
    let e = map.get(key);
    if (!e) {
      e = { id: key, typ: d.typ, titel: d.titel, dateien: [], produkte: [], bereiche: [], produktarten: [] };
      map.set(key, e);
    }
    if (!e.dateien.some((x) => x.url === d.url)) e.dateien.push({ sprache: d.sprache, url: d.url });
    if (prod) {
      if (!e.produkte.some((x) => x.id === prod.id)) e.produkte.push({ id: prod.id, name: prod.name });
      for (const b of [prod.bereich, ...(prod.zusatzBereiche ?? [])]) {
        if (b && !e.bereiche.includes(b)) e.bereiche.push(b);
      }
      const art = produktartVonProdukt({ id: prod.id });
      if (art && !e.produktarten.includes(art)) e.produktarten.push(art);
    }
  };

  for (const [pid, docs] of Object.entries(PRODUKT_DOKUMENTE)) {
    const prod = prodById.get(pid) as
      | { id: string; name: string; bereich: string; zusatzBereiche?: string[] }
      | undefined;
    for (const d of docs) add(d, prod);
  }
  for (const d of ZENTRALE_DOKUMENTE) add(d, undefined);

  const SPRACH_ORDER = ["de", "en", "fr", "pl"];
  const liste = [...map.values()];
  for (const e of liste) {
    if (e.bereiche.length === 0) e.bereiche.push(UEBERGREIFEND);
    e.dateien.sort((a, b) => SPRACH_ORDER.indexOf(a.sprache) - SPRACH_ORDER.indexOf(b.sprache));
  }
  const TYP_ORDER: DokumentTyp[] = ["tds", "sds", "dop", "anwendung", "reinigung", "service"];
  liste.sort(
    (a, b) =>
      TYP_ORDER.indexOf(a.typ) - TYP_ORDER.indexOf(b.typ) || a.titel.localeCompare(b.titel),
  );
  return liste;
}

/** Bereiche, die im Katalog tatsaechlich vorkommen (fuer die Filter-Chips). */
export function katalogBereiche(katalog: KatalogDokument[]): string[] {
  const s = new Set<string>();
  for (const d of katalog) for (const b of d.bereiche) s.add(b);
  return [...s];
}

/** Produktarten, die im Katalog tatsaechlich vorkommen (fuer die Filter-Chips). */
export function katalogProduktarten(katalog: KatalogDokument[]): Set<Produktart> {
  const s = new Set<Produktart>();
  for (const d of katalog) for (const a of d.produktarten) s.add(a);
  return s;
}

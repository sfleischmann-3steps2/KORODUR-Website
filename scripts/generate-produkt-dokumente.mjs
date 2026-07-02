// Generator: Produkt-Dokumente aus dem Alt-Site-Archiv (Launch-Plan M3).
//
// Quelle ist der wp-content-Spiegel im KORODUR-website-Repo
// (05_wp-content-archiv/). Als "aktuell" gilt, was die Service-Seiten der
// Alt-Site zuletzt verlinkt haben (provenienz/service-seiten-snapshots/,
// Stand Okt/Nov 2025) — NICHT alle 920 PDFs des Spiegels (alte Revisionen).
//
//   node scripts/generate-produkt-dokumente.mjs
//
// Schreibt:
//   - public/downloads/<typ>/<datei>.pdf   (kopiert aus dem Spiegel)
//   - data/produktDokumente.ts             (GENERIERT, nicht von Hand editieren)
//
// Zuordnung: exakte Namens-Matches automatisch (normalisierter Präfix-
// Vergleich, längster Produktname gewinnt, Varianten zählen zum Stammprodukt).
// Gruppen-Dokumente (z. B. "KORODUR Hartstoffe SDB") nur über die explizite
// MANUAL_MAP; was dort fehlt, landet ausschließlich im Download-Center
// (ZENTRALE_DOKUMENTE) statt falsch an einem Produkt.

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

// Lädt ein PDF von korodur.de (braucht Browser-User-Agent, sonst 403) und
// schreibt es nur, wenn der Body echte PDF-Magic-Bytes hat (kein Soft-404).
function downloadPdf(url, zielAbs) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(zielAbs), { recursive: true });
    https
      .get(url, { headers: { "User-Agent": BROWSER_UA } }, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} für ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          if (buf.subarray(0, 5).toString("latin1") !== "%PDF-") {
            return reject(new Error(`Kein PDF (Soft-404?): ${url}`));
          }
          fs.writeFileSync(zielAbs, buf);
          resolve(buf.length);
        });
      })
      .on("error", reject);
  });
}

// Archiv-Auflösung: das wp-content-Archiv ist aus dem Schwester-Repo in
// Steffis Archiv-Ordner umgezogen; env KORODUR_ARCHIV übersteuert.
const ARCHIV_KANDIDATEN = [
  process.env.KORODUR_ARCHIV,
  "../KORODUR-website/05_wp-content-archiv",
  `${process.env.HOME}/KORODUR/archive/KORODUR-website, archiviert/05_wp-content-archiv`,
].filter(Boolean);
const ARCHIV = ARCHIV_KANDIDATEN.find((p) => fs.existsSync(path.join(p, "inventar.csv")));
if (!ARCHIV) {
  console.error("wp-content-Archiv nicht gefunden. Kandidaten:\n  " + ARCHIV_KANDIDATEN.join("\n  "));
  process.exit(1);
}
const SNAP = path.join(ARCHIV, "provenienz/service-seiten-snapshots");
const INVENTAR = path.join(ARCHIV, "inventar.csv");

// ---- Produkte + Varianten aus data/produkte.ts (via Build-freiem Parsen) ----
// Je Produktblock (von id: bis zum nächsten id:) zählen ALLE name:-Vorkommen
// als Match-Schlüssel — Produktname wie Variantennamen zeigen auf dieselbe ID.
const produkteSrc = fs.readFileSync("data/produkte.ts", "utf-8");
const idPositionen = [...produkteSrc.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)].map((m) => ({
  id: m[1],
  start: m.index,
}));
const namenJeProdukt = new Map(); // id -> [namen]
idPositionen.forEach((p, i) => {
  const ende = idPositionen[i + 1]?.start ?? produkteSrc.length;
  const block = produkteSrc.slice(p.start, ende);
  namenJeProdukt.set(p.id, [...block.matchAll(/\bname:\s*"([^"]+)"/g)].map((m) => m[1]));
});

function norm(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]/g, "");
}

// Schlüssel → Produkt-ID. Varianten- und Produktnamen; längster Schlüssel gewinnt.
// Aliasse (ohne "KORODUR "/"Rapid Set "-Präfix) matchen nur EXAKT — als
// Präfix wären Kurzformen wie "pc" zu kollisionsanfällig.
const keyZuProdukt = [];
const aliasZuProdukt = new Map();
for (const [id, namen] of namenJeProdukt) {
  for (const n of namen) {
    const k = norm(n);
    keyZuProdukt.push([k, id]);
    for (const praefix of ["korodur", "rapidset"]) {
      if (k.startsWith(praefix) && k.length > praefix.length) {
        aliasZuProdukt.set(k.slice(praefix.length), id);
      }
    }
  }
}
keyZuProdukt.sort((a, b) => b[0].length - a[0].length);

function autoMatch(dateibasis) {
  // Dateiname normalisieren: DoP-Nummernpräfixe und Suffixe (SDB, Sprache, Jahr) entfernen.
  let s = dateibasis
    .replace(/\.pdf$/i, "")
    .replace(/^[\d._-]+/, "") // DoP-Nummerierung "13813_2.4_", "1001_1_998-1_"
    .replace(/_(SDB|TDS)(_|$)/i, "_")
    .replace(/_(de|en|fr)(_\d{4})?$/i, "")
    .replace(/_\d{4}$/, "");
  const key = norm(s);
  for (const [k, id] of keyZuProdukt) {
    if (key === k || key.startsWith(k)) return id;
  }
  if (aliasZuProdukt.has(key)) return aliasZuProdukt.get(key);
  // Datei trägt "KORODUR_"-Präfix, Produktname nicht (z. B. KORODUR_KOROTAN_de)
  if (key.startsWith("korodur")) {
    const rest = key.slice("korodur".length);
    for (const [k, id] of keyZuProdukt) if (rest === k) return id;
    if (aliasZuProdukt.has(rest)) return aliasZuProdukt.get(rest);
  }
  return null;
}

// ---- Manuelle Zuordnung (Dateiname → Produkt-IDs oder "zentral") ----------
// "zentral" = nur Download-Center. Gruppen-SDS bleiben bewusst zentral, bis
// Technik (Frank) die Produktzuordnung freigibt — falsche SDS-Zuordnung wäre
// ein Sicherheitsthema.
const HARTSTOFF_BODEN = [
  "neodur-he-65", "neodur-he-65-plus", "neodur-he-40", "neodur-he-60-rapid",
  "neodur-he-3", "neodur-he-3-green", "neodur-he-2",
];
const TRU_FAMILIE = ["tru-self-leveling", "tru-pc", "tru-sp"];
const RAPID_REPARATUR = [
  "rapid-set-cement-all", "rapid-set-mortar-mix", "rapid-set-mortar-mix-dur",
  "rapid-set-concrete-mix",
];

const MANUAL_MAP = {
  // --- TDS-Seite: Nicht-Produkt-Dokumente ---
  "Bestellformular_MICROTOP_2024.pdf": "zentral",
  "Bestellformular_Sackware_2024.pdf": "zentral",
  "Bestellformular_Siloware.pdf": "zentral",
  "Farbkarte_de_en_fr.pdf": ["granidur", "granidur-bianco-nero", "kcf", ...TRU_FAMILIE],
  "Glossprofi_de.pdf": "zentral",
  "Inotec_Mietservice_de.pdf": "zentral",
  "KOROPHALT_02_de.pdf": ["korophalt-02"], // seit Portfolio-Umbau eigenes Produkt
  "KORODUR_Silosystem_de.pdf": "zentral", // Silosystem ist Service, kein Katalog-Produkt
  "KOROPOX_de_2023.pdf": "zentral", // KOROPOX ersetzt (LI Plus) — TDS für Bestandsware zentral
  "MICROTOP_TW_NSD_de.pdf": null, // TW NSD eingestellt (V3.6) — entfällt
  "KORODUR_Korotan_SDB_de.pdf": ["system-korodur-korotan"],
  "OBTEGO_P_20_de.pdf": "zentral", // OBTEGO-Pflegesystem: kein App-Produkt
  "OBTEGO_R_400_de.pdf": "zentral",
  "OBTEGO_P-20_SDB_de.pdf": "zentral",
  "OBTEGO_R-400_SDB_de.pdf": "zentral",
  "Thilos_dunnflussig_de.pdf": "zentral", // kein App-Produkt
  "System_Rapid_Set_Concrete_de.pdf": ["rapid-set-schnellbeton"],
  "MICROTOP_TW_3_5_8_de.pdf": ["microtop-tw-3", "microtop-tw-5", "microtop-tw-8"],
  "KORODUR_FSCem_Basic_de.pdf": ["korodur-fscem"],
  "Cement_All_Plus_de.pdf": ["rapid-set-cement-all"],
  "Mortar_Mix_de.pdf": ["rapid-set-mortar-mix", "rapid-set-mortar-mix-dur"],
  // Sammel-TDS über mehrere Produkte
  "NEODUR_VM_1_3_8_de.pdf": ["neodur-vm-1", "neodur-vm-3", "neodur-vb-8"],
  "NEODUR_MSM_3_5_MSB_8_de.pdf": ["neodur-msm-3", "neodur-msm-5", "neodur-msb-8"],
  // NEODUR AM Super/Plus: nicht mehr im Sortiment (#271) — TDS entfällt
  "NEODUR_AM_Super_AM_Plus_de.pdf": null,
  "KORODUR_KOROTAN_de.pdf": ["system-korodur-korotan"],

  // --- SDS über Produktfamilien (Klärung Steffi 2026-06-12: das sind die
  // Produkt-Datenblätter inkl. Varianten, keine "Gruppen"-Blätter) ---
  // Zugeordnet zu den Produkten der Familie, die kein spezifischeres SDS
  // haben. Konservativ geschnitten — fachliche Gegenprüfung im PR vermerkt.
  "KORODUR_Hartstoffe_SDB_de.pdf": [
    "korodur-vs-0-5", "korodur-wh-spezial", "korodur-wh-metallisch",
    "korodur-diamantbeton", "korodur-robust",
  ],
  "KORODUR_Industrieboden_Trockenmoertel_SDB_de.pdf": [
    "neodur-he-2", "neodur-he-40", "korodur-fscem", "korodur-fscem-screed",
  ],
  "KORODUR_Designboeden_SDB_de.pdf": ["granidur", "granidur-bianco-nero", "kcf"],
  "KORODUR_MICROTOP_SDB_de.pdf": [
    "microtop-tw-3", "microtop-tw-5", "microtop-tw-8", "microtop-tw-nsm",
    "microtop-tw-02", "microtop-tw-vsm",
  ],
  "KORODUR_Rapid_Set_SDB_de.pdf": [
    "rapid-set-cement-all", "rapid-set-mortar-mix", "rapid-set-mortar-mix-dur",
    "rapid-set-concrete-mix", "rapid-set-schnellbeton",
  ],
  "KORODUR_NEODUR_Vergussmoertel_SDB_de.pdf": [
    "neodur-vm-1", "neodur-vm-3", "neodur-vb-8", "neodur-vm-basic", "neodur-svm-03",
  ],
  "KORODUR_NEODUR_Pflasterfugenmoertel_SDB_de.pdf": ["neodur-pfm-ze", "neodur-pfm-1k-easyfix"],
  // Harz-/Härterkomponente: kein eindeutiges App-Produkt (2K-System) — zentral
  "KORODUR_Pflasterfugenmoertel_Haerterkomponente_SDB_de.pdf": "zentral",
  "KORODUR_Pflasterfugenmoertel_Harzkomponente_SDB_de.pdf": "zentral",
  "KORODUR_LevelFlor_TRU_SDB_de.pdf": ["rapid-set-levelflor", ...TRU_FAMILIE],
  "KORODUR_Rapid_Set_FAST_SDB_de.pdf": ["rapid-set-concrete-pharmacy"],
  "KORODUR_Rapid_Set_FLOW_Control_SDB_de.pdf": ["rapid-set-concrete-pharmacy"],
  "KORODUR_Rapid_Set_SET_Control_SDB_de.pdf": ["rapid-set-concrete-pharmacy"],
  // KOROMINERAL Lasur (entfernt 2026-06-23) + KOROPOX (ersetzt): Produkte sind
  // raus, SDBs bleiben für Bestandsware zentral im Download-Center.
  "KORODUR_KOROMINERAL_Lasur_Komponente_A_SDB_de.pdf": "zentral",
  "KORODUR_KOROMINERAL_Lasur_Komponente_B_SDB_de.pdf": "zentral",
  "KORODUR_KOROPOX_Komponente_A_SDB_de.pdf": "zentral",
  "KORODUR_KOROPOX_Komponente_B_SDB_de.pdf": "zentral",
  "KORODUR_TXPK_Komponente_A_SDB_de.pdf": ["korodur-txpk"],
  "KORODUR_TXPK_Komponente_B_SDB_de.pdf": ["korodur-txpk"],
  "KORODUR_HB_5_60_rapid_SDB_de.pdf": ["korodur-hb-5-rapid", "neodur-he-60-rapid"],
  "KORODUR_KOROSEAL_SDB_de.pdf": "zentral", // kein Produkt in der App

  // --- DoP: Sichtestrich-Familie (Dateinamen ohne Produkt-Präfix) ---
  "13813_5.1_Copetti_Floor_KCF_05_de.pdf": ["kcf"],
  "13813_5.2_Copetti_Floor_KCF_08_de.pdf": ["kcf"],
  "13813_5.3_GRANIDUR_03_de.pdf": ["granidur"],
  "13813_5.4_GRANIDUR_05_de.pdf": ["granidur"],
  "13813_5.5_GRANIDUR_08_de.pdf": ["granidur"],
  "13813_5.6_GRANIDUR_BIANCO_de.pdf": ["granidur-bianco-nero"],
  "13813_5.7_GRANIDUR_NERO_de.pdf": ["granidur-bianco-nero"],

  // --- Anwendungsempfehlungen (thematisch) ---
  "1.-Schicht-Frisch-auf-Frisch.pdf": ["neodur-he-65", "neodur-he-65-plus", "neodur-he-40"],
  "2.-Schicht-auf-erhaerteten-Tragbeton.pdf": ["neodur-he-65", "neodur-he-65-plus", "neodur-he-40"],
  "3.-Hartstoffeinstreuung-1.pdf": ["neodur-he-3", "neodur-he-3-green", "neodur-he-2"],
  "4.-NEODUR-Level.pdf": ["neodur-level"],
  "5.-Sichtestriche-KCF-und-Granidur.pdf": ["kcf", "granidur", "granidur-bianco-nero"],
  "6.-HE-65-metallisch-auf-erhaerteten-Tragbeton-1.pdf": ["neodur-he-65"],
  "7.-TRU-Sichtestriche.pdf": TRU_FAMILIE,
  "8.-Rapid-Set-Reparaturmoertel.pdf": RAPID_REPARATUR,
  "9.-Mortar-Mix-Pflasterverfugung.pdf": ["rapid-set-mortar-mix"],
  "10.-Rapid-Set-Reparaturmoertel_DOT-fuer-Verkehrsflaechen.pdf": ["dot-europe-concrete-mix"],
  "13-Rapid-Set-Reparaturmoertel_Sannierungsarbeiten.pdf": RAPID_REPARATUR,

  // --- Reinigung/Pflege ---
  "Leitfaden_KOROCLEAN_de.pdf": ["koroclean"],
  "Pflegehinweis_GRANIDUR_MKS_Funke_de.pdf": ["granidur", "granidur-bianco-nero"],
  "Pflegehinweis_KORODUR_COPETTI_FLOOR_OBTEGO_de.pdf": ["kcf"],
  "Pflegehinweis_KORODUR_Hartstoff_Industrieboeden_MKS_Funke_de.pdf": HARTSTOFF_BODEN,
  "7._TRU_Sichtestriche.pdf": TRU_FAMILIE,

  // --- Lieferprogramm ---
  "KORODUR_Lieferprogramm_de_2025.pdf": "zentral",
};

// ---- Zusatz-TDS aus docs/tds-quellen (von Steffi geliefert, nicht auf der
// Alt-Site-Datenblätterseite — z. B. neue Produkte) -------------------------
const ZUSATZ_TDS_QUELLEN = {
  // KOROMINERAL_Lasur_de_.pdf entfernt: Produkt existiert nicht mehr (2026-06-23)
};

// ---- Service-Seiten parsen --------------------------------------------------
const SEITEN = [
  ["dattenblaetter.html", "tds"],
  ["sicherheitsdatenblaetter.html", "sds"],
  ["leistungserklaerungen.html", "dop"],
  ["anwendungsempfehlungen.html", "anwendung"],
  ["reinigungsempfehlung.html", "reinigung"],
  ["lieferprogramm.html", "zentraldoc"],
];

// Inventar: url -> Zeile (für lokalen Pfad + Sprachvarianten)
const inventar = [];
{
  const [kopf, ...zeilen] = fs.readFileSync(INVENTAR, "utf-8").trim().split(/\r?\n/);
  const spalten = kopf.split(",").map((s) => s.trim());
  for (const z of zeilen) {
    // einfache CSV ohne eingebettete Kommas/Quotes (geprüft)
    const teile = z.split(",").map((t) => t.trim());
    inventar.push(Object.fromEntries(spalten.map((s, i) => [s, teile[i] ?? ""])));
  }
}
const proUrl = new Map(inventar.map((r) => [r.url, r]));

function titelAusDatei(datei, typ) {
  let t = datei
    .replace(/\.pdf$/i, "")
    .replace(/^[\d._-]+(?=[A-Za-z])/, "")
    .replace(/_(SDB)(_|$)/i, "_")
    .replace(/_(de|en|fr)(_\d{4})?$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return t;
}

const produktDokumente = {}; // id -> [{typ,titel,datei,sprache}]
const zentraleDokumente = [];
const bereichDokumente = {}; // bereich-slug -> [{typ,titel,url,sprache}] (#442, Broschüren-Teaser)
const unzugeordnet = [];

// Produkt-IDs, die es wirklich gibt — Zuordnungen auf entfernte Produkte
// (z. B. eingestellte Altprodukte) sollen auffallen statt still zu verwaisen.
const bekannteIds = new Set(namenJeProdukt.keys());
function pruefeIds(ids, quelle) {
  for (const id of ids) {
    if (!bekannteIds.has(id)) unzugeordnet.push(`UNBEKANNTE PRODUKT-ID "${id}" (${quelle})`);
  }
}

let waybackAusgeliefert = 0;

function ablegen(ziel, typ, url, sprache) {
  let inv = proUrl.get(url);
  if (!inv) { unzugeordnet.push(`FEHLT IM INVENTAR: ${url}`); return; }
  // Es gilt der Service-Seiten-Link (zuletzt offiziell verlinkte Revision).
  // Liegt live eine gleichnamige Datei in einem NEUEREN Upload-Ordner, ist das
  // die Nachfolge-Revision → bevorzugen. Wayback-Stände sind PDF-validiert.
  const basename = path.basename(url);
  const neuerLive = inventar
    .filter((r) => r.quelle === "live" && path.basename(r.url) === basename && r.lokaler_pfad > inv.lokaler_pfad)
    .sort((a, b) => (a.lokaler_pfad < b.lokaler_pfad ? 1 : -1))[0];
  if (neuerLive) inv = neuerLive;
  if (inv.quelle === "wayback") waybackAusgeliefert++;
  const datei = basename;
  const typOrdner = typ === "zentraldoc" ? "service" : typ;
  const zielRel = `/downloads/${typOrdner}/${datei}`;
  const zielAbs = path.join("public", zielRel);
  fs.mkdirSync(path.dirname(zielAbs), { recursive: true });
  fs.copyFileSync(path.join(ARCHIV, inv.lokaler_pfad), zielAbs);
  const eintrag = { typ: typ === "zentraldoc" ? "service" : typ, titel: titelAusDatei(datei, typ), url: zielRel, sprache };
  if (ziel === "zentral") zentraleDokumente.push(eintrag);
  else {
    pruefeIds(ziel, datei);
    for (const id of ziel) (produktDokumente[id] ??= []).push(eintrag);
  }
}

for (const [snapDatei, typ] of SEITEN) {
  const raw = fs.readFileSync(path.join(SNAP, snapDatei), "utf-8");
  const urls = [...new Set(raw.match(/https:\/\/www\.korodur\.de\/wp-content\/uploads\/[^"']+\.pdf/g) ?? [])];
  for (const url of urls) {
    const datei = path.basename(url);
    let ziel;
    if (datei in MANUAL_MAP) {
      if (MANUAL_MAP[datei] === null) continue; // bewusst nicht ausliefern (Stale-Produkt)
      ziel = MANUAL_MAP[datei] === "zentral" ? "zentral" : MANUAL_MAP[datei];
    } else {
      const id = autoMatch(datei);
      if (!id) { unzugeordnet.push(`${typ}: ${datei}`); continue; }
      ziel = [id];
    }
    ablegen(ziel, typ, url, "de");

    // Sprachvarianten (en/fr) desselben Dokuments aus dem Inventar mitnehmen:
    // gleicher Basisname mit _en/_fr statt _de, neuester Ordner (live bevorzugt
    // über die Nachfolge-Revisions-Logik in ablegen()).
    if (typ === "tds" && /_de(_\d{4})?\.pdf$/i.test(datei)) {
      for (const lang of ["en", "fr"]) {
        const muster = datei.replace(/_de(_\d{4})?\.pdf$/i, `_${lang}$1.pdf`).replace(/\.pdf$/, "");
        const kandidaten = inventar
          .filter((r) => r.dokumenttyp === "TDS" && path.basename(r.url).startsWith(muster))
          .sort((a, b) => (a.lokaler_pfad < b.lokaler_pfad ? 1 : -1));
        if (kandidaten[0]) ablegen(ziel, typ, kandidaten[0].url, lang);
      }
    }
  }
}

// Zusatz-TDS aus docs/tds-quellen kopieren und verknüpfen
for (const [datei, ziel] of Object.entries(ZUSATZ_TDS_QUELLEN)) {
  const quelle = path.join("docs/tds-quellen", datei);
  if (!fs.existsSync(quelle)) { unzugeordnet.push(`ZUSATZ FEHLT: ${quelle}`); continue; }
  const zielRel = `/downloads/tds/${datei}`;
  fs.mkdirSync("public/downloads/tds", { recursive: true });
  fs.copyFileSync(quelle, path.join("public", zielRel));
  const eintrag = { typ: "tds", titel: titelAusDatei(datei, "tds"), url: zielRel, sprache: "de" };
  for (const id of ziel) (produktDokumente[id] ??= []).push(eintrag);
}

// ---- Overlay: verifizierte Funde aus dem WP-Export 2026-06-11 (#121) --------
// Quelle: data/dokument-funde-2026-06.json (Notion „Dokument-Funde korodur.de").
// Im App-Inventar fehlende, curl-verifizierte Produktdokumente (TDS in EN/FR/PL,
// SDS, DoP). PDFs werden bei Bedarf von korodur.de nach public/downloads/<typ>/
// geladen (idempotent: vorhandene Dateien werden nicht erneut geholt).
{
  const { dokumente: funde } = JSON.parse(
    fs.readFileSync("data/dokument-funde-2026-06.json", "utf-8")
  );
  let geladen = 0;
  let verknuepft = 0;
  for (const f of funde) {
    const datei = path.basename(new URL(f.url).pathname);
    const zielRel = `/downloads/${f.typ}/${datei}`;
    const zielAbs = path.join("public", zielRel);
    if (!fs.existsSync(zielAbs)) {
      await downloadPdf(f.url, zielAbs);
      geladen++;
    }
    const eintrag = { typ: f.typ, titel: f.titel, url: zielRel, sprache: f.sprache };
    for (const id of f.produkte) {
      const liste = (produktDokumente[id] ??= []);
      if (!liste.some((d) => d.url === zielRel)) {
        liste.push(eintrag);
        verknuepft++;
      }
    }
  }
  console.log(
    `Overlay (#121): ${geladen} PDFs geladen, ${verknuepft} Verknüpfungen aus ${funde.length} Funden.`
  );
}

// ---- Overlay 2: kuratierte Alt-Site-Übernahme (#442) ------------------------
// Quelle: data/dokument-funde-2026-07.json (erzeugt von
// scripts/build-dokument-uebernahme-442.py — verknüpfte Alt-Site-Downloads,
// die auf der neuen Site noch fehlten: Broschüren, EN/FR/PL/ES-Pendants,
// Service-Dokumente). PDFs kommen aus dem lokalen wp-content-Archiv;
// fehlt eine Datei im Spiegel, wird sie PDF-validiert von korodur.de geladen.
{
  const { dokumente: funde } = JSON.parse(
    fs.readFileSync("data/dokument-funde-2026-07.json", "utf-8")
  );
  let kopiert = 0;
  let geladen = 0;
  for (const f of funde) {
    for (const d of f.dateien) {
      const datei = path.basename(new URL(d.url).pathname);
      const zielRel = `/downloads/${f.typ}/${datei}`;
      const zielAbs = path.join("public", zielRel);
      if (!fs.existsSync(zielAbs)) {
        if (d.lokal && fs.existsSync(path.join(ARCHIV, d.lokal))) {
          fs.mkdirSync(path.dirname(zielAbs), { recursive: true });
          fs.copyFileSync(path.join(ARCHIV, d.lokal), zielAbs);
          kopiert++;
        } else {
          await downloadPdf(d.url, zielAbs);
          geladen++;
        }
      }
      const eintrag = { typ: f.typ, titel: f.titel, url: zielRel, sprache: d.sprache };
      if (f.ziel === "zentral") {
        if (!zentraleDokumente.some((x) => x.url === zielRel)) zentraleDokumente.push(eintrag);
      } else {
        pruefeIds(f.ziel, f.stamm);
        for (const id of f.ziel) {
          const liste = (produktDokumente[id] ??= []);
          if (!liste.some((x) => x.url === zielRel)) liste.push(eintrag);
        }
      }
      for (const slug of f.bereiche ?? []) {
        const liste = (bereichDokumente[slug] ??= []);
        if (!liste.some((x) => x.url === zielRel)) liste.push(eintrag);
      }
    }
  }
  console.log(`Overlay (#442): ${kopiert} PDFs aus dem Archiv kopiert, ${geladen} geladen, ${funde.length} Stämme.`);
}

// ---- Ausgabe -----------------------------------------------------------------
const ordnung = { tds: 0, sds: 1, dop: 2, anwendung: 3, reinigung: 4, farbkarte: 5, broschuere: 6, service: 7 };
const sprachOrd = { de: 0, en: 1, fr: 2, pl: 3, es: 4 };
const dokSort = (a, b) =>
  ordnung[a.typ] - ordnung[b.typ] || sprachOrd[a.sprache] - sprachOrd[b.sprache] || a.titel.localeCompare(b.titel);
for (const id of Object.keys(produktDokumente)) produktDokumente[id].sort(dokSort);
for (const slug of Object.keys(bereichDokumente)) bereichDokumente[slug].sort(dokSort);
zentraleDokumente.sort(dokSort);

const header = `// GENERIERT von scripts/generate-produkt-dokumente.mjs — NICHT von Hand editieren.
// Quellen: wp-content-Archiv der Alt-Site (Service-Seiten-Stand Okt/Nov 2025)
//   + data/dokument-funde-2026-06.json (verifizierte Funde WP-Export 2026-06-11, #121)
//   + data/dokument-funde-2026-07.json (kuratierte Alt-Site-Übernahme, #442).
// Regenerieren: node scripts/generate-produkt-dokumente.mjs

// \`farbkarte\` (#368): eigener Dokumenttyp für Farbkarten (bisher als "tds"
// fehl-typisiert). \`epd\` reserviert (Render sobald Datei vorliegt, V1-Slot).
// \`broschuere\` (#442): Bereichs-/Produktbroschüren und Flyer der Alt-Site.
export type DokumentTyp = "tds" | "sds" | "dop" | "epd" | "anwendung" | "reinigung" | "farbkarte" | "broschuere" | "service";

export interface ProduktDokument {
  typ: DokumentTyp;
  titel: string;
  url: string; // relativ unter public/, ohne basePath
  sprache: "de" | "en" | "fr" | "pl" | "es";
}
`;

fs.writeFileSync(
  "data/produktDokumente.ts",
  `${header}
export const PRODUKT_DOKUMENTE: Record<string, ProduktDokument[]> = ${JSON.stringify(produktDokumente, null, 2)};

/** Dokumente ohne (freigegebene) Produkt-Zuordnung — nur im Download-Center. */
export const ZENTRALE_DOKUMENTE: ProduktDokument[] = ${JSON.stringify(zentraleDokumente, null, 2)};

/** Bereichs-Downloads (#442): Broschüren/Flyer je Bereichs-Slug für den
 *  Download-Teaser auf Bereichsseiten. */
export const BEREICH_DOKUMENTE: Record<string, ProduktDokument[]> = ${JSON.stringify(bereichDokumente, null, 2)};
`
);

const mitDocs = Object.keys(produktDokumente).length;
const anzahl = Object.values(produktDokumente).reduce((n, d) => n + d.length, 0);
console.log(`Produkte mit Dokumenten: ${mitDocs} · Dokument-Verknüpfungen: ${anzahl} · zentral: ${zentraleDokumente.length}`);
console.log(`Davon aus Wayback rekonstruierte Stände (live bereits gelöscht): ${waybackAusgeliefert}`);
if (unzugeordnet.length) {
  console.log("\nUNZUGEORDNET (bitte MANUAL_MAP ergänzen):");
  for (const u of unzugeordnet) console.log("  -", u);
}

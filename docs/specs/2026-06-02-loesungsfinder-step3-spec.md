# Lösungsfinder — Schritt 3 Kategorisierung & Tag-Layer (Spec)

**Datum:** 2026-06-02 · **Status:** Spec zur Umsetzung, fachlicher Sign-off (Frank) für markierte Punkte offen
**Baut auf:** [V2.5-Logik & Filterung](https://www.notion.so/373670e19e1a81ea98aaee63e11aecd4) · TDS-Cluster-Konzept `docs/2026-06-02-einsatzbereich-cluster-tds.md` · TDS-Extraktion `TDS_Sanierungsprodukte/TDS_Extraktion_Review_2026-06-01.md`
**Betrifft Code (Branch `feature/loesungsfinder-v2-5`):** `data/types.ts`, `data/einsatzbereichMapping.ts`, `data/produkte.ts`, `data/referenzenV25.ts` (generiert via `scripts/migrate-refs-v25.ts`), `data/loesungsfinderV25.ts`

---

## 0 Worum es geht

Schritt 3 des Funnels heißt aktuell „Branche" (4 Innen- + 4 Außen-Cluster). Die Branche liefert intern ein Set Belastungs-Tags, das gegen `Produkt.belastungenAbgedeckt` gematcht wird. Zwei Probleme:

1. Der **Branchen-Schnitt** passt nicht zur Produktlogik (TDS) — er erzeugt Dubletten und tote Tags.
2. Der Schnitt passt nicht zur **Referenz-Realität** — zwei Außen-Cluster sind leer, einer ist überladen.

Diese Spec stellt Schritt 3 auf einen **referenzgedeckten 3+3-Schnitt** um und repariert den Tag-Layer. Der Funnel (Fläche → Innen/Außen → Schritt 3 → Zeitfenster, adaptiv) und der Match-Algorithmus bleiben unverändert.

---

## 1 Entscheidungen dieser Session (Steffi)

1. **Tag-Vokabular aufräumen + WHG ergänzen** (§2).
2. **Schnitt: 3 innen + 3 außen, referenzgedeckt** — keine Cluster ohne Referenzen (§4).
3. **Produkte ohne Referenz: Fallback + Lückenliste** (§6, §7).

---

## 2 Belastungs-Tag-Vokabular (neu)

`BelastungsTag` in `data/types.ts`:

| Tag | Status | Bedeutung |
|---|---|---|
| `schwerlast` | bleibt | Stapler/LKW/Schwerlast, hohe mechanische Last |
| `verschleiss` | bleibt | Abrieb-/Verschleißwiderstand (Hartstoff, Verschleißträger) |
| `staplerverkehr` | bleibt | rollender Verkehr, hubladerfest |
| `chemie` | bleibt | beständig gg. Öl/Benzin/Lösemittel/Säuren/Sulfat |
| `hygiene` | bleibt | nassraumtauglich, reinigungsfreundlich, lebensmittel-/pharmatauglich |
| `fleckschutz` | bleibt | fleckunempfindliche, pflegeleichte Oberfläche |
| `optik` | bleibt | dekorative/geschliffene Sichtoberfläche |
| `publikumsverkehr` | bleibt | repräsentative Flächen mit Publikum |
| `frost-tausalz` | bleibt | frost- **und** tausalzbeständig (Außen) |
| ~~`thermik`~~ | **gestrichen** | kein Produkt trägt ihn, kein TDS-Beleg |
| `whg` | **neu** | flüssigkeitsdicht / wassergefährdende Stoffe (WHG-Nachweis) |

---

## 3 `belastungenAbgedeckt` je Produkt — TDS-korrigiert

Nur die geänderten Produkte; übrige bleiben wie in V2.5. Quelle = `ANWENDUNG`/`EIGENSCHAFTEN` der TDS.

| Produkt | neu | Änderung | TDS-Beleg |
|---|---|---|---|
| NEODUR HE 40 | schwerlast, verschleiss, staplerverkehr, chemie | + staplerverkehr, + chemie | „hubladerfest"; „beständig gg. Benzin/Mineralöl/Lösemittel" |
| NEODUR HE 65 | schwerlast, verschleiss, staplerverkehr, chemie | + chemie | „beständig gg. Benzin/Mineralöl/Lösemittel" |
| NEODUR HE 65 Plus | schwerlast, verschleiss, staplerverkehr, chemie, frost-tausalz, **whg** | + whg | WHG-Nachweis, 25,7 mm flüssigkeitsdicht (einziges Produkt) |
| Rapid Set CEMENT ALL | frost-tausalz, chemie | + chemie, *verschleiss?* | sulfat-/chemiebeständig; `verschleiss` fraglich (Reparaturmörtel) |
| Rapid Set MORTAR MIX | frost-tausalz, chemie | + chemie | sulfat-/chemiebeständig |
| ASPHALT REPAIR MIX | frost-tausalz, schwerlast, chemie | + chemie | „beständig gg. viele chem. Angriffe" |
| Rapid Set Schnellbeton | frost-tausalz, schwerlast, staplerverkehr, chemie | + chemie | sulfatbeständig (TL BEB-StB) |

**Sign-off Frank:** `verschleiss` bei CEMENT ALL · `hygiene` bei HE-Estrichen + KOROCRETE (alle „wasserfest, nassraumtauglich") · Tausalz vs. nur Frost bei KOROCRETE · `hygiene`/`whg` bei MORTAR MIX/DUR.

---

## 4 Schritt-3-Cluster (3 innen + 3 außen)

Jeder Cluster trägt Belastungs-Tags (Match-Schlüssel) und ist durch Referenzen gedeckt. „zieht" = Top-Produkte nach Tag-Schnittmenge (mit korrigierten Tags aus §3).

### Innen

| id | Label (UI) | Stichworte | Tags | zieht | Refs |
|---|---|---|---|---|---|
| `innen-industrie-halle` | Industrie- & Hallenboden | Staplerverkehr, Schwerlast, Abrieb, Maschinen, Hochregallager | schwerlast, verschleiss, staplerverkehr, chemie | HE 40/60/65/65 Plus, NEODUR Level, MORTAR MIX DUR, DOT, KOROCRETE | 25 |
| `innen-nass-hygiene-chemie` | Nass-, Hygiene- & Chemiefläche | Nassbereich, Lebensmittel, Pharma, Reinigung, Säuren | hygiene, chemie, whg | HE 65 Plus, KOROCRETE, CEMENT ALL, MORTAR MIX, TRU | 3 |
| `innen-sicht-design` | Sicht- & Designboden | Optik, Repräsentation, Verkauf, Publikumsverkehr | optik, fleckschutz, publikumsverkehr | TRU Self-Leveling, NEODUR Level | 3 |

### Außen

| id | Label (UI) | Stichworte | Tags | zieht | Refs |
|---|---|---|---|---|---|
| `aussen-verkehr-infrastruktur` | Verkehrs- & Infrastrukturfläche | Straße, Brücke, Flugbetrieb, schnelle Freigabe | frost-tausalz, schwerlast, chemie | DOT, Rapid Set Schnellbeton, ASPHALT REPAIR MIX, HE 60/65 Plus | 13 |
| `aussen-parkdeck` | Parkdeck & Parkfläche | PKW-Verkehr, Tausalz, Reifenabrieb, Öltropfen | frost-tausalz, chemie, verschleiss | HE 65 Plus, DOT, CEMENT ALL | 4 |
| `aussen-umwelt-whg` | Umwelt- & WHG-Fläche | Tankstelle, Waschplatz, Auffangbehälter, Hafen, Gefahrgut | whg, chemie, frost-tausalz | HE 65 Plus, DOT, CEMENT ALL, MORTAR MIX | ~3 |

**Entfallen** (keine Referenzen): `aussen-verladezone-rampe`, `aussen-werkhof-aussenlager`. Außen-Industriefälle deckt `aussen-verkehr-infrastruktur` bzw. die HE-Produktwelt mit ab. „Tiefgarage innen" entfällt ebenfalls — HE-Produkte decken den Fall im Industrie-Cluster.

---

## 5 Referenz-Re-Mapping (51 Referenzen → 6 Cluster)

V2.5 `referenzenV25.ts` ist generiert. Re-Mapping über `scripts/migrate-refs-v25.ts` (Mapping-Tabelle bzw. Quell-`einsatzbereiche`), **nicht** von Hand in der generierten Datei.

| alt (V2.5) | → neu | Anzahl |
|---|---|---|
| innen-lager-logistik (12) + innen-industrie-produktion (13) | `innen-industrie-halle` | 25 |
| innen-lebensmittel-pharma (3) | `innen-nass-hygiene-chemie` | 3 |
| innen-verkauf-showroom (3) | `innen-sicht-design` | 3 |
| aussen-parkdeck-tiefgarage (4) | `aussen-parkdeck` | 4 |
| aussen-infrastruktur-verkehr (16) | **Split:** 13 → `aussen-verkehr-infrastruktur`, 3 → `aussen-umwelt-whg` | 13 + 3 |
| aussen-verladezone-rampe (0), aussen-werkhof-aussenlager (0) | — (entfällt) | 0 |

**Split der überladenen 16 Infra-Referenzen → WHG:** „LKW Waschstraße", „TEXACO Tankfläche, Arnheim", „Hafen Catania" → `aussen-umwelt-whg`. Rest bleibt `aussen-verkehr-infrastruktur`. (Prüfen: „Helipad"/„Hubschrauber-Landeplatz" — Infrastruktur, nicht WHG.)

Summe: 31 innen + 20 außen = 51. ✓

---

## 6 Referenz-Fallback (Match-Logik)

Heute zeigt der Finder eine Referenz nur bei striktem UND (Fläche × Innen/Außen × Cluster). Bei schiefem Referenz-Set liefert das oft null. Neu: **stufenweises Lockern**, bis ≥ 1 Referenz steht.

1. Strikt: Fläche × Innen/Außen × Cluster (+ Zeitfenster bei Zeitdruck).
2. Fallback A: Innen/Außen × Cluster (Fläche fallen lassen).
3. Fallback B: Innen/Außen × Produktwelt der Top-Empfehlung (Cluster fallen lassen).
4. Fallback C: Referenzen, die das empfohlene Produkt verwenden (clusterunabhängig).

UI kennzeichnet gelockerte Treffer dezent („verwandte Projekte"). So steht neben jeder Produktempfehlung immer mindestens eine Referenz.

---

## 7 Referenz-Lückenliste (akquirieren)

| Produkt | Refs | Maßnahme |
|---|---|---|
| NEODUR HE 40 | 0 | Projektbeleg im Set ergänzen (Kernprodukt; Eignung unstrittig) |
| Rapid Set Schnellbeton | 0 | Projektbeleg ergänzen (Infrastruktur-Sanierung) |
| TRU Self-Leveling | 1 | dünn — weitere Design-/Sichtboden-Referenz wünschenswert |
| Rapid Set MORTAR MIX DUR | 1 | dünn |

Bis Belege existieren, greift §6 (Fallback).

---

## 8 Umsetzungs-Schritte (Code)

1. `data/types.ts`: `BelastungsTag` (−`thermik`, +`whg`); `EinsatzbereichV25` auf neue 6 ids.
2. `data/einsatzbereichMapping.ts`: `EINSATZBEREICH_TAGS` + `EINSATZBEREICH_LABELS` (Titel + Stichworte) auf §4.
3. `data/produkte.ts`: `belastungenAbgedeckt` je Produkt gem. §3.
4. `scripts/migrate-refs-v25.ts`: Mapping gem. §5, danach `referenzenV25.ts` neu generieren.
5. `data/loesungsfinderV25.ts`: Referenz-Fallback §6.
6. i18n: neue Labels/Stichworte in `dictionaries/{de,en,fr,pl}.json` (gegen KORODUR-Glossar).
7. Validierung: `npx tsx scripts/validate-referenzen.ts`, `npx tsx scripts/test-loesungsfinder.ts`.

---

## 9 Offene Sign-off-Punkte (Frank)

`verschleiss` CEMENT ALL · `hygiene` HE/KOROCRETE · KOROCRETE Tausalz · WHG/hygiene MORTAR MIX · Bestätigung WHG-Split der 3 Infra→WHG-Referenzen · ob „Helipad/Hubschrauber-Landeplatz" Infrastruktur oder WHG.

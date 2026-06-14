# Produkt-Klassifizierung: Source of Truth (SoT)

**Datum:** 2026-06-14
**Scope:** Issues #93 (Produktart/Rolle), #94 (Spezialbaustoff-Untergruppen), #97 (Normen-Glossar), #110 (Varianten-Switch PDP) plus verifizierte Excel-vs-App-Diskrepanzen
**Status:** Entwurf, Sign-off Frank ausstehend

---

## 1. Kontext & Quellen

Die Excel-Datei ist Source of Truth (SoT) fuer Produktklassen, Normen und Festigkeitsklassen. Bei Widerspruechen zwischen App-Daten (`data/produkte.ts`) und Excel gilt der Excel-Wert. Wir leiten aus dem SoT vier Modellierungs-Themen ab und fuehren die belegten Diskrepanzen.

**Mengengeruest:** 78 Top-Level-Produkte im Modell. Davon fallen Katzenstreu (`goodcat-*`), Additive, Anker und Pflasterfugen aus dem Rollen-Schema (keine Boden-/Sanierungsbauprodukte).

**Relevante Dateien:**

- `data/types.ts` — Enum-Typen
- `data/produkte.ts` — Interface `Produkt` + Produktdaten
- `data/bereiche.ts` — Bereiche und `produktgruppen`-Deklaration
- `app/[lang]/produkte/[id]/page.tsx` — PDP-Rendering
- `app/[lang]/dictionaries/{de,en,fr,pl,es}.json` — UI-Labels
- `data/i18n/getLocalized.ts`, `data/i18n/produkte.{en,fr,pl,es}.ts` — Lokalisierung
- `scripts/validate-produkte.ts` — Validator

**Bereits vorhanden:** `systemBegleitprodukte?: string[]` (Z99) verknuepft Haftbruecken/Grundierungen mit Bodenprodukten (z.B. Z163 `systemBegleitprodukte: ["korodur-hb-5-rapid"]`). Das bestehende `kategorie`-Enum trennt `grundierung`/`nachbehandlung`/`beschichtung`, mischt aber Haftbruecke + Grundierung + Impraegnierung in einer Rolle; `bereich` ist reine Website-Navigation.

---

## 2. Produktart-Rollen-Modell (#93)

### 2.1 Vorschlag Datenmodell-Feld

Zwei neue optionale Felder auf `interface Produkt` (`data/produkte.ts`, nach Z82) plus ein neuer Enum-Typ in `data/types.ts`. Die Rolle ist **orthogonal** zu `kategorie` (Material-Klasse) und `bereich` (Website-Nav).

```ts
// data/types.ts
/** Funktionale Rolle eines Produkts im Bodenaufbau/Sanierungssystem.
 *  Orthogonal zu `kategorie` (Material-Klasse) und `bereich` (Website-Nav). */
export type ProduktRolle =
  | "bodenprodukt"
  | "haftbruecke"
  | "oberflaechenfinish"
  | "impraegnierung"
  | "nachbehandlung"
  | "reparaturmoertel"
  | "spritzmoertel"
  | "vergussmoertel";
```

```ts
// data/produkte.ts  (interface Produkt)
/** Funktionale Rolle im Bodenaufbau. Treibt Sektions-Gruppierung
 *  (Bodenprodukte zuerst, Haftbruecken/Finish in eigene Sektion).
 *  Optional, weil Additive/Systeme/Katzenstreu keine Rolle haben. */
rolle?: ProduktRolle;

/** Slug der empfohlenen Haftbruecke. NUR an bodenprodukt-Rollen gepflegt.
 *  Spiegelt die fachliche 1:1-Empfehlung (vs. systemBegleitprodukte,
 *  das mehrere Begleitprodukte ohne Rollensemantik listet). */
empfohleneHaftbruecke?: string;  // muss in alleIds existieren (Validator)
```

**Empfehlung Abgrenzung gegen `systemBegleitprodukte`:** `empfohleneHaftbruecke` nicht redundant befuellen. `systemBegleitprodukte` ist bereits gepflegt (HB 5 / HB 5 rapid / PC / TXPK liegen dort als Slugs) und wird vom Loesungsfinder-Match (`produktFilterV25`) genutzt. Ein zweites freies Slug-Feld erzeugt Pflege-Drift. Saubere Alternative: kein neues Feld, sondern Helper `getEmpfohleneHaftbruecke(produkt)`, der aus `systemBegleitprodukte` den Eintrag mit `rolle === "haftbruecke"` herausfiltert.

**Unsere Empfehlung:** `rolle` einfuehren + Haftbruecke per Helper aus `systemBegleitprodukte` ziehen. `empfohleneHaftbruecke` nur dann als explizites Feld, wenn Marketing eine von der Systemliste abweichende kuratierte Einzel-Empfehlung braucht.

**Warum nicht `kategorie` wiederverwenden:** `kategorie` mischt Material-Klassen (`estrich`, `schnellzement`, `beschichtung`) mit Funktions-Rollen (`grundierung`, `nachbehandlung`). Es trennt `impraegnierung` nicht von `koropox`-Beschichtung und kennt kein `spritzmoertel`/`vergussmoertel`. Eine orthogonale Rollen-Achse ist sauberer als das Ueberladen des bestehenden Enums.

**Validator-Erweiterung** (`scripts/validate-produkte.ts`): `rolle` gegen `ALLOWED_ROLLE`-Enum pruefen (error). Falls `empfohleneHaftbruecke` als Feld kommt: Slug muss in `alleIds` existieren UND das referenzierte Produkt muss `rolle === "haftbruecke"` haben (error).

**Sektions-Reihenfolge (L8):** "Bodenprodukte zuerst, Haftbruecken + Finish in eigene Sektion" ist Render-Logik, kein Datenfeld. Reihenfolge per konstantem Array `ROLLEN_REIHENFOLGE` im UI definieren.

### 2.2 Mapping-Tabelle Produkt -> Rolle

#### Bodenprodukte (`rolle = bodenprodukt`)

| id | name | empfohleneHaftbruecke (Slug) | Quelle der HB-Zuordnung |
|---|---|---|---|
| neodur-he-60-rapid | NEODUR HE 60 rapid | korodur-hb-5-rapid | bereits in `systemBegleitprodukte` (Z163) |
| neodur-he-65 | NEODUR HE 65 | korodur-hb-5 | analog Hartstoffestrich |
| neodur-he-65-plus | NEODUR HE 65 Plus | korodur-hb-5 | analog |
| neodur-he-40 | NEODUR HE 40 | korodur-hb-5 | analog |
| neodur-he-3 | NEODUR HE 3 | - (Einstreuung frisch auf frisch, keine HB) | Einstreuverfahren |
| neodur-he-3-green | NEODUR HE 3 green | - (Einstreuung) | Einstreuverfahren |
| neodur-he-2 | NEODUR HE 2 | - (Einstreuung) | Einstreuverfahren |
| neodur-level | NEODUR Level | korodur-pc | bereits `systemBegleitprodukte` (Z350) |
| neodur-level-au | NEODUR Level AU | korodur-pc | analog selbstverlaufend |
| rapid-set-levelflor | Rapid Set LevelFlor | korodur-txpk | Excel: LevelFlor auf TXPK-Grundierung (Z1566) |
| korodur-fscem | KORODUR FSCem | ? (unklar) | Luecke |
| korodur-fscem-screed | KORODUR FSCem Screed | ? (unklar) | Luecke |
| granidur | GRANIDUR (05/08) | ? (unklar) | Luecke |
| granidur-bianco-nero | GRANIDUR BIANCO/NERO | ? (unklar) | Luecke |
| kcf | KORODUR COPETTI FLOOR KCF | ? (unklar) | Luecke |
| tru-self-leveling | TRU Self-Leveling | ? (unklar) | Luecke |
| tru-pc | TRU PC | ? (unklar) | Luecke |
| tru-sp | TRU SP | korodur-txpk? | Z1600 verweist auf txpk, pruefen |

Hartstoffe als Zuschlag (KORODUR 0/4, VS 0/5, WH-Spezial, WH-metallisch, Diamantbeton) und Kunstharz-Hartstoffe (DUROP, Robust) sind **Bestandteile** von Bodenprodukten, keine eigenstaendigen Boeden. Siehe Luecke L4.

#### Haftbruecken (`rolle = haftbruecke`)

| id | name | Excel-Regel |
|---|---|---|
| korodur-hb-5 | KORODUR HB 5 | HB 5 = Haftbruecke |
| korodur-hb-5-rapid | KORODUR HB 5 rapid | HB 5 rapid = Haftbruecke |
| korodur-uniprimer | KORODUR uniPrimer | uniPrimer = Haftbruecke |
| korodur-pc | KORODUR PC | PC Grundierung = Haftbruecke |
| korodur-txpk | KORODUR TXPK | TXPK = Haftbruecke |

#### Oberflaechenfinish / Nachbehandlung (`rolle = nachbehandlung` bzw. `oberflaechenfinish`)

| id | name | Excel-Regel | Hinweis |
|---|---|---|---|
| korodur-easyfinish | KORODUR easyFinish | easyFinish = Nachbehandlung/Finish | siehe L2 (Finish vs. Nachbehandlung) |
| korodur-nanofinish | KORODUR nanoFinish | nanoFinish = Nachbehandlung/Finish | |
| korotex | KOROTEX | KOROTEX = Nachbehandlung/Finish | |
| koromineral-cure | KOROMINERAL CURE | KOROMINERAL CURE = Nachbehandlung/Finish | Doppelrolle mit Impraeg., siehe L1 |
| korocure | KOROCURE | (nicht in Excel-Regel genannt) | Modell-`kategorie: nachbehandlung` -> `nachbehandlung` |

#### Impraegnierung (`rolle = impraegnierung`)

| id | name | Excel-Regel |
|---|---|---|
| koromineral | KOROMINERAL | KOROMINERAL = Impraegnierung |
| koromineral-li | KOROMINERAL Li+ | Li+ = Impraegnierung |
| koromineral-cure | KOROMINERAL CURE | auch hier gelistet -> Doppelrolle, siehe L1 |
| koromineral-lasur | KOROMINERAL Lasur | nicht in Excel-Regel, Modell-`produktgruppe: impraegnierung` -> `impraegnierung` |
| koropox | KOROPOX | Epoxid, Modell-`produktgruppe: impraegnierung` -> `impraegnierung` (siehe L5) |

#### Reparatur- / Spritz- / Vergussmoertel

| id(s) | rolle |
|---|---|
| rapid-set-cement-all, ...-mortar-mix(-dur), ...-concrete-mix, asphalt-repair-mix, dot-europe-concrete-mix, korocrete, rapid-set-schnellbeton | reparaturmoertel |
| neodur-msm-3, neodur-msm-5, neodur-msb-8, microtop-tw-3/5/8/nsm/02/vsm/nsd, microtop-tw-bm, microtop-tw-mineral | spritzmoertel (TW BM/Mineral = Beschichtung/Schutz, siehe L6) |
| neodur-vm-1/3/5, neodur-vb-8, neodur-vm-basic, neodur-svm-03/4 | vergussmoertel |

#### Nicht im Rollen-Schema (kein Tag)

`neodur-am-super`, `neodur-am-plus` (Anker/Injektion), `rapid-set-concrete-pharmacy` (Additive), `korotan`, `koroclean`, `korodur-silosystem`, `system-korodur-korotan` (Systeme/Additive), `neodur-pfm-1k-easyfix`, `neodur-pfm-ze` (Pflasterfugen), `goodcat-*` (Katzenstreu).

### 2.3 Luecken / Unklarheiten (#93)

- **L1 — KOROMINERAL CURE Doppelrolle:** In Excel UND Modell doppelt gefuehrt (Nachbehandlung Z45 + Impraegnierung Z48; Modell: `koromineral-cure` als `nachbehandlung`). `rolle` ist single-valued. Entscheidung noetig: primaere Rolle festlegen ODER `rolle?: ProduktRolle[]` als Array. Empfehlung: primaer `nachbehandlung`, Impraegnier-Eigenschaft ueber `zusatzfunktionen`.
- **L2 — Finish vs. Nachbehandlung:** Issue nennt beide Rollen, Excel wirft sie in eine Sektion ("easyFinish/nanoFinish/KOROTEX/KOROMINERAL CURE = Nachbehandlung/Finish"). Abgrenzung unklar. Klaerung mit Frank. Default bis dahin: alle vier auf `nachbehandlung`.
- **L3 — empfohleneHaftbruecke nur fuer 3 von ~18 Bodenprodukten belegbar:** Fachlich gedeckt nur HE 60 rapid -> HB 5 rapid, Level -> PC, LevelFlor -> TXPK. Fuer Sichtestriche (GRANIDUR, KCF, TRU), FSCem und Hartstoff-Einstreuungen fehlt die Quelle. Nicht erfinden, Input Produktmanagement.
- **L4 — Hartstoffe & Kunstharz-Hartstoffe sind keine Boeden:** KORODUR 0/4, VS 0/5, WH-Spezial/-metallisch, Diamantbeton, DUROP, Robust sind Einstreu-/Zuschlagstoffe. Eigene Rolle (`hartstoffeinstreuung`?) oder kein Tag? Issue-Enum kennt keine. Klaerung noetig.
- **L5 — Impraegnierung ausserhalb der Excel-Regel:** `koromineral-lasur` und `koropox` haben Modell-`produktgruppe: impraegnierung`, sind aber in der Excel-Regel nicht genannt. KOROPOX ist Epoxid (Reaktionsharz), keine mineralische Silikatisierung, `impraegnierung` evtl. fachlich falsch. Bestaetigen.
- **L6 — TW BM / TW Mineral:** Modell `kategorie: beschichtung`, `produktgruppe: beschichtung-schutz`. Issue-Enum hat keine `beschichtung`-Rolle. Als `spritzmoertel` taggen waere falsch. Luecke im Rollen-Enum oder bewusst ohne Tag.
- **L7 — Reine Spritz-/Verguss-/Reparatur-Rollen sind Issue-Scope-Erweiterung:** Issue fokussiert Boden + Haftbruecke + Finish. Mapping oben aus `produktgruppe`/`bereich` abgeleitet, gut belegt, aber ohne expliziten Excel-Sign-off.
- **L8 — Sektions-Reihenfolge ist Render-Logik:** siehe 2.1, kein Datenfeld noetig.

---

## 3. Spezialbaustoff-Untergruppen (#94)

### Kernaussage

Der Excel-SoT gliedert die Spezialbaustoffe in **fuenf** funktionale Untergruppen. Das Modell deckt vier ab, mit drei strukturellen Abweichungen: (1) Spritzmoertel haengen unter `betoninstandsetzung` statt einer eigenen Spritz-Gruppe, (2) Schnellreparatur und Impraegnierung liegen in anderen `bereich`-Kontexten (rapid-set, industrieboden), (3) `betoninstandsetzung` ist im Modell eine produktgruppe, im Excel aber nur eine Norm-Spalte (DIN EN 1504-3), keine eigene Untergruppe.

### 3.1 Untergruppen-Liste mit Produkten (aus Excel-SoT)

| Excel-Untergruppe | Excel-Zeilen | Produkte (Excel) | Marke |
|---|---|---|---|
| Spritzmoertel / -beton | 58-67 | MSM 3, MSM 5, MSB 8 (NEODUR) · TW 3, TW 5, TW 8, TW NSM, TW 02, TW BM, TW VSM (MICROTOP) | NEODUR / MICROTOP |
| Vergussmoertel / -beton | 69-75 | VM 1, VM 3, VM 5, VB 8, VM basic, SVM 03, SVM 4 | NEODUR |
| Schnellreparatur | 50-56 | CEMENT ALL (+Plus), MORTAR MIX (+Dur), CONCRETE MIX, DOT Europe CONCRETE MIX, ASPHALT REPAIR MIX | Rapid Set |
| Pflasterfugen (PFM) | - (in Modell, nicht im Excel-SoT-Dump) | PFM 1K Easyfix, PFM-ZE (+Flex) | NEODUR |
| Impraegnierung / Silikatisierung | 46-48 | KOROMINERAL, KOROMINERAL Li+, KOROMINERAL CURE | KORODUR |

Beobachtung: Das Excel mischt Marken/Bereiche innerhalb funktionaler Untergruppen. MICROTOP-TW steht im Excel unter "Spritzmoertel" zusammen mit NEODUR MSM/MSB, im Modell ist es ein eigener `bereich: microtop`. Schnellreparatur ist im Modell `bereich: rapid-set`, Impraegnierung `bereich: industrieboden`.

### 3.2 Vorschlag produktgruppe-Werte + Anker-Chips

Bezogen auf `bereich: spezialbaustoffe` (15 Produkte im Modell):

| Untergruppe | produktgruppe-Key | Anker-Chip / Label (de.json) | Produkte (bereich=spezialbaustoffe) |
|---|---|---|---|
| Spritzmoertel/-beton | `spritzmoertel` (NEU) | "Spritzmoertel & Spritzbeton" | neodur-msm-3, neodur-msm-5, neodur-msb-8 |
| Vergussmoertel/-beton | `verguss` (bestehend) | aktuell "Montage- & Vergusssystem" -> Vorschlag "Verguss- & Montagemoertel" | neodur-vm-1/-3/-5, neodur-vb-8, neodur-vm-basic, neodur-svm-03, neodur-svm-4 |
| Anker/Injektion | `anker-injektion` (bestehend) | "Anker- & Injektionssystem" | neodur-am-super, neodur-am-plus |
| Pflasterfugen | `pflasterfugen` (bestehend) | "Pflasterfugenmoertel" | neodur-pfm-1k-easyfix, neodur-pfm-ze |
| Schnellbeton | `schnellbeton` (bestehend) | "Schnellbeton-Systeme" | korocrete |

Kern-Vorschlag: **Neue produktgruppe `spritzmoertel`** fuer NEODUR MSM 3/5, MSB 8, die aktuell falsch unter `betoninstandsetzung` liegen. Im Excel ist "Spritzmoertel/Spritzbeton" eine klar abgegrenzte Sub-Gruppe (Z57 Sub-Header), waehrend "Betoninstandsetzung" dort nur eine Norm-Spalte (DIN EN 1504-3) ist.

### 3.3 Abgleich mit vorhandenen produktgruppe-Werten

Im `bereich: spezialbaustoffe` deklariert (`bereiche.ts` Z53): `["verguss", "anker-injektion", "betoninstandsetzung", "pflasterfugen", "schnellbeton"]`

- **Abweichung 1 — `betoninstandsetzung` semantisch falsch belegt:** Modell MSM 3/5, MSB 8 -> `produktgruppe: betoninstandsetzung`. Excel: diese drei unter Sub-Header "Spritzmoertel/beton" (Z57-60); "Betoninstandsetzung" ist im Excel eine Norm-Spalte (DIN EN 1504-3). Empfehlung: neue Gruppe `spritzmoertel`, MSM/MSB umhaengen; `betoninstandsetzung` entfaellt als produktgruppe oder beibehalten falls als Marketing-Kategorie gewuenscht.
- **Abweichung 2 — Spritzmoertel markenuebergreifend gesplittet:** Excel fasst NEODUR MSM/MSB und MICROTOP TW zu einer Untergruppe. Modell trennt nach `bereich` (MICROTOP eigene Marke). Kein Datenfehler, aber Excel-Logik (funktional) != Modell-Logik (markengetrieben). Entscheidung Steffi noetig. Loesungsfinder/Matrix nutzen `bereich` nicht, relevant nur fuer Bereichsseiten-Navigation.
- **Abweichung 3 — Schnellreparatur fehlt in spezialbaustoffe:** Liegt im Modell in `bereich: rapid-set`, `produktgruppe: reparaturmoertel` (korrekt, Rapid Set ist eigener Vertriebsbereich). Kein Handlungsbedarf.
- **Abweichung 4 — Impraegnierung liegt nicht in spezialbaustoffe:** Modell `bereich: industrieboden`, `produktgruppe: impraegnierung`. Kein Handlungsbedarf, Impraegnierung ist Industrieboden-Oberflaechenschutz.
- **Vollstaendigkeit spezialbaustoffe-Block:** Keine fehlenden Spritz-/Verguss-Produkte. 7 Verguss + 3 Spritz + 2 Anker + 2 Pflasterfugen + 1 Schnellbeton = 15.

### 3.4 Umsetzungs-Schritte (falls freigegeben)

1. `bereiche.ts` Z53: `betoninstandsetzung` -> `spritzmoertel` ersetzen (oder ergaenzen).
2. `produkte.ts`: neodur-msm-3, neodur-msm-5, neodur-msb-8 -> `produktgruppe: "spritzmoertel"`.
3. `dictionaries/{de,en,fr,pl,es}.json`: Key `gruppe_spritzmoertel` ergaenzen (de: "Spritzmoertel & Spritzbeton"); `gruppe_betoninstandsetzung` entfernen falls ungenutzt.
4. `validate-produkte.ts` prueft produktgruppe gegen `bereich.produktgruppen` -> Schritt 1 + 2 zwingend gemeinsam, sonst Build-Fehler.

**Offene Entscheidungen:** (A) `betoninstandsetzung` ersetzen oder beide behalten? (B) MICROTOP-TW funktional zu Spritzmoertel zusammenfuehren oder markengetrennt lassen? (C) `verguss`-Label umbenennen?

---

## 4. Normen-Glossar (#97)

### 4.1 Glossar Norm | Kurzbeschreibung

| Norm | Kurzbeschreibung |
|---|---|
| DIN 18560-1 | Grenzwerte fuer Belegreife und Regelung zur Ueberpruefung (Schwindklasse) |
| DIN 18560-2 | Estriche und Heizestriche auf Daemmschichten |
| DIN 18560-3 | Verbunderstriche |
| DIN 18560-4 | Estriche auf Trennschicht |
| DIN 18560-7 | Technische Anforderungen, Ausfuehrung und Pruefung fuer hochbeanspruchbare Estriche (Industrieestriche) |
| DIN 1100 | Anforderungen und Pruefverfahren fuer Hartstoffe in zementgebundenen Hartstoffestrichen und Einstreuungen |
| DIN CEN/TS 12390-9 | Pruefung des Frost- und Frost-Tausalz-Widerstands von Festbeton |
| DIN EN 13813 | Estrichmoertel, Estrichmassen und Estriche - Eigenschaften und Anforderungen (Materialeigenschaften und Klassifizierung) |
| DIN EN 13670 | Nachbehandlung in Verbindung mit DIN 1045-3 |
| DIN 1045-3 | Nachbehandlung in Verbindung mit DIN EN 13670 - schreibt vor, dass frischer Beton vor zu schneller Austrocknung, Frost u. extremen Temp. geschuetzt werden muss |
| DIN EN 13892-2 | Bestimmung der Biegezug- und Druckfestigkeit von Estrichmoertel u. Estrichmassen |
| DIN EN 13892-3 | Bestimmung des Verschleisswiderstandes nach Boehme fuer Estrichmoertel u. Estrichmassen |
| DIN EN 13892-4 | Bestimmung des Verschleisswiderstandes nach BCA fuer Estrichmoertel u. Estrichmassen |
| DIN EN 13892-8 | Pruefverfahren fuer Estrichmoertel und Estrichmassen, Teil 8: Bestimmung der Haftzugfestigkeit |
| DIN EN 206-1 + DIN 1045-2 | Gemeinsames Regelwerk fuer Festlegung, Eigenschaften, Herstellung und Konformitaet von Beton |
| DIN 18202 | Masstoleranzen fuer Bauwerke und Bauteile |
| DAfStb-Richtlinie | Betonbau beim Umgang mit wassergefaehrdenden Stoffen. Herstellung und Verwendung von zementgebundenem Vergussbeton und Vergussmoertel |
| DIN EN 16516 + AgBB | Referenzpruefnorm zur Bestimmung der Emission gefaehrlicher Stoffe. Der Ausschuss zur gesundheitlichen Bewertung von Bauprodukten nutzt diese Norm fuer den gesundheitlichen Wert fuer Innenraeume |
| DIN EN 12706 | Pruefverfahren fuer hydraulisch erhaertende Bodenspachtelmassen, Bestimmung des Fliessverhaltens (Ausbreitmass) |
| DIN 18365 | Untergrundpruefung und -vorbereitung |
| DIN EN 196-3 | Pruefverfahren fuer Zement zur Bestimmung der Erstarrungszeiten und der Raumbestaendigkeit |
| DIN EN 1015-11 | Pruefverfahren fuer Moertel fuer Mauerwerk, Teil 11: Bestimmung der Biegezug- und Druckfestigkeit von Festmoertel |
| DIN EN 13501 | Brandschutznorm fuer das Brandverhalten von Baustoffen |
| DIN EN 1542 | Pruefverfahren zur Messung der Haftfestigkeit im Abreissversuch |
| DIN EN 13412 | Pruefverfahren zur Bestimmung des Elastizitaetsmoduls im Druckversuch (statischer E-Modul) |
| DIN EN 1015-17 | Pruefverfahren zur Bestimmung des Gehalts an wasserloeslichem Chlorid in Frischmoertel |
| DIN EN 1504-3 | Produkte und Systeme fuer Schutz und Instandsetzung von Betontragwerken (Druckfestigkeit, Haftfestigkeit, Schwindverhalten, Chloridgehalt) |
| DIN 18551 + DIN EN 14487 | Norm fuer Spritzbeton und Spritzmoertel. Nationale Anwendungsregeln zur europaeischen Normenreihe DIN EN 14487; Anforderungen, Herstellung, Konformitaet, Bemessung von Spritzbetonkonstruktionen |
| DVGW Arbeitsblatt W 300 | Regelwerk fuer Trinkwasserbehaelter: Planung, Bau (Teil 1), Betrieb (Teil 2), Instandsetzung (Teil 3), Werkstoffe und Beschichtungssysteme (Teil 4 & 5) |
| DVGW Arbeitsblatt W 347 | Hygienische Anforderungen und Pruefverfahren fuer zementgebundene Werkstoffe (z.B. Moertel, Spritzbeton) im direkten Kontakt mit Trinkwasser |
| DIN EN 13395-2 | Pruefverfahren zur Bestimmung des Fliessverhaltens von Vergussmoertel, Feinmoertel oder Moertel |
| DIN EN 12350-5 | Bestimmung des Ausbreitmasses von Frischbeton im Bauwesen |
| DIN EN 12620 | Eigenschaften von Gesteinskoernungen und Fuellern fuer die Herstellung von Beton. Alkaliempfindlichkeitsklasse E1 aus unbedenklichen Vorkommen |
| DIN EN 1542 (ausfuehrlich) | Pruefverfahren zur Messung der Haftfestigkeit im Abreissversuch (Haftzugpruefung) fuer Produkte/Systeme zum Schutz und zur Instandsetzung von Betontragwerken (Eintrag im Dump abgeschnitten) |

### 4.2 Luecken: in Produkten referenzierte Normen ohne Glossar-Eintrag

- **DIN 18560** (ohne Teil-Suffix; Glossar fuehrt nur -1/-2/-3/-4/-7) — referenziert u.a. in neodur-he-60-rapid, neodur-level, tru-self-leveling, neodur-he-3, neodur-he-2, korodur-fscem, korodur-fscem-screed, neodur-level-au, korodur-hb-5-rapid, system-korodur-korotan, tru-pc, tru-sp
- **DIN 1048-2** (kein Glossar-Eintrag) — referenziert in korodur-hb-5-rapid, korodur-pc, korodur-hb-5
- **ASTM C928** (kein Glossar-Eintrag) — referenziert in rapid-set-cement-all, rapid-set-mortar-mix, rapid-set-mortar-mix-dur
- **DIN EN 206** (kein eigener Eintrag; nur kombiniert DIN EN 206-1 + DIN 1045-2 vorhanden) — referenziert in korocrete, korodur-pc-grundierung-kontext
- **TL BEB-StB** (kein Glossar-Eintrag) — referenziert in rapid-set-schnellbeton
- **DIN EN 445** (kein Glossar-Eintrag) — referenziert in neodur-vm-1, neodur-vm-3, neodur-vb-8, neodur-svm-03, neodur-svm-4
- **DVGW W 270** (kein Glossar-Eintrag; Glossar hat nur W 300 und W 347) — referenziert in microtop-tw-5, microtop-tw-bm

---

## 5. Varianten-PDP-Konzept (#110)

### Kernbefund

Es gibt **zwei unterschiedliche "Varianten"-Realitaeten** im Modell: (1) das bestehende `varianten[]`-Feld (Sub-Qualitaeten am Stammprodukt, reine Anzeige-Liste, 14 Produkte) und (2) **echte Geschwister-Produkte mit eigener PDP, die sich nur eine TDS teilen** (VM 1/VM 3/VB 8 etc.) — der im Issue genannte Fall. Fuer (2) braucht es ein neues Konzept, weil vier vollwertige Datensaetze auf einer PDP zusammengefuehrt werden.

### 5.1 Nutzung von `varianten[]` heute

- **Datenmodell** (`produkte.ts` Z49): `varianten?: { name: string; qualitaetsklasse?: string; hinweis?: string }[]` — am Stammprodukt gepflegt, keine eigenen IDs, keine eigenen technischen Daten/Normen/TDS.
- **i18n:** in allen Sprachfiles als optionales Override; `localizeProdukt()` (`getLocalized.ts` Z57-66) merged per Spread, gesetztes Override ersetzt das DE-Array komplett.
- **Rendering** (`page.tsx` Z143-172): statische read-only Liste, kein Switch, keine Auswirkung auf technische Daten/Normen/TDS.
- **UI-String:** `produkte.varianten_title` ("Lieferbare Qualitaeten") in allen `dictionaries/*.json` (Z128).
- **Validierung:** `validate-produkte.ts` prueft `varianten[]` nicht.
- **14 Produkte** nutzen das Feld. PDP ist immer die des Stammprodukts; Varianten haben keine eigene Seite.

### 5.2 Produkte mit echtem Varianten-Bedarf

**2a — Bereits als `varianten[]` modelliert (14 Produkte):** neodur-he-3 (5), neodur-he-65 (5), neodur-he-60-rapid (4), kcf (4), korodur-durop (5), rapid-set-concrete-pharmacy (4), granidur (3), granidur-bianco-nero (3), microtop-tw-bm (3), neodur-pfm-ze (3), neodur-he-65-plus (2), neodur-he-40 (2), rapid-set-cement-all (2), microtop-tw-nsm (2). (Zahl = inkl. Hauptprodukt.) **Wichtig:** neodur-he-65 und neodur-he-3 haben 4 Varianten + Haupt = 5 und sprengen die Issue-Obergrenze 4.

**2b — Echter Konsolidierungs-Fall (separate PDPs, geteilte TDS):**

| Gruppe | Aktuelle separate IDs | geteilte TDS | tech. Werte unterschiedlich? |
|---|---|---|---|
| Verguss VM (Issue-Fall) | neodur-vm-1, neodur-vm-3, neodur-vb-8 | NEODUR_VM_1_3_8_de.pdf | ja: Vergussquerschnitt 5-20 / 10-50 / >50 mm; Q-Klasse C55/67 identisch |
| + VM 5 (thematisch) | neodur-vm-5 | eigene TDS NEODUR_VM_5_de.pdf | ja: C80/95, bis 200 mm, R4 |
| Schnellverguss | neodur-svm-03, neodur-svm-4 | NEODUR_SVM_03_SVM_4_de.pdf | ja: 5-20 / 10-50 mm, C50/60 vs C35/45 |
| Spritzmoertel | neodur-msm-3, neodur-msm-5, neodur-msb-8 | NEODUR_MSM_3_5_MSB_8_de.pdf | gering: alle C35/45, MSM/MSB-Unterschied |

### 5.3 Datenmodell-Problem

Das bestehende `varianten[]`-Feld kann den Issue-Fall nicht abbilden (nur `name/qualitaetsklasse/hinweis`). VM 1/3/5/VB 8 unterscheiden sich in technischen Daten, Normen, Beschreibung, teils TDS. Ein Switch, der TDS-Block, Normen-Chips und technische Daten umschaltet, braucht pro Variante einen vollen Datensatz.

- **Option A — `varianten[]` aufbohren:** Geschwister-Produkte zusammenfuehren, Varianten um `technischeDaten[]`, `normen[]`, `beschreibung`, `tdsUrl` erweitern. Pro: ein Feld, eine PDP, kein Routing-Umbau. Contra: separate IDs entfallen -> Redirects/Sitemap/Suchindex/Referenz-Verlinkung anpassen (Referenzen matchen ueber `produkt.name`, page.tsx Z64-68).
- **Option B — `variantenGruppe`-Feld:** Produkte behalten IDs/Datensaetze, bekommen gemeinsames `variantenGruppe`-Tag + `istVariantenHaupt: true`. PDP rendert Geschwister als Switch. Pro: keine Datenmigration, volle Daten + Referenz-Matches + Deep-Links bleiben. Contra: mehr PDP-Logik, `generateStaticParams` muss Gruppen aufloesen, Canonical-/SEO-Handling.

**Empfehlung Option B** fuer 2b (Daten existieren bereits vollstaendig und referenzverknuepft). Fuer 2a (reine Sub-Qualitaeten) bleibt `varianten[]` wie es ist. -> Zwei UI-Muster, ein Konzept: Qualitaets-Liste (heute) fuer 2a, Varianten-Switch (neu) fuer 2b.

### 5.4 UX-Konzept Varianten-Switch (2b)

- **Position:** im Header, direkt unter H1/Q-Klassen-Badge, vor den technischen Daten.
- **Control:** horizontale Segmented-Tab-Leiste (Pills), max. 4 sichtbar. Aktiv = Cyan-Fill, inaktiv = `bullet-bg`. Mobil: scrollbare Pill-Row, 44px-Touch-Targets.
- **Tab-Label:** Kurzname (z.B. "VM 1", "VM 3", "VB 8", "VM 5") + optional Q-Klasse als Subtext.
- **Geschaltet bei Wechsel:** Q-Klasse-Badge, `beschreibung`, technische Daten, Normen-Chips, `besonderheiten`, TDS-Download. Stabil: Bereich/Breadcrumb, Kategorie, Fachberater, CTA.
- **Default-Tab:** kanonisches Hauptprodukt (VM 1).
- **Static-Export-Constraint:** App ist `output: "export"`, kein Client-State ueber URL-Param zur Build-Zeit.
  - (i) Client-Switch: Varianten-Daten zur Build-Zeit serialisieren, Tab-Wechsel clientseitig (`useState`). Kein Reload, beste UX. **Empfohlen.**
  - (ii) Verlinkte PDPs: jede Variante bleibt eigene Seite, Pills sind `<Link>`. Kein JS, aber Reload je Wechsel und 4 URLs (SEO: `rel=canonical` auf Hauptprodukt).
- **Empfehlung:** (i) Client-Switch, eine kanonische URL pro Gruppe; alte Einzel-URLs als Redirect/Canonical, Tiefenlinks per Hash (`#vm-3`).

### 5.5 To-dos bei Umsetzung

1. `produkte.ts`/`types.ts`: `variantenGruppe?: string` + `istVariantenHaupt?: boolean` (Option B) ODER `varianten[]` erweitern (Option A).
2. PDP (`page.tsx`): Switch-Komponente, Geschwister-Lookup, Datenbloecke an aktive Variante binden.
3. i18n: neuer String `varianten_switch_title` in 5 Sprachen; Varianten-Datenfelder in `produkte.{en,fr,pl,es}.ts`.
4. Referenz-Matching (page.tsx Z64-68) matched auf `produkt.name` -> Varianten-Namen in Match einbeziehen, sonst verlieren Geschwister Referenzen.
5. Routing/SEO: `generateStaticParams` (Z38-42), `sitemap.ts`, `lib/suchindex.ts` konsistent halten; Redirects fuer alte URLs.
6. `validate-produkte.ts` um Varianten-/Gruppen-Checks erweitern.
7. Limit-Entscheidung: neodur-he-65, neodur-he-3 haben 5 Eintraege inkl. Haupt -> Issue-Limit 4 klaeren (betrifft 2a-Liste, nicht den Switch).

**Offene Entscheidungen:** (1) VM 5 in den Switch (eigene TDS, C80/95, R4) oder Einzelprodukt? (2) Option A vs. B (Empfehlung B)? (3) SVM- und MSM/MSB-Gruppen denselben Switch oder nur Verguss als Pilot?

---

## 6. Verifizierte Excel-vs-App-Diskrepanzen

Alle vier Diskrepanzen frisch gegen beide Quellen geprueft und als real verifiziert. Excel = SoT, daher gilt der Excel-Wert.

| Produkt | Feld | App-Wert | Excel-Wert | Korrektur | Schwere |
|---|---|---|---|---|---|
| Rapid Set MORTAR MIX | qualitaetsklasse | C45/55 | C44/55 (Z49) | `C44/55` | mittel |
| Rapid Set MORTAR MIX DUR | qualitaetsklasse | C45/55 | C44/55 (Z50) | `qualitaetsklasse: "C44/55"` (produkte.ts:558); zusaetzlich technischeDaten "Qualitaet" -> `"C44/55 + DIN 1100 A"` (Z565) | mittel |
| Rapid Set CEMENT ALL | normen[] | ASTM C928; DIN EN 1015-11; DIN EN 196-3 | DIN EN 1015-11; DIN EN 1542 (Haftzug); DIN EN 13412 (E-Modul); DIN EN 1015-17 (Chlorid); DIN EN 196-3; CDF (Frost); DAfStB (Penetration) (Z50) | `["ASTM C928", "DIN EN 1015-11", "DIN EN 1542 (Haftzug)", "DIN EN 13412 (E-Modul)", "DIN EN 1015-17 (Chlorid)", "DIN EN 196-3", "CDF (Frost)", "DAfStB (Penetration)"]` | mittel |
| DOT Europe CONCRETE MIX | normen[] | DIN EN 1504-3; DIN EN 1015-11 | DIN EN 1504-3 (R4); EN 12190; DIN EN 1542 (Z55) | `["DIN EN 1504-3", "EN 12190", "DIN EN 1542"]` (DIN EN 1015-11 entfernen) | mittel |

**Hinweise:**

- C44/55 ist nach EN 206 keine genormte Festigkeitsklasse (genormt: C40/50, C45/55). Die SoT-Zelle ist vermutlich ein Tippfehler, weicht aber als deklarierte Source of Truth real von der App ab. Da "Excel-Klassen gelten", ist die App anzupassen. Mit Frank klaeren, ob der Excel-Wert ein Tippfehler ist.
- CEMENT ALL: ASTM C928 hat die App zusaetzlich (steht nicht im Excel), kein Konflikt, bleibt erhalten. Wittekindt (Sulfat) und Gruppen EPD (Umwelt) sind Pruefmethode bzw. Umweltdeklaration, keine Produktnormen, konservativ ausgelassen.
- DOT: DIN EN 1015-11 ist fuer dieses Produkt vermutlich ein Copy-Paste-Fehler (Excel ordnet es CEMENT ALL, ASPHALT REPAIR MIX, LevelFlor zu, nicht DOT). EN 12190 und DIN EN 1542 fehlen in der App.

---

## 7. Datenmodell-Aenderungsvorschlag (zusammengefasst)

**`data/types.ts`:**

```ts
export type ProduktRolle =
  | "bodenprodukt" | "haftbruecke" | "oberflaechenfinish"
  | "impraegnierung" | "nachbehandlung"
  | "reparaturmoertel" | "spritzmoertel" | "vergussmoertel";
```

**`data/produkte.ts` (interface Produkt):**

```ts
rolle?: ProduktRolle;                 // #93 funktionale Rolle, orthogonal zu kategorie/bereich
empfohleneHaftbruecke?: string;       // #93 optional, nur falls abweichend von systemBegleitprodukte
variantenGruppe?: string;             // #110 Option B: Geschwister-Gruppe (z.B. "neodur-verguss")
istVariantenHaupt?: boolean;          // #110 Option B: kanonische Variante einer Gruppe
```

**`data/bereiche.ts`:** spezialbaustoffe-Gruppen (Z53) `betoninstandsetzung` -> `spritzmoertel` (oder ergaenzen).

**`scripts/validate-produkte.ts`:**

- `rolle` gegen `ALLOWED_ROLLE`-Enum (error)
- `empfohleneHaftbruecke` (falls Feld): Slug in `alleIds` UND referenziertes Produkt hat `rolle === "haftbruecke"` (error)
- `variantenGruppe`/`istVariantenHaupt`: pro Gruppe genau ein Haupt, alle Mitglieder existieren (error)
- produktgruppe-Check zwingt Schritt bereiche.ts + produkte.ts gemeinsam

**`dictionaries/{de,en,fr,pl,es}.json`:** `gruppe_spritzmoertel` ergaenzen; `varianten_switch_title` (#110) ergaenzen.

---

## 8. Offene Fragen fuer Frank (Sign-off)

1. **Doppelrolle KOROMINERAL CURE (L1):** `rolle` single-valued primaer `nachbehandlung` mit Impraegnier-Eigenschaft via `zusatzfunktionen`, oder `rolle` als Array?
2. **Finish vs. Nachbehandlung (L2):** Sind easyFinish/nanoFinish dekoratives `oberflaechenfinish` oder Curing-`nachbehandlung`? Default bis Klaerung: alle vier `nachbehandlung`.
3. **Haftbruecken-Zuordnung (L3):** Welche Haftbruecke fuer GRANIDUR, KCF, TRU, FSCem und die Hartstoff-Einstreuungen? Quelle fehlt, nicht erfinden.
4. **Hartstoffe (L4):** Eigene Rolle `hartstoffeinstreuung` oder kein Rollen-Tag fuer KORODUR 0/4, VS 0/5, WH, Diamantbeton, DUROP, Robust?
5. **KOROPOX als Impraegnierung (L5):** Epoxid statt mineralischer Silikatisierung, ist `impraegnierung` fachlich korrekt?
6. **`betoninstandsetzung` -> `spritzmoertel` (#94):** Ersetzen oder beide produktgruppen behalten? MICROTOP-TW funktional zusammenfuehren oder markengetrennt?
7. **C44/55-Diskrepanz (#6):** Excel-Wert C44/55 ist nach EN 206 nicht genormt. Tippfehler im SoT korrigieren oder App auf C44/55 angleichen?
8. **Varianten-Switch (#110):** VM 5 in den Switch (eigene TDS) oder Einzelprodukt? Option A oder B? Pilot nur Verguss oder auch SVM/MSM?

**Groesste offene Frage:** Ob die nicht-genormte Festigkeitsklasse C44/55 im Excel-SoT ein Tippfehler ist (dann SoT korrigieren) oder bewusst so gesetzt (dann App auf C44/55 angleichen). Diese Entscheidung praegt das Prinzip "Excel gewinnt immer" fuer alle kuenftigen Diskrepanzen.

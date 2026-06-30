# Bereichsseiten-Konzept-Rework — modulares Baustein-Modell + Hybrid-Betonsanierung

**Issue:** #320 · **Datum:** 2026-06-30 · **Status:** Konzept freigegeben (Steffi), Build Welle 1 = Betonsanierung
**Vorgänger:** `docs/specs/2026-06-19-rapid-set-bereichsseite-konzept.md` (Rapid-Set-Blaupause)
**Memories:** `bereich-rich-content-pattern`, `rapid-set-positionierung`, `ia-zwei-achsen-entscheidung`, `alt-content-reuse-strategie`

---

## 1. Ausgangslage

Genau **eine** Bereichsseite ist redaktionell ausgearbeitet — Betonsanierung (Slug `rapid-set`), nur DE — über einen hardcodierten Branch in `app/[lang]/bereiche/[slug]/page.tsx`:

```ts
if (slug === "rapid-set" && lang === "de") return <RapidSetBereich lang dict />;
```

Alle übrigen Bereiche (und EN/FR/PL/ES von Betonsanierung) laufen durchs **generische Inline-Template** (Header → Produkt-Grid → Referenzen → Fachberater → CTA). Das gibt Orientierung über Produkte, aber keinen redaktionellen Rahmen.

**Zwei konkrete Defekte der bestehenden Rapid-Set-Seite** (Kern von #320):
1. **Marke statt Sammelbereich.** Seit #308 ist `rapid-set` der Sammelbereich *Betonsanierung* (Rapid Set + NEODUR MSM/MSB/VM/PFM). Die Seite verkauft aber editoriell zu ~100 % die Marke „Rapid Set"; die eigenen NEODUR-Produkte erscheinen nur als nackte Einträge im eingeklappten Produktfilter — mit Platzhalterbild, ohne Gruppen-Intro, ohne Präsenz in Hero/Wofür/Technologie/Trust.
2. **Toter Content + Datenlücke.** `gruppenText` in `data/rapidSetContent.ts` ist gepflegt, wird aber **nie gerendert** (`filterGruppen` reicht das `text`-Feld nicht durch). Und SVM 03 / SVM 4 / VM 5 sind laut Code-Kommentar Betonsanierung, aber **nicht** über `zusatzBereiche` zugeordnet → tauchen nicht auf.

## 2. Entscheidungen (Steffi, 2026-06-30)

| # | Frage | Entscheidung |
|---|---|---|
| D1 | Betonsanierung: Rapid Set vs. NEODUR | **Hybrid — Dachnarrativ + 2 Lösungs-Tracks.** Markenneutrales Betonsanierungs-Dach oben, dann Track 1 (Rapid Set = schnellste Wiederherstellung) + Track 2 (NEODUR-Instandsetzung: Spritzmörtel/Verguss/Pflasterfugen). Behält die starke Rapid-Set-Story als *einen* Track, macht die eigene Linie gleichwertig sichtbar. |
| D2 | Verbindlichkeit der Struktur | **7 Pflicht-Bausteine + 2 optionale.** Pflicht überall gleich (Wiedererkennung), Leitmotiv + Technologie nur wo Stoff trägt. Kein Zwangs-Füllen schwacher Sektionen. |
| D3 | Scope dieser Iteration | **Erst Betonsanierung umbauen.** Konzept am lebenden Objekt schärfen (inkl. Registry, gruppenText-Fix, Datenfix), dann Bereich für Bereich. |

## 3. Baustein-Modell (gilt für alle Bereiche)

Dramaturgie-Prinzipien (aus der Rapid-Set-Blaupause bestätigt): **Nutzen vor Technik · Bilder vor Daten · CTA in Hero + am Schluss · Trust anonym** (keine Personen/Logos/Testimonials — Content-Standing-Rules).

### Pflicht-Bausteine (jeder Bereich)

| # | Baustein | Zweck | Datenquelle |
|---|---|---|---|
| ① | **Hero** | Kicker, nutzen-geführte H1, Subline, Lead, 3 Trust-Chips, Doppel-CTA (Fachberatung + Anker „Zum Portfolio") | `<bereich>Content.ts` + Bereichsbild aus `bereiche.ts` |
| ② | **Problem / Nutzen** | Welches Problem löst der Bereich? Schmerzpunkt → Payoff | Content-Modul |
| ③ | **Wofür — Anwendungsfälle** | Foto-Kacheln, jede zu einem echten Referenzprojekt verlinkt | Content-Modul (`referenzSlug`) → `referenzen.ts` |
| ④ | **Produkt-Portfolio** | gruppiert nach `produktgruppe`, **mit gerenderten Gruppen-Intros**, Szenariobild je Kachel | `produkte.ts` (gefiltert) + `gruppenText` + `produktSzenarioReferenz` |
| ⑤ | **Trust** | anonyme Kennzahl, Normen/Zertifikate, Referenzobjekte | Content-Modul |
| ⑥ | **Referenzen** | projektart-passend gefiltert | `referenzen.ts` |
| ⑦ | **Fachberatung + Abbinder-CTA** | bereichsspezifisches Fachberater-Mapping, Schluss-Claim, Kontakt-CTA | `fachberater.ts` + Content-Modul |

### Optionale Bausteine (nur wo Stoff trägt)

| # | Baustein | Wann |
|---|---|---|
| ⑧ | **Leitmotiv / Markenbild** | nur wo es ein echtes Bild/Prinzip gibt (Rapid Set = Taschenmesser). Die meisten Bereiche haben keins. |
| ⑨ | **Technologie / Differenzierung** | nur wo es eine echte technische Story gibt (Rapid Set BCSA-Zement, Microtop TW-Zulassung). Infrastruktur/Spezialmörtel ggf. ohne. |

### Bereichs-Variabilität (im Pflicht-Rahmen)

- **Drei Kernvorteile** (in ② oder ⑧ integriert): Pflicht, Inhalt je Bereich.
- **Händler-Hinweis**: nur wo Fachhandels-Bezug (Rapid Set).
- **Neubau/Sanierung-Framing**: nur Bereiche mit beiden Projektarten (Industrieboden). Bei diesen ist später zu klären, ob das volle Editorial auf die Dach-Seite oder auf die Sub-Seiten `/neubau` `/sanierung` geht (→ offen, wenn Industrieboden dran ist).

## 4. Technische Architektur

- **Registry statt Branch.** Den hardcodierten `slug === "rapid-set"`-Branch durch eine Map ersetzen:
  ```ts
  const DEDIZIERTE_BEREICHE: Record<string, DediziertComponent> = { "rapid-set": BetonsanierungBereich, … };
  ```
  Jeder neue Bereich dockt über einen Eintrag an; EN/FR/PL/ES fallen weiter auf das generische Template (i18n-Follow-up #181).
- **gruppenText-Render-Fix.** `filterGruppen` muss `text` an `BereichProduktFilter` durchreichen, und der Filter rendert das Gruppen-Intro über der Kachelreihe. (Damit wird `gruppenText` zum Vehikel, um MSM/MSB/VM/PFM einzuordnen.)
- **Content-Modul je Bereich**: `data/<bereich>Content.ts`, DE-only, `as const`, verbatim Slogans, `faktencheck`-Flags für ungesicherte Werte.
- **Dedizierte Komponente**: `components/<Bereich>Bereich.tsx`, zieht echte Produkte/Referenzen/Fachberater.

## 5. Betonsanierung konkret (Welle 1)

> Die Rapid-Set-Komponente wird zur **Betonsanierungs-Komponente** umgebaut. Slug bleibt `rapid-set` (SEO/interne Stabilität), Anzeige „Betonsanierung". Datei-Umbenennung optional (Registry entkoppelt Slug von Komponentennamen).

**Seitenstruktur (Hybrid, D1):**

```
① HERO        Betonsanierung — markenneutral, nutzen-geführt
② PROBLEM     Schaden am Beton → Stillstand/Folgekosten (Schadensbilder)
─────────────────────────────────────────────────────────
  TRACK 1     Rapid Set — schnellste Wiederherstellung (~1 h)
              [Leitmotiv Taschenmesser ⑧ · Technologie BCSA ⑨ · 3 Vorteile]
  TRACK 2     NEODUR-Instandsetzung — das eigene mineralische System
              Spritzmörtel (MSM/MSB) · Verguss (VM) · Pflasterfugen (PFM)
─────────────────────────────────────────────────────────
③ WOFÜR       Anwendungsfälle beider Linien (Referenzfotos)
④ PORTFOLIO   beide Linien, gruppiert, MIT Gruppen-Intros + Szenariobildern
⑤ TRUST       anonym, Normen (EN 1504-3 …), Referenzobjekte
⑥ REFERENZEN  Sanierungs-Referenzen
⑦ FACHBERATUNG + Abbinder-CTA
```

**Track 1 — Rapid Set:** bestehender Content aus `rapidSetContent.ts` bleibt erhalten (Leitmotiv, Technologie, Vorteile), wird aber als *ein Track innerhalb Betonsanierung* gerahmt statt als ganze Seite. Markenstory nicht wegwerfen — nur einordnen.

**Track 2 — NEODUR-Instandsetzung:** neuer Content, drei Gruppen (Quelle: `docs/content-quellen/scrape-extrakt/spezialbaustoffe.md` + `produkte.ts` + TDS, keine erfundenen Werte):

| Gruppe (`produktgruppe`) | Label (dict) | Produkte |
|---|---|---|
| `spritzmoertel` | Spritzmörtel & Spritzbeton | NEODUR MSM 3 · MSM 5 · MSB 8 (C35/45, Körnung 0–3/5/8 mm; DIN 18551/EN 14487) |
| `verguss` | Montage- & Vergusssystem | NEODUR SVM 03 (C50/60) · SVM 4 (C35/45) · VM basic (R4, DVGW W 347) · VM 5 (C80/95, R4) |
| `pflasterfugen` | Pflasterfugenmörtel | NEODUR PFM 1K Easyfix · PFM-ZE (≥50 N/mm²) |

Jede Gruppe als Karte mit Intro + Produkt-Chips (Anker → Portfolio). Gruppen-Intros zusätzlich im Portfolio-Filter (gruppenText-Fix).

**Datenfix (data/produkte.ts, umgesetzt):** `neodur-vm-5`, `neodur-svm-03`, `neodur-svm-4` haben jetzt `zusatzBereiche: ["rapid-set"]` (vorher fehlte das Feld trotz #308-Code-Kommentar) → Sammelbereich vollständig (Gruppe `verguss`). Die 6 übrigen (MSM/MSB primär, VM basic/PFM via zusatz) waren bereits korrekt.

**Trust (entschieden):** „Über 2.500 Handwerksbetriebe" + Lizenzpartner-seit-2012 ist Rapid-Set-spezifisch → wandert als anonymer **Track-1-Beleg** in die Rapid-Set-Sektion. Der **Bereichs-Trust** (Dach) stellt auf KORODUR-Historie („Seit 1936") + Normen (EN 1504-3, EPD, ISO 9001, DGNB, Sulfat-/CDF-Prüfung).

## 6. Offene Punkte / Follow-up

- **Faktencheck (Technik, aus Vorgänger-Spec):** CO₂ ~30 % und Lebensdauer bis 4× (Broschüren-Werte, `faktencheck`-Flag) noch nicht final freigegeben.
- **Track-2-Werte:** Kennwerte/Normen je NEODUR-Produkt aus Quellen, nicht erfinden; PDB/Technik-Termin liefert verbindliche Norm-je-Kennwert (vgl. Varianten-PDP).
- **Trust-Framing im Hybrid** (s. o.).
- **i18n (#181):** EN/FR/PL/ES bleiben auf generischem Template bis Editorial-Übersetzungsrunde.
- **Industrieboden-Sub-Seiten:** Editorial auf Dach- oder Sub-Seite — klären, wenn Industrieboden gebaut wird.
- **Restliche Bereiche** (Infrastruktur, Spezialmörtel, TW): Welle 2+, je nach Go-Live-Reihenfolge.

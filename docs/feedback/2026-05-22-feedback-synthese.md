# Feedback-Synthese Sanierungs-App (V2.4 → V2.5-Iteration)

**Datum:** 2026-05-22
**Quellen:** [Notion: Feedback zu Sanierungsapp](https://www.notion.so/367670e19e1a803f8f93c65c7f066033)
**Eingespeist von:** Daniel May (DM), Hubert Scheinost (HS), Andreas Plank (AP), Robert Vogel (RV — aus Verarbeitungsmatrix abgeleitet)
**Zweck:** Arbeitsgrundlage für die geplante Reduktion auf 3 Steps + Datenmodell-Konsolidierung. Verweist auf `docs/superpowers/plans/2026-05-13-loesungsfinder-3step-rewrite.md`.

---

## Executive Summary

Die drei direkten Feedback-Geber (DM, HS, AP) sind sich in den Grundpfeilern einig:

1. **Drei Schritte sind richtig.** Niemand fordert mehr Tiefe; im Gegenteil — AP fasst seine 6 Fragen am Ende selbst zu 4 zusammen, DM gliedert in 3 Info-Blöcke + Maßnahme.
2. **Step 1 muss vom Problem ausgehen, nicht von der Belastung.** „Welches Problem liegt vor?" als Startpunkt wird von allen drei getragen — Streit nur darum, wie die Optionen formuliert sind.
3. **Innen vs. Außen ist die wichtigste erste Weiche** (AP und DM explizit; HS implizit über die rote Markierung von „Sanierung im laufenden Betrieb" — er will den Schwerpunkt aufs Schadensbild verlagern).
4. **Die Produktmatrix hat fachliche Lücken**: Rapid Set Concrete Mix und DOT Europe Concrete Mix fehlen, die Spalte „Laufender Betrieb" wird abgelehnt, Pflasterfugenmörtel/Korocure/Korotex sollen raus, Nachbehandlung gehört systemisch dazu (kein eigenes Produkt im Sanierungs-Auswahlbaum).

Die **RV-Matrix** ist kein UI-Feedback, sondern eine Wissensquelle. Sie zeigt das gesamte KORODUR-Portfolio (~70 Produkte/Varianten) mit Schichtdicken, Einbauverfahren, Innen/Außen, Maschinentechnik. Daraus entsteht primär eine **Datenmodell-Verbesserung** für `data/produkte.ts` — und sie liefert das fachliche Backing für AP/HS-Forderungen (z.B. DOT Europe Concrete Mix existiert tatsächlich als eigenes Produkt).

**Kernempfehlung:** Die 3-Step-Iteration ist trag­fähig wie im Plan vorgesehen. Drei Anpassungen drängen sich auf:

- Step 1 als **„Problem"-Auswahl** mit überarbeiteten Optionen (Hubert-Markup übernehmen; siehe §2.1).
- Step 2 als **„Anforderung/Belastungsbild"** — Hubert-Erweiterungen (Chemie, Thermik, Ebenheit) einbauen; „Dauerlast" und „Sonderbedingungen" rausnehmen.
- Step 3 = **Zeitfenster** bleibt, aber Skala anpassen: „Mittelfristig 2–4 Wo" → „1–2 Wo" (HS).
- Produktmatrix: Spalte „Laufender Betrieb" raus, Produkte gemäß HS umsortieren, DOT Europe + Rapid Set Concrete Mix als Datensätze nachpflegen.

---

## 1. Übersicht der Quellen

| Quelle | Form | Fokus | Vollständigkeit |
|---|---|---|---|
| **Daniel May (DM)** | Screenshot (eine Seite, Konzept-Skizze) | Eigener Strukturvorschlag: Suchender-Profil → Schadensbild → Objekt → Maßnahme | Hoch — kompletter Vorschlag |
| **Hubert Scheinost (HS)** | Screenshot mit Farb-Markup auf 3-Step-Logik + Produktmatrix-Hinweise | Direktes Markup pro Auswahl­option (grün=ok, rot=ungeeignet, gelb=Vorschlag) | Sehr hoch — granularer als alle anderen |
| **Andreas Plank (AP)** | Notion-Text + PDF-Markup auf Produktmatrix | 4-Fragen-Synthese + Reihenfolge/Lücken der Produktmatrix | Hoch — textlich kurz, aber präzise |
| **Robert Vogel (RV)** | Excel-Matrix mit allen KORODUR-Produkten + Verarbeitung | Portfolio-Wissensbasis, kein direktes UI-Feedback | Sehr umfangreich, indirekt verwertbar |

---

## 2. Lösungsfinder

### 2.0 Anzahl Schritte und Grundstruktur

| | DM | HS | AP |
|---|---|---|---|
| Anzahl Schritte | 3 Info-Blöcke + Maßnahme (faktisch 4) | 3 Schritte (bestätigt) | 4 Fragen (Endsynthese aus 6) |
| Einstieg | „Wer ist Suchender (Architekt/Bauherr/Verleger)?" + Schadens-Stichwortgruppe | „Welches Problem liegt vor?" | „Innen oder außen?" |
| Vorgehen | Funnel: Profil → Fläche → Objekt → Maßnahme | Auswahl pro Step, Markup auf bestehender Logik | Reihenfolge-Vorschlag |

**Empfehlung:** Die im Plan vorgesehene 3-Step-Reduktion umsetzen. Der DM-Vorschlag „Suchender-Profil als Step 0" ist verlockend (Personalisierung), aber:

- HS hat das nicht und macht klare Funktionalität ohne Profilfrage,
- AP startet mit Innen/Außen direkt fachlich,
- ein Profil-Switch erhöht die Komplexität ohne klaren UI-Hebel.

Empfohlene Lösung: DM-Profilgedanke als spätere Iteration vormerken (z.B. unterschiedliche Detailtiefe für Architekt vs. Verleger im Ergebnis), aber **nicht in V2.5**.

### 2.1 Step 1 — „Welches Problem liegt vor?"

**Aktuelle App-Optionen** (vermutet aus Plan, ggf. abweichend; bitte prüfen):
Sanierung im laufenden Betrieb · Schwerlast/Verschleißschäden · Witterungs-/Frost-/Tausalzschäden · Punktuelle Reparatur · Modernisierung/Umnutzung · Sanierung mit Sondernormen.

**HS-Markup pro Option:**

| Option | HS | Vorschlag |
|---|---|---|
| Sanierung im laufenden Betrieb | rot (ungeeignet) | **Raus** — gehört in Step 3 (Zeitfenster) |
| Schwerlast-/Verschleißschäden („Boden hält nicht mehr") | gelb (Vorschlag: umformulieren) | **„Flächige Verschleißschäden, Ausbrüche, frühere Sanierungs­stellen"** |
| Witterungs-/Frost-/Tausalzschäden, Außenflächen | grün | Bleibt |
| Punktuelle Reparatur | gelb | **„Akuter Schaden, einzelne Schadstellen"** |
| Modernisierung/Umnutzung/Designanforderung | grün | Bleibt |
| Sanierung mit Sondernormen (Trinkwasser, WHG, Denkmal, Barrierefrei) | rot mit „??" | **Raus** — zu speziell für den Self-Service-Funnel, gehört in Beratungs-Pfad |

**DM-Sicht** (eigene Strukturierung, nicht 1:1 mappbar):
DM würde Schadensbild getrennt vom Belastungsbild fragen — als „Art des Schadens in der Fläche: Löcher, Hohlstellen, Ausbrüche, Kantenbruch, Fugen­profilbruch, Spuren, Vertiefungen in Fahrbereich, zu glatt (rutschig), zu rau, andere usw…." Plus „Mögliche Ursache (auch Vermutung)" + „Anforderung an der Fläche".

DM detaillierter, aber mit höherem Auswahl-Aufwand. Für 3-Step-UX zu granular.

**AP-Sicht:** AP fragt vor Step 1 erst „Innen oder Außen?" als eigenständige Frage 1. In unserem 3-Step-Modell ist das implizit (z.B. „Außenflächen" als Option in Step 1 oder als Filter im Ergebnis).

**Empfehlung Step 1:**

```
Frage: Welches Problem möchten Sie lösen?
Optionen (HS-Variante übernommen):
  1. Flächige Verschleißschäden, Ausbrüche, frühere Sanierungs­stellen
  2. Witterungs-, Frost- und Tausalzschäden (Außenflächen)
  3. Akuter Schaden / einzelne Schadstellen (punktuelle Reparatur)
  4. Modernisierung / Umnutzung / Design­anforderung
```

→ **4 statt 6 Optionen**, klare Trennung zwischen flächig vs. punktuell vs. außen vs. Designwechsel. „Sondernormen" und „Laufender Betrieb" raus (siehe oben).

→ **Innen/Außen** ist implizit durch Option 2 = außen. Falls wir Innen/Außen explizit wollen (AP-Forderung), als Kurz-Frage *vor* Step 1 oder als Toggle in der Ergebnisansicht — bitte entscheiden, siehe Offene Fragen §6.

### 2.2 Step 2 — „Welche Anforderungen sollen erfüllt werden?" (Belastungsbild)

**HS hat hier den meisten Input.** Markup auf aktuelle Optionen:

| Option | HS | Vorschlag |
|---|---|---|
| Extreme Belastung (Stapler­verkehr, Kettenfahrzeuge, Dauer-LKW) | rot | Umformulieren / aufteilen |
| Extreme Verschleißbelastung durch Schüttgüter, Schieben, Rollen, Absetzen von Metallteilen, etc. | grün | **Bleibt** |
| Dauerlast (Lager, Logistik, …) | rot → gelb (Vorschlag: „Starker Fahrbetrieb mit Staplern") | **Umformulieren zu „Starker Fahrbetrieb mit Staplern"** |
| Besondere optische Ansprüche (Verkaufsräume) | grün | Bleibt |
| Außenbereich / Witterungsbelastung (Frost & Tausalz) | grün | Bleibt |
| Sonder-Bedingungen (Sammelbecken, Gefängnis, Bäckerei mit Milchsäure) | rot | **Raus** (zu speziell, Beratungs-Pfad) |
| Chemische Angriffe | gelb (neu) | **Aufnehmen** |
| Thermische Belastungen (Hitze/Kälte, Temperatur­schwankungen) | gelb (neu) | **Aufnehmen** |
| Erhöhte Ebenheits­anforderungen | gelb (neu) | **Aufnehmen** |

**AP-Sicht:** AP fragt analog „Belastung extrem oder eher leicht?" — sehr binär. Funktioniert für seinen Verkaufsdialog, ist für die App zu grob.

**DM-Sicht:** DM kombiniert Belastungsbild mit „Anforderung an die Fläche" und „Nutzungsart Objekt (Lagerhalle, Hochregal­lager, Produktion, Schulwesen, andere…)". Letzteres ist nützlich, aber wir hatten Nutzungsart bisher als Sortier-/Filterkriterium auf der Ergebnis-Seite.

**Empfehlung Step 2:**

```
Frage: Welche Belastung muss der Boden später aushalten?
Optionen (HS-Variante, mehrfach­auswählbar empfohlen):
  1. Starker Fahrbetrieb (Stapler, LKW)
  2. Extreme Verschleißbelastung (Schüttgüter, Schieben, Rollen, Metallteile)
  3. Witterungsbelastung (Frost, Tausalz) — Außenbereich
  4. Chemische Angriffe
  5. Thermische Belastungen (Hitze, Kälte, Temperaturschwankungen)
  6. Besondere optische Ansprüche
  7. Erhöhte Ebenheitsanforderungen
```

→ **7 Optionen, mehrfach** (HS impliziert das nicht explizit, aber realistische Sanierungs­fälle haben oft mehrere Lastarten).
→ Außenbereich-Option in Step 2 statt Step 1 → Step 1 bleibt klar problembezogen, Außen ist eine Lastart.

### 2.3 Step 3 — Zeitfenster

| Aktuell | HS-Markup |
|---|---|
| 1. Kurzfristige Sanierung (über Nacht, Wochenende, im laufenden Betrieb) | grün |
| 2. Mittelfristige Sanierung (2 bis 4 Wochen) | rot → **„Schnelle Sanierung in 1–2 Wochen"** |
| 3. Keine Zeitbegrenzung / Planbar | grün |

**AP-Sicht:** AP fragt „Wie schnell soll die Fläche wieder nutzbar sein?" — gleicher Geist, möglicher Wert: 2-4 h / 48 h / 20 Tage (DM-Variante).

**DM-Sicht:** DM operiert mit konkreten Stunden- und Tageswerten (2–4 h, 48 h, 20 Tage). Sehr fachlich präzise — aber für Nutzer „ich brauch das in einer Woche" abstrakter. RV-Matrix bestätigt, dass die Produkte mit klaren Wiederbelastungszeiten arbeiten (HE 60 rapid = 24 h, HE 65 = entsprechend länger).

**Empfehlung Step 3:**

```
Frage: Wann muss die Fläche wieder nutzbar sein?
Optionen:
  1. Sehr kurzfristig (über Nacht, Wochenende, im laufenden Betrieb)
  2. Schnelle Sanierung (1–2 Wochen)   ← HS-Variante übernommen
  3. Planbar / Keine Zeitbegrenzung
```

Konkrete Wiederbelastungszeiten (2–4 h, 48 h, 20 Tage) gehören in die **Ergebnisansicht pro Produkt** als Detail-Information.

### 2.4 Punktuelle Reparatur — Sonderfall

**RV-Matrix zeigt:** Reparaturmörtel (Rapid Set CEMENT ALL, MORTAR MIX) haben eine **eigene Verfahrens-Dimension**: über Kopf / Wand / Boden, mit unterschiedlichen Schichtdicken pro Lage.

Aktuell hat unsere App das nicht. Wenn Nutzer „Punktuelle Reparatur / akuter Schaden" (Step 1, Option 3) wählt, könnte ein **Sub-Step** sinnvoll sein: „Wo liegt der Schaden — Boden / Wand / über Kopf?" Aber das überfrachtet den 3-Step-Funnel.

**Empfehlung:** Zunächst nicht im Wizard abbilden. Stattdessen die Information „auch für Wand-/Über-Kopf-Reparaturen geeignet" als Produkt-Tag in der Detailansicht zeigen.

---

## 3. Produktmatrix

### 3.1 Spalten (Bewertungs-Kriterien)

| Spalte | HS-Markup | AP-Markup | Vorschlag |
|---|---|---|---|
| Laufender Betrieb | rot („halte ich für ungeeignet, stattdessen Zeitfenster aus Step 3 verwenden") | rot (eine Zelle durchgestrichen) | **Raus** — durch Zeitfenster-Spalten ersetzen |
| Extrem belastbar (E) | (implizit grün) | grün | Bleibt |
| Schwerlast / Verschleiß | grün | grün | Bleibt |
| Frost & Tausalz | grün | grün | Bleibt |
| Punktuelle Reparatur | grün | grün | Bleibt |
| Witterung (W) | grün | grün | Bleibt |
| Fleckschutz | grün | grün | Bleibt |
| Modernisierung / Umnutzung | grün | grün | Bleibt |
| Variabel (Farben) (V) | grün | grün | Bleibt |
| Sondernormen (WHG, Trinkw. etc.) | (nicht direkt markiert) | „?" (Frage­zeichen) | **Klären**: drin lassen oder raus (siehe §6) |

→ Statt „Laufender Betrieb" eine neue Spalte / Kennung „Schnell wieder belastbar" mit Stundenangabe (2–4 h, 24 h, 48 h, 7 d, 28 d) einführen. Das stützt sich direkt auf die RV-Schichtdicken-/Zeit-Daten.

### 3.2 Produkt-Reihenfolge (AP-Vorschlag)

Aktuelle Industrieestrich-Reihenfolge (vermutet) ist nicht optimal. AP nummeriert handschriftlich:

```
1. NEODUR HE 65            (mineralischer Hartstoffestrich)
2. NEODUR HE 65 Plus       (Faserverstärkter Hartstoffestrich)
3. NEODUR HE 60 rapid
4. NEODUR Level            (~30 mm)
5. KORODUR FSCem Screed    (Ausgleichsestrich, 15 mm)
```

**HS-Vorschlag:** „HE 65 untereinander, HE 40, HE 60, Levelling-Produkte (Level, Laval AU)" — sieht HE 65 als Anker, dann Schwester­produkte, dann HE 40 / HE 60 / Levelling.

**Empfehlung:** AP-Reihenfolge übernehmen. Sie ist konkret durchnummeriert und folgt der Schichtdicken-Logik (klassisch → faserverstärkt → schnell → dünn → Ausgleich). Mit RV-Daten gegenchecken: HE 65 = 15 mm Sanierung, HE 65 Plus = 15–30 mm, HE 60 rapid = 10–60 mm, Level = 6–10 mm, FSCem Screed = 15 mm im Verbund. Reihenfolge passt nach Hauptanwendungsfeld.

### 3.3 Fehlende Produkte (rein)

| Produkt | Quelle | RV-Beleg | Schichtdicke (Sanierung) |
|---|---|---|---|
| **DOT Europe Concrete Mix** | AP, HS implizit | R56 — als „Faserverstärkter Schnellbeton 50–600 mm" | 50–600 mm |
| **Rapid Set Concrete Mix** | AP („Rapid Set Schnellbeton, Spedition Brummer") | R55 — „CONCRETE MIX" mit 50–600 mm | 50–600 mm |

Zusätzlich aus RV-Matrix als potentielle Kandidaten (nicht explizit gefordert, aber im Sanierungs-Portfolio relevant):

- **Rapid Set ASPHALT REPAIR MIX** (R57, 30–600 mm) — Spezialfall Asphaltsanierung
- **NEODUR HE 40-8** (R17, 25–50 mm) — größere Schichtdicke als HE 40
- **KORODUR HB 5 / HB 5 rapid** (Haftbrücken) — als System-Begleitprodukte zeigen, nicht als wählbares Sanierungsprodukt
- **KORODUR uniPrimer / PC / TXPK** (Grundierungen) — dito

### 3.4 Produkte raus / kritisch

| Produkt | Quelle | Begründung |
|---|---|---|
| **Pflasterfugenmörtel** | AP, HS („Pflasterthemen weglassen, hat mit InBo-Boden nichts zu tun, produzieren wir nicht") | Falsche Produktkategorie |
| **Korocure** | AP („würde ich rauslassen") | AP-Einschätzung — RV bestätigt Korocure nicht als Sanierungs-Hauptprodukt, sondern als Nachbehandlung (KOROMINERAL CURE) |
| **Korotex** | AP („würde ich rauslassen") | RV bestätigt: KOROTEX ist Nachbehandlung/Oberflächenfinish — gehört zu Begleitprodukten, nicht in Sanierungs-Hauptauswahl |
| **Nachbehandlung allgemein** | HS („kein Sanierungsprodukt, gehört immer zum eingesetzten System, immer erforderlich") | RV-Matrix führt easyFinish, nanoFinish, KOROMINERAL als „Gewerk = Nachbehandlung / Oberflächenfinish" — separater Layer |

**Stattdessen rein** (AP): **Koromineral** und **Koromineral Li+** — beide sind in RV als „Oberflächenfinish" gelistet (R47/R48), Li+ besonders mit Fußnote „rost- und tausalzbeständig in Verbindung mit HE 60 rapid". Das sind Begleitprodukte, keine Sanierungs-Hauptprodukte.

### 3.5 Aufteilung der Matrix auf zwei Seiten

HS-Hinweis: „auf zwei Bilder aufgeteilt — so könnt ihr es besser ausdrucken". Heißt: die Matrix soll als Druckdokument verwendbar bleiben. Für die Web-App weniger relevant, aber **Print-CSS testen** beim nächsten Build.

---

## 4. Erkenntnisse aus der RV-Matrix (Datenmodell)

Die RV-Matrix beschreibt das gesamte KORODUR-Portfolio (~70 Produkt-Varianten) mit folgenden strukturierten Feldern, von denen viele in unserem aktuellen `data/produkte.ts` **fehlen oder unsauber abgebildet sind**.

### 4.1 Vorgeschlagene Felder pro Produkt

| Feld | RV-Beleg | Status in App | Empfehlung |
|---|---|---|---|
| `gewerk` (InBo / Sichtestrich / Reparaturmörtel / Vergussmörtel / Haftbrücke / Grundierung / Nachbehandlung / Oberflächenfinish) | Spalte C | nicht vorhanden | **Aufnehmen** — ermöglicht saubere Filterung zwischen Hauptprodukt und System-Begleitprodukt |
| `sanierungSchichtdicke` (Range, mm) | Spalten F+G | teilweise vorhanden, uneinheitlich | **Konsolidieren** als `{min, max, unit:"mm"}` |
| `neubauSchichtdicke` (Range, mm) | Spalten D+E | nicht systematisch | nice-to-have, V2.5 nicht zwingend |
| `innen` / `aussen` (boolean) | Spalten H+I | teilweise als Tag | **Als getrennte Booleans** statt Tag-String |
| `einbauverfahren` (Einstreuung / frisch-a.-frisch / auf erhärteten Beton) | Spalten J/K/L | nicht vorhanden | Für Sanierung implizit „erhärtet" — als Filter überflüssig, aber als Detail-Info wertvoll |
| `reparaturLage` (Boden / Wand / über Kopf) bei Reparaturmörteln | Spalten J/K/L (Sub-Header R50) | nicht vorhanden | Aufnehmen als Tag-Array `["boden", "wand", "ueberKopf"]` |
| `maschinentechnik` (Liste) | Spalte M+N | nicht vorhanden | Als Detail-Info auf Produktseite, kein Filter |
| `systemBegleitprodukte` (Liste Produkt-Slugs) | aus RV-Logik ableitbar (Haftbrücke + Grundierung + Hauptprodukt + Nachbehandlung) | nicht vorhanden | **Aufnehmen** — pro Hauptprodukt empfohlenes System anzeigen |
| `sonderbedingungen` (Fußnoten) | RV \*1, \*2 | nicht vorhanden | Als Tags, z.B. `["heizestrich-geeignet", "rost-tausalz-mit-li-plus"]` |

### 4.2 Konkrete Schichtdicken-Werte für die aktuell 17 App-Produkte

Aus RV extrahiert (für Sanierung):

| App-Produkt | RV-Slug | Sanierungs-Schichtdicke | Innen | Außen | Besonderheit |
|---|---|---|---|---|---|
| NEODUR HE 65 | R9 | 15 mm | ✓ | — | mineralischer Hartstoffestrich |
| NEODUR HE 65 Plus | R14 | 15–30 mm | ✓ | ✓ | faserverstärkt |
| NEODUR HE 40 | R16 | 15–35 mm | ✓ | — | |
| NEODUR HE 40-8 | R17 | 25–50 mm | ✓ | — | größere Schichtdicke |
| NEODUR HE 60 rapid | R18 | 10–60 mm | ✓ | (\*1) | nur mit KOROMINERAL Li+ rost-/tausalzbeständig |
| NEODUR Level | R22 | 6–10 mm | ✓ | — | dünn, Ausgleichsschicht |
| KORODUR FSCem Screed | R36 | 15 mm im Verbund / 35 mm auf Trenn / 40 mm auf Dämm | ✓ | — | Heizestrich-fähig |
| Rapid Set CEMENT ALL | R51 | 0–100 mm | ✓ | ✓ | über Kopf 5–10 mm, Wand 5–15 mm, Boden 0–100 mm |
| Rapid Set MORTAR MIX | R53 | 10–150 mm | (✓) | (✓) | über Kopf 15 mm, Wand 20 mm |
| Rapid Set CONCRETE MIX | R55 | 50–600 mm | — | — | **fehlt in App!** |
| DOT Europe CONCRETE MIX | R56 | 50–600 mm | — | — | **fehlt in App!** faserverstärkt |
| ASPHALT REPAIR MIX | R57 | 30–600 mm | — | ✓ | Asphalt-Sanierung |

(Die übrigen aktuellen App-Produkte bitte einmal gegen RV abgleichen — Tabelle ist exemplarisch.)

### 4.3 Was aus RV *nicht* in V2.5 muss

- Vergussmörtel-Sektion (VM 1/3/5, VB 8, VM basic, SVM 03, USM 3/5) — eigener Anwendungsbereich „Verguss", nicht Sanierung im engeren Sinne. Optional als Cross-Sell-Hinweis.
- Sichtestriche (GRANIDUR, KCF, TRUAZZO, MICROTOP) — passen zu Step 1 „Modernisierung / Umnutzung / Design", wären aber ein eigener großer Produkt-Layer. **Bewusst out-of-scope für V2.5**; im Plan vermerken für V3.
- Sub-Varianten (HE 65 SVS 1,5 / SVS 3 / metallisch / Plus SVS 3 / HE 3 green / …) — vermutlich überfordern sie die Self-Service-UX. **Empfehlung:** in Produktdetailseite als „Varianten" auflisten, nicht im Lösungsfinder-Output.
- Zusatzmittel (Set Control Verzögerer, Flow Control Verflüssiger, Fast Beschleuniger) — Verarbeitungs-Modifikatoren, gehören zur Anwendungs­dokumentation des jeweiligen Rapid-Set-Produkts.

---

## 5. Konflikte zwischen den Stimmen

| Streitpunkt | DM | HS | AP | Empfehlung |
|---|---|---|---|---|
| Profil-Frage „Wer ist Suchender?" als Step 0 | **Pro** (Architekt/Bauherr/Verleger) | nicht thematisiert | nicht thematisiert | **Verschieben auf V3** — überfrachtet 3-Step-Iteration; statt­dessen Ergebnistiefe später personalisieren |
| Innen/Außen als eigene erste Frage | **Pro** (1a) | implizit in Step 1/2 enthalten | **Pro** (Frage 1) | **Klären** (offene Frage §6) — entweder als „0,5er-Schritt" oder über Step-1-Option „Außenflächen" implizit |
| Belastungsbild binär vs. mehrstufig | nicht explizit | mehrstufig + Mehrfachauswahl | binär („extrem vs. eher leicht") | **Mehrstufig mit Mehrfachauswahl** (HS-Variante) — App-UX kann das besser als ein Verkaufsgespräch |
| Flächengröße als Step | nicht explizit | nicht thematisiert | **Pro** (Frage 4: <1 m² / 10 m² / >100 m²) | **Optional als Sub-Frage** für punktuelle Reparatur (Step 1, Option 3); für flächige Sanierung weniger relevant |
| Einbaustärke als Step | nicht explizit | nicht thematisiert | **Pro** (Frage 6) | **Nicht im Wizard** — Einbaustärke ist Ergebnis-Eigenschaft pro Produkt, kein Nutzer-Input. Wenn Nutzer es weiß, ist es ein guter Filter; aber meistens weiß er es nicht. → in Ergebnisansicht als Filter anbieten |
| „Sondernormen" als Step-1-Option | nicht thematisiert | rot mit „??" | nicht thematisiert | **Raus aus Wizard** — Beratungs-Pfad („Sie brauchen WHG/Trinkwasser? → Kontakt") |
| Zeitfenster „Mittelfristig 2–4 Wo" vs. „1–2 Wo" | „48 h, 20 Tage" | **1–2 Wo** | nicht spezifisch | **1–2 Wo** (HS) — passt zur typischen Sanierungs-Realität |

---

## 6. Offene Fragen

1. **Innen/Außen** — als Step 0, als Step-1-Option oder als Ergebnis-Filter? (Vorschlag: Step-1-Option „Außenflächen" + zusätzlicher Toggle im Ergebnis.)
2. **„Sanierung mit Sondernormen"** — komplett raus aus dem Wizard und in einen Kontakt-Pfad lenken, oder als Bonus-Option drin lassen?
3. **„Punktuelle Reparatur" → Sub-Step „Lage" (Boden/Wand/über Kopf)** — V2.5 oder V3?
4. **Mehrfachauswahl Step 2** — UI-Aufwand vs. Aussagekraft. Falls einfach möglich, ja. Sonst Einzelauswahl mit „Hauptbelastung".
5. **Korocure / Korotex** — definitiv raus aus Sanierungs-Hauptauswahl? AP sagt ja, RV bestätigt fachlich. Bitte intern bestätigen.
6. **Asphalt Repair Mix** — soll die Sanierungs-App Asphalt­sanierung mitabdecken oder ist das eigene Welt?
7. **Produkt-Varianten (SVS 1,5 / SVS 3 / metallisch)** — auf Detailseite oder als separate Datensätze? (Aufwand abwägen.)
8. **System-Begleitprodukte** — wie genau in der Ergebnisansicht zeigen? Als „empfohlenes Komplettsystem" pro Hauptprodukt, mit Klick-Tiefe auf Begleitprodukt-Details?

---

## 7. Empfohlene Reihenfolge der Umsetzung

1. **Datenmodell-Konsolidierung** (`data/types.ts`, `data/produkte.ts`):
   - Felder ergänzen: `gewerk`, `sanierungSchichtdicke`, `innen`, `aussen`, `einbauverfahren`, `reparaturLage`, `systemBegleitprodukte`, `sonderbedingungen`
   - DOT Europe Concrete Mix + Rapid Set Concrete Mix als Datensätze nachpflegen
   - Korocure / Korotex aus Hauptliste entfernen, in Begleitprodukt-Sektion verschieben
   - Pflasterfugenmörtel komplett entfernen
2. **Lösungsfinder neu** (`app/[lang]/loesungsfinder/`, `data/loesungsfinder.ts`):
   - Step 1 = 4 Optionen (HS-Variante)
   - Step 2 = 7 Optionen, mehrfach-auswählbar
   - Step 3 = 3 Zeitfenster (HS-Variante mit 1–2 Wo)
3. **Produktmatrix** (`app/[lang]/produkte/matrix/`):
   - Spalte „Laufender Betrieb" raus, „Zeitfenster" rein (3 Werte)
   - Reihenfolge AP-Variante
   - Sondernormen-Spalte → klären (§6.2)
   - Print-CSS gegenchecken
4. **Produktdetail-Seite**:
   - System-Begleitprodukte als Sektion
   - Maschinentechnik als Detail-Info
   - Wiederbelastungszeit prominent
5. **i18n**: alle neuen Strings in 4 Sprachen, gegen KORODUR-Glossar prüfen
6. **Validierung**: `npx tsx scripts/validate-referenzen.ts` + `scripts/test-loesungsfinder.ts` durchlaufen lassen

---

## 8. Anhang — Quellen

### Notion
- [Feedback zu Sanierungsapp (Sammel-Seite)](https://www.notion.so/367670e19e1a803f8f93c65c7f066033)
- [Sanieren mit KORODUR Web-App entwickeln](https://www.notion.so/336670e19e1a80f887dad468b1676e57)
- [Klärungen für Lösungsfinder-Rewrite (Mai 2026)](https://www.notion.so/35f670e19e1a815e806cf49e759d0b2b)

### Lokale Originale
- `~/Library/.../uploads/FB_Loesungsfinder_AP.pdf` — AP Produktmatrix-Markup
- `~/Library/.../uploads/Matrix Verarbeitung_RV.xlsx` — RV Portfolio-Matrix
- `~/Library/.../outputs/feedback/daniel_may.png` — DM Konzept-Screenshot
- `~/Library/.../outputs/feedback/hubert_scheinost.png` — HS Markup-Screenshot

### Existierender Plan
- `docs/superpowers/plans/2026-05-13-loesungsfinder-3step-rewrite.md`

---

*Ende der Synthese. Nächster Schritt: Klärung der offenen Fragen (§6) mit den Stakeholdern, dann Aufnahme der Entscheidungen in den 3-Step-Rewrite-Plan.*

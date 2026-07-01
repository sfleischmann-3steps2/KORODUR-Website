# Konzept: Notion als CMS für die neue korodur.de

**Status:** Entwurf v2 — Content-Modell \+ Prüf-Framework festgezurrt **Datum:** 2026-06-25 **Ablageort (Vorschlag):** `docs/plans/2026-06-25-notion-cms-konzept.md` **Stack:** Next.js, `app/[lang]`, statisch nach GitHub Pages. Inhalte heute in `data/*.ts` (Produkte, Referenzen, Bereiche) \+ `content/*.mdx` (Artikel, Branchen, Schadensbilder); Übersetzungen als Basis-DE \+ Override pro Sprache in `data/i18n/`.

---

## 1\. Ausgangslage und Ziel

Zwei Aufgaben in einem System lösen:

1. **Inhaltliche Abnahme** der \~878 URL-Varianten — jede Seite, jede Sprache. Bei Übersetzungen rechtlich relevant: was im Deutschen korrigiert wurde, geht in die EN/FR/PL/IT-Prüfung durch Muttersprachler; deren Feedback wird wieder eingearbeitet.  
2. **CMS für die Zukunft** — nach Launch ändern sich Inhalte selten, aber wenn, sollen Fachkolleg:innen das in Notion tun, ohne Code anzufassen.

**Kernidee:** Notion wird Single Source of Truth für **Inhaltstext \+ Freigabe-Status**. Die Abnahme-Schleife läuft direkt im CMS; freigegebener Text fließt automatisch in die Website.

**Architektur-Glücksfall:** Die Website speichert Übersetzungen heute schon als *Basis-DE \+ ein Eintrag pro Sprache* — also exakt das Modell, das wir für Notion brauchen. Wir spiegeln eine bestehende Struktur, statt eine neue zu erfinden.

---

## 2\. Content-Typen: drei Stufen

Aus der Code-Analyse (nicht aus URL-Struktur abgeleitet, sondern aus der tatsächlichen Datenform): die Typen sortieren sich in drei Stufen. Wichtige Korrektur gegenüber dem ersten Entwurf — **Bereiche und Einzelseiten sind *keine* Langform-Content-Typen**: die Bereichsseiten montieren sich aus Produkten \+ Referenzen \+ Taxonomie (einziger Text: ein kurzer Intro-String), und die Singletons (Start/Unternehmen/Kontakt) beziehen *alle* Texte aus dem i18n-Wörterbuch (0 Langtext-Blöcke im Code). Das sind dünne UI-Texte.

| Stufe | Typen | Body | Master-Relation |
| :---- | :---- | :---- | :---- |
| **1 — Strukturiert \+ Prosa** | Produkt, Referenz | Template (feste H2) | ja (Kern Produktdaten / Referenzverzeichnis) |
| **2 — Freie Langtexte** | Artikel, Branche, Schadensbild, Rechtstexte | frei → MDX bzw. sektioniert | nein |
| **3 — Kurze UI-/Intro-Strings** | Bereich-Intros, Singletons | kein Body (Properties) | nein |

Stufe-3-Strings bleiben im **i18n-Wörterbuch** und werden nicht ins CMS gehoben (Begründung §3, Prüfung §7).

---

## 3\. Datenbank-Schnitt: drei CMS-Datenbanken

**Objektives Kriterium statt Bauchgefühl:**

Eine eigene Datenbank ist nur dann gerechtfertigt, wenn (a) sie ein **eigenes Master-Relations-Ziel** hat **oder** (b) eine **grundverschiedene Body-Form**. Sonst: eine Zeile mit `Typ`\-Select.

Daraus folgt zwingend **3 DBs**:

### DB 1 — Website-Text: Produkte

- **Relation:** → Kern Produktdaten (84 Produkte; führend für die Website-Liste sind aber die 67 aus `data/produkte.ts`)  
- **Properties:** Titel · Sprache (de/en/fr/pl/es) · Status · Prüf-Modus (§7) · Reviewer (Person) · Geprüft am · AI-Check (Status/Datum) · Feedback · Produkt-Relation  
- **Body:** Template „Produkt-Text"

### DB 2 — Website-Text: Referenzen

- **Relation:** → Referenzverzeichnis  
- **Properties:** wie DB 1 \+ Kundenfreigabe (aus `releaseStatus`: öffentlich / anonymisiert / freigabe-offen / intern) \+ Projekttyp (Rollup)  
- **Body:** Template „Referenz-Text"

### DB 3 — Website-Inhalte (Redaktionell \+ Rechtstexte)

- **Properties:** Titel · **Typ** (artikel / branche / schadensbild / rechtstext) · Sprache · Status · Prüf-Modus · Reviewer · Geprüft am · Quellen · Slug · Ebene (Orientierung/Fach)  
- **Body:** frei → MDX (redaktionell) bzw. sektioniert (Rechtstext: \#\# Überschrift \+ Absätze)

**Warum nicht 1 Mono-DB:** unterschiedliche Body-Formen (Referenz-Story ≠ Produkt-Prosa ≠ freier Artikel) → viele leere Properties; und kleinere, zweckscharfe DBs halten Queries klein und Schemata stabil (agentenfreundlich). **Warum nicht 4+:** Bereiche/Singletons gehören als kurze Strings ins Wörterbuch, Rechtstexte teilen sich DB 3 mit den Artikeln (gleicher Body-Charakter, nur anderer Prüf-Modus).

---

## 4\. Kernprinzip: Master-Daten vs. Text-Layer (strukturiert vs. Prosa)

Produkte und Referenzen sind **kein reiner Text**. Ein Produkteintrag trägt neben Marketing-Prosa auch Lösungsfinder-Taxonomie, Klassen, Kennwerte; eine Referenz trägt Stammdaten (Ort, Fläche, Produkte, `einsatzbereiche`, `sanierungsart`, `zeitDringlichkeit` — alles Lösungsfinder-Input). Würde jemand beim Übersetzen versehentlich ein Tag ändern, **bricht die Filterlogik**.

```
MASTER-DATEN (bleibt, wird NICHT übersetzt)
  Kern Produktdaten · Referenzverzeichnis · Lösungsfinder-/Matrix-Taxonomie (Code)
        │  Relation (verlinkt, nicht kopiert)
        ▼
WEBSITE-TEXT-LAYER (das CMS — nur DAS wird geprüft & übersetzt)
  nur Prosa-Felder · pro Sprache ein Eintrag · Freigabe-Status pro Sprache
```

**Prosa-Felder pro Typ (das, was ins CMS kommt):**

- **Produkt:** Kurzbeschreibung, Anwendung, Vorteile, Hinweise. *Nicht:* Klassen, Kennwert-Zahlen, Tags.  
- **Referenz:** Untertitel, Ausgangssituation, Herausforderungen, Lösung, Vorteile, Ergebnis, Langzeit. *Nicht:* Ort/Fläche/Jahr/Produktliste/Tags.  
- **Redaktionell:** kompletter Body. *Nicht:* `quellen[]` (bleiben Metadaten).

**Sync-Konsequenz (kritisch):** Der Sync schreibt **nur Prosa-Felder** und macht einen **feldweisen Merge** — nie ein Vollüberschreiben. Eine Schema-Whitelist „diese Felder kommen aus Notion" verhindert Unfälle (§9).

---

## 5\. Granularität: ein Eintrag pro (Seite × Sprache)

Notion-Properties sind auf 2.000 Zeichen begrenzt → Langtext muss in den **Seitenkörper**, und ein Körper gehört zu einer Page → jede Sprache \= eigene Page.

```
Referenzverzeichnis · „Fraport"            ← Master (Stammdaten)
   ├── Referenz-Text · „Fraport · DE"  🟢
   ├── Referenz-Text · „Fraport · EN"  🟡
   └── Referenz-Text · „Fraport · FR"  🔴   (IT fehlt → Website fällt auf DE zurück)
```

Auf dem Master zeigt ein **Rollup** den Sprachstatus. Deckt sich 1:1 mit der `localize()`\-Fallback-Logik im Code → „Sprach-Eintrag fehlt" ist ein gültiger Zustand, ideal fürs inkrementelle Nachziehen.

---

## 6\. Textlängen-Problem → Seitenkörper-Templates

Properties tragen Metadaten; der Text lebt im Körper. Damit der Sync deterministisch parst, bekommt jeder strukturierte Typ ein **Template mit festen H2-Überschriften** (= Prosa-Felder werden zu Sektionen):

```
Template „Referenz-Text"            Template „Produkt-Text"
## Ausgangssituation                ## Kurzbeschreibung
## Herausforderungen                ## Anwendung
## Lösung                           ## Vorteile
## Ergebnis                         ## Hinweise
## Langzeit / Nachhaltigkeit
```

Redaktionelle Seiten brauchen kein festes Template (Body 1:1 → MDX). Rechtstexte: \#\# Abschnittsüberschrift \+ Absätze (entspricht der `AgbAbschnitt`\-Struktur im Code).

---

## 7\. Prüf- & Freigabe-Anforderungen nach rechtlicher Relevanz

**Das ist der Kern für die Go-Live-Abnahme.** Statt pauschal „alles manuell prüfen" steuern wir die Prüf-Intensität nach zwei Achsen:

1. **Fehler-Folge:** Was passiert rechtlich/geschäftlich, wenn dieser Inhalt einen Fehler hat?  
2. **Wahrheitsquelle:** Gibt es eine maschinell prüfbare Referenz, gegen die AI gegenprüfen kann?

### 7.1 Leitfrage: Was ist rechtlich problematisch, wenn es Fehler hat?

- **Rechtstexte** (AGB, Datenschutz, Impressum, Hinweisgebersystem): direkte Haftung — Abmahnung, DSGVO-Bußgeld, unwirksame Klausel, Pflichtangaben nach DDG/§5.  
- **Produkt-Leistungsaussagen** („chemikalienbeständig", „für höchste Beanspruchung", Befahrbarkeitszeiten): Produkthaftung \+ UWG (irreführende Werbung), wenn nicht durch TDS/DoP gedeckt.  
- **Normative/diagnostische Aussagen** (Schadensbilder, Ratgeber mit DIN-Bezug): fehlerhafte fachliche Beratung, Reputational.  
- **Kundennennung in Referenzen:** Persönlichkeits-/Vertragsrecht, wenn ohne Freigabe veröffentlicht.  
- **UI-/Navigationstexte:** gering — Marketing-Copy, keine spezifischen Zusicherungen.

### 7.2 Drei Prüf-Modi

- **M — Manuelle Abnahme:** ein verantwortlicher Mensch gibt frei, das ist der rechtliche Nachweis. Für hohe Fehler-Folge ohne maschinelle Quelle.  
- **AI — AI-Gegenprüfung gegen Quelle \+ Mensch nur bei Flags:** AI vergleicht den Text mit einer Wahrheitsquelle, flaggt Abweichungen; Mensch prüft nur die Flags. Senkt die manuelle Last drastisch.  
- **L — Leichte Prüfung:** 4-Augen, kein formaler Nachweis nötig.

**Wichtig:** AI ersetzt bei rechtlich relevanten Inhalten **nicht** die Freigabe — sie ist Vorfilter. Die Freigabe-of-Record für Stufe „hoch/höchste" bleibt menschlich. AI verschiebt nur den Aufwand von „alles lesen" zu „Flags entscheiden".

### 7.3 Anforderungen DE-Abnahme (pro Content-Typ)

| Content-Typ | Rechtl. Relevanz | Prüf-Modus DE | Wer |
| :---- | :---- | :---- | :---- |
| Rechtstexte | Höchste | **M** — juristische Abnahme | Recht/GF (ggf. extern) |
| Produkt-Texte | Hoch | **AI** gegen Kern Produktdaten/TDS → Flags → fachliche Schlussfreigabe | AI \+ Richard/Frank (Flags), Marketing (Text) |
| Schadensbilder | Mittel-hoch | **M** — fachliche Abnahme | Richard/Frank |
| Artikel / Branche | Mittel | **M** — fachliche Abnahme (normativ Richard) | Richard/Frank |
| Referenz-Texte | Mittel | **AI** (Produkt-Claims gegen Produkt-Master) **\+ M** (Kundenfreigabe via `releaseStatus`) | AI \+ Marketing; Vertrieb (Freigabe) |
| UI-/Intro-Strings | Niedrig | **L** — im Wörterbuch | Marketing |

### 7.4 Anforderungen Übersetzungen (pro Content-Typ)

Grundlogik: AI prüft **Faktentreue gegen das freigegebene DE-Original \+ Glossar** (Zahlen, Produktnamen, Claims, Terminologie); der Muttersprachler prüft **Sprache, Nuance, fachliche Stimmigkeit**.

| Content-Typ | Übersetzungs-Risiko | Prüf-Modus Übersetzung | Wer |
| :---- | :---- | :---- | :---- |
| Rechtstexte | Höchste — fehlerhafte Klausel \= Haftung | **M** — juristische Prüfung im Zielland (nicht nur Muttersprachler) | Recht \+ Landespartner |
| Produkt-Texte | Hoch — gedrehte Leistungsaussage, falscher Fachbegriff | **AI** (Faktentreue \+ Glossar) → **M** Muttersprachler-Fach | AI \+ Manuela/EN, Daniel/PL … |
| Schadensbilder | Mittel-hoch | **AI** (Glossar) → **M** Muttersprachler-Fach | AI \+ Reviewer |
| Artikel / Branche | Mittel | **AI** (Glossar/Zahlen) → **M** Muttersprachler | AI \+ Reviewer |
| Referenz-Texte | Mittel — Eigennamen/Orte **nicht** übersetzen | **AI** (Zahlen/Produktnamen-Konsistenz) → **M** Muttersprachler | AI \+ Reviewer |
| UI-Strings | Niedrig | **M-light** Muttersprachler | Reviewer |

### 7.5 Der AI-Gegenprüf-Workflow (Skizze)

Drei konkrete Abgleich-Strecken, die zu bauen sind:

1. **Produkt-Text ↔ Kern Produktdaten / TDS:** AI extrahiert die *Behauptungen* aus dem Webtext → matcht jede gegen die strukturierten Master-Werte → flaggt nicht gedeckte oder widersprüchliche Claims. (Konzeptuell dieselbe LLM-Extraktion wie bei der TDS→Notion-Sync.)  
2. **Referenz-Produkt-Claims ↔ Produkt-Master:** Produktnamen \+ Leistungsangaben in der Story gegen den Master prüfen.  
3. **Übersetzung ↔ DE-Original \+ Glossar:** AI-Rückabgleich auf Faktentreue (Zahlen, Namen, Claims) \+ Terminologie-Konsistenz gegen den Notion-Glossar → flaggt Drift. Mensch macht Fluency-Pass auf den Rest.

Ehrlich eingeordnet: Das ist selbst eine kleine Pipeline/Skill, kein Gratis-Feature — aber sie skaliert die rechtlich kritische „DE korrigiert → Übersetzung nachziehen"-Schleife, die sonst rein manuell über 67 Produkte × Sprachen läuft.

---

## 8\. Status-Modell

Bestehende Legende aus `docs/freigaben/content-freigabe.md` (Team kennt sie), aber auf **Pro-Sprache-Granularität** und um den Prüf-Modus ergänzt:

- 🔴 **offen** · 🟡 **Nacharbeit** (Feedback/Issue verlinkt) · 🟢 **abgenommen** (eingefroren bis zur nächsten Änderung) · ⚪ **n/a**  
- Zusätzlich pro Eintrag: **Prüf-Modus** (M / AI / L aus §7) \+ **AI-Check** (Status/Datum, falls Modus AI).  
- Pro Master: **Rollup** „2/3 abgenommen".

**Doppelpflege vermeiden:** Notion ersetzt die Markdown-Freigabetabelle (die driftet schon: 78/58 im Doc vs. 67/132 in Daten vs. 84 in Kern Produktdaten). Single Source statt Hand-Tabelle.

---

## 9\. Sync- & Trigger-Architektur

**Richtung:** Notion ist nach Launch SoT für Prosa. GitHub Action zieht Notion → schreibt Repo-Dateien → Commit → Build → Deploy.

**Trigger — zwei Signale kombiniert (kein eigenes Änderungs-Register nötig):**

- **Status \= Freigabe-Gate:** nur 🟢 (bzw. DE-Fallback) baut. Der menschliche Wille.  
- **`last_edited_time` \= Änderungsfilter:** Notion stempelt jede Seite automatisch → die Action zieht „alle 🟢 **und** seit letztem erfolgreichen Sync editiert". Qualifiziert nichts → No-op (kein Commit, kein Build).

**Mechanismus:**

- **Manueller „Veröffentlichen"** \= `workflow_dispatch` (Button) oder Notion-Button → `repository_dispatch`. Die Kontrolle, die wir wollen.  
- **Optional stündlicher `schedule`\-Lauf** mit identischer Logik. Zum Launch erst manuell, Schedule später additiv.  
- **Keine Webhooks** — für seltene Content-Änderungen Overkill und fragiler.  
- „Letzter Sync"-Zeitstempel als versionierte Datei im Repo.

**Mapping pro Typ (feldweiser Merge, Prosa-Whitelist):** | Typ | Ziel | Operation | | :--- | :--- | :--- | | Produkt-Text DE | Prosa-Felder in `data/produkte.ts` | feldweiser Merge (Taxonomie unberührt) | | Produkt-Text XX | `data/i18n/produkte.xx.ts` | Override schreiben | | Referenz-Text DE/XX | `data/referenzen.ts` / `i18n/referenzen.xx.ts` | Merge / Override | | Redaktionell | `content/<typ>/<slug>.mdx` | Body → MDX, Props → Frontmatter |

**Nebeneffekt:** jede Veröffentlichung \= Git-Commit → Audit-Trail \+ Ein-Klick-Rollback gratis. **Risiko MDX-Round-Trip:** Notion-Blöcke → MDX ist nicht verlustfrei (Custom-Components) → früh Block-Mapping testen.

---

## 10\. MVP-Scope

- **Go-Live-Sprachen:** DE, EN, FR. Rest additiv, live sobald geprüft.  
- **Nicht alle 132 Referenzen in allen Sprachen für MVP** — DE vollständig, EN/FR nur **Hero-Referenzen** (international relevant), Rest folgt. Fallback macht das schmerzfrei.  
- **Go-Live-Definition:** live, sobald alle MVP-gescopten Inhalte 🟢.

---

## 11\. Migrationsphasen

| Phase | Inhalt | Ergebnis |
| :---- | :---- | :---- |
| **0 — Schema** | Konzept abstimmen; DB 1–3 \+ Templates \+ Prüf-Modus-Properties in Notion anlegen | CMS-Gerüst |
| **1 — Import** | Skript: aktuelle DE-Prosa aus `data/*.ts` \+ `*.mdx` → Notion-Pages (mit Master-Relation) | Ist-Stand in Notion |
| **2 — Abnahme DE** | Pro Content-Typ nach §7: M-Inhalte manuell, AI-Inhalte über Gegenprüf-Pipeline → Flags → Freigabe | DE-Status gepflegt |
| **3 — Übersetzung & Prüfung** | DE-🟢 → Sprachprüfung (AI-Faktentreue → Muttersprachler), Feedback als Issue \+ Statuswechsel | Sprach-Status gepflegt |
| **4 — Sync zurück** | GitHub Action zieht 🟢 → Repo (feldweiser Merge) → Build → Launch | Website live aus Notion |
| **5 — Betrieb** | Redaktion ändert Text nur noch in Notion → Pipeline deployt | Notion \= SoT |

**Entkopplung:** Phase 1–3 blockieren die laufende Code-Entwicklung nicht; der Import friert nur den Text-Stand ein. Erst Phase 4 macht Notion zur Quelle.

---

## 12\. Entscheidungen & offene Punkte

**Entschieden (2026-06-25):**

1. **3 DBs** (Produkt / Referenz / Redaktionell+Rechtstext).  
2. **Produkt-Texte:** Marketing pflegt (Reviewer-Default Anna), Technik fachlich bei Flags.  
3. **Führende Produktliste:** Website-Daten (67); Kern Produktdaten (84) nur Relations-Anker.  
4. **Sync:** GitHub Action; Trigger \= Status 🟢 \+ `last_edited_time`; manuell \+ optional stündlich; keine Webhooks.  
5. **UI-/Intro-Strings (Stufe 3):** bleiben im i18n-Wörterbuch, leichte Prüfung.  
6. **Prüf-Steuerung:** nach rechtlicher Relevanz, drei Modi M/AI/L (§7).

**Noch offen:**

- **Juristische Freigabe-Instanz** für Rechtstexte (DE \+ Übersetzungen) — intern GF oder extern? Bestimmt Phase 2/3 für DB 3\.  
- **Hero-Referenz-Set** für EN/FR-MVP — welche der 132?  
- **AI-Gegenprüf-Pipeline:** schon für MVP-Abnahme bauen (max. Nutzen, aber Aufwand) oder MVP manuell und Pipeline danach?

---

## 13\. Nächste Schritte

1. Offene Punkte (§12) klären.  
2. **Aufgaben-DB** auf bestehendes Website/CMS-Projekt prüfen, dann Tasks pro Phase anlegen (Projekt \+ Verantwortliche:r) — *erst beim Übergang in die Umsetzung*.  
3. Kern-Produktdaten- \+ Referenzverzeichnis-Schema sichten → Relations-Felder exakt festlegen.  
4. DB 1–3 \+ Templates \+ Prüf-Modus-Properties anlegen.  
5. Import-Skript (Phase 1\) \+ AI-Gegenprüfung an **einem** Produkt \+ **einer** Referenz prototypen — validiert §4, §7.5 und §9 in einem Rutsch.


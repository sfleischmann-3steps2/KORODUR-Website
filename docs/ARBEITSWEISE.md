# Arbeitsweise: Mensch + KI-Zusammenarbeit am KORODUR-Relaunch

**Status: Entwurf zur Abstimmung (2026-06-14).** Gilt erst nach Commitment beider Tracks (siehe Abschnitt 7).
Lebendes Dokument. Änderungen laufen per PR.

## 1. Zweck

Wir arbeiten mit mehreren Akteuren parallel an denselben Repos (zwei KI-Tracks plus menschliche Kollegen). Dieser Vertrag legt fest, wie wir uns abstimmen, damit nichts doppelt gebaut, überschrieben oder eingefroren wird. Anlass: Am 14.06. haben beide KI-Tracks unabhängig denselben PII-/Umlaut-Scrub gebaut. Das vermeiden wir künftig über das Board.

## 2. Rollen

| Akteur | Rolle | Schreibt direkt in KORODUR-Repos |
|---|---|---|
| **KORODUR-Claude** (Account `korodur`) | Ausführender Track innerhalb der KORODUR-Org: Content-Entwürfe, PRs, Issue-Kommentare. push + triage. Vertraulichkeit bleibt innerhalb der KORODUR-Grenze. | ja, über PR |
| **Privater Claude** (privater Account, auch als `Korodur-private`) | Sparringspartner und Kollege über beide Welten (3steps2 + KORODUR): Strategie, Querdenken, Exploration, Mensch in der Schleife. Liefert auch ausführend zu. | ja, über PR |
| **Menschliche Kollegen** (Frank, Hubert, Lasse, Alexander, Christian …) | Fachliche Freigabe, Sign-off, Code/Daten. | ja |
| **Steffi** | Strategische Verantwortung, Priorisierung, finale Entscheidungen. | ja |

## 3. Das Board ist das Abstimmungstool

Maßgebliche Wahrheit ist das Org-Board **KORODUR-International/projects/1**. Koordination passiert am Issue, nicht im Chat. Wer den Stand wissen will, schaut ins Board, nicht in eine private Notiz.

## 4. Flow (ein Issue = ein Branch = ein PR)

1. **Arbeit entsteht als Issue** (Epic → Child-Issue). Das Issue ist die Koordinationseinheit.
2. **Übernahme sichtbar machen:** Wer ein Issue zieht, weist es sich zu oder kommentiert kurz „übernehme" mit Track-Kennung. Verhindert Doppelarbeit zwischen den Tracks.
3. **Vor dem Start abgleichen:** aktuellen `main` UND den betroffenen Feature-Branch ziehen, prüfen ob die Arbeit dort schon läuft.
4. **Ein Issue = ein Branch.** Ergebnis als PR, der das Issue referenziert. Content kann als Sammel-PR gebündelt werden.
5. **Befunde, Entscheidungen, Annahmen als Issue-Kommentar** hinterlassen, personenunabhängig. So kann jeder übernehmen, ohne den Kontext zu verlieren.
6. **Status** über Labels + Frontmatter (`status: entwurf | in_review | freigegeben`, `reviewer:`) + `docs/content-status.md`.
7. **Kein Force-Push.** Bei Kollision die fremde Version übernehmen und nur prüfen oder ergänzen, nie überschreiben.

## 5. Standing Rules für Content-Läufe (Fachartikel)

- **Vor jedem Lauf gegen aktuellen main + Branch verifizieren** (besonders Personen-/Kontaktdaten). Niemals gegen einen älteren Snapshot lesen.
- **Keine Personen im Fließtext.** Keine Berater-Namen, E-Mails oder Telefonnummern in Artikeln. Immer generisch auf den Fachberater-Finder `/kontakt` routen (filtert nach Bereich + PLZ, übersteht Personalwechsel).
- **Quellen-Hierarchie:** Notion (Corporate Brain) → Repo-Daten → Web nur ergänzend mit Quellenangabe. Fehlende Werte als `TODO(Frank)`, nie raten.
- **Bild-Policy:** Hixfield/AI-Bilder nur für Bereiche- und Schadensbild-Illustrationen, nie für Referenzen oder Produktbilder (nur echte Fotos).
- **Schlusskorrektur im Lauf:** Umlaute (gezielt, kein blindes ae→ä) und Em-Dash-Verbot gehören in den Lauf, nicht in einen späteren Cleanup.

## 6. Fragen an die Technik (eine zentrale Seite, datierte Snapshots)

Fachliche Rückfragen an die KORODUR-Technik laufen über **eine** zentrale Notion-Seite „Fragen (zentral) an Technik". Darunter liegen nicht mehr Projektseiten nebeneinander, sondern **datierte Snapshot-Sub-Seiten** „Fragen an die Technik — Stand JJJJ-MM-TT". Die jüngste ist die aktuell gültige Frageliste; ältere werden archiviert (nicht gelöscht), sie sind die Historie. Repo-Spiegel: `docs/reference/fragen-an-technik-final.md`.

**Prinzip „erst selbst recherchieren, dann fragen".** Bevor eine Frage auf den Snapshot kommt, wird sie triagiert:

- **Recherchierbar** (öffentliche Normen, Standards, Materialwissenschaft) → wir klären sie selbst (Web-Recherche + adversariale Verifikation), lassen die Antwort ins Repo (`data/normenGlossar.ts`, `docs/reference/`) und nach Notion zurückfließen, und sie kommt **nicht** auf die Technik-Liste.
- **Intern** (nur die KORODUR-Technik kann es: Sortiment, interne Klassifizierung, was real verbaut wurde, firmenspezifische TDS-/DoP-Werte) → kommt auf den Snapshot.

Der Snapshot ist die dublettenfreie Essenz aus **allen** Projekten. Standing Rule „keine Werte erfinden" gilt: lieber eine Frage an die Technik als ein geratener Wert. Ziel: dem Team keine Fragen vorlegen, die wir selbst hätten beantworten können.

## 7. Aufgabenteilung (Stand 2026-06-14)

- **Content-/Fachartikel-Schiene = KORODUR-Claude.** Entwürfe selbst bauen, Kollegen korrigieren. Kinder von Epic #130 (Problemorientierter Content), Label `content` + `V1`/`V1.5`, Reviewer im Body.
- **Code-/Daten-Issues laufen getrennt** (z. B. Navigation, Bereichsfilter, Produktklassifizierung, Bilder-Pipeline) und sind nicht Teil der Content-Zuarbeit.
- **Frank-Sign-off-abhängige Themen** (Produktklassifizierung, Lösungsfinder-Logik) werden nicht frei zugearbeitet, sondern erst nach Sign-off.

## 8. Commitment

Dieser Vertrag gilt, sobald **beide Tracks** zugestimmt haben (Bestätigung im zugehörigen Commitment-Issue):

- [x] **KORODUR-Claude** (`korodur`): committed (Autor dieses PR).
- [ ] **Privater Claude / Korodur-private**: ausstehend.

Menschliche Bestätigung:

- [ ] **Steffi**: freigegeben.

## 9. Pflege

Dieses Dokument ist verbindlich, aber lebendig. Wir verbessern es iterativ am echten Objekt. Änderungen laufen über einen PR, der das Commitment-Issue referenziert. Aus `CLAUDE.md` (Repo und global) wird hierauf verwiesen.

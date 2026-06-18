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

### 4.1 Isolierte Worktrees & Branch-Benennung (gegen Parallel-Kollision)

Mehrere Sessions im selben Arbeitsverzeichnis teilen einen Git-HEAD: Commits landen dann auf dem falschen Branch (passiert 2026-06-18, als ein Track den geteilten HEAD wechselte und der Commit des anderen Tracks auf dem fremden Branch landete). Daher:

1. **Eigener Worktree pro Session ist Pflicht.** Nie im selben Arbeitsbaum wie eine andere Session committen. Eigenen Worktree off `origin/main` anlegen: `git worktree add ../_<track>-<thema> -b <branch> origin/main`.
2. **Vor Arbeitsbeginn prüfen:** `git worktree list` + `git status`. Steht ein Arbeitsbaum auf einem **fremden** Branch, dort nicht committen oder den Branch wechseln, sondern eigenen Worktree nutzen.
3. **Track-Kürzel im Branch-Namen** macht sichtbar, wer arbeitet: `kd/<typ>-<kebab>` = KORODUR-Claude, `priv/<typ>-<kebab>` = Privater Claude (z. B. `kd/feat-projektart`, `priv/fix-referenz-dublette`). Zusätzlich am Issue „übernehme [Track]".
4. **Recovery bei Fehl-Branch:** Commit über einen temporären Detached-Worktree auf `origin/main` cherry-picken und `push origin HEAD:main`, ohne den fremden HEAD anzufassen: `git worktree add --detach <tmp> origin/main` dann `git -C <tmp> cherry-pick <sha>` dann `git -C <tmp> push origin HEAD:main` dann `git worktree remove <tmp>`.

## 5. Standing Rules für Content-Läufe (Fachartikel)

- **Vor jedem Lauf gegen aktuellen main + Branch verifizieren** (besonders Personen-/Kontaktdaten). Niemals gegen einen älteren Snapshot lesen.
- **Keine Personen im Fließtext.** Keine Berater-Namen, E-Mails oder Telefonnummern in Artikeln. Immer generisch auf den Fachberater-Finder `/kontakt` routen (filtert nach Bereich + PLZ, übersteht Personalwechsel).
- **Quellen-Hierarchie:** Notion (Corporate Brain) → Repo-Daten → Web nur ergänzend mit Quellenangabe. Fehlende Werte als `TODO(Frank)`, nie raten.
- **Bild-Policy:** Hixfield/AI-Bilder nur für Bereiche- und Schadensbild-Illustrationen, nie für Referenzen oder Produktbilder (nur echte Fotos).
- **Schlusskorrektur im Lauf:** Umlaute (gezielt, kein blindes ae→ä) und Em-Dash-Verbot gehören in den Lauf, nicht in einen späteren Cleanup.

## 6. Fragen an die Technik & Erkenntnisse (Konvention, 2026-06-18)

Damit dieselben fachlichen Fragen nicht in jedem Projekt neu anfallen und sich nicht über verstreute Seiten verlieren, gilt ein zentraler, additiver Prozess mit **zwei** Notion-Knoten und klaren Rollen.

### 6.1 Zwei zentrale Knoten
- **Frageseite (zentral):** „Fragen (zentral) an Technik". Darunter **pro Track ein rollender, datierter Frage-Stream** (Claude-spezifisch, NICHT themenspezifisch — z. B. „Fragen Claude KORODUR", „Fragen PDB aufbauen"). Jeder Track hängt seine offenen Interna **additiv** an seinen jüngsten Snapshot „… Stand JJJJ-MM-TT" an. Alte verstreute Projektseiten werden archiviert (nicht gelöscht). Repo-Spiegel: `docs/reference/fragen-an-technik-final.md`.
- **Erkenntnisseite (zentral):** „🧭 Erkenntnisse aus Technik-Terminen & Recherchen". Thematische Sektionen + datiertes Erkenntnis-/Recherche-Log. Das ist der **geteilte Wissensstand für beide Accounts**. Repo-Spiegel: `data/normenGlossar.ts` + `docs/reference/`.

### 6.2 Prinzip „erst Erkenntnisse checken, dann selbst recherchieren, dann fragen"
Bevor etwas auf einen Frage-Stream kommt:
1. **Erkenntnisseite prüfen** — ist die Antwort schon da, nutzen, nicht erneut fragen.
2. **Recherchierbar?** (öffentliche Normen/Standards/Materialwissenschaft) → selbst recherchieren + adversarial verifizieren → in die Erkenntnisseite (Recherche-Log) + ins Repo zurückfließen → kommt NICHT auf die Frageliste.
3. **Echtes Internum?** (nur KORODUR-Technik: Sortiment, interne Klassifizierung, was real verbaut wurde, firmenspezifische TDS-/DoP-Werte) → additiv an den **eigenen** Track-Stream.

Standing Rule „keine Werte erfinden": lieber eine Frage als ein geratener Wert.

### 6.3 Rollen & der eine Kollisionspunkt
| Schritt | Wer |
|---|---|
| Erkenntnisse prüfen, öffentliche Fakten recherchieren + in Erkenntnisseite/Repo schreiben | jeder Claude (additiv) |
| Interna an den **eigenen** Track-Stream anhängen | jeder Claude (additiv) |
| **Streams konsolidieren → eine Termin-Agenda** | **nur Steffi, manuell** |
| Technik-Antworten in die Erkenntnisseite pflegen | Steffi (Notion-Schreib-Gate) |

**Additiv-Anhängen ist parallel sicher** (jeder Track schreibt nur in seinen eigenen Stream). Der **einzige Kollisionspunkt ist das Konsolidieren** — das macht ausschließlich Steffi, manuell und einmalig. Kein Claude merged Streams oder triggert die Konsolidierung, und kein Claude editiert einen fremden Track-Stream. Notion-Schreibregeln gelten (additiv, nie `replace_content`, verify-after-write).

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

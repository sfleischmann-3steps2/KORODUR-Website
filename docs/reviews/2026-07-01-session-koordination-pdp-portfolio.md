# Session-Koordination 2026-07-01 — PDP-Track ⟷ Portfolio-Track

Zwei parallele Claude-Sessions, **gleicher gh-Account (`sfleischmann-3steps2`), gleiches Repo**.
Physische Isolation über getrennte Git-Worktrees. Diese Datei = verbindlicher Tages-Contract.

## Territorien

| Track | Worktree | Branch |
|---|---|---|
| **PDP** (diese Session) | `.claude/worktrees/pdp-wt` | `feature/pdp-followup` |
| **Portfolio** | `.claude/worktrees/portfolio-bereiche-wt` | `feature/portfolio-bereichszuordnung-v1` |

Der Haupt-Baum (`feature/betonsanierung-bereich-320`) mit fremdem untracked WIP bleibt **unangetastet**.

## Feld-Ownership `data/produkte.ts` (Kollisions-Contract — Steffi-Entscheid „Feld-Ownership + parallel")

Beide Tracks editieren dieselbe Datei. Isolation verhindert Live-Stampfen; der Contract verhindert Merge-Konflikte.

| Feld-Gruppe | Owner |
|---|---|
| `bereich`, `zusatzBereiche`, `produktgruppe`, `kategorie` (Taxonomie) | **Portfolio** |
| `technischeDaten`, `beschreibung`, `verarbeitung*`, `besonderheiten`, `einsatzbereiche`, `normen`, `schichtdicke`, `belastbar*`, `basisHartstoff`, `variantenSchwerpunkt`, `sku`, `bild` | **PDP** |

## Datei-Ownership

| Dateien | Owner |
|---|---|
| `data/bereiche.ts`, `app/[lang]/bereiche/*` | **Portfolio** |
| `app/[lang]/produkte/[id]/page.tsx`, `data/produktDokumente.ts`, `data/fachberater.ts`, `app/[lang]/dictionaries/*`, PDP-`components/*`, `lib/produktSzenario.ts` | **PDP** |

## Regeln

1. Nur **chirurgische Feld-Edits** — keine ganzen Produkt-Objekte umschreiben.
2. **Commit + push pro Batch** (kleine Einheiten, nicht ansammeln).
3. Vor jedem `produkte.ts`-Edit: `git fetch origin && git rebase origin/main` (bzw. Merge).
4. **Kein Force-Push.** Bei Merge-Konflikt in `produkte.ts`: **beide Feld-Änderungen erhalten** (nicht blind „theirs/ours").
5. **Board:** jede Session claimt ihre Issues (Status *Ready* + Feld *Bearbeiter*); fremd-geclaimte Issues werden nicht angefasst.

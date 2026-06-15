# Content-Freigabe (Inhaltliche Abnahme neue korodur.de)

**Zweck:** Single Source of Truth, welche Seiten inhaltlich von den Fachkollegen abgenommen sind und welche nicht. Getrennt von der Code-Review (PR-Flow). Eine Zeile = eine logische Seite/Strecke (nicht jede der 878 URL-Varianten).

**Pflege:** Beim Durchgehen Status setzen, Reviewer + Datum eintragen, Feedback als Issue anlegen und die Nummer in die Spalte „Feedback" schreiben. Bei `🟡 Nacharbeit` bleibt die Zeile offen, bis das Feedback-Issue geschlossen ist.

**Status-Legende:**

- `🔴 offen` — noch nicht durchgesehen / nicht abgenommen (Default)
- `🟡 Nacharbeit` — durchgesehen, Feedback vorhanden, noch nicht freigegeben (Issue verlinkt)
- `🟢 abgenommen` — inhaltlich freigegeben, Stand eingefroren bis zur nächsten Änderung
- `⚪ n/a` — keine fachliche Abnahme nötig (Rechtliches o. Ä., separat geprüft)

Stand: 2026-06-15 (Start). Alle Inhaltsseiten initial `🔴 offen`.

---

## Einstiegs- und Funktionsseiten

| Route | Seite | Status | Reviewer | Datum | Feedback |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Startseite | 🔴 offen | | | |
| `/sanierung` | Sanierung-Hub | 🔴 offen | | | |
| `/neubau` | Neubau-Hub | 🔴 offen | | | |
| `/loesungsfinder` | Lösungsfinder | 🔴 offen | | | |
| `/anwendungsmatrix` | Anwendungsmatrix | 🔴 offen | | | |
| `/produkte` | Produkt-Übersicht | 🔴 offen | | | |
| `/referenzen` | Referenz-Übersicht | 🔴 offen | | | |
| `/unternehmen` | Unternehmen | 🔴 offen | | | |
| `/kontakt` | Kontakt + Fachberater-Finder | 🔴 offen | | | |
| `/downloads` | Downloads | 🔴 offen | | | |

## Bereichsseiten (8)

| Route | Seite | Status | Reviewer | Datum | Feedback |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/bereiche/industrieboden` | Industrieboden | 🔴 offen | | | |
| `/bereiche/sichtestrich` | Sichtestrich | 🔴 offen | | | |
| `/bereiche/microtop` | Microtop | 🔴 offen | | | |
| `/bereiche/spezialbaustoffe` | Spezialbaustoffe | 🔴 offen | | | |
| `/bereiche/rapid-set` | Rapid Set | 🔴 offen | | | |
| `/bereiche/schnellbetonsysteme` | Schnellbetonsysteme | 🔴 offen | | | |
| `/bereiche/3d-concrete-printing` | 3D Concrete Printing | 🔴 offen | | | |
| `/bereiche/katzenstreu` | Katzenstreu | 🔴 offen | | | |

## Content-Strecken

> Die Fachartikel werden separat generiert (Steffi-Track). Hier nur der Abnahme-Status.

| Route | Seite | Status | Reviewer | Datum | Feedback |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/ratgeber/einstreuung-vs-schicht` | Einstreuung vs. Schicht | 🔴 offen | Frank Sander | | #172 |
| `/ratgeber/neubau-systemwahl` | Neubau: System wählen | 🔴 offen | | | |
| `/ratgeber/neubau-sichtboden` | Neubau: Sichtboden | 🔴 offen | | | |
| `/ratgeber/neubau-wirtschaftlichkeit` | Neubau: Wirtschaftlichkeit | 🔴 offen | | | |
| `/ratgeber/wirtschaftlichkeit-tco` | Wirtschaftlichkeit/TCO | 🔴 offen | | | |
| `/ratgeber/sperrzeit-belastbarkeit` | Sperrzeit/Belastbarkeit | 🔴 offen | | | |
| `/ratgeber/beratungstrigger` | Beratungstrigger | 🔴 offen | | | |
| `/ratgeber/betreiber-faq` | Betreiber-FAQ | 🔴 offen | | | |
| `/schadensbilder/*` | Schadensbild-Hub + 5 Detailseiten | 🔴 offen | | | |
| `/branchen/*` | Branchenseiten (7) | 🔴 offen | | | |

## Sammelseiten (gruppiert)

| Route | Umfang | Status | Reviewer | Datum | Feedback |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/produkte/[slug]` | 78 Produkt-Detailseiten | 🔴 offen | | | siehe #177, #178 |
| `/referenzen/[slug]` | 58 Referenz-Detailseiten | 🔴 offen | | | |

## Rechtliches (keine fachliche Abnahme)

| Route | Seite | Status |
| :--- | :--- | :--- |
| `/impressum` | Impressum | ⚪ n/a |
| `/datenschutz` | Datenschutz | ⚪ n/a |
| `/agb` | AGB | ⚪ n/a |
| `/hinweisgebersystem` | Hinweisgebersystem | ⚪ n/a |

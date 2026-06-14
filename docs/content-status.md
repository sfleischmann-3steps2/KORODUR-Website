# Content-Status: Fachartikel-Entwuerfe V1

Generiert 2026-06-14. Quelle: Entwurfs-Workflow (14 Artikel, je Entwurf + QA).
Status je Artikel steht im Frontmatter (`status: entwurf | in_review | freigegeben`, `reviewer:`).
Diese Tabelle ist die Uebersicht fuer das Review. `QA-Risiko` = Risiko erfundener Werte laut QA-Agent; `QA` = Nacharbeitsempfehlung des QA-Agenten; `TODO(Frank)` = Anzahl offener Fachfragen im Artikel.

| Artikel | Pfad | Typ | Stufe | Reviewer | Status | QA-Risiko (erfundene Werte) | QA | TODO(Frank) |
|---|---|---|---|---|---|---|---|---|
| schadensbilder-hub | `content/schadensbilder/index.mdx` | schadensbild-hub | V1 | Frank Sander | entwurf | keine | nacharbeit | 6 |
| risse | `content/schadensbilder/risse.mdx` | schadensbild | V1.5 | Frank Sander | entwurf | keine | nacharbeit | 7 |
| abrieb-verschleiss | `content/schadensbilder/abrieb-verschleiss.mdx` | schadensbild | V1.5 | Frank Sander | entwurf | keine | nacharbeit | 5 |
| chemischer-angriff | `content/schadensbilder/chemischer-angriff.mdx` | schadensbild | V1.5 | Frank Sander | entwurf | gering | nacharbeit | 6 |
| feuchte-whg | `content/schadensbilder/feuchte-whg.mdx` | schadensbild | V1.5 | Frank Sander | entwurf | gering | nacharbeit | 8 |
| absandung-festigkeitsverlust | `content/schadensbilder/absandung-festigkeitsverlust.mdx` | schadensbild | V1.5 | Frank Sander | entwurf | keine | nacharbeit | 5 |
| logistik | `content/branchen/logistik.mdx` | branche | V1.5 | Frank Sander | entwurf | keine | nacharbeit | 5 |
| lebensmittel | `content/branchen/lebensmittel.mdx` | branche | V1.5 | Frank Sander | entwurf | keine | nacharbeit | 7 |
| parkdeck | `content/branchen/parkdeck.mdx` | branche | V1.5 | Frank Sander | entwurf | keine | nacharbeit | 3 |
| verkehr-infrastruktur | `content/branchen/verkehr-infrastruktur.mdx` | branche | V1.5 | Frank Sander | entwurf | keine | entwurf | 6 |
| sperrzeit-belastbarkeit | `content/artikel/sperrzeit-belastbarkeit.mdx` | artikel | V1 | Frank Sander | entwurf | behoben (2 Werte korrigiert) | nacharbeit | 5 |
| wirtschaftlichkeit-tco | `content/artikel/wirtschaftlichkeit-tco.mdx` | artikel | V1 | Frank Sander | entwurf | gering | nacharbeit | 4 |
| betreiber-faq | `content/artikel/betreiber-faq.mdx` | artikel | V1 | Frank Sander | entwurf | keine | nacharbeit | 4 |
| beratungstrigger | `content/artikel/beratungstrigger.mdx` | artikel | V1 | Hubert Scheinost | entwurf | gering | nacharbeit | 5 |

## Hinweise
- **sperrzeit-belastbarkeit:** QA meldete erfundene Werte. Korrigiert: NEODUR Level Klassifizierung (CT-C40-F10 war TRUs Wert) und KOROCRETE Voll-belastbar (8 h aus der Anwendungsmatrix -> data-Wert 'wenige Stunden'). Klassifizierungs-/begehbar-Spalten sind als TODO(Frank) zur TDS-Pruefung markiert.
- **Stil-Register:** Die Artikel mischen Wir-Form (KORODUR) mit Sie-Ansprache (Leser). Das ist fuer kundenseitige Web-Copy ueblich, weicht aber von der strikten Wir-Form-Regel ab. Bewusst von den Reviewern bestaetigen lassen.
- Alle Texte sind **Entwuerfe**. Fachliche Freigabe je Artikel durch den genannten Reviewer (ueberwiegend Frank Sander; Beratungstrigger: Hubert Scheinost).
- Kennwerte stammen aus den Repo-Daten (`data/produkte.ts`, `data/referenzen.ts`, `data/anwendungsmatrix.ts`). Nicht belegbare Werte sind als `TODO(Frank)` markiert, nicht geraten.
- **Schadensbild-Taxonomie:** Die 5 Schadensbilder sind aus dem Belastungs-Tag-Standard abgeleitet. Risse und Absandung sind keine eigenen Belastungs-Tags. Finale 5er-Liste + Mapping mit Frank fixieren (im Hub als TODO markiert).
- **Offener Cleanup vor Freigabe:** finale Routen der CTAs (`/loesungsfinder`, `/kontakt`) und der Detailartikel-Links scharfschalten; Schlusskorrektur Umlaute/Rechtschreibung je Artikel.

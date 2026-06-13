# Website-Walkthrough — Feedback & Maßnahmen (Steffi, 2026-06-13)

Lebendes Capture-Doc. Steffi geht die Seite Seite-für-Seite durch; jeder Punkt wird hier festgehalten und anschließend zu GitHub-Issues. **Status: Batch 1 aufgenommen — weitere Seiten folgen.**

Legende: 🗣 = Steffi-Feedback · 💡 = proaktiver Vorschlag (Claude) · ⛔ = Blocker/Abhängigkeit

---

## 1. Homepage

- 🗣 **Startbereich (Hero): bleibt** — gefällt sehr gut.
- 🗣 **Einstieg 8 Bereiche: bleibt** — perfekt.
- 🗣 **Referenz-Teaser gemischt (Neubau + Sanierung):** Startseite soll eine schöne Mischung zeigen, **6 Stück** (statt aktuell 3).
  - 🗣 **Tag-Format:** „Projektart · Bereich" — z. B. *Sanierung · Trinkwasser*, *Neubau · Industrieböden · Feinschliff*. Tag-Logik muss noch final abgestimmt werden.
  - 💡 **Kuratierte Startauswahl statt Zufall:** 6 handverlesene Refs (z. B. 3 Neubau / 3 Sanierung, über Bereiche gestreut), damit die Mischung immer stark & ausgewogen wirkt — analog zum bestehenden „kuratiert"-Muster. Liste pflegbar in `data/`.
  - 💡 **Max. 2 Chips pro Karte** (Projektart + 1 Bereich), sonst Unruhe. Feinschliff/Detail eher in die Subline.
- 🗣 **Finder-CTA straffen:** Text auf **„In vier Schritten zur passenden Lösung"** kürzen (nicht „in wenigen Schritten"), farblich kräftiger, klarer Button → ganzer Lösungsfinder.
  - 💡 4 Schritte als Mini-Nummern/Icons visualisieren (1·2·3·4) — signalisiert Kürze, senkt Drop-off.
- 🗣 **Berater-Kontakt-Hinweis:** passt, führt auf die Kontaktseite.

## 2. Kontaktseite (Fachberater-Finder)

- 🗣 **Fachberater nach oben, Kontaktformular nach unten.**
- 🗣 **Berater sind organisiert nach (a) Bereich + (b) PLZ-Region.** Nutzer soll schnell den richtigen finden → **2 Filter (Bereich · Region)**.
- 🗣 **Fachbereiche der Berater:** Industrieböden · Rapid Set · Trinkwasser & MICROTOP.
- 🗣 **„Verbundene Websites" entfernen** (Domains klärt Steffi mit IT).
- 💡 **PLZ-Eingabefeld** zusätzlich zum Region-Dropdown („Ihre PLZ eingeben" → springt auf passende Berater). Schneller als Dropdown-Scrollen.
- 💡 **Datenmodell `data/fachberater.ts`:** `{ name, foto, bereiche[], plzBereiche[], tel, email, land: DE|International }`. Seed = 9 Berater aus dem Screenshot (Döring, Lorenz, Mohr, Sackmann, Grahn, Schumacher, Lang, May, Palese).
- 💡 **Mit den 6 LP-Fachberatern (Funnel-Enden, Commit 880c694) abgleichen** — Dubletten/Widersprüche vermeiden, eine Quelle.
- 💡 **Bereichs-Mapping klären:** Sichtestrich & Spezialbaustoffe haben (noch) keinen eigenen Berater → Fallback auf Industrieboden-Berater oder zentralen Kontakt definieren.
- 💡 **Deep-Link `?bereich=`** von Produkt-/Bereichsseiten („Beratung anfragen") → Kontakt mit vorbelegtem Bereichsfilter (analog Referenz-Filter).

## 3. Produkte-Seite

- 🗣 **Überschrift „Unser Produktportfolio", Subline weg** (nicht mehr nur Sanierung).
- 🗣 **Bereichs-Anker oben bleiben** (Industrieböden, Sichtestrich, Rapid Set …).
- 🗣 **Industrieböden (37 Produkte) gruppieren** — aktuell alles vermischt (Haftbrücke + Oberflächenbehandlung + Produkt durcheinander).
  - 🗣 **Modell:** Industrieboden-**Produkte** führen; **Haftbrücke** hängt am Produkt (jedes Produkt hat eine empfohlene Haftbrücke); **Oberflächenfinish** ist eine eigene **Produktart** mit mehreren Optionen. Auf Haftbrücken & Oberflächenfinish verweisen, nicht vermischen.
  - 🗣 Sichtestrich, Rapid Set, MICROTOP, Hartstoff: **keine** solche Unterteilung nötig.
  - 🗣 **Spezialbaustoffe gruppieren:** Pflasterfugenmörtel, Spritzbeton, Vergussmörtel …
  - 💡 **Datenmodell erweitern:** `produktart`/`rolle` innerhalb Industrieboden (`bodenprodukt | haftbruecke | oberflaechenfinish`). Detailseite zeigt „Empfohlene Haftbrücke: X" + „Oberflächenfinish: Y/Z"; Liste gruppiert (Bodenprodukte zuerst, Haftbrücken + Finish als eigene Sektion). Baut auf bestehendem `produktgruppe`/`varianten`-Modell auf.
- 🗣 **Inhaltliche Zuordnung (welche Produkte rein/raus/richtig)** klärt Steffi mit Kollegen.
- 🗣 **Braucht von uns:** Produktliste + **welche TDS noch fehlen**.
  - 💡 **Sofort lieferbar:** Liste + fehlende-TDS-Checkliste aus `data/produkte.ts` generierbar (tdsUrl vorhanden ja/nein) → als Abstimmungsvorlage für die Kollegen. Auf Abruf.

## 4. Referenzen-Seite

- 🗣 **Gefällt sehr gut.**
- 🗣 **Neubau-Referenzen importieren**, soweit verfügbar. **Bilder ggf. nachliefern.** Sanierungs-Ref-Bilder sind gesichert (von der Webseite / aus XML).
- 🗣 Industrieboden-Unterprodukte sind bereits als **Orientierungsanker** (Sprungmarken, kein Filter) vorhanden — passt.
- ⛔ Neubau-Import hängt an Notion-Export + Tagging + Freigabe (Steffis Track).
- 💡 **Drop-in-Struktur vorbauen:** Import mit `projekttyp: "neubau"` + Platzhalter-Bildern, damit echte Daten nur noch eingespielt werden.
- 💡 **Karte zeigt Bereich-Chip zusätzlich zur Projektart** (für das „Projektart · Bereich"-Tagging der Startseite konsistent).

## 5. Bereiche → Industrieboden (und analog andere Doppelnutzungs-Bereiche)

- 🗣 **Fehlt: Neubau/Sanierung-Framing.** Home → Industrieboden landet auf der Übersicht ohne ein Wort zu Neubau/Sanierung. Muss unbedingt rein.
  - 💡 Das ist die **Eingangsweiche-auf-Bereich** aus der IA: duale Intro (Neubau- vs. Sanierungs-Anwendungen) + Routing in den richtigen Funnel / vorbelegten Referenz-Filter. Gleiches Muster für weitere Doppelnutzungs-Bereiche.

---

## Offene Abstimmungen (aus Batch 1)

- Tag-Logik Referenzen (Projektart · Bereich) final definieren.
- Berater ↔ Bereiche-Mapping (Sichtestrich/Spezialbaustoffe ohne Berater).
- Industrieboden-Produktart-Modell (Haftbrücke/Oberflächenfinish) — Datenstruktur.
- Spezialbaustoffe-Untergruppen final.
- Produktliste + fehlende TDS (von Kollegen zu prüfen).

---

# Batch 2 (2026-06-13) — Nav-Umbau, Bereichsseiten, Cross-Selling, Funnel-UX

## 6. Navigations-Restrukturierung (strukturell, groß)

- 🗣 **„Produkte" raus aus der Top-Nav → in den Footer** (dort ruhig sehr präsent). Der flache Gesamtkatalog bleibt als Aufbau super, gehört aber nicht nach oben.
- 🗣 **Stattdessen „Bereiche" in die Top-Nav** = Schnelleinstieg. Über einen Bereich erreicht man dessen Produkte, Referenzen und Sub-Bereiche.
- 🗣 **Hover-Mega-Menüs** über den Nav-Punkten:
  - **Bereiche** → Sub-Bereiche (Industrieboden, Sichtestrich, Microtop, Rapid Set, Spezialbaustoffe …).
  - **Neubau** → Industrieboden · Sichtestrich · Spezialbaustoffe.
  - **Sanierung** → Industrieboden · Infrastruktur · Trinkwasser & Spezial (3 Schwerpunkte).
  - **Referenzen** → Filter-Shortcuts (welche genau noch zu einigen → **Step 1 auch ohne Hover ok**).
  - **Kontakt** → Fachberater · Kontaktformular.
- 🗣 **Resultierende Top-Nav:** Bereiche · Neubau · Sanierung · Referenzen · Unternehmen · Kontakt. (Produkte = Footer.)
- 💡 **Mentales Modell:** „Bereiche" = Produktdomäne-Linse, „Neubau/Sanierung" = Projekttyp-Linse — zwei Einstiege auf denselben Content, unterschiedlich gefiltert. Bewusst redundant, das ist beim Relaunch ok. ❓Bitte bestätigen, dass beide Linsen parallel oben stehen sollen.

## 7. Bereich als zentrale Einstiegslogik + Projekttyp-Klassifizierung

- 🗣 Nutzer geht über **Bereiche** in den relevanten Bereich. Bereiche tragen eine Projekttyp-Natur:
  - **Neubau + Sanierung** (Doppelnutzung): z. B. **Industrieboden**.
  - **reine Sanierung:** z. B. **Microtop** (auch Rapid Set, Infrastruktur, Trinkwasser).
  - **reiner Neubau:** z. B. **Sichtestrich**.
  - Spezialbaustoffe: primär Neubau, einzelne Gruppen ggf. beides → ❓final klären.
- 🗣 **Im Bereich Neubau nur Neubau-Produkte, im Bereich Sanierung nur Sanierungs-Produkte.** Wer **alles** sehen will → Footer → Produkte (Gesamtkatalog).
- 🗣 **Referenzen** tragen die volle Filterung (Neubau · Bereich …); beim Sprung aus einem Bereich **vorgefiltert** (Deep-Link).

## 8. Cross-Selling (kontextuell)

- 🗣 Im **Neubau**-Bereich → Cross-Sell auf Sanierungs-Alternativen („Entdecken Sie unsere Sanierungsprodukte").
- 🗣 Im **Industrieboden** → Cross-Sell auf **Rapid Set** (Reparaturmörtel, schnelle Instandsetzung).
- 💡 Wiederverwendbarer „Cross-Sell"-Block je Bereich, datengetrieben (Quell-Bereich → empfohlener Ziel-Bereich + Botschaft).

## 9. Neubau-Bereichsseite ausbauen (Kerngeschäft!)

- 🗣 Strategisch wichtig: **Neubau = Kerngeschäft → Seite muss besser ausgearbeitet sein** als heute.
- 🗣 **Unter den 3 Bereichskarten Referenz-Sektionen einblenden:** (1) Referenzen Industrieboden, (2) Referenzen Spezialbaustoffe, (3) Referenzen Sichtestrich.
- 🗣 **Wiederkehrende Kontakt-CTAs** über die Seite verteilt (→ Kontaktseite, wo Beratung Sinn macht).
- 🗣 **CTA zum Lösungsfinder anteasern:** Von `/neubau` direkt in den **Neubau-Funnel** (Weiche überspringen). Aktueller Button „Starten" ist blind — beschreibender, teasernder CTA nötig (sagt, wohin es geht).

## 10. Sanierungs-Bereichsseite analog

- 🗣 **Gleicher Aufbau wie Neubau:** 3 Bereiche zum Einspringen + Referenz-Sektionen + wiederkehrende Kontakt-CTAs.

## 11. Lösungsfinder-UX (Desktop) — Scroll/Layout-Fixes

- 🗣 **Bild-Sprung beim Wechsel Sanierung ↔ Neubau** (Layout-Shift) → stabilisieren.
- 🗣 **Desktop: man muss scrollen, um den Weiter/OK-Button zu erreichen** — Option-Inhalt drückt ihn unter den Fold. Durchgängiges Problem. **Ziel: idealerweise kein Scrollen, Button immer sichtbar.** (Steffi liefert Screenshot.)
- 💡 Sticky-Footer existiert schon (V3.0) — prüfen, warum er auf Desktop nicht greift (Höhen/Spacing/Viewport). Platztechnik der Option-Cards überarbeiten.

## 12. Ikonografie & Bildsystem (durchgängig)

- 🗣 **Jeder Bereich braucht ein festes Icon**, das konsistent durch die ganze Seite gezogen wird.
- 🗣 **Plus ein wiederkehrendes Bild je Bereich.** Bild-Konsistenz pro **(Bereich × Projektart):** Industrieboden-Neubau = immer derselbe Platzhalter, Industrieboden-Sanierung = immer derselbe Platzhalter.
- 🗣 **Jetzt nur Platzhalter.** Am Ende kuratierte **Bild-Bedarfsliste** → selbst generieren oder einholen.
- 🗣 **Bild-Generierung per MCP** (Higgsfield o. ä.) später anbindbar.
- 💡 Namens-/Slot-Konvention `public/images/bereiche/<bereich>-<projektart>.jpg`; Icon-Mapping zentral (`data/bereichIcons.ts`), einmal definiert, überall genutzt.

## 13. Datenanreicherung & Zulieferungen

- 🗣 **Fehlende Referenz-Datenanreicherung** kann per **Subagents** nachgeholt werden (automatisierbares).
- 🗣 **Alles, was extern geliefert werden muss** (Bilder, TDS, Daten, Freigaben) → als **To-Do auf die Notion-Seite „To-dos Steffi — Zulieferungen Website-Integration"** (`37d670e1-9e1a-81ea-8eb2-e731525c3fd1`). Das ist der zentrale Zulieferungs-Sammelpunkt.

---

## Konsolidierte offene Abstimmungen (Batch 1 + 2)

1. Tag-Logik Referenzen (Projektart · Bereich).
2. Nav-Komposition: Bereiche + Neubau + Sanierung parallel oben? (bestätigen)
3. Projekttyp-Klassifizierung je Bereich (v. a. Spezialbaustoffe).
4. Berater ↔ Bereiche-Mapping (Sichtestrich/Spezialbaustoffe ohne Berater).
5. Industrieboden-Produktart-Modell (Haftbrücke/Oberflächenfinish).
6. Spezialbaustoffe-Untergruppen.
7. Referenzen-Hover: welche Filter-Shortcuts (oder Step 1 ohne).
8. Produktliste + fehlende TDS (Kollegen).

## Weitere Seiten — noch ausstehend im Walkthrough
(Batch 3+: Unternehmen, Anwendungsmatrix, Footer-Detail, Sprachversionen, mobile …)

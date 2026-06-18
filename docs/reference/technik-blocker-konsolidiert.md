# Konsolidierte Blocker-Liste — Technik-Abhängigkeiten der Website

Stand 2026-06-18. Ziel: entwicklungsseitig keine offenen Blocker. Jede offene Frage ist hier triagiert, damit klar ist, was **wirklich nur unsere Technik** beantworten kann, was wir **extern wegrecherchiert** haben, und was **gar kein Technik-Blocker** ist (Team-/Marketing-Entscheid). Quellen der Sammlung: GitHub-Issues, `docs/reviews` + `docs/specs`, Notion-Frageseite „Fragen zu Website".

---

## Teil A — Nur die Technik kann es beantworten (echte KORODUR-Interna)

Das ist die **irreduzible Liste**. Hier geht es um Sortiments-/Strategieentscheidungen, interne Klassifizierungen, was in Referenzen wirklich verbaut war, und firmenspezifische TDS-Werte. Extern nicht recherchierbar.

### A1 — Produkt-/Sortimentsentscheidungen (Strategie)
- **T1 — KOROPOX-Ersatz:** Welches Produkt empfehlen wir künftig für Öl-/Treibstoffbeständigkeit auf intakten Zementböden (oder ersatzlos)?
- **CONCRETE MIX behalten oder raus?** Durch DOT Europe CONCRETE MIX vollständig ersetzen (Vertriebsentscheidung)?
- **Ranking „planbar":** Soll der Standard-Industrieestrich (HE 65) vor dem schnellen (HE 60 rapid) ranken?
- **Asphalt Repair Mix:** Teil der App (eigene Step-1-Option) oder bewusst out-of-scope?

### A2 — Produkt-Klassifizierung (interne Zuordnung)
- **DIN-1100-Hartstoffe — konkrete Produktzuordnung (T2):** Welche Hartstoffe auf Hartstoffestrich (VS 0/5, WH-Spezial, Diamantbeton) vs. Einstreuung (0/4, WH-metallisch)? *(Norm-Grundlage siehe Teil C.)*
- **Produkt-Klassifizierung-Sign-off (8 Fragen,** `docs/specs/2026-06-14-produkt-klassifizierung-sot.md`**):** KOROMINERAL-CURE-Doppelrolle, Finish vs. Nachbehandlung, Haftbrücken-Zuordnung (GRANIDUR/KCF/TRU/FSCem), Hartstoff-Rolle, `betoninstandsetzung`→`spritzmoertel`, Varianten-Switch.
- **Cluster-Mapping (5 Klärfälle,** `docs/specs/2026-06-17-klassifizierungs-cluster-mapping.md`**):** Werteklasse für Spritzmörtel/Spritzbeton/TW-Mörtel/PFM/Schnellbeton/Additive; TRU als Hartstoffbasis; 3 Produkte ohne Produktart (DM DRAINMÖRTEL, SM SVS 5 1,5/3); Default-Portfoliobereich Reparaturmörtel.
- **Varianten-Inventar (6 Fragen,** `docs/specs/2026-06-17-varianten-inventar-vorschlag.md`**):** kanonische Variantenliste, Familie vs. getrennte Produkte je Cluster, Farbvarianten, TDS je Variante, SKU-Quelle, Alt-Slugs.
- **Projektart-Klärfälle (#240, auf Notion-Frageseite):** 3 Konflikte (MORTAR MIX, GRANIDUR, PFM 1K), DUROP-Bestätigung, 20 referenzlose Leere klassifizieren.

### A3 — Referenz-Fakten (was wirklich passiert/verbaut ist)
- **#258 — Referenz → eingesetzte Produkte:** belastbare Liste, welche Produkte je Referenz tatsächlich verbaut wurden.
- **#198 — 51 Referenzen ohne Text:** welche dürfen mit generischen Vorlagen/anonymisiert veröffentlicht werden, plus Writeups. Liste: `docs/reference/referenzen-ohne-text-198.md`.
- **#205 — Dublette?** Produktionshalle Guben vs. „Sanierung einer Sanierung" dasselbe Projekt?
- **WHG-Split bestätigen:** LKW Waschstraße, TEXACO Tankfläche Arnheim, Hafen Catania als Umwelt-/WHG-Fläche korrekt?
- **Helipad/Hubschrauber-Landeplatz:** Infrastruktur (so gesetzt) oder Sondereinsatz?

### A4 — Firmenspezifische TDS-Werte (aus KORODUR-Datenblättern)
- **HE 65 / HE 40 belastbarNach:** 7 d vs. 24 h klären.
- **easyFinish / nanoFinish:** Dichte-Einheiten im offiziellen TDS fehlerhaft (1,0 kg/m³, 1,035 cm³) — **TDS-Korrektur** durch die Technik.
- **Hygiene/WHG-Tags je KORODUR-Produkt:** NEODUR-HE-Estriche + KOROCRETE nassraumtauglich? KOROCRETE Tausalz oder nur Frost? *(Material-Tags, die an unseren TDS hängen.)*

### A5 — Fachartikel-Freigabe (Content-Fakten)
- **Faktencheck-Restmenge** (`docs/reviews/2026-06-15-fachartikel-faktencheck.md`): die **produktspezifischen** 🔴/🟡-Befunde (z. B. „voll belastbar nach 24 h" bei konkreten Sichtestrichen) nach Abzug der Norm-Fakten aus Teil B. Frank bestätigt.
- **14 Fachartikel-Entwürfe** (`docs/content-status.md`): fachliche Freigabe Schadensbilder/Branchen/Artikel durch Technik.

---

## Teil B — Extern wegrecherchiert (öffentliche Normen, kein Technik-Blocker mehr)

Alle 7 Fragen via Dynamic Workflow recherchiert und adversarial gegengeprüft (7/7 korrekt, Sicherheit hoch). Damit entfallen sie als Technik-Blocker.

**1. Böhme-Verschleißklassen, welche ist die höchste?**
Die Zahl ist der maximale Volumenverlust in cm³/50 cm² (A22 ≤22 … A1,5 ≤1,5). Kleinere Zahl bedeutet weniger Abrieb, also ist **A1,5 die höchste (beste)** und A22 die niedrigste Verschleißfestigkeit. Prüfung DIN EN 13892-3, Klassifizierung DIN EN 13813.
Löst: Faktencheck 🔴 „A6 als höchste" (falsch, A6 liegt im Mittelfeld).

**2. DIN 1100, Hartstoffgruppen und Estrich vs. Einstreuung**
Drei Gruppen nach Material: **A** (Naturstein/dichte Schlacke), **KS** (Korund/Siliciumcarbid), **M** (Metall). Der Unterschied Estrich vs. Einstreuung liegt in der Bauweise (DIN 18560): **Hartstoffestrich** (DIN 18560-7) ist eine eigene kraftschlüssige Nutzschicht (10-20 mm, ca. 30-40 kg/m²), die **Trockeneinstreuung/dry-shake** (DIN 18560-3/-4) nur eine wenige Millimeter starke Oberflächenvergütung (ca. 5 kg/m²). DIN 1100 liefert die Hartstoffe für beide.
Löst: die Norm-Grundlage von T2 (die konkrete Produktzuordnung bleibt A2).

**3. EN 206, gibt es „C44/55"?**
**Nein.** Die Reihe verläuft über C40/50, C45/55 ohne Zwischenklasse. C44/55 ist ein Tippfehler, gemeint ist C45/55. Cxx/yy = charakteristische Zylinder-/Würfeldruckfestigkeit in N/mm² nach 28 Tagen.
Löst: Excel-SoT-Diskrepanz „C44/55".

**4. DIN EN 13813 Estrich-Code (z. B. CT-C60-F8-A6)**
Präfix = Bindemittel (CT Zement, CA Calciumsulfat, MA Magnesia, AS Gussasphalt, SR Kunstharz). **C** = Druckfestigkeit N/mm², **F** = Biegezug N/mm², **A** = Böhme-Abrieb cm³/50 cm². Prüfung Druck/Biegezug nach DIN EN 13892-2, Abrieb nach DIN EN 13892-3.
Löst: Content-Referenzfakt (Estrich-Klassifizierungscode).

**5. WHG-Beton, gibt es „10 mm = dicht"?**
**Keine Pauschalregel.** DAfStb-Richtlinie BUmwS: Dichtheit über Medien-Eindringtiefe e72m (72 h n-Hexan/Dichlormethan), daraus etk = 1,35·etm und erforderliche Dicke h ≥ 1,50·etk. Bei gerissenen Bauteilen konstruktive Untergrenzen (Druckzone ≥ 30 mm bzw. ≥ 2·Dmax).
Löst: Faktencheck 🔴 („10-mm-WHG-Dichtheitspauschale" erfunden).

**6. DVGW W 270 / W 300-Reihe / W 347**
**W 270** = Prüfung mikrobielle Vermehrung auf Werkstoffen; **W 347** = hygienische Anforderungen zementgebundener Werkstoffe (Stoffabgabe); **W 300-Reihe** = Trinkwasserbehälter (Planung/Bau/Betrieb/Instandsetzung/Werkstoffe). Eine zementgebundene TW-Beschichtung muss W 347 (plus W 270 bei organischen Anteilen) erfüllen und nach W 300-4/-5 ausgeführt werden.
Löst: Content (MICROTOP-TW Trinkwasser-Fakten).

**7. RStO 12 Belastungsklassen und TL BEB-StB**
RStO 12 (FGSV 499) definiert sieben Belastungsklassen **Bk100, Bk32, Bk10, Bk3.2, Bk1.8, Bk1.0, Bk0.3** (nach 10-t-Achsübergängen, löst die alten Bauklassen SV/I-VI ab). **TL BEB-StB** (FGSV 895) ist ein reines Lieferbedingungs-Regelwerk für Erhaltungsbaustoffe und definiert **keine** Verkehrsklassen.
Löst: Content (Infrastruktur-/Verkehrsflächen-Fakten).

---

## Teil C — Hybrid (Research liefert die Basis, Technik bestätigt nur kurz)

- **C44/55 (Excel-SoT):** EN 206 kennt diese Klasse nicht (siehe Teil B) — also Tippfehler, App nutzt C45/55. Technik bestätigt nur, dass C45/55 gemeint war.
- **T2 DIN-1100 Kriterien:** Die Norm-Definition Hartstoffgruppen/Estrich-vs-Einstreuung (Teil B) liefert die Logik; die Technik bestätigt nur die konkrete Produkt-Zuordnung (→ A2).
- **Rapid-Set-/DOT-Europe-Produkteigenschaften** (CEMENT ALL Verschleiß, MORTAR MIX WHG/Hygiene, DOT Europe Chemiebeständigkeit): das sind CTS-Cement-Produkte mit **öffentlichen TDS** — per optionalem Research-Folgelauf belegbar; Technik bestätigt nur.
- **Faktencheck-Norm-Teilmenge:** Böhme-Verschleißklassen-Richtung, WHG-Dichtheit, EN-13813-Code (Teil B) fixieren die betroffenen 🔴-Artikel ohne Technik.

---

## Teil D — Kein Technik-Blocker (Team-/Dev-/Marketing-Entscheid)

Diese standen mit auf der Frageliste, brauchen aber **nicht** die Technik. Damit raus aus den Entwicklungs-Blockern.

- **Lösungsfinder-UX (V2.5):** Innen/Außen-Platzierung, Sondernormen drin/raus, Sub-Step „Lage", Mehrfachauswahl Step 2, Varianten-Anzeige, System-Begleitprodukte-Darstellung — **Produkt-/UX-Entscheide** (Team/Steffi).
- **Referenzen mit beiden Sanierungsarten:** Datenmodell-Entscheid (Single- vs. Multi-Select) — Team.
- **W1 Bereichs-Beispieltexte / W4 Anwendungsbereich-Kuratierung:** Marketing-Kuratierung (Steffi).
- **W5 Bildqualität/Bildsatz:** Asset-Logistik (Steffi) — Mapping „welches Bild wohin".

---

## Bilanz

Nach Triage bleibt als **echter Technik-Blocker** im Wesentlichen Teil A (Sortiment, interne Klassifizierung, Referenz-/TDS-Fakten, Content-Freigabe). Teil B ist extern beantwortet, Teil C nur noch eine kurze Bestätigung, Teil D gar kein Technik-Thema. Entwicklungsseitig arbeiten wir an allem Strukturellen mit markierten Platzhaltern weiter.

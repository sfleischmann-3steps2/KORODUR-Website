**KORODUR**

*Qualität für Generationen. Seit 1936\.*

**UI/UX-Analyse & Optimierung**

KORODUR Website-Relaunch – Bewertung des Entwicklungsstands (Sanierungs-App) und Handlungsempfehlungen

*Erstellt: 13.06.2026  ·  Verantwortlich: S. Fleischmann  ·  Variante: intern  ·  Stand der bewerteten Entwicklungsversion*

**1\. Management Summary**

Die neue Entwicklungsversion ist inhaltlich und funktional ein deutlicher Sprung gegenüber der bestehenden Website www.korodur.de. Besonders die Sanierungs-Strecke – Lösungsfinder, Produkt-Detailseiten mit technischen Daten und Normen sowie Referenzen mit klarer Story – ist modern, B2B-tauglich und auf konkrete Planer- und Verarbeiter-Bedürfnisse ausgerichtet. Das ist die größte Stärke und ein klarer Wettbewerbsvorteil.

Der wichtigste Schwachpunkt ist nicht das Design einzelner Seiten, sondern die fehlende Geschlossenheit: Die Seite besteht faktisch aus zwei unterschiedlichen „Welten“ – einer breiten Corporate-Hülle (Startseite, Unternehmen) und einer fokussierten Sanierungs-App (Lösungsfinder, Produkte, Matrix, Referenzen). Sie unterscheiden sich in Logo, Navigation und Footer, was Nutzer beim Wechsel desorientiert und die Marke uneinheitlich wirken lässt.

**Die drei wichtigsten Hebel:**

* **Eine Seite, ein System:** Header, Logo, Navigation und Footer über alle Seiten vereinheitlichen.  
* **Konsistenz vor Features:** Doppelte Matrix, widersprüchliche Schrittzahlen und gemischte interne/externe Links bereinigen – das sind schnelle, vertrauensbildende Quick Wins.  
* **Kernbusiness sichtbar halten:** Die starke Sanierungs-Strecke als Blaupause nutzen, um Neubau/Industrieboden gleichwertig abzubilden – sonst verengt sich die Wahrnehmung der Marke auf „Sanierung“.

**2\. Analysegrundlage & Methodik**

Bewertet wurde die öffentliche Entwicklungsversion unter sfleischmann-3steps2.github.io/KORODUR-Sanierung\_app/de/ im Abgleich mit der bestehenden Website www.korodur.de. Analysiert wurden Startseite, Sanierung, Lösungsfinder, Produkte (inkl. Detailseite NEODUR HE 60 rapid), Anwendungsmatrix, Produktmatrix, Referenzen und Unternehmen.

*Hinweis zur Reichweite: Die Bewertung basiert auf Struktur, Inhalt, Informationsarchitektur und den hinterlegten CD-Werten (u. a. Navy \#002D59). Eine pixelgenaue visuelle Bewertung (Typografie-Größen, Abstände, Responsiveness, Hover-/Interaktionszustände) war ohne live gerenderte Seite nur eingeschränkt möglich. Für eine detaillierte Visual-Kritik empfiehlt sich ein gemeinsamer Live-Walkthrough oder eine Freigabe für das Rendern der Seite.*

**3\. Priorisierte Befundübersicht**

Schweregrad: HOCH \= beeinträchtigt Orientierung/Vertrauen spürbar · MITTEL \= Inkonsistenz/Reibung · STRAT \= strategische Weichenstellung.

| \# | Befund | Bereich | Schwere |
| :---- | :---- | :---- | :---- |
| 1 | Zwei unterschiedliche Seiten-Hüllen (Logo, Navigation, Footer) zwischen Corporate- und Tool-Seiten | IA/Visual | HOCH |
| 2 | Zwei konkurrierende Matrizen: „Anwendungsmatrix“ vs. „Produktmatrix“ mit gleichem Zweck | IA/Content | HOCH |
| 3 | Widersprüchliche Schrittzahl des Lösungsfinders (4 vs. 5 Schritte) | Conversion | HOCH |
| 4 | Kontakt-/CTA-Ziele führen teils intern, teils zurück auf alte korodur.de (Bruch im Flow) | Conversion/IA | HOCH |
| 5 | Referenzen-Seite ohne JavaScript faktisch leer (nur Kopf/Fuß) | Technik/SEO | HOCH |
| 6 | Produktkarten uneinheitlich – teils mit, teils ohne Produktbild | Visual | MITTEL |
| 7 | Datenblatt-/Download-Links uneinheitlich (verschiedene Quellen, evtl. tote Pfade) | Content | MITTEL |
| 8 | Suchfunktion (⌘K) nur auf Corporate-Seiten, fehlt im Tool-Bereich | IA | MITTEL |
| 9 | Kernbusiness Neubau/Industrieboden gegenüber Sanierung stark unterrepräsentiert | Positionierung | STRAT |
| 10 | Voll-Ersatz-Anspruch der Startseite vs. rein sanierungsfokussierte Tiefe | Positionierung | STRAT |

**4\. Informationsarchitektur & Navigation**

**4.1 Zwei Seiten-Systeme in einem Projekt**

Startseite, Sanierung und Unternehmen nutzen das Bild-Logo, eine 6-teilige Navigation (Produkte · Sanierung · Anwendungsmatrix · Referenzen · Unternehmen · Kontakt), Telefonnummer, Sprachwahl und einen vollständigen Footer. Produkte, Produktmatrix, Anwendungsmatrix, Lösungsfinder und Referenzen nutzen dagegen eine Text-Wortmarke „K KORODUR Sanierung“, eine abweichende 5-teilige Navigation (Start · Lösungsfinder · Referenzen · Produktmatrix/Anwendungsmatrix · Produkte) und einen reduzierten Footer. Für Nutzer fühlt sich der Wechsel an wie der Sprung auf eine andere Website.

**Empfehlung:**

* Eine einzige, konsistente globale Navigation, ein Logo und ein Footer über alle Seiten.  
* Die Tool-Seiten als Unterbereich klar in die Hauptnavigation einhängen, statt als parallele IA zu führen.

**4.2 Doppelte Matrix**

Es existieren zwei Matrix-Seiten: „Anwendungsmatrix“ (/anwendungsmatrix/, geordnet nach Einsatzfall mit ✓✓/✓-Bewertung) und „Produktmatrix“ (/produktmatrix/, geordnet nach Eigenschaften, deren Eignungszellen in der ausgelieferten Fassung leer wirken). Je nach Seite wird mal die eine, mal die andere verlinkt. Das ist redundant und verwirrend; zudem sollte geprüft werden, ob die Produktmatrix-Zellen tatsächlich befüllt rendern.

Empfehlung: Auf eine Matrix konsolidieren (die anwendungsfallbasierte ist die stärkere) oder beide klar mit unterschiedlichem, benanntem Zweck trennen und konsistent verlinken.

**4.3 Verstreute Kontaktziele**

Kontakt-/Berater-CTAs zeigen uneinheitlich mal auf interne Ziele (/de/kontakt/), mal zurück auf die alte Seite (www.korodur.de/kontakt/deutschland/, /kontakt/, /kontakt.html). Das bricht den Conversion-Flow aus der neuen Seite heraus und untergräbt das Ziel, korodur.de zu ersetzen; /kontakt.html ist zudem ein verdächtiges Altmuster.

**5\. Visuelles Design & UI**

Positiv: Die Navy-CD (\#002D59) ist als Theme-Farbe konsistent gesetzt, Detailseiten nutzen Breadcrumbs, Karten-Layouts und eine klare Gliederung (Technische Daten, Normen, Verarbeitung). Die Grundanmutung ist aufgeräumt und B2B-seriös.

**Verbesserungspunkte:**

* **Zwei Logo-/Header-Stile:** Bild-Logo vs. Text-Wortmarke – Marke wirkt uneinheitlich (siehe 4.1).  
* **Inkonsistente Produktkarten:** Mehrere Produkte (u. a. NEODUR HE 65 Plus, KOROCRETE, TRU Self-Leveling, Rapid Set MORTAR MIX DUR, KORODUR PC, KOROCURE) haben kein Produktbild – die Kachelreihen wirken dadurch löchrig.  
* **Visuelle Hierarchie der CTAs:** Mehrere gleichwertige Buttons (z. B. „Lösungsfinder starten“ \+ „Produkte entdecken“) konkurrieren – primärer Pfad sollte klar dominieren (primär/sekundär).  
* **Matrix-Lesbarkeit:** Sicherstellen, dass Eignungs-Symbole (✓✓/✓ bzw. Icons) konsistent und farblich abgesetzt rendern; leere Zellen wirken wie ein Fehler.

*Für belastbare Aussagen zu Schriftgrößen, Zeilenlängen, Weißraum, mobiler Darstellung und Interaktionszuständen ist ein Live-Visual-Review nötig (siehe Methodik).*

**6\. Conversion & Content**

**6.1 Stärken**

* **Lösungsfinder:** Geführtes Tool mit guter Schritt-Logik (Fläche → Belastung → Zustand → …) und hilfreichen Erklärtexten – ein starker Conversion-Hebel.  
* **Produkt-Detailseiten:** Klassifizierung, technische Kennwerte, Normen, Verarbeitung und „Dieses Produkt im Einsatz“ (Referenzbezug) bedienen Planer/Verarbeiter sehr gut.  
* **Referenzen als Story:** Ausgangslage / Lösung / Ergebnis mit Fläche und eingesetzten Produkten – genau das richtige Format für B2B-Vertrauen.

**6.2 Schwächen**

* **Widersprüchliche Schrittzahl:** Der Lösungsfinder zeigt „Schritt 1 von 4“, Startseite und Produktmatrix sprechen von „5 Schritten“. Das wirkt unfertig und schwächt Vertrauen genau im Conversion-Tool.  
* **Flow verlässt die Seite:** Zentrale CTAs („Technische Beratung“, „Berater kontaktieren“) führen auf die alte korodur.de statt in ein konsistentes internes Kontakt-/Lead-Formular.  
* **Datenblatt-Quellen uneinheitlich:** Mal /downloads/tds-… auf der Detailseite, mal /wp-content/uploads/… in der Matrix – eine einzige „Source of Truth“ für Downloads definieren und tote Pfade prüfen.  
* **Kein durchgängiger Lead-Abschluss:** Empfehlung am Ende des Lösungsfinders: klarer nächster Schritt (Ergebnis als PDF, „Beratung anfragen“-Formular, Merkliste) statt Sprung in externe Seite.

**7\. Strategische Positionierung: Sanierung vs. Kernbusiness Industrieboden**

Die Startseite positioniert die Seite als vollwertigen Auftritt („Industrieböden, Sichtestriche und Spezialbaustoffe. Weltweit bewährt.“) inklusive acht Bereichen bis hin zu Katzenstreu. Die gesamte funktionale Tiefe – Lösungsfinder, Produktkatalog, Matrix, Referenzen – ist jedoch ausschließlich auf Sanierung ausgerichtet. Der Produktkatalog listet nur Sanierungsprodukte; Neubau-Flaggschiffe wie NEODUR HE 3 / HE 3 green (CO₂-reduziert, u. a. Zalando-Referenz) fehlen.

Damit entsteht ein Spannungsfeld zum erklärten Ziel: Kernbusiness ist und bleibt Industrieboden in Neubau UND Sanierung. Aktuell droht die neue Seite, die Marke faktisch auf „Sanierung“ zu verengen, während Neubau – das eigentliche Volumengeschäft – nur über statische Bereichsseiten abgebildet ist, die nicht einmal in die Tool-Navigation eingebunden sind.

**Empfehlung:**

* **Sanierung als Blaupause:** Das exzellente Sanierungs-Tooling ist das Modell. Eine gleichwertige, zweite Strecke „Neubau / Industrieboden“ aufbauen (eigener Lösungsfinder bzw. Auswahlhilfe, Neubau-Produkte inkl. HE 3/green, Neubau-Referenzen).  
* **Klare Dachstruktur:** Industrieboden (Neubau \+ Sanierung) als sichtbarer Kern, daneben die weiteren Bereiche (Sichtestrich, Schnellbeton, Spezialbaustoffe, MICROTOP, 3D, Katzenstreu). So bleibt Vielfalt sichtbar, ohne den Kern zu verwässern.  
* **Scope-Entscheidung treffen:** Soll die neue Seite jetzt schon korodur.de voll ersetzen oder zunächst als Sanierungs-Modul live gehen? Davon hängen Navigation, Versprechen der Startseite und Migrationsplan ab.

**8\. Maßnahmenplan**

**8.1 Quick Wins (kurzfristig, geringer Aufwand)**

| Maßnahme | Wirkung | Aufwand |
| :---- | :---- | :---- |
| Header/Logo/Footer/Navigation vereinheitlichen | Geschlossener Markenauftritt, Orientierung | mittel |
| Schrittzahl Lösungsfinder überall angleichen | Vertrauen, Konsistenz | gering |
| Alle Kontakt-CTAs auf ein internes Ziel | Conversion bleibt auf der Seite | gering |
| Eine Matrix statt zwei (oder klar trennen) | Weniger Redundanz/Verwirrung | gering |
| Fehlende Produktbilder ergänzen | Einheitliche, hochwertige Kacheln | gering |
| Datenblatt-Links auf eine Quelle, tote Pfade prüfen | Verlässliche Downloads | gering |

**8.2 Mittelfristig**

* Referenzen (und ggf. weitere JS-abhängige Listen) serverseitig/SSG rendern – kein leerer No-JS-Zustand, besseres SEO.  
* Einheitliche Suche (⌘K) über alle Bereiche.  
* CTA-Hierarchie systematisieren (primär/sekundär) und Lösungsfinder mit echtem Lead-Abschluss versehen (Ergebnis-PDF, Anfrageformular, Merkliste).  
* Konsolidierte Informationsarchitektur dokumentieren (eine Sitemap, ein Navigationsmodell).

**8.3 Strategisch**

* Zweite gleichwertige Strecke „Neubau / Industrieboden“ inkl. Neubau-Produkten (HE 3/green) aufbauen.  
* Dachstruktur und Markenversprechen der Startseite an das tatsächliche Angebot anpassen.  
* Migrations-/Go-live-Plan: Voll-Ersatz von korodur.de vs. schrittweiser Rollout.

**9\. Empfohlene nächste Schritte**

* Live-Visual-Walkthrough für die pixelgenaue UI-Bewertung (Typografie, Abstände, Mobile, Interaktionszustände).  
* Quick-Wins-Liste aus 8.1 als ersten Sprint einplanen.  
* Strategische Scope-Entscheidung (Abschnitt 7\) klären – sie steuert alle weiteren IA-Entscheidungen.

*Dieses Dokument dient der internen Information und Entscheidungsvorbereitung. Die echte KORODUR-Logodatei kann die hier verwendete Navy-Wortmarke im Briefkopf ersetzen.*
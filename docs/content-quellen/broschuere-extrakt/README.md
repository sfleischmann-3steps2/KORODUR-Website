# Broschüren-Extrakt: Industrieboden 2023 — #349

**Was das ist:** Faktentreuer Extrakt der **aktuellen** Industrieboden-Broschüre (2023, 4 Seiten A3). **Autoritative 4. Quelle** des Content-Vierklangs — aktueller und fehlerärmer als der Alt-Website-Scrape (#344). Bei Konflikt gewinnt diese Quelle.

**Quelle:** `KORODUR/KORODUR Assets/Industrieboden-Broschuere_de_2023.pdf` (Title „Industrieboden neue Broschüre DE").

**Wie erzeugt:** Dynamic Workflow, 1 Agent je A3-Seite (schema-erzwungen) + Verifikations-Pass auf die kritische Produktmatrix (S3, Zelle für Zelle gegen das PDF). Matrix-Verdikt: **fidel** (2 Mini-Korrekturen direkt eingearbeitet, 1 kosmetischer Hinweis).

**CLEAN:** faktentreu (Werte/Klassen/Normen wortgetreu), Quelle je Piece (Seite + Block), Unsicheres geflaggt, **keine Konsolidierung**. Personen/Kontakt ausgelassen (GF-Zitat S1, Firmenadressen S4) gemäß Standing Rule.

---

## Dateien

| Datei | Seite | Inhalt | Flags |
|---|---|---|---:|
| `broschuere-s1-cover-usp-verarbeitung.md` | S1 | Titel, EPD/klimaneutral 2030, 10er-USP-Liste, „Verarbeitung auf einen Blick" (7 Verfahren) | 1 |
| `broschuere-s2-branchen-normen.md` | S2 | Branchen/Anwendungen (~21+16), 750 Mio. m², **Normative Grundlagen: DIN 1100 (A/M/KS ≤6/≤3/≤1,5), DIN 18560-7 Tab. 1 + Tab. 6 (Nenndicken), DIN EN 13813** | 2 |
| `broschuere-s3-produktmatrix.md` | S3 | **Produkteigenschaften-Matrix** — 6 Systeme (Hartstoffestrich, kunststoffmod., Hartstoffeinstreuung, Hartstoffschnellestrich, FSCem, NEODUR Level) mit CT-Klassen, Hartstoffgruppe, Schichtdicke, Verbrauch, Verarbeitung, Nachbehandlung, Oberflächenschutz | 9 |
| `broschuere-s4-schicht-vs-einstreuung.md` | S4 | **„Hartstoffschicht oder Hartstoffeinstreuung?"** — 8-Kriterien-Vergleich, Schnittbild, Rückseiten-Rahmen | 2 |

---

## Wert für die Konsolidierung (#346)

Diese Quelle **löst mehrere #344-Scrape-Flags autoritativ** und füllt den **#345-White-Space Nr. 1** (Hartstoffeinstreuung / Industrieboden-Normen, höchster Hebel):

- **DIN-1100-Gruppen** (im Scrape lückenhaft) jetzt belegt: HE 3-Familie (HE 3/green = A, HE 3 SVS 3 = A, HE 3 metallisch = M, HE 3 SVS 1,5 = KS), HE 65-Familie, FSCem (CT-C40-F6 bis CT-C50-F7), FSCem Screed (CT-C40-F6), NEODUR Level (CT-C40-F8-AR0,5).
- **Wayback-404-Produkte aus #344** (Detailseite fehlte) jetzt mit Klassifizierung: KORODUR 0/4 + VS 0/5, WH-metallisch (= HE 65 metallisch, CT-C80-F11-A3, M), Diamantbeton (= HE 65 SVS 1,5, CT-C70-F9-A1,5, KS).
- **Norm-Content für die Pillars** (Cluster 4): DIN 1100 Hartstoffgruppen + Abriebwiderstand (Böhme), DIN 18560-7 Beanspruchungsgruppen I/II/III mit Tabelle 1 (mechanische Beanspruchung) und Tabelle 6 (Nenndicken A/M/KS × I/II/III: 15/8/6 · 10/6/5 · 8/6/4), DIN EN 13813.
- **„Schicht oder Einstreuung?"** (S4) liefert die belegte 8-Kriterien-Argumentation für die bestehende `content/artikel/einstreuung-vs-schicht.mdx` und den White-Space-Artikel.

> Bei Konflikten in #346: **Broschüre 2023 > Alt-Website-Scrape**. Produkt-Klassen final dennoch gegen TDS / `data/produkte.ts` / Notion + Frank-Sign-off.

## Offene Flags (Checkpoint #346)
- **S3-Matrix:** diagonale/überlappende Header → Spaltenzuordnung der Nachbehandlungs-Häkchen (KOROCURE/KOROTEX/KOROMINERAL) vor der Web-Umsetzung (#350) final gegen Original prüfen; Schichtdicke/Verbrauch teils als Zellblöcke über Zeilengruppen gedruckt (geflaggt). Verbrauch- und NEODUR-Level-Häkchen wurden per Verifikation aufgelöst.
- **S2:** Performance-Diagramm Skalenwert „12,0" im Original ohne „≤" (wortgetreu übernommen).
- **S4:** Druck-/Versionscode „0423/517" nicht zweifelsfrei lesbar.

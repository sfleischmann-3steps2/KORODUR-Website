# Lösungsfinder V2.5 — Daten-Migration: Review für Produktmanagement

**Datum:** 2026-06-01
**Branch:** `feature/loesungsfinder-v2-5`
**Adressat:** Frank Sander (Produktwissen) + Steffi
**Status:** Migration umgesetzt, Funnel läuft auf echten Daten. Die mit **DRAFT** markierten Werte brauchen fachlichen Sign-off.

Diese Migration hat den heuristischen Laufzeit-Adapter (`loesungsfinderV25Adapter.ts`, gelöscht) durch echte Daten ersetzt. Zwei Klassen:

- **Mechanisch / deterministisch** — aus kuratierten Feldern abgeleitet, kein Review nötig.
- **DRAFT (Fachurteil)** — faktenbasiert vorbelegt, aber Sign-off offen. Nur diese Punkte unten prüfen.

---

## 1. Produkte — `belastungenAbgedeckt` (DRAFT)

Welche Branchen-Belastungen ein Produkt fachlich abdeckt. Das ist der **Match-Schlüssel der Top-Empfehlung** (Schnittmenge mit den Branchen-Tags des gewählten Einsatzbereichs). Quelle der Ableitung: `besonderheiten`, `technischeDaten`, `belastbarkeitsStufe`, `aussenbereich`. Gepflegt in `data/produkte.ts`.

Verfügbare Tags: `schwerlast`, `verschleiss`, `staplerverkehr`, `chemie`, `thermik`, `hygiene`, `fleckschutz`, `optik`, `publikumsverkehr`, `frost-tausalz`.

| Produkt | belastungenAbgedeckt (DRAFT) | Herleitung |
|---|---|---|
| NEODUR HE 60 rapid | schwerlast, verschleiss, chemie, frost-tausalz, staplerverkehr | Stufe 5, A6-Verschleiß, „Chemikalienbeständig", aussen=true, rollende Lasten |
| NEODUR HE 65 | schwerlast, verschleiss, staplerverkehr | Stufe 5, A6, Silo/Großfläche, aussen=false |
| NEODUR HE 65 Plus | schwerlast, verschleiss, chemie, frost-tausalz, staplerverkehr | Stufe 5, A6, Frost-/tausalz, WHG, chemie |
| NEODUR HE 40 | schwerlast, verschleiss | Stufe 5, A6, „Innenbereich" |
| NEODUR Level | verschleiss, staplerverkehr, optik | Stufe 4, integrierter Verschleißträger, Ebenheit/selbstverlaufend |
| TRU Self-Leveling | optik, fleckschutz, hygiene, publikumsverkehr | Sichtestrich, Betonoptik, „hygienisch & pflegeleicht" |
| Rapid Set CEMENT ALL | frost-tausalz, verschleiss | Reparaturmörtel, aussen=true |
| Rapid Set MORTAR MIX | frost-tausalz | Fugen/Reprofilierung, aussen=true |
| Rapid Set MORTAR MIX DUR | schwerlast, verschleiss, staplerverkehr, frost-tausalz | Hartstoff DIN 1100 A, Schwerlastfugen, Stufe 5 |
| DOT Europe CONCRETE MIX | frost-tausalz, schwerlast, chemie, verschleiss | Stufe 5, Frost-/tausalz, sulfatbeständig, Brücken/Industrieböden |
| KOROCRETE Schnellbeton | schwerlast, frost-tausalz | System, Stufe 4, wasserfest, großflächig |
| Rapid Set Schnellbeton | frost-tausalz, schwerlast, staplerverkehr | System, Stufe 5, TL BEB-StB Verkehr, Frost-/tausalz |
| ASPHALT REPAIR MIX | frost-tausalz, schwerlast | nur außen (innenGeeignet=false), realistische Verkehrsflächen-Tags, s. D3 |

**Bitte prüfen:** Sind die Tag-Sets fachlich richtig? Insbesondere `thermik` und `hygiene` wurden konservativ kaum vergeben — fehlt z. B. `thermik` bei einem hitzebeständigen Produkt?

---

## 2. Produkte — `flaechenkategorienGeeignet` (DRAFT-Logik)

Welche Flächengrößen ein Produkt bedient (Step-1-Filter). Logik in `data/produkte.ts → flaechenkategorienVon()`:

- **Schnellreparaturmörtel** (CEMENT ALL, MORTAR MIX, MORTAR MIX DUR): `punktuell` + `mittel`
- **Estriche + System-/Großbetone** (alle NEODUR, TRU, DOT Europe, KOROCRETE, Rapid Set Schnellbeton): `mittel` + `gross`
- **ASPHALT REPAIR MIX**: `punktuell` + `mittel` + `gross` (aber aus Funnel ausgeschlossen)

**Bitte prüfen:** Stimmt die Zuordnung? Z. B. — soll NEODUR Level (Dünnestrich) auch `punktuell` können? Soll DOT Europe `punktuell` (Einzelschäden) abdecken?

---

## 3. Mechanisch abgeleitet (kein Review nötig, nur zur Info)

- **`wiederbelastungInH`** ← `belastbarNach` geparst (`"1 h"`→1, `"24 h"`→24, `"3 d"`→72, `"30 min"`→0,5).
- **`aussenGeeignet`** ← kuratiertes Feld `aussenbereich`.
- **`innenGeeignet`** ← immer `true` (alle Matrix-Produkte sind innen einsetzbar).

---

## 4. Referenzen — V2.5-Filterfelder

Generiert von `scripts/migrate-refs-v25.ts` → `data/referenzenV25.ts` (51 Einträge, pro Slug zum Durchsehen).

- **`flaecheKategorie`** (mechanisch): punktuell 19 · mittel 25 · gross 7
- **`zeitfenster`** (mechanisch): aus `zeitDringlichkeit` (schnell→sehr-kurz, mittel→kurz, normal→planbar)
- **`einsatzbereich` + `innenAussen`** (abgeleitet aus `einsatzbereiche[0]`, **Review empfohlen**)
- **`schadenstypen`** (**DRAFT**, Keyword-Extraktion aus Referenztext)

### Bekannte Lücken (Review nötig)

**4a — Zwei Außen-Cluster sind leer:**

| Einsatzbereich | Refs |
|---|---|
| aussen-verladezone-rampe | **0** ⚠ |
| aussen-werkhof-aussenlager | **0** ⚠ |
| aussen-infrastruktur-verkehr | 16 |
| aussen-parkdeck-tiefgarage | 4 |

Die alte Taxonomie kannte diese Unterscheidung nicht — alle Außen-Refs landen in `infrastruktur-verkehr` oder `parkdeck`. Wählt ein Nutzer „Verladezone & Rampe" oder „Werkhof & Außenlager", kommen **null Referenzen**. → Manuelles Re-Tagging einzelner Refs nötig.

**4b — Multi-Branche-Refs verlieren Sekundär-Bereich:** ~16 Refs hatten 2 Einsatzbereiche; die Migration nimmt nur den ersten. Diese Refs erscheinen nur unter ihrer Primär-Branche.

**4c — Schadenstypen oft leer:** 29 / 51 Refs haben keinen erkannten Schadenstyp (Text nennt ihn nicht explizit). Erkannt: verschleissschaeden 21 · risse 5 · ausbrueche 2 · frueher-sanierung 1.
*Hinweis:* Der Schaden-Pill-Filter ist in der aktuellen Ergebnisseite **deaktiviert** (Steffi-Entscheidung) — `schadenstypen` ist also derzeit dormante Datenvorhaltung, kein akuter Funnel-Effekt.

---

## 5. Offene Entscheidungen (Steffi)

**D1 — Ranking bei „planbar":** Bei „Groß · Innen · Industrie · planbar" empfiehlt der Algo aktuell *DOT Europe CONCRETE MIX* statt *NEODUR HE 65/HE 65 Plus*. Ursache: Bei Gleichstand der Branchen-Tags entscheidet die kürzeste Wiederbelastungszeit — auch wenn gar kein Zeitdruck besteht. Für Flächen-Jobs ohne Zeitfenster sollte eher der Industrieestrich gewinnen. **Soll der Tiebreak angepasst werden** (z. B. bei `planbar` Estrich-Kategorie / höhere Belastbarkeitsstufe bevorzugen)?

**D2 — 3 neue Produkte ohne echtes TDS:** `belastbarNach` für NEODUR HE 40, DOT Europe, Rapid Set Schnellbeton stammt konservativ aus Mockup/Analogie (produktmatrix-v5). Für den Match als Startwert ok — TDS-Bestätigung offen.

**D3 — ASPHALT REPAIR MIX: nur außen (erledigt 2026-06-01):** Statt Vollausschluss ist es jetzt `innenGeeignet=false` mit realistischen Tags (`frost-tausalz`, `schwerlast`). Erscheint damit nur bei Außen-Fällen (Infrastruktur/Verladezone) und dominiert dort nicht mehr. Innen taucht es nicht auf.

---

## 6. Wie korrigieren

- **Produkte** (`belastungenAbgedeckt`, `flaechenkategorienGeeignet`-Logik): direkt in `data/produkte.ts`.
- **Referenzen** (`einsatzbereich`, `schadenstypen` etc.): in `scripts/migrate-refs-v25.ts` die Mapping-/Keyword-Logik anpassen **oder** für Einzelfälle eine Override-Map ergänzen, dann `npx tsx scripts/migrate-refs-v25.ts` neu generieren.
- Nach jeder Änderung: `npx tsx scripts/validate-referenzen.ts` (0 Fehler) + `npx tsc --noEmit`.

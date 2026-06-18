# Referenz-Produkt-Audit (2026-06-18)

**Kernaussage:** Die Datenlage ist insgesamt sauber. Bei 133 Referenzen und 71 Produkten (198 Produkt-Matches) gibt es **0 unmatched** und **0 eingestellte** Produkte in den Referenzen, nur **1 sicheren Auto-Fix** (Namensschreibweise FSCem). Der echte Handlungsbedarf liegt woanders: **1 exakte Dublette** und **1 mittlerer Dubletten-Verdacht** (#205), mehrere unplausible Einsatzcluster sowie **62 Referenzen mit Feldluecken** (#100). Eine autoritative Produktliste der Technik (#258) brauchen wir nur fuer die Bereich-/Cluster-Plausibilitaet, nicht fuer Namensbereinigung.

---

## Auto-Fixes (sicher, ohne Technik-Liste umsetzbar)

| Referenz-slug | aktueller Name | -> Vorschlag | Begruendung |
| :--- | :--- | :--- | :--- |
| `heidelberger-cement-ag-heidelberg` | FSCem | KORODUR FSCem | Kurzschreibweise ohne KORODUR-Praefix; meint eindeutig KORODUR FSCem (nicht FSCem Screed). |

Keine Varianten-Normalisierungen und keine eingestellten Produkte zu bereinigen. Dieser eine Fix ist eine reine Schreibweisen-Angleichung und kann ohne Frank umgesetzt werden.

---

## Fuer die Technik zu klaeren

Aktuell **keine** unmatched- oder discontinued-Produkte in den Referenzen. Alle 198 Produktnennungen lassen sich der bestehenden 71er-Produktliste zuordnen.

Offen bleibt damit nur die strukturelle Frage aus #258: Sobald Franks autoritative Liste vorliegt, prueft die Technik die Bereich-/Cluster-Zuordnungen (siehe naechster Abschnitt) und bestaetigt, dass keine in der App genannten Produkte zwischenzeitlich eingestellt wurden.

---

## Bereich-Plausibilitaet

Zwei Klassen von Flags: **warn** (Zuordnung passt mutmasslich nicht) und **info** (Hinweis/Dublette in der Produktliste oder grobe Cluster-Tags).

### warn (vorrangig pruefen)

| Referenz-slug | Befund |
| :--- | :--- |
| `trinkwasserspeicher-raecknitz-dresden` | MICROTOP TW (Trinkwasserbehaelter-Sanierung), aber Einsatzbereich `infrastruktur-zufahrten`. Cluster passt nicht zum Behaelterprodukt, eher Trinkwasser/Behaelter. |

### info: unplausible Einsatzcluster

| Referenz-slug | Befund |
| :--- | :--- |
| `klaranlage-nako` | Nur `verkaufsraeume` bei einer Klaeranlage mit Rapid Set CEMENT ALL, eher infrastruktur/abwasser. |
| `olympiastadion-berlin` | `industrie-produktion` + `infrastruktur-zufahrten` fuer GRANIDUR (Sichtestrich) im Stadion wirkt nicht naheliegend. |
| `stefan-andreas-schulzentrum-schweich` | `verkaufsraeume` passt nicht zum Gymnasium/Schulzentrum. GRANIDUR produkt-plausibel. |
| `verwaltungsgebaeude-moedel-amberg` | `industrie-produktion` passt nicht zum Verwaltungsgebaeude; KCF deutet auf Repraesentations-/Buroflaeche. |
| `leica-firmenzentrale-wetzlar` | GRANIDUR BIANCO/NERO ist Sichtestrich/Designboden; Cluster plausibel, aber primaer Design statt Hochbelastung. |
| `libeskind-villa-datteln` | KCF (Designboden) bei `industrie-produktion`; in einer Villa eher repraesentativ/Wohnen. |
| `martensbro-schule-espoo-finnland` | NEODUR HE 65 + KORODUR HB 5 bei `industrie-produktion` in einer Schule; Produkte plausibel, Tag ggf. ungenau. |

### info: Dublette in der Produktliste der Referenz (Produkt doppelt gelistet, bereinigen) — ERLEDIGT 2026-06-18

Deterministischer Nachlauf nach dem Audit fand 4 weitere Faelle, die das Fan-out uebersehen hatte. Alle 8 wurden dedupliziert (validate-referenzen: 0 Fehler).

| Referenz-slug | doppelt gelistetes Produkt | Status |
| :--- | :--- | :--- |
| `wellpappenfabrik-gross-versmold` | Rapid Set CONCRETE PHARMACY | gefixt |
| `gefaellesanierung-tankstelle-schneeberg` | Rapid Set CONCRETE PHARMACY | gefixt |
| `restaurierung-schmucktafeln` | Rapid Set CONCRETE PHARMACY | gefixt |
| `borbet-leichtmetallradproduktion-kodersdorf` | NEODUR HE 65 | gefixt |
| `airbus-a-380-hamburg-finkenwerder` | NEODUR HE 65 | gefixt (Audit verpasst) |
| `moebelhaus-hoeffner-hamburg` | NEODUR HE 65 | gefixt (Audit verpasst) |
| `wago-stanzerei-minden` | NEODUR HE 65 | gefixt (Audit verpasst) |
| `sic-processing-zhenjiang-china` | NEODUR HE 3 | gefixt (Audit verpasst) |

### info: kein Konflikt

| Referenz-slug | Hinweis |
| :--- | :--- |
| `kuechenbodensanierung-leinfelden` | KOROMINERAL Li+ im Lebensmittel/Restaurant-Boden plausibel als Verdichter/Versiegelung. Nur Hinweis. |

---

## Dubletten-Verdacht (#205)

| slugs | confidence | Begruendung |
| :--- | :--- | :--- |
| `martensbro-schule-espoo-finnland`, `martensbro-schule-espoo-finnland-2` | **hoch** | Exakte Dublette: identischer Titel, gleicher Ort (Espoo), identische Produkte (NEODUR HE 65 + KORODUR HB 5). Slug-Suffix `-2` verraet doppelten Import desselben Projekts. |
| `guben-produktionshalle`, `sanierung-einer-sanierung` | **mittel** | Verdachtsfall #205: beide teilen NEODUR Level; "Sanierung einer Sanierung" passt narrativ zur Guben-Produktionshalle (Neuaufbau einer fehlgeschlagenen Sanierung). `sanierung-einer-sanierung` hat keinen konkreten Ort (nur "Deutschland"), was fuer eine generische/zweite Anlage desselben Projekts spricht. Nicht sicher, da auch `neodur-level-norderstedt` dasselbe Story-Motiv + Produktset (NEODUR Level + KORODUR PC) hat, aber Norderstedt ist eine eigenstaendige, ortsdefinierte 2026er-Referenz. |

**Empfehlung:** Den hoch-confidence-Fall (Mårtensbro) koennen wir autonom zusammenfuehren. Der Guben-Fall braucht eine Bestaetigung von Steffi/Technik, bevor wir mergen — Risiko, eine eigenstaendige Referenz versehentlich zu loeschen.

**ERLEDIGT 2026-06-18:** Maartensbro zusammengefuehrt. Original `martensbro-schule-espoo-finnland` behalten (6 Galeriebilder, korrekte Architekten-Schreibweise), `jahr: 2012` aus der Dublette uebernommen, `-2` entfernt. Jetzt 132 Referenzen, validate 0 Fehler. Verwaister Bildordner `-2` bleibt vorerst liegen. Guben-Fall weiterhin offen fuer Steffi/Technik.

---

## Fehlende Felder (#100)

**62 Referenzen** haben mindestens eine Feldluecke. Haeufigkeit je Feld:

| Feld | Anzahl fehlend |
| :--- | ---: |
| `flaeche` | 47 |
| `vorteile` | 24 |
| `galerieBilder` | 3 |
| `produkte` | 3 |
| `ort` | 3 |
| `land` | 1 |

`flaeche` ist mit Abstand die groesste Luecke (knapp ein Drittel aller Referenzen). `vorteile` ist das zweitgroesste Feld; beides sind Felder, die wir nicht erfinden duerfen und die aus Notion/Verzeichnis bzw. von der Technik nachgereicht werden muessen.

**Top 15 Referenzen mit den meisten Luecken:**

| Referenz-slug | fehlende Felder | Anzahl |
| :--- | :--- | ---: |
| `decathlon-dortmund` | flaeche, vorteile, galerieBilder, produkte | 4 |
| `oelie-saur-saint` | flaeche, vorteile, galerieBilder | 3 |
| `torschwelle-lagerhalle` | flaeche, ort, vorteile | 3 |
| `restaurierung-schmucktafeln` | flaeche, land, ort | 3 |
| `sanierung-lkw-zufahrt-logistikzentrum-sankt` | vorteile, galerieBilder | 2 |
| `texaco-tankflache-arnheim` | flaeche, vorteile | 2 |
| `wellpappenfabrik-gross-versmold` | flaeche, vorteile | 2 |
| `korodur-demo-bochum` | flaeche, vorteile | 2 |
| `kreisverkehr-goppingen` | flaeche, vorteile | 2 |
| `barmenia-parkhaus-wuppertal` | flaeche, vorteile | 2 |
| `sncf-bordeaux` | flaeche, vorteile | 2 |
| `fh-lichtschacht-nurnberg` | flaeche, vorteile | 2 |
| `bruckensanierung-amberg` | flaeche, vorteile | 2 |
| `parkplatzsanierung-metzingen` | flaeche, vorteile | 2 |
| `schachtregulierung-fahrbahn-nittenau` | flaeche, vorteile | 2 |

(Weitere Referenzen mit je 2 Luecken: `treppensanierung-gehweg-esslingen`, `burger-king-munster`, `fahrbahnsanierung-wien`, `tiefbaumassnahme`. Die restlichen 38 fehlen jeweils nur ein Feld, ueberwiegend `flaeche`.)

---

## Naechste Schritte

**Claude autonom (sofort umsetzbar):**

1. Auto-Fix Schreibweise: `FSCem` -> `KORODUR FSCem` in `heidelberger-cement-ag-heidelberg`.
2. Produktlisten-Dubletten bereinigen (gleiches Produkt zweimal in einer Referenz): `wellpappenfabrik-gross-versmold`, `gefaellesanierung-tankstelle-schneeberg`, `restaurierung-schmucktafeln`, `borbet-leichtmetallradproduktion-kodersdorf`.
3. Hoch-confidence-Dublette zusammenfuehren: `martensbro-schule-espoo-finnland-2` in das Original mergen, danach `validate-referenzen.ts` laufen lassen.

**Wartet auf Steffi/Technik (Frank, #258):**

1. Guben-Dubletten-Verdacht (`guben-produktionshalle` vs. `sanierung-einer-sanierung`) — vor Merge bestaetigen lassen.
2. Einsatzcluster-Korrekturen (warn + info): vor allem `trinkwasserspeicher-raecknitz-dresden`, dann `klaranlage-nako`, Schul-/Verwaltungs-Faelle. Technik bestaetigt die korrekten Einsatzbereiche.
3. Feldluecken `flaeche` (47x) und `vorteile` (24x): aus Verzeichnis/Notion oder von der Technik nachreichen. Keine Werte erfinden.
4. Fehlende `produkte` bei `decathlon-dortmund`, `strandhaus-bahia-de-kino-mexico`, `betonwerk-lintel-rheda-wiedenbrueck`: Produkteinsatz von der Technik klaeren.

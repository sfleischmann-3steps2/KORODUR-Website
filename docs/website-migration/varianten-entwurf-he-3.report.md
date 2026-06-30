# Varianten-Entwurf — HE 3 (#371)

Generiert von `scripts/extract-varianten.ts`. **Entwurf zur Hand-Verifikation (#372), kein Blind-Commit.**

- **variantenGruppe / Mutter:** `neodur-he-3`
- **DE-Ausführungen:** 5 (neodur-he-3, neodur-he-3-svs-3, neodur-he-3-svs-15, neodur-he-3-metallisch, neodur-he-3-green)
- **WPML-Duplikate gefiltert (EN/FR):** 10
- **Normwerte:** PROVISORISCH (aus CT-Klasse/TDS abgeleitet) — final via PDB/Technik-Termin.
- **Bewusst leer (Experten/PDB):** Verbrauch, eigenes TDS, Foto/`bild`, EPD.

## ⚠ Geteilte SKUs
- `1220116S25KG` → neodur-he-3, neodur-he-3-green

## Feld-Provenienz je Ausführung

### NEODUR HE 3 — `neodur-he-3`
| Feld | Wert | Quelle |
| --- | --- | --- |
| sku | `1220116S25KG` | XML |
| qualitaetsklasse | CT-C70-F9-A6 | XML (Regex) |
| Basis-Hartstoff | — | XML (fehlt) |
| beschreibung | NEODUR HE 3 gem. DIN 18557 (Werkmörtel) und DIN EN 13813 basierend auf Hartstoff… | XML (bereinigt) |
| normen | DIN 18557, DIN EN 13813, DIN 1100 | XML+TDS |
| besonderheiten | — (TDS-Text fehlt) | TDS NEODUR_HE_3_de.pdf |
| verarbeitungModi | — | TDS |
| verwandteProdukte | korodur-nanofinish, koromineral-cure, koromineral-li, koromineral, koroclean, korocure, korotex | XML-Systemkomp. + TDS (Namens-Substring) |
| Packshot-Kandidat | https://www.korodur.de/wp-content/uploads/2023/02/NEODUR-HE3.png | XML (extern, später migrieren) |
| eigenes TDS (PDF) | NEODUR_HE_3_de.pdf ⚠ kein lokaler Text | XML dokumente |
| eingestellt gefiltert | KOROPOX | regelbasiert |

<details><summary>TECHNISCHE-DATEN-Rohblock (TDS, manuell strukturieren)</summary>

```
(kein TDS-Text)
```
</details>

### NEODUR HE 3 SVS 3 — `neodur-he-3-svs-3`
| Feld | Wert | Quelle |
| --- | --- | --- |
| sku | `1220134S30KG` | XML |
| qualitaetsklasse | CT-C70-F9-A3 | XML (Regex) |
| Basis-Hartstoff | — | XML (fehlt) |
| beschreibung | NEODUR HE 3 SVS 3 gem. DIN 18557 (Werkmörtel) und DIN EN 13813 basierend auf Har… | XML (bereinigt) |
| normen | DIN 18557, DIN EN 13813, DIN 1100 | XML+TDS |
| besonderheiten | — (TDS-Text fehlt) | TDS NEODUR_HE_3_de.pdf |
| verarbeitungModi | — | TDS |
| verwandteProdukte | — | XML-Systemkomp. + TDS (Namens-Substring) |
| Packshot-Kandidat | https://www.korodur.de/wp-content/uploads/2023/02/HE-3-SVS-3.png | XML (extern, später migrieren) |
| eigenes TDS (PDF) | NEODUR_HE_3_de.pdf ⚠ kein lokaler Text | XML dokumente |

<details><summary>TECHNISCHE-DATEN-Rohblock (TDS, manuell strukturieren)</summary>

```
(kein TDS-Text)
```
</details>

### NEODUR HE 3 SVS 1,5 — `neodur-he-3-svs-15`
| Feld | Wert | Quelle |
| --- | --- | --- |
| sku | `1220117S30KG` | XML |
| qualitaetsklasse | CT-C70-F9-A1,5 | XML (Regex) |
| Basis-Hartstoff | — | XML (fehlt) |
| beschreibung | NEODUR HE 3 SVS 1,5 gem. DIN 18557 (Werkmörtel) und DIN EN 13813 basierend auf H… | XML (bereinigt) |
| normen | DIN 18557, DIN EN 13813, DIN 1100 | XML+TDS |
| besonderheiten | — (TDS-Text fehlt) | TDS NEODUR_HE_3_de.pdf |
| verarbeitungModi | — | TDS |
| verwandteProdukte | korodur-nanofinish, koromineral-cure, koromineral-li, koromineral, koroclean, korocure, korotex | XML-Systemkomp. + TDS (Namens-Substring) |
| Packshot-Kandidat | https://www.korodur.de/wp-content/uploads/2023/02/NEODUR®-HE-3-SVS-15.png | XML (extern, später migrieren) |
| eigenes TDS (PDF) | NEODUR_HE_3_de.pdf ⚠ kein lokaler Text | XML dokumente |
| eingestellt gefiltert | KOROPOX | regelbasiert |

<details><summary>TECHNISCHE-DATEN-Rohblock (TDS, manuell strukturieren)</summary>

```
(kein TDS-Text)
```
</details>

### NEODUR HE 3 metallisch — `neodur-he-3-metallisch`
| Feld | Wert | Quelle |
| --- | --- | --- |
| sku | `1220109S40KG` | XML |
| qualitaetsklasse | CT-C80-F11-A3 | XML (Regex) |
| Basis-Hartstoff | — | XML (fehlt) |
| beschreibung | NEODUR HE 3 metallisch ist ein gebrauchsfertiger, zementgebundener Trockenbausto… | XML (bereinigt) |
| normen | DIN EN 13813, DIN 1100 | XML+TDS |
| besonderheiten | — (TDS-Text fehlt) | TDS NEODUR_HE_3_metallisch_de-1.pdf |
| verarbeitungModi | — | TDS |
| verwandteProdukte | korodur-nanofinish, koromineral-cure, koromineral-li, koromineral, koroclean, korocure, korotex | XML-Systemkomp. + TDS (Namens-Substring) |
| Packshot-Kandidat | https://www.korodur.de/wp-content/uploads/2023/02/NEODUR®-HE-3-metallisch.png | XML (extern, später migrieren) |
| eigenes TDS (PDF) | NEODUR_HE_3_metallisch_de-1.pdf ⚠ kein lokaler Text | XML dokumente |
| eingestellt gefiltert | KOROPOX | regelbasiert |

<details><summary>TECHNISCHE-DATEN-Rohblock (TDS, manuell strukturieren)</summary>

```
(kein TDS-Text)
```
</details>

### NEODUR HE 3 green — `neodur-he-3-green`
| Feld | Wert | Quelle |
| --- | --- | --- |
| sku | `1220116S25KG` | XML |
| qualitaetsklasse | CT-C70-F9-A6 | XML (Regex) |
| Basis-Hartstoff | — | XML (fehlt) |
| beschreibung | NEODUR HE 3 green gem. DIN EN 13813 basierend auf Hartstoffen gem. DIN 1100 - ge… | XML (bereinigt) |
| normen | DIN EN 13813, DIN 1100 | XML+TDS |
| besonderheiten | — (TDS-Text fehlt) | TDS NEODUR_HE_3_green_de.pdf |
| verarbeitungModi | — | TDS |
| verwandteProdukte | korodur-nanofinish, koromineral-cure, koromineral-li, koromineral, koroclean, korocure, korotex | XML-Systemkomp. + TDS (Namens-Substring) |
| Packshot-Kandidat | https://www.korodur.de/wp-content/uploads/2023/07/Design-ohne-Titel11.png | XML (extern, später migrieren) |
| eigenes TDS (PDF) | NEODUR_HE_3_green_de.pdf ⚠ kein lokaler Text | XML dokumente |
| eingestellt gefiltert | KOROPOX | regelbasiert |

<details><summary>TECHNISCHE-DATEN-Rohblock (TDS, manuell strukturieren)</summary>

```
(kein TDS-Text)
```
</details>

## Verworfene WPML-Duplikate
- NEODUR HE 3 — https://www.korodur.de/en/product/neodur-he-3/
- NEODUR HE 3 — https://www.korodur.de/fr/produit/neodur-he-3/
- NEODUR HE 3 SVS 3 — https://www.korodur.de/en/product/neodur-he-3-svs-3/
- NEODUR HE 3 SVS 3 — https://www.korodur.de/fr/produit/neodur-he-3-svs-3/
- NEODUR HE 3 SVS 1,5 — https://www.korodur.de/en/product/neodur-he-3-svs-15/
- NEODUR HE 3 SVS 1,5 — https://www.korodur.de/fr/produit/neodur-he-3-svs-15/
- NEODUR HE 3 metallic — https://www.korodur.de/en/product/neodur-he-3-metallisch/
- NEODUR HE 3 met F — https://www.korodur.de/fr/produit/neodur-he-3-met-f/
- NEODUR HE 3 green — https://www.korodur.de/en/product/neodur-he-3-green/
- NEODUR HE 3 green — https://www.korodur.de/fr/produit/neodur-he-3-green/

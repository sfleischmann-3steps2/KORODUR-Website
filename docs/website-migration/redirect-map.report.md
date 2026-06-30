# Redirect-Map Alt-korodur.de → neue Slugs (#374)

Generiert von `scripts/build-redirect-map.ts` aus `extraktion-produkte.json`. **Greift erst beim Cutover.**

## Abdeckung

- Redirects gesamt: **202** (de 70 · en 66 · fr 66)
- davon Varianten-PDPs: **33**
- eingestellte Produkte (→ Nachfolger/Bereich): **4**
- ohne Match (manuell prüfen): **0**

## Stichprobe (10 reale Alt-URLs → Ziel)

| Alt-URL | Ziel |
| :-- | :-- |
| `/produkt/neodur-he-65-metallisch/` | `/de/produkte/neodur-he-65-metallisch/` (301, variante) |
| `/fr/produit/neodur-he-3-met-f/` | `/fr/produkte/neodur-he-3-metallisch/` (301, variante) |
| `/en/product/neodur-he-65-plus-svs-3/` | `/en/produkte/neodur-he-65-plus-svs-3/` (301, variante) |
| `/produkt/neodur-he-3-green/` | `/de/produkte/neodur-he-3-green/` (301, variante) |
| `/fr/produit/neodur-he-65-metallisch/` | `/fr/produkte/neodur-he-65-metallisch/` (301, variante) |
| `/en/product/neodur-he-3-svs-15/` | `/en/produkte/neodur-he-3-svs-15/` (301, variante) |
| `/produkt/neodur-he-65/` | `/de/produkte/neodur-he-65/` (301, variante) |
| `/produkt/durop/` | `/de/produkte/korodur-durop/` (301, produkt) |
| `/en/product/korocrete/` | `/en/produkte/korocrete/` (301, produkt) |
| `/produkt/korodur-silosystem/` | `/de/bereiche/industrieboden/` (301, eingestellt) |

## Cutover-Hinweis

- **Cloudflare Pages / Netlify:** `_redirects` ins Webroot.
- **Cloudflare Bulk Redirects:** `redirect-map.csv` (Spalten source/target/status) importieren.
- Pfade sind domain-relativ (ohne basePath) — passend für den Ziel-Host, nicht für GitHub Pages.
- pl/es: Alt-Site hatte nur de/en/fr — keine Redirects nötig.

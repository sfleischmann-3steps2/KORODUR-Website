# Bild-Briefs Fachartikel — Pilot Schadensbilder (2026-06-18)

Generierung via Higgsfield CLI, Modell `gpt_image_2`, `aspect_ratio 16:9`, `quality high`, `resolution 2k`. Stil-Entscheid Steffi: **fotorealistisch-dokumentarisch**. Pilot = die 6 Schadensbild-Seiten, danach die restlichen 15 Artikel.

Quelle der Szenen: vorhandene `bilder.brief`-Felder im Frontmatter (15.06.-Content-Workflow), hier bereinigt: ASCII-Dateinamen, keine Personen/Körperteile, einheitlicher Stil-Suffix, kein „Illustration".

## Gemeinsamer Stil-Suffix (an jeden Prompt angehängt)

> Fotorealistische, dokumentarische Industrieaufnahme im KORODUR-Stil: sachlich und ehrlich, kein Hochglanz, keine Werbeästhetik. Natürliches, leicht kühles Hallen- bzw. Tageslicht. Keine Menschen, keine Körperteile, keine Markenlogos, kein Text und keine Schrift im Bild. Neutrale, gedämpfte Industriefarben, realistische Betontextur, hohe Detailschärfe.

## Zieldateien

Alle nach `public/images/schadensbilder/<slug>.webp` (sharp-konvertiert aus der Generierung).

| Slug / Datei | Szene (Prompt vor Stil-Suffix) |
| :-- | :-- |
| `risse.webp` | Nahaufnahme eines markanten Risses in einem grauen Industrie-Betonboden einer Produktionshalle; im unscharfen Hintergrund eine Regalstütze und Stapler-Reifenspuren. |
| `abrieb-verschleiss.webp` | Industriehallenboden mit deutlichen Spurrillen entlang einer Staplerfahrspur, abgetragene Zementhaut und freigelegtes Korn, mattgrau; Seitenlicht betont die Topografie der Rillen. |
| `chemischer-angriff.webp` | Industrie-Betonboden mit deutlichem Ölfleck und punktuell angeätzter, abgesandeter Oberfläche durch Säureangriff, Werkstatt- und Tankumfeld, kaltes Tageslicht. |
| `feuchte-whg.webp` | Industrielle Auffangwanne bzw. WHG-Fläche im Außenbereich mit randdichter Aufkantung und Ablauf-Gully, sichtbare Öl- oder Chemikalienspuren auf dem Boden. |
| `absandung-festigkeitsverlust.webp` | Nahaufnahme einer sandig-pudrigen, mehligen Betonoberfläche mit hellem Zementstaub-Schleier und einer sichtbaren Stapler-Reifenspur. |
| `schadensbilder-hub.webp` | Weiter Industriebodenausschnitt in der Totalen, der mehrere Schadensbilder andeutet: ein Riss im Beton, eine polierte Verschleißzone, eine chemisch verfärbte Stelle, eine dunkle Feuchtefahne und eine absandende mehlige Oberfläche; sachlich im Tageslicht. |

**Hinweis Hub-Bild:** Die „5 Schäden in einem Bild"-Komposition ist für ein KI-Modell schwer sauber darstellbar. Falls das Ergebnis unruhig wirkt, Alternative: ein ruhiger, neutraler Industriebodenausschnitt als Hub-Aufmacher.

## Frontmatter-Korrekturen (beim Rendering-Schritt)

- `abrieb-verschleiss`: Pfad im Frontmatter hatte `ß` → ASCII.
- `index` (Hub): Pfad zeigte auf `schadensbild/` (Singular) → `schadensbilder/`.
- Alle Pfade auf `.webp` standardisieren.

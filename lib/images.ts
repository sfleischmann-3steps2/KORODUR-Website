/**
 * Thumbnail-Variante eines Referenzbilds (Launch-Plan M2, Performance-Paket).
 * Die .thumb.jpg-Dateien (640 px Kante, q70) werden vom Batch-Skript
 * scripts/optimize-referenz-bilder.mjs erzeugt — bei neuen Bildern einmal
 * laufen lassen. Nicht-JPEGs (z. B. WebP-Packshots) bleiben unverändert.
 */
export function thumbSrc(src: string): string {
  return src.replace(/\.jpe?g$/i, ".thumb.jpg");
}

/** Kuratierte Referenz-Slugs für die Showcase-Startseite.
 *  Mischung über die Produktbereiche (Steffi 2026-06-24, #352): je eine starke
 *  Referenz aus Industrieboden, Betonsanierung, MICROTOP/TW, Infrastruktur,
 *  Spezialmörtel und Sichtestrich/Designboden — Katzenstreu bewusst ausgenommen.
 *  6 Stück = zwei Reihen à drei, Neubau + Sanierung verschränkt. */
export const FEATURED_SLUGS = [
  "kleemann-produktionshalle", // Industrieboden · Sanierung
  "kaiserhof-koeln", // Sichtestrich/Designboden · Neubau
  "dhl-ueberadebruecken", // Betonsanierung (Rapid Set) · Sanierung
  "hauptbahnhofsvorplatz-landau", // Spezialmörtel · Neubau
  "trinkwasserturm-budapest", // MICROTOP/TW-Behälter · Sanierung
  "theodor-heuss-bruecke", // Infrastruktur · Sanierung
] as const;

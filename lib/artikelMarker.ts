// #296: Geteiltes Sentinel für markierte Experten-/Fachprüfungs-Hinweise.
// Bewusst in einem neutralen (nicht server-only) Modul, damit sowohl der
// Build-Zeit-Loader (lib/content.ts, server-only) als auch der Client-Renderer
// (components/ArtikelInhalt.tsx, "use client") es importieren können.
export const EXPERTE_PREFIX = "❲EXPERTE❳ ";

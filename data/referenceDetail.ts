import type { Referenz } from "./types";

export function isPublicReference(referenz: Referenz): boolean {
  return referenz.releaseStatus !== "intern" && referenz.releaseStatus !== "freigabe-offen";
}

export function selectRelatedReferences(
  current: Referenz,
  candidates: Referenz[],
  limit = 3
): Referenz[] {
  const currentAreas = new Set(current.einsatzbereiche ?? []);
  const currentProducts = new Set(current.produkte ?? []);

  return candidates
    .filter((candidate) => candidate.slug !== current.slug && isPublicReference(candidate))
    .map((candidate, index) => {
      const sharesArea = candidate.einsatzbereiche?.some((area) => currentAreas.has(area)) ?? false;
      const sharesProduct = candidate.produkte?.some((product) => currentProducts.has(product)) ?? false;

      let priority = 4;
      if (sharesArea && sharesProduct) priority = 1;
      else if (sharesArea) priority = 2;
      else if (sharesProduct) priority = 3;

      return { candidate, priority, index };
    })
    .filter(({ priority }) => priority < 4)
    .sort((a, b) => a.priority - b.priority || a.index - b.index)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

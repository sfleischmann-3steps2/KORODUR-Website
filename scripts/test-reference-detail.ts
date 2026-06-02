import assert from "node:assert/strict";
import type { Referenz } from "../data/types";

const modulePath = "../data/referenceDetail.ts";
const { selectRelatedReferences } = (await import(modulePath)) as typeof import("../data/referenceDetail");

function ref(
  slug: string,
  einsatzbereiche: Referenz["einsatzbereiche"],
  produkte: string[]
): Referenz {
  return {
    id: slug,
    slug,
    titel: slug,
    untertitel: "Test",
    ort: "Testort",
    land: "Deutschland",
    produkte,
    herausforderungen: [],
    loesung: "Testloesung",
    vorteile: [],
    bild: "/images/referenzen/_placeholder.jpg",
    bildAlt: "Testbild",
    sanierungsart: "grossflaechig",
    einsatzbereiche,
    zeitDringlichkeit: "normal",
    zusatzfunktionen: [],
  };
}

const current = ref("current", ["industrie-produktion"], ["NEODUR HE 60 rapid"]);
const sameAreaAndProduct = ref("same-area-product", ["industrie-produktion"], ["NEODUR HE 60 rapid"]);
const sameArea = ref("same-area", ["industrie-produktion"], ["NEODUR HE 65"]);
const sameProduct = ref("same-product", ["parkdeck"], ["NEODUR HE 60 rapid"]);
const unrelated = ref("unrelated", ["parkdeck"], ["NEODUR HE 65"]);
const anotherSameArea = ref("another-same-area", ["industrie-produktion"], ["KOROCRETE Schnellbeton"]);

const related = selectRelatedReferences(current, [
  unrelated,
  sameProduct,
  sameArea,
  current,
  sameAreaAndProduct,
  anotherSameArea,
]);

assert.deepEqual(
  related.map((r) => r.slug),
  ["same-area-product", "same-area", "another-same-area"],
  "related references should prioritize area+product, then area, then product, max 3"
);

const relatedWithoutAreaOverflow = selectRelatedReferences(current, [
  sameProduct,
  unrelated,
]);

assert.deepEqual(
  relatedWithoutAreaOverflow.map((r) => r.slug),
  ["same-product"],
  "same-product fallback should be used when there are not enough area matches"
);

console.log("reference detail tests passed");

# Referenzen – WXR-Extraktion (Provenienz)

**Quelle:** `WXR-Vollexport korodur.WordPress.2026-06-11.xml`  
**Archiv-Datum:** 2026-06-11  
**Erzeugt von:** `KORODUR-Website/scripts/extract-wxr-referenzen.py` (deterministisch, re-runbar)

## Dateien

- `referenzen-wxr.json` – konsolidierter Datensatz (147 Referenz-Gruppen)
- `md/<slug>.md` – human-lesbare Markdown-Datei je Referenz
- `../../../../korodur-translation/data/processed/referenzen_parallel_de_en.jsonl` (320 Blockpaare)
- `../../../../korodur-translation/data/processed/referenzen_parallel_de_fr.jsonl` (231 Blockpaare)
- `../../../../korodur-translation/data/raw/referenzen_unaligned_review.jsonl` (466 Zeilen, manuelles Alignment)

## Methode

Prosa stammt aus `content:encoded` (autoritativ; 0 Lightbox/Gallery/Elementor-Müll). Absätze sind als Leerzeilen kodiert → Block-Split + Inline-HTML→Markdown, Outbound-Links erhalten.

WPML-Gruppen ohne `trid` (fehlt im Export) via Union-Find: PRIMÄR normalisierter `ref_image-gallery`-String, SEKUNDÄR identischer Slug. `ref_location`+`ref_project` ist NICHT Auto-Join (über-merged Folge-Referenzen am selben Standort), nur Review-Kandidat.

Translation-Pairing block-genau, NUR bei identischer Block-Anzahl DE↔Ziel (`align="exact"`); abweichende Referenzen wandern ungeraten ins Review-File.

## Draft-Items (übersprungen, kein ACF/Pretty-Slug)

17 Drafts: 24028, 24092, 24211, 24225, 24333, 24391, 24504, 24526, 24532, 24576, 24627, 24663, 24677, 24698, 24737, 24760, 24774

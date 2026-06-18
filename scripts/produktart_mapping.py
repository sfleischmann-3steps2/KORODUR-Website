#!/usr/bin/env python3
"""
KORODUR Produktdatenbank — Produktart-Mapping
=============================================

Zweck: Die Live-Property "Produktart" traegt portfolioweit kaputte Archiv-Werte
("Archiv - Rapid Set", "Archiv - Spezialbaustoffe", ...) statt der Ontologie-Werte.
Dieses Skript schlaegt je Produkt den korrekten Ontologie-Wert vor, mit Confidence
und Begruendung, als Review-Tabelle vor dem Bulk-Update.

WICHTIG: Dieses Skript spricht NICHT mit Notion (kein notion-client). Es verarbeitet
einen per Notion-MCP gezogenen Dump (products.json) und gibt eine Vorschlagstabelle aus.
Das Schreiben zurueck in Notion erfolgt nach Freigabe ueber die MCP-Tools.

Input  : products.json  = [{"title": str, "produktart": str, "gewerk": [str, ...],
                            "beschreibung": str}, ...]
Output : Markdown-Tabelle auf stdout + produktart_proposals.csv
"""

import csv
import json
import os
import sys

# --- Gueltige Ontologie-Werte (Single-Select-Optionen der DB) -----------------
VALID = {
    "Hartstoffeinstreuung", "Hartstoffschicht",
    "Spritzmoertel", "Spritzbeton",
    "Vergussmoertel", "Vergussbeton",
    "Reparaturmoertel", "Oberflaechenverguetung",
    "Haftbruecken & Grundierungen", "Additive",
}

# Anzeige-Schreibweise mit Umlauten (DB-Originale)
DISPLAY = {
    "Spritzmoertel": "Spritzmörtel",
    "Vergussmoertel": "Vergussmörtel",
    "Reparaturmoertel": "Reparaturmörtel",
    "Oberflaechenverguetung": "Oberflächenvergütung",
    "Haftbruecken & Grundierungen": "Haftbrücken & Grundierungen",
}
def disp(v):
    return DISPLAY.get(v, v)

# --- Hauptsignal: Gewerk (multi-select) -> Produktart -------------------------
# Eindeutige Gewerke (high confidence)
GEWERK_MAP = {
    "Reparaturmoertel": "Reparaturmoertel",
    "Vergussmoertel": "Vergussmoertel",
    "Vergussbeton": "Vergussbeton",
    "Schnellvergussmoertel": "Vergussmoertel",   # SVM-Untergruppe
    "Unterstopfmoertel": "Vergussmoertel",        # USM-Untergruppe
    "Nachbehandlung": "Oberflaechenverguetung",
    "Oberflaechenfinish": "Oberflaechenverguetung",
    "Haftbruecke": "Haftbruecken & Grundierungen",
    "Grundierung": "Haftbruecken & Grundierungen",
    "Additive": "Additive",
    "TW-Sanierung": "Spritzmoertel",              # Microtop TW (Spritz-/Spachtelauftrag)
}
# Mehrdeutige Gewerke -> brauchen Tiebreaker
GEWERK_AMBIG = {"Industrieboden", "Sichtestrich", "Estrich"}

# --- Fallback: kaputter Archiv-Produktart-Wert -> Produktart ------------------
ARCHIV_MAP = {
    "Archiv - Einstreuung": ("Hartstoffeinstreuung", "high"),
    "Archiv - INBO Trockenmoertel": ("Hartstoffeinstreuung", "high"),
    "Archiv - Microtop": ("Spritzmoertel", "medium"),
    "Archiv - Nachbehandlung": ("Oberflaechenverguetung", "high"),
    "Archiv - Impraegnierung/Einpflege": ("Oberflaechenverguetung", "high"),
    "Archiv - Grundierung / Haftbruecke": ("Haftbruecken & Grundierungen", "high"),
    "Archiv - Rapid Set": ("Reparaturmoertel", "medium"),   # Achtung: Additive teilen diesen Wert
    "Archiv - Spezialbaustoffe": ("Vergussmoertel", "low"), # heterogen, Review
    "Archiv - Schnellbetonsysteme": ("Reparaturmoertel", "low"),
}

# Bekannte Additive (teilen sich "Archiv - Rapid Set" mit Reparaturmoerteln)
ADDITIVE_NAMES = {"set control", "flow control", "fast"}


def norm(s):
    return (s or "").strip().lower()


def propose(p):
    """Gibt (proposed, confidence, reason) zurueck."""
    title = (p.get("title") or "").strip()
    current = (p.get("produktart") or "").strip()
    gewerke = [g.strip() for g in (p.get("gewerk") or []) if g.strip()]
    desc = norm(p.get("beschreibung"))
    tl = norm(title)

    # 0) Schon korrekt?
    cur_key = current.replace("ö", "oe").replace("ü", "ue").replace("ä", "ae")
    if cur_key in VALID and not current.startswith("Archiv"):
        return current, "ok", "bereits gueltiger Ontologie-Wert"

    # 1) Additiv-Sonderfall (vor Gewerk/Archiv, da Namens-eindeutig)
    if tl in ADDITIVE_NAMES or "Additive" in gewerke:
        return "Additive", "high", f"Additiv (Gewerk/Name: {title or gewerke})"

    # 2) Eindeutiges Gewerk
    for g in gewerke:
        if g in GEWERK_MAP:
            tgt = GEWERK_MAP[g]
            return tgt, "high", f"Gewerk '{g}'"

    # 3) Mehrdeutiges Gewerk (Industrieboden/Estrich/Sichtestrich) -> Tiebreaker
    if any(g in GEWERK_AMBIG for g in gewerke):
        if "einstreu" in tl or "einstreu" in desc:
            return "Hartstoffeinstreuung", "high", "Gewerk Industrieboden + Einstreuverfahren"
        if "hartstoffschicht" in tl or "hartstoffschicht" in desc:
            return "Hartstoffschicht", "high", "Gewerk Industrieboden + Hartstoffschicht"
        if "spritzbeton" in tl or "spritzbeton" in desc:
            return "Spritzbeton", "medium", "Gewerk + Spritzbeton-Hinweis"
        if {"Sichtestrich", "Estrich"} & set(gewerke):
            return "Hartstoffschicht", "low", "REVIEW: Estrich/Sichtestrich hat keinen eigenen Produktart-Wert"
        # Industrieboden ohne klaren Tiebreaker: Einstreuung ist haeufigster Fall
        return "Hartstoffeinstreuung", "low", "REVIEW: Gewerk Industrieboden, kein Einstreu/Schicht-Tiebreaker"

    # 4) Kein verwertbares Gewerk -> Archiv-Wert-Fallback
    if current in ARCHIV_MAP:
        tgt, conf = ARCHIV_MAP[current]
        # Reparaturmoertel-Fallback nochmal gegen Additiv pruefen
        if tgt == "Reparaturmoertel" and ("additiv" in desc or "verzoegerer" in desc or "beschleuniger" in desc):
            return "Additive", "medium", f"Archiv '{current}', Beschreibung deutet Additiv"
        return tgt, conf, f"Archiv-Wert '{current}'"

    # 5) Nichts greift
    return "", "review", f"REVIEW: kein Signal (Gewerk={gewerke}, current='{current}')"


def load_products():
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "products.json")
    if os.path.exists(path):
        with open(path, encoding="utf-8") as fh:
            return json.load(fh), "products.json"
    return DEMO, "DEMO (9 Produkte, MCP-validiert)"


# 9 Produkte mit voller Datenlage (zur Validierung der Logik)
DEMO = [
    {"title": "NEODUR HE 3", "produktart": "Hartstoffeinstreuung", "gewerk": ["Industrieboden"], "beschreibung": "Trockenbaustoff im Einstreuverfahren"},
    {"title": "NEODUR HE 3 SVS 1,5", "produktart": "Hartstoffeinstreuung", "gewerk": ["Industrieboden"], "beschreibung": "Variante im Einstreuverfahren"},
    {"title": "NEODUR HE 3 metallisch", "produktart": "Hartstoffeinstreuung", "gewerk": ["Industrieboden"], "beschreibung": "metallischer Hartstoffzuschlag, Einstreuverfahren"},
    {"title": "NEODUR HE 3 green", "produktart": "Archiv - INBO Trockenmoertel", "gewerk": ["Industrieboden"], "beschreibung": "CO2-reduziert, Einstreuverfahren, DIN 1100 Gruppe A"},
    {"title": "Rapid Set MORTAR MIX", "produktart": "Archiv - Rapid Set", "gewerk": ["Reparaturmoertel"], "beschreibung": "Schnellreparaturmoertel auf BCSA-Basis"},
    {"title": "NEODUR VM 1", "produktart": "Archiv - Spezialbaustoffe", "gewerk": ["Vergussmoertel"], "beschreibung": "Vergussmoertel fuer Montagen"},
    {"title": "KOROMINERAL CURE", "produktart": "Archiv - Nachbehandlung", "gewerk": ["Nachbehandlung", "Oberflaechenfinish"], "beschreibung": "membranbildendes Nachbehandlungsmittel, Lithiumsilikat"},
    {"title": "SET CONTROL", "produktart": "Archiv - Rapid Set", "gewerk": ["Additive"], "beschreibung": "Verzoegerer-Additiv fuer Rapid Set Moertel"},
    {"title": "FAST", "produktart": "Archiv - Rapid Set", "gewerk": ["Additive"], "beschreibung": "Beschleuniger-Additiv"},
]


def main():
    products, src = load_products()
    rows = []
    for p in products:
        proposed, conf, reason = propose(p)
        rows.append({
            "title": p.get("title", ""),
            "current": p.get("produktart", ""),
            "proposed": disp(proposed),
            "confidence": conf,
            "reason": reason,
        })

    # CSV
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "produktart_proposals.csv")
    with open(out, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=["title", "current", "proposed", "confidence", "reason"])
        w.writeheader()
        w.writerows(rows)

    # Markdown
    print(f"Quelle: {src} | {len(rows)} Produkte\n")
    print("| Produkt | Aktuell | Vorschlag | Conf | Begruendung |")
    print("|---|---|---|---|---|")
    for r in rows:
        print(f"| {r['title']} | {r['current']} | {r['proposed']} | {r['confidence']} | {r['reason']} |")

    # Zusammenfassung
    from collections import Counter
    c = Counter(r["confidence"] for r in rows)
    need = [r for r in rows if r["confidence"] in ("low", "review")]
    print(f"\nConfidence: {dict(c)}")
    print(f"Manuell zu pruefen (low/review): {len(need)}")
    print(f"CSV: {out}")


if __name__ == "__main__":
    main()

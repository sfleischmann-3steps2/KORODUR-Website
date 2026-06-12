#!/usr/bin/env bash
# Gate gegen Alt-Domain-Links im App-Code (Launch-Plan M1/B1, 2026-06-12).
# Jede Journey muss intern enden — www.korodur.de wird abgeschaltet.
# Ausnahme (bewusst):
#   - lib/pdf.ts: Adresszeile im PDF-Footer (Text, kein Link; Domain bleibt unsere)
# E-Mail-Adressen (@korodur.de) sind erlaubt.
set -euo pipefail
cd "$(dirname "$0")/.."

hits=$(grep -rn "www\.korodur\.de\|//korodur\.de" app components lib data \
  --include="*.ts" --include="*.tsx" \
  | grep -v "lib/pdf.ts" \
  | grep -v "^\s*//" \
  | grep -v ":\s*//" || true)

if [ -n "$hits" ]; then
  echo "❌ Alt-Domain-Links im App-Code gefunden (intern verlinken statt www.korodur.de):"
  echo "$hits"
  exit 1
fi
echo "✅ Keine Alt-Domain-Links im App-Code."

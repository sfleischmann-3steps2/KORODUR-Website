#!/usr/bin/env bash
# Startet die lokalen Dev-Server der KORODUR Sanierungs-App.
#   Frontend: Next.js Dev-Server (Port 3000, override: FRONTEND_PORT)
#   Backend:  FastAPI/uvicorn (Port 8000, override: BACKEND_PORT) —
#             startet automatisch mit, sobald backend/main.py existiert.
# Stoppen: ./_stop_server.sh — Logs/PIDs liegen unter .server/ (gitignored).
set -euo pipefail
cd "$(dirname "$0")"

RUN_DIR=".server"
mkdir -p "$RUN_DIR"

FRONTEND_PORT="${FRONTEND_PORT:-3000}"
BACKEND_PORT="${BACKEND_PORT:-8000}"

is_running() {
  [[ -f "$1" ]] && kill -0 "$(cat "$1")" 2>/dev/null
}

wait_for_log() { # $1=logfile $2=pattern $3=name
  for _ in $(seq 1 60); do
    grep -q "$2" "$1" 2>/dev/null && return 0
    sleep 0.5
  done
  echo "WARNUNG: $3 hat sich nach 30 s nicht ready gemeldet — Log prüfen: $1" >&2
  return 1
}

# --- Frontend (Next.js) ---
if is_running "$RUN_DIR/frontend.pid"; then
  echo "Frontend läuft bereits (PID $(cat "$RUN_DIR/frontend.pid")) → http://localhost:$FRONTEND_PORT"
elif lsof -ti tcp:"$FRONTEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "FEHLER: Port $FRONTEND_PORT ist von einem fremden Prozess belegt. Erst ./_stop_server.sh ausführen oder Port freigeben." >&2
  exit 1
else
  echo "Starte Frontend (Next.js) auf Port $FRONTEND_PORT …"
  : > "$RUN_DIR/frontend.log"
  nohup npm run dev -- --port "$FRONTEND_PORT" > "$RUN_DIR/frontend.log" 2>&1 &
  echo $! > "$RUN_DIR/frontend.pid"
  wait_for_log "$RUN_DIR/frontend.log" "Ready" "Frontend" || true
  echo "Frontend → http://localhost:$FRONTEND_PORT"
fi

# --- Backend (FastAPI, optional) ---
if [[ -f backend/main.py ]]; then
  if is_running "$RUN_DIR/backend.pid"; then
    echo "Backend läuft bereits (PID $(cat "$RUN_DIR/backend.pid")) → http://localhost:$BACKEND_PORT"
  elif lsof -ti tcp:"$BACKEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "FEHLER: Port $BACKEND_PORT ist von einem fremden Prozess belegt." >&2
    exit 1
  else
    echo "Starte Backend (FastAPI/uvicorn) auf Port $BACKEND_PORT …"
    : > "$RUN_DIR/backend.log"
    # venv bevorzugen, falls vorhanden
    UVICORN="uvicorn"
    [[ -x backend/.venv/bin/uvicorn ]] && UVICORN="backend/.venv/bin/uvicorn"
    nohup "$UVICORN" main:app --reload --app-dir backend --port "$BACKEND_PORT" > "$RUN_DIR/backend.log" 2>&1 &
    echo $! > "$RUN_DIR/backend.pid"
    wait_for_log "$RUN_DIR/backend.log" "Application startup complete" "Backend" || true
    echo "Backend → http://localhost:$BACKEND_PORT"
  fi
else
  echo "Kein Backend vorhanden (backend/main.py fehlt) — nur Frontend gestartet."
fi

echo "Stoppen mit: ./_stop_server.sh"

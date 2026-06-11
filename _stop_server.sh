#!/usr/bin/env bash
# Fährt die lokalen Dev-Server sauber herunter (Gegenstück zu ./_server.sh).
# Stoppt per PID-File und räumt Nachzügler auf den Ports ab — aber nur
# eigene Dev-Prozesse (next/node bzw. uvicorn/python), nie fremde.
set -uo pipefail
cd "$(dirname "$0")"

RUN_DIR=".server"

stop_one() { # $1=Name $2=PID-File $3=Port $4=Prozess-Muster
  local name="$1" pidfile="$2" port="$3" match="$4"
  local stopped=0

  if [[ -f "$pidfile" ]]; then
    local pid
    pid="$(cat "$pidfile")"
    if kill -0 "$pid" 2>/dev/null; then
      pkill -P "$pid" 2>/dev/null || true
      kill "$pid" 2>/dev/null || true
      stopped=1
    fi
    rm -f "$pidfile"
  fi

  # Nachzügler auf dem Port (z. B. verwaiste next-server-Kinder)
  local p
  for p in $(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null); do
    if ps -p "$p" -o command= | grep -qE "$match"; then
      kill "$p" 2>/dev/null || true
      stopped=1
    fi
  done

  if [[ "$stopped" -eq 1 ]]; then
    echo "$name gestoppt."
  else
    echo "$name lief nicht."
  fi
}

stop_one "Frontend" "$RUN_DIR/frontend.pid" "${FRONTEND_PORT:-3000}" "next|node"
stop_one "Backend"  "$RUN_DIR/backend.pid"  "${BACKEND_PORT:-8000}"  "uvicorn|fastapi|python"

echo "Fertig."

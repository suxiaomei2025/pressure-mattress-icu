#!/usr/bin/env bash
# PressureMattress ICU - end-to-end health probe.
# Verifies dashboard, API liveness, API readiness (DB), and patient query.
set -uo pipefail

DASHBOARD_URL="${DASHBOARD_URL:-http://localhost:8081}"
API_URL="${API_URL:-http://localhost:8080}"

fail=0

check() {
  local label="$1" url="$2"
  if curl -fsS "$url" >/dev/null 2>&1; then
    echo "ok   $label"
  else
    echo "FAIL $label ($url)"
    fail=1
  fi
}

check "dashboard" "$DASHBOARD_URL/"
check "api health" "$API_URL/health"
check "api ready (db)" "$API_URL/ready"

if curl -fsS "$API_URL/api/v1/patients" >/dev/null 2>&1; then
  echo "ok   api patients query"
else
  echo "FAIL api patients query"
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  echo "healthcheck FAILED" >&2
  exit 1
fi
echo "healthcheck OK"

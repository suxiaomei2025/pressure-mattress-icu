#!/usr/bin/env bash
# PressureMattress ICU - docker-compose upgrade helper.
# Pulls the latest images and recreates the stack. The database volume is
# left untouched, so data persists across upgrades.
set -euo pipefail

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"

echo "[upgrade] pulling latest images"
docker compose -f "$COMPOSE_FILE" pull

echo "[upgrade] recreating services"
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

echo "[upgrade] stack status"
docker compose -f "$COMPOSE_FILE" ps

echo "[upgrade] done. For Kubernetes, use:"
echo "  helm upgrade --install pressure-mattress deploy/helm/pressure-mattress --namespace pressure-mattress --create-namespace --reuse-values"

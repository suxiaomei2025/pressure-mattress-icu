#!/usr/bin/env bash
# PressureMattress ICU - database backup (docker-compose deployments).
# Creates a timestamped, compressed pg_dump and prunes old backups.
set -euo pipefail

DB_CONTAINER="${DB_CONTAINER:-pm-db}"
POSTGRES_USER="${POSTGRES_USER:-pressure_mattress}"
POSTGRES_DB="${POSTGRES_DB:-pressure_mattress}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"

mkdir -p "$BACKUP_DIR"

STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_FILE="$BACKUP_DIR/pressure-mattress-$STAMP.dump.gz"

echo "[backup] dumping $POSTGRES_DB from container $DB_CONTAINER -> $OUT_FILE"
docker exec "$DB_CONTAINER" pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -F c | gzip > "$OUT_FILE"

echo "[backup] pruning backups older than $BACKUP_RETENTION_DAYS days"
find "$BACKUP_DIR" -name 'pressure-mattress-*.dump.gz' -mtime "+$BACKUP_RETENTION_DAYS" -delete

echo "[backup] done: $OUT_FILE"

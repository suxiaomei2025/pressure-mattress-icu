#!/usr/bin/env bash
# PressureMattress ICU - restore a database from a backup file.
# Supports custom-format (.dump), plain (.sql), and gzipped plain (.sql.gz).
set -euo pipefail

DB_CONTAINER="${DB_CONTAINER:-pm-db}"
POSTGRES_USER="${POSTGRES_USER:-pressure_mattress}"
POSTGRES_DB="${POSTGRES_DB:-pressure_mattress}"

if [ "$#" -lt 1 ]; then
  echo "usage: $0 <backup-file>"
  echo "  backup-file  path to a .dump, .sql, or .sql.gz"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "error: file not found: $BACKUP_FILE" >&2
  exit 1
fi

case "$BACKUP_FILE" in
  *.dump)
    echo "[restore] restoring custom-format dump: $BACKUP_FILE"
    docker exec -i "$DB_CONTAINER" pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists < "$BACKUP_FILE"
    ;;
  *.gz)
    echo "[restore] restoring gzipped plain SQL: $BACKUP_FILE"
    gunzip -c "$BACKUP_FILE" | docker exec -i "$DB_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
    ;;
  *.sql)
    echo "[restore] restoring plain SQL: $BACKUP_FILE"
    docker exec -i "$DB_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$BACKUP_FILE"
    ;;
  *)
    echo "error: unrecognized backup format (use .dump, .sql, or .sql.gz)" >&2
    exit 1
    ;;
esac

echo "[restore] done"

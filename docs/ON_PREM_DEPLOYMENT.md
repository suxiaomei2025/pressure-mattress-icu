# On-Prem Deployment Guide

This guide covers installing and operating the PressureMattress ICU stack
(API, PostgreSQL, dashboard) in a hospital's on-premises environment.

## Deployment models

| Model            | Tooling              | Best for                                   |
|------------------|----------------------|--------------------------------------------|
| Single host      | Docker Compose       | Pilot sites, small clinics, evaluation      |
| Production       | Kubernetes + Helm    | Hospitals with a cluster and HA requirements|

## Prerequisites

- Docker Engine 24+ (and Docker Compose v2) for single-host installs.
- A Kubernetes cluster (1.24+) with Helm 3 and an Ingress controller for
  production installs.
- Outbound access to the container registry (ghcr.io) to pull images, or a
  local/air-gapped registry mirror.

## Option A: Docker Compose (single host)

```bash
cp .env.example .env
# edit .env and set POSTGRES_PASSWORD

docker compose up -d --build
docker compose ps
```

- Dashboard: http://localhost:8081
- API: http://localhost:8080 (health: /health, readiness: /ready)

The PostgreSQL data persists in the `db-data` named volume. The database is
initialised on first boot from `db/init/001_schema.sql` and seeded with demo
data from `db/init/002_seed.sql` (remove the seed for production).

## Option B: Kubernetes (Helm)

### 1. Push the container images

Build and push the API and dashboard images to your registry (the included
CI workflow in `.github/workflows/build-images.yml` automates this to GHCR):

```bash
docker build -t ghcr.io/suxiaomei2025/pressure-mattress-api:1.0.0 ./api
docker build -t ghcr.io/suxiaomei2025/pressure-mattress-dashboard:1.0.0 ./dashboard
docker push ghcr.io/suxiaomei2025/pressure-mattress-api:1.0.0
docker push ghcr.io/suxiaomei2025/pressure-mattress-dashboard:1.0.0
```

### 2. Install with Helm

```bash
cp deploy/helm/pressure-mattress/values-prod.example.yaml values-prod.yaml
# edit values-prod.yaml (image tags, ingress host, storage class)

helm upgrade --install pressure-mattress deploy/helm/pressure-mattress \
  --namespace pressure-mattress --create-namespace \
  --set postgres.password="$(openssl rand -base64 32)" \
  --values values-prod.yaml
```

### 3. Verify

```bash
kubectl get pods -n pressure-mattress
kubectl get svc -n pressure-mattress
kubectl port-forward -n pressure-mattress svc/dashboard 8081:80
```

## Configuration

Configuration flows through environment variables, which the Helm chart maps
from a ConfigMap (non-secret) and a Secret (passwords):

| Scope    | Resource               | Contents                                |
|----------|------------------------|-----------------------------------------|
| Non-secret | ConfigMap `pm-config`  | DB name, DB user, API port, log level   |
| Secret   | Secret `pm-secrets`    | `POSTGRES_PASSWORD`                     |
| DB init  | ConfigMap `postgres-initdb` | `001_schema.sql` (first-boot schema) |

The API derives its `DATABASE_URL` at runtime from the Secret, so the plaintext
password never appears in the Deployment spec.

## Backups

Scheduled backups run as a Kubernetes CronJob (`backup.enabled: true`) using
`pg_dump` into a dedicated PVC, with retention pruning. For single-host
installs, use the shell scripts:

```bash
scripts/backup.sh    # create a timestamped dump
scripts/restore.sh   # restore from a dump
```

Store backups off-host (e.g. copy the dump to an encrypted network share or
object store) so a host failure does not destroy the backups too.

## Upgrades

- Compose: `scripts/upgrade.sh` pulls new images and recreates the stack; the
  database volume is untouched.
- Kubernetes: `helm upgrade --install ... --reuse-values` (or with an updated
  values file). Apply any schema migrations before rolling the API, and scale
  the API to multiple replicas for zero-downtime.

## Rollback

- Compose: pin the previous image tags and `docker compose up -d`.
- Kubernetes: `helm rollback pressure-mattress <revision>`. Restore the
  database from the most recent backup if a migration was destructive.

## Troubleshooting

| Symptom                    | Check                                        |
|----------------------------|----------------------------------------------|
| Dashboard shows "offline"  | `curl -fsS http://localhost:8080/health`      |
| API returns 503 on /ready  | DB connectivity: `docker compose logs db`     |
| Pod stuck in CrashLoop     | `kubectl logs -n pressure-mattress <pod>`    |
| Init schema not applied    | Only runs on an empty data dir (first boot)  |

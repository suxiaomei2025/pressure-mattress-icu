# PressureMattress ICU - On-Prem Deployment Package

Containerized deployment for the **PressureMattress ICU (护卧康 ICU床垫海外版)**
application stack - **API**, **PostgreSQL database**, and **clinician dashboard** -
for on-premises hospital installs where cloud hosting is not permitted.

This package delivers reproducible environments through Docker images, a
docker-compose development stack, and production Helm charts for Kubernetes.
All configuration is driven by environment variables and ConfigMaps, with
backup and upgrade automation included.

## Services

| Service     | Technology                     | Container port | Description                                          |
|-------------|--------------------------------|----------------|------------------------------------------------------|
| api         | Node.js 20 + Express           | 8080           | REST API: health, readiness, patient/risk data       |
| db          | PostgreSQL 16 (Alpine)         | 5432           | Beds, patients, sensors, and alerts relational store |
| dashboard   | Static HTML/JS served by nginx | 80             | Clinician risk overview; proxies /api and /health    |

## Repository layout

```
.
|-- api/                     # API service (Express + pg)
|   |-- Dockerfile
|   |-- package.json
|   `-- server.js
|-- db/
|   `-- init/                # PostgreSQL schema + seed (runs on first boot)
|-- dashboard/               # Static dashboard served by nginx
|   |-- Dockerfile
|   |-- nginx.conf
|   `-- public/
|-- deploy/
|   |-- docker-compose.yml   # Dev stack (also referenced at repo root)
|   `-- helm/
|       `-- pressure-mattress/   # Production Helm chart
|-- scripts/                 # backup / restore / upgrade / healthcheck
|-- docs/                    # On-prem deployment + security guides
|-- .github/workflows/       # Optional image build CI
|-- docker-compose.yml       # Root dev stack entry point
`-- .env.example             # Environment variable reference
```

## Quick start (docker-compose)

```bash
cp .env.example .env
# edit .env and set POSTGRES_PASSWORD (and other secrets)

docker compose up -d --build
```

Open the dashboard at http://localhost:8081 (API is also exposed on :8080).

Check the stack:

```bash
docker compose ps
curl http://localhost:8080/health
curl http://localhost:8080/ready
```

## Configuration

Configuration is injected exclusively through environment variables. See
[.env.example](.env.example) for the full reference. Key variables:

| Variable               | Service   | Purpose                                   |
|------------------------|-----------|-------------------------------------------|
| POSTGRES_USER          | db        | Database user                             |
| POSTGRES_PASSWORD      | db        | Database password (secret)                |
| POSTGRES_DB            | db        | Database name                             |
| DATABASE_URL           | api       | Connection string the API uses            |
| API_PORT               | api       | Host port for the API in compose          |
| DASHBOARD_PORT         | dashboard | Host port for the dashboard in compose    |
| BACKUP_DIR             | scripts   | Where backups are written                 |
| BACKUP_RETENTION_DAYS  | scripts   | How many days of backups to keep          |

## Kubernetes (Helm)

Production installs target Kubernetes via the Helm chart in
deploy/helm/pressure-mattress. See
[docs/ON_PREM_DEPLOYMENT.md](docs/ON_PREM_DEPLOYMENT.md) for the full walkthrough.

```bash
helm upgrade --install pressure-mattress deploy/helm/pressure-mattress   --namespace pressure-mattress --create-namespace   --set postgres.password="$(openssl rand -base64 32)"   --values deploy/helm/pressure-mattress/values-prod.example.yaml
```

## Backup & restore

- scripts/backup.sh - pg_dump a timestamped, compressed dump with retention rotation.
- scripts/restore.sh - restore a database from a dump file.
- scripts/upgrade.sh - rolling upgrade for docker-compose (image pull + recreate).
- scripts/healthcheck.sh - end-to-end health probe of the running stack.

## Security

This is a **safety-adjacent, patient-data** application. See
[docs/SECURITY.md](docs/SECURITY.md) for the on-prem hardening checklist
(encryption at rest/in transit, least-privilege DB users, secrets management,
audit logging, and network isolation).

## Related docs

- [On-prem deployment guide](docs/ON_PREM_DEPLOYMENT.md)
- [Security hardening](docs/SECURITY.md)

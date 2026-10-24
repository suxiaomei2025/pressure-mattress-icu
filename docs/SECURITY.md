# Security & Compliance Hardening

PressureMattress ICU processes patient data and is a safety-adjacent system.
Treat every deployment as production from day one. This checklist maps to the
HIPAA/GDPR-aligned requirements identified in product research.

## 1. Encryption

- **In transit**: terminate TLS at the Ingress (see `values-prod.example.yaml`).
  For compose, front the dashboard with a TLS-terminating reverse proxy.
- **At rest**: enable volume encryption on the DB and backup PVCs
  (StorageClass with encrypted volumes, LUKS, or encrypted object storage).

## 2. Secrets management

- Never commit secrets. The chart requires `postgres.password` via `--set` or
  a values file outside git.
- Prefer a KMS-backed secret manager (Sealed Secrets, External Secrets, Vault)
  over plain `kubectl` Secrets in highly regulated sites.
- Rotate the DB password on a schedule; re-encrypt backups on rotation.

## 3. Least privilege

- The API and dashboard containers run as non-root users (already configured in
  their Dockerfiles).
- Run the DB with a dedicated, scoped user, not the superuser, for application
  traffic (see `db/init` for the schema; add an application role per site).
- Restrict the `db` Service with a `NetworkPolicy` so only the API can reach
  PostgreSQL.

## 4. Audit logging & RBAC

- Enable structured, non-PII logging (the API already emits JSON logs).
- Ship logs to a central, access-controlled sink.
- Enable PostgreSQL audit logging (`log_statement`, `pgaudit`) for access and
  change tracking.

## 5. Network isolation

- Deploy the stack in its own namespace with restrictive NetworkPolicies.
- Do not expose the API or DB directly; route traffic only through the
  dashboard Ingress.

## 6. Image & supply-chain security

- Pin image digests (not just tags) for reproducible, verifiable deployments.
- Scan images (Trivy, Grype, or GitHub Dependabot/CodeQL) in CI; the included
  build workflow is the integration point.
- Keep base images updated (node:20-alpine, nginx:1.27-alpine, postgres:16-alpine).

## 7. Backups & disaster recovery

- Test restores regularly (`scripts/restore.sh`); an untested backup is not a
  backup.
- Encrypt backups and store them off-host with retention aligned to hospital
  policy (e.g. 30 days on-site, long-term archive).

## 8. Clinical safety

- This scaffold is a deployment reference, not a validated medical device.
- Software that informs clinical decisions may be subject to FDA SaMD
  guidance and requires a documented risk/validation process before clinical
  use.

# Design: Anonymized Usage Telemetry & Analytics

## 1. Goals

1. Measure **feature usage**, **device performance**, and **dashboard engagement**.
2. Never exfiltrate PII or PHI — deny by default, allowlist explicitly.
3. Provide **consent and anonymization controls** that satisfy HIPAA/GDPR posture and are
   defensible to hospital procurement/security reviews.
4. Use **self-hosted** analytics so patient/facility data never touches a third-party processor.

## 2. Non-goals

- No patient clinical data (pressure-ulcer risk scores, turning schedules, sensor raw
  time series) is collected by this telemetry layer. That data belongs to the clinical
  data path with separate access controls.
- No cross-session user tracking for advertising. There is no ad/third-party cookie path.
- No server-side logs of identifiers; the collector is configured to drop (not store)
  unknown identifier-shaped fields.

## 3. Threat model & risks

| Risk | Mitigation |
|------|-----------|
| **PHI leakage in logs/events** (top risk) | Unconditional scrubber + allowlist field policy; JSON Schema *denies* additionalProperties for known events; collector-side drop of unknown fields. |
| **Re-identification via device/session IDs** | HMAC pseudonymization with rotating salt; raw IDs never serialized. |
| **Consent / data governance** | Three-tier consent (`off`/`anonymized`/`full`), persisted, revocable, with queue wipe on revocation. |
| **Cross-tenant leakage (multi-facility SaaS)** | `facilityId` is pseudonymized; aggregate reports are tenant-scoped; no facility name/address. |
| **Ingest-token compromise** | Write-only ingest token (PostHog project API key pattern); token never in client bundle for web — served server-side or via short-lived session. |
| **Traffic interception** | HTTPS only; transport refuses `http://` endpoints in production. |

### PHI categories treated as deny-by-default (HIPAA 18 identifiers)

Names, geographic subdivisions smaller than state, all date elements (except year) directly
related to an individual, phone/fax, email, SSN/IDs, medical record numbers, health plan
beneficiary numbers, account numbers, certificate/license numbers, vehicle identifiers &
serial numbers, device identifiers, URLs/IPs, biometric identifiers, full-face photos, any
other unique identifying code. The scrubber maps each of these to a redaction or
pseudonymization rule.

## 4. Architecture

```text
App code (web dashboard / edge bridge)
        │ trackFeature / trackDevicePerformance / trackDashboardEngagement
        ▼
TelemetryClient ──► Scrubber (allowlist + redact + pseudonymize)
        │                │
        │                ▼
        │         Anonymizer (HMAC-SHA256 with rotating salt)
        │
        ▼
Queue (bounded, batched, flush on interval + beforeunload)
        │
        ▼
Transport ──► PostHog self-hosted / custom HTTPS collector
                    │
                    ▼
              Aggregation / ROI dashboards (tenant-scoped, no PHI)
```

## 5. Event schema principles

- Versioned (`schemaVersion` on every event).
- Required envelope: `eventId`, `event`, `schemaVersion`, `sentAt`, `consentTier`.
- No `additionalProperties` on concrete event types.
- All dimensions are either enum/bounded numeric or explicitly pseudonymized strings.

## 6. Anonymization details

- `anonymize(value, salt)` = HMAC-SHA256(`value`, `salt`), truncated, hex/base62.
- Salt rotation: configurable `saltRotationDays`; client keeps only the current salt
  epoch. Old salts are not retained client-side, which breaks longitudinal join across
  rotation — intentional, to limit re-identification.
- Counts/latencies/durations are aggregate-safe (bounded ranges, no free text).

## 7. Tradeoffs

- **Anonymization reduces analytical depth** (no per-user funnels across sessions). Accepted
  in exchange for regulatory defensibility; ROI reporting works on aggregate engagement.
- **Self-hosted PostHog adds ops burden** vs. SaaS PostHog. Accepted: data sovereignty for
  a clinical product outweighs convenience.
- **Drop-on-unknown-field** may lose future signal until schema is extended. Accepted:
  safe default; schema extension is a deliberate, reviewed change.

## 8. ROI framing for buyers

- **Feature adoption** → development resources follow what clinicians actually use.
- **Reliability metrics** (latency, reconnect, battery) → uptime SLAs and procurement wins.
- **Engagement** (sessions, dwell, feature depth) → demonstrate value and justify expansion.

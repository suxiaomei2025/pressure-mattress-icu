# Anonymized Usage Telemetry & Analytics

Privacy-preserving telemetry instrumentation for **PressureMattress ICU Overseas SaaS**
(护卧康 ICU 床垫海外版). Measures feature usage, device performance, and dashboard
engagement — while scrubbing all PII/PHI before anything leaves the device — to inform
prioritization and demonstrate ROI to buyers.

> **Task ID:** 143c8ed2-4982-4abc-869d-cd2fcf9d11da
> **Idea:** Anonymized Usage Telemetry and Analytics (43e4aa30-58e4-4c41-834c-83f53274dc6a)

## What this is

A dependency-light, framework-agnostic telemetry SDK plus a documented event schema and a
self-hosted backend (PostHog) configuration. It is designed for a **clinical/ICU** context,
so the design is conservative by default:

- **Deny-by-default PII/PHI scrubbing** — every event passes through a scrubber that
  redacts and pseudonymizes identifiers before serialization. No raw patient, nurse, or
  facility identifiers ever leave the client.
- **Explicit consent tiers** — `off`, `anonymized` (default), `full`. Anonymized is the
  only mode usable in production without an explicit opt-in.
- **Structured, versioned event schema** — JSON Schema in `schema/events.schema.json`.
- **Self-hosted analytics** — PostHog (self-hosted) or any custom HTTPS collector via a
  pluggable transport. No third-party data processor in the default path.

## Repository layout

```text
.
├── README.md                        # this file
├── docs/
│   └── DESIGN.md                    # goals, threat model, risks/tradeoffs, ROI framing
├── schema/
│   └── events.schema.json           # versioned JSON Schema for all telemetry events
├── src/
│   ├── index.js                     # public API
│   ├── client.js                    # TelemetryClient (queue, batching, flush)
│   ├── scrubber.js                  # PII/PHI scrubbing + allow/deny field policy
│   ├── anonymizer.js                # HMAC pseudonymization with rotating salt
│   ├── consent.js                   # consent tiers + persistence + revocation
│   ├── events.js                    # typed event constructors
│   └── transports/
│       └── posthog.js               # PostHog self-hosted transport
├── config/
│   └── posthog/
│       ├── docker-compose.yml       # self-hosted PostHog stack
│       └── .env.example             # collector settings (no secrets checked in)
└── test/
    └── scrubber.test.js             # scrubbing/anonymization unit tests (no framework)
```

## Quickstart

```js
const { TelemetryClient } = require('./src');

const telemetry = new TelemetryClient({
  consent: 'anonymized',           // off | anonymized | full
  transport: 'posthog',
  endpoint: process.env.TELEMETRY_ENDPOINT,
  apiKey: process.env.TELEMETRY_API_KEY,   // project key; write-only ingest token
  salt: process.env.TELEMETRY_SALT,        // rotating HMAC salt for pseudonymization
  flushIntervalMs: 10_000,
  maxQueue: 250,
});

telemetry.trackFeature('dashboard.pressureMap.view', { screen: 'nurseStation' });
telemetry.trackDevicePerformance({ sensorLatencyMs: 42, batteryLevel: 0.87 });
telemetry.trackDashboardEngagement({ page: '/beds', durationMs: 24_000 });

telemetry.flush();          // force send
telemetry.setConsent('off'); // user/administrator revocation — wipes queue immediately
```

## Consent model

| Tier         | What is captured                                  | Default in prod |
|--------------|---------------------------------------------------|-----------------|
| `off`        | nothing; queue is dropped and no data is sent     | —               |
| `anonymized` | feature usage, device perf, dashboard engagement  | ✅              |
| `full`       | anonymized + optional non-PHI attributes          | opt-in only     |

`full` still never includes protected health information (PHI). The scrubber is
unconditional — consent widens *which event classes* are captured, not *whether*
identifiers are stripped.

## Why this matters for the product

- **Prioritization:** objective feature-usage and engagement data replaces guesswork.
- **Device performance:** real-world latency/battery/reconnect metrics from ICU mattresses
  and sensor bridges, without device serial numbers.
- **Buyer ROI:** aggregate engagement and reliability reports for procurement without
  exposing any individual patient, clinician, or facility.

See `docs/DESIGN.md` for the full threat model, risks, and tradeoffs.

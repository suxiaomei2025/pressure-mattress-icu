# PressureMattress ICU — Product Specification

> **护卧康 ICU 床垫 · Overseas Edition**
> Smart pressure-mattress system for ICU patients: pressure-injury prevention, continuous sensor monitoring, and SaaS-enabled clinical workflow.

**Status:** Draft v1.0 — for stakeholder review
**Owner:** Product program (Builder Agent)
**Related task:** `26f0626f-3dc4-4bf1-a0c0-12b4d6449180`

---

## 1. Purpose

PressureMattress ICU is a software-first, sensor-augmented pressure-relief mattress platform for intensive care. It addresses the leading preventable harm in ICU — hospital-acquired pressure injuries (pressure ulcers) — by turning a passive mattress into a continuous monitoring and decision-support surface.

The platform has three layers:

1. **Hardware/sensor layer** — the pressure-redistribution mattress with a flexible pressure-mapping sensor array (piezoresistive mats) and optional retrofit kits for existing mattresses.
2. **Edge/software layer** — on-device risk scoring, turn-and-reposition detection, and secure sensor-stream capture.
3. **Cloud/SaaS layer** — a clinician-facing dashboard, EHR interoperability (HL7/FHIR), alerting, analytics, and fleet management for hospital biomedical engineering and procurement teams.

---

## 2. Primary Personas

### 2.1 ICU Nurse — *"The Clinician at the Bedside"*

**Who they are:** Registered nurse working 8–12 hour shifts in an adult or pediatric ICU. Manages 1–2 critically ill, often sedated or immobile patients. Overloaded with documentation, alarms, and competing priorities.

**Traits:** Time-poor, high-stress environment, safety-obsessed, low tolerance for alert fatigue, values anything that reduces manual charting and "turn schedule" guesswork.

**Primary goal:** Prevent pressure injuries on their patients and document compliance without adding workload.

**Core needs:**
- See at-a-glance whether each patient is at risk *right now* and whether they are overdue for a turn.
- Receive *high-signal* alerts only (escalation, not noise).
- Auto-document turn/reposition events to reduce manual charting.
- Trust that the system works in a fast, gloves-on, visually noisy environment (WCAG-accessible, large type, high contrast).

### 2.2 Biomedical Engineer — *"The Device Steward"*

**Who they are:** Hospital biomedical / clinical engineering staff responsible for device fleet integrity, connectivity, calibration, firmware updates, and regulatory compliance. Evaluates new technology for safety, interoperability, and total cost of ownership.

**Traits:** Technical, risk-averse, standards-driven (IEC 62304, ISO 14971, FDA SaMD guidance), cares about uptime, auditability, and data security (HIPAA/GDPR).

**Primary goal:** Keep the mattress fleet safe, compliant, connected, and cheap to operate.

**Core needs:**
- Fleet health: which mattresses are online, degraded, or in need of service.
- Firmware/software update management and rollback.
- Audit logs and access controls proving data governance and regulatory compliance.
- Clear integration path into the hospital network and EHR without fragile bespoke code.

### 2.3 Procurement / Hospital Administrator — *"The Buyer & Value Owner"*

**Who they are:** Procurement lead, supply-chain director, or value-analysis committee member evaluating whether to purchase/adopt the system across a hospital or health system.

**Traits:** Cost- and outcome-driven, compares against incumbent devices (Hill-Rom/Baxter, Stryker, Arjo/Getinge, Medline), needs evidence and ROI, sensitive to lock-in.

**Primary goal:** Reduce pressure-injury incidence and associated costs while getting interoperable, non-lock-in technology.

**Core needs:**
- Clear ROI narrative: pressure-injury reduction → cost savings and quality-metric improvement.
- Evidence and analytics exports (usage, compliance, outcomes).
- Interoperability guarantees (FHIR/HL7) so the product plugs into existing EHR rather than creating a silo.
- Predictable pricing and no vendor lock-in for the data they generate.

---

## 3. Jobs-to-be-Done (JTBD)

Each job is phrased as "When I am ___, I want to ___, so that I can ___."

### ICU Nurse
| # | Job | Motivation |
|---|-----|-----------|
| N1 | When I am caring for an immobile ICU patient, I want to **know their current pressure-ulcer risk and turning status at a glance**, so that I can intervene before tissue damage occurs. |
| N2 | When I reposition a patient, I want the event **auto-logged to the record**, so that I don't spend shift time on manual charting. |
| N3 | When a patient's risk changes, I want a **single high-confidence alert** (not a flood), so that I can act without alert fatigue. |
| N4 | When I hand off to the next shift, I want a **clear status summary**, so that continuity of care is maintained. |

### Biomedical Engineer
| # | Job | Motivation |
|---|-----|-----------|
| B1 | When I onboard a new device, I want **plug-and-play connectivity and provisioning**, so that deployment doesn't require custom engineering per unit. |
| B2 | When a mattress degrades or goes offline, I want **proactive fleet alerts and diagnostics**, so that I can service it before it affects a patient. |
| B3 | When an audit or regulator asks, I want **complete access logs, version history, and data-governance evidence**, so that we stay compliant with HIPAA/GDPR and SaMD expectations. |
| B4 | When new firmware is released, I want **controlled, rollback-able updates**, so that I can deploy without downtime risk. |

### Procurement / Administrator
| # | Job | Motivation |
|---|-----|-----------|
| P1 | When evaluating options, I want a **clear outcome/ROI case backed by data**, so that I can justify the purchase to the value-analysis committee. |
| P2 | When adopting a system, I want **FHIR/HL7 interoperability with our EHR**, so that we don't create another data silo. |
| P3 | When operating the fleet, I want **usage, compliance, and outcome analytics**, so that I can report quality metrics (e.g., HAPI rates) and optimize spend. |
| P4 | When contracts renew, I want **ownership/export of our data**, so that we avoid vendor lock-in. |

---

## 4. Success Metrics

### 4.1 Clinical / Outcome Metrics (North Star)
- **HAPI reduction:** % reduction in hospital-acquired pressure injuries (stage II+) on monitored units vs. baseline. *(Target: ≥ 30% within 12 months of adoption.)*
- **Turn-compliance rate:** % of prescribed repositioning events completed on schedule. *(Target: ≥ 90%.)*
- **Documentation accuracy:** % of turn events auto-captured without manual entry. *(Target: ≥ 95%.)*

### 4.2 Clinician Experience Metrics
- **Alert precision:** ratio of actionable alerts to total alerts (minimize alert fatigue). *(Target: positive predictive value ≥ 70%.)*
- **Time-to-task:** reduction in nurse time spent on manual pressure-injury charting. *(Target: ≥ 20 min/shift.)*
- **Task completion:** % of nurses able to answer "is my patient overdue?" in ≤ 5 seconds.

### 4.3 Device / Platform Metrics
- **Fleet uptime:** % of deployed devices reporting healthy status. *(Target: ≥ 99%.)*
- **Mean time to detection:** time from sensor anomaly to fleet/clinical alert.
- **Update success rate:** % of firmware updates applied without rollback. *(Target: ≥ 99%.)*

### 4.4 Business Metrics
- **Adoption:** # of beds/mattresses deployed; # of hospital accounts.
- **Retention:** account retention rate and expansion (beds per account).
- **Interoperability:** # of EHR integrations live (Epic, Cerner, others via FHIR).

### 4.5 Guardrail Metrics (must not regress)
- **Data security:** zero unauthenticated access events; 100% audit coverage of PHI access.
- **Compliance posture:** HIPAA (BAA) and GDPR alignment maintained; SaMD regulatory status clearly defined.

---

## 5. Scope Boundaries

### In scope (v1)
- Pressure-mapping sensor data capture and secure transmission.
- On-device/edge risk scoring and turn/reposition detection.
- Clinician dashboard: unit-level and patient-level risk status, turning schedules, and alerts.
- Fleet management for biomedical engineers (device status, diagnostics, updates).
- FHIR/HL7 integration for documentation (turn events, risk scores).
- Role-based access control (RBAC) and audit logging.
- Analytics/export for procurement and quality reporting.

### Out of scope (v1)
- **Diagnostic medical device claim:** v1 is *decision support*, not a diagnostic/treatment device. It does not independently diagnose or prescribe; it augments clinical judgment. Regulatory classification (FDA SaMD, EU MDR) must be explicitly resolved before any diagnostic positioning.
- **E-commerce / direct-to-consumer sales site:** out of scope for the product program (separate concern).
- **Replacement of nurse judgment:** the system escalates risk; the clinician remains the decision-maker.
- **Non-ICU settings** (long-term care, home care) — deferred, not dismissed.
- **Hardware design ownership:** the product program assumes sensor/hardware exists or is sourced; firmware/software is the focus. Retrofit kits for third-party mattresses are a stretch goal.

### Explicit non-goals
- No patient-facing billing or claims processing.
- No replacement of existing nurse-call systems (integrate, don't duplicate).
- No telemetry that is not anonymized + consented; patient data never leaves compliant boundaries.

---

## 6. Architecture Overview

```
┌───────────────────────────┐
│  Mattress + Sensor Array   │  piezoresistive pressure-mapping mat
│  (pressure / occupancy)    │
└────────────┬──────────────┘
             │ BLE / serial bridge (edge gateway)
             ▼
┌───────────────────────────┐
│  Edge Runtime (on-device) │  risk scoring (Edge ML: TFLite/ONNX),
│  capture · detect · score │  turn/reposition detection, buffering
└────────────┬──────────────┘
             │ encrypted stream (TLS 1.2+)
             ▼
┌───────────────────────────┐
│  SaaS Backend (cloud)     │  HIPAA-compliant host (AWS/GCP + BAA)
│  API · ingest · store     │  time-series store (TimescaleDB/InfluxDB)
│  RBAC · audit · alerts    │  FHIR/HL7 gateway (HAPI FHIR)
└────────────┬──────────────┘
             │
    ┌────────┴────────┐
    ▼                 ▼
┌──────────────┐  ┌──────────────────────┐
│ Nurse        │  │ EHR / Nurse-call     │
│ Dashboard    │  │ (Epic, Cerner, …)    │
└──────────────┘  └──────────────────────┘
```

**Key principles:**
- **Security & privacy by default:** encryption at rest and in transit, RBAC, immutable audit logs, PHI minimization.
- **Edge-first resilience:** scoring and detection run on-device so core safety features do not depend on cloud availability; the cloud adds fleet, analytics, and EHR integration.
- **Standards-based interoperability:** FHIR R4 / HL7 v2 rather than bespoke integrations.
- **Accessibility (WCAG 2.1 AA):** dashboards are usable in high-stress, visually noisy ICU environments.
- **Containerized deployment:** Docker for reproducible, on-prem-friendly hospital installs.

**Proposed stack (to be validated):**
- Backend: Node.js/TypeScript service; REST + WebSocket for real-time dashboard.
- Time-series: TimescaleDB or InfluxDB.
- Edge ML: TensorFlow Lite / ONNX Runtime.
- EHR: HAPI FHIR, fhir.js; SMART-on-FHIR for app launch inside Epic/Cerner.
- Frontend: React + Recharts/uPlot for real-time charts.
- Infra: Docker, CI/CD with SAST + Dependabot.

---

## 7. Roadmap

### Phase 0 — Foundation (now)
- [ ] Approve this spec with stakeholders (nurse, biomed, procurement).
- [ ] Define SaMD regulatory classification path (decision-support vs. diagnostic).
- [ ] Confirm sensor/hardware sourcing and retrofit-kit feasibility.
- [ ] Set up CI/CD, security scanning, and containerized dev environment.

### Phase 1 — MVP (clinical signal)
- [ ] Sensor data ingestion + edge risk scoring (first model).
- [ ] Clinician dashboard: unit + patient risk status, turning schedules.
- [ ] Turn/reposition detection and auto-logging.
- [ ] RBAC + audit logging baseline.
- [ ] Fleet health basics (device online/degraded/offline).

### Phase 2 — Integration & evidence
- [ ] FHIR/HL7 documentation of turn events and risk scores.
- [ ] Nurse-call system escalation integration.
- [ ] Analytics/export for procurement & quality reporting.
- [ ] Alert-precision tuning to combat fatigue.
- [ ] Predictive risk analytics (time-series, edge ML v2).

### Phase 3 — Scale
- [ ] Retrofit kits for third-party mattresses.
- [ ] SMART-on-FHIR app launch inside Epic/Cerner.
- [ ] Multi-site fleet management and benchmarking.
- [ ] Digital-twin positioning for simulation/training (research).

---

## 8. Risks & Tradeoffs

| Risk | Mitigation |
|------|-----------|
| **Stakeholder alignment delays** (three very different personas) | Validate this spec in a structured review; assign a single product owner to arbitrate. |
| **Documentation drift** from the codebase | Treat PRODUCT.md and README as living docs; review on each release. |
| **Alert fatigue** undermines nurse trust | Precision-first alerting; tune thresholds with clinician feedback loops. |
| **Regulatory ambiguity** (SaMD vs. decision support) | Resolve classification explicitly before clinical claims; keep v1 clearly non-diagnostic. |
| **Data security/compliance** (HIPAA/GDPR) | Security by default; BAA with cloud provider; immutable audit logs. |
| **EHR integration fragility** | Standards-based FHIR/HL7; avoid per-customer bespoke code. |
| **Edge vs. cloud availability** | Core safety scoring on-device; cloud for non-safety features. |

---

## 9. Open Questions for Stakeholders

1. Is v1 positioned as **decision support** (non-diagnostic) or do we intend a regulated **SaMD** claim? This determines the entire compliance path.
2. Do we **own the sensor/hardware** or is the program **software-only** on sourced/retrofitted mattresses?
3. Which EHRs must we support first (Epic, Cerner, others)?
4. What is the **target HAPI-reduction** we commit to in pilots?
5. Is the **overseas edition** primarily US (HIPAA), EU (GDPR/MDR), or both — and does that change the regulatory roadmap?

---

*This document is a living spec. Revisions should be logged and reviewed with stakeholders at each phase gate.*

# 03 — Software Lifecycle Documentation (IEC 62304:2006 + A1:2015)

**Document type:** Draft software lifecycle documentation framework
**Version:** 0.1 (draft)
**Owner:** Software Engineering / Quality team
**Status:** Draft — map to the actual SDLC in this repository
**Standard:** IEC 62304:2006 + A1:2015

---

## 1. Purpose

This document defines the software development lifecycle framework for the PressureMattress
护卧康 software that must satisfy IEC 62304. It maps required processes and artifacts to this
repository and identifies what is missing.

## 2. Software Safety Classification

Per IEC 62304 §4.3, the software system is classified based on the severity of harm that could
result from a hazardous situation caused by the software system:

| Candidate software item | Function | Preliminary class | Rationale |
|-------------------------|----------|-------------------|-----------|
| Risk-scoring engine | Pressure-injury risk scoring | **Class C** (draft) | Failure could lead to serious injury (missed/incorrect risk → delayed intervention) |
| Turn-reminder / alerting service | Repositioning reminders | **Class C** (draft) | Failure to alert could delay turning → serious harm |
| Dashboard / UI | Clinician visualization | **Class B** (draft) | Misinterpretation could lead to inappropriate action; secondary to decision-making |
| Sensor data acquisition firmware | Raw pressure capture | **Class B** (draft) | Erroneous data propagates to risk score |
| EHR bridge (FHIR) | Event documentation | **Class A** (draft) | Documentation error; lower severity, but verify |

> `[TODO] Finalize classification with the risk file (§4 of 02-risk-management). If any Class C
> item is confirmed, the full Class C documentation set (detailed design, exhaustive
> verification) applies. Consider whether the risk-scoring engine can be credibly classified
> Class B if the system is positioned as strictly "advisory/informational."`

## 3. Required Processes & Artifacts (IEC 62304 mapping)

| IEC 62304 § | Process | Required artifact | Status in this repo |
|-------------|---------|-------------------|---------------------|
| 5.1 | Development planning | Software Development Plan (SDP) | `[TODO]` |
| 5.2 | Requirements analysis | Software Requirements Specification (SRS) | `[TODO]` |
| 5.3 | Architectural design | Software Architecture Document | `[TODO]` |
| 5.4 | Detailed design (Class B/C) | Detailed Design (per software unit) | `[TODO]` |
| 5.5 | Software unit implementation & verification | Unit test records | `[TODO]` |
| 5.6 | Integration & integration testing | Integration test records | `[TODO]` |
| 5.7 | System testing | System test protocol/report | `[TODO]` |
| 5.8 | Release | Release records | `[TODO]` |
| 6 | Maintenance | Maintenance plan, problem reports | `[TODO]` |
| 7 | Risk management (interface to ISO 14971) | Traceability to risk controls | See 02 doc |
| 8 | Configuration management | CM plan, version records | `[TODO]` |
| 9 | Problem resolution | Problem reports, CAPA linkage | `[TODO]` |

## 4. Software Development Plan (SDP) — Template Outline

1. Scope & software safety class.
2. Lifecycle model (recommend V-model with iterative CI/CD for non-safety UI, waterfall for
   safety-classified risk engine).
3. Deliverables & milestones.
4. Tooling (issue tracker, CI/CD, static analysis, test framework).
5. Verification & validation strategy.
6. SOUP management.
7. Configuration & change management.
8. Defect management & escalation.
9. Traceability strategy (requirements ↔ design ↔ code ↔ tests ↔ risks).

## 5. Software Requirements (SRS) — Draft Requirements (representative)

| ID | Requirement | Safety-relevant? |
|----|-------------|------------------|
| SRS-001 | System shall acquire pressure-sensor data at ≥ 1 Hz per zone | Yes |
| SRS-002 | System shall compute a pressure-injury risk score using [algorithm `[TODO]`] | Yes |
| SRS-003 | Risk score shall be labeled "advisory — confirm clinically" | Yes |
| SRS-004 | System shall issue repositioning reminders per configurable protocol | Yes |
| SRS-005 | System shall retain last N hours of data locally on connectivity loss | Yes |
| SRS-006 | System shall require clinician confirmation of patient ID pairing | Yes |
| SRS-007 | System shall encrypt data in transit (TLS ≥ 1.2) and at rest (AES-256) | Yes |
| SRS-008 | System shall log all alert generation/acknowledgment events (audit trail) | Yes |
| SRS-009 | System shall integrate with EHR via HL7/FHIR R4 | No (verify) |
| SRS-010 | System shall provide role-based access control (RBAC) | Yes |

> `[TODO] Expand into a full, verifiable, testable SRS.`

## 6. Software Architecture — Draft (reference)

- **Edge/firmware layer:** sensor array driver, local aggregation, connectivity fallback buffer.
- **Gateway layer:** BLE/serial bridge, store-and-forward, device identity.
- **Cloud/service layer:** ingestion, risk-scoring engine (containerized, versioned), alerting,
  EHR bridge, API.
- **Presentation layer:** clinician dashboard, mobile views, family transparency (read-only).
- **Security boundary:** every layer — encryption, RBAC, audit, SBOM.

## 7. Verification & Validation Strategy

| Level | Method | Safety class applicability |
|-------|--------|---------------------------|
| Unit | Automated unit tests, coverage targets | All classes |
| Integration | API contract tests, data-pipeline tests | B, C |
| System | End-to-end scenarios, fault injection, performance | B, C |
| Algorithm validation | Offline evaluation against annotated clinical/sensor datasets; sensitivity/specificity of risk score | C |
| Usability | IEC 62366-1 formative/summative evaluations | B, C |
| Security | SAST, DAST, dependency scanning, penetration test | B, C |
| Clinical validation | Clinical study or performance validation vs. predicate (see Q-Sub doc) | C |

## 8. SOUP (Software of Unknown Provenance) — Starter List

| SOUP | Version | Purpose | Risk control |
|------|---------|---------|--------------|
| HAPI FHIR (or fhir.js) | `[TODO]` | EHR integration | Pin version; update on CVE; SBOM |
| TimescaleDB / InfluxDB | `[TODO]` | Time-series sensor storage | Pin; security config; backup |
| TensorFlow Lite / ONNX Runtime | `[TODO]` | Edge ML risk scoring | Model versioning; validation |
| React / Recharts / uPlot | `[TODO]` | Dashboard UI | Pin; review for UI safety |
| OS / runtime / base images | `[TODO]` | Deployment | Patch management; minimal images |

> `[TODO] Maintain a full, versioned SOUP list with anomaly (CVE) monitoring as required by
> IEC 62304 §8.1.2 and FDA "Cybersecurity in Medical Devices" guidance.`

## 9. Configuration & Change Management

- Semantic versioning for all software items.
- Git-based change control with pull-request review (this repo).
- Traceability links from commit → requirement → risk control.
- Release notes and deployment records for every production change.

## 10. Problem Resolution

- Defect classification by severity (link to risk file).
- CAPA escalation for safety-related defects.
- Post-market defect monitoring and software maintenance process (IEC 62304 §6).

---

*Draft software lifecycle framework. Must be instantiated with actual artifacts in this repository
before submission.*

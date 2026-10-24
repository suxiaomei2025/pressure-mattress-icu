# PressureMattress ICU · 护卧康 ICU 床垫 (Overseas Edition)

Smart pressure-mattress system for ICU patients — pressure-injury prevention, continuous sensor monitoring, and SaaS-enabled clinical workflow.

> **Repository status:** Early-stage product program. This README and [PRODUCT.md](PRODUCT.md) define who the product is for, what it does, and what we will (and will not) build. Start there.

---

## What this is

PressureMattress ICU turns a passive pressure-relief mattress into a continuous monitoring surface. A flexible pressure-mapping sensor array streams data through an edge runtime that scores pressure-ulcer risk and detects turn/reposition events, feeding a clinician dashboard and EHR-integrated workflow.

Three layers:

1. **Sensor/hardware layer** — pressure-mapping mattress (or retrofit kit for existing mattresses).
2. **Edge/software layer** — on-device risk scoring and turn detection.
3. **Cloud/SaaS layer** — clinician dashboard, FHIR/HL7 EHR integration, alerting, analytics, and fleet management.

## Who it's for

| Persona | Role | Primary job |
|---------|------|-------------|
| **ICU Nurse** | Clinician at the bedside | Know a patient's pressure-ulcer risk and turning status at a glance; auto-document repositioning. |
| **Biomedical Engineer** | Device steward | Keep the mattress fleet safe, compliant, connected, and cheap to operate. |
| **Procurement / Administrator** | Buyer & value owner | Reduce pressure injuries and costs with interoperable, non-lock-in technology. |

Full personas, jobs-to-be-done, success metrics, scope boundaries, architecture, and roadmap are in [**PRODUCT.md**](PRODUCT.md).

## Key principles

- **Decision support, not diagnosis.** v1 augments clinical judgment; the clinician decides.
- **Security & privacy by default.** HIPAA/GDPR-aligned, RBAC, immutable audit logs, encryption everywhere.
- **Edge-first resilience.** Core safety scoring runs on-device; the cloud adds fleet, analytics, and EHR integration.
- **Standards-based interoperability.** FHIR R4 / HL7 v2, not bespoke integrations.
- **Accessible by design.** WCAG 2.1 AA for high-stress ICU environments.

## Repository layout

```
.
├── README.md          # This file — orientation
├── PRODUCT.md         # Product spec: personas, JTBD, metrics, scope, architecture, roadmap
└── (implementation to be added in Phase 1)
```

## Getting started

This is a documentation/product-spec repository at present. The implementation stack (backend, time-series store, edge ML, dashboard) is proposed in [PRODUCT.md §6](PRODUCT.md#6-architecture-overview) and will be scaffolded in Phase 1.

## Status & roadmap

See [PRODUCT.md §7 Roadmap](PRODUCT.md#7-roadmap). Currently in **Phase 0 — Foundation**: aligning stakeholders on scope, personas, and success metrics.

## Contributing

This is a safety-adjacent medical-device-software effort. Contributions should respect the scope boundaries in [PRODUCT.md §5](PRODUCT.md#5-scope-boundaries) and the security/compliance principles in §6. Open an issue or PR for discussion before large changes.

## License

No license yet — to be determined by the product owner.

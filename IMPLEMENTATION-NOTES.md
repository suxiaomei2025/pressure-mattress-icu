# Family Transparency Portal — Implementation Notes

Task ID: cc9423ee-7880-4445-a4d4-8d96ec6774a9
Product: PressureMattress 护卧康 ICU床垫海外版 (pressure-mattress-icu)

## What was built

A self-contained, read-only family transparency portal prototype
(`family-transparency-portal.html`) that lets a patient's family view, in plain
non-clinical language:

1. **Repositioning schedule** — next turn, last turn, turn frequency, adherence,
   and a timeline of recent repositioning events.
2. **Risk status** — a simplified traffic-light (Low / Moderate / High) with a
   plain-language explanation, plus a gated "clinical view" for the care team.
3. **Mattress performance** — device status, therapy mode, air-cell integrity,
   firmware, and maintenance state.

The prototype also demonstrates the three governance pillars from the technical
approach:

- **Strict RBAC** — role switcher (Family / Clinician / Administrator) that
  gates sections; family is read-only, "risk status (clinical)" is
  clinician+, and "audit log" is admin-only.
- **Consent gating** — consent record (opt-in), withdraw control, and a clear
  "shared vs. not shared" data boundary.
- **Audit logging** — an append-only audit trail of access/consent events,
  including denied attempts (e.g., a family member attempting the clinical risk
  view is recorded as "denied").

## Research backing

- Competitor gap: "most incumbents lack real-time cloud dashboards for nurse
  stations and family transparency" (Hill-Rom/Baxter, Stryker, Arjo/Getinge,
  Medline, Leaf Healthcare analyzed).
- Reduces staff interruptions by giving families a self-serve status view.
- Aligns with the trend toward patient/family engagement and nurse-workload
  reduction.

## Technical approach (production)

The HTML is a front-end prototype with mock data. In production this maps to:

- Separate read-only service with its own data contract (no write endpoints for
  family).
- **RBAC** enforced server-side (roles: family, clinician, admin) with
  per-patient scoping.
- **Consent gating** — opt-in per patient, revocable, with identity
  verification on revoke.
- **Simplified non-clinical language** — a translation layer that maps clinical
  metrics (e.g., Braden score) to a traffic-light + plain sentence, never raw
  scores to family.
- **Audit logging** — append-only, immutable, HIPAA/GDPR-aligned; records every
  view/deny/consent change.
- Encryption at rest and in transit; time-boxed access codes for family.

## Risks / tradeoffs

- **Privacy and consent complexity** — consent must be revocable and clearly
  scoped; access must be tied to an authorized relationship.
- **Misinterpretation of clinical data** — mitigated by the plain-language
  translation layer and an explicit "not medical advice" disclaimer.
- The demo enforces RBAC client-side for illustration; real enforcement must be
  server-side (client-side is trivially bypassable).

## Deliverable

- `family-transparency-portal.html` — open directly in any browser (no build,
  no external dependencies).

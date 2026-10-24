# 02 — Risk Management File (ISO 14971:2019)

**Document type:** Draft Risk Management File
**Version:** 0.1 (draft)
**Owner:** Risk Management / Quality team
**Status:** Draft — review and complete `[TODO]` items before use
**Standard:** ISO 14971:2019, supplemented by IEC 62304 and IEC 62366-1

---

## 1. Purpose & Scope

This file establishes the framework for identifying, estimating, evaluating, controlling, and
monitoring risks associated with the PressureMattress 护卧康 ICU Bed (Overseas Edition),
with particular focus on the **software functions that inform clinical decisions** (pressure-injury
risk scoring, repositioning reminders, and clinician dashboards).

Scope: hardware support surface, sensor subsystem, firmware, cloud/web software, and
interfaces (EHR, nurse-call). Excludes non-device marketing functions.

## 2. Risk Management Policy & Acceptability Criteria

| Parameter | Value |
|-----------|-------|
| Risk acceptability framework | As Low As Reasonably Practicable (ALARP) + predefined acceptability matrix |
| Severity scale | S1 (negligible) – S5 (catastrophic) |
| Probability scale | P1 (improbable) – P5 (frequent) |
| Acceptable region | Low severity / low probability |
| ALARP region | Mitigation required; residual risk must be justified |
| Unacceptable region | Risk reduction mandatory or design not released |

### 2.1 Severity Scale (draft)

| Level | Description | Example |
|-------|-------------|---------|
| S1 | Negligible | Minor cosmetic issue, no clinical impact |
| S2 | Minor | Transient inconvenience; no patient harm |
| S3 | Serious | Reversible patient injury; delayed treatment |
| S4 | Critical | Serious, potentially irreversible injury (e.g., Stage III–IV pressure injury) |
| S5 | Catastrophic | Death or permanent disability |

### 2.2 Probability Scale (draft)

| Level | Description | Qualitative frequency |
|-------|-------------|----------------------|
| P1 | Improbable | < 10⁻⁶ / extremely unlikely |
| P2 | Remote | 10⁻⁵ – 10⁻⁶ |
| P3 | Occasional | 10⁻⁴ – 10⁻⁵ |
| P4 | Probable | 10⁻³ – 10⁻⁴ |
| P5 | Frequent | > 10⁻³ |

## 3. Intended Use & Safety-Related Characteristics

Refer to **01-intended-use-indications-for-use.md**. Safety-relevant characteristics include:

1. Continuous pressure monitoring of immobile ICU patients.
2. Algorithmic risk scoring that may influence repositioning frequency.
3. Automated turn reminders whose absence could delay repositioning.
4. Cloud transmission of patient-associated data (privacy/security).
5. Interoperability with EHR and nurse-call systems.
6. Use by diverse clinicians under high workload (usability/alert fatigue).

## 4. Hazard Identification & Risk Analysis (Initial, pre-mitigation)

### 4.1 Hazard Analysis Table (draft — representative rows)

| ID | Hazard | Hazardous situation | Potential harm | S | P | Initial risk | Risk control measure |
|----|--------|---------------------|----------------|----|----|-------------|----------------------|
| H-01 | False-negative risk score (algorithm fails to detect high pressure) | Clinician not alerted to elevated pressure-injury risk | Pressure injury (Stage III–IV) | S4 | P3 | Unacceptable | Redundant sensors; calibration checks; clinician training that risk score is advisory; periodic skin assessment remains standard of care |
| H-02 | False-positive risk score / over-alerting | Frequent non-actionable alerts → alert fatigue | Missed true alarms (delayed turning) | S3 | P4 | Unacceptable | Threshold tuning; alert deduplication; severity-tiered alerts; validation against clinical data |
| H-03 | Turn-reminder delivery failure (network outage / server down) | Reminder not delivered | Delayed repositioning | S3 | P3 | ALARP | Local buffering + on-device fallback; offline mode; status-of-connection indicator |
| H-04 | Incorrect patient data association (wrong patient record) | Risk score/alert attributed to wrong patient | Wrong clinical decision | S4 | P2 | Unacceptable | Patient ID verification; barcode/RFID pairing; audit trail; user confirmation UI |
| H-05 | Sensor drift / miscalibration | Inaccurate pressure readings | Inaccurate risk score | S3 | P3 | ALARP | Calibration routine; sensor self-test; out-of-range detection |
| H-06 | Cybersecurity breach (unauthorized access/alteration) | Tampered data or ransomware | Patient harm; data loss | S4 | P2 | Unacceptable | Encryption in transit/at rest; RBAC; MFA; audit logging; security patching; penetration testing |
| H-07 | Usability error (misinterpreted dashboard) | Clinician misreads risk display | Inappropriate intervention | S3 | P3 | ALARP | IEC 62366-1 usability engineering; label/legend clarity; user training; UI validation |
| H-08 | Software defect (algorithm bug / crash) | Incorrect or absent output | Delayed or wrong clinical action | S4 | P2 | Unacceptable | IEC 62304 lifecycle controls; unit/integration/system testing; regression suite; defect management |
| H-09 | Hardware fault (mattress inflation failure) | Inadequate pressure redistribution | Pressure injury | S4 | P2 | Unacceptable | Redundant pump; alarm on failure; service/maintenance schedule |
| H-10 | Data integrity / clock-sync error | Wrong timestamp on repositioning events | Incorrect documentation | S2 | P3 | ALARP | NTP time sync; checksums; audit logs; EHR write verification |

> `[TODO] Expand this table into a full design FMEA covering all components (firmware, sensor
> array, gateway, cloud, web UI, EHR bridge). This is a representative starter set.`

## 5. Risk Evaluation

- Initial unacceptable risks (H-01, H-02, H-04, H-06, H-08, H-09) **require** risk control before release.
- ALARP risks (H-03, H-05, H-07, H-10) require control and justification of residual risk.

## 6. Risk Control Measures & Verification

| Control | Implementation | Verification |
|---------|----------------|--------------|
| Redundant sensing & self-test | Sensor array cross-check, periodic self-test | Design verification test |
| Alert fatigue mitigation | Tiered, deduplicated, tunable alerts | Usability validation + clinical study |
| Offline fallback | Local cache + on-device reminders | Fault-injection testing |
| Patient identity management | Pairing workflow + audit trail | Integration test |
| Security controls | Encryption, RBAC, MFA, patching | Penetration test, SAST/DAST |
| IEC 62304 lifecycle | Full V-model software process | See 03 document |

## 7. Residual Risk Evaluation

After implementation of risk control measures, each risk must be re-evaluated. Residual risks in
the ALARP region require a documented benefit-risk justification. Residual unacceptable risks
must be escalated to senior management for a risk/benefit decision.

## 8. Benefit–Risk Analysis

**Benefits:** reduced incidence and severity of hospital-acquired pressure injuries; reduced nurse
workload; earlier intervention; improved documentation and family transparency.

**Risks:** false positive/negative risk scores; alert fatigue; cybersecurity; data integrity.

**Conclusion (draft):** Provided the mandatory controls in §6 are implemented and verified, the
anticipated clinical benefit of earlier pressure-injury intervention in a high-risk ICU population
outweighs the residual risk. `[TODO] Support with clinical evidence / literature review.`

## 9. Overall Residual Risk Acceptability

`[TODO] Populate after controls are implemented and verified. Requires sign-off by
Risk Management owner and, for unacceptable residuals, senior management.`

## 10. Production & Post-Production Information

- Post-market surveillance plan (complaints, MDR/vigilance).
- Field monitoring of false-positive/false-negative rates.
- Software defect and cybersecurity monitoring (SBOM, CVE triage).
- Periodic risk management file review (ISO 14971:2019 §10).

## 11. Deliverables Checklist

- [ ] Risk Management Plan (this file §2–§3)
- [ ] Hazard identification (§4)
- [ ] Risk estimation & evaluation (§4–§5)
- [ ] Risk control (§6)
- [ ] Residual risk evaluation (§7)
- [ ] Benefit–risk analysis (§8)
- [ ] Risk Management Report (sign-off)
- [ ] Production/post-production plan (§10)

---

*Draft risk management file. Must be completed and maintained per ISO 14971:2019 by a
qualified risk management owner.*

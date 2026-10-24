# 01 — Intended Use & Indications for Use

**Document type:** Draft regulatory statement
**Version:** 0.1 (draft)
**Owner:** Regulatory & Quality team
**Status:** Draft — review before use
**Related standard:** 21 CFR 801, FDA SaMD guidance, IMDRF N12

---

## 1. Purpose

This document defines the *Intended Use* and *Indications for Use* for the software component
of the PressureMattress 护卧康 ICU Bed (Overseas Edition). A precise intended-use statement is
the foundation of the regulatory strategy: it drives device classification, the clinical evaluation,
risk management, and the software safety classification under IEC 62304.

## 2. Product & Component Scope

| Attribute | Value |
|-----------|-------|
| Trade name | PressureMattress 护卧康 ICU Bed — Overseas Edition |
| Device type | Software-enabled alternating-pressure / pressure-redistribution support surface |
| Hardware component | Multi-zone air-pressure ICU mattress with pressure-mapping sensor array |
| Software component (SaMD) | Cloud/web clinician dashboard + analytics service: pressure-ulcer risk scoring, repositioning/turn reminders, patient monitoring, and EHR integration |
| Software platform | SaaS (web application, cloud-hosted), on-premises option |
| Interfaces | BLE/serial sensor bridge, HL7/FHIR EHR integration, SMART-on-FHIR |

## 3. Intended Use Statement (Draft)

> **Intended Use:** PressureMattress 护卧康 is a software-enabled alternating-pressure and
> pressure-redistribution support system intended for use in hospital intensive care and acute
> care settings. The system continuously acquires pressure-distribution data from a multi-zone
> air-pressure mattress and provides clinicians with (i) real-time visualization of pressure
> distribution, (ii) pressure-injury risk scoring, and (iii) repositioning/turn reminders, to
> **support** the prevention of hospital-acquired pressure injuries in immobile or critically ill
> adult patients.

### 3.1 Key qualifying language

- The software provides **decision support**; it does not independently diagnose or treat.
- All alerts and risk scores are **advisory** and must be interpreted by a qualified clinician in
  the context of the patient's overall clinical condition.
- The device **supports** pressure-injury prevention; it does not replace standard turning
  protocols, skin assessment, or clinical judgment.

## 4. Indications for Use (Draft)

> **Indications for Use:** PressureMattress 护卧康 is indicated for use with **adult patients**
> (18 years and older) who are **at risk of, or receiving care for, pressure injuries** in hospital
> intensive care units and acute care settings, including patients who are immobile, sedated,
> or otherwise unable to reposition themselves independently.

## 5. Intended Patient Population

- **Age:** Adults (≥ 18 years). `[TODO] Confirm whether a pediatric claim is intended; if so,
  a separate predicate/clinical justification is required.`
- **Condition:** Patients at risk of pressure injuries (Braden/Waterlow or equivalent scale
  elevated risk), or with existing Stage I–IV pressure injuries receiving offloading therapy.
- **Exclusions / Contraindications (draft):**
  - Patients for whom alternating-pressure therapy is contraindicated per institutional policy
    (e.g., unstable spinal injuries without physician clearance). `[TODO] Validate against
    clinical protocol and competitor labeling.`
  - Neonatal and pediatric populations (unless a pediatric indication is pursued).

## 6. Intended Users & Use Environment

| Aspect | Value |
|--------|-------|
| Primary users | ICU nurses, wound-care nurses, nurse managers |
| Secondary users | Physicians/intensivists, biomedical engineers, hospital procurement |
| Use environment | Hospital ICU and acute-care units; nurse stations; mobile clinician devices |
| Environment of the software | Cloud (SaaS) with BAA, or hospital on-premises deployment |
| Non-clinical use | Family/caregiver transparency dashboards (informational only — `[TODO] confirm`) |

## 7. Principles of Operation (Summary)

1. Pressure-sensor data is captured from the mattress sensor array.
2. Data is transmitted (BLE/serial bridge → gateway → cloud) to the analytics service.
3. The service computes pressure-distribution metrics and a pressure-injury risk score.
4. The dashboard surfaces risk, sensor status, and repositioning reminders to clinicians.
5. Turning/repositioning events may be documented to the EHR via HL7/FHIR.

## 8. SaMD Risk Categorization (IMDRF N12)

The software **informs clinical management** (advisory risk score and turn reminders) and
**drives clinical management** (automated alerts that may prompt a specific repositioning
action). Applying the IMDRF SaMD framework:

| Dimension | Assessment | Notes |
|-----------|------------|-------|
| Situation / condition | **Serious** — pressure injuries are serious, preventable harms | Hospital-acquired pressure injuries are a reportable serious safety event |
| Information significance | Treat/Diagnose → **Drive** vs **Inform** | Depends on final claim: if alerts "drive" turning, treat as Drive |

- **If "informs" only:** SaMD Category II.
- **If "drives" (automated therapy/alert mandate):** SaMD Category III.

> `[TODO] Decide final claim language — recommend positioning as "informs" (advisory) to keep
> the clinical-evidence burden proportionate, unless a higher-risk driving claim is commercially
> required.`

## 9. FDA Regulatory Pathway (Preliminary)

- **Hardware (mattress + alternating-pressure control):** likely Class II, 510(k) pathway.
  `[TODO] Confirm product code / regulation (e.g., pressure-redistributing support surface,
  alternating-pressure air flotation).`
- **Software (SaMD analytics):** determine whether it is:
  - an accessory / SiMD (software in a medical device) — cleared with the hardware, or
  - standalone SaMD requiring its own 510(k) / De Novo.
- **Clinical Decision Support (CDS) carve-out:** verify whether any function qualifies for FDA's
  CDS non-device exemption (21 CFR 862.1280 exclusions / CDS Final Guidance). Given the
  device-specific, patient-specific nature of the risk score, it is **unlikely** to qualify for the
  non-device CDS carve-out — confirm with counsel.

> Refer to **04-qsub-pre-submission-meeting-prep.md** for the proposed questions to FDA.

## 10. Labeling & Claims to Avoid

- Do **not** claim the software "prevents" pressure injuries without clinical validation.
- Do **not** claim the software "diagnoses" pressure injuries or "replaces clinical judgment."
- Do **not** imply the risk score is a diagnostic device function.

---

*This is a draft intended-use statement. Final wording must be consistent with the clinical
evaluation, risk management file, and the predicate comparison, and should be reviewed by a
qualified regulatory professional.*

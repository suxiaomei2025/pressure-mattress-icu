# 04 — Q-Sub (Pre-Submission) Meeting Preparation

**Document type:** Draft Q-Sub meeting preparation
**Version:** 0.1 (draft)
**Owner:** Regulatory Affairs
**Status:** Draft — file only after classification is confirmed
**Program:** FDA Q-Submission Program (Pre-Sub / Q-Sub)

---

## 1. Purpose

This document prepares a Pre-Submission (Q-Sub) request to FDA for feedback on the
regulatory strategy for the PressureMattress 护卧康 ICU Bed software that **informs clinical
decisions**. The goal is to de-risk the pathway (510(k) vs. De Novo), align on evidence
requirements, and reduce the probability of an AI/Refuse-to-Accept or hold.

## 2. Regulatory Strategy Summary (Preliminary)

| Question | Working position | Confidence |
|----------|------------------|-----------|
| Is the software a device? | Yes — device-specific, patient-specific decision support | High |
| SaMD vs SiMD? | Likely SaMD (cloud analytics) + SiMD (firmware) — confirm | Medium |
| CDS carve-out applies? | Unlikely — confirm with counsel | Medium |
| Pathway | 510(k) with predicate, or De Novo if no predicate | Medium |
| Device class | Class II (likely) | Medium |
| Software safety class (IEC 62304) | Class B/C — confirm with risk file | Medium |

## 3. Q-Sub Meeting Request Package (Contents)

Per FDA Q-Submission guidance, the meeting request must include:

1. **Cover letter** — request type (Pre-Sub), device name, contact.
2. **Device description** — hardware + software architecture, principles of operation.
3. **Intended use / indications for use** — see 01 doc.
4. **Proposed regulatory pathway** — 510(k) vs De Novo, proposed product code.
5. **Proposed indications and claims** — including the risk-scoring and reminder functions.
6. **Specific questions for FDA** — see §4 below (limit to ~3–5 focused questions).
7. **Proposed testing plan** — software, algorithm validation, cybersecurity, usability, clinical.
8. **Predicate device(s) (if 510(k))** — `[TODO] Identify predicates (e.g., pressure-redistributing
   support surfaces, or SaMD CDS precedents).`
9. **Supporting data / literature** — clinical evidence for pressure-injury prevention.

## 4. Proposed Questions for FDA (Draft)

> Keep questions focused and answerable. Recommended 3–5 questions.

1. **Classification/pathway:** Does FDA agree that the software (pressure-injury risk scoring +
   repositioning reminders) is appropriately regulated as [Class II / 510(k) with predicate X /
   De Novo], or does FDA view the software as standalone SaMD requiring a separate submission?

2. **CDS carve-out:** Do any of the software functions meet the FDA criteria for a non-device
   Clinical Decision Support function under the CDS Final Guidance, or is the device-specific
   risk score subject to device regulation?

3. **Clinical evidence:** For the pressure-injury risk-scoring algorithm, what level of clinical
   validation does FDA expect (e.g., analytical validation vs. prospective clinical study), and is
   a predicate-based performance comparison sufficient?

4. **Software documentation:** Does FDA agree with the proposed IEC 62304 software safety
   classification (Class B vs C) for the risk-scoring and reminder functions, and what
   documentation level is expected in the premarket submission?

5. **Cybersecurity:** Does the proposed cybersecurity plan (encryption, RBAC, MFA, SBOM,
   CVE monitoring) align with FDA's "Cybersecurity in Medical Devices" guidance for a
   cloud/SaaS SaMD?

## 5. Pre-Meeting Preparation Checklist

- [ ] Confirm device classification and product code (consultant).
- [ ] Finalize intended use / indications wording.
- [ ] Draft device description and architecture diagrams.
- [ ] Compile predicate comparison table (if 510(k)).
- [ ] Draft algorithm description + validation plan.
- [ ] Draft SRS + software safety classification (03 doc).
- [ ] Draft risk management summary (02 doc).
- [ ] Prepare cybersecurity documentation (SBOM, threat model).
- [ ] Schedule internal dry-run with mock FDA questions.

## 6. Timeline & Effort Estimate

| Phase | Effort | Notes |
|-------|--------|-------|
| Classification confirmation | 1–2 weeks | Regulatory consultant |
| Evidence gap analysis | 1–2 weeks | Clinical + software |
| Q-Sub package drafting | 2–3 weeks | Regulatory affairs |
| FDA Q-Sub review | 70–75 days (typical) | Pre-Sub target |
| Post-Q-Sub submission prep | TBD | Depends on feedback |

## 7. Risks & Tradeoffs

- **Regulatory timeline uncertainty** — Q-Sub review time and feedback quality vary.
- **Consultant cost** — budget for regulatory counsel; do not self-certify classification.
- **Claim scope creep** — a "drives clinical management" claim raises evidence burden and
  software class; an "informs" claim lowers both but reduces commercial differentiation.
- **SaMD vs SiMD ambiguity** — resolve early; it changes the submission structure entirely.

---

*Draft Q-Sub preparation. File the Pre-Sub only after internal regulatory review and
classification confirmation.*

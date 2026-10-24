# Compliance Documentation Pack — FDA SaMD Pre-Submission Preparation

**Product:** PressureMattress 护卧康 ICU Bed — Overseas Edition
**Repo:** pressure-mattress-icu
**Status:** DRAFT for regulatory/quality team review — not a legal or regulatory opinion
**Task ID:** ecd24044-0558-4596-b8f6-c87dae8b2927

This pack is a starting-point regulatory documentation set for the software component of a
smart pressure-relief mattress that **informs clinical decisions** (pressure-injury risk scoring,
repositioning/turn reminders, and clinician dashboards). It is aligned with FDA guidance for
Software as a Medical Device (SaMD) and the applicable consensus standards.

> **Important:** These documents are templates/drafts. They contain placeholders (marked
> `[TODO]` or `[PENDING]`) that must be completed by the regulatory and quality teams,
> and should be reviewed by a qualified regulatory consultant before any FDA submission.
> FDA product classification, product codes, and regulatory pathway must be formally confirmed.

## Documents

| # | Document | Standard / Guidance | File |
|---|----------|---------------------|------|
| 1 | Intended Use & Indications for Use | FDA SaMD guidance, 21 CFR 801 | [01-intended-use-indications-for-use.md](01-intended-use-indications-for-use.md) |
| 2 | Risk Management File | ISO 14971:2019 | [02-risk-management-iso-14971.md](02-risk-management-iso-14971.md) |
| 3 | Software Lifecycle Documentation | IEC 62304:2006+A1:2015 | [03-software-lifecycle-iec-62304.md](03-software-lifecycle-iec-62304.md) |
| 4 | Q-Sub (Pre-Submission) Meeting Prep | FDA Q-Submission Program | [04-qsub-pre-submission-meeting-prep.md](04-qsub-pre-submission-meeting-prep.md) |

## Applicable Regulations & Standards

- **21 CFR Part 820** — Quality System Regulation (QSR)
- **21 CFR Part 801 / 830** — Labeling and UDI
- **21 CFR Part 11** — Electronic Records; Electronic Signatures (SaaS data integrity)
- **FDA Guidance** — "Policy for Device Software Functions and Mobile Medical Applications" (2022)
- **FDA Guidance** — "Content of Premarket Submissions for Device Software Functions" (2023)
- **FDA Guidance** — "Requests for Feedback and Meetings for Medical Device Submissions: The Q-Submission Program"
- **IMDRF** — "Software as a Medical Device: Possible Framework for Risk Categorization and Corresponding Considerations" (N12)
- **ISO 14971:2019** — Application of risk management to medical devices
- **IEC 62304:2006 + A1:2015** — Medical device software — software life cycle processes
- **IEC 62366-1** — Usability engineering
- **ISO 13485:2016** — Quality management systems
- **HIPAA / GDPR** — Patient data privacy and security (SaaS data handling)

## Recommended Next Steps

1. Confirm FDA device classification and product code with a regulatory consultant.
2. Complete all `[TODO]` placeholders with verified product/clinical data.
3. Populate the risk management file with design FMEA and clinical evidence.
4. Map the IEC 62304 artifacts to the actual software development lifecycle in this repo.
5. Draft and file the Q-Sub (Pre-Sub) request once the classification is confirmed.

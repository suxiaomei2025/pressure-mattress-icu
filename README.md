# Digital Twin Patient Positioning Simulator

Interactive 3-D digital twin for nurse training and protocol validation of patient
positioning and pressure distribution on the **PressureMattress ICU (护卧康 ICU 床垫)** platform.

**Task:** bb7f9680-f41c-4498-b669-e2b659429957
**Deliverable:** `digital-twin-simulator.html` — a single self-contained file (Three.js loaded from CDN).

---

## What it does

Staff can visualize pressure hotspots and correct positioning **before** real-world
application, reducing hospital-acquired pressure injuries (HAPIs) through training.

1. **3-D visualization (Three.js)** — a patient body on a hospital bed with a
   color-mapped pressure heatmap rendered on the mattress surface (192×72 texels,
   blue → red for 5 → 90 mmHg). Rotate/zoom/pivot the scene with the mouse.
2. **Physics-informed pressure model** — interface pressure at 26 bony prominences
   (occiput, scapulae, sacrum, heels, elbows, greater trochanter, malleolus, iliac
   crests, etc.) is computed as a Gaussian spatial field. Peak pressure scales with
   body weight, support-surface redistribution, head elevation (sacral shear), and
   heel offloading.
3. **Scenario library** — 7 presets: supine baseline, 30° lateral tilt, 90°
   side-lying (avoid), Semi-Fowler 45°, bariatric (150 kg), cachectic (45 kg), and
   prone (ARDS ventilation).
4. **Live pressure readout** — peak mmHg, risk score (0–100), at-risk area
   (>32 mmHg capillary threshold), top hotspot locations, and a simulated Q2H turn timer.
5. **Protocol validation** — checklist against NPUAP/EPUAP guidance (turn ≤2 h,
   heel offloading, avoid 90° side-lying, head-of-bed ≤30°, peak <60 mmHg).
6. **LMS integration** — SCORM 1.2 runtime stub (`window.API_1484_11`) plus xAPI
   statement emission (launched / completed / passed) with a configurable LRS endpoint.

---

## How to run

Open `digital-twin-simulator.html` in any modern browser (internet connection required
for the Three.js CDN). No build step, no server, no install.

---

## Model & research backing

- **Emerging tech:** "digital twins of patient positioning for simulation and
  training" and "computer-vision-free pose estimation using mattress sensor fusion."
- **Guidelines:** NPUAP/EPUAP 2019 (repositioning ≥ every 2 h; 30° lateral tilt
  preferred over 90°; heel offloading; minimize head-of-bed to reduce shear).
- **Physiology:** 32 mmHg is the commonly cited capillary closing pressure;
  interface pressures above this sustained are associated with ischemia.

## Risks / tradeoffs

- **Surrogate accuracy** — baselines are literature-calibrated for a ~70 kg adult on
  standard foam; real sensor arrays will differ. This is training/education only,
  **not** a medical device and **not** FDA-cleared decision support.
- **Effort vs. adoption** — high build effort with uncertain training uptake.
- **No patient data** — the simulator uses synthetic anthropometrics only; no PHI.

## Files

- `digital-twin-simulator.html` — the simulator (primary deliverable).

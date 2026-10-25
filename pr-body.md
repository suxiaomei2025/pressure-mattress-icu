## What was built

A self-contained digital twin simulator (`digital-twin-simulator.html`) for nurse
training and protocol validation of patient positioning and pressure distribution on
the PressureMattress ICU platform.

- **3-D visualization (Three.js):** patient body on a hospital bed with a live
  color-mapped pressure heatmap on the mattress surface (blue → red, 5 → 90 mmHg),
  orbit/zoom controls, and hotspot markers.
- **Physics-informed pressure model:** interface pressure at 26 bony prominences
  (sacrum, heels, scapulae, occiput, greater trochanter, malleolus, iliac crests,
  etc.) modelled as Gaussian spatial fields; scales with body weight, support-surface
  redistribution, head elevation (sacral shear), and heel offloading.
- **Scenario library:** supine baseline, 30° lateral tilt, 90° side-lying (avoid),
  Semi-Fowler 45°, bariatric 150 kg, cachectic 45 kg, prone (ARDS).
- **Live readout + protocol validation:** peak mmHg, risk score, at-risk area
  (>32 mmHg), hotspot list, Q2H turn timer, and an NPUAP/EPUAP compliance checklist.
- **LMS integration:** SCORM 1.2 runtime stub + xAPI statements (launched/completed/
  passed) with configurable LRS endpoint.

## Research backing

Emerging-tech signals: "digital twins of patient positioning for simulation and
training" and "computer-vision-free pose estimation using mattress sensor fusion."
Clinical guidance anchored to NPUAP/EPUAP 2019 (reposition ≥ every 2 h; 30° lateral
tilt preferred over 90°; heel offloading; minimize head-of-bed to reduce sacral shear)
and the 32 mmHg capillary closing pressure ischemia threshold.

## Technical approach

Single-file web app (no build, no server). Three.js (ES module importmap, CDN) for the
3-D scene; a 48×18 sensor-grid pressure field rendered to a canvas texture; a
deterministic prominence-based pressure model; plain-JS UI; SCORM 1.2 + xAPI hooks.

## Risks / tradeoffs

- **Model accuracy vs. real sensor data** — baselines are literature-calibrated for a
  ~70 kg adult on standard foam; real sensor arrays will differ. Education only, not a
  medical device.
- **High effort / uncertain adoption** — training-module upsell with medium revenue
  potential.
- **No PHI** — synthetic anthropometrics only.

**Task ID:** bb7f9680-f41c-4498-b669-e2b659429957

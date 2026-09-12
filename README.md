# Dancarr

## Interactive atlas

- [`atlas/index.html`](atlas/index.html) — the Bedside Assessment Atlas: one body figure with 15
  tappable regions, each opening a zoomed anatomical diagram, landmarks, a tickable
  assessment checklist, grading scales and red flags. A second tab, Tools & frameworks
  (`atlas/tools.js`), holds emergency protocols (DRSABCD, primary/secondary/tertiary survey,
  anaphylaxis, stroke, chest pain, glucose, seizure/choking, ISBAR), working calculators
  (NEWS2 + Between the Flags + qSOFA, GCS, sepsis screen, 4AT, Braden, FRAT, MUST, Abbey,
  PAINAD), the Mental State Examination, and reference tables for signs of disease, atypical
  presentation in older adults, decline and the last days of life. A third tab, Conditions
  (`atlas/conditions.js`), is a library of 129 conditions across 12 body systems, each with
  contributing factors and risks, comorbidities, signs, red flags, how to assess, nursing focus,
  and links to the regions and tools. Open the file in a browser; no build step.
  The 2D figure paths in `atlas/body-art.js` are adapted from
  [react-native-body-highlighter](https://github.com/HichamELBSI/react-native-body-highlighter)
  (MIT, see `atlas/LICENSE-body-art.txt`). The 3D body (`atlas/body3d-data.js`, rendered by
  `atlas/body3d.js` with raw WebGL) is the [MakeHuman](https://github.com/makehumancommunity/makehuman)
  base mesh, released CC0, rendered with the 2D muscle plate projected onto it so both views
  share one look. The 3D body is sectioned anatomically (limbs at the joints from the rig's bone
  weights; torso by the muscle plate into pectoral, sternal, the nine abdominal regions, inguinal,
  scapular, interscapular, lumbar, sacral and gluteal; head into cranium and face), each named on
  hover. The figure has named muscle groups and toggleable schematic
  artery, vein and nerve layers; the 3D view turns to show sides, back, top and bottom.

## Documents

- [Comprehensive nursing assessment — by body region](docs/nursing-assessment-by-body-region.md)
  — a working reference for a community RN comprehensive assessment, structured to
  feed a design brief for an anatomical visual guide.

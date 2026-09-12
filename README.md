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
  The body figure paths in `atlas/body-art.js` are adapted from
  [react-native-body-highlighter](https://github.com/HichamELBSI/react-native-body-highlighter)
  (MIT, see `atlas/LICENSE-body-art.txt`).

## Documents

- [Comprehensive nursing assessment — by body region](docs/nursing-assessment-by-body-region.md)
  — a working reference for a community RN comprehensive assessment, structured to
  feed a design brief for an anatomical visual guide.

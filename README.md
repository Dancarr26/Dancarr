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
  hover, and carries branching artery, vein, nerve and lymphatic trees (`atlas/body3d-anatomy.js`)
  built from the rig's joints (calibre-graded tubes: trunks, branches, twigs; superficial courses
  set just under the skin, deep ones inside), lymph-node groups, and an organs-and-glands layer
  (brain, airway and lungs, heart, gut from oesophagus to rectum, liver, pancreas, spleen,
  kidneys and ureters, bladder, and the endocrine glands) and a bones layer, all seen through
  the skin with an x-ray pass. The abdominal organs and vessels, the brain (by lobe), the
  neck (thyroid, larynx, carotids, jugulars, subclavians, aortic arch) and the skeleton from
  skull to pelvis are real CT/MR-segmented meshes from the Open Anatomy Project's SPL atlases
  (`atlas/body3d-organs.js`, 3D Slicer licence, see `atlas/LICENSE-body3d-organs.txt`), fitted
  to the rig by landmarks; the heart, lungs, airway, bladder and small glands are still
  hand-shaped placeholders. Selecting a body zone dims everything that does not run through it and lists what
  does beneath the figure. The Muscles chip colours the 3D body as a muscle chart and names the
  group under the pointer. The 2D figure has named muscle groups and toggleable schematic artery,
  vein and nerve layers; the 3D view turns to show sides, back, top and bottom.

## Documents

- [Comprehensive nursing assessment — by body region](docs/nursing-assessment-by-body-region.md)
  — a working reference for a community RN comprehensive assessment, structured to
  feed a design brief for an anatomical visual guide.

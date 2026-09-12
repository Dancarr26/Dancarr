/* Frameworks, scores and reference tables for the Bedside Assessment Atlas.
   General nursing knowledge adapted from public references named per tool. Local policy always wins. */
window.TOOLS=[

/* ============ A. EMERGENCY RESPONSE ============ */
{id:"drsabcd",cat:"Emergency response",name:"DRSABCD · basic life support",short:"DRSABCD",type:"steps",
 purpose:"The ANZCOR sequence for a collapsed person. Work it in order; do not skip ahead.",
 when:"Any collapse, unresponsive person, or suspected cardiac or respiratory arrest.",
 steps:[
  {k:"D",t:"Danger",look:"To you, bystanders, then the person: traffic, electricity, fluids, sharps, aggression.",act:"Remove the danger or move the person only if you must."},
  {k:"R",t:"Response",look:"COWS: Can you hear me? Open your eyes. What's your name? Squeeze my hands.",act:"No response = unresponsive. Responding = recovery position if needed, monitor, treat cause."},
  {k:"S",t:"Send for help",look:"Phone 000 on speaker. Ask someone to fetch the AED.",act:"State: location, unresponsive, breathing status, your name and number."},
  {k:"A",t:"Airway",look:"Open the mouth. Visible fluid, vomit, food, dentures loose?",act:"Roll onto side to clear if needed. Head tilt, chin lift (jaw thrust if spinal injury suspected)."},
  {k:"B",t:"Breathing",look:"Look, listen, feel for up to 10 seconds. Gasping or occasional snoring breaths are NOT normal breathing.",act:"Not breathing normally = start CPR. Breathing normally = recovery position, monitor, reassess."},
  {k:"C",t:"CPR",look:"Centre of the chest, heel of hand, arms straight.",act:"30 compressions : 2 breaths. Rate 100–120/min, depth one-third of the chest (about 5 cm), full recoil. Swap rescuer every 2 minutes. Compression-only CPR if unwilling or unable to give breaths."},
  {k:"D",t:"Defibrillation",look:"AED arrives.",act:"Turn on, follow the voice prompts, attach pads to bare dry chest, nobody touching during analysis and shock. Continue CPR immediately after each shock."}
 ],
 act:["Continue until the person responds or breathes normally, emergency services take over, or you cannot physically continue.","If they start breathing: recovery position, keep the AED attached, reassess every minute.","Record time collapsed, time CPR started, shocks delivered, drugs given."],
 sources:[{n:"ANZCOR Guideline 8: CPR",u:"https://www.anzcor.org/home/basic-life-support/guideline-8-cardiopulmonary-resuscitation-cpr"},{n:"ANZCOR Basic Life Support flowchart",u:"https://www.anzcor.org/home/algorithms-and-flowcharts/basic-life-support"}],
 regions:["vitals","neuro"]},

{id:"primary",cat:"Emergency response",name:"Primary survey · ABCDE",short:"Primary survey",type:"steps",
 purpose:"Find and fix the thing that will kill first. Each letter is assessed and treated before moving on, then the whole sequence is repeated after any change.",
 when:"Any acutely unwell or deteriorating person, any trauma, and before any detailed assessment when something is clearly wrong.",
 steps:[
  {k:"x",t:"Exsanguination (trauma)",look:"Life-threatening external bleeding.",act:"Direct pressure, then a tourniquet or haemostatic dressing if it will not stop. This comes before airway in major trauma."},
  {k:"A",t:"Airway",look:"Talking in full sentences = patent. Snoring, gurgling, stridor, silence with effort, swelling of tongue or lips, foreign body.",act:"Position, suction, chin lift or jaw thrust, remove visible obstruction, recovery position if reduced consciousness. Stridor or swelling: call 000 now."},
  {k:"B",t:"Breathing",look:"Rate, depth, effort, accessory muscles, symmetry, SpO₂, colour, breath sounds each side, tracheal position, chest wounds.",act:"Sit upright, oxygen if SpO₂ below target (94–98%, or 88–92% if known CO₂ retainer), treat wheeze per plan, seal open chest wound on three sides."},
  {k:"C",t:"Circulation",look:"Pulse rate and quality, BP (and postural), capillary refill, skin colour and temperature, bleeding, urine output, fluid balance, chest pain.",act:"Control bleeding, lie flat with legs raised if shocked and no breathing difficulty, IV access and fluids within scope, ECG for chest pain or arrhythmia."},
  {k:"D",t:"Disability",look:"ACVPU or GCS, pupils, blood glucose, limb power and symmetry, new confusion, pain, seizure activity, drugs taken.",act:"Treat hypoglycaemia, recovery position if not protecting airway, BE-FAST positive = stroke call, naloxone for opioid toxicity within scope."},
  {k:"E",t:"Exposure / environment",look:"Undress and examine front and back: rashes (non-blanching), wounds, injuries, swelling, oedema, temperature, skin and pressure areas, devices.",act:"Keep warm, keep dignity, log-roll if spine at risk. Then history, secondary survey and reassess A to E."}
 ],
 act:["Any A, B or C problem you cannot fix in minutes: 000, then ISBAR handover.","Reassess A to E after every intervention and every change.","Record the time and the full set of observations at each pass; the trend is the finding."],
 sources:[{n:"ATLS 11th edition primary survey summary",u:"https://pabau.com/blog/primary-trauma-survey/"},{n:"LITFL: trauma initial assessment",u:"https://litfl.com/trauma-initial-assessment-and-management/"}],
 regions:["vitals","neuro","chest"]},

{id:"secondary",cat:"Emergency response",name:"Secondary survey · history and head-to-toe",short:"Secondary survey",type:"steps",
 purpose:"Only once the primary survey is stable. A structured history and a complete top-to-toe examination to find everything the primary survey was not looking for.",
 when:"After A to E is stable, after a fall or injury, and as the structure for any detailed examination of an unwell person.",
 steps:[
  {k:"S",t:"SAMPLE history",look:"Signs and symptoms · Allergies · Medications (and last doses, anticoagulants, insulin, opioids) · Past history · Last meal and fluids · Events leading up to this.",act:"Ask the person, the carer, the file and the Webster pack. Note who told you what."},
  {k:"1",t:"Head and face",look:"Scalp lacerations and haematoma, bruising behind the ears (Battle's sign) or around the eyes (raccoon eyes), blood or clear fluid from ears or nose, facial asymmetry, jaw pain.",act:"Head strike on an anticoagulant is a same-day scan even if well."},
  {k:"2",t:"Eyes",look:"Pupils size, equality, reaction; eye movements; vision; foreign body.",act:"New unequal pupil = neurological emergency."},
  {k:"3",t:"Neck",look:"Midline cervical tenderness, deformity, tracheal position, JVP, neck stiffness.",act:"Immobilise if midline tenderness after trauma, or altered consciousness, or distracting injury."},
  {k:"4",t:"Chest",look:"Bruising, seat-belt mark, paradoxical movement, tenderness, crepitus, breath sounds, heart sounds.",act:"Rib pain with shallow breathing in an older adult is a pneumonia risk: analgesia and deep breathing."},
  {k:"5",t:"Abdomen and pelvis",look:"Distension, bruising, tenderness, guarding, rigidity; pelvic pain on gentle compression (once only); perineal bruising, blood at the urethral meatus.",act:"Do not spring the pelvis. Suspected pelvic fracture = do not roll, 000."},
  {k:"6",t:"Limbs",look:"Deformity, swelling, shortening and external rotation of a leg (hip fracture), wounds, pulses, capillary refill, sensation and power distal to any injury.",act:"Splint in position found, check pulses before and after, elevate."},
  {k:"7",t:"Back and spine",look:"Log-roll with helpers: spinal tenderness, step, wounds, sacral pressure area.",act:"Keep in line if tender."},
  {k:"8",t:"Neurological",look:"GCS, speech, pronator drift, power and sensation all four limbs, gait if safe.",act:"Any focal deficit: stroke pathway, note time last known well."},
  {k:"9",t:"Temperature, glucose, urine",look:"Core temperature, BGL, urinalysis if symptoms, pain score.",act:"Complete the observation set; calculate NEWS2 or check Between the Flags zones."}
 ],
 act:["Return to A to E if anything changes during the survey.","Document each system as examined, including normal findings.","Hand over with ISBAR: what you found, what you did, what you need."],
 sources:[{n:"StatPearls: trauma secondary survey",u:"https://www.ncbi.nlm.nih.gov/books/NBK441902/"},{n:"Deranged Physiology: primary, secondary and tertiary survey",u:"https://derangedphysiology.com/main/required-reading/trauma-intensive-care/Chapter-351/primary-secondary-and-tertiary-survey"}],
 regions:["neuro","eyes","neck","chest","abdomen","limbs","msk","skin"]},

{id:"tertiary",cat:"Emergency response",name:"Tertiary survey · the 24-hour re-look",short:"Tertiary survey",type:"steps",
 purpose:"A second complete head-to-toe examination plus a review of every result and image, within 24 hours of an injury or emergency, to catch what was missed. In hospital it is a formal trauma step; in the community it is the structured follow-up visit after a fall, collapse or injury.",
 when:"24 hours after any fall, injury, collapse, or emergency department discharge, and again when the person is awake, sober and mobile if they were not at the time.",
 steps:[
  {k:"1",t:"Re-take the history",look:"Now that they are alert: what actually happened, any loss of consciousness, new pain since, what has changed in function.",act:"Compare against the story on the day."},
  {k:"2",t:"Full head-to-toe again",look:"Every joint moved, every bony prominence pressed, walk them if safe. Occult fractures declare themselves: hip, pelvis, wrist, ribs, vertebrae.",act:"Pain on weight-bearing, on movement, or with a new limp: imaging."},
  {k:"3",t:"Delayed head injury signs",look:"Worsening headache, drowsiness, new confusion, vomiting, unequal pupils, unsteadiness, behaviour change. Subdural bleeds evolve over days to weeks, especially on anticoagulants.",act:"Any of these: same-day emergency assessment."},
  {k:"4",t:"Bruising and skin",look:"Bruises evolve over 24–72 hours and may reveal the mechanism. Skin tears, pressure areas from time on the floor.",act:"Photograph, chart, dress."},
  {k:"5",t:"Review all results",look:"Discharge summary, imaging reports, bloods, ECG, medication changes. What was ordered but not followed up?",act:"Chase the outstanding, act on the abnormal."},
  {k:"6",t:"Function and cause",look:"Compare transfers, gait and cognition against baseline. Work backwards through the fall: postural drop, medications, vision, footwear, continence, environment, pain, cognition.",act:"A fall is a symptom. Refer for the cause, not just the injury."}
 ],
 act:["Document as a tertiary survey with the date and time, so the next clinician knows a full re-examination was done.","Reset the falls plan and the escalation plan with the person and carer."],
 sources:[{n:"Tertiary trauma survey, Enderson 1990",u:"https://journals.lww.com/jtrauma/abstract/1990/06000/the_tertiary_trauma_survey__a_prospective_study_of.2.aspx"},{n:"Systematic review of tertiary surveys and missed injuries",u:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3546883/"}],
 regions:["msk","neuro","skin"]},

{id:"anaphylaxis",cat:"Emergency response",name:"Anaphylaxis · ASCIA action plan",short:"Anaphylaxis",type:"steps",
 purpose:"Recognise the difference between a mild or moderate allergic reaction and anaphylaxis, and give adrenaline early. Adrenaline is the treatment; antihistamines do not treat anaphylaxis.",
 when:"Any sudden reaction after food, insect sting, medication or unknown trigger.",
 steps:[
  {k:"1",t:"Mild to moderate reaction",look:"Swelling of lips, face or eyes; hives or welts; tingling mouth; abdominal pain or vomiting (these two are anaphylaxis signs for insect allergy).",act:"Stay with the person, call for help, locate the adrenaline device, give antihistamine if prescribed, remove the sting. Watch for anaphylaxis."},
  {k:"2",t:"Anaphylaxis: any ONE of",look:"Difficult or noisy breathing · swelling of tongue · swelling or tightness in throat · wheeze or persistent cough · difficulty talking or hoarse voice · persistent dizziness or collapse · pale and floppy (young child).",act:"Go straight to adrenaline."},
  {k:"3",t:"Position",look:"Lay the person FLAT. Do not let them stand or walk. Breathing difficulty: sit with legs outstretched. Unconscious or pregnant: recovery position (left side).",act:"Standing up during anaphylaxis can cause fatal collapse."},
  {k:"4",t:"Adrenaline IM",look:"Outer mid-thigh. 0.01 mg/kg up to 0.5 mg per dose. Autoinjector: over 50 kg 0.5 mg (Anapen 500 or EpiPen 300 per plan), 20–50 kg 0.3 mg, 7.5–20 kg 0.15 mg.",act:"Give now. Note the time. If in doubt, give adrenaline before the asthma reliever."},
  {k:"5",t:"Call 000",look:"Say anaphylaxis, adrenaline given, time.",act:"Second dose after 5 minutes if no improvement. Keep the used device to show paramedics."},
  {k:"6",t:"After",look:"Biphasic reactions occur. Observation for at least 4 hours after the last adrenaline dose, longer if severe.",act:"Do not let them go home from the scene. Adrenaline device replaced, action plan updated, allergy referral."}
 ],
 act:["Adrenaline first, even if unsure. The risk of withholding it outweighs the risk of giving it.","Never sit or stand a person who is dizzy or collapsing."],
 sources:[{n:"ASCIA Action Plan for Anaphylaxis 2025",u:"https://www.allergy.org.au/images/stories/anaphylaxis/2025/ASCIA_Action_Plan_Anaphylaxis_General_2025.pdf"},{n:"ASCIA acute management guidelines",u:"https://www.allergy.org.au/hp/anaphylaxis/acute-management-guidelines"}],
 regions:["mouth","chest","skin"]},

{id:"stroke",cat:"Emergency response",name:"Stroke · BE-FAST",short:"Stroke",type:"steps",
 purpose:"Six signs, any one of which is a stroke until proven otherwise. Time from onset decides treatment, so the clock matters more than the examination.",
 when:"Any sudden change in balance, vision, face, arm, speech, or new confusion.",
 steps:[
  {k:"B",t:"Balance",look:"Sudden loss of balance or coordination, vertigo, unable to stand or walk.",act:""},
  {k:"E",t:"Eyes",look:"Sudden loss of vision in one or both eyes, double vision, visual field loss.",act:""},
  {k:"F",t:"Face",look:"Ask them to smile. Droop or asymmetry on one side.",act:""},
  {k:"A",t:"Arms",look:"Both arms out, eyes closed, 10 seconds. One drifts down or cannot lift.",act:""},
  {k:"S",t:"Speech",look:"Slurred, wrong words, cannot understand, cannot speak.",act:""},
  {k:"T",t:"Time",look:"When were they last known to be well? Not when found.",act:"Call 000 immediately, even if the signs pass (TIA is a stroke warning). Check BGL to exclude hypoglycaemia. Nothing by mouth. Note anticoagulants and their last dose."}
 ],
 act:["Do not wait to see if it settles. Do not drive them yourself.","Record: time last known well, BGL, anticoagulant, GCS, which BE-FAST signs."],
 sources:[{n:"BE FAST stroke signs (Cleveland Clinic)",u:"https://health.clevelandclinic.org/be-fast-stroke"}],
 regions:["neuro","eyes","mouth","limbs"]},

{id:"chestpain",cat:"Emergency response",name:"Chest pain · acute coronary syndrome",short:"Chest pain",type:"steps",
 purpose:"Chest pain is cardiac until proven otherwise. Older adults, women and people with diabetes often present without classic pain.",
 when:"Any chest, jaw, arm or upper abdominal discomfort, or unexplained breathlessness, sweating, or collapse.",
 steps:[
  {k:"1",t:"Recognise",look:"Central pressure, tightness or heaviness; radiating to arm, jaw, neck or back; breathlessness; sweating; nausea; light-headedness. Atypical: fatigue, indigestion-like pain, breathlessness alone, confusion, collapse.",act:"Sit or lie the person down and stop all activity."},
  {k:"2",t:"Call 000",look:"Pain not relieved within 10 minutes of rest or GTN, or severe, or getting worse, or with any red-flag feature.",act:"Call early. Ambulance can do an ECG on scene."},
  {k:"3",t:"Aspirin",look:"No allergy, no active bleeding.",act:"300 mg chewed, per local protocol or ambulance instruction."},
  {k:"4",t:"GTN",look:"Only if prescribed to them and systolic BP is above 90, no PDE-5 inhibitor in the last 24–48 hours.",act:"One spray or tablet under the tongue, repeat every 5 minutes up to three doses if pain persists."},
  {k:"5",t:"Oxygen",look:"SpO₂ below 94% only.",act:"Routine oxygen is not helpful in ACS with normal saturation."},
  {k:"6",t:"Monitor",look:"Full observations every 5 minutes, ready to start DRSABCD.",act:"Stay with the person. Record pain onset time, character and what was given."}
 ],
 act:["Tearing pain to the back, unequal arm BPs: think aortic dissection, no aspirin, 000.","Pleuritic pain with breathlessness and a swollen leg: think pulmonary embolus."],
 sources:[{n:"Heart Foundation Australia: warning signs of heart attack",u:"https://www.heartfoundation.org.au/your-heart/heart-attack-warning-signs"}],
 regions:["vitals","chest"]},

{id:"hypo",cat:"Emergency response",name:"Hypoglycaemia and hyperglycaemia",short:"Blood glucose",type:"steps",
 purpose:"Low glucose is fixed in minutes and mimics stroke, intoxication and delirium. Check the glucose in every confused, drowsy or odd-behaving person.",
 when:"BGL below 4.0 mmol/L, any altered behaviour in a person on insulin or sulfonylureas, or BGL above 15 with symptoms.",
 steps:[
  {k:"1",t:"Recognise hypoglycaemia",look:"Early: sweating, tremor, palpitations, hunger, pallor, anxiety. Later: confusion, drowsiness, slurred speech, odd behaviour, seizures, unconsciousness. Older adults and those on beta-blockers may skip the early signs.",act:"Check BGL. Below 4.0 = treat."},
  {k:"2",t:"Conscious and able to swallow",look:"Rule of 15.",act:"15 g fast-acting carbohydrate: half a glass of juice or regular soft drink, 6–7 jellybeans, 3 teaspoons of sugar or honey, glucose tablets or gel. Recheck in 15 minutes. Repeat until BGL is 4.0 or above."},
  {k:"3",t:"Then a longer-acting carbohydrate",look:"Once above 4.0.",act:"A sandwich, glass of milk, biscuits, or the next meal if due. Recheck in 30–60 minutes."},
  {k:"4",t:"Drowsy, unable to swallow, or unconscious",look:"Nothing by mouth.",act:"Recovery position, 000. Glucagon 1 mg IM or nasal glucagon if available and you are trained. Recheck in 10–15 minutes."},
  {k:"5",t:"Find the cause",look:"Missed meal, extra activity, alcohol, wrong dose, sulfonylurea in renal decline, new weight loss.",act:"A sulfonylurea hypo can recur for 24 hours: medical review the same day."},
  {k:"6",t:"Hyperglycaemia",look:"Above 15: thirst, polyuria, dehydration, drowsiness, vomiting, abdominal pain, ketone breath, deep sighing breathing. Check ketones if type 1 or on SGLT2 inhibitors.",act:"Ketones above 1.5, vomiting, drowsiness, or BGL above 20 with symptoms: urgent medical review or 000. Push oral fluids if safe."}
 ],
 act:["Every hypo needs a reason found and a plan changed.","Recurrent hypos in an older adult on insulin or sulfonylureas are a de-prescribing conversation, not a reassurance."],
 sources:[{n:"Diabetes Australia: hypoglycaemia",u:"https://www.diabetesaustralia.com.au/living-with-diabetes/hypoglycaemia/"}],
 regions:["neuro","vitals"]},

{id:"seizure",cat:"Emergency response",name:"Seizure, choking and collapse",short:"Seizure / choking",type:"steps",
 purpose:"Three time-critical situations with simple, specific first actions.",
 when:"Witnessed seizure, choking on food or object, or sudden faint.",
 steps:[
  {k:"S",t:"Seizure: during",look:"Note the start time. Type of movement, which side started, incontinence, tongue biting, colour.",act:"Protect the head, move objects away, loosen clothing, do NOT restrain, NOTHING in the mouth. Time it."},
  {k:"S",t:"Seizure: after",look:"Post-ictal drowsiness and confusion are expected for up to 30–60 minutes.",act:"Recovery position, check airway and breathing, BGL, stay with them, check for injury."},
  {k:"S",t:"Seizure: call 000 if",look:"Longer than 5 minutes, a second seizure without recovery, first ever seizure, injury, in water, pregnant, diabetic, not waking, breathing difficulty, or known plan says so.",act:"Give emergency midazolam if prescribed and you are authorised, per the person's plan."},
  {k:"C",t:"Choking: effective cough",look:"Can speak, cough, breathe.",act:"Encourage coughing. Stay with them. Do not slap the back of someone who is coughing effectively."},
  {k:"C",t:"Choking: ineffective cough",look:"Cannot speak, silent cough, cannot breathe, going blue, clutching the throat.",act:"Call 000. Up to 5 back blows between the shoulder blades, then up to 5 chest thrusts (same point as CPR, sharper and slower). Alternate 5 and 5, checking the mouth between."},
  {k:"C",t:"Choking: unresponsive",look:"Collapses.",act:"Start DRSABCD. CPR compressions may dislodge the object. Check the mouth before breaths."},
  {k:"F",t:"Faint (syncope)",look:"Brief loss of consciousness with rapid recovery. Was there a warning? Exertional? Chest pain or palpitations? Injury?",act:"Lie flat, legs raised, postural BP once recovered, ECG. Syncope without warning, on exertion, or with palpitations needs urgent cardiac review."}
 ],
 act:["Record the timings: they change the treatment.","A first seizure in an older adult is a stroke, tumour, infection, hypoglycaemia or medication effect until proven otherwise."],
 sources:[{n:"ANZCOR Guideline 4: airway (choking)",u:"https://www.anzcor.org/home/basic-life-support/guideline-4-airway"},{n:"Epilepsy Action Australia: seizure first aid",u:"https://www.epilepsy.org.au/about-epilepsy/first-aid/"}],
 regions:["neuro","mouth"]},

{id:"isbar",cat:"Emergency response",name:"Escalate and hand over · ISBAR",short:"ISBAR",type:"list",
 purpose:"The structure for every phone call to a doctor, ambulance, rapid response or the next shift. It forces the recommendation to be said out loud.",
 when:"Any escalation, referral, or handover.",
 sections:[
  {h:"I · Identify",items:["Your name, role, location.","The person: name, age, date of birth, where they are."]},
  {h:"S · Situation",items:["One sentence: what is the problem right now, and how urgent.","Example: \"Mr X has become drowsy and his respiratory rate is 26, NEWS2 is 7.\""]},
  {h:"B · Background",items:["Relevant history, diagnoses, medications, allergies, code status or advance care directive.","What is normal for them (baseline cognition, mobility, observations)."]},
  {h:"A · Assessment",items:["Your observations with numbers and the trend. A to E findings. Score used (NEWS2, GCS, 4AT) and the number.","What you think is going on, or that you are not sure."]},
  {h:"R · Recommendation",items:["What you need and by when: \"I need a doctor to see them within 30 minutes\", \"I am calling an ambulance\", \"I want an order for...\".","Read back any instruction. Agree who is doing what, and when you will re-contact."]}
 ],
 act:["Say the score and the trend. \"He looks worse\" is real but \"NEWS2 was 2 this morning and is 6 now\" gets a response.","Document the call: time, who, what was agreed."],
 sources:[{n:"ACSQHC: clinical handover",u:"https://www.safetyandquality.gov.au/our-work/communicating-safety/clinical-handover"}],
 regions:[]},

/* ============ B. DETERIORATION ============ */
{id:"vitalscalc",cat:"Deterioration",name:"Vitals analyser · NEWS2 and Between the Flags",short:"Vitals analyser",type:"vitals",
 purpose:"Enter one set of observations. Get the NEWS2 aggregate score with its response, the Between the Flags zone each observation falls in, and a qSOFA count. Use whichever your service uses; both point the same way.",
 when:"Every full set of observations on anyone unwell, and whenever a soft sign of decline is noticed.",
 act:["A score is a trigger for a conversation, never a replacement for looking at the person.","Any single red-zone observation or any parameter scoring 3 is an urgent review regardless of the total.","Trend beats snapshot: compare with their usual observations."],
 sources:[{n:"RCP NEWS2 (2017)",u:"https://www.rightdecisions.scot.nhs.uk/media/2564/news2-874.pdf"},{n:"NSW CEC Standard Adult General Observation chart",u:"https://cec.health.nsw.gov.au/__data/assets/pdf_file/0012/258699/NSW-Health-Standard-Adult-General-Observation-Chart.PDF"},{n:"Q-ADDS vs NEWS vs BTF comparison",u:"https://pmc.ncbi.nlm.nih.gov/articles/PMC7896199/"}],
 regions:["vitals"]},

{id:"softsigns",cat:"Deterioration",name:"Soft signs of decline",short:"Soft signs",type:"list",
 purpose:"The changes carers and families notice days before the observations move. Any one of them is the cue to take a full set of observations and score them.",
 when:"At every visit, ask: is this person well today? What is different from last time?",
 sections:[
  {h:"Stop and Watch (any one = do a full set of observations)",items:["S · Seems different from usual","T · Talks or communicates less","O · Overall needs more help","P · Pain: new or worse","A · Ate less","N · No bowel movement in 3 days, or diarrhoea","D · Drank less","W · Weight change","A · Agitated or nervous more than usual","T · Tired, weak, confused or drowsy","C · Change in skin colour or condition","H · Help with walking, transfers or toileting more than usual"]},
  {h:"Other early signs worth acting on",items:["New or worse confusion, or more sleepy than usual","New incontinence, or not passing urine","More breathless, new cough, noisy breathing","Shivering, feels hot or cold, clammy","Skin mottled, pale, grey or blue","Unsteadier, a fall or near-fall","A wound that looks different: redder, smellier, wetter","Carer or family says they are worried, or says \"they are just not themselves\""]},
  {h:"What to do with a soft sign",items:["Full set of observations: RR, SpO₂, HR, BP (sitting and standing), temperature, ACVPU, BGL, pain, urine output.","Score it: NEWS2 or Between the Flags zone. Consider sepsis: could this be an infection?","Escalate with ISBAR. Say the soft sign and the score. Agree the plan and when to re-check.","Document the baseline you are comparing against."]}
 ],
 act:["A soft sign with normal observations still needs a plan and a re-check time. Physiology lags behind the carer's eye."],
 sources:[{n:"RESTORE2 and soft signs (Health Innovation Network)",u:"https://thehealthinnovationnetwork.co.uk/archive/spotting-the-early-soft-signs-of-deterioration-and-sepsis/"},{n:"Using Soft Signs to identify deterioration (white paper)",u:"https://www.healthinnovationoxford.org/wp-content/uploads/2024/06/Soft-Signs-White-Paper-GC-WPSC-Final-1.1.pdf"}],
 regions:["vitals","neuro","skin"]},

{id:"sepsis",cat:"Deterioration",name:"Sepsis screen",short:"Sepsis",type:"score",
 purpose:"Could this be sepsis? Suspected infection plus any red flag is time-critical. Older adults often have no fever; new confusion may be the only sign.",
 when:"Any suspected infection with a soft sign, any NEWS2 of 5 or more, or any single red-zone observation.",
 items:[
  {t:"Is infection likely?",opts:[[0,"No obvious source and no infection risk"],[1,"Possible or likely infection (chest, urine, skin, wound, abdomen, line, unknown source)"]]},
  {t:"Respiratory rate",opts:[[0,"Below 21"],[1,"21–24 (amber)"],[3,"25 or more, or new oxygen need to keep SpO₂ ≥ 92% (RED)"]]},
  {t:"Systolic BP",opts:[[0,"Above 100"],[1,"91–100 (amber)"],[3,"90 or below, or a drop of more than 40 from their usual (RED)"]]},
  {t:"Heart rate",opts:[[0,"Below 91"],[1,"91–130 or new arrhythmia (amber)"],[3,"Above 130 (RED)"]]},
  {t:"Mental state",opts:[[0,"Alert, at baseline"],[3,"New confusion, drowsiness, or responds only to voice or pain (RED)"]]},
  {t:"Urine output",opts:[[0,"Passing urine normally"],[1,"Reduced over 12–18 hours (amber)"],[3,"None for 18 hours, or catheter output under 0.5 mL/kg/h (RED)"]]},
  {t:"Skin",opts:[[0,"Normal"],[3,"Mottled, ashen, cyanosed, or a non-blanching rash (RED)"]]},
  {t:"Temperature",opts:[[0,"36.0–38.4"],[1,"Below 36.0, or 38.5 and above (amber)"]]},
  {t:"Risk factors",opts:[[0,"None"],[1,"Over 75, frail, immunosuppressed, recent chemotherapy, recent surgery or trauma, indwelling device, diabetes, pregnant or recently pregnant, Aboriginal or Torres Strait Islander person (amber)"]]}
 ],
 scoring:"sepsis",
 bands:[[0,0,"No infection suspected","ok","Keep watching. Re-screen if anything changes."],[1,2,"Infection likely, no flags","","Full observations, source assessment, medical review today, re-screen every visit."],[3,3,"Amber flags","warn","Urgent medical review within the hour. Repeat observations in 30 minutes. Any deterioration = red."],[4,99,"RED FLAG SEPSIS","bad","Call 000 or the rapid response now. Sepsis is time-critical: antibiotics within the hour, lactate, fluids. Hand over with ISBAR and say the word sepsis."]],
 act:["Fever is not required. A drop below their usual temperature is also a flag.","Ask: what was their temperature, heart rate and mental state last week? The change is the finding."],
 sources:[{n:"ACSQHC Sepsis Clinical Care Standard 2022",u:"https://www.safetyandquality.gov.au/standards/clinical-care-standards/sepsis-clinical-care-standard"},{n:"NSW CEC sepsis pathways",u:"https://www.cec.health.nsw.gov.au/keep-patients-safe/sepsis/sepsis-tools"}],
 regions:["vitals","neuro","skin","urinary"]},

{id:"gcs",cat:"Deterioration",name:"Glasgow Coma Scale",short:"GCS",type:"score",
 purpose:"Best eye, verbal and motor response, each recorded separately. Report the components (E4 V5 M6), not only the sum. A fall of 2 points or more is significant; a fall in the motor score is the most significant.",
 when:"Any altered consciousness, head injury, stroke, overdose, or as a serial neurological observation.",
 items:[
  {t:"Eye opening",opts:[[4,"Spontaneous","Open before you speak or touch"],[3,"To sound","Open when spoken to, or to a loud voice"],[2,"To pressure","Open only to fingertip pressure on the nail bed or trapezius"],[1,"None","No opening to any stimulus"],["NT","Not testable","Swelling, dressings, or paralysis prevent opening"]]},
  {t:"Verbal response",opts:[[5,"Orientated","Correctly gives name, place and month"],[4,"Confused","Talks in sentences but not orientated"],[3,"Words","Single words only, often to stimulus"],[2,"Sounds","Moans or groans, no words"],[1,"None","No sound"],["NT","Not testable","Intubated, tracheostomy, aphasia from stroke, language barrier not solvable"]]},
  {t:"Best motor response",opts:[[6,"Obeys commands","Two-step command, e.g. grip and release"],[5,"Localising","Brings hand above the clavicle to the stimulus at the head or neck"],[4,"Normal flexion","Bends arm at the elbow rapidly away from the body to the stimulus"],[3,"Abnormal flexion","Slow, stereotyped flexion, forearm rotates, thumb clenched (decorticate)"],[2,"Extension","Straightens elbow, arm rotates inward (decerebrate)"],[1,"None","No movement of arms or legs"],["NT","Not testable","Paralysed, spinal injury"]]},
  {t:"Pupils (for GCS-P)",opts:[[0,"Both react to light"],[-1,"One pupil unreactive"],[-2,"Both pupils unreactive"]]}
 ],
 scoring:"gcs",
 bands:[[13,15,"Mild impairment (13–15)","ok","Continue serial observations. Any drop of 2 points, or any drop in motor: urgent review."],[9,12,"Moderate impairment (9–12)","warn","Urgent medical review. Airway at risk if drowsy with vomiting. Consider cause: hypoglycaemia, sepsis, drugs, stroke, bleed."],[3,8,"Severe impairment (3–8)","bad","Airway may not be protected. Recovery position, call 000. GCS 8 or below is the intubation threshold in hospital."]],
 act:["Use pressure stimuli correctly: fingertip pressure on the nail bed (for a limb response), trapezius pinch or supraorbital notch pressure (for a central response).","Record what you saw, e.g. E3 V4 M5 = 12. Never record a total when a component is not testable.","GCS-P subtracts 1 for each unreactive pupil, range 1–15: it sharpens prognosis after head injury."],
 sources:[{n:"glasgowcomascale.org: the structured approach",u:"https://www.glasgowcomascale.org/faq/"},{n:"StatPearls: Glasgow Coma Scale",u:"https://www.ncbi.nlm.nih.gov/books/NBK513298/"}],
 regions:["neuro","eyes"]},

{id:"acvpu",cat:"Deterioration",name:"ACVPU · rapid consciousness check",short:"ACVPU",type:"list",
 purpose:"A five-letter scale used in NEWS2 and Between the Flags for a quick level of consciousness. Anything other than A is a trigger.",
 when:"Every set of observations; any time before a formal GCS.",
 sections:[
  {h:"The scale",items:["A · Alert: awake, eyes open, responding appropriately (roughly GCS 15)","C · Confusion: new or worsening confusion, disorientation or agitation in a person who is otherwise alert (scores 3 on NEWS2)","V · Voice: responds only when spoken to, then drifts (roughly GCS 12–13)","P · Pain: responds only to pressure or pain stimulus (roughly GCS 8–9)","U · Unresponsive: no response to voice or pain (roughly GCS 3–6)"]},
  {h:"What it triggers",items:["C, V, P or U on NEWS2 = 3 points, which on its own is an urgent review.","V = Between the Flags yellow zone. P or U = red zone: rapid response or 000.","Any new C: check BGL, oxygen, pain, urinary retention, constipation, medications, infection. Then 4AT for delirium."]}
 ],
 act:["ACVPU is a screen. Anything other than A gets a GCS with components and pupils recorded."],
 sources:[{n:"RCP NEWS2",u:"https://www.rightdecisions.scot.nhs.uk/media/2564/news2-874.pdf"}],
 regions:["neuro"]},

{id:"qsofa",cat:"Deterioration",name:"qSOFA",short:"qSOFA",type:"score",
 purpose:"Three bedside criteria that identify a person with suspected infection who is at higher risk of dying. Simple, but it misses early sepsis: a low qSOFA does not rule sepsis out.",
 when:"Suspected infection, alongside the fuller sepsis screen.",
 items:[
  {t:"Respiratory rate",opts:[[0,"Below 22"],[1,"22 or more"]]},
  {t:"Systolic BP",opts:[[0,"Above 100"],[1,"100 or below"]]},
  {t:"Mental state",opts:[[0,"GCS 15, at baseline"],[1,"Altered (GCS below 15, new confusion)"]]}
 ],
 bands:[[0,1,"qSOFA 0–1","ok","Lower risk, but keep screening: use the full sepsis screen and the trend."],[2,3,"qSOFA 2–3","bad","Higher risk of poor outcome. Treat as sepsis: urgent review, lactate, antibiotics within the hour."]],
 act:["qSOFA was designed to predict mortality, not to screen. NEWS2 of 5 or more is a more sensitive sepsis trigger."],
 sources:[{n:"Sepsis-3 definitions (JAMA 2016)",u:"https://jamanetwork.com/journals/jama/fullarticle/2492881"}],
 regions:["vitals"]},

/* ============ C. COGNITION & MENTAL STATE ============ */
{id:"mse",cat:"Cognition & mental state",name:"Mental State Examination",short:"MSE",type:"list",
 purpose:"A structured description of how a person appears, behaves, speaks, feels and thinks right now. Most of it is observed during any ordinary conversation. Use their words and your observations; avoid diagnoses.",
 when:"Any mental health concern, any change in behaviour or mood, after a life event, and as part of a comprehensive assessment.",
 sections:[
  {h:"Appearance",items:["Apparent age, build, grooming, hygiene, dress (appropriate to weather and setting), signs of self-neglect, weight change, physical signs: tremor, sweating, scars, needle marks, smell of alcohol."]},
  {h:"Behaviour",items:["Eye contact, rapport, cooperation, psychomotor activity (retarded, agitated, restless, pacing), abnormal movements (tremor, tardive dyskinesia, tics), posture, responding to unseen stimuli, guardedness, hostility."]},
  {h:"Speech",items:["Rate (slow, pressured), volume, tone, quantity (poverty of speech, monosyllabic, over-talkative), fluency, spontaneity. Speech is the form; content belongs under thought."]},
  {h:"Mood (what they say)",items:["Their own words: \"flat\", \"terrible\", \"fine\". Rate it 0–10 if useful. Ask about duration and diurnal variation."]},
  {h:"Affect (what you see)",items:["Range: full, restricted, blunted, flat. Reactivity: reactive, unreactive. Appropriateness to content. Stability: stable, labile. Quality: euthymic, depressed, anxious, irritable, elated."]},
  {h:"Thought form (process)",items:["Logical and goal-directed, or circumstantial, tangential, flight of ideas, loosening of associations, thought block, perseveration, poverty of thought."]},
  {h:"Thought content",items:["Preoccupations, worries, ruminations. Obsessions. Overvalued ideas. Delusions: persecutory, grandiose, guilt, nihilistic, reference, control. Suicidal or homicidal ideation: ask directly (see Risk)."]},
  {h:"Perception",items:["Hallucinations (auditory, visual, tactile, olfactory): ask \"do you ever hear or see things others cannot?\". Illusions. Depersonalisation, derealisation. Visual hallucinations suggest delirium, Lewy body disease, or drugs before they suggest a primary psychosis."]},
  {h:"Cognition",items:["Level of consciousness, orientation (person, place, time), attention (months backwards, serial 7s), memory (three-word recall), language, executive function. Screen with 4AT if acute, Mini-Cog, MoCA, RUDAS or KICA-Cog if chronic. Record the tool and score."]},
  {h:"Insight",items:["Do they recognise something is wrong, attribute it to illness, and accept help? Good, partial, or absent."]},
  {h:"Judgement",items:["Ability to make safe, reasonable decisions: \"what would you do if you smelled smoke in the house?\". Observed judgement about money, medications, driving, safety at home."]},
  {h:"Risk",items:["To self: suicidal thoughts, plan, means, intent, timeframe, previous attempts, self-neglect. Ask directly: asking does not plant the idea.","To others: thoughts of harming, access to weapons, dependants.","From others: abuse, neglect, financial exploitation.","Vulnerability: wandering, falls, fire, driving, medication errors.","Protective factors: reasons for living, supports, engagement with treatment, faith, future plans."]}
 ],
 act:["Immediate danger to self or others: do not leave the person alone; call 000. Mental health crisis lines: Lifeline 13 11 14, or the local acute care team.","Document observations, not conclusions: \"tearful, spoke slowly, said 'I would be better off dead', denied plan or intent, agreed to safety plan and next-day follow-up\"."],
 sources:[{n:"RCH Clinical Practice Guideline: mental state examination",u:"https://www.rch.org.au/clinicalguide/guideline_index/mental_state_examination/"},{n:"British Journal of Nursing: the Mental State Examination",u:"https://www.britishjournalofnursing.com/content/clinical/the-mental-state-examination"}],
 regions:["neuro"]},

{id:"4at",cat:"Cognition & mental state",name:"4AT · delirium screen",short:"4AT",type:"score",
 purpose:"A two-minute delirium screen that needs no special training and works when the person cannot fully engage. Four or more suggests delirium.",
 when:"Any acute change in behaviour, alertness or cognition; any soft sign of decline in an older adult; on admission and daily during illness.",
 items:[
  {t:"1 · Alertness",d:"Observe. If asleep, try to wake with speech or a gentle touch on the shoulder.",opts:[[0,"Normal, fully alert but not agitated, throughout"],[0,"Mild sleepiness for under 10 seconds after waking, then normal"],[4,"Clearly abnormal: drowsy, hard to rouse, or agitated and hyperactive"]]},
  {t:"2 · AMT4",d:"Age, date of birth, place (name of the building), current year.",opts:[[0,"No mistakes"],[1,"1 mistake"],[2,"2 or more mistakes, or untestable"]]},
  {t:"3 · Attention",d:"\"Please tell me the months of the year backwards, starting at December.\" One prompt of \"what is the month before December?\" is allowed.",opts:[[0,"Achieves 7 months or more correctly"],[1,"Starts but scores under 7 months, or refuses to start"],[2,"Untestable: cannot start because unwell, drowsy, inattentive"]]},
  {t:"4 · Acute change or fluctuating course",d:"Evidence of significant change or fluctuation in alertness, cognition or other mental function (paranoia, hallucinations) arising over the last 2 weeks and still evident in the last 24 hours. Ask the carer.",opts:[[0,"No"],[4,"Yes"]]}
 ],
 bands:[[0,0,"0 · Delirium or severe cognitive impairment unlikely","ok","Re-screen if anything changes. A score of 0 does not exclude delirium if the history is strong."],[1,3,"1–3 · Possible cognitive impairment","warn","More detailed cognitive testing when well. Still watch for delirium."],[4,99,"4 or more · Possible delirium","bad","Delirium until proven otherwise. Find the cause today: infection, dehydration, pain, retention, constipation, hypoxia, hypoglycaemia, new drugs (especially anticholinergics, opioids, benzodiazepines), alcohol withdrawal, stroke. Medical review same day. Safety, orientation, hydration, glasses and hearing aids, family present."]],
 act:["Hypoactive delirium (quiet, withdrawn, sleepy) is more common than the agitated kind and is missed more often.","A 4AT does not diagnose dementia. Screen for dementia when the delirium has resolved."],
 sources:[{n:"the4AT.com",u:"https://www.the4at.com/"},{n:"4AT tool PDF",u:"https://healthinnovationmanchester.com/wp-content/uploads/2018/10/Delirium-assessment-tool-4AT.pdf"}],
 regions:["neuro"]},

{id:"3ds",cat:"Cognition & mental state",name:"Delirium, dementia or depression?",short:"The three Ds",type:"table",
 purpose:"The three commonest causes of a change in an older person's thinking overlap and coexist. This table separates them on the features that matter at the bedside.",
 when:"Any new confusion, withdrawal or functional decline.",
 columns:["Feature","Delirium","Dementia","Depression"],
 rows:[
  ["Onset","Hours to days, a clear point of change","Months to years, insidious","Weeks to months, often after a loss or event"],
  ["Course","Fluctuates through the day, worse at night","Slowly progressive, stable day to day","Persistent low mood, may be worse in the morning"],
  ["Consciousness","Clouded, drowsy or hyper-alert","Clear until late","Clear"],
  ["Attention","Impaired: cannot do months backwards","Usually intact early","Poor concentration but can be engaged"],
  ["Orientation","Disorientated, fluctuating","Disorientated to time first, then place","Usually orientated"],
  ["Memory","Poor recent and immediate","Recent memory lost first, remote preserved","\"I don't know\" answers, effort poor"],
  ["Thinking","Disorganised, incoherent","Impoverished, word-finding difficulty","Slowed, negative, hopeless"],
  ["Perception","Visual hallucinations common","Hallucinations later (early in Lewy body)","Rarely, unless psychotic"],
  ["Sleep","Reversed day–night","Fragmented","Early waking or oversleeping"],
  ["Reversible?","Yes, if the cause is found and treated","No, but decline can be slowed and function supported","Yes, with treatment"],
  ["First tool","4AT","Mini-Cog, MoCA, RUDAS, KICA-Cog when well","GDS-15, PHQ-9, ask about mood directly"]
 ],
 act:["Delirium sits on top of dementia. A person with dementia who is suddenly worse has delirium until proven otherwise.","Depression in older adults presents as pain, tiredness, poor appetite and withdrawal more often than as sadness."],
 sources:[{n:"Australian Delirium Clinical Care Standard 2021",u:"https://www.safetyandquality.gov.au/standards/clinical-care-standards/delirium-clinical-care-standard"}],
 regions:["neuro"]},

{id:"minicog",cat:"Cognition & mental state",name:"Mini-Cog · three words and a clock",short:"Mini-Cog",type:"steps",
 purpose:"A three-minute dementia screen for a person who is currently well (not delirious). It is a screen, not a diagnosis.",
 when:"Concern about memory or function, before formal screening with MoCA, RUDAS or KICA-Cog.",
 steps:[
  {k:"1",t:"Three-word registration",look:"\"Listen carefully. I am going to say three words that I want you to repeat back to me now and try to remember: banana, sunrise, chair.\" (Any validated word list.)",act:"Repeat up to three times until they can say all three back."},
  {k:"2",t:"Clock drawing",look:"Blank circle, or ask them to draw one. \"Put in all the numbers as they appear on a clock, then set the hands to ten past eleven.\"",act:"Normal = all numbers in roughly the right position, two hands pointing to 11 and 2. Anything else = abnormal (0 points)."},
  {k:"3",t:"Word recall",look:"\"What were the three words I asked you to remember?\"",act:"1 point per word, 0–3."},
  {k:"4",t:"Score",look:"Recall 0–3 plus clock 0 or 2. Total 0–5.",act:"0–2 = positive screen for cognitive impairment. 3–5 = negative screen (but 3 with an abnormal clock still warrants a closer look)."}
 ],
 act:["Language, education, vision and hearing all affect the result. RUDAS is fairer across cultures and languages; KICA-Cog for Aboriginal and Torres Strait Islander people in remote settings.","Record the tool and the score, and what the person was like on the day."],
 sources:[{n:"Mini-Cog official site",u:"https://mini-cog.com/"},{n:"Dementia Australia: cognitive screening tools",u:"https://www.dementia.org.au/professionals/assessment-and-diagnosis/cognitive-screening-and-assessment"}],
 regions:["neuro"]},

/* ============ D. RISK SCREENS ============ */
{id:"braden",cat:"Risk screens",name:"Braden Scale · pressure injury risk",short:"Braden",type:"score",
 purpose:"Six subscales, lower is worse. The subscale scores tell you what to fix; the total tells you how urgently.",
 when:"On admission to a service, after any change in condition or mobility, and at set intervals.",
 items:[
  {t:"Sensory perception",d:"Ability to respond meaningfully to pressure-related discomfort.",opts:[[1,"Completely limited","Unresponsive, or cannot feel pain over most of the body"],[2,"Very limited","Responds only to pain, or cannot feel over half the body"],[3,"Slightly limited","Responds to voice but cannot always say where it hurts, or one or two limbs numb"],[4,"No impairment",""]]},
  {t:"Moisture",d:"Degree the skin is exposed to moisture.",opts:[[1,"Constantly moist","Wet nearly every time turned"],[2,"Very moist","Linen changed at least once a shift"],[3,"Occasionally moist","Extra linen change about once a day"],[4,"Rarely moist",""]]},
  {t:"Activity",opts:[[1,"Bedfast",""],[2,"Chairfast","Cannot walk, needs help into the chair"],[3,"Walks occasionally","Short distances with or without help, most of the time in bed or chair"],[4,"Walks frequently","Outside the room twice a day and inside every two hours"]]},
  {t:"Mobility",d:"Ability to change and control body position.",opts:[[1,"Completely immobile",""],[2,"Very limited","Occasional slight changes, cannot make significant changes alone"],[3,"Slightly limited","Frequent slight changes alone"],[4,"No limitation",""]]},
  {t:"Nutrition",opts:[[1,"Very poor","Under a third of meals, little fluid, or nil by mouth over 5 days"],[2,"Probably inadequate","About half of meals, or under the recommended supplement or tube feed"],[3,"Adequate","Over half of most meals, or tube feed or TPN meeting needs"],[4,"Excellent","Most of every meal, never refuses"]]},
  {t:"Friction and shear",opts:[[1,"Problem","Needs moderate to maximum help to move, slides down in bed or chair, spasticity or agitation"],[2,"Potential problem","Moves feebly or needs minimum help, skin probably slides against sheets"],[3,"No apparent problem","Moves independently and lifts up completely"]]}
 ],
 bands:[[19,23,"19–23 · Not at risk","ok","Reassess with any change."],[15,18,"15–18 · Mild risk","","Pressure-relieving surface, turning schedule, moisture and nutrition plan, heel offloading."],[13,14,"13–14 · Moderate risk","warn","As above plus a formal repositioning schedule and dietitian review."],[10,12,"10–12 · High risk","bad","Alternating pressure mattress, 2-hourly repositioning, heel offloading, skin check every shift, dietitian."],[6,9,"6–9 · Very high risk","bad","All of the above; daily skin inspection of every pressure point; wound care referral early."]],
 act:["Fix the lowest subscale first: it is the modifiable thing.","A darker skin tone needs temperature, firmness and pain used to detect stage 1, not redness."],
 sources:[{n:"Braden Scale (WisTech Nursing Fundamentals)",u:"https://wtcs.pressbooks.pub/nursingfundamentals/chapter/10-5-braden-scale/"}],
 regions:["skin"]},

{id:"frat",cat:"Risk screens",name:"FRAT · falls risk (Part 1)",short:"FRAT",type:"score",
 purpose:"The Falls Risk Assessment Tool used across Australian community and residential care. Part 1 gives the risk status; Part 2 is the risk-factor checklist that drives the plan.",
 when:"On admission, after any fall, and after any change in medication, mobility or cognition.",
 items:[
  {t:"Recent falls",opts:[[2,"None in the last 12 months"],[4,"One or more between 3 and 12 months ago"],[6,"One or more in the last 3 months"],[8,"One or more in the last 3 months while an inpatient or resident"]]},
  {t:"Medications",d:"Sedatives, antidepressants, anti-Parkinson drugs, diuretics, antihypertensives, hypnotics.",opts:[[1,"Not taking any of these"],[2,"Taking one"],[3,"Taking two"],[4,"Taking more than two"]]},
  {t:"Psychological",d:"Anxiety, depression, reduced cooperation, reduced insight or judgement, especially about mobility.",opts:[[1,"None of these"],[2,"Mildly affected by one or more"],[3,"Moderately affected"],[4,"Severely affected"]]},
  {t:"Cognitive status (AMTS)",opts:[[1,"Intact (AMTS 9–10)"],[2,"Mildly impaired (7–8)"],[3,"Moderately impaired (5–6)"],[4,"Severely impaired (4 or less)"]]}
 ],
 bands:[[5,11,"5–11 · Low risk","ok","Standard precautions, review with any change."],[12,15,"12–15 · Medium risk","warn","Complete Part 2 risk factors and a falls prevention plan: footwear, aids, environment, vision, continence, exercise."],[16,20,"16–20 · High risk","bad","Full multifactorial assessment, medication review with the GP or pharmacist, physiotherapy, supervision plan, alarm."]],
 act:["Automatic HIGH risk regardless of score: a recent change in functional status or medications affecting safe mobility, or dizziness and postural hypotension.","Ask the three STEADI questions too: fallen in the past year, unsteady when standing or walking, worried about falling. Any yes = at risk."],
 sources:[{n:"FRAT (Peninsula Health) via Victorian Department of Health",u:"https://www.health.vic.gov.au/publications/falls-risk-assessment-tool-frat"},{n:"STEADI three key questions (AGS 2025 update)",u:"https://pmc.ncbi.nlm.nih.gov/articles/PMC12303747/"}],
 regions:["msk","vitals","limbs"]},

{id:"must",cat:"Risk screens",name:"MUST · malnutrition screen",short:"MUST",type:"score",
 purpose:"Three questions: body mass index, unplanned weight loss, and acute illness. Weight loss in an older adult is a disease sign, a dental problem or a depression sign until proven otherwise.",
 when:"On admission and monthly, or with any weight change, poor appetite or loose clothing or dentures.",
 items:[
  {t:"BMI",opts:[[0,"Over 20 (over 30 is obese)"],[1,"18.5–20"],[2,"Under 18.5"]]},
  {t:"Unplanned weight loss in the last 3–6 months",opts:[[0,"Under 5%"],[1,"5–10%"],[2,"Over 10%"]]},
  {t:"Acute disease effect",opts:[[0,"No"],[2,"Acutely ill and there has been, or is likely to be, no nutritional intake for more than 5 days"]]}
 ],
 bands:[[0,0,"0 · Low risk","ok","Routine care, repeat monthly in care settings, annually in the community."],[1,1,"1 · Medium risk","warn","Document intake for 3 days. If inadequate, food-first plan and dietitian referral. Repeat monthly."],[2,99,"2 or more · High risk","bad","Dietitian referral, treat the cause (teeth, swallowing, mood, medication, disease), fortified food and supplements, weekly weight."]],
 act:["Cannot weigh? Use mid-upper arm circumference under 23.5 cm as a proxy for BMI under 20.","Check the teeth, the swallow, the mood, the money and the shopping before assuming disease."],
 sources:[{n:"BAPEN MUST",u:"https://www.bapen.org.uk/must-and-self-screening/must-calculator/"}],
 regions:["mouth","abdomen"]},

{id:"abbey",cat:"Risk screens",name:"Abbey Pain Scale",short:"Abbey",type:"score",
 purpose:"For people with dementia or who cannot verbalise pain. Score behaviour, and score it while moving them, not only at rest.",
 when:"Any agitation, resistance to care, withdrawal or functional decline in a person who cannot report pain; before and after analgesia.",
 items:[
  {t:"Vocalisation",d:"Whimpering, groaning, crying.",opts:[[0,"Absent"],[1,"Mild"],[2,"Moderate"],[3,"Severe"]]},
  {t:"Facial expression",d:"Tense, frowning, grimacing, frightened.",opts:[[0,"Absent"],[1,"Mild"],[2,"Moderate"],[3,"Severe"]]},
  {t:"Change in body language",d:"Fidgeting, rocking, guarding a part, withdrawn.",opts:[[0,"Absent"],[1,"Mild"],[2,"Moderate"],[3,"Severe"]]},
  {t:"Behavioural change",d:"Increased confusion, refusing food, alteration in usual patterns.",opts:[[0,"Absent"],[1,"Mild"],[2,"Moderate"],[3,"Severe"]]},
  {t:"Physiological change",d:"Temperature, pulse or BP outside normal, perspiring, flushing or pallor.",opts:[[0,"Absent"],[1,"Mild"],[2,"Moderate"],[3,"Severe"]]},
  {t:"Physical changes",d:"Skin tears, pressure areas, arthritis, contractures, previous injuries.",opts:[[0,"Absent"],[1,"Mild"],[2,"Moderate"],[3,"Severe"]]}
 ],
 bands:[[0,2,"0–2 · No pain","ok","Reassess with movement and at the next care episode."],[3,7,"3–7 · Mild pain","","Simple analgesia, comfort measures, reassess in 1 hour."],[8,13,"8–13 · Moderate pain","warn","Regular analgesia review, look for the cause, reassess in 1 hour."],[14,18,"14–18 · Severe pain","bad","Urgent analgesia and medical review; consider fracture, retention, constipation, infection, pressure injury."]],
 act:["Record whether the pain is chronic, acute, or acute on chronic.","A trial of analgesia that settles the behaviour is diagnostic."],
 sources:[{n:"Abbey Pain Scale (Physiopedia)",u:"https://www.physio-pedia.com/Abbey_Pain_Scale"}],
 regions:["pain"]},

{id:"painad",cat:"Risk screens",name:"PAINAD",short:"PAINAD",type:"score",
 purpose:"Pain Assessment in Advanced Dementia. Five items scored 0–2 after observing for 5 minutes, ideally during activity or care.",
 when:"Same uses as the Abbey scale; use whichever your service has adopted, consistently.",
 items:[
  {t:"Breathing (independent of vocalisation)",opts:[[0,"Normal"],[1,"Occasional laboured breathing, short period of hyperventilation"],[2,"Noisy laboured breathing, long period of hyperventilation, Cheyne-Stokes"]]},
  {t:"Negative vocalisation",opts:[[0,"None"],[1,"Occasional moan or groan, low-level speech with a negative or disapproving quality"],[2,"Repeated troubled calling out, loud moaning or groaning, crying"]]},
  {t:"Facial expression",opts:[[0,"Smiling or inexpressive"],[1,"Sad, frightened, frown"],[2,"Facial grimacing"]]},
  {t:"Body language",opts:[[0,"Relaxed"],[1,"Tense, distressed pacing, fidgeting"],[2,"Rigid, fists clenched, knees pulled up, pulling or pushing away, striking out"]]},
  {t:"Consolability",opts:[[0,"No need to console"],[1,"Distracted or reassured by voice or touch"],[2,"Unable to console, distract or reassure"]]}
 ],
 bands:[[0,0,"0 · No pain","ok",""],[1,3,"1–3 · Mild pain","","Comfort measures, simple analgesia, reassess."],[4,6,"4–6 · Moderate pain","warn","Analgesia review and cause-finding."],[7,10,"7–10 · Severe pain","bad","Urgent analgesia and medical review."]],
 act:["Score during care (transfers, dressing changes) as well as at rest; pain at rest only is the exception."],
 sources:[{n:"PAINAD (Warden, Hurley, Volicer 2003)",u:"https://geriatrictoolkit.missouri.edu/cog/painad.pdf"}],
 regions:["pain"]},

{id:"cfs",cat:"Risk screens",name:"Clinical Frailty Scale",short:"Frailty",type:"table",
 purpose:"A nine-point judgement of how the person was two weeks before this illness. Frailty changes what deterioration means, how far to escalate, and what recovery is realistic.",
 when:"On admission to a service, with any decline, and in any conversation about goals of care.",
 columns:["Score","Label","What it looks like"],
 rows:[
  ["1","Very fit","Robust, active, energetic, exercises regularly, among the fittest for their age"],
  ["2","Fit","No active disease symptoms, less fit than 1, active occasionally or seasonally"],
  ["3","Managing well","Medical problems well controlled, not regularly active beyond walking"],
  ["4","Living with very mild frailty","Not dependent on others but symptoms limit activities; \"slowed up\", tired during the day"],
  ["5","Living with mild frailty","Needs help with higher-order tasks: finances, transport, heavy housework, medications. Shopping and walking outside becoming hard"],
  ["6","Living with moderate frailty","Needs help with all outside activities and housekeeping; trouble with stairs; help with bathing; may need minimal help with dressing"],
  ["7","Living with severe frailty","Completely dependent for personal care, but stable and not at high risk of dying within 6 months"],
  ["8","Living with very severe frailty","Completely dependent, approaching the end of life, could not recover from even a minor illness"],
  ["9","Terminally ill","Life expectancy under 6 months, not otherwise living with severe frailty"]
 ],
 act:["Score the baseline, not the sick day.","A CFS of 5 or more with a new decline is the time for a goals-of-care and advance care planning conversation, if not already had."],
 sources:[{n:"Clinical Frailty Scale (Dalhousie University)",u:"https://www.dal.ca/sites/gmr/our-tools/clinical-frailty-scale.html"}],
 regions:["msk"]},

/* ============ E. SIGNS OF DISEASE ============ */
{id:"disease",cat:"Signs of disease",name:"Signs of disease · by system",short:"Signs of disease",type:"cards",
 purpose:"The early signs, the red flags, and where on the body to look, for the conditions that most often turn up in community assessment. Early signs in older adults are usually functional: confusion, falls, off food, incontinence.",
 when:"Use as a reference when a soft sign or an observation is out of range, to decide what to examine next.",
 cards:[
  {t:"Heart failure",early:["Breathless on effort, then lying flat (orthopnoea), waking breathless at night","Weight gain of 2 kg in 3 days","Bilateral ankle oedema, tight shoes","Tiredness, reduced exercise tolerance, nocturia"],red:["Breathless at rest, cannot speak in sentences, frothy sputum","New basal crackles with raised JVP","SpO₂ falling, tripod posture, confusion"],check:["vitals","chest","neck","limbs"]},
  {t:"Acute coronary syndrome",early:["Chest pressure on effort, indigestion that will not settle","Unexplained fatigue, breathlessness, sweating","Atypical in women, older adults, diabetes: nausea, jaw or back pain, collapse"],red:["Chest pain at rest over 10 minutes, with sweating or nausea","Pain with hypotension, arrhythmia or collapse"],check:["vitals","chest"]},
  {t:"Atrial fibrillation",early:["Irregularly irregular pulse, palpitations, pulse deficit between apex and radial","Fatigue, breathlessness, dizziness"],red:["Heart rate over 130, chest pain, hypotension","New AF with BE-FAST signs (stroke)"],check:["vitals","neuro"]},
  {t:"DVT and pulmonary embolus",early:["One calf swollen, warm, tender; difference of more than 3 cm between calves","Recent immobility, surgery, cancer, long travel"],red:["Sudden breathlessness, pleuritic chest pain, haemoptysis","Tachycardia, SpO₂ under 94%, collapse"],check:["limbs","chest","vitals"]},
  {t:"Pneumonia and chest infection",early:["New cough or change in sputum colour, breathless on effort","In older adults: confusion, falls, off food, no fever","Focal crackles or bronchial breathing"],red:["RR 25 or more, SpO₂ under 92%, new confusion, SBP 90 or below (sepsis)","Pleuritic pain, rigors, cyanosis"],check:["chest","vitals","neuro"]},
  {t:"COPD exacerbation",early:["More breathless than usual, more sputum or a colour change, more wheeze","Using reliever more, sleeping upright, less able to do usual tasks"],red:["Cannot complete a sentence, RR over 25, drowsy (CO₂ retention), SpO₂ below their target (usually 88–92%)","Cyanosis, silent chest, confusion"],check:["chest","vitals","neuro"]},
  {t:"Asthma",early:["Wheeze, cough at night or with exercise, chest tightness, reliever use rising"],red:["Cannot speak in sentences, RR over 25, HR over 110, SpO₂ under 92%, silent chest, exhaustion, drowsiness"],check:["chest","vitals"]},
  {t:"Urinary tract infection (older adults)",early:["Dysuria, frequency, urgency, new incontinence, suprapubic pain, haematuria","Note: smelly or cloudy urine and a positive dipstick without symptoms are NOT a UTI in an older adult"],red:["Fever or rigors with flank pain (pyelonephritis)","New confusion with any two urinary symptoms, or sepsis flags"],check:["urinary","abdomen","vitals"]},
  {t:"Urinary retention",early:["Passing small amounts often, dribbling, feeling of incomplete emptying","New anticholinergic, opioid, or constipation; prostate history"],red:["No urine for 8–12 hours with a palpable tender bladder, restlessness or new confusion","Bladder scan over 400–500 mL"],check:["urinary","abdomen","neuro"]},
  {t:"Constipation and faecal impaction",early:["Fewer bowel motions than their normal, straining, Bristol 1–2, abdominal bloating","Opioids, anticholinergics, iron, dehydration, immobility"],red:["Overflow liquid stool with a loaded rectum","Vomiting, distension, absent bowel sounds (obstruction)","New confusion or urinary retention in a frail person"],check:["bowel","abdomen"]},
  {t:"Gastrointestinal bleed",early:["Black tarry stool (melaena), coffee-ground vomit, new anaemia symptoms, NSAID or anticoagulant use"],red:["Bright red vomiting or large melaena with tachycardia, postural drop, pallor, collapse"],check:["abdomen","vitals","skin"]},
  {t:"Acute kidney injury",early:["Reduced urine output, nausea, drowsiness, new oedema","Triggers: dehydration, vomiting or diarrhoea, NSAIDs, ACE inhibitors, diuretics, sepsis"],red:["Under 0.5 mL/kg/h for 6 hours or none for 12 hours","Confusion, breathlessness (fluid overload), potassium high on bloods"],check:["urinary","vitals","limbs"]},
  {t:"Dehydration",early:["Dry mouth and axilla, concentrated urine, headache, tiredness, constipation","Thirst is blunted in older adults; skin turgor is unreliable"],red:["Postural drop, tachycardia, confusion, oliguria, weight loss of 3% or more in days"],check:["vitals","mouth","skin","urinary"]},
  {t:"Hyponatraemia",early:["Nausea, headache, lethargy, unsteadiness, mild confusion","Thiazides, SSRIs, carbamazepine, excess fluid intake, SIADH"],red:["Seizure, vomiting, drowsiness, sodium under 125 on bloods"],check:["neuro","msk"]},
  {t:"Thyroid disease",early:["Hypo: tiredness, cold intolerance, weight gain, constipation, dry skin, slow pulse, low mood","Hyper: weight loss, heat intolerance, tremor, palpitations, anxiety, diarrhoea, new AF"],red:["Myxoedema: hypothermia, bradycardia, drowsiness","Thyroid storm: fever, HR over 140, agitation, delirium"],check:["neck","vitals","skin"]},
  {t:"Anaemia",early:["Tiredness, breathless on effort, pallor of conjunctiva and palmar creases, dizziness","Melaena, heavy periods, poor diet, NSAIDs"],red:["Chest pain, HR over 110 at rest, collapse, active bleeding"],check:["eyes","vitals","abdomen"]},
  {t:"Stroke and TIA",early:["Any BE-FAST sign, even if transient","Sudden severe headache, new visual loss, new unsteadiness"],red:["Any BE-FAST sign now: call 000 with time last known well"],check:["neuro","eyes","mouth","limbs"]},
  {t:"Head injury and subdural haematoma",early:["After a fall, especially on anticoagulants: headache, drowsiness, subtle confusion, unsteadiness over days to weeks","Older adults may have no memory of hitting their head"],red:["Vomiting, GCS drop, unequal pupils, seizure, new weakness"],check:["neuro","eyes","msk"]},
  {t:"Parkinson's disease decline",early:["Slower, stiffer, more falls, freezing, quieter voice, swallowing changes, constipation, hallucinations","Missed or late doses show within hours"],red:["Unable to swallow medications (never stop levodopa abruptly), aspiration, rigidity with fever (neuroleptic malignant-like state)"],check:["msk","mouth","neuro"]},
  {t:"Depression in older adults",early:["Withdrawal, poor appetite and weight loss, sleep change, pain complaints, \"I don't know\" answers, giving things away"],red:["Suicidal thoughts with plan or intent, stopped eating and drinking, psychotic features"],check:["neuro"]},
  {t:"Cellulitis and wound infection",early:["Spreading redness, warmth, swelling, pain; a wound that is wetter, smellier or has a new slough","Diabetes and lymphoedema raise the risk"],red:["Red streaks tracking up the limb, blistering, crepitus, pain out of proportion (necrotising infection), sepsis flags"],check:["skin","limbs","vitals"]},
  {t:"Pressure injury",early:["Non-blanching redness, or in darker skin a change in hue with warmth, firmness or pain, over a bony prominence"],red:["Skin loss, exposed fat or deeper, purple or maroon boggy area (deep tissue injury), signs of infection"],check:["skin"]},
  {t:"Meningitis and encephalitis",early:["Fever, headache, neck stiffness, photophobia, vomiting, drowsiness","Older adults: confusion and fever without neck stiffness"],red:["Non-blanching rash, seizures, GCS drop, sepsis flags: 000"],check:["neck","neuro","skin"]},
  {t:"Hypothermia and heat illness",early:["Cold: shivering, confusion, slow speech, cold home, poor intake. Heat: cramps, headache, nausea, dizziness, hot dry or clammy skin"],red:["Core under 35 °C with drowsiness or arrhythmia; core over 40 °C with confusion (heat stroke): 000, cool actively"],check:["vitals","skin","neuro"]},
  {t:"Medication toxicity",early:["Opioids: drowsiness, pinpoint pupils, slow breathing, constipation. Anticholinergics: dry mouth, retention, confusion, blurred vision. Digoxin: nausea, visual haloes, bradycardia. Lithium: tremor, diarrhoea, confusion","Recent dose change, new interaction, dehydration or kidney decline"],red:["RR under 10 or ACVPU below A (opioids: naloxone, 000)","HR under 45, syncope, seizure"],check:["neuro","eyes","vitals"]}
 ],
 act:["Any new confusion, fall, incontinence or loss of function in an older adult is a symptom of one of these until proven otherwise.","Check the medication chart before the disease list: a new drug or a missed one explains a large share of decline."],
 sources:[{n:"Australian Delirium Clinical Care Standard",u:"https://www.safetyandquality.gov.au/standards/clinical-care-standards/delirium-clinical-care-standard"},{n:"ACSQHC Sepsis Clinical Care Standard",u:"https://www.safetyandquality.gov.au/standards/clinical-care-standards/sepsis-clinical-care-standard"}],
 regions:[]},

{id:"atypical",cat:"Signs of disease",name:"Atypical presentation in older adults",short:"Atypical",type:"table",
 purpose:"The textbook sign is often absent. These are the substitutions to expect, and why the change from baseline matters more than the absolute value.",
 when:"Any time an older or frail person is \"a bit off\" and the obvious signs are missing.",
 columns:["Condition","Textbook sign","What you may see instead"],
 rows:[
  ["Infection (any source)","Fever, raised white cells","No fever; a rise of 1.1 °C above their usual baseline, or a temperature under 36; new confusion, falls, off food, incontinence, functional decline"],
  ["Pneumonia","Cough, sputum, pleuritic pain","Confusion, tachypnoea alone, falls, drowsiness; cough may be absent"],
  ["Myocardial infarction","Crushing chest pain","Breathlessness, fatigue, confusion, collapse, indigestion, no pain at all"],
  ["Abdominal emergency (perforation, ischaemia)","Rigid tender abdomen","Mild tenderness, vague pain, vomiting, confusion; steroids and diabetes mask signs"],
  ["Hypothyroidism","Weight gain, cold intolerance","Apathy, depression, cognitive slowing, constipation, falls"],
  ["Hyperthyroidism","Anxiety, tremor, weight loss","Apathetic thyrotoxicosis: depression, weight loss, new atrial fibrillation"],
  ["Depression","Sadness, tearfulness","Somatic complaints, pain, poor appetite, insomnia, memory complaints, \"pseudodementia\""],
  ["Hypoglycaemia","Sweating, tremor, hunger","Confusion, odd behaviour, drowsiness, falls; adrenergic warning blunted by age and beta-blockers"],
  ["Urinary retention","Pain, inability to void","Restlessness, agitation, new confusion, overflow incontinence"],
  ["Dehydration","Thirst, dry skin","No thirst; drowsiness, confusion, postural drop, constipation, falls"],
  ["Pain","Reports pain","Agitation, resistance to care, withdrawal, sleep change, refusing food, aggression"],
  ["Head injury","Headache after the fall","No recall of the fall; slow decline in alertness or mobility over days to weeks"]
 ],
 act:["Know the baseline. Record their usual temperature, pulse, blood pressure, cognition and function so the change is measurable.","Fever thresholds in older adults: a single reading of 37.8 °C or more, a persistent 37.2 °C or more, or a rise of 1.1 °C over baseline."],
 sources:[{n:"Infectious Diseases Society of America: fever in older adults in long-term care",u:"https://academic.oup.com/cid/article/48/2/149/300283"}],
 regions:["vitals","neuro"]},

/* ============ F. DECLINE AND END OF LIFE ============ */
{id:"trajectory",cat:"Decline & end of life",name:"Signs of general decline",short:"Decline",type:"list",
 purpose:"The indicators that a person is on a downward trajectory rather than having a single reversible illness. They open the conversation about what matters, and change how hard to push a treatment.",
 when:"Any unplanned admission, any new dependence, any weight loss, and whenever you would not be surprised if the person died in the next 6–12 months.",
 sections:[
  {h:"General indicators (SPICT-style)",items:["Two or more unplanned hospital admissions in the last 6 months","Performance status poor or deteriorating: in bed or a chair for more than half the day","Now dependent on others for most personal care","Weight loss of 5–10% over 6 months, or a low BMI that keeps falling","Persistent, troublesome symptoms despite optimal treatment of the underlying condition","The person or family asks for palliative care, or chooses to reduce or stop treatment","Carer needs more support, or the carer is also unwell"]},
  {h:"By condition",items:["Heart failure: breathless or chest pain at rest or on minimal effort, repeated admissions","COPD: breathless at rest or minimal effort between exacerbations, long-term oxygen","Kidney: eGFR under 30 with decline, stopping dialysis","Dementia: unable to dress, walk or eat without help, swallowing difficulty, recurrent infections, weight loss","Frailty: Clinical Frailty Scale 7 or more, recurrent falls, delirium episodes","Neurological: swallowing failure, aspiration pneumonia, speech loss","Cancer: functional decline, unable to tolerate treatment"]},
  {h:"What to do",items:["Ask the surprise question: would I be surprised if this person died in the next 12 months? If no, plan for it.","Start or revisit advance care planning: what matters, who decides, where they want to be cared for.","Review medications for burden versus benefit; stop what no longer serves the goal.","Refer to palliative care early: it runs alongside active treatment, not instead of it.","Agree an escalation plan with the person and family: what to do at 2 am."]}
 ],
 act:["Decline is a diagnosis to name, discuss and plan for, not a series of surprises."],
 sources:[{n:"SPICT (Supportive and Palliative Care Indicators Tool)",u:"https://www.spict.org.uk/"},{n:"Palliative Care Australia",u:"https://palliativecare.org.au/"}],
 regions:["msk","mouth","vitals"]},

{id:"lastdays",cat:"Decline & end of life",name:"Recognising the last days of life",short:"Last days",type:"list",
 purpose:"The changes that mark the transition from decline to dying, usually over hours to days. Recognising them switches the plan from treatment to comfort and lets the family be there.",
 when:"Any person with a life-limiting illness who becomes more drowsy, stops eating and drinking, or changes in breathing.",
 sections:[
  {h:"Days before",items:["Profound weakness: bed-bound, needs help with all care","Sleeping most of the time, hard to rouse, then unrousable","Little or no food or fluid; unable to swallow tablets","Reduced urine output, dark urine","Withdrawal, less talk, less interest","Restlessness or terminal agitation: check for pain, retention, constipation, fear"]},
  {h:"Hours before",items:["Breathing changes: Cheyne-Stokes (deep then shallow with pauses), long apnoeas, gasping","Noisy breathing from secretions in the throat (\"death rattle\"): position, reassure the family, anticipatory medication","Peripheral cooling and mottling of knees, feet, hands; cyanosis of lips and nail beds","Weak, rapid or irregular pulse; blood pressure falling and hard to record","Skin pale, grey or waxy; eyes half-open; jaw relaxed","Unresponsive, though hearing may persist: keep talking to them"]},
  {h:"What to do",items:["Stop observations and interventions that do not add comfort. Say why, to the family.","Comfort: mouth care every 1–2 hours, reposition gently, skin care, a quiet room, familiar voices","Anticipatory medications per plan: pain, breathlessness, secretions, agitation, nausea","Confirm the plan: not for resuscitation, preferred place of death, who to call, the after-death process","Support the family: what they will see, that it is expected, that they can touch and speak","Care for yourself and the team afterwards"]}
 ],
 act:["If dying is unexpected or the person may have a reversible cause (opioid toxicity, hypoglycaemia, infection, hypercalcaemia), assess and escalate first.","Document the signs, the conversation, and the plan."],
 sources:[{n:"NICE NG31: care of dying adults in the last days of life",u:"https://www.ncbi.nlm.nih.gov/books/NBK356012/"},{n:"CareSearch (Australia): recognising dying",u:"https://www.caresearch.com.au/"}],
 regions:["vitals","mouth","skin"]}
];

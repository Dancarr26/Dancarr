/* 3D anatomy courses for the Bedside Assessment Atlas.
   Points are in the posed model's coordinates (y up, +z front, +x = patient's LEFT), defined from the rig's joint
   landmarks and snapped to the skin surface where a structure is palpable. Right-side copies are mirrored.
   dir codes: F front, B back, M medial, L lateral, U up (dorsum of foot / top), D deep (no snap). */
(function(){
const A='artery',V='vein',N='nerve',Y='lymph';
/* [layer, name, pair?, deep?, points[[x,y,z,dir],...]] — points for the patient's LEFT side */
window.BODY3D_ANATOMY=[
 /* ---- arteries ---- */
 [A,'Ascending aorta and arch',false,true,[[0.2,4.9,0.5,'D'],[0.1,5.6,0.35,'D'],[-0.1,5.85,0.1,'D'],[0.35,5.5,-0.15,'D']]],
 [A,'Descending / abdominal aorta',false,true,[[0.35,5.5,-0.15,'D'],[0.4,4.5,-0.15,'D'],[0.3,3.3,0.0,'D'],[0.15,2.45,0.05,'D']]],
 [A,'Common → external iliac a.',true,true,[[0.15,2.45,0.05,'D'],[0.55,1.75,0.3,'D'],[0.72,1.3,0.5,'D']]],
 [A,'Femoral a. (mid-inguinal point → adductor canal)',true,false,[[0.72,1.28,0.6,'F'],[0.8,0.6,0.6,'F'],[0.78,-0.5,0.45,'M'],[0.75,-1.8,0.25,'M'],[0.8,-2.6,-0.05,'M']]],
 [A,'Popliteal a.',true,false,[[1.0,-2.6,0.0,'D'],[0.97,-3.1,-0.35,'B'],[0.96,-3.7,-0.3,'B']]],
 [A,'Anterior tibial a. → dorsalis pedis',true,false,[[0.96,-3.7,-0.3,'D'],[1.05,-4.1,0.25,'F'],[1.1,-5.5,0.35,'F'],[1.0,-7.0,0.45,'F'],[0.95,-7.75,0.9,'U'],[0.9,-7.95,1.45,'U']]],
 [A,'Posterior tibial a. (behind medial malleolus)',true,false,[[0.96,-3.7,-0.3,'D'],[0.9,-5.0,-0.2,'B'],[0.85,-6.8,-0.1,'M'],[0.72,-7.45,0.05,'M'],[0.8,-7.85,0.55,'M']]],
 [A,'Subclavian → axillary a.',true,true,[[0.1,5.85,0.1,'D'],[0.9,5.85,0.0,'D'],[1.9,5.2,0.2,'D']]],
 [A,'Brachial a. (medial arm, antecubital fossa)',true,false,[[2.0,5.1,0.2,'D'],[2.3,4.4,0.2,'M'],[2.55,3.6,0.25,'M'],[2.85,3.15,0.55,'F']]],
 [A,'Radial a. (radial pulse)',true,false,[[2.85,3.15,0.55,'F'],[3.0,2.9,0.75,'F'],[3.3,2.2,1.5,'F'],[3.55,1.65,2.35,'F']]],
 [A,'Ulnar a.',true,false,[[2.85,3.15,0.55,'F'],[3.05,2.55,0.9,'M'],[3.4,1.9,1.7,'M'],[3.7,1.5,1.95,'M']]],
 [A,'Common carotid a. (carotid pulse)',true,false,[[0.25,5.95,0.35,'F'],[0.45,6.5,0.55,'F'],[0.55,7.05,0.7,'F']]],
 [A,'Internal carotid a.',true,true,[[0.55,7.05,0.7,'D'],[0.6,7.6,0.45,'D']]],
 [A,'External carotid → superficial temporal a.',true,false,[[0.55,7.05,0.7,'D'],[0.62,7.4,0.7,'L'],[0.72,7.9,0.55,'L'],[0.7,8.5,0.7,'L']]],
 [A,'Facial a. (crosses the mandible)',true,false,[[0.62,7.2,0.75,'D'],[0.55,7.0,1.05,'F'],[0.4,7.5,1.25,'F']]],
 /* ---- veins ---- */
 [V,'Internal jugular v.',true,true,[[0.65,7.55,0.4,'D'],[0.6,6.9,0.5,'D'],[0.4,6.2,0.35,'D'],[0.3,5.9,0.3,'D']]],
 [V,'External jugular v. (over sternocleidomastoid)',true,false,[[0.65,7.15,0.75,'L'],[0.85,6.55,0.45,'L'],[0.95,6.0,0.35,'F']]],
 [V,'Superior vena cava',false,true,[[0.2,5.9,0.2,'D'],[-0.1,5.4,0.3,'D'],[-0.05,4.9,0.5,'D']]],
 [V,'Inferior vena cava',false,true,[[-0.35,2.4,0.05,'D'],[-0.3,3.5,-0.05,'D'],[-0.2,4.6,0.3,'D']]],
 [V,'Cephalic v. (lateral arm)',true,false,[[3.5,1.7,2.25,'L'],[3.2,2.3,1.35,'L'],[2.9,3.2,0.3,'L'],[2.55,4.2,0.35,'L'],[1.75,5.55,0.6,'F'],[1.2,5.75,0.55,'F']]],
 [V,'Basilic v. (medial arm)',true,false,[[3.6,1.8,1.7,'M'],[3.2,2.5,0.9,'M'],[2.9,3.2,0.45,'M'],[2.45,4.0,0.3,'M'],[2.25,4.6,0.25,'D']]],
 [V,'Median cubital v. (venepuncture)',true,false,[[3.0,2.95,0.65,'F'],[2.9,3.15,0.6,'F'],[2.8,3.25,0.5,'F']]],
 [V,'Dorsal venous network (hand)',true,false,[[3.75,1.2,2.4,'L'],[3.9,0.95,2.65,'L']]],
 [V,'Femoral v.',true,true,[[0.85,1.2,0.5,'D'],[0.88,0.5,0.55,'D'],[0.85,-1.8,0.25,'D'],[0.85,-2.6,-0.05,'D']]],
 [V,'Great saphenous v. (anterior to medial malleolus)',true,false,[[0.55,-7.9,1.1,'U'],[0.6,-7.45,0.35,'M'],[0.55,-6.0,0.15,'M'],[0.6,-3.1,-0.05,'M'],[0.7,-1.5,0.35,'M'],[0.85,0.95,0.6,'F']]],
 [V,'Small saphenous v. (posterior calf)',true,false,[[1.25,-7.45,-0.1,'L'],[1.0,-5.5,-0.5,'B'],[0.97,-3.3,-0.45,'B']]],
 /* ---- nerves ---- */
 [N,'Spinal cord (C1 → L1/2)',false,true,[[0,6.6,-0.2,'D'],[0,5.5,-0.55,'D'],[0,4.5,-0.6,'D'],[0,3.2,-0.4,'D'],[0,2.3,-0.4,'D']]],
 [N,'Brachial plexus (roots C5–T1)',true,true,[[0.5,6.6,0.2,'D'],[0.9,6.2,0.25,'D'],[1.3,5.9,0.15,'D'],[1.9,5.3,0.25,'D']]],
 [N,'Median n. (carpal tunnel)',true,false,[[2.0,5.2,0.3,'D'],[2.4,4.2,0.28,'M'],[2.85,3.15,0.5,'F'],[3.2,2.4,1.2,'F'],[3.6,1.6,2.15,'F']]],
 [N,'Ulnar n. (behind medial epicondyle)',true,false,[[2.0,5.2,0.25,'D'],[2.45,4.1,0.15,'M'],[2.75,3.2,-0.05,'M'],[3.1,2.4,0.85,'M'],[3.6,1.55,1.9,'M']]],
 [N,'Radial n. (spiral groove → dorsum of hand)',true,false,[[2.1,5.1,0.05,'D'],[2.5,4.2,-0.15,'B'],[2.95,3.2,0.35,'L'],[3.25,2.3,1.35,'L'],[3.75,1.2,2.4,'L']]],
 [N,'Axillary n. (surgical neck of humerus)',true,false,[[2.0,5.5,0.0,'D'],[2.25,5.35,-0.15,'B'],[2.35,5.2,0.2,'L']]],
 [N,'Femoral n. → saphenous n. (medial leg)',true,false,[[0.95,1.3,0.55,'F'],[1.0,0.6,0.65,'F'],[0.8,-1.2,0.5,'M'],[0.65,-3.0,0.0,'M'],[0.6,-6.0,0.1,'M'],[0.62,-7.4,0.3,'M']]],
 [N,'Sciatic n. (posterior thigh)',true,false,[[0.95,0.75,-0.6,'B'],[1.0,-0.5,-0.55,'B'],[1.0,-2.0,-0.5,'B'],[0.97,-2.8,-0.45,'B']]],
 [N,'Tibial n. (posterior calf → medial malleolus)',true,false,[[0.97,-2.8,-0.45,'B'],[0.95,-5.0,-0.35,'B'],[0.72,-7.4,0.0,'M']]],
 [N,'Common fibular (peroneal) n. (fibular neck)',true,false,[[0.97,-2.9,-0.4,'B'],[1.25,-3.3,-0.15,'L'],[1.3,-3.7,0.05,'L'],[1.2,-5.5,0.3,'L'],[1.0,-7.8,1.0,'U']]],
 [N,'Vagus n. (CN X, carotid sheath)',true,true,[[0.6,7.5,0.45,'D'],[0.5,6.3,0.4,'D'],[0.3,5.6,0.2,'D']]],
 [N,'Facial n. (CN VII) branches',true,false,[[0.7,7.45,0.3,'D'],[0.72,7.4,0.75,'L'],[0.6,7.9,1.05,'F'],[0.5,7.85,1.35,'F']]],
 [N,'Facial n. buccal / marginal mandibular',true,false,[[0.72,7.4,0.75,'D'],[0.5,7.35,1.4,'F'],[0.45,7.0,1.3,'F']]],
 [N,'Greater occipital n.',true,false,[[0.35,7.0,-0.55,'B'],[0.4,7.7,-0.65,'B'],[0.5,8.4,-0.4,'B']]],
 /* ---- lymph node groups (rendered as nodes) ---- */
 [Y,'Preauricular nodes',true,false,[[0.78,7.85,0.65,'L']]],
 [Y,'Postauricular nodes',true,false,[[0.75,7.85,0.0,'L']]],
 [Y,'Occipital nodes',true,false,[[0.55,7.6,-0.6,'B']]],
 [Y,'Tonsillar (jugulodigastric) node',true,false,[[0.7,7.15,0.75,'L']]],
 [Y,'Submandibular nodes',true,false,[[0.45,6.95,1.05,'F'],[0.3,6.9,1.15,'F']]],
 [Y,'Submental nodes',false,false,[[0.0,6.8,1.15,'F']]],
 [Y,'Anterior (superficial) cervical nodes',true,false,[[0.65,6.7,0.7,'L'],[0.6,6.35,0.6,'L']]],
 [Y,'Deep cervical chain (along internal jugular)',true,true,[[0.6,6.9,0.45,'D'],[0.55,6.5,0.4,'D'],[0.5,6.15,0.35,'D']]],
 [Y,'Posterior cervical nodes',true,false,[[0.85,6.9,0.05,'B'],[0.9,6.5,-0.05,'B']]],
 [Y,'Supraclavicular nodes (Virchow’s node on the left)',true,false,[[0.9,6.05,0.25,'F']]],
 [Y,'Axillary nodes: central',true,true,[[1.75,5.0,0.25,'D']]],
 [Y,'Axillary nodes: anterior (pectoral)',true,false,[[1.8,4.75,0.5,'F']]],
 [Y,'Axillary nodes: posterior (subscapular)',true,false,[[1.75,4.9,-0.3,'B']]],
 [Y,'Axillary nodes: lateral',true,false,[[2.05,4.8,0.2,'M']]],
 [Y,'Axillary nodes: apical',true,true,[[1.45,5.5,0.2,'D']]],
 [Y,'Epitrochlear node (above medial epicondyle)',true,false,[[2.75,3.45,0.05,'M']]],
 [Y,'Superficial inguinal nodes: horizontal chain',true,false,[[0.6,1.15,0.6,'F'],[0.85,1.2,0.6,'F'],[1.05,1.3,0.55,'F']]],
 [Y,'Superficial inguinal nodes: vertical chain',true,false,[[0.8,0.85,0.65,'F'],[0.82,0.55,0.65,'F']]],
 [Y,'Deep inguinal nodes',true,true,[[0.85,1.05,0.4,'D']]],
 [Y,'Popliteal nodes',true,false,[[0.97,-3.4,-0.4,'B']]],
 [Y,'Para-aortic / mediastinal nodes (deep, not palpable)',false,true,[[0.2,4.8,-0.1,'D'],[0.1,3.2,0.0,'D'],[0.2,2.6,0.05,'D']]]
];
})();

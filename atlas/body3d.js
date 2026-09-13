/* 3D body viewer for the Bedside Assessment Atlas. Raw WebGL, no library.
   Mesh: MakeHuman base mesh (body group), CC0 1.0, https://github.com/makehumancommunity/makehuman  */
(function(){
const ZONE_IDS={none:0,head:1,neck:2,chest:3,abdomen:4,pelvis:5,armR:6,armL:7,legs:8,back:9,sacrum:10};
const ZONE_BY_ID=Object.fromEntries(Object.entries(ZONE_IDS).map(([k,v])=>[v,k]));
/* model-space classification (y up, +z is the front, patient's right is -x) */
function classify(x,y,z){
  if(y>=6.2)return ZONE_IDS.head;
  if(y>=5.55)return ZONE_IDS.neck;
  if(y<-0.95)return ZONE_IDS.legs;
  if(Math.abs(x)>1.75&&y>=0.9)return x<0?ZONE_IDS.armR:ZONE_IDS.armL;
  const front=z>0.42;
  if(y>=3.4)return front?ZONE_IDS.chest:ZONE_IDS.back;
  if(y>=1.6)return front?ZONE_IDS.abdomen:ZONE_IDS.back;
  return front?ZONE_IDS.pelvis:ZONE_IDS.sacrum;
}
/* what a 3D zone means for the 2D atlas: [view, zoneId] */
const TO2D={head:['front','head'],neck:['front','neck'],chest:['front','chest'],abdomen:['front','abdomen'],pelvis:['front','pelvis'],armR:['front','armR'],armL:['front','armL'],legs:['front','legs'],back:['back','back'],sacrum:['back','pelvis']};
const FROM2D={'front:head':'head','front:neck':'neck','front:chest':'chest','front:abdomen':'abdomen','front:pelvis':'pelvis','front:armR':'armR','front:armL':'armL','front:legs':'legs','back:head':'head','back:neck':'neck','back:back':'back','back:pelvis':'sacrum','back:armR':'armR','back:armL':'armL','back:legs':'legs'};
const VS=`attribute vec3 aPos;attribute vec3 aNrm;attribute float aZone;attribute float aSec;attribute vec2 aUvF;attribute vec2 aUvB;uniform mat4 uP,uV,uM;uniform float uZone,uHover,uOffset,uSec;varying vec3 vN;varying vec3 vW;varying float vOn;varying float vHv;varying float vSh;varying float vPar;varying vec2 vUvF;varying vec2 vUvB;varying float vNz;
void main(){float hf=(abs(aZone-1.0)<0.5)?0.35:((abs(aZone-6.0)<0.5||abs(aZone-7.0)<0.5)?0.7:1.0);vec3 p=aPos+aNrm*uOffset*hf;vec4 w=uM*vec4(p,1.0);vW=w.xyz;vN=mat3(uM)*aNrm;vNz=aNrm.z;vOn=step(abs(aZone-uZone),0.5);vHv=step(abs(aZone-uHover),0.5);vSh=step(abs(aSec-uSec),0.5);vPar=mod(aSec,2.0);vUvF=aUvF;vUvB=aUvB;gl_Position=uP*uV*w;}`;
const FS=`precision mediump float;varying vec3 vN;varying vec3 vW;varying float vOn;varying float vHv;varying float vSh;varying float vPar;varying vec2 vUvF;varying vec2 vUvB;varying float vNz;uniform vec3 uBase,uAccent,uLight,uEye,uInk;uniform float uOutline,uSections,uMuscles,uMusHov,uTint,uSkin,uBack,uSkinMode;uniform vec3 uSkinCol;uniform sampler2D uTexF,uTexB,uMusF,uMusB,uMusCF,uMusCB;
vec3 hsv(float h,float s,float v){vec3 k=vec3(1.0,2.0/3.0,1.0/3.0);vec3 p=abs(fract(vec3(h)+k)*6.0-3.0);return v*mix(vec3(1.0),clamp(p-1.0,0.0,1.0),s);}
void main(){
 if(uOutline>0.5){gl_FragColor=vec4(uInk,1.0);return;}
 if(uBack>0.5){vec3 nb=normalize(vN);float sh=0.86+0.14*max(dot(nb,normalize(uEye-vW)),0.0);gl_FragColor=vec4(mix(uBase,vec3(1.0),0.35)*sh,1.0);return;}
 vec3 n=normalize(vN);vec3 l=normalize(uLight);vec3 e=normalize(uEye-vW);
 float k=smoothstep(-0.18,0.18,vNz);
 vec3 tf=texture2D(uTexF,vUvF).rgb;vec3 tb=texture2D(uTexB,vUvB).rgb;vec3 tex=mix(tb,tf,k);
 float d=dot(n,l);float band=d>0.3?1.0:(d>-0.15?0.88:0.76);
 float rim=pow(1.0-max(dot(n,e),0.0),4.0);
 vec3 col=tex*band;
 if(uSkinMode>0.5){/* shaded skin: soft lambert, warm shadow, gentle speculars */
   float dd=max(dot(n,l),0.0);float wrap=(dot(n,l)+0.35)/1.35;wrap=max(wrap,0.0);vec3 hh=normalize(l+e);float sp=pow(max(dot(n,hh),0.0),18.0)*0.12;float fl=max(dot(n,normalize(vec3(-0.4,0.2,0.9))),0.0)*0.15;
   vec3 shade=uSkinCol*vec3(0.62,0.5,0.48);col=mix(shade,uSkinCol,0.35+0.65*wrap)+uSkinCol*fl+vec3(1.0,0.95,0.9)*sp;float ao=smoothstep(-0.2,0.6,vNz*0.0+dot(n,vec3(0.0,1.0,0.0))*0.15+0.5);col*=0.93+0.07*ao;}
 /* muscle chart: colour each muscle group from the id map, name-highlight the hovered one */
 vec4 mm=mix(texture2D(uMusB,vUvB),texture2D(uMusF,vUvF),step(0.5,k));float mid=floor(mm.r*255.0+0.5);
 vec4 mc=mix(texture2D(uMusCB,vUvB),texture2D(uMusCF,vUvF),k);col=mix(col,mc.rgb*band,mc.a*uMuscles*0.9);
 float mh=step(abs(mid-uMusHov),0.5)*step(0.5,mid);col=mix(col,uAccent,mh*0.45);
 col=mix(col,uInk,rim*0.25);
 float par=smoothstep(0.45,0.55,vPar);col=mix(col,col*0.9,par*uSections);
 float on=smoothstep(0.45,0.55,vOn);float sh=smoothstep(0.45,0.55,vSh)*(1.0-on);float hv=smoothstep(0.45,0.55,vHv)*(1.0-on)*(1.0-sh);
 col=mix(col,mix(col,uAccent,0.5*uTint),on);col=mix(col,mix(col,uAccent,0.35*uTint),sh);col=mix(col,mix(col,uAccent,0.12),hv);
 gl_FragColor=vec4(col,uSkin);}`;
/* project the 2D plate: rotate arms and legs in projection space so the muscle map lines up with the mesh pose */
const FIT=window.BODY3D_FIT||{armAngle:0.61,armLen:4.88,legAngle:0.18,legLen:7.27,shoulder:[1.9,5.5],hip:[0.9,-0.95],top:8.49,bottom:-8.17};
const K2D=1255/(FIT.top-FIT.bottom),Y02D=96+FIT.top*K2D;
const ARM2D=20*Math.PI/180,ARMLEN2D=5.9,LEG2D=-1*Math.PI/180,LEGLEN2D=7.9;
function unwarp(x,y){
  const sx=x<0?-1:1,ax=Math.abs(x);
  const [hx,hy]=FIT.hip,[shx,shy]=FIT.shoulder;
  if(y<hy+0.35){const w=Math.min(1,Math.max(0,(hy+0.35-y)/0.7));const px=hx*sx,py=hy;const vx=x-px,vy=y-py;const th=-sx*(FIT.legAngle-LEG2D)*w;const c=Math.cos(th),sn=Math.sin(th);const sc=1+(LEGLEN2D/FIT.legLen-1)*w;return [px+(vx*c-vy*sn)*sc,py+(vx*sn+vy*c)*sc];}
  if(y>=hy+0.35&&y<shy+0.4&&ax>shx-0.5){const w=Math.min(1,Math.max(0,(ax-(shx-0.5))/0.8));const px=shx*sx,py=shy;const vx=x-px,vy=y-py;const th=-sx*(FIT.armAngle-ARM2D)*w;const c=Math.cos(th),sn=Math.sin(th);const sc=1+(ARMLEN2D/FIT.armLen-1)*w;return [px+(vx*c-vy*sn)*sc,py+(vx*sn+vy*c)*sc];}
  return [x,y];
}
/* ---- anatomical sections ---- */
const SEC_NAMES={1:'Cranium (scalp)',2:'Face',3:'Anterior neck',4:'Posterior neck (nuchal)',5:'Right shoulder (deltoid)',6:'Left shoulder (deltoid)',7:'Right upper arm',8:'Left upper arm',9:'Right forearm',10:'Left forearm',11:'Right hand',12:'Left hand',13:'Sternal region',14:'Right pectoral region',15:'Left pectoral region',16:'Right hypochondriac (RUQ)',17:'Epigastric',18:'Left hypochondriac (LUQ)',19:'Right lumbar (flank)',20:'Umbilical',21:'Left lumbar (flank)',22:'Right iliac / inguinal (RLQ)',23:'Hypogastric (suprapubic)',24:'Left iliac / inguinal (LLQ)',25:'Pubic / perineal',26:'Right thigh',27:'Left thigh',28:'Right knee',29:'Left knee',30:'Right leg (shin & calf)',31:'Left leg (shin & calf)',32:'Right foot',33:'Left foot',34:'Right scapular region',35:'Left scapular region',36:'Interscapular / thoracic spine',37:'Right lumbar (back)',38:'Left lumbar (back)',39:'Sacral region',40:'Right gluteal',41:'Left gluteal',42:'Right posterior thigh',43:'Left posterior thigh',44:'Right calf',45:'Left calf',46:'Right heel',47:'Left heel',48:'Right axilla',49:'Left axilla'};
const SEC_ZONE={1:1,2:1,3:2,4:2,5:6,7:6,9:6,11:6,48:6,6:7,8:7,10:7,12:7,49:7,13:3,14:3,15:3,16:4,17:4,18:4,19:4,20:4,21:4,22:4,23:4,24:4,25:5,26:8,27:8,28:8,29:8,30:8,31:8,32:8,33:8,42:8,43:8,44:8,45:8,46:8,47:8,34:9,35:9,36:9,37:9,38:9,39:10,40:10,41:10};
function sectionizer(){
  const ART=window.BODY_ART;const P={};const mk=(view,slug,side)=>{const p=ART[view].find(x=>x.slug===slug);if(!p)return null;const ds=side?(p.parts[side]||[]):Object.values(p.parts).flat();const path=new Path2D();ds.forEach(d=>path.addPath(new Path2D(d)));return path;};
  const cv=document.createElement('canvas');const g=cv.getContext('2d');
  const inP=(path,x,y)=>path&&g.isPointInPath(path,x,y);
  const F={chestL:mk('front','chest','left'),chestR:mk('front','chest','right'),deltL:mk('front','deltoids','left'),deltR:mk('front','deltoids','right'),hair:mk('front','hair'),head:mk('front','head'),neck:mk('front','neck'),trap:mk('front','trapezius'),kneeL:mk('front','knees','left'),kneeR:mk('front','knees','right')};
  const B={trap:mk('back','trapezius'),ubL:mk('back','upper-back','left'),ubR:mk('back','upper-back','right'),lbL:mk('back','lower-back','left'),lbR:mk('back','lower-back','right'),glL:mk('back','gluteal','left'),glR:mk('back','gluteal','right'),hair:mk('back','hair'),head:mk('back','head'),neck:mk('back','neck'),deltL:mk('back','deltoids','left'),deltR:mk('back','deltoids','right')};
  /* nine abdominal regions on the front plate: mid-clavicular lines and the subcostal / intertubercular planes */
  const nine=(x,y)=>{const col=x<316?0:x<412?1:2;const row=y<520?0:y<630?1:2;return [[16,17,18],[19,20,21],[22,23,24]][row][col];};
  const frontTorso=(x,y)=>{
    if(inP(F.hair,x,y))return 1;if(inP(F.head,x,y))return 2;if(inP(F.neck,x,y)||inP(F.trap,x,y))return 3;
    if(inP(F.deltL,x,y))return 5;if(inP(F.deltR,x,y))return 6;
    if(inP(F.chestL,x,y))return 14;if(inP(F.chestR,x,y))return 15;
    if(y<254)return y<180?1:2;if(y<330)return 3;
    if(y<440)return Math.abs(x-364)<28?13:(x<364?14:15);
    if(y<716){if(x<256||x>473){return x<364?19:21;}return nine(x,y);}
    if(y<800)return 25;return x<364?26:27;};
  const backTorso=(x,y)=>{
    if(inP(B.hair,x,y))return 1;if(inP(B.head,x,y))return 1;if(inP(B.neck,x,y))return 4;
    if(inP(B.deltL,x,y))return 6;if(inP(B.deltR,x,y))return 5;
    if(inP(B.trap,x,y))return y<330?4:(Math.abs(x-1084)<30?36:(x<1084?35:34));
    if(inP(B.ubL,x,y))return 35;if(inP(B.ubR,x,y))return 34;if(inP(B.lbL,x,y))return 38;if(inP(B.lbR,x,y))return 37;
    if(inP(B.glL,x,y))return 41;if(inP(B.glR,x,y))return 40;
    if(y<240)return 1;if(y<330)return 4;
    if(y>=600&&y<820&&Math.abs(x-1084)<70)return 39;
    if(Math.abs(x-1084)<34)return 36;
    if(y<590)return x<1084?35:34;if(y<700)return x<1084?38:37;if(y<800)return x<1084?41:40;return x<1084?43:42;};
  /* limb segments: 3-5 L arm chain, 6-8 R, 9-11 L leg chain, 12-14 R (L = patient's left) */
  return (seg,nz,fx,fy,bx,by,px,py)=>{
    const front=nz>=0;
    if(seg===1)return front?(inP(F.hair,fx,fy)?1:(fy<180?1:2)):1;
    if(seg===2)return front?3:4;
    if(seg===3||seg===6){const R=seg===6;if(front&&inP(R?F.deltL:F.deltR,fx,fy))return R?5:6;if(!front&&inP(R?B.deltR:B.deltL,bx,by))return R?5:6;if(py>FIT.shoulder[1]-0.8&&Math.abs(px)<FIT.shoulder[0]+0.35)return R?48:49;return R?7:8;}
    if(seg===4||seg===7)return seg===7?9:10;
    if(seg===5||seg===8)return seg===8?11:12;
    if(seg===9||seg===12){const R=seg===12;if(front&&inP(R?F.kneeL:F.kneeR,fx,fy))return R?28:29;return front?(R?26:27):(R?42:43);}
    if(seg===10||seg===13){const R=seg===13;if(front&&inP(R?F.kneeL:F.kneeR,fx,fy))return R?28:29;return front?(R?30:31):(R?44:45);}
    if(seg===11||seg===14){const R=seg===14;return front?(R?32:33):(R?46:47);}
    return front?frontTorso(fx,fy):backTorso(bx,by);
  };
}
function cssVar(name){return getComputedStyle(document.documentElement).getPropertyValue(name).trim()||'#888';}
const MUSCLE_NAMES={chest:'Pectoralis major',abs:'Rectus abdominis',obliques:'External oblique',deltoids:'Deltoid',biceps:'Biceps brachii',triceps:'Triceps brachii',forearm:'Forearm flexors',hands:'Hand',neck:'Sternocleidomastoid',trapezius:'Trapezius',head:'Face',hair:'Cranium',quadriceps:'Quadriceps',adductors:'Adductors',tibialis:'Tibialis anterior',calves:'Gastrocnemius / soleus',knees:'Patella',ankles:'Malleoli',feet:'Foot','upper-back':'Latissimus dorsi / rhomboids','lower-back':'Erector spinae',gluteal:'Gluteus maximus / medius',hamstring:'Hamstrings'};
const MUSCLE_NAMES_BACK={forearm:'Forearm extensors',neck:'Splenius / trapezius',head:'Occiput'};
function muscleName(view,slug){return (view==='back'&&MUSCLE_NAMES_BACK[slug])||MUSCLE_NAMES[slug]||slug;}
/* id map: each plate part filled with rgb(id, side, 0), no antialiasing; front ids 1.., back ids 101.. */
function rasterMuscleMap(view){
  const ART=window.BODY_ART;const w=724,h=1448;const ox=view==='front'?0:724;const base=view==='front'?1:101;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ox} 0 724 1448" width="${w}" height="${h}" shape-rendering="crispEdges"><rect x="${ox}" y="0" width="724" height="1448" fill="rgb(0,0,0)"/>`+
    ART[view].map((p,i)=>Object.entries(p.parts).map(([side,ds])=>ds.map(d=>`<path d="${d}" fill="rgb(${base+i},${side==='left'?1:side==='right'?2:0},0)"/>`).join('')).join('')).join('')+`</svg>`;
  return new Promise(res=>{const img=new Image();img.onload=()=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(img,0,0);res({cv,data:g.getImageData(0,0,w,h).data});};img.onerror=()=>{const cv=document.createElement('canvas');cv.width=8;cv.height=8;res({cv,data:null});};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
}
/* muscle chart colours by plate part (skin-only parts stay uncoloured) */
const MUSCLE_COL={chest:'#c8383a',deltoids:'#e0603c',biceps:'#d6413f',triceps:'#a8302f',forearm:'#e2795f',abs:'#d9525a',obliques:'#e8866a',neck:'#d5605a',trapezius:'#b9432f',quadriceps:'#cf3f37',adductors:'#c74f7a',tibialis:'#e08a80',calves:'#b03a3a','upper-back':'#a32f3e',hamstring:'#8f2a35',gluteal:'#9b3f60','lower-back':'#c9605e'};
function rasterMuscleChart(view){
  const ART=window.BODY_ART;const w=724,h=1448;const ox=view==='front'?0:724;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ox} 0 724 1448" width="${w}" height="${h}">`+
    ART[view].map(p=>{const c=MUSCLE_COL[p.slug];if(!c)return '';return Object.values(p.parts).flat().map(d=>`<path d="${d}" fill="${c}" stroke="#5a1418" stroke-opacity="0.55" stroke-width="2"/>`).join('');}).join('')+`</svg>`;
  return new Promise(res=>{const img=new Image();img.onload=()=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(img,0,0);res(cv);};img.onerror=()=>{const cv=document.createElement('canvas');cv.width=8;cv.height=8;res(cv);};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
}
function rasterArt(view){
  const ART=window.BODY_ART;const w=724,h=1448;const soft=cssVar('--figure-soft'),fig=cssVar('--figure');const ox=view==='front'?0:724;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ox} 0 724 1448" width="${w}" height="${h}"><rect x="${ox}" y="0" width="724" height="1448" fill="${soft}"/>`+
    ART[view].map(p=>Object.values(p.parts).flat().map(d=>`<path d="${d}" fill="${p.slug==='hair'?fig:soft}" stroke="${fig}" stroke-width="1.6"/>`).join('')).join('')+`</svg>`;
  return new Promise(res=>{const img=new Image();img.onload=()=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(img,0,0);res(cv);};img.onerror=()=>{const cv=document.createElement('canvas');cv.width=8;cv.height=8;const g=cv.getContext('2d');g.fillStyle=soft;g.fillRect(0,0,8,8);res(cv);};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
}
function mat4Persp(f,a,n,fr){const t=1/Math.tan(f/2);return [t/a,0,0,0,0,t,0,0,0,0,(fr+n)/(n-fr),-1,0,0,2*fr*n/(n-fr),0];}
function mat4LookAt(e,c,up){const z=norm([e[0]-c[0],e[1]-c[1],e[2]-c[2]]);const x=norm(cross(up,z));const y=cross(z,x);return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,e),-dot(y,e),-dot(z,e),1];}
function norm(v){const l=Math.hypot(v[0],v[1],v[2])||1;return [v[0]/l,v[1]/l,v[2]/l];}
function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
function cssColor(name){const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();const m=v.match(/^#([0-9a-f]{6})$/i);if(!m)return [0.75,0.78,0.8];const h=m[1];return [parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255];}
const PRESETS={front:[0,0],back:[Math.PI,0],left:[Math.PI/2,0],right:[-Math.PI/2,0],top:[0,Math.PI/2-0.01],bottom:[0,-Math.PI/2+0.01]};
/* ---- vessels, nerves and lymph nodes as 3D geometry ---- */
const SVS=`attribute vec3 aPos;attribute vec3 aNrm;attribute float aId;attribute float aZm;attribute float aFoc;uniform mat4 uP,uV;uniform float uHi,uSel,uFocus;varying vec3 vN;varying vec3 vW;varying float vHi;varying float vDim;
void main(){vN=aNrm;vW=aPos;vHi=step(abs(aId-uHi),0.5);
 float inZone=uSel<0.5?1.0:mod(floor(aZm/pow(2.0,uSel)+0.01),2.0);float inFoc=uFocus<0.5?1.0:aFoc;vDim=1.0-inZone*inFoc;gl_Position=uP*uV*vec4(aPos,1.0);}`;
const SFS=`precision mediump float;uniform vec3 uCol,uEye,uLight;uniform float uAlpha,uDimA,uPass,uWet;varying vec3 vN;varying vec3 vW;varying float vHi;varying float vDim;
float hash(vec3 p){p=fract(p*0.3183099+vec3(0.1,0.2,0.3));p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 x){vec3 i=floor(x);vec3 f=fract(x);f=f*f*(3.0-2.0*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
void main(){if(uPass>0.5&&vDim>0.5)discard;if(uPass<-0.5&&vDim<0.5)discard;vec3 n=normalize(vN);vec3 e=normalize(uEye-vW);if(dot(n,e)<0.0)n=-n;vec3 l=normalize(uLight-vW);vec3 h=normalize(l+e);
 float d=max(dot(n,l),0.0);float fill=max(dot(n,normalize(vec3(-0.5,0.3,0.8))),0.0);float spec=pow(max(dot(n,h),0.0),48.0)*uWet+pow(max(dot(n,h),0.0),8.0)*0.08;float rim=pow(1.0-max(dot(n,e),0.0),3.0);
 float mot=noise(vW*9.0)*0.6+noise(vW*23.0)*0.4;vec3 base=uCol*(0.9+0.2*(mot-0.5));vec3 deep=base*vec3(0.75,0.62,0.62);
 vec3 c=mix(deep,base,0.45+0.55*d)+base*0.18*fill+vec3(1.0,0.97,0.92)*spec+base*rim*0.3;c=mix(c,vec3(1.0),vHi*0.35);
 float g=dot(c,vec3(0.33));c=mix(c,vec3(g)*0.9+0.1,vDim*0.7);float a=mix(uAlpha,uDimA,vDim);gl_FragColor=vec4(c,a);}`;
const DIRV={F:[0,0,1],B:[0,0,-1],U:[0,1,0]};
function snapPoint(body,x,y,z,dir){
  if(dir==='D')return [x,y,z];
  const d=dir==='M'?[x<0?1:-1,0,0]:dir==='L'?[x<0?-1:1,0,0]:DIRV[dir];
  const p=body.pos,n=body.nrm;let best=-1,bs=-1e9;
  for(let i=0;i<body.nv;i++){const dx=p[i*3]-x,dy=p[i*3+1]-y,dz=p[i*3+2]-z;const dd=dx*dx+dy*dy+dz*dz;if(dd>1.0)continue;const al=n[i*3]*d[0]+n[i*3+1]*d[1]+n[i*3+2]*d[2];const sc=al*0.9-dd*1.6;if(sc>bs){bs=sc;best=i;}}
  if(best<0)return [x,y,z];
  const IN=-0.06;/* superficial courses sit just under the skin */
  return [p[best*3]+n[best*3]*IN,p[best*3+1]+n[best*3+1]*IN,p[best*3+2]+n[best*3+2]*IN];
}
function nearestZone(body,x,y,z){const p=body.pos;let best=-1,bd=1e9;for(let i=0;i<body.nv;i++){const dx=p[i*3]-x,dy=p[i*3+1]-y,dz=p[i*3+2]-z;const dd=dx*dx+dy*dy+dz*dz;if(dd<bd){bd=dd;best=i;}}return best<0?0:body.zone[best];}
/* zone bitmask for a point: the nearest skin zone, plus both the front and back zone of its band when it lies deep in the trunk */
function zoneBits(body,x,y,z,deep){let m=1<<nearestZone(body,x,y,z);
  if(deep&&Math.abs(x)<1.75&&y<6.2&&y>=-0.95){const Z=ZONE_IDS;if(y>=5.55)m|=1<<Z.neck;else if(y>=3.4)m|=(1<<Z.chest)|(1<<Z.back);else if(y>=1.6)m|=(1<<Z.abdomen)|(1<<Z.back);else m|=(1<<Z.pelvis)|(1<<Z.sacrum);}
  return m;}
function smoothLine(pts,sub){const out=[];const P=i=>pts[Math.max(0,Math.min(pts.length-1,i))];for(let i=0;i<pts.length-1;i++){const p0=P(i-1),p1=P(i),p2=P(i+1),p3=P(i+2);for(let k=0;k<sub;k++){const t=k/sub,t2=t*t,t3=t2*t;out.push([0,1,2].map(a=>0.5*((2*p1[a])+(-p0[a]+p2[a])*t+(2*p0[a]-5*p1[a]+4*p2[a]-p3[a])*t2+(-p0[a]+3*p1[a]-3*p2[a]+p3[a])*t3)));}}out.push(pts[pts.length-1]);return out;}
function tube(pts,r,id,out,zm){const S=6;let prevN=null;const rings=[];
  for(let i=0;i<pts.length;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)];let t=norm([b[0]-a[0],b[1]-a[1],b[2]-a[2]]);let u=prevN||norm(cross(t,Math.abs(t[1])<0.9?[0,1,0]:[1,0,0]));u=norm(cross(cross(t,u),t));const v=cross(t,u);prevN=u;const ring=[];for(let k=0;k<S;k++){const ang=k/S*Math.PI*2;const nx=u[0]*Math.cos(ang)+v[0]*Math.sin(ang),ny=u[1]*Math.cos(ang)+v[1]*Math.sin(ang),nz=u[2]*Math.cos(ang)+v[2]*Math.sin(ang);ring.push([pts[i][0]+nx*r,pts[i][1]+ny*r,pts[i][2]+nz*r,nx,ny,nz]);}rings.push(ring);}
  for(let i=0;i<rings.length-1;i++)for(let k=0;k<S;k++){const a=rings[i][k],b=rings[i][(k+1)%S],c=rings[i+1][k],d=rings[i+1][(k+1)%S];[a,c,b,b,c,d].forEach(q=>{out.push(q[0],q[1],q[2],q[3],q[4],q[5],id,zm);});}}
function sphere(c,r,id,out,zm){const R=8,Q=6;const P=(i,j)=>{const th=i/R*Math.PI*2,ph=j/Q*Math.PI;const nx=Math.sin(ph)*Math.cos(th),ny=Math.cos(ph),nz=Math.sin(ph)*Math.sin(th);return [c[0]+nx*r,c[1]+ny*r,c[2]+nz*r,nx,ny,nz];};
  for(let i=0;i<R;i++)for(let j=0;j<Q;j++){const a=P(i,j),b=P(i+1,j),cc=P(i,j+1),d=P(i+1,j+1);[a,cc,b,b,cc,d].forEach(q=>{out.push(q[0],q[1],q[2],q[3],q[4],q[5],id,zm);});}}
/* organ blob: an ellipsoid (rx,ry,rz) tilted by rot radians about z, optionally squashed toward the front (fz<1 flattens the back) */
function ellipsoid(c,rx,ry,rz,rot,id,out,zm){const R=14,Q=10;const cs=Math.cos(rot),sn=Math.sin(rot);
  const P=(i,j)=>{const th=i/R*Math.PI*2,ph=j/Q*Math.PI;let x=Math.sin(ph)*Math.cos(th)*rx,y=Math.cos(ph)*ry,z=Math.sin(ph)*Math.sin(th)*rz;const X=x*cs-y*sn,Y=x*sn+y*cs;let nx=X/(rx*rx),ny=Y/(ry*ry),nz=z/(rz*rz);const l=Math.hypot(nx,ny,nz)||1;return [c[0]+X,c[1]+Y,c[2]+z,nx/l,ny/l,nz/l];};
  for(let i=0;i<R;i++)for(let j=0;j<Q;j++){const a=P(i,j),b=P(i+1,j),cc=P(i,j+1),d=P(i+1,j+1);[a,cc,b,b,cc,d].forEach(q=>{out.push(q[0],q[1],q[2],q[3],q[4],q[5],id,zm);});}}
/* procedural courses and blobs that the real meshes (body3d-organs.js) replace */
const DROP_STRUCT=/^(Abdominal aorta|Common iliac a\.|External iliac a\.|Internal iliac a\.|Coeliac trunk|Splenic a\.|Left gastric a\.|Hepatic a\.|Gastroduodenal a\.|Superior mesenteric a\.|Inferior mesenteric a\.|Renal a\.|Common carotid a\.|Internal carotid a\.|External carotid a\.|Subclavian a\.|Brachiocephalic trunk|Vertebral → basilar a\.|Inferior vena cava|Common iliac v\.|External iliac v\.|Internal iliac v\.|External iliac → femoral v\.|Portal v\.|Splenic v\.|Hepatic vv\.|Renal v\.|Internal jugular v\.|Subclavian v\.|Superior vena cava)/;
const DROP_ORGAN=/^(Brain|Liver|Gallbladder|Spleen|Pancreas|Right kidney|Left kidney|Right adrenal|Left adrenal|Ureters|Thyroid \(|Hypothalamus|Stomach|Duodenum|Jejunum|Colon|Appendix|Larynx)/;
/* ORG1 pack reader: see scratchpad/organs.js for the writer */
function parseOrganPack(b64){const bin=atob(b64);const u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);const dv=new DataView(u8.buffer);let o=4;const n=dv.getUint32(o,true);o+=4;const LAYERS=['organ','bone','artery','vein','nerve','muscle','lymph'];const parts=[];
  for(let k=0;k<n;k++){const layer=LAYERS[u8[o++]];const nl=u8[o++];const name=new TextDecoder().decode(u8.subarray(o,o+nl));o+=nl;const r=u8[o++],g=u8[o++],b=u8[o++];const col=r===255&&g===255&&b===255?null:[r/254,g/254,b/254];const nv=dv.getUint32(o,true);o+=4;const nt=dv.getUint32(o,true);o+=4;const mn=[0,1,2].map(i=>dv.getFloat32(o+i*4,true));o+=12;const mx=[0,1,2].map(i=>dv.getFloat32(o+i*4,true));o+=12;
    const pos=new Float32Array(nv*3);for(let i=0;i<nv*3;i++){const a=i%3;const q=dv.getInt16(o+i*2,true);pos[i]=mn[a]+(q+32767)/65534*(mx[a]-mn[a]);}o+=nv*6;
    const wide=nv>65535;const idx=new Uint32Array(nt*3);for(let i=0;i<nt*3;i++){idx[i]=wide?dv.getUint32(o+i*4,true):dv.getUint16(o+i*2,true);}o+=nt*3*(wide?4:2);
    const nrm=new Float32Array(nv*3);for(let t=0;t<nt;t++){const a=idx[t*3]*3,b2=idx[t*3+1]*3,c=idx[t*3+2]*3;const e1=[pos[b2]-pos[a],pos[b2+1]-pos[a+1],pos[b2+2]-pos[a+2]],e2=[pos[c]-pos[a],pos[c+1]-pos[a+1],pos[c+2]-pos[a+2]];const fn=cross(e1,e2);for(const v of [a,b2,c]){nrm[v]+=fn[0];nrm[v+1]+=fn[1];nrm[v+2]+=fn[2];}}
    for(let i=0;i<nv;i++){const l=Math.hypot(nrm[i*3],nrm[i*3+1],nrm[i*3+2])||1;nrm[i*3]/=l;nrm[i*3+1]/=l;nrm[i*3+2]/=l;}
    parts.push({layer,name,col,nv,nt,mn,mx,pos,idx,nrm});}
  return parts;}
/* organs: [name, centre, rx, ry, rz, tilt, colour] in model space (y up, +z front, +x patient's left) */
const ORGANS=[
 ['Brain',[0,8.25,0.05],0.8,0.72,0.95,0,[0.85,0.72,0.74]],
 ['Heart (apex ~5th intercostal space, mid-clavicular line)',[0.25,4.98,0.55],0.58,0.78,0.48,-0.55,[0.8,0.2,0.22]],
 ['Right lung',[-1.15,5.35,-0.12],0.66,1.15,0.6,0,[0.9,0.62,0.62]],
 ['Left lung',[1.22,5.35,-0.12],0.56,1.12,0.58,0,[0.9,0.62,0.62]],
 ['Liver (RUQ; edge below right costal margin)',[-0.85,3.55,0.3],1.25,0.7,0.6,0.25,[0.6,0.28,0.2]],
 ['Gallbladder',[-0.55,3.15,0.75],0.18,0.3,0.15,0,[0.35,0.55,0.35]],
 ['Spleen (LUQ, posterolateral)',[1.3,3.6,-0.25],0.32,0.5,0.28,0.3,[0.5,0.25,0.4]],
 ['Pancreas (retroperitoneal, behind the stomach)',[0.2,3.2,-0.05],0.85,0.22,0.22,0.25,[0.85,0.75,0.55]],
 ['Right kidney (flank; sits lower than the left)',[-0.75,2.95,-0.35],0.3,0.55,0.25,0.15,[0.55,0.2,0.22]],
 ['Left kidney',[0.75,3.15,-0.35],0.3,0.55,0.25,-0.15,[0.55,0.2,0.22]],
 ['Bladder (suprapubic; palpable only when distended)',[0,1.1,0.5],0.45,0.35,0.35,0,[0.9,0.75,0.4]],
 ['Thyroid (anterior neck, below the cricoid)',[0,5.85,0.65],0.45,0.22,0.18,0,[0.7,0.35,0.35]],
 ['Parathyroid glands (posterior to the thyroid)',[-0.2,6.42,0.3],0.06,0.09,0.05,0,[0.85,0.7,0.35]],
 ['Parathyroid glands (posterior to the thyroid)',[0.18,6.42,0.3],0.06,0.09,0.05,0,[0.85,0.7,0.35]],
 ['Pituitary gland (sella turcica, base of brain)',[0,7.97,0.6],0.11,0.09,0.11,0,[0.9,0.55,0.4]],
 ['Hypothalamus',[0,7.85,0.25],0.16,0.1,0.14,0,[0.9,0.65,0.5]],
 ['Pineal gland',[0,8.22,0.3],0.07,0.07,0.09,0,[0.75,0.45,0.55]],
 ['Thymus (retrosternal; large in children, involutes in adults)',[0,5.75,0.6],0.35,0.3,0.15,0,[0.85,0.7,0.6]],
 ['Right adrenal (suprarenal) gland',[-0.75,3.6,-0.3],0.2,0.13,0.14,0,[0.9,0.7,0.3]],
 ['Left adrenal (suprarenal) gland',[0.75,3.8,-0.3],0.2,0.13,0.14,0,[0.9,0.7,0.3]],
 ['Gonads: ovaries (pelvis, lateral to the uterus) / testes (scrotum)',[-0.5,1.15,0.25],0.14,0.2,0.12,0,[0.85,0.55,0.6]],
 ['Gonads: ovaries (pelvis, lateral to the uterus) / testes (scrotum)',[0.5,1.15,0.25],0.14,0.2,0.12,0,[0.85,0.55,0.6]],
 ['Uterus / prostate (midline pelvis, behind the bladder)',[0,1.1,0.05],0.32,0.35,0.22,0,[0.85,0.5,0.55]],
 ['Diaphragm (dome; separates thorax from abdomen)',[0,4.3,0.1],1.6,0.16,0.8,0,[0.85,0.55,0.5]],
];
/* colon course and airway as tubes */
/* jejunum and ileum: a winding course filling the umbilical region, ending at the caecum */
const SMALL_BOWEL=(()=>{const pts=[[0.2,2.62,0.25]];const rows=[2.75,2.45,2.15,1.85,1.6];rows.forEach((y,r)=>{const dir=r%2?1:-1;for(let k=0;k<=6;k++){const t=k/6;const x=dir*(-0.95+1.9*t);pts.push([x,y+Math.sin(t*Math.PI*3)*0.1,0.45+Math.cos(t*Math.PI*3)*0.1]);}});pts.push([-0.7,1.5,0.5],[-1.05,1.5,0.45]);return pts;})();
const ORGAN_TUBES=[
 ['Stomach: fundus → body → antrum → pylorus (epigastrium / LUQ)',[[0.45,3.55,0.2],[0.95,3.95,0.15],[1.05,3.5,0.4],[0.75,3.1,0.55],[0.25,3.0,0.55],[-0.15,3.15,0.5]],0.3,[0.85,0.6,0.5]],
 ['Duodenum (C-loop around the head of the pancreas)',[[-0.15,3.15,0.5],[-0.5,3.05,0.4],[-0.6,2.65,0.3],[-0.25,2.45,0.25],[0.2,2.62,0.25]],0.12,[0.88,0.65,0.5]],
 ['Jejunum and ileum (small bowel, central / umbilical; ends at the ileocaecal valve)',SMALL_BOWEL,0.15,[0.85,0.68,0.55]],
 ['Nasal cavity → nasopharynx',[[0,7.9,1.3],[0,7.85,0.95],[0,7.7,0.6]],0.09,[0.6,0.7,0.85]],
 ['Oropharynx → laryngopharynx',[[0,7.7,0.6],[0,7.35,0.6],[0,7.0,0.55]],0.1,[0.6,0.7,0.85]],
 ['Larynx (thyroid cartilage / cricoid)',[[0,7.0,0.55],[0,6.75,0.55],[0,6.5,0.48]],0.13,[0.6,0.7,0.85]],
 ['Trachea',[[0,6.5,0.48],[0,6.1,0.35],[0,5.8,0.25],[0,5.5,0.18]],0.12,[0.75,0.72,0.72]],
 ['Right upper lobe bronchus',[[-0.55,5.25,0.12],[-0.95,5.7,0.1],[-1.2,6.05,0.05]],0.06,[0.75,0.72,0.72]],
 ['Right middle lobe bronchus',[[-0.8,5.1,0.1],[-1.2,5.0,0.35],[-1.5,4.85,0.4]],0.05,[0.75,0.72,0.72]],
 ['Right lower lobe bronchus',[[-1.0,4.95,0.05],[-1.2,4.55,-0.05],[-1.35,4.25,-0.1]],0.06,[0.75,0.72,0.72]],
 ['Left upper lobe bronchus',[[0.55,5.2,0.12],[0.95,5.65,0.1],[1.2,6.0,0.05]],0.06,[0.75,0.72,0.72]],
 ['Lingular bronchus',[[0.8,5.05,0.1],[1.15,4.95,0.35],[1.45,4.8,0.4]],0.05,[0.75,0.72,0.72]],
 ['Left lower lobe bronchus',[[1.05,4.9,0.05],[1.2,4.5,-0.05],[1.35,4.2,-0.1]],0.06,[0.75,0.72,0.72]],
 ['Right main bronchus',[[0,5.5,0.18],[-0.55,5.25,0.12],[-1.0,4.95,0.05]],0.08,[0.75,0.72,0.72]],
 ['Left main bronchus',[[0,5.5,0.18],[0.55,5.2,0.12],[1.05,4.9,0.05]],0.08,[0.75,0.72,0.72]],
 ['Oesophagus (behind the trachea, through the diaphragm at T10)',[[0,7.0,0.3],[0,6.5,0.1],[0.05,5.6,-0.15],[0.1,4.7,-0.1],[0.3,4.2,0.1],[0.5,4.0,0.35]],0.09,[0.85,0.6,0.5]],
 ['Colon: caecum and ascending (RLQ → hepatic flexure, RUQ)',[[-1.15,1.45,0.45],[-1.25,2.0,0.45],[-1.3,2.6,0.4],[-1.25,3.1,0.3]],0.2,[0.8,0.62,0.5]],
 ['Colon: transverse (hepatic flexure → splenic flexure, drapes across the umbilical region)',[[-1.25,3.1,0.3],[-0.6,2.75,0.62],[0.1,2.6,0.68],[0.8,2.8,0.62],[1.35,3.2,0.3]],0.2,[0.8,0.62,0.5]],
 ['Colon: descending (splenic flexure, LUQ → LLQ)',[[1.35,3.2,0.3],[1.4,2.6,0.35],[1.35,2.0,0.4],[1.2,1.55,0.45]],0.2,[0.8,0.62,0.5]],
 ['Colon: sigmoid and rectum (LLQ → pelvis)',[[1.2,1.55,0.45],[0.7,1.25,0.35],[0.2,1.15,-0.1],[0.05,0.85,-0.35]],0.18,[0.8,0.62,0.5]],
 ['Appendix (McBurney point, RLQ)',[[-1.15,1.45,0.45],[-0.95,1.2,0.5]],0.06,[0.8,0.62,0.5]],
 ['Ureters (renal pelvis → bladder)',[[-0.75,2.7,-0.3],[-0.55,2.0,-0.05],[-0.3,1.45,0.3],[-0.05,1.3,0.45]],0.05,[0.9,0.75,0.4]],
 ['Ureters (renal pelvis → bladder)',[[0.75,2.9,-0.3],[0.55,2.0,-0.05],[0.3,1.45,0.3],[0.05,1.3,0.45]],0.05,[0.9,0.75,0.4]],
];
window.Body3D={
 ready:false,yaw:0,pitch:0,dist:27.5,target:[0,0.45,0],zone:0,hover:0,
 async init(canvas,opts){
  this.canvas=canvas;this.opts=opts||{};
  const gl=canvas.getContext('webgl',{antialias:true,alpha:true,premultipliedAlpha:false});if(!gl){canvas.replaceWith(Object.assign(document.createElement('p'),{textContent:'3D view needs WebGL.',className:'none'}));return;}
  this.gl=gl;
  let buf;
  if(window.BODY3D_B64){const bin=atob(window.BODY3D_B64);const u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);buf=u8.buffer;}
  else{const res=await fetch(this.opts.src||'body3d.bin');buf=await res.arrayBuffer();}
  const dv=new DataView(buf);
  const tag=String.fromCharCode(dv.getUint8(0),dv.getUint8(1),dv.getUint8(2),dv.getUint8(3));const v2=tag==='B3D2'||tag==='B3D3',v3=tag==='B3D3';const h=v2?4:0;
  const nv=dv.getUint32(h,true),nt=dv.getUint32(h+4,true);const o0=h+8;
  const pos=new Float32Array(buf,o0,nv*3);const nrmI=new Int8Array(buf,o0+nv*12,nv*3);const idx=new Uint32Array(buf.slice(o0+nv*12+nv*3,o0+nv*12+nv*3+nt*12));
  const nrm=new Float32Array(nv*3);for(let i=0;i<nv*3;i++)nrm[i]=nrmI[i]/127;this.nrmArr=nrm;
  const zone=new Float32Array(nv);if(v2){const zb=new Uint8Array(buf,o0+nv*12+nv*3+nt*12,nv);for(let i=0;i<nv;i++)zone[i]=zb[i];}else{for(let i=0;i<nv;i++)zone[i]=classify(pos[i*3],pos[i*3+1],pos[i*3+2]);}
  const seg=new Uint8Array(nv);if(v3){seg.set(new Uint8Array(buf,o0+nv*12+nv*3+nt*12+nv,nv));}
  this.pos=pos;this.idx=idx;this.zoneAttr=zone;this.nt=nt;
  const prog=gl.createProgram();const mk=(t,src)=>{const sh=gl.createShader(t);gl.shaderSource(sh,src);gl.compileShader(sh);gl.attachShader(prog,sh);};mk(gl.VERTEX_SHADER,VS);mk(gl.FRAGMENT_SHADER,FS);gl.linkProgram(prog);gl.useProgram(prog);this.prog=prog;
  this.bodyBinds=[];const bind=(name,data,size)=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);const loc=gl.getAttribLocation(prog,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);this.bodyBinds.push([b,loc,size]);};
  this.rebind=()=>{this.bodyBinds.forEach(([b,loc,size])=>{gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);});gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuf);};
  const uvF=new Float32Array(nv*2),uvB=new Float32Array(nv*2);
  for(let i=0;i<nv;i++){const [ux,uy]=unwarp(pos[i*3],pos[i*3+1]);const yy=(Y02D-uy*K2D)/1448;uvF[i*2]=(364+ux*K2D)/724;uvF[i*2+1]=yy;uvB[i*2]=(360-ux*K2D)/724;uvB[i*2+1]=yy;}
  /* anatomical sections: limbs from bone segments, torso and head from the muscle plate */
  const sec=new Float32Array(nv);{const S=sectionizer();for(let i=0;i<nv;i++){const sid=S(seg[i],nrm[i*3+2],uvF[i*2]*724,uvF[i*2+1]*1448,uvB[i*2]*724+724,uvB[i*2+1]*1448,pos[i*3],pos[i*3+1]);sec[i]=sid;zone[i]=SEC_ZONE[sid]||zone[i];}}
  this.secAttr=sec;this.uvF=uvF;this.uvB=uvB;
  bind('aPos',pos,3);bind('aNrm',nrm,3);bind('aZone',zone,1);bind('aSec',sec,1);bind('aUvF',uvF,2);bind('aUvB',uvB,2);
  await this.loadTextures();
  this.buildAnatomy();
  const ext=gl.getExtension('OES_element_index_uint');const ib=gl.createBuffer();this.ibuf=ib;gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);
  if(ext){gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,idx,gl.STATIC_DRAW);this.idxType=gl.UNSIGNED_INT;}else{gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(idx),gl.STATIC_DRAW);this.idxType=gl.UNSIGNED_SHORT;}
  this.u={};['uP','uV','uM','uBase','uAccent','uLight','uEye','uZone','uHover','uOffset','uInk','uOutline','uTexF','uTexB','uSec','uSections','uMuscles','uMusHov','uMusF','uMusB','uMusCF','uMusCB','uTint','uSkin','uBack','uSkinMode','uSkinCol'].forEach(n=>this.u[n]=gl.getUniformLocation(prog,n));
  gl.uniform1i(this.u.uTexF,0);gl.uniform1i(this.u.uTexB,1);gl.uniform1i(this.u.uMusF,2);gl.uniform1i(this.u.uMusB,3);gl.uniform1i(this.u.uMusCF,4);gl.uniform1i(this.u.uMusCB,5);
  gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);
  this.bindEvents();this.ready=true;this.resize();this.draw();
 },
 buildAnatomy(){
  const gl=this.gl;const body={pos:this.pos,nrm:this.nrmArr,zone:this.zoneAttr,nv:this.pos.length/3};
  const src=(typeof window.BODY3D_ANATOMY==='function')?window.BODY3D_ANATOMY(window.BODY3D_JOINTS||{}):(window.BODY3D_ANATOMY||[]);
  const items=[];src.forEach(([layer,name,cal,pair,pts])=>{items.push({layer,name,cal,pts,side:pair?'L':null});if(pair)items.push({layer,name,cal,pts:pts.map(([x,y,z,d])=>[-x,y,z,d]),side:'R'});});
  this.structs=[];const bufs={artery:[],vein:[],nerve:[],lymph:[],organ:[],bone:[],muscle:[]};this.ranges={organ:[],bone:[],artery:[],vein:[],nerve:[],lymph:[],muscle:[]};const hasPack=!!window.BODY3D_ORGANS_B64;const fullPack=hasPack&&atob(window.BODY3D_ORGANS_B64.slice(0,8)).slice(0,4)==='ORG2';this.fullPack=fullPack;
  const RAD={1:0.05,2:0.034,3:0.022};
  const zonesOf=(P,deep)=>{let m=0;P.forEach((p,i)=>{m|=zoneBits(body,p[0],p[1],p[2],deep?deep[i]:true);});return m;};
  let nid=0;items.forEach((it,i)=>{if(fullPack&&!(it.layer==='lymph'&&it.cal>0))return;/* Z-Anatomy has no lymph vessels: keep the drawn ducts and trunks */if(hasPack&&DROP_STRUCT.test(it.name))return;const id=++nid;const P=it.pts.map(([x,y,z,d])=>d?snapPoint(body,x,y,z,d):[x,y,z]);const zm=zonesOf(P,it.pts.map(q=>!q[3]));const s={id,layer:it.layer,name:it.name+(it.side?(it.side==='L'?" · patient's left":" · patient's right"):''),pts:P,zones:zm};this.structs.push(s);
    if(it.layer==='lymph'&&it.cal===0){P.forEach(c=>sphere(c,0.07,id,bufs.lymph,zm));}
    else{const sm=P.length>1?smoothLine(P,5):P;tube(sm,it.layer==='lymph'?0.018:(RAD[it.cal]||0.03),id,bufs[it.layer],zm);}
  });
  /* organs */
  ['artery','vein','nerve','lymph'].forEach(k=>{this.ranges[k].push({start:0,count:bufs[k].length/8,col:null});});
  ORGANS.forEach(([name,c,rx,ry,rz,rot,col])=>{if(fullPack)return;if(hasPack&&DROP_ORGAN.test(name))return;const id=++nid;const zm=zonesOf([c,[c[0],c[1]+ry*0.8,c[2]],[c[0],c[1]-ry*0.8,c[2]]]);const start=bufs.organ.length/8;ellipsoid(c,rx,ry,rz,rot,id,bufs.organ,zm);this.ranges.organ.push({start,count:bufs.organ.length/8-start,col});this.structs.push({id,layer:'organ',name,pts:[c],zones:zm});});
  ORGAN_TUBES.forEach(([name,pts,r,col])=>{if(fullPack)return;if(hasPack&&DROP_ORGAN.test(name))return;const id=++nid;const zm=zonesOf(pts);const start=bufs.organ.length/8;tube(smoothLine(pts,5),r,id,bufs.organ,zm);this.ranges.organ.push({start,count:bufs.organ.length/8-start,col});this.structs.push({id,layer:'organ',name,pts,zones:zm});});
  /* real meshes from the SPL atlases */
  if(hasPack){const parts=parseOrganPack(window.BODY3D_ORGANS_B64);parts.forEach(pt=>{const id=++nid;const c=[(pt.mn[0]+pt.mx[0])/2,(pt.mn[1]+pt.mx[1])/2,(pt.mn[2]+pt.mx[2])/2];const samples=[c,[c[0],pt.mn[1],c[2]],[c[0],pt.mx[1],c[2]],[pt.mn[0],c[1],c[2]],[pt.mx[0],c[1],c[2]]];const zm=zonesOf(samples);
    const out=bufs[pt.layer];const start=out.length/8;const P=pt.pos,N=pt.nrm,I=pt.idx;for(let i=0;i<I.length;i++){const v=I[i]*3;out.push(P[v],P[v+1],P[v+2],N[v],N[v+1],N[v+2],id,zm);}
    this.ranges[pt.layer].push({start,count:out.length/8-start,col:pt.col});
    /* pick points: a sparse sample of the vertices */
    const pts=[];const step=Math.max(1,Math.floor(pt.nv/40));for(let i=0;i<pt.nv;i+=step)pts.push([P[i*3],P[i*3+1],P[i*3+2]]);
    this.structs.push({id,layer:pt.layer,name:pt.name,pts,zones:zm,mesh:true,anchor:c,size:Math.hypot(pt.mx[0]-pt.mn[0],pt.mx[1]-pt.mn[1],pt.mx[2]-pt.mn[2])});});}
  const prog=gl.createProgram();const mk=(t,src2)=>{const sh=gl.createShader(t);gl.shaderSource(sh,src2);gl.compileShader(sh);gl.attachShader(prog,sh);};mk(gl.VERTEX_SHADER,SVS);mk(gl.FRAGMENT_SHADER,SFS);gl.linkProgram(prog);this.sprog=prog;
  this.su={};['uP','uV','uHi','uSel','uFocus','uCol','uAlpha','uDimA','uEye','uLight','uPass','uWet'].forEach(n=>this.su[n]=gl.getUniformLocation(prog,n));this.sa={aPos:gl.getAttribLocation(prog,'aPos'),aNrm:gl.getAttribLocation(prog,'aNrm'),aId:gl.getAttribLocation(prog,'aId'),aZm:gl.getAttribLocation(prog,'aZm'),aFoc:gl.getAttribLocation(prog,'aFoc')};
  this.sbuf={};Object.entries(bufs).forEach(([k,arr])=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arr),gl.STATIC_DRAW);const n=arr.length/8;const ids=new Float32Array(n);for(let i=0;i<n;i++)ids[i]=arr[i*8+6];const fb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,fb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(n).fill(1),gl.DYNAMIC_DRAW);this.sbuf[k]={buf:b,n,ids,fbuf:fb};});
  this.layers={artery:false,vein:false,nerve:false,lymph:false,organ:false,bone:false,muscle:false,musclechart:false};this.hoverStruct=0;this.focus=null;
 },
 /* focus: a RegExp (or null) — structures whose name matches stay bright, everything else fades */
 setFocus(re){const key=re?String(re):'';if(key===this.focusKey)return;this.focusKey=key;this.focus=re||null;if(!this.structs)return;const gl=this.gl;const set=new Set();if(re)this.structs.forEach(s=>{if(re.test(s.name))set.add(s.id);});this.focusSet=re?set:null;
  Object.values(this.sbuf).forEach(b=>{const f=new Float32Array(b.n);for(let i=0;i<b.n;i++)f[i]=(!re||set.has(b.ids[i]))?1:0;gl.bindBuffer(gl.ARRAY_BUFFER,b.fbuf);gl.bufferData(gl.ARRAY_BUFFER,f,gl.DYNAMIC_DRAW);});if(this.ready)this.draw();},
 /* what is currently bright: layer on, in the selected zone (if any), in focus (if any) */
 visible(){if(!this.structs)return [];const z=this.focusSet?0:(this.zone||0);return this.structs.filter(s=>this.layers[s.layer]&&(!z||(s.zones&(1<<z)))&&(!this.focusSet||this.focusSet.has(s.id)));},
 /* structures that run through a zone (for the list under the figure) */
 inZone(zoneName){const z=ZONE_IDS[zoneName]||0;if(!this.structs)return [];return this.structs.filter(s=>this.layers[s.layer]&&(!z||(s.zones&(1<<z))));},
 anyLayer(){return !!(this.layers&&['artery','vein','nerve','lymph','organ','bone','muscle'].some(k=>this.layers[k]));},
 drawStructs(P,V,eye){
  const gl=this.gl;if(!this.sprog)return;gl.useProgram(this.sprog);gl.uniformMatrix4fv(this.su.uP,false,P);gl.uniformMatrix4fv(this.su.uV,false,V);gl.uniform1f(this.su.uHi,this.hoverStruct||0);gl.uniform1f(this.su.uSel,this.focusSet?0:(this.zone||0));gl.uniform1f(this.su.uFocus,this.focusSet?1:0);
  gl.uniform3fv(this.su.uEye,eye);gl.uniform3fv(this.su.uLight,[eye[0]*0.6+8,eye[1]*0.6+14,eye[2]*0.6+10]);
  const cols={artery:cssColor('--artery'),vein:cssColor('--vein'),nerve:this.fullPack?[0.78,0.6,0.12]:cssColor('--nerve'),lymph:cssColor('--accent'),organ:[0.8,0.5,0.5],bone:[0.9,0.87,0.78],muscle:[0.74,0.3,0.28]};
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.disable(gl.CULL_FACE);
  const ghost=this.ghost;
  const bindLayer=(k,b)=>{gl.bindBuffer(gl.ARRAY_BUFFER,b.buf);const st=32;gl.enableVertexAttribArray(this.sa.aPos);gl.vertexAttribPointer(this.sa.aPos,3,gl.FLOAT,false,st,0);gl.enableVertexAttribArray(this.sa.aNrm);gl.vertexAttribPointer(this.sa.aNrm,3,gl.FLOAT,false,st,12);gl.enableVertexAttribArray(this.sa.aId);gl.vertexAttribPointer(this.sa.aId,1,gl.FLOAT,false,st,24);gl.enableVertexAttribArray(this.sa.aZm);gl.vertexAttribPointer(this.sa.aZm,1,gl.FLOAT,false,st,28);gl.bindBuffer(gl.ARRAY_BUFFER,b.fbuf);gl.enableVertexAttribArray(this.sa.aFoc);gl.vertexAttribPointer(this.sa.aFoc,1,gl.FLOAT,false,0,0);};
  const drawRanges=(k,b)=>{gl.uniform1f(this.su.uWet,k==='organ'?0.45:k==='bone'?0.08:k==='muscle'?0.22:0.3);const ranges=(this.ranges&&this.ranges[k]&&this.ranges[k].length)?this.ranges[k]:[{start:0,count:b.n,col:null}];ranges.forEach(r=>{if(!r.count)return;gl.uniform3fv(this.su.uCol,r.col||cols[k]);gl.drawArrays(gl.TRIANGLES,r.start,r.count);});};
  if(ghost){/* faded structures first as ghosts (no depth writes), then the bright ones solid and lit */
    gl.depthFunc(gl.LEQUAL);const dimming=!!(this.focusSet||this.zone);
    if(dimming){gl.depthMask(false);gl.uniform1f(this.su.uPass,-1);Object.entries(this.sbuf).forEach(([k,b])=>{if(!this.layers[k]||!b.n)return;bindLayer(k,b);gl.uniform1f(this.su.uAlpha,1.0);gl.uniform1f(this.su.uDimA,0.14);drawRanges(k,b);});gl.depthMask(true);}
    gl.uniform1f(this.su.uPass,dimming?1:0);Object.entries(this.sbuf).forEach(([k,b])=>{if(!this.layers[k]||!b.n)return;bindLayer(k,b);gl.uniform1f(this.su.uAlpha,1.0);gl.uniform1f(this.su.uDimA,0.14);drawRanges(k,b);});}
  else{gl.uniform1f(this.su.uPass,0);Object.entries(this.sbuf).forEach(([k,b])=>{if(!this.layers[k]||!b.n)return;bindLayer(k,b);
    gl.depthFunc(gl.LEQUAL);gl.uniform1f(this.su.uAlpha,1.0);gl.uniform1f(this.su.uDimA,0.2);drawRanges(k,b);
    gl.depthFunc(gl.GREATER);gl.depthMask(false);const xa=k==='organ'?0.72:k==='bone'?0.6:k==='muscle'?0.42:0.7;gl.uniform1f(this.su.uAlpha,xa);gl.uniform1f(this.su.uDimA,xa*0.2);drawRanges(k,b);gl.depthMask(true);gl.depthFunc(gl.LEQUAL);});}
  gl.disable(gl.BLEND);gl.enable(gl.CULL_FACE);gl.useProgram(this.prog);
  this.rebind();
 },
 /* screen position of a model-space point, or null when behind the camera */
 project(p){if(!this.P)return null;const V=this.V,P=this.P;const x=V[0]*p[0]+V[4]*p[1]+V[8]*p[2]+V[12],y=V[1]*p[0]+V[5]*p[1]+V[9]*p[2]+V[13],z=V[2]*p[0]+V[6]*p[1]+V[10]*p[2]+V[14];const cx=P[0]*x+P[8]*z,cy=P[5]*y+P[9]*z,cw=P[11]*z;if(cw<=0)return null;const c=this.canvas;return {x:(cx/cw+1)/2*c.clientWidth,y:(1-cy/cw)/2*c.clientHeight,depth:-z};},
 /* bright structures with a screen anchor, for label callouts */
 labels(){return this.visible().filter(s=>s.anchor).map(s=>{const q=this.project(s.anchor);return q?{id:s.id,name:s.name,layer:s.layer,size:s.size||1,x:q.x,y:q.y,depth:q.depth}:null;}).filter(Boolean);},
 pickStruct(px,py){/* nearest visible structure to the ray, within a small screen tolerance; returns struct or null */
  if(!this.structs)return null;const c=this.canvas;const w=c.clientWidth,h=c.clientHeight;const nx=(px/w)*2-1,ny=1-(py/h)*2;
  const {eye,up}=this.camera();const f=norm([this.target[0]-eye[0],this.target[1]-eye[1],this.target[2]-eye[2]]);const r=norm(cross(f,up));const u=cross(r,f);const t=Math.tan(0.31),a=w/h;const dir=norm([f[0]+r[0]*nx*t*a+u[0]*ny*t,f[1]+r[1]*nx*t*a+u[1]*ny*t,f[2]+r[2]*nx*t*a+u[2]*ny*t]);
  let best=null,bd=0.16*this.dist/27;
  const zsel=this.focusSet?0:(this.zone||0);for(const s of this.structs){if(!this.layers[s.layer])continue;if(zsel&&!(s.zones&(1<<zsel)))continue;if(this.focusSet&&!this.focusSet.has(s.id))continue;for(const p of s.pts){const vx=p[0]-eye[0],vy=p[1]-eye[1],vz=p[2]-eye[2];const tt=vx*dir[0]+vy*dir[1]+vz*dir[2];if(tt<0)continue;const dx=vx-dir[0]*tt,dy=vy-dir[1]*tt,dz=vz-dir[2]*tt;const d=Math.hypot(dx,dy,dz);if(d<bd){bd=d;best=s;}}
   /* also test segment midpoints for long courses */
   for(let i=0;i<s.pts.length-1;i++){const p=[(s.pts[i][0]+s.pts[i+1][0])/2,(s.pts[i][1]+s.pts[i+1][1])/2,(s.pts[i][2]+s.pts[i+1][2])/2];const vx=p[0]-eye[0],vy=p[1]-eye[1],vz=p[2]-eye[2];const tt=vx*dir[0]+vy*dir[1]+vz*dir[2];if(tt<0)continue;const dx=vx-dir[0]*tt,dy=vy-dir[1]*tt,dz=vz-dir[2]*tt;const d=Math.hypot(dx,dy,dz);if(d<bd){bd=d;best=s;}}}
  return best;},
 async loadTextures(){const gl=this.gl;const [cf,cb]=await Promise.all([rasterArt('front'),rasterArt('back')]);const mk=(unit,cv,nearest)=>{const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,cv);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);const f=nearest?gl.NEAREST:gl.LINEAR;gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,f);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,f);return t;};this.texF=mk(0,cf);this.texB=mk(1,cb);this.texTheme=cssVar('--figure-soft');
  if(!this.musMap){const [mf,mb]=await Promise.all([rasterMuscleMap('front'),rasterMuscleMap('back')]);this.musMap={front:mf.data,back:mb.data};mk(2,mf.cv,true);mk(3,mb.cv,true);const [cf2,cb2]=await Promise.all([rasterMuscleChart('front'),rasterMuscleChart('back')]);mk(4,cf2);mk(5,cb2);}},
 /* muscle group under a plate point: {id,name} or null */
 muscleAt(view,u,v){const d=this.musMap&&this.musMap[view];if(!d)return null;const x=Math.max(0,Math.min(723,Math.round(u*724))),y=Math.max(0,Math.min(1447,Math.round(v*1448)));const o=(y*724+x)*4;const id=d[o],side=d[o+1];if(!id)return null;const base=view==='front'?1:101;const p=window.BODY_ART[view][id-base];if(!p)return null;return {id,name:muscleName(view,p.slug)+(side===1?" · patient's left":side===2?" · patient's right":'')};},
 setView(name){const p=PRESETS[name];if(!p)return;this.animateTo(p[0],p[1]);},
 flyTo(target,dist){const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const t0s=this.target.slice(),d0=this.dist;if(reduce){this.target=target.slice();this.dist=dist;this.draw();return;}const t0=performance.now();const step=now=>{const k=Math.min(1,(now-t0)/420),e=1-Math.pow(1-k,3);this.target=[0,1,2].map(i=>t0s[i]+(target[i]-t0s[i])*e);this.dist=d0+(dist-d0)*e;this.draw();if(k<1)requestAnimationFrame(step);};requestAnimationFrame(step);},
 animateTo(yaw,pitch){const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const y0=this.yaw,p0=this.pitch;let dy=yaw-y0;dy=Math.atan2(Math.sin(dy),Math.cos(dy));if(reduce){this.yaw=yaw;this.pitch=pitch;this.draw();return;}const t0=performance.now();const step=now=>{const k=Math.min(1,(now-t0)/380),e=1-Math.pow(1-k,3);this.yaw=y0+dy*e;this.pitch=p0+(pitch-p0)*e;this.draw();if(k<1)requestAnimationFrame(step);};requestAnimationFrame(step);},
 setZone2D(view,zoneId){this.zone=zoneId?(ZONE_IDS[FROM2D[view+':'+zoneId]]||0):0;if(this.ready)this.draw();},
 resize(){const c=this.canvas;const w=c.clientWidth||360,h=c.clientHeight||440;const dpr=Math.min(2,window.devicePixelRatio||1);if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);}},
 camera(){const cp=Math.cos(this.pitch);const eye=[this.target[0]+this.dist*Math.sin(this.yaw)*cp,this.target[1]+this.dist*Math.sin(this.pitch),this.target[2]+this.dist*Math.cos(this.yaw)*cp];const up=Math.abs(this.pitch)>Math.PI/2-0.05?[ -Math.sin(this.yaw),0,-Math.cos(this.yaw)]:[0,1,0];return {eye,up};},
 draw(){if(!this.ready)return;const gl=this.gl,c=this.canvas;this.resize();gl.viewport(0,0,c.width,c.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const {eye,up}=this.camera();const P=mat4Persp(0.62,c.width/c.height,1,200);const V=mat4LookAt(eye,this.target,up);
  gl.uniformMatrix4fv(this.u.uP,false,P);gl.uniformMatrix4fv(this.u.uV,false,V);gl.uniformMatrix4fv(this.u.uM,false,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  gl.uniform3fv(this.u.uBase,cssColor('--figure'));gl.uniform3fv(this.u.uAccent,cssColor('--accent'));
  gl.uniform3fv(this.u.uLight,[eye[0]*0.4+6,eye[1]*0.4+10,eye[2]*0.4+6]);gl.uniform3fv(this.u.uEye,eye);
  gl.uniform1f(this.u.uZone,this.zone);gl.uniform1f(this.u.uHover,this.hover);gl.uniform1f(this.u.uSec,this.hoverSec||0);gl.uniform1f(this.u.uSections,this.sections?1:0);gl.uniform1f(this.u.uMuscles,this.layers&&this.layers.musclechart?1:0);gl.uniform1f(this.u.uSkinMode,this.layers&&this.layers.plate?0:1);gl.uniform3fv(this.u.uSkinCol,this.skinCol||[0.87,0.7,0.6]);gl.uniform1f(this.u.uTint,(this.layers&&['artery','vein','nerve','lymph','organ','bone','muscle'].some(k=>this.layers[k]))?0.22:1);gl.uniform1f(this.u.uMusHov,this.layers&&(this.layers.muscle||this.layers.musclechart)?(this.hoverMuscle||0):0);gl.uniform3fv(this.u.uInk,cssColor('--ink'));
  if(this.texTheme&&this.texTheme!==cssVar('--figure-soft')&&!this.retex){this.retex=true;this.loadTextures().then(()=>{this.retex=false;this.draw();});}
  this.ghost=this.anyLayer()&&this.mode!=='xray';
  /* pass 1: inked silhouette (inverted hull) */
  gl.cullFace(gl.FRONT);gl.uniform1f(this.u.uOutline,1);gl.uniform1f(this.u.uOffset,0.05);gl.uniform1f(this.u.uSkin,1);gl.uniform1f(this.u.uBack,0);gl.drawElements(gl.TRIANGLES,this.nt*3,this.idxType,0);
  this.P=P;this.V=V;this.eye=eye;
  if(this.ghost){/* inside of the back wall as an opaque backdrop, solid anatomy, then the front skin as a translucent shell */
    gl.cullFace(gl.FRONT);gl.uniform1f(this.u.uOutline,0);gl.uniform1f(this.u.uOffset,0);gl.uniform1f(this.u.uBack,1);gl.uniform1f(this.u.uSkin,1);gl.drawElements(gl.TRIANGLES,this.nt*3,this.idxType,0);gl.uniform1f(this.u.uBack,0);
    this.drawStructs(P,V,eye);
    gl.cullFace(gl.BACK);gl.uniform1f(this.u.uOutline,0);gl.uniform1f(this.u.uOffset,0);gl.uniform1f(this.u.uSkin,0.3);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);gl.drawElements(gl.TRIANGLES,this.nt*3,this.idxType,0);gl.depthMask(true);gl.disable(gl.BLEND);}
  else{gl.cullFace(gl.BACK);gl.uniform1f(this.u.uOutline,0);gl.uniform1f(this.u.uOffset,0);gl.uniform1f(this.u.uSkin,1);gl.drawElements(gl.TRIANGLES,this.nt*3,this.idxType,0);this.drawStructs(P,V,eye);}
  if(this.opts.onDraw)this.opts.onDraw();},
 pick(px,py){/* returns zone id under canvas pixel (px,py) or 0 */
  const c=this.canvas;const w=c.clientWidth,h=c.clientHeight;const nx=(px/w)*2-1,ny=1-(py/h)*2;
  const {eye,up}=this.camera();const f=norm([this.target[0]-eye[0],this.target[1]-eye[1],this.target[2]-eye[2]]);const r=norm(cross(f,up));const u=cross(r,f);
  const t=Math.tan(0.31),a=w/h;const dir=norm([f[0]+r[0]*nx*t*a+u[0]*ny*t,f[1]+r[1]*nx*t*a+u[1]*ny*t,f[2]+r[2]*nx*t*a+u[2]*ny*t]);
  let best=Infinity,bz=0;const p=this.pos,ix=this.idx;
  for(let i=0;i<ix.length;i+=3){const a0=ix[i]*3,b0=ix[i+1]*3,c0=ix[i+2]*3;
   const e1x=p[b0]-p[a0],e1y=p[b0+1]-p[a0+1],e1z=p[b0+2]-p[a0+2];const e2x=p[c0]-p[a0],e2y=p[c0+1]-p[a0+1],e2z=p[c0+2]-p[a0+2];
   const hx=dir[1]*e2z-dir[2]*e2y,hy=dir[2]*e2x-dir[0]*e2z,hz=dir[0]*e2y-dir[1]*e2x;const det=e1x*hx+e1y*hy+e1z*hz;if(det>-1e-7&&det<1e-7)continue;const inv=1/det;
   const sx=eye[0]-p[a0],sy=eye[1]-p[a0+1],sz=eye[2]-p[a0+2];const uu=inv*(sx*hx+sy*hy+sz*hz);if(uu<0||uu>1)continue;
   const qx=sy*e1z-sz*e1y,qy=sz*e1x-sx*e1z,qz=sx*e1y-sy*e1x;const vv=inv*(dir[0]*qx+dir[1]*qy+dir[2]*qz);if(vv<0||uu+vv>1)continue;
   const tt=inv*(e2x*qx+e2y*qy+e2z*qz);if(tt>1e-4&&tt<best){best=tt;const za=this.zoneAttr,sa=this.secAttr;bz=za?za[ix[i]]:0;this.lastSec=sa?sa[ix[i]]:0;
    const n=this.nrmArr,ia=ix[i],ib=ix[i+1],ic=ix[i+2];const nz=n[ia*3+2]+n[ib*3+2]+n[ic*3+2];const uv=nz>=0?this.uvF:this.uvB;const w0=1-uu-vv;this.lastHit={view:nz>=0?'front':'back',u:uv[ia*2]*w0+uv[ib*2]*uu+uv[ic*2]*vv,v:uv[ia*2+1]*w0+uv[ib*2+1]*uu+uv[ic*2+1]*vv};}}
  if(best===Infinity){this.lastSec=0;this.lastHit=null;this.lastMuscle=null;}else{this.lastMuscle=this.lastHit?this.muscleAt(this.lastHit.view,this.lastHit.u,this.lastHit.v):null;}return bz;},
 bindEvents(){const c=this.canvas;let down=null,moved=false,pts=new Map(),pinch0=0,dist0=0;
  c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);if(pts.size===1){down=[e.clientX,e.clientY,this.yaw,this.pitch];moved=false;}else if(pts.size===2){const a=[...pts.values()];pinch0=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);dist0=this.dist;}});
  c.addEventListener('pointermove',e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,[e.clientX,e.clientY]);
   if(pts.size===2){const a=[...pts.values()];const d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);this.dist=Math.min(60,Math.max(8,dist0*pinch0/d));this.draw();return;}
   if(down){const dx=e.clientX-down[0],dy=e.clientY-down[1];if(Math.abs(dx)+Math.abs(dy)>4)moved=true;this.yaw=down[2]+dx*0.01;this.pitch=Math.max(-1.5,Math.min(1.5,down[3]+dy*0.01));this.draw();}
   else if(e.pointerType==='mouse'){const r=c.getBoundingClientRect();const z=this.pick(e.clientX-r.left,e.clientY-r.top);const sc=this.lastSec||0;const st=this.pickStruct(e.clientX-r.left,e.clientY-r.top);const sid=st?st.id:0;const mu=this.layers&&(this.layers.muscle||this.layers.musclechart)?this.lastMuscle:null;const mid=mu?mu.id:0;if(z!==this.hover||sc!==this.hoverSec||sid!==this.hoverStruct||mid!==this.hoverMuscle){this.hover=z;this.hoverSec=sc;this.hoverStruct=sid;this.hoverMuscle=mid;this.draw();if(this.opts.onHover)this.opts.onHover(ZONE_BY_ID[z]||null,st?st.name:(mu?mu.name:(SEC_NAMES[sc]||null)));}}});
  const up=e=>{pts.delete(e.pointerId);if(down&&!moved&&pts.size===0){const r=c.getBoundingClientRect();const st=this.pickStruct(e.clientX-r.left,e.clientY-r.top);if(st){this.hoverStruct=st.id;this.draw();if(this.opts.onHover)this.opts.onHover(null,st.name);}else{const z=this.pick(e.clientX-r.left,e.clientY-r.top);const mu=this.layers&&(this.layers.muscle||this.layers.musclechart)?this.lastMuscle:null;if(mu){this.hoverMuscle=mu.id;this.draw();if(this.opts.onHover)this.opts.onHover(null,mu.name);}if(z&&this.opts.onPick){const name=ZONE_BY_ID[z];this.opts.onPick(name,TO2D[name]);}}}if(pts.size===0)down=null;};
  c.addEventListener('pointerup',up);c.addEventListener('pointercancel',up);
  c.addEventListener('wheel',e=>{e.preventDefault();this.dist=Math.min(60,Math.max(8,this.dist*(1+Math.sign(e.deltaY)*0.08)));this.draw();},{passive:false});
  c.addEventListener('pointerleave',()=>{if(this.hover||this.hoverSec||this.hoverStruct){this.hover=0;this.hoverSec=0;this.hoverStruct=0;this.draw();}});
  window.addEventListener('resize',()=>this.draw());
 }
};
})();

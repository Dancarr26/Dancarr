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
const VS=`attribute vec3 aPos;attribute vec3 aNrm;attribute float aZone;uniform mat4 uP,uV,uM;uniform float uZone,uHover;varying vec3 vN;varying vec3 vW;varying float vOn;varying float vHv;
void main(){vec4 w=uM*vec4(aPos,1.0);vW=w.xyz;vN=mat3(uM)*aNrm;vOn=step(abs(aZone-uZone),0.5);vHv=step(abs(aZone-uHover),0.5);gl_Position=uP*uV*w;}`;
const FS=`precision mediump float;varying vec3 vN;varying vec3 vW;varying float vOn;varying float vHv;uniform vec3 uBase,uAccent,uLight,uEye;
void main(){vec3 n=normalize(vN);vec3 l=normalize(uLight);vec3 e=normalize(uEye-vW);
 float d=max(dot(n,l),0.0);float f=max(dot(n,normalize(vec3(-l.x,0.4,-l.z))),0.0)*0.35;float hemi=0.5+0.5*n.y;
 float rim=pow(1.0-max(dot(n,e),0.0),3.0)*0.25;
 vec3 col=uBase*(0.28+0.22*hemi+0.55*d+f)+rim*vec3(1.0);
 float on=smoothstep(0.45,0.55,vOn);float hv=smoothstep(0.45,0.55,vHv)*(1.0-on);
 col=mix(col,mix(col,uAccent,0.55),on);col=mix(col,mix(col,uAccent,0.25),hv);
 gl_FragColor=vec4(col,1.0);}`;
function mat4Persp(f,a,n,fr){const t=1/Math.tan(f/2);return [t/a,0,0,0,0,t,0,0,0,0,(fr+n)/(n-fr),-1,0,0,2*fr*n/(n-fr),0];}
function mat4LookAt(e,c,up){const z=norm([e[0]-c[0],e[1]-c[1],e[2]-c[2]]);const x=norm(cross(up,z));const y=cross(z,x);return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,e),-dot(y,e),-dot(z,e),1];}
function norm(v){const l=Math.hypot(v[0],v[1],v[2])||1;return [v[0]/l,v[1]/l,v[2]/l];}
function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
function cssColor(name){const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();const m=v.match(/^#([0-9a-f]{6})$/i);if(!m)return [0.75,0.78,0.8];const h=m[1];return [parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255];}
const PRESETS={front:[0,0],back:[Math.PI,0],left:[Math.PI/2,0],right:[-Math.PI/2,0],top:[0,Math.PI/2-0.01],bottom:[0,-Math.PI/2+0.01]};
window.Body3D={
 ready:false,yaw:0,pitch:0,dist:26,target:[0,0.3,0],zone:0,hover:0,
 async init(canvas,opts){
  this.canvas=canvas;this.opts=opts||{};
  const gl=canvas.getContext('webgl',{antialias:true,alpha:true,premultipliedAlpha:false});if(!gl){canvas.replaceWith(Object.assign(document.createElement('p'),{textContent:'3D view needs WebGL.',className:'none'}));return;}
  this.gl=gl;
  const res=await fetch(this.opts.src||'body3d.bin');const buf=await res.arrayBuffer();const dv=new DataView(buf);
  const nv=dv.getUint32(0,true),nt=dv.getUint32(4,true);
  const pos=new Float32Array(buf,8,nv*3);const nrmI=new Int8Array(buf,8+nv*12,nv*3);const idx=new Uint32Array(buf.slice(8+nv*12+nv*3,8+nv*12+nv*3+nt*12));
  const nrm=new Float32Array(nv*3);for(let i=0;i<nv*3;i++)nrm[i]=nrmI[i]/127;
  const zone=new Float32Array(nv);for(let i=0;i<nv;i++)zone[i]=classify(pos[i*3],pos[i*3+1],pos[i*3+2]);
  this.pos=pos;this.idx=idx;this.zoneAttr=zone;this.nt=nt;
  const prog=gl.createProgram();const mk=(t,src)=>{const sh=gl.createShader(t);gl.shaderSource(sh,src);gl.compileShader(sh);gl.attachShader(prog,sh);};mk(gl.VERTEX_SHADER,VS);mk(gl.FRAGMENT_SHADER,FS);gl.linkProgram(prog);gl.useProgram(prog);this.prog=prog;
  const bind=(name,data,size)=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);const loc=gl.getAttribLocation(prog,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);};
  bind('aPos',pos,3);bind('aNrm',nrm,3);bind('aZone',zone,1);
  const ext=gl.getExtension('OES_element_index_uint');const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);
  if(ext){gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,idx,gl.STATIC_DRAW);this.idxType=gl.UNSIGNED_INT;}else{gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(idx),gl.STATIC_DRAW);this.idxType=gl.UNSIGNED_SHORT;}
  this.u={};['uP','uV','uM','uBase','uAccent','uLight','uEye','uZone','uHover'].forEach(n=>this.u[n]=gl.getUniformLocation(prog,n));
  gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);
  this.bindEvents();this.ready=true;this.resize();this.draw();
 },
 setView(name){const p=PRESETS[name];if(!p)return;this.animateTo(p[0],p[1]);},
 animateTo(yaw,pitch){const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const y0=this.yaw,p0=this.pitch;let dy=yaw-y0;dy=Math.atan2(Math.sin(dy),Math.cos(dy));if(reduce){this.yaw=yaw;this.pitch=pitch;this.draw();return;}const t0=performance.now();const step=now=>{const k=Math.min(1,(now-t0)/380),e=1-Math.pow(1-k,3);this.yaw=y0+dy*e;this.pitch=p0+(pitch-p0)*e;this.draw();if(k<1)requestAnimationFrame(step);};requestAnimationFrame(step);},
 setZone2D(view,zoneId){this.zone=zoneId?(ZONE_IDS[FROM2D[view+':'+zoneId]]||0):0;if(this.ready)this.draw();},
 resize(){const c=this.canvas;const w=c.clientWidth||360,h=c.clientHeight||440;const dpr=Math.min(2,window.devicePixelRatio||1);if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);}},
 camera(){const cp=Math.cos(this.pitch);const eye=[this.target[0]+this.dist*Math.sin(this.yaw)*cp,this.target[1]+this.dist*Math.sin(this.pitch),this.target[2]+this.dist*Math.cos(this.yaw)*cp];const up=Math.abs(this.pitch)>Math.PI/2-0.05?[ -Math.sin(this.yaw),0,-Math.cos(this.yaw)]:[0,1,0];return {eye,up};},
 draw(){if(!this.ready)return;const gl=this.gl,c=this.canvas;this.resize();gl.viewport(0,0,c.width,c.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const {eye,up}=this.camera();const P=mat4Persp(0.62,c.width/c.height,1,200);const V=mat4LookAt(eye,this.target,up);
  gl.uniformMatrix4fv(this.u.uP,false,P);gl.uniformMatrix4fv(this.u.uV,false,V);gl.uniformMatrix4fv(this.u.uM,false,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  gl.uniform3fv(this.u.uBase,cssColor('--figure'));gl.uniform3fv(this.u.uAccent,cssColor('--accent'));
  gl.uniform3fv(this.u.uLight,[eye[0]*0.4+6,eye[1]*0.4+10,eye[2]*0.4+6]);gl.uniform3fv(this.u.uEye,eye);
  gl.uniform1f(this.u.uZone,this.zone);gl.uniform1f(this.u.uHover,this.hover);
  gl.drawElements(gl.TRIANGLES,this.nt*3,this.idxType,0);this.P=P;this.V=V;this.eye=eye;},
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
   const tt=inv*(e2x*qx+e2y*qy+e2z*qz);if(tt>1e-4&&tt<best){best=tt;const hx2=eye[0]+dir[0]*tt,hy2=eye[1]+dir[1]*tt,hz2=eye[2]+dir[2]*tt;bz=classify(hx2,hy2,hz2);}}
  return bz;},
 bindEvents(){const c=this.canvas;let down=null,moved=false,pts=new Map(),pinch0=0,dist0=0;
  c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);if(pts.size===1){down=[e.clientX,e.clientY,this.yaw,this.pitch];moved=false;}else if(pts.size===2){const a=[...pts.values()];pinch0=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);dist0=this.dist;}});
  c.addEventListener('pointermove',e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,[e.clientX,e.clientY]);
   if(pts.size===2){const a=[...pts.values()];const d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);this.dist=Math.min(60,Math.max(8,dist0*pinch0/d));this.draw();return;}
   if(down){const dx=e.clientX-down[0],dy=e.clientY-down[1];if(Math.abs(dx)+Math.abs(dy)>4)moved=true;this.yaw=down[2]+dx*0.01;this.pitch=Math.max(-1.5,Math.min(1.5,down[3]+dy*0.01));this.draw();}
   else if(e.pointerType==='mouse'){const r=c.getBoundingClientRect();const z=this.pick(e.clientX-r.left,e.clientY-r.top);if(z!==this.hover){this.hover=z;this.draw();if(this.opts.onHover)this.opts.onHover(ZONE_BY_ID[z]||null);}}});
  const up=e=>{pts.delete(e.pointerId);if(down&&!moved&&pts.size===0){const r=c.getBoundingClientRect();const z=this.pick(e.clientX-r.left,e.clientY-r.top);if(z&&this.opts.onPick){const name=ZONE_BY_ID[z];this.opts.onPick(name,TO2D[name]);}}if(pts.size===0)down=null;};
  c.addEventListener('pointerup',up);c.addEventListener('pointercancel',up);
  c.addEventListener('wheel',e=>{e.preventDefault();this.dist=Math.min(60,Math.max(8,this.dist*(1+Math.sign(e.deltaY)*0.08)));this.draw();},{passive:false});
  c.addEventListener('pointerleave',()=>{if(this.hover){this.hover=0;this.draw();}});
  window.addEventListener('resize',()=>this.draw());
 }
};
})();

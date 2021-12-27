var F=Object.defineProperty;var G=(I,e,i)=>e in I?F(I,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):I[e]=i;var c=(I,e,i)=>(G(I,typeof e!="symbol"?e+"":e,i),i);import{M as T,B as _,a as H,V as p,b as Q,P as U,S as P,W as v,D as q,A as $,c as ee,d as ie,e as te,O as se}from"./vendor.0e3776d8.js";const ne=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}};ne();const oe="modulepreload",x={},Ie="/",S=function(e,i){return!i||i.length===0?e():Promise.all(i.map(t=>{if(t=`${Ie}${t}`,t in x)return;x[t]=!0;const s=t.endsWith(".css"),o=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${o}`))return;const n=document.createElement("link");if(n.rel=s?"stylesheet":oe,s||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),s)return new Promise((C,r)=>{n.addEventListener("load",C),n.addEventListener("error",r)})})).then(()=>e())},f=180/Math.PI;let ce=0;class y extends T{constructor(e,i,t,s,o,n=0){const r=[5,5,9][n],a=new _(r,r,r),l=new H({color:0});super(a,l);this.position.set(e.x,e.y,e.z),this.index=ce++,this.x=e.x,this.y=e.y,this.z=e.z,this.sx=i.x,this.sy=i.y,this.sz=i.z;const J=new p(i.x,i.z);this.r=J.distanceTo(new p),this.theta=180+f*Math.atan2(i.z,i.x);const u=new p(this.x,this.z);this.gr=u.distanceTo(new p),this.globalTheta=f*Math.atan2(0-this.z,0-this.x),this.pieceId=o,this.pieceType=s,this.sculptureIndex=t}setHSB(e,i,t){e=e/360,i=i/100,t=t/100,t>1&&(t=1),t<0&&(t=0),this.material.color.setHSL(e,i,t*.5)}getHue(){return this.material.color.getHSL({}).h*360}getSaturation(){return this.material.color.getHSL({}).s*100}getBrightness(){return this.material.color.getHSL({}).l*100*2}}const Y="SHRUB",W=12;class Ce{constructor(e,i,t,s,o){c(this,"cubes",[]);const n=7,C=30,r=Math.random()*6,a=Math.random()*6,l=Math.cos(o)*((i+5)*n)+r,J=Math.sin(o)*((i+5)*n)+a,u=i*n*1.3+C,d=new Q(l,u,J),A=t.clone().add(d),k=new y(A,d,0,Y,e.pieceId,e.cubeSizeIndex);this.cubes.push(k)}}class re{constructor(e,i,t){c(this,"cubes",[]);const s=Math.PI*2/W*i;for(let o=0;o<5;o++){const n=new Ce(e,o,t,i,s);this.cubes.push(...n.cubes)}}}class le{constructor(e){c(this,"cubes",[]);const i=new Q(e.x,0,e.z);for(let n=0;n<W;n++){const C=new re(e,n,i);this.cubes.push(...C.cubes)}const t=new Q,s=i,o=new y(s,t,0,Y,e.pieceId,e.cubeSizeIndex);this.cubes.push(o)}}class ae{constructor(e){c(this,"cubes",[]);for(let i of e){const t=new le(i);this.cubes.push(...t.cubes)}}}const Je="FAIRY_CIRCLE",L=Math.PI/180;class ue{constructor(e,i,t,s){c(this,"RADIUS",18);c(this,"HEIGHTS",[12,14,14,16,16,18,18,20,20,18,18,16,16,14,14,12]);c(this,"N_CUBES",12);c(this,"cubes",[]);c(this,"pieceId","");const{x:o,z:n,pieceId:C}=t,{N_CUBES:r,RADIUS:a,HEIGHTS:l,cubes:J}=this;this.pieceId=C;let u=i,d=360/r*L;for(let A=0;A<r;A++){const k=new Q;k.x=a*Math.cos(u),k.y=l[A],k.z=a*Math.sin(u),u+=d;const h=new Q(o,0,n).add(e).add(k),w=e.clone().add(k),g=new y(h,w,s,Je,t.pieceId,t.cubeSizeIndex);J.push(g)}}}class Ae{constructor(e){c(this,"MINICLUSTERS_PER_NDB",5);c(this,"cubes",[]);c(this,"miniClusters",[]);c(this,"pieceId","");const i=e.ipAddresses.length*this.MINICLUSTERS_PER_NDB,t=360/i*L;let s=e.ry*L,o=Math.PI;this.pieceId=e.pieceId;for(let n=0;n<i;n++){const C=new Q;C.x=e.radius*Math.cos(s),C.y=0,C.z=e.radius*Math.sin(s);const r=new ue(C,o,e,n);this.miniClusters.push(r),s+=t,o+=t,this.cubes.push(...r.cubes)}}}class we{constructor(e){c(this,"cubes",[]);c(this,"fairyCircles",[]);for(let i of e){const t=new Ae(i);this.cubes.push(...t.cubes),this.fairyCircles.push(t)}}}const V="TREE",M=5,E=Math.PI/180;function K(I,e){return I.applyAxisAngle(new Q(0,1,0),e),I}class ge{constructor(e,i,t,s,o){c(this,"cubes",[]);c(this,"xKeyPoints",new Array(M));c(this,"yKeyPoints",new Array(M));c(this,"zKeyPoints",new Array(M));c(this,"holeSpacing",8);const n=i>4?4-i%4:i,C=e/180,r=[.37,.41,.5,.56,.63],a=[1,.96,.92,.88,.85],{xKeyPoints:l,yKeyPoints:J,zKeyPoints:u,holeSpacing:d}=this,A=e*r[n];l[4]=A,l[3]=A*.917,l[2]=A*.623,l[1]=A*.315,l[0]=C*12,J[4]=72*a[n],J[3]=72*.914*a[n],J[2]=72*.793*a[n],J[1]=(72*.671+6)*a[n],J[0]=(72*.455+8)*a[n],u[4]=A*.199,u[3]=A*.13,u[2]=0,u[1]=A*-.08,u[0]=A*-.05;const k=i*45*E+s.ry*E;let h=l[M-1];for(;h>0;){let w=0;for(;l[w]<h&&w<M;)w++;if(w<M&&w>0){const g=(h-l[w-1])/(l[w]-l[w-1]),D=J[w-1]+g*(J[w]-J[w-1])+t,N=u[w-1]+g*(u[w]-u[w-1]);let Z=!1;new Q(h,0,N).distanceTo(new Q)<=A*.5&&(Z=!0);const m=new Q(h,D,N);K(m,k);const R=new Q(s.x,0,s.z).add(m);if(!Z){const X=new y(R,m,o,V,s.pieceId,s.cubeSizeIndex),b=new Q(h,D,-N);K(b,k);const j=new Q(s.x,0,s.z).add(b),B=new y(j,b,o,V,s.pieceId,s.cubeSizeIndex);this.cubes.push(X),this.cubes.push(B)}}h-=d}}}class de{constructor(e,i,t,s,o){c(this,"cubes",[]);let n=[];switch(i){case 0:n=[0,1,2,3,4,5,6,7];break;case 1:n=[0,2,4,6];break;case 2:n=[1,3,5,7];break;default:n=[]}for(let C=0;C<n.length;C++){const r=new ge(e,n[C],t,s,o);this.cubes.push(...r.cubes)}}}class Qe{constructor(e,i){c(this,"cubes",[]);const{canopyMajorLengths:t,layerBaseHeights:s}=e;for(let o=0;o<t.length;o++){const n=new de(t[o],o,s[o],e,i);this.cubes.push(...n.cubes)}}}class ke{constructor(e){c(this,"cubes",[]);let i=0;for(let t of e){const s=new Qe(t,i);this.cubes.push(...s.cubes)}}}async function O(I){return await(await fetch(I)).json()}class he{constructor(e,i,t){c(this,"loaded",!1);c(this,"cubes",[]);c(this,"fairyCircles",[]);this.fairyCircleFileURL=e,this.shrubFileURL=i,this.treeFileURL=t}async load(){if(this.loaded==!1){const e=await O(this.fairyCircleFileURL),i=this.createFairyCircles(e);this.fairyCircles=[...i.fairyCircles],this.cubes.push(...i.cubes);const t=await O(this.shrubFileURL);let s=this.createShrubs(t);this.cubes.push(...s);const o=await O(this.treeFileURL);s=this.createTrees(o),this.cubes.push(...s)}return this.cubes}createFairyCircles(e){return new we(e)}createShrubs(e){return new ae(e).cubes}createTrees(e){return new ke(e).cubes}}var De="data:application/json;base64,Ww0KCXsNCgkJCSJyeSIgOiA0MCwNCgkJCSJ4IiA6IC0yMTksDQoJCQkieiIgOiAtMTQyMCwNCgkJCSJyYWRpdXMiIDogMTgwLA0KCQkJInBpZWNlSWQiIDogImNpcmNsZS0xIiwNCgkJCSJjdWJlU2l6ZUluZGV4IiA6IDAsDQoJCQkiaXBBZGRyZXNzZXMiIDogWyIxMC4wLjAuMTQwIiwgIjEwLjAuMC4xNDEiXQ0KCX0sDQoJew0KCQkJInJ5IiA6IDM0MCwNCgkJCSJ4IiA6IC05MjAsDQoJCQkieiIgOiAtNDY0LA0KCQkJInJhZGl1cyIgOiAyNDAsDQoJCQkicGllY2VJZCIgOiAiY2lyY2xlLTIiLA0KCQkJImN1YmVTaXplSW5kZXgiIDogMCwNCgkJCSJpcEFkZHJlc3NlcyIgOiBbIjEwLjAuMC4xNDIiLCAiMTAuMC4wLjE0MyJdDQoJfSwNCgkJew0KCQkJInJ5IiA6IDI3MCwNCgkJCSJ4IiA6IDEwMDgsDQoJCQkieiIgOiA2NzUsDQoJCQkicmFkaXVzIiA6IDMwMCwNCgkJCSJjdWJlU2l6ZUluZGV4IiA6IDAsDQoJCQkicGllY2VJZCIgOiAiY2lyY2xlLTMiLA0KCQkJImlwQWRkcmVzc2VzIiA6IFsiMTAuMC4wLjE0NSIsICIxMC4wLjAuMTQ2IiwiMTAuMC4wLjE0NyIsICIxMC4wLjAuMTQ0Il0NCgl9DQpd",Ne="data:application/json;base64,Ww0KCXsNCgkJCSJyeSIgOiAxMzAsDQoJCQkieCIgOiAtODY4LA0KCQkJInoiIDogLTE0NjQsDQoJCQkidHlwZSIgOiAia2luZyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDAsDQoJCQkicGllY2VJZCIgOiAia2luZy0xIiwNCgkJCSJzaHJ1YklwQWRkcmVzcyIgOiAiMTAuMC4wLjEyMCINCgl9LA0KCXsNCgkJCSJyeSIgOiAxNzAsDQoJCQkieCIgOiAtNTg3LA0KCQkJInoiIDogLTE1OTYsDQoJCQkidHlwZSIgOiAiY2xhc3NpYyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDEsDQoJCQkicGllY2VJZCIgOiAic2hydWItMTEiLA0KCQkJInNocnViSXBBZGRyZXNzIiA6ICIxMC4wLjAuMTA5Ig0KCX0sDQoJew0KCQkJInJ5IiA6IDEzMCwNCgkJCSJ4IiA6IC0xMDQzLA0KCQkJInoiIDogLTE2MDQsDQoJCQkidHlwZSIgOiAiY2xhc3NpYyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDAsDQoJCQkicGllY2VJZCIgOiAic2hydWItMTIiLA0KCQkJInNocnViSXBBZGRyZXNzIiA6ICIxMC4wLjAuMTE0Ig0KCX0sDQoJew0KCQkJInJ5IiA6IDEzMCwNCgkJCSJ4IiA6IC0xMDI2LA0KCQkJInoiIDogLTExNjYsDQoJCQkidHlwZSIgOiAiY2xhc3NpYyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDAsDQoJCQkicGllY2VJZCIgOiAic2hydWItMTMiLA0KCQkJInNocnViSXBBZGRyZXNzIiA6ICIxMC4wLjAuMTEzIg0KCX0sDQoJew0KCQkJInJ5IiA6IDEzMCwNCgkJCSJ4IiA6IDE2NiwNCgkJCSJ6IiA6IC0zMjQsDQoJCQkidHlwZSIgOiAia2luZyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDAsDQoJCQkicGllY2VJZCIgOiAia2luZy0yIiwNCgkJCSJzaHJ1YklwQWRkcmVzcyIgOiAiMTAuMC4wLjExOCINCgl9LA0KCXsNCgkJCSJyeSIgOiAxNzUsDQoJCQkieCIgOiA0NjQsDQoJCQkieiIgOiAtMzY4LA0KCQkJInR5cGUiIDogImNsYXNzaWMiLA0KCQkJImN1YmVTaXplSW5kZXgiOiAxLA0KCQkJInBpZWNlSWQiIDogInNocnViLTIxIiwNCgkJCSJzaHJ1YklwQWRkcmVzcyIgOiAiMTAuMC4wLjIxNCINCgl9LA0KCXsNCgkJCSJyeSIgOiAxODAsDQoJCQkieCIgOiAzNSwNCgkJCSJ6IiA6IC02MzEsDQoJCQkidHlwZSIgOiAiY2xhc3NpYyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDAsDQoJCQkicGllY2VJZCIgOiAic2hydWItMjIiLA0KCQkJInNocnViSXBBZGRyZXNzIiA6ICIxMC4wLjAuMTEyIg0KCX0sDQoJew0KCQkJInJ5IiA6IDEzNSwNCgkJCSJ4IiA6IC0yMzYsDQoJCQkieiIgOiAtNDkxLA0KCQkJInR5cGUiIDogImNsYXNzaWMiLA0KCQkJImN1YmVTaXplSW5kZXgiOiAwLA0KCQkJInBpZWNlSWQiIDogInNocnViLTIzIiwNCgkJCSJzaHJ1YklwQWRkcmVzcyIgOiAiMTAuMC4wLjExNSINCgl9LA0KCXsNCgkJCSJyeSIgOiAzMDAsDQoJCQkieCIgOiA0NDcsDQoJCQkieiIgOiAzMDYsDQoJCQkidHlwZSIgOiAia2luZyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDAsDQoJCQkicGllY2VJZCIgOiAia2luZy0zIiwNCgkJCSJzaHJ1YklwQWRkcmVzcyIgOiAiMTAuMC4wLjExNiINCgl9LA0KCXsNCgkJCSJyeSIgOiAyNzAsDQoJCQkieCIgOiA0OTksDQoJCQkieiIgOiA1NTIsDQoJCQkidHlwZSIgOiAiY2xhc3NpYyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDEsDQoJCQkicGllY2VJZCIgOiAic2hydWItMzEiLA0KCQkJInNocnViSXBBZGRyZXNzIiA6ICIxMC4wLjAuMTExIg0KCX0sDQoJew0KCQkJInJ5IiA6IDYwLA0KCQkJIngiIDogNDEyLA0KCQkJInoiIDogLTQzLA0KCQkJInR5cGUiIDogImNsYXNzaWMiLA0KCQkJImN1YmVTaXplSW5kZXgiOiAwLA0KCQkJInBpZWNlSWQiIDogInNocnViLTMyIiwNCgkJCSJzaHJ1YklwQWRkcmVzcyIgOiAiMTAuMC4wLjExOSINCgl9LA0KCXsNCgkJCSJyeSIgOiAxMzAsDQoJCQkieCIgOiAyMTksDQoJCQkieiIgOiAzOTQsDQoJCQkidHlwZSIgOiAiY2xhc3NpYyIsDQoJCQkiY3ViZVNpemVJbmRleCI6IDAsDQoJCQkicGllY2VJZCIgOiAic2hydWItMzMiLA0KCQkJInNocnViSXBBZGRyZXNzIiA6ICIxMC4wLjAuMTE3Ig0KCX0NCl0=",Me="data:application/json;base64,Ww0KCXsNCgkJImNhbm9weU1ham9yTGVuZ3RocyIgOiBbMjQwLCAxNjAsIDk2XSwNCgkJImxheWVyQmFzZUhlaWdodHMiIDogWzIwLCA3MSwgMTEyXSwNCgkJInJ5IiA6IDEzNSwNCgkJIngiIDogLTY0MCwNCgkJInoiIDogLTEwMjYsDQoJCSJwaWVjZUlkIjogInRyZWUtbWVkaXVtIg0KCX0sDQoJew0KCQkiY2Fub3B5TWFqb3JMZW5ndGhzIiA6IFsxODAsIDEyMF0sDQoJCSJsYXllckJhc2VIZWlnaHRzIiA6IFs0MywgOTVdLA0KCQkicnkiIDogMTgwLA0KCQkieCIgOiAwLA0KCQkieiIgOiAwLA0KCQkicGllY2VJZCI6ICJ0cmVlLXNtYWxsIg0KCX0sDQoJew0KCQkiY2Fub3B5TWFqb3JMZW5ndGhzIiA6IFsxMDBdLA0KCQkibGF5ZXJCYXNlSGVpZ2h0cyIgOiBbMjRdLA0KCQkicnkiIDogMCwNCgkJIngiIDogLTU1MiwNCgkJInoiIDogMjQ1LA0KCQkicGllY2VJZCIgOiAic2FwbGluZy0wMSINCgl9LA0KCXsNCgkJImNhbm9weU1ham9yTGVuZ3RocyIgOiBbMTAwXSwNCgkJImxheWVyQmFzZUhlaWdodHMiIDogWzI0XSwNCgkJInJ5IiA6IDAsDQoJCSJ4IiA6IC02OTIsDQoJCSJ6IiA6IDI1NCwNCgkJInBpZWNlSWQiIDogInNhcGxpbmctMDIiDQoJfSwNCgl7DQoJCSJjYW5vcHlNYWpvckxlbmd0aHMiIDogWzEwMF0sDQoJCSJsYXllckJhc2VIZWlnaHRzIiA6IFsyNF0sDQoJCSJyeSIgOiAwLA0KCQkieCIgOiAtODE1LA0KCQkieiIgOiA0MTIsDQoJCSJwaWVjZUlkIiA6ICJzYXBsaW5nLTAzIg0KCX0sDQoJew0KCQkiY2Fub3B5TWFqb3JMZW5ndGhzIiA6IFsxMDBdLA0KCQkibGF5ZXJCYXNlSGVpZ2h0cyIgOiBbMjRdLA0KCQkicnkiIDogMCwNCgkJIngiIDogLTg1MCwNCgkJInoiIDogMjU0LA0KCQkicGllY2VJZCIgOiAic2FwbGluZy0wNCINCgl9LA0KCXsNCgkJImNhbm9weU1ham9yTGVuZ3RocyIgOiBbMTAwXSwNCgkJImxheWVyQmFzZUhlaWdodHMiIDogWzI0XSwNCgkJInJ5IiA6IDAsDQoJCSJ4IiA6IC05MjAsDQoJCSJ6IiA6IDQ2NCwNCgkJInBpZWNlSWQiIDogInNhcGxpbmctMDUiDQoJfSwNCgl7DQoJCSJjYW5vcHlNYWpvckxlbmd0aHMiIDogWzEwMF0sDQoJCSJsYXllckJhc2VIZWlnaHRzIiA6IFsyNF0sDQoJCSJyeSIgOiAwLA0KCQkieCIgOiAtOTkxLA0KCQkieiIgOiAzMjQsDQoJCSJwaWVjZUlkIiA6ICJzYXBsaW5nLTA2Ig0KCX0sDQoJew0KCQkiY2Fub3B5TWFqb3JMZW5ndGhzIiA6IFsxMDBdLA0KCQkibGF5ZXJCYXNlSGVpZ2h0cyIgOiBbMjRdLA0KCQkicnkiIDogMCwNCgkJIngiIDogLTEwNDMsDQoJCSJ6IiA6IDE4NCwNCgkJInBpZWNlSWQiIDogInNhcGxpbmctMDciDQoJfSwNCgl7DQoJCSJjYW5vcHlNYWpvckxlbmd0aHMiIDogWzEwMF0sDQoJCSJsYXllckJhc2VIZWlnaHRzIiA6IFsyNF0sDQoJCSJyeSIgOiAwLA0KCQkieCIgOiAtOTU1LA0KCQkieiIgOiA0MywNCgkJInBpZWNlSWQiIDogInNhcGxpbmctMDgiDQoJfSwNCgl7DQoJCSJjYW5vcHlNYWpvckxlbmd0aHMiIDogWzEwMF0sDQoJCSJsYXllckJhc2VIZWlnaHRzIiA6IFsyNF0sDQoJCSJyeSIgOiAwLA0KCQkieCIgOiAtODMzLA0KCQkieiIgOiA2MSwNCgkJInBpZWNlSWQiIDogInNhcGxpbmctOSINCgl9DQpdDQo=";const Se=dat.GUI,z=["twister","fairySnake","demo"];function ye(I){const e=new Se({width:300}),i={pattern:z[0]};e.add(i,"pattern",z).onChange(t=>{I(t)}),I(z[0]),e.add({"About this project":()=>{window.open("https://github.com/OmarShehata/entwined-web","_blank")}},"About this project")}function pe(I){switch(I){case"./patterns/demo.js":return S(()=>import("./demo.6d452f92.js"),["assets/demo.6d452f92.js","assets/PatternBase.74795690.js"]);case"./patterns/fairySnake.js":return S(()=>import("./fairySnake.b8e4d3d8.js"),["assets/fairySnake.b8e4d3d8.js","assets/PatternBase.74795690.js"]);case"./patterns/PatternBase.js":return S(()=>import("./PatternBase.74795690.js"),[]);case"./patterns/twister.js":return S(()=>import("./twister.911a1100.js"),["assets/twister.911a1100.js","assets/PatternBase.74795690.js"]);default:return new Promise(function(e,i){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+I)))})}}me();async function me(){const I=new U(70,window.innerWidth/window.innerHeight,1,1e4);I.position.set(200,200,-500);const e=new P,i=new v({canvas:document.querySelector("canvas"),antialias:!0});i.setSize(window.innerWidth,window.innerHeight),i.setClearColor(4539717,1);const t=new q(16777215,1);e.add(t),t.position.set(1.7,1,-1);const s=new $(4210752);e.add(s);const o=new ee(350,350),n=new ie({color:2236962,side:te}),C=new T(o,n);C.position.set(-350/2,0,350/2),C.rotateX(Math.PI/2),e.add(C);const r=new he(De,Ne,Me),a=await r.load();for(let g of a)e.add(g);let l=await S(()=>import("./twister.911a1100.js"),["assets/twister.911a1100.js","assets/PatternBase.74795690.js"]),J=new l.default(a,r);ye(async g=>{l=await pe(`./patterns/${g}.js`),J=new l.default(a,r)});let u=new se(I,i.domElement),d=new Q;for(let g of a)d.x+=g.position.x,d.y+=g.position.y,d.z+=g.position.z;d.x/=a.length,d.y/=a.length,d.z/=a.length,u.target=d,u.update();let A=0,k=0;function h(g){requestAnimationFrame(h),A=g-k,k=g,J.run(A),i.render(e,I)}requestAnimationFrame(h),document.body.addEventListener("hot-module-reload",g=>{const{newModule:D}=g.detail;if(l.default.name!=D.default.name)return;const N=new D.default(a,r);N.hotReload(J),J=N,l=D});function w(){I.aspect=window.innerWidth/window.innerHeight,I.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",w,!1)}

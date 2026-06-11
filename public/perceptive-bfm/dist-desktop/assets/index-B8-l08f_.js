import vS from"../mujoco_wasm.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const od="170",ss={ROTATE:0,DOLLY:1,PAN:2},es={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},xS=0,yf=1,bS=2,Y0=1,K0=2,yi=3,Fi=0,yn=1,xi=2,zi=0,as=1,vf=2,xf=3,bf=4,wS=5,cr=100,SS=101,MS=102,ES=103,TS=104,AS=200,CS=201,RS=202,IS=203,Qu=204,ec=205,$S=206,PS=207,DS=208,LS=209,NS=210,kS=211,OS=212,US=213,zS=214,tc=0,nc=1,ic=2,cs=3,rc=4,sc=5,ac=6,oc=7,Z0=0,BS=1,FS=2,Bi=0,VS=1,HS=2,GS=3,WS=4,qS=5,jS=6,XS=7,J0=300,ds=301,hs=302,lc=303,uc=304,Vo=306,mr=1e3,gr=1001,cc=1002,En=1003,YS=1004,$a=1005,ri=1006,fl=1007,_r=1008,ai=1009,Q0=1010,ey=1011,ua=1012,ld=1013,br=1014,si=1015,pa=1016,ud=1017,cd=1018,fs=1020,ty=35902,ny=1021,iy=1022,Dn=1023,ry=1024,sy=1025,os=1026,ps=1027,dd=1028,hd=1029,ay=1030,fd=1031,pd=1033,xo=33776,bo=33777,wo=33778,So=33779,dc=35840,hc=35841,fc=35842,pc=35843,mc=36196,gc=37492,_c=37496,yc=37808,vc=37809,xc=37810,bc=37811,wc=37812,Sc=37813,Mc=37814,Ec=37815,Tc=37816,Ac=37817,Cc=37818,Rc=37819,Ic=37820,$c=37821,Mo=36492,Pc=36494,Dc=36495,oy=36283,Lc=36284,Nc=36285,kc=36286,KS=3200,ZS=3201,ly=0,JS=1,Ui="",Pn="srgb",ys="srgb-linear",Ho="linear",Ct="srgb",Lr=7680,wf=519,QS=512,e2=513,t2=514,uy=515,n2=516,i2=517,r2=518,s2=519,Sf=35044,Mf="300 es",wi=2e3,Ro=2001;class Cr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Eo=Math.PI/180,Io=180/Math.PI;function ma(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function qt(n,e,t){return Math.max(e,Math.min(t,n))}function a2(n,e){return(n%e+e)%e}function pl(n,e,t){return(1-t)*n+t*e}function Ds(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function mn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const o2={DEG2RAD:Eo};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e,t,i,r,s,a,o,u,l){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,u,l)}set(e,t,i,r,s,a,o,u,l){const c=this.elements;return c[0]=e,c[1]=r,c[2]=o,c[3]=t,c[4]=s,c[5]=u,c[6]=i,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],u=i[6],l=i[1],c=i[4],d=i[7],h=i[2],f=i[5],m=i[8],y=r[0],_=r[3],p=r[6],x=r[1],w=r[4],b=r[7],I=r[2],R=r[5],T=r[8];return s[0]=a*y+o*x+u*I,s[3]=a*_+o*w+u*R,s[6]=a*p+o*b+u*T,s[1]=l*y+c*x+d*I,s[4]=l*_+c*w+d*R,s[7]=l*p+c*b+d*T,s[2]=h*y+f*x+m*I,s[5]=h*_+f*w+m*R,s[8]=h*p+f*b+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],u=e[6],l=e[7],c=e[8];return t*a*c-t*o*l-i*s*c+i*o*u+r*s*l-r*a*u}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],u=e[6],l=e[7],c=e[8],d=c*a-o*l,h=o*u-c*s,f=l*s-a*u,m=t*d+i*h+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/m;return e[0]=d*y,e[1]=(r*l-c*i)*y,e[2]=(o*i-r*a)*y,e[3]=h*y,e[4]=(c*t-r*u)*y,e[5]=(r*s-o*t)*y,e[6]=f*y,e[7]=(i*u-l*t)*y,e[8]=(a*t-i*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const u=Math.cos(s),l=Math.sin(s);return this.set(i*u,i*l,-i*(u*a+l*o)+a+e,-r*l,r*u,-r*(-l*a+u*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ml.makeScale(e,t)),this}rotate(e){return this.premultiply(ml.makeRotation(-e)),this}translate(e,t){return this.premultiply(ml.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ml=new tt;function cy(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function $o(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function l2(){const n=$o("canvas");return n.style.display="block",n}const Ef={};function Js(n){n in Ef||(Ef[n]=!0,console.warn(n))}function u2(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function c2(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function d2(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const yt={enabled:!0,workingColorSpace:ys,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ct&&(n.r=Si(n.r),n.g=Si(n.g),n.b=Si(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ct&&(n.r=ls(n.r),n.g=ls(n.g),n.b=ls(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ui?Ho:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ls(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Tf=[.64,.33,.3,.6,.15,.06],Af=[.2126,.7152,.0722],Cf=[.3127,.329],Rf=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),If=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);yt.define({[ys]:{primaries:Tf,whitePoint:Cf,transfer:Ho,toXYZ:Rf,fromXYZ:If,luminanceCoefficients:Af,workingColorSpaceConfig:{unpackColorSpace:Pn},outputColorSpaceConfig:{drawingBufferColorSpace:Pn}},[Pn]:{primaries:Tf,whitePoint:Cf,transfer:Ct,toXYZ:Rf,fromXYZ:If,luminanceCoefficients:Af,outputColorSpaceConfig:{drawingBufferColorSpace:Pn}}});let Nr;class h2{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Nr===void 0&&(Nr=$o("canvas")),Nr.width=e.width,Nr.height=e.height;const i=Nr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Nr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=$o("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Si(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Si(t[i]/255)*255):t[i]=Si(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let f2=0;class dy{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:f2++}),this.uuid=ma(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(gl(r[a].image)):s.push(gl(r[a]))}else s=gl(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function gl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?h2.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let p2=0;class fn extends Cr{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,i=gr,r=gr,s=ri,a=_r,o=Dn,u=ai,l=fn.DEFAULT_ANISOTROPY,c=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:p2++}),this.uuid=ma(),this.name="",this.source=new dy(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=u,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==J0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mr:e.x=e.x-Math.floor(e.x);break;case gr:e.x=e.x<0?0:1;break;case cc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mr:e.y=e.y-Math.floor(e.y);break;case gr:e.y=e.y<0?0:1;break;case cc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=J0;fn.DEFAULT_ANISOTROPY=1;class $t{constructor(e=0,t=0,i=0,r=1){$t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const u=e.elements,l=u[0],c=u[4],d=u[8],h=u[1],f=u[5],m=u[9],y=u[2],_=u[6],p=u[10];if(Math.abs(c-h)<.01&&Math.abs(d-y)<.01&&Math.abs(m-_)<.01){if(Math.abs(c+h)<.1&&Math.abs(d+y)<.1&&Math.abs(m+_)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,b=(f+1)/2,I=(p+1)/2,R=(c+h)/4,T=(d+y)/4,S=(m+_)/4;return w>b&&w>I?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=R/i,s=T/i):b>I?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=R/r,s=S/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=T/s,r=S/s),this.set(i,r,s,t),this}let x=Math.sqrt((_-m)*(_-m)+(d-y)*(d-y)+(h-c)*(h-c));return Math.abs(x)<.001&&(x=1),this.x=(_-m)/x,this.y=(d-y)/x,this.z=(h-c)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class m2 extends Cr{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new $t(0,0,e,t),this.scissorTest=!1,this.viewport=new $t(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new fn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new dy(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wr extends m2{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class hy extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=En,this.minFilter=En,this.wrapR=gr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class g2 extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=En,this.minFilter=En,this.wrapR=gr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let u=i[r+0],l=i[r+1],c=i[r+2],d=i[r+3];const h=s[a+0],f=s[a+1],m=s[a+2],y=s[a+3];if(o===0){e[t+0]=u,e[t+1]=l,e[t+2]=c,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=m,e[t+3]=y;return}if(d!==y||u!==h||l!==f||c!==m){let _=1-o;const p=u*h+l*f+c*m+d*y,x=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const I=Math.sqrt(w),R=Math.atan2(I,p*x);_=Math.sin(_*R)/I,o=Math.sin(o*R)/I}const b=o*x;if(u=u*_+h*b,l=l*_+f*b,c=c*_+m*b,d=d*_+y*b,_===1-o){const I=1/Math.sqrt(u*u+l*l+c*c+d*d);u*=I,l*=I,c*=I,d*=I}}e[t]=u,e[t+1]=l,e[t+2]=c,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],u=i[r+1],l=i[r+2],c=i[r+3],d=s[a],h=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+c*d+u*f-l*h,e[t+1]=u*m+c*h+l*d-o*f,e[t+2]=l*m+c*f+o*h-u*d,e[t+3]=c*m-o*d-u*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,u=Math.sin,l=o(i/2),c=o(r/2),d=o(s/2),h=u(i/2),f=u(r/2),m=u(s/2);switch(a){case"XYZ":this._x=h*c*d+l*f*m,this._y=l*f*d-h*c*m,this._z=l*c*m+h*f*d,this._w=l*c*d-h*f*m;break;case"YXZ":this._x=h*c*d+l*f*m,this._y=l*f*d-h*c*m,this._z=l*c*m-h*f*d,this._w=l*c*d+h*f*m;break;case"ZXY":this._x=h*c*d-l*f*m,this._y=l*f*d+h*c*m,this._z=l*c*m+h*f*d,this._w=l*c*d-h*f*m;break;case"ZYX":this._x=h*c*d-l*f*m,this._y=l*f*d+h*c*m,this._z=l*c*m-h*f*d,this._w=l*c*d+h*f*m;break;case"YZX":this._x=h*c*d+l*f*m,this._y=l*f*d+h*c*m,this._z=l*c*m-h*f*d,this._w=l*c*d-h*f*m;break;case"XZY":this._x=h*c*d-l*f*m,this._y=l*f*d-h*c*m,this._z=l*c*m+h*f*d,this._w=l*c*d+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],u=t[9],l=t[2],c=t[6],d=t[10],h=i+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(c-u)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(c-u)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(u+c)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(u+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,u=t._y,l=t._z,c=t._w;return this._x=i*c+a*o+r*l-s*u,this._y=r*c+a*u+s*o-i*l,this._z=s*c+a*l+i*u-r*o,this._w=a*c-i*o-r*u-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const u=1-o*o;if(u<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(u),c=Math.atan2(l,o),d=Math.sin((1-t)*c)/l,h=Math.sin(t*c)/l;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,i=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($f.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($f.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,u=e.w,l=2*(a*r-o*i),c=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+u*l+a*d-o*c,this.y=i+u*c+o*l-s*d,this.z=r+u*d+s*c-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,u=t.z;return this.x=r*u-s*o,this.y=s*a-i*u,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _l.copy(this).projectOnVector(e),this.sub(_l)}reflect(e){return this.sub(_l.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _l=new H,$f=new Sr;class Rr{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,On):On.fromBufferAttribute(s,a),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pa.copy(i.boundingBox)),Pa.applyMatrix4(e.matrixWorld),this.union(Pa)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ls),Da.subVectors(this.max,Ls),kr.subVectors(e.a,Ls),Or.subVectors(e.b,Ls),Ur.subVectors(e.c,Ls),Ci.subVectors(Or,kr),Ri.subVectors(Ur,Or),Ki.subVectors(kr,Ur);let t=[0,-Ci.z,Ci.y,0,-Ri.z,Ri.y,0,-Ki.z,Ki.y,Ci.z,0,-Ci.x,Ri.z,0,-Ri.x,Ki.z,0,-Ki.x,-Ci.y,Ci.x,0,-Ri.y,Ri.x,0,-Ki.y,Ki.x,0];return!yl(t,kr,Or,Ur,Da)||(t=[1,0,0,0,1,0,0,0,1],!yl(t,kr,Or,Ur,Da))?!1:(La.crossVectors(Ci,Ri),t=[La.x,La.y,La.z],yl(t,kr,Or,Ur,Da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const di=[new H,new H,new H,new H,new H,new H,new H,new H],On=new H,Pa=new Rr,kr=new H,Or=new H,Ur=new H,Ci=new H,Ri=new H,Ki=new H,Ls=new H,Da=new H,La=new H,Zi=new H;function yl(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Zi.fromArray(n,s);const o=r.x*Math.abs(Zi.x)+r.y*Math.abs(Zi.y)+r.z*Math.abs(Zi.z),u=e.dot(Zi),l=t.dot(Zi),c=i.dot(Zi);if(Math.max(-Math.max(u,l,c),Math.min(u,l,c))>o)return!1}return!0}const _2=new Rr,Ns=new H,vl=new H;class ga{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):_2.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ns.subVectors(e,this.center);const t=Ns.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ns,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ns.copy(e.center).add(vl)),this.expandByPoint(Ns.copy(e.center).sub(vl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hi=new H,xl=new H,Na=new H,Ii=new H,bl=new H,ka=new H,wl=new H;class fy{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){xl.copy(e).add(t).multiplyScalar(.5),Na.copy(t).sub(e).normalize(),Ii.copy(this.origin).sub(xl);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Na),o=Ii.dot(this.direction),u=-Ii.dot(Na),l=Ii.lengthSq(),c=Math.abs(1-a*a);let d,h,f,m;if(c>0)if(d=a*u-o,h=a*o-u,m=s*c,d>=0)if(h>=-m)if(h<=m){const y=1/c;d*=y,h*=y,f=d*(d+a*h+2*o)+h*(a*d+h+2*u)+l}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*u)+l;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*u)+l;else h<=-m?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-u),s),f=-d*d+h*(h+2*u)+l):h<=m?(d=0,h=Math.min(Math.max(-s,-u),s),f=h*(h+2*u)+l):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-u),s),f=-d*d+h*(h+2*u)+l);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*u)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(xl).addScaledVector(Na,h),f}intersectSphere(e,t){hi.subVectors(e.center,this.origin);const i=hi.dot(this.direction),r=hi.dot(hi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,u=i+a;return u<0?null:o<0?this.at(u,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,u;const l=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),c>=0?(s=(e.min.y-h.y)*c,a=(e.max.y-h.y)*c):(s=(e.max.y-h.y)*c,a=(e.min.y-h.y)*c),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,u=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,u=(e.min.z-h.z)*d),i>u||o>r)||((o>i||i!==i)&&(i=o),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,i,r,s){bl.subVectors(t,e),ka.subVectors(i,e),wl.crossVectors(bl,ka);let a=this.direction.dot(wl),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ii.subVectors(this.origin,e);const u=o*this.direction.dot(ka.crossVectors(Ii,ka));if(u<0)return null;const l=o*this.direction.dot(bl.cross(Ii));if(l<0||u+l>a)return null;const c=-o*Ii.dot(wl);return c<0?null:this.at(c/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt{constructor(e,t,i,r,s,a,o,u,l,c,d,h,f,m,y,_){kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,u,l,c,d,h,f,m,y,_)}set(e,t,i,r,s,a,o,u,l,c,d,h,f,m,y,_){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=u,p[2]=l,p[6]=c,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=y,p[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/zr.setFromMatrixColumn(e,0).length(),s=1/zr.setFromMatrixColumn(e,1).length(),a=1/zr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),u=Math.cos(r),l=Math.sin(r),c=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*c,f=a*d,m=o*c,y=o*d;t[0]=u*c,t[4]=-u*d,t[8]=l,t[1]=f+m*l,t[5]=h-y*l,t[9]=-o*u,t[2]=y-h*l,t[6]=m+f*l,t[10]=a*u}else if(e.order==="YXZ"){const h=u*c,f=u*d,m=l*c,y=l*d;t[0]=h+y*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*c,t[9]=-o,t[2]=f*o-m,t[6]=y+h*o,t[10]=a*u}else if(e.order==="ZXY"){const h=u*c,f=u*d,m=l*c,y=l*d;t[0]=h-y*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*c,t[9]=y-h*o,t[2]=-a*l,t[6]=o,t[10]=a*u}else if(e.order==="ZYX"){const h=a*c,f=a*d,m=o*c,y=o*d;t[0]=u*c,t[4]=m*l-f,t[8]=h*l+y,t[1]=u*d,t[5]=y*l+h,t[9]=f*l-m,t[2]=-l,t[6]=o*u,t[10]=a*u}else if(e.order==="YZX"){const h=a*u,f=a*l,m=o*u,y=o*l;t[0]=u*c,t[4]=y-h*d,t[8]=m*d+f,t[1]=d,t[5]=a*c,t[9]=-o*c,t[2]=-l*c,t[6]=f*d+m,t[10]=h-y*d}else if(e.order==="XZY"){const h=a*u,f=a*l,m=o*u,y=o*l;t[0]=u*c,t[4]=-d,t[8]=l*c,t[1]=h*d+y,t[5]=a*c,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*c,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(y2,e,v2)}lookAt(e,t,i){const r=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),$i.crossVectors(i,xn),$i.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),$i.crossVectors(i,xn)),$i.normalize(),Oa.crossVectors(xn,$i),r[0]=$i.x,r[4]=Oa.x,r[8]=xn.x,r[1]=$i.y,r[5]=Oa.y,r[9]=xn.y,r[2]=$i.z,r[6]=Oa.z,r[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],u=i[8],l=i[12],c=i[1],d=i[5],h=i[9],f=i[13],m=i[2],y=i[6],_=i[10],p=i[14],x=i[3],w=i[7],b=i[11],I=i[15],R=r[0],T=r[4],S=r[8],C=r[12],A=r[1],L=r[5],F=r[9],B=r[13],N=r[2],U=r[6],z=r[10],K=r[14],W=r[3],ie=r[7],oe=r[11],Z=r[15];return s[0]=a*R+o*A+u*N+l*W,s[4]=a*T+o*L+u*U+l*ie,s[8]=a*S+o*F+u*z+l*oe,s[12]=a*C+o*B+u*K+l*Z,s[1]=c*R+d*A+h*N+f*W,s[5]=c*T+d*L+h*U+f*ie,s[9]=c*S+d*F+h*z+f*oe,s[13]=c*C+d*B+h*K+f*Z,s[2]=m*R+y*A+_*N+p*W,s[6]=m*T+y*L+_*U+p*ie,s[10]=m*S+y*F+_*z+p*oe,s[14]=m*C+y*B+_*K+p*Z,s[3]=x*R+w*A+b*N+I*W,s[7]=x*T+w*L+b*U+I*ie,s[11]=x*S+w*F+b*z+I*oe,s[15]=x*C+w*B+b*K+I*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],u=e[9],l=e[13],c=e[2],d=e[6],h=e[10],f=e[14],m=e[3],y=e[7],_=e[11],p=e[15];return m*(+s*u*d-r*l*d-s*o*h+i*l*h+r*o*f-i*u*f)+y*(+t*u*f-t*l*h+s*a*h-r*a*f+r*l*c-s*u*c)+_*(+t*l*d-t*o*f-s*a*d+i*a*f+s*o*c-i*l*c)+p*(-r*o*c-t*u*d+t*o*h+r*a*d-i*a*h+i*u*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],u=e[6],l=e[7],c=e[8],d=e[9],h=e[10],f=e[11],m=e[12],y=e[13],_=e[14],p=e[15],x=d*_*l-y*h*l+y*u*f-o*_*f-d*u*p+o*h*p,w=m*h*l-c*_*l-m*u*f+a*_*f+c*u*p-a*h*p,b=c*y*l-m*d*l+m*o*f-a*y*f-c*o*p+a*d*p,I=m*d*u-c*y*u-m*o*h+a*y*h+c*o*_-a*d*_,R=t*x+i*w+r*b+s*I;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return e[0]=x*T,e[1]=(y*h*s-d*_*s-y*r*f+i*_*f+d*r*p-i*h*p)*T,e[2]=(o*_*s-y*u*s+y*r*l-i*_*l-o*r*p+i*u*p)*T,e[3]=(d*u*s-o*h*s-d*r*l+i*h*l+o*r*f-i*u*f)*T,e[4]=w*T,e[5]=(c*_*s-m*h*s+m*r*f-t*_*f-c*r*p+t*h*p)*T,e[6]=(m*u*s-a*_*s-m*r*l+t*_*l+a*r*p-t*u*p)*T,e[7]=(a*h*s-c*u*s+c*r*l-t*h*l-a*r*f+t*u*f)*T,e[8]=b*T,e[9]=(m*d*s-c*y*s-m*i*f+t*y*f+c*i*p-t*d*p)*T,e[10]=(a*y*s-m*o*s+m*i*l-t*y*l-a*i*p+t*o*p)*T,e[11]=(c*o*s-a*d*s-c*i*l+t*d*l+a*i*f-t*o*f)*T,e[12]=I*T,e[13]=(c*y*r-m*d*r+m*i*h-t*y*h-c*i*_+t*d*_)*T,e[14]=(m*o*r-a*y*r-m*i*u+t*y*u+a*i*_-t*o*_)*T,e[15]=(a*d*r-c*o*r+c*i*u-t*d*u-a*i*h+t*o*h)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,u=e.z,l=s*a,c=s*o;return this.set(l*a+i,l*o-r*u,l*u+r*o,0,l*o+r*u,c*o+i,c*u-r*a,0,l*u-r*o,c*u+r*a,s*u*u+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,u=t._w,l=s+s,c=a+a,d=o+o,h=s*l,f=s*c,m=s*d,y=a*c,_=a*d,p=o*d,x=u*l,w=u*c,b=u*d,I=i.x,R=i.y,T=i.z;return r[0]=(1-(y+p))*I,r[1]=(f+b)*I,r[2]=(m-w)*I,r[3]=0,r[4]=(f-b)*R,r[5]=(1-(h+p))*R,r[6]=(_+x)*R,r[7]=0,r[8]=(m+w)*T,r[9]=(_-x)*T,r[10]=(1-(h+y))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=zr.set(r[0],r[1],r[2]).length();const a=zr.set(r[4],r[5],r[6]).length(),o=zr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Un.copy(this);const l=1/s,c=1/a,d=1/o;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=c,Un.elements[5]*=c,Un.elements[6]*=c,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,t.setFromRotationMatrix(Un),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=wi){const u=this.elements,l=2*s/(t-e),c=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let f,m;if(o===wi)f=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(o===Ro)f=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return u[0]=l,u[4]=0,u[8]=d,u[12]=0,u[1]=0,u[5]=c,u[9]=h,u[13]=0,u[2]=0,u[6]=0,u[10]=f,u[14]=m,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=wi){const u=this.elements,l=1/(t-e),c=1/(i-r),d=1/(a-s),h=(t+e)*l,f=(i+r)*c;let m,y;if(o===wi)m=(a+s)*d,y=-2*d;else if(o===Ro)m=s*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return u[0]=2*l,u[4]=0,u[8]=0,u[12]=-h,u[1]=0,u[5]=2*c,u[9]=0,u[13]=-f,u[2]=0,u[6]=0,u[10]=y,u[14]=-m,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const zr=new H,Un=new kt,y2=new H(0,0,0),v2=new H(1,1,1),$i=new H,Oa=new H,xn=new H,Pf=new kt,Df=new Sr;class oi{constructor(e=0,t=0,i=0,r=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],u=r[1],l=r[5],c=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(u,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Pf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Df.setFromEuler(this),this.setFromQuaternion(Df,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class py{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let x2=0;const Lf=new H,Br=new Sr,fi=new kt,Ua=new H,ks=new H,b2=new H,w2=new Sr,Nf=new H(1,0,0),kf=new H(0,1,0),Of=new H(0,0,1),Uf={type:"added"},S2={type:"removed"},Fr={type:"childadded",child:null},Sl={type:"childremoved",child:null};class Ht extends Cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:x2++}),this.uuid=ma(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ht.DEFAULT_UP.clone();const e=new H,t=new oi,i=new Sr,r=new H(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new kt},normalMatrix:{value:new tt}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=Ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new py,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Br.setFromAxisAngle(e,t),this.quaternion.multiply(Br),this}rotateOnWorldAxis(e,t){return Br.setFromAxisAngle(e,t),this.quaternion.premultiply(Br),this}rotateX(e){return this.rotateOnAxis(Nf,e)}rotateY(e){return this.rotateOnAxis(kf,e)}rotateZ(e){return this.rotateOnAxis(Of,e)}translateOnAxis(e,t){return Lf.copy(e).applyQuaternion(this.quaternion),this.position.add(Lf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nf,e)}translateY(e){return this.translateOnAxis(kf,e)}translateZ(e){return this.translateOnAxis(Of,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ua.copy(e):Ua.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(ks,Ua,this.up):fi.lookAt(Ua,ks,this.up),this.quaternion.setFromRotationMatrix(fi),r&&(fi.extractRotation(r.matrixWorld),Br.setFromRotationMatrix(fi),this.quaternion.premultiply(Br.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uf),Fr.child=e,this.dispatchEvent(Fr),Fr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(S2),Sl.child=e,this.dispatchEvent(Sl),Sl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uf),Fr.child=e,this.dispatchEvent(Fr),Fr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,b2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,w2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,u){return o[u.uuid]===void 0&&(o[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const u=o.shapes;if(Array.isArray(u))for(let l=0,c=u.length;l<c;l++){const d=u[l];s(e.shapes,d)}else s(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let u=0,l=this.material.length;u<l;u++)o.push(s(e.materials,this.material[u]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const u=this.animations[o];r.animations.push(s(e.animations,u))}}if(t){const o=a(e.geometries),u=a(e.materials),l=a(e.textures),c=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),u.length>0&&(i.materials=u),l.length>0&&(i.textures=l),c.length>0&&(i.images=c),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const u=[];for(const l in o){const c=o[l];delete c.metadata,u.push(c)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ht.DEFAULT_UP=new H(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new H,pi=new H,Ml=new H,mi=new H,Vr=new H,Hr=new H,zf=new H,El=new H,Tl=new H,Al=new H,Cl=new $t,Rl=new $t,Il=new $t;class qn{constructor(e=new H,t=new H,i=new H){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),zn.subVectors(e,t),r.cross(zn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){zn.subVectors(r,t),pi.subVectors(i,t),Ml.subVectors(e,t);const a=zn.dot(zn),o=zn.dot(pi),u=zn.dot(Ml),l=pi.dot(pi),c=pi.dot(Ml),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(l*u-o*c)*h,m=(a*c-o*u)*h;return s.set(1-f-m,m,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,i,r,s,a,o,u){return this.getBarycoord(e,t,i,r,mi)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,mi.x),u.addScaledVector(a,mi.y),u.addScaledVector(o,mi.z),u)}static getInterpolatedAttribute(e,t,i,r,s,a){return Cl.setScalar(0),Rl.setScalar(0),Il.setScalar(0),Cl.fromBufferAttribute(e,t),Rl.fromBufferAttribute(e,i),Il.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Cl,s.x),a.addScaledVector(Rl,s.y),a.addScaledVector(Il,s.z),a}static isFrontFacing(e,t,i,r){return zn.subVectors(i,t),pi.subVectors(e,t),zn.cross(pi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),zn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return qn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return qn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Vr.subVectors(r,i),Hr.subVectors(s,i),El.subVectors(e,i);const u=Vr.dot(El),l=Hr.dot(El);if(u<=0&&l<=0)return t.copy(i);Tl.subVectors(e,r);const c=Vr.dot(Tl),d=Hr.dot(Tl);if(c>=0&&d<=c)return t.copy(r);const h=u*d-c*l;if(h<=0&&u>=0&&c<=0)return a=u/(u-c),t.copy(i).addScaledVector(Vr,a);Al.subVectors(e,s);const f=Vr.dot(Al),m=Hr.dot(Al);if(m>=0&&f<=m)return t.copy(s);const y=f*l-u*m;if(y<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(i).addScaledVector(Hr,o);const _=c*m-f*d;if(_<=0&&d-c>=0&&f-m>=0)return zf.subVectors(s,r),o=(d-c)/(d-c+(f-m)),t.copy(r).addScaledVector(zf,o);const p=1/(_+y+h);return a=y*p,o=h*p,t.copy(i).addScaledVector(Vr,a).addScaledVector(Hr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const my={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},za={h:0,s:0,l:0};function $l(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=yt.workingColorSpace){return this.r=e,this.g=t,this.b=i,yt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=yt.workingColorSpace){if(e=a2(e,1),t=qt(t,0,1),i=qt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=$l(a,s,e+1/3),this.g=$l(a,s,e),this.b=$l(a,s,e-1/3)}return yt.toWorkingColorSpace(this,r),this}setStyle(e,t=Pn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pn){const i=my[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pn){return yt.fromWorkingColorSpace(on.copy(this),e),Math.round(qt(on.r*255,0,255))*65536+Math.round(qt(on.g*255,0,255))*256+Math.round(qt(on.b*255,0,255))}getHexString(e=Pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.fromWorkingColorSpace(on.copy(this),t);const i=on.r,r=on.g,s=on.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let u,l;const c=(o+a)/2;if(o===a)u=0,l=0;else{const d=a-o;switch(l=c<=.5?d/(a+o):d/(2-a-o),a){case i:u=(r-s)/d+(r<s?6:0);break;case r:u=(s-i)/d+2;break;case s:u=(i-r)/d+4;break}u/=6}return e.h=u,e.s=l,e.l=c,e}getRGB(e,t=yt.workingColorSpace){return yt.fromWorkingColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Pn){yt.fromWorkingColorSpace(on.copy(this),e);const t=on.r,i=on.g,r=on.b;return e!==Pn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(za);const i=pl(Pi.h,za.h,t),r=pl(Pi.s,za.s,t),s=pl(Pi.l,za.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new ot;ot.NAMES=my;let M2=0;class _a extends Cr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:M2++}),this.uuid=ma(),this.name="",this.blending=as,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qu,this.blendDst=ec,this.blendEquation=cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Lr,this.stencilZFail=Lr,this.stencilZPass=Lr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==as&&(i.blending=this.blending),this.side!==Fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qu&&(i.blendSrc=this.blendSrc),this.blendDst!==ec&&(i.blendDst=this.blendDst),this.blendEquation!==cr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Lr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Lr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Lr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const u=s[o];delete u.metadata,a.push(u)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class md extends _a{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Z0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vt=new H,Ba=new Ee;class vn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Sf,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ds(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=mn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ds(t,this.array)),t}setX(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ds(t,this.array)),t}setY(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ds(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ds(t,this.array)),t}setW(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),i=mn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),i=mn(i,this.array),r=mn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),i=mn(i,this.array),r=mn(r,this.array),s=mn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sf&&(e.usage=this.usage),e}}class gy extends vn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class _y extends vn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class cn extends vn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let E2=0;const In=new kt,Pl=new Ht,Gr=new H,bn=new Rr,Os=new Rr,Kt=new H;class Xn extends Cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:E2++}),this.uuid=ma(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cy(e)?_y:gy)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new tt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,i){return In.makeTranslation(e,t,i),this.applyMatrix4(In),this}scale(e,t,i){return In.makeScale(e,t,i),this.applyMatrix4(In),this}lookAt(e){return Pl.lookAt(e),Pl.updateMatrix(),this.applyMatrix4(Pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gr).negate(),this.translate(Gr.x,Gr.y,Gr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new cn(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];bn.setFromBufferAttribute(s),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ga);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Os.setFromBufferAttribute(o),this.morphTargetsRelative?(Kt.addVectors(bn.min,Os.min),bn.expandByPoint(Kt),Kt.addVectors(bn.max,Os.max),bn.expandByPoint(Kt)):(bn.expandByPoint(Os.min),bn.expandByPoint(Os.max))}bn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Kt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],u=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)Kt.fromBufferAttribute(o,l),u&&(Gr.fromBufferAttribute(e,l),Kt.add(Gr)),r=Math.max(r,i.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],u=[];for(let S=0;S<i.count;S++)o[S]=new H,u[S]=new H;const l=new H,c=new H,d=new H,h=new Ee,f=new Ee,m=new Ee,y=new H,_=new H;function p(S,C,A){l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,C),d.fromBufferAttribute(i,A),h.fromBufferAttribute(s,S),f.fromBufferAttribute(s,C),m.fromBufferAttribute(s,A),c.sub(l),d.sub(l),f.sub(h),m.sub(h);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(y.copy(c).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(L),_.copy(d).multiplyScalar(f.x).addScaledVector(c,-m.x).multiplyScalar(L),o[S].add(y),o[C].add(y),o[A].add(y),u[S].add(_),u[C].add(_),u[A].add(_))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let S=0,C=x.length;S<C;++S){const A=x[S],L=A.start,F=A.count;for(let B=L,N=L+F;B<N;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const w=new H,b=new H,I=new H,R=new H;function T(S){I.fromBufferAttribute(r,S),R.copy(I);const C=o[S];w.copy(C),w.sub(I.multiplyScalar(I.dot(C))).normalize(),b.crossVectors(R,C);const L=b.dot(u[S])<0?-1:1;a.setXYZW(S,w.x,w.y,w.z,L)}for(let S=0,C=x.length;S<C;++S){const A=x[S],L=A.start,F=A.count;for(let B=L,N=L+F;B<N;B+=3)T(e.getX(B+0)),T(e.getX(B+1)),T(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new vn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const r=new H,s=new H,a=new H,o=new H,u=new H,l=new H,c=new H,d=new H;if(e)for(let h=0,f=e.count;h<f;h+=3){const m=e.getX(h+0),y=e.getX(h+1),_=e.getX(h+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,_),c.subVectors(a,s),d.subVectors(r,s),c.cross(d),o.fromBufferAttribute(i,m),u.fromBufferAttribute(i,y),l.fromBufferAttribute(i,_),o.add(c),u.add(c),l.add(c),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(y,u.x,u.y,u.z),i.setXYZ(_,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),c.subVectors(a,s),d.subVectors(r,s),c.cross(d),i.setXYZ(h+0,c.x,c.y,c.z),i.setXYZ(h+1,c.x,c.y,c.z),i.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(o,u){const l=o.array,c=o.itemSize,d=o.normalized,h=new l.constructor(u.length*c);let f=0,m=0;for(let y=0,_=u.length;y<_;y++){o.isInterleavedBufferAttribute?f=u[y]*o.data.stride+o.offset:f=u[y]*c;for(let p=0;p<c;p++)h[m++]=l[f++]}return new vn(h,c,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xn,i=this.index.array,r=this.attributes;for(const o in r){const u=r[o],l=e(u,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const u=[],l=s[o];for(let c=0,d=l.length;c<d;c++){const h=l[c],f=e(h,i);u.push(f)}t.morphAttributes[o]=u}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,u=a.length;o<u;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const l in u)u[l]!==void 0&&(e[l]=u[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const u in i){const l=i[u];e.data.attributes[u]=l.toJSON(e.data)}const r={};let s=!1;for(const u in this.morphAttributes){const l=this.morphAttributes[u],c=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];c.push(f.toJSON(e.data))}c.length>0&&(r[u]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const c=r[l];this.setAttribute(l,c.clone(t))}const s=e.morphAttributes;for(const l in s){const c=[],d=s[l];for(let h=0,f=d.length;h<f;h++)c.push(d[h].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,c=a.length;l<c;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bf=new kt,Ji=new fy,Fa=new ga,Ff=new H,Va=new H,Ha=new H,Ga=new H,Dl=new H,Wa=new H,Vf=new H,qa=new H;class Mn extends Ht{constructor(e=new Xn,t=new md){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Wa.set(0,0,0);for(let u=0,l=s.length;u<l;u++){const c=o[u],d=s[u];c!==0&&(Dl.fromBufferAttribute(d,e),a?Wa.addScaledVector(Dl,c):Wa.addScaledVector(Dl.sub(t),c))}t.add(Wa)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fa.copy(i.boundingSphere),Fa.applyMatrix4(s),Ji.copy(e.ray).recast(e.near),!(Fa.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(Fa,Ff)===null||Ji.origin.distanceToSquared(Ff)>(e.far-e.near)**2))&&(Bf.copy(s).invert(),Ji.copy(e.ray).applyMatrix4(Bf),!(i.boundingBox!==null&&Ji.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ji)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,u=s.attributes.position,l=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=h.length;m<y;m++){const _=h[m],p=a[_.materialIndex],x=Math.max(_.start,f.start),w=Math.min(o.count,Math.min(_.start+_.count,f.start+f.count));for(let b=x,I=w;b<I;b+=3){const R=o.getX(b),T=o.getX(b+1),S=o.getX(b+2);r=ja(this,p,e,i,l,c,d,R,T,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let _=m,p=y;_<p;_+=3){const x=o.getX(_),w=o.getX(_+1),b=o.getX(_+2);r=ja(this,a,e,i,l,c,d,x,w,b),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(a))for(let m=0,y=h.length;m<y;m++){const _=h[m],p=a[_.materialIndex],x=Math.max(_.start,f.start),w=Math.min(u.count,Math.min(_.start+_.count,f.start+f.count));for(let b=x,I=w;b<I;b+=3){const R=b,T=b+1,S=b+2;r=ja(this,p,e,i,l,c,d,R,T,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const m=Math.max(0,f.start),y=Math.min(u.count,f.start+f.count);for(let _=m,p=y;_<p;_+=3){const x=_,w=_+1,b=_+2;r=ja(this,a,e,i,l,c,d,x,w,b),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function T2(n,e,t,i,r,s,a,o){let u;if(e.side===yn?u=i.intersectTriangle(a,s,r,!0,o):u=i.intersectTriangle(r,s,a,e.side===Fi,o),u===null)return null;qa.copy(o),qa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(qa);return l<t.near||l>t.far?null:{distance:l,point:qa.clone(),object:n}}function ja(n,e,t,i,r,s,a,o,u,l){n.getVertexPosition(o,Va),n.getVertexPosition(u,Ha),n.getVertexPosition(l,Ga);const c=T2(n,e,t,i,Va,Ha,Ga,Vf);if(c){const d=new H;qn.getBarycoord(Vf,Va,Ha,Ga,d),r&&(c.uv=qn.getInterpolatedAttribute(r,o,u,l,d,new Ee)),s&&(c.uv1=qn.getInterpolatedAttribute(s,o,u,l,d,new Ee)),a&&(c.normal=qn.getInterpolatedAttribute(a,o,u,l,d,new H),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const h={a:o,b:u,c:l,normal:new H,materialIndex:0};qn.getNormal(Va,Ha,Ga,h.normal),c.face=h,c.barycoord=d}return c}class vs extends Xn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const u=[],l=[],c=[],d=[];let h=0,f=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(u),this.setAttribute("position",new cn(l,3)),this.setAttribute("normal",new cn(c,3)),this.setAttribute("uv",new cn(d,2));function m(y,_,p,x,w,b,I,R,T,S,C){const A=b/T,L=I/S,F=b/2,B=I/2,N=R/2,U=T+1,z=S+1;let K=0,W=0;const ie=new H;for(let oe=0;oe<z;oe++){const Z=oe*L-B;for(let he=0;he<U;he++){const me=he*A-F;ie[y]=me*x,ie[_]=Z*w,ie[p]=N,l.push(ie.x,ie.y,ie.z),ie[y]=0,ie[_]=0,ie[p]=R>0?1:-1,c.push(ie.x,ie.y,ie.z),d.push(he/T),d.push(1-oe/S),K+=1}}for(let oe=0;oe<S;oe++)for(let Z=0;Z<T;Z++){const he=h+Z+U*oe,me=h+Z+U*(oe+1),G=h+(Z+1)+U*(oe+1),ue=h+(Z+1)+U*oe;u.push(he,me,ue),u.push(me,G,ue),W+=6}o.addGroup(f,W,C),f+=W,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ms(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function hn(n){const e={};for(let t=0;t<n.length;t++){const i=ms(n[t]);for(const r in i)e[r]=i[r]}return e}function A2(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yy(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:yt.workingColorSpace}const C2={clone:ms,merge:hn};var R2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,I2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vi extends _a{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=R2,this.fragmentShader=I2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=A2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class vy extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=wi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Di=new H,Hf=new Ee,Gf=new Ee;class _n extends vy{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Io*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Eo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Io*2*Math.atan(Math.tan(Eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Di.x,Di.y).multiplyScalar(-e/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Di.x,Di.y).multiplyScalar(-e/Di.z)}getViewSize(e,t){return this.getViewBounds(e,Hf,Gf),t.subVectors(Gf,Hf)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Eo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const u=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/u,t-=a.offsetY*i/l,r*=a.width/u,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wr=-90,qr=1;class $2 extends Ht{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new _n(Wr,qr,e,t);r.layers=this.layers,this.add(r);const s=new _n(Wr,qr,e,t);s.layers=this.layers,this.add(s);const a=new _n(Wr,qr,e,t);a.layers=this.layers,this.add(a);const o=new _n(Wr,qr,e,t);o.layers=this.layers,this.add(o);const u=new _n(Wr,qr,e,t);u.layers=this.layers,this.add(u);const l=new _n(Wr,qr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,u]=t;for(const l of t)this.remove(l);if(e===wi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===Ro)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,u,l,c]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,u),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(t,c),e.setRenderTarget(d,h,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class xy extends fn{constructor(e,t,i,r,s,a,o,u,l,c){e=e!==void 0?e:[],t=t!==void 0?t:ds,super(e,t,i,r,s,a,o,u,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class P2 extends wr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new xy(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ri}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new vs(5,5,5),s=new Vi({name:"CubemapFromEquirect",uniforms:ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:yn,blending:zi});s.uniforms.tEquirect.value=t;const a=new Mn(r,s),o=t.minFilter;return t.minFilter===_r&&(t.minFilter=ri),new $2(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Ll=new H,D2=new H,L2=new tt;class Oi{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ll.subVectors(i,t).cross(D2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ll),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||L2.getNormalMatrix(e),r=this.coplanarPoint(Ll).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qi=new ga,Xa=new H;class gd{constructor(e=new Oi,t=new Oi,i=new Oi,r=new Oi,s=new Oi,a=new Oi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],u=r[3],l=r[4],c=r[5],d=r[6],h=r[7],f=r[8],m=r[9],y=r[10],_=r[11],p=r[12],x=r[13],w=r[14],b=r[15];if(i[0].setComponents(u-s,h-l,_-f,b-p).normalize(),i[1].setComponents(u+s,h+l,_+f,b+p).normalize(),i[2].setComponents(u+a,h+c,_+m,b+x).normalize(),i[3].setComponents(u-a,h-c,_-m,b-x).normalize(),i[4].setComponents(u-o,h-d,_-y,b-w).normalize(),t===wi)i[5].setComponents(u+o,h+d,_+y,b+w).normalize();else if(t===Ro)i[5].setComponents(o,d,y,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(e){return Qi.center.set(0,0,0),Qi.radius=.7071067811865476,Qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Xa.x=r.normal.x>0?e.max.x:e.min.x,Xa.y=r.normal.y>0?e.max.y:e.min.y,Xa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function by(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function N2(n){const e=new WeakMap;function t(o,u){const l=o.array,c=o.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(u,h),n.bufferData(u,l,c),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,u,l){const c=u.array,d=u.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,c);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){const m=d[h],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++h,d[h]=y)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){const y=d[f];n.bufferSubData(l,y.start*c.BYTES_PER_ELEMENT,c,y.start,y.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const u=e.get(o);u&&(n.deleteBuffer(u.buffer),e.delete(o))}function a(o,u){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,u));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,u),l.version=o.version}}return{get:r,remove:s,update:a}}class ya extends Xn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),u=Math.floor(r),l=o+1,c=u+1,d=e/o,h=t/u,f=[],m=[],y=[],_=[];for(let p=0;p<c;p++){const x=p*h-a;for(let w=0;w<l;w++){const b=w*d-s;m.push(b,-x,0),y.push(0,0,1),_.push(w/o),_.push(1-p/u)}}for(let p=0;p<u;p++)for(let x=0;x<o;x++){const w=x+l*p,b=x+l*(p+1),I=x+1+l*(p+1),R=x+1+l*p;f.push(w,b,R),f.push(b,I,R)}this.setIndex(f),this.setAttribute("position",new cn(m,3)),this.setAttribute("normal",new cn(y,3)),this.setAttribute("uv",new cn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ya(e.width,e.height,e.widthSegments,e.heightSegments)}}var k2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,O2=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,U2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,z2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,F2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,V2=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,H2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G2=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,W2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,q2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,j2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,X2=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Y2=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,K2=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Z2=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,J2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Q2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,iM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,aM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,oM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hM="gl_FragColor = linearToOutputTexel( gl_FragColor );",fM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,mM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_M=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,SM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,MM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,EM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,AM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,CM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,RM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,IM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$M=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,DM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,LM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,NM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,OM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,UM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,VM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,HM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,GM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,WM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,XM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,YM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,KM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,JM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,eE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,aE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,oE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,dE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_E=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,SE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ME=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,EE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,AE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,CE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,RE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,IE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$E=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,DE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,LE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const NE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,VE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,HE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,GE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,WE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,XE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,KE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,iT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,aT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:k2,alphahash_pars_fragment:O2,alphamap_fragment:U2,alphamap_pars_fragment:z2,alphatest_fragment:B2,alphatest_pars_fragment:F2,aomap_fragment:V2,aomap_pars_fragment:H2,batching_pars_vertex:G2,batching_vertex:W2,begin_vertex:q2,beginnormal_vertex:j2,bsdfs:X2,iridescence_fragment:Y2,bumpmap_pars_fragment:K2,clipping_planes_fragment:Z2,clipping_planes_pars_fragment:J2,clipping_planes_pars_vertex:Q2,clipping_planes_vertex:eM,color_fragment:tM,color_pars_fragment:nM,color_pars_vertex:iM,color_vertex:rM,common:sM,cube_uv_reflection_fragment:aM,defaultnormal_vertex:oM,displacementmap_pars_vertex:lM,displacementmap_vertex:uM,emissivemap_fragment:cM,emissivemap_pars_fragment:dM,colorspace_fragment:hM,colorspace_pars_fragment:fM,envmap_fragment:pM,envmap_common_pars_fragment:mM,envmap_pars_fragment:gM,envmap_pars_vertex:_M,envmap_physical_pars_fragment:CM,envmap_vertex:yM,fog_vertex:vM,fog_pars_vertex:xM,fog_fragment:bM,fog_pars_fragment:wM,gradientmap_pars_fragment:SM,lightmap_pars_fragment:MM,lights_lambert_fragment:EM,lights_lambert_pars_fragment:TM,lights_pars_begin:AM,lights_toon_fragment:RM,lights_toon_pars_fragment:IM,lights_phong_fragment:$M,lights_phong_pars_fragment:PM,lights_physical_fragment:DM,lights_physical_pars_fragment:LM,lights_fragment_begin:NM,lights_fragment_maps:kM,lights_fragment_end:OM,logdepthbuf_fragment:UM,logdepthbuf_pars_fragment:zM,logdepthbuf_pars_vertex:BM,logdepthbuf_vertex:FM,map_fragment:VM,map_pars_fragment:HM,map_particle_fragment:GM,map_particle_pars_fragment:WM,metalnessmap_fragment:qM,metalnessmap_pars_fragment:jM,morphinstance_vertex:XM,morphcolor_vertex:YM,morphnormal_vertex:KM,morphtarget_pars_vertex:ZM,morphtarget_vertex:JM,normal_fragment_begin:QM,normal_fragment_maps:eE,normal_pars_fragment:tE,normal_pars_vertex:nE,normal_vertex:iE,normalmap_pars_fragment:rE,clearcoat_normal_fragment_begin:sE,clearcoat_normal_fragment_maps:aE,clearcoat_pars_fragment:oE,iridescence_pars_fragment:lE,opaque_fragment:uE,packing:cE,premultiplied_alpha_fragment:dE,project_vertex:hE,dithering_fragment:fE,dithering_pars_fragment:pE,roughnessmap_fragment:mE,roughnessmap_pars_fragment:gE,shadowmap_pars_fragment:_E,shadowmap_pars_vertex:yE,shadowmap_vertex:vE,shadowmask_pars_fragment:xE,skinbase_vertex:bE,skinning_pars_vertex:wE,skinning_vertex:SE,skinnormal_vertex:ME,specularmap_fragment:EE,specularmap_pars_fragment:TE,tonemapping_fragment:AE,tonemapping_pars_fragment:CE,transmission_fragment:RE,transmission_pars_fragment:IE,uv_pars_fragment:$E,uv_pars_vertex:PE,uv_vertex:DE,worldpos_vertex:LE,background_vert:NE,background_frag:kE,backgroundCube_vert:OE,backgroundCube_frag:UE,cube_vert:zE,cube_frag:BE,depth_vert:FE,depth_frag:VE,distanceRGBA_vert:HE,distanceRGBA_frag:GE,equirect_vert:WE,equirect_frag:qE,linedashed_vert:jE,linedashed_frag:XE,meshbasic_vert:YE,meshbasic_frag:KE,meshlambert_vert:ZE,meshlambert_frag:JE,meshmatcap_vert:QE,meshmatcap_frag:eT,meshnormal_vert:tT,meshnormal_frag:nT,meshphong_vert:iT,meshphong_frag:rT,meshphysical_vert:sT,meshphysical_frag:aT,meshtoon_vert:oT,meshtoon_frag:lT,points_vert:uT,points_frag:cT,shadow_vert:dT,shadow_frag:hT,sprite_vert:fT,sprite_frag:pT},be={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},ii={basic:{uniforms:hn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:hn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ot(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:hn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:hn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:hn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new ot(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:hn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:hn([be.points,be.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:hn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:hn([be.common,be.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:hn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:hn([be.sprite,be.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:hn([be.common,be.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:hn([be.lights,be.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};ii.physical={uniforms:hn([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const Ya={r:0,b:0,g:0},er=new oi,mT=new kt;function gT(n,e,t,i,r,s,a){const o=new ot(0);let u=s===!0?0:1,l,c,d=null,h=0,f=null;function m(x){let w=x.isScene===!0?x.background:null;return w&&w.isTexture&&(w=(x.backgroundBlurriness>0?t:e).get(w)),w}function y(x){let w=!1;const b=m(x);b===null?p(o,u):b&&b.isColor&&(p(b,1),w=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||w)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(x,w){const b=m(w);b&&(b.isCubeTexture||b.mapping===Vo)?(c===void 0&&(c=new Mn(new vs(1,1,1),new Vi({name:"BackgroundCubeMaterial",uniforms:ms(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),er.copy(w.backgroundRotation),er.x*=-1,er.y*=-1,er.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(er.y*=-1,er.z*=-1),c.material.uniforms.envMap.value=b,c.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mT.makeRotationFromEuler(er)),c.material.toneMapped=yt.getTransfer(b.colorSpace)!==Ct,(d!==b||h!==b.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=b,h=b.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Mn(new ya(2,2),new Vi({name:"BackgroundMaterial",uniforms:ms(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=yt.getTransfer(b.colorSpace)!==Ct,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=b,h=b.version,f=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,w){x.getRGB(Ya,yy(n)),i.buffers.color.setClear(Ya.r,Ya.g,Ya.b,w,a)}return{getClearColor:function(){return o},setClearColor:function(x,w=1){o.set(x),u=w,p(o,u)},getClearAlpha:function(){return u},setClearAlpha:function(x){u=x,p(o,u)},render:y,addToRenderList:_}}function _T(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(A,L,F,B,N){let U=!1;const z=d(B,F,L);s!==z&&(s=z,l(s.object)),U=f(A,B,F,N),U&&m(A,B,F,N),N!==null&&e.update(N,n.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,b(A,L,F,B),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function u(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function c(A){return n.deleteVertexArray(A)}function d(A,L,F){const B=F.wireframe===!0;let N=i[A.id];N===void 0&&(N={},i[A.id]=N);let U=N[L.id];U===void 0&&(U={},N[L.id]=U);let z=U[B];return z===void 0&&(z=h(u()),U[B]=z),z}function h(A){const L=[],F=[],B=[];for(let N=0;N<t;N++)L[N]=0,F[N]=0,B[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:B,object:A,attributes:{},index:null}}function f(A,L,F,B){const N=s.attributes,U=L.attributes;let z=0;const K=F.getAttributes();for(const W in K)if(K[W].location>=0){const oe=N[W];let Z=U[W];if(Z===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(Z=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(Z=A.instanceColor)),oe===void 0||oe.attribute!==Z||Z&&oe.data!==Z.data)return!0;z++}return s.attributesNum!==z||s.index!==B}function m(A,L,F,B){const N={},U=L.attributes;let z=0;const K=F.getAttributes();for(const W in K)if(K[W].location>=0){let oe=U[W];oe===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(oe=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(oe=A.instanceColor));const Z={};Z.attribute=oe,oe&&oe.data&&(Z.data=oe.data),N[W]=Z,z++}s.attributes=N,s.attributesNum=z,s.index=B}function y(){const A=s.newAttributes;for(let L=0,F=A.length;L<F;L++)A[L]=0}function _(A){p(A,0)}function p(A,L){const F=s.newAttributes,B=s.enabledAttributes,N=s.attributeDivisors;F[A]=1,B[A]===0&&(n.enableVertexAttribArray(A),B[A]=1),N[A]!==L&&(n.vertexAttribDivisor(A,L),N[A]=L)}function x(){const A=s.newAttributes,L=s.enabledAttributes;for(let F=0,B=L.length;F<B;F++)L[F]!==A[F]&&(n.disableVertexAttribArray(F),L[F]=0)}function w(A,L,F,B,N,U,z){z===!0?n.vertexAttribIPointer(A,L,F,N,U):n.vertexAttribPointer(A,L,F,B,N,U)}function b(A,L,F,B){y();const N=B.attributes,U=F.getAttributes(),z=L.defaultAttributeValues;for(const K in U){const W=U[K];if(W.location>=0){let ie=N[K];if(ie===void 0&&(K==="instanceMatrix"&&A.instanceMatrix&&(ie=A.instanceMatrix),K==="instanceColor"&&A.instanceColor&&(ie=A.instanceColor)),ie!==void 0){const oe=ie.normalized,Z=ie.itemSize,he=e.get(ie);if(he===void 0)continue;const me=he.buffer,G=he.type,ue=he.bytesPerElement,xe=G===n.INT||G===n.UNSIGNED_INT||ie.gpuType===ld;if(ie.isInterleavedBufferAttribute){const pe=ie.data,Le=pe.stride,we=ie.offset;if(pe.isInstancedInterleavedBuffer){for(let Oe=0;Oe<W.locationSize;Oe++)p(W.location+Oe,pe.meshPerAttribute);A.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Oe=0;Oe<W.locationSize;Oe++)_(W.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,me);for(let Oe=0;Oe<W.locationSize;Oe++)w(W.location+Oe,Z/W.locationSize,G,oe,Le*ue,(we+Z/W.locationSize*Oe)*ue,xe)}else{if(ie.isInstancedBufferAttribute){for(let pe=0;pe<W.locationSize;pe++)p(W.location+pe,ie.meshPerAttribute);A.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let pe=0;pe<W.locationSize;pe++)_(W.location+pe);n.bindBuffer(n.ARRAY_BUFFER,me);for(let pe=0;pe<W.locationSize;pe++)w(W.location+pe,Z/W.locationSize,G,oe,Z*ue,Z/W.locationSize*pe*ue,xe)}}else if(z!==void 0){const oe=z[K];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(W.location,oe);break;case 3:n.vertexAttrib3fv(W.location,oe);break;case 4:n.vertexAttrib4fv(W.location,oe);break;default:n.vertexAttrib1fv(W.location,oe)}}}}x()}function I(){S();for(const A in i){const L=i[A];for(const F in L){const B=L[F];for(const N in B)c(B[N].object),delete B[N];delete L[F]}delete i[A]}}function R(A){if(i[A.id]===void 0)return;const L=i[A.id];for(const F in L){const B=L[F];for(const N in B)c(B[N].object),delete B[N];delete L[F]}delete i[A.id]}function T(A){for(const L in i){const F=i[L];if(F[A.id]===void 0)continue;const B=F[A.id];for(const N in B)c(B[N].object),delete B[N];delete F[A.id]}}function S(){C(),a=!0,s!==r&&(s=r,l(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:S,resetDefaultState:C,dispose:I,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:_,disableUnusedAttributes:x}}function yT(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let f=0;for(let m=0;m<d;m++)f+=c[m];t.update(f,i,1)}function u(l,c,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],c[m],h[m]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,c,0,h,0,d);let m=0;for(let y=0;y<d;y++)m+=c[y]*h[y];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=u}function vT(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==Dn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const S=T===pa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ai&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==si&&!S)}function u(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const c=u(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const d=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=m>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:u,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:b,vertexTextures:I,maxSamples:R}}function xT(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Oi,o=new tt,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||r;return r=h,i=d.length,f},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=c(d,h,0)},this.setState=function(d,h,f){const m=d.clippingPlanes,y=d.clipIntersection,_=d.clipShadows,p=n.get(d);if(!r||m===null||m.length===0||s&&!_)s?c(null):l();else{const x=s?0:i,w=x*4;let b=p.clippingState||null;u.value=b,b=c(m,h,w,f);for(let I=0;I!==w;++I)b[I]=t[I];p.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function l(){u.value!==t&&(u.value=t,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(d,h,f,m){const y=d!==null?d.length:0;let _=null;if(y!==0){if(_=u.value,m!==!0||_===null){const p=f+y*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(_===null||_.length<p)&&(_=new Float32Array(p));for(let w=0,b=f;w!==y;++w,b+=4)a.copy(d[w]).applyMatrix4(x,o),a.normal.toArray(_,b),_[b+3]=a.constant}u.value=_,u.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,_}}function bT(n){let e=new WeakMap;function t(a,o){return o===lc?a.mapping=ds:o===uc&&(a.mapping=hs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===lc||o===uc)if(e.has(a)){const u=e.get(a).texture;return t(u,a.mapping)}else{const u=a.image;if(u&&u.height>0){const l=new P2(u.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const u=e.get(o);u!==void 0&&(e.delete(o),u.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class wy extends vy{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,u=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=c*this.view.offsetY,u=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ts=4,Wf=[.125,.215,.35,.446,.526,.582],dr=20,Nl=new wy,qf=new ot;let kl=null,Ol=0,Ul=0,zl=!1;const lr=(1+Math.sqrt(5))/2,jr=1/lr,jf=[new H(-lr,jr,0),new H(lr,jr,0),new H(-jr,0,lr),new H(jr,0,lr),new H(0,lr,-jr),new H(0,lr,jr),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class Xf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){kl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Ul=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(kl,Ol,Ul),this._renderer.xr.enabled=zl,e.scissorTest=!1,Ka(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Ul=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ri,minFilter:ri,generateMipmaps:!1,type:pa,format:Dn,colorSpace:ys,depthBuffer:!1},r=Yf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yf(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wT(s)),this._blurMaterial=ST(s,e,t)}return r}_compileMaterial(e){const t=new Mn(this._lodPlanes[0],e);this._renderer.compile(t,Nl)}_sceneToCubeUV(e,t,i,r){const o=new _n(90,1,t,i),u=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,d=c.autoClear,h=c.toneMapping;c.getClearColor(qf),c.toneMapping=Bi,c.autoClear=!1;const f=new md({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1}),m=new Mn(new vs,f);let y=!1;const _=e.background;_?_.isColor&&(f.color.copy(_),e.background=null,y=!0):(f.color.copy(qf),y=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(o.up.set(0,u[p],0),o.lookAt(l[p],0,0)):x===1?(o.up.set(0,0,u[p]),o.lookAt(0,l[p],0)):(o.up.set(0,u[p],0),o.lookAt(0,0,l[p]));const w=this._cubeSize;Ka(r,x*w,p>2?w:0,w,w),c.setRenderTarget(r),y&&c.render(m,o),c.render(e,o)}m.geometry.dispose(),m.material.dispose(),c.toneMapping=h,c.autoClear=d,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ds||e.mapping===hs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Mn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const u=this._cubeSize;Ka(t,0,0,3*u,2*u),i.setRenderTarget(t),i.render(a,Nl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=jf[(r-s-1)%jf.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const u=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,d=new Mn(this._lodPlanes[r],l),h=l.uniforms,f=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*dr-1),y=s/m,_=isFinite(s)?1+Math.floor(c*y):dr;_>dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${dr}`);const p=[];let x=0;for(let T=0;T<dr;++T){const S=T/y,C=Math.exp(-S*S/2);p.push(C),T===0?x+=C:T<_&&(x+=2*C)}for(let T=0;T<p.length;T++)p[T]=p[T]/x;h.envMap.value=e.texture,h.samples.value=_,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:w}=this;h.dTheta.value=m,h.mipInt.value=w-i;const b=this._sizeLods[r],I=3*b*(r>w-ts?r-w+ts:0),R=4*(this._cubeSize-b);Ka(t,I,R,3*b,2*b),u.setRenderTarget(t),u.render(d,Nl)}}function wT(n){const e=[],t=[],i=[];let r=n;const s=n-ts+1+Wf.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let u=1/o;a>n-ts?u=Wf[a-n+ts-1]:a===0&&(u=0),i.push(u);const l=1/(o-2),c=-l,d=1+l,h=[c,c,d,c,d,d,c,c,d,d,c,d],f=6,m=6,y=3,_=2,p=1,x=new Float32Array(y*m*f),w=new Float32Array(_*m*f),b=new Float32Array(p*m*f);for(let R=0;R<f;R++){const T=R%3*2/3-1,S=R>2?0:-1,C=[T,S,0,T+2/3,S,0,T+2/3,S+1,0,T,S,0,T+2/3,S+1,0,T,S+1,0];x.set(C,y*m*R),w.set(h,_*m*R);const A=[R,R,R,R,R,R];b.set(A,p*m*R)}const I=new Xn;I.setAttribute("position",new vn(x,y)),I.setAttribute("uv",new vn(w,_)),I.setAttribute("faceIndex",new vn(b,p)),e.push(I),r>ts&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Yf(n,e,t){const i=new wr(n,e,t);return i.texture.mapping=Vo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ka(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function ST(n,e,t){const i=new Float32Array(dr),r=new H(0,1,0);return new Vi({name:"SphericalGaussianBlur",defines:{n:dr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_d(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Kf(){return new Vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_d(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Zf(){return new Vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_d(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function _d(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function MT(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const u=o.mapping,l=u===lc||u===uc,c=u===ds||u===hs;if(l||c){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Xf(n)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||c&&f&&r(f)?(t===null&&(t=new Xf(n)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let u=0;const l=6;for(let c=0;c<l;c++)o[c]!==void 0&&u++;return u===l}function s(o){const u=o.target;u.removeEventListener("dispose",s);const l=e.get(u);l!==void 0&&(e.delete(u),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function ET(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Js("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function TT(n,e,t,i){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const m in h.attributes)e.remove(h.attributes[m]);for(const m in h.morphAttributes){const y=h.morphAttributes[m];for(let _=0,p=y.length;_<p;_++)e.remove(y[_])}h.removeEventListener("dispose",a),delete r[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function u(d){const h=d.attributes;for(const m in h)e.update(h[m],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const m in f){const y=f[m];for(let _=0,p=y.length;_<p;_++)e.update(y[_],n.ARRAY_BUFFER)}}function l(d){const h=[],f=d.index,m=d.attributes.position;let y=0;if(f!==null){const x=f.array;y=f.version;for(let w=0,b=x.length;w<b;w+=3){const I=x[w+0],R=x[w+1],T=x[w+2];h.push(I,R,R,T,T,I)}}else if(m!==void 0){const x=m.array;y=m.version;for(let w=0,b=x.length/3-1;w<b;w+=3){const I=w+0,R=w+1,T=w+2;h.push(I,R,R,T,T,I)}}else return;const _=new(cy(h)?_y:gy)(h,1);_.version=y;const p=s.get(d);p&&e.remove(p),s.set(d,_)}function c(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:u,getWireframeAttribute:c}}function AT(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function u(h,f){n.drawElements(i,f,s,h*a),t.update(f,i,1)}function l(h,f,m){m!==0&&(n.drawElementsInstanced(i,f,s,h*a,m),t.update(f,i,m))}function c(h,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,h,0,m);let _=0;for(let p=0;p<m;p++)_+=f[p];t.update(_,i,1)}function d(h,f,m,y){if(m===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<h.length;p++)l(h[p]/a,f[p],y[p]);else{_.multiDrawElementsInstancedWEBGL(i,f,0,s,h,0,y,0,m);let p=0;for(let x=0;x<m;x++)p+=f[x]*y[x];t.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=u,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=d}function CT(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function RT(n,e,t){const i=new WeakMap,r=new $t;function s(a,o,u){const l=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=c!==void 0?c.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let C=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",C)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let w=0;f===!0&&(w=1),m===!0&&(w=2),y===!0&&(w=3);let b=o.attributes.position.count*w,I=1;b>e.maxTextureSize&&(I=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const R=new Float32Array(b*I*4*d),T=new hy(R,b,I,d);T.type=si,T.needsUpdate=!0;const S=w*4;for(let A=0;A<d;A++){const L=_[A],F=p[A],B=x[A],N=b*I*4*A;for(let U=0;U<L.count;U++){const z=U*S;f===!0&&(r.fromBufferAttribute(L,U),R[N+z+0]=r.x,R[N+z+1]=r.y,R[N+z+2]=r.z,R[N+z+3]=0),m===!0&&(r.fromBufferAttribute(F,U),R[N+z+4]=r.x,R[N+z+5]=r.y,R[N+z+6]=r.z,R[N+z+7]=0),y===!0&&(r.fromBufferAttribute(B,U),R[N+z+8]=r.x,R[N+z+9]=r.y,R[N+z+10]=r.z,R[N+z+11]=B.itemSize===4?r.w:1)}}h={count:d,texture:T,size:new Ee(b,I)},i.set(o,h),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];const m=o.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",m),u.getUniforms().setValue(n,"morphTargetInfluences",l)}u.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function IT(n,e,t,i){let r=new WeakMap;function s(u){const l=i.render.frame,c=u.geometry,d=e.get(u,c);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),u.isInstancedMesh&&(u.hasEventListener("dispose",o)===!1&&u.addEventListener("dispose",o),r.get(u)!==l&&(t.update(u.instanceMatrix,n.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,n.ARRAY_BUFFER),r.set(u,l))),u.isSkinnedMesh){const h=u.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function a(){r=new WeakMap}function o(u){const l=u.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class Sy extends fn{constructor(e,t,i,r,s,a,o,u,l,c=os){if(c!==os&&c!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===os&&(i=br),i===void 0&&c===ps&&(i=fs),super(null,r,s,a,o,u,c,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:En,this.minFilter=u!==void 0?u:En,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const My=new fn,Jf=new Sy(1,1),Ey=new hy,Ty=new g2,Ay=new xy,Qf=[],ep=[],tp=new Float32Array(16),np=new Float32Array(9),ip=new Float32Array(4);function xs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Qf[r];if(s===void 0&&(s=new Float32Array(r),Qf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Go(n,e){let t=ep[e];t===void 0&&(t=new Int32Array(e),ep[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $T(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function PT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),Yt(t,e)}}function DT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),Yt(t,e)}}function LT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),Yt(t,e)}}function NT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;ip.set(i),n.uniformMatrix2fv(this.addr,!1,ip),Yt(t,i)}}function kT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;np.set(i),n.uniformMatrix3fv(this.addr,!1,np),Yt(t,i)}}function OT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;tp.set(i),n.uniformMatrix4fv(this.addr,!1,tp),Yt(t,i)}}function UT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function zT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),Yt(t,e)}}function BT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),Yt(t,e)}}function FT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),Yt(t,e)}}function VT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function HT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),Yt(t,e)}}function GT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),Yt(t,e)}}function WT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),Yt(t,e)}}function qT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Jf.compareFunction=uy,s=Jf):s=My,t.setTexture2D(e||s,r)}function jT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ty,r)}function XT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ay,r)}function YT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ey,r)}function KT(n){switch(n){case 5126:return $T;case 35664:return PT;case 35665:return DT;case 35666:return LT;case 35674:return NT;case 35675:return kT;case 35676:return OT;case 5124:case 35670:return UT;case 35667:case 35671:return zT;case 35668:case 35672:return BT;case 35669:case 35673:return FT;case 5125:return VT;case 36294:return HT;case 36295:return GT;case 36296:return WT;case 35678:case 36198:case 36298:case 36306:case 35682:return qT;case 35679:case 36299:case 36307:return jT;case 35680:case 36300:case 36308:case 36293:return XT;case 36289:case 36303:case 36311:case 36292:return YT}}function ZT(n,e){n.uniform1fv(this.addr,e)}function JT(n,e){const t=xs(e,this.size,2);n.uniform2fv(this.addr,t)}function QT(n,e){const t=xs(e,this.size,3);n.uniform3fv(this.addr,t)}function eA(n,e){const t=xs(e,this.size,4);n.uniform4fv(this.addr,t)}function tA(n,e){const t=xs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nA(n,e){const t=xs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function iA(n,e){const t=xs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function rA(n,e){n.uniform1iv(this.addr,e)}function sA(n,e){n.uniform2iv(this.addr,e)}function aA(n,e){n.uniform3iv(this.addr,e)}function oA(n,e){n.uniform4iv(this.addr,e)}function lA(n,e){n.uniform1uiv(this.addr,e)}function uA(n,e){n.uniform2uiv(this.addr,e)}function cA(n,e){n.uniform3uiv(this.addr,e)}function dA(n,e){n.uniform4uiv(this.addr,e)}function hA(n,e,t){const i=this.cache,r=e.length,s=Go(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||My,s[a])}function fA(n,e,t){const i=this.cache,r=e.length,s=Go(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Ty,s[a])}function pA(n,e,t){const i=this.cache,r=e.length,s=Go(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ay,s[a])}function mA(n,e,t){const i=this.cache,r=e.length,s=Go(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ey,s[a])}function gA(n){switch(n){case 5126:return ZT;case 35664:return JT;case 35665:return QT;case 35666:return eA;case 35674:return tA;case 35675:return nA;case 35676:return iA;case 5124:case 35670:return rA;case 35667:case 35671:return sA;case 35668:case 35672:return aA;case 35669:case 35673:return oA;case 5125:return lA;case 36294:return uA;case 36295:return cA;case 36296:return dA;case 35678:case 36198:case 36298:case 36306:case 35682:return hA;case 35679:case 36299:case 36307:return fA;case 35680:case 36300:case 36308:case 36293:return pA;case 36289:case 36303:case 36311:case 36292:return mA}}class _A{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=KT(t.type)}}class yA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gA(t.type)}}class vA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Bl=/(\w+)(\])?(\[|\.)?/g;function rp(n,e){n.seq.push(e),n.map[e.id]=e}function xA(n,e,t){const i=n.name,r=i.length;for(Bl.lastIndex=0;;){const s=Bl.exec(i),a=Bl.lastIndex;let o=s[1];const u=s[2]==="]",l=s[3];if(u&&(o=o|0),l===void 0||l==="["&&a+2===r){rp(t,l===void 0?new _A(o,n,e):new yA(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new vA(o),rp(t,d)),t=d}}}class To{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);xA(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],u=i[o.id];u.needsUpdate!==!1&&o.setValue(e,u.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function sp(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const bA=37297;let wA=0;function SA(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const ap=new tt;function MA(n){yt._getMatrix(ap,yt.workingColorSpace,n);const e=`mat3( ${ap.elements.map(t=>t.toFixed(4))} )`;switch(yt.getTransfer(n)){case Ho:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function op(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+SA(n.getShaderSource(e),a)}else return r}function EA(n,e){const t=MA(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function TA(n,e){let t;switch(e){case VS:t="Linear";break;case HS:t="Reinhard";break;case GS:t="Cineon";break;case WS:t="ACESFilmic";break;case jS:t="AgX";break;case XS:t="Neutral";break;case qS:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Za=new H;function AA(){yt.getLuminanceCoefficients(Za);const n=Za.x.toFixed(4),e=Za.y.toFixed(4),t=Za.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function CA(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function RA(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function IA(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Qs(n){return n!==""}function lp(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function up(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $A=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(n){return n.replace($A,DA)}const PA=new Map;function DA(n,e){let t=it[e];if(t===void 0){const i=PA.get(e);if(i!==void 0)t=it[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Oc(t)}const LA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cp(n){return n.replace(LA,NA)}function NA(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function dp(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function kA(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Y0?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===K0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function OA(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ds:case hs:e="ENVMAP_TYPE_CUBE";break;case Vo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function UA(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case hs:e="ENVMAP_MODE_REFRACTION";break}return e}function zA(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Z0:e="ENVMAP_BLENDING_MULTIPLY";break;case BS:e="ENVMAP_BLENDING_MIX";break;case FS:e="ENVMAP_BLENDING_ADD";break}return e}function BA(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function FA(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const u=kA(t),l=OA(t),c=UA(t),d=zA(t),h=BA(t),f=CA(t),m=RA(s),y=r.createProgram();let _,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Qs).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Qs).join(`
`),p.length>0&&(p+=`
`)):(_=[dp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),p=[dp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bi?"#define TONE_MAPPING":"",t.toneMapping!==Bi?it.tonemapping_pars_fragment:"",t.toneMapping!==Bi?TA("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,EA("linearToOutputTexel",t.outputColorSpace),AA(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qs).join(`
`)),a=Oc(a),a=lp(a,t),a=up(a,t),o=Oc(o),o=lp(o,t),o=up(o,t),a=cp(a),o=cp(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,_=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",t.glslVersion===Mf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=x+_+a,b=x+p+o,I=sp(r,r.VERTEX_SHADER,w),R=sp(r,r.FRAGMENT_SHADER,b);r.attachShader(y,I),r.attachShader(y,R),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function T(L){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(y).trim(),B=r.getShaderInfoLog(I).trim(),N=r.getShaderInfoLog(R).trim();let U=!0,z=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(U=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,I,R);else{const K=op(r,I,"vertex"),W=op(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+F+`
`+K+`
`+W)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(B===""||N==="")&&(z=!1);z&&(L.diagnostics={runnable:U,programLog:F,vertexShader:{log:B,prefix:_},fragmentShader:{log:N,prefix:p}})}r.deleteShader(I),r.deleteShader(R),S=new To(r,y),C=IA(r,y)}let S;this.getUniforms=function(){return S===void 0&&T(this),S};let C;this.getAttributes=function(){return C===void 0&&T(this),C};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=r.getProgramParameter(y,bA)),A},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wA++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=I,this.fragmentShader=R,this}let VA=0;class HA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new GA(e),t.set(e,i)),i}}class GA{constructor(e){this.id=VA++,this.code=e,this.usedTimes=0}}function WA(n,e,t,i,r,s,a){const o=new py,u=new HA,l=new Set,c=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let f=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(C){return l.add(C),C===0?"uv":`uv${C}`}function _(C,A,L,F,B){const N=F.fog,U=B.geometry,z=C.isMeshStandardMaterial?F.environment:null,K=(C.isMeshStandardMaterial?t:e).get(C.envMap||z),W=K&&K.mapping===Vo?K.image.height:null,ie=m[C.type];C.precision!==null&&(f=r.getMaxPrecision(C.precision),f!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",f,"instead."));const oe=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Z=oe!==void 0?oe.length:0;let he=0;U.morphAttributes.position!==void 0&&(he=1),U.morphAttributes.normal!==void 0&&(he=2),U.morphAttributes.color!==void 0&&(he=3);let me,G,ue,xe;if(ie){const bt=ii[ie];me=bt.vertexShader,G=bt.fragmentShader}else me=C.vertexShader,G=C.fragmentShader,u.update(C),ue=u.getVertexShaderID(C),xe=u.getFragmentShaderID(C);const pe=n.getRenderTarget(),Le=n.state.buffers.depth.getReversed(),we=B.isInstancedMesh===!0,Oe=B.isBatchedMesh===!0,rt=!!C.map,lt=!!C.matcap,xt=!!K,V=!!C.aoMap,tn=!!C.lightMap,dt=!!C.bumpMap,ut=!!C.normalMap,Be=!!C.displacementMap,Mt=!!C.emissiveMap,We=!!C.metalnessMap,k=!!C.roughnessMap,$=C.anisotropy>0,J=C.clearcoat>0,le=C.dispersion>0,de=C.iridescence>0,ae=C.sheen>0,Fe=C.transmission>0,ve=$&&!!C.anisotropyMap,Ie=J&&!!C.clearcoatMap,pt=J&&!!C.clearcoatNormalMap,ge=J&&!!C.clearcoatRoughnessMap,Ne=de&&!!C.iridescenceMap,qe=de&&!!C.iridescenceThicknessMap,je=ae&&!!C.sheenColorMap,$e=ae&&!!C.sheenRoughnessMap,ct=!!C.specularMap,Qe=!!C.specularColorMap,Tt=!!C.specularIntensityMap,q=Fe&&!!C.transmissionMap,Se=Fe&&!!C.thicknessMap,se=!!C.gradientMap,ce=!!C.alphaMap,Ae=C.alphaTest>0,Te=!!C.alphaHash,Je=!!C.extensions;let Ot=Bi;C.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(Ot=n.toneMapping);const Gt={shaderID:ie,shaderType:C.type,shaderName:C.name,vertexShader:me,fragmentShader:G,defines:C.defines,customVertexShaderID:ue,customFragmentShaderID:xe,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&B._colorsTexture!==null,instancing:we,instancingColor:we&&B.instanceColor!==null,instancingMorph:we&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:pe===null?n.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:ys,alphaToCoverage:!!C.alphaToCoverage,map:rt,matcap:lt,envMap:xt,envMapMode:xt&&K.mapping,envMapCubeUVHeight:W,aoMap:V,lightMap:tn,bumpMap:dt,normalMap:ut,displacementMap:h&&Be,emissiveMap:Mt,normalMapObjectSpace:ut&&C.normalMapType===JS,normalMapTangentSpace:ut&&C.normalMapType===ly,metalnessMap:We,roughnessMap:k,anisotropy:$,anisotropyMap:ve,clearcoat:J,clearcoatMap:Ie,clearcoatNormalMap:pt,clearcoatRoughnessMap:ge,dispersion:le,iridescence:de,iridescenceMap:Ne,iridescenceThicknessMap:qe,sheen:ae,sheenColorMap:je,sheenRoughnessMap:$e,specularMap:ct,specularColorMap:Qe,specularIntensityMap:Tt,transmission:Fe,transmissionMap:q,thicknessMap:Se,gradientMap:se,opaque:C.transparent===!1&&C.blending===as&&C.alphaToCoverage===!1,alphaMap:ce,alphaTest:Ae,alphaHash:Te,combine:C.combine,mapUv:rt&&y(C.map.channel),aoMapUv:V&&y(C.aoMap.channel),lightMapUv:tn&&y(C.lightMap.channel),bumpMapUv:dt&&y(C.bumpMap.channel),normalMapUv:ut&&y(C.normalMap.channel),displacementMapUv:Be&&y(C.displacementMap.channel),emissiveMapUv:Mt&&y(C.emissiveMap.channel),metalnessMapUv:We&&y(C.metalnessMap.channel),roughnessMapUv:k&&y(C.roughnessMap.channel),anisotropyMapUv:ve&&y(C.anisotropyMap.channel),clearcoatMapUv:Ie&&y(C.clearcoatMap.channel),clearcoatNormalMapUv:pt&&y(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&y(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Ne&&y(C.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&y(C.iridescenceThicknessMap.channel),sheenColorMapUv:je&&y(C.sheenColorMap.channel),sheenRoughnessMapUv:$e&&y(C.sheenRoughnessMap.channel),specularMapUv:ct&&y(C.specularMap.channel),specularColorMapUv:Qe&&y(C.specularColorMap.channel),specularIntensityMapUv:Tt&&y(C.specularIntensityMap.channel),transmissionMapUv:q&&y(C.transmissionMap.channel),thicknessMapUv:Se&&y(C.thicknessMap.channel),alphaMapUv:ce&&y(C.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ut||$),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!U.attributes.uv&&(rt||ce),fog:!!N,useFog:C.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Le,skinning:B.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:he,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:C.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ot,decodeVideoTexture:rt&&C.map.isVideoTexture===!0&&yt.getTransfer(C.map.colorSpace)===Ct,decodeVideoTextureEmissive:Mt&&C.emissiveMap.isVideoTexture===!0&&yt.getTransfer(C.emissiveMap.colorSpace)===Ct,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===xi,flipSided:C.side===yn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Je&&C.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&C.extensions.multiDraw===!0||Oe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Gt.vertexUv1s=l.has(1),Gt.vertexUv2s=l.has(2),Gt.vertexUv3s=l.has(3),l.clear(),Gt}function p(C){const A=[];if(C.shaderID?A.push(C.shaderID):(A.push(C.customVertexShaderID),A.push(C.customFragmentShaderID)),C.defines!==void 0)for(const L in C.defines)A.push(L),A.push(C.defines[L]);return C.isRawShaderMaterial===!1&&(x(A,C),w(A,C),A.push(n.outputColorSpace)),A.push(C.customProgramCacheKey),A.join()}function x(C,A){C.push(A.precision),C.push(A.outputColorSpace),C.push(A.envMapMode),C.push(A.envMapCubeUVHeight),C.push(A.mapUv),C.push(A.alphaMapUv),C.push(A.lightMapUv),C.push(A.aoMapUv),C.push(A.bumpMapUv),C.push(A.normalMapUv),C.push(A.displacementMapUv),C.push(A.emissiveMapUv),C.push(A.metalnessMapUv),C.push(A.roughnessMapUv),C.push(A.anisotropyMapUv),C.push(A.clearcoatMapUv),C.push(A.clearcoatNormalMapUv),C.push(A.clearcoatRoughnessMapUv),C.push(A.iridescenceMapUv),C.push(A.iridescenceThicknessMapUv),C.push(A.sheenColorMapUv),C.push(A.sheenRoughnessMapUv),C.push(A.specularMapUv),C.push(A.specularColorMapUv),C.push(A.specularIntensityMapUv),C.push(A.transmissionMapUv),C.push(A.thicknessMapUv),C.push(A.combine),C.push(A.fogExp2),C.push(A.sizeAttenuation),C.push(A.morphTargetsCount),C.push(A.morphAttributeCount),C.push(A.numDirLights),C.push(A.numPointLights),C.push(A.numSpotLights),C.push(A.numSpotLightMaps),C.push(A.numHemiLights),C.push(A.numRectAreaLights),C.push(A.numDirLightShadows),C.push(A.numPointLightShadows),C.push(A.numSpotLightShadows),C.push(A.numSpotLightShadowsWithMaps),C.push(A.numLightProbes),C.push(A.shadowMapType),C.push(A.toneMapping),C.push(A.numClippingPlanes),C.push(A.numClipIntersection),C.push(A.depthPacking)}function w(C,A){o.disableAll(),A.supportsVertexTextures&&o.enable(0),A.instancing&&o.enable(1),A.instancingColor&&o.enable(2),A.instancingMorph&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),A.dispersion&&o.enable(20),A.batchingColor&&o.enable(21),C.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reverseDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),C.push(o.mask)}function b(C){const A=m[C.type];let L;if(A){const F=ii[A];L=C2.clone(F.uniforms)}else L=C.uniforms;return L}function I(C,A){let L;for(let F=0,B=c.length;F<B;F++){const N=c[F];if(N.cacheKey===A){L=N,++L.usedTimes;break}}return L===void 0&&(L=new FA(n,A,C,s),c.push(L)),L}function R(C){if(--C.usedTimes===0){const A=c.indexOf(C);c[A]=c[c.length-1],c.pop(),C.destroy()}}function T(C){u.remove(C)}function S(){u.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:b,acquireProgram:I,releaseProgram:R,releaseShaderCache:T,programs:c,dispose:S}}function qA(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,u){n.get(a)[o]=u}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function jA(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function hp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function fp(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d,h,f,m,y,_){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:m,renderOrder:d.renderOrder,z:y,group:_},n[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=y,p.group=_),e++,p}function o(d,h,f,m,y,_){const p=a(d,h,f,m,y,_);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):t.push(p)}function u(d,h,f,m,y,_){const p=a(d,h,f,m,y,_);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function l(d,h){t.length>1&&t.sort(d||jA),i.length>1&&i.sort(h||hp),r.length>1&&r.sort(h||hp)}function c(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:u,finish:c,sort:l}}function XA(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new fp,n.set(i,[a])):r>=s.length?(a=new fp,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function YA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new ot};break;case"SpotLight":t={position:new H,direction:new H,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new H,halfWidth:new H,halfHeight:new H};break}return n[e.id]=t,t}}}function KA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ZA=0;function JA(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function QA(n){const e=new YA,t=KA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new H);const r=new H,s=new kt,a=new kt;function o(l){let c=0,d=0,h=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let f=0,m=0,y=0,_=0,p=0,x=0,w=0,b=0,I=0,R=0,T=0;l.sort(JA);for(let C=0,A=l.length;C<A;C++){const L=l[C],F=L.color,B=L.intensity,N=L.distance,U=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)c+=F.r*B,d+=F.g*B,h+=F.b*B;else if(L.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(L.sh.coefficients[z],B);T++}else if(L.isDirectionalLight){const z=e.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,W=t.get(L);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,i.directionalShadow[f]=W,i.directionalShadowMap[f]=U,i.directionalShadowMatrix[f]=L.shadow.matrix,x++}i.directional[f]=z,f++}else if(L.isSpotLight){const z=e.get(L);z.position.setFromMatrixPosition(L.matrixWorld),z.color.copy(F).multiplyScalar(B),z.distance=N,z.coneCos=Math.cos(L.angle),z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),z.decay=L.decay,i.spot[y]=z;const K=L.shadow;if(L.map&&(i.spotLightMap[I]=L.map,I++,K.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[y]=K.matrix,L.castShadow){const W=t.get(L);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,i.spotShadow[y]=W,i.spotShadowMap[y]=U,b++}y++}else if(L.isRectAreaLight){const z=e.get(L);z.color.copy(F).multiplyScalar(B),z.halfWidth.set(L.width*.5,0,0),z.halfHeight.set(0,L.height*.5,0),i.rectArea[_]=z,_++}else if(L.isPointLight){const z=e.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity),z.distance=L.distance,z.decay=L.decay,L.castShadow){const K=L.shadow,W=t.get(L);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,W.shadowCameraNear=K.camera.near,W.shadowCameraFar=K.camera.far,i.pointShadow[m]=W,i.pointShadowMap[m]=U,i.pointShadowMatrix[m]=L.shadow.matrix,w++}i.point[m]=z,m++}else if(L.isHemisphereLight){const z=e.get(L);z.skyColor.copy(L.color).multiplyScalar(B),z.groundColor.copy(L.groundColor).multiplyScalar(B),i.hemi[p]=z,p++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=h;const S=i.hash;(S.directionalLength!==f||S.pointLength!==m||S.spotLength!==y||S.rectAreaLength!==_||S.hemiLength!==p||S.numDirectionalShadows!==x||S.numPointShadows!==w||S.numSpotShadows!==b||S.numSpotMaps!==I||S.numLightProbes!==T)&&(i.directional.length=f,i.spot.length=y,i.rectArea.length=_,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+I-R,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=T,S.directionalLength=f,S.pointLength=m,S.spotLength=y,S.rectAreaLength=_,S.hemiLength=p,S.numDirectionalShadows=x,S.numPointShadows=w,S.numSpotShadows=b,S.numSpotMaps=I,S.numLightProbes=T,i.version=ZA++)}function u(l,c){let d=0,h=0,f=0,m=0,y=0;const _=c.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const w=l[p];if(w.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(_),d++}else if(w.isSpotLight){const b=i.spot[f];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(_),b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(_),f++}else if(w.isRectAreaLight){const b=i.rectArea[m];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(_),a.identity(),s.copy(w.matrixWorld),s.premultiply(_),a.extractRotation(s),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),m++}else if(w.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(_),h++}else if(w.isHemisphereLight){const b=i.hemi[y];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(_),y++}}}return{setup:o,setupView:u,state:i}}function pp(n){const e=new QA(n),t=[],i=[];function r(c){l.camera=c,t.length=0,i.length=0}function s(c){t.push(c)}function a(c){i.push(c)}function o(){e.setup(t)}function u(c){e.setupView(t,c)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:u,pushLight:s,pushShadow:a}}function eC(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new pp(n),e.set(r,[o])):s>=a.length?(o=new pp(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class tC extends _a{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=KS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nC extends _a{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const iC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sC(n,e,t){let i=new gd;const r=new Ee,s=new Ee,a=new $t,o=new tC({depthPacking:ZS}),u=new nC,l={},c=t.maxTextureSize,d={[Fi]:yn,[yn]:Fi,[xi]:xi},h=new Vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:iC,fragmentShader:rC}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new Xn;m.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Mn(m,h),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Y0;let p=this.type;this.render=function(R,T,S){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||R.length===0)return;const C=n.getRenderTarget(),A=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),F=n.state;F.setBlending(zi),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=p!==yi&&this.type===yi,N=p===yi&&this.type!==yi;for(let U=0,z=R.length;U<z;U++){const K=R[U],W=K.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const ie=W.getFrameExtents();if(r.multiply(ie),s.copy(W.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/ie.x),r.x=s.x*ie.x,W.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/ie.y),r.y=s.y*ie.y,W.mapSize.y=s.y)),W.map===null||B===!0||N===!0){const Z=this.type!==yi?{minFilter:En,magFilter:En}:{};W.map!==null&&W.map.dispose(),W.map=new wr(r.x,r.y,Z),W.map.texture.name=K.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();const oe=W.getViewportCount();for(let Z=0;Z<oe;Z++){const he=W.getViewport(Z);a.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),F.viewport(a),W.updateMatrices(K,Z),i=W.getFrustum(),b(T,S,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===yi&&x(W,S),W.needsUpdate=!1}p=this.type,_.needsUpdate=!1,n.setRenderTarget(C,A,L)};function x(R,T){const S=e.update(y);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new wr(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(T,null,S,h,y,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(T,null,S,f,y,null)}function w(R,T,S,C){let A=null;const L=S.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)A=L;else if(A=S.isPointLight===!0?u:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const F=A.uuid,B=T.uuid;let N=l[F];N===void 0&&(N={},l[F]=N);let U=N[B];U===void 0&&(U=A.clone(),N[B]=U,T.addEventListener("dispose",I)),A=U}if(A.visible=T.visible,A.wireframe=T.wireframe,C===yi?A.side=T.shadowSide!==null?T.shadowSide:T.side:A.side=T.shadowSide!==null?T.shadowSide:d[T.side],A.alphaMap=T.alphaMap,A.alphaTest=T.alphaTest,A.map=T.map,A.clipShadows=T.clipShadows,A.clippingPlanes=T.clippingPlanes,A.clipIntersection=T.clipIntersection,A.displacementMap=T.displacementMap,A.displacementScale=T.displacementScale,A.displacementBias=T.displacementBias,A.wireframeLinewidth=T.wireframeLinewidth,A.linewidth=T.linewidth,S.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const F=n.properties.get(A);F.light=S}return A}function b(R,T,S,C,A){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&A===yi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,R.matrixWorld);const B=e.update(R),N=R.material;if(Array.isArray(N)){const U=B.groups;for(let z=0,K=U.length;z<K;z++){const W=U[z],ie=N[W.materialIndex];if(ie&&ie.visible){const oe=w(R,ie,C,A);R.onBeforeShadow(n,R,T,S,B,oe,W),n.renderBufferDirect(S,null,B,oe,R,W),R.onAfterShadow(n,R,T,S,B,oe,W)}}}else if(N.visible){const U=w(R,N,C,A);R.onBeforeShadow(n,R,T,S,B,U,null),n.renderBufferDirect(S,null,B,U,R,null),R.onAfterShadow(n,R,T,S,B,U,null)}}const F=R.children;for(let B=0,N=F.length;B<N;B++)b(F[B],T,S,C,A)}function I(R){R.target.removeEventListener("dispose",I);for(const S in l){const C=l[S],A=R.target.uuid;A in C&&(C[A].dispose(),delete C[A])}}}const aC={[tc]:nc,[ic]:ac,[rc]:oc,[cs]:sc,[nc]:tc,[ac]:ic,[oc]:rc,[sc]:cs};function oC(n,e){function t(){let q=!1;const Se=new $t;let se=null;const ce=new $t(0,0,0,0);return{setMask:function(Ae){se!==Ae&&!q&&(n.colorMask(Ae,Ae,Ae,Ae),se=Ae)},setLocked:function(Ae){q=Ae},setClear:function(Ae,Te,Je,Ot,Gt){Gt===!0&&(Ae*=Ot,Te*=Ot,Je*=Ot),Se.set(Ae,Te,Je,Ot),ce.equals(Se)===!1&&(n.clearColor(Ae,Te,Je,Ot),ce.copy(Se))},reset:function(){q=!1,se=null,ce.set(-1,0,0,0)}}}function i(){let q=!1,Se=!1,se=null,ce=null,Ae=null;return{setReversed:function(Te){if(Se!==Te){const Je=e.get("EXT_clip_control");Se?Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.ZERO_TO_ONE_EXT):Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.NEGATIVE_ONE_TO_ONE_EXT);const Ot=Ae;Ae=null,this.setClear(Ot)}Se=Te},getReversed:function(){return Se},setTest:function(Te){Te?pe(n.DEPTH_TEST):Le(n.DEPTH_TEST)},setMask:function(Te){se!==Te&&!q&&(n.depthMask(Te),se=Te)},setFunc:function(Te){if(Se&&(Te=aC[Te]),ce!==Te){switch(Te){case tc:n.depthFunc(n.NEVER);break;case nc:n.depthFunc(n.ALWAYS);break;case ic:n.depthFunc(n.LESS);break;case cs:n.depthFunc(n.LEQUAL);break;case rc:n.depthFunc(n.EQUAL);break;case sc:n.depthFunc(n.GEQUAL);break;case ac:n.depthFunc(n.GREATER);break;case oc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=Te}},setLocked:function(Te){q=Te},setClear:function(Te){Ae!==Te&&(Se&&(Te=1-Te),n.clearDepth(Te),Ae=Te)},reset:function(){q=!1,se=null,ce=null,Ae=null,Se=!1}}}function r(){let q=!1,Se=null,se=null,ce=null,Ae=null,Te=null,Je=null,Ot=null,Gt=null;return{setTest:function(bt){q||(bt?pe(n.STENCIL_TEST):Le(n.STENCIL_TEST))},setMask:function(bt){Se!==bt&&!q&&(n.stencilMask(bt),Se=bt)},setFunc:function(bt,_t,An){(se!==bt||ce!==_t||Ae!==An)&&(n.stencilFunc(bt,_t,An),se=bt,ce=_t,Ae=An)},setOp:function(bt,_t,An){(Te!==bt||Je!==_t||Ot!==An)&&(n.stencilOp(bt,_t,An),Te=bt,Je=_t,Ot=An)},setLocked:function(bt){q=bt},setClear:function(bt){Gt!==bt&&(n.clearStencil(bt),Gt=bt)},reset:function(){q=!1,Se=null,se=null,ce=null,Ae=null,Te=null,Je=null,Ot=null,Gt=null}}}const s=new t,a=new i,o=new r,u=new WeakMap,l=new WeakMap;let c={},d={},h=new WeakMap,f=[],m=null,y=!1,_=null,p=null,x=null,w=null,b=null,I=null,R=null,T=new ot(0,0,0),S=0,C=!1,A=null,L=null,F=null,B=null,N=null;const U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,K=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(W)[1]),z=K>=1):W.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),z=K>=2);let ie=null,oe={};const Z=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),me=new $t().fromArray(Z),G=new $t().fromArray(he);function ue(q,Se,se,ce){const Ae=new Uint8Array(4),Te=n.createTexture();n.bindTexture(q,Te),n.texParameteri(q,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(q,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Je=0;Je<se;Je++)q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,Ae):n.texImage2D(Se+Je,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ae);return Te}const xe={};xe[n.TEXTURE_2D]=ue(n.TEXTURE_2D,n.TEXTURE_2D,1),xe[n.TEXTURE_CUBE_MAP]=ue(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[n.TEXTURE_2D_ARRAY]=ue(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xe[n.TEXTURE_3D]=ue(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),pe(n.DEPTH_TEST),a.setFunc(cs),dt(!1),ut(yf),pe(n.CULL_FACE),V(zi);function pe(q){c[q]!==!0&&(n.enable(q),c[q]=!0)}function Le(q){c[q]!==!1&&(n.disable(q),c[q]=!1)}function we(q,Se){return d[q]!==Se?(n.bindFramebuffer(q,Se),d[q]=Se,q===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Se),q===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function Oe(q,Se){let se=f,ce=!1;if(q){se=h.get(Se),se===void 0&&(se=[],h.set(Se,se));const Ae=q.textures;if(se.length!==Ae.length||se[0]!==n.COLOR_ATTACHMENT0){for(let Te=0,Je=Ae.length;Te<Je;Te++)se[Te]=n.COLOR_ATTACHMENT0+Te;se.length=Ae.length,ce=!0}}else se[0]!==n.BACK&&(se[0]=n.BACK,ce=!0);ce&&n.drawBuffers(se)}function rt(q){return m!==q?(n.useProgram(q),m=q,!0):!1}const lt={[cr]:n.FUNC_ADD,[SS]:n.FUNC_SUBTRACT,[MS]:n.FUNC_REVERSE_SUBTRACT};lt[ES]=n.MIN,lt[TS]=n.MAX;const xt={[AS]:n.ZERO,[CS]:n.ONE,[RS]:n.SRC_COLOR,[Qu]:n.SRC_ALPHA,[NS]:n.SRC_ALPHA_SATURATE,[DS]:n.DST_COLOR,[$S]:n.DST_ALPHA,[IS]:n.ONE_MINUS_SRC_COLOR,[ec]:n.ONE_MINUS_SRC_ALPHA,[LS]:n.ONE_MINUS_DST_COLOR,[PS]:n.ONE_MINUS_DST_ALPHA,[kS]:n.CONSTANT_COLOR,[OS]:n.ONE_MINUS_CONSTANT_COLOR,[US]:n.CONSTANT_ALPHA,[zS]:n.ONE_MINUS_CONSTANT_ALPHA};function V(q,Se,se,ce,Ae,Te,Je,Ot,Gt,bt){if(q===zi){y===!0&&(Le(n.BLEND),y=!1);return}if(y===!1&&(pe(n.BLEND),y=!0),q!==wS){if(q!==_||bt!==C){if((p!==cr||b!==cr)&&(n.blendEquation(n.FUNC_ADD),p=cr,b=cr),bt)switch(q){case as:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vf:n.blendFunc(n.ONE,n.ONE);break;case xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case as:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vf:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}x=null,w=null,I=null,R=null,T.set(0,0,0),S=0,_=q,C=bt}return}Ae=Ae||Se,Te=Te||se,Je=Je||ce,(Se!==p||Ae!==b)&&(n.blendEquationSeparate(lt[Se],lt[Ae]),p=Se,b=Ae),(se!==x||ce!==w||Te!==I||Je!==R)&&(n.blendFuncSeparate(xt[se],xt[ce],xt[Te],xt[Je]),x=se,w=ce,I=Te,R=Je),(Ot.equals(T)===!1||Gt!==S)&&(n.blendColor(Ot.r,Ot.g,Ot.b,Gt),T.copy(Ot),S=Gt),_=q,C=!1}function tn(q,Se){q.side===xi?Le(n.CULL_FACE):pe(n.CULL_FACE);let se=q.side===yn;Se&&(se=!se),dt(se),q.blending===as&&q.transparent===!1?V(zi):V(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),a.setFunc(q.depthFunc),a.setTest(q.depthTest),a.setMask(q.depthWrite),s.setMask(q.colorWrite);const ce=q.stencilWrite;o.setTest(ce),ce&&(o.setMask(q.stencilWriteMask),o.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),o.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),Mt(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?pe(n.SAMPLE_ALPHA_TO_COVERAGE):Le(n.SAMPLE_ALPHA_TO_COVERAGE)}function dt(q){A!==q&&(q?n.frontFace(n.CW):n.frontFace(n.CCW),A=q)}function ut(q){q!==xS?(pe(n.CULL_FACE),q!==L&&(q===yf?n.cullFace(n.BACK):q===bS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Le(n.CULL_FACE),L=q}function Be(q){q!==F&&(z&&n.lineWidth(q),F=q)}function Mt(q,Se,se){q?(pe(n.POLYGON_OFFSET_FILL),(B!==Se||N!==se)&&(n.polygonOffset(Se,se),B=Se,N=se)):Le(n.POLYGON_OFFSET_FILL)}function We(q){q?pe(n.SCISSOR_TEST):Le(n.SCISSOR_TEST)}function k(q){q===void 0&&(q=n.TEXTURE0+U-1),ie!==q&&(n.activeTexture(q),ie=q)}function $(q,Se,se){se===void 0&&(ie===null?se=n.TEXTURE0+U-1:se=ie);let ce=oe[se];ce===void 0&&(ce={type:void 0,texture:void 0},oe[se]=ce),(ce.type!==q||ce.texture!==Se)&&(ie!==se&&(n.activeTexture(se),ie=se),n.bindTexture(q,Se||xe[q]),ce.type=q,ce.texture=Se)}function J(){const q=oe[ie];q!==void 0&&q.type!==void 0&&(n.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function le(){try{n.compressedTexImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function de(){try{n.compressedTexImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ae(){try{n.texSubImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Fe(){try{n.texSubImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ve(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ie(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function pt(){try{n.texStorage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ge(){try{n.texStorage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ne(){try{n.texImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function qe(){try{n.texImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function je(q){me.equals(q)===!1&&(n.scissor(q.x,q.y,q.z,q.w),me.copy(q))}function $e(q){G.equals(q)===!1&&(n.viewport(q.x,q.y,q.z,q.w),G.copy(q))}function ct(q,Se){let se=l.get(Se);se===void 0&&(se=new WeakMap,l.set(Se,se));let ce=se.get(q);ce===void 0&&(ce=n.getUniformBlockIndex(Se,q.name),se.set(q,ce))}function Qe(q,Se){const ce=l.get(Se).get(q);u.get(Se)!==ce&&(n.uniformBlockBinding(Se,ce,q.__bindingPointIndex),u.set(Se,ce))}function Tt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},ie=null,oe={},d={},h=new WeakMap,f=[],m=null,y=!1,_=null,p=null,x=null,w=null,b=null,I=null,R=null,T=new ot(0,0,0),S=0,C=!1,A=null,L=null,F=null,B=null,N=null,me.set(0,0,n.canvas.width,n.canvas.height),G.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:pe,disable:Le,bindFramebuffer:we,drawBuffers:Oe,useProgram:rt,setBlending:V,setMaterial:tn,setFlipSided:dt,setCullFace:ut,setLineWidth:Be,setPolygonOffset:Mt,setScissorTest:We,activeTexture:k,bindTexture:$,unbindTexture:J,compressedTexImage2D:le,compressedTexImage3D:de,texImage2D:Ne,texImage3D:qe,updateUBOMapping:ct,uniformBlockBinding:Qe,texStorage2D:pt,texStorage3D:ge,texSubImage2D:ae,texSubImage3D:Fe,compressedTexSubImage2D:ve,compressedTexSubImage3D:Ie,scissor:je,viewport:$e,reset:Tt}}function mp(n,e,t,i){const r=lC(i);switch(t){case ny:return n*e;case ry:return n*e;case sy:return n*e*2;case dd:return n*e/r.components*r.byteLength;case hd:return n*e/r.components*r.byteLength;case ay:return n*e*2/r.components*r.byteLength;case fd:return n*e*2/r.components*r.byteLength;case iy:return n*e*3/r.components*r.byteLength;case Dn:return n*e*4/r.components*r.byteLength;case pd:return n*e*4/r.components*r.byteLength;case xo:case bo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case wo:case So:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hc:case pc:return Math.max(n,16)*Math.max(e,8)/4;case dc:case fc:return Math.max(n,8)*Math.max(e,8)/2;case mc:case gc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _c:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case vc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case xc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case bc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case wc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Sc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ec:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Tc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Rc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ic:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case $c:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Mo:case Pc:case Dc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case oy:case Lc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Nc:case kc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lC(n){switch(n){case ai:case Q0:return{byteLength:1,components:1};case ua:case ey:case pa:return{byteLength:2,components:1};case ud:case cd:return{byteLength:2,components:4};case br:case ld:case si:return{byteLength:4,components:1};case ty:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function uC(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ee,c=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(k,$){return f?new OffscreenCanvas(k,$):$o("canvas")}function y(k,$,J){let le=1;const de=We(k);if((de.width>J||de.height>J)&&(le=J/Math.max(de.width,de.height)),le<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){const ae=Math.floor(le*de.width),Fe=Math.floor(le*de.height);d===void 0&&(d=m(ae,Fe));const ve=$?m(ae,Fe):d;return ve.width=ae,ve.height=Fe,ve.getContext("2d").drawImage(k,0,0,ae,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+ae+"x"+Fe+")."),ve}else return"data"in k&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),k;return k}function _(k){return k.generateMipmaps}function p(k){n.generateMipmap(k)}function x(k){return k.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?n.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(k,$,J,le,de=!1){if(k!==null){if(n[k]!==void 0)return n[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let ae=$;if($===n.RED&&(J===n.FLOAT&&(ae=n.R32F),J===n.HALF_FLOAT&&(ae=n.R16F),J===n.UNSIGNED_BYTE&&(ae=n.R8)),$===n.RED_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.R8UI),J===n.UNSIGNED_SHORT&&(ae=n.R16UI),J===n.UNSIGNED_INT&&(ae=n.R32UI),J===n.BYTE&&(ae=n.R8I),J===n.SHORT&&(ae=n.R16I),J===n.INT&&(ae=n.R32I)),$===n.RG&&(J===n.FLOAT&&(ae=n.RG32F),J===n.HALF_FLOAT&&(ae=n.RG16F),J===n.UNSIGNED_BYTE&&(ae=n.RG8)),$===n.RG_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.RG8UI),J===n.UNSIGNED_SHORT&&(ae=n.RG16UI),J===n.UNSIGNED_INT&&(ae=n.RG32UI),J===n.BYTE&&(ae=n.RG8I),J===n.SHORT&&(ae=n.RG16I),J===n.INT&&(ae=n.RG32I)),$===n.RGB_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.RGB8UI),J===n.UNSIGNED_SHORT&&(ae=n.RGB16UI),J===n.UNSIGNED_INT&&(ae=n.RGB32UI),J===n.BYTE&&(ae=n.RGB8I),J===n.SHORT&&(ae=n.RGB16I),J===n.INT&&(ae=n.RGB32I)),$===n.RGBA_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.RGBA8UI),J===n.UNSIGNED_SHORT&&(ae=n.RGBA16UI),J===n.UNSIGNED_INT&&(ae=n.RGBA32UI),J===n.BYTE&&(ae=n.RGBA8I),J===n.SHORT&&(ae=n.RGBA16I),J===n.INT&&(ae=n.RGBA32I)),$===n.RGB&&J===n.UNSIGNED_INT_5_9_9_9_REV&&(ae=n.RGB9_E5),$===n.RGBA){const Fe=de?Ho:yt.getTransfer(le);J===n.FLOAT&&(ae=n.RGBA32F),J===n.HALF_FLOAT&&(ae=n.RGBA16F),J===n.UNSIGNED_BYTE&&(ae=Fe===Ct?n.SRGB8_ALPHA8:n.RGBA8),J===n.UNSIGNED_SHORT_4_4_4_4&&(ae=n.RGBA4),J===n.UNSIGNED_SHORT_5_5_5_1&&(ae=n.RGB5_A1)}return(ae===n.R16F||ae===n.R32F||ae===n.RG16F||ae===n.RG32F||ae===n.RGBA16F||ae===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function b(k,$){let J;return k?$===null||$===br||$===fs?J=n.DEPTH24_STENCIL8:$===si?J=n.DEPTH32F_STENCIL8:$===ua&&(J=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):$===null||$===br||$===fs?J=n.DEPTH_COMPONENT24:$===si?J=n.DEPTH_COMPONENT32F:$===ua&&(J=n.DEPTH_COMPONENT16),J}function I(k,$){return _(k)===!0||k.isFramebufferTexture&&k.minFilter!==En&&k.minFilter!==ri?Math.log2(Math.max($.width,$.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?$.mipmaps.length:1}function R(k){const $=k.target;$.removeEventListener("dispose",R),S($),$.isVideoTexture&&c.delete($)}function T(k){const $=k.target;$.removeEventListener("dispose",T),A($)}function S(k){const $=i.get(k);if($.__webglInit===void 0)return;const J=k.source,le=h.get(J);if(le){const de=le[$.__cacheKey];de.usedTimes--,de.usedTimes===0&&C(k),Object.keys(le).length===0&&h.delete(J)}i.remove(k)}function C(k){const $=i.get(k);n.deleteTexture($.__webglTexture);const J=k.source,le=h.get(J);delete le[$.__cacheKey],a.memory.textures--}function A(k){const $=i.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),i.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray($.__webglFramebuffer[le]))for(let de=0;de<$.__webglFramebuffer[le].length;de++)n.deleteFramebuffer($.__webglFramebuffer[le][de]);else n.deleteFramebuffer($.__webglFramebuffer[le]);$.__webglDepthbuffer&&n.deleteRenderbuffer($.__webglDepthbuffer[le])}else{if(Array.isArray($.__webglFramebuffer))for(let le=0;le<$.__webglFramebuffer.length;le++)n.deleteFramebuffer($.__webglFramebuffer[le]);else n.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&n.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&n.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let le=0;le<$.__webglColorRenderbuffer.length;le++)$.__webglColorRenderbuffer[le]&&n.deleteRenderbuffer($.__webglColorRenderbuffer[le]);$.__webglDepthRenderbuffer&&n.deleteRenderbuffer($.__webglDepthRenderbuffer)}const J=k.textures;for(let le=0,de=J.length;le<de;le++){const ae=i.get(J[le]);ae.__webglTexture&&(n.deleteTexture(ae.__webglTexture),a.memory.textures--),i.remove(J[le])}i.remove(k)}let L=0;function F(){L=0}function B(){const k=L;return k>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+r.maxTextures),L+=1,k}function N(k){const $=[];return $.push(k.wrapS),$.push(k.wrapT),$.push(k.wrapR||0),$.push(k.magFilter),$.push(k.minFilter),$.push(k.anisotropy),$.push(k.internalFormat),$.push(k.format),$.push(k.type),$.push(k.generateMipmaps),$.push(k.premultiplyAlpha),$.push(k.flipY),$.push(k.unpackAlignment),$.push(k.colorSpace),$.join()}function U(k,$){const J=i.get(k);if(k.isVideoTexture&&Be(k),k.isRenderTargetTexture===!1&&k.version>0&&J.__version!==k.version){const le=k.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(J,k,$);return}}t.bindTexture(n.TEXTURE_2D,J.__webglTexture,n.TEXTURE0+$)}function z(k,$){const J=i.get(k);if(k.version>0&&J.__version!==k.version){G(J,k,$);return}t.bindTexture(n.TEXTURE_2D_ARRAY,J.__webglTexture,n.TEXTURE0+$)}function K(k,$){const J=i.get(k);if(k.version>0&&J.__version!==k.version){G(J,k,$);return}t.bindTexture(n.TEXTURE_3D,J.__webglTexture,n.TEXTURE0+$)}function W(k,$){const J=i.get(k);if(k.version>0&&J.__version!==k.version){ue(J,k,$);return}t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture,n.TEXTURE0+$)}const ie={[mr]:n.REPEAT,[gr]:n.CLAMP_TO_EDGE,[cc]:n.MIRRORED_REPEAT},oe={[En]:n.NEAREST,[YS]:n.NEAREST_MIPMAP_NEAREST,[$a]:n.NEAREST_MIPMAP_LINEAR,[ri]:n.LINEAR,[fl]:n.LINEAR_MIPMAP_NEAREST,[_r]:n.LINEAR_MIPMAP_LINEAR},Z={[QS]:n.NEVER,[s2]:n.ALWAYS,[e2]:n.LESS,[uy]:n.LEQUAL,[t2]:n.EQUAL,[r2]:n.GEQUAL,[n2]:n.GREATER,[i2]:n.NOTEQUAL};function he(k,$){if($.type===si&&e.has("OES_texture_float_linear")===!1&&($.magFilter===ri||$.magFilter===fl||$.magFilter===$a||$.magFilter===_r||$.minFilter===ri||$.minFilter===fl||$.minFilter===$a||$.minFilter===_r)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(k,n.TEXTURE_WRAP_S,ie[$.wrapS]),n.texParameteri(k,n.TEXTURE_WRAP_T,ie[$.wrapT]),(k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY)&&n.texParameteri(k,n.TEXTURE_WRAP_R,ie[$.wrapR]),n.texParameteri(k,n.TEXTURE_MAG_FILTER,oe[$.magFilter]),n.texParameteri(k,n.TEXTURE_MIN_FILTER,oe[$.minFilter]),$.compareFunction&&(n.texParameteri(k,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(k,n.TEXTURE_COMPARE_FUNC,Z[$.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if($.magFilter===En||$.minFilter!==$a&&$.minFilter!==_r||$.type===si&&e.has("OES_texture_float_linear")===!1)return;if($.anisotropy>1||i.get($).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");n.texParameterf(k,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min($.anisotropy,r.getMaxAnisotropy())),i.get($).__currentAnisotropy=$.anisotropy}}}function me(k,$){let J=!1;k.__webglInit===void 0&&(k.__webglInit=!0,$.addEventListener("dispose",R));const le=$.source;let de=h.get(le);de===void 0&&(de={},h.set(le,de));const ae=N($);if(ae!==k.__cacheKey){de[ae]===void 0&&(de[ae]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,J=!0),de[ae].usedTimes++;const Fe=de[k.__cacheKey];Fe!==void 0&&(de[k.__cacheKey].usedTimes--,Fe.usedTimes===0&&C($)),k.__cacheKey=ae,k.__webglTexture=de[ae].texture}return J}function G(k,$,J){let le=n.TEXTURE_2D;($.isDataArrayTexture||$.isCompressedArrayTexture)&&(le=n.TEXTURE_2D_ARRAY),$.isData3DTexture&&(le=n.TEXTURE_3D);const de=me(k,$),ae=$.source;t.bindTexture(le,k.__webglTexture,n.TEXTURE0+J);const Fe=i.get(ae);if(ae.version!==Fe.__version||de===!0){t.activeTexture(n.TEXTURE0+J);const ve=yt.getPrimaries(yt.workingColorSpace),Ie=$.colorSpace===Ui?null:yt.getPrimaries($.colorSpace),pt=$.colorSpace===Ui||ve===Ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,$.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,$.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);let ge=y($.image,!1,r.maxTextureSize);ge=Mt($,ge);const Ne=s.convert($.format,$.colorSpace),qe=s.convert($.type);let je=w($.internalFormat,Ne,qe,$.colorSpace,$.isVideoTexture);he(le,$);let $e;const ct=$.mipmaps,Qe=$.isVideoTexture!==!0,Tt=Fe.__version===void 0||de===!0,q=ae.dataReady,Se=I($,ge);if($.isDepthTexture)je=b($.format===ps,$.type),Tt&&(Qe?t.texStorage2D(n.TEXTURE_2D,1,je,ge.width,ge.height):t.texImage2D(n.TEXTURE_2D,0,je,ge.width,ge.height,0,Ne,qe,null));else if($.isDataTexture)if(ct.length>0){Qe&&Tt&&t.texStorage2D(n.TEXTURE_2D,Se,je,ct[0].width,ct[0].height);for(let se=0,ce=ct.length;se<ce;se++)$e=ct[se],Qe?q&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,$e.width,$e.height,Ne,qe,$e.data):t.texImage2D(n.TEXTURE_2D,se,je,$e.width,$e.height,0,Ne,qe,$e.data);$.generateMipmaps=!1}else Qe?(Tt&&t.texStorage2D(n.TEXTURE_2D,Se,je,ge.width,ge.height),q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge.width,ge.height,Ne,qe,ge.data)):t.texImage2D(n.TEXTURE_2D,0,je,ge.width,ge.height,0,Ne,qe,ge.data);else if($.isCompressedTexture)if($.isCompressedArrayTexture){Qe&&Tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,je,ct[0].width,ct[0].height,ge.depth);for(let se=0,ce=ct.length;se<ce;se++)if($e=ct[se],$.format!==Dn)if(Ne!==null)if(Qe){if(q)if($.layerUpdates.size>0){const Ae=mp($e.width,$e.height,$.format,$.type);for(const Te of $.layerUpdates){const Je=$e.data.subarray(Te*Ae/$e.data.BYTES_PER_ELEMENT,(Te+1)*Ae/$e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,Te,$e.width,$e.height,1,Ne,Je)}$.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,$e.width,$e.height,ge.depth,Ne,$e.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,je,$e.width,$e.height,ge.depth,0,$e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qe?q&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,$e.width,$e.height,ge.depth,Ne,qe,$e.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,je,$e.width,$e.height,ge.depth,0,Ne,qe,$e.data)}else{Qe&&Tt&&t.texStorage2D(n.TEXTURE_2D,Se,je,ct[0].width,ct[0].height);for(let se=0,ce=ct.length;se<ce;se++)$e=ct[se],$.format!==Dn?Ne!==null?Qe?q&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,$e.width,$e.height,Ne,$e.data):t.compressedTexImage2D(n.TEXTURE_2D,se,je,$e.width,$e.height,0,$e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?q&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,$e.width,$e.height,Ne,qe,$e.data):t.texImage2D(n.TEXTURE_2D,se,je,$e.width,$e.height,0,Ne,qe,$e.data)}else if($.isDataArrayTexture)if(Qe){if(Tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,je,ge.width,ge.height,ge.depth),q)if($.layerUpdates.size>0){const se=mp(ge.width,ge.height,$.format,$.type);for(const ce of $.layerUpdates){const Ae=ge.data.subarray(ce*se/ge.data.BYTES_PER_ELEMENT,(ce+1)*se/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,ge.width,ge.height,1,Ne,qe,Ae)}$.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Ne,qe,ge.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,je,ge.width,ge.height,ge.depth,0,Ne,qe,ge.data);else if($.isData3DTexture)Qe?(Tt&&t.texStorage3D(n.TEXTURE_3D,Se,je,ge.width,ge.height,ge.depth),q&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Ne,qe,ge.data)):t.texImage3D(n.TEXTURE_3D,0,je,ge.width,ge.height,ge.depth,0,Ne,qe,ge.data);else if($.isFramebufferTexture){if(Tt)if(Qe)t.texStorage2D(n.TEXTURE_2D,Se,je,ge.width,ge.height);else{let se=ge.width,ce=ge.height;for(let Ae=0;Ae<Se;Ae++)t.texImage2D(n.TEXTURE_2D,Ae,je,se,ce,0,Ne,qe,null),se>>=1,ce>>=1}}else if(ct.length>0){if(Qe&&Tt){const se=We(ct[0]);t.texStorage2D(n.TEXTURE_2D,Se,je,se.width,se.height)}for(let se=0,ce=ct.length;se<ce;se++)$e=ct[se],Qe?q&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,Ne,qe,$e):t.texImage2D(n.TEXTURE_2D,se,je,Ne,qe,$e);$.generateMipmaps=!1}else if(Qe){if(Tt){const se=We(ge);t.texStorage2D(n.TEXTURE_2D,Se,je,se.width,se.height)}q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ne,qe,ge)}else t.texImage2D(n.TEXTURE_2D,0,je,Ne,qe,ge);_($)&&p(le),Fe.__version=ae.version,$.onUpdate&&$.onUpdate($)}k.__version=$.version}function ue(k,$,J){if($.image.length!==6)return;const le=me(k,$),de=$.source;t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+J);const ae=i.get(de);if(de.version!==ae.__version||le===!0){t.activeTexture(n.TEXTURE0+J);const Fe=yt.getPrimaries(yt.workingColorSpace),ve=$.colorSpace===Ui?null:yt.getPrimaries($.colorSpace),Ie=$.colorSpace===Ui||Fe===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,$.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,$.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const pt=$.isCompressedTexture||$.image[0].isCompressedTexture,ge=$.image[0]&&$.image[0].isDataTexture,Ne=[];for(let ce=0;ce<6;ce++)!pt&&!ge?Ne[ce]=y($.image[ce],!0,r.maxCubemapSize):Ne[ce]=ge?$.image[ce].image:$.image[ce],Ne[ce]=Mt($,Ne[ce]);const qe=Ne[0],je=s.convert($.format,$.colorSpace),$e=s.convert($.type),ct=w($.internalFormat,je,$e,$.colorSpace),Qe=$.isVideoTexture!==!0,Tt=ae.__version===void 0||le===!0,q=de.dataReady;let Se=I($,qe);he(n.TEXTURE_CUBE_MAP,$);let se;if(pt){Qe&&Tt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,ct,qe.width,qe.height);for(let ce=0;ce<6;ce++){se=Ne[ce].mipmaps;for(let Ae=0;Ae<se.length;Ae++){const Te=se[Ae];$.format!==Dn?je!==null?Qe?q&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae,0,0,Te.width,Te.height,je,Te.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae,ct,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae,0,0,Te.width,Te.height,je,$e,Te.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae,ct,Te.width,Te.height,0,je,$e,Te.data)}}}else{if(se=$.mipmaps,Qe&&Tt){se.length>0&&Se++;const ce=We(Ne[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,ct,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(ge){Qe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ne[ce].width,Ne[ce].height,je,$e,Ne[ce].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ct,Ne[ce].width,Ne[ce].height,0,je,$e,Ne[ce].data);for(let Ae=0;Ae<se.length;Ae++){const Je=se[Ae].image[ce].image;Qe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae+1,0,0,Je.width,Je.height,je,$e,Je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae+1,ct,Je.width,Je.height,0,je,$e,Je.data)}}else{Qe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,je,$e,Ne[ce]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ct,je,$e,Ne[ce]);for(let Ae=0;Ae<se.length;Ae++){const Te=se[Ae];Qe?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae+1,0,0,je,$e,Te.image[ce]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae+1,ct,je,$e,Te.image[ce])}}}_($)&&p(n.TEXTURE_CUBE_MAP),ae.__version=de.version,$.onUpdate&&$.onUpdate($)}k.__version=$.version}function xe(k,$,J,le,de,ae){const Fe=s.convert(J.format,J.colorSpace),ve=s.convert(J.type),Ie=w(J.internalFormat,Fe,ve,J.colorSpace),pt=i.get($),ge=i.get(J);if(ge.__renderTarget=$,!pt.__hasExternalTextures){const Ne=Math.max(1,$.width>>ae),qe=Math.max(1,$.height>>ae);de===n.TEXTURE_3D||de===n.TEXTURE_2D_ARRAY?t.texImage3D(de,ae,Ie,Ne,qe,$.depth,0,Fe,ve,null):t.texImage2D(de,ae,Ie,Ne,qe,0,Fe,ve,null)}t.bindFramebuffer(n.FRAMEBUFFER,k),ut($)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,de,ge.__webglTexture,0,dt($)):(de===n.TEXTURE_2D||de>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,le,de,ge.__webglTexture,ae),t.bindFramebuffer(n.FRAMEBUFFER,null)}function pe(k,$,J){if(n.bindRenderbuffer(n.RENDERBUFFER,k),$.depthBuffer){const le=$.depthTexture,de=le&&le.isDepthTexture?le.type:null,ae=b($.stencilBuffer,de),Fe=$.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=dt($);ut($)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,ae,$.width,$.height):J?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,ae,$.width,$.height):n.renderbufferStorage(n.RENDERBUFFER,ae,$.width,$.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Fe,n.RENDERBUFFER,k)}else{const le=$.textures;for(let de=0;de<le.length;de++){const ae=le[de],Fe=s.convert(ae.format,ae.colorSpace),ve=s.convert(ae.type),Ie=w(ae.internalFormat,Fe,ve,ae.colorSpace),pt=dt($);J&&ut($)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,Ie,$.width,$.height):ut($)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,Ie,$.width,$.height):n.renderbufferStorage(n.RENDERBUFFER,Ie,$.width,$.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(k,$){if($&&$.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,k),!($.depthTexture&&$.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const le=i.get($.depthTexture);le.__renderTarget=$,(!le.__webglTexture||$.depthTexture.image.width!==$.width||$.depthTexture.image.height!==$.height)&&($.depthTexture.image.width=$.width,$.depthTexture.image.height=$.height,$.depthTexture.needsUpdate=!0),U($.depthTexture,0);const de=le.__webglTexture,ae=dt($);if($.depthTexture.format===os)ut($)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0);else if($.depthTexture.format===ps)ut($)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function we(k){const $=i.get(k),J=k.isWebGLCubeRenderTarget===!0;if($.__boundDepthTexture!==k.depthTexture){const le=k.depthTexture;if($.__depthDisposeCallback&&$.__depthDisposeCallback(),le){const de=()=>{delete $.__boundDepthTexture,delete $.__depthDisposeCallback,le.removeEventListener("dispose",de)};le.addEventListener("dispose",de),$.__depthDisposeCallback=de}$.__boundDepthTexture=le}if(k.depthTexture&&!$.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");Le($.__webglFramebuffer,k)}else if(J){$.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(t.bindFramebuffer(n.FRAMEBUFFER,$.__webglFramebuffer[le]),$.__webglDepthbuffer[le]===void 0)$.__webglDepthbuffer[le]=n.createRenderbuffer(),pe($.__webglDepthbuffer[le],k,!1);else{const de=k.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=$.__webglDepthbuffer[le];n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,ae)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,$.__webglFramebuffer),$.__webglDepthbuffer===void 0)$.__webglDepthbuffer=n.createRenderbuffer(),pe($.__webglDepthbuffer,k,!1);else{const le=k.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=$.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,le,n.RENDERBUFFER,de)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(k,$,J){const le=i.get(k);$!==void 0&&xe(le.__webglFramebuffer,k,k.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),J!==void 0&&we(k)}function rt(k){const $=k.texture,J=i.get(k),le=i.get($);k.addEventListener("dispose",T);const de=k.textures,ae=k.isWebGLCubeRenderTarget===!0,Fe=de.length>1;if(Fe||(le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture()),le.__version=$.version,a.memory.textures++),ae){J.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if($.mipmaps&&$.mipmaps.length>0){J.__webglFramebuffer[ve]=[];for(let Ie=0;Ie<$.mipmaps.length;Ie++)J.__webglFramebuffer[ve][Ie]=n.createFramebuffer()}else J.__webglFramebuffer[ve]=n.createFramebuffer()}else{if($.mipmaps&&$.mipmaps.length>0){J.__webglFramebuffer=[];for(let ve=0;ve<$.mipmaps.length;ve++)J.__webglFramebuffer[ve]=n.createFramebuffer()}else J.__webglFramebuffer=n.createFramebuffer();if(Fe)for(let ve=0,Ie=de.length;ve<Ie;ve++){const pt=i.get(de[ve]);pt.__webglTexture===void 0&&(pt.__webglTexture=n.createTexture(),a.memory.textures++)}if(k.samples>0&&ut(k)===!1){J.__webglMultisampledFramebuffer=n.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let ve=0;ve<de.length;ve++){const Ie=de[ve];J.__webglColorRenderbuffer[ve]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,J.__webglColorRenderbuffer[ve]);const pt=s.convert(Ie.format,Ie.colorSpace),ge=s.convert(Ie.type),Ne=w(Ie.internalFormat,pt,ge,Ie.colorSpace,k.isXRRenderTarget===!0),qe=dt(k);n.renderbufferStorageMultisample(n.RENDERBUFFER,qe,Ne,k.width,k.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,J.__webglColorRenderbuffer[ve])}n.bindRenderbuffer(n.RENDERBUFFER,null),k.depthBuffer&&(J.__webglDepthRenderbuffer=n.createRenderbuffer(),pe(J.__webglDepthRenderbuffer,k,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ae){t.bindTexture(n.TEXTURE_CUBE_MAP,le.__webglTexture),he(n.TEXTURE_CUBE_MAP,$);for(let ve=0;ve<6;ve++)if($.mipmaps&&$.mipmaps.length>0)for(let Ie=0;Ie<$.mipmaps.length;Ie++)xe(J.__webglFramebuffer[ve][Ie],k,$,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie);else xe(J.__webglFramebuffer[ve],k,$,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);_($)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let ve=0,Ie=de.length;ve<Ie;ve++){const pt=de[ve],ge=i.get(pt);t.bindTexture(n.TEXTURE_2D,ge.__webglTexture),he(n.TEXTURE_2D,pt),xe(J.__webglFramebuffer,k,pt,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,0),_(pt)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let ve=n.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(ve=k.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,le.__webglTexture),he(ve,$),$.mipmaps&&$.mipmaps.length>0)for(let Ie=0;Ie<$.mipmaps.length;Ie++)xe(J.__webglFramebuffer[Ie],k,$,n.COLOR_ATTACHMENT0,ve,Ie);else xe(J.__webglFramebuffer,k,$,n.COLOR_ATTACHMENT0,ve,0);_($)&&p(ve),t.unbindTexture()}k.depthBuffer&&we(k)}function lt(k){const $=k.textures;for(let J=0,le=$.length;J<le;J++){const de=$[J];if(_(de)){const ae=x(k),Fe=i.get(de).__webglTexture;t.bindTexture(ae,Fe),p(ae),t.unbindTexture()}}}const xt=[],V=[];function tn(k){if(k.samples>0){if(ut(k)===!1){const $=k.textures,J=k.width,le=k.height;let de=n.COLOR_BUFFER_BIT;const ae=k.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Fe=i.get(k),ve=$.length>1;if(ve)for(let Ie=0;Ie<$.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Ie=0;Ie<$.length;Ie++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(de|=n.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(de|=n.STENCIL_BUFFER_BIT)),ve){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);const pt=i.get($[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pt,0)}n.blitFramebuffer(0,0,J,le,0,0,J,le,de,n.NEAREST),u===!0&&(xt.length=0,V.length=0,xt.push(n.COLOR_ATTACHMENT0+Ie),k.depthBuffer&&k.resolveDepthBuffer===!1&&(xt.push(ae),V.push(ae),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,V)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ve)for(let Ie=0;Ie<$.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);const pt=i.get($[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,pt,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&u){const $=k.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[$])}}}function dt(k){return Math.min(r.maxSamples,k.samples)}function ut(k){const $=i.get(k);return k.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&$.__useRenderToTexture!==!1}function Be(k){const $=a.render.frame;c.get(k)!==$&&(c.set(k,$),k.update())}function Mt(k,$){const J=k.colorSpace,le=k.format,de=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||J!==ys&&J!==Ui&&(yt.getTransfer(J)===Ct?(le!==Dn||de!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),$}function We(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(l.width=k.naturalWidth||k.width,l.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(l.width=k.displayWidth,l.height=k.displayHeight):(l.width=k.width,l.height=k.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=U,this.setTexture2DArray=z,this.setTexture3D=K,this.setTextureCube=W,this.rebindTextures=Oe,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=tn,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ut}function cC(n,e){function t(i,r=Ui){let s;const a=yt.getTransfer(r);if(i===ai)return n.UNSIGNED_BYTE;if(i===ud)return n.UNSIGNED_SHORT_4_4_4_4;if(i===cd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ty)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Q0)return n.BYTE;if(i===ey)return n.SHORT;if(i===ua)return n.UNSIGNED_SHORT;if(i===ld)return n.INT;if(i===br)return n.UNSIGNED_INT;if(i===si)return n.FLOAT;if(i===pa)return n.HALF_FLOAT;if(i===ny)return n.ALPHA;if(i===iy)return n.RGB;if(i===Dn)return n.RGBA;if(i===ry)return n.LUMINANCE;if(i===sy)return n.LUMINANCE_ALPHA;if(i===os)return n.DEPTH_COMPONENT;if(i===ps)return n.DEPTH_STENCIL;if(i===dd)return n.RED;if(i===hd)return n.RED_INTEGER;if(i===ay)return n.RG;if(i===fd)return n.RG_INTEGER;if(i===pd)return n.RGBA_INTEGER;if(i===xo||i===bo||i===wo||i===So)if(a===Ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===xo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===So)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===xo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===So)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===dc||i===hc||i===fc||i===pc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===dc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===hc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===pc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mc||i===gc||i===_c)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===mc||i===gc)return a===Ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===_c)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===yc||i===vc||i===xc||i===bc||i===wc||i===Sc||i===Mc||i===Ec||i===Tc||i===Ac||i===Cc||i===Rc||i===Ic||i===$c)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===yc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===vc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===bc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Sc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Mc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ec)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Tc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ac)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Cc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Rc)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ic)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$c)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Mo||i===Pc||i===Dc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Mo)return a===Ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Pc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===oy||i===Lc||i===Nc||i===kc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Mo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Lc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Nc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===kc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class dC extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yr extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hC={type:"move"};class Fl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,u=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const y of e.hand.values()){const _=t.getJointPose(y,i),p=this._getHandJoint(l,y);_!==null&&(p.matrix.fromArray(_.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=_.radius),p.visible=_!==null}const c=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=c.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&h>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hC)))}return o!==null&&(o.visible=r!==null),u!==null&&(u.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new yr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const fC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class mC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new fn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Vi({vertexShader:fC,fragmentShader:pC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mn(new ya(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gC extends Cr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",u=1,l=null,c=null,d=null,h=null,f=null,m=null;const y=new mC,_=t.getContextAttributes();let p=null,x=null;const w=[],b=[],I=new Ee;let R=null;const T=new _n;T.viewport=new $t;const S=new _n;S.viewport=new $t;const C=[T,S],A=new dC;let L=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let ue=w[G];return ue===void 0&&(ue=new Fl,w[G]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(G){let ue=w[G];return ue===void 0&&(ue=new Fl,w[G]=ue),ue.getGripSpace()},this.getHand=function(G){let ue=w[G];return ue===void 0&&(ue=new Fl,w[G]=ue),ue.getHandSpace()};function B(G){const ue=b.indexOf(G.inputSource);if(ue===-1)return;const xe=w[ue];xe!==void 0&&(xe.update(G.inputSource,G.frame,l||a),xe.dispatchEvent({type:G.type,data:G.inputSource}))}function N(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",U);for(let G=0;G<w.length;G++){const ue=b[G];ue!==null&&(b[G]=null,w[G].disconnect(ue))}L=null,F=null,y.reset(),e.setRenderTarget(p),f=null,h=null,d=null,r=null,x=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(G){l=G},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",N),r.addEventListener("inputsourceschange",U),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(I),r.renderState.layers===void 0){const ue={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ue),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new wr(f.framebufferWidth,f.framebufferHeight,{format:Dn,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ue=null,xe=null,pe=null;_.depth&&(pe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=_.stencil?ps:os,xe=_.stencil?fs:br);const Le={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(Le),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new wr(h.textureWidth,h.textureHeight,{format:Dn,type:ai,depthTexture:new Sy(h.textureWidth,h.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(u),l=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function U(G){for(let ue=0;ue<G.removed.length;ue++){const xe=G.removed[ue],pe=b.indexOf(xe);pe>=0&&(b[pe]=null,w[pe].disconnect(xe))}for(let ue=0;ue<G.added.length;ue++){const xe=G.added[ue];let pe=b.indexOf(xe);if(pe===-1){for(let we=0;we<w.length;we++)if(we>=b.length){b.push(xe),pe=we;break}else if(b[we]===null){b[we]=xe,pe=we;break}if(pe===-1)break}const Le=w[pe];Le&&Le.connect(xe)}}const z=new H,K=new H;function W(G,ue,xe){z.setFromMatrixPosition(ue.matrixWorld),K.setFromMatrixPosition(xe.matrixWorld);const pe=z.distanceTo(K),Le=ue.projectionMatrix.elements,we=xe.projectionMatrix.elements,Oe=Le[14]/(Le[10]-1),rt=Le[14]/(Le[10]+1),lt=(Le[9]+1)/Le[5],xt=(Le[9]-1)/Le[5],V=(Le[8]-1)/Le[0],tn=(we[8]+1)/we[0],dt=Oe*V,ut=Oe*tn,Be=pe/(-V+tn),Mt=Be*-V;if(ue.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Mt),G.translateZ(Be),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),Le[10]===-1)G.projectionMatrix.copy(ue.projectionMatrix),G.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const We=Oe+Be,k=rt+Be,$=dt-Mt,J=ut+(pe-Mt),le=lt*rt/k*We,de=xt*rt/k*We;G.projectionMatrix.makePerspective($,J,le,de,We,k),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function ie(G,ue){ue===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(ue.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let ue=G.near,xe=G.far;y.texture!==null&&(y.depthNear>0&&(ue=y.depthNear),y.depthFar>0&&(xe=y.depthFar)),A.near=S.near=T.near=ue,A.far=S.far=T.far=xe,(L!==A.near||F!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),L=A.near,F=A.far),T.layers.mask=G.layers.mask|2,S.layers.mask=G.layers.mask|4,A.layers.mask=T.layers.mask|S.layers.mask;const pe=G.parent,Le=A.cameras;ie(A,pe);for(let we=0;we<Le.length;we++)ie(Le[we],pe);Le.length===2?W(A,T,S):A.projectionMatrix.copy(T.projectionMatrix),oe(G,A,pe)};function oe(G,ue,xe){xe===null?G.matrix.copy(ue.matrixWorld):(G.matrix.copy(xe.matrixWorld),G.matrix.invert(),G.matrix.multiply(ue.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(ue.projectionMatrix),G.projectionMatrixInverse.copy(ue.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Io*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(h===null&&f===null))return u},this.setFoveation=function(G){u=G,h!==null&&(h.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(A)};let Z=null;function he(G,ue){if(c=ue.getViewerPose(l||a),m=ue,c!==null){const xe=c.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let pe=!1;xe.length!==A.cameras.length&&(A.cameras.length=0,pe=!0);for(let we=0;we<xe.length;we++){const Oe=xe[we];let rt=null;if(f!==null)rt=f.getViewport(Oe);else{const xt=d.getViewSubImage(h,Oe);rt=xt.viewport,we===0&&(e.setRenderTargetTextures(x,xt.colorTexture,h.ignoreDepthValues?void 0:xt.depthStencilTexture),e.setRenderTarget(x))}let lt=C[we];lt===void 0&&(lt=new _n,lt.layers.enable(we),lt.viewport=new $t,C[we]=lt),lt.matrix.fromArray(Oe.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(Oe.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(rt.x,rt.y,rt.width,rt.height),we===0&&(A.matrix.copy(lt.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),pe===!0&&A.cameras.push(lt)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const we=d.getDepthInformation(xe[0]);we&&we.isValid&&we.texture&&y.init(e,we,r.renderState)}}for(let xe=0;xe<w.length;xe++){const pe=b[xe],Le=w[xe];pe!==null&&Le!==void 0&&Le.update(pe,ue,l||a)}Z&&Z(G,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),m=null}const me=new by;me.setAnimationLoop(he),this.setAnimationLoop=function(G){Z=G},this.dispose=function(){}}}const tr=new oi,_C=new kt;function yC(n,e){function t(_,p){_.matrixAutoUpdate===!0&&_.updateMatrix(),p.value.copy(_.matrix)}function i(_,p){p.color.getRGB(_.fogColor.value,yy(n)),p.isFog?(_.fogNear.value=p.near,_.fogFar.value=p.far):p.isFogExp2&&(_.fogDensity.value=p.density)}function r(_,p,x,w,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(_,p):p.isMeshToonMaterial?(s(_,p),d(_,p)):p.isMeshPhongMaterial?(s(_,p),c(_,p)):p.isMeshStandardMaterial?(s(_,p),h(_,p),p.isMeshPhysicalMaterial&&f(_,p,b)):p.isMeshMatcapMaterial?(s(_,p),m(_,p)):p.isMeshDepthMaterial?s(_,p):p.isMeshDistanceMaterial?(s(_,p),y(_,p)):p.isMeshNormalMaterial?s(_,p):p.isLineBasicMaterial?(a(_,p),p.isLineDashedMaterial&&o(_,p)):p.isPointsMaterial?u(_,p,x,w):p.isSpriteMaterial?l(_,p):p.isShadowMaterial?(_.color.value.copy(p.color),_.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(_,p){_.opacity.value=p.opacity,p.color&&_.diffuse.value.copy(p.color),p.emissive&&_.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.bumpMap&&(_.bumpMap.value=p.bumpMap,t(p.bumpMap,_.bumpMapTransform),_.bumpScale.value=p.bumpScale,p.side===yn&&(_.bumpScale.value*=-1)),p.normalMap&&(_.normalMap.value=p.normalMap,t(p.normalMap,_.normalMapTransform),_.normalScale.value.copy(p.normalScale),p.side===yn&&_.normalScale.value.negate()),p.displacementMap&&(_.displacementMap.value=p.displacementMap,t(p.displacementMap,_.displacementMapTransform),_.displacementScale.value=p.displacementScale,_.displacementBias.value=p.displacementBias),p.emissiveMap&&(_.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,_.emissiveMapTransform)),p.specularMap&&(_.specularMap.value=p.specularMap,t(p.specularMap,_.specularMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest);const x=e.get(p),w=x.envMap,b=x.envMapRotation;w&&(_.envMap.value=w,tr.copy(b),tr.x*=-1,tr.y*=-1,tr.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),_.envMapRotation.value.setFromMatrix4(_C.makeRotationFromEuler(tr)),_.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=p.reflectivity,_.ior.value=p.ior,_.refractionRatio.value=p.refractionRatio),p.lightMap&&(_.lightMap.value=p.lightMap,_.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,_.lightMapTransform)),p.aoMap&&(_.aoMap.value=p.aoMap,_.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,_.aoMapTransform))}function a(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform))}function o(_,p){_.dashSize.value=p.dashSize,_.totalSize.value=p.dashSize+p.gapSize,_.scale.value=p.scale}function u(_,p,x,w){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.size.value=p.size*x,_.scale.value=w*.5,p.map&&(_.map.value=p.map,t(p.map,_.uvTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function l(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.rotation.value=p.rotation,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function c(_,p){_.specular.value.copy(p.specular),_.shininess.value=Math.max(p.shininess,1e-4)}function d(_,p){p.gradientMap&&(_.gradientMap.value=p.gradientMap)}function h(_,p){_.metalness.value=p.metalness,p.metalnessMap&&(_.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,_.metalnessMapTransform)),_.roughness.value=p.roughness,p.roughnessMap&&(_.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,_.roughnessMapTransform)),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)}function f(_,p,x){_.ior.value=p.ior,p.sheen>0&&(_.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),_.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(_.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,_.sheenColorMapTransform)),p.sheenRoughnessMap&&(_.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,_.sheenRoughnessMapTransform))),p.clearcoat>0&&(_.clearcoat.value=p.clearcoat,_.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(_.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,_.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(_.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&_.clearcoatNormalScale.value.negate())),p.dispersion>0&&(_.dispersion.value=p.dispersion),p.iridescence>0&&(_.iridescence.value=p.iridescence,_.iridescenceIOR.value=p.iridescenceIOR,_.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(_.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,_.iridescenceMapTransform)),p.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),p.transmission>0&&(_.transmission.value=p.transmission,_.transmissionSamplerMap.value=x.texture,_.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(_.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,_.transmissionMapTransform)),_.thickness.value=p.thickness,p.thicknessMap&&(_.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=p.attenuationDistance,_.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(_.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(_.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=p.specularIntensity,_.specularColor.value.copy(p.specularColor),p.specularColorMap&&(_.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,_.specularColorMapTransform)),p.specularIntensityMap&&(_.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,_.specularIntensityMapTransform))}function m(_,p){p.matcap&&(_.matcap.value=p.matcap)}function y(_,p){const x=e.get(p).light;_.referencePosition.value.setFromMatrixPosition(x.matrixWorld),_.nearDistance.value=x.shadow.camera.near,_.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vC(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function u(x,w){const b=w.program;i.uniformBlockBinding(x,b)}function l(x,w){let b=r[x.id];b===void 0&&(m(x),b=c(x),r[x.id]=b,x.addEventListener("dispose",_));const I=w.program;i.updateUBOMapping(x,I);const R=e.render.frame;s[x.id]!==R&&(h(x),s[x.id]=R)}function c(x){const w=d();x.__bindingPointIndex=w;const b=n.createBuffer(),I=x.__size,R=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,I,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const w=r[x.id],b=x.uniforms,I=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let R=0,T=b.length;R<T;R++){const S=Array.isArray(b[R])?b[R]:[b[R]];for(let C=0,A=S.length;C<A;C++){const L=S[C];if(f(L,R,C,I)===!0){const F=L.__offset,B=Array.isArray(L.value)?L.value:[L.value];let N=0;for(let U=0;U<B.length;U++){const z=B[U],K=y(z);typeof z=="number"||typeof z=="boolean"?(L.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,F+N,L.__data)):z.isMatrix3?(L.__data[0]=z.elements[0],L.__data[1]=z.elements[1],L.__data[2]=z.elements[2],L.__data[3]=0,L.__data[4]=z.elements[3],L.__data[5]=z.elements[4],L.__data[6]=z.elements[5],L.__data[7]=0,L.__data[8]=z.elements[6],L.__data[9]=z.elements[7],L.__data[10]=z.elements[8],L.__data[11]=0):(z.toArray(L.__data,N),N+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(x,w,b,I){const R=x.value,T=w+"_"+b;if(I[T]===void 0)return typeof R=="number"||typeof R=="boolean"?I[T]=R:I[T]=R.clone(),!0;{const S=I[T];if(typeof R=="number"||typeof R=="boolean"){if(S!==R)return I[T]=R,!0}else if(S.equals(R)===!1)return S.copy(R),!0}return!1}function m(x){const w=x.uniforms;let b=0;const I=16;for(let T=0,S=w.length;T<S;T++){const C=Array.isArray(w[T])?w[T]:[w[T]];for(let A=0,L=C.length;A<L;A++){const F=C[A],B=Array.isArray(F.value)?F.value:[F.value];for(let N=0,U=B.length;N<U;N++){const z=B[N],K=y(z),W=b%I,ie=W%K.boundary,oe=W+ie;b+=ie,oe!==0&&I-oe<K.storage&&(b+=I-oe),F.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=b,b+=K.storage}}}const R=b%I;return R>0&&(b+=I-R),x.__size=b,x.__cache={},this}function y(x){const w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),w}function _(x){const w=x.target;w.removeEventListener("dispose",_);const b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(const x in r)n.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:u,update:l,dispose:p}}class xC{constructor(e={}){const{canvas:t=l2(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),y=new Int32Array(4);let _=null,p=null;const x=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pn,this.toneMapping=Bi,this.toneMappingExposure=1;const b=this;let I=!1,R=0,T=0,S=null,C=-1,A=null;const L=new $t,F=new $t;let B=null;const N=new ot(0);let U=0,z=t.width,K=t.height,W=1,ie=null,oe=null;const Z=new $t(0,0,z,K),he=new $t(0,0,z,K);let me=!1;const G=new gd;let ue=!1,xe=!1;const pe=new kt,Le=new kt,we=new H,Oe=new $t,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function xt(){return S===null?W:1}let V=i;function tn(D,X){return t.getContext(D,X)}try{const D={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:u,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${od}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",Te,!1),V===null){const X="webgl2";if(V=tn(X,D),V===null)throw tn(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let dt,ut,Be,Mt,We,k,$,J,le,de,ae,Fe,ve,Ie,pt,ge,Ne,qe,je,$e,ct,Qe,Tt,q;function Se(){dt=new ET(V),dt.init(),Qe=new cC(V,dt),ut=new vT(V,dt,e,Qe),Be=new oC(V,dt),ut.reverseDepthBuffer&&h&&Be.buffers.depth.setReversed(!0),Mt=new CT(V),We=new qA,k=new uC(V,dt,Be,We,ut,Qe,Mt),$=new bT(b),J=new MT(b),le=new N2(V),Tt=new _T(V,le),de=new TT(V,le,Mt,Tt),ae=new IT(V,de,le,Mt),je=new RT(V,ut,k),ge=new xT(We),Fe=new WA(b,$,J,dt,ut,Tt,ge),ve=new yC(b,We),Ie=new XA,pt=new eC(dt),qe=new gT(b,$,J,Be,ae,f,u),Ne=new sC(b,ae,ut),q=new vC(V,Mt,ut,Be),$e=new yT(V,dt,Mt),ct=new AT(V,dt,Mt),Mt.programs=Fe.programs,b.capabilities=ut,b.extensions=dt,b.properties=We,b.renderLists=Ie,b.shadowMap=Ne,b.state=Be,b.info=Mt}Se();const se=new gC(b,V);this.xr=se,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const D=dt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=dt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(D){D!==void 0&&(W=D,this.setSize(z,K,!1))},this.getSize=function(D){return D.set(z,K)},this.setSize=function(D,X,ee=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=D,K=X,t.width=Math.floor(D*W),t.height=Math.floor(X*W),ee===!0&&(t.style.width=D+"px",t.style.height=X+"px"),this.setViewport(0,0,D,X)},this.getDrawingBufferSize=function(D){return D.set(z*W,K*W).floor()},this.setDrawingBufferSize=function(D,X,ee){z=D,K=X,W=ee,t.width=Math.floor(D*ee),t.height=Math.floor(X*ee),this.setViewport(0,0,D,X)},this.getCurrentViewport=function(D){return D.copy(L)},this.getViewport=function(D){return D.copy(Z)},this.setViewport=function(D,X,ee,Q){D.isVector4?Z.set(D.x,D.y,D.z,D.w):Z.set(D,X,ee,Q),Be.viewport(L.copy(Z).multiplyScalar(W).round())},this.getScissor=function(D){return D.copy(he)},this.setScissor=function(D,X,ee,Q){D.isVector4?he.set(D.x,D.y,D.z,D.w):he.set(D,X,ee,Q),Be.scissor(F.copy(he).multiplyScalar(W).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(D){Be.setScissorTest(me=D)},this.setOpaqueSort=function(D){ie=D},this.setTransparentSort=function(D){oe=D},this.getClearColor=function(D){return D.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(D=!0,X=!0,ee=!0){let Q=0;if(D){let Y=!1;if(S!==null){const _e=S.texture.format;Y=_e===pd||_e===fd||_e===hd}if(Y){const _e=S.texture.type,Ce=_e===ai||_e===br||_e===ua||_e===fs||_e===ud||_e===cd,ze=qe.getClearColor(),De=qe.getClearAlpha(),Xe=ze.r,He=ze.g,Re=ze.b;Ce?(m[0]=Xe,m[1]=He,m[2]=Re,m[3]=De,V.clearBufferuiv(V.COLOR,0,m)):(y[0]=Xe,y[1]=He,y[2]=Re,y[3]=De,V.clearBufferiv(V.COLOR,0,y))}else Q|=V.COLOR_BUFFER_BIT}X&&(Q|=V.DEPTH_BUFFER_BIT),ee&&(Q|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),Ie.dispose(),pt.dispose(),We.dispose(),$.dispose(),J.dispose(),ae.dispose(),Tt.dispose(),q.dispose(),Fe.dispose(),se.dispose(),se.removeEventListener("sessionstart",Ss),se.removeEventListener("sessionend",Ms),Yn.stop()};function ce(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const D=Mt.autoReset,X=Ne.enabled,ee=Ne.autoUpdate,Q=Ne.needsUpdate,Y=Ne.type;Se(),Mt.autoReset=D,Ne.enabled=X,Ne.autoUpdate=ee,Ne.needsUpdate=Q,Ne.type=Y}function Te(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Je(D){const X=D.target;X.removeEventListener("dispose",Je),Ot(X)}function Ot(D){Gt(D),We.remove(D)}function Gt(D){const X=We.get(D).programs;X!==void 0&&(X.forEach(function(ee){Fe.releaseProgram(ee)}),D.isShaderMaterial&&Fe.releaseShaderCache(D))}this.renderBufferDirect=function(D,X,ee,Q,Y,_e){X===null&&(X=rt);const Ce=Y.isMesh&&Y.matrixWorld.determinant()<0,ze=xa(D,X,ee,Q,Y);Be.setMaterial(Q,Ce);let De=ee.index,Xe=1;if(Q.wireframe===!0){if(De=de.getWireframeAttribute(ee),De===void 0)return;Xe=2}const He=ee.drawRange,Re=ee.attributes.position;let ft=He.start*Xe,At=(He.start+He.count)*Xe;_e!==null&&(ft=Math.max(ft,_e.start*Xe),At=Math.min(At,(_e.start+_e.count)*Xe)),De!==null?(ft=Math.max(ft,0),At=Math.min(At,De.count)):Re!=null&&(ft=Math.max(ft,0),At=Math.min(At,Re.count));const Pt=At-ft;if(Pt<0||Pt===1/0)return;Tt.setup(Y,Q,ze,ee,De);let nn,wt=$e;if(De!==null&&(nn=le.get(De),wt=ct,wt.setIndex(nn)),Y.isMesh)Q.wireframe===!0?(Be.setLineWidth(Q.wireframeLinewidth*xt()),wt.setMode(V.LINES)):wt.setMode(V.TRIANGLES);else if(Y.isLine){let Ve=Q.linewidth;Ve===void 0&&(Ve=1),Be.setLineWidth(Ve*xt()),Y.isLineSegments?wt.setMode(V.LINES):Y.isLineLoop?wt.setMode(V.LINE_LOOP):wt.setMode(V.LINE_STRIP)}else Y.isPoints?wt.setMode(V.POINTS):Y.isSprite&&wt.setMode(V.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)wt.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(dt.get("WEBGL_multi_draw"))wt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Ve=Y._multiDrawStarts,kn=Y._multiDrawCounts,st=Y._multiDrawCount,rn=De?le.get(De).bytesPerElement:1,Ei=We.get(Q).currentProgram.getUniforms();for(let sn=0;sn<st;sn++)Ei.setValue(V,"_gl_DrawID",sn),wt.render(Ve[sn]/rn,kn[sn])}else if(Y.isInstancedMesh)wt.renderInstances(ft,Pt,Y.count);else if(ee.isInstancedBufferGeometry){const Ve=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,kn=Math.min(ee.instanceCount,Ve);wt.renderInstances(ft,Pt,kn)}else wt.render(ft,Pt)};function bt(D,X,ee){D.transparent===!0&&D.side===xi&&D.forceSinglePass===!1?(D.side=yn,D.needsUpdate=!0,qi(D,X,ee),D.side=Fi,D.needsUpdate=!0,qi(D,X,ee),D.side=xi):qi(D,X,ee)}this.compile=function(D,X,ee=null){ee===null&&(ee=D),p=pt.get(ee),p.init(X),w.push(p),ee.traverseVisible(function(Y){Y.isLight&&Y.layers.test(X.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),D!==ee&&D.traverseVisible(function(Y){Y.isLight&&Y.layers.test(X.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights();const Q=new Set;return D.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const _e=Y.material;if(_e)if(Array.isArray(_e))for(let Ce=0;Ce<_e.length;Ce++){const ze=_e[Ce];bt(ze,ee,Y),Q.add(ze)}else bt(_e,ee,Y),Q.add(_e)}),w.pop(),p=null,Q},this.compileAsync=function(D,X,ee=null){const Q=this.compile(D,X,ee);return new Promise(Y=>{function _e(){if(Q.forEach(function(Ce){We.get(Ce).currentProgram.isReady()&&Q.delete(Ce)}),Q.size===0){Y(D);return}setTimeout(_e,10)}dt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let _t=null;function An(D){_t&&_t(D)}function Ss(){Yn.stop()}function Ms(){Yn.start()}const Yn=new by;Yn.setAnimationLoop(An),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(D){_t=D,se.setAnimationLoop(D),D===null?Yn.stop():Yn.start()},se.addEventListener("sessionstart",Ss),se.addEventListener("sessionend",Ms),this.render=function(D,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(X),X=se.getCamera()),D.isScene===!0&&D.onBeforeRender(b,D,X,S),p=pt.get(D,w.length),p.init(X),w.push(p),Le.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),G.setFromProjectionMatrix(Le),xe=this.localClippingEnabled,ue=ge.init(this.clippingPlanes,xe),_=Ie.get(D,x.length),_.init(),x.push(_),se.enabled===!0&&se.isPresenting===!0){const _e=b.xr.getDepthSensingMesh();_e!==null&&Dr(_e,X,-1/0,b.sortObjects)}Dr(D,X,0,b.sortObjects),_.finish(),b.sortObjects===!0&&_.sort(ie,oe),lt=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,lt&&qe.addToRenderList(_,D),this.info.render.frame++,ue===!0&&ge.beginShadows();const ee=p.state.shadowsArray;Ne.render(ee,D,X),ue===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=_.opaque,Y=_.transmissive;if(p.setupLights(),X.isArrayCamera){const _e=X.cameras;if(Y.length>0)for(let Ce=0,ze=_e.length;Ce<ze;Ce++){const De=_e[Ce];Ts(Q,Y,D,De)}lt&&qe.render(D);for(let Ce=0,ze=_e.length;Ce<ze;Ce++){const De=_e[Ce];Es(_,D,De,De.viewport)}}else Y.length>0&&Ts(Q,Y,D,X),lt&&qe.render(D),Es(_,D,X);S!==null&&(k.updateMultisampleRenderTarget(S),k.updateRenderTargetMipmap(S)),D.isScene===!0&&D.onAfterRender(b,D,X),Tt.resetDefaultState(),C=-1,A=null,w.pop(),w.length>0?(p=w[w.length-1],ue===!0&&ge.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?_=x[x.length-1]:_=null};function Dr(D,X,ee,Q){if(D.visible===!1)return;if(D.layers.test(X.layers)){if(D.isGroup)ee=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(X);else if(D.isLight)p.pushLight(D),D.castShadow&&p.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||G.intersectsSprite(D)){Q&&Oe.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Le);const Ce=ae.update(D),ze=D.material;ze.visible&&_.push(D,Ce,ze,ee,Oe.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||G.intersectsObject(D))){const Ce=ae.update(D),ze=D.material;if(Q&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Oe.copy(D.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),Oe.copy(Ce.boundingSphere.center)),Oe.applyMatrix4(D.matrixWorld).applyMatrix4(Le)),Array.isArray(ze)){const De=Ce.groups;for(let Xe=0,He=De.length;Xe<He;Xe++){const Re=De[Xe],ft=ze[Re.materialIndex];ft&&ft.visible&&_.push(D,Ce,ft,ee,Oe.z,Re)}}else ze.visible&&_.push(D,Ce,ze,ee,Oe.z,null)}}const _e=D.children;for(let Ce=0,ze=_e.length;Ce<ze;Ce++)Dr(_e[Ce],X,ee,Q)}function Es(D,X,ee,Q){const Y=D.opaque,_e=D.transmissive,Ce=D.transparent;p.setupLightsView(ee),ue===!0&&ge.setGlobalState(b.clippingPlanes,ee),Q&&Be.viewport(L.copy(Q)),Y.length>0&&Wi(Y,X,ee),_e.length>0&&Wi(_e,X,ee),Ce.length>0&&Wi(Ce,X,ee),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function Ts(D,X,ee,Q){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Q.id]===void 0&&(p.state.transmissionRenderTarget[Q.id]=new wr(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float")?pa:ai,minFilter:_r,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:yt.workingColorSpace}));const _e=p.state.transmissionRenderTarget[Q.id],Ce=Q.viewport||L;_e.setSize(Ce.z,Ce.w);const ze=b.getRenderTarget();b.setRenderTarget(_e),b.getClearColor(N),U=b.getClearAlpha(),U<1&&b.setClearColor(16777215,.5),b.clear(),lt&&qe.render(ee);const De=b.toneMapping;b.toneMapping=Bi;const Xe=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),p.setupLightsView(Q),ue===!0&&ge.setGlobalState(b.clippingPlanes,Q),Wi(D,ee,Q),k.updateMultisampleRenderTarget(_e),k.updateRenderTargetMipmap(_e),dt.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Re=0,ft=X.length;Re<ft;Re++){const At=X[Re],Pt=At.object,nn=At.geometry,wt=At.material,Ve=At.group;if(wt.side===xi&&Pt.layers.test(Q.layers)){const kn=wt.side;wt.side=yn,wt.needsUpdate=!0,As(Pt,ee,Q,nn,wt,Ve),wt.side=kn,wt.needsUpdate=!0,He=!0}}He===!0&&(k.updateMultisampleRenderTarget(_e),k.updateRenderTargetMipmap(_e))}b.setRenderTarget(ze),b.setClearColor(N,U),Xe!==void 0&&(Q.viewport=Xe),b.toneMapping=De}function Wi(D,X,ee){const Q=X.isScene===!0?X.overrideMaterial:null;for(let Y=0,_e=D.length;Y<_e;Y++){const Ce=D[Y],ze=Ce.object,De=Ce.geometry,Xe=Q===null?Ce.material:Q,He=Ce.group;ze.layers.test(ee.layers)&&As(ze,X,ee,De,Xe,He)}}function As(D,X,ee,Q,Y,_e){D.onBeforeRender(b,X,ee,Q,Y,_e),D.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),Y.onBeforeRender(b,X,ee,Q,D,_e),Y.transparent===!0&&Y.side===xi&&Y.forceSinglePass===!1?(Y.side=yn,Y.needsUpdate=!0,b.renderBufferDirect(ee,X,Q,Y,D,_e),Y.side=Fi,Y.needsUpdate=!0,b.renderBufferDirect(ee,X,Q,Y,D,_e),Y.side=xi):b.renderBufferDirect(ee,X,Q,Y,D,_e),D.onAfterRender(b,X,ee,Q,Y,_e)}function qi(D,X,ee){X.isScene!==!0&&(X=rt);const Q=We.get(D),Y=p.state.lights,_e=p.state.shadowsArray,Ce=Y.state.version,ze=Fe.getParameters(D,Y.state,_e,X,ee),De=Fe.getProgramCacheKey(ze);let Xe=Q.programs;Q.environment=D.isMeshStandardMaterial?X.environment:null,Q.fog=X.fog,Q.envMap=(D.isMeshStandardMaterial?J:$).get(D.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&D.envMap===null?X.environmentRotation:D.envMapRotation,Xe===void 0&&(D.addEventListener("dispose",Je),Xe=new Map,Q.programs=Xe);let He=Xe.get(De);if(He!==void 0){if(Q.currentProgram===He&&Q.lightsStateVersion===Ce)return Rs(D,ze),He}else ze.uniforms=Fe.getUniforms(D),D.onBeforeCompile(ze,b),He=Fe.acquireProgram(ze,De),Xe.set(De,He),Q.uniforms=ze.uniforms;const Re=Q.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Re.clippingPlanes=ge.uniform),Rs(D,ze),Q.needsLights=Cn(D),Q.lightsStateVersion=Ce,Q.needsLights&&(Re.ambientLightColor.value=Y.state.ambient,Re.lightProbe.value=Y.state.probe,Re.directionalLights.value=Y.state.directional,Re.directionalLightShadows.value=Y.state.directionalShadow,Re.spotLights.value=Y.state.spot,Re.spotLightShadows.value=Y.state.spotShadow,Re.rectAreaLights.value=Y.state.rectArea,Re.ltc_1.value=Y.state.rectAreaLTC1,Re.ltc_2.value=Y.state.rectAreaLTC2,Re.pointLights.value=Y.state.point,Re.pointLightShadows.value=Y.state.pointShadow,Re.hemisphereLights.value=Y.state.hemi,Re.directionalShadowMap.value=Y.state.directionalShadowMap,Re.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Re.spotShadowMap.value=Y.state.spotShadowMap,Re.spotLightMatrix.value=Y.state.spotLightMatrix,Re.spotLightMap.value=Y.state.spotLightMap,Re.pointShadowMap.value=Y.state.pointShadowMap,Re.pointShadowMatrix.value=Y.state.pointShadowMatrix),Q.currentProgram=He,Q.uniformsList=null,He}function Cs(D){if(D.uniformsList===null){const X=D.currentProgram.getUniforms();D.uniformsList=To.seqWithValue(X.seq,D.uniforms)}return D.uniformsList}function Rs(D,X){const ee=We.get(D);ee.outputColorSpace=X.outputColorSpace,ee.batching=X.batching,ee.batchingColor=X.batchingColor,ee.instancing=X.instancing,ee.instancingColor=X.instancingColor,ee.instancingMorph=X.instancingMorph,ee.skinning=X.skinning,ee.morphTargets=X.morphTargets,ee.morphNormals=X.morphNormals,ee.morphColors=X.morphColors,ee.morphTargetsCount=X.morphTargetsCount,ee.numClippingPlanes=X.numClippingPlanes,ee.numIntersection=X.numClipIntersection,ee.vertexAlphas=X.vertexAlphas,ee.vertexTangents=X.vertexTangents,ee.toneMapping=X.toneMapping}function xa(D,X,ee,Q,Y){X.isScene!==!0&&(X=rt),k.resetTextureUnits();const _e=X.fog,Ce=Q.isMeshStandardMaterial?X.environment:null,ze=S===null?b.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:ys,De=(Q.isMeshStandardMaterial?J:$).get(Q.envMap||Ce),Xe=Q.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,He=!!ee.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Re=!!ee.morphAttributes.position,ft=!!ee.morphAttributes.normal,At=!!ee.morphAttributes.color;let Pt=Bi;Q.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(Pt=b.toneMapping);const nn=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,wt=nn!==void 0?nn.length:0,Ve=We.get(Q),kn=p.state.lights;if(ue===!0&&(xe===!0||D!==A)){const pn=D===A&&Q.id===C;ge.setState(Q,D,pn)}let st=!1;Q.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==kn.state.version||Ve.outputColorSpace!==ze||Y.isBatchedMesh&&Ve.batching===!1||!Y.isBatchedMesh&&Ve.batching===!0||Y.isBatchedMesh&&Ve.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ve.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ve.instancing===!1||!Y.isInstancedMesh&&Ve.instancing===!0||Y.isSkinnedMesh&&Ve.skinning===!1||!Y.isSkinnedMesh&&Ve.skinning===!0||Y.isInstancedMesh&&Ve.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ve.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ve.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ve.instancingMorph===!1&&Y.morphTexture!==null||Ve.envMap!==De||Q.fog===!0&&Ve.fog!==_e||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ge.numPlanes||Ve.numIntersection!==ge.numIntersection)||Ve.vertexAlphas!==Xe||Ve.vertexTangents!==He||Ve.morphTargets!==Re||Ve.morphNormals!==ft||Ve.morphColors!==At||Ve.toneMapping!==Pt||Ve.morphTargetsCount!==wt)&&(st=!0):(st=!0,Ve.__version=Q.version);let rn=Ve.currentProgram;st===!0&&(rn=qi(Q,X,Y));let Ei=!1,sn=!1,ji=!1;const Dt=rn.getUniforms(),Rn=Ve.uniforms;if(Be.useProgram(rn.program)&&(Ei=!0,sn=!0,ji=!0),Q.id!==C&&(C=Q.id,sn=!0),Ei||A!==D){Be.buffers.depth.getReversed()?(pe.copy(D.projectionMatrix),c2(pe),d2(pe),Dt.setValue(V,"projectionMatrix",pe)):Dt.setValue(V,"projectionMatrix",D.projectionMatrix),Dt.setValue(V,"viewMatrix",D.matrixWorldInverse);const Kn=Dt.map.cameraPosition;Kn!==void 0&&Kn.setValue(V,we.setFromMatrixPosition(D.matrixWorld)),ut.logarithmicDepthBuffer&&Dt.setValue(V,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Dt.setValue(V,"isOrthographic",D.isOrthographicCamera===!0),A!==D&&(A=D,sn=!0,ji=!0)}if(Y.isSkinnedMesh){Dt.setOptional(V,Y,"bindMatrix"),Dt.setOptional(V,Y,"bindMatrixInverse");const pn=Y.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),Dt.setValue(V,"boneTexture",pn.boneTexture,k))}Y.isBatchedMesh&&(Dt.setOptional(V,Y,"batchingTexture"),Dt.setValue(V,"batchingTexture",Y._matricesTexture,k),Dt.setOptional(V,Y,"batchingIdTexture"),Dt.setValue(V,"batchingIdTexture",Y._indirectTexture,k),Dt.setOptional(V,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Dt.setValue(V,"batchingColorTexture",Y._colorsTexture,k));const Xi=ee.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&je.update(Y,ee,rn),(sn||Ve.receiveShadow!==Y.receiveShadow)&&(Ve.receiveShadow=Y.receiveShadow,Dt.setValue(V,"receiveShadow",Y.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(Rn.envMap.value=De,Rn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&X.environment!==null&&(Rn.envMapIntensity.value=X.environmentIntensity),sn&&(Dt.setValue(V,"toneMappingExposure",b.toneMappingExposure),Ve.needsLights&&Ko(Rn,ji),_e&&Q.fog===!0&&ve.refreshFogUniforms(Rn,_e),ve.refreshMaterialUniforms(Rn,Q,W,K,p.state.transmissionRenderTarget[D.id]),To.upload(V,Cs(Ve),Rn,k)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(To.upload(V,Cs(Ve),Rn,k),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Dt.setValue(V,"center",Y.center),Dt.setValue(V,"modelViewMatrix",Y.modelViewMatrix),Dt.setValue(V,"normalMatrix",Y.normalMatrix),Dt.setValue(V,"modelMatrix",Y.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const pn=Q.uniformsGroups;for(let Kn=0,Zn=pn.length;Kn<Zn;Kn++){const ba=pn[Kn];q.update(ba,rn),q.bind(ba,rn)}}return rn}function Ko(D,X){D.ambientLightColor.needsUpdate=X,D.lightProbe.needsUpdate=X,D.directionalLights.needsUpdate=X,D.directionalLightShadows.needsUpdate=X,D.pointLights.needsUpdate=X,D.pointLightShadows.needsUpdate=X,D.spotLights.needsUpdate=X,D.spotLightShadows.needsUpdate=X,D.rectAreaLights.needsUpdate=X,D.hemisphereLights.needsUpdate=X}function Cn(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(D,X,ee){We.get(D.texture).__webglTexture=X,We.get(D.depthTexture).__webglTexture=ee;const Q=We.get(D);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=ee===void 0,Q.__autoAllocateDepthBuffer||dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,X){const ee=We.get(D);ee.__webglFramebuffer=X,ee.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(D,X=0,ee=0){S=D,R=X,T=ee;let Q=!0,Y=null,_e=!1,Ce=!1;if(D){const De=We.get(D);if(De.__useDefaultFramebuffer!==void 0)Be.bindFramebuffer(V.FRAMEBUFFER,null),Q=!1;else if(De.__webglFramebuffer===void 0)k.setupRenderTarget(D);else if(De.__hasExternalTextures)k.rebindTextures(D,We.get(D.texture).__webglTexture,We.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const Re=D.depthTexture;if(De.__boundDepthTexture!==Re){if(Re!==null&&We.has(Re)&&(D.width!==Re.image.width||D.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(D)}}const Xe=D.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Ce=!0);const He=We.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(He[X])?Y=He[X][ee]:Y=He[X],_e=!0):D.samples>0&&k.useMultisampledRTT(D)===!1?Y=We.get(D).__webglMultisampledFramebuffer:Array.isArray(He)?Y=He[ee]:Y=He,L.copy(D.viewport),F.copy(D.scissor),B=D.scissorTest}else L.copy(Z).multiplyScalar(W).floor(),F.copy(he).multiplyScalar(W).floor(),B=me;if(Be.bindFramebuffer(V.FRAMEBUFFER,Y)&&Q&&Be.drawBuffers(D,Y),Be.viewport(L),Be.scissor(F),Be.setScissorTest(B),_e){const De=We.get(D.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+X,De.__webglTexture,ee)}else if(Ce){const De=We.get(D.texture),Xe=X||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,De.__webglTexture,ee||0,Xe)}C=-1},this.readRenderTargetPixels=function(D,X,ee,Q,Y,_e,Ce){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=We.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ce!==void 0&&(ze=ze[Ce]),ze){Be.bindFramebuffer(V.FRAMEBUFFER,ze);try{const De=D.texture,Xe=De.format,He=De.type;if(!ut.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=D.width-Q&&ee>=0&&ee<=D.height-Y&&V.readPixels(X,ee,Q,Y,Qe.convert(Xe),Qe.convert(He),_e)}finally{const De=S!==null?We.get(S).__webglFramebuffer:null;Be.bindFramebuffer(V.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(D,X,ee,Q,Y,_e,Ce){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=We.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ce!==void 0&&(ze=ze[Ce]),ze){const De=D.texture,Xe=De.format,He=De.type;if(!ut.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=D.width-Q&&ee>=0&&ee<=D.height-Y){Be.bindFramebuffer(V.FRAMEBUFFER,ze);const Re=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Re),V.bufferData(V.PIXEL_PACK_BUFFER,_e.byteLength,V.STREAM_READ),V.readPixels(X,ee,Q,Y,Qe.convert(Xe),Qe.convert(He),0);const ft=S!==null?We.get(S).__webglFramebuffer:null;Be.bindFramebuffer(V.FRAMEBUFFER,ft);const At=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await u2(V,At,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Re),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,_e),V.deleteBuffer(Re),V.deleteSync(At),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,X=null,ee=0){D.isTexture!==!0&&(Js("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,D=arguments[1]);const Q=Math.pow(2,-ee),Y=Math.floor(D.image.width*Q),_e=Math.floor(D.image.height*Q),Ce=X!==null?X.x:0,ze=X!==null?X.y:0;k.setTexture2D(D,0),V.copyTexSubImage2D(V.TEXTURE_2D,ee,0,0,Ce,ze,Y,_e),Be.unbindTexture()},this.copyTextureToTexture=function(D,X,ee=null,Q=null,Y=0){D.isTexture!==!0&&(Js("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,D=arguments[1],X=arguments[2],Y=arguments[3]||0,ee=null);let _e,Ce,ze,De,Xe,He,Re,ft,At;const Pt=D.isCompressedTexture?D.mipmaps[Y]:D.image;ee!==null?(_e=ee.max.x-ee.min.x,Ce=ee.max.y-ee.min.y,ze=ee.isBox3?ee.max.z-ee.min.z:1,De=ee.min.x,Xe=ee.min.y,He=ee.isBox3?ee.min.z:0):(_e=Pt.width,Ce=Pt.height,ze=Pt.depth||1,De=0,Xe=0,He=0),Q!==null?(Re=Q.x,ft=Q.y,At=Q.z):(Re=0,ft=0,At=0);const nn=Qe.convert(X.format),wt=Qe.convert(X.type);let Ve;X.isData3DTexture?(k.setTexture3D(X,0),Ve=V.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(k.setTexture2DArray(X,0),Ve=V.TEXTURE_2D_ARRAY):(k.setTexture2D(X,0),Ve=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,X.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,X.unpackAlignment);const kn=V.getParameter(V.UNPACK_ROW_LENGTH),st=V.getParameter(V.UNPACK_IMAGE_HEIGHT),rn=V.getParameter(V.UNPACK_SKIP_PIXELS),Ei=V.getParameter(V.UNPACK_SKIP_ROWS),sn=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,Pt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Pt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,De),V.pixelStorei(V.UNPACK_SKIP_ROWS,Xe),V.pixelStorei(V.UNPACK_SKIP_IMAGES,He);const ji=D.isDataArrayTexture||D.isData3DTexture,Dt=X.isDataArrayTexture||X.isData3DTexture;if(D.isRenderTargetTexture||D.isDepthTexture){const Rn=We.get(D),Xi=We.get(X),pn=We.get(Rn.__renderTarget),Kn=We.get(Xi.__renderTarget);Be.bindFramebuffer(V.READ_FRAMEBUFFER,pn.__webglFramebuffer),Be.bindFramebuffer(V.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Zn=0;Zn<ze;Zn++)ji&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,We.get(D).__webglTexture,Y,He+Zn),D.isDepthTexture?(Dt&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,We.get(X).__webglTexture,Y,At+Zn),V.blitFramebuffer(De,Xe,_e,Ce,Re,ft,_e,Ce,V.DEPTH_BUFFER_BIT,V.NEAREST)):Dt?V.copyTexSubImage3D(Ve,Y,Re,ft,At+Zn,De,Xe,_e,Ce):V.copyTexSubImage2D(Ve,Y,Re,ft,At+Zn,De,Xe,_e,Ce);Be.bindFramebuffer(V.READ_FRAMEBUFFER,null),Be.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Dt?D.isDataTexture||D.isData3DTexture?V.texSubImage3D(Ve,Y,Re,ft,At,_e,Ce,ze,nn,wt,Pt.data):X.isCompressedArrayTexture?V.compressedTexSubImage3D(Ve,Y,Re,ft,At,_e,Ce,ze,nn,Pt.data):V.texSubImage3D(Ve,Y,Re,ft,At,_e,Ce,ze,nn,wt,Pt):D.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Y,Re,ft,_e,Ce,nn,wt,Pt.data):D.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Y,Re,ft,Pt.width,Pt.height,nn,Pt.data):V.texSubImage2D(V.TEXTURE_2D,Y,Re,ft,_e,Ce,nn,wt,Pt);V.pixelStorei(V.UNPACK_ROW_LENGTH,kn),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,st),V.pixelStorei(V.UNPACK_SKIP_PIXELS,rn),V.pixelStorei(V.UNPACK_SKIP_ROWS,Ei),V.pixelStorei(V.UNPACK_SKIP_IMAGES,sn),Y===0&&X.generateMipmaps&&V.generateMipmap(Ve),Be.unbindTexture()},this.copyTextureToTexture3D=function(D,X,ee=null,Q=null,Y=0){return D.isTexture!==!0&&(Js("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ee=arguments[0]||null,Q=arguments[1]||null,D=arguments[2],X=arguments[3],Y=arguments[4]||0),Js('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(D,X,ee,Q,Y)},this.initRenderTarget=function(D){We.get(D).__webglFramebuffer===void 0&&k.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?k.setTextureCube(D,0):D.isData3DTexture?k.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?k.setTexture2DArray(D,0):k.setTexture2D(D,0),Be.unbindTexture()},this.resetState=function(){R=0,T=0,S=null,Be.reset(),Tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=yt._getDrawingBufferColorSpace(e),t.unpackColorSpace=yt._getUnpackColorSpace()}}class yd{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ot(e),this.near=t,this.far=i}clone(){return new yd(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bC extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Cy extends fn{constructor(e=null,t=1,i=1,r,s,a,o,u,l=En,c=En,d,h){super(null,a,o,u,l,c,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Uc extends vn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xr=new kt,gp=new kt,Ja=[],_p=new Rr,wC=new kt,Us=new Mn,zs=new ga;class SC extends Mn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Uc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,wC)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xr),_p.copy(e.boundingBox).applyMatrix4(Xr),this.boundingBox.union(_p)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ga),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xr),zs.copy(e.boundingSphere).applyMatrix4(Xr),this.boundingSphere.union(zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Us.geometry=this.geometry,Us.material=this.material,Us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(i),e.ray.intersectsSphere(zs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Xr),gp.multiplyMatrices(i,Xr),Us.matrixWorld=gp,Us.raycast(e,Ja);for(let a=0,o=Ja.length;a<o;a++){const u=Ja[a];u.instanceId=s,u.object=this,t.push(u)}Ja.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Cy(new Float32Array(r*this.count),r,this.count,dd,si));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,u=r*e;s[u]=o,s.set(i,u+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ui{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,u=s-1,l;for(;o<=u;)if(r=Math.floor(o+(u-o)/2),l=i[r]-a,l<0)o=r+1;else if(l>0)u=r-1;else{u=r;break}if(r=u,i[r]===a)return r/(s-1);const c=i[r],h=i[r+1]-c,f=(a-c)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),u=t||(a.isVector2?new Ee:new H);return u.copy(o).sub(a).normalize(),u}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new H,r=[],s=[],a=[],o=new H,u=new kt;for(let f=0;f<=e;f++){const m=f/e;r[f]=this.getTangentAt(m,new H)}s[0]=new H,a[0]=new H;let l=Number.MAX_VALUE;const c=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);c<=l&&(l=c,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),h<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(qt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(u.makeRotationAxis(o,m))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(qt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(u.makeRotationAxis(r[m],f*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class vd extends ui{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=u}getPoint(e,t=new Ee){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let u=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=u-this.aX,f=l-this.aY;u=h*c-f*d+this.aX,l=h*d+f*c+this.aY}return i.set(u,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class MC extends vd{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function xd(){let n=0,e=0,t=0,i=0;function r(s,a,o,u){n=s,e=o,t=-3*s+3*a-2*o-u,i=2*s-2*a+o+u}return{initCatmullRom:function(s,a,o,u,l){r(a,o,l*(o-s),l*(u-a))},initNonuniformCatmullRom:function(s,a,o,u,l,c,d){let h=(a-s)/l-(o-s)/(l+c)+(o-a)/c,f=(o-a)/c-(u-a)/(c+d)+(u-o)/d;h*=c,f*=c,r(a,o,h,f)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const Qa=new H,Vl=new xd,Hl=new xd,Gl=new xd;class EC extends ui{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new H){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),u=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:u===0&&o===s-1&&(o=s-2,u=1);let l,c;this.closed||o>0?l=r[(o-1)%s]:(Qa.subVectors(r[0],r[1]).add(r[0]),l=Qa);const d=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?c=r[(o+2)%s]:(Qa.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=Qa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(c),f);y<1e-4&&(y=1),m<1e-4&&(m=y),_<1e-4&&(_=y),Vl.initNonuniformCatmullRom(l.x,d.x,h.x,c.x,m,y,_),Hl.initNonuniformCatmullRom(l.y,d.y,h.y,c.y,m,y,_),Gl.initNonuniformCatmullRom(l.z,d.z,h.z,c.z,m,y,_)}else this.curveType==="catmullrom"&&(Vl.initCatmullRom(l.x,d.x,h.x,c.x,this.tension),Hl.initCatmullRom(l.y,d.y,h.y,c.y,this.tension),Gl.initCatmullRom(l.z,d.z,h.z,c.z,this.tension));return i.set(Vl.calc(u),Hl.calc(u),Gl.calc(u)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new H().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function yp(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,u=n*o;return(2*t-2*i+s+a)*u+(-3*t+3*i-2*s-a)*o+s*n+t}function TC(n,e){const t=1-n;return t*t*e}function AC(n,e){return 2*(1-n)*n*e}function CC(n,e){return n*n*e}function sa(n,e,t,i){return TC(n,e)+AC(n,t)+CC(n,i)}function RC(n,e){const t=1-n;return t*t*t*e}function IC(n,e){const t=1-n;return 3*t*t*n*e}function $C(n,e){return 3*(1-n)*n*n*e}function PC(n,e){return n*n*n*e}function aa(n,e,t,i,r){return RC(n,e)+IC(n,t)+$C(n,i)+PC(n,r)}class Ry extends ui{constructor(e=new Ee,t=new Ee,i=new Ee,r=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Ee){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(aa(e,r.x,s.x,a.x,o.x),aa(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class DC extends ui{constructor(e=new H,t=new H,i=new H,r=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new H){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(aa(e,r.x,s.x,a.x,o.x),aa(e,r.y,s.y,a.y,o.y),aa(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Iy extends ui{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class LC extends ui{constructor(e=new H,t=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new H){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $y extends ui{constructor(e=new Ee,t=new Ee,i=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ee){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(sa(e,r.x,s.x,a.x),sa(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class NC extends ui{constructor(e=new H,t=new H,i=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new H){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(sa(e,r.x,s.x,a.x),sa(e,r.y,s.y,a.y),sa(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Py extends ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,u=r[a===0?a:a-1],l=r[a],c=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return i.set(yp(o,u.x,l.x,c.x,d.x),yp(o,u.y,l.y,c.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Ee().fromArray(r))}return this}}var vp=Object.freeze({__proto__:null,ArcCurve:MC,CatmullRomCurve3:EC,CubicBezierCurve:Ry,CubicBezierCurve3:DC,EllipseCurve:vd,LineCurve:Iy,LineCurve3:LC,QuadraticBezierCurve:$y,QuadraticBezierCurve3:NC,SplineCurve:Py});class kC extends ui{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new vp[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],u=o.getLength(),l=u===0?0:1-a/u;return o.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,u=a.getPoints(o);for(let l=0;l<u.length;l++){const c=u[l];i&&i.equals(c)||(t.push(c),i=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new vp[r.type]().fromJSON(r))}return this}}class OC extends kC{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Iy(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new $y(this.currentPoint.clone(),new Ee(e,t),new Ee(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Ry(this.currentPoint.clone(),new Ee(e,t),new Ee(i,r),new Ee(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Py(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+o,t+u,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,u){const l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+l,t+c,i,r,s,a,o,u),this}absellipse(e,t,i,r,s,a,o,u){const l=new vd(e,t,i,r,s,a,o,u);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class bd extends Xn{constructor(e=[new Ee(0,-.5),new Ee(.5,0),new Ee(0,.5)],t=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:r},t=Math.floor(t),r=qt(r,0,Math.PI*2);const s=[],a=[],o=[],u=[],l=[],c=1/t,d=new H,h=new Ee,f=new H,m=new H,y=new H;let _=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:_=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-_,f.z=p*0,y.copy(f),f.normalize(),u.push(f.x,f.y,f.z);break;case e.length-1:u.push(y.x,y.y,y.z);break;default:_=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-_,f.z=p*0,m.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),u.push(f.x,f.y,f.z),y.copy(m)}for(let x=0;x<=t;x++){const w=i+x*c*r,b=Math.sin(w),I=Math.cos(w);for(let R=0;R<=e.length-1;R++){d.x=e[R].x*b,d.y=e[R].y,d.z=e[R].x*I,a.push(d.x,d.y,d.z),h.x=x/t,h.y=R/(e.length-1),o.push(h.x,h.y);const T=u[3*R+0]*b,S=u[3*R+1],C=u[3*R+0]*I;l.push(T,S,C)}}for(let x=0;x<t;x++)for(let w=0;w<e.length-1;w++){const b=w+x*e.length,I=b,R=b+e.length,T=b+e.length+1,S=b+1;s.push(I,R,S),s.push(T,S,R)}this.setIndex(s),this.setAttribute("position",new cn(a,3)),this.setAttribute("uv",new cn(o,2)),this.setAttribute("normal",new cn(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bd(e.points,e.segments,e.phiStart,e.phiLength)}}class wd extends bd{constructor(e=1,t=1,i=4,r=8){const s=new OC;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:r}}static fromJSON(e){return new wd(e.radius,e.length,e.capSegments,e.radialSegments)}}class Sd extends Xn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:u};const l=this;r=Math.floor(r),s=Math.floor(s);const c=[],d=[],h=[],f=[];let m=0;const y=[],_=i/2;let p=0;x(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(c),this.setAttribute("position",new cn(d,3)),this.setAttribute("normal",new cn(h,3)),this.setAttribute("uv",new cn(f,2));function x(){const b=new H,I=new H;let R=0;const T=(t-e)/i;for(let S=0;S<=s;S++){const C=[],A=S/s,L=A*(t-e)+e;for(let F=0;F<=r;F++){const B=F/r,N=B*u+o,U=Math.sin(N),z=Math.cos(N);I.x=L*U,I.y=-A*i+_,I.z=L*z,d.push(I.x,I.y,I.z),b.set(U,T,z).normalize(),h.push(b.x,b.y,b.z),f.push(B,1-A),C.push(m++)}y.push(C)}for(let S=0;S<r;S++)for(let C=0;C<s;C++){const A=y[C][S],L=y[C+1][S],F=y[C+1][S+1],B=y[C][S+1];(e>0||C!==0)&&(c.push(A,L,B),R+=3),(t>0||C!==s-1)&&(c.push(L,F,B),R+=3)}l.addGroup(p,R,0),p+=R}function w(b){const I=m,R=new Ee,T=new H;let S=0;const C=b===!0?e:t,A=b===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,_*A,0),h.push(0,A,0),f.push(.5,.5),m++;const L=m;for(let F=0;F<=r;F++){const N=F/r*u+o,U=Math.cos(N),z=Math.sin(N);T.x=C*z,T.y=_*A,T.z=C*U,d.push(T.x,T.y,T.z),h.push(0,A,0),R.x=U*.5+.5,R.y=z*.5*A+.5,f.push(R.x,R.y),m++}for(let F=0;F<r;F++){const B=I+F,N=L+F;b===!0?c.push(N,N+1,B):c.push(N+1,N,B),S+=3}l.addGroup(p,S,b===!0?1:2),p+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sd(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class us extends Xn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const u=Math.min(a+o,Math.PI);let l=0;const c=[],d=new H,h=new H,f=[],m=[],y=[],_=[];for(let p=0;p<=i;p++){const x=[],w=p/i;let b=0;p===0&&a===0?b=.5/t:p===i&&u===Math.PI&&(b=-.5/t);for(let I=0;I<=t;I++){const R=I/t;d.x=-e*Math.cos(r+R*s)*Math.sin(a+w*o),d.y=e*Math.cos(a+w*o),d.z=e*Math.sin(r+R*s)*Math.sin(a+w*o),m.push(d.x,d.y,d.z),h.copy(d).normalize(),y.push(h.x,h.y,h.z),_.push(R+b,1-w),x.push(l++)}c.push(x)}for(let p=0;p<i;p++)for(let x=0;x<t;x++){const w=c[p][x+1],b=c[p][x],I=c[p+1][x],R=c[p+1][x+1];(p!==0||a>0)&&f.push(w,b,R),(p!==i-1||u<Math.PI)&&f.push(b,I,R)}this.setIndex(f),this.setAttribute("position",new cn(m,3)),this.setAttribute("normal",new cn(y,3)),this.setAttribute("uv",new cn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Dy extends _a{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ly,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xp extends Dy{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ot(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ot(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ot(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class va extends Ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class UC extends va{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Wl=new kt,bp=new H,wp=new H;class Md{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.map=null,this.mapPass=null,this.matrix=new kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gd,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;bp.setFromMatrixPosition(e.matrixWorld),t.position.copy(bp),wp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wp),t.updateMatrixWorld(),Wl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Wl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class zC extends Md{constructor(){super(new _n(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=Io*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ly extends va{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new zC}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Sp=new kt,Bs=new H,ql=new H;class BC extends Md{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new $t(2,1,1,1),new $t(0,1,1,1),new $t(3,1,1,1),new $t(1,1,1,1),new $t(3,0,1,1),new $t(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Bs.setFromMatrixPosition(e.matrixWorld),i.position.copy(Bs),ql.copy(i.position),ql.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ql),i.updateMatrixWorld(),r.makeTranslation(-Bs.x,-Bs.y,-Bs.z),Sp.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sp)}}class FC extends va{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new BC}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class VC extends Md{constructor(){super(new wy(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class jl extends va{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new VC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class HC extends va{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Mp{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(qt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class GC extends Cr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:od}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=od);const Ep={type:"change"},Ed={type:"start"},Ny={type:"end"},eo=new fy,Tp=new Oi,WC=Math.cos(70*o2.DEG2RAD),Wt=new H,gn=2*Math.PI,It={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Xl=1e-6;class qC extends GC{constructor(e,t=null){super(e,t),this.state=It.NONE,this.enabled=!0,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ss.ROTATE,MIDDLE:ss.DOLLY,RIGHT:ss.PAN},this.touches={ONE:es.ROTATE,TWO:es.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new Sr,this._lastTargetPosition=new H,this._quat=new Sr().setFromUnitVectors(e.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mp,this._sphericalDelta=new Mp,this._scale=1,this._panOffset=new H,this._rotateStart=new Ee,this._rotateEnd=new Ee,this._rotateDelta=new Ee,this._panStart=new Ee,this._panEnd=new Ee,this._panDelta=new Ee,this._dollyStart=new Ee,this._dollyEnd=new Ee,this._dollyDelta=new Ee,this._dollyDirection=new H,this._mouse=new Ee,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=XC.bind(this),this._onPointerDown=jC.bind(this),this._onPointerUp=YC.bind(this),this._onContextMenu=n3.bind(this),this._onMouseWheel=JC.bind(this),this._onKeyDown=QC.bind(this),this._onTouchStart=e3.bind(this),this._onTouchMove=t3.bind(this),this._onMouseDown=KC.bind(this),this._onMouseMove=ZC.bind(this),this._interceptControlDown=i3.bind(this),this._interceptControlUp=r3.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ep),this.update(),this.state=It.NONE}update(e=null){const t=this.object.position;Wt.copy(t).sub(this.target),Wt.applyQuaternion(this._quat),this._spherical.setFromVector3(Wt),this.autoRotate&&this.state===It.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=gn:i>Math.PI&&(i-=gn),r<-Math.PI?r+=gn:r>Math.PI&&(r-=gn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Wt.setFromSpherical(this._spherical),Wt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Wt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Wt.length();a=this._clampDistance(o*this._scale);const u=o-a;this.object.position.addScaledVector(this._dollyDirection,u),this.object.updateMatrixWorld(),s=!!u}else if(this.object.isOrthographicCamera){const o=new H(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=u!==this.object.zoom;const l=new H(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Wt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(eo.origin.copy(this.object.position),eo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(eo.direction))<WC?this.object.lookAt(this.target):(Tp.setFromNormalAndCoplanarPoint(this.object.up,this.target),eo.intersectPlane(Tp,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Xl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Xl||this._lastTargetPosition.distanceToSquared(this.target)>Xl?(this.dispatchEvent(Ep),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?gn/60*this.autoRotateSpeed*e:gn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Wt.setFromMatrixColumn(t,0),Wt.multiplyScalar(-e),this._panOffset.add(Wt)}_panUp(e,t){this.screenSpacePanning===!0?Wt.setFromMatrixColumn(t,1):(Wt.setFromMatrixColumn(t,0),Wt.crossVectors(this.object.up,Wt)),Wt.multiplyScalar(e),this._panOffset.add(Wt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Wt.copy(r).sub(this.target);let s=Wt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/t.clientHeight),this._rotateUp(gn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/t.clientHeight),this._rotateUp(gn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ee,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function jC(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function XC(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function YC(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ny),this.state=It.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function KC(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ss.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=It.DOLLY;break;case ss.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=It.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=It.ROTATE}break;case ss.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=It.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=It.PAN}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(Ed)}function ZC(n){switch(this.state){case It.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case It.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case It.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function JC(n){this.enabled===!1||this.enableZoom===!1||this.state!==It.NONE||(n.preventDefault(),this.dispatchEvent(Ed),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Ny))}function QC(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function e3(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case es.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=It.TOUCH_ROTATE;break;case es.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=It.TOUCH_PAN;break;default:this.state=It.NONE}break;case 2:switch(this.touches.TWO){case es.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=It.TOUCH_DOLLY_PAN;break;case es.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=It.TOUCH_DOLLY_ROTATE;break;default:this.state=It.NONE}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(Ed)}function t3(n){switch(this._trackPointer(n),this.state){case It.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case It.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case It.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case It.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=It.NONE}}function n3(n){this.enabled!==!1&&n.preventDefault()}function i3(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function r3(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}async function Ap(n,e,t){t.data!=null&&(t.data.delete(),t.model&&t.model.delete&&t.model.delete(),t.model=null,t.data=null),t.model=n.MjModel.loadFromXML("/working/"+e),t.data=new n.MjData(t.model);let i=t.model,r=t.data,s=new TextDecoder("utf-8"),a=new Uint8Array(i.names),u=s.decode(i.names).split(s.decode(new ArrayBuffer(1))),l=new yr;l.name="MuJoCo Root",t.scene.add(l);let c={},d={},h=[],f=new xp;f.color=new ot(1,1,1);for(let m=0;m<i.ngeom;m++){if(!(i.geom_group[m]<3))continue;let y=i.geom_bodyid[m],_=i.geom_type[m],p=[i.geom_size[m*3+0],i.geom_size[m*3+1],i.geom_size[m*3+2]];if(!(y in c)){c[y]=new yr;let T=i.name_bodyadr[y],S=T;for(;S<a.length&&a[S]!==0;)S++;let C=a.subarray(T,S);c[y].name=s.decode(C),c[y].bodyID=y,c[y].has_custom_mesh=!1}let x=new us(p[0]*.5);if(_!=n.mjtGeom.mjGEOM_PLANE.value){if(_!=n.mjtGeom.mjGEOM_HFIELD.value){if(_==n.mjtGeom.mjGEOM_SPHERE.value)x=new us(p[0]);else if(_==n.mjtGeom.mjGEOM_CAPSULE.value)x=new wd(p[0],p[1]*2,20,20);else if(_==n.mjtGeom.mjGEOM_ELLIPSOID.value)x=new us(1);else if(_==n.mjtGeom.mjGEOM_CYLINDER.value)x=new Sd(p[0],p[0],p[1]*2);else if(_==n.mjtGeom.mjGEOM_BOX.value)x=new vs(p[0]*2,p[2]*2,p[1]*2);else if(_==n.mjtGeom.mjGEOM_MESH.value){let T=i.geom_dataid[m];if(T in d)x=d[T];else{x=new Xn;let S=i.mesh_vert.subarray(i.mesh_vertadr[T]*3,(i.mesh_vertadr[T]+i.mesh_vertnum[T])*3);for(let z=0;z<S.length;z+=3){let K=S[z+1];S[z+1]=S[z+2],S[z+2]=-K}let C=i.mesh_normal.subarray(i.mesh_normaladr[T]*3,(i.mesh_normaladr[T]+i.mesh_normalnum[T])*3);for(let z=0;z<C.length;z+=3){let K=C[z+1];C[z+1]=C[z+2],C[z+2]=-K}let A=i.mesh_texcoord.subarray(i.mesh_texcoordadr[T]*2,(i.mesh_texcoordadr[T]+i.mesh_texcoordnum[T])*2),L=i.mesh_face.subarray(i.mesh_faceadr[T]*3,(i.mesh_faceadr[T]+i.mesh_facenum[T])*3),F=i.mesh_facetexcoord.subarray(i.mesh_faceadr[T]*3,(i.mesh_faceadr[T]+i.mesh_facenum[T])*3),B=i.mesh_facenormal.subarray(i.mesh_faceadr[T]*3,(i.mesh_faceadr[T]+i.mesh_facenum[T])*3),N=new Float32Array(S.length/3*2),U=new Float32Array(S.length);for(let z=0;z<L.length/3;z++){let K=L[z*3+0],W=L[z*3+1],ie=L[z*3+2],oe=F[z*3+0],Z=F[z*3+1],he=F[z*3+2],me=B[z*3+0],G=B[z*3+1],ue=B[z*3+2];N[K*2+0]=A[oe*2+0],N[K*2+1]=A[oe*2+1],N[W*2+0]=A[Z*2+0],N[W*2+1]=A[Z*2+1],N[ie*2+0]=A[he*2+0],N[ie*2+1]=A[he*2+1],U[K*3+0]=C[me*3+0],U[K*3+1]=C[me*3+1],U[K*3+2]=C[me*3+2],U[W*3+0]=C[G*3+0],U[W*3+1]=C[G*3+1],U[W*3+2]=C[G*3+2],U[ie*3+0]=C[ue*3+0],U[ie*3+1]=C[ue*3+1],U[ie*3+2]=C[ue*3+2]}x.setAttribute("position",new vn(S,3)),x.setAttribute("normal",new vn(U,3)),x.setAttribute("uv",new vn(N,2)),x.setIndex(Array.from(L)),x.computeVertexNormals(),d[T]=x}c[y].has_custom_mesh=!0}}}let w,b=[i.geom_rgba[m*4+0],i.geom_rgba[m*4+1],i.geom_rgba[m*4+2],i.geom_rgba[m*4+3]];if(i.geom_matid[m]!=-1){let T=i.geom_matid[m];b=[i.mat_rgba[T*4+0],i.mat_rgba[T*4+1],i.mat_rgba[T*4+2],i.mat_rgba[T*4+3]],w=void 0;let A=i.mat_texid[T*10+1];if(A!=-1){let L=i.tex_width[A],F=i.tex_height[A],B=i.tex_adr[A],N=i.tex_nchannel[A],U=i.tex_data,z=new Uint8Array(L*F*4);for(let K=0;K<L*F;K++)z[K*4+0]=U[B+(K*N+0)],z[K*4+1]=N>1?U[B+(K*N+1)]:z[K*4+0],z[K*4+2]=N>2?U[B+(K*N+2)]:z[K*4+0],z[K*4+3]=N>3?U[B+(K*N+3)]:255;w=new Cy(z,L,F,Dn,ai),A==2?(w.repeat=new Ee(50,50),w.wrapS=mr,w.wrapT=mr):(w.repeat=new Ee(i.mat_texrepeat[i.geom_matid[m]*2+0],i.mat_texrepeat[i.geom_matid[m]*2+1]),w.wrapS=mr,w.wrapT=mr),w.needsUpdate=!0}}let I=new xp({color:new ot(b[0],b[1],b[2]),transparent:b[3]<1,opacity:b[3]/255,specularIntensity:i.geom_matid[m]!=-1?i.mat_specular[i.geom_matid[m]]:void 0,reflectivity:i.geom_matid[m]!=-1?i.mat_reflectance[i.geom_matid[m]]:void 0,roughness:i.geom_matid[m]!=-1?1-i.mat_shininess[i.geom_matid[m]]:void 0,metalness:i.geom_matid[m]!=-1?.1:void 0,map:w}),R;if(_==0){const T=new Dy({color:2765632,roughness:.95,metalness:0,map:w});R=new Mn(new ya(100,100),T),R.rotateX(-Math.PI/2)}else R=new Mn(x,I);R.castShadow=m!=0,R.receiveShadow=_!=7,R.bodyID=y,c[y].add(R),ky(i.geom_pos,m,R.position),_!=0&&Oy(i.geom_quat,m,R.quaternion),_==4&&R.scale.set(p[0],p[2],p[1])}l.cylinders=null,l.spheres=null;for(let m=0;m<i.nlight;m++){let y=new jl;i.light_type[m]==0?(y=new Ly,y.angle=1.51):i.light_type[m]==1?y=new jl:i.light_type[m]==2?y=new FC:i.light_type[m]==3&&(y=new UC),y.angle=1.11,y.decay=i.light_attenuation[m]*100,y.penumbra=.5,y.castShadow=!0,y.intensity=y.intensity*3.14*1,y.shadow.mapSize.width=1024,y.shadow.mapSize.height=1024,y.shadow.camera.near=.1,y.shadow.camera.far=10,c[0]?c[0].add(y):l.add(y),h.push(y)}if(i.nlight==0){let m=new jl;l.add(m)}for(let m=0;m<i.nbody;m++)m==0||!c[0]?l.add(c[m]):(c[m]||(console.log("Body without Geometry detected; adding to bodies",m,c[m]),c[m]=new yr,c[m].name=u[m+1],c[m].bodyID=m,c[m].has_custom_mesh=!1),c[0].add(c[m]));return t.mujocoRoot=l,[i,r,c,h]}function ky(n,e,t,i=!0){return i?t.set(n[e*3+0],n[e*3+2],-n[e*3+1]):t.set(n[e*3+0],n[e*3+1],n[e*3+2])}function Oy(n,e,t,i=!0){return i?t.set(-n[e*4+1],-n[e*4+3],n[e*4+2],-n[e*4+0]):t.set(n[e*4+0],n[e*4+1],n[e*4+2],n[e*4+3])}/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Td=Object.defineProperty,s3=Object.getOwnPropertyDescriptor,a3=Object.getOwnPropertyNames,o3=Object.prototype.hasOwnProperty,l3=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')}),fe=(n,e)=>()=>(n&&(e=n(n=0)),e),bs=(n,e)=>{for(var t in e)Td(n,t,{get:e[t],enumerable:!0})},u3=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of a3(e))!o3.call(n,r)&&r!==t&&Td(n,r,{get:()=>e[r],enumerable:!(i=s3(e,r))||i.enumerable});return n},ca=n=>u3(Td({},"__esModule",{value:!0}),n),Fs,Li,ns,Cp,Uy,zy=fe(()=>{Fs=new Map,Li=[],ns=(n,e,t)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let i=Fs.get(n);if(i===void 0)Fs.set(n,{backend:e,priority:t});else{if(i.priority>t)return;if(i.priority===t&&i.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${t}`)}if(t>=0){let r=Li.indexOf(n);r!==-1&&Li.splice(r,1);for(let s=0;s<Li.length;s++)if(Fs.get(Li[s]).priority<=t){Li.splice(s,0,n);return}Li.push(n)}return}throw new TypeError("not a valid backend")},Cp=async n=>{let e=Fs.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let t=!!e.initPromise;try{return t||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(i){return t||(e.error=`${i}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Uy=async n=>{let e=n.executionProviders||[],t=e.map(u=>typeof u=="string"?u:u.name),i=t.length===0?Li:t,r,s=[],a=new Set;for(let u of i){let l=await Cp(u);typeof l=="string"?s.push({name:u,err:l}):(r||(r=l),r===l&&a.add(u))}if(!r)throw new Error(`no available backend found. ERR: ${s.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of s)t.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let o=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[r,new Proxy(n,{get:(u,l)=>l==="executionProviders"?o:Reflect.get(u,l)})]}}),c3=fe(()=>{zy()}),By,d3=fe(()=>{By="1.26.0"}),Yl,Zt,Fy=fe(()=>{d3(),Yl="warning",Zt={wasm:{},webgl:{},webgpu:{},versions:{common:By},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);Yl=n}},get logLevel(){return Yl}},Object.defineProperty(Zt,"logLevel",{enumerable:!0})}),Nt,h3=fe(()=>{Fy(),Nt=Zt}),Vy,Hy,f3=fe(()=>{Vy=(n,e)=>{let t=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);t.width=n.dims[3],t.height=n.dims[2];let i=t.getContext("2d");if(i!=null){let r,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(r=n.dims[2],s=n.dims[3]):(r=n.dims[3],s=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",o=e?.norm,u,l;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?l=[0,0,0,0]:typeof o.bias=="number"?l=[o.bias,o.bias,o.bias,o.bias]:(l=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(l[3]=o.bias[3]));let c=s*r,d=0,h=c,f=c*2,m=-1;a==="RGBA"?(d=0,h=c,f=c*2,m=c*3):a==="RGB"?(d=0,h=c,f=c*2):a==="RBG"&&(d=0,f=c,h=c*2);for(let y=0;y<s;y++)for(let _=0;_<r;_++){let p=(n.data[d++]-l[0])*u[0],x=(n.data[h++]-l[1])*u[1],w=(n.data[f++]-l[2])*u[2],b=m===-1?255:(n.data[m++]-l[3])*u[3];i.fillStyle="rgba("+p+","+x+","+w+","+b+")",i.fillRect(_,y,1,1)}if("toDataURL"in t)return t.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Hy=(n,e)=>{let t=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(t!=null){let r,s,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(r=n.dims[2],s=n.dims[1],a=n.dims[3]):(r=n.dims[3],s=n.dims[2],a=n.dims[1]);let o=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let d=s*r;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,f=0,m=1,y=2,_=3,p=0,x=d,w=d*2,b=-1;o==="RGBA"?(p=0,x=d,w=d*2,b=d*3):o==="RGB"?(p=0,x=d,w=d*2):o==="RBG"&&(p=0,w=d,x=d*2),i=t.createImageData(r,s);for(let I=0;I<s*r;f+=h,m+=h,y+=h,_+=h,I++)i.data[f]=(n.data[p++]-c[0])*l[0],i.data[m]=(n.data[x++]-c[1])*l[1],i.data[y]=(n.data[w++]-c[2])*l[2],i.data[_]=b===-1?255:(n.data[b++]-c[3])*l[3]}else throw new Error("Can not access image data");return i}}),to,Gy,Wy,qy,jy,Xy,p3=fe(()=>{Ad(),to=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:t,width:i}=e,r=e.norm??{mean:255,bias:0},s,a;typeof r.mean=="number"?s=[r.mean,r.mean,r.mean,r.mean]:s=[r.mean[0],r.mean[1],r.mean[2],r.mean[3]??255],typeof r.bias=="number"?a=[r.bias,r.bias,r.bias,r.bias]:a=[r.bias[0],r.bias[1],r.bias[2],r.bias[3]??0];let o=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=t*i,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),d=4,h=0,f=1,m=2,y=3,_=0,p=l,x=l*2,w=-1;o==="RGB"&&(d=3,h=0,f=1,m=2,y=-1),u==="RGBA"?w=l*3:u==="RBG"?(_=0,x=l,p=l*2):u==="BGR"&&(x=0,p=l,_=l*2);for(let b=0;b<l;b++,h+=d,m+=d,f+=d,y+=d)c[_++]=(n[h]+a[0])/s[0],c[p++]=(n[f]+a[1])/s[1],c[x++]=(n[m]+a[2])/s[2],w!==-1&&y!==-1&&(c[w++]=(n[y]+a[3])/s[3]);return u==="RGBA"?new Sn("float32",c,[1,4,t,i]):new Sn("float32",c,[1,3,t,i])},Gy=async(n,e)=>{let t=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,i=typeof ImageData<"u"&&n instanceof ImageData,r=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,s=typeof n=="string",a,o=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(t){let c=u();c.width=n.width,c.height=n.height;let d=l(c);if(d!=null){let h=n.height,f=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(h=e.resizedHeight,f=e.resizedWidth),e!==void 0){if(o=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=f}else o.tensorFormat="RGBA",o.height=h,o.width=f;d.drawImage(n,0,0),a=d.getImageData(0,0,f,h).data}else throw new Error("Can not access image data")}else if(i){let c,d;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,d=e.resizedWidth):(c=n.height,d=n.width),e!==void 0&&(o=e),o.format="RGBA",o.height=c,o.width=d,e!==void 0){let h=u();h.width=d,h.height=c;let f=l(h);if(f!=null)f.putImageData(n,0,0),a=f.getImageData(0,0,d,c).data;else throw new Error("Can not access image data")}else a=n.data}else if(r){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=n.width,c.height=n.height;let d=l(c);if(d!=null){let h=n.height,f=n.width;return d.drawImage(n,0,0,f,h),a=d.getImageData(0,0,f,h).data,o.height=h,o.width=f,to(a,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((c,d)=>{let h=u(),f=l(h);if(!n||!f)return d();let m=new Image;m.crossOrigin="Anonymous",m.src=n,m.onload=()=>{h.width=m.width,h.height=m.height,f.drawImage(m,0,0,h.width,h.height);let y=f.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,c(to(y.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return to(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Wy=(n,e)=>{let{width:t,height:i,download:r,dispose:s}=e,a=[1,i,t,4];return new Sn({location:"texture",type:"float32",texture:n,dims:a,download:r,dispose:s})},qy=(n,e)=>{let{dataType:t,dims:i,download:r,dispose:s}=e;return new Sn({location:"gpu-buffer",type:t??"float32",gpuBuffer:n,dims:i,download:r,dispose:s})},jy=(n,e)=>{let{dataType:t,dims:i,download:r,dispose:s}=e;return new Sn({location:"ml-tensor",type:t??"float32",mlTensor:n,dims:i,download:r,dispose:s})},Xy=(n,e,t)=>new Sn({location:"cpu-pinned",type:n,data:e,dims:t??[e.length]})}),hr,ea,Kl,Yy,m3=fe(()=>{hr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ea=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Kl=!1,Yy=()=>{if(!Kl){Kl=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,t=globalThis.Float16Array,i=typeof t<"u"&&t.from;n&&(hr.set("int64",BigInt64Array),ea.set(BigInt64Array,"int64")),e&&(hr.set("uint64",BigUint64Array),ea.set(BigUint64Array,"uint64")),i?(hr.set("float16",t),ea.set(t,"float16")):hr.set("float16",Uint16Array)}}}),Ky,Zy,g3=fe(()=>{Ad(),Ky=n=>{let e=1;for(let t=0;t<n.length;t++){let i=n[t];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${t}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${t}] must be a non-negative integer, got: ${i}`);e*=i}return e},Zy=(n,e)=>{switch(n.location){case"cpu":return new Sn(n.type,n.data,e);case"cpu-pinned":return new Sn({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new Sn({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new Sn({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new Sn({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}}),Sn,Ad=fe(()=>{f3(),p3(),m3(),g3(),Sn=class{constructor(n,e,t){Yy();let i,r;if(typeof n=="object"&&"location"in n)switch(this.dataLocation=n.location,i=n.type,r=n.dims,n.location){case"cpu-pinned":{let a=hr.get(i);if(!a)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(n.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=n.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=n.texture,this.downloader=n.download,this.disposer=n.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=n.gpuBuffer,this.downloader=n.download,this.disposer=n.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=n.mlTensor,this.downloader=n.download,this.disposer=n.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof n=="string")if(i=n,o=t,n==="string"){if(!Array.isArray(e))throw new TypeError("A string tensor's data must be a string array.");a=e}else{let u=hr.get(n);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${n}.`);if(Array.isArray(e)){if(n==="float16"&&u===Uint16Array||n==="uint4"||n==="int4")throw new TypeError(`Creating a ${n} tensor from number array is not supported. Please use ${u.name} as data.`);n==="uint64"||n==="int64"?a=u.from(e,BigInt):a=u.from(e)}else if(e instanceof u)a=e;else if(e instanceof Uint8ClampedArray)if(n==="uint8")a=Uint8Array.from(e);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(n==="float16"&&e instanceof Uint16Array&&u!==Uint16Array)a=new globalThis.Float16Array(e.buffer,e.byteOffset,e.length);else throw new TypeError(`A ${i} tensor's data must be type of ${u}`)}else if(o=e,Array.isArray(n)){if(n.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof n[0];if(u==="string")i="string",a=n;else if(u==="boolean")i="bool",a=Uint8Array.from(n);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(n instanceof Uint8ClampedArray)i="uint8",a=Uint8Array.from(n);else{let u=ea.get(n.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${n.constructor}.`);i=u,a=n}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");r=o,this.cpuData=a,this.dataLocation="cpu"}let s=Ky(r);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=r,this.size=s}static async fromImage(n,e){return Gy(n,e)}static fromTexture(n,e){return Wy(n,e)}static fromGpuBuffer(n,e){return qy(n,e)}static fromMLTensor(n,e){return jy(n,e)}static fromPinnedBuffer(n,e,t){return Xy(n,e,t)}toDataURL(n){return Vy(this,n)}toImageData(n){return Hy(this,n)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(n){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let e=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=e,n&&this.disposer&&(this.disposer(),this.disposer=void 0),e}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(n){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Zy(this,n)}}}),un,Jy=fe(()=>{Ad(),un=Sn}),Po,Zl,li,jn,vr,xr,Qy=fe(()=>{Fy(),Po=(n,e)=>{(typeof Zt.trace>"u"?!Zt.wasm.trace:!Zt.trace)||console.timeStamp(`${n}::ORT::${e}`)},Zl=(n,e)=>{let t=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let r=0;r<t.length;r++){if(i&&!t[r].includes("TRACE_FUNC")){let s=`FUNC_${n}::${t[r].trim().split(" ")[1]}`;e&&(s+=`::${e}`),Po("CPU",s);return}t[r].includes("TRACE_FUNC")&&(i=!0)}},li=n=>{(typeof Zt.trace>"u"?!Zt.wasm.trace:!Zt.trace)||Zl("BEGIN",n)},jn=n=>{(typeof Zt.trace>"u"?!Zt.wasm.trace:!Zt.trace)||Zl("END",n)},vr=n=>{(typeof Zt.trace>"u"?!Zt.wasm.trace:!Zt.trace)||console.time(`ORT::${n}`)},xr=n=>{(typeof Zt.trace>"u"?!Zt.wasm.trace:!Zt.trace)||console.timeEnd(`ORT::${n}`)}}),ev,_3=fe(()=>{zy(),Jy(),Qy(),ev=class tv{constructor(e){this.handler=e}async run(e,t,i){li(),vr("InferenceSession.run");let r={},s={};if(typeof e!="object"||e===null||e instanceof un||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof t=="object"){if(t===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof un)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(t.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of t){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);r[l]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(t);for(let d of this.outputNames)if(c.indexOf(d)!==-1){let h=t[d];(h===null||h instanceof un)&&(l=!0,a=!1,r[d]=h)}if(l){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=t}}else if(typeof t<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)r[l]=null;let o=await this.handler.run(e,r,s),u={};for(let l in o)if(Object.hasOwnProperty.call(o,l)){let c=o[l];c instanceof un?u[l]=c:u[l]=new un(c.type,c.data,c.dims)}return xr("InferenceSession.run"),jn(),u}async release(){return this.handler.dispose()}static async create(e,t,i,r){li(),vr("InferenceSession.create");let s,a={};if(typeof e=="string"){if(s=e,typeof t=="object"&&t!==null)a=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(s=e,typeof t=="object"&&t!==null)a=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,d=0,h=e.byteLength;if(typeof t=="object"&&t!==null)a=t;else if(typeof t=="number"){if(d=t,!Number.isSafeInteger(d))throw new RangeError("'byteOffset' must be an integer.");if(d<0||d>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(h=e.byteLength-d,typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||d+h>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-d}].`);if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof t<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(c,d,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await Uy(a),l=await o.createInferenceSessionHandler(s,u);return xr("InferenceSession.create"),jn(),new tv(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Wo,y3=fe(()=>{_3(),Wo=ev}),v3=fe(()=>{}),x3=fe(()=>{}),b3=fe(()=>{}),w3=fe(()=>{}),S3={};bs(S3,{InferenceSession:()=>Wo,TRACE:()=>Po,TRACE_EVENT_BEGIN:()=>vr,TRACE_EVENT_END:()=>xr,TRACE_FUNC_BEGIN:()=>li,TRACE_FUNC_END:()=>jn,Tensor:()=>un,env:()=>Nt,registerBackend:()=>ns});var Nn=fe(()=>{c3(),h3(),y3(),Jy(),v3(),x3(),Qy(),b3(),w3()}),Cd=fe(()=>{}),nv={};bs(nv,{default:()=>iv});var Jl,Ql,iv,M3=fe(()=>{lw(),Ir(),Rd(),Jl="ort-wasm-proxy-worker",Ql=globalThis.self?.name===Jl,Ql&&(self.onmessage=n=>{let{type:e,in:t}=n.data;try{switch(e){case"init-wasm":Id(t.wasm).then(()=>{jd(t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})})},i=>{postMessage({type:e,err:i})});break;case"init-ep":{let{epName:i,env:r}=t;Xd(r,i).then(()=>{postMessage({type:e})},s=>{postMessage({type:e,err:s})});break}case"copy-from":{let{buffer:i}=t,r=zo(i);postMessage({type:e,out:r});break}case"create":{let{model:i,options:r}=t;Yd(i,r).then(s=>{postMessage({type:e,out:s})},s=>{postMessage({type:e,err:s})});break}case"release":Kd(t),postMessage({type:e});break;case"run":{let{sessionId:i,inputIndices:r,inputs:s,outputIndices:a,options:o}=t;Zd(i,r,s,a,new Array(a.length).fill(null),o).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},Qd([...s,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":Jd(t),postMessage({type:e});break;default:}}catch(i){postMessage({type:e,err:i})}}),iv=Ql?null:n=>new Worker(n??wn,{type:"module",name:Jl})}),rv={};bs(rv,{default:()=>sv});async function Rp(n={}){var e=n,t=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,r=i&&self.name?.startsWith("em-pthread");e.mountExternalData=(g,v)=>{g.startsWith("./")&&(g=g.substring(2)),(e.Xc||(e.Xc=new Map)).set(g,v)},e.unmountExternalData=()=>{delete e.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let s=g=>async(...v)=>{try{if(e.Yc)throw Error("Session already started");let E=e.Yc={Kd:v[0],errors:[]},M=await g(...v);if(e.Yc!==E)throw Error("Session mismatch");e.dd?.flush();let P=E.errors;if(0<P.length){let O=await Promise.all(P);if(O=O.filter(j=>j),0<O.length)throw Error(O.join(`
`))}return M}finally{e.Yc=null}};e.jsepInit=(g,v)=>{if(g==="webgpu"){[e.dd,e.Ad,e.Ed,e.ed,e.Dd,e.$b,e.Fd,e.Hd,e.Bd,e.Cd,e.Gd]=v;let E=e.dd;e.jsepRegisterBuffer=(M,P,O,j)=>E.registerBuffer(M,P,O,j),e.jsepGetBuffer=M=>E.getBuffer(M),e.jsepCreateDownloader=(M,P,O)=>E.createDownloader(M,P,O),e.jsepOnCreateSession=M=>{E.onCreateSession(M)},e.jsepOnReleaseSession=M=>{E.onReleaseSession(M)},e.jsepOnRunStart=M=>E.onRunStart(M),e.Id=(M,P)=>{E.upload(M,P)}}else if(g==="webnn"){let E=v[0];[e.Wd,e.sd,e.webnnEnsureTensor,e.td,e.webnnDownloadTensor,e.Rd,e.webnnEnableTraceEvent]=v.slice(1),e.webnnReleaseTensorId=e.sd,e.webnnUploadTensor=e.td,e.webnnRegisterMLContext=e.Rd,e.webnnOnRunStart=M=>E.onRunStart(M),e.webnnOnRunEnd=E.onRunEnd.bind(E),e.webnnOnReleaseSession=M=>{E.onReleaseSession(M)},e.webnnCreateMLTensorDownloader=(M,P)=>E.createMLTensorDownloader(M,P),e.webnnRegisterMLTensor=(M,P,O,j)=>E.registerMLTensor(M,P,O,j),e.webnnCreateMLContext=M=>E.createMLContext(M),e.webnnRegisterMLConstant=(M,P,O,j,ne,ye)=>E.registerMLConstant(M,P,O,j,ne,e.Xc,ye),e.webnnRegisterGraphInput=E.registerGraphInput.bind(E),e.webnnIsGraphInput=E.isGraphInput.bind(E),e.webnnRegisterGraphOutput=E.registerGraphOutput.bind(E),e.webnnIsGraphOutput=E.isGraphOutput.bind(E),e.webnnCreateTemporaryTensor=E.createTemporaryTensor.bind(E),e.webnnIsGraphInputOutputTypeSupported=E.isGraphInputOutputTypeSupported.bind(E)}};let a=()=>{let g=v=>(...E)=>{let M=Jn;return E=v(...E),Jn!=M?new Promise((P,O)=>{el={resolve:P,reject:O}}):E};(()=>{for(let v of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])e[v]=g(e[v])})(),s!==void 0&&(e._OrtRun=s(e._OrtRun),e._OrtRunWithBinding=s(e._OrtRunWithBinding)),a=void 0};e.asyncInit=()=>{a?.()};var o,u,l=(g,v)=>{throw v},c=import.meta.url,d="";if(t||i){try{d=new URL(".",c).href}catch{}i&&(u=g=>{var v=new XMLHttpRequest;return v.open("GET",g,!1),v.responseType="arraybuffer",v.send(null),new Uint8Array(v.response)}),o=async g=>{if(T(g))return new Promise((E,M)=>{var P=new XMLHttpRequest;P.open("GET",g,!0),P.responseType="arraybuffer",P.onload=()=>{P.status==200||P.status==0&&P.response?E(P.response):M(P.status)},P.onerror=M,P.send(null)});var v=await fetch(g,{credentials:"same-origin"});if(v.ok)return v.arrayBuffer();throw Error(v.status+" : "+v.url)}}var h,f,m,y,_,p,x=console.log.bind(console),w=console.error.bind(console),b=x,I=w,R=!1,T=g=>g.startsWith("file://");function S(){ae.buffer!=A.buffer&&he()}if(r){let g=function(v){try{var E=v.data,M=E.Sc;if(M==="load"){let P=[];self.onmessage=O=>P.push(O),p=()=>{postMessage({Sc:"loaded"});for(let O of P)g(O);self.onmessage=g};for(let O of E.xd)e[O]&&!e[O].proxy||(e[O]=(...j)=>{postMessage({Sc:"callHandler",wd:O,args:j})},O=="print"&&(b=e[O]),O=="printErr"&&(I=e[O]));ae=E.Od,he(),f=E.Pd,xe(),Ia()}else if(M==="run"){(function(P){var O=(S(),U)[P+52>>>2>>>0];P=(S(),U)[P+56>>>2>>>0],Ah(O,O-P),et(O)})(E.Rc),sl(E.Rc,0,0,1,0,0),J(),Zo(E.Rc),C||(bh(),C=!0);try{Fe(E.Md,E.bd)}catch(P){if(P!="unwind")throw P}}else E.target!=="setimmediate"&&(M==="checkMailbox"?C&&Sa():M&&(I(`worker: received unknown command ${M}`),I(E)))}catch(P){throw wh(),P}};var C=!1;self.onunhandledrejection=v=>{throw v.reason||v},self.onmessage=g}var A,L,F,B,N,U,z,K,W,ie,oe,Z=!1;function he(){var g=ae.buffer;e.HEAP8=A=new Int8Array(g),F=new Int16Array(g),e.HEAPU8=L=new Uint8Array(g),B=new Uint16Array(g),e.HEAP32=N=new Int32Array(g),e.HEAPU32=U=new Uint32Array(g),z=new Float32Array(g),K=new Float64Array(g),W=new BigInt64Array(g),ie=new BigUint64Array(g)}function me(){Z=!0,r?p():ci.sb()}function G(g){throw I(g="Aborted("+g+")"),R=!0,g=new WebAssembly.RuntimeError(g+". Build with -sASSERTIONS for more info."),_?.(g),g}function ue(){return{a:{ma:L1,gb:D1,g:pt,J:Ne,f:Qe,o:Tt,h:q,ha:Se,b:se,T:ce,Ha:Te,n:Je,$:An,Xa:Ss,Da:Ms,Fa:Yn,Ya:Dr,Va:Es,Oa:Ts,Ua:Wi,ka:As,Ea:qi,Ba:Cs,Wa:Rs,Ca:xa,bb:Ko,ea:_e,wa:Ce,ua:Pt,da:wt,O:Ve,H:kn,va:Ei,_:Zn,xa:ba,Ra:zw,za:Fw,Ia:Vw,sa:Hw,fa:Gw,Qa:Zo,_a:Ww,R:Yw,r:e1,c:Xe,hb:t1,y:n1,M:i1,D:r1,l:s1,s:rh,ib:a1,I:o1,S:l1,j:u1,u:c1,q:d1,k:h1,La:f1,Ma:p1,Na:m1,Ja:lh,Ka:uh,ta:ch,db:_1,ab:v1,v:x1,aa:b1,ga:w1,$a:y1,W:S1,Za:M1,Aa:E1,F:g1,U:T1,la:Ca,ya:C1,fb:A1,eb:R1,Sa:ph,Ta:mh,Ga:ut,V:gh,ja:_h,Pa:yh,ia:vh,kb:gS,na:dS,lb:mS,oa:cS,G:tS,d:U1,t:k1,w:N1,A:X1,mb:oS,K:J1,x:F1,pa:lS,Y:hS,ba:aS,nb:sS,ob:rS,P:Y1,qa:iS,pb:nS,N:Q1,Z:uS,e:O1,B:B1,m:z1,jb:_S,p:H1,z:G1,C:V1,E:W1,L:K1,qb:eS,Q:fS,ca:Z1,X:pS,rb:j1,ra:q1,i:$1,a:ae,cb:tn}}}async function xe(){function g(M,P){var O=ci=M.exports;M={};for(let[j,ne]of Object.entries(O))typeof ne=="function"?(O=qw(ne),M[j]=O):M[j]=ne;return ci=M,ci=(function(){var j=ci,ne=Me=>Ze=>Me(Ze)>>>0,ye=Me=>()=>Me()>>>0;return(j=Object.assign({},j)).tb=ne(j.tb),j.Xb=ye(j.Xb),j.Zb=ne(j.Zb),j.lc=ne(j.lc),j.mc=ye(j.mc),j.qc=ne(j.qc),j})(),We.push(ci._b),xh=(M=ci).tb,bh=M.ub,e._OrtInit=M.vb,e._OrtGetLastError=M.wb,e._OrtCreateSessionOptions=M.xb,e._OrtAppendExecutionProvider=M.yb,e._OrtAddFreeDimensionOverride=M.zb,e._OrtAddSessionConfigEntry=M.Ab,e._OrtReleaseSessionOptions=M.Bb,e._OrtCreateSession=M.Cb,e._OrtReleaseSession=M.Db,e._OrtGetInputOutputCount=M.Eb,e._OrtGetInputOutputMetadata=M.Fb,e._OrtFree=M.Gb,e._OrtCreateTensor=M.Hb,e._OrtGetTensorData=M.Ib,e._OrtReleaseTensor=M.Jb,e._OrtCreateRunOptions=M.Kb,e._OrtAddRunConfigEntry=M.Lb,e._OrtReleaseRunOptions=M.Mb,e._OrtCreateBinding=M.Nb,e._OrtBindInput=M.Ob,e._OrtBindOutput=M.Pb,e._OrtClearBoundOutputs=M.Qb,e._OrtReleaseBinding=M.Rb,e._OrtRunWithBinding=M.Sb,e._OrtRun=M.Tb,e._OrtEndProfiling=M.Ub,e._JsepOutput=M.Vb,e._JsepGetNodeName=M.Wb,Ra=M.Xb,Qn=e._free=M.Yb,$s=e._malloc=M.Zb,sl=M.ac,wh=M.bc,Sh=M.cc,Mh=M.dc,al=M.ec,Eh=M.fc,Th=M.gc,at=M.hc,Ps=M.ic,Ah=M.jc,et=M.kc,ol=M.lc,nt=M.mc,Ch=M.nc,ll=M.oc,Rh=M.pc,Ih=M.qc,$h=M.rc,ul=M.sc,Ph=M.tc,Dh=M.uc,Lh=M.vc,Nh=M.wc,kh=M.xc,Oh=M.yc,Uh=M.zc,zh=M.Ac,Bh=M.Bc,Fh=M.Cc,Vh=M.Dc,Hh=M.Ec,Gh=M.Fc,Wh=M.Gc,qh=M.Hc,jh=M.Ic,Xh=M.Jc,Yh=M.Kc,Kh=M.Lc,Zh=M.Mc,Jh=M.Nc,Qh=M.Pc,ef=M.Qc,tf=M.$c,nf=M.ad,rf=M.fd,sf=M.jd,af=M.kd,of=M.ld,lf=M.md,uf=M.nd,cf=M.od,df=M.pd,hf=M.qd,ff=M.vd,pf=M.Sd,mf=M.Td,gf=M.Ud,_f=M.Vd,f=P,ci}var v,E=ue();return e.instantiateWasm?new Promise(M=>{e.instantiateWasm(E,(P,O)=>{M(g(P,O))})}):r?g(new WebAssembly.Instance(f,ue()),f):(oe??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",d):d+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href,import.meta.url).href,v=await(async function(M){var P=oe;if(!h&&!T(P))try{var O=fetch(P,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(O,M)}catch(j){I(`wasm streaming compile failed: ${j}`),I("falling back to ArrayBuffer instantiation")}return(async function(j,ne){try{var ye=await(async function(Me){if(!h)try{var Ze=await o(Me);return new Uint8Array(Ze)}catch{}if(Me==oe&&h)Me=new Uint8Array(h);else{if(!u)throw"both async and sync fetching of the wasm failed";Me=u(Me)}return Me})(j);return await WebAssembly.instantiate(ye,ne)}catch(Me){I(`failed to asynchronously prepare wasm: ${Me}`),G(Me)}})(P,M)})(E),g(v.instance,v.module))}class pe{name="ExitStatus";constructor(v){this.message=`Program terminated with exit(${v})`,this.status=v}}var Le=g=>{g.terminate(),g.onmessage=()=>{}},we=[],Oe=0,rt=null,lt=g=>{Be.length==0&&(de(),le(Be[0]));var v=Be.pop();if(!v)return 6;Mt.push(v),k[g.Rc]=v,v.Rc=g.Rc;var E={Sc:"run",Md:g.Ld,bd:g.bd,Rc:g.Rc};return v.postMessage(E,g.rd),0},xt=0,V=(g,v,...E)=>{var M,P=16*E.length,O=nt(),j=ol(P),ne=j>>>3;for(M of E)typeof M=="bigint"?((S(),W)[ne++>>>0]=1n,(S(),W)[ne++>>>0]=M):((S(),W)[ne++>>>0]=0n,(S(),K)[ne++>>>0]=M);return g=Sh(g,0,P,j,v),et(O),g};function tn(g){if(r)return V(0,1,g);if(m=g,!(0<xt)){for(var v of Mt)Le(v);for(v of Be)Le(v);Be=[],Mt=[],k={},R=!0}l(0,new pe(g))}function dt(g){if(r)return V(1,0,g);ut(g)}var ut=g=>{if(m=g,r)throw dt(g),"unwind";tn(g)},Be=[],Mt=[],We=[],k={},$=g=>{var v=g.Rc;delete k[v],Be.push(g),Mt.splice(Mt.indexOf(g),1),g.Rc=0,Mh(v)};function J(){We.forEach(g=>g())}var le=g=>new Promise(v=>{g.onmessage=P=>{var O=P.data;if(P=O.Sc,O.Zc&&O.Zc!=Ra()){var j=k[O.Zc];j?j.postMessage(O,O.rd):I(`Internal error! Worker sent a message "${P}" to target pthread ${O.Zc}, but that thread no longer exists!`)}else P==="checkMailbox"?Sa():P==="spawnThread"?lt(O):P==="cleanupThread"?wa(()=>{$(k[O.Nd])}):P==="loaded"?(g.loaded=!0,v(g)):O.target==="setimmediate"?g.postMessage(O):P==="uncaughtException"?g.onerror(O.error):P==="callHandler"?e[O.wd](...O.args):P&&I(`worker sent an unknown command ${P}`)},g.onerror=P=>{throw I(`worker sent an error! ${P.filename}:${P.lineno}: ${P.message}`),P};var E,M=[];for(E of[])e.propertyIsEnumerable(E)&&M.push(E);g.postMessage({Sc:"load",xd:M,Od:ae,Pd:f})});function de(){var g=new Worker((()=>{let v=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new v("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Be.push(g)}var ae,Fe=(g,v)=>{xt=0,g=ul(g,v),0<xt?m=g:al(g)},ve=[],Ie=0;function pt(g){var v=new $e(g>>>=0);return(S(),A)[v.Tc+12>>>0]==0&&(qe(v,!0),Ie--),je(v,!1),ve.push(v),Ih(g)}var ge=0,Ne=()=>{at(0,0);var g=ve.pop();Ch(g.cd),ge=0};function qe(g,v){v=v?1:0,(S(),A)[g.Tc+12>>>0]=v}function je(g,v){v=v?1:0,(S(),A)[g.Tc+13>>>0]=v}class $e{constructor(v){this.cd=v,this.Tc=v-24}}var ct=g=>{var v=ge;if(!v)return Ps(0),0;var E=new $e(v);(S(),U)[E.Tc+16>>>2>>>0]=v;var M=(S(),U)[E.Tc+4>>>2>>>0];if(!M)return Ps(0),v;for(var P of g){if(P===0||P===M)break;if(Rh(P,M,E.Tc+16))return Ps(P),v}return Ps(M),v};function Qe(){return ct([])}function Tt(g){return ct([g>>>0])}function q(g,v,E,M){return ct([g>>>0,v>>>0,E>>>0,M>>>0])}var Se=()=>{var g=ve.pop();g||G("no exception to throw");var v=g.cd;throw(S(),A)[g.Tc+13>>>0]==0&&(ve.push(g),je(g,!0),qe(g,!1),Ie++),ll(v),ge=v};function se(g,v,E){var M=new $e(g>>>=0);throw v>>>=0,E>>>=0,(S(),U)[M.Tc+16>>>2>>>0]=0,(S(),U)[M.Tc+4>>>2>>>0]=v,(S(),U)[M.Tc+8>>>2>>>0]=E,ll(g),Ie++,ge=g}var ce=()=>Ie;function Ae(g,v,E,M){return r?V(2,1,g,v,E,M):Te(g,v,E,M)}function Te(g,v,E,M){if(g>>>=0,v>>>=0,E>>>=0,M>>>=0,!globalThis.SharedArrayBuffer)return 6;var P=[];return r&&P.length===0?Ae(g,v,E,M):(g={Ld:E,Rc:g,bd:M,rd:P},r?(g.Sc="spawnThread",postMessage(g,P),0):lt(g))}function Je(g){throw ge||=g>>>0,ge}var Ot=globalThis.TextDecoder&&new TextDecoder,Gt=(g,v,E,M)=>{if(E=v+E,M)return E;for(;g[v]&&!(v>=E);)++v;return v},bt=(g,v=0,E,M)=>{if(16<(E=Gt(g,v>>>=0,E,M))-v&&g.buffer&&Ot)return Ot.decode(g.buffer instanceof ArrayBuffer?g.subarray(v,E):g.slice(v,E));for(M="";v<E;){var P=g[v++];if(128&P){var O=63&g[v++];if((224&P)==192)M+=String.fromCharCode((31&P)<<6|O);else{var j=63&g[v++];65536>(P=(240&P)==224?(15&P)<<12|O<<6|j:(7&P)<<18|O<<12|j<<6|63&g[v++])?M+=String.fromCharCode(P):(P-=65536,M+=String.fromCharCode(55296|P>>10,56320|1023&P))}}else M+=String.fromCharCode(P)}return M},_t=(g,v,E)=>(g>>>=0)?bt((S(),L),g,v,E):"";function An(g,v,E){return r?V(3,1,g,v,E):0}function Ss(g,v){if(r)return V(4,1,g,v)}function Ms(g,v){if(r)return V(5,1,g,v)}function Yn(g,v,E){if(r)return V(6,1,g,v,E)}function Dr(g,v,E){return r?V(7,1,g,v,E):0}function Es(g,v){if(r)return V(8,1,g,v)}function Ts(g,v,E){if(r)return V(9,1,g,v,E)}function Wi(g,v,E,M){if(r)return V(10,1,g,v,E,M)}function As(g,v,E,M){if(r)return V(11,1,g,v,E,M)}function qi(g,v,E,M){if(r)return V(12,1,g,v,E,M)}function Cs(g){if(r)return V(13,1,g)}function Rs(g,v){if(r)return V(14,1,g,v)}function xa(g,v,E){if(r)return V(15,1,g,v,E)}var Ko=()=>G(""),Cn=g=>{g>>>=0;for(var v="";;){var E=(S(),L)[g++>>>0];if(!E)return v;v+=String.fromCharCode(E)}},D={},X={},ee=class extends Error{constructor(g){super(g),this.name="BindingError"}};function Q(g,v,E={}){return(function(M,P,O={}){var j=P.name;if(!M)throw new ee(`type "${j}" must have a positive integer typeid pointer`);if(X.hasOwnProperty(M)){if(O.yd)return;throw new ee(`Cannot register type '${j}' twice`)}X[M]=P,D.hasOwnProperty(M)&&(P=D[M],delete D[M],P.forEach(ne=>ne()))})(g,v,E)}var Y=(g,v,E)=>{switch(v){case 1:return E?M=>(S(),A)[M>>>0]:M=>(S(),L)[M>>>0];case 2:return E?M=>(S(),F)[M>>>1>>>0]:M=>(S(),B)[M>>>1>>>0];case 4:return E?M=>(S(),N)[M>>>2>>>0]:M=>(S(),U)[M>>>2>>>0];case 8:return E?M=>(S(),W)[M>>>3>>>0]:M=>(S(),ie)[M>>>3>>>0];default:throw new TypeError(`invalid integer width (${v}): ${g}`)}};function _e(g,v,E,M,P){g>>>=0,E>>>=0,v=Cn(v>>>0);let O=j=>j;if(M=M===0n){let j=8*E;O=ne=>BigInt.asUintN(j,ne),P=O(P)}Q(g,{name:v,Oc:O,Vc:(j,ne)=>(typeof ne=="number"&&(ne=BigInt(ne)),ne),Uc:Y(v,E,!M),Wc:null})}function Ce(g,v,E,M){Q(g>>>=0,{name:v=Cn(v>>>0),Oc:function(P){return!!P},Vc:function(P,O){return O?E:M},Uc:function(P){return this.Oc((S(),L)[P>>>0])},Wc:null})}var ze=[],De=[0,1,,1,null,1,!0,1,!1,1];function Xe(g){9<(g>>>=0)&&--De[g+1]==0&&(De[g]=void 0,ze.push(g))}var He=g=>{if(!g)throw new ee(`Cannot use deleted val. handle = ${g}`);return De[g]},Re=g=>{switch(g){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let v=ze.pop()||De.length;return De[v]=g,De[v+1]=1,v}};function ft(g){return this.Oc((S(),U)[g>>>2>>>0])}var At={name:"emscripten::val",Oc:g=>{var v=He(g);return Xe(g),v},Vc:(g,v)=>Re(v),Uc:ft,Wc:null};function Pt(g){return Q(g>>>0,At)}var nn=(g,v)=>{switch(v){case 4:return function(E){return this.Oc((S(),z)[E>>>2>>>0])};case 8:return function(E){return this.Oc((S(),K)[E>>>3>>>0])};default:throw new TypeError(`invalid float width (${v}): ${g}`)}};function wt(g,v,E){E>>>=0,Q(g>>>=0,{name:v=Cn(v>>>0),Oc:M=>M,Vc:(M,P)=>P,Uc:nn(v,E),Wc:null})}function Ve(g,v,E,M,P){g>>>=0,E>>>=0,v=Cn(v>>>0);let O=ne=>ne;if(M===0){var j=32-8*E;O=ne=>ne<<j>>>j,P=O(P)}Q(g,{name:v,Oc:O,Vc:(ne,ye)=>ye,Uc:Y(v,E,M!==0),Wc:null})}function kn(g,v,E){function M(O){var j=(S(),U)[O>>>2>>>0];return O=(S(),U)[O+4>>>2>>>0],new P((S(),A).buffer,O,j)}var P=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][v];Q(g>>>=0,{name:E=Cn(E>>>0),Oc:M,Uc:M},{yd:!0})}var st=(g,v,E)=>{var M=(S(),L);if(v>>>=0,0<E){var P=v;E=v+E-1;for(var O=0;O<g.length;++O){var j=g.codePointAt(O);if(127>=j){if(v>=E)break;M[v++>>>0]=j}else if(2047>=j){if(v+1>=E)break;M[v++>>>0]=192|j>>6,M[v++>>>0]=128|63&j}else if(65535>=j){if(v+2>=E)break;M[v++>>>0]=224|j>>12,M[v++>>>0]=128|j>>6&63,M[v++>>>0]=128|63&j}else{if(v+3>=E)break;M[v++>>>0]=240|j>>18,M[v++>>>0]=128|j>>12&63,M[v++>>>0]=128|j>>6&63,M[v++>>>0]=128|63&j,O++}}M[v>>>0]=0,g=v-P}else g=0;return g},rn=g=>{for(var v=0,E=0;E<g.length;++E){var M=g.charCodeAt(E);127>=M?v++:2047>=M?v+=2:55296<=M&&57343>=M?(v+=4,++E):v+=3}return v};function Ei(g,v){Q(g>>>=0,{name:v=Cn(v>>>0),Oc(E){var M=(S(),U)[E>>>2>>>0];return M=_t(E+4,M,!0),Qn(E),M},Vc(E,M){M instanceof ArrayBuffer&&(M=new Uint8Array(M));var P=typeof M=="string";if(!(P||ArrayBuffer.isView(M)&&M.BYTES_PER_ELEMENT==1))throw new ee("Cannot pass non-string to std::string");var O=P?rn(M):M.length,j=$s(4+O+1),ne=j+4;return(S(),U)[j>>>2>>>0]=O,P?st(M,ne,O+1):(S(),L).set(M,ne>>>0),E!==null&&E.push(Qn,j),j},Uc:ft,Wc(E){Qn(E)}})}var sn=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,ji=(g,v,E)=>{if(g>>>=1,16<(v=Gt((S(),B),g,v/2,E))-g&&sn)return sn.decode((S(),B).slice(g,v));for(E="";g<v;++g){var M=(S(),B)[g>>>0];E+=String.fromCharCode(M)}return E},Dt=(g,v,E)=>{if(E??=2147483647,2>E)return 0;var M=v;E=(E-=2)<2*g.length?E/2:g.length;for(var P=0;P<E;++P){var O=g.charCodeAt(P);(S(),F)[v>>>1>>>0]=O,v+=2}return(S(),F)[v>>>1>>>0]=0,v-M},Rn=g=>2*g.length,Xi=(g,v,E)=>{var M="";g>>>=2;for(var P=0;!(P>=v/4);P++){var O=(S(),U)[g+P>>>0];if(!O&&!E)break;M+=String.fromCodePoint(O)}return M},pn=(g,v,E)=>{if(v>>>=0,E??=2147483647,4>E)return 0;var M=v;E=M+E-4;for(var P=0;P<g.length;++P){var O=g.codePointAt(P);if(65535<O&&P++,(S(),N)[v>>>2>>>0]=O,(v+=4)+4>E)break}return(S(),N)[v>>>2>>>0]=0,v-M},Kn=g=>{for(var v=0,E=0;E<g.length;++E)65535<g.codePointAt(E)&&E++,v+=4;return v};function Zn(g,v,E){if(g>>>=0,v>>>=0,E=Cn(E>>>=0),v===2)var M=ji,P=Dt,O=Rn;else M=Xi,P=pn,O=Kn;Q(g,{name:E,Oc:j=>{var ne=(S(),U)[j>>>2>>>0];return ne=M(j+4,ne*v,!0),Qn(j),ne},Vc:(j,ne)=>{if(typeof ne!="string")throw new ee(`Cannot pass non-string to C++ string type ${E}`);var ye=O(ne),Me=$s(4+ye+v);return(S(),U)[Me>>>2>>>0]=ye/v,P(ne,Me+4,ye+v),j!==null&&j.push(Qn,Me),Me},Uc:ft,Wc(j){Qn(j)}})}function ba(g,v){Q(g>>>=0,{zd:!0,name:v=Cn(v>>>0),Oc:()=>{},Vc:()=>{}})}function zw(g){sl(g>>>0,!i,1,!t,131072,!1),J()}var wa=g=>{if(!R)try{if(g(),!(0<xt))try{r?Ra()&&al(m):ut(m)}catch(v){v instanceof pe||v=="unwind"||l(0,v)}}catch(v){v instanceof pe||v=="unwind"||l(0,v)}},Bw=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Zo(g){g>>>=0,Bw||(Atomics.waitAsync((S(),N),g>>>2,g).value.then(Sa),g+=128,Atomics.store((S(),N),g>>>2,1))}var Sa=()=>wa(()=>{var g=Ra();g&&(Zo(g),Th())});function Fw(g,v){(g>>>=0)==v>>>0?setTimeout(Sa):r?postMessage({Zc:g,Sc:"checkMailbox"}):(g=k[g])&&g.postMessage({Sc:"checkMailbox"})}var Jo=[];function Vw(g,v,E,M,P){for(v>>>=0,P>>>=0,Jo.length=0,E=P>>>3,M=P+M>>>3;E<M;){var O;O=(S(),W)[E++>>>0]?(S(),W)[E++>>>0]:(S(),K)[E++>>>0],Jo.push(O)}return(v?cl[v]:P1[g])(...Jo)}var Hw=()=>{xt=0};function Gw(g){g>>>=0,r?postMessage({Sc:"cleanupThread",Nd:g}):$(k[g])}function Ww(g){}var Ma=g=>{try{g()}catch(v){G(v)}};function qw(g){var v=(...E)=>{Ea.push(g);try{return g(...E)}finally{R||(Ea.pop(),Jn&&Ti===1&&Ea.length===0&&(Ti=0,xt+=1,Ma(mf),typeof Fibers<"u"&&Fibers.Zd()))}};return nh.set(g,v),v}var Ti=0,Jn=null,eh=0,Ea=[],Qo=new Map,th=new Map,nh=new Map,jw=0,el=null,Xw=[],ih=g=>(function(v){if(!R){if(Ti===0){var E=!1,M=!1;v((P=0)=>{if(!R&&(eh=P,E=!0,M)){Ti=2,Ma(()=>gf(Jn)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),P=!1;try{var O=(function(){var ye=(S(),N)[Jn+8>>>2>>>0];return ye=th.get(ye),ye=nh.get(ye),--xt,ye()})()}catch(ye){O=ye,P=!0}var j=!1;if(!Jn){var ne=el;ne&&(el=null,(P?ne.reject:ne.resolve)(O),j=!0)}if(P&&!j)throw O}}),M=!0,E||(Ti=1,Jn=(function(){var P=$s(65548),O=P+12;if((S(),U)[P>>>2>>>0]=O,(S(),U)[P+4>>>2>>>0]=O+65536,O=Ea[0],!Qo.has(O)){var j=jw++;Qo.set(O,j),th.set(j,O)}return O=Qo.get(O),(S(),N)[P+8>>>2>>>0]=O,P})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Ma(()=>pf(Jn)))}else Ti===2?(Ti=0,Ma(_f),Qn(Jn),Jn=null,Xw.forEach(wa)):G(`invalid state: ${Ti}`);return eh}})(v=>{g().then(v)});function Yw(g){return g>>>=0,ih(async()=>{var v=await He(g);return Re(v)})}var tl=[],Kw=g=>{var v=tl.length;return tl.push(g),v},Zw=(g,v)=>{for(var E=Array(g),M=0;M<g;++M){var P=M,O=(S(),U)[v+4*M>>>2>>>0],j=X[O];if(j===void 0)throw g=`parameter ${M}`,O=xh(O),v=Cn(O),Qn(O),new ee(`${g} has unknown type ${v}`);E[P]=j}return E},Jw=(g,v,E)=>{var M=[];return g=g(M,E),M.length&&((S(),U)[v>>>2>>>0]=Re(M)),g},Qw={},Ta=g=>{var v=Qw[g];return v===void 0?Cn(g):v};function e1(g,v,E){var[M,...P]=Zw(g,v>>>0);v=M.Vc.bind(M);var O=P.map(ye=>ye.Uc.bind(ye));g--;var j={toValue:He};switch(g=O.map((ye,Me)=>{var Ze=`argFromPtr${Me}`;return j[Ze]=ye,`${Ze}(args${Me?"+"+8*Me:""})`}),E){case 0:var ne="toValue(handle)";break;case 2:ne="new (toValue(handle))";break;case 3:ne="";break;case 1:j.getStringOrSymbol=Ta,ne="toValue(handle)[getStringOrSymbol(methodName)]"}return ne+=`(${g})`,M.zd||(j.toReturnWire=v,j.emval_returnValue=Jw,ne=`return emval_returnValue(toReturnWire, destructorsRef, ${ne})`),ne=`return function (handle, methodName, destructorsRef, args) {
  ${ne}
  }`,E=new Function(Object.keys(j),ne)(...Object.values(j)),ne=`methodCaller<(${P.map(ye=>ye.name)}) => ${M.name}>`,Kw(Object.defineProperty(E,"name",{value:ne}))}function t1(g,v){return v>>>=0,(g=He(g>>>0))==He(v)}function n1(g){return(g>>>=0)?(g=Ta(g),Re(globalThis[g])):Re(globalThis)}function i1(g){return g=Ta(g>>>0),Re(e[g])}function r1(g,v){return v>>>=0,g=He(g>>>0),v=He(v),Re(g[v])}function s1(g){9<(g>>>=0)&&(De[g+1]+=1)}function rh(g,v,E,M,P){return tl[g>>>0](v>>>0,E>>>0,M>>>0,P>>>0)}function a1(g,v,E,M,P){return rh(g>>>0,v>>>0,E>>>0,M>>>0,P>>>0)}function o1(){return Re([])}function l1(g){g=He(g>>>0);for(var v=Array(g.length),E=0;E<g.length;E++)v[E]=g[E];return Re(v)}function u1(g){return Re(Ta(g>>>0))}function c1(){return Re({})}function d1(g){for(var v=He(g>>>=0);v.length;){var E=v.pop();v.pop()(E)}Xe(g)}function h1(g,v,E){v>>>=0,E>>>=0,g=He(g>>>0),v=He(v),E=He(E),g[v]=E}function f1(g,v){g=-9007199254740992>g||9007199254740992<g?NaN:Number(g),v>>>=0,g=new Date(1e3*g),(S(),N)[v>>>2>>>0]=g.getUTCSeconds(),(S(),N)[v+4>>>2>>>0]=g.getUTCMinutes(),(S(),N)[v+8>>>2>>>0]=g.getUTCHours(),(S(),N)[v+12>>>2>>>0]=g.getUTCDate(),(S(),N)[v+16>>>2>>>0]=g.getUTCMonth(),(S(),N)[v+20>>>2>>>0]=g.getUTCFullYear()-1900,(S(),N)[v+24>>>2>>>0]=g.getUTCDay(),g=(g.getTime()-Date.UTC(g.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(S(),N)[v+28>>>2>>>0]=g}var sh=g=>g%4==0&&(g%100!=0||g%400==0),ah=[0,31,60,91,121,152,182,213,244,274,305,335],oh=[0,31,59,90,120,151,181,212,243,273,304,334];function p1(g,v){g=-9007199254740992>g||9007199254740992<g?NaN:Number(g),v>>>=0,g=new Date(1e3*g),(S(),N)[v>>>2>>>0]=g.getSeconds(),(S(),N)[v+4>>>2>>>0]=g.getMinutes(),(S(),N)[v+8>>>2>>>0]=g.getHours(),(S(),N)[v+12>>>2>>>0]=g.getDate(),(S(),N)[v+16>>>2>>>0]=g.getMonth(),(S(),N)[v+20>>>2>>>0]=g.getFullYear()-1900,(S(),N)[v+24>>>2>>>0]=g.getDay();var E=(sh(g.getFullYear())?ah:oh)[g.getMonth()]+g.getDate()-1|0;(S(),N)[v+28>>>2>>>0]=E,(S(),N)[v+36>>>2>>>0]=-60*g.getTimezoneOffset(),E=new Date(g.getFullYear(),6,1).getTimezoneOffset();var M=new Date(g.getFullYear(),0,1).getTimezoneOffset();g=0|(E!=M&&g.getTimezoneOffset()==Math.min(M,E)),(S(),N)[v+32>>>2>>>0]=g}function m1(g){g>>>=0;var v=new Date((S(),N)[g+20>>>2>>>0]+1900,(S(),N)[g+16>>>2>>>0],(S(),N)[g+12>>>2>>>0],(S(),N)[g+8>>>2>>>0],(S(),N)[g+4>>>2>>>0],(S(),N)[g>>>2>>>0],0),E=(S(),N)[g+32>>>2>>>0],M=v.getTimezoneOffset(),P=new Date(v.getFullYear(),6,1).getTimezoneOffset(),O=new Date(v.getFullYear(),0,1).getTimezoneOffset(),j=Math.min(O,P);return 0>E?(S(),N)[g+32>>>2>>>0]=+(P!=O&&j==M):0<E!=(j==M)&&(P=Math.max(O,P),v.setTime(v.getTime()+6e4*((0<E?j:P)-M))),(S(),N)[g+24>>>2>>>0]=v.getDay(),E=(sh(v.getFullYear())?ah:oh)[v.getMonth()]+v.getDate()-1|0,(S(),N)[g+28>>>2>>>0]=E,(S(),N)[g>>>2>>>0]=v.getSeconds(),(S(),N)[g+4>>>2>>>0]=v.getMinutes(),(S(),N)[g+8>>>2>>>0]=v.getHours(),(S(),N)[g+12>>>2>>>0]=v.getDate(),(S(),N)[g+16>>>2>>>0]=v.getMonth(),(S(),N)[g+20>>>2>>>0]=v.getYear(),g=v.getTime(),BigInt(isNaN(g)?-1:g/1e3)}function lh(g,v,E,M,P,O,j){return r?V(16,1,g,v,E,M,P,O,j):-52}function uh(g,v,E,M,P,O){if(r)return V(17,1,g,v,E,M,P,O)}var Is={},g1=()=>performance.timeOrigin+performance.now();function ch(g,v){if(r)return V(18,1,g,v);if(Is[g]&&(clearTimeout(Is[g].id),delete Is[g]),!v)return 0;var E=setTimeout(()=>{delete Is[g],wa(()=>Eh(g,performance.timeOrigin+performance.now()))},v);return Is[g]={id:E,Yd:v},0}function _1(g,v,E,M){g>>>=0,v>>>=0,E>>>=0,M>>>=0;var P=new Date().getFullYear(),O=new Date(P,0,1).getTimezoneOffset();P=new Date(P,6,1).getTimezoneOffset();var j=Math.max(O,P);(S(),U)[g>>>2>>>0]=60*j,(S(),N)[v>>>2>>>0]=+(O!=P),g=(v=ne=>{var ye=Math.abs(ne);return`UTC${0<=ne?"-":"+"}${String(Math.floor(ye/60)).padStart(2,"0")}${String(ye%60).padStart(2,"0")}`})(O),v=v(P),P<O?(st(g,E,17),st(v,M,17)):(st(g,M,17),st(v,E,17))}var y1=()=>Date.now();function v1(g,v,E){return E>>>=0,0<=g&&3>=g?(g===0?g=Date.now():g=performance.timeOrigin+performance.now(),g=Math.round(1e6*g),(S(),W)[E>>>3>>>0]=BigInt(g),0):28}var nl=[],dh=(g,v)=>{nl.length=0;for(var E;E=(S(),L)[g++>>>0];){var M=E!=105;v+=(M&=E!=112)&&v%8?4:0,nl.push(E==112?(S(),U)[v>>>2>>>0]:E==106?(S(),W)[v>>>3>>>0]:E==105?(S(),N)[v>>>2>>>0]:(S(),K)[v>>>3>>>0]),v+=M?8:4}return nl};function x1(g,v,E){return g>>>=0,v=dh(v>>>0,E>>>0),cl[g](...v)}function b1(g,v,E){return g>>>=0,v=dh(v>>>0,E>>>0),cl[g](...v)}var w1=()=>{};function S1(g,v){return I(_t(g>>>0,v>>>0))}var M1=()=>{throw xt+=1,"unwind"};function E1(){return 4294901760}var T1=()=>navigator.hardwareConcurrency,Yi={},Aa=g=>{var v;return(v=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(g))?+v[1]:(v=/:(\d+):\d+(?:\)|$)/.exec(g))?2147483648|+v[1]:0},hh=g=>{for(var v of g)(g=Aa(v))&&(Yi[g]=v)};function A1(){var g=Error().stack.toString().split(`
`);return g[0]=="Error"&&g.shift(),hh(g),Yi.gd=Aa(g[3]),Yi.Jd=g,Yi.gd}function Ca(g){if(!(g=Yi[g>>>0]))return 0;var v;if(v=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(g))g=v[1];else if(v=/^\s+at (.*) \(.*\)$/.exec(g))g=v[1];else{if(!(v=/^(.+?)@/.exec(g)))return 0;g=v[1]}Qn(Ca.hd??0),v=rn(g)+1;var E=$s(v);return E&&st(g,E,v),Ca.hd=E,Ca.hd}function C1(g){g>>>=0;var v=(S(),L).length;if(g<=v||4294901760<g)return!1;for(var E=1;4>=E;E*=2){var M=v*(1+.2/E);M=Math.min(M,g+100663296);e:{M=(Math.min(4294901760,65536*Math.ceil(Math.max(g,M)/65536))-ae.buffer.byteLength+65535)/65536|0;try{ae.grow(M),he();var P=1;break e}catch{}P=void 0}if(P)return!0}return!1}function R1(g,v,E){if(g>>>=0,v>>>=0,Yi.gd==g)var M=Yi.Jd;else(M=Error().stack.toString().split(`
`))[0]=="Error"&&M.shift(),hh(M);for(var P=3;M[P]&&Aa(M[P])!=g;)++P;for(g=0;g<E&&M[g+P];++g)(S(),N)[v+4*g>>>2>>>0]=Aa(M[g+P]);return g}var il,rl={},fh=()=>{if(!il){var g,v={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(g in rl)rl[g]===void 0?delete v[g]:v[g]=rl[g];var E=[];for(g in v)E.push(`${g}=${v[g]}`);il=E}return il};function ph(g,v){if(r)return V(19,1,g,v);g>>>=0,v>>>=0;var E,M=0,P=0;for(E of fh()){var O=v+M;(S(),U)[g+P>>>2>>>0]=O,M+=st(E,O,1/0)+1,P+=4}return 0}function mh(g,v){if(r)return V(20,1,g,v);g>>>=0,v>>>=0;var E=fh();for(var M of((S(),U)[g>>>2>>>0]=E.length,g=0,E))g+=rn(M)+1;return(S(),U)[v>>>2>>>0]=g,0}function gh(g){return r?V(21,1,g):52}function _h(g,v,E,M){return r?V(22,1,g,v,E,M):52}function yh(g,v,E,M){return r?V(23,1,g,v,E,M):70}var I1=[null,[],[]];function vh(g,v,E,M){if(r)return V(24,1,g,v,E,M);v>>>=0,E>>>=0,M>>>=0;for(var P=0,O=0;O<E;O++){var j=(S(),U)[v>>>2>>>0],ne=(S(),U)[v+4>>>2>>>0];v+=8;for(var ye=0;ye<ne;ye++){var Me=g,Ze=(S(),L)[j+ye>>>0],mt=I1[Me];Ze===0||Ze===10?((Me===1?b:I)(bt(mt)),mt.length=0):mt.push(Ze)}P+=ne}return(S(),U)[M>>>2>>>0]=P,0}function $1(g){return g>>>0}r||(function(){for(var g=e.numThreads-1;g--;)de();we.push(async()=>{var v=(async function(){if(!r)return Promise.all(Be.map(le))})();Oe++,await v,--Oe==0&&rt&&(v=rt,rt=null,v())})})(),r||(ae=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),he()),e.wasmBinary&&(h=e.wasmBinary),e.stackSave=()=>nt(),e.stackRestore=g=>et(g),e.stackAlloc=g=>ol(g),e.setValue=function(g,v,E="i8"){switch(E.endsWith("*")&&(E="*"),E){case"i1":case"i8":(S(),A)[g>>>0]=v;break;case"i16":(S(),F)[g>>>1>>>0]=v;break;case"i32":(S(),N)[g>>>2>>>0]=v;break;case"i64":(S(),W)[g>>>3>>>0]=BigInt(v);break;case"float":(S(),z)[g>>>2>>>0]=v;break;case"double":(S(),K)[g>>>3>>>0]=v;break;case"*":(S(),U)[g>>>2>>>0]=v;break;default:G(`invalid type for setValue: ${E}`)}},e.getValue=function(g,v="i8"){switch(v.endsWith("*")&&(v="*"),v){case"i1":case"i8":return(S(),A)[g>>>0];case"i16":return(S(),F)[g>>>1>>>0];case"i32":return(S(),N)[g>>>2>>>0];case"i64":return(S(),W)[g>>>3>>>0];case"float":return(S(),z)[g>>>2>>>0];case"double":return(S(),K)[g>>>3>>>0];case"*":return(S(),U)[g>>>2>>>0];default:G(`invalid type for getValue: ${v}`)}},e.UTF8ToString=_t,e.stringToUTF8=st,e.lengthBytesUTF8=rn;var xh,bh,Ra,Qn,$s,sl,wh,Sh,Mh,al,Eh,Th,at,Ps,Ah,et,ol,nt,Ch,ll,Rh,Ih,$h,ul,Ph,Dh,Lh,Nh,kh,Oh,Uh,zh,Bh,Fh,Vh,Hh,Gh,Wh,qh,jh,Xh,Yh,Kh,Zh,Jh,Qh,ef,tf,nf,rf,sf,af,of,lf,uf,cf,df,hf,ff,pf,mf,gf,_f,ci,P1=[tn,dt,Ae,An,Ss,Ms,Yn,Dr,Es,Ts,Wi,As,qi,Cs,Rs,xa,lh,uh,ch,ph,mh,gh,_h,yh,vh],cl={973212:(g,v,E,M,P)=>{if(e===void 0||!e.Xc)return 1;if((g=_t(Number(g>>>0))).startsWith("./")&&(g=g.substring(2)),!(g=e.Xc.get(g)))return 2;if(v=Number(v>>>0),E=Number(E>>>0),M=Number(M>>>0),v+E>g.byteLength)return 3;try{let O=g.subarray(v,v+E);switch(P){case 0:(S(),L).set(O,M>>>0);break;case 1:e.Qd?e.Qd(M,O):e.Id(M,O);break;default:return 4}return 0}catch{return 4}},974036:(g,v,E)=>{e.td(g,(S(),L).subarray(v>>>0,v+E>>>0))},974100:()=>e.Wd(),974142:g=>{e.sd(g)},974179:()=>{e.Bd()},974210:()=>{e.Cd()},974239:()=>{e.Gd()},974264:g=>e.Ad(g),974297:g=>e.Ed(g),974329:(g,v,E)=>{e.ed(Number(g),Number(v),Number(E),!0)},974392:(g,v,E)=>{e.ed(Number(g),Number(v),Number(E))},974449:()=>typeof wasmOffsetConverter<"u",974506:g=>{e.$b("Abs",g,void 0)},974557:g=>{e.$b("Neg",g,void 0)},974608:g=>{e.$b("Floor",g,void 0)},974661:g=>{e.$b("Ceil",g,void 0)},974713:g=>{e.$b("Reciprocal",g,void 0)},974771:g=>{e.$b("Sqrt",g,void 0)},974823:g=>{e.$b("Exp",g,void 0)},974874:g=>{e.$b("Erf",g,void 0)},974925:g=>{e.$b("Sigmoid",g,void 0)},974980:(g,v,E)=>{e.$b("HardSigmoid",g,{alpha:v,beta:E})},975059:g=>{e.$b("Log",g,void 0)},975110:g=>{e.$b("Sin",g,void 0)},975161:g=>{e.$b("Cos",g,void 0)},975212:g=>{e.$b("Tan",g,void 0)},975263:g=>{e.$b("Asin",g,void 0)},975315:g=>{e.$b("Acos",g,void 0)},975367:g=>{e.$b("Atan",g,void 0)},975419:g=>{e.$b("Sinh",g,void 0)},975471:g=>{e.$b("Cosh",g,void 0)},975523:g=>{e.$b("Asinh",g,void 0)},975576:g=>{e.$b("Acosh",g,void 0)},975629:g=>{e.$b("Atanh",g,void 0)},975682:g=>{e.$b("Tanh",g,void 0)},975734:g=>{e.$b("Not",g,void 0)},975785:(g,v,E)=>{e.$b("Clip",g,{min:v,max:E})},975854:g=>{e.$b("Clip",g,void 0)},975906:(g,v)=>{e.$b("Elu",g,{alpha:v})},975964:g=>{e.$b("Gelu",g,void 0)},976016:g=>{e.$b("Relu",g,void 0)},976068:(g,v)=>{e.$b("LeakyRelu",g,{alpha:v})},976132:(g,v)=>{e.$b("ThresholdedRelu",g,{alpha:v})},976202:(g,v)=>{e.$b("Cast",g,{to:v})},976260:g=>{e.$b("Add",g,void 0)},976311:g=>{e.$b("Sub",g,void 0)},976362:g=>{e.$b("Mul",g,void 0)},976413:g=>{e.$b("Div",g,void 0)},976464:g=>{e.$b("Pow",g,void 0)},976515:g=>{e.$b("Equal",g,void 0)},976568:g=>{e.$b("Greater",g,void 0)},976623:g=>{e.$b("GreaterOrEqual",g,void 0)},976685:g=>{e.$b("Less",g,void 0)},976737:g=>{e.$b("LessOrEqual",g,void 0)},976796:(g,v,E,M,P)=>{e.$b("ReduceMean",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},976971:(g,v,E,M,P)=>{e.$b("ReduceMax",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},977145:(g,v,E,M,P)=>{e.$b("ReduceMin",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},977319:(g,v,E,M,P)=>{e.$b("ReduceProd",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},977494:(g,v,E,M,P)=>{e.$b("ReduceSum",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},977668:(g,v,E,M,P)=>{e.$b("ReduceL1",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},977841:(g,v,E,M,P)=>{e.$b("ReduceL2",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},978014:(g,v,E,M,P)=>{e.$b("ReduceLogSum",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},978191:(g,v,E,M,P)=>{e.$b("ReduceSumSquare",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},978371:(g,v,E,M,P)=>{e.$b("ReduceLogSumExp",g,{keepDims:!!v,noopWithEmptyAxes:!!E,axes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},978551:g=>{e.$b("Where",g,void 0)},978604:(g,v,E)=>{e.$b("Transpose",g,{perm:v?Array.from((S(),N).subarray(Number(v)>>>0,Number(E)>>>0)):[]})},978728:(g,v,E,M)=>{e.$b("DepthToSpace",g,{blocksize:v,mode:_t(E),format:M?"NHWC":"NCHW"})},978861:(g,v,E,M)=>{e.$b("DepthToSpace",g,{blocksize:v,mode:_t(E),format:M?"NHWC":"NCHW"})},978994:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt,Ai)=>{e.$b("ConvTranspose",g,{format:ye?"NHWC":"NCHW",autoPad:v,dilations:[E],group:M,kernelShape:[P],pads:[O,j],strides:[ne],wIsConst:()=>!!(S(),A)[Me>>>0],outputPadding:Ze?Array.from((S(),N).subarray(Number(Ze)>>>0,Number(mt)>>>0)):[],outputShape:Et?Array.from((S(),N).subarray(Number(Et)>>>0,Number(Lt)>>>0)):[],activation:_t(Ai)})},979427:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt)=>{e.$b("ConvTranspose",g,{format:ne?"NHWC":"NCHW",autoPad:v,dilations:Array.from((S(),N).subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),group:M,kernelShape:Array.from((S(),N).subarray(Number(P)>>>0,2+(Number(P)>>>0)>>>0)),pads:Array.from((S(),N).subarray(Number(O)>>>0,4+(Number(O)>>>0)>>>0)),strides:Array.from((S(),N).subarray(Number(j)>>>0,2+(Number(j)>>>0)>>>0)),wIsConst:()=>!!(S(),A)[ye>>>0],outputPadding:Me?Array.from((S(),N).subarray(Number(Me)>>>0,Number(Ze)>>>0)):[],outputShape:mt?Array.from((S(),N).subarray(Number(mt)>>>0,Number(Et)>>>0)):[],activation:_t(Lt)})},980088:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt,Ai)=>{e.$b("ConvTranspose",g,{format:ye?"NHWC":"NCHW",autoPad:v,dilations:[E],group:M,kernelShape:[P],pads:[O,j],strides:[ne],wIsConst:()=>!!(S(),A)[Me>>>0],outputPadding:Ze?Array.from((S(),N).subarray(Number(Ze)>>>0,Number(mt)>>>0)):[],outputShape:Et?Array.from((S(),N).subarray(Number(Et)>>>0,Number(Lt)>>>0)):[],activation:_t(Ai)})},980521:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt)=>{e.$b("ConvTranspose",g,{format:ne?"NHWC":"NCHW",autoPad:v,dilations:Array.from((S(),N).subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),group:M,kernelShape:Array.from((S(),N).subarray(Number(P)>>>0,2+(Number(P)>>>0)>>>0)),pads:Array.from((S(),N).subarray(Number(O)>>>0,4+(Number(O)>>>0)>>>0)),strides:Array.from((S(),N).subarray(Number(j)>>>0,2+(Number(j)>>>0)>>>0)),wIsConst:()=>!!(S(),A)[ye>>>0],outputPadding:Me?Array.from((S(),N).subarray(Number(Me)>>>0,Number(Ze)>>>0)):[],outputShape:mt?Array.from((S(),N).subarray(Number(mt)>>>0,Number(Et)>>>0)):[],activation:_t(Lt)})},981182:(g,v)=>{e.$b("GlobalAveragePool",g,{format:v?"NHWC":"NCHW"})},981273:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt)=>{e.$b("AveragePool",g,{format:Lt?"NHWC":"NCHW",auto_pad:v,ceil_mode:E,count_include_pad:M,storage_order:P,dilations:O?Array.from((S(),N).subarray(Number(O)>>>0,Number(j)>>>0)):[],kernel_shape:ne?Array.from((S(),N).subarray(Number(ne)>>>0,Number(ye)>>>0)):[],pads:Me?Array.from((S(),N).subarray(Number(Me)>>>0,Number(Ze)>>>0)):[],strides:mt?Array.from((S(),N).subarray(Number(mt)>>>0,Number(Et)>>>0)):[]})},981752:(g,v)=>{e.$b("GlobalAveragePool",g,{format:v?"NHWC":"NCHW"})},981843:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt)=>{e.$b("AveragePool",g,{format:Lt?"NHWC":"NCHW",auto_pad:v,ceil_mode:E,count_include_pad:M,storage_order:P,dilations:O?Array.from((S(),N).subarray(Number(O)>>>0,Number(j)>>>0)):[],kernel_shape:ne?Array.from((S(),N).subarray(Number(ne)>>>0,Number(ye)>>>0)):[],pads:Me?Array.from((S(),N).subarray(Number(Me)>>>0,Number(Ze)>>>0)):[],strides:mt?Array.from((S(),N).subarray(Number(mt)>>>0,Number(Et)>>>0)):[]})},982322:(g,v)=>{e.$b("GlobalMaxPool",g,{format:v?"NHWC":"NCHW"})},982409:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt)=>{e.$b("MaxPool",g,{format:Lt?"NHWC":"NCHW",auto_pad:v,ceil_mode:E,count_include_pad:M,storage_order:P,dilations:O?Array.from((S(),N).subarray(Number(O)>>>0,Number(j)>>>0)):[],kernel_shape:ne?Array.from((S(),N).subarray(Number(ne)>>>0,Number(ye)>>>0)):[],pads:Me?Array.from((S(),N).subarray(Number(Me)>>>0,Number(Ze)>>>0)):[],strides:mt?Array.from((S(),N).subarray(Number(mt)>>>0,Number(Et)>>>0)):[]})},982884:(g,v)=>{e.$b("GlobalMaxPool",g,{format:v?"NHWC":"NCHW"})},982971:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt)=>{e.$b("MaxPool",g,{format:Lt?"NHWC":"NCHW",auto_pad:v,ceil_mode:E,count_include_pad:M,storage_order:P,dilations:O?Array.from((S(),N).subarray(Number(O)>>>0,Number(j)>>>0)):[],kernel_shape:ne?Array.from((S(),N).subarray(Number(ne)>>>0,Number(ye)>>>0)):[],pads:Me?Array.from((S(),N).subarray(Number(Me)>>>0,Number(Ze)>>>0)):[],strides:mt?Array.from((S(),N).subarray(Number(mt)>>>0,Number(Et)>>>0)):[]})},983446:(g,v,E,M,P)=>{e.$b("Gemm",g,{alpha:v,beta:E,transA:M,transB:P})},983550:g=>{e.$b("MatMul",g,void 0)},983604:(g,v,E,M)=>{e.$b("ArgMax",g,{keepDims:!!v,selectLastIndex:!!E,axis:M})},983712:(g,v,E,M)=>{e.$b("ArgMin",g,{keepDims:!!v,selectLastIndex:!!E,axis:M})},983820:(g,v)=>{e.$b("Softmax",g,{axis:v})},983883:(g,v)=>{e.$b("Concat",g,{axis:v})},983943:(g,v,E,M,P)=>{e.$b("Split",g,{axis:v,numOutputs:E,splitSizes:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},984099:g=>{e.$b("Expand",g,void 0)},984153:(g,v)=>{e.$b("Gather",g,{axis:Number(v)})},984224:(g,v)=>{e.$b("GatherElements",g,{axis:Number(v)})},984303:(g,v)=>{e.$b("GatherND",g,{batch_dims:Number(v)})},984382:(g,v,E,M,P,O,j,ne,ye,Me,Ze)=>{e.$b("Resize",g,{antialias:v,axes:E?Array.from((S(),N).subarray(Number(E)>>>0,Number(M)>>>0)):[],coordinateTransformMode:_t(P),cubicCoeffA:O,excludeOutside:j,extrapolationValue:ne,keepAspectRatioPolicy:_t(ye),mode:_t(Me),nearestMode:_t(Ze)})},984744:(g,v,E,M,P,O,j)=>{e.$b("Slice",g,{starts:v?Array.from((S(),N).subarray(Number(v)>>>0,Number(E)>>>0)):[],ends:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[],axes:O?Array.from((S(),N).subarray(Number(O)>>>0,Number(j)>>>0)):[]})},985008:g=>{e.$b("Tile",g,void 0)},985060:(g,v,E)=>{e.$b("InstanceNormalization",g,{epsilon:v,format:E?"NHWC":"NCHW"})},985174:(g,v,E)=>{e.$b("InstanceNormalization",g,{epsilon:v,format:E?"NHWC":"NCHW"})},985288:g=>{e.$b("Range",g,void 0)},985341:(g,v)=>{e.$b("Einsum",g,{equation:_t(v)})},985422:(g,v,E,M,P)=>{e.$b("Pad",g,{mode:v,value:E,pads:M?Array.from((S(),N).subarray(Number(M)>>>0,Number(P)>>>0)):[]})},985565:(g,v,E,M,P,O)=>{e.$b("BatchNormalization",g,{epsilon:v,momentum:E,spatial:!!P,trainingMode:!!M,format:O?"NHWC":"NCHW"})},985734:(g,v,E,M,P,O)=>{e.$b("BatchNormalization",g,{epsilon:v,momentum:E,spatial:!!P,trainingMode:!!M,format:O?"NHWC":"NCHW"})},985903:(g,v,E)=>{e.$b("CumSum",g,{exclusive:Number(v),reverse:Number(E)})},986e3:(g,v,E)=>{e.$b("DequantizeLinear",g,{axis:v,blockSize:E})},986090:(g,v,E,M,P)=>{e.$b("GridSample",g,{align_corners:v,mode:_t(E),padding_mode:_t(M),format:P?"NHWC":"NCHW"})},986260:(g,v,E,M,P)=>{e.$b("GridSample",g,{align_corners:v,mode:_t(E),padding_mode:_t(M),format:P?"NHWC":"NCHW"})},986430:(g,v)=>{e.$b("ScatterND",g,{reduction:_t(v)})},986515:(g,v,E,M,P,O,j,ne,ye)=>{e.$b("Attention",g,{numHeads:v,isUnidirectional:E,maskFilterValue:M,scale:P,doRotary:O,qkvHiddenSizes:j?Array.from((S(),N).subarray(Number(ne)>>>0,Number(ne)+j>>>0)):[],pastPresentShareBuffer:!!ye})},986787:g=>{e.$b("BiasAdd",g,void 0)},986842:g=>{e.$b("BiasSplitGelu",g,void 0)},986903:g=>{e.$b("FastGelu",g,void 0)},986959:(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt,Ai,dl)=>{e.$b("Conv",g,{format:mt?"NHWC":"NCHW",auto_pad:v,dilations:E?Array.from((S(),N).subarray(Number(E)>>>0,Number(M)>>>0)):[],group:P,kernel_shape:O?Array.from((S(),N).subarray(Number(O)>>>0,Number(j)>>>0)):[],pads:ne?Array.from((S(),N).subarray(Number(ne)>>>0,Number(ye)>>>0)):[],strides:Me?Array.from((S(),N).subarray(Number(Me)>>>0,Number(Ze)>>>0)):[],w_is_const:()=>!!(S(),A)[Number(Et)>>>0],activation:_t(Lt),activation_params:Ai?Array.from((S(),z).subarray(Number(Ai)>>>0,Number(dl)>>>0)):[]})},987543:g=>{e.$b("Gelu",g,void 0)},987595:(g,v,E,M,P,O,j,ne,ye)=>{e.$b("GroupQueryAttention",g,{numHeads:v,kvNumHeads:E,scale:M,softcap:P,doRotary:O,rotaryInterleaved:j,smoothSoftmax:ne,localWindowSize:ye})},987812:(g,v,E,M)=>{e.$b("LayerNormalization",g,{axis:v,epsilon:E,simplified:!!M})},987923:(g,v,E,M)=>{e.$b("LayerNormalization",g,{axis:v,epsilon:E,simplified:!!M})},988034:(g,v,E,M,P,O)=>{e.$b("MatMulNBits",g,{k:v,n:E,accuracyLevel:M,bits:P,blockSize:O})},988161:(g,v,E,M,P,O)=>{e.$b("MultiHeadAttention",g,{numHeads:v,isUnidirectional:E,maskFilterValue:M,scale:P,doRotary:O})},988320:(g,v)=>{e.$b("QuickGelu",g,{alpha:v})},988384:(g,v,E,M,P)=>{e.$b("RotaryEmbedding",g,{interleaved:!!v,numHeads:E,rotaryEmbeddingDim:M,scale:P})},988523:(g,v,E)=>{e.$b("SkipLayerNormalization",g,{epsilon:v,simplified:!!E})},988625:(g,v,E)=>{e.$b("SkipLayerNormalization",g,{epsilon:v,simplified:!!E})},988727:(g,v,E,M)=>{e.$b("GatherBlockQuantized",g,{gatherAxis:v,quantizeAxis:E,blockSize:M})},988848:g=>{e.Fd(g)},988882:(g,v)=>e.Hd(Number(g),Number(v),e.Yc.Kd,e.Yc.errors)};function D1(g,v,E){return ih(async()=>{await e.Dd(Number(g),Number(v),Number(E))})}function L1(){return typeof wasmOffsetConverter<"u"}function N1(g,v,E,M){var P=nt();try{return zh(g,v,E,M)}catch(O){if(et(P),O!==O+0)throw O;at(1,0)}}function k1(g,v,E){var M=nt();try{return Nh(g,v,E)}catch(P){if(et(M),P!==P+0)throw P;at(1,0)}}function O1(g){var v=nt();try{Ph(g)}catch(E){if(et(v),E!==E+0)throw E;at(1,0)}}function U1(g,v){var E=nt();try{return ul(g,v)}catch(M){if(et(E),M!==M+0)throw M;at(1,0)}}function z1(g,v,E){var M=nt();try{$h(g,v,E)}catch(P){if(et(M),P!==P+0)throw P;at(1,0)}}function B1(g,v){var E=nt();try{Bh(g,v)}catch(M){if(et(E),M!==M+0)throw M;at(1,0)}}function F1(g,v,E,M,P,O,j){var ne=nt();try{return Oh(g,v,E,M,P,O,j)}catch(ye){if(et(ne),ye!==ye+0)throw ye;at(1,0)}}function V1(g,v,E,M,P,O){var j=nt();try{Dh(g,v,E,M,P,O)}catch(ne){if(et(j),ne!==ne+0)throw ne;at(1,0)}}function H1(g,v,E,M){var P=nt();try{Uh(g,v,E,M)}catch(O){if(et(P),O!==O+0)throw O;at(1,0)}}function G1(g,v,E,M,P){var O=nt();try{Lh(g,v,E,M,P)}catch(j){if(et(O),j!==j+0)throw j;at(1,0)}}function W1(g,v,E,M,P,O,j){var ne=nt();try{Vh(g,v,E,M,P,O,j)}catch(ye){if(et(ne),ye!==ye+0)throw ye;at(1,0)}}function q1(g,v,E,M,P,O,j){var ne=nt();try{Hh(g,v,E,M,P,O,j)}catch(ye){if(et(ne),ye!==ye+0)throw ye;at(1,0)}}function j1(g,v,E,M,P,O,j,ne){var ye=nt();try{jh(g,v,E,M,P,O,j,ne)}catch(Me){if(et(ye),Me!==Me+0)throw Me;at(1,0)}}function X1(g,v,E,M,P){var O=nt();try{return Fh(g,v,E,M,P)}catch(j){if(et(O),j!==j+0)throw j;at(1,0)}}function Y1(g,v,E){var M=nt();try{return Xh(g,v,E)}catch(P){if(et(M),P!==P+0)throw P;at(1,0)}}function K1(g,v,E,M,P,O,j,ne){var ye=nt();try{Yh(g,v,E,M,P,O,j,ne)}catch(Me){if(et(ye),Me!==Me+0)throw Me;at(1,0)}}function Z1(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt){var Et=nt();try{Gh(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt)}catch(Lt){if(et(Et),Lt!==Lt+0)throw Lt;at(1,0)}}function J1(g,v,E,M,P,O){var j=nt();try{return Wh(g,v,E,M,P,O)}catch(ne){if(et(j),ne!==ne+0)throw ne;at(1,0)}}function Q1(g,v,E){var M=nt();try{return Kh(g,v,E)}catch(P){if(et(M),P!==P+0)throw P;return at(1,0),0n}}function eS(g,v,E,M,P,O,j,ne,ye){var Me=nt();try{kh(g,v,E,M,P,O,j,ne,ye)}catch(Ze){if(et(Me),Ze!==Ze+0)throw Ze;at(1,0)}}function tS(g){var v=nt();try{return Zh(g)}catch(E){if(et(v),E!==E+0)throw E;at(1,0)}}function nS(g,v){var E=nt();try{return ff(g,v)}catch(M){if(et(E),M!==M+0)throw M;return at(1,0),0n}}function iS(g){var v=nt();try{return Jh(g)}catch(E){if(et(v),E!==E+0)throw E;return at(1,0),0n}}function rS(g,v,E,M){var P=nt();try{return sf(g,v,E,M)}catch(O){if(et(P),O!==O+0)throw O;at(1,0)}}function sS(g,v,E,M,P){var O=nt();try{return af(g,v,E,M,P)}catch(j){if(et(O),j!==j+0)throw j;at(1,0)}}function aS(g,v,E,M,P,O){var j=nt();try{return of(g,v,E,M,P,O)}catch(ne){if(et(j),ne!==ne+0)throw ne;at(1,0)}}function oS(g,v,E,M,P,O){var j=nt();try{return lf(g,v,E,M,P,O)}catch(ne){if(et(j),ne!==ne+0)throw ne;at(1,0)}}function lS(g,v,E,M,P,O,j,ne){var ye=nt();try{return qh(g,v,E,M,P,O,j,ne)}catch(Me){if(et(ye),Me!==Me+0)throw Me;at(1,0)}}function uS(g,v,E,M,P){var O=nt();try{return uf(g,v,E,M,P)}catch(j){if(et(O),j!==j+0)throw j;return at(1,0),0n}}function cS(g,v,E,M){var P=nt();try{return cf(g,v,E,M)}catch(O){if(et(P),O!==O+0)throw O;at(1,0)}}function dS(g,v,E,M){var P=nt();try{return df(g,v,E,M)}catch(O){if(et(P),O!==O+0)throw O;at(1,0)}}function hS(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt){var Et=nt();try{return hf(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt)}catch(Lt){if(et(Et),Lt!==Lt+0)throw Lt;at(1,0)}}function fS(g,v,E,M,P,O,j,ne,ye,Me,Ze){var mt=nt();try{nf(g,v,E,M,P,O,j,ne,ye,Me,Ze)}catch(Et){if(et(mt),Et!==Et+0)throw Et;at(1,0)}}function pS(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt,Ai,dl){var yS=nt();try{rf(g,v,E,M,P,O,j,ne,ye,Me,Ze,mt,Et,Lt,Ai,dl)}catch(hl){if(et(yS),hl!==hl+0)throw hl;at(1,0)}}function mS(g,v,E){var M=nt();try{return Qh(g,v,E)}catch(P){if(et(M),P!==P+0)throw P;at(1,0)}}function gS(g,v,E){var M=nt();try{return ef(g,v,E)}catch(P){if(et(M),P!==P+0)throw P;at(1,0)}}function _S(g,v,E,M){var P=nt();try{tf(g,v,E,M)}catch(O){if(et(P),O!==O+0)throw O;at(1,0)}}function Ia(){if(0<Oe)rt=Ia;else if(r)y?.(e),me();else{for(var g=we;0<g.length;)g.shift()(e);0<Oe?rt=Ia:(e.calledRun=!0,R||(me(),y?.(e)))}}return r||(ci=await xe(),Ia()),e.PTR_SIZE=4,Z?e:new Promise((g,v)=>{y=g,_=v})}var sv,Ip,E3=fe(()=>{sv=Rp,Ip=globalThis.self?.name?.startsWith("em-pthread"),Ip&&Rp()}),eu,zc,$p,wn,av,no,Pp,Dp,tu,Lp,nu,ov,iu,lv,Rd=fe(()=>{Cd(),eu=typeof location>"u"?void 0:location.origin,zc=import.meta.url>"file:"&&import.meta.url<"file;",$p=()=>{{if(zc){let n=URL;return new URL(new n("ort.bundle.min.mjs",import.meta.url).href,eu).href}return import.meta.url}},wn=$p(),av=()=>{if(wn&&!wn.startsWith("blob:"))return wn.substring(0,wn.lastIndexOf("/")+1)},no=(n,e)=>{try{let t=e??wn;return(t?new URL(n,t):new URL(n)).origin===eu}catch{return!1}},Pp=(n,e)=>{let t=e??wn;try{return(t?new URL(n,t):new URL(n)).href}catch{return}},Dp=(n,e)=>`${e??"./"}${n}`,tu=async n=>{let e=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(e)},Lp=async n=>(await import(n)).default,nu=(M3(),ca(nv)).default,ov=async()=>{if(!wn)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(no(wn))return[void 0,nu()];let n=await tu(wn);return[n,nu(n)]},iu=(E3(),ca(rv)).default,lv=async(n,e,t,i)=>{let r=iu&&!(n||e);if(r)if(wn)r=no(wn)||i&&!t;else if(i&&!t)r=!0;else throw new Error("cannot determine the script source URL.");if(r)return[void 0,iu];{let s="ort-wasm-simd-threaded.jsep.mjs",a=n??Pp(s,e),o=t&&a&&!no(a,e),u=o?await tu(a):a??Dp(s,e);return[o?u:void 0,await Lp(u)]}}}),ru,io,Vs,su,Np,kp,Op,Id,Rt,Ir=fe(()=>{Rd(),io=!1,Vs=!1,su=!1,Np=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},kp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Op=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Id=async n=>{if(io)return Promise.resolve();if(Vs)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(su)throw new Error("previous call to 'initializeWebAssembly()' failed.");Vs=!0;let e=n.initTimeout,t=n.numThreads;if(n.simd!==!1){if(n.simd==="relaxed"){if(!Op())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!kp())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Np();t>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+t+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=t=1);let r=n.wasmPaths,s=typeof r=="string"?r:void 0,a=r?.mjs,o=a?.href??a,u=r?.wasm,l=u?.href??u,c=n.wasmBinary,[d,h]=await lv(o,s,t>1,!!c||!!l),f=!1,m=[];if(e>0&&m.push(new Promise(y=>{setTimeout(()=>{f=!0,y()},e)})),m.push(new Promise((y,_)=>{let p={numThreads:t};if(c)p.wasmBinary=c,p.locateFile=x=>x;else if(l||s)p.locateFile=x=>l??s+x;else if(o&&o.indexOf("blob:")!==0)p.locateFile=x=>new URL(x,o).href;else if(d){let x=av();x&&(p.locateFile=w=>x+w)}h(p).then(x=>{Vs=!1,io=!0,ru=x,y(),d&&URL.revokeObjectURL(d)},x=>{Vs=!1,su=!0,_(x)})})),await Promise.race(m),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Rt=()=>{if(io&&ru)return ru;throw new Error("WebAssembly is not initialized yet.")}}),Wn,Do,St,$d=fe(()=>{Ir(),Wn=(n,e)=>{let t=Rt(),i=t.lengthBytesUTF8(n)+1,r=t._malloc(i);return t.stringToUTF8(n,r,i),e.push(r),r},Do=(n,e,t,i)=>{if(typeof n=="object"&&n!==null){if(t.has(n))throw new Error("Circular reference in options");t.add(n)}Object.entries(n).forEach(([r,s])=>{let a=e?e+r:r;if(typeof s=="object")Do(s,a+".",t,i);else if(typeof s=="string"||typeof s=="number")i(a,s.toString());else if(typeof s=="boolean")i(a,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},St=n=>{let e=Rt(),t=e.stackSave();try{let i=e.PTR_SIZE,r=e.stackAlloc(2*i);e._OrtGetLastError(r,r+i);let s=Number(e.getValue(r,i===4?"i32":"i64")),a=e.getValue(r+i,"*"),o=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{e.stackRestore(t)}}}),uv,T3=fe(()=>{Ir(),$d(),uv=n=>{let e=Rt(),t=0,i=[],r=n||{};try{if(n?.logSeverityLevel===void 0)r.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)r.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(r.terminate=!1);let s=0;return n?.tag!==void 0&&(s=Wn(n.tag,i)),t=e._OrtCreateRunOptions(r.logSeverityLevel,r.logVerbosityLevel,!!r.terminate,s),t===0&&St("Can't create run options."),n?.extra!==void 0&&Do(n.extra,"",new WeakSet,(a,o)=>{let u=Wn(a,i),l=Wn(o,i);e._OrtAddRunConfigEntry(t,u,l)!==0&&St(`Can't set a run config entry: ${a} - ${o}.`)}),[t,i]}catch(s){throw t!==0&&e._OrtReleaseRunOptions(t),i.forEach(a=>e._free(a)),s}}}),Up,zp,Bp,nr,Fp,cv,A3=fe(()=>{Ir(),$d(),Up=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},zp=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},Bp=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(t=>(typeof t=="string"?t:t.name)==="webgpu")&&(n.enableMemPattern=!1)},nr=(n,e,t,i)=>{let r=Wn(e,i),s=Wn(t,i);Rt()._OrtAddSessionConfigEntry(n,r,s)!==0&&St(`Can't set a session config entry: ${e} - ${t}.`)},Fp=async(n,e,t)=>{let i=e.executionProviders;for(let r of i){let s=typeof r=="string"?r:r.name,a=[];switch(s){case"webnn":if(s="WEBNN",nr(n,"session.disable_quant_qdq","1",t),nr(n,"session.disable_qdq_constant_folding","1",t),typeof r!="string"){let d=r?.deviceType;d&&nr(n,"deviceType",d,t)}break;case"webgpu":if(s="JS",typeof r!="string"){let d=r;if(d?.preferredLayout){if(d.preferredLayout!=="NCHW"&&d.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${d.preferredLayout}`);nr(n,"preferredLayout",d.preferredLayout,t)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let o=Wn(s,t),u=a.length,l=0,c=0;if(u>0){l=Rt()._malloc(u*Rt().PTR_SIZE),t.push(l),c=Rt()._malloc(u*Rt().PTR_SIZE),t.push(c);for(let d=0;d<u;d++)Rt().setValue(l+d*Rt().PTR_SIZE,a[d][0],"*"),Rt().setValue(c+d*Rt().PTR_SIZE,a[d][1],"*")}await Rt()._OrtAppendExecutionProvider(n,o,l,c,u)!==0&&St(`Can't append execution provider: ${s}.`)}},cv=async n=>{let e=Rt(),t=0,i=[],r=n||{};Bp(r);try{let s=Up(r.graphOptimizationLevel??"all"),a=zp(r.executionMode??"sequential"),o=typeof r.logId=="string"?Wn(r.logId,i):0,u=r.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let l=r.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof r.optimizedModelFilePath=="string"?Wn(r.optimizedModelFilePath,i):0;if(t=e._OrtCreateSessionOptions(s,!!r.enableCpuMemArena,!!r.enableMemPattern,a,!!r.enableProfiling,0,o,u,l,c),t===0&&St("Can't create session options."),r.executionProviders&&await Fp(t,r,i),r.enableGraphCapture!==void 0){if(typeof r.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${r.enableGraphCapture}`);nr(t,"enableGraphCapture",r.enableGraphCapture.toString(),i)}if(r.freeDimensionOverrides)for(let[d,h]of Object.entries(r.freeDimensionOverrides)){if(typeof d!="string")throw new Error(`free dimension override name must be a string: ${d}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let f=Wn(d,i);e._OrtAddFreeDimensionOverride(t,f,h)!==0&&St(`Can't set a free dimension override: ${d} - ${h}.`)}return r.extra!==void 0&&Do(r.extra,"",new WeakSet,(d,h)=>{nr(t,d,h,i)}),[t,i]}catch(s){throw t!==0&&e._OrtReleaseSessionOptions(t)!==0&&St("Can't release session options."),i.forEach(a=>e._free(a)),s}}}),fr,bi,pr,qo,Lo,Pd,Dd,Bc,Ge=fe(()=>{fr=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},bi=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},pr=(n,e)=>{let t=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],i=typeof e=="number"?e:e.reduce((r,s)=>r*s,1);return t>0?Math.ceil(i*t):void 0},qo=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Lo=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},Pd=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",Dd=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",Bc=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}}),Ld,dv=fe(()=>{Cd(),Ld=async n=>{if(typeof n=="string"){let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let t=e.headers.get("Content-Length"),i=t?parseInt(t,10):0;if(i<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let r=e.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let u=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let a=0;for(;;){let{done:o,value:u}=await r.read();if(o)break;let l=u.byteLength;new Uint8Array(s,a,l).set(u),a+=l}return new Uint8Array(s,0,i)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}}),Vp,Hp,Gp,Wp,Nd,qp,ht,Mi=fe(()=>{Ge(),Vp=["V","I","W","E","F"],Hp=(n,e)=>{console.log(`[${Vp[n]},${new Date().toISOString()}]${e}`)},Nd=(n,e)=>{Gp=n,Wp=e},qp=(n,e)=>{let t=Lo(n),i=Lo(Gp);t>=i&&Hp(t,typeof e=="function"?e():e)},ht=(...n)=>{Wp&&qp(...n)}}),jp,gs,te,No,hv,fv,pv,Ye=fe(()=>{jp=class{static calcMatMulShape(n,e){return n[1]!==e[0]?void 0:[n[0],e[1]]}},gs=class{static calcShape(n,e,t=!1){let i=n.length,r=e.length;if(i===0)return e;if(r===0)return n;let s=Math.max(n.length,e.length),a=new Array(s);if(t){if(i<2||r<2)return;let o=jp.calcMatMulShape([n[i-2],n[i-1]],[e[r-2],e[r-1]]);if(o===void 0)return;[a[s-2],a[s-1]]=o}for(let o=t?3:1;o<=s;o++){let u=i-o<0?1:n[i-o],l=r-o<0?1:e[r-o];if(u!==l&&u>1&&l>1)return;let c=Math.max(u,l);if(u&&l)a[s-o]=Math.max(u,l);else{if(c>1)return;a[s-o]=0}}return a}static isValidBroadcast(n,e){let t=n.length,i=e.length;if(t>i)return!1;for(let r=1;r<=t;r++)if(n[t-r]!==1&&n[t-r]!==e[i-r])return!1;return!0}},te=class Ao{static size(e){return Ao.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,t=4){let i=e.length;if(i===0)return[];let r=new Array(i),s=i-1;for(;s>=0;){if(e[s]%t===0){r[s]=e[s]/t;break}if(t%e[s]!==0)throw new Error("cannot convert shape");r[s]=1,t/=e[s],s--}for(s--;s>=0;s--)r[s]=e[s];return r}static sizeFromDimension(e,t){if(t<0||t>e.length)throw new Error(`invalid dimension of ${t} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return Ao.getSizeFromDimensionRange(e,t,e.length)}static sizeToDimension(e,t){if(t<0||t>e.length)throw new Error(`invalid dimension of ${t} for sizeToDimension as Tensor has ${e.length} dimensions.`);return Ao.getSizeFromDimensionRange(e,0,t)}static getSizeFromDimensionRange(e,t,i){let r=1;for(let s=t;s<i;s++){if(e[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");r*=Number(e[s])}return r}static computeStrides(e){let t=e.length;if(t===0)return[];if(t===1)return[1];let i=new Array(t);i[t-1]=1,i[t-2]=e[t-1];for(let r=t-3;r>=0;--r)i[r]=i[r+1]*e[r+1];return i}static normalizeAxis(e,t){if(e<-t&&e>=t)throw new Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(i=>this.normalizeAxis(i,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(i=>e[i]):e.slice().reverse()}static padShape(e,t){let i=e.length;return e.map((r,s)=>r+t[s]+t[s+i])}static areEqual(e,t){return e.length!==t.length?!1:e.every((i,r)=>i===t[r])}},No=class ta{static adjustPoolAttributes(e,t,i,r,s,a){if(!e&&i.length!==t.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let o=0;o<t.length-2;o++)o>=i.length?i.push(t[o+2]):i[o]=t[o+2];for(let o=0;o<i.length;o++)if(o<r.length){if(r[o]<0)throw new Error("strides should be greater than or equal to 1")}else r.push(1);for(let o=0;o<i.length;o++)if(o<s.length){if(s[o]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let o=0;o<i.length*2;o++)if(o<a.length){if(a[o]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[o]>=i[o]||a[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,t,i,r,s,a,o){if(o){if(s.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(t.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)ta.adjustPadAndReturnShape(e[u+(a?1:2)],t[u],i[u],r[u],s,u,u+e.length-2,o)}}static computePoolOutputShape(e,t,i,r,s,a,o){if(t.length<=0)throw new Error("input shape must be of size greater than 0");let u=[t[0],t[1]];return ta.computeShapeHelper(e,t,u,i,r,s,a,o),u}static computeConvOutputShape(e,t,i,r,s,a,o){if(e.length<=0||t.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],t[0]];return ta.computeShapeHelper(!1,e,u,i,r,s,a,o),u}static computeShapeHelper(e,t,i,r,s,a,o,u){if(e)for(let l=0;l<t.length-2;l++)i.push(1);else for(let l=0;l<t.length-2;l++)i.push(ta.adjustPadAndReturnShape(t[l+2],r[l],s[l],a[l],o,l,l+t.length-2,u))}static adjustPadAndReturnShape(e,t,i,r,s,a,o,u){let l=i*(r-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return s[a]=0,s[o]=0,Math.floor((e-l)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+t-1)/t-1)*t+r-e;return s[a]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),s[o]=c-s[a],Math.floor((e+c-r)/t+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+s[a]+s[o]-l)/t+1)}},hv=class{static getShapeOfGemmResult(n,e,t,i,r){if(n.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,o;e?(s=n[1],a=n[0]):(s=n[0],a=n[1]);let u=-1;if(i?(o=t[0],u=1):(o=t[1],u=0),t[u]!==a)throw new Error("dimension mismatch");if(s<=0||o<=0||a<=0)throw new Error("invalid shape specified");if(r&&!gs.isValidBroadcast(r,[s,o]))throw new Error("gemm: invalid bias shape for broadcast");return[s,o,a]}},fv=-34028234663852886e22,pv=34028234663852886e22}),kd,mv=fe(()=>{Ge(),kd=(n,e)=>new(qo(e))(n)}),au,Fc,ou,Xp,lu,Yp,uu,cu,du,Kp,gv,C3=fe(()=>{Ge(),Mi(),au=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Fc=(n,e)=>{if(e==="int32")return n;let t=au.get(e);if(!t)throw new Error(`WebNN backend does not support data type: ${e}`);let i=t/8;if(n.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let r=n.byteLength/i,s=new(qo(e))(n.buffer,n.byteOffset,r);switch(e){case"int64":case"uint64":{let a=new Int32Array(r);for(let o=0;o<r;o++){let u=s[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[o]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&s.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(s,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},ou=(n,e)=>{if(e==="int32")return n;if(n.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let t=n.byteLength/4,i=new Int32Array(n.buffer,n.byteOffset,t);switch(e){case"int64":{let r=BigInt64Array.from(i,BigInt);return new Uint8Array(r.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let r=BigUint64Array.from(i,BigInt);return new Uint8Array(r.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let r=Int8Array.from(i,Number);return new Uint8Array(r.buffer)}case"uint8":{if(i.some(r=>r<0||r>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let r=Uint32Array.from(i,Number);return new Uint8Array(r.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},Xp=1,lu=()=>Xp++,Yp=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),uu=(n,e)=>{let t=au.get(n);if(!t)throw new Error(`WebNN backend does not support data type: ${n}`);return e.length>0?Math.ceil(e.reduce((i,r)=>i*r)*t/8):0},cu=class{constructor(n){this.isDataConverted=!1;let{sessionId:e,context:t,tensor:i,dataType:r,shape:s,fallbackDataType:a}=n;this.sessionId=e,this.mlContext=t,this.mlTensor=i,this.dataType=r,this.tensorShape=s,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return uu(this.dataType,this.tensorShape)}destroy(){ht("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(n){this.mlContext.writeTensor(this.mlTensor,n)}async read(n){if(this.fallbackDataType){let e=await this.mlContext.readTensor(this.mlTensor),t=ou(new Uint8Array(e),this.dataType);if(n){(n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)).set(t);return}else return t.buffer}else return n?this.mlContext.readTensor(this.mlTensor,n):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(n,e,t){return this.mlContext===n&&this.dataType===e&&this.tensorShape.length===t.length&&this.tensorShape.every((i,r)=>i===t[r])}setIsDataConverted(n){this.isDataConverted=n}},du=class{constructor(n,e){this.tensorManager=n,this.wrapper=e}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(n,e,t,i){let r=this.tensorManager.getMLContext(n),s=this.tensorManager.getMLOpSupportLimits(n),a;if(!s?.input.dataTypes.includes(e)){if(a=Yp.get(e),!a||s?.input.dataTypes.includes(a))throw new Error(`WebNN backend does not support data type: ${e}`);ht("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${e} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(r,e,t))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==uu(e,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(n,e,t,o,!0,!0,a),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(n){let e=n;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")e=Fc(n,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(n.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else ht("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(n){if(this.activeUpload){let e=this.wrapper?.isDataConverted?ou(this.activeUpload,this.wrapper?.type):this.activeUpload;if(n){n instanceof ArrayBuffer?new Uint8Array(n).set(e):new Uint8Array(n.buffer,n.byteOffset,n.byteLength).set(e);return}else return e.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return n?this.wrapper.read(n):this.wrapper.read()}},Kp=class{constructor(n){this.backend=n,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(n){let e=this.backend.getMLContext(n);if(!e)throw new Error("MLContext not found for session.");return e}getMLOpSupportLimits(n){return this.backend.getMLOpSupportLimits(n)}reserveTensorId(){let n=lu();return this.tensorTrackersById.set(n,new du(this)),n}releaseTensorId(n){let e=this.tensorTrackersById.get(n);e&&(this.tensorTrackersById.delete(n),e.tensorWrapper&&this.releaseTensor(e.tensorWrapper))}async ensureTensor(n,e,t,i,r){ht("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${e}, dataType: ${t}, shape: ${i}, copyOld: ${r}}`);let s=this.tensorTrackersById.get(e);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(n,t,i,r)}upload(n,e){let t=this.tensorTrackersById.get(n);if(!t)throw new Error("Tensor not found.");t.upload(e)}async download(n,e){ht("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${n}, dstBuffer: ${e?.byteLength}}`);let t=this.tensorTrackersById.get(n);if(!t)throw new Error("Tensor not found.");return t.download(e)}releaseTensorsForSession(n){for(let e of this.freeTensors)e.sessionId===n&&e.destroy();this.freeTensors=this.freeTensors.filter(e=>e.sessionId!==n)}registerTensor(n,e,t,i){let r=this.getMLContext(n),s=lu(),a=new cu({sessionId:n,context:r,tensor:e,dataType:t,shape:i});return this.tensorTrackersById.set(s,new du(this,a)),this.externalTensors.add(a),s}async getCachedTensor(n,e,t,i,r,s,a){let o=this.getMLContext(n);for(let[l,c]of this.freeTensors.entries())if(c.canReuseTensor(o,e,t)){ht("verbose",()=>`[WebNN] Reusing tensor {dataType: ${e}, ${a?`fallbackDataType: ${a},`:""} shape: ${t}`);let d=this.freeTensors.splice(l,1)[0];return d.sessionId=n,d}ht("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${e}, ${a?`fallbackDataType: ${a},`:""} shape: ${t}}`);let u=await o.createTensor({dataType:a??e,shape:t,dimensions:t,usage:i,writable:r,readable:s});return new cu({sessionId:n,context:o,tensor:u,dataType:e,shape:t,fallbackDataType:a})}releaseTensor(n){this.externalTensors.has(n)&&this.externalTensors.delete(n),this.freeTensors.push(n)}},gv=(...n)=>new Kp(...n)}),Hs,Zp,_v,R3=fe(()=>{Ge(),Ir(),mv(),C3(),Mi(),Hs=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Zp=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let t=Object.keys(n).sort(),i=Object.keys(e).sort();return t.length===i.length&&t.every((r,s)=>r===i[s]&&n[r]===e[r])},_v=class{constructor(n){this.tensorManager=gv(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Nd(n.logLevel,!!n.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(n){ht("verbose",()=>`[WebNN] onRunStart {sessionId: ${n}}`),this.activeSessionId=n}onRunEnd(n){ht("verbose",()=>`[WebNN] onRunEnd {sessionId: ${n}}`);let e=this.temporarySessionTensorIds.get(n);if(e){for(let t of e)ht("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(n),this.activeSessionId=void 0}}async createMLContext(n){if(n instanceof GPUDevice){let t=this.mlContextCache.findIndex(i=>i.gpuDevice===n);if(t!==-1)return this.mlContextCache[t].mlContext;{let i=await navigator.ml.createContext(n);return this.mlContextCache.push({gpuDevice:n,mlContext:i}),i}}else if(n===void 0){let t=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let e=this.mlContextCache.findIndex(t=>Zp(t.options,n));if(e!==-1)return this.mlContextCache[e].mlContext;{let t=await navigator.ml.createContext(n);return this.mlContextCache.push({options:n,mlContext:t}),t}}registerMLContext(n,e){this.mlContextBySessionId.set(n,e);let t=this.sessionIdsByMLContext.get(e);t||(t=new Set,this.sessionIdsByMLContext.set(e,t)),t.add(n),this.mlOpSupportLimitsBySessionId.has(n)||this.mlOpSupportLimitsBySessionId.set(n,e.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(n,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(n,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(n){this.sessionGraphInputs.delete(n),this.sessionGraphOutputs.delete(n);let e=this.mlContextBySessionId.get(n);if(!e)return;this.tensorManager.releaseTensorsForSession(n),this.mlContextBySessionId.delete(n),this.mlOpSupportLimitsBySessionId.delete(n);let t=this.sessionIdsByMLContext.get(e);if(t.delete(n),t.size===0){this.sessionIdsByMLContext.delete(e);let i=this.mlContextCache.findIndex(r=>r.mlContext===e);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(n){return this.mlContextBySessionId.get(n)}getMLOpSupportLimits(n){return this.mlOpSupportLimitsBySessionId.get(n)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(n){ht("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n)}async ensureTensor(n,e,t,i,r){let s=Hs.get(t);if(!s)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(n??this.currentSessionId,e,s,i,r)}async createTemporaryTensor(n,e,t){ht("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${e}, shape: ${t}}`);let i=Hs.get(e);if(!i)throw new Error(`Unsupported ONNX data type: ${e}`);let r=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(n,r,i,t,!1);let s=this.temporarySessionTensorIds.get(n);return s?s.push(r):this.temporarySessionTensorIds.set(n,[r]),r}uploadTensor(n,e){if(!Rt().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ht("verbose",()=>`[WebNN] uploadTensor {tensorId: ${n}, data: ${e.byteLength}}`),this.tensorManager.upload(n,e)}async downloadTensor(n,e){return this.tensorManager.download(n,e)}createMLTensorDownloader(n,e){return async()=>{let t=await this.tensorManager.download(n);return kd(t,e)}}registerMLTensor(n,e,t,i){let r=Hs.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let s=this.tensorManager.registerTensor(n,e,r,i);return ht("verbose",()=>`[WebNN] registerMLTensor {tensor: ${e}, dataType: ${r}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(n,e,t,i,r,s,a=!1){if(!s)throw new Error("External mounted files are not available.");let o=n;n.startsWith("./")&&(o=n.substring(2));let u=s.get(o);if(!u)throw new Error(`File with name ${o} not found in preloaded files.`);if(e+t>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(e,e+t).buffer,c;switch(r.dataType){case"float32":c=new Float32Array(l);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(l):new Uint16Array(l);break;case"int32":c=new Int32Array(l);break;case"uint32":c=new Uint32Array(l);break;case"int64":if(a){let d=Fc(new Uint8Array(l),"int64");c=new Int32Array(d.buffer),r.dataType="int32"}else c=new BigInt64Array(l);break;case"uint64":c=new BigUint64Array(l);break;case"int8":c=new Int8Array(l);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${r.dataType} in creating WebNN Constant from external data.`)}return ht("verbose",()=>`[WebNN] registerMLConstant {dataType: ${r.dataType}, shape: ${r.shape}}} ${a?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(r,c)}registerGraphInput(n){this.temporaryGraphInputs.push(n)}registerGraphOutput(n){this.temporaryGraphOutputs.push(n)}isGraphInput(n,e){let t=this.sessionGraphInputs.get(n);return t?t.includes(e):!1}isGraphOutput(n,e){let t=this.sessionGraphOutputs.get(n);return t?t.includes(e):!1}isGraphInputOutputTypeSupported(n,e,t=!0){let i=Hs.get(fr(e)),r=this.mlOpSupportLimitsBySessionId.get(n);return typeof i>"u"?!1:t?!!r?.input.dataTypes.includes(i):!!r?.output.dataTypes.includes(i)}flush(){}}}),Od=fe(()=>{}),hu,ro,so,Jp,Qp,fu,Vc,em,yv,I3=fe(()=>{Mi(),Od(),hu=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),ro=[],so=n=>Math.ceil(Number(n)/16)*16,Jp=n=>{for(let e=0;e<ro.length;e++){let t=ro[e];if(n<=t)return t}return Math.ceil(n/16)*16},Qp=1,fu=()=>Qp++,Vc=async(n,e,t,i)=>{let r=so(t),s=n.device.createBuffer({size:r,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,s,0,r),n.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(i){let u=i();return u.set(new Uint8Array(o,0,t)),u}else return new Uint8Array(o.slice(0,t))}finally{s.destroy()}},em=class{constructor(n){this.backend=n,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[e]of hu)ro.push(e),this.freeBuffers.set(e,[]),this.freeUniformBuffers.set(e,[]);this.sessionCount=0}upload(n,e){let t=e.buffer,i=e.byteOffset,r=e.byteLength,s=so(r),a=this.storageCache.get(n);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==r)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${r}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=o.getMappedRange();new Uint8Array(u).set(new Uint8Array(t,i,r)),o.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(o,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([l.finish()]),o.destroy(),ht("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${n})`)}memcpy(n,e){let t=this.storageCache.get(n);if(!t)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(e);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let r=so(t.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(t.gpuData.buffer,0,i.gpuData.buffer,0,r)}registerExternalBuffer(n,e,t){let i;if(t){if(i=t[0],n===t[1])return ht("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${e}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=fu();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:n},originalSize:e}),ht("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${e}) => id=${i}, registered.`),i}unregisterExternalBuffer(n){n!==void 0&&(this.storageCache.delete(n),ht("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${n}`))}create(n,e=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=Jp(n),i,r=(e&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(e&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(r||s){let o=(r?this.freeBuffers:this.freeUniformBuffers).get(t);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:t,usage:e}):i=this.backend.device.createBuffer({size:t,usage:e})}else i=this.backend.device.createBuffer({size:t,usage:e});let a={id:fu(),type:0,buffer:i};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(n)}),ht("verbose",()=>`[WebGPU] GpuDataManager.create(size=${n}) => id=${a.id}`),a}get(n){return this.storageCache.get(n)?.gpuData}release(n){let e=typeof n=="bigint"?Number(n):n,t=this.storageCache.get(e);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ht("verbose",()=>`[WebGPU] GpuDataManager.release(id=${e}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(e),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(n,e){let t=this.storageCache.get(Number(n));if(!t)throw new Error("data does not exist");await Vc(this.backend,t.gpuData.buffer,t.originalSize,e)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let n of this.buffersPending){let e=hu.get(n.size);if((n.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(n.size)||[];e===void 0||t.length>=e?n.destroy():t.push(n)}else if((n.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(n.size)||[];e===void 0||t.length>=e?n.destroy():t.push(n)}else n.destroy()}this.buffersPending=[]}else{let n=this.capturedPendingBuffers.get(this.backend.currentSessionId);n||(n=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,n));for(let e of this.buffersPending)n.push(e);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(n=>{n.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(n=>{n.forEach(e=>{e.destroy()})}),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(n=>{n.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(n){let e=this.capturedPendingBuffers.get(n);e&&(e.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(n)),this.sessionCount-=1,this.sessionCount===0&&(ht("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},yv=(...n)=>new em(...n)}),tm,vt,Ft=fe(()=>{tm=class{constructor(n){Object.assign(this,n)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(n=>`${this[n]}`).join(";")),this.key}},vt=n=>new tm(n)}),_s,ao,jt,ln,Ue,Bt,Hc,is,Hi,ke,Gs,re,Pe,vv,Ud,nm,xv,Ke=fe(()=>{Ge(),Ye(),_s=64,ao=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},jt=(n,e=1)=>{let t=ao(n,e);return typeof t=="string"?t:t[0]},ln=(n,e=1)=>{let t=ao(n,e);return typeof t=="string"?t:t[1]},Ue=(...n)=>{let e=[];return n.forEach(t=>{t.length!==0&&e.push({type:12,data:t},{type:12,data:te.computeStrides(t)})}),e},Bt=n=>n%4===0?4:n%2===0?2:1,Hc=(n="f32",e,t="0")=>!e||e===1?`${n}(${t})`:`vec${e}<${n}>(${t})`,is=(n,e,t)=>n==="f32"?t:e===1?`f32(${t})`:`vec${e}<f32>(${t})`,Hi=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,ke=(n,e,t,i)=>n.startsWith("uniforms.")&&t>4?typeof e=="string"?i==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:i==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:t>1?`${n}[${e}]`:n,Gs=(n,e,t,i,r)=>{let s=typeof t=="number",a=s?t:t.length,o=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=ao(e,r),c=typeof l=="string"?l:l[1],d=typeof l=="string"?l:l[0],h={indices:u,value:c,storage:d,tensor:e},f=Z=>typeof Z=="string"?Z:`${Z}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=s?"uniforms.":"",_=`${y}${n}_shape`,p=`${y}${n}_strides`,x="";for(let Z=0;Z<a-1;Z++)x+=`
    let dim${Z} = current / ${ke(p,Z,a)};
    let rest${Z} = current % ${ke(p,Z,a)};
    indices[${Z}] = dim${Z};
    current = rest${Z};
    `;x+=`indices[${a-1}] = current;`;let w=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${x}
    return indices;
  }`,b=Z=>(m.offsetToIndices=!0,a<2?Z:`o2i_${n}(${Z})`),I=[];if(a>=2)for(let Z=a-1;Z>=0;Z--)I.push(`${ke(p,Z,a)} * (indices[${Z}])`);let R=a<2?"":`
  fn i2o_${n}(indices: ${h.indices}) -> u32 {
    return ${I.join("+")};
  }`,T=Z=>(m.indicesToOffset=!0,a<2?Z:`i2o_${n}(${Z})`),S=(...Z)=>a===0?"0u":`${h.indices}(${Z.map(f).join(",")})`,C=(Z,he)=>a<2?`${Z}`:`${ke(Z,he,a)}`,A=(Z,he,me)=>a<2?`${Z}=${me};`:`${ke(Z,he,a)}=${me};`,L={},F=(Z,he)=>{m.broadcastedIndicesToOffset=!0;let me=`${he.name}broadcastedIndicesTo${n}Offset`;if(me in L)return`${me}(${Z})`;let G=[];for(let ue=a-1;ue>=0;ue--){let xe=he.indicesGet("outputIndices",ue+he.rank-a);G.push(`${C(p,ue)} * (${xe} % ${C(_,ue)})`)}return L[me]=`fn ${me}(outputIndices: ${he.type.indices}) -> u32 {
             return ${G.length>0?G.join("+"):"0u"};
           }`,`${me}(${Z})`},B=(Z,he)=>(()=>{if(h.storage===h.value)return`${n}[${Z}]=${he};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${n}[${Z}]=vec2<u32>(u32(${he}), select(0u, 0xFFFFFFFFu, ${he} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${n}[${Z}]=vec2<u32>(u32(${he}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${n}[${Z}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${he}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),N=Z=>(()=>{if(h.storage===h.value)return`${n}[${Z}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${n}[${Z}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${n}[${Z}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${Z}] & 0xFFu), bool(${n}[${Z}] & 0xFF00u), bool(${n}[${Z}] & 0xFF0000u), bool(${n}[${Z}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),U=a<2?"":`
  fn get_${n}ByIndices(indices: ${h.indices}) -> ${c} {
    return ${N(`i2o_${n}(indices)`)};
  }`,z=a<2?"":(()=>{let Z=o.map(me=>`d${me}: u32`).join(", "),he=o.map(me=>`d${me}`).join(", ");return`
  fn get_${n}(${Z}) -> ${c} {
    return get_${n}ByIndices(${S(he)});
  }`})(),K=(...Z)=>{if(Z.length!==a)throw new Error(`indices length must be ${a}`);let he=Z.map(f).join(",");return a===0?N("0u"):a===1?N(he[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${n}(${he})`)},W=Z=>a<2?N(Z):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${n}ByIndices(${Z})`),ie=a<2?"":`
  fn set_${n}ByIndices(indices: ${h.indices}, value: ${c}) {
    ${B(`i2o_${n}(indices)`,"value")}
  }`,oe=a<2?"":(()=>{let Z=o.map(me=>`d${me}: u32`).join(", "),he=o.map(me=>`d${me}`).join(", ");return`
  fn set_${n}(${Z}, value: ${c}) {
    set_${n}ByIndices(${S(he)}, value);
  }`})();return{impl:()=>{let Z=[],he=!1;return m.offsetToIndices&&(Z.push(w),he=!0),m.indicesToOffset&&(Z.push(R),he=!0),m.broadcastedIndicesToOffset&&(Object.values(L).forEach(me=>Z.push(me)),he=!0),m.set&&(Z.push(oe),he=!0),m.setByIndices&&(Z.push(ie),he=!0),m.get&&(Z.push(z),he=!0),m.getByIndices&&(Z.push(U),he=!0),!s&&he&&Z.unshift(`const ${_} = ${h.indices}(${t.join(",")});`,`const ${p} = ${h.indices}(${te.computeStrides(t).join(",")});`),Z.join(`
`)},type:h,offsetToIndices:b,indicesToOffset:T,broadcastedIndicesToOffset:F,indices:S,indicesGet:C,indicesSet:A,set:(...Z)=>{if(Z.length!==a+1)throw new Error(`indices length must be ${a}`);let he=Z[a];if(typeof he!="string")throw new Error("value must be string");let me=Z.slice(0,a).map(f).join(",");return a===0?B("0u",he):a===1?B(me[0],he):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${n}(${me}, ${he})`)},setByOffset:B,setByIndices:(Z,he)=>a<2?B(Z,he):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${n}ByIndices(${Z}, ${he});`),get:K,getByOffset:N,getByIndices:W,usage:i,name:n,strides:p,shape:_,rank:a}},re=(n,e,t,i=1)=>Gs(n,e,t,"input",i),Pe=(n,e,t,i=1)=>Gs(n,e,t,"output",i),vv=(n,e,t)=>Gs(n,e,t,"atomicOutput",1),Ud=(n,e,t,i=1)=>Gs(n,e,t,"internal",i),nm=class{constructor(n,e){this.normalizedDispatchGroup=n,this.limits=e,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(n){return`if (global_idx >= ${typeof n=="number"?`${n}u`:n}) { return; }`}mainStart(n=_s){let e=typeof n=="number"?n:n[0],t=typeof n=="number"?1:n[1],i=typeof n=="number"?1:n[2];if(e>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${e}, ${t}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(e*t*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${e}, ${t}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let r=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=r?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=r?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${e*t*i}u + local_idx;`;return`@compute @workgroup_size(${e}, ${t}, ${i})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(n){n.rank!==0&&(n.shape.startsWith("uniforms.")&&this.uniforms.push({name:n.shape.replace("uniforms.",""),type:"u32",length:n.rank}),n.strides.startsWith("uniforms.")&&this.uniforms.push({name:n.strides.replace("uniforms.",""),type:"u32",length:n.rank}))}declareVariable(n,e){if(n.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(n),this.appendVariableUniforms(n);let t=n.usage==="input"?"read":"read_write",i=n.usage==="atomicOutput"?"atomic<i32>":n.type.storage;return`@group(0) @binding(${e}) var<storage, ${t}> ${n.name}: array<${i}>;`}declareVariables(...n){return n.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(n){if(n.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(n),this.appendVariableUniforms(n)}registerInternalVariables(...n){return n.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(n,e,t=1){return this.uniforms.push({name:n,type:e,length:t}),this}registerUniforms(n){return this.uniforms=this.uniforms.concat(n),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let n=[];for(let{name:e,type:t,length:i}of this.uniforms)if(i&&i>4)t==="f16"?n.push(`@align(16) ${e}:array<mat2x4<${t}>, ${Math.ceil(i/8)}>`):n.push(`${e}:array<vec4<${t}>, ${Math.ceil(i/4)}>`);else{let r=i==null||i===1?t:`vec${i}<${t}>`;n.push(`${e}:${r}`)}return`
      struct Uniforms { ${n.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(n=>n.impl()).join(`
`)+this.internalVariables.map(n=>n.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let n=e=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(e)];return this.uniforms.map(e=>[n(e.type),e.length??1])}},xv=(n,e)=>new nm(n,e)}),im,pu,rm,sm,am,om,Tn,bv,wv,Gi=fe(()=>{Ge(),Ye(),Ft(),Ke(),im=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},pu=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),rm=(n,e)=>te.sortBasedOnPerm(n,pu(n.length,e)),sm=(n,e,t,i)=>{let r=`fn perm(i: ${i.type.indices}) -> ${t.type.indices} {
    var a: ${t.type.indices};`;for(let s=0;s<e;++s)r+=`a[${n[s]}]=i[${s}];`;return r+="return a;}"},am=(n,e)=>{let t=[],i=[];for(let r=0;r<n.length;++r)n[r]!==1&&t.push(n[r]),n[e[r]]!==1&&i.push(e[r]);return{newShape:t,newPerm:i}},om=(n,e)=>{let t=0;for(let i=0;i<n.length;++i)if(e[n[i]]!==1){if(n[i]<t)return!1;t=n[i]}return!0},Tn=(n,e)=>{let t=n.dataType,i=n.dims.length,r=pu(i,e),s=rm(n.dims,r),a=n.dims,o=s,u=i<2||om(r,n.dims),l;if(u)return l=m=>{let y=re("input",t,a,4),_=Pe("output",t,o,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(y,_)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=te.size(s);return{outputs:[{dims:s,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:l};let{newShape:c,newPerm:d}=am(n.dims,r),h=te.areEqual(d,[2,3,1]),f=te.areEqual(d,[3,1,2]);if(c.length===2||h||f){a=h?[c[0],c[1]*c[2]]:f?[c[0]*c[1],c[2]]:c,o=[a[1],a[0]];let m=16;return l=y=>{let _=re("a",t,a.length),p=Pe("output",t,o.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(_,p)}
  var<workgroup> tile : array<array<${p.type.value}, ${m+1}>, ${m}>;
  ${y.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${_.getByIndices(`${_.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${p.setByIndices(`${p.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=te.size(s);return{outputs:[{dims:s,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(o[1]/m),y:Math.ceil(o[0]/m)},programUniforms:[{type:12,data:y},...Ue(a,o)]}},getShaderSource:l}}return l=m=>{let y=re("a",t,a.length),_=Pe("output",t,o.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(y,_)}

  ${sm(r,i,y,_)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let m=te.size(s);return{outputs:[{dims:s,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...Ue(a,o)]}},getShaderSource:l}},bv=(n,e)=>{im(n.inputs,e.perm),n.compute(Tn(n.inputs[0],e.perm))},wv=n=>vt({perm:n.perm})}),lm,um,cm,dm,hm,fm,pm,mm,gm,_m,Bn,Sv,Mv,Ev,Tv,Av,Cv,Rv,Iv,$v,Pv,$3=fe(()=>{Ge(),Ye(),Ke(),zd(),Gi(),lm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},um={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},cm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},dm={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},hm=(n,e)=>{let t=[];for(let i=e-n;i<e;++i)t.push(i);return t},fm=(n,e)=>{let t=[],i=n.length;for(let s=0;s<i;s++)e.indexOf(s)===-1&&t.push(n[s]);let r=e.map(s=>n[s]);return[t,r]},pm=(n,e)=>{let t=n.length+e.length,i=[],r=0;for(let s=0;s<t;s++)e.indexOf(s)===-1?i.push(n[r++]):i.push(1);return i},mm=(n,e)=>{for(let t=0;t<n.length;++t)if(n[n.length-t-1]!==e-1-t)return!1;return!0},gm=(n,e)=>{let t=[];if(!mm(n,e)){for(let i=0;i<e;++i)n.indexOf(i)===-1&&t.push(i);n.forEach(i=>t.push(i))}return t},_m=(n,e,t,i,r,s,a)=>{let o=t[0].dims,u=te.size(s),l=te.size(a),c=re("_A",t[0].dataType,o),d=Pe("output",r,s),h=64;u===1&&(h=256);let f=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,m=y=>`
        ${y.registerUniform("reduceSize","u32").declareVariables(c,d)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${y.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${cm[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${lm[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${um[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${d.setByOffset("outputIndex",`${i==="mean"?`${d.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${d.type.storage}(${dm[i]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${h}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:s,dataType:r}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Bn=(n,e,t,i)=>{let r=n.inputs.length===1?t:Gc(n.inputs,t),s=r.axes;s.length===0&&!r.noopWithEmptyAxes&&(s=n.inputs[0].dims.map((f,m)=>m));let a=te.normalizeAxes(s,n.inputs[0].dims.length),o=a,u=n.inputs[0],l=gm(o,n.inputs[0].dims.length);l.length>0&&(u=n.compute(Tn(n.inputs[0],l),{inputs:[0],outputs:[-1]})[0],o=hm(o.length,u.dims.length));let[c,d]=fm(u.dims,o),h=c;r.keepDims&&(h=pm(c,a)),n.compute(_m(e,r.cacheKey,[u],i,n.inputs[0].dataType,h,d),{inputs:[u]})},Sv=(n,e)=>{Bn(n,"ReduceMeanShared",e,"mean")},Mv=(n,e)=>{Bn(n,"ReduceL1Shared",e,"l1")},Ev=(n,e)=>{Bn(n,"ReduceL2Shared",e,"l2")},Tv=(n,e)=>{Bn(n,"ReduceLogSumExpShared",e,"logSumExp")},Av=(n,e)=>{Bn(n,"ReduceMaxShared",e,"max")},Cv=(n,e)=>{Bn(n,"ReduceMinShared",e,"min")},Rv=(n,e)=>{Bn(n,"ReduceProdShared",e,"prod")},Iv=(n,e)=>{Bn(n,"ReduceSumShared",e,"sum")},$v=(n,e)=>{Bn(n,"ReduceSumSquareShared",e,"sumSquare")},Pv=(n,e)=>{Bn(n,"ReduceLogSumShared",e,"logSum")}}),Fn,ym,ko,Gc,Vn,vm,xm,bm,wm,Sm,Mm,Em,Tm,Am,Cm,Hn,Dv,Lv,Nv,kv,Ov,Uv,zv,Bv,Fv,Vv,zd=fe(()=>{Ge(),Ye(),Ft(),Ke(),$3(),Fn=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ym=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],ko=(n,e,t,i,r,s,a=!1,o=!1)=>{let u=[],l=t[0].dims,c=l.length,d=te.normalizeAxes(r,c),h=!o&&d.length===0;l.forEach((y,_)=>{h||d.indexOf(_)>=0?a&&u.push(1):u.push(y)});let f=u.length,m=te.size(u);return{name:n,shaderCache:e,getShaderSource:y=>{let _=[],p=re("_A",t[0].dataType,c),x=Pe("output",s,f),w=i(p,x,d),b=w[2];for(let I=0,R=0;I<c;I++)h||d.indexOf(I)>=0?(a&&R++,b=`for(var j${I}: u32 = 0; j${I} < ${l[I]}; j${I}++) {
                  ${w[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${p.indicesSet("input_indices",I,`j${I}`)}
                  ${b}
                }`):(_.push(`${p.indicesSet("input_indices",I,x.indicesGet("output_indices",R))};`),R++);return`

        ${y.registerUniform("output_size","u32").declareVariables(p,x)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${p.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${_.join(`
`)}
          ${w[0]}       // init ops for reduce max/min
          ${w[1]}
          ${b}
          ${w[3]}
          ${w.length===4?x.setByOffset("global_idx","value"):w.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...Ue(l,u)]})}},Gc=(n,e)=>{let t=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(i=>t.push(Number(i))),vt({axes:t,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Vn=(n,e,t,i)=>{let r=n.inputs,s=r.length===1?t:Gc(r,t);n.compute(ko(e,{hint:s.cacheKey,inputDependencies:["rank"]},[r[0]],s.noopWithEmptyAxes&&s.axes.length===0?ym:i,s.axes,r[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},vm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceLogSum",e,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},xm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceL1",e,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},bm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceL2",e,(t,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},wm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceLogSumExp",e,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},Sm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceMax",e,(t,i,r)=>{let s=[];for(let a=0;a<t.rank;a++)(r.indexOf(a)>=0||r.length===0)&&s.push(t.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},Mm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceMean",e,(t,i,r)=>{let s=1;for(let a=0;a<t.rank;a++)(r.indexOf(a)>=0||r.length===0)&&(s*=n.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},Em=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceMin",e,(t,i,r)=>{let s=[];for(let a=0;a<t.rank;a++)(r.indexOf(a)>=0||r.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},Tm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceProd",e,(t,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},Am=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceSum",e,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},Cm=(n,e)=>{Fn(n.inputs),Vn(n,"ReduceSumSquare",e,(t,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Hn=(n,e,t)=>{if(e.length===0)return t;let i=1,r=1;for(let s=0;s<e.length;s++)e.indexOf(s)===-1?i*=n[s]:r*=n[s];return r<32&&i>1024},Dv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Mm(n,e):Sv(n,e)},Lv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?xm(n,e):Mv(n,e)},Nv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?bm(n,e):Ev(n,e)},kv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?wm(n,e):Tv(n,e)},Ov=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Sm(n,e):Av(n,e)},Uv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Em(n,e):Cv(n,e)},zv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Tm(n,e):Rv(n,e)},Bv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Am(n,e):Iv(n,e)},Fv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Cm(n,e):$v(n,e)},Vv=(n,e)=>{Hn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?vm(n,e):Pv(n,e)}}),mu,Hv,Gv,Wc,P3=fe(()=>{Ge(),Ft(),zd(),mu=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},Hv=(n,e)=>{mu(n.inputs);let t=(i,r,s)=>{let a=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]};n.compute(ko("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],t,[e.axis],7,e.keepDims),{inputs:[0]})},Gv=(n,e)=>{mu(n.inputs);let t=(i,r,s)=>{let a=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]};n.compute(ko("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],t,[e.axis],7,e.keepDims),{inputs:[0]})},Wc=n=>vt(n)}),Rm,oo,Im,$m,Pm,da,Dm,Wv,Bd=fe(()=>{Ge(),Ye(),Od(),Ke(),Rm=(n,e)=>{let t=n[0],i=n[1],r=n[2],s=n[3],a=n[4],o=n[5];if(a&&o)throw new Error("Attention cannot have both past and attention_bias");if(t.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=t.dims[0],l=t.dims[1],c=t.dims[2];if(r.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(r.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let d=r.dims[0]/3,h=d,f=h;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let w of e.qkvHiddenSizes)if(w%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");d=e.qkvHiddenSizes[0],h=e.qkvHiddenSizes[1],f=e.qkvHiddenSizes[2]}let m=l;if(d!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(r.dims[0]!==d+h+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(a){if(h!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(y=a.dims[3])}let _=m+y,p=-1,x=0;if(s)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==e.numHeads||o.dims[2]!==l||o.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:y,kvSequenceLength:m,totalSequenceLength:_,maxSequenceLength:p,inputHiddenSize:c,hiddenSize:d,vHiddenSize:f,headSize:Math.floor(d/e.numHeads),vHeadSize:Math.floor(f/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},oo=(n,e,t)=>e&&n?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${n?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${t?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Im=(n,e,t,i,r,s,a,o)=>{let u=Bt(a?1:s),l=64,c=s/u;c<l&&(l=32);let d=Math.ceil(s/u/l),h=[{type:12,data:e},{type:12,data:t},{type:12,data:i},{type:12,data:r},{type:12,data:c},{type:12,data:d}],f=jt(n.dataType,u),m=ln(1,u),y=["type"];a&&y.push("type"),o&&y.push("type");let _=p=>{let x=Pe("x",n.dataType,n.dims,u),w=[x],b=a?re("seq_lens",a.dataType,a.dims):void 0;b&&w.push(b);let I=o?re("total_sequence_length_input",o.dataType,o.dims):void 0;I&&w.push(I);let R=ln(n.dataType),T=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${p.registerUniforms(T).declareVariables(...w)}
  ${p.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${oo(b,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${x.type.value}(${R}(1.0) / ${R}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${R}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${f};${u}`,inputDependencies:y},getShaderSource:_,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:r,z:e*t},programUniforms:h})}},$m=(n,e,t,i,r,s,a,o,u)=>{let l=a+s.kvSequenceLength,c=[s.batchSize,s.numHeads,s.sequenceLength,l],d=n>1&&i,h=s.kvNumHeads?s.kvNumHeads:s.numHeads,f=d?[s.batchSize,h,l,s.headSize]:void 0,m=s.nReps?s.nReps:1,y=s.scale===0?1/Math.sqrt(s.headSize):s.scale,_=Bt(s.headSize),p=s.headSize/_,x=12,w={x:Math.ceil(l/x),y:Math.ceil(s.sequenceLength/x),z:s.batchSize*s.numHeads},b=[{type:12,data:s.sequenceLength},{type:12,data:p},{type:12,data:l},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:y},{type:12,data:a},{type:12,data:s.kvSequenceLength},{type:12,data:m}],I=d&&i&&te.size(i.dims)>0,R=["type","type"];I&&R.push("type"),r&&R.push("type"),o&&R.push("type"),u&&R.push("type");let T=[{dims:c,dataType:e.dataType,gpuDataType:0}];d&&T.push({dims:f,dataType:e.dataType,gpuDataType:0});let S=C=>{let A=re("q",e.dataType,e.dims,_),L=re("key",t.dataType,t.dims,_),F=[A,L];if(I){let ie=re("past_key",i.dataType,i.dims,_);F.push(ie)}r&&F.push(re("attention_bias",r.dataType,r.dims));let B=o?re("seq_lens",o.dataType,o.dims):void 0;B&&F.push(B);let N=u?re("total_sequence_length_input",u.dataType,u.dims):void 0;N&&F.push(N);let U=Pe("output",e.dataType,c),z=[U];d&&z.push(Pe("present_key",e.dataType,f,_));let K=ln(1,_),W=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${A.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${A.type.storage}, ${x*x}>;
  ${C.registerUniforms(W).declareVariables(...F,...z)}
  ${C.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${oo(B,N,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&d?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${d?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${K}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&d?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${d?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${K}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(_){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${_}`)}})()};
        output[outputIdx] = ${U.type.value} (sum * uniforms.alpha) + ${r?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${_};${r!==void 0};${i!==void 0};${n}`,inputDependencies:R},getRunData:()=>({outputs:T,dispatchGroup:w,programUniforms:b}),getShaderSource:S}},Pm=(n,e,t,i,r,s,a=void 0,o=void 0)=>{let u=s+r.kvSequenceLength,l=r.nReps?r.nReps:1,c=r.vHiddenSize*l,d=n>1&&i,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=d?[r.batchSize,h,u,r.headSize]:void 0,m=[r.batchSize,r.sequenceLength,c],y=12,_={x:Math.ceil(r.vHeadSize/y),y:Math.ceil(r.sequenceLength/y),z:r.batchSize*r.numHeads},p=[{type:12,data:r.sequenceLength},{type:12,data:u},{type:12,data:r.vHeadSize},{type:12,data:r.numHeads},{type:12,data:r.headSize},{type:12,data:c},{type:12,data:s},{type:12,data:r.kvSequenceLength},{type:12,data:l}],x=d&&i&&te.size(i.dims)>0,w=["type","type"];x&&w.push("type"),a&&w.push("type"),o&&w.push("type");let b=[{dims:m,dataType:e.dataType,gpuDataType:0}];d&&b.push({dims:f,dataType:e.dataType,gpuDataType:0});let I=R=>{let T=re("probs",e.dataType,e.dims),S=re("v",t.dataType,t.dims),C=[T,S];x&&C.push(re("past_value",i.dataType,i.dims));let A=a?re("seq_lens",a.dataType,a.dims):void 0;a&&C.push(A);let L=o?re("total_sequence_length_input",o.dataType,o.dims):void 0;o&&C.push(L);let F=[Pe("output",e.dataType,m)];d&&F.push(Pe("present_value",e.dataType,f));let B=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${y}u;
  var<workgroup> tileQ: array<${T.type.value}, ${y*y}>;
  var<workgroup> tileV: array<${T.type.value}, ${y*y}>;
  ${R.registerUniforms(B).declareVariables(...C,...F)}
  ${R.mainStart([y,y,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${oo(A,L,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&d?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${d?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${T.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${x&&d?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${d?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${n}`,inputDependencies:w},getRunData:()=>({outputs:b,dispatchGroup:_,programUniforms:p}),getShaderSource:I}},da=(n,e,t,i,r,s,a,o,u,l,c=void 0,d=void 0)=>{let h=Math.min(n.outputCount,1+(a?1:0)+(o?1:0)),f=h>1?a:void 0,m=h>1?o:void 0,y=h>1?l.pastSequenceLength:0,_=y+l.kvSequenceLength,p=u&&te.size(u.dims)>0?u:void 0,x=[e,t];f&&te.size(f.dims)>0&&x.push(f),p&&x.push(p),c&&x.push(c),d&&x.push(d);let w=n.compute($m(h,e,t,f,p,l,y,c,d),{inputs:x,outputs:h>1?[-1,1]:[-1]})[0];n.compute(Im(w,l.batchSize,l.numHeads,y,l.sequenceLength,_,c,d),{inputs:c&&d?[w,c,d]:[w],outputs:[]});let b=[w,i];m&&te.size(m.dims)>0&&b.push(m),c&&b.push(c),d&&b.push(d),n.compute(Pm(h,w,i,m,l,y,c,d),{inputs:b,outputs:h>1?[0,2]:[0]})},Dm=(n,e)=>{let t=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],i=e.sequenceLength,r=e.inputHiddenSize,s=e.headSize,a=12,o={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],l=[{type:12,data:i},{type:12,data:r},{type:12,data:s},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=d=>{let h=Pe("output_q",u[0].dataType,t),f=Pe("output_k",u[0].dataType,t),m=Pe("output_v",u[0].dataType,t),y=re("input",u[0].dataType,u[0].dims),_=re("weight",u[1].dataType,u[1].dims),p=re("bias",u[2].dataType,u[2].dims),x=y.type.storage,w=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${x}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${x}, ${a*a}>;
  var<workgroup> tileWeightK: array<${x}, ${a*a}>;
  var<workgroup> tileWeightV: array<${x}, ${a*a}>;
  ${d.registerUniforms(w).declareVariables(y,_,p,h,f,m)}
  ${d.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${x}(0);
    var valueK = ${x}(0);
    var valueV = ${x}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:t,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:t,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:t,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},Wv=(n,e)=>{let t=Rm(n.inputs,e),[i,r,s]=Dm(n,t);return da(n,i,r,s,n.inputs[4],void 0,void 0,void 0,n.inputs[5],t)}}),Lm,Nm,km,qv,D3=fe(()=>{Nn(),Ge(),Ye(),Ft(),Ke(),Lm=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let t=(i,r,s)=>{let a=r.length;if(a!==i.length)throw new Error(`${s}: num dimensions != ${a}`);r.forEach((o,u)=>{if(o!==i[u])throw new Error(`${s}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let i=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);t(n[1].dims,i,"Invalid input scale"),t(n[2].dims,i,"Invalid input B"),t(n[3].dims,i,"Invalid input mean"),t(n[4].dims,i,"Invalid input var")}else t(n[1].dims,[1],"Invalid input scale"),t(n[2].dims,[1],"Invalid input B"),t(n[3].dims,[1],"Invalid input mean"),t(n[4].dims,[1],"Invalid input var")},Nm=(n,e)=>{let{epsilon:t,spatial:i,format:r}=e,s=n[0].dims,a=i?Bt(s[s.length-1]):1,o=r==="NHWC"&&s.length>1?a:1,u=te.size(s)/a,l=i,c=l?s.length:s,d=re("x",n[0].dataType,n[0].dims,a),h=re("scale",n[1].dataType,n[1].dims,o),f=re("bias",n[2].dataType,n[2].dims,o),m=re("inputMean",n[3].dataType,n[3].dims,o),y=re("inputVar",n[4].dataType,n[4].dims,o),_=Pe("y",n[0].dataType,c,a),p=()=>{let w="";if(i)w=`let cOffset = ${s.length===1?"0u":r==="NHWC"?`outputIndices[${s.length-1}] / ${a}`:"outputIndices[1]"};`;else if(r==="NCHW")w=`
            ${_.indicesSet("outputIndices","0","0")}
            let cOffset = ${_.indicesToOffset("outputIndices")};`;else{w=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let b=1;b<h.rank;b++)w+=`cIndices[${b}] = outputIndices[${b}];`;w+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return w},x=w=>`
  const epsilon = ${t};
  ${w.registerUniform("outputSize","u32").declareVariables(d,h,f,m,y,_)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${_.offsetToIndices(`global_idx * ${a}`)};
    ${p()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${d.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${_.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${i}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...Ue(s)]:[{type:12,data:u}]})}},km=n=>vt(n),qv=(n,e)=>{let{inputs:t,outputCount:i}=n,r=km({...e,outputCount:i});if(Nt.webgpu.validateInputContent&&Lm(t,r),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(Nm(t,r))}}),Om,Um,jv,L3=fe(()=>{Ye(),Ke(),Om=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Um=n=>{let e=n[0].dims,t=n[0].dims[2],i=te.size(e)/4,r=n[0].dataType,s=re("input",r,e,4),a=re("bias",r,[t],4),o=re("residual",r,e,4),u=Pe("output",r,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const channels = ${t}u / 4;
  ${l.declareVariables(s,a,o,u)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},jv=n=>{Om(n.inputs),n.compute(Um(n.inputs))}}),zm,gt,Xv,Yv,Kv,Zv,Jv,Qv,ex,tx,nx,Bm,ix,rx,sx,ax,na,ox,Co,lx,ux,cx,dx,hx,fx,px,mx,gx,_x,yx,vx,xx,bx,wx,Sx,gu,Mx,qc,jc,Ex,Tx,Ax,Fm,Vm,Cx,Fd=fe(()=>{Ge(),Ye(),Ft(),Ke(),zm=(n,e,t,i,r,s,a)=>{let o=Math.ceil(e/4),u="";typeof r=="string"?u=`${r}(a)`:u=r("a");let l=re("inputData",t,[o],4),c=Pe("outputData",i,[o],4),d=[{name:"vec_size",type:"u32"}];return a&&d.push(...a),`
      ${n.registerUniforms(d).declareVariables(l,c)}

  ${s??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},gt=(n,e,t,i,r,s=n.dataType,a,o)=>{let u=[{type:12,data:Math.ceil(te.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:r,inputDependencies:["type"]},getShaderSource:l=>zm(l,te.size(n.dims),n.dataType,s,t,i,o),getRunData:l=>({outputs:[{dims:n.dims,dataType:s}],dispatchGroup:{x:Math.ceil(te.size(l[0].dims)/64/4)},programUniforms:u})}},Xv=n=>{n.compute(gt(n.inputs[0],"Abs","abs"))},Yv=n=>{n.compute(gt(n.inputs[0],"Acos","acos"))},Kv=n=>{n.compute(gt(n.inputs[0],"Acosh","acosh"))},Zv=n=>{n.compute(gt(n.inputs[0],"Asin","asin"))},Jv=n=>{n.compute(gt(n.inputs[0],"Asinh","asinh"))},Qv=n=>{n.compute(gt(n.inputs[0],"Atan","atan"))},ex=n=>{n.compute(gt(n.inputs[0],"Atanh","atanh"))},tx=n=>vt(n),nx=(n,e)=>{let t;switch(e.to){case 10:t="vec4<f16>";break;case 1:t="vec4<f32>";break;case 12:t="vec4<u32>";break;case 6:t="vec4<i32>";break;case 9:t="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(gt(n.inputs[0],"Cast",t,void 0,e.cacheKey,e.to))},Bm=n=>{let e,t,i=n.length>=2&&n[1].data!==0,r=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=i?n[1].getFloat32Array()[0]:-34028234663852886e22,t=r?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=i?n[1].getUint16Array()[0]:64511,t=r?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return vt({min:e,max:t})},ix=(n,e)=>{let t=e||Bm(n.inputs),i=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"Clip",r=>`clamp(${r}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,t.cacheKey,void 0,[{type:n.inputs[0].dataType,data:t.min},{type:n.inputs[0].dataType,data:t.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},rx=n=>{n.compute(gt(n.inputs[0],"Ceil","ceil"))},sx=n=>{n.compute(gt(n.inputs[0],"Cos","cos"))},ax=n=>{n.compute(gt(n.inputs[0],"Cosh","cosh"))},na=n=>vt(n),ox=(n,e)=>{let t=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${t}(${e.alpha});

  fn elu_f32(a: ${t}) -> ${t} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${t}>) -> vec4<${t}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Co=(n="f32")=>`
const r0: ${n} = 0.3275911;
const r1: ${n} = 0.254829592;
const r2: ${n} = -0.284496736;
const r3: ${n} = 1.421413741;
const r4: ${n} = -1.453152027;
const r5: ${n} = 1.061405429;

fn erf_vf32(v: vec4<${n}>) -> vec4<${n}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,lx=n=>{let e=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"Erf",t=>`erf_vf32(${t})`,Co(e)))},ux=n=>{n.compute(gt(n.inputs[0],"Exp","exp"))},cx=n=>{n.compute(gt(n.inputs[0],"Floor","floor"))},dx=n=>{let e=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"Gelu",t=>`0.5 * ${t} * (1.0 + erf_vf32(${t} * 0.7071067811865475))`,Co(e)))},hx=(n,e)=>{let t=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${t}>(0.0))`,`const leaky_relu_alpha_ = ${t}(${e.alpha});`,e.cacheKey))},fx=n=>{n.compute(gt(n.inputs[0],"Not",e=>`!${e}`))},px=n=>{n.compute(gt(n.inputs[0],"Neg",e=>`-${e}`))},mx=n=>{n.compute(gt(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},gx=n=>{let e=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"Relu",t=>`select(vec4<${e}>(0.0), ${t}, ${t} > vec4<${e}>(0.0))`))},_x=n=>{n.compute(gt(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},yx=n=>vt(n),vx=(n,e)=>{let t=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"HardSigmoid",i=>`max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), ${e.alpha} * ${i} + vec4<${t}>(${e.beta})))`,void 0,e.cacheKey))},xx=n=>{n.compute(gt(n.inputs[0],"Sin","sin"))},bx=n=>{n.compute(gt(n.inputs[0],"Sinh","sinh"))},wx=n=>{n.compute(gt(n.inputs[0],"Sqrt","sqrt"))},Sx=n=>{n.compute(gt(n.inputs[0],"Tan","tan"))},gu=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,Mx=n=>{n.compute(gt(n.inputs[0],"Tanh",gu))},qc=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${gu("v")};
}
`,jc=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,Ex=n=>{let e=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"FastGelu",jc,qc(e),void 0,n.inputs[0].dataType))},Tx=(n,e)=>{let t=ln(n.inputs[0].dataType);return n.compute(gt(n.inputs[0],"ThresholdedRelu",i=>`select(vec4<${t}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${t}>(${e.alpha});`,e.cacheKey)),0},Ax=n=>{n.compute(gt(n.inputs[0],"Log","log"))},Fm=(n,e)=>`
const alpha = vec4<${n}>(${e});
const one = ${n}(1.0);
const zero = ${n}(0.0);

fn quick_gelu_impl(x: vec4<${n}>) -> vec4<${n}> {
  let v = x *alpha;
  var x1 : vec4<${n}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Vm=n=>`quick_gelu_impl(${n})`,Cx=(n,e)=>{let t=ln(n.inputs[0].dataType);n.compute(gt(n.inputs[0],"QuickGelu",Vm,Fm(t,e.alpha),e.cacheKey,n.inputs[0].dataType))}}),Hm,Gm,Rx,N3=fe(()=>{Ye(),Ke(),Fd(),Hm=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Gm=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let t=re("input",n[0].dataType,n[0].dims,4),i=re("bias",n[0].dataType,[n[0].dims[2]],4),r=Pe("output",n[0].dataType,e,4),s=te.size(e)/4,a=jt(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${o.declareVariables(t,i,r)}

  ${Co(a)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${r.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Rx=n=>{Hm(n.inputs),n.compute(Gm(n.inputs))}}),Wm,qm,Gn,Ix,$x,Px,Dx,Lx,Nx,kx,Ox,Ux,zx,k3=fe(()=>{Ge(),Ye(),Ke(),Wm=(n,e,t,i,r,s,a,o,u,l,c,d)=>{let h,f;typeof o=="string"?h=f=(x,w)=>`${o}((${x}),(${w}))`:typeof o=="function"?h=f=o:(h=o.scalar,f=o.vector);let m=Pe("outputData",c,i.length,4),y=re("aData",u,e.length,4),_=re("bData",l,t.length,4),p;if(r)if(s){let x=te.size(e)===1,w=te.size(t)===1,b=e.length>0&&e[e.length-1]%4===0,I=t.length>0&&t[t.length-1]%4===0;x||w?p=m.setByOffset("global_idx",f(x?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),w?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"))):p=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${_.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(a||b?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||I?_.getByOffset("offsetB / 4u"):`${_.type.value}(${_.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else p=m.setByOffset("global_idx",f(y.getByOffset("global_idx"),_.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(w,b,I="")=>{let R=`aData[indexA${b}][componentA${b}]`,T=`bData[indexB${b}][componentB${b}]`;return`
            let outputIndices${b} = ${m.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offsetA${b} = ${y.broadcastedIndicesToOffset(`outputIndices${b}`,m)};
            let offsetB${b} = ${_.broadcastedIndicesToOffset(`outputIndices${b}`,m)};
            let indexA${b} = offsetA${b} / 4u;
            let indexB${b} = offsetB${b} / 4u;
            let componentA${b} = offsetA${b} % 4u;
            let componentB${b} = offsetB${b} % 4u;
            ${w}[${b}] = ${I}(${h(R,T)});
          `};c===9?p=`
            var data = vec4<u32>(0);
            ${x("data",0,"u32")}
            ${x("data",1,"u32")}
            ${x("data",2,"u32")}
            ${x("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${x("outputData[global_idx]",0)}
            ${x("outputData[global_idx]",1)}
            ${x("outputData[global_idx]",2)}
            ${x("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(y,_,m)}

        ${d??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},qm=(n,e,t,i,r,s,a=t.dataType)=>{let o=t.dims.map(Number),u=i.dims.map(Number),l=!te.areEqual(o,u),c=o,d=te.size(o),h=!1,f=!1,m=[l];if(l){let y=gs.calcShape(o,u,!1);if(!y)throw new Error("Can't perform binary op on the given tensors");c=y.slice(),d=te.size(c);let _=te.size(o)===1,p=te.size(u)===1,x=o.length>0&&o[o.length-1]%4===0,w=u.length>0&&u[u.length-1]%4===0;m.push(_),m.push(p),m.push(x),m.push(w);let b=1;for(let I=1;I<c.length;I++){let R=o[o.length-I],T=u[u.length-I];if(R===T)b*=R;else break}b%4===0?(f=!0,h=!0):(_||p||x||w)&&(h=!0)}else h=!0;return m.push(h),{name:n,shaderCache:{hint:e+m.map(y=>y.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:y=>Wm(y,o,u,c,h,l,f,r,t.dataType,i.dataType,a,s),getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(te.size(c)/4)},...Ue(o,u,c)]})}},Gn=(n,e,t,i,r,s)=>{n.compute(qm(e,r??"",n.inputs[0],n.inputs[1],t,i,s))},Ix=n=>{Gn(n,"Add",(e,t)=>`${e}+${t}`)},$x=n=>{Gn(n,"Div",(e,t)=>`${e}/${t}`)},Px=n=>{Gn(n,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},Dx=n=>{Gn(n,"Mul",(e,t)=>`${e}*${t}`)},Lx=n=>{let e=re("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;Gn(n,"Pow",{scalar:(t,i)=>`pow_custom(${t},${i})`,vector:(t,i)=>`pow_vector_custom(${t},${i})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Nx=n=>{Gn(n,"Sub",(e,t)=>`${e}-${t}`)},kx=n=>{Gn(n,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},Ox=n=>{Gn(n,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},Ux=n=>{Gn(n,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},zx=n=>{Gn(n,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),jm,Xm,Ym,Km,Bx,Fx,O3=fe(()=>{Ge(),Ye(),Ft(),Ke(),jm=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let t=0,i=n[t],r=i.dataType,s=i.dims.length;n.forEach((a,o)=>{if(o!==t){if(a.dataType!==r)throw new Error("input tensors should be one type");if(a.dims.length!==s)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==i.dims[l])throw new Error("non concat dimensions must match")})}})},Xm=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,Ym=(n,e)=>{let t=n.length,i=[];for(let r=0;r<t;++r){let s=e.setByOffset("global_idx",n[r].getByIndices("indices"));t===1?i.push(s):r===0?i.push(`if (inputIndex == ${r}u) { ${s} }`):r===t-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${r}) { ${s} }`)}return i.join(`
`)},Km=(n,e,t,i)=>{let r=te.size(t),s=new Array(n.length),a=new Array(n.length),o=0,u=[],l=[],c=[{type:12,data:r}];for(let y=0;y<n.length;++y)o+=n[y].dims[e],s[y]=o,l.push(n[y].dims.length),a[y]=re(`input${y}`,i,l[y]),u.push("rank"),c.push({type:12,data:s[y]});for(let y=0;y<n.length;++y)c.push(...Ue(n[y].dims));c.push(...Ue(t));let d=Pe("output",i,t.length),h=d.indicesGet("indices",e),f=Array.from(Array(s.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),m=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let _=0;_<n.length;_++)y.registerUniform(`sizeInConcatAxis${_}`,"u32");return y.declareVariables(...a,d)})()}

  ${Xm(s.length,f)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${d.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ym(a,d)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:t,dataType:i}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:c}),getShaderSource:m}},Bx=(n,e)=>{let t=n.inputs,i=t[0].dims,r=te.normalizeAxis(e.axis,i.length);jm(t,r);let s=i.slice();s[r]=t.reduce((o,u)=>o+(u.dims.length>r?u.dims[r]:0),0);let a=t.filter(o=>te.size(o.dims)>0);n.compute(Km(a,r,s,t[0].dataType),{inputs:a})},Fx=n=>vt({axis:n.axis})}),Mr,Er,Tr,Vd,$r=fe(()=>{Ge(),Ye(),Mr=(n,e,t="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${t}(uniforms.clip_min)), ${e}(${t}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${t}(uniforms.alpha) * value + ${t}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${t}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},Er=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},Tr=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Vd=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[t,i]=n?.activation_params||[.2,.5];return{activation:e,alpha:t,beta:i}}else if(e==="Clip"){let[t,i]=n?.activation_params||[fv,pv];return{activation:e,clipMax:i,clipMin:t}}else if(e==="LeakyRelu"){let[t]=n?.activation_params||[.01];return{activation:e,alpha:t}}return{activation:e}}}),Jt,Vx,Hd=fe(()=>{Jt=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},Vx=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Hx,U3=fe(()=>{Hx=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`}),oa,Gd,Wd=fe(()=>{Ge(),Ye(),Ke(),$r(),oa=(n,e,t,i,r)=>{let s=i-t;return`
      ${Array.from({length:t}).map((a,o)=>`
      if (${ke(e.shape,o,e.rank)} != 1) {
        ${e.indicesSet(n,o,ke(r,o+s,i))}
      } else {
        ${e.indicesSet(n,o,0)}
      }`).join("")}
`},Gd=(n,e,t,i,r=!1,s)=>{let a=n[0].dims,o=n[1].dims,u=a[a.length-2],l=o[o.length-1],c=a[a.length-1],d=Bt(l),h=Bt(c),f=Bt(u),m=te.size(t)/d/f,y=n.length>2,_=i?i.slice(0,-2):t.slice(0,-2),p=[te.size(_),u,l],x=[{type:12,data:m},{type:12,data:u},{type:12,data:l},{type:12,data:c}];Er(e,x),x.push(...Ue(_,a,o)),y&&x.push(...Ue(n[2].dims)),x.push(...Ue(p));let w=b=>{let I=Ud("batch_dims",n[0].dataType,_.length),R=re("a",n[0].dataType,a.length,h),T=re("b",n[1].dataType,o.length,d),S=Pe("output",n[0].dataType,p.length,d),C=jt(S.type.tensor),A=Mr(e,S.type.value,C),L=[R,T],F="";if(y){let U=r?d:1;L.push(re("bias",n[2].dataType,n[2].dims.length,U)),F=`${r?`value += bias[col / ${U}];`:`value += ${S.type.value}(bias[row + i]);`}`}let B=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Tr(e,B);let N=()=>{let U=`var a_data: ${R.type.value};`;for(let z=0;z<h;z++)U+=`
              let b_data${z} = b[(b_offset + (k + ${z}) * uniforms.N + col) / ${d}];`;for(let z=0;z<f;z++){U+=`a_data = a[(a_offset + (row + ${z}) * uniforms.K + k) / ${h}];`;for(let K=0;K<h;K++)U+=`
            values[${z}] = fma(${T.type.value}(a_data${h===1?"":`[${K}]`}), b_data${K}, values[${z}]);
`}return U};return`
  ${b.registerUniforms(B).registerInternalVariables(I).declareVariables(...L,S)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${t.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${R.type.indices};
    ${oa("a_indices",R,R.rank-2,I.rank,"batch_indices")}
    ${R.indicesSet("a_indices",R.rank-2,0)}
    ${R.indicesSet("a_indices",R.rank-1,0)}
    let a_offset = ${R.indicesToOffset("a_indices")};

    var b_indices: ${T.type.indices};
    ${oa("b_indices",T,T.rank-2,I.rank,"batch_indices")}
    ${T.indicesSet("b_indices",T.rank-2,0)}
    ${T.indicesSet("b_indices",T.rank-1,0)}
    let b_offset = ${T.indicesToOffset("b_indices")};
    var values: array<${S.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${N()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${F}
      ${A}
      let cur_indices = ${S.type.indices}(batch, row + i, col);
      let offset = ${S.indicesToOffset("cur_indices")};
      ${S.setByOffset(`offset / ${d}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${d};${h};${f};${r}`,inputDependencies:y?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(t):t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:x}),getShaderSource:w}}}),Zm,Jm,Xc,_u,Qm,Yc,eg,Oo,qd=fe(()=>{Ge(),Ye(),Ke(),$r(),Wd(),Hd(),Zm=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,Jm=(n,e)=>n?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Xc=(n,e,t="f32",i,r=!1,s=32,a=!1,o=32)=>{let u=e[1]*n[1],l=e[0]*n[0],c=r?u:s,d=r?s:u,h=c/e[0],f=s/e[1];if(!((r&&h===4&&n[1]===4||!r&&(h===3||h===4))&&c%e[0]===0&&s%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${r} is true, innerElementSize ${h} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${t}>, ${c/h}>, ${d}>;
var<workgroup> mm_Bsub: array<array<vec4<${t}>, ${l/n[0]}>, ${s}>;

const rowPerThread = ${n[1]};
const colPerThread = ${n[0]};
const innerElementSize = ${h};
const tileInner = ${s};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${t}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Zm(r,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Jm(r,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},_u=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,Qm=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Yc=(n,e,t="f32",i,r=!1,s=32,a=!1,o=32,u=!1)=>{let l=n[1]*e[1],c=n[0]*e[0],d=r?l:s,h=r?s:l;if(!(h%e[1]===0&&d%e[0]===0&&s%e[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}, tileInner ${s} must be divisible by workgroupSize[1]${e[1]}`);let f=h/e[1],m=d/e[0],y=s/e[1],_=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${e[0]}) {
          ${_u(r,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${t}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${r?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${_u(r,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${t}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Qm(r)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${t}, ${d}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${t}, ${c}>, ${s}>;
  const rowPerThread = ${n[1]};
  const colPerThread = ${n[0]};
  const tileInner = ${s};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${t}, colPerThread>, rowPerThread>;
    ${_}
  }
`},eg=(n,e,t,i,r=!1)=>{let[s,a,o,u]=i,l=jt(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Jt(n,l)} {
      var value = ${Jt(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${oa("aIndices",a,a.rank-2,s.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Jt(n,l)} {
      var value = ${Jt(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${oa("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Jt(n,l)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${r?"bias[colIn]":`${Jt(n,l)}(bias[row])`};`:""}
        ${t}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Oo=(n,e,t,i,r=!1,s)=>{let a=n[0].dims,o=n[1].dims,u=a.slice(0,-2),l=o.slice(0,-2),c=i?i.slice(0,-2):t.slice(0,-2),d=te.size(c),h=a[a.length-2],f=a[a.length-1],m=o[o.length-1],y=f%4===0&&m%4===0,_=h<=8?[4,1,1]:[4,4,1],p=[8,8,1],x=[Math.ceil(m/p[0]/_[0]),Math.ceil(h/p[1]/_[1]),Math.ceil(d/p[2]/_[2])],w=y?4:1,b=[...u,h,f/w],I=b.length,R=[...l,f,m/w],T=R.length,S=[d,h,m/w],C=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];Er(e,C),C.push(...Ue(c,b,R));let A=["rank","rank"],L=n.length>2;L&&(C.push(...Ue(n[2].dims)),A.push("rank")),C.push(...Ue(S));let F=B=>{let N=c.length,U=Ud("batchDims",n[0].dataType,N,1),z=jt(n[0].dataType),K=re("a",n[0].dataType,I,w),W=re("b",n[1].dataType,T,w),ie=Pe("result",n[0].dataType,S.length,w),oe=[K,W];if(L){let ue=r?w:1;oe.push(re("bias",n[2].dataType,n[2].dims.length,ue))}let Z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Tr(e,Z);let he=jt(ie.type.tensor),me=Mr(e,ie.type.value,he),G=eg(w,L,me,[U,K,W,ie],r);return`
  ${B.registerUniforms(Z).registerInternalVariables(U).declareVariables(...oe,ie)}
  ${G}
  ${y?Xc(_,p,z,U):Yc(_,p,z,U)}
                   `};return{name:"MatMul",shaderCache:{hint:`${_};${e.activation};${y};${r}`,inputDependencies:A},getRunData:()=>({outputs:[{dims:s?s(t):t,dataType:n[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:C}),getShaderSource:F}}}),tg,Gx,z3=fe(()=>{Ge(),Mi(),Ke(),$r(),Hd(),U3(),qd(),tg=(n,e,t,i,r=!1,s,a=4,o=4,u=4,l="f32")=>{let c=C=>{switch(C){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${C} is not supported.`)}},d=C=>{switch(C){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${C} is not supported.`)}},h=n?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=n?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",_=n?"row":"col",p=n?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${_} / outWidth;
    let outCol = ${_} % outWidth;

    let WRow = ${p} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${p} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${p} % inChannels;
    var resData = ${Jt(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${y}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(a)}
    }
    return resData;`,w=n?e&&i?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${x}
    }
    return ${Jt(a,l)}(0.0);`:i&&t?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${Jt(a,l)}(0.0);`,b=n?i&&t?d(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(o)}
    }
    return ${Jt(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(o)}
    }
    return ${Jt(o,l)}(0.0);`,I=Jt(u,l),R=Jt(n?a:o,l),T=Jt(n?o:a,l),S=Mr(s,I,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${n?w:b}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${T} {
      ${n?b:w}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${Vx(r)}
      ${S}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Gx=(n,e,t,i,r,s,a,o,u)=>{let l=e.format==="NHWC",c=l?n[0].dims[3]:n[0].dims[1],d=t[0],h=l?t[2]:t[3],f=l?t[1]:t[2],m=l?t[3]:t[1],y=l&&(c%4===0||c%3===0)&&m%4===0,_=l?m:h*f,p=l?h*f:m,x=[8,8,1],w=i<=8?[4,1,1]:[4,4,1],b=[Math.ceil(_/x[0]/w[0]),Math.ceil(p/x[1]/w[1]),Math.ceil(d/x[2]/w[2])];ht("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let I=y?l&&c%4!==0?3:4:1,R=x[1]*w[1],T=x[0]*w[0],S=Math.max(x[0]*I,x[1]),C=i%R===0,A=r%T===0,L=s%S===0,F=y?[I,4,4]:[1,1,1],B=[{type:6,data:i},{type:6,data:r},{type:6,data:s},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Er(e,B),B.push(...Ue(n[0].dims,n[1].dims));let N=["rank","rank"];a&&(B.push(...Ue(n[2].dims)),N.push("rank")),B.push(...Ue(t));let U=z=>{let K=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Tr(e,K);let W=y?4:1,ie=jt(n[0].dataType),oe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${y?`vec4<${ie}>`:ie}) {
        result[flatIndex] = ${y?`vec4<${ie}>`:ie}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y?`vec4<${ie}>`:ie}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y?"/ 4":""}, value);
      }`,Z=re("x",n[0].dataType,n[0].dims.length,I===3?1:I),he=re("w",n[1].dataType,n[1].dims.length,W),me=[Z,he],G=Pe("result",n[0].dataType,t.length,W);if(a){let ue=re("bias",n[2].dataType,n[2].dims.length,W);me.push(ue),oe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y?`vec4<${ie}>`:ie} {
          return bias[coords.${l?"w":"y"}${y?"/ 4":""}];
        }`}return`
        ${Hx("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${z.registerUniforms(K).declareVariables(...me,G)}
        ${oe}
        ${tg(l,C,A,L,a,e,F[0],F[1],F[2],ie)}
        ${y?Xc(w,x,ie,void 0,!l,S):Yc(w,x,ie,void 0,!l,S,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${I};${y};${C};${A};${L};${R};${T};${S}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:u?u(t):t,dataType:n[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:B}),getShaderSource:U}}}),ng,yu,Ws,ig,vu,rg,Wx,qx,B3=fe(()=>{Ge(),Mi(),Ye(),Ke(),$r(),Hd(),ng=n=>{let e=1;for(let t=0;t<n.length;t++)e*=n[t];return e},yu=n=>typeof n=="number"?[n,n,n]:n,Ws=(n,e)=>e<=1?n:n+(n-1)*(e-1),ig=(n,e,t,i=1)=>{let r=Ws(e,i);return Math.floor((n[0]*(t-1)-t+r)/2)},vu=(n,e,t,i,r)=>{r==null&&(r=ig(n,e[0],i[0]));let s=[0,0,0,t];for(let a=0;a<3;a++)n[a]+2*r>=e[a]&&(s[a]=Math.trunc((n[a]-e[a]+2*r)/i[a]+1));return s},rg=(n,e,t,i,r,s,a,o,u,l)=>{let c,d,h,f;if(n==="VALID"&&(n=0),typeof n=="number"){c={top:n,bottom:n,left:n,right:n,front:n,back:n};let m=vu([e,t,i,1],[o,u,l],1,[r,s,a],n);d=m[0],h=m[1],f=m[2]}else if(Array.isArray(n)){if(!n.every((y,_,p)=>y===p[0]))throw Error(`Unsupported padding parameter: ${n}`);c={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let m=vu([e,t,i,1],[o,u,l],1,[r,s,a],n[0]);d=m[0],h=m[1],f=m[2]}else if(n==="SAME_UPPER"){d=Math.ceil(e/r),h=Math.ceil(t/s),f=Math.ceil(i/a);let m=(d-1)*r+o-e,y=(h-1)*s+u-t,_=(f-1)*a+l-i,p=Math.floor(m/2),x=m-p,w=Math.floor(y/2),b=y-w,I=Math.floor(_/2),R=_-I;c={top:w,bottom:b,left:I,right:R,front:p,back:x}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:c,outDepth:d,outHeight:h,outWidth:f}},Wx=(n,e,t,i,r,s=!1,a="channelsLast")=>{let o,u,l,c,d;if(a==="channelsLast")[o,u,l,c,d]=n;else if(a==="channelsFirst")[o,d,u,l,c]=n;else throw new Error(`Unknown dataFormat ${a}`);let[h,,f,m,y]=e,[_,p,x]=yu(t),[w,b,I]=yu(i),R=Ws(f,w),T=Ws(m,b),S=Ws(y,I),{padInfo:C,outDepth:A,outHeight:L,outWidth:F}=rg(r,u,l,c,_,p,x,R,T,S),B=s?h*d:h,N=[0,0,0,0,0];return a==="channelsFirst"?N=[o,B,A,L,F]:a==="channelsLast"&&(N=[o,A,L,F,B]),{batchSize:o,dataFormat:a,inDepth:u,inHeight:l,inWidth:c,inChannels:d,outDepth:A,outHeight:L,outWidth:F,outChannels:B,padInfo:C,strideDepth:_,strideHeight:p,strideWidth:x,filterDepth:f,filterHeight:m,filterWidth:y,effectiveFilterDepth:R,effectiveFilterHeight:T,effectiveFilterWidth:S,dilationDepth:w,dilationHeight:b,dilationWidth:I,inShape:n,outShape:N,filterShape:e}},qx=(n,e,t,i,r,s)=>{let a=s==="channelsLast";a?n[0].dims[3]:n[0].dims[1];let o=[64,1,1],u={x:t.map((_,p)=>p)},l=[Math.ceil(ng(u.x.map(_=>t[_]))/o[0]),1,1];ht("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let c=1,d=te.size(t),h=[{type:12,data:d},{type:12,data:i},{type:12,data:r},{type:12,data:e.strides},{type:12,data:e.dilations}];Er(e,h),h.push(...Ue(n[0].dims,n[1].dims));let f=["rank","rank"],m=n.length===3;m&&(h.push(...Ue(n[2].dims)),f.push("rank")),h.push(...Ue(t));let y=_=>{let p=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:r.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Tr(e,p);let x=1,w=jt(n[0].dataType),b=re("x",n[0].dataType,n[0].dims.length,c),I=re("W",n[1].dataType,n[1].dims.length,x),R=[b,I],T=Pe("result",n[0].dataType,t.length,x),S="";if(m){let L=re("bias",n[2].dataType,n[2].dims.length,x);R.push(L),S+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${w} {
          return bias[${a?ke("coords",4,5):ke("coords",1,5)}];
        }`}let C=Jt(c,w),A=Mr(e,C,w);return`
            ${S}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${b.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${_.registerUniforms(p).declareVariables(...R,T)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${T.offsetToIndices("global_idx")};
              let batch = ${ke("coords",0,b.rank)};
              let d2 = ${a?ke("coords",b.rank-1,b.rank):ke("coords",1,b.rank)};
              let xFRCCorner = vec3<u32>(${a?ke("coords",1,b.rank):ke("coords",2,b.rank)},
              ${a?ke("coords",2,b.rank):ke("coords",3,b.rank)},
              ${a?ke("coords",3,b.rank):ke("coords",4,b.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?ke("uniforms.x_shape",1,b.rank):ke("uniforms.x_shape",2,b.rank)};
              let xShapeZ = ${a?ke("uniforms.x_shape",2,b.rank):ke("uniforms.x_shape",3,b.rank)};
              let xShapeW = ${a?ke("uniforms.x_shape",3,b.rank):ke("uniforms.x_shape",4,b.rank)};
              let xShapeU = ${a?ke("uniforms.x_shape",4,b.rank):ke("uniforms.x_shape",1,b.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${m?"value = value + getBiasByOutputCoords(coords)":""};
              ${A}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${c};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:h}),getShaderSource:y}}}),jx,Xx,F3=fe(()=>{Ge(),Ye(),Ke(),$r(),jx=(n,e,t,i)=>{let r=n.length>2,s=r?"value += b[output_channel];":"",a=n[0].dims,o=n[1].dims,u=e.format==="NHWC",l=u?t[3]:t[1],c=l/e.group,d=u&&c>=4?Bt(l):1,h=te.size(t)/d,f=[{type:12,data:h},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];Er(e,f),f.push(...Ue(a,[o[0],o[1],o[2],o[3]/d]));let m=r?["rank","rank","rank"]:["rank","rank"];f.push(...Ue([t[0],t[1],t[2],t[3]/d]));let y=_=>{let p=Pe("output",n[0].dataType,t.length,d),x=jt(p.type.tensor),w=Mr(e,p.type.value,x),b=re("x",n[0].dataType,a.length),I=re("w",n[1].dataType,o.length,d),R=[b,I];r&&R.push(re("b",n[2].dataType,n[2].dims,d));let T=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Tr(e,T);let S=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${b.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${b.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${_.registerUniforms(T).declareVariables(...R,p)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${p.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${d} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${p.type.value} = ${p.type.value}(0);
    ${S}
    ${s}
    ${w}
    ${p.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i?i(t):t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:y}},Xx=(n,e,t,i)=>{let r=n.length>2,s=Bt(t[3]),a=Bt(t[2]),o=te.size(t)/s/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/s],l=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/s],c=[t[0],t[1],t[2],t[3]/s],d=[{type:12,data:o},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Er(e,d),d.push(...Ue(u,l,c));let h=(a-1)*e.strides[1]+l[1],f=m=>{let y=Pe("output",n[0].dataType,c.length,s),_=jt(y.type.tensor),p=Mr(e,y.type.value,_),x=re("x",n[0].dataType,u.length,s),w=re("w",n[1].dataType,l.length,s),b=[x,w];r&&b.push(re("b",n[2].dataType,n[2].dims,s));let I=r?"value += b[output_channel];":"",R=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Tr(e,R),`
  ${m.registerUniforms(R).declareVariables(...b,y)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${x.type.value}, ${h}>;
    var values: array<${y.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${x.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${x.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${w.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${I}
      ${p}
      ${y.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${s};${a};${h};${l[0]};${l[1]}`,inputDependencies:r?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(t):t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:f}}}),sg,lo,ag,uo,Kc,xu,og,lg,Zc,V3=fe(()=>{Ye(),z3(),B3(),qd(),F3(),$r(),Wd(),Gi(),sg=(n,e,t,i,r,s)=>{let a=n[0],o=n.slice(s?1:2,s?3:4),u=o.length,l=e[0],c=e.slice(2).map((h,f)=>h+(h-1)*(t[f]-1)),d=o.map((h,f)=>h+i[f]+i[f+u]).map((h,f)=>Math.floor((h-c[f]+r[f])/r[f]));return d.splice(0,0,a),d.splice(s?3:1,0,l),d},lo=[2,3,1,0],ag=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let t=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],i=n[1].dims[1]*e.group;if(t!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let r=n[0].dims.length-2;if(e.dilations.length!==r)throw new Error(`dilations should be ${r}D`);if(e.strides.length!==r)throw new Error(`strides should be ${r}D`);if(e.pads.length!==r*2)throw new Error(`pads should be ${r*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},uo=(n,e)=>{let t=n.kernelShape.slice();t.length<e[1].dims.length-2&&t.push(...Array(e[1].dims.length-2-t.length).fill(0));for(let s=2;s<e[1].dims.length;++s)t[s-2]===0&&(t[s-2]=e[1].dims[s]);let i=n.pads.slice();No.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,t,i,n.format==="NHWC",n.autoPad);let r=Object.assign({},n);return Object.assign(r,{kernelShape:t,pads:i}),r},Kc=n=>{let e=Vd(n),t=n.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],r=n.dilations,s=n.group,a=n.kernel_shape,o=n.pads,u=n.strides,l=n.w_is_const();return{autoPad:i,format:t,dilations:r,group:s,kernelShape:a,pads:o,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},xu=(n,e,t,i)=>{let r=t.format==="NHWC",s=sg(e[0].dims,e[1].dims,t.dilations,t.pads,t.strides,r);if(t.group!==1){let R=[e[0]];if(r){let T=n.kernelCustomData.wT??n.compute(Tn(e[1],lo),{inputs:[1],outputs:[t.wIsConst?-2:-1]})[0];t.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=T),R.push(T)}else R.push(e[1]);e.length===3&&R.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&r&&e[1].dims[0]===t.group&&e[1].dims[1]===1&&t.dilations[0]===1&&t.dilations[1]===1?n.compute(Xx(R,t,s,i),{inputs:R}):n.compute(jx(R,t,s,i),{inputs:R});return}let a=e.length===3,o=e[0].dims[r?1:2],u=e[0].dims[r?2:3],l=e[0].dims[r?3:1],c=e[1].dims[2],d=e[1].dims[3],h=s[r?1:2],f=s[r?2:3],m=s[r?3:1],y=r&&c===o&&d===u&&t.pads[0]===0&&t.pads[1]===0;if(y||c===1&&d===1&&t.dilations[0]===1&&t.dilations[1]===1&&t.strides[0]===1&&t.strides[1]===1&&t.pads[0]===0&&t.pads[1]===0){let R=s[0],T,S,C,A=[];if(r){let B=n.kernelCustomData.wT??n.compute(Tn(e[1],lo),{inputs:[1],outputs:[t.wIsConst?-2:-1]})[0];if(t.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=B),y){let N=o*u*l;T=e[0].reshape([1,R,N]),S=B.reshape([1,N,m]),C=[1,R,m]}else T=e[0].reshape([R,o*u,l]),S=B.reshape([1,l,m]),C=[R,h*f,m];A.push(T),A.push(S)}else T=e[0].reshape([R,l,o*u]),S=e[1].reshape([1,m,l]),C=[R,m,h*f],A.push(S),A.push(T);a&&A.push(e[2]);let L=C[2],F=A[0].dims[A[0].dims.length-1];L<8&&F<8?n.compute(Gd(A,t,s,C,r,i),{inputs:A}):n.compute(Oo(A,t,s,C,r,i),{inputs:A});return}let _=!0,p=n.kernelCustomData.wT??n.compute(Tn(e[1],lo),{inputs:[1],outputs:[t.wIsConst?-2:-1]})[0];t.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=p);let x=[e[0],p];a&&x.push(e[2]);let w=r?h*f:m,b=r?m:h*f,I=c*d*l;n.compute(Gx(x,t,s,w,b,I,a,_,i),{inputs:x})},og=(n,e)=>{let t=e.format==="NHWC",i=[n.inputs[0].reshape(t?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&i.push(n.inputs[2]);let r=[0,e.pads[0],0,e.pads[1]],s=[1].concat(e.strides),a=[1].concat(e.dilations),o=[1].concat(e.kernelShape),u=uo({...e,pads:r,strides:s,dilations:a,kernelShape:o},i);xu(n,i,u,l=>t?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},lg=(n,e,t)=>{let i=t.format==="NHWC"?"channelsLast":"channelsFirst",r=uo(t,e),s=t.autoPad==="NOTSET"?t.pads:t.autoPad,a=Wx(e[0].dims,e[1].dims,t.strides,t.dilations,s,!1,i);n.compute(qx(e,r,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],i))},Zc=(n,e)=>{if(ag(n.inputs,e),n.inputs[0].dims.length===3)og(n,e);else if(n.inputs[0].dims.length===5)lg(n,n.inputs,e);else{let t=uo(e,n.inputs);xu(n,n.inputs,t)}}}),Yx,H3=fe(()=>{Ge(),Mi(),Ye(),Ke(),Yx=(n,e,t)=>{let i=n.length>2,r=e.outputShape,s=e.format==="NHWC",a=e.group,o=n[1].dims,u=o[2]/a,l=o[3],c=s?Bt(u):1,d=s&&l===1&&u>=4,h=d?Math.floor(u/4)*4:Math.floor(u/c)*c,f=u-h,m=s?Bt(l):1,y=s?l===1?c:m:1,_=te.size(r)/m,p=[Math.ceil(_/64),1,1];ht("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${p}`);let x=["rank","rank"],w=[e.strides[0],e.strides[1]],b=[e.kernelShape[s?1:2],e.kernelShape[s?2:3]],I=[e.dilations[0],e.dilations[1]],R=[b[0]+(e.dilations[0]<=1?0:(e.kernelShape[s?1:2]-1)*(e.dilations[0]-1)),b[1]+(e.dilations[1]<=1?0:(e.kernelShape[s?2:3]-1)*(e.dilations[1]-1))],T=[R[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),R[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],S=[{type:12,data:_},{type:12,data:w},{type:12,data:b},{type:12,data:I},{type:12,data:R},{type:6,data:T},{type:12,data:h},{type:12,data:u},{type:12,data:l},...Ue(n[0].dims,n[1].dims)];i&&(S.push(...Ue(n[2].dims)),x.push("rank")),S.push(...Ue(r));let C=A=>{let L=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:w.length},{name:"filter_dims",type:"u32",length:b.length},{name:"dilations",type:"u32",length:b.length},{name:"effective_filter_dims",type:"u32",length:R.length},{name:"pads",type:"i32",length:T.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],F=jt(n[0].dataType),B=s?1:2,N=s?2:3,U=s?3:1,z=re("W",n[1].dataType,n[1].dims.length,y),K=re("Dy",n[0].dataType,n[0].dims.length,c),W=[K,z];i&&W.push(re("bias",n[2].dataType,[r[U]].length,m));let ie=Pe("result",n[0].dataType,r.length,m),oe=()=>{let me="";if(d)c===4?me+=`
        let xValue = ${K.getByOffset("x_offset")};
        let wValue = ${z.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?me+=`
          dotProd = dotProd + dot(vec4<${F}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}), vec4<${F}>(${z.getByOffset("w_offset")}, ${z.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(me+=`
          dotProd = dotProd + dot(vec4<${F}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}, ${K.getByOffset("x_offset + 2u")}, ${K.getByOffset("x_offset + 3u")}), vec4<${F}>(${z.getByOffset("w_offset")}, ${z.getByOffset("w_offset + 1u")}, ${z.getByOffset("w_offset + 2u")}, ${z.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(me+=`
                  let xValue = ${s?K.getByOffset(`${K.indicesToOffset(`${K.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):K.get("batch","inputChannel","idyR","idyC")};
        `,c===1)me+=`
          let w_offset = ${z.indicesToOffset(`${z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${z.getByOffset(`w_offset / ${y}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let G=0;G<c;G++)me+=`
            let wValue${G} = ${z.getByOffset(`${z.indicesToOffset(`${z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${G}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${G}] * wValue${G};`;return me},Z=()=>{if(f===0)return"";if(!d)throw new Error(`packInputAs4 ${d} is not true.`);let me="";if(c===1){me+="dotProd = dotProd";for(let G=0;G<f;G++)me+=`
            + ${K.getByOffset(`x_offset + ${G}`)} * ${z.getByOffset(`w_offset + ${G}`)}`;me+=";"}else if(c===2){if(f!==2)throw new Error(`Invalid inputChannelsRemainder ${f}.`);me+=`
          let xValue = ${K.getByOffset("x_offset")};
          let wValue = ${z.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return me},he=`
            let outputIndices = ${ie.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${ie.indicesGet("outputIndices",0)};
            let d1 = ${ie.indicesGet("outputIndices",U)};
            let r = ${ie.indicesGet("outputIndices",B)};
            let c = ${ie.indicesGet("outputIndices",N)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ie.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${F}(dyRCorner) + ${F}(wR)) / ${F}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${F}(uniforms.Dy_shape[${B}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${F}(dyCCorner) + ${F}(wC)) / ${F}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${F}(uniforms.Dy_shape[${N}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${d?`
                var x_offset = ${K.indicesToOffset(`${K.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${z.indicesToOffset(`${z.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${y};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${d?4:c}) {
                  ${oe()}
                  inputChannel = inputChannel + ${d?4:c};
                }
                ${Z()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${m}]`:""};
            ${ie.setByOffset("global_idx","value")};
          `;return`
    ${A.registerUniforms(L).declareVariables(...W,ie)}
      ${A.mainStart()}
      ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${he}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${c}${y}${m}${d}${f}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:p[0],y:p[1],z:p[2]},outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],programUniforms:S}),getShaderSource:C}}}),ug,cg,dg,bu,Kx,hg,wu,fg,Zx,G3=fe(()=>{H3(),$r(),Gi(),ug=(n,e,t,i,r,s)=>(n-1)*e+t+(i-1)*r+1-s,cg=(n,e,t,i,r)=>{let s=Math.floor(n/2);e==="SAME_UPPER"?(t[i]=s,t[r]=n-s):e==="SAME_LOWER"&&(t[i]=n-s,t[r]=s)},dg=(n,e,t,i,r,s,a,o,u,l)=>{let c=n.length-2,d=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let h=n[0],f=e[o?3:1]*r;for(let m=0,y=n.length-c-(o?1:0);m<c;++m,++y){let _=n[y],p=d?_*a[m]:l[m],x=ug(_,a[m],s[m],e[y],t[m],p);cg(x,i,s,m,m+c),d&&l.push(a[m]*(_-1)+u[m]+(e[y]-1)*t[m]+1-s[m]-s[m+c])}l.splice(0,0,h),l.splice(o?3:1,0,f)},bu=(n,e)=>{let t=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((d,h)=>d*h,1)===0){t.length=0;for(let d=2;d<e[1].dims.length;++d)t.push(e[1].dims[d])}let i=n.format==="NHWC";t.splice(0,0,e[1].dims[0]),t.splice(i?3:1,0,e[1].dims[1]);let r=n.pads.slice(),s=n.outputShape.slice(),a=n.outputPadding.slice(),o=e[0].dims,u=n.dilations.slice();if(u.reduce((d,h)=>d+h,0)===0){let d=e[0].dims.length-2;u=new Array(d).fill(1)}let l=n.strides.slice();if(l.reduce((d,h)=>d+h,0)===0){let d=e[0].dims.length-2;l=new Array(d).fill(1)}dg(o,t,u,n.autoPad,n.group,r,l,i,a,s);let c=Object.assign({},n);return Object.assign(c,{kernelShape:t,pads:r,outputPadding:a,outputShape:s,dilations:u,strides:l}),c},Kx=n=>{let e=Vd(n),t=n.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],r=n.dilations,s=n.group??1,a=n.kernelShape,o=n.pads,u=n.strides,l=n.wIsConst(),c=n.outputPadding,d=n.outputShape;return{autoPad:i,format:t,dilations:r,group:s,kernelShape:a,outputPadding:c,outputShape:d,pads:o,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},hg=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let t=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],i=n[1].dims[0];if(t!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==r))throw new Error("invalid bias");let s=n[0].dims.length-2;if(e.dilations.reduce((a,o)=>a+o,0)>0&&e.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(e.strides.reduce((a,o)=>a+o,0)>0&&e.strides.length!==s)throw new Error(`strides should be ${s}D`);if(e.pads.reduce((a,o)=>a+o,0)>0&&e.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(e.outputPadding.length!==s&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(e.kernelShape.reduce((a,o)=>a+o,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},wu=(n,e,t,i)=>{let r=n.kernelCustomData.wT??n.compute(Tn(e[1],[2,3,0,1]),{inputs:[1],outputs:[t.wIsConst?-2:-1]})[0];t.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=r);let s=[e[0],r];e.length===3&&s.push(e[2]),n.compute(Yx(s,t,i),{inputs:s})},fg=(n,e)=>{let t=e.format==="NHWC",i=[n.inputs[0].reshape(t?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&i.push(n.inputs[2]);let r=e.kernelShape;(r.length===0||r[0]===0)&&(r=[n.inputs[1].dims[2]]);let s=e.dilations;(s.length===0||s[0]===0)&&(s=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let o=e.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],a=[1].concat(a),s=[1].concat(s),r=[1].concat(r);let u=e.outputPadding;u=[0].concat(u);let l=bu({...e,pads:o,strides:a,dilations:s,kernelShape:r,outputPadding:u},i);wu(n,i,l,c=>t?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Zx=(n,e)=>{if(hg(n.inputs,e),n.inputs[0].dims.length===3)fg(n,e);else{let t=bu(e,n.inputs);wu(n,n.inputs,t)}}}),pg,Jx,Qx,W3=fe(()=>{Ge(),Ye(),Ft(),Ke(),pg=(n,e,t,i)=>{let r=te.size(e),s=e.length,a=re("input",n,s),o=Pe("output",n,s),u=t.dataType===6?t.getInt32Array()[0]:Number(t.getBigInt64Array()[0]),l=te.normalizeAxis(u,s),c=d=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,f=ke("uniforms.input_shape","uniforms.axis",s),m=i.reverse?h+(i.exclusive?" + 1":""):"0",y=i.reverse?f:h+(i.exclusive?"":" + 1");return`
                ${d.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,o)}
                ${d.mainStart()}
                  ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},{type:12,data:l},...Ue(e,e)]}),getShaderSource:c}},Jx=(n,e)=>{let t=n.inputs[0].dims,i=n.inputs[0].dataType,r=n.inputs[1];n.compute(pg(i,t,r,e),{inputs:[0]})},Qx=n=>{let e=n.exclusive===1,t=n.reverse===1;return vt({exclusive:e,reverse:t})}}),mg,gg,_g,eb,tb,q3=fe(()=>{Ge(),Ye(),Ft(),Ke(),mg=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},gg=(n,e,t,i)=>{let r=[];r.push(`fn perm(i: ${i.type.indices}) -> ${t.type.indices} {
    var a: ${t.type.indices};`);for(let s=0;s<e;++s)r.push(t.indicesSet("a",n[s],`i[${s}]`));return r.push("return a;}"),r.join(`
`)},_g=(n,e)=>{let t,i,r,s,a,o,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([t,i,r,s]=n.dims,a=c?[t,i,r,l,l,s/l**2]:[t,i,r,s/l**2,l,l],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([t,i,r,s]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=c?[t,l,l,s/l**2,i,r]:[t,s/l**2,l,l,i,r],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let d=n.reshape(a),h=d.dims.length,f=n.dataType,m=re("a",f,h),y=Pe("output",f,h),_=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(m,y)}

  ${gg(o,h,m,y)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:p=>{let x=u?[t,i*l,r*l,s/l**2]:[t,s/l**2,i*l,r*l],w=te.size(x),b=d.dims,I=te.sortBasedOnPerm(b,o);return{outputs:[{dims:x,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...Ue(b,I)]}},getShaderSource:_}},eb=(n,e)=>{mg(n.inputs),n.compute(_g(n.inputs[0],e))},tb=n=>vt({blocksize:n.blocksize,mode:n.mode,format:n.format})}),co,qs,Su,yg,vg,xg,bg,Mu,wg,nb,ib,j3=fe(()=>{Ge(),Ye(),Ft(),Ke(),co="[a-zA-Z]|\\.\\.\\.",qs="("+co+")+",Su="^"+qs+"$",yg="("+qs+",)*"+qs,vg="^"+yg+"$",xg=class{constructor(n=-1){this.symbolToIndices=new Map,this.inputIndex=n}addSymbol(n,e){let t=this.symbolToIndices.get(n);t===void 0?t=[e]:t.push(e),this.symbolToIndices.set(n,t)}},bg=class{constructor(n,e){this.equation=e,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,i]=e.includes("->")?e.split("->",2):[e,""];if(!t.match(RegExp(vg)))throw new Error("Invalid LHS term");if(t.split(",").forEach((r,s)=>{let a=n[s].dims.slice();if(!r.match(RegExp(Su)))throw new Error("Invalid LHS term");let o=this.processTerm(r,!0,a,s);this.lhs.push(o)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([r,s])=>s.count===1||r==="...").map(([r])=>r).join("");else if(!i.match(RegExp(qs)))throw new Error("Invalid RHS");i.match(RegExp(co,"g"))?.forEach(r=>{if(r==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(r);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(n,e,t){let i=this.symbolToInfo.get(n);if(i!==void 0){if(i.dimValue!==e&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(t)}else i={count:1,dimValue:e,inputIndices:[t]};this.symbolToInfo.set(n,i)}processTerm(n,e,t,i=-1){let r=t.length,s=!1,a=[],o=0;if(!n.match(RegExp(Su))&&!e&&n!=="")throw new Error("Invalid LHS term");let u=n.match(RegExp(co,"g")),l=new xg(i);return u?.forEach((c,d)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let h=r-u.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(a=t.slice(o,o+h),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(e)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let f=0;f<a.length;f++){let m=String.fromCharCode(48+f);l.addSymbol(m,d+f),this.addSymbol(m,t[o++],i)}}else l.addSymbol(c,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,t[o++],i)}),l}},Mu=n=>n+"_max",wg=(n,e,t,i)=>{let r=n.map(l=>l.length).map((l,c)=>re(`input${c}`,e,l)),s=te.size(i),a=Pe("output",e,i.length),o=[...t.symbolToInfo.keys()].filter(l=>!t.rhs.symbolToIndices.has(l)),u=l=>{let c=[],d="var prod = 1.0;",h="var sum = 0.0;",f="sum += prod;",m=[],y=[],_=[],p=[],x=t.symbolToInfo.size===t.rhs.symbolToIndices.size;t.symbolToInfo.forEach((b,I)=>{if(t.rhs.symbolToIndices.has(I)){let R=t.rhs.symbolToIndices.get(I)?.[0];R!==void 0&&t.lhs.forEach((T,S)=>{if(b.inputIndices.includes(S)){let C=T.symbolToIndices.get(I);if(C===void 0)throw new Error("Invalid symbol error");C.forEach(A=>{c.push(`${r[S].indicesSet(`input${S}Indices`,A,a.indicesGet("outputIndices",R))}`)})}})}else t.lhs.forEach((R,T)=>{if(b.inputIndices.includes(T)){let S=R.symbolToIndices.get(I);if(S===void 0)throw new Error("Invalid symbol error");S.forEach(C=>{m.push(`${r[T].indicesSet(`input${T}Indices`,C,`${I}`)}`)}),p.push(`prod *= ${r[T].getByIndices(`input${T}Indices`)};`)}}),y.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Mu(I)}; ${I}++) {`),_.push("}")});let w=x?[...c,`let sum = ${r.map((b,I)=>b.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...c,h,...y,...m,d,...p,f,..._];return`
            ${l.registerUniforms(o.map(b=>({name:`${Mu(b)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...r,a)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${r.map((b,I)=>`var input${I}Indices: ${r[I].type.indices};`).join(`
`)}
            ${w.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:t.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let l=o.filter(d=>t.symbolToInfo.has(d)).map(d=>({type:12,data:t.symbolToInfo.get(d)?.dimValue||0}));l.push({type:12,data:s});let c=n.map((d,h)=>[...Ue(d)]).reduce((d,h)=>d.concat(h),l);return c.push(...Ue(i)),{outputs:[{dims:i,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:u}},nb=(n,e)=>{let t=new bg(n.inputs,e.equation),i=t.outputDims,r=n.inputs.map((s,a)=>s.dims);n.compute(wg(r,n.inputs[0].dataType,t,i))},ib=n=>{let e=n.equation.replace(/\s+/g,"");return vt({equation:e})}}),Sg,Eu,Mg,Eg,rb,X3=fe(()=>{Ge(),Ye(),Ke(),Sg=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,t=Array.from(n[1].getBigInt64Array(),Number),i=t.length<e.length?0:t.length-e.length,r=e.length<t.length?0:e.length-t.length;for(;i<t.length&&r<e.length;++i,++r)if(t[i]!==e[r]&&t[i]!==1&&e[r]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Eu=(n,e)=>{let t=n.length-e.length,i=[];for(let r=0;r<t;++r)i.push(n[r]);for(let r=0;r<e.length;++r)i.push(e[r]===1?n[r+t]:e[r]);return i},Mg=(n,e)=>n.length>e.length?Eu(n,e):Eu(e,n),Eg=n=>{let e=n[0].dims,t=Array.from(n[1].getBigInt64Array(),Number),i=Mg(e,t),r=n[0].dataType,s=r===9||te.size(e)===1,a=r===9||e.length>0&&e[e.length-1]%4===0?4:1,o=s||i.length>0&&i[i.length-1]%4===0?4:1,u=Math.ceil(te.size(i)/o),l=d=>{let h=re("input",r,e.length,a),f=Pe("output",r,i.length,o),m;if(r===9){let y=(_,p,x="")=>`
          let outputIndices${p} = ${f.offsetToIndices(`outputOffset + ${p}u`)};
          let offset${p} = ${h.broadcastedIndicesToOffset(`outputIndices${p}`,f)};
          let index${p} = offset${p} / 4u;
          let component${p} = offset${p} % 4u;
          ${_}[${p}] = ${x}(${h.getByOffset(`index${p}`)}[component${p}]);
        `;m=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${y("data",0,"u32")}
        ${y("data",1,"u32")}
        ${y("data",2,"u32")}
        ${y("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${f.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",f)};
        let data = ${f.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${f.setByOffset("global_idx","data")}
      }`;return`
    ${d.registerUniform("vec_size","u32").declareVariables(h,f)}
    ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},c=[{type:12,data:u},...Ue(e,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${a}${o}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},rb=n=>{Sg(n.inputs),n.compute(Eg(n.inputs),{inputs:[0]})}}),Tg,sb,Y3=fe(()=>{Ge(),Ye(),Ke(),Fd(),Tg=n=>{let e=n[0].dataType,t=te.size(n[0].dims),i=te.size(n[1].dims),r=i%4===0,s=a=>{let o=re("x",e,[1],4),u=re("bias",e,[1],4),l=Pe("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],d=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${u.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,h=r?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${d(0)}${d(1)}${d(2)}${d(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(c).declareVariables(o,u,l)}

    ${qc(ln(e))}

    ${a.mainStart(_s)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",jc("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${r}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(t/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(t/_s/4)}})}},sb=n=>{n.inputs.length<2||te.size(n.inputs[1].dims)===0?Ex(n):n.compute(Tg(n.inputs))}}),Ag,Cg,ab,ob,K3=fe(()=>{Ge(),Ye(),Ft(),Ke(),Ag=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},Cg=(n,e)=>{let t=n[0].dims,i=n[1].dims,r=t.length,s=te.normalizeAxis(e.axis,r),a=t.slice(0);a.splice(s,1,...i);let o=t[s],u=n[0].dataType===9?4:1,l=Math.ceil(te.size(a)/u),c=[{type:12,data:l},{type:6,data:o},{type:12,data:s},...Ue(n[0].dims,n[1].dims,a)],d=h=>{let f=re("data",n[0].dataType,n[0].dims.length,u),m=re("inputIndices",n[1].dataType,n[1].dims.length),y=Pe("output",n[0].dataType,a.length,u),_=x=>{let w=i.length,b=`var indicesIndices${x}  = ${m.type.indices}(0);`;for(let I=0;I<w;I++)b+=`${w>1?`indicesIndices${x}[${I}]`:`indicesIndices${x}`} = ${a.length>1?`outputIndices${x}[uniforms.axis + ${I}]`:`outputIndices${x}`};`;b+=`
          var idx${x} = ${m.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${f.type.indices};
        `;for(let I=0,R=0;I<r;I++)I===s?(b+=`${r>1?`dataIndices${x}[${I}]`:`dataIndices${x}`} = u32(idx${x});`,R+=w):(b+=`${r>1?`dataIndices${x}[${I}]`:`dataIndices${x}`} = ${a.length>1?`outputIndices${x}[${R}]`:`outputIndices${x}`};`,R++);return b},p;if(n[0].dataType===9){let x=(w,b,I="")=>`
          let outputIndices${b} = ${y.offsetToIndices(`outputOffset + ${b}u`)};
          ${_(b)};
          let offset${b} = ${f.indicesToOffset(`dataIndices${b}`)};
          let index${b} = offset${b} / 4u;
          let component${b} = offset${b} % 4u;
          ${w}[${b}] = ${I}(${f.getByOffset(`index${b}`)}[component${b}]);
        `;p=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else p=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${_("")};
      let value = ${f.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${p}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:d}},ab=n=>vt({axis:n.axis}),ob=(n,e)=>{let t=n.inputs;Ag(t),n.compute(Cg(n.inputs,e))}}),Rg,lb,ub,Z3=fe(()=>{Ge(),Ye(),Ke(),Rg=(n,e,t,i,r,s,a,o,u)=>{let l=[{type:12,data:s},{type:12,data:i},{type:12,data:r},{type:12,data:t},{type:12,data:a},{type:12,data:o},{type:12,data:u}],c=[s];l.push(...Ue(e.dims,c));let d=h=>{let f=re("indices_data",e.dataType,e.dims.length),m=Pe("input_slice_offsets_data",12,1,1),y=[f,m],_=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:r.length},{name:"sizes_from_slice_dims_data",type:"u32",length:t.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(_).declareVariables(...y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${r.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${t.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${r.length}_${t.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:d},{inputs:[e],outputs:[-1]})[0]},lb=(n,e)=>{let t=n.inputs,i=t[0].dims,r=t[0].dataType,s=t[1].dims,a=s[s.length-1],o=te.sizeToDimension(s,s.length-1),u=te.sizeFromDimension(i,e.batchDims+a),l=te.sizeToDimension(i,e.batchDims),c=te.sizeFromDimension(i,e.batchDims),d=o/l,h=new Array(a),f=u;for(let b=0;b<a;++b)h[a-1-b]=f,f*=i[e.batchDims+a-1-b];let m=Rg(n,t[1],h,e.batchDims,i,o,d,c,a),y=e.batchDims+a;if(y>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let _=s.slice(0,-1).concat(i.slice(y)),p=te.size(_),x=[{type:12,data:p},{type:12,data:u},...Ue(t[0].dims,m.dims,_)],w=b=>{let I=re("data",t[0].dataType,t[0].dims.length),R=re("slice_offsets",12,m.dims.length),T=Pe("output",t[0].dataType,_.length);return`
          ${b.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,R,T)}
            ${b.mainStart()}
            ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:_,dataType:r}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:x}),getShaderSource:w},{inputs:[t[0],m]})},ub=n=>({batchDims:n.batch_dims,cacheKey:""})}),Ig,$g,cb,db,J3=fe(()=>{Ge(),Ye(),Ft(),Ke(),Ig=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let t=te.normalizeAxis(e.quantizeAxis,n[0].dims.length),i=e.blockSize,r=n[0],s=n[2],a=n.length===4?n[3]:void 0;if(s.dims.length!==r.dims.length||!r.dims.map((o,u)=>u===t?Math.ceil(o/i)===s.dims[u]:o===s.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==r.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==s.dims.length||!a.dims.map((o,u)=>o===s.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},$g=(n,e)=>{let t=n[0].dims,i=n[1].dims,r=t.length,s=te.normalizeAxis(e.gatherAxis,r),a=te.normalizeAxis(e.quantizeAxis,r),o=t.slice(0);o.splice(s,1,...i);let u=te.size(o),l=n[2].dataType,c=n[0].dataType===22,d=[{type:12,data:u},{type:12,data:a},{type:12,data:s},{type:12,data:e.blockSize},...Ue(...n.map((f,m)=>f.dims),o)],h=f=>{let m=re("data",n[0].dataType,n[0].dims.length),y=re("inputIndices",n[1].dataType,n[1].dims.length),_=re("scales",n[2].dataType,n[2].dims.length),p=n.length>3?re("zeroPoint",n[3].dataType,n[3].dims.length):void 0,x=Pe("output",l,o.length),w=[m,y,_];p&&w.push(p);let b=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${f.registerUniforms(b).declareVariables(...w,x)}
        ${f.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${y.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${y.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${y.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${t[s]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${_.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${_.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${_.getByIndices("scale_indices")};
        ${p?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${p.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${p.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ln(l)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((f,m)=>m!==1).map(f=>f.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(f,m)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:h}},cb=(n,e)=>{let t=n.inputs;Ig(t,e),n.compute($g(n.inputs,e))},db=n=>vt({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})}),Pg,Dg,hb,fb,Q3=fe(()=>{Ge(),Ye(),Ft(),Ke(),Pg=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Dg=(n,e)=>{let t=n[0].dims,i=n[0].dataType,r=t.length,s=n[1].dims,a=n[1].dataType,o=te.normalizeAxis(e.axis,r),u=t[o],l=s.slice(0),c=te.size(l),d=re("input",i,r),h=re("indicesInput",a,s.length),f=Pe("output",i,l.length),m=[{type:12,data:c},{type:6,data:u},{type:12,data:o}];return m.push(...Ue(t,s,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(d,h,f)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${d.type.indices}(outputIndices);
      ${d.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${d.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},hb=n=>vt({axis:n.axis}),fb=(n,e)=>{let t=n.inputs;Pg(t),n.compute(Dg(n.inputs,e))}}),Lg,Ng,pb,mb,eR=fe(()=>{Ge(),Ye(),Ke(),Lg=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},Ng=(n,e)=>{let t=n[0].dims.slice(),i=n[1].dims.slice(),[r,s,a]=hv.getShapeOfGemmResult(t,e.transA,i,e.transB,n.length===3?n[2].dims:void 0),o=[r,s];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(s/u),c=Math.ceil(r/u),d=!0,h=te.size(o),f=[{type:12,data:d?l:h},{type:12,data:r},{type:12,data:s},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],m=["type","type"];n.length===3&&(f.push(...Ue(n[2].dims)),m.push("rank")),f.push(...Ue(o));let y=p=>{let x="";e.transA&&e.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let w=e.alpha===1?"":"value *= uniforms.alpha;",b=re("a",n[0].dataType,n[0].dims),I=re("b",n[1].dataType,n[1].dims),R=b.type.value,T=null,S=[b,I];n.length===3&&(T=re("c",n[2].dataType,n[2].dims.length),S.push(T));let C=Pe("output",n[0].dataType,o.length);S.push(C);let A=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms(A).declareVariables(...S)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${R}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${w}
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${R}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},_=p=>{let x=re("a",n[0].dataType,n[0].dims),w=re("b",n[1].dataType,n[1].dims),b=null,I=[x,w];n.length===3&&(b=re("c",n[2].dataType,n[2].dims.length),I.push(b));let R=Pe("output",n[0].dataType,o.length);I.push(R);let T=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],S="",C="";e.transA&&e.transB?(C=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(C=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(C=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(C=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let A=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${p.registerUniforms(T).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${w.type.storage}, ${u}>, ${u}>;
  ${p.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${R.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${C}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${S}
      }
      workgroupBarrier();
    }

    ${A}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${b!=null?`let cOffset = ${b.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${R.type.value}(uniforms.beta) * ${b.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return d?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:l*c},programUniforms:f}),getShaderSource:_}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:y}},pb=n=>{let e=n.transA,t=n.transB,i=n.alpha,r=n.beta;return{transA:e,transB:t,alpha:i,beta:r,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},mb=(n,e)=>{Lg(n.inputs),n.compute(Ng(n.inputs,e))}}),ei,gi,ir,rr,kg,Og,Ug,zg,Bg,Fg,Vg,Hg,gb,_b,tR=fe(()=>{Ge(),Ye(),Ft(),Ke(),[ei,gi,ir,rr]=[0,1,2,3],kg=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},Og=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Ug=n=>`
  fn gs_bicubic_interpolate(p: mat4x4<${n}>, x: f32, y: f32) -> ${n} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${n}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,zg=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Bg=n=>`
  ${n.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Fg=(n,e,t)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${ei}] = batch;
     indices[${gi}] = channel;`+(()=>{switch(t.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${ir}] = u32(r);
            indices[${rr}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${ir}] = u32(clamp(r, 0, H - 1));
          indices[${rr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${ir}] = gs_reflect(r, border[1], border[3]);
          indices[${rr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${t.paddingMode} is not supported`)}})()+`
    return ${n.getByIndices("indices")};
  }
`,Vg=(n,e,t)=>(()=>{switch(t.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ei}], indices[${gi}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ei}], indices[${gi}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ei}], indices[${gi}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ei}], indices[${gi}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ei}], indices[${gi}], border);

          let dx2 = ${e}(f32(x2) - x);
          let dx1 = ${e}(x - f32(x1));
          let dy2 = ${e}(f32(y2) - y);
          let dy1 = ${e}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${e}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ei}], indices[${gi}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${t.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,Hg=(n,e)=>{let t=re("x",n[0].dataType,n[0].dims.length),i=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],r=re("grid",n[1].dataType,i.length,2),s=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(s=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[ei,gi,ir,rr]=[0,3,1,2]);let a=Pe("output",n[0].dataType,s.length),o=t.type.value,u=te.size(s),l=[{type:12,data:u},...Ue(n[0].dims,i,s)],c=d=>`
  ${d.registerUniform("output_size","u32").declareVariables(t,r,a)}
  ${Og}
  ${Ug(o)}
  ${zg(e)}
  ${Bg(e)}
  ${Fg(t,o,e)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${ir}]);
      let W_in = i32(uniforms.x_shape[${rr}]);

      ${e.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${ei}], indices[${ir}], indices[${rr}]);
      let nxy = ${r.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Vg(a,o,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:d=>{let h=te.size(s);return{outputs:[{dims:s,dataType:d[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}},getShaderSource:c}},gb=(n,e)=>{kg(n.inputs),n.compute(Hg(n.inputs,e))},_b=n=>vt({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})}),dn,Gg,yb,Tu,Wg,ia,vb,xb=fe(()=>{Ge(),Ye(),Ft(),Od(),Bd(),Ke(),Gi(),dn=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,Gg=(n,e)=>{let t=n[0],i=dn(n,1),r=dn(n,2),s=dn(n,3),a=dn(n,4),o=dn(n,5),u=dn(n,6),l=dn(n,7);if(t.dims.length!==3&&t.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=t.dims[0],d=t.dims[1],h=t.dims.length===3?t.dims[2]:e.numHeads*t.dims[4],f=d,m=0,y=0,_=Math.floor(h/e.numHeads);if(u&&l&&te.size(u.dims)&&te.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==_)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==_)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],y=u.dims[2]}else if(u&&te.size(u.dims)||l&&te.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let p;if(i&&te.size(i.dims)>0){if(t.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(t.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==t.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');p=2,f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==e.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(r)throw new Error('Expect "value" be none when "key" has packed kv format.');p=5,f=i.dims[1]}else{if(i.dims[1]!==e.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=0,f=i.dims[2]}}else{if(t.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(t.dims[2]!==e.numHeads||t.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');p=3}if(s&&te.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=m+f,w=0;if(a&&te.size(a.dims)>0){w=8;let T=a.dims;throw T.length===1?T[0]===c?w=1:T[0]===3*c+2&&(w=3):T.length===2&&T[0]===c&&T[1]===x&&(w=5),w===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let b=!1,I=h;if(r&&te.size(r.dims)>0){if(r.dims.length!==3&&r.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(t.dims[0]!==r.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(r.dims.length===3){if(f!==r.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=r.dims[2]}else{if(f!==r.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=r.dims[1]*r.dims[3],b=!0}}let R=!1;if(a&&te.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(o&&te.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==e.numHeads||o.dims[2]!==d||o.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:x,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:h,vHiddenSize:I,headSize:_,vHeadSize:Math.floor(I/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:w,scale:e.scale,broadcastResPosBias:R,passPastInKv:b,qkvFormat:p}},yb=n=>vt({...n}),Tu=vt({perm:[0,2,1,3]}),Wg=(n,e,t,i,r,s,a)=>{let o=[i,r,s],u=te.size(o),l=[{type:12,data:u},{type:12,data:a},{type:12,data:s}],c=d=>{let h=Pe("qkv_with_bias",e.dataType,o),f=re("qkv",e.dataType,o),m=re("bias",t.dataType,o),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${d.registerUniforms(y).declareVariables(f,m,h)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,t],outputs:[-1]})[0]},ia=(n,e,t,i,r,s,a,o)=>{let u=s;if(a&&te.size(a.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=Wg(n,s,a,e,i,t*r,o),u=u.reshape([e,i,t,r]),t===1||i===1?u:n.compute(Tn(u,Tu.perm),{inputs:[u],outputs:[-1]})[0]}else return s.dims.length===3&&(u=s.reshape([e,i,t,r])),t===1||i===1?u:n.compute(Tn(u,Tu.perm),{inputs:[u],outputs:[-1]})[0]},vb=(n,e)=>{let t=Gg(n.inputs,e),i=n.inputs[0],r=dn(n.inputs,1),s=dn(n.inputs,2),a=dn(n.inputs,3),o=dn(n.inputs,4),u=dn(n.inputs,5),l=dn(n.inputs,6),c=dn(n.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(r?.dims.length===5)throw new Error("Packed KV is not implemented");let d=r&&s&&r.dims.length===4&&s.dims.length===4,h=ia(n,t.batchSize,t.numHeads,t.sequenceLength,t.headSize,i,a,0);if(d)return da(n,h,r,s,o,void 0,l,c,u,t);if(!r||!s)throw new Error("key and value must be provided");let f=ia(n,t.batchSize,t.numHeads,t.kvSequenceLength,t.headSize,r,a,t.hiddenSize),m=ia(n,t.batchSize,t.numHeads,t.kvSequenceLength,t.vHeadSize,s,a,2*t.hiddenSize);da(n,h,f,m,o,void 0,l,c,u,t)}}),qg,jg,Xg,Yg,Jc,bb,wb,Sb=fe(()=>{Ge(),Ye(),Ft(),Ke(),qg=n=>{if(!n||n.length<1)throw new Error("too few inputs")},jg=(n,e)=>{let t=[],i=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(r=>t.push(Number(r))),i=t.length),vt({numOutputs:i,axis:e.axis,splitSizes:t})},Xg=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${ke("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,Yg=n=>{let e=n.length,t=[];for(let i=0;i<e;++i){let r=n[i].setByIndices("indices","input[global_idx]");e===1?t.push(r):i===0?t.push(`if (output_number == ${i}u) { ${r} }`):i===e-1?t.push(`else { ${r} }`):t.push(`else if (output_number == ${i}) { ${r} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${t.join(`
`)}
      }`},Jc=(n,e)=>{let t=n[0].dims,i=te.size(t),r=n[0].dataType,s=te.normalizeAxis(e.axis,t.length),a=new Array(e.numOutputs),o=re("input",r,t.length),u=new Array(e.numOutputs),l=[],c=[],d=0,h=[{type:12,data:i}];for(let m=0;m<e.numOutputs;m++){d+=e.splitSizes[m],u[m]=d;let y=t.slice();y[s]=e.splitSizes[m],c.push(y),a[m]=Pe(`output${m}`,r,y.length),l.push({dims:c[m],dataType:n[0].dataType})}h.push({type:12,data:u},...Ue(t,...c));let f=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...a)}
  ${Xg(u.length)}
  ${Yg(a)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ke("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},bb=(n,e)=>{qg(n.inputs);let t=n.inputs.length===1?e:jg(n.inputs,e);n.compute(Jc(n.inputs,t),{inputs:[0]})},wb=n=>{let e=n.axis,t=n.splitSizes,i=n.numOutputs<0?t.length:n.numOutputs;if(i!==t.length)throw new Error("numOutputs and splitSizes length must be equal");return vt({axis:e,numOutputs:i,splitSizes:t})}}),Kg,Uo,Mb,Eb=fe(()=>{Ge(),Ye(),Ft(),Ke(),Kg=(n,e)=>{let[t,i,r,s]=n,{numHeads:a,rotaryEmbeddingDim:o}=e;if(t.dims.length!==3&&t.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${t.dims.length}`);if(!te.areEqual(i.dims,[])&&!te.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(r.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${r.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!te.areEqual(r.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=t.dims[0],l=t.dims[t.dims.length-2],c=r.dims[0],d=te.sizeFromDimension(t.dims,1)/l,h=o===0?r.dims[1]*2:d/a;if(o>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(u!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(l!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(h/2!==r.dims[1]&&o/2!==r.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${r.dims[1]}`)},Uo=(n,e)=>{let{interleaved:t,numHeads:i,rotaryEmbeddingDim:r,scale:s}=e,a=n[0].dims[0],o=te.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],l=o/u,c=n[2].dims[1],d=r===0?c*2:l/i,h=new Array(a,u,l/d,d-c),f=te.computeStrides(h),m=[{type:1,data:s},{type:12,data:h},{type:12,data:f},...n[0].dims.length===3?new Array({type:12,data:[o,l,d,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[o,d,u*d,1]}):[],...Ue(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],y=_=>{let p=re("input",n[0].dataType,n[0].dims.length),x=re("position_ids",n[1].dataType,n[1].dims.length),w=re("cos_cache",n[2].dataType,n[2].dims.length),b=re("sin_cache",n[3].dataType,n[3].dims.length),I=Pe("output",n[0].dataType,n[0].dims.length);return _.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${_.declareVariables(p,x,w,b,I)}

        ${_.mainStart(_s)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${x.broadcastedIndicesToOffset("bsnh.xy",Pe("",x.type.tensor,2))};
            let position_id =
                u32(${x.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${t});
            let j = i + select(half_rotary_emb_dim, 1, ${t});
            let re = ${p.getByOffset("i")} * ${w.get("position_id","bsnh[3]")} -
                ${p.getByOffset("j")} * ${b.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${p.getByOffset("i")} * ${b.get("position_id","bsnh[3]")} +
                ${p.getByOffset("j")} * ${w.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",p.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:vt({interleaved:t}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(te.size(h)/_s)},programUniforms:m})}},Mb=(n,e)=>{Kg(n.inputs,e),n.compute(Uo(n.inputs,e))}}),Zg,Jg,Au,Qg,Tb,nR=fe(()=>{Ft(),Ge(),Bd(),xb(),Sb(),Gi(),Eb(),Ke(),Zg=(n,e)=>{if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let t=n[0],i=n[1],r=n[2],s=n[3],a=n[4];if(e.doRotary!==0&&n.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(t.dims.length!==3&&t.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,u=t.dims[0],l=t.dims[1],c=t.dims.length===3?o?t.dims[2]/3:t.dims[2]:e.numHeads*t.dims[4],d=l,h=0,f=!i||i.dims.length===0,m=Math.floor(f?c/(e.numHeads+2*e.kvNumHeads):c/e.numHeads);f&&(c=m*e.numHeads);let y=s&&s.dims.length!==0,_=a&&a.dims.length!==0;if(y&&s.dims.length===4&&s.dims[0]===u&&s.dims[1]!==e.kvNumHeads&&s.dims[2]===e.kvNumHeads&&s.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(y&&_){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=s.dims[2]}else if(y||_)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let p=1;if(i&&i.dims.length>0){if(t.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(t.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(t.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');d=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==e.numHeads||i.dims[3]!==2||i.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(r)throw new Error('Expect "value" be none when "key" has packed kv format.');d=i.dims[1]}else{if(i.dims[1]!==e.numHeads||i.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=i.dims[2]}}else{if(t.dims.length!==3&&t.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(t.dims.length===5&&(t.dims[2]!==e.numHeads||t.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');p=3}let x=0,w=!1,b=e.kvNumHeads?m*e.kvNumHeads:c;if(r&&r.dims.length>0){if(r.dims.length!==3&&r.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(t.dims[0]!==r.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(r.dims.length===3){if(d!==r.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');b=r.dims[2]}else{if(d!==r.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');b=r.dims[1]*r.dims[3],w=!0}}let I=n.length>4?n[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let R=I.dims.reduce((T,S)=>T*S,1);if(R!==u)throw new Error(`seqlens_k must have batch_size (${u}) elements, got ${R}.`);for(let T=0;T<I.dims.length;T++)if(I.dims[T]!==1&&I.dims[T]!==u)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${u}), got dims[${T}] = ${I.dims[T]}.`)}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:b,headSize:m,vHeadSize:Math.floor(b/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:w,qkvFormat:p}},Jg=vt({perm:[0,2,1,3]}),Au=(n,e,t)=>{let i=e,r=t.kvNumHeads;return e.dims.length===3&&t.kvSequenceLength!==0&&(i=e.reshape([t.batchSize,t.kvSequenceLength,r,t.headSize]),i=n.compute(Tn(i,Jg.perm),{inputs:[i],outputs:[-1]})[0]),i},Qg=(n,e,t,i)=>{let r=7,s=["type","type"],a=[n*e],o=n*e,u=[{type:12,data:o},{type:12,data:e},{type:12,data:n}],l=c=>{let d=re("seq_lens",t.dataType,t.dims),h=re("total_seq_lens",i.dataType,i.dims),f=Pe("pos_ids",r,a),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(m).declareVariables(d,h,f)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${d.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${f.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${n};${e}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:l}},Tb=(n,e)=>{let t=Zg(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=n.inputs[0],r=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,s=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,o=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,l=n.inputs.length>5?n.inputs[6]:void 0,c=t.kvNumHeads?t.kvNumHeads:t.numHeads,d=vt({axis:2,numOutputs:3,splitSizes:[t.numHeads*t.headSize,c*t.headSize,c*t.headSize]}),[h,f,m]=!r&&!s?n.compute(Jc([i],d),{inputs:[i],outputs:[-1,-1,-1]}):[i,r,s],y,_;if(e.doRotary){let b=n.compute(Qg(t.batchSize,t.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],I=n.inputs[7],R=n.inputs[8],T=vt({interleaved:e.rotaryInterleaved!==0,numHeads:t.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),S=[h,b,I,R],C=[-1];y=n.compute(Uo(S,T),{inputs:S,outputs:C})[0],S.splice(0,1,f);let A=vt({interleaved:e.rotaryInterleaved!==0,numHeads:t.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});_=n.compute(Uo(S,A),{inputs:S,outputs:C})[0]}let p=ia(n,t.batchSize,t.numHeads,t.sequenceLength,t.headSize,e.doRotary?y:h,void 0,0),x=Au(n,e.doRotary?_:f,t),w=Au(n,m,t);da(n,p,x,w,void 0,void 0,a,o,void 0,t,u,l)}}),Cu,e_,t_,Ab,iR=fe(()=>{Ge(),Ye(),Gi(),Ke(),Cu=(n,e,t,i,r,s,a,o)=>{let u=Bt(s),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,d=r*a,h=64;d===1&&(h=256);let f=[r,a,s/u],m=[r,a,2],y=["rank","type","type"],_=[];_.push(...Ue(f,m));let p=x=>{let w=re("x",e.dataType,3,u),b=re("scale",t.dataType,t.dims),I=re("bias",i.dataType,i.dims),R=Pe("output",1,3,2),T=[w,b,I,R];return`
  var<workgroup> workgroup_shared : array<${c}, ${h}>;
  const workgroup_size = ${h}u;
  ${x.declareVariables(...T)}
  ${x.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${w.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Hi("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Hi("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:d},programUniforms:_}),getShaderSource:p},{inputs:[e,t,i],outputs:[-1]})[0]},e_=(n,e,t)=>{let i=e[0].dims,r=i,s=2,a=i[0],o=i[1],u=te.sizeFromDimension(i,s),l=Bt(u),c=te.size(r)/l,d=Cu(n,e[0],e[1],e[2],a,u,o,t.epsilon),h=[a,o,u/l],f=[a,o],m=["type","none"],y=_=>{let p=re("x",e[0].dataType,h.length,l),x=re("scale_shift",1,f.length,2),w=Pe("output",e[0].dataType,h.length,l),b=[p,x,w];return`
  ${_.registerUniform("output_size","u32").declareVariables(...b)}
  ${_.mainStart()}
  ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${w.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${p.getByOffset("global_idx")} * ${w.type.value}(scale_shift.x) + ${w.type.value}(scale_shift.y);
      ${w.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...Ue(h,f,h)]}),getShaderSource:y},{inputs:[e[0],d]})},t_=(n,e,t)=>{let i=e[0].dims,r=i,s=i[0],a=i[i.length-1],o=te.sizeFromDimension(i,1)/a,u=Bt(a),l=te.size(r)/u,c=[{type:12,data:o},{type:12,data:Math.floor(a/u)}],d=["type","type"],h=!1,f=[0,i.length-1];for(let p=0;p<i.length-2;p++)h=h||i[p+1]!==1,f.push(p+1);h=h&&i[i.length-1]!==1;let m=h?n.compute(Tn(n.inputs[0],f),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:i.length},(p,x)=>i[f[x]])),y=Cu(n,m,e[1],e[2],s,o,a,t.epsilon),_=p=>{let x=jt(e[0].dataType),w=u===1?"vec2f":`mat${u}x2f`,b=T=>{let S=T===0?"x":"y",C=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${x}(${C}(scale.${S}))`;case 2:return`vec2<${x}>(${C}(scale[0].${S}, scale[1].${S}))`;case 4:return`vec4<${x}>(${C}(scale[0].${S}, scale[1].${S}, scale[2].${S}, scale[3].${S}))`;default:throw new Error(`Not supported compoents ${u}`)}},I=re("input",e[0].dataType,e[0].dims,u),R=Pe("output",e[0].dataType,r,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${w}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${R.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${p.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${b(0)}, ${b(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:_},{inputs:[e[0],y]})},Ab=(n,e)=>{e.format==="NHWC"?t_(n,n.inputs,e):e_(n,n.inputs,e)}}),n_,i_,Cb,rR=fe(()=>{Ge(),Ye(),Ke(),n_=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},i_=(n,e,t)=>{let i=e.simplified,r=n[0].dims,s=n[1],a=!i&&n[2],o=r,u=te.normalizeAxis(e.axis,r.length),l=te.sizeToDimension(r,u),c=te.sizeFromDimension(r,u),d=te.size(s.dims),h=a?te.size(a.dims):0;if(d!==c||a&&h!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${h}`);let f=[];for(let I=0;I<r.length;++I)I<u?f.push(r[I]):f.push(1);let m=Bt(c),y=["type","type"],_=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/m)},{type:1,data:e.epsilon}];a&&y.push("type");let p=t>1,x=t>2,w=I=>{let R=jt(n[0].dataType),T=[re("x",n[0].dataType,n[0].dims,m),re("scale",s.dataType,s.dims,m)];a&&T.push(re("bias",a.dataType,a.dims,m)),T.push(Pe("output",n[0].dataType,o,m)),p&&T.push(Pe("mean_data_output",1,f)),x&&T.push(Pe("inv_std_output",1,f));let S=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(S).declareVariables(...T)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Hc("f32",m)};
    var mean_square_vector = ${Hc("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${is(R,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Hi("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Hi("mean_square_vector",m)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${is(R,m,"x[j + offset]")};
      let f32scale = ${is(R,m,"scale[j]")};
      output[j + offset] = ${T[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${is(R,m,"bias[j]")}`:""}
      );
    }

    ${p?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},b=[{dims:o,dataType:n[0].dataType}];return p&&b.push({dims:f,dataType:1}),x&&b.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${t};${i}`,inputDependencies:y},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:_}),getShaderSource:w}},Cb=(n,e)=>{n_(n.inputs),n.compute(i_(n.inputs,e,n.outputCount))}}),r_,Rb,sR=fe(()=>{Ye(),Wd(),qd(),r_=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},Rb=n=>{r_(n.inputs);let e=gs.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let t=e[e.length-1],i=n.inputs[0].dims[n.inputs[0].dims.length-1];if(t<8&&i<8)n.compute(Gd(n.inputs,{activation:""},e));else{let r=e[e.length-2],s=te.size(n.inputs[0].dims.slice(0,-2)),a=te.size(n.inputs[1].dims.slice(0,-2));if(s!==1&&r===1&&a===1){let o=n.inputs[0].reshape([1,s,i]),u=n.inputs[1].reshape([1,i,t]),l=[1,s,t],c=[o,u];n.compute(Oo(c,{activation:""},e,l),{inputs:c})}else n.compute(Oo(n.inputs,{activation:""},e))}}}),s_,a_,o_,Ib,$b,aR=fe(()=>{Ge(),Ye(),Ft(),Ke(),s_=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let t=n[0],i=t.dims.length;if(t.dims[i-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let r=Math.floor((e.k+e.blockSize-1)/e.blockSize),s=e.blockSize/8*e.bits,a=n[1];if(!te.areEqual(a.dims,[e.n,r,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=n[2].dims;if(te.size(o)!==e.n*r)throw new Error("scales input size error.");if(n.length===4){let u=n[3].dims,l=e.n*(e.bits===8?r:Math.floor((r*e.bits+7)/8));if(te.size(u)!==l)throw new Error("zeroPoints input size error.")}},a_=(n,e)=>{let t=n[0].dims,i=t.length,r=t[i-2],s=e.k,a=e.n,o=t.slice(0,i-2),u=te.size(o),l=n[1].dims[2]/4,c=n[0].dataType,d=Bt(e.k),h=Bt(l),f=Bt(a),m=o.concat([r,a]),y=r>1&&a/f%2===0?2:1,_=te.size(m)/f/y,p=64,x=[],w=[u,r,s/d],b=te.convertShape(n[1].dims).slice();b.splice(-1,1,l/h),x.push(...Ue(w)),x.push(...Ue(b)),x.push(...Ue(n[2].dims)),n.length===4&&x.push(...Ue(te.convertShape(n[3].dims)));let I=[u,r,a/f];x.push(...Ue(I));let R=T=>{let S=w.length,C=re("a",n[0].dataType,S,d),A=re("b",12,b.length,h),L=re("scales",n[2].dataType,n[2].dims.length),F=[C,A,L],B=n.length===4?re("zero_points",12,n[3].dims.length):void 0;B&&F.push(B);let N=I.length,U=Pe("output",n[0].dataType,N,f),z=jt(n[0].dataType),K=(()=>{switch(d){case 1:return`array<${z}, 8>`;case 2:return`mat4x2<${z}>`;case 4:return`mat2x4<${z}>`;default:throw new Error(`${d}-component is not supported.`)}})(),W=Math.floor(32/e.bits),ie=Math.floor(W/8),oe=()=>{let me="";for(let G=0;G<ie;G++){let ue=G*e.bits*4,xe=ue+e.bits;me+=`
          // reuse a data (pass ${G})
            var input_offset${G>0?G:""} = ${G===0?C.indicesToOffset(`${C.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${G>0?G:""}: ${K};
            for (var j${G>0?G:""}: u32 = 0; j${G>0?G:""} < ${8/d}; j${G>0?G:""}++) {
              a_data${G>0?G:""}[j${G>0?G:""}] = ${C.getByOffset(`input_offset${G>0?G:""}`)};
              input_offset${G>0?G:""}++;
            }
          `;for(let pe=0;pe<f*y;pe++)me+=`
            b_value = ${h===1?`b${pe}_data`:`b${pe}_data[i]`};
            ${e.bits===2?`{
              let half_word = b_value >> ${G*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${ue}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${xe}u) & b_mask);`}
            b_quantized_values = ${K}(${Array.from({length:4},(Le,we)=>`${z}(b_value_lower[${we}]), ${z}(b_value_upper[${we}])`).join(", ")});
            b_dequantized_values = ${d===1?`${K}(${Array.from({length:8},(Le,we)=>`(b_quantized_values[${we}] - ${B?`zero_point${pe}`:"zero_point"}) * scale${pe}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${B?`zero_point${pe}`:"zero_point"}`).join(",")})) * scale${pe};`};
            workgroup_shared[local_id.x * ${y} + ${Math.floor(pe/f)}]${f>1?`[${pe%f}]`:""} += ${Array.from({length:8/d},(Le,we)=>`${d===1?`a_data${G>0?G:""}[${we}] * b_dequantized_values[${we}]`:`dot(a_data${G>0?G:""}[${we}], b_dequantized_values[${we}])`}`).join(" + ")};
          `}return me},Z=()=>{let me=`
            var col_index = col * ${f};
            ${B?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${z}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            `;for(let G=0;G<f*y;G++)me+=`
            let scale${G} = ${L.getByOffset("col_index * nBlocksPerCol + block")};
            ${B?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            zero_point_word = ${B.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${G} = ${z}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return me},he=()=>{let me=`col_index = col * ${f};`;for(let G=0;G<f*y;G++)me+=`
            let b${G}_data = ${A.getByIndices(`${A.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return me+=`
            var b_value: u32;
            let b_mask: u32 = ${e.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,me};return`
        var<workgroup> workgroup_shared: array<${U.type.value}, ${y*p}>;
        ${T.declareVariables(...F,U)}
        ${T.mainStart([p,1,1])}
          let output_indices = ${U.offsetToIndices(`(global_idx / ${p}) * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${p}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/d};
            ${Z()}
            for (var word: u32 = 0; word < ${l}; word += ${h}) {
              ${he()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${oe()}
                word_offset += ${W/d};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${y}) {
            var output_value: ${U.type.value} = ${U.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${p}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${y};
            }
            ${U.setByIndices(`${U.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${d};${h};${f};${y};${p}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x:_},programUniforms:x}),getShaderSource:R}},o_=(n,e)=>{let t=n[0].dims,i=t.length,r=t[i-2],s=e.k,a=e.n,o=t.slice(0,i-2),u=te.size(o),l=n[1].dims[2]/4,c=n[0].dataType,d=Bt(e.k),h=Bt(l),f=o.concat([r,a]),m=128,y=a%8===0?8:a%4===0?4:1,_=m/y,p=Math.floor(32/e.bits),x=_*h*p,w=x/d,b=x/e.blockSize,I=te.size(f)/y,R=[],T=[u,r,s/d],S=te.convertShape(n[1].dims).slice();S.splice(-1,1,l/h),R.push(...Ue(T)),R.push(...Ue(S)),R.push(...Ue(n[2].dims)),n.length===4&&R.push(...Ue(te.convertShape(n[3].dims)));let C=[u,r,a];R.push(...Ue(C));let A=L=>{let F=T.length,B=re("a",n[0].dataType,F,d),N=re("b",12,S.length,h),U=re("scales",n[2].dataType,n[2].dims.length),z=[B,N,U],K=n.length===4?re("zero_points",12,n[3].dims.length):void 0;K&&z.push(K);let W=C.length,ie=Pe("output",n[0].dataType,W),oe=jt(n[0].dataType),Z=()=>{switch(d){case 1:return`
          let a_data0 = vec4<${oe}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${oe}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${oe}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${oe}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${d}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${B.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${ie.type.value}, ${_}>, ${y}>;
        ${L.declareVariables(...z,ie)}
        ${L.mainStart([_,y,1])}
          let output_indices = ${ie.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${b} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${B.getByIndices(`${B.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${B.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${b} + local_id.x;
            ${K?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            let zero_point_word = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${oe}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${oe}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            let scale = ${U.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${N.getByIndices(`${N.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/d};
            for (var i: u32 = 0; i < ${h}; i++) {
              let b_value = ${h===1?"b_data":"b_data[i]"};
              ${(()=>{let he=Math.floor(p/8),me="";for(let G=0;G<he;G++){let ue=G*e.bits*4,xe=ue+e.bits;me+=`
              ${Z()}
              {${e.bits===2?`
                let half_word = b_value >> ${G*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${ue}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${xe}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${oe}>(${Array.from({length:4},(pe,Le)=>`${oe}(b_value_lower[${Le}]), ${oe}(b_value_upper[${Le}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${oe}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(pe,Le)=>`${`dot(a_data${Le}, b_dequantized_values[${Le}])`}`).join(" + ")};
              }
              word_offset += ${8/d};`}return me})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${ie.type.value} = ${ie.type.value}(0);
            for (var b = 0u; b < ${_}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ie.setByIndices(`${ie.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${d};${h};${_};${y}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:c}],dispatchGroup:{x:I},programUniforms:R}),getShaderSource:A}},Ib=(n,e)=>{s_(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(o_(n.inputs,e)):n.compute(a_(n.inputs,e))},$b=n=>vt(n)}),l_,u_,c_,d_,h_,f_,p_,m_,Pb,oR=fe(()=>{Ge(),Ye(),Ke(),l_=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},u_=(n,e,t)=>{let i="";for(let r=e-1;r>=0;--r)i+=`
            k = i32(${n.indicesGet("indices",r)}) - ${ke("uniforms.pads",r,t)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ke("uniforms.x_shape",r,e)})) {
              break;
            }
            offset += k * i32(${ke("uniforms.x_strides",r,e)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},c_=(n,e,t)=>{let i="";for(let r=e-1;r>=0;--r)i+=`
                k = i32(${n.indicesGet("indices",r)}) - ${ke("uniforms.pads",r,t)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ke("uniforms.x_shape",r,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ke("uniforms.x_shape",r,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ke("uniforms.x_strides",r,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},d_=(n,e,t)=>{let i="";for(let r=e-1;r>=0;--r)i+=`
                k = i32(${n.indicesGet("indices",r)}) - ${ke("uniforms.pads",r,t)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ke("uniforms.x_shape",r,e)})) {
                  k = i32(${ke("uniforms.x_shape",r,e)}) - 1;
                }
                offset += k * i32(${ke("uniforms.x_strides",r,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},h_=(n,e,t)=>{let i="";for(let r=e-1;r>=0;--r)i+=`
                k = i32(${n.indicesGet("indices",r)}) - ${ke("uniforms.pads",r,t)};
                if (k < 0)  {
                  k += i32(${ke("uniforms.x_shape",r,e)}]);
                }
                if (k >= i32(${ke("uniforms.x_shape",r,e)})) {
                  k -= i32(${ke("uniforms.x_shape",r,e)});
                }
                offset += k * i32(${ke("uniforms.x_strides",r,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},f_=(n,e,t)=>{switch(t.mode){case 0:return u_(n,e,t.pads.length);case 1:return c_(n,e,t.pads.length);case 2:return d_(n,e,t.pads.length);case 3:return h_(n,e,t.pads.length);default:throw new Error("Invalid mode")}},p_=(n,e)=>{let t=te.padShape(n[0].dims.slice(),e.pads),i=n[0].dims,r=te.size(t),s=[{type:12,data:r},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&s.push({type:a?n[2].dataType:1,data:e.value}),s.push(...Ue(n[0].dims,t));let o=["rank"],u=l=>{let c=Pe("output",n[0].dataType,t.length),d=re("x",n[0].dataType,i.length),h=d.type.value,f=f_(c,i.length,e),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&m.push({name:"constant_value",type:a?h:"f32"}),`
            ${l.registerUniforms(m).declareVariables(d,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(te.size(t)/64)},programUniforms:s}),getShaderSource:u}},m_=(n,e)=>{if(n.length>1){let t=n[1].getBigInt64Array(),i=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,r=n[0].dims.length,s=new Int32Array(2*r).fill(0);if(n.length>=4){let o=n[3].getBigInt64Array();for(let u=0;u<o.length;u++)s[Number(o[u])]=Number(t[u]),s[Number(o[u])+r]=Number(t[u+o.length])}else t.forEach((o,u)=>s[Number(u)]=Number(o));let a=[];return s.forEach(o=>a.push(o)),{mode:e.mode,value:i,pads:a}}else return e},Pb=(n,e)=>{l_(n.inputs);let t=m_(n.inputs,e);n.compute(p_(n.inputs,t),{inputs:[0]})}}),js,Ru,Iu,$u,Pu,g_,__,Du,Lu,Db,Lb,Nu,Nb,kb,ku,Ob,Ub,zb,Bb,lR=fe(()=>{Nn(),Ge(),Ye(),Ke(),js=n=>{if(Nt.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},Ru=(n,e,t)=>{let i=e.format==="NHWC",r=n.dims.slice();i&&r.splice(1,0,r.pop());let s=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),o=e.strides.slice(),u=s?e.dilations.slice():[],l=e.pads.slice();No.adjustPoolAttributes(t,r,a,o,u,l);let c=No.computePoolOutputShape(t,r,o,u,a,l,e.autoPad),d=Object.assign({},e);s?Object.assign(d,{kernelShape:a,strides:o,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(d,{kernelShape:a,strides:o,pads:l,cacheKey:e.cacheKey});let h=c.slice();return h.push(h.splice(1,1)[0]),[d,i?h:c]},Iu=(n,e)=>{let t=e.format==="NHWC",i=te.size(n),r=te.size(e.kernelShape),s=[{type:12,data:i},{type:12,data:r}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let o=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],d=!!(l+c);s.push({type:12,data:o},{type:12,data:u},{type:12,data:l},{type:12,data:c}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(e.kernelShape.length===2){let f=e.kernelShape[e.kernelShape.length-2],m=e.strides[e.strides.length-2],y=e.pads[e.pads.length/2-2],_=e.pads[e.pads.length-2];h=!!(y+_),s.push({type:12,data:f},{type:12,data:m},{type:12,data:y},{type:12,data:_}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,a,!0,d,h]}else{if(t)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=te.computeStrides(e.kernelShape);s.push({type:12,data:o},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[s,a,!!u,!1,!1]}},$u=(n,e,t,i,r,s,a,o,u,l,c,d)=>{let h=r.format==="NHWC",f=e.type.value,m=Pe("output",e.type.tensor,i);if(r.kernelShape.length<=2){let y="",_="",p="",x=t-(h?2:1);if(c?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${x}] < 0 || xIndices[${x}]
                      >= uniforms.x_shape[${x}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${s}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${s}
                }`,r.kernelShape.length===2){let w=t-(h?3:2);d?_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${w}] < 0 || xIndices[${w}] >= uniforms.x_shape[${w}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sh - uniforms.phStart + j;
                `,p=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,m)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${o});
              var pad = 0;
              ${_}
              ${y}
              ${p}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=r.kernelShape.length,_=r.pads.length,p="";return l?p=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${s}
              }`:p=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${n.registerUniforms(u).declareVariables(e,m)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${f}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y-1}u; j++) {
                  offsets[j] = offset / ${ke("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${ke("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${t-y}u; j < ${t}u; j++) {
                  xIndices[j] = indices[j] * ${ke("uniforms.strides",`j - ${t-y}u`,y)}
                    + offsets[j - ${t-y}u] - ${ke("uniforms.pads","j - 2u",_)};
                  ${p}
              }
              ${a}

              output[global_idx] = value;
            }`}},Pu=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,g_=n=>`${Pu(n)};${n.countIncludePad}`,__=n=>`${Pu(n)};${n.storageOrder};${n.dilations}`,Du=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),Lu=(n,e,t,i)=>{let[r,s]=Ru(e,i,t),a=re("x",e.dataType,e.dims.length),o=a.type.value,u="value += x_val;",l="";r.countIncludePad?l+=`value /= ${o}(uniforms.kernelSize);`:l+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,d,h,f,m]=Iu(s,r);c.push(...Ue(e.dims,s));let y=["rank"];return{name:n,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(te.size(s)/64)},programUniforms:c}),getShaderSource:_=>$u(_,a,e.dims.length,s.length,r,u,l,0,d,h,f,m)}},Db=n=>{let e=n.count_include_pad!==0,t=Du(n);if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:e,...t,cacheKey:""};return{...i,cacheKey:g_(i)}},Lb=(n,e)=>{js(n.inputs),n.compute(Lu("AveragePool",n.inputs[0],!1,e))},Nu={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Nb=n=>{let e=n.format;return{format:e,...Nu,cacheKey:e}},kb=(n,e)=>{js(n.inputs),n.compute(Lu("GlobalAveragePool",n.inputs[0],!0,e))},ku=(n,e,t,i)=>{let[r,s]=Ru(e,i,t),a=`
      value = max(x_val, value);
    `,o="",u=re("x",e.dataType,e.dims.length),l=["rank"],[c,d,h,f,m]=Iu(s,r);return c.push(...Ue(e.dims,s)),{name:n,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(te.size(s)/64)},programUniforms:c}),getShaderSource:y=>$u(y,u,e.dims.length,s.length,r,a,o,e.dataType===10?-65504:-1e5,d,h,f,m)}},Ob=(n,e)=>{js(n.inputs),n.compute(ku("MaxPool",n.inputs[0],!1,e))},Ub=n=>{let e=n.storage_order,t=n.dilations,i=Du(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let r={storageOrder:e,dilations:t,...i,cacheKey:""};return{...r,cacheKey:__(r)}},zb=n=>{let e=n.format;return{format:e,...Nu,cacheKey:e}},Bb=(n,e)=>{js(n.inputs),n.compute(ku("GlobalMaxPool",n.inputs[0],!0,e))}}),y_,v_,Fb,Vb,uR=fe(()=>{Ge(),Ye(),Ft(),Ke(),y_=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((t,i)=>t===n[2].dims[i]).reduce((t,i)=>t&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((r,s)=>s===e.axis||r===n[0].dims[s]).reduce((r,s)=>r&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let t=n[0].dims[e.axis],i=n[1].dims[e.axis];if(e.blockSize<Math.ceil(t/i)||e.blockSize>Math.ceil(t/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},v_=(n,e)=>{let t=te.normalizeAxis(e.axis,n[0].dims.length),i=n[0].dataType,r=i===3,s=n[0].dims,a=n[1].dataType,o=te.size(s),u=i===3||i===2,l=u?[Math.ceil(te.size(n[0].dims)/4)]:n[0].dims,c=n[1].dims,d=n.length>2?n[2]:void 0,h=d?u?[Math.ceil(te.size(d.dims)/4)]:d.dims:void 0,f=c.length===0||c.length===1&&c[0]===1,m=f===!1&&c.length===1,y=Bt(o),_=f&&(!u||y===4),p=_?y:1,x=_&&!u?y:1,w=re("input",u?12:i,l.length,x),b=re("scale",a,c.length),I=d?re("zero_point",u?12:i,h.length):void 0,R=Pe("output",a,s.length,p),T=[w,b];I&&T.push(I);let S=[l,c];d&&S.push(h);let C=[{type:12,data:o/p},{type:12,data:t},{type:12,data:e.blockSize},...Ue(...S,s)],A=L=>{let F=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${L.registerUniforms(F).declareVariables(...T,R)}
      ${L.mainStart()}
          ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${R.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${w.getByOffset("global_idx / 4")};
            let x_vec = ${r?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${p===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${w.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${b.getByOffset("0")}`:m?`
            let scale_index = ${R.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${b.getByOffset("scale_index")};`:`
            var scale_indices: ${b.type.indices} = output_indices;
            let index = ${b.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${b.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${b.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?f?u?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${r?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:m?u?`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${r?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${b.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${r?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${u?r?"i32":"u32":w.type.value}(0);`};
      // Compute and write output
      ${R.setByOffset("global_idx",`${R.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:A,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/p/64),y:1,z:1},programUniforms:C})}},Fb=(n,e)=>{y_(n.inputs,e),n.compute(v_(n.inputs,e))},Vb=n=>vt({axis:n.axis,blockSize:n.blockSize})}),x_,b_,Hb,cR=fe(()=>{Nn(),Ge(),Ke(),x_=(n,e,t)=>{let i=n===e,r=n<e&&t<0,s=n>e&&t>0;if(i||r||s)throw new Error("Range these inputs' contents are invalid.")},b_=(n,e,t,i)=>{let r=Math.abs(Math.ceil((e-n)/t)),s=[r],a=r,o=[{type:12,data:a},{type:i,data:n},{type:i,data:t},...Ue(s)],u=l=>{let c=Pe("output",i,s.length),d=c.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:d},{name:"delta",type:d}];return`
        ${l.registerUniforms(h).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${d}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o})}},Hb=n=>{let e=0,t=0,i=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],t=n.inputs[1].getInt32Array()[0],i=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],t=n.inputs[1].getFloat32Array()[0],i=n.inputs[2].getFloat32Array()[0]),Nt.webgpu.validateInputContent&&x_(e,t,i),n.compute(b_(e,t,i,n.inputs[0].dataType),{inputs:[]})}}),w_,S_,Gb,Wb,dR=fe(()=>{Ge(),Ye(),Ft(),Ke(),w_=(n,e,t,i)=>{if(n!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${n}.`);let r=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${e}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(n){case"none":return`${e}=${t};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${e}, bitcast<${i}>(${t}));`:`
              ${r}bitcast<${i}>(oldValue) + (${t})${s}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${e}, bitcast<${i}>(${t}));`:`
                ${r}max(bitcast<f32>(oldValue), (${t}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${e}, bitcast<${i}>(${t}));`:`${r}min(bitcast<${i}>(oldValue), (${t}))${s}`;case"mul":return`${r}(bitcast<${i}>(oldValue) * (${t}))${s}`;default:throw new Error(`Reduction ${n} is not supported.`)}},S_=(n,e)=>{let t=n[0].dims,i=n[1].dims,r=t,s=1,a=Math.ceil(te.sizeToDimension(i,i.length-1)/s),o=i[i.length-1],u=te.sizeFromDimension(t,o),l=[{type:12,data:a},{type:12,data:o},{type:12,data:u},...Ue(n[1].dims,n[2].dims,r)],c=d=>{let h=re("indices",n[1].dataType,n[1].dims.length),f=re("updates",n[2].dataType,n[2].dims.length,s),m=e.reduction!=="none"&&e.reduction!==""?vv("output",n[0].dataType,r.length):Pe("output",n[0].dataType,r.length,s);return`
      ${d.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,f,m)}
      ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${n[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${w_(e.reduction,"output[data_offset + i]","value",m.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:c}},Gb=n=>vt({reduction:n.reduction}),Wb=(n,e)=>{n.compute(S_(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}}),M_,E_,T_,Ou,A_,C_,R_,I_,$_,P_,D_,L_,Uu,N_,k_,O_,U_,z_,qb,jb,hR=fe(()=>{Ge(),Ye(),Ft(),Ke(),M_=(n,e)=>{if(n.every(t=>t>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},E_=(n,e,t)=>{e.every(r=>r>=0&&r<t||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(t).fill(1);return e.forEach((r,s)=>i[r]=n[s]),i},T_=(n,e,t,i,r,s)=>{let[a,o,u]=t>10?[1,2,3]:[-1,n.length>1?1:-1,-1],l=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(c=>s.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&n.length>o&&n[o].dims.length===1&&n[o].dims[0]>0){if(n[o].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==l&&t>=18&&i.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");M_(i,e),e.axes.length>0&&E_(i,e.axes,l).forEach((c,d)=>i[d]=c)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(c=>r.push(Number(c))),r.length!==0&&r.length!==l&&t>=18&&r.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(i.length!==0&&i.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(r.length!==0&&r.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof r<"u"&&i.length>0&&r.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},Ou=(n,e,t,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${i}(big / (${t}));
  let fract = ${i}(big % (${t})) / ${i}(${t});
  return whole + fract;
`,A_=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${Ou("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ou("xResized","lengthOriginal - 1","lengthResized - 1",e)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",C_=(n,e,t)=>`fn getNearestPixelFromOriginal(xOriginal: ${t}, isDownSample: bool) -> ${t} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",R_=(n,e,t)=>{let i=new Array(t).fill(0).concat(new Array(t).fill(1)),r=n.length===0?i:n.slice();return e.length>0?(e.forEach((s,a)=>{i[s]=r[a],i[a+t]=r[e.length+a]}),i):r},I_=(n,e,t,i)=>{let r=[];if(t.length>0)if(i.length>0){if(n.forEach(s=>r.push(s)),Math.max(...i)>n.length)throw new Error("axes is out of bound");i.forEach((s,a)=>r[s]=t[a])}else t.forEach(s=>r.push(s));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");r=n.map((s,a)=>Math.round(s*e[a]))}return r},$_=(n,e,t)=>{let i=(()=>{switch(t.keepAspectRatioPolicy){case"not_larger":return t.axes.length>0?Math.min(...t.axes.map(s=>e[s]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return t.axes.length>0?Math.max(...t.axes.map(s=>e[s]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${t.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let r=n.slice();return t.axes.length>0?(t.axes.forEach(s=>e[s]=i),t.axes.forEach(s=>r[s]=Math.round(n[s]*e[s]))):(e.fill(i,0,e.length),r.forEach((s,a)=>r[a]=Math.round(s*e[a]))),r},P_=(n,e,t,i,r)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${n.type.indices}) -> array<${n.type.value}, ${t.length}> {
      var original_indices: array<${n.type.value}, ${t.length}>;
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${n.indicesGet("output_indices","i")};
        var scale = ${ke("uniforms.scales","i",i)};
        var roi_low = ${ke("uniforms.roi","i",r)};
        var roi_hi = ${ke("uniforms.roi",`i + ${e.length}`,r)};
        if (scale == 1.0) {
          original_indices[i] = ${n.type.value}(output_index);
        } else {
          var input_shape_i = ${ke("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${ke("uniforms.output_shape","i",t.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,D_=(n,e,t,i,r,s,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
      var input_indices: ${n.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ke("uniforms.scales","i",r)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ke("uniforms.roi","i",s)};
          var roi_hi = ${ke("uniforms.roi",`i + ${t.length}`,s)};
          var input_shape_i = ${ke("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${ke("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${n.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,L_=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ke("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,Uu=(n,e,t,i)=>n.rank>i?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",t,"batch")};
`:"",N_=(n,e,t,i,r)=>{let[s,a,o,u]=t.length===2?[-1,0,1,-1]:[0,2,3,1],l=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",a,`max(0, min(row, ${t[a]} - 1))`)};
      ${n.indicesSet("input_indices",o,`max(0, min(col, ${t[o]} - 1))`)};
      ${Uu(n,u,s,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${a}];
      var col:${l} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${t[a]} - 1) || col < 0 || col > (${t[o]} - 1)) {
        return ${r};
      }`:""};
      row = max(0, min(row, ${t[a]} - 1));
      col = max(0, min(col, ${t[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${t.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${t.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},k_=(n,e,t,i,r,s,a,o,u,l)=>{let c=t.length===2,[d,h]=c?[0,1]:[2,3],f=n.type.value,m=y=>{let _=y===d?"row":"col";return`
      fn ${_}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${f} {
        var output_index = ${e.indicesGet("output_indices",y)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${r[y]},
        ${i[y]}, ${t[y]}, ${s[y]}, ${s[y]} + ${t.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${t[y]} - 1))) {
          return ${u};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${_}: ${f} = originalIdx + ${f}(i);
          if (${_} < 0 || ${_} >= ${t[y]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${_} = max(0, min(${_}, ${t[y]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",y,`u32(${_})`)};
          data[i + 1] = ${y===d?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${m(d)};
    ${m(h)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${f} {
    var input_indices: ${n.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},O_=(n,e,t,i,r)=>{let[s,a,o,u,l]=t.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",a,`max(0, min(depth, ${t[a]} - 1))`)};
      ${n.indicesSet("input_indices",o,`max(0, min(height, ${t[o]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(width, ${t[u]} - 1))`)};
      ${Uu(n,l,s,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${t[a]} - 1) || height < 0 || height > (${t[o]} - 1) || width < 0 || (width > ${t[u]} - 1)) {
      return ${r};
        }`:""};

    depth = max(0, min(depth, ${t[a]} - 1));
      height = max(0, min(height, ${t[o]} - 1));
      width = max(0, min(width, ${t[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${t.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${t.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},U_=(n,e,t,i,r,s)=>{let a=n.dims,o=R_(s,e.axes,a.length),u=I_(a,i,r,e.axes),l=i.slice();i.length===0&&(l=a.map((x,w)=>x===0?1:u[w]/x),e.keepAspectRatioPolicy!=="stretch"&&(u=$_(a,l,e)));let c=Pe("output",n.dataType,u.length),d=re("input",n.dataType,a.length),h=te.size(u),f=a.length===u.length&&a.every((x,w)=>x===u[w]),m=e.coordinateTransformMode==="tf_crop_and_resize",y=e.extrapolationValue,_=d.type.value,p=x=>`
      ${f?"":`
      ${A_(e.coordinateTransformMode,_)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${L_(d,a)};
              ${C_(e.nearestMode,t,_)};
              ${D_(d,c,a,u,l.length,o.length,m)};
              `;case"linear":return`
              ${P_(c,a,u,l.length,o.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${N_(d,c,a,m,y)}`;if(a.length===3||a.length===5)return`${O_(d,c,a,m,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${k_(d,c,a,u,l,o,e.cubicCoeffA,m,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",o.length).declareVariables(d,c)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${d.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${d.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${t}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${r.length>0?r:""}|${o.length>0?o:""}|${f}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:l},{type:1,data:o},...Ue(a,u)]})}},z_=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},qb=(n,e)=>{let t=[],i=[],r=[],s=z_(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");T_(n.inputs,e,s,t,i,r),n.compute(U_(n.inputs[0],e,s,t,i,r),{inputs:[0]})},jb=n=>{let e=n.antialias,t=n.axes,i=n.coordinateTransformMode,r=n.cubicCoeffA,s=n.excludeOutside!==0,a=n.extrapolationValue,o=n.keepAspectRatioPolicy,u=n.mode,l=n.nearestMode===""?"simple":n.nearestMode;return vt({antialias:e,axes:t,coordinateTransformMode:i,cubicCoeffA:r,excludeOutside:s,extrapolationValue:a,keepAspectRatioPolicy:o,mode:u,nearestMode:l})}}),B_,F_,Xb,fR=fe(()=>{Ge(),Ye(),Ke(),B_=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],t=n[1],i=n[2];if(e.dataType!==t.dataType||e.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Skip must be 2D or 3D");let r=e.dims[e.dims.length-1],s=e.dims[e.dims.length-2];if(t.dims[t.dims.length-1]!==r)throw new Error("Skip must have the same hidden size as input");if(t.dims[t.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==r)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==r)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==r)throw new Error("Bias must have the same hidden size as input")}},F_=(n,e,t,i)=>{let r=e.simplified,s=n[0].dims,a=te.size(s),o=s,u=a,l=s.slice(-1)[0],c=i?s.slice(0,-1).concat(1):[],d=!r&&n.length>3,h=n.length>4,f=i&&t>1,m=i&&t>2,y=t>3,_=64,p=Bt(l),x=[{type:12,data:u},{type:12,data:p},{type:12,data:l},{type:1,data:e.epsilon}],w=I=>{let R=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],T=[re("x",n[0].dataType,n[0].dims,p),re("skip",n[1].dataType,n[1].dims,p),re("gamma",n[2].dataType,n[2].dims,p)];d&&T.push(re("beta",n[3].dataType,n[3].dims,p)),h&&T.push(re("bias",n[4].dataType,n[4].dims,p)),T.push(Pe("output",n[0].dataType,o,p)),f&&T.push(Pe("mean_output",1,c)),m&&T.push(Pe("inv_std_output",1,c)),y&&T.push(Pe("input_skip_bias_sum",n[0].dataType,o,p));let S=jt(n[0].dataType),C=jt(1,p);return`

      ${I.registerUniforms(R).declareVariables(...T)}
      var<workgroup> sum_shared : array<${C}, ${_}>;
      var<workgroup> sum_squared_shared : array<${C}, ${_}>;

      ${I.mainStart([_,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${_};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${_};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${_-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":S+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${is(S,p,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${_};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Hi("sum",p)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Hi("square_sum",p)} / f32(uniforms.hidden_size) ${r?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${r?"":`- ${S}(mean)`}) *
            ${S}(inv_std_dev) * gamma[offset1d + i]
            ${d?"+ beta[offset1d + i]":""};
        }
      }`},b=[{dims:o,dataType:n[0].dataType}];return t>1&&b.push({dims:c,dataType:1}),t>2&&b.push({dims:c,dataType:1}),t>3&&b.push({dims:s,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${p};${f};${m};${y}`,inputDependencies:n.map((I,R)=>"type")},getShaderSource:w,getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:x})}},Xb=(n,e)=>{B_(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(F_(n.inputs,e,n.outputCount,!1),{outputs:t})}}),V_,Xs,H_,zu,G_,W_,Yb,Kb,pR=fe(()=>{Ge(),Ye(),Ft(),Ke(),V_=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((t,i)=>{if(n[i+1].dataType!==6&&n[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},Xs=(n,e)=>{let t=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(i=>t.push(Number(i)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(i=>t.push(Number(i)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return t},H_=(n,e)=>{if(n.length>1){let t=Xs(n,1),i=Xs(n,2),r=Xs(n,3);return r.length===0&&(r=[...Array(n[0].dims.length).keys()]),vt({starts:t,ends:i,axes:r})}else return e},zu=(n,e,t,i,r)=>{let s=n;return n<0&&(s+=t[i[e]]),r[e]<0?Math.max(0,Math.min(s,t[i[e]]-1)):Math.max(0,Math.min(s,t[i[e]]))},G_=(n,e,t)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${t.length-1}; i >= 0; i--) {
            let input_shape_i = ${ke("uniforms.input_shape","i",t.length)};
            let steps_i = ${ke("uniforms.steps","i",t.length)};
            let signs_i = ${ke("uniforms.signs","i",t.length)};
            let starts_i = ${ke("uniforms.starts","i",t.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${n.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,W_=(n,e)=>{let t=n[0].dims,i=te.size(t),r=e.axes.length>0?te.normalizeAxes(e.axes,t.length):[...Array(t.length).keys()],s=Xs(n,4);s.forEach(p=>p!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(r.length).fill(1));let a=e.starts.map((p,x)=>zu(p,x,t,r,s)),o=e.ends.map((p,x)=>zu(p,x,t,r,s));if(r.length!==a.length||r.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(r.length!==t.length)for(let p=0;p<t.length;++p)r.includes(p)||(a.splice(p,0,0),o.splice(p,0,t[p]),s.splice(p,0,1));let u=s.map(p=>Math.sign(p));s.forEach((p,x,w)=>{if(p<0){let b=(o[x]-a[x])/p,I=a[x],R=I+b*s[x];a[x]=R,o[x]=I,w[x]=-p}});let l=t.slice(0);r.forEach((p,x)=>{l[p]=Math.ceil((o[p]-a[p])/s[p])});let c={dims:l,dataType:n[0].dataType},d=Pe("output",n[0].dataType,l.length),h=re("input",n[0].dataType,n[0].dims.length),f=te.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],y=[{type:12,data:f},{type:12,data:a},{type:6,data:u},{type:12,data:s},...Ue(n[0].dims,l)],_=p=>`
      ${p.registerUniforms(m).declareVariables(h,d)}
        ${G_(h,d,t)}
        ${p.mainStart()}
          ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${d.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${d.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:y})}},Yb=(n,e)=>{V_(n.inputs,e);let t=H_(n.inputs,e);n.compute(W_(n.inputs,t),{inputs:[0]})},Kb=n=>{let e=n.starts,t=n.ends,i=n.axes;return vt({starts:e,ends:t,axes:i})}}),q_,j_,Zb,Jb,mR=fe(()=>{Ge(),Ye(),Ft(),Gi(),Ke(),q_=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},j_=(n,e)=>{let t=n.inputs[0],i=t.dims,r=te.size(i),s=i.length,a=te.normalizeAxis(e.axis,s),o=a<i.length-1,u,l=[];o?(l=Array.from({length:s},(T,S)=>S),l[a]=s-1,l[s-1]=a,u=n.compute(Tn(t,l),{inputs:[t],outputs:[-1]})[0]):u=t;let c=u.dims,d=c[s-1],h=r/d,f=Bt(d),m=d/f,y=64;h===1&&(y=256);let _=(T,S)=>S===4?`max(max(${T}.x, ${T}.y), max(${T}.z, ${T}.w))`:S===2?`max(${T}.x, ${T}.y)`:S===3?`max(max(${T}.x, ${T}.y), ${T}.z)`:T,p=re("x",u.dataType,u.dims,f),x=Pe("result",u.dataType,u.dims,f),w=p.type.value,b=jt(u.dataType)==="f32"?`var threadMax = ${w}(-3.4028234663852886e+38f);`:`var threadMax = ${w}(-65504.0h);`,I=T=>`
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${y}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${T.registerUniform("packedCols","i32").declareVariables(p,x)}
      ${T.mainStart(y)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${y};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${b}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${w}(${_("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${w}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${w}(${Hi("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${w}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,R=n.compute({name:"Softmax",shaderCache:{hint:`${f};${y}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:m}]}),getShaderSource:I},{inputs:[u],outputs:[o?-1:0]})[0];o&&n.compute(Tn(R,l),{inputs:[R]})},Zb=(n,e)=>{q_(n.inputs),j_(n,e)},Jb=n=>vt({axis:n.axis})}),Bu,X_,Y_,K_,Qb,gR=fe(()=>{Ge(),Ye(),Ke(),Bu=n=>Array.from(n.getBigInt64Array(),Number),X_=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Bu(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Y_=(n,e)=>{let t=[];for(let i=0;i<n.length;++i)t.push(n[i]*e[i]);return t},K_=(n,e)=>{let t=n[0].dims,i=e??Bu(n[1]),r=Y_(t,i),s=te.size(r),a=n[0].dataType,o=re("input",a,t.length),u=Pe("output",a,r.length),l=c=>`
      const inputShape = ${o.indices(...t)};
      ${c.registerUniform("output_size","u32").declareVariables(o,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${t.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...Ue(n[0].dims,r)]}),getShaderSource:l}},Qb=n=>{X_(n.inputs),n.compute(K_(n.inputs),{inputs:[0]})}}),Z_,J_,ew,_R=fe(()=>{Ge(),Ye(),Ke(),Z_=(n,e,t,i,r)=>{let s=Pe("output_data",r,t.length,4),a=re("a_data",e[1].dataType,e[1].dims.length,4),o=re("b_data",e[2].dataType,e[2].dims.length,4),u=re("c_data",e[0].dataType,e[0].dims.length,4),l,c=(d,h,f)=>`select(${h}, ${d}, ${f})`;if(!i)l=s.setByOffset("global_idx",c(a.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let d=(h,f,m="")=>{let y=`a_data[index_a${f}][component_a${f}]`,_=`b_data[index_b${f}][component_b${f}]`,p=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${s.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${a.broadcastedIndicesToOffset(`output_indices${f}`,s)};
            let offset_b${f} = ${o.broadcastedIndicesToOffset(`output_indices${f}`,s)};
            let offset_c${f} = ${u.broadcastedIndicesToOffset(`output_indices${f}`,s)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${h}[${f}] = ${m}(${c(y,_,p)});
          `};r===9?l=`
            var data = vec4<u32>(0);
            ${d("data",0,"u32")}
            ${d("data",1,"u32")}
            ${d("data",2,"u32")}
            ${d("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${d("output_data[global_idx]",0)}
            ${d("output_data[global_idx]",1)}
            ${d("output_data[global_idx]",2)}
            ${d("output_data[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(u,a,o,s)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},J_=n=>{let e=n[1].dims,t=n[2].dims,i=n[0].dims,r=n[1].dataType,s=!(te.areEqual(e,t)&&te.areEqual(t,i)),a=e,o=te.size(e);if(s){let l=gs.calcShape(gs.calcShape(e,t,!1),i,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,o=te.size(a)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>Z_(l,n,a,s,r),getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...Ue(i,e,t,a)]})}},ew=n=>{n.compute(J_(n.inputs))}}),tw,yR=fe(()=>{P3(),Bd(),D3(),L3(),N3(),k3(),O3(),V3(),G3(),W3(),q3(),j3(),X3(),Y3(),K3(),Z3(),J3(),Q3(),eR(),tR(),nR(),iR(),rR(),sR(),aR(),xb(),oR(),lR(),uR(),cR(),dR(),zd(),hR(),Eb(),fR(),pR(),mR(),Sb(),gR(),Gi(),Fd(),_R(),tw=new Map([["Abs",[Xv]],["Acos",[Yv]],["Acosh",[Kv]],["Add",[Ix]],["ArgMax",[Gv,Wc]],["ArgMin",[Hv,Wc]],["Asin",[Zv]],["Asinh",[Jv]],["Atan",[Qv]],["Atanh",[ex]],["Attention",[Wv]],["AveragePool",[Lb,Db]],["BatchNormalization",[qv]],["BiasAdd",[jv]],["BiasSplitGelu",[Rx]],["Cast",[nx,tx]],["Ceil",[rx]],["Clip",[ix]],["Concat",[Bx,Fx]],["Conv",[Zc,Kc]],["ConvTranspose",[Zx,Kx]],["Cos",[sx]],["Cosh",[ax]],["CumSum",[Jx,Qx]],["DepthToSpace",[eb,tb]],["DequantizeLinear",[Fb,Vb]],["Div",[$x]],["Einsum",[nb,ib]],["Elu",[ox,na]],["Equal",[Px]],["Erf",[lx]],["Exp",[ux]],["Expand",[rb]],["FastGelu",[sb]],["Floor",[cx]],["FusedConv",[Zc,Kc]],["Gather",[ob,ab]],["GatherElements",[fb,hb]],["GatherBlockQuantized",[cb,db]],["GatherND",[lb,ub]],["Gelu",[dx]],["Gemm",[mb,pb]],["GlobalAveragePool",[kb,Nb]],["GlobalMaxPool",[Bb,zb]],["Greater",[kx]],["GreaterOrEqual",[Ux]],["GridSample",[gb,_b]],["GroupQueryAttention",[Tb]],["HardSigmoid",[vx,yx]],["InstanceNormalization",[Ab]],["LayerNormalization",[Cb]],["LeakyRelu",[hx,na]],["Less",[Ox]],["LessOrEqual",[zx]],["Log",[Ax]],["MatMul",[Rb]],["MatMulNBits",[Ib,$b]],["MaxPool",[Ob,Ub]],["Mul",[Dx]],["MultiHeadAttention",[vb,yb]],["Neg",[px]],["Not",[fx]],["Pad",[Pb]],["Pow",[Lx]],["QuickGelu",[Cx,na]],["Range",[Hb]],["Reciprocal",[mx]],["ReduceMin",[Uv]],["ReduceMean",[Dv]],["ReduceMax",[Ov]],["ReduceSum",[Bv]],["ReduceProd",[zv]],["ReduceL1",[Lv]],["ReduceL2",[Nv]],["ReduceLogSum",[Vv]],["ReduceLogSumExp",[kv]],["ReduceSumSquare",[Fv]],["Relu",[gx]],["Resize",[qb,jb]],["RotaryEmbedding",[Mb]],["ScatterND",[Wb,Gb]],["Sigmoid",[_x]],["Sin",[xx]],["Sinh",[bx]],["Slice",[Yb,Kb]],["SkipLayerNormalization",[Xb]],["Split",[bb,wb]],["Sqrt",[wx]],["Softmax",[Zb,Jb]],["Sub",[Nx]],["Tan",[Sx]],["Tanh",[Mx]],["ThresholdedRelu",[Tx,na]],["Tile",[Qb]],["Transpose",[bv,wv]],["Where",[ew]]])}),nw,vR=fe(()=>{Nn(),Mi(),Ke(),nw=class{constructor(n){this.backend=n,this.repo=new Map,this.attributesBound=!1}getArtifact(n){return this.repo.get(n)}setArtifact(n,e){this.repo.set(n,e)}run(n,e,t,i,r){li(n.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let l of e)o.push({binding:o.length,resource:{buffer:l.buffer}});for(let l of t)o.push({binding:o.length,resource:{buffer:l.buffer}});r&&o.push({binding:o.length,resource:r});let u=s.createBindGroup({layout:n.computePipeline.getBindGroupLayout(0),entries:o,label:n.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:n.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}a.setPipeline(n.computePipeline),a.setBindGroup(0,u),a.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),jn(n.programInfo.name)}dispose(){}build(n,e){li(n.name);let t=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(l=>{t.features.has(l.feature)&&i.push(`enable ${l.extension};`)});let r=xv(e,this.backend.device.limits),s=n.getShaderSource(r),a=`${i.join(`
`)}
${r.additionalImplementations}
${s}`,o=t.createShaderModule({code:a,label:n.name});ht("verbose",()=>`[WebGPU] ${n.name} shader code: ${a}`);let u=t.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:n.name});return jn(n.name),{programInfo:n,computePipeline:u,uniformVariablesInfo:r.variablesInfo}}normalizeDispatchGroupSize(n){let e=typeof n=="number"?n:n.x,t=typeof n=="number"?1:n.y||1,i=typeof n=="number"?1:n.z||1,r=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(e<=r&&t<=r&&i<=r)return[e,t,i];let s=e*t*i,a=Math.ceil(Math.sqrt(s));if(a>r){if(a=Math.ceil(Math.cbrt(s)),a>r)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),iw={};bs(iw,{WebGpuBackend:()=>rw});var Q_,e0,t0,rw,xR=fe(()=>{Nn(),Ge(),Mi(),mv(),I3(),yR(),vR(),Q_=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let t=[];for(let i=0;i<n.length;++i){let r=n[i].dataType;switch(e[i]){case"none":{t.push("");break}case"type":{t.push(`${r}`);break}case"rank":{let s=n[i].dims.length;t.push(`${r};${s}`);break}case"dims":{let s=n[i].dims.join(",");t.push(`${r};${s}`);break}default:throw new Error(`unsupported input dependency: ${e[i]}`)}}return t.join("|")},e0=(n,e,t)=>{let i=n.name;return n.shaderCache?.hint&&(i+="["+n.shaderCache.hint+"]"),i+=":"+t+`:${Q_(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,i},t0=class{constructor(n){n&&(this.architecture=n.architecture,this.vendor=n.vendor)}isArchitecture(n){return this.architecture===n}isVendor(n){return this.vendor===n}},rw=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let n=this.kernelCustomData.get(this.currentKernelId);return n||(n={},this.kernelCustomData.set(this.currentKernelId,n)),n}async initialize(n,e){this.env=n;let t=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:e.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:e.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize,maxBufferSize:e.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:e.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:e.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:e.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:e.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},r=s=>e.features.has(s)&&t.push(s)&&!0;r("chromium-experimental-timestamp-query-inside-passes")||r("timestamp-query"),r("shader-f16"),r("subgroups"),this.device=await e.requestDevice(i),this.adapterInfo=new t0(e.info||await e.requestAdapterInfo()),this.gpuDataManager=yv(this),this.programManager=new nw(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Nd(n.logLevel,!!n.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:e,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let n=this.getCommandEncoder(),e={};this.queryType==="at-passes"&&(e.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=n.beginComputePass(e)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;li(),this.endComputePass();let n;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),n=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(n,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,n,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&n.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigUint64Array(n.getMappedRange()),t=this.pendingQueries.get(n);for(let i=0;i<e.length/2;i++){let r=t[i],s=r.kernelId,a=this.kernels.get(s),o=a.kernelType,u=a.kernelName,l=r.programName,c=r.inputTensorViews,d=r.outputTensorViews,h=e[i*2],f=e[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let m=Number(h-this.queryTimeBase),y=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(m)||!Number.isSafeInteger(y))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(_=>({dims:_.dims,dataType:bi(_.dataType)})),outputsMetadata:d.map(_=>({dims:_.dims,dataType:bi(_.dataType)})),kernelId:s,kernelType:o,kernelName:u,programName:l,startTime:m,endTime:y});else{let _="";c.forEach((x,w)=>{_+=`input[${w}]: [${x.dims}] | ${bi(x.dataType)}, `});let p="";d.forEach((x,w)=>{p+=`output[${w}]: [${x.dims}] | ${bi(x.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${u}|${l}" ${_}${p}start time: ${m} ns, execution time: ${y-m} ns`)}Po("GPU",`${l}::${h}::${f}`)}n.unmap(),this.pendingQueries.delete(n)}),jn()}run(n,e,t,i,r,s){li(n.name);let a=[];for(let x=0;x<e.length;++x){let w=e[x].data;if(w===0)continue;let b=this.gpuDataManager.get(w);if(!b)throw new Error(`no GPU data for input: ${w}`);a.push(b)}let{outputs:o,dispatchGroup:u,programUniforms:l}=n.getRunData(e),c=t.length===0?o.map((x,w)=>w):t;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let d=[],h=[];for(let x=0;x<o.length;++x){if(!Number.isInteger(c[x])||c[x]<-3||c[x]>=s)throw new Error(`Invalid output index: ${c[x]}`);if(c[x]===-3)continue;let w=c[x]===-1,b=c[x]===-2,I=w||b?r(o[x].dataType,o[x].dims):i(c[x],o[x].dataType,o[x].dims);if(d.push(I),I.data===0)continue;let R=this.gpuDataManager.get(I.data);if(!R)throw new Error(`no GPU data for output: ${I.data}`);if(w&&this.temporaryData.push(R),b){let T=this.kernelPersistentData.get(this.currentKernelId);T||(T=[],this.kernelPersistentData.set(this.currentKernelId,T)),T.push(R)}h.push(R)}if(a.length!==e.length||h.length!==d.length){if(h.length===0)return jn(n.name),d;throw new Error(`Program ${n.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let f;if(l){let x=0,w=[];l.forEach(T=>{let S=typeof T.data=="number"?[T.data]:T.data;if(S.length===0)return;let C=T.type===10?2:4,A,L;T.type===10?(L=S.length>4?16:S.length>2?8:S.length*C,A=S.length>4?16:C*S.length):(L=S.length<=2?S.length*C:16,A=16),x=Math.ceil(x/L)*L,w.push(x);let F=T.type===10?8:4;x+=S.length>4?Math.ceil(S.length/F)*A:S.length*C});let b=16;x=Math.ceil(x/b)*b;let I=new ArrayBuffer(x);l.forEach((T,S)=>{let C=w[S],A=typeof T.data=="number"?[T.data]:T.data;if(T.type===6)new Int32Array(I,C,A.length).set(A);else if(T.type===12)new Uint32Array(I,C,A.length).set(A);else if(T.type===10)new Uint16Array(I,C,A.length).set(A);else if(T.type===1)new Float32Array(I,C,A.length).set(A);else throw new Error(`Unsupported uniform type: ${bi(T.type)}`)});let R=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(R.buffer,0,I,0,x),this.gpuDataManager.release(R.id),f={offset:0,size:x,buffer:R.buffer}}let m=this.programManager.normalizeDispatchGroupSize(u),y=m[1]===1&&m[2]===1,_=e0(n,e,y),p=this.programManager.getArtifact(_);if(p||(p=this.programManager.build(n,m),this.programManager.setArtifact(_,p),ht("info",()=>`[artifact] key: ${_}, programName: ${n.name}`)),l&&p.uniformVariablesInfo){if(l.length!==p.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${p.uniformVariablesInfo.length}, got ${l.length} in program "${p.programInfo.name}".`);for(let x=0;x<l.length;x++){let w=l[x],b=w.type,I=typeof w.data=="number"?1:w.data.length,[R,T]=p.uniformVariablesInfo[x];if(b!==R||I!==T)throw new Error(`Uniform variable ${x} mismatch: expect type ${R} with size ${T}, got type ${b} with size ${I} in program "${p.programInfo.name}".`)}}if(ht("info",()=>`[ProgramManager] run "${n.name}" (key=${_}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:p.programInfo.name,inputTensorViews:e,outputTensorViews:d};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(p,a,h,m,f),jn(n.name),d}upload(n,e){this.gpuDataManager.upload(n,e)}memcpy(n,e){this.gpuDataManager.memcpy(n,e)}async download(n,e){await this.gpuDataManager.download(n,e)}alloc(n){return this.gpuDataManager.create(n).id}free(n){return this.gpuDataManager.release(n)}createKernel(n,e,t,i){let r=tw.get(n);if(!r)throw new Error(`kernel not implemented: ${n}`);let s={kernelType:n,kernelName:i,kernelEntry:r[0],attributes:[r[1],t]};this.kernels.set(e,s)}releaseKernel(n){let e=this.kernelPersistentData.get(n);if(e){for(let t of e)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(n)}this.kernelCustomData.delete(n),this.kernels.delete(n)}computeKernel(n,e,t){let i=this.kernels.get(n);if(!i)throw new Error(`kernel not created: ${n}`);let r=i.kernelType,s=i.kernelName,a=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${r}] ${s}" is not allowed to be called recursively`);this.currentKernelId=n,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),ht("info",()=>`[WebGPU] Start to run kernel "[${r}] ${s}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),a(e,o[1]),0}catch(l){return t.push(Promise.resolve(`[WebGPU] Kernel "[${r}] ${s}" failed. ${l}`)),1}finally{u&&t.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${r}] ${s}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(n,e,t,i){let r=this.sessionExternalDataMapping.get(n);r||(r=new Map,this.sessionExternalDataMapping.set(n,r));let s=r.get(e),a=this.gpuDataManager.registerExternalBuffer(t,i,s);return r.set(e,[a,t]),a}unregisterBuffers(n){let e=this.sessionExternalDataMapping.get(n);e&&(e.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(n))}getBuffer(n){let e=this.gpuDataManager.get(n);if(!e)throw new Error(`no GPU data for buffer: ${n}`);return e.buffer}createDownloader(n,e,t){return async()=>{let i=await Vc(this,n,e);return kd(i.buffer,t)}}writeTimestamp(n){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,n)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ht("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ht("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ht("info","replay"),this.sessionStatus="replaying";let n=this.capturedCommandList.get(this.currentSessionId),e=this.capturedPendingKernels.get(this.currentSessionId),t=n.length;this.pendingKernels=[];for(let i=0;i<t;i++){let r=this.getComputePassEncoder(),s=n[i];this.writeTimestamp(this.pendingDispatchNumber*2),r.setPipeline(s.computePipeline),r.setBindGroup(0,s.bindGroup),r.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(e[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(n){this.unregisterBuffers(n),this.capturedCommandList.has(n)&&this.capturedCommandList.delete(n),this.capturedPendingKernels.has(n)&&this.capturedPendingKernels.delete(n),this.gpuDataManager.onReleaseSession(n)}onRunStart(n){this.currentSessionId=n,this.setQueryType()}}}),sw={};bs(sw,{init:()=>aw});var ho,n0,aw,bR=fe(()=>{Ge(),Mi(),Ye(),R3(),ho=class ow{constructor(e,t,i,r){this.module=e,this.dataType=t,this.data=i,this.dims=r}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=te.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=te.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=te.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=te.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(te.size(e)!==te.size(this.dims))throw new Error("Invalid new shape");return new ow(this.module,this.dataType,this.data,e)}},n0=class{constructor(n,e,t){this.module=n,this.backend=e,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=e.adapterInfo;let i=n.PTR_SIZE,r=t/n.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(n.getValue(i*r++,s));let a=Number(n.getValue(i*r++,s));this.outputCount=Number(n.getValue(i*r++,s)),this.customDataOffset=Number(n.getValue(i*r++,"*")),this.customDataSize=Number(n.getValue(i*r++,s));let o=[];for(let u=0;u<a;u++){let l=Number(n.getValue(i*r++,s)),c=Number(n.getValue(i*r++,"*")),d=Number(n.getValue(i*r++,s)),h=[];for(let f=0;f<d;f++)h.push(Number(n.getValue(i*r++,s)));o.push(new ho(n,l,c,h))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(n,e){let t=e?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,i=e?.outputs??[],r=(a,o,u)=>new ho(this.module,o,this.output(a,u),u),s=(a,o)=>{let u=pr(a,o);if(!u)throw new Error(`Unsupported data type: ${a}`);let l=u>0?this.backend.gpuDataManager.create(u).id:0;return new ho(this.module,a,l,o)};return this.backend.run(n,t,i,r,s,this.outputCount)}output(n,e){let t=this.module.stackSave();try{let i=this.module.PTR_SIZE,r=i===4?"i32":"i64",s=this.module.stackAlloc((1+e.length)*i);this.module.setValue(s,e.length,r);for(let a=0;a<e.length;a++)this.module.setValue(s+i*(a+1),e[a],r);return this.module._JsepOutput(this.opKernelContext,n,s)}catch(i){throw new Error(`Failed to generate kernel's output[${n}] with dims [${e}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(t)}}},aw=async(n,e,t,i)=>{let r=e.jsepInit;if(!r)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let s=(xR(),ca(iw)).WebGpuBackend,a=new s;await a.initialize(t,i),r("webgpu",[a,o=>a.alloc(Number(o)),o=>a.free(o),(o,u,l,c=!1)=>{if(c)ht("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(l)}`),a.memcpy(Number(o),Number(u));else{ht("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let d=e.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(l));a.upload(Number(u),d)}},async(o,u,l)=>{ht("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${l}`),await a.download(Number(o),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(o,u,l)=>a.createKernel(o,Number(u),l,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),o=>a.releaseKernel(o),(o,u,l,c)=>{ht("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${o}, contextDataOffset=${u}`);let d=new n0(e,a,Number(u));return a.computeKernel(Number(o),d,c)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let s=new _v(t);r("webnn",[s,()=>s.reserveTensorId(),a=>s.releaseTensorId(a),async(a,o,u,l,c)=>s.ensureTensor(a,o,u,l,c),(a,o)=>{s.uploadTensor(a,o)},async(a,o)=>s.downloadTensor(a,o),(a,o)=>s.registerMLContext(a,o),!!t.trace])}}}),i0,jd,Xd,Ni,r0,Fu,zo,Yd,Kd,Vu,Zd,Jd,Qd,lw=fe(()=>{Nn(),T3(),A3(),Ge(),Ir(),$d(),dv(),i0=(n,e)=>{Rt()._OrtInit(n,e)!==0&&St("Can't initialize onnxruntime.")},jd=async n=>{i0(n.wasm.numThreads,Lo(n.logLevel))},Xd=async(n,e)=>{Rt().asyncInit?.();let t=n.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=n.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let r=n.webgpu.forceFallbackAdapter;if(r!==void 0&&typeof r!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${r}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:r}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(bR(),ca(sw)).init;e==="webgpu"&&await i("webgpu",Rt(),n,t),e==="webnn"&&await i("webnn",Rt(),n)}},Ni=new Map,r0=n=>{let e=Rt(),t=e.stackSave();try{let i=e.PTR_SIZE,r=e.stackAlloc(2*i);e._OrtGetInputOutputCount(n,r,r+i)!==0&&St("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(e.getValue(r,s)),Number(e.getValue(r+i,s))]}finally{e.stackRestore(t)}},Fu=(n,e)=>{let t=Rt(),i=t.stackSave(),r=0;try{let s=t.PTR_SIZE,a=t.stackAlloc(2*s);t._OrtGetInputOutputMetadata(n,e,a,a+s)!==0&&St("Can't get session input/output metadata.");let o=Number(t.getValue(a,"*"));r=Number(t.getValue(a+s,"*"));let u=t.HEAP32[r/4];if(u===0)return[o,0];let l=t.HEAPU32[r/4+1],c=[];for(let d=0;d<l;d++){let h=Number(t.getValue(r+8+d*s,"*"));c.push(h!==0?t.UTF8ToString(h):Number(t.getValue(r+8+(d+l)*s,"*")))}return[o,u,c]}finally{t.stackRestore(i),r!==0&&t._OrtFree(r)}},zo=n=>{let e=Rt(),t=e._malloc(n.byteLength);if(t===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,t),[t,n.byteLength]},Yd=async(n,e)=>{let t,i,r=Rt();Array.isArray(n)?[t,i]=n:n.buffer===r.HEAPU8.buffer?[t,i]=[n.byteOffset,n.byteLength]:[t,i]=zo(n);let s=0,a=0,o=0,u=[],l=[],c=[];try{if([a,u]=await cv(e),e?.externalData&&r.mountExternalData){let b=[];for(let I of e.externalData){let R=typeof I=="string"?I:I.path;b.push(Ld(typeof I=="string"?I:I.data).then(T=>{r.mountExternalData(R,T)}))}await Promise.all(b)}for(let b of e?.executionProviders??[])if((typeof b=="string"?b:b.name)==="webnn"){if(r.shouldTransferToMLTensor=!1,typeof b!="string"){let I=b,R=I?.context,T=I?.gpuDevice,S=I?.deviceType,C=I?.powerPreference;R?r.currentContext=R:T?r.currentContext=await r.webnnCreateMLContext(T):r.currentContext=await r.webnnCreateMLContext({deviceType:S,powerPreference:C})}else r.currentContext=await r.webnnCreateMLContext();break}s=await r._OrtCreateSession(t,i,a),r.webgpuOnCreateSession?.(s),s===0&&St("Can't create a session."),r.jsepOnCreateSession?.(),r.currentContext&&(r.webnnRegisterMLContext(s,r.currentContext),r.currentContext=void 0,r.shouldTransferToMLTensor=!0);let[d,h]=r0(s),f=!!e?.enableGraphCapture,m=[],y=[],_=[],p=[],x=[];for(let b=0;b<d;b++){let[I,R,T]=Fu(s,b);I===0&&St("Can't get an input name."),l.push(I);let S=r.UTF8ToString(I);m.push(S),_.push(R===0?{name:S,isTensor:!1}:{name:S,isTensor:!0,type:bi(R),shape:T})}for(let b=0;b<h;b++){let[I,R,T]=Fu(s,b+d);I===0&&St("Can't get an output name."),c.push(I);let S=r.UTF8ToString(I);y.push(S),p.push(R===0?{name:S,isTensor:!1}:{name:S,isTensor:!0,type:bi(R),shape:T});{if(f&&e?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let C=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[S]??"cpu",A=r.webnnIsGraphOutput;if(C==="cpu"&&A&&A(s,S)){x.push("ml-tensor-cpu-output");continue}if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(f&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(C)}}let w=null;return x.some(b=>b==="gpu-buffer"||b==="ml-tensor"||b==="ml-tensor-cpu-output")&&(o=r._OrtCreateBinding(s),o===0&&St("Can't create IO binding."),w={handle:o,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(b=>b==="ml-tensor-cpu-output"?"ml-tensor":b).map(b=>Bc(b))}),Ni.set(s,[s,l,c,w,f,!1]),[s,m,y,_,p]}catch(d){throw l.forEach(h=>r._OrtFree(h)),c.forEach(h=>r._OrtFree(h)),o!==0&&r._OrtReleaseBinding(o)!==0&&St("Can't release IO binding."),s!==0&&r._OrtReleaseSession(s)!==0&&St("Can't release session."),d}finally{r._free(t),a!==0&&r._OrtReleaseSessionOptions(a)!==0&&St("Can't release session options."),u.forEach(d=>r._free(d)),r.unmountExternalData?.()}},Kd=n=>{let e=Rt(),t=Ni.get(n);if(!t)throw new Error(`cannot release session. invalid session id: ${n}`);let[i,r,s,a,o]=t;a&&(o&&e._OrtClearBoundOutputs(a.handle)!==0&&St("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&St("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),e.webnnOnReleaseSession?.(n),e.webgpuOnReleaseSession?.(n),r.forEach(u=>e._OrtFree(u)),s.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(i)!==0&&St("Can't release session."),Ni.delete(n)},Vu=async(n,e,t,i,r,s,a=!1)=>{if(!n){e.push(0);return}let o=Rt(),u=o.PTR_SIZE,l=n[0],c=n[1],d=n[3],h=d,f,m;if(l==="string"&&(d==="gpu-buffer"||d==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&d!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(d==="gpu-buffer"){let p=n[2].gpuBuffer;m=pr(fr(l),c);{let x=o.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=x(i,s,p,m)}}else if(d==="ml-tensor"){let p=n[2].mlTensor;m=pr(fr(l),c);let x=o.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=x(i,p,fr(l),c)}else{let p=n[2];if(Array.isArray(p)){m=u*p.length,f=o._malloc(m),t.push(f);for(let x=0;x<p.length;x++){if(typeof p[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);o.setValue(f+x*u,Wn(p[x],t),"*")}}else{let x=o.webnnIsGraphInput,w=o.webnnIsGraphOutput;if(l!=="string"&&x&&w){let b=o.UTF8ToString(r);if(x(i,b)||w(i,b)){let I=fr(l);m=pr(I,c),h="ml-tensor";let R=o.webnnCreateTemporaryTensor,T=o.webnnUploadTensor;if(!R||!T)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let S=await R(i,I,c);T(S,new Uint8Array(p.buffer,p.byteOffset,p.byteLength)),f=S}else m=p.byteLength,f=o._malloc(m),t.push(f),o.HEAPU8.set(new Uint8Array(p.buffer,p.byteOffset,m),f)}else m=p.byteLength,f=o._malloc(m),t.push(f),o.HEAPU8.set(new Uint8Array(p.buffer,p.byteOffset,m),f)}}let y=o.stackSave(),_=o.stackAlloc(4*c.length);try{c.forEach((x,w)=>o.setValue(_+w*u,x,u===4?"i32":"i64"));let p=o._OrtCreateTensor(fr(l),f,m,_,c.length,Bc(h));p===0&&St(`Can't create tensor for input/output. session=${i}, index=${s}.`),e.push(p)}finally{o.stackRestore(y)}},Zd=async(n,e,t,i,r,s)=>{let a=Rt(),o=a.PTR_SIZE,u=Ni.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let l=u[0],c=u[1],d=u[2],h=u[3],f=u[4],m=u[5],y=e.length,_=i.length,p=0,x=[],w=[],b=[],I=[],R=[],T=a.stackSave(),S=a.stackAlloc(y*o),C=a.stackAlloc(y*o),A=a.stackAlloc(_*o),L=a.stackAlloc(_*o);try{[p,x]=uv(s),vr("wasm prepareInputOutputTensor");for(let U=0;U<y;U++)await Vu(t[U],w,I,n,c[e[U]],e[U],f);for(let U=0;U<_;U++)await Vu(r[U],b,I,n,d[i[U]],y+i[U],f);xr("wasm prepareInputOutputTensor");for(let U=0;U<y;U++)a.setValue(S+U*o,w[U],"*"),a.setValue(C+U*o,c[e[U]],"*");for(let U=0;U<_;U++)a.setValue(A+U*o,b[U],"*"),a.setValue(L+U*o,d[i[U]],"*");if(h&&!m){let{handle:U,outputPreferredLocations:z,outputPreferredLocationsEncoded:K}=h;if(c.length!==y)throw new Error(`input count from feeds (${y}) is expected to be always equal to model's input count (${c.length}).`);vr("wasm bindInputsOutputs");for(let W=0;W<y;W++){let ie=e[W];await a._OrtBindInput(U,c[ie],w[W])!==0&&St(`Can't bind input[${W}] for session=${n}.`)}for(let W=0;W<_;W++){let ie=i[W];r[W]?.[3]?(R.push(b[W]),a._OrtBindOutput(U,d[ie],b[W],0)!==0&&St(`Can't bind pre-allocated output[${W}] for session=${n}.`)):a._OrtBindOutput(U,d[ie],0,K[ie])!==0&&St(`Can't bind output[${W}] to ${z[W]} for session=${n}.`)}xr("wasm bindInputsOutputs"),Ni.set(n,[l,c,d,h,f,!0])}a.jsepOnRunStart?.(l),a.webnnOnRunStart?.(l);let F;h?F=await a._OrtRunWithBinding(l,h.handle,_,A,p):F=await a._OrtRun(l,C,S,y,L,_,A,p),F!==0&&St("failed to call OrtRun().");let B=[],N=[];vr("wasm ProcessOutputTensor");for(let U=0;U<_;U++){let z=Number(a.getValue(A+U*o,"*"));if(z===b[U]||R.includes(b[U])){B.push(r[U]),z!==b[U]&&a._OrtReleaseTensor(z)!==0&&St("Can't release tensor.");continue}let K=a.stackSave(),W=a.stackAlloc(4*o),ie=!1,oe,Z=0;try{a._OrtGetTensorData(z,W,W+o,W+2*o,W+3*o)!==0&&St(`Can't access output tensor data on index ${U}.`);let he=o===4?"i32":"i64",me=Number(a.getValue(W,he));Z=a.getValue(W+o,"*");let G=a.getValue(W+o*2,"*"),ue=Number(a.getValue(W+o*3,he)),xe=[];for(let we=0;we<ue;we++)xe.push(Number(a.getValue(G+we*o,he)));a._OrtFree(G)!==0&&St("Can't free memory for tensor dims.");let pe=xe.reduce((we,Oe)=>we*Oe,1);oe=bi(me);let Le=h?.outputPreferredLocations[i[U]];if(oe==="string"){if(Le==="gpu-buffer"||Le==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let we=[];for(let Oe=0;Oe<pe;Oe++){let rt=a.getValue(Z+Oe*o,"*"),lt=a.getValue(Z+(Oe+1)*o,"*"),xt=Oe===pe-1?void 0:lt-rt;we.push(a.UTF8ToString(rt,xt))}B.push([oe,xe,we,"cpu"])}else if(Le==="gpu-buffer"&&pe>0){let we=a.jsepGetBuffer;if(!we)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Oe=we(Z),rt=pr(me,pe);if(rt===void 0||!Pd(oe))throw new Error(`Unsupported data type: ${oe}`);ie=!0,B.push([oe,xe,{gpuBuffer:Oe,download:a.jsepCreateDownloader(Oe,rt,oe),dispose:()=>{a._OrtReleaseTensor(z)!==0&&St("Can't release tensor.")}},"gpu-buffer"])}else if(Le==="ml-tensor"&&pe>0){let we=a.webnnEnsureTensor,Oe=a.webnnIsGraphInputOutputTypeSupported;if(!we||!Oe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(pr(me,pe)===void 0||!Dd(oe))throw new Error(`Unsupported data type: ${oe}`);if(!Oe(n,oe,!1))throw new Error(`preferredLocation "ml-tensor" for ${oe} output is not supported by current WebNN Context.`);let rt=await we(n,Z,me,xe,!1);ie=!0,B.push([oe,xe,{mlTensor:rt,download:a.webnnCreateMLTensorDownloader(Z,oe),dispose:()=>{a.webnnReleaseTensorId(Z),a._OrtReleaseTensor(z)}},"ml-tensor"])}else if(Le==="ml-tensor-cpu-output"&&pe>0){let we=a.webnnCreateMLTensorDownloader(Z,oe)(),Oe=B.length;ie=!0,N.push((async()=>{let rt=[Oe,await we];return a.webnnReleaseTensorId(Z),a._OrtReleaseTensor(z),rt})()),B.push([oe,xe,[],"cpu"])}else{let we=qo(oe),Oe=new we(pe);new Uint8Array(Oe.buffer,Oe.byteOffset,Oe.byteLength).set(a.HEAPU8.subarray(Z,Z+Oe.byteLength)),B.push([oe,xe,Oe,"cpu"])}}finally{a.stackRestore(K),oe==="string"&&Z&&a._free(Z),ie||a._OrtReleaseTensor(z)}}h&&!f&&(a._OrtClearBoundOutputs(h.handle)!==0&&St("Can't clear bound outputs."),Ni.set(n,[l,c,d,h,f,!1]));for(let[U,z]of await Promise.all(N))B[U][2]=z;return xr("wasm ProcessOutputTensor"),B}finally{a.webnnOnRunEnd?.(l),a.stackRestore(T),w.forEach(F=>a._OrtReleaseTensor(F)),b.forEach(F=>a._OrtReleaseTensor(F)),I.forEach(F=>a._free(F)),p!==0&&a._OrtReleaseRunOptions(p),x.forEach(F=>a._free(F))}},Jd=n=>{let e=Rt(),t=Ni.get(n);if(!t)throw new Error("invalid session id");let i=t[0],r=e._OrtEndProfiling(i);r===0&&St("Can't get an profile file name."),e._OrtFree(r)},Qd=n=>{let e=[];for(let t of n){let i=t[2];!Array.isArray(i)&&"buffer"in i&&e.push(i.buffer)}return e}}),ki,$n,Yr,Ys,Ks,fo,Hu,po,sr,ar,s0,uw,cw,dw,hw,fw,pw,mw,gw=fe(()=>{Nn(),lw(),Ir(),Rd(),ki=()=>!!Nt.wasm.proxy&&typeof document<"u",Yr=!1,Ys=!1,Ks=!1,po=new Map,sr=(n,e)=>{let t=po.get(n);t?t.push(e):po.set(n,[e])},ar=()=>{if(Yr||!Ys||Ks||!$n)throw new Error("worker not ready")},s0=n=>{switch(n.data.type){case"init-wasm":Yr=!1,n.data.err?(Ks=!0,Hu[1](n.data.err)):(Ys=!0,Hu[0]()),fo&&(URL.revokeObjectURL(fo),fo=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=po.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}}},uw=async()=>{if(!Ys){if(Yr)throw new Error("multiple calls to 'initWasm()' detected.");if(Ks)throw new Error("previous call to 'initWasm()' failed.");if(Yr=!0,ki())return new Promise((n,e)=>{$n?.terminate(),ov().then(([t,i])=>{try{$n=i,$n.onerror=s=>e(s),$n.onmessage=s0,Hu=[n,e];let r={type:"init-wasm",in:Nt};!r.in.wasm.wasmPaths&&(t||zc)&&(r.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href,import.meta.url).href}),$n.postMessage(r),fo=t}catch(r){e(r)}},e)});try{await Id(Nt.wasm),await jd(Nt),Ys=!0}catch(n){throw Ks=!0,n}finally{Yr=!1}}},cw=async n=>{if(ki())return ar(),new Promise((e,t)=>{sr("init-ep",[e,t]);let i={type:"init-ep",in:{epName:n,env:Nt}};$n.postMessage(i)});await Xd(Nt,n)},dw=async n=>ki()?(ar(),new Promise((e,t)=>{sr("copy-from",[e,t]);let i={type:"copy-from",in:{buffer:n}};$n.postMessage(i,[n.buffer])})):zo(n),hw=async(n,e)=>{if(ki()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return ar(),new Promise((t,i)=>{sr("create",[t,i]);let r={type:"create",in:{model:n,options:{...e}}},s=[];n instanceof Uint8Array&&s.push(n.buffer),$n.postMessage(r,s)})}else return Yd(n,e)},fw=async n=>{if(ki())return ar(),new Promise((e,t)=>{sr("release",[e,t]);let i={type:"release",in:n};$n.postMessage(i)});Kd(n)},pw=async(n,e,t,i,r,s)=>{if(ki()){if(t.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(r.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return ar(),new Promise((a,o)=>{sr("run",[a,o]);let u=t,l={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:i,options:s}};$n.postMessage(l,Qd(u))})}else return Zd(n,e,t,i,r,s)},mw=async n=>{if(ki())return ar(),new Promise((e,t)=>{sr("end-profiling",[e,t]);let i={type:"end-profiling",in:n};$n.postMessage(i)});Jd(n)}}),Gu,a0,_w,wR=fe(()=>{Nn(),gw(),Ge(),Cd(),dv(),Gu=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},a0=n=>{switch(n[3]){case"cpu":return new un(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!Pd(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:t,download:i,dispose:r}=n[2];return un.fromGpuBuffer(t,{dataType:e,dims:n[1],download:i,dispose:r})}case"ml-tensor":{let e=n[0];if(!Dd(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:t,download:i,dispose:r}=n[2];return un.fromMLTensor(t,{dataType:e,dims:n[1],download:i,dispose:r})}default:throw new Error(`invalid data location: ${n[3]}`)}},_w=class{async fetchModelAndCopyToWasmMemory(n){return dw(await Ld(n))}async loadModel(n,e){li();let t;typeof n=="string"?t=await this.fetchModelAndCopyToWasmMemory(n):t=n,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await hw(t,e),jn()}async dispose(){return fw(this.sessionId)}async run(n,e,t){li();let i=[],r=[];Object.entries(n).forEach(d=>{let h=d[0],f=d[1],m=this.inputNames.indexOf(h);if(m===-1)throw new Error(`invalid input '${h}'`);i.push(f),r.push(m)});let s=[],a=[];Object.entries(e).forEach(d=>{let h=d[0],f=d[1],m=this.outputNames.indexOf(h);if(m===-1)throw new Error(`invalid output '${h}'`);s.push(f),a.push(m)});let o=i.map((d,h)=>Gu(d,()=>`input "${this.inputNames[r[h]]}"`)),u=s.map((d,h)=>d?Gu(d,()=>`output "${this.outputNames[a[h]]}"`):null),l=await pw(this.sessionId,r,o,a,u,t),c={};for(let d=0;d<l.length;d++)c[this.outputNames[a[d]]]=s[d]??a0(l[d]);return jn(),c}startProfiling(){}endProfiling(){mw(this.sessionId)}}}),yw={};bs(yw,{OnnxruntimeWebAssemblyBackend:()=>ed,initializeFlags:()=>Qc,wasmBackend:()=>vw});var Qc,ed,vw,SR=fe(()=>{Nn(),gw(),wR(),Qc=()=>{(typeof Nt.wasm.initTimeout!="number"||Nt.wasm.initTimeout<0)&&(Nt.wasm.initTimeout=0);let n=Nt.wasm.simd;if(typeof n!="boolean"&&n!==void 0&&n!=="fixed"&&n!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${n}". Reset it to \`false\` and ignore SIMD feature checking.`),Nt.wasm.simd=!1),typeof Nt.wasm.proxy!="boolean"&&(Nt.wasm.proxy=!1),typeof Nt.wasm.trace!="boolean"&&(Nt.wasm.trace=!1),typeof Nt.wasm.numThreads!="number"||!Number.isInteger(Nt.wasm.numThreads)||Nt.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Nt.wasm.numThreads=1;else{let e=typeof navigator>"u"?l3("node:os").cpus().length:navigator.hardwareConcurrency;Nt.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},ed=class{async init(n){Qc(),await uw(),await cw(n)}async createInferenceSessionHandler(n,e){let t=new _w;return await t.loadModel(n,e),t}},vw=new ed});Nn();Nn();Nn();var MR="1.26.0";{let n=(SR(),ca(yw)).wasmBackend;ns("webgpu",n,5),ns("webnn",n,5),ns("cpu",n,10),ns("wasm",n,10)}Object.defineProperty(Nt.versions,"web",{value:MR,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const td="torso_link",ER=["left_hip_pitch_joint","right_hip_pitch_joint","waist_yaw_joint","left_hip_roll_joint","right_hip_roll_joint","waist_roll_joint","left_hip_yaw_joint","right_hip_yaw_joint","waist_pitch_joint","left_knee_joint","right_knee_joint","left_shoulder_pitch_joint","right_shoulder_pitch_joint","left_ankle_pitch_joint","right_ankle_pitch_joint","left_shoulder_roll_joint","right_shoulder_roll_joint","left_ankle_roll_joint","right_ankle_roll_joint","left_shoulder_yaw_joint","right_shoulder_yaw_joint","left_elbow_joint","right_elbow_joint","left_wrist_roll_joint","right_wrist_roll_joint","left_wrist_pitch_joint","right_wrist_pitch_joint","left_wrist_yaw_joint","right_wrist_yaw_joint"],xw=["pelvis","left_hip_pitch_link","right_hip_pitch_link","waist_yaw_link","left_hip_roll_link","right_hip_roll_link","waist_roll_link","left_hip_yaw_link","right_hip_yaw_link","torso_link","left_knee_link","right_knee_link","left_shoulder_pitch_link","right_shoulder_pitch_link","left_ankle_pitch_link","right_ankle_pitch_link","left_shoulder_roll_link","right_shoulder_roll_link","left_ankle_roll_link","right_ankle_roll_link","left_shoulder_yaw_link","right_shoulder_yaw_link","left_elbow_link","right_elbow_link","left_wrist_roll_link","right_wrist_roll_link","left_wrist_pitch_link","right_wrist_pitch_link","left_wrist_yaw_link","right_wrist_yaw_link"];function jo(n){const e=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]+n[3]*n[3]);return e<1e-12?new Float32Array([1,0,0,0]):new Float32Array([n[0]/e,n[1]/e,n[2]/e,n[3]/e])}function Bo(n){const e=jo(n);return new Float32Array([e[0],-e[1],-e[2],-e[3]])}function TR(n,e){const t=n[0],i=n[1],r=n[2],s=n[3],a=e[0],o=e[1],u=e[2],l=e[3];return jo(new Float32Array([t*a-i*o-r*u-s*l,t*o+i*a+r*l-s*u,t*u-i*l+r*a+s*o,t*l+i*u-r*o+s*a]))}function AR(n){const e=jo(n),t=e[0],i=e[1],r=e[2],s=e[3];return new Float32Array([1-2*(r*r+s*s),2*(i*r-s*t),2*(i*s+r*t),2*(i*r+s*t),1-2*(i*i+s*s),2*(r*s-i*t),2*(i*s-r*t),2*(r*s+i*t),1-2*(i*i+r*r)])}function rs(n,e){const t=AR(n);return new Float32Array([t[0]*e[0]+t[1]*e[1]+t[2]*e[2],t[3]*e[0]+t[4]*e[1]+t[5]*e[2],t[6]*e[0]+t[7]*e[1]+t[8]*e[2]])}function o0(n){const e=jo(n),t=e[0],i=e[1],r=e[2],s=e[3],a=2*(t*s+i*r),o=1-2*(r*r+s*s);return Math.atan2(a,o)}Nt.wasm.numThreads=1;const CR="models/transformer_policy.onnx",RR="models/policy_metadata.json";class IR{constructor(){this.session=null,this.historyLen=10,this.cmdLen=21,this.numActions=29,this.histFeatDim=93,this.cmdFeatDim=41,this.visionObsDim=374}async init(){const e=await fetch(RR).then(r=>r.json());this.historyLen=e.history_len,this.cmdLen=e.cmd_len,this.histFeatDim=e.hist_feat_dim,this.cmdFeatDim=e.cmd_feat_dim,this.visionObsDim=e.vision_obs_dim||0,this.defaultJointPos=new Float32Array(e.default_joint_pos),this.jointStiffness=new Float32Array(e.joint_stiffness),this.jointDamping=new Float32Array(e.joint_damping);const t=e.action_scale;Array.isArray(t)?this.actionScale=new Float32Array(t):this.actionScale=new Float32Array(29).fill(t),this.kp=this.jointStiffness,this.kd=this.jointDamping,this.jointNames=e.joint_names||ER,this.commandHist=new Float32Array(this.historyLen*2*29),this.baseAngVelHist=new Float32Array(this.historyLen*3),this.jointPosHist=new Float32Array(this.historyLen*29),this.jointVelHist=new Float32Array(this.historyLen*29),this.actionHist=new Float32Array(this.historyLen*29),this.proprioHist=new Float32Array(this.historyLen*this.histFeatDim);const i=await fetch(CR).then(r=>r.arrayBuffer());this.session=await Wo.create(i,{executionProviders:["wasm"],graphOptimizationLevel:"all"}),this.inputNames=this.session.inputNames,this.outputName=this.session.outputNames[0]}setJointMapping(e,t){const i=new Int32Array(29),r=e.mjtObj.mjOBJ_ACTUATOR.value,s=e.mjtObj.mjOBJ_JOINT.value;for(let a=0;a<29;a++){const o=this.jointNames[a],u=e.mj_name2id(t,r,o);if(u<0)throw new Error(`Actuator '${o}' not found`);const l=e.mj_name2id(t,s,o);if(l<0)throw new Error(`Joint '${o}' not found`);const c=t.jnt_qposadr[l]-7,d=t.jnt_dofadr[l]-6;if(c!==u||d!==u)throw new Error(`Joint/actuator order mismatch for '${o}': act=${u}, qpos=${c}, qvel=${d}`);i[a]=u}this.jointMapping=i}resetHistory(e,t,i){this.commandHist.fill(0),this.baseAngVelHist.fill(0),this.jointPosHist.fill(0),this.jointVelHist.fill(0),this.actionHist.fill(0),this.proprioHist.fill(0);const r=e.getCurrentCommand(t);for(let d=0;d<this.historyLen;d++)this.commandHist.set(r,d*58);const s=i.getQpos(),a=i.getQvel(),o=new Float32Array([a[3],a[4],a[5]]),u=new Float32Array(29),l=new Float32Array(29);for(let d=0;d<29;d++)u[d]=s[7+this.jointMapping[d]]-this.defaultJointPos[d],l[d]=a[6+this.jointMapping[d]];const c=this._computeProprio(e,t,new Float32Array(29),i);for(let d=0;d<this.historyLen;d++)this.baseAngVelHist.set(o,d*3),this.jointPosHist.set(u,d*29),this.jointVelHist.set(l,d*29),this.proprioHist.set(c,d*this.histFeatDim)}updateHistory(e,t,i,r){this._shiftBuffer(this.commandHist,58),this._shiftBuffer(this.baseAngVelHist,3),this._shiftBuffer(this.jointPosHist,29),this._shiftBuffer(this.jointVelHist,29),this._shiftBuffer(this.actionHist,29),this._shiftBuffer(this.proprioHist,this.histFeatDim);const s=e.getCurrentCommand(t);this.commandHist.set(s,(this.historyLen-1)*58);const a=r.getQpos(),o=r.getQvel(),u=new Float32Array([o[3],o[4],o[5]]);this.baseAngVelHist.set(u,(this.historyLen-1)*3);const l=new Float32Array(29),c=new Float32Array(29);for(let h=0;h<29;h++)l[h]=a[7+this.jointMapping[h]]-this.defaultJointPos[h],c[h]=o[6+this.jointMapping[h]];this.jointPosHist.set(l,(this.historyLen-1)*29),this.jointVelHist.set(c,(this.historyLen-1)*29),this.actionHist.set(i,(this.historyLen-1)*29);const d=this._computeProprio(e,t,i,r);this.proprioHist.set(d,(this.historyLen-1)*this.histFeatDim)}_computeProprio(e,t,i,r){const s=r.getQpos(),a=r.getQvel(),o=new Float32Array([s[3],s[4],s[5],s[6]]),u=new Float32Array([a[3],a[4],a[5]]),l=new Float32Array(29),c=new Float32Array(29);for(let m=0;m<29;m++)l[m]=s[7+this.jointMapping[m]]-this.defaultJointPos[m],c[m]=a[6+this.jointMapping[m]];const d=Bo(o),h=rs(d,new Float32Array([0,0,-1])),f=new Float32Array(this.histFeatDim);return f.set(h,0),f.set(u,3),f.set(l,6),f.set(c,35),f.set(i,64),f}buildObservation(e,t,i,r,s){const a=e.getFutureRobotMotion(t),o=2060,u=new Float32Array(o);let l=0;u.set(this.commandHist,l),l+=580,u.set(a,l),l+=580,u.set(this.baseAngVelHist,l),l+=30,u.set(this.jointPosHist,l),l+=290,u.set(this.jointVelHist,l),l+=290,u.set(this.actionHist,l);const c=this.proprioHist.subarray((this.historyLen-1)*this.histFeatDim,this.historyLen*this.histFeatDim),d=new Float32Array(o+this.histFeatDim);d.set(u,0),d.set(c,o);const h=new Float32Array(this.proprioHist),f=e.getCommandWindow(t,this.cmdFeatDim),m={policy_obs:d,history_tokens:h,cmd_tokens:f};if(this.visionObsDim>0&&i)if(this.visionObsDim===i.heights.length)m.vision=i.heights;else{const y=new Float32Array(this.visionObsDim);y.set(i.heights,0),y.set(i.validMask,i.heights.length),m.vision=y}return m}async predict(e){const t={};t.policy_obs=new un("float32",e.policy_obs,[1,e.policy_obs.length]),t.history_tokens=new un("float32",e.history_tokens,[1,this.historyLen,this.histFeatDim]),t.cmd_tokens=new un("float32",e.cmd_tokens,[1,this.cmdLen,this.cmdFeatDim]),e.vision&&this.inputNames.includes("vision")&&(t.vision=new un("float32",e.vision,[1,e.vision.length]));const r=(await this.session.run(t))[this.outputName].data;return new Float32Array(r)}_shiftBuffer(e,t){e.copyWithin(0,t)}}const ti=187,l0=20,$R=1.6,PR=1,DR=.1,LR=32,NR=.001;class u0{constructor(e){this.app=e,this.gridXY=kR($R,PR,DR),this.lastResult=null;const t=e.model;this.geomgroup=[1,1,1,1,1,1];const i=new Set,r=new Set;for(let s=0;s<t.ngeom;s++){const a=t.geom_group[s];t.geom_bodyid[s]!==0?i.add(a):r.add(a)}for(const s of i)s>=0&&s<6&&!r.has(s)&&(this.geomgroup[s]=0);this.terrainGeomIds=new Set;for(let s=0;s<t.ngeom;s++)t.geom_bodyid[s]===0&&this.terrainGeomIds.add(s)}_geomWorldBottomZ(e){const t=this.app.model,i=this.app.data,r=t.geom_aabb,s=[r[e*6],r[e*6+1],r[e*6+2]],a=[r[e*6+3],r[e*6+4],r[e*6+5]],o=i.geom_xmat,u=e*9,l=[o[u],o[u+1],o[u+2],o[u+3],o[u+4],o[u+5],o[u+6],o[u+7],o[u+8]],d=i.geom_xpos[e*3+2]+l[6]*s[0]+l[7]*s[1]+l[8]*s[2],h=Math.abs(l[6])*a[0]+Math.abs(l[7])*a[1]+Math.abs(l[8])*a[2];return d-h}_raycastDown(e,t,i){const r=[e,t,i],s=[0,0,-1];this._geomidBuf||(this._geomidBuf=new Int32Array(1));for(let a=0;a<LR;a++){this._geomidBuf[0]=-1;const o=this.app.mujoco.mj_ray(this.app.model,this.app.data,r,s,this.geomgroup,1,-1,this._geomidBuf);if(o<0)return{hitZ:NaN,valid:!1};const u=r[2]-o,l=this._geomidBuf[0];if(this.terrainGeomIds.has(l))return{hitZ:u,valid:!0};const c=this._geomWorldBottomZ(l)-NR;r[2]=Math.min(c,u-.02)}return{hitZ:NaN,valid:!1}}compute(){const e=this.app.getBodyPos(td),t=this.app.getBodyQuat(td);if(!e||!t)return this._emptyResult();const i=o0(t),r=Math.cos(i),s=Math.sin(i),a=new Float32Array(ti),o=new Array(ti),u=new Float32Array(ti),l=e[2]+l0;for(let c=0;c<ti;c++){const d=this.gridXY[c*2],h=this.gridXY[c*2+1],f=e[0]+r*d-s*h,m=e[1]+s*d+r*h,{hitZ:y,valid:_}=this._raycastDown(f,m,l);_?(a[c]=Math.max(-3,Math.min(3,e[2]-y)),o[c]=[f,m,y],u[c]=1):(a[c]=Math.max(-3,Math.min(3,e[2]-30)),o[c]=[f,m,NaN],u[c]=0)}return this.lastResult={heights:a,hitPos:o,validMask:u},this.lastResult}_emptyResult(){return{heights:new Float32Array(ti).fill(-3),hitPos:new Array(ti).fill(null),validMask:new Float32Array(ti)}}computeAMP(){const e=new Float32Array(ti),t=this.app.getBodyPos("pelvis"),i=this.app.getBodyQuat("pelvis");if(!t||!i)return e;const r=o0(i),s=Math.cos(r),a=Math.sin(r),o=t[2]+l0;this._ampGeomGroup||(this._ampGeomGroup=[1,0,1,0,0,0]),this._ampGeomId||(this._ampGeomId=new Int32Array(1)),this._ampPelvisBodyId===void 0&&(this._ampPelvisBodyId=this.app.mujoco.mj_name2id(this.app.model,this.app.mujoco.mjtObj.mjOBJ_BODY.value,"pelvis"));const u=this._ampPelvisBodyId,l=[0,0,-1];this._ampHitPos||(this._ampHitPos=new Array(ti));for(let c=0;c<ti;c++){const d=this.gridXY[c*2],h=this.gridXY[c*2+1],f=t[0]+s*d-a*h,m=t[1]+a*d+s*h;this._ampGeomId[0]=-1;const y=this.app.mujoco.mj_ray(this.app.model,this.app.data,[f,m,o],l,this._ampGeomGroup,1,u,this._ampGeomId),_=y>0;let p=_?t[2]-(o-y):5;p>5&&(p=5),e[c]=p*.2,this._ampHitPos[c]=_?[f,m,o-y]:null}return this.lastAMP={heights:e,hitPos:this._ampHitPos},e}}function kR(n,e,t){const i=[];for(let o=-n/2;o<=n/2+.5*t;o+=t)i.push(o);const r=[];for(let o=-e/2;o<=e/2+.5*t;o+=t)r.push(o);const s=new Float32Array(i.length*r.length*2);let a=0;for(const o of r)for(const u of i)s[a++]=u,s[a++]=o;return s}function ws(n){let e=n.length;for(;--e>=0;)n[e]=0}const OR=3,UR=258,bw=29,zR=256,BR=zR+1+bw,ww=30,FR=512,VR=new Array((BR+2)*2);ws(VR);const HR=new Array(ww*2);ws(HR);const GR=new Array(FR);ws(GR);const WR=new Array(UR-OR+1);ws(WR);const qR=new Array(bw);ws(qR);const jR=new Array(ww);ws(jR);const XR=(n,e,t,i)=>{let r=n&65535|0,s=n>>>16&65535|0,a=0;for(;t!==0;){a=t>2e3?2e3:t,t-=a;do r=r+e[i++]|0,s=s+r|0;while(--a);r%=65521,s%=65521}return r|s<<16|0};var nd=XR;const YR=()=>{let n,e=[];for(var t=0;t<256;t++){n=t;for(var i=0;i<8;i++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e},KR=new Uint32Array(YR()),ZR=(n,e,t,i)=>{const r=KR,s=i+t;n^=-1;for(let a=i;a<s;a++)n=n>>>8^r[(n^e[a])&255];return n^-1};var ni=ZR,id={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},Sw={Z_NO_FLUSH:0,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_DEFLATED:8};const JR=(n,e)=>Object.prototype.hasOwnProperty.call(n,e);var QR=function(n){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const t=e.shift();if(t){if(typeof t!="object")throw new TypeError(t+"must be non-object");for(const i in t)JR(t,i)&&(n[i]=t[i])}}return n},eI=n=>{let e=0;for(let i=0,r=n.length;i<r;i++)e+=n[i].length;const t=new Uint8Array(e);for(let i=0,r=0,s=n.length;i<s;i++){let a=n[i];t.set(a,r),r+=a.length}return t},Mw={assign:QR,flattenChunks:eI};let Ew=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{Ew=!1}const ha=new Uint8Array(256);for(let n=0;n<256;n++)ha[n]=n>=252?6:n>=248?5:n>=240?4:n>=224?3:n>=192?2:1;ha[254]=ha[254]=1;var tI=n=>{if(typeof TextEncoder=="function"&&TextEncoder.prototype.encode)return new TextEncoder().encode(n);let e,t,i,r,s,a=n.length,o=0;for(r=0;r<a;r++)t=n.charCodeAt(r),(t&64512)===55296&&r+1<a&&(i=n.charCodeAt(r+1),(i&64512)===56320&&(t=65536+(t-55296<<10)+(i-56320),r++)),o+=t<128?1:t<2048?2:t<65536?3:4;for(e=new Uint8Array(o),s=0,r=0;s<o;r++)t=n.charCodeAt(r),(t&64512)===55296&&r+1<a&&(i=n.charCodeAt(r+1),(i&64512)===56320&&(t=65536+(t-55296<<10)+(i-56320),r++)),t<128?e[s++]=t:t<2048?(e[s++]=192|t>>>6,e[s++]=128|t&63):t<65536?(e[s++]=224|t>>>12,e[s++]=128|t>>>6&63,e[s++]=128|t&63):(e[s++]=240|t>>>18,e[s++]=128|t>>>12&63,e[s++]=128|t>>>6&63,e[s++]=128|t&63);return e};const nI=(n,e)=>{if(e<65534&&n.subarray&&Ew)return String.fromCharCode.apply(null,n.length===e?n:n.subarray(0,e));let t="";for(let i=0;i<e;i++)t+=String.fromCharCode(n[i]);return t};var iI=(n,e)=>{const t=e||n.length;if(typeof TextDecoder=="function"&&TextDecoder.prototype.decode)return new TextDecoder().decode(n.subarray(0,e));let i,r;const s=new Array(t*2);for(r=0,i=0;i<t;){let a=n[i++];if(a<128){s[r++]=a;continue}let o=ha[a];if(o>4){s[r++]=65533,i+=o-1;continue}for(a&=o===2?31:o===3?15:7;o>1&&i<t;)a=a<<6|n[i++]&63,o--;if(o>1){s[r++]=65533;continue}a<65536?s[r++]=a:(a-=65536,s[r++]=55296|a>>10&1023,s[r++]=56320|a&1023)}return nI(s,r)},rI=(n,e)=>{e=e||n.length,e>n.length&&(e=n.length);let t=e-1;for(;t>=0&&(n[t]&192)===128;)t--;return t<0||t===0?e:t+ha[n[t]]>e?t:e},rd={string2buf:tI,buf2string:iI,utf8border:rI};function sI(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}var aI=sI;const mo=16209,oI=16191;var lI=function(e,t){let i,r,s,a,o,u,l,c,d,h,f,m,y,_,p,x,w,b,I,R,T,S,C,A;const L=e.state;i=e.next_in,C=e.input,r=i+(e.avail_in-5),s=e.next_out,A=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),u=L.dmax,l=L.wsize,c=L.whave,d=L.wnext,h=L.window,f=L.hold,m=L.bits,y=L.lencode,_=L.distcode,p=(1<<L.lenbits)-1,x=(1<<L.distbits)-1;e:do{m<15&&(f+=C[i++]<<m,m+=8,f+=C[i++]<<m,m+=8),w=y[f&p];t:for(;;){if(b=w>>>24,f>>>=b,m-=b,b=w>>>16&255,b===0)A[s++]=w&65535;else if(b&16){I=w&65535,b&=15,b&&(m<b&&(f+=C[i++]<<m,m+=8),I+=f&(1<<b)-1,f>>>=b,m-=b),m<15&&(f+=C[i++]<<m,m+=8,f+=C[i++]<<m,m+=8),w=_[f&x];n:for(;;){if(b=w>>>24,f>>>=b,m-=b,b=w>>>16&255,b&16){if(R=w&65535,b&=15,m<b&&(f+=C[i++]<<m,m+=8,m<b&&(f+=C[i++]<<m,m+=8)),R+=f&(1<<b)-1,R>u){e.msg="invalid distance too far back",L.mode=mo;break e}if(f>>>=b,m-=b,b=s-a,R>b){if(b=R-b,b>c&&L.sane){e.msg="invalid distance too far back",L.mode=mo;break e}if(T=0,S=h,d===0){if(T+=l-b,b<I){I-=b;do A[s++]=h[T++];while(--b);T=s-R,S=A}}else if(d<b){if(T+=l+d-b,b-=d,b<I){I-=b;do A[s++]=h[T++];while(--b);if(T=0,d<I){b=d,I-=b;do A[s++]=h[T++];while(--b);T=s-R,S=A}}}else if(T+=d-b,b<I){I-=b;do A[s++]=h[T++];while(--b);T=s-R,S=A}for(;I>2;)A[s++]=S[T++],A[s++]=S[T++],A[s++]=S[T++],I-=3;I&&(A[s++]=S[T++],I>1&&(A[s++]=S[T++]))}else{T=s-R;do A[s++]=A[T++],A[s++]=A[T++],A[s++]=A[T++],I-=3;while(I>2);I&&(A[s++]=A[T++],I>1&&(A[s++]=A[T++]))}}else if((b&64)===0){w=_[(w&65535)+(f&(1<<b)-1)];continue n}else{e.msg="invalid distance code",L.mode=mo;break e}break}}else if((b&64)===0){w=y[(w&65535)+(f&(1<<b)-1)];continue t}else if(b&32){L.mode=oI;break e}else{e.msg="invalid literal/length code",L.mode=mo;break e}break}}while(i<r&&s<o);I=m>>3,i-=I,m-=I<<3,f&=(1<<m)-1,e.next_in=i,e.next_out=s,e.avail_in=i<r?5+(r-i):5-(i-r),e.avail_out=s<o?257+(o-s):257-(s-o),L.hold=f,L.bits=m};const Kr=15,c0=852,d0=592,h0=0,Wu=1,f0=2,uI=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),cI=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),dI=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),hI=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),fI=(n,e,t,i,r,s,a,o)=>{const u=o.bits;let l=0,c=0,d=0,h=0,f=0,m=0,y=0,_=0,p=0,x=0,w,b,I,R,T,S=null,C;const A=new Uint16Array(Kr+1),L=new Uint16Array(Kr+1);let F=null,B,N,U;for(l=0;l<=Kr;l++)A[l]=0;for(c=0;c<i;c++)A[e[t+c]]++;for(f=u,h=Kr;h>=1&&A[h]===0;h--);if(f>h&&(f=h),h===0)return r[s++]=1<<24|64<<16|0,r[s++]=1<<24|64<<16|0,o.bits=1,0;for(d=1;d<h&&A[d]===0;d++);for(f<d&&(f=d),_=1,l=1;l<=Kr;l++)if(_<<=1,_-=A[l],_<0)return-1;if(_>0&&(n===h0||h!==1))return-1;for(L[1]=0,l=1;l<Kr;l++)L[l+1]=L[l]+A[l];for(c=0;c<i;c++)e[t+c]!==0&&(a[L[e[t+c]]++]=c);if(n===h0?(S=F=a,C=20):n===Wu?(S=uI,F=cI,C=257):(S=dI,F=hI,C=0),x=0,c=0,l=d,T=s,m=f,y=0,I=-1,p=1<<f,R=p-1,n===Wu&&p>c0||n===f0&&p>d0)return 1;for(;;){B=l-y,a[c]+1<C?(N=0,U=a[c]):a[c]>=C?(N=F[a[c]-C],U=S[a[c]-C]):(N=96,U=0),w=1<<l-y,b=1<<m,d=b;do b-=w,r[T+(x>>y)+b]=B<<24|N<<16|U|0;while(b!==0);for(w=1<<l-1;x&w;)w>>=1;if(w!==0?(x&=w-1,x+=w):x=0,c++,--A[l]===0){if(l===h)break;l=e[t+a[c]]}if(l>f&&(x&R)!==I){for(y===0&&(y=f),T+=d,m=l-y,_=1<<m;m+y<h&&(_-=A[m+y],!(_<=0));)m++,_<<=1;if(p+=1<<m,n===Wu&&p>c0||n===f0&&p>d0)return 1;I=x&R,r[I]=f<<24|m<<16|T-s|0}}return x!==0&&(r[T+x]=l-y<<24|64<<16|0),o.bits=f,0};var la=fI;const pI=0,Tw=1,Aw=2,{Z_FINISH:p0,Z_BLOCK:mI,Z_TREES:go,Z_OK:Ar,Z_STREAM_END:gI,Z_NEED_DICT:_I,Z_STREAM_ERROR:Ln,Z_DATA_ERROR:Cw,Z_MEM_ERROR:Rw,Z_BUF_ERROR:yI,Z_DEFLATED:m0}=Sw,Xo=16180,g0=16181,_0=16182,y0=16183,v0=16184,x0=16185,b0=16186,w0=16187,S0=16188,M0=16189,Fo=16190,_i=16191,qu=16192,E0=16193,ju=16194,T0=16195,A0=16196,C0=16197,R0=16198,_o=16199,yo=16200,I0=16201,$0=16202,P0=16203,D0=16204,L0=16205,Xu=16206,N0=16207,k0=16208,Ut=16209,Iw=16210,$w=16211,vI=852,xI=592,bI=15,wI=bI,O0=n=>(n>>>24&255)+(n>>>8&65280)+((n&65280)<<8)+((n&255)<<24);function SI(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Pr=n=>{if(!n)return 1;const e=n.state;return!e||e.strm!==n||e.mode<Xo||e.mode>$w?1:0},Pw=n=>{if(Pr(n))return Ln;const e=n.state;return n.total_in=n.total_out=e.total=0,n.msg="",e.wrap&&(n.adler=e.wrap&1),e.mode=Xo,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(vI),e.distcode=e.distdyn=new Int32Array(xI),e.sane=1,e.back=-1,Ar},Dw=n=>{if(Pr(n))return Ln;const e=n.state;return e.wsize=0,e.whave=0,e.wnext=0,Pw(n)},Lw=(n,e)=>{let t;if(Pr(n))return Ln;const i=n.state;return e<0?(t=0,e=-e):(t=(e>>4)+5,e<48&&(e&=15)),e&&(e<8||e>15)?Ln:(i.window!==null&&i.wbits!==e&&(i.window=null),i.wrap=t,i.wbits=e,Dw(n))},Nw=(n,e)=>{if(!n)return Ln;const t=new SI;n.state=t,t.strm=n,t.window=null,t.mode=Xo;const i=Lw(n,e);return i!==Ar&&(n.state=null),i},MI=n=>Nw(n,wI);let U0=!0,Yu,Ku;const EI=n=>{if(U0){Yu=new Int32Array(512),Ku=new Int32Array(32);let e=0;for(;e<144;)n.lens[e++]=8;for(;e<256;)n.lens[e++]=9;for(;e<280;)n.lens[e++]=7;for(;e<288;)n.lens[e++]=8;for(la(Tw,n.lens,0,288,Yu,0,n.work,{bits:9}),e=0;e<32;)n.lens[e++]=5;la(Aw,n.lens,0,32,Ku,0,n.work,{bits:5}),U0=!1}n.lencode=Yu,n.lenbits=9,n.distcode=Ku,n.distbits=5},kw=(n,e,t,i)=>{let r;const s=n.state;return s.window===null&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(t-s.wsize,t),0),s.wnext=0,s.whave=s.wsize):(r=s.wsize-s.wnext,r>i&&(r=i),s.window.set(e.subarray(t-i,t-i+r),s.wnext),i-=r,i?(s.window.set(e.subarray(t-i,t),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=r,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=r))),0},TI=(n,e)=>{let t,i,r,s,a,o,u,l,c,d,h,f,m,y,_=0,p,x,w,b,I,R,T,S;const C=new Uint8Array(4);let A,L;const F=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Pr(n)||!n.output||!n.input&&n.avail_in!==0)return Ln;t=n.state,t.mode===_i&&(t.mode=qu),a=n.next_out,r=n.output,u=n.avail_out,s=n.next_in,i=n.input,o=n.avail_in,l=t.hold,c=t.bits,d=o,h=u,S=Ar;e:for(;;)switch(t.mode){case Xo:if(t.wrap===0){t.mode=qu;break}for(;c<16;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(t.wrap&2&&l===35615){t.wbits===0&&(t.wbits=15),t.check=0,C[0]=l&255,C[1]=l>>>8&255,t.check=ni(t.check,C,2,0),l=0,c=0,t.mode=g0;break}if(t.head&&(t.head.done=!1),!(t.wrap&1)||(((l&255)<<8)+(l>>8))%31){n.msg="incorrect header check",t.mode=Ut;break}if((l&15)!==m0){n.msg="unknown compression method",t.mode=Ut;break}if(l>>>=4,c-=4,T=(l&15)+8,t.wbits===0&&(t.wbits=T),T>15||T>t.wbits){n.msg="invalid window size",t.mode=Ut;break}t.dmax=1<<t.wbits,t.flags=0,n.adler=t.check=1,t.mode=l&512?M0:_i,l=0,c=0;break;case g0:for(;c<16;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(t.flags=l,(t.flags&255)!==m0){n.msg="unknown compression method",t.mode=Ut;break}if(t.flags&57344){n.msg="unknown header flags set",t.mode=Ut;break}t.head&&(t.head.text=l>>8&1),t.flags&512&&t.wrap&4&&(C[0]=l&255,C[1]=l>>>8&255,t.check=ni(t.check,C,2,0)),l=0,c=0,t.mode=_0;case _0:for(;c<32;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}t.head&&(t.head.time=l),t.flags&512&&t.wrap&4&&(C[0]=l&255,C[1]=l>>>8&255,C[2]=l>>>16&255,C[3]=l>>>24&255,t.check=ni(t.check,C,4,0)),l=0,c=0,t.mode=y0;case y0:for(;c<16;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}t.head&&(t.head.xflags=l&255,t.head.os=l>>8),t.flags&512&&t.wrap&4&&(C[0]=l&255,C[1]=l>>>8&255,t.check=ni(t.check,C,2,0)),l=0,c=0,t.mode=v0;case v0:if(t.flags&1024){for(;c<16;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}t.length=l,t.head&&(t.head.extra_len=l),t.flags&512&&t.wrap&4&&(C[0]=l&255,C[1]=l>>>8&255,t.check=ni(t.check,C,2,0)),l=0,c=0}else t.head&&(t.head.extra=null);t.mode=x0;case x0:if(t.flags&1024&&(f=t.length,f>o&&(f=o),f&&(t.head&&(T=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Uint8Array(t.head.extra_len)),t.head.extra.set(i.subarray(s,s+f),T)),t.flags&512&&t.wrap&4&&(t.check=ni(t.check,i,f,s)),o-=f,s+=f,t.length-=f),t.length))break e;t.length=0,t.mode=b0;case b0:if(t.flags&2048){if(o===0)break e;f=0;do T=i[s+f++],t.head&&T&&t.length<65536&&(t.head.name+=String.fromCharCode(T));while(T&&f<o);if(t.flags&512&&t.wrap&4&&(t.check=ni(t.check,i,f,s)),o-=f,s+=f,T)break e}else t.head&&(t.head.name=null);t.length=0,t.mode=w0;case w0:if(t.flags&4096){if(o===0)break e;f=0;do T=i[s+f++],t.head&&T&&t.length<65536&&(t.head.comment+=String.fromCharCode(T));while(T&&f<o);if(t.flags&512&&t.wrap&4&&(t.check=ni(t.check,i,f,s)),o-=f,s+=f,T)break e}else t.head&&(t.head.comment=null);t.mode=S0;case S0:if(t.flags&512){for(;c<16;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(t.wrap&4&&l!==(t.check&65535)){n.msg="header crc mismatch",t.mode=Ut;break}l=0,c=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),n.adler=t.check=0,t.mode=_i;break;case M0:for(;c<32;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}n.adler=t.check=O0(l),l=0,c=0,t.mode=Fo;case Fo:if(t.havedict===0)return n.next_out=a,n.avail_out=u,n.next_in=s,n.avail_in=o,t.hold=l,t.bits=c,_I;n.adler=t.check=1,t.mode=_i;case _i:if(e===mI||e===go)break e;case qu:if(t.last){l>>>=c&7,c-=c&7,t.mode=Xu;break}for(;c<3;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}switch(t.last=l&1,l>>>=1,c-=1,l&3){case 0:t.mode=E0;break;case 1:if(EI(t),t.mode=_o,e===go){l>>>=2,c-=2;break e}break;case 2:t.mode=A0;break;case 3:n.msg="invalid block type",t.mode=Ut}l>>>=2,c-=2;break;case E0:for(l>>>=c&7,c-=c&7;c<32;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if((l&65535)!==(l>>>16^65535)){n.msg="invalid stored block lengths",t.mode=Ut;break}if(t.length=l&65535,l=0,c=0,t.mode=ju,e===go)break e;case ju:t.mode=T0;case T0:if(f=t.length,f){if(f>o&&(f=o),f>u&&(f=u),f===0)break e;r.set(i.subarray(s,s+f),a),o-=f,s+=f,u-=f,a+=f,t.length-=f;break}t.mode=_i;break;case A0:for(;c<14;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(t.nlen=(l&31)+257,l>>>=5,c-=5,t.ndist=(l&31)+1,l>>>=5,c-=5,t.ncode=(l&15)+4,l>>>=4,c-=4,t.nlen>286||t.ndist>30){n.msg="too many length or distance symbols",t.mode=Ut;break}t.have=0,t.mode=C0;case C0:for(;t.have<t.ncode;){for(;c<3;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}t.lens[F[t.have++]]=l&7,l>>>=3,c-=3}for(;t.have<19;)t.lens[F[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,A={bits:t.lenbits},S=la(pI,t.lens,0,19,t.lencode,0,t.work,A),t.lenbits=A.bits,S){n.msg="invalid code lengths set",t.mode=Ut;break}t.have=0,t.mode=R0;case R0:for(;t.have<t.nlen+t.ndist;){for(;_=t.lencode[l&(1<<t.lenbits)-1],p=_>>>24,x=_>>>16&255,w=_&65535,!(p<=c);){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(w<16)l>>>=p,c-=p,t.lens[t.have++]=w;else{if(w===16){for(L=p+2;c<L;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(l>>>=p,c-=p,t.have===0){n.msg="invalid bit length repeat",t.mode=Ut;break}T=t.lens[t.have-1],f=3+(l&3),l>>>=2,c-=2}else if(w===17){for(L=p+3;c<L;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}l>>>=p,c-=p,T=0,f=3+(l&7),l>>>=3,c-=3}else{for(L=p+7;c<L;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}l>>>=p,c-=p,T=0,f=11+(l&127),l>>>=7,c-=7}if(t.have+f>t.nlen+t.ndist){n.msg="invalid bit length repeat",t.mode=Ut;break}for(;f--;)t.lens[t.have++]=T}}if(t.mode===Ut)break;if(t.lens[256]===0){n.msg="invalid code -- missing end-of-block",t.mode=Ut;break}if(t.lenbits=9,A={bits:t.lenbits},S=la(Tw,t.lens,0,t.nlen,t.lencode,0,t.work,A),t.lenbits=A.bits,S){n.msg="invalid literal/lengths set",t.mode=Ut;break}if(t.distbits=6,t.distcode=t.distdyn,A={bits:t.distbits},S=la(Aw,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,A),t.distbits=A.bits,S){n.msg="invalid distances set",t.mode=Ut;break}if(t.mode=_o,e===go)break e;case _o:t.mode=yo;case yo:if(o>=6&&u>=258){n.next_out=a,n.avail_out=u,n.next_in=s,n.avail_in=o,t.hold=l,t.bits=c,lI(n,h),a=n.next_out,r=n.output,u=n.avail_out,s=n.next_in,i=n.input,o=n.avail_in,l=t.hold,c=t.bits,t.mode===_i&&(t.back=-1);break}for(t.back=0;_=t.lencode[l&(1<<t.lenbits)-1],p=_>>>24,x=_>>>16&255,w=_&65535,!(p<=c);){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(x&&(x&240)===0){for(b=p,I=x,R=w;_=t.lencode[R+((l&(1<<b+I)-1)>>b)],p=_>>>24,x=_>>>16&255,w=_&65535,!(b+p<=c);){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}l>>>=b,c-=b,t.back+=b}if(l>>>=p,c-=p,t.back+=p,t.length=w,x===0){t.mode=L0;break}if(x&32){t.back=-1,t.mode=_i;break}if(x&64){n.msg="invalid literal/length code",t.mode=Ut;break}t.extra=x&15,t.mode=I0;case I0:if(t.extra){for(L=t.extra;c<L;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}t.length+=l&(1<<t.extra)-1,l>>>=t.extra,c-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=$0;case $0:for(;_=t.distcode[l&(1<<t.distbits)-1],p=_>>>24,x=_>>>16&255,w=_&65535,!(p<=c);){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if((x&240)===0){for(b=p,I=x,R=w;_=t.distcode[R+((l&(1<<b+I)-1)>>b)],p=_>>>24,x=_>>>16&255,w=_&65535,!(b+p<=c);){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}l>>>=b,c-=b,t.back+=b}if(l>>>=p,c-=p,t.back+=p,x&64){n.msg="invalid distance code",t.mode=Ut;break}t.offset=w,t.extra=x&15,t.mode=P0;case P0:if(t.extra){for(L=t.extra;c<L;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}t.offset+=l&(1<<t.extra)-1,l>>>=t.extra,c-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){n.msg="invalid distance too far back",t.mode=Ut;break}t.mode=D0;case D0:if(u===0)break e;if(f=h-u,t.offset>f){if(f=t.offset-f,f>t.whave&&t.sane){n.msg="invalid distance too far back",t.mode=Ut;break}f>t.wnext?(f-=t.wnext,m=t.wsize-f):m=t.wnext-f,f>t.length&&(f=t.length),y=t.window}else y=r,m=a-t.offset,f=t.length;f>u&&(f=u),u-=f,t.length-=f;do r[a++]=y[m++];while(--f);t.length===0&&(t.mode=yo);break;case L0:if(u===0)break e;r[a++]=t.length,u--,t.mode=yo;break;case Xu:if(t.wrap){for(;c<32;){if(o===0)break e;o--,l|=i[s++]<<c,c+=8}if(h-=u,n.total_out+=h,t.total+=h,t.wrap&4&&h&&(n.adler=t.check=t.flags?ni(t.check,r,h,a-h):nd(t.check,r,h,a-h)),h=u,t.wrap&4&&(t.flags?l:O0(l))!==t.check){n.msg="incorrect data check",t.mode=Ut;break}l=0,c=0}t.mode=N0;case N0:if(t.wrap&&t.flags){for(;c<32;){if(o===0)break e;o--,l+=i[s++]<<c,c+=8}if(t.wrap&4&&l!==(t.total&4294967295)){n.msg="incorrect length check",t.mode=Ut;break}l=0,c=0}t.mode=k0;case k0:S=gI;break e;case Ut:S=Cw;break e;case Iw:return Rw;case $w:default:return Ln}return n.next_out=a,n.avail_out=u,n.next_in=s,n.avail_in=o,t.hold=l,t.bits=c,(t.wsize||h!==n.avail_out&&t.mode<Ut&&(t.mode<Xu||e!==p0))&&kw(n,n.output,n.next_out,h-n.avail_out),d-=n.avail_in,h-=n.avail_out,n.total_in+=d,n.total_out+=h,t.total+=h,t.wrap&4&&h&&(n.adler=t.check=t.flags?ni(t.check,r,h,n.next_out-h):nd(t.check,r,h,n.next_out-h)),n.data_type=t.bits+(t.last?64:0)+(t.mode===_i?128:0)+(t.mode===_o||t.mode===ju?256:0),(d===0&&h===0||e===p0)&&S===Ar&&(S=yI),S},AI=n=>{if(Pr(n))return Ln;let e=n.state;return e.window&&(e.window=null),n.state=null,Ar},CI=(n,e)=>{if(Pr(n))return Ln;const t=n.state;return(t.wrap&2)===0?Ln:(t.head=e,e.done=!1,Ar)},RI=(n,e)=>{const t=e.length;let i,r,s;return Pr(n)||(i=n.state,i.wrap!==0&&i.mode!==Fo)?Ln:i.mode===Fo&&(r=1,r=nd(r,e,t,0),r!==i.check)?Cw:(s=kw(n,e,t,t),s?(i.mode=Iw,Rw):(i.havedict=1,Ar))};var II=Dw,$I=Lw,PI=Pw,DI=MI,LI=Nw,NI=TI,kI=AI,OI=CI,UI=RI,zI="pako inflate (from Nodeca project)",vi={inflateReset:II,inflateReset2:$I,inflateResetKeep:PI,inflateInit:DI,inflateInit2:LI,inflate:NI,inflateEnd:kI,inflateGetHeader:OI,inflateSetDictionary:UI,inflateInfo:zI};function BI(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}var FI=BI;const Ow=Object.prototype.toString,{Z_NO_FLUSH:VI,Z_FINISH:HI,Z_OK:fa,Z_STREAM_END:Zu,Z_NEED_DICT:Ju,Z_STREAM_ERROR:GI,Z_DATA_ERROR:z0,Z_MEM_ERROR:WI}=Sw;function Yo(n){this.options=Mw.assign({chunkSize:1024*64,windowBits:15,to:""},n||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,e.windowBits===0&&(e.windowBits=-15)),e.windowBits>=0&&e.windowBits<16&&!(n&&n.windowBits)&&(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&(e.windowBits&15)===0&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new aI,this.strm.avail_out=0;let t=vi.inflateInit2(this.strm,e.windowBits);if(t!==fa)throw new Error(id[t]);if(this.header=new FI,vi.inflateGetHeader(this.strm,this.header),e.dictionary&&(typeof e.dictionary=="string"?e.dictionary=rd.string2buf(e.dictionary):Ow.call(e.dictionary)==="[object ArrayBuffer]"&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(t=vi.inflateSetDictionary(this.strm,e.dictionary),t!==fa)))throw new Error(id[t])}Yo.prototype.push=function(n,e){const t=this.strm,i=this.options.chunkSize,r=this.options.dictionary;let s,a,o;if(this.ended)return!1;for(e===~~e?a=e:a=e===!0?HI:VI,Ow.call(n)==="[object ArrayBuffer]"?t.input=new Uint8Array(n):t.input=n,t.next_in=0,t.avail_in=t.input.length;;){for(t.avail_out===0&&(t.output=new Uint8Array(i),t.next_out=0,t.avail_out=i),s=vi.inflate(t,a),s===Ju&&r&&(s=vi.inflateSetDictionary(t,r),s===fa?s=vi.inflate(t,a):s===z0&&(s=Ju));t.avail_in>0&&s===Zu&&t.state.wrap>0&&n[t.next_in]!==0;)vi.inflateReset(t),s=vi.inflate(t,a);switch(s){case GI:case z0:case Ju:case WI:return this.onEnd(s),this.ended=!0,!1}if(o=t.avail_out,t.next_out&&(t.avail_out===0||s===Zu))if(this.options.to==="string"){let u=rd.utf8border(t.output,t.next_out),l=t.next_out-u,c=rd.buf2string(t.output,u);t.next_out=l,t.avail_out=i-l,l&&t.output.set(t.output.subarray(u,u+l),0),this.onData(c)}else this.onData(t.output.length===t.next_out?t.output:t.output.subarray(0,t.next_out));if(!(s===fa&&o===0)){if(s===Zu)return s=vi.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(t.avail_in===0)break}}return!0};Yo.prototype.onData=function(n){this.chunks.push(n)};Yo.prototype.onEnd=function(n){n===fa&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=Mw.flattenChunks(this.chunks)),this.chunks=[],this.err=n,this.msg=this.strm.msg};function qI(n,e){const t=new Yo(e);if(t.push(n),t.err)throw t.msg||id[t.err];return t.result}function jI(n,e){return e=e||{},e.raw=!0,qI(n,e)}var XI=jI,YI={inflateRaw:XI};const{inflateRaw:KI}=YI;var ZI=KI;async function JI(n){const e=new Uint8Array(n),t=e$(e),i={};for(const[r,s]of Object.entries(t)){const a=r.replace(".npy","");i[a]=QI(s)}return i}function QI(n){if(n[0]!==147||n[1]!==78)throw new Error(`Not a valid NPY file (got ${n[0]}, ${n[1]})`);const e=new DataView(n.buffer,n.byteOffset,n.byteLength),t=n[6];let i,r;t===1?(i=e.getUint16(8,!0),r=10):(i=e.getUint32(8,!0),r=12);const s=n.subarray(r,r+i),a=new TextDecoder().decode(s),o=a.match(/'descr':\s*'([^']+)'/),u=o?o[1]:"<f4",l=a.match(/'shape':\s*\(([^)]*)\)/),d=(l?l[1]:"").split(",").filter(y=>y.trim()).map(y=>parseInt(y.trim())),h=r+i,f=d.reduce((y,_)=>y*_,1)||1;let m;if(u==="<f4"||u==="|f4"){const y=f*4,_=new ArrayBuffer(y);new Uint8Array(_).set(n.subarray(h,h+y)),m=new Float32Array(_)}else if(u==="<f8"||u==="|f8"){const y=f*8,_=new ArrayBuffer(y);new Uint8Array(_).set(n.subarray(h,h+y));const p=new Float64Array(_);m=new Float32Array(f);for(let x=0;x<f;x++)m[x]=p[x]}else{const y=f*4,_=new ArrayBuffer(y);new Uint8Array(_).set(n.subarray(h,h+Math.min(y,n.byteLength-h))),m=new Float32Array(_)}return{data:m,shape:d,dtype:u}}function e$(n){const e={};let t=0;for(;t+30<=n.length&&(n[t]|n[t+1]<<8|n[t+2]<<16|n[t+3]<<24)===67324752;){const r=new DataView(n.buffer,n.byteOffset+t,30),s=r.getUint16(8,!0);let a=r.getUint32(18,!0),o=r.getUint32(22,!0);const u=r.getUint16(26,!0),l=r.getUint16(28,!0),c=t+30,d=new TextDecoder().decode(n.subarray(c,c+u)),h=c+u;if(a===4294967295||o===4294967295){let y=h;const _=h+l;for(;y+4<=_;){const p=n[y]|n[y+1]<<8,x=n[y+2]|n[y+3]<<8;if(y+=4,p===1){let w=y;o===4294967295&&(o=Number(new DataView(n.buffer,n.byteOffset+w,8).getBigUint64(0,!0)),w+=8),a===4294967295&&(a=Number(new DataView(n.buffer,n.byteOffset+w,8).getBigUint64(0,!0)));break}y+=x}}const f=h+l,m=f+a;if(m>n.length)break;if(s===0){const y=new Uint8Array(a);y.set(n.subarray(f,m)),e[d]=y}else if(s===8){const y=n.subarray(f,m);e[d]=new Uint8Array(ZI(y))}t=m}return e}const Zr=xw.indexOf(td),B0=10;class t${constructor(){this.fps=50,this.numFrames=0,this.jointPos=null,this.jointVel=null,this.bodyPosW=null,this.bodyQuatW=null,this.bodyLinVelW=null,this.bodyAngVelW=null}async load(e){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch motion: ${e} (${t.status})`);const i=await t.arrayBuffer(),r=await JI(i);if(!r.fps||!r.joint_pos)throw new Error(`Invalid NPZ: keys=${Object.keys(r).join(",")}`);this.fps=r.fps.data[0],this.jointPos=r.joint_pos,this.jointVel=r.joint_vel,this.bodyPosW=r.body_pos_w,this.bodyQuatW=r.body_quat_w,this.bodyLinVelW=r.body_lin_vel_w,this.bodyAngVelW=r.body_ang_vel_w,this.numFrames=this.jointPos.shape[0],this._origBodyPosW=new Float32Array(this.bodyPosW.data),this._origBodyQuatW=new Float32Array(this.bodyQuatW.data),this._origBodyLinVelW=new Float32Array(this.bodyLinVelW.data),this._origBodyAngVelW=new Float32Array(this.bodyAngVelW.data)}applyOffset(e,t,i){if(e===0&&t===0&&i===0){this.bodyPosW.data.set(this._origBodyPosW),this.bodyQuatW.data.set(this._origBodyQuatW),this.bodyLinVelW.data.set(this._origBodyLinVelW),this.bodyAngVelW.data.set(this._origBodyAngVelW);return}this.bodyPosW.data.set(this._origBodyPosW),this.bodyQuatW.data.set(this._origBodyQuatW),this.bodyLinVelW.data.set(this._origBodyLinVelW),this.bodyAngVelW.data.set(this._origBodyAngVelW);const r=Math.cos(i),s=Math.sin(i),a=new Float32Array([Math.cos(i/2),0,0,Math.sin(i/2)]),o=this.numFrames,u=30,l=this.bodyPosW.data,c=this.bodyQuatW.data,d=this.bodyLinVelW.data,h=this.bodyAngVelW.data;for(let f=0;f<o;f++)for(let m=0;m<u;m++){const y=(f*u+m)*3,_=(f*u+m)*4,p=l[y],x=l[y+1];l[y]=r*p-s*x+e,l[y+1]=s*p+r*x+t;const w=c.subarray(_,_+4),b=TR(a,w);c.set(b,_);const I=d[y],R=d[y+1];d[y]=r*I-s*R,d[y+1]=s*I+r*R;const T=h[y],S=h[y+1];h[y]=r*T-s*S,h[y+1]=s*T+r*S}}applyZShift(e){if(e===0)return;const t=this.bodyPosW.data,i=this.numFrames*30;for(let r=0;r<i;r++)t[r*3+2]+=e}getBodyPos(e,t){const r=(this._clamp(e)*30+t)*3;return this.bodyPosW.data.subarray(r,r+3)}_clamp(e){return Math.max(0,Math.min(e,this.numFrames-1))}getRootPos(e){const i=(this._clamp(e)*30+Zr)*3;return this.bodyPosW.data.subarray(i,i+3)}getRootQuat(e){const i=(this._clamp(e)*30+Zr)*4;return this.bodyQuatW.data.subarray(i,i+4)}getJointPos(e){const i=this._clamp(e)*29;return this.jointPos.data.subarray(i,i+29)}getJointVel(e){const i=this._clamp(e)*29;return this.jointVel.data.subarray(i,i+29)}getCurrentCommand(e){const t=this._clamp(e),i=new Float32Array(58);return i.set(this.getJointPos(t),0),i.set(this.getJointVel(t),29),i}getFutureRobotMotion(e){const t=new Float32Array(B0*58);for(let i=0;i<B0;i++){const r=this._clamp(e+i*5),s=i*58;t.set(this.getJointPos(r),s),t.set(this.getJointVel(r),s+29)}return t}getCommandWindow(e,t){const s=new Float32Array(21*t),a=this._clamp(e),o=(a*30+Zr)*4,u=(a*30+Zr)*3,l=this.bodyPosW.data.subarray(u,u+3),c=Bo(this.bodyQuatW.data.subarray(o,o+4));for(let d=0;d<21;d++){const h=this._clamp(e+(d-10)),f=(h*30+Zr)*4,m=(h*30+Zr)*3,y=this.bodyQuatW.data.subarray(f,f+4),_=this.bodyLinVelW.data.subarray(m,m+3),p=this.bodyAngVelW.data.subarray(m,m+3),x=this.getJointPos(h),w=Bo(y),b=rs(w,_),I=rs(w,p),R=rs(w,n$),T=d*t;if(s.set(b,T),s.set(I,T+3),s.set(R,T+6),s.set(x,T+9),t===41){const S=this.bodyPosW.data.subarray(m,m+3),C=new Float32Array([S[0]-l[0],S[1]-l[1],S[2]-l[2]]),A=rs(c,C);s.set(A,T+38)}}return s}}const n$=new Float32Array([0,0,-1]),Qt="motions/",vo={rgmt_cycle_walk_with_hand:`${Qt}rgmt_cycle_walk_with_hand.npz`,rgmt_cycle_backwalk_with_hand_fast1:`${Qt}rgmt_cycle_backwalk_with_hand_fast1.npz`,rgmt_side_walk_no_hand:`${Qt}rgmt_side_walk_no_hand.npz`,rgmt_side_with_hand:`${Qt}rgmt_side_with_hand.npz`,rgmt_halfwalk:`${Qt}rgmt_halfwalk.npz`,rgmt_jump:`${Qt}rgmt_jump.npz`,dance1sub1start_dang:`${Qt}dance1sub1start_dang.npz`,dance2sub2start:`${Qt}dance2sub2start.npz`,walk_dance1sub1start:`${Qt}walk_dance1sub1start.npz`,walk_dance2sub2start:`${Qt}walk_dance2sub2start.npz`,hugball:`${Qt}hugball.npz`,back_flip:`${Qt}back_flip.npz`,cartwheel_hand_contact_200:`${Qt}cartwheel_hand_contact_200.npz`,window_cycle_walk:`${Qt}window_cycle_walk.npz`,window_back_walk:`${Qt}window_back_walk.npz`,window_dance1_sub1:`${Qt}window_dance1_sub1.npz`,window_dance2_sub1:`${Qt}window_dance2_sub1.npz`},ur=4,zt=29,i$=187,F0=(9+zt+zt+zt)*ur+i$,V0=10,H0=["left_hip_pitch_joint","left_hip_roll_joint","left_hip_yaw_joint","left_knee_joint","left_ankle_pitch_joint","left_ankle_roll_joint","right_hip_pitch_joint","right_hip_roll_joint","right_hip_yaw_joint","right_knee_joint","right_ankle_pitch_joint","right_ankle_roll_joint","waist_yaw_joint","waist_roll_joint","waist_pitch_joint","left_shoulder_pitch_joint","left_shoulder_roll_joint","left_shoulder_yaw_joint","left_elbow_joint","left_wrist_roll_joint","left_wrist_pitch_joint","left_wrist_yaw_joint","right_shoulder_pitch_joint","right_shoulder_roll_joint","right_shoulder_yaw_joint","right_elbow_joint","right_wrist_roll_joint","right_wrist_pitch_joint","right_wrist_yaw_joint"];function r$(n){if(/_hip_pitch_joint$|_hip_roll_joint$|_knee_joint$/.test(n))return[99.09842777666111,6.308801853496639];if(/_hip_yaw_joint$|^waist_yaw_joint$/.test(n))return[40.17923863450712,2.557889775413375];if(/_ankle_pitch_joint$|_ankle_roll_joint$|^waist_roll_joint$|^waist_pitch_joint$/.test(n))return[28.50124619574858,1.814445686584846];if(/_shoulder_pitch_joint$|_shoulder_roll_joint$|_shoulder_yaw_joint$|_elbow_joint$|_wrist_roll_joint$/.test(n))return[14.25062309787429,.907222843292423];if(/_wrist_pitch_joint$|_wrist_yaw_joint$/.test(n))return[8.611032447370201,.548195351665136];throw new Error("no gains for joint "+n)}function s$(n){if(/_hip_pitch_joint$|_hip_roll_joint$|_knee_joint$/.test(n))return .35066146637882434;if(/_hip_yaw_joint$|^waist_yaw_joint$/.test(n))return .5475464629911068;if(/_wrist_pitch_joint$|_wrist_yaw_joint$/.test(n))return .2903252328080005;if(/_shoulder_pitch_joint$|_shoulder_roll_joint$|_shoulder_yaw_joint$|_elbow_joint$|_wrist_roll_joint$|^waist_pitch_joint$|^waist_roll_joint$|_ankle_pitch_joint$|_ankle_roll_joint$/.test(n))return .43857731392336724;throw new Error("no action scale for joint "+n)}function a$(n){return/_hip_pitch_joint$/.test(n)?-.312:/_knee_joint$/.test(n)?.669:/_ankle_pitch_joint$/.test(n)?-.363:/_elbow_joint$/.test(n)?.6:n==="left_shoulder_roll_joint"||n==="left_shoulder_pitch_joint"?.2:n==="right_shoulder_roll_joint"?-.2:n==="right_shoulder_pitch_joint"?.2:0}const G0=[-1.5,3],W0=[-1,1],q0=[-1.8,1.8];class Jr{constructor(e,t){this.featDim=e,this.len=t,this.buf=new Float32Array(e*t)}reset(e){for(let t=0;t<this.len;t++)this.buf.set(e,t*this.featDim)}push(e){this.buf.copyWithin(0,this.featDim),this.buf.set(e,(this.len-1)*this.featDim)}}class o${constructor(){this.session=null,this.defaultJointPos=new Float32Array(zt),this.actionScale=new Float32Array(zt);const e=new Float32Array(zt),t=new Float32Array(zt);for(let i=0;i<zt;i++){const r=H0[i];this.defaultJointPos[i]=a$(r),this.actionScale[i]=s$(r);const[s,a]=r$(r);e[i]=s,t[i]=a}this._kpPolicy=e,this._kdPolicy=t,this.jointMapping=new Int32Array(zt);for(let i=0;i<zt;i++)this.jointMapping[i]=i;this.kp=new Float32Array(zt),this.kd=new Float32Array(zt),this._rebuildMujocoGains(),this.lastAction=new Float32Array(zt),this.command=new Float32Array(3),this.histAngVel=new Jr(3,ur),this.histGravity=new Jr(3,ur),this.histCommand=new Jr(3,ur),this.histJointPos=new Jr(zt,ur),this.histJointVel=new Jr(zt,ur),this.histAction=new Jr(zt,ur),this._obsBuf=new Float32Array(F0)}_rebuildMujocoGains(){for(let e=0;e<zt;e++){const t=this.jointMapping[e];this.kp[t]=this._kpPolicy[e],this.kd[t]=this._kdPolicy[e]}}async init(){const e=await fetch("models/locomotion/policy.onnx").then(t=>t.arrayBuffer());this.session=await Wo.create(e,{executionProviders:["wasm"],graphOptimizationLevel:"all"})}setJointMapping(e,t){const i=new Int32Array(zt),r=e.mjtObj.mjOBJ_ACTUATOR.value,s=e.mjtObj.mjOBJ_JOINT.value;for(let a=0;a<zt;a++){const o=H0[a],u=e.mj_name2id(t,r,o);if(u<0)throw new Error(`[loco] actuator '${o}' not found`);const l=e.mj_name2id(t,s,o);if(l<0)throw new Error(`[loco] joint '${o}' not found`);const c=t.jnt_qposadr[l]-7,d=t.jnt_dofadr[l]-6;if(c!==u||d!==u)throw new Error(`[loco] joint/actuator order mismatch for '${o}': act=${u}, qpos=${c}, qvel=${d}`);i[a]=u}this.jointMapping=i,this._rebuildMujocoGains()}setCommand(e,t,i){this.command[0]=Math.max(G0[0],Math.min(G0[1],e)),this.command[1]=Math.max(W0[0],Math.min(W0[1],t)),this.command[2]=Math.max(q0[0],Math.min(q0[1],i))}_computeTerms(e){const t=e.data.qpos,i=e.data.qvel,r=new Float32Array([i[3],i[4],i[5]]),s=new Float32Array([t[3],t[4],t[5],t[6]]),a=rs(Bo(s),new Float32Array([0,0,-1])),o=new Float32Array([this.command[0],this.command[1],this.command[2]]),u=new Float32Array(zt),l=new Float32Array(zt);for(let c=0;c<zt;c++){const d=this.jointMapping[c];u[c]=t[7+d]-this.defaultJointPos[c],l[c]=i[6+d]}return{angVel:r,grav:a,cmd:o,jpos:u,jvel:l}}reset(e){this.lastAction.fill(0),this.command.fill(0);const t=this._computeTerms(e);this.histAngVel.reset(t.angVel),this.histGravity.reset(t.grav),this.histCommand.reset(t.cmd),this.histJointPos.reset(t.jpos),this.histJointVel.reset(t.jvel),this.histAction.reset(this.lastAction)}_buildObservation(e){const t=this._obsBuf;let i=0;t.set(this.histAngVel.buf,i),i+=this.histAngVel.buf.length,t.set(this.histGravity.buf,i),i+=this.histGravity.buf.length,t.set(this.histCommand.buf,i),i+=this.histCommand.buf.length,t.set(this.histJointPos.buf,i),i+=this.histJointPos.buf.length,t.set(this.histJointVel.buf,i),i+=this.histJointVel.buf.length,t.set(this.histAction.buf,i),i+=this.histAction.buf.length;const r=e.scanner.computeAMP();return t.set(r,i),i+=r.length,t}async runRawObs(e){const t=e instanceof Float32Array?e:new Float32Array(e),i=this.session.inputNames[0],r=this.session.outputNames[0],s={};s[i]=new un("float32",t,[1,t.length]);const a=await this.session.run(s);return Array.from(a[r].data)}async predict(e){const t=this._computeTerms(e);this.histAngVel.push(t.angVel),this.histGravity.push(t.grav),this.histCommand.push(t.cmd),this.histJointPos.push(t.jpos),this.histJointVel.push(t.jvel),this.histAction.push(this.lastAction);const i=this._buildObservation(e),r=this.session.inputNames[0],s=this.session.outputNames[0],a={};a[r]=new un("float32",i,[1,F0]);const u=(await this.session.run(a))[s].data,l=new Float32Array(zt);for(let c=0;c<zt;c++)l[c]=Math.max(-V0,Math.min(V0,u[c]));return this.lastAction.set(l),l}}const or={spawnClearRadius:1.25,maxBoxHeight:.2,maxStairRiser:.11,minStairTread:.4,maxStairSteps:6,maxArenaRadius:8,obstacleMargin:.25};function l$(n){let e=n>>>0||1;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const en=(n,e,t)=>n+(e-n)*t;function j0(n,e,t){return Math.abs(n.x-e.x)<n.hx+e.hx+t&&Math.abs(n.y-e.y)<n.hy+e.hy+t}function u$(n){return[Math.cos(n/2),0,0,Math.sin(n/2)]}function X0(n,e,t,i,r,s,a,o,u){const l=o||[1,0,0,0];return`    <geom name="${n}" type="box" size="${e.toFixed(4)} ${t.toFixed(4)} ${i.toFixed(4)}" pos="${r.toFixed(4)} ${s.toFixed(4)} ${a.toFixed(4)}" quat="${l[0].toFixed(6)} ${l[1].toFixed(6)} ${l[2].toFixed(6)} ${l[3].toFixed(6)}" rgba="${u}" contype="1" conaffinity="1"/>`}function c$(n={}){const e=Math.max(0,Math.min(1,n.difficulty??.4)),t=Math.min(or.maxArenaRadius,n.arenaRadius??6),i=n.density??.5;return{difficulty:e,seed:(n.seed??1)>>>0,arenaRadius:t,spawnClearRadius:or.spawnClearRadius,boxHeightMax:en(.04,or.maxBoxHeight,e),boxHalfXRange:[en(.15,.2,e),en(.25,.6,e)],boxHalfYRange:[en(.15,.3,e),en(.25,.75,e)],boxCount:Math.round(en(4,22,e)*en(.4,1.2,i)),stairRiser:en(.04,or.maxStairRiser,e),stairTread:en(.45,or.minStairTread,e),stairSteps:Math.round(en(2,or.maxStairSteps,e)),stairModules:Math.round(en(1,3,e)*en(.5,1,i)),caps:or}}function d$(n={},e="g1_29dof_rev_1_0_no_plane.xml"){const t=c$(n),i=l$(t.seed),r=[];r.push({x:0,y:0,hx:t.spawnClearRadius,hy:t.spawnClearRadius});const s=[],a=["0.55 0.55 0.55 1.0","0.50 0.50 0.50 1.0","0.45 0.45 0.50 1.0"];for(let u=0;u<t.stairModules;u++){const l=t.stairSteps,c=t.stairRiser,d=t.stairTread,f=.45+l*d,m=f;let y=0,_=0,p=!1;for(let x=0;x<40;x++){const w=i()*Math.PI*2,b=en(t.spawnClearRadius+m+.6,t.arenaRadius-m,i());if(b<=0)break;y=Math.cos(w)*b,_=Math.sin(w)*b;const I={x:y,y:_,hx:m,hy:m};if(!r.some(R=>j0(I,R,t.caps.obstacleMargin))){p=!0,r.push(I);break}}if(p)for(let x=0;x<l;x++){const w=f-x*d,b=(x+1)*c;s.push(X0(`stair${u}_ring${x}`,w,w,b/2,y,_,b/2,null,a[x%2]))}}for(let u=0;u<t.boxCount;u++)for(let l=0;l<30;l++){const c=i()*Math.PI*2,d=en(t.boxHalfXRange[0],t.boxHalfXRange[1],i()),h=en(t.boxHalfYRange[0],t.boxHalfYRange[1],i()),f=i()*Math.PI,m=Math.abs(Math.cos(f)),y=Math.abs(Math.sin(f)),_=d*m+h*y,p=d*y+h*m,x=Math.max(_,p),w=en(t.spawnClearRadius+x+.3,t.arenaRadius-x,i());if(w<=0)continue;const b=Math.cos(c)*w,I=Math.sin(c)*w,R={x:b,y:I,hx:_,hy:p};if(r.some(S=>j0(R,S,t.caps.obstacleMargin)))continue;const T=en(.02,t.boxHeightMax/2,i());s.push(X0(`box_${u}`,d,h,T,b,I,T,u$(f),a[u%3])),r.push(R);break}const o=s.join(`
`);return`<mujoco model="g1_29dof_terrain_gen">
  <include file="${e}" />
  <visual>
    <headlight diffuse="0.6 0.6 0.6" ambient="0.3 0.3 0.3" specular="0 0 0" />
    <global azimuth="-90" offheight="1024" offwidth="1024" />
  </visual>
  <asset>
    <texture type="skybox" builtin="flat" rgb1="0 0 0" rgb2="0 0 0" width="512" height="3072" />
    <texture type="2d" name="groundplane" builtin="checker" mark="edge" rgb1="0.2 0.3 0.4" rgb2="0.1 0.2 0.3" markrgb="0.8 0.8 0.8" width="300" height="300" />
    <material name="groundplane" texture="groundplane" texuniform="true" texrepeat="5 5" reflectance="0.2" />
  </asset>
  <worldbody>
    <light pos="0 0 2.5" dir="0 0 -1" diffuse="0.6 0.6 0.6" specular="0.3 0.3 0.3" directional="true" castshadow="false" />
    <geom name="floor" type="plane" size="0 0 0.05" material="groundplane" group="2" />
${o}
  </worldbody>
</mujoco>
`}const sd=.002,h$=.02,Zs=Math.round(h$/sd),f$="torso_link",ad="g1_29dof_pmt_no_plane.xml",ra="g1_29dof_rev_1_0_no_plane.xml";function p$(){try{const n=new URLSearchParams(window.location.search).get("model");if(n==="pmt"||n==="new")return ad;if(n==="legacy"||n==="old"||n==="rev1")return ra}catch{}return ad}const Qr=p$();class m${constructor(){this.paused=!1,this.simTime=0,this.frameIdx=0,this.lastAction=new Float32Array(29),this.fpsFrames=0,this.fpsTime=0,this.simStep=0,this.bodies={},this.lights={},this.mode="locomotion",this.keys=new Set,this._transitioning=!1,this._transitionToken=0,this.activeMotionKey=null,this._blendSteps=0,this._blendTotal=10,this._blendStartTarget=null,this._suppressLocoCmd=!1,this._settleSteps=0,this._settleMax=50,this._settling=!1,this._simGen=0,this.ready=!1,this._terrainToken=0,this.terrainConfig={difficulty:.4,seed:1},this.scanVizOn=!1,this._scanViz=null}async init(){this.setStatus("Loading MuJoCo WASM..."),this.setProgress(10),this.mujoco=await vS(),this.mujoco.FS.mkdir("/working"),this.mujoco.FS.mount(this.mujoco.MEMFS,{root:"."},"/working"),this.setProgress(20),this.setStatus("Loading scene & meshes..."),await this.loadAssets(),this.setProgress(50),this.setStatus("Building 3D scene..."),this.setupRenderer(),[this.model,this.data,this.bodies,this.lights]=await Ap(this.mujoco,"g1_29dof_big_map.xml",this),this.mujoco.mj_forward(this.model,this.data),this.setProgress(60),this.setStatus("Loading policy (ONNX)..."),this.policy=new IR,await this.policy.init(),this.policy.setJointMapping(this.mujoco,this.model),this.setProgress(75),this.setStatus("Loading motion clip..."),this.clip=new t$,await this.clip.load(vo.rgmt_cycle_walk_with_hand),this.setProgress(85),this.setStatus("Loading locomotion policy..."),this.locoPolicy=new o$,await this.locoPolicy.init(),this.locoPolicy.setJointMapping(this.mujoco,this.model),this.setProgress(90),this.scanner=new u0(this),this.setupHUD(),this.ready=!0,this.resetSimulation(),this.setProgress(100),this.hideLoading(),this.renderer.setAnimationLoop(this.render.bind(this))}async loadAssets(){const e=this.mujoco,[t,i]=await Promise.all([fetch("scenes/g1_29dof_big_map.xml").then(o=>o.text()),fetch(`scenes/${Qr}`).then(o=>o.text())]);let r=t;if(Qr!==ra){const o=t.split(ra).length-1;if(o!==1)throw new Error(`[loadAssets] expected exactly 1 '${ra}' include in big_map scene, found ${o}`);r=t.replace(ra,Qr)}e.FS.writeFile("/working/g1_29dof_big_map.xml",r),e.FS.writeFile(`/working/${Qr}`,i);const s=await fetch("scenes/meshes/manifest.json").then(o=>o.json());e.FS.analyzePath("/working/meshes").exists||e.FS.mkdir("/working/meshes");const a=s.map(async o=>{const u=await fetch(`scenes/meshes/${o}`).then(l=>l.arrayBuffer());e.FS.writeFile(`/working/meshes/${o}`,new Uint8Array(u))});await Promise.all(a)}setupRenderer(){const e=document.getElementById("render-canvas");this.renderer=new xC({canvas:e,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=K0,this.scene=new bC,this.scene.name="scene",this.scene.background=new ot(.15,.25,.35),this.scene.fog=new yd(this.scene.background,15,25),this.camera=new _n(45,window.innerWidth/window.innerHeight,.001,100),this.camera.position.set(2,1.7,1.7),this.scene.add(this.camera),this.ambientLight=new HC(16777215,.1*3.14),this.scene.add(this.ambientLight);const t=new Ly;t.angle=1.11,t.distance=1e4,t.penumbra=.5,t.castShadow=!0,t.intensity=t.intensity*3.14*10,t.shadow.mapSize.width=1024,t.shadow.mapSize.height=1024,t.position.set(0,3,3),this.scene.add(t),this.controls=new qC(this.camera,e),this.controls.target.set(0,.7,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.update(),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)})}setupHUD(){this._buildMotionButtons(),this._setupTerrainControls(),this._addModelBadge(),document.getElementById("btn-stop").addEventListener("click",()=>{this.mode==="locomotion"&&this._enterBalance()}),document.addEventListener("keydown",e=>{if(!e.repeat)switch(this.keys.add(e.code),e.code){case"Space":e.preventDefault(),this.togglePause();break;case"KeyR":this.resetSimulation();break;case"KeyX":this.mode==="locomotion"&&this._enterBalance();break;case"KeyH":this.toggleScanViz();break}}),document.addEventListener("keyup",e=>{this.keys.delete(e.code)}),this._updateMotionUI()}_buildMotionButtons(){const e=document.getElementById("motion-buttons");if(!e)return;const t=[{label:"Locomotion",items:[["rgmt_cycle_walk_with_hand","Forward Walk"],["rgmt_cycle_backwalk_with_hand_fast1","Backward Walk"],["rgmt_side_walk_no_hand","Side Walk"],["rgmt_side_with_hand","Side Walk (Arms)"],["rgmt_halfwalk","Half Walk"],["rgmt_jump","Jump"]]},{label:"Stylistic",items:[["dance1sub1start_dang","Dance 1"],["dance2sub2start","Dance 2"],["walk_dance1sub1start","Walk + Dance 1"],["walk_dance2sub2start","Walk + Dance 2"]]},{label:"Acrobatic",items:[["back_flip","Backflip"]]}];this._motionButtons=[];for(const i of t){const r=document.createElement("div");r.className="motion-group";const s=document.createElement("span");s.className="motion-group-label",s.textContent=i.label,r.appendChild(s);const a=document.createElement("div");a.className="motion-group-btns";for(const[o,u]of i.items){if(!vo[o])continue;const l=document.createElement("button");l.className="motion-btn",l.dataset.motion=o;const c=document.createElement("span");c.className="motion-btn-fill";const d=document.createElement("span");d.className="motion-btn-label",d.textContent=u,l.appendChild(c),l.appendChild(d),l._fill=c,l.addEventListener("click",()=>this.startTracking(o)),a.appendChild(l),this._motionButtons.push(l)}r.appendChild(a),e.appendChild(r)}}_updateMotionUI(){const e=document.getElementById("policy-status-text"),t=document.getElementById("policy-status");if(this.mode==="tracking"){const i=this._motionButtons?.find(s=>s.dataset.motion===this.activeMotionKey),r=i?i.querySelector(".motion-btn-label")?.textContent||this.activeMotionKey:"motion";e&&(e.textContent=`PMT · tracking ${r}`),t&&t.classList.add("tracking")}else e&&(e.textContent="Locomotion · balancing"),t&&t.classList.remove("tracking");if(this._motionButtons)for(const i of this._motionButtons){const r=this.mode==="tracking"&&i.dataset.motion===this.activeMotionKey;i.classList.toggle("active",r),i.disabled=this._transitioning,!r&&i._fill&&(i._fill.style.width="0%")}}_updateMotionProgress(){if(!this._motionButtons)return;const e=this.mode==="tracking"&&this.activeMotionKey?this._motionButtons.find(i=>i.dataset.motion===this.activeMotionKey):null;if(!e||!e._fill)return;let t=0;this._settling?t=1:this.clip&&this.clip.numFrames>1&&(t=this.frameIdx/(this.clip.numFrames-1)),t=Math.max(0,Math.min(1,t)),e._fill.style.width=(t*100).toFixed(1)+"%"}_addModelBadge(){if(document.getElementById("model-badge"))return;const e=Qr===ad,t=document.createElement("div");t.id="model-badge",t.style.cssText=["position:fixed","top:8px","left:8px","z-index:9999","font:600 12px/1.2 -apple-system,sans-serif","padding:6px 10px","border-radius:6px","color:#fff","pointer-events:auto","box-shadow:0 2px 8px rgba(0,0,0,0.4)",`background:${e?"#15803d":"#b45309"}`].join(";");const i=e?"legacy":"pmt";t.innerHTML=`model: ${e?"PMT-faithful":"LEGACY"} <a href="?model=${i}" style="color:#fff;text-decoration:underline;margin-left:6px">→ ${i}</a>`,document.body.appendChild(t)}toggleScanViz(){this.scanVizOn=!this.scanVizOn,this.scanVizOn&&this._ensureScanViz(),this._scanViz&&(this._scanViz.visible=this.scanVizOn);const e=document.getElementById("scan-viz-state");e&&(e.textContent=this.scanVizOn?"on":"off")}_ensureScanViz(){if(this._scanViz)return;const e=187,t=new us(.022,8,6),i=new md({vertexColors:!0}),r=new SC(t,i,e);r.instanceColor=new Uc(new Float32Array(e*3),3),r.frustumCulled=!1,r.renderOrder=999,r.name="ScanViz",this.scene.add(r),this._scanViz=r,this._scanVizScratch=new Ht}_updateScanViz(){if(!this.scanVizOn||(this._scanViz||this._ensureScanViz(),!this.ready||!this.scanner))return;this.scanner.computeAMP();const e=this.scanner.lastAMP;if(!e||!e.hitPos)return;const t=e.hitPos,i=this._scanVizScratch,r=this._scanViz,s=r.instanceColor,a=this.getBodyPos("pelvis"),o=a?a[2]:.8;for(let u=0;u<t.length;u++){const l=t[u];if(!l)i.position.set(0,-1e3,0),i.scale.setScalar(1e-4);else{i.position.set(l[0],l[2],-l[1]),i.scale.setScalar(1);const c=o-l[2],d=Math.max(0,Math.min(1,(.9-c)/.6)),h=Math.max(0,d-.5)*2,f=Math.max(0,.5-d)*2,m=1-Math.abs(d-.5)*2;s.setXYZ(u,h,m,f)}i.updateMatrix(),r.setMatrixAt(u,i.matrix)}r.instanceMatrix.needsUpdate=!0,s.needsUpdate=!0}_disposeScanViz(){this._scanViz&&(this.scene.remove(this._scanViz),this._scanViz.geometry.dispose(),this._scanViz.material.dispose(),this._scanViz=null)}_setupTerrainControls(){const e=document.getElementById("terrain-difficulty"),t=document.getElementById("terrain-difficulty-val"),i=document.getElementById("terrain-seed"),r=document.getElementById("terrain-randomize"),s=document.getElementById("terrain-generate");if(!(!e||!i||!s)){try{const a=JSON.parse(localStorage.getItem("bfm-terrain")||"null");a&&(this.terrainConfig={...this.terrainConfig,...a},e.value=String(this.terrainConfig.difficulty),i.value=String(this.terrainConfig.seed))}catch{}t&&(t.textContent=Number(e.value).toFixed(2)),e.addEventListener("input",()=>{t&&(t.textContent=Number(e.value).toFixed(2))}),r.addEventListener("click",()=>{i.value=String(Math.floor(Math.random()*1e9))}),s.addEventListener("click",()=>{const a={difficulty:Math.max(0,Math.min(1,parseFloat(e.value)||0)),seed:(parseInt(i.value,10)||1)>>>0};try{localStorage.setItem("bfm-terrain",JSON.stringify(a))}catch{}this.generateTerrain(a)})}}updateLocomotionCommand(){if(this._suppressLocoCmd){if(!this._anyMoveKeyDown()){const s=this.locoPolicy.command;document.getElementById("cmd-vx").textContent=s[0].toFixed(2),document.getElementById("cmd-vy").textContent=s[1].toFixed(2),document.getElementById("cmd-wz").textContent=s[2].toFixed(2);return}this._suppressLocoCmd=!1}let e=0,t=0,i=0;const r=this.keys;r.has("KeyW")&&(e+=1.5),r.has("KeyS")&&(e-=1.5),r.has("KeyA")&&(t+=1),r.has("KeyD")&&(t-=1),r.has("KeyQ")&&(i+=1.8),r.has("KeyE")&&(i-=1.8),this.locoPolicy.setCommand(e,t,i),document.getElementById("cmd-vx").textContent=e.toFixed(2),document.getElementById("cmd-vy").textContent=t.toFixed(2),document.getElementById("cmd-wz").textContent=i.toFixed(2)}_anyMoveKeyDown(){const e=this.keys;return e.has("KeyW")||e.has("KeyS")||e.has("KeyA")||e.has("KeyD")||e.has("KeyQ")||e.has("KeyE")}_enterBalance(){this.locoPolicy.setCommand(0,0,0),this._suppressLocoCmd=!0;for(const e of["KeyW","KeyS","KeyA","KeyD","KeyQ","KeyE"])this.keys.delete(e)}togglePause(){this.paused=!this.paused}rebaseClipToRobot(e=0,t=0,i=0){const r=this.mujoco.mj_name2id(this.model,1,"torso_link"),s=this.data.xpos[r*3],a=this.data.xpos[r*3+1],o=this._quatToYaw([this.data.xquat[r*4],this.data.xquat[r*4+1],this.data.xquat[r*4+2],this.data.xquat[r*4+3]]);this.clip.applyOffset(0,0,0);const u=this.clip.getRootPos(0),l=this._quatToYaw(this.clip.getRootQuat(0)),c=o-l+i,d=Math.cos(c),h=Math.sin(c),f=d*u[0]-h*u[1],m=h*u[0]+d*u[1],y=s+e-f,_=a+t-m;this.clip.applyOffset(y,_,c),this.alignToGround()}applyOffset(){const e=parseFloat(document.getElementById("offset-dx")?.value)||0,t=parseFloat(document.getElementById("offset-dy")?.value)||0,i=(parseFloat(document.getElementById("offset-dyaw")?.value)||0)*Math.PI/180;this.rebaseClipToRobot(e,t,i),this.resetSimulation()}async startTracking(e){if(!vo[e]){console.warn("[startTracking] unknown motion:",e);return}if(this._transitioning)return;this._transitioning=!0;const t=++this._transitionToken;this._updateMotionUI();const i=this.paused;this.paused=!0;let r=0;for(;this._stepping&&r++<200;)await new Promise(s=>setTimeout(s,5));if(this._stepping){console.warn("[startTracking] step never released; aborting transition"),this.paused=i,this._transitioning=!1;return}try{if(await this.clip.load(vo[e]),t!==this._transitionToken)return;this.rebaseClipToRobot(0,0,0),this._blendStartTarget=new Float32Array(29);for(let s=0;s<29;s++)this._blendStartTarget[s]=this.data.qpos[7+s];this._blendSteps=this._blendTotal,this.frameIdx=0,this.simStep=0,this.simTime=0,this._settleSteps=0,this._settling=!1,this.lastAction.fill(0),this._targetMujoco=new Float32Array(29),this._kpMujocoTrack=new Float32Array(29),this._kdMujocoTrack=new Float32Array(29);for(let s=0;s<29;s++){const a=this.policy.jointMapping[s];this._kpMujocoTrack[a]=this.policy.kp[s],this._kdMujocoTrack[a]=this.policy.kd[s]}this.policy.resetHistory(this.clip,0,this),this.activeMotionKey=e,this._simGen++,this.mode="tracking",this._updateMotionUI()}catch(s){console.error("[startTracking] failed:",s)}finally{this._transitioning=!1,this.paused=i}}finishTracking(){this._simGen++,this.mode="locomotion",this.activeMotionKey=null,this._blendSteps=0,this._blendStartTarget=null,this._settleSteps=0,this._settling=!1,this.frameIdx=0,this._targetMujoco=null,this.locoPolicy.reset(this),this._enterBalance(),this._updateMotionUI()}_quatToYaw(e){const t=e[0],i=e[1],r=e[2],s=e[3],a=2*(t*s+i*r),o=1-2*(r*r+s*s);return Math.atan2(a,o)}alignToGround(){const e=["left_ankle_roll_link","right_ankle_roll_link"];let i=1/0;for(const c of e){const d=xw.indexOf(c);if(d<0)continue;const h=this.clip.getBodyPos(0,d);h[2]<i&&(i=h[2])}if(!isFinite(i))return;const r=this.clip.getRootPos(0),s=new Float32Array(this.data.qpos),a=new Float32Array(this.data.qvel);this.data.qpos[0]=0,this.data.qpos[1]=0,this.data.qpos[2]=1e3,this.mujoco.mj_forward(this.model,this.data);const o=this._raycastGroundAt(r[0],r[1]);this.data.qpos.set(s),this.data.qvel.set(a),this.mujoco.mj_forward(this.model,this.data);const l=o+.02-i;Math.abs(l)>1e-4&&this.clip.applyZShift(l)}resetSimulation(){this._transitionToken++,this._simGen++,this.mode="locomotion",this.activeMotionKey=null,this._blendSteps=0,this._blendStartTarget=null,this._settleSteps=0,this._settling=!1,this.frameIdx=0,this.simStep=0,this.simTime=0,this.lastAction.fill(0),this._targetMujoco=null;const e=this.data.qpos;e[0]=0,e[1]=0,e[2]=1e3,e[3]=1,e[4]=0,e[5]=0,e[6]=0;for(let a=0;a<29;a++)e[7+this.locoPolicy.jointMapping[a]]=this.locoPolicy.defaultJointPos[a];this.mujoco.mj_forward(this.model,this.data);const t=this._raycastGroundAt(0,0),i=.035;let r=1/0;for(const a of["left_ankle_roll_link","right_ankle_roll_link"]){const o=this.getBodyPos(a);o&&o[2]-i<r&&(r=o[2]-i)}const s=.02;isFinite(r)?e[2]=1e3+(t+s-r):e[2]=t+.7;for(let a=0;a<this.model.nv;a++)this.data.qvel[a]=0;for(let a=0;a<this.model.nu;a++)this.data.ctrl[a]=0;this.mujoco.mj_forward(this.model,this.data),this.locoPolicy.reset(this),this._enterBalance(),this._updateMotionUI()}async generateTerrain(e){if(e&&(this.terrainConfig={...this.terrainConfig,...e}),this._terrainBusy){this._terrainPending={...this.terrainConfig},this._terrainToken++;return}this._terrainBusy=!0;try{do this._terrainPending=null,await this._regenerateOnce({...this.terrainConfig});while(this._terrainPending)}finally{this._terrainBusy=!1}}async _regenerateOnce(e){++this._terrainToken,this.ready=!1,this.paused=!0,this._transitioning=!0,this._simGen++,this._showTerrainOverlay(!0);let t=0;for(;this._stepping&&t++<600;)await new Promise(i=>setTimeout(i,5));if(this._stepping){console.warn("[generateTerrain] step never released; aborting (world untouched)"),this.ready=!0,this.paused=!1,this._transitioning=!1,this._showTerrainOverlay(!1),this._updateMotionUI();return}try{const i=d$(e,Qr);this.mujoco.FS.writeFile("/working/scene_gen.xml",i),await new Promise(a=>requestAnimationFrame(()=>a()));let r=null;try{r=this.mujoco.MjModel.loadFromXML("/working/scene_gen.xml")}finally{r&&r.delete&&r.delete()}this._disposeScanViz();const s=this.scene.getObjectByName("MuJoCo Root");s&&(this.scene.remove(s),this._disposeThree(s)),[this.model,this.data,this.bodies,this.lights]=await Ap(this.mujoco,"scene_gen.xml",this),this.mujoco.mj_forward(this.model,this.data),this.policy.setJointMapping(this.mujoco,this.model),this.locoPolicy.setJointMapping(this.mujoco,this.model),this.scanner=new u0(this),this._kpMujocoTrack=null,this.ready=!0,this.resetSimulation()}catch(i){if(console.error("[generateTerrain] failed:",i),this.ready=!!(this.model&&this.data),this.ready)try{this.resetSimulation()}catch{}else{const r=document.getElementById("sim-time");r&&(r.textContent="ERR: terrain load failed")}}finally{this._transitioning=!1,this.paused=!1,this._showTerrainOverlay(!1),this._updateMotionUI()}}_disposeThree(e){e.traverse(t=>{t.geometry&&t.geometry.dispose&&t.geometry.dispose();const i=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(const r of i){for(const s in r){const a=r[s];a&&a.isTexture&&a.dispose&&a.dispose()}r.dispose&&r.dispose()}})}_showTerrainOverlay(e){const t=document.getElementById("terrain-overlay");t&&t.classList.toggle("hidden",!e)}_raycastGroundAt(e,t){this._geomGroup||(this._geomGroup=[1,1,1,1,1,1]),this._raycastGeomId||(this._raycastGeomId=new Int32Array(1)),this._raycastGeomId[0]=-1;const i=this.mujoco.mj_ray(this.model,this.data,[e,t,50],[0,0,-1],this._geomGroup,1,-1,this._raycastGeomId);return i>0?50-i:0}getQpos(){return this.data.qpos}getQvel(){return this.data.qvel}getBodyPos(e){const t=this.mujoco.mj_name2id(this.model,1,e);return t<0?null:[this.data.xpos[t*3],this.data.xpos[t*3+1],this.data.xpos[t*3+2]]}getBodyQuat(e){const t=this.mujoco.mj_name2id(this.model,1,e);return t<0?null:[this.data.xquat[t*4],this.data.xquat[t*4+1],this.data.xquat[t*4+2],this.data.xquat[t*4+3]]}raycast(e,t){return this._geomGroup||(this._geomGroup=[1,1,1,1,1,1]),this._raycastGeomId||(this._raycastGeomId=new Int32Array(1)),this._raycastGeomId[0]=-1,{dist:this.mujoco.mj_ray(this.model,this.data,Array.from(e),Array.from(t),this._geomGroup,1,-1,this._raycastGeomId),geomid:this._raycastGeomId[0]}}async stepPhysics(){if(!this.paused&&!this._transitioning)return this.mode==="locomotion"?this._stepLocomotion():this._stepTracking()}async _stepTracking(){const e=Zs,t=this._simGen;if(this._targetMujoco||(this._targetMujoco=new Float32Array(29)),!this._kpMujocoTrack){this._kpMujocoTrack=new Float32Array(29),this._kdMujocoTrack=new Float32Array(29);for(let i=0;i<29;i++){const r=this.policy.jointMapping[i];this._kpMujocoTrack[r]=this.policy.kp[i],this._kdMujocoTrack[r]=this.policy.kd[i]}}for(let i=0;i<e;i++){if(!this._settling&&this.simStep%Zs===0){const o=this.scanner.compute(),u=this.policy.buildObservation(this.clip,this.frameIdx,o,this.lastAction,this),l=await this.policy.predict(u);if(t!==this._simGen)return;this.lastAction=l;const c=this.clip.getJointPos(this.frameIdx);let d=1;if(this._blendSteps>0&&this._blendStartTarget){const h=1-this._blendSteps/this._blendTotal;d=h*h*(3-2*h),this._blendSteps--}for(let h=0;h<29;h++){const f=this.policy.jointMapping[h],m=c[h]+this.lastAction[h]*this.policy.actionScale[h];d<1&&this._blendStartTarget?this._targetMujoco[f]=this._blendStartTarget[f]*(1-d)+m*d:this._targetMujoco[f]=m}}const r=this.data.qpos,s=this.data.qvel,a=this.data.ctrl;for(let o=0;o<29;o++)a[o]=this._kpMujocoTrack[o]*(this._targetMujoco[o]-r[7+o])+this._kdMujocoTrack[o]*(0-s[6+o]);if(this.mujoco.mj_step(this.model,this.data),this.simStep++,this.simTime+=sd,this.simStep%Zs===0){if(this._settling||this.frameIdx+1>=this.clip.numFrames){if(!this._settling){if(this._blendSteps>0){const o=this.clip.getJointPos(this.frameIdx);for(let u=0;u<29;u++)this._targetMujoco[this.policy.jointMapping[u]]=o[u]+this.lastAction[u]*this.policy.actionScale[u]}this._blendSteps=0}this._settling=!0,this._settleSteps++,(this._isHandoffReady()||this._settleSteps>=this._settleMax)&&this.finishTracking();break}this.frameIdx++,this.policy.updateHistory(this.clip,this.frameIdx,this.lastAction,this)}}}_isHandoffReady(){const e=this.data.qpos,t=this.data.qvel,i=e[4],r=e[5],s=1-2*(i*i+r*r),a=Math.hypot(t[0],t[1],t[2]);return s>.7&&a<1.5}async _stepLocomotion(){const e=Zs,t=this._simGen;this._targetMujoco||(this._targetMujoco=new Float32Array(29));const i=this.locoPolicy.kp,r=this.locoPolicy.kd;for(let s=0;s<e;s++){if(this.simStep%Zs===0){this.updateLocomotionCommand();const l=await this.locoPolicy.predict(this);if(t!==this._simGen){this.locoPolicy.reset(this);return}for(let c=0;c<29;c++){const d=this.locoPolicy.defaultJointPos[c]+l[c]*this.locoPolicy.actionScale[c];this._targetMujoco[this.locoPolicy.jointMapping[c]]=d}}const a=this.data.qpos,o=this.data.qvel,u=this.data.ctrl;for(let l=0;l<29;l++)u[l]=i[l]*(this._targetMujoco[l]-a[7+l])+r[l]*(0-o[6+l]);this.mujoco.mj_step(this.model,this.data),this.simStep++,this.simTime+=sd}}render(){if(this.controls.update(),!this.ready){this.renderer.render(this.scene,this.camera);return}this._stepping||(this._stepping=!0,this.stepPhysics().catch(i=>{console.error("stepPhysics error:",i),document.getElementById("sim-time").textContent=`ERR: ${i.message}`}).finally(()=>{this._stepping=!1}));for(let i=0;i<this.model.nbody;i++)this.bodies[i]&&(ky(this.data.xpos,i,this.bodies[i].position),Oy(this.data.xquat,i,this.bodies[i].quaternion),this.bodies[i].updateWorldMatrix());const e=this.mujoco.mj_name2id(this.model,1,f$);if(e>=0){const i=this.data.xpos[e*3],r=this.data.xpos[e*3+2],s=-this.data.xpos[e*3+1];this.controls.target.lerp(new H(i,r,s),.03)}this.fpsFrames++;const t=performance.now();t-this.fpsTime>1e3&&(document.getElementById("fps-counter").textContent=`${this.fpsFrames} FPS`,this.fpsFrames=0,this.fpsTime=t),document.getElementById("sim-time").textContent=`t = ${this.simTime.toFixed(2)}s`,this._updateMotionProgress(),this._updateScanViz(),this.renderer.render(this.scene,this.camera)}setProgress(e){document.getElementById("progress-fill").style.width=`${e}%`}setStatus(e){document.getElementById("loading-status").textContent=e}hideLoading(){setTimeout(()=>document.getElementById("loading-screen").classList.add("hidden"),300)}}const Uw=new m$;window.__app=Uw;Uw.init().catch(n=>{console.error("Failed to initialize:",n),document.getElementById("loading-status").textContent=`Error: ${n.message}`});

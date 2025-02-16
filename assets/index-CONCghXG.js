(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))e(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const i of u.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function r(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function e(l){if(l.ep)return;l.ep=!0;const u=r(l);fetch(l.href,u)}})();const Dn=!1;var Gn=Array.isArray,mt=Array.prototype.indexOf,Nn=Array.from,wt=Object.defineProperty,In=Object.getOwnPropertyDescriptor,Et=Object.getOwnPropertyDescriptors,yt=Object.getPrototypeOf;const W=()=>{},O=2,Vn=4,Tn=8,On=16,L=32,X=64,tn=128,R=256,rn=512,y=1024,I=2048,U=4096,k=8192,fn=16384,xt=32768,Hn=65536,Nt=1<<19,zn=1<<20,Tt=Symbol("");function Un(n){return n===this.v}function Ot(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function Yn(n){return!Ot(n,this.v)}function bt(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function At(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function Ct(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let cn=!1,kt=!1;function Rt(){cn=!0}const Dt=1,It=2,Ft=16,Pt=1,St=2;let w=null;function Fn(n){w=n}function Mt(n,t=!1,r){w={p:w,c:null,e:null,m:!1,s:n,x:null,l:null},cn&&!t&&(w.l={s:null,u:null,r1:[],r2:en(!1)})}function Lt(n){const t=w;if(t!==null){const i=t.e;if(i!==null){var r=g,e=h;t.e=null;try{for(var l=0;l<i.length;l++){var u=i[l];z(u.effect),H(u.reaction),Wt(u.fn)}}finally{z(r),H(e)}}w=t.p,t.m=!0}return{}}function _n(){return!cn||w!==null&&w.l===null}function en(n,t){var r={f:0,v:n,reactions:null,equals:Un,rv:0,wv:0};return r}function jn(n,t=!1){var e;const r=en(n);return t||(r.equals=Yn),cn&&w!==null&&w.l!==null&&((e=w.l).s??(e.s=[])).push(r),r}function qt(n,t=!1){return Bt(jn(n,t))}function Bt(n){return h!==null&&!V&&h.f&O&&(b===null?Qt([n]):b.push(n)),n}function Gt(n,t){return h!==null&&!V&&_n()&&h.f&(O|On)&&(b===null||!b.includes(n))&&Ct(),Xn(n,t)}function Xn(n,t){return n.equals(t)||(n.v,n.v=t,n.wv=ft(),$n(n,I),_n()&&g!==null&&g.f&y&&!(g.f&(L|X))&&(C===null?Zt([n]):C.push(n))),t}function $n(n,t){var r=n.reactions;if(r!==null)for(var e=_n(),l=r.length,u=0;u<l;u++){var i=r[u],c=i.f;c&I||!e&&i===g||(D(i,t),c&(y|R)&&(c&O?$n(i,U):hn(i)))}}let Vt=!1;var Pn,Kn,Wn;function Ht(){if(Pn===void 0){Pn=window;var n=Element.prototype,t=Node.prototype;Kn=In(t,"firstChild").get,Wn=In(t,"nextSibling").get,n.__click=void 0,n.__className="",n.__attributes=null,n.__styles=null,n.__e=void 0,Text.prototype.__t=void 0}}function Jn(n=""){return document.createTextNode(n)}function ln(n){return Kn.call(n)}function vn(n){return Wn.call(n)}function Y(n,t){return ln(n)}function zt(n,t){{var r=ln(n);return r instanceof Comment&&r.data===""?vn(r):r}}function J(n,t=1,r=!1){let e=n;for(;t--;)e=vn(e);return e}function Ut(n){n.textContent=""}function Qn(n){var t=O|I,r=h!==null&&h.f&O?h:null;return g===null||r!==null&&r.f&R?t|=R:g.f|=zn,{ctx:w,deps:null,effects:null,equals:Un,f:t,fn:n,reactions:null,rv:0,v:null,wv:0,parent:r??g}}function Yt(n){const t=Qn(n);return t.equals=Yn,t}function Zn(n){var t=n.effects;if(t!==null){n.effects=null;for(var r=0;r<t.length;r+=1)M(t[r])}}function jt(n){for(var t=n.parent;t!==null;){if(!(t.f&O))return t;t=t.parent}return null}function Xt(n){var t,r=g;z(jt(n));try{Zn(n),t=_t(n)}finally{z(r)}return t}function nt(n){var t=Xt(n),r=(S||n.f&R)&&n.deps!==null?U:y;D(n,r),n.equals(t)||(n.v=t,n.wv=ft())}function $t(n,t){var r=t.last;r===null?t.last=t.first=n:(r.next=n,n.prev=r,t.last=n)}function dn(n,t,r,e=!0){var l=(n&X)!==0,u=g,i={ctx:w,deps:null,nodes_start:null,nodes_end:null,f:n|I,first:null,fn:t,last:null,next:null,parent:l?null:u,prev:null,teardown:null,transitions:null,wv:0};if(r){var c=G;try{Sn(!0),Cn(i),i.f|=xt}catch(a){throw M(i),a}finally{Sn(c)}}else t!==null&&hn(i);var v=r&&i.deps===null&&i.first===null&&i.nodes_start===null&&i.teardown===null&&(i.f&(zn|tn))===0;if(!v&&!l&&e&&(u!==null&&$t(i,u),h!==null&&h.f&O)){var s=h;(s.effects??(s.effects=[])).push(i)}return i}function Kt(n){const t=dn(X,n,!0);return(r={})=>new Promise(e=>{r.outro?ut(t,()=>{M(t),e(void 0)}):(M(t),e(void 0))})}function Wt(n){return dn(Vn,n,!1)}function wn(n,t=[],r=Qn){const e=t.map(r);return tt(()=>n(...e.map(q)))}function tt(n,t=0){return dn(Tn|On|t,n,!0)}function bn(n,t=!0){return dn(Tn|L,n,!0,t)}function rt(n){var t=n.teardown;if(t!==null){const r=h;H(null);try{t.call(null)}finally{H(r)}}}function et(n,t=!1){var r=n.first;for(n.first=n.last=null;r!==null;){var e=r.next;M(r,t),r=e}}function Jt(n){for(var t=n.first;t!==null;){var r=t.next;t.f&L||M(t),t=r}}function M(n,t=!0){var r=!1;if((t||n.f&Nt)&&n.nodes_start!==null){for(var e=n.nodes_start,l=n.nodes_end;e!==null;){var u=e===l?null:vn(e);e.remove(),e=u}r=!0}et(n,t&&!r),sn(n,0),D(n,fn);var i=n.transitions;if(i!==null)for(const v of i)v.stop();rt(n);var c=n.parent;c!==null&&c.first!==null&&lt(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes_start=n.nodes_end=null}function lt(n){var t=n.parent,r=n.prev,e=n.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),t!==null&&(t.first===n&&(t.first=e),t.last===n&&(t.last=r))}function ut(n,t){var r=[];An(n,r,!0),ot(r,()=>{M(n),t&&t()})}function ot(n,t){var r=n.length;if(r>0){var e=()=>--r||t();for(var l of n)l.out(e)}else t()}function An(n,t,r){if(!(n.f&k)){if(n.f^=k,n.transitions!==null)for(const i of n.transitions)(i.is_global||r)&&t.push(i);for(var e=n.first;e!==null;){var l=e.next,u=(e.f&Hn)!==0||(e.f&L)!==0;An(e,t,u?r:!1),e=l}}}function it(n){at(n,!0)}function at(n,t){if(n.f&k){n.f^=k,n.f&y||(n.f^=y),$(n)&&(D(n,I),hn(n));for(var r=n.first;r!==null;){var e=r.next,l=(r.f&Hn)!==0||(r.f&L)!==0;at(r,l?t:!1),r=e}if(n.transitions!==null)for(const u of n.transitions)(u.is_global||t)&&u.in()}}let nn=!1,un=!1,on=null,G=!1;function Sn(n){G=n}let yn=[],j=0;let h=null,V=!1;function H(n){h=n}let g=null;function z(n){g=n}let b=null;function Qt(n){b=n}let E=null,T=0,C=null;function Zt(n){C=n}let st=1,an=0,S=!1;function ft(){return++st}function $(n){var s;var t=n.f;if(t&I)return!0;if(t&U){var r=n.deps,e=(t&R)!==0;if(r!==null){var l,u,i=(t&rn)!==0,c=e&&g!==null&&!S,v=r.length;if(i||c){for(l=0;l<v;l++)u=r[l],(i||!((s=u==null?void 0:u.reactions)!=null&&s.includes(n)))&&(u.reactions??(u.reactions=[])).push(n);i&&(n.f^=rn)}for(l=0;l<v;l++)if(u=r[l],$(u)&&nt(u),u.wv>n.wv)return!0}(!e||g!==null&&!S)&&D(n,y)}return!1}function nr(n,t){for(var r=t;r!==null;){if(r.f&tn)try{r.fn(n);return}catch{r.f^=tn}r=r.parent}throw nn=!1,n}function tr(n){return(n.f&fn)===0&&(n.parent===null||(n.parent.f&tn)===0)}function pn(n,t,r,e){if(nn){if(r===null&&(nn=!1),tr(t))throw n;return}r!==null&&(nn=!0);{nr(n,t);return}}function ct(n,t,r=0){var e=n.reactions;if(e!==null)for(var l=0;l<e.length;l++){var u=e[l];u.f&O?ct(u,t,r+1):t===u&&(r===0?D(u,I):u.f&y&&D(u,U),hn(u))}}function _t(n){var _;var t=E,r=T,e=C,l=h,u=S,i=b,c=w,v=V,s=n.f;E=null,T=0,C=null,h=s&(L|X)?null:n,S=(s&R)!==0&&(!G||l===null||v),b=null,Fn(n.ctx),V=!1,an++;try{var a=(0,n.fn)(),f=n.deps;if(E!==null){var o;if(sn(n,T),f!==null&&T>0)for(f.length=T+E.length,o=0;o<E.length;o++)f[T+o]=E[o];else n.deps=f=E;if(!S)for(o=T;o<f.length;o++)((_=f[o]).reactions??(_.reactions=[])).push(n)}else f!==null&&T<f.length&&(sn(n,T),f.length=T);if(_n()&&C!==null&&!(n.f&(O|U|I)))for(o=0;o<C.length;o++)ct(C[o],n);return l!==null&&an++,a}finally{E=t,T=r,C=e,h=l,S=u,b=i,Fn(c),V=v}}function rr(n,t){let r=t.reactions;if(r!==null){var e=mt.call(r,n);if(e!==-1){var l=r.length-1;l===0?r=t.reactions=null:(r[e]=r[l],r.pop())}}r===null&&t.f&O&&(E===null||!E.includes(t))&&(D(t,U),t.f&(R|rn)||(t.f^=rn),Zn(t),sn(t,0))}function sn(n,t){var r=n.deps;if(r!==null)for(var e=t;e<r.length;e++)rr(n,r[e])}function Cn(n){var t=n.f;if(!(t&fn)){D(n,y);var r=g,e=w;g=n;try{t&On?Jt(n):et(n),rt(n);var l=_t(n);n.teardown=typeof l=="function"?l:null,n.wv=st;var u=n.deps,i;Dn&&kt&&n.f&I}catch(c){pn(c,n,r,e||n.ctx)}finally{g=r}}}function er(){if(j>1e3){j=0;try{bt()}catch(n){if(on!==null)pn(n,on,null);else throw n}}j++}function lr(n){var t=n.length;if(t!==0){er();var r=G;G=!0;try{for(var e=0;e<t;e++){var l=n[e];l.f&y||(l.f^=y);var u=[];vt(l,u),ur(u)}}finally{G=r}}}function ur(n){var t=n.length;if(t!==0)for(var r=0;r<t;r++){var e=n[r];if(!(e.f&(fn|k)))try{$(e)&&(Cn(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?lt(e):e.fn=null))}catch(l){pn(l,e,null,e.ctx)}}}function or(){if(un=!1,j>1001)return;const n=yn;yn=[],lr(n),un||(j=0,on=null)}function hn(n){un||(un=!0,queueMicrotask(or)),on=n;for(var t=n;t.parent!==null;){t=t.parent;var r=t.f;if(r&(X|L)){if(!(r&y))return;t.f^=y}}yn.push(t)}function vt(n,t){var r=n.first,e=[];n:for(;r!==null;){var l=r.f,u=(l&L)!==0,i=u&&(l&y)!==0,c=r.next;if(!i&&!(l&k))if(l&Tn){if(u)r.f^=y;else{var v=h;try{h=r,$(r)&&Cn(r)}catch(o){pn(o,r,null,r.ctx)}finally{h=v}}var s=r.first;if(s!==null){r=s;continue}}else l&Vn&&e.push(r);if(c===null){let o=r.parent;for(;o!==null;){if(n===o)break n;var a=o.next;if(a!==null){r=a;continue n}o=o.parent}}r=c}for(var f=0;f<e.length;f++)s=e[f],t.push(s),vt(s,t)}function q(n){var t=n.f,r=(t&O)!==0;if(h!==null&&!V){b!==null&&b.includes(n)&&At();var e=h.deps;n.rv<an&&(n.rv=an,E===null&&e!==null&&e[T]===n?T++:E===null?E=[n]:(!S||!E.includes(n))&&E.push(n))}else if(r&&n.deps===null&&n.effects===null){var l=n,u=l.parent;u!==null&&!(u.f&R)&&(l.f^=R)}return r&&(l=n,$(l)&&nt(l)),n.v}const ir=-7169;function D(n,t){n.f=n.f&ir|t}const ar=["touchstart","touchmove"];function sr(n){return ar.includes(n)}const dt=new Set,xn=new Set;function pt(n){for(var t=0;t<n.length;t++)dt.add(n[t]);for(var r of xn)r(n)}function Q(n){var N;var t=this,r=t.ownerDocument,e=n.type,l=((N=n.composedPath)==null?void 0:N.call(n))||[],u=l[0]||n.target,i=0,c=n.__root;if(c){var v=l.indexOf(c);if(v!==-1&&(t===document||t===window)){n.__root=t;return}var s=l.indexOf(t);if(s===-1)return;v<=s&&(i=v)}if(u=l[i]||n.target,u!==t){wt(n,"currentTarget",{configurable:!0,get(){return u||r}});var a=h,f=g;H(null),z(null);try{for(var o,_=[];u!==null;){var d=u.assignedSlot||u.parentNode||u.host||null;try{var m=u["__"+e];if(m!==void 0&&!u.disabled)if(Gn(m)){var[x,...p]=m;x.apply(u,[n,...p])}else m.call(u,n)}catch(A){o?_.push(A):o=A}if(n.cancelBubble||d===t||d===null)break;u=d}if(o){for(let A of _)queueMicrotask(()=>{throw A});throw o}}finally{n.__root=t,delete n.currentTarget,H(a),z(f)}}}function fr(n){var t=document.createElement("template");return t.innerHTML=n,t.content}function Mn(n,t){var r=g;r.nodes_start===null&&(r.nodes_start=n,r.nodes_end=t)}function kn(n,t){var r=(t&Pt)!==0,e=(t&St)!==0,l,u=!n.startsWith("<!>");return()=>{l===void 0&&(l=fr(u?n:"<!>"+n),r||(l=ln(l)));var i=e?document.importNode(l,!0):l.cloneNode(!0);if(r){var c=ln(i),v=i.lastChild;Mn(c,v)}else Mn(i,i);return i}}function En(n,t){n!==null&&n.before(t)}function Ln(n,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(n.__t??(n.__t=n.nodeValue))&&(n.__t=r,n.nodeValue=r+"")}function cr(n,t){return _r(n,t)}const B=new Map;function _r(n,{target:t,anchor:r,props:e={},events:l,context:u,intro:i=!0}){Ht();var c=new Set,v=f=>{for(var o=0;o<f.length;o++){var _=f[o];if(!c.has(_)){c.add(_);var d=sr(_);t.addEventListener(_,Q,{passive:d});var m=B.get(_);m===void 0?(document.addEventListener(_,Q,{passive:d}),B.set(_,1)):B.set(_,m+1)}}};v(Nn(dt)),xn.add(v);var s=void 0,a=Kt(()=>{var f=r??t.appendChild(Jn());return bn(()=>{if(u){Mt({});var o=w;o.c=u}l&&(e.$$events=l),s=n(f,e)||{},u&&Lt()}),()=>{var d;for(var o of c){t.removeEventListener(o,Q);var _=B.get(o);--_===0?(document.removeEventListener(o,Q),B.delete(o)):B.set(o,_)}xn.delete(v),f!==r&&((d=f.parentNode)==null||d.removeChild(f))}});return vr.set(s,a),s}let vr=new WeakMap;function dr(n,t){return t}function pr(n,t,r,e){for(var l=[],u=t.length,i=0;i<u;i++)An(t[i].e,l,!0);var c=u>0&&l.length===0&&r!==null;if(c){var v=r.parentNode;Ut(v),v.append(r),e.clear(),P(n,t[0].prev,t[u-1].next)}ot(l,()=>{for(var s=0;s<u;s++){var a=t[s];c||(e.delete(a.k),P(n,a.prev,a.next)),M(a.e,!c)}})}function hr(n,t,r,e,l,u=null){var i=n,c={items:new Map,first:null};{var v=n;i=v.appendChild(Jn())}var s=null,a=!1,f=Yt(()=>{var o=r();return Gn(o)?o:o==null?[]:Nn(o)});tt(()=>{var o=q(f),_=o.length;a&&_===0||(a=_===0,gr(o,c,i,l,t,e,r),u!==null&&(_===0?s?it(s):s=bn(()=>u(i)):s!==null&&ut(s,()=>{s=null})),q(f))})}function gr(n,t,r,e,l,u,i){var c=n.length,v=t.items,s=t.first,a=s,f,o=null,_=[],d=[],m,x,p,N;for(N=0;N<c;N+=1){if(m=n[N],x=u(m,N),p=v.get(x),p===void 0){var A=a?a.e.nodes_start:r;o=wr(A,t,o,o===null?t.first:o.next,m,x,N,e,l,i),v.set(x,o),_=[],d=[],a=o.next;continue}if(mr(p,m,N),p.e.f&k&&it(p.e),p!==a){if(f!==void 0&&f.has(p)){if(_.length<d.length){var K=d[0],F;o=K.prev;var Rn=_[0],gn=_[_.length-1];for(F=0;F<_.length;F+=1)qn(_[F],K,r);for(F=0;F<d.length;F+=1)f.delete(d[F]);P(t,Rn.prev,gn.next),P(t,o,Rn),P(t,gn,K),a=K,o=gn,N-=1,_=[],d=[]}else f.delete(p),qn(p,a,r),P(t,p.prev,p.next),P(t,p,o===null?t.first:o.next),P(t,o,p),o=p;continue}for(_=[],d=[];a!==null&&a.k!==x;)a.e.f&k||(f??(f=new Set)).add(a),d.push(a),a=a.next;if(a===null)continue;p=a}_.push(p),o=p,a=p.next}if(a!==null||f!==void 0){for(var mn=f===void 0?[]:Nn(f);a!==null;)a.e.f&k||mn.push(a),a=a.next;var ht=mn.length;if(ht>0){var gt=c===0?r:null;pr(t,mn,gt,v)}}g.first=t.first&&t.first.e,g.last=o&&o.e}function mr(n,t,r,e){Xn(n.v,t),n.i=r}function wr(n,t,r,e,l,u,i,c,v,s){var a=(v&Dt)!==0,f=(v&Ft)===0,o=a?f?jn(l):en(l):l,_=v&It?en(i):i,d={i:_,v:o,k:u,a:null,e:null,prev:r,next:e};try{return d.e=bn(()=>c(n,o,_,s),Vt),d.e.prev=r&&r.e,d.e.next=e&&e.e,r===null?t.first=d:(r.next=d,r.e.next=d.e),e!==null&&(e.prev=d,e.e.prev=d.e),d}finally{}}function qn(n,t,r){for(var e=n.next?n.next.e.nodes_start:r,l=t?t.e.nodes_start:r,u=n.e.nodes_start;u!==e;){var i=vn(u);l.before(u),u=i}}function P(n,t,r){t===null?n.first=r:(t.next=r,t.e.next=r&&r.e),r!==null&&(r.prev=t,r.e.prev=t&&t.e)}function Z(n,t,r,e){var l=n.__attributes??(n.__attributes={});l[t]!==(l[t]=r)&&(t==="style"&&"__styles"in n&&(n.__styles={}),t==="loading"&&(n[Tt]=r),r==null?n.removeAttribute(t):typeof r!="string"&&Er(n).includes(t)?n[t]=r:n.setAttribute(t,r))}var Bn=new Map;function Er(n){var t=Bn.get(n.nodeName);if(t)return t;Bn.set(n.nodeName,t=[]);for(var r,e=n,l=Element.prototype;l!==e;){r=Et(e);for(var u in r)r[u].set&&t.push(u);e=yt(e)}return t}const yr="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(yr);Rt();pt(["click"]);var xr=(n,t)=>t()(),Nr=kn('<div class="menu_item svelte-jwnlzx"><button class="menu_item_button svelte-jwnlzx"><img class="menu_item_image svelte-jwnlzx"> </button></div>'),Tr=(n,t,r)=>{t(r())},Or=kn('<button class="menu_cat_button svelte-jwnlzx"> </button> <div class="menu_cat svelte-jwnlzx"></div> <br>',1),br=(n,t)=>{Gt(t,!q(t))},Ar=kn('<main><div id="main_menu" class="main_menu svelte-jwnlzx"><!> <!></div> <button>collapse menu</button></main>');function Cr(n){let t=qt(!0);function r(s){let a=document.getElementById("menu_cat_"+s);a.style.display!=="block"?a.style.display="block":a.style.display="none"}const e=[["NOT Gate",()=>console.log("NOT Gate")],["Buffer",()=>console.log("Buffer")],["AND",()=>console.log("AND Gate")],["OR Gate",()=>console.log("OR Gate")],["NAND Gate",()=>console.log("NAND Gate")],["NOR Gate",()=>console.log("NOR Gate")],["XOR Gate",()=>console.log("XOR Gate")],["NXOR Gate",()=>console.log("NXOR Gate")],["Odd Parity",()=>console.log("Odd Parity")],["Even Parity",()=>console.log("Even Parity")],["Controlled Buffer",()=>console.log("Controlled Buffer")],["Controlled Inverter",()=>console.log("Controlled Inverter")]];var l=Ar(),u=Y(l);{const s=(f,o=W,_=W)=>{var d=Nr(),m=Y(d);m.__click=[xr,_];var x=Y(m);Z(x,"src","./src/assets/Place Holder.png");var p=J(x);wn(()=>{Z(x,"alt",o()+" Circut Pictogram"),Ln(p,` ${o()??""}`)}),En(f,d)},a=(f,o=W,_=W)=>{var d=Or(),m=zt(d);m.__click=[Tr,r,o];var x=Y(m),p=J(m,2);hr(p,5,_,dr,(N,A)=>{s(N,()=>q(A)[0],()=>q(A)[1])}),wn(()=>{Ln(x,o()),Z(p,"id","menu_cat_"+o())}),En(f,d)};var i=Y(u);a(i,()=>"Basic",()=>e);var c=J(i,2);a(c,()=>"Basic2",()=>e)}var v=J(u,2);v.__click=[br,t],wn(()=>Z(u,"style",q(t)?"left: 0%":"left: -20%")),En(n,l)}pt(["click"]);cr(Cr,{target:document.getElementById("app")});

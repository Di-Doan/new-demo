import{a as H,b as te,c as ne,d as h,j as re,r as oe,t as L,v as se}from"./chunk-W4VWF4WH.js";import{Aa as N,Ba as Z,Ca as S,Ea as _,Fa as g,Ga as v,Ha as K,Ia as G,Ja as Y,Ka as q,La as W,Ma as X,Na as J,Oa as m,Ta as w,U as y,X as l,Za as Q,_ as O,a as b,aa as a,ab as M,b as V,ea as E,ma as $,nc as ee,wa as I,za as z}from"./chunk-5ETVNT53.js";var j=class extends ne{constructor(){super(...arguments),this.supportsDOMEvents=!0}},x=class r extends j{static makeCurrent(){te(new r)}onAndCancel(n,e,t){return n.addEventListener(e,t),()=>{n.removeEventListener(e,t)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.parentNode&&n.parentNode.removeChild(n)}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=ve();return e==null?null:Ee(e)}resetBaseElement(){T=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return re(document.cookie,n)}},T=null;function ve(){return T=T||document.querySelector("base"),T?T.getAttribute("href"):null}function Ee(r){return new URL(r,document.baseURI).pathname}var Se=(()=>{class r{build(){return new XMLHttpRequest}static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac})}}return r})(),F=new O(""),de=(()=>{class r{constructor(e,t){this._zone=t,this._eventNameToPlugin=new Map,e.forEach(o=>{o.manager=this}),this._plugins=e.slice().reverse()}addEventListener(e,t,o){return this._findPluginFor(t).addEventListener(e,t,o)}getZone(){return this._zone}_findPluginFor(e){let t=this._eventNameToPlugin.get(e);if(t)return t;if(t=this._plugins.find(s=>s.supports(e)),!t)throw new y(5101,!1);return this._eventNameToPlugin.set(e,t),t}static{this.\u0275fac=function(t){return new(t||r)(a(F),a(M))}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac})}}return r})(),R=class{constructor(n){this._doc=n}},P="ng-app-id",ue=(()=>{class r{constructor(e,t,o,s={}){this.doc=e,this.appId=t,this.nonce=o,this.platformId=s,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=L(s),this.resetHostNodes()}addStyles(e){for(let t of e)this.changeUsageCount(t,1)===1&&this.onStyleAdded(t)}removeStyles(e){for(let t of e)this.changeUsageCount(t,-1)<=0&&this.onStyleRemoved(t)}ngOnDestroy(){let e=this.styleNodesInDOM;e&&(e.forEach(t=>t.remove()),e.clear());for(let t of this.getAllStyles())this.onStyleRemoved(t);this.resetHostNodes()}addHost(e){this.hostNodes.add(e);for(let t of this.getAllStyles())this.addStyleToHost(e,t)}removeHost(e){this.hostNodes.delete(e)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(e){for(let t of this.hostNodes)this.addStyleToHost(t,e)}onStyleRemoved(e){let t=this.styleRef;t.get(e)?.elements?.forEach(o=>o.remove()),t.delete(e)}collectServerRenderedStyles(){let e=this.doc.head?.querySelectorAll(`style[${P}="${this.appId}"]`);if(e?.length){let t=new Map;return e.forEach(o=>{o.textContent!=null&&t.set(o.textContent,o)}),t}return null}changeUsageCount(e,t){let o=this.styleRef;if(o.has(e)){let s=o.get(e);return s.usage+=t,s.usage}return o.set(e,{usage:t,elements:[]}),t}getStyleElement(e,t){let o=this.styleNodesInDOM,s=o?.get(t);if(s?.parentNode===e)return o.delete(t),s.removeAttribute(P),s;{let i=this.doc.createElement("style");return this.nonce&&i.setAttribute("nonce",this.nonce),i.textContent=t,this.platformIsServer&&i.setAttribute(P,this.appId),e.appendChild(i),i}}addStyleToHost(e,t){let o=this.getStyleElement(e,t),s=this.styleRef,i=s.get(t)?.elements;i?i.push(o):s.set(t,{elements:[o],usage:1})}resetHostNodes(){let e=this.hostNodes;e.clear(),e.add(this.doc.head)}static{this.\u0275fac=function(t){return new(t||r)(a(h),a(N),a(_,8),a(S))}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac})}}return r})(),k={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},B=/%COMP%/g,le="%COMP%",we=`_nghost-${le}`,Me=`_ngcontent-${le}`,Te=!0,De=new O("",{providedIn:"root",factory:()=>Te});function Ce(r){return Me.replace(B,r)}function Re(r){return we.replace(B,r)}function he(r,n){return n.map(e=>e.replace(B,r))}var ie=(()=>{class r{constructor(e,t,o,s,i,c,d,u=null){this.eventManager=e,this.sharedStylesHost=t,this.appId=o,this.removeStylesOnCompDestroy=s,this.doc=i,this.platformId=c,this.ngZone=d,this.nonce=u,this.rendererByCompId=new Map,this.platformIsServer=L(c),this.defaultRenderer=new D(e,i,d,this.platformIsServer)}createRenderer(e,t){if(!e||!t)return this.defaultRenderer;this.platformIsServer&&t.encapsulation===E.ShadowDom&&(t=V(b({},t),{encapsulation:E.Emulated}));let o=this.getOrCreateRenderer(e,t);return o instanceof A?o.applyToHost(e):o instanceof C&&o.applyStyles(),o}getOrCreateRenderer(e,t){let o=this.rendererByCompId,s=o.get(t.id);if(!s){let i=this.doc,c=this.ngZone,d=this.eventManager,u=this.sharedStylesHost,f=this.removeStylesOnCompDestroy,p=this.platformIsServer;switch(t.encapsulation){case E.Emulated:s=new A(d,u,t,this.appId,f,i,c,p);break;case E.ShadowDom:return new U(d,u,e,t,i,c,this.nonce,p);default:s=new C(d,u,t,f,i,c,p);break}o.set(t.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(t){return new(t||r)(a(de),a(ue),a(N),a(De),a(h),a(S),a(M),a(_))}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac})}}return r})(),D=class{constructor(n,e,t,o){this.eventManager=n,this.doc=e,this.ngZone=t,this.platformIsServer=o,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(n,e){return e?this.doc.createElementNS(k[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(ae(n)?n.content:n).appendChild(e)}insertBefore(n,e,t){n&&(ae(n)?n.content:n).insertBefore(e,t)}removeChild(n,e){n&&n.removeChild(e)}selectRootElement(n,e){let t=typeof n=="string"?this.doc.querySelector(n):n;if(!t)throw new y(-5104,!1);return e||(t.textContent=""),t}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,t,o){if(o){e=o+":"+e;let s=k[o];s?n.setAttributeNS(s,e,t):n.setAttribute(e,t)}else n.setAttribute(e,t)}removeAttribute(n,e,t){if(t){let o=k[t];o?n.removeAttributeNS(o,e):n.removeAttribute(`${t}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,t,o){o&(w.DashCase|w.Important)?n.style.setProperty(e,t,o&w.Important?"important":""):n.style[e]=t}removeStyle(n,e,t){t&w.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,t){n!=null&&(n[e]=t)}setValue(n,e){n.nodeValue=e}listen(n,e,t){if(typeof n=="string"&&(n=H().getGlobalEventTarget(this.doc,n),!n))throw new Error(`Unsupported event target ${n} for event ${e}`);return this.eventManager.addEventListener(n,e,this.decoratePreventDefault(t))}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;(this.platformIsServer?this.ngZone.runGuarded(()=>n(e)):n(e))===!1&&e.preventDefault()}}};function ae(r){return r.tagName==="TEMPLATE"&&r.content!==void 0}var U=class extends D{constructor(n,e,t,o,s,i,c,d){super(n,s,i,d),this.sharedStylesHost=e,this.hostEl=t,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=he(o.id,o.styles);for(let f of u){let p=document.createElement("style");c&&p.setAttribute("nonce",c),p.textContent=f,this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,t){return super.insertBefore(this.nodeOrShadowRoot(n),e,t)}removeChild(n,e){return super.removeChild(this.nodeOrShadowRoot(n),e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},C=class extends D{constructor(n,e,t,o,s,i,c,d){super(n,s,i,c),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=o,this.styles=d?he(d,t.styles):t.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},A=class extends C{constructor(n,e,t,o,s,i,c,d){let u=o+"-"+t.id;super(n,e,t,s,i,c,d,u),this.contentAttr=Ce(u),this.hostAttr=Re(u)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let t=super.createElement(n,e);return super.setAttribute(t,this.contentAttr,""),t}},Ae=(()=>{class r extends R{constructor(e){super(e)}supports(e){return!0}addEventListener(e,t,o){return e.addEventListener(t,o,!1),()=>this.removeEventListener(e,t,o)}removeEventListener(e,t,o){return e.removeEventListener(t,o)}static{this.\u0275fac=function(t){return new(t||r)(a(h))}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac})}}return r})(),ce=["alt","control","meta","shift"],be={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Oe={alt:r=>r.altKey,control:r=>r.ctrlKey,meta:r=>r.metaKey,shift:r=>r.shiftKey},Ie=(()=>{class r extends R{constructor(e){super(e)}supports(e){return r.parseEventName(e)!=null}addEventListener(e,t,o){let s=r.parseEventName(t),i=r.eventCallback(s.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>H().onAndCancel(e,s.domEventName,i))}static parseEventName(e){let t=e.toLowerCase().split("."),o=t.shift();if(t.length===0||!(o==="keydown"||o==="keyup"))return null;let s=r._normalizeKey(t.pop()),i="",c=t.indexOf("code");if(c>-1&&(t.splice(c,1),i="code."),ce.forEach(u=>{let f=t.indexOf(u);f>-1&&(t.splice(f,1),i+=u+".")}),i+=s,t.length!=0||s.length===0)return null;let d={};return d.domEventName=o,d.fullKey=i,d}static matchEventFullKeyCode(e,t){let o=be[e.key]||e.key,s="";return t.indexOf("code.")>-1&&(o=e.code,s="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),ce.forEach(i=>{if(i!==o){let c=Oe[i];c(e)&&(s+=i+".")}}),s+=o,s===t)}static eventCallback(e,t,o){return s=>{r.matchEventFullKeyCode(s,e)&&o.runGuarded(()=>t(s))}}static _normalizeKey(e){return e==="esc"?"escape":e}static{this.\u0275fac=function(t){return new(t||r)(a(h))}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac})}}return r})();function mt(r,n){return ee(b({rootComponent:r},Ne(n)))}function Ne(r){return{appProviders:[...ke,...r?.providers??[]],platformProviders:Pe}}function _e(){x.makeCurrent()}function He(){return new I}function Le(){return z(document),document}var Pe=[{provide:S,useValue:oe},{provide:Z,useValue:_e,multi:!0},{provide:h,useFactory:Le,deps:[]}];var ke=[{provide:$,useValue:"root"},{provide:I,useFactory:He,deps:[]},{provide:F,useClass:Ae,multi:!0,deps:[h,M,S]},{provide:F,useClass:Ie,multi:!0,deps:[h]},ie,ue,de,{provide:Q,useExisting:ie},{provide:se,useClass:Se,deps:[]},[]];var yt=(()=>{class r{constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static{this.\u0275fac=function(t){return new(t||r)(a(h))}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var je=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275prov=l({token:r,factory:function(t){let o=null;return t?o=new(t||r):o=a(xe),o},providedIn:"root"})}}return r})(),xe=(()=>{class r extends je{constructor(e){super(),this._doc=e}sanitize(e,t){if(t==null)return null;switch(e){case m.NONE:return t;case m.HTML:return v(t,"HTML")?g(t):J(this._doc,String(t)).toString();case m.STYLE:return v(t,"Style")?g(t):t;case m.SCRIPT:if(v(t,"Script"))return g(t);throw new y(5200,!1);case m.URL:return v(t,"URL")?g(t):X(String(t));case m.RESOURCE_URL:if(v(t,"ResourceURL"))return g(t);throw new y(5201,!1);default:throw new y(5202,!1)}}bypassSecurityTrustHtml(e){return K(e)}bypassSecurityTrustStyle(e){return G(e)}bypassSecurityTrustScript(e){return Y(e)}bypassSecurityTrustUrl(e){return q(e)}bypassSecurityTrustResourceUrl(e){return W(e)}static{this.\u0275fac=function(t){return new(t||r)(a(h))}}static{this.\u0275prov=l({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var fe=class{constructor(){this._id="",this.name="",this.email="",this.title="",this.note=""}},pe=class{constructor(){this._id="",this.userEmail=""}},me=class{constructor(n={}){return this._id="",this.username="",this.password="",this.name="",this.email="",this.point=0,this.role="user",this.roleName="Ng\u01B0\u1EDDi d\xF9ng",n.role==="superAdmin"?n.roleName="Qu\u1EA3n tr\u1ECB vi\xEAn si\xEAu c\u1EA5p":n.roleName=n.role==="admin"?"Qu\u1EA3n tr\u1ECB vi\xEAn":"Ng\u01B0\u1EDDi d\xF9ng",Object.assign(this,n),this}},ye=class{constructor(){this._id="",this.img="",this.name="",this.start_date="",this.end_date="",this.point=0,this.isHot=!1}};export{ie as a,mt as b,yt as c,je as d,fe as e,pe as f,me as g,ye as h};

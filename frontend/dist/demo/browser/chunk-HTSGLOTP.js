import{a as ie}from"./chunk-LVCBFSWB.js";import{f as te}from"./chunk-65TSPMQQ.js";import{h as Z,i as ee}from"./chunk-SASYOJ3X.js";import{$ as X,P as J,X as E,_ as W,aa as I,ba as Y,k as z,m as b,n as K,o as V,q as _}from"./chunk-W4VWF4WH.js";import{Cb as c,Db as $,Eb as C,Fb as y,Hb as T,Ib as x,Jb as R,Kb as m,Lb as A,Mb as D,Qa as O,R as F,Rb as B,Sb as S,Tb as P,Ua as a,Va as h,Y as G,cc as H,db as k,ga as f,ha as j,j as M,jb as p,kb as U,lb as l,ob as L,pb as N,sb as Q,tb as q,ub as i,vb as o,wb as u,xa as w,zb as g}from"./chunk-5ETVNT53.js";var se=["*",[["p-header"]],[["p-footer"]]],pe=["*","p-header","p-footer"];function me(e,s){e&1&&g(0)}function ce(e,s){if(e&1&&(i(0,"div",8),C(1,1),p(2,me,1,0,"ng-container",6),o()),e&2){let t=c();a(2),l("ngTemplateOutlet",t.headerTemplate)}}function de(e,s){e&1&&g(0)}function fe(e,s){if(e&1&&(i(0,"div",9),m(1),p(2,de,1,0,"ng-container",6),o()),e&2){let t=c();a(),D(" ",t.header," "),a(),l("ngTemplateOutlet",t.titleTemplate)}}function ue(e,s){e&1&&g(0)}function ge(e,s){if(e&1&&(i(0,"div",10),m(1),p(2,ue,1,0,"ng-container",6),o()),e&2){let t=c();a(),D(" ",t.subheader," "),a(),l("ngTemplateOutlet",t.subtitleTemplate)}}function _e(e,s){e&1&&g(0)}function ve(e,s){e&1&&g(0)}function he(e,s){if(e&1&&(i(0,"div",11),C(1,2),p(2,ve,1,0,"ng-container",6),o()),e&2){let t=c();a(2),l("ngTemplateOutlet",t.footerTemplate)}}var ae=(()=>{class e{el;header;subheader;set style(t){J.equals(this._style(),t)||this._style.set(t)}styleClass;headerFacet;footerFacet;templates;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_style=k(null);constructor(t){this.el=t}ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this.headerTemplate=t.template;break;case"title":this.titleTemplate=t.template;break;case"subtitle":this.subtitleTemplate=t.template;break;case"content":this.contentTemplate=t.template;break;case"footer":this.footerTemplate=t.template;break;default:this.contentTemplate=t.template;break}})}getBlockableElement(){return this.el.nativeElement.children[0]}static \u0275fac=function(n){return new(n||e)(h(w))};static \u0275cmp=f({type:e,selectors:[["p-card"]],contentQueries:function(n,r,v){if(n&1&&(y(v,W,5),y(v,X,5),y(v,I,4)),n&2){let d;T(d=x())&&(r.headerFacet=d.first),T(d=x())&&(r.footerFacet=d.first),T(d=x())&&(r.templates=d)}},hostAttrs:[1,"p-element"],inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},ngContentSelectors:pe,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(n,r){n&1&&($(se),i(0,"div",0),p(1,ce,3,1,"div",1),i(2,"div",2),p(3,fe,3,2,"div",3)(4,ge,3,2,"div",4),i(5,"div",5),C(6),p(7,_e,1,0,"ng-container",6),o(),p(8,he,3,1,"div",7),o()()),n&2&&(N(r.styleClass),l("ngClass","p-card p-component")("ngStyle",r._style()),U("data-pc-name","card"),a(),l("ngIf",r.headerFacet||r.headerTemplate),a(2),l("ngIf",r.header||r.titleTemplate),a(),l("ngIf",r.subheader||r.subtitleTemplate),a(3),l("ngTemplateOutlet",r.contentTemplate),a(),l("ngIf",r.footerFacet||r.footerTemplate))},dependencies:[z,b,V,K],styles:[`@layer primeng{.p-card-header img{width:100%}}
`],encapsulation:2,changeDetection:0})}return e})(),re=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=j({type:e});static \u0275inj=G({imports:[_,Y]})}return e})();var Te=()=>({width:"350px"});function xe(e,s){if(e&1&&(i(0,"div",5),u(1,"img",6),o()),e&2){let t=c();a(),l("src",t.giftDetail.img,O)}}function Se(e,s){if(e&1&&(i(0,"div",7),u(1,"img",8),i(2,"span",9),m(3),o()()),e&2){let t=c();a(3),A(t.giftDetail.point)}}var oe=(()=>{class e{constructor(){}ngOnInit(){}static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275cmp=f({type:e,selectors:[["app-gift-card"]],inputs:{giftDetail:"giftDetail"},standalone:!0,features:[S],decls:11,vars:4,consts:[[1,"card","flex","justify-content-center"],[3,"header"],["pTemplate","header"],["pTemplate","subtitle"],[1,"quicksand-normal-2"],[1,"d-flex","justify-content-center","mt-3"],["alt","Card",1,"justify-content-center",2,"width","fit-content",3,"src"],[1,"d-flex"],["alt","Subheader Image","src","../../../../assets/img/logo-mini.png",2,"width","24px"],[1,"ms-2"]],template:function(n,r){n&1&&(i(0,"div",0)(1,"p-card",1),p(2,xe,2,1,"ng-template",2)(3,Se,4,1,"ng-template",3),i(4,"ul",4)(5,"li"),m(6,"Lorem ipsum dolor sit amet, consectetur adipiscing elit."),o(),i(7,"li"),m(8,"Curabitur et mauris iaculis, euismod magna id, tempor nulla."),o(),i(9,"li"),m(10,"Duis lacinia lectus a nibh venenatis consequat."),o()()()()),n&2&&(a(),L(P(3,Te)),l("header",r.giftDetail.name))},dependencies:[re,ae,I,te,_]})}}return e})();var be=(e,s)=>s._id;function Ee(e,s){if(e&1&&(i(0,"div",5),u(1,"app-gift-card",6),o()),e&2){let t=s.$implicit;a(),l("giftDetail",t)}}function Ie(e,s){if(e&1&&(i(0,"div",4),Q(1,Ee,2,1,"div",5,be),o()),e&2){let t=c();a(),q(t.giftList)}}function De(e,s){e&1&&(i(0,"h2",7),m(1," Kh\xF4ng c\xF3 qu\xE0 t\u1EB7ng "),o())}var We=(()=>{class e{constructor(t,n){this.userGiftService=t,this.messageService=n,this.destroyed$=new M,this.emptyList=!1}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.complete()}ngOnInit(){this.getGiftList()}getGiftList(){this.userGiftService.getAllUserGift().pipe(F(this.destroyed$)).subscribe({next:t=>{this.giftList=t.data.list},error:t=>{this.emptyList=!0,t.error.errCode!=118&&this.messageService.add({severity:"error",summary:"L\u1ED7i",detail:t.error.errMessage,life:3e3})}})}static{this.\u0275fac=function(n){return new(n||e)(h(ie),h(E))}}static{this.\u0275cmp=f({type:e,selectors:[["app-user-gift"]],standalone:!0,features:[B([E]),S],decls:8,vars:2,consts:[["noGiftOnDisplay",""],[1,"nav-textarea"],[1,"container","py-5"],["class","row",4,"ngIf","ngIfElse"],[1,"row"],[1,"col-md-4","mb-5"],[3,"giftDetail"],[1,"text-center","quicksand-bold",2,"color","#e39717"]],template:function(n,r){if(n&1&&(i(0,"div",1)(1,"h3"),m(2,"T\xDAI QU\xC0 C\xC1 NH\xC2N"),o()(),i(3,"div",2),u(4,"p-toast"),p(5,Ie,3,0,"div",3),o(),p(6,De,2,0,"ng-template",null,0,H)),n&2){let v=R(7);a(5),l("ngIf",r.emptyList==!1)("ngIfElse",v)}},dependencies:[oe,ee,Z,_,b]})}}return e})();export{We as UserGiftComponent};

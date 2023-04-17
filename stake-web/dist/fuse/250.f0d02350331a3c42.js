"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[250],{6236:(y,p,a)=>{a.d(p,{J:()=>t});var d=a(1281),x=a(8288),n=a(4650),g=a(6895);function h(o,e){1&o&&(n.ynx(0),n.TgZ(1,"div",1),n.Hsn(2),n.qZA(),n.TgZ(3,"div",2),n.Hsn(4,1),n.qZA(),n.BQk())}function m(o,e){1&o&&(n.TgZ(0,"div",4),n.Hsn(1,3),n.qZA()),2&o&&n.Q6J("@expandCollapse",void 0)}function v(o,e){if(1&o&&(n.ynx(0),n.Hsn(1,2),n.YNc(2,m,2,1,"div",3),n.BQk()),2&o){const r=n.oxw();n.xp6(2),n.Q6J("ngIf",r.expanded)}}const b=[[["","fuseCardFront",""]],[["","fuseCardBack",""]],"*",[["","fuseCardExpansion",""]]];class l{constructor(){this.expanded=!1,this.face="front",this.flippable=!1}get classList(){return{"fuse-card-expanded":this.expanded,"fuse-card-face-back":this.flippable&&"back"===this.face,"fuse-card-face-front":this.flippable&&"front"===this.face,"fuse-card-flippable":this.flippable}}ngOnChanges(e){"expanded"in e&&(this.expanded=(0,d.Ig)(e.expanded.currentValue)),"flippable"in e&&(this.flippable=(0,d.Ig)(e.flippable.currentValue))}}l.\u0275fac=function(e){return new(e||l)},l.\u0275cmp=n.Xpm({type:l,selectors:[["fuse-card"]],hostVars:2,hostBindings:function(e,r){2&e&&n.Tol(r.classList)},inputs:{expanded:"expanded",face:"face",flippable:"flippable"},exportAs:["fuseCard"],features:[n.TTD],ngContentSelectors:["[fuseCardFront]","[fuseCardBack]","*","[fuseCardExpansion]"],decls:2,vars:2,consts:[[4,"ngIf"],[1,"fuse-card-front"],[1,"fuse-card-back"],["class","fuse-card-expansion",4,"ngIf"],[1,"fuse-card-expansion"]],template:function(e,r){1&e&&(n.F$t(b),n.YNc(0,h,5,0,"ng-container",0),n.YNc(1,v,3,1,"ng-container",0)),2&e&&(n.Q6J("ngIf",r.flippable),n.xp6(1),n.Q6J("ngIf",!r.flippable))},dependencies:[g.O5],styles:["fuse-card{position:relative;display:flex;overflow:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable{border-radius:0;overflow:visible;transform-style:preserve-3d;transition:transform 1s;perspective:600px;background:transparent;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-front{visibility:hidden;opacity:0;transform:rotateY(180deg)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-back{visibility:visible;opacity:1;transform:rotateY(360deg)}fuse-card.fuse-card-flippable .fuse-card-front,fuse-card.fuse-card-flippable .fuse-card-back{display:flex;flex-direction:column;flex:1 1 auto;z-index:10;transition:transform .5s ease-out 0s,visibility 0s ease-in .2s,opacity 0s ease-in .2s;-webkit-backface-visibility:hidden;backface-visibility:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable .fuse-card-front{position:relative;opacity:1;visibility:visible;transform:rotateY(0);overflow:hidden}fuse-card.fuse-card-flippable .fuse-card-back{position:absolute;inset:0;opacity:0;visibility:hidden;transform:rotateY(180deg);overflow:hidden auto}\n"],encapsulation:2,data:{animation:x.L}});class t{}t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[g.ez]})},5250:(y,p,a)=>{a.r(p),a.d(p,{AuthSignOutModule:()=>u});var d=a(9299),x=a(4859),n=a(6236),g=a(4466),h=a(7579),m=a(5963),v=a(8746),b=a(2529),w=a(2722),l=a(8505),t=a(4650),o=a(8951),e=a(6895),r=a(3317),A=a(5707);function C(s,i){if(1&s&&(t.ynx(0),t._uU(1),t.ALo(2,"capitalize"),t.ALo(3,"transloco"),t.ALo(4,"i18nPlural"),t.BQk()),2&s){const c=t.oxw();t.xp6(1),t.AsE(" ",t.lcZ(2,2,t.lcZ(3,4,"redirecting in"))," ",t.xi3(4,6,c.countdown,c.countdownMapping)," ")}}function Z(s,i){1&s&&(t.ynx(0),t._uU(1),t.ALo(2,"capitalize"),t.ALo(3,"transloco"),t.BQk()),2&s&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,t.lcZ(3,3,"you are now being redirected"))," "))}const O=function(){return["/"]};class f{constructor(i,c){this._authService=i,this._router=c,this.countdown=5,this.countdownMapping={"=1":"# second",other:"# seconds"},this._unsubscribeAll=new h.x}ngOnInit(){this._authService.signOut(),(0,m.H)(1e3,1e3).pipe((0,v.x)(()=>{this._router.navigate(["/"])}),(0,b.o)(()=>this.countdown>0),(0,w.R)(this._unsubscribeAll),(0,l.b)(()=>this.countdown--)).subscribe()}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}}f.\u0275fac=function(i){return new(i||f)(t.Y36(o.e),t.Y36(d.F0))},f.\u0275cmp=t.Xpm({type:f,selectors:[["auth-sign-out"]],decls:21,vars:19,consts:[[1,"flex","flex-col","flex-auto","items-center","sm:justify-center","min-w-0"],[1,"w-full","sm:w-auto","py-8","px-4","sm:p-12","sm:rounded-2xl","sm:shadow","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12","mx-auto"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight","text-center"],[1,"flex","justify-center","mt-0.5","font-medium"],[4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary","text-center"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"]],template:function(i,c){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5),t._uU(6),t.ALo(7,"capitalize"),t.ALo(8,"transloco"),t.qZA(),t.TgZ(9,"div",6),t.YNc(10,C,5,9,"ng-container",7),t.YNc(11,Z,4,5,"ng-container",7),t.qZA(),t.TgZ(12,"div",8)(13,"span"),t._uU(14),t.ALo(15,"capitalize"),t.ALo(16,"transloco"),t.qZA(),t.TgZ(17,"a",9),t._uU(18),t.ALo(19,"capitalize"),t.ALo(20,"transloco"),t.qZA()()()()()),2&i&&(t.xp6(6),t.Oqu(t.lcZ(7,6,t.lcZ(8,8,"you have signed out"))),t.xp6(4),t.Q6J("ngIf",c.countdown>0),t.xp6(1),t.Q6J("ngIf",0===c.countdown),t.xp6(3),t.Oqu(t.lcZ(15,10,t.lcZ(16,12,"go to"))),t.xp6(3),t.Q6J("routerLink",t.DdM(18,O)),t.xp6(1),t.hij("",t.lcZ(19,14,t.lcZ(20,16,"home"))," "))},dependencies:[d.rH,e.O5,e.Gx,r.e,A.Ot],encapsulation:2});const T=[{path:"",component:f}];class u{}u.\u0275fac=function(i){return new(i||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[d.Bz.forChild(T),x.ot,n.J,g.m]})}}]);
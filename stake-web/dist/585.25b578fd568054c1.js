"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[585],{4585:(he,z,a)=>{a.r(z),a.d(z,{SettingsModule:()=>p});var g=a(9299),f=a(4859),s=a(9549),v=a(7392),A=a(4144),e=a(4650),m=a(3238),c=(a(2687),a(1281),a(5017),a(4006)),k=a(6895);let K=(()=>{class r{}return r.\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[m.BQ,k.ez,m.si,m.BQ]}),r})();var W=a(4385),$=a(455),x=a(3267),X=a(7775),ee=a(4466),L=a(7579),G=a(2722),ie=a(4880),Z=a(3317),C=a(5707);const te=["drawer"],oe=function(r,t){return{"hover:bg-gray-100 dark:hover:bg-hover":r,"bg-primary-50 dark:bg-hover":t}},re=function(r,t){return{"text-hint":r,"text-primary dark:text-primary-500":t}},ae=function(r){return{"text-primary dark:text-primary-500":r}};function de(r,t){if(1&r&&(e.ynx(0),e.TgZ(1,"div",16),e._UZ(2,"mat-icon",17),e.TgZ(3,"div",18)(4,"div",19),e._uU(5),e.ALo(6,"capitalize"),e.ALo(7,"transloco"),e.qZA(),e.TgZ(8,"div",20),e._uU(9),e.ALo(10,"capitalize"),e.ALo(11,"transloco"),e.qZA()()(),e.BQk()),2&r){const i=t.$implicit,o=e.oxw();e.xp6(1),e.Q6J("ngClass",e.WLB(15,oe,!o.selectedPanel||o.selectedPanel!==i.id,o.selectedPanel&&o.selectedPanel===i.id))("routerLink",i.link),e.xp6(1),e.Q6J("ngClass",e.WLB(18,re,!o.selectedPanel||o.selectedPanel!==i.id,o.selectedPanel&&o.selectedPanel===i.id))("svgIcon",i.icon),e.xp6(2),e.Q6J("ngClass",e.VKq(21,ae,o.selectedPanel&&o.selectedPanel===i.id)),e.xp6(1),e.hij(" ",e.lcZ(6,7,e.lcZ(7,9,i.title))," "),e.xp6(4),e.hij(" ",e.lcZ(10,11,e.lcZ(11,13,i.description))," ")}}class h{constructor(t,i){this._changeDetectorRef=t,this._fuseMediaWatcherService=i,this.drawerMode="side",this.drawerOpened=!0,this.panels=[],this._unsubscribeAll=new L.x}ngOnInit(){this.panels=[{id:"account",icon:"heroicons_outline:user-circle",title:"account",description:"manage your public profile and private information",link:"./account"},{id:"security",icon:"heroicons_outline:lock-closed",title:"security",description:"manage your password",link:"./security"}],this._fuseMediaWatcherService.onMediaChange$.pipe((0,G.R)(this._unsubscribeAll)).subscribe(({matchingAliases:t})=>{t.includes("lg")?(this.drawerMode="side",this.drawerOpened=!0):(this.drawerMode="over",this.drawerOpened=!1),this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}getPanelInfo(t){return this.panels.find(i=>i.id===t)}trackByFn(t,i){return i.id||t}}h.\u0275fac=function(t){return new(t||h)(e.Y36(e.sBO),e.Y36(ie.T))},h.\u0275cmp=e.Xpm({type:h,selectors:[["settings"]],viewQuery:function(t,i){if(1&t&&e.Gf(te,5),2&t){let o;e.iGM(o=e.CRH())&&(i.drawer=o.first)}},decls:21,vars:12,consts:[[1,"flex","flex-col","w-full","min-w-0","sm:absolute","sm:inset-0","sm:overflow-hidden"],[1,"flex-auto","sm:h-full"],[1,"sm:w-96","dark:bg-gray-900",3,"autoFocus","mode","opened"],["drawer",""],[1,"flex","items-center","justify-between","m-8","mr-6","sm:my-10"],[1,"text-4xl","font-extrabold","tracking-tight","leading-none"],[1,"lg:hidden"],["mat-icon-button","",3,"click"],[3,"svgIcon"],[1,"flex","flex-col","divide-y","border-t","border-b"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"flex","flex-col"],[1,"flex-auto","px-6","pt-9","pb-12","md:p-8","md:pb-12","lg:p-12"],[1,"flex","items-center"],["mat-icon-button","",1,"lg:hidden","-ml-2",3,"click"],[1,"mt-2"],["routerLinkActive","",1,"flex","px-8","py-5","cursor-pointer",3,"ngClass","routerLink"],[3,"ngClass","svgIcon"],[1,"ml-3"],[1,"font-medium","leading-6",3,"ngClass"],[1,"mt-0.5","text-secondary"]],template:function(t,i){if(1&t){const o=e.EpF();e.TgZ(0,"div",0)(1,"mat-drawer-container",1)(2,"mat-drawer",2,3)(4,"div",4)(5,"div",5),e._uU(6),e.ALo(7,"capitalize"),e.ALo(8,"transloco"),e.qZA(),e.TgZ(9,"div",6)(10,"button",7),e.NdJ("click",function(){e.CHM(o);const n=e.MAs(3);return e.KtG(n.close())}),e._UZ(11,"mat-icon",8),e.qZA()()(),e.TgZ(12,"div",9),e.YNc(13,de,12,23,"ng-container",10),e.qZA()(),e.TgZ(14,"mat-drawer-content",11)(15,"div",12)(16,"div",13)(17,"button",14),e.NdJ("click",function(){e.CHM(o);const n=e.MAs(3);return e.KtG(n.toggle())}),e._UZ(18,"mat-icon",8),e.qZA()(),e.TgZ(19,"div",15),e._UZ(20,"router-outlet"),e.qZA()()()()()}2&t&&(e.xp6(2),e.Q6J("autoFocus",!1)("mode",i.drawerMode)("opened",i.drawerOpened),e.xp6(4),e.hij("",e.lcZ(7,8,e.lcZ(8,10,"settings"))," "),e.xp6(5),e.Q6J("svgIcon","heroicons_outline:x"),e.xp6(2),e.Q6J("ngForOf",i.panels)("ngForTrackBy",i.trackByFn),e.xp6(5),e.Q6J("svgIcon","heroicons_outline:menu"))},dependencies:[g.lC,g.rH,g.Od,f.RK,v.Hw,x.jA,x.kh,x.LW,k.mk,k.sg,Z.e,C.Ot],encapsulation:2,changeDetection:0});var w=a(7495),O=a(8505),ce=a(529),ne=a(5240);class l{constructor(t,i,o){this._httpClient=t,this._apiService=i,this._userService=o}updateUser(t){return this._httpClient.post(this._apiService.users_user(),t)}changePassword(t){return this._httpClient.post(this._apiService.users_user_change_password(),t)}addWalletAddress(t){return this._httpClient.post(this._apiService.users_wallets(),{address:t}).pipe((0,O.b)(i=>{this._userService.user=i}))}removeWalletAddress(t){return this._httpClient.delete(this._apiService.users_wallets_wallet(t)).pipe((0,O.b)(i=>{this._userService.user=i}))}}function se(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"capitalize"),e.ALo(3,"transloco"),e.qZA()),2&r&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,e.lcZ(3,3,"username is required"))," "))}function le(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"capitalize"),e.ALo(3,"transloco"),e.qZA()),2&r&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,e.lcZ(3,3,"please enter a valid email address"))," "))}function me(r,t){1&r&&(e.TgZ(0,"span"),e._uU(1),e.ALo(2,"capitalize"),e.ALo(3,"transloco"),e.qZA()),2&r&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,e.lcZ(3,3,"save"))," "))}function ue(r,t){1&r&&e._UZ(0,"mat-progress-spinner",18),2&r&&e.Q6J("diameter",24)("mode","indeterminate")}l.\u0275fac=function(t){return new(t||l)(e.LFG(ce.eN),e.LFG(ne.s),e.LFG(w.K))},l.\u0275prov=e.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"});class _{constructor(t,i,o){this._formBuilder=t,this._userService=i,this._settingsService=o,this._unsubscribeAll=new L.x}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}ngOnInit(){this._userService.user$.pipe((0,G.R)(this._unsubscribeAll)).subscribe(t=>{this.user=t,this.accountForm=this._formBuilder.group({name:[t.name],username:[t.username,c.kI.required],email:[t.email,c.kI.email],phone:[t.phone],country:[t.country],language:[t.language]})})}updateUser(){this.accountForm.invalid||(this.accountForm.disable(),this._settingsService.updateUser(this.accountForm.getRawValue()).subscribe(t=>{this._userService.user=t}),this.accountForm.enable())}}_.\u0275fac=function(t){return new(t||_)(e.Y36(c.QS),e.Y36(w.K),e.Y36(l))},_.\u0275cmp=e.Xpm({type:_,selectors:[["settings-account"]],decls:61,vars:58,consts:[[1,"w-full","max-w-3xl"],[3,"formGroup"],[1,"w-full"],[1,"text-xl"],[1,"text-secondary"],[1,"grid","sm:grid-cols-4","gap-6","w-full","mt-8"],[1,"sm:col-span-4"],[1,"w-full",3,"subscriptSizing"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["matInput","",3,"formControlName"],[1,"fuse-mat-emphasized-affix","w-full",3,"subscriptSizing"],[4,"ngIf"],[1,"my-10","border-t"],[1,"sm:col-span-2"],[1,"mt-11","mb-10","border-t"],[1,"flex","items-center","justify-end"],["mat-flat-button","","type","button",1,"ml-4","w-18",3,"disabled","color","click"],[3,"diameter","mode",4,"ngIf"],[3,"diameter","mode"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"form",1)(2,"div",2)(3,"div",3),e._uU(4),e.ALo(5,"capitalize"),e.ALo(6,"transloco"),e.qZA(),e.TgZ(7,"div",4),e._uU(8),e.ALo(9,"capitalize"),e.ALo(10,"transloco"),e.qZA()(),e.TgZ(11,"div",5)(12,"div",6)(13,"mat-form-field",7)(14,"mat-label"),e._uU(15),e.ALo(16,"capitalize"),e.ALo(17,"transloco"),e.qZA(),e._UZ(18,"mat-icon",8)(19,"input",9),e.qZA()(),e.TgZ(20,"div",6)(21,"mat-form-field",10)(22,"mat-label"),e._uU(23),e.ALo(24,"capitalize"),e.ALo(25,"transloco"),e.qZA(),e._UZ(26,"input",9),e.YNc(27,se,4,5,"mat-error",11),e.qZA()()(),e._UZ(28,"div",12),e.TgZ(29,"div",2)(30,"div",3),e._uU(31),e.ALo(32,"capitalize"),e.ALo(33,"transloco"),e.qZA(),e.TgZ(34,"div",4),e._uU(35),e.ALo(36,"capitalize"),e.ALo(37,"transloco"),e.qZA()(),e.TgZ(38,"div",5)(39,"div",13)(40,"mat-form-field",7)(41,"mat-label"),e._uU(42),e.ALo(43,"capitalize"),e.ALo(44,"transloco"),e.qZA(),e._UZ(45,"mat-icon",8)(46,"input",9),e.YNc(47,le,4,5,"mat-error",11),e.qZA()(),e.TgZ(48,"div",13)(49,"mat-form-field",7)(50,"mat-label"),e._uU(51),e.ALo(52,"capitalize"),e.ALo(53,"transloco"),e.qZA(),e._UZ(54,"mat-icon",8)(55,"input",9),e.qZA()()(),e._UZ(56,"div",14),e.TgZ(57,"div",15)(58,"button",16),e.NdJ("click",function(){return i.updateUser()}),e.YNc(59,me,4,5,"span",11),e.YNc(60,ue,1,2,"mat-progress-spinner",17),e.qZA()()()()),2&t&&(e.xp6(1),e.Q6J("formGroup",i.accountForm),e.xp6(3),e.Oqu(e.lcZ(5,26,e.lcZ(6,28,"profile"))),e.xp6(4),e.Oqu(e.lcZ(9,30,e.lcZ(10,32,"manage your public profile and private information"))),e.xp6(5),e.Q6J("subscriptSizing","dynamic"),e.xp6(2),e.Oqu(e.lcZ(16,34,e.lcZ(17,36,"name"))),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:user"),e.xp6(1),e.Q6J("formControlName","name"),e.xp6(2),e.Q6J("subscriptSizing","dynamic"),e.xp6(2),e.Oqu(e.lcZ(24,38,e.lcZ(25,40,"username"))),e.xp6(3),e.Q6J("formControlName","username"),e.xp6(1),e.Q6J("ngIf",i.accountForm.get("username").hasError("required")),e.xp6(4),e.Oqu(e.lcZ(32,42,e.lcZ(33,44,"personal information"))),e.xp6(4),e.hij(" ",e.lcZ(36,46,e.lcZ(37,48,"communication details in case we want to connect with you these will be kept private"))," "),e.xp6(5),e.Q6J("subscriptSizing","dynamic"),e.xp6(2),e.Oqu(e.lcZ(43,50,e.lcZ(44,52,"email"))),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:mail"),e.xp6(1),e.Q6J("formControlName","email"),e.xp6(1),e.Q6J("ngIf",i.accountForm.get("email").hasError("email")),e.xp6(2),e.Q6J("subscriptSizing","dynamic"),e.xp6(2),e.Oqu(e.lcZ(52,54,e.lcZ(53,56,"phone"))),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:phone"),e.xp6(1),e.Q6J("formControlName","phone"),e.xp6(3),e.Q6J("disabled",i.accountForm.disabled)("color","primary"),e.xp6(1),e.Q6J("ngIf",!i.accountForm.disabled),e.xp6(1),e.Q6J("ngIf",i.accountForm.disabled))},dependencies:[f.lW,s.KE,s.hX,s.TO,s.qo,v.Hw,A.Nt,k.O5,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u,Z.e,C.Ot],encapsulation:2,changeDetection:0});class b{constructor(t,i,o){this._formBuilder=t,this._settingsService=i,this._userService=o}ngOnInit(){this.securityForm=this._formBuilder.group({currentPassword:[""],newPassword:[""]})}changePassword(){this.securityForm.disable(),this._settingsService.changePassword(this.securityForm.getRawValue()).subscribe(t=>{this._userService.user=t}),this.securityForm.enable()}}b.\u0275fac=function(t){return new(t||b)(e.Y36(c.QS),e.Y36(l),e.Y36(w.K))},b.\u0275cmp=e.Xpm({type:b,selectors:[["settings-security"]],decls:35,vars:33,consts:[[1,"w-full","max-w-3xl"],[3,"formGroup"],[1,"w-full"],[1,"text-xl"],[1,"text-secondary"],[1,"grid","sm:grid-cols-4","gap-6","w-full","mt-8"],[1,"sm:col-span-4"],[1,"w-full",3,"subscriptSizing"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["type","password","matInput","",3,"formControlName"],[1,"mt-1","text-md","text-hint"],[1,"my-10","border-t"],[1,"flex","items-center","justify-end"],["mat-flat-button","","type","button",1,"ml-4",3,"color","click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"form",1)(2,"div",2)(3,"div",3),e._uU(4),e.ALo(5,"capitalize"),e.ALo(6,"transloco"),e.qZA(),e._UZ(7,"div",4),e.qZA(),e.TgZ(8,"div",5)(9,"div",6)(10,"mat-form-field",7)(11,"mat-label"),e._uU(12),e.ALo(13,"capitalize"),e.ALo(14,"transloco"),e.qZA(),e._UZ(15,"mat-icon",8)(16,"input",9),e.qZA()(),e.TgZ(17,"div",6)(18,"mat-form-field",7)(19,"mat-label"),e._uU(20),e.ALo(21,"capitalize"),e.ALo(22,"transloco"),e.qZA(),e._UZ(23,"mat-icon",8)(24,"input",9),e.qZA(),e.TgZ(25,"div",10),e._uU(26),e.ALo(27,"capitalize"),e.ALo(28,"transloco"),e.qZA()()(),e._UZ(29,"div",11),e.TgZ(30,"div",12)(31,"button",13),e.NdJ("click",function(){return i.changePassword()}),e._uU(32),e.ALo(33,"capitalize"),e.ALo(34,"transloco"),e.qZA()()()()),2&t&&(e.xp6(1),e.Q6J("formGroup",i.securityForm),e.xp6(3),e.Oqu(e.lcZ(5,13,e.lcZ(6,15,"change your password"))),e.xp6(6),e.Q6J("subscriptSizing","dynamic"),e.xp6(2),e.Oqu(e.lcZ(13,17,e.lcZ(14,19,"current password"))),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:key"),e.xp6(1),e.Q6J("formControlName","currentPassword"),e.xp6(2),e.Q6J("subscriptSizing","dynamic"),e.xp6(2),e.Oqu(e.lcZ(21,21,e.lcZ(22,23,"new password"))),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:key"),e.xp6(1),e.Q6J("formControlName","newPassword"),e.xp6(2),e.Oqu(e.lcZ(27,25,e.lcZ(28,27,"minimum 8 characters must include numbers letters and special characters"))),e.xp6(5),e.Q6J("color","primary"),e.xp6(1),e.hij(" ",e.lcZ(33,29,e.lcZ(34,31,"save"))," "))},dependencies:[f.lW,s.KE,s.hX,s.qo,v.Hw,A.Nt,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u,Z.e,C.Ot],encapsulation:2,changeDetection:0});const pe=[{path:"",component:h,canActivateChild:[],children:[{path:"account",component:_},{path:"security",component:b}]},{path:"**",redirectTo:"account"}];class p{}p.\u0275fac=function(t){return new(t||p)},p.\u0275mod=e.oAB({type:p}),p.\u0275inj=e.cJS({imports:[g.Bz.forChild(pe),f.ot,s.lN,v.Ps,A.c,K,W.LD,x.SJ,$.rP,X.fC,ee.m]})}}]);
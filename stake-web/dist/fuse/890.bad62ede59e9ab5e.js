"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[890],{8890:(O,f,o)=>{o.r(f),o.d(f,{AuthSignUpModule:()=>s});var p=o(9299),u=o(4859),d=o(6709),m=o(9549),h=o(7392),A=o(4144),U=o(1572),v=o(6236),x=o(7775),y=o(4466),i=o(4006),T=o(8288),t=o(4650),C=o(8951),I=o(8214),J=o(6895),S=o(3317),N=o(5707);const Q=["signUpNgForm"];function F(e,n){if(1&e&&(t.TgZ(0,"fuse-alert",25),t._uU(1),t.ALo(2,"capitalize"),t.ALo(3,"transloco"),t.qZA()),2&e){const r=t.oxw();t.Q6J("appearance","outline")("showIcon",!1)("type",r.alert.type)("@shake","error"===r.alert.type),t.xp6(1),t.hij(" ",t.lcZ(2,5,t.lcZ(3,7,r.alert.message))," ")}}function L(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"capitalize"),t.ALo(3,"transloco"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,t.lcZ(3,3,"username is required"))," "))}function w(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"capitalize"),t.ALo(3,"transloco"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,t.lcZ(3,3,"wrong username format"))," "))}function q(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"capitalize"),t.ALo(3,"transloco"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,t.lcZ(3,3,"full name is required"))," "))}function z(e,n){1&e&&t._UZ(0,"mat-icon",26),2&e&&t.Q6J("svgIcon","heroicons_solid:eye")}function Y(e,n){1&e&&t._UZ(0,"mat-icon",26),2&e&&t.Q6J("svgIcon","heroicons_solid:eye-off")}function M(e,n){1&e&&(t.TgZ(0,"span"),t._uU(1," Create your free account "),t.qZA())}function b(e,n){1&e&&t._UZ(0,"mat-progress-spinner",27),2&e&&t.Q6J("diameter",24)("mode","indeterminate")}const Z=function(){return["./"]};class l{constructor(n,r,a,c){this._authService=n,this._formBuilder=r,this._router=a,this._activeRoute=c,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.signUpForm=this._formBuilder.group({username:["",[i.kI.required,i.kI.pattern("[a-zA-Z]+[a-zA-Z0-9]*")]],name:["",i.kI.required],password:["",i.kI.required],agreements:["",i.kI.requiredTrue]}),this.redirectUrl=this._activeRoute.snapshot.queryParamMap.get("redirectUrl")||"/signed-in-redirect"}signUp(){this.signUpForm.invalid||(this.signUpForm.disable(),this.showAlert=!1,this._authService.signUp(this.signUpForm.value).subscribe(n=>{this._router.navigate(["/sign-in"],{queryParams:{redirectUrl:this.redirectUrl}})},n=>{this.signUpForm.enable(),this.alert={type:"error",message:n.error.code||"00x0000"},this.showAlert=!0}))}signIn(){this._router.navigate(["/sign-in"],{queryParams:{redirectUrl:this.redirectUrl}})}}l.\u0275fac=function(n){return new(n||l)(t.Y36(C.e),t.Y36(i.QS),t.Y36(p.F0),t.Y36(p.gz))},l.\u0275cmp=t.Xpm({type:l,selectors:[["auth-sign-up"]],viewQuery:function(n,r){if(1&n&&t.Gf(Q,5),2&n){let a;t.iGM(a=t.CRH())&&(r.signUpNgForm=a.first)}},decls:58,vars:40,consts:[[1,"flex","flex-col","flex-auto","items-center","sm:justify-center","min-w-0","md:p-8"],[1,"flex","sm:rounded-2xl","sm:shadow","overflow-hidden","sm:bg-card","md:justify-center"],[1,"w-full","sm:w-auto","py-8","px-4","sm:p-12","md:p-16"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],[1,"flex","items-baseline","mt-0.5","font-medium"],[1,"ml-1","text-primary-500","hover:underline",3,"click"],["class","mt-8",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["signUpNgForm","ngForm"],[1,"w-full"],["id","username","matInput","",3,"formControlName"],[4,"ngIf"],["id","name","matInput","",3,"formControlName"],["id","password","matInput","","type","password",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[1,"inline-flex","items-end","w-full","mt-1.5"],[1,"-ml-2",3,"color","formControlName"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(n,r){if(1&n){const a=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._UZ(5,"img",5),t.qZA(),t.TgZ(6,"div",6),t._uU(7,"Sign up"),t.qZA(),t.TgZ(8,"div",7)(9,"div"),t._uU(10,"Already have an account?"),t.qZA(),t.TgZ(11,"a",8),t.NdJ("click",function(){return r.signIn()}),t._uU(12,"Sign in "),t.qZA()(),t.YNc(13,F,4,9,"fuse-alert",9),t.TgZ(14,"form",10,11)(16,"mat-form-field",12)(17,"mat-label"),t._uU(18),t.ALo(19,"capitalize"),t.ALo(20,"transloco"),t.qZA(),t._UZ(21,"input",13),t.YNc(22,L,4,5,"mat-error",14),t.YNc(23,w,4,5,"mat-error",14),t.qZA(),t.TgZ(24,"mat-form-field",12)(25,"mat-label"),t._uU(26),t.ALo(27,"capitalize"),t.ALo(28,"transloco"),t.qZA(),t._UZ(29,"input",15),t.YNc(30,q,4,5,"mat-error",14),t.qZA(),t.TgZ(31,"mat-form-field",12)(32,"mat-label"),t._uU(33),t.ALo(34,"capitalize"),t.ALo(35,"transloco"),t.qZA(),t._UZ(36,"input",16,17),t.TgZ(38,"button",18),t.NdJ("click",function(){t.CHM(a);const g=t.MAs(37);return t.KtG(g.type="password"===g.type?"text":"password")}),t.YNc(39,z,1,1,"mat-icon",19),t.YNc(40,Y,1,1,"mat-icon",19),t.qZA(),t.TgZ(41,"mat-error"),t._uU(42),t.ALo(43,"capitalize"),t.ALo(44,"transloco"),t.qZA()(),t.TgZ(45,"div",20)(46,"mat-checkbox",21)(47,"span"),t._uU(48,"I agree with"),t.qZA(),t.TgZ(49,"a",22),t._uU(50,"Terms "),t.qZA(),t.TgZ(51,"span"),t._uU(52,"and"),t.qZA(),t.TgZ(53,"a",22),t._uU(54,"Privacy Policy "),t.qZA()()(),t.TgZ(55,"button",23),t.NdJ("click",function(){return r.signUp()}),t.YNc(56,M,2,0,"span",14),t.YNc(57,b,1,2,"mat-progress-spinner",24),t.qZA()()()()()()}if(2&n){const a=t.MAs(37);t.xp6(13),t.Q6J("ngIf",r.showAlert),t.xp6(1),t.Q6J("formGroup",r.signUpForm),t.xp6(4),t.Oqu(t.lcZ(19,22,t.lcZ(20,24,"username"))),t.xp6(3),t.Q6J("formControlName","username"),t.xp6(1),t.Q6J("ngIf",r.signUpForm.get("username").hasError("required")),t.xp6(1),t.Q6J("ngIf",r.signUpForm.get("username").hasError("pattern")),t.xp6(3),t.Oqu(t.lcZ(27,26,t.lcZ(28,28,"full name"))),t.xp6(3),t.Q6J("formControlName","name"),t.xp6(1),t.Q6J("ngIf",r.signUpForm.get("name").hasError("required")),t.xp6(3),t.Oqu(t.lcZ(34,30,t.lcZ(35,32,"password"))),t.xp6(3),t.Q6J("formControlName","password"),t.xp6(3),t.Q6J("ngIf","password"===a.type),t.xp6(1),t.Q6J("ngIf","text"===a.type),t.xp6(2),t.hij(" ",t.lcZ(43,34,t.lcZ(44,36,"password is required"))," "),t.xp6(4),t.Q6J("color","primary")("formControlName","agreements"),t.xp6(3),t.Q6J("routerLink",t.DdM(38,Z)),t.xp6(4),t.Q6J("routerLink",t.DdM(39,Z)),t.xp6(2),t.Q6J("color","primary")("disabled",r.signUpForm.disabled),t.xp6(1),t.Q6J("ngIf",!r.signUpForm.disabled),t.xp6(1),t.Q6J("ngIf",r.signUpForm.disabled)}},dependencies:[p.rH,u.lW,u.RK,d.oG,m.KE,m.hX,m.TO,m.R9,h.Hw,A.Nt,U.Ou,I.W,J.O5,i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,S.e,N.Ot],encapsulation:2,data:{animation:T.L}});const j=[{path:"",component:l}];class s{}s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[p.Bz.forChild(j),u.ot,d.p9,m.lN,h.Ps,A.c,U.Cq,v.J,x.fC,y.m]})}}]);
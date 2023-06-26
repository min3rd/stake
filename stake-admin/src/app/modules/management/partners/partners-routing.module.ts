import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerRegistrationResolver, PartnerRegistrationsResolver } from './partners.resolver';
import { PartnersDetailComponent } from './partners-detail/partners-detail.component';
import { PartnersGuard } from './partners.guard';

const routes: Routes = [
    {
        path: "",
        component: PartnerListComponent,
        resolve: {
            PartnerRegistrationsResolver: PartnerRegistrationsResolver,
        },
        children: [
            {
                path: ":id",
                component: PartnersDetailComponent,
                resolve: {
                    PartnerRegistrationResolver: PartnerRegistrationResolver,
                },
                canDeactivate: [PartnersGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule { }

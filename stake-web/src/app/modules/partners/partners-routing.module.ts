import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnersComponent } from './partners/partners.component';
import { PartnersResolver } from './partners.resolver';

const routes: Routes = [
    {
        path: '',
        component: PartnersComponent,
        resolve: {
            PartnersResolver: PartnersResolver,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule { }

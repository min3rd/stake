import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BestTradersResolver } from './landing.resolver';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        resolve: {
            BestTradersResolver: BestTradersResolver,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule { }

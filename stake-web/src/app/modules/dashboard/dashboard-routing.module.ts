import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHistoryResolver, DashboardResolver } from './dashboard.resolver';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        resolve: {
            DashboardResolver: DashboardResolver,
            DashboardHistoryResolver: DashboardHistoryResolver,
        }
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

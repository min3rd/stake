import { MonthlyProfitResolver, MonthlyProfitsResolver } from './monthly-profits.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyProfitsListComponent } from './monthly-profits-list/monthly-profits-list.component';
import { MonthlyProfitsDetailComponent } from './monthly-profits-detail/monthly-profits-detail.component';
import { MonthlyProfitsGuard } from './monthly-profits.guard';

const routes: Routes = [
    {
        path: '',
        component: MonthlyProfitsListComponent,
        resolve: {
            MonthlyProfitsResolver: MonthlyProfitsResolver
        },
        children: [
            {
                path: ':id',
                component: MonthlyProfitsDetailComponent,
                resolve: {
                    MonthlyProfitResolver: MonthlyProfitResolver,
                },
                canDeactivate: [MonthlyProfitsGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonthlyProfitsRoutingModule { }

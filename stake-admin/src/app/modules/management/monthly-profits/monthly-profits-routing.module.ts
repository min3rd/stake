import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyProfitsListComponent } from './monthly-profits-list/monthly-profits-list.component';

const routes: Routes = [
    {
        path: '',
        component: MonthlyProfitsListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonthlyProfitsRoutingModule { }

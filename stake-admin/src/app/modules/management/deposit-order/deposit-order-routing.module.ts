import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositOrderListComponent } from './deposit-order-list/deposit-order-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepositOrderListComponent,
    resolve: {},
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositOrderRoutingModule { }

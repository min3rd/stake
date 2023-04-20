import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { DepositOrderComponent } from './deposit/deposit-order/deposit-order.component';
import { DepositOrderResolver, DepositOrdersResolver } from './deposit/deposit.resolver';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
  },
  {
    path: 'deposit',
    component: DepositComponent,
    resolve: {
      DepositOrdersResolver: DepositOrdersResolver,
    },
    children: [
      {
        path: '',
        component: DepositOrderComponent,
      },
      {
        path: ':depositOrderId',
        component: DepositOrderComponent,
        resolve: {
          DepositOrderResolver: DepositOrderResolver,
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }

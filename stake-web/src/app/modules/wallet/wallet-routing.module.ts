import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { DepositOrderComponent } from './deposit/deposit-order/deposit-order.component';
import { WalletComponent } from './wallet/wallet.component';
import { DepositGuard } from './deposit.guard';
import { DepositOrdersResolver } from './wallet.resolver';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    resolve: {
      DepositOrdersResolver: DepositOrdersResolver,
    },
    children: [
      {
        path: 'deposit',
        component: DepositComponent,
        canDeactivate: [DepositGuard],
        resolve: {
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
            }
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '/wallet' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }

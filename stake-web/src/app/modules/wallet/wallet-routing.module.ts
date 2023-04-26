import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { WalletComponent } from './wallet/wallet.component';
import { DepositGuard } from './deposit.guard';
import { DepositOrderResolver, DepositOrdersResolver } from './wallet.resolver';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { WithdrawGuard } from './withdraw.guard';

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
        canActivate: [DepositGuard],
        resolve: {
          DepositOrdersResolver: DepositOrdersResolver,
        },
        children: [
          {
            path: ':depositOrderId',
            component: DepositComponent,
            resolve: {
              DepositOrderResolver: DepositOrderResolver,
            },
          }
        ]
      },
      {
        path: 'withdraw',
        component: WithdrawComponent,
        canDeactivate: [WithdrawGuard],
        children: [],
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

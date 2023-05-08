import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { WalletComponent } from './wallet/wallet.component';
import { DepositGuard } from './deposit.guard';
import { DepositOrderResolver, DepositOrdersResolver, WithdrawOrderResolver, WithdrawOrdersResolver, CashTransfersResolver, CashTransferResolver } from './wallet.resolver';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { WithdrawGuard } from './withdraw.guard';
import { TransferComponent } from './transfer/transfer.component';
import { TransferGuard } from './transfer.guard';

const routes: Routes = [
    {
        path: '',
        component: WalletComponent,
        resolve: {
            DepositOrdersResolver: DepositOrdersResolver,
            WithdrawOrdersResolver: WithdrawOrdersResolver,
            CashTransfersResolver: CashTransfersResolver,
        },
        children: [
            {
                path: 'deposit',
                component: DepositComponent,
                canDeactivate: [DepositGuard],
                resolve: {
                    DepositOrdersResolver: DepositOrdersResolver,
                    WithdrawOrdersResolver: WithdrawOrdersResolver,
                    CashTransfersResolver: CashTransfersResolver,
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
                resolve: {
                    DepositOrdersResolver: DepositOrdersResolver,
                    WithdrawOrdersResolver: WithdrawOrdersResolver,
                    CashTransfersResolver: CashTransfersResolver,
                },
                canDeactivate: [WithdrawGuard],
                canActivate: [WithdrawGuard],
                children: [
                    {
                        path: ':withdrawOrderId',
                        component: WithdrawComponent,
                        resolve: {
                            WithdrawOrderResolver: WithdrawOrderResolver,
                        }
                    }
                ],
            },
            {
                path: 'transfer',
                component: TransferComponent,
                resolve: {
                    DepositOrdersResolver: DepositOrdersResolver,
                    WithdrawOrdersResolver: WithdrawOrdersResolver,
                    CashTransfersResolver: CashTransfersResolver,
                },
                canDeactivate: [TransferGuard],
                canActivate: [TransferGuard],
                children: [
                    {
                        path: ':cashTransferId',
                        component: TransferComponent,
                        resolve: {
                            CashTransferResolver: CashTransferResolver,
                        }
                    }
                ],
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

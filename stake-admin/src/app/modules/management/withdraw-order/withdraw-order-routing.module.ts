import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawOrderListComponent } from './withdraw-order-list/withdraw-order-list.component';
import { WithdrawOrderResolver, WithdrawOrdersResolver } from './withdraw-order.resolver';
import { WithdrawOrderDetailComponent } from './withdraw-order-detail/withdraw-order-detail.component';

const routes: Routes = [
    {
        path: '',
        component: WithdrawOrderListComponent,
        resolve: {
            WithdrawOrdersResolver: WithdrawOrdersResolver,
        },
        children: [
            {
                path: ':withdrawOrderId',
                component: WithdrawOrderDetailComponent,
                resolve: {
                    WithdrawOrderResolver: WithdrawOrderResolver,
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WithdrawOrderRoutingModule { }

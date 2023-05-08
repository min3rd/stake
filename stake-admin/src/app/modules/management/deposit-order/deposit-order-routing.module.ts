import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositOrderListComponent } from './deposit-order-list/deposit-order-list.component';
import { DepositOrderResolver, DepositOrdersResolver } from './deposit-order.resolver';
import { DepositOrderDetailComponent } from './deposit-order-detail/deposit-order-detail.component';
import { DepositOrderGuard } from './deposit-order.guard';

const routes: Routes = [
    {
        path: '',
        component: DepositOrderListComponent,
        resolve: {
            DepositOrdersResolver: DepositOrdersResolver,
        },
        children: [
            {
                path: ':depositOrderId',
                component: DepositOrderDetailComponent,
                canDeactivate: [DepositOrderGuard],
                resolve: {
                    DepositOrderResolver: DepositOrderResolver,
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/management/depositOrders',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepositOrderRoutingModule { }

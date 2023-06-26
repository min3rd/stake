import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    {
        path: 'depositOrders',
        loadChildren: () => import('./deposit-order/deposit-order.module').then(m => m.DepositOrderModule),
    },
    {
        path: 'withdrawOrders',
        loadChildren: () => import('./withdraw-order/withdraw-order.module').then(m => m.WithdrawOrderModule),
    },
    {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
    },
    {
        path: 'monthlyProfits',
        loadChildren: () => import('./monthly-profits/monthly-profits.module').then(m => m.MonthlyProfitsModule),
    },
    {
        path: 'partners',
        loadChildren: () => import('./partners/partners.module').then(m => m.PartnersModule),
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
export class ManagementRoutingModule { }

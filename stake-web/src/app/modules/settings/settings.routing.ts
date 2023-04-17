import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsSecurityComponent } from './security/security.component';
import { SettingsWalletComponent } from './settings-wallet/settings-wallet.component';

export const settingsRoutes: Route[] = [
    {
        path: '',
        component: SettingsComponent,
        canActivateChild: [],
        children: [
            {
                path: 'account',
                component: SettingsAccountComponent,
            },
            {
                path: 'security',
                component: SettingsSecurityComponent,
            },
            {
                path: 'wallet',
                component: SettingsWalletComponent,
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'account'
    }
];

import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsSecurityComponent } from './security/security.component';

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
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'account'
    }
];

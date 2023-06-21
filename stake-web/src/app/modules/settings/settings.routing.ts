import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsSecurityComponent } from './security/security.component';
import { PartnerRegistrationComponent } from './partner-registration/partner-registration.component';
import { PartnerRegistrationResolve } from './settings.resolver';

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
                path: 'partner-registration',
                component: PartnerRegistrationComponent,
                resolve: {
                    PartnerRegistrationResolve: PartnerRegistrationResolve,
                }
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'account'
    }
];

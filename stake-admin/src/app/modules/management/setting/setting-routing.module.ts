import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfigComponent } from './app-config/app-config.component';
import { AppConfigResolver } from './setting.resolver';

const routes: Routes = [
    {
        path: '',
        component: AppConfigComponent,
        resolve: {
            AppConfigResolver: AppConfigResolver,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }

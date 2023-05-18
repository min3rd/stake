import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { SettingService } from './setting.service';
import { AppConfig } from './setting.types';

@Injectable({
    providedIn: 'root'
})
export class AppConfigResolver implements Resolve<AppConfig> {
    constructor(
        private _settingService: SettingService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppConfig> {
        return this._settingService.getAppConfig();
    }
}

import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';
import { PartnerRegistration } from './settings.types';

@Injectable({
    providedIn: 'root'
})
export class PartnerRegistrationResolve implements Resolve<PartnerRegistration> {
    constructor(
        private _settingsService: SettingsService
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerRegistration> {
        return this._settingsService.getPartnerRegistration();
    }
}

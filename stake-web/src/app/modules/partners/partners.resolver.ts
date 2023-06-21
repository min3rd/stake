import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PartnersService } from './partners.service';
import { PartnerRegistration } from '../settings/settings.types';

@Injectable({
    providedIn: 'root'
})
export class PartnersResolver implements Resolve<PartnerRegistration[]> {
    constructor(
        private _partnersService: PartnersService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerRegistration[]> {
        return this._partnersService.getPartnerRegistrations();
    }
}

import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PartnerRegistration } from './partners.types';
import { PartnersService } from './partners.service';

@Injectable({
    providedIn: 'root'
})
export class PartnerRegistrationsResolver implements Resolve<PartnerRegistration[]> {
    constructor(private _partnersService: PartnersService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerRegistration[]> {
        return this._partnersService.getAll();
    }
}

@Injectable({
    providedIn: 'root'
})
export class PartnerRegistrationResolver implements Resolve<PartnerRegistration> {
    constructor(private _partnersService: PartnersService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerRegistration> {
        return this._partnersService.getById(route.paramMap.get('id'));
    }
}

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { PartnerRegistration } from '../settings/settings.types';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class PartnersService {
    private _partnerRegistrations: BehaviorSubject<PartnerRegistration[]> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }
    get partnerRegistrations$(): Observable<PartnerRegistration[]> {
        return this._partnerRegistrations.asObservable();
    }
    getPartnerRegistrations(): Observable<PartnerRegistration[]> {
        return this._httpClient.get<PartnerRegistration[]>(this._apiService.public_partner_registrations()).pipe(tap((partnerRegistrations: PartnerRegistration[]) => {
            this._partnerRegistrations.next(partnerRegistrations);
        }));
    }
}

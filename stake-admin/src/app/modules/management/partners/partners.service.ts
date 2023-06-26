import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap, take, of } from 'rxjs';
import { PartnerRegistration } from './partners.types';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class PartnersService {
    private _partnerRegistrations: BehaviorSubject<PartnerRegistration[]> = new BehaviorSubject(null);
    private _partnerRegistration: BehaviorSubject<PartnerRegistration> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }
    get partneRegistrations$(): Observable<PartnerRegistration[]> {
        return this._partnerRegistrations.asObservable();
    }
    get partneRegistration$(): Observable<PartnerRegistration> {
        return this._partnerRegistration.asObservable();
    }
    getAll(): Observable<PartnerRegistration[]> {
        return this._httpClient.get<PartnerRegistration[]>(this._apiService.admin_partner_registrations()).pipe(tap(partnerRegistrations => {
            this._partnerRegistrations.next(partnerRegistrations);
        }));
    }
    getById(id: string): Observable<PartnerRegistration> {
        return this._partnerRegistrations.pipe(
            take(1),
            switchMap(partnerRegistrations => {
                return this._httpClient.get<PartnerRegistration>(this._apiService.admin_partner_registrations_partner_registration(id)).pipe(
                    tap(partnerRegistration => {
                        let index = partnerRegistrations.findIndex(e => e._id == partnerRegistration._id);
                        partnerRegistrations[index] = partnerRegistration;
                        this._partnerRegistration.next(partnerRegistration);
                        this._partnerRegistrations.next(partnerRegistrations);
                        return of(partnerRegistration);
                    })
                );
            })
        );
    }
    save(partnerRegistration: Partial<PartnerRegistration>): Observable<PartnerRegistration> {
        return this._partnerRegistrations.pipe(
            take(1),
            switchMap(partnerRegistrations => {
                return this._httpClient.post<PartnerRegistration>(this._apiService.admin_partner_registrations_partner_registration(partnerRegistration._id), partnerRegistration).pipe(
                    tap(partnerRegistration => {
                        let index = partnerRegistrations.findIndex(e => e._id == partnerRegistration._id);
                        partnerRegistrations[index] = partnerRegistration;
                        this._partnerRegistration.next(partnerRegistration);
                        this._partnerRegistrations.next(partnerRegistrations);
                        return of(partnerRegistration);
                    })
                );
            })
        );
    }
}

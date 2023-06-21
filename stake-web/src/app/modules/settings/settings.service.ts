import { Observable, tap, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { PartnerRegistration } from './settings.types';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private _partnerRegistration: BehaviorSubject<PartnerRegistration> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
        private _userService: UserService,
    ) { }
    get partnerRegistration$(): Observable<PartnerRegistration> {
        return this._partnerRegistration.asObservable();
    }

    updateUser(user: User): Observable<User> {
        return this._httpClient.post<User>(this._apiService.users_user(), user);
    }
    changePassword(password: { currentPassword: string, newPassword: string }): Observable<any> {
        return this._httpClient.post<any>(this._apiService.users_user_change_password(), password);
    }
    addWalletAddress(address: string): Observable<User> {
        return this._httpClient.post<User>(this._apiService.users_wallets(), {
            address: address,
        }).pipe(tap((user: User) => {
            this._userService.user = user;
        }));
    }
    removeWalletAddress(address: string): Observable<User> {
        return this._httpClient.delete<User>(this._apiService.users_wallets_wallet(address)).pipe(tap((user: User) => {
            this._userService.user = user;
        }));
    }
    getPartnerRegistration(): Observable<PartnerRegistration> {
        return this._httpClient.get<PartnerRegistration>(this._apiService.users_partner_registration()).pipe(tap((partnerRegistration: PartnerRegistration) => {
            this._partnerRegistration.next(partnerRegistration);
        }));
    }
    updatePartnerRegistration(partnerRegistration: Partial<PartnerRegistration>): Observable<PartnerRegistration> {
        return this._httpClient.post<PartnerRegistration>(this._apiService.users_partner_registration(), partnerRegistration).pipe(tap((partnerRegistration: PartnerRegistration) => {
            this._partnerRegistration.next(partnerRegistration);
        }));
    }
}

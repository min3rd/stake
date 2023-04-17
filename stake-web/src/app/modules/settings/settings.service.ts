import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
    private _userService: UserService,
  ) { }

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
}

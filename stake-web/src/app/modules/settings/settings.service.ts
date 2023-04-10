import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { User } from 'app/core/user/user.types';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }

  updateUser(user: User): Observable<User> {
    return this._httpClient.post<User>(this._apiService.users_user(), user);
  }
  changePassword(password: { currentPassword: string, newPassword: string }): Observable<any> {
    return this._httpClient.post<any>(this._apiService.users_user_change_password(), password);
  }
}

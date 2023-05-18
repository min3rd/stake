import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { AppConfig } from './setting.types';

@Injectable({
    providedIn: 'root'
})
export class SettingService {
    private _appConfig: BehaviorSubject<AppConfig> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }

    get appConfig$(): Observable<AppConfig> {
        return this._appConfig.asObservable();
    }

    getAppConfig(): Observable<AppConfig> {
        return this._httpClient.get<AppConfig>(this._apiService.admin_appConfig()).pipe(
            tap(appConfig => {
                this._appConfig.next(appConfig);
                return of(appConfig);
            })
        );
    }

    updateAppConfig(appConfig: AppConfig): Observable<AppConfig> {
        return this._httpClient.post<AppConfig>(this._apiService.admin_appConfig(), appConfig).pipe(
            tap(appConfig => {
                this._appConfig.next(appConfig);
                return of(appConfig);
            })
        );
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './core/api/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppConfig } from './app.types';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _appConfig: BehaviorSubject<AppConfig | null> = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }
  get appConfig$(): Observable<AppConfig> {
    return this._appConfig.asObservable();
  }
  getAppConfig(): Observable<AppConfig> {
    return this._httpClient.get<AppConfig>(this._apiService.public_appConfig()).pipe(
      tap((appConfig: AppConfig) => {
        this._appConfig.next(appConfig);
      })
    );
  }
}

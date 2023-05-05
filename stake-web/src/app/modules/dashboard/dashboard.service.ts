import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DashboardTradeStats, DashboardTradingCall } from './dashboard.types';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private _dashboardTradeStats: BehaviorSubject<DashboardTradeStats> = new BehaviorSubject(null);
    private _dashboardTradingCalls: BehaviorSubject<DashboardTradingCall[]> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }

    get dashboardTradeStats$(): Observable<DashboardTradeStats> {
        return this._dashboardTradeStats.asObservable();
    }
    get dashboardTradingCalls$(): Observable<DashboardTradingCall[]> {
        return this._dashboardTradingCalls.asObservable();
    }

    getDashboardTradeStats(): Observable<DashboardTradeStats> {
        return this._httpClient.get<DashboardTradeStats>(this._apiService.users_dashboard_tradeStats()).pipe(
            tap(dashboardTradeStats => {
                this._dashboardTradeStats.next(dashboardTradeStats);
            })
        );
    }

    getDashboardTradingCall(startDate: Date, endDate: Date): Observable<DashboardTradingCall[]> {
        return this._httpClient.get<DashboardTradingCall[]>(this._apiService.users_trading_calls(startDate, endDate)).pipe(
            tap(dashboardTradingCalls => {
                this._dashboardTradingCalls.next(dashboardTradingCalls);
            })
        );
    }
}

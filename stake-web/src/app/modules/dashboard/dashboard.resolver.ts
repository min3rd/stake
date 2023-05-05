import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { DashboardTradeStats, DashboardTradingCall } from './dashboard.types';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DashboardResolver implements Resolve<DashboardTradeStats> {
    constructor(
        private _dashboardService: DashboardService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DashboardTradeStats> {
        return this._dashboardService.getDashboardTradeStats();
    }
}

@Injectable({
    providedIn: 'root'
})
export class DashboardHistoryResolver implements Resolve<DashboardTradingCall[]> {
    constructor(
        private _dashboardService: DashboardService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DashboardTradingCall[]> {
        let now = moment();
        let startDate = now.clone().weekday(1).toDate();
        let endDate = now.clone().weekday(7).toDate();
        return this._dashboardService.getDashboardTradingCall(startDate, endDate);
    }
}

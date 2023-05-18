import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MonthlyProfit, News } from './landing.types';
import { LandingService } from './landing.service';

@Injectable({
    providedIn: 'root'
})
export class BestTradersResolver implements Resolve<MonthlyProfit[]> {
    constructor(
        private _landingService: LandingService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MonthlyProfit[]> {
        return this._landingService.getBestTraders(new Date());
    }
}

@Injectable({
    providedIn: 'root'
})
export class NewsResolver implements Resolve<News[]> {
    constructor(
        private _landingService: LandingService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News[]> {
        return this._landingService.getLatestNews();
    }
}

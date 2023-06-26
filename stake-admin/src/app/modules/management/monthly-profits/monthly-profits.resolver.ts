import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MonthlyProfit } from './monthlyProfits.types';
import { MonthlyProfitsService } from './monthly-profits.service';

@Injectable({
    providedIn: 'root'
})
export class MonthlyProfitsResolver implements Resolve<MonthlyProfit[]> {
    constructor(
        private _monthlyProfitsService: MonthlyProfitsService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MonthlyProfit[]> {
        return this._monthlyProfitsService.getAll();;
    }
}

@Injectable({
    providedIn: 'root'
})
export class MonthlyProfitResolver implements Resolve<MonthlyProfit> {
    constructor(
        private _monthlyProfitsService: MonthlyProfitsService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MonthlyProfit> {
        return this._monthlyProfitsService.getById(route.paramMap.get('id'));;
    }
}

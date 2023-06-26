import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';
import { MonthlyProfit } from './monthlyProfits.types';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class MonthlyProfitsService {
    private _monthlyProfits: BehaviorSubject<MonthlyProfit[]> = new BehaviorSubject(null);
    private _monthlyProfit: BehaviorSubject<MonthlyProfit> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }
    get monthlyProfits$(): Observable<MonthlyProfit[]> {
        return this._monthlyProfits.asObservable();
    }
    get monthlyProfit$(): Observable<MonthlyProfit> {
        return this._monthlyProfit.asObservable();
    }
    getAll(): Observable<MonthlyProfit[]> {
        return this._httpClient.get<MonthlyProfit[]>(this._apiService.admin_monthly_profits()).pipe(tap(monthlyProfits => {
            this._monthlyProfits.next(monthlyProfits);
        }));
    }
    getById(id: string): Observable<MonthlyProfit> {
        return this._monthlyProfits.pipe(
            take(1),
            switchMap(monthlyProfits => {
                return this._httpClient.get<MonthlyProfit>(this._apiService.admin_monthly_profits_monthly_profit(id)).pipe(
                    tap(monthlyProfit => {
                        let index = monthlyProfits.findIndex(e => e._id == monthlyProfit._id);
                        monthlyProfits[index] = monthlyProfit;

                        this._monthlyProfit.next(monthlyProfit);
                        this._monthlyProfits.next(monthlyProfits);
                        return of(monthlyProfit);
                    })
                )
            })
        );
    }
    create(): Observable<MonthlyProfit> {
        return this._monthlyProfits.pipe(
            take(1),
            switchMap(monthlyProfits => {
                return this._httpClient.post<MonthlyProfit>(this._apiService.admin_monthly_profits(), {}).pipe(
                    tap(monthlyProfit => {
                        monthlyProfits.push(monthlyProfit);
                        this._monthlyProfit.next(monthlyProfit);
                        this._monthlyProfits.next(monthlyProfits);
                        return of(monthlyProfit);
                    })
                )
            })
        );
    }
    save(monthlyProfit: Partial<MonthlyProfit>): Observable<MonthlyProfit> {
        return this._monthlyProfits.pipe(
            take(1),
            switchMap(monthlyProfits => {
                return this._httpClient.post<MonthlyProfit>(this._apiService.admin_monthly_profits_monthly_profit(monthlyProfit._id), monthlyProfit).pipe(
                    tap(monthlyProfit => {
                        let index = monthlyProfits.findIndex(e => e._id == monthlyProfit._id);
                        monthlyProfits[index] = monthlyProfit;
                        this._monthlyProfit.next(monthlyProfit);
                        this._monthlyProfits.next(monthlyProfits);
                        return of(monthlyProfit);
                    })
                )
            })
        );
    }
    remove(monthlyProfit: Partial<MonthlyProfit>): Observable<MonthlyProfit> {
        return this._monthlyProfits.pipe(
            take(1),
            switchMap(monthlyProfits => {
                return this._httpClient.delete<MonthlyProfit>(this._apiService.admin_monthly_profits_monthly_profit(monthlyProfit._id)).pipe(
                    tap(monthlyProfit => {
                        let index = monthlyProfits.findIndex(e => e._id == monthlyProfit._id);
                        monthlyProfits.splice(index, 1)
                        this._monthlyProfit.next(monthlyProfit);
                        this._monthlyProfits.next(monthlyProfits);
                        return of(monthlyProfit);
                    })
                )
            })
        );
    }
}

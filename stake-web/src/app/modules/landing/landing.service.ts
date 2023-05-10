import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MonthlyProfit, News } from './landing.types';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class LandingService {
    private _news: BehaviorSubject<News[]> = new BehaviorSubject(null);
    private _monthlyProfits: BehaviorSubject<MonthlyProfit[]> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }
    get news$(): Observable<News[]> {
        return this._news.asObservable();
    }
    get monthlyProfits$(): Observable<News[]> {
        return this._monthlyProfits.asObservable();
    }
    getLatestNews(): Observable<News[]> {
        return this._httpClient.get<News[]>(this._apiService.public_news()).pipe(
            tap(news => {
                this._news.next(news);
            }),
        );
    }
    getBestTraders(time: Date): Observable<MonthlyProfit[]> {
        return this._httpClient.get<MonthlyProfit[]>(this._apiService.public_bestTraders(time)).pipe(
            tap(bestTraders => {
                this._monthlyProfits.next(bestTraders);
            })
        );
    }
}

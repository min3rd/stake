import { Observable, tap, BehaviorSubject, switchMap, map, take, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kline, TradingCall, TradingConfig, TradingRoom, TradingRound } from './trading.types';
import { ApiService } from 'app/core/api/api.service';
import { constants } from 'app/common/constants';

@Injectable({
    providedIn: 'root'
})
export class TradingService {
    private _rooms: BehaviorSubject<TradingRoom[] | null> = new BehaviorSubject(null);
    private _klines: BehaviorSubject<Kline[] | null> = new BehaviorSubject(null);
    private _rounds: BehaviorSubject<TradingRound[] | null> = new BehaviorSubject(null);
    private _config: BehaviorSubject<TradingConfig | null> = new BehaviorSubject(null);
    private _tradingCalls: BehaviorSubject<TradingCall[] | null> = new BehaviorSubject(null);
    private _tradingRoom: BehaviorSubject<TradingRoom | null> = new BehaviorSubject(null);

    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }

    get rooms$(): Observable<TradingRoom[]> {
        return this._rooms.asObservable();
    }

    get klines$(): Observable<Kline[]> {
        return this._klines.asObservable();
    }

    get rounds$(): Observable<TradingRound[]> {
        return this._rounds.asObservable();
    }

    get config$(): Observable<TradingConfig> {
        return this._config.asObservable();
    }

    get tradingCalls$(): Observable<TradingCall[]> {
        return this._tradingCalls.asObservable();
    }

    get tradingRoom$(): Observable<TradingRoom> {
        return this._tradingRoom.asObservable();
    }

    getTradingRooms(): Observable<TradingRoom[]> {
        return this._httpClient.get<TradingRoom[]>(this._apiService.public_trading_rooms()).pipe(tap(response => {
            this._rooms.next(response);
        }));
    }

    getTradingRoomsAndFirst(): Observable<TradingRoom[]> {
        return this._httpClient.get<TradingRoom[]>(this._apiService.public_trading_rooms()).pipe(tap(response => {
            this._rooms.next(response);
            this._tradingRoom.next(response[0]);
        }));
    }

    getTradingRoom(symbol: string): Observable<TradingRoom> {
        return this._httpClient.get<TradingRoom>(this._apiService.public_trading_rooms_room(symbol)).pipe(tap((tradingRoom: TradingRoom) => {
            this._tradingRoom.next(tradingRoom);
        }));
    }
    getLatestKlines(tradingRoom: TradingRoom, size: number = 60): Observable<Kline[]> {
        return this._httpClient.get<Kline[]>(this._apiService.public_trading_latest_klines(tradingRoom.symbol ?? '', size)).pipe(
            tap(response => {
                this._klines.next(response);
            })
        );
    }
    getLatestRounds(tradingRoom: TradingRoom, size: number = 60): Observable<TradingRound[]> {
        return this._httpClient.get<TradingRound[]>(this._apiService.public_trading_latest_rounds(tradingRoom.symbol ?? '', size)).pipe(
            tap(response => {
                this._rounds.next(response);
            })
        );
    }
    getConfig(tradingRoom: TradingRoom, size: number = 60): Observable<TradingConfig> {
        return this._httpClient.get<TradingConfig>(this._apiService.public_trading_config(tradingRoom.symbol ?? '')).pipe(
            tap(response => {
                this._config.next(response);
            })
        );
    }
    call(tradingCall: TradingCall): Observable<TradingCall> {
        return this._tradingCalls.pipe(
            take(1),
            switchMap(tradingCalls => this._httpClient.post(this._apiService.users_trading_calls(), tradingCall)
                .pipe(map((newTradingCall: TradingCall) => {
                    (tradingCalls ?? []).push(newTradingCall);
                    this._tradingCalls.next(tradingCalls);
                    return newTradingCall;
                }))
            )
        );
    }
    getLatestTradingCalls(): Observable<TradingCall[]> {
        return this._tradingCalls.pipe(
            take(1),
            switchMap(tradingCalls => this._httpClient.get<TradingCall[]>(this._apiService.users_trading_latestCalls()).pipe(tap(newTradingCalls => {
                tradingCalls = tradingCalls ?? [];
                tradingCalls = tradingCalls.filter(e => newTradingCalls.findIndex(t => t._id == e._id) < 0);
                this._tradingCalls.next([...tradingCalls, ...newTradingCalls]);
            })))
        );
    }

    getTradingCallToday(): Observable<TradingCall[]> {
        return this._tradingCalls.pipe(
            take(1),
            switchMap(tradingCalls => this._httpClient.get<TradingCall[]>(this._apiService.users_trading_calls_today()).pipe(tap(newTradingCalls => {
                tradingCalls = tradingCalls ?? [];
                tradingCalls = tradingCalls.filter(e => newTradingCalls.findIndex(t => t._id == e._id) < 0);
                this._tradingCalls.next([...tradingCalls, ...newTradingCalls]);
            })))
        );
    }

    getStorageTradingCalls(): Observable<TradingCall[]> {
        return this._tradingCalls.pipe(
            take(1),
            switchMap(tradingCalls => {
                let raw = localStorage.getItem(constants.LOCAL_STORAGE_KEYS.TRADING_CALLS);
                if (!raw) {
                    return of([]);
                }
                try {
                    let results: TradingCall[] = JSON.parse(raw);
                    if (!Array.isArray(results)) {
                        return of([]);
                    }
                    if (!Array.isArray(tradingCalls)) {
                        tradingCalls = [];
                    }
                    this._tradingCalls.next([...tradingCalls, ...results]);
                    return of(results);
                } catch (error) {
                    console.error(error);
                }
            }
            ),
        );
    }
}

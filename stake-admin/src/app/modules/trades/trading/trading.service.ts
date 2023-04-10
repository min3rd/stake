import { Observable, tap, BehaviorSubject, switchMap, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kline, TradingCall, TradingCallType, TradingConfig, TradingRoom, TradingRound } from './trading.types';
import { ApiService } from 'app/core/api/api.service';
import { SocketService } from 'app/core/socket/socket.service';

@Injectable({
    providedIn: 'root'
})
export class TradingService {
    _rooms: BehaviorSubject<TradingRoom[] | null> = new BehaviorSubject(null);
    _rounds: BehaviorSubject<TradingRound[] | null> = new BehaviorSubject(null);

    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }

    get rooms$(): Observable<TradingRoom[]> {
        return this._rooms.asObservable();
    }

    get rounds$(): Observable<TradingRound[]> {
        return this._rounds.asObservable();
    }

    getTradingRooms(): Observable<TradingRoom[]> {
        return this._httpClient.get<TradingRoom[]>(this._apiService.admin_trading_rooms()).pipe(tap(response => {
            this._rooms.next(response);
        }));
    }
    getLatestRounds(): Observable<TradingRound[]> {
        return this._httpClient.get<TradingRound[]>(this._apiService.admin_trading_rounds()).pipe(
            tap(response => {
                this._rounds.next(response);
            })
        );
    }
    switchResult(tradingRound: TradingRound, type: TradingCallType): Observable<TradingRound> {
        return this._rounds.pipe(
            take(1),
            switchMap(tradingRounds => {
                return this._httpClient.post<TradingRound>(this._apiService.admin_trading_rounds(), {
                    _id: tradingRound._id,
                    type: type,
                }).pipe(tap(tradingRound => {
                    let index = tradingRounds.findIndex(e => e.symbol == tradingRound.symbol);
                    if (index >= 0) {
                        tradingRounds[index] = tradingRound;
                    }
                    this._rounds.next(tradingRounds);
                }));
            })
        );
    }

    updateTradingRoom(tradingRoom: TradingRoom): Observable<TradingRoom> {
        return this._rooms.pipe(
            take(1),
            switchMap(tradingRooms => {
                return this._httpClient.post<TradingRoom>(this._apiService.admin_trading_rooms(), tradingRoom).pipe(
                    tap(tradingRoom => {
                        let index = tradingRooms.findIndex(e => e.symbol == tradingRoom.symbol);
                        if (index >= 0) {
                            tradingRooms[index] = tradingRoom;
                        } else {
                            tradingRooms.push(tradingRoom);
                        }
                        this._rooms.next(tradingRooms);
                    })
                );
            })
        );
    }

    deleteTradingRoom(tradingRoom: TradingRoom): Observable<any> {
        return this._rooms.pipe(
            take(1),
            switchMap(tradingRooms => {
                return this._httpClient.delete<any>(this._apiService.admin_trading_rooms_room(tradingRoom._id)).pipe(
                    tap(response => {
                        console.log(response);
                    })
                );
            })
        );
    }
}

import { Observable, tap, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kline, TradingConfig, TradingRoom, TradingRound } from './trading.types';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TradingService {
  private _rooms: BehaviorSubject<TradingRoom[] | null> = new BehaviorSubject(null);
  private _klines: BehaviorSubject<Kline[] | null> = new BehaviorSubject(null);
  private _rounds: BehaviorSubject<TradingRound[] | null> = new BehaviorSubject(null);
  private _config: BehaviorSubject<TradingConfig | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private _apiService: ApiService) { }

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

  getTradingRooms(): Observable<TradingRoom[]> {
    return this._httpClient.get<TradingRoom[]>(this._apiService.public_trading_rooms()).pipe(tap(response => {
      this._rooms.next(response);
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
}

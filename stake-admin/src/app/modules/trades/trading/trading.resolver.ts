import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { TradingService } from './trading.service';
import { TradingRoom, TradingRound } from './trading.types';

@Injectable({
  providedIn: 'root'
})
export class TradingRoomsResolver implements Resolve<TradingRoom[]> {
  constructor(private _tradingService: TradingService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TradingRoom[]> {
    return this._tradingService.getTradingRooms();
  }
}


@Injectable({
  providedIn: 'root'
})
export class TradingRoundsResolver implements Resolve<TradingRound[]> {
  constructor(private _tradingService: TradingService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TradingRoom[]> {
    return this._tradingService.getLatestRounds();
  }
}

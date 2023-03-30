import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TradingService } from './trading.service';
import { TradingRoom, Kline } from './trading.types';

@Injectable({
  providedIn: 'root'
})
export class TradingRoomResolver implements Resolve<TradingRoom[]> {
  constructor(private _tradingService: TradingService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TradingRoom[]> {
    return this._tradingService.getTradingRooms();
  }
}

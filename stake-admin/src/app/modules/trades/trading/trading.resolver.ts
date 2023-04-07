import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { TradingService } from './trading.service';
import { TradingRoom } from './trading.types';

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

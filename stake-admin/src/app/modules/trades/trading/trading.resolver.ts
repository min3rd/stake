import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TradingService } from './trading.service';
import { TradingRoom, Kline } from './trading.types';
import { UserService } from 'app/core/user/user.service';
import { ClientSocketService } from 'app/core/socket/socket.service';
import { SocketEvent } from 'app/core/config/socket.config';

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

@Injectable({
  providedIn: 'root'
})
export class TradingSocketResolver implements Resolve<boolean> {
  constructor(
    private _tradingService: TradingService,
    private _userService: UserService,
    private _clientSocketService: ClientSocketService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this._userService.user) {
      this._clientSocketService.userSocket.emit(SocketEvent.ROOM_JOIN, this._userService.user.id);
    }
    return of(true);
  }
}

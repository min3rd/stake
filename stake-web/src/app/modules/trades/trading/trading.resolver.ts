import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, Subject, of, take, takeUntil, tap } from 'rxjs';
import { TradingService } from './trading.service';
import { TradingCall, TradingRoom } from './trading.types';
import { constants } from 'app/common/constants';
import moment from 'moment';

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
export class FirstTradingRoomsResolver implements Resolve<TradingRoom[]> {
    constructor(private _tradingService: TradingService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TradingRoom[]> {
        return this._tradingService.getTradingRoomsAndFirst();
    }
}

@Injectable({
    providedIn: 'root'
})
export class TradingRoomResolver implements Resolve<TradingRoom> {
    constructor(private _tradingService: TradingService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TradingRoom> {
        return this._tradingService.getTradingRoom(route.paramMap.get('symbol'));
    }
}


@Injectable({
    providedIn: 'root'
})
export class StorageTradingCallsResolver implements Resolve<TradingCall[]> {
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(private _tradingService: TradingService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TradingCall[]> {
        this._tradingService.tradingCalls$.pipe(takeUntil(this._unsubscribeAll)).subscribe(tradingCalls => {
            if (!tradingCalls) {
                return of(true);
            }
            let raw = localStorage.getItem(constants.LOCAL_STORAGE_KEYS.TRADING_CALLS);
            try {
                let results: TradingCall[] = JSON.parse(raw);
                if (!Array.isArray(results)) {
                    localStorage.setItem(constants.LOCAL_STORAGE_KEYS.TRADING_CALLS, JSON.stringify(tradingCalls));
                    return of(true);
                }
                results = results.filter(e => tradingCalls.findIndex(t => t._id == e._id) < 0);
                results = [...results, ...tradingCalls].filter(e => new Date(e.openTime).getTime() > moment().startOf('day').toDate().getTime());
                localStorage.setItem(constants.LOCAL_STORAGE_KEYS.TRADING_CALLS, JSON.stringify(results));
            } catch (error) {
                console.error(error);
                localStorage.setItem(constants.LOCAL_STORAGE_KEYS.TRADING_CALLS, JSON.stringify(tradingCalls.filter(e => new Date(e.openTime).getTime() > moment().startOf('day').toDate().getTime())));
            }
        });
        return this._tradingService.getStorageTradingCalls();
    }
}

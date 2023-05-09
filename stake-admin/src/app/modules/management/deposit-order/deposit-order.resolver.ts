import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DepositOrder } from './deposit-order.types';
import { DepositOrderService } from './deposit-order.service';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DepositOrdersResolver implements Resolve<DepositOrder[]> {
    constructor(
        private _depositOrderService: DepositOrderService
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepositOrder[]> {
        let startDate = moment().add(-7, 'days').toDate();
        let endDate = moment().endOf('day').toDate();
        return this._depositOrderService.searchDepositOrders(startDate, endDate);
    }
}

@Injectable({
    providedIn: 'root'
})
export class DepositOrderResolver implements Resolve<DepositOrder> {
    constructor(
        private _depositOrderService: DepositOrderService
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepositOrder> {
        return this._depositOrderService.getDepositOrderById(route.paramMap.get('depositOrderId'));
    }
}

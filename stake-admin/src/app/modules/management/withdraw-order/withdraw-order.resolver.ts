import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WithdrawOrder } from './withdraw-order.types';
import { WithdrawOrderService } from './withdraw-order.service';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class WithdrawOrdersResolver implements Resolve<WithdrawOrder[]> {
    constructor(
        private _withdrawOrderService: WithdrawOrderService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WithdrawOrder[]> {
        let startDate = moment().add(-7, 'days').toDate();
        let endDate = moment().endOf('day').toDate();
        return this._withdrawOrderService.searchWithdrawOrders(startDate, endDate);
    }
}

@Injectable({
    providedIn: 'root'
})
export class WithdrawOrderResolver implements Resolve<WithdrawOrder> {
    constructor(
        private _withdrawOrderService: WithdrawOrderService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WithdrawOrder> {
        return this._withdrawOrderService.getWithdrawOrderById(route.paramMap.get('withdrawOrderId'));
    }
}

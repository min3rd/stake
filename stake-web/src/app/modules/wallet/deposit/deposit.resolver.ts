import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DepositService } from './deposit.service';
import { DepositOrder } from './deposit.types';

@Injectable({
  providedIn: 'root'
})
export class DepositOrdersResolver implements Resolve<DepositOrder[]> {
  constructor(
    private _depositService: DepositService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepositOrder[]> {
    return this._depositService.getDepositOrders();
  }
}

@Injectable({
  providedIn: 'root'
})
export class DepositOrderResolver implements Resolve<DepositOrder> {
  constructor(
    private _depositService: DepositService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepositOrder> {
    return this._depositService.getDepositOrder(route.paramMap.get('depositOrderId'));
  }
}

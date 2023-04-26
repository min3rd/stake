import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DepositOrder } from './wallet.types';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class DepositOrdersResolver implements Resolve<DepositOrder[]> {
  constructor(
    private _walletService: WalletService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepositOrder[]> {
    return this._walletService.getDepositOrders();
  }
}

@Injectable({
  providedIn: 'root'
})
export class DepositOrderResolver implements Resolve<DepositOrder> {
  constructor(
    private _walletService: WalletService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepositOrder> {
    return this._walletService.getDepositOrder(route.paramMap.get('depositOrderId'));
  }
}

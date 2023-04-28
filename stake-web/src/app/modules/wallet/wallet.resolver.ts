import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CashTransfer, DepositOrder, WithdrawOrder } from './wallet.types';
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

@Injectable({
  providedIn: 'root'
})
export class WithdrawOrdersResolver implements Resolve<WithdrawOrder[]> {
  constructor(
    private _walletService: WalletService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WithdrawOrder[]> {
    return this._walletService.getWithdrawOrders();
  }
}

@Injectable({
  providedIn: 'root'
})
export class WithdrawOrderResolver implements Resolve<WithdrawOrder> {
  constructor(
    private _walletService: WalletService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WithdrawOrder> {
    return this._walletService.getWithdrawOrder(route.paramMap.get('withdrawOrderId'));
  }
}

@Injectable({
  providedIn: 'root'
})
export class CashTransfersResolver implements Resolve<CashTransfer[]> {
  constructor(
    private _walletService: WalletService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CashTransfer[]> {
    return this._walletService.getCashTransfers();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CashTransferResolver implements Resolve<CashTransfer> {
  constructor(
    private _walletService: WalletService,
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CashTransfer> {
    return this._walletService.getCashTransfer(route.paramMap.get('cashTransferId'));
  }
}

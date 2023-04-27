import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { BehaviorSubject, Observable, take, switchMap, tap } from 'rxjs';
import { CashTransfer, DepositOrder, WithdrawOrder } from './wallet.types';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  _depositOrder: BehaviorSubject<DepositOrder | null> = new BehaviorSubject(null);
  _depositOrders: BehaviorSubject<DepositOrder[] | null> = new BehaviorSubject(null);
  _withdrawOrder: BehaviorSubject<WithdrawOrder | null> = new BehaviorSubject(null);
  _withdrawOrders: BehaviorSubject<WithdrawOrder[] | null> = new BehaviorSubject(null);
  _cashTransfer: BehaviorSubject<CashTransfer | null> = new BehaviorSubject(null);
  _cashTransfers: BehaviorSubject<CashTransfer[] | null> = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }
  get depositOrder$(): Observable<DepositOrder> {
    return this._depositOrder.asObservable();
  }
  get depositOrders$(): Observable<DepositOrder[]> {
    return this._depositOrders.asObservable();
  }

  getDepositOrders(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }): Observable<DepositOrder[]> {
    return this._httpClient.get<DepositOrder[]>(this._apiService.users_wallet_depositOrders(offset, size, sort)).pipe(
      tap(depositOrders => {
        depositOrders = depositOrders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        this._depositOrders.next(depositOrders);
      })
    );
  }

  getDepositOrder(id: string): Observable<DepositOrder> {
    return this._httpClient.get<DepositOrder>(this._apiService.users_wallet_depositOrders_depositOrder(id)).pipe(
      tap(depositOrder => {
        this._depositOrder.next(depositOrder);
      })
    );
  }

  deleteDepositOrder(depositOrder: DepositOrder): Observable<any> {
    return this._depositOrders.pipe(
      take(1),
      switchMap(depositOrders => {
        return this._httpClient.delete<any>(this._apiService.users_wallet_depositOrders_depositOrder(depositOrder._id)).pipe(
          tap(result => {
            let index = depositOrders.findIndex(e => e._id == depositOrder._id);
            depositOrders.splice(index, 1);
            depositOrders = depositOrders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            this._depositOrders.next(depositOrders);
          })
        );
      })
    );
  }

  checkTransaction(transactionId: string): Observable<DepositOrder> {
    return this._depositOrders.pipe(
      take(1),
      switchMap(depositOrders => {
        return this._httpClient.post<DepositOrder>(this._apiService.users_wallet_checkTransaction(), {
          transactionId: transactionId,
        }).pipe(
          tap(depositOrder => {
            let index = depositOrders.findIndex(e => e._id == depositOrder._id);
            if (index >= 0) {
              depositOrders[index] = depositOrder;
            } else {
              depositOrders.push(depositOrder);
            }
            depositOrders = depositOrders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            this._depositOrders.next(depositOrders);
            this._depositOrder.next(depositOrder);
          })
        );
      })
    );
  }

  getWithdrawOrders(): Observable<WithdrawOrder[]> {
    return this._httpClient.get<WithdrawOrder[]>(this._apiService.users_wallet_withdrawOrders()).pipe(
      tap(withdrawOrders => {
        this._withdrawOrders.next(withdrawOrders);
      })
    );
  }

  getWithdrawOrder(id: string): Observable<WithdrawOrder> {
    return this._withdrawOrders.pipe(
      take(1),
      switchMap(withdrawOrders => {
        return this._httpClient.get<WithdrawOrder>(this._apiService.users_wallet_withdrawOrders_withdrawOrder(id)).pipe(tap(withdrawOrder => {
          let index = withdrawOrders.findIndex(e => e._id == withdrawOrder._id);
          if (index >= 0) {
            withdrawOrders[index] = withdrawOrder;
          } else {
            withdrawOrders.push(withdrawOrder);
          }
          withdrawOrders = withdrawOrders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._withdrawOrders.next(withdrawOrders);
        }));
      })
    );
  }

  deleteWithdrawOrder(id: string): Observable<WithdrawOrder> {
    return this._withdrawOrders.pipe(
      take(1),
      switchMap(withdrawOrders => {
        return this._httpClient.delete<WithdrawOrder>(this._apiService.users_wallet_withdrawOrders_withdrawOrder(id)).pipe(tap(withdrawOrder => {
          let index = withdrawOrders.findIndex(e => e._id == withdrawOrder._id);
          if (index >= 0) {
            withdrawOrders[index] = withdrawOrder;
            withdrawOrders.splice(index, 1);
          }
          withdrawOrders = withdrawOrders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._withdrawOrders.next(withdrawOrders);
        }));
      })
    );
  }
}

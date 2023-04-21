import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { BehaviorSubject, Observable, take, switchMap, tap } from 'rxjs';
import { DepositOrder, DepositOrderStatus } from './wallet.types';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  _depositOrder: BehaviorSubject<DepositOrder | null> = new BehaviorSubject(null);
  _depositOrders: BehaviorSubject<DepositOrder[] | null> = new BehaviorSubject(null);
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

  cancel(depositOrder: DepositOrder): Observable<DepositOrder> {
    depositOrder.flag = DepositOrderStatus.CANCELED;
    return this._depositOrders.pipe(
      take(1),
      switchMap(depositOrders => {
        return this._httpClient.patch<DepositOrder>(this._apiService.users_wallet_depositOrders_depositOrder(depositOrder._id), depositOrder).pipe(
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

  checkTransaction(transactionId: string): Observable<DepositOrder> {
    return this._depositOrders.pipe(
      take(1),
      switchMap(depositOrders => {
        return this._httpClient.post<DepositOrder>(this._apiService.users_wallets_checkTransaction(), {
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
}

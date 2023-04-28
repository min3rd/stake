import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { BehaviorSubject, Observable, take, switchMap, tap, of } from 'rxjs';
import { CashTransfer, DepositOrder, OrderHistory, WithdrawOrder } from './wallet.types';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  _depositOrder: BehaviorSubject<DepositOrder | null> = new BehaviorSubject(null);
  _withdrawOrder: BehaviorSubject<WithdrawOrder | null> = new BehaviorSubject(null);
  _cashTransfer: BehaviorSubject<CashTransfer | null> = new BehaviorSubject(null);
  _orderHistories: BehaviorSubject<OrderHistory[]> = new BehaviorSubject([]);
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }
  get depositOrder$(): Observable<DepositOrder> {
    return this._depositOrder.asObservable();
  }

  get withdrawOrder$(): Observable<WithdrawOrder> {
    return this._withdrawOrder.asObservable();
  }

  get cashTransfer$(): Observable<CashTransfer> {
    return this._cashTransfer.asObservable();
  }

  get orderHistories$(): Observable<OrderHistory[]> {
    return this._orderHistories.asObservable();
  }

  getDepositOrders(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }): Observable<DepositOrder[]> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => this._httpClient.get<DepositOrder[]>(this._apiService.users_wallet_depositOrders(offset, size, sort)).pipe(
        tap(depositOrders => {

          let neworderHistories = depositOrders.map(e => {
            let orderHistory: OrderHistory = {
              _id: e._id,
              time: e.time,
              amount: e.amount,
              type: 'deposit',
              status: e.status,
            }
            return orderHistory;
          });
          neworderHistories.forEach(t => {
            let index = orderHistories.findIndex(e => e._id == t._id && t.type == e.type);
            if (index >= 0) {
              orderHistories[index] = t;
            } else {
              orderHistories.push(t);
            }
          })
          orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._orderHistories.next(orderHistories);
          return of(depositOrders);
        })
      )),
    );
  }

  getDepositOrder(id: string): Observable<DepositOrder> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => this._httpClient.get<DepositOrder>(this._apiService.users_wallet_depositOrders_depositOrder(id)).pipe(
        tap(depositOrder => {
          let orderHistory: OrderHistory = {
            _id: depositOrder._id,
            time: depositOrder.time,
            amount: depositOrder.amount,
            type: 'deposit',
            status: depositOrder.status,
          }
          let index = orderHistories.findIndex(e => e._id == depositOrder._id && e.type == 'deposit');
          if (index >= 0) {
            orderHistories[index] = orderHistory;
          } else {
            orderHistories.push(orderHistory);
          }
          orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._orderHistories.next(orderHistories);
          this._depositOrder.next(depositOrder);
          return of(depositOrder);
        })
      ))
    );
  }

  deleteDepositOrder(depositOrder: DepositOrder): Observable<any> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => {
        return this._httpClient.delete<any>(this._apiService.users_wallet_depositOrders_depositOrder(depositOrder._id)).pipe(
          tap(result => {
            let index = orderHistories.findIndex(e => e._id == depositOrder._id && e.type == 'deposit');
            orderHistories.splice(index, 1);
            orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            this._orderHistories.next(orderHistories);
          })
        );
      })
    );
  }

  checkTransaction(transactionId: string): Observable<DepositOrder> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => {
        return this._httpClient.post<DepositOrder>(this._apiService.users_wallet_checkTransaction(), {
          transactionId: transactionId,
        }).pipe(
          tap(depositOrder => {
            let orderHistory: OrderHistory = {
              _id: depositOrder._id,
              time: depositOrder.time,
              amount: depositOrder.amount,
              type: 'deposit',
              status: depositOrder.status,
            }
            let index = orderHistories.findIndex(e => e._id == orderHistory._id && e.type == 'deposit');
            if (index >= 0) {
              orderHistories[index] = orderHistory;
            } else {
              orderHistories.push(orderHistory);
            }
            orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            this._orderHistories.next(orderHistories);
            this._depositOrder.next(depositOrder);
          })
        );
      })
    );
  }
  createWithdrawOrder(withdrawOrder: WithdrawOrder): Observable<WithdrawOrder> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => this._httpClient.post<WithdrawOrder>(this._apiService.users_wallet_withdrawOrders(), withdrawOrder)
        .pipe(tap(withdrawOrder => {
          let orderHistory: OrderHistory = {
            _id: withdrawOrder._id,
            time: withdrawOrder.time,
            amount: withdrawOrder.amount,
            type: 'withdraw',
            status: withdrawOrder.status,
          }
          orderHistories.push(orderHistory);
          orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._withdrawOrder.next(withdrawOrder);
        })))
    );
  }
  getWithdrawOrders(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }): Observable<WithdrawOrder[]> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => this._httpClient.get<DepositOrder[]>(this._apiService.users_wallet_withdrawOrders(offset, size, sort)).pipe(
        tap(withdrawOrders => {
          let neworderHistories = withdrawOrders.map(e => {
            let orderHistory: OrderHistory = {
              _id: e._id,
              time: e.time,
              amount: e.amount,
              type: 'withdraw',
              status: e.status,
            }
            return orderHistory;
          });
          neworderHistories.forEach(t => {
            let index = orderHistories.findIndex(e => e._id == t._id && t.type == e.type);
            if (index >= 0) {
              orderHistories[index] = t;
            } else {
              orderHistories.push(t);
            }
          })
          orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._orderHistories.next(orderHistories);
          return of(withdrawOrders);
        })
      )),
    );
  }

  getWithdrawOrder(id: string): Observable<WithdrawOrder> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => this._httpClient.get<WithdrawOrder>(this._apiService.users_wallet_withdrawOrders_withdrawOrder(id))
        .pipe(tap(withdrawOrder => {
          let orderHistory: OrderHistory = {
            _id: withdrawOrder._id,
            time: withdrawOrder.time,
            amount: withdrawOrder.amount,
            type: 'withdraw',
            status: withdrawOrder.status,
          }
          let index = orderHistories.findIndex(e => e._id == orderHistory._id && e.type == 'withdraw');
          if (index >= 0) {
            orderHistories[index] = orderHistory;
          } else {
            orderHistories.push(orderHistory);
          }
          orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._orderHistories.next(orderHistories);
          this._withdrawOrder.next(withdrawOrder);
        })))
    );
  }

  deleteWithdrawOrder(id: string): Observable<WithdrawOrder> {
    return this._orderHistories.pipe(
      take(1),
      switchMap(orderHistories => this._httpClient.delete<WithdrawOrder>(this._apiService.users_wallet_withdrawOrders_withdrawOrder(id))
        .pipe(tap(withdrawOrder => {
          let index = orderHistories.findIndex(e => e._id == withdrawOrder._id && e.type == 'withdraw');
          if (index >= 0) {
            orderHistories[index] = withdrawOrder;
            orderHistories.splice(index, 1);
          }
          orderHistories = orderHistories.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this._orderHistories.next(orderHistories);
        })))
    );
  }
}

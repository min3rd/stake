import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';
import { WithdrawOrder } from './withdraw-order.types';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class WithdrawOrderService {
    private _withdrawOrders: BehaviorSubject<WithdrawOrder[]> = new BehaviorSubject(null);
    private _withdrawOrder: BehaviorSubject<WithdrawOrder> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }

    get withdrawOrders$(): Observable<WithdrawOrder[]> {
        return this._withdrawOrders.asObservable();
    }
    get withdrawOrder$(): Observable<WithdrawOrder> {
        return this._withdrawOrder.asObservable();
    }

    searchWithdrawOrders(startDate: Date = new Date(), endDate: Date = new Date(), offset: number = 0, size: number = 10): Observable<WithdrawOrder[]> {
        return this._httpClient.get<WithdrawOrder[]>(this._apiService.admin_withdrawOrders(startDate, endDate, offset, size)).pipe(
            tap(withdrawOrders => {
                this._withdrawOrders.next(withdrawOrders);
                return of(withdrawOrders);
            })
        );
    }

    getWithdrawOrderById(withdarawOrderId: string): Observable<WithdrawOrder> {
        return this._withdrawOrders.pipe(
            take(1),
            switchMap(withdrawOrders => {
                return this._httpClient.get<WithdrawOrder>(this._apiService.admin_withdrawOrders_withdrawOrder(withdarawOrderId)).pipe(
                    tap(withdrawOrder => {
                        let index = withdrawOrders.findIndex(e => e._id == withdrawOrder._id);
                        if (index >= 0) {
                            withdrawOrders[index] = withdrawOrder;
                        } else {
                            withdrawOrders.push(withdrawOrder);
                        }
                        this._withdrawOrders.next(withdrawOrders);
                        this._withdrawOrder.next(withdrawOrder);
                        return of(withdrawOrder);
                    })
                )
            })
        );
    }
    acceptWithdrawOrder(withdarawOrderId: string, data: { transactionId: string }): Observable<WithdrawOrder> {
        return this._withdrawOrders.pipe(
            take(1),
            switchMap(withdrawOrders => {
                return this._httpClient.post<WithdrawOrder>(this._apiService.admin_withdrawOrders_withdrawOrder_acceptWithdrawOrder(withdarawOrderId), data).pipe(
                    tap(withdrawOrder => {
                        let index = withdrawOrders.findIndex(e => e._id == withdrawOrder._id);
                        if (index >= 0) {
                            withdrawOrders[index] = withdrawOrder;
                        } else {
                            withdrawOrders.push(withdrawOrder);
                        }
                        this._withdrawOrders.next(withdrawOrders);
                        this._withdrawOrder.next(withdrawOrder);
                        return of(withdrawOrder);
                    })
                )
            })
        );
    }
    denyWithdrawOrder(withdarawOrderId: string): Observable<WithdrawOrder> {
        return this._withdrawOrders.pipe(
            take(1),
            switchMap(withdrawOrders => {
                return this._httpClient.post<WithdrawOrder>(this._apiService.admin_withdrawOrders_withdrawOrder_denyWithdrawOrder(withdarawOrderId), {}).pipe(
                    tap(withdrawOrder => {
                        let index = withdrawOrders.findIndex(e => e._id == withdrawOrder._id);
                        if (index >= 0) {
                            withdrawOrders[index] = withdrawOrder;
                        } else {
                            withdrawOrders.push(withdrawOrder);
                        }
                        this._withdrawOrders.next(withdrawOrders);
                        this._withdrawOrder.next(withdrawOrder);
                        return of(withdrawOrder);
                    })
                )
            })
        );
    }
}

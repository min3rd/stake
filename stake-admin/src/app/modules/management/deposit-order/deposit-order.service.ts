import { BehaviorSubject, Observable, take, switchMap, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { DepositOrder } from './deposit-order.types';

@Injectable({
    providedIn: 'root'
})
export class DepositOrderService {
    private _depositOrders: BehaviorSubject<DepositOrder[]> = new BehaviorSubject(null);
    private _depositOrder: BehaviorSubject<DepositOrder> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }
    get depositOrders$(): Observable<DepositOrder[]> {
        return this._depositOrders.asObservable();
    }
    get depositOrder$(): Observable<DepositOrder> {
        return this._depositOrder.asObservable();
    }

    searchDepositOrders(startDate: Date = new Date(), endDate: Date = new Date(), offset: number = 0, size: number = 10): Observable<DepositOrder[]> {
        return this._depositOrders.pipe(
            take(1),
            switchMap(depositOrders => {
                return this._httpClient.get<DepositOrder[]>(this._apiService.admin_depositOrders(startDate, endDate, offset, size)).pipe(
                    tap(newDepositOrders => {
                        this._depositOrders.next(newDepositOrders);
                        return of(newDepositOrders);
                    }),
                )
            })
        );
    }

    getDepositOrderById(depositOrderId: string): Observable<DepositOrder> {
        return this._depositOrders.pipe(
            take(1),
            switchMap(depositOrders => {
                return this._httpClient.get<DepositOrder>(this._apiService.admin_depositOrders_depositOrder(depositOrderId)).pipe(
                    tap(newDepositOrder => {
                        let index = depositOrders.findIndex(e => e._id == newDepositOrder._id);
                        if (index >= 0) {
                            depositOrders[index] = newDepositOrder;
                        } else {
                            depositOrders.push(newDepositOrder);
                        }
                        this._depositOrders.next(depositOrders);
                        this._depositOrder.next(newDepositOrder);
                        return of(newDepositOrder);
                    }),
                )
            })
        );
    }

    denyDepositOrder(depositOrderId: string): Observable<DepositOrder> {
        return this._depositOrders.pipe(
            take(1),
            switchMap(depositOrders => {
                return this._httpClient.post<DepositOrder>(this._apiService.admin_depositOrders_depositOrder_denyDepositOrder(depositOrderId), {}).pipe(
                    tap(newDepositOrder => {
                        let index = depositOrders.findIndex(e => e._id == newDepositOrder._id);
                        if (index >= 0) {
                            depositOrders[index] = newDepositOrder;
                        } else {
                            depositOrders.push(newDepositOrder);
                        }
                        this._depositOrders.next(depositOrders);
                        this._depositOrder.next(newDepositOrder);
                        return of(newDepositOrder);
                    }),
                )
            })
        );
    }

    acceptDepositOrder(depositOrderId: string, data: { amount: number }): Observable<DepositOrder> {
        return this._depositOrders.pipe(
            take(1),
            switchMap(depositOrders => {
                return this._httpClient.post<DepositOrder>(this._apiService.admin_depositOrders_depositOrder_acceptDepositOrder(depositOrderId), data).pipe(
                    tap(newDepositOrder => {
                        let index = depositOrders.findIndex(e => e._id == newDepositOrder._id);
                        if (index >= 0) {
                            depositOrders[index] = newDepositOrder;
                        } else {
                            depositOrders.push(newDepositOrder);
                        }
                        this._depositOrders.next(depositOrders);
                        this._depositOrder.next(newDepositOrder);
                        return of(newDepositOrder);
                    }),
                )
            })
        );
    }
}

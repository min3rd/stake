import { Clipboard } from '@angular/cdk/clipboard';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { DepositOrder, DepositOrderStatus } from '../../wallet.types';
@Component({
  selector: 'app-deposit-order',
  templateUrl: './deposit-order.component.html',
  styleUrls: ['./deposit-order.component.scss']
})
export class DepositOrderComponent implements OnInit, OnDestroy {

  depositOrders$: Observable<DepositOrder[]>;
  depositOrder: DepositOrder;
  DepositOrderStatus = DepositOrderStatus;
  apiCalling: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _walletService: WalletService,
    private _clipboard: Clipboard
  ) {

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.depositOrders$ = this._walletService.depositOrders$;
    this._walletService.depositOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(depositOrder => this.depositOrder = depositOrder);
  }
  copyAddress() {
    this._clipboard.copy(this.depositOrder.masterAddress);
  }
  copyMessage() {
    this._clipboard.copy(this.depositOrder._id);
  }

  cancel() {
    this.depositOrder.flag = DepositOrderStatus.CANCELED;
    this.apiCalling = true;
    this._walletService.cancel(this.depositOrder).subscribe(depositOrder => {
      this.depositOrder = depositOrder;
    }, e => { },
      () => {
        this.apiCalling = false
      });
  }
}

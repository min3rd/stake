import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepositService } from './deposit.service';
import { DepositOrder, DepositOrderStatus } from './deposit.types';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from 'app/app.service';
import { AppConfig } from 'app/app.types';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit, OnDestroy {
  DepositOrderStatus: DepositOrderStatus;
  depositOrders$: Observable<DepositOrder[]>;
  apiCalling: boolean = false;
  transactionId: string = '';
  offset: number = 0;
  size: number = 10;
  appConfig: AppConfig;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _depositService: DepositService,
    private _router: Router,
    private _appService: AppService,
  ) {

  }
  ngOnInit(): void {
    this.depositOrders$ = this._depositService.depositOrders$;
    this._appService.appConfig$.pipe(takeUntil(this._unsubscribeAll)).subscribe((appConfig: AppConfig) => {
      this.appConfig = appConfig;
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  createOrder() {
    this.apiCalling = true;
    this._depositService.createOrder().subscribe(depositOrder => {
      this._router.navigate(['/wallet/deposit/' + depositOrder._id]);
    }, e => { }, () => {
      this.apiCalling = false;
    });
  }
  nextPage() {
    this.offset += this.size;
    this._depositService.getDepositOrders(this.offset, this.size).subscribe((depositOrders: DepositOrder[]) => {
      if (!depositOrders.length) {
        this.offset = 0;
      }
    }, e => {
      this.offset = 0;
    });
  }

  prevPage() {
    this.offset -= this.size;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this._depositService.getDepositOrders(this.offset, this.size).subscribe((depositOrders: DepositOrder[]) => {
      if (!depositOrders.length) {
        this.offset = 0;
      }
    }, e => {
      this.offset = 0;
    });
  }
  checkTransaction() {
    this._depositService.checkTransaction(this.transactionId).subscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from 'app/app.service';
import { AppConfig } from 'app/app.types';
import { DepositOrder, DepositOrderStatus } from '../wallet.types';
import { WalletService } from '../wallet.service';
import { WalletComponent } from '../wallet/wallet.component';

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
  editMode: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _walletService: WalletService,
    private _router: Router,
    private _appService: AppService,
    private _walletComponent: WalletComponent,
  ) {

  }
  ngOnInit(): void {
    this._walletComponent.matDrawer.open();

    this.depositOrders$ = this._walletService.depositOrders$;
    this._appService.appConfig$.pipe(takeUntil(this._unsubscribeAll)).subscribe((appConfig: AppConfig) => {
      this.appConfig = appConfig;
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._walletComponent.matDrawer.close();
  }
  nextPage() {
    this.offset += this.size;
    this._walletService.getDepositOrders(this.offset, this.size).subscribe((depositOrders: DepositOrder[]) => {
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
    this._walletService.getDepositOrders(this.offset, this.size).subscribe((depositOrders: DepositOrder[]) => {
      if (!depositOrders.length) {
        this.offset = 0;
      }
    }, e => {
      this.offset = 0;
    });
  }
  checkTransaction() {
    this._walletService.checkTransaction(this.transactionId).subscribe();
  }
}

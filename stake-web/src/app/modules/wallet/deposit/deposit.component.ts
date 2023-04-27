import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from 'app/app.service';
import { AppConfig } from 'app/app.types';
import { DepositOrder, DepositOrderStatus } from '../wallet.types';
import { WalletService } from '../wallet.service';
import { WalletComponent } from '../wallet/wallet.component';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit, OnDestroy {
  DepositOrderStatus = DepositOrderStatus;
  apiCalling: boolean = false;
  transactionId: string = '';
  offset: number = 0;
  size: number = 10;
  appConfig: AppConfig;
  depositOrder: DepositOrder;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _walletService: WalletService,
    private _router: Router,
    private _appService: AppService,
    private _walletComponent: WalletComponent,
    private _clipboard: Clipboard,
  ) {

  }
  ngOnInit(): void {
    this._walletComponent.matDrawer.open();
    this._appService.appConfig$.pipe(takeUntil(this._unsubscribeAll)).subscribe((appConfig: AppConfig) => {
      this.appConfig = appConfig;
    });
    this._walletService.depositOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe((depositOrder: DepositOrder) => {
      this.depositOrder = depositOrder;
    });
  }
  ngOnDestroy(): void {
    this.depositOrder = null;
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._walletComponent.matDrawer.close();
  }

  checkTransaction() {
    this._walletService.checkTransaction(this.transactionId).subscribe(result => {
      this._router.navigate(['/wallet', '/deposit', result._id]);
    });

  }

  copyMasterAddress() {
    this._clipboard.copy(this.appConfig.MASTER_ADDRESS);
  }

  delete() {
    if (!this.depositOrder) {
      return;
    }
    this._walletService.deleteDepositOrder(this.depositOrder).subscribe(result => {
      this._router.navigate(['/wallet']);
    });
  }
}

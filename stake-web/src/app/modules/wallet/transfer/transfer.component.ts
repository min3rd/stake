import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletComponent } from '../wallet/wallet.component';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { WalletService } from '../wallet.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderStatus, WithdrawOrder } from '../wallet.types';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  form: UntypedFormGroup;
  withdrawOrder: WithdrawOrder;
  OrderStatus = OrderStatus;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _walletComponent: WalletComponent,
    private _walletService: WalletService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
  ) {

  }
  ngOnInit(): void {
    this._walletComponent.matDrawer.open();

    this.form = this._formBuilder.group({
      amount: ['', Validators.required],
      userAddress: ['', Validators.required],
      memo: [''],
    });

    this._walletService.withdrawOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(withdrawOrder => {
      this.withdrawOrder = withdrawOrder;
    });
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._walletComponent.matDrawer.close();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  createWithdrawOrder() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    this._walletService.createWithdrawOrder(this.form.value)
      .subscribe((withdrawOrder: WithdrawOrder) => {
        this._router.navigate(['/wallet', 'withdraw', withdrawOrder._id]);
      }, (error) => {
        this.form.enable();
      });
  }
  deleteWithdrawOrder() {
    this._walletService.deleteWithdrawOrder(this.withdrawOrder._id).subscribe(() => {
      this._router.navigate(['/wallet']);
    });
  }
}

import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletComponent } from '../wallet/wallet.component';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { WalletService } from '../wallet.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CashTransfer, OrderStatus } from '../wallet.types';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  form: UntypedFormGroup;
  cashTransfer: CashTransfer;
  OrderStatus = OrderStatus;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _walletComponent: WalletComponent,
    private _walletService: WalletService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _userService: UserService,
  ) {

  }
  ngOnInit(): void {
    this._walletComponent.matDrawer.open();

    this.form = this._formBuilder.group({
      amount: ['', Validators.required],
      destinationUsername: ['', Validators.required],
      memo: [''],
    });

    this._walletService.cashTransfer$.pipe(takeUntil(this._unsubscribeAll)).subscribe(cashTransfer => {
      this.cashTransfer = cashTransfer;
    });
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._walletComponent.matDrawer.close();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  createCashTransfer() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    this._walletService.createCashTransfer(this.form.value)
      .subscribe((cashTransfer: CashTransfer) => {
        this._router.navigate(['/wallet', 'transfer', cashTransfer._id]);
      }, (error) => {
        this.form.enable();
      });
  }
  isTransfer(): boolean {
    return this.cashTransfer && this.cashTransfer.destinationId != this._userService.user.id;
  }
}

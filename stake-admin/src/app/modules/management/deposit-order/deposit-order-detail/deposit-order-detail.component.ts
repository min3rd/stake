import { takeUntil, Subject } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DepositOrderService } from '../deposit-order.service';
import { DepositOrderListComponent } from '../deposit-order-list/deposit-order-list.component';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { DepositOrder } from '../deposit-order.types';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-deposit-order-detail',
    templateUrl: './deposit-order-detail.component.html',
    styleUrls: ['./deposit-order-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositOrderDetailComponent implements OnInit {
    depositOrder: DepositOrder;
    amount: number = 0;
    form: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _depositOrderService: DepositOrderService,
        private _listComponent: DepositOrderListComponent,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {

    }
    ngOnInit(): void {
        this._listComponent.matDrawer.open();
        this._depositOrderService.depositOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(depositOrder => {
            this.depositOrder = depositOrder;

            this._changeDetectorRef.markForCheck();
        });
        this.form = this._formBuilder.group({
            userAddress: ['', Validators.required],
            amount: ['', Validators.required],
        });
    }

    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listComponent.matDrawer.close();
    }

    denyDepositOrder() {
        this._depositOrderService.denyDepositOrder(this.depositOrder._id).subscribe();
    }
    acceptDepositOrder() {
        if (this.form.invalid) {
            return;
        }
        this._depositOrderService.acceptDepositOrder(this.depositOrder._id, this.form.getRawValue()).subscribe();
    }
}

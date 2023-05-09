import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { WithdrawOrderListComponent } from '../withdraw-order-list/withdraw-order-list.component';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { WithdrawOrder } from '../withdraw-order.types';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { WithdrawOrderService } from '../withdraw-order.service';

@Component({
    selector: 'app-withdraw-order-detail',
    templateUrl: './withdraw-order-detail.component.html',
    styleUrls: ['./withdraw-order-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawOrderDetailComponent implements OnInit, OnDestroy {
    form: UntypedFormGroup;
    withdrawOrder: WithdrawOrder;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _listComponent: WithdrawOrderListComponent,
        private _formBuilder: UntypedFormBuilder,
        private _withdrawOrderService: WithdrawOrderService,
    ) { }
    ngOnInit(): void {
        this._listComponent.matDrawer.open();
        this._withdrawOrderService.withdrawOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(withdrawOrder => {
            this.withdrawOrder = withdrawOrder;

            this._changeDetectorRef.markForCheck();
        });

        this.form = this._formBuilder.group({
            transactionId: ['', Validators.required],
        });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listComponent.matDrawer.close();
    }
    acceptWithdrawOrder() {
        if (this.form.invalid) {
            return;
        }
        this._withdrawOrderService.acceptWithdrawOrder(this.withdrawOrder._id, this.form.getRawValue()).subscribe();
    }

    denyWithdrawOrder() {
        this._withdrawOrderService.denyWithdrawOrder(this.withdrawOrder._id).subscribe();
    }
}

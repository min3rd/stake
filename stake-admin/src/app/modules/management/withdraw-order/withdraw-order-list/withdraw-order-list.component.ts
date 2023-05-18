import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import moment from 'moment';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DepositOrder } from '../../deposit-order/deposit-order.types';
import { WithdrawOrderService } from '../withdraw-order.service';
import { WithdrawOrder } from '../withdraw-order.types';

@Component({
    selector: 'app-withdraw-order-list',
    templateUrl: './withdraw-order-list.component.html',
    styleUrls: ['./withdraw-order-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawOrderListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    withdrawOrders$: Observable<WithdrawOrder[]>
    startDate: Date = moment().add(-7, 'days').toDate();
    endDate: Date = moment().endOf('day').toDate();
    selected: DepositOrder;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _withdrawOrderService: WithdrawOrderService,
    ) { }
    ngOnInit(): void {
        this.withdrawOrders$ = this._withdrawOrderService.withdrawOrders$;

        this._withdrawOrderService.withdrawOrders$.pipe(takeUntil(this._unsubscribeAll)).subscribe(withdrawOrders => {
            this.selected = null;
            this._changeDetectorRef.markForCheck();
        });

        this._withdrawOrderService.withdrawOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(withdrawOrder => {
            this.selected = withdrawOrder;
            this._changeDetectorRef.markForCheck();
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                }
                else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    search() {
        this.startDate = moment(new Date(this.startDate).getTime()).startOf('day').toDate();
        this.endDate = moment(new Date(this.endDate).getTime()).endOf('day').toDate();
        this._withdrawOrderService.searchWithdrawOrders(this.startDate, this.endDate).subscribe();
    }

    onTimeChange(event: any) {
        let now = moment();
        switch (parseInt(event.value)) {
            case 1:
                this.startDate = now.clone().subtract(1, 'days').startOf('day').toDate();
                this.endDate = now.clone().subtract(1, 'days').endOf('day').toDate();
                break;
            case 2:
                this.startDate = now.clone().startOf('day').toDate();
                this.endDate = now.clone().endOf('day').toDate();
                break;
            case 3:
                this.startDate = now.clone().subtract(1, 'months').startOf('month').toDate();
                this.endDate = now.clone().subtract(1, 'months').endOf('month').toDate();
                break;
            case 4:
                this.startDate = now.clone().startOf('month').toDate();
                this.endDate = now.clone().endOf('month').toDate();
                break;
            default:
                return;
        }
        this.search();
    }
}


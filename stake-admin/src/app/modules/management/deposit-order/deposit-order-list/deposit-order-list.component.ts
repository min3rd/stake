import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositOrder } from '../deposit-order.types';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DepositOrderService } from '../deposit-order.service';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import moment from 'moment';

@Component({
    selector: 'app-deposit-order-list',
    templateUrl: './deposit-order-list.component.html',
    styleUrls: ['./deposit-order-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositOrderListComponent implements OnInit {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    depositOrders$: Observable<DepositOrder[]>
    startDate: Date = moment().add(-7, 'days').toDate();
    endDate: Date = moment().endOf('day').toDate();
    selected: DepositOrder;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _depositOrderService: DepositOrderService,
    ) {

    }
    ngOnInit(): void {
        this.depositOrders$ = this._depositOrderService.depositOrders$;
        this._depositOrderService.depositOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(depositOrder => {
            this.selected = depositOrder;

            this._changeDetectorRef.markForCheck();
        });

        this._depositOrderService.depositOrders$.pipe(takeUntil(this._unsubscribeAll)).subscribe(depositOrders => {
            this.selected = null;

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

    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    search() {
        let startDate = moment(new Date(this.startDate).getTime()).startOf('day').toDate();
        let endDate = moment(new Date(this.endDate).getTime()).endOf('day').toDate();
        this.startDate = startDate;
        this.endDate = endDate;
        this._depositOrderService.searchDepositOrders(startDate, endDate).subscribe();
    }
}

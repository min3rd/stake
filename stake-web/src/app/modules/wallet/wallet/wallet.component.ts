import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OrderStatus, OrderHistory } from '../wallet.types';
import { WalletService } from '../wallet.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import moment from 'moment';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent implements OnInit, OnDestroy {
    user: User;
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    orderHistories$: Observable<OrderHistory[]>;
    orderHistories: OrderHistory[];
    selectedOrder: OrderHistory;
    DepositOrderStatus = OrderStatus;
    moment = moment;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _router: Router,
        private _userService: UserService,
        private _walletService: WalletService,
    ) {

    }
    ngOnInit(): void {
        this.orderHistories$ = this._walletService.orderHistories$;
        this.orderHistories$.pipe(takeUntil(this._unsubscribeAll)).subscribe(orderHistories => this.orderHistories = orderHistories);
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
            this.user = user;
        });
        this._walletService.depositOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(depositOrder => {
            if (!depositOrder) {
                return;
            }
            this.selectedOrder = this.orderHistories.find(e => e._id == depositOrder._id && e.type == 'deposit');
            this._changeDetectorRef.markForCheck();
        });
        this._walletService.withdrawOrder$.pipe(takeUntil(this._unsubscribeAll)).subscribe(withdrawOrder => {
            if (!withdrawOrder) {
                return;
            }
            this.selectedOrder = this.orderHistories.find(e => e._id == withdrawOrder._id && e.type == 'withdraw');
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

        this.matDrawer.openedChange.subscribe(opened => {
            if (!opened) {
                this.selectedOrder = null;

                this._changeDetectorRef.markForCheck();
            }
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
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
function Inject(DOCUMENT: any): (target: typeof WalletComponent, propertyKey: undefined, parameterIndex: 3) => void {
    throw new Error('Function not implemented.');
}


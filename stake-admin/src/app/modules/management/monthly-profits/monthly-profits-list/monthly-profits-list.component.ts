import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MonthlyProfit } from '../monthlyProfits.types';
import { MonthlyProfitsService } from '../monthly-profits.service';

@Component({
    selector: 'app-monthly-profits-list',
    templateUrl: './monthly-profits-list.component.html',
    styleUrls: ['./monthly-profits-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyProfitsListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    monthlyProfits$: Observable<MonthlyProfit[]>
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _monthlyProfitsService: MonthlyProfitsService,
    ) {

    }
    ngOnInit(): void {
        this.monthlyProfits$ = this._monthlyProfitsService.monthlyProfits$;

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
    create() {
        this._monthlyProfitsService.create().subscribe(monthlyProfit => {
            this._router.navigate(['./', monthlyProfit._id]);
        });
    }
}

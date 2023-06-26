import { Subject, Observable, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PartnersService } from '../partners.service';
import { PartnerRegistration } from '../partners.types';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
    selector: 'app-partner-list',
    templateUrl: './partner-list.component.html',
    styleUrls: ['./partner-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';

    partnerRegistrations$: Observable<PartnerRegistration[]>;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _partnersService: PartnersService,
    ) {

    }
    ngOnInit(): void {
        this.partnerRegistrations$ = this._partnersService.partneRegistrations$;

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
}

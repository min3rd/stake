import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FuseAlertAppearance } from '@fuse/components/alert';
import { LandingService } from '../landing.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MonthlyProfit, News } from '../landing.types';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
    alertAppeareance: FuseAlertAppearance = 'outline';
    monthlyProfits$: Observable<MonthlyProfit[]>
    news: News[];
    isAuthenicated: boolean;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _landingService: LandingService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _authService: AuthService,
    ) {

    }
    ngOnInit(): void {
        this.monthlyProfits$ = this._landingService.monthlyProfits$;
        this.monthlyProfits$.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
        this.isAuthenicated = this._authService.authenicated;
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}

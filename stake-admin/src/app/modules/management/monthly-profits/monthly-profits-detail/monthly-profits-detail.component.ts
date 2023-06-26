import { CapitalizePipe } from './../../../../core/pipe/capitalize.pipe';
import { MonthlyProfit } from './../monthlyProfits.types';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { MonthlyProfitsListComponent } from '../monthly-profits-list/monthly-profits-list.component';
import { MonthlyProfitsService } from '../monthly-profits.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-monthly-profits-detail',
    templateUrl: './monthly-profits-detail.component.html',
    styleUrls: ['./monthly-profits-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyProfitsDetailComponent implements OnInit, OnDestroy {
    monthlyProfit: MonthlyProfit
    form: UntypedFormGroup;
    capitalizePipe: CapitalizePipe = new CapitalizePipe();
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _router: Router,
        private _listComponent: MonthlyProfitsListComponent,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _translocoService: TranslocoService,
        private _monthlyProfitsService: MonthlyProfitsService,
    ) {

    }
    ngOnInit(): void {
        this._listComponent.matDrawer.open();
        this.form = this._formBuilder.group({
            _id: [''],
            userId: [''],
            username: [''],
            name: [''],
            time: [new Date()],
            winAmount: [''],
            loseAmount: [''],
            winCount: [''],
            loseCount: [''],
            buyCount: [''],
            sellCount: [''],
        });

        this._monthlyProfitsService.monthlyProfit$.pipe(takeUntil(this._unsubscribeAll)).subscribe(monthlyProfit => {
            this.monthlyProfit = monthlyProfit;
            this.form.patchValue(monthlyProfit);
            this._changeDetectorRef.markForCheck();
        });

    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listComponent.matDrawer.close();
    }
    save() {
        if (this.form.invalid) {
            return;
        }
        this.form.disable();
        this._monthlyProfitsService.save(this.form.getRawValue()).subscribe(() => {
            this.form.enable();
        }, () => {
            this.form.enable();
        });
    }
    remove() {
        // Open the confirmation and save the reference
        const dialogRef = this._fuseConfirmationService.open({
            title: this.capitalizePipe.transform(this._translocoService.translate('are you sure')),
            message: this.capitalizePipe.transform(this._translocoService.translate('this action will remove your record')),
            actions: {
                confirm: {
                    label: this.capitalizePipe.transform(this._translocoService.translate('remove')),
                },
                cancel: {
                    label: this.capitalizePipe.transform(this._translocoService.translate('cancel')),
                }
            }
        });

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this._monthlyProfitsService.remove(this.form.getRawValue()).subscribe(() => {
                    this._router.navigate(['./management', 'monthlyProfits']);
                });
            }
        });
    }
}

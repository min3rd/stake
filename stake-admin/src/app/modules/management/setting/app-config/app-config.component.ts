import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AppConfig } from '../setting.types';
import { SettingService } from '../setting.service';

@Component({
    selector: 'app-app-config',
    templateUrl: './app-config.component.html',
    styleUrls: ['./app-config.component.scss']
})
export class AppConfigComponent implements OnInit, OnDestroy {
    appConfig: AppConfig;
    form: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _settingService: SettingService,
        private _formBuilder: UntypedFormBuilder,
    ) {

    }
    ngOnInit(): void {
        this.form = this._formBuilder.group({
            _id: ['', Validators.required],
            withdrawMinValue: [''],
            AMOUNT_SEED: [''],
            COUNT_SEED: [''],
            PRICE_RANGE_PERCENT: [''],
            TRADING_BENEFIT_PERCENT: [''],
            DEFAULT_BLOCKING_TIME: [''],
            MASTER_ADDRESS: [''],
            __v: [''],
            MINES_TOTAL_PROFIT_PERCENT: [''],
        });

        this._settingService.appConfig$.pipe(takeUntil(this._unsubscribeAll)).subscribe(appConfig => {
            this.appConfig = appConfig;

            this.form.patchValue(appConfig);

            this._changeDetectorRef.markForCheck();
        });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    save() {
        if (this.form.invalid) {
            return;
        }
        this._settingService.updateAppConfig(this.form.getRawValue()).subscribe();
    }
}

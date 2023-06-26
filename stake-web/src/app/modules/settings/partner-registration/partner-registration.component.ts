import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { PartnerRegistration } from '../settings.types';
import { Subject, takeUntil } from 'rxjs';
import { FuseAlertType } from '@fuse/components/alert';
import { constants } from 'app/common/constants';
import { TranslocoService } from '@ngneat/transloco';
import { CapitalizePipe } from 'app/core/pipe/capitalize.pipe';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-partner-registration',
    templateUrl: './partner-registration.component.html',
    styleUrls: ['./partner-registration.component.scss']
})
export class PartnerRegistrationComponent implements OnInit, OnDestroy {
    form: UntypedFormGroup;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    capitalizePipe: CapitalizePipe = new CapitalizePipe();
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _settingsService: SettingsService,
        private _translocoService: TranslocoService,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            _id: [""],
            userId: [""],
            time: [""],
            username: [''],
            name: [''],
            address: ['', [Validators.required]],
            phone: ["", [Validators.required]],
            email: ["", Validators.required],
            telegram: ["", Validators.required],
            zalo: ["", Validators.required],
            facebook: ["", Validators.required],
        });
        this._settingsService.partnerRegistration$.pipe(takeUntil(this._unsubscribeAll)).subscribe((partnerRegistration: PartnerRegistration) => {
            if (!partnerRegistration) {
                this.showAlert = false;
            }
            this.form.patchValue({
                _id: partnerRegistration._id,
                time: partnerRegistration.time,
                username: partnerRegistration.username,
                name: partnerRegistration.name,
                address: partnerRegistration.address,
                phone: partnerRegistration.phone,
                email: partnerRegistration.email,
                telegram: partnerRegistration.telegram,
                zalo: partnerRegistration.zalo,
                facebook: partnerRegistration.facebook,
                userId: partnerRegistration.userId,
            });
            this.showAlert = true;
            switch (partnerRegistration.status) {
                case constants.Status.PENDING:
                    this.alert.type = "info";
                    this.alert.message = this.capitalizePipe.transform(this._translocoService.translate('pending'));
                    break;
                case constants.Status.SUCCESS:
                    this.alert.type = "success";
                    this.alert.message = this.capitalizePipe.transform(this._translocoService.translate('success'));
                    break;
                case constants.Status.CANCELED:
                    this.alert.type = "error";
                    this.alert.message = this.capitalizePipe.transform(this._translocoService.translate('rejected'));
                    break;
            }

        });
    }
    ngOnDestroy(): void {

    }
    save() {
        if (this.form.invalid) {
            return;
        }
        // Open the confirmation and save the reference
        const dialogRef = this._fuseConfirmationService.open({
            title: this.capitalizePipe.transform(this._translocoService.translate('are you sure')),
            message: this.capitalizePipe.transform(this._translocoService.translate('this action will make you become our partners')),
            actions: {
                confirm: {
                    label: this.capitalizePipe.transform(this._translocoService.translate('ready')),
                },
                cancel: {
                    label: this.capitalizePipe.transform(this._translocoService.translate('cancel')),
                }
            }
        });

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.form.disable();
                this._settingsService.updatePartnerRegistration(this.form.getRawValue()).subscribe(() => {
                    this.form.enable();
                }, () => {
                    this.form.enable();
                });
            }
        });

    }
}

import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { SettingsService } from '../settings.service';

@Component({
    selector: 'settings-account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit, OnDestroy {
    accountForm: UntypedFormGroup;
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private _settingsService: SettingsService,
    ) {
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
            this.user = user;
            // Create the form
            this.accountForm = this._formBuilder.group({
                name: [user.name],
                username: [user.username, Validators.required],
                email: [user.email, Validators.email],
                phone: [user.phone],
                country: [user.country],
                language: [user.language],
            });
        })
    }

    updateUser() {
        if (this.accountForm.invalid) {
            return;
        }
        this.accountForm.disable();
        this._settingsService.updateUser(this.accountForm.getRawValue()).subscribe(user => {
            this._userService.user = user;
        });
        this.accountForm.enable();
    }
}

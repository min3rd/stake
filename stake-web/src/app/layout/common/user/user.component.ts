import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;
    private signInDialogRef: MatDialogRef<AuthSignInComponent>;
    private signUpDialogRef: MatDialogRef<AuthSignUpComponent>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _matDialog: MatDialog,
        private _deviceDetector: DeviceDetectorService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }

        // Update the user
        this._userService.update({
            ...this.user,
            status
        }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
    openSignInSignUpDialog() {
        if (this._deviceDetector.isMobile()) {
            this._router.navigate(['/sign-in']);
        } else {
            this.signInDialogRef = this._matDialog.open(AuthSignInComponent);
            this.signInDialogRef.afterClosed().subscribe(result => {
                if (result == 'sign up') {
                    this.signUpDialogRef = this._matDialog.open(AuthSignUpComponent);
                    this.signUpDialogRef.afterClosed().subscribe(result => {
                        if (result == 'sign in') {
                            this.openSignInSignUpDialog();
                        }
                    });
                }
            });
        }
    }
}

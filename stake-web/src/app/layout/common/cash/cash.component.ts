import { CapitalizePipe } from 'app/core/pipe/capitalize.pipe';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { SocketEvent } from 'app/core/config/socket.config';
import { SocketService } from 'app/core/socket/socket.service';
import { UserService } from 'app/core/user/user.service';
import { CashAccount, User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';
import { LiveNotificationData } from './cash.types';
import { SoundService } from 'app/core/sound/sound.service';
import { CurrencyPipe } from 'app/core/pipe/currency.pipe';
import { MatDialog } from '@angular/material/dialog';
import { LiveNotificationComponent } from './live-notification/live-notification.component';

@Component({
    selector: 'cash',
    templateUrl: './cash.component.html',
    styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
    user: User;
    currencyPipe: CurrencyPipe = new CurrencyPipe();
    capitalizePipe: CapitalizePipe = new CapitalizePipe();
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _userService: UserService,
        private _router: Router,
        private _httpClient: HttpClient,
        private _apiService: ApiService,
        private _clientSocketService: SocketService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _soundService: SoundService,
        private _dialog: MatDialog,
    ) { }
    ngOnInit(): void {
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: User) => {
            this.user = user;

            this._changeDetectorRef.markForCheck();
        });
        this._clientSocketService.userSocket.fromEvent(SocketEvent.USER).subscribe((user: User) => {
            this._userService.user = user;

            this._changeDetectorRef.markForCheck();
        });

        this._clientSocketService.userSocket.fromEvent(SocketEvent.WON).subscribe((liveNotificationData: LiveNotificationData) => {
            this.liveNotification(liveNotificationData);
            this._soundService.playWin();
        });

        this._clientSocketService.userSocket.fromEvent(SocketEvent.LOSED).subscribe((liveNotificationData: LiveNotificationData) => {
            liveNotificationData.amount = -liveNotificationData.amount;
            this.liveNotification(liveNotificationData);
            this._soundService.playLose();
        });
    }
    addCash() {
        if (this._userService.user.cashAccount != CashAccount.REAL) {
            this._httpClient.get(this._apiService.users_addDemoCash())
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((user: User) => {
                    this._userService.user = user;
                });
        } else {
            this._router.navigate(['/wallet/deposit'], {
                queryParams: {
                    redirectUrl: this._router.url,
                }
            });

        }
    }
    switchAccount(value: number) {
        this._httpClient.post(this._apiService.users_switchAccount(), { cashAccount: value })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this._userService.user = user;
            });
    }
    liveNotification(liveNotificationData: LiveNotificationData) {
        this._dialog.open(LiveNotificationComponent, {
            data: liveNotificationData,
        });
    }
    testLiveNotification() {
        this.liveNotification({ amount: -1000, isDemo: true });
    }
}

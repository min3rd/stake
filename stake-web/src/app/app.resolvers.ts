import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { UserService } from './core/user/user.service';
import { SocketService } from './core/socket/socket.service';
import { SocketEvent } from './core/config/socket.config';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _navigationService: NavigationService,
        private _notificationsService: NotificationsService,
        private _userService: UserService,
        private _socketService: SocketService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        this._userService.getLocal();
        this._socketService.userSocket.on(SocketEvent.connect, () => {
            if (this._userService.user) {
                this._socketService.userSocket.emit(SocketEvent.ROOM_JOIN, this._userService.user.id);
            }
        });
        return forkJoin([
            this._navigationService.get(),
            this._notificationsService.getAll(),
        ]);
    }
}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminSocket extends Socket {
    constructor(
        private _apiService: ApiService,
        private _authService: AuthService,
    ) {
        super({
            url: _apiService.admin_socket(),
            options: {
                transports: ['websocket'],
                auth: {
                    token: _authService.socketToken,
                }
            },
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class PublicSocket extends Socket {
    constructor(
        private _apiService: ApiService,
    ) {
        super({
            url: _apiService.public_socket(),
            options: {
                transports: ['websocket'],
            },
        });
    }
}

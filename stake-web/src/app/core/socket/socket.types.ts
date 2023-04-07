import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class BaseSocket extends Socket {
    constructor(socketIoConfig: SocketIoConfig) {
        super(socketIoConfig);
    }
}

@Injectable({
    providedIn: 'root'
})
export class ClientSocket extends BaseSocket {
    constructor(private _apiService: ApiService) {
        super({
            url: _apiService.public_socket(),
            options: {
                transports: ['websocket'],
            }
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserSocket extends BaseSocket {
    constructor(private _apiService: ApiService) {
        super({
            url: _apiService.user_socket(),
            options: {
                transports: ['websocket'],
            }
        });
    }
}

import { Injectable } from '@angular/core';
import { AdminSocket, PublicSocket } from './socket.types';
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    constructor(
        private _adminSocket: AdminSocket,
        private _publicSocket: PublicSocket,
    ) {
    }
    get adminSocket(): AdminSocket {
        return this._adminSocket;
    }
    get publicSocket(): PublicSocket {
        return this._publicSocket;
    }
}


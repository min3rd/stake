import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BaseSocket, ClientSocket, UserSocket } from './socket.types';
@Injectable({
  providedIn: 'root'
})
export class ClientSocketService {
  constructor(
    private _socket: ClientSocket,
    private _userSocket: UserSocket,
  ) {
  }
  get socket(): BaseSocket {
    return this._socket;
  }

  get userSocket(): BaseSocket {
    return this._userSocket;
  }
}


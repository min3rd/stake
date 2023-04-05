import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ClientSocket, UserSocket } from './socket.types';
@Injectable({
  providedIn: 'root'
})
export class ClientSocketService {
  constructor(
    private _socket: ClientSocket,
    private _userSocket: UserSocket,
  ) {
  }
  get socket(): Socket {
    return this._socket;
  }

  get userSocket(): Socket {
    return this._userSocket;
  }
}


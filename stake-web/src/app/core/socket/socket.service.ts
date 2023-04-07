import { Injectable } from '@angular/core';
import { BaseSocket, ClientSocket, UserSocket } from './socket.types';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
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


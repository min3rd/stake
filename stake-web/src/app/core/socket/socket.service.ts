import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ClientSocket } from './socket.types';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private _socket: ClientSocket) {
  }
  get socket(): Socket {
    return this._socket;
  }
}


import { Injectable } from '@angular/core';
import { AdminSocket } from './socket.types';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(
    private _adminSocket: AdminSocket
  ) {
  }
  get adminSocket(): AdminSocket {
    return this._adminSocket;
  }
}


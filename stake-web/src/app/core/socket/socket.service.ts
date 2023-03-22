import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private _socket: Socket) {
  }
  get socket(): Socket {
    return this._socket;
  }
}


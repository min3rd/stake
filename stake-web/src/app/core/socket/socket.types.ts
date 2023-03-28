import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ClientSocket extends Socket {
    constructor() {
        super({
            url: 'http://localhost:80/public',
            options: {
                transports: ['websocket'],
            }
        });
    }
}

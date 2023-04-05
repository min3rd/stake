import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ClientSocket extends Socket {
    constructor() {
        super({
            url: 'http://localhost/public',
            options: {
                transports: ['websocket'],
            }
        });
    }
}

@Injectable()
export class UserSocket extends Socket {
    constructor() {
        super({
            url: 'http://localhost/user',
            options: {
                transports: ['websocket'],
            }
        });
    }
}

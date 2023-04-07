import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class AdminSocket extends Socket {
    constructor(
        private _apiService: ApiService,
    ) {
        super({
            url: _apiService.admin_socket(),
            options: {
                transports: ['websocket'],
            }
        });
    }
}

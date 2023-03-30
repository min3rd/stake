import { ApiConfig } from './api.types';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    API_URL: string;
    constructor() { }
    handle(config: ApiConfig) {
        this.API_URL = config.API_URL;
    }
    private _api(endpoint: string): string {
        if (endpoint.startsWith('/')) {
            endpoint = endpoint.substring(1);
        }
        return `${this.API_URL}/api/v1/${endpoint}`;
    }
    private _publicApi(endpoint: string): string {
        if (endpoint.startsWith('/')) {
            endpoint = endpoint.substring(1);
        }
        return this._api(`/public/${endpoint}`);
    }
    public_signIn() {
        return this._publicApi('/sign-in');
    }
    public_signUp() {
        return this._publicApi('/sign-up');
    }
    public_trading_rooms() {
        return this._publicApi('/trading/rooms');
    }
    public_trading_latest_klines(symbol: string, size: number = 60) {
        return this._publicApi(`/trading/rooms/${symbol}/klines/latest?size=${size}`);
    }
    public_trading_latest_rounds(symbol: string, size: number = 60) {
        return this._publicApi(`/trading/rooms/${symbol}/rounds/latest?size=${size}`);
    }
}



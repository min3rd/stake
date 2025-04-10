import { UserService } from '../user/user.service';
import { ApiConfig } from './api.types';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    API_URL: string;
    constructor(
        private _userService: UserService,
    ) { }
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

    public_signIn_refreshToken() {
        return this._publicApi('/sign-in/refreshToken');
    }
    public_signUp() {
        return this._publicApi('/sign-up');
    }
    public_trading_rooms() {
        return this._publicApi('/trading/rooms');
    }
    public_trading_rooms_room(symbol: string) {
        return this._publicApi(`/trading/rooms/${symbol}`);
    }
    public_trading_latest_klines(symbol: string, size: number = 60) {
        return this._publicApi(`/trading/rooms/${symbol}/klines/latest?size=${size}`);
    }
    public_trading_latest_rounds(symbol: string, size: number = 60) {
        return this._publicApi(`/trading/rooms/${symbol}/rounds/latest?size=${size}`);
    }
    public_trading_config(symbol: string) {
        return this._publicApi(`/trading/rooms/${symbol}/config`);
    }

    public_notifications() {
        return this._publicApi(`/notifications`);
    }

    public_socket(): string {
        return `${this.API_URL}/public`;
    }

    public_appConfig(): string {
        return this._publicApi(`/appConfig`);
    }

    public_news(): string {
        return this._publicApi(`/news`);
    }

    public_bestTraders(time: Date = new Date()): string {
        return this._publicApi(`/bestTraders?time=${time}`);
    }

    public_partner_registrations(): string {
        return this._publicApi(`/partnerRegistrations`);
    }

    user_socket(): string {
        return `${this.API_URL}/user`;
    }

    private _usersApi(endpoint: string) {
        if (endpoint.startsWith('/')) {
            endpoint = endpoint.substring(1);
        }
        return this._api(`/users/${this._userService?.user?.id}/${endpoint}`);
    }
    users_switchAccount() {
        return this._usersApi(`/switchAccount`);
    }

    users_addDemoCash() {
        return this._usersApi(`/addDemoCash`);
    }

    users_trading_calls(startDate: Date = new Date(), endDate: Date = new Date()) {
        return this._usersApi(`/trading/calls?startDate=${startDate}&endDate=${endDate}`);
    }

    users_trading_latestCalls() {
        return this._usersApi(`/trading/latestCalls`);
    }

    users_trading_calls_today() {
        return this._usersApi(`/trading/today`);
    }

    users_notifications() {
        return this._usersApi(`/notifications`);
    }

    users_notifications_mark_as_read() {
        return this._usersApi(`/notifications/markAllAsRead`);
    }

    users_notifications_remove() {
        return this._usersApi(`/notifications/remove`);
    }

    users_user() {
        return this._usersApi(`/user`);
    }
    users_user_change_password() {
        return this._usersApi(`/user/changePassword`);
    }

    users_mines_rounds(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }) {
        return this._usersApi(`/mines/rounds?offset=${offset}&size=${size}&sort=${JSON.stringify(sort)}`);
    }

    users_mines_rounds_round(id: string) {
        return this._usersApi(`/mines/rounds/${id}`);
    }

    users_mines_rounds_round_random_choose(id: string) {
        return this._usersApi(`/mines/rounds/${id}/randomChoose`);
    }

    users_mines_rounds_round_choose(id: string) {
        return this._usersApi(`/mines/rounds/${id}/choose`);
    }

    users_mines_rounds_round_cashout(id: string) {
        return this._usersApi(`/mines/rounds/${id}/cashout`);
    }

    users_wallet_depositOrders(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }) {
        return this._usersApi(`/wallet/depositOrders?offset=${offset}&size=${size}&sort=${JSON.stringify(sort)}`);
    }

    users_wallet_depositOrders_depositOrder(id: string) {
        return this._usersApi(`/wallet/depositOrders/${id}`);
    }

    users_wallets() {
        return this._usersApi(`/wallets`);
    }

    users_wallets_wallet(address: string) {
        return this._usersApi(`/wallets/${address}`);
    }

    users_wallet_checkTransaction() {
        return this._usersApi(`/wallet/checkTransaction`);
    }

    users_wallet_withdrawOrders(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }) {
        return this._usersApi(`/wallet/withdrawOrders?offset=${offset}&size=${size}&sort=${JSON.stringify(sort)}`);
    }

    users_wallet_withdrawOrders_withdrawOrder(id: string) {
        return this._usersApi(`/wallet/withdrawOrders/${id}`);
    }

    users_wallet_cashTransfers(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }) {
        return this._usersApi(`/wallet/cashTransfers?offset=${offset}&size=${size}&sort=${JSON.stringify(sort)}`);
    }

    users_wallet_cashTransfers_cashTransfer(id: string) {
        return this._usersApi(`/wallet/cashTransfers/${id}`);
    }

    users_dashboard_tradeStats() {
        return this._usersApi(`/dashboard/tradeStats`);
    }

    users_partner_registration(): string {
        return this._usersApi(`/partnerRegistration`);
    }

}



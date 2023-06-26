import { UserService } from '../user/user.service';
import { ApiConfig } from './api.types';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    API_URL: string;
    constructor(private _userService: UserService) { }
    handle(config: ApiConfig) {
        this.API_URL = config.API_URL;
    }
    admin_socket(): string {
        return `${this.API_URL}/admin`;
    }
    public_socket(): string {
        return `${this.API_URL}/public`;
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
    public_trading_config(symbol: string) {
        return this._publicApi(`/trading/rooms/${symbol}/config`);
    }

    public_notifications() {
        return this._publicApi(`/notifications`);
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

    users_trading_call() {
        return this._usersApi(`/trading/call`);
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

    private _adminApi(endpoint: string) {
        if (endpoint.startsWith('/')) {
            endpoint = endpoint.substring(1);
        }
        return this._api(`/admin/${endpoint}`);
    }

    admin_signIn() {
        return this._adminApi('/sign-in')
    }

    admin_signInByToken() {
        return this._adminApi('/sign-in/refreshToken');
    }

    admin_trading_rooms() {
        return this._adminApi('/trading/rooms');
    }

    admin_trading_rooms_room(id: string) {
        return this._adminApi(`/trading/rooms/${id}`);
    }

    admin_trading_rounds() {
        return this._adminApi('/trading/rounds');
    }

    admin_users(query: string = '', offset: number = 0, size: number = 10) {
        return this._adminApi(`/users?query=${query}&offset=${offset}&size=${size}`);
    }

    admin_users_user(id: string): string {
        return this._adminApi(`/users/${id}`);
    }

    admin_depositOrders(startDate: Date = new Date(), endDate: Date = new Date(), offset: number = 0, size: number = 10) {
        return this._adminApi(`/depositOrders?startDate=${startDate}&endDate=${endDate}&offset=${offset}&size=${size}`);
    }

    admin_depositOrders_depositOrder(depositOrderId: string): string {
        return this._adminApi(`/depositOrders/${depositOrderId}`);
    }

    admin_depositOrders_depositOrder_acceptDepositOrder(depositOrderId: string): string {
        return this._adminApi(`/depositOrders/${depositOrderId}/acceptDepositOrder`);
    }

    admin_depositOrders_depositOrder_denyDepositOrder(depositOrderId: string): string {
        return this._adminApi(`/depositOrders/${depositOrderId}/denyDepositOrder`);
    }


    admin_withdrawOrders(startDate: Date = new Date(), endDate: Date = new Date(), offset: number = 0, size: number = 10) {
        return this._adminApi(`/withdrawOrders?startDate=${startDate}&endDate=${endDate}&offset=${offset}&size=${size}`);
    }

    admin_withdrawOrders_withdrawOrder(withdrawOrderId: string): string {
        return this._adminApi(`/withdrawOrders/${withdrawOrderId}`);
    }

    admin_withdrawOrders_withdrawOrder_acceptWithdrawOrder(withdrawOrderId: string): string {
        return this._adminApi(`/withdrawOrders/${withdrawOrderId}/acceptWithdrawOrder`);
    }

    admin_withdrawOrders_withdrawOrder_denyWithdrawOrder(withdrawOrderId: string): string {
        return this._adminApi(`/withdrawOrders/${withdrawOrderId}/denyWithdrawOrder`);
    }

    admin_appConfig(): string {
        return this._adminApi(`/appConfig`);
    }

    admin_news(): string {
        return this._adminApi(`/news`);
    }

    admin_news_new(id: string): string {
        return this._adminApi(`/news/${id}`);
    }

    admin_partner_registrations(): string {
        return this._adminApi(`/partnerRegistrations`);
    }

    admin_partner_registrations_partner_registration(id: string): string {
        return this._adminApi(`/partnerRegistrations/${id}`);
    }

    admin_monthly_profits(): string {
        return this._adminApi(`/monthlyProfits`);
    }

    admin_monthly_profits_monthly_profit(id: string): string {
        return this._adminApi(`/monthlyProfits/${id}`);
    }
}



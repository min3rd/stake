import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { ApiService } from '../api/api.service';
import { SignIn } from './auth.types';
import { constants } from 'app/common/constants';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _apiService: ApiService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
    }

    get accessToken(): string {
        return localStorage.getItem(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN) ?? '';
    }

    set refreshToken(token: string) {
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, token);
    }

    get refreshToken(): string {
        return localStorage.getItem(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN) ?? '';
    }

    get authenicated(): boolean {
        return this._authenticated;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this._apiService.public_signIn(), credentials).pipe(
            switchMap((response: SignIn) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;
                this.refreshToken = response.refreshToken;
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.post(this._apiService.public_signIn_refreshToken(), {
            refreshToken: this.refreshToken
        }).pipe(
            catchError(() => {
                this.signOut();
                location.reload();
                // Return false
                return of(false)
            }
            ),
            switchMap((response: SignIn) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                if (response.refreshToken) {
                    this.refreshToken = response.refreshToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.USER);

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; username: string; password: string; }): Observable<any> {
        return this._httpClient.post(this._apiService.public_signUp(), user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        // if (AuthUtils.isTokenExpired(this.accessToken)) {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}

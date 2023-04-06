import { notifications } from './../../../mock-api/common/notifications/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<Notification[]> {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all notifications
     */
    getAll(): Observable<Notification[]> {
        return this._httpClient.get<Notification[]>(this._apiService.public_notifications()).pipe(
            tap((notifications) => {
                this._notifications.next(notifications);
            })
        );
    }

    add(notification: Notification) {
        return this.notifications$.pipe(take(1)).subscribe(notifications => {
            while (notifications.findIndex(e => e._id == notification._id) >= 0) {
                notifications.slice(notifications.findIndex(e => e._id == notification._id), 1);
            }
            this._notifications.next([...notifications, notification])
        });
    }

    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    update(id: string, notification: Notification): Observable<Notification> {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.patch<Notification>(this._apiService.users_notifications(), notification).pipe(
                map((updatedNotification: Notification) => {

                    // Find the index of the updated notification
                    const index = notifications.findIndex(item => item._id === id);

                    // Update the notification
                    notifications[index] = updatedNotification;

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated notification
                    return updatedNotification;
                })
            ))
        );
    }

    /**
     * Delete the notification
     *
     * @param id
     */
    delete(id: string): Observable<boolean> {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.post<boolean>(this._apiService.users_notifications_remove(), { id: id }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted notification
                    const index = notifications.findIndex(item => item._id === id);

                    // Delete the notification
                    notifications.splice(index, 1);

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): Observable<Notification[]> {
        return this._httpClient.get<Notification[]>(this._apiService.users_notifications_mark_as_read()).pipe(
            map((notifications: Notification[]) => {
                // Update the notifications
                this._notifications.next(notifications);

                // Return the updated status
                return notifications;
            })
        );
    }
}

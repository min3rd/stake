import { Observable, BehaviorSubject, take, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { User } from 'app/core/user/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: BehaviorSubject<User[] | null> = new BehaviorSubject([]);
  private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }
  get users$(): Observable<User[]> {
    return this._users.asObservable();
  }
  get user$(): Observable<User> {
    return this._user.asObservable();
  }
  searchUsers(query: string = '', offset: number = 0, size: number = 10): Observable<User[]> {
    return this._users.pipe(
      take(1),
      switchMap(users => {
        return this._httpClient.get<User[]>(this._apiService.admin_users(query, offset, size)).pipe(
          tap(newUsers => {
            this._users.next(newUsers);
          })
        );
      })
    );
  }

  getUserById(userId: string): Observable<User> {
    return this._users.pipe(
      take(1),
      switchMap(users => {
        return this._httpClient.get<User>(this._apiService.admin_users_user(userId)).pipe(
          tap(user => {
            let index = users.findIndex(e => e.id == user.id);
            if (index >= 0) {
              users[index] = user;
            } else {
              users.push(user)
            }
            this._users.next(users);
            this._user.next(user);
          })
        );
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this._users.pipe(
      take(1),
      switchMap(users => {
        return this._httpClient.patch<User>(this._apiService.admin_users_user(user.id), user).pipe(
          tap(user => {
            let index = users.findIndex(e => e.id == user.id);
            if (index >= 0) {
              users[index] = user;
            } else {
              users.push(user)
            }
            this._users.next(users);
            this._user.next(user);
          })
        );
      })
    );
  }
}

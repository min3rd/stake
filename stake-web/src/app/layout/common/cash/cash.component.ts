import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { UserService } from 'app/core/user/user.service';
import { CashAccount, User } from 'app/core/user/user.types';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }
  ngOnInit(): void {
    this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
      this.user = user;
    });
  }
  addCash() {
    if (this._userService.user.cashAccount != CashAccount.REAL) {
      this._httpClient.get(this._apiService.users_addDemoCash())
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: User) => {
          this._userService.user = user;
        });
    } else {
      this._router.navigate(['/deposit'], {
        queryParams: {
          redirectUrl: this._router.url,
        }
      });

    }
  }
  switchAccount(value: number) {
    this._httpClient.post(this._apiService.users_switchAccount(), { cashAccount: value })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this._userService.user = user;
      });
  }
}

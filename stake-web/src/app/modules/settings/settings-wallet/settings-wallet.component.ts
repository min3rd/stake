import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings-wallet',
  templateUrl: './settings-wallet.component.html',
  styleUrls: ['./settings-wallet.component.scss']
})
export class SettingsWalletComponent implements OnInit {
  newWalletAddress: string = '';
  apiCalling: boolean = false;
  user: User;

  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _settingsService: SettingsService,
    private _userService: UserService,
  ) {

  }
  ngOnInit(): void {
    this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
      this.user = user;
    });
  }
  addWalletAddress() {
    this._settingsService.addWalletAddress(this.newWalletAddress).subscribe(user => {
      this.newWalletAddress = '';
    });
  }
  removeWalletAddress(address: string) {
    this.apiCalling = true;
    this._settingsService.removeWalletAddress(address).subscribe();
  }
}

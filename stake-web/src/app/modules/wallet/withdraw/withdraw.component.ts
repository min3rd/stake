import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletComponent } from '../wallet/wallet.component';
import { MatDrawerToggleResult } from '@angular/material/sidenav';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _walletComponent: WalletComponent,
  ) {

  }
  ngOnInit(): void {
    this._walletComponent.matDrawer.open();
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._walletComponent.matDrawer.close();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}

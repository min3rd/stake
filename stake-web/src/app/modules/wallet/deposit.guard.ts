import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DepositComponent } from './deposit/deposit.component';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class DepositGuard implements CanDeactivate<DepositComponent> {
  constructor(
    private _walletService: WalletService
  ) {

  }
  canDeactivate(
    component: DepositComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this._walletService._depositOrder.next(null);
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
      nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/contacts'
    // it means we are navigating away from the
    // contacts app
    if (!nextState.url.includes('/wallet')) {
      // Let it navigate
      return true;
    }

    // If we are navigating to another contact...
    if (nextRoute.paramMap.get('id')) {
      // Just navigate
      return true;
    }
    // Otherwise...
    else {
      // Close the drawer first, and then navigate
      return component.closeDrawer().then(() => true);
    }
  }

}

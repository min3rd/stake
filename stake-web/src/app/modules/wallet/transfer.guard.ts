import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WalletService } from './wallet.service';
import { TransferComponent } from './transfer/transfer.component';

@Injectable({
    providedIn: 'root'
})
export class TransferGuard implements CanDeactivate<TransferComponent>, CanActivate {
    constructor(
        private _walletService: WalletService
    ) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this._walletService._cashTransfer.next(null);
        return of(true);
    }
    canDeactivate(
        component: TransferComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DepositOrderDetailComponent } from './deposit-order-detail/deposit-order-detail.component';

@Injectable({
    providedIn: 'root'
})
export class DepositOrderGuard implements CanDeactivate<DepositOrderDetailComponent> {
    canDeactivate(
        component: DepositOrderDetailComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while (nextRoute.firstChild) {
            nextRoute = nextRoute.firstChild;
        }
        if (!nextState.url.includes('/management/depositOrders')) {
            return true;
        }
        if (nextRoute.paramMap.get('depositOrderId')) {
            return true;
        }
        else {
            return component.closeDrawer().then(() => true);
        }
    }

}

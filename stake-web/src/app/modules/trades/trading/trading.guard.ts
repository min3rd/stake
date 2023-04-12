import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TradingComponent } from './trading.component';

@Injectable({
  providedIn: 'root'
})
export class TradingGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: TradingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    component.deactive();
    return true;
  }

}

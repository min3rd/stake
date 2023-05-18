import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsDetailComponent } from './news-detail/news-detail.component';

@Injectable({
    providedIn: 'root'
})
export class NewsGuard implements CanDeactivate<NewsDetailComponent> {
    canDeactivate(
        component: NewsDetailComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while (nextRoute.firstChild) {
            nextRoute = nextRoute.firstChild;
        }
        if (!nextState.url.includes('/news')) {
            return true;
        }
        if (nextRoute.paramMap.get('id')) {
            return true;
        }
        else {
            return component.closeDrawer().then(() => true);
        }
    }

}

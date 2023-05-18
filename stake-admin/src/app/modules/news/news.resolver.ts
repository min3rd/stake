import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { News } from './news.types';
import { NewsService } from './news.service';

@Injectable({
    providedIn: 'root'
})
export class AllNewsResolver implements Resolve<News[]> {
    constructor(
        private _newsService: NewsService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News[]> {
        return this._newsService.getAllNews();
    }
}


@Injectable({
    providedIn: 'root'
})
export class NewsResolver implements Resolve<News> {
    constructor(
        private _newsService: NewsService,
    ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News> {
        return this._newsService.getNewsById(route.paramMap.get('id'));
    }
}

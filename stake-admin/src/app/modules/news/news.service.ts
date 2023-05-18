import { BehaviorSubject, Observable, tap, take, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { News } from './news.types';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private _allNews: BehaviorSubject<News[]> = new BehaviorSubject(null);
    private _news: BehaviorSubject<News> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService,
    ) { }

    get allNews$(): Observable<News[]> {
        return this._allNews.asObservable();
    }

    get news$(): Observable<News> {
        return this._news.asObservable();
    }

    getAllNews(): Observable<News[]> {
        return this._httpClient.get<News[]>(this._apiService.admin_news()).pipe(tap(allNews => {
            this._allNews.next(allNews);
        }));
    }

    getNewsById(id: string): Observable<News> {
        return this._allNews.pipe(
            take(1),
            switchMap(allNews => {
                return this._httpClient.get<News>(this._apiService.admin_news_new(id)).pipe(tap(news => {
                    let index = allNews.findIndex(e => e._id == news._id);
                    if (index >= 0) {
                        allNews[index] = news;
                    } else {
                        allNews.push(news);
                    }
                    this._allNews.next(allNews);
                    this._news.next(news);
                }));
            })
        );
    }

    updateNewsById(news: News): Observable<News> {
        return this._allNews.pipe(
            take(1),
            switchMap(allNews => {
                return this._httpClient.post<News>(this._apiService.admin_news_new(news._id), news).pipe(tap(news => {
                    let index = allNews.findIndex(e => e._id == news._id);
                    if (index >= 0) {
                        allNews[index] = news;
                    } else {
                        allNews.push(news);
                    }
                    this._allNews.next(allNews);
                    this._news.next(news);
                }));
            })
        );
    }

    // delete news by id
    deleteNewsById(id: string): Observable<any> {
        return this._allNews.pipe(
            take(1),
            switchMap(allNews => {
                return this._httpClient.delete(this._apiService.admin_news_new(id)).pipe(tap(() => {
                    let index = allNews.findIndex(e => e._id == id);
                    if (index >= 0) {
                        allNews.splice(index, 1);
                    }
                    this._allNews.next(allNews);
                    this._news.next(null);
                }));
            }));
    }
    // create news
    createNews(): Observable<News> {
        return this._allNews.pipe(
            take(1),
            switchMap(allNews => {
                return this._httpClient.post<News>(this._apiService.admin_news(), {}).pipe(tap(news => {
                    allNews.push(news);
                    this._allNews.next(allNews);
                    this._news.next(news);
                }));
            })
        );
    }
}

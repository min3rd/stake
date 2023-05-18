import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil, Observable } from 'rxjs';
import { News } from '../news.types';
import { NewsService } from '../news.service';
import moment from 'moment';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    allNews$: Observable<News[]>;
    startDate: Date;
    endDate: Date;
    selected: News;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _newsService: NewsService,
    ) {

    }
    ngOnInit(): void {
        this.allNews$ = this._newsService.allNews$;

        this._newsService.allNews$.pipe(takeUntil(this._unsubscribeAll)).subscribe(allNews => {

            this._changeDetectorRef.markForCheck();
        });

        this._newsService.news$.pipe(takeUntil(this._unsubscribeAll)).subscribe(news => {
            this.selected = news;
            this._changeDetectorRef.markForCheck();
        });
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                }
                else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    search() { }
    onTimeChange(event: any) {
        let now = moment();
        switch (parseInt(event.value)) {
            case 1:
                this.startDate = now.clone().subtract(1, 'days').startOf('day').toDate();
                this.endDate = now.clone().subtract(1, 'days').endOf('day').toDate();
                break;
            case 2:
                this.startDate = now.clone().startOf('day').toDate();
                this.endDate = now.clone().endOf('day').toDate();
                break;
            case 3:
                this.startDate = now.clone().subtract(1, 'months').startOf('month').toDate();
                this.endDate = now.clone().subtract(1, 'months').endOf('month').toDate();
                break;
            case 4:
                this.startDate = now.clone().startOf('month').toDate();
                this.endDate = now.clone().endOf('month').toDate();
                break;
            default:
                return;
        }
        this.search();
    }

    add() {
        this._newsService.createNews().subscribe((news) => {
            this._router.navigate(['/news', news._id]);
        })
    }
}

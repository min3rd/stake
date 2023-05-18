import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { NewsListComponent } from '../news-list/news-list.component';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NewsService } from '../news.service';
import { News } from '../news.types';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, OnDestroy {
    form: UntypedFormGroup;
    news: News;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _listComponent: NewsListComponent,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _formBuilder: UntypedFormBuilder,
        private _newsService: NewsService,
    ) {

    }
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listComponent.matDrawer.close();
    }

    ngOnInit(): void {
        this._listComponent.matDrawer.open();

        this.form = this._formBuilder.group({
            _id: ['', Validators.required],
            __v: [''],
            time: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
            data: [''],
            start: ['', Validators.required],
            end: ['', Validators.required],
        });

        this._newsService.news$.pipe(takeUntil(this._unsubscribeAll)).subscribe(news => {
            this.news = news;
            this.form.patchValue(news);

            this._changeDetectorRef.markForCheck();
        })
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    save() {
        if (this.form.invalid) {
            return;
        }
        this._newsService.updateNewsById(this.form.getRawValue()).subscribe();
    }

    delete() {
        this._newsService.deleteNewsById(this.news._id).subscribe(() => {
            this._router.navigate(['/news'])
        })
    }
}

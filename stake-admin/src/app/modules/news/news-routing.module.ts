import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { AllNewsResolver, NewsResolver } from './news.resolver';
import { NewsGuard } from './news.guard';

const routes: Routes = [
    {
        path: '',
        component: NewsListComponent,
        resolve: {
            AllNewsResolver: AllNewsResolver,
        },
        children: [
            {
                path: ':id',
                component: NewsDetailComponent,
                resolve: {
                    NewsResolver: NewsResolver,
                },
                canDeactivate: [NewsGuard],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }

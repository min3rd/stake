import { ApiConfig } from './core/api/api.types';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { SocketIoModule } from 'ngx-socket-io';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/api/api.service';
import { Observable, tap } from 'rxjs';
import { HotToastModule } from '@ngneat/hot-toast';
import { DateAdapter } from '@angular/material/core';
import { LandingModule } from './modules/landing/landing.module';
const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

function initializeAppFactory(httpClient: HttpClient, apiService: ApiService): () => Observable<any> {
    return () => httpClient.get("/assets/json/config.json?v=" + new Date().getTime())
        .pipe(
            tap((res: ApiConfig) => {
                apiService.handle(res);
            })
        );
}
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        HotToastModule.forRoot(),
        SocketIoModule,

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        HttpClientModule,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [HttpClient, ApiService, DateAdapter],
            multi: true
        },
    ]
})
export class AppModule {
}

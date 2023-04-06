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
import { ClientSocket, UserSocket } from './core/socket/socket.types';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/api/api.service';
import { Observable, tap } from 'rxjs';
import { UserService } from './core/user/user.service';
import { LandingComponent } from './modules/games/landing/landing.component';
import { GamesModule } from './modules/games/games.module';

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
        LandingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
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
        GamesModule,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ClientSocket,
        UserSocket,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [HttpClient, ApiService],
            multi: true
        }
    ]
})
export class AppModule {
}

import { Translation, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from 'app/core/transloco/transloco.http-loader';
import { constants } from 'app/common/constants';

@NgModule({
    exports: [
        TranslocoModule
    ],
    providers: [
        {
            // Provide the default Transloco configuration
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: [
                    {
                        id: 'de',
                        label: 'Deutsch'
                    },
                    {
                        id: 'en',
                        label: 'English'
                    },
                    {
                        id: 'es',
                        label: 'Español'
                    },
                    {
                        id: 'fr',
                        label: 'Français'
                    },
                    {
                        id: 'hi',
                        label: 'हिन्दी'
                    },
                    {
                        id: 'id',
                        label: 'Indonesian'
                    },
                    {
                        id: 'ja',
                        label: '日本語'
                    },
                    {
                        id: 'ko',
                        label: '한국어'
                    },
                    {
                        id: 'pl',
                        label: 'Polski'
                    },
                    {
                        id: 'pt',
                        label: 'Português'
                    },
                    {
                        id: 'ru',
                        label: "Pусский"
                    },
                    {
                        id: 'th',
                        label: 'ประเทศไทย'
                    },
                    {
                        id: 'tr',
                        label: 'Türkçe'
                    },
                    {
                        id: 'vi',
                        label: 'Tiếng Việt'
                    },
                    {
                        id: 'zh',
                        label: '中文'
                    },
                    {
                        id: 'fi',
                        label: 'Suomen'
                    },
                ],
                defaultLang: localStorage.getItem(constants.LOCAL_STORAGE_KEYS.LANGUAGE) ?? 'en',
                fallbackLang: localStorage.getItem(constants.LOCAL_STORAGE_KEYS.LANGUAGE) ?? 'en',
                reRenderOnLangChange: true,
                prodMode: true
            })
        },
        {
            // Provide the default Transloco loader
            provide: TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader
        },
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            deps: [TranslocoService],
            useFactory: (translocoService: TranslocoService): any => (): Promise<Translation> => {
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);
                return translocoService.load(defaultLang).toPromise();
            },
            multi: true
        }
    ]
})
export class TranslocoCoreModule {
}

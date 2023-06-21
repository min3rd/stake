import { CapitalizePipe } from './../../../core/pipe/capitalize.pipe';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { DateAdapter } from '@angular/material/core';
import { take } from 'rxjs';
import { constants } from 'app/common/constants';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService,
        private _dateAdapter: DateAdapter<Date>,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {

            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);

            this._changeDetectorRef.markForCheck();
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'de': 'de',
            'en': 'en',
            'es': 'es',
            'fr': 'fr',
            'hi': 'hi',
            'id': 'id',
            'ja': 'ja',
            'ko': 'ko',
            'pl': 'pl',
            'pt': 'pt',
            'ru': 'ru',
            'th': 'th',
            'tr': 'tr',
            'vi': 'vi',
            'zh': 'zh',
            'fi': 'fi',
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
        this._dateAdapter.setLocale(lang);
        this._updateNavigation(lang);
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.LANGUAGE, lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;


        const tradeItem = this._fuseNavigationService.getItem('trades', navigation);
        if (tradeItem) {
            this._translocoService.selectTranslate('trade').pipe(take(1)).subscribe(translation => {
                let capitalizePipe = new CapitalizePipe();
                tradeItem.title = capitalizePipe.transform(translation);
                navComponent.refresh();
            });
        }


        const gameItem = this._fuseNavigationService.getItem('games', navigation);
        if (gameItem) {
            this._translocoService.selectTranslate('games').pipe(take(1)).subscribe(translation => {
                let capitalizePipe = new CapitalizePipe();
                gameItem.title = capitalizePipe.transform(translation);
                navComponent.refresh();
            });
        }


        const walletItem = this._fuseNavigationService.getItem('wallet', navigation);
        if (walletItem) {
            this._translocoService.selectTranslate('wallet').pipe(take(1)).subscribe(translation => {
                let capitalizePipe = new CapitalizePipe();
                walletItem.title = capitalizePipe.transform(translation);
                navComponent.refresh();
            });
        }


        const dashboardItem = this._fuseNavigationService.getItem('dashboard', navigation);
        if (dashboardItem) {
            this._translocoService.selectTranslate('dashboard').pipe(take(1)).subscribe(translation => {
                let capitalizePipe = new CapitalizePipe();
                dashboardItem.title = capitalizePipe.transform(translation);
                navComponent.refresh();
            });
        }

        const partnersItem = this._fuseNavigationService.getItem('partners', navigation);
        if (partnersItem) {
            this._translocoService.selectTranslate('partners').pipe(take(1)).subscribe(translation => {
                let capitalizePipe = new CapitalizePipe();
                partnersItem.title = capitalizePipe.transform(translation);
                navComponent.refresh();
            });
        }
    }
}

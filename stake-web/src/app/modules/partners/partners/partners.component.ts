import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartnersService } from '../partners.service';
import { PartnerRegistration } from 'app/modules/settings/settings.types';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit, OnDestroy {
    partnerRegistrations: PartnerRegistration[];
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _partnersService: PartnersService,
    ) {
    }
    ngOnInit(): void {
        this._partnersService.partnerRegistrations$.pipe(takeUntil(this._unsubscribeAll)).subscribe(partnerRegistrations => {
            this.partnerRegistrations = partnerRegistrations
        });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    zalo(value: string) {
        if (value.startsWith("http")) {
            return window.open(value, '_blank');
        }
        window.open(`https://zalo.me/${value}`, '_blank');
    }
    telegram(value: string) {
        if (value.startsWith("http")) {
            return window.open(value, '_blank');
        }
        window.open(`https://telegram.me/${value}`, '_blank');
    }
    facebook(value: string) {
        if (value.startsWith("http")) {
            return window.open(value, '_blank');
        }
        window.open(`https://fb.com/${value}`, '_blank');
    }
}

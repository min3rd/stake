import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PartnerListComponent } from '../partner-list/partner-list.component';
import { PartnersService } from '../partners.service';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { PartnerRegistration } from '../partners.types';
import { constants } from 'app/common/constants';

@Component({
    selector: 'app-partners-detail',
    templateUrl: './partners-detail.component.html',
    styleUrls: ['./partners-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersDetailComponent implements OnInit, OnDestroy {
    partnerRegistration: PartnerRegistration;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _listComponent: PartnerListComponent,
        private _changeDetectorRef: ChangeDetectorRef,
        private _partnersService: PartnersService,
    ) {

    }
    ngOnInit(): void {
        this._listComponent.matDrawer.open();

        this._partnersService.partneRegistration$.pipe(takeUntil(this._unsubscribeAll)).subscribe(partnerRegistration => {
            this.partnerRegistration = partnerRegistration;

            this._changeDetectorRef.markForCheck();
        });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listComponent.matDrawer.close();
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
    accept() {
        this.partnerRegistration.status = constants.Status.SUCCESS;
        this._partnersService.save(this.partnerRegistration).subscribe();
    }
    deny() {
        this.partnerRegistration.status = constants.Status.CANCELED;
        this._partnersService.save(this.partnerRegistration).subscribe();
    }
}

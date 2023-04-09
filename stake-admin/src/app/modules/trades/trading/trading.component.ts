import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { SocketService } from 'app/core/socket/socket.service';
import { TradingRoom } from './trading.types';
import { TradingService } from './trading.service';
@Component({
    selector: 'app-trading',
    templateUrl: './trading.component.html',
    styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    rooms$: Observable<TradingRoom[]>;
    drawerMode: 'slide' | 'over';
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _socketService: SocketService,
        private _tradingService: TradingService,
    ) { }
    ngOnInit(): void {
        this.rooms$ = this._tradingService.rooms$;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }
}

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, takeUntil } from 'rxjs';
import { SocketService } from 'app/core/socket/socket.service';
import { TradingCallType, TradingRoom, TradingRound } from './trading.types';
import { TradingService } from './trading.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SocketEvent, SocketRoom } from 'app/core/config/socket.config';
@Component({
    selector: 'app-trading',
    templateUrl: './trading.component.html',
    styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    tradingRooms$: Observable<TradingRoom[]>;
    tradingRooms: TradingRoom[];
    editMode: boolean[];
    tradingRoomForms: UntypedFormGroup[];
    tradingRounds$: Observable<TradingRound[]>;
    tradingRounds: TradingRound[] = [];
    TradingCallType = TradingCallType;
    calling: boolean = false;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _socketService: SocketService,
        private _tradingService: TradingService,
    ) { }
    ngOnInit(): void {
        this.tradingRooms$ = this._tradingService.rooms$;
        this.tradingRounds$ = this._tradingService.rounds$;
        this._tradingService.rooms$.pipe(takeUntil(this._unsubscribeAll)).subscribe(tradingRooms => {
            this.editMode = [];
            this.tradingRoomForms = [];
            this.tradingRooms = tradingRooms;
            tradingRooms.forEach(tradingRoom => {
                this.editMode.push(false);
                this.tradingRoomForms.push(
                    this._formBuilder.group({
                        priceRangePercent: [tradingRoom.priceRangePercent],
                        benefitPercent: [tradingRoom.benefitPercent],
                        sliderMin: [tradingRoom.sliderMin],
                        sliderMax: [tradingRoom.sliderMax],
                        sliderStep: [tradingRoom.sliderStep],
                        blockingTime: [tradingRoom.blockingTime],
                        _id: [tradingRoom._id],
                        symbol: [tradingRoom.symbol],
                        __v: [tradingRoom.__v],
                    })
                );
            });
            this._changeDetectorRef.markForCheck();
        });
        this._socketService.adminSocket.emit(SocketEvent.ROOM_JOIN, SocketRoom.ADMIN_TRADING);
        this._socketService.adminSocket.on(SocketEvent.connect, () => {
            this._socketService.adminSocket.emit(SocketEvent.ROOM_JOIN, SocketRoom.ADMIN_TRADING);
        });
        this._socketService.adminSocket.on(SocketEvent.disconnect, () => {
            this._socketService.adminSocket.emit(SocketEvent.ROOM_JOIN, SocketRoom.ADMIN_TRADING);
        });

        this._tradingService.rounds$.pipe(takeUntil(this._unsubscribeAll)).subscribe(tradingRounds => {
            this.tradingRounds = tradingRounds;

            this._changeDetectorRef.markForCheck();
        });

        this._socketService.adminSocket.fromEvent(SocketEvent.ADMIN_TRADING_ROUND).subscribe((tradingRound: TradingRound) => {
            if (!this.tradingRounds) {
                return;
            }
            let index = this.tradingRounds.findIndex(e => e.symbol === tradingRound.symbol);
            if (index >= 0) {
                this.tradingRounds[index] = tradingRound;
            } else {
                this.tradingRounds.push(tradingRound);
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }
    toggleEditMode(index: number, value: boolean) {
        this.editMode[index] = value;
    }
    getLatestRound(tradingRoom: TradingRoom) {
        return this.tradingRounds.length ? this.tradingRounds.find(e => e.symbol === tradingRoom.symbol) : null;
    }
    result(tradingRound: TradingRound): boolean {
        return (tradingRound.closePrice - tradingRound.openPrice > 0) ? true : false;
    }
    switchResult(index: number, type: TradingCallType) {
        this._tradingService.switchResult(this.tradingRounds[index], type).subscribe();
    }

    updateRoom(index: number) {
        this._tradingService.updateTradingRoom(this.tradingRoomForms[index].getRawValue()).subscribe(tradingRoom => {
            this.editMode[index] = false;
        });
    }
    deleteRoom(index: number) {
        this._tradingService.deleteTradingRoom(this.tradingRooms[index]).subscribe();
    }

    getCountdown(tradingRoom: TradingRoom) {
        let tradingRound = this.getLatestRound(tradingRoom);
        if (!tradingRound) {
            return 0;
        }
        return (new Date(tradingRound.closeTime).getTime() - new Date().getTime()) / 1000;
    }
}

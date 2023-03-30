import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, pairwise } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ClientSocketService } from 'app/core/socket/socket.service';
import { SocketEvent } from 'app/core/config/socket.config';
import { chartOptions } from 'app/core/config/trading.config';
import { TradingService } from './trading.service';
import { TradingRoom, Kline } from './trading.types';
import moment from 'moment';
@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy {
  @ViewChild('btcChartComponent') btcChartComponent: ChartComponent;
  appConfig: any;
  btcOptions: ApexOptions = {};
  currentTime: any;
  countdown: any;
  amount: number = 0;
  canTrade: boolean = false;
  traded: boolean = false;
  trend: any = {
    dir: 'up',
    amount: 0
  };
  tradingRoom: TradingRoom;
  tradingRoom$: Subject<TradingRoom> = new Subject<TradingRoom>();
  tradingRooms: TradingRoom[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private klines: any[] = [];
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _socketService: ClientSocketService,
    private _tradingService: TradingService,
  ) { }
  ngOnInit(): void {
    this._tradingService.rooms$.pipe(takeUntil(this._unsubscribeAll)).subscribe(rooms => {
      this.tradingRooms = rooms;
      if (!this.tradingRoom) {
        this.tradingRoom = this.tradingRooms[0];
      }
    });

    this._tradingService.rounds$.pipe(takeUntil(this._unsubscribeAll)).subscribe(rounds => {
      let values = [];
      if (!rounds) {
        return;
      }
      for (let round of rounds) {
        values.push({
          x: moment(round.openTime).format('HH:mm'),
          y: [round.openPrice, round.highPrice, round.lowPrice, round.closePrice],
        });
      }
      this.btcChartComponent.updateSeries([{
        data: values
      }], false);
      this.klines = values;
    });

    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
    this._prepareChartData();

    this._socketService.socket.fromEvent(SocketEvent.NOW).subscribe(data => {
      this.currentTime = data;
    });

    this._socketService.socket.fromEvent(SocketEvent.ROOM_JOIN).subscribe(data => {
      this.tradingRoom = this.tradingRooms.find(e => e.symbol == data);
    });

    this._socketService.socket.fromEvent(SocketEvent.KLINE).subscribe((kline: Kline) => {
      this.canTrade = kline.canTrade;
      this.countdown = moment(kline.closeTime).diff(moment(kline.time), 'seconds');
      let key = moment(kline.openTime).format('HH:mm');
      let index = this.klines.findIndex(e => {
        return e.x == key;
      });
      if (index >= 0) {
        this.klines[index] = {
          x: key,
          y: [kline.openPrice, kline.highPrice, kline.lowPrice, kline.closePrice],
        }
      } else {
        this.klines.push({
          x: key,
          y: [kline.openPrice, kline.highPrice, kline.lowPrice, kline.closePrice],
        });
      }
      this.btcChartComponent.updateSeries([{
        data: this.klines
      }], false)
    });

    this.tradingRoom$.pipe(pairwise(), takeUntil(this._unsubscribeAll)).subscribe(([old, newValue]) => {
      this._socketService.socket.emit(SocketEvent.ROOM_LEFT, old.symbol);
      this._socketService.socket.emit(SocketEvent.ROOM_JOIN, newValue.symbol);
      this.updateRounds(newValue);
    });

    this._socketService.socket.on(SocketEvent.disconnect, () => {
      this._socketService.socket.emit(SocketEvent.ROOM_JOIN, this.tradingRoom.symbol);
      this.updateRounds(this.tradingRoom);
    });

    this._socketService.socket.emit(SocketEvent.ROOM_JOIN, this.tradingRoom.symbol);
    this.updateRounds(this.tradingRoom);

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    this.tradingRoom$.next(null);
    this.tradingRoom$.complete();
  }
  private _prepareChartData(): void {
    this.btcOptions = chartOptions;
  }
  onRoomChange(event: any) {
    this.tradingRoom = event;
    this.tradingRoom$.next(this.tradingRoom);
  }
  updateRounds(tradingRoom: TradingRoom) {
    this._tradingService.getLatestRounds(tradingRoom).subscribe();
  }
}

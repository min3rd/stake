import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, take, map, Observable, pairwise } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ClientSocketService } from 'app/core/socket/socket.service';
import { SocketEvent, SocketRoom } from 'app/core/config/socket.config';
import { chartOptions } from 'app/core/config/trading,config';
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
  countdownTime: any;
  amount: number = 0;
  trend: any = {
    dir: 'up',
    amount: 0
  };
  tradingRoom: SocketRoom = SocketRoom.TRADING_BTCUSDT;
  tradingRoom$: Subject<SocketRoom> = new Subject<any>();
  tradingRooms: any[] = Object.values(SocketRoom);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _socketService: ClientSocketService,
  ) {
  }
  ngOnInit(): void {
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
    this._prepareChartData();
    this._socketService.socket.fromEvent('now').subscribe(data => {
      this.countdownTime = data;
    });
    this._socketService.socket.fromEvent('kline').subscribe((data: any) => {
      // let klines = [];
      // let series: any[] = this.btcOptions.series;
      // let candlestick: any = series.find(seri => seri.type == 'candlestick');
      // let line: any = series.find(seri => seri.type == 'line');
      // for (let raw of data) {
      //   klines.push({
      //     x: moment(raw.startTime).format('HH:mm'),
      //     y: [raw.openPrice, raw.highPrice, raw.lowPrice, raw.closePrice],
      //   });
      // }
      // candlestick.data = klines;
      // this.btcOptions.series = [candlestick];
    });
    this.tradingRoom$.pipe(pairwise(), takeUntil(this._unsubscribeAll)).subscribe(([old, newValue]) => {
      this._socketService.socket.emit(SocketEvent.ROOM_LEFT, old);
      this._socketService.socket.emit(SocketEvent.ROOM_JOIN, newValue);
    });
    this._socketService.socket.on('disconnect', () => {
      this._socketService.socket.emit(SocketEvent.ROOM_JOIN, this.tradingRoom);
    });
    this._socketService.socket.emit(SocketEvent.ROOM_JOIN, this.tradingRoom);
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
}

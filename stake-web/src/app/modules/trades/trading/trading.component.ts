import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, pairwise, BehaviorSubject } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ClientSocketService } from 'app/core/socket/socket.service';
import { SocketEvent } from 'app/core/config/socket.config';
import { chartOptions } from 'app/core/config/trading.config';
import { TradingService } from './trading.service';
import { TradingRoom, Kline, ApexChartSeriesData, TradingConfig, TradingCallType, TradingCall } from './trading.types';
import moment from 'moment';
import { UserService } from 'app/core/user/user.service';
import { Router } from '@angular/router';
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
  canTrade: boolean = false;
  calling: boolean = false;
  tradingRoom: TradingRoom;
  tradingRoom$: BehaviorSubject<TradingRoom> = new BehaviorSubject(null);
  tradingRooms: TradingRoom[];
  betCash: number = 0;
  tradingConfig: TradingConfig;
  tradingCall: TradingCall;
  tradingCalls: TradingCall[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private klines: BehaviorSubject<ApexChartSeriesData[] | null> = new BehaviorSubject(null);
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _socketService: ClientSocketService,
    private _tradingService: TradingService,
    private _userService: UserService,
    private _router: Router,
  ) { }
  ngOnInit(): void {
    this._tradingService.rooms$.pipe(takeUntil(this._unsubscribeAll)).subscribe(rooms => {
      this.tradingRooms = rooms;
      if (!this.tradingRoom) {
        this.tradingRoom = this.tradingRooms[0];
      }
    });

    this._tradingService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      if (!config) {
        return;
      }
      this.tradingConfig = config;
      this.betCash = this.tradingConfig.sliderMin;
    })

    this._tradingService.tradingCalls$.pipe(takeUntil(this._unsubscribeAll)).subscribe(tradingCalls => {
      if (!tradingCalls) {
        return;
      }
      this.tradingCalls = tradingCalls;
    });

    this._tradingService.rounds$.pipe(takeUntil(this._unsubscribeAll)).subscribe(rounds => {
      let values = [];
      if (!rounds) {
        return;
      }
      for (let round of rounds) {
        values.push({
          x: round.openTime,
          y: [round.openPrice, round.highPrice, round.lowPrice, round.closePrice],
        });
      }
      this.klines.next(values.sort((a, b) => new Date(b.x).getTime() - new Date(a.x).getTime()).slice(0, 59));
    });
    this.klines.pipe(takeUntil(this._unsubscribeAll)).subscribe(klines => {
      if (!klines) {
        return;
      }
      klines = klines.filter(e => parseFloat(this.currentTime) - new Date(e.x).getTime() <= 60 * 60 * 1000);
      // this.btcChartComponent.updateSeries([{
      //   data: klines,
      // }]);
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
      let key = kline.openTime;
      let klines = this.klines.getValue();
      let index = klines.findIndex(e => {
        return e.x == key;
      });
      if (index >= 0) {
        klines[index] = {
          x: key,
          y: [kline.openPrice, kline.highPrice, kline.lowPrice, kline.closePrice],
        }
      } else {
        klines.push({
          x: key,
          y: [kline.openPrice, kline.highPrice, kline.lowPrice, kline.closePrice],
        });
      }
      this.klines.next(klines.sort((a, b) => new Date(b.x).getTime() - new Date(a.x).getTime()).slice(0, 59));
    });

    this.tradingRoom$.pipe(pairwise(), takeUntil(this._unsubscribeAll)).subscribe(([old, newValue]) => {
      this.klines.next([]);
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
    this._tradingService.getConfig(tradingRoom).subscribe();
    this._tradingService.getLatestRounds(tradingRoom).subscribe();
    if (this._userService.user) {
      this._tradingService.getTradingCalls().subscribe();
    }
  }
  addBetCash(value: number) {
    this.betCash += value;
  }
  call(type: TradingCallType) {
    if (!this._userService.user) {
      return this._router.navigate(['/sign-in'], {
        queryParams: {
          redirectUrl: this._router.url,
        }
      })
    }
    if (this.betCash <= 0) {
      return;
    }
    this.calling = true;
    this._tradingService.call({
      userId: this._userService.user.id,
      symbol: this.tradingRoom.symbol,
      betCash: this.betCash,
      type: type,
    }).subscribe(response => {
      this.tradingCall = response;
      this.calling = false;
    }, error => {
      this.calling = false;
    })
  }
  checkCanTrade() {
    if (!this.canTrade) {
      return false;
    }
    if (this.calling) {
      return false;
    }
    if (!this.tradingCalls) {
      return true;
    }
    let tradingCall = this.tradingCalls.find(e => e.symbol == this.tradingRoom.symbol);
    if (!tradingCall) {
      return true;
    }
    if (new Date(tradingCall.closeTime).getTime() > new Date().getTime()) {
      return false;
    }
    return true;
  }
}

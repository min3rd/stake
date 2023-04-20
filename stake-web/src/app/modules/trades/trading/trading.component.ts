import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subject, takeUntil, pairwise, BehaviorSubject, switchMap } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { SocketService } from 'app/core/socket/socket.service';
import { SocketEvent } from 'app/core/config/socket.config';
import { chartOptions } from 'app/core/config/trading.config';
import { TradingService } from './trading.service';
import { TradingRoom, Kline, ApexChartSeriesData, TradingConfig, TradingCallType, TradingCall } from './trading.types';
import moment from 'moment';
import { UserService } from 'app/core/user/user.service';
import { Router } from '@angular/router';
import { TimeUtils } from 'app/common/timeutils';
import { CashAccount, User } from 'app/core/user/user.types';
enum TabType {
  INDICATORS = 1,
  LAST_RESULTS = 2,
}
@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy, AfterViewInit {
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
  tradingCalls: TradingCall[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private klines: BehaviorSubject<ApexChartSeriesData[] | null> = new BehaviorSubject(null);
  TabType = TabType;
  tab: number = TabType.INDICATORS;

  analysisBuy: number;
  analysisBuyAmount: number;
  analysisBuyCount: number;
  analysisSell: number;
  analysisSellAmount: number;
  analysisSellCount: number;
  user: User;

  constructor(
    private _socketService: SocketService,
    private _tradingService: TradingService,
    private _userService: UserService,
    private _router: Router,
  ) { }
  prepare() {
    this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
      this.user = user
    });
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
    this.klines.pipe(takeUntil(this._unsubscribeAll)).subscribe((klines) => {
      if (!klines) {
        return;
      }
      let _klines = Array.from(klines);
      _klines = _klines.filter(e => parseFloat(this.currentTime) - new Date(e.x).getTime() <= 60 * 60 * 1000);
      let openLine = _klines.map(e => {
        return {
          x: e.x,
          y: e.y[0],
        }
      });
      let closeLine = _klines.map(e => {
        return {
          x: e.x,
          y: e.y[3],
        }
      });
      if (!this.btcChartComponent) {
        return;
      }
      this.btcChartComponent.updateSeries([
        {
          type: 'candlestick',
          data: _klines,
        },
      ]);

    });
    this._socketService.socket.fromEvent(SocketEvent.NOW).subscribe(data => {
      this.currentTime = data;

    });
    this._socketService.socket.fromEvent(SocketEvent.ROOM_JOIN).subscribe(data => {
      this.tradingRoom = this.tradingRooms.find(e => e.symbol == data);

    });

    this._socketService.socket.fromEvent(SocketEvent.KLINE).subscribe((kline: Kline) => {

      this.analysisBuy = kline.analysisBuy;
      this.analysisSell = kline.analysisSell;
      this.analysisBuyAmount = kline.analysisBuyAmount;
      this.analysisSellAmount = kline.analysisSellAmount;
      this.analysisBuyCount = kline.analysisBuyCount;
      this.analysisSellCount = kline.analysisSellCount;

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
      if (old) {
        this._socketService.socket.emit(SocketEvent.ROOM_LEFT, old.symbol);
      }
      this._socketService.socket.emit(SocketEvent.ROOM_JOIN, newValue.symbol);
      this.updateRounds(newValue);

    });

    this._socketService.socket.on(SocketEvent.disconnect, () => {
      this._socketService.socket.emit(SocketEvent.ROOM_JOIN, this.tradingRoom.symbol);
      this.updateRounds(this.tradingRoom);

    });

    this._socketService.socket.fromEvent(SocketEvent.TRADING_CONFIG).subscribe((tradingConfig: TradingConfig) => {
      this.tradingConfig = tradingConfig;

    })

    this._prepareChartData();
    this._socketService.socket.emit(SocketEvent.ROOM_JOIN, this.tradingRoom.symbol);
    this.updateRounds(this.tradingRoom);
  }
  ngAfterViewInit(): void {
    this.prepare();
  }
  ngOnInit(): void {

  }

  deactive() {
    this._socketService.socket.emit(SocketEvent.ROOM_LEFT, this.tradingRoom.symbol);
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
    this.betCash = (this.betCash + value) > this.userCash ? this.userCash : this.betCash + value;
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
    this._tradingService.call({
      userId: this._userService.user.id,
      symbol: this.tradingRoom.symbol,
      betCash: this.betCash,
      type: type,
    }).subscribe()
  }
  checkCanTrade() {
    if (!this.canTrade) {
      return false;
    }
    if (!this.klines.getValue()) {
      return false;
    }
    let maxX = Math.max(...this.klines.getValue().map(o => new Date(o.x).getTime()));
    let currentRound = this.klines.getValue()
      .find(e => new Date(e.x).getTime() == maxX);
    if (!currentRound) {
      return false;
    }
    let closeDate = TimeUtils.getCloseDate(new Date(currentRound.x));
    if (new Date(this.currentTime).getTime() > (closeDate.getTime() - this.tradingConfig.blockingTime)) {
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
  switchTab(tab: TabType) {
    this.tab = tab;
  }

  gaugeRotate(left: number, right: number): string {
    if (left > right) {
      return 'rotate-30';
    } else if (left < right) {
      return 'rotate-[120deg]'
    } else {
      return 'rotate-90'
    }
  }
  get userCash(): number {
    return this.user.cashAccount === CashAccount.REAL ? this.user.cash : this.user.demoCash ?? 0;
  }

  get getLastResults(): any {
    let klines = this.klines.getValue().sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());
    let results = [];
    for (let i = 0; i < 3; i++) {
      results[i] = [];
      for (let j = 0; j < 5; j++) {
        results[i][j] = []
        for (let k = 0; k < 4; k++) {
          let kline = klines[i * 5 + j * 4 + k];
          if (!kline) {
            results[i][j].push(0);
          } else if (kline.y[3] - kline.y[0] > 0) {
            results[i][j].push(1);
          } else {
            results[i][j].push(2);
          }
        }
      }
    }
    return results;
  }
}

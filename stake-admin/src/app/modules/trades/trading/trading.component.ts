import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, pairwise, BehaviorSubject } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { SocketService } from 'app/core/socket/socket.service';
import { SocketEvent } from 'app/core/config/socket.config';
import { chartOptions } from 'app/core/config/trading.config';
import { TradingService } from './trading.service';
import { TradingRoom, Kline, ApexChartSeriesData, TradingConfig, TradingCallType, TradingCall } from './trading.types';
import moment from 'moment';
import { UserService } from 'app/core/user/user.service';
import { Router } from '@angular/router';
import { TimeUtils } from 'app/common/timeutils';
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
  tradingCalls: TradingCall[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private klines: BehaviorSubject<ApexChartSeriesData[] | null> = new BehaviorSubject(null);
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _socketService: SocketService,
    private _tradingService: TradingService,
    private _userService: UserService,
    private _router: Router,
  ) { }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    this.tradingRoom$.next(null);
    this.tradingRoom$.complete();
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
      this.calling = false;
    }, error => {
      this.calling = false;
    })
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
}

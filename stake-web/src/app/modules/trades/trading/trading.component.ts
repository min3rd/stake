import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject, takeUntil, pairwise, BehaviorSubject, Observable } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { SocketService } from 'app/core/socket/socket.service';
import { SocketEvent } from 'app/core/config/socket.config';
import { TradingService } from './trading.service';
import { TradingRoom, Kline, TradingConfig, TradingCallType, TradingCall, TradingRound, BollingerBand } from './trading.types';
import moment from 'moment';
import { UserService } from 'app/core/user/user.service';
import { Router } from '@angular/router';
import { TimeUtils } from 'app/common/timeutils';
import { CashAccount, User } from 'app/core/user/user.types';
import { StockChart } from 'angular-highcharts';
import { TranslocoService } from '@ngneat/transloco';
import { CountdownPipe } from 'app/core/pipe/countdown.pipe';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CurrencyPipe } from 'app/core/pipe/currency.pipe';
import { HotToastService } from '@ngneat/hot-toast';
import { constants, hotToastOptions } from 'app/common/constants';
import { CapitalizePipe } from 'app/core/pipe/capitalize.pipe';
import { SoundService } from 'app/core/sound/sound.service';
enum TabType {
    INDICATORS = 1,
    LAST_RESULTS = 2,
}
@Component({
    selector: 'app-trading',
    templateUrl: './trading.component.html',
    styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy {
    @ViewChild('btcChartComponent') btcChartComponent: ChartComponent;
    CashAccount = CashAccount;
    TradingCallType = TradingCallType;
    appConfig: any;
    btcOptions: ApexOptions = {};
    currentTime: any;
    countdown: any;
    canTrade: boolean = false;
    calling: boolean = false;
    tradingRoom: TradingRoom;
    tradingRoom$: Observable<TradingRoom>;
    tradingRooms: TradingRoom[];
    betCash: number = 0;
    tradingConfig: TradingConfig;
    tradingCalls: TradingCall[];
    klines: Kline[] = [];
    TabType = TabType;
    tab: number = TabType.INDICATORS;
    analysisBuy: number;
    analysisBuyAmount: number;
    analysisBuyCount: number;
    analysisSell: number;
    analysisSellAmount: number;
    analysisSellCount: number;
    user: User;
    chart: StockChart;
    ohlc: any[];
    volumes: [];
    deviceVersion: string;
    isMobile: boolean;
    bollingBands: BollingerBand[];
    history: boolean = false;
    capitalizePipe: CapitalizePipe = new CapitalizePipe();
    maxDisplayPoint: number = constants.TRADES.MAX_DISPLAY_POINT_ON_PC;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _socketService: SocketService,
        private _tradingService: TradingService,
        private _userService: UserService,
        private _router: Router,
        private _translocoService: TranslocoService,
        private _deviceDetectorService: DeviceDetectorService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _hotToastService: HotToastService,
        private _soundService: SoundService,
    ) {
    }
    prepare() {
        this.tradingRoom$ = this._tradingService.tradingRoom$;
        this.isMobile = this._deviceDetectorService.isMobile();
        this.maxDisplayPoint = this.isMobile ? constants.TRADES.MAX_DISPLAY_POINT_ON_MOBILE : constants.TRADES.MAX_DISPLAY_POINT_ON_PC;
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
            this.user = user;

            this._changeDetectorRef.markForCheck();
        });
        this._tradingService.rooms$.pipe(takeUntil(this._unsubscribeAll)).subscribe(rooms => {
            this.tradingRooms = rooms;
            this._changeDetectorRef.markForCheck();
        });

        this._tradingService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            if (!config) {
                return;
            }
            this.tradingConfig = config;
            this.betCash = this.tradingConfig.sliderMin;

            this._changeDetectorRef.markForCheck();
        })

        this._tradingService.tradingCalls$.pipe(takeUntil(this._unsubscribeAll)).subscribe(tradingCalls => {
            if (!tradingCalls) {
                return;
            }
            this.tradingCalls = tradingCalls;
            this._changeDetectorRef.markForCheck();
        });

        this._tradingService.rounds$.pipe(takeUntil(this._unsubscribeAll)).subscribe((rounds: TradingRound[]) => {
            let klines: Kline[] = [];
            if (!rounds) {
                return;
            }
            klines = rounds.map(e => {
                let kline: Kline = {
                    symbol: e.symbol,
                    time: e.time,
                    openTime: e.openTime,
                    closeTime: e.closeTime,
                    openPrice: e.openPrice,
                    highPrice: e.highPrice,
                    lowPrice: e.lowPrice,
                    closePrice: e.closePrice,
                    closed: e.closed,
                    canTrade: e.canTrade,
                }
                return kline;
            }).sort((a, b) => new Date(a.openTime).getTime() - new Date(b.openTime).getTime());
            this.klines = klines;
            this._changeDetectorRef.markForCheck();
            if (!this.chart) {
                return;
            }
            this.chart.ref$.pipe(takeUntil(this._unsubscribeAll)).subscribe(chart => {
                let candlestick = chart.series[0];
                let volume = chart.series[1];
                let spline = chart.series[2];
                let line = chart.series[3];
                candlestick.setData(klines.map(e => {
                    let r = {
                        x: new Date(e.openTime).getTime(),
                        close: e.closePrice,
                        high: e.highPrice,
                        low: e.lowPrice,
                        open: e.openPrice,
                    };
                    return r;
                }));
                volume.setData(klines.map(e => {
                    let r = {
                        x: new Date(e.openTime).getTime(),
                        y: Math.abs(e.closePrice - e.openPrice),
                        color: (e.closePrice - e.openPrice) > 0 ? '#84CC16' : '#EF4444',
                    };
                    return r;
                }));
                this.bollingBands = this.calculateBollingerBands(klines);
                spline.setData(this.bollingBands.map(e => {
                    return [
                        new Date(e.openTime).getTime(),
                        e.lower,
                        e.upper,
                    ];
                }));
                line.setData(this.bollingBands.map(e => [new Date(e.openTime).getTime(), e.average]));

                if (this.isMobile) {
                    let now = new Date();
                    chart.xAxis[0].setExtremes(
                        now.getTime() - 1000 * 60 * this.maxDisplayPoint,
                        now.getTime(),
                    )
                }
            });
        });
        this._socketService.socket.fromEvent(SocketEvent.NOW).subscribe(data => {
            this.currentTime = data;
            this._changeDetectorRef.markForCheck();

        });
        this._socketService.socket.fromEvent(SocketEvent.ROOM_JOIN).subscribe(data => {
            this.tradingRoom = this.tradingRooms.find(e => e.symbol == data);
            this._changeDetectorRef.markForCheck();
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
            let now = new Date();
            this.chart.ref$.pipe(takeUntil(this._unsubscribeAll)).subscribe(chart => {
                let index = this.klines.findIndex(e => new Date(e.openTime).getTime() == new Date(kline.openTime).getTime());
                if (index >= 0) {
                    this.klines[index] = kline;
                    let candlestick = chart.series[0].points.find(e => new Date(e.x).getTime() == new Date(kline.openTime).getTime());
                    if (candlestick) {
                        candlestick.update({
                            close: kline.closePrice,
                            high: kline.highPrice,
                            low: kline.lowPrice,
                            open: kline.openPrice,
                        }, true, true);
                    }
                    let volume = chart.series[1].points[chart.series[1].points.length - 1];
                    if (volume) {
                        volume.update({
                            x: new Date(kline.openTime).getTime(),
                            y: Math.abs(kline.closePrice - kline.openPrice),
                            color: (kline.closePrice - kline.openPrice) > 0 ? '#84CC16' : '#EF4444',
                        }, true, true);
                    }
                    let spline = chart.series[2].points[chart.series[1].points.length - 1];
                    if (spline) {
                        this.bollingBands = this.calculateBollingerBands(this.klines);
                        spline.update([
                            new Date(this.bollingBands[index].openTime).getTime(),
                            this.bollingBands[index].lower,
                            this.bollingBands[index].upper
                        ], true, true);
                    }

                    let line = chart.series[3].points[chart.series[1].points.length - 1];
                    if (line) {
                        this.bollingBands = this.calculateBollingerBands(this.klines);
                        line.update([
                            new Date(this.bollingBands[index].openTime).getTime(),
                            this.bollingBands[index].average,
                        ], true, true);
                    }
                } else {
                    this.klines.push(kline);
                    chart.series[0].addPoint({
                        x: new Date(kline.openTime).getTime(),
                        close: kline.closePrice,
                        high: kline.highPrice,
                        low: kline.lowPrice,
                        open: kline.openPrice,
                    }, true, true, true);
                    chart.series[1].addPoint({
                        x: new Date(kline.openTime).getTime(),
                        y: Math.abs(kline.closePrice - kline.openPrice),
                        color: (kline.closePrice - kline.openPrice) > 0 ? '#84CC16' : '#EF4444',
                    }, true, true, true);
                    let spline = chart.series[2];
                    if (spline) {
                        this.bollingBands = this.calculateBollingerBands(this.klines);
                        spline.addPoint([
                            new Date(this.bollingBands[this.bollingBands.length - 1].openTime).getTime(),
                            this.bollingBands[this.bollingBands.length - 1].lower,
                            this.bollingBands[this.bollingBands.length - 1].upper,
                        ], true, true, true);
                    }
                    chart.series[3].addPoint([
                        new Date(this.bollingBands[this.bollingBands.length - 1].openTime).getTime(),
                        this.bollingBands[this.bollingBands.length - 1].average
                    ], true, true, true);
                }
                if (this.isMobile) {
                    let last = chart.series[0].data[chart.series[0].data.length - 1]?.x;
                    chart.xAxis[0].setExtremes(
                        now.getTime() - 1000 * 60 * this.maxDisplayPoint,
                        last
                    );
                }
            });
            this._changeDetectorRef.markForCheck();
        });
        this.tradingRoom$.pipe(takeUntil(this._unsubscribeAll)).subscribe((tradingRoom: TradingRoom) => {
            if (!tradingRoom) {
                return;
            }
            this.tradingRoom = tradingRoom;
            this._socketService.socket.emit(SocketEvent.ROOM_JOIN, tradingRoom.symbol);
            this.updateRounds(tradingRoom);
            this._changeDetectorRef.markForCheck();
        });
        this.tradingRoom$.pipe(pairwise(), takeUntil(this._unsubscribeAll)).subscribe(([old, newValue]) => {
            if (old) {
                this._socketService.socket.emit(SocketEvent.ROOM_LEFT, old.symbol);
            }
            this._socketService.socket.emit(SocketEvent.ROOM_JOIN, newValue.symbol);
            this.updateRounds(newValue);
            this._changeDetectorRef.markForCheck();
        });

        this._socketService.socket.on(SocketEvent.disconnect, () => {
            this._socketService.socket.emit(SocketEvent.ROOM_JOIN, this.tradingRoom.symbol);
            this.updateRounds(this.tradingRoom);
            this._changeDetectorRef.markForCheck();
        });

        this._socketService.socket.fromEvent(SocketEvent.TRADING_CONFIG).subscribe((tradingConfig: TradingConfig) => {
            this.tradingConfig = tradingConfig;
            this._changeDetectorRef.markForCheck();
        });
        this._prepareChartData();
    }
    ngOnInit(): void {
        this.prepare();
    }

    deactive() {
        this._socketService.socket.emit(SocketEvent.ROOM_LEFT, this.tradingRoom.symbol);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    private _prepareChartData(): void {
        let countdownPipe = new CountdownPipe();
        let currencyPipe = new CurrencyPipe();
        let that = this;
        this.chart = new StockChart({
            time: {
                useUTC: false,
            },
            chart: {
                panning: {
                    enabled: false,
                },
                backgroundColor: 'transparent',
                plotBackgroundImage: '/assets/images/trades/world_map_dot.svg',
            },
            credits: {
                enabled: false,
            },
            navigator: {
                enabled: false,
            },
            xAxis: [
                {
                    lineColor: '#363A3E',
                    lineWidth: 1,
                    labels: {
                        enabled: true,
                    },
                },
            ],
            yAxis: [
                {
                    gridLineColor: "#363A3E",
                    gridLineDashStyle: 'LongDash',
                    height: '80%',
                    labels: {
                        align: 'left',
                        formatter() {
                            return currencyPipe.transform(this.value);
                        },
                        style: {
                            color: '#FFFFFF'
                        },
                    },
                    plotLines: [
                        {
                            color: "#581C87",
                            width: 1,
                            id: 'current-price',
                            zIndex: 100,
                            dashStyle: 'Solid'
                        }
                    ],
                    lineWidth: 1,
                    resize: {
                        enabled: true
                    },
                },
                {
                    labels: {
                        enabled: false,
                    },
                    top: '80%',
                    height: '20%',
                    gridLineColor: '',
                }
            ],
            plotOptions: {
                candlestick: {
                    pointWidth: 8,
                    maxPointWidth: 12,
                    lineColor: '#EF4444',
                    upLineColor: '#84CC16',
                    lineWidth: 2,
                    lastPrice: {
                        enabled: true,
                        label: {
                            enabled: false
                        },
                        color: '#581C87',

                    },
                    lastVisiblePrice: {
                        enabled: true,
                        label: {
                            enabled: true,
                            align: 'left',
                            formatter(this, value) {
                                return currencyPipe.transform(value) + '</br>' + countdownPipe.transform(that.countdown);
                            },
                            backgroundColor: '#581C87',
                        }
                    },
                },
                column: {
                    minPointLength: 2,
                    pointWidth: 8,
                    maxPointWidth: 12,
                    borderRadius: 0
                },
                areasplinerange: {
                    // fillColor: '#BEF264',
                    fillOpacity: 0.1,
                    lineColor: '#4ade80'
                },
                line: {
                    dashStyle: 'LongDash',
                    color: '#f59e0b'
                },
                series: {
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    },
                    allowPointSelect: false,
                }
            },
            rangeSelector: {
                enabled: false,
            },
            tooltip: {
                split: false,
                enabled: true,
                animation: false,
                useHTML: true,
            },
            series: [
                {
                    type: 'candlestick',
                    id: 'candlestick',
                    name: this._translocoService.translate('aapl stock price'),
                    data: [],
                    dataGrouping: {
                        enabled: false,
                    },
                    color: '#EF4444',
                    upColor: '#84CC16',
                    zIndex: 10,
                },
                {
                    type: 'column',
                    id: 'volume',
                    name: this._translocoService.translate('volume'),
                    data: [],
                    dataGrouping: {
                        enabled: false,
                    },
                    yAxis: 1,
                },
                {
                    type: 'areasplinerange',
                    id: 'price-range',
                    name: this._translocoService.translate('price range'),
                    data: [],
                    dataGrouping: {
                        enabled: false,
                    },
                    visible: this.isMobile ? false : true,
                },
                {
                    type: 'line',
                    id: 'average-price',
                    name: this._translocoService.translate('average price'),
                    data: [],
                    dataGrouping: {
                        enabled: false,
                    },
                    visible: this.isMobile ? false : true,
                }
            ],
            stockTools: {
                gui: {
                    enabled: false,
                }
            },
            scrollbar: {
                enabled: false,
            },
        });
    }
    onRoomChange(event: any) {
        this._router.navigate(['/trades', event.symbol])
    }
    updateRounds(tradingRoom: TradingRoom) {
        this._tradingService.getConfig(tradingRoom).subscribe();
        this._tradingService.getLatestRounds(tradingRoom).subscribe();
        if (this._userService.user) {
            this._tradingService.getLatestTradingCalls().subscribe();
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
        }).subscribe(() => {
            this._hotToastService.success(this.capitalizePipe.transform(this._translocoService.translate('order successfully')), hotToastOptions);
            this._soundService.playOrder();
        }, () => {
            this._hotToastService.error(this.capitalizePipe.transform(this._translocoService.translate('order failed')), hotToastOptions);
        });
    }
    checkCanTrade() {
        if (!this.tradingConfig) {
            return false;
        }
        if (!this.canTrade) {
            return false;
        }
        if (!this.klines) {
            return false;
        }
        let maxX = Math.max(...this.klines.map(o => new Date(o.openTime).getTime()));
        let currentRound = this.klines.find(e => new Date(e.openTime).getTime() == maxX);
        if (!currentRound) {
            return false;
        }
        let closeDate = TimeUtils.getCloseDate(new Date(currentRound.openTime));
        if (new Date(this.currentTime).getTime() > (closeDate.getTime() - this.tradingConfig.blockingTime)) {
            return false;
        }
        if (this.calling) {
            return false;
        }
        if (!this.tradingCalls) {
            return true;
        }
        let tradingCall = this.tradingCalls.find(e => e.symbol == this.tradingRoom.symbol && new Date(e.closeTime).getTime() == closeDate.getTime());
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
        let klines = this.klines.sort((a, b) => new Date(a.openTime).getTime() - new Date(b.openTime).getTime());
        let results = [];
        let max = (1 + Math.ceil(klines.length / 20)) * 20;
        let j = 0, k = 0;
        results[j] = [];
        results[j][k] = [];
        for (let i = 0; i < max; i++) {
            if (typeof klines[i] == 'undefined' || klines[i] == undefined || !klines[i]) {
                results[j][k].push(0)
            } else if (klines[i].closePrice > klines[i].openPrice) {
                results[j][k].push(1);
            } else if (klines[i].closePrice <= klines[i].openPrice) {
                results[j][k].push(2);
            } else {
                results[j][k].push(0)
            }
            if (results[j][k].length >= 4) {
                k++;
                results[j][k] = [];
            }
            if (k >= 5) {
                j++;
                k = 0;
                results[j] = []
                results[j][k] = [];
            }
        }
        return results;
    }

    get countResult(): { buy: number, sell: number } {
        return {
            buy: this.klines.filter(e => e.closePrice > e.openPrice).length,
            sell: this.klines.filter(e => e.closePrice <= e.openPrice).length,
        }
    }
    calculateBollingerBands(data: Kline[], period = 20, deviation = 2): BollingerBand[] {
        const results: BollingerBand[] = [];
        for (let i = 0; i < data.length; i++) {
            const prices = data.slice(Math.max(0, i - period + 1), i + 1).map(candle => candle.closePrice);
            const average = prices.reduce((total, price) => total + price, 0) / prices.length;
            const standardDeviation = Math.sqrt(prices.reduce((total, price) => total + Math.pow(price - average, 2), 0) / prices.length);
            const upperBand = average + deviation * standardDeviation;
            const lowerBand = average - deviation * standardDeviation;

            results.push({
                openTime: data[i].openTime,
                average: average,
                upper: upperBand,
                lower: lowerBand
            });
        }
        return results;
    }
    getTradingCallsByStatus(status: "opening" | "closed"): TradingCall[] {
        let now = new Date();
        return (this.tradingCalls ?? [])
            .filter(e => {
                if (status == 'opening') {
                    return now.getTime() < new Date(e.closeTime).getTime();
                } else {
                    return now.getTime() >= new Date(e.closeTime).getTime();
                }
            })
            .sort((a, b) => new Date(b.openTime).getTime() - new Date(a.openTime).getTime());
    }
    toggleHistory() {
        this.history = !this.history;
        this._tradingService.getTradingCallToday().subscribe();
    }
}

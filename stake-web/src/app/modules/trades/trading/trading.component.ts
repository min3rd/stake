import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions, ChartComponent, ApexAxisChartSeries } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ClientSocketService } from 'app/core/socket/socket.service';
import moment from 'moment';
import { SocketEvent, SocketRoom } from 'app/core/config/socket.config';
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
  tradingType: string = "BTCUSDT";
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _socketService: ClientSocketService,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });

    // Prepare the chart data
    this._prepareChartData();
    this._socketService.socket.fromEvent('now').subscribe(data => {
      this.countdownTime = data;
    });
    this._socketService.socket.fromEvent('kline').subscribe((data: any) => {
      let klines = [];
      let series: any[] = this.btcOptions.series;
      let candlestick: any = series.find(seri => seri.type == 'candlestick');
      let line: any = series.find(seri => seri.type == 'line');
      for (let raw of data) {
        klines.push({
          x: moment(raw.startTime).format('HH:mm'),
          y: [raw.openPrice, raw.highPrice, raw.lowPrice, raw.closePrice],
        });

      }
      candlestick.data = klines;
      this.btcOptions.series = [candlestick];
    });
    this._socketService.socket.emit(SocketEvent.ROOM.JOIN, SocketRoom.TRADING.BTCUSDT);
    this._socketService.socket.on('disconnect', () => {
      this._socketService.socket.emit(SocketEvent.ROOM.JOIN, SocketRoom.TRADING.BTCUSDT);
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    // BTC
    this.btcOptions = {
      chart: {
        animations: {
          enabled: false
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        width: '100%',
        height: '100%',
        type: 'candlestick',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
      },
      colors: ['#5A67D8'],
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: 'var(--fuse-border)',
        position: 'back',
        show: true,
        strokeDashArray: 6,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
      },
      legend: {
        show: false
      },
      series: [
        {
          name: 'candlestick',
          type: 'candlestick',
          data: [
          ]
        },
        {
          name: 'line',
          type: 'line',
          data: [
          ]
        }
      ],
      stroke: {
        width: 2,
        curve: 'smooth',
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
      },
      tooltip: {
        shared: true,
        theme: 'dark',
        y: {
          formatter: (value: number): string => '$' + value.toFixed(2)
        },
      },
      xaxis: {
        type: 'numeric',
        crosshairs: {
          show: true,
          position: 'back',
          fill: {
            type: 'color',
            color: 'var(--fuse-border)'
          },
          width: 3,
          stroke: {
            dashArray: 0,
            width: 0
          },
          opacity: 0.9
        },
        tickAmount: 8,
        axisTicks: {
          show: true,
          color: 'var(--fuse-border)'
        },
        axisBorder: {
          show: false
        },
        tooltip: {
          enabled: true
        },
        labels: {
          show: true,
          trim: false,
          rotate: 0,
          minHeight: 40,
          hideOverlappingLabels: true,
          formatter: (value): string => value,
          style: {
            colors: 'currentColor'
          }
        }
      },
      yaxis: {
        axisTicks: {
          show: true,
          color: 'var(--fuse-border)'
        },
        axisBorder: {
          show: false
        },
        forceNiceScale: true,
        labels: {
          formatter: (value: number): string => '$' + value.toFixed(0),
          style: {
            colors: 'currentColor'
          }
        }
      },
    };
  }
}

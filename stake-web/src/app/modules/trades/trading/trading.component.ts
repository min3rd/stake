import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DateTime } from 'luxon';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { SocketService } from 'app/core/socket/socket.service';

export const crypto = {
  btc: {
    amount: 8878.48,
    trend: {
      dir: 'up',
      amount: 0.17
    },
    marketCap: 148752956966,
    volume: 22903438381,
    supply: 18168448,
    allTimeHigh: 19891.00,
    price: {
      series: [
        {
          name: 'Price',
          data: [
          ]
        }
      ]
    }
  },
  prices: {
    btc: 8878.48,
    eth: 170.46,
    bch: 359.93,
    xrp: 0.23512
  },
  wallets: {
    btc: 24.97311243,
    eth: 126.3212,
    bch: 78.454412,
    xrp: 11278.771123
  },
};
@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy {
  @ViewChild('btcChartComponent') btcChartComponent: ChartComponent;
  appConfig: any;
  btcOptions: ApexOptions = {};
  data: any;
  lastMinute: number = 0;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _socketService: SocketService,
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
    // Store the data
    this.data = crypto;

    // Prepare the chart data
    this._prepareChartData();
    this._socketService.socket.fromEvent('message').subscribe(data => {
      console.log(data);

    });
    setInterval(() => {
      let now = new Date();
      let series = this.btcOptions.series;
      if (this.lastMinute != now.getMinutes()) {
        series[0]['data'].push({
          x: now.getMinutes(),
          y: [28000 + Math.random() * 20000, 28000, 20000, 28000 + Math.random() * 20000]
        });
        this.lastMinute = now.getMinutes();
      } else {
        series[0]['data'].splice(-1);
        series[0]['data'].push({
          x: now.getMinutes(),
          y: [28000 + Math.random() * 20000, 28000, 20000, 28000 + Math.random() * 20000]
        });
      }
      this.btcChartComponent.updateSeries(series);
    }, 1000);
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
        enabled: false
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
        }
      },
      legend: {
        show: false
      },
      series: this.data.btc.price.series,
      stroke: {
        width: 2,
        curve: 'straight'
      },
      tooltip: {
        shared: true,
        theme: 'dark',
        y: {
          formatter: (value: number): string => '$' + value.toFixed(2)
        }
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
          enabled: false
        },
        labels: {
          show: true,
          trim: false,
          rotate: 0,
          minHeight: 40,
          hideOverlappingLabels: true,
          // formatter: (value): string => DateTime.now().minus({ minutes: Math.abs(parseInt(value, 10)) }).toFormat('mm'),
          formatter: (value): string => parseInt(value).toString(),
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
          minWidth: 40,
          formatter: (value: number): string => '$' + value.toFixed(0),
          style: {
            colors: 'currentColor'
          }
        }
      },
    };
  }
}

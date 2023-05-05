import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserService } from 'app/core/user/user.service';
import { ApexOptions } from 'ng-apexcharts';
import { TranslocoService } from '@ngneat/transloco';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardTradeStats, DashboardTradingCall } from './dashboard.types';
import { DashboardService } from './dashboard.service';
import moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    mode: ProgressSpinnerMode = 'determinate';
    winColor: ThemePalette = 'primary';
    loseColor: ThemePalette = 'warn';
    totalTrade = 50;
    chartOptions: ApexOptions;
    dashboardTradeStats: DashboardTradeStats;
    dashboardTradingCalls: DashboardTradingCall[];
    startDate: Date;
    endDate: Date;
    private _unsubscribeAll: Subject<any> = new Subject();
    constructor(
        private _userService: UserService,
        private _translocoService: TranslocoService,
        private _dashboardService: DashboardService,
    ) { }
    ngOnInit(): void {
        let now = moment();
        this.startDate = now.clone().weekday(1).toDate();
        this.endDate = now.clone().weekday(7).toDate();

        this._dashboardService.dashboardTradeStats$.pipe(takeUntil(this._unsubscribeAll)).subscribe(dashboardTradeStats => {
            this.dashboardTradeStats = dashboardTradeStats;
        });

        this._dashboardService.dashboardTradingCalls$.pipe(takeUntil(this._unsubscribeAll)).subscribe(dashboardTradingCalls => {
            this.dashboardTradingCalls = dashboardTradingCalls;
        });
        this.chartOptions = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#84CC16', '#EF4444'],
            labels: [this._translocoService.translate('total win round'), this._translocoService.translate('total lose round')],
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%'
                    }
                }
            },
            series: [this.dashboardTradeStats.tradeStats.totalWinRound, this.dashboardTradeStats.tradeStats.totalLoseRound],
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                            <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                            <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                            <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}</div>
                                        </div>`
            }
        };
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    search() {
        this._dashboardService.getDashboardTradingCall(this.startDate, this.endDate).subscribe();
    }
}

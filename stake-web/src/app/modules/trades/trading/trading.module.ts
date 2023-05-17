import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { TradingComponent } from './trading.component';
import { CommonModule } from '@angular/common';
import { TradingRoutingModule } from './trading-routing.module';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as indicators from 'highcharts/modules/price-indicator.src';
import * as annotations from "highcharts/modules/annotations-advanced.src";
import * as tools from 'highcharts/modules/stock-tools.src';
import * as accessibility from 'highcharts/modules/accessibility.src';
import * as stock from 'highcharts/modules/stock.src';
@NgModule({
    declarations: [
        TradingComponent
    ],
    imports: [
        CommonModule,
        TradingRoutingModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatSliderModule,
        MatBadgeModule,
        NgApexchartsModule,
        SharedModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{
        provide: HIGHCHARTS_MODULES,
        useFactory: () => [more, indicators, annotations, tools, accessibility, stock]
    }],
})
export class TradingModule { }

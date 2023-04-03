import { ApexFill } from "ng-apexcharts";

export interface TradingRoom {
    id?: string;
    symbol?: string;
}

export interface Kline {
    symbol?: string;
    time?: string;
    openTime?: string;
    closeTime?: string;
    openPrice?: number;
    highPrice?: number;
    lowPrice?: number;
    closePrice?: number;
    closed?: boolean;
    canTrade?: boolean;
}

export interface TradingRound {
    symbol?: string;
    time?: string;
    openTime?: string;
    closeTime?: string;
    openPrice?: number;
    highPrice?: number;
    lowPrice?: number;
    closePrice?: number;
    closed?: boolean;
    canTrade?: boolean;
}

export interface ApexChartSeriesData {
    x: any;
    y: any;
    fill?: ApexFill;
    fillColor?: string;
    strokeColor?: string;
    meta?: any;
    goals?: any;
    barHeightOffset?: number;
    columnWidthOffset?: number;
}

export interface TradingConfig {
    benefitPercent?: number;
    sliderMax?: number;
    sliderMin?: number;
    sliderStep?: number;
    symbol?: string;
}
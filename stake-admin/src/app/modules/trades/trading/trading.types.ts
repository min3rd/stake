import { ApexFill } from "ng-apexcharts";

export interface TradingRoom {
    priceRangePercent?: number;
    benefitPercent?: number;
    sliderMin?: number;
    sliderMax?: number;
    sliderStep?: number;
    blockingTime?: number;
    _id?: string;
    symbol?: string;
    __v?: number;
}


export interface Kline {
    symbol?: string;
    time?: Date;
    openTime?: Date;
    closeTime?: Date;
    openPrice?: number;
    highPrice?: number;
    lowPrice?: number;
    closePrice?: number;
    closed?: boolean;
    canTrade?: boolean;
}

export interface TradingRound {
    _id?: string,
    symbol?: string,
    time?: string,
    openTime?: string,
    closeTime?: string,
    openPrice?: number,
    highPrice?: number,
    lowPrice?: number,
    closePrice?: number,
    canTrade?: boolean,
    closed?: boolean,
    buyAmount?: number,
    sellAmount?: number,
    buyCount?: number,
    sellCount?: number,
    __v?: number,
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
    blockingTime?: number;
}
export enum TradingCallType {
    BUY = 1,
    SELL = 2,
}
export interface TradingCall {
    userId?: string,
    symbol?: string,
    openTime?: Date,
    closeTime?: Date,
    type?: TradingCallType,
    betCash?: number,
}
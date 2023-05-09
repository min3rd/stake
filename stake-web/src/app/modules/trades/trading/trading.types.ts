import { ApexFill } from "ng-apexcharts";

export interface TradingRoom {
    id?: string;
    symbol?: string;
}

export interface Kline {
    symbol?: string
    time?: Date
    openTime?: Date
    closeTime?: Date
    openPrice?: number
    highPrice?: number
    lowPrice?: number
    closePrice?: number
    closed?: boolean
    canTrade?: boolean
    analysisBuyAmount?: number
    analysisSellAmount?: number
    analysisBuyCount?: number
    analysisSellCount?: number
    analysisBuy?: number
    analysisSell?: number
}

export interface TradingRound {
    symbol?: string
    time?: Date
    openTime?: Date
    closeTime?: Date
    openPrice?: number
    highPrice?: number
    lowPrice?: number
    closePrice?: number
    closed?: boolean
    analysisBuyAmount?: number
    analysisSellAmount?: number
    analysisBuyCount?: number
    analysisSellCount?: number
    analysisBuy?: number
    analysisSell?: number
    expectedHighPrice?: number
    expectedLowPrice?: number
    canTrade?: boolean
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
export interface BollingerBand {
    openTime?: Date;
    average?: number;
    upper?: number;
    lower?: number;
}

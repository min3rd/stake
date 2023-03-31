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
export interface TradingRoom {
    id?: string;
    symbol?: string;
}

export interface Kline {
    symbol?: string
    time?: string
    openTime?: string
    closeTime?: string
    openPrice?: number
    highPrice?: number
    lowPrice?: number
    closePrice?: number
    canTrade?: boolean
    closed?: boolean
    _id?: string
    __v?: number
}

export interface TradingRound {
    symbol?: string
    openTime?: string
    closeTime?: string
    openPrice?: number
    highPrice?: number
    lowPrice?: number
    closePrice?: number
}
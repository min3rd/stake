export interface DashboardTradeStats {
    tradeStats?: TradeStats
    tradeSummary?: TradeSummary
}

export interface TradeStats {
    totalWinRound?: number
    totalLoseRound?: number
    totalRound?: number
    winrate?: number
    totalAmount?: number
}

export interface TradeSummary {
    netProfit?: number
    totalRevenue?: number
    sellCount?: number
    buyCount?: number
}
export interface DashboardTradingCall {
    id?: string
    symbol?: string
    time?: Date
    type?: number
    winType?: number
    betCash?: number
    cashAccount?: number
    profit?: number
}

export interface News {
    _id?: string;
    time?: Date;
    title?: string;
    description?: string;
    data?: any;
}
export interface MonthlyProfit {
    _id?: string
    userId?: string
    username?: string
    name?: string
    time?: Date
    winAmount?: number
    loseAmount?: number
    winCount?: number
    loseCount?: number
    buyCount?: number
    sellCount?: number
    __v?: number
}

export interface News {
    _id?: string;
    time?: Date;
    __v?: number;
    data?: any;
    description?: string;
    end?: Date;
    start?: Date;
    title?: string;
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

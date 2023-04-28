export enum OrderStatus {
    PENDING = 0,
    SUCCESS = 1,
    CANCELED = 2,
}

export interface DepositOrder {
    _id?: string
    userId?: string
    time?: Date
    masterAddress?: string
    transactionId?: string
    amount?: number
    flag?: number
    status?: OrderStatus
    __v?: number
}

export interface WithdrawOrder {
    userId?: string
    time?: Date
    masterAddress?: string
    userAddress?: string
    amount?: number
    flag?: number
    status?: OrderStatus
    _id?: string
    __v?: number
}
export interface CashTransfer {
    _id?: string
    userId?: string
    destinationId?: string
    destinationUsername?: string
    time?: Date
    amount?: number
    status?: OrderStatus
    __v?: number
}

export interface OrderHistory {
    _id?: string;
    time?: Date;
    amount?: Number;
    type?: "deposit" | "withdraw" | "transfer" | "receiver";
    status?: OrderStatus;
}
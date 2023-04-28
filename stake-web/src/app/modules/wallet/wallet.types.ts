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
    _id?: string;
    time?: Date;
    status?: OrderStatus;
}

export interface OrderHistory {
    _id?: string;
    time?: Date;
    amount?: Number;
    type?: "deposit" | "withdraw" | "transfer";
    status?: OrderStatus;
}
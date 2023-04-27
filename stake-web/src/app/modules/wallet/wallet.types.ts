export enum DepositOrderStatus {
    PENDING = 0,
    SUCCESS = 1,
    CANCELED = 2,
}

export interface DepositOrder {
    _id?: string
    userId?: string
    time?: string
    masterAddress?: string
    transactionId?: string
    flag?: number
    status?: DepositOrderStatus
    __v?: number
}

export interface WithdrawOrder {
    _id?: string;
    time?: Date;
}
export interface CashTransfer {
    _id?: string;
    time?: Date;
}
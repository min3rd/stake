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
    flag?: DepositOrderStatus
    __v?: number
}
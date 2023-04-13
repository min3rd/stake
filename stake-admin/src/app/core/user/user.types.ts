export enum CashAccount {
    DEMO = 1,
    REAL = 2,
};
export interface User {
    id?: string
    username?: string
    avatar?: string
    name?: string
    phone?: string
    email?: string
    country?: string
    language?: string
    verified?: boolean
    cash?: number
    demoCash?: number
    cashAccount?: CashAccount
    blocked?: boolean
}

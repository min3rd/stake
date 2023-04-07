export enum CashAccount {
    DEMO = 1,
    REAL = 2,
};
export interface User {
    id?: string;
    name?: string;
    username?: string;
    avatar?: string;
    cash?: number;
    demoCash?: number;
    cashAccount?: CashAccount;
}

const TradingCallType = {
    BUY: 1,
    SELL: 2,
};

const CashAccount = {
    DEMO: 1,
    REAL: 2,
}

const Status = {
    PENDING: 0,
    SUCCESS: 1,
    CANCELED: 2,
}

module.exports = {
    TradingCallType: TradingCallType,
    CashAccount: CashAccount,
    Status: Status,
}
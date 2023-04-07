const ErrorCode = {
    UNEXPECTED: "00x0000",
    USERNAME_NOT_BLANK: "00x0001",
    NAME_NOT_BLANK: "00x0002",
    PASSWORD_NOT_BLANK: "00x0003",
    USERNAME_MUST_6_32: "00x0004",
    WRONG_USERNAME_FORMAT: "00x0005",
    PASSWORD_MUST_6_32: "00x0006",
    NAME_MUST_6_32: "00x0007",
    USERNAME_EXISTS: "00x0008",
    SIGN_UP_FAILED: "00x0009",
    USER_NOT_FOUND: "00x0010",
    TOKEN_GENERATION: "00x0011",
    MIGRATION_UPDATE_VERSION: "00x0012",
    USERID_NOT_MATCH: "00x0013",
    TRADING_CONFIG_NOT_EXISTS: "00x0014",
    TRADING_CALL_EXISTS: "00x0015",
    TRADING_ROUND_CLOSED: "00x0016",
    TRADING_ROUND_NOT_FOUND: "00x0017",
    CASH_NOT_ENOUGH: "00x0018",
    BET_CASH_MUST_MORE_THAN_ZERO: "00x0019",
    TRADING_CALL_TYPE_INVALID: "00x0020",
    TRADING_ROUND_CAN_NOT_TRADE: "00x0021",
    SAVE_TRADING_CALL_FAIL: "00x0022",
    CAN_NOT_TRADE_IN_BLOCKING_TIME: "00x0023",
}
module.exports = ErrorCode;
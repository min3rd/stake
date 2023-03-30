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
    USER_NOT_EXIST: "00x0010",
    TOKEN_GENERATION: "00x0011",
    MIGRATION_UPDATE_VERSION: "00x0012",
}
module.exports = ErrorCode;
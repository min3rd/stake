const SHA256 = require("crypto-js/sha256");
class Security {
    constructor() { }
    hashPassword(value) {
        return SHA256(value).toString();
    }
}
const security = new Security();
module.exports = {
    Security: Security,
    security: security,
}
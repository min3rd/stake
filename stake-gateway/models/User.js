const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");
const { CashAccount } = require("../common/constants");
const UserSchema = new Schema({
    username: { type: String, require: true, index: true, },
    password: { type: String, require: true, },
    name: { type: String, },
    avatar: { type: String, },
    phone: { type: String, },
    accessToken: { type: String, },
    refreshToken: { type: String, },
    refreshExpiryAt: { type: Date, default: new Date(), },
    verified: { type: Boolean, default: false, },
    cash: { type: Number, default: 0, },
    demoCash: { type: Number, default: 0, },
    cashAccount: { type: Number, enum: Object.values(CashAccount) },
});
const User = publicMongoose.model('User', UserSchema);

class ClientUser {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.name = user.name;
        this.verified = user.verified;
        this.cash = user.cash;
        this.demoCash = user.demoCash;
        this.avatar = user.avatar;
        this.cashAccount = user.cashAccount;
    }
}

module.exports = {
    UserSchema: UserSchema,
    User: User,
    ClientUser: ClientUser,
}
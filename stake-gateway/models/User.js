const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");
const CashAccount = [
    DEMO = 1, //Demo
    REAL = 2, //Real
];
const UserSchema = new Schema({
    username: { type: String, require: true, index: true, },
    password: { type: String, require: true, },
    name: { type: String, },
    avatar: { type: String, },
    phone: { type: String, },
    accessToken: { type: String, },
    refreshToken: { type: String, },
    verified: { type: Boolean, default: false, },
    cash: { type: Number, default: 0, },
    demoCash: { type: Number, default: 0, },
    cashAccount: { type: Number, enum: CashAccount },
});
const User = publicMongoose.model('User', UserSchema);

class PublicUser {
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
    PublicUser: PublicUser,
}
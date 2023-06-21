const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");
const { CashAccount } = require("../common/constants");
const UserSchema = new Schema({
    username: { type: String, require: true, index: true, lowercase: true, unique: true, },
    password: { type: String, require: true, },
    name: { type: String, },
    avatar: { type: String, },
    phone: { type: String, },
    email: { type: String },
    country: { type: String },
    language: { type: String },
    accessToken: { type: String, },
    refreshToken: { type: String, },
    refreshExpiryAt: { type: Date, default: new Date(), },
    verified: { type: Boolean, default: false, },
    cash: { type: Number, default: 0, },
    demoCash: { type: Number, default: 0, },
    cashAccount: { type: Number, enum: Object.values(CashAccount) },
    blocked: { type: Boolean, default: false, },
    walletAddress: { type: String },
    wallets: [
        {
            type: String,
        }
    ],
    telegram: { type: String },
    zalo: { type: String },
    facebook: { type: String },
    partner: { type: Number },

});
const User = publicMongoose.model('User', UserSchema);

class ClientUser {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.name = user.name;
        this.avatar = user.avatar;
        this.phone = user.phone;
        this.email = user.email;
        this.country = user.country;
        this.language = user.language;
        this.verified = user.verified;
        this.cash = user.cash;
        this.demoCash = user.demoCash;
        this.cashAccount = user.cashAccount;
        this.blocked = user.blocked;
        this.wallets = user.wallets;
    }
}

module.exports = {
    UserSchema: UserSchema,
    User: User,
    ClientUser: ClientUser,
}
const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

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
});
const User = publicMongoose.model('User', UserSchema);

class PublicUser {
    constructor(user) {
        this.username = user.username;
        this.name = user.name;
        this.verified = user.verified;
        this.cash = user.cash;
        this.demoCash = user.demoCash;
        this.avatar = user.avatar;
    }
}

module.exports = {
    UserSchema: UserSchema,
    User: User,
    PublicUser: PublicUser,
}
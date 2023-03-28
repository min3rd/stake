const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const UserSchema = new Schema({
    username: { type: String, require: true, index: true, },
    password: { type: String, require: true, },
    name: { type: String, },
    phone: { type: String, },
    accessToken: { type: String, },
    refreshToken: { type: String, },
    verified: { type: Boolean, default: false, },
    cash: { type: Number, default: 0, },
    demoCash: { type: Number, default: 0, },
});
const User = publicMongoose.model('User', UserSchema);
module.exports = {
    UserSchema: UserSchema,
    User: User,
}
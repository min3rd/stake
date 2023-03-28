const userMongoose = require("../config/userMongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
    username: { type: String, require: true, index: true, },
    password: { type: String, require: true, },
    name: { type: String, require: true },

});
module.exports = UserSchema;

const User = userMongoose.model('user', UserSchema);

module.exports = User;
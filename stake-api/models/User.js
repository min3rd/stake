const userMongoose = require("../config/userMongoose");
const UserSchema = require("./schemas/UserSchema");

const User = userMongoose.model('user', UserSchema);

module.exports = User;
const { Schema } = require("mongoose");
const adminMongoose = require("../config/adminMongoose");

const AdminUserSchema = new Schema({
    username: { type: String, require: true, index: true, },
    password: { type: String, require: true, },
    name: { type: String, },
    avatar: { type: String, },
    phone: { type: String, },
    accessToken: { type: String, },
    refreshToken: { type: String, },
    refreshExpiryAt: { type: Date, default: new Date(), },
    socketToken: { type: String },
    verified: { type: Boolean, default: false, },
});
const AdminUser = adminMongoose.model('AdminUser', AdminUserSchema);
module.exports = AdminUser;
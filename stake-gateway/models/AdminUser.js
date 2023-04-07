const { Schema } = require("mongoose");
const adminMongoose = require("../config/adminMongoose");

const AdminUserSchema = new Schema({

});
const AdminUser = adminMongoose.model('AdminUser', AdminUserSchema);
module.exports = AdminUser;
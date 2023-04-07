const AdminUser = require("../models/AdminUser");
const { security } = require("../services/security");
const baseMigration = require("./BaseMigration");

const admin_user_2023040701 = baseMigration.create('2023040701_admin_user', () => {
    let adminUser = new AdminUser({
        username: 'admin',
        password: security.hashPassword('1q2w3e4r@@RR'),
    });
    adminUser.save();
});
module.exports = admin_user_2023040701;
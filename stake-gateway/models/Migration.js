const { Schema } = require("mongoose");
const adminMongoose = require("../config/adminMongoose");

const MigrationSchema = new Schema({
    version: { type: String, require: true, index: true },
});
const Migration = adminMongoose.model("Migration", MigrationSchema);
module.exports = Migration;
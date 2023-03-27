const { Schema } = require("mongoose");
const RoleTypes = require("../../enums/RoleTypes");
const RoleSchema = new Schema({
    role: {
        type: Schema.Types.String,
        enum: RoleTypes,
        default: ''
    }
});
module.exports = RoleSchema;
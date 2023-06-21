const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");
const { Status } = require("../common/constants");

const PartnerRegistrationSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    username: { type: String, require: true, },
    name: { type: String, require: true, },
    time: { type: Date, default: new Date(), },
    phone: { type: String, },
    email: { type: String, },
    telegram: { type: String, },
    zalo: { type: String },
    facebook: { type: String, },
    address: { type: String, },
    status: { type: Number, enum: Object.values(Status), default: Status.PENDING, },
});
const PartnerRegistration = publicMongoose.model('PartnerRegistration', PartnerRegistrationSchema);
module.exports = PartnerRegistration;
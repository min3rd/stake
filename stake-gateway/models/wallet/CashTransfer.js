const { Schema } = require("mongoose");
const { publicMongoose } = require("../../config/publicMongoose");

const CashTransferSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    destinationId: { type: String, require: true, index: true, },
    destinationUsername: { type: String, require: true, index: true, },
    time: { type: Date, default: new Date(), },
    amount: { type: Number, default: 0, },
    status: { type: Number, default: 0, },
});

const CashTransfer = publicMongoose.model('CashTransfer', CashTransferSchema);
module.exports = CashTransfer;
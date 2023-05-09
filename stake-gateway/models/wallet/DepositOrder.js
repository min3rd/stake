const { Schema } = require("mongoose");
const { publicMongoose } = require("../../config/publicMongoose");

const DepositOrderSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    username: { type: String, index: true, },
    time: { type: Date, default: new Date(), },
    updated: { type: Date, default: new Date(), },
    masterAddress: { type: String, index: true, },
    userAddress: { type: String, index: true, },
    transactionId: { type: String, },
    amount: { type: Number, },
    flag: { type: Number, default: 0, },
    status: { type: Number, default: 0, index: true, },
});

const DepositOrder = publicMongoose.model('DepositOrder', DepositOrderSchema);
module.exports = DepositOrder;
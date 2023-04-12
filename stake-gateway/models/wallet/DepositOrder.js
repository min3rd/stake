const { Schema } = require("mongoose");
const { publicMongoose } = require("../../config/publicMongoose");

const DepositOrderSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    time: { type: Date, default: new Date(), },
    masterAddress: { type: String, },
    userAddress: { type: String, },
    transactionId: { type: String, },
    amount: { type: Number, },
    flag: { type: Number, default: 0, },
});

const DepositOrder = publicMongoose.model('DepositOrder', DepositOrderSchema);
module.exports = DepositOrder;
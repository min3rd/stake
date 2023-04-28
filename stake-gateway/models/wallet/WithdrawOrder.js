const { Schema } = require("mongoose");
const { publicMongoose } = require("../../config/publicMongoose");

const WithdrawOrderSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    time: { type: Date, default: new Date(), },
    masterAddress: { type: String, },
    userAddress: { type: String, require: true, },
    transactionId: { type: String, },
    amount: { type: Number, default: 0, },
    memo: { type: String },
    flag: { type: Number, default: 0, },
    status: { type: Number, default: 0, },
});
const WithdrawOrder = publicMongoose.model('WithdrawOrder', WithdrawOrderSchema);
module.exports = WithdrawOrder;
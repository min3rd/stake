const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");
const { TradingCallType } = require("../common/constants");
const TradingCallSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    symbol: { type: String, require: true, index: true, },
    time: { type: Date, require: true, index: true, },
    openTime: { type: Date, require: true, index: true, },
    closeTime: { type: Date, require: true, index: true, },
    type: { type: Number, enum: TradingCallType, require: true, },
    betCash: { type: Number, require: true, default: 0 },
    benefitPercent: { type: Number, require: true },
    benefit: { type: Number, require: true, },
    userPaid: { type: Boolean, require: true, default: false, },
    masterPaid: { type: Boolean, require: true, default: false, },
});
const TradingCall = publicMongoose.model("TradingCall", TradingCallSchema);
module.exports = TradingCall;
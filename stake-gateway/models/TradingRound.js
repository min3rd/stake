const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const TradingRoundSchema = new Schema({
    symbol: { type: String, require: true, index: true, },
    time: { type: Date, require: true, index: true, },
    openTime: { type: Date, require: true, index: true, },
    closeTime: { type: Date, require: true, index: true, },
    openPrice: { type: Number, require: true, default: 0, },
    highPrice: { type: Number, require: true, default: 0, },
    lowPrice: { type: Number, require: true, default: 0, },
    closePrice: { type: Number, require: true, default: 0, },
    canTrade: { type: Boolean, require: true, default: false, },
    closed: { type: Boolean, default: false, },
    buyAmount: { type: Number, default: 0 },
    sellAmount: { type: Number, default: 0 },
    buyCount: { type: Number, default: 0 },
    sellCount: { type: Number, default: 0 },
});
const TradingRound = publicMongoose.model('TradingRound', TradingRoundSchema);
module.exports = TradingRound;
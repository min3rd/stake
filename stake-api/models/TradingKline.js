const { Schema } = require("mongoose");

const TradingKlineSchema = new Schema({
    startTime: { type: Date, require: true, index: true, },
    closeTime: { type: Date, require: true, index: true, },
    symbol: { type: Date, require: true, index: true, },
    openPrice: { type: Number, require: true },
    highPrice: { type: Number, require: true },
    lowPrice: { type: Number, require: true },
    closePrice: { type: Number, require: true },
    baseAssetVolume: { type: Number },
    numberOfTrades: { type: Number },
    quoteAssetVolume: { type: Number },
    closed: { type: Boolean, require: true, default: false, },
    trading: { type: Boolean, require: true, default: false, },
});
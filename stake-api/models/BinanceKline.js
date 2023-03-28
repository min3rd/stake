const adminMongoose = require("../config/adminMongoose");
const { Schema } = require('mongoose')
const BinanceKlineSchema = new Schema({
    symbol: { type: String, require: true, index: true, },
    startTime: { type: Date, require: true, index: true, },
    closeTime: { type: Date, require: true, index: true, },
    closed: { type: Boolean, require: true, default: false, },
    openPrice: { type: Number, require: true, },
    highPrice: { type: Number, require: true, },
    lowPrice: { type: Number, require: true, },
    closePrice: { type: Number, require: true, },
    baseAssetVolume: { type: Number },
    numberOfTrades: { type: Number },
    quoteAssetVolume: { type: Number },
});

module.exports = BinanceKlineSchema;
let BinanceKline = adminMongoose.model('BinanceKline', BinanceKlineSchema);
module.exports = BinanceKline;
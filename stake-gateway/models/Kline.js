const { Schema } = require('mongoose');
const { publicMongoose } = require('../config/publicMongoose');
const KlineSchema = new Schema({
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

    analysisBuyAmount: { type: Number, default: 0 },
    analysisSellAmount: { type: Number, default: 0 },
    analysisBuyCount: { type: Number, default: 0 },
    analysisSellCount: { type: Number, default: 0 },
    analysisBuy: { type: Number, default: 0 },
    analysisSell: { type: Number, default: 0 },
});
const Kline = publicMongoose.model('Kline', KlineSchema);
module.exports = Kline;
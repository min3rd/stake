const { Schema } = require('mongoose');
const { publicMongoose } = require('../config/publicMongoose');
const KlineSchema = new Schema({
    symbol: { type: String, require: true, index: true, },
    openTime: { type: Date, require: true, index: true, },
    closeTime: { type: Date, require: true, index: true, },
    openPrice: { type: Number, require: true, default: 0, },
    highPrice: { type: Number, require: true, default: 0, },
    lowPrice: { type: Number, require: true, default: 0, },
    closePrice: { type: Number, require: true, default: 0, },
    closed: { type: Boolean, default: false, },
});
const Kline = publicMongoose.model('Kline', KlineSchema);
module.exports = {
    KlineSchema: KlineSchema,
    Kline: Kline,
}
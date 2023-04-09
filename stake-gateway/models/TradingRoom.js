const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const TradingRoomSchema = new Schema({
    symbol: { type: String, require: true, },
    benefitPercent: { type: Number, require: true, },
    priceRangePercent: { type: Number, default: 5 },
    sliderMin: { type: Number, default: 10, },
    sliderMax: { type: Number, default: 100, },
    sliderStep: { type: Number, default: 10, },
    blockingTime: { type: Number, default: process.env.DEFAULT_BLOCKING_TIME ?? 5000 },
});
const TradingRoom = publicMongoose.model('TradingRoom', TradingRoomSchema);
module.exports = TradingRoom;
const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");
const { TradingSymbol } = require("../config/trading.config");

const TradingRoomSchema = new Schema({
    symbol: { type: String, enum: TradingSymbol },
    priceRangePercent: { type: Number, default: 5 },
});
const TradingRoom = publicMongoose.model('TradingRoom', TradingRoomSchema);
module.exports = TradingRoom;
const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const MonthlyProfitSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    username: { type: String, },
    name: { type: String, },
    time: { type: Date, require: true, index: true, default: new Date(), },
    winAmount: { type: Number, default: 0, },
    loseAmount: { type: Number, default: 0, },
    winCount: { type: Number, default: 0, },
    loseCount: { type: Number, default: 0, },
    buyCount: { type: Number, default: 0, },
    sellCount: { type: Number, default: 0, },
});

const MonthlyProfit = publicMongoose.model('MonthlyProfit', MonthlyProfitSchema);
module.exports = MonthlyProfit;
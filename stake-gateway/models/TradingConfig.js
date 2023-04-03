const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const TradingConfigSchema = new Schema({
    symbol: { type: String, require: true, index: true, },
    benefitPercent: { type: Number, require: true, },
    sliderMin: { type: Number },
    sliderMax: { type: Number },
    sliderStep: { type: Number },
});
const TradingConfig = publicMongoose.model("TradingConfig", TradingConfigSchema);
module.exports = TradingConfig;
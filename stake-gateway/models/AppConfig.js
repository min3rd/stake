const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const AppConfigSchema = new Schema({
    PRICE_RANGE_PERCENT: { type: Number, default: process.env.PRICE_RANGE_PERCENT ?? 0.5, },
    TRADING_BENEFIT_PERCENT: { type: Number, default: process.env.TRADING_BENEFIT_PERCENT ?? 195, },
    DEFAULT_BLOCKING_TIME: { type: Number, default: process.env.DEFAULT_BLOCKING_TIME ?? 30000, },
    MASTER_ADDRESS: { type: String, default: process.env.MASTER_ADDRESS ?? '0x92b325Fa6e701f46EA66B262BBaC4E1596CDA2Cc', },
    withdrawMinValue: { type: Number, default: process.env.WITHDRAW_MIN_VALUE ?? 5, },
});

const AppConfig = publicMongoose.model('AppConfig', AppConfigSchema);
module.exports = AppConfig;
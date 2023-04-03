const TradingConfig = require("../models/TradingConfig");
const baseMigration = require("./BaseMigration");

const trading_config_2023040301 = baseMigration.create('2023040301_trading_config', async () => {
    if (await TradingConfig.findOne({
        symbol: 'default'
    })) {
        return
    }
    let defaultConfig = new TradingConfig({
        symbol: 'default',
        benefitPercent: 195,
        sliderMin: 10,
        sliderMax: 100,
        sliderStep: 10,
    });
    defaultConfig.save();
});
module.exports = trading_config_2023040301;
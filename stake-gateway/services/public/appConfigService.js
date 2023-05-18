const AppConfig = require("../../models/AppConfig")

const getAppConfig = async (req, res, next) => {
    let appConfig = await AppConfig.findOne({});
    let mapped = {
        _id: appConfig._id,
        withdrawMinValue: appConfig.withdrawMinValue,
        MASTER_ADDRESS: appConfig.MASTER_ADDRESS,
        TRADING_BENEFIT_PERCENT: appConfig.TRADING_BENEFIT_PERCENT,
        DEFAULT_BLOCKING_TIME: appConfig.DEFAULT_BLOCKING_TIME,
        __v: appConfig.__v,
    }
    res.json(mapped);
}

module.exports = {
    getAppConfig: getAppConfig,
}
const AppConfig = require("../../models/AppConfig")

const getAppConfig = async (req, res, next) => {
    let appConfig = await AppConfig.findOne({});
    res.json(appConfig);
}

module.exports = {
    getAppConfig: getAppConfig,
}
const AppConfig = require("../../../models/AppConfig")

const getAppConfig = async function (req, res, next) {
    let appConfig = await AppConfig.findOne({});
    res.json(appConfig);
}

const updateAppConfig = async function (req, res, next) {
    await AppConfig.updateOne({
        _id: req.body._id,
    }, req.body);
    let appConfig = await AppConfig.findOne({});
    res.json(appConfig);
}

module.exports = {
    getAppConfig: getAppConfig,
    updateAppConfig: updateAppConfig,
}
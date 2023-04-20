const AppConfig = require("../models/AppConfig");
const baseMigration = require("./BaseMigration");

const app_config_2023042001 = baseMigration.create('2023042001_appconfig', async () => {
    let appConfig = new AppConfig({});
    await appConfig.save();
});
module.exports = app_config_2023042001;
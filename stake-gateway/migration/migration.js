const logger = require("../common/logger");
const trading_room_2023033001 = require("./2023033001_trading_rooms");
const admin_user_2023040701 = require("./2023040701_admin_user");
const app_config_2023042001 = require("./2023042001_appconfig");

const migration = async function () {
    logger.info('migrations', '----------MIGRATION----------')
    await trading_room_2023033001.run();
    await admin_user_2023040701.run();
    await app_config_2023042001.run();
    logger.info('migrations', '----------MIGRATION END------');
}
module.exports = migration;
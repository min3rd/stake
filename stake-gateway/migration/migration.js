const logger = require("../common/logger");
const trading_room_2023033001 = require("./2023033001_trading_rooms");
const trading_config_2023040301 = require("./2023040301_trading_config");
const admin_user_2023040701 = require("./2023040701_admin_user");

const migration = async function () {
    logger.info('----------MIGRATION----------')
    await trading_room_2023033001.run();
    await trading_config_2023040301.run();
    await admin_user_2023040701.run();
    logger.info('----------MIGRATION END------');
}
module.exports = migration;
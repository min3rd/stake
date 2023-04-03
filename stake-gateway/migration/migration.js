const trading_room_2023033001 = require("./2023033001_trading_rooms");
const trading_config_2023040301 = require("./2023040301_trading_config");

const migration = async function () {
    console.log('----------MIGRATION----------');
    await trading_room_2023033001.run();
    await trading_config_2023040301.run();
    console.log('----------MIGRATION END------');
}
module.exports = migration;
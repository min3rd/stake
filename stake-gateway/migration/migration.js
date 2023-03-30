const trading_room_2023033001 = require("./2023033001_trading_rooms");

const migration = async function () {
    console.log('----------MIGRATION----------');
    await trading_room_2023033001.run();
    console.log('----------MIGRATION END------');
}
module.exports = migration;
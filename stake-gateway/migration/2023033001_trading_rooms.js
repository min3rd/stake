const logger = require("../common/logger");
const { TradingRoom } = require("../models/TradingRoom");
const baseMigration = require("./BaseMigration");

const trading_room_2023033001 = baseMigration.create('2023033001_trading_rooms', async () => {
    let roomSymbols = (process.env.TRADING_SYMBOLS || 'BTCUSDT ETHUSDT BNBUSDT').split(' ');
    logger.debug('migration', `${roomSymbols}`);
    for (let roomSymbol of roomSymbols) {
        let tradingRoom = new TradingRoom({
            symbol: roomSymbol,
        });
        try {
            tradingRoom = await tradingRoom.save();
            logger.debug('migrations', `${JSON.stringify(tradingRoom)}`);
        } catch (e) {
            logger.error('migrations', `${e}`);
        }
    }
});
module.exports = trading_room_2023033001;
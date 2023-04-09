const TradingRoom = require("../../models/TradingRoom")


const getTradingRooms = async function (req, res, next) {
    let tradingRooms = await TradingRoom.find({});
    res.json(tradingRooms);
}


module.exports = {
    getTradingRooms: getTradingRooms,
}
const { SocketEvent } = require("../config/socket.config");
const TradingRoom = require("../models/TradingRoom");
const tradingSocket = function (publicIo) {
    this.interval = setInterval(async () => {
        let tradingRooms = await TradingRoom.find({});
        for (let tradingRoom of tradingRooms) {
            publicIo.to(tradingRoom.symbol).emit(SocketEvent.NOW, new Date().getTime());
            publicIo.to(tradingRoom.symbol).emit(SocketEvent.ROOM_JOIN, tradingRoom.symbol);
        }
    }, process.env.UPDATE_TRADING_KLINE_DURARION || 1000);
}

module.exports = {
    tradingSocket: tradingSocket,
}
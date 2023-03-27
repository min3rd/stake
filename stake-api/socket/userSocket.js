const { SocketRoom, SocketEvent } = require("../config/socket");
const BinanceKline = require("../models/BinanceKline");

module.exports = function (io) {
    let clientIo = io.of('/client');
    setInterval(() => {
        BinanceKline.find({
            symbol: 'BTCUSDT'
        }).sort({ startTime: 1 }).limit(60).exec().then(klines => {
            clientIo.to(SocketRoom.TRADING.BTCUSDT).emit('kline', klines);
        })
        clientIo.to(SocketRoom.TRADING.ETHUSDT).emit('kline', 'ETHUSDT');
        clientIo.to(SocketRoom.TRADING.BNBUSDT).emit('kline', 'BNBUSDT');
    }, 1000);

    clientIo.on('connection', (socket) => {
        socket.on(SocketEvent.ROOM.JOIN, (data) => {
            socket.join(data);
        });
        socket.on('room:left', (data) => {
        });
    });
};
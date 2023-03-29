const { SocketRoom, SocketEvent } = require("../config/socket.config");
const tradingSocket = function (publicIo) {
    this.interval = setInterval(() => {
        for (let key in SocketRoom) {
            publicIo.to(SocketRoom[key]).emit(SocketEvent.NOW, new Date().getTime());
        }
    }, 1000);
}

module.exports = {
    tradingSocket: tradingSocket,
}
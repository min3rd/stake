const { SocketRoom, SocketEvent } = require("../config/socket.config");
const { tradingSocket } = require("../trading/tradingSocket");

const publicSocket = function (io) {
    const publicIo = io.of('/public');
    publicIo.on('connection', (socket) => {
        socket.on(SocketEvent.ROOM_JOIN, (data) => {
            socket.join(data);
            publicIo.to(data).emit(SocketEvent.ROOM_JOIN, data);
        });
        socket.on(SocketEvent.ROOM_LEFT, data => {
            socket.leave(data);
        });
    });
    tradingSocket(publicIo);
    return publicIo;
}
module.exports = publicSocket;
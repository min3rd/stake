const { SocketEvent } = require("../config/socket.config");
const { tradingSocket } = require("../trading/tradingSocket");

const userSocket = function (io) {
    const userIo = io.of('/user');
    tradingSocket(userIo);
    userIo.on('connection', (socket) => {
        socket.on(SocketEvent.ROOM_JOIN, (data) => {
            socket.join(data);
            userIo.to(data).emit(SocketEvent.ROOM_JOIN, data);
        });
        socket.on(SocketEvent.ROOM_LEFT, data => {
            socket.leave(data);
        });
    });
    return userIo;
}
module.exports = userSocket;
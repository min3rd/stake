const { SocketRoom, SocketEvent } = require("../config/socket");
module.exports = function (io) {
    let clientIo = io.of('/client');
    clientIo.on('connection', (socket) => {
        socket.on(SocketEvent.ROOM_JOIN, (data) => {
            for (let key in SocketRoom) {
                if (SocketRoom[key] == data) {
                    socket.join(SocketRoom[key]);
                }
            }
        });
        socket.on(SocketEvent.ROOM_LEFT, (data) => {
            socket.leave(data);
        });
    });
};
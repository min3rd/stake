const ErrorCode = require("../common/errorCode");
const { SocketEvent, SocketRoom } = require("../config/socket.config");
const { verifyToken } = require("../services/admin/adminService");
const { getLatestTradingRounds } = require("../services/admin/adminTradingService");

function isValid(socket) {
    if (!verifyToken(socket)) {
        return false;
    }
    return true;
}

async function updateTradingRounds(adminIo) {
    let tradingRounds = await getLatestTradingRounds();
    if (tradingRounds.length > 0) {
        for (let tradingRound of tradingRounds) {
            adminIo.to(SocketRoom.ADMIN_TRADING).emit(SocketEvent.ADMIN_TRADING_ROUND, tradingRound);
        }
    }
    setTimeout(() => {
        updateTradingRounds(adminIo);
    }, process.env.UPDATE_ADMIN_TRADING_ROUND_DURARION || 1000);
}

const adminSocket = function (io) {
    const adminIo = io.of('/admin');
    adminIo.use((socket, next) => {
        if (isValid(socket)) {
            next();
        } else {
            next(new Error(ErrorCode.UNAUTHORIZATION));
        }
    });
    adminIo.on(SocketEvent.connect, (socket) => {
        socket.on(SocketEvent.ROOM_JOIN, room => {
            socket.join(room);
        })
        socket.on(SocketEvent.ROOM_LEFT, (room) => {
            socket.leave(room);
        });
    });
    updateTradingRounds(adminIo);
    return adminIo;
}

module.exports = adminSocket;
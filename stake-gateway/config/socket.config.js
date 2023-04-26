const SocketEvent = {
    ROOM_JOIN: "ROOM_JOIN",
    ROOM_LEFT: "ROOM_LEFT",
    NOW: "NOW",
    KLINE: "KLINE",
    USER: "USER",
    NOTIFICATION: "NOTIFICATION",
    disconnect: 'disconnect',
    connect: 'connect',
    TRADING_CONFIG: 'TRADING_CONFIG',

    ADMIN_TRADING_ROUND: 'ADMIN_TRADING_ROUND',
    ADMIN_DEPOSIT_ORDER: 'ADMIN_DEPOSIT_ORDER',
}
const SocketRoom = {
    ADMIN_TRADING: 'ADMIN_TRADING',
}

module.exports = {
    SocketEvent: SocketEvent,
    SocketRoom: SocketRoom,
}
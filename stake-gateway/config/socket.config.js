const SocketEvent = {
    ROOM_JOIN: "ROOM_JOIN",
    ROOM_LEFT: "ROOM_LEFT",
    NOW: "NOW",
    KLINE: "KLINE",
    USER: "USER",
    NOTIFICATION: "NOTIFICATION",
    
}
const SocketRoom = {
    TRADING_BTCUSDT: 'BTCUSDT',
    TRADING_ETHUSDT: 'ETHUSDT',
    TRADING_BNBUSDT: 'BNBUSDT',
}

module.exports = {
    SocketEvent: SocketEvent,
    SocketRoom: SocketRoom,
}
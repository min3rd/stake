const SocketEvent = {
    ROOM_JOIN: "ROOM_JOIN",
    ROOM_LEFT: "ROOM_LEFT",
    NOW: "NOW",
    KLINE: "KLINE",
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
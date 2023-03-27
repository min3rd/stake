const SocketEvent = {
    ROOM: {
        JOIN: 'room:join'
    }
}

const SocketRoom = {
    TRADING: {
        BTCUSDT: 'trading/btcusdt',
        ETHUSDT: 'trading/ethusdt',
        BNBUSDT: 'trading/bnbusdt',
    }
};

module.exports = {
    SocketEvent: SocketEvent,
    SocketRoom: SocketRoom
}
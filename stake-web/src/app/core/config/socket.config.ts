export enum SocketRoom {
    TRADING_BTCUSDT = 'BTCUSDT',
    TRADING_ETHUSDT = 'ETHUSDT',
    TRADING_BNBUSDT = 'BNBUSDT',
};

export enum SocketEvent {
    ROOM_JOIN = 'ROOM_JOIN',
    ROOM_LEFT = 'ROOM_LEFT',
    NOW = 'NOW',
    KLINE = 'KLINE',
}

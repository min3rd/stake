export enum SocketEvent {
    ROOM_JOIN = 'ROOM_JOIN',
    ROOM_LEFT = 'ROOM_LEFT',
    NOW = 'NOW',
    KLINE = 'KLINE',
    disconnect = 'disconnect',
    USER = 'USER',
    connect = 'connect',
    NOTIFICATION = 'NOTIFICATION',
    ADMIN_TRADING_ROUND = 'ADMIN_TRADING_ROUND',
}
export enum SocketRoom {
    ADMIN_TRADING = 'ADMIN_TRADING',
}
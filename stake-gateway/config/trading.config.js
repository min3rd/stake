const TradingSymbol = process.env.TRADING_SYMBOLS.split(' ') ?? ['BTCUSDT', 'ETHUSDT', 'BNBUSDT',];
module.exports = {
    TradingSymbol: TradingSymbol,
}
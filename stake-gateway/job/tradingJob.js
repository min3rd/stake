const binanceApi = require("../common/binanceApi");
const TimeUtils = require("../common/timeUtils");
const { SocketEvent } = require("../config/socket.config");
const Kline = require("../models/Kline");
const TradingRoom = require("../models/TradingRoom");
const TradingRound = require("../models/TradingRound");
async function updateRound() {
    let now = new Date();
    let openTime = TimeUtils.getOpenDate(now);
    let closeTime = TimeUtils.getCloseDate(now);
    let tradingRooms = await TradingRoom.find({});
    for (let tradingRoom of tradingRooms) {
        let tradingRound = await TradingRound.findOne({
            symbol: tradingRoom.symbol,
            openTime: openTime,
            closeTime: closeTime,
        });
        if (!tradingRound) {
            let apiUrl = "/api/v3/ticker/price?symbol=" + `${tradingRoom.symbol}`;
            try {
                let response = await binanceApi.get(apiUrl);
                let random = Math.random();
                let openPrice = parseFloat(response.data.price);
                let priceRange = openPrice * (tradingRoom.priceRangePercent || process.env.PRICE_RANGE_PERCENT || 5) / 100;
                let highPrice = openPrice + priceRange * Math.random();
                let lowPrice = openPrice - priceRange * Math.random();
                let closePrice = openPrice + priceRange * Math.random();
                if (random >= 0.5) {
                    closePrice = openPrice - priceRange * Math.random();
                }
                tradingRound = new TradingRound({
                    symbol: tradingRoom.symbol,
                    openTime: openTime,
                    closeTime: closeTime,
                    openPrice: openPrice,
                    highPrice: highPrice,
                    lowPrice: lowPrice,
                    closePrice: closePrice,
                    time: new Date(),
                    canTrade: now % 2 == 0,
                });
                tradingRound = await tradingRound.save();
            } catch (e) {
                console.error(`-----updateRound: ${tradingRoom.symbol} ${e}`);
            }
        }
    }
    setTimeout(updateRound, process.env.UPDATE_TRADING_ROUND_DURARION || 1000);
}
async function updateKline(publicIo) {
    let now = new Date();
    let openTime = TimeUtils.getOpenDate(now);
    let closeTime = TimeUtils.getCloseDate(now);
    let tradingRooms = await TradingRoom.find({});
    for (let tradingRoom of tradingRooms) {
        let tradingRound = await TradingRound.findOne({
            symbol: tradingRoom.symbol,
            openTime: openTime,
            closeTime: closeTime,
        });
        if (!tradingRound) {
            continue;
        }
        let priceRange = tradingRound.openPrice * (tradingRoom.priceRangePercent || process.env.PRICE_RANGE_PERCENT || 5) / 100;
        let kline = new Kline({
            symbol: tradingRound.symbol,
            openTime: tradingRound.openTime,
            closeTime: tradingRound.closeTime,
            openPrice: tradingRound.openPrice,
            highPrice: tradingRound.highPrice,
            lowPrice: tradingRound.lowPrice,
            closePrice: tradingRound.closePrice + ((Math.random() >= 0.5) ? Math.random() * priceRange : - Math.random() * priceRange),
            canTrade: tradingRound.canTrade,
            time: new Date(),
        });
        kline = await kline.save();
        publicIo.to(tradingRoom.symbol).emit(SocketEvent.KLINE, kline);
    }
    setTimeout(() => {
        updateKline(publicIo)
    }, process.env.UPDATE_TRADING_KLINE_DURARION || 1000);
}
const tradingJob = function (publicIo) {
    updateRound();
    updateKline(publicIo);
}

module.exports = tradingJob;
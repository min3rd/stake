const Kline = require("../models/Kline");
const TradingRoom = require("../models/TradingRoom");
const TradingRound = require("../models/TradingRound");

const tradingRooms = async function (req, res) {
    let tradingRooms = await TradingRoom.find({});
    res.json(tradingRooms.map(e => {
        return {
            id: e._id.toString(),
            symbol: e.symbol,
        };
    }));
}
const latestKlines = async function (req, res) {
    let klines = await Kline.find({
        symbol: req.params.symbol,
    }).sort({ openTime: 'desc' }).limit(req.query.size || 60);
    res.json(klines);
}
const latestRounds = async function (req, res) {
    let rounds = await TradingRound.find({
        symbol: req.params.symbol,
    }).sort({ openTime: 'desc' }).limit(req.query.size || 60);
    res.json(rounds.map(e => {
        return {
            symbol: e.symbol,
            openTime: e.openTime,
            closeTime: e.closeTime,
            openPrice: e.openPrice,
            highPrice: e.highPrice,
            lowPrice: e.lowPrice,
            closePrice: e.closePrice,
        };
    }));
}

module.exports = {
    tradingRooms: tradingRooms,
    latestKlines: latestKlines,
    latestRounds: latestRounds,
}
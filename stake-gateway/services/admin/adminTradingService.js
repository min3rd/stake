const badRequestError = require("../../common/badRequestError");
const { TradingCallType } = require("../../common/constants");
const ErrorCode = require("../../common/errorCode");
const { SocketEvent } = require("../../config/socket.config");
const engine = require("../../engine");
const TradingRoom = require("../../models/TradingRoom");
const TradingRound = require("../../models/TradingRound");


const getTradingRooms = async function (req, res, next) {
    let tradingRooms = await TradingRoom.find({});
    res.json(tradingRooms);
}
const getLatestTradingRounds = async function () {
    let tradingRooms = await TradingRoom.find({});
    if (!tradingRooms) {
        return res.json([]);
    }
    let tradingRounds = [];
    for (let tradingRoom of tradingRooms) {
        let tradingRound = await TradingRound.findOne({
            symbol: tradingRoom.symbol,
        }).sort({
            closeTime: -1
        }).limit(1);
        if (!tradingRound) {
            continue;
        }
        tradingRounds.push(tradingRound);
    }
    return tradingRounds;
}

const handle_updateSwithTradingRoundResult = async function (req, res, next) {
    let tradingRound = await TradingRound.findById(req.body._id);
    if (!tradingRound) {
        return next(badRequestError.make(ErrorCode.TRADING_ROUND_NOT_FOUND));
    }
    let offsetPrice = Math.abs(tradingRound.closePrice - tradingRound.openPrice);
    if (req.body.type == TradingCallType.BUY) {
        tradingRound.closePrice = tradingRound.openPrice + offsetPrice;
    } else if (req.body.type == TradingCallType.SELL) {
        tradingRound.closePrice = tradingRound.openPrice - offsetPrice;
    }
    tradingRound = await tradingRound.save();
    if (!tradingRound) {
        return next(badRequestError.make(ErrorCode.TRADING_ROUND_COULD_NOT_SAVE))
    }
    res.json(tradingRound);
}

const handle_updateTradingRoom = async function (req, res, next) {
    let tradingRoom = await TradingRoom.findById(req.body._id);
    if (!tradingRoom) {
        return next(badRequestError.make(ErrorCode.TRADING_ROOM_NOT_FOUND));
    }
    tradingRoom.symbol = req.body.symbol;
    tradingRoom.benefitPercent = parseFloat(req.body.benefitPercent);
    tradingRoom.blockingTime = parseFloat(req.body.blockingTime);
    tradingRoom.priceRangePercent = parseFloat(req.body.priceRangePercent);
    tradingRoom.sliderMin = parseFloat(req.body.sliderMin);
    tradingRoom.sliderMax = parseFloat(req.body.sliderMax);
    tradingRoom.sliderStep = parseFloat(req.body.sliderStep);
    tradingRoom = await tradingRoom.save();
    if (!tradingRoom) {
        return next(badRequestError.make(ErrorCode.TRADING_ROOM_COULD_NOT_SAVE));
    }
    engine._publicIo.emit(SocketEvent.TRADING_CONFIG, {
        benefitPercent: tradingRoom.benefitPercent,
        sliderMax: tradingRoom.sliderMax,
        sliderMin: tradingRoom.sliderMin,
        sliderStep: tradingRoom.sliderStep,
        symbol: tradingRoom.symbol,
        blockingTime: tradingRoom.blockingTime,
    });
    res.json(tradingRoom);
}


const handle_getLatestTradingRounds = async function (req, res, next) {
    res.json(await getLatestTradingRounds());
}


module.exports = {
    getTradingRooms: getTradingRooms,
    getLatestTradingRounds: getLatestTradingRounds,
    handle_getLatestTradingRounds: handle_getLatestTradingRounds,
    handle_updateSwithTradingRoundResult: handle_updateSwithTradingRoundResult,
    handle_updateTradingRoom: handle_updateTradingRoom,
}
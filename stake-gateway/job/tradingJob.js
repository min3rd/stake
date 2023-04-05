const binanceApi = require("../common/binanceApi");
const { TradingCallType, CashAccount } = require("../common/constants");
const logger = require("../common/logger");
const TimeUtils = require("../common/timeUtils");
const { publicMongoose } = require("../config/publicMongoose");
const { SocketEvent } = require("../config/socket.config");
const Kline = require("../models/Kline");
const TradingCall = require("../models/TradingCall");
const TradingRoom = require("../models/TradingRoom");
const TradingRound = require("../models/TradingRound");
const { User } = require("../models/User");
async function updateRound(publicIo) {
    const session = await publicMongoose.startSession();
    let now = new Date();
    let openTime = TimeUtils.getOpenDate(now);
    let closeTime = TimeUtils.getCloseDate(now);
    let tradingRooms = await TradingRoom.find({});
    await session.startTransaction()
    try {
        for (let tradingRoom of tradingRooms) {
            let tradingRound = await TradingRound.findOne({
                symbol: tradingRoom.symbol,
                openTime: openTime,
                closeTime: closeTime,
            });
            if (!tradingRound) {
                let preOpenTime = TimeUtils.getPreviousOpenDate(now);
                let preCloseTime = TimeUtils.getPreviousCloseDate(now);
                let previousRound = await TradingRound.findOne({
                    symbol: tradingRoom.symbol,
                    openTime: preOpenTime,
                    closeTime: preCloseTime,
                });
                let openPrice = 0;
                if (!previousRound) {
                    try {
                        let apiUrl = "/api/v3/ticker/price?symbol=" + `${tradingRoom.symbol}`;
                        let response = await binanceApi.get(apiUrl);
                        openPrice = parseFloat(response.data.price);
                    } catch (e) {
                        console.error(`-----updateRound: ${tradingRoom.symbol} ${e}`);
                        continue;
                    }
                } else {
                    openPrice = previousRound.closePrice;
                    previousRound.closed = now.getTime() > previousRound.closeTime.getTime();
                    previousRound = await previousRound.save();
                    publicIo.to(tradingRoom.symbol).emit(SocketEvent.KLINE, {
                        symbol: previousRound.symbol,
                        time: previousRound.time,
                        openTime: previousRound.openTime,
                        closeTime: previousRound.closeTime,
                        openPrice: previousRound.openPrice,
                        highPrice: previousRound.highPrice,
                        lowPrice: previousRound.lowPrice,
                        closePrice: previousRound.closePrice,
                        closed: previousRound.closed,
                        canTrade: previousRound.canTrade,
                    });
                }
                let random = Math.random();
                let priceRange = openPrice * (tradingRoom.priceRangePercent || process.env.PRICE_RANGE_PERCENT || 0.5) / 100;
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
                logger.info('updateRound_CREATE_NEW_ROUND', JSON.stringify(tradingRound))
            }
        }
        await session.commitTransaction();
    } catch (e) {
        await session.abortTransaction()
    } finally {
        session.endSession();
    }
    setTimeout(() => {
        updateRound(publicIo);
    }, process.env.UPDATE_TRADING_ROUND_DURARION || 1000);
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
        let priceRange = tradingRound.openPrice * (tradingRoom.priceRangePercent || process.env.PRICE_RANGE_PERCENT || 0.5) / 100;
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
        publicIo.to(tradingRoom.symbol).emit(SocketEvent.KLINE, {
            symbol: kline.symbol,
            time: kline.time,
            openTime: kline.openTime,
            closeTime: kline.closeTime,
            openPrice: kline.openPrice,
            highPrice: kline.highPrice,
            lowPrice: kline.lowPrice,
            closePrice: kline.closePrice,
            closed: kline.closed,
            canTrade: kline.canTrade,
        });
    }
    setTimeout(() => {
        updateKline(publicIo)
    }, process.env.UPDATE_TRADING_KLINE_DURARION || 1000);
}
const updateCallResult = async function (publicIo, userIo) {
    let now = new Date();
    const session = await publicMongoose.startSession();
    try {
        await session.startTransaction();
        let tradingRounds = await TradingRoom.find({
            closeTime: {
                $lt: now
            },
            closed: false,
        });
        for (let tradingRound of tradingRounds) {
            let winType = tradingRound.closePrice - tradingRound.openPrice ? TradingCallType.BUY : TradingCallType.SELL;
            let tradingCalls = await TradingCall.find({
                symbol: tradingRound.symbol,
                openTime: tradingRound.openTime,
                closeTime: tradingRound.closeTime,
                masterPaid: false,
            });
            if (!tradingCalls) {
                continue;
            }
            for (let tradingCall of tradingCalls) {
                let user = await User.findById(tradingCall.userId);
                if (!user) {
                    continue;
                }
                if (tradingCall.type === winType) {
                    if (tradingCall.cashAccount == CashAccount.REAL) {
                        user.cash += tradingCall.benefit;
                    } else {
                        user.demoCash += tradingCall.benefit;
                    }
                }
                tradingCall.masterPaid = true;
                user = await user.save();
                tradingCall = await tradingCall.save();
                logger.info("updateCallResult_MASTER_PAID",`user=${JSON.stringify(user)} tradingCall=${JSON.stringify(tradingCall)}`);
            }
            tradingRound.closed = true;
            tradingRound = await tradingRound.save();
            logger.info("updateCallResult_UPDATE_ROUND",`round=${JSON.stringify(tradingRound)}`);
        }
        await session.commitTransaction();
    } catch (e) {

    } finally {
        session.endSession();
    }

    setTimeout(() => {
        updateCallResult();
    }, process.env.UPDATE_TRADING_CALL_DURARION)
}
const tradingJob = function (publicIo, userIo) {
    updateRound(publicIo);
    updateKline(publicIo);
    updateCallResult(publicIo);
}

module.exports = tradingJob;
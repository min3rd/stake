const badRequestError = require("../common/badRequestError");
const { TradingCallType, CashAccount } = require("../common/constants");
const ErrorCode = require("../common/errorCode");
const logger = require("../common/logger");
const TimeUtils = require("../common/timeUtils");
const { publicMongoose } = require("../config/publicMongoose");
const { SocketEvent } = require("../config/socket.config");
const engine = require("../engine");
const Kline = require("../models/Kline");
const TradingCall = require("../models/TradingCall");
const TradingConfig = require("../models/TradingConfig");
const TradingRoom = require("../models/TradingRoom");
const TradingRound = require("../models/TradingRound");
const { User, ClientUser } = require("../models/User");
const notificationService = require("./notificationService");

const tradingRooms = async function (req, res, next) {
    let tradingRooms = await TradingRoom.find({});
    res.json(tradingRooms.map(e => {
        return {
            id: e._id.toString(),
            symbol: e.symbol,
        };
    }));
}
const latestKlines = async function (req, res, next) {
    let klines = await Kline.find({
        symbol: req.params.symbol,
    }).sort({ openTime: 'desc' }).limit(req.query.size || 60);
    res.json(klines);
}
const latestRounds = async function (req, res, next) {
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
const tradingConfig = async function (req, res, next) {
    let config = await TradingConfig.findOne({
        symbol: req.params.symbol,
    });
    if (!config) {
        config = await TradingConfig.findOne({
            symbol: 'default',
        });
    }
    if (!config) {
        return next(badRequestError.make(ErrorCode.TRADING_CONFIG_NOT_EXISTS));
    }
    res.json(config);
}
const getTradingCalls = async function (req, res, next) {
    let now = new Date();
    let openTime = TimeUtils.getOpenDate(now);
    let closeTime = TimeUtils.getCloseDate(now);
    let tradingCalls = await TradingCall.find({
        userId: req.user.id,
        openTime: openTime,
        closeTime: closeTime,
    });
    res.json(tradingCalls);
}
const call = async function (req, res, next) {
    const session = await publicMongoose.startSession();
    const now = new Date();
    const openTime = TimeUtils.getOpenDate(now);
    const closeTime = TimeUtils.getCloseDate(now);
    try {
        await session.startTransaction();
        if (now.getTime() >= new Date(req.body.closeTime).getTime()) {
            await session.abortTransaction();
            logger.error('call_TRADING_ROUND_CLOSED', `data=${req.body}`);
            return next(badRequestError.make(ErrorCode.TRADING_ROUND_CLOSED));
        }
        let tradingRound = await TradingRound.findOne({
            symbol: req.body.symbol,
            openTime: openTime,
            closeTime: closeTime,
        });

        if (!tradingRound) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.TRADING_ROUND_NOT_FOUND));
        }

        if (!tradingRound.canTrade) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.TRADING_ROUND_CAN_NOT_TRADE));
        }
        let tradingCall = await TradingCall.findOne({
            userId: req.user.id,
            symbol: tradingRound.symbol,
            openTime: tradingRound.openTime,
            closeTime: tradingRound.closeTime
        });
        if (tradingCall) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.TRADING_CALL_EXISTS));
        }
        let tradingConfig = await TradingConfig.findOne({
            symbol: [tradingRound.symbol, 'default']
        });
        let blockingTime = tradingConfig?.blockingTime ?? process.env.DEFAULT_BLOCKING_TIME ?? 5000;
        if (now.getTime() > (new Date(tradingRound.closeTime).getTime() - blockingTime)) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.CAN_NOT_TRADE_IN_BLOCKING_TIME));
        }
        let benefitPercent = tradingConfig?.benefitPercent ?? process.env.TRADING_BENEFIT_PERCENT ?? 195;

        let user = await User.findById(req.user.id);
        if (!user) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
        }
        let betCash = parseFloat(req.body.betCash);
        if (betCash <= 0) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.BET_CASH_MUST_MORE_THAN_ZERO));
        }
        let type = parseInt(req.body.type);
        if (!(Object.values(TradingCallType).indexOf(type) >= 0)) {
            await session.abortTransaction();
            next(ErrorCode.TRADING_CALL_TYPE_INVALID);
            return;
        }

        if (user.cashAccount === CashAccount.REAL) {
            if (user.cash < betCash) {
                await session.abortTransaction();
                return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
            }
            user.cash -= betCash;
        } else {
            if (user.demoCash < betCash) {
                await session.abortTransaction();
                return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
            }
            user.demoCash -= betCash;
        }


        user = await user.save();
        if (!user) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
        }
        tradingCall = new TradingCall({
            userId: user.id,
            cashAccount: user.cashAccount,
            symbol: tradingRound.symbol,
            time: now,
            openTime: tradingRound.openTime,
            closeTime: tradingRound.closeTime,
            type: type,
            betCash: betCash,
            benefitPercent: benefitPercent,
            benefit: parseFloat(betCash * benefitPercent / 100),
            userPaid: true,
            masterPaid: false,
        });
        tradingCall = await tradingCall.save();
        if (!tradingCall) {
            await session.abortTransaction();
            return next(badRequestError.make(ErrorCode.SAVE_TRADING_CALL_FAIL));
        }
        let noti = await notificationService.createTradingCall(user, betCash, tradingCall.benefit);
        logger.info('CREATE_TRADING_CALL', JSON.stringify(tradingCall));

        if (type == TradingCallType.BUY) {
            tradingRound.buyAmount += betCash;
            tradingRound.buyCount += 1;
        } else {
            tradingRound.sellAmount += betCash;
            tradingRound.sellCount += 1;
        }
        await tradingRound.save();
        await session.commitTransaction();
        engine.userIo.to(user.id).emit(SocketEvent.USER, new ClientUser(user));
        engine.userIo.to(user.id).emit(SocketEvent.NOTIFICATION, noti);
        await session.endSession();
        res.json({
            userId: tradingCall.userId,
            symbol: tradingCall.symbol,
            time: tradingCall.time,
            openTime: tradingCall.openTime,
            closeTime: tradingCall.closeTime,
            type: tradingCall.type,
            betCash: tradingCall.betCash,
            benefitPercent: tradingCall.benefitPercent,
            benefit: tradingCall.benefit,
        });
    } catch (e) {
        logger.error('CREATE_TRADING_CALL', `error=${e}`);
        await session.abortTransaction();
        return next(badRequestError.make(ErrorCode.SAVE_TRADING_CALL_FAIL));
    }
}

module.exports = {
    tradingRooms: tradingRooms,
    tradingConfig: tradingConfig,
    latestKlines: latestKlines,
    latestRounds: latestRounds,
    call: call,
    getTradingCalls: getTradingCalls,
}
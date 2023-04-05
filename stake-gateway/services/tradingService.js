const badRequestError = require("../common/badRequestError");
const { TradingCallType, CashAccount } = require("../common/constants");
const ErrorCode = require("../common/errorCode");
const logger = require("../common/logger");
const TimeUtils = require("../common/timeUtils");
const { publicMongoose } = require("../config/publicMongoose");
const Kline = require("../models/Kline");
const TradingCall = require("../models/TradingCall");
const TradingConfig = require("../models/TradingConfig");
const TradingRoom = require("../models/TradingRoom");
const TradingRound = require("../models/TradingRound");
const { User } = require("../models/User");

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
const tradingConfig = async function (req, res) {
    let config = await TradingConfig.findOne({
        symbol: req.params.symbol,
    });
    if (!config) {
        config = await TradingConfig.findOne({
            symbol: 'default',
        });
    }
    if (!config) {
        return badRequestError.createError(res, ErrorCode.TRADING_CONFIG_NOT_EXISTS)
    }
    res.json(config);
}

const call = async function (req, res) {
    const session = await publicMongoose.startSession();
    let now = new Date();
    let openTime = TimeUtils.getOpenDate(now);
    let closeTime = TimeUtils.getCloseDate(now);
    try {
        await session.startTransaction();
        if (now.getTime() >= new Date(req.body.closeTime).getTime()) {
            await session.abortTransaction();
            return badRequestError.createError(res, ErrorCode.TRADING_ROUND_CLOSED);
        }
        let tradingRound = await TradingRound.findOne({
            symbol: req.body.symbol,
            openTime: openTime,
            closeTime: closeTime,
        });

        if (!tradingRound) {
            await session.abortTransaction();
            return badRequestError.createError(res, ErrorCode.TRADING_ROUND_NOT_FOUND);
        }

        let tradingCall = await TradingCall.findOne({
            userId: req.user.id,
            symbol: tradingRound.symbol,
            openTime: tradingRound.openTime,
            closeTime: tradingRound.closeTime
        });
        if (tradingCall) {
            await session.abortTransaction();
            return badRequestError.createError(res, ErrorCode.TRADING_CALL_EXISTS);
        }
        let tradingConfig = await TradingConfig.findOne({
            symbol: tradingRound.symbol
        });
        if (!tradingConfig) {
            tradingConfig = await TradingConfig.findOne({
                symbol: 'default'
            });
        }
        let benefitPercent = tradingConfig.benefitPercent ?? process.env.TRADING_BENEFIT_PERCENT ?? 195;

        let user = await User.findById(req.user.id);
        if (!user) {
            await session.abortTransaction();
            return badRequestError.createError(res, ErrorCode.USER_NOT_FOUND);
        }
        let betCash = parseFloat(req.body.betCash);
        if (betCash <= 0) {
            await session.abortTransaction();
            return badRequestError.createError(res, ErrorCode.BET_CASH_MUST_MORE_THAN_ZERO);
        }
        let type = parseInt(req.body.type);
        if (!(Object.values(TradingCallType).indexOf(type) >= 0)) {
            await session.abortTransaction();
            return badRequestError.createError(res, ErrorCode.TRADING_CALL_TYPE_INVALID);
        }
        if (user.cashAccount == CashAccount.REAL) {
            if (user.cash < betCash) {
                await session.abortTransaction();
                return badRequestError.createError(res, ErrorCode.CASH_NOT_ENOUGH);
            }
            user.cash -= betCash
        } else {
            if (user.demoCash < betCash) {
                await session.abortTransaction();
                return badRequestError.createError(res, ErrorCode.CASH_NOT_ENOUGH);
            }
            user.demoCash -= betCash
        }
        user = await user.save();
        if (!user) {
            await session.abortTransaction();
            return badRequestError.createError(res, ErrorCode.CASH_NOT_ENOUGH);
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
        await session.commitTransaction();
        logger.info('CREATE_TRADING_CALL', JSON.stringify(tradingCall));
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
        logger.error('CREATE_TRADING_CALL', JSON.stringify(e));
        await session.abortTransaction();
    } finally {
        session.endSession();
    }
}

module.exports = {
    tradingRooms: tradingRooms,
    tradingConfig: tradingConfig,
    latestKlines: latestKlines,
    latestRounds: latestRounds,
    call: call,
}
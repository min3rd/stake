const badRequestError = require("../../../common/badRequestError");
const { Status } = require("../../../common/constants");
const ErrorCode = require("../../../common/errorCode");
const logger = require("../../../common/logger");
const { publicMongoose } = require("../../../config/publicMongoose");
const AppConfig = require("../../../models/AppConfig");
const { User } = require("../../../models/User");
const CashTransfer = require("../../../models/wallet/CashTransfer");
const WithdrawOrder = require("../../../models/wallet/WithdrawOrder");

const getWithdrawOrders = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    try {
        let withdrawOrders = await WithdrawOrder.find({
            userId: userId,
        }).sort(JSON.parse(req.query.sort) ?? { time: -1 }).skip(req.query.offset).limit(req.query.size);
        res.json(withdrawOrders);
    } catch (e) {
        logger.error(`withdrawService_getWithdrawOrders`, `e=${e}`);
        next(badRequestError.make(ErrorCode.WALLET_WITHDRAW_COULD_NOT_GET_ORDERS));
    }
}

const getWithdrawOrder = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let withdrawOrder = await WithdrawOrder.findOne({
        _id: req.params.withdrawOrderId,
        userId: userId,
    });
    res.json(withdrawOrder);
}

const createWithdrawOrder = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let appConfig = await AppConfig.findOne({});
    let amount = parseFloat(req.body.amount);
    if (amount < appConfig.withdrawMinValue) {
        return next(badRequestError.make(ErrorCode.WALLET_WITHDRAW_LESS_THAN_MIN_VALUE));
    }
    let user = await User.findById(userId);
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    if (amount > user.cash) {
        return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
    }
    let withdrawOrder = new WithdrawOrder({
        userId: userId,
        masterAddress: appConfig.MASTER_ADDRESS,
        userAddress: req.body.userAddress,
        time: new Date(),
        amount: amount,
        status: Status.PENDING,
    });

    withdrawOrder = await withdrawOrder.save();
    res.json(withdrawOrder);
}

const deleteWithdrawOrder = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let withdrawOrder = await WithdrawOrder.findOne({
        _id: req.params.withdrawOrderId,
        userId: userId,
    });
    if (!withdrawOrder) {
        return next(badRequestError.make(ErrorCode.WALLET_WITHDRAW_NOT_FOUND));
    }
    if (withdrawOrder.status != Status.PENDING) {
        return next(badRequestError.make(ErrorCode.WALLET_WITHDRAW_NOT_FOUND));
    }
    withdrawOrder = await withdrawOrder.deleteOne();
    res.json(withdrawOrder);
}

const getCashTransfers = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let cashTransfers = await CashTransfer.find({
        $or: {
            userId: userId,
            destinationId: userId,
        }
    }).sort(JSON.parse(req.query.sort) ?? { time: -1 }).skip(req.query.offset).limit(req.query.size);
    return res.json(cashTransfers);
}

const getCashTransfer = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let cashTransfer = await CashTransfer.findOne({
        _id: req.params.cashTransferId,
        $or: {
            userId: userId,
            destinationId: userId,
        }
    });
    return res.json(cashTransfer);
}

const createCashTransfer = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    const session = await publicMongoose.startSession();
    try {
        let user = await User.findById(userId);
        if (!user) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
        }
        let receiver = await User.findOne({
            username: req.body.username,
        });
        if (!receiver) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
        }
        let amount = parseFloat(req.body.amount);
        if (amount > user.cash) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
        }
        let cashTransfer = new CashTransfer({
            userId: user._id,
            destinationId: receiver._id,
            destinationUsername: receiver.username,
            amount: amount,
            time: new Date(),
            status: Status.PENDING,
        });
        cashTransfer = await cashTransfer.save();
        if (!cashTransfer) {
            await session.abortTransaction();
            await session.endSession();
            logger.error('withdrawService_createCashTransfer', `could not save cashTransfer=${cashTransfer}`);
            return next(badRequestError.make(ErrorCode.WALLET_WITHDRAW_COULD_NOT_TRANSFER));
        }
        try {
            user.cash -= amount;
            user = await user.save();
            if (!user) {
                await session.abortTransaction();
                await session.endSession();
                logger.error('withdrawService_createCashTransfer', `could not save user=${user}`);
            }
            receiver.cash += amount;
            receiver = await receiver.save();
            if (!receiver) {
                await session.abortTransaction();
                await session.endSession();
                logger.error('withdrawService_createCashTransfer', `could not save receiver=${receiver}`);
            }
            cashTransfer.status = Status.SUCCESS;
            cashTransfer = await cashTransfer.save();
        } catch (error) {
            logger.error('withdrawService_createCashTransfer', `could not transfer cash e=${error} user=${user} receiver=${receiver} cashTransfer=${cashTransfer}`);
        }
        await session.commitTransaction();
        await session.endSession();
        res.json(cashTransfer);
    } catch (e) {
        logger.error('withdrawService_createCashTransfer', `e=${e}`);
    }
}

module.exports = {
    getWithdrawOrders: getWithdrawOrders,
    getWithdrawOrder: getWithdrawOrder,
    createWithdrawOrder: createWithdrawOrder,
    deleteWithdrawOrder: deleteWithdrawOrder,
    getCashTransfers: getCashTransfers,
    getCashTransfer: getCashTransfer,
    createCashTransfer: createCashTransfer,
}
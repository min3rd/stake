const badRequestError = require("../../../common/badRequestError");
const { Status } = require("../../../common/constants");
const ErrorCode = require("../../../common/errorCode");
const AppConfig = require("../../../models/AppConfig");
const CashTransfer = require("../../../models/wallet/CashTransfer");
const WithdrawOrder = require("../../../models/wallet/WithdrawOrder");
const _getWithdrawOrders = async function () {
    let withdrawOrders = await WithdrawOrder.find({
        userId: userId,
    }).sort(JSON.parse(req.query.sort) ?? { time: -1 }).skip(req.query.offset).limit(req.query.size);
    return withdrawOrders;
}

const _getWithdrawOrder = async function (userId, id) {
    let withdrawOrder = await WithdrawOrder.findOne({
        _id: id,
        userId: userId,
    });
    return withdrawOrder;
}

const getWithdrawOrders = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    res.json(_getWithdrawOrders());
}

const getWithdrawOrder = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let withdrawOrderId = req.params.withdrawOrderId;
    let withdrawOrder = await _getWithdrawOrder(userId, withdrawOrderId);
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
    let withdrawOrder = new WithdrawOrder({
        userId: userId,
        masterAddress: appConfig.MASTER_ADDRESS,
        userAddress: req.body.userAddress,
        time: new Date(),
        amount: parseFloat(req.body.amount),
        status: Status.PENDING,
    });

    withdrawOrder = await withdrawOrder.save();
    res.json(withdrawOrder);
}

const getCashTransfer = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let cashTransfers = await CashTransfer.find({
        userId: {
            $in: [userId],
        },
        destinationId: {
            $in: [userId],
        }
    }).sort(JSON.parse(req.query.sort) ?? { time: -1 }).skip(req.query.offset).limit(req.query.size);
    return res.json(cashTransfers);
}

module.exports = {
    _getWithdrawOrders: _getWithdrawOrders,
    getWithdrawOrders: getWithdrawOrders,
    getWithdrawOrder: getWithdrawOrder,
    createWithdrawOrder: createWithdrawOrder,
}